<template><div><h2 id="_1-git介绍" tabindex="-1"><a class="header-anchor" href="#_1-git介绍" aria-hidden="true">#</a> 1.Git介绍</h2>
<h3 id="_1-1版本控制-理解" tabindex="-1"><a class="header-anchor" href="#_1-1版本控制-理解" aria-hidden="true">#</a> 1.1版本控制(理解)</h3>
<p>无论是代码编写，还是文档编写，我们都会遇到对文档内容反复修改的情况</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/01.png" alt=""></p>
<h3 id="_1-2开发中存在的问题-理解" tabindex="-1"><a class="header-anchor" href="#_1-2开发中存在的问题-理解" aria-hidden="true">#</a> 1.2开发中存在的问题(理解)</h3>
<ul>
<li>程序员小明负责的模块就要完成了，就在即将提交发布之前的一瞬间，电脑突然蓝屏，硬盘光荣下岗！</li>
</ul>
<p>几个月来的努力付之东流</p>
<p>​	<img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/02.png" alt=""></p>
<ul>
<li>
<p>老王需要在项目中加入一个很复杂的功能，一边尝试，一边修改代码，就这样摸索了一个星期。
可是这被改得面目全非的代码已经回不到从前了。</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/03.png" alt=""></p>
</li>
<li>
<p>小明和老王先后从文件服务器上下载了同一个文件</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/04.png" alt=""></p>
</li>
<li>
<p>因项目中Bug过多，导致项目进度拖延，项目经理老徐因此被骂，但不清楚Bug是手下哪一个程序员写的</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/05.png" alt=""></p>
</li>
<li>
<p>开发中要解决的问题</p>
<ul>
<li>代码备份</li>
<li>版本控制</li>
<li>协同工作</li>
<li>责任追溯</li>
</ul>
</li>
</ul>
<h3 id="_1-3svn版本控制-理解" tabindex="-1"><a class="header-anchor" href="#_1-3svn版本控制-理解" aria-hidden="true">#</a> 1.3SVN版本控制(理解)</h3>
<p>SVN是集中式版本控制系统，版本库是集中放在中央服务器的，而开发人员工作的时候，用的都是自己的电脑，
所以首先要从中央服务器下载最新的版本，然后开发，开发完后，需要把自己开发的代码提交到中央服务器。</p>
<ul>
<li>
<p>服务器单点故障</p>
<p>将会导致所有人员无法工作</p>
</li>
<li>
<p>而服务器硬盘损坏</p>
<p>这意味着，你可能失去了该项目的所有历史记录，这是毁灭性的。</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/06.png" alt=""></p>
</li>
</ul>
<h3 id="_1-4git版本控制-理解" tabindex="-1"><a class="header-anchor" href="#_1-4git版本控制-理解" aria-hidden="true">#</a> 1.4Git版本控制(理解)</h3>
<p>Git是在2005年，Linux系统的创建者Linus Torvalds,为了帮助全球的开发者，维护Linux系统内核的开发
而开发了自己的开源分布式版本控制工具,分为两种类型的仓库：本地仓库和远程仓库。</p>
<ul>
<li>
<p>每一个客户端都保存了完整的历史记录</p>
<p>服务器的故障，都可以通过客户端的记录得以恢复。</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/07.png" alt=""></p>
</li>
</ul>
<h2 id="_2-git下载和安装" tabindex="-1"><a class="header-anchor" href="#_2-git下载和安装" aria-hidden="true">#</a> 2.Git下载和安装</h2>
<h3 id="_2-1git的下载-应用" tabindex="-1"><a class="header-anchor" href="#_2-1git的下载-应用" aria-hidden="true">#</a> 2.1Git的下载(应用)</h3>
<p>官网下载地址：https://git-scm.com/downloads</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/08.png" alt=""></p>
<h3 id="_2-2git的安装-应用" tabindex="-1"><a class="header-anchor" href="#_2-2git的安装-应用" aria-hidden="true">#</a> 2.2Git的安装(应用)</h3>
<ol>
<li>
<p>双击安装包，进入安装向导界面</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/09.png" alt=""></p>
</li>
<li>
<p>指定安装目录</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/10.png" alt=""></p>
</li>
<li>
<p>一路next下一步</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/11.png" alt=""></p>
</li>
<li>
<p>等待安装</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/12.png" alt=""></p>
</li>
<li>
<p>安装完成</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/13.png" alt=""></p>
</li>
<li>
<p>安装完成后在电脑桌面（也可以是其他目录）点击右键，如果能够看到如下两个菜单则说明Git安装成功。</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/14.png" alt=""></p>
</li>
<li>
<p>运行Git命令客户端，使用git --version 命令，可以查看git版本</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/15.png" alt=""></p>
</li>
</ol>
<h3 id="_2-3tortoisegit的安装-应用" tabindex="-1"><a class="header-anchor" href="#_2-3tortoisegit的安装-应用" aria-hidden="true">#</a> 2.3TortoiseGit的安装(应用)</h3>
<ol>
<li>
<p>双击安装包，进入安装向导界面</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/16.png" alt=""></p>
</li>
<li>
<p>一路next下一步</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/17.png" alt=""></p>
</li>
<li>
<p>指定安装目录
<img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/18.png" alt=""></p>
</li>
<li>
<p>安装</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/19.png" alt=""></p>
</li>
<li>
<p>配置</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/20.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/21.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/22.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/23.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/24.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/25.png" alt=""></p>
</li>
<li>
<p>安装TortoiseGit中文语言包,一路next即可</p>
</li>
</ol>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/26.png" alt=""></p>
<ol start="7">
<li>
<p>配置TortoiseGit中文语言</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/27.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/28.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/29.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/30.png" alt=""></p>
</li>
</ol>
<h2 id="_3-git操作入门" tabindex="-1"><a class="header-anchor" href="#_3-git操作入门" aria-hidden="true">#</a> 3.Git操作入门</h2>
<h3 id="_3-1git基本工作流程-理解" tabindex="-1"><a class="header-anchor" href="#_3-1git基本工作流程-理解" aria-hidden="true">#</a> 3.1Git基本工作流程(理解)</h3>
<p>本地仓库</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/31.png" alt=""></p>
<h3 id="_3-2git命令行操作-应用" tabindex="-1"><a class="header-anchor" href="#_3-2git命令行操作-应用" aria-hidden="true">#</a> 3.2Git命令行操作(应用)</h3>
<ul>
<li>
<p>git常用命令</p>
<table>
<thead>
<tr>
<th>命令</th>
<th>作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>git init</td>
<td>初始化，创建 git 仓库</td>
</tr>
<tr>
<td>git status</td>
<td>查看 git 状态 （文件是否进行了添加、提交操作）</td>
</tr>
<tr>
<td>git add 文件名</td>
<td>添加，将指定文件添加到暂存区</td>
</tr>
<tr>
<td>git commit -m '提交信息'</td>
<td>提交，将暂存区文件提交到历史仓库</td>
</tr>
<tr>
<td>git log</td>
<td>查看日志（ git 提交的历史日志）</td>
</tr>
</tbody>
</table>
</li>
<li>
<p>操作步骤</p>
<ol>
<li>
<p>创建工作目录、初始化本地 git 仓库</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/32.png" alt=""></p>
</li>
<li>
<p>新建一个 test.txt 文件（暂不执行添加操作）</p>
</li>
<li>
<p>使用 status 命令，查看状态</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/33.png" alt=""></p>
</li>
<li>
<p>使用 add 命令添加，并查看状态</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/34.png" alt=""></p>
</li>
<li>
<p>使用 commit 命令，提交到本地历史仓库</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/35.png" alt=""></p>
</li>
<li>
<p>使用 log 命令，查看日志</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/36.png" alt=""></p>
</li>
<li>
<p>修改 test.txt 文件</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/37.png" alt=""></p>
</li>
<li>
<p>添加并提交，查看日志</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/38.png" alt=""></p>
</li>
</ol>
</li>
</ul>
<h3 id="_3-3git图形化工具操作-理解" tabindex="-1"><a class="header-anchor" href="#_3-3git图形化工具操作-理解" aria-hidden="true">#</a> 3.3Git图形化工具操作(理解)</h3>
<ol>
<li>
<p>创建工作目录、初始化本地 git 仓库</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/39.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/40.png" alt=""></p>
</li>
<li>
<p>新建一个 test.txt 文件（暂不执行添加操作）</p>
</li>
<li>
<p>选中文件右键，选择TortoiseGit，之后选择添加</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/41.png" alt=""></p>
</li>
<li>
<p>空白处右键,Git提交,提交到本地历史仓库</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/42.png" alt=""></p>
</li>
<li>
<p>空白处右键,TortoiseGit,显示日志,可以产看日志信息</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/43.png" alt=""></p>
</li>
<li>
<p>修改 test.txt 文件</p>
</li>
<li>
<p>添加并提交，查看日志</p>
</li>
</ol>
<h2 id="_4-git版本管理" tabindex="-1"><a class="header-anchor" href="#_4-git版本管理" aria-hidden="true">#</a> 4.Git版本管理</h2>
<h3 id="_4-1历史版本切换-理解" tabindex="-1"><a class="header-anchor" href="#_4-1历史版本切换-理解" aria-hidden="true">#</a> 4.1历史版本切换(理解)</h3>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/44.png" alt=""></p>
<ul>
<li>
<p>准备动作</p>
<ol>
<li>查看 my_project 的 log 日志
git reflog ：可以查看所有分支的所有操作记录（包括已经被删除的 commit 记录的操作）</li>
<li>增加一次新的修改记录</li>
</ol>
</li>
<li>
<p>需求: 将代码切换到第二次修改的版本</p>
<p>指令：git reset --hard 版本唯一索引值</p>
</li>
</ul>
<h3 id="_4-2分支管理介绍-理解" tabindex="-1"><a class="header-anchor" href="#_4-2分支管理介绍-理解" aria-hidden="true">#</a> 4.2分支管理介绍(理解)</h3>
<ul>
<li>
<p>分支</p>
<ul>
<li>由每次提交的代码，串成的一条时间线</li>
<li>使用分支意味着你可以把你的工作从开发主线上分离开来,以免影响开发主线</li>
</ul>
</li>
<li>
<p>分支的使用场景</p>
<ol>
<li>周期较长的模块开发
假设你准备开发一个新功能，但是需要一个月才能完成
第一周写了20%的代码，突然发现原来已经写好的功能出现了一个严重的Bug
那现在就需要放下手中的新功能，去修复Bug
但这20%的代码不能舍弃，并且也担心丢失，这就需要开启一个新的版本控制。</li>
<li>尝试性的模块开发
业务人员给我们提出了一个需求，经过我们的思考和分析
该需求应该可以使用技术手段进行实现。
但是我们还不敢确定，我们就可以去创建一个分支基于分支进行尝试性开发。</li>
</ol>
</li>
<li>
<p>分支工作流程</p>
<ul>
<li>
<p>Master: 指向提交的代码版本</p>
</li>
<li>
<p>Header: 指向当前所使用的的分支</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/45.png" alt=""></p>
</li>
</ul>
</li>
</ul>
<h3 id="_4-3分支管理操作-应用" tabindex="-1"><a class="header-anchor" href="#_4-3分支管理操作-应用" aria-hidden="true">#</a> 4.3分支管理操作(应用)</h3>
<ul>
<li>
<p>创建和切换</p>
<p>创建命令：git branch 分支名
切换命令：git checkout 分支名</p>
</li>
<li>
<p>新分支添加文件</p>
<p>查看文件命令：ls</p>
<p>总结：不同分支之间的关系是平行的关系，不会相互影响</p>
</li>
<li>
<p>合并分支</p>
<p>合并命令：git merge 分支名</p>
</li>
<li>
<p>删除分支</p>
<p>删除命令：git branch -d 分支名</p>
</li>
<li>
<p>查看分支列表</p>
<p>查看命令：git branch</p>
</li>
</ul>
<h2 id="_5-远程仓库" tabindex="-1"><a class="header-anchor" href="#_5-远程仓库" aria-hidden="true">#</a> 5.远程仓库</h2>
<h3 id="_5-1远程仓库工作流程-理解" tabindex="-1"><a class="header-anchor" href="#_5-1远程仓库工作流程-理解" aria-hidden="true">#</a> 5.1远程仓库工作流程(理解)</h3>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/46.png" alt=""></p>
<h3 id="_5-2远程仓库平台介绍-理解" tabindex="-1"><a class="header-anchor" href="#_5-2远程仓库平台介绍-理解" aria-hidden="true">#</a> 5.2远程仓库平台介绍(理解)</h3>
<ul>
<li>
<p>GitHub</p>
<p>域名：https://github.com
介绍：GitHub是全球最大的开源项目托管平台，俗称大型程序员社区化交友网站</p>
<p>​	    各类好玩有趣的开源项目，只有想不到，没有找不到。</p>
</li>
<li>
<p>码云</p>
<p>域名：https://gitee.com
介绍：码云是全国最大的开源项目托管平台，良心平台，速度快，提供免费私有库</p>
</li>
</ul>
<h3 id="_5-3码云的注册-应用" tabindex="-1"><a class="header-anchor" href="#_5-3码云的注册-应用" aria-hidden="true">#</a> 5.3码云的注册(应用)</h3>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/47.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/48.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/49.png" alt=""></p>
<h3 id="_5-4先有本地项目-远程为空-应用" tabindex="-1"><a class="header-anchor" href="#_5-4先有本地项目-远程为空-应用" aria-hidden="true">#</a> 5.4先有本地项目,远程为空(应用)</h3>
<ul>
<li>
<p>步骤</p>
<ol>
<li>创建本地仓库</li>
<li>创建或修改文件，添加（add）文件到暂存区，提交（commit）到本地仓库</li>
<li>创建远程仓库</li>
<li>推送到远程仓库</li>
</ol>
</li>
<li>
<p>创建远程仓库</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/50.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/51.png" alt=""></p>
</li>
<li>
<p>生成SSH公钥</p>
<ul>
<li>
<p>推送代码之前，需要先配置SSH公钥</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/52.png" alt=""></p>
</li>
<li>
<p>生成SSH公钥步骤</p>
<ol>
<li>
<p>设置Git账户</p>
<ul>
<li>git config user.name（查看git账户）</li>
<li>git config user.email（查看git邮箱）</li>
<li>git config --global user.name “账户名”（设置全局账户名）</li>
<li>git config --global user.email “邮箱”（设置全局邮箱）</li>
<li>cd ~/.ssh（查看是否生成过SSH公钥）</li>
</ul>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/53.png" alt=""></p>
</li>
<li>
<p>生成SSH公钥</p>
<ul>
<li>生成命令: ssh-keygen –t rsa –C “邮箱” ( 注意：这里需要敲3次回车)</li>
</ul>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/54.png" alt=""></p>
<ul>
<li>查看命令: cat ~/.ssh/id-rsa.pub</li>
</ul>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/55.png" alt=""></p>
</li>
<li>
<p>设置账户公钥</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/56.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/57.png" alt=""></p>
</li>
<li>
<p>公钥测试</p>
<ul>
<li>命令: ssh -T git@gitee.com</li>
</ul>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/58.png" alt=""></p>
</li>
</ol>
</li>
</ul>
</li>
<li>
<p>推送到远程仓库</p>
</li>
<li>
<p>步骤</p>
<ol>
<li>为远程仓库的URL（网址），自定义仓库名称</li>
<li>推送</li>
</ol>
</li>
<li>
<p>命令
git remote add 远程名称 远程仓库URL
git push -u 仓库名称 分支名</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/59.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/60.png" alt=""></p>
</li>
</ul>
<h3 id="_5-5先有远程仓库-本地为空-应用" tabindex="-1"><a class="header-anchor" href="#_5-5先有远程仓库-本地为空-应用" aria-hidden="true">#</a> 5.5先有远程仓库,本地为空(应用)</h3>
<ul>
<li>步骤
<ol>
<li>将远程仓库的代码，克隆到本地仓库
克隆命令：git clone 仓库地址</li>
<li>创建新文件，添加并提交到本地仓库</li>
<li>推送至远程仓库</li>
<li>项目拉取更新
拉取命令：git pull 远程仓库名 分支名</li>
</ol>
</li>
</ul>
<h3 id="_5-6代码冲突-应用" tabindex="-1"><a class="header-anchor" href="#_5-6代码冲突-应用" aria-hidden="true">#</a> 5.6代码冲突(应用)</h3>
<ul>
<li>
<p>产生原因:</p>
<p>两个程序员操作同一个文件,其中一个程序员在修改文件后,push到远程仓库,另一个程序员应该先pull将最新的代码更新到本地仓库后,在修改代码,之后push到远程仓库,结果他没有先pull将最新的代码更新到本地仓库,而是直接将自己的代码push到远程仓库,这样就可能会导致代码冲突</p>
</li>
</ul>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/61.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/62.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/63.png" alt=""></p>
<ul>
<li>
<p>如何解决冲突</p>
<p>和‘&gt;&gt;&gt;&gt;&gt;&gt;&gt;’中间的内容,就是冲突部分</p>
<ol>
<li>修改冲突行，保存，即可解决冲突。</li>
<li>重新add冲突文件并commit到本地仓库，重新push到远程</li>
</ol>
</li>
</ul>
<h2 id="_6-idea集成git" tabindex="-1"><a class="header-anchor" href="#_6-idea集成git" aria-hidden="true">#</a> 6.IDEA集成Git</h2>
<h3 id="_6-1idea中配置git-应用" tabindex="-1"><a class="header-anchor" href="#_6-1idea中配置git-应用" aria-hidden="true">#</a> 6.1IDEA中配置Git(应用)</h3>
<ol>
<li>File -&gt; Settings</li>
</ol>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/64.png" alt=""></p>
<ol start="2">
<li>Version Control -&gt; Git -&gt; 指定git.exe存放目录</li>
</ol>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/65.png" alt=""></p>
<ol start="3">
<li>点击Test测试</li>
</ol>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/66.png" alt=""></p>
<h3 id="_6-2创建本地仓库-应用" tabindex="-1"><a class="header-anchor" href="#_6-2创建本地仓库-应用" aria-hidden="true">#</a> 6.2创建本地仓库(应用)</h3>
<ol>
<li>
<p>VCS-&gt;Import into Version Control-&gt;Create Git Repository</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/67.png" alt=""></p>
</li>
<li>
<p>选择工程所在的目录,这样就创建好本地仓库了</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/68.png" alt=""></p>
</li>
<li>
<p>点击git后边的对勾,将当前项目代码提交到本地仓库</p>
<p>注意: 项目中的配置文件不需要提交到本地仓库中,提交时,忽略掉即可</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/69.png" alt=""></p>
</li>
</ol>
<h3 id="_6-3版本切换-应用" tabindex="-1"><a class="header-anchor" href="#_6-3版本切换-应用" aria-hidden="true">#</a> 6.3版本切换(应用)</h3>
<ul>
<li>
<p>方式一: 控制台Version Control-&gt;Log-&gt;Reset Current Branch...-&gt;Reset</p>
<p>这种切换的特点是会抛弃原来的提交记录</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/70.png" alt=""></p>
</li>
<li>
<p>方式二:控制台Version Control-&gt;Log-&gt;Revert Commit-&gt;Merge-&gt;处理代码-&gt;commit</p>
<p>这种切换的特点是会当成一个新的提交记录,之前的提交记录也都保留</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/71.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/72.png" alt=""></p>
<p>​		<img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/73.png" alt=""></p>
</li>
</ul>
<h3 id="_6-4分支管理-应用" tabindex="-1"><a class="header-anchor" href="#_6-4分支管理-应用" aria-hidden="true">#</a> 6.4分支管理(应用)</h3>
<ul>
<li>
<p>创建分支</p>
<p>VCS-&gt;Git-&gt;Branches-&gt;New Branch-&gt;给分支起名字-&gt;ok</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/74.png" alt=""></p>
</li>
<li>
<p>切换分支</p>
<p>idea右下角Git-&gt;选择要切换的分支-&gt;checkout</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/75.png" alt=""></p>
</li>
<li>
<p>合并分支</p>
<p>VCS-&gt;Git-&gt;Merge changes-&gt;选择要合并的分支-&gt;merge</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/76.png" alt=""></p>
<p>处理分支中的代码</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/77.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/78.png" alt=""></p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/79.png" alt=""></p>
</li>
<li>
<p>删除分支</p>
<p>idea右下角-&gt;选中要删除的分支-&gt;Delete</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/80.png" alt=""></p>
</li>
</ul>
<h3 id="_6-5本地仓库推送到远程仓库-应用" tabindex="-1"><a class="header-anchor" href="#_6-5本地仓库推送到远程仓库-应用" aria-hidden="true">#</a> 6.5本地仓库推送到远程仓库(应用)</h3>
<ol>
<li>
<p>VCS-&gt;Git-&gt;Push-&gt;点击master Define remote</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/81.png" alt=""></p>
</li>
<li>
<p>将远程仓库的路径复制过来-&gt;Push</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/82.png" alt=""></p>
</li>
</ol>
<h3 id="_6-6远程仓库克隆到本地仓库-应用" tabindex="-1"><a class="header-anchor" href="#_6-6远程仓库克隆到本地仓库-应用" aria-hidden="true">#</a> 6.6远程仓库克隆到本地仓库(应用)</h3>
<p>File-&gt;Close Project-&gt;Checkout from Version Control-&gt;Git-&gt;指定远程仓库的路径-&gt;指定本地存放的路径-&gt;clone</p>
<p><img src="@source/java/01-02java/5.Git/day10_Git/笔记/img/83.png" alt=""></p>
</div></template>


