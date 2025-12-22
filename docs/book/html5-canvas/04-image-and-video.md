<script setup>
import { 
  CanvasDrawImage,
  ImageScaleDemo,
  ImageScaleSlider,
  WatermarkDemo,
  WatermarkDemo2,
  RubberSelectImage,
  RubberSelectImage2,
  FilterDemo,
  EmbossFilterDemo,
  SunglassFilterDemo,
  SunglassDemo,
  FadeOutDemo,
  FadeInDemo,
  DrawImageVsPutImageData,
  ForLoopTest,
  Magnifier,
} from './codes/04';
</script>

# 图像与视频

HTML5 的 Canvas 元素提供了极为丰富的图像支持。开发者可以选择绘制某幅图像的全部或某个部分，可以在绘制的时候缩放或保持原样，可以将图片绘制在 canvas 中的任何地方，也可以操作每个像素的颜色及透明度。而且，如果我们将这些图像操作同剪切区域、离屏 canvas 等其他方面的 Canvas API 结合起来，那么就可以创建出很棒的图形效果，比如制作动画与多人游戏，实现数据可视化，或是模拟粒子物理学等。

Canvas 绘图环境对象提供了如下 4 个用于绘制及操作图像的方法：

- `drawImage`
- `getImageData`
- `putImageData`
- `createImageData`

`drawImage` 方法能把某幅图像绘制到 canvas 中，还能将另一个 canvas 的内容或者某个视频的其中一帧绘制到当前 canvas 之中。

与图像数据有关的那两个方法，可以让开发者获取并操作图像中的某个单独像素，`getImageData` 方法用于获取图像中的底层像素，而 `putImageData` 方法则可以将修改后的像素值放回到图像中。

我们也可以用 `createImageData()` 方法创建一个空白图像的数据对象。可以将以 CSS 像素为单位的宽度与高度值传递给该方法，作为图像数据的大小，也可以向它传递一个已经存在的 Image 对象，这样的话，该方法所返回的空白 ImageData 对象将会具有与传入对象相同的宽度和高度。

## 图像的绘制

`drawImage` 方法可以将一幅图像的整体或部分绘制到 canvas 内的任何位置上，并且允许开发者在绘制过程中对图像进行缩放。也可以将图像绘制在离屏 canvas 中，这样就可以对图像进行一些技巧性的处理，例如实现图片查看器，或是将某幅图像淡出至 canvas 中。我们将在本章介绍离屏 canvas 的多种用途。

### 在 Canvas 中绘制图像

如下所示，演示例如如何将一幅图像绘制在 canvas 中:

<CanvasDrawImage />

绘图代码为：

```ts
const image = new Image();
image.onload = () => {
  ctx.drawImage(image, 0, 0);
};
image.src = imageUrl;
```

代码中首先创建了一幅图像，设置了它的数据源，然后等待浏览器加载图片，在图片加载完成后，将其绘制到 canvas 左上角。

这就是 `drawImage` 最简单的用法了。采用这种方式，可以把一整张未经缩放的图像绘制到 canvas 之中，该方式的唯一缺点则是你必须等待图像加载完毕之后才能对其进行绘制，如果在图片尚未完成时就进行绘制，那么根据 Canvas 规范，`drawImage` 方法的执行会失败，而且没有任何提示。

:::tip

`drawImage` 方法在绘制图像时，不会考虑当前路径，然而，它却会将 `globalAlpha` 设置、阴影效果、剪辑区域，以及全局图像合成操作符等属性运用到图像的绘制中。

:::

### drawImage 方法的用法

`drawImage` 方法会将一幅图像绘制到一个 canvas 中，所绘的图像叫做“源图像”(source image)，而绘制到的地方则叫“目标 canvas”(destination canvas)。以字母 `s` 开头的变量名代表源图像，以字母 `d` 开头的变量用于指示目标 canvas。`drawImage()` 方法可以接受以下 3 套参数：

- `drawImage(image, dx, dy)`: 将整幅图像绘制到目标 canvas 的指定位置
- `drawImage(image, dx, dy, dw, dh)`: 将图像完整地绘制到指定的位置上，并且会在绘制时根据目标区域的宽度与高度进行缩放
- `drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)`: 将图像的部分绘制到目标 canvas 的制定位置，在绘制时根据目标区域的宽度与高度进行缩放。

上述三种情况，第一个参数都是 `HTMLImageElement` 类型的图像对象，不过它也可以是一个 `HTMLCanvasElement` 类型的 `canvas` 对象，或是 `HTMLVideoElement` 类型的视频对象。所以，开发者也可以将 canvas 或视频对象当成图像来用，这样一来，便催生了诸如视频编辑器这样的一大批应用程序。

## 图像的缩放

下面示例的图像，其尺寸比 canvas 小，然而，当用户选中复选框后，应用程序则会重新绘制该图，将其放大，以符合 canvas 的尺寸。

<ImageScaleDemo />

上方的图片尺寸比 canvas 小，当用户选中复选框后，应用程序会重新绘制该图，将其放大，以符合 canvas 的尺寸。代码如下：

```ts
if (scaleImage) {
  // 如果选中了缩放图片
  ctx.drawImage(image, 0, 0, cw, ch);
} else {
  // 不缩放图片
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(image, 0, 0);
}
```

### 在 Canvas 边界之外绘制图像

下面的示例提供了一个滑动条，可以让用户来调整图像的放大缩小倍数。当用户拖动滑动条时，应用程序会清除 canvas 中的内容，然后以指定的放大倍数重新绘制图像，该示例总是会将图像绘制在 canvas 的中心。

<ImageScaleSlider />

:::tip

图像可以绘制在 canvas 之内，也可以绘制在它之外。如果你向 canvas 之中绘制的图像有一部分会落在 canvas 范围之外，那么浏览器就会将 canvas 范围之外的那部分图像忽略。

可以在 canvas 范围之外进行绘制，这是一项重要的功能。

:::

## 将一个 Canvas 绘制到另一个 Canvas 中

下面的应用程序将一幅图像绘制在 canvas 中，然后在图像上方绘制了一些用作水印的文本。

<WatermarkDemo />

当用户通过滑动条调整放大倍数时，应用程序会同时对图像与文本进行缩放，核心代码为：

```ts
const { width, height } = image;
// 缩放后的宽度与高度
const drawW = width * scaleValue;
const drawH = height * scaleValue;
ctx.clearRect(0, 0, cw, ch);
ctx.drawImage(image, 0, 0, cw, ch);
ctx.save();
ctx.strokeStyle = "yellow";
ctx.fillStyle = "#7f9ccb80";
const fontSize = 96;
ctx.font = fontSize + "px Arial";
ctx.textBaseline = "middle";
ctx.textAlign = "center";
ctx.shadowColor = "#0008";
ctx.shadowBlur = 10;
const content1 = "Copyright";
const content2 = "Acme Inc.";
ctx.fillText(content1, cw / 2, ch / 2 - fontSize / 2);
ctx.fillText(content2, cw / 2, ch / 2 + fontSize / 2);
ctx.strokeText(content1, cw / 2, ch / 2 - fontSize / 2);
ctx.strokeText(content2, cw / 2, ch / 2 + fontSize / 2);
ctx.restore();
ctx.drawImage(
  ctx.canvas,
  0,
  0,
  cw,
  ch,
  cw / 2 - drawW / 2,
  ch / 2 - drawH / 2,
  drawW,
  drawH
);
```

## 离屏 canvas

离屏 canvas 经常用于存放临时性的图像信息，这在很多情况下都非常有用。

下面的例子是用离屏 canvas 实现的水印显示功能。

<WatermarkDemo2 />

在本例中，离屏 canvas 存储的是未经放大的图像与水印。当用户拖动滑动条时，应用程序会将离屏 canvas 里面的内容复制到正在显示的 canvas 中，这个过程中也会根据用户指定的数值对所绘内容进行放大。

实现的主要代码为：

```ts
function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  const offlineCanvas = document.createElement("canvas") as HTMLCanvasElement;
  offlineCanvas.width = cw;
  offlineCanvas.height = ch;
  const offlineCtx = offlineCanvas.getContext("2d")!;

  image.onload = () => {
    offlineCtx.drawImage(image, 0, 0, cw, ch);
    offlineCtx.strokeStyle = "yellow";
    offlineCtx.fillStyle = "#000";
    const fontSize = 96;
    offlineCtx.font = fontSize + "px Arial";
    offlineCtx.textBaseline = "middle";
    offlineCtx.textAlign = "center";
    offlineCtx.shadowColor = "#0008";
    offlineCtx.shadowBlur = 10;
    const content1 = "Copyright";
    const content2 = "Acme Inc.";
    offlineCtx.fillText(content1, cw / 2, ch / 2 - fontSize / 2);
    offlineCtx.fillText(content2, cw / 2, ch / 2 + fontSize / 2);
    offlineCtx.strokeText(content1, cw / 2, ch / 2 - fontSize / 2);
    offlineCtx.strokeText(content2, cw / 2, ch / 2 + fontSize / 2);
    watchEffect(() => {
      const { width, height } = image;
      const drawW = width * scaleValue.value;
      const drawH = height * scaleValue.value;

      ctx.restore();
      ctx.drawImage(
        offlineCanvas,
        0,
        0,
        cw,
        ch,
        cw / 2 - drawW / 2,
        ch / 2 - drawH / 2,
        drawW,
        drawH
      );
    });
  };
  image.src = lonelybeachUrl;
}
```

要使用离屏 canvas，通常要遵循如下四个步骤：

1. 创建用于做离屏 canvas 的元素
2. 设置离屏的 canvas 的宽度与高度
3. 在离屏 canvas 中进行绘制
4. 将离屏 canvas 的全部或一部分内容复制到正在显示的

:::tip

离屏 canvas 会占据一定的内存，不过它们可以显著地提高绘图效率。

:::

## 操作图像的像素

`getImageData` 与 `putImageData` 这两个方法分别用于获取图像的像素信息，以及向图像中插入像素。如果有需要，也可以修改像素的值，所以说，这两个方法让开发者可以对图像中的像素进行任何的操作。

### 获取图像数据

如下示例是实现拖动鼠标选取图片区域进行缩放的例子。

<RubberSelectImage />

实现代码如下：

```ts
function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  let curImageData: ImageData;
  let startPos: Pos | null = null;
  function initCanvas() {
    ctx.drawImage(image, 0, 0);
    curImageData = ctx.getImageData(0, 0, cw, ch);
    startPos = null;
  }
  image.onload = () => {
    initCanvas();
  };
  ctx.canvas.onmousedown = (e) => {
    startPos = mouseEventToPos(ctx.canvas, e);
  };
  ctx.canvas.onmousemove = (e) => {
    if (startPos) {
      ctx.putImageData(curImageData, 0, 0);
      const endPos = mouseEventToPos(ctx.canvas, e);
      const { left: x, top: y, width, height } = calcRectInfo(startPos, endPos);
      ctx.save();
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      ctx.restore();
    }
  };
  ctx.canvas.onmouseup = (e) => {
    if (startPos) {
      ctx.putImageData(curImageData, 0, 0);
      const endPos = mouseEventToPos(ctx.canvas, e);
      const { left: x, top: y, width, height } = calcRectInfo(startPos, endPos);
      ctx.drawImage(ctx.canvas, x, y, width, height, 0, 0, cw, ch);
      curImageData = ctx.getImageData(0, 0, cw, ch);
      startPos = null;
    }
  };
  resetCanvas = () => {
    initCanvas();
  };
  image.src = archUrl;
}
```

:::tip

在使用 `putImageData` 方法向 canvas 中绘制图像数据时，诸如 `globalAlpha` 与 `globalCompositeOption` 这样的全局 canvas 属性值不会影响到所绘的图像。浏览器也不会在绘制时运用图像合成、透明混合或阴影效果。`drawImage` 会受上述所有全局属性的影响。

:::

`putImageData` 的声明为 `putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)` ，参数的含义为：

- `imageData`: 要绘制的 ImageData 对象，必需
- `dx`: 目标画布中放置图像的 x 坐标
- `dy`: 目标画布中放置图像的 y 坐标
- `dirtyX`: 源图像数据中矩形区域的 x 坐标
- `dirtyY`: 源图像数据中矩形区域的 y 坐标
- `dirtyWidth`: 源图像数据中矩形区域的宽度
- `dirtyHeight`: 源图像数据中矩形区域的高度

### 修改图像数据

下面的程序通过修改 ImageData 中 data 数组中的 alpha 颜色分量，实现框选部分的通量减半，增加透明度：

<RubberSelectImage2 />

实现代码为：

```ts
function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  let curImageData: ImageData;
  let curSelectedImageData: ImageData;
  let startPos: Pos | null = null;
  function saveImageData() {
    curImageData = ctx.getImageData(0, 0, cw, ch);
    // curSelectedImageData 为修改了 curImageData 透明度的图片数据
    curSelectedImageData = ctx.createImageData(cw, ch);
    for (let i = 0; i < curImageData.data.length; i++) {
      if (i % 4 === 3) {
        curSelectedImageData.data[i] = Math.floor(curImageData.data[i] / 2);
      } else {
        curSelectedImageData.data[i] = curImageData.data[i];
      }
    }
  }
  function initCanvas() {
    ctx.drawImage(image, 0, 0);
    saveImageData();
    startPos = null;
  }
  image.onload = () => {
    initCanvas();
  };
  ctx.canvas.onmousedown = (e) => {
    startPos = mouseEventToPos(ctx.canvas, e);
  };
  ctx.canvas.onmousemove = (e) => {
    if (startPos) {
      ctx.putImageData(curImageData, 0, 0);
      const endPos = mouseEventToPos(ctx.canvas, e);
      const { left: x, top: y, width, height } = calcRectInfo(startPos, endPos);
      // 绘制修改了透明度的部分图片数据
      ctx.putImageData(curSelectedImageData, 0, 0, x, y, width, height);
      ctx.save();
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      ctx.restore();
    }
  };
  ctx.canvas.onmouseup = (e) => {
    if (startPos) {
      ctx.putImageData(curImageData, 0, 0);
      const endPos = mouseEventToPos(ctx.canvas, e);
      const { left: x, top: y, width, height } = calcRectInfo(startPos, endPos);
      ctx.drawImage(ctx.canvas, x, y, width, height, 0, 0, cw, ch);
      saveImageData();
      startPos = null;
    }
  };
  resetCanvas = () => {
    initCanvas();
  };
  image.src = archUrl;
}
```

代码中会调用 `createImageData` 方法来创建 `ImageData` 对象。

`ImageData` 对象中的 `data` 属性指向一个包含 8 位二进制整数的数组，这些指数的值位于 0 ~ 255 之间，分别表示一个像素的红、绿、蓝及透明度分量。

#### 图像滤镜

在学会了如何操作图像中的单个像素之后，我们来讲讲图像滤镜(image filtering)的实现。下面的例子展示了两种滤镜，分别是负片滤镜(negative filter)与黑白滤镜(black-and-white filter)。

<FilterDemo />

负片滤镜与黑白滤镜会对图像数据进行遍历，每个循环会处理 4 个整数值，所以说每次循环结束后，数组下标总是会指向某个像素的红色分量。在循环体中，滤镜的代码会修改每个像素的红、绿、蓝分量值。滤镜算法不会改变像素的 alpha 值。

负片滤镜会从 255 中减去每个像素的红、绿、蓝分量值，再将差值设置回去，这样也就等于“反转”了该像素的颜色，代码为：

```ts
function generateNegativeData() {
  const result = ctx.createImageData(cw, ch);
  for (let i = 0; i < imageData.data.length; i += 4) {
    result.data[i] = 255 - imageData.data[i];
    result.data[i + 1] = 255 - imageData.data[i + 1];
    result.data[i + 2] = 255 - imageData.data[i + 2];
    result.data[i + 3] = imageData.data[i + 3];
  }
  return result;
}
```

黑白滤镜会计算每个像素红、绿、蓝分量的平均值，然后将三个分量都设置为这一均值，于是图像就由彩色变为了黑白，代码为：

```ts
function generateBlackwhiteData() {
  const result = ctx.createImageData(cw, ch);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const data = imageData.data;
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    const v = Math.floor((r + g + b) / 3);
    result.data[i] = v;
    result.data[i + 1] = v;
    result.data[i + 2] = v;
    result.data[i + 3] = a;
  }
  return result;
}
```

#### 设备像素与 CSS 像素的区别

某些滤镜，例如下面示例所示的浮雕滤镜(embossing filter)，在计算滤镜效果时需要获取图像数据的宽度。举例来说，如果滤镜需要一个简单的等式来计算某个像素值，而该等式要用到当前像素右方及下一行的对应像素值，那么此时必须知道图像的宽度，才能计算下一行的那个像素在数组中的位置。

<EmbossFilterDemo />

核心代码如下：

```ts
ctx.drawImage(image, 0, 0);
const imageData = ctx.getImageData(0, 0, cw, ch);
function generateEmbossData() {
  const result = ctx.createImageData(cw, ch);
  // 忽略最下方的像素点
  for (let i = 0; i < imageData.data.length - image.width * 4; i += 4) {
    if ((i / 4) % image.width === image.width - 1) {
      for (let j = 0; j < 4; j++) {
        result.data[i + j] = imageData.data[i + j - 4];
      }
      continue;
    }
    for (let j = 0; j < 3; j++) {
      result.data[i + j] =
        128 +
        2 * imageData.data[i + j] -
        imageData.data[i + j + 4] -
        imageData.data[i + j + image.width * 4];
    }
    result.data[i + 3] = imageData.data[i + 3];
  }
  return result;
}
```

上述代码会将所有像素都染成泥灰色，并且使用一种名为“边缘检测”的技术使得位于颜色边界处的像素灰度更浓。这里所说的颜色边界是指像素颜色值发生突变的地方。实现边缘检测技术所用的算法需要计算当前像素值，及其右方与下方像素的值。

本章讲的图像操作所采用的都是小图像，因而不会引发性能问题。然而，如果在相对大一些的图像上运用复杂的算法，浏览器可能会因为等待计算完成而陷入无响应的状态。接下来我们就讲讲如何应对这种状况。

#### 用工作线程处理图片

在处理图像时，很可能遭遇性能瓶颈，比如在一个配置不高的手机上处理大幅图像时。如果程序出现了性能问题，可以考虑讲图像处理的任务交给工作线程(Web Worker)来做。

浏览器在执行 JavaScript 代码时，使用的是主线程，这意味着某些较为耗时的脚本可能会让应用程序变得很迟钝。幸好我们可以在 HTML5 开发中使用工作线程技术将某些代码放在主线程之外执行。

如下示例，会对图像运用墨镜滤镜(sunglass filter)效果，它把实际的图像处理放在工作线程中执行。

<SunglassFilterDemo />

代码如下：

```ts
const isNormal = ref(true);

const worker = new Worker(new URL("./sunglass-filter.ts", import.meta.url), {
  type: "module",
});

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, cw, ch);

    worker.onmessage = (e: MessageEvent<ImageData>) => {
      ctx.putImageData(e.data, 0, 0);
    };

    watch(isNormal, (nv) => {
      if (nv) {
        ctx.putImageData(imageData, 0, 0);
      } else {
        worker.postMessage(ctx.getImageData(0, 0, cw, ch));
      }
    });
  };
  image.src = curvedRoudUrl;
}
```

其中 sunglass-filter.ts 的代码如下：

```ts
// src/workers/calc.worker.ts
/// <reference lib="webworker" />

self.onmessage = (event: MessageEvent<ImageData>) => {
  const imagedata = event.data;
  const data = imagedata.data;
  console.log("window type: ", typeof window);
  for (let i = 0; i < data.length; i += 4) {
    if ((i / 4) % imagedata.width === imagedata.width - 1) {
      // 一行中的最后一列
      for (let j = 0; j < 4; j++) {
        data[i + j] = data[i + j - 4];
      }
    } else {
      for (let j = 0; j < 4; j++) {
        data[i + j] = 2 * data[i + j] - data[i + j + 4] * 1.5;
      }
    }
  }
  postMessage(imagedata);
};
```

## 结合剪辑区域来绘制图像

下面的例子用到了工作线程、图像处理、离屏 canvas、剪辑区域，以及 Canvas 绘图 API 等技术。

<SunglassDemo />

## 以图像制作动画

在某段时间内持续向一幅图片运用滤镜，就可以实现动画效果了。如下面的示例，实现了图片渐渐淡出的动画。

<FadeOutDemo />

该示例通过在每次 `requestAnimationFrame` 持续地降低每个像素的 alpha 值，直到图像从视窗中淡出。

用户点击“Fade Out”按钮后，应用程序即开始播放共 250 帧的动画。动画中的每幅画面的播放速率都是 60 帧/秒，所以整个动画持续大约 4 秒。

淡出动画效果的难点在于，每个像素起始的 alpha 值各不相同，因此，在每一帧中，应用程序都必须根据其初始值来降低每个像素的 alpha 值。为了便于执行这种“动态降低 alpha 值”的算法，程序把 `getImageData` 方法返回的所有原始像素数据都保存起来，在其后的每一帧动画中，程序都会根据每个像素的初始值来决定的钱这一步要减少的 alpha 值。

上述逻辑的代码如下：

```ts
const { width: cw, height: ch } = ctx.canvas;
const image = new Image();
let originImageData: ImageData;
function drawImage() {
  ctx.drawImage(image, 0, 0);
}
let initCount = -120;
// 淡出动画的帧数
let animateFrameCount = 250;
let count = initCount;
function redraw() {
  if (count < initCount) {
    requestAnimationFrame(redraw);
  } else {
    if (count === initCount) {
      ctx.putImageData(originImageData, 0, 0);
    } else if (count >= 0) {
      const newImageData = ctx.createImageData(cw, ch);
      for (let i = 0; i < originImageData.data.length; i++) {
        if ((i + 1) % 4 === 0) {
          // 计算透明度
          const oldAlpha = originImageData.data[i];
          const newAlpha = Math.floor((oldAlpha * count) / animateFrameCount);
          newImageData.data[i] = newAlpha;
        } else {
          newImageData.data[i] = originImageData.data[i];
        }
      }
      ctx.putImageData(newImageData, 0, 0);
    }
    count--;
    requestAnimationFrame(redraw);
  }
}

// 点击图片淡出按钮执行的回调
function startFadeout() {
  count = animateFrameCount;
}

image.onload = (e) => {
  drawImage();
  originImageData = ctx.getImageData(0, 0, cw, ch);
  redraw();
};
image.src = logCrossingUrl;
```

:::tip

上述示例是通过修改每个像素的 alpha 值来达到图像淡出效果的。像往常一样，还有很多方式可以在 canvas 中做出相同的效果来。例如，可以在绘制每帧动画之前，先修改绘图环境对象的 globalAlpha 值，然后再绘制图像，这样也能实现淡出效果。

:::

### 用离屏 canvas 制作动画

上面的例子通过持续地增加每个像素的透明度来实现图像的淡出效果。图像中每个像素的初始透明度可能互不相同，所以当程序将图像绘制到 canvas 后，就会调用 `getImageData` 方法捕获图像中所有像素的值。在稍后绘制动画的每一帧时，程序都会根据存放在图像数据中的像素初始透明度(以 alpha 值的形式表示)，来计算这一帧应该把每个像素的 alpha 值分别降低多少。

在制作图像的淡入效果时，也可以使用相同的算法。现将图像的像素值保存在一份快照中，然后根据像素的初始 alpha 值，计算在动画的每一帧中各像素的 alpha 值增量。但是，在播放淡入动画时，图像一开始是不会显示出来的，所以不能直接从屏幕 canvas 中捕获其像素值。

为了在显示图像之前能够捕获其像素，下面的示例先将图像绘制到离屏 canvas 中，然后从该 canvas 中捕获像素值。

淡入效果的示例如下：

<FadeInDemo />

## 性能

在进行图像处理时，须考虑性能问题。这里会研究三个性能测试，它们所测试的内容如下：

- 遍历图像数据
- 对比 `drawImage` 与 `putImageData` 的绘图效率；
- 使用 `drawImage` 来绘制 canvas，而非普通的图像；
- 使用 `drawImage` 绘图时缩放图像；

### 对比 `drawImage(HTMLImage)`、`drawImage(HTMLCanvas)`与`putImageData()` 的绘图效率

`drawImage` 与 `putImageData` 都可以将图像绘制到 canvas 中，不过 `drawImage` 要比 `putImageData` 快很多。

除了绘制性能高这个优势外，`drawImage` 还能将 canvas 绘制到另一个 canvas，这是 `putImageData` 做不到的。另外，绘制 canvas 的速度通常不会比绘制图像慢很多。

下面是测试的例子：

<DrawImageVsPutImageData />

从测试结果可以看出，`DrawImage` 的性能比 `putImageData` 快上百倍。而绘制 canvas 会比绘制图像稍慢一点点，几乎可以忽略不计。

### 遍历图像数据

就其本质而言，操作图像数据是一件与性能紧密相关的事情。遍历含有大量数据的数组是非常耗时的。所幸，在操作 canvas 图像数组时，有很多办法可以提高程序运行效率。

- 避免在循环体中直接访问对象的属性，而是应该将其存放于局部变量中；
- 应该用循环计数器来遍历完整的像素，而非像素分量；
- 逆向遍历于移位(bit-shifting)技巧的效果很不好；
- 不要频繁调用 `getImageData` 来获取少量数据；

下面的例子测试不同的 for 循环的性能：

<ForLoopTest />

#### 避免在循环体内直接访问对象属性，而应将其存于局部变量中

上述例子中前 4 个测试用例持续对比了两种访问图像数据的方式。一种时直接使用 width 与 height 这样的对象属性，另一种则先将其存于局部变量中，然后再使用它。

这些测试也比较了使用单层循环与双层循环遍历图像数据时的速度。如果使用单层循环来遍历图像数据，那么直接访问对象属性与将其存放于局部变量相比，速度上没有差别。然而，如果用双层循环来遍历，那么通过局部变量来访问就要比直接访问对象属性快得多。因此，把需要访问的对象属性存于局部变量中似乎是个好办法。

#### 应该使用循环计数器来遍历完整的像素，而非像素分量

图像数据中的每个像素都是以 4 个 8 位二进制整数来保存的，它们分别表示像素的红、绿、蓝及 Alpha 分量，每个分量的取值范围为 0 ~ 255。

如果按像素分量来遍历的话，那么循环计数器的步进次数将会是像素个数的 4 倍。因此，最好是每次循环体内都以相同的计数值为基准来遍历一个完整的像素，而不是每次只遍历一个像素分量。正是这个原因，在很多测试用例中，循环计数器每次的步进都是 4.

## 放大镜

下面的示例演示了放大镜应用程序。可以拖动它来放大显示图像中的各个部分，也可以拖动顶部的滑动条来调整放大镜的大小及放大倍数。

<Magnifier />
