<template>
  <CanvasContainer
    :draw
    :width="350"
    :height="300"
    background-color="lightskyblue"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  const { width: cw, height: ch } = canvas;
  const bw = 120;
  const bh = 50;
  const bl = (cw - bw) / 2;
  const bt = 160;
  let lastTime = 0;
  function drawButton() {
    ctx.save();
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowColor = "#0008";
    ctx.fillStyle = "#c0e1fa";
    ctx.fillRect(bl, bt, bw, bh);
    ctx.restore();
    const m = 3;
    // 绘制左三角
    ctx.save();
    ctx.fillStyle = "#7393d9";
    ctx.moveTo(cw / 2 - m * 2, bt + m * 2);
    // ctx.quadraticCurveTo(cw / 2 - m, bt + m, cw / 2 - m, bt + m * 3);
    ctx.arcTo(cw / 2 - m, bt + m, cw / 2 - m, bt + m * 3, 1 * m);
    ctx.lineTo(cw / 2 - m, bt + bh - m * 3);
    ctx.arcTo(cw / 2 - m, bt + bh - m, cw / 2 - m * 2, bt + bh - m * 2, m);
    ctx.lineTo(bl + 2 * m, bt + bh / 2 + m);
    ctx.arcTo(bl + m, bt + bh / 2, bl + 2 * m, bt + bh / 2 - m, m);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  drawButton();
}
</script>

<style scoped></style>
