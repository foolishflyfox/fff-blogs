<template>
  <CanvasContainer :draw :width="380" :height="150" background-color="#0000" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = 20;
  ctx.font = "12pt Arial";

  ctx.beginPath();
  ctx.lineJoin = "round";
  ctx.moveTo(20, 20);
  ctx.lineTo(150, 20);
  ctx.lineTo(150, 65);
  ctx.stroke();
  ctx.fillText("round", 180, 20);

  ctx.beginPath();
  ctx.lineJoin = "bevel";
  ctx.moveTo(70, 50);
  ctx.lineTo(200, 50);
  ctx.lineTo(200, 95);
  ctx.stroke();
  ctx.fillText("bevel", 230, 50);

  ctx.beginPath();
  ctx.lineJoin = "miter";
  ctx.moveTo(120, 80);
  ctx.lineTo(250, 80);
  ctx.lineTo(250, 125);
  ctx.stroke();
  ctx.fillText("miter(默认)", 280, 80);
}
</script>

<style scoped></style>
