<script setup>
import { 
  CanvasDrawImage,
  ImageScaleDemo,
  ImageScaleSlider,
  WatermarkDemo,
  WatermarkDemo2,
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
