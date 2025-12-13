<template>
  <CanvasContainer
    :draw
    :width="680"
    :height="440"
    background-color="#fafafa"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

const textAlign: CanvasTextAlign[] = [
  "start",
  // "left",
  "center",
  // "right",
  "end",
];

const textBaseline: CanvasTextBaseline[] = [
  "top",
  "middle",
  "bottom",
  "alphabetic",
  "ideographic",
  "hanging",
];

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw } = ctx.canvas;
  drawGrid(ctx, "lightgray", 10);

  for (let i = 0; i < textBaseline.length; i++) {
    const y = 20 + i * 70;
    // 绘制横线
    ctx.save();
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(cw, y);
    ctx.stroke();
    ctx.restore();
    ctx.font = "24px Arial";
    ctx.fillStyle = "#6e95e6";
    for (let j = 0; j < textAlign.length; j++) {
      const x = 20 + j * 320;
      // 绘制文本
      ctx.save();
      ctx.textBaseline = textBaseline[i];
      ctx.textAlign = textAlign[j];
      ctx.fillText(`${textAlign[j]}/${textBaseline[i]}`, x, y);
      ctx.restore();
      // 绘制定位点
      ctx.save();
      ctx.strokeStyle = "#888";
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.rect(x, y, 5, 5);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
}
</script>

<style scoped></style>
