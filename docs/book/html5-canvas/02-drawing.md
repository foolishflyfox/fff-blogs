<script setup>
import { SimpleRect, ColorOpacityDemo } from './codes/02';
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
