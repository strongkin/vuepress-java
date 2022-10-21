<template><div><h2 id="课程介绍" tabindex="-1"><a class="header-anchor" href="#课程介绍" aria-hidden="true">#</a> 课程介绍</h2>
<ul>
<li>完善个人信息</li>
<li>阿里云OSS服务应用</li>
<li>人脸识别</li>
<li>MongoDB快速入门</li>
<li>SpringBoot整合MongoDB</li>
</ul>
<h2 id="_1、完善个人信息" tabindex="-1"><a class="header-anchor" href="#_1、完善个人信息" aria-hidden="true">#</a> 1、完善个人信息</h2>
<p>用户在首次登录时需要完善个人信息，包括性别、昵称、生日、城市、头像等。</p>
<p>其中，头像数据需要做图片上传，这里采用阿里云的OSS服务作为我们的图片服务器，并且对头像要做人脸识别，非人脸照片不得上传。</p>
<h3 id="_1-1、图片上传" tabindex="-1"><a class="header-anchor" href="#_1-1、图片上传" aria-hidden="true">#</a> 1.1、图片上传</h3>
<h4 id="_1-1-1、图片存储解决方案" tabindex="-1"><a class="header-anchor" href="#_1-1-1、图片存储解决方案" aria-hidden="true">#</a> 1.1.1、图片存储解决方案</h4>
<p>实现图片上传服务，需要有存储的支持，那么我们的解决方案将以下几种：</p>
<ol>
<li>直接将图片保存到服务的硬盘
<ol>
<li>优点：开发便捷，成本低</li>
<li>缺点：扩容困难</li>
</ol>
</li>
<li>使用分布式文件系统进行存储
<ol>
<li>优点：容易实现扩容</li>
<li>缺点：开发复杂度稍大（有成熟的产品可以使用，比如：FastDFS）</li>
</ol>
</li>
<li>使用nfs做存储
<ol>
<li>优点：开发较为便捷</li>
<li>缺点：需要有一定的运维知识进行部署和维护</li>
</ol>
</li>
<li>使用第三方的存储服务
<ol>
<li>优点：开发简单，拥有强大功能，免维护</li>
<li>缺点：付费</li>
</ol>
</li>
</ol>
<p>在本套课程中选用阿里云的OSS服务进行图片存储。</p>
<h4 id="_1-1-2、阿里云oss存储" tabindex="-1"><a class="header-anchor" href="#_1-1-2、阿里云oss存储" aria-hidden="true">#</a> 1.1.2、阿里云OSS存储</h4>
<p>流程：</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201122161002420.png" alt="image-20201122161002420"></p>
<h5 id="_1-1-2-1、什么是oss服务" tabindex="-1"><a class="header-anchor" href="#_1-1-2-1、什么是oss服务" aria-hidden="true">#</a> 1.1.2.1、什么是OSS服务？</h5>
<p>地址：https://www.aliyun.com/product/oss</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201017104006281.png" alt="image-20201017104006281"></p>
<h5 id="_1-1-2-2、购买服务" tabindex="-1"><a class="header-anchor" href="#_1-1-2-2、购买服务" aria-hidden="true">#</a> 1.1.2.2、购买服务</h5>
<p>使用第三方服务最大的缺点就是需要付费，下面，我们看下如何购买开通服务。</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201017112543995.png" alt="image-20201017112543995"></p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201017112639162.png" alt="image-20201017112639162"></p>
<p>购买下行流量包： （不购买也可以使用，按照流量付费）</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201017112802078.png" alt="image-20201017112802078"></p>
<blockquote>
<p>说明：OSS的上行流量是免费的，但是下行流量是需要购买的。</p>
</blockquote>
<h5 id="_1-1-2-3、创建bucket" tabindex="-1"><a class="header-anchor" href="#_1-1-2-3、创建bucket" aria-hidden="true">#</a> 1.1.2.3、创建Bucket</h5>
<p>使用OSS，首先需要创建Bucket，Bucket翻译成中文是水桶的意思，把存储的图片资源看做是水，想要盛水必须得有桶，就是这个意思了。</p>
<p>进入控制台，https://oss.console.aliyun.com/overview</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201017113211471.png" alt="image-20201017113211471"></p>
<p>选择Bucket后，即可看到对应的信息，如：url、消耗流量等 :</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201017113430118.png" alt="image-20201017113430118"></p>
<p>文件管理：</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201017113536835.png" alt="image-20201017113536835"></p>
<p>查看文件：</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201017113557135.png" alt="image-20201017113557135"></p>
<h5 id="_1-1-2-4、创建用户" tabindex="-1"><a class="header-anchor" href="#_1-1-2-4、创建用户" aria-hidden="true">#</a> 1.1.2.4、创建用户</h5>
<p>创建用户的方式与短信接口中的方式一样，需要设置oss权限。</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201017114136997.png" alt="image-20201017114136997"></p>
<h4 id="_1-1-3、导入依赖" tabindex="-1"><a class="header-anchor" href="#_1-1-3、导入依赖" aria-hidden="true">#</a> 1.1.3、导入依赖</h4>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.aliyun.oss<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>aliyun-sdk-oss<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.8.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-4、oss配置" tabindex="-1"><a class="header-anchor" href="#_1-1-4、oss配置" aria-hidden="true">#</a> 1.1.4、OSS配置</h4>
<p>aliyun.properties：</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token key attr-name">aliyun.endpoint</span> <span class="token punctuation">=</span> <span class="token value attr-value">http://oss-cn-zhangjiakou.aliyuncs.com</span>
<span class="token key attr-name">aliyun.accessKeyId</span> <span class="token punctuation">=</span> <span class="token value attr-value">***********</span>
<span class="token key attr-name">aliyun.accessKeySecret</span> <span class="token punctuation">=</span> <span class="token value attr-value">***************</span>
<span class="token key attr-name">aliyun.bucketName</span><span class="token punctuation">=</span> <span class="token value attr-value">tanhua-dev</span>
<span class="token key attr-name">aliyun.urlPrefix</span><span class="token punctuation">=</span><span class="token value attr-value">http://tanhua-dev.oss-cn-zhangjiakou.aliyuncs.com/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AliyunConfig：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyun<span class="token punctuation">.</span>oss<span class="token punctuation">.</span></span><span class="token class-name">OSSClient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span></span><span class="token class-name">ConfigurationProperties</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PropertySource</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@PropertySource</span><span class="token punctuation">(</span><span class="token string">"classpath:aliyun.properties"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"aliyun"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AliyunConfig</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> endpoint<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> accessKeyId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> accessKeySecret<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> bucketName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> urlPrefix<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">OSSClient</span> <span class="token function">oSSClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">OSSClient</span><span class="token punctuation">(</span>endpoint<span class="token punctuation">,</span> accessKeyId<span class="token punctuation">,</span> accessKeySecret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-5、picuploadservice" tabindex="-1"><a class="header-anchor" href="#_1-1-5、picuploadservice" aria-hidden="true">#</a> 1.1.5、PicUploadService</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyun<span class="token punctuation">.</span>oss<span class="token punctuation">.</span></span><span class="token class-name">OSSClient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>config<span class="token punctuation">.</span></span><span class="token class-name">AliyunConfig</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>vo<span class="token punctuation">.</span></span><span class="token class-name">PicUploadResult</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">RandomUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">StringUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">DateTime</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>multipart<span class="token punctuation">.</span></span><span class="token class-name">MultipartFile</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">ByteArrayInputStream</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PicUploadService</span> <span class="token punctuation">{</span>

    <span class="token comment">// 允许上传的格式</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">IMAGE_TYPE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token string">".bmp"</span><span class="token punctuation">,</span> <span class="token string">".jpg"</span><span class="token punctuation">,</span>
            <span class="token string">".jpeg"</span><span class="token punctuation">,</span> <span class="token string">".gif"</span><span class="token punctuation">,</span> <span class="token string">".png"</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">OSSClient</span> ossClient<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">AliyunConfig</span> aliyunConfig<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">PicUploadResult</span> <span class="token function">upload</span><span class="token punctuation">(</span><span class="token class-name">MultipartFile</span> uploadFile<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">PicUploadResult</span> fileUploadResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PicUploadResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//图片做校验，对后缀名</span>
        <span class="token keyword">boolean</span> isLegal <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> type <span class="token operator">:</span> <span class="token constant">IMAGE_TYPE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">endsWithIgnoreCase</span><span class="token punctuation">(</span>uploadFile<span class="token punctuation">.</span><span class="token function">getOriginalFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                isLegal <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isLegal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fileUploadResult<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token string">"error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> fileUploadResult<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 文件新路径</span>
        <span class="token class-name">String</span> fileName <span class="token operator">=</span> uploadFile<span class="token punctuation">.</span><span class="token function">getOriginalFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> filePath <span class="token operator">=</span> <span class="token function">getFilePath</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 上传到阿里云</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 目录结构：images/2018/12/29/xxxx.jpg</span>
            ossClient<span class="token punctuation">.</span><span class="token function">putObject</span><span class="token punctuation">(</span>aliyunConfig<span class="token punctuation">.</span><span class="token function">getBucketName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> filePath<span class="token punctuation">,</span> <span class="token keyword">new</span>
                    <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>uploadFile<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//上传失败</span>
            fileUploadResult<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token string">"error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> fileUploadResult<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 上传成功</span>
        fileUploadResult<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token string">"done"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fileUploadResult<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>aliyunConfig<span class="token punctuation">.</span><span class="token function">getUrlPrefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        fileUploadResult<span class="token punctuation">.</span><span class="token function">setUid</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> fileUploadResult<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">getFilePath</span><span class="token punctuation">(</span><span class="token class-name">String</span> sourceFileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DateTime</span> dateTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"images/"</span> <span class="token operator">+</span> dateTime<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">"yyyy"</span><span class="token punctuation">)</span>
                <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> dateTime<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">"MM"</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"/"</span>
                <span class="token operator">+</span> dateTime<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">"dd"</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>
                <span class="token class-name">RandomUtils</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">9999</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"."</span> <span class="token operator">+</span>
                <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">substringAfterLast</span><span class="token punctuation">(</span>sourceFileName<span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所需其他的代码：</p>
<p>PicUploadResult:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>vo</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PicUploadResult</span> <span class="token punctuation">{</span>

    <span class="token comment">// 文件唯一标识</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> uid<span class="token punctuation">;</span>
    <span class="token comment">// 文件名</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token comment">// 状态有：uploading done error removed</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> status<span class="token punctuation">;</span>
    <span class="token comment">// 服务端响应内容，如：'{"status": "success"}'</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> response<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-6、picuploadcontroller" tabindex="-1"><a class="header-anchor" href="#_1-1-6、picuploadcontroller" aria-hidden="true">#</a> 1.1.6、PicUploadController</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>controller</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">PicUploadService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>vo<span class="token punctuation">.</span></span><span class="token class-name">PicUploadResult</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Controller</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PostMapping</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestMapping</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestParam</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">ResponseBody</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>multipart<span class="token punctuation">.</span></span><span class="token class-name">MultipartFile</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"pic/upload"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Controller</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PicUploadController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">PicUploadService</span> picUploadService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostMapping</span>
    <span class="token annotation punctuation">@ResponseBody</span>
    <span class="token keyword">public</span> <span class="token class-name">PicUploadResult</span> <span class="token function">upload</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"file"</span><span class="token punctuation">)</span> <span class="token class-name">MultipartFile</span> multipartFile<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>picUploadService<span class="token punctuation">.</span><span class="token function">upload</span><span class="token punctuation">(</span>multipartFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-7、测试" tabindex="-1"><a class="header-anchor" href="#_1-1-7、测试" aria-hidden="true">#</a> 1.1.7、测试</h4>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1563979044942.png" alt="1563979044942"></p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1563979058395.png" alt="1563979058395"></p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1563979080567.png" alt="1563979080567"></p>
<h3 id="_1-2、人脸识别" tabindex="-1"><a class="header-anchor" href="#_1-2、人脸识别" aria-hidden="true">#</a> 1.2、人脸识别</h3>
<p>人脸识别技术采用虹软开放平台实现（免费使用）。官网：https://www.arcsoft.com.cn/ <img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1563979263800.png" alt="1563979263800"></p>
<h4 id="_1-2-1、使用说明" tabindex="-1"><a class="header-anchor" href="#_1-2-1、使用说明" aria-hidden="true">#</a> 1.2.1、使用说明</h4>
<p>使用虹软平台需要先注册开发者账号：https://ai.arcsoft.com.cn/ucenter/user/userlogin</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1563979739584.png" alt="1563979739584"></p>
<p>注册完成后进行登录，然后进行创建应用：</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201123103558410.png" alt="image-20201123103558410"></p>
<p>创建完成后，需要进行实名认证，否则相关的SDK是不能使用的。</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1563980059191.png" alt="1563980059191"></p>
<p>实名认证后即可下载对应平台的SDk，我们需要下载windows以及linux平台。</p>
<p>添加SDK（Linux与Windows平台）：</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201123103650588.png" alt="image-20201123103650588"></p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201123103734310.png" alt="image-20201123103734310"></p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201123103924768.png" alt="image-20201123103924768"></p>
<p>下载SDK，打开解压包，可以看到有提供相应的jar包以及示例代码：</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1563980211415.png" alt="1563980211415"></p>
<p>需要特别说明的是：每个账号的SDK包不通用，所以自己要下载自己的SDK包。</p>
<h4 id="_1-2-2、安装jar到本地仓库" tabindex="-1"><a class="header-anchor" href="#_1-2-2、安装jar到本地仓库" aria-hidden="true">#</a> 1.2.2、安装jar到本地仓库</h4>
<p>进入到libs目录，需要将arcsoft-sdk-face-3.0.0.0.jar安装到本地仓库：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>mvn install:install-file <span class="token parameter variable">-DgroupId</span><span class="token operator">=</span>com.arcsoft.face <span class="token parameter variable">-DartifactId</span><span class="token operator">=</span>arcsoft-sdk-face <span class="token parameter variable">-Dversion</span><span class="token operator">=</span><span class="token number">3.0</span>.0.0 <span class="token parameter variable">-Dpackaging</span><span class="token operator">=</span>jar <span class="token parameter variable">-Dfile</span><span class="token operator">=</span>arcsoft-sdk-face-3.0.0.0.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装成功后，即可通过maven坐标引用了：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.arcsoft.face<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>arcsoft-sdk-face<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.0.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--&lt;scope>system&lt;/scope>--></span>
    <span class="token comment">&lt;!--如果没有安装到本地仓库，可以将jar包拷贝到工程的lib下面下，直接引用--></span>
    <span class="token comment">&lt;!--&lt;systemPath>${project.basedir}/lib/arcsoft-sdk-face-3.0.0.0.jar&lt;/systemPath>--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-3、开始使用" tabindex="-1"><a class="header-anchor" href="#_1-2-3、开始使用" aria-hidden="true">#</a> 1.2.3、开始使用</h4>
<blockquote>
<p>说明：虹软的SDK是免费使用的，但是首次使用时需要联网激活，激活后可离线使用。使用周期为1年，1年后需要联网再次激活。</p>
<p>个人免费激活SDK总数量为100。</p>
</blockquote>
<p>配置：application.properties</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment">#虹软相关配置(在虹软应用中找到对应的参数)</span>
<span class="token key attr-name">arcsoft.appid</span><span class="token punctuation">=</span><span class="token value attr-value">******************</span>
<span class="token key attr-name">arcsoft.sdkKey</span><span class="token punctuation">=</span><span class="token value attr-value">*****************</span>
<span class="token key attr-name">arcsoft.libPath</span><span class="token punctuation">=</span><span class="token value attr-value">F:\\code\\WIN64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>FaceEngineService：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>arcsoft<span class="token punctuation">.</span>face<span class="token punctuation">.</span></span><span class="token class-name">EngineConfiguration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>arcsoft<span class="token punctuation">.</span>face<span class="token punctuation">.</span></span><span class="token class-name">FaceEngine</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>arcsoft<span class="token punctuation">.</span>face<span class="token punctuation">.</span></span><span class="token class-name">FaceInfo</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>arcsoft<span class="token punctuation">.</span>face<span class="token punctuation">.</span></span><span class="token class-name">FunctionConfiguration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>arcsoft<span class="token punctuation">.</span>face<span class="token punctuation">.</span>enums<span class="token punctuation">.</span></span><span class="token class-name">DetectMode</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>arcsoft<span class="token punctuation">.</span>face<span class="token punctuation">.</span>enums<span class="token punctuation">.</span></span><span class="token class-name">DetectOrient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>arcsoft<span class="token punctuation">.</span>face<span class="token punctuation">.</span>enums<span class="token punctuation">.</span></span><span class="token class-name">ErrorInfo</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>arcsoft<span class="token punctuation">.</span>face<span class="token punctuation">.</span>enums<span class="token punctuation">.</span></span><span class="token class-name">ImageFormat</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>arcsoft<span class="token punctuation">.</span>face<span class="token punctuation">.</span>toolkit<span class="token punctuation">.</span></span><span class="token class-name">ImageFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>arcsoft<span class="token punctuation">.</span>face<span class="token punctuation">.</span>toolkit<span class="token punctuation">.</span></span><span class="token class-name">ImageInfo</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Logger</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">LoggerFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Value</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PostConstruct</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">File</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FaceEngineService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> <span class="token constant">LOGGER</span> <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">FaceEngineService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${arcsoft.appid}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> appid<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${arcsoft.sdkKey}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> sdkKey<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${arcsoft.libPath}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> libPath<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">FaceEngine</span> faceEngine<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 激活并且初始化引擎</span>
        <span class="token class-name">FaceEngine</span> faceEngine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FaceEngine</span><span class="token punctuation">(</span>libPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> activeCode <span class="token operator">=</span> faceEngine<span class="token punctuation">.</span><span class="token function">activeOnline</span><span class="token punctuation">(</span>appid<span class="token punctuation">,</span> sdkKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>activeCode <span class="token operator">!=</span> <span class="token class-name">ErrorInfo</span><span class="token punctuation">.</span><span class="token constant">MOK</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> activeCode <span class="token operator">!=</span> <span class="token class-name">ErrorInfo</span><span class="token punctuation">.</span><span class="token constant">MERR_ASF_ALREADY_ACTIVATED</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"引擎激活失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"引擎激活失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//引擎配置</span>
        <span class="token class-name">EngineConfiguration</span> engineConfiguration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EngineConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//IMAGE检测模式，用于处理单张的图像数据</span>
        engineConfiguration<span class="token punctuation">.</span><span class="token function">setDetectMode</span><span class="token punctuation">(</span><span class="token class-name">DetectMode</span><span class="token punctuation">.</span><span class="token constant">ASF_DETECT_MODE_IMAGE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//人脸检测角度，全角度</span>
        engineConfiguration<span class="token punctuation">.</span><span class="token function">setDetectFaceOrientPriority</span><span class="token punctuation">(</span><span class="token class-name">DetectOrient</span><span class="token punctuation">.</span><span class="token constant">ASF_OP_ALL_OUT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//功能配置</span>
        <span class="token class-name">FunctionConfiguration</span> functionConfiguration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FunctionConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        functionConfiguration<span class="token punctuation">.</span><span class="token function">setSupportAge</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        functionConfiguration<span class="token punctuation">.</span><span class="token function">setSupportFace3dAngle</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        functionConfiguration<span class="token punctuation">.</span><span class="token function">setSupportFaceDetect</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        functionConfiguration<span class="token punctuation">.</span><span class="token function">setSupportFaceRecognition</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        functionConfiguration<span class="token punctuation">.</span><span class="token function">setSupportGender</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        functionConfiguration<span class="token punctuation">.</span><span class="token function">setSupportLiveness</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        functionConfiguration<span class="token punctuation">.</span><span class="token function">setSupportIRLiveness</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        engineConfiguration<span class="token punctuation">.</span><span class="token function">setFunctionConfiguration</span><span class="token punctuation">(</span>functionConfiguration<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//初始化引擎</span>
        <span class="token keyword">int</span> initCode <span class="token operator">=</span> faceEngine<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>engineConfiguration<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>initCode <span class="token operator">!=</span> <span class="token class-name">ErrorInfo</span><span class="token punctuation">.</span><span class="token constant">MOK</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"初始化引擎出错!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"初始化引擎出错!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>faceEngine <span class="token operator">=</span> faceEngine<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 检测图片是否为人像
     *
     * <span class="token keyword">@param</span> <span class="token parameter">imageInfo</span> 图像对象
     * <span class="token keyword">@return</span> true:人像，false:非人像
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">checkIsPortrait</span><span class="token punctuation">(</span><span class="token class-name">ImageInfo</span> imageInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 定义人脸列表</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FaceInfo</span><span class="token punctuation">></span></span> faceInfoList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FaceInfo</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        faceEngine<span class="token punctuation">.</span><span class="token function">detectFaces</span><span class="token punctuation">(</span>imageInfo<span class="token punctuation">.</span><span class="token function">getImageData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> imageInfo<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> imageInfo<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">ImageFormat</span><span class="token punctuation">.</span><span class="token constant">CP_PAF_BGR24</span><span class="token punctuation">,</span> faceInfoList<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">!</span>faceInfoList<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">checkIsPortrait</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> imageData<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">checkIsPortrait</span><span class="token punctuation">(</span><span class="token class-name">ImageFactory</span><span class="token punctuation">.</span><span class="token function">getRGBData</span><span class="token punctuation">(</span>imageData<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">checkIsPortrait</span><span class="token punctuation">(</span><span class="token class-name">File</span> file<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">checkIsPortrait</span><span class="token punctuation">(</span><span class="token class-name">ImageFactory</span><span class="token punctuation">.</span><span class="token function">getRGBData</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#问题：</span>
Caused by: java.lang.UnsatisfiedLinkError: D:<span class="token punctuation">\</span>gongju<span class="token punctuation">\</span>renlian<span class="token punctuation">\</span>haha<span class="token punctuation">\</span>libs<span class="token punctuation">\</span>WIN64<span class="token punctuation">\</span>libarcsoft_face.dll: Can't <span class="token function">find</span> dependent libraries

解决：
安装资料中的：vcredist_x64.exe，即可解决。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-4、测试" tabindex="-1"><a class="header-anchor" href="#_1-2-4、测试" aria-hidden="true">#</a> 1.2.4、测试</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span></span><span class="token class-name">Test</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>runner<span class="token punctuation">.</span></span><span class="token class-name">RunWith</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>test<span class="token punctuation">.</span>context<span class="token punctuation">.</span></span><span class="token class-name">SpringBootTest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>test<span class="token punctuation">.</span>context<span class="token punctuation">.</span>junit4<span class="token punctuation">.</span></span><span class="token class-name">SpringJUnit4ClassRunner</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">File</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@SpringBootTest</span>
<span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringJUnit4ClassRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestFaceEngineService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">FaceEngineService</span> faceEngineService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testCheckIsPortrait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"F:\\1.jpg"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> checkIsPortrait <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>faceEngineService<span class="token punctuation">.</span><span class="token function">checkIsPortrait</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>checkIsPortrait<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true|false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3、实现完善个人信息" tabindex="-1"><a class="header-anchor" href="#_1-3、实现完善个人信息" aria-hidden="true">#</a> 1.3、实现完善个人信息</h3>
<p>完善个人信息的功能实现，分为2个接口完成，分别是：完善个人资料信息、头像上传。</p>
<p>mock接口：</p>
<ul>
<li>完善个人信息
<ul>
<li>https://mock.boxuegu.com/project/164/interface/api/28553</li>
<li><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1564544646937.png" alt="1564544646937"></li>
</ul>
</li>
<li>上传头像
<ul>
<li>https://mock.boxuegu.com/project/164/interface/api/39725</li>
<li><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1564544663974.png" alt="1564544663974"></li>
</ul>
</li>
</ul>
<h4 id="_1-3-1、userinfomapper" tabindex="-1"><a class="header-anchor" href="#_1-3-1、userinfomapper" aria-hidden="true">#</a> 1.3.1、UserInfoMapper</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>mapper</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">BaseMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">UserInfo</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserInfoMapper</span> <span class="token keyword">extends</span> <span class="token class-name">BaseMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserInfo</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-2、userinfoservice" tabindex="-1"><a class="header-anchor" href="#_1-3-2、userinfoservice" aria-hidden="true">#</a> 1.3.2、UserInfoService</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>conditions<span class="token punctuation">.</span>query<span class="token punctuation">.</span></span><span class="token class-name">QueryWrapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>enums<span class="token punctuation">.</span></span><span class="token class-name">SexEnum</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">UserInfoMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">UserInfo</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>vo<span class="token punctuation">.</span></span><span class="token class-name">PicUploadResult</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">StringUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>multipart<span class="token punctuation">.</span></span><span class="token class-name">MultipartFile</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserInfoService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">UserService</span> userService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">UserInfoMapper</span> userInfoMapper<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">FaceEngineService</span> faceEngineService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">PicUploadService</span> picUploadService<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">saveUserInfo</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> param<span class="token punctuation">,</span> <span class="token class-name">String</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//校验token</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userService<span class="token punctuation">.</span><span class="token function">queryUserByToken</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">UserInfo</span> userInfo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userInfo<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userInfo<span class="token punctuation">.</span><span class="token function">setSex</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"gender"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"man"</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token class-name">SexEnum</span><span class="token punctuation">.</span><span class="token constant">MAN</span> <span class="token operator">:</span> <span class="token class-name">SexEnum</span><span class="token punctuation">.</span><span class="token constant">WOMAN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userInfo<span class="token punctuation">.</span><span class="token function">setNickName</span><span class="token punctuation">(</span>param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"nickname"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userInfo<span class="token punctuation">.</span><span class="token function">setBirthday</span><span class="token punctuation">(</span>param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"birthday"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userInfo<span class="token punctuation">.</span><span class="token function">setCity</span><span class="token punctuation">(</span>param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"city"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userInfoMapper<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">saveUserLogo</span><span class="token punctuation">(</span><span class="token class-name">MultipartFile</span> file<span class="token punctuation">,</span> <span class="token class-name">String</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//校验token</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userService<span class="token punctuation">.</span><span class="token function">queryUserByToken</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">//校验图片是否是人像，如果不是人像就返回false</span>
            <span class="token keyword">boolean</span> b <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>faceEngineService<span class="token punctuation">.</span><span class="token function">checkIsPortrait</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//图片上传到阿里云OSS</span>
        <span class="token class-name">PicUploadResult</span> result <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>picUploadService<span class="token punctuation">.</span><span class="token function">upload</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//上传失败</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//把头像保存到用户信息表中</span>
        <span class="token class-name">UserInfo</span> userInfo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userInfo<span class="token punctuation">.</span><span class="token function">setLogo</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">QueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserInfo</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">QueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"user_id"</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userInfoMapper<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">,</span> queryWrapper<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-3、userinfocontroller" tabindex="-1"><a class="header-anchor" href="#_1-3-3、userinfocontroller" aria-hidden="true">#</a> 1.3.3、UserInfoController</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>controller</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">UserInfoService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">UserService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>vo<span class="token punctuation">.</span></span><span class="token class-name">ErrorResult</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">StringUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpStatus</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">ResponseEntity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>multipart<span class="token punctuation">.</span></span><span class="token class-name">MultipartFile</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashMap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserInfoController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">UserInfoService</span> userInfoService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 完善个人信息-基本信息
     *
     * <span class="token keyword">@param</span> <span class="token parameter">param</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"loginReginfo"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">saveUserInfo</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> param<span class="token punctuation">,</span>
                                               <span class="token annotation punctuation">@RequestHeader</span><span class="token punctuation">(</span><span class="token string">"Authorization"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Boolean</span> bool <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userInfoService<span class="token punctuation">.</span><span class="token function">saveUserInfo</span><span class="token punctuation">(</span>param<span class="token punctuation">,</span> token<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bool<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">ErrorResult</span> errorResult <span class="token operator">=</span> <span class="token class-name">ErrorResult</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">errCode</span><span class="token punctuation">(</span><span class="token string">"000001"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">errMessage</span><span class="token punctuation">(</span><span class="token string">"保存用户信息失败！"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">INTERNAL_SERVER_ERROR</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span>errorResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 完善个人信息-用户头像
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"loginReginfo/head"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">saveUserLogo</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"headPhoto"</span><span class="token punctuation">)</span> <span class="token class-name">MultipartFile</span> file<span class="token punctuation">,</span>
                                               <span class="token annotation punctuation">@RequestHeader</span><span class="token punctuation">(</span><span class="token string">"Authorization"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Boolean</span> bool <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userInfoService<span class="token punctuation">.</span><span class="token function">saveUserLogo</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span> token<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bool<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">ErrorResult</span> errorResult <span class="token operator">=</span> <span class="token class-name">ErrorResult</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">errCode</span><span class="token punctuation">(</span><span class="token string">"000001"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">errMessage</span><span class="token punctuation">(</span><span class="token string">"保存用户logo失败！"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">INTERNAL_SERVER_ERROR</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span>errorResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-4-4、测试" tabindex="-1"><a class="header-anchor" href="#_1-4-4、测试" aria-hidden="true">#</a> 1.4.4、测试</h4>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1564544823149.png" alt="1564544823149"></p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1564544871515.png" alt="1564544871515"></p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1564544931311.png" alt="1564544931311"></p>
<p>图片上传超过1MB出错的解决方案：</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment">#在application.properties文件中，填入下面的配置</span>
<span class="token comment">#设置最大的文件上传大小</span>
<span class="token key attr-name">spring.servlet.multipart.max-request-size</span><span class="token punctuation">=</span><span class="token value attr-value">30MB</span>
<span class="token key attr-name">spring.servlet.multipart.max-file-size</span><span class="token punctuation">=</span><span class="token value attr-value">30MB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、校验token" tabindex="-1"><a class="header-anchor" href="#_2、校验token" aria-hidden="true">#</a> 2、校验token</h2>
<p>在整个系统架构中，只有SSO保存了JWT中的秘钥，所以只能通过SSO系统提供的接口服务进行对token的校验，所以在SSO系统中，需要对外开放接口，通过token进行查询用户信息，如果返回null说明用户状态已过期或者是非法的token，否则返回User对象数据。</p>
<h3 id="_2-1、usercontroller" tabindex="-1"><a class="header-anchor" href="#_2-1、usercontroller" aria-hidden="true">#</a> 2.1、UserController</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 校验token，根据token查询用户数据
     *
     * <span class="token keyword">@param</span> <span class="token parameter">token</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"{token}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">queryUserByToken</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userService<span class="token punctuation">.</span><span class="token function">queryUserByToken</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2、userservice" tabindex="-1"><a class="header-anchor" href="#_2-2、userservice" aria-hidden="true">#</a> 2.2、UserService</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">queryUserByToken</span><span class="token punctuation">(</span><span class="token class-name">String</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 通过token解析数据</span>
            <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> body <span class="token operator">=</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">parser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">setSigningKey</span><span class="token punctuation">(</span>secret<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">parseClaimsJws</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            user<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>body<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//需要返回user对象中的mobile，需要查询数据库获取到mobile数据</span>
            <span class="token comment">//如果每次都查询数据库，必然会导致性能问题，需要对用户的手机号进行缓存操作</span>
            <span class="token comment">//数据缓存时，需要设置过期时间，过期时间要与token的时间一致</span>
            <span class="token comment">//如果用户修改了手机号，需要同步修改redis中的数据</span>

            <span class="token class-name">String</span> redisKey <span class="token operator">=</span> <span class="token string">"TANHUA_USER_MOBILE_"</span> <span class="token operator">+</span> user<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>redisTemplate<span class="token punctuation">.</span><span class="token function">hasKey</span><span class="token punctuation">(</span>redisKey<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">String</span> mobile <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>redisKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
                user<span class="token punctuation">.</span><span class="token function">setMobile</span><span class="token punctuation">(</span>mobile<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">//查询数据库</span>
                <span class="token class-name">User</span> u <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userMapper<span class="token punctuation">.</span><span class="token function">selectById</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                user<span class="token punctuation">.</span><span class="token function">setMobile</span><span class="token punctuation">(</span>u<span class="token punctuation">.</span><span class="token function">getMobile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">//将手机号写入到redis中</span>
                <span class="token comment">//在jwt中的过期时间的单位为：秒</span>
                <span class="token keyword">long</span> timeout <span class="token operator">=</span> <span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>body<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"exp"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">-</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>redisKey<span class="token punctuation">,</span> u<span class="token punctuation">.</span><span class="token function">getMobile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> timeout<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">return</span> user<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ExpiredJwtException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"token已经过期！ token = "</span> <span class="token operator">+</span> token<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"token不合法！ token = "</span><span class="token operator">+</span> token<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3、测试" tabindex="-1"><a class="header-anchor" href="#_2-3、测试" aria-hidden="true">#</a> 2.3、测试</h3>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201123155434121.png" alt="image-20201123155434121"></p>
<p>数据已经存储到redis中：</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201123162229283.png" alt="image-20201123162229283"></p>
<h2 id="_3、mongodb快速入门" tabindex="-1"><a class="header-anchor" href="#_3、mongodb快速入门" aria-hidden="true">#</a> 3、MongoDB快速入门</h2>
<h3 id="_3-1、mongodb简介" tabindex="-1"><a class="header-anchor" href="#_3-1、mongodb简介" aria-hidden="true">#</a> 3.1、MongoDB简介</h3>
<p>MongoDB是一个基于分布式文件存储的数据库。由C++语言编写。旨在为WEB应用提供可扩展的高性能数据存储解决方案。</p>
<p>MongoDB是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的，它支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型。</p>
<p>MongoDB最大的特点是它支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。</p>
<p>官网：https://www.mongodb.com</p>
<h3 id="_3-2、通过docker安装mongodb" tabindex="-1"><a class="header-anchor" href="#_3-2、通过docker安装mongodb" aria-hidden="true">#</a> 3.2、通过docker安装MongoDB</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#拉取镜像</span>
<span class="token function">docker</span> pull mongo:4.0.3

<span class="token comment">#创建容器</span>
<span class="token function">docker</span> create <span class="token parameter variable">--name</span> mongodb-server <span class="token parameter variable">-p</span> <span class="token number">27018</span>:27017 <span class="token parameter variable">-v</span> mongodb-data:/data/db mongo:4.0.3 <span class="token parameter variable">--auth</span>

<span class="token comment">#启动容器</span>
<span class="token function">docker</span> start mongodb-server

<span class="token comment">#进入容器</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mongodb-server /bin/bash


<span class="token comment">#进入admin数据库</span>
mongo
use admin

<span class="token comment">#添加管理员，其拥有管理用户和角色的权限</span>
db.createUser<span class="token punctuation">(</span><span class="token punctuation">{</span> user: <span class="token string">'root'</span>, pwd: <span class="token string">'root'</span>, roles: <span class="token punctuation">[</span> <span class="token punctuation">{</span> role: <span class="token string">"root"</span>, db: <span class="token string">"admin"</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">#测试，发现是没有权限操作的</span>
<span class="token operator">></span> show dbs
<span class="token number">2020</span>-10-20T09:09:15.543+0000 E QUERY    <span class="token punctuation">[</span>js<span class="token punctuation">]</span> Error: listDatabases failed:<span class="token punctuation">{</span>
        <span class="token string">"ok"</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>,
        <span class="token string">"errmsg"</span> <span class="token builtin class-name">:</span> <span class="token string">"command listDatabases requires authentication"</span>,
        <span class="token string">"code"</span> <span class="token builtin class-name">:</span> <span class="token number">13</span>,
        <span class="token string">"codeName"</span> <span class="token builtin class-name">:</span> <span class="token string">"Unauthorized"</span>
<span class="token punctuation">}</span> <span class="token builtin class-name">:</span>

<span class="token comment">#进行认证</span>
mongo <span class="token parameter variable">-u</span> <span class="token string">"root"</span> <span class="token parameter variable">-p</span> <span class="token string">"root"</span> <span class="token parameter variable">--authenticationDatabase</span> <span class="token string">"admin"</span>

<span class="token comment">#通过admin添加普通用户</span>
use admin
db.createUser<span class="token punctuation">(</span><span class="token punctuation">{</span> user: <span class="token string">'tanhua'</span>, pwd: <span class="token string">'l3SCjl0HvmSkTtiSbN0Swv40spYnHhDV'</span>, roles: <span class="token punctuation">[</span> <span class="token punctuation">{</span> role: <span class="token string">"readWrite"</span>, db: <span class="token string">"tanhua"</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#通过tanhua用户登录进行测试</span>
mongo <span class="token parameter variable">-u</span> <span class="token string">"tanhua"</span> <span class="token parameter variable">-p</span> <span class="token string">"l3SCjl0HvmSkTtiSbN0Swv40spYnHhDV"</span> <span class="token parameter variable">--authenticationDatabase</span> <span class="token string">"admin"</span>

<span class="token comment">#测试</span>
root@5d848955ff7e:/<span class="token comment"># mongo -u "tanhua" -p "tanhua123" --authenticationDatabase "admin"</span>
MongoDB shell version v4.0.3
connecting to: mongodb://127.0.0.1:27017
Implicit session: session <span class="token punctuation">{</span> <span class="token string">"id"</span> <span class="token builtin class-name">:</span> UUID<span class="token punctuation">(</span><span class="token string">"6c368269-30f0-4b29-a224-05a38b5847e2"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
MongoDB server version: <span class="token number">4.0</span>.3
<span class="token operator">></span> use tanhua
switched to db tanhua
<span class="token operator">></span> db.user.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>id:1,username:<span class="token string">'zhangsan'</span>,age:20<span class="token punctuation">}</span><span class="token punctuation">)</span>
WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">"nInserted"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">></span> db.user.<span class="token function-name function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5f8eb2726e0de0aa9517afd3"</span><span class="token punctuation">)</span>, <span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>, <span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token string">"zhangsan"</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">20</span> <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3、mongodb基本操作" tabindex="-1"><a class="header-anchor" href="#_3-3、mongodb基本操作" aria-hidden="true">#</a> 3.3、MongoDB基本操作</h3>
<h4 id="_3-3-1、基本概念" tabindex="-1"><a class="header-anchor" href="#_3-3-1、基本概念" aria-hidden="true">#</a> 3.3.1、基本概念</h4>
<p>为了更好的理解，下面与SQL中的概念进行对比：</p>
<table>
<thead>
<tr>
<th>SQL术语/概念</th>
<th>MongoDB术语/概念</th>
<th>解释/说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>database</td>
<td>database</td>
<td>数据库</td>
</tr>
<tr>
<td>table</td>
<td>collection</td>
<td>数据库表/集合</td>
</tr>
<tr>
<td>row</td>
<td>document</td>
<td>数据记录行/文档</td>
</tr>
<tr>
<td>column</td>
<td>field</td>
<td>数据字段/域</td>
</tr>
<tr>
<td>index</td>
<td>index</td>
<td>索引</td>
</tr>
<tr>
<td>table joins</td>
<td></td>
<td>表连接,MongoDB不支持</td>
</tr>
<tr>
<td>primary key</td>
<td>primary key</td>
<td>主键,MongoDB自动将_id字段设置为主键</td>
</tr>
</tbody>
</table>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/Figure-1-Mapping-Table-to-Collection-1.png" alt="img"></p>
<h4 id="_3-3-2、数据库以及表的操作" tabindex="-1"><a class="header-anchor" href="#_3-3-2、数据库以及表的操作" aria-hidden="true">#</a> 3.3.2、数据库以及表的操作</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#查看所有的数据库</span>
<span class="token operator">></span> show dbs
admin   <span class="token number">0</span>.000GB
config  <span class="token number">0</span>.000GB
<span class="token builtin class-name">local</span>   <span class="token number">0</span>.000GB

<span class="token comment">#通过use关键字切换数据库</span>
<span class="token operator">></span> use admin
switched to db admin

<span class="token comment">#创建数据库</span>
<span class="token comment">#说明：在MongoDB中，数据库是自动创建的，通过use切换到新数据库中，进行插入数据即可自动创建数据库</span>
<span class="token operator">></span> use testdb
switched to db testdb
<span class="token operator">></span> show dbs <span class="token comment">#并没有创建数据库</span>
admin   <span class="token number">0</span>.000GB
config  <span class="token number">0</span>.000GB
<span class="token builtin class-name">local</span>   <span class="token number">0</span>.000GB
<span class="token operator">></span> db.user.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>id:1,name:<span class="token string">'zhangsan'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>  <span class="token comment">#插入数据</span>
WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">"nInserted"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">></span> show dbs
admin   <span class="token number">0</span>.000GB
config  <span class="token number">0</span>.000GB
<span class="token builtin class-name">local</span>   <span class="token number">0</span>.000GB
testdb  <span class="token number">0</span>.000GB <span class="token comment">#数据库自动创建</span>

<span class="token comment">#查看表</span>
<span class="token operator">></span> show tables
user
<span class="token operator">></span> show collections
user
<span class="token operator">></span> 

<span class="token comment">#删除集合（表）</span>
<span class="token operator">></span> db.user.drop<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token boolean">true</span>  <span class="token comment">#如果成功删除选定集合，则 drop() 方法返回 true，否则返回 false。</span>

<span class="token comment">#删除数据库</span>
<span class="token operator">></span> use testdb <span class="token comment">#先切换到要删除的数据库中</span>
switched to db testdb
<span class="token operator">></span> db.dropDatabase<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">#删除数据库</span>
<span class="token punctuation">{</span> <span class="token string">"dropped"</span> <span class="token builtin class-name">:</span> <span class="token string">"testdb"</span>, <span class="token string">"ok"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
<span class="token operator">></span> show dbs
admin   <span class="token number">0</span>.000GB
config  <span class="token number">0</span>.000GB
<span class="token builtin class-name">local</span>   <span class="token number">0</span>.000GB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-3、新增数据" tabindex="-1"><a class="header-anchor" href="#_3-3-3、新增数据" aria-hidden="true">#</a> 3.3.3、新增数据</h4>
<p>在MongoDB中，存储的文档结构是一种类似于json的结构，称之为bson（全称为：Binary JSON）。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#插入数据</span>

<span class="token comment">#语法：db.COLLECTION_NAME.insert(document)</span>
<span class="token operator">></span> db.user.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>id:1,username:<span class="token string">'zhangsan'</span>,age:20<span class="token punctuation">}</span><span class="token punctuation">)</span>
WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">"nInserted"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">></span> db.user.save<span class="token punctuation">(</span><span class="token punctuation">{</span>id:2,username:<span class="token string">'lisi'</span>,age:25<span class="token punctuation">}</span><span class="token punctuation">)</span>
WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">"nInserted"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">></span> db.user.find<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">#查询数据</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0024b318926e0c1f6dc"</span><span class="token punctuation">)</span>, <span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>, <span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token string">"zhangsan"</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">20</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0134b318926e0c1f6dd"</span><span class="token punctuation">)</span>, <span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token number">2</span>, <span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token string">"lisi"</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">25</span> <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-4、更新数据" tabindex="-1"><a class="header-anchor" href="#_3-3-4、更新数据" aria-hidden="true">#</a> 3.3.4、更新数据</h4>
<p>update() 方法用于更新已存在的文档。语法格式如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>db.collection.update<span class="token punctuation">(</span>
   <span class="token operator">&lt;</span>query<span class="token operator">></span>,
   <span class="token operator">&lt;</span>update<span class="token operator">></span>,
   <span class="token punctuation">[</span>
     upsert: <span class="token operator">&lt;</span>boolean<span class="token operator">></span>,
     multi: <span class="token operator">&lt;</span>boolean<span class="token operator">></span>,
     writeConcern: <span class="token operator">&lt;</span>document<span class="token operator">></span>
   <span class="token punctuation">]</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数说明：</strong></p>
<ul>
<li><strong>query</strong> : update的查询条件，类似sql update查询内where后面的。</li>
<li><strong>update</strong> : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的</li>
<li><strong>upsert</strong> : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。</li>
<li><strong>multi</strong> : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。</li>
<li><strong>writeConcern</strong> :可选，抛出异常的级别。</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token operator">></span> db.user.<span class="token function-name function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0024b318926e0c1f6dc"</span><span class="token punctuation">)</span>, <span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>, <span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token string">"zhangsan"</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">20</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0134b318926e0c1f6dd"</span><span class="token punctuation">)</span>, <span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token number">2</span>, <span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token string">"lisi"</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">25</span> <span class="token punctuation">}</span>

<span class="token operator">></span> db.user.update<span class="token punctuation">(</span><span class="token punctuation">{</span>id:1<span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token variable">$set</span>:<span class="token punctuation">{</span>age:22<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">#更新数据</span>

WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">"nMatched"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>, <span class="token string">"nUpserted"</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>, <span class="token string">"nModified"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token operator">></span> db.user.<span class="token function-name function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0024b318926e0c1f6dc"</span><span class="token punctuation">)</span>, <span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>, <span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token string">"zhangsan"</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">22</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0134b318926e0c1f6dd"</span><span class="token punctuation">)</span>, <span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token number">2</span>, <span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token string">"lisi"</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">25</span> <span class="token punctuation">}</span>

<span class="token comment">#注意：如果这样写，会删除掉其他的字段</span>
<span class="token operator">></span> db.user.update<span class="token punctuation">(</span><span class="token punctuation">{</span>id:1<span class="token punctuation">}</span>,<span class="token punctuation">{</span>age:25<span class="token punctuation">}</span><span class="token punctuation">)</span>
WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">"nMatched"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>, <span class="token string">"nUpserted"</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>, <span class="token string">"nModified"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">></span> db.user.<span class="token function-name function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0024b318926e0c1f6dc"</span><span class="token punctuation">)</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">25</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0134b318926e0c1f6dd"</span><span class="token punctuation">)</span>, <span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token number">2</span>, <span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token string">"lisi"</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">25</span> <span class="token punctuation">}</span>

<span class="token comment">#更新不存在的字段，会新增字段</span>
<span class="token operator">></span> db.user.update<span class="token punctuation">(</span><span class="token punctuation">{</span>id:2<span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token variable">$set</span>:<span class="token punctuation">{</span>sex:1<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">#更新数据</span>
<span class="token operator">></span> db.user.<span class="token function-name function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0024b318926e0c1f6dc"</span><span class="token punctuation">)</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">25</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0134b318926e0c1f6dd"</span><span class="token punctuation">)</span>, <span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token number">2</span>, <span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token string">"lisi"</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">25</span>, <span class="token string">"sex"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>

<span class="token comment">#更新不存在的数据，默认不会新增数据</span>
<span class="token operator">></span> db.user.update<span class="token punctuation">(</span><span class="token punctuation">{</span>id:3<span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token variable">$set</span>:<span class="token punctuation">{</span>sex:1<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">"nMatched"</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>, <span class="token string">"nUpserted"</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>, <span class="token string">"nModified"</span> <span class="token builtin class-name">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">></span> db.user.<span class="token function-name function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0024b318926e0c1f6dc"</span><span class="token punctuation">)</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">25</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0134b318926e0c1f6dd"</span><span class="token punctuation">)</span>, <span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token number">2</span>, <span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token string">"lisi"</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">25</span>, <span class="token string">"sex"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>

<span class="token comment">#如果设置第一个参数为true，就是新增数据</span>
<span class="token operator">></span> db.user.update<span class="token punctuation">(</span><span class="token punctuation">{</span>id:3<span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token variable">$set</span>:<span class="token punctuation">{</span>sex:1<span class="token punctuation">}</span><span class="token punctuation">}</span>,true<span class="token punctuation">)</span>
WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token string">"nMatched"</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>,
	<span class="token string">"nUpserted"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>,
	<span class="token string">"nModified"</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>,
	<span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08cb281418d073246bc642"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">></span> db.user.<span class="token function-name function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0024b318926e0c1f6dc"</span><span class="token punctuation">)</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">25</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08c0134b318926e0c1f6dd"</span><span class="token punctuation">)</span>, <span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token number">2</span>, <span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token string">"lisi"</span>, <span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">25</span>, <span class="token string">"sex"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5c08cb281418d073246bc642"</span><span class="token punctuation">)</span>, <span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token number">3</span>, <span class="token string">"sex"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-5、删除数据" tabindex="-1"><a class="header-anchor" href="#_3-3-5、删除数据" aria-hidden="true">#</a> 3.3.5、删除数据</h4>
<p>通过remove()方法进行删除数据，语法如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>db.collection.remove<span class="token punctuation">(</span>
   <span class="token operator">&lt;</span>query<span class="token operator">></span>,
   <span class="token punctuation">{</span>
     justOne: <span class="token operator">&lt;</span>boolean<span class="token operator">></span>,
     writeConcern: <span class="token operator">&lt;</span>document<span class="token operator">></span>
   <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数说明：</strong></p>
<ul>
<li><strong>query</strong> :（可选）删除的文档的条件。</li>
<li><strong>justOne</strong> : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。</li>
<li><strong>writeConcern</strong> :（可选）抛出异常的级别。</li>
</ul>
<p>实例：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token operator">></span> db.user.remove<span class="token punctuation">(</span><span class="token punctuation">{</span>age:25<span class="token punctuation">}</span><span class="token punctuation">)</span>
WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">"nRemoved"</span> <span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>  <span class="token comment">#删除了2条数据</span>

<span class="token comment">#插入4条测试数据</span>
db.user.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>id:1,username:<span class="token string">'zhangsan'</span>,age:20<span class="token punctuation">}</span><span class="token punctuation">)</span>
db.user.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>id:2,username:<span class="token string">'lisi'</span>,age:21<span class="token punctuation">}</span><span class="token punctuation">)</span>
db.user.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>id:3,username:<span class="token string">'wangwu'</span>,age:22<span class="token punctuation">}</span><span class="token punctuation">)</span>
db.user.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>id:4,username:<span class="token string">'zhaoliu'</span>,age:22<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token operator">></span> db.user.remove<span class="token punctuation">(</span><span class="token punctuation">{</span>age:22<span class="token punctuation">}</span>,true<span class="token punctuation">)</span>
WriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">"nRemoved"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>  <span class="token comment">#删除了1条数据</span>

<span class="token comment">#删除所有数据</span>
<span class="token operator">></span> db.user.remove<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">#说明：为了简化操作，官方推荐使用deleteOne()与deleteMany()进行删除数据操作。</span>
db.user.deleteOne<span class="token punctuation">(</span><span class="token punctuation">{</span>id:1<span class="token punctuation">}</span><span class="token punctuation">)</span>
db.user.deleteMany<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>  <span class="token comment">#删除所有数据</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-6、查询数据" tabindex="-1"><a class="header-anchor" href="#_3-3-6、查询数据" aria-hidden="true">#</a> 3.3.6、查询数据</h4>
<p>MongoDB 查询数据的语法格式如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>db.user.find([query],[fields])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>query</strong> ：可选，使用查询操作符指定查询条件</li>
<li><strong>fields</strong> ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。</li>
</ul>
<p>如果你需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>>db.col.find().pretty()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>pretty() 方法以格式化的方式来显示所有文档。</p>
<p>条件查询：</p>
<table>
<thead>
<tr>
<th>操作</th>
<th>格式</th>
<th>范例</th>
<th>RDBMS中的类似语句</th>
</tr>
</thead>
<tbody>
<tr>
<td>等于</td>
<td><code v-pre>{&lt;key&gt;:&lt;value&gt;</code>}</td>
<td><code v-pre>db.col.find({&quot;by&quot;:&quot;黑马程序员&quot;}).pretty()</code></td>
<td><code v-pre>where by = '黑马程序员'</code></td>
</tr>
<tr>
<td>小于</td>
<td><code v-pre>{&lt;key&gt;:{$lt:&lt;value&gt;}}</code></td>
<td><code v-pre>db.col.find({&quot;likes&quot;:{$lt:50}}).pretty()</code></td>
<td><code v-pre>where likes &lt; 50</code></td>
</tr>
<tr>
<td>小于或等于</td>
<td><code v-pre>{&lt;key&gt;:{$lte:&lt;value&gt;}}</code></td>
<td><code v-pre>db.col.find({&quot;likes&quot;:{$lte:50}}).pretty()</code></td>
<td><code v-pre>where likes &lt;= 50</code></td>
</tr>
<tr>
<td>大于</td>
<td><code v-pre>{&lt;key&gt;:{$gt:&lt;value&gt;}}</code></td>
<td><code v-pre>db.col.find({&quot;likes&quot;:{$gt:50}}).pretty()</code></td>
<td><code v-pre>where likes &gt; 50</code></td>
</tr>
<tr>
<td>大于或等于</td>
<td><code v-pre>{&lt;key&gt;:{$gte:&lt;value&gt;}}</code></td>
<td><code v-pre>db.col.find({&quot;likes&quot;:{$gte:50}}).pretty()</code></td>
<td><code v-pre>where likes &gt;= 50</code></td>
</tr>
<tr>
<td>不等于</td>
<td><code v-pre>{&lt;key&gt;:{$ne:&lt;value&gt;}}</code></td>
<td><code v-pre>db.col.find({&quot;likes&quot;:{$ne:50}}).pretty()</code></td>
<td><code v-pre>where likes != 50</code></td>
</tr>
</tbody>
</table>
<p>实例：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#插入测试数据</span>
db.user.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>id:1,username:<span class="token string">'zhangsan'</span>,age:20<span class="token punctuation">}</span><span class="token punctuation">)</span>
db.user.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>id:2,username:<span class="token string">'lisi'</span>,age:21<span class="token punctuation">}</span><span class="token punctuation">)</span>
db.user.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>id:3,username:<span class="token string">'wangwu'</span>,age:22<span class="token punctuation">}</span><span class="token punctuation">)</span>
db.user.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>id:4,username:<span class="token string">'zhaoliu'</span>,age:22<span class="token punctuation">}</span><span class="token punctuation">)</span>

db.user.find<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">#查询全部数据</span>
db.user.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span>id:1,username:1<span class="token punctuation">}</span><span class="token punctuation">)</span>  <span class="token comment">#只查询id与username字段</span>
db.user.find<span class="token punctuation">(</span><span class="token punctuation">)</span>.count<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">#查询数据条数</span>
db.user.find<span class="token punctuation">(</span><span class="token punctuation">{</span>id:1<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">#查询id为1的数据</span>
db.user.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age:<span class="token punctuation">{</span><span class="token variable">$lte</span>:21<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">#查询小于等于21的数据</span>
db.user.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age:<span class="token punctuation">{</span><span class="token variable">$lte</span>:21<span class="token punctuation">}</span>, id:<span class="token punctuation">{</span><span class="token variable">$gte</span>:2<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">#and查询，age小于等于21并且id大于等于2</span>
db.user.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token variable">$or</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span>id:1<span class="token punctuation">}</span>,<span class="token punctuation">{</span>id:2<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">#查询id=1 or id=2</span>

<span class="token comment">#分页查询：Skip()跳过几条，limit()查询条数</span>
db.user.find<span class="token punctuation">(</span><span class="token punctuation">)</span>.limit<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>.skip<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment">#跳过1条数据，查询2条数据</span>

db.user.find<span class="token punctuation">(</span><span class="token punctuation">)</span>.sort<span class="token punctuation">(</span><span class="token punctuation">{</span>id:-1<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">#按照age倒序排序，-1为倒序，1为正序</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4、索引" tabindex="-1"><a class="header-anchor" href="#_3-4、索引" aria-hidden="true">#</a> 3.4、索引</h3>
<p>索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。</p>
<p>这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。</p>
<p>索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#查看索引</span>
<span class="token operator">></span> db.user.getIndexes<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span>
	<span class="token punctuation">{</span>
		<span class="token string">"v"</span> <span class="token builtin class-name">:</span> <span class="token number">2</span>,
		<span class="token string">"key"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
			<span class="token string">"_id"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>
		<span class="token punctuation">}</span>,
		<span class="token string">"name"</span> <span class="token builtin class-name">:</span> <span class="token string">"_id_"</span>,
		<span class="token string">"ns"</span> <span class="token builtin class-name">:</span> <span class="token string">"testdb.user"</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token comment">#说明：1表示升序创建索引，-1表示降序创建索引。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#创建索引</span>
<span class="token operator">></span> db.user.createIndex<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">'age'</span>:1<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token string">"createdCollectionAutomatically"</span> <span class="token builtin class-name">:</span> false,
	<span class="token string">"numIndexesBefore"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>,
	<span class="token string">"numIndexesAfter"</span> <span class="token builtin class-name">:</span> <span class="token number">2</span>,
	<span class="token string">"ok"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#删除索引</span>
db.user.dropIndex<span class="token punctuation">(</span><span class="token string">"age_1"</span><span class="token punctuation">)</span>
<span class="token comment">#或者，删除除了_id之外的索引</span>
db.user.dropIndexes<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#创建联合索引</span>
db.user.createIndex<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">'age'</span>:1, <span class="token string">'id'</span>:-1<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#查看索引大小，单位：字节</span>
db.user.totalIndexSize<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5、执行计划" tabindex="-1"><a class="header-anchor" href="#_3-5、执行计划" aria-hidden="true">#</a> 3.5、执行计划</h3>
<p>MongoDB 查询分析可以确保我们建议的索引是否有效，是查询语句性能分析的重要工具。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#插入1000条数据</span>
for<span class="token punctuation">(</span>var <span class="token assign-left variable">i</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">1000</span><span class="token punctuation">;</span>i++<span class="token punctuation">)</span>db.user.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>id:100+i,username:<span class="token string">'name_'</span>+i,age:10+i<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#查看执行计划</span>
<span class="token operator">></span> db.user.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age:<span class="token punctuation">{</span><span class="token variable">$gt</span>:100<span class="token punctuation">}</span>,id:<span class="token punctuation">{</span><span class="token variable">$lt</span>:200<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>.<span class="token function-name function">explain</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token string">"queryPlanner"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		<span class="token string">"plannerVersion"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>,
		<span class="token string">"namespace"</span> <span class="token builtin class-name">:</span> <span class="token string">"testdb.user"</span>,
		<span class="token string">"indexFilterSet"</span> <span class="token builtin class-name">:</span> false,
		<span class="token string">"parsedQuery"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
			<span class="token string">"<span class="token variable">$and</span>"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
				<span class="token punctuation">{</span>
					<span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
						<span class="token string">"<span class="token variable">$lt</span>"</span> <span class="token builtin class-name">:</span> <span class="token number">200</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>,
				<span class="token punctuation">{</span>
					<span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
						<span class="token string">"<span class="token variable">$gt</span>"</span> <span class="token builtin class-name">:</span> <span class="token number">100</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">]</span>
		<span class="token punctuation">}</span>,
		<span class="token string">"winningPlan"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>  <span class="token comment">#最佳执行计划</span>
			<span class="token string">"stage"</span> <span class="token builtin class-name">:</span> <span class="token string">"FETCH"</span>, <span class="token comment">#查询方式，常见的有COLLSCAN/全表扫描、IXSCAN/索引扫描、FETCH/根据索引去检索文档、SHARD_MERGE/合并分片结果、IDHACK/针对_id进行查询</span>
			<span class="token string">"inputStage"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
				<span class="token string">"stage"</span> <span class="token builtin class-name">:</span> <span class="token string">"IXSCAN"</span>,
				<span class="token string">"keyPattern"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
					<span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>,
					<span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token parameter variable">-1</span>
				<span class="token punctuation">}</span>,
				<span class="token string">"indexName"</span> <span class="token builtin class-name">:</span> <span class="token string">"age_1_id_-1"</span>,
				<span class="token string">"isMultiKey"</span> <span class="token builtin class-name">:</span> false,
				<span class="token string">"multiKeyPaths"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
					<span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">]</span>,
					<span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">]</span>
				<span class="token punctuation">}</span>,
				<span class="token string">"isUnique"</span> <span class="token builtin class-name">:</span> false,
				<span class="token string">"isSparse"</span> <span class="token builtin class-name">:</span> false,
				<span class="token string">"isPartial"</span> <span class="token builtin class-name">:</span> false,
				<span class="token string">"indexVersion"</span> <span class="token builtin class-name">:</span> <span class="token number">2</span>,
				<span class="token string">"direction"</span> <span class="token builtin class-name">:</span> <span class="token string">"forward"</span>,
				<span class="token string">"indexBounds"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
					<span class="token string">"age"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
						<span class="token string">"(100.0, inf.0]"</span>
					<span class="token punctuation">]</span>,
					<span class="token string">"id"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
						<span class="token string">"(200.0, -inf.0]"</span>
					<span class="token punctuation">]</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>,
		<span class="token string">"rejectedPlans"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">]</span>
	<span class="token punctuation">}</span>,
	<span class="token string">"serverInfo"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		<span class="token string">"host"</span> <span class="token builtin class-name">:</span> <span class="token string">"c493d5ff750a"</span>,
		<span class="token string">"port"</span> <span class="token builtin class-name">:</span> <span class="token number">27017</span>,
		<span class="token string">"version"</span> <span class="token builtin class-name">:</span> <span class="token string">"4.0.3"</span>,
		<span class="token string">"gitVersion"</span> <span class="token builtin class-name">:</span> <span class="token string">"7ea530946fa7880364d88c8d8b6026bbc9ffa48c"</span>
	<span class="token punctuation">}</span>,
	<span class="token string">"ok"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#测试没有使用索引</span>
<span class="token operator">></span> db.user.find<span class="token punctuation">(</span><span class="token punctuation">{</span>username:<span class="token string">'zhangsan'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>.<span class="token function-name function">explain</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token string">"queryPlanner"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		<span class="token string">"plannerVersion"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>,
		<span class="token string">"namespace"</span> <span class="token builtin class-name">:</span> <span class="token string">"testdb.user"</span>,
		<span class="token string">"indexFilterSet"</span> <span class="token builtin class-name">:</span> false,
		<span class="token string">"parsedQuery"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
			<span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
				<span class="token string">"<span class="token variable">$eq</span>"</span> <span class="token builtin class-name">:</span> <span class="token string">"zhangsan"</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>,
		<span class="token string">"winningPlan"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
			<span class="token string">"stage"</span> <span class="token builtin class-name">:</span> <span class="token string">"COLLSCAN"</span>,  <span class="token comment">#全表扫描</span>
			<span class="token string">"filter"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
				<span class="token string">"username"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
					<span class="token string">"<span class="token variable">$eq</span>"</span> <span class="token builtin class-name">:</span> <span class="token string">"zhangsan"</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>,
			<span class="token string">"direction"</span> <span class="token builtin class-name">:</span> <span class="token string">"forward"</span>
		<span class="token punctuation">}</span>,
		<span class="token string">"rejectedPlans"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">]</span>
	<span class="token punctuation">}</span>,
	<span class="token string">"serverInfo"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		<span class="token string">"host"</span> <span class="token builtin class-name">:</span> <span class="token string">"c493d5ff750a"</span>,
		<span class="token string">"port"</span> <span class="token builtin class-name">:</span> <span class="token number">27017</span>,
		<span class="token string">"version"</span> <span class="token builtin class-name">:</span> <span class="token string">"4.0.3"</span>,
		<span class="token string">"gitVersion"</span> <span class="token builtin class-name">:</span> <span class="token string">"7ea530946fa7880364d88c8d8b6026bbc9ffa48c"</span>
	<span class="token punctuation">}</span>,
	<span class="token string">"ok"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6、ui客户端工具" tabindex="-1"><a class="header-anchor" href="#_3-6、ui客户端工具" aria-hidden="true">#</a> 3.6、UI客户端工具</h3>
<p>Robo 3T是MongoDB的客户端工具，我们可以使用它来操作MongoDB。</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1544109001776.png" alt="1544109001776"></p>
<p>查看数据： <img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/1544109144162.png" alt="1544109144162"></p>
<p>或使用Navicat Premium 15：</p>
<p><img src="@source/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/assets/image-20201123162352921.png" alt="image-20201123162352921"></p>
<h2 id="_4、springboot整合mongodb" tabindex="-1"><a class="header-anchor" href="#_4、springboot整合mongodb" aria-hidden="true">#</a> 4、SpringBoot整合MongoDB</h2>
<p>spring-data对MongoDB做了支持，使用spring-data-mongodb可以简化MongoDB的操作。</p>
<p>地址：https://spring.io/projects/spring-data-mongodb</p>
<h3 id="_4-1、导入依赖" tabindex="-1"><a class="header-anchor" href="#_4-1、导入依赖" aria-hidden="true">#</a> 4.1、导入依赖</h3>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/POM/4.0.0<span class="token punctuation">"</span></span>
         <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
         <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">></span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.1.0.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.itcast.mongodb<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>itcast-mongodb<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-mongodb<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.18.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!-- java编译插件 --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.maven.plugins<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>maven-compiler-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>source</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>target</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>target</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoding</span><span class="token punctuation">></span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoding</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2、编写application-properties配置文件" tabindex="-1"><a class="header-anchor" href="#_4-2、编写application-properties配置文件" aria-hidden="true">#</a> 4.2、编写application.properties配置文件</h3>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment"># Spring boot application</span>
<span class="token key attr-name">spring.application.name</span> <span class="token punctuation">=</span> <span class="token value attr-value">itcast-mongodb</span>

<span class="token comment">#无认证信息的配置</span>
<span class="token comment">#spring.data.mongodb.uri=mongodb://192.168.31.81:27017/tanhua</span>

<span class="token comment">#springboot 配置</span>
<span class="token key attr-name">spring.data.mongodb.username</span><span class="token punctuation">=</span><span class="token value attr-value">tanhua</span>
<span class="token key attr-name">spring.data.mongodb.password</span><span class="token punctuation">=</span><span class="token value attr-value">l3SCjl0HvmSkTtiSbN0Swv40spYnHhDV</span>
<span class="token key attr-name">spring.data.mongodb.authentication-database</span><span class="token punctuation">=</span><span class="token value attr-value">admin</span>
<span class="token key attr-name">spring.data.mongodb.database</span><span class="token punctuation">=</span><span class="token value attr-value">tanhua</span>
<span class="token key attr-name">spring.data.mongodb.port</span><span class="token punctuation">=</span><span class="token value attr-value">27018</span>
<span class="token key attr-name">spring.data.mongodb.host</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.31.81</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3、编写实体" tabindex="-1"><a class="header-anchor" href="#_4-3、编写实体" aria-hidden="true">#</a> 4.3、编写实体</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>itcast<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>pojo</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">AllArgsConstructor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">NoArgsConstructor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>bson<span class="token punctuation">.</span>types<span class="token punctuation">.</span></span><span class="token class-name">ObjectId</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">ObjectId</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Address</span> address<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>itcast<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>pojo</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">AllArgsConstructor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">NoArgsConstructor</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Address</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> street<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> city<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> zip<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4、编写dao" tabindex="-1"><a class="header-anchor" href="#_4-4、编写dao" aria-hidden="true">#</a> 4.4、编写dao</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>itcast<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>dao</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cn<span class="token punctuation">.</span>itcast<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">Person</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>client<span class="token punctuation">.</span>result<span class="token punctuation">.</span></span><span class="token class-name">DeleteResult</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>client<span class="token punctuation">.</span>result<span class="token punctuation">.</span></span><span class="token class-name">UpdateResult</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">MongoTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>core<span class="token punctuation">.</span>query<span class="token punctuation">.</span></span><span class="token class-name">Criteria</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>core<span class="token punctuation">.</span>query<span class="token punctuation">.</span></span><span class="token class-name">Query</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>core<span class="token punctuation">.</span>query<span class="token punctuation">.</span></span><span class="token class-name">Update</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PersonDao</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MongoTemplate</span> mongoTemplate<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">savePerson</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>mongoTemplate<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> <span class="token function">queryPersonListByName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Query</span> query <span class="token operator">=</span> <span class="token class-name">Query</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mongoTemplate<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> <span class="token function">queryPersonPageList</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> page<span class="token punctuation">,</span> <span class="token class-name">Integer</span> rows<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Query</span> query <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span>rows<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span><span class="token punctuation">(</span>page <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> rows<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mongoTemplate<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">UpdateResult</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Query</span> query <span class="token operator">=</span> <span class="token class-name">Query</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Update</span> update <span class="token operator">=</span> <span class="token class-name">Update</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mongoTemplate<span class="token punctuation">.</span><span class="token function">updateFirst</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span> update<span class="token punctuation">,</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">DeleteResult</span> <span class="token function">deleteById</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Query</span> query <span class="token operator">=</span> <span class="token class-name">Query</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mongoTemplate<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5、编写启动类" tabindex="-1"><a class="header-anchor" href="#_4-5、编写启动类" aria-hidden="true">#</a> 4.5、编写启动类</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>itcast<span class="token punctuation">.</span>mongodb</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span></span><span class="token class-name">SpringApplication</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">SpringBootApplication</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MongoApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">MongoApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6、编写单元测试" tabindex="-1"><a class="header-anchor" href="#_4-6、编写单元测试" aria-hidden="true">#</a> 4.6、编写单元测试</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>itcast<span class="token punctuation">.</span>mongodb</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cn<span class="token punctuation">.</span>itcast<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>dao<span class="token punctuation">.</span></span><span class="token class-name">PersonDao</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cn<span class="token punctuation">.</span>itcast<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">Address</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cn<span class="token punctuation">.</span>itcast<span class="token punctuation">.</span>mongodb<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">Person</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>bson<span class="token punctuation">.</span>types<span class="token punctuation">.</span></span><span class="token class-name">ObjectId</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span></span><span class="token class-name">Test</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>runner<span class="token punctuation">.</span></span><span class="token class-name">RunWith</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>test<span class="token punctuation">.</span>context<span class="token punctuation">.</span></span><span class="token class-name">SpringBootTest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>test<span class="token punctuation">.</span>context<span class="token punctuation">.</span>junit4<span class="token punctuation">.</span></span><span class="token class-name">SpringRunner</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestPersonDao</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">PersonDao</span> personDao<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testSave</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">ObjectId</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"张三"</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span>
                <span class="token keyword">new</span> <span class="token class-name">Address</span><span class="token punctuation">(</span><span class="token string">"人民路"</span><span class="token punctuation">,</span> <span class="token string">"上海市"</span><span class="token punctuation">,</span> <span class="token string">"666666"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>personDao<span class="token punctuation">.</span><span class="token function">savePerson</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> personList <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>personDao<span class="token punctuation">.</span><span class="token function">queryPersonListByName</span><span class="token punctuation">(</span><span class="token string">"张三"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Person</span> person <span class="token operator">:</span> personList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testQuery2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> personList <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>personDao<span class="token punctuation">.</span><span class="token function">queryPersonPageList</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Person</span> person <span class="token operator">:</span> personList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        person<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ObjectId</span><span class="token punctuation">(</span><span class="token string">"5c0956ce235e192520086736"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        person<span class="token punctuation">.</span><span class="token function">setAge</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>personDao<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testDelete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>personDao<span class="token punctuation">.</span><span class="token function">deleteById</span><span class="token punctuation">(</span><span class="token string">"5c09ca05235e192d8887a389"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


