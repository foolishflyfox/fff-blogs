<template>
  <CanvasContainer :draw :width="450" :height="275" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height,
    10,
    canvas.width / 2,
    0,
    100
  );
  gradient.addColorStop(0, "blue");
  gradient.addColorStop(0.25, "white");
  gradient.addColorStop(0.5, "purple");
  gradient.addColorStop(0.75, "red");
  gradient.addColorStop(1, "yellow");
  ctx.fillStyle = gradient;
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
}
</script>

<style scoped></style>
