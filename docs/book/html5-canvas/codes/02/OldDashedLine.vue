<template>
  <CanvasContainer :draw :width="500" :height="500" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;
  function drawDashLine(
    x1: number, // 起始 x 坐标
    y1: number, // 起始 y 坐标
    x2: number, // 终止 x 坐标
    y2: number, // 终止 y 坐标
    dashLength: number // 虚线中每个线段的长度
  ) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    // 虚线线段的条数
    const numDashes =
      Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY)) / dashLength;
    for (let i = 0; i < numDashes; ++i) {
      const tx = x1 + (deltaX / numDashes) * i;
      const ty = y1 + (deltaY / numDashes) * i;
      if (i % 2 === 0) {
        ctx.moveTo(tx, ty);
      } else {
        ctx.lineTo(tx, ty);
      }
    }
    ctx.stroke();
  }
  drawDashLine(20, 20, cw - 20, 20, 5);
  drawDashLine(cw - 20, 20, cw - 20, ch - 20, 10);
  drawDashLine(cw - 20, ch - 20, 20, ch - 20, 15);
  drawDashLine(20, ch - 20, 20, 20, 10);
}
</script>

<style scoped></style>
