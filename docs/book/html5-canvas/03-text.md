<script setup>
import {
    TextStrokeFill,
    TextMaxWidthDemo,
    TextFillStyle,
    FontFamilyDemo,
    AlignBaselineDemo,
    TextInputCursor
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

## 设置字型

可以通过绘图环境对象的 font 属性，来设置绘制在 canvas 中的文本所采用的字型。该属性是一个 CSS3 格式的字型字符串，它的各分量如下所示，开发者在设置绘图环境的 `font` 属性时，需要按照该表从上至下所列的顺序来依次指定这些分量的值：

- `font-style`: 可以取 `normal` / `italic` / `oblique`
- `font-variant`: 可以取 `normal` / `small-caps`
- `font-weight`: 决定了字体粗细，可取 `normal`、`bold`、`bolder`、`lighter`、100、200、300、...、900，其中 `normal` 相当于 400，而 `bold` 相当于 700
- `font-size`: 字型大小，可取 `xx-small`、`x-small`、`medium`、`large`、`x-large`、`xx-large`、`smaller`、`larger`、长度(如`24px`、`3em`...)、与父元素字型的百分比
- `line-height`: 浏览器会将该属性强制设置为 `normal`，如果你设置了该值，浏览器将忽略你所设定的值
- `font-family`: 可以用两种方式设置字体集(font family)，一种方式以 “family-name” 格式来指定该属性，此时可取的值为 `helvetic`、`verdana`、`palatino`等等，另一种方式是以 “generic-family” 格式来指定该属性，其值可取 `sans-serif`、`monospace`、`cursive`及`fantasy`等等，在设置 `font-family` 分量时，可以仅指定 family-name 或 generic-family 格式来指定其值，也可以同时使用这两种格式。

Canvas 默认字型是 `10px sans-serif`。

下面的例子是以各种指定字体来绘制的文本：

<FontFamilyDemo />

左边一列字符串所使用的字型都是 Palatino 字体集的变种，右边一列是网页安全字型的绘制效果。

如果 font 属性的取值无效的话，浏览器就不会修改该属性的值，而会保持其原有值不变。比方说，你在指定 font-style 或 font-family 等分量值时弄错了顺序，或是将一个非法值指定给了 font-style 分量。

## 文本的定位

### 水平与垂直定位

在 canvas 中使用 `strokeText()` 或 `fillText()` 绘制文本时，需要指定所绘文本的 X 与 Y 坐标。而浏览器具体会将文本绘制在何处，则要看 `textAlign` 和 `textBaseline` 这两个绘图环境对象的属性。

下面的示例演示了使用这些属性的各种取值组合来绘制文本时的效果。

<AlignBaselineDemo />

例子中的那个实心矩形表示应用程序传递给 `fillText()` 方法的 X 与 Y 坐标。图中所显示的每个字符串都表示了一种 `textAlign`/`textBaseLine` 的组合。

`textAlign` 属性可以取的值有：

- `start`
- `center`
- `end`
- `left`
- `right`

`textAlign` 属性的默认值是 `start`，当 canvas 元素的 `direction` 属性是 `ltr` 时，也就是说浏览器是按从左往右的方向显示文本时，`left` 的效果与 `start` 相同，而 `right` 的效果则与 `end` 相同。同理，如果 `direction` 属性时 `rtl` 时，也就是说浏览器是从右往左来显示文本的，那么 `right` 的效果与 `start` 一致，而 `left` 的效果与 `end` 一致。

`textBaseline` 属性可以取的值有：

- `top`
- `middle`
- `bottom`
- `alphabetic`
- `ideographic`
- `hanging`

`textBaseline` 属性的默认值为 `alphabetic`，该值用于绘制由基于拉丁字母的语言所组成的字符串。`ideographic` 值则用于绘制日语或中文字符串，`hangding` 值用于绘制各种印度语字符串。`top`、`middle`、`bottom` 这三个值与特定的语言不相关，它们代表文本周围的边界框之内的某个位置，这个边界框也称为“字符方框”.

该显示字符定位的代码如下：

```ts
const textAlign: CanvasTextAlign[] = [
  "start",
  // "left",
  "center",
  // "right",
  "end",
];

const textBaseline: CanvasTextBaseline[] = [
  "top",
  "middle",
  "bottom",
  "alphabetic",
  "ideographic",
  "hanging",
];
const { width: cw } = ctx.canvas;
drawGrid(ctx, "lightgray", 10);

for (let i = 0; i < textBaseline.length; i++) {
  const y = 20 + i * 70;
  // 绘制横线
  ctx.save();
  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(20, y);
  ctx.lineTo(cw, y);
  ctx.stroke();
  ctx.restore();
  ctx.font = "24px Arial";
  ctx.fillStyle = "#6e95e6";
  for (let j = 0; j < textAlign.length; j++) {
    const x = 20 + j * 320;
    // 绘制文本
    ctx.save();
    ctx.textBaseline = textBaseline[i];
    ctx.textAlign = textAlign[j];
    ctx.fillText(`${textAlign[j]}/${textBaseline[i]}`, x, y);
    ctx.restore();
    // 绘制定位点
    ctx.save();
    ctx.strokeStyle = "#888";
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.rect(x, y, 5, 5);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
```

### 文本的度量

主要你做的事情与文本有关，你就得设法取得某个字符串的像素宽度与高度。如下图所示的带有光表的简单文本编辑器，它就必须知道应该把光标绘制在 canvas 中的哪个位置，因而还要知道文本的尺寸。

<TextInputCursor />

要将光标放在这行文本的末尾，就必须先算出文本的宽度。

Canvas 绘图环境对象提供了一个名为 `measureText()` 的方法，用以度量某个字符串的像素宽度。该方法所返回的 `TextMatrics` 对象中包含了一个名为 `width` 的属性，这个属性就是字符串的宽度。

:::warning

在使用 `measureText` 方法时，最常见的错误时在调用完该方法后，才去设置字型。`measureText` 方法时基于当前字型来计算字符串宽度的，因此如果你在调用 `measureText()` 方法之后才去改变字型，那么该方法所返回的宽度并不能反映出那种字型来度量的实际文本宽度。

:::

:::warning

通过 `measureText` 方法所返回的 `TextMetrics` 对象中 `width` 属性表示字符串的像素宽度。但是 `TextMetrics` 并没有提供对应的 `height` 属性用于获取高度，而且 Canvas 规范中的一句话又使得文本的尺寸计算变得更加复杂：

> 使用 `fillText` 与 `strokeText` 方法来渲染字形时，绘制范围有可能超出由字型大小所定义的范围框，绘制的宽度也有可能超出由 `measureText` 方法所返回的宽度。

上文引述的规范表明：由 `measureText` 方法所返回的文本宽度并不精确。通常情况下，就算该值不精确也无关紧要。

:::

### 绘制坐标轴旁边的文本标签
