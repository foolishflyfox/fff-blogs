<script setup>
import {HelloDemo} from "./codes/01";
</script>

# 01. 基础知识

## 1.1 canvas 元素

`canvas` 元素可以说是 HTML5 元素中功能最强大的一个。它真正的能力是通过 Canvas 的 `context` 对象而表现出来的。

下面的代码是使用 Canvas 绘制文本的示例：

```ts
function draw(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  context.font = "38pt Arial";
  context.fillStyle = "cornflowerblue";
  context.strokeStyle = "blue";
  context.fillText(
    "Hello Canvas",
    canvas.width / 2 - 150,
    canvas.height / 2 + 15
  );
  context.strokeText(
    "Hello Canvas",
    canvas.width / 2 - 150,
    canvas.height / 2 + 15
  );
}
```

显示效果为：

<HelloDemo />
