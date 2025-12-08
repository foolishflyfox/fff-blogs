<template>
  <CanvasContainer :draw :width="600" :height="400" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  const cw = ctx.canvas.width;
  const ch = ctx.canvas.height;
  const gradients = [
    ctx.createLinearGradient(0, 0, cw / 2, 0),
    ctx.createLinearGradient(0, 0, 0, ch / 2),
    ctx.createLinearGradient(0, ch / 2, 0, ch * 0.75),
    ctx.createLinearGradient(cw / 2, ch / 2, cw, ch),
  ];
  gradients.forEach((g) => {
    g.addColorStop(0, "blue");
    g.addColorStop(0.25, "white");
    g.addColorStop(0.5, "purple");
    g.addColorStop(0.75, "red");
    g.addColorStop(1, "yellow");
  });
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  // 要绘制的四个矩形的左上角坐标
  const poses = [
    [0, 0],
    [cw / 2, 0],
    [0, ch / 2],
    [cw / 2, ch / 2],
  ];
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = gradients[i];
    ctx.beginPath();
    ctx.rect(poses[i][0], poses[i][1], cw / 2, ch / 2);
    ctx.fill();
    ctx.stroke();
  }
}
</script>

<style scoped></style>
