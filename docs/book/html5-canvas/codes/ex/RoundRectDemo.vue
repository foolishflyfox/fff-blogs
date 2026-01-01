<template>
  <CanvasContainer :draw :width="610" :height="280" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  // 半径为零的圆角矩形（指定为数字）
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.roundRect(10, 20, 150, 100, 0);
  ctx.stroke();
  // 半径为 40px 的圆角矩形（单元素列表）
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.roundRect(10, 20, 150, 100, [40]);
  ctx.stroke();
  // 具有两个不同半径的圆角矩形
  ctx.strokeStyle = "orange";
  ctx.beginPath();
  ctx.roundRect(10, 150, 150, 100, [10, 40]);
  ctx.stroke();
  // 具有四个不同半径的圆角矩形
  ctx.strokeStyle = "green";
  ctx.beginPath();
  ctx.roundRect(400, 20, 200, 100, [0, 30, 50, 60]);
  ctx.stroke();
  // 向后绘制的相同矩形
  ctx.strokeStyle = "magenta";
  ctx.beginPath();
  ctx.roundRect(400, 150, -200, 100, [0, 30, 50, 60]);
  ctx.stroke();
}
</script>

<style scoped></style>
