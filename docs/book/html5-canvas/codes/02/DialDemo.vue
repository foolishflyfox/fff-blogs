<template>
  <CanvasContainer
    class="canvas-container"
    background-color="white"
    :draw
    :width="500"
    :height="430"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const centerX = cw / 2;
  const centerY = ch / 2;
  const outR = 180;
  drawGrid(ctx, "lightgray", 10);
  // 绘制最外层环
  ctx.fillStyle = "#aaa5";
  ctx.beginPath();
  ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
  ctx.moveTo(centerX + outR, centerY);
  ctx.arc(centerX, centerY, outR, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.strokeStyle = "#00f8";
  ctx.beginPath();
  ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#ccc";
  ctx.beginPath();
  ctx.arc(centerX, centerY, outR, 0, Math.PI * 2);
  ctx.stroke();

  // 绘制刻度与数值
  const deltaRadian = Math.PI / 64;
  ctx.strokeStyle = "#00f6";
  ctx.fillStyle = "blue";
  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let i = 0; i < 128; i++) {
    const radian = i * deltaRadian;
    const cosV = Math.cos(radian);
    const sinV = Math.sin(radian);
    const x0 = centerX + outR * cosV;
    const y0 = centerY + outR * sinV;
    let len = i % 2 === 0 ? 10 : 5;
    const x1 = centerX + (outR - len) * cosV;
    const y1 = centerY + (outR - len) * sinV;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    const x2 = centerX + (outR - 23) * cosV;
    const y2 = centerY + (outR - 23) * sinV;
    if (i % 8 === 0) {
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#000a";
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.fillText(
        Math.round((360 - (360 / 128) * i) % 360).toString(),
        x2,
        y2
      );
      ctx.restore();
    }
  }
  ctx.strokeStyle = "lightgray";
  ctx.beginPath();
  ctx.arc(centerX, centerY, outR - 10, 0, Math.PI * 2);
  ctx.stroke();
  // 中心圆
  ctx.strokeStyle = "#aaa";
  ctx.fillStyle = "#0bfa";
  ctx.beginPath();
  ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // 指针圆
  ctx.fillStyle = "#fe48";
  ctx.strokeStyle = "#dcbf72";
  const targetRadian = -Math.PI / 4;
  const targetX = centerX + (outR + 20) * Math.cos(targetRadian);
  const targetY = centerY + (outR + 20) * Math.sin(targetRadian);
  ctx.beginPath();
  ctx.arc(targetX, targetY, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(targetX, targetY);
  ctx.stroke();
}
</script>

<style scoped>
.canvas-container {
  border-radius: 5px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
}
</style>
