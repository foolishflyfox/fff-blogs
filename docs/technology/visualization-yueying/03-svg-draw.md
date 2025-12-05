<script setup>
import { SimpleCircleSvg } from './codes/03'
</script>

# 03. 声明式图形系统 - SVG 绘图

SVG 的全称是 Scalable Vector Graphics，可缩放矢量图，它是浏览器支持的一种基于 XML 语法的图像格式。

对于前端工程师而言，使用 SVG 的门槛很低。因为描述 SVG 的 XML 语言本身和 HTML 非常接近，都是标签 + 属性构成的，而且浏览器的 CSS、JavaScript 都能够正常作用于 SVG 元素。这让我们在操作 SVG 时，没有特别大的难度，甚至可以认为，SVG 就是 HTML 的增强版。

对于可视化来说，SVG 是非常重要的图形系统。它既可以用 JavaScript 操作绘制各种几何图形，还可以作为浏览器支持的一种图片格式，来独立使用 img 标签加载或通过 Canvas 绘制。

即使我们选择使用 HTML 和 CSS、Canvas2D 或 WebGL 的方式实现可视化，但我们依然可以且很有可能使用 SVG 图像。

## 利用 SVG 绘制几何图形

SVG 属于声明式绘图系统，它的绘制方式和 Canvas 不同，它不需要 JS 操作绘图指令，只需要和 HTML 一样声明一些标签即可实现绘图了。

下面是 SVG 声明的例子：

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="orange" />
</svg>
```

上面的代码中，`svg` 元素是 SVG 的根元素，属性 xmlns 是 xml 的名字空间。第一行代码表示，`svg` 元素的 xmlns 属性值是 http://www.w3.org/2000/svg ，浏览器根据该属性就能够识别出这是一段 SVG 的内容了。

`svg` 元素下的 `circle` 元素表示这是一个绘制在 SVG 图像中的圆形，属性 `cx` 和 `cy` 是坐标，表示圆心的位置在图像的 x=100、y=50 位置。属性 `r` 表示圆的半径，`r=40` 表示半径为 40。

SVG 坐标系和 Canvas 坐标系完全一样，都是以图像左上角为原点，x 轴向右、y 轴向下的左手坐标系。默认情况下，SVG 坐标与浏览器像素对应，所以 `cx`、`cy`、`r` 值的单位就是 px，也就是像素，不需要特别设置。

我们可以通过 svg 元素设置 `viewBox` 属性，来改变 SVG 的坐标系。如果设置了 `viewBox` 属性，那 SVG 内部的绘制就都是相对于 SVG 坐标系的了。

下面就是上述 SVG 的显示了：

<SimpleCircleSvg />
