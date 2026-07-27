---
title: "AVL 树"
description: "AVL 树、2-3 树与红黑树的原理、平衡旋转实现及完整源代码,涵盖添加、删除与查询操作。"
sidebar_position: 4
---

**AVL 树**是对二叉搜索树的优化:当数据有序或接近有序时,二叉搜索树会退化为单链表,查找元素相当于在顺序表中搜索,效率低下。AVL 树在向二叉搜索树中插入新节点时,能够保持每个节点的左右子树高度之差的绝对值不超过 1,从而减少平均搜索长度。

<!-- truncate -->

## AVL 树的特点

1. 叶子节点的最大高度相差不会超过 1,是平衡二叉树。
2. 对于任意一个节点,左子树和右子树的高度差不能超过 1。
3. 平衡二叉树的高度和节点数量之间的关系也是 O(logn) 的。
4. AVL 常用于查询较多的情况。
5. AVL 树的左右子树均为 AVL 树。
6. 如果一棵二叉树是高度平衡的,它就是 AVL 树;如果有 n 个节点,其高度可保持在 O(logn),搜索的时间复杂度也是 O(logn)。
7. AVL 树中任意节点的 BF(平衡因子)只可能是 -1、0、1。

如下图为一棵 AVL 树:

![AVL 树示意图](/img/cos/ssss.png)

## AVL 树的实现

> 实现思路

1.  首先在 `AVLTree` 中定义一个节点内部类 Node。
2.  构造函数初始化 AVL 树。
3.  基于二分搜索树实现 AVL 树。

**节点定义**

```java
private class Node {
     public K key;
     public V value;
     public Node left, right;
     public int height;

     public Node(K key, V value) {
         this.key = key;
         this.value = value;
         left = null;
         right = null;
         height = 1;
     }
 }
```

定义一个节点主要存储它的 key 和 value(一般只用 value 就可以,这里复用了 BSTMap 的结构算法)。

**AVL 树的初始化**

```java
//私有成员变量root和size并在构造函数里面初始化操作 
private Node root;    
    private int size;
    public AVLTree() {
        root = null;
        size = 0;
    }
```

**判断是否为二分搜索树(可省略)**

```java
//判断是否为二分搜索树 
public boolean isBST() {
        ArrayList<K> keys = new ArrayList<>();
       //判断是否有序
    	inOrder(root, keys);
    //由上一步可以的出整棵树的顺序均在keys容器中存放
    //遍历容器让后者根前者比较如果后者小于前者则证明不是个二分搜索树
        for (int i = 0; i < keys.size(); i++) {
            if (keys.get(i - 1).compareTo(keys.get(i)) > 0)
                return false;
        }
        return true;
    }
//中序遍历法：如果有序则结果也有序
    private void inOrder(Node node, ArrayList<K> keys) {
        if (node == null) {
            return;
        }
        inOrder(node.left, keys);
        //将节点数据拿出向ArrayList中添加keys值便于isBST判断
        keys.add(node.key);
        inOrder(node.right, keys);
    }
```

**辅助函数 `contains()`、`set()`、`get()`**

-   `minimum()` 得到对应子树下的最小节点值,是一个递归函数。
-   `contains(K key)` 主要证明所查的节点是否在该树内。
-   `get(K key)` 得到键值为 key 的 value 值(对于 AVL 树来说可以不需要)。
-   `set(K key, V newValue)` 将键值为 key 的地方的值修改为 newValue,如果存在则进行覆盖。

```java
//拿到传入节点的最小的值   
private Node minimum(Node node) {
       //递归终止的条件最左边为null
       if (node.left == null) {
           return node;
       }
       //进入递归将左子树的左子树传入
       return minimum(node.left);
   }

   public boolean contains(K key) {
       return getNode(root, key) != null;
   }

   public V get(K key) {
       Node node = getNode(root, key);
       return node == null ? null : node.value;
   }

   public void set(K key ,V newValue) {
       Node node = getNode(root, key);
       if (node == null) {
           throw new IllegalArgumentException(key + "doesn't exist!");
       }
       node.value = newValue;
   }
//得到数的元素个数
   public int getSize(){
       return size;
   }
   public boolean isEmpty(){
       return size==0;
   }
//得到以node为节点树的高度
   private int getHeight(Node node){
       if(node==null){
           return 0;
       }
       return node.height;
   }
```

**判断该树是否为平衡二叉树**

这里可以创建一个 `isBalanced()` 函数,通过递归调用最终得出结果。

```java
public boolean isBalanced(){
    return isBalanced(root);
}
 private boolean isBalanced(Node node) {
     //递归终止的条件只有当节点为空的时候返回true
        if (node == null)
            return true;
     //得到当前节点的平衡因数；
        int balanceFactor = getBalanceFactor(node);
     //因为平衡因数的绝对值不可能大于一，一旦大于一直接返回false
        if (Math.abs(balanceFactor) > 1)
            return false;
     //最后递归调用左子树和右子树分别进行判断直至全部遍历完成
        return isBalanced(node.left) && isBalanced(node.right);
    }
//私有函数能够的到当前的平衡因数这里规定左子树的高度-右子树的高度
    private int getBalanceFactor(Node node) {
        if (node == null) {
            return 0;
        }
        return getHeight(node.left) - getHeight(node.right);
    }
```

**向 AVL 树中添加元素**

基本逻辑:

1.  传入三个元素 root、key、value,先判断根节点是否为空,是的话维护 size 然后创建一个新节点。
2.  当元素不为空的时候比较插入的位置是左子树还是右子树。
3.  当插入元素以后更新树的高度,可以利用上面的辅助函数 `getHeight()` 得到根节点的高度。
4.  计算平衡因子以便于维护 AVL 树的平衡。
5.  辅助函数 LL、RR、LR、RL 共同来维持加入一个元素后树的平衡性。

四种失衡情况:

1.  当添加一个新节点后构成 **LL**(左子树的左孩子),则需要进行右旋转。
2.  当添加一个新节点后构成 **RR**(右子树的右孩子),则需要进行左旋转。
3.  当添加一个新节点后构成 **LR**(左子树的右孩子),则需要对左子树进行左旋转,然后整体右旋转。
4.  当添加一个新节点后构成 **RL**(右子树的左孩子),则需要对右子树进行右旋转,然后整体左旋转。

![AVL 树四种旋转示意图](/img/cos/uuu1.png)

上图主要介绍了 LL、RR、RL 三种旋转;LR 旋转和 RL 旋转相反,应该先对以左子树为根节点进行左转,然后再以根节点为中心进行右转。

**右旋转 `rightRotate(Node y)` 的实现及其原理**

```java
private Node rightRotate(Node y){
   //首先用x暂存节点y的左子树
    Node x=y.left;
    //其次用节点temp存储x的右子树
    Node temp=x.right;
    //接着让x的右指针指向y
    x.rigrt=y;
    //最后将x原本的右子树挂到y的左子树上
    y.left=temp;
    //旋转完成后要更新height的值
    //总体来说只有y和x的高度变了其余的高度正常
    y.height=Math.max(getHeight(y.left),getHeight(y.right))+1;
    x.height=Math.max(getHeight(x.left),getHeight(x.right))+1;
    return x;
}
```

**左旋转 `leftRotate(Node y)` 的实现**

原理和右子树正好相反。

```java
private Node leftRotate(Node y) {  
    	Node x = y.right;
       Node temp = x.left;
       x.left = y;
       y.right = temp;
       //更新height的 值
       y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
       x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
       return x;
   }
```

**add 函数的实现**

主要功能是实现元素的增加,代码如下:

```java
public void add(K key,V value){
    root=add(root,key,value);
}

private Node add(Node node,K key,V value){
    //最简单的情况 整棵树为null
    if(node==null){
        size++;
        return new Node(key,value);
    }
    //如果key小于根节点 遍历加入左子树
    if(key.compareTo(node.key)<0)
        node.left=add(node.left,key,value);
    //当key大于根节点在右子树上插入
    else if(key.compareTo(node.key) > 0)
        node.right=add(node.right,key,value);
    //反之当两者相同时 替换value值
    else
        node.value=value;
    
    //以上完成插入数据后开始调节平衡度
    //首先先更新下树的高度
    node.height=1+Math.max(getHeight(node.left),getHeight(node.right));
    //接着得到树的高度后开始计算平衡因子
    int balanceFactor=getBalanceFactor(node);
    if(Math.abs(balanceFactor)>1){
        System.out.println("unbalanced:"+balanceFactor);
    }
    //得到平衡因数后开始维护平衡性
     //LL  因为balanceFactor左子树高度-右子树高度
    //后一个参数确定了该树就是左左类型的树直接调用右旋转
        if (balanceFactor > 1 && getBalanceFactor(node.left) >= 0) {
            //右旋转
            return rightRotate(node);
        }
        //RR  &&后的参数确保了该树是一个RR树
        if (balanceFactor < -1 && getBalanceFactor(node.right) <= 0) {
            return leftRotate(node);
        }
        //LR
        if (balanceFactor > 1 && getBalanceFactor(node.left) < 0) {
            //先以左孩子为节点进行左旋转
            node.left = leftRotate(node.left);
            //其次在以node为根节点进行右旋正好构建成功
            return rightRotate(node);
        }
        //RL
        if (balanceFactor < -1 && getBalanceFactor(node.right) > 0) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
}
```

## 源代码

```java
package AVL_;

import java.util.ArrayList;

@SuppressWarnings({"all"})
public class AVLTree<K extends Comparable<K>, V> {
    private class Node {
        public K key;
        public V value;
        public Node left, right;
        public int height;

        public Node(K key, V value) {
            this.key = key;
            this.value = value;
            left = null;
            right = null;
            height = 1;
        }
    }

    private Node root;
    private int size;

    public AVLTree() {
        root = null;
        size = 0;
    }

    public boolean isBST() {
        ArrayList<K> keys = new ArrayList<>();
        inOrder(root, keys);
        for (int i = 0; i < keys.size(); i++) {
            if (keys.get(i - 1).compareTo(keys.get(i)) > 0)
                return false;
        }
        return true;
    }

    private void inOrder(Node node, ArrayList<K> keys) {
        if (node == null) {
            return;
        }
        inOrder(node.left, keys);
        keys.add(node.key);
        inOrder(node.right, keys);
    }

    //判断是否是一颗二叉平衡树
    public boolean isBalanced() {
        return isBalanced(root);
    }

    private boolean isBalanced(Node node) {
        if (node == null)
            return true;
        int balanceFactor = getBalanceFactor(node);
        if (Math.abs(balanceFactor) > 1)
            return false;
        return isBalanced(node.left) && isBalanced(node.right);
    }

    public int getSize() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    private int getHeight(Node node) {
        if (node == null) {
            return 0;
        }
        return node.height;
    }

    private int getBalanceFactor(Node node) {
        if (node == null) {
            return 0;
        }
        return getHeight(node.left) - getHeight(node.right);
    }

    public void add(K key, V value) {
        root = add(root, key, value);
    }

    private Node add(Node node, K key, V value) {
        if (node == null) {
            size++;
            return new Node(key, value);
        }
        if (key.compareTo(node.key) < 0) {
            node.left = add(node.left, key, value);
        } else if (key.compareTo(node.key) > 0) {
            node.right = add(node.right, key, value);
        } else {
            node.value = value;
        }
        //更新height
        node.height = 1 + Math.max(getHeight(node.right), getHeight(node.left));
        //计算平衡因子

        int balanceFactor = getBalanceFactor(node);
        if (Math.abs(balanceFactor) > 1) {
            System.out.println("unbalanced:" + balanceFactor);
        }
        //维护平衡性
        //LL
        if (balanceFactor > 1 && getBalanceFactor(node.left) >= 0) {
            //右旋转
            return rightRotate(node);
        }
        //RR
        if (balanceFactor < -1 && getBalanceFactor(node.right) <= 0) {
            return leftRotate(node);
        }
        //LR
        if (balanceFactor > 1 && getBalanceFactor(node.left) < 0) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        //RL
        if (balanceFactor < -1 && getBalanceFactor(node.right) > 0) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }

    //右旋转
    private Node rightRotate(Node y) {
        Node x = y.left;
        Node temp = x.right;
        x.right = y;
        y.left = temp;
        //更新height值
        y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
        x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
        return x;
    }

    //左旋转
    private Node leftRotate(Node y) {
        Node x = y.right;
        Node temp = x.left;
        x.left = y;
        y.right = temp;
        //更新height的 值
        y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
        x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
        return x;
    }

    private Node getNode(Node node, K key) {
        if (node == null) {
            return null;
        }
        if (key.compareTo(node.key) == 0) {
            return node;
        } else if (key.compareTo(node.key) < 0) {
            return getNode(node.left, key);
        } else
            return getNode(node.right, key);
    }

    public V remove(K key) {
        Node node = getNode(root, key);
        if (node != null) {
            root = remove(root, key);
            return node.value;
        }
        return null;
    }

    //删除掉以node为根的二分搜索树中键为key的节点，递归算法
    //返回删除节点后新的二分搜索树的根
    private Node remove(Node node, K key) {
        if (node == null)
            return null;
        Node retNode;
        if (key.compareTo(node.key) < 0) {
            node.left = remove(node.left, key);
            retNode = node;
        } else if (key.compareTo(node.key) > 0) {
            node.right = remove(node.right, key);
            retNode = node;
        } else {
            //待删除的左子树为空
            if (node.left == null) {
                Node rightNode = node.right;
                node.right = null;
                size--;
                retNode = rightNode;
            }
            //待删除的右子树为空
            else if (node.right == null) {
                Node leftNode = node.left;
                node.left = null;
                size--;
                retNode = leftNode;
            } else {
                //待删除左右子树都不为空
                Node successor = minimum(node.right);
                successor.right = remove(node.right, successor.key);
                successor.left = node.left;
                node.left = node.right = null;
                retNode = successor;
            }
            if (retNode == null) {
                return null;
            }
            //看是否需要维护平衡
            //计算平衡因子
            //更新height
            retNode.height = 1 + Math.max(getHeight(retNode.right), getHeight(retNode.left));
            //计算平衡因子

            int balanceFactor = getBalanceFactor(retNode);
            if (Math.abs(balanceFactor) > 1) {
                System.out.println("unbalanced:" + balanceFactor);
            }

            //维护平衡性
            //LL
            if (balanceFactor > 1 && getBalanceFactor(retNode.left) >= 0) {
                //右旋转
                return rightRotate(retNode);
            }
            //RR
            if (balanceFactor < -1 && getBalanceFactor(retNode.right) <= 0) {
                return leftRotate(retNode);
            }
            //LR
            if (balanceFactor > 1 && getBalanceFactor(retNode.left) < 0) {
                retNode.left = leftRotate(retNode.left);
                return rightRotate(retNode);
            }
            //RL
            if (balanceFactor < -1 && getBalanceFactor(retNode.right) > 0) {
                retNode.right = rightRotate(retNode.right);
                return leftRotate(retNode);
            }
        }
        return retNode;
    }

    private Node minimum(Node node) {
        if (node.left == null) {
            return node;
        }
        return minimum(node.left);
    }

    public boolean contains(K key) {
        return getNode(root, key) != null;
    }

    public V get(K key) {
        Node node = getNode(root, key);
        return node == null ? null : node.value;
    }

    public void set(K key, V newValue) {
        Node node = getNode(root, key);
        if (node == null) {
            throw new IllegalArgumentException(key + "doesn't exist!");
        }
        node.value = newValue;
    }
}
```

## 2-3 树

> 引导

学习红黑树之前我们先来了解 2-3 树。顾名思义,一个节点位置有一个或者两个元素。2-3 树的基本性质如下:

1.  满足二分搜索树的基本性质。
2.  节点可以存放一个元素或者两个元素。
3.  每个节点有两个孩子或者三个孩子。
4.  两个孩子叫做 2 节点,三个孩子叫做 3 节点。
5.  2-3 树是一棵绝对平衡的树。
6.  红黑树和 2-3 树等价,所有的红色节点都是向左倾斜(自定义)。

下面给出一个 2-3 树的图像:

![2-3 树示意图](/img/cos/1231.png)

由于红黑树的添加删除操作较为复杂,这里只写出 2-3 树的添加操作如下图(和红黑树完全相同):

![2-3 树的添加操作](/img/cos/ggg.png)

每次加入元素后都能保持树的绝对平衡。

## 红黑树的实现

### 实现准备

1.  首先定义红黑色常量值。
2.  初始值均为红色。
3.  构建一个判断是否为红色节点的函数。
4.  构建左旋转 `leftRotate()`、右旋转 `rightRotate()` 和颜色翻转函数 `flipColors()`。
5.  根据以上准备实现红黑树。

### 原理分析

红黑树的五个性质:

1.  每个节点要么是红色,要么是黑色。
2.  根节点是黑色的。
3.  每一个叶子节点(最后的空节点)是黑色的。
4.  如果一个节点是红色的,那么它的孩子节点都是黑色的;黑色节点的右孩子一定是黑色的。
5.  从任意一个节点到叶子节点,经过的黑色节点数量是一样的。

红黑树的最大高度为 **2·logn**,时间复杂度为 **O(logn)**。

![红黑树示意图](/img/cos/lllkk.png)

总体和 AVL 树一样,不过多了一个颜色的判断:

```java
	private static final boolean BLACK = false;
   private static final boolean RED = true;
//在Node节点中加入一个color共有属性 布尔类型的值
//并在Node的构造函数中使颜色初始值为RED
```

**颜色翻转**

```java
//颜色翻转
 private void flipColors(Node node) {
     node.color = RED;
     node.left.color = BLACK;
     node.right.color = BLACK;
 }
```

**添加新的元素**

```plaintext
//像红黑树中添加新的元素
 public void add(K key, V value) {
     root = add(root, key, value);
     root.color = BLACK;
 }
```

**判断节点是否为红色**

```java
private boolean isRed(Node node) {
     //主要规避null叶子节点  
    if (node == null) 
          return BLACK;
      return node.color;
  }
```

**左旋转**

如果红黑树添加节点后,该节点右子树为红色并且其左子树不为红色,则需要进行左旋转:

```java
private Node leftRotate(Node node) {
    //左旋转
    Node x = node.right;
    node.right = x.left;
    x.left = node;
    //当翻转完成后 需要对颜色进行调换
    x.color = node.color;
    node.color = RED;
    return x;
}
```

**右旋转**

如果红黑树添加节点后,该节点左子树为红色并且其左子树的左孩子也为红色,则需要进行右旋转:

```java
private Node rightRotate(Node node) {
    //右旋转
      Node x = node.left;
      node.left = x.right;
      x.right = node;
    //颜色调换
      x.color = node.color;
      node.color = RED;
      return x;
  }
```

**add 函数的最终实现**

当添加元素的左孩子和右孩子均为红色时,需要进行颜色翻转。最终实现的 add 函数为:

```java
//向以node为根的红黑树中插入新的元素
private Node add(Node node, K key, V value) {
    if (node == null) {
        size++;
        return new Node(key, value);  //默认插入一个红色的节点
    }
    if (key.compareTo(node.key) < 0) {
        node.left = add(node.left, key, value);
    } else if (key.compareTo(node.key) > 0) {
        node.right = add(node.right, key, value);
    } else {
        node.value = value;
    }
    //红黑树的维护过程
    if (isRed(node.right) && !isRed(node.left)) {
        node = leftRotate(node);
    }
    if (isRed(node.left) && isRed(node.left.left))
        node = rightRotate(node);
    if (isRed(node.left) && isRed(node.right))
        flipColors(node);

    return node;
}
```

### 红黑树的总结

1.  对于完全随机的数据,普通的二分搜索树很好用;缺点是极端情况下退化成链表(高度不平衡)。
2.  对于查询较多的情况,AVL 很好用。
3.  红黑树牺牲了平衡性(2logn 的高度)。
4.  统计性能更优(常用于增删改查的所有操作)。
