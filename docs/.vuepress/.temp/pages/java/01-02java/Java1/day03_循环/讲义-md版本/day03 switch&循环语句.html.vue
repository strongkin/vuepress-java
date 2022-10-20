<template><div><h2 id="_1-switch语句" tabindex="-1"><a class="header-anchor" href="#_1-switch语句" aria-hidden="true">#</a> 1. switch语句</h2>
<h3 id="_1-1-分支语句switch语句" tabindex="-1"><a class="header-anchor" href="#_1-1-分支语句switch语句" aria-hidden="true">#</a> 1.1 分支语句switch语句</h3>
<ul>
<li>
<p>格式</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">switch</span> <span class="token punctuation">(</span>表达式<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
		语句体<span class="token number">1</span><span class="token punctuation">;</span>
		<span class="token keyword">break</span><span class="token punctuation">;</span>
	<span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
		语句体<span class="token number">2</span><span class="token punctuation">;</span>
		<span class="token keyword">break</span><span class="token punctuation">;</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
	<span class="token keyword">default</span><span class="token operator">:</span>
		语句体n<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
		<span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>执行流程：</p>
<ul>
<li>首先计算出表达式的值</li>
<li>其次，和case依次比较，一旦有对应的值，就会执行相应的语句，在执行的过程中，遇到break就会结 束。</li>
<li>最后，如果所有的case都和表达式的值不匹配，就会执行default语句体部分，然后程序结束掉。</li>
</ul>
</li>
</ul>
<h3 id="_1-2-switch案例-减肥计划" tabindex="-1"><a class="header-anchor" href="#_1-2-switch案例-减肥计划" aria-hidden="true">#</a> 1.2 switch案例-减肥计划</h3>
<ul>
<li>需求：键盘录入星期数，显示今天的减肥活动</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>周一：跑步  
周二：游泳  
周三：慢走  
周四：动感单车
周五：拳击  
周六：爬山  
周日：好好吃一顿 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>示例代码：</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 1. 键盘录入星期数据，使用变量接收</span>
		<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">int</span> week <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 2. 多情况判断，采用switch语句实现</span>
		<span class="token keyword">switch</span><span class="token punctuation">(</span>week<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 3. 在不同的case中，输出对应的减肥计划</span>
			<span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"跑步"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"游泳"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"慢走"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"动感单车"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"拳击"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">6</span><span class="token operator">:</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"爬山"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">7</span><span class="token operator">:</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"好好吃一顿"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">default</span><span class="token operator">:</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"您的输入有误"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-switch语句case穿透" tabindex="-1"><a class="header-anchor" href="#_1-3-switch语句case穿透" aria-hidden="true">#</a> 1.3 switch语句case穿透</h3>
<ul>
<li>概述 : 如果switch语句中,case省略了break语句, 就会开始case穿透</li>
<li>需求 : 键盘录入星期数，输出工作日、休息日 (1-5)工作日，(6-7)休息日</li>
<li>示例代码：</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">/*
case穿透是如何产生的?
		
		如果switch语句中,case省略了break语句, 就会开始case穿透.
		
		现象：
			当开始case穿透，后续的case就不会具有匹配效果，内部的语句都会执行
			直到看见break，或者将整体switch语句执行完毕，才会结束。
*/</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入星期数:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">int</span> week <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token keyword">switch</span><span class="token punctuation">(</span>week<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
			<span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
			<span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
			<span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span>
			<span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"工作日"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">case</span> <span class="token number">6</span><span class="token operator">:</span>
			<span class="token keyword">case</span> <span class="token number">7</span><span class="token operator">:</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"休息日"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token keyword">default</span><span class="token operator">:</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"您的输入有误"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>	
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-for循环" tabindex="-1"><a class="header-anchor" href="#_2-for循环" aria-hidden="true">#</a> 2. for循环</h2>
<h3 id="_2-1-循环语句-for循环" tabindex="-1"><a class="header-anchor" href="#_2-1-循环语句-for循环" aria-hidden="true">#</a> 2.1 循环语句-for循环</h3>
<ul>
<li>
<p>循环：</p>
<p>循环语句可以在满足循环条件的情况下，反复执行某一段代码，这段被重复执行的代码被称为循环体语句，当反复 执行这个循环体时，需要在合适的时候把循环判断条件修改为false，从而结束循环，否则循环将一直执行下去，形 成死循环。</p>
</li>
<li>
<p>for循环格式：</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>初始化语句<span class="token punctuation">;</span>条件判断语句<span class="token punctuation">;</span>条件控制语句<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	循环体语句<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>格式解释：</p>
<ul>
<li>初始化语句：  用于表示循环开启时的起始状态，简单说就是循环开始的时候什么样</li>
<li>条件判断语句：用于表示循环反复执行的条件，简单说就是判断循环是否能一直执行下去</li>
<li>循环体语句：  用于表示循环反复执行的内容，简单说就是循环反复执行的事情</li>
<li>条件控制语句：用于表示循环执行中每次变化的内容，简单说就是控制循环是否能执行下去</li>
</ul>
</li>
<li>
<p>执行流程：</p>
<p>①执行初始化语句</p>
<p>②执行条件判断语句，看其结果是true还是false</p>
<p>​             如果是false，循环结束</p>
<p>​             如果是true，继续执行</p>
<p>③执行循环体语句</p>
<p>④执行条件控制语句</p>
<p>⑤回到②继续</p>
</li>
</ul>
<h3 id="_2-2-for循环案例-输出数据1-5和5-1" tabindex="-1"><a class="header-anchor" href="#_2-2-for循环案例-输出数据1-5和5-1" aria-hidden="true">#</a> 2.2 for循环案例-输出数据1-5和5-1</h3>
<ul>
<li>需求：在控制台输出1-5和5-1的数据</li>
<li>示例代码：</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ForTest01</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">//需求：输出数据1-5</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"--------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//需求：输出数据5-1</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">>=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-for循环案例-求1-5数据和" tabindex="-1"><a class="header-anchor" href="#_2-3-for循环案例-求1-5数据和" aria-hidden="true">#</a> 2.3 for循环案例-求1-5数据和</h3>
<ul>
<li>需求：求1-5之间的数据和，并把求和结果在控制台输出</li>
<li>示例代码：</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ForTest02</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">//求和的最终结果必须保存起来，需要定义一个变量，用于保存求和的结果，初始值为0</span>
		<span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token comment">//从1开始到5结束的数据，使用循环结构完成</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">//将反复进行的事情写入循环结构内部</span>
             <span class="token comment">// 此处反复进行的事情是将数据 i 加到用于保存最终求和的变量 sum 中</span>
			sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
			<span class="token comment">/*
				sum += i;	sum = sum + i;
				第一次：sum = sum + i = 0 + 1 = 1;
				第二次：sum = sum + i = 1 + 2 = 3;
				第三次：sum = sum + i = 3 + 3 = 6;
				第四次：sum = sum + i = 6 + 4 = 10;
				第五次：sum = sum + i = 10 + 5 = 15;
			*/</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//当循环执行完毕时，将最终数据打印出来</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1-5之间的数据和是："</span> <span class="token operator">+</span> sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>本题要点：
<ul>
<li>今后遇到的需求中，如果带有求和二字，请立即联想到求和变量</li>
<li>求和变量的定义位置，必须在循环外部，如果在循环内部则计算出的数据将是错误的</li>
</ul>
</li>
</ul>
<h3 id="_2-4-for循环案例-求1-100偶数和" tabindex="-1"><a class="header-anchor" href="#_2-4-for循环案例-求1-100偶数和" aria-hidden="true">#</a> 2.4 for循环案例-求1-100偶数和</h3>
<ul>
<li>需求：求1-100之间的偶数和，并把求和结果在控制台输出 }</li>
<li>示例代码：</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ForTest03</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">//求和的最终结果必须保存起来，需要定义一个变量，用于保存求和的结果，初始值为0</span>
		<span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token comment">//对1-100的数据求和与1-5的数据求和几乎完全一样，仅仅是结束条件不同</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span><span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">//对1-100的偶数求和，需要对求和操作添加限制条件，判断是否是偶数</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span>i<span class="token operator">%</span><span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//当循环执行完毕时，将最终数据打印出来</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1-100之间的偶数和是："</span> <span class="token operator">+</span> sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-for循环案例-水仙花数" tabindex="-1"><a class="header-anchor" href="#_2-5-for循环案例-水仙花数" aria-hidden="true">#</a> 2.5 for循环案例-水仙花数</h3>
<ul>
<li>需求：在控制台输出所有的“水仙花数”</li>
<li>解释：什么是水仙花数？
<ul>
<li>水仙花数，指的是一个三位数，个位、十位、百位的数字立方和等于原数
<ul>
<li>例如<code v-pre>153  3*3*3 + 5*5*5 + 1*1*1 = 153</code></li>
</ul>
</li>
</ul>
</li>
<li>思路：
<ol>
<li>获取所有的三位数，准备进行筛选，最小的三位数为100，最大的三位数为999，使用for循环获取</li>
<li>获取每一个三位数的个位，十位，百位，做if语句判断是否是水仙花数</li>
</ol>
</li>
<li>示例代码</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ForTest04</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">//输出所有的水仙花数必然要使用到循环，遍历所有的三位数，三位数从100开始，到999结束</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">//在计算之前获取三位数中每个位上的值</span>
			<span class="token keyword">int</span> ge <span class="token operator">=</span> i<span class="token operator">%</span><span class="token number">10</span><span class="token punctuation">;</span>
			<span class="token keyword">int</span> shi <span class="token operator">=</span> i<span class="token operator">/</span><span class="token number">10</span><span class="token operator">%</span><span class="token number">10</span><span class="token punctuation">;</span>
			<span class="token keyword">int</span> bai <span class="token operator">=</span> i<span class="token operator">/</span><span class="token number">10</span><span class="token operator">/</span><span class="token number">10</span><span class="token operator">%</span><span class="token number">10</span><span class="token punctuation">;</span>
			
			<span class="token comment">//判定条件是将三位数中的每个数值取出来，计算立方和后与原始数字比较是否相等</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span>ge<span class="token operator">*</span>ge<span class="token operator">*</span>ge <span class="token operator">+</span> shi<span class="token operator">*</span>shi<span class="token operator">*</span>shi <span class="token operator">+</span> bai<span class="token operator">*</span>bai<span class="token operator">*</span>bai <span class="token operator">==</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token comment">//输出满足条件的数字就是水仙花数</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-for循环案例-每行打印2个水仙花数-统计" tabindex="-1"><a class="header-anchor" href="#_2-6-for循环案例-每行打印2个水仙花数-统计" aria-hidden="true">#</a> 2.6 for循环案例-每行打印2个水仙花数(统计)</h3>
<ul>
<li>需求：在控制台输出所有的“水仙花数”，要求每行打印2个</li>
<li>示例代码：</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo6For</span> <span class="token punctuation">{</span>
	<span class="token comment">/*
		需求：在控制台输出所有的“水仙花数”，要求每行打印2个

		System.out.print (打印内容);	打印后不换行
		System.out.println(打印内容);	打印后换行

		分析:
			
			1. 定义变量count，用于保存“打印过”的数量，初始值为0
			2. 在判定和打印水仙花数的过程中，拼接空格, 但不换行，并在打印后让count变量+1，记录打印过的数量
			3. 在每一次count变量+1后，判断是否到达了2的倍数，是的话，换行。

	*/</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 1. 定义变量count，用于保存“打印过”的数量，初始值为0</span>
		<span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">999</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">int</span> ge <span class="token operator">=</span> i <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">;</span>
			<span class="token keyword">int</span> shi <span class="token operator">=</span> i <span class="token operator">/</span> <span class="token number">10</span> <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">;</span>
			<span class="token keyword">int</span> bai <span class="token operator">=</span> i <span class="token operator">/</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token number">10</span> <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">;</span>
			
			<span class="token keyword">if</span><span class="token punctuation">(</span>	<span class="token punctuation">(</span>ge<span class="token operator">*</span>ge<span class="token operator">*</span>ge <span class="token operator">+</span> shi<span class="token operator">*</span>shi<span class="token operator">*</span>shi <span class="token operator">+</span> bai<span class="token operator">*</span>bai<span class="token operator">*</span>bai<span class="token punctuation">)</span> <span class="token operator">==</span> i<span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token comment">//  2. 在判定和打印水仙花数的过程中，拼接空格, 但不换行，并在打印后让count变量+1，记录打印过的数量</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				count<span class="token operator">++</span><span class="token punctuation">;</span>
				<span class="token comment">// 3. 在每一次count变量+1后，判断是否到达了2的倍数，是的话，换行</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span>count <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>本题要点：
<ul>
<li>今后如果需求带有统计xxx，请先想到计数器变量</li>
<li>计数器变量定义的位置，必须在循环外部</li>
</ul>
</li>
</ul>
<h2 id="_3-while循环" tabindex="-1"><a class="header-anchor" href="#_3-while循环" aria-hidden="true">#</a> 3. while循环</h2>
<h3 id="_3-1-循环语句-while循环" tabindex="-1"><a class="header-anchor" href="#_3-1-循环语句-while循环" aria-hidden="true">#</a> 3.1 循环语句-while循环</h3>
<ul>
<li>
<p>while循环完整格式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>初始化语句<span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>条件判断语句<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	循环体语句<span class="token punctuation">;</span>
    条件控制语句<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>while循环执行流程：</p>
<p>①执行初始化语句</p>
<p>②执行条件判断语句，看其结果是true还是false</p>
<p>​             如果是false，循环结束</p>
<p>​             如果是true，继续执行</p>
<p>③执行循环体语句</p>
<p>④执行条件控制语句</p>
<p>⑤回到②继续</p>
</li>
<li>
<p>示例代码：</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WhileDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//需求：在控制台输出5次"HelloWorld"</span>
		<span class="token comment">//for循环实现</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"HelloWorld"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"--------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//while循环实现</span>
		<span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
		<span class="token keyword">while</span><span class="token punctuation">(</span>j<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"HelloWorld"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			j<span class="token operator">++</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-while循环案例-珠穆朗玛峰" tabindex="-1"><a class="header-anchor" href="#_3-2-while循环案例-珠穆朗玛峰" aria-hidden="true">#</a> 3.2 while循环案例-珠穆朗玛峰</h3>
<ul>
<li>需求：世界最高山峰是珠穆朗玛峰(8844.43米=8844430毫米)，假如我有一张足够大的纸，它的厚度是0.1毫米。请问，我折叠多少次，可以折成珠穆朗玛峰的高度?</li>
<li>示例代码：</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WhileTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">//定义一个计数器，初始值为0</span>
		<span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token comment">//定义纸张厚度</span>
		<span class="token keyword">double</span> paper <span class="token operator">=</span> <span class="token number">0.1</span><span class="token punctuation">;</span>
		<span class="token comment">//定义珠穆朗玛峰的高度</span>
		<span class="token keyword">int</span> zf <span class="token operator">=</span> <span class="token number">8844430</span><span class="token punctuation">;</span>
		<span class="token comment">//因为要反复折叠，所以要使用循环，但是不知道折叠多少次，这种情况下更适合使用while循环</span>
		<span class="token comment">//折叠的过程中当纸张厚度大于珠峰就停止了，因此继续执行的要求是纸张厚度小于珠峰高度</span>
		<span class="token keyword">while</span><span class="token punctuation">(</span>paper <span class="token operator">&lt;=</span> zf<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">//循环的执行过程中每次纸张折叠，纸张的厚度要加倍</span>
			paper <span class="token operator">*=</span> <span class="token number">2</span><span class="token punctuation">;</span>
			<span class="token comment">//在循环中执行累加，对应折叠了多少次</span>
			count<span class="token operator">++</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//打印计数器的值</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"需要折叠："</span> <span class="token operator">+</span> count <span class="token operator">+</span> <span class="token string">"次"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-循环细节" tabindex="-1"><a class="header-anchor" href="#_4-循环细节" aria-hidden="true">#</a> 4. 循环细节</h2>
<h3 id="_4-1-循环语句-dowhile循环" tabindex="-1"><a class="header-anchor" href="#_4-1-循环语句-dowhile循环" aria-hidden="true">#</a> 4.1 循环语句-dowhile循环</h3>
<ul>
<li>
<p>完整格式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>初始化语句<span class="token punctuation">;</span>
<span class="token keyword">do</span> <span class="token punctuation">{</span>
	循环体语句<span class="token punctuation">;</span>
	条件控制语句<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token keyword">while</span><span class="token punctuation">(</span>条件判断语句<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>执行流程：</p>
<p>① 执行初始化语句</p>
<p>② 执行循环体语句</p>
<p>③ 执行条件控制语句</p>
<p>④ 执行条件判断语句，看其结果是true还是false</p>
<p>如果是false，循环结束</p>
<p>如果是true，继续执行</p>
<p>⑤ 回到②继续</p>
</li>
<li>
<p>示例代码：</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DoWhileDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//需求：在控制台输出5次"HelloWorld"</span>
		<span class="token comment">//for循环实现</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"HelloWorld"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"--------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//do...while循环实现</span>
		<span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
		<span class="token keyword">do</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"HelloWorld"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			j<span class="token operator">++</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">while</span><span class="token punctuation">(</span>j<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-三种循环的区别" tabindex="-1"><a class="header-anchor" href="#_4-2-三种循环的区别" aria-hidden="true">#</a> 4.2 三种循环的区别</h3>
<ul>
<li>三种循环的区别
<ul>
<li>for循环和while循环先判断条件是否成立，然后决定是否执行循环体（先判断后执行）</li>
<li>do...while循环先执行一次循环体，然后判断条件是否成立，是否继续执行循环体（先执行后判断）</li>
</ul>
</li>
<li>for循环和while的区别
<ul>
<li>条件控制语句所控制的自增变量，因为归属for循环的语法结构中，在for循环结束后，就不能再次被访问到了</li>
<li>条件控制语句所控制的自增变量，对于while循环来说不归属其语法结构中，在while循环结束后，该变量还可以继续使用</li>
</ul>
</li>
<li>死循环（无限循环）的三种格式
<ol>
<li>for(;😉{}</li>
<li>while(true){}</li>
<li>do {} while(true);</li>
</ol>
</li>
</ul>
<h3 id="_4-3-死循环" tabindex="-1"><a class="header-anchor" href="#_4-3-死循环" aria-hidden="true">#</a> 4.3 死循环</h3>
<ul>
<li>
<p>死循环格式</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>for死循环格式 :
for(;;){

}

while死循环格式 :

while(true){

}

do..while死循环格式 :

do{

}while(true);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>死循环案例</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">/*
	问题: 死循环有应用场景吗?
		
				例如: 键盘录入一个1-100之间的整数
				
				顾虑: 键盘录入是用户操作的, 用户就可能会出现一些误操作的现象
		
*/</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
		for(;;){
			System.out.println("我停不下来了~");
		}
		*/</span>

    <span class="token comment">/*
		while(true){
			System.out.println("我停不下来了~");
		}
		*/</span>

    <span class="token keyword">do</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"我停不下来了~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	
    <span class="token punctuation">}</span><span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"看看我能被执行吗?~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// 无法访问的语句</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-跳转控制语句" tabindex="-1"><a class="header-anchor" href="#_4-4-跳转控制语句" aria-hidden="true">#</a> 4.4 跳转控制语句</h3>
<ul>
<li>跳转控制语句（break）
<ul>
<li>跳出循环，结束循环</li>
</ul>
</li>
<li>跳转控制语句（continue）
<ul>
<li>跳过本次循环，继续下次循环</li>
</ul>
</li>
<li>注意： continue只能在循环中进行使用！</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo1Continue</span> <span class="token punctuation">{</span>
	<span class="token comment">/*
		continue : 跳过某次循环体内容的执行
		
		注意：使用是基于条件控制, 在循环内部使用.
		
		需求: 模拟电梯上行的过程 1-24层, 4层不停.
	*/</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">24</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token keyword">continue</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token string">"层到了~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo2Break</span> <span class="token punctuation">{</span>
	<span class="token comment">/*
		break : 终止循环体内容的执行
		注意：使用是基于条件控制的
				break语句只能在循环和switch中进行使用.
				
		需求: 模拟20岁工作到80岁, 60岁退休.
	*/</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">80</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>		<span class="token comment">// 结束整个循环</span>
			<span class="token punctuation">}</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token string">"岁正在上班"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
	<span class="token comment">/*
		需求：程序运行后，用户可多次查询星期对应的减肥计划，直到输入0，程序结束
		
		步骤:
			
			1. 不明确用户操作几次, 使用死循环包裹业务逻辑
			2. 匹配到0的时候，使用break结束循环死循环

	*/</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> main <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
		
		lo<span class="token operator">:</span><span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入您要查看的星期数:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"(如无需继续查看,请输入0退出程序)"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			
			<span class="token comment">// 1. 键盘录入星期数据，使用变量接收</span>
			<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">int</span> week <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 2. 多情况判断，采用switch语句实现</span>
			<span class="token keyword">switch</span><span class="token punctuation">(</span>week<span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token comment">// 3. 在不同的case中，输出对应的减肥计划</span>
				<span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"感谢您的使用"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token keyword">break</span> lo<span class="token punctuation">;</span>
				<span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"跑步"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token keyword">break</span><span class="token punctuation">;</span>
				<span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"游泳"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token keyword">break</span><span class="token punctuation">;</span>
				<span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"慢走"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token keyword">break</span><span class="token punctuation">;</span>
				<span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"动感单车"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token keyword">break</span><span class="token punctuation">;</span>
				<span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"拳击"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token keyword">break</span><span class="token punctuation">;</span>
				<span class="token keyword">case</span> <span class="token number">6</span><span class="token operator">:</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"爬山"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token keyword">break</span><span class="token punctuation">;</span>
				<span class="token keyword">case</span> <span class="token number">7</span><span class="token operator">:</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"好好吃一顿"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token keyword">break</span><span class="token punctuation">;</span>
				<span class="token keyword">default</span><span class="token operator">:</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"您的输入有误"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		
		
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-random" tabindex="-1"><a class="header-anchor" href="#_5-random" aria-hidden="true">#</a> 5. Random</h2>
<h3 id="_5-1-random产生随机数-掌握" tabindex="-1"><a class="header-anchor" href="#_5-1-random产生随机数-掌握" aria-hidden="true">#</a> 5.1 Random产生随机数（掌握）</h3>
<ul>
<li>
<p>概述：</p>
<ul>
<li>Random类似Scanner，也是Java提供好的API，内部提供了产生随机数的功能
<ul>
<li>API后续课程详细讲解，现在可以简单理解为Java已经写好的代码</li>
</ul>
</li>
</ul>
</li>
<li>
<p>使用步骤：</p>
<ol>
<li>
<p>导入包</p>
<p>import java.util.Random;</p>
</li>
<li>
<p>创建对象</p>
<p>Random r = new Random();</p>
</li>
<li>
<p>产生随机数</p>
<p>int num = r.nextInt(10);</p>
<p>解释： 10代表的是一个范围，如果括号写10，产生的随机数就是0-9，括号写20，参数的随机数则是0-19</p>
</li>
</ol>
</li>
<li>
<p>示例代码：</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Random</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo1Random</span> <span class="token punctuation">{</span>
	<span class="token comment">/*
		Random : 产生随机数
		
		1. 导包	: import java.util.Random;
				    导包的动作必须出现在类定义的上面

		2. 创建对象 : Random r = new Random();
					上面这个格式里面，r 是变量名，可以变，其他的都不允许变

		3. 获取随机数 : int number = r.nextInt(10);	//获取数据的范围：[0,10) 包括0,不包括10
					上面这个格式里面，number是变量名，可以变，数字10可以变。其他的都不允许变
		
		需求: 产生随机数1-10之间的
	*/</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 2. 创建对象</span>
		<span class="token class-name">Random</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 3. 获取随机数</span>
			<span class="token keyword">int</span> num <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>		<span class="token comment">// 1-10</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		
		
		
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-random练习-猜数字-应用" tabindex="-1"><a class="header-anchor" href="#_5-3-random练习-猜数字-应用" aria-hidden="true">#</a> 5.3 Random练习-猜数字（应用）</h3>
<ul>
<li>
<p>需求：</p>
<p>程序自动生成一个1-100之间的数字，使用程序实现猜出这个数字是多少？</p>
<p>当猜错的时候根据不同情况给出相应的提示</p>
<p>A. 如果猜的数字比真实数字大，提示你猜的数据大了</p>
<p>B. 如果猜的数字比真实数字小，提示你猜的数据小了</p>
<p>C. 如果猜的数字与真实数字相等，提示恭喜你猜中了</p>
</li>
<li>
<p>示例代码：</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Random</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
	<span class="token comment">/*
		需求：程序自动生成一个1-100之间的数字，使用程序实现猜出这个数字是多少？
			当猜错的时候根据不同情况给出相应的提示
			如果猜的数字比真实数字大，提示你猜的数据大了
			如果猜的数字比真实数字小，提示你猜的数据小了
			如果猜的数字与真实数字相等，提示恭喜你猜中了
		
		1. 准备Random和Scanner对象, 分别用于产生随机数和键盘录入
		2. 使用Random产生一个1-100之间的数, 作为要猜的数
		3. 键盘录入用户猜的的数据
		4. 使用录入的数据(用户猜的数据)和随机数(要猜的数据)进行比较, 并给出提示
		
		5. 以上内容需要多次进行, 但无法预估用户输入几次可以猜测正确, 使用while(true)死循环包裹
		6. 猜对之后, break结束.

	*/</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 1. 准备Random和Scanner对象, 分别用于产生随机数和键盘录入</span>
		<span class="token class-name">Random</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 2. 使用Random产生一个1-100之间的数, 作为要猜的数</span>
		<span class="token keyword">int</span> randomNum <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
		
		<span class="token comment">// 5. 以上内容需要多次进行, 但无法预估用户输入几次可以猜测正确, 使用while(true)死循环包裹</span>
		<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 3. 键盘录入用户猜的的数据</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入您猜的数据:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">int</span> num <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 4. 使用录入的数据(用户猜的数据)和随机数(要猜的数据)进行比较, 并给出提示</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span>num <span class="token operator">></span> randomNum<span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"猜大了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>num <span class="token operator">&lt;</span> randomNum<span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"猜小了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
				<span class="token comment">// 6. 猜对之后, break结束.</span>
				<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"恭喜,猜中了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"感谢您的使用"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


