<template><div><h1 id="瑞吉外卖项目优化-day02" tabindex="-1"><a class="header-anchor" href="#瑞吉外卖项目优化-day02" aria-hidden="true">#</a> 瑞吉外卖项目优化-Day02</h1>
<h2 id="课程内容" tabindex="-1"><a class="header-anchor" href="#课程内容" aria-hidden="true">#</a> 课程内容</h2>
<ul>
<li>MySQL主从复制</li>
<li>读写分离案例</li>
<li>项目实现读写分离</li>
<li>Nginx-概述</li>
<li>Nginx-命令</li>
<li>Nginx-应用</li>
</ul>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<blockquote>
<p>1). 存在的问题</p>
</blockquote>
<p>在前面基础功能实现的过程中，我们后台管理系统及移动端的用户，在进行数据访问时，都是直接操作数据库MySQL的。结构如下图：</p>
<img src="assets/image-20210825100741985.png" alt="image-20210825100741985" style="zoom:80%;" /> 
<p>而在当前，MySQL服务器只有一台，那么就可能会存在如下问题：</p>
<p>1). 读和写所有压力都由一台数据库承担，压力大</p>
<p>2). 数据库服务器磁盘损坏则数据丢失，单点故障</p>
<blockquote>
<p>2). 解决方案</p>
</blockquote>
<p>为了解决上述提到的两个问题，我们可以准备两台MySQL，一台主(Master)服务器，一台从(Slave)服务器，主库的数据变更，需要同步到从库中(主从复制)。而用户在访问我们项目时，如果是写操作(insert、update、delete)，则直接操作主库；如果是读(select)操作，则直接操作从库(在这种读写分离的结构中，从库是可以有多个的)，这种结构我们称为 读写分离 。</p>
<img src="assets/image-20210825101438683.png" alt="image-20210825101438683" style="zoom:80%;" /> 
<p>今天我们就需要实现上述的架构，来解决业务开发中所存在的问题。</p>
<h2 id="_1-mysql主从复制" tabindex="-1"><a class="header-anchor" href="#_1-mysql主从复制" aria-hidden="true">#</a> 1. MySQL主从复制</h2>
<p>MySQL数据库默认是支持主从复制的，不需要借助于其他的技术，我们只需要在数据库中简单的配置即可。接下来，我们就从以下的几个方面，来介绍一下主从复制：</p>
<h3 id="_1-1-介绍" tabindex="-1"><a class="header-anchor" href="#_1-1-介绍" aria-hidden="true">#</a> 1.1 介绍</h3>
<p>MySQL主从复制是一个异步的复制过程，底层是基于Mysql数据库自带的 <strong>二进制日志</strong> 功能。就是一台或多台MySQL数据库（slave，即<strong>从库</strong>）从另一台MySQL数据库（master，即<strong>主库</strong>）进行日志的复制，然后再解析日志并应用到自身，最终实现 <strong>从库</strong> 的数据和 <strong>主库</strong> 的数据保持一致。MySQL主从复制是MySQL数据库自带功能，无需借助第三方工具。</p>
<blockquote>
<p><strong>二进制日志：</strong></p>
<p>​	二进制日志（BINLOG）记录了所有的 DDL（数据定义语言）语句和 DML（数据操纵语言）语句，但是不包括数据查询语句。此日志对于灾难时的数据恢复起着极其重要的作用，MySQL的主从复制， 就是通过该binlog实现的。默认MySQL是未开启该日志的。</p>
</blockquote>
<p><strong>MySQL的主从复制原理如下：</strong></p>
<p><img src="assets/image-20210825110417975.png" alt="image-20210825110417975"></p>
<p><strong>MySQL复制过程分成三步：</strong></p>
<p>1). MySQL master 将数据变更写入二进制日志( binary log)</p>
<p>2). slave将master的binary log拷贝到它的中继日志（relay log）</p>
<p>3). slave重做中继日志中的事件，将数据变更反映它自己的数据</p>
<h3 id="_1-2-搭建" tabindex="-1"><a class="header-anchor" href="#_1-2-搭建" aria-hidden="true">#</a> 1.2 搭建</h3>
<h4 id="_1-2-1-准备工作" tabindex="-1"><a class="header-anchor" href="#_1-2-1-准备工作" aria-hidden="true">#</a> 1.2.1 准备工作</h4>
<p>提前准备两台服务器，并且在服务器中安装MySQL，服务器的信息如下：</p>
<table>
<thead>
<tr>
<th>数据库</th>
<th>IP</th>
<th>数据库版本</th>
</tr>
</thead>
<tbody>
<tr>
<td>Master</td>
<td>192.168.200.200</td>
<td>5.7.25</td>
</tr>
<tr>
<td>Slave</td>
<td>192.168.200.201</td>
<td>5.7.25</td>
</tr>
</tbody>
</table>
<p><strong>并在两台服务器上做如下准备工作:</strong></p>
<p>1). 防火墙开放3306端口号</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>firewall-cmd --zone=public --add-port=3306/tcp --permanent

firewall-cmd --zone=public --list-ports
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="assets/image-20210825124800430.png" alt="image-20210825124800430"></p>
<p>2). 并将两台数据库服务器启动起来：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl start mysqld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>登录MySQL，验证是否正常启动</p>
<p><img src="assets/image-20210825111414157.png" alt="image-20210825111414157"></p>
<h4 id="_1-2-2-主库配置" tabindex="-1"><a class="header-anchor" href="#_1-2-2-主库配置" aria-hidden="true">#</a> 1.2.2 主库配置</h4>
<blockquote>
<p>服务器： 192.168.200.200</p>
</blockquote>
<p><strong>1). 修改Mysql数据库的配置文件/etc/my.cnf</strong></p>
<p>在最下面增加配置:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>log-bin=mysql-bin   #[必须]启用二进制日志
server-id=200       #[必须]服务器唯一ID(唯一即可)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="assets/image-20210825115719668.png" alt="image-20210825115719668"></p>
<p><strong>2). 重启Mysql服务</strong></p>
<p>执行指令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> systemctl restart mysqld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="assets/image-20210825115853116.png" alt="image-20210825115853116"></p>
<p><strong>3). 创建数据同步的用户并授权</strong></p>
<p>登录mysql，并执行如下指令，创建用户并授权：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">GRANT</span> <span class="token keyword">REPLICATION</span> SLAVE <span class="token keyword">ON</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> <span class="token string">'xiaoming'</span><span class="token variable">@'%'</span> identified <span class="token keyword">by</span> <span class="token string">'Root@123456'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>==注：上面SQL的作用是创建一个用户 xiaoming ，密码为 Root@123456 ，并且给xiaoming用户授予REPLICATION SLAVE权限。常用于建立复制时所需要用到的用户权限，也就是slave必须被master授权具有该权限的用户，才能通过该用户复制。==</p>
<blockquote>
<p>MySQL密码复杂程度说明:</p>
<p>​	<img src="assets/image-20210825144818269.png" alt="image-20210825144818269"></p>
<p>​	目前mysql5.7默认密码校验策略等级为 MEDIUM , 该等级要求密码组成为: 数字、小写字母、大写字母 、特殊字符、长度至少8位</p>
</blockquote>
<p><strong>4). 登录Mysql数据库，查看master同步状态</strong></p>
<p>执行下面SQL，记录下结果中<strong>File</strong>和<strong>Position</strong>的值</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>show master status;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="assets/image-20210825120355600.png" alt="image-20210825120355600"></p>
<p>==注：上面SQL的作用是查看Master的状态，执行完此SQL后不要再执行任何操作==</p>
<h4 id="_1-2-3-从库配置" tabindex="-1"><a class="header-anchor" href="#_1-2-3-从库配置" aria-hidden="true">#</a> 1.2.3 从库配置</h4>
<blockquote>
<p>服务器： 192.168.200.201</p>
</blockquote>
<p><strong>1). 修改Mysql数据库的配置文件/etc/my.cnf</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server-id=201 	#[必须]服务器唯一ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="assets/image-20210825125156597.png" alt="image-20210825125156597"></p>
<p><strong>2). 重启Mysql服务</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl restart mysqld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>3). 登录Mysql数据库，设置主库地址及同步位置</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>change master to master_host='192.168.200.200',master_user='xiaoming',master_password='Root@123456',master_log_file='mysql-bin.000001',master_log_pos=154;

start slave;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>参数说明：</p>
<p>​	A. master_host : 主库的IP地址</p>
<p>​	B. master_user : 访问主库进行主从复制的用户名(上面在主库创建的)</p>
<p>​	C. master_password : 访问主库进行主从复制的用户名对应的密码</p>
<p>​	D. master_log_file : 从哪个日志文件开始同步(上述查询master状态中展示的有)</p>
<p>​	E. master_log_pos : 从指定日志文件的哪个位置开始同步(上述查询master状态中展示的有)</p>
</blockquote>
<p><strong>4). 查看从数据库的状态</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>show slave status;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后通过状态信息中的 Slave_IO_running 和 Slave_SQL_running 可以看出主从同步是否就绪，如果这两个参数全为Yes，表示主从同步已经配置完成。</p>
<p><img src="assets/image-20210825142313382.png" alt="image-20210825142313382"></p>
<blockquote>
<p>MySQL命令行技巧：</p>
<p>​	\G : 在MySQL的sql语句后加上\G，表示将查询结果进行按列打印，可以使每个字段打印到单独的行。即将查到的结构旋转90度变成纵向；</p>
</blockquote>
<h3 id="_1-3-测试" tabindex="-1"><a class="header-anchor" href="#_1-3-测试" aria-hidden="true">#</a> 1.3 测试</h3>
<p>主从复制的环境,已经搭建好了,接下来,我们可以通过Navicat连接上两台MySQL服务器,进行测试。测试时，我们只需要在主库Master执行操作，查看从库Slave中是否将数据同步过去即可。</p>
<p>1). 在master中创建数据库itcast, 刷新slave查看是否可以同步过去</p>
<p><img src="assets/image-20210825143518383.png" alt="image-20210825143518383"></p>
<p>2). 在master的itcast数据下创建user表, 刷新slave查看是否可以同步过去</p>
<p><img src="assets/image-20210825143549689.png" alt="image-20210825143549689"></p>
<p>3). 在master的user表中插入一条数据, 刷新slave查看是否可以同步过去</p>
<p><img src="assets/image-20210825143658516.png" alt="image-20210825143658516"></p>
<h2 id="_2-读写分离案例" tabindex="-1"><a class="header-anchor" href="#_2-读写分离案例" aria-hidden="true">#</a> 2. 读写分离案例</h2>
<h3 id="_2-1-背景介绍" tabindex="-1"><a class="header-anchor" href="#_2-1-背景介绍" aria-hidden="true">#</a> 2.1 背景介绍</h3>
<p>面对日益增加的系统访问量，数据库的吞吐量面临着巨大瓶颈。 对于同一时刻有大量并发读操作和较少写操作类型的应用系统来说，将数据库拆分为<strong>主库</strong>和<strong>从库</strong>，主库负责处理事务性的增删改操作，从库负责处理查询操作，能够有效的避免由数据更新导致的行锁，使得整个系统的查询性能得到极大的改善。</p>
<p><img src="assets/image-20210825145647274.png" alt="image-20210825145647274"></p>
<p>通过读写分离,就可以降低单台数据库的访问压力, 提高访问效率，也可以避免单机故障。</p>
<p>主从复制的结构，我们在第一节已经完成了，那么我们在项目中，如何通过java代码来完成读写分离呢，如何在执行select的时候查询从库，而在执行insert、update、delete的时候，操作主库呢？这个时候，我们就需要介绍一个新的技术 ShardingJDBC。</p>
<h3 id="_2-2-shardingjdbc介绍" tabindex="-1"><a class="header-anchor" href="#_2-2-shardingjdbc介绍" aria-hidden="true">#</a> 2.2 ShardingJDBC介绍</h3>
<p>Sharding-JDBC定位为轻量级Java框架，在Java的JDBC层提供的额外服务。 它使用客户端直连数据库，以jar包形式提供服务，无需额外部署和依赖，可理解为增强版的JDBC驱动，完全兼容JDBC和各种ORM框架。</p>
<p>使用Sharding-JDBC可以在程序中轻松的实现数据库读写分离。</p>
<p>Sharding-JDBC具有以下几个特点：</p>
<p>1). 适用于任何基于JDBC的ORM框架，如：JPA, Hibernate, Mybatis, Spring JDBC Template或直接使用JDBC。</p>
<p>2). 支持任何第三方的数据库连接池，如：DBCP, C3P0, BoneCP, Druid, HikariCP等。</p>
<p>3). 支持任意实现JDBC规范的数据库。目前支持MySQL，Oracle，SQLServer，PostgreSQL以及任何遵循SQL92标准的数据库。</p>
<p>依赖:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.shardingsphere<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sharding-jdbc-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.0.0-RC1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-数据库环境" tabindex="-1"><a class="header-anchor" href="#_2-3-数据库环境" aria-hidden="true">#</a> 2.3 数据库环境</h3>
<p>在主库中创建一个数据库rw, 并且创建一张表， 该数据库及表结构创建完毕后会自动同步至从数据库，SQL语句如下：</p>
<div class="language-SQL ext-SQL line-numbers-mode"><pre v-pre class="language-SQL"><code>create database rw default charset utf8mb4;

use rw;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="assets/image-20210825160658477.png" alt="image-20210825160658477"></p>
<h3 id="_2-4-初始工程导入" tabindex="-1"><a class="header-anchor" href="#_2-4-初始工程导入" aria-hidden="true">#</a> 2.4 初始工程导入</h3>
<p>我们本案例主要是演示一下读写分离操作，对于基本的增删改查的业务操作，我们就不再去编写了，我们可以直接导入资料中提供的demo工程（rw_demo），在demo工程中，我们已经完成了user的增删改查操作，具体的工程结构如下：</p>
<p><img src="assets/image-20210825161155163.png" alt="image-20210825161155163"></p>
<h3 id="_2-5-读写分离配置" tabindex="-1"><a class="header-anchor" href="#_2-5-读写分离配置" aria-hidden="true">#</a> 2.5 读写分离配置</h3>
<p>1). 在pom.xml中增加shardingJdbc的maven坐标</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.shardingsphere<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sharding-jdbc-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.0.0-RC1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2). 在application.yml中增加数据源的配置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">shardingsphere</span><span class="token punctuation">:</span>
    <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
      <span class="token key atrule">names</span><span class="token punctuation">:</span>
        master<span class="token punctuation">,</span>slave
      <span class="token comment"># 主数据源</span>
      <span class="token key atrule">master</span><span class="token punctuation">:</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
        <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
        <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//192.168.200.200<span class="token punctuation">:</span>3306/rw<span class="token punctuation">?</span>characterEncoding=utf<span class="token punctuation">-</span><span class="token number">8</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> root
        <span class="token key atrule">password</span><span class="token punctuation">:</span> root
      <span class="token comment"># 从数据源</span>
      <span class="token key atrule">slave</span><span class="token punctuation">:</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
        <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
        <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//192.168.200.201<span class="token punctuation">:</span>3306/rw<span class="token punctuation">?</span>characterEncoding=utf<span class="token punctuation">-</span><span class="token number">8</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> root
        <span class="token key atrule">password</span><span class="token punctuation">:</span> root
    <span class="token key atrule">masterslave</span><span class="token punctuation">:</span>
      <span class="token comment"># 读写分离配置</span>
      <span class="token key atrule">load-balance-algorithm-type</span><span class="token punctuation">:</span> round_robin <span class="token comment">#轮询</span>
      <span class="token comment"># 最终的数据源名称</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> dataSource
      <span class="token comment"># 主库数据源名称</span>
      <span class="token key atrule">master-data-source-name</span><span class="token punctuation">:</span> master
      <span class="token comment"># 从库数据源名称列表，多个逗号分隔</span>
      <span class="token key atrule">slave-data-source-names</span><span class="token punctuation">:</span> slave
    <span class="token key atrule">props</span><span class="token punctuation">:</span>
      <span class="token key atrule">sql</span><span class="token punctuation">:</span>
        <span class="token key atrule">show</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment">#开启SQL显示，默认false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置解析:</p>
<p><img src="assets/image-20210825162910711.png" alt="image-20210825162910711"></p>
<p>3). 在application.yml中增加配置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>  
  <span class="token key atrule">main</span><span class="token punctuation">:</span>
    <span class="token key atrule">allow-bean-definition-overriding</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该配置项的目的,就是如果当前项目中存在同名的bean,后定义的bean会覆盖先定义的。</p>
<p>==如果不配置该项，项目启动之后将会报错：==</p>
<p><img src="assets/image-20210825163737687.png" alt="image-20210825163737687"></p>
<p>报错信息表明，在声明 org.apache.shardingsphere.shardingjdbc.spring.boot 包下的SpringBootConfiguration中的dataSource这个bean时出错, 原因是有一个同名的 dataSource 的bean在com.alibaba.druid.spring.boot.autoconfigure包下的DruidDataSourceAutoConfigure类加载时已经声明了。</p>
<p><img src="assets/image-20210825164147056.png" alt="image-20210825164147056"></p>
<p><img src="assets/image-20210825164227927.png" alt="image-20210825164227927"></p>
<p>而我们需要用到的是 shardingjdbc包下的dataSource，所以我们需要配置上述属性，让后加载的覆盖先加载的。</p>
<h3 id="_2-6-测试" tabindex="-1"><a class="header-anchor" href="#_2-6-测试" aria-hidden="true">#</a> 2.6 测试</h3>
<p>我们使用shardingjdbc来实现读写分离，直接通过上述简单的配置就可以了。配置完毕之后，我们就可以重启服务，通过postman来访问controller的方法，来完成用户信息的增删改查，我们可以通过debug及日志的方式来查看每一次执行增删改查操作，使用的是哪个数据源，连接的是哪个数据库。</p>
<p><strong>1). 保存数据</strong></p>
<p><img src="assets/image-20210825170601641.png" alt="image-20210825170601641"></p>
<p>控制台输出日志，可以看到操作master主库：</p>
<p><img src="assets/image-20210825172748209.png" alt="image-20210825172748209"></p>
<p><strong>2). 修改数据</strong></p>
<p><img src="assets/image-20210825171507059.png" alt="image-20210825171507059"></p>
<p>控制台输出日志，可以看到操作master主库：</p>
<p><img src="assets/image-20210825172534790.png" alt="image-20210825172534790"></p>
<p><strong>3). 查询数据</strong></p>
<p><img src="assets/image-20210825171609997.png" alt="image-20210825171609997"></p>
<p>控制台输出日志，可以看到操作slave主库：</p>
<p><img src="assets/image-20210825171623011.png" alt="image-20210825171623011"></p>
<p><strong>4). 删除数据</strong></p>
<p><img src="assets/image-20210825172329600.png" alt="image-20210825172329600"></p>
<p>控制台输出日志，可以看到操作master主库：</p>
<p><img src="assets/image-20210825172353414.png" alt="image-20210825172353414"></p>
<h2 id="_3-项目实现读写分离" tabindex="-1"><a class="header-anchor" href="#_3-项目实现读写分离" aria-hidden="true">#</a> 3. 项目实现读写分离</h2>
<h3 id="_3-1-数据库环境准备" tabindex="-1"><a class="header-anchor" href="#_3-1-数据库环境准备" aria-hidden="true">#</a> 3.1 数据库环境准备</h3>
<p>直接使用我们前面在虚拟机中搭建的主从复制的数据库环境即可。在主库中创建瑞吉外卖项目的业务数据库reggie, 并导入相关表结构和数据(我们可以将自己之前在本地开发时使用的数据库数据导出, 然后导入到服务器中的主库即可)。</p>
<p><strong>1). 将自己本地的reggie数据库的数据导出SQL文件</strong></p>
<p><img src="assets/image-20210825175039571.png" alt="image-20210825175039571"></p>
<p>这样做的话，我们之前自己开发时，添加的测试数据都还在的，便于测试。</p>
<p><strong>2). 在主数据库master中，创建数据库reggie，并导入该SQL文件</strong></p>
<p>master中创建数据库，会自动同步至slave从库</p>
<p><img src="assets/image-20210825175416295.png" alt="image-20210825175416295"></p>
<p>在master的reggie中导入sql文件</p>
<p><img src="assets/image-20210825175747138.png" alt="image-20210825175747138"></p>
<h3 id="_3-2-创建git分支" tabindex="-1"><a class="header-anchor" href="#_3-2-创建git分支" aria-hidden="true">#</a> 3.2 创建Git分支</h3>
<p>目前默认git中有两个分支master 和 v1.0 ，我们接下来进行读写分离的优化，就不在master和v1.0分支来操作了，我们需要在git上创建一个单独的分支v1.1，读写分离的优化，我们就在该分支上进行操作。具体创建分支的操作，和前面演示的一致。</p>
<p>当前创建的v1.1分支，是基于master分支创建出来的，所以目前master分支的代码， 和v1.1分支的代码是完全一样的，接下来把v1.1的代码也推送至远程仓库。</p>
<h3 id="_3-3-读写分离配置" tabindex="-1"><a class="header-anchor" href="#_3-3-读写分离配置" aria-hidden="true">#</a> 3.3 读写分离配置</h3>
<p><strong>1). 在项目的pom.xml增加依赖</strong></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.shardingsphere<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sharding-jdbc-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.0.0-RC1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). 在项目的application.yml中配置数据源相关信息</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">shardingsphere</span><span class="token punctuation">:</span>
    <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
      <span class="token key atrule">names</span><span class="token punctuation">:</span>
        master<span class="token punctuation">,</span>slave
      <span class="token comment"># 主数据源</span>
      <span class="token key atrule">master</span><span class="token punctuation">:</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
        <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
        <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//192.168.200.200<span class="token punctuation">:</span>3306/reggie<span class="token punctuation">?</span>characterEncoding=utf<span class="token punctuation">-</span><span class="token number">8</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> root
        <span class="token key atrule">password</span><span class="token punctuation">:</span> root
      <span class="token comment"># 从数据源</span>
      <span class="token key atrule">slave</span><span class="token punctuation">:</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
        <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
        <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//192.168.200.201<span class="token punctuation">:</span>3306/reggie<span class="token punctuation">?</span>characterEncoding=utf<span class="token punctuation">-</span><span class="token number">8</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> root
        <span class="token key atrule">password</span><span class="token punctuation">:</span> root
    <span class="token key atrule">masterslave</span><span class="token punctuation">:</span>
      <span class="token comment"># 读写分离配置</span>
      <span class="token key atrule">load-balance-algorithm-type</span><span class="token punctuation">:</span> round_robin <span class="token comment">#轮询</span>
      <span class="token comment"># 最终的数据源名称</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> dataSource
      <span class="token comment"># 主库数据源名称</span>
      <span class="token key atrule">master-data-source-name</span><span class="token punctuation">:</span> master
      <span class="token comment"># 从库数据源名称列表，多个逗号分隔</span>
      <span class="token key atrule">slave-data-source-names</span><span class="token punctuation">:</span> slave
    <span class="token key atrule">props</span><span class="token punctuation">:</span>
      <span class="token key atrule">sql</span><span class="token punctuation">:</span>
        <span class="token key atrule">show</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment">#开启SQL显示，默认false</span>
  <span class="token key atrule">main</span><span class="token punctuation">:</span>
    <span class="token key atrule">allow-bean-definition-overriding</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-功能测试" tabindex="-1"><a class="header-anchor" href="#_3-4-功能测试" aria-hidden="true">#</a> 3.4 功能测试</h3>
<p>配置完毕之后，我们启动项目进行测试，直接访问系统管理后台的页面，然后执行相关业务操作，看控制台输出的日志信息即可。</p>
<p>查询操作：</p>
<p><img src="assets/image-20210825181207319.png" alt="image-20210825181207319"></p>
<p>更新操作：</p>
<img src="assets/image-20210825181524065.png" alt="image-20210825181524065" style="zoom:80%;" /> 
<p>插入操作：</p>
<img src="assets/image-20210825181915511.png" alt="image-20210825181915511" style="zoom:80%;" /> 
<p>删除操作：</p>
<img src="assets/image-20210825182259837.png" alt="image-20210825182259837" style="zoom:80%;" /> 
<h3 id="_3-5-git合并代码" tabindex="-1"><a class="header-anchor" href="#_3-5-git合并代码" aria-hidden="true">#</a> 3.5 Git合并代码</h3>
<p>读写分离的功能我们已经实现完毕了，那么接下来，我们就可以将当前分支v1.1代码提交并推送到远程仓库。</p>
<img src="assets/image-20210825183830252.png" alt="image-20210825183830252" style="zoom:80%;" /> 
<p><img src="assets/image-20210825183900307.png" alt="image-20210825183900307"></p>
<p>然后，再将v1.1的代码，合并到master分支，然后推送至远程仓库。</p>
<p><img src="assets/image-20210825184018801.png" alt="image-20210825184018801"></p>
<h2 id="_4-nginx-概述" tabindex="-1"><a class="header-anchor" href="#_4-nginx-概述" aria-hidden="true">#</a> 4. Nginx-概述</h2>
<h3 id="_4-1-介绍" tabindex="-1"><a class="header-anchor" href="#_4-1-介绍" aria-hidden="true">#</a> 4.1 介绍</h3>
<p><img src="assets/image-20210829234142590.png" alt="image-20210829234142590"></p>
<p>Nginx是一款轻量级的Web服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器。其特点是占有内存少，并发能力强，事实上nginx的并发能力在同类型的网页服务器中表现较好，中国大陆使用nginx的网站有：百度、京东、新浪、网易、腾讯、淘宝等。</p>
<p>Nginx是由<strong>伊戈尔·赛索耶夫</strong>为俄罗斯访问量第二的Rambler.ru站点（俄文：Рамблер）开发的，第一个公开版本0.1.0发布于2004年10月4日。</p>
<p>官网：https://nginx.org/</p>
<h3 id="_4-2-下载和安装" tabindex="-1"><a class="header-anchor" href="#_4-2-下载和安装" aria-hidden="true">#</a> 4.2 下载和安装</h3>
<h4 id="_4-2-1-下载" tabindex="-1"><a class="header-anchor" href="#_4-2-1-下载" aria-hidden="true">#</a> 4.2.1 下载</h4>
<p>在Nginx的官网的下载页面中(http://nginx.org/en/download.html)，就展示了当前Nginx版本，并提供了下载的连接。 如下：</p>
<img src="assets/image-20210829234623737.png" alt="image-20210829234623737" style="zoom:80%;" /> 
<p>在本项目中，我们所学习的Nginx选择的是稳定版本的1.16这个版本，我们可以直接从官网下载，当然在我们的课程资料中也已经提供了该版本的安装包。</p>
<p><img src="assets/image-20210829235301014.png" alt="image-20210829235301014"></p>
<h4 id="_4-2-2-安装" tabindex="-1"><a class="header-anchor" href="#_4-2-2-安装" aria-hidden="true">#</a> 4.2.2 安装</h4>
<p><strong>1). 安装依赖包</strong></p>
<p>由于nginx是基于c语言开发的，所以需要安装c语言的编译环境，及正则表达式库等第三方依赖库。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum -y install gcc pcre-devel zlib-devel openssl openssl-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>2). 下载Nginx安装包</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum install wget
wget https://nginx.org/download/nginx-1.16.1.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>wget :</p>
<p>​	wget命令用来从指定的URL下载文件。wget非常稳定，它在带宽很窄的情况下和不稳定网络中有很强的适应性，如果是由于网络的原因下载失败，wget会不断的尝试，直到整个文件下载完毕。如果是服务器打断下载过程，它会再次联到服务器上从停止的地方继续下载。</p>
</blockquote>
<p>执行完wget指令后，就会在当前所在目录看到下载下来的文件。</p>
<p><strong>3). 解压nginx压缩包</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tar -zxvf nginx-1.16.1.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>4). 配置Nginx编译环境</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cd nginx-1.16.1
./configure --prefix=/usr/local/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>说明:</p>
<p>​	--prefix 指定的目录，就是我们安装Nginx的目录。</p>
<p><strong>5). 编译&amp;安装</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>make &amp; make install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-3-目录结构" tabindex="-1"><a class="header-anchor" href="#_4-3-目录结构" aria-hidden="true">#</a> 4.3 目录结构</h3>
<p>安装完Nginx后，我们可以切换到Nginx的安装目录(/usr/local/nginx)，先来熟悉一下Nginx的目录结构，如下图：</p>
<img src="assets/image-20210830000933352.png" alt="image-20210830000933352" style="zoom:90%;" /> 
<blockquote>
<p>备注：</p>
<p>​	上述我们用到的一个指令 tree，该指令可以将我们指定的目录以树状结构展示出来。如果没有这个指令，可以通过以下指令进行安装。</p>
<p>​	yum install tree</p>
</blockquote>
<p>重点目录和文件如下:</p>
<table>
<thead>
<tr>
<th>目录/文件</th>
<th>说明</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>conf</td>
<td>配置文件的存放目录</td>
<td></td>
</tr>
<tr>
<td>conf/nginx.conf</td>
<td>Nginx的核心配置文件</td>
<td>conf下有很多nginx的配置文件，我们主要操作这个核心配置文件</td>
</tr>
<tr>
<td>html</td>
<td>存放静态资源(html, css, )</td>
<td>部署到Nginx的静态资源都可以放在html目录中</td>
</tr>
<tr>
<td>logs</td>
<td>存放nginx日志(访问日志、错误日志等)</td>
<td></td>
</tr>
<tr>
<td>sbin/nginx</td>
<td>二进制文件，用于启动、停止Nginx服务</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="_5-nginx-命令" tabindex="-1"><a class="header-anchor" href="#_5-nginx-命令" aria-hidden="true">#</a> 5. Nginx-命令</h2>
<h3 id="_5-1-常用命令" tabindex="-1"><a class="header-anchor" href="#_5-1-常用命令" aria-hidden="true">#</a> 5.1 常用命令</h3>
<p>Nginx中，我们的二进制可执行文件(nginx)存放在sbin目录下，虽然只有一个可执行文件，但是我们可以通过该指令配合不同的参数达到更加强大的功能。接下来，我们就演示一下Nginx常见指令, 在执行下面的指令时,都需要在/usr/local/nginx/sbin/目录下执行。</p>
<p><strong>1). 查看版本</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./nginx -v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="assets/image-20210830223435585.png" alt="image-20210830223435585"></p>
<p><strong>2). 检查配置文件</strong></p>
<p>修改了nginx.conf核心配置文件之后，在启动Nginx服务之前，可以先检查一下conf/nginx.conf文件配置的是否有错误，命令如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./nginx -t
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="assets/image-20210830223511878.png" alt="image-20210830223511878"></p>
<p><strong>3). 启动</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动之后，我们可以通过ps -ef指令来查看nginx的进程是否存在。</p>
<p><img src="assets/image-20210830224019661.png" alt="image-20210830224019661"></p>
<p>注意： nginx服务启动后，默认就会有两个进程。</p>
<p>启动之后，我们可以直接访问Nginx的80端口， http://192.168.200.200</p>
<img src="assets/image-20210830224605952.png" alt="image-20210830224605952" style="zoom:80%;" /> 
<blockquote>
<p>注意：</p>
<p>​	要想正常访问Nginx，需要关闭防火墙或开放指定端口号，执行的指令如下：</p>
<p>​	A. 关闭防火墙</p>
<p>​		systemctl stop firewalld</p>
<p>​	B. 开放80端口</p>
<p>​		firewall-cmd --zone=public --add-port=80/tcp --permanent</p>
<p>​		firewall-cmd --reload</p>
</blockquote>
<p><strong>4). 停止</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./nginx -s stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>停止之后，我们可以查看nginx的进程：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ps -ef|grep nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="assets/image-20210830224121489.png" alt="image-20210830224121489"></p>
<p><strong>5). 重新加载</strong></p>
<p>当修改了Nginx配置文件后，需要重新加载才能生效，可以使用下面命令重新加载配置文件：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./nginx -s reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-2-环境变量配置" tabindex="-1"><a class="header-anchor" href="#_5-2-环境变量配置" aria-hidden="true">#</a> 5.2 环境变量配置</h3>
<p>在上述我们在使用nginx命令在进行服务的启动、停止、重新加载时，都需要用到一个指令nginx，而这个指令是在nginx/sbin目录下的，我们每一次使用这个指令都需要切换到sbin目录才可以，使用相对繁琐。那么我们能不能在任意目录下都可以执行该指令来操作nginx呢？答案是可以的，配置nginx的环境变量即可。</p>
<p>通过vim编辑器，打开/etc/profile文件, 在PATH环境变量中增加nginx的sbin目录，如下：</p>
<p><img src="assets/image-20210830225544343.png" alt="image-20210830225544343"></p>
<p>修改完配置文件之后，需要执行 source /etc/profile 使文件生效。 接下来，我们就可以在任意目录下执行nginx的指令了，如：</p>
<p><img src="assets/image-20210830225702899.png" alt="image-20210830225702899"></p>
<h2 id="_6-nginx-应用" tabindex="-1"><a class="header-anchor" href="#_6-nginx-应用" aria-hidden="true">#</a> 6. Nginx-应用</h2>
<p>介绍了并安装了Nginx之后，本章节将要讲解的是Nginx的使用，我们主要从以下四个方面进行讲解。</p>
<h3 id="_6-1-配置文件结构" tabindex="-1"><a class="header-anchor" href="#_6-1-配置文件结构" aria-hidden="true">#</a> 6.1 配置文件结构</h3>
<p>nginx的配置文件(conf/nginx.conf)整体上分为三部分: 全局块、events块、http块。这三块的分别配置什么样的信息呢，看下表：</p>
<table>
<thead>
<tr>
<th>区域</th>
<th>职责</th>
</tr>
</thead>
<tbody>
<tr>
<td>全局块</td>
<td>配置和nginx运行相关的全局配置</td>
</tr>
<tr>
<td>events块</td>
<td>配置和网络连接相关的配置</td>
</tr>
<tr>
<td>http块</td>
<td>配置代理、缓存、日志记录、虚拟主机等配置</td>
</tr>
</tbody>
</table>
<p>具体结构图如下:</p>
<img src="assets/image-20210830230827686.png" alt="image-20210830230827686" style="zoom:80%;" /> 
<blockquote>
<p>在全局块、events块以及http块中，我们经常配置的是http块。</p>
<p>在http块中可以包含多个server块,每个server块可以配置多个location块。</p>
</blockquote>
<h3 id="_6-2-部署静态资源" tabindex="-1"><a class="header-anchor" href="#_6-2-部署静态资源" aria-hidden="true">#</a> 6.2 部署静态资源</h3>
<h4 id="_6-2-1-介绍" tabindex="-1"><a class="header-anchor" href="#_6-2-1-介绍" aria-hidden="true">#</a> 6.2.1 介绍</h4>
<p>Nginx可以作为静态web服务器来部署静态资源。这里所说的静态资源是指在服务端真实存在，并且能够直接展示的一些文件，比如常见的html页面、css文件、js文件、图片、视频等资源。</p>
<p>相对于Tomcat，Nginx处理静态资源的能力更加高效，所以在生产环境下，一般都会将静态资源部署到Nginx中。</p>
<p>将静态资源部署到Nginx非常简单，只需要将文件复制到Nginx安装目录下的html目录中即可。</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token key attr-name">server</span> <span class="token value attr-value">{</span>
<span class="token key attr-name">    listen</span> <span class="token value attr-value">80;				#监听端口	</span>
<span class="token key attr-name">    server_name</span> <span class="token value attr-value">localhost;	#服务器名称</span>
<span class="token key attr-name">    location</span> <span class="token value attr-value">/ {			#匹配客户端请求url</span>
<span class="token key attr-name">        root</span> <span class="token value attr-value">html;			#指定静态资源根目录</span>
<span class="token key attr-name">        index</span> <span class="token value attr-value">index.html;	#指定默认首页</span>
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-2-2-测试" tabindex="-1"><a class="header-anchor" href="#_6-2-2-测试" aria-hidden="true">#</a> 6.2.2 测试</h4>
<p>在资料中，我们提供了一个静态的html文件，我们需要将这个文件部署到nginx中，然后通过nginx访问html静态资源。</p>
<p><strong>1). 将静态资源上传到 /usr/local/nginx/html 目录</strong></p>
<p><img src="assets/image-20210830232238402.png" alt="image-20210830232238402"></p>
<p><strong>2). 启动nginx</strong></p>
<p><img src="assets/image-20210830232419462.png" alt="image-20210830232419462"></p>
<p><strong>3). 访问</strong></p>
<p>http://192.168.200.200/hello.html</p>
<img src="assets/image-20210830232529524.png" alt="image-20210830232529524" style="zoom:80%;" /> 
<p>http://192.168.200.200 ， 访问该地址，访问的是nginx的默认首页</p>
<img src="assets/image-20210830232857289.png" alt="image-20210830232857289" style="zoom:81%;" /> 
<p><strong>4). 配置首页</strong></p>
<p><img src="assets/image-20210830232720821.png" alt="image-20210830232720821"></p>
<p>如果我们需要将hello.html作为nginx的首页，可以修改location的index指令，配置为hello.html，如下：</p>
<p><img src="assets/image-20210830233019489.png" alt="image-20210830233019489"></p>
<p>配置完毕后，我们可以通过指令，来检查配置文件是否配置正确： nginx -t</p>
<p><img src="assets/image-20210830233122708.png" alt="image-20210830233122708"></p>
<p>配置文件修改了，我们需要重新加载一下，才可以生效：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nginx -s reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>5). 访问</strong></p>
<p>http://192.168.200.200</p>
<img src="assets/image-20210830233336916.png" alt="image-20210830233336916" style="zoom:80%;" /> 
<h3 id="_6-3-反向代理" tabindex="-1"><a class="header-anchor" href="#_6-3-反向代理" aria-hidden="true">#</a> 6.3 反向代理</h3>
<h4 id="_6-3-1-概念介绍" tabindex="-1"><a class="header-anchor" href="#_6-3-1-概念介绍" aria-hidden="true">#</a> 6.3.1 概念介绍</h4>
<p>1). 正向代理</p>
<p>正向代理服务器是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。</p>
<p>正向代理的典型用途是为在防火墙内的局域网客户端提供访问Internet的途径。</p>
<p>正向代理一般是<strong>在客户端设置代理服务器</strong>，通过代理服务器转发请求，最终访问到目标服务器。</p>
<p><img src="assets/image-20210830233450415.png" alt="image-20210830233450415"></p>
<p>2). 反向代理</p>
<p>反向代理服务器位于用户与目标服务器之间，但是对于用户而言，反向代理服务器就相当于目标服务器，即用户直接访问反向代理服务器就可以获得目标服务器的资源，反向代理服务器负责将请求转发给目标服务器。用户不需要知道目标服务器的地址，也无须在用户端作任何设定，对于用户来说，访问反向代理服务器是完全无感知的。</p>
<p><img src="assets/image-20210830233634695.png" alt="image-20210830233634695"></p>
<p>那么在本小节，我们就是要使用nginx来作为反向代理服务器使用。 在nginx中，我们可以在nginx.conf中配置反向代理:</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token key attr-name">server</span> <span class="token value attr-value">{</span>
<span class="token key attr-name">    listen</span> <span class="token value attr-value">82;</span>
<span class="token key attr-name">    server_name</span> <span class="token value attr-value">localhost;</span>
<span class="token key attr-name">    location</span> <span class="token value attr-value">/ {</span>
<span class="token key attr-name">        proxy_pass</span> <span class="token value attr-value">http://192.168.200.201:8080; 	#反向代理配置，将请求转发到指定服务</span>
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述配置的含义为: 当我们访问nginx的82端口时，根据反向代理配置，会将请求转发到 http://192.168.200.201:8080 对应的服务上。</p>
<h4 id="_6-3-2-测试" tabindex="-1"><a class="header-anchor" href="#_6-3-2-测试" aria-hidden="true">#</a> 6.3.2 测试</h4>
<p>需求: 在192.168.200.201这台服务器中部署了java应用，运行端口为8080，并提供了一个可访问的链接 /hello。现在我们需要在访问nginx的82端口时，通过nginx将请求转发到192.168.200.201:8080的服务。</p>
<img src="assets/image-20210830235803013.png" alt="image-20210830235803013" style="zoom:67%;" /> 
<p><strong>1). 在192.168.200.201部署服务并启动</strong></p>
<p>将资料中提供的 helloworld-1.0-SNAPSHOT.jar 上传到服务器端，并通过指令 java -jar helloworld-1.0-SNAPSHOT.jar 运行服务。</p>
<p><img src="assets/image-20210831000152199.png" alt="image-20210831000152199"></p>
<p><strong>2). 在192.168.200.200中的nginx.conf中配置反向代理</strong></p>
<p>进入nginx的安装目录，并编辑配置文件nginx.conf:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cd /usr/local/nginx/conf/
vim nginx.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在http块中,再添加一个server块虚拟主机的配置,监听82端口,并配置反向代理proxy_pass:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server {
    listen 82;
    server_name localhost;
    location / {
        proxy_pass http://192.168.200.201:8080; 	#反向代理配置，将请求转发到指定服务
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="assets/image-20210831000747805.png" alt="image-20210831000747805" style="zoom:80%;" /> 
<p><strong>3). 检查配置文件，并重新加载</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nginx -t
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="assets/image-20210831001021252.png" alt="image-20210831001021252"></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nginx -s reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>4). 访问</strong></p>
<p><img src="assets/image-20210831001347257.png" alt="image-20210831001347257"></p>
<p>==注意: 在访问82端口时，有可能访问不通，原因是以为防火墙中没有开放端口号。我们可以通过两种方式来解决该问题：==</p>
<p>==A. 关闭防火墙==</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl stop firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>==B. 开发指定端口==</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>firewall-cmd --zone=public --add-port=82/tcp --permanent

firewall-cmd --reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-负载均衡" tabindex="-1"><a class="header-anchor" href="#_6-4-负载均衡" aria-hidden="true">#</a> 6.4 负载均衡</h3>
<h4 id="_6-4-1-概念介绍" tabindex="-1"><a class="header-anchor" href="#_6-4-1-概念介绍" aria-hidden="true">#</a> 6.4.1 概念介绍</h4>
<p>早期的网站流量和业务功能都比较简单，单台服务器就可以满足基本需求，但是随着互联网的发展，业务流量越来越大并且业务逻辑也越来越复杂，单台服务器的性能及单点故障问题就凸显出来了，因此需要多台服务器组成应用集群，进行性能的水平扩展以及避免单点故障出现。</p>
<p>**应用集群：**将同一应用部署到多台机器上，组成应用集群，接收负载均衡器分发的请求，进行业务处理并返回响应数据</p>
<p>**负载均衡器：**将用户请求根据对应的负载均衡算法分发到应用集群中的一台服务器进行处理</p>
<img src="assets/image-20210831080743617.png" alt="image-20210831080743617" style="zoom:80%;" />  
<p>此处的负载均衡器，我们将会使用Nginx来实现，而Nginx的负载均衡是基于反向代理的，只不过此时所代理的服务器不是一台，而是多台。</p>
<h4 id="_6-4-2-测试" tabindex="-1"><a class="header-anchor" href="#_6-4-2-测试" aria-hidden="true">#</a> 6.4.2 测试</h4>
<p><strong>1). 将资料中提供的两个jar包，上传到192.168.200.201服务器上</strong></p>
<table>
<thead>
<tr>
<th>jar</th>
<th>运行端口</th>
<th>请求链接</th>
<th>响应数据</th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="assets/image-20210831081023098.png" alt="image-20210831081023098"></td>
<td>8080</td>
<td>/hello</td>
<td>8080</td>
</tr>
<tr>
<td><img src="assets/image-20210831081038807.png" alt="image-20210831081038807"></td>
<td>8081</td>
<td>/hello</td>
<td>8081</td>
</tr>
</tbody>
</table>
<blockquote>
<p>我们在测试时，并没有那么多服务器，我们可以在一台服务器中启动多个服务，运行在不同的端口号上进行测试。</p>
</blockquote>
<p><strong>2). 运行上传上来的两个jar包，运行端口分别是 8080 ， 8081</strong></p>
<p>由于我们执行 java -jar 指令会占用前台窗口，所以我们可以开启两个窗口进行测试。</p>
<p><img src="assets/image-20210831081513575.png" alt="image-20210831081513575"></p>
<p><img src="assets/image-20210831081544582.png" alt="image-20210831081544582"></p>
<p><strong>3). 在nginx中配置负载均衡</strong></p>
<p>打开nginx的配置文件nginx.conf并增加如下配置:</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment">#upstream指令可以定义一组服务器</span>
<span class="token key attr-name">upstream</span> <span class="token value attr-value">targetserver{	</span>
<span class="token key attr-name">    server</span> <span class="token value attr-value">192.168.200.201:8080;</span>
<span class="token key attr-name">    server</span> <span class="token value attr-value">192.168.200.201:8081;</span>
}

<span class="token key attr-name">server</span> <span class="token value attr-value">{</span>
<span class="token key attr-name">    listen</span> <span class="token value attr-value">      8080;</span>
<span class="token key attr-name">    server_name</span> <span class="token value attr-value"> localhost;</span>
<span class="token key attr-name">    location</span> <span class="token value attr-value">/ {</span>
<span class="token key attr-name">        proxy_pass</span> <span class="token value attr-value">http://targetserver;</span>
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体的配置位置如下:</p>
<p><img src="assets/image-20210831081939508.png" alt="image-20210831081939508"></p>
<p><strong>4). 重新加载nginx配置文件,访问</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试时,我们直接访问nginx的8080端口(http://192.168.200.200:8080), 此时nginx会根据负载均衡策略,将请求转发到后面的两台服务器。</p>
<p><img src="assets/image-20210831082339085.png" alt="image-20210831082339085"></p>
<p>在上述的测试过程中，我们看到请求均衡的转发到了8080和8081，因为模式的负载均衡策略是轮询。</p>
<font color="red" size="5">注意: 上述所有涉及到的端口号，都需要在对应的服务器的防火墙中开放，或者彻底关闭防火墙</font><h4 id="_6-4-3-负载均衡策略" tabindex="-1"><a class="header-anchor" href="#_6-4-3-负载均衡策略" aria-hidden="true">#</a> 6.4.3 负载均衡策略</h4>
<p>处理上述默认的轮询策略以外，在Nginx中还提供了其他的负载均衡策略，如下：</p>
<table>
<thead>
<tr>
<th><strong>名称</strong></th>
<th><strong>说明</strong></th>
<th>特点</th>
</tr>
</thead>
<tbody>
<tr>
<td>轮询</td>
<td>默认方式</td>
<td></td>
</tr>
<tr>
<td>weight</td>
<td>权重方式</td>
<td>根据权重分发请求,权重大的分配到请求的概率大</td>
</tr>
<tr>
<td>ip_hash</td>
<td>依据ip分配方式</td>
<td>根据客户端请求的IP地址计算hash值， 根据hash值来分发请求, 同一个IP发起的请求, 会发转发到同一个服务器上</td>
</tr>
<tr>
<td>least_conn</td>
<td>依据最少连接方式</td>
<td>哪个服务器当前处理的连接少, 请求优先转发到这台服务器</td>
</tr>
<tr>
<td>url_hash</td>
<td>依据url分配方式</td>
<td>根据客户端请求url的hash值，来分发请求, 同一个url请求, 会发转发到同一个服务器上</td>
</tr>
<tr>
<td>fair</td>
<td>依据响应时间方式</td>
<td>优先把请求分发给处理请求时间短的服务器</td>
</tr>
</tbody>
</table>
<p>权重的配置：</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment">#upstream指令可以定义一组服务器</span>
<span class="token key attr-name">upstream</span> <span class="token value attr-value">targetserver{	</span>
<span class="token key attr-name">    server</span> <span class="token value attr-value">192.168.200.201:8080 weight=10;</span>
<span class="token key attr-name">    server</span> <span class="token value attr-value">192.168.200.201:8081 weight=5;</span>
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述配置的weight权重是相对的，在上述的配置中，效果就是，在大数据量的请求下，最终8080接收的请求数是8081的两倍。</p>
</div></template>


