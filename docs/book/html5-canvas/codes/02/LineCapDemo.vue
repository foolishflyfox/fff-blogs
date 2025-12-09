<template>
  <CanvasContainer :draw :width="300" :height="130" background-color="#0000" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = 20;
  ctx.font = "12pt Arial";
  ctx.lineCap = "butt";
  ctx.beginPath();
  ctx.moveTo(20, 30);
  ctx.lineTo(190, 30);
  ctx.stroke();
  ctx.fillText("butt (默认)", 220, 35);

  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(20, 70);
  ctx.lineTo(190, 70);
  ctx.stroke();
  ctx.fillText("round", 220, 75);

  ctx.lineCap = "square";
  ctx.beginPath();
  ctx.moveTo(20, 110);
  ctx.lineTo(190, 110);
  ctx.stroke();
  ctx.fillText("square", 220, 115);
}
</script>

<style scoped></style>
