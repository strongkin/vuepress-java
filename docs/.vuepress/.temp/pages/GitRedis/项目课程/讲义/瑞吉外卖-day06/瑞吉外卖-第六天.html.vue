<template><div><h1 id="瑞吉外卖-第六天" tabindex="-1"><a class="header-anchor" href="#瑞吉外卖-第六天" aria-hidden="true">#</a> 瑞吉外卖-第六天</h1>
<h2 id="课程内容" tabindex="-1"><a class="header-anchor" href="#课程内容" aria-hidden="true">#</a> 课程内容</h2>
<ul>
<li>用户地址簿功能</li>
<li>菜品展示</li>
<li>购物车</li>
<li>下单</li>
</ul>
<h2 id="_1-用户地址簿功能" tabindex="-1"><a class="header-anchor" href="#_1-用户地址簿功能" aria-hidden="true">#</a> 1. 用户地址簿功能</h2>
<h3 id="_1-1-需求分析" tabindex="-1"><a class="header-anchor" href="#_1-1-需求分析" aria-hidden="true">#</a> 1.1 需求分析</h3>
<p>地址簿，指的是移动端消费者用户的地址信息，用户登录成功后可以维护自己的地址信息。同一个用户可以有多个地址信息，但是只能有一个<strong>默认地址</strong>。</p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812191332892.png" alt="image-20210812191332892" style="zoom: 67%;" />  
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812191822693.png" alt="image-20210812191822693" style="zoom:67%;" /> 
<p>对于地址簿管理，我们需要实现以下几个功能：</p>
<ul>
<li>新增地址</li>
<li>地址列表查询</li>
<li>设置默认地址</li>
<li>编辑地址</li>
<li>删除地址</li>
</ul>
<h3 id="_1-2-数据模型" tabindex="-1"><a class="header-anchor" href="#_1-2-数据模型" aria-hidden="true">#</a> 1.2 数据模型</h3>
<p>用户的地址信息会存储在address_book表，即地址簿表中。具体表结构如下：</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812192228678.png" alt="image-20210812192228678"></p>
<p>这里面有一个字段is_default，实际上我们在设置默认地址时，只需要更新这个字段就可以了。</p>
<h3 id="_1-3-导入功能代码" tabindex="-1"><a class="header-anchor" href="#_1-3-导入功能代码" aria-hidden="true">#</a> 1.3 导入功能代码</h3>
<p>对于这一类的单表的增删改查，我们已经写过很多了，基本的开发思路都是一样的，那么本小节的用户地址簿管理的增删改查功能，我们就不再一一实现了，基本的代码我们都已经提供了，直接导入进来，做一个测试即可。</p>
<p>对于下面的地址管理的代码，我们可以直接从资料拷贝，也可以直接从下面的讲义中复制。</p>
<p><strong>1). 实体类 AddressBook（直接从课程资料中导入即可）</strong></p>
<p>所属包: com.itheima.reggie.entity</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">FieldFill</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">TableField</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">Serializable</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">LocalDateTime</span></span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * 地址簿
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AddressBook</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
	
    <span class="token comment">//用户id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> userId<span class="token punctuation">;</span>
	
    <span class="token comment">//收货人</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> consignee<span class="token punctuation">;</span>
	
    <span class="token comment">//手机号</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> phone<span class="token punctuation">;</span>
	
    <span class="token comment">//性别 0 女 1 男</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> sex<span class="token punctuation">;</span>
	
    <span class="token comment">//省级区划编号</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> provinceCode<span class="token punctuation">;</span>
	
    <span class="token comment">//省级名称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> provinceName<span class="token punctuation">;</span>
	
    <span class="token comment">//市级区划编号</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> cityCode<span class="token punctuation">;</span>
	
    <span class="token comment">//市级名称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> cityName<span class="token punctuation">;</span>
	
    <span class="token comment">//区级区划编号</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> districtCode<span class="token punctuation">;</span>
	
    <span class="token comment">//区级名称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> districtName<span class="token punctuation">;</span>
	
    <span class="token comment">//详细地址</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> detail<span class="token punctuation">;</span>
	
    <span class="token comment">//标签</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> label<span class="token punctuation">;</span>
    
    <span class="token comment">//是否默认 0 否 1是</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> isDefault<span class="token punctuation">;</span>
    
    <span class="token comment">//创建时间</span>
    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>fill <span class="token operator">=</span> <span class="token class-name">FieldFill</span><span class="token punctuation">.</span><span class="token constant">INSERT</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> createTime<span class="token punctuation">;</span>

    <span class="token comment">//更新时间</span>
    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>fill <span class="token operator">=</span> <span class="token class-name">FieldFill</span><span class="token punctuation">.</span><span class="token constant">INSERT_UPDATE</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> updateTime<span class="token punctuation">;</span>

    <span class="token comment">//创建人</span>
    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>fill <span class="token operator">=</span> <span class="token class-name">FieldFill</span><span class="token punctuation">.</span><span class="token constant">INSERT</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> createUser<span class="token punctuation">;</span>

    <span class="token comment">//修改人</span>
    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>fill <span class="token operator">=</span> <span class="token class-name">FieldFill</span><span class="token punctuation">.</span><span class="token constant">INSERT_UPDATE</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> updateUser<span class="token punctuation">;</span>

    <span class="token comment">//是否删除</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> isDeleted<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). Mapper接口 AddressBookMapper（直接从课程资料中导入即可）</strong></p>
<p>所属包: com.itheima.reggie.mapper</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">BaseMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">AddressBook</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span></span><span class="token class-name">Mapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span></span><span class="token class-name">Select</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AddressBookMapper</span> <span class="token keyword">extends</span> <span class="token class-name">BaseMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AddressBook</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3). 业务层接口 AddressBookService（直接从课程资料中导入即可）</strong></p>
<p>所属包: com.itheima.reggie.service</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">IService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">AddressBook</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AddressBookService</span> <span class="token keyword">extends</span> <span class="token class-name">IService</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AddressBook</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4). 业务层实现类 AddressBookServiceImpl（直接从课程资料中导入即可）</strong></p>
<p>所属包: com.itheima.reggie.service.impl</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>service<span class="token punctuation">.</span>impl<span class="token punctuation">.</span></span><span class="token class-name">ServiceImpl</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">AddressBook</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">AddressBookMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">AddressBookService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AddressBookServiceImpl</span> <span class="token keyword">extends</span> <span class="token class-name">ServiceImpl</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AddressBookMapper</span><span class="token punctuation">,</span> <span class="token class-name">AddressBook</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">AddressBookService</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>5). 控制层 AddressBookController（直接从课程资料中导入即可）</strong></p>
<p>所属包: com.itheima.reggie.controller</p>
<p>controller主要开发的功能:</p>
<p>A. 新增地址逻辑说明：</p>
<ul>
<li>需要记录当前是哪个用户的地址(关联当前登录用户)</li>
</ul>
<p>B. 设置默认地址</p>
<ul>
<li>
<p>每个用户可以有很多地址，但是默认地址只能有一个 ；</p>
</li>
<li>
<p>先将该用户所有地址的is_default更新为0 , 然后将当前的设置的默认地址的is_default设置为1</p>
</li>
</ul>
<p>C. 根据ID查询地址</p>
<p>D. 查询默认地址</p>
<ul>
<li>根据当前登录用户ID 以及 is_default进行查询，查询当前登录用户is_default为1的地址信息</li>
</ul>
<p>E. 查询指定用户的全部地址</p>
<ul>
<li>根据当前登录用户ID，查询所有的地址列表</li>
</ul>
<p>代码实现如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>conditions<span class="token punctuation">.</span>query<span class="token punctuation">.</span></span><span class="token class-name">LambdaQueryWrapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>conditions<span class="token punctuation">.</span>update<span class="token punctuation">.</span></span><span class="token class-name">LambdaUpdateWrapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>common<span class="token punctuation">.</span></span><span class="token class-name">BaseContext</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>common<span class="token punctuation">.</span></span><span class="token class-name">R</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">AddressBook</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">AddressBookService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 地址簿管理
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/addressBook"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AddressBookController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">AddressBookService</span> addressBookService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 新增
     */</span>
    <span class="token annotation punctuation">@PostMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AddressBook</span><span class="token punctuation">></span></span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">AddressBook</span> addressBook<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        addressBook<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span><span class="token class-name">BaseContext</span><span class="token punctuation">.</span><span class="token function">getCurrentId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"addressBook:{}"</span><span class="token punctuation">,</span> addressBook<span class="token punctuation">)</span><span class="token punctuation">;</span>
        addressBookService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>addressBook<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>addressBook<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 设置默认地址
     */</span>
    <span class="token annotation punctuation">@PutMapping</span><span class="token punctuation">(</span><span class="token string">"default"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AddressBook</span><span class="token punctuation">></span></span> <span class="token function">setDefault</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">AddressBook</span> addressBook<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"addressBook:{}"</span><span class="token punctuation">,</span> addressBook<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LambdaUpdateWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AddressBook</span><span class="token punctuation">></span></span> wrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaUpdateWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        wrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">AddressBook</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">,</span> <span class="token class-name">BaseContext</span><span class="token punctuation">.</span><span class="token function">getCurrentId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        wrapper<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">AddressBook</span><span class="token operator">::</span><span class="token function">getIsDefault</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//SQL:update address_book set is_default = 0 where user_id = ?</span>
        addressBookService<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

        addressBook<span class="token punctuation">.</span><span class="token function">setIsDefault</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//SQL:update address_book set is_default = 1 where id = ?</span>
        addressBookService<span class="token punctuation">.</span><span class="token function">updateById</span><span class="token punctuation">(</span>addressBook<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>addressBook<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 根据id查询地址
     */</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">R</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">AddressBook</span> addressBook <span class="token operator">=</span> addressBookService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>addressBook <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>addressBook<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"没有找到该对象"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 查询默认地址
     */</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"default"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AddressBook</span><span class="token punctuation">></span></span> <span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AddressBook</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">AddressBook</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">,</span> <span class="token class-name">BaseContext</span><span class="token punctuation">.</span><span class="token function">getCurrentId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">AddressBook</span><span class="token operator">::</span><span class="token function">getIsDefault</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//SQL:select * from address_book where user_id = ? and is_default = 1</span>
        <span class="token class-name">AddressBook</span> addressBook <span class="token operator">=</span> addressBookService<span class="token punctuation">.</span><span class="token function">getOne</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> addressBook<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"没有找到该对象"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>addressBook<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 查询指定用户的全部地址
     */</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/list"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">AddressBook</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">AddressBook</span> addressBook<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        addressBook<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span><span class="token class-name">BaseContext</span><span class="token punctuation">.</span><span class="token function">getCurrentId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"addressBook:{}"</span><span class="token punctuation">,</span> addressBook<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//条件构造器</span>
        <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AddressBook</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">!=</span> addressBook<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">AddressBook</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">,</span> addressBook<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">orderByDesc</span><span class="token punctuation">(</span><span class="token class-name">AddressBook</span><span class="token operator">::</span><span class="token function">getUpdateTime</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//SQL:select * from address_book where user_id = ? order by update_time desc</span>
        <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>addressBookService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-功能测试" tabindex="-1"><a class="header-anchor" href="#_1-4-功能测试" aria-hidden="true">#</a> 1.4 功能测试</h3>
<p>代码导入进来，并且去阅读了一下地址管理各个功能的逻辑实现，接下来，我们就可以启动项目，进行一个测试。测试过程中，通过debug断点调试观察服务端程序的执行过程，在浏览器中使用调试工具查看页面和服务端的交互过程和请求响应数据。</p>
<p><strong>1). 新增</strong></p>
<p>填写表单数据，点击保存地址，查看网络请求。</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812201636567.png" alt="image-20210812201636567"></p>
<p>测试完毕之后，检查数据库中的数据，是否正常插入。</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812201845336.png" alt="image-20210812201845336"></p>
<p><strong>2). 列表查询</strong></p>
<p>当新增地址完成后，页面会再次发送一个请求，来查询该用户的所有地址列表，在界面进行展示。</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812202430677.png" alt="image-20210812202430677"></p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812202534169.png" alt="image-20210812202534169"></p>
<p><strong>3). 设置默认</strong></p>
<p>在地址列表页面中，勾选 &quot;设为默认地址&quot; ，此时会发送PUT请求，来设置默认地址。</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812202841250.png" alt="image-20210812202841250"></p>
<p>测试完毕后，我们再次查看数据库表中的数据：</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812203123499.png" alt="image-20210812203123499"></p>
<h2 id="_2-菜品展示" tabindex="-1"><a class="header-anchor" href="#_2-菜品展示" aria-hidden="true">#</a> 2. 菜品展示</h2>
<h3 id="_2-1-需求分析" tabindex="-1"><a class="header-anchor" href="#_2-1-需求分析" aria-hidden="true">#</a> 2.1 需求分析</h3>
<p>用户登录成功后跳转到系统首页，在首页需要根据分类来展示菜品和套餐。如果菜品设置了口味信息，需要展示<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812205330291.png" alt="image-20210812205330291" style="zoom:80%;" />按钮，否则显示<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812205346846.png" alt="image-20210812205346846" style="zoom:80%;" />按钮。</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812210328249.png" alt="image-20210812210328249"></p>
<h3 id="_2-2-前端页面分析" tabindex="-1"><a class="header-anchor" href="#_2-2-前端页面分析" aria-hidden="true">#</a> 2.2 前端页面分析</h3>
<p>在开发代码之前，需要梳理一下前端页面和服务端的交互过程：</p>
<p><strong>1). 页面(front/index.html)发送ajax请求，获取分类数据（菜品分类和套餐分类）</strong></p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812215624794.png" alt="image-20210812215624794"></p>
<p>该功能在之前的业务开发中，我们都已经实现了。通过请求响应的数据，我们也可以看到数据是可以正确获取到的。</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812221107947.png" alt="image-20210812221107947"></p>
<p>注意：首页加载时，不仅发送请求获取分类列表，还发送了一次ajax请求用于加载购物车数据，而这两次请求必须全部成功，页面才可以正常渲染，而当前购物车列表查询功能还未实现(报404)，所以列表目前并未渲染。此处可以将这次请求的地址暂时修改一下，从静态json文件获取数据，等后续开发购物车功能时再修改回来，如下：</p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812221835628.png" alt="image-20210812221835628" style="zoom:80%;" /> 
<p>修改之后，我们再次测试：</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812222713700.png" alt="image-20210812222713700"></p>
<p>目前该部分的功能我们已经调通，左侧的分类菜单，和右侧的菜品信息我们都可以看到，后续我们只需要将购物车列表的数据改成调用服务端接口查询即可。</p>
<p><strong>2). 页面发送ajax请求，获取第一个分类下的菜品或者套餐</strong></p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812224353891.png" alt="image-20210812224353891" style="zoom:80%;" /> 
<p>A. 根据分类ID查询套餐列表：</p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812224810551.png" alt="image-20210812224810551" style="zoom:80%;" /> 
<p>B. 根据分类ID查询菜品列表：</p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812224624459.png" alt="image-20210812224624459" style="zoom:80%;" /> 
<p>异步请求，查询分类对应的菜品列表，功能我们已经实现了，但是我们之前查询的只是菜品的基本信息，不包含菜品的口味信息。所以在前端界面中，我们看不到选择菜品分类的信息。</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812231220115.png" alt="image-20210812231220115"></p>
<p>经过上述的分析，我们可以看到，服务端我们主要提供两个方法， 分别用来：</p>
<p>A. 根据分类ID查询菜品列表(包含菜品口味列表), 具体请求信息如下:</p>
<table>
<thead>
<tr>
<th>请求</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>请求方式</td>
<td>GET</td>
</tr>
<tr>
<td>请求路径</td>
<td>/dish/list</td>
</tr>
<tr>
<td>请求参数</td>
<td>?categoryId=1397844263642378242&amp;status=1</td>
</tr>
</tbody>
</table>
<font color='red'>该功能在服务端已经实现，我们需要修改此方法，在原有方法的基础上增加查询菜品的口味信息。</font><p>B. 根据分类ID查询套餐列表, 具体请求信息如下:</p>
<table>
<thead>
<tr>
<th>请求</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>请求方式</td>
<td>GET</td>
</tr>
<tr>
<td>请求路径</td>
<td>/setmeal/list</td>
</tr>
<tr>
<td>请求参数</td>
<td>?categoryId=1397844263642378242&amp;status=1</td>
</tr>
</tbody>
</table>
<font color='red'>该功能在服务端并未实现。</font><h3 id="_2-3-代码开发" tabindex="-1"><a class="header-anchor" href="#_2-3-代码开发" aria-hidden="true">#</a> 2.3 代码开发</h3>
<h4 id="_2-3-1-查询菜品方法修改" tabindex="-1"><a class="header-anchor" href="#_2-3-1-查询菜品方法修改" aria-hidden="true">#</a> 2.3.1 查询菜品方法修改</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>由于之前我们实现的根据分类查询菜品列表，仅仅查询了菜品的基本信息，未查询菜品口味信息，而移动端用户在点餐时，是需要选择口味信息的，所以我们需要对之前的代码实现进行完善，那么如何完善呢？

我们需要修改<span class="token class-name">DishController</span>的list方法，原来此方法的返回值类型为：<span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Dish</span><span class="token punctuation">></span><span class="token punctuation">></span></span>。为了满足移动端对数据的要求<span class="token punctuation">(</span>菜品基本信息和菜品对应的口味信息<span class="token punctuation">)</span>，现在需要将方法的返回值类型改为：<span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">DishDto</span><span class="token punctuation">></span><span class="token punctuation">></span></span> ，因为在<span class="token class-name">DishDto</span>中封装了菜品对应的口味信息： 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210812231825043.png" alt="image-20210812231825043" style="zoom:67%;" /> 
<p><strong>代码逻辑:</strong></p>
<p>A. 根据分类ID查询，查询目前正在启售的菜品列表 (已实现)</p>
<p>B. 遍历菜品列表，并查询菜品的分类信息及菜品的口味列表</p>
<p>C. 组装数据DishDto，并返回</p>
<p><strong>代码实现：</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/list"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">DishDto</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">Dish</span> dish<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//构造查询条件</span>
        <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Dish</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>dish<span class="token punctuation">.</span><span class="token function">getCategoryId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token punctuation">,</span><span class="token class-name">Dish</span><span class="token operator">::</span><span class="token function">getCategoryId</span><span class="token punctuation">,</span>dish<span class="token punctuation">.</span><span class="token function">getCategoryId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//添加条件，查询状态为1（起售状态）的菜品</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">Dish</span><span class="token operator">::</span><span class="token function">getStatus</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//添加排序条件</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">orderByAsc</span><span class="token punctuation">(</span><span class="token class-name">Dish</span><span class="token operator">::</span><span class="token function">getSort</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orderByDesc</span><span class="token punctuation">(</span><span class="token class-name">Dish</span><span class="token operator">::</span><span class="token function">getUpdateTime</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Dish</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> dishService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
	
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishDto</span><span class="token punctuation">></span></span> dishDtoList <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">DishDto</span> dishDto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DishDto</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span>dishDto<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">Long</span> categoryId <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">getCategoryId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//分类id</span>
            <span class="token comment">//根据id查询分类对象</span>
            <span class="token class-name">Category</span> category <span class="token operator">=</span> categoryService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>categoryId<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>category <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">String</span> categoryName <span class="token operator">=</span> category<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                dishDto<span class="token punctuation">.</span><span class="token function">setCategoryName</span><span class="token punctuation">(</span>categoryName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">//当前菜品的id</span>
            <span class="token class-name">Long</span> dishId <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishFlavor</span><span class="token punctuation">></span></span> lambdaQueryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            lambdaQueryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">DishFlavor</span><span class="token operator">::</span><span class="token function">getDishId</span><span class="token punctuation">,</span>dishId<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//SQL:select * from dish_flavor where dish_id = ?</span>
            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishFlavor</span><span class="token punctuation">></span></span> dishFlavorList <span class="token operator">=</span> dishFlavorService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span>lambdaQueryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
            dishDto<span class="token punctuation">.</span><span class="token function">setFlavors</span><span class="token punctuation">(</span>dishFlavorList<span class="token punctuation">)</span><span class="token punctuation">;</span>
            
            <span class="token keyword">return</span> dishDto<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>dishDtoList<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-2-根据分类id查询套餐" tabindex="-1"><a class="header-anchor" href="#_2-3-2-根据分类id查询套餐" aria-hidden="true">#</a> 2.3.2 根据分类ID查询套餐</h4>
<p>在SetmealController中创建list方法，根据条件查询套餐数据。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 根据条件查询套餐数据
 * <span class="token keyword">@param</span> <span class="token parameter">setmeal</span>
 * <span class="token keyword">@return</span>
 */</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/list"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Setmeal</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">Setmeal</span> setmeal<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Setmeal</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>setmeal<span class="token punctuation">.</span><span class="token function">getCategoryId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">,</span><span class="token class-name">Setmeal</span><span class="token operator">::</span><span class="token function">getCategoryId</span><span class="token punctuation">,</span>setmeal<span class="token punctuation">.</span><span class="token function">getCategoryId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>setmeal<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">,</span><span class="token class-name">Setmeal</span><span class="token operator">::</span><span class="token function">getStatus</span><span class="token punctuation">,</span>setmeal<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">orderByDesc</span><span class="token punctuation">(</span><span class="token class-name">Setmeal</span><span class="token operator">::</span><span class="token function">getUpdateTime</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Setmeal</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> setmealService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-功能测试" tabindex="-1"><a class="header-anchor" href="#_2-4-功能测试" aria-hidden="true">#</a> 2.4 功能测试</h3>
<p>把菜品展示的功能代码完善完成之后，我们重新启动服务，来测试一个菜品展示的功能。测试过程中可以使用浏览器的监控工具查看页面和服务端的数据交互细节。</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210813175554516.png" alt="image-20210813175554516"></p>
<p>点击分类，根据分类查询菜品列表/套餐列表:</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210813175835304.png" alt="image-20210813175835304"></p>
<h2 id="_3-购物车" tabindex="-1"><a class="header-anchor" href="#_3-购物车" aria-hidden="true">#</a> 3. 购物车</h2>
<h3 id="_3-1-需求分析" tabindex="-1"><a class="header-anchor" href="#_3-1-需求分析" aria-hidden="true">#</a> 3.1 需求分析</h3>
<p>移动端用户可以将菜品或者套餐添加到购物车。对于菜品来说，如果设置了口味信息，则需要选择规格后才能加入购物车;对于套餐来说，可以直接点击<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210813181916235.png" alt="image-20210813181916235" style="zoom:67%;" />将当前套餐加入购物车。在购物车中可以修改菜品和套餐的数量，也可以清空购物车。</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210813182828045.png" alt="image-20210813182828045"></p>
<p>这里面我们需要实现的功能包括:</p>
<p>1). 添加购物车</p>
<p>2). 查询购物车</p>
<p>3). 清空购物车</p>
<h3 id="_3-2-数据模型" tabindex="-1"><a class="header-anchor" href="#_3-2-数据模型" aria-hidden="true">#</a> 3.2 数据模型</h3>
<p>用户的购物车数据，也是需要保存在数据库中的，购物车对应的数据表为shopping_cart表，具体表结构如下：</p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210813183334933.png" alt="image-20210813183334933" style="zoom:80%;" /> 
<p>说明：</p>
<ul>
<li>购物车数据是关联用户的，在表结构中，我们需要记录，每一个用户的购物车数据是哪些</li>
<li>菜品列表展示出来的既有套餐，又有菜品，如果APP端选择的是套餐，就保存套餐ID(setmeal_id)，如果APP端选择的是菜品，就保存菜品ID(dish_id)</li>
<li>对同一个菜品/套餐，如果选择多份不需要添加多条记录，增加数量number即可</li>
</ul>
<p><strong>最终shopping_cart表中存储的数据示例:</strong></p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210815183440051.png" alt="image-20210815183440051" style="zoom:80%;" /> 
<h3 id="_3-3-前端页面分析" tabindex="-1"><a class="header-anchor" href="#_3-3-前端页面分析" aria-hidden="true">#</a> 3.3 前端页面分析</h3>
<p>在开发代码之前，需要梳理一下购物车操作时前端页面和服务端的交互过程：</p>
<p>1). 点击 &quot;加入购物车&quot; 或者 &quot;+&quot; 按钮，页面发送ajax请求，请求服务端，将菜品或者套餐添加到购物车</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210813185414102.png" alt="image-20210813185414102"></p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210813185731809.png" alt="image-20210813185731809"></p>
<p>2). 点击购物车图标，页面发送ajax请求，请求服务端查询购物车中的菜品和套餐</p>
<p>此时，我们就需要将查询购物车的代码放开，不用再加载静态的json数据了。</p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210813190814766.png" alt="image-20210813190814766" style="zoom:80%;" /> 
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210813191237556.png" alt="image-20210813191237556" style="zoom:70%;" /> 
<p>3). 点击清空购物车按钮，页面发送ajax请求，请求服务端来执行清空购物车操作</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210813192012994.png" alt="image-20210813192012994"></p>
<p>经过上述的分析，我们可以看到，对于购物车的功能，我们主要需要开发以下几个功能，具体的请求信息如下：</p>
<p><strong>1). 加入购物车</strong></p>
<table>
<thead>
<tr>
<th>请求</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>请求方式</td>
<td>POST</td>
</tr>
<tr>
<td>请求路径</td>
<td>/shoppingCart/add</td>
</tr>
<tr>
<td>请求参数</td>
<td>json格式</td>
</tr>
</tbody>
</table>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>菜品数据<span class="token operator">:</span> 
<span class="token punctuation">{</span><span class="token property">"amount"</span><span class="token operator">:</span><span class="token number">118</span><span class="token punctuation">,</span><span class="token property">"dishFlavor"</span><span class="token operator">:</span><span class="token string">"不要蒜,微辣"</span><span class="token punctuation">,</span><span class="token property">"dishId"</span><span class="token operator">:</span><span class="token string">"1397851099502260226"</span><span class="token punctuation">,</span><span class="token property">"name"</span><span class="token operator">:</span><span class="token string">"全家福"</span><span class="token punctuation">,</span><span class="token property">"image"</span><span class="token operator">:</span><span class="token string">"a53a4e6a-3b83-4044-87f9-9d49b30a8fdc.jpg"</span><span class="token punctuation">}</span>

套餐数据<span class="token operator">:</span> 
<span class="token punctuation">{</span><span class="token property">"amount"</span><span class="token operator">:</span><span class="token number">38</span><span class="token punctuation">,</span><span class="token property">"setmealId"</span><span class="token operator">:</span><span class="token string">"1423329486060957698"</span><span class="token punctuation">,</span><span class="token property">"name"</span><span class="token operator">:</span><span class="token string">"营养超值工作餐"</span><span class="token punctuation">,</span><span class="token property">"image"</span><span class="token operator">:</span><span class="token string">"9cd7a80a-da54-4f46-bf33-af3576514cec.jpg"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). 查询购物车列表</strong></p>
<table>
<thead>
<tr>
<th>请求</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>请求方式</td>
<td>GET</td>
</tr>
<tr>
<td>请求路径</td>
<td>/shoppingCart/list</td>
</tr>
</tbody>
</table>
<p><strong>3). 清空购物车功能</strong></p>
<table>
<thead>
<tr>
<th>请求</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>请求方式</td>
<td>DELETE</td>
</tr>
<tr>
<td>请求路径</td>
<td>/shoppingCart/clean</td>
</tr>
</tbody>
</table>
<h3 id="_3-4-准备工作" tabindex="-1"><a class="header-anchor" href="#_3-4-准备工作" aria-hidden="true">#</a> 3.4 准备工作</h3>
<p>分析完毕购物车的业务需求和实现思路之后，在开发业务功能前，先将需要用到的类和接口基本结构创建好：</p>
<p><strong>1). 实体类 ShoppingCart（直接从课程资料中导入即可）</strong></p>
<p>所属包: com.itheima.reggie.entity</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">Serializable</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>math<span class="token punctuation">.</span></span><span class="token class-name">BigDecimal</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">LocalDateTime</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 购物车
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingCart</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>
	
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token comment">//名称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">//用户id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> userId<span class="token punctuation">;</span>

    <span class="token comment">//菜品id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> dishId<span class="token punctuation">;</span>

    <span class="token comment">//套餐id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> setmealId<span class="token punctuation">;</span>

    <span class="token comment">//口味</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> dishFlavor<span class="token punctuation">;</span>

    <span class="token comment">//数量</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> number<span class="token punctuation">;</span>

    <span class="token comment">//金额</span>
    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> amount<span class="token punctuation">;</span>

    <span class="token comment">//图片</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> image<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> createTime<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). Mapper接口 ShoppingCartMapper</strong></p>
<p>所属包: com.itheima.reggie.mapper</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">BaseMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">ShoppingCart</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span></span><span class="token class-name">Mapper</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ShoppingCartMapper</span> <span class="token keyword">extends</span> <span class="token class-name">BaseMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingCart</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3). 业务层接口 ShoppingCartService</strong></p>
<p>所属包: com.itheima.reggie.service</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">IService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">ShoppingCart</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ShoppingCartService</span> <span class="token keyword">extends</span> <span class="token class-name">IService</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingCart</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4). 业务层实现类 ShoppingCartServiceImpl</strong></p>
<p>所属包: com.itheima.reggie.service.impl</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>service<span class="token punctuation">.</span>impl<span class="token punctuation">.</span></span><span class="token class-name">ServiceImpl</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">ShoppingCart</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">ShoppingCartMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">ShoppingCartService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingCartServiceImpl</span> <span class="token keyword">extends</span> <span class="token class-name">ServiceImpl</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingCartMapper</span><span class="token punctuation">,</span> <span class="token class-name">ShoppingCart</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">ShoppingCartService</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>5). 控制层 ShoppingCartController</strong></p>
<p>所属包: com.itheima.reggie.controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">ShoppingCartService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 购物车
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/shoppingCart"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingCartController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ShoppingCartService</span> shoppingCartService<span class="token punctuation">;</span>
 
 <span class="token punctuation">}</span>   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-代码开发" tabindex="-1"><a class="header-anchor" href="#_3-5-代码开发" aria-hidden="true">#</a> 3.5 代码开发</h3>
<h4 id="_3-5-1-添加购物车" tabindex="-1"><a class="header-anchor" href="#_3-5-1-添加购物车" aria-hidden="true">#</a> 3.5.1 添加购物车</h4>
<p>在ShoppingCartController中创建add方法，来完成添加购物车的逻辑实现，具体的逻辑如下：</p>
<p>A. 获取当前登录用户，为购物车对象赋值</p>
<p>B. 根据当前登录用户ID 及 本次添加的菜品ID/套餐ID，查询购物车数据是否存在</p>
<p>C. 如果已经存在，就在原来数量基础上加1</p>
<p>D. 如果不存在，则添加到购物车，数量默认就是1</p>
<p>代码实现如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* 添加购物车
* <span class="token keyword">@param</span> <span class="token parameter">shoppingCart</span>
* <span class="token keyword">@return</span>
*/</span>
<span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/add"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingCart</span><span class="token punctuation">></span></span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">ShoppingCart</span> shoppingCart<span class="token punctuation">)</span><span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"购物车数据:{}"</span><span class="token punctuation">,</span>shoppingCart<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//设置用户id，指定当前是哪个用户的购物车数据</span>
    <span class="token class-name">Long</span> currentId <span class="token operator">=</span> <span class="token class-name">BaseContext</span><span class="token punctuation">.</span><span class="token function">getCurrentId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    shoppingCart<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span>currentId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Long</span> dishId <span class="token operator">=</span> shoppingCart<span class="token punctuation">.</span><span class="token function">getDishId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingCart</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">ShoppingCart</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">,</span>currentId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>dishId <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//添加到购物车的是菜品</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">ShoppingCart</span><span class="token operator">::</span><span class="token function">getDishId</span><span class="token punctuation">,</span>dishId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        <span class="token comment">//添加到购物车的是套餐</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">ShoppingCart</span><span class="token operator">::</span><span class="token function">getSetmealId</span><span class="token punctuation">,</span>shoppingCart<span class="token punctuation">.</span><span class="token function">getSetmealId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//查询当前菜品或者套餐是否在购物车中</span>
    <span class="token comment">//SQL:select * from shopping_cart where user_id = ? and dish_id/setmeal_id = ?</span>
    <span class="token class-name">ShoppingCart</span> cartServiceOne <span class="token operator">=</span> shoppingCartService<span class="token punctuation">.</span><span class="token function">getOne</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>cartServiceOne <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//如果已经存在，就在原来数量基础上加一</span>
        <span class="token class-name">Integer</span> number <span class="token operator">=</span> cartServiceOne<span class="token punctuation">.</span><span class="token function">getNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cartServiceOne<span class="token punctuation">.</span><span class="token function">setNumber</span><span class="token punctuation">(</span>number <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        shoppingCartService<span class="token punctuation">.</span><span class="token function">updateById</span><span class="token punctuation">(</span>cartServiceOne<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        <span class="token comment">//如果不存在，则添加到购物车，数量默认就是一</span>
        shoppingCart<span class="token punctuation">.</span><span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        shoppingCart<span class="token punctuation">.</span><span class="token function">setCreateTime</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        shoppingCartService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>shoppingCart<span class="token punctuation">)</span><span class="token punctuation">;</span>
        cartServiceOne <span class="token operator">=</span> shoppingCart<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>cartServiceOne<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-5-2-查询购物车" tabindex="-1"><a class="header-anchor" href="#_3-5-2-查询购物车" aria-hidden="true">#</a> 3.5.2 查询购物车</h4>
<p>在ShoppingCartController中创建list方法，根据当前登录用户ID查询购物车列表，并对查询的结果进行创建时间的倒序排序。</p>
<p>代码实现如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* 查看购物车
* <span class="token keyword">@return</span>
*/</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/list"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingCart</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"查看购物车..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingCart</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">ShoppingCart</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">,</span><span class="token class-name">BaseContext</span><span class="token punctuation">.</span><span class="token function">getCurrentId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">orderByAsc</span><span class="token punctuation">(</span><span class="token class-name">ShoppingCart</span><span class="token operator">::</span><span class="token function">getCreateTime</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingCart</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> shoppingCartService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-5-3-清空购物车" tabindex="-1"><a class="header-anchor" href="#_3-5-3-清空购物车" aria-hidden="true">#</a> 3.5.3 清空购物车</h4>
<p>在ShoppingCartController中创建clean方法，在方法中获取当前登录用户，根据登录用户ID，删除购物车数据。</p>
<p>代码实现如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* 清空购物车
* <span class="token keyword">@return</span>
*/</span>
<span class="token annotation punctuation">@DeleteMapping</span><span class="token punctuation">(</span><span class="token string">"/clean"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">clean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//SQL:delete from shopping_cart where user_id = ?</span>
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingCart</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">ShoppingCart</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">,</span><span class="token class-name">BaseContext</span><span class="token punctuation">.</span><span class="token function">getCurrentId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    shoppingCartService<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">"清空购物车成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-功能测试" tabindex="-1"><a class="header-anchor" href="#_3-6-功能测试" aria-hidden="true">#</a> 3.6 功能测试</h3>
<p>按照前面分析的操作流程进行测试，测试功能以及数据库中的数据是否是否正常。</p>
<p><strong>1). 添加购物车</strong></p>
<p>当添加的是菜品信息，而这个用户的购物车中当前并没有这个菜品时，添加一条数据，数量为1。</p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814070930745.png" alt="image-20210814070930745" style="zoom:80%;" /> 
<p>检查数据库数据，由于是菜品保存的是dish_id。</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814071113382.png" alt="image-20210814071113382"></p>
<p>这时在页面上，我们可以继续点击+号，在购物车中增加该菜品，此时，应该是对现有的购物车菜品数量加1，而不应该插入新的记录。</p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814071613706.png" alt="image-20210814071613706" style="zoom:80%;" /> 
<p>检查数据库数据：</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814071707767.png" alt="image-20210814071707767"></p>
<p>如果添加的是套餐，该套餐在当前用户的购物车中并不存在，则添加一条数据，数量为1。</p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814071742125.png" alt="image-20210814071742125" style="zoom:80%;" />  
<p>检查数据库数据：</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814071850689.png" alt="image-20210814071850689"></p>
<p><strong>2). 查看购物车</strong></p>
<p>点击页面下面的购物车边栏，查看购物车数据列表是否正常展示。</p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814071956804.png" alt="image-20210814071956804" style="zoom:80%;" /> 
<p><strong>3). 清空购物车</strong></p>
<p>在购物车列表展示页中点击&quot;清空&quot;, 查看购物车是否被清空。</p>
 <img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814072159568.png" alt="image-20210814072159568" style="zoom:80%;" /> 
<p>并检查数据库中的数据，可以看到数据已经被删除。</p>
<h2 id="_4-下单" tabindex="-1"><a class="header-anchor" href="#_4-下单" aria-hidden="true">#</a> 4. 下单</h2>
<h3 id="_4-1-需求分析" tabindex="-1"><a class="header-anchor" href="#_4-1-需求分析" aria-hidden="true">#</a> 4.1 需求分析</h3>
<p>移动端用户将菜品或者套餐加入购物车后，可以点击购物车中的 &quot;去结算&quot; 按钮，页面跳转到订单确认页面，点击 &quot;去支付&quot; 按钮则完成下单操作。</p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814072533469.png" alt="image-20210814072533469" style="zoom:80%;" /> 
<p>这里，我们需要说明一下，这里并不会去开发支付功能，因为不论是支付宝的支付，还是微信支付，都是需要企业资质的，而我们大家在测试的时候，是没有办法提供企业资质的，所以这一部分支付功能我们就不去实现了。</p>
<h3 id="_4-2-数据模型" tabindex="-1"><a class="header-anchor" href="#_4-2-数据模型" aria-hidden="true">#</a> 4.2 数据模型</h3>
<p>用户下单业务对应的数据表为orders表和order_detail表(一对多关系,一个订单关联多个订单明细)：</p>
<table>
<thead>
<tr>
<th>表名</th>
<th>含义</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>orders</td>
<td>订单表</td>
<td>主要存储订单的基本信息(如: 订单号、状态、金额、支付方式、下单用户、收件地址等)</td>
</tr>
<tr>
<td>order_detail</td>
<td>订单明细表</td>
<td>主要存储订单详情信息(如: 该订单关联的套餐及菜品的信息)</td>
</tr>
</tbody>
</table>
<p>具体的表结构如下:</p>
<p><strong>A. orders 订单表</strong></p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814095559935.png" alt="image-20210814095559935"></p>
<p><strong>B. order_detail</strong></p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814073544977.png" alt="image-20210814073544977"></p>
<p>数据示例:</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210815224918077.png" alt="image-20210815224918077"></p>
<p>用户提交订单时，需要往订单表orders中插入一条记录，并且需要往order_detail中插入一条或多条记录。</p>
<h3 id="_4-3-前端页面分析" tabindex="-1"><a class="header-anchor" href="#_4-3-前端页面分析" aria-hidden="true">#</a> 4.3 前端页面分析</h3>
<p>在开发代码之前，需要梳理一下用户下单操作时前端页面和服务端的交互过程：</p>
<p><strong>1). 在购物车中点击<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814073907767.png" alt="image-20210814073907767" style="zoom: 67%;" />按钮，页面跳转到订单确认页面</strong></p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814075105094.png" alt="image-20210814075105094" style="zoom:67%;" /> 
<p>页面跳转前端已经完成，我们无需操作。</p>
<p><strong>2). 在订单确认页面，发送ajax请求，请求服务端获取当前登录用户的默认地址</strong></p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814075454329.png" alt="image-20210814075454329" style="zoom:80%;" /> 
<p>该功能在用户地址簿管理功能开发时，已经实现(导入)，我们无需操作。</p>
<p><strong>3). 在订单确认页面，发送ajax请求，请求服务端获取当前登录用户的购物车数据</strong></p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814075635880.png" alt="image-20210814075635880" style="zoom:80%;" /> 
<p>该功能已经实现，我们无需操作。</p>
<p><strong>4). 在订单确认页面点击<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814075722616.png" alt="image-20210814075722616" style="zoom:67%;" />按钮，发送ajax请求，请求服务端完成下单操作</strong></p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814080254623.png" alt="image-20210814080254623" style="zoom:80%;" /> 
<p>经过上述的分析，我们看到前三步的功能我们都已经实现了，我们主要需要实现最后一步的下单功能，该功能具体的请求信息如下：</p>
<table>
<thead>
<tr>
<th>请求</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>请求方式</td>
<td>POST</td>
</tr>
<tr>
<td>请求路径</td>
<td>/order/submit</td>
</tr>
<tr>
<td>请求参数</td>
<td>{&quot;remark&quot;:&quot;老板,记得带一次性筷子&quot;,&quot;payMethod&quot;:1,&quot;addressBookId&quot;:&quot;1425792459560005634&quot;}</td>
</tr>
</tbody>
</table>
<h3 id="_4-4-准备工作" tabindex="-1"><a class="header-anchor" href="#_4-4-准备工作" aria-hidden="true">#</a> 4.4 准备工作</h3>
<p>在开发业务功能前，先将需要用到的类和接口基本结构创建好：</p>
<p><strong>1). 实体类 Orders、OrderDetail（直接从课程资料中导入即可）</strong></p>
<p>所属包: com.itheima.reggie.entity</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">Serializable</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>math<span class="token punctuation">.</span></span><span class="token class-name">BigDecimal</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">LocalDateTime</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 订单
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Orders</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token comment">//订单号</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> number<span class="token punctuation">;</span>
    <span class="token comment">//订单状态 1待付款，2待派送，3已派送，4已完成，5已取消</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> status<span class="token punctuation">;</span>

    <span class="token comment">//下单用户id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> userId<span class="token punctuation">;</span>

    <span class="token comment">//地址id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> addressBookId<span class="token punctuation">;</span>

    <span class="token comment">//下单时间</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> orderTime<span class="token punctuation">;</span>

    <span class="token comment">//结账时间</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> checkoutTime<span class="token punctuation">;</span>

    <span class="token comment">//支付方式 1微信，2支付宝</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> payMethod<span class="token punctuation">;</span>

    <span class="token comment">//实收金额</span>
    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> amount<span class="token punctuation">;</span>

    <span class="token comment">//备注</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> remark<span class="token punctuation">;</span>

    <span class="token comment">//用户名</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> userName<span class="token punctuation">;</span>

    <span class="token comment">//手机号</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> phone<span class="token punctuation">;</span>

    <span class="token comment">//地址</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> address<span class="token punctuation">;</span>

    <span class="token comment">//收货人</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> consignee<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">Serializable</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>math<span class="token punctuation">.</span></span><span class="token class-name">BigDecimal</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 订单明细
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderDetail</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token comment">//名称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">//订单id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> orderId<span class="token punctuation">;</span>

    <span class="token comment">//菜品id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> dishId<span class="token punctuation">;</span>

    <span class="token comment">//套餐id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> setmealId<span class="token punctuation">;</span>

    <span class="token comment">//口味</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> dishFlavor<span class="token punctuation">;</span>

    <span class="token comment">//数量</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> number<span class="token punctuation">;</span>

    <span class="token comment">//金额</span>
    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> amount<span class="token punctuation">;</span>

    <span class="token comment">//图片</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> image<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). Mapper接口 OrderMapper、OrderDetailMapper</strong></p>
<p>所属包: com.itheima.reggie.mapper</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">BaseMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">Orders</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span></span><span class="token class-name">Mapper</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderMapper</span> <span class="token keyword">extends</span> <span class="token class-name">BaseMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Orders</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">BaseMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">OrderDetail</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span></span><span class="token class-name">Mapper</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderDetailMapper</span> <span class="token keyword">extends</span> <span class="token class-name">BaseMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">OrderDetail</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3). 业务层接口 OrderService、OrderDetailService</strong></p>
<p>所属包: com.itheima.reggie.service</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">IService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">Orders</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderService</span> <span class="token keyword">extends</span> <span class="token class-name">IService</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Orders</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">IService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">OrderDetail</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderDetailService</span> <span class="token keyword">extends</span> <span class="token class-name">IService</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">OrderDetail</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4). 业务层实现类 OrderServiceImpl、OrderDetailServiceImpl</strong></p>
<p>所属包: com.itheima.reggie.service.impl</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>service<span class="token punctuation">.</span>impl<span class="token punctuation">.</span></span><span class="token class-name">ServiceImpl</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">OrderMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderServiceImpl</span> <span class="token keyword">extends</span> <span class="token class-name">ServiceImpl</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">OrderMapper</span><span class="token punctuation">,</span> <span class="token class-name">Orders</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>service<span class="token punctuation">.</span>impl<span class="token punctuation">.</span></span><span class="token class-name">ServiceImpl</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">OrderDetail</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">OrderDetailMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">OrderDetailService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderDetailServiceImpl</span> <span class="token keyword">extends</span> <span class="token class-name">ServiceImpl</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">OrderDetailMapper</span><span class="token punctuation">,</span> <span class="token class-name">OrderDetail</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">OrderDetailService</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>5). 控制层 OrderController、OrderDetailController</strong></p>
<p>所属包: com.itheima.reggie.controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">OrderService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestMapping</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 订单
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/order"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">OrderService</span> orderService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">OrderDetailService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 订单明细
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/orderDetail"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderDetailController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">OrderDetailService</span> orderDetailService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-代码开发" tabindex="-1"><a class="header-anchor" href="#_4-5-代码开发" aria-hidden="true">#</a> 4.5 代码开发</h3>
<p>在OrderController中创建submit方法，处理用户下单的逻辑 ：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 用户下单
 * <span class="token keyword">@param</span> <span class="token parameter">orders</span>
 * <span class="token keyword">@return</span>
 */</span>
<span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/submit"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Orders</span> orders<span class="token punctuation">)</span><span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单数据：{}"</span><span class="token punctuation">,</span>orders<span class="token punctuation">)</span><span class="token punctuation">;</span>
    orderService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>orders<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">"下单成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于下单的逻辑相对复杂，我们可以在OrderService中定义submit方法，来处理下单的具体逻辑：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* 用户下单
* <span class="token keyword">@param</span> <span class="token parameter">orders</span>
*/</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Orders</span> orders<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在OrderServiceImpl中完成下单功能的具体实现，下单功能的具体逻辑如下：</p>
<p>A. 获得当前用户id, 查询当前用户的购物车数据</p>
<p>B. 根据当前登录用户id, 查询用户数据</p>
<p>C. 根据地址ID, 查询地址数据</p>
<p>D. 组装订单明细数据, 批量保存订单明细</p>
<p>E. 组装订单数据, 批量保存订单数据</p>
<p>F. 删除当前用户的购物车列表数据</p>
<p>具体代码实现如下:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">ShoppingCartService</span> shoppingCartService<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">UserService</span> userService<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">AddressBookService</span> addressBookService<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">OrderDetailService</span> orderDetailService<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
* 用户下单
* <span class="token keyword">@param</span> <span class="token parameter">orders</span>
*/</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Orders</span> orders<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//获得当前用户id</span>
    <span class="token class-name">Long</span> userId <span class="token operator">=</span> <span class="token class-name">BaseContext</span><span class="token punctuation">.</span><span class="token function">getCurrentId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//查询当前用户的购物车数据</span>
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingCart</span><span class="token punctuation">></span></span> wrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    wrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">ShoppingCart</span><span class="token operator">::</span><span class="token function">getUserId</span><span class="token punctuation">,</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShoppingCart</span><span class="token punctuation">></span></span> shoppingCarts <span class="token operator">=</span> shoppingCartService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>shoppingCarts <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> shoppingCarts<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    	<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">CustomException</span><span class="token punctuation">(</span><span class="token string">"购物车为空，不能下单"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//查询用户数据</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> userService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//查询地址数据</span>
    <span class="token class-name">Long</span> addressBookId <span class="token operator">=</span> orders<span class="token punctuation">.</span><span class="token function">getAddressBookId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">AddressBook</span> addressBook <span class="token operator">=</span> addressBookService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>addressBookId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>addressBook <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    	<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">CustomException</span><span class="token punctuation">(</span><span class="token string">"用户地址信息有误，不能下单"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">long</span> orderId <span class="token operator">=</span> <span class="token class-name">IdWorker</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//订单号</span>

    <span class="token class-name">AtomicInteger</span> amount <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//组装订单明细信息</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">OrderDetail</span><span class="token punctuation">></span></span> orderDetails <span class="token operator">=</span> shoppingCarts<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
        <span class="token class-name">OrderDetail</span> orderDetail <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrderDetail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderDetail<span class="token punctuation">.</span><span class="token function">setOrderId</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderDetail<span class="token punctuation">.</span><span class="token function">setNumber</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderDetail<span class="token punctuation">.</span><span class="token function">setDishFlavor</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getDishFlavor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderDetail<span class="token punctuation">.</span><span class="token function">setDishId</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getDishId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderDetail<span class="token punctuation">.</span><span class="token function">setSetmealId</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getSetmealId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderDetail<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderDetail<span class="token punctuation">.</span><span class="token function">setImage</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getImage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderDetail<span class="token punctuation">.</span><span class="token function">setAmount</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getAmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        amount<span class="token punctuation">.</span><span class="token function">addAndGet</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getAmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">multiply</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> orderDetail<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//组装订单数据</span>
    orders<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    orders<span class="token punctuation">.</span><span class="token function">setOrderTime</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    orders<span class="token punctuation">.</span><span class="token function">setCheckoutTime</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    orders<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    orders<span class="token punctuation">.</span><span class="token function">setAmount</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span>amount<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//总金额</span>
    orders<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    orders<span class="token punctuation">.</span><span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    orders<span class="token punctuation">.</span><span class="token function">setUserName</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    orders<span class="token punctuation">.</span><span class="token function">setConsignee</span><span class="token punctuation">(</span>addressBook<span class="token punctuation">.</span><span class="token function">getConsignee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    orders<span class="token punctuation">.</span><span class="token function">setPhone</span><span class="token punctuation">(</span>addressBook<span class="token punctuation">.</span><span class="token function">getPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    orders<span class="token punctuation">.</span><span class="token function">setAddress</span><span class="token punctuation">(</span><span class="token punctuation">(</span>addressBook<span class="token punctuation">.</span><span class="token function">getProvinceName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">""</span> <span class="token operator">:</span> addressBook<span class="token punctuation">.</span><span class="token function">getProvinceName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token operator">+</span> <span class="token punctuation">(</span>addressBook<span class="token punctuation">.</span><span class="token function">getCityName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">""</span> <span class="token operator">:</span> addressBook<span class="token punctuation">.</span><span class="token function">getCityName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token operator">+</span> <span class="token punctuation">(</span>addressBook<span class="token punctuation">.</span><span class="token function">getDistrictName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">""</span> <span class="token operator">:</span> addressBook<span class="token punctuation">.</span><span class="token function">getDistrictName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token operator">+</span> <span class="token punctuation">(</span>addressBook<span class="token punctuation">.</span><span class="token function">getDetail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">""</span> <span class="token operator">:</span> addressBook<span class="token punctuation">.</span><span class="token function">getDetail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//向订单表插入数据，一条数据</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>orders<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//向订单明细表插入数据，多条数据</span>
    orderDetailService<span class="token punctuation">.</span><span class="token function">saveBatch</span><span class="token punctuation">(</span>orderDetails<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//清空购物车数据</span>
    shoppingCartService<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>备注:</p>
<p>​	上述逻辑处理中，计算购物车商品的总金额时，为保证我们每一次执行的累加计算是一个原子操作，我们这里用到了JDK中提供的一个原子类 AtomicInteger</p>
</blockquote>
<h3 id="_4-6-功能测试" tabindex="-1"><a class="header-anchor" href="#_4-6-功能测试" aria-hidden="true">#</a> 4.6 功能测试</h3>
<p>代码编写完成，我们重新启动服务，按照前面分析的操作流程进行测试，查看数据是否正常即可。在测试过程中，我们可以通过debug的形式来跟踪代码的正常执行。</p>
<img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814084822573.png" alt="image-20210814084822573" style="zoom: 67%;" /> 
<p><strong>检查数据库数据</strong></p>
<p>订单表插入一条记录：</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814084925524.png" alt="image-20210814084925524"></p>
<p>订单明细表插入四条记录()：</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814085019401.png" alt="image-20210814085019401"></p>
<p>同时，购物车的数据被删除：</p>
<p><img src="@source/gitredis/项目课程/讲义/瑞吉外卖-day06/assets/image-20210814085058814.png" alt="image-20210814085058814"></p>
</div></template>


