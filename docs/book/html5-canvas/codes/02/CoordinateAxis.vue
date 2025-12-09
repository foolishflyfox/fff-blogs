<template>
  <CanvasContainer
    :draw
    :width="600"
    :height="400"
    background-color="#f8f8f8"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

function draw(ctx: CanvasRenderingContext2D) {
  drawGrid(ctx, "lightgray", 10);
  const x0 = 40; // 原点 x 位置
  const y0 = 350; // 原点 y 位置
  const axisWidth = 520; // 横轴宽度
  const axisHeight = 320; // 纵轴高度
  const shortTickWidth = 10; // 短刻度长度
  const longTickWidth = 20; // 长刻度长度
  const tickSpacing = 10; // 刻度间距
  // 绘制横轴/纵轴
  ctx.strokeStyle = "#00f";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x0, y0 - axisHeight);
  ctx.lineTo(x0, y0);
  ctx.lineTo(x0 + axisWidth, y0);
  ctx.stroke();
  // 绘制横轴刻度
  for (
    let i = 1, x = x0 + 0.5 + tickSpacing;
    x < x0 + axisWidth;
    i++, x += tickSpacing
  ) {
    const tickWidth = i % 5 === 0 ? longTickWidth : shortTickWidth;
    ctx.beginPath();
    ctx.moveTo(x, y0 - tickWidth / 2);
    ctx.lineTo(x, y0 + tickWidth / 2);
    ctx.stroke();
  }
  // 绘制纵轴刻度
  for (
    let i = 1, y = y0 - 0.5 - tickSpacing;
    y > y0 - axisHeight;
    i++, y -= tickSpacing
  ) {
    const tickWidth = i % 5 === 0 ? longTickWidth : shortTickWidth;
    ctx.beginPath();
    ctx.moveTo(x0 - tickWidth / 2, y);
    ctx.lineTo(x0 + tickWidth / 2, y);
    ctx.stroke();
  }
}
</script>

<style scoped></style>
