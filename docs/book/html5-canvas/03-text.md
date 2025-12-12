<script setup>
import {
    TextStrokeFill,
    TextMaxWidthDemo,
    TextFillStyle,
} from './codes/03';
</script>

# 文本

Canvas 提供了一些基础的文本操作功能，例如文本的描边与填充，向 canvas 中放置文本，以及用像素为单位计算任意字符串的宽度。

canvas 绘图环境对象提供了如下 3 个与文本有关的方法：

- `strokeText(text, x, y)`
- `fillText(text, x, y)`
- `measureText(text)`

`measureText()` 方法返回的对象中，包含一个名为 `width` 的属性，它的值代表你传递给该方法的文本所占据的宽度。Canvas 绘图环境对象中有三个与文本有关的属性：

- `font`
- `textAlign`
- `textBaseline`

用户可以通过 font 属性来设置后续绘制时所使用的字型，而 `textAlign` 与 `textBaseline` 属性则可以让用户设置文本在 canvas 中的定位方式。

## 文本的描边与填充

下面的示例演示了文本的描边与填充效果：

<TextStrokeFill />

该应用程序提供了一些复选框，让用户可以通过它们来控制是否要对所绘文本进行描边、填充及使用阴影。

代码如下：

```ts
const { width: cw, height: ch } = ctx.canvas;
function drawBackground() {
  const stepY = 12;
  const topMargin = stepY * 4;
  const leftMargin = stepY * 3;
  // 绘制横向线条
  ctx.save();
  ctx.strokeStyle = "lightgray";
  ctx.lineWidth = 0.5;
  for (let i = ch; i > topMargin; i -= stepY) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(cw, i);
    ctx.stroke();
  }
  // 绘制纵向线条
  ctx.strokeStyle = "rgba(100, 0, 0, 0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(leftMargin, 0);
  ctx.lineTo(leftMargin, ch);
  ctx.stroke();
  ctx.restore();
}
function redraw(fill: boolean, stroke: boolean, shadow: boolean) {
  const content = "HTML5";
  ctx.clearRect(0, 0, cw, ch);
  drawBackground();
  ctx.save();
  ctx.font = "128px Palatino";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (shadow) {
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#0008";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
  }
  if (fill) {
    ctx.fillStyle = "cornflowerblue";
    ctx.fillText(content, cw / 2, ch / 2);
  }
  if (stroke) {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.strokeText(content, cw / 2, ch / 2);
  }
  ctx.restore();
}
```

该例子使用 `fillText()` 与 `strokeText()` 对文本进行填充与描边操作。这两个方法都接受三个参数，第一个参数是所要绘制的文本，之后两个参数指定文本的绘制位置。所画文本的精确位置取决于 `textAlign` 和 `textBaseline` 属性。

`fillText` 和 `strokeText` 还接受第四个参数，该参数以像素为单位指定所绘文本的最大宽度。如下图所示：

<TextMaxWidthDemo />

上面的文本绘制没有指定第四个参数，下面的文本绘制指定第四个参数为 100，表示最大宽度为 100。代码如下：

```ts
ctx.font = "bold 64pt Arial";
ctx.fillStyle = "green";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("HTML5", 150, 50);
ctx.fillText("HTML5", 150, 150, 100);
```

在对文本进行填充及描边操作时，除了使用纯色外，还可以使用图案及渐变色。如下所示：

<TextFillStyle />

代码如下：

```ts
function drawColorGradientText() {
  const lc = ctx.createLinearGradient(cw / 4, ch / 4, cw * 0.75, ch * 0.75);
  lc.addColorStop(0, "blue");
  lc.addColorStop(0.4, "white");
  lc.addColorStop(1, "red");
  ctx.fillStyle = lc;
  ctx.fillText("Canvas", 300, 75);
  ctx.strokeText("Canvas", 300, 75);
}
function drawImageText() {
  const image = new Image();
  image.onload = () => {
    const pattern = ctx.createPattern(image, "repeat")!;
    ctx.fillStyle = pattern;
    ctx.fillText("Canvas", 300, 225);
    ctx.strokeText("Canvas", 300, 225);
  };
  image.src = redballUrl;
}
ctx.font = "bold 96pt Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.strokeStyle = "blue";
drawColorGradientText();
drawImageText();
```
