<template><div><h2 id="vmware虚拟机问题解决方案" tabindex="-1"><a class="header-anchor" href="#vmware虚拟机问题解决方案" aria-hidden="true">#</a> Vmware虚拟机问题解决方案</h2>
<h3 id="_1-运行虚拟机系统蓝屏" tabindex="-1"><a class="header-anchor" href="#_1-运行虚拟机系统蓝屏" aria-hidden="true">#</a> 1. 运行虚拟机系统蓝屏</h3>
<p>可能的原因有两个:</p>
<p>1). 虚拟机所在磁盘的空间不足 ; -------&gt; 清理磁盘空间 。</p>
<p>2). 操作系统版本高, 需要适配新版本的Vmware ; ------&gt; 卸载Vmware15版本, 安装Vmware16版本 。</p>
<h3 id="_2-卸载vmware步骤" tabindex="-1"><a class="header-anchor" href="#_2-卸载vmware步骤" aria-hidden="true">#</a> 2. 卸载Vmware步骤</h3>
<p><strong>1). 卸载已经安装的VMware</strong></p>
<!-- ![image-20210827084827300](./assets/image-20210827084827300.png)  -->
<p>弹出确认框, 点击&quot;下一步&quot;:</p>
<!-- ![image-20210827084921445](./assets/image-20210827084921445.png)  -->
<p>下一步之后, 选择删除:</p>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210903163538180.png" alt="image-20210903163538180"></p>
<p>选择下一步,继续删除:</p>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210903163617976.png" alt="image-20210903163617976"></p>
<p>点击 &quot;删除&quot; 按钮:</p>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210903163645721.png" alt="image-20210903163645721"></p>
<p>卸载完成:</p>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210903163711228.png" alt="image-20210903163711228"></p>
<p>同时, 进入磁盘目录, 查看VMware 的安装目录, 查看文件夹是否为空:</p>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210903163817128.png" alt="image-20210903163817128"></p>
<p>退出到VMware这层目录, 右键删除&quot;VMware&quot;文件夹，删除完成:</p>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210903163928804.png" alt="image-20210903163928804"></p>
<p><strong>2). 清理注册表</strong></p>
<p>卸载Vmware之后, 一定一定要清理Vmware的注册表信息 ;</p>
<p>A. 按住Windows + R , 在弹出框中输入 &quot;regedit&quot; 调出注册表</p>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210903164103181.png" alt="image-20210903164103181"></p>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210903164158266.png" alt="image-20210903164158266"></p>
<p>B. 打开“HKEY_CURRENT_USER”文件夹，找到“Software”文件夹并打开</p>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210903164444384.png" alt="image-20210903164444384"></p>
<p>C. 找到“VMware.Inc”，右键删除</p>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210903164522610.png" alt="image-20210903164522610"></p>
<p><strong>3). 安装VMware16版本</strong></p>
<p>链接：https://pan.baidu.com/s/1P_W69FDeJphQUO1_X4PIFg
提取码：zdpo</p>
<p>下载16版本的软件, 并安装 ;</p>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210827085059781.png" alt="image-20210827085059781"></p>
<h3 id="_3-运行虚拟机时报错vt-x" tabindex="-1"><a class="header-anchor" href="#_3-运行虚拟机时报错vt-x" aria-hidden="true">#</a> 3. 运行虚拟机时报错VT-x</h3>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210827085202257.png" alt="image-20210827085202257"></p>
<p>这个是由于英特尔的虚拟化技术, 没有开启, 需要进入系统的BIOS界面 , 开启英特尔的虚拟化技术 ; 不同的电脑型号 , 进入BIOS界面的方式不同, 需要百度查询一下自己电脑的型号 , 如何进BIOS ;</p>
<p>windows10系统可以参考: https://blog.csdn.net/biu_code/article/details/107504627</p>
<p><img src="@source/gitredis/Linux课程/讲义/Vmware安装Linux问题/assets/image-20210827085844322.png" alt="image-20210827085844322"></p>
</div></template>


