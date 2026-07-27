---
title: "单调栈和二叉树"
---

<!-- truncate -->
1.  给你一棵二叉树的根节点 `root` ，翻转这棵二叉树，并返回其根节点。

**示例 1：**

![](https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg)

```plaintext
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
```

**示例 2：**

![](https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg)

```plaintext
输入：root = [2,1,3]
输出：[2,3,1]
```

**示例 3：**

```plaintext
输入：root = []
输出：[]
```

**提示：**

-   树中节点数目范围在 `[0, 100]` 内
-   `-100 <= Node.val <= 100`

**题目解析:**

这道题目非常非常的简单就是一个简单的递归函数就行了，简单的分析以下就是非常的简单看看实例二的那颗树:

😄交换左右两颗子树，这是最小单位了，所以这里我们首先判断左右子树是否全为null（这是递归结束的标志），然后就定义一个节点记录左子树，一个节点记录右子树当然这里需要的是递归到最左和最右,然后将两颗字数进行交换就行了,这还不是那种复杂一点的交换，你会发现最小的单位就是实例二的图，可以看看第[101](https://leetcode.cn/problems/symmetric-tree/?favorite=2cktkvj)题代码如下:

```java
class Solution {
    public TreeNode invertTree(TreeNode root) {
    	if (root==null){
    		return null;
		}
    	TreeNode left=invertTree(root.left);
    	TreeNode right=invertTree(root.right);
    	root.left=right;
    	root.right=left;
    	return root;
    }
}
```

1.  给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

[百度百科](https://baike.baidu.com/item/最近公共祖先/8918834?fr=aladdin)中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（**一个节点也可以是它自己的祖先**）。”

**示例 1：**

![img](https://assets.leetcode.com/uploads/2018/12/14/binarytree.png)

```plaintext
输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出：3
解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2018/12/14/binarytree.png)

```plaintext
输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出：5
解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
```

**示例 3：**

```plaintext
输入：root = [1,2], p = 1, q = 2
输出：1
```

**提示：**

-   树中节点数目在范围 `[2, 105]` 内。
-   `-109 <= Node.val <= 109`
-   所有 `Node.val` `互不相同` 。
-   `p != q`
-   `p` 和 `q` 均存在于给定的二叉树中。

**题目解析:**

根据定义可以知道**祖先的定义:**若节点 _p_ 在节点 root 的左（右）子树中，或 _p_\=root ，则称 root 是 _p_ 的祖先。

**最近公共祖先的定义：** 设节点 _root_ 为节点 _p_,_q_ 的某公共祖先，若其左子节点 _root_._l**e**ft_ 和右子节点 _root_._r**i**g**h**t_ 都不是 _p_,_q_ 的公共祖先，则称 _root_ 是 “最近的公共祖先” 。

根据以上的定义可以知道root是p，q的最近公共祖先则只可能是下面的情况之一:

1.  p和q在root的子树中，且分列root的异侧（即分布在左右子树中）
2.  p=root，且q在root的左或右子树中
3.  q=root，且p在root的左或右子树中

![Picture2.png](/img/leetcode/1599885247-mgYjRv-Picture2.png)

考虑通过递归对二叉树进行先序遍历，当遇到节点p或q是返回，从底至定的进行回溯，当节点p,q在节点root的异侧时，节点root即为最近的公共祖先,则向上返回root

**递归解析：**

1.  终止条件
    -   当越过叶节点，直接返回null
    -   当root等于p或者q直接返回root
2.  递推工作：
    -   开启递归左子树，返回值记为left；
    -   开启递归右子树，返回值记为right；
3.  返回值：更具left和right可展开为四种情况：
    -   当left和right同时为空：说明root的左右子树都不包含p,q直接返回null
    -   当left和right同时不为空：说明p，q分列在root的异侧（分别在左/右子树），因此root为最近的公共祖先，返回root；
    -   当left为空，right不为空；p，q都不在root的左子树中，直接返回right，具体可以分为两种:
        -   p,q其中一个在root的右子树中，此时right指向p（假设为p）
        -   p,q两节点都在root的右子树中，此时的right指向最近的公共祖先节点；
    -   当left不为空，right为空：与上个情况同理

![Picture3.png](/img/leetcode/1599885247-KpxUys-Picture3.png),![Picture4.png](/img/leetcode/1599885247-azGPkG-Picture4.png),![Picture5.png](/img/leetcode/1599885247-hIMEfJ-Picture5.png),![Picture6.png](/img/leetcode/1599885247-UMCTfd-Picture6.png),![Picture7.png](/img/leetcode/1599885247-SLOIAX-Picture7.png),![Picture8.png](/img/leetcode/1599885247-JGxmmL-Picture8.png),![Picture9.png](/img/leetcode/1599885247-lVrUTd-Picture9.png),![Picture10.png](/img/leetcode/1599885247-VTPazU-Picture10.png),![Picture11.png](/img/leetcode/1599885247-KePYfU-Picture11.png),![Picture12.png](/img/leetcode/1599885247-xkRUDm-Picture12.png),![Picture13.png](/img/leetcode/1599885247-SFdLoP-Picture13.png),![Picture14.png](/img/leetcode/1599885247-YOUEcd-Picture14.png),![Picture15.png](/img/leetcode/1599885247-HcncTq-Picture15.png),![Picture16.png](/img/leetcode/1599885247-oeFNkc-Picture16.png),![Picture17.png](/img/leetcode/1599885247-DjiiMY-Picture17.png),![Picture18.png](/img/leetcode/1599885247-SkpSEn-Picture18.png),![Picture19.png](/img/leetcode/1599885247-jFDBar-Picture19.png),![Picture20.png](/img/leetcode/1599885247-GEkXRi-Picture20.png)

代码实现逻辑如下所示:

```java
  public class TreeNode {
      int val;
      TreeNode left;
      TreeNode right;
      TreeNode(int x) { val = x; }
  }
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        //递归结束条件
        if (root==null||root==p||root==q)return root;
        //记录左子树的情况
        TreeNode left=lowestCommonAncestor(root.left,p,q);
        //记录右子树的情况
        TreeNode right=lowestCommonAncestor(root.right,p,q);
        if (left==null)return right;
        if (right==null)return left;
        return root;
    }
}
```

## 单调栈解法

739.给定一个整数数组 `temperatures` ，表示每天的温度，返回一个数组 `answer` ，其中 `answer[i]` 是指对于第 `i` 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 `0` 来代替。

**示例 1:**

```plaintext
输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]
```

**示例 2:**

```plaintext
输入: temperatures = [30,40,50,60]
输出: [1,1,1,0]
```

**示例 3:**

```plaintext
输入: temperatures = [30,60,90]
输出: [1,1,0]
```

**提示：**

-   `1 <= temperatures.length <= 105`
-   `30 <= temperatures[i] <= 100`

**题解思路：**

该题解决方法是单调栈的思路进行，栈里面需要**存储当前的下标**（如果需要使用对应的元素，直接就可以获取），他需要寻找的是一个比自己更大的数字也就是单调栈顶到栈底单调递增，简单的思路就是首先让下标为0的入栈，然后进行数组的遍历操做，当出现要加入的元素的大小小于栈顶就直接进行入栈。

使用单调栈主要有三个判断条件:

1.  当前的元素T\[i\]小于栈顶元素T\[st.peek()\]的元素
2.  当前的元素T\[i\]等于栈顶元素T\[st.peek()\]的元素
3.  当前的元素T\[i\]大于栈顶元素T\[st.peek()\]的元素

对于实例一的分析 temperatures = \[73,74,75,71,69,72,76,73\]输出\[1,1,4,2,1,1,0,0\]

结果分析可以知道:

-   首先让下标0入栈，接着遍历数组下标为1的元素，发现该元素大于下标0的元素
-   该步需要判断栈是否为空需要一个**while循环**（可能会出现一种情况就是加入的数据连续大于栈内的多个数据所以该数据就是栈内所有比他小的元素的下一个最大的值，所以在此操作后，那些小于该元素的下标全要出栈）,将结果存入res数组也就是res\[stack.peek()\]=i-stack.peek()，接着让下标0出栈
-   下标0出栈后再让当前的下标i入栈就完成了第一次的结果存储

```java
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
    	int n=temperatures.length;
    	int[]res=new int[n];
    	//用来记录当前的下标
		Deque<Integer> stack = new ArrayDeque<>();
		stack.push(0);
		for (int i=1;i<n;i++){
			if (temperatures[i] > temperatures[stack.peek()]) {
				//先判断是否为空
				while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {					//将当前符合的下标存入到结果栈中巧妙的利用了下标进行取值
					res[stack.peek()] = i - stack.peek();
					stack.pop();
				}
			}
			stack.push(i);
		}
		return res;
	}
}
```

496 .`nums1` 中数字 `x` 的 **下一个更大元素** 是指 `x` 在 `nums2` 中对应位置 **右侧** 的 **第一个** 比 `x` 大的元素。

给你两个 **没有重复元素** 的数组 `nums1` 和 `nums2` ，下标从 **0** 开始计数，其中`nums1` 是 `nums2` 的子集。

对于每个 `0 <= i < nums1.length` ，找出满足 `nums1[i] == nums2[j]` 的下标 `j` ，并且在 `nums2` 确定 `nums2[j]` 的 **下一个更大元素** 。如果不存在下一个更大元素，那么本次查询的答案是 `-1` 。

返回一个长度为 `nums1.length` 的数组 `ans` 作为答案，满足 `ans[i]` 是如上所述的 **下一个更大元素** 。

**示例 1：**

```plaintext
输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
输出：[-1,3,-1]
解释：nums1 中每个值的下一个更大元素如下所述：
- 4 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
- 1 ，用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是 3 。
- 2 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
```

**示例 2：**

```plaintext
输入：nums1 = [2,4], nums2 = [1,2,3,4].
输出：[3,-1]
解释：nums1 中每个值的下一个更大元素如下所述：
- 2 ，用加粗斜体标识，nums2 = [1,2,3,4]。下一个更大元素是 3 。
- 4 ，用加粗斜体标识，nums2 = [1,2,3,4]。不存在下一个更大元素，所以答案是 -1 。
```

**提示：**

-   `1 <= nums1.length <= nums2.length <= 1000`
-   `0 <= nums1[i], nums2[i] <= 104`
-   `nums1`和`nums2`中所有整数 **互不相同**
-   `nums1` 中的所有整数同样出现在 `nums2` 中

**解题四路:**

该题利用单调栈可以完美的解决😄这个不同于上一道题就是他有两个数组，所以需要一个寻找下标的过程，也就是我们从num1中取一个数据我们不仅要**记录当前数据**还要**记录下标**想想为什么？

解：当然是为了存放结果，因为我们利用的是单调栈来存放下标，当我们找打数据和其下一个最大元素时需要将这个最大元素存放到结果中，比如那**示例二来说**:

-   首先记录nums1中第一个数据2的信息(2,0)
-   对于结果数组res我们首先将所有的值赋值为-1
-   接着在nums2中找到对应的数据，并且找到其右侧第一个比他大的数据为3
-   然后将数据3存入结果res\[0\]中这就是我们需要的效果

然后问题来了:用什么来存储数据和下标，而且还要能检测到num2是否包含num1的数据😏是不是想到了，没错就是map很好的解决了这个问题，所以又回到了单调栈中而且是找最大的元素所以单调栈从头到尾单调递增也就是当一个元素入栈时考虑以下情况:

-   当期遍历的元素T\[i\]小于栈顶T\[peek()\]元素，入栈该元素的下标i
-   当前遍历的元素T\[i\]等于栈顶T\[peek()\]元素，依然直接入栈，我们要找的是大于自己的元素
-   当前遍历的元素T\[i\]大于栈顶T\[peek()\]元素，也就是找到了第一个比自己大的元素这时候就要操作了
    -   首先判断该栈顶元素是否在num1中出现过如果没有出现则不进行操作开始进行下一个元素的判断
    -   如果发现栈顶的元素在num1中出现过这是就需要记录进行res的赋值操作

以上就是所有的详细步骤代码如下所示:

```java
class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        //方法二单调栈解决
		int n1=nums1.length;
		int n2=nums2.length;
		Map<Integer, Integer> map = new HashMap<>();
		//存入map容器中便于快速的查找
		for (int i=0;i<n1;i++){
			map.put(nums1[i],i);
		}
		int []res=new int[n1];
		Deque<Integer> stack = new ArrayDeque<>();
		//全部填充为-1单调栈的应用
		Arrays.fill(res,-1);
		for (int i=0;i<n2;i++){
			while (!stack.isEmpty()&&nums2[stack.peek()]<nums2[i]){
				int pre=nums2[stack.pop()];
				if (map.containsKey(pre)){
                    //得到map中存的下标给res然后将对应位值存入nums2【i】
					res[map.get(pre)]=nums2[i];
				}
			}
			stack.push(i);
		}
		return res;
    }
```

还有一个非常暴力的解法只不过时间复杂度很高：

-   因为我们知道了nums1是nums2的子集，所以我们可以首先根据num1的长度进行一次循环
-   内循环里面用while我们首先找到与当前nums1\[i\]相等的元素nums2\[j\]
-   当找到的时候在进行一次while循环找到nums2\[j\]>nums1\[i\]的元素
-   对于结果处理如果上述都没找到的话是不是j正好等于数组nums2的长度如果找到也就是j&lt;=nums2.length-1

所以暴力解决的代码如下所示:

```java
class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
		int n1=nums1.length;
    	int n2=nums2.length;
		int res[]=new  int[n1];
		for (int i=0;i<n1;i++){
			int j=0;
            //找到相同的元素
			while (j<n2&&nums2[j]!=nums1[i])j++;
            //找到第一个比其大的元素
			while (j<n2&&nums2[j]<=nums1[i])j++;
			res[i]=(j==n2)?-1:nums2[j];
		}
		return res;
    }
}
```

503.给定一个循环数组 `nums` （ `nums[nums.length - 1]` 的下一个元素是 `nums[0]` ），返回 _`nums` 中每个元素的 **下一个更大元素**_ 。

数字 `x` 的 **下一个更大的元素** 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 `-1` 。

**示例 1:**

```plaintext
输入: nums = [1,2,1]
输出: [2,-1,2]
解释: 第一个 1 的下一个更大的数是 2；
数字 2 找不到下一个更大的数； 
第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
```

**示例 2:**

```plaintext
输入: nums = [1,2,3,4,3]
输出: [2,3,4,-1,4]
```

**提示:**

-   `1 <= nums.length <= 104`
-   `-109 <= nums[i] <= 109`

**题目解析：**

这道题目很有意思因为它是一个可以循环的查找😏所以难度的上来了，其实也不难类比于上面两道题，脑子里想的肯定有两种策略:

-   第一种就是我把nums的大小扩充两倍也就是例如nums=\[1,2,1\]扩充为newNums=\[1,2,1,1,2,1\]，想法很好也能实现，但是它的空间有增大了
-   第二种😼这个就需要一点技巧了哈哈哈，咱直接把这个数组遍历两边不就行了蛮，也就是正常的 （0%3） （1%3） （2%3） (3%3)、(4%3)、（5%3）这不就遍历了两遍了，相当于数组的复制两遍，这样思路是不是清晰许多了😸

然后具体的思路解析在说一遍

-   首先定义res数组看看不符合要求的置位-1，所以全部填充为-1，并定义一个栈用于单调栈的存入数据
-   对于一个for循环遍历长度为2\*nums.length然后就正常的进行比较就可以

具体代码实现如下所示:

```java
class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n=nums.length();
        int res[]=new int[n];
        //填充res数组为-1
        Arrays.fill(nums,-1);
        Deque<Integer>stack=new ArrayDeque();
        //一个for循环遍历两遍nums
        for(int i=0;i<2*n;i++){
            int index=i%n;
            if(!stack.isEmpty()&&nums[stack.peek()]<nums[index]){
                res[stack.pop()]=nums[index];
            }
            stack.push(i);
        }
        
    }
}
```

42.给定 `n` 个非负整数表示每个宽度为 `1` 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

**示例 1：**

![img](/img/cos/202303210906502.png)

```plaintext
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
```

**示例 2：**

```plaintext
输入：height = [4,2,0,3,2,5]
输出：9
```

**提示：**

-   `n == height.length`
-   `1 <= n <= 2 * 104`
-   `0 <= height[i] <= 105`

**题解思路:**

1.  先说说**暴力**的解法，很容易想的策略：就是对每个柱子进行分析看（排除第一根和最后一根其上面不存水）比如我们找到了第3根柱子，我们从此开始进行往其**左侧**寻找最高的柱子记为LHeight=2,下标为2，然后在从其右侧找到最高的柱子记为RHeigit=3，下标为6，其实这里的下标也就不那么重要了，观察可以发现柱子3的上面有一个水格子那么这是怎么来的呢？我们得到了两个高度，根据木桶理论😄瞎说的就是去这俩最短的那个也就是2，然后再减去当前柱子的高度nums\[i\]就可以得出雨水的高度，你在试试柱子四可以得出其高度为2,所以一切都明晰了,详细代码如下:

```java
class Solution {
      public int trap(int[] height) {	
  		 //暴力解法
          int n = height.length;
          int sum = 0;
          for (int i = 0; i < n; i++) {
              //第一个柱子和最后一个柱子不接水
              if (i == 0 || i == n - 1) {
                  continue;
              }
              //分别记录第i个柱子左侧和右侧最高的柱子
              int rHeight = height[i];
              int lHeight = height[i];
              //记录其左侧
              for (int j = i - 1; j >= 0; j--) {
                  if (height[j] > lHeight) lHeight = height[j];
              }
              //记录其右侧发现比他大的直接更新
              for (int j = i + 1; j < n; j++) {
                  if (height[j] > rHeight) rHeight = height[j];
              }
              //取两个柱子的最小值，然后再减去当前柱子所占的高度就是雨水的高度
              int h = Math.min(lHeight, rHeight) - height[i];
              //这里需要对计算的高度进行一个判断因为当其为最高的时候会出现负值
              if (h > 0) {
                  sum += h;
              }
          }
          return sum;
      }
}
```

1.  **双指针解法**上面的思路其时时超时因为它每根柱子都要往左往右进行遍历增加了不必要的循环，所以我们是不是有又有了一个idea😏其实没有哈哈简单提一下就是可以用双指针，根据上到题目的灵感，他要每根柱子的左侧最高和右侧最高是吧，我们就记录左侧和右侧最高不就行了吗,于是一个算法浮现出来:
    
    -   首先定义两个数组就是maxLHeight和maxRHeight记录每个下标的左侧和右侧的最高柱子
    -   记录完成后就可以进行求和运算了，记住需要排除第一根和最后一根(他们不存水的😄)
    -   计算结果和暴力求解一样也是取min(maxLHeight,maxRHeight)-height\[i\]
    
    代码如下所示:
    
```java
   
 class Solution {
     public int trap(int[] height) { 
//双指针解法
         int n = height.length;
         if (height.length <= 2) return 0;
         int[] maxLHeight = new int[n];
         int[] maxRHeight = new int[n];
         //记录左侧的最大高度因为第一根柱子不考虑，但是需要参与比较
         maxLHeight[0] = height[0];
         for (int i = 1; i < n - 1; i++) {
             maxLHeight[i] = Math.max(maxLHeight[i - 1], height[i]);
         }
         //记录右侧的最大高度
         maxRHeight[n - 1] = height[n - 1];
         //找出每个下标再右侧的最大值
         for (int i = n - 2; i >= 0; i--) {
             maxRHeight[i] = Math.max(maxRHeight[i + 1], height[i]);
         }
   
         //然后进行求和运算
         int sum = 0;
         for (int i = 1; i < n - 1; i++) {
             int h = Math.min(maxLHeight[i], maxRHeight[i]) - height[i];
             if (h > 0) {
                 sum += h;
             }
         }
         return sum;
     }
 }
```
    
    1.  **单调栈解法:**有了上面的两种思路，但是我们如何和单调栈联系到一起呢?既然也是求左侧和右侧的最大值，可不可以也用单调栈进行求解其实也是可以的可能效果不如双指针法，上面的两种都是按照**列**进行求雨水，也就是每个柱子上的雨水，当我们利用单调栈的话，就需要按照行来求:如下图

![](/img/cos/202303210937762.png)

那么来考虑一下单调栈从栈顶到栈底是**递增**的还是**递减**的？就拿上图来说对于柱子3，柱子二入栈后他也需要入栈，直至找到第一个大于它的柱子，然后就开始计算，所以很明显这是个从栈顶到栈底递增的栈，那么继续入栈会出现以下三种情况:

-   当前遍历的元素高度小于栈顶元素的高度height\[i\]&lt;height\[stack.peek()\]，执行入栈操作
-   当前遍历的元素高度等于栈顶元素的高度height\[i\]=height\[stack.peek()\]，执行更新操作,也就是当前的记录的栈顶出栈，新的栈顶入栈，因为两根柱子并列，对于我们来求解雨水时一定是用靠右边的柱子进行计算的:

![image-20230321094450216](/img/cos/202303210944404.png)

-   当前遍历的元素高度大于栈顶元素的高度height\[i\]>height\[stack.peek()\]，到关键点了这里出现了凹槽，首先记录当前栈顶元素(也就是相对的下标)同时也要出栈,此时栈顶记录的就是当前下标为mid的左侧第一个比他高的，遍历的height\[i\]是mid下标右侧第一个比他高的元素:那么计算方式:
    -   首先得到其高度也就是h=min(height\[stack.peek()\],height\[i\])-height\[mid\] :例如对于柱子4的高度为 h=min(1,1)-0=1
    -   接着得到其宽度也就是他们的下标进行相减 w=i-stack.peek()-1 :柱子4的宽度为w=5-3-1=1
    -   接着计算雨水的量为 sum=w\*h

基本思路如上所示代码的实现:

```java
class Solution {
    public int trap(int[] height) {  
//单调栈解决方法
        int n = height.length;
        if (n <= 2) return 0;
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        int sum = 0;
        for (int i = 1; i < n; i++) {
            //小于的情况
            if (height[i] < height[stack.peek()]) {
                stack.push(i);
             //相等的情况
            } else if (height[i] == height[stack.peek()]) {
                stack.pop();
                stack.push(i);
             //大于的情况
            } else {
                while (!stack.isEmpty() && height[i] > height[stack.peek()]) {
                    int mid = stack.pop();
                    //这里很关键，当出去一个元素后，必须要保证栈中有元素才能拿到peek的值
                    if (!stack.isEmpty()) {
                        int h = Math.min(height[stack.peek()], height[i]) - height[mid];
                        int w = i - stack.peek() - 1;
                        sum += h * w;
                    }
                }
            }
            stack.push(i);
        }
        return sum;
    }
}
```

1.  给定 _n_ 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

**示例 1:**

![img](/img/cos/202303211000945.jpeg)

```plaintext
输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10
```

**示例 2：**

![img](/img/cos/202303211000935.jpeg)

```plaintext
输入： heights = [2,4]
输出： 4
```

**提示：**

-   `1 <= heights.length <=105`
-   `0 <= heights[i] <= 104`

**题目解析:**

1.  第一种**暴力解法**，**超时**但是思路简单，首先对于每个柱子逐一进行考虑，遍历每根柱子的左侧和右侧，分别找到第一个比他小的元素，然后求出其宽度和高度进行乘积计算。举个🌰对于元素2来说其左边比他小的下标为-1，右边比起小的下标为1所以它的宽度为right-left-1也就是1他自己的宽度，高度为它本身2可以计算第一个结果为2

​ 接着我们到第二个元素1，首先找左侧最小和右侧最小下标分别-1和6，计算其宽度为6，高度为1，所以总的最大面积为6更细最大值

​ 接着我们到第三个元素5，首先找到左侧和右侧最小下标分别为1和4，j计算其宽度为4-1-1=2，高度为5所以它的最大值为5\*2=10

通过上面流程逐一判断就可以得到相应的结果但是测试的**结果超时**：代码实现如下所示

```java
 class Solution {
     public int largestRectangleArea(int[] heights) {  
//暴力解法
         int n = heights.length;
         int sum = 0;
         for (int i = 0; i < n; i++) {
             int left = i;
             int right = i;
             for (; left >= 0; left--) {
                 if (heights[left] < heights[i]) break;
             }
             for (; right < n; right++) {
                 if (heights[right] < heights[i]) break;
             }
             int w = right - left - 1;
             int h = heights[i];
             sum = Math.max(sum, w * h);
         }
         return sum;
     }
 }
```

1.  第二种解法**双指针解法**：该题我们和雨水题不同，雨水题找的是两侧第一个比他大的元素，而本题需要找两侧比他小的元素下标，所以我们可以根据以下流程来进行求解分析：
    -   首先需要两个长度为n的数组minLeftIndex和minRightIndex来记录第i个下标的左侧和右侧第一次出现比height\[i\]小的元素下标
    -   记录完成后就进行一次for循环求和sum=heights\[i\]\*(minRightIndex\[i\]-minLeftIndex\[i\]-1)得出最大的值

看着很简单是不?😼nono重点是在那个下标的求解很多坑的~~我们来分析一波求其下标:

-   求左侧的最小下标为了避免死循环，也就是和暴力求解一样，第一根柱子的最左侧的下标一定是-1，知道这个就简单了
-   第一根柱子已经考虑了那么就从第二根下标为1开始进行遍历，思路是这个：当从第i根开始时我们知道了第i-1根柱子最左侧的最小下标，那么有以下几种情况
    -   第i根柱子高度小于等于第i-1根柱子的高度：那么就继续找，首先得到第i-1根柱子其左侧的最小下标，在进行比较直至比较超出边界（这个还是比较快的因为根据下标有跳跃式的比较）
    -   第i根柱子高度大于第i-1根柱子的高度：说明当前第i根柱子的左侧第一根比他小的下标为i-1直接进行记录即可
-   同理求其右侧的最小下标，只不过初始化的时候令minRightIndex\[n-1\]=n，倒叙进行求解

所以总体的代码实现效果如下:

```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int[] minLeftIndex = new int[n];
        int[] minRightIndex = new int[n];
        minLeftIndex[0] = -1;//可以避免死循环
        //记录每个柱子，左边第一个小于该柱子的下标
        for (int i = 1; i < n; i++) {
            int t = i - 1;
            while (t >= 0 && heights[t] >= heights[i]) {
                t = minLeftIndex[t];
            }
            minLeftIndex[i] = t;
        }

        //记录每个柱子右边第一个小于该柱子的下标
        minRightIndex[n - 1] = n;
        for (int i = n - 2; i >= 0; i--) {
            int t = i + 1;
            while (t < n && heights[t] >= heights[i]) t = minRightIndex[t];
            minRightIndex[i] = t;
        }
        //求和
        int result = 0;
        for (int i = 0; i < n; i++) {
            int sum = heights[i] * (minRightIndex[i] - minLeftIndex[i] - 1);
            result = Math.max(result, sum);
        }
        return result;
    }
}
```

1.  第三种解法**单调栈的解法**：不同于前几道题，本体的单调栈从顶到底单调递减，当加入的元素大于小于栈顶元素的时候需要进行出栈，但是这里有一个问题就是边界需要规定一下，否则会出现一种情况如果该数组单调递增的话，一直入栈导致结果为0，或者单调递减一开始就直接出现空操作导致异常，所以需要对数组进行扩容，将其头和尾增加一个元素😏0这样就好了

​ 具体思路和雨水的思路基本上相同，就一些细节需要修改下，这里就不仔细的说了，细看雨水的题目

```java
class Solution {
    public int largestRectangleArea(int[] heights) {
         //单调栈的解法
        int n = heights.length;
        Deque<Integer> stack = new ArrayDeque<>();
        //数组扩容在最前和最后加入0避免一些空操作和计算结果为0
        int[] newHeight = new int[n + 2];
        for (int i = 0; i < n; i++) {
            newHeight[i + 1] = heights[i];
        }
        stack.push(0);
        int result = 0;
        for (int i = 1; i < n + 2; i++) {
            if (newHeight[i] > newHeight[stack.peek()]) {
                stack.push(i);
            } else if (newHeight[i] == newHeight[stack.peek()]) {
                stack.pop();
                stack.push(i);
            } else {
                while (newHeight[i] < newHeight[stack.peek()]) {
                    int mid = stack.pop();
                    int left = stack.peek();
                    int right = i;
                    int w = right - left - 1;
                    int h = newHeight[mid];
		result=Math.max(result,w*h);
                }
            }
            stack.push(i);
        }
        return result;
    }
}
```
