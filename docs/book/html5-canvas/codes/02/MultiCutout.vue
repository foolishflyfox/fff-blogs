<template>
  <CanvasContainer :draw :width="500" :height="380" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

function draw(ctx: CanvasRenderingContext2D) {
  drawGrid(ctx, "lightgray", 10);
  ctx.fillStyle = "#d2a641";
  ctx.strokeStyle = "#9b7a2f";
  ctx.lineWidth = 2;
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.shadowColor = "rgba(200, 200, 0, 0.5)";

  ctx.beginPath();
  // 顺时针绘制外部矩形(默认就是顺时针的)
  ctx.rect(100, 30, 300, 300);

  // 逆时针绘制内部矩形
  ctx.moveTo(280, 50);
  ctx.lineTo(280, 80);
  ctx.lineTo(340, 80);
  ctx.lineTo(340, 50);
  ctx.closePath();

  // 逆时针绘制三角形
  ctx.moveTo(250, 120);
  ctx.lineTo(200, 190);
  ctx.lineTo(350, 190);
  ctx.closePath();

  // 逆时针绘制圆形
  ctx.moveTo(310, 270); // 移动到圆形绘制的起始点位置
  ctx.arc(280, 270, 30, 0, 2 * Math.PI, true);
  ctx.fill();
  ctx.stroke();
}
</script>

<style scoped></style>
