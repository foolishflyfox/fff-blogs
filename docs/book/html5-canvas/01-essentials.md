<script setup>
import {HelloDemo} from "./codes/01";
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
