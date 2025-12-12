<template>
  <CanvasContainer :draw :width="300" :height="200" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.font = "bold 64pt Arial";
  ctx.fillStyle = "green";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("HTML5", 150, 50);
  ctx.fillText("HTML5", 150, 150, 100);
}
</script>

<style scoped></style>
