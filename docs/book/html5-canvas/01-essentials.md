<script setup>
import { 
  HelloDemo, 
  SimpleClock, 
  SpriteCoordinate, 
  BouncingBalls, 
  RubberArea, 
  SimpleClockSnapshot,
  SimpleClockOfflineScreen,
} from "./codes/01";
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
**在设置 canvas 的宽度与高度时，不应使用 `px` 后缀**。虽然支持 Canvas 的浏览器普遍允许在设置 canvas 元素的 width 与 height 属性时使用 `px` 后缀，但这不是 Canvas 规范，根据规范书，这些属性的取值，只能是非负整数。
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

大部分情况下，开发者需要知道的是发生鼠标事件的点相对于 canvas 的位置，而不是在整个窗口中的位置，所以必须进行坐标转换。

下面是一个精灵表（sprite sheet）坐标查看器。精灵表指的是一张包含许多动画图像的图片。在动画的播放过程中，每次都要在精灵表中选取一张图像显示出来，这意味着你必须知道精灵表中每张图像的精确坐标。

你可以将鼠标移动到下面的图片中，查看鼠标位置对应的图片坐标，同时还会在屏幕上绘制辅助线：

<SpriteCoordinate />

该应用程序向 canvas 注册了一个 `mousemove` 事件监听器，等到浏览器回调这个监听器时，应用程序会将相对于窗口的鼠标转换为 canvas 坐标。转换工作是通过类似下面这样的 `windowToCanvas()` 方法来完成：

```ts
/**
 * window 坐标到 canvas 坐标转换
 */
function windowPosToCanvasPos(windowX: number, windowY: number) {
  const bbox = canvas.getBoundingClientRect();
  return {
    x: (windowX - bbox.left) * (canvas.width / bbox.width),
    y: (windowY - bbox.top) * (canvas.height / bbox.height),
  };
}
canvas.onmousemove = (e) => {
  // 坐标转换
  const canvasPos = windowPosToCanvasPos(e.clientX, e.clientY);
  drawBackground(); // 绘制背景线
  drawSpritesheet(); // 显示精灵图
  drawGridelines(canvasPos.x, canvasPos.y); // 绘制辅助线
  updateReadout(canvasPos.x, canvasPos.y); // 更新坐标值
};
```

上述 `windowPosToCanvasPost()` 方法在 canvas 对象上调用 `getBoundingClientRect()` 方法获取 canvas 元素的边界框(bounding box)。该边界框的坐标是相对于整个窗口的，`windowPosToCanvasPost()` 方法返回一个对象，其 `x` 与 `y` 属性分别对应于鼠标在 canvas 之中的坐标。

**注意：`windowPosToCanvasPost()` 不只是将 canvas 边界框的 x、y 坐标从窗口坐标中减去，还在 canvas 元素大小与绘图表面大小不一致时对 x、y 坐标进行了缩放。**

下面是精灵图坐标查看器的 HTML 代码：

```ts
function draw(context: CanvasRenderingContext2D) {
  const canvas = context.canvas;
  const spritesheet = new Image();
  // 显示坐标的值的元素
  const readout = document.querySelector("#readout") as HTMLSpanElement;
  // 绘制图片
  function drawSpritesheet() {
    context.drawImage(spritesheet, 0, 0);
  }
  spritesheet.src = "../shared/images/running-sprite-sheet.png";

  /**
   * 绘制作为背景的横线
   */
  function drawBackground() {
    const VERTICAL_LINE_SPACING = 12;
    let i = canvas.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "lightgray";
    context.lineWidth = 0.5;
    while (i > VERTICAL_LINE_SPACING * 4) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(canvas.width, i);
      context.stroke();
      i -= VERTICAL_LINE_SPACING;
    }
  }
  /**
   * 绘制定位线
   */
  function drawGridelines(x: number, y: number) {
    context.strokeStyle = "rgba(0, 0, 230, 0.8)";
    context.lineWidth = 0.5;
    // 绘制水平线
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
    // 绘制垂直线
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }
  /**
   * 更新显示的坐标值
   */
  function updateReadout(x: number, y: number) {
    readout.innerHTML = `(${x.toFixed(0)}, ${y.toFixed(0)})`;
  }
  /**
   * window 坐标到 canvas 坐标转换
   */
  function windowPosToCanvasPos(windowX: number, windowY: number) {
    const bbox = canvas.getBoundingClientRect();
    return {
      x: (windowX - bbox.left) * (canvas.width / bbox.width),
      y: (windowY - bbox.top) * (canvas.height / bbox.height),
    };
  }

  drawBackground();
  spritesheet.onload = function (e) {
    drawSpritesheet();
  };
  // 处理鼠标移动事件
  canvas.onmousemove = (e) => {
    const canvasPos = windowPosToCanvasPos(e.clientX, e.clientY);
    drawBackground();
    drawSpritesheet();
    drawGridelines(canvasPos.x, canvasPos.y);
    updateReadout(canvasPos.x, canvasPos.y);
  };
}
```

:::tip

**小技巧：让浏览器不再干预事件处理**

对象事件中有一个 `preventDefault()` 方法，可以阻止浏览器对该事件作出默认的反映。

:::

### 键盘事件

当在浏览器窗口中按下某个键时，浏览器将生成键盘事件。这些事件发生在拥有焦点的 HTML 元素身上。假如没有元素拥有焦点，那么事件的发生将会移到 window 与 document 对象上。

**canvas 是一个不可获取焦点的元素，所以 canvas 元素上新增键盘事件监听器是徒劳的。如果想要检测键盘事件的话，应该在 document 或 window 对象上新增键盘事件监听器才对。**

一共有三种键盘事件：`keydown` / `keypress` / `keyup`。

`keydown` 与 `keyup` 是底层事件，几乎每次按键时浏览器都会触发这些事件。

如果激活 `keydown` 事件的那个按键会打印出某个字符，那么浏览器在触发 `keyup` 事件之前先产生 `keypress` 事件。如果在一段时间内持续地按住某个可以打印出字符的键，那么浏览器就会在 `keydown` 与 `keyup` 事件之间产生一系列的 `keypress` 事件。

## 绘制表面的保存与恢复

Canvas 绘图环境对象除了可以通过 `save()` 对配置属性进行保存与恢复外，另外一个关键功能就是可以对绘图表面自身进行保存与恢复。这种绘制表面的保存与恢复功能，可以让开发者在绘图表面进行临时性的绘制动作，例如绘制像皮带、辅助线(guidewire)或注解(annotation)。

通过 `getImageData()` 与 `putImageData()` 可以保存与恢复绘图环境的绘图表面图像，这两个函数也可以实现图像滤镜：先获取图像数据，然后处理，最后将它恢复到 canvas 之上。

:::tip

**立即模式绘图系统**

canvas 元素采用 “立即模式”(immediate-mode) 来绘制图形，这意味着它会立刻将你所指定的内容绘制在 canvas 上，然后忘记刚才绘制的内容，这表示 canvas 中不包含将要绘制的图形对象列表。在 SVG 中，则会维护一份所绘图形对象的列表，这些绘图系统称为 **保留模式(retained-mod)绘图系统**。

:::

通过保存与恢复绘图表面来绘制辅助线的代码：

```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
... ...
// 保留与恢复绘图表面
function saveDrawingSurface() {
  drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}
function restoreDrawingSurface() {
  context.putImageData(drawingSurfaceImageData, 0, 0);
}
// 事件处理
canvas.onmousedown = function (e) {
  saveDrawingSurface();
  ... ...
}
canvas.onmousemove = function (e) {
  const loc = windowToCanvas(e);
  if (dragging) {
    restoreDrawingSurface();
    ... ...
    if (guidewires) {
      drawGuidewires(mousedown.x, mousedown.y);
    }
  }
}
canvas.onmouseup = function (e){
  ... ...
  restoreDrawingSurface();
}
```

## 在 Canvas 中使用 HTML 元素

在实现网络应用程序时，我们经常将一个或更多的 canvas 元素与其他 HTML 空间结合起来使用，以便让用户可以通过输入数值或其他方式来控制应用程序。

要将其他 HTML 控件与 canvas 结合起来，首先想到的办法是将控件嵌入到 canvas 元素中。不过这不可行，因为任何放入 canvas 元素主体部分的东西，只有在浏览器不支持 canvas 元素时才会显示出来。因此控件必须放在 canvas 元素之外。

### 弹力球应用

为了让 HTML 控件看起来像是在 canvas 范围内，可以使用 CSS 将这些控件放在 canvas 之上，下面的应用演示了这个效果。

<BouncingBalls />

该应用程序显示了 100 个运动的小球，并提供了一个用于启动或停止动画效果的链接。这个存在于 div 元素中的链接是半透明的，并且浮动在 canvas 之上。

:::tip

Canvas 规范中说，应该优先考虑使用内置的 HTML 控件，而非使用 CanvasAPI 来从头实现控件。这通常是个好的建议。要想用 Canvas API 来编写全新的控件，一般涉及大量的工作。在大多数情况下，如果有某种更为简单的方法可用，我们就不要为了实现它而花费那么多功夫。

:::

### 橡皮筋选择器应用

下面的应用采用了一种名为“橡皮筋式”(rubberbanding) 选取框的技术，让用户在 canvas 中选择某个区域。起初，该 canvas 会显示一幅图像，当选定图像的某一部分时，应用程序就会将你所选的这部分区域放大。

<RubberArea />

## 打印 Canvas 的内容

可以将 canvas 作为图像来访问，现在浏览器支持将 canvas 对象保存为 png 图片。下面的应用实现了一个对 canvas 进行截图的功能。

<SimpleClockSnapshot />

在点击截图按钮后，会执行如下步骤：

1. 调用 `toDataURL()` 方法获取图片数据地址
2. 使用图片数据地址设置 `<img />` 标签的 `src` 字段
3. 隐藏 `canvas` 元素并显示 `img` 元素

## 离屏 canvas

Canvas 技术的另一项重要功能就是可以创建并操作离屏 canvas。举例来说，多数情况下可以将背景存储在一个或多个离屏 canvas 中，并将这些离屏 canvas 中的某一部分复制到屏幕上，可以大幅提高应用程序的性能。

下面就是一个离屏 canvas 的例子，显示的时钟是一个 png 图片，通过离屏的 canvas 创建：

<SimpleClockOfflineScreen />

代码中通过以下代码创建 canvas 元素：

```ts
const canvas = document.createElement("canvas") as HTMLCanvasElement;
canvas.width = 200;
canvas.height = 200;
const context = canvas.getContext("2d")!;
```

该 canvas 不会加入到 DOM 中，并定时通过 `canvas.toDataURL()` 创建图片地址，并更新 img 标签的 src 属性。

## 基础数学知识简介

如果想用 Canvas 实现一些有趣的功能，那必须很好地掌握一些基础的数学知识，尤其是线性代数、三角函数方面。
