---
title: "LeetCode 刷题"
description: "LeetCode 高频题刷题笔记，涵盖双指针、回溯、动态规划与图论等专题，附完整解题思路与代码实现。"
sidebar_position: 6
---

本篇为 **LeetCode** 高频题刷题笔记，围绕**双指针、回溯、递归、动态规划、贪心、图论**等典型专题，逐题记录解题思路与 Java 实现。

<!-- truncate -->

## LeetCode 1：盛最多水的容器

给定一个长度为 `n` 的整数数组 `height`，有 `n` 条垂线，第 `i` 条线的两个端点是 `(i, 0)` 和 `(i, height[i])`。

找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。

**说明：** 你不能倾斜容器。

**示例 1：**

![容器盛水示意图](/img/cos/202303131403806.jpeg)

```text
输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

**思路分析：** 对于该情况我们可以使用**双指针**的思想来进行求解，首先我们定义两个指针分别指向两侧，就如第 0 根和第 8 根，然后得出当前的容量大小为 1×8=8，因为两根柱子的最低高度为 1，选最低的进行计算。下来我们继续分析这种情况，因为要求解最大容量，为了前进必须排除柱子，我们从两根最低的柱子进行排除。第 0 根柱子高度为 1，想一下如果第 0 根柱子匹配到 1~7 根柱子的时候，它的宽度再降低，而它的**最终计算的高度（两根柱子的最小值）**绝对不会超过当前**第 0 根柱子**，所以当前的容量就是第 0 根柱子参与所能得到的最大容量，所以我们就可以记录当前的容量，接着排除第 0 根柱子。

当第 0 根柱子排除以后，定义的双指针假设 i 为左指针 j 为右指针，排除 0 后 i++，j 还是等于 8，此时容器的区间为 1~8，计算其容量为 7×7=49，最小的柱子为第 8 根。接着我们继续想下去，和第 8 根进行匹配的柱子是不是当前的容量是最大的，不相信？🤣 你接着拿第 2~7 根柱子分析一波，你会惊奇的发现，咦？😳 它的宽度逐渐降低，然而它的最高的高度也不会超过第 8 根柱子，哈哈哈奇妙吧！所以当前的容量记录的就是第 8 根柱子能达到的最大容量，然后更新当前的容量值，继续拿下一个柱子开刀，当然是要从你当前记录的那个柱子开始了：如果柱子在左边 i++，柱子在右侧 j--；所以思路就很明确啦：

1. 定义两个指针 i、j 分别指向 0 和 len-1，接着定义一个最大容量 maxCup。✔
2. 一个循环只有当符合 i&lt;j 时执行。✔
3. 在内侧首先需要得到当前的容量，简单的计算 (j-i)*(最小的高度 minHeight(i,j))，计算后更新最大值。
4. 然后容器的宽度开始收缩，如果 height[i]&lt;height[j] 说明右边不动，左边收缩，很 nice；反之就右边收缩，如果两者相等，收缩哪边都可以，这样就解决了。

```java
class Solution {
    public int maxArea(int[] height) {
    	int res=0;
    	int i=0;
    	int j=height.length-1;
    	while (i<j){
    		int area=(j-i)*Math.min(height[i],height[j]);
    		res=Math.max(area,res);
    		if (height[i]<height[j]){
    			i++;
			}else {
    			j--;
			}
		}
    	return res;
    }
}
}
```

## LeetCode 15：三数之和

给你一个整数数组 `nums`，判断是否存在三元组 `[nums[i], nums[j], nums[k]]` 满足 `i != j`、`i != k` 且 `j != k`，同时还满足 `nums[i] + nums[j] + nums[k] == 0`。请你返回所有和为 `0` 且不重复的三元组。

**注意：** 答案中不可以包含重复的三元组。

**示例 1：**

```text
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
```

**示例 2：**

```text
输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
```

**提示：**

- `3 <= nums.length <= 3000`
- `-105 <= nums[i] <= 105`

**解题思路：**

如果需要进行搜寻三数之和先来瞅瞅大主线的方向：

- 先对 nums 数组进行排序（从小到大进行排序）
- 固定一个值，来进行两数之和的求值
- 去除重复的数组元素

所以下来分析就可以很容易得知道一个好的解题思路就上来了 😏 首先对数组排序会把，一个 sort 函数，其次开始进行一个元素得固定，简单一个 while 循环，从 i=0 开始到数组得长度减去 2 为止（切记不能直接遍历到最后一位了，也就是最起码你得留一个三元组在里吧 😄 也就是到倒数第三个元素就得刹车！）

举个 🌟 数组 `[-4,-1,-1,-1,0,1,2]` 首先我们固定第一个元素也就是 -4，然后简化三数之和为两数之和，可以用两个指针一个指向 -1 一个指向 2，然后我们进行一个遍历求和操作，每次操作只要把 -4 带上就行 😄 就好比他是一个已经知道得元素，你这样看首先是 -1+2-4=-3&lt;0，所以我们直接考虑将左指针向前移动一位发现还是 -1-4+2=-3，不着急接着左移 -4+2+0=-2，接着左移直到移到最后一位得时候发现，咦?❓竟然全是小于 0 得数字，所以结果是找不到。从开始加到现在我们发现一个很有趣得现象，就是所有的结果全部都小于零，所以当前你固定的第一个数 -4 是无效的 😂

所以咱就固定第二个数吧，不着急第二个数字是 -1，接着按照上述的步骤，我们可以快乐的发现 -1-1+2=0 咦 ❓ 春天来了，找到一个，然后很简单直接加入就行。加入后你会发现一个问题，再次循环操作一番后发现三个 -1 连拍出现了结果 `[-1,-1,2]` 出现了两次，所以是不是想到了去重 😸 很简单，因为这个数组是有序的能相同，说明这个数字重复的出现了，所以记录当前重复的数（可不是固定的数字熬，就比如固定数字 -1 重复数字 -2 那就记录 -2）然后让指针进行 ++ 进行一个偏移间接的去除重复三元组。

最后呢，你以为完了，nonono 还有呢当你返回到固定的数字，有没有考虑到，固定的数字也能重复，又是一个大坑，所以在固定数字的地方也进行一个重复去重，最后结果就出来了；代码如下所示：

```java
class Solution {
       public List<List<Integer>> threeSum(int[] nums) {
           //固定一个值然后进行转化，求解两数之和的问题
           //需要去除重复的三元组
           Arrays.sort(nums);
           int i = 0, len = nums.length;
           List<List<Integer>> res = new ArrayList<>();
           //此处的i从最左边开始不会到达最右边
           while (i < len - 2) {
               TwoSum(i, nums, res);
               int temp = nums[i];
               //接着去除重复的元素
               while (i < len - 2 && nums[i] == temp) {
                   i++;
               }
           }
           return res;
       }

       //-4 -1 -1 0 1 2
       private void TwoSum(int i, int[] nums, List<List<Integer>> res) {
           int p1 = i + 1;
           int p2 = nums.length - 1;
           //这里是吧i给固定了所以只需要求解p1和p2之和就可以了
           while (p1 < p2) {
               int temp = nums[p1] + nums[p2] + nums[i];
               if (temp > 0) {
                   p2--;
               } else if (temp < 0) {
                   p1++;
               } else {
                   List<Integer> list = new ArrayList<>();
                   list.add(nums[p1]);
                   list.add(nums[p2]);
                   list.add(nums[i]);
                   res.add(list);
                   int temp1 = nums[p1];
                   //需要除去重复的三元组
                   while (p1 < p2 && nums[p1] == temp1) {
                       p1++;
                   }
               }
           }

       }
   }
```

## LeetCode 17：电话号码的字母组合

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。答案可以按 **任意顺序** 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![电话按键数字到字母映射](/img/cos/202303132137796.png)

**示例 1：**

```text
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

**示例 2：**

```text
输入：digits = ""
输出：[]
```

**示例 3：**

```text
输入：digits = "2"
输出：["a","b","c"]
```

**提示：**

- `0 <= digits.length <= 4`
- `digits[i]` 是范围 `['2', '9']` 的一个数字。

**解题思路：**

本题的主要方式是**递归回溯算法**：具体的解题我们首先想到的肯定是打表 😸 不会这个都想不到吧 😆 所以根据得到的数字可以进行计算了，根据示例想到的是什么？没错就是笛卡尔积，这玩意如果你拆开一个一个的乘，累不死人才怪，所以我们只能另辟蹊径来解题了。这次比较机制的是将结果定义成私有变量，少了一个传参的必要 😙 同时也定义一个私有的 StringBuilder 来进行字符串的**拼接**，拼接？对没错就是拼接嘿嘿，看看这个**骚操作**吧！递归的进行 :happy: 递归的函数也挺简单的呃只需要一个 String 和 StringBuilder 以及一个 index（这玩意用于删除用的）方便的递归。

下面递归的开始：未开始先考虑结束的情况 😏 什么情况结束呢？首先就是传入的字符串的长度为 0 不用说直接返回，还有一种就是当前传入的 index 的大小正好为字符串的长度 😸 想到了什么 ❓ 没错笛卡尔积的结果，如果 digital 为两位数那么它的笛卡尔积结果每一项都是两位数，所以你想什么呢? 直接存到结果中呀！当然这是最后递归的结果，下面开始叙述逻辑了：开车开始，简单每个循环首先得到的肯定是当前的 index 对应的字符串，然后就进行一个字符串长度的遍历，重要的来了！**重要的来了！** 在循环里面，首先就是对 sb 进行续接，接上后就要递归进去了然后如果还有的话就继续递归进去，那是否你有个问题就是 sb 会越来越长！**聪明**，不过别急还有后招呢，在递归结束的最后我们需要把每次我们添加的元素再删除了，这不就没了吗 😄 惊不惊喜意不意外 😏 所以总体来说就是加一个删除一个，哈哈哈看看具体的实例过程你就明白了。

比如两个字符串笛卡尔积 abc、efg：

- 首先取出 a 接入 sb 中，接着递归进去就到了 efg 接着再取出 e 接续到 a 的后面，当再递归进去的时候会发现 str=index 所以这个 ef 就添加到了结果中，接着回溯到上一级就是刚刚把 e 添加再尾部，接着咱再把这个 e 个去除了，在一个 for 循环中接着开始对 f 进行拼接 😃
- 当 a 和 efg 逐个拼接完成后，再递归出最外层，将 a 给删除了下来就进行 b 的递归 😆
- 然后就直接输出结果就行了

```java
class Solution {
       //回溯算法
    //首先进行打表
       String digitsMap[] = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
       List<String> res = new ArrayList<>();
    //进行字符串拼接的方法
       StringBuilder stringBuilder = new StringBuilder();

       public List<String> letterCombinations(String digits) {
           combination(digits, stringBuilder, 0);
           return res;
       }
        void combination(String str, StringBuilder sb, int index) {
           if (str.length() == 0) {
               return;
           }
           if (index == str.length()) {
               res.add(new String(sb));
               return;
           }
           char c = str.charAt(index);
           int pos = c - '0';
           String currentStr = digitsMap[pos];
           for (int i = 0; i < currentStr.length(); i++) {
               sb.append(currentStr.charAt(i));
               //深入递归算法
               combination(str, sb, index + 1);
               sb.deleteCharAt(index);
           }
       }
   }
```

## LeetCode 21：合并两个有序链表

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

**示例 1：**

![合并两个有序链表示意图](/img/cos/202303132313967.jpeg)

```text
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

**示例 2：**

```text
输入：l1 = [], l2 = []
输出：[]
```

**示例 3：**

```text
输入：l1 = [], l2 = [0]
输出：[0]
```

**提示：**

- 两个链表的节点数目范围是 `[0, 50]`
- `-100 <= Node.val <= 100`
- `l1` 和 `l2` 均按 **非递减顺序** 排列

**解题思路：**

本题说难的话特别难，说简单的话特别简单，只要有一个**递归**的思想 😺 啥都不是事，老老实实的开始开车讲解：

这就是一个简单的双链表进行合并，根据题目可以知道如果 list1 为空返回 list2，反之则返回 list1，所以一切貌似变得简单了起来。我们以两个链表来看，如果 list1 的值小于 list2 的值则对 list1 链表来进行操作，让 list1 的下一个指向另外两个链表的合并；如果 list1 的值大于等于 list2 则让 list2 的下一个指向另外两个链表的合并。这里我也说的模模糊糊的大概就是这个意思递归的加入链表，每次都加入最小的值。

```java
 public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
if (list1 == null){
	return list2;
}else if (list2 == null){
	return list1;
}else if (list1.val< list2.val){
	list1.next=mergeTwoLists(list1.next,list2);
	return list1;
}else {
	list2.next=mergeTwoLists(list1,list2.next);
	return list2;
}
   }
```

## LeetCode 22：括号生成

数字 `n` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 **有效的** 括号组合。

**示例 1：**

```text
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
```

**示例 2：**

```text
输入：n = 1
输出：["()"]
```

**提示：**

- `1 <= n <= 8`

![括号生成搜索树](/img/cos/202303140839555.png)

**解题思路：**

其实这道题也非常的简单 😂 就如上面的图清晰明白吧，很好的想法，给你数字 n，那么右侧左侧全有 n 个，我们画出关键的树 😋，然后就得到了上述图，我们会惊奇的发现 😮 竟然还有截肢，当然当左括号的数目小于右括号，无论你怎么加都符合不了，对吧？😏 然后下来就好整了，其中有一个就是**截肢**。对于符合的我们先递归的进行，首先对左子树一路递归到底，每次 left-1，然后 str 上面进行加上 `'('`，忘了忘了，**咱们递归先考虑的是啥？？** 😅 当然是递归结束，😨 所以呢，结束的标志是什么？当然是 left=right=0 了，根据上图就能看出。所以咱们的递归的参数就有 4 个：第一个是每次进行加括号的 str，第二第三个是 left 和 right 的数值也就是 n，最后一个别想了就是存结果的 List 😪，那么想法就非常简单了，就往死里递归就行了，当两个都等于 0 直接加入结果退出循环，反之如果 left>0 就调用递归函数，一直递归到 left=0，接着再调用 right>0 的部分直至递归到 left 也 =0，😚 然后结果就出来了。如下所示：

kao! 突然忘了还有截肢呢，就是在递归的途中如果发现 left>right 直接 return 不用想违规了 😪 就这样！

```java
class Solution {
    public List<String> generateParenthesis(int n) {
	//可以考虑深度优先遍历

		ArrayList<String> result = new ArrayList<>();
		if (n==0){
			return result;
		}
		dfs("",n,n,result);
		return result;
	}
	private void dfs(String curStr,int left,int right,List<String>res){
    	if (left==0&&right==0){
    		res.add(curStr);

    		return;
		}
    	//需要删除不需要当左侧剩余大于右侧也就是不满足了括号的匹配法则
    	if (left>right){
    		return;
		}
        //往左子树死里递归
    	if (left>0){
    		dfs(curStr+"(",left-1,right,res);
		}
        //右子树死里递归
    	if (right>0){
    		dfs(curStr+")",left,right-1,res);
		}
	}
```

## LeetCode 31：下一个排列

整数数组的一个 **排列** 就是将其所有成员以序列或线性顺序排列。

- 例如，`arr = [1,2,3]`，以下这些都可以视作 `arr` 的排列：`[1,2,3]`、`[1,3,2]`、`[3,1,2]`、`[2,3,1]`。

整数数组的 **下一个排列** 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 **下一个排列** 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。

- 例如，`arr = [1,2,3]` 的下一个排列是 `[1,3,2]`。
- 类似地，`arr = [2,3,1]` 的下一个排列是 `[3,1,2]`。
- 而 `arr = [3,2,1]` 的下一个排列是 `[1,2,3]`，因为 `[3,2,1]` 不存在一个字典序更大的排列。

给你一个整数数组 `nums`，找出 `nums` 的下一个排列。

必须 **[原地](https://baike.baidu.com/item/原地算法)** 修改，只允许使用额外常数空间。

**示例 1：**

```text
输入：nums = [1,2,3]
输出：[1,3,2]
```

**示例 2：**

```text
输入：nums = [3,2,1]
输出：[1,2,3]
```

**示例 3：**

```text
输入：nums = [1,1,5]
输出：[1,5,1]
```

**提示：**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 100`

**题解思路：**

本题吧，我是没有做出来，但是答案是看懂了，它说的这么多就是一个意思：给你一个当前的数字，你给我找出来这些数字随机组合后并进行排序后当前数字的下一个最大的数字。等等 😧 你不会真的将他们随机组合加排序吧！！！这样能累死人的好吧，咱们想一个好的方法不香吗？按照我的思路来，既然是要找一个比他大一丢丢的数字，很简单了，咱们就改动最小让其增加的最多就好了。关键点了**敲黑板** 😈 咱们从最后的一个数字开始进行查找，当然如果要交换准确的是从倒数第二个数字开始 😗 然后我们找到当前的数字小于它的下一个数字的下标，这个玩意是为了确保 i 的位置，以及预防一种情况就是当这个数字正好是从小到大排的，如果不这样的话到最后直接 G，所以找到当前的 i 值后说明 i~n-1 一定有一个数是他小于的；接着咱找需要交换的数字，再次循环，根据得到的 i 找到第一个 `nums[j]>nums[i]` 的值 😏 找到后不用想定位 j，直接对 i、j 位置的元素进行交换。你以为这样就完了？？想的太美好了，就例如 231 你找到了 i=0，j=1 也就是 2 和 3 进行交换结果 321 完美！呼死你 😇 你把我 312 吃了，我比你更接近好吧，所以别心急，还需要对 i 之后的元素进行一个排序这样就完美的解决了问题！

- 从后往前找到第一个（最大索引）比自己后一位小的元素，确定 i 的位置
- 从后往前找第一个比 `nums[i]` 大的元素下标为 j，交换两个位置的元素
- 翻转 i+1 到 n-1 的元素，得到下一个序列

```java
class Solution {
      public void nextPermutation(int[] nums) {
          //153162 i要找到最小的，j要找到刚刚大于i一点点的
          int i = nums.length - 2;
          //找到对应得i值
          while (i >= 0 && nums[i] >= nums[i + 1]) {
              i--;
          }
          //找到j得值。前提是i>0如果不大于零说明啥？从该序列从大到小得排序，直接反转序列就行了，还管啥j得事情
          if (i >= 0) {
              int j = nums.length - 1;
              while (j >= 0 && nums[j] <= nums[i]) {
                  j--;
              }
              swap(nums, i, j);
          }
          reverse(nums, i + 1);
      }

      public void swap(int[] nums, int i, int j) {
          int temp = nums[j];
          nums[j] = nums[i];
          nums[i] = temp;
      }
      //提高算法得效率这个i之后得序列是有规律的直接对齐进行高低位的交换就行了
      public void reverse(int[] nums, int start) {
          int left = start;
          int right = nums.length - 1;
          while (left < right) {
              swap(nums, left, right);
              left++;
              right--;
          }
      }
  }
```

## LeetCode 39：组合总和

给你一个 **无重复元素** 的整数数组 `candidates` 和一个目标整数 `target`，找出 `candidates` 中可以使数字和为目标数 `target` 的所有 **不同组合**，并以列表形式返回。你可以按 **任意顺序** 返回这些组合。

`candidates` 中的 **同一个** 数字可以 **无限制重复被选取**。如果至少一个数字的被选数量不同，则两种组合是不同的。

对于给定的输入，保证和为 `target` 的不同组合数少于 `150` 个。

**示例 1：**

```text
输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。
```

**示例 2：**

```text
输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]
```

**示例 3：**

```text
输入: candidates = [2], target = 1
输出: []
```

**提示：**

- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- `candidates` 的所有元素 **互不相同**
- `1 <= target <= 40`

**解题思路：**

看到这道题是不是有种似曾相识的感觉？😇！没有？扇给你两个八张，**回溯**呀！多么容易就能看出的感觉，你看看这 target 每次减少它一点然后再递归递归完成后再加载过来不就行了蛮，所以蛮具体思路清晰了。我们开始来讨论参数了，简单回溯的参数这个还确实有点多，让人头大 😈 不过没关系慢慢的分析就简洁明了了：首先那个 candidates 肯定是需要的，我们还需要个啥？回溯！肯定是遍历的起始和结束整数啦，然后还需要一个能存储结果集的 `List<List<Integer>>` 最后需要一个栈呀来依次存放添加的元素也可以使用链表都可以无伤大雅 😯 然后一切准备就绪就开始递归遍历啦！？？？❓你是否忘掉了啥！没错递归结束的条件呀，真笨，这都不写，你想一辈子递归下去？所以简单的分析一波，递归的结束无非两种：一种就是没有找到对应的数组，直接返回；另一种是有结果了，就添加到 res 中就行了 😊 所以呢，你就直接添加呀 `res.add(new ArrayList(stack))` 这就默认直接转换了这不就直接添加了。

接着就需要了解小回溯的部分了，他每次都得到当前的 candidates 的值先加入 stack 中然后让 target 减去该值接着放入到递归中，当最后的结果完成了还需要回溯呢，需要将它的值再加回来而且也要移除 stack 的最后一位元素，这样回溯就完成了，代码如下：

```java
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
	//一个回溯的算法很容易思考的
		int len=candidates.length;
		List<List<Integer>>res=new ArrayList<>();
		if (len==0){
			return res;
		}
		Deque<Integer> stack = new ArrayDeque<>();
		dfs(candidates,0,len,res,stack,target);
		return  res;
	}
	private void dfs(int []candidates,int begin,int len,List<List<Integer>>res,Deque<Integer> stack,int target){
		if (target<0){
			return;
		}
		if (target==0){
			res.add(new ArrayList<>(stack));
			return;
		}
		for (int i=begin;i<len;i++){
			stack.addLast(candidates[i]);
			target-=candidates[i];
			dfs(candidates,i,len,res,stack,target);
			stack.removeLast();
			target+=candidates[i];
		}
	}
}
```

## LeetCode 46：全排列

给定一个不含重复数字的数组 `nums`，返回其 _所有可能的全排列_。你可以 **按任意顺序** 返回答案。

**示例 1：**

```text
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**示例 2：**

```text
输入：nums = [0,1]
输出：[[0,1],[1,0]]
```

**示例 3：**

```text
输入：nums = [1]
输出：[[1]]
```

**提示：**

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- `nums` 中的所有整数 **互不相同**

**思路题解：**

真是服了有一次没做出来 😰 咋变了个样子又忘了原先的套路了呢，这次要好好的想想了，真是看了题解才一切都明了 😭 多么秒的解法呀！自己解的时候关键的点在于那个不重复的数字的数组，所以自己搞得一大度 111、222、112 这个不重复没有解决哎~😬 不过这次有进步，懂得了需要不重复可以创建一个 boolean 数组来记录当前的数组是否使用过了就可以了蛮，所以一切 👉 回归了原始：👽 递归的遍历有深度（depth）和是否使用过（used）以及当前的数组结果和长度，先考虑结束的情况就是当 len=depth 是进行加入结果操作。对于回溯部分，我们可以每次从 0 开始遍历到某个数字加入到预先定义的栈中，并且将当前的 used 设置为 true 接着调用 dfs，调用完后再将 used 设置为 false 就可以了，代码如下所示：

```java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
	int len=nums.length;
	List<List<Integer>>res=new ArrayList<>();
		Deque<Integer>stack=new ArrayDeque<>();
		boolean used[]=new boolean[len];
		dfs(nums,0,len,res,stack,used);
    	return res;
    }
    private void dfs(int []nums,int depth,int len,List<List<Integer>>res,Deque<Integer>stack,boolean[] used){
    	if (depth==len){
    		res.add(new ArrayList<>(stack));
    		return;
		}
    	for (int i=0;i<len;i++){
    		if (used[i]){
    			continue;
			}
    		stack.addLast(nums[i]);
    		used[i]=true;
    		dfs(nums,depth+1,len,res,stack,used);
    		stack.removeLast();
    		used[i]=false;
		}
	}
}
```

## LeetCode 55：跳跃游戏

给定一个非负整数数组 `nums`，你最初位于数组的 **第一个下标**。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个下标。

**示例 1：**

```text
输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
```

**示例 2：**

```text
输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
```

**提示：**

- `1 <= nums.length <= 3 * 104`
- `0 <= nums[i] <= 105`

**解题思路：** 可以利用**贪心**来进行操作，每次得到的次数都进行一个比较更新它能跳的最远的值。

```java
class Solution {
    public boolean canJump(int[] nums) {
    	//解题思路直接每一步都进行跳跃就可以了,每次记录他能跳跃的最远距离
		int k=0;
        for(int i=0;i<nums.length;i++){
            //判断是否能够到达当i>k的时候就说明接下来无论如何都不会在进行前进了
            if(i>k)return false;
            //(i+nums[i])这个可以求出每一项元素能跳的最远距离与当前能跳的最远距离进行比较，如果大于就更新，反之就保持原本的不变
            k=Math.max(k,i+nums[i])
        }
        return true;
    }
}
```

## LeetCode 62：不同路径

一个机器人位于一个 `m x n` 网格的左上角（起始点在下图中标记为 "Start"）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 "Finish"）。

问总共有多少条不同的路径？

**示例 1：**

![不同路径网格示意图](/img/cos/202303142002569.png)

```text
输入：m = 3, n = 7
输出：28
```

**示例 2：**

```text
输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下
```

**提示：**

- `1 <= m, n <= 100`
- 题目数据保证答案小于等于 `2 * 109`

**题解思路：**

根据题目我们很容易的知道这道题是个**动态规划**问题，哎又是不会的一道，感觉思想貌似扭住了，看了题解顿时恍然大悟。。。😨 其实动态规划很简单的意思就是考虑部分，就拿机器人来说，最简单的考虑就是从 start-finish 的路径最简单的理解就是从 m+n-2 步中挑出下移的步骤也就是 m-1，总体来说就是 C(m-1,m+n-2) 的二项公式 😨 然后呢我们要以代码的思维来解决这道题，就拿任意一个点我们很容易知道它的来源路径 `dp[i-1][j]` 或者 `dp[i][j-1]`，也就是 `dp[i][j]=dp[i-1][j]+dp[i][j-1]`。所以根据这个公式一切都变得简单了，我们从头开始走每次经历下一个都会将 dp 中下一个数字进行更新，直至全部的 dp 表更新完成就行，每个 `dp[i][j]` 内容都是从开始到达 (i,j) 的路径条数。但是对于边界需要特殊的处理也就是他们只能一个方向移动，也就是他们的初始化结果为 1。所以代码实现如下所示：

```java
class Solution {
    public int uniquePaths(int m, int n) {
		int [][]dp=new int[m][n];
		//动态规划首先将边界上的值都定为1因为他们只能从一个方向移动
		for (int i=0;i<n;i++)dp[0][i]=1;
		for (int i=0;i<m;i++)dp[i][0]=1;
		//根据dp[i][j]它可以是从dp[i-1][j]来的也可以是dp[i][j-1]来的
		for (int i=1;i<m;i++){
			for (int j=1;j<n;j++){
				dp[i][j]=dp[i-1][j]+dp[i][j-1];
			}
		}
		//只需要考虑它的来源就行了
		return dp[m-1][n-1];
    }
}
```

## LeetCode 96：不同的二叉搜索树

给你一个整数 `n`，求恰由 `n` 个节点组成且节点值从 `1` 到 `n` 互不相同的 **二叉搜索树** 有多少种？返回满足题意的二叉搜索树的种数。

**示例 1：**

![不同的二叉搜索树示例](/img/cos/202303151030746.jpeg)

```text
输入：n = 3
输出：5
```

**示例 2：**

```text
输入：n = 1
输出：1
```

**提示：**

- `1 <= n <= 19`

**思路题解：**

纯纯的数学问题，如果理解了这个数学原理这个小题还是手到擒来 😏 你这样来看一下我先去偷几张图片。

![二叉搜索树推导图一](/img/cos/202303151034600.png)

![二叉搜索树推导图二](/img/cos/202303151035388.png)

![二叉搜索树推导图三](/img/cos/202303151035345.png)

![二叉搜索树推导图四](/img/cos/202303151035946.png)

![二叉搜索树推导图五](/img/cos/202303151035135.png)

![二叉搜索树推导图六](/img/cos/202303151036372.png)

![二叉搜索树推导图七](/img/cos/202303151036259.png)

看懂了吗？大概就是当你以某个值为根节点的时候就需要分成两部分右子树 (i-1) 和左子树 (n-i) 那么总的情况就是两者相乘 😄 然后好玩的来了，对于右子树是不是还可以继续向下递归，左子树同理，然后就把自己给递归死了 😭 不要着急，递归总有个头，头是什么呢？当然是 n=1 和 n=0 呀他们两个的结果都为 1，所以一切都变得好起来了。

还有值得提一嘴的是：二叉树的左子树数值小于右子树，也就是中序遍历的是有序的！！

所以代码思想就是：首先规定递归的结束就是 `n=1||n=0` 返回 1 😸 而且给一个总的 count 来记录当前的值开始从 i=1 开始让每一个数字都当一次根节点，并且每次都记录其左子树和右子树的种类，并且将其相乘的结果与 count 累加；但是后来你会发现一个严重的问题就是大量的重复递归 ❓ 怎么解决呢？首先想到的是每次每个根节点对应的 count 值是相同的，那我们把他记录下来，当下次需要的时候直接查询就好了!!🚚 简单一个 map 容器就实现了这个逻辑：全局构建一个 map 容器，将每次递归的结果放入 map（n,count），然后在每次递归的前面进行判断，当前容器是否还有 n 的 count 值有的话直接就 return 就行了，省的接着递归 😄

代码如下所示：

```java
class Solution {
		Map<Integer,Integer> map=new HashMap<>();
    public int numTrees(int n) {
    // 1 2 5 14 42
		if (n==1||n==0){
			return 1;
		}
        //判断当前的容器是否有n对应的count值有的话直接return没有在递归遍历
		if (map.containsKey(n)){
			return map.get(n);
		}
		int count=0;
		for (int i=1;i<=n;i++){
			int leftNum=numTrees(i-1);
			int rightNum=numTrees(n-i);
			count+=leftNum*rightNum;
		}
        //将每次的n递归的结果进行保存
		map.put(n,count);
		return count;
    }
}
```

## LeetCode 114：二叉树展开为链表

给你二叉树的根结点 `root`，请你将它展开为一个单链表：

- 展开后的单链表应该同样使用 `TreeNode`，其中 `right` 子指针指向链表中下一个结点，而左子指针始终为 `null`。
- 展开后的单链表应该与二叉树 [**先序遍历**](https://baike.baidu.com/item/先序遍历/6442839?fr=aladdin) 顺序相同。

**示例 1：**

![二叉树展开为链表示意图](/img/cos/202303152012442.jpeg)

```text
输入：root = [1,2,5,3,4,null,6]
输出：[1,null,2,null,3,null,4,null,5,null,6]
```

**示例 2：**

```text
输入：root = []
输出：[]
```

**示例 3：**

```text
输入：root = [0]
输出：[0]
```

**提示：**

- 树中结点数在范围 `[0, 2000]` 内
- `-100 <= Node.val <= 100`

**题目解析：**

本道题很简单的思路：**回炉重造!!** 😃 很简单吧，前序遍历你会吧，构造一个新的树你也会吧，然后一切都简单了哈哈哈 😏 简单的遍历将所有的节点存储起来，然后再对储存的节点进行遍历，每次遍历都让其左子树为 null 下一个指向右子树：就这么简单，代码实现如下所示：

```java
class Solution {
    public void flatten(TreeNode root) {
		List<TreeNode>list=new ArrayList<>();
		creatTree(root,list);
		int size=list.size();
        //对集合进行重新的构造 easy
		for (int i=1;i<size;i++){
			TreeNode prev=list.get(i-1),curr=list.get(i);
			prev.left=null;
			prev.right=curr;
		}

    }
    //得到节点的集合
    private void creatTree(TreeNode root,List<TreeNode> list){
    	if (root!=null){
    		list.add(root);
    		creatTree(root.left,list);
    		creatTree(root.right,list);
		}

	}
}
```

## LeetCode 148：排序链表

给你链表的头结点 `head`，请将其按 **升序** 排列并返回 **排序后的链表**。

**示例 1：**

![排序链表示例一](/img/cos/202303160917576.jpeg)

```text
输入：head = [4,2,1,3]
输出：[1,2,3,4]
```

**示例 2：**

![排序链表示例二](/img/cos/202303160917579.jpeg)

```text
输入：head = [-1,5,3,4,0]
输出：[-1,0,3,4,5]
```

**示例 3：**

```text
输入：head = []
输出：[]
```

**提示：**

- 链表中节点的数目在范围 `[0, 5 * 104]` 内
- `-105 <= Node.val <= 105`

**思路解析：**

看到这道题进行排序一个大胆而又简单的方法浮现再脑中：首先收集所有的元素 😏 到一个数组中，然后排序，最后构造新的链表 😂（这个方法切实可行都搞出来了）就是时间复杂度和空间复杂度有些高，不会吧不会这样搞吧！当然不是了 😂 进入正题，我们看到排序这道题而且又要快速的进行，首先想到的不二法门就是**归并排序**：很方便的如下图。

![归并排序示意图](/img/cos/202303160928100.png)

通过递归实现归并排序主要包含两个步骤：

- **分割 cut 环节**：就是找到链表的中点，然后进行切开，一个可行的方案就是快慢指针，一个每次走一下，一个走两下是不是他们之间的差距就是二倍 😼 当我们找到中点的时候要干嘛，当然是切开链表了! 笨! 切开后就分开进行递归操作，将两条链表的头节点传入递归函数中。当然要递归肯定要考虑递归的终止条件呀，想想，当递归到最后发现什么 ❓ 是不是只有一个节点了也就是头，所以结束的条件很简单 head.next=null 说明递归结束啦！！
- **合并 merge 环节**：将两个排序后的链表进行合并，转化为一个链表。

这步操作就有些想头了 😹 因为需要两条链表的合并，并不是那么好操作，所以综合考虑就进行一个很常见的操作也就是双指针合并法，需要一个辅助指针 h 作为头部进行合并操作。

具体方法就是设置两个指针分别指向两链表的头部，比较两指针处节点值的大小，由小到大加入合并链表头部，指针交替前进，直至添加完成两个链表就行啦，是不是很好理解 😏 其实这里不需要进行新节点的创建，咱们只需要改变指针的指向就 ok 了，在一个新的链表上面让他疯狂的指来指去。当然当合并完成后可还没有结束，考虑一种当左链表比较短，当逐渐的加入后左链表元素用完了怎么办？这里需要一个很好的解决方法：哈哈哈左边完了，直接将右边的全部拼接上来不就行了嘛，直接一条道走向成功。代码实现如下所示：

```java
class Solution {
    public ListNode sortList(ListNode head) {
        //结束的条件也就是头节点为空（防止空链表）或者只剩下一个节点
		if (head==null||head.next==null){
			return head;
		}
        //快慢指针找到中间的值
		ListNode fast=head.next,slow=head;
		while (fast!=null&&fast.next!=null){
			slow=slow.next;
			fast=fast.next.next;
		}
        //因为慢指针会慢一步，所以需要一个临时节点存储第二条链表的头部
		ListNode tmp=slow.next;
        //断开链表
		slow.next=null;
        //对左链表进行递归
		ListNode left=sortList(head);
        //对右链表进行递归
		ListNode right=sortList(tmp);
        //一个储存结果的链表
		ListNode h=new ListNode(0);
		ListNode res=h;
        //加入链表的结束条件就是两个链表都不为null
		while (left!=null&&right!=null){
			if (left.val<right.val){
				h.next=left;
				left=left.next;
			}else {
				h.next=right;
				right=right.next;
			}
			h=h.next;
		}
        //当出现左链表都空的话直接把右链表全部搬过来:完！
		h.next=left!=null?left:right;
		return res.next;
	}
}
```

## LeetCode 152：乘积最大子数组

给你一个整数数组 `nums`，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

测试用例的答案是一个 **32-位** 整数。

**子数组** 是数组的连续子序列。

**示例 1：**

```text
输入: nums = [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
```

**示例 2：**

```text
输入: nums = [-2,0,-1]
输出: 0
解释: 结果不能是 2, 因为 [-2,-1] 不是子数组。
```

**提示：**

- `1 <= nums.length <= 2 * 104`
- `-10 <= nums[i] <= 10`
- `nums` 的任何前缀或后缀的乘积都 **保证** 是一个 **32-位** 整数

**解题思路：**

想都不用想一看就是**动态规划**的思想，不过这里有个比较有意思的情况，就是需要考虑负数的情况，每次记录的乘积结果根据下一个值的不同而进行动态改变 😏 然后我们需要将 max 和 min 一起作为代表，才能很好地解决这道题目。`fmax[i]`、`fmin[i]` 表示以 i 结尾的最大、最小乘积的数组，一切都变得好理解了，直接打表，对每一个以 i 结尾的数组进行相应的操作，咱们不需要考虑是否截取了某一段，反正最后的结果只是需要某一段的乘积最大值 😃 所以呢就可以得到很好的**状态转移方程式**：

`fmax[i] = max{fmax[i-1]*nums[i], fmin[i-1]*nums[i],nums[i]}`

`fmin[i] = min{fmax[i-1]*nums[i], fmin[i-1]*nums[i],nums[i]}`

根据以上的式子就可以求出每个以 i 结尾的子项的最大最小值。

最后一个遍历循环找出 fmax 中的最大值就可以了 😂

```java
class Solution {
    public int maxProduct(int[] nums) {
    	int n=nums.length;
    	int[]fmax=new int[n];
    	int[]fmin=new int[n];
    	fmin[0]=nums[0];
    	fmax[0]=nums[0];
        //这个需要好好的思考一下，很好的存储了当前i之前的最大最小值，而且有一点就是它是原数组的子集是能连续起来的!
    	for (int i=1;i<n;i++){
    		fmax[i]=Math.max(Math.max(nums[i]*fmax[i-1],nums[i]*fmin[i-1]),nums[i]);
    		fmin[i]=Math.min(Math.min(nums[i]*fmax[i-1],nums[i]*fmin[i-1]),nums[i]);
		}
    	int ans=fmax[0];
    	for (int i=0;i<n;i++){
    		ans=Math.max(ans,fmax[i]);
		}
    	return ans;
    }
}
```

**方法二：更好理解**

该题明显就是一个动态规划问题：从小偷的角度出发，每次当他到达一个地点无非两种选择，要么偷要么不偷 😂 而且有意思的是为了保证最后的金额最大，每次偷取相邻的三个之内必定要有一个被偷，所以这里记录一个 `f[i]` 表示前 i 个能偷的最大金额。首先就是初始化将 `f[0]` 和 `f[1]` 进行初始化后，直接对 nums 进行遍历，当遍历到一个数的时候两种情况：偷的话就是 `nums[i]+f[n-2]`，不偷的话就是 `f[i-1]`，取两者的最大值就行了，代码实现如下所示：

```java
class Solution {
    public int rob(int[] nums) {
		//一个动态规划的题目
		int n=nums.length;
		if (n==0){
			return 0;
		}
		if (n==1){
			return nums[0];
		}
		int[]f=new int[n];
		f[0]=nums[0];
		f[1]=Math.max(nums[1],nums[0]);
		for (int i=2;i<n;i++){
			f[i]=Math.max(nums[i]+f[i-2],f[i-1]);
		}
		return f[n-1];

    }
}
```

## LeetCode 207：课程表

你这个学期必须选修 `numCourses` 门课程，记为 `0` 到 `numCourses - 1`。

在选修某些课程之前需要一些先修课程。先修课程按数组 `prerequisites` 给出，其中 `prerequisites[i] = [ai, bi]`，表示如果要学习课程 `ai` 则 **必须** 先学习课程 `bi`。

- 例如，先修课程对 `[0, 1]` 表示：想要学习课程 `0`，你需要先完成课程 `1`。

请你判断是否可能完成所有课程的学习？如果可以，返回 `true`；否则，返回 `false`。

**示例 1：**

```text
输入：numCourses = 2, prerequisites = [[1,0]]
输出：true
解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
```

**示例 2：**

```text
输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
输出：false
解释：总共有 2 门课程。学习课程 1 之前，你需要先完成课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。
```

**提示：**

- `1 <= numCourses <= 105`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- `prerequisites[i]` 中的所有课程对 **互不相同**

**解题思路：**

做这道题一开始没什么思路，想法是有的就是有点难以实现 😂 第一个想法就是我能不能构造一个链表 ❓ 然后再利用快慢指针，因为如果不符合题意的要求肯定是存在环路，咱只需要快指针能追得上慢指针就行了。然后仔细一想，不对呀! 😹 这个链表不止有一条，有许多条，这个肯定行不通，然后就思索第二条出路，这部参考一下，nice 竟然使用了**图**的方法构造一个**入度表**，每次让入度为零的点出栈，对别的点进行消边，如果别的点的入度为零继续入栈，然后出栈，等等等有些迷瞪了？看图说话 😃

![课程表拓扑排序图一](/img/cos/202303172031159.png)，![课程表拓扑排序图二](/img/cos/202303172031176.png)，![课程表拓扑排序图三](/img/cos/202303172031412.png)，![课程表拓扑排序图四](/img/cos/202303172031101.png)，![课程表拓扑排序图五](/img/cos/202303172031270.png)，![课程表拓扑排序图六](/img/cos/202303172031105.png)，![课程表拓扑排序图七](/img/cos/202303172031710.png)，![课程表拓扑排序图八](/img/cos/202303172031688.png)，![课程表拓扑排序图九](/img/cos/202303172031752.png)，![课程表拓扑排序图十](/img/cos/202303172031698.png)，![课程表拓扑排序图十一](/img/leetcode/e91ef7c5d01de19f3ef7126e3503430867f897d01f81b7a7607dd551a8743786-207-11.png)，![课程表拓扑排序图十二](/img/leetcode/7fcc5454f1562a1b231aa1fba29bd023c719730257776a10a64c5f5282660fb8-207-12.png)，![课程表拓扑排序图十三](/img/cos/202303172031516.png)

对对对就是这个思路，咱就一个一个点的删除，当删除到最后看看是不是将原本传入的 numCourses 置为 0 了，如果成功恭喜你：一切都成功了。下面看代码说话，这个程序代码有点绕，奶奶的确实绕! 看看理解理解吧。

```java
class Solution {
      //[[3, 0], [3, 1], [4, 1], [4, 2], [5, 3], [5, 4]]一个能完成的例子
       public boolean canFinish(int numCourses, int[][] prerequisites) {
           //初始化入度的点集合都让他的入度为0
           int[] RuDu = new int[numCourses];
           //建立一个点的集合，这个用来存放（B--->A）中的A，因为对于B来说学习完成后可以学习多个A
           List<List<Integer>> DianJi = new ArrayList<>();
           //这个是初始化队列主要用于存放那些入度为0的课程号，以便后来的逐个进行去除如上图所示
           Queue<Integer> queue = new LinkedList<>();
           //这个就有意思了因为我们之前构造了一个Dianji这里我们要吧它的大小扩充到numCourse哈哈这里是为了使用它的下标来表明是那个课程
           //然后再对应的课程下面存放了一些他需要修行的先行课也就是下标代表B,里面的list集合代表A
           for (int i = 0; i < numCourses; i++) {
               DianJi.add(new ArrayList<>());
           }
           //这个就是开始进行一个RuDu的初始化以及，对修课程B所需要的课程A进行构造
           for (int[] cp : prerequisites) {
               //有数据的结构如[A,B]==> B--->A也就是A的优先级要高B更次级所以这里的入度就是cp[0]
               RuDu[cp[0]]++;
               //这个好好思虑一波这个意思就是再课程B的下标出添加他修完后能继续修习A课程的集合
               //先将相同的B对应A的集合存入，然后在队列中找到一个课程B并取出集合A的元素，有这个元素可以对应到入度数组进行--操作
               DianJi.get(cp[1]).add(cp[0]);
           }
           //第一次首先将入度为0的给记录入栈
           for (int i = 0; i < numCourses; i++) {
               if (RuDu[i] == 0) queue.add(i);
           }
           //当栈不为空就循环
           while (!queue.isEmpty()) {
               //先取出度数为0的课程也就是一个课程点出栈
               int pre = queue.poll();
               numCourses--;
               //在DianJi中找到对应的A集合中的元素，如果在RuDu的集合中不为0就进行--操作，当减到为0就入栈
               for (int cur : DianJi.get(pre))
                   if (--RuDu[cur] == 0) queue.add(cur);
           }
           //对结果进行一个判断
           return numCourses == 0;
       }
   }
```
