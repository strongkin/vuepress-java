<template><div><h2 id="_1-collection集合" tabindex="-1"><a class="header-anchor" href="#_1-collection集合" aria-hidden="true">#</a> 1.Collection集合</h2>
<h3 id="_1-1数组和集合的区别【理解】" tabindex="-1"><a class="header-anchor" href="#_1-1数组和集合的区别【理解】" aria-hidden="true">#</a> 1.1数组和集合的区别【理解】</h3>
<ul>
<li>
<p>相同点</p>
<p>都是容器,可以存储多个数据</p>
</li>
<li>
<p>不同点</p>
<ul>
<li>
<p>数组的长度是不可变的,集合的长度是可变的</p>
</li>
<li>
<p>数组可以存基本数据类型和引用数据类型</p>
<p>集合只能存引用数据类型,如果要存基本数据类型,需要存对应的包装类</p>
</li>
</ul>
</li>
</ul>
<h3 id="_1-2集合类体系结构【理解】" tabindex="-1"><a class="header-anchor" href="#_1-2集合类体系结构【理解】" aria-hidden="true">#</a> 1.2集合类体系结构【理解】</h3>
<p><img src="@source/java/01-02java/08.集合/day16_集合01/笔记/img/01.png" alt=""></p>
<h3 id="_1-3collection-集合概述和使用【应用】" tabindex="-1"><a class="header-anchor" href="#_1-3collection-集合概述和使用【应用】" aria-hidden="true">#</a> 1.3Collection 集合概述和使用【应用】</h3>
<ul>
<li>
<p>Collection集合概述</p>
<ul>
<li>是单例集合的顶层接口,它表示一组对象,这些对象也称为Collection的元素</li>
<li>JDK 不提供此接口的任何直接实现.它提供更具体的子接口(如Set和List)实现</li>
</ul>
</li>
<li>
<p>创建Collection集合的对象</p>
<ul>
<li>多态的方式</li>
<li>具体的实现类ArrayList</li>
</ul>
</li>
<li>
<p>Collection集合常用方法</p>
<table>
<thead>
<tr>
<th style="text-align:left">方法名</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">boolean add(E e)</td>
<td style="text-align:left">添加元素</td>
</tr>
<tr>
<td style="text-align:left">boolean remove(Object o)</td>
<td style="text-align:left">从集合中移除指定的元素</td>
</tr>
<tr>
<td style="text-align:left">boolean removeIf(Object o)</td>
<td style="text-align:left">根据条件进行移除</td>
</tr>
<tr>
<td style="text-align:left">void   clear()</td>
<td style="text-align:left">清空集合中的元素</td>
</tr>
<tr>
<td style="text-align:left">boolean contains(Object o)</td>
<td style="text-align:left">判断集合中是否存在指定的元素</td>
</tr>
<tr>
<td style="text-align:left">boolean isEmpty()</td>
<td style="text-align:left">判断集合是否为空</td>
</tr>
<tr>
<td style="text-align:left">int   size()</td>
<td style="text-align:left">集合的长度，也就是集合中元素的个数</td>
</tr>
</tbody>
</table>
</li>
</ul>
<h3 id="_1-4collection集合的遍历【应用】" tabindex="-1"><a class="header-anchor" href="#_1-4collection集合的遍历【应用】" aria-hidden="true">#</a> 1.4Collection集合的遍历【应用】</h3>
<ul>
<li>
<p>迭代器介绍</p>
<ul>
<li>迭代器,集合的专用遍历方式</li>
<li>Iterator&lt;&gt; iterator(): 返回此集合中元素的迭代器,通过集合对象的iterator()方法得到</li>
</ul>
</li>
<li>
<p>Iterator中的常用方法</p>
<p>​	boolean hasNext(): 判断当前位置是否有元素可以被取出
​	E next(): 获取当前位置的元素,将迭代器对象移向下一个索引位置</p>
</li>
<li>
<p>Collection集合的遍历</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IteratorDemo1</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建集合对象</span>
        <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//添加元素</span>
        c<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"world"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"java"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"javaee"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//Iterator&lt;E> iterator()：返回此集合中元素的迭代器，通过集合的iterator()方法得到</span>
        <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> it <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//用while循环改进元素的判断和获取</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> s <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>迭代器中删除的方法</p>
<p>​	void remove(): 删除迭代器对象当前指向的元素</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IteratorDemo2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"b"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"b"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"c"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"d"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> it <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">String</span> s <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">"b"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">//指向谁,那么此时就删除谁.</span>
                it<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_1-5增强for循环【应用】" tabindex="-1"><a class="header-anchor" href="#_1-5增强for循环【应用】" aria-hidden="true">#</a> 1.5增强for循环【应用】</h3>
<ul>
<li>
<p>介绍</p>
<ul>
<li>它是JDK5之后出现的,其内部原理是一个Iterator迭代器</li>
<li>实现Iterable接口的类才可以使用迭代器和增强for</li>
<li>简化数组和Collection集合的遍历</li>
</ul>
</li>
<li>
<p>格式</p>
<p>​	for(集合/数组中元素的数据类型 变量名 :  集合/数组名) {</p>
<p>​		// 已经将当前遍历到的元素封装到变量中了,直接使用变量即可</p>
<p>​	}</p>
</li>
<li>
<p>代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyCollectonDemo1</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> list <span class="token operator">=</span>  <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"b"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"c"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"d"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"e"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"f"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//1,数据类型一定是集合或者数组中元素的类型</span>
        <span class="token comment">//2,str仅仅是一个变量名而已,在循环的过程中,依次表示集合或者数组中的每一个元素</span>
        <span class="token comment">//3,list就是要遍历的集合或者数组</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">String</span> str <span class="token operator">:</span> list<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_2-list集合" tabindex="-1"><a class="header-anchor" href="#_2-list集合" aria-hidden="true">#</a> 2.List集合</h2>
<h3 id="_2-1list集合的概述和特点【记忆】" tabindex="-1"><a class="header-anchor" href="#_2-1list集合的概述和特点【记忆】" aria-hidden="true">#</a> 2.1List集合的概述和特点【记忆】</h3>
<ul>
<li>List集合的概述
<ul>
<li>有序集合,这里的有序指的是存取顺序</li>
<li>用户可以精确控制列表中每个元素的插入位置,用户可以通过整数索引访问元素,并搜索列表中的元素</li>
<li>与Set集合不同,列表通常允许重复的元素</li>
</ul>
</li>
<li>List集合的特点
<ul>
<li>存取有序</li>
<li>可以重复</li>
<li>有索引</li>
</ul>
</li>
</ul>
<h3 id="_2-2list集合的特有方法【应用】" tabindex="-1"><a class="header-anchor" href="#_2-2list集合的特有方法【应用】" aria-hidden="true">#</a> 2.2List集合的特有方法【应用】</h3>
<table>
<thead>
<tr>
<th>方法名</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>void add(int index,E   element)</td>
<td>在此集合中的指定位置插入指定的元素</td>
</tr>
<tr>
<td>E remove(int   index)</td>
<td>删除指定索引处的元素，返回被删除的元素</td>
</tr>
<tr>
<td>E set(int index,E   element)</td>
<td>修改指定索引处的元素，返回被修改的元素</td>
</tr>
<tr>
<td>E get(int   index)</td>
<td>返回指定索引处的元素</td>
</tr>
</tbody>
</table>
<h2 id="_3-数据结构" tabindex="-1"><a class="header-anchor" href="#_3-数据结构" aria-hidden="true">#</a> 3.数据结构</h2>
<h3 id="_3-1数据结构之栈和队列【记忆】" tabindex="-1"><a class="header-anchor" href="#_3-1数据结构之栈和队列【记忆】" aria-hidden="true">#</a> 3.1数据结构之栈和队列【记忆】</h3>
<ul>
<li>
<p>栈结构</p>
<p>​	先进后出</p>
</li>
<li>
<p>队列结构</p>
<p>​	先进先出</p>
</li>
</ul>
<h3 id="_3-2数据结构之数组和链表【记忆】" tabindex="-1"><a class="header-anchor" href="#_3-2数据结构之数组和链表【记忆】" aria-hidden="true">#</a> 3.2数据结构之数组和链表【记忆】</h3>
<ul>
<li>
<p>数组结构</p>
<p>​	查询快、增删慢</p>
</li>
<li>
<p>队列结构</p>
<p>​	查询慢、增删快</p>
</li>
</ul>
<h2 id="_4-list集合的实现类" tabindex="-1"><a class="header-anchor" href="#_4-list集合的实现类" aria-hidden="true">#</a> 4.List集合的实现类</h2>
<h3 id="_4-1list集合子类的特点【记忆】" tabindex="-1"><a class="header-anchor" href="#_4-1list集合子类的特点【记忆】" aria-hidden="true">#</a> 4.1List集合子类的特点【记忆】</h3>
<ul>
<li>
<p>ArrayList集合</p>
<p>​	底层是数组结构实现，查询快、增删慢</p>
</li>
<li>
<p>LinkedList集合</p>
<p>​	底层是链表结构实现，查询慢、增删快</p>
</li>
</ul>
<h3 id="_4-2linkedlist集合的特有功能【应用】" tabindex="-1"><a class="header-anchor" href="#_4-2linkedlist集合的特有功能【应用】" aria-hidden="true">#</a> 4.2LinkedList集合的特有功能【应用】</h3>
<ul>
<li>
<p>特有方法</p>
<table>
<thead>
<tr>
<th>方法名</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>public void addFirst(E e)</td>
<td>在该列表开头插入指定的元素</td>
</tr>
<tr>
<td>public void addLast(E e)</td>
<td>将指定的元素追加到此列表的末尾</td>
</tr>
<tr>
<td>public E getFirst()</td>
<td>返回此列表中的第一个元素</td>
</tr>
<tr>
<td>public   E getLast()</td>
<td>返回此列表中的最后一个元素</td>
</tr>
<tr>
<td>public E removeFirst()</td>
<td>从此列表中删除并返回第一个元素</td>
</tr>
<tr>
<td>public   E removeLast()</td>
<td>从此列表中删除并返回最后一个元素</td>
</tr>
</tbody>
</table>
</li>
</ul>
<h2 id="_5-泛型" tabindex="-1"><a class="header-anchor" href="#_5-泛型" aria-hidden="true">#</a> 5.泛型</h2>
<h3 id="_5-1泛型概述【理解】" tabindex="-1"><a class="header-anchor" href="#_5-1泛型概述【理解】" aria-hidden="true">#</a> 5.1泛型概述【理解】</h3>
<ul>
<li>
<p>泛型的介绍</p>
<p>​	泛型是JDK5中引入的特性，它提供了编译时类型安全检测机制</p>
</li>
<li>
<p>泛型的好处</p>
<ol>
<li>把运行时期的问题提前到了编译期间</li>
<li>避免了强制类型转换</li>
</ol>
</li>
<li>
<p>泛型的定义格式</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>  <span class="token operator">+</span> <span class="token operator">&lt;</span>类型<span class="token operator">></span><span class="token operator">:</span> 指定一种类型的格式<span class="token punctuation">.</span>尖括号里面可以任意书写<span class="token punctuation">,</span>一般只写一个字母<span class="token punctuation">.</span>例如<span class="token operator">:</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span>
  <span class="token operator">+</span> <span class="token operator">&lt;</span>类型<span class="token number">1</span><span class="token punctuation">,</span>类型<span class="token number">2</span>…<span class="token operator">></span><span class="token operator">:</span> 指定多种类型的格式<span class="token punctuation">,</span>多种类型之间用逗号隔开<span class="token punctuation">.</span>例如<span class="token operator">:</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">,</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2泛型类【应用】" tabindex="-1"><a class="header-anchor" href="#_5-2泛型类【应用】" aria-hidden="true">#</a> 5.2泛型类【应用】</h3>
<ul>
<li>
<p>定义格式</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>修饰符 <span class="token keyword">class</span> 类名<span class="token operator">&lt;</span>类型<span class="token operator">></span> <span class="token punctuation">{</span>  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>示例代码</p>
<ul>
<li>
<p>泛型类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">T</span> t<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">getT</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> t<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setT</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>t <span class="token operator">=</span> t<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>测试类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GenericDemo1</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> g1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        g1<span class="token punctuation">.</span><span class="token function">setT</span><span class="token punctuation">(</span><span class="token string">"杨幂"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>g1<span class="token punctuation">.</span><span class="token function">getT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> g2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        g2<span class="token punctuation">.</span><span class="token function">setT</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>g2<span class="token punctuation">.</span><span class="token function">getT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">></span></span> g3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        g3<span class="token punctuation">.</span><span class="token function">setT</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>g3<span class="token punctuation">.</span><span class="token function">getT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h3 id="_5-3泛型方法【应用】" tabindex="-1"><a class="header-anchor" href="#_5-3泛型方法【应用】" aria-hidden="true">#</a> 5.3泛型方法【应用】</h3>
<ul>
<li>
<p>定义格式</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>修饰符 <span class="token operator">&lt;</span>类型<span class="token operator">></span> 返回值类型 方法名<span class="token punctuation">(</span>类型 变量名<span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>示例代码</p>
<ul>
<li>
<p>带有泛型方法的类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Generic</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>测试类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GenericDemo2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	    <span class="token class-name">Generic</span> g <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Generic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        g<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token string">"柳岩"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        g<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        g<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        g<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token number">12.34</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h3 id="_5-4泛型接口【应用】" tabindex="-1"><a class="header-anchor" href="#_5-4泛型接口【应用】" aria-hidden="true">#</a> 5.4泛型接口【应用】</h3>
<ul>
<li>
<p>定义格式</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>修饰符 <span class="token keyword">interface</span> 接口名<span class="token operator">&lt;</span>类型<span class="token operator">></span> <span class="token punctuation">{</span>  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>示例代码</p>
<ul>
<li>
<p>泛型接口</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>泛型接口实现类1</p>
<p>​	定义实现类时,定义和接口相同泛型,创建实现类对象时明确泛型的具体类型</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GenericImpl1</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>泛型接口实现类2</p>
<p>​	定义实现类时,直接明确泛型的具体类型</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GenericImpl2</span> <span class="token keyword">implements</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>
     <span class="token annotation punctuation">@Override</span>
     <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>测试类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GenericDemo3</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">GenericImpl1</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> g1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GenericImpl</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        g1<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token string">"林青霞"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">GenericImpl1</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> g2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GenericImpl</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        g2<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      
        <span class="token class-name">GenericImpl2</span> g3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GenericImpl2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      	g3<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h3 id="_5-5类型通配符" tabindex="-1"><a class="header-anchor" href="#_5-5类型通配符" aria-hidden="true">#</a> 5.5类型通配符</h3>
<ul>
<li>
<p>类型通配符: &lt;?&gt;</p>
<ul>
<li>ArrayList&lt;?&gt;: 表示元素类型未知的ArrayList,它的元素可以匹配任何的类型</li>
<li>但是并不能把元素添加到ArrayList中了,获取出来的也是父类类型</li>
</ul>
</li>
<li>
<p>类型通配符上限: &lt;? extends 类型&gt;</p>
<ul>
<li>ArrayListList &lt;? extends Number&gt;: 它表示的类型是Number或者其子类型</li>
</ul>
</li>
<li>
<p>类型通配符下限: &lt;? super 类型&gt;</p>
<ul>
<li>ArrayListList &lt;? super Number&gt;: 它表示的类型是Number或者其父类型</li>
</ul>
</li>
<li>
<p>泛型通配符的使用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GenericDemo4</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> list1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> list2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Number</span><span class="token punctuation">></span></span> list3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> list4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">method</span><span class="token punctuation">(</span>list1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">method</span><span class="token punctuation">(</span>list2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">method</span><span class="token punctuation">(</span>list3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">method</span><span class="token punctuation">(</span>list4<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">getElement1</span><span class="token punctuation">(</span>list1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">getElement1</span><span class="token punctuation">(</span>list2<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//报错</span>
        <span class="token function">getElement1</span><span class="token punctuation">(</span>list3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">getElement1</span><span class="token punctuation">(</span>list4<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//报错</span>

        <span class="token function">getElement2</span><span class="token punctuation">(</span>list1<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//报错</span>
        <span class="token function">getElement2</span><span class="token punctuation">(</span>list2<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//报错</span>
        <span class="token function">getElement2</span><span class="token punctuation">(</span>list3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">getElement2</span><span class="token punctuation">(</span>list4<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  
    <span class="token comment">// 泛型通配符: 此时的泛型?,可以是任意类型</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> list<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 泛型的上限: 此时的泛型?,必须是Number类型或者Number类型的子类</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">getElement1</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Number</span><span class="token punctuation">></span></span> list<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 泛型的下限: 此时的泛型?,必须是Number类型或者Number类型的父类</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">getElement2</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">Number</span><span class="token punctuation">></span></span> list<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


