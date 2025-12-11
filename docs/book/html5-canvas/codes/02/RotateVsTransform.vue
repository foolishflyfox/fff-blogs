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
  const theta = Math.PI / 6;
  ctx.rotate(theta);
  drawGrid(ctx, "lightgray", 10);
  ctx.fillRect(60, 20, 50, 50);
}

function draw2(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "orange";
  const theta = Math.PI / 6;
  const cosV = Math.cos(theta);
  const sinV = Math.sin(theta);
  ctx.transform(cosV, sinV, -sinV, cosV, 0, 0);
  drawGrid(ctx, "lightgray", 10);
  ctx.fillRect(60, 20, 50, 50);
}
</script>

<style scoped></style>
