<template>
  <CanvasContainer
    :draw
    :height="300"
    :width="400"
    background-color="#fafafa"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

function draw(ctx: CanvasRenderingContext2D) {
  drawGrid(ctx, "lightgray", 10);
  const anchor1 = { x: 40, y: 20 };
  const anchor2 = { x: 360, y: 280 };
  const ctrl1 = { x: 40, y: 250 };
  const ctrl2 = { x: 360, y: 50 };
  // 绘制三次贝塞尔曲线
  ctx.strokeStyle = "#00f";
  ctx.beginPath();
  ctx.moveTo(anchor1.x, anchor1.y);
  ctx.bezierCurveTo(ctrl1.x, ctrl1.y, ctrl2.x, ctrl2.y, anchor2.x, anchor2.y);
  ctx.stroke();
  // 绘制锚点
  const circleR = 6;
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(anchor1.x, anchor1.y, circleR, 0, Math.PI * 2);
  ctx.arc(anchor2.x, anchor2.y, circleR, 0, Math.PI * 2);
  ctx.fill();
  // 绘制控制点
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(ctrl1.x, ctrl1.y, circleR, 0, Math.PI * 2);
  ctx.arc(ctrl2.x, ctrl2.y, circleR, 0, Math.PI * 2);
  ctx.fill();
}
</script>

<style scoped></style>
