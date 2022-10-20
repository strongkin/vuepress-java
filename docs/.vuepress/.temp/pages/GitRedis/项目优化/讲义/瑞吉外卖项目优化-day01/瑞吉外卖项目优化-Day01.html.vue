<template><div><h1 id="瑞吉外卖项目优化-day01" tabindex="-1"><a class="header-anchor" href="#瑞吉外卖项目优化-day01" aria-hidden="true">#</a> 瑞吉外卖项目优化-Day01</h1>
<h2 id="课程内容" tabindex="-1"><a class="header-anchor" href="#课程内容" aria-hidden="true">#</a> 课程内容</h2>
<ul>
<li>环境搭建</li>
<li>缓存短信验证码</li>
<li>缓存菜品信息</li>
<li>SpringCache</li>
<li>缓存套餐数据</li>
</ul>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<blockquote>
<p>1). 当前系统存在的问题</p>
</blockquote>
<p>之前我们已经实现了移动端菜品展示、点餐、购物车、下单等功能，但是由于移动端是面向所有的消费者的，请求压力相对比较大，而我们当前所有的数据查询都是从数据库MySQL中直接查询的，那么可能就存在如下问题： ==频繁访问数据库，数据库访问压力大，系统性能下降，用户体验较差。==</p>
<p><img src="assets/image-20210819232120838.png" alt="image-20210819232120838"></p>
<blockquote>
<p>2). 解决该问题的方法</p>
</blockquote>
<p>要解决我们上述提到的问题，就可以使用我们前面学习的一个技术：Redis，通过Redis来做缓存，从而降低数据库的访问压力，提高系统的访问性能，从而提升用户体验。加入Redis做缓存之后，我们在进行数据查询时，就需要先查询缓存，如果缓存中有数据，直接返回，如果缓存中没有数据，则需要查询数据库，再将数据库查询的结果，缓存在redis中。</p>
<h2 id="_1-环境搭建" tabindex="-1"><a class="header-anchor" href="#_1-环境搭建" aria-hidden="true">#</a> 1. 环境搭建</h2>
<h3 id="_1-1-版本控制" tabindex="-1"><a class="header-anchor" href="#_1-1-版本控制" aria-hidden="true">#</a> 1.1 版本控制</h3>
<p>接下来，我们就需要对我们的功能进行优化，但是需要说明的是，我们不仅仅要对上述提到的缓存进行优化，还需要对我们程序的各个方面进行优化。我们本章节主要是针对于缓存进行优化，为了方便的对我们各个优化版本的代码进行管理，我们使用Git来控制代码版本。 那么此时我们就需要将我们之前开发完成的代码提交到Git，并且推送到码云Gitee的远程仓库，执行步骤如下：</p>
<p><strong>1). 创建Gitee远程仓库</strong></p>
<img src="assets/image-20210820000329886.png" alt="image-20210820000329886" style="zoom:80%;" /> 
<p><strong>2). idea-创建本地仓库</strong></p>
<p><img src="assets/image-20210820000700459.png" alt="image-20210820000700459"></p>
<p><strong>3). 准备忽略文件.gitignore</strong></p>
<p>在我们的项目中, 有一些文件是无需提交的到git，比如: .idea，target/，*.iml等。我们可以直接将今天课程资料中提供的.gitignore 文件导入到我们的项目中。</p>
<p><img src="assets/image-20210820001119649.png" alt="image-20210820001119649"></p>
<p><strong>4). idea-提交并推送本地代码</strong></p>
<p>A. 添加项目文件进暂存区</p>
<img src="assets/image-20210820001232154.png" alt="image-20210820001232154"  /> 
<p>B. 提交代码</p>
<img src="assets/image-20210820001805504.png" alt="image-20210820001805504"  /> 
<p><img src="assets/image-20210820002006653.png" alt="image-20210820002006653"></p>
<p>C. 推送代码到远程仓库</p>
<p><img src="assets/image-20210820002159587.png" alt="image-20210820002159587"></p>
<p><strong>5). 查看gitee远程仓库</strong></p>
<p><img src="assets/image-20210820002723619.png" alt="image-20210820002723619"></p>
<p><strong>6). 创建分支</strong></p>
<p>目前默认git中只有一个主分支master，我们接下来进行缓存的优化，就不在master分支来操作了，我们需要在git上创建一个单独的分支v1.0，缓存的优化，我们就在该分支上进行操作。</p>
<p><img src="assets/image-20210820003303544.png" alt="image-20210820003303544"></p>
<p>当前创建的v1.0分支，是基于master分支创建出来的，所以目前master分支的代码， 和v1.0分支的代码是完全一样的，接下来把v1.0的代码也推送至远程仓库。</p>
<p><strong>7). 推送分支代码到远程</strong></p>
<p><img src="assets/image-20210820003516900.png" alt="image-20210820003516900"></p>
<p><img src="assets/image-20210820003545764.png" alt="image-20210820003545764"></p>
<h3 id="_1-2-环境准备" tabindex="-1"><a class="header-anchor" href="#_1-2-环境准备" aria-hidden="true">#</a> 1.2 环境准备</h3>
<p><strong>1). 在项目的pom.xml文件中导入spring data redis的maven坐标</strong></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). 在项目的application.yml中加入redis相关配置</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> 192.168.200.200
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> root@123456
    <span class="token key atrule">database</span><span class="token punctuation">:</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>==注意: 引入上述依赖时,需要注意yml文件前面的缩进,上述配置应该配置在spring层级下面。==</p>
<p><strong>3). 编写Redis的配置类RedisConfig,定义RedisTemplate</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cache<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">CachingConfigurerSupport</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>connection<span class="token punctuation">.</span></span><span class="token class-name">RedisConnectionFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">RedisTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>serializer<span class="token punctuation">.</span></span><span class="token class-name">StringRedisSerializer</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisConfig</span> <span class="token keyword">extends</span> <span class="token class-name">CachingConfigurerSupport</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">redisTemplate</span><span class="token punctuation">(</span><span class="token class-name">RedisConnectionFactory</span> connectionFactory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> redisTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//默认的Key序列化器为：JdkSerializationRedisSerializer</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setKeySerializer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StringRedisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>connectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解释说明:</strong></p>
<p>1). 在SpringBoot工程启动时, 会加载一个自动配置类 RedisAutoConfiguration, 在里面已经声明了RedisTemplate这个bean</p>
<img src="assets/image-20210821091441695.png" alt="image-20210821091441695" style="zoom:80%;" /> 
<p>上述框架默认声明的RedisTemplate用的key和value的序列化方式是默认的 JdkSerializationRedisSerializer，如果key采用这种方式序列化，最终我们在测试时通过redis的图形化界面查询不是很方便，如下形式：</p>
<p><img src="assets/image-20210822003112692.png" alt="image-20210822003112692"></p>
<p>2). 如果使用我们自定义的RedisTemplate, key的序列化方式使用的是StringRedisSerializer, 也就是字符串形式, 最终效果如下:</p>
<p><img src="assets/image-20210822003408377.png" alt="image-20210822003408377"></p>
<p>3). 定义了两个bean会不会出现冲突呢? 答案是不会, 因为源码如下:</p>
<img src="assets/image-20210821092401172.png" alt="image-20210821092401172" style="zoom:80%;" /> 
<h2 id="_2-缓存短信验证码" tabindex="-1"><a class="header-anchor" href="#_2-缓存短信验证码" aria-hidden="true">#</a> 2. 缓存短信验证码</h2>
<h3 id="_2-1-思路分析" tabindex="-1"><a class="header-anchor" href="#_2-1-思路分析" aria-hidden="true">#</a> 2.1 思路分析</h3>
<p>前面我们已经实现了移动端手机验证码登录，随机生成的验证码我们是保存在HttpSession中的。但是在我们实际的业务场景中，一般验证码都是需要设置过期时间的，如果存在HttpSession中就无法设置过期时间，此时我们就需要对这一块的功能进行优化。</p>
<p>现在需要改造为将验证码缓存在Redis中，具体的实现思路如下：</p>
<p>1). 在服务端UserController中注入RedisTemplate对象，用于操作Redis;</p>
<p>2). 在服务端UserController的sendMsg方法中，将随机生成的验证码缓存到Redis中，并设置有效期为5分钟;</p>
<p>3). 在服务端UserController的login方法中，从Redis中获取缓存的验证码，如果登录成功则删除Redis中的验证码;</p>
<h3 id="_2-2-代码改造" tabindex="-1"><a class="header-anchor" href="#_2-2-代码改造" aria-hidden="true">#</a> 2.2 代码改造</h3>
<p>1). 在UserController中注入RedisTemplate对象，用于操作Redis</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span> redisTemplate<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2). 在UserController的sendMsg方法中，将生成的验证码保存到Redis</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//需要将生成的验证码保存到Redis,设置过期时间</span>
redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>phone<span class="token punctuation">,</span> code<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><img src="assets/image-20210821194944557.png" alt="image-20210821194944557"  /> 
<p>3). 在UserController的login方法中，从Redis中获取生成的验证码，如果登录成功则删除Redis中缓存的验证码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//从Redis中获取缓存的验证码</span>
<span class="token class-name">Object</span> codeInSession <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//从Redis中删除缓存的验证码</span>
redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="assets/image-20210821195329342.png" alt="image-20210821195329342"></p>
<h3 id="_2-3-功能测试" tabindex="-1"><a class="header-anchor" href="#_2-3-功能测试" aria-hidden="true">#</a> 2.3 功能测试</h3>
<p>代码编写完毕之后,重启服务。</p>
<p><strong>1). 访问前端工程，获取验证码</strong></p>
<p><img src="assets/image-20210821200212767.png" alt="image-20210821200212767"></p>
<p>通过控制台的日志，我们可以看到生成的验证码：</p>
<p><img src="assets/image-20210822002439892.png" alt="image-20210822002439892"></p>
<p><strong>2). 通过Redis的图形化界面工具查看Redis中的数据</strong></p>
<img src="assets/image-20210822003550941.png" alt="image-20210822003550941" style="zoom:97%;" /> 
<p><strong>3). 在登录界面填写验证码登录完成后,查看Redis中的数据是否删除</strong></p>
<p><img src="assets/image-20210822003732542.png" alt="image-20210822003732542"></p>
<h2 id="_3-缓存菜品信息" tabindex="-1"><a class="header-anchor" href="#_3-缓存菜品信息" aria-hidden="true">#</a> 3. 缓存菜品信息</h2>
<h3 id="_3-1-实现思路" tabindex="-1"><a class="header-anchor" href="#_3-1-实现思路" aria-hidden="true">#</a> 3.1 实现思路</h3>
<p>前面我们已经实现了移动端菜品查看功能，对应的服务端方法为DishController的list方法，此方法会根据前端提交的查询条件(categoryId)进行数据库查询操作。在高并发的情况下，频繁查询数据库会导致系统性能下降，服务端响应时间增长。现在需要对此方法进行缓存优化，提高系统的性能。</p>
<p>那么,我们又需要思考一个问题, 具体缓存几份数据呢, 所有的菜品缓存一份 , 还是说需要缓存多份呢? 我们可以看一下我们之前做的移动端效果:</p>
<img src="assets/image-20210822010136819.png" alt="image-20210822010136819" style="zoom:80%;" /> 
<p>我们点击哪一个分类,展示的就是该分类下的菜品, 其他菜品无需展示。所以，这里面我们在缓存时，可以根据菜品的分类，缓存多份数据，页面在查询时，点击的是哪个分类，我们就查询该分类下的菜品缓存数据。</p>
<p><strong>具体的实现思路如下：</strong></p>
<p>1). 改造DishController的list方法，先从Redis中获取分类对应的菜品数据，如果有则直接返回，无需查询数据库;如果没有则查询数据库，并将查询到的菜品数据存入Redis。</p>
<p>2). 改造DishController的save和update方法，加入清理缓存的逻辑。</p>
<blockquote>
<p>注意：</p>
<p>​	在使用缓存过程中，要注意保证数据库中的数据和缓存中的数据一致，如果数据库中的数据发生变化，需要及时清理缓存数据。否则就会造成缓存数据与数据库数据不一致的情况。</p>
</blockquote>
<h3 id="_3-2-代码改造" tabindex="-1"><a class="header-anchor" href="#_3-2-代码改造" aria-hidden="true">#</a> 3.2 代码改造</h3>
<p>需要改造的代码为： DishController</p>
<h4 id="_3-2-1-查询菜品缓存" tabindex="-1"><a class="header-anchor" href="#_3-2-1-查询菜品缓存" aria-hidden="true">#</a> 3.2.1 查询菜品缓存</h4>
<table>
<thead>
<tr>
<th>改造的方法</th>
<th>redis的数据类型</th>
<th>redis缓存的key</th>
<th>redis缓存的value</th>
</tr>
</thead>
<tbody>
<tr>
<td>list</td>
<td>string</td>
<td>dish_分类Id_状态 , 比如: dish_12323232323_1</td>
<td>List<DishDto></td>
</tr>
</tbody>
</table>
<p><strong>1). 在DishController中注入RedisTemplate</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span> redisTemplate<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). 在list方法中,查询数据库之前,先查询缓存, 缓存中有数据, 直接返回</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishDto</span><span class="token punctuation">></span></span> dishDtoList <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token comment">//动态构造key</span>
<span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">"dish_"</span> <span class="token operator">+</span> dish<span class="token punctuation">.</span><span class="token function">getCategoryId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"_"</span> <span class="token operator">+</span> dish<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//dish_1397844391040167938_1</span>
<span class="token comment">//先从redis中获取缓存数据</span>
dishDtoList <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishDto</span><span class="token punctuation">></span></span><span class="token punctuation">)</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>dishDtoList <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//如果存在，直接返回，无需查询数据库</span>
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>dishDtoList<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="assets/image-20210822011323316.png" alt="image-20210822011323316" style="zoom:90%;" /> 
<p><strong>3). 如果redis不存在，查询数据库，并将数据库查询结果，缓存在redis，并设置过期时间</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//如果不存在，需要查询数据库，将查询到的菜品数据缓存到Redis</span>
redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>dishDtoList<span class="token punctuation">,</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><img src="assets/image-20210822011714110.png" alt="image-20210822011714110" style="zoom:90%;" /> 
<h4 id="_3-2-2-清理菜品缓存" tabindex="-1"><a class="header-anchor" href="#_3-2-2-清理菜品缓存" aria-hidden="true">#</a> 3.2.2 清理菜品缓存</h4>
<p>为了保证数据库中的数据和缓存中的数据一致，如果数据库中的数据发生变化，需要及时清理缓存数据。所以，我们需要在添加菜品、更新菜品时清空缓存数据。</p>
<p><strong>1). 保存菜品,清空缓存</strong></p>
<p>在保存菜品的方法save中，当菜品数据保存完毕之后，需要清空菜品的缓存。那么这里清理菜品缓存的方式存在两种：</p>
<p>A. 清理所有分类下的菜品缓存</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//清理所有菜品的缓存数据</span>
<span class="token class-name">Set</span> keys <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token string">"dish_*"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//获取所有以dish_xxx开头的key</span>
redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>keys<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//删除这些key</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>B. 清理当前添加菜品分类下的缓存</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//清理某个分类下面的菜品缓存数据</span>
<span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">"dish_"</span> <span class="token operator">+</span> dishDto<span class="token punctuation">.</span><span class="token function">getCategoryId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"_1"</span><span class="token punctuation">;</span>
redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此处, 我们推荐使用第二种清理的方式, 只清理当前菜品关联的分类下的菜品数据。</p>
<img src="assets/image-20210822013114996.png" alt="image-20210822013114996" style="zoom:80%;" /> 
<p><strong>2). 更新菜品,清空缓存</strong></p>
<p>在更新菜品的方法update中，当菜品数据更新完毕之后，需要清空菜品的缓存。这里清理缓存的方式和上述基本一致。</p>
<p>A. 清理所有分类下的菜品缓存</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//清理所有菜品的缓存数据</span>
<span class="token class-name">Set</span> keys <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token string">"dish_*"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//获取所有以dish_xxx开头的key</span>
redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>keys<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//删除这些key</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>B. 清理当前添加菜品分类下的缓存</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//清理某个分类下面的菜品缓存数据</span>
<span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">"dish_"</span> <span class="token operator">+</span> dishDto<span class="token punctuation">.</span><span class="token function">getCategoryId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"_1"</span><span class="token punctuation">;</span>
redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="assets/image-20210822013609299.png" alt="image-20210822013609299"></p>
<p>==注意: 在这里我们推荐使用第一种方式进行清理，这样逻辑更加严谨。 因为对于修改操作，用户是可以修改菜品的分类的，如果用户修改了菜品的分类，那么原来分类下将少一个菜品，新的分类下将多一个菜品，这样的话，两个分类下的菜品列表数据都发生了变化。==</p>
<h3 id="_3-3-功能测试" tabindex="-1"><a class="header-anchor" href="#_3-3-功能测试" aria-hidden="true">#</a> 3.3 功能测试</h3>
<p>代码编写完毕之后,重新启动服务。</p>
<p>1). 访问移动端，根据分类查询菜品列表，然后再检查Redis的缓存数据，是否可以正常缓存；</p>
<p><img src="assets/image-20210822221038509.png" alt="image-20210822221038509"></p>
<p>我们也可以在服务端，通过debug断点的形式一步一步的跟踪代码的执行。</p>
<p>2). 当我们在进行新增及修改菜品时, 查询Redis中的缓存数据, 是否被清除;</p>
<h3 id="_3-4-提交并推送代码" tabindex="-1"><a class="header-anchor" href="#_3-4-提交并推送代码" aria-hidden="true">#</a> 3.4 提交并推送代码</h3>
<p><strong>1). 提交并推送代码</strong></p>
<p>在v1.0分支中, 将我们已经实现并且测试通过的使用redis缓存验证码和菜品信息的代码,提交并推送至Gitee</p>
<img src="assets/image-20210822222206452.png" alt="image-20210822222206452" style="zoom:80%;" /> 
<img src="assets/image-20210822222244727.png" alt="image-20210822222244727" style="zoom:80%;" /> 
<p><strong>2). 合并代码到master分支</strong></p>
<p>A. 将代码切换到master分支</p>
<img src="assets/image-20210822222756572.png" alt="image-20210822222756572" style="zoom:80%;" /> 
<p>B. 将v1.0分支的代码合并到当前master分支</p>
<img src="assets/image-20210822223314087.png" alt="image-20210822223314087" style="zoom:80%;" /> 
<p>C. 将master分支合并后代码推送到Gitee</p>
<img src="assets/image-20210822223837020.png" alt="image-20210822223837020" style="zoom:80%;" /> 
<img src="assets/image-20210822223912803.png" alt="image-20210822223912803" style="zoom:80%;" /> 
<h2 id="_4-springcache" tabindex="-1"><a class="header-anchor" href="#_4-springcache" aria-hidden="true">#</a> 4. SpringCache</h2>
<h3 id="_4-1-介绍" tabindex="-1"><a class="header-anchor" href="#_4-1-介绍" aria-hidden="true">#</a> 4.1 介绍</h3>
<p><strong>Spring Cache</strong>是一个框架，实现了基于注解的缓存功能，只需要简单地加一个注解，就能实现缓存功能，大大简化我们在业务中操作缓存的代码。</p>
<p>Spring Cache只是提供了一层抽象，底层可以切换不同的cache实现。具体就是通过<strong>CacheManager</strong>接口来统一不同的缓存技术。CacheManager是Spring提供的各种缓存技术抽象接口。</p>
<p>针对不同的缓存技术需要实现不同的CacheManager：</p>
<table>
<thead>
<tr>
<th><strong>CacheManager</strong></th>
<th><strong>描述</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>EhCacheCacheManager</td>
<td>使用EhCache作为缓存技术</td>
</tr>
<tr>
<td>GuavaCacheManager</td>
<td>使用Google的GuavaCache作为缓存技术</td>
</tr>
<tr>
<td>RedisCacheManager</td>
<td>使用Redis作为缓存技术</td>
</tr>
</tbody>
</table>
<h3 id="_4-2-注解" tabindex="-1"><a class="header-anchor" href="#_4-2-注解" aria-hidden="true">#</a> 4.2 注解</h3>
<p>在SpringCache中提供了很多缓存操作的注解，常见的是以下的几个：</p>
<table>
<thead>
<tr>
<th><strong>注解</strong></th>
<th><strong>说明</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>@EnableCaching</td>
<td>开启缓存注解功能</td>
</tr>
<tr>
<td>@Cacheable</td>
<td>在方法执行前spring先查看缓存中是否有数据，如果有数据，则直接返回缓存数据；若没有数据，调用方法并将方法返回值放到缓存中</td>
</tr>
<tr>
<td>@CachePut</td>
<td>将方法的返回值放到缓存中</td>
</tr>
<tr>
<td>@CacheEvict</td>
<td>将一条或多条数据从缓存中删除</td>
</tr>
</tbody>
</table>
<p>在spring boot项目中，使用缓存技术只需在项目中导入相关缓存技术的依赖包，并在启动类上使用@EnableCaching开启缓存支持即可。</p>
<p>例如，使用Redis作为缓存技术，只需要导入Spring data Redis的maven坐标即可。</p>
<h3 id="_4-3-入门程序" tabindex="-1"><a class="header-anchor" href="#_4-3-入门程序" aria-hidden="true">#</a> 4.3 入门程序</h3>
<p>接下来，我们将通过一个入门案例来演示一下SpringCache的常见用法。 上面我们提到，SpringCache可以集成不同的缓存技术，如Redis、Ehcache甚至我们可以使用Map来缓存数据， 接下来我们在演示的时候，就先通过一个Map来缓存数据，最后我们再换成Redis来缓存。</p>
<h4 id="_4-3-1-环境准备" tabindex="-1"><a class="header-anchor" href="#_4-3-1-环境准备" aria-hidden="true">#</a> 4.3.1 环境准备</h4>
<p><strong>1). 数据库准备</strong></p>
<p>将今天资料中的SQL脚本直接导入数据库中。</p>
<p><img src="assets/image-20210822230236957.png" alt="image-20210822230236957"></p>
<p><strong>2). 导入基础工程</strong></p>
<p>基础环境的代码，在我们今天的资料中已经准备好了， 大家只需要将这个工程导入进来就可以了。导入进来的工程结构如下：</p>
<p><img src="assets/image-20210822225934512.png" alt="image-20210822225934512"></p>
<p>由于SpringCache的基本功能是Spring核心(spring-context)中提供的，所以目前我们进行简单的SpringCache测试，是可以不用额外引入其他依赖的。</p>
<p><strong>3). 注入CacheManager</strong></p>
<p>我们可以在UserController注入一个CacheManager，在Debug时，我们可以通过CacheManager跟踪缓存中数据的变化。</p>
<img src="assets/image-20210822231333527.png" alt="image-20210822231333527" style="zoom:80%;" /> 
<p>我们可以看到CacheManager是一个接口，默认的实现有以下几种 ；</p>
<p><img src="assets/image-20210822231217450.png" alt="image-20210822231217450"></p>
<p>而在上述的这几个实现中，默认使用的是 ConcurrentMapCacheManager。稍后我们可以通过断点的形式跟踪缓存数据的变化。</p>
<p><strong>4). 引导类上加@EnableCaching</strong></p>
<p>在引导类上加该注解，就代表当前项目开启缓存注解功能。</p>
<p><img src="assets/image-20210822231616569.png" alt="image-20210822231616569"></p>
<h4 id="_4-3-2-cacheput注解" tabindex="-1"><a class="header-anchor" href="#_4-3-2-cacheput注解" aria-hidden="true">#</a> 4.3.2 @CachePut注解</h4>
<blockquote>
<p>@CachePut 说明：</p>
<p>​	作用: 将方法返回值，放入缓存</p>
<p>​	value: 缓存的名称, 每个缓存名称下面可以有很多key</p>
<p>​	key: 缓存的key  ----------&gt; 支持Spring的表达式语言SPEL语法</p>
</blockquote>
<p><strong>1). 在save方法上加注解@CachePut</strong></p>
<p>当前UserController的save方法是用来保存用户信息的，我们希望在该用户信息保存到数据库的同时，也往缓存中缓存一份数据，我们可以在save方法上加上注解 @CachePut，用法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* CachePut：将方法返回值放入缓存
* value：缓存的名称，每个缓存名称下面可以有多个key
* key：缓存的key
*/</span>
<span class="token annotation punctuation">@CachePut</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"userCache"</span><span class="token punctuation">,</span> key <span class="token operator">=</span> <span class="token string">"#user.id"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@PostMapping</span>
<span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">{</span>
    userService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> user<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>key的写法如下：</p>
<p>​	#user.id : #user指的是方法形参的名称, id指的是user的id属性 , 也就是使用user的id属性作为key ;</p>
<p>​	#user.name: #user指的是方法形参的名称, name指的是user的name属性 ,也就是使用user的name属性作为key ;</p>
<p>​</p>
<p>​	#result.id : #result代表方法返回值，该表达式 代表以返回对象的id属性作为key ；</p>
<p>​	#result.name : #result代表方法返回值，该表达式 代表以返回对象的name属性作为key ；</p>
</blockquote>
<p><strong>2). 测试</strong></p>
<p>启动服务,通过postman请求访问UserController的方法, 然后通过断点的形式跟踪缓存数据。</p>
<p><img src="assets/image-20210822233438182.png" alt="image-20210822233438182"></p>
<p>第一次访问时，缓存中的数据是空的，因为save方法执行完毕后才会缓存数据。</p>
<p><img src="assets/image-20210822233724439.png" alt="image-20210822233724439"></p>
<p>第二次访问时，我们通过debug可以看到已经有一条数据了，就是上次保存的数据，已经缓存了，缓存的key就是用户的id。</p>
<p><img src="assets/image-20210822234105085.png" alt="image-20210822234105085"></p>
<p>==注意: 上述的演示，最终的数据，实际上是缓存在ConcurrentHashMap中，那么当我们的服务器重启之后，缓存中的数据就会丢失。 我们后面使用了Redis来缓存就不存在这样的问题了。==</p>
<h4 id="_4-3-3-cacheevict注解" tabindex="-1"><a class="header-anchor" href="#_4-3-3-cacheevict注解" aria-hidden="true">#</a> 4.3.3 @CacheEvict注解</h4>
<blockquote>
<p>@CacheEvict 说明：</p>
<p>​	作用: 清理指定缓存</p>
<p>​	value: 缓存的名称，每个缓存名称下面可以有多个key</p>
<p>​	key: 缓存的key  ----------&gt; 支持Spring的表达式语言SPEL语法</p>
</blockquote>
<p><strong>1). 在 delete 方法上加注解@CacheEvict</strong></p>
<p>当我们在删除数据库user表的数据的时候,我们需要删除缓存中对应的数据,此时就可以使用@CacheEvict注解, 具体的使用方式如下:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* CacheEvict：清理指定缓存
* value：缓存的名称，每个缓存名称下面可以有多个key
* key：缓存的key
*/</span>
<span class="token annotation punctuation">@CacheEvict</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"userCache"</span><span class="token punctuation">,</span>key <span class="token operator">=</span> <span class="token string">"#p0"</span><span class="token punctuation">)</span>  <span class="token comment">//#p0 代表第一个参数</span>
<span class="token comment">//@CacheEvict(value = "userCache",key = "#root.args[0]") //#root.args[0] 代表第一个参数</span>
<span class="token comment">//@CacheEvict(value = "userCache",key = "#id") //#id 代表变量名为id的参数</span>
<span class="token annotation punctuation">@DeleteMapping</span><span class="token punctuation">(</span><span class="token string">"/{id}"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
    userService<span class="token punctuation">.</span><span class="token function">removeById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). 测试</strong></p>
<p>要测试缓存的删除，我们先访问save方法4次，保存4条数据到数据库的同时，也保存到缓存中，最终我们可以通过debug看到缓存中的数据信息。 然后我们在通过postman访问delete方法， 如下：</p>
<p><img src="assets/image-20210823000431356.png" alt="image-20210823000431356"></p>
<p>删除数据时，通过debug我们可以看到已经缓存的4条数据：</p>
<p><img src="assets/image-20210823000458089.png" alt="image-20210823000458089"></p>
<p>当执行完delete操作之后，我们再次保存一条数据，在保存的时候debug查看一下删除的ID值是否已经被删除。</p>
<p><img src="assets/image-20210823000733218.png" alt="image-20210823000733218"></p>
<p><strong>3). 在 update 方法上加注解@CacheEvict</strong></p>
<p>在更新数据之后，数据库的数据已经发生了变更，我们需要将缓存中对应的数据删除掉，避免出现数据库数据与缓存数据不一致的情况。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//@CacheEvict(value = "userCache",key = "#p0.id")   //第一个参数的id属性</span>
<span class="token comment">//@CacheEvict(value = "userCache",key = "#user.id") //参数名为user参数的id属性</span>
<span class="token comment">//@CacheEvict(value = "userCache",key = "#root.args[0].id") //第一个参数的id属性</span>
<span class="token annotation punctuation">@CacheEvict</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"userCache"</span><span class="token punctuation">,</span>key <span class="token operator">=</span> <span class="token string">"#result.id"</span><span class="token punctuation">)</span>         <span class="token comment">//返回值的id属性</span>
<span class="token annotation punctuation">@PutMapping</span>
<span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">{</span>
    userService<span class="token punctuation">.</span><span class="token function">updateById</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> user<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加上注解之后，我们可以重启服务，然后测试方式，基本和上述相同，先缓存数据，然后再更新某一条数据，通过debug的形式查询缓存数据的情况。</p>
<h4 id="_4-3-4-cacheable注解" tabindex="-1"><a class="header-anchor" href="#_4-3-4-cacheable注解" aria-hidden="true">#</a> 4.3.4 @Cacheable注解</h4>
<blockquote>
<p>@Cacheable 说明:</p>
<p>​	作用: 在方法执行前，spring先查看缓存中是否有数据，如果有数据，则直接返回缓存数据；若没有数据，调用方法并将方法返回值放到缓存中</p>
<p>​	value: 缓存的名称，每个缓存名称下面可以有多个key</p>
<p>​	key: 缓存的key  ----------&gt; 支持Spring的表达式语言SPEL语法</p>
</blockquote>
<p><strong>1). 在getById上加注解@Cacheable</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* Cacheable：在方法执行前spring先查看缓存中是否有数据，如果有数据，则直接返回缓存数据；若没有数据，调用方法并将方法返回值放到缓存中
* value：缓存的名称，每个缓存名称下面可以有多个key
* key：缓存的key
*/</span>
<span class="token annotation punctuation">@Cacheable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"userCache"</span><span class="token punctuation">,</span>key <span class="token operator">=</span> <span class="token string">"#id"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/{id}"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">getById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> userService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> user<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). 测试</strong></p>
<p>我们可以重启服务，然后通过debug断点跟踪程序执行。我们发现，第一次访问，会请求我们controller的方法，查询数据库。后面再查询相同的id，就直接获取到数据库，不用再查询数据库了，就说明缓存生效了。</p>
<p><img src="assets/image-20210823002517941.png" alt="image-20210823002517941"></p>
<p>当我们在测试时，查询一个数据库不存在的id值，第一次查询缓存中没有，也会查询数据库。而第二次再查询时，会发现，不再查询数据库了，而是直接返回，那也就是说如果根据ID没有查询到数据,那么会自动缓存一个null值。 我们可以通过debug，验证一下：</p>
<p><img src="assets/image-20210823002907048.png" alt="image-20210823002907048"></p>
<p>我们能不能做到，当查询到的值不为null时，再进行缓存，如果为null，则不缓存呢? 答案是可以的。</p>
<p><strong>3). 缓存非null值</strong></p>
<p>在@Cacheable注解中，提供了两个属性分别为： condition， unless 。</p>
<blockquote>
<p>condition : 表示满足什么条件, 再进行缓存 ;</p>
<p>unless : 表示满足条件则不缓存 ; 与上述的condition是反向的 ;</p>
</blockquote>
<p>具体实现方式如下:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Cacheable：在方法执行前spring先查看缓存中是否有数据，如果有数据，则直接返回缓存数据；若没有数据，调用方法并将方法返回值放到缓存中
 * value：缓存的名称，每个缓存名称下面可以有多个key
 * key：缓存的key
 * condition：条件，满足条件时才缓存数据
 * unless：满足条件则不缓存
 */</span>
<span class="token annotation punctuation">@Cacheable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"userCache"</span><span class="token punctuation">,</span>key <span class="token operator">=</span> <span class="token string">"#id"</span><span class="token punctuation">,</span> unless <span class="token operator">=</span> <span class="token string">"#result == null"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/{id}"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">getById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> userService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> user<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>==注意： 此处，我们使用的时候只能够使用 unless， 因为在condition中，我们是无法获取到结果 #result的。==</p>
<p><strong>4). 在list方法上加注解@Cacheable</strong></p>
<p>在list方法中进行查询时，有两个查询条件，如果传递了id，根据id查询； 如果传递了name， 根据name查询，那么我们缓存的key在设计的时候，就需要既包含id，又包含name。 具体的代码实现如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Cacheable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"userCache"</span><span class="token punctuation">,</span>key <span class="token operator">=</span> <span class="token string">"#user.id + '_' + #user.name"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/list"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">,</span><span class="token class-name">User</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span>user<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">,</span><span class="token class-name">User</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span>user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> userService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> list<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再次重启服务，进行测试。</p>
<p><img src="assets/image-20210823005220230.png" alt="image-20210823005220230"></p>
<p>第一次查询时，需要查询数据库，在后续的查询中，就直接查询了缓存，不再查询数据库了。</p>
<h3 id="_4-4-集成redis" tabindex="-1"><a class="header-anchor" href="#_4-4-集成redis" aria-hidden="true">#</a> 4.4 集成Redis</h3>
<p>在使用上述默认的ConcurrentHashMap做缓存时，服务重启之后，之前缓存的数据就全部丢失了，操作起来并不友好。在项目中使用，我们会选择使用redis来做缓存，主要需要操作以下几步：</p>
<p>1). pom.xml</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-cache<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2). application.yml</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> 192.168.200.200
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> root@123456
    <span class="token key atrule">database</span><span class="token punctuation">:</span> <span class="token number">0</span>
  <span class="token key atrule">cache</span><span class="token punctuation">:</span>
    <span class="token key atrule">redis</span><span class="token punctuation">:</span>
      <span class="token key atrule">time-to-live</span><span class="token punctuation">:</span> <span class="token number">1800000</span>   <span class="token comment">#设置缓存过期时间，可选</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3). 测试</p>
<p>重新启动项目，通过postman发送根据id查询数据的请求，然后通过redis的图形化界面工具，查看redis中是否可以正常的缓存数据。</p>
<p><img src="assets/image-20210823010810680.png" alt="image-20210823010810680"></p>
<p><img src="assets/image-20210823010742530.png" alt="image-20210823010742530"></p>
<h2 id="_5-缓存套餐数据" tabindex="-1"><a class="header-anchor" href="#_5-缓存套餐数据" aria-hidden="true">#</a> 5. 缓存套餐数据</h2>
<h3 id="_5-1-实现思路" tabindex="-1"><a class="header-anchor" href="#_5-1-实现思路" aria-hidden="true">#</a> 5.1 实现思路</h3>
<p>前面我们已经实现了移动端套餐查看功能，对应的服务端方法为SetmealController的list方法，此方法会根据前端提交的查询条件进行数据库查询操作。在高并发的情况下，频繁查询数据库会导致系统性能下降，服务端响应时间增长。现在需要对此方法进行缓存优化，提高系统的性能。</p>
<p>具体的实现思路如下：</p>
<p>1). 导入Spring Cache和Redis相关maven坐标</p>
<p>2). 在application.yml中配置缓存数据的过期时间</p>
<p>3). 在启动类上加入@EnableCaching注解，开启缓存注解功能</p>
<p>4). 在SetmealController的list方法上加入@Cacheable注解</p>
<p>5). 在SetmealController的save和delete方法上加入CacheEvict注解</p>
<h3 id="_5-2-缓存套餐数据" tabindex="-1"><a class="header-anchor" href="#_5-2-缓存套餐数据" aria-hidden="true">#</a> 5.2 缓存套餐数据</h3>
<h4 id="_5-2-1-代码实现" tabindex="-1"><a class="header-anchor" href="#_5-2-1-代码实现" aria-hidden="true">#</a> 5.2.1 代码实现</h4>
<p>1). pom.xml中引入依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-cache<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>==备注: spring-boot-starter-data-redis 这个依赖前面已经引入了, 无需再次引入。==</p>
<p>2). application.yml中设置缓存过期时间</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>  
  <span class="token key atrule">cache</span><span class="token punctuation">:</span>
    <span class="token key atrule">redis</span><span class="token punctuation">:</span>
      <span class="token key atrule">time-to-live</span><span class="token punctuation">:</span> <span class="token number">1800000</span> <span class="token comment">#设置缓存数据的过期时间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3). 启动类上加入@EnableCaching注解</p>
<p><img src="assets/image-20210823232419408.png" alt="image-20210823232419408"></p>
<p>4). SetmealController的list方法上加入@Cacheable注解</p>
<p>在进行套餐数据查询时，我们需要根据分类ID和套餐的状态进行查询，所以我们在缓存数据时，可以将套餐分类ID和套餐状态组合起来作为key，如： 1627182182_1 (1627182182为分类ID，1为状态)。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* 根据条件查询套餐数据
* <span class="token keyword">@param</span> <span class="token parameter">setmeal</span>
* <span class="token keyword">@return</span>
*/</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/list"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Cacheable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"setmealCache"</span><span class="token punctuation">,</span>key <span class="token operator">=</span> <span class="token string">"#setmeal.categoryId + '_' + #setmeal.status"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Setmeal</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">Setmeal</span> setmeal<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Setmeal</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>setmeal<span class="token punctuation">.</span><span class="token function">getCategoryId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">,</span><span class="token class-name">Setmeal</span><span class="token operator">::</span><span class="token function">getCategoryId</span><span class="token punctuation">,</span>setmeal<span class="token punctuation">.</span><span class="token function">getCategoryId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>setmeal<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">,</span><span class="token class-name">Setmeal</span><span class="token operator">::</span><span class="token function">getStatus</span><span class="token punctuation">,</span>setmeal<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">orderByDesc</span><span class="token punctuation">(</span><span class="token class-name">Setmeal</span><span class="token operator">::</span><span class="token function">getUpdateTime</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Setmeal</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> setmealService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-2-测试" tabindex="-1"><a class="header-anchor" href="#_5-2-2-测试" aria-hidden="true">#</a> 5.2.2 测试</h4>
<p>缓存数据的代码编写完毕之后，重新启动服务，访问移动端进行测试，我们登陆之后在点餐界面，点击某一个套餐分类，查询套餐列表数据时，服务端报错了，错误信息如下：</p>
<img src="assets/image-20210823233406888.png" alt="image-20210823233406888" style="zoom:80%;" /> 
<p><img src="assets/image-20210823233514356.png" alt="image-20210823233514356"></p>
<p>==为什么会报出这个错误呢？==</p>
<p>因为 @Cacheable 会将方法的返回值R缓存在Redis中，而在Redis中存储对象，该对象是需要被序列化的，而对象要想被成功的序列化，就必须得实现 Serializable 接口。而当前我们定义的R，并未实现 Serializable 接口。所以，要解决该异常，只需要让R实现  Serializable 接口即可。如下：</p>
<p><img src="assets/image-20210823233904520.png" alt="image-20210823233904520"></p>
<p>修复完毕之后，再次重新测试，访问套餐分类下对应的套餐列表数据后，我们会看到Redis中确实可以缓存对应的套餐列表数据。</p>
<p><img src="assets/image-20210823234146526.png" alt="image-20210823234146526"></p>
<h3 id="_5-3-清理套餐数据" tabindex="-1"><a class="header-anchor" href="#_5-3-清理套餐数据" aria-hidden="true">#</a> 5.3 清理套餐数据</h3>
<h4 id="_5-3-1-代码实现" tabindex="-1"><a class="header-anchor" href="#_5-3-1-代码实现" aria-hidden="true">#</a> 5.3.1 代码实现</h4>
<p>为了保证数据库中数据与缓存数据的一致性，在我们添加套餐或者删除套餐数据之后，需要清空当前套餐缓存的全部数据。那么@CacheEvict注解如何清除某一份缓存下所有的数据呢，这里我们可以指定@CacheEvict中的一个属性 allEnties，将其设置为true即可。</p>
<p><strong>1). 在delete方法上加注解@CacheEvict</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 删除套餐
 * <span class="token keyword">@param</span> <span class="token parameter">ids</span>
 * <span class="token keyword">@return</span>
 */</span>
<span class="token annotation punctuation">@DeleteMapping</span>
<span class="token annotation punctuation">@CacheEvict</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"setmealCache"</span><span class="token punctuation">,</span>allEntries <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">//清除setmealCache名称下,所有的缓存数据</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> ids<span class="token punctuation">)</span><span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"ids:{}"</span><span class="token punctuation">,</span>ids<span class="token punctuation">)</span><span class="token punctuation">;</span>
    setmealService<span class="token punctuation">.</span><span class="token function">removeWithDish</span><span class="token punctuation">(</span>ids<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">"套餐数据删除成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). 在delete方法上加注解@CacheEvict</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 新增套餐
 * <span class="token keyword">@param</span> <span class="token parameter">setmealDto</span>
 * <span class="token keyword">@return</span>
 */</span>
<span class="token annotation punctuation">@PostMapping</span>
<span class="token annotation punctuation">@CacheEvict</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"setmealCache"</span><span class="token punctuation">,</span>allEntries <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">//清除setmealCache名称下,所有的缓存数据</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">SetmealDto</span> setmealDto<span class="token punctuation">)</span><span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"套餐信息：{}"</span><span class="token punctuation">,</span>setmealDto<span class="token punctuation">)</span><span class="token punctuation">;</span>

    setmealService<span class="token punctuation">.</span><span class="token function">saveWithDish</span><span class="token punctuation">(</span>setmealDto<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">"新增套餐成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-2-测试" tabindex="-1"><a class="header-anchor" href="#_5-3-2-测试" aria-hidden="true">#</a> 5.3.2 测试</h4>
<p>代码编写完成之后,重启工程,然后访问后台管理系统,对套餐数据进行新增 以及 删除, 然后通过Redis的图形化界面工具,查看Redis中的套餐缓存是否已经被删除。</p>
<h3 id="_5-4-提交推送代码" tabindex="-1"><a class="header-anchor" href="#_5-4-提交推送代码" aria-hidden="true">#</a> 5.4 提交推送代码</h3>
<p>到目前为止，我们已经在v1.0这个分支中完成了套餐数据的缓存，接下来我们就需要将代码提交并推送到远程仓库。</p>
<p><img src="assets/image-20210823235612400.png" alt="image-20210823235612400"></p>
<p>然后，在idea中切换到master分支，然后将v1.0分支的代码合并到master。</p>
<p><img src="assets/image-20210823235822139.png" alt="image-20210823235822139"></p>
<p>再将合并后的master分支的代码，推送到远程仓库。</p>
<p><img src="assets/image-20210824000057260.png" alt="image-20210824000057260"></p>
</div></template>


