<script setup>
import {
  BlurFilterDemo,
  BrightnessFilterDemo,
  ContrastFilterDemo,
} from "./codes/ex";
</script>

# 新特性测试

## 实例属性

### filter 滤镜

`CanvasRenderingContext2D.filter` 属性用来提供模糊、灰度等滤镜效果。它类似于 CSS 的 filter 属性，并接受相同的值。

`filter` 属性接受字符串类型值，可以是 `"none"` 或者是以下一个或多个滤镜函数。

#### 高斯模糊滤镜

将高斯模糊应用于绘图，它定义了高斯函数的标准偏差值，即屏幕上多少个像素混合在一起。因此，较大的值会产生更模糊的效果，使用方式为 `blur(偏差值)` ，值为 0 时保持输入不变。例如: `blur(0)`, `blue(4px)`, `blur(1.5rem)`。

<BlurFilterDemo />

#### brightness 亮度滤镜

将线性乘数应用于绘图，使其看起来更亮或更暗。低于 `100%` 的值会使图像变暗，高于 `100%` 的值会使其变量，值为 `0%` 会生成全黑色的图像，值为 `100%` 保持不变，例如 `brightness(1)`,`brightness(80%)`,`brightness(2)`。

<BrightnessFilterDemo />

#### contrast 对比度滤镜

调整绘图的对比度，值为 `0%` 会生成完全黑色的绘图，值为 100% 保持绘图不变。例如 `constrast(1)`,`constrast(80%)`,`constrast(2)`。

<ContrastFilterDemo />
