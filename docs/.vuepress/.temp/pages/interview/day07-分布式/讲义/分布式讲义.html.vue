<template><div><h1 id="分布式篇" tabindex="-1"><a class="header-anchor" href="#分布式篇" aria-hidden="true">#</a> 分布式篇</h1>
<h2 id="_1-cap-定理" tabindex="-1"><a class="header-anchor" href="#_1-cap-定理" aria-hidden="true">#</a> 1. CAP 定理</h2>
<p><strong>要求</strong></p>
<ul>
<li>理解 CAP 定理</li>
<li>知道常见的一致性级别</li>
</ul>
<p><strong>CAP 定理</strong></p>
<ul>
<li>Consistency 一致性：访问分布式系统中任意节点，总能返回一致的结果
<ul>
<li>Every read receives the most recent write or an error</li>
</ul>
</li>
<li>Availability 可用性：分布式系统总能向客户端返回响应
<ul>
<li>Every request receives a (non-error) response, without the guarantee that it contains the most recent write</li>
</ul>
</li>
<li>Partition tolerance 分区容忍：当分布式系统节点间通信发生了消息丢失或消息延迟，仍然允许系统继续运行
<ul>
<li>The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes</li>
</ul>
</li>
</ul>
<p>CAP 定理：最多三选二，无法兼得，通常在 CP 或者 AP 之间做出选择</p>
<p><strong>不一致的产生</strong></p>
<ol>
<li>client 向 Node1 写入新值 v1</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902144323586.png" alt="image-20210902144323586" style="zoom: 67%;" />
<ol start="2">
<li>写入成功 Node1 更新成 v1</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902144332846.png" alt="image-20210902144332846" style="zoom:67%;" />
<ol start="3">
<li>Node1 在没有将变更同步到 Node2 时，就向客户端返回了应答</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902144346469.png" alt="image-20210902144346469" style="zoom:67%;" />
<ol start="4">
<li>client 发起向 Node2 的读操作</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902144357711.png" alt="image-20210902144357711" style="zoom:67%;" />
<ol start="5">
<li>返回了旧值 v0（不一致）的结果</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902144405372.png" alt="image-20210902144405372" style="zoom:67%;" />
<p><strong>保证一致性</strong></p>
<ol>
<li>client 向 Node1 写入新值 v1</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902144821346.png" alt="image-20210902144821346" style="zoom:67%;" />
<ol start="2">
<li>写入成功 Node1 更新成 v1，此时不能立刻向 client 返回应答，而是需要将 v1 同步到 Node2</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902144917135.png" alt="image-20210902144917135" style="zoom:67%;" />
<ol start="3">
<li>同步 v1 成功</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902145113734.png" alt="image-20210902145113734" style="zoom:67%;" />
<ol start="4">
<li>此时才能向 client 返回应答</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902145138926.png" alt="image-20210902145138926" style="zoom:67%;" />
<ol start="5">
<li>如果此时 client 再去访问 Node2，不会出现不一致的情况</li>
</ol>
<p><strong>保 CP 失 A</strong></p>
<ol>
<li>当发生了网络分区，Node1 与 Node2 已经失去了联系，这时仍想对外提供服务（保 P）</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902145433075.png" alt="image-20210902145433075" style="zoom:67%;" />
<ol start="2">
<li>client 向 Node1 写入新值 v1</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902145513466.png" alt="image-20210902145513466" style="zoom:67%;" />
<ol start="3">
<li>写入 Node1 成功，但无法同步至 Node2</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902145616905.png" alt="image-20210902145616905" style="zoom:67%;" />
<ol start="4">
<li>这时为了保证一致性，Node1 不能向 client 返回应答，造成操作挂起无法完成（失去可用性）</li>
</ol>
<p><strong>保 AP 失 C</strong></p>
<ol>
<li>当发生了网络分区，Node1 与 Node2 已经失去了联系，这时仍想对外提供服务（保 P）</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902145433075.png" alt="image-20210902145433075" style="zoom:67%;" />
<ol start="2">
<li>client 向 Node1 写入新值 v1</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902145513466.png" alt="image-20210902145513466" style="zoom:67%;" />
<ol start="3">
<li>写入 Node1 成功，但无法同步至 Node2</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902145616905.png" alt="image-20210902145616905" style="zoom:67%;" />
<ol start="4">
<li>为了保证可用性，向 client 返回了应答（但牺牲了一致性）</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902150437928.png" alt="image-20210902150437928" style="zoom:67%;" />
<p><strong>一致性级别</strong></p>
<p>CP 和 AP 之间需要做权衡，其实根据需求不同，也可以将一致性划分成几个级别，在这些级别里做一个权衡。</p>
<ul>
<li>强一致性：系统写入什么，读出来的也会是什么，但实现起来往往对性能影响较大，例如之前 CP 的例子
<ul>
<li>例如：火车站售票，有就是有，没有就是没有，不能出现不一致的情况</li>
<li>典型算法：Paxos、Raft、ZAB</li>
</ul>
</li>
<li>弱一致性：系统写入成功后，不承诺立刻可以读到写入的值，也不承诺具体多久后数据能达到一致，还可以细分为：
<ul>
<li>会话一致性，同一个客户端会话中可以保证一致，其它会话不能保证</li>
<li>用户一致性，同一个用户中可以保证一致，其它用户不能保证</li>
<li>例如：网上购物，在商品详情页看到库存量还有好多，下单的瞬间才被提示“库存量不足”，实际上商品详情页展示的库存并不是最新的数据，只是在某个流程上才会做准确的检查</li>
</ul>
</li>
<li>最终一致性：是弱一致性的特例，保证在一定时间内，能够达到一个一致的状态
<ul>
<li>例如：转账，转账完成后，会有一个提示，您的转账会在 24 小时内到账，一般用户也能接受，但最终必须是一致的</li>
<li>典型协议：Gossip</li>
</ul>
</li>
</ul>
<h2 id="_2-paxos-算法" tabindex="-1"><a class="header-anchor" href="#_2-paxos-算法" aria-hidden="true">#</a> 2. Paxos 算法</h2>
<p><strong>要求</strong></p>
<ul>
<li>理解 Paxos 产生背景</li>
<li>掌握 Basic Paxos 算法</li>
</ul>
<p><strong>问题提出</strong></p>
<ol>
<li>集群中有 N 个节点，如果一个节点写入后要求同步到剩余 N-1 个节点后再向客户端返回 ok，虽然看起来最保险，但其中任意一个节点同步失败，势必造成整个集群不可用，能否在此基础上稍微提高可用性呢？</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902150851559.png" alt="image-20210902150851559" style="zoom:67%;" />
<ol start="2">
<li>答案是 <strong>（写）多数派</strong>，集群节点设置为奇数，同步超过集群中 N/2 个节点成功，则向客户端返回 ok，但存在顺序性问题，如 3 描述</li>
<li>多数派写操作成功后的读一致性暂不考虑，思考下图中的两项操作，都满足了多数派通过，但 S3 这台服务器并没有与 S1，S2 达成一致，要<strong>达到多数派内部一致性</strong></li>
</ol>
<p><img src="@source/interview/day07-分布式/讲义/img/image-20210902151020777.png" alt="image-20210902151020777"></p>
<p><strong>Paxos</strong></p>
<p>Paxos 是一种共识算法，目的是解决之前提到的写多数派时的顺序性问题</p>
<p>Paxos 角色划分：集群中的每个节点都可以充当</p>
<ol>
<li>
<p><strong>Proposer</strong>：负责生成提案</p>
<ul>
<li>注意：Paxos 算法允许有多个 Proposer 同时提案，但可能会引起活锁问题</li>
</ul>
</li>
<li>
<p><strong>Acceptor</strong>：负责批准提案</p>
<ul>
<li>Acceptor 如果只有一个的话，存在单点问题，因此应当有多个</li>
</ul>
</li>
<li>
<p>Learner：负责获取提案，Acceptor 批准提案后，会将提案发送给所有 Learner</p>
</li>
</ol>
<p>执行一个修改操作，不是一上来就能执行，分成两个阶段：</p>
<ol>
<li>准备阶段：Proposer负责接收 client 请求并产生提案，必须由多数派 Acceptor 批准通过提案</li>
<li>接受阶段：提案通过后，再将要执行的修改操作广播给 Acceptor，这次仍然多数派通过，此修改才能生效，可以返回响应给客户端</li>
</ol>
<p><img src="@source/interview/day07-分布式/讲义/img/image-20210902151606775.png" alt="image-20210902151606775"></p>
<p>算法要点：</p>
<ul>
<li>整个算法分成两个阶段：预备阶段，前两个箭头，接受阶段，后两个箭头。
<ul>
<li>预备阶段的目的是：第一拦截掉旧的提案，第二找到最新的 acceptValue</li>
</ul>
</li>
<li>对于 Proposer
<ul>
<li>预备阶段只发送<code v-pre>提案号</code>，接受阶段发送<code v-pre>提案号 + 值</code></li>
<li><code v-pre>提案号</code> n 唯一且全局递增，大的<code v-pre>提案号</code>有更高优先级</li>
<li>如果见到最新<code v-pre>已接受值</code>，就会替换掉 Proposer 自己原来的值，保证一致性</li>
</ul>
</li>
<li>对于 Acceptor 会持久化以下信息
<ul>
<li>minN（最小提案号），会在预备阶段和接受阶段被更新为更大提案号，会用来决定 Proposer 是否能选中提案</li>
<li>acceptN（已接受提案号）和 acceptValue（已接受值），会在接受阶段被更新，如果 minN &gt; n 则不会更新</li>
</ul>
</li>
</ul>
<p><strong>例1</strong></p>
<p><img src="@source/interview/day07-分布式/讲义/img/image-20210902152006734.png" alt="image-20210902152006734"></p>
<ol>
<li>
<p>P 广播提案号 1</p>
</li>
<li>
<p>有 3 个 A 接到提案，此时满足 n &gt; minN，将 minN 更新为 1</p>
</li>
<li>
<p>3个 A 成功返回，P 收到的应答过半，但没有遇到更大的 acceptNo 和 acceptValue，因此使用自己的 value X</p>
</li>
<li>
<p>P 广播提案号和值 1:X</p>
</li>
<li>
<p>3 个 A 接到提案号和值，更新状态，返回 minN 值 1 给 P</p>
</li>
<li>
<p>P 收到过半应答，并检查发现没有出现 minN &gt; 1，便选中提案值 X</p>
</li>
</ol>
<p><strong>例2</strong></p>
<p><img src="@source/interview/day07-分布式/讲义/img/image-20210902152121752.png" alt="image-20210902152121752"></p>
<ol>
<li>
<p>S1 广播提案号 1，想把值更新为 X</p>
</li>
<li>
<p>S5 广播提案号 2，想把值更新为 Y</p>
</li>
<li>
<p>S1、S2、S3 已经经历了 Accept 阶段并选中值 X</p>
</li>
<li>
<p><strong>关键点</strong>，S3 也接到了 S5 的prepare 提案，这时是否会有不一致的情况呢？</p>
</li>
<li>
<p>此时 S3 状态已将 acceptN 和 acceptValue 分别更新为 1:X；再返回 S5 的 ack 时就会将 1:X 返回给 S5</p>
</li>
<li>
<p>S5 用返回的 X 替换掉了自己原有的值 Y，并执行后续流程，后续都会同步为 X</p>
</li>
</ol>
<p><strong>例3</strong></p>
<p><img src="@source/interview/day07-分布式/讲义/img/image-20210902152345674.png" alt="image-20210902152345674"></p>
<ol>
<li>
<p>S1 广播提案号 1，想把值更新为 X</p>
</li>
<li>
<p>S5 广播提案号 2，想把值更新为 Y</p>
</li>
<li>
<p>S1、S2、S3 已经经历了 Accept 阶段，<strong>与例2 不同的是，值 X 还未选中</strong></p>
</li>
<li>
<p><strong>关键点</strong>，S3 也接到了 S5 的prepare 提案，这时是否会有不一致的情况呢？</p>
</li>
<li>
<p>此时 S3 状态将 acceptN 和 acceptValue 分别更新为 1:X；再返回 S5 的 ack 时就会将 1:X 返回给 S5</p>
</li>
<li>
<p>S5 用返回的 X 替换掉了自己原有的值 Y，并执行后续流程，后续都会同步为 X</p>
</li>
</ol>
<p><strong>例4</strong></p>
<p><img src="@source/interview/day07-分布式/讲义/img/image-20210902152544031.png" alt="image-20210902152544031"></p>
<ol>
<li>
<p>S1 广播提案号 1，想把值更新为 X</p>
</li>
<li>
<p>S5 广播提案号 2，想把值更新为 Y</p>
</li>
<li>
<p><strong>关键点</strong>，S3 还未经历 Accept 阶段时，就拿到了 S5 的 prepare 提案，这时是否会有不一致的情况呢？</p>
</li>
<li>
<p>S3 在接到 S1 的 accept 请求时，n&gt;=minN 条件不成立，因此没有更新 acceptN 和 acceptValue，并且返回的 minN 是 2</p>
</li>
<li>
<p>对 S1 来说，S3 返回的 minN 大于 n，选中失败；想更新 X 需要发起新一轮提案</p>
</li>
<li>
<p>对 S5 来说，accept 阶段发送的是它自己的 2:Y，后续会把值同步为 Y</p>
</li>
</ol>
<p><strong>例5</strong></p>
<p>回顾最早提到的顺序性问题，看 Paxos 能否解决它</p>
<p><img src="@source/interview/day07-分布式/讲义/img/image-20210902152742816.png" alt="image-20210902152742816"></p>
<p>下图演示了 Paxos 是如何解决顺序性问题的，分析步骤参考例3</p>
<p><img src="@source/interview/day07-分布式/讲义/img/image-20210902152753028.png" alt="image-20210902152753028"></p>
<p><strong>Paxos 缺点</strong></p>
<ol>
<li>
<p>效率较低，两轮操作只能选中一个值</p>
</li>
<li>
<p>难于理解</p>
</li>
<li>
<p>活锁问题</p>
</li>
</ol>
<p><img src="@source/interview/day07-分布式/讲义/img/image-20210902153136877.png" alt="image-20210902153136877"></p>
<ul>
<li>Paxos 是允许多个 Proposer 的，因此如果按上图所示运行，则后一个提案总会让前面提案选中失败，显然死循环</li>
</ul>
<blockquote>
<p><em><strong>参考资料</strong></em></p>
<ul>
<li>https://www.youtube.com/watch?v=JEpsBg0AO6o&amp;t=41s Raft 作者讲解 Paxos</li>
</ul>
</blockquote>
<h2 id="_3-raft-算法" tabindex="-1"><a class="header-anchor" href="#_3-raft-算法" aria-hidden="true">#</a> 3. Raft 算法</h2>
<p><strong>要求</strong></p>
<ul>
<li>理解 Raft 算法</li>
</ul>
<p><strong>Raft 算法</strong></p>
<p>另一种共识算法，目的是比 Paxos 更易理解</p>
<p>整个 Raft 算法分解为三部分：</p>
<ol>
<li>
<p>Leader 选举</p>
<p>① 只有一个 Server 能作为 Leader</p>
<p>② 一旦此 Server 崩溃，选举新 Leader</p>
</li>
<li>
<p>执行操作，以日志复制为例（Log replication）</p>
<p>① 由 Leader 执行自己的日志记录</p>
<p>② 将日志复制到其它 Server，会覆盖掉不一致的部分</p>
<p>③ 多数派记录日志成功，Leader 才能执行命令，向客户端返回结果</p>
</li>
<li>
<p>确保安全</p>
<p>① 保证日志记录的一致性</p>
<p>② 拥有最新日志的 Server 才能成为 Leader</p>
</li>
</ol>
<p><strong>Leader 选举</strong></p>
<ol>
<li>
<p><strong>Leader</strong> 会不断向<strong>选民</strong>发送 AppendEntries 请求，证明自己活着</p>
</li>
<li>
<p><strong>选民</strong>收到 <strong>Leader</strong> AppendEntries 请求后会重置自己的 timeout 时间</p>
</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902154049390.png" alt="image-20210902154049390" style="zoom:80%;" />
<ol start="3">
<li><strong>选民</strong>收不到 AppendEntries 请求超时后，转换角色为<strong>候选者</strong>，并将<strong>任期</strong>加1，发送 RequestVote 请求，推选自己</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902154114306.png" alt="image-20210902154114306" style="zoom:80%;" />
<ol start="4">
<li><strong>选民</strong>收到第一个 RequestVote，会向该<strong>候选者</strong>投一票，这样即使有多个<strong>候选者</strong>，必定会选出一个 <strong>Leader</strong>，选票过半即当选，如果落选会变回<strong>选民</strong></li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902154133262.png" alt="image-20210902154133262" style="zoom:80%;" />
<ol start="5">
<li>
<p>每一<strong>任期</strong>最多有一个 <strong>Leader</strong>，但也可能没有（选票都不过半的情况，需要再进行一轮投票，timeout 在 T~2T 间随机）</p>
</li>
<li>
<p><strong>任期</strong>由各个 server 自己维护即可，无需全局维护，在超时后加1，在接收到任意消息时更新为更新的<strong>任期</strong>，遇到更旧的<strong>任期</strong>，视为错误</p>
</li>
</ol>
<p><strong>执行操作（以日志复制为例）</strong></p>
<ol>
<li>
<p><strong>客户端</strong>发送命令至 <strong>Leader</strong></p>
</li>
<li>
<p><strong>Leader</strong> 将命令写入日志（S1虚框），并向所有<strong>选民</strong>发送 AppendEntries 请求</p>
</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902154733468.png" alt="image-20210902154733468" style="zoom:80%;" />
<ol start="3">
<li>多数派通过后，执行命令（即提交，S1虚框变实），此时就可以向<strong>客户端</strong>返回结果</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902154843978.png" alt="image-20210902154843978" style="zoom:80%;" />
<ol start="4">
<li>在后续的 AppendEntries 请求中通知<strong>选民</strong>，<strong>选民</strong>执行命令（即提交，S2,S3,S4,S5虚框变实）</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902155110401.png" alt="image-20210902155110401" style="zoom:80%;" />
<ol start="5">
<li>如果<strong>选民</strong>挂了，则 <strong>Leader</strong> 会不断尝试，待到<strong>选民</strong>重启，会将其缺失的日志陆续补齐</li>
</ol>
<p><strong>确保安全</strong></p>
<p>Leader 日志的完整性</p>
<ol>
<li>
<p>Leader 被认为拥有最完整的日志</p>
</li>
<li>
<p>一旦 Leader 完成了某条命令提交，那么未来的 Leader 也必须存有该条命令提交信息</p>
</li>
<li>
<p>投票时，会将候选者最新的 <code v-pre>&lt;Term，Index&gt;</code> 随 RequestVote 请求发送，如果候选者的日志还没选民的新，则投否决票</p>
</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902155344700.png" alt="image-20210902155344700" style="zoom:80%;" />
<ul>
<li>图中 S2 如果超时，发起选举请求，其它服务器只会对它投否决票，因为它的 Index 比其它人都旧</li>
<li>图中 S5 如果超时，发起选举请求，其它服务器也不会选它，因为他的 Term 太旧</li>
</ul>
<p>选民日志的一致性</p>
<ol>
<li>
<p>以 Leader 为准，对选民的日志进行补充或覆盖</p>
</li>
<li>
<p>AppendEntries 请求发送时会携带最新的 <code v-pre>&lt;Term,Index,Command&gt;</code> 以及上一个的 <code v-pre>&lt;Term,Index&gt;</code></p>
</li>
<li>
<p>如果选民发现上一个的 <code v-pre>&lt;Term,Index&gt;</code> 能够对应上则成功，否则失败，继续携带更早的信息进行比对</p>
</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902155724436.png" alt="image-20210902155724436" style="zoom:80%;" />
<ul>
<li>图中 Leader 发送了 <code v-pre>&lt;3,4,Command&gt;</code> 和 <code v-pre>&lt;2,3&gt;</code> 给 follower，follower 发现 <code v-pre>&lt;2,3&gt;</code> 能够与当前最新日志对应，这时直接执行 <code v-pre>&lt;3,4,Command&gt;</code> 即可</li>
</ul>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902155837273.png" alt="image-20210902155837273" style="zoom:80%;" />
<ul>
<li>图中 Leader 发送了 <code v-pre>&lt;3,4,Command&gt;</code> 和 <code v-pre>&lt;2,3&gt;</code> 给 follower，follower 发现 <code v-pre>&lt;2,3&gt;</code> 不能与当前最新日志对应，会央求 Leader 发送更早日志</li>
</ul>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902160222512.png" alt="image-20210902160222512" style="zoom:80%;" />
<ul>
<li>Leader 这次发送了 <code v-pre>&lt;3,4,Command&gt;</code> ， <code v-pre>&lt;2,3,Command&gt;</code> ，<code v-pre>&lt;1,2&gt;</code> 给 follower，follower 发现 <code v-pre>&lt;1,2&gt;</code> 能够与当前最新日志对应，这时补全 <code v-pre>&lt;3,4,Command&gt;</code> ， <code v-pre>&lt;2,3,Command&gt;</code>  即可</li>
</ul>
<blockquote>
<p><em><strong>参考资料</strong></em></p>
<ul>
<li>https://www.youtube.com/watch?v=vYp4LYbnnW8 Raft 作者讲解 Raft</li>
<li>https://raft.github.io/ Raft 资源</li>
<li>https://raft.github.io/raftscope/index.html Raft 可视化</li>
</ul>
</blockquote>
<h2 id="_4-gossip-协议" tabindex="-1"><a class="header-anchor" href="#_4-gossip-协议" aria-hidden="true">#</a> 4. Gossip 协议</h2>
<p><strong>要求</strong></p>
<ul>
<li>掌握 Gossip 协议</li>
</ul>
<p><strong>Gossip 协议</strong></p>
<p>与 Paxos 和 Raft 目标是强一致性不同，Gossip 达到的是最终一致性</p>
<ul>
<li>A gossip protocol is a procedure or process of computer peer-to-peer communication that is based on the way epidemics spread.</li>
</ul>
<p>它可以快速地将信息散播给集群中每个成员，散播速度为 $𝑙𝑜𝑔_𝑓 (𝑁)$ ，其中 f 术语称为 fanout，代表每次随机传播的成员数，而 N 代表总共成员数。例如：</p>
<ul>
<li>$𝑙𝑜𝑔_4 (40)≈2.66$ ，也就是大约三轮传播，就可以让集群达到一致</li>
<li>实际传播次数可能会高于此结果，因为随机时会随到一些重复的成员</li>
</ul>
<p><strong>Gossip 协议工作流程</strong></p>
<ol>
<li>例如，图中红色节点有其它节点不知道的信息，它的传播方式如下</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902161814969.png" alt="image-20210902161814969" style="zoom: 50%;" />
<ol start="2">
<li>在红色节点能连通的节点中随机挑选 fanout 个（粗线所示）</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902161917080.png" alt="image-20210902161917080" style="zoom: 50%;" />
<img src="@source/interview/day07-分布式/讲义/img/image-20210902162015054.png" alt="image-20210902162015054" style="zoom:50%;" />
<ol start="3">
<li>把信息传播给它们（感染）</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902162053851.png" alt="image-20210902162053851" style="zoom:50%;" />
<ol start="4">
<li>在这些已被【感染】的节点中，重复 2. 3. 两步，直至全部感染，即达到最终一致性</li>
</ol>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902162400932.png" alt="image-20210902162400932" style="zoom:50%;" />
<p><strong>Gossip 协议优点</strong></p>
<ul>
<li>扩展性高，传播次数不会受集群成员增长而增长过快
<ul>
<li>例如： $𝑙𝑜𝑔_4 (80)≈3.16$ ，集群实际成员翻了一倍，但传播次数几乎不变</li>
</ul>
</li>
<li>容错性好，即使某些节点间发生了故障无法通信，也不会影响最终的一致性
<ul>
<li>例如：A 与 B 之间发生故障无法通信，但只要 A 与其他能连通 B 的节点通信，那么信息就一定会散播到 B</li>
</ul>
</li>
<li>Robust（鲁棒性），即皮实，集群中的节点是对等的，即便一些节点挂了，一些节点新添加进来，也不会影响其它节点的信息传播</li>
</ul>
<blockquote>
<p><em><strong>参考资料</strong></em></p>
<ul>
<li><a href="https://flopezluis.github.io/gossip-simulator/" target="_blank" rel="noopener noreferrer">https://flopezluis.github.io/gossip-simulator/#<ExternalLinkIcon/></a> Gossip 可视化</li>
</ul>
</blockquote>
<h2 id="_5-分布式通用设计" tabindex="-1"><a class="header-anchor" href="#_5-分布式通用设计" aria-hidden="true">#</a> 5. 分布式通用设计</h2>
<p><strong>要求</strong></p>
<ul>
<li>掌握检测节点活着</li>
<li>掌握实现高可用</li>
<li>掌握全局 ID 生成</li>
<li>掌握负载均衡策略</li>
<li>掌握数据分片策略</li>
<li>掌握分布式事务</li>
</ul>
<blockquote>
<p><em><strong>提示</strong></em></p>
<ul>
<li>这里介绍以思想为主，因为实现和涉及的框架实在是太多了</li>
</ul>
</blockquote>
<p><strong>如何检测节点活着</strong></p>
<p>答案：通过心跳</p>
<ul>
<li>向节点周期性发送心跳请求，如果能收到心跳回应，表示该节点还活着</li>
<li>但如果收不到心跳回应，却不能证明该节点死了，可能由于网络抖动、回应延时等原因没能及时收到回应。有如下解决思路：
<ol>
<li>如 Redis 哨兵模式中，如果 sentinel 向 master 发送 PING 而没有收到 PONG，只能判定主观下线，必须采纳其它 sentinel 的意见，达到多数派后才能判定客观下线，进入主备切换流程</li>
<li>将周期心跳检测升级为累计心跳检测机制，即记录统计该节点的历史响应时间，如果超过警戒，则发起有限次的重试作为进一步判定</li>
</ol>
</li>
</ul>
<p><strong>如何实现高可用</strong></p>
<p>建议阅读《大型网站技术架构 – 核心原理与案例分析》一书，李智慧著，优点是条理清晰，不像另一些东拼西凑的文章
节录、概要如下：</p>
<ul>
<li>
<p>应用层高可用</p>
<ul>
<li>关键是做到：<strong>无状态</strong>，即所有节点地位平等，去 session 化。利用<strong>负载均衡</strong>将请求发送到任意一台节点进行处理，如果有某个节点宕机，把该节点从服务列表中移除，不会影响业务运行</li>
</ul>
</li>
<li>
<p>服务层高可用</p>
<ul>
<li>
<p>同样要做到：无状态，此外还应当考虑：</p>
<p>① 核心服务和非核心服务隔离部署，分级管理，方便非核心服务降级</p>
<p>② 对于即时性没有要求的服务可以考虑采用异步调用优化</p>
<p>③ 合理设置超时时间，在超时后应当有相应的处理策略，如：重试、转移、降级等</p>
</li>
</ul>
</li>
<li>
<p>数据层高可用</p>
<ul>
<li>
<p>需要有<strong>数据备份</strong>机制与<strong>故障转移</strong>机制</p>
</li>
<li>
<p>缓存服务是否需要高可用，两种观点：</p>
<p>① 缓存服务不可用会让数据库失去保护，因此需要保证缓存服务高可用</p>
<p>② 缓存服务不是数据存储服务，缓存宕机应当通过其他手段解决，如扩大缓存规模，一个缓存服务器的宕机只会影响局部</p>
</li>
</ul>
</li>
</ul>
<p><strong>全局 ID 生成</strong></p>
<ol>
<li>数据库 id 表
<ul>
<li>Oracle 数据库，直接使用序列作为 id</li>
<li>MySQL 数据库，采用自增主键作为 id，如果想避免单点故障，用多台 MySQL 使用不同的起始值和步长来设置 auto_increment</li>
<li>缺点：数据库并发不高，属于集中式的解决方案</li>
</ul>
</li>
<li>Redis
<ul>
<li>使用 incr 生成 id，由于 redis 的单线程特性，能保证它不会重复</li>
<li>缺点：仍然属于集中式的解决方案，有网络消耗</li>
</ul>
</li>
<li>UUID
<ul>
<li>UUID 有多种实现，典型的 UUID 实现会包含时间信息、MAC 地址信息、随机数</li>
<li>优点：属于本地解决方案，无网络消耗</li>
<li>缺点：MAC 地址提供了唯一性的保证，但也带来安全风险，最糟的是它是字符串形式，占用空间大，查询性能低，无法保证趋势递增</li>
</ul>
</li>
<li>Snowflake
<ul>
<li>通常的实现是 41 位时间信息、精确到毫秒，10 位的机器标识、12 位 的序列号，还有 1 位没有使用，共 8 个字节</li>
<li>理解思想后，可以根据自己实际情况对原有算法做调整</li>
<li>优点：本地解决方案，无网络消耗。长整型避免了字符串的缺点，并能保证趋势递增</li>
</ul>
</li>
</ol>
<p><strong>负载均衡策略</strong></p>
<p>负载均衡：即使用多台服务器共同分担计算任务，把网络请求和计算按某种算法均摊到各个服务器上</p>
<ul>
<li>可以使用硬件实现（如 F5），也可以使用软件实现（如 Nginx、Dubbo、 Ribbon 等诸多软件均有自己的负载均衡实现）</li>
<li>常见负载均衡算法有：
<ul>
<li>轮询，轮流来（Nginx、Ribbon）</li>
<li>加权轮询，在轮询的基础上考虑权重，权重高的，分到请求的机会更多（Nginx 、Dubbo）</li>
<li>最少连接，指谁的活跃连接数少，就把请求分发给谁，因为活跃多意味着响应慢（Nginx、Dubbo）</li>
<li>最少响应时间，指谁的响应快，且活跃连接数少，就把请求发给谁（Nginx、Ribbon）</li>
<li>随机，随便发给谁（Nginx、Dubbo、Ribbon）</li>
<li>hash，例如根据 ip 的hash 值分配请求，ip 相同的请求总会由同一台服务器处理（Nginx）</li>
<li>一致性 hash，比 hash 好处在于添加、移除节点对请求分发影响较小（Dubbo）</li>
</ul>
</li>
</ul>
<blockquote>
<p><em><strong>参考文档</strong></em></p>
<ul>
<li>https://nginx.org/en/docs/http/load_balancing.html</li>
<li>https://dubbo.apache.org/zh/docsv2.7/user/references/xml/dubbo-provider/</li>
</ul>
</blockquote>
<p><strong>数据分片策略</strong></p>
<p>所谓分片就是指数据量较大时，对数据进行水平切分，让数据分布在多个节点上。</p>
<ol>
<li>Hash
<ul>
<li>按照 key 的 hash 值将数据映射到不同的节点上</li>
<li>优点：实现简洁、数据分布均匀</li>
<li>缺点1：如果直接 hash 与节点数取模，节点变动时就会造成数据大规模迁移，可以使用一致性 hash 改进</li>
<li>缺点2：查询某一类热点数据时，由于它们是用 hash 分散到了不同节点上，造成查询效率不高</li>
</ul>
</li>
<li>Range
<ul>
<li>可以将 key 按照进行 range 划分，让某一范围的数据都存放在同一节点上</li>
<li>优点1：按 range 查询，性能更高</li>
<li>优点2：如果配合动态 range 分片，可以将较小的分片合并、将热点数据分散，有很多有用的功能</li>
</ul>
</li>
<li>静态调度与动态调度
<ul>
<li>静态意味着数据分片后分布固定，即使移动也需要人工介入</li>
<li>动态意味着通过管理器基于调度算法在各节点之间自由移动数据</li>
</ul>
</li>
</ol>
<p><strong>分布式事务 - 方案1：2PC 两阶段提交</strong></p>
<p><img src="@source/interview/day07-分布式/讲义/img/image-20210902163714878.png" alt="image-20210902163714878"></p>
<ul>
<li>在准备阶段所有参与者都返回 yes，则提交阶段通知参与者提交事务</li>
<li>在准备阶段有一个参与者返回 no，或是返回响应超时，则提交阶段通知所有参与者回滚事务</li>
</ul>
<p>存在问题</p>
<ul>
<li>阻塞型协议：所有参与者在等待接到下一步操作前，都处于阻塞，占用的资源也一直被锁定</li>
<li>过于保守：任一个节点失败都将导致事务回滚</li>
<li>数据不一致：在阶段二，如果只有部分参与者收到了提交请求，则会造成数据不一致</li>
<li>协调者单点问题：如果协调者故障在阶段二出现问题，会导致所有参与者（不会超时）始终处于阻塞状态，资源也被锁定得不到释放</li>
</ul>
<p><strong>分布式事务 - 方案2：TCC 事务补偿</strong></p>
<p><img src="@source/interview/day07-分布式/讲义/img/image-20210902163905501.png" alt="image-20210902163905501"></p>
<ul>
<li>Try：对数据校验、资源预留</li>
<li>Confirm：执行业务确认</li>
<li>Cancel：实现与 try 相反的操作</li>
</ul>
<p>要点</p>
<ul>
<li>本质上还是两阶段提交，不过无需借助数据库驱动，在应用层完成，业务侵入比较深</li>
<li>需要每个节点上配置 TCC 框架，记录操作日志和状态，以便在宕机时恢复</li>
<li>TCC 操作必须要考虑幂等</li>
</ul>
<p><strong>分布式事务 - 方案3：基于可靠性消息的最终一致性方案</strong></p>
<p>要点</p>
<ul>
<li>
<p>2PC 和 TCC 都属于同步方案，实际开发中更多采用的是异步方案</p>
<ul>
<li>例如：<strong>下单</strong>后的支付、扣减库存、增加积分等操作对实时性要求并不高。此时将<strong>下单成功的消息</strong>写入消息中间件，利用消息中间件实现最终一致性</li>
</ul>
</li>
<li>
<p>问题转换成保证<strong>本地事务与消息投递的原子性</strong></p>
<ul>
<li>
<p>例如：RocketMQ 的解决方案如下</p>
<p>① 发送消息到 broker ，只是此时消息称为<strong>半消息</strong>，无法消费</p>
<p>② 执行本地事务，如果成功，则半消息转换为正式消息，允许被消费；如果失败，删除 broker 上的半消息</p>
<p>③ 对于 broker 这端，如果迟迟不能收到半消息的 commit 或 rollback 信息，则会<strong>回查</strong>本地事务是否完成，根据状态确定如何处理</p>
</li>
</ul>
</li>
</ul>
<h2 id="_6-一致性-hash-补充" tabindex="-1"><a class="header-anchor" href="#_6-一致性-hash-补充" aria-hidden="true">#</a> 6. 一致性 Hash（补充）</h2>
<p>前面讲负载均衡和数据分片时，都提到了一致性 Hash，它是为了解决在服务器增、删时普通 hash 算法造成数据大量迁移问题的</p>
<p><strong>普通 hash 算法</strong></p>
<ul>
<li>假设有 3 台服务器，10 个 key 在服务器上的分布如下图所示</li>
</ul>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902164609023.png" alt="image-20210902164609023" style="zoom:80%;" />
<ul>
<li>添加一台服务器后，数据分布变成下图，可以看到除了一个 key（上下颜色相同的）以外，其它 key 都得迁移</li>
</ul>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902164843883.png" alt="image-20210902164843883" style="zoom:80%;" />
<p><strong>一致性 hash 算法</strong></p>
<ul>
<li>假设有 3 台服务器，10 个 key 在服务器上的分布如下图所示</li>
</ul>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902165058027.png" alt="image-20210902165058027" style="zoom:80%;" />
<ul>
<li>添加一台服务器后，数据分布变成下图，发现仅有 3 个key 需要迁移（上下颜色不同的）</li>
</ul>
<img src="@source/interview/day07-分布式/讲义/img/image-20210902165158024.png" alt="image-20210902165158024" style="zoom:80%;" />
</div></template>


