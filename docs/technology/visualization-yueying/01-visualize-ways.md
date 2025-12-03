<script setup>
import { CssBarGraph, CssPieGraph } from './codes/01'
</script>

# 01 浏览器中实现可视化的四种方式

渲染引擎绘制图形的方式：

1. HTML+CSS：普通 Web 页面
2. SVG
3. Canvas2D
4. WebGL

## HTML + CSS

### HTML 与 CSS 如何实现可视化？

#### 柱形图

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
  grid-template-columns: repeat(5, 20%); /* 5各等宽列，每列占 20% */
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

#### 饼图

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
