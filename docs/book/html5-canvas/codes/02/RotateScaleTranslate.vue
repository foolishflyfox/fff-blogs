<template>
  <CanvasContainer
    :draw
    :width="300"
    :height="200"
    background-color="#fafafa"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

function draw(ctx: CanvasRenderingContext2D) {
  drawGrid(ctx, "lightgray", 10);
  ctx.fillStyle = "orange";
  ctx.fillRect(0, 0, 100, 100);
  ctx.translate(150, 30);
  ctx.rotate(Math.PI / 6);
  ctx.scale(1.3, 0.7);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, 100, 100);
}
</script>

<style scoped></style>
