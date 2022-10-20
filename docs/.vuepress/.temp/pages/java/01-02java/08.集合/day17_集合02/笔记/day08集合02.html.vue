<template><div><h2 id="_1-set集合" tabindex="-1"><a class="header-anchor" href="#_1-set集合" aria-hidden="true">#</a> 1.Set集合</h2>
<h3 id="_1-1set集合概述和特点【应用】" tabindex="-1"><a class="header-anchor" href="#_1-1set集合概述和特点【应用】" aria-hidden="true">#</a> 1.1Set集合概述和特点【应用】</h3>
<ul>
<li>不可以存储重复元素</li>
<li>没有索引,不能使用普通for循环遍历</li>
</ul>
<h3 id="_1-2set集合的使用【应用】" tabindex="-1"><a class="header-anchor" href="#_1-2set集合的使用【应用】" aria-hidden="true">#</a> 1.2Set集合的使用【应用】</h3>
<p>存储字符串并遍历</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MySet1</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      	<span class="token comment">//创建集合对象</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      	<span class="token comment">//添加元素</span>
        set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"ccc"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"aaa"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"aaa"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"bbb"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        for (int i = 0; i &lt; set.size(); i++) {</span>
<span class="token comment">//            //Set集合是没有索引的，所以不能使用通过索引获取元素的方法</span>
<span class="token comment">//        }</span>
      
      	<span class="token comment">//遍历集合</span>
        <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> it <span class="token operator">=</span> set<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">String</span> s <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"-----------------------------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> s <span class="token operator">:</span> set<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-treeset集合" tabindex="-1"><a class="header-anchor" href="#_2-treeset集合" aria-hidden="true">#</a> 2.TreeSet集合</h2>
<h3 id="_2-1treeset集合概述和特点【应用】" tabindex="-1"><a class="header-anchor" href="#_2-1treeset集合概述和特点【应用】" aria-hidden="true">#</a> 2.1TreeSet集合概述和特点【应用】</h3>
<ul>
<li>不可以存储重复元素</li>
<li>没有索引</li>
<li>可以将元素按照规则进行排序
<ul>
<li>TreeSet()：根据其元素的自然排序进行排序</li>
<li>TreeSet(Comparator comparator) ：根据指定的比较器进行排序</li>
</ul>
</li>
</ul>
<h3 id="_2-2treeset集合基本使用【应用】" tabindex="-1"><a class="header-anchor" href="#_2-2treeset集合基本使用【应用】" aria-hidden="true">#</a> 2.2TreeSet集合基本使用【应用】</h3>
<p>存储Integer类型的整数并遍历</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TreeSetDemo01</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建集合对象</span>
        <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> ts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//添加元素</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//遍历集合</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> i <span class="token operator">:</span> ts<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3自然排序comparable的使用【应用】" tabindex="-1"><a class="header-anchor" href="#_2-3自然排序comparable的使用【应用】" aria-hidden="true">#</a> 2.3自然排序Comparable的使用【应用】</h3>
<ul>
<li>
<p>案例需求</p>
<ul>
<li>存储学生对象并遍历，创建TreeSet集合使用无参构造方法</li>
<li>要求：按照年龄从小到大排序，年龄相同时，按照姓名的字母顺序排序</li>
</ul>
</li>
<li>
<p>实现步骤</p>
<ol>
<li>使用空参构造创建TreeSet集合
<ul>
<li>用TreeSet集合存储自定义对象，无参构造方法使用的是自然排序对元素进行排序的</li>
</ul>
</li>
<li>自定义的Student类实现Comparable接口
<ul>
<li>自然排序，就是让元素所属的类实现Comparable接口，重写compareTo(T o)方法</li>
</ul>
</li>
<li>重写接口中的compareTo方法
<ul>
<li>重写方法时，一定要注意排序规则必须按照要求的主要条件和次要条件来写</li>
</ul>
</li>
</ol>
</li>
<li>
<p>代码实现</p>
<p>学生类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token keyword">implements</span> <span class="token class-name">Comparable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Student{"</span> <span class="token operator">+</span>
                <span class="token string">"name='"</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token char">'/'</span>' <span class="token operator">+</span>
                <span class="token string">", age="</span> <span class="token operator">+</span> age <span class="token operator">+</span>
                <span class="token char">'}'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token class-name">Student</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//按照对象的年龄进行排序</span>
        <span class="token comment">//主要判断条件: 按照年龄从小到大排序</span>
        <span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">-</span> o<span class="token punctuation">.</span>age<span class="token punctuation">;</span>
        <span class="token comment">//次要判断条件: 年龄相同时，按照姓名的字母顺序排序</span>
        result <span class="token operator">=</span> result <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> result<span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyTreeSet2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建集合对象</span>
        <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> ts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	    <span class="token comment">//创建学生对象</span>
        <span class="token class-name">Student</span> s1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"zhangsan"</span><span class="token punctuation">,</span><span class="token number">28</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> s2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"lisi"</span><span class="token punctuation">,</span><span class="token number">27</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> s3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"wangwu"</span><span class="token punctuation">,</span><span class="token number">29</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> s4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"zhaoliu"</span><span class="token punctuation">,</span><span class="token number">28</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> s5 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"qianqi"</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//把学生添加到集合</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s4<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s5<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//遍历集合</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Student</span> student <span class="token operator">:</span> ts<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-4比较器排序comparator的使用【应用】" tabindex="-1"><a class="header-anchor" href="#_2-4比较器排序comparator的使用【应用】" aria-hidden="true">#</a> 2.4比较器排序Comparator的使用【应用】</h3>
<ul>
<li>
<p>案例需求</p>
<ul>
<li>存储老师对象并遍历，创建TreeSet集合使用带参构造方法</li>
<li>要求：按照年龄从小到大排序，年龄相同时，按照姓名的字母顺序排序</li>
</ul>
</li>
<li>
<p>实现步骤</p>
<ul>
<li>用TreeSet集合存储自定义对象，带参构造方法使用的是比较器排序对元素进行排序的</li>
<li>比较器排序，就是让集合构造方法接收Comparator的实现类对象，重写compare(T o1,T o2)方法</li>
<li>重写方法时，一定要注意排序规则必须按照要求的主要条件和次要条件来写</li>
</ul>
</li>
<li>
<p>代码实现</p>
<p>老师类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Teacher</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Teacher</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Teacher</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Teacher{"</span> <span class="token operator">+</span>
                <span class="token string">"name='"</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token char">'/'</span>' <span class="token operator">+</span>
                <span class="token string">", age="</span> <span class="token operator">+</span> age <span class="token operator">+</span>
                <span class="token char">'}'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyTreeSet4</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      	<span class="token comment">//创建集合对象</span>
        <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Teacher</span><span class="token punctuation">></span></span> ts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Teacher</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">Teacher</span> o1<span class="token punctuation">,</span> <span class="token class-name">Teacher</span> o2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//o1表示现在要存入的那个元素</span>
                <span class="token comment">//o2表示已经存入到集合中的元素</span>
              
                <span class="token comment">//主要条件</span>
                <span class="token keyword">int</span> result <span class="token operator">=</span> o1<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> o2<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//次要条件</span>
                result <span class="token operator">=</span> result <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> o1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>o2<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> result<span class="token punctuation">;</span>
                <span class="token keyword">return</span> result<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//创建老师对象</span>
        <span class="token class-name">Teacher</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Teacher</span><span class="token punctuation">(</span><span class="token string">"zhangsan"</span><span class="token punctuation">,</span><span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Teacher</span> t2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Teacher</span><span class="token punctuation">(</span><span class="token string">"lisi"</span><span class="token punctuation">,</span><span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Teacher</span> t3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Teacher</span><span class="token punctuation">(</span><span class="token string">"wangwu"</span><span class="token punctuation">,</span><span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Teacher</span> t4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Teacher</span><span class="token punctuation">(</span><span class="token string">"zhaoliu"</span><span class="token punctuation">,</span><span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//把老师添加到集合</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>t1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>t2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>t3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>t4<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//遍历集合</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Teacher</span> teacher <span class="token operator">:</span> ts<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>teacher<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-4两种比较方式总结【理解】" tabindex="-1"><a class="header-anchor" href="#_2-4两种比较方式总结【理解】" aria-hidden="true">#</a> 2.4两种比较方式总结【理解】</h3>
<ul>
<li>两种比较方式小结
<ul>
<li>自然排序: 自定义类实现Comparable接口,重写compareTo方法,根据返回值进行排序</li>
<li>比较器排序: 创建TreeSet对象的时候传递Comparator的实现类对象,重写compare方法,根据返回值进行排序</li>
<li>在使用的时候,默认使用自然排序,当自然排序不满足现在的需求时,必须使用比较器排序</li>
</ul>
</li>
<li>两种方式中关于返回值的规则
<ul>
<li>如果返回值为负数，表示当前存入的元素是较小值，存左边</li>
<li>如果返回值为0，表示当前存入的元素跟集合中元素重复了，不存</li>
<li>如果返回值为正数，表示当前存入的元素是较大值，存右边</li>
</ul>
</li>
</ul>
<h2 id="_3-数据结构" tabindex="-1"><a class="header-anchor" href="#_3-数据结构" aria-hidden="true">#</a> 3.数据结构</h2>
<h3 id="_3-1二叉树【理解】" tabindex="-1"><a class="header-anchor" href="#_3-1二叉树【理解】" aria-hidden="true">#</a> 3.1二叉树【理解】</h3>
<ul>
<li>
<p>二叉树的特点</p>
<ul>
<li>二叉树中,任意一个节点的度要小于等于2
<ul>
<li>节点: 在树结构中,每一个元素称之为节点</li>
<li>度: 每一个节点的子节点数量称之为度</li>
</ul>
</li>
</ul>
</li>
<li>
<p>二叉树结构图</p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/01.png" alt="01_二叉树结构图"></p>
</li>
</ul>
<h3 id="_3-2二叉查找树【理解】" tabindex="-1"><a class="header-anchor" href="#_3-2二叉查找树【理解】" aria-hidden="true">#</a> 3.2二叉查找树【理解】</h3>
<ul>
<li>
<p>二叉查找树的特点</p>
<ul>
<li>二叉查找树,又称二叉排序树或者二叉搜索树</li>
<li>每一个节点上最多有两个子节点</li>
<li>左子树上所有节点的值都小于根节点的值</li>
<li>右子树上所有节点的值都大于根节点的值</li>
</ul>
</li>
<li>
<p>二叉查找树结构图</p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/02.png" alt="02_二叉查找树结构图"></p>
</li>
<li>
<p>二叉查找树和二叉树对比结构图</p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/03.png" alt="03_二叉查找树和二叉树对比结构图"></p>
</li>
<li>
<p>二叉查找树添加节点规则</p>
<ul>
<li>小的存左边</li>
<li>大的存右边</li>
<li>一样的不存</li>
</ul>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/04.png" alt="04_二叉查找树添加节点规则"></p>
</li>
</ul>
<h3 id="_3-3平衡二叉树【理解】" tabindex="-1"><a class="header-anchor" href="#_3-3平衡二叉树【理解】" aria-hidden="true">#</a> 3.3平衡二叉树【理解】</h3>
<ul>
<li>
<p>平衡二叉树的特点</p>
<ul>
<li>二叉树左右两个子树的高度差不超过1</li>
<li>任意节点的左右两个子树都是一颗平衡二叉树</li>
</ul>
</li>
<li>
<p>平衡二叉树旋转</p>
<ul>
<li>
<p>旋转触发时机</p>
<ul>
<li>当添加一个节点之后,该树不再是一颗平衡二叉树</li>
</ul>
</li>
<li>
<p>左旋</p>
<ul>
<li>就是将根节点的右侧往左拉,原先的右子节点变成新的父节点,并把多余的左子节点出让,给已经降级的根节点当右子节点</li>
</ul>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/05_01.png" alt="05_平衡二叉树左旋01"></p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/05_02.png" alt="05_平衡二叉树左旋02"></p>
</li>
<li>
<p>右旋</p>
<ul>
<li>
<p>就是将根节点的左侧往右拉,左子节点变成了新的父节点,并把多余的右子节点出让,给已经降级根节点当左子节点</p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/06_01.png" alt="06_平衡二叉树右旋01"></p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/06_02.png" alt="06_平衡二叉树右旋02"></p>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p>平衡二叉树和二叉查找树对比结构图</p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/07.png" alt="07_平衡二叉树和二叉查找树对比结构图"></p>
</li>
<li>
<p>平衡二叉树旋转的四种情况</p>
<ul>
<li>
<p>左左</p>
<ul>
<li>
<p>左左: 当根节点左子树的左子树有节点插入,导致二叉树不平衡</p>
</li>
<li>
<p>如何旋转: 直接对整体进行右旋即可</p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/08.png" alt="08_平衡二叉树左左"></p>
</li>
</ul>
</li>
<li>
<p>左右</p>
<ul>
<li>
<p>左右: 当根节点左子树的右子树有节点插入,导致二叉树不平衡</p>
</li>
<li>
<p>如何旋转: 先在左子树对应的节点位置进行左旋,在对整体进行右旋</p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/09.png" alt="09_平衡二叉树左右"></p>
</li>
</ul>
</li>
<li>
<p>右右</p>
<ul>
<li>
<p>右右: 当根节点右子树的右子树有节点插入,导致二叉树不平衡</p>
</li>
<li>
<p>如何旋转: 直接对整体进行左旋即可</p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/10.png" alt="10_平衡二叉树右右"></p>
</li>
</ul>
</li>
<li>
<p>右左</p>
<ul>
<li>
<p>右左:当根节点右子树的左子树有节点插入,导致二叉树不平衡</p>
</li>
<li>
<p>如何旋转: 先在右子树对应的节点位置进行右旋,在对整体进行左旋</p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/11.png" alt="11_平衡二叉树右左"></p>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="_3-4红黑树【理解】" tabindex="-1"><a class="header-anchor" href="#_3-4红黑树【理解】" aria-hidden="true">#</a> 3.4红黑树【理解】</h3>
<ul>
<li>
<p>红黑树的特点</p>
<ul>
<li>平衡二叉B树</li>
<li>每一个节点可以是红或者黑</li>
<li>红黑树不是高度平衡的,它的平衡是通过&quot;自己的红黑规则&quot;进行实现的</li>
</ul>
</li>
<li>
<p>红黑树的红黑规则有哪些</p>
<ol>
<li>
<p>每一个节点或是红色的,或者是黑色的</p>
</li>
<li>
<p>根节点必须是黑色</p>
</li>
<li>
<p>如果一个节点没有子节点或者父节点,则该节点相应的指针属性值为Nil,这些Nil视为叶节点,每个叶节点(Nil)是黑色的</p>
<ol>
<li>如果某一个节点是红色,那么它的子节点必须是黑色(不能出现两个红色节点相连 的情况)</li>
</ol>
</li>
<li>
<p>对每一个节点,从该节点到其所有后代叶节点的简单路径上,均包含相同数目的黑色节点</p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/12.png" alt=""></p>
</li>
</ol>
</li>
<li>
<p>红黑树添加节点的默认颜色</p>
<ul>
<li>
<p>添加节点时,默认为红色,效率高</p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/13.png" alt=""></p>
</li>
</ul>
</li>
<li>
<p>红黑树添加节点后如何保持红黑规则</p>
<ul>
<li>根节点位置
<ul>
<li>直接变为黑色</li>
</ul>
</li>
<li>非根节点位置
<ul>
<li>父节点为黑色
<ul>
<li>不需要任何操作,默认红色即可</li>
</ul>
</li>
<li>父节点为红色
<ul>
<li>叔叔节点为红色
<ol>
<li>将&quot;父节点&quot;设为黑色,将&quot;叔叔节点&quot;设为黑色</li>
<li>将&quot;祖父节点&quot;设为红色</li>
<li>如果&quot;祖父节点&quot;为根节点,则将根节点再次变成黑色</li>
</ol>
</li>
<li>叔叔节点为黑色
<ol>
<li>将&quot;父节点&quot;设为黑色</li>
<li>将&quot;祖父节点&quot;设为红色</li>
<li>以&quot;祖父节点&quot;为支点进行旋转</li>
</ol>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="_3-5成绩排序案例【应用】" tabindex="-1"><a class="header-anchor" href="#_3-5成绩排序案例【应用】" aria-hidden="true">#</a> 3.5成绩排序案例【应用】</h3>
<ul>
<li>
<p>案例需求</p>
<ul>
<li>用TreeSet集合存储多个学生信息(姓名,语文成绩,数学成绩,英语成绩),并遍历该集合</li>
<li>要求: 按照总分从高到低出现</li>
</ul>
</li>
<li>
<p>代码实现</p>
<p>学生类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token keyword">implements</span> <span class="token class-name">Comparable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> chinese<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> math<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> english<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> chinese<span class="token punctuation">,</span> <span class="token keyword">int</span> math<span class="token punctuation">,</span> <span class="token keyword">int</span> english<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>chinese <span class="token operator">=</span> chinese<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>math <span class="token operator">=</span> math<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>english <span class="token operator">=</span> english<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getChinese</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> chinese<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setChinese</span><span class="token punctuation">(</span><span class="token keyword">int</span> chinese<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>chinese <span class="token operator">=</span> chinese<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getMath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> math<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setMath</span><span class="token punctuation">(</span><span class="token keyword">int</span> math<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>math <span class="token operator">=</span> math<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getEnglish</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> english<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setEnglish</span><span class="token punctuation">(</span><span class="token keyword">int</span> english<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>english <span class="token operator">=</span> english<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getSum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>chinese <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>math <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>english<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token class-name">Student</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 主要条件: 按照总分进行排序</span>
        <span class="token keyword">int</span> result <span class="token operator">=</span> o<span class="token punctuation">.</span><span class="token function">getSum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getSum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 次要条件: 如果总分一样,就按照语文成绩排序</span>
        result <span class="token operator">=</span> result <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> o<span class="token punctuation">.</span><span class="token function">getChinese</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getChinese</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> result<span class="token punctuation">;</span>
        <span class="token comment">// 如果语文成绩也一样,就按照数学成绩排序</span>
        result <span class="token operator">=</span> result <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> o<span class="token punctuation">.</span><span class="token function">getMath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getMath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> result<span class="token punctuation">;</span>
        <span class="token comment">// 如果总分一样,各科成绩也都一样,就按照姓名排序</span>
        result <span class="token operator">=</span> result <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> o<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> result<span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TreeSetDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建TreeSet集合对象，通过比较器排序进行排序</span>
        <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> ts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//创建学生对象</span>
        <span class="token class-name">Student</span> s1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"jack"</span><span class="token punctuation">,</span> <span class="token number">98</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">95</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> s2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"rose"</span><span class="token punctuation">,</span> <span class="token number">95</span><span class="token punctuation">,</span> <span class="token number">95</span><span class="token punctuation">,</span> <span class="token number">95</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> s3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"sam"</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">93</span><span class="token punctuation">,</span> <span class="token number">98</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//把学生对象添加到集合</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//遍历集合</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Student</span> s <span class="token operator">:</span> ts<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> s<span class="token punctuation">.</span><span class="token function">getChinese</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> s<span class="token punctuation">.</span><span class="token function">getMath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> s<span class="token punctuation">.</span><span class="token function">getEnglish</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> s<span class="token punctuation">.</span><span class="token function">getSum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_4-hashset集合" tabindex="-1"><a class="header-anchor" href="#_4-hashset集合" aria-hidden="true">#</a> 4.HashSet集合</h2>
<h3 id="_4-1hashset集合概述和特点【应用】" tabindex="-1"><a class="header-anchor" href="#_4-1hashset集合概述和特点【应用】" aria-hidden="true">#</a> 4.1HashSet集合概述和特点【应用】</h3>
<ul>
<li>底层数据结构是哈希表</li>
<li>存取无序</li>
<li>不可以存储重复元素</li>
<li>没有索引,不能使用普通for循环遍历</li>
</ul>
<h3 id="_4-2hashset集合的基本应用【应用】" tabindex="-1"><a class="header-anchor" href="#_4-2hashset集合的基本应用【应用】" aria-hidden="true">#</a> 4.2HashSet集合的基本应用【应用】</h3>
<p>存储字符串并遍历</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HashSetDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建集合对象</span>
        <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//添加元素</span>
        set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"world"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"java"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//不包含重复元素的集合</span>
        set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"world"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//遍历</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">String</span> s <span class="token operator">:</span> set<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3哈希值【理解】" tabindex="-1"><a class="header-anchor" href="#_4-3哈希值【理解】" aria-hidden="true">#</a> 4.3哈希值【理解】</h3>
<ul>
<li>
<p>哈希值简介</p>
<p>​	是JDK根据对象的地址或者字符串或者数字算出来的int类型的数值</p>
</li>
<li>
<p>如何获取哈希值</p>
<p>​	Object类中的public int hashCode()：返回对象的哈希码值</p>
</li>
<li>
<p>哈希值的特点</p>
<ul>
<li>同一个对象多次调用hashCode()方法返回的哈希值是相同的</li>
<li>默认情况下，不同对象的哈希值是不同的。而重写hashCode()方法，可以实现让不同对象的哈希值相同</li>
</ul>
</li>
</ul>
<h3 id="_4-4哈希表结构【理解】" tabindex="-1"><a class="header-anchor" href="#_4-4哈希表结构【理解】" aria-hidden="true">#</a> 4.4哈希表结构【理解】</h3>
<ul>
<li>
<p>JDK1.8以前</p>
<p>​	数组 + 链表</p>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/14.png" alt=""></p>
</li>
<li>
<p>JDK1.8以后</p>
<ul>
<li>
<p>节点个数少于等于8个</p>
<p>​	数组 + 链表</p>
</li>
<li>
<p>节点个数多于8个</p>
<p>​	数组 + 红黑树</p>
</li>
</ul>
<p><img src="@source/java/01-02java/08.集合/day17_集合02/笔记/img/15.png" alt="15_JKD8以后哈希表"></p>
</li>
</ul>
<h3 id="_4-5hashset集合存储学生对象并遍历【应用】" tabindex="-1"><a class="header-anchor" href="#_4-5hashset集合存储学生对象并遍历【应用】" aria-hidden="true">#</a> 4.5HashSet集合存储学生对象并遍历【应用】</h3>
<ul>
<li>
<p>案例需求</p>
<ul>
<li>创建一个存储学生对象的集合，存储多个学生对象，使用程序实现在控制台遍历该集合</li>
<li>要求：学生对象的成员变量值相同，我们就认为是同一个对象</li>
</ul>
</li>
<li>
<p>代码实现</p>
<p>学生类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> o<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> o<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

        <span class="token class-name">Student</span> student <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Student</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>age <span class="token operator">!=</span> student<span class="token punctuation">.</span>age<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> name <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>student<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token operator">:</span> student<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> result <span class="token operator">=</span> name <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> name<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
        result <span class="token operator">=</span> <span class="token number">31</span> <span class="token operator">*</span> result <span class="token operator">+</span> age<span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HashSetDemo02</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建HashSet集合对象</span>
        <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span> hs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Student</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建学生对象</span>
        <span class="token class-name">Student</span> s1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"林青霞"</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> s2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"张曼玉"</span><span class="token punctuation">,</span> <span class="token number">35</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> s3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"王祖贤"</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Student</span> s4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"王祖贤"</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//把学生添加到集合</span>
        hs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        hs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        hs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        hs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s4<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//遍历集合(增强for)</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Student</span> s <span class="token operator">:</span> hs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> s<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>总结</p>
<p>​	HashSet集合存储自定义类型元素,要想实现元素的唯一,要求必须重写hashCode方法和equals方法</p>
</li>
</ul>
</div></template>


