import { defineUserConfig,defaultTheme } from "vuepress"
import { backToTopPlugin } from "@vuepress/plugin-back-to-top"
export default {
  title: "strongking",
  description: "strongking博客",
  base: "/vuepress-java/",
  head: [["link", { rel: "icon", href: "/images/logut.png" }]],
  plugins: [backToTopPlugin()],
  theme: defaultTheme({
    // sidebar:'auto',
    // Public 文件路径
    logo: "/images/logut.png",
    lastUpdatedText: "最近更新时间",
    contributorsText: "作者",
    editLinkText: "在 GitHub 上编辑此页",
    docsRepo: "https://github.com/strongkin/vuepress-java",
    // docsBranch: "main",
    docsDir: "docs",
    editLinkPattern: ":repo/edit/:branch/:path",
    // URL
    // logo: "https://vuejs.org/images/logo.png",
    navbar: [
      { text: "首页", link: "/" },
      { text: "java", link: "/java/" },
      { text: "java面试", link: "/interview/" },
      { text: "GitRedis", link: "/gitredis/" },
      { text: "java分布式", link: "/java8-9/" },
    ],
    sidebar: {
      "/java/": [
        {
          text: "java",
          link: "/java/01-02java/",
          collapsable: false, // 不折叠
          children: [
            {
              text: "java基础",
              // link: "/java/01-02java/Java1/",
              collapsible: true, // 不折叠
              children: [
                {
                  text: "java基础语法",
                  link: "/java/01-02java/Java1/day01_Java/笔记/day01-java基础语法.md",
                },
                {
                  text: "java基础语法2",
                  link: "/java/01-02java/Java1/day02_运算符/笔记/day02-Java基础语法.md",
                },
                {
                  text: "switch&循环语句",
                  link: "/java/01-02java/Java1/day03_循环/讲义-md版本/day03 switch&循环语句.md",
                },
                {
                  text: "IDEA&数组",
                  link: "/java/01-02java/Java1/day04_IDEA和数组/讲义-md版本/day04 IDEA&数组.md",
                },
                {
                  text: "方法",
                  link: "/java/01-02java/Java1/day05_方法/讲义-md版本/day05 方法.md",
                },
                {
                  text: "Debug&基础练习",
                  link: "/java/01-02java/Java1/day06_Debug&进制&二维数组/讲义-md版本/day06 Debug&基础练习.md",
                },
              ],
            },
            {
              text: "面向对象基础",
              link: "/java/01-02java/2.面向对象基础/day07_面向对象基础/讲义-md版本/day07 面向对象.md",
            },
            {
              text: "API基础",
              link: "/java/01-02java/3.API基础/day08_常用API/讲义-md版本/day08 常用API.md",
            },
            {
              text: "集合基础",
              link: "/java/01-02java/4.集合基础/day09_学生管理系统/讲义-md版本/day09 ArrayList&学生管理系统.md",
            },
            {
              text: "Git",
              link: "/java/01-02java/5.Git/day10_Git/笔记/day01Git.md",
            },
            {
              text: "面向对象进阶",
              link: "/java/01-02java/06.面向对象进阶/day11_分类和static/笔记/day02-分类和static.md",
              collapsable: false, // 不折叠
              children: [
                {
                  text: "分类和static",
                  link: "/java/01-02java/06.面向对象进阶/day11_分类和static/笔记/day02-分类和static.md",
                },
                {
                  text: "继承",
                  link: "/java/01-02java/06.面向对象进阶/day12_继承/笔记/day03-继承.md",
                },
                {
                  text: "接口和内部类",
                  link: "/java/01-02java/06.面向对象进阶/day13_接口和内部类/笔记/day04-接口和内部类.md",
                },
              ],
            },
            {
              text: "常用API&异常",
              link: "/java/01-02java/07.常用API&异常/day05-APIday01/笔记/day05-常用API01.md",
              collapsable: false, // 不折叠
              children: [
                {
                  text: "常用API&异常",
                  link: "/java/01-02java/07.常用API&异常/day05-APIday01/笔记/day05-常用API01.md",
                },
                {
                  text: "常用API&异常",
                  link: "/java/01-02java/07.常用API&异常/day06-APIday02/笔记/day06-常用API02.md",
                },
              ],
            },
            {
              text: "集合",
              link: "/java/01-02java/08.集合/day16_集合01/笔记/day07集合01.md",
              collapsable: false, // 不折叠
              children: [
                {
                  text: "集合1",
                  link: "/java/01-02java/08.集合/day16_集合01/笔记/day07集合01.md",
                },
                {
                  text: "集合2",
                  link: "/java/01-02java/08.集合/day17_集合02/笔记/day08集合02.md",
                },
                {
                  text: "集合2",
                  link: "/java/01-02java/08.集合/day18_集合03/笔记/day09集合03.md",
                },
              ],
            },
            {
              text: "IO流",
              link: "/java/01-02java/09.IO流/day11-IO流day01/笔记/day10IO流01.md",
              collapsable: false, // 不折叠
              children: [
                {
                  text: "IO流",
                  link: "/java/01-02java/09.IO流/day11-IO流day01/笔记/day10IO流01.md",
                },
                {
                  text: "IO流",
                  link: "/java/01-02java/09.IO流/day12-IO流day02/笔记/day11IO流02.md",
                },
              ],
            },
            {
              text: "多线程",
              link: "/java/01-02java/10.多线程/day13-多线程day01/笔记/day12-多线程01.md",
              collapsable: false, // 不折叠
              children: [
                {
                  text: "多线程",
                  link: "/java/01-02java/10.多线程/day13-多线程day01/笔记/day12-多线程01.md",
                },
                {
                  text: "多线程",
                  link: "/java/01-02java/10.多线程/day14-多线程day02/笔记/day12 多线程02.md",
                },
              ],
            },
            {
              text: "网络编程",
              link: "/java/01-02java/11.网络编程/day15-网络编程day01/笔记/day14-网络编程.md",
            },
            {
              text: "基础加强",
              link: "/java/01-02java/12.基础加强/day25-基础加强01/笔记/day16-基础加强01.md",
              collapsable: false, // 不折叠
              children: [
                {
                  text: "基础加强",
                  link: "/java/01-02java/12.基础加强/day25-基础加强01/笔记/day16-基础加强01.md",
                },
                {
                  text: "基础加强",
                  link: "/java/01-02java/12.基础加强/day26-基础加强02/笔记/day17-基础加强02.md",
                },
                {
                  text: "基础加强",
                  link: "/java/01-02java/12.基础加强/day27_基础加强03/笔记/day18-基础加强03.md",
                },
              ],
            },
          ],
        },
        {
          text: "java3",
          link: "/java/java-03/day01/讲义/mysql基础.md",
          collapsable: false, // 不折叠
          children: [
            {
              text: "mysql基础",
              link: "/java/java-03/day01/讲义/mysql基础.md",
            },
            {
              text: "mysql高级",
              link: "/java/java-03/day02/讲义/mysql高级.md",
            },
            {
              text: "JDBC",
              link: "/java/java-03/day03-JDBC/讲义/JDBC.md",
            },
            {
              text: "Mybatis",
              link: "/java/java-03/day05-Mybatis/讲义/Mybatis.md",
            },
            {
              text: "HTML&CSS",
              link: "/java/java-03/day06-HTML&CSS/讲义/HTML&CSS.md",
            },
            {
              text: "JavaScript",
              link: "/java/java-03/day07-JavaScript/讲义/JavaScript.md",
            },
            {
              text: "HTTP&Tomcat&Servlet",
              link: "/java/java-03/day08-HTTP&Tomcat&Servlet/讲义/HTTP&Tomcat&Servlet.md",
            },
            {
              text: "Request&Response",
              link: "/java/java-03/day09/讲义/Request&Response.md",
            },
            {
              text: "JSP",
              link: "/java/java-03/day10-JSP/讲义/JSP.md",
            },

            {
              text: "Filter&Listener&Ajax",
              link: "/java/java-03/day12-Filter&Listener&AJAX/讲义/Filter&Listener&Ajax.md",
            },
            // { text: "mysql高级", link: "/java/java-03/day02/讲义/mysql高级" },
          ],
        },
        {
          text: "java4",
          link: "/java/java-04/1-spring/day01/讲义/Spring第一天,md",
          collapsable: false, // 不折叠
          children: [
            {
              text: "spring1",
              link: "/java/java-04/1-spring/day01/讲义/Spring第一天.md",
            },
            {
              text: "spring2",
              link: "/java/java-04/1-spring/day02/讲义/Spring第二天.md",
            },
            {
              text: "spring3",
              link: "/java/java-04/1-spring/day03/讲义/Spring第三天.md",
            },
            {
              text: "SpringMVC第一天",
              link: "/java/java-04/2-springmvc/day01/讲义/SpringMVC第一天.md",
            },
            {
              text: "SpringMVC第二天",
              link: "/java/java-04/2-springmvc/day02/讲义/SpringMVC第二天.md",
            },
            {
              text: "SpringBoot笔记",
              link: "/java/java-04/3-springboot/day01/讲义/SpringBoot笔记.md",
            },
            {
              text: "MyBatisPlus笔记",
              link: "/java/java-04/4-mybatisplus/day01/讲义/MyBatisPlus笔记.md",
            },
            {
              text: "Maven进阶笔记",
              link: "/java/java-04/5-maven/day01/讲义/Maven进阶笔记.md",
            },
          ],
        },
      ],
      "/interview/": [
        {
          text: "java面试部分",
          // link: "/interview/day01-基础篇/讲义/基础篇讲义.md",
          children: [
            {
              text: "基础篇讲义",
              link: "/interview/day01-基础篇/讲义/基础篇讲义.md",
            },
            {
              text: "并发篇讲义",
              link: "/interview/day02-并发篇/讲义/并发篇讲义.md",
            },
            {
              text: "虚拟机篇讲义",
              link: "/interview/day03-虚拟机/讲义/虚拟机篇讲义.md",
            },
            {
              text: "框架篇讲义",
              link: "/interview/day04-框架篇/讲义/框架篇讲义.md",
            },
            {
              text: "数据库篇",
              link: "/interview/day05-数据库/讲义/数据库篇.md",
            },
            {
              text: "缓存篇讲义",
              link: "/interview/day06-缓存篇/讲义/缓存篇讲义.md",
            },
            {
              text: "分布式讲义",
              link: "/interview/day07-分布式/讲义/分布式讲义.md",
            },
          ],
        },
      ],
      "/gitredis/": [
        {
          text: "java5",
          // link: "/gitredis/Git课程/讲义/Git课程讲义.md",
          children: [
            {
              text: "Git课程讲义",
              link: "/gitredis/Git课程/讲义/Git课程讲义.md",
            },
            {
              text: "Linux-1",
              link: "/gitredis/Linux课程/讲义/day01/Linux-Day01.md",
            },
            {
              text: "Linux-2",
              link: "/gitredis/Linux课程/讲义/day02/Linux-Day02.md",
            },
            {
              text: "Vmware虚拟机问题解决方案",
              link: "/gitredis/Linux课程/讲义/Vmware安装Linux问题/Vmware虚拟机问题解决方案.md",
            },
            {
              text: "Redis基础课程讲义",
              link: "/gitredis/Redis课程/讲义/Redis基础课程讲义.md",
            },
          ],
        },
        {
          text: "strongking外卖",
          children: [
            {
              text: "strongking外卖-Day01",
              link: "/gitredis/项目课程/讲义/瑞吉外卖-day01/瑞吉外卖-Day01.md",
            },
            {
              text: "strongking外卖-Day02",
              link: "/gitredis/项目课程/讲义/瑞吉外卖-day02/瑞吉外卖-Day02.md",
            },
            {
              text: "strongking外卖-Day03",
              link: "/gitredis/项目课程/讲义/瑞吉外卖-day03/瑞吉外卖-Day03.md",
            },
            {
              text: "strongking外卖-Day04",
              link: "/gitredis/项目课程/讲义/瑞吉外卖-day04/瑞吉外卖-Day04.md",
            },
            {
              text: "strongking外卖-Day05",
              link: "/gitredis/项目课程/讲义/瑞吉外卖-day05/瑞吉外卖-第五天.md",
            },
            {
              text: "strongking外卖-Day06",
              link: "/gitredis/项目课程/讲义/瑞吉外卖-day06/瑞吉外卖-第六天.md",
            },
          ],
        },
        {
          text: "项目优化",
          children: [
            {
              text: "strongking项目优化",
              link: "/gitredis/项目优化/讲义/瑞吉外卖项目优化-day01/瑞吉外卖项目优化-Day01.md",
            },
            {
              text: "strongking项目优化",
              link: "/gitredis/项目优化/讲义/瑞吉外卖项目优化-day02/瑞吉外卖项目优化-Day02.md",
            },
            {
              text: "strongking项目优化",
              link: "/gitredis/项目优化/讲义/瑞吉外卖项目优化-day03/瑞吉外卖项目优化-Day03.md",
            },
          ],
        },
      ],
      "/java8-9/": [
        {
          text: "java分布式",
          children: [
            {
              text: "SpringCloud01",
              link: "/java8-9/day01-SpringCloud01/讲义/SpringCloud01.md",
            },
            {
              text: "SpringCloud02",
              link: "/java8-9/SpringCloud02/讲义/md/SpringCloud实用篇02.md",
            },
            {
              text: "Docker实用篇",
              link: "/java8-9/day03-Docker/讲义/Docker实用篇.md",
            },
            {
              text: "RabbitMQ",
              link: "/java8-9/day04-MQ/讲义/RabbitMQ.md",
            },
            {
              text: "微服务",
              link: "/java8-9/day01-微服务保护/讲义/微服务保护.md",
            },
            {
              text: "分布式事务",
              link: "/java8-9/day02-分布式事务/讲义/分布式事务.md",
            },
            {
              text: "分布式缓存",
              link: "/java8-9/day03-分布式缓存/讲义/分布式缓存.md",
            },
            {
              text: "多级缓存",
              link: "/java8-9/day04-多级缓存/讲义/多级缓存.md",
            },
            {
              text: "RabbitMQ-高级篇",
              link: "/java8-9/day05/讲义/RabbitMQ-高级篇.md",
            },
          ],
        },
        {
          text: "交友软件",
          children: [
            {
              text: "项目介绍以及实现登录功能",
              link: "/java8-9/探花交友/day01-项目介绍以及实现登录功能/讲义-md版本/day01-项目介绍以及实现登录功能.md",
            },
            {
              text: "完善个人信息与MongoDB入门",
              link: "/java8-9/探花交友/day02-完善个人信息与MongoDB入门/讲义-md版本/day02-完善个人信息与MongoDB入门.md",
            },
            {
              text: "今日佳人功能实现",
              link: "/java8-9/探花交友/day03-今日佳人功能实现/讲义-md版本/day03-今日佳人功能实现.md",
            },
            {
              text: "圈子功能实现",
              link: "/java8-9/探花交友/day04-圈子功能实现/讲义-md版本/day04-圈子功能实现.md",
            },
            {
              text: "圈子、小视频功能实现",
              link: "/java8-9/探花交友/day05-圈子、小视频功能实现/讲义-md版本/day05-圈子、小视频功能实现.md",
            },
            {
              text: "完善小视频功能以及即时通讯",
              link: "/java8-9/探花交友/day06-完善小视频功能以及即时通讯/讲义-md版本/day06-完善小视频功能以及即时通讯.md",
            },
            {
              text: "完善消息功能以及个人主页",
              link: "/java8-9/探花交友/day07-完善消息功能以及个人主页/讲义-md版本/day07-完善消息功能以及个人主页.md",
            },
            {
              text: "搜附近以及探花功能实现",
              link: "/java8-9/探花交友/day08-搜附近以及探花功能实现/讲义-md版本/day08-搜附近以及探花功能实现.md",
            },
            {
              text: "我的功能实现",
              link: "/java8-9/探花交友/day09-我的功能实现/讲义-md版本/day09-我的功能实现.md",
            },
            {
              text: "实现推荐功能",
              link: "/java8-9/探花交友/day10-实现推荐功能/讲义-md版本/day10-实现推荐功能.md",
            },
          ],
        },
      ],
    },
  }),
  // defineUserConfig({
  // lang: "zh-CN",
  // text: "你好， VuePress ！",
  // description: "这是我的第一个 VuePress 站点",
  // })
}
// export default {
//   theme: defaultTheme({
//     // Public 文件路径
//     logo: '/images/hero.png',
//     // URL
//     logo: 'https://vuejs.org/images/logo.png',
//   }),
// }
