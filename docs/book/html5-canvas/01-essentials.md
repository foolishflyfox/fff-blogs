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
:::
