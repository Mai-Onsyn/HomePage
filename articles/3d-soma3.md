# ~~废话~~

众所周知 soma3.0曲线是mc红石(特效)音乐圈的一种连续的插值特效曲线 由@[Soma-Komeiji](https://space.bilibili.com/4792711)大佬首发 可以给红石音乐带来很不错的视觉效果 但这种曲线是在平面上绘制的 灵活度不足 使得其很难在红石音乐以外的领域使用

根据我几个晚自习手画三维坐标系、手写代码和手算验证  下面是我得出的空间Soma3.0曲线绘制方法

![图片](//i0.hdslb.com/bfs/article/70163eaa5468fa14fc084212ea85c593544189344.png@1256w_696h_!web-article-pic.avif)

# 读前提醒

1.关于平面Soma3.0曲线的绘制 建议先去看@[Csrua](https://space.bilibili.com/361846321)大佬或@[SnowyKami](https://space.bilibili.com/233938750)大佬的专栏 以更好地理解Soma3.0曲线：

![卡片](//i0.hdslb.com/bfs/new_dyn/card/bdaf1ce5946e1fd841d6d3411c26e71a544189344.png)

![卡片](//i0.hdslb.com/bfs/new_dyn/card/cc61ce410591e59feb693cd8c25d1c11544189344.png)

2.本人数学不及格 本篇中部分数学方法是自学的 若有表达错误是正常的 还求勿喷

3.本篇的目的是完成问题 而不是研究问题 因此会有不严谨的地方 对我来说能用就行 能不深究问题就不深究

4.本篇的内容并不深奥 绘图是小学美术课教的 空间坐标系是高中数学课教的 只要你学过解析几何 再琢磨几下就一定能看懂 不然只能说你没认真看

![图片](//i0.hdslb.com/bfs/article/02db465212d3c374a43c60fa2625cc1caeaab796.png@progressive.webp)

# 准备工作

**1.坐标系与注意事项**

我习惯用左手坐标系 本篇都用左手坐标系 并且部分图片有颜色的内容与对应颜色文字对应

建议用网页端阅读 方便查看Geogebra的立体图表(GIF图下方的网址是该图的链接)

**2.直线的参数方程**

对于空间中的两点![P(p_x,p_y,p_z)\space,Q(q_x,q_y,q_z) ](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=P(p_x%2Cp_y%2Cp_z)%5Cspace%2CQ(q_x%2Cq_y%2Cq_z)%20) 经过这两点的直线为![l_{PQ}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=l_%7BPQ%7D) 则有![l_{PQ}=t\cdot \vec{PQ}+P=t\left[\begin{matrix}q_x-p_x\\q_y-p_y\\q_z-p_z\end{matrix}\right]+\left[\begin{matrix}p_x\\p_y\\p_z\end{matrix}\right]](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=l_%7BPQ%7D%3Dt%5Ccdot%20%5Cvec%7BPQ%7D%2BP%3Dt%5Cleft%5B%5Cbegin%7Bmatrix%7Dq_x-p_x%5C%5Cq_y-p_y%5C%5Cq_z-p_z%5Cend%7Bmatrix%7D%5Cright%5D%2B%5Cleft%5B%5Cbegin%7Bmatrix%7Dp_x%5C%5Cp_y%5C%5Cp_z%5Cend%7Bmatrix%7D%5Cright%5D)

**3.平面的方程**

对于空间中经过点![P(p_x,p_y,p_z)](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=P(p_x%2Cp_y%2Cp_z)) 且法向量为![\vec{v}=(v_x,v_y,v_z)](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bv%7D%3D(v_x%2Cv_y%2Cv_z))的平面的点法式方程为![S:v_x(x-p_x)+v_y(y-p_y)+v_z(z-p_z)=0](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=S%3Av_x(x-p_x)%2Bv_y(y-p_y)%2Bv_z(z-p_z)%3D0) 则其一般式方程为![S:v_xx+v_yy+v_zz-(v_xp_x+v_yp_y+v_zp_z)=0](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=S%3Av_xx%2Bv_yy%2Bv_zz-(v_xp_x%2Bv_yp_y%2Bv_zp_z)%3D0)

**4.平面的法向量**

对于不共线的两个非零向量![\vec a=(a_x,a_y,a_z), \vec b=(b_x,b_y,b_z)](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20a%3D(a_x%2Ca_y%2Ca_z)%2C%20%5Cvec%20b%3D(b_x%2Cb_y%2Cb_z)) 它们构成的平面的一个法向量为![\vec n=\vec a \times \vec b=\left[\begin{matrix}a_yb_z-a_zb_y\\a_zb_x-a_xb_z\\a_xb_y-a_yb_x\end{matrix}\right]](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20n%3D%5Cvec%20a%20%5Ctimes%20%5Cvec%20b%3D%5Cleft%5B%5Cbegin%7Bmatrix%7Da_yb_z-a_zb_y%5C%5Ca_zb_x-a_xb_z%5C%5Ca_xb_y-a_yb_x%5Cend%7Bmatrix%7D%5Cright%5D)

**5.平面的垂线**

对于不共线的两个非零向量![\vec a=(a_x,a_y,a_z), \vec b=(b_x,b_y,b_z)](https://api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20a%3D(a_x%2Ca_y%2Ca_z)%2C%20%5Cvec%20b%3D(b_x%2Cb_y%2Cb_z)) 它们构成的平面S中有一点P 则过P点且垂直于平面S的直线为 ![l=t(\vec a \times \vec b)+P](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=l%3Dt(%5Cvec%20a%20%5Ctimes%20%5Cvec%20b)%2BP)

**6.直线与平面的交点**

对于直线![l=t\cdot \vec{v}+P=t\left[\begin{matrix}v_x\\v_y\\v_z\end{matrix}\right]+\left[\begin{matrix}p_x\\p_y\\p_z\end{matrix}\right]](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=l%3Dt%5Ccdot%20%5Cvec%7Bv%7D%2BP%3Dt%5Cleft%5B%5Cbegin%7Bmatrix%7Dv_x%5C%5Cv_y%5C%5Cv_z%5Cend%7Bmatrix%7D%5Cright%5D%2B%5Cleft%5B%5Cbegin%7Bmatrix%7Dp_x%5C%5Cp_y%5C%5Cp_z%5Cend%7Bmatrix%7D%5Cright%5D) 和平面![S:Ax+By+Cz+D=0](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=S%3AAx%2BBy%2BCz%2BD%3D0) 将直线参数方程直接代入平面一般式方程 有![A(v_xt+p_x)+B(v_yt+p_y)+C(v_zt+p_z)+D=0](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=A(v_xt%2Bp_x)%2BB(v_yt%2Bp_y)%2BC(v_zt%2Bp_z)%2BD%3D0) 求得![t=-\frac {Ap_x+Bp_y+Cp_z+D}{Av_x+Bv_y+Cv_z}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=t%3D-%5Cfrac%20%7BAp_x%2BBp_y%2BCp_z%2BD%7D%7BAv_x%2BBv_y%2BCv_z%7D) 再将参数t代入直线参数方程 即可求得交点坐标

当![Ap_x+Bp_y+Cp_z+D\neq 0且Av_x+Bv_y+Cv_z=0](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=Ap_x%2BBp_y%2BCp_z%2BD%5Cneq%200%E4%B8%94Av_x%2BBv_y%2BCv_z%3D0)时 直线与平面平行(无交点) 当![Ap_x+Bp_y+Cp_z+D=Av_x+Bv_y+Cv_z=0](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=Ap_x%2BBp_y%2BCp_z%2BD%3DAv_x%2BBv_y%2BCv_z%3D0)时 直线在平面上(有无穷多交点)

**7.向量旋转公式**

对于空间中一向量![\vec v](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20v) 欲将其绕轴向量![\vec k](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20k) 沿轴向量![\vec k](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20k) 垂直向外的方向顺时针旋转θ角度 得到向量![\vec v_{rot}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20v_%7Brot%7D) 那么有![\vec v_{rot}=\vec v\cos\theta+(1-\cos\theta)(\vec k\cdot \vec v)\vec k+(\vec v\times\vec k)\sin\theta](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20v_%7Brot%7D%3D%5Cvec%20v%5Ccos%5Ctheta%2B(1-%5Ccos%5Ctheta)(%5Cvec%20k%5Ccdot%20%5Cvec%20v)%5Cvec%20k%2B(%5Cvec%20v%5Ctimes%5Cvec%20k)%5Csin%5Ctheta) 值得注意的是 轴向量![\vec k](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20k) 必须为单位向量(模长为1)

写代码计算时请全程使用弧度制 否则会因为角度与弧度之间的转换而丢失精度 浮点数精度丢失累积起来会造成极大的误差 并且在进行向量旋转操作时 最好在旋转前记录模长 用于矫正旋转后向量的模长 以防止向量模长越转越趋近于0或∞

# Soma3.0曲线绘制原理

空间Soma3.0曲线是平面Soma3.0曲线的延伸 要想知道空间Soma3.0曲线如何绘制 首先要搞懂平面Soma3.0曲线是怎么绘制的

![图片](//i0.hdslb.com/bfs/article/053655428d39476d0674749a355b1d08544189344.png@1256w_1438h_!web-article-pic.avif)

要用圆弧连接A、B、C三点 首先作AB于BC的中垂线 在AB中垂线上取一点D作为初始圆心 以D为圆心作圆弧连接A、B两点 然后作直线DB 交BC中垂线为点E 以E为圆心作圆弧BC

这样就用两段圆弧平滑地连接三个点了 将三个点的速度向量作出来 可以看到第一圆弧与第二圆弧的速度向量重合了 这样就做到了平滑地连接两个圆弧 而作中垂线的目的是为了让圆弧能同时经过待连接的两点 而D、B、E三点在同一直线上的目的是为了让切线重合

因此绘制Soma3.0的一个核心就是速度向量(切线)重合

# 空间圆弧

学过三角函数的都知道 要在平面上画一个半径为r的圆 那么圆上的点可表示为![(r\cos\theta,r\sin\theta)](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=(r%5Ccos%5Ctheta%2Cr%5Csin%5Ctheta)) 在[0~2π]范围内遍历θ角 即可穷举出圆 在特定区间内遍历θ角 即可穷举出圆弧 但三维圆环可没这么方便 需要其他的方法来绘制

好在有向量旋转公式 让空间圆的绘制变得没那么困难

空间圆环可以由圆心O、圆环上一点P(用于确定半径)和法(轴)向量![\vec k](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20k)来确定 由于向量旋转公式所表达的含义为 "空间中一向量![\vec v](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20v) 将其绕轴向量![\vec k](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20k) 沿轴向量![\vec k](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20k) 垂直向外的方向顺时针旋转θ角度后的向量" 因此空间圆环上的点可表达为![O+[\vec {OP}\cos\theta+(1-\cos\theta)(\vec k\cdot \vec {OP})\vec k+(\vec {OP}\times\vec k)\sin\theta]](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=O%2B%5B%5Cvec%20%7BOP%7D%5Ccos%5Ctheta%2B(1-%5Ccos%5Ctheta)(%5Cvec%20k%5Ccdot%20%5Cvec%20%7BOP%7D)%5Cvec%20k%2B(%5Cvec%20%7BOP%7D%5Ctimes%5Cvec%20k)%5Csin%5Ctheta%5D) 将θ在[0~2π]范围内遍历 即可得到圆环

但若要绘制圆弧 通过圆上两个点是不能唯一确定一条圆弧的 因此需要借助速度向量

![GIF](//i0.hdslb.com/bfs/article/23b1b7eb6f85f74bf3df2583aa995668544189344.gif@1256w_956h_!web-article-pic.avif)

https://www.geogebra.org/m/rtsq239v

如图 只需要知道D点的切线向量的方向和E点即可唯一确定一段圆弧 这里的速度向量仅提供方向信息 模长只要不为0即可 且方向总是与切线共线 也就是只有顺反时针两个方向

那么这个方向和旋转角度要怎么求呢？

将轴向量正对着自己 也就是从轴向量垂直向外的方向看去 并将速度向量的起点移到圆心 进行观察

![GIF](//i0.hdslb.com/bfs/article/fcb20cfe78d402072ed27d4012abcb52544189344.gif@1256w_1094h_!web-article-pic.avif)

https://www.geogebra.org/m/wptfswza

![\vec {AD'}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BAD'%7D)由![\vec {AD}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BAD%7D)沿轴向量顺时针旋转π/2得来 其方向为圆弧在D点的切线 而速度向量也是圆弧在D点的切线 计算![\vec {AD'}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BAD'%7D)与![\vec {DC}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BDC%7D)的夹角 若为0 则速度为顺时针; 若为π 则速度为逆时针 因此图中的点D的旋转方向为逆时针旋转

然后是旋转角度的计算

如上图 当α在[0~π/2]区间内时 旋转角度为β 当α在[π/2~π]区间时 旋转角度为2π-β 因为α是![\vec {AE}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BAE%7D)与![\vec {DC}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BDC%7D)的夹角 也就是速度向量与终点向量 因此不受旋转方向的影响 不管旋转方向的正反 都可以用上述方法计算

而![\vec {EF}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BEF%7D)(由于切线重合 它也就是下一段圆弧的起始速度向量) 可以通过![\vec {DC}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BDC%7D)绕轴向量沿旋转方向旋转旋转角度获得

# 空间Soma3.0曲线的圆心计算

由平面Soma3.0曲线的绘制过程可知 绘制连接两点的圆弧需要绘制中垂线 原理是两点中垂线上的点 到两端点的距离相等 也就可以确定半径绘制圆弧 而这个方法推广到空间坐标系中也同样适用 只不过是把中垂线换成了中垂面 因为在空间中 两点的中垂面上的点到两端点的距离相等

![GIF](//i0.hdslb.com/bfs/article/653fe6d2591027ce44d13c2bd349e27e544189344.gif@1256w_824h_!web-article-pic.avif)

https://www.geogebra.org/m/xzxpftbx

根据上述空间圆弧的绘制 可知绘制一段圆弧需要圆心 始末点和起始点速度向量的方向 但若是不知道圆心 也是可以通过速度向量计算出来的 下面是具体计算方法

![GIF](//i0.hdslb.com/bfs/article/7ccdbb555d0a39ac9fb8ff82797ea726544189344.gif@1256w_830h_!web-article-pic.avif)

https://www.geogebra.org/m/hpnzsm4c

如图 已知待连接的点A, B；A, B的中垂面U；A点的速度向量![\vec {AF}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BAF%7D)；圆弧所在平面S的法向量![\vec {AG}=\vec {AB}\times\vec {AF}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BAG%7D%3D%5Cvec%20%7BAB%7D%5Ctimes%5Cvec%20%7BAF%7D)

由于速度向量始终与圆心与点A的连线L垂直 且L在平面S上 因此直线L垂直于平面S的法向量 同时也垂直于速度向量 所以直线L为向量![\vec {AG}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BAG%7D)与![\vec {AF}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BAF%7D)所构成平面过点A的垂线 有![L=t(\vec {AG} \times \vec {AF})+A](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=L%3Dt(%5Cvec%20%7BAG%7D%20%5Ctimes%20%5Cvec%20%7BAF%7D)%2BA)

该圆弧同时满足：1.圆心到A, B的距离相等；2.![\vec {AF}](https://api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%20%7BAF%7D)为该圆弧在点A的切线

所以圆心I满足![I=U\cap L](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=I%3DU%5Ccap%20L)

# 空间Soma3.0曲线的递推

Soma3.0曲线是平滑曲线 那么两条直线之间的连接也是平滑的 所以有速度向量重合 上面也提到过 将起始速度向量沿旋转方向旋转圆弧的弧度旋转后即可得到下一段圆弧的起始速度向量 然后进行同样的操作即可

# 无圆心情况

当![U\cap L](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=U%5Ccap%20L)的参数t无法计算时(分母为0) 圆心不存在 此时无法使用Soma3.0曲线连接 可以用其他的平滑曲线连接 比如贝塞尔曲线 Catmull-null曲线等 或者嫌麻烦也可以直接直线连接 但都需要额外设置下一圆弧的初始速度向量

# 多点连接问题

Soma3.0曲线由于速度方向的原因 不能出现多点汇聚于一点的情况 对于需要多分支的连接 建议去看我这篇博客：

![卡片](//i0.hdslb.com/bfs/new_dyn/card/2a9a7b507907d3c9c8a1314251d252d4544189344.png)

这篇大致讲了空间中多点对多点连接的问题 可以用在本篇的Soma3.0曲线的绘制 当然 如果你只需要一条线到底 就不用考虑这些

![图片](//i0.hdslb.com/bfs/article/02db465212d3c374a43c60fa2625cc1caeaab796.png@progressive.webp)

# 代码思路

用代码来画平面Soma3.0曲线本身就是一件很麻烦的事 空间Soma3.0更是烧脑 所以在写代码之前需要好好理清代码的逻辑 下面是我的思路

工具准备

为了能使插值曲线的绘制有时间顺序性 而不是运行一次就把整条曲线画出来 用一个二维数组来存储生成粒子 同时也用二维数组存储待连接的点 用二维数组的目的是为了同时保留时间信息和位置信息 我用Java的List<List<Particle>>和List<List<Point>>来存储 并将List<List<Particle>>封装成一个Timeline类 方便操作 其一维存储第i时刻的粒子 二维是时间信息 单位是GameTick(gt) 每20位二维的索引就是一秒 用这种方法有一个弊端就是不能直接遍历二维列表 需要列一个连接点的索引列表来访问数据 连接列表我用一个int[][4]存储 二维存储列表 一维第1位存储p1的时刻 第2位存储p1的索引 第3位存储p2的时刻 第4位存储p2的索引

曲线的递推需要对速度向量进行存取操作 通过上一段圆弧的速度向量来计算下一段圆弧的速度向量 在迭代的时候这是个麻烦事 所以我干脆创建了一个ConnectList类来存储点的连接列表和每一个点所对应的向量(除最后一点外 连接列表中的每一个点都可作为起始点 也就可以存在速度向量) 直线和平面的表达我也通过创建类来简化代码的复杂度

主要逻辑

输入一个Timeline 获取待连接点的List<List<Point>>数组 因为无法确定输入的列表在第一时刻是否只有一个点 所以还需要将一个额外的点添加到列表的第一位(这样做的原因是初始向量只有一个 要是一开始就有多个点就没法分配初始向量) 因此需要手动指定的值有：

1.点列表(Timeline)

2.起始点(Point)

3.起始速度向量(Vector)

将起始速度向量添加到ConnectList的向量列表的第一位中 对应点列表第一时刻的第一个点(起始点)

遍历点列表(连接列表) 获取p1, p2和速度向量way 用上述计算圆心及绘制圆弧的方法绘制圆弧 将计算出来的圆弧上的点添加到一个主Timeline(Particle)中

ConnectList类逻辑

输入点列表 创建一个和点列表大小一致的速度向量列表 并通过点列表生成连接列表(空间多点连接)

创建方法来获取点，点列表，速度向量 和存储速度向量即可

~~也许直接看代码会更好懂~~

# 代码(Java)

```java
public class Soma3 implements Effect {

    private final Timeline timeline = new Timeline();

    public Soma3(Timeline sequence, Point startPoint, Vector startWay, double lambda, Particle sample) {
        //将设置的起始点插入到点列表中
        Timeline lists = new Timeline();
        lists.add(0, startPoint);
        lists.add(5, sequence);

        //创建数据访问工具并存储第一个向量
        ConnectList cList = new ConnectList(lists);
        cList.setVector(0, 0, startWay);

        for (int i = 0; i < cList.size(); i++) {
            int[] index = cList.getIndex(i);//获取一个连接列表

            Point p1 = cList.getPoint(index[0], index[1]);//列出待连接的两点
            Point p2 = cList.getPoint(index[2], index[3]);

            Vector way = cList.getVector(index[0], index[1]);//获取速度向量

            Vector n = Vector.crossProduct(way, Vector.of(p1, p2));//圆面法向量
            Surface midSurface = Surface.midOf(p1, p2);//待连接两点的中垂面
            Line l = new Line(p1, Vector.crossProduct(way, n));//垂直于速度向量与法向量且过圆心与p1的直线
            Point o = cross(l, midSurface);//直线与平面相交获得圆心

            if (o == null || Point.distance(o, p1) > 32) {
                //圆心不存在或圆弧半径过大的情况 直接用直线连接
                this.timeline.add(index[0], new Straight(p1, p2, index[2]-index[0], lambda, sample));
                //后一圆弧的速度向量设成直线的方向向量 可保证后一圆弧与直线相切 但不能保证前一圆弧与直线相切
                cList.setVector(index[2], index[3], Vector.of(p1, p2));
            }
            else {
                //圆心存在
                double rotateAngle = (Vector.angle(Vector.of(o, p2), way) < PI / 2) ? Vector.angle(Vector.of(o, p1), Vector.of(o, p2)) : 2 * PI - Vector.angle(Vector.of(o, p1), Vector.of(o, p2));//旋转角度的计算

                //切线
                Vector tangent = Vector.of(o, p1);
                tangent.rotate(n, PI / 2);

                //旋转方向 因为夹角只能等于0或π 直接比较数量积的正负即可
                boolean rotateWay = Vector.dotProduct(way, tangent) > 0;

                //下一段圆弧的起始向量
                Vector v1 = new Vector(way.vx(), way.vy(), way.vz());//复制一份免得污染
                v1.rotate(n, rotateWay ? rotateAngle : -rotateAngle);
                cList.setVector(index[2], index[3], v1);

                drawArc(o, n, p1, rotateAngle, rotateWay, index[0], index[2] - index[0], lambda, sample);
            }
        }
    }

    //求直线参数方程与平面一般方程的交点
    private Point cross(Line line, Surface surface) {
        double sub = surface.A * line.kx + surface.B * line.ky + surface.C * line.kz;
        double t = - (surface.A * line.dx + surface.B * line.dy + surface.C * line.dz + surface.D) /
                sub;//交点参数t
        if (abs(sub) < 1e-8) return null;//平行或包含情况
        else return new Point(
                line.kx * t + line.dx,
                line.ky * t + line.dy,
                line.kz * t + line.dz
        );
    }

    //参数：圆心 法向量 起始点 弧度大小 方向 起始游戏刻 持续时间 绘制密度 样本粒子
    private void drawArc(Point o, Vector n, Point p, double angle, boolean way, int tick, int duration, double lambda, Particle sample) {
        Vector k = Vector.of(o, p);//旋转向量
        //lambda的值对应到圆弧长度 根据弧长 绘制点的间隔为:lambda点/方块长度
        double range = Point.distance(o, p);
        double arcLength = angle * range;
        double count = ceil(arcLength * lambda);

        double step = angle / count;//旋转步进角
        this.timeline.add(0, new Particle(
                sample.getName(), p, sample.getColor(), sample.getRange(), sample.getCount(), sample.getLife(), new Expression(), sample.getGroup()
        ));//起始点

        for (int i = 1; i < count; i++) {
            k.rotate(n, way ? step : -step);//每转一步记录位置 即可形成圆弧
            this.timeline.add((int) (i / count * duration + tick), new Particle(
                    sample.getName(), Point.of(o, k), sample.getColor(), sample.getRange(), sample.getCount(), sample.getLife(), new Expression(), sample.getGroup()
            ));
        }
    }

    @Override
    public Timeline gettimeline() {
        return this.timeline;
    }
}

class Line {
    double kx, ky, kz, dx, dy, dz;

    //由点和方向向量构造直线
    public Line(Point a, Vector k) {
        kx = k.vx();
        ky = k.vy();
        kz = k.vz();
        dx = a.x();
        dy = a.y();
        dz = a.z();
    }

    //由两点构造直线
    public static Line of(Point p1, Point p2) {
        return new Line(p1, Vector.of(p1, p2));
    }
}

class Surface {
    double A, B, C, D;

    //由点法构造平面
    public Surface(Point o, Vector v) {
        A = v.vx();
        B = v.vy();
        C = v.vz();

        D = - (A * o.x() + B * o.y() + C * o.z());
    }

    //由两点构造中垂面
    public static Surface midOf(Point p1, Point p2) {
        Vector v = Vector.of(p1, p2);
        Point mid = Point.of(p1, Vector.multiply(v, 0.5));
        return new Surface(mid, v);
    }
}

class ConnectList {

    private final List<List<Point>> sequence;//点列表
    private final List<List<Vector>> vectors;//速度向量列表 与点列表一一对应
    private final List<int[]> connectList;//连接列表
    public ConnectList(Timeline timeline) {
        this.sequence = timeline.getAsPointSequence();
        this.vectors = new ArrayList<>(sequence.size());
        this.connectList = new ArrayList<>();
        genConnectList();
    }

    public Point getPoint(int tick, int i) {
        return sequence.get(tick).get(i);
    }

    public int[] getIndex(int i) {
        return connectList.get(i);//获取一个连接列表
    }

    public Vector getVector(int tick, int i) {
        return vectors.get(tick).get(i);
    }

    public void setVector(int tick, int i, Vector v) {
        while (vectors.size() <= tick) {
            vectors.add(new ArrayList<>());//扩容到指定大小
        }
        while (vectors.get(tick).size() <= i) {
            vectors.get(tick).add(null);//设置数据可能不在范围内 需要扩容
        }
        vectors.get(tick).set(i, v);
    }

    public int size() {
        return connectList.size();
    }

    //生成连接列表
    private void genConnectList() {
        //点列表并不是连续的 需要先遍历一遍找到所有有效点的索引 然后通过索引列表遍历
        List<Integer> notNull = new ArrayList<>();
        for (int i = 0; i < this.sequence.size(); i++) {
            if (!this.sequence.get(i).isEmpty()) {
                notNull.add(i);
            }
        }

        for (int i = 0; i < notNull.size() - 1; i++) {
            Point[] pl1 = this.sequence.get(notNull.get(i)).toArray(Point[]::new);//List<Point>转换到Point[]
            Point[] pl2 = this.sequence.get(notNull.get(i + 1)).toArray(Point[]::new);

            int[][] subList = MathUtil.genConnectList(pl1, pl2);//生成两组点的连接列表(int[][2])

            for (int[] index : subList) {
                if (index[1] == -1) continue;//列表中有不连的点 需要跳过
                this.connectList.add(new int[] {notNull.get(i), index[0], notNull.get(i + 1), index[1]});//将时间信息添加到列表中
            }
        }
    }

    /*
    //全程一条线也可以用的懒人方法
    private void genConnectList() {
        List<Integer> notNull = new ArrayList<>();
        for (int i = 0; i < this.sequence.size(); i++) {
            if (this.sequence.get(i).size() != 0) {
                notNull.add(i);
            }
        }

        for (int i = 0; i < notNull.size() - 1; i++) {
            this.index.add(new int[] {notNull.get(i), 0, notNull.get(i + 1), 0});
        }
    }
     */

}
```

# 测试

![图片](//i0.hdslb.com/bfs/article/8e9a31ecf5c571188e3307a32032b7f5544189344.png@1256w_1088h_!web-article-pic.avif)

![图片](//i0.hdslb.com/bfs/article/98cceb4c7e8f94327f46a968ed6c1b5e544189344.png@1256w_498h_!web-article-pic.avif)

# ~~结尾废话~~

一年多以前我初次接触到mcfunction 刚开始穷举粒子就写了平面Soma3.0曲线 现在技术怎么都进步了不少 当时看Soma3.0曲线看的头都炸了都没搞懂是怎么回事 我好歹也有半年高中的水平吧 现在来看Soma3.0曲线是真的不难 只要多钻总能搞懂的(∠・ω< )⌒☆

代码：https://github.com/Mai-Onsyn/ParticleEffects/blob/main/src/test/java/Soma3Demo.java