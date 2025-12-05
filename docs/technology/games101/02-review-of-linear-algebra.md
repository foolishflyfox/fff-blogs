# 回顾线性代数

图形学依赖于多种知识。

- 基础数学
  - 线性代数
  - 微积分
  - 统计于概率学
- 基础物理
  - 光学
  - 力学
- 其他
  - 信号处理
  - 数值分析
- 一点美学

## 向量

由 A 点到 B 点的有向线段成为向量 AB，记为：$\overrightarrow{AB}$，若 A 点的坐标为 $(x_a, y_a)$，B 点的坐标为 $(x_b, y_b)$，则 $\overrightarrow{AB}$ 的值为 $\begin{pmatrix} x_b-x_a \\ y_b-y_a \end{pmatrix}$ 。

通常向量写成 $\vec{a}$ 或者用粗体表示 $\mathbf{a}$ 。

向量包含方向和长度，没有指定绝对的起始位置。

## 向量归一化

向量 $\vec{a}$ 的模长记为 $\|\vec{a}\|$ 。

单位向量：

- 模长为 1 的向量称为单位向量；
- 计算一个向量的单位向量称为向量的归一化：$\hat{a} = \vec{a} / \|\vec{a}\|$
- 单位向量常用于表示一个方向

## 向量加法

从图形上看，满足平行四边形法则/三角形法则。

从数值上看，是对应坐标相加。

## 笛卡尔坐标系

向量在笛卡尔坐标系中的表示：$A = \begin{pmatrix}x \\ y \end{pmatrix}$；向量的转置可表示为 $A^T = (x, y)$，向量的模长可表示为 $\|A\| = \sqrt{x^2 + y^2}$

## 向量点乘

向量点乘: $\vec{a}\cdot\vec{b} = \|\vec{a}\|\|\vec{b}\|\cos{\theta}$

向量夹角余弦计算：

$$
\cos\theta = \frac{\vec{a}\cdot\vec{b}}{\|\vec{a}\|\|\vec{b}\|}
$$

对于单位向量的夹角余弦计算：$\cos\theta = \hat{a}\cdot\hat{b}$

点乘符合的运算规则：

- 交换律：$\vec{a}\cdot\vec{b}=\vec{b}\cdot\vec{a}$
- 分配率：$\vec{a}\cdot(\vec{b}+\vec{c})=\vec{a}\cdot\vec{b}+\vec{a}\cdot\vec{c}$
- 结合律：$(k\vec{a})\cdot\vec{b}=\vec{a}\cdot(k\vec{b})=k(\vec{a}\cdot\vec{b})$

## 向量叉乘
