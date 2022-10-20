<template><div><h1 id="多级缓存" tabindex="-1"><a class="header-anchor" href="#多级缓存" aria-hidden="true">#</a> 多级缓存</h1>
<h1 id="_0-学习目标" tabindex="-1"><a class="header-anchor" href="#_0-学习目标" aria-hidden="true">#</a> 0.学习目标</h1>
<h1 id="_1-什么是多级缓存" tabindex="-1"><a class="header-anchor" href="#_1-什么是多级缓存" aria-hidden="true">#</a> 1.什么是多级缓存</h1>
<p>传统的缓存策略一般是请求到达Tomcat后，先查询Redis，如果未命中则查询数据库，如图：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821075259137.png" alt="image-20210821075259137"></p>
<p>存在下面的问题：</p>
<p>•请求要经过Tomcat处理，Tomcat的性能成为整个系统的瓶颈</p>
<p>•Redis缓存失效时，会对数据库产生冲击</p>
<p>多级缓存就是充分利用请求处理的每个环节，分别添加缓存，减轻Tomcat压力，提升服务性能：</p>
<ul>
<li>浏览器访问静态资源时，优先读取浏览器本地缓存</li>
<li>访问非静态资源（ajax查询数据）时，访问服务端</li>
<li>请求到达Nginx后，优先读取Nginx本地缓存</li>
<li>如果Nginx本地缓存未命中，则去直接查询Redis（不经过Tomcat）</li>
<li>如果Redis查询未命中，则查询Tomcat</li>
<li>请求进入Tomcat后，优先查询JVM进程缓存</li>
<li>如果JVM进程缓存未命中，则查询数据库</li>
</ul>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821075558137.png" alt="image-20210821075558137"></p>
<p>在多级缓存架构中，Nginx内部需要编写本地缓存查询、Redis查询、Tomcat查询的业务逻辑，因此这样的nginx服务不再是一个<strong>反向代理服务器</strong>，而是一个编写<strong>业务的Web服务器了</strong>。</p>
<p>因此这样的业务Nginx服务也需要搭建集群来提高并发，再有专门的nginx服务来做反向代理，如图：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821080511581.png" alt="image-20210821080511581"></p>
<p>另外，我们的Tomcat服务将来也会部署为集群模式：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821080954947.png" alt="image-20210821080954947"></p>
<p>可见，多级缓存的关键有两个：</p>
<ul>
<li>
<p>一个是在nginx中编写业务，实现nginx本地缓存、Redis、Tomcat的查询</p>
</li>
<li>
<p>另一个就是在Tomcat中实现JVM进程缓存</p>
</li>
</ul>
<p>其中Nginx编程则会用到OpenResty框架结合Lua这样的语言。</p>
<p>这也是今天课程的难点和重点。</p>
<h1 id="_2-jvm进程缓存" tabindex="-1"><a class="header-anchor" href="#_2-jvm进程缓存" aria-hidden="true">#</a> 2.JVM进程缓存</h1>
<p>为了演示多级缓存的案例，我们先准备一个商品查询的业务。</p>
<h2 id="_2-1-导入案例" tabindex="-1"><a class="header-anchor" href="#_2-1-导入案例" aria-hidden="true">#</a> 2.1.导入案例</h2>
<p>参考课前资料的：《案例导入说明.md》</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821081418456.png" alt="image-20210821081418456"></p>
<h2 id="_2-2-初识caffeine" tabindex="-1"><a class="header-anchor" href="#_2-2-初识caffeine" aria-hidden="true">#</a> 2.2.初识Caffeine</h2>
<p>缓存在日常开发中启动至关重要的作用，由于是存储在内存中，数据的读取速度是非常快的，能大量减少对数据库的访问，减少数据库的压力。我们把缓存分为两类：</p>
<ul>
<li>分布式缓存，例如Redis：
<ul>
<li>优点：存储容量更大、可靠性更好、可以在集群间共享</li>
<li>缺点：访问缓存有网络开销</li>
<li>场景：缓存数据量较大、可靠性要求较高、需要在集群间共享</li>
</ul>
</li>
<li>进程本地缓存，例如HashMap、GuavaCache：
<ul>
<li>优点：读取本地内存，没有网络开销，速度更快</li>
<li>缺点：存储容量有限、可靠性较低、无法共享</li>
<li>场景：性能要求较高，缓存数据量较小</li>
</ul>
</li>
</ul>
<p>我们今天会利用Caffeine框架来实现JVM进程缓存。</p>
<p><strong>Caffeine</strong>是一个基于Java8开发的，提供了近乎最佳命中率的高性能的本地缓存库。目前Spring内部的缓存使用的就是Caffeine。GitHub地址：https://github.com/ben-manes/caffeine</p>
<p>Caffeine的性能非常好，下图是官方给出的性能对比：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821081826399.png" alt="image-20210821081826399"></p>
<p>可以看到Caffeine的性能遥遥领先！</p>
<p>缓存使用的基本API：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">testBasicOps</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 构建cache对象</span>
    <span class="token class-name">Cache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> cache <span class="token operator">=</span> <span class="token class-name">Caffeine</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 存数据</span>
    cache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"gf"</span><span class="token punctuation">,</span> <span class="token string">"迪丽热巴"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 取数据</span>
    <span class="token class-name">String</span> gf <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">getIfPresent</span><span class="token punctuation">(</span><span class="token string">"gf"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"gf = "</span> <span class="token operator">+</span> gf<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 取数据，包含两个参数：</span>
    <span class="token comment">// 参数一：缓存的key</span>
    <span class="token comment">// 参数二：Lambda表达式，表达式参数就是缓存的key，方法体是查询数据库的逻辑</span>
    <span class="token comment">// 优先根据key查询JVM缓存，如果未命中，则执行参数二的Lambda表达式</span>
    <span class="token class-name">String</span> defaultGF <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"defaultGF"</span><span class="token punctuation">,</span> key <span class="token operator">-></span> <span class="token punctuation">{</span>
        <span class="token comment">// 根据key去数据库查询数据</span>
        <span class="token keyword">return</span> <span class="token string">"柳岩"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"defaultGF = "</span> <span class="token operator">+</span> defaultGF<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Caffeine既然是缓存的一种，肯定需要有缓存的清除策略，不然的话内存总会有耗尽的时候。</p>
<p>Caffeine提供了三种缓存驱逐策略：</p>
<ul>
<li>
<p><strong>基于容量</strong>：设置缓存的数量上限</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 创建缓存对象</span>
<span class="token class-name">Cache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> cache <span class="token operator">=</span> <span class="token class-name">Caffeine</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">maximumSize</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 设置缓存大小上限为 1</span>
    <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>基于时间</strong>：设置缓存的有效时间</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 创建缓存对象</span>
<span class="token class-name">Cache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> cache <span class="token operator">=</span> <span class="token class-name">Caffeine</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 设置缓存有效期为 10 秒，从最后一次写入开始计时 </span>
    <span class="token punctuation">.</span><span class="token function">expireAfterWrite</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
    <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>基于引用</strong>：设置缓存为软引用或弱引用，利用GC来回收缓存数据。性能较差，不建议使用。</p>
</li>
</ul>
<blockquote>
<p><strong>注意</strong>：在默认情况下，当一个缓存元素过期的时候，Caffeine不会自动立即将其清理和驱逐。而是在一次读或写操作后，或者在空闲时间完成对失效数据的驱逐。</p>
</blockquote>
<h2 id="_2-3-实现jvm进程缓存" tabindex="-1"><a class="header-anchor" href="#_2-3-实现jvm进程缓存" aria-hidden="true">#</a> 2.3.实现JVM进程缓存</h2>
<h3 id="_2-3-1-需求" tabindex="-1"><a class="header-anchor" href="#_2-3-1-需求" aria-hidden="true">#</a> 2.3.1.需求</h3>
<p>利用Caffeine实现下列需求：</p>
<ul>
<li>给根据id查询商品的业务添加缓存，缓存未命中时查询数据库</li>
<li>给根据id查询商品库存的业务添加缓存，缓存未命中时查询数据库</li>
<li>缓存初始大小为100</li>
<li>缓存上限为10000</li>
</ul>
<h3 id="_2-3-2-实现" tabindex="-1"><a class="header-anchor" href="#_2-3-2-实现" aria-hidden="true">#</a> 2.3.2.实现</h3>
<p>首先，我们需要定义两个Caffeine的缓存对象，分别保存商品、库存的缓存数据。</p>
<p>在item-service的<code v-pre>com.heima.item.config</code>包下定义<code v-pre>CaffeineConfig</code>类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>github<span class="token punctuation">.</span>benmanes<span class="token punctuation">.</span>caffeine<span class="token punctuation">.</span>cache<span class="token punctuation">.</span></span><span class="token class-name">Cache</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>github<span class="token punctuation">.</span>benmanes<span class="token punctuation">.</span>caffeine<span class="token punctuation">.</span>cache<span class="token punctuation">.</span></span><span class="token class-name">Caffeine</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">Item</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">ItemStock</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CaffeineConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Cache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">Item</span><span class="token punctuation">></span></span> <span class="token function">itemCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Caffeine</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">initialCapacity</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">maximumSize</span><span class="token punctuation">(</span><span class="token number">10_000</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Cache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">ItemStock</span><span class="token punctuation">></span></span> <span class="token function">stockCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Caffeine</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">initialCapacity</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">maximumSize</span><span class="token punctuation">(</span><span class="token number">10_000</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，修改item-service中的<code v-pre>com.heima.item.web</code>包下的ItemController类，添加缓存逻辑：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"item"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ItemController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">IItemService</span> itemService<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">IItemStockService</span> stockService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">Cache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">Item</span><span class="token punctuation">></span></span> itemCache<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">Cache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">ItemStock</span><span class="token punctuation">></span></span> stockCache<span class="token punctuation">;</span>
    
    <span class="token comment">// ...其它略</span>
    
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Item</span> <span class="token function">findById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> itemCache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> key <span class="token operator">-></span> itemService<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">ne</span><span class="token punctuation">(</span><span class="token string">"status"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">one</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/stock/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ItemStock</span> <span class="token function">findStockById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stockCache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> key <span class="token operator">-></span> stockService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3-lua语法入门" tabindex="-1"><a class="header-anchor" href="#_3-lua语法入门" aria-hidden="true">#</a> 3.Lua语法入门</h1>
<p>Nginx编程需要用到Lua语言，因此我们必须先入门Lua的基本语法。</p>
<h2 id="_3-1-初识lua" tabindex="-1"><a class="header-anchor" href="#_3-1-初识lua" aria-hidden="true">#</a> 3.1.初识Lua</h2>
<p>Lua 是一种轻量小巧的脚本语言，用标准C语言编写并以源代码形式开放， 其设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。官网：https://www.lua.org/</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821091437975.png" alt="image-20210821091437975"></p>
<p>Lua经常嵌入到C语言开发的程序中，例如游戏开发、游戏插件等。</p>
<p>Nginx本身也是C语言开发，因此也允许基于Lua做拓展。</p>
<h2 id="_3-1-helloworld" tabindex="-1"><a class="header-anchor" href="#_3-1-helloworld" aria-hidden="true">#</a> 3.1.HelloWorld</h2>
<p>CentOS7默认已经安装了Lua语言环境，所以可以直接运行Lua代码。</p>
<p>1）在Linux虚拟机的任意目录下，新建一个hello.lua文件</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821091621308.png" alt="image-20210821091621308"></p>
<p>2）添加下面的内容</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3）运行</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821091638140.png" alt="image-20210821091638140"></p>
<h2 id="_3-2-变量和循环" tabindex="-1"><a class="header-anchor" href="#_3-2-变量和循环" aria-hidden="true">#</a> 3.2.变量和循环</h2>
<p>学习任何语言必然离不开变量，而变量的声明必须先知道数据的类型。</p>
<h3 id="_3-2-1-lua的数据类型" tabindex="-1"><a class="header-anchor" href="#_3-2-1-lua的数据类型" aria-hidden="true">#</a> 3.2.1.Lua的数据类型</h3>
<p>Lua中支持的常见数据类型包括：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821091835406.png" alt="image-20210821091835406"></p>
<p>另外，Lua提供了type()函数来判断一个变量的数据类型：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821091904332.png" alt="image-20210821091904332"></p>
<h3 id="_3-2-2-声明变量" tabindex="-1"><a class="header-anchor" href="#_3-2-2-声明变量" aria-hidden="true">#</a> 3.2.2.声明变量</h3>
<p>Lua声明变量的时候无需指定数据类型，而是用local来声明变量为局部变量：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 声明字符串，可以用单引号或双引号，</span>
<span class="token keyword">local</span> str <span class="token operator">=</span> <span class="token string">'hello'</span>
<span class="token comment">-- 字符串拼接可以使用 ..</span>
<span class="token keyword">local</span> str2 <span class="token operator">=</span> <span class="token string">'hello'</span> <span class="token operator">..</span> <span class="token string">'world'</span>
<span class="token comment">-- 声明数字</span>
<span class="token keyword">local</span> num <span class="token operator">=</span> <span class="token number">21</span>
<span class="token comment">-- 声明布尔类型</span>
<span class="token keyword">local</span> flag <span class="token operator">=</span> <span class="token keyword">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lua中的table类型既可以作为数组，又可以作为Java中的map来使用。数组就是特殊的table，key是数组角标而已：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 声明数组 ，key为角标的 table</span>
<span class="token keyword">local</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">'java'</span><span class="token punctuation">,</span> <span class="token string">'python'</span><span class="token punctuation">,</span> <span class="token string">'lua'</span><span class="token punctuation">}</span>
<span class="token comment">-- 声明table，类似java的map</span>
<span class="token keyword">local</span> map <span class="token operator">=</span>  <span class="token punctuation">{</span>name<span class="token operator">=</span><span class="token string">'Jack'</span><span class="token punctuation">,</span> age<span class="token operator">=</span><span class="token number">21</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lua中的数组角标是从1开始，访问的时候与Java中类似：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 访问数组，lua数组的角标从1开始</span>
<span class="token function">print</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Lua中的table可以用key来访问：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 访问table</span>
<span class="token function">print</span><span class="token punctuation">(</span>map<span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-3-循环" tabindex="-1"><a class="header-anchor" href="#_3-2-3-循环" aria-hidden="true">#</a> 3.2.3.循环</h3>
<p>对于table，我们可以利用for循环来遍历。不过数组和普通table遍历略有差异。</p>
<p>遍历数组：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 声明数组 key为索引的 table</span>
<span class="token keyword">local</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">'java'</span><span class="token punctuation">,</span> <span class="token string">'python'</span><span class="token punctuation">,</span> <span class="token string">'lua'</span><span class="token punctuation">}</span>
<span class="token comment">-- 遍历数组</span>
<span class="token keyword">for</span> index<span class="token punctuation">,</span>value <span class="token keyword">in</span> <span class="token function">ipairs</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token keyword">do</span>
    <span class="token function">print</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> value<span class="token punctuation">)</span> 
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>遍历普通table</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 声明map，也就是table</span>
<span class="token keyword">local</span> map <span class="token operator">=</span> <span class="token punctuation">{</span>name<span class="token operator">=</span><span class="token string">'Jack'</span><span class="token punctuation">,</span> age<span class="token operator">=</span><span class="token number">21</span><span class="token punctuation">}</span>
<span class="token comment">-- 遍历table</span>
<span class="token keyword">for</span> key<span class="token punctuation">,</span>value <span class="token keyword">in</span> <span class="token function">pairs</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span> <span class="token keyword">do</span>
   <span class="token function">print</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> 
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-3-条件控制、函数" tabindex="-1"><a class="header-anchor" href="#_3-3-条件控制、函数" aria-hidden="true">#</a> 3.3.条件控制、函数</h2>
<p>Lua中的条件控制和函数声明与Java类似。</p>
<h3 id="_3-3-1-函数" tabindex="-1"><a class="header-anchor" href="#_3-3-1-函数" aria-hidden="true">#</a> 3.3.1.函数</h3>
<p>定义函数的语法：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token keyword">function</span> 函数名<span class="token punctuation">(</span> argument1<span class="token punctuation">,</span> argument2<span class="token punctuation">...</span><span class="token punctuation">,</span> argumentn<span class="token punctuation">)</span>
    <span class="token comment">-- 函数体</span>
    <span class="token keyword">return</span> 返回值
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，定义一个函数，用来打印数组：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token keyword">function</span> <span class="token function">printArr</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
    <span class="token keyword">for</span> index<span class="token punctuation">,</span> value <span class="token keyword">in</span> <span class="token function">ipairs</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token keyword">do</span>
        <span class="token function">print</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-2-条件控制" tabindex="-1"><a class="header-anchor" href="#_3-3-2-条件控制" aria-hidden="true">#</a> 3.3.2.条件控制</h3>
<p>类似Java的条件控制，例如if、else语法：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token keyword">if</span><span class="token punctuation">(</span>布尔表达式<span class="token punctuation">)</span>
<span class="token keyword">then</span>
   <span class="token comment">--[ 布尔表达式为 true 时执行该语句块 --]</span>
<span class="token keyword">else</span>
   <span class="token comment">--[ 布尔表达式为 false 时执行该语句块 --]</span>
<span class="token keyword">end</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与java不同，布尔表达式中的逻辑运算是基于英文单词：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821092657918.png" alt="image-20210821092657918"></p>
<h3 id="_3-3-3-案例" tabindex="-1"><a class="header-anchor" href="#_3-3-3-案例" aria-hidden="true">#</a> 3.3.3.案例</h3>
<p>需求：自定义一个函数，可以打印table，当参数为nil时，打印错误信息</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token keyword">function</span> <span class="token function">printArr</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> arr <span class="token keyword">then</span>
        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">'数组不能为空！'</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>
    <span class="token keyword">for</span> index<span class="token punctuation">,</span> value <span class="token keyword">in</span> <span class="token function">ipairs</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token keyword">do</span>
        <span class="token function">print</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4-实现多级缓存" tabindex="-1"><a class="header-anchor" href="#_4-实现多级缓存" aria-hidden="true">#</a> 4.实现多级缓存</h1>
<p>多级缓存的实现离不开Nginx编程，而Nginx编程又离不开OpenResty。</p>
<h2 id="_4-1-安装openresty" tabindex="-1"><a class="header-anchor" href="#_4-1-安装openresty" aria-hidden="true">#</a> 4.1.安装OpenResty</h2>
<p>OpenResty® 是一个基于 Nginx的高性能 Web 平台，用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。具备下列特点：</p>
<ul>
<li>具备Nginx的完整功能</li>
<li>基于Lua语言进行扩展，集成了大量精良的 Lua 库、第三方模块</li>
<li>允许使用Lua<strong>自定义业务逻辑</strong>、<strong>自定义库</strong></li>
</ul>
<p>官方网站： https://openresty.org/cn/</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821092902946.png" alt="image-20210821092902946"></p>
<p>安装Lua可以参考课前资料提供的《安装OpenResty.md》：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821092941139.png" alt="image-20210821092941139"></p>
<h2 id="_4-2-openresty快速入门" tabindex="-1"><a class="header-anchor" href="#_4-2-openresty快速入门" aria-hidden="true">#</a> 4.2.OpenResty快速入门</h2>
<p>我们希望达到的多级缓存架构如图：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/yeVDlwtfMx.png" alt="yeVDlwtfMx"></p>
<p>其中：</p>
<ul>
<li>
<p>windows上的nginx用来做反向代理服务，将前端的查询商品的ajax请求代理到OpenResty集群</p>
</li>
<li>
<p>OpenResty集群用来编写多级缓存业务</p>
</li>
</ul>
<h3 id="_4-2-1-反向代理流程" tabindex="-1"><a class="header-anchor" href="#_4-2-1-反向代理流程" aria-hidden="true">#</a> 4.2.1.反向代理流程</h3>
<p>现在，商品详情页使用的是假的商品数据。不过在浏览器中，可以看到页面有发起ajax请求查询真实商品数据。</p>
<p>这个请求如下：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821093144700.png" alt="image-20210821093144700"></p>
<p>请求地址是localhost，端口是80，就被windows上安装的Nginx服务给接收到了。然后代理给了OpenResty集群：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821094447709.png" alt="image-20210821094447709"></p>
<p>我们需要在OpenResty中编写业务，查询商品数据并返回到浏览器。</p>
<p>但是这次，我们先在OpenResty接收请求，返回假的商品数据。</p>
<h3 id="_4-2-2-openresty监听请求" tabindex="-1"><a class="header-anchor" href="#_4-2-2-openresty监听请求" aria-hidden="true">#</a> 4.2.2.OpenResty监听请求</h3>
<p>OpenResty的很多功能都依赖于其目录下的Lua库，需要在nginx.conf中指定依赖库的目录，并导入依赖：</p>
<p>1）添加对OpenResty的Lua模块的加载</p>
<p>修改<code v-pre>/usr/local/openresty/nginx/conf/nginx.conf</code>文件，在其中的http下面，添加下面代码：</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token comment">#lua 模块</span>
<span class="token directive"><span class="token keyword">lua_package_path</span> <span class="token string">"/usr/local/openresty/lualib/?.lua;;"</span></span><span class="token punctuation">;</span>
<span class="token comment">#c模块     </span>
<span class="token directive"><span class="token keyword">lua_package_cpath</span> <span class="token string">"/usr/local/openresty/lualib/?.so;;"</span></span><span class="token punctuation">;</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）监听/api/item路径</p>
<p>修改<code v-pre>/usr/local/openresty/nginx/conf/nginx.conf</code>文件，在nginx.conf的server下面，添加对/api/item这个路径的监听：</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span>  /api/item</span> <span class="token punctuation">{</span>
    <span class="token comment"># 默认的响应类型</span>
    <span class="token directive"><span class="token keyword">default_type</span> application/json</span><span class="token punctuation">;</span>
    <span class="token comment"># 响应结果由lua/item.lua文件来决定</span>
    <span class="token directive"><span class="token keyword">content_by_lua_file</span> lua/item.lua</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个监听，就类似于SpringMVC中的<code v-pre>@GetMapping(&quot;/api/item&quot;)</code>做路径映射。</p>
<p>而<code v-pre>content_by_lua_file lua/item.lua</code>则相当于调用item.lua这个文件，执行其中的业务，把结果返回给用户。相当于java中调用service。</p>
<h3 id="_4-2-3-编写item-lua" tabindex="-1"><a class="header-anchor" href="#_4-2-3-编写item-lua" aria-hidden="true">#</a> 4.2.3.编写item.lua</h3>
<p>1）在<code v-pre>/usr/loca/openresty/nginx</code>目录创建文件夹：lua</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821100755080.png" alt="image-20210821100755080"></p>
<p>2）在<code v-pre>/usr/loca/openresty/nginx/lua</code>文件夹下，新建文件：item.lua</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821100801756.png" alt="image-20210821100801756"></p>
<p>3）编写item.lua，返回假数据</p>
<p>item.lua中，利用ngx.say()函数返回数据到Response中</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code>ngx<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token string">'{"id":10001,"name":"SALSA AIR","title":"RIMOWA 21寸托运箱拉杆箱 SALSA AIR系列果绿色 820.70.36.4","price":17900,"image":"https://m.360buyimg.com/mobilecms/s720x720_jfs/t6934/364/1195375010/84676/e9f2c55f/597ece38N0ddcbc77.jpg!q70.jpg.webp","category":"拉杆箱","brand":"RIMOWA","spec":"","status":1,"createTime":"2019-04-30T16:00:00.000+00:00","updateTime":"2019-04-30T16:00:00.000+00:00","stock":2999,"sold":31290}'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4）重新加载配置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>刷新商品页面：http://localhost/item.html?id=1001，即可看到效果：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821101217089.png" alt="image-20210821101217089"></p>
<h2 id="_4-3-请求参数处理" tabindex="-1"><a class="header-anchor" href="#_4-3-请求参数处理" aria-hidden="true">#</a> 4.3.请求参数处理</h2>
<p>上一节中，我们在OpenResty接收前端请求，但是返回的是假数据。</p>
<p>要返回真实数据，必须根据前端传递来的商品id，查询商品信息才可以。</p>
<p>那么如何获取前端传递的商品参数呢？</p>
<h3 id="_4-3-1-获取参数的api" tabindex="-1"><a class="header-anchor" href="#_4-3-1-获取参数的api" aria-hidden="true">#</a> 4.3.1.获取参数的API</h3>
<p>OpenResty中提供了一些API用来获取不同类型的前端请求参数：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821101433528.png" alt="image-20210821101433528"></p>
<h3 id="_4-3-2-获取参数并返回" tabindex="-1"><a class="header-anchor" href="#_4-3-2-获取参数并返回" aria-hidden="true">#</a> 4.3.2.获取参数并返回</h3>
<p>在前端发起的ajax请求如图：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821101721649.png" alt="image-20210821101721649"></p>
<p>可以看到商品id是以路径占位符方式传递的，因此可以利用正则表达式匹配的方式来获取ID</p>
<p>1）获取商品id</p>
<p>修改<code v-pre>/usr/loca/openresty/nginx/nginx.conf</code>文件中监听/api/item的代码，利用正则表达式获取ID：</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> ~ /api/item/(\d+)</span> <span class="token punctuation">{</span>
    <span class="token comment"># 默认的响应类型</span>
    <span class="token directive"><span class="token keyword">default_type</span> application/json</span><span class="token punctuation">;</span>
    <span class="token comment"># 响应结果由lua/item.lua文件来决定</span>
    <span class="token directive"><span class="token keyword">content_by_lua_file</span> lua/item.lua</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）拼接ID并返回</p>
<p>修改<code v-pre>/usr/loca/openresty/nginx/lua/item.lua</code>文件，获取id并拼接到结果中返回：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 获取商品id</span>
<span class="token keyword">local</span> id <span class="token operator">=</span> ngx<span class="token punctuation">.</span>var<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token comment">-- 拼接并返回</span>
ngx<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token string">'{"id":'</span> <span class="token operator">..</span> id <span class="token operator">..</span> <span class="token string">',"name":"SALSA AIR","title":"RIMOWA 21寸托运箱拉杆箱 SALSA AIR系列果绿色 820.70.36.4","price":17900,"image":"https://m.360buyimg.com/mobilecms/s720x720_jfs/t6934/364/1195375010/84676/e9f2c55f/597ece38N0ddcbc77.jpg!q70.jpg.webp","category":"拉杆箱","brand":"RIMOWA","spec":"","status":1,"createTime":"2019-04-30T16:00:00.000+00:00","updateTime":"2019-04-30T16:00:00.000+00:00","stock":2999,"sold":31290}'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）重新加载并测试</p>
<p>运行命令以重新加载OpenResty配置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>刷新页面可以看到结果中已经带上了ID：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821102235467.png" alt="image-20210821102235467"></p>
<h2 id="_4-4-查询tomcat" tabindex="-1"><a class="header-anchor" href="#_4-4-查询tomcat" aria-hidden="true">#</a> 4.4.查询Tomcat</h2>
<p>拿到商品ID后，本应去缓存中查询商品信息，不过目前我们还未建立nginx、redis缓存。因此，这里我们先根据商品id去tomcat查询商品信息。我们实现如图部分：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821102610167.png" alt="image-20210821102610167"></p>
<p>需要注意的是，我们的OpenResty是在虚拟机，Tomcat是在Windows电脑上。两者IP一定不要搞错了。</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821102959829.png" alt="image-20210821102959829"></p>
<h3 id="_4-4-1-发送http请求的api" tabindex="-1"><a class="header-anchor" href="#_4-4-1-发送http请求的api" aria-hidden="true">#</a> 4.4.1.发送http请求的API</h3>
<p>nginx提供了内部API用以发送http请求：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token keyword">local</span> resp <span class="token operator">=</span> ngx<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">capture</span><span class="token punctuation">(</span><span class="token string">"/path"</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    method <span class="token operator">=</span> ngx<span class="token punctuation">.</span>HTTP_GET<span class="token punctuation">,</span>   <span class="token comment">-- 请求方式</span>
    args <span class="token operator">=</span> <span class="token punctuation">{</span>a<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span>b<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span>  <span class="token comment">-- get方式传参数</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回的响应内容包括：</p>
<ul>
<li>resp.status：响应状态码</li>
<li>resp.header：响应头，是一个table</li>
<li>resp.body：响应体，就是响应数据</li>
</ul>
<p>注意：这里的path是路径，并不包含IP和端口。这个请求会被nginx内部的server监听并处理。</p>
<p>但是我们希望这个请求发送到Tomcat服务器，所以还需要编写一个server来对这个路径做反向代理：</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code> <span class="token directive"><span class="token keyword">location</span> /path</span> <span class="token punctuation">{</span>
     <span class="token comment"># 这里是windows电脑的ip和Java服务端口，需要确保windows防火墙处于关闭状态</span>
     <span class="token directive"><span class="token keyword">proxy_pass</span> http://192.168.150.1:8081</span><span class="token punctuation">;</span> 
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原理如图：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821104149061.png" alt="image-20210821104149061"></p>
<h3 id="_4-4-2-封装http工具" tabindex="-1"><a class="header-anchor" href="#_4-4-2-封装http工具" aria-hidden="true">#</a> 4.4.2.封装http工具</h3>
<p>下面，我们封装一个发送Http请求的工具，基于ngx.location.capture来实现查询tomcat。</p>
<p>1）添加反向代理，到windows的Java服务</p>
<p>因为item-service中的接口都是/item开头，所以我们监听/item路径，代理到windows上的tomcat服务。</p>
<p>修改 <code v-pre>/usr/local/openresty/nginx/conf/nginx.conf</code>文件，添加一个location：</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> /item</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://192.168.150.1:8081</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以后，只要我们调用<code v-pre>ngx.location.capture(&quot;/item&quot;)</code>，就一定能发送请求到windows的tomcat服务。</p>
<p>2）封装工具类</p>
<p>之前我们说过，OpenResty启动时会加载以下两个目录中的工具文件：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821104857413.png" alt="image-20210821104857413"></p>
<p>所以，自定义的http工具也需要放到这个目录下。</p>
<p>在<code v-pre>/usr/local/openresty/lualib</code>目录下，新建一个common.lua文件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vi</span> /usr/local/openresty/lualib/common.lua
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>内容如下:</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 封装函数，发送http请求，并解析响应</span>
<span class="token keyword">local</span> <span class="token keyword">function</span> <span class="token function">read_http</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
    <span class="token keyword">local</span> resp <span class="token operator">=</span> ngx<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">capture</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span><span class="token punctuation">{</span>
        method <span class="token operator">=</span> ngx<span class="token punctuation">.</span>HTTP_GET<span class="token punctuation">,</span>
        args <span class="token operator">=</span> params<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> resp <span class="token keyword">then</span>
        <span class="token comment">-- 记录错误信息，返回404</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"http请求查询失败, path: "</span><span class="token punctuation">,</span> path <span class="token punctuation">,</span> <span class="token string">", args: "</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
        ngx<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">404</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>
    <span class="token keyword">return</span> resp<span class="token punctuation">.</span>body
<span class="token keyword">end</span>
<span class="token comment">-- 将方法导出</span>
<span class="token keyword">local</span> _M <span class="token operator">=</span> <span class="token punctuation">{</span>  
    read_http <span class="token operator">=</span> read_http
<span class="token punctuation">}</span>  
<span class="token keyword">return</span> _M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个工具将read_http函数封装到_M这个table类型的变量中，并且返回，这类似于导出。</p>
<p>使用的时候，可以利用<code v-pre>require('common')</code>来导入该函数库，这里的common是函数库的文件名。</p>
<p>3）实现商品查询</p>
<p>最后，我们修改<code v-pre>/usr/local/openresty/lua/item.lua</code>文件，利用刚刚封装的函数库实现对tomcat的查询：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 引入自定义common工具模块，返回值是common中返回的 _M</span>
<span class="token keyword">local</span> common <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"common"</span><span class="token punctuation">)</span>
<span class="token comment">-- 从 common中获取read_http这个函数</span>
<span class="token keyword">local</span> read_http <span class="token operator">=</span> common<span class="token punctuation">.</span>read_http
<span class="token comment">-- 获取路径参数</span>
<span class="token keyword">local</span> id <span class="token operator">=</span> ngx<span class="token punctuation">.</span>var<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token comment">-- 根据id查询商品</span>
<span class="token keyword">local</span> itemJSON <span class="token operator">=</span> <span class="token function">read_http</span><span class="token punctuation">(</span><span class="token string">"/item/"</span><span class="token operator">..</span> id<span class="token punctuation">,</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
<span class="token comment">-- 根据id查询商品库存</span>
<span class="token keyword">local</span> itemStockJSON <span class="token operator">=</span> <span class="token function">read_http</span><span class="token punctuation">(</span><span class="token string">"/item/stock/"</span><span class="token operator">..</span> id<span class="token punctuation">,</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里查询到的结果是json字符串，并且包含商品、库存两个json字符串，页面最终需要的是把两个json拼接为一个json：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821110441222.png" alt="image-20210821110441222"></p>
<p>这就需要我们先把JSON变为lua的table，完成数据整合后，再转为JSON。</p>
<h3 id="_4-4-3-cjson工具类" tabindex="-1"><a class="header-anchor" href="#_4-4-3-cjson工具类" aria-hidden="true">#</a> 4.4.3.CJSON工具类</h3>
<p>OpenResty提供了一个cjson的模块用来处理JSON的序列化和反序列化。</p>
<p>官方地址： https://github.com/openresty/lua-cjson/</p>
<p>1）引入cjson模块：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token keyword">local</span> cjson <span class="token operator">=</span> require <span class="token string">"cjson"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2）序列化：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token keyword">local</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    name <span class="token operator">=</span> <span class="token string">'jack'</span><span class="token punctuation">,</span>
    age <span class="token operator">=</span> <span class="token number">21</span>
<span class="token punctuation">}</span>
<span class="token comment">-- 把 table 序列化为 json</span>
<span class="token keyword">local</span> json <span class="token operator">=</span> cjson<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）反序列化：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token keyword">local</span> json <span class="token operator">=</span> <span class="token string">'{"name": "jack", "age": 21}'</span>
<span class="token comment">-- 反序列化 json为 table</span>
<span class="token keyword">local</span> obj <span class="token operator">=</span> cjson<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">print</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-4-实现tomcat查询" tabindex="-1"><a class="header-anchor" href="#_4-4-4-实现tomcat查询" aria-hidden="true">#</a> 4.4.4.实现Tomcat查询</h3>
<p>下面，我们修改之前的item.lua中的业务，添加json处理功能：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 导入common函数库</span>
<span class="token keyword">local</span> common <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'common'</span><span class="token punctuation">)</span>
<span class="token keyword">local</span> read_http <span class="token operator">=</span> common<span class="token punctuation">.</span>read_http
<span class="token comment">-- 导入cjson库</span>
<span class="token keyword">local</span> cjson <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'cjson'</span><span class="token punctuation">)</span>

<span class="token comment">-- 获取路径参数</span>
<span class="token keyword">local</span> id <span class="token operator">=</span> ngx<span class="token punctuation">.</span>var<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token comment">-- 根据id查询商品</span>
<span class="token keyword">local</span> itemJSON <span class="token operator">=</span> <span class="token function">read_http</span><span class="token punctuation">(</span><span class="token string">"/item/"</span><span class="token operator">..</span> id<span class="token punctuation">,</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
<span class="token comment">-- 根据id查询商品库存</span>
<span class="token keyword">local</span> itemStockJSON <span class="token operator">=</span> <span class="token function">read_http</span><span class="token punctuation">(</span><span class="token string">"/item/stock/"</span><span class="token operator">..</span> id<span class="token punctuation">,</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>

<span class="token comment">-- JSON转化为lua的table</span>
<span class="token keyword">local</span> item <span class="token operator">=</span> cjson<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>itemJSON<span class="token punctuation">)</span>
<span class="token keyword">local</span> stock <span class="token operator">=</span> cjson<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>stockJSON<span class="token punctuation">)</span>

<span class="token comment">-- 组合数据</span>
item<span class="token punctuation">.</span>stock <span class="token operator">=</span> stock<span class="token punctuation">.</span>stock
item<span class="token punctuation">.</span>sold <span class="token operator">=</span> stock<span class="token punctuation">.</span>sold

<span class="token comment">-- 把item序列化为json 返回结果</span>
ngx<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span>cjson<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-5-基于id负载均衡" tabindex="-1"><a class="header-anchor" href="#_4-4-5-基于id负载均衡" aria-hidden="true">#</a> 4.4.5.基于ID负载均衡</h3>
<p>刚才的代码中，我们的tomcat是单机部署。而实际开发中，tomcat一定是集群模式：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821111023255.png" alt="image-20210821111023255"></p>
<p>因此，OpenResty需要对tomcat集群做负载均衡。</p>
<p>而默认的负载均衡规则是轮询模式，当我们查询/item/10001时：</p>
<ul>
<li>第一次会访问8081端口的tomcat服务，在该服务内部就形成了JVM进程缓存</li>
<li>第二次会访问8082端口的tomcat服务，该服务内部没有JVM缓存（因为JVM缓存无法共享），会查询数据库</li>
<li>...</li>
</ul>
<p>你看，因为轮询的原因，第一次查询8081形成的JVM缓存并未生效，直到下一次再次访问到8081时才可以生效，缓存命中率太低了。</p>
<p>怎么办？</p>
<p>如果能让同一个商品，每次查询时都访问同一个tomcat服务，那么JVM缓存就一定能生效了。</p>
<p>也就是说，我们需要根据商品id做负载均衡，而不是轮询。</p>
<h4 id="_1-原理" tabindex="-1"><a class="header-anchor" href="#_1-原理" aria-hidden="true">#</a> 1）原理</h4>
<p>nginx提供了基于请求路径做负载均衡的算法：</p>
<p>nginx根据请求路径做hash运算，把得到的数值对tomcat服务的数量取余，余数是几，就访问第几个服务，实现负载均衡。</p>
<p>例如：</p>
<ul>
<li>我们的请求路径是 /item/10001</li>
<li>tomcat总数为2台（8081、8082）</li>
<li>对请求路径/item/1001做hash运算求余的结果为1</li>
<li>则访问第一个tomcat服务，也就是8081</li>
</ul>
<p>只要id不变，每次hash运算结果也不会变，那就可以保证同一个商品，一直访问同一个tomcat服务，确保JVM缓存生效。</p>
<h4 id="_2-实现" tabindex="-1"><a class="header-anchor" href="#_2-实现" aria-hidden="true">#</a> 2）实现</h4>
<p>修改<code v-pre>/usr/local/openresty/nginx/conf/nginx.conf</code>文件，实现基于ID做负载均衡。</p>
<p>首先，定义tomcat集群，并设置基于路径做负载均衡：</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> tomcat-cluster</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">hash</span> <span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.150.1:8081</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.150.1:8082</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，修改对tomcat服务的反向代理，目标指向tomcat集群：</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> /item</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://tomcat-cluster</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新加载OpenResty</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-测试" tabindex="-1"><a class="header-anchor" href="#_3-测试" aria-hidden="true">#</a> 3）测试</h4>
<p>启动两台tomcat服务：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821112420464.png" alt="image-20210821112420464"></p>
<p>同时启动：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821112444482.png" alt="image-20210821112444482"></p>
<p>清空日志后，再次访问页面，可以看到不同id的商品，访问到了不同的tomcat服务：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821112559965.png" alt="image-20210821112559965"></p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821112637430.png" alt="image-20210821112637430"></p>
<h2 id="_4-5-redis缓存预热" tabindex="-1"><a class="header-anchor" href="#_4-5-redis缓存预热" aria-hidden="true">#</a> 4.5.Redis缓存预热</h2>
<p>Redis缓存会面临冷启动问题：</p>
<p><strong>冷启动</strong>：服务刚刚启动时，Redis中并没有缓存，如果所有商品数据都在第一次查询时添加缓存，可能会给数据库带来较大压力。</p>
<p><strong>缓存预热</strong>：在实际开发中，我们可以利用大数据统计用户访问的热点数据，在项目启动时将这些热点数据提前查询并保存到Redis中。</p>
<p>我们数据量较少，并且没有数据统计相关功能，目前可以在启动时将所有数据都放入缓存中。</p>
<p>1）利用Docker安装Redis</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--name</span> redis <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token parameter variable">-d</span> redis redis-server <span class="token parameter variable">--appendonly</span> <span class="token function">yes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2）在item-service服务中引入Redis依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）配置Redis地址</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> 192.168.150.101
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4）编写初始化类</p>
<p>缓存预热需要在项目启动时完成，并且必须是拿到RedisTemplate之后。</p>
<p>这里我们利用InitializingBean接口来实现，因为InitializingBean可以在对象被Spring创建并且成员变量全部注入后执行。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>fasterxml<span class="token punctuation">.</span>jackson<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">JsonProcessingException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>fasterxml<span class="token punctuation">.</span>jackson<span class="token punctuation">.</span>databind<span class="token punctuation">.</span></span><span class="token class-name">ObjectMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">Item</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">ItemStock</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">IItemService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">IItemStockService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span></span><span class="token class-name">InitializingBean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">StringRedisTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisHandler</span> <span class="token keyword">implements</span> <span class="token class-name">InitializingBean</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> redisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">IItemService</span> itemService<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">IItemStockService</span> stockService<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ObjectMapper</span> <span class="token constant">MAPPER</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 初始化缓存</span>
        <span class="token comment">// 1.查询商品信息</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> itemList <span class="token operator">=</span> itemService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2.放入缓存</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Item</span> item <span class="token operator">:</span> itemList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 2.1.item序列化为JSON</span>
            <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token constant">MAPPER</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 2.2.存入redis</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"item:id:"</span> <span class="token operator">+</span> item<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 3.查询商品库存信息</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ItemStock</span><span class="token punctuation">></span></span> stockList <span class="token operator">=</span> stockService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 4.放入缓存</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ItemStock</span> stock <span class="token operator">:</span> stockList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 2.1.item序列化为JSON</span>
            <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token constant">MAPPER</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>stock<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 2.2.存入redis</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"item:stock:id:"</span> <span class="token operator">+</span> stock<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-6-查询redis缓存" tabindex="-1"><a class="header-anchor" href="#_4-6-查询redis缓存" aria-hidden="true">#</a> 4.6.查询Redis缓存</h2>
<p>现在，Redis缓存已经准备就绪，我们可以再OpenResty中实现查询Redis的逻辑了。如下图红框所示：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821113340111.png" alt="image-20210821113340111"></p>
<p>当请求进入OpenResty之后：</p>
<ul>
<li>优先查询Redis缓存</li>
<li>如果Redis缓存未命中，再查询Tomcat</li>
</ul>
<h3 id="_4-6-1-封装redis工具" tabindex="-1"><a class="header-anchor" href="#_4-6-1-封装redis工具" aria-hidden="true">#</a> 4.6.1.封装Redis工具</h3>
<p>OpenResty提供了操作Redis的模块，我们只要引入该模块就能直接使用。但是为了方便，我们将Redis操作封装到之前的common.lua工具库中。</p>
<p>修改<code v-pre>/usr/local/openresty/lualib/common.lua</code>文件：</p>
<p>1）引入Redis模块，并初始化Redis对象</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 导入redis</span>
<span class="token keyword">local</span> redis <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'resty.redis'</span><span class="token punctuation">)</span>
<span class="token comment">-- 初始化redis</span>
<span class="token keyword">local</span> red <span class="token operator">=</span> redis<span class="token punctuation">:</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
red<span class="token punctuation">:</span><span class="token function">set_timeouts</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）封装函数，用来释放Redis连接，其实是放入连接池</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 关闭redis连接的工具方法，其实是放入连接池</span>
<span class="token keyword">local</span> <span class="token keyword">function</span> <span class="token function">close_redis</span><span class="token punctuation">(</span>red<span class="token punctuation">)</span>
    <span class="token keyword">local</span> pool_max_idle_time <span class="token operator">=</span> <span class="token number">10000</span> <span class="token comment">-- 连接的空闲时间，单位是毫秒</span>
    <span class="token keyword">local</span> pool_size <span class="token operator">=</span> <span class="token number">100</span> <span class="token comment">--连接池大小</span>
    <span class="token keyword">local</span> ok<span class="token punctuation">,</span> err <span class="token operator">=</span> red<span class="token punctuation">:</span><span class="token function">set_keepalive</span><span class="token punctuation">(</span>pool_max_idle_time<span class="token punctuation">,</span> pool_size<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> ok <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"放入redis连接池失败: "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）封装函数，根据key查询Redis数据</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 查询redis的方法 ip和port是redis地址，key是查询的key</span>
<span class="token keyword">local</span> <span class="token keyword">function</span> <span class="token function">read_redis</span><span class="token punctuation">(</span>ip<span class="token punctuation">,</span> port<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token comment">-- 获取一个连接</span>
    <span class="token keyword">local</span> ok<span class="token punctuation">,</span> err <span class="token operator">=</span> red<span class="token punctuation">:</span><span class="token function">connect</span><span class="token punctuation">(</span>ip<span class="token punctuation">,</span> port<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> ok <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"连接redis失败 : "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">nil</span>
    <span class="token keyword">end</span>
    <span class="token comment">-- 查询redis</span>
    <span class="token keyword">local</span> resp<span class="token punctuation">,</span> err <span class="token operator">=</span> red<span class="token punctuation">:</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token comment">-- 查询失败处理</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> resp <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"查询Redis失败: "</span><span class="token punctuation">,</span> err<span class="token punctuation">,</span> <span class="token string">", key = "</span> <span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
    <span class="token comment">--得到的数据为空处理</span>
    <span class="token keyword">if</span> resp <span class="token operator">==</span> ngx<span class="token punctuation">.</span>null <span class="token keyword">then</span>
        resp <span class="token operator">=</span> <span class="token keyword">nil</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"查询Redis数据为空, key = "</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
    <span class="token function">close_redis</span><span class="token punctuation">(</span>red<span class="token punctuation">)</span>
    <span class="token keyword">return</span> resp
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4）导出</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 将方法导出</span>
<span class="token keyword">local</span> _M <span class="token operator">=</span> <span class="token punctuation">{</span>  
    read_http <span class="token operator">=</span> read_http<span class="token punctuation">,</span>
    read_redis <span class="token operator">=</span> read_redis
<span class="token punctuation">}</span>  
<span class="token keyword">return</span> _M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完整的common.lua：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 导入redis</span>
<span class="token keyword">local</span> redis <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'resty.redis'</span><span class="token punctuation">)</span>
<span class="token comment">-- 初始化redis</span>
<span class="token keyword">local</span> red <span class="token operator">=</span> redis<span class="token punctuation">:</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
red<span class="token punctuation">:</span><span class="token function">set_timeouts</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>

<span class="token comment">-- 关闭redis连接的工具方法，其实是放入连接池</span>
<span class="token keyword">local</span> <span class="token keyword">function</span> <span class="token function">close_redis</span><span class="token punctuation">(</span>red<span class="token punctuation">)</span>
    <span class="token keyword">local</span> pool_max_idle_time <span class="token operator">=</span> <span class="token number">10000</span> <span class="token comment">-- 连接的空闲时间，单位是毫秒</span>
    <span class="token keyword">local</span> pool_size <span class="token operator">=</span> <span class="token number">100</span> <span class="token comment">--连接池大小</span>
    <span class="token keyword">local</span> ok<span class="token punctuation">,</span> err <span class="token operator">=</span> red<span class="token punctuation">:</span><span class="token function">set_keepalive</span><span class="token punctuation">(</span>pool_max_idle_time<span class="token punctuation">,</span> pool_size<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> ok <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"放入redis连接池失败: "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
<span class="token keyword">end</span>

<span class="token comment">-- 查询redis的方法 ip和port是redis地址，key是查询的key</span>
<span class="token keyword">local</span> <span class="token keyword">function</span> <span class="token function">read_redis</span><span class="token punctuation">(</span>ip<span class="token punctuation">,</span> port<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token comment">-- 获取一个连接</span>
    <span class="token keyword">local</span> ok<span class="token punctuation">,</span> err <span class="token operator">=</span> red<span class="token punctuation">:</span><span class="token function">connect</span><span class="token punctuation">(</span>ip<span class="token punctuation">,</span> port<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> ok <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"连接redis失败 : "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">nil</span>
    <span class="token keyword">end</span>
    <span class="token comment">-- 查询redis</span>
    <span class="token keyword">local</span> resp<span class="token punctuation">,</span> err <span class="token operator">=</span> red<span class="token punctuation">:</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token comment">-- 查询失败处理</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> resp <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"查询Redis失败: "</span><span class="token punctuation">,</span> err<span class="token punctuation">,</span> <span class="token string">", key = "</span> <span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
    <span class="token comment">--得到的数据为空处理</span>
    <span class="token keyword">if</span> resp <span class="token operator">==</span> ngx<span class="token punctuation">.</span>null <span class="token keyword">then</span>
        resp <span class="token operator">=</span> <span class="token keyword">nil</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"查询Redis数据为空, key = "</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
    <span class="token function">close_redis</span><span class="token punctuation">(</span>red<span class="token punctuation">)</span>
    <span class="token keyword">return</span> resp
<span class="token keyword">end</span>

<span class="token comment">-- 封装函数，发送http请求，并解析响应</span>
<span class="token keyword">local</span> <span class="token keyword">function</span> <span class="token function">read_http</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
    <span class="token keyword">local</span> resp <span class="token operator">=</span> ngx<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">capture</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span><span class="token punctuation">{</span>
        method <span class="token operator">=</span> ngx<span class="token punctuation">.</span>HTTP_GET<span class="token punctuation">,</span>
        args <span class="token operator">=</span> params<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> resp <span class="token keyword">then</span>
        <span class="token comment">-- 记录错误信息，返回404</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"http查询失败, path: "</span><span class="token punctuation">,</span> path <span class="token punctuation">,</span> <span class="token string">", args: "</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
        ngx<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">404</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>
    <span class="token keyword">return</span> resp<span class="token punctuation">.</span>body
<span class="token keyword">end</span>
<span class="token comment">-- 将方法导出</span>
<span class="token keyword">local</span> _M <span class="token operator">=</span> <span class="token punctuation">{</span>  
    read_http <span class="token operator">=</span> read_http<span class="token punctuation">,</span>
    read_redis <span class="token operator">=</span> read_redis
<span class="token punctuation">}</span>  
<span class="token keyword">return</span> _M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6-2-实现redis查询" tabindex="-1"><a class="header-anchor" href="#_4-6-2-实现redis查询" aria-hidden="true">#</a> 4.6.2.实现Redis查询</h3>
<p>接下来，我们就可以去修改item.lua文件，实现对Redis的查询了。</p>
<p>查询逻辑是：</p>
<ul>
<li>根据id查询Redis</li>
<li>如果查询失败则继续查询Tomcat</li>
<li>将查询结果返回</li>
</ul>
<p>1）修改<code v-pre>/usr/local/openresty/lua/item.lua</code>文件，添加一个查询函数：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 导入common函数库</span>
<span class="token keyword">local</span> common <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'common'</span><span class="token punctuation">)</span>
<span class="token keyword">local</span> read_http <span class="token operator">=</span> common<span class="token punctuation">.</span>read_http
<span class="token keyword">local</span> read_redis <span class="token operator">=</span> common<span class="token punctuation">.</span>read_redis
<span class="token comment">-- 封装查询函数</span>
<span class="token keyword">function</span> <span class="token function">read_data</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> path<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
    <span class="token comment">-- 查询本地缓存</span>
    <span class="token keyword">local</span> val <span class="token operator">=</span> <span class="token function">read_redis</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token comment">-- 判断查询结果</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> val <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"redis查询失败，尝试查询http， key: "</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
        <span class="token comment">-- redis查询失败，去查询http</span>
        val <span class="token operator">=</span> <span class="token function">read_http</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
    <span class="token comment">-- 返回数据</span>
    <span class="token keyword">return</span> val
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）而后修改商品查询、库存查询的业务：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821114528954.png" alt="image-20210821114528954"></p>
<p>3）完整的item.lua代码：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 导入common函数库</span>
<span class="token keyword">local</span> common <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'common'</span><span class="token punctuation">)</span>
<span class="token keyword">local</span> read_http <span class="token operator">=</span> common<span class="token punctuation">.</span>read_http
<span class="token keyword">local</span> read_redis <span class="token operator">=</span> common<span class="token punctuation">.</span>read_redis
<span class="token comment">-- 导入cjson库</span>
<span class="token keyword">local</span> cjson <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'cjson'</span><span class="token punctuation">)</span>

<span class="token comment">-- 封装查询函数</span>
<span class="token keyword">function</span> <span class="token function">read_data</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> path<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
    <span class="token comment">-- 查询本地缓存</span>
    <span class="token keyword">local</span> val <span class="token operator">=</span> <span class="token function">read_redis</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token comment">-- 判断查询结果</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> val <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"redis查询失败，尝试查询http， key: "</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
        <span class="token comment">-- redis查询失败，去查询http</span>
        val <span class="token operator">=</span> <span class="token function">read_http</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
    <span class="token comment">-- 返回数据</span>
    <span class="token keyword">return</span> val
<span class="token keyword">end</span>

<span class="token comment">-- 获取路径参数</span>
<span class="token keyword">local</span> id <span class="token operator">=</span> ngx<span class="token punctuation">.</span>var<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>

<span class="token comment">-- 查询商品信息</span>
<span class="token keyword">local</span> itemJSON <span class="token operator">=</span> <span class="token function">read_data</span><span class="token punctuation">(</span><span class="token string">"item:id:"</span> <span class="token operator">..</span> id<span class="token punctuation">,</span>  <span class="token string">"/item/"</span> <span class="token operator">..</span> id<span class="token punctuation">,</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
<span class="token comment">-- 查询库存信息</span>
<span class="token keyword">local</span> stockJSON <span class="token operator">=</span> <span class="token function">read_data</span><span class="token punctuation">(</span><span class="token string">"item:stock:id:"</span> <span class="token operator">..</span> id<span class="token punctuation">,</span> <span class="token string">"/item/stock/"</span> <span class="token operator">..</span> id<span class="token punctuation">,</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>

<span class="token comment">-- JSON转化为lua的table</span>
<span class="token keyword">local</span> item <span class="token operator">=</span> cjson<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>itemJSON<span class="token punctuation">)</span>
<span class="token keyword">local</span> stock <span class="token operator">=</span> cjson<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>stockJSON<span class="token punctuation">)</span>
<span class="token comment">-- 组合数据</span>
item<span class="token punctuation">.</span>stock <span class="token operator">=</span> stock<span class="token punctuation">.</span>stock
item<span class="token punctuation">.</span>sold <span class="token operator">=</span> stock<span class="token punctuation">.</span>sold

<span class="token comment">-- 把item序列化为json 返回结果</span>
ngx<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span>cjson<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-7-nginx本地缓存" tabindex="-1"><a class="header-anchor" href="#_4-7-nginx本地缓存" aria-hidden="true">#</a> 4.7.Nginx本地缓存</h2>
<p>现在，整个多级缓存中只差最后一环，也就是nginx的本地缓存了。如图：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821114742950.png" alt="image-20210821114742950"></p>
<h3 id="_4-7-1-本地缓存api" tabindex="-1"><a class="header-anchor" href="#_4-7-1-本地缓存api" aria-hidden="true">#</a> 4.7.1.本地缓存API</h3>
<p>OpenResty为Nginx提供了<strong>shard dict</strong>的功能，可以在nginx的多个worker之间共享数据，实现缓存功能。</p>
<p>1）开启共享字典，在nginx.conf的http下添加配置：</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code> <span class="token comment"># 共享字典，也就是本地缓存，名称叫做：item_cache，大小150m</span>
 <span class="token directive"><span class="token keyword">lua_shared_dict</span> item_cache <span class="token number">150m</span></span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2）操作共享字典：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 获取本地缓存对象</span>
<span class="token keyword">local</span> item_cache <span class="token operator">=</span> ngx<span class="token punctuation">.</span>shared<span class="token punctuation">.</span>item_cache
<span class="token comment">-- 存储, 指定key、value、过期时间，单位s，默认为0代表永不过期</span>
item_cache<span class="token punctuation">:</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'key'</span><span class="token punctuation">,</span> <span class="token string">'value'</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token comment">-- 读取</span>
<span class="token keyword">local</span> val <span class="token operator">=</span> item_cache<span class="token punctuation">:</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'key'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-7-2-实现本地缓存查询" tabindex="-1"><a class="header-anchor" href="#_4-7-2-实现本地缓存查询" aria-hidden="true">#</a> 4.7.2.实现本地缓存查询</h3>
<p>1）修改<code v-pre>/usr/local/openresty/lua/item.lua</code>文件，修改read_data查询函数，添加本地缓存逻辑：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 导入共享词典，本地缓存</span>
<span class="token keyword">local</span> item_cache <span class="token operator">=</span> ngx<span class="token punctuation">.</span>shared<span class="token punctuation">.</span>item_cache

<span class="token comment">-- 封装查询函数</span>
<span class="token keyword">function</span> <span class="token function">read_data</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> expire<span class="token punctuation">,</span> path<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
    <span class="token comment">-- 查询本地缓存</span>
    <span class="token keyword">local</span> val <span class="token operator">=</span> item_cache<span class="token punctuation">:</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> val <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"本地缓存查询失败，尝试查询Redis， key: "</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
        <span class="token comment">-- 查询redis</span>
        val <span class="token operator">=</span> <span class="token function">read_redis</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
        <span class="token comment">-- 判断查询结果</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> val <span class="token keyword">then</span>
            ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"redis查询失败，尝试查询http， key: "</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
            <span class="token comment">-- redis查询失败，去查询http</span>
            val <span class="token operator">=</span> <span class="token function">read_http</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
        <span class="token keyword">end</span>
    <span class="token keyword">end</span>
    <span class="token comment">-- 查询成功，把数据写入本地缓存</span>
    item_cache<span class="token punctuation">:</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">,</span> expire<span class="token punctuation">)</span>
    <span class="token comment">-- 返回数据</span>
    <span class="token keyword">return</span> val
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）修改item.lua中查询商品和库存的业务，实现最新的read_data函数：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821115108528.png" alt="image-20210821115108528"></p>
<p>其实就是多了缓存时间参数，过期后nginx缓存会自动删除，下次访问即可更新缓存。</p>
<p>这里给商品基本信息设置超时时间为30分钟，库存为1分钟。</p>
<p>因为库存更新频率较高，如果缓存时间过长，可能与数据库差异较大。</p>
<p>3）完整的item.lua文件：</p>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token comment">-- 导入common函数库</span>
<span class="token keyword">local</span> common <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'common'</span><span class="token punctuation">)</span>
<span class="token keyword">local</span> read_http <span class="token operator">=</span> common<span class="token punctuation">.</span>read_http
<span class="token keyword">local</span> read_redis <span class="token operator">=</span> common<span class="token punctuation">.</span>read_redis
<span class="token comment">-- 导入cjson库</span>
<span class="token keyword">local</span> cjson <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'cjson'</span><span class="token punctuation">)</span>
<span class="token comment">-- 导入共享词典，本地缓存</span>
<span class="token keyword">local</span> item_cache <span class="token operator">=</span> ngx<span class="token punctuation">.</span>shared<span class="token punctuation">.</span>item_cache

<span class="token comment">-- 封装查询函数</span>
<span class="token keyword">function</span> <span class="token function">read_data</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> expire<span class="token punctuation">,</span> path<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
    <span class="token comment">-- 查询本地缓存</span>
    <span class="token keyword">local</span> val <span class="token operator">=</span> item_cache<span class="token punctuation">:</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> val <span class="token keyword">then</span>
        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"本地缓存查询失败，尝试查询Redis， key: "</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
        <span class="token comment">-- 查询redis</span>
        val <span class="token operator">=</span> <span class="token function">read_redis</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
        <span class="token comment">-- 判断查询结果</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> val <span class="token keyword">then</span>
            ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> <span class="token string">"redis查询失败，尝试查询http， key: "</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
            <span class="token comment">-- redis查询失败，去查询http</span>
            val <span class="token operator">=</span> <span class="token function">read_http</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
        <span class="token keyword">end</span>
    <span class="token keyword">end</span>
    <span class="token comment">-- 查询成功，把数据写入本地缓存</span>
    item_cache<span class="token punctuation">:</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">,</span> expire<span class="token punctuation">)</span>
    <span class="token comment">-- 返回数据</span>
    <span class="token keyword">return</span> val
<span class="token keyword">end</span>

<span class="token comment">-- 获取路径参数</span>
<span class="token keyword">local</span> id <span class="token operator">=</span> ngx<span class="token punctuation">.</span>var<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>

<span class="token comment">-- 查询商品信息</span>
<span class="token keyword">local</span> itemJSON <span class="token operator">=</span> <span class="token function">read_data</span><span class="token punctuation">(</span><span class="token string">"item:id:"</span> <span class="token operator">..</span> id<span class="token punctuation">,</span> <span class="token number">1800</span><span class="token punctuation">,</span>  <span class="token string">"/item/"</span> <span class="token operator">..</span> id<span class="token punctuation">,</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
<span class="token comment">-- 查询库存信息</span>
<span class="token keyword">local</span> stockJSON <span class="token operator">=</span> <span class="token function">read_data</span><span class="token punctuation">(</span><span class="token string">"item:stock:id:"</span> <span class="token operator">..</span> id<span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token string">"/item/stock/"</span> <span class="token operator">..</span> id<span class="token punctuation">,</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>

<span class="token comment">-- JSON转化为lua的table</span>
<span class="token keyword">local</span> item <span class="token operator">=</span> cjson<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>itemJSON<span class="token punctuation">)</span>
<span class="token keyword">local</span> stock <span class="token operator">=</span> cjson<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>stockJSON<span class="token punctuation">)</span>
<span class="token comment">-- 组合数据</span>
item<span class="token punctuation">.</span>stock <span class="token operator">=</span> stock<span class="token punctuation">.</span>stock
item<span class="token punctuation">.</span>sold <span class="token operator">=</span> stock<span class="token punctuation">.</span>sold

<span class="token comment">-- 把item序列化为json 返回结果</span>
ngx<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span>cjson<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_5-缓存同步" tabindex="-1"><a class="header-anchor" href="#_5-缓存同步" aria-hidden="true">#</a> 5.缓存同步</h1>
<p>大多数情况下，浏览器查询到的都是缓存数据，如果缓存数据与数据库数据存在较大差异，可能会产生比较严重的后果。</p>
<p>所以我们必须保证数据库数据、缓存数据的一致性，这就是缓存与数据库的同步。</p>
<h2 id="_5-1-数据同步策略" tabindex="-1"><a class="header-anchor" href="#_5-1-数据同步策略" aria-hidden="true">#</a> 5.1.数据同步策略</h2>
<p>缓存数据同步的常见方式有三种：</p>
<p><strong>设置有效期</strong>：给缓存设置有效期，到期后自动删除。再次查询时更新</p>
<ul>
<li>优势：简单、方便</li>
<li>缺点：时效性差，缓存过期之前可能不一致</li>
<li>场景：更新频率较低，时效性要求低的业务</li>
</ul>
<p><strong>同步双写</strong>：在修改数据库的同时，直接修改缓存</p>
<ul>
<li>优势：时效性强，缓存与数据库强一致</li>
<li>缺点：有代码侵入，耦合度高；</li>
<li>场景：对一致性、时效性要求较高的缓存数据</li>
</ul>
<p>**异步通知：**修改数据库时发送事件通知，相关服务监听到通知后修改缓存数据</p>
<ul>
<li>优势：低耦合，可以同时通知多个缓存服务</li>
<li>缺点：时效性一般，可能存在中间不一致状态</li>
<li>场景：时效性要求一般，有多个服务需要同步</li>
</ul>
<p>而异步实现又可以基于MQ或者Canal来实现：</p>
<p>1）基于MQ的异步通知：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821115552327.png" alt="image-20210821115552327"></p>
<p>解读：</p>
<ul>
<li>商品服务完成对数据的修改后，只需要发送一条消息到MQ中。</li>
<li>缓存服务监听MQ消息，然后完成对缓存的更新</li>
</ul>
<p>依然有少量的代码侵入。</p>
<p>2）基于Canal的通知</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821115719363.png" alt="image-20210821115719363"></p>
<p>解读：</p>
<ul>
<li>商品服务完成商品修改后，业务直接结束，没有任何代码侵入</li>
<li>Canal监听MySQL变化，当发现变化后，立即通知缓存服务</li>
<li>缓存服务接收到canal通知，更新缓存</li>
</ul>
<p>代码零侵入</p>
<h2 id="_5-2-安装canal" tabindex="-1"><a class="header-anchor" href="#_5-2-安装canal" aria-hidden="true">#</a> 5.2.安装Canal</h2>
<h3 id="_5-2-1-认识canal" tabindex="-1"><a class="header-anchor" href="#_5-2-1-认识canal" aria-hidden="true">#</a> 5.2.1.认识Canal</h3>
<p><strong>Canal [kə'næl]</strong>，译意为水道/管道/沟渠，canal是阿里巴巴旗下的一款开源项目，基于Java开发。基于数据库增量日志解析，提供增量数据订阅&amp;消费。GitHub的地址：https://github.com/alibaba/canal</p>
<p>Canal是基于mysql的主从同步来实现的，MySQL主从同步的原理如下：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821115914748.png" alt="image-20210821115914748"></p>
<ul>
<li>1）MySQL master 将数据变更写入二进制日志( binary log），其中记录的数据叫做binary log events</li>
<li>2）MySQL slave 将 master 的 binary log events拷贝到它的中继日志(relay log)</li>
<li>3）MySQL slave 重放 relay log 中事件，将数据变更反映它自己的数据</li>
</ul>
<p>而Canal就是把自己伪装成MySQL的一个slave节点，从而监听master的binary log变化。再把得到的变化信息通知给Canal的客户端，进而完成对其它数据库的同步。</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821115948395.png" alt="image-20210821115948395"></p>
<h3 id="_5-2-2-安装canal" tabindex="-1"><a class="header-anchor" href="#_5-2-2-安装canal" aria-hidden="true">#</a> 5.2.2.安装Canal</h3>
<p>安装和配置Canal参考课前资料文档：</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821120017324.png" alt="image-20210821120017324"></p>
<h2 id="_5-3-监听canal" tabindex="-1"><a class="header-anchor" href="#_5-3-监听canal" aria-hidden="true">#</a> 5.3.监听Canal</h2>
<p>Canal提供了各种语言的客户端，当Canal监听到binlog变化时，会通知Canal的客户端。</p>
<p><img src="@source/java8-9/day04-多级缓存/讲义/assets/image-20210821120049024.png" alt="image-20210821120049024"></p>
<p>我们可以利用Canal提供的Java客户端，监听Canal通知消息。当收到变化的消息时，完成对缓存的更新。</p>
<p>不过这里我们会使用GitHub上的第三方开源的canal-starter客户端。地址：https://github.com/NormanGyllenhaal/canal-client</p>
<p>与SpringBoot完美整合，自动装配，比官方客户端要简单好用很多。</p>
<h3 id="_5-3-1-引入依赖" tabindex="-1"><a class="header-anchor" href="#_5-3-1-引入依赖" aria-hidden="true">#</a> 5.3.1.引入依赖：</h3>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>top.javatool<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>canal-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.2.1-RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-2-编写配置" tabindex="-1"><a class="header-anchor" href="#_5-3-2-编写配置" aria-hidden="true">#</a> 5.3.2.编写配置：</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">canal</span><span class="token punctuation">:</span>
  <span class="token key atrule">destination</span><span class="token punctuation">:</span> heima <span class="token comment"># canal的集群名字，要与安装canal时设置的名称一致</span>
  <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.150.101<span class="token punctuation">:</span><span class="token number">11111</span> <span class="token comment"># canal服务地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-3-修改item实体类" tabindex="-1"><a class="header-anchor" href="#_5-3-3-修改item实体类" aria-hidden="true">#</a> 5.3.3.修改Item实体类</h3>
<p>通过@Id、@Column、等注解完成Item与数据库表字段的映射：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>pojo</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">IdType</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">TableField</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">TableId</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">TableName</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Id</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Transient</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>persistence<span class="token punctuation">.</span></span><span class="token class-name">Column</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@TableName</span><span class="token punctuation">(</span><span class="token string">"tb_item"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@TableId</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">IdType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span><span class="token comment">//商品id</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"name"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span><span class="token comment">//商品名称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span><span class="token comment">//商品标题</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> price<span class="token punctuation">;</span><span class="token comment">//价格（分）</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> image<span class="token punctuation">;</span><span class="token comment">//商品图片</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> category<span class="token punctuation">;</span><span class="token comment">//分类名称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> brand<span class="token punctuation">;</span><span class="token comment">//品牌名称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> spec<span class="token punctuation">;</span><span class="token comment">//规格</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> status<span class="token punctuation">;</span><span class="token comment">//商品状态 1-正常，2-下架</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> createTime<span class="token punctuation">;</span><span class="token comment">//创建时间</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> updateTime<span class="token punctuation">;</span><span class="token comment">//更新时间</span>
    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>exist <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Transient</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> stock<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>exist <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Transient</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> sold<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-4-编写监听器" tabindex="-1"><a class="header-anchor" href="#_5-3-4-编写监听器" aria-hidden="true">#</a> 5.3.4.编写监听器</h3>
<p>通过实现<code v-pre>EntryHandler&lt;T&gt;</code>接口编写监听器，监听Canal消息。注意两点：</p>
<ul>
<li>实现类通过<code v-pre>@CanalTable(&quot;tb_item&quot;)</code>指定监听的表信息</li>
<li>EntryHandler的泛型是与表对应的实体类</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>canal</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>github<span class="token punctuation">.</span>benmanes<span class="token punctuation">.</span>caffeine<span class="token punctuation">.</span>cache<span class="token punctuation">.</span></span><span class="token class-name">Cache</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>config<span class="token punctuation">.</span></span><span class="token class-name">RedisHandler</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">Item</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">top<span class="token punctuation">.</span>javatool<span class="token punctuation">.</span>canal<span class="token punctuation">.</span>client<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">CanalTable</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">top<span class="token punctuation">.</span>javatool<span class="token punctuation">.</span>canal<span class="token punctuation">.</span>client<span class="token punctuation">.</span>handler<span class="token punctuation">.</span></span><span class="token class-name">EntryHandler</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@CanalTable</span><span class="token punctuation">(</span><span class="token string">"tb_item"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ItemHandler</span> <span class="token keyword">implements</span> <span class="token class-name">EntryHandler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisHandler</span> redisHandler<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">Cache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">Item</span><span class="token punctuation">></span></span> itemCache<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token class-name">Item</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 写数据到JVM进程缓存</span>
        itemCache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 写数据到redis</span>
        redisHandler<span class="token punctuation">.</span><span class="token function">saveItem</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">Item</span> before<span class="token punctuation">,</span> <span class="token class-name">Item</span> after<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 写数据到JVM进程缓存</span>
        itemCache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>after<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> after<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 写数据到redis</span>
        redisHandler<span class="token punctuation">.</span><span class="token function">saveItem</span><span class="token punctuation">(</span>after<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">Item</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 删除数据到JVM进程缓存</span>
        itemCache<span class="token punctuation">.</span><span class="token function">invalidate</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 删除数据到redis</span>
        redisHandler<span class="token punctuation">.</span><span class="token function">deleteItemById</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里对Redis的操作都封装到了RedisHandler这个对象中，是我们之前做缓存预热时编写的一个类，内容如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>fasterxml<span class="token punctuation">.</span>jackson<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">JsonProcessingException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>fasterxml<span class="token punctuation">.</span>jackson<span class="token punctuation">.</span>databind<span class="token punctuation">.</span></span><span class="token class-name">ObjectMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">Item</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">ItemStock</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">IItemService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>heima<span class="token punctuation">.</span>item<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">IItemStockService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span></span><span class="token class-name">InitializingBean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">StringRedisTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisHandler</span> <span class="token keyword">implements</span> <span class="token class-name">InitializingBean</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> redisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">IItemService</span> itemService<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">IItemStockService</span> stockService<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ObjectMapper</span> <span class="token constant">MAPPER</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 初始化缓存</span>
        <span class="token comment">// 1.查询商品信息</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> itemList <span class="token operator">=</span> itemService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2.放入缓存</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Item</span> item <span class="token operator">:</span> itemList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 2.1.item序列化为JSON</span>
            <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token constant">MAPPER</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 2.2.存入redis</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"item:id:"</span> <span class="token operator">+</span> item<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 3.查询商品库存信息</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ItemStock</span><span class="token punctuation">></span></span> stockList <span class="token operator">=</span> stockService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 4.放入缓存</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ItemStock</span> stock <span class="token operator">:</span> stockList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 2.1.item序列化为JSON</span>
            <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token constant">MAPPER</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>stock<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 2.2.存入redis</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"item:stock:id:"</span> <span class="token operator">+</span> stock<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveItem</span><span class="token punctuation">(</span><span class="token class-name">Item</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token constant">MAPPER</span><span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"item:id:"</span> <span class="token operator">+</span> item<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">JsonProcessingException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deleteItemById</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">"item:id:"</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


