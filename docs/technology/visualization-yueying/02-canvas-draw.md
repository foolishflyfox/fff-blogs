<script setup>
import { CitiesTopo } from './codes/02';
</script>

# 02 指令式绘图系统：如何用 Canvas 绘制层次关系图

## 如何用 Canvas 绘制几何图形？

### Canvas 元素和 2D 上下文

Canvas 时 HTML 元素，用 `<canvas />` 标签将它插入到 HTML 内容中。比如，我们可以在 body 中插入一个宽、高分别为 512 的 canvas 元素。

```html
<body>
  <canvas width="512" height="512"></canvas>
</body>
```

注意：Canvas 元素上的 `width` 和 `height` 属性不等同于 Canvas 元素的 CSS 样式的属性。CSS 属性中的宽高影响 Canvas 在页面上呈现的大小，而 HTML 属性中的宽高则决定了 Canvas 的坐标系。

我们称 Canvas 的 HTML 属性宽高为**画布宽高**，CSS 样式宽高为**样式宽高**。

在实际绘制时，如果我们不设置 Canvas 元素的样式，那么 Canvas 元素的样式宽高的像素值就等于画布宽高。

### Canvas 坐标系

Canvas 的坐标系和浏览器窗口的坐标系类似，它们都默认左上角为坐标原点，x 轴水平向右，y 轴垂直向下。

### 利用 Canvas 绘制几何图形

**第一步：获取 Canvas 上下文**

```js
const canvas = document.querySelector("canvas");
```

获取了 canvas 元素后，就可以通过 `getContext` 拿到上下文对象：

```js
const context = canvas.getContext("2d");
```

**第二步，用 Canvas 上下文绘制图形**

context 对象上的 API 大体可以分为两类：

1. 设置状态的 API，可以设置或改变当前的绘图状态，如修改绘制图形的颜色、线宽、坐标转换等；
2. 绘制指令 API，用来绘制不同形状的几何图形；

绘制矩形的代码：

```js
const rectSize = [10, 10];
context.fillStyle = "red";
context.beginPath();
context.rect(0.5 * canvas.width, 0.5 * canvas.height, ...rectSize);
context.fill();
```

3. 调用 `beginPath` 指令开始绘制图形
4. 调用绘图指令，如 `rect` 表示绘制矩形
5. 调用 `fill` 指令，将绘制内容输出到画布

## 用 Canvas 绘制层次关系图

有以下的城市描述的对象：

```js
const cities = {
  name: "中国",
  children: [
    {
      name: "浙江",
      children: [
        { name: "杭州" },
        { name: "宁波" },
        { name: "温州" },
        { name: "绍兴" },
      ],
    },
    {
      name: "广西",
      children: [
        { name: "南宁" },
        { name: "桂林" },
        { name: "柳州" },
        { name: "防城港" },
      ],
    },
    ... ...
  ]
}
```

该对象中有 “城市 > 省份 > 中国” 这样的层级数据，我们要将它与绘图指令建立联系。即我们要将数据的层级、位置和要绘制的圆的半径、位置对应起来，将数据转换成图形信息。可以用 `d3.hierarchy` 这个工具库转换数据，代码如下：

```js
const regions = d3
  .hierarchy(cities) // 把原始数据转成D3 能理解的树形结构对象，
  .sum((d) => 1)
  .sort((a, b) => b.value! - a.value!);
const pack = d3.pack().size([1600, 1600]).padding(3);
const root = pack(regions as any);
```

其中 `d3.hierarchy(cities)` 的作用是将原始数据转成 D3 能理解的树形结构对象，方便后续布局算法使用，该函数返回一个 **标准的 D3 树节点**，它包含如下字段：

- `data`: 原始数据；
- `children`: 子节点数组；
- `parent`: 父节点
- `depth`: 当前节点深度，根为 0
- `height`: 当前节点高度，叶子为 0

`d3.hierarchy(cities).sum((d) => 1)` 中 `sum` 的作用是：把以叶子节点为 1 的权重，自底向上累加，写到每个节点的 `.value` 上。

`d3.hierarchy(cities).sum(d => 1).sort((a,b) -> b.value - a.value)` 中 `sort` 的作用是将整颗树按节点的 `value` 从大到小重新排序。

`d3.pack().size([1600, 1600]).padding(3)` 表示把整棵圆包图压进 1600×1600 的大盒子，并让每对圆之间至少留出 3 像素呼吸空间。

`pack(regions)` 表示将前面配置好的圆形打包布局算法应用到以 `regions` 为根的这棵层次数据上。

这样，我们就获得了包含几何图形信息的数据对象。此时它的内部结构为：

```js
{
  data: { name: '中国', children: [...] },
  children: [
    {
      data: { name: '甘肃', children: [...] },
      value: 7,
      r: 241.76200724808115,
      value: 7,
      x: 556.7915432925399,
      y: 803.0532967032353
    },
    ...
  ],
  value: 56,
  x: 800,
  y: 800,
  r: 799.99999
}
```

我们需要的信息是数据中的 `x`、`y`、`r` 这些值是前面调用 `d3.hierarchy` 算出来的。接下来只需用 Canvas 将它们绘制出来就可以了。具体绘制过程只需要遍历数据，并根据数据内容绘制图形了，绘制图形的过程分为两步。

第一步：在当前数据节点绘制一个圆，圆可以使用 `arc` 指令来绘制。`arc` 方法的五个参数分别是圆心的 x、y 坐标，半径 r、起始角度和结束角度，前三个参数就是数据中的 x、y 和 r。因为我们要绘制的是整个圆，所以后面的两个参数中起始角是 0，结束角是 2𝝅 。

第二步：绘制图层后，如果这个数据节点有下一级数据，我们遍历它的下一级数据，然后递归地对这些数据调用绘图过程。如果没有下一级数据，说明当前数据为城市数据，那么我们直接给出城市的名字，这一步可以通过 `fillText` 指令来完成。具体的代码如下所示：

```ts
// 不同深度的节点使用不同的颜色作为背景色
const bgColors = ["#eee", "#0bf", "#0f5"];
// 设置绘图时的描边
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.font = `bold 30px Arial`;
ctx.textAlign = "center"; // 设置文本水平居中
ctx.textBaseline = "middle"; // 设置文本垂直居中
ctx.translate(50, 50);
function drawNode(node: d3.HierarchyCircularNode<any>) {
  if (!node) return;
  // 绘制本节点的圆
  ctx.beginPath();
  ctx.fillStyle = bgColors[node.depth];
  ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  if (node.children?.length) {
    // 如果有子节点，递归绘制子节点
    for (const subNode of node.children) {
      drawNode(subNode);
    }
  } else {
    // 城市，绘制文本
    ctx.fillStyle = "#000";
    const cityName = node.data.name as string;
    ctx.fillText(cityName, node.x, node.y);
  }
}
drawNode(root);
```

实现效果如下：

<CitiesTopo />

## Canvas 的优缺点

优点：

- Canvas 是一个非常简单易用的图形系统，通过一组简单的绘图指令，能够方便快捷地绘制出各种复杂的几何图形；
- Canvas 渲染起来非常高效，即使是绘制大量轮廓非常复杂的几何图形，Canvas 只需调用一组简单的绘图指令就能高效完成渲染；

缺点：

- 很难直接抽取其中的图形对象进行单独操作；
