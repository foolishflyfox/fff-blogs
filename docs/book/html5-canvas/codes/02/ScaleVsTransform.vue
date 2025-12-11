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
  ctx.fillStyle = "orange";
  ctx.scale(2, 1.2);
  drawGrid(ctx, "lightgray", 10);
  ctx.fillRect(10, 10, 50, 50);
}

function draw2(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "orange";
  ctx.transform(2, 0, 0, 1.2, 0, 0);
  drawGrid(ctx, "lightgray", 10);
  ctx.fillRect(10, 10, 50, 50);
}
</script>

<style scoped></style>
