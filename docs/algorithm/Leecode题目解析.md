---
title: "Leecode题目解析"
---

<!-- truncate -->
#### [1441\. 用栈操作构建数组](https://leetcode.cn/problems/build-an-array-with-stack-operations/)

```java
//看到该题我们想到的是可以利用一次循环对list链表进行不断的补充push和pop操作
/*
因为target数组的长度一定小于list的长度 所以根据题目的意思可以知道 无论是否符合target list的元素都进行一次Push操作如果不同则 在进行一次pop操作，这样思路就清晰了
1.首先我们统计target的长度，然后定义一个指针指向第一个元素，然后push进入结果数组，如果比对成功指针++操作
2.其次我门定义一个指针指向list数组然后，如果没有比对成功就让指针++，则pop进入结果数组。
*/

class Solution {
    //两个不变的的数据进入结果集合
    private  final  static String p="Push";
    private  final  static String r="Pop";
    public List<String> buildArray(int[] target, int n) {
        int []list=new int[n];
        List<String >res=new ArrayList<>();
        //赋初值
        for (int i = 0; i < n; i++) {
            list[i]=i+1;
        }
        int count=target.length;
        int k=0;  
        int j=0; 
        //退出循环的条件k<count或者j<n也就是长度不满足
        while (k<count&&j<n){
            //无论什么都先入栈
            res.add(p);
            if(target[k]==list[j]){
                k++;
            }else {
                //不相等pop入栈
                res.add(r);
            }
            j++;
        }
        return res;
    }
}
```

#### [481\. 神奇字符串](https://leetcode.cn/problems/magical-string/)

```java
//①.根据观测的的规律我们可以大致了解到例如：s = "1221121221221121122……"
//②.对于得到的字符串：t=1 2 2 1 1 2 1 2 2 1 2 2 ......"与原字符串保持一致
//①得到的是数字 然而②表示的是某个数字出现的个数 比如只看s串 比较每个字符出现的次数为：122112122122...也就得到了②的字符串，然后从开始分析 当s字符串的长度大于3后 从此s的长度会一直大于得到的字符串
//根据题意可知s字符串的第一个字符一定是1，理由  例如 s=11  则t=2  (不符合)
//s=122  t=12  (符合)  然后根据长度可以知道 t的第三个字符一定为2  然后s的第4.5字符则为1即
//s=12211   t=122   然后t的第四个字符为1 对应的s字符为2....无线循环下去
//然后我么就可以得到一个规律 s字符串的长度增加主要看t的下一个字符为多少,而t又和s字符串向同就是长度不同，换言之t的增速太慢 当时间无限长两者近似相同 这里定义两个指针（快指针和慢指针）
//解题步骤
//1.首先将前三个元素加入 然后就可以知道s的长度一定大于t-->得到s=122  t=12
//2.接着让index=2指向s的第三个元素然后顶一个lengt=3 ，value=1为每次要加入的值 和一个count统计1的数目起始值为1
//3.接着进入循环终止条件为length<n就是给的n
//4.每次获取array[index]内的数字判断在数组内加一个元素还是两个并且防止length越界
//5.将需要加入几个value赋值到array的后边然后length++ 当加入的value=1的时候则count++
//6.当此次完成后下次则添加另一个数字也就是value=3-value 实现切换
//7.结束后index++;

class Solution {
    public int magicalString(int n) {
        if (n == 0) {
            return 0;
        }
        if (n <= 3) {
            return 1;
        }
        int[] array = new int[n];
        // 设置初值
        array[0] = 1;array[1] = 2;array[2] = 2;
        // 统计 1 的个数，前三个字符中有 1 个 1
        int count = 1;
        // index 表示字符串 A 的索引，length 表示字符串有效字符的个数， value 表示下次生成的字符
        int index = 2, length = 3, value = 1;
        while (length < n) {
            // 根据 array[index] 的值决定生成几个 value
            for (int i = 0; i < array[index] && length < n; i++) {
                array[length++] = value;
                // 统计 1 的个数
                if (value == 1) {
                    count++;
                }
            }
            // 更换生成的字符，3-1=2，3-2=1，实现 1 和 2 的交替
            value = 3 - value;
            index++;
        }
        return count;
    }
}
```

#### [779\. 第K个语法符号](https://leetcode.cn/problems/k-th-symbol-in-grammar/)

```java
//方法一可以利用递归的思想来解题 根据题意可以知道他是个有规律的数字当n=5时的结果顺序为
/*
0   
01  
0110  
01101001  
0110100110010110 
*/
//这是个有规律的数字每次补充的后面的一半和前一半数字相反入 (01)(10)
//这时我们可以利用递归的思想来作题 当取第k位时 我们可以去找其前一排即n-1排k对应的数据接着找其n-2排对应的数据
//等到递归到最底层的时候然后再返回去调用
//就拿 4，7 来举例 递归 k-1的变化为 0 1 3 6  所以从底层开始 因为当k=0是res=0所以进入下一层res不变
//k=1  此时k为奇数所以res=1 然后进入下一层 k=3此时 k为奇数所以res=0  接着进入最后一层 k=6 为偶数所以res=0保持不变

public class Solution {
    public int kthGrammar(int n, int k) {
        return find(n, k - 1);
    }
    private int find(int N, int K) {
        if (N == 1) {
            return 0;
        }
        int res = 0;
        //首先得到前n-1排的那个数字
        int num = find(N - 1, K / 2);
        if (K % 2 == 0) {//如果下标k为偶数则他的结果不进行翻转
            if (num == 1) res = 1;
            else res = 0;
        } else {    //反之k的下标为奇数其结果需要进行翻转
            if (num == 1) res = 0;
            else res = 1;
        }
        return res;
    }
    //方法二直接对k值进行比较 根据规律性可以很容易的得出，一行中的第 i 个字符，会在第 2i 和第 2i+1个位置产生两个字符。
    //可以发现第2i个字符和第i个字符总是相同的，而第2i+1个字符和第i个字符正好是相反数，也就是说，奇数位上的字符总是发生了一次反转而来的
    //反转偶数次，字符不变；反转奇数次，相当于反转了一次。因此，我们只需要看 k 这个数字是否是奇数，若是，累计一次反转。然后将 k 除以 2，继续判断，并累计反转次数，直至 k 为 0。
    //最后判断反转的次数是否为奇数，是则答案为 11，否则为 00。
    //所以进行位运算 统计1的个数然后与1相与可以得到最终结果
    class Solution {
    public int kthGrammar(int n, int k) {
        return Integer.bitCount(k - 1) & 1;
    }
}
```

#### [6\. Z 字形变换](https://leetcode.cn/problems/zigzag-conversion/)

```java
//题解：根据题目可以知道遵守Z变换 我们可以这样想 首先根据他给的行数 每行我们开辟一个字符串容器来接收遍历得到的字符
//所以从上到下从左到右 将s字符串一个一个放入到字符串容器中 
//这里就可以看出来每次到达边界的时候 会进行变方向而且此时改行上的元素不能进入容器
//所以我们就可以以一个flag来判断方向 k来顶边界 当抄过边界的时候需要k+2 或者k-2 这是因为 
//例如有四行的时候 z的构成为 424  五行的时候为 535 中间相比于两侧都少了2所以可以定一个边界值
public class Solution {
    public String convert(String s, int numRows) {
        //当行数少的时候直接返回原字符串
        if (numRows < 2) {
            return s;
        }
        //构造字符数组容器
        List<StringBuilder> list = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            list.add(new StringBuilder());
        }
        int k = 0;  //观测边界的k
        int flag = 1; //判断是否转向
        for (int i = 0; i < s.length(); i++) {
            //从上到下进行进入容器
            if (k < numRows && flag == 1) {
                list.get(k).append(s.charAt(i));
                k++;
                //从下到上进入容器
            } else if (k >= 0 && flag == -1) {
                list.get(k).append(i);
                k--;
            }
            //如果k到达下界边界 此时因为下标比numRows少1而且他又不在原本的行而在原本行的上一行，
            //所以这里k=k-2定位
            if (k == numRows) {
                k = k - 2;
                flag = -1;  //反向
                //当k==-1时证明已经遍历到最上测所以这里需要+2
            } else if (k == -1) {
                k += 2;
                flag = 1;  //反向
            }
        }
        String res = "";
        //最后对容器内的结果进行相加输入
        for (StringBuilder stringBuilder :
                list) {
            res += stringBuilder;
        }
        return res;
    }
}
```

#### [686\. 重复叠加字符串匹配](https://leetcode.cn/problems/repeated-string-match/)

```java
public class Solution2 {
    public int repeatedStringMatch(String a, String b) {
        StringBuilder sb = new StringBuilder();
        int ans = 0;
        //首相让a的长度大于b的长度这样b才能包含进去
        while (sb.length() < b.length() && ++ans > 0) sb.append(a);
        //当遍历结束后 我们需要在末尾再附加一个a的长度此时的ant先不进行++操作
        sb.append(a);
        //然后看字符串b是否能在index中找到 不能的话直接返回-1它找到的为b字符串第一个字母出现的下标
        int idx = sb.indexOf(b);
        if (idx == -1) return -1;
        //如果此时的idx+b的长度 比加一个字符串后的长度还要大说明 最后加的a字符串也参与了 所以返回ans+1
        //反之则说明没有
        return idx + b.length() > a.length() * ans ? ans + 1 : ans;
    }

    public static void main(String[] args) {
       String a = "a", b = "aa";
        Solution2 solution2 = new Solution2();
        solution2.repeatedStringMatch(a,b);
    }
}
```

#### [915\. 分割数组](https://leetcode.cn/problems/partition-array-into-disjoint-intervals/)

```java
//该题的思路时间复杂度为n空间复杂度为1  案例 1 1 1 0 6 12 或者 5 0 3 6 8
//又该类型我们可以知道他需要的是左边的值全部小于右边的所以当遍历到一个数据是也就是左边的最大值小于右边的最小值
//根据次情况可以知道 首先让左边的最大值为第一个数 和当前的最大值也为第一个数 在定义一个记录指针
//从0开始遍历每当遍历到一个数先判断是否 比当前的数字大 如果大的话记录他的值为curMax
//接着判断该数字是否小于左边界的最大值 false 则跳过 true则进行最大值的更替和 记录指针的更新
//该思想主要利用了 只要右边有小于左边的值就能立即更新 否则只能一直的比左边大下去 。

public int partitionDisjoint(int[] nums) {
        int maxLeft = nums[0], curI = 0, curMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curMax = Math.max(curMax, nums[i]);
            if (nums[i] < maxLeft) {
                maxLeft = curMax;
                curI = i;
            }
        }
        return curI + 1;
    }
//第二种方法思路 可以首先开辟一个新数组 从后往前遍历每次 再最后填入一个最小的值
//案例 5 0 3 6 8  ==>开辟后的新数组为==> 0 0 3 6 8     
//接着再从前往后遍历 记录最大值 当出现第i个位置的元素小于 新开辟数组内的值的时候就直接返回
//从前开始时 最大值为5 当从前到下标为3的时候也就是nums[2]=3 正好小于newarr[3]=6 直接返回 i+1
//如果到最后都没有出现的话说明正好最后的结果满足返回 n-1
  public int partitionDisjoint(int[] nums) {
        int n = nums.length;
        int[] minRight = new int[n];
        minRight[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            minRight[i] = Math.min(nums[i], minRight[i + 1]);
        }
        int maxLeft = 0;
        for (int i = 0; i < n - 1; i++) {
            maxLeft = Math.max(maxLeft, nums[i]);
            if (maxLeft <= minRight[i + 1]) {
                return i + 1;
            }
        }
        return n - 1;
    }
```

#### [647\. 回文子串](https://leetcode.cn/problems/palindromic-substrings/)

根据题目描述我们假设一共有四个数据 最坏的情况每个都当成中心 进行遍历 由下表可以知道每个被当成中心的次数为2\*4-1一共七次

这样我们就可以进行一次循环遍历 并在里面不断进行判断 得出结果.

![image-20221024203621990](/img/cos/learn/3481/image-20221024203621990.png)

```java
class Solution {
    public int countSubstrings(String s) {
        int n = s.length(), ans = 0;
        for (int i = 0; i < 2 * n - 1; ++i) {
            //根据题目可以知道 可以称为中心的点有2n-1个所以 对将每个点当成中心点 进行遍历并不断的记录 
            int l = i / 2, r = i / 2 + i % 2;
            //根据以上表达式可以知道l r的取值为  00 01 11 12 22 23 33 .......
            while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {
                --l;
                ++r;
                ++ans;
            }
        }
        return ans;
    }
}
```

#### [7\. 整数反转](https://leetcode.cn/problems/reverse-integer/)

```java
//题目解析首先我们需要定义两个边界值
//其次整数翻转另一方面也是不断的取余数和整数
//所以可以定义一个rev来接受总和
//有个坑就是 不能按原先的 跟边界值进行比较判断越界 因为很有可能该数字已经越界了所以再判断意义不大
//说以我们可以取其缩小十倍的数字来进行比较

public class Solution {
    //首先将最大和最小的值给定义出来
    private int Max = Integer.MAX_VALUE;
    private int Min = Integer.MIN_VALUE;

    public int reverse(int x) {
        //记录翻转的和
        int rev = 0;
        while (x != 0) {
            //这个需要提前的进行终结否则将会越界 如果越界的话就直接退出
            if (rev < Min / 10 || rev > Max / 10) {
                return 0;
            }
            //得到该数字的余数
            int digit = x % 10;
            //将该数字缩小十倍
            x /= 10;
            rev = rev * 10 + digit;
        }
        return rev;
    }
}
```

#### [479\. 最大回文数乘积](https://leetcode.cn/problems/largest-palindrome-product/)

```java
/*
给定一个整数 n ，返回 可表示为两个 n 位整数乘积的 最大回文整数 。
因为答案可能非常大，所以返回它对 1337 取余 。*/
//根据题目我们可以使用一个放法枚举法从最大的开始算起因为例如两位数字相乘的结果肯定不会超过四位数字
//所以从9999 -9889 -9779.... 进行逐个排除 当满足一定的条件就可以返回
class Solution {
    public int largestPalindrome(int n) {
        //如果为1直接返回9
        if (n == 1) return 9;
        //得到n位数的最大值
        int max = (int) Math.pow(10, n) - 1;
        //外层的i循环是从最大开始的
        for (int i = max; i >= 0; i--) {
            long num = i, t = i;
            //该循环主要得到回文数
            while (t != 0) {
                num = num * 10 + (t % 10);
                t /= 10;
            }
            //当有了回文数 每次j从最大开始逐个递减 当不满足j*j>=num是则说明该数字不满足
            //如果满足了就让其和j取模如果为0的话证明已经得到符合条件的结果了此时的两个数只知道一个j满足
            //另一个需要
            for (long j = max; j * j >= num; j--) {
                if (num % j == 0) return (int)(num % 1337);
            }
        }
        return -1;
    }
}
```

#### [862\. 和至少为 K 的最短子数组](https://leetcode.cn/problems/shortest-subarray-with-sum-at-least-k/)

```java
//基本思想如下图可以首先计算出前缀和然后开始从0遍历整个前缀和数组
//并在遍历的过程中判断如果找到了（当前的前缀和-队列中存入的头下标的前缀和)>=3说明该条件符合，然后就和res
//进行比较取其最小值，并将该下标的元素出队列，接着while循环看看容器内下一个是否也符合
//第二个while循环从队列的最后面开始判断，判断上一个元素是否大于当前的值如果大于的话就直接出队列，然后再让当前的值入队列
//你可以这样理解 当前的值小于它了，你的目标数-大于当前数<你的目标数-当前数 也就是前一个符合 后面必定符合大于k
//所以不符合直接出栈就可以了
//两个while结束后 让当前遍历的下标入队列
public int shortestSubarray(int[] nums, int k) {
        int n = nums.length;
        long[] preSumArr = new long[n + 1];
        for (int i = 0; i < n; i++) {
            preSumArr[i + 1] = preSumArr[i] + nums[i];
        }
        int res = n + 1;
        Deque<Integer> queue = new ArrayDeque<Integer>();
        for (int i = 0; i <= n; i++) {
            long curSum = preSumArr[i];
            while (!queue.isEmpty() && curSum - preSumArr[queue.peekFirst()] >= k) {
                res = Math.min(res, i - queue.removeFirst());
            }
            while (!queue.isEmpty() && preSumArr[queue.peekLast()] >= curSum) {
                queue.removeLast();
            }
            queue.addLast(i);
        }
        return res < n + 1 ? res : -1;
    }
```

![image-20221026092351232](/img/cos/learn/3481/image-20221026092351232.png)

#### [476\. 数字的补数](https://leetcode.cn/problems/number-complement/)

```java
class Solution {
    public int findComplement(int num) {
        //思路首先对num取反 例如5==> 00101  去反后  11010  前两位是不需要的  
        //所以我们定义一个mask 全是11111也就是 0的非
        //接着让他和num相与 11111&00101=11010 不为0接着让mask左移一位在于num相与
        //11110&00101=00100  接着再左移 直到 mask=11000 和num=00101相与的结果为0 此时得到了我们想要的mask
        //然后就让num取反 num=11010  在和mask异或就可以得到我们想要的结果
        int mask=~0;
        while((num & mask)!=0){
            mask<<=1;
        }
        return mask^(~num);
    }
}
```
