<template>
  <CanvasContainer :draw :width="450" :height="275" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  // 第一个参数为起始弧度，后两个参数表示中心点的位置
  const gradient = ctx.createConicGradient(Math.PI / 2, cw / 2, ch / 2);
  gradient.addColorStop(0, "blue");
  gradient.addColorStop(0.25, "white");
  gradient.addColorStop(0.5, "purple");
  gradient.addColorStop(0.75, "red");
  gradient.addColorStop(1, "yellow");
  ctx.fillStyle = gradient;
  ctx.rect(0, 0, cw, ch);
  ctx.fill();
}
</script>

<style scoped></style>
