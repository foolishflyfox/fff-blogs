<template>
  <CanvasContainer :draw :width="220" background-color="#0bf8" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "yellow";
  ctx.shadowColor = "rgba(50, 50, 50, 1.0)";
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 4;
  ctx.lineWidth = 20;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(20.5, 80);
  ctx.quadraticCurveTo(50.8, 80, 60.6, 100.5);
  ctx.quadraticCurveTo(90, 200, 110.5, 110.5);
  ctx.quadraticCurveTo(140, 50.5, 190, 30.5);
  ctx.stroke();
}
</script>

<style scoped></style>
