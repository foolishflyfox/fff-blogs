<script setup>
import {
  BlurFilterDemo,
  BrightnessFilterDemo,
  ContrastFilterDemo,
  DropShadowFilterDemo,
  GrayscaleFilterDemo,
  HueRotateFilterDemo,
  InvertFilterDemo,
  OpacityFilterDemo,
  SaturateFilterDemo,
  SepiaFilterDemo,
  NoneFilterDemo,
  FontStretchDemo,
  ImageSmoothingEnableDemo,
  LetterSpacingDemo,
  WordSpacingDemo,
  EllipseDemo,
  RoundRectDemo,
} from "./codes/ex";
</script>

# 新特性测试

## 实例属性

### filter 滤镜

`CanvasRenderingContext2D.filter` 属性用来提供模糊、灰度等滤镜效果。它类似于 CSS 的 filter 属性，并接受相同的值。

`filter` 属性接受字符串类型值，可以是 `"none"` 或者是以下一个或多个滤镜函数。

#### 不应用滤镜

初始值为 `none`，表示不应用滤镜，如下所示：

<NoneFilterDemo />

#### 高斯模糊滤镜

将高斯模糊应用于绘图，它定义了高斯函数的标准偏差值，即屏幕上多少个像素混合在一起。因此，较大的值会产生更模糊的效果，使用方式为 `blur(偏差值)` ，值为 0 时保持输入不变。例如: `blur(0)`, `blue(4px)`, `blur(1.5rem)`。

<BlurFilterDemo />

#### brightness 亮度滤镜

将线性乘数应用于绘图，使其看起来更亮或更暗。低于 `100%` 的值会使图像变暗，高于 `100%` 的值会使其变量，值为 `0%` 会生成全黑色的图像，值为 `100%` 保持不变，例如 `brightness(1)`,`brightness(80%)`,`brightness(2)`。

<BrightnessFilterDemo />

#### contrast 对比度滤镜

调整绘图的对比度，值为 `0%` 会生成完全黑色的绘图，值为 100% 保持绘图不变。例如 `constrast(1)`,`constrast(80%)`,`constrast(2)`。

<ContrastFilterDemo />

#### drop-shadow 阴影滤镜

将阴影效果应用于绘图。阴影效果实际上是绘图 alpha 蒙版的模糊、偏移版本，以特定颜色绘制，位于绘图下方，此函数最多接受五个参数：

- `offset-x`: 指定水平偏移距离，例如 `10px`,`2em`；
- `offset-y`: 指定垂直偏移距离，例如 `10px`,`2em`；
- `blur-radius`: 模糊半径，该值越大，模糊程度越高，因此阴影会变得更大更淡，不允许使用复制；
- `color`: 阴影颜色

<DropShadowFilterDemo />

#### grayscale 灰度滤镜

将绘图转换为灰度，值为 `100%` 完全灰度化，值为 `0%` 保持绘图不变。

<GrayscaleFilterDemo />

#### hue-rotate 色相旋转滤镜

对绘图应用色相旋转，值为 `0deg` 保持输入不变。

<HueRotateFilterDemo />

#### invert 反转滤镜

反转绘图，值为 `100%` 表示完全反转，为 `0%` 表示保持绘图不变。

<InvertFilterDemo />

#### opacity 不透明度滤镜

对绘图应用不透明度，值为 `0%` 表示完全透明，值为 `100%` 表示保持绘图不变。

<OpacityFilterDemo />

#### saturate 饱和度滤镜

修改绘图饱和度，值为 `0%` 表示完全不饱和，值为 `100%` 表示保持绘图不变。

<SaturateFilterDemo />

#### sepia 深褐色滤镜

将绘图转换为深褐色，值为 `100%` 表示完全深褐色，值为 `0%` 保持绘图不变。

<SepiaFilterDemo />

<!-- ### fontStretch 字体伸缩

指定绘制文本时字体如何被扩展或压缩。

<FontStretchDemo /> -->

### imageSmoothingEnable 图片平滑处理

`imageSmoothingEnable` 属性用于设置是否对缩放后的图片矩形平滑处理，`true` 表示矩形平滑处理(默认)，`false` 表示不矩形。

这个属性对像素为主的游戏或其他应用很有用。放大图像时，默认的调整大小算法都会使像素变模糊。可以将此属性设为 false 设为 false 来保证清晰度。

<ImageSmoothingEnableDemo />

### letterSpacing 字母间距

可以使用该属性来获取或设置间距。如果设置为无效或无法解析的值，属性值将保持不变。

<LetterSpacingDemo />

### wordSpacing 单词间距

可用于获取或设置单词间距。如果设置为无效或无法解析的值，则属性值将保持不变。

<WordSpacingDemo />

## 实例方法

### ellipse 绘制椭圆

<EllipseDemo />

### roundRect 圆角矩形

<RoundRectDemo />
