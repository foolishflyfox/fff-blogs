<template>
  <CanvasContainer :draw :width="600" :height="300" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

function draw(ctx: CanvasRenderingContext2D) {
  function drawRoundText(
    content: string, // 绘制文本
    x0: number, // 中心位置x坐标
    y0: number, // 中心位置y坐标
    r: number, // 圆弧半径
    startRadian: number, // 起始弧度
    endRadian: number // 终止弧度
  ) {
    ctx.save();
    ctx.font = "bold 32px Arial";
    ctx.fillStyle = "#73b4d580";
    ctx.strokeStyle = "#0008";
    ctx.beginPath();
    ctx.arc(x0, y0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#888fcb";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 0.5;
    const deltaRadian = (endRadian - startRadian) / content.length;
    for (let i = 0; i < content.length; i++) {
      ctx.save();
      const radian = startRadian + deltaRadian * i;
      const x = x0 + r * Math.cos(radian);
      const y = y0 + r * Math.sin(radian);
      ctx.translate(x, y);
      ctx.rotate(radian + Math.PI / 2);
      ctx.fillText(content.substring(i, i + 1), 0, 0);
      ctx.strokeText(content.substring(i, i + 1), 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }
  drawGrid(ctx, "lightgray", 10);
  drawRoundText("Left Middle Right", 150, 150, 120, Math.PI, Math.PI * 2);
  drawRoundText("Clockwise around the circle ", 450, 150, 120, 0, Math.PI * 2);
}
</script>

<style scoped></style>
