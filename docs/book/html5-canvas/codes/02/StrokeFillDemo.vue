<template>
  <CanvasContainer
    :draw
    :width="1000"
    :height="700"
    background-color="#eee"
    style="width: 600px; height: 420px"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

function draw(ctx: CanvasRenderingContext2D) {
  drawGrid(ctx, "#ccc", 10);
  ctx.font = "48px Helvtica";
  ctx.strokeStyle = "blue";
  ctx.fillStyle = "red";
  ctx.lineWidth = 2;
  // 文本绘制
  ctx.strokeText("Stroke", 60, 110);
  ctx.fillText("Fill", 440, 110);
  ctx.strokeText("Stroke & Fill", 650, 110);
  ctx.fillText("Stroke & Fill", 650, 110);
  // 矩形绘制
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.rect(80, 150, 160, 100);
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(400, 150, 150, 100);
  ctx.fill();
  ctx.beginPath();
  ctx.rect(750, 150, 150, 100);
  ctx.stroke();
  ctx.fill();
  // 开放圆弧
  ctx.beginPath();
  ctx.arc(150, 370, 60, 0, (Math.PI * 3) / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(475, 370, 60, 0, (Math.PI * 3) / 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(820, 370, 60, 0, (Math.PI * 3) / 2);
  ctx.stroke();
  ctx.fill();
  // 闭合圆弧
  ctx.beginPath();
  ctx.arc(150, 550, 60, 0, (Math.PI * 3) / 2);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(475, 550, 60, 0, (Math.PI * 3) / 2);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(820, 550, 60, 0, (Math.PI * 3) / 2);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
</script>

<style scoped></style>
