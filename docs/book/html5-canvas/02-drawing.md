<script setup>
import { 
    SimpleRect, 
    ColorOpacityDemo,
    LineGradientDemo,
    RadialGradientDemo,
    ConicGradientDemo,
    ImageFillPattern,
    ButtonShadow,
} from './codes/02';
</script>

# 02. 绘制

## 坐标系统

默认情况下，Canvas 的坐标系统以 canvas 的左上角为原点，X 坐标向右增长，Y 坐标向下增长。

然而 Canvas 的坐标系并不是固定的。可以对坐标系进行变换，下面是坐标变换的类型：

- 平移 (translate)
- 旋转 (rotate)
- 缩放 (scale)
- 自定义变换方式，例如切变

坐标系统的变换是 Canvas 中一项非常基础的功能，它在很多不同的场合都很有用。例如，将坐标系统平移，可以极大简化在对图形及文本进行绘制与填充时所需的数值计算。

## Canvas 的绘制模型

在向 canvas 上绘制图形或图像时，浏览器按照如下步骤来操作：

1. 将图形或图像绘制到一个无限大的透明位图中，在绘制时遵从当前的填充模式、描边模式以及线条样式；
2. 将图形或图像的阴影绘制到了另一幅位图中，在绘制时使用当前绘图环境的阴影设置
3. 将阴影中的每个像素的 alpha 分量乘以绘图环境对象的 globalAlpha 属性值
4. 将绘有阴影的位图与结果剪辑区域剪切过的 canvas 进行图像合成。在操作时使用当前的合成模式参数
5. 将图形或图像的每个像素颜色分量，乘以绘图环境对象的 globalAlpha 属性值
6. 将绘有图形或图像的位图，合成到当前经过剪辑区域剪切过的 canvas 位图之上，在操作时使用当前的合成操作符（composition operator）

## 矩形绘制

Canvas 的 API 提供了如下三个方法：

- 矩形区域清除: `clearRect(x: number, y: number, w: number, h: number)`
- 矩形描边: `strokeRect(x: number, y: number, w: number, h: number)`
- 矩形填充: `fillRect(x: number, y: number, w: number, h: number)`

下面是一个简单应用，使用了上述三个方法：

<SimpleRect />

该应用使用 `strokeRect()` 绘制左侧矩形，使用 `fillRect()` 绘制右侧矩形。用户在 canvas 内任意处点击鼠标时，调用 `clearRect()` 清除整个 canvas 的内容进行清除。

下面上述应用的代码：

```ts
// 设置线段拐点(矩形拐角)样式为圆角
context.lineJoin = "round";
context.lineWidth = 30;
// 设置主题
context.font = "24px Helvetica";
// 绘制文本
context.fillText("点击任意区域擦除", 175, 40);
// 绘制矩形
context.strokeRect(75, 100, 200, 200);
context.fillRect(325, 100, 200, 200);
// 绑定鼠标点击事件
context.canvas.onmousedown = () => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
};
```

下面是 3 个操作函数的详细说明：

- `clearRect`: 将制定矩形与当前剪辑区域相交范围内的所有像素清除。默认情况下，剪辑区域的大小就是整个 canvas。所谓 “像素清除” 是指将其颜色设置为全透明的黑色，效果上等同于“擦除”(erase)或“清除”(clear)，从而使得 canvas 的背景可以透过该像素显示出来
- `strokeRect`: 使用 `strokeStyle`/`lineWidth`/`lineJoin`/`miterLimit`这些属性为矩形描边，如果宽或高有一个为 0，那么该方法将绘制一条线，如果都为 0，则什么都不绘制
- `fillRect`: 使用 `fillStyle` 属性填充指定矩形，如果宽或高为 0，则什么都不绘制

## 颜色与透明度

上一应用程序没有指定 `fillStyle`，因此使用默认颜色 `#000000` 不透明的 (opaque) 黑色来对矩形进行描边与填充。

下面是颜色与透明度的例子：

<ColorOpacityDemo />

对应代码如下：

```ts
context.lineJoin = "round";
context.lineWidth = 30;
context.font = "24px Helvetica";
context.fillText("点击任意区域擦除", 175, 200);
// 指定描边颜色
context.strokeStyle = "goldenrod";
// 指定填充颜色，包括透明度
context.fillStyle = "rgba(0, 0, 255, 0.5)";
context.strokeRect(75, 100, 200, 200);
context.fillRect(325, 100, 200, 200);
context.canvas.onmousedown = () => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
};
```

`strokeStyle` 与 `fillStyle` 的属性值可以是任意有效的 CSS 颜色字符串。在 https://drafts.csswg.org/css-color-3/ 可以找到完整的规范书，列出了所有可用于指定 CSS 颜色字符串的方式，可以用：

- `RGB`: 红/绿/蓝(red/green/blue)
- `RGBA`: 红/绿/蓝/透明度(red/green/blue/alpha)
- `HSL`: 色相/饱和度/亮度(hue/saturation/lightness)
- `HSLA`: 色相/饱和度/亮度/透明度(hue/saturation/lightness/alpha)
- 十六进制 RGB 标注法
- 颜色名称，如 `yellow` 黄色、`silver` 银色、`teal` 青色 ...
- SVG1.0 规范中的颜色名称，如 `goldenrod` 菊黄色、`darksalmon` 深橙红色、`chocolate` 巧克力色 ...

下面是一些颜色字符串的例子：

- `#ffffff`
- `#642`
- `rgba(100, 100, 100, 0.8)`
- `rgb(255, 255, 0)`
- `hsl(20, 62%, 28%)`
- `hsla(40, 82%, 33%, 0.6)`
- `antiquewhite`: 古董白
- `burlywood`: 实木色
- `cadetblue`: 军服蓝

## 渐变色与图案

### 渐变色

Canvas 支持线性渐变(linear gradient)与放射渐变(radial gradient)。

#### 线性渐变

下面是线性渐变的示例：

<LineGradientDemo />

该应用通过调用 `createLinearGradient()` 方法来创建线性渐变。需要向该方法传入两个点的 x、y 坐标，两点之间的连线就是 canvas 建立颜色渐变效果的依据。

调用 `createLinearGradient()` 方法后，会返回一个 CanvasGradient 实例。最后，应用将该渐变色设置为 `fillStyle` 属性值。这样，接下来调用 `fill()` 方法时，都会使用此渐变色进行填充。

在创建好渐变色后后，通过调用 `CanvasGradient` 中唯一的方法 `addColorStop()` 来向渐变色中增加“颜色停止点”（color stop），该方法接受两个参数：一个是位于 0 ～ 1.0 之间的 double 值，代表颜色停止点在渐变线上的位置，另一个是 DOMString 类型的 CSS3 颜色字符串。

下面是该线性渐变应用的代码：

```ts
const cw = ctx.canvas.width;
const ch = ctx.canvas.height;
const gradients = [
  ctx.createLinearGradient(0, 0, cw / 2, 0),
  ctx.createLinearGradient(0, 0, 0, ch / 2),
  ctx.createLinearGradient(0, ch / 2, 0, ch * 0.75),
  ctx.createLinearGradient(cw / 2, ch / 2, cw, ch),
];
gradients.forEach((g) => {
  g.addColorStop(0, "blue");
  g.addColorStop(0.25, "white");
  g.addColorStop(0.5, "purple");
  g.addColorStop(0.75, "red");
  g.addColorStop(1, "yellow");
});
ctx.strokeStyle = "#000";
ctx.lineWidth = 3;
// 要绘制的四个矩形的左上角坐标
const poses = [
  [0, 0],
  [cw / 2, 0],
  [0, ch / 2],
  [cw / 2, ch / 2],
];
for (let i = 0; i < 4; i++) {
  ctx.fillStyle = gradients[i];
  ctx.beginPath();
  ctx.rect(poses[i][0], poses[i][1], cw / 2, ch / 2);
  ctx.fill();
  ctx.stroke();
}
```

#### 放射渐变(也成径向渐变)

创建线性渐变时，需要指定一条渐变线。要创建放射渐变，必须指定两个圆形，它们表示某个圆锥的起始部位，放射渐变的效果如下所示：

<RadialGradientDemo />

代码如下：

```ts
const canvas = ctx.canvas;
const gradient = ctx.createRadialGradient(
  canvas.width / 2,
  canvas.height,
  10,
  canvas.width / 2,
  0,
  100
);
gradient.addColorStop(0, "blue");
gradient.addColorStop(0.25, "white");
gradient.addColorStop(0.5, "purple");
gradient.addColorStop(0.75, "red");
gradient.addColorStop(1, "yellow");
ctx.fillStyle = gradient;
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fill();
```

该代码在 canvas 底部指定了一个半径为 10px 的小圆，又在顶部指定了一个半径为 100px 的大圆，然后根据这两个圆来创建放射渐变效果。这两个圆在水平方向上都与 canvas 呈居中对齐的关系。

该代码将整个 canvas 都以该渐变色来填充。然而与线性渐变不同，放射渐变的填充范围仅局限于传递给 `createRadialGradient()` 方法的那两个圆形所定义的圆锥区域内，而不是像线性渐变那样使用最后一个渐变色来填充渐变线以外的区域。

#### 锥形渐变

锥形渐变是径向颜色保持不变，沿着中心的环颜色渐变，如下应用所示：

<ConicGradientDemo />

代码如下：

```ts
const { width: cw, height: ch } = ctx.canvas;
// 第一个参数为起始弧度，后两个参数表示中心点的位置
const gradient = ctx.createConicGradient(Math.PI / 2, cw / 2, ch / 2);
gradient.addColorStop(0, "blue");
gradient.addColorStop(0.25, "white");
gradient.addColorStop(0.5, "purple");
gradient.addColorStop(0.75, "red");
gradient.addColorStop(1, "yellow");
ctx.fillStyle = gradient;
ctx.rect(0, 0, cw, ch);
ctx.fill();
```

### 图案

除了颜色与渐变色，Canvas 也允许使用图案来对图形和文本进行描边与填充。这里的图案可以是以下三种之一：image 元素 / canvas 元素或 video 元素。

可以用 `createPattern()` 方法来创建图案，该方法接收两个参数：图案本身以及表示如何重复图案的字符串，可以为 `repeat`/`repeat-x`/`repeat-y`或`no-repeat`。下面的应用演示了不同重复方式的效果：

<ImageFillPattern />

代码如下：

```ts
const image = new Image();
const { width: cw, height: ch } = ctx.canvas;
changeImagePattern = (patterStr: string) => {
  ctx.clearRect(0, 0, cw, ch);
  const pattern = ctx.createPattern(image, patterStr)!;
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, cw, ch);
};
image.onload = () => changeImagePattern(imagePattern.value);
image.src = redBallUrl;
```

应用程序调用 `createPattern()` 方法来创建一个新的 CanvasPattern 对象，该对象没有操作其内容的属性或方法。

## 阴影

在 canvas 中，不管要画的是图形、文本还是图像，都可以通过修改绘图环境中的以下 4 个属性值来指定阴影效果：

- `shadowColor`: CSS3 格式的颜色，默认为 `rgba(0, 0, 0, 0)`，是全透明的
- `shadowOffsetX`: 从图形或文本到阴影的水平像素偏移，默认为 0
- `shadowOffsetY`: 从图形或文本到阴影的垂直像素偏移，默认为 0
- `shadowBlur`: 一个与像素无关的值，用于高斯模糊方程中，以便对阴影进行模糊化处理，默认为 0

如果满足以下条件，那么使用 Canvas 的绘图环境对象就可以绘制阴影效果：

1. 指定的 `shadowColor` 值不是全透明的
2. `shadowOffsetX` / `shadowOffsetX` / `shadowBlur` 中的值不全为 0

下面的应用分别为描边时使用阴影的效果(左)与填充时使用阴影的效果(右):

<ButtonShadow />

对应代码为：

```ts
ctx.strokeStyle = "black";
ctx.lineWidth = 5;
ctx.shadowColor = "#888e";
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.beginPath();
ctx.rect(20, 20, 100, 100);
ctx.stroke();
ctx.beginPath();
ctx.fillStyle = "#fff";
ctx.fillRect(150, 20, 100, 100);
```
