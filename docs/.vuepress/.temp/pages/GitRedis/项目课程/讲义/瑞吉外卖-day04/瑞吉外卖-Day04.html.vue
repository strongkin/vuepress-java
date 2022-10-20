<template><div><h1 id="瑞吉外卖-day04" tabindex="-1"><a class="header-anchor" href="#瑞吉外卖-day04" aria-hidden="true">#</a> 瑞吉外卖-Day04</h1>
<h2 id="课程内容" tabindex="-1"><a class="header-anchor" href="#课程内容" aria-hidden="true">#</a> 课程内容</h2>
<ul>
<li>文件上传下载</li>
<li>菜品新增</li>
<li>菜品分页查询</li>
<li>菜品修改</li>
</ul>
<h2 id="_1-文件上传下载" tabindex="-1"><a class="header-anchor" href="#_1-文件上传下载" aria-hidden="true">#</a> 1. 文件上传下载</h2>
<h3 id="_1-1-上传介绍" tabindex="-1"><a class="header-anchor" href="#_1-1-上传介绍" aria-hidden="true">#</a> 1.1 上传介绍</h3>
<h4 id="_1-1-1-概述" tabindex="-1"><a class="header-anchor" href="#_1-1-1-概述" aria-hidden="true">#</a> 1.1.1 概述</h4>
<p>文件上传，也称为upload，是指将本地图片、视频、音频等文件上传到服务器上，可以供其他用户浏览或下载的过程。文件上传在项目中应用非常广泛，我们经常发微博、发微信朋友圈都用到了文件上传功能。</p>
<img src="assets/image-20210803081955246.png" alt="image-20210803081955246" style="zoom:80%;" /> 
<p>文件上传时，对页面的form表单有如下要求：</p>
<table>
<thead>
<tr>
<th>表单属性</th>
<th>取值</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>method</td>
<td>post</td>
<td>必须选择post方式提交</td>
</tr>
<tr>
<td>enctype</td>
<td>multipart/form-data</td>
<td>采用multipart格式上传文件</td>
</tr>
<tr>
<td>type</td>
<td>file</td>
<td>使用input的file控件上传</td>
</tr>
</tbody>
</table>
<h4 id="_1-1-2-前端介绍" tabindex="-1"><a class="header-anchor" href="#_1-1-2-前端介绍" aria-hidden="true">#</a> 1.1.2 前端介绍</h4>
<p><strong>1). 简单html页面表单</strong></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>post<span class="token punctuation">"</span></span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/common/upload<span class="token punctuation">"</span></span> <span class="token attr-name">enctype</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>multipart/form-data<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>myFile<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span>  <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>提交<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). ElementUI中提供的upload上传组件</strong></p>
<p>目前一些前端组件库也提供了相应的上传组件，但是底层原理还是基于form表单的文件上传。</p>
<p><img src="assets/image-20210803084742416.png" alt="image-20210803084742416"></p>
<h4 id="_1-1-3-服务端介绍" tabindex="-1"><a class="header-anchor" href="#_1-1-3-服务端介绍" aria-hidden="true">#</a> 1.1.3 服务端介绍</h4>
<p>服务端要接收客户端页面上传的文件，通常都会使用Apache的两个组件：</p>
<ul>
<li>
<p>commons-fileupload</p>
</li>
<li>
<p>commons-io</p>
</li>
</ul>
<p>而Spring框架在spring-web包中对文件上传进行了封装，大大简化了服务端代码，我们只需要在Controller的方法中声明一个MultipartFile类型的参数即可接收上传的文件，例如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 文件上传
 * <span class="token keyword">@param</span> <span class="token parameter">file</span>
 * <span class="token keyword">@return</span>
 */</span>
<span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/upload"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">upload</span><span class="token punctuation">(</span><span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-下载介绍" tabindex="-1"><a class="header-anchor" href="#_1-2-下载介绍" aria-hidden="true">#</a> 1.2 下载介绍</h3>
<p>文件下载，也称为download，是指将文件从服务器传输到本地计算机的过程。通过浏览器进行文件下载，通常有两种表现形式：</p>
<p><strong>1). 以附件形式下载，弹出保存对话框，将文件保存到指定磁盘目录</strong></p>
<p><img src="assets/image-20210803123858691.png" alt="image-20210803123858691"></p>
<p><strong>2). 直接在浏览器中打开</strong></p>
<p>而我们在今天所需要实现的菜品展示，表现形式为在浏览器中直接打开。</p>
<p><img src="assets/image-20210803124220869.png" alt="image-20210803124220869"></p>
<p>通过浏览器进行文件下载，本质上就是服务端将文件以流的形式写回浏览器的过程。</p>
<h3 id="_1-3-上传代码实现" tabindex="-1"><a class="header-anchor" href="#_1-3-上传代码实现" aria-hidden="true">#</a> 1.3 上传代码实现</h3>
<h4 id="_1-3-1-前端代码" tabindex="-1"><a class="header-anchor" href="#_1-3-1-前端代码" aria-hidden="true">#</a> 1.3.1 前端代码</h4>
<p>文件上传，我们作为服务端工程师，主要关注服务端代码实现。对于前端页面，可以使用ElementUI提供的上传组件。可以直接使用资料中提供的上传页面，位置：资料/文件上传下载页面/upload.html，将其拷贝到项目的目录(resources/backend/page/demo)下，启动项目，访问上传页面。</p>
<p>http://localhost:8080/backend/page/demo/upload.html</p>
<img src="assets/image-20210803125619732.png" alt="image-20210803125619732" style="zoom:80%;" /> 
<p>在上述的浏览器抓取的网络请求中，上传文件的调用url，在哪里配置的呢，这个时候，我们需要去看一下前端上传组件。</p>
<img src="assets/image-20210803125942295.png" alt="image-20210803125942295" style="zoom:80%;" /> 
<p>虽然上述是ElementUI封装的代码，但是实际上最终还通过file域上传文件，如果未指定上传文件的参数名，默认为file。</p>
<img src="assets/image-20210803130455590.png" alt="image-20210803130455590" style="zoom:80%;" /> 
<h4 id="_1-3-2-服务端实现" tabindex="-1"><a class="header-anchor" href="#_1-3-2-服务端实现" aria-hidden="true">#</a> 1.3.2 服务端实现</h4>
<p><strong>1). application.yml</strong></p>
<p>需要在application.yml中定义文件存储路径</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">reggie</span><span class="token punctuation">:</span>
  <span class="token key atrule">path</span><span class="token punctuation">:</span> D<span class="token punctuation">:</span>\img\
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). CommonController</strong></p>
<p>编写文件上传的方法, 通过MultipartFile类型的参数即可接收上传的文件, 方法形参的名称需要与页面的file域的name属性一致。</p>
<p>所在包: com.itheima.reggie.controller</p>
<p>上传逻辑:</p>
<p>1). 获取文件的原始文件名, 通过原始文件名获取文件后缀</p>
<p>2). 通过UUID重新声明文件名, 文件名称重复造成文件覆盖</p>
<p>3). 创建文件存放目录</p>
<p>4). 将上传的临时文件转存到指定位置</p>
<p>代码实现:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>common<span class="token punctuation">.</span></span><span class="token class-name">R</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Value</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>multipart<span class="token punctuation">.</span></span><span class="token class-name">MultipartFile</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">File</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">UUID</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 文件上传和下载
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/common"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CommonController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${reggie.path}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> basePath<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 文件上传
     * <span class="token keyword">@param</span> <span class="token parameter">file</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/upload"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">upload</span><span class="token punctuation">(</span><span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//file是一个临时文件，需要转存到指定位置，否则本次请求完成后临时文件会删除</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
        <span class="token comment">//原始文件名</span>
        <span class="token class-name">String</span> originalFilename <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">getOriginalFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//abc.jpg</span>
        <span class="token class-name">String</span> suffix <span class="token operator">=</span> originalFilename<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>originalFilename<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//使用UUID重新生成文件名，防止文件名称重复造成文件覆盖</span>
        <span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> suffix<span class="token punctuation">;</span><span class="token comment">//dfsdfdfd.jpg</span>
		
        <span class="token comment">//创建一个目录对象</span>
        <span class="token class-name">File</span> dir <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>basePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//判断当前目录是否存在</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>dir<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//目录不存在，需要创建</span>
            dir<span class="token punctuation">.</span><span class="token function">mkdirs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
		
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">//将临时文件转存到指定位置</span>
            file<span class="token punctuation">.</span><span class="token function">transferTo</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>basePath <span class="token operator">+</span> fileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-3-测试" tabindex="-1"><a class="header-anchor" href="#_1-3-3-测试" aria-hidden="true">#</a> 1.3.3 测试</h4>
<p>代码编写完成之后，我们重新启动项目，访问上传页面 http://localhost:8080/backend/page/demo/upload.html，然后点击上传图片，选择图片上传时，会发现图片并不能正常的上传，而且在浏览器中可以抓取到响应的数据，从图中我们可以判断出需要登录才可以操作。</p>
<img src="assets/image-20210803232054156.png" alt="image-20210803232054156" style="zoom:80%;" /> 
<p>而这样的话，就要求我们在测试时，每一次都需要先登录，登录完成后在进行图片上传的测试，为了简化我们的测试，我们可以在 LoginCheckFilter 的doFilter方法中，在不需要处理的请求路径的数组中再加入请求路径 /common/** , 如下:</p>
<img src="assets/image-20210803232433983.png" alt="image-20210803232433983" style="zoom:80%;" /> 
<p>然后，我们在测试文件的上传功能时，就不需要登录就可以操作了。</p>
<p>我们在测试文件上传时，可以通过debug的形式来跟踪上传的整个过程，验证一下临时文件是否存在，以及上传完成之后，临时文件是否会自动删除。</p>
<p><img src="assets/image-20210805160234154.png" alt="image-20210805160234154"></p>
<h3 id="_1-4-下载代码实现" tabindex="-1"><a class="header-anchor" href="#_1-4-下载代码实现" aria-hidden="true">#</a> 1.4 下载代码实现</h3>
<h4 id="_1-4-1-前端代码" tabindex="-1"><a class="header-anchor" href="#_1-4-1-前端代码" aria-hidden="true">#</a> 1.4.1 前端代码</h4>
<p>文件下载，前端页面可以使用<img>标签展示下载的图片。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>imageUrl<span class="token punctuation">"</span></span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>imageUrl<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>avatar<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>img</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么，通过<img>标签如何展示图片数据呢，接下来我们来解析一下具体的流程：</p>
<p><img src="assets/image-20210803224818828.png" alt="image-20210803224818828"></p>
<p>在文件上传成功后，在 handleAvatarSuccess 方法中获取文件上传成功之后返回的数据(文件名)，然后调用 /common/download?name=xxx 进行文件的下载。在这里，我们想让上传的照片能够在页面展示出来，所以我们就需要在服务端将文件以流的形式写回浏览器。</p>
<h4 id="_1-4-2-服务端代码" tabindex="-1"><a class="header-anchor" href="#_1-4-2-服务端代码" aria-hidden="true">#</a> 1.4.2 服务端代码</h4>
<p>在 CommonController 中定义方法download，并接收页面传递的参数name，然后读取图片文件的数据，然后以流的形式写回浏览器。</p>
<p>具体逻辑如下：</p>
<p>1). 定义输入流，通过输入流读取文件内容</p>
<p>2). 通过response对象，获取到输出流</p>
<p>3). 通过response对象设置响应数据格式(image/jpeg)</p>
<p>4). 通过输入流读取文件数据，然后通过上述的输出流写回浏览器</p>
<p>5). 关闭资源</p>
<p>代码实现:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 文件下载
 * <span class="token keyword">@param</span> <span class="token parameter">name</span>
 * <span class="token keyword">@param</span> <span class="token parameter">response</span>
 */</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/download"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">download</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">//输入流，通过输入流读取文件内容</span>
        <span class="token class-name">FileInputStream</span> fileInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>basePath <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//输出流，通过输出流将文件写回浏览器</span>
        <span class="token class-name">ServletOutputStream</span> outputStream <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        response<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">"image/jpeg"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> len <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>len <span class="token operator">=</span> fileInputStream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            outputStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>
            outputStream<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//关闭资源</span>
        outputStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fileInputStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-4-3-测试" tabindex="-1"><a class="header-anchor" href="#_1-4-3-测试" aria-hidden="true">#</a> 1.4.3 测试</h4>
<p>访问页面 http://localhost:8080/backend/page/demo/upload.html , 点击上传图片 , 选择图片进行上传, 上传完毕之后, 查看图片是否可以展示出来。</p>
<img src="assets/image-20210803231134157.png" alt="image-20210803231134157"  /> 
<p>通过F12查询页面发起的请求及响应的数据：</p>
<p><img src="assets/image-20210803231302464.png" alt="image-20210803231302464"></p>
<h2 id="_2-菜品新增" tabindex="-1"><a class="header-anchor" href="#_2-菜品新增" aria-hidden="true">#</a> 2. 菜品新增</h2>
<h3 id="_2-1-需求分析" tabindex="-1"><a class="header-anchor" href="#_2-1-需求分析" aria-hidden="true">#</a> 2.1 需求分析</h3>
<p>后台系统中可以管理菜品信息，通过 新增功能来添加一个新的菜品，在添加菜品时需要选择当前菜品所属的菜品分类，并且需要上传菜品图片，在移动端会按照菜品分类来展示对应的菜品信息 。</p>
<p><img src="assets/image-20210803234122966.png" alt="image-20210803234122966"></p>
<h3 id="_2-2-数据模型" tabindex="-1"><a class="header-anchor" href="#_2-2-数据模型" aria-hidden="true">#</a> 2.2 数据模型</h3>
<img src="assets/image-20210803235329340.png" alt="image-20210803235329340" style="zoom:80%;" /> 
<p>新增菜品，其实就是将新增页面录入的菜品信息插入到dish表，如果添加了口味做法，还需要向dish_flavor表插入数据。所以在新增菜品时，涉及到两个表：</p>
<table>
<thead>
<tr>
<th>表结构</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>dish</td>
<td>菜品表</td>
</tr>
<tr>
<td>dish_flavor</td>
<td>菜品口味表</td>
</tr>
</tbody>
</table>
<p><strong>1). 菜品表:dish</strong></p>
<img src="assets/image-20210803235459347.png" alt="image-20210803235459347" style="zoom:80%;" /> 
<p><strong>2). 菜品口味表:dish_flavor</strong></p>
<img src="assets/image-20210803235749393.png" alt="image-20210803235749393" style="zoom:80%;" /> 
<h3 id="_2-3-准备工作" tabindex="-1"><a class="header-anchor" href="#_2-3-准备工作" aria-hidden="true">#</a> 2.3 准备工作</h3>
<p>在开发业务功能前，先将需要用到的类和接口基本结构创建好：</p>
<p><strong>1). 实体类 DishFlavor</strong></p>
<p>直接从课程资料中导入即可，Dish实体前面课程中已经导入过了</p>
<p>所属包: com.itheima.reggie.entity</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">FieldFill</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">TableField</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">Serializable</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">LocalDateTime</span></span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
菜品口味
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DishFlavor</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>
	
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token comment">//菜品id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> dishId<span class="token punctuation">;</span>

    <span class="token comment">//口味名称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">//口味数据list</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> value<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>fill <span class="token operator">=</span> <span class="token class-name">FieldFill</span><span class="token punctuation">.</span><span class="token constant">INSERT</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> createTime<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>fill <span class="token operator">=</span> <span class="token class-name">FieldFill</span><span class="token punctuation">.</span><span class="token constant">INSERT_UPDATE</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> updateTime<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>fill <span class="token operator">=</span> <span class="token class-name">FieldFill</span><span class="token punctuation">.</span><span class="token constant">INSERT</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> createUser<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>fill <span class="token operator">=</span> <span class="token class-name">FieldFill</span><span class="token punctuation">.</span><span class="token constant">INSERT_UPDATE</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> updateUser<span class="token punctuation">;</span>

    <span class="token comment">//是否删除</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> isDeleted<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2). Mapper接口DishFlavorMapper</strong></p>
<p>所属包: com.itheima.reggie.mapper</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">BaseMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">DishFlavor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span></span><span class="token class-name">Mapper</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">DishFlavorMapper</span> <span class="token keyword">extends</span> <span class="token class-name">BaseMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishFlavor</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3). 业务层接口 DishFlavorService</strong></p>
<p>所属包: com.itheima.reggie.service</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">IService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">DishFlavor</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">DishFlavorService</span> <span class="token keyword">extends</span> <span class="token class-name">IService</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishFlavor</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4). 业务层实现类 DishFlavorServiceImpl</strong></p>
<p>所属包: com.itheima.reggie.service.impl</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>service<span class="token punctuation">.</span>impl<span class="token punctuation">.</span></span><span class="token class-name">ServiceImpl</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">DishFlavor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">DishFlavorMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">DishFlavorService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DishFlavorServiceImpl</span> <span class="token keyword">extends</span> <span class="token class-name">ServiceImpl</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishFlavorMapper</span><span class="token punctuation">,</span><span class="token class-name">DishFlavor</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">DishFlavorService</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>5). 控制层 DishController</strong></p>
<p>菜品及菜品口味的相关操作，我们统一使用这一个controller即可。</p>
<p>所属包： com.itheima.reggie.controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">DishFlavorService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">DishService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * 菜品管理
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/dish"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DishController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">DishService</span> dishService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">DishFlavorService</span> dishFlavorService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-前端页面分析" tabindex="-1"><a class="header-anchor" href="#_2-4-前端页面分析" aria-hidden="true">#</a> 2.4 前端页面分析</h3>
<p>基本的准备工作我们已经做完了，那么接下来我们就需要来实现新增菜品功能，在开发代码之前，需要梳理一下新增菜品时前端页面和服务端的交互过程。</p>
<p>1). 点击新建菜品按钮, 访问页面(backend/page/food/add.html), 页面加载时发送ajax请求，请求服务端获取菜品分类数据并展示到下拉框中</p>
<p><img src="assets/image-20210804003343531.png" alt="image-20210804003343531"></p>
<p>2). 页面发送请求进行图片上传，请求服务端将图片保存到服务器(上传功能已实现)</p>
<p>3). 页面发送请求进行图片下载，将上传的图片进行回显(下载功能已实现)</p>
<img src="assets/image-20210804003752632.png" alt="image-20210804003752632" style="zoom:80%;" /> 
<p>4). 点击保存按钮，发送ajax请求，将菜品相关数据以json形式提交到服务端</p>
<p>页面代码:</p>
<img src="assets/image-20210804004529310.png" alt="image-20210804004529310" style="zoom:80%;" /> 
<p>浏览器抓取请求:</p>
<img src="assets/image-20210804005030527.png" alt="image-20210804005030527" style="zoom:80%;" /> 
<p>开发新增菜品功能，其实就是在服务端编写代码去处理前端页面发送的这4次请求(上传、下载已实现)即可。经过上述的分析，我们还需要在服务端实现两块功能：</p>
<p>A. 菜品分类数据列表查询, 具体请求信息整理如下 :</p>
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
<td>/category/list</td>
</tr>
<tr>
<td>请求参数</td>
<td>?type=1</td>
</tr>
</tbody>
</table>
<p>B. 保存菜品信息, 具体请求信息整理如下 :</p>
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
<td>/dish</td>
</tr>
<tr>
<td>请求参数</td>
<td>json格式</td>
</tr>
</tbody>
</table>
<p>下面呢,我们就需要根据这里分析的结果,分别来实现菜品分类列表的展示功能、保存菜品的功能 。</p>
<h3 id="_2-5-代码实现" tabindex="-1"><a class="header-anchor" href="#_2-5-代码实现" aria-hidden="true">#</a> 2.5 代码实现</h3>
<h4 id="_2-5-1-菜品分类查询" tabindex="-1"><a class="header-anchor" href="#_2-5-1-菜品分类查询" aria-hidden="true">#</a> 2.5.1 菜品分类查询</h4>
<p>在CategoryController中增加方法实现菜品分类查询，根据分类进行查询，并对查询的结果按照sort排序字段进行升序排序，如果sort相同，再按照修改时间倒序排序。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* 根据条件查询分类数据
* <span class="token keyword">@param</span> <span class="token parameter">category</span>
* <span class="token keyword">@return</span>
*/</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/list"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Category</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">Category</span> category<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//条件构造器</span>
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Category</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//添加条件</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>category<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">,</span><span class="token class-name">Category</span><span class="token operator">::</span><span class="token function">getType</span><span class="token punctuation">,</span>category<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//添加排序条件</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">orderByAsc</span><span class="token punctuation">(</span><span class="token class-name">Category</span><span class="token operator">::</span><span class="token function">getSort</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orderByDesc</span><span class="token punctuation">(</span><span class="token class-name">Category</span><span class="token operator">::</span><span class="token function">getUpdateTime</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Category</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> categoryService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码编写完毕之后，我们可以打开新增菜品页面，查看响应的数据，及页面下拉列表的渲染情况：</p>
<img src="assets/image-20210804180408584.png" alt="image-20210804180408584" style="zoom:80%;" /> 
<h4 id="_2-5-2-保存菜品信息" tabindex="-1"><a class="header-anchor" href="#_2-5-2-保存菜品信息" aria-hidden="true">#</a> 2.5.2 保存菜品信息</h4>
<p>在上述的分析中，我们可以看到在保存菜品时，页面传递过来的是json格式数据，格式如下：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span><span class="token string">"佛跳墙"</span><span class="token punctuation">,</span>
    <span class="token property">"price"</span><span class="token operator">:</span><span class="token number">88800</span><span class="token punctuation">,</span>
    <span class="token property">"code"</span><span class="token operator">:</span><span class="token string">""</span><span class="token punctuation">,</span>
    <span class="token property">"image"</span><span class="token operator">:</span><span class="token string">"da9e1c70-fc32-4781-9510-a1c4ccd2ff59.jpg"</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span><span class="token string">"佛跳墙"</span><span class="token punctuation">,</span>
    <span class="token property">"status"</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"categoryId"</span><span class="token operator">:</span><span class="token string">"1397844357980663809"</span><span class="token punctuation">,</span>
    <span class="token property">"flavors"</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"name"</span><span class="token operator">:</span><span class="token string">"辣度"</span><span class="token punctuation">,</span>
            <span class="token property">"value"</span><span class="token operator">:</span><span class="token string">"[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]"</span><span class="token punctuation">,</span>
            <span class="token property">"showOption"</span><span class="token operator">:</span><span class="token boolean">false</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"name"</span><span class="token operator">:</span><span class="token string">"忌口"</span><span class="token punctuation">,</span>
            <span class="token property">"value"</span><span class="token operator">:</span><span class="token string">"[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]"</span><span class="token punctuation">,</span>
            <span class="token property">"showOption"</span><span class="token operator">:</span><span class="token boolean">false</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在服务端我们应该如何来封装前端传递的数据呢，我们发现，如果使用菜品类Dish来封装，只能封装菜品的基本属性，flavors属性是无法封装的。那么这个时候，我们应该如何处理呢?</p>
<p>这个时候，我们需要自定义一个实体类，然后继承自 Dish，并对Dish的属性进行拓展，增加 flavors 集合属性(内部封装DishFlavor)。清楚了这一点之后,接下来就进行功能开发。</p>
<p><strong>1). 导入 DishDto 实体类</strong></p>
<p>封装页面传递的请求参数。</p>
<p>所属包: com.itheima.reggie.dto</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">Dish</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>itheima<span class="token punctuation">.</span>reggie<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">DishFlavor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DishDto</span> <span class="token keyword">extends</span> <span class="token class-name">Dish</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishFlavor</span><span class="token punctuation">></span></span> flavors <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
    <span class="token keyword">private</span> <span class="token class-name">String</span> categoryName<span class="token punctuation">;</span>
	
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> copies<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><font color='red'>拓展： 我们在做项目时，经常会涉及到各种类型的实体模型。基本包含以下几种</font> <table>
<thead>
<tr>
<th>实体模型</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>DTO</td>
<td>Data Transfer Object(数据传输对象)，一般用于展示层与服务层之间的数据传输。</td>
</tr>
<tr>
<td>Entity</td>
<td>最常用实体类，基本和数据表一一对应，一个实体类对应一张表。</td>
</tr>
<tr>
<td>VO</td>
<td>Value Object(值对象), 主要用于封装前端页面展示的数据对象，用一个VO对象来封装整个页面展示所需要的对象数据</td>
</tr>
<tr>
<td>PO</td>
<td>Persistant Object(持久层对象), 是ORM(Objevt Relational Mapping)框架中Entity，PO属性和数据库中表的字段形成一一对应关系</td>
</tr>
</tbody>
</table>
<p><strong>2). DishController定义方法新增菜品</strong></p>
<p>在该Controller的方法中，不仅需要保存菜品的基本信息，还需要保存菜品的口味信息，需要操作两张表，所以我们需要在DishService接口中定义接口方法，在这个方法中需要保存上述的两部分数据。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 新增菜品
 * <span class="token keyword">@param</span> <span class="token parameter">dishDto</span>
 * <span class="token keyword">@return</span>
 */</span>
<span class="token annotation punctuation">@PostMapping</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">DishDto</span> dishDto<span class="token punctuation">)</span><span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>dishDto<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    dishService<span class="token punctuation">.</span><span class="token function">saveWithFlavor</span><span class="token punctuation">(</span>dishDto<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">"新增菜品成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3). DishService中增加方法saveWithFlavor</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//新增菜品，同时插入菜品对应的口味数据，需要操作两张表：dish、dish_flavor</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveWithFlavor</span><span class="token punctuation">(</span><span class="token class-name">DishDto</span> dishDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4). DishServiceImpl中实现方法saveWithFlavor</strong></p>
<p>页面传递的菜品口味信息，仅仅包含name 和 value属性，缺少一个非常重要的属性dishId， 所以在保存完菜品的基本信息后，我们需要获取到菜品ID，然后为菜品口味对象属性dishId赋值。</p>
<p>具体逻辑如下：</p>
<p>①. 保存菜品基本信息 ;</p>
<p>②. 获取保存的菜品ID ;</p>
<p>③. 获取菜品口味列表，遍历列表，为菜品口味对象属性dishId赋值;</p>
<p>④. 批量保存菜品口味列表;</p>
<p>代码实现如下:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">DishFlavorService</span> dishFlavorService<span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
* 新增菜品，同时保存对应的口味数据
* <span class="token keyword">@param</span> <span class="token parameter">dishDto</span>
*/</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveWithFlavor</span><span class="token punctuation">(</span><span class="token class-name">DishDto</span> dishDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//保存菜品的基本信息到菜品表dish</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>dishDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
	
    <span class="token class-name">Long</span> dishId <span class="token operator">=</span> dishDto<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//菜品id</span>
    <span class="token comment">//菜品口味</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishFlavor</span><span class="token punctuation">></span></span> flavors <span class="token operator">=</span> dishDto<span class="token punctuation">.</span><span class="token function">getFlavors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    flavors <span class="token operator">=</span> flavors<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">setDishId</span><span class="token punctuation">(</span>dishId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> item<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//保存菜品口味数据到菜品口味表dish_flavor</span>
    dishFlavorService<span class="token punctuation">.</span><span class="token function">saveBatch</span><span class="token punctuation">(</span>flavors<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>说明:</p>
<p>​	由于在 saveWithFlavor 方法中，进行了两次数据库的保存操作，操作了两张表，那么为了保证数据的一致性，我们需要在方法上加上注解 @Transactional来控制事务。</p>
</blockquote>
<p><strong>5). 在引导类上加注解 @EnableTransactionManagement</strong></p>
<p>Service层方法上加的注解@Transactional要想生效，需要在引导类上加上注解 @EnableTransactionManagement， 开启对事务的支持。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@ServletComponentScan</span>
<span class="token annotation punctuation">@EnableTransactionManagement</span> <span class="token comment">//开启对事物管理的支持</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReggieApplication</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ReggieApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"项目启动成功..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-功能测试" tabindex="-1"><a class="header-anchor" href="#_2-6-功能测试" aria-hidden="true">#</a> 2.6 功能测试</h3>
<p>代码编写完毕之后，我们重新启动服务，访问项目，然后登陆到系统中，进行菜品的新增测试，在测试时，我们可以通过debug断点跟踪的形式，查看我们传输的数据，及数据的封装。</p>
<img src="assets/image-20210804174956706.png" alt="image-20210804174956706" style="zoom:80%;" /> 
<p>debug跟踪数据的封装情况:</p>
<p><img src="assets/image-20210804175034622.png" alt="image-20210804175034622"></p>
<p>然后在测试完毕后, 我们可以检查一下数据库中的数据保存情况:</p>
<p><img src="assets/image-20210804175658010.png" alt="image-20210804175658010"></p>
<h2 id="_3-菜品分页查询" tabindex="-1"><a class="header-anchor" href="#_3-菜品分页查询" aria-hidden="true">#</a> 3. 菜品分页查询</h2>
<h3 id="_3-1-需求分析" tabindex="-1"><a class="header-anchor" href="#_3-1-需求分析" aria-hidden="true">#</a> 3.1 需求分析</h3>
<p>系统中的菜品数据很多的时候，如果在一个页面中全部展示出来会显得比较乱，不便于查看，所以一般的系统中都会以分页的方式来展示列表数据。</p>
<img src="assets/image-20210804223703893.png" alt="image-20210804223703893" style="zoom:80%;" /> 
<p>在菜品列表展示时，除了菜品的基本信息(名称、售价、售卖状态、更新时间)外，还有两个字段略微特殊，第一个是图片字段 ，我们从数据库查询出来的仅仅是图片的名字，图片要想在表格中回显展示出来，就需要下载这个图片。第二个是菜品分类，这里展示的是分类名称，而不是分类ID，此时我们就需要根据菜品的分类ID，去分类表中查询分类信息，然后在页面展示。</p>
<h3 id="_3-2-前端页面分析" tabindex="-1"><a class="header-anchor" href="#_3-2-前端页面分析" aria-hidden="true">#</a> 3.2 前端页面分析</h3>
<p>在开发代码之前，需要梳理一下菜品分页查询时前端页面和服务端的交互过程：</p>
<p>1). 访问页面(backend/page/food/list.html)时，发送ajax请求，将分页查询参数(page、pageSize、name)提交到服务端，获取分页数据</p>
<p>2). 页面发送请求，请求服务端进行图片下载，用于页面图片展示</p>
<p><img src="assets/image-20210804224842336.png" alt="image-20210804224842336"></p>
<img src="assets/image-20210804225259854.png" alt="image-20210804225259854" style="zoom:94%;" /> 
<p>开发菜品信息分页查询功能，其实就是在服务端编写代码去处理前端页面发送的这2次请求即可，而前端发起的请求中， 图片文件下载回显的代码，我们已经实现了。所以，我们只需要开发分页查询的功能即可，分页查询具体的请求信息如下：</p>
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
<td>/dish/page</td>
</tr>
<tr>
<td>请求参数</td>
<td>?page=1&amp;pageSize=10&amp;name=xxx</td>
</tr>
</tbody>
</table>
<h3 id="_3-3-代码实现" tabindex="-1"><a class="header-anchor" href="#_3-3-代码实现" aria-hidden="true">#</a> 3.3 代码实现</h3>
<h4 id="_3-3-1-分析" tabindex="-1"><a class="header-anchor" href="#_3-3-1-分析" aria-hidden="true">#</a> 3.3.1 分析</h4>
<p>上述我们已经分析了分页查询的请求信息，那么接下来，我们就需要在 DishController中开发方法，来完成菜品的条件分页查询，在分页查询时还需要给页面返回分类的名称，而分类的名称前端在接收的时候是通过 categoryName 属性获取的，那么对应的服务端也应该封装到 categoryName 属性中。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-table-column</span> <span class="token attr-name">prop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>categoryName<span class="token punctuation">"</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>菜品分类<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-table-column</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而在我们的实体类 Dish 中，仅仅包含 categoryId， 不包含 categoryName，那么我们应该如何封装查询的数据呢？ 其实，这里我们可以返回DishDto对象，在该对象中我们可以拓展一个属性 categoryName，来封装菜品分类名称。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DishDto</span> <span class="token keyword">extends</span> <span class="token class-name">Dish</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishFlavor</span><span class="token punctuation">></span></span> flavors <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> categoryName<span class="token punctuation">;</span> <span class="token comment">//菜品分类名称</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> copies<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体逻辑为：</p>
<p>1). 构造分页条件对象</p>
<p>2). 构建查询及排序条件</p>
<p>3). 执行分页条件查询</p>
<p>4). 遍历分页查询列表数据，根据分类ID查询分类信息，从而获取该菜品的分类名称</p>
<p>5). 封装数据并返回</p>
<h4 id="_3-3-2-实现" tabindex="-1"><a class="header-anchor" href="#_3-3-2-实现" aria-hidden="true">#</a> 3.3.2 实现</h4>
<p>分析了具体的实现思路之后，接下来就来完成具体的代码实现。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 菜品信息分页查询
 * <span class="token keyword">@param</span> <span class="token parameter">page</span>
 * <span class="token keyword">@param</span> <span class="token parameter">pageSize</span>
 * <span class="token keyword">@param</span> <span class="token parameter">name</span>
 * <span class="token keyword">@return</span>
 */</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/page"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Page</span><span class="token punctuation">></span></span> <span class="token function">page</span><span class="token punctuation">(</span><span class="token keyword">int</span> page<span class="token punctuation">,</span><span class="token keyword">int</span> pageSize<span class="token punctuation">,</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//构造分页构造器对象</span>
    <span class="token class-name">Page</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Dish</span><span class="token punctuation">></span></span> pageInfo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Page</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>page<span class="token punctuation">,</span>pageSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Page</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishDto</span><span class="token punctuation">></span></span> dishDtoPage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Page</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//条件构造器</span>
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Dish</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//添加过滤条件</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">like</span><span class="token punctuation">(</span>name <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">,</span><span class="token class-name">Dish</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//添加排序条件</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">orderByDesc</span><span class="token punctuation">(</span><span class="token class-name">Dish</span><span class="token operator">::</span><span class="token function">getUpdateTime</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//执行分页查询</span>
    dishService<span class="token punctuation">.</span><span class="token function">page</span><span class="token punctuation">(</span>pageInfo<span class="token punctuation">,</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//对象拷贝</span>
    <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>pageInfo<span class="token punctuation">,</span>dishDtoPage<span class="token punctuation">,</span><span class="token string">"records"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Dish</span><span class="token punctuation">></span></span> records <span class="token operator">=</span> pageInfo<span class="token punctuation">.</span><span class="token function">getRecords</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishDto</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> records<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
        
        <span class="token class-name">DishDto</span> dishDto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DishDto</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span>dishDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Long</span> categoryId <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">getCategoryId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//分类id</span>
        <span class="token comment">//根据id查询分类对象</span>
        <span class="token class-name">Category</span> category <span class="token operator">=</span> categoryService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>categoryId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token keyword">if</span><span class="token punctuation">(</span>category <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">String</span> categoryName <span class="token operator">=</span> category<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            dishDto<span class="token punctuation">.</span><span class="token function">setCategoryName</span><span class="token punctuation">(</span>categoryName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dishDto<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dishDtoPage<span class="token punctuation">.</span><span class="token function">setRecords</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>dishDtoPage<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>数据库查询菜品信息时，获取到的分页查询结果 Page 的泛型为 Dish，而我们最终需要给前端页面返回的类型为 DishDto，所以这个时候就要进行转换，基本属性我们可以直接通过属性拷贝的形式对Page中的属性进行复制，而对于结果列表 records属性，我们是需要进行特殊处理的(需要封装菜品分类名称);</p>
</blockquote>
<h3 id="_3-4-功能测试" tabindex="-1"><a class="header-anchor" href="#_3-4-功能测试" aria-hidden="true">#</a> 3.4 功能测试</h3>
<p>代码编写完毕之后，我们重新启动服务，访问项目，可以通过debug端点的形式跟踪，整个分页查询过程中，数据的转换和封装。</p>
<p>在测试的过程中，我们发现有一些菜品图片并没有展示出来，如下：</p>
<p><img src="assets/image-20210805100944028.png" alt="image-20210805100944028"></p>
<p>这是因为我们在导入sql脚本时，导入了一部分菜品的数据，而菜品的图片在我们的磁盘目录中并不存在，所以才会出现图片展示不出来的情况，而我们后续自己添加的菜品信息是没有问题的。</p>
<h2 id="_4-菜品修改" tabindex="-1"><a class="header-anchor" href="#_4-菜品修改" aria-hidden="true">#</a> 4. 菜品修改</h2>
<h3 id="_4-1-需求分析" tabindex="-1"><a class="header-anchor" href="#_4-1-需求分析" aria-hidden="true">#</a> 4.1 需求分析</h3>
<p>在菜品管理列表页面点击修改按钮，跳转到修改菜品页面，在修改页面回显菜品相关信息并进行修改，最后点击确定按钮完成修改操作。</p>
<img src="assets/image-20210804232447587.png" alt="image-20210804232447587" style="zoom:80%;" /> 
<h3 id="_4-2-前端页面分析" tabindex="-1"><a class="header-anchor" href="#_4-2-前端页面分析" aria-hidden="true">#</a> 4.2 前端页面分析</h3>
<p>在开发代码之前，需要梳理一下修改菜品时前端页面（add.html）和服务端的交互过程：</p>
<p>1). 点击菜品列表的中的修改按钮，携带菜品id跳转至add.html</p>
<img src="assets/image-20210804233459252.png" alt="image-20210804233459252" style="zoom:80%;" /> 
<p>2). 进入add.html，页面发送ajax请求，请求服务端获取分类数据，用于菜品分类下拉框中数据展示(<strong>已实现</strong>)</p>
<p>3). add.html获取id, 发送ajax请求，请求服务端，根据id查询当前菜品信息，用于菜品信息回显</p>
<img src="assets/image-20210804234104633.png" alt="image-20210804234104633" style="zoom:80%;" /> 
<p>4). 页面发送请求，请求服务端进行图片下载，用于页图片回显(<strong>已实现</strong>)</p>
<p><img src="assets/image-20210804234226201.png" alt="image-20210804234226201"></p>
<p>5). 点击保存按钮，页面发送ajax请求，将修改后的菜品相关数据以json形式提交到服务端</p>
<img src="assets/image-20210804234442923.png" alt="image-20210804234442923" style="zoom:80%;" /> 
<p>经过上述的分析，我们发现，菜品分类下拉框的展示、图片的下载回显功能我们都已经实现了。我们只需要在这里实现两个功能即可，分别是：</p>
<p><strong>1). 根据ID查询菜品及菜品口味信息</strong></p>
<p>具体请求信息如下：</p>
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
<td>/dish/{id}</td>
</tr>
</tbody>
</table>
<p><strong>2). 修改菜品及菜品口味信息</strong></p>
<p>具体请求信息如下：</p>
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
<td>PUT</td>
</tr>
<tr>
<td>请求路径</td>
<td>/dish</td>
</tr>
<tr>
<td>请求参数</td>
<td>json格式数据</td>
</tr>
</tbody>
</table>
<p>具体的json格式数据，我们可以通过浏览器抓取：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"id"</span><span class="token operator">:</span><span class="token string">"1422783914845487106"</span><span class="token punctuation">,</span>
    <span class="token property">"name"</span><span class="token operator">:</span><span class="token string">"佛跳墙"</span><span class="token punctuation">,</span>
    <span class="token property">"categoryId"</span><span class="token operator">:</span><span class="token string">"1397844357980663809"</span><span class="token punctuation">,</span>
    <span class="token property">"price"</span><span class="token operator">:</span><span class="token number">88800</span><span class="token punctuation">,</span>
    <span class="token property">"code"</span><span class="token operator">:</span><span class="token string">""</span><span class="token punctuation">,</span>
    <span class="token property">"image"</span><span class="token operator">:</span><span class="token string">"da9e1c70-fc32-4781-9510-a1c4ccd2ff59.jpg"</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span><span class="token string">"佛跳墙"</span><span class="token punctuation">,</span>
    <span class="token property">"status"</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"sort"</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"createTime"</span><span class="token operator">:</span><span class="token string">"2021-08-04 12:58:14"</span><span class="token punctuation">,</span>
    <span class="token property">"createUser"</span><span class="token operator">:</span><span class="token string">"1412578435737350122"</span><span class="token punctuation">,</span>
    <span class="token property">"updateUser"</span><span class="token operator">:</span><span class="token string">"1412578435737350122"</span><span class="token punctuation">,</span>
    <span class="token property">"flavors"</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"id"</span><span class="token operator">:</span><span class="token string">"1422783914883235842"</span><span class="token punctuation">,</span>
            <span class="token property">"dishId"</span><span class="token operator">:</span><span class="token string">"1422783914845487106"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span><span class="token string">"辣度"</span><span class="token punctuation">,</span>
            <span class="token property">"value"</span><span class="token operator">:</span><span class="token string">"[\"不辣\",\"微辣\",\"中辣\",\"重辣\"]"</span><span class="token punctuation">,</span>
            <span class="token property">"createTime"</span><span class="token operator">:</span><span class="token string">"2021-08-04 12:58:14"</span><span class="token punctuation">,</span>
            <span class="token property">"updateTime"</span><span class="token operator">:</span><span class="token string">"2021-08-04 12:58:14"</span><span class="token punctuation">,</span>
            <span class="token property">"createUser"</span><span class="token operator">:</span><span class="token string">"1412578435737350122"</span><span class="token punctuation">,</span>
            <span class="token property">"updateUser"</span><span class="token operator">:</span><span class="token string">"1412578435737350122"</span><span class="token punctuation">,</span>
            <span class="token property">"isDeleted"</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"showOption"</span><span class="token operator">:</span><span class="token boolean">false</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"id"</span><span class="token operator">:</span><span class="token string">"1422783914895818754"</span><span class="token punctuation">,</span>
            <span class="token property">"dishId"</span><span class="token operator">:</span><span class="token string">"1422783914845487106"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span><span class="token string">"忌口"</span><span class="token punctuation">,</span>
            <span class="token property">"value"</span><span class="token operator">:</span><span class="token string">"[\"不要葱\",\"不要蒜\",\"不要香菜\",\"不要辣\"]"</span><span class="token punctuation">,</span>
            <span class="token property">"createTime"</span><span class="token operator">:</span><span class="token string">"2021-08-04 12:58:14"</span><span class="token punctuation">,</span>
            <span class="token property">"updateTime"</span><span class="token operator">:</span><span class="token string">"2021-08-04 12:58:14"</span><span class="token punctuation">,</span>
            <span class="token property">"createUser"</span><span class="token operator">:</span><span class="token string">"1412578435737350122"</span><span class="token punctuation">,</span>
            <span class="token property">"updateUser"</span><span class="token operator">:</span><span class="token string">"1412578435737350122"</span><span class="token punctuation">,</span>
            <span class="token property">"isDeleted"</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"showOption"</span><span class="token operator">:</span><span class="token boolean">false</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-功能实现" tabindex="-1"><a class="header-anchor" href="#_4-3-功能实现" aria-hidden="true">#</a> 4.3 功能实现</h3>
<h4 id="_4-3-1-根据id查询菜品信息" tabindex="-1"><a class="header-anchor" href="#_4-3-1-根据id查询菜品信息" aria-hidden="true">#</a> 4.3.1 根据ID查询菜品信息</h4>
<h5 id="_4-3-1-1-代码实现" tabindex="-1"><a class="header-anchor" href="#_4-3-1-1-代码实现" aria-hidden="true">#</a> 4.3.1.1 代码实现</h5>
<p>页面发送ajax请求，请求服务端，根据id查询当前菜品信息和对应的口味信息，用于修改页面中菜品信息回显。</p>
<p>1). 在DishService接口中扩展getByIdWithFlavor方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//根据id查询菜品信息和对应的口味信息</span>
<span class="token keyword">public</span> <span class="token class-name">DishDto</span> <span class="token function">getByIdWithFlavor</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2). 在DishService实现类中实现此方法</p>
<p>具体逻辑为:</p>
<p>A. 根据ID查询菜品的基本信息</p>
<p>B. 根据菜品的ID查询菜品口味列表数据</p>
<p>C. 组装数据并返回</p>
<p>代码实现:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* 根据id查询菜品信息和对应的口味信息
* <span class="token keyword">@param</span> <span class="token parameter">id</span>
* <span class="token keyword">@return</span>
*/</span>
<span class="token keyword">public</span> <span class="token class-name">DishDto</span> <span class="token function">getByIdWithFlavor</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//查询菜品基本信息，从dish表查询</span>
    <span class="token class-name">Dish</span> dish <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
	
    <span class="token class-name">DishDto</span> dishDto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DishDto</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>dish<span class="token punctuation">,</span>dishDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
	
    <span class="token comment">//查询当前菜品对应的口味信息，从dish_flavor表查询</span>
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishFlavor</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">DishFlavor</span><span class="token operator">::</span><span class="token function">getDishId</span><span class="token punctuation">,</span>dish<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishFlavor</span><span class="token punctuation">></span></span> flavors <span class="token operator">=</span> dishFlavorService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
    dishDto<span class="token punctuation">.</span><span class="token function">setFlavors</span><span class="token punctuation">(</span>flavors<span class="token punctuation">)</span><span class="token punctuation">;</span>
	
    <span class="token keyword">return</span> dishDto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3). 在DishController中创建get方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* 根据id查询菜品信息和对应的口味信息
* <span class="token keyword">@param</span> <span class="token parameter">id</span>
* <span class="token keyword">@return</span>
*/</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/{id}"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishDto</span><span class="token punctuation">></span></span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">DishDto</span> dishDto <span class="token operator">=</span> dishService<span class="token punctuation">.</span><span class="token function">getByIdWithFlavor</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>dishDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>@PathVariable : 该注解可以用来提取url路径中传递的请求参数。</p>
</blockquote>
<h5 id="_4-3-1-2-功能测试" tabindex="-1"><a class="header-anchor" href="#_4-3-1-2-功能测试" aria-hidden="true">#</a> 4.3.1.2 功能测试</h5>
<p>编写完代码后，重启服务进行测试，点击列表的修改按钮，查询数据回显情况。</p>
<p><img src="assets/image-20210805101812209.png" alt="image-20210805101812209"></p>
<h4 id="_4-3-2-修改菜品信息" tabindex="-1"><a class="header-anchor" href="#_4-3-2-修改菜品信息" aria-hidden="true">#</a> 4.3.2 修改菜品信息</h4>
<h5 id="_4-3-2-1-代码实现" tabindex="-1"><a class="header-anchor" href="#_4-3-2-1-代码实现" aria-hidden="true">#</a> 4.3.2.1 代码实现</h5>
<p>点击保存按钮，页面发送ajax请求，将修改后的菜品相关数据以json形式提交到服务端。在修改菜品信息时需要注意，除了要更新dish菜品表，还需要更新dish_flavor菜品口味表。</p>
<p>1). 在DishService接口中扩展方法updateWithFlavor</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//更新菜品信息，同时更新对应的口味信息</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateWithFlavor</span><span class="token punctuation">(</span><span class="token class-name">DishDto</span> dishDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2). 在DishServiceImpl中实现方法updateWithFlavor</p>
<p>在该方法中，我们既需要更新dish菜品基本信息表，还需要更新dish_flavor菜品口味表。而页面再操作时，关于菜品的口味，有修改，有新增，也有可能删除，我们应该如何更新菜品口味信息呢，其实，无论菜品口味信息如何变化，我们只需要保持一个原则： 先删除，后添加。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateWithFlavor</span><span class="token punctuation">(</span><span class="token class-name">DishDto</span> dishDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//更新dish表基本信息</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">updateById</span><span class="token punctuation">(</span>dishDto<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//清理当前菜品对应口味数据---dish_flavor表的delete操作</span>
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishFlavor</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">DishFlavor</span><span class="token operator">::</span><span class="token function">getDishId</span><span class="token punctuation">,</span>dishDto<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    dishFlavorService<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//添加当前提交过来的口味数据---dish_flavor表的insert操作</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DishFlavor</span><span class="token punctuation">></span></span> flavors <span class="token operator">=</span> dishDto<span class="token punctuation">.</span><span class="token function">getFlavors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    flavors <span class="token operator">=</span> flavors<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span><span class="token function">setDishId</span><span class="token punctuation">(</span>dishDto<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> item<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    dishFlavorService<span class="token punctuation">.</span><span class="token function">saveBatch</span><span class="token punctuation">(</span>flavors<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3). 在DishController中创建update方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
* 修改菜品
* <span class="token keyword">@param</span> <span class="token parameter">dishDto</span>
* <span class="token keyword">@return</span>
*/</span>
<span class="token annotation punctuation">@PutMapping</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">DishDto</span> dishDto<span class="token punctuation">)</span><span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>dishDto<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dishService<span class="token punctuation">.</span><span class="token function">updateWithFlavor</span><span class="token punctuation">(</span>dishDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">"修改菜品成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_4-3-2-2-功能测试" tabindex="-1"><a class="header-anchor" href="#_4-3-2-2-功能测试" aria-hidden="true">#</a> 4.3.2.2 功能测试</h5>
<p>代码编写完成之后，重启服务，然后按照前面分析的操作流程进行测试，查看数据是否正常修改即可。</p>
</div></template>


