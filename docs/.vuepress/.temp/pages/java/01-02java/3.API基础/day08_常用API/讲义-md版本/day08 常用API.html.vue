<template><div><h2 id="_1-api" tabindex="-1"><a class="header-anchor" href="#_1-api" aria-hidden="true">#</a> 1.API</h2>
<h3 id="_1-1-api概述-帮助文档的使用" tabindex="-1"><a class="header-anchor" href="#_1-1-api概述-帮助文档的使用" aria-hidden="true">#</a> 1.1 API概述-帮助文档的使用</h3>
<ul>
<li>
<p>什么是API</p>
<p>​	API (Application Programming Interface) ：应用程序编程接口</p>
</li>
<li>
<p>java中的API</p>
<p>​	指的就是 JDK 中提供的各种功能的 Java类，这些类将底层的实现封装了起来，我们不需要关心这些类是如何实现的，只需要学习这些类如何使用即可，我们可以通过帮助文档来学习这些API如何使用。</p>
</li>
</ul>
<p><strong>如何使用API帮助文档 :</strong></p>
<ul>
<li>
<p>打开帮助文档</p>
</li>
<li>
<p>找到索引选项卡中的输入框</p>
</li>
<li>
<p>在输入框中输入Random</p>
</li>
<li>
<p>看类在哪个包下</p>
</li>
<li>
<p>看类的描述</p>
</li>
<li>
<p>看构造方法</p>
</li>
<li>
<p>看成员方法</p>
</li>
</ul>
<h3 id="_1-2-键盘录入字符串" tabindex="-1"><a class="header-anchor" href="#_1-2-键盘录入字符串" aria-hidden="true">#</a> 1.2 键盘录入字符串</h3>
<p><strong>Scanner类 :</strong></p>
<p>​	next() : 遇到了空格, 就不再录入数据了 , 结束标记: 空格, tab键</p>
<p>​	nextLine() : 可以将数据完整的接收过来 , 结束标记: 回车换行符</p>
<p><strong>代码实现 :</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>api</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo1Scanner</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        next() : 遇到了空格, 就不再录入数据了

                结束标记: 空格, tab键

        nextLine() : 可以将数据完整的接收过来

                结束标记: 回车换行符
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1. 创建Scanner对象</span>
        <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2. 调用nextLine方法接收字符串</span>
        <span class="token comment">// ctrl + alt + v : 快速生成方法的返回值</span>
        <span class="token class-name">String</span> s <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>api</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo2Scanner</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        nextInt和nextLine方法配合使用的时候, nextLine方法就没有键盘录入的机会了

        建议: 今后键盘录入数据的时候, 如果是字符串和整数一起接受, 建议使用next方法接受字符串.
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入整数:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> num <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10 + 回车换行</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入字符串:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> s <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-string类" tabindex="-1"><a class="header-anchor" href="#_2-string类" aria-hidden="true">#</a> 2. String类</h2>
<h3 id="_2-1-string概述" tabindex="-1"><a class="header-anchor" href="#_2-1-string概述" aria-hidden="true">#</a> 2.1 String概述</h3>
<p>​	1 String 类在 java.lang 包下，所以使用的时候不需要导包</p>
<p>​	2 String 类代表字符串，Java 程序中的所有字符串文字（例如“abc”）都被实现为此类的实例也就是说，Java 程序中所有的双引号字符串，都是 String 类的对象</p>
<p>​	3 字符串不可变，它们的值在创建后不能被更改</p>
<h3 id="_2-2-string类的构造方法" tabindex="-1"><a class="header-anchor" href="#_2-2-string类的构造方法" aria-hidden="true">#</a> 2.2 String类的构造方法</h3>
<p><strong>常用的构造方法</strong></p>
<p><img src="@source/java/01-02java/3.API基础/day08_常用API/讲义-md版本/img/1590939947722.png" alt="1590939947722"></p>
<p><strong>示例代码</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>string</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo2StringConstructor</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        String类常见构造方法:

            public String() : 创建一个空白字符串对象，不含有任何内容
            public String(char[] chs) : 根据字符数组的内容，来创建字符串对象
            public String(String original) : 根据传入的字符串内容，来创建字符串对象
            String s = “abc”;  直接赋值的方式创建字符串对象，内容就是abc

         注意:
                String这个类比较特殊, 打印其对象名的时候, 不会出现内存地址
                而是该对象所记录的真实内容.

                面向对象-继承, Object类
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// public String() : 创建一个空白字符串对象，不含有任何内容</span>
        <span class="token class-name">String</span> s1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// public String(char[] chs) : 根据字符数组的内容，来创建字符串对象</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chs <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token char">'a'</span><span class="token punctuation">,</span><span class="token char">'b'</span><span class="token punctuation">,</span><span class="token char">'c'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> s2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>chs<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// public String(String original) : 根据传入的字符串内容，来创建字符串对象</span>
        <span class="token class-name">String</span> s3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">"123"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-创建字符串对象的区别对比" tabindex="-1"><a class="header-anchor" href="#_2-4-创建字符串对象的区别对比" aria-hidden="true">#</a> 2.4 创建字符串对象的区别对比</h3>
<ul>
<li>
<p><strong>通过构造方法创建</strong></p>
<p>​	通过 new 创建的字符串对象，每一次 new 都会申请一个内存空间，虽然内容相同，但是地址值不同</p>
</li>
<li>
<p><strong>直接赋值方式创建</strong></p>
<p>​	以“”方式给出的字符串，只要字符序列相同(顺序和大小写)，无论在程序代码中出现几次，JVM 都只会建立一个 String 对象，并在字符串池中维护</p>
</li>
</ul>
<h3 id="_2-5-字符串的比较" tabindex="-1"><a class="header-anchor" href="#_2-5-字符串的比较" aria-hidden="true">#</a> 2.5 字符串的比较</h3>
<h4 id="_2-5-1-字符串的比较" tabindex="-1"><a class="header-anchor" href="#_2-5-1-字符串的比较" aria-hidden="true">#</a> 2.5.1 字符串的比较</h4>
<ul>
<li>== 比较基本数据类型：比较的是具体的值</li>
<li>== 比较引用数据类型：比较的是对象地址值</li>
</ul>
<p><strong>String类 :  public boolean equals(String s)     比较两个字符串内容是否相同、区分大小写</strong></p>
<p><strong>代码 :</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>stringmethod</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo1Equals</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> s1 <span class="token operator">=</span> <span class="token string">"abc"</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> s2 <span class="token operator">=</span> <span class="token string">"ABC"</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> s3 <span class="token operator">=</span> <span class="token string">"abc"</span><span class="token punctuation">;</span>

        <span class="token comment">// equals : 比较字符串内容, 区分大小写</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// equalsIgnoreCase : 比较字符串内容, 忽略大小写</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-用户登录案例【应用】" tabindex="-1"><a class="header-anchor" href="#_2-6-用户登录案例【应用】" aria-hidden="true">#</a> 2.6 用户登录案例【应用】</h3>
<p><strong>案例需求 :</strong></p>
<p>​	已知用户名和密码，请用程序实现模拟用户登录。总共给三次机会，登录之后，给出相应的提示</p>
<p>**实现步骤 : **</p>
<ol>
<li>已知用户名和密码，定义两个字符串表示即可</li>
<li>键盘录入要登录的用户名和密码，用 Scanner 实现</li>
<li>拿键盘录入的用户名、密码和已知的用户名、密码进行比较，给出相应的提示。</li>
<li>字符串的内容比较，用equals() 方法实现</li>
<li>用循环实现多次机会，这里的次数明确，采用for循环实现，并在登录成功的时候，使用break结束循</li>
</ol>
<p><strong>代码实现 :</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>test</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test1</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        需求：已知用户名和密码，请用程序实现模拟用户登录。
              总共给三次机会，登录之后，给出相应的提示

        思路：
        1. 已知用户名和密码，定义两个字符串表示即可
        2. 键盘录入要登录的用户名和密码，用 Scanner 实现
        3. 拿键盘录入的用户名、密码和已知的用户名、密码进行比较，给出相应的提示。
            字符串的内容比较，用equals() 方法实现
        4. 用循环实现多次机会，这里的次数明确，采用for循环实现，并在登录成功的时候，使用break结束循环

     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1. 已知用户名和密码，定义两个字符串表示即可</span>
        <span class="token class-name">String</span> username <span class="token operator">=</span> <span class="token string">"admin"</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> password <span class="token operator">=</span> <span class="token string">"123456"</span><span class="token punctuation">;</span>
        <span class="token comment">// 2. 键盘录入要登录的用户名和密码，用 Scanner 实现</span>
        <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 4. 用循环实现多次机会，这里的次数明确，采用for循环实现</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入用户名:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> scUsername <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入密码:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> scPassword <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 3. 拿键盘录入的用户名、密码和已知的用户名、密码进行比较，给出相应的提示。</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>username<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>scUsername<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> password<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>scPassword<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"登录成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"您的登录次数已达到今日上限, 请明天再来"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"登录失败,您还剩余"</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token operator">-</span>i<span class="token punctuation">)</span> <span class="token operator">+</span><span class="token string">"次机会"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-7-遍历字符串案例【应用】" tabindex="-1"><a class="header-anchor" href="#_2-7-遍历字符串案例【应用】" aria-hidden="true">#</a> 2.7 遍历字符串案例【应用】</h3>
<p><strong>案例需求 :</strong></p>
<p>​	键盘录入一个字符串，使用程序实现在控制台遍历该字符串</p>
<p><strong>实现步骤 :</strong></p>
<ol>
<li>键盘录入一个字符串，用 Scanner 实现</li>
<li>遍历字符串，首先要能够获取到字符串中的每一个字符, public char charAt(int index)：返回指定索引处的char值，字符串的索引也是从0开始的</li>
<li>遍历字符串，其次要能够获取到字符串的长度,   public int length()：返回此字符串的长度</li>
<li>遍历打印</li>
</ol>
<p><strong>代码实现 :</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>test</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test2</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        需求：键盘录入一个字符串，使用程序实现在控制台遍历该字符串

        思路：
        1. 键盘录入一个字符串，用 Scanner 实现
        2. 遍历字符串，首先要能够获取到字符串中的每一个字符
            public char charAt(int index)：返回指定索引处的char值，字符串的索引也是从0开始的
        3. 遍历字符串，其次要能够获取到字符串的长度
            public int length()：返回此字符串的长度
        4. 遍历打印
9
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//  1. 键盘录入一个字符串，用 Scanner 实现</span>
        <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> s <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2. 遍历字符串，首先要能够获取到字符串中的每一个字符</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// i : 字符串的每一个索引</span>
            <span class="token keyword">char</span> c <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-8-统计字符次数案例【应用】" tabindex="-1"><a class="header-anchor" href="#_2-8-统计字符次数案例【应用】" aria-hidden="true">#</a> 2.8 统计字符次数案例【应用】</h3>
<p><strong>案例需求 :</strong></p>
<p>​	键盘录入一个字符串，使用程序实现在控制台遍历该字符串</p>
<p><strong>实现步骤 :</strong></p>
<ol>
<li>键盘录入一个字符串，用 Scanner 实现</li>
<li>将字符串拆分为字符数组 , public char[] toCharArray( )：将当前字符串拆分为字符数组并返回</li>
<li>遍历字符数</li>
</ol>
<p><strong>代码实现 :</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>test</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test3</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
       需求：键盘录入一个字符串，使用程序实现在控制台遍历该字符串

       思路：
       1. 键盘录入一个字符串，用 Scanner 实现
       2. 将字符串拆分为字符数组
                public char[] toCharArray( )：将当前字符串拆分为字符数组并返回
       3. 遍历字符数组

    */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//  1. 键盘录入一个字符串，用 Scanner 实现</span>
        <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> s <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2. 将字符串拆分为字符数组</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 3. 遍历字符数组</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> chars<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>chars<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-9-手机号屏蔽-字符串截取" tabindex="-1"><a class="header-anchor" href="#_2-9-手机号屏蔽-字符串截取" aria-hidden="true">#</a> 2.9 手机号屏蔽-字符串截取</h3>
<p><strong>案例需求 :</strong></p>
<p>​	以字符串的形式从键盘接受一个手机号，将中间四位号码屏蔽
最终效果为：156****1234</p>
<p><strong>实现步骤 :</strong></p>
<ol>
<li>键盘录入一个字符串，用 Scanner 实现</li>
<li>截取字符串前三位</li>
<li>截取字符串后四位</li>
<li>将截取后的两个字符串，中间加上****进行拼接，输出结果</li>
</ol>
<p><strong>代码实现 :</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>test</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test5</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        需求：以字符串的形式从键盘接受一个手机号，将中间四位号码屏蔽
        最终效果为：156****1234

        思路：
        1. 键盘录入一个字符串，用 Scanner 实现
        2. 截取字符串前三位
        3. 截取字符串后四位
        4. 将截取后的两个字符串，中间加上****进行拼接，输出结果

     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1. 键盘录入一个字符串，用 Scanner 实现</span>
        <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入手机号:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> telString <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2. 截取字符串前三位</span>
        <span class="token class-name">String</span> start <span class="token operator">=</span> telString<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 3. 截取字符串后四位</span>
        <span class="token class-name">String</span> end <span class="token operator">=</span> telString<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 4. 将截取后的两个字符串，中间加上****进行拼接，输出结果</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>start <span class="token operator">+</span> <span class="token string">"****"</span> <span class="token operator">+</span> end<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-10-敏感词替换-字符串替换" tabindex="-1"><a class="header-anchor" href="#_2-10-敏感词替换-字符串替换" aria-hidden="true">#</a> 2.10 敏感词替换-字符串替换</h3>
<p><strong>案例需求 :</strong></p>
<p>​	键盘录入一个 字符串，如果字符串中包含（TMD），则使用***替换</p>
<p><strong>实现步骤 :</strong></p>
<ol>
<li>键盘录入一个字符串，用 Scanner 实现</li>
<li>替换敏感词
String replace(CharSequence target, CharSequence replacement)
将当前字符串中的target内容，使用replacement进行替换，返回新的字符串</li>
<li>输出结果</li>
</ol>
<p><strong>代码实现 :</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>test</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test6</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        需求：键盘录入一个 字符串，如果字符串中包含（TMD），则使用***替换

        思路：
        1. 键盘录入一个字符串，用 Scanner 实现
        2. 替换敏感词
                String replace(CharSequence target, CharSequence replacement)
                将当前字符串中的target内容，使用replacement进行替换，返回新的字符串
        3. 输出结果

     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1. 键盘录入一个字符串，用 Scanner 实现</span>
        <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> s <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2. 替换敏感词</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">"TMD"</span><span class="token punctuation">,</span><span class="token string">"***"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 3. 输出结果</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-11-切割字符串" tabindex="-1"><a class="header-anchor" href="#_2-11-切割字符串" aria-hidden="true">#</a> 2.11 切割字符串</h3>
<p><strong>案例需求 :</strong></p>
<p>​	以字符串的形式从键盘录入学生信息，例如：“张三 , 23”</p>
<p>​	从该字符串中切割出有效数据,封装为Student学生对象</p>
<p><strong>实现步骤 :</strong></p>
<ol>
<li>
<p>编写Student类，用于封装数据</p>
</li>
<li>
<p>键盘录入一个字符串，用 Scanner 实现</p>
</li>
<li>
<p>根据逗号切割字符串，得到（张三）（23）</p>
<p>String[] split(String regex) ：根据传入的字符串作为规则进行切割
将切割后的内容存入字符串数组中，并将字符串数组返回</p>
</li>
<li>
<p>从得到的字符串数组中取出元素内容，通过Student类的有参构造方法封装为对象</p>
</li>
<li>
<p>调用对象getXxx方法，取出数据并打印。</p>
</li>
</ol>
<p><strong>代码实现 :</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>test</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>domain<span class="token punctuation">.</span></span><span class="token class-name">Student</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test7</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
         需求：以字符串的形式从键盘录入学生信息，例如：“张三 , 23”
                从该字符串中切割出有效数据,封装为Student学生对象
         思路：
            1. 编写Student类，用于封装数据
            2. 键盘录入一个字符串，用 Scanner 实现
            3. 根据逗号切割字符串，得到（张三）（23）
                    String[] split(String regex) ：根据传入的字符串作为规则进行切割
                    将切割后的内容存入字符串数组中，并将字符串数组返回
            4. 从得到的字符串数组中取出元素内容，通过Student类的有参构造方法封装为对象
            5. 调用对象getXxx方法，取出数据并打印。

     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 2. 键盘录入一个字符串，用 Scanner 实现</span>
        <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入学生信息:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> stuInfo <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// stuInfo = "张三,23";</span>
        <span class="token comment">// 3. 根据逗号切割字符串，得到（张三）（23）</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> sArr <span class="token operator">=</span> stuInfo<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">","</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        System.out.println(sArr[0]);</span>
<span class="token comment">//        System.out.println(sArr[1]);</span>

        <span class="token comment">// 4. 从得到的字符串数组中取出元素内容，通过Student类的有参构造方法封装为对象</span>
        <span class="token class-name">Student</span> stu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span>sArr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>sArr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 5. 调用对象getXxx方法，取出数据并打印。</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>stu<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"..."</span> <span class="token operator">+</span> stu<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-12-string方法小结" tabindex="-1"><a class="header-anchor" href="#_2-12-string方法小结" aria-hidden="true">#</a> 2.12 String方法小结</h3>
<p><strong>String类的常用方法 :</strong></p>
<p>​	public boolean equals(Object anObject)  比较字符串的内容，严格区分大小写</p>
<p>​	public boolean equalsIgnoreCase(String anotherString)  比较字符串的内容，忽略大小写</p>
<p>​	public int length()  返回此字符串的长度</p>
<p>​	public char charAt(int index)  返回指定索引处的 char 值</p>
<p>​	public char[] toCharArray()  将字符串拆分为字符数组后返回</p>
<p>​	public String substring(int beginIndex, int endIndex)  根据开始和结束索引进行截取，得到新的字符串（包含头，不包含尾）</p>
<p>​	public String substring(int beginIndex)  从传入的索引处截取，截取到末尾，得到新的字符串</p>
<p>​	public String replace(CharSequence target, CharSequence replacement)  使用新值，将字符串中的旧值替换，得到新的字符串</p>
<p>​	public String[] split(String regex)  根据传入的规则切割字符串，得到字符串数组</p>
<h2 id="_3-stringbuilder类" tabindex="-1"><a class="header-anchor" href="#_3-stringbuilder类" aria-hidden="true">#</a> 3 StringBuilder类</h2>
<h3 id="_3-1-stringbuilder类概述" tabindex="-1"><a class="header-anchor" href="#_3-1-stringbuilder类概述" aria-hidden="true">#</a> 3.1 StringBuilder类概述</h3>
<p>​	<strong>概述 :</strong> StringBuilder 是一个可变的字符串类，我们可以把它看成是一个容器，这里的可变指的是 StringBuilder 对象中的内容是可变的</p>
<h3 id="_3-2-stringbuilder类和string类的区别" tabindex="-1"><a class="header-anchor" href="#_3-2-stringbuilder类和string类的区别" aria-hidden="true">#</a> 3.2 StringBuilder类和String类的区别</h3>
<ul>
<li>**String类：**内容是不可变的</li>
<li>**StringBuilder类：**内容是可变的</li>
</ul>
<h3 id="_3-3stringbuilder类的构造方法" tabindex="-1"><a class="header-anchor" href="#_3-3stringbuilder类的构造方法" aria-hidden="true">#</a> 3.3StringBuilder类的构造方法</h3>
<p><strong>常用的构造方法</strong></p>
<table>
<thead>
<tr>
<th>方法名</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>public StringBuilder()</td>
<td>创建一个空白可变字符串对象，不含有任何内容</td>
</tr>
<tr>
<td>public StringBuilder(String   str)</td>
<td>根据字符串的内容，来创建可变字符串对象</td>
</tr>
</tbody>
</table>
<p><strong>示例代码</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringBuilderDemo01</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//public StringBuilder()：创建一个空白可变字符串对象，不含有任何内容</span>
        <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sb:"</span> <span class="token operator">+</span> sb<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sb.length():"</span> <span class="token operator">+</span> sb<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//public StringBuilder(String str)：根据字符串的内容，来创建可变字符串对象</span>
        <span class="token class-name">StringBuilder</span> sb2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sb2:"</span> <span class="token operator">+</span> sb2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sb2.length():"</span> <span class="token operator">+</span> sb2<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-stringbuilder常用的成员方法" tabindex="-1"><a class="header-anchor" href="#_3-4-stringbuilder常用的成员方法" aria-hidden="true">#</a> 3.4 StringBuilder常用的成员方法</h3>
<ul>
<li>
<p><strong>添加和反转方法</strong></p>
<table>
<thead>
<tr>
<th>方法名</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>public StringBuilder   append(任意类型)</td>
<td>添加数据，并返回对象本身</td>
</tr>
<tr>
<td>public StringBuilder   reverse()</td>
<td>返回相反的字符序列</td>
</tr>
</tbody>
</table>
</li>
<li>
<p><strong>示例代码</strong></p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringBuilderDemo01</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建对象</span>
        <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//public StringBuilder append(任意类型)：添加数据，并返回对象本身</span>
<span class="token comment">//        StringBuilder sb2 = sb.append("hello");</span>
<span class="token comment">//</span>
<span class="token comment">//        System.out.println("sb:" + sb);</span>
<span class="token comment">//        System.out.println("sb2:" + sb2);</span>
<span class="token comment">//        System.out.println(sb == sb2);</span>

<span class="token comment">//        sb.append("hello");</span>
<span class="token comment">//        sb.append("world");</span>
<span class="token comment">//        sb.append("java");</span>
<span class="token comment">//        sb.append(100);</span>

        <span class="token comment">//链式编程</span>
        sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"world"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"java"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sb:"</span> <span class="token operator">+</span> sb<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//public StringBuilder reverse()：返回相反的字符序列</span>
        sb<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sb:"</span> <span class="token operator">+</span> sb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5stringbuilder和string相互转换【应用】" tabindex="-1"><a class="header-anchor" href="#_3-5stringbuilder和string相互转换【应用】" aria-hidden="true">#</a> 3.5StringBuilder和String相互转换【应用】</h3>
<ul>
<li>
<p><strong>StringBuilder转换为String</strong></p>
<p>​        public String toString()：通过 toString() 就可以实现把 StringBuilder 转换为 String</p>
</li>
<li>
<p><strong>String转换为StringBuilder</strong></p>
<p>​        public StringBuilder(String s)：通过构造方法就可以实现把 String 转换为 StringBuilder</p>
</li>
<li>
<p><strong>示例代码</strong></p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringBuilderDemo02</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">/*
        //StringBuilder 转换为 String
        StringBuilder sb = new StringBuilder();
        sb.append("hello");

        //String s = sb; //这个是错误的做法

        //public String toString()：通过 toString() 就可以实现把 StringBuilder 转换为 String
        String s = sb.toString();
        System.out.println(s);
        */</span>

        <span class="token comment">//String 转换为 StringBuilder</span>
        <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">"hello"</span><span class="token punctuation">;</span>

        <span class="token comment">//StringBuilder sb = s; //这个是错误的做法</span>

        <span class="token comment">//public StringBuilder(String s)：通过构造方法就可以实现把 String 转换为 StringBuilder</span>
        <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-stringbuilder拼接字符串案例" tabindex="-1"><a class="header-anchor" href="#_3-6-stringbuilder拼接字符串案例" aria-hidden="true">#</a> 3.6 StringBuilder拼接字符串案例</h3>
<p><strong>案例需求 :</strong></p>
<p>​	定义一个方法，把 int 数组中的数据按照指定的格式拼接成一个字符串返回，调用该方法，</p>
<p>​	并在控制台输出结果。例如，数组为int[] arr = {1,2,3}; ，执行方法后的输出结果为：[1, 2, 3]</p>
<p><strong>实现步骤 :</strong></p>
<ol>
<li>定义一个 int 类型的数组，用静态初始化完成数组元素的初始化</li>
<li>定义一个方法，用于把 int 数组中的数据按照指定格式拼接成一个字符串返回。
返回值类型 String，参数列表 int[] arr</li>
<li>在方法中用 StringBuilder 按照要求进行拼接，并把结果转成 String 返回</li>
<li>调用方法，用一个变量接收结果</li>
<li>输出结果</li>
</ol>
<p><strong>代码实现 :</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">/*
    思路：
        1:定义一个 int 类型的数组，用静态初始化完成数组元素的初始化
        2:定义一个方法，用于把 int 数组中的数据按照指定格式拼接成一个字符串返回。
          返回值类型 String，参数列表 int[] arr
        3:在方法中用 StringBuilder 按照要求进行拼接，并把结果转成 String 返回
        4:调用方法，用一个变量接收结果
        5:输出结果
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringBuilderTest01</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//定义一个 int 类型的数组，用静态初始化完成数组元素的初始化</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token comment">//调用方法，用一个变量接收结果</span>
        <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token function">arrayToString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//输出结果</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"s:"</span> <span class="token operator">+</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token comment">//定义一个方法，用于把 int 数组中的数据按照指定格式拼接成一个字符串返回</span>
    <span class="token comment">/*
        两个明确：
            返回值类型：String
            参数：int[] arr
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">arrayToString</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//在方法中用 StringBuilder 按照要求进行拼接，并把结果转成 String 返回</span>
        <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"["</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> arr<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">", "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> s <span class="token operator">=</span> sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span>  s<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


