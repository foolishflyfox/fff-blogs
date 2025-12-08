<template>
  <CanvasContainer :draw :width="500" :height="80" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = 1;
  // 绘制第一根线段
  ctx.beginPath();
  ctx.moveTo(50, 10);
  ctx.lineTo(450, 10);
  ctx.stroke();
  // 绘制第二根线段
  ctx.beginPath();
  ctx.moveTo(50.5, 50.5);
  ctx.lineTo(450.5, 50.5);
  ctx.stroke();
}
</script>

<style scoped></style>
