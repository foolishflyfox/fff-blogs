<script setup>
import { 
  CanvasDrawImage,
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
