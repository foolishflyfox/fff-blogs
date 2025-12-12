<template>
  <div style="display: flex">
    <CanvasContainer :draw="draw1" :width="200" :height="200" />
    &nbsp;
    <CanvasContainer :draw="draw2" :width="200" :height="200" />
    &nbsp;
    <CanvasContainer :draw="draw3" :width="200" :height="200" />
  </div>
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw1(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = "red";
  ctx.arc(150, 150, 50, 0, Math.PI * 2);
  ctx.fill();
}
function draw2(ctx: CanvasRenderingContext2D) {
  // 只保留矩形中的图形
  ctx.rect(0, 0, 150, 150);
  ctx.clip();
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(150, 150, 50, 0, Math.PI * 2);
  ctx.fill();
}

function draw3(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(150, 150, 50, 0, Math.PI * 2);
  ctx.fill();
  // 擦除矩形中的图形，类似橡皮擦功能
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, 150, 150);
  ctx.clip();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}
</script>

<style scoped></style>
