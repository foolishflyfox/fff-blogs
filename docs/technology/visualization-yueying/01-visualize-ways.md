<script setup>
import { CssBarGraph } from './codes/01'
</script>

# 01 浏览器中实现可视化的四种方式

渲染引擎绘制图形的方式：

1. HTML+CSS：普通 Web 页面
2. SVG
3. Canvas2D
4. WebGL

## HTML + CSS

### HTML 与 CSS 如何实现可视化？

用 CSS 实现柱状图其实很简单，原始就是使用网络布局(Grid Layout) 加上线性渐变 (Linear-gradient)。例如柱状图：

<CssBarGraph />

其 CSS 代码如下：

```css
.bargraph {
  display: grid;
  width: 300px;
  height: 450px;
  padding: 10px;
  grid-template-columns: repeat(5, 20%);
}
.bargraph div {
  margin: 0 2px;
}
.bargraph div:nth-child(1) {
  background: linear-gradient(
    to bottom,
    transparent 75%,
    #37c 0,
    #37c 85%,
    #3c7 0
  );
}
.bargraph div:nth-child(2) {
  background: linear-gradient(
    to bottom,
    transparent 74%,
    #37c 0,
    #37c 89%,
    #3c7 0
  );
}
.bargraph div:nth-child(3) {
  background: linear-gradient(
    to bottom,
    transparent 60%,
    #37c 0,
    #37c 83%,
    #3c7 0
  );
}
.bargraph div:nth-child(4) {
  background: linear-gradient(
    to bottom,
    transparent 55%,
    #37c 0,
    #37c 75%,
    #3c7 0
  );
}
.bargraph div:nth-child(5) {
  background: linear-gradient(
    to bottom,
    transparent 32%,
    #37c 0,
    #37c 63%,
    #3c7 0
  );
}
```
