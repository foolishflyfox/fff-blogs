<template>
  <div style="display: flex">
    <CanvasContainer :draw="draw1" />
    &nbsp;
    <CanvasContainer :draw="draw2" />
  </div>
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

function draw1(ctx: CanvasRenderingContext2D) {
  drawGrid(ctx, "lightgray", 10);
  ctx.fillStyle = "orange";
  ctx.translate(60, 30);
  ctx.fillRect(0, 0, 50, 50);
}

function draw2(ctx: CanvasRenderingContext2D) {
  drawGrid(ctx, "lightgray", 10);
  ctx.fillStyle = "orange";
  ctx.transform(1, 0, 0, 1, 60, 30);
  ctx.fillRect(0, 0, 50, 50);
}
</script>

<style scoped></style>
