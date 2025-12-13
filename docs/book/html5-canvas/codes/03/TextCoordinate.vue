<template>
  <CanvasContainer :draw :width="650" :height="450" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const margin = 50;
  const x0 = margin;
  const y0 = ch - margin;
  drawGrid(ctx, "lightgray", 10);
  ctx.strokeStyle = "#9b9dcb";
  ctx.lineWidth = 1.5;
  // 绘制主轴
  ctx.beginPath();
  ctx.moveTo(margin, margin - 10);
  ctx.lineTo(x0, y0);
  ctx.lineTo(cw - margin + 10, y0);
  ctx.stroke();

  ctx.font = "bold 12px Arial";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#0008";
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.strokeStyle = "brown";
  ctx.lineWidth = 1;
  ctx.fillStyle = "blue";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  // 绘制横轴
  for (let i = 0; i + margin <= cw - margin; i += 10) {
    if (i !== 0) {
      ctx.beginPath();
      let markLen = 10;
      if ((i / 10) % 5 === 0) {
        markLen = 20;
      }
      ctx.moveTo(x0 + i, y0 - markLen / 2);
      ctx.lineTo(x0 + i, y0 + markLen / 2);
      ctx.stroke();
    }
    if ((i / 10) % 5 === 0) {
      ctx.fillText(String(i / 10), x0 + i, y0 + 20);
    }
  }
  // 绘制纵轴
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let i = 0; y0 - i >= margin; i += 10) {
    if (i !== 0) {
      ctx.beginPath();
      let markLen = 10;
      if ((i / 10) % 5 === 0) {
        markLen = 20;
      }
      ctx.moveTo(x0 - markLen / 2, y0 - i);
      ctx.lineTo(x0 + markLen / 2, y0 - i);
      ctx.stroke();
    }
    if ((i / 10) % 5 === 0) {
      ctx.fillText(String(i / 10), x0 - 20, y0 - i);
    }
  }
}
</script>

<style scoped></style>
