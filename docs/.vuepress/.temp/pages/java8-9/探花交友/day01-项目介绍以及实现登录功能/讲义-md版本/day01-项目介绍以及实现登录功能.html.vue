<template><div><h2 id="课程介绍-《探花交友》" tabindex="-1"><a class="header-anchor" href="#课程介绍-《探花交友》" aria-hidden="true">#</a> 课程介绍  《探花交友》</h2>
<ul>
<li>功能介绍</li>
<li>项目介绍</li>
<li>工程搭建</li>
<li>短信验证码</li>
<li>实现用户登录功能</li>
</ul>
<h2 id="_1、功能介绍" tabindex="-1"><a class="header-anchor" href="#_1、功能介绍" aria-hidden="true">#</a> 1、功能介绍</h2>
<p>探花交友是一个陌生人的在线交友平台，在该平台中可以搜索附近的人，查看好友动态，平台还会通过大数据计算进行智能推荐，通过智能推荐可以找到更加匹配的好友，这样才能增进用户对产品的喜爱度。探花平台还提供了在线即时通讯功能，可以实时的与好友进行沟通，让沟通随时随地的进行。</p>
<h3 id="_1-1、功能列表" tabindex="-1"><a class="header-anchor" href="#_1-1、功能列表" aria-hidden="true">#</a> 1.1、功能列表</h3>
<table>
<thead>
<tr>
<th>功能</th>
<th>说明</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>注册、登录</td>
<td>用户无需单独注册，直接通过手机号登录即可</td>
<td>首次登录成功后需要完善个人信息</td>
</tr>
<tr>
<td>交友</td>
<td>主要功能有：测灵魂、桃花传音、搜附近、探花等</td>
<td></td>
</tr>
<tr>
<td>圈子</td>
<td>类似微信朋友圈，用户可以发动态、查看好友动态等</td>
<td></td>
</tr>
<tr>
<td>消息</td>
<td>通知类消息 + 即时通讯消息</td>
<td></td>
</tr>
<tr>
<td>小视频</td>
<td>类似抖音，用户可以发小视频，评论等</td>
<td>显示小视频列表需要进行推荐算法计算后进行展现。</td>
</tr>
<tr>
<td>我的</td>
<td>我的动态、关注数、粉丝数、通用设置等</td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="_1-2、注册登录" tabindex="-1"><a class="header-anchor" href="#_1-2、注册登录" aria-hidden="true">#</a> 1.2、注册登录</h3>
<p>业务说明：</p>
<p>用户通过手机验证码进行登录，如果是第一次登录则需要完善个人信息，在上传图片时，需要对上传的图片做人像的校验，防止用户上传非人像的图片作为头像。流程完成后，则登录成功。</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563681330146.png" alt="1563681330146"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563681348382.png" alt="1563681348382"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563681365123.png" alt="1563681365123"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563681382592.png" alt="1563681382592"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563681397466.png" alt="1563681397466"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563681412881.png" alt="1563681412881"></p>
<h3 id="_1-3、交友" tabindex="-1"><a class="header-anchor" href="#_1-3、交友" aria-hidden="true">#</a> 1.3、交友</h3>
<p>交友是探花项目的核心功能之一，用户可以查看好友，添加好友，搜索好友等操作。</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563698504256.png" alt="1563698504256"></p>
<h4 id="_1-3-1、首页" tabindex="-1"><a class="header-anchor" href="#_1-3-1、首页" aria-hidden="true">#</a> 1.3.1、首页</h4>
<p>在首页中，主要功能有“今日佳人”、“推荐”、“最近访客”等</p>
<ul>
<li>今日佳人
<ul>
<li>按照“缘分值”进行匹配，将“缘分值”最高的用户展现出来</li>
</ul>
</li>
<li>推荐
<ul>
<li>按照“缘分值”进行推荐，由后台的推荐系统计算得出，展现出来</li>
</ul>
</li>
<li>最近访客
<ul>
<li>显示最近来看“我”的用户</li>
</ul>
</li>
</ul>
<h4 id="_1-3-2、探花" tabindex="-1"><a class="header-anchor" href="#_1-3-2、探花" aria-hidden="true">#</a> 1.3.2、探花</h4>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563714212568.png" alt="1563714212568"></p>
<blockquote>
<p>说明：左划喜欢，右划不喜欢，每天限量不超过100个，开通会员可增加限额。双方互相喜欢则配对成功。</p>
<p>实现：数据来源推荐系统计算后的结果。</p>
</blockquote>
<h4 id="_1-3-3、搜附近" tabindex="-1"><a class="header-anchor" href="#_1-3-3、搜附近" aria-hidden="true">#</a> 1.3.3、搜附近</h4>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563714826374.png" alt="1563714826374"></p>
<p>根据用户当前所在的位置进行查询，并且在10km的范围内进行查询，可以通过筛选按钮进行条件筛选。</p>
<h4 id="_1-3-4、桃花传音" tabindex="-1"><a class="header-anchor" href="#_1-3-4、桃花传音" aria-hidden="true">#</a> 1.3.4、桃花传音</h4>
<p>功能类似QQ中的漂流瓶，用户可以发送和接收语音消息，陌生人就会接收到消息。</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563718868686.png" alt="1563718868686"></p>
<h4 id="_1-3-5、测灵魂" tabindex="-1"><a class="header-anchor" href="#_1-3-5、测灵魂" aria-hidden="true">#</a> 1.3.5、测灵魂</h4>
<ol>
<li>
<p>测试题用于对用户进行分类，每次提交答案后更新用户属性</p>
</li>
<li>
<p>测试题在后台进行维护</p>
</li>
<li>
<p>测试题测试完后产生结果页可以进行分享</p>
</li>
<li>
<p>测试题为顺序回答，回答完初级题解锁下一级问题</p>
</li>
<li>
<p>点击锁定问题 显示提示 请先回答上一级问题</p>
</li>
</ol>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563719052277.png" alt="1563719052277"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563719092059.png" alt="1563719092059"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563719100855.png" alt="1563719100855"></p>
<h3 id="_1-4、圈子" tabindex="-1"><a class="header-anchor" href="#_1-4、圈子" aria-hidden="true">#</a> 1.4、圈子</h3>
<p>1、推荐频道为根据问卷及喜好推荐相似用户动态</p>
<p>2、显示内容为用户头像、用户昵称、用户性别、用户年龄、用户标签和用户发布动态</p>
<p>3、图片最多不超过6张或发布一个小视频</p>
<p>4、动态下方显示发布时间距离当时时间，例如10分钟前、3小时前、2天前，显示时间进行取整</p>
<p>5、动态下方显示距离为发布动态地与本地距离</p>
<p>6、显示用户浏览量</p>
<p>7、显示点赞数、评论数 转发数</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563719380223.png" alt="1563719380223"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563719403171.png" alt="1563719403171"></p>
<h3 id="_1-5、消息" tabindex="-1"><a class="header-anchor" href="#_1-5、消息" aria-hidden="true">#</a> 1.5、消息</h3>
<p>消息包含通知类的消息和好友消息。</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563719621939.png" alt="1563719621939"></p>
<h3 id="_1-6、小视频" tabindex="-1"><a class="header-anchor" href="#_1-6、小视频" aria-hidden="true">#</a> 1.6、小视频</h3>
<p>用户可以上传小视频，也可以查看小视频列表，并且可以进行点赞操作。</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563719761162.png" alt="1563719761162"></p>
<h3 id="_1-7、我的" tabindex="-1"><a class="header-anchor" href="#_1-7、我的" aria-hidden="true">#</a> 1.7、我的</h3>
<p>显示关注数、喜欢数、粉丝数、我的动态等信息。</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563719894481.png" alt="1563719894481"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563719949700.png" alt="1563719949700"></p>
<h2 id="_2、项目介绍" tabindex="-1"><a class="header-anchor" href="#_2、项目介绍" aria-hidden="true">#</a> 2、项目介绍</h2>
<h3 id="_2-1、项目背景" tabindex="-1"><a class="header-anchor" href="#_2-1、项目背景" aria-hidden="true">#</a> 2.1、项目背景</h3>
<p>在线社交是互联网时代的产物，已成为互联网用户的基础需求之一。移动互联网自2003年起快速发展，促使在线社交逐渐从PC端转移至移动端。移动社交最初以熟人社交为主，以维系熟人关系、共享资源信息的形式存在。随着人们交友需求的延伸，移动社交开始向陌生人社交、兴趣社交等垂直方向发展，形式丰富多样。</p>
<h3 id="_2-2、市场分析" tabindex="-1"><a class="header-anchor" href="#_2-2、市场分析" aria-hidden="true">#</a> 2.2、市场分析</h3>
<p>探花交友项目定位于 <strong>陌生人交友市场</strong>。</p>
<ul>
<li>根据《2018社交领域投融资报告》中指出：虽然相比2017年，投融资事件减少29.5%，但是融资的总额却大幅增长，达到68%。</li>
<li>这些迹象说明：社交领域的发展规模正在扩大，而很多没有特色的产品也会被淘汰。而随着那些尾部产品的倒下，对我们来说就是机会，及时抓住不同社交需求的机会。以社交为核心向不同的细分领域衍生正在逐渐走向成熟化。</li>
<li>而我们按照娱乐形式和内容为主两个维度，将社交行业公司分类为：即时通信、内容社群、陌生人社交、泛娱乐社交以及兴趣社交几个领域。</li>
<li>而在2018年社交的各个细分领域下，均有备受资本所关注的项目，根据烯牛数据2018年的报告中，也同样指出：内容社交及陌生人社交为资本重要关注领域，合计融资占比达73%。</li>
</ul>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/clip_image002.jpg" alt="img"></p>
<p>根据市场现状以及融资事件来看：陌生人社交、内容社群、兴趣社交在2019年仍然保持强劲的动力，占到近70%的比例，它们仍然是资本市场主要关注领域。从增长率来看陌生人社交的增长速度远远大于其他几类，因此我们要从这个方向入手。</p>
<h3 id="_2-3、目标用户群体" tabindex="-1"><a class="header-anchor" href="#_2-3、目标用户群体" aria-hidden="true">#</a> 2.3、目标用户群体</h3>
<p>从整体年龄段来看：目前目标用户群体主要以30岁以下为主，其中以18-25岁年龄群体为主要受众人群。</p>
<ul>
<li>**上班群体：**热衷于通过分享内容或表达“个人情绪”在陌生人面前建立特殊的人设，并借此提升自我价值扩大自己的交际圈；</li>
<li>**学生群体：**追求个性选择，更倾向找到有共同话题的陌生人对象并建立长期的关系，乐于展现自我；</li>
<li>**文艺群体：**拥有自己独特的爱好且拥有特别的个人追求，追求文艺圈子内的交流，希望通过分享结交更多好友；</li>
<li>**沟通弱势群体：**对现有长期保持线上对社交模式表现无力且无效，渴望有更加有效且安全的社交方式出现，解决目前单调乏味的沟通方式；</li>
</ul>
<h3 id="_2-4、技术方案" tabindex="-1"><a class="header-anchor" href="#_2-4、技术方案" aria-hidden="true">#</a> 2.4、技术方案</h3>
<p>前端：</p>
<ul>
<li>flutter + android + 环信SDK + redux + shared_preferences + connectivity + iconfont + webview + sqflite</li>
</ul>
<p>后端：</p>
<ul>
<li>Spring Boot + SpringMVC + Mybatis + MybatisPlus + Dubbo</li>
<li>Elasticsearch geo 实现地理位置查询</li>
<li>MongoDB 实现海量数据的存储</li>
<li>Redis 数据的缓存</li>
<li>Spark + MLlib 实现智能推荐</li>
<li>第三方服务 环信即时通讯</li>
<li>第三方服务 阿里云 OSS 、 短信服务</li>
<li>第三方服务 虹软开放平台</li>
</ul>
<h3 id="_2-5、技术架构" tabindex="-1"><a class="header-anchor" href="#_2-5、技术架构" aria-hidden="true">#</a> 2.5、技术架构</h3>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563457093887.png" alt="1563457093887"></p>
<h3 id="_2-6、技术解决方案" tabindex="-1"><a class="header-anchor" href="#_2-6、技术解决方案" aria-hidden="true">#</a> 2.6、技术解决方案</h3>
<ul>
<li>使用Elasticsearch geo实现附近的人的解决方案</li>
<li>使用Spark + Mllib实现智能推荐的解决方案</li>
<li>使用MongoDB进行海量数据的存储的解决方案</li>
<li>使用采用分布式文件系统存储小视频数据的解决方案</li>
<li>使用虹软开放平台进行人脸识别的解决方案</li>
<li>使用阿里云进行短信验证码发送的解决方案</li>
</ul>
<h3 id="_2-7、技术亮点" tabindex="-1"><a class="header-anchor" href="#_2-7、技术亮点" aria-hidden="true">#</a> 2.7、技术亮点</h3>
<ul>
<li>采用Elasticsearch geo实现地理位置查询</li>
<li>采用RocketMQ作为消息服务中间件</li>
<li>采用MongoDB进行海量数据的存储</li>
<li>采用Spark + Mllib实现智能推荐</li>
<li>采用环信服务实现即时通讯</li>
<li>采用分布式文件系统存储小视频数据</li>
<li>采用Apache Dobbo作为微服务架构技术</li>
<li>采用SpringBoot + Mybatis实现系统主架构</li>
<li>采用Redis集群实现缓存的高可用</li>
</ul>
<h3 id="_2-8、开发方式" tabindex="-1"><a class="header-anchor" href="#_2-8、开发方式" aria-hidden="true">#</a> 2.8、开发方式</h3>
<p>探花交友项目采用前后端分离的方式开发，就是前端由前端团队负责开发，后端负责接口的开发，这种开发方式有2点好处：</p>
<ul>
<li>扬长避短，每个团队做自己擅长的事情</li>
<li>前后端并行开发，需要事先约定好接口地址以及各种参数、响应数据结构等</li>
</ul>
<p>什么是接口？接口就是一个http的请求地址，在定义接口的时候主要就是去定义：请求路径，请求方式，请求参数，响应结果数据等内容。</p>
<p>对于接口的定义我们采用YApi进行管理，YApi是一个开源的接口定义、管理、提供mock数据的管理平台。</p>
<blockquote>
<p>地址：https://mock-java.itheima.net/</p>
<p>用户名：tanhua@itcast.cn</p>
<p>密码：123456</p>
</blockquote>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201017100705286.png" alt="image-20201017100705286"></p>
<p>接口定义：</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201017100848313.png" alt="image-20201017100848313"></p>
<p>mock数据，YApi提供了mock功能，就是模拟服务端返回测试数据：</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201017101228582.png" alt="image-20201017101228582"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201017101252482.png" alt="image-20201017101252482"></p>
<p>还可以运行http请求（需要在Chrome中安装支持跨域扩展 https://juejin.im/post/6844904057707085832）：</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201017103028622.png" alt="image-20201017103028622"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201017103045864.png" alt="image-20201017103045864"></p>
<h3 id="_2-9、基础环境" tabindex="-1"><a class="header-anchor" href="#_2-9、基础环境" aria-hidden="true">#</a> 2.9、基础环境</h3>
<p>探花交友项目的开发统一使用提供的Centos7环境，该环境中部署安装了项目所需要的各种服务，如：MySQL、MongoDB、Redis、RocketMQ等。</p>
<ul>
<li>虚拟机的root用户密码为：root123</li>
<li>默认参数：CPU：2核，内存：4G，硬盘：60G</li>
<li>IP地址建议设置为192.168.31.81，否则有些服务将不可用，比如：Redis、RocketMQ等。</li>
</ul>
<h2 id="_3、注册登录" tabindex="-1"><a class="header-anchor" href="#_3、注册登录" aria-hidden="true">#</a> 3、注册登录</h2>
<p>业务说明：</p>
<p>用户通过手机验证码进行登录，如果是第一次登录则需要完善个人信息，在上传图片时，需要对上传的图片做人像的校验，防止用户上传非人像的图片作为头像。流程完成后，则登录成功。</p>
<p>流程：</p>
 <!-- ![image-20210202144610457](./assets/image-20210202144610457.png) -->
<h3 id="_3-1、单点登录系统" tabindex="-1"><a class="header-anchor" href="#_3-1、单点登录系统" aria-hidden="true">#</a> 3.1、单点登录系统</h3>
<p>为什么要使用单点登录系统？</p>
<p>以前实现的登录和注册是在同一个tomcat内部完成，我们现在的系统架构是每一个系统都是由一个团队进行维护，每个系统都是单独部署运行一个单独的tomcat，所以，不能将用户的登录信息保存到session中（多个tomcat的session是不能共享的），所以我们需要一个单独的系统来维护用户的登录信息。</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201016221250343.png" alt="image-20201016221250343"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201117235203408.png" alt="image-20201117235203408"></p>
<p>由上图可以看出：</p>
<ul>
<li>客户端需要通过SSO系统才能获取到token；</li>
<li>客户端在请求服务系统时，服务系统需要通过SSO系统进行对token进行校验；</li>
<li>SSO系统在整个系统架构中处于核心位置；</li>
</ul>
<h3 id="_3-2、搭建工程" tabindex="-1"><a class="header-anchor" href="#_3-2、搭建工程" aria-hidden="true">#</a> 3.2、搭建工程</h3>
<h4 id="_3-2-1、my-tanhua" tabindex="-1"><a class="header-anchor" href="#_3-2-1、my-tanhua" aria-hidden="true">#</a> 3.2.1、my-tanhua</h4>
<p>itcast-tanhua是父工程，集中定义了依赖的版本以及所需要的依赖信息。</p>
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

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.itcast.tanhua<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>my-tanhua<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- 集中定义依赖版本号 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mysql.version</span><span class="token punctuation">></span></span>5.1.47<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mysql.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>jackson.version</span><span class="token punctuation">></span></span>2.9.9<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>jackson.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>druid.version</span><span class="token punctuation">></span></span>1.0.9<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>druid.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-api.version</span><span class="token punctuation">></span></span>2.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-api.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>jsp-api.version</span><span class="token punctuation">></span></span>2.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>jsp-api.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>joda-time.version</span><span class="token punctuation">></span></span>2.9.9<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>joda-time.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>commons-lang3.version</span><span class="token punctuation">></span></span>3.7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>commons-lang3.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>commons-io.version</span><span class="token punctuation">></span></span>1.3.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>commons-io.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mybatis.version</span><span class="token punctuation">></span></span>3.2.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mybatis.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mybatis.mybatis-plus</span><span class="token punctuation">></span></span>3.1.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mybatis.mybatis-plus</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>lombok.version</span><span class="token punctuation">></span></span>1.18.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>lombok.version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--通用依赖--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!-- mybatis-plus插件依赖 --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.baomidou<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-plus<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${mybatis.mybatis-plus}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.baomidou<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-plus-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${mybatis.mybatis-plus}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!-- MySql --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${mysql.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mongodb<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mongodb-driver-sync<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.9.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${lombok.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-lang3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${commons-lang3.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--RocketMQ相关--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.rocketmq<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>rocketmq-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.0.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.rocketmq<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>rocketmq-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.6.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!-- Jackson Json处理工具包 --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.fasterxml.jackson.core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jackson-databind<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${jackson.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${druid.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>commons-codec<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-codec<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.11<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>joda-time<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>joda-time<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${joda-time.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.netty<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>netty-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.1.32.Final<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--zk依赖--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.zookeeper<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>zookeeper<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.4.13<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.github.sgroschupf<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>zkclient<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--dubbo的springboot支持--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>dubbo-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.2.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--dubbo框架--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>dubbo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.6.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.aliyun.oss<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>aliyun-sdk-oss<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.8.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.aliyun<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>aliyun-java-sdk-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.5.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.github.tobato<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>fastdfs-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.26.7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>ch.qos.logback<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>logback-classic<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.jsonwebtoken<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jjwt<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.9.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">></span></span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-2、my-tanhua-sso" tabindex="-1"><a class="header-anchor" href="#_3-2-2、my-tanhua-sso" aria-hidden="true">#</a> 3.2.2、my-tanhua-sso</h4>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/POM/4.0.0<span class="token punctuation">"</span></span>
         <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
         <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>my-tanhua<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.itcast.tanhua<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">></span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>my-tanhua-sso<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.baomidou<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-plus<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.baomidou<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-plus-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-lang3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.fasterxml.jackson.core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jackson-databind<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>commons-codec<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-codec<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--RocketMQ相关--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.rocketmq<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>rocketmq-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.rocketmq<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>rocketmq-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--简化代码的工具包--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.aliyun<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>aliyun-java-sdk-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.jsonwebtoken<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jjwt<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>joda-time<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>joda-time<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-3、网易模拟器" tabindex="-1"><a class="header-anchor" href="#_3-2-3、网易模拟器" aria-hidden="true">#</a> 3.2.3、网易模拟器</h4>
<p>探花交友项目的前端采用Android APP的形式，所以我们需要使用模拟器或真机进行测试。</p>
<p>对于模拟器这里推荐使用网易模拟器，其兼容性好、功能完善而且还简洁，缺点是它不支持虚拟机中安装。</p>
<p>下载：https://mumu.163.com/</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201016214917500.png" alt="image-20201016214917500"></p>
<h3 id="_3-3、数据库表" tabindex="-1"><a class="header-anchor" href="#_3-3、数据库表" aria-hidden="true">#</a> 3.3、数据库表</h3>
<p>数据库使用的mysql：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>tb_user<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>mobile<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'手机号'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>password<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'密码，需要加密'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>created<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>updated<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>mobile<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>mobile<span class="token punctuation">`</span></span><span class="token punctuation">)</span> <span class="token keyword">USING</span> <span class="token keyword">BTREE</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8 <span class="token keyword">COMMENT</span><span class="token operator">=</span><span class="token string">'用户表'</span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>tb_user_info<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>user_id<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户id'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>nick_name<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'昵称'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>logo<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户头像'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>tags<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户标签：多个用逗号分隔'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>sex<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">'3'</span> <span class="token keyword">COMMENT</span> <span class="token string">'性别，1-男，2-女，3-未知'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>age<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户年龄'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>edu<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'学历'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>city<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'居住城市'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>birthday<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'生日'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>cover_pic<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'封面图片'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>industry<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'行业'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>income<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'收入'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>marriage<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'婚姻状态'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>created<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>updated<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>user_id<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>user_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8 <span class="token keyword">COMMENT</span><span class="token operator">=</span><span class="token string">'用户信息表'</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4、编写配置" tabindex="-1"><a class="header-anchor" href="#_3-4、编写配置" aria-hidden="true">#</a> 3.4、编写配置</h3>
<p>application.properties：</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token key attr-name">spring.application.name</span> <span class="token punctuation">=</span> <span class="token value attr-value">itcast-tanhua-sso</span>

<span class="token key attr-name">server.port</span> <span class="token punctuation">=</span> <span class="token value attr-value">18080</span>

<span class="token key attr-name">spring.datasource.driver-class-name</span><span class="token punctuation">=</span><span class="token value attr-value">com.mysql.jdbc.Driver</span>
<span class="token key attr-name">spring.datasource.url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:mysql://192.168.31.81:3306/mytanhua?useUnicode=true&amp;characterEncoding=utf8&amp;autoReconnect=true&amp;allowMultiQueries=true&amp;useSSL=false</span>
<span class="token key attr-name">spring.datasource.username</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>
<span class="token key attr-name">spring.datasource.password</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>


<span class="token comment"># 枚举包扫描</span>
<span class="token key attr-name">mybatis-plus.type-enums-package</span><span class="token punctuation">=</span><span class="token value attr-value">com.tanhua.sso.enums</span>
<span class="token comment"># 表名前缀</span>
<span class="token key attr-name">mybatis-plus.global-config.db-config.table-prefix</span><span class="token punctuation">=</span><span class="token value attr-value">tb_</span>
<span class="token comment"># id策略为自增长</span>
<span class="token key attr-name">mybatis-plus.global-config.db-config.id-type</span><span class="token punctuation">=</span><span class="token value attr-value">auto</span>


<span class="token comment"># Redis相关配置</span>
<span class="token key attr-name">spring.redis.jedis.pool.max-wait</span> <span class="token punctuation">=</span> <span class="token value attr-value">5000ms</span>
<span class="token key attr-name">spring.redis.jedis.pool.max-Idle</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
<span class="token key attr-name">spring.redis.jedis.pool.min-Idle</span> <span class="token punctuation">=</span> <span class="token value attr-value">10</span>
<span class="token key attr-name">spring.redis.timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">10s</span>
<span class="token key attr-name">spring.redis.cluster.nodes</span> <span class="token punctuation">=</span> <span class="token value attr-value">192.168.31.81:6379,192.168.31.81:6380,192.168.31.81:6381</span>
<span class="token key attr-name">spring.redis.cluster.max-redirects</span><span class="token punctuation">=</span><span class="token value attr-value">5</span>

<span class="token comment"># RocketMQ相关配置</span>
<span class="token key attr-name">rocketmq.name-server</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.31.81:9876</span>
<span class="token key attr-name">rocketmq.producer.group</span><span class="token punctuation">=</span><span class="token value attr-value">tanhua</span>

<span class="token comment">#itcast_tanhua</span>
<span class="token comment">#盐 值</span>
<span class="token key attr-name">jwt.secret</span><span class="token punctuation">=</span><span class="token value attr-value">76bd425b6f29f7fcc2e0bfc286043df1</span>

<span class="token comment">#虹软相关配置</span>
<span class="token key attr-name">arcsoft.appid</span><span class="token punctuation">=</span><span class="token value attr-value">*****</span>
<span class="token key attr-name">arcsoft.sdkKey</span><span class="token punctuation">=</span><span class="token value attr-value">****</span>
<span class="token key attr-name">arcsoft.libPath</span><span class="token punctuation">=</span><span class="token value attr-value">F:\\code\\WIN64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5、编写基础代码" tabindex="-1"><a class="header-anchor" href="#_3-5、编写基础代码" aria-hidden="true">#</a> 3.5、编写基础代码</h3>
<h4 id="_3-5-1、lombok" tabindex="-1"><a class="header-anchor" href="#_3-5-1、lombok" aria-hidden="true">#</a> 3.5.1、Lombok</h4>
<p>lombok 提供了简单的注解的形式来帮助我们简化消除一些必须有但显得很臃肿的 java 代码，尤其是针对pojo。</p>
<p>官网：https://projectlombok.org/</p>
<h5 id="_3-5-1-1、配置安装" tabindex="-1"><a class="header-anchor" href="#_3-5-1-1、配置安装" aria-hidden="true">#</a> 3.5.1.1、配置安装</h5>
<p>导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--简化代码的工具包--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装IDEA插件： <img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1542036205393.png" alt="1542036205393"></p>
<blockquote>
<p>如果不安装插件，程序可以正常执行，但是看不到生成的一些代码，如：get、set方法。</p>
</blockquote>
<h5 id="_3-5-1-2、常用注解" tabindex="-1"><a class="header-anchor" href="#_3-5-1-2、常用注解" aria-hidden="true">#</a> 3.5.1.2、常用注解</h5>
<ul>
<li>@Data：注解在类上；提供类所有属性的 getting 和 setting 方法，此外还提供了equals、canEqual、hashCode、toString 方法</li>
<li>@Setter：注解在属性上；为属性提供 setting 方法</li>
<li>@Getter：注解在属性上；为属性提供 getting 方法</li>
<li>@Slf4j：注解在类上；为类提供一个 属性名为log 的 slf4j日志对象</li>
<li>@NoArgsConstructor：注解在类上；为类提供一个无参的构造方法</li>
<li>@AllArgsConstructor：注解在类上；为类提供一个全参的构造方法</li>
<li>@Builder：使用Builder模式构建对象</li>
</ul>
<blockquote>
<p>测试一：使用@Data注解</p>
</blockquote>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201116113610810.png" alt="image-20201116113610810"></p>
<p>是不是很神奇？！</p>
<blockquote>
<p>测试二：使用@Slf4j注解</p>
</blockquote>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201116113645107.png" alt="image-20201116113645107"></p>
<p>测试：</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201116113812602.png" alt="image-20201116113812602"></p>
<blockquote>
<p>测试三：@AllArgsConstructor、@NoArgsConstructor注解的使用</p>
</blockquote>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201116114013519.png" alt="image-20201116114013519"></p>
<blockquote>
<p>测试四：@Builder</p>
</blockquote>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201116114233416.png" alt="image-20201116114233416"></p>
<p>测试结果：</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201116114254202.png" alt="image-20201116114254202"></p>
<h4 id="_3-5-2、sexenum" tabindex="-1"><a class="header-anchor" href="#_3-5-2、sexenum" aria-hidden="true">#</a> 3.5.2、SexEnum</h4>
<p>用户的性别用枚举进行表示。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>enums</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>enums<span class="token punctuation">.</span></span><span class="token class-name">IEnum</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">SexEnum</span> <span class="token keyword">implements</span> <span class="token class-name">IEnum</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token function">MAN</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"男"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">WOMAN</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">"女"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">UNKNOWN</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">"未知"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> value<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> desc<span class="token punctuation">;</span>

    <span class="token class-name">SexEnum</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">,</span> <span class="token class-name">String</span> desc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>desc <span class="token operator">=</span> desc<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>desc<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-5-3、user、userinfo" tabindex="-1"><a class="header-anchor" href="#_3-5-3、user、userinfo" aria-hidden="true">#</a> 3.5.3、User、UserInfo</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>pojo</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">FieldFill</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">TableField</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">BasePojo</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>fill <span class="token operator">=</span> <span class="token class-name">FieldFill</span><span class="token punctuation">.</span><span class="token constant">INSERT</span><span class="token punctuation">)</span> <span class="token comment">//MP自动填充</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> created<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>fill <span class="token operator">=</span> <span class="token class-name">FieldFill</span><span class="token punctuation">.</span><span class="token constant">INSERT_UPDATE</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> updated<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>pojo</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>fasterxml<span class="token punctuation">.</span>jackson<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">JsonIgnore</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">AllArgsConstructor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">NoArgsConstructor</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">BasePojo</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> mobile<span class="token punctuation">;</span> <span class="token comment">//手机号</span>

    <span class="token annotation punctuation">@JsonIgnore</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span> <span class="token comment">//密码，json序列化时忽略</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>pojo</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>enums<span class="token punctuation">.</span></span><span class="token class-name">SexEnum</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">AllArgsConstructor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">NoArgsConstructor</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserInfo</span> <span class="token keyword">extends</span> <span class="token class-name">BasePojo</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> userId<span class="token punctuation">;</span> <span class="token comment">//用户id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> nickName<span class="token punctuation">;</span> <span class="token comment">//昵称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> logo<span class="token punctuation">;</span> <span class="token comment">//用户头像</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> tags<span class="token punctuation">;</span> <span class="token comment">//用户标签：多个用逗号分隔</span>
    <span class="token keyword">private</span> <span class="token class-name">SexEnum</span> sex<span class="token punctuation">;</span> <span class="token comment">//性别</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span> <span class="token comment">//年龄</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> edu<span class="token punctuation">;</span> <span class="token comment">//学历</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> city<span class="token punctuation">;</span> <span class="token comment">//城市</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> birthday<span class="token punctuation">;</span> <span class="token comment">//生日</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> coverPic<span class="token punctuation">;</span> <span class="token comment">// 封面图片</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> industry<span class="token punctuation">;</span> <span class="token comment">//行业</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> income<span class="token punctuation">;</span> <span class="token comment">//收入</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> marriage<span class="token punctuation">;</span> <span class="token comment">//婚姻状态</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-5-4、mymetaobjecthandler" tabindex="-1"><a class="header-anchor" href="#_3-5-4、mymetaobjecthandler" aria-hidden="true">#</a> 3.5.4、MyMetaObjectHandler</h4>
<p>对自动填充字段的处理：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>handler</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>handlers<span class="token punctuation">.</span></span><span class="token class-name">MetaObjectHandler</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>reflection<span class="token punctuation">.</span></span><span class="token class-name">MetaObject</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyMetaObjectHandler</span> <span class="token keyword">implements</span> <span class="token class-name">MetaObjectHandler</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">insertFill</span><span class="token punctuation">(</span><span class="token class-name">MetaObject</span> metaObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> created <span class="token operator">=</span> <span class="token function">getFieldValByName</span><span class="token punctuation">(</span><span class="token string">"created"</span><span class="token punctuation">,</span> metaObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> created<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//字段为空，可以进行填充</span>
            <span class="token function">setFieldValByName</span><span class="token punctuation">(</span><span class="token string">"created"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> metaObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Object</span> updated <span class="token operator">=</span> <span class="token function">getFieldValByName</span><span class="token punctuation">(</span><span class="token string">"updated"</span><span class="token punctuation">,</span> metaObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> updated<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//字段为空，可以进行填充</span>
            <span class="token function">setFieldValByName</span><span class="token punctuation">(</span><span class="token string">"updated"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> metaObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateFill</span><span class="token punctuation">(</span><span class="token class-name">MetaObject</span> metaObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//更新数据时，直接更新字段</span>
        <span class="token function">setFieldValByName</span><span class="token punctuation">(</span><span class="token string">"updated"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> metaObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-5-5、usermapper" tabindex="-1"><a class="header-anchor" href="#_3-5-5、usermapper" aria-hidden="true">#</a> 3.5.5、UserMapper</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>mapper</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">BaseMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserMapper</span> <span class="token keyword">extends</span> <span class="token class-name">BaseMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>mapper</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">BaseMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">UserInfo</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserInfoMapper</span> <span class="token keyword">extends</span> <span class="token class-name">BaseMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserInfo</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-5-6、myapplication" tabindex="-1"><a class="header-anchor" href="#_3-5-6、myapplication" aria-hidden="true">#</a> 3.5.6、MyApplication</h4>
<p>SpringBoot的启动类。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">MapperScan</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span></span><span class="token class-name">SpringApplication</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">SpringBootApplication</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span><span class="token string">"com.tanhua.sso.mapper"</span><span class="token punctuation">)</span> <span class="token comment">//设置mapper接口的扫描包</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">MyApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6、短信验证码" tabindex="-1"><a class="header-anchor" href="#_3-6、短信验证码" aria-hidden="true">#</a> 3.6、短信验证码</h3>
<p>发送短信验证码的流程：</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201116090449776.png" alt="image-20201116090449776"></p>
<p>流程说明：</p>
<ul>
<li>用户向SSO系统发送请求，在请求中传递手机号；</li>
<li>SSO系统接收到请求后，生成随机验证码以及短信内容，请求阿里云短信服务；</li>
<li>阿里云短信服务接收到请求后，会进行一系列的验证，比如账号余额、短信模板是否正确等，最后向运营商发起请求；</li>
<li>运营商接收到请求后，向该手机号下发短信，用户即可收到短信；</li>
</ul>
<h4 id="_3-6-1、阿里云短信服务" tabindex="-1"><a class="header-anchor" href="#_3-6-1、阿里云短信服务" aria-hidden="true">#</a> 3.6.1、阿里云短信服务</h4>
<h5 id="_3-6-1-1、申请签名与模板" tabindex="-1"><a class="header-anchor" href="#_3-6-1-1、申请签名与模板" aria-hidden="true">#</a> 3.6.1.1、申请签名与模板</h5>
<p>https://dysms.console.aliyun.com/dysms.htm?spm=5176.12818093.0.ddysms.2a4316d0ql6PyD</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201016193819097.png" alt="image-20201016193819097"></p>
<blockquote>
<p>说明：申请签名时，个人用户只能申请一个并且签名的名称必须为“ABC商城”，否则审核不通过。</p>
</blockquote>
<p>申请模板：</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201016193927924.png" alt="image-20201016193927924"></p>
<blockquote>
<p>审核时间需要1~2小时，请耐心等待~</p>
</blockquote>
<h5 id="_3-6-1-2、设置用户权限" tabindex="-1"><a class="header-anchor" href="#_3-6-1-2、设置用户权限" aria-hidden="true">#</a> 3.6.1.2、设置用户权限</h5>
<p>在阿里云中，需要在RAM服务中创建用户以及权限，才能通过api进行访问接口。</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201016194331790.png" alt="image-20201016194331790"></p>
<p>创建用户：</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201016194409024.png" alt="image-20201016194409024"></p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201016195011698.png" alt="image-20201016195011698"></p>
<p>创建完成后要保存AccessKey Secret和AccessKey ID，AccessKey Secret只显示这一次，后面将不再显示。</p>
<p>添加权限：</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201016194636739.png" alt="image-20201016194636739"></p>
<h5 id="_3-6-1-3、示例代码" tabindex="-1"><a class="header-anchor" href="#_3-6-1-3、示例代码" aria-hidden="true">#</a> 3.6.1.3、示例代码</h5>
<p>文档：https://help.aliyun.com/document_detail/101414.html?spm=a2c4g.11186623.6.625.18705ffa8u4lwj：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span></span><span class="token class-name">CommonRequest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span></span><span class="token class-name">CommonResponse</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span></span><span class="token class-name">DefaultAcsClient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span></span><span class="token class-name">IAcsClient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>exceptions<span class="token punctuation">.</span></span><span class="token class-name">ClientException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>exceptions<span class="token punctuation">.</span></span><span class="token class-name">ServerException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">MethodType</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>profile<span class="token punctuation">.</span></span><span class="token class-name">DefaultProfile</span></span><span class="token punctuation">;</span>
<span class="token comment">/*
pom.xml
&lt;dependency>
  &lt;groupId>com.aliyun&lt;/groupId>
  &lt;artifactId>aliyun-java-sdk-core&lt;/artifactId>
  &lt;version>4.5.3&lt;/version>
&lt;/dependency>
*/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SendSms</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DefaultProfile</span> profile <span class="token operator">=</span> <span class="token class-name">DefaultProfile</span><span class="token punctuation">.</span><span class="token function">getProfile</span><span class="token punctuation">(</span><span class="token string">"cn-hangzhou"</span><span class="token punctuation">,</span>
                <span class="token string">"LTAI4G7d2Q9CHc741gighjTF"</span><span class="token punctuation">,</span> <span class="token string">"uKOOGdIKvmoGhHlej8cJY8H3nlU6Fj"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IAcsClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultAcsClient</span><span class="token punctuation">(</span>profile<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">CommonRequest</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CommonRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setSysMethod</span><span class="token punctuation">(</span><span class="token class-name">MethodType</span><span class="token punctuation">.</span><span class="token constant">POST</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setSysDomain</span><span class="token punctuation">(</span><span class="token string">"dysmsapi.aliyuncs.com"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setSysVersion</span><span class="token punctuation">(</span><span class="token string">"2017-05-25"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setSysAction</span><span class="token punctuation">(</span><span class="token string">"SendSms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"RegionId"</span><span class="token punctuation">,</span> <span class="token string">"cn-hangzhou"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"PhoneNumbers"</span><span class="token punctuation">,</span> <span class="token string">"158****7944"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//目标手机号</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"SignName"</span><span class="token punctuation">,</span> <span class="token string">"ABC商城"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//签名名称</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"TemplateCode"</span><span class="token punctuation">,</span> <span class="token string">"SMS_204756062"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//短信模板code</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"TemplateParam"</span><span class="token punctuation">,</span> <span class="token string">"{\"code\":\"123456\"}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//模板中变量替换</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">CommonResponse</span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">getCommonResponse</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//{"Message":"OK","RequestId":"EC2D4C9A-0EAC-4213-BE45-CE6176E1DF23","BizId":"110903802851113360^0","Code":"OK"}</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ServerException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ClientException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-6-1-4、实现发送短信方法" tabindex="-1"><a class="header-anchor" href="#_3-6-1-4、实现发送短信方法" aria-hidden="true">#</a> 3.6.1.4、实现发送短信方法</h5>
<p>配置文件：aliyun.properties</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token key attr-name">aliyun.sms.regionId</span> <span class="token punctuation">=</span> <span class="token value attr-value">cn-hangzhou</span>
<span class="token key attr-name">aliyun.sms.accessKeyId</span> <span class="token punctuation">=</span> <span class="token value attr-value">LTAI4G7d2Q9CHc741gighjTF</span>
<span class="token key attr-name">aliyun.sms.accessKeySecret</span> <span class="token punctuation">=</span> <span class="token value attr-value">uKOOGdIKvmoGhHlej8cJY8H3nlU6Fj</span>
<span class="token key attr-name">aliyun.sms.domain</span><span class="token punctuation">=</span> <span class="token value attr-value">dysmsapi.aliyuncs.com</span>
<span class="token key attr-name">aliyun.sms.signName</span><span class="token punctuation">=</span> <span class="token value attr-value">ABC商城</span>
<span class="token key attr-name">aliyun.sms.templateCode</span><span class="token punctuation">=</span> <span class="token value attr-value">SMS_204756062</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意中文编码问题：</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201016203847636.png" alt="image-20201016203847636"></p>
<p>读取配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span></span><span class="token class-name">ConfigurationProperties</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PropertySource</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@PropertySource</span><span class="token punctuation">(</span><span class="token string">"classpath:aliyun.properties"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"aliyun.sms"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AliyunSMSConfig</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> regionId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> accessKeyId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> accessKeySecret<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> domain<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> signName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> templateCode<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码实现：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//SmsService.java</span>
<span class="token doc-comment comment">/**
     * 发送短信验证码
     *
     * <span class="token keyword">@param</span> <span class="token parameter">mobile</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">sendSms</span><span class="token punctuation">(</span><span class="token class-name">String</span> mobile<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DefaultProfile</span> profile <span class="token operator">=</span> <span class="token class-name">DefaultProfile</span><span class="token punctuation">.</span><span class="token function">getProfile</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getRegionId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getAccessKeyId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getAccessKeySecret</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IAcsClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultAcsClient</span><span class="token punctuation">(</span>profile<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> code <span class="token operator">=</span> <span class="token class-name">RandomUtils</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">100000</span><span class="token punctuation">,</span> <span class="token number">999999</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">""</span><span class="token punctuation">;</span>

        <span class="token class-name">CommonRequest</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CommonRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setSysMethod</span><span class="token punctuation">(</span><span class="token class-name">MethodType</span><span class="token punctuation">.</span><span class="token constant">POST</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setSysDomain</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getDomain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setSysVersion</span><span class="token punctuation">(</span><span class="token string">"2017-05-25"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setSysAction</span><span class="token punctuation">(</span><span class="token string">"SendSms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"RegionId"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getRegionId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"PhoneNumbers"</span><span class="token punctuation">,</span> mobile<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//目标手机号</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"SignName"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getSignName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//签名名称</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"TemplateCode"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getTemplateCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//短信模板code</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"TemplateParam"</span><span class="token punctuation">,</span> <span class="token string">"{\"code\":\""</span> <span class="token operator">+</span> code <span class="token operator">+</span> <span class="token string">"\"}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//模板中变量替换</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">CommonResponse</span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">getCommonResponse</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> data <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token string">"\"Message\":\"OK\""</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> code<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"发送短信验证码失败~ data = "</span> <span class="token operator">+</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"发送短信验证码失败~ mobile = "</span> <span class="token operator">+</span> mobile<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-6-2、sso短信接口服务" tabindex="-1"><a class="header-anchor" href="#_3-6-2、sso短信接口服务" aria-hidden="true">#</a> 3.6.2、SSO短信接口服务</h4>
<h5 id="_3-6-2-1、mock接口" tabindex="-1"><a class="header-anchor" href="#_3-6-2-1、mock接口" aria-hidden="true">#</a> 3.6.2.1、mock接口</h5>
<p>地址：https://mock-java.itheima.net/project/35/interface/api/581</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1564535110994.png" alt="1564535110994"></p>
<h5 id="_3-6-2-2、编写接口服务" tabindex="-1"><a class="header-anchor" href="#_3-6-2-2、编写接口服务" aria-hidden="true">#</a> 3.6.2.2、编写接口服务</h5>
<p>编写ErrorResult，ErrorResult对象是与前端约定好的结构，如果发生错误需要返回该对象，如果未发生错误响应200即可。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>vo</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Builder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Builder</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ErrorResult</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> errCode<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> errMessage<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SmsController：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>controller</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">SmsService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>vo<span class="token punctuation">.</span></span><span class="token class-name">ErrorResult</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpStatus</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">ResponseEntity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PostMapping</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestBody</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestMapping</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SmsController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">SmsService</span> smsService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 发送短信验证码接口
     *
     * <span class="token keyword">@param</span> <span class="token parameter">param</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"login"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ErrorResult</span><span class="token punctuation">></span></span> <span class="token function">sendCheckCode</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> param<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ErrorResult</span> errorResult <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> phone <span class="token operator">=</span> param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"phone"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            errorResult <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>smsService<span class="token punctuation">.</span><span class="token function">sendCheckCode</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> errorResult<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"发送短信验证码失败~ phone = "</span> <span class="token operator">+</span> phone<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            errorResult <span class="token operator">=</span> <span class="token class-name">ErrorResult</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">errCode</span><span class="token punctuation">(</span><span class="token string">"000002"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">errMessage</span><span class="token punctuation">(</span><span class="token string">"短信验证码发送失败！"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">INTERNAL_SERVER_ERROR</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span>errorResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SmsService：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span></span><span class="token class-name">CommonRequest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span></span><span class="token class-name">CommonResponse</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span></span><span class="token class-name">DefaultAcsClient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span></span><span class="token class-name">IAcsClient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>exceptions<span class="token punctuation">.</span></span><span class="token class-name">ClientException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>exceptions<span class="token punctuation">.</span></span><span class="token class-name">ServerException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">MethodType</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>profile<span class="token punctuation">.</span></span><span class="token class-name">DefaultProfile</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>config<span class="token punctuation">.</span></span><span class="token class-name">AliyunSMSConfig</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>vo<span class="token punctuation">.</span></span><span class="token class-name">ErrorResult</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">RandomUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">StringUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">RedisTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">Duration</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SmsService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">AliyunSMSConfig</span> aliyunSMSConfig<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">></span></span> redisTemplate<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 发送短信验证码
     *
     * <span class="token keyword">@param</span> <span class="token parameter">mobile</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">sendSms</span><span class="token punctuation">(</span><span class="token class-name">String</span> mobile<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DefaultProfile</span> profile <span class="token operator">=</span> <span class="token class-name">DefaultProfile</span><span class="token punctuation">.</span><span class="token function">getProfile</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getRegionId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getAccessKeyId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getAccessKeySecret</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IAcsClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultAcsClient</span><span class="token punctuation">(</span>profile<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> code <span class="token operator">=</span> <span class="token class-name">RandomUtils</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">100000</span><span class="token punctuation">,</span> <span class="token number">999999</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">""</span><span class="token punctuation">;</span>

        <span class="token class-name">CommonRequest</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CommonRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setSysMethod</span><span class="token punctuation">(</span><span class="token class-name">MethodType</span><span class="token punctuation">.</span><span class="token constant">POST</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setSysDomain</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getDomain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setSysVersion</span><span class="token punctuation">(</span><span class="token string">"2017-05-25"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">setSysAction</span><span class="token punctuation">(</span><span class="token string">"SendSms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"RegionId"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getRegionId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"PhoneNumbers"</span><span class="token punctuation">,</span> mobile<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//目标手机号</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"SignName"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getSignName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//签名名称</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"TemplateCode"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>aliyunSMSConfig<span class="token punctuation">.</span><span class="token function">getTemplateCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//短信模板code</span>
        request<span class="token punctuation">.</span><span class="token function">putQueryParameter</span><span class="token punctuation">(</span><span class="token string">"TemplateParam"</span><span class="token punctuation">,</span> <span class="token string">"{\"code\":\""</span> <span class="token operator">+</span> code <span class="token operator">+</span> <span class="token string">"\"}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//模板中变量替换</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">CommonResponse</span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">getCommonResponse</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> data <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token string">"\"Message\":\"OK\""</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> code<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"发送短信验证码失败~ data = "</span> <span class="token operator">+</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"发送短信验证码失败~ mobile = "</span> <span class="token operator">+</span> mobile<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 发送短信验证码
     * 实现：发送完成短信验证码后，需要将验证码保存到redis中
     * <span class="token keyword">@param</span> <span class="token parameter">phone</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">ErrorResult</span> <span class="token function">sendCheckCode</span><span class="token punctuation">(</span><span class="token class-name">String</span> phone<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">String</span> redisKey <span class="token operator">=</span> <span class="token string">"CHECK_CODE_"</span> <span class="token operator">+</span> phone<span class="token punctuation">;</span>

        <span class="token comment">//先判断该手机号发送的验证码是否还未失效</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>redisTemplate<span class="token punctuation">.</span><span class="token function">hasKey</span><span class="token punctuation">(</span>redisKey<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">String</span> msg <span class="token operator">=</span> <span class="token string">"上一次发送的验证码还未失效！"</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token class-name">ErrorResult</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">errCode</span><span class="token punctuation">(</span><span class="token string">"000001"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">errMessage</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">String</span> code <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sendSms</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">String</span> msg <span class="token operator">=</span> <span class="token string">"发送短信验证码失败！"</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token class-name">ErrorResult</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">errCode</span><span class="token punctuation">(</span><span class="token string">"000000"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">errMessage</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//短信发送成功，将验证码保存到redis中，有效期为5分钟</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>redisKey<span class="token punctuation">,</span> code<span class="token punctuation">,</span> <span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofMinutes</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-7、jwt" tabindex="-1"><a class="header-anchor" href="#_3-7、jwt" aria-hidden="true">#</a> 3.7、JWT</h3>
<h4 id="_3-7-1、简介" tabindex="-1"><a class="header-anchor" href="#_3-7-1、简介" aria-hidden="true">#</a> 3.7.1、简介</h4>
<p>JSON Web token简称JWT， 是用于对应用程序上的用户进行身份验证的标记。也就是说, 使用 JWTS 的应用程序不再需要保存有关其用户的 cookie 或其他session数据。此特性便于可伸缩性, 同时保证应用程序的安全。</p>
<p>在身份验证过程中, 当用户使用其凭据成功登录时, 将返回 JSON Web token, 并且必须在本地保存 (通常在本地存储中)。</p>
<p>每当用户要访问受保护的路由或资源 (端点) 时, 用户代理(user agent)必须连同请求一起发送 JWT, 通常在授权标头中使用Bearer schema。后端服务器接收到带有 JWT 的请求时, 首先要做的是验证token。</p>
<h4 id="_3-7-2、格式" tabindex="-1"><a class="header-anchor" href="#_3-7-2、格式" aria-hidden="true">#</a> 3.7.2、格式</h4>
<ul>
<li>
<p>JWT就是一个字符串，经过加密处理与校验处理的字符串，形式为：A.B.C</p>
</li>
<li>
<p>A由JWT头部信息header经过base64加密得到</p>
<ul>
<li>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>#默认的头信息
<span class="token punctuation">{</span>
  <span class="token property">"alg"</span><span class="token operator">:</span> <span class="token string">"HS256"</span><span class="token punctuation">,</span>
  <span class="token property">"typ"</span><span class="token operator">:</span> <span class="token string">"JWT"</span>
<span class="token punctuation">}</span>

#官网测试：https<span class="token operator">:</span><span class="token comment">//jwt.io/</span>
#base64加密后的字符串为：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>B是payload，存放有效信息的地方，这些信息包含三个部分：</p>
<ul>
<li>
<p>标准中注册的声明 (建议但不强制使用)</p>
<ul>
<li>iss: jwt签发者</li>
<li>sub: jwt所面向的用户</li>
<li>aud: 接收jwt的一方</li>
<li>exp: jwt的过期时间，这个过期时间必须要大于签发时间</li>
<li>nbf: 定义在什么时间之前，该jwt都是不可用的.</li>
<li>iat: jwt的签发时间</li>
<li>jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。</li>
</ul>
</li>
<li>
<p>公共的声明</p>
<ul>
<li>公共的声明可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息.但不建议添加敏感信息，因为该部分在客户端可解密.</li>
</ul>
</li>
<li>
<p>私有的声明</p>
<ul>
<li>私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为base64是对称解密的，意味着该部分信息可以归类为明文信息。</li>
</ul>
</li>
<li>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>#存放的数据：
<span class="token punctuation">{</span>
  <span class="token property">"sub"</span><span class="token operator">:</span> <span class="token string">"1234567890"</span><span class="token punctuation">,</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"John Doe"</span><span class="token punctuation">,</span>
  <span class="token property">"iat"</span><span class="token operator">:</span> <span class="token number">1516239022</span>
<span class="token punctuation">}</span>

#base64后的字符串为：
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>C由A和B通过加密算法得到，用作对token进行校验，看是否有效</p>
<ul>
<li>
<p>这个部分需要base64加密后的header和base64加密后的payload使用<code v-pre>.</code>连接组成的字符串，然后通过header中声明的加密方式进行加盐<code v-pre>secret</code>组合加密，然后就构成了jwt的第三部分。</p>
</li>
<li>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>#secret为：itcast
#得到的加密字符串为：DwMTjJktoFFdClHqjJMRgYzICo6FJOUc3Jmev9EScBc

#整体的token为：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.DwMTjJktoFFdClHqjJMRgYzICo6FJOUc3Jmev9EScBc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h4 id="_3-7-3、流程" tabindex="-1"><a class="header-anchor" href="#_3-7-3、流程" aria-hidden="true">#</a> 3.7.3、流程</h4>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1563895628713.png" alt="1563895628713"></p>
<h4 id="_3-7-4、示例" tabindex="-1"><a class="header-anchor" href="#_3-7-4、示例" aria-hidden="true">#</a> 3.7.4、示例</h4>
<p>导入依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.jsonwebtoken<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jjwt<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.9.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写测试用例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>jsonwebtoken<span class="token punctuation">.</span></span><span class="token class-name">ExpiredJwtException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>jsonwebtoken<span class="token punctuation">.</span></span><span class="token class-name">JwsHeader</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>jsonwebtoken<span class="token punctuation">.</span></span><span class="token class-name">Jwts</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>jsonwebtoken<span class="token punctuation">.</span></span><span class="token class-name">SignatureAlgorithm</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span></span><span class="token class-name">Test</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashMap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestJWT</span> <span class="token punctuation">{</span>

    <span class="token class-name">String</span> secret <span class="token operator">=</span> <span class="token string">"itcast"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testCreateToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> header <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        header<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">JwsHeader</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">,</span> <span class="token class-name">JwsHeader</span><span class="token punctuation">.</span><span class="token constant">JWT_TYPE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        header<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">JwsHeader</span><span class="token punctuation">.</span><span class="token constant">ALGORITHM</span><span class="token punctuation">,</span> <span class="token string">"HS256"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> claims <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        claims<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"mobile"</span><span class="token punctuation">,</span> <span class="token string">"1333333333"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        claims<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 生成token</span>
        <span class="token class-name">String</span> jwt <span class="token operator">=</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span>  <span class="token comment">//header，可省略</span>
                <span class="token punctuation">.</span><span class="token function">setClaims</span><span class="token punctuation">(</span>claims<span class="token punctuation">)</span> <span class="token comment">//payload，存放数据的位置，不能放置敏感数据，如：密码等</span>
                <span class="token punctuation">.</span><span class="token function">signWith</span><span class="token punctuation">(</span><span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS256</span><span class="token punctuation">,</span> secret<span class="token punctuation">)</span> <span class="token comment">//设置加密方法和加密盐</span>
                <span class="token punctuation">.</span><span class="token function">setExpiration</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//设置过期时间，3秒后过期</span>
                <span class="token punctuation">.</span><span class="token function">compact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jwt<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testDecodeToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> token <span class="token operator">=</span> <span class="token string">"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb2JpbGUiOiIxMzMzMzMzMzMzIiwiaWQiOiIyIiwiZXhwIjoxNjA1NTEzMDA2fQ.1eG3LpudD4XBycUG39UQDaKVBQHgaup-E1OLWo_m8m8"</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 通过token解析数据</span>
            <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> body <span class="token operator">=</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">parser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">setSigningKey</span><span class="token punctuation">(</span>secret<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">parseClaimsJws</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//{mobile=1333333333, id=2, exp=1605513392}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ExpiredJwtException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"token已经过期！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"token不合法！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-8、用户登录" tabindex="-1"><a class="header-anchor" href="#_3-8、用户登录" aria-hidden="true">#</a> 3.8、用户登录</h3>
<p>用户接收到验证码后，进行输入验证码，点击登录，前端系统将手机号以及验证码提交到SSO进行校验。</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/image-20201118231431191.png" alt="image-20201118231431191"></p>
<h4 id="_3-7-1、mock接口" tabindex="-1"><a class="header-anchor" href="#_3-7-1、mock接口" aria-hidden="true">#</a> 3.7.1、mock接口</h4>
<p>接口地址：https://mock-java.itheima.net/project/164/interface/api/12593</p>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1564300265546.png" alt="1564300265546"></p>
<h4 id="_3-7-2、usercontroller" tabindex="-1"><a class="header-anchor" href="#_3-7-2、usercontroller" aria-hidden="true">#</a> 3.7.2、UserController</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>controller</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">UserService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>vo<span class="token punctuation">.</span></span><span class="token class-name">ErrorResult</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">StringUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpStatus</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">ResponseEntity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PostMapping</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestBody</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestMapping</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashMap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">UserService</span> userService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户登录
     *
     * <span class="token keyword">@param</span> <span class="token parameter">param</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"loginVerification"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">></span></span> param<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> phone <span class="token operator">=</span> param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"phone"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> code <span class="token operator">=</span> param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"verificationCode"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userService<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span>phone<span class="token punctuation">,</span> code<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">//登录成功</span>
                <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ss <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token char">'|'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">,</span> ss<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                result<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"isNew"</span><span class="token punctuation">,</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>ss<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">ErrorResult</span> errorResult <span class="token operator">=</span> <span class="token class-name">ErrorResult</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">errCode</span><span class="token punctuation">(</span><span class="token string">"000002"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">errMessage</span><span class="token punctuation">(</span><span class="token string">"登录失败！"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">INTERNAL_SERVER_ERROR</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span>errorResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-7-3、userservice" tabindex="-1"><a class="header-anchor" href="#_3-7-3、userservice" aria-hidden="true">#</a> 3.7.3、UserService</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>conditions<span class="token punctuation">.</span>query<span class="token punctuation">.</span></span><span class="token class-name">QueryWrapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>core<span class="token punctuation">.</span>toolkit<span class="token punctuation">.</span></span><span class="token class-name">Wrappers</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>mapper<span class="token punctuation">.</span></span><span class="token class-name">UserMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tanhua<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>jsonwebtoken<span class="token punctuation">.</span></span><span class="token class-name">Jwts</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>jsonwebtoken<span class="token punctuation">.</span></span><span class="token class-name">SignatureAlgorithm</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>codec<span class="token punctuation">.</span>digest<span class="token punctuation">.</span></span><span class="token class-name">DigestUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">StringUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">RocketMQTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">DateTime</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Value</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">RedisTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>messaging<span class="token punctuation">.</span></span><span class="token class-name">MessagingException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashMap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> redisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">UserMapper</span> userMapper<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${jwt.secret}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> secret<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RocketMQTemplate</span> rocketMQTemplate<span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 用户登录
     *
     * <span class="token keyword">@param</span> <span class="token parameter">phone</span> 手机号
     * <span class="token keyword">@param</span> <span class="token parameter">code</span>  验证码
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token class-name">String</span> phone<span class="token punctuation">,</span> <span class="token class-name">String</span> code<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> redisKey <span class="token operator">=</span> <span class="token string">"CHECK_CODE_"</span> <span class="token operator">+</span> phone<span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> isNew <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

        <span class="token comment">//校验验证码</span>
        <span class="token class-name">String</span> redisData <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>redisKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> redisData<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">//验证码错误</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//验证码在校验完成后，需要废弃</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>redisKey<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">QueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">QueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"mobile"</span><span class="token punctuation">,</span> phone<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userMapper<span class="token punctuation">.</span><span class="token function">selectOne</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//需要注册该用户</span>
            user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            user<span class="token punctuation">.</span><span class="token function">setMobile</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
            user<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token class-name">DigestUtils</span><span class="token punctuation">.</span><span class="token function">md5Hex</span><span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//注册新用户</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>userMapper<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
            isNew <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//生成token</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> claims <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        claims<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 生成token</span>
        <span class="token class-name">String</span> token <span class="token operator">=</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setClaims</span><span class="token punctuation">(</span>claims<span class="token punctuation">)</span> <span class="token comment">//payload，存放数据的位置，不能放置敏感数据，如：密码等</span>
                <span class="token punctuation">.</span><span class="token function">signWith</span><span class="token punctuation">(</span><span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS256</span><span class="token punctuation">,</span> secret<span class="token punctuation">)</span> <span class="token comment">//设置加密方法和加密盐</span>
                <span class="token punctuation">.</span><span class="token function">setExpiration</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">plusHours</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//设置过期时间，12小时后过期</span>
                <span class="token punctuation">.</span><span class="token function">compact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">//发送用户登录成功的消息</span>
            <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> msg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            msg<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            msg<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"date"</span><span class="token punctuation">,</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">this</span><span class="token punctuation">.</span>rocketMQTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token string">"tanhua-sso-login"</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">MessagingException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"发送消息失败！"</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> token <span class="token operator">+</span> <span class="token string">"|"</span> <span class="token operator">+</span> isNew<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-7-4、测试" tabindex="-1"><a class="header-anchor" href="#_3-7-4、测试" aria-hidden="true">#</a> 3.7.4、测试</h4>
<p><img src="@source/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/assets/1564300534797.png" alt="1564300534797"></p>
</div></template>


