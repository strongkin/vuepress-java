<template><div><h2 id="_1-方法概述" tabindex="-1"><a class="header-anchor" href="#_1-方法概述" aria-hidden="true">#</a> 1. 方法概述</h2>
<h3 id="_1-1-方法的概念" tabindex="-1"><a class="header-anchor" href="#_1-1-方法的概念" aria-hidden="true">#</a> 1.1 方法的概念</h3>
<p>​	方法（method）是将具有独立功能的代码块组织成为一个整体，使其具有特殊功能的代码集</p>
<ul>
<li>注意：
<ul>
<li>方法必须先创建才可以使用，该过程成为方法定义</li>
<li>方法创建后并不是直接可以运行的，需要手动使用后，才执行，该过程成为方法调用</li>
</ul>
</li>
</ul>
<h2 id="_2-方法的定义和调用" tabindex="-1"><a class="header-anchor" href="#_2-方法的定义和调用" aria-hidden="true">#</a> 2. 方法的定义和调用</h2>
<h3 id="_2-1-无参数方法定义和调用" tabindex="-1"><a class="header-anchor" href="#_2-1-无参数方法定义和调用" aria-hidden="true">#</a> 2.1 无参数方法定义和调用</h3>
<ul>
<li>
<p>定义格式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> 方法名 <span class="token punctuation">(</span>   <span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 方法体;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> method <span class="token punctuation">(</span>    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 方法体;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>调用格式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>方法名<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>注意：</p>
<p>​	方法必须先定义，后调用，否则程序将报错</p>
</li>
</ul>
<h3 id="_2-2-方法的调用过程" tabindex="-1"><a class="header-anchor" href="#_2-2-方法的调用过程" aria-hidden="true">#</a> 2.2 方法的调用过程</h3>
<ul>
<li>总结：每个方法在被调用执行的时候，都会进入栈内存，并且拥有自己独立的内存空间，方法内部代码调用完毕之后，会从栈内存中弹栈消失。</li>
</ul>
<h3 id="_2-3-方法练习-奇偶数判断" tabindex="-1"><a class="header-anchor" href="#_2-3-方法练习-奇偶数判断" aria-hidden="true">#</a> 2.3 方法练习-奇偶数判断</h3>
<ul>
<li>需求：判断一个数是奇数还是偶数</li>
<li>代码：</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo1Method</span> <span class="token punctuation">{</span>
    <span class="token comment">/*

        带参数方法的定义格式:
                public static void 方法名  ( 参数 )  { … … }
                public static void 方法名  ( 数据类型 变量名 )  { … … }

        带参数方法的调用格式:
                方法名 ( 参数 ) ;
                方法名 ( 变量名/常量值 ) ;

        tips: 参数可以是一个, 也可以是多个.

        需求: 判断一个数是奇数还是偶数
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">isEvenNumber</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">isEvenNumber</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>num <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"偶数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"奇数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-带参数方法的定义和调用" tabindex="-1"><a class="header-anchor" href="#_3-带参数方法的定义和调用" aria-hidden="true">#</a> 3. 带参数方法的定义和调用</h2>
<h3 id="_3-1-带参数方法定义和调用" tabindex="-1"><a class="header-anchor" href="#_3-1-带参数方法定义和调用" aria-hidden="true">#</a> 3.1 带参数方法定义和调用</h3>
<ul>
<li>
<p>定义格式：</p>
<p>参数：由数据类型和变量名组成 -  数据类型 变量名</p>
<p>参数范例：int a</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> 方法名 <span class="token punctuation">(</span>参数<span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	方法体<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> 方法名 <span class="token punctuation">(</span>参数<span class="token number">1</span><span class="token punctuation">,</span> 参数<span class="token number">2</span><span class="token punctuation">,</span> 参数<span class="token number">3.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	方法体<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">isEvenNumber</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">getMax</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>注意：</p>
<pre><code>方法定义时，参数中的数据类型与变量名都不能缺少，缺少任意一个程序将报错

方法定义时，多个参数之间使用逗号( ，)分隔
</code></pre>
</li>
</ul>
</li>
<li>
<p>调用格式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>方法名<span class="token punctuation">(</span>参数<span class="token punctuation">)</span>；

方法名<span class="token punctuation">(</span>参数<span class="token number">1</span><span class="token punctuation">,</span>参数<span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token function">isEvenNumber</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">getMax</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>方法调用时，参数的数量与类型必须与方法定义中的设置相匹配，否则程序将报错</li>
</ul>
</li>
</ul>
<h3 id="_3-2-形参和实参" tabindex="-1"><a class="header-anchor" href="#_3-2-形参和实参" aria-hidden="true">#</a> 3.2 形参和实参</h3>
<ol>
<li>形参：方法定义中的参数</li>
</ol>
<p>​          等同于变量定义格式，例如：int number</p>
<ol start="2">
<li>实参：方法调用中的参数</li>
</ol>
<p>​          等同于使用变量或常量，例如： 10  number</p>
<h3 id="_3-3-带参数方法的练习-打印n-m之间所有的奇数" tabindex="-1"><a class="header-anchor" href="#_3-3-带参数方法的练习-打印n-m之间所有的奇数" aria-hidden="true">#</a> 3.3 带参数方法的练习-打印n-m之间所有的奇数</h3>
<ul>
<li>
<p>需求：设计一个方法（print） 用于打印 n 到 m 之间所有的奇数</p>
</li>
<li>
<p>思路：</p>
<p>​	1：定义方法，名称为print
2：为方法添加两个int类型的形参，准备接受调用者传递过来的实参
3：方法中设计for循环，循环从n开始，到m结束
4：循环中加入if判断，是奇数，则打印
5：main方法中调用print方法，传入两个实际参数</p>
</li>
<li>
<p>代码：</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>method2</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo2Method</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 5：main方法中调用print方法，传入两个实际参数</span>
        <span class="token function">print</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//1：定义方法，名称为print</span>
    <span class="token comment">// 2：为方法添加两个int类型的形参，准备接受调用者传递过来的实参</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">,</span> <span class="token keyword">int</span> m<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token string">"到"</span> <span class="token operator">+</span> m <span class="token operator">+</span> <span class="token string">"之间的奇数为:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 3：方法中设计for循环，循环从n开始，到m结束</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 4：循环中加入if判断，是奇数，则打印</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-带返回值方法的定义和调用" tabindex="-1"><a class="header-anchor" href="#_4-带返回值方法的定义和调用" aria-hidden="true">#</a> 4. 带返回值方法的定义和调用</h2>
<h3 id="_4-1-带返回值方法定义和调用-掌握" tabindex="-1"><a class="header-anchor" href="#_4-1-带返回值方法定义和调用-掌握" aria-hidden="true">#</a> 4.1 带返回值方法定义和调用（掌握）</h3>
<ul>
<li>
<p>定义格式</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> 数据类型 方法名 <span class="token punctuation">(</span> 参数 <span class="token punctuation">)</span> <span class="token punctuation">{</span> 
	<span class="token keyword">return</span> 数据 <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>范例</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isEvenNumber</span><span class="token punctuation">(</span> <span class="token keyword">int</span> number <span class="token punctuation">)</span> <span class="token punctuation">{</span>           
	<span class="token keyword">return</span> <span class="token boolean">true</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getMax</span><span class="token punctuation">(</span> <span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b <span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span>  <span class="token number">100</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>注意：
<ul>
<li>方法定义时return后面的返回值与方法定义上的数据类型要匹配，否则程序将报错</li>
</ul>
</li>
</ul>
</li>
<li>
<p>调用格式</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>方法名 <span class="token punctuation">(</span> 参数 <span class="token punctuation">)</span> <span class="token punctuation">;</span>
数据类型 变量名 <span class="token operator">=</span> 方法名 <span class="token punctuation">(</span> 参数 <span class="token punctuation">)</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>范例</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>isEvenNumber <span class="token punctuation">(</span> <span class="token number">5</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token keyword">boolean</span>  flag <span class="token operator">=</span>  isEvenNumber <span class="token punctuation">(</span> <span class="token number">5</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>注意：
<ul>
<li>方法的返回值通常会使用变量接收，否则该返回值将无意义</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="_4-2-带返回值方法的练习-求两个数的最大值-应用" tabindex="-1"><a class="header-anchor" href="#_4-2-带返回值方法的练习-求两个数的最大值-应用" aria-hidden="true">#</a> 4.2 带返回值方法的练习-求两个数的最大值(应用)</h3>
<ul>
<li>
<p>需求：设计一个方法可以获取两个数的较大值，数据来自于参数</p>
</li>
<li>
<p>思路：</p>
<ol>
<li>定义一个方法，声明两个形参接收计算的数值，求出结果并返回</li>
<li>使用 if 语句 得出 a 和 b 之间的最大值，根据情况return具体结果</li>
<li>在main()方法中调用定义好的方法并使用 【 变量保存 】</li>
</ol>
</li>
<li>
<p>代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> <span class="token comment">/*
        需求：设计一个方法可以获取两个数的较大值，数据来自于参数

        1. 定义一个方法，声明两个形参接收计算的数值，求出结果并返回
        2. 使用 if 语句 得出 a 和 b 之间的最大值，根据情况return具体结果
        3. 在main()方法中调用定义好的方法并使用 【 变量保存 】
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 3. 在main()方法中调用定义好的方法并使用 【 变量保存 】</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">getMax</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出调用</span>

        <span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token function">getMax</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> result<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"HelloWorld"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token comment">// 方法可以获取两个数的较大值</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getMax</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>a <span class="token operator">></span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> a<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> b<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_5-方法的注意事项" tabindex="-1"><a class="header-anchor" href="#_5-方法的注意事项" aria-hidden="true">#</a> 5. 方法的注意事项</h2>
<h3 id="_5-1-方法的通用格式-掌握" tabindex="-1"><a class="header-anchor" href="#_5-1-方法的通用格式-掌握" aria-hidden="true">#</a> 5.1 方法的通用格式（掌握）</h3>
<ul>
<li>
<p>格式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> 返回值类型 方法名<span class="token punctuation">(</span>参数<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   方法体<span class="token punctuation">;</span> 
   <span class="token keyword">return</span> 数据 <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>解释：</p>
<ul>
<li>
<p>public static 	修饰符，目前先记住这个格式</p>
<p>返回值类型	方法操作完毕之后返回的数据的数据类型</p>
<p>​			如果方法操作完毕，没有数据返回，这里写void，而且方法体中一般不写return</p>
<p>方法名		调用方法时候使用的标识</p>
<p>参数		由数据类型和变量名组成，多个参数之间用逗号隔开</p>
<p>方法体		完成功能的代码块</p>
<p>return		如果方法操作完毕，有数据返回，用于把数据返回给调用者</p>
</li>
</ul>
</li>
<li>
<p>定义方法时，要做到两个明确</p>
<ul>
<li>明确返回值类型：主要是明确方法操作完毕之后是否有数据返回，如果没有，写void；如果有，写对应的数据类型</li>
<li>明确参数：主要是明确参数的类型和数量</li>
</ul>
</li>
<li>
<p>调用方法时的注意：</p>
<ul>
<li>void类型的方法，直接调用即可</li>
<li>非void类型的方法，推荐用变量接收调用</li>
</ul>
</li>
</ul>
<h3 id="_5-2-方法的注意事项" tabindex="-1"><a class="header-anchor" href="#_5-2-方法的注意事项" aria-hidden="true">#</a> 5.2 方法的注意事项</h3>
<ul>
<li>
<p>方法不能嵌套定义</p>
<ul>
<li>
<p>示例代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">methodOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">methodTwo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       		<span class="token comment">// 这里会引发编译错误!!!</span>
    	<span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>void表示无返回值，可以省略return，也可以单独的书写return，后面不加数据</p>
<ul>
<li>
<p>示例代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">methodTwo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//return 100; 编译错误，因为没有具体返回值类型</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>	
        <span class="token comment">//System.out.println(100); return语句后面不能跟数据或代码</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h2 id="_6-方法重载" tabindex="-1"><a class="header-anchor" href="#_6-方法重载" aria-hidden="true">#</a> 6. 方法重载</h2>
<h3 id="_6-1-方法重载" tabindex="-1"><a class="header-anchor" href="#_6-1-方法重载" aria-hidden="true">#</a> 6.1 方法重载</h3>
<ul>
<li>
<p>方法重载概念</p>
<p>方法重载指同一个类中定义的多个方法之间的关系，满足下列条件的多个方法相互构成重载</p>
<ul>
<li>多个方法在同一个类中</li>
<li>多个方法具有相同的方法名</li>
<li>多个方法的参数不相同，类型不同或者数量不同</li>
</ul>
</li>
<li>
<p>注意：</p>
<ul>
<li>重载仅对应方法的定义，与方法的调用无关，调用方式参照标准格式</li>
<li>重载仅针对同一个类中方法的名称与参数进行识别，与返回值无关，换句话说不能通过返回值来判定两个方法是否相互构成重载</li>
</ul>
</li>
<li>
<p>正确范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodDemo</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	<span class="token comment">//方法体</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">double</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	<span class="token comment">//方法体</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodDemo</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">float</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	<span class="token comment">//方法体</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">int</span> a <span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	<span class="token comment">//方法体</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>错误范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodDemo</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	<span class="token comment">//方法体</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span> 	<span class="token comment">/*错误原因：重载与返回值无关*/</span>
    	<span class="token comment">//方法体</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodDemo01</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//方法体</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodDemo02</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">double</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/*错误原因：这是两个类的两个fn方法*/</span>
        <span class="token comment">//方法体</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_6-2-方法重载练习" tabindex="-1"><a class="header-anchor" href="#_6-2-方法重载练习" aria-hidden="true">#</a> 6.2 方法重载练习</h3>
<ul>
<li>
<p>需求：使用方法重载的思想，设计比较两个整数是否相同的方法，兼容全整数类型（byte,short,int,long）</p>
</li>
<li>
<p>思路：</p>
<p>​	①定义比较两个数字的是否相同的方法compare()方法，参数选择两个int型参数</p>
<p>​	②定义对应的重载方法，变更对应的参数类型，参数变更为两个long型参数</p>
<p>​	③定义所有的重载方法，两个byte类型与两个short类型参数</p>
<p>​	④完成方法的调用，测试运行结果</p>
</li>
<li>
<p>代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//调用方法</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">compare</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">compare</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">compare</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">compare</span><span class="token punctuation">(</span><span class="token number">10L</span><span class="token punctuation">,</span> <span class="token number">20L</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//int</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"int"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> a <span class="token operator">==</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//byte</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token keyword">byte</span> a<span class="token punctuation">,</span> <span class="token keyword">byte</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"byte"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> a <span class="token operator">==</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//short</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token keyword">short</span> a<span class="token punctuation">,</span> <span class="token keyword">short</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"short"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> a <span class="token operator">==</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//long</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token keyword">long</span> a<span class="token punctuation">,</span> <span class="token keyword">long</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"long"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> a <span class="token operator">==</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_7-方法的参数传递" tabindex="-1"><a class="header-anchor" href="#_7-方法的参数传递" aria-hidden="true">#</a> 7. 方法的参数传递</h2>
<h3 id="_7-1-方法参数传递基本类型-理解" tabindex="-1"><a class="header-anchor" href="#_7-1-方法参数传递基本类型-理解" aria-hidden="true">#</a> 7.1 方法参数传递基本类型（理解）</h3>
<ul>
<li>
<p>测试代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>param</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test1</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
         方法参数传递为基本数据类型 :

                传入方法中的, 是具体的数值.
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> number <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"调用change方法前:"</span> <span class="token operator">+</span> number<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">change</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"调用change方法后:"</span> <span class="token operator">+</span> number<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">change</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        number <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>结论：</p>
<ul>
<li>基本数据类型的参数，形式参数的改变，不影响实际参数</li>
</ul>
</li>
<li>
<p>结论依据：</p>
<ul>
<li>每个方法在栈内存中，都会有独立的栈空间，方法运行结束后就会弹栈消失</li>
</ul>
</li>
</ul>
<h3 id="_7-2-方法参数传递引用类型" tabindex="-1"><a class="header-anchor" href="#_7-2-方法参数传递引用类型" aria-hidden="true">#</a> 7.2 方法参数传递引用类型</h3>
<ul>
<li>
<p>测试代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>param</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test2</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
         方法参数传递为引用数据类型 :

                传入方法中的, 是内存地址.
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"调用change方法前:"</span> <span class="token operator">+</span> arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">change</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"调用change方法后:"</span> <span class="token operator">+</span> arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">change</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>结论：</p>
<ul>
<li>对于引用类型的参数，形式参数的改变，影响实际参数的值</li>
</ul>
</li>
<li>
<p>结论依据：</p>
<ul>
<li>引用数据类型的传参，传入的是地址值，内存中会造成两个引用指向同一个内存的效果，所以即使方法弹栈，堆内存中的数据也已经是改变后的结果</li>
</ul>
</li>
</ul>
<h3 id="_7-3-数组遍历" tabindex="-1"><a class="header-anchor" href="#_7-3-数组遍历" aria-hidden="true">#</a> 7.3 数组遍历</h3>
<ul>
<li>
<p>需求：设计一个方法用于数组遍历，要求遍历的结果是在一行上的。例如：[11, 22, 33, 44, 55]</p>
</li>
<li>
<p>思路：</p>
<ul>
<li>
<p>因为要求结果在一行上输出，所以这里需要在学习一个新的输出语句System.out.print(“内容”);</p>
<p>System.out.println(“内容”); 输出内容并换行</p>
<p>System.out.print(“内容”); 输出内容不换行</p>
<p>System.out.println(); 起到换行的作用</p>
</li>
<li>
<p>定义一个数组，用静态初始化完成数组元素初始化</p>
</li>
<li>
<p>定义一个方法，用数组遍历通用格式对数组进行遍历</p>
</li>
<li>
<p>用新的输出语句修改遍历操作</p>
</li>
<li>
<p>调用遍历方法</p>
</li>
</ul>
</li>
<li>
<p>代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>test</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test1</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        需求：设计一个方法用于数组遍历，要求遍历的结果是在一行上的。例如：[11, 22, 33, 44, 55]
        思路：
            1.定义一个数组，用静态初始化完成数组元素初始化
            2.定义一个方法，对数组进行遍历
            3.遍历打印的时候，数据不换行
            4.调用遍历方法
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1.定义一个数组，用静态初始化完成数组元素初始化</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">44</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token comment">// 4.调用遍历方法</span>
        <span class="token function">printArray</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"另外一段代码逻辑 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
        2.定义一个方法，对数组进行遍历

        1, 参数           int[] arr
        2, 返回值类型      void
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printArray</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span><span class="token punctuation">{</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"["</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">// 如果满足条件, 说明是最后一个元素, 最后一个元素, 特殊处理</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">"]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                <span class="token comment">// 3.遍历打印的时候，数据不换行</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">", "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>


        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_7-4-数组最大值" tabindex="-1"><a class="header-anchor" href="#_7-4-数组最大值" aria-hidden="true">#</a> 7.4 数组最大值</h3>
<ul>
<li>
<p>需求：设计一个方法用于获取数组中元素的最大值</p>
</li>
<li>
<p>思路：</p>
<ul>
<li>①定义一个数组，用静态初始化完成数组元素初始化</li>
<li>②定义一个方法，用来获取数组中的最大值，最值的认知和讲解我们在数组中已经讲解过了</li>
<li>③调用获取最大值方法，用变量接收返回结果</li>
<li>④把结果输出在控制台</li>
</ul>
</li>
<li>
<p>代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>test</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test2</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        需求：设计一个方法用于获取数组中元素的最大值

        思路：
            1.定义一个数组，用静态初始化完成数组元素初始化
            2.定义一个方法，用来获取数组中的最大值
            3.调用获取最大值方法，用变量接收返回结果
            4.把结果输出在控制台
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1.定义一个数组，用静态初始化完成数组元素初始化</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">44</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token comment">// 3.调用获取最大值方法，用变量接收返回结果</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> <span class="token function">getMax</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//  4.把结果输出在控制台</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
        2.定义一个方法，用来获取数组中的最大值

        1, 参数       int[] arr
        2, 返回值类型  int
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getMax</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>max <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                max <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> max<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_7-5-方法同时获取数组最大值和最小值" tabindex="-1"><a class="header-anchor" href="#_7-5-方法同时获取数组最大值和最小值" aria-hidden="true">#</a> 7.5 方法同时获取数组最大值和最小值</h3>
<ul>
<li>
<p>需求：设计一个方法，该方法能够同时获取数组的最大值，和最小值</p>
</li>
<li>
<p>注意: return语句, 只能带回一个结果.</p>
</li>
<li>
<p>代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test3</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        需求：设计一个方法，该方法能够同时获取数组的最大值，和最小值

        注意: return语句, 只能带回一个结果.
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">,</span><span class="token number">55</span><span class="token punctuation">,</span><span class="token number">33</span><span class="token punctuation">,</span><span class="token number">22</span><span class="token punctuation">,</span><span class="token number">44</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> maxAndMin <span class="token operator">=</span> <span class="token function">getMaxAndMin</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>maxAndMin<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>maxAndMin<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getMaxAndMin</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>max <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                max <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">int</span> min <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>min <span class="token operator">></span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                min <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> maxAndMin <span class="token operator">=</span> <span class="token punctuation">{</span>min<span class="token punctuation">,</span> max<span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> maxAndMin<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


