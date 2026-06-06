# ~~废话~~

万万没想到 我竟然为了一个旋转特效写了3篇博客 不过这次应该就是最后一次了

为达成让粒子旋转的效果 我在[CV29876537](//www.bilibili.com/read/cv29876537?from=articleDetail)使用FFT解析函数 又在[CV31322238](//www.bilibili.com/read/cv31322238?from=articleDetail)使用三角函数图像解析函数 但都是基于穷举的 并不能做到绝对的精确 并且计算量极大

新学期开学 数学讲了导数 然后我就想....根本不用穷举嘛

并且 本篇解决了图形旋转起来会变形的问题 感兴趣就继续往下看吧

![图片](http://cdn.jsdelivr.net/gh/Mai-Onsyn/ExternalLinkCDN/images/home-site/blog/bili-divider-1.webp)

# 公式推导

这是三维向量旋转公式：![\vec{v_{rot}}=\vec{v}\cos\theta+(1-\cos\theta)(\vec{k}\cdot\vec{v})\vec{k}+(\vec{k}\times\vec{v})\sin\theta](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bv_%7Brot%7D%7D%3D%5Cvec%7Bv%7D%5Ccos%5Ctheta%2B(1-%5Ccos%5Ctheta)(%5Cvec%7Bk%7D%5Ccdot%5Cvec%7Bv%7D)%5Cvec%7Bk%7D%2B(%5Cvec%7Bk%7D%5Ctimes%5Cvec%7Bv%7D)%5Csin%5Ctheta)

它表示一个向量 ![\vec{v}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bv%7D) 绕向量 ![\vec{k}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bk%7D) 沿 ![\vec{k}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bk%7D) 垂直向外的顺时针方向旋转θ角度后的位置

将θ作为自变量   ![\vec{v_{rot}}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bv_%7Brot%7D%7D) 作为因变量 就可以得到一个关于t的函数![f(t)](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=f(t))

即：![f(t)=\vec{v}\cos(t)+(1-\cos(t))(\vec{k}\cdot\vec{v})\vec{k}+(\vec{k}\times\vec{v})\sin(t)\\ \quad\quad\!\!=(\vec{k}\times\vec{v})\sin(t)+(\vec{v}-(\vec{k}\cdot\vec{v})\vec{k})\cos(t)+(\vec{k}\cdot\vec{v})\vec{k}\\ \quad\quad\quad\!\!=\sqrt{(\vec{v}-(\vec{k}\cdot\vec{v})\vec{k})^2+(\vec{k}\times\vec{v})^2}\sin(t+\phi)+(\vec{k}\cdot\vec{v})\vec{k}\\ 其中，\sin\phi=\frac{\vec{k}\times\vec{v}}{\sqrt{(\vec{v}-(\vec{k}\cdot\vec{v})\vec{k})^2+(\vec{k}\times\vec{v})^2}} ，\cos\phi=\frac{\vec{v}-(\vec{k}\cdot\vec{v})\vec{k}}{\sqrt{(\vec{v}-(\vec{k}\cdot\vec{v})\vec{k})^2+(\vec{k}\times\vec{v})^2}}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=f(t)%3D%5Cvec%7Bv%7D%5Ccos(t)%2B(1-%5Ccos(t))(%5Cvec%7Bk%7D%5Ccdot%5Cvec%7Bv%7D)%5Cvec%7Bk%7D%2B(%5Cvec%7Bk%7D%5Ctimes%5Cvec%7Bv%7D)%5Csin(t)%5C%5C%0A%5Cquad%5Cquad%5C!%5C!%3D(%5Cvec%7Bk%7D%5Ctimes%5Cvec%7Bv%7D)%5Csin(t)%2B(%5Cvec%7Bv%7D-(%5Cvec%7Bk%7D%5Ccdot%5Cvec%7Bv%7D)%5Cvec%7Bk%7D)%5Ccos(t)%2B(%5Cvec%7Bk%7D%5Ccdot%5Cvec%7Bv%7D)%5Cvec%7Bk%7D%5C%5C%0A%5Cquad%5Cquad%5Cquad%5C!%5C!%3D%5Csqrt%7B(%5Cvec%7Bv%7D-(%5Cvec%7Bk%7D%5Ccdot%5Cvec%7Bv%7D)%5Cvec%7Bk%7D)%5E2%2B(%5Cvec%7Bk%7D%5Ctimes%5Cvec%7Bv%7D)%5E2%7D%5Csin(t%2B%5Cphi)%2B(%5Cvec%7Bk%7D%5Ccdot%5Cvec%7Bv%7D)%5Cvec%7Bk%7D%5C%5C%0A%E5%85%B6%E4%B8%AD%EF%BC%8C%5Csin%5Cphi%3D%5Cfrac%7B%5Cvec%7Bk%7D%5Ctimes%5Cvec%7Bv%7D%7D%7B%5Csqrt%7B(%5Cvec%7Bv%7D-(%5Cvec%7Bk%7D%5Ccdot%5Cvec%7Bv%7D)%5Cvec%7Bk%7D)%5E2%2B(%5Cvec%7Bk%7D%5Ctimes%5Cvec%7Bv%7D)%5E2%7D%7D%20%EF%BC%8C%5Ccos%5Cphi%3D%5Cfrac%7B%5Cvec%7Bv%7D-(%5Cvec%7Bk%7D%5Ccdot%5Cvec%7Bv%7D)%5Cvec%7Bk%7D%7D%7B%5Csqrt%7B(%5Cvec%7Bv%7D-(%5Cvec%7Bk%7D%5Ccdot%5Cvec%7Bv%7D)%5Cvec%7Bk%7D)%5E2%2B(%5Cvec%7Bk%7D%5Ctimes%5Cvec%7Bv%7D)%5E2%7D%7D)

它表示一个向量 ![\vec{v}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bv%7D) 绕向量 ![\vec{k}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bk%7D) 沿 ![\vec{k}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bk%7D) 垂直向外的顺时针方向旋转的位移图像

将 ![\vec{v}-(\vec{k}\cdot\vec{v})\vec{k}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bv%7D-(%5Cvec%7Bk%7D%5Ccdot%5Cvec%7Bv%7D)%5Cvec%7Bk%7D) 与 ![\vec{k}\times\vec{v}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bk%7D%5Ctimes%5Cvec%7Bv%7D)看作一个整体 对![f(t)](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=f(t))进行求导：![f'(t)=\sqrt{a^2+b^2}\cos(t+\phi)\\ \quad\quad\quad\quad\!\!=\sqrt{a^2+b^2}\sin(t+\phi+\alpha)\\ 其中，a=\vec{v}-(\vec{k}\cdot\vec{v})\vec{k}，b=\vec{k}\times\vec{v}， \sin\phi=\frac{b}{\sqrt{a^2+b^2}}，\cos\phi=\frac{a}{\sqrt{a^2+b^2}}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=f%27(t)%3D%5Csqrt%7Ba%5E2%2Bb%5E2%7D%5Ccos(t%2B%5Cphi)%5C%5C%0A%5Cquad%5Cquad%5Cquad%5Cquad%5C!%5C!%3D%5Csqrt%7Ba%5E2%2Bb%5E2%7D%5Csin(t%2B%5Cphi%2B%5Calpha)%5C%5C%0A%E5%85%B6%E4%B8%AD%EF%BC%8Ca%3D%5Cvec%7Bv%7D-(%5Cvec%7Bk%7D%5Ccdot%5Cvec%7Bv%7D)%5Cvec%7Bk%7D%EF%BC%8Cb%3D%5Cvec%7Bk%7D%5Ctimes%5Cvec%7Bv%7D%EF%BC%8C%0A%5Csin%5Cphi%3D%5Cfrac%7Bb%7D%7B%5Csqrt%7Ba%5E2%2Bb%5E2%7D%7D%EF%BC%8C%5Ccos%5Cphi%3D%5Cfrac%7Ba%7D%7B%5Csqrt%7Ba%5E2%2Bb%5E2%7D%7D)

它表示一个向量 ![\vec{v}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bv%7D) 绕向量 ![\vec{k}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bk%7D) 沿 ![\vec{k}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bk%7D) 垂直向外的顺时针方向旋转的速度图像 即ColorBlock的<SpeedExpression>所需的格式 至于为什么有α 在实际计算中相位角不等于算出的φ角 根据我的测试 若使用sin函数 实际角为φ+π

如此就求得了我前两篇博客用穷举的方法求来的振幅A与相位φ 接下来的操作类似

# 细化部分

**1.如何改变旋转方向**

这很简单 首先将表达式的自变量t变为-t 然后在相位φ上加上π

如：

"vx=114*sin(t+1919);vy=0;vz=514*sin(t+1818)"

↓

"vx=114*sin(-t+1919+π);vy=0;vz=514*sin(-t+1818+π)"

**2.角速度问题**

因为粒子的旋转速度是自定的 计算函数的频率为1 若要改变旋转速度 将表达式中的自变量乘上角速度 振幅同样乘上角速度即可

如：

"vx=114*sin(t+1919);vy=0;vz=514*sin(t+1818)"

↓

"vx=114*721*sin(721*t+1919);vy=0;vz=514*721*sin(721*t+1818)"

**3.相位计算问题**

由于相位φ的范围为[0~2π] 单凭一个反三角函数是不能算的 因此使用sin值与cos值共同来确定 可以看下角度变化和这些函数之间的关系：

![GIF](http://cdn.jsdelivr.net/gh/Mai-Onsyn/ExternalLinkCDN/images/home-site/blog/particle-rotate/rotate1.webp)

可以看到 当sinφ>=0时 取arccosφ即为原φ角；当sinφ<0时 取2π-arccosφ即为原φ角

但在我的测试中 使用sin函数时 实际角比φ多了一个π 我也懒得摸懂什么问题了 只是加一个π而已 能用就行 又不是什么严谨的数学论证

**4.初始向量选取问题**

对于粒子坐标P 要绕起点为Q的向量 ![\vec{k}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bk%7D) 旋转 对于我这个方法 最好满足![\vec{QP}\perp\vec{k}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7BQP%7D%E2%8A%A5%5Cvec%7Bk%7D) 我是以两个向量互相垂直为前提计算的 不垂直的情况我不保证 并且 向量旋转公式的轴向量 ![\vec{k}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bk%7D) 的模长必须为1

![图片](http://cdn.jsdelivr.net/gh/Mai-Onsyn/ExternalLinkCDN/images/home-site/blog/particle-rotate/rotate2.webp)

已知点P 点Q 向量 ![\vec{k}](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bk%7D)(模长为1) 则 ![\vec{v}=\vec{MP}=\vec{QP}-\vec{k}*|\vec{QP}|*\cosθ](//api.bilibili.com/x/web-frontend/mathjax/tex?formula=%5Cvec%7Bv%7D%3D%5Cvec%7BMP%7D%3D%5Cvec%7BQP%7D-%5Cvec%7Bk%7D*%7C%5Cvec%7BQP%7D%7C*%5Ccos%CE%B8)

**4.图形旋转变形问题**

如果一切准备就绪 那么就可以开始对图形进行旋转处理 但若是将图形中的每一个粒子都用上述方式添加速度表达式 那么一定会出现下面的问题：

![GIF](http://cdn.jsdelivr.net/gh/Mai-Onsyn/ExternalLinkCDN/images/home-site/blog/particle-rotate/rotate3.webp)

没错 就是变形!

要追究这问题的本质是什么 首先要从单个粒子的运动开始分析

用循环命令方块在固定位置生成粒子 再用一个粒子确定其圆心 用铁块做底方便观察半径 其中 紫色圈出点为粒子生成点 紫色箭头为粒子旋转方向

![图片](http://cdn.jsdelivr.net/gh/Mai-Onsyn/ExternalLinkCDN/images/home-site/blog/particle-rotate/rotate4.webp)

particleex normal end_rod 8.0 5.0 -1.0 1 1 1 1 0 0 0 0 0 0 1 0 "vx=0.4472135955*sin(0.2*t+0.4636476090);vy=0;vz=0.4472135955*sin(0.2*t+5.1760365894)" 1 null

可以看到 画出的圆在x正及z负方向上的半径均大于反方向 而巧合的是 当t=0时 vx和vz存在x正及z负方向的速度

若这样看不明显 ColorBlock的<SpeedExpression>参数除了接收vx vy vz 还可以添加颜色表达式cr cg cb 用这个生成一个粒子 问题就更明显了

![GIF](http://cdn.jsdelivr.net/gh/Mai-Onsyn/ExternalLinkCDN/images/home-site/blog/particle-rotate/rotate5.webp)

particleex normal end_rod ~ ~1 ~ 1 1 1 1 0 0 0 0 0 0 1 0 "cr=sin(t/100);cg=0;cb=0" 1.0 null

可以看到 刚生成时的粒子有一瞬间是<Pos>后面的<Color>参数的颜色 也就是白色 并不是t=0时cr cg cb所表达的黑色 后续才变成<SpeedExpression>所表达的颜色

回到速度问题上 通过我的观察 速度表达式t=0时的处理方式似乎与颜色的不同 但问题类似 这可以算是ColorBlock的bug吧？ 速度表达式中粒子会多行进速度表达式t=0时一半的位移 换句话来说 粒子在t=0时移动的并不是1gt速度表达式t=0时的位移 而是移动了1.5gt 用1/(1+E^(-128*(t-0.5)))这个函数屏蔽掉t=0时的速度（该函数当t<=0时函数值无限接近0 而>0时函数值无限接近1） 将屏蔽后的粒子与未屏蔽的原粒子和正确的粒子进行对比 其中 正确的粒子的圆周应在铁块夹角上

![图片](http://cdn.jsdelivr.net/gh/Mai-Onsyn/ExternalLinkCDN/images/home-site/blog/particle-rotate/rotate6.webp)

白色为particleex normal end_rod 8.0 5.0 -1.0 1 1 1 01 0 0 0 0 0 0 1 0 "vx=0.4472135955*sin(0.2*t+0.4636476090);vy=0;vz=0.4472135955*sin(0.2*t+5.1760365894)" 1 null     品红色为particleex normal end_rod 7.9 5.0 -0.8 1 0 1 1 0 0 0 0 0 0 1 0 "vx=0.4472135955*sin(0.2*t+0.4636476090);vy=0;vz=0.4472135955*sin(0.2*t+5.1760365894)" 1 null     黄色为particleex normal end_rod 8.0 5.0 -1.0 1 1 0 1 0 0 0 0 0 0 1 0 "vx=1/(1+E^(-128*(t-0.5)))*0.4472135955*sin(0.2*t+0.4636476090);vy=0;vz=1/(1+E^(-128*(t-0.5)))*0.4472135955*sin(0.2*t+5.1760365894)" 1 null

可以大致发现 屏蔽后的粒子偏移方向反过来了 顺着这个套路 因为初始速度会多1/2 减去初始速度会少1/2 那么可以做出"将粒子生成点向初速度反方向移动1/2初速度大小的位移即为正确的粒子"的假设 经过我的实验 这个假设是成立的！

```java
particle.setPosition(new Point(
	particle.getPosition().x() - vx0 * 0.5 * (way ? 1 : -1),//考虑旋转方向
	particle.getPosition().y() - vy0 * 0.5 * (way ? 1 : -1),
	particle.getPosition().z() - vz0 * 0.5 * (way ? 1 : -1)
));
```

![GIF](http://cdn.jsdelivr.net/gh/Mai-Onsyn/ExternalLinkCDN/images/home-site/blog/particle-rotate/rotate7.webp)

![图片](http://cdn.jsdelivr.net/gh/Mai-Onsyn/ExternalLinkCDN/images/home-site/blog/bili-divider-2.webp)

# 代码

```java
public static void addRotation(Particle particle, Point o, Vector m, boolean way, double omega) {
        Vector k = new Vector(m.vx(), m.vy(), m.vz());//旋转向量复制一份免得污染
        k.setLength(1);//轴向量模长必须为1

        Vector qp = Vector.of(o, particle.getPosition());//向量qp
        Vector qm = Vector.multiply(k, cos(Vector.angle(k, qp)) * qp.length());//向量qm
        Vector v = Vector.subtract(qp, qm);//向量v

        Vector a = Vector.multiply(k, Vector.dotProduct(k, v));//换元减少复杂度
        Vector b = Vector.crossProduct(k, v);

        double xA = sqrt(pow(v.vx() - a.vx(), 2) + pow(b.vx(), 2));//x分量的振幅
        double yA = sqrt(pow(v.vy() - a.vy(), 2) + pow(b.vy(), 2));
        double zA = sqrt(pow(v.vz() - a.vz(), 2) + pow(b.vz(), 2));
        double xPhi = atan3(b.vx() / xA , (v.vx() - a.vx()) / xA) + (way ? 0 : PI);//x分量的相位
        double yPhi = atan3(b.vy() / yA , (v.vy() - a.vy()) / yA) + (way ? 0 : PI);
        double zPhi = atan3(b.vz() / zA , (v.vz() - a.vz()) / zA) + (way ? 0 : PI);

        double vx0;//t=0的速度
        double vy0;
        double vz0;

        if (abs(xA) < 1e-8) {
            particle.getExpression().addVx("0");//若振幅为0 那么后面的表达式没有意义 直接写0节省空间
            vx0 = 0;
        }
        else {
            particle.getExpression().addVx(String.format("%.10f*sin(" + (way ? 1 : -1) * omega + "*t+%.10f)", xA * omega, xPhi));
            vx0 = (way ? 1 : -1) * xA * omega * sin(xPhi);//t=0时的速度
        }

        if (abs(yA) < 1e-8) {
            particle.getExpression().addVy("0");
            vy0 = 0;
        }
        else {
            particle.getExpression().addVy(String.format("%.10f*sin(" + (way ? 1 : -1) * omega + "*t+%.10f)", yA * omega, yPhi));
            vy0 = (way ? 1 : -1) * yA * omega * sin(yPhi);
        }
        if (abs(zA) < 1e-8) {
            particle.getExpression().addVz("0");
            vz0 = 0;
        }
        else{
            particle.getExpression().addVz(String.format("%.10f*sin(" + (way ? 1 : -1) * omega + "*t+%.10f)", zA * omega, zPhi));
            vz0 = (way ? 1 : -1) * zA * omega * sin(zPhi);
        }

        particle.setPosition(new Point(
                particle.getPosition().x() - vx0 * 0.5 * (way ? 1 : -1),//偏移粒子生成点 解决变形问题
                particle.getPosition().y() - vy0 * 0.5 * (way ? 1 : -1),
                particle.getPosition().z() - vz0 * 0.5 * (way ? 1 : -1)
        ));
    }
```

```java
public static double atan3(double sin, double cos) {
        if (sin >= 0) {
            return acos(cos) + PI;//0~π
        }
        else {
            return PI - acos(cos);//π~2π
        }
    }
```

![图片](http://cdn.jsdelivr.net/gh/Mai-Onsyn/ExternalLinkCDN/images/home-site/blog/bili-divider-2.webp)

# 结尾

好了这应该就是粒子旋转的最终形态了 如果你有更好的方法请尽情提出

所有代码：https://github.com/Mai-Onsyn/ParticleEffects/blob/main/src/main/java/mai_onsyn/ParticleEffects/EffectUtils/ExpressionUtil.java