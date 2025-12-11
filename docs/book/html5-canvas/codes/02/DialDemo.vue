<template>
  <CanvasContainer
    class="canvas-container"
    background-color="white"
    :draw
    :width="500"
    :height="430"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";
import { drawDial } from "./drawDial";

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const centerX = cw / 2;
  const centerY = ch / 2;
  drawGrid(ctx, "lightgray", 10);
  drawDial(ctx, { x: centerX, y: centerY, r: 200, radian: -Math.PI / 4 });
}
</script>

<style scoped>
.canvas-container {
  border-radius: 5px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
}
</style>
