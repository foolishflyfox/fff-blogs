<script setup>
import { CssBarGraph, CssPieGraph, SvgBarGraph, CanvasBarGraph } from './codes/01'
</script>

# 01. 浏览器中实现可视化的四种方式

渲染引擎绘制图形的方式：

1. HTML+CSS：普通 Web 页面
2. SVG
3. Canvas2D
4. WebGL

## 方式一：HTML 与 CSS 实现可视化

### 柱形图

用 CSS 实现柱状图其实很简单，原理就是使用网络布局(Grid Layout) 加上线性渐变 (Linear-gradient)。例如柱状图：

<CssBarGraph />

其 CSS 代码如下：

```css
/**
  数据集：
  dateset = {
    current: [15, 11, 17, 25, 37],
    total: [25, 26, 40, 45, 68]
  }
 */
.bargraph {
  display: grid; /* 使用 Grid 布局 */
  width: 300px; /* 图表总宽度 */
  height: 450px; /* 图表总高度 */
  padding: 10px; /* 内边距 */
  grid-template-columns: repeat(5, 20%); /* 5个等宽列，每列占 20% */
}
.bargraph div {
  /* 每个柱子左右 2px 外边距，形成间隔 */
  margin: 0 2px;
}
.bargraph div:nth-child(1) {
  background: linear-gradient(
    /* 从上到下的渐变方向 */ to bottom,
    /* 从顶部到 75% 的位置是透明 */ transparent 75%,
    /* 从 75% 处开始变为蓝色 (#37c) */ #37c 0,
    /* 蓝色持续到 85% 的位置 */ #37c 85%,
    /* 从 85% 处开始变为绿色(#3c7)到底部 */ #3c7 0
  );
}
.bargraph div:nth-child(2) {
  /** 标准写法 */
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 74%,
    #37c 74%,
    #37c 89%,
    #3c7 89%,
    #3c7 100%
  );
}
.bargraph div:nth-child(3) {
  background: linear-gradient(
    to bottom,
    transparent 60%,
    #37c 0,
    #37c 83%,
    #3c7 0
  );
}
.bargraph div:nth-child(4) {
  background: linear-gradient(
    to bottom,
    transparent 55%,
    #37c 0,
    #37c 75%,
    #3c7 0
  );
}
.bargraph div:nth-child(5) {
  background: linear-gradient(
    to bottom,
    transparent 32%,
    #37c 0,
    #37c 63%,
    #3c7 0
  );
}
```

可以看到背景的设置类似：

```css
background: linear-gradient(
  to bottom,
  transparent 32%,
  #37c 0,
  #37c 63%,
  #3c7 0
);
```

**为什么这样写有效？**

CSS 规定允许：

1. 色标位置可以省略，浏览器会自动计算
2. 如果省略第一个色标的位置，默认为 0%
3. 如果省略最后一个色标的位置，默认为 100%
4. 如果省略中间色标的位置，会在前一个和后一个位置之间平均分布

在实践中，像 `#37c 0` 这种写法：

- 浏览器会理解为 `#37c 0%`
- 但前一个色标在 `75%`
- 所以实际上是创建了一个从 `75%` 到 `0%` 的负向渐变
- 浏览器会修正为两者都从 `75%` 开始

上述写法的标准写法为：

```css
background: linear-gradient(
  to bottom,
  transparent 0%,
  transparent 32%,
  #37c 32%,
  #37c 63%,
  #3c7 63%,
  #3c7 100%
);
```

### 饼图

下面是使用圆锥渐变绘制的饼图：

<CssPieGraph />

其 CSS 代码如下：

```css
.piegraph {
  display: inline-block;
  width: 250px;
  height: 250px;
  border-radius: 50%; /* 使其成为圆形 */
  background-image: conic-gradient(
    #37c 30deg,
    #3c7 30deg,
    #3c7 65deg,
    orange 65deg,
    orange 110deg,
    #f73 110deg,
    #f73 200deg,
    #ccc 200deg
  );
}
```

上述 `conic-gradient` 的属性含义为：

- `#37c 30deg`: 从 0° 到 30° 为 `#37c` 颜色；
- `#3c7 30deg`: 从 30° 到 30° 为从 `#37c` 到 `#3c7` 的渐变，但因为角度相同，表示从 `#37c` 到 `#3c7` 的突变；
- `#3c7 65deg`: 从 30° 到 65° 为从 `3c7` 到 `3c7` 的渐变，因为颜色相同，表示纯色填充；
- `orange 65deg`: 从 65° 开始颜色变为桔黄色；
- `orange 110deg`: 在 110° 结束桔黄色；
- `#f73 110deg`: 从 110° 开始 `#f73` 颜色；
- `#f73 200deg`: 在 200° 结束 `#f73` 颜色；
- `#ccc 200deg`: 从 200° 开始灰色，并持续到 360°；

### HTML+CSS 实现可视化的缺点

1. HTML 和 CSS 为网页布局而生，绘制可视化图表并不容易；
2. 从 CSS 代码，很难看出数据与图形的对应关系，维护麻烦；
3. 性能问题；

## 方式二：SVG

SVG（Scalable Vector Graphics，可缩放矢量图）是一种基于 XML 语法的图像格式，可以用图片(img 元素)的 src 属性加载。也可以内嵌 SVG 标签，并像普通 HTML 元素一样，利用 DOM API 操作 SVG 元素，甚至 CSS 也可以作用于内嵌的 SVG 元素。

### 柱形图

下面是用 SVG 绘制的柱形图。

<SvgBarGraph />

代码为：

```html
<!-- 在网页上显示大小为 300px 宽，450px 高 -->
<!-- 视口(内部坐标系)：宽 60 单位，高 100 单位 -->
<svg width="300px" height="450px" viewBox="0 0 60 100">
  <!-- 将原点从左上角移到左下角，并翻转 Y 轴 -->
  <!-- 创建了标准的数学坐标系：原点在左下角，Y 轴向上 -->
  <g transform="translate(0, 100) scale(1, -1)">
    <!-- 第一组 -->
    <g>
      <!-- x, y 为柱形左下角坐标，width 为柱形宽度，height 为柱形高度，fill 表示蓝色填充 -->
      <rect x="1" y="0" width="10" height="25" fill="#37c" />
      <rect x="13" y="0" width="10" height="26" fill="#37c" />
      <rect x="25" y="0" width="10" height="40" fill="#37c" />
      <rect x="37" y="0" width="10" height="45" fill="#37c" />
      <rect x="49" y="0" width="10" height="68" fill="#37c" />
    </g>
    <g>
      <rect x="1" y="0" width="10" height="15" fill="#3c7" />
      <rect x="13" y="0" width="10" height="11" fill="#3c7" />
      <rect x="25" y="0" width="10" height="17" fill="#3c7" />
      <rect x="37" y="0" width="10" height="25" fill="#3c7" />
      <rect x="49" y="0" width="10" height="37" fill="#3c7" />
    </g>
  </g>
</svg>
```

在 SVG 代码中，`g` 表示分组，`rect` 表示矩形元素，除了 `rect` 外，SVG 还提供了丰富的图形元素，如椭圆、圆弧、多边形、贝塞尔曲线等等。

SVG 绘制图表和 HTML+CSS 的方式差别不大，只是将 HTML 标签替换成 SVG 标签，应用了 SVG 支持的特殊属性。

HTML 的不足之处在于 HTML 元素的形状一般是矩形，虽然用 CSS 辅助，也能绘制出各种其他形状，甚至不规则图形，但总体还是很麻烦。SVG 弥补了这个不足，让不规则图形绘制变得更简单。

但是和 HTML 元素一样，还是存在性能问题。

## 方式三：Canvas2D

HTML+CSS 和 SVG 都属于**声明式**绘图系统，而 Canvas2D 是通过调用绘图指令进行图形绘制，是一种**指令式**的绘图系统。

<CanvasBarGraph />

对应的逻辑为：

```js
const dataset = {
  total: [25, 26, 40, 45, 68],
  current: [15, 11, 17, 25, 37],
};
// 柱数量
const barCount = dataset.total.length;
const canvas = document.querySelector(
  "canvas#graph-bar"
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
// 每列的宽度
const splitWidth = canvas.width / barCount;
// 每个柱宽度
const barWidth = 45;
for (let i = 0; i < barCount; ++i) {
  const x = i * splitWidth;
  const totalY = Math.round(((100 - dataset.total[i]) * canvas.height) / 100);
  const currentY = Math.round(
    ((100 - dataset.current[i]) * canvas.height) / 100
  );
  const totalHeight = canvas.height - totalY;
  const currentHeight = canvas.height - currentY;
  ctx.fillStyle = "#37c";
  ctx.fillRect(x, totalY, barWidth, totalHeight);
  console.log(x, totalY, barWidth, totalHeight);
  ctx.fillStyle = "#3c7";
  ctx.fillRect(x, currentY, barWidth, currentHeight);
}
```

Canvas 能够直接操作绘图上下文，不需要经过 HTML、CSS 解析、构建渲染、布局等一系列操作。因此单纯绘图的话，Canvas 比 HTML+CSS 和 SVG 要快得多。

但因为 HTML 和 SVG 一个元素对应一个基本图形，我们可以很方便地操作它们。同样的功能在 Canvas 上就比较难实现了。

## 方式四：WebGL

WebGL 绘制比前三种方式要复杂一些，因为 WebGL 是基于 OpenGL ES 规范的浏览器实现的，API 相对更底层，使用起来不如前三种那么简单直接。

一般情况下，Canvas2D 绘制图形的性能已经足够高了，但是在三种情况下我们有必要直接操作更强大的 GPU 来实现绘图。

1. 要绘制的图形数量非常多，比如有多达上万个几何图形需要绘制，而且它们的位置和方向都在不停变化，Canvas2D 还是会存在性能瓶颈，此时我们需要使用 GPU 能力，直接用 WebGL 来绘制；
2. 要对较大图像的细节做像素处理，比如实现物体的光影、流体效果和一些复杂的像素滤镜，因为这些效果往往要精确地改变一个图像全局或局部区域的所有像素点，要计算的像素点数量非常多(数十万甚至上百万像素)，也需要 GPU 优化性能；
3. 绘制 3D 物体，WebGL 内置了对 3D 物体的投影、深度检测等特性，因此非常适合用它来渲染 3D 物体；
