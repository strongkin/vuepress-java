<template><div><h2 id="_1-接口" tabindex="-1"><a class="header-anchor" href="#_1-接口" aria-hidden="true">#</a> 1.接口</h2>
<h3 id="_1-1黑马信息管理系统集合改进-应用" tabindex="-1"><a class="header-anchor" href="#_1-1黑马信息管理系统集合改进-应用" aria-hidden="true">#</a> 1.1黑马信息管理系统集合改进 (应用)</h3>
<ul>
<li>
<p>使用数组容器的弊端</p>
<ol>
<li>容器长度是固定的，不能根据添加功能自动增长</li>
<li>没有提供用于赠删改查的方法</li>
</ol>
</li>
<li>
<p>优化步骤</p>
<ol>
<li>
<p>创建新的StudentDao类，OtherStudentDao</p>
</li>
<li>
<p>创建ArrayList集合容器对象</p>
</li>
<li>
<p>OtherStudentDao中的方法声明，需要跟StudentDao保持一致</p>
<p>注意：如果不一致，StudentService中的代码就需要进行修改</p>
</li>
<li>
<p>完善方法（添加、删除、修改、查看）</p>
</li>
<li>
<p>替换StudentService中的Dao对象</p>
</li>
</ol>
</li>
<li>
<p>代码实现</p>
<p>OtherStudentDao类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OtherStudentDao</span> <span class="token punctuation">{</span>
    <span class="token comment">// 集合容器</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> stus <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">Student</span> stu1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"heima001"</span><span class="token punctuation">,</span><span class="token string">"张三"</span><span class="token punctuation">,</span><span class="token string">"23"</span><span class="token punctuation">,</span><span class="token string">"1999-11-11"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> stu2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"heima002"</span><span class="token punctuation">,</span><span class="token string">"李四"</span><span class="token punctuation">,</span><span class="token string">"24"</span><span class="token punctuation">,</span><span class="token string">"2000-11-11"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        stus<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>stu1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        stus<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>stu2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 添加学生方法</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">addStudent</span><span class="token punctuation">(</span><span class="token class-name">Student</span> stu<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       stus<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>stu<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 查看学生方法</span>
    <span class="token keyword">public</span> <span class="token class-name">Student</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">findAllStudent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">Student</span><span class="token punctuation">[</span><span class="token punctuation">]</span> students <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">[</span>stus<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> students<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            students<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> stus<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> students<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deleteStudentById</span><span class="token punctuation">(</span><span class="token class-name">String</span> delId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1. 查找id在容器中所在的索引位置</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token function">getIndex</span><span class="token punctuation">(</span>delId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        stus<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getIndex</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> stus<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Student</span> stu <span class="token operator">=</span> stus<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>stu <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> stu<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                index <span class="token operator">=</span> i<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> index<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateStudent</span><span class="token punctuation">(</span><span class="token class-name">String</span> updateId<span class="token punctuation">,</span> <span class="token class-name">Student</span> newStu<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1. 查找updateId, 在容器中的索引位置</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token function">getIndex</span><span class="token punctuation">(</span>updateId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        stus<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> newStu<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>StudentService类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentService</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建StudentDao (库管)</span>
     <span class="token keyword">private</span> <span class="token class-name">OtherStudentDao</span> studentDao <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OtherStudentDao</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  	<span class="token comment">// 其他方法没有变化,此处省略...</span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_1-2黑马信息管理系统抽取dao-应用" tabindex="-1"><a class="header-anchor" href="#_1-2黑马信息管理系统抽取dao-应用" aria-hidden="true">#</a> 1.2黑马信息管理系统抽取Dao (应用)</h3>
<ul>
<li>
<p>优化步骤</p>
<ol>
<li>将方法向上抽取，抽取出一个父类 （ BaseStudentDao ）</li>
<li>方法的功能实现在父类中无法给出具体明确，定义为抽象方法</li>
<li>让两个类分别继承 BaseStudentDao ，重写内部抽象方法</li>
</ol>
</li>
<li>
<p>代码实现</p>
<p>BaseStudentDao类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">BaseStudentDao</span> <span class="token punctuation">{</span>
    <span class="token comment">// 添加学生方法</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">boolean</span> <span class="token function">addStudent</span><span class="token punctuation">(</span><span class="token class-name">Student</span> stu<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 查看学生方法</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">Student</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">findAllStudent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 删除学生方法</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">deleteStudentById</span><span class="token punctuation">(</span><span class="token class-name">String</span> delId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 根据id找索引方法</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">int</span> <span class="token function">getIndex</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 修改学生方法</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">updateStudent</span><span class="token punctuation">(</span><span class="token class-name">String</span> updateId<span class="token punctuation">,</span> <span class="token class-name">Student</span> newStu<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>StudentDao类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentDao</span> <span class="token keyword">extends</span> <span class="token class-name">BaseStudentDao</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其他内容不变,此处省略</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OtherStudentDao类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OtherStudentDao</span> <span class="token keyword">extends</span> <span class="token class-name">BaseStudentDao</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其他内容不变,此处省略</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_1-3接口的概述-理解" tabindex="-1"><a class="header-anchor" href="#_1-3接口的概述-理解" aria-hidden="true">#</a> 1.3接口的概述（理解）</h3>
<ul>
<li>接口就是一种公共的规范标准，只要符合规范标准，大家都可以通用。</li>
<li>Java中接口存在的两个意义
<ol>
<li>用来定义规范</li>
<li>用来做功能的拓展</li>
</ol>
</li>
</ul>
<h3 id="_1-4接口的特点-记忆" tabindex="-1"><a class="header-anchor" href="#_1-4接口的特点-记忆" aria-hidden="true">#</a> 1.4接口的特点（记忆）</h3>
<ul>
<li>
<p>接口用关键字interface修饰</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> 接口名 <span class="token punctuation">{</span><span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>类实现接口用implements表示</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> 类名 <span class="token keyword">implements</span> 接口名 <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>接口不能实例化</p>
<p>​	我们可以创建接口的实现类对象使用</p>
</li>
<li>
<p>接口的子类</p>
<p>​	要么重写接口中的所有抽象方法</p>
<p>​	要么子类也是抽象类</p>
</li>
</ul>
<h3 id="_1-5接口的成员特点-记忆" tabindex="-1"><a class="header-anchor" href="#_1-5接口的成员特点-记忆" aria-hidden="true">#</a> 1.5接口的成员特点（记忆）</h3>
<ul>
<li>
<p>成员特点</p>
<ul>
<li>
<p>成员变量</p>
<p>​	 只能是常量
​	 默认修饰符：public static final</p>
</li>
<li>
<p>构造方法</p>
<p>​	没有，因为接口主要是扩展功能的，而没有具体存在</p>
</li>
<li>
<p>成员方法</p>
<p>​	只能是抽象方法</p>
<p>​	默认修饰符：public abstract</p>
<p>​	关于接口中的方法，JDK8和JDK9中有一些新特性，后面再讲解</p>
</li>
</ul>
</li>
<li>
<p>代码演示</p>
<ul>
<li>接口</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Inter</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">NUM</span> <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>实现类</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">InterImpl</span> <span class="token keyword">implements</span> <span class="token class-name">Inter</span><span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// NUM = 20;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token constant">NUM</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>测试类</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestInterface</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        成员变量: 只能是常量 系统会默认加入三个关键字
                    public static final
        构造方法: 没有
        成员方法: 只能是抽象方法, 系统会默认加入两个关键字
                    public abstract
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Inter</span><span class="token punctuation">.</span><span class="token constant">NUM</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_1-6类和接口的关系-记忆" tabindex="-1"><a class="header-anchor" href="#_1-6类和接口的关系-记忆" aria-hidden="true">#</a> 1.6类和接口的关系（记忆）</h3>
<ul>
<li>
<p>类与类的关系</p>
<p>​	继承关系，只能单继承，但是可以多层继承</p>
</li>
<li>
<p>类与接口的关系</p>
<p>​	实现关系，可以单实现，也可以多实现，还可以在继承一个类的同时实现多个接口</p>
</li>
<li>
<p>接口与接口的关系</p>
<p>​	继承关系，可以单继承，也可以多继承</p>
</li>
</ul>
<h3 id="_1-7黑马信息管理系统使用接口改进-应用" tabindex="-1"><a class="header-anchor" href="#_1-7黑马信息管理系统使用接口改进-应用" aria-hidden="true">#</a> 1.7黑马信息管理系统使用接口改进 (应用)</h3>
<ul>
<li>
<p>实现步骤</p>
<ol>
<li>将 BaseStudentDao 改进为一个接口</li>
<li>让 StudentDao 和 OtherStudentDao 去实现这个接口</li>
</ol>
</li>
<li>
<p>代码实现</p>
<p>BaseStudentDao接口</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BaseStudentDao</span> <span class="token punctuation">{</span>
    <span class="token comment">// 添加学生方法</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">boolean</span> <span class="token function">addStudent</span><span class="token punctuation">(</span><span class="token class-name">Student</span> stu<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 查看学生方法</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">Student</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">findAllStudent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 删除学生方法</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">deleteStudentById</span><span class="token punctuation">(</span><span class="token class-name">String</span> delId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 根据id找索引方法</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">int</span> <span class="token function">getIndex</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 修改学生方法</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">updateStudent</span><span class="token punctuation">(</span><span class="token class-name">String</span> updateId<span class="token punctuation">,</span> <span class="token class-name">Student</span> newStu<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>StudentDao类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentDao</span> <span class="token keyword">implements</span> <span class="token class-name">BaseStudentDao</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其他内容不变,此处省略</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OtherStudentDao类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OtherStudentDao</span> <span class="token keyword">implements</span> <span class="token class-name">BaseStudentDao</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其他内容不变,此处省略</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_1-8黑马信息管理系统解耦合改进-应用" tabindex="-1"><a class="header-anchor" href="#_1-8黑马信息管理系统解耦合改进-应用" aria-hidden="true">#</a> 1.8黑马信息管理系统解耦合改进 (应用)</h3>
<ul>
<li>
<p>实现步骤</p>
<ol>
<li>创建factory包，创建 StudentDaoFactory（工厂类）</li>
<li>提供 static 修改的 getStudentDao 方法，该方法用于创建StudentDao对象并返回</li>
</ol>
</li>
<li>
<p>代码实现</p>
<p>StudentDaoFactory类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentDaoFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">OtherStudentDao</span> <span class="token function">getStudentDao</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">OtherStudentDao</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>StudentService类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentService</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建StudentDao (库管)</span>
    <span class="token comment">// private OtherStudentDao studentDao = new OtherStudentDao();</span>

    <span class="token comment">// 通过学生库管工厂类, 获取库管对象</span>
    <span class="token keyword">private</span> <span class="token class-name">OtherStudentDao</span> studentDao <span class="token operator">=</span> <span class="token class-name">StudentDaoFactory</span><span class="token punctuation">.</span><span class="token function">getStudentDao</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_2-接口组成更新" tabindex="-1"><a class="header-anchor" href="#_2-接口组成更新" aria-hidden="true">#</a> 2.接口组成更新</h2>
<h3 id="_2-1接口组成更新概述【理解】" tabindex="-1"><a class="header-anchor" href="#_2-1接口组成更新概述【理解】" aria-hidden="true">#</a> 2.1接口组成更新概述【理解】</h3>
<ul>
<li>
<p>常量</p>
<p>public static final</p>
</li>
<li>
<p>抽象方法</p>
<p>public abstract</p>
</li>
<li>
<p>默认方法(Java 8)</p>
</li>
<li>
<p>静态方法(Java 8)</p>
</li>
<li>
<p>私有方法(Java 9)</p>
</li>
</ul>
<h3 id="_2-2接口中默认方法【应用】" tabindex="-1"><a class="header-anchor" href="#_2-2接口中默认方法【应用】" aria-hidden="true">#</a> 2.2接口中默认方法【应用】</h3>
<ul>
<li>
<p>格式</p>
<p>public default 返回值类型 方法名(参数列表) {   }</p>
</li>
<li>
<p>作用</p>
<p>解决接口升级的问题</p>
</li>
<li>
<p>范例</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">show3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>注意事项</p>
<ul>
<li>默认方法不是抽象方法，所以不强制被重写。但是可以被重写，重写的时候去掉default关键字</li>
<li>public可以省略，default不能省略</li>
<li>如果实现了多个接口，多个接口中存在相同的方法声明，子类就必须对该方法进行重写</li>
</ul>
</li>
</ul>
<h3 id="_2-3接口中静态方法【应用】" tabindex="-1"><a class="header-anchor" href="#_2-3接口中静态方法【应用】" aria-hidden="true">#</a> 2.3接口中静态方法【应用】</h3>
<ul>
<li>
<p>格式</p>
<p>public static 返回值类型 方法名(参数列表) {   }</p>
</li>
<li>
<p>范例</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>注意事项</p>
<ul>
<li>静态方法只能通过接口名调用，不能通过实现类名或者对象名调用</li>
<li>public可以省略，static不能省略</li>
</ul>
</li>
</ul>
<h3 id="_2-4接口中私有方法【应用】" tabindex="-1"><a class="header-anchor" href="#_2-4接口中私有方法【应用】" aria-hidden="true">#</a> 2.4接口中私有方法【应用】</h3>
<ul>
<li>
<p>私有方法产生原因</p>
<p>Java 9中新增了带方法体的私有方法，这其实在Java 8中就埋下了伏笔：Java 8允许在接口中定义带方法体的默认方法和静态方法。这样可能就会引发一个问题：当两个默认方法或者静态方法中包含一段相同的代码实现时，程序必然考虑将这段实现代码抽取成一个共性方法，而这个共性方法是不需要让别人使用的，因此用私有给隐藏起来，这就是Java 9增加私有方法的必然性</p>
</li>
<li>
<p>定义格式</p>
<ul>
<li>
<p>格式1</p>
<p>private 返回值类型 方法名(参数列表) {   }</p>
</li>
<li>
<p>范例1</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>格式2</p>
<p>private static 返回值类型 方法名(参数列表) {   }</p>
</li>
<li>
<p>范例2</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>注意事项</p>
<ul>
<li>默认方法可以调用私有的静态方法和非静态方法</li>
<li>静态方法只能调用私有的静态方法</li>
</ul>
</li>
</ul>
<h2 id="_3-多态" tabindex="-1"><a class="header-anchor" href="#_3-多态" aria-hidden="true">#</a> 3.多态</h2>
<h3 id="_3-1多态的概述-记忆" tabindex="-1"><a class="header-anchor" href="#_3-1多态的概述-记忆" aria-hidden="true">#</a> 3.1多态的概述（记忆）</h3>
<ul>
<li>
<p>什么是多态</p>
<p>​	同一个对象，在不同时刻表现出来的不同形态</p>
</li>
<li>
<p>多态的前提</p>
<ul>
<li>要有继承或实现关系</li>
<li>要有方法的重写</li>
<li>要有父类引用指向子类对象</li>
</ul>
</li>
<li>
<p>代码演示</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"动物吃饭"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Cat</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"猫吃鱼"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test1Polymorphic</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        多态的前提:

            1. 要有(继承 \ 实现)关系
            2. 要有方法重写
            3. 要有父类引用, 指向子类对象
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 当前事物, 是一只猫</span>
        <span class="token class-name">Cat</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 当前事物, 是一只动物</span>
        <span class="token class-name">Animal</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span><span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_3-2多态中的成员访问特点-记忆" tabindex="-1"><a class="header-anchor" href="#_3-2多态中的成员访问特点-记忆" aria-hidden="true">#</a> 3.2多态中的成员访问特点（记忆）</h3>
<ul>
<li>
<p>成员访问特点</p>
<ul>
<li>
<p>成员变量</p>
<p>​	编译看父类，运行看父类</p>
</li>
<li>
<p>成员方法</p>
<p>​	编译看父类，运行看子类</p>
</li>
</ul>
</li>
<li>
<p>代码演示</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Fu</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Fu.. method"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Zi</span> <span class="token keyword">extends</span> <span class="token class-name">Fu</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Zi.. method"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test2Polymorpic</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
         多态的成员访问特点:

                成员变量: 编译看左边 (父类), 运行看左边 (父类)

                成员方法: 编译看左边 (父类), 运行看右边 (子类)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Fu</span> f <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Zi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        f<span class="token punctuation">.</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_3-3多态的好处和弊端-记忆" tabindex="-1"><a class="header-anchor" href="#_3-3多态的好处和弊端-记忆" aria-hidden="true">#</a> 3.3多态的好处和弊端（记忆）</h3>
<ul>
<li>
<p>好处</p>
<p>​	提高程序的扩展性。定义方法时候，使用父类型作为参数，在使用的时候，使用具体的子类型参与操作</p>
</li>
<li>
<p>弊端</p>
<p>​	不能使用子类的特有成员</p>
</li>
</ul>
<h3 id="_3-4多态中的转型-应用" tabindex="-1"><a class="header-anchor" href="#_3-4多态中的转型-应用" aria-hidden="true">#</a> 3.4多态中的转型（应用）</h3>
<ul>
<li>
<p>向上转型</p>
<p>​	父类引用指向子类对象就是向上转型</p>
</li>
<li>
<p>向下转型</p>
<p>​	格式：子类型 对象名 = (子类型)父类引用;</p>
</li>
<li>
<p>代码演示</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Fu</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Fu..show..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Zi</span> <span class="token keyword">extends</span> <span class="token class-name">Fu</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Zi..show..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"我是子类特有的方法, method"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test3Polymorpic</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1. 向上转型 : 父类引用指向子类对象</span>
        <span class="token class-name">Fu</span> f <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Zi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        f<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 多态的弊端: 不能调用子类特有的成员</span>
        <span class="token comment">// f.method();</span>

        <span class="token comment">// A: 直接创建子类对象</span>
        <span class="token comment">// B: 向下转型</span>

        <span class="token comment">// 2. 向下转型 : 从父类类型, 转换回子类类型</span>
        <span class="token class-name">Zi</span> z <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Zi</span><span class="token punctuation">)</span> f<span class="token punctuation">;</span>
        z<span class="token punctuation">.</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_3-5多态中转型存在的风险和解决方案-应用" tabindex="-1"><a class="header-anchor" href="#_3-5多态中转型存在的风险和解决方案-应用" aria-hidden="true">#</a> 3.5多态中转型存在的风险和解决方案 (应用)</h3>
<ul>
<li>
<p>风险</p>
<p>如果被转的引用类型变量,对应的实际类型和目标类型不是同一种类型,那么在转换的时候就会出现ClassCastException</p>
</li>
<li>
<p>解决方案</p>
<ul>
<li>
<p>关键字</p>
<p>instanceof</p>
</li>
<li>
<p>使用格式</p>
<p>变量名 instanceof 类型</p>
<p>通俗的理解：判断关键字左边的变量，是否是右边的类型，返回boolean类型结果</p>
</li>
</ul>
</li>
<li>
<p>代码演示</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"狗吃肉"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">watchHome</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"看家"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Cat</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"猫吃鱼"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test4Polymorpic</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">useAnimal</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">useAnimal</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">useAnimal</span><span class="token punctuation">(</span><span class="token class-name">Animal</span> a<span class="token punctuation">)</span><span class="token punctuation">{</span>  <span class="token comment">// Animal a = new Dog();</span>
                                             <span class="token comment">// Animal a = new Cat();</span>
        a<span class="token punctuation">.</span><span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//a.watchHome();</span>

<span class="token comment">//        Dog dog = (Dog) a;</span>
<span class="token comment">//        dog.watchHome();  // ClassCastException  类型转换异常</span>
      
        <span class="token comment">// 判断a变量记录的类型, 是否是Dog</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>a <span class="token keyword">instanceof</span> <span class="token class-name">Dog</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">Dog</span> dog <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Dog</span><span class="token punctuation">)</span> a<span class="token punctuation">;</span>
            dog<span class="token punctuation">.</span><span class="token function">watchHome</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_3-6黑马信息管理系统多态改进-应用" tabindex="-1"><a class="header-anchor" href="#_3-6黑马信息管理系统多态改进-应用" aria-hidden="true">#</a> 3.6黑马信息管理系统多态改进 (应用)</h3>
<ul>
<li>
<p>实现步骤</p>
<ol>
<li>StudentDaoFactory类中方法的返回值定义成父类类型BaseStudentDao</li>
<li>StudentService中接收方法返回值的类型定义成父类类型BaseStudentDao</li>
</ol>
</li>
<li>
<p>代码实现</p>
<p>StudentDaoFactory类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentDaoFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">BaseStudentDao</span> <span class="token function">getStudentDao</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">OtherStudentDao</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>StudentService类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentService</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建StudentDao (库管)</span>
    <span class="token comment">// private OtherStudentDao studentDao = new OtherStudentDao();</span>

    <span class="token comment">// 通过学生库管工厂类, 获取库管对象</span>
    <span class="token keyword">private</span> <span class="token class-name">BaseStudentDao</span> studentDao <span class="token operator">=</span> <span class="token class-name">StudentDaoFactory</span><span class="token punctuation">.</span><span class="token function">getStudentDao</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_4-内部类" tabindex="-1"><a class="header-anchor" href="#_4-内部类" aria-hidden="true">#</a> 4.内部类</h2>
<h3 id="_4-1-内部类的基本使用-理解" tabindex="-1"><a class="header-anchor" href="#_4-1-内部类的基本使用-理解" aria-hidden="true">#</a> 4.1 内部类的基本使用（理解）</h3>
<ul>
<li>
<p>内部类概念</p>
<ul>
<li>在一个类中定义一个类。举例：在一个类A的内部定义一个类B，类B就被称为内部类</li>
</ul>
</li>
<li>
<p>内部类定义格式</p>
<ul>
<li>
<p>格式&amp;举例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">/*
	格式：
    class 外部类名{
    	修饰符 class 内部类名{
    	
    	}
    }
*/</span>

<span class="token keyword">class</span> <span class="token class-name">Outer</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Inner</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>内部类的访问特点</p>
<ul>
<li>内部类可以直接访问外部类的成员，包括私有</li>
<li>外部类要访问内部类的成员，必须创建对象</li>
</ul>
</li>
<li>
<p>示例代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">/*
    内部类访问特点：
        内部类可以直接访问外部类的成员，包括私有
        外部类要访问内部类的成员，必须创建对象
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Outer</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Inner</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Inner</span> i <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        i<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-2-成员内部类-理解" tabindex="-1"><a class="header-anchor" href="#_2-2-成员内部类-理解" aria-hidden="true">#</a> 2.2 成员内部类（理解）</h3>
<ul>
<li>
<p>成员内部类的定义位置</p>
<ul>
<li>在类中方法，跟成员变量是一个位置</li>
</ul>
</li>
<li>
<p>外界创建成员内部类格式</p>
<ul>
<li>格式：外部类名.内部类名 对象名 = 外部类对象.内部类对象;</li>
<li>举例：Outer.Inner oi = new Outer().new Inner();</li>
</ul>
</li>
<li>
<p>私有成员内部类</p>
<ul>
<li>
<p>将一个类，设计为内部类的目的，大多数都是不想让外界去访问，所以内部类的定义应该私有化，私有化之后，再提供一个可以让外界调用的方法，方法内部创建内部类对象并调用。</p>
</li>
<li>
<p>示例代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Outer</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">Inner</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Inner</span> i <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        i<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">InnerDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">//Outer.Inner oi = new Outer().new Inner();</span>
		<span class="token comment">//oi.show();</span>
        <span class="token class-name">Outer</span> o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Outer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        o<span class="token punctuation">.</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>静态成员内部类</p>
<ul>
<li>
<p>静态成员内部类访问格式：外部类名.内部类名 对象名 = new 外部类名.内部类名();</p>
</li>
<li>
<p>静态成员内部类中的静态方法：外部类名.内部类名.方法名();</p>
</li>
<li>
<p>示例代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Outer</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Inner</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"inner..show"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"inner..method"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test3Innerclass</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
        静态成员内部类演示
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 外部类名.内部类名 对象名 = new 外部类名.内部类名();</span>
        <span class="token class-name">Outer<span class="token punctuation">.</span>Inner</span> oi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Outer<span class="token punctuation">.</span>Inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        oi<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Outer<span class="token punctuation">.</span>Inner</span><span class="token punctuation">.</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h3 id="_2-3-局部内部类-理解" tabindex="-1"><a class="header-anchor" href="#_2-3-局部内部类-理解" aria-hidden="true">#</a> 2.3 局部内部类（理解）</h3>
<ul>
<li>
<p>局部内部类定义位置</p>
<ul>
<li>局部内部类是在方法中定义的类</li>
</ul>
</li>
<li>
<p>局部内部类方式方式</p>
<ul>
<li>局部内部类，外界是无法直接使用，需要在方法内部创建对象并使用</li>
<li>该类可以直接访问外部类的成员，也可以访问方法内的局部变量</li>
</ul>
</li>
<li>
<p>示例代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Outer</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> num2 <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
        <span class="token keyword">class</span> <span class="token class-name">Inner</span> <span class="token punctuation">{</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>num2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Inner</span> i <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        i<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OuterDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Outer</span> o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Outer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        o<span class="token punctuation">.</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-4-匿名内部类-应用" tabindex="-1"><a class="header-anchor" href="#_2-4-匿名内部类-应用" aria-hidden="true">#</a> 2.4 匿名内部类（应用）</h3>
<ul>
<li>
<p>匿名内部类的前提</p>
<ul>
<li>存在一个类或者接口，这里的类可以是具体类也可以是抽象类</li>
</ul>
</li>
<li>
<p>匿名内部类的格式</p>
<ul>
<li>
<p>格式：new 类名 ( ) {  重写方法 }    new  接口名 ( ) { 重写方法 }</p>
</li>
<li>
<p>举例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">Inter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>匿名内部类的本质</p>
<ul>
<li>本质：是一个继承了该类或者实现了该接口的子类匿名对象</li>
</ul>
</li>
<li>
<p>匿名内部类的细节</p>
<ul>
<li>
<p>匿名内部类可以通过多态的形式接受</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Inter</span> i <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Inter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>匿名内部类直接调用方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">Inter</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Test</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">Inter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"我是匿名内部类"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// 直接调用方法</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-4-匿名内部类在开发中的使用-应用" tabindex="-1"><a class="header-anchor" href="#_2-4-匿名内部类在开发中的使用-应用" aria-hidden="true">#</a> 2.4 匿名内部类在开发中的使用（应用）</h3>
<ul>
<li>
<p>匿名内部类在开发中的使用</p>
<ul>
<li>当发现某个方法需要，接口或抽象类的子类对象，我们就可以传递一个匿名内部类过去，来简化传统的代码</li>
</ul>
</li>
<li>
<p>示例代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">/*
    游泳接口
 */</span>
<span class="token keyword">interface</span> <span class="token class-name">Swimming</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">swim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestSwimming</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">goSwimming</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Swimming</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">swim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"铁汁, 我们去游泳吧"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 使用接口的方法
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">goSwimming</span><span class="token punctuation">(</span><span class="token class-name">Swimming</span> swimming<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">/*
            Swimming swim = new Swimming() {
                @Override
                public void swim() {
                    System.out.println("铁汁, 我们去游泳吧");
                }
            }
         */</span>
        swimming<span class="token punctuation">.</span><span class="token function">swim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_5-lambda表达式" tabindex="-1"><a class="header-anchor" href="#_5-lambda表达式" aria-hidden="true">#</a> 5.Lambda表达式</h2>
<h3 id="_5-1体验lambda表达式【理解】" tabindex="-1"><a class="header-anchor" href="#_5-1体验lambda表达式【理解】" aria-hidden="true">#</a> 5.1体验Lambda表达式【理解】</h3>
<ul>
<li>
<p>代码演示</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">/*
    游泳接口
 */</span>
<span class="token keyword">interface</span> <span class="token class-name">Swimming</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">swim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestSwimming</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 通过匿名内部类实现</span>
        <span class="token function">goSwimming</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Swimming</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">swim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"铁汁, 我们去游泳吧"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/*  通过Lambda表达式实现
            理解: 对于Lambda表达式, 对匿名内部类进行了优化
         */</span>
        <span class="token function">goSwimming</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"铁汁, 我们去游泳吧"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 使用接口的方法
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">goSwimming</span><span class="token punctuation">(</span><span class="token class-name">Swimming</span> swimming<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        swimming<span class="token punctuation">.</span><span class="token function">swim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>函数式编程思想概述</p>
<p>在数学中，函数就是有输入量、输出量的一套计算方案，也就是“拿数据做操作”</p>
<p>面向对象思想强调“必须通过对象的形式来做事情”</p>
<p>函数式思想则尽量忽略面向对象的复杂语法：“强调做什么，而不是以什么形式去做”</p>
<p>而我们要学习的Lambda表达式就是函数式思想的体现</p>
</li>
</ul>
<h3 id="_5-2lambda表达式的标准格式【理解】" tabindex="-1"><a class="header-anchor" href="#_5-2lambda表达式的标准格式【理解】" aria-hidden="true">#</a> 5.2Lambda表达式的标准格式【理解】</h3>
<ul>
<li>
<p>格式：</p>
<p>​	(形式参数) -&gt; {代码块}</p>
<ul>
<li>形式参数：如果有多个参数，参数之间用逗号隔开；如果没有参数，留空即可</li>
<li>-&gt;：由英文中画线和大于符号组成，固定写法。代表指向动作</li>
<li>代码块：是我们具体要做的事情，也就是以前我们写的方法体内容</li>
</ul>
</li>
<li>
<p>组成Lambda表达式的三要素：</p>
<ul>
<li>形式参数，箭头，代码块</li>
</ul>
</li>
</ul>
<h3 id="_5-3lambda表达式练习1【应用】" tabindex="-1"><a class="header-anchor" href="#_5-3lambda表达式练习1【应用】" aria-hidden="true">#</a> 5.3Lambda表达式练习1【应用】</h3>
<ul>
<li>
<p>Lambda表达式的使用前提</p>
<ul>
<li>有一个接口</li>
<li>接口中有且仅有一个抽象方法</li>
</ul>
</li>
<li>
<p>练习描述</p>
<p>​	无参无返回值抽象方法的练习</p>
</li>
<li>
<p>操作步骤</p>
<ul>
<li>定义一个接口(Eatable)，里面定义一个抽象方法：void eat();</li>
<li>定义一个测试类(EatableDemo)，在测试类中提供两个方法
<ul>
<li>一个方法是：useEatable(Eatable e)</li>
<li>一个方法是主方法，在主方法中调用useEatable方法</li>
</ul>
</li>
</ul>
</li>
<li>
<p>示例代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//接口</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Eatable</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//实现类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EatableImpl</span> <span class="token keyword">implements</span> <span class="token class-name">Eatable</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"一天一苹果，医生远离我"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//测试类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EatableDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//在主方法中调用useEatable方法</span>
        <span class="token class-name">Eatable</span> e <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EatableImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">useEatable</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//匿名内部类</span>
        <span class="token function">useEatable</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Eatable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"一天一苹果，医生远离我"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//Lambda表达式</span>
        <span class="token function">useEatable</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"一天一苹果，医生远离我"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">useEatable</span><span class="token punctuation">(</span><span class="token class-name">Eatable</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_5-4lambda表达式练习2【应用】" tabindex="-1"><a class="header-anchor" href="#_5-4lambda表达式练习2【应用】" aria-hidden="true">#</a> 5.4Lambda表达式练习2【应用】</h3>
<ul>
<li>
<p>练习描述</p>
<p>有参无返回值抽象方法的练习</p>
</li>
<li>
<p>操作步骤</p>
<ul>
<li>定义一个接口(Flyable)，里面定义一个抽象方法：void fly(String s);</li>
<li>定义一个测试类(FlyableDemo)，在测试类中提供两个方法
<ul>
<li>一个方法是：useFlyable(Flyable f)</li>
<li>一个方法是主方法，在主方法中调用useFlyable方法</li>
</ul>
</li>
</ul>
</li>
<li>
<p>示例代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Flyable</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FlyableDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//在主方法中调用useFlyable方法</span>
        <span class="token comment">//匿名内部类</span>
        <span class="token function">useFlyable</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Flyable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"飞机自驾游"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"--------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//Lambda</span>
        <span class="token function">useFlyable</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"飞机自驾游"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">useFlyable</span><span class="token punctuation">(</span><span class="token class-name">Flyable</span> f<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        f<span class="token punctuation">.</span><span class="token function">fly</span><span class="token punctuation">(</span><span class="token string">"风和日丽，晴空万里"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_5-5lambda表达式练习3【应用】" tabindex="-1"><a class="header-anchor" href="#_5-5lambda表达式练习3【应用】" aria-hidden="true">#</a> 5.5Lambda表达式练习3【应用】</h3>
<ul>
<li>
<p>练习描述</p>
<p>有参有返回值抽象方法的练习</p>
</li>
<li>
<p>操作步骤</p>
<ul>
<li>定义一个接口(Addable)，里面定义一个抽象方法：int add(int x,int y);</li>
<li>定义一个测试类(AddableDemo)，在测试类中提供两个方法
<ul>
<li>一个方法是：useAddable(Addable a)</li>
<li>一个方法是主方法，在主方法中调用useAddable方法</li>
</ul>
</li>
</ul>
</li>
<li>
<p>示例代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Addable</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span><span class="token keyword">int</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AddableDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//在主方法中调用useAddable方法</span>
        <span class="token function">useAddable</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span><span class="token keyword">int</span> y<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">useAddable</span><span class="token punctuation">(</span><span class="token class-name">Addable</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> sum <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_5-6lambda表达式的省略模式【应用】" tabindex="-1"><a class="header-anchor" href="#_5-6lambda表达式的省略模式【应用】" aria-hidden="true">#</a> 5.6Lambda表达式的省略模式【应用】</h3>
<ul>
<li>
<p>省略的规则</p>
<ul>
<li>参数类型可以省略。但是有多个参数的情况下，不能只省略一个</li>
<li>如果参数有且仅有一个，那么小括号可以省略</li>
<li>如果代码块的语句只有一条，可以省略大括号和分号，和return关键字</li>
</ul>
</li>
<li>
<p>代码演示</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Addable</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Flyable</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LambdaDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        useAddable((int x,int y) -> {</span>
<span class="token comment">//            return x + y;</span>
<span class="token comment">//        });</span>
        <span class="token comment">//参数的类型可以省略</span>
        <span class="token function">useAddable</span><span class="token punctuation">(</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        useFlyable((String s) -> {</span>
<span class="token comment">//            System.out.println(s);</span>
<span class="token comment">//        });</span>
        <span class="token comment">//如果参数有且仅有一个，那么小括号可以省略</span>
<span class="token comment">//        useFlyable(s -> {</span>
<span class="token comment">//            System.out.println(s);</span>
<span class="token comment">//        });</span>

        <span class="token comment">//如果代码块的语句只有一条，可以省略大括号和分号</span>
        <span class="token function">useFlyable</span><span class="token punctuation">(</span>s <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//如果代码块的语句只有一条，可以省略大括号和分号，如果有return，return也要省略掉</span>
        <span class="token function">useAddable</span><span class="token punctuation">(</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">-></span> x <span class="token operator">+</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">useFlyable</span><span class="token punctuation">(</span><span class="token class-name">Flyable</span> f<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        f<span class="token punctuation">.</span><span class="token function">fly</span><span class="token punctuation">(</span><span class="token string">"风和日丽，晴空万里"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">useAddable</span><span class="token punctuation">(</span><span class="token class-name">Addable</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> sum <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_5-7lambda表达式的使用前提【理解】" tabindex="-1"><a class="header-anchor" href="#_5-7lambda表达式的使用前提【理解】" aria-hidden="true">#</a> 5.7Lambda表达式的使用前提【理解】</h3>
<ul>
<li>使用Lambda必须要有接口</li>
<li>并且要求接口中有且仅有一个抽象方法</li>
</ul>
<h3 id="_5-8lambda表达式和匿名内部类的区别【理解】" tabindex="-1"><a class="header-anchor" href="#_5-8lambda表达式和匿名内部类的区别【理解】" aria-hidden="true">#</a> 5.8Lambda表达式和匿名内部类的区别【理解】</h3>
<ul>
<li>所需类型不同
<ul>
<li>匿名内部类：可以是接口，也可以是抽象类，还可以是具体类</li>
<li>Lambda表达式：只能是接口</li>
</ul>
</li>
<li>使用限制不同
<ul>
<li>如果接口中有且仅有一个抽象方法，可以使用Lambda表达式，也可以使用匿名内部类</li>
<li>如果接口中多于一个抽象方法，只能使用匿名内部类，而不能使用Lambda表达式</li>
</ul>
</li>
<li>实现原理不同
<ul>
<li>匿名内部类：编译之后，产生一个单独的.class字节码文件</li>
<li>Lambda表达式：编译之后，没有一个单独的.class字节码文件。对应的字节码会在运行的时候动态生成</li>
</ul>
</li>
</ul>
</div></template>


