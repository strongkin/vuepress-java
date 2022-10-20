<template><div><h2 id="mybatis练习" tabindex="-1"><a class="header-anchor" href="#mybatis练习" aria-hidden="true">#</a> Mybatis练习</h2>
<p><strong>目标</strong></p>
<blockquote>
<ul>
<li>能够使用映射配置文件实现CRUD操作</li>
<li>能够使用注解实现CRUD操作</li>
</ul>
</blockquote>
<h2 id="_1-配置文件实现crud" tabindex="-1"><a class="header-anchor" href="#_1-配置文件实现crud" aria-hidden="true">#</a> 1，配置文件实现CRUD</h2>
<p><img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729111159534.png" alt="image-20210729111159534"></p>
<p>如上图所示产品原型，里面包含了品牌数据的 <code v-pre>查询</code> 、<code v-pre>按条件查询</code>、<code v-pre>添加</code>、<code v-pre>删除</code>、<code v-pre>批量删除</code>、<code v-pre>修改</code> 等功能，而这些功能其实就是对数据库表中的数据进行CRUD操作。接下来我们就使用Mybatis完成品牌数据的增删改查操作。以下是我们要完成功能列表：</p>
<blockquote>
<ul>
<li>查询
<ul>
<li>查询所有数据</li>
<li>查询详情</li>
<li>条件查询</li>
</ul>
</li>
<li>添加</li>
<li>修改
<ul>
<li>修改全部字段</li>
<li>修改动态字段</li>
</ul>
</li>
<li>删除
<ul>
<li>删除一个</li>
<li>批量删除</li>
</ul>
</li>
</ul>
</blockquote>
<p>我们先将必要的环境准备一下。</p>
<h3 id="_1-1-环境准备" tabindex="-1"><a class="header-anchor" href="#_1-1-环境准备" aria-hidden="true">#</a> 1.1  环境准备</h3>
<ul>
<li>
<p>数据库表（tb_brand）及数据准备</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 删除tb_brand表</span>
<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> tb_brand<span class="token punctuation">;</span>
<span class="token comment">-- 创建tb_brand表</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> tb_brand
<span class="token punctuation">(</span>
    <span class="token comment">-- id 主键</span>
    id           <span class="token keyword">int</span> <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token keyword">auto_increment</span><span class="token punctuation">,</span>
    <span class="token comment">-- 品牌名称</span>
    brand_name   <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">-- 企业名称</span>
    company_name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">-- 排序字段</span>
    ordered      <span class="token keyword">int</span><span class="token punctuation">,</span>
    <span class="token comment">-- 描述信息</span>
    description  <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">-- 状态：0：禁用  1：启用</span>
    <span class="token keyword">status</span>       <span class="token keyword">int</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 添加数据</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> tb_brand <span class="token punctuation">(</span>brand_name<span class="token punctuation">,</span> company_name<span class="token punctuation">,</span> ordered<span class="token punctuation">,</span> description<span class="token punctuation">,</span> <span class="token keyword">status</span><span class="token punctuation">)</span>
<span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token string">'三只松鼠'</span><span class="token punctuation">,</span> <span class="token string">'三只松鼠股份有限公司'</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">'好吃不上火'</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token punctuation">(</span><span class="token string">'华为'</span><span class="token punctuation">,</span> <span class="token string">'华为技术有限公司'</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token string">'华为致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token punctuation">(</span><span class="token string">'小米'</span><span class="token punctuation">,</span> <span class="token string">'小米科技有限公司'</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token string">'are you ok'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>实体类 Brand</p>
<p>在 <code v-pre>com.itheima.pojo</code> 包下创建 Brand 实体类。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Brand</span> <span class="token punctuation">{</span>
    <span class="token comment">// id 主键</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>
    <span class="token comment">// 品牌名称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> brandName<span class="token punctuation">;</span>
    <span class="token comment">// 企业名称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> companyName<span class="token punctuation">;</span>
    <span class="token comment">// 排序字段</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> ordered<span class="token punctuation">;</span>
    <span class="token comment">// 描述信息</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> description<span class="token punctuation">;</span>
    <span class="token comment">// 状态：0：禁用  1：启用</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> status<span class="token punctuation">;</span>
    
    <span class="token comment">//省略 setter and getter。自己写时要补全这部分代码</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>编写测试用例</p>
<p>测试代码需要在 <code v-pre>test/java</code> 目录下创建包及测试用例。项目结构如下：</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729112907106.png" alt="image-20210729112907106" style="zoom:80%;" />
</li>
<li>
<p>安装 MyBatisX 插件</p>
<ul>
<li>
<p>MybatisX 是一款基于 IDEA 的快速开发插件，为效率而生。</p>
</li>
<li>
<p>主要功能</p>
<ul>
<li>XML映射配置文件 和 接口方法 间相互跳转</li>
<li>根据接口方法生成 statement</li>
</ul>
</li>
<li>
<p>安装方式</p>
<p>点击 <code v-pre>file</code> ，选择 <code v-pre>settings</code> ，就能看到如下图所示界面</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729113304743.png" alt="image-20210729113304743" style="zoom:80%;" />
<blockquote>
<p>注意：安装完毕后需要重启IDEA</p>
</blockquote>
</li>
<li>
<p>插件效果</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729164450524.png" alt="image-20210729164450524" style="zoom:70%;" />
<p>红色头绳的表示映射配置文件，蓝色头绳的表示mapper接口。在mapper接口点击红色头绳的小鸟图标会自动跳转到对应的映射配置文件，在映射配置文件中点击蓝色头绳的小鸟图标会自动跳转到对应的mapper接口。也可以在mapper接口中定义方法，自动生成映射配置文件中的 <code v-pre>statement</code> ，如图所示</p>
<p><img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729165337223.png" alt="image-20210729165337223"></p>
</li>
</ul>
</li>
</ul>
<h3 id="_1-2-查询所有数据" tabindex="-1"><a class="header-anchor" href="#_1-2-查询所有数据" aria-hidden="true">#</a> 1.2  查询所有数据</h3>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729165724838.png" alt="image-20210729165724838" style="zoom:80%;" />
<p>如上图所示就页面上展示的数据，而这些数据需要从数据库进行查询。接下来我们就来讲查询所有数据功能，而实现该功能我们分以下步骤进行实现：</p>
<ul>
<li>
<p>编写接口方法：Mapper接口</p>
<ul>
<li>
<p>参数：无</p>
<p>查询所有数据功能是不需要根据任何条件进行查询的，所以此方法不需要参数。</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729171208737.png" alt="image-20210729171208737" style="zoom:80%;" />
</li>
</ul>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>  <span class="token operator">*</span> 结果：<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Brand</span><span class="token punctuation">></span></span>

    我们会将查询出来的每一条数据封装成一个 `<span class="token class-name">Brand</span>` 对象，而多条数据封装多个 `<span class="token class-name">Brand</span>` 对象，需要将这些对象封装到<span class="token class-name">List</span>集合中返回。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;img src=&quot;./assets/image-20210729171146911.png&quot; alt=&quot;image-20210729171146911&quot; style=&quot;zoom:80%;&quot; /&gt;
</code></pre>
<ul>
<li>执行方法、测试</li>
</ul>
<h4 id="_1-2-1-编写接口方法" tabindex="-1"><a class="header-anchor" href="#_1-2-1-编写接口方法" aria-hidden="true">#</a> 1.2.1  编写接口方法</h4>
<p>在 <code v-pre>com.itheima.mapper</code> 包写创建名为 <code v-pre>BrandMapper</code> 的接口。并在该接口中定义 <code v-pre>List&lt;Brand&gt; selectAll()</code> 方法。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BrandMapper</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 查询所有
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Brand</span><span class="token punctuation">></span></span> <span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-2-编写sql语句" tabindex="-1"><a class="header-anchor" href="#_1-2-2-编写sql语句" aria-hidden="true">#</a> 1.2.2  编写SQL语句</h4>
<p>在 <code v-pre>reources</code> 下创建 <code v-pre>com/itheima/mapper</code> 目录结构，并在该目录下创建名为 <code v-pre>BrandMapper.xml</code> 的映射配置文件</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8" ?></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">mapper</span>
        <span class="token name">PUBLIC</span> <span class="token string">"-//mybatis.org//DTD Mapper 3.0//EN"</span>
        <span class="token string">"http://mybatis.org/dtd/mybatis-3-mapper.dtd"</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mapper</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.itheima.mapper.BrandMapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectAll<span class="token punctuation">"</span></span> <span class="token attr-name">resultType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brand<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        select *
        from tb_brand;
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mapper</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-3-编写测试方法" tabindex="-1"><a class="header-anchor" href="#_1-2-3-编写测试方法" aria-hidden="true">#</a> 1.2.3  编写测试方法</h4>
<p>在 <code v-pre>MybatisTest</code> 类中编写测试查询所有的方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testSelectAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token comment">//1. 获取SqlSessionFactory</span>
    <span class="token class-name">String</span> resource <span class="token operator">=</span> <span class="token string">"mybatis-config.xml"</span><span class="token punctuation">;</span>
    <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token class-name">Resources</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SqlSessionFactory</span> sqlSessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//2. 获取SqlSession对象</span>
    <span class="token class-name">SqlSession</span> sqlSession <span class="token operator">=</span> sqlSessionFactory<span class="token punctuation">.</span><span class="token function">openSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//3. 获取Mapper接口的代理对象</span>
    <span class="token class-name">BrandMapper</span> brandMapper <span class="token operator">=</span> sqlSession<span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">BrandMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//4. 执行方法</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Brand</span><span class="token punctuation">></span></span> brands <span class="token operator">=</span> brandMapper<span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>brands<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//5. 释放资源</span>
    sqlSession<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意：现在我们感觉测试这部分代码写起来特别麻烦，我们可以先忍忍。以后我们只会写上面的第3步的代码，其他的都不需要我们来完成。</p>
</blockquote>
<p>执行测试方法结果如下：</p>
<p><img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729172544230.png" alt="image-20210729172544230"></p>
<p>从上面结果我们看到了问题，有些数据封装成功了，而有些数据并没有封装成功。为什么这样呢？</p>
<p>这个问题可以通过两种方式进行解决：</p>
<ul>
<li>给字段起别名</li>
<li>使用resultMap定义字段和属性的映射关系</li>
</ul>
<h4 id="_1-2-4-起别名解决上述问题" tabindex="-1"><a class="header-anchor" href="#_1-2-4-起别名解决上述问题" aria-hidden="true">#</a> 1.2.4  起别名解决上述问题</h4>
<p>从上面结果可以看到 <code v-pre>brandName</code> 和 <code v-pre>companyName</code> 这两个属性的数据没有封装成功，查询 实体类 和 表中的字段 发现，在实体类中属性名是 <code v-pre>brandName</code> 和 <code v-pre>companyName</code> ，而表中的字段名为 <code v-pre>brand_name</code> 和 <code v-pre>company_name</code>，如下图所示 。那么我们只需要保持这两部分的名称一致这个问题就迎刃而解。</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729173210433.png" alt="image-20210729173210433" style="zoom:80%;" />
<p>我们可以在写sql语句时给这两个字段起别名，将别名定义成和属性名一致即可。</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectAll<span class="token punctuation">"</span></span> <span class="token attr-name">resultType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brand<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    select
    id, brand_name as brandName, company_name as companyName, ordered, description, status
    from tb_brand;
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而上面的SQL语句中的字段列表书写麻烦，如果表中还有更多的字段，同时其他的功能也需要查询这些字段时就显得我们的代码不够精炼。Mybatis提供了<code v-pre>sql</code> 片段可以提高sql的复用性。</p>
<p><strong>SQL片段：</strong></p>
<ul>
<li>
<p>将需要复用的SQL片段抽取到 <code v-pre>sql</code> 标签中</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sql</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brand_column<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	id, brand_name as brandName, company_name as companyName, ordered, description, status
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sql</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>id属性值是唯一标识，引用时也是通过该值进行引用。</p>
</li>
<li>
<p>在原sql语句中进行引用</p>
<p>使用 <code v-pre>include</code> 标签引用上述的 SQL 片段，而 <code v-pre>refid</code> 指定上述 SQL 片段的id值。</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectAll<span class="token punctuation">"</span></span> <span class="token attr-name">resultType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brand<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    select
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span> <span class="token attr-name">refid</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brand_column<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    from tb_brand;
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_1-2-5-使用resultmap解决上述问题" tabindex="-1"><a class="header-anchor" href="#_1-2-5-使用resultmap解决上述问题" aria-hidden="true">#</a> 1.2.5  使用resultMap解决上述问题</h4>
<p>起别名 + sql片段的方式可以解决上述问题，但是它也存在问题。如果还有功能只需要查询部分字段，而不是查询所有字段，那么我们就需要再定义一个 SQL 片段，这就显得不是那么灵活。</p>
<p>那么我们也可以使用resultMap来定义字段和属性的映射关系的方式解决上述问题。</p>
<ul>
<li>
<p>在映射配置文件中使用resultMap定义 字段 和 属性 的映射关系</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resultMap</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandResultMap<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brand<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--
            id：完成主键字段的映射
                column：表的列名
                property：实体类的属性名
            result：完成一般字段的映射
                column：表的列名
                property：实体类的属性名
        --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brand_name<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandName<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>company_name<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>companyName<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resultMap</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意：在上面只需要定义 字段名 和 属性名 不一样的映射，而一样的则不需要专门定义出来。</p>
</blockquote>
</li>
<li>
<p>SQL语句正常编写</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectAll<span class="token punctuation">"</span></span> <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandResultMap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    select *
    from tb_brand;
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_1-2-6-小结" tabindex="-1"><a class="header-anchor" href="#_1-2-6-小结" aria-hidden="true">#</a> 1.2.6  小结</h4>
<p>实体类属性名 和 数据库表列名 不一致，不能自动封装数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">*</span> <span class="token operator">==</span>起别名：<span class="token operator">==</span>在<span class="token constant">SQL</span>语句中，对不一样的列名起别名，别名和实体类属性名一样
  <span class="token operator">*</span> 可以定义 <span class="token operator">&lt;</span>sql<span class="token operator">></span>片段，提升复用性 
<span class="token operator">*</span> <span class="token operator">==</span>resultMap：<span class="token operator">==</span>定义<span class="token operator">&lt;</span>resultMap<span class="token operator">></span> 完成不一致的属性名和列名的映射

而我们最终选择使用 resultMap的方式。查询映射配置文件中查询所有的 statement 书写如下：
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resultMap</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandResultMap<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brand<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
     <span class="token comment">&lt;!--
            id：完成主键字段的映射
                column：表的列名
                property：实体类的属性名
            result：完成一般字段的映射
                column：表的列名
                property：实体类的属性名
        --></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brand_name<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandName<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>company_name<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>companyName<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resultMap</span><span class="token punctuation">></span></span>



<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectAll<span class="token punctuation">"</span></span> <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandResultMap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    select *
    from tb_brand;
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-查询详情" tabindex="-1"><a class="header-anchor" href="#_1-3-查询详情" aria-hidden="true">#</a> 1.3  查询详情</h3>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729180118287.png" alt="image-20210729180118287" style="zoom:80%;" />
<p>有些数据的属性比较多，在页面表格中无法全部实现，而只会显示部分，而其他属性数据的查询可以通过 <code v-pre>查看详情</code> 来进行查询，如上图所示。</p>
<p>查看详情功能实现步骤：</p>
<ul>
<li>
<p>编写接口方法：Mapper接口</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729180604529.png" alt="image-20210729180604529" style="zoom:80%;" />
<ul>
<li>
<p>参数：id</p>
<p>查看详情就是查询某一行数据，所以需要根据id进行查询。而id以后是由页面传递过来。</p>
</li>
<li>
<p>结果：Brand</p>
<p>根据id查询出来的数据只要一条，而将一条数据封装成一个Brand对象即可</p>
</li>
</ul>
</li>
<li>
<p>编写SQL语句：SQL映射文件</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729180709318.png" alt="image-20210729180709318" style="zoom:80%;" />
</li>
<li>
<p>执行方法、进行测试</p>
</li>
</ul>
<h4 id="_1-3-1-编写接口方法" tabindex="-1"><a class="header-anchor" href="#_1-3-1-编写接口方法" aria-hidden="true">#</a> 1.3.1  编写接口方法</h4>
<p>在 <code v-pre>BrandMapper</code> 接口中定义根据id查询数据的方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
  * 查看详情：根据Id查询
  */</span>
<span class="token class-name">Brand</span> <span class="token function">selectById</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-2-编写sql语句" tabindex="-1"><a class="header-anchor" href="#_1-3-2-编写sql语句" aria-hidden="true">#</a> 1.3.2  编写SQL语句</h4>
<p>在 <code v-pre>BrandMapper.xml</code> 映射配置文件中编写 <code v-pre>statement</code>，使用 <code v-pre>resultMap</code> 而不是使用 <code v-pre>resultType</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectById<span class="token punctuation">"</span></span>  <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandResultMap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    select *
    from tb_brand where id = #{id};
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意：上述SQL中的 #{id}先这样写，一会我们再详细讲解</p>
</blockquote>
<h4 id="_1-3-3-编写测试方法" tabindex="-1"><a class="header-anchor" href="#_1-3-3-编写测试方法" aria-hidden="true">#</a> 1.3.3  编写测试方法</h4>
<p>在 <code v-pre>test/java</code> 下的 <code v-pre>com.itheima.mapper</code>  包下的 <code v-pre>MybatisTest类中</code> 定义测试方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> <span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testSelectById</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token comment">//接收参数，该id以后需要传递过来</span>
    <span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token comment">//1. 获取SqlSessionFactory</span>
    <span class="token class-name">String</span> resource <span class="token operator">=</span> <span class="token string">"mybatis-config.xml"</span><span class="token punctuation">;</span>
    <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token class-name">Resources</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SqlSessionFactory</span> sqlSessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//2. 获取SqlSession对象</span>
    <span class="token class-name">SqlSession</span> sqlSession <span class="token operator">=</span> sqlSessionFactory<span class="token punctuation">.</span><span class="token function">openSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//3. 获取Mapper接口的代理对象</span>
    <span class="token class-name">BrandMapper</span> brandMapper <span class="token operator">=</span> sqlSession<span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">BrandMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//4. 执行方法</span>
    <span class="token class-name">Brand</span> brand <span class="token operator">=</span> brandMapper<span class="token punctuation">.</span><span class="token function">selectById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>brand<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//5. 释放资源</span>
    sqlSession<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行测试方法结果如下：</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729182223137.png" alt="image-20210729182223137" style="zoom:70%;" />
<h4 id="_1-3-4-参数占位符" tabindex="-1"><a class="header-anchor" href="#_1-3-4-参数占位符" aria-hidden="true">#</a> 1.3.4  参数占位符</h4>
<p>查询到的结果很好理解就是id为1的这行数据。而这里我们需要看控制台显示的SQL语句，能看到使用？进行占位。说明我们在映射配置文件中的写的 <code v-pre>#{id}</code> 最终会被？进行占位。接下来我们就聊聊映射配置文件中的参数占位符。</p>
<p>mybatis提供了两种参数占位符：</p>
<ul>
<li>
<p>#{} ：执行SQL时，会将 #{} 占位符替换为？，将来自动设置参数值。从上述例子可以看出使用#{} 底层使用的是 <code v-pre>PreparedStatement</code></p>
</li>
<li>
<p>${} ：拼接SQL。底层使用的是 <code v-pre>Statement</code>，会存在SQL注入问题。如下图将 映射配置文件中的 #{} 替换成 ${} 来看效果</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectById<span class="token punctuation">"</span></span>  <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandResultMap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    select *
    from tb_brand where id = ${id};
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新运行查看结果如下：</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729184156019.png" alt="image-20210729184156019" style="zoom:70%;" />
</li>
</ul>
<blockquote>
<p>==注意：==从上面两个例子可以看出，以后开发我们使用 #{} 参数占位符。</p>
</blockquote>
<h4 id="_1-3-5-parametertype使用" tabindex="-1"><a class="header-anchor" href="#_1-3-5-parametertype使用" aria-hidden="true">#</a> 1.3.5  parameterType使用</h4>
<p>对于有参数的mapper接口方法，我们在映射配置文件中应该配置 <code v-pre>ParameterType</code> 来指定参数类型。只不过该属性都可以省略。如下图：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectById<span class="token punctuation">"</span></span> <span class="token attr-name">parameterType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>int<span class="token punctuation">"</span></span> <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandResultMap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    select *
    from tb_brand where id = ${id};
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-6-sql语句中特殊字段处理" tabindex="-1"><a class="header-anchor" href="#_1-3-6-sql语句中特殊字段处理" aria-hidden="true">#</a> 1.3.6  SQL语句中特殊字段处理</h4>
<p>以后肯定会在SQL语句中写一下特殊字符，比如某一个字段大于某个值，如下图</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729184756094.png" alt="image-20210729184756094" style="zoom:80%;" />
<p>可以看出报错了，因为映射配置文件是xml类型的问题，而 &gt; &lt; 等这些字符在xml中有特殊含义，所以此时我们需要将这些符号进行转义，可以使用以下两种方式进行转义</p>
<ul>
<li>
<p>转义字符</p>
<p>下图的 <code v-pre>&amp;lt;</code> 就是 <code v-pre>&lt;</code> 的转义字符。</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729185128686.png" alt="image-20210729185128686" style="zoom:60%;" />
</li>
<li>
<![CDATA[内容]]>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729185030318.png" alt="image-20210729185030318" style="zoom:60%;" />
</li>
</ul>
<h3 id="_1-4-多条件查询" tabindex="-1"><a class="header-anchor" href="#_1-4-多条件查询" aria-hidden="true">#</a> 1.4  多条件查询</h3>
<p><img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729203804276.png" alt="image-20210729203804276"></p>
<p>我们经常会遇到如上图所示的多条件查询，将多条件查询的结果展示在下方的数据列表中。而我们做这个功能需要分析最终的SQL语句应该是什么样，思考两个问题</p>
<ul>
<li>条件表达式</li>
<li>如何连接</li>
</ul>
<p>条件字段 <code v-pre>企业名称</code>  和 <code v-pre>品牌名称</code> 需要进行模糊查询，所以条件应该是：</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729204458815.png" alt="image-20210729204458815" style="zoom:70%;" />
<p>简单的分析后，我们来看功能实现的步骤：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token operator">*</span> 编写接口方法
  <span class="token operator">*</span> 参数：所有查询条件
  <span class="token operator">*</span> 结果：<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Brand</span><span class="token punctuation">></span></span>
<span class="token operator">*</span> 在映射配置文件中编写<span class="token constant">SQL</span>语句
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>编写测试方法并执行</li>
</ul>
<h4 id="_1-4-1-编写接口方法" tabindex="-1"><a class="header-anchor" href="#_1-4-1-编写接口方法" aria-hidden="true">#</a> 1.4.1  编写接口方法</h4>
<p>在 <code v-pre>BrandMapper</code> 接口中定义多条件查询的方法。</p>
<p>而该功能有三个参数，我们就需要考虑定义接口时，参数应该如何定义。Mybatis针对多参数有多种实现</p>
<ul>
<li>
<p>使用 <code v-pre>@Param(&quot;参数名称&quot;)</code> 标记每一个参数，在映射配置文件中就需要使用 <code v-pre>#{参数名称}</code> 进行占位</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Brand</span><span class="token punctuation">></span></span> <span class="token function">selectByCondition</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"status"</span><span class="token punctuation">)</span> <span class="token keyword">int</span> status<span class="token punctuation">,</span> <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"companyName"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> companyName<span class="token punctuation">,</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"brandName"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> brandName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>将多个参数封装成一个 实体对象 ，将该实体对象作为接口的方法参数。该方式要求在映射配置文件的SQL中使用 <code v-pre>#{内容}</code> 时，里面的内容必须和实体类属性名保持一致。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Brand</span><span class="token punctuation">></span></span> <span class="token function">selectByCondition</span><span class="token punctuation">(</span><span class="token class-name">Brand</span> brand<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>将多个参数封装到map集合中，将map集合作为接口的方法参数。该方式要求在映射配置文件的SQL中使用 <code v-pre>#{内容}</code> 时，里面的内容必须和map集合中键的名称一致。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>List&lt;Brand> selectByCondition(Map map);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_1-4-2-编写sql语句" tabindex="-1"><a class="header-anchor" href="#_1-4-2-编写sql语句" aria-hidden="true">#</a> 1.4.2  编写SQL语句</h4>
<p>在 <code v-pre>BrandMapper.xml</code> 映射配置文件中编写 <code v-pre>statement</code>，使用 <code v-pre>resultMap</code> 而不是使用 <code v-pre>resultType</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectByCondition<span class="token punctuation">"</span></span> <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandResultMap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    select *
    from tb_brand
    where status = #{status}
    and company_name like #{companyName}
    and brand_name like #{brandName}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-4-3-编写测试方法" tabindex="-1"><a class="header-anchor" href="#_1-4-3-编写测试方法" aria-hidden="true">#</a> 1.4.3  编写测试方法</h4>
<p>在 <code v-pre>test/java</code> 下的 <code v-pre>com.itheima.mapper</code>  包下的 <code v-pre>MybatisTest类中</code> 定义测试方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testSelectByCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token comment">//接收参数</span>
    <span class="token keyword">int</span> status <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> companyName <span class="token operator">=</span> <span class="token string">"华为"</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> brandName <span class="token operator">=</span> <span class="token string">"华为"</span><span class="token punctuation">;</span>

    <span class="token comment">// 处理参数</span>
    companyName <span class="token operator">=</span> <span class="token string">"%"</span> <span class="token operator">+</span> companyName <span class="token operator">+</span> <span class="token string">"%"</span><span class="token punctuation">;</span>
    brandName <span class="token operator">=</span> <span class="token string">"%"</span> <span class="token operator">+</span> brandName <span class="token operator">+</span> <span class="token string">"%"</span><span class="token punctuation">;</span>

    <span class="token comment">//1. 获取SqlSessionFactory</span>
    <span class="token class-name">String</span> resource <span class="token operator">=</span> <span class="token string">"mybatis-config.xml"</span><span class="token punctuation">;</span>
    <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token class-name">Resources</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SqlSessionFactory</span> sqlSessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//2. 获取SqlSession对象</span>
    <span class="token class-name">SqlSession</span> sqlSession <span class="token operator">=</span> sqlSessionFactory<span class="token punctuation">.</span><span class="token function">openSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//3. 获取Mapper接口的代理对象</span>
    <span class="token class-name">BrandMapper</span> brandMapper <span class="token operator">=</span> sqlSession<span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">BrandMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//4. 执行方法</span>
	<span class="token comment">//方式一 ：接口方法参数使用 @Param 方式调用的方法</span>
    <span class="token comment">//List&lt;Brand> brands = brandMapper.selectByCondition(status, companyName, brandName);</span>
    <span class="token comment">//方式二 ：接口方法参数是 实体类对象 方式调用的方法</span>
     <span class="token comment">//封装对象</span>
    <span class="token comment">/* Brand brand = new Brand();
        brand.setStatus(status);
        brand.setCompanyName(companyName);
        brand.setBrandName(brandName);*/</span>
    
    <span class="token comment">//List&lt;Brand> brands = brandMapper.selectByCondition(brand);</span>
    
    <span class="token comment">//方式三 ：接口方法参数是 map集合对象 方式调用的方法</span>
    <span class="token class-name">Map</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"status"</span> <span class="token punctuation">,</span> status<span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"companyName"</span><span class="token punctuation">,</span> companyName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"brandName"</span> <span class="token punctuation">,</span> brandName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Brand</span><span class="token punctuation">></span></span> brands <span class="token operator">=</span> brandMapper<span class="token punctuation">.</span><span class="token function">selectByCondition</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>brands<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//5. 释放资源</span>
    sqlSession<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-4-4-动态sql" tabindex="-1"><a class="header-anchor" href="#_1-4-4-动态sql" aria-hidden="true">#</a> 1.4.4  动态SQL</h4>
<p>上述功能实现存在很大的问题。用户在输入条件时，肯定不会所有的条件都填写，这个时候我们的SQL语句就不能那样写的</p>
<p>例如用户只输入 当前状态 时，SQL语句就是</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_brand <span class="token keyword">where</span> <span class="token keyword">status</span> <span class="token operator">=</span> <span class="token comment">#{status}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而用户如果只输入企业名称时，SQL语句就是</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_brand <span class="token keyword">where</span> company_name <span class="token operator">like</span> <span class="token comment">#{companName}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而用户如果输入了 <code v-pre>当前状态</code> 和 <code v-pre>企业名称 </code> 时，SQL语句又不一样</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_brand <span class="token keyword">where</span> <span class="token keyword">status</span> <span class="token operator">=</span> <span class="token comment">#{status} and company_name like #{companName}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>针对上述的需要，Mybatis对动态SQL有很强大的支撑：</p>
<blockquote>
<ul>
<li>
<p>if</p>
</li>
<li>
<p>choose (when, otherwise)</p>
</li>
<li>
<p>trim (where, set)</p>
</li>
<li>
<p>foreach</p>
</li>
</ul>
</blockquote>
<p>我们先学习 if 标签和 where 标签：</p>
<ul>
<li>
<p>if 标签：条件判断</p>
<ul>
<li>test 属性：逻辑表达式</li>
</ul>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectByCondition<span class="token punctuation">"</span></span> <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandResultMap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    select *
    from tb_brand
    where
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>status != null<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            and status = #{status}
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>companyName != null and companyName != '' <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            and company_name like #{companyName}
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandName != null and brandName != '' <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            and brand_name like #{brandName}
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上的这种SQL语句就会根据传递的参数值进行动态的拼接。如果此时status和companyName有值那么就会值拼接这两个条件。</p>
<p>执行结果如下：</p>
<p><img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729212510291.png" alt="image-20210729212510291"></p>
<p>但是它也存在问题，如果此时给的参数值是</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Map</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// map.put("status" , status);</span>
map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"companyName"</span><span class="token punctuation">,</span> companyName<span class="token punctuation">)</span><span class="token punctuation">;</span>
map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"brandName"</span> <span class="token punctuation">,</span> brandName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拼接的SQL语句就变成了</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_brand <span class="token keyword">where</span> <span class="token operator">and</span> company_name <span class="token operator">like</span> ? <span class="token operator">and</span> brand_name <span class="token operator">like</span> ?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而上面的语句中 where 关键后直接跟 and 关键字，这就是一条错误的SQL语句。这个就可以使用 where 标签解决</p>
</li>
<li>
<p>where 标签</p>
<ul>
<li>作用：
<ul>
<li>替换where关键字</li>
<li>会动态的去掉第一个条件前的 and</li>
<li>如果所有的参数没有值则不加where关键字</li>
</ul>
</li>
</ul>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectByCondition<span class="token punctuation">"</span></span> <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandResultMap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    select *
    from tb_brand
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>where</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>status != null<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            and status = #{status}
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>companyName != null and companyName != '' <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            and company_name like #{companyName}
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandName != null and brandName != '' <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            and brand_name like #{brandName}
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>where</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意：需要给每个条件前都加上 and 关键字。</p>
</blockquote>
</li>
</ul>
<h3 id="_1-5-单个条件-动态sql" tabindex="-1"><a class="header-anchor" href="#_1-5-单个条件-动态sql" aria-hidden="true">#</a> 1.5 单个条件（动态SQL）</h3>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729213613029.png" alt="image-20210729213613029" style="zoom:80%;" />
<p>如上图所示，在查询时只能选择 <code v-pre>品牌名称</code>、<code v-pre>当前状态</code>、<code v-pre>企业名称</code> 这三个条件中的一个，但是用户到底选择哪儿一个，我们并不能确定。这种就属于单个条件的动态SQL语句。</p>
<p>这种需求需要使用到  <code v-pre>choose（when，otherwise）标签</code>  实现，  而 <code v-pre>choose</code> 标签类似于Java 中的switch语句。</p>
<p>通过一个案例来使用这些标签</p>
<h4 id="_1-5-1-编写接口方法" tabindex="-1"><a class="header-anchor" href="#_1-5-1-编写接口方法" aria-hidden="true">#</a> 1.5.1  编写接口方法</h4>
<p>在 <code v-pre>BrandMapper</code> 接口中定义单条件查询的方法。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
  * 单条件动态查询
  * <span class="token keyword">@param</span> <span class="token parameter">brand</span>
  * <span class="token keyword">@return</span>
  */</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Brand</span><span class="token punctuation">></span></span> <span class="token function">selectByConditionSingle</span><span class="token punctuation">(</span><span class="token class-name">Brand</span> brand<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-5-2-编写sql语句" tabindex="-1"><a class="header-anchor" href="#_1-5-2-编写sql语句" aria-hidden="true">#</a> 1.5.2  编写SQL语句</h4>
<p>在 <code v-pre>BrandMapper.xml</code> 映射配置文件中编写 <code v-pre>statement</code>，使用 <code v-pre>resultMap</code> 而不是使用 <code v-pre>resultType</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectByConditionSingle<span class="token punctuation">"</span></span> <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandResultMap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    select *
    from tb_brand
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>where</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>choose</span><span class="token punctuation">></span></span><span class="token comment">&lt;!--相当于switch--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>when</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>status != null<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token comment">&lt;!--相当于case--></span>
                status = #{status}
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>when</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>when</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>companyName != null and companyName != '' <span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token comment">&lt;!--相当于case--></span>
                company_name like #{companyName}
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>when</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>when</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandName != null and brandName != ''<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token comment">&lt;!--相当于case--></span>
                brand_name like #{brandName}
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>when</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>choose</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>where</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-5-3-编写测试方法" tabindex="-1"><a class="header-anchor" href="#_1-5-3-编写测试方法" aria-hidden="true">#</a> 1.5.3  编写测试方法</h4>
<p>在 <code v-pre>test/java</code> 下的 <code v-pre>com.itheima.mapper</code>  包下的 <code v-pre>MybatisTest类中</code> 定义测试方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testSelectByConditionSingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token comment">//接收参数</span>
    <span class="token keyword">int</span> status <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> companyName <span class="token operator">=</span> <span class="token string">"华为"</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> brandName <span class="token operator">=</span> <span class="token string">"华为"</span><span class="token punctuation">;</span>

    <span class="token comment">// 处理参数</span>
    companyName <span class="token operator">=</span> <span class="token string">"%"</span> <span class="token operator">+</span> companyName <span class="token operator">+</span> <span class="token string">"%"</span><span class="token punctuation">;</span>
    brandName <span class="token operator">=</span> <span class="token string">"%"</span> <span class="token operator">+</span> brandName <span class="token operator">+</span> <span class="token string">"%"</span><span class="token punctuation">;</span>

    <span class="token comment">//封装对象</span>
    <span class="token class-name">Brand</span> brand <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Brand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//brand.setStatus(status);</span>
    brand<span class="token punctuation">.</span><span class="token function">setCompanyName</span><span class="token punctuation">(</span>companyName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//brand.setBrandName(brandName);</span>

    <span class="token comment">//1. 获取SqlSessionFactory</span>
    <span class="token class-name">String</span> resource <span class="token operator">=</span> <span class="token string">"mybatis-config.xml"</span><span class="token punctuation">;</span>
    <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token class-name">Resources</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SqlSessionFactory</span> sqlSessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//2. 获取SqlSession对象</span>
    <span class="token class-name">SqlSession</span> sqlSession <span class="token operator">=</span> sqlSessionFactory<span class="token punctuation">.</span><span class="token function">openSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//3. 获取Mapper接口的代理对象</span>
    <span class="token class-name">BrandMapper</span> brandMapper <span class="token operator">=</span> sqlSession<span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">BrandMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//4. 执行方法</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Brand</span><span class="token punctuation">></span></span> brands <span class="token operator">=</span> brandMapper<span class="token punctuation">.</span><span class="token function">selectByConditionSingle</span><span class="token punctuation">(</span>brand<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>brands<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//5. 释放资源</span>
    sqlSession<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行测试方法结果如下：</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729214548756.png" alt="image-20210729214548756" style="zoom:70%;" />
<h3 id="_1-6-添加数据" tabindex="-1"><a class="header-anchor" href="#_1-6-添加数据" aria-hidden="true">#</a> 1.6  添加数据</h3>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729214917317.png" alt="image-20210729214917317" style="zoom:70%;" />
<p>如上图是我们平时在添加数据时展示的页面，而我们在该页面输入想要的数据后添加 <code v-pre>提交</code> 按钮，就会将这些数据添加到数据库中。接下来我们就来实现添加数据的操作。</p>
<ul>
<li>
<p>编写接口方法</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729215351651.png" alt="image-20210729215351651" style="zoom:80%;" />
<p>参数：除了id之外的所有的数据。id对应的是表中主键值，而主键我们是 ==自动增长== 生成的。</p>
</li>
<li>
<p>编写SQL语句</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729215537167.png" alt="image-20210729215537167" style="zoom:80%;" />
</li>
<li>
<p>编写测试方法并执行</p>
</li>
</ul>
<p>明确了该功能实现的步骤后，接下来我们进行具体的操作。</p>
<h4 id="_1-6-1-编写接口方法" tabindex="-1"><a class="header-anchor" href="#_1-6-1-编写接口方法" aria-hidden="true">#</a> 1.6.1  编写接口方法</h4>
<p>在 <code v-pre>BrandMapper</code> 接口中定义添加方法。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> <span class="token doc-comment comment">/**
   * 添加
   */</span>
<span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Brand</span> brand<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-6-2-编写sql语句" tabindex="-1"><a class="header-anchor" href="#_1-6-2-编写sql语句" aria-hidden="true">#</a> 1.6.2  编写SQL语句</h4>
<p>在 <code v-pre>BrandMapper.xml</code> 映射配置文件中编写添加数据的 <code v-pre>statement</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>insert</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>add<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    insert into tb_brand (brand_name, company_name, ordered, description, status)
    values (#{brandName}, #{companyName}, #{ordered}, #{description}, #{status});
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>insert</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-6-3-编写测试方法" tabindex="-1"><a class="header-anchor" href="#_1-6-3-编写测试方法" aria-hidden="true">#</a> 1.6.3  编写测试方法</h4>
<p>在 <code v-pre>test/java</code> 下的 <code v-pre>com.itheima.mapper</code>  包下的 <code v-pre>MybatisTest类中</code> 定义测试方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testAdd</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token comment">//接收参数</span>
    <span class="token keyword">int</span> status <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> companyName <span class="token operator">=</span> <span class="token string">"波导手机"</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> brandName <span class="token operator">=</span> <span class="token string">"波导"</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> description <span class="token operator">=</span> <span class="token string">"手机中的战斗机"</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> ordered <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

    <span class="token comment">//封装对象</span>
    <span class="token class-name">Brand</span> brand <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Brand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    brand<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>
    brand<span class="token punctuation">.</span><span class="token function">setCompanyName</span><span class="token punctuation">(</span>companyName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    brand<span class="token punctuation">.</span><span class="token function">setBrandName</span><span class="token punctuation">(</span>brandName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    brand<span class="token punctuation">.</span><span class="token function">setDescription</span><span class="token punctuation">(</span>description<span class="token punctuation">)</span><span class="token punctuation">;</span>
    brand<span class="token punctuation">.</span><span class="token function">setOrdered</span><span class="token punctuation">(</span>ordered<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//1. 获取SqlSessionFactory</span>
    <span class="token class-name">String</span> resource <span class="token operator">=</span> <span class="token string">"mybatis-config.xml"</span><span class="token punctuation">;</span>
    <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token class-name">Resources</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SqlSessionFactory</span> sqlSessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//2. 获取SqlSession对象</span>
    <span class="token class-name">SqlSession</span> sqlSession <span class="token operator">=</span> sqlSessionFactory<span class="token punctuation">.</span><span class="token function">openSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//SqlSession sqlSession = sqlSessionFactory.openSession(true); //设置自动提交事务，这种情况不需要手动提交事务了</span>
    <span class="token comment">//3. 获取Mapper接口的代理对象</span>
    <span class="token class-name">BrandMapper</span> brandMapper <span class="token operator">=</span> sqlSession<span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">BrandMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//4. 执行方法</span>
    brandMapper<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>brand<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//提交事务</span>
    sqlSession<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//5. 释放资源</span>
    sqlSession<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下：</p>
<p><img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729220348255.png" alt="image-20210729220348255"></p>
<h4 id="_1-6-4-添加-主键返回" tabindex="-1"><a class="header-anchor" href="#_1-6-4-添加-主键返回" aria-hidden="true">#</a> 1.6.4  添加-主键返回</h4>
<p>在数据添加成功后，有时候需要获取插入数据库数据的主键（主键是自增长）。</p>
<p>比如：添加订单和订单项，如下图就是京东上的订单</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729221207962.png" alt="image-20210729221207962" style="zoom:80%;" />
<p>订单数据存储在订单表中，订单项存储在订单项表中。</p>
<ul>
<li>
<p>添加订单数据</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729221049462.png" alt="image-20210729221049462" style="zoom:80%;" />
</li>
<li>
<p>添加订单项数据，订单项中需要设置所属订单的id</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729221058898.png" alt="image-20210729221058898" style="zoom:80%;" />
</li>
</ul>
<p>明白了什么时候 <code v-pre>主键返回</code> 。接下来我们简单模拟一下，在添加完数据后打印id属性值，能打印出来说明已经获取到了。</p>
<p>我们将上面添加品牌数据的案例中映射配置文件里 <code v-pre>statement</code> 进行修改，如下</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>insert</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>add<span class="token punctuation">"</span></span> <span class="token attr-name">useGeneratedKeys</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span> <span class="token attr-name">keyProperty</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    insert into tb_brand (brand_name, company_name, ordered, description, status)
    values (#{brandName}, #{companyName}, #{ordered}, #{description}, #{status});
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>insert</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>在 insert 标签上添加如下属性：</p>
<ul>
<li>useGeneratedKeys：是够获取自动增长的主键值。true表示获取</li>
<li>keyProperty  ：指定将获取到的主键值封装到哪儿个属性里</li>
</ul>
</blockquote>
<h3 id="_1-7-修改" tabindex="-1"><a class="header-anchor" href="#_1-7-修改" aria-hidden="true">#</a> 1.7  修改</h3>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729222642700.png" alt="image-20210729222642700" style="zoom:80%;" />
<p>如图所示是修改页面，用户在该页面书写需要修改的数据，点击 <code v-pre>提交</code> 按钮，就会将数据库中对应的数据进行修改。注意一点，如果哪儿个输入框没有输入内容，我们是将表中数据对应字段值替换为空白还是保留字段之前的值？答案肯定是保留之前的数据。</p>
<p>接下来我们就具体来实现</p>
<h4 id="_1-7-1-编写接口方法" tabindex="-1"><a class="header-anchor" href="#_1-7-1-编写接口方法" aria-hidden="true">#</a> 1.7.1  编写接口方法</h4>
<p>在 <code v-pre>BrandMapper</code> 接口中定义修改方法。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> <span class="token doc-comment comment">/**
   * 修改
   */</span>
<span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">Brand</span> brand<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>上述方法参数 Brand 就是封装了需要修改的数据，而id肯定是有数据的，这也是和添加方法的区别。</p>
</blockquote>
<h4 id="_1-7-2-编写sql语句" tabindex="-1"><a class="header-anchor" href="#_1-7-2-编写sql语句" aria-hidden="true">#</a> 1.7.2  编写SQL语句</h4>
<p>在 <code v-pre>BrandMapper.xml</code> 映射配置文件中编写修改数据的 <code v-pre>statement</code>。</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>update</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>update<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    update tb_brand
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>set</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>brandName != null and brandName != ''<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            brand_name = #{brandName},
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>companyName != null and companyName != ''<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            company_name = #{companyName},
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ordered != null<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            ordered = #{ordered},
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>description != null and description != ''<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            description = #{description},
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>status != null<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            status = #{status}
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>set</span><span class="token punctuation">></span></span>
    where id = #{id};
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>update</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><em>set</em> 标签可以用于动态包含需要更新的列，忽略其它不更新的列。</p>
</blockquote>
<h4 id="_1-7-3-编写测试方法" tabindex="-1"><a class="header-anchor" href="#_1-7-3-编写测试方法" aria-hidden="true">#</a> 1.7.3  编写测试方法</h4>
<p>在 <code v-pre>test/java</code> 下的 <code v-pre>com.itheima.mapper</code>  包下的 <code v-pre>MybatisTest类中</code> 定义测试方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token comment">//接收参数</span>
    <span class="token keyword">int</span> status <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> companyName <span class="token operator">=</span> <span class="token string">"波导手机"</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> brandName <span class="token operator">=</span> <span class="token string">"波导"</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> description <span class="token operator">=</span> <span class="token string">"波导手机,手机中的战斗机"</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> ordered <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>

    <span class="token comment">//封装对象</span>
    <span class="token class-name">Brand</span> brand <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Brand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    brand<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//        brand.setCompanyName(companyName);</span>
    <span class="token comment">//        brand.setBrandName(brandName);</span>
    <span class="token comment">//        brand.setDescription(description);</span>
    <span class="token comment">//        brand.setOrdered(ordered);</span>
    brand<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//1. 获取SqlSessionFactory</span>
    <span class="token class-name">String</span> resource <span class="token operator">=</span> <span class="token string">"mybatis-config.xml"</span><span class="token punctuation">;</span>
    <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token class-name">Resources</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SqlSessionFactory</span> sqlSessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//2. 获取SqlSession对象</span>
    <span class="token class-name">SqlSession</span> sqlSession <span class="token operator">=</span> sqlSessionFactory<span class="token punctuation">.</span><span class="token function">openSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//SqlSession sqlSession = sqlSessionFactory.openSession(true);</span>
    <span class="token comment">//3. 获取Mapper接口的代理对象</span>
    <span class="token class-name">BrandMapper</span> brandMapper <span class="token operator">=</span> sqlSession<span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">BrandMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//4. 执行方法</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> brandMapper<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>brand<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//提交事务</span>
    sqlSession<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//5. 释放资源</span>
    sqlSession<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行测试方法结果如下：</p>
<p><img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729224205522.png" alt="image-20210729224205522"></p>
<p>从结果中SQL语句可以看出，只修改了 <code v-pre>status</code>  字段值，因为我们给的数据中只给Brand实体对象的 <code v-pre>status</code> 属性设置值了。这就是 <code v-pre>set</code> 标签的作用。</p>
<h3 id="_1-8-删除一行数据" tabindex="-1"><a class="header-anchor" href="#_1-8-删除一行数据" aria-hidden="true">#</a> 1.8  删除一行数据</h3>
<p><img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729224549305.png" alt="image-20210729224549305"></p>
<p>如上图所示，每行数据后面都有一个 <code v-pre>删除</code> 按钮，当用户点击了该按钮，就会将改行数据删除掉。那我们就需要思考，这种删除是根据什么进行删除呢？是通过主键id删除，因为id是表中数据的唯一标识。</p>
<p>接下来就来实现该功能。</p>
<h4 id="_1-8-1-编写接口方法" tabindex="-1"><a class="header-anchor" href="#_1-8-1-编写接口方法" aria-hidden="true">#</a> 1.8.1  编写接口方法</h4>
<p>在 <code v-pre>BrandMapper</code> 接口中定义根据id删除方法。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
  * 根据id删除
  */</span>
<span class="token keyword">void</span> <span class="token function">deleteById</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-8-2-编写sql语句" tabindex="-1"><a class="header-anchor" href="#_1-8-2-编写sql语句" aria-hidden="true">#</a> 1.8.2  编写SQL语句</h4>
<p>在 <code v-pre>BrandMapper.xml</code> 映射配置文件中编写删除一行数据的 <code v-pre>statement</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>delete</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>deleteById<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    delete from tb_brand where id = #{id};
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>delete</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-8-3-编写测试方法" tabindex="-1"><a class="header-anchor" href="#_1-8-3-编写测试方法" aria-hidden="true">#</a> 1.8.3  编写测试方法</h4>
<p>在 <code v-pre>test/java</code> 下的 <code v-pre>com.itheima.mapper</code>  包下的 <code v-pre>MybatisTest类中</code> 定义测试方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> <span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testDeleteById</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token comment">//接收参数</span>
    <span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>

    <span class="token comment">//1. 获取SqlSessionFactory</span>
    <span class="token class-name">String</span> resource <span class="token operator">=</span> <span class="token string">"mybatis-config.xml"</span><span class="token punctuation">;</span>
    <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token class-name">Resources</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SqlSessionFactory</span> sqlSessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//2. 获取SqlSession对象</span>
    <span class="token class-name">SqlSession</span> sqlSession <span class="token operator">=</span> sqlSessionFactory<span class="token punctuation">.</span><span class="token function">openSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//SqlSession sqlSession = sqlSessionFactory.openSession(true);</span>
    <span class="token comment">//3. 获取Mapper接口的代理对象</span>
    <span class="token class-name">BrandMapper</span> brandMapper <span class="token operator">=</span> sqlSession<span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">BrandMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//4. 执行方法</span>
    brandMapper<span class="token punctuation">.</span><span class="token function">deleteById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//提交事务</span>
    sqlSession<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//5. 释放资源</span>
    sqlSession<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行过程只要没报错，直接到数据库查询数据是否还存在。</p>
<h3 id="_1-9-批量删除" tabindex="-1"><a class="header-anchor" href="#_1-9-批量删除" aria-hidden="true">#</a> 1.9  批量删除</h3>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210729225713894.png" alt="image-20210729225713894" style="zoom:70%;" />
<p>如上图所示，用户可以选择多条数据，然后点击上面的 <code v-pre>删除</code> 按钮，就会删除数据库中对应的多行数据。</p>
<h4 id="_1-9-1-编写接口方法" tabindex="-1"><a class="header-anchor" href="#_1-9-1-编写接口方法" aria-hidden="true">#</a> 1.9.1  编写接口方法</h4>
<p>在 <code v-pre>BrandMapper</code> 接口中定义删除多行数据的方法。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
  * 批量删除
  */</span>
<span class="token keyword">void</span> <span class="token function">deleteByIds</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ids<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>参数是一个数组，数组中存储的是多条数据的id</p>
</blockquote>
<h4 id="_1-9-2-编写sql语句" tabindex="-1"><a class="header-anchor" href="#_1-9-2-编写sql语句" aria-hidden="true">#</a> 1.9.2  编写SQL语句</h4>
<p>在 <code v-pre>BrandMapper.xml</code> 映射配置文件中编写删除多条数据的 <code v-pre>statement</code>。</p>
<p>编写SQL时需要遍历数组来拼接SQL语句。Mybatis 提供了 <code v-pre>foreach</code> 标签供我们使用</p>
<p><strong>foreach 标签</strong></p>
<p>用来迭代任何可迭代的对象（如数组，集合）。</p>
<ul>
<li>collection 属性：
<ul>
<li>mybatis会将数组参数，封装为一个Map集合。
<ul>
<li>默认：array = 数组</li>
<li>使用@Param注解改变map集合的默认key的名称</li>
</ul>
</li>
</ul>
</li>
<li>item 属性：本次迭代获取到的元素。</li>
<li>separator 属性：集合项迭代之间的分隔符。<code v-pre>foreach</code> 标签不会错误地添加多余的分隔符。也就是最后一次迭代不会加分隔符。</li>
<li>open 属性：该属性值是在拼接SQL语句之前拼接的语句，只会拼接一次</li>
<li>close 属性：该属性值是在拼接SQL语句拼接后拼接的语句，只会拼接一次</li>
</ul>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>delete</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>deleteByIds<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    delete from tb_brand where id
    in
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>foreach</span> <span class="token attr-name">collection</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>array<span class="token punctuation">"</span></span> <span class="token attr-name">item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token attr-name">separator</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>,<span class="token punctuation">"</span></span> <span class="token attr-name">open</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(<span class="token punctuation">"</span></span> <span class="token attr-name">close</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        #{id}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>foreach</span><span class="token punctuation">></span></span>
    ;
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>delete</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>假如数组中的id数据是{1,2,3}，那么拼接后的sql语句就是：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">delete</span> <span class="token keyword">from</span> tb_brand <span class="token keyword">where</span> id <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<h4 id="_1-9-3-编写测试方法" tabindex="-1"><a class="header-anchor" href="#_1-9-3-编写测试方法" aria-hidden="true">#</a> 1.9.3  编写测试方法</h4>
<p>在 <code v-pre>test/java</code> 下的 <code v-pre>com.itheima.mapper</code>  包下的 <code v-pre>MybatisTest类中</code> 定义测试方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testDeleteByIds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token comment">//接收参数</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ids <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">//1. 获取SqlSessionFactory</span>
    <span class="token class-name">String</span> resource <span class="token operator">=</span> <span class="token string">"mybatis-config.xml"</span><span class="token punctuation">;</span>
    <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token class-name">Resources</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SqlSessionFactory</span> sqlSessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//2. 获取SqlSession对象</span>
    <span class="token class-name">SqlSession</span> sqlSession <span class="token operator">=</span> sqlSessionFactory<span class="token punctuation">.</span><span class="token function">openSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//SqlSession sqlSession = sqlSessionFactory.openSession(true);</span>
    <span class="token comment">//3. 获取Mapper接口的代理对象</span>
    <span class="token class-name">BrandMapper</span> brandMapper <span class="token operator">=</span> sqlSession<span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span><span class="token class-name">BrandMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//4. 执行方法</span>
    brandMapper<span class="token punctuation">.</span><span class="token function">deleteByIds</span><span class="token punctuation">(</span>ids<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//提交事务</span>
    sqlSession<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//5. 释放资源</span>
    sqlSession<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-10-mybatis参数传递" tabindex="-1"><a class="header-anchor" href="#_1-10-mybatis参数传递" aria-hidden="true">#</a> 1.10  Mybatis参数传递</h3>
<p>Mybatis 接口方法中可以接收各种各样的参数，如下：</p>
<ul>
<li>多个参数</li>
<li>单个参数：单个参数又可以是如下类型
<ul>
<li>POJO 类型</li>
<li>Map 集合类型</li>
<li>Collection 集合类型</li>
<li>List 集合类型</li>
<li>Array 类型</li>
<li>其他类型</li>
</ul>
</li>
</ul>
<h4 id="_1-10-1-多个参数" tabindex="-1"><a class="header-anchor" href="#_1-10-1-多个参数" aria-hidden="true">#</a> 1.10.1  多个参数</h4>
<p>如下面的代码，就是接收两个参数，而接收多个参数需要使用 <code v-pre>@Param</code> 注解，那么为什么要加该注解呢？这个问题要弄明白就必须来研究Mybatis 底层对于这些参数是如何处理的。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">User</span> <span class="token function">select</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> username<span class="token punctuation">,</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"password"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>select<span class="token punctuation">"</span></span> <span class="token attr-name">resultType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	select *
    from tb_user
    where 
    	username=#{username}
    	and password=#{password}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在接口方法中定义多个参数，Mybatis 会将这些参数封装成 Map 集合对象，值就是参数值，而键在没有使用 <code v-pre>@Param</code> 注解时有以下命名规则：</p>
<ul>
<li>
<p>以 arg 开头  ：第一个参数就叫 arg0，第二个参数就叫 arg1，以此类推。如：</p>
<blockquote>
<p>map.put(&quot;arg0&quot;，参数值1);</p>
<p>map.put(&quot;arg1&quot;，参数值2);</p>
</blockquote>
</li>
<li>
<p>以 param 开头 ： 第一个参数就叫 param1，第二个参数就叫 param2，依次类推。如：</p>
<blockquote>
<p>map.put(&quot;param1&quot;，参数值1);</p>
<p>map.put(&quot;param2&quot;，参数值2);</p>
</blockquote>
</li>
</ul>
<p><strong>代码验证：</strong></p>
<ul>
<li>
<p>在 <code v-pre>UserMapper</code> 接口中定义如下方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">User</span> <span class="token function">select</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span><span class="token class-name">String</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>在 <code v-pre>UserMapper.xml</code> 映射配置文件中定义SQL</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>select<span class="token punctuation">"</span></span> <span class="token attr-name">resultType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	select *
    from tb_user
    where 
    	username=#{arg0}
    	and password=#{arg1}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>select<span class="token punctuation">"</span></span> <span class="token attr-name">resultType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	select *
    from tb_user
    where 
    	username=#{param1}
    	and password=#{param2}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>运行代码结果如下</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210805230303461.png" alt="image-20210805230303461" style="zoom:80%;" />
<p>在映射配合文件的SQL语句中使用用 <code v-pre>arg</code> 开头的和 <code v-pre>param</code> 书写，代码的可读性会变的特别差，此时可以使用 <code v-pre>@Param</code> 注解。</p>
</li>
</ul>
<p>在接口方法参数上使用 <code v-pre>@Param</code> 注解，Mybatis 会将 <code v-pre>arg</code> 开头的键名替换为对应注解的属性值。</p>
<p><strong>代码验证：</strong></p>
<ul>
<li>
<p>在 <code v-pre>UserMapper</code> 接口中定义如下方法，在 <code v-pre>username</code> 参数前加上 <code v-pre>@Param</code> 注解</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">User</span> <span class="token function">select</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Mybatis 在封装 Map 集合时，键名就会变成如下：</p>
<blockquote>
<p>map.put(&quot;username&quot;，参数值1);</p>
<p>map.put(&quot;arg1&quot;，参数值2);</p>
<p>map.put(&quot;param1&quot;，参数值1);</p>
<p>map.put(&quot;param2&quot;，参数值2);</p>
</blockquote>
</li>
<li>
<p>在 <code v-pre>UserMapper.xml</code> 映射配置文件中定义SQL</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>select<span class="token punctuation">"</span></span> <span class="token attr-name">resultType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	select *
    from tb_user
    where 
    	username=#{username}
    	and password=#{param2}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>运行程序结果没有报错。而如果将 <code v-pre>#{}</code> 中的 <code v-pre>username</code> 还是写成  <code v-pre>arg0</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>select<span class="token punctuation">"</span></span> <span class="token attr-name">resultType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	select *
    from tb_user
    where 
    	username=#{arg0}
    	and password=#{param2}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>运行程序则可以看到错误</p>
<p><img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210805231727206.png" alt="image-20210805231727206"></p>
</li>
</ul>
<p>==结论：以后接口参数是多个时，在每个参数上都使用 <code v-pre>@Param</code> 注解。这样代码的可读性更高。==</p>
<h4 id="_1-10-2-单个参数" tabindex="-1"><a class="header-anchor" href="#_1-10-2-单个参数" aria-hidden="true">#</a> 1.10.2  单个参数</h4>
<ul>
<li>
<p>POJO 类型</p>
<p>直接使用。要求 <code v-pre>属性名</code> 和 <code v-pre>参数占位符名称</code> 一致</p>
</li>
<li>
<p>Map 集合类型</p>
<p>直接使用。要求 <code v-pre>map集合的键名</code> 和 <code v-pre>参数占位符名称</code> 一致</p>
</li>
<li>
<p>Collection 集合类型</p>
<p>Mybatis 会将集合封装到 map 集合中，如下：</p>
<blockquote>
<p>map.put(&quot;arg0&quot;，collection集合);</p>
<p>map.put(&quot;collection&quot;，collection集合;</p>
</blockquote>
<p>==可以使用 <code v-pre>@Param</code> 注解替换map集合中默认的 arg 键名。==</p>
</li>
<li>
<p>List 集合类型</p>
<p>Mybatis 会将集合封装到 map 集合中，如下：</p>
<blockquote>
<p>map.put(&quot;arg0&quot;，list集合);</p>
<p>map.put(&quot;collection&quot;，list集合);</p>
<p>map.put(&quot;list&quot;，list集合);</p>
</blockquote>
<p>==可以使用 <code v-pre>@Param</code> 注解替换map集合中默认的 arg 键名。==</p>
</li>
<li>
<p>Array 类型</p>
<p>Mybatis 会将集合封装到 map 集合中，如下：</p>
<blockquote>
<p>map.put(&quot;arg0&quot;，数组);</p>
<p>map.put(&quot;array&quot;，数组);</p>
</blockquote>
<p>==可以使用 <code v-pre>@Param</code> 注解替换map集合中默认的 arg 键名。==</p>
</li>
<li>
<p>其他类型</p>
<p>比如int类型，<code v-pre>参数占位符名称</code> 叫什么都可以。尽量做到见名知意</p>
</li>
</ul>
<h2 id="_2-注解实现crud" tabindex="-1"><a class="header-anchor" href="#_2-注解实现crud" aria-hidden="true">#</a> 2，注解实现CRUD</h2>
<p>使用注解开发会比配置文件开发更加方便。如下就是使用注解进行开发</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"select * from tb_user where id = #{id}"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">select</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>==注意：==</p>
<ul>
<li>注解是用来替换映射配置文件方式配置的，所以使用了注解，就不需要再映射配置文件中书写对应的 <code v-pre>statement</code></li>
</ul>
</blockquote>
<p>Mybatis 针对 CURD 操作都提供了对应的注解，已经做到见名知意。如下：</p>
<ul>
<li>查询 ：@Select</li>
<li>添加 ：@Insert</li>
<li>修改 ：@Update</li>
<li>删除 ：@Delete</li>
</ul>
<p>接下来我们做一个案例来使用 Mybatis 的注解开发</p>
<p><strong>代码实现：</strong></p>
<ul>
<li>
<p>将之前案例中 <code v-pre>UserMapper.xml</code> 中的 根据id查询数据 的 <code v-pre>statement</code> 注释掉</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210805235229938.png" alt="image-20210805235229938" style="zoom:70%;" />
</li>
<li>
<p>在 <code v-pre>UserMapper</code> 接口的 <code v-pre>selectById</code> 方法上添加注解</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210805235405070.png" alt="image-20210805235405070" style="zoom:70%;" />
</li>
<li>
<p>运行测试程序也能正常查询到数据</p>
</li>
</ul>
<p>我们课程上只演示这一个查询的注解开发，其他的同学们下来可以自己实现，都是比较简单。</p>
<p>==注意：==在官方文档中 <code v-pre>入门</code> 中有这样的一段话：</p>
<p><img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210805234302849.png" alt="image-20210805234302849"></p>
<p>所以，==注解完成简单功能，配置文件完成复杂功能。==</p>
<p>而我们之前写的动态 SQL 就是复杂的功能，如果用注解使用的话，就需要使用到 Mybatis 提供的SQL构建器来完成，而对应的代码如下：</p>
<img src="@source/java/java-03/day05-Mybatis/讲义/assets/image-20210805234842497.png" alt="image-20210805234842497" style="zoom:70%;" />
<p>上述代码将java代码和SQL语句融到了一块，使得代码的可读性大幅度降低。</p>
</div></template>


