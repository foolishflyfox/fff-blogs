<script setup>
import { HelloDemo, SimpleClock, SpriteCoordinate } from "./codes/01";
</script>

# 01. 基础知识

## canvas 元素

`canvas` 元素可以说是 HTML5 元素中功能最强大的一个。它真正的能力是通过 Canvas 的 `context` 对象而表现出来的。

下面的代码是使用 Canvas 绘制文本的示例：

```ts
function draw() {
  // 获取指向 canvas 的引用
  const canvas = document.getElementById("canvas");
  // 获取绘图环境对象
  const context = canvas.getContext("2d");
  // 设置绘图环境对象属性
  context.font = "38pt Arial";
  context.fillStyle = "cornflowerblue";
  context.strokeStyle = "blue";
  // 进行文本填充操作，参数分别为：显示的文本 / x坐标 / y坐标
  context.fillText(
    "Hello Canvas",
    canvas.width / 2 - 150,
    canvas.height / 2 + 15
  );
  // 进行文本描边操作
  context.strokeText(
    "Hello Canvas",
    canvas.width / 2 - 150,
    canvas.height / 2 + 15
  );
}
```

显示效果为：

<HelloDemo />

`fillText()` 方法使用 `fillStyle` 属性来填充文本中的字符。`strokeText()` 方法使用 `strokeStyle` 属性来描绘文本的轮廓线。

`fillStyle` 与 `strokeStyle` 属性可以是 CSS 格式的颜色、渐变色或是图案。

::: warning
**在设置 canvas 的宽度与高度时，不能使用 `px` 后缀**。虽然支持 Canvas 的浏览器普遍允许在设置 canvas 元素的 width 与 height 属性时使用 `px` 后缀，但这不是 Canvas 规范，根据规范书，这些属性的取值，只能是非负整数。
:::

::: tip
在默认情况下，浏览器所创建的 canvas 元素是 `300px` 宽、`150px` 高。可以通过指定 `width` 与 `height` 属性值修改 canvas 元素的大小。
:::

使用 CSS 来设置 canvas 元素的大小与直接设置属性相比，其差别是基于这样一个事实的：**canvas 元素实际上有两套尺寸，一个是元素本身的大小，还有一个是元素绘图表面（`drawing surface`）的大小**。

如果通过 CSS 来设置 canvas 元素的大小，那么只会改变元素本身的大小，而不会影响绘图表面。

:::danger 特别注意
**当 canvas 元素的大小不符合其绘图表面的大小时，浏览器就会对绘图表面进行缩放，使其符合 canvas 元素的大小。**

推荐通过 `width` 与 `height` 属性而非 CSS 来修改 canvas 元素的大小。如果使用 CSS 来修改元素的大小，同时又没有指定 canvas 元素的 `width` 与 `height` 属性，可能导致图形变形。
:::

canvas 元素并未提供很多 API，它只提供了两个属性与三个方法。

两个属性：

- `width`：canvas 元素的逻辑宽度(绘图表面的宽度)，默认为 300
- `height`：canvas 元素的逻辑高度(绘图表面的高度)，默认为 150

三个方法：

- `getContext()`: 获取绘图环境对象
- `toDataURL(type, quality)`: 返回一个数据地址（data URL，base64 编码），可以将它设定为 img 元素的 src 属性值。
  - `type` ：指定图像类型，例如 `image/jpeg` 或 `image/png`，默认值为 `image/png`
  - `quality`: 0 ～ 1.0 之间的 `double` 值，表示 JPEG 图像的显示质量，当 `type` 为 `image/jpeg` 时有效
- `toBlob(callback, type, quality)`: 创建一个用于表示此 canvas 元素图像文件的 Blob
  - `callback`: 一个回调函数，入参为 `Blob` 类型，处理生成的 blob
  - `type`: 指定图像类型，例如 `image/jpeg` 或 `image/png`，默认值为 `image/png`
  - `quality`: 0 ～ 1.0 之间的 `double` 值，表示 JPEG 图像的显示质量，当 `type` 为 `image/jpeg` 时有效

## Canvas 的绘图环境

canvas 元素仅仅是为了充当绘图环境对象的容器而存在的，该环境对象提供全部的绘制功能。

在 JavaScript 代码中，很少会用到 canvas 元素本身。通常使用 canvas 绘图环境对象提供的强大的 API。下面是 2d 绘图的全部属性，除了指向 canvas 元素自身的 canvas 属性外，其余的 2d 绘图环境属性都与绘图操作有关。

- `canvas`: 该绘图环境所属的 canvas 对象。该属性常用于获取 canvas 的宽度与高度，分别调用 `context.canvas.width` 与 `context.canvas.height` 即可
- `fillstyle`: 设置用于填充的颜色、渐变色或图案，默认为 `#000000`
- `font`: 设置调用 `fillText()` 或 `strokeText()` 时使用的字型
- `globalAlpha`: 全局透明度设置，取值范围为 0 ~ 1 的小数，浏览器会将每个像素的 `alpha` 值与该值相乘，在绘制图像时也是如此，默认值为 1
- `globalCompsiteOperation`: 该值决定了浏览器将某个物体绘制在其他物体之上时，所采用的绘制方式，默认为 `source-over`
- `lineCap`: 浏览器绘制线段的端点形状，可取 `butt` / `square` / `round`，默认为 `butt`
- `lineWidth`: 指定线段的屏幕像素宽度，必须是非负、非无穷的 double 值，默认为 1.0
- `lineJoin`: 指定线段拐点的形状，可取 `bevel` / `round` / `miter`，默认为 `miter`
- `miterLimit`: 当 `lineJoin` 为 `miter` 时，用于指定最大斜接长度，如果斜接长度超过 `miterLimiter` 的值，边角会以 `lineJoin` 为 `bevel` 的方式来显示，默认值为 10
- `shadowBlur`: 阴影的模糊级数，非负值，默认为 0
- `shadowColor`: 阴影颜色，通常采用半透明色作为该属性值，以便让背景能显示出来，默认为透明色
- `shadowOffsetX`: 阴影的水平方向偏移量，单位为像素，默认为 0
- `shadowOffsetY`: 阴影的垂直方向偏移量，单位为像素，默认为 0
- `strokeStyle`: 描边时的绘制风格，可以是纯色、渐变色或图案，默认为 `#000000`
- `textAlign`: 指定 `fillText()` 或 `strokeText()` 绘制文本时，文本的水平对齐方式，默认为 `start`
- `textBaseline`: 指定 `fillText()` 或 `strokeText()` 绘制文本时，文本的垂直对齐方式，默认为 `alphabetic`

### canvas 状态的保存与恢复

在进行绘图操作时，需要频繁设置这些值。很多时候只想临时性地改变这些属性。`context` 提供了 `save()` 和 `restore()` 方法，用于保存及恢复当前 canvas 绘图环境的所有属性。

下面是使用的代码示例：

```js
function drawGrid(strokeStyle, fillStyle) {
    controlContext.save(); // 将绘图环境配置保存到栈中
    controlContext.strokeStyle = strokeStyle;
    controlContext.fillStyle = fillStyle;
    // 绘制网格线
    ... ...
    controlContext.restore(); // 从栈中恢复绘图环境配置
}
```

:::tip
**`save()` 与 `restore()` 方法可以嵌套调用**

绘图环境的 `save()` 方法会将当前的绘图环境压入堆栈顶部。对应的 `restore()` 方法则会从堆栈顶部弹出一组状态信息，并据此恢复当前环境的各个状态，这意味着可以嵌套式地调用 `save()`/`restore()` 方法。
:::

canvas 状态包括当前的坐标变换(transformation)信息、剪辑区域(clipping region)以及所有 canvas 绘图环境对象的属性。

## 基本的绘制操作

下面是一个时钟程序。

<SimpleClock />

它用到了如下的 canvas 绘图 API：

- `arc()`
- `beginPath()`
- `clearRect()`
- `fillText()`
- `moveTo()`
- `lineTo()`
- `fill()`
- `stroke()`
- `save()`
- `restore()`

Canvas 可以让开发者先创建不可见的路径，稍后再调用 `stroke()` 来描绘路径的边缘，或调用 `fill()` 来对路径的内部进行填充，使路径变得可见，可以调用 `beginPath()` 方法开始定义某一段路径。

其代码如下所示：

```ts
let timerId: number | undefined;
function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  function drawClock() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    ctx.clearRect(0, 0, canvas.width, canvas.width);
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    ctx.font = "10pt Arial";
    // 设置文本居中
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // 中心点位置
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = canvas.width / 2 - 20;
    // 绘制时钟外面的圆
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    // 绘制中心
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();
    // 绘制外部的时间数字
    for (let i = 1; i < 13; i++) {
      const textR = r + 10;
      const radian = -Math.PI / 2 + i * (Math.PI / 6);
      const textX = cx + textR * Math.cos(radian);
      const textY = cy + textR * Math.sin(radian);
      ctx.fillText(String(i), textX, textY);
    }
    // 绘制时针
    ctx.save();
    ctx.lineWidth = 5; // 时针宽度
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const realHour = (hours * 3600 + minutes * 60 + seconds) / 3600;
    const hourRadian = -Math.PI / 2 + ((realHour % 12) * Math.PI) / 6;
    const hourRadius = r - 20;
    const hourX = cx + hourRadius * Math.cos(hourRadian);
    const hourY = cy + hourRadius * Math.sin(hourRadian);
    ctx.lineTo(hourX, hourY);
    ctx.stroke();
    ctx.restore();
    // 绘制分针
    ctx.save();
    ctx.lineWidth = 3; // 分针宽度
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const realMinute = (minutes * 60 + seconds) / 60;
    const minuteRadian = -Math.PI / 2 + ((realMinute % 60) * Math.PI) / 30;
    const minuteRadius = r - 12;
    const minuteX = cx + minuteRadius * Math.cos(minuteRadian);
    const minuteY = cy + minuteRadius * Math.sin(minuteRadian);
    ctx.lineTo(minuteX, minuteY);
    ctx.stroke();
    ctx.restore();
    // 绘制秒针
    ctx.save();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const secondRadian = -Math.PI / 2 + (seconds * Math.PI) / 30;
    const secondRadius = r - 7;
    const secondX = cx + secondRadius * Math.cos(secondRadian);
    const secondY = cy + secondRadius * Math.sin(secondRadian);
    ctx.lineTo(secondX, secondY);
    ctx.stroke();
    ctx.restore();
  }
  drawClock();
  timerId = window.setInterval(drawClock, 1000);
}
```

## 事件处理

HTML5 应用程序是以事件来驱动的。几乎所有基于 Canvas 的应用程序都会处理鼠标和触摸事件。

### 鼠标事件

监听 “按下鼠标事件” 代码：

```js
canvas.onmousedown = function (e) {
    // 处理鼠标事件
    ... ...
}
```

也可以通过 `addEventListener()` 方法来注册监听器：

```js
canvas.addEventListener("mousedown", function (e) {
    // 处理鼠标事件
    ... ...
});
```

除了 `onmousedow` 外，也可以使用 `onmousemove` / `onmouseup` / `onmouseout` 来注册监听器。

:::tip
使用 `onmousedown`、`onmousemove` 方式注册监听器比调用 `addEventListener` 要稍简单，但如果要向鼠标事件注册想多个监听器的话，就的使用 `addEventListener()` 了。多个监听器满足：

- 执行顺序：按注册顺序执行
- 重复注册同一个函数：一次触发只会执行一次

:::

浏览器通过事件对象传递给监听器的鼠标坐标是窗口坐标（window coordinate），而不是 canvas 自身的坐标。

<SpriteCoordinate />
