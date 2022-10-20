<template><div><h1 id="数据库篇" tabindex="-1"><a class="header-anchor" href="#数据库篇" aria-hidden="true">#</a> 数据库篇</h1>
<h2 id="_1-隔离级别" tabindex="-1"><a class="header-anchor" href="#_1-隔离级别" aria-hidden="true">#</a> 1. 隔离级别</h2>
<p><strong>要求</strong></p>
<ul>
<li>掌握四种隔离级别与相关的错误现象</li>
</ul>
<p><strong>未提交读</strong></p>
<ul>
<li>
<p>读到其它事务未提交的数据（最新的版本）</p>
</li>
<li>
<p>错误现象：有脏读、不可重复读、幻读现象</p>
</li>
</ul>
<p><strong>脏读现象</strong></p>
<table>
<thead>
<tr>
<th><strong>tx1</strong></th>
<th><strong>tx2</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>set  session transaction isolation level read uncommitted;</td>
<td></td>
</tr>
<tr>
<td>start  transaction;</td>
<td></td>
</tr>
<tr>
<td>select  * from account;  /<em>两个账户都为 1000</em>/</td>
<td></td>
</tr>
<tr>
<td></td>
<td>start  transaction;</td>
</tr>
<tr>
<td></td>
<td>update  account set balance = 2000 where accountNo=1;</td>
</tr>
<tr>
<td>select  * from account; /<em>1号账户2000, 2号账户1000</em>/</td>
<td></td>
</tr>
</tbody>
</table>
<ul>
<li>tx2 未提交的情况下，tx1 仍然读取到了它的更改</li>
</ul>
<p><strong>提交读（RC）</strong></p>
<ul>
<li>
<p>读到其它事务已提交的数据（最新已提交的版本）</p>
</li>
<li>
<p>错误现象：有不可重复读、幻读现象</p>
</li>
<li>
<p>使用场景：希望看到最新的有效值</p>
</li>
</ul>
<p><strong>不可重复度现象</strong></p>
<table>
<thead>
<tr>
<th><strong>tx1</strong></th>
<th><strong>tx2</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>set  session transaction isolation level read committed;</td>
<td></td>
</tr>
<tr>
<td>start  transaction;</td>
<td></td>
</tr>
<tr>
<td>select  * from account; /<em>两个账户都为 1000</em>/</td>
<td></td>
</tr>
<tr>
<td></td>
<td>update  account set balance = 2000 where accountNo=1;</td>
</tr>
<tr>
<td>select  * from account; /<em>1号账户2000, 2号账户1000</em>/</td>
<td></td>
</tr>
</tbody>
</table>
<ul>
<li>tx1 在同一事务内，两次读取的结果不一致，当然，此时 tx2 的事务已提交</li>
</ul>
<p><strong>可重复读（RR）</strong></p>
<ul>
<li>
<p>在事务范围内，多次读能够保证一致性（快照建立时最新已提交版本）</p>
</li>
<li>
<p>错误现象：有幻读现象，可以用加锁避免</p>
</li>
<li>
<p>使用场景：事务内要求更强的一致性，但看到的未必是最新的有效值</p>
</li>
</ul>
<p><strong>幻读现象</strong></p>
<table>
<thead>
<tr>
<th><strong>tx1</strong></th>
<th><strong>tx2</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>set  session transaction isolation level repeatable read;</td>
<td></td>
</tr>
<tr>
<td>start  transaction;</td>
<td></td>
</tr>
<tr>
<td>select  * from account; /<em>存在 1,2 两个账户</em>/</td>
<td></td>
</tr>
<tr>
<td></td>
<td>insert  into account values(3, 1000);</td>
</tr>
<tr>
<td>select  * from account; /<em>发现还是只有 1,2 两个账户</em>/</td>
<td></td>
</tr>
<tr>
<td>insert  into account values(3, 5000);  /* ERROR  1062 (23000): Duplicate entry '3' for key 'PRIMARY'  */</td>
<td></td>
</tr>
</tbody>
</table>
<ul>
<li>tx1 查询时并没有发现 3 号账户，执行插入时却发现主键冲突异常，就好像出现了幻觉一样</li>
</ul>
<p><strong>加锁避免幻读</strong></p>
<table>
<thead>
<tr>
<th><strong>tx1</strong></th>
<th><strong>tx2</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>set  session transaction isolation level repeatable read;</td>
<td></td>
</tr>
<tr>
<td>start  transaction;</td>
<td></td>
</tr>
<tr>
<td>select  * from account; /<em>存在 1,2 两个账户</em>/</td>
<td></td>
</tr>
<tr>
<td>select  * from account where accountNo=3  for update;</td>
<td></td>
</tr>
<tr>
<td></td>
<td>insert  into account values(3, 1000);  /* 阻塞 */</td>
</tr>
<tr>
<td>insert  into account values(3, 5000);</td>
<td></td>
</tr>
</tbody>
</table>
<ul>
<li>在 for update 这行语句执行时，虽然此时 3 号账户尚不存在，但 MySQL 在 repeatable read 隔离级别下会用间隙锁，锁住 2 号记录与正无穷大之间的间隙</li>
<li>此时 tx2 想插入 3 号记录就不行了，被间隙锁挡住了</li>
</ul>
<p><strong>串行读</strong></p>
<ul>
<li>
<p>在事务范围内，仅有读读可以并发，读写或写写会阻塞其它事务，用这种办法保证更强的一致性</p>
</li>
<li>
<p>错误现象：无</p>
</li>
</ul>
<p><strong>串行读避免幻读</strong></p>
<table>
<thead>
<tr>
<th><strong>tx1</strong></th>
<th><strong>tx2</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>set  session transaction isolation level serializable;</td>
<td></td>
</tr>
<tr>
<td>start  transaction;</td>
<td></td>
</tr>
<tr>
<td>select  * from account; /* 存在 1,2 两个账户 */</td>
<td></td>
</tr>
<tr>
<td></td>
<td>insert  into account values(3, 1000);  /* 阻塞 */</td>
</tr>
<tr>
<td>insert  into account values(3, 5000);</td>
<td></td>
</tr>
</tbody>
</table>
<ul>
<li>串行读隔离级别下，普通的 select 也会加共享读锁，其它事务的查询可以并发，但增删改就只能阻塞了</li>
</ul>
<h2 id="_2-快照读与当前读" tabindex="-1"><a class="header-anchor" href="#_2-快照读与当前读" aria-hidden="true">#</a> 2. 快照读与当前读</h2>
<p><strong>要求</strong></p>
<ul>
<li>理解快照读与当前读</li>
<li>了解快照产生的时机</li>
</ul>
<p><strong>当前读</strong></p>
<p>即读取最新提交的数据</p>
<ul>
<li>select … for update</li>
<li>select ... lock in share mode</li>
<li>insert、update、delete，都会按最新提交的数据进行操作</li>
</ul>
<p>当前读本质上是基于锁的并发读操作</p>
<p><strong>快照读</strong></p>
<p>读取某一个快照建立时（可以理解为某一时间点）的数据，也称为一致性读。快照读主要体现在 select 时，而不同隔离级别下，select 的行为不同</p>
<ul>
<li>
<p>在 Serializable 隔离级别下 - 普通 select 也变成当前读，即加共享读锁</p>
</li>
<li>
<p>在 RC 隔离级别下 - 每次 select 都会建立新的快照</p>
</li>
<li>
<p>在 RR 隔离级别下</p>
<ul>
<li>事务启动后，首次 select 会建立快照</li>
<li>如果事务启动选择了 with consistent snapshot，事务启动时就建立快照</li>
<li>基于旧数据的修改操作，会重新建立快照</li>
</ul>
</li>
</ul>
<p>快照读本质上读取的是历史数据（原理是回滚段），属于无锁查询</p>
<p><strong>RR 下，快照建立时机 - 第一次 select 时</strong></p>
<table>
<thead>
<tr>
<th><strong>tx1</strong></th>
<th><strong>tx2</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>set  session transaction isolation level repeatable read;</td>
<td></td>
</tr>
<tr>
<td>start  transaction;</td>
<td></td>
</tr>
<tr>
<td>select  * from account;  /* 此时建立快照，两个账户为 1000  */</td>
<td></td>
</tr>
<tr>
<td></td>
<td>update  account set balance = 2000 where accountNo=1;</td>
</tr>
<tr>
<td>select  * from account;  /* 两个账户仍为 1000 */</td>
<td></td>
</tr>
</tbody>
</table>
<ul>
<li>快照一旦建立，以后的查询都基于此快照，因此 tx1 中第二次 select 仍然得到 1 号账户余额为 1000</li>
</ul>
<p>如果 tx2 的 update 先执行</p>
<table>
<thead>
<tr>
<th><strong>tx1</strong></th>
<th><strong>tx2</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>set  session transaction isolation level repeatable read;</td>
<td></td>
</tr>
<tr>
<td>start  transaction;</td>
<td></td>
</tr>
<tr>
<td></td>
<td>update  account set balance = 2000 where accountNo=1;</td>
</tr>
<tr>
<td>select  * from account; /* 此时建立快照，1号余额已经为2000 */</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>RR 下，快照建立时机 - 事务启动时</strong></p>
<p>如果希望事务启动时就建立快照，可以添加 with consistent snapshot 选项</p>
<table>
<thead>
<tr>
<th><strong>tx1</strong></th>
<th><strong>tx2</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>set  session transaction isolation level repeatable read;</td>
<td></td>
</tr>
<tr>
<td>start  transaction with consistent snapshot; /* 此时建立快照，两个账户为 1000  */</td>
<td></td>
</tr>
<tr>
<td></td>
<td>update  account set balance = 2000 where accountNo=1;</td>
</tr>
<tr>
<td>select  * from account; /* 两个账户仍为 1000 */</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>RR 下，快照建立时机 - 修改数据时</strong></p>
<table>
<thead>
<tr>
<th><strong>tx1</strong></th>
<th><strong>tx2</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>set  session transaction isolation level repeatable read;</td>
<td></td>
</tr>
<tr>
<td>start  transaction;</td>
<td></td>
</tr>
<tr>
<td>select  * from account; /* 此时建立快照，两个账户为 1000 */</td>
<td></td>
</tr>
<tr>
<td></td>
<td>update  account set balance=balance+1000 where accountNo=1;</td>
</tr>
<tr>
<td>update  account set balance=balance+1000 where accountNo=1;</td>
<td></td>
</tr>
<tr>
<td>select  * from account; /* 1号余额为3000 */</td>
<td></td>
</tr>
</tbody>
</table>
<ul>
<li>tx1 内的修改必须重新建立快照，否则，就会发生丢失更新的问题</li>
</ul>
<h2 id="_3-innodb-vs-myisam" tabindex="-1"><a class="header-anchor" href="#_3-innodb-vs-myisam" aria-hidden="true">#</a> 3. InnoDB vs MyISAM</h2>
<p><strong>要求</strong></p>
<ul>
<li>掌握 InnoDB 与 MyISAM 的主要区别</li>
<li>尤其注意它们在索引结构上的区别</li>
</ul>
<p><strong>InnoDB</strong></p>
<ul>
<li>
<p>索引分为聚簇索引与二级索引</p>
<ul>
<li>聚簇索引：主键值作为索引数据，叶子节点还包含了所有字段数据，索引和数据是存储在一起的</li>
<li>二级索引：除主键外的其它字段建立的索引称为二级索引。被索引的字段值作为索引数据，叶子节点还包含了主键值</li>
</ul>
</li>
<li>
<p>支持事务</p>
<ul>
<li>通过 undo log 支持事务回滚、当前读（多版本查询）</li>
<li>通过 redo log 实现持久性</li>
<li>通过两阶段提交实现一致性</li>
<li>通过当前读、锁实现隔离性</li>
</ul>
</li>
<li>
<p>支持行锁、间隙锁</p>
</li>
<li>
<p>支持外键</p>
</li>
</ul>
<p><strong>MyISAM</strong></p>
<ul>
<li>
<p>索引只有一种</p>
<ul>
<li>被索引字段值作为索引数据，叶子节点还包含了该记录数据页地址，数据和索引是分开存储的</li>
</ul>
</li>
<li>
<p>不支持事务，没有 undo log 和 redo log</p>
</li>
<li>
<p>仅支持表锁</p>
</li>
<li>
<p>不支持外键</p>
</li>
<li>
<p>会保存表的总行数</p>
</li>
</ul>
<p><strong>InnoDB 索引特点</strong></p>
<p>聚簇索引：主键值作为索引数据，叶子节点还包含了所有字段数据，索引和数据是存储在一起的</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901155308778.png" alt="image-20210901155308778"></p>
<ul>
<li>主键即 7369、7499、7521 等</li>
</ul>
<p>二级索引：除主键外的其它字段建立的索引称为二级索引。被索引的字段值作为索引数据，叶子节点还包含了主键值</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901155317460.png" alt="image-20210901155317460"></p>
<ul>
<li>上图中 800、950、1100 这些是工资字段的值，根据它们建立了二级索引</li>
</ul>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901155327838.png" alt="image-20210901155327838"></p>
<ul>
<li>上图中，如果执行查询 <code v-pre>select empno, ename, sal from emp where sal = 800</code>，这时候可以利用二级索引定位到 800 这个工资，同时还能知道主键值 7369</li>
<li>但 select 字句中还出现了 ename 字段，在二级索引中不存在，因此需要根据主键值 7369 查询聚簇索引来获取 ename 的信息，这个过程俗称<strong>回表</strong></li>
</ul>
<p><strong>MyISAM 索引特点</strong></p>
<p>被索引字段值作为索引数据，叶子节点还包含了该记录数据页地址，数据和索引是分开存储的</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901155226621.png" alt="image-20210901155226621"></p>
<h2 id="_4-索引" tabindex="-1"><a class="header-anchor" href="#_4-索引" aria-hidden="true">#</a> 4. 索引</h2>
<p><strong>要求</strong></p>
<ul>
<li>了解常见索引与它们的适用场景，尤其是 B+Tree 索引的特点</li>
<li>掌握索引用于排序，以及失效情况</li>
<li>掌握索引用于筛选，以及失效情况</li>
<li>理解索引条件下推</li>
<li>理解二级索引覆盖</li>
</ul>
<h3 id="索引基础" tabindex="-1"><a class="header-anchor" href="#索引基础" aria-hidden="true">#</a> 索引基础</h3>
<p><strong>常见索引</strong></p>
<ul>
<li>
<p>哈希索引</p>
<ul>
<li>理想时间复杂度为 $O(1)$</li>
<li>适用场景：适用于等值查询的场景，内存数据的索引</li>
<li>典型实现：Redis，MySQL 的 memory 引擎</li>
</ul>
</li>
<li>
<p>平衡二叉树索引</p>
<ul>
<li>查询和更新的时间复杂度都是 $O(log_2(n))$</li>
<li>适用场景：适用于等值查询以及范围查询；适合内存数据的索引，但不适合磁盘数据的索引，可以认为<strong>树的高度决定了磁盘 I/O 的次数</strong>，百万数据树高约为 20</li>
</ul>
</li>
<li>
<p>BTree 索引</p>
<ul>
<li>BTree 其实就是 n 叉树，分叉多意味着节点中的孩子（key）多，树高自然就降低了</li>
<li>分叉数由页大小和行（包括 key 与 value）大小决定
<ul>
<li>假设页大小为 16k，每行 40 个字节，那么分叉数就为 16k / 40 ≈ 410</li>
<li>而分叉为 410，则百万数据树高约为3，仅 3 次 I/O 就能找到所需数据</li>
</ul>
</li>
<li><strong>局部性原理</strong>：每次 I/O 按页为单位读取数据，把多个 <strong>key 相邻</strong>的行放在同一页中（每页就是树上一个节点），能进一步减少 I/O</li>
</ul>
</li>
<li>
<p>B+ 树索引</p>
<ul>
<li>在 BTree 的基础上做了改进，索引上只存储 key，这样能进一步增加分叉数，假设 key 占 13 个字节，那么一页数据分叉数可以到 1260，树高可以进一步下降为 2</li>
</ul>
</li>
</ul>
<blockquote>
<p><em><strong>树高计算公式</strong></em></p>
<ul>
<li>$log_{10}(N) /  log_{10}(M)$ 其中 N 为数据行数，M 为分叉数</li>
</ul>
</blockquote>
<p><strong>BTree vs B+Tree</strong></p>
<ul>
<li>无论 BTree 还是 B+Tree，每个叶子节点到根节点距离都相同</li>
<li>BTree key 及 value 在每个节点上，无论叶子还是非叶子节点</li>
</ul>
<img src="@source/interview/day05-数据库/讲义/img/image-20210901170943656.png" alt="image-20210901170943656" style="zoom:80%;" />
<ul>
<li>B+Tree 普通节点只存 key，叶子节点才存储 key 和 value，因此分叉数可以更多
<ul>
<li>不过也请注意，普通节点上的 key 有的会与叶子节点的 key 重复</li>
</ul>
</li>
<li>B+Tree 必须到达叶子节点才能找到 value</li>
<li>B+Tree 叶子节点用链表连接，可以方便范围查询及全表遍历</li>
</ul>
<img src="@source/interview/day05-数据库/讲义/img/image-20210901170954328.png" alt="image-20210901170954328" style="zoom:80%;" />
<blockquote>
<p>注：这两张图都是仅画了 key，未画 value</p>
</blockquote>
<p><strong>B+Tree 新增 key</strong></p>
<p>假设阶数（m）为5</p>
<ol>
<li>
<p>若为空树，那么直接创建一个节点，插入 key 即可，此时这个叶子结点也是根结点。例如，插入 5</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901174939408.png" alt="image-20210901174939408"></p>
</li>
<li>
<p>插入时，若当前结点 key 的个数小于阶数，则插入结束</p>
</li>
<li>
<p>依次插入 8、10、15，按 key 大小升序</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901175021697.png" alt="image-20210901175021697"></p>
</li>
<li>
<p>插入 16，这时到达了阶数限制，所以要进行分裂</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901175057315.png" alt="image-20210901175057315"></p>
</li>
<li>
<p><strong>叶子节点分裂规则</strong>：将这个叶子结点分裂成左右两个叶子结点，左叶子结点包含前 m/2 个（2个）记录，右结点包含剩下的记录，将中间的 key 进位到父结点中。<strong>注意</strong>：中间的 key 仍会保留在叶子节点一份</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901175106713.png" alt="image-20210901175106713"></p>
</li>
<li>
<p>插入 17</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901175333804.png" alt="image-20210901175333804"></p>
</li>
<li>
<p>插入 18，这时当前结点的 key 个数到达 5，进行分裂</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901175352807.png" alt="image-20210901175352807"></p>
</li>
<li>
<p>分裂成两个结点，左结点 2 个记录，右结点 3 个记录，key 16 进位到父结点中</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901175413305.png" alt="image-20210901175413305"></p>
</li>
<li>
<p>插入 19、20、21、22、6、9</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901175440205.png" alt="image-20210901175440205"></p>
</li>
<li>
<p>插入 7，当前结点的 key 个数到达 5，需要分裂</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901175518737-16304901199481.png" alt="image-20210901175518737"></p>
</li>
<li>
<p>分裂后 key 7 进入到父结点中，这时父节点 key 个数也到达 5</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901175544893.png" alt="image-20210901175544893"></p>
</li>
<li>
<p><strong>非叶子节点分裂规则</strong>：左子结点包含前 (m-1)/2 个 key，将中间的 key 进位到父结点中（<strong>不保留</strong>），右子节点包含剩余的 key</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901175617464.png" alt="image-20210901175617464"></p>
</li>
</ol>
<p><strong>B+Tree 查询 key</strong></p>
<p>以查询 15 为例</p>
<ul>
<li>
<p>第一次 I/O</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901175721826.png" alt="image-20210901175721826"></p>
</li>
<li>
<p>第二次 I/O</p>
<!-- ![image-20210901175738876](./img/image-20210901175738876-16304902605912.png) -->
</li>
<li>
<p>第三次 I/O</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901175801859.png" alt="image-20210901175801859"></p>
</li>
</ul>
<p><strong>B+Tree 删除叶子节点 key</strong></p>
<ol>
<li>
<p>初始状态</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901180320860.png" alt="image-20210901180320860"></p>
</li>
<li>
<p><strong>删完有富余</strong>。即删除后结点的key的个数 &gt; m/2 – 1，删除操作结束，例如删除 22</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901180331158.png" alt="image-20210901180331158"></p>
</li>
<li>
<p><strong>删完没富余，但兄弟节点有富余</strong>。即兄弟结点 key 有富余（ &gt; m/2 – 1 ），向兄弟结点借一个记录，同时替换父节点，例如删除 15</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901180356515.png" alt="image-20210901180356515"></p>
</li>
<li>
<p><strong>兄弟节点也不富余，合并兄弟叶子节点</strong>。即兄弟节点合并成一个新的叶子结点，并删除父结点中的key，将当前结点指向父结点，例如删除 7</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901180405393.png" alt="image-20210901180405393"></p>
</li>
<li>
<p>也需要删除非叶子节点中的 7，并替换父节点保证区间仍有效</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901180422491.png" alt="image-20210901180422491"></p>
</li>
<li>
<p>左右兄弟都不够借，合并</p>
</li>
</ol>
<p><strong>B+Tree 删除非叶子节点 key</strong></p>
<p>接着上面的操作</p>
<ol>
<li>
<p>非叶子节点 key 的个数 &gt; m/2 – 1，则删除操作结束，否则执行 2</p>
</li>
<li>
<p>若<strong>兄弟结点有富余</strong>，父结点 key 下移，兄弟结点 key 上移，删除结束，否则执行 3</p>
</li>
<li>
<p>若<strong>兄弟节点没富余</strong>，当前结点和兄弟结点及父结点合并成一个新的结点。重复 1</p>
</li>
</ol>
<!-- 
   ![image-20210901180511685](./img/image-20210901180511685.png) -->
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210901180516139.png" alt="image-20210901180516139"></p>
<h3 id="命中索引" tabindex="-1"><a class="header-anchor" href="#命中索引" aria-hidden="true">#</a> 命中索引</h3>
<blockquote>
<p><strong>准备数据</strong></p>
<ol>
<li>
<p>修改 MySQL 配置文件，在 [mysqld] 下添加 secure_file_priv= 重启 MySQL 服务器，让选项生效</p>
</li>
<li>
<p>执行 db.sql 内的脚本，建表</p>
</li>
<li>
<p>执行 <code v-pre>LOAD DATA INFILE 'D:\\big_person.txt' INTO TABLE big_person;</code> 注意实际路径根据情况修改</p>
<ul>
<li>测试表 big_person（此表数据量较大，如果与其它表数据一起提供不好管理，故单独提供），数据行数 100 万条，列个数 15 列。为了更快速导入数据，这里采用了 load data infile 命令配合 *.txt 格式数据</li>
</ul>
</li>
</ol>
</blockquote>
<p><strong>索引用于排序</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">/* 测试单列索引并不能在多列排序时加速 */</span>
<span class="token keyword">create</span> <span class="token keyword">index</span> first_idx <span class="token keyword">on</span> big_person<span class="token punctuation">(</span>first_name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">index</span> last_idx <span class="token keyword">on</span> big_person<span class="token punctuation">(</span>last_name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> big_person <span class="token keyword">order</span> <span class="token keyword">by</span> last_name<span class="token punctuation">,</span> first_name <span class="token keyword">limit</span> <span class="token number">10</span><span class="token punctuation">;</span> 

<span class="token comment">/* 多列排序需要用组合索引 */</span>
<span class="token keyword">alter</span> <span class="token keyword">table</span> big_person <span class="token keyword">drop</span> <span class="token keyword">index</span> first_idx<span class="token punctuation">;</span>
<span class="token keyword">alter</span> <span class="token keyword">table</span> big_person <span class="token keyword">drop</span> <span class="token keyword">index</span> last_idx<span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">index</span> last_first_idx <span class="token keyword">on</span> big_person<span class="token punctuation">(</span>last_name<span class="token punctuation">,</span>first_name<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/* 多列排序需要遵循最左前缀原则, 第1个查询可以利用索引，第2,3查询不能利用索引 */</span>
<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> big_person <span class="token keyword">order</span> <span class="token keyword">by</span> last_name<span class="token punctuation">,</span> first_name <span class="token keyword">limit</span> <span class="token number">10</span><span class="token punctuation">;</span> 
<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> big_person <span class="token keyword">order</span> <span class="token keyword">by</span> first_name<span class="token punctuation">,</span> last_name <span class="token keyword">limit</span> <span class="token number">10</span><span class="token punctuation">;</span> 
<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> big_person <span class="token keyword">order</span> <span class="token keyword">by</span> first_name <span class="token keyword">limit</span> <span class="token number">10</span><span class="token punctuation">;</span> 

<span class="token comment">/* 多列排序升降序需要一致，查询1可以利用索引，查询2不能利用索引*/</span>
<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> big_person <span class="token keyword">order</span> <span class="token keyword">by</span> last_name <span class="token keyword">desc</span><span class="token punctuation">,</span> first_name <span class="token keyword">desc</span> <span class="token keyword">limit</span> <span class="token number">10</span><span class="token punctuation">;</span> 
<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> big_person <span class="token keyword">order</span> <span class="token keyword">by</span> last_name <span class="token keyword">desc</span><span class="token punctuation">,</span> first_name <span class="token keyword">asc</span> <span class="token keyword">limit</span> <span class="token number">10</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><em><strong>最左前缀原则</strong></em></p>
<p>若建立组合索引 (a,b,c)，则可以<strong>利用</strong>到索引的排序条件是：</p>
<ul>
<li>order by a</li>
<li>order by a, b</li>
<li>order by a, b, c</li>
</ul>
</blockquote>
<p><strong>索引用于 where 筛选</strong></p>
<ul>
<li>参考 https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">/* 模糊查询需要遵循字符串最左前缀原则，查询2可以利用索引，查询1,3不能利用索引 */</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> first_name <span class="token operator">LIKE</span> <span class="token string">'dav%'</span> <span class="token keyword">LIMIT</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> last_name <span class="token operator">LIKE</span> <span class="token string">'dav%'</span> <span class="token keyword">LIMIT</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> last_name <span class="token operator">LIKE</span> <span class="token string">'%dav'</span> <span class="token keyword">LIMIT</span> <span class="token number">5</span><span class="token punctuation">;</span>

<span class="token comment">/* 组合索引需要遵循最左前缀原则，查询1,2可以利用索引，查询3,4不能利用索引 */</span>
<span class="token keyword">create</span> <span class="token keyword">index</span> province_city_county_idx <span class="token keyword">on</span> big_person<span class="token punctuation">(</span>province<span class="token punctuation">,</span>city<span class="token punctuation">,</span>county<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> province <span class="token operator">=</span> <span class="token string">'上海'</span> <span class="token operator">AND</span> city<span class="token operator">=</span><span class="token string">'宜兰县'</span> <span class="token operator">AND</span> county<span class="token operator">=</span><span class="token string">'中西区'</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> county<span class="token operator">=</span><span class="token string">'中西区'</span> <span class="token operator">AND</span> city<span class="token operator">=</span><span class="token string">'宜兰县'</span> <span class="token operator">AND</span> province <span class="token operator">=</span> <span class="token string">'上海'</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> city<span class="token operator">=</span><span class="token string">'宜兰县'</span> <span class="token operator">AND</span> county<span class="token operator">=</span><span class="token string">'中西区'</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> county<span class="token operator">=</span><span class="token string">'中西区'</span><span class="token punctuation">;</span>

<span class="token comment">/* 函数及计算问题，一旦在字段上应用了计算或函数，都会造成索引失效。查询2可以利用索引，查询1不能利用索引 */</span>
<span class="token keyword">create</span> <span class="token keyword">index</span> birthday_idx <span class="token keyword">on</span> big_person<span class="token punctuation">(</span>birthday<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> ADDDATE<span class="token punctuation">(</span>birthday<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">=</span><span class="token string">'2005-02-10'</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> birthday<span class="token operator">=</span>ADDDATE<span class="token punctuation">(</span><span class="token string">'2005-02-10'</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/* 隐式类型转换问题
	* 查询1会发生隐式类型转换等价于在phone上应用了函数，造成索引失效
	* 查询2字段与值类型相同不会类型转换，可以利用索引
*/</span>
<span class="token keyword">create</span> <span class="token keyword">index</span> phone_idx <span class="token keyword">on</span> big_person<span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> phone <span class="token operator">=</span> <span class="token number">13000013934</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> phone <span class="token operator">=</span> <span class="token string">'13000013934'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><em><strong>最左前缀原则（leftmost prefix）</strong></em></p>
<p>若建立组合索引 (a,b,c)，则可以<strong>利用</strong>到索引的查询条件是：</p>
<ul>
<li>where a = ?</li>
<li>where a = ? and b = ? （注意与条件的先后次序无关，也可以是 where b = ? and a = ?，只要出现即可）</li>
<li>where a = ? and b = ? and c = ? （注意事项同上）</li>
</ul>
<p><strong>不能利用</strong>的例子：</p>
<ul>
<li>where b = ?</li>
<li>where b = ? and c = ?</li>
<li>where c = ?</li>
</ul>
<p>特殊情况：</p>
<ul>
<li>where a = ? and c = ?（a = ? 会利用索引，但 c = ? 不能利用索引加速，会触发索引条件下推）</li>
</ul>
</blockquote>
<p><strong>索引条件下推</strong></p>
<ul>
<li>参考 https://dev.mysql.com/doc/refman/8.0/en/index-condition-pushdown-optimization.html</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">/* 查询 1,2,3,4 都能利用索引，但 4 相当于部分利用了索引，会触发索引条件下推 */</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> province <span class="token operator">=</span> <span class="token string">'上海'</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> province <span class="token operator">=</span> <span class="token string">'上海'</span> <span class="token operator">AND</span> city<span class="token operator">=</span><span class="token string">'嘉兴市'</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> province <span class="token operator">=</span> <span class="token string">'上海'</span> <span class="token operator">AND</span> city<span class="token operator">=</span><span class="token string">'嘉兴市'</span> <span class="token operator">AND</span> county<span class="token operator">=</span><span class="token string">'中西区'</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> province <span class="token operator">=</span> <span class="token string">'上海'</span> <span class="token operator">AND</span> county<span class="token operator">=</span><span class="token string">'中西区'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><em><strong>索引条件下推</strong></em></p>
<ul>
<li>MySQL 执行条件判断的时机有两处：
<ul>
<li>服务层（上层，不包括索引实现）</li>
<li>引擎层（下层，包括了索引实现，可以利用）</li>
<li>上面查询 4 中有 province 条件能够利用索引，在引擎层执行，但 county 条件仍然要交给服务层处理</li>
</ul>
</li>
<li>在 5.6 之前，服务层需要判断所有记录的 county 条件，性能非常低</li>
<li>5.6 以后，引擎层会先根据 province 条件过滤，满足条件的记录才在服务层处理 county 条件</li>
</ul>
</blockquote>
<p>我们现在用的是 5.6 以上版本，所以没有体会，可以用下面的语句关闭索引下推优化，再测试一下性能</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SET</span> optimizer_switch <span class="token operator">=</span> <span class="token string">'index_condition_pushdown=off'</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> province <span class="token operator">=</span> <span class="token string">'上海'</span> <span class="token operator">AND</span> county<span class="token operator">=</span><span class="token string">'中西区'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>二级索引覆盖</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> province <span class="token operator">=</span> <span class="token string">'上海'</span> <span class="token operator">AND</span> city<span class="token operator">=</span><span class="token string">'宜兰县'</span> <span class="token operator">AND</span> county<span class="token operator">=</span> <span class="token string">'中西区'</span><span class="token punctuation">;</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> id<span class="token punctuation">,</span>province<span class="token punctuation">,</span>city<span class="token punctuation">,</span>county <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> province <span class="token operator">=</span> <span class="token string">'上海'</span> <span class="token operator">AND</span> city<span class="token operator">=</span><span class="token string">'宜兰县'</span> <span class="token operator">AND</span> county<span class="token operator">=</span><span class="token string">'中西区'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>根据查询条件查询 1，2 都会先走二级索引，但是二级索引仅包含了 (province, city, county) 和 id 信息</p>
<ul>
<li>查询 1 是 select *，因此还有一些字段二级索引中没有，需要回表（查询聚簇索引）来获取其它字段信息</li>
<li>查询 2 的 select 中明确指出了需要哪些字段，这些字段在二级索引都有，就避免了回表查询</li>
</ul>
<p><strong>其它注意事项</strong></p>
<ul>
<li>表连接需要在连接字段上建立索引</li>
<li>不要迷信网上说法，具体情况具体分析</li>
</ul>
<p>例如：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">index</span> first_idx <span class="token keyword">on</span> big_person<span class="token punctuation">(</span>first_name<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/* 不会利用索引，因为优化器发现查询记录数太多，还不如直接全表扫描 */</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> first_name <span class="token operator">></span> <span class="token string">'Jenni'</span><span class="token punctuation">;</span>

<span class="token comment">/* 会利用索引，因为优化器发现查询记录数不太多 */</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> big_person <span class="token keyword">WHERE</span> first_name <span class="token operator">></span> <span class="token string">'Willia'</span><span class="token punctuation">;</span>

<span class="token comment">/* 同一字段的不同值利用 or 连接，会利用索引 */</span>
<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> big_person <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">or</span> id <span class="token operator">=</span> <span class="token number">190839</span><span class="token punctuation">;</span>

<span class="token comment">/* 不同字段利用 or 连接，会利用索引(底层分别用了两个索引) */</span>
<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> big_person <span class="token keyword">where</span> first_name <span class="token operator">=</span> <span class="token string">'David'</span> <span class="token operator">or</span> last_name <span class="token operator">=</span> <span class="token string">'Thomas'</span><span class="token punctuation">;</span>

<span class="token comment">/* in 会利用索引 */</span>
<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> big_person <span class="token keyword">where</span> first_name <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token string">'Mark'</span><span class="token punctuation">,</span> <span class="token string">'Kevin'</span><span class="token punctuation">,</span><span class="token string">'David'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">/* not in 不会利用索引的情况 */</span>
<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> big_person <span class="token keyword">where</span> first_name <span class="token operator">not</span> <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token string">'Mark'</span><span class="token punctuation">,</span> <span class="token string">'Kevin'</span><span class="token punctuation">,</span><span class="token string">'David'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/* not in 会利用索引的情况 */</span>
<span class="token keyword">explain</span> <span class="token keyword">select</span> id <span class="token keyword">from</span> big_person <span class="token keyword">where</span> first_name <span class="token operator">not</span> <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token string">'Mark'</span><span class="token punctuation">,</span> <span class="token string">'Kevin'</span><span class="token punctuation">,</span><span class="token string">'David'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>以上实验基于 5.7.27，其它如 !=、is null、is not null 是否使用索引都会跟版本、实际数据相关，以优化器结果为准</li>
</ul>
<h2 id="_5-查询语句执行流程" tabindex="-1"><a class="header-anchor" href="#_5-查询语句执行流程" aria-hidden="true">#</a> 5. 查询语句执行流程</h2>
<p><strong>要求</strong></p>
<ul>
<li>了解查询语句执行流程</li>
</ul>
<p><strong>执行 SQL 语句 select * from user where id = 1 时发生了什么</strong></p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210902082718756.png" alt="image-20210902082718756"></p>
<ol>
<li>
<p>连接器：负责建立连接、检查权限、连接超时时间由 wait_timeout 控制，默认 8 小时</p>
</li>
<li>
<p>查询缓存：会将 SQL 和查询结果以键值对方式进行缓存，修改操作会以表单位导致缓存失效</p>
</li>
<li>
<p>分析器：词法、语法分析</p>
</li>
<li>
<p>优化器：决定用哪个索引，决定表的连接顺序等</p>
</li>
<li>
<p>执行器：根据存储引擎类型，调用存储引擎接口</p>
</li>
<li>
<p>存储引擎：数据的读写接口，索引、表都在此层实现</p>
</li>
</ol>
<h2 id="_6-undo-log-与-redo-log" tabindex="-1"><a class="header-anchor" href="#_6-undo-log-与-redo-log" aria-hidden="true">#</a> 6. undo log 与 redo log</h2>
<p><strong>要求</strong></p>
<ul>
<li>理解 undo log 的作用</li>
<li>理解 redo log 的作用</li>
</ul>
<p><strong>undo log</strong></p>
<ul>
<li>回滚数据，以行为单位，记录数据每次的变更，一行记录有多个版本并存</li>
<li>多版本并发控制，即快照读（也称为一致性读），让查询操作可以去访问历史版本</li>
</ul>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210902083051903.png" alt="image-20210902083051903"></p>
<ol>
<li>每个事务会按照开始时间，分配一个单调递增的事务编号 trx id</li>
<li>每次事务的改动都会以行为单位记入回滚日志，包括当时的事务编号，改动的值等</li>
<li>查询操作，事务编号大于自己的数据是不可见的，事务编号小于等于自己的数据才是可见的
<ul>
<li>例如图中红色事务看不到 trx id=102 以及 trx id=101 的数据，只有 trx id=99 的数据对它可见</li>
</ul>
</li>
</ol>
<p><strong>redo log</strong></p>
<p>redo log 的作用主要是实现 ACID 中的持久性，保证提交的数据不丢失</p>
<ul>
<li>它记录了事务提交的变更操作，服务器意外宕机重启时，利用 redo log 进行回放，重新执行已提交的变更操作</li>
<li>事务提交时，首先将变更写入 redo log，事务就视为成功。至于数据页（表、索引）上的变更，可以放在后面慢慢做
<ul>
<li>数据页上的变更宕机丢失也没事，因为 redo log 里已经记录了</li>
<li>数据页在磁盘上位置随机，写入速度慢，redo log 的写入是顺序的速度快</li>
</ul>
</li>
</ul>
<p>它由两部分组成，内存中的 redo log buffer，磁盘上的 redo log file</p>
<ul>
<li>redo log file 由一组文件组成，当写满了会循环覆盖较旧的日志，这意味着不能无限依赖 redo log，更早的数据恢复需要 binlog</li>
<li>buffer 和 file 两部分组成意味着，写入了文件才真正安全，同步策略由参数 innodb_flush_log_at_trx_commit  控制
<ul>
<li>0 - 每隔 1s 将日志 write and flush 到磁盘</li>
<li>1 - 每次事务提交将日志 write and flush（默认值）</li>
<li>2 - 每次事务提交将日志 write，每隔 1s flush 到磁盘，意味着 write 意味着写入操作系统缓存，如果 MySQL 挂了，而操作系统没挂，那么数据不会丢失</li>
</ul>
</li>
</ul>
<h2 id="_7-锁" tabindex="-1"><a class="header-anchor" href="#_7-锁" aria-hidden="true">#</a> 7. 锁</h2>
<p><strong>要求</strong></p>
<ul>
<li>了解全局锁</li>
<li>了解表级锁</li>
<li>掌握行级锁</li>
</ul>
<p><strong>全局锁</strong></p>
<p>用作全量备份时，保证<strong>表与表之间的数据一致性</strong></p>
<p>如果不加任何包含，数据备份时就可能产生不一致的情况，如下图所示</p>
<p><img src="@source/interview/day05-数据库/讲义/img/image-20210902090302805.png" alt="image-20210902090302805"></p>
<p>全局锁的语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>flush <span class="token keyword">tables</span> <span class="token keyword">with</span> <span class="token keyword">read</span> <span class="token keyword">lock</span><span class="token punctuation">;</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>使用全局读锁锁定所有数据库的所有表。这时会阻塞其它所有 DML 以及 DDL 操作，这样可以避免备份过程中的数据不一致。接下来可以执行备份，最后用 unlock tables 来解锁</li>
</ul>
<blockquote>
<p><em><strong>注意</strong></em></p>
<p>但 flush tables 属于比较重的操作，可以使用 --single-transaction 参数来完成不加锁的一致性备份（仅针对 InnoDB 引擎的表）</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>mysqldump <span class="token comment">--single-transaction -uroot -p test > 1.sql</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<p><strong>表级锁 - 表锁</strong></p>
<ul>
<li>语法：加锁 lock tables 表名 read/write，解锁 unlock tables</li>
<li>缺点：粒度较粗，在 InnoDB 引擎很少使用</li>
</ul>
<p><strong>表级锁 - 元数据锁</strong></p>
<ul>
<li>
<p>即 metadata-lock（MDL），主要是为<strong>了避免 DML 与 DDL 冲突</strong>，DML 的元数据锁之间不互斥</p>
</li>
<li>
<p>加元数据锁的几种情况</p>
<ul>
<li><code v-pre>lock tables read/write</code>，类型为 SHARED_READ_ONLY 和 SHARED_NO_READ_WRITE</li>
<li><code v-pre>alter table</code>，类型为 EXCLUSIVE，与其它 MDL 都互斥</li>
<li><code v-pre>select，select … lock in share mode</code>，类型为 SHARED_READ</li>
<li><code v-pre>insert，update，delete，select for update</code>，类型为 SHARED_WRITE</li>
</ul>
</li>
<li>
<p>查看元数据锁（适用于 MySQL 8.0 以上版本）</p>
<ul>
<li><code v-pre>select object_type,object_schema,object_name,lock_type,lock_duration from performance_schema.metadata_locks;</code></li>
</ul>
</li>
</ul>
<p><strong>表级锁 - IS（意向共享） 与 IX（意向排他）</strong></p>
<ul>
<li>主要是<strong>避免 DML 与表锁冲突</strong>，DML 主要目的是加行锁，为了让表锁不用检查每行数据是否加锁，加意向锁（表级）来减少表锁的判断，意向锁之间不会互斥</li>
<li>加意向表锁的几种情况
<ul>
<li><code v-pre>select  … lock in share mode</code> 会加 IS 锁</li>
<li><code v-pre>insert，update，delete， select … for update</code> 会加 IX 锁</li>
</ul>
</li>
<li>查看意向表锁（适用于 MySQL 8.0 以上版本）
<ul>
<li><code v-pre>select object_schema,object_name,index_name,lock_type,lock_mode,lock_data from performance_schema.data_locks;</code></li>
</ul>
</li>
</ul>
<p><strong>行级锁</strong></p>
<ul>
<li>
<p>种类</p>
<ul>
<li>行锁 – 在 RC 下，锁住的是行，防止其他事务对此行 update 或 delete</li>
<li>间隙锁 – 在 RR 下，锁住的是间隙，防止其他事务在这个间隙 insert 产生幻读</li>
<li>临键锁 – 在 RR 下，锁住的是前面间隙+行，特定条件下可优化为行锁</li>
</ul>
</li>
<li>
<p>查看行级锁</p>
<ul>
<li><code v-pre>select object_schema,object_name,index_name,lock_type,lock_mode,lock_data from performance_schema.data_locks where object_name='表名';</code></li>
</ul>
</li>
</ul>
<blockquote>
<p><em><strong>注意</strong></em></p>
<ul>
<li>它们锁定的其实都是<strong>索引</strong>上的行与间隙，根据索引的有序性来确定间隙</li>
</ul>
</blockquote>
<p>测试数据</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> t <span class="token punctuation">(</span>id <span class="token keyword">int</span> <span class="token keyword">primary</span> <span class="token keyword">key</span><span class="token punctuation">,</span> name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>age <span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">key</span> <span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">insert</span> <span class="token keyword">into</span> t <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'zhangsan'</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">insert</span> <span class="token keyword">into</span> t <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'lisi'</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">insert</span> <span class="token keyword">into</span> t <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'wangwu'</span><span class="token punctuation">,</span><span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">insert</span> <span class="token keyword">into</span> t <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">'zhangsan'</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">insert</span> <span class="token keyword">into</span> t <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token string">'zhang'</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> t <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token string">'zhang'</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>说明</strong></p>
<ul>
<li>1,2,3,4 之间其实并不可能有间隙</li>
<li>4 与 8 之间有间隙</li>
<li>8 与 12 之间有间隙</li>
<li>12 与正无穷大之间有间隙</li>
<li>其实我们的例子中还有负无穷大与 1 之间的间隙，想避免负数可以通过建表时选择数据类型为 unsigned int</li>
</ul>
</blockquote>
<p>间隙锁例子</p>
<p>事务1：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">begin</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> t <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">9</span> <span class="token keyword">for</span> <span class="token keyword">update</span><span class="token punctuation">;</span> <span class="token comment">/* 锁住的是 8 与 12 之间的间隙 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>事务2：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">update</span> t <span class="token keyword">set</span> age<span class="token operator">=</span><span class="token number">100</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span> <span class="token comment">/* 不会阻塞 */</span>
<span class="token keyword">update</span> t <span class="token keyword">set</span> age<span class="token operator">=</span><span class="token number">100</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span> <span class="token comment">/* 不会阻塞 */</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> t <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token string">'aaa'</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* 会阻塞 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>临键锁和记录锁例子</p>
<p>事务1：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">begin</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> t <span class="token keyword">where</span> id <span class="token operator">>=</span> <span class="token number">8</span> <span class="token keyword">for</span> <span class="token keyword">update</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>临键锁锁定的是左开右闭的区间，与上条查询条件相关的区间有 (4,8]，(8,12]，(12,+∞)</li>
<li>临键锁在某些条件下可以被优化为记录锁，例如 (4,8] 被优化为只针对 8 的记录锁，前面的区间不会锁住</li>
</ul>
<p>事务2：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> t <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token string">'aaa'</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* 不会阻塞 */</span>
<span class="token keyword">update</span> t <span class="token keyword">set</span> age<span class="token operator">=</span><span class="token number">100</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span> <span class="token comment">/* 会阻塞 */</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> t <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token string">'aaa'</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* 会阻塞 */</span>
<span class="token keyword">update</span> t <span class="token keyword">set</span> age<span class="token operator">=</span><span class="token number">100</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span> <span class="token comment">/* 会阻塞 */</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> t <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">13</span><span class="token punctuation">,</span><span class="token string">'aaa'</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* 会阻塞 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


