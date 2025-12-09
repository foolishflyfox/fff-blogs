<template>
  <CanvasContainer :draw :width="300" :height="300" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;

  // 线段与空白的长度都为10
  ctx.setLineDash([10]);
  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(cw - 20, 20);
  ctx.stroke();

  // 线段与空白的长度分别为 15、6
  ctx.setLineDash([15, 6]);
  ctx.beginPath();
  ctx.moveTo(cw - 20, 20);
  ctx.lineTo(cw - 20, ch - 20);
  ctx.stroke();

  // 按 5、20、10、5、20、10 ...，轮流安排线段与空白
  ctx.setLineDash([5, 20, 10]);
  ctx.beginPath();
  ctx.moveTo(cw - 20, ch - 20);
  ctx.lineTo(20, ch - 20);
  ctx.stroke();

  // 恢复实线
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(20, ch - 20);
  ctx.lineTo(20, 20);
  ctx.stroke();
}
</script>

<style scoped></style>
