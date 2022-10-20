<template><div><h2 id="_1-java概述" tabindex="-1"><a class="header-anchor" href="#_1-java概述" aria-hidden="true">#</a> 1. Java概述</h2>
<h3 id="_1-1-java语言背景介绍-了解" tabindex="-1"><a class="header-anchor" href="#_1-1-java语言背景介绍-了解" aria-hidden="true">#</a> 1.1 Java语言背景介绍（了解）</h3>
<p>语言：人与人交流沟通的表达方式</p>
<p>计算机语言：人与计算机之间进行信息交流沟通的一种特殊语言</p>
<p>Java语言是美国Sun公司（Stanford University Network）在1995年推出的计算机语言</p>
<p>Java之父：詹姆斯·高斯林（James Gosling）</p>
<p>2009年，Sun公司被甲骨文公司收购，所以我们现在访问oracle官网即可：<a href="https://www.oracle.com/" target="_blank" rel="noopener noreferrer">https://www.oracle.com<ExternalLinkIcon/></a></p>
<p>java语言的三个版本：</p>
<p>​	JavaSE:  Java 语言的（标准版），用于桌面应用的开发，是其他两个版本的基础</p>
<p>​	JavaME: Java 语言的（小型版），用于嵌入式消费类电子设备</p>
<p>​	JavaEE: Java 语言的（企业版），用于 Web 方向的网站开发</p>
<h3 id="_1-2-java语言跨平台原理-理解" tabindex="-1"><a class="header-anchor" href="#_1-2-java语言跨平台原理-理解" aria-hidden="true">#</a> 1.2 Java语言跨平台原理（理解）</h3>
<p>Java程序并非是直接运行的，Java编译器将Java源程序编译成与平台无关的字节码文件(class文件)，然后由Java虚拟机（JVM）对字节码文件解释执行。所以在不同的操作系统下，只需安装不同的Java虚拟机即可实现java程序的跨平台。</p>
<h3 id="_1-3-jre和jdk-记忆" tabindex="-1"><a class="header-anchor" href="#_1-3-jre和jdk-记忆" aria-hidden="true">#</a> 1.3 JRE和JDK（记忆）</h3>
<p>JVM（Java Virtual Machine），Java虚拟机</p>
<p>JRE（Java Runtime Environment），Java运行环境，包含了JVM和Java的核心类库（Java API）</p>
<p>JDK（Java Development Kit）称为Java开发工具，包含了JRE和开发工具</p>
<p>总结：我们只需安装JDK即可，它包含了java的运行环境和虚拟机。</p>
<h3 id="_1-4-jdk的下载和安装-应用" tabindex="-1"><a class="header-anchor" href="#_1-4-jdk的下载和安装-应用" aria-hidden="true">#</a> 1.4 JDK的下载和安装（应用）</h3>
<h4 id="_1-4-1-下载" tabindex="-1"><a class="header-anchor" href="#_1-4-1-下载" aria-hidden="true">#</a> 1.4.1 下载</h4>
<p>通过官方网站获取JDK</p>
<p><a href="http://www.oracle.com/" target="_blank" rel="noopener noreferrer">http://www.oracle.com<ExternalLinkIcon/></a></p>
<p><strong>注意</strong>：针对不同的操作系统，需要下载对应版本的JDK。</p>
<h4 id="_1-4-2-安装" tabindex="-1"><a class="header-anchor" href="#_1-4-2-安装" aria-hidden="true">#</a> 1.4.2 安装</h4>
<p>傻瓜式安装，下一步即可。但默认的安装路径是在C:\Program Files下，为方便统一管理建议修改安装路径，将与开发相关的软件都安装到一个目录下，例如：E:\develop。</p>
<p><strong>注意</strong>：安装路径不要包含中文或者空格等特殊字符（使用纯英文目录）。</p>
<h4 id="_1-4-3-jdk的安装目录介绍" tabindex="-1"><a class="header-anchor" href="#_1-4-3-jdk的安装目录介绍" aria-hidden="true">#</a> 1.4.3 JDK的安装目录介绍</h4>
<table>
<thead>
<tr>
<th>目录名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>bin</td>
<td>该路径下存放了JDK的各种工具命令。javac和java就放在这个目录。</td>
</tr>
<tr>
<td>conf</td>
<td>该路径下存放了JDK的相关配置文件。</td>
</tr>
<tr>
<td>include</td>
<td>该路径下存放了一些平台特定的头文件。</td>
</tr>
<tr>
<td>jmods</td>
<td>该路径下存放了JDK的各种模块。</td>
</tr>
<tr>
<td>legal</td>
<td>该路径下存放了JDK各模块的授权文档。</td>
</tr>
<tr>
<td>lib</td>
<td>该路径下存放了JDK工具的一些补充JAR包。</td>
</tr>
</tbody>
</table>
<h2 id="_2-第一个演示程序" tabindex="-1"><a class="header-anchor" href="#_2-第一个演示程序" aria-hidden="true">#</a> 2. 第一个演示程序</h2>
<h3 id="_2-1-常用dos命令-应用" tabindex="-1"><a class="header-anchor" href="#_2-1-常用dos命令-应用" aria-hidden="true">#</a> 2.1 常用DOS命令（应用）</h3>
<p>在接触集成开发环境之前，我们需要使用命令行窗口对java程序进行编译和运行，所以需要知道一些常用DOS命令。</p>
<p>1、打开命令行窗口的方式：win + r打开运行窗口，输入cmd，回车。</p>
<p>2、常用命令及其作用</p>
<table>
<thead>
<tr>
<th>操作</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>盘符名称:</td>
<td>盘符切换。E:回车，表示切换到E盘。</td>
</tr>
<tr>
<td>dir</td>
<td>查看当前路径下的内容。</td>
</tr>
<tr>
<td>cd 目录</td>
<td>进入单级目录。cd itheima</td>
</tr>
<tr>
<td>cd ..</td>
<td>回退到上一级目录。</td>
</tr>
<tr>
<td>cd 目录1\目录2...</td>
<td>进入多级目录。cd itheima\JavaSE</td>
</tr>
<tr>
<td>cd \</td>
<td>回退到盘符目录。</td>
</tr>
<tr>
<td>cls</td>
<td>清屏。</td>
</tr>
<tr>
<td>exit</td>
<td>退出命令提示符窗口。</td>
</tr>
</tbody>
</table>
<h3 id="_2-2-path环境变量的配置-应用" tabindex="-1"><a class="header-anchor" href="#_2-2-path环境变量的配置-应用" aria-hidden="true">#</a> 2.2 Path环境变量的配置（应用）</h3>
<h4 id="_2-2-1-为什么配置环境变量" tabindex="-1"><a class="header-anchor" href="#_2-2-1-为什么配置环境变量" aria-hidden="true">#</a> 2.2.1 为什么配置环境变量</h4>
<p>开发Java程序，需要使用JDK提供的开发工具（比如javac.exe、java.exe等命令），而这些工具在JDK的安装目录的bin目录下，如果不配置环境变量，那么这些命令只可以在该目录下执行。我们不可能把所有的java文件都放到JDK的bin目录下，所以配置环境变量的作用就是可以使bin目录下的java相关命令可以在任意目录下使用。</p>
<h3 id="_2-3-helloworld案例-应用" tabindex="-1"><a class="header-anchor" href="#_2-3-helloworld案例-应用" aria-hidden="true">#</a> 2.3 HelloWorld案例（应用）</h3>
<p>HelloWorld案例是指在计算机屏幕上输出“HelloWorld”这行文字。</p>
<p>各种计算机语言都习惯使用该案例作为第一个演示案例。</p>
<h4 id="_2-3-1-java程序开发运行流程" tabindex="-1"><a class="header-anchor" href="#_2-3-1-java程序开发运行流程" aria-hidden="true">#</a> 2.3.1 Java程序开发运行流程</h4>
<p>开发Java程序，需要三个步骤：编写程序，编译程序，运行程序。</p>
<h4 id="_2-3-2-helloworld案例的编写" tabindex="-1"><a class="header-anchor" href="#_2-3-2-helloworld案例的编写" aria-hidden="true">#</a> 2.3.2 HelloWorld案例的编写</h4>
<p>1、新建文本文档文件，修改名称为HelloWorld.java。</p>
<p>2、用记事本打开HelloWorld.java文件，输写程序内容。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"HelloWorld"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-3-helloworld案例的编译和运行" tabindex="-1"><a class="header-anchor" href="#_2-3-3-helloworld案例的编译和运行" aria-hidden="true">#</a> 2.3.3 HelloWorld案例的编译和运行</h4>
<p>存文件，打开命令行窗口，将目录切换至java文件所在目录，编译java文件生成class文件，运行class文件。</p>
<blockquote>
<p>编译：javac 文件名.java</p>
<p>范例：javac HelloWorld.java</p>
<p>执行：java 类名</p>
<p>范例：java HelloWorld</p>
</blockquote>
<h3 id="_2-4-helloworld案例详解-理解" tabindex="-1"><a class="header-anchor" href="#_2-4-helloworld案例详解-理解" aria-hidden="true">#</a> 2.4 HelloWorld案例详解（理解）</h3>
<p><img src="@source/java/01-02java/Java1/day01_Java/笔记/img/1.jpg" alt=""></p>
<h3 id="_2-5-helloworld案例常见问题-理解" tabindex="-1"><a class="header-anchor" href="#_2-5-helloworld案例常见问题-理解" aria-hidden="true">#</a> 2.5 HelloWorld案例常见问题（理解）</h3>
<h4 id="_2-5-1-bug" tabindex="-1"><a class="header-anchor" href="#_2-5-1-bug" aria-hidden="true">#</a> 2.5.1 BUG</h4>
<p>在电脑系统或程序中，隐藏着的一些未被发现的缺陷或问题统称为bug（漏洞）。</p>
<h4 id="_2-5-2-bug的解决" tabindex="-1"><a class="header-anchor" href="#_2-5-2-bug的解决" aria-hidden="true">#</a> 2.5.2 BUG的解决</h4>
<p>1、具备识别BUG的能力：多看</p>
<p>2、具备分析BUG的能力：多思考，多查资料</p>
<p>3、具备解决BUG的能力：多尝试，多总结</p>
<h4 id="_2-5-3-helloworld案例常见问题" tabindex="-1"><a class="header-anchor" href="#_2-5-3-helloworld案例常见问题" aria-hidden="true">#</a> 2.5.3 HelloWorld案例常见问题</h4>
<p>1、非法字符问题。Java中的符号都是英文格式的。</p>
<p>2、大小写问题。Java语言对大小写敏感（区分大小写）。</p>
<p>3、在系统中显示文件的扩展名，避免出现HelloWorld.java.txt文件。</p>
<p>4、编译命令后的java文件名需要带文件后缀.java</p>
<p>5、运行命令后的class文件名（类名）不带文件后缀</p>
<h3 id="_2-6-notepad-软件的安装和使用-应用" tabindex="-1"><a class="header-anchor" href="#_2-6-notepad-软件的安装和使用-应用" aria-hidden="true">#</a> 2.6 Notepad++软件的安装和使用（应用）</h3>
<h4 id="_2-6-1-什么要使用notepad-软件" tabindex="-1"><a class="header-anchor" href="#_2-6-1-什么要使用notepad-软件" aria-hidden="true">#</a> 2.6.1 什么要使用Notepad++软件</h4>
<p>Notepad++功能比windows中的自带记事本功能强大，除了可以用来制作一般的纯文字说明文件，也十分适合编写计算机程序代码。Notepad++有行号，能够快速定位问题位置，还有语法高亮度显示、代码折叠等功能。而且它是免费的。</p>
<h4 id="_2-6-2-notepad-软件安装" tabindex="-1"><a class="header-anchor" href="#_2-6-2-notepad-软件安装" aria-hidden="true">#</a> 2.6.2 Notepad++软件安装</h4>
<p>安装：傻瓜式安装，一直下一步即可。建议也安装到统一的开发软件目录下，比如E:\develop。</p>
<h4 id="_2-6-3notepad-软件配置" tabindex="-1"><a class="header-anchor" href="#_2-6-3notepad-软件配置" aria-hidden="true">#</a> 2.6.3Notepad++软件配置</h4>
<p>安装完毕之后，为了使用方便，做一个简单的配置：修改默认语言和编码。</p>
<h2 id="_3-java基础语法" tabindex="-1"><a class="header-anchor" href="#_3-java基础语法" aria-hidden="true">#</a> 3. java基础语法</h2>
<h3 id="_3-1-注释-理解" tabindex="-1"><a class="header-anchor" href="#_3-1-注释-理解" aria-hidden="true">#</a> 3.1 注释（理解）</h3>
<p>注释是对代码的解释和说明文字，可以提高程序的可读性，因此在程序中添加必要的注释文字十分重要。Java中的注释分为三种：</p>
<p>单行注释。单行注释的格式是使用//，从//开始至本行结尾的文字将作为注释文字。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 这是单行注释文字</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>多行注释。多行注释的格式是使用/* 和 */将一段较长的注释括起来。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">/*
这是多行注释文字
这是多行注释文字
这是多行注释文字
*/</span>
注意：多行注释不能嵌套使用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文档注释。文档注释以<code v-pre>/**</code>开始，以<code v-pre>*/</code>结束。（以后讲）</p>
<h3 id="_3-2-关键字-理解" tabindex="-1"><a class="header-anchor" href="#_3-2-关键字-理解" aria-hidden="true">#</a> 3.2 关键字（理解）</h3>
<p>关键字是指被java语言赋予了特殊含义的单词。</p>
<p>关键字的特点：</p>
<p>​	关键字的字母全部小写。</p>
<p>​	常用的代码编辑器对关键字都有高亮显示，比如现在我们能看到的public、class、static等。</p>
<h3 id="_3-3-常量-应用" tabindex="-1"><a class="header-anchor" href="#_3-3-常量-应用" aria-hidden="true">#</a> 3.3 常量（应用）</h3>
<p>常量：在程序运行过程中，其值不可以发生改变的量。</p>
<p>Java中的常量分类：</p>
<p>​	字符串常量  用双引号括起来的多个字符（可以包含0个、一个或多个），例如&quot;a&quot;、&quot;abc&quot;、&quot;中国&quot;等</p>
<p>​	整数常量  整数，例如：-10、0、88等</p>
<p>​	小数常量  小数，例如：-5.5、1.0、88.88等</p>
<p>​	字符常量  用单引号括起来的一个字符，例如：'a'、'5'、'B'、'中'等</p>
<p>​	布尔常量  布尔值，表示真假，只有两个值true和false</p>
<p>​	空常量  一个特殊的值，空值，值为null</p>
<p>除空常量外，其他常量均可使用输出语句直接输出。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出一个整数</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">5.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出一个小数</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token char">'a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出一个字符</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出boolean值true</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"欢迎来到黑马程序员"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出字符串</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-变量的介绍-理解" tabindex="-1"><a class="header-anchor" href="#_3-4-变量的介绍-理解" aria-hidden="true">#</a> 3.4 变量的介绍(理解)</h3>
<p>变量的定义格式：</p>
<p>​	数据类型 变量名 = 数据值；</p>
<p>​	数据类型：为空间中存储的数据加入类型限制。整数？小数？</p>
<p>​	变量名：自己要为空间起的名字，没有难度</p>
<p>​	数据值： 空间中要存储的数值，没有难度</p>
<h3 id="_3-5-数据类型-应用" tabindex="-1"><a class="header-anchor" href="#_3-5-数据类型-应用" aria-hidden="true">#</a> 3.5 数据类型（应用）</h3>
<h4 id="_3-5-1-计算机存储单元" tabindex="-1"><a class="header-anchor" href="#_3-5-1-计算机存储单元" aria-hidden="true">#</a> 3.5.1 计算机存储单元</h4>
<p>我们知道计算机是可以用来存储数据的，但是无论是内存还是硬盘，计算机存储设备的最小信息单元叫“位（bit）”，我们又称之为“比特位”，通常用小写的字母”b”表示。而计算机中最基本的存储单元叫“字节（byte）”，</p>
<p>通常用大写字母”B”表示，字节是由连续的8个位组成。</p>
<p>除了字节外还有一些常用的存储单位，其换算单位如下：</p>
<p>1B（字节） = 8bit</p>
<p>1KB = 1024B</p>
<p>1MB = 1024KB</p>
<p>1GB = 1024MB</p>
<p>1TB = 1024GB</p>
<h4 id="_3-5-2-java中的数据类型" tabindex="-1"><a class="header-anchor" href="#_3-5-2-java中的数据类型" aria-hidden="true">#</a> 3.5.2 Java中的数据类型</h4>
<p>Java是一个强类型语言，Java中的数据必须明确数据类型。在Java中的数据类型包括基本数据类型和引用数据类型两种。</p>
<p>Java中的基本数据类型：</p>
<table>
<thead>
<tr>
<th style="text-align:left">数据类型</th>
<th>关键字</th>
<th>内存占用</th>
<th style="text-align:left">取值范围</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">整数类型</td>
<td>byte</td>
<td>1</td>
<td style="text-align:left">-128~127</td>
</tr>
<tr>
<td style="text-align:left"></td>
<td>short</td>
<td>2</td>
<td style="text-align:left">-32768~32767</td>
</tr>
<tr>
<td style="text-align:left"></td>
<td>int(默认)</td>
<td>4</td>
<td style="text-align:left">-2的31次方到2的31次方-1</td>
</tr>
<tr>
<td style="text-align:left"></td>
<td>long</td>
<td>8</td>
<td style="text-align:left">-2的63次方到2的63次方-1</td>
</tr>
<tr>
<td style="text-align:left">浮点类型</td>
<td>float</td>
<td>4</td>
<td style="text-align:left">负数：-3.402823E+38到-1.401298E-45                                                             正数：   1.401298E-45到3.402823E+38</td>
</tr>
<tr>
<td style="text-align:left"></td>
<td>double(默认)</td>
<td>8</td>
<td style="text-align:left">负数：-1.797693E+308到-4.9000000E-324                                              正数：4.9000000E-324   到1.797693E+308</td>
</tr>
<tr>
<td style="text-align:left">字符类型</td>
<td>char</td>
<td>2</td>
<td style="text-align:left">0-65535</td>
</tr>
<tr>
<td style="text-align:left">布尔类型</td>
<td>boolean</td>
<td>1</td>
<td style="text-align:left">true，false</td>
</tr>
</tbody>
</table>
<p>说明：</p>
<p>​	e+38表示是乘以10的38次方，同样，e-45表示乘以10的负45次方。</p>
<p>​	在java中整数默认是int类型，浮点数默认是double类型。</p>
<h3 id="_3-6-变量-应用" tabindex="-1"><a class="header-anchor" href="#_3-6-变量-应用" aria-hidden="true">#</a> 3.6 变量（应用）</h3>
<h4 id="_3-6-1-变量的定义" tabindex="-1"><a class="header-anchor" href="#_3-6-1-变量的定义" aria-hidden="true">#</a> 3.6.1 变量的定义</h4>
<p>变量：在程序运行过程中，其值可以发生改变的量。</p>
<p>从本质上讲，变量是内存中的一小块区域，其值可以在一定范围内变化。</p>
<p>变量的定义格式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>数据类型 变量名 <span class="token operator">=</span> 初始化值<span class="token punctuation">;</span> <span class="token comment">// 声明变量并赋值</span>
<span class="token keyword">int</span> age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者(扩展)</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 先声明，后赋值（使用前赋值即可）</span>
数据类型 变量名<span class="token punctuation">;</span>
变量名 <span class="token operator">=</span> 初始化值<span class="token punctuation">;</span>
<span class="token keyword">double</span> money<span class="token punctuation">;</span>
money <span class="token operator">=</span> <span class="token number">55.5</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>money<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还可以(扩展)</p>
<p>在同一行定义多个同一种数据类型的变量，中间使用逗号隔开。但不建议使用这种方式，降低程序的可读性。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span> <span class="token comment">// 定义int类型的变量a和b，中间使用逗号隔开</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> c<span class="token punctuation">,</span>d<span class="token punctuation">;</span> <span class="token comment">// 声明int类型的变量c和d，中间使用逗号隔开</span>
c <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
d <span class="token operator">=</span> <span class="token number">40</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-6-2-变量的修改" tabindex="-1"><a class="header-anchor" href="#_3-6-2-变量的修改" aria-hidden="true">#</a> 3.6.2 变量的修改</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
a <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>  <span class="token comment">//修改变量的值</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量前面不加数据类型时，表示修改已存在的变量的值。</p>
<h3 id="_3-7-变量的注意事项-理解" tabindex="-1"><a class="header-anchor" href="#_3-7-变量的注意事项-理解" aria-hidden="true">#</a> 3.7 变量的注意事项(理解)</h3>
<ol>
<li>在同一对花括号中，变量名不能重复。</li>
<li>变量在使用之前，必须初始化（赋值）。</li>
<li>定义long类型的变量时，需要在整数的后面加L（大小写均可，建议大写）。因为整数默认是int类型，整数太大可能超出int范围。</li>
<li>定义float类型的变量时，需要在小数的后面加F（大小写均可，建议大写）。因为浮点数的默认类型是double， double的取值范围是大于float的，类型不兼容。</li>
</ol>
<h3 id="_3-8-键盘录入-理解" tabindex="-1"><a class="header-anchor" href="#_3-8-键盘录入-理解" aria-hidden="true">#</a> 3.8 键盘录入（理解）</h3>
<p>我们可以通过 Scanner 类来获取用户的输入。使用步骤如下：</p>
<p>1、导包。Scanner 类在java.util包下，所以需要将该类导入。导包的语句需要定义在类的上面。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、创建Scanner对象。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 创建Scanner对象，sc表示变量名，其他均不可变</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、接收数据</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">int</span> i <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 表示将键盘录入的值作为int数返回。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ScannerDemo</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">//创建对象</span>
		<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//接收数据</span>
		<span class="token keyword">int</span> a <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//输出数据</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-9-标识符-理解" tabindex="-1"><a class="header-anchor" href="#_3-9-标识符-理解" aria-hidden="true">#</a> 3.9 标识符（理解）</h3>
<p>标识符是用户编程时使用的名字，用于给类、方法、变量、常量等命名。</p>
<p>Java中标识符的组成规则：</p>
<p>​	由字母、数字、下划线“_”、美元符号“$”组成，第一个字符不能是数字。</p>
<p>​	不能使用java中的关键字作为标识符。</p>
<p>​	标识符对大小写敏感（区分大小写）。</p>
<p>Java中标识符的命名约定：</p>
<p>​	小驼峰式命名：变量名、方法名</p>
<p>​		首字母小写，从第二个单词开始每个单词的首字母大写。</p>
<p>​	大驼峰式命名：类名</p>
<p>​		每个单词的首字母都大写。</p>
<p>​	另外，标识符的命名最好可以做到见名知意</p>
<p>​		例如：username、studentNumber等。</p>
</div></template>


