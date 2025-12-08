<template>
  <CanvasContainer :draw background-color="#eee" :width="300" :height="150" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.shadowColor = "#888e";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.beginPath();
  ctx.rect(20, 20, 100, 100);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.fillRect(150, 20, 100, 100);
}
</script>

<style scoped></style>
