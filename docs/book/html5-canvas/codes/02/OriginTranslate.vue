<template>
  <CanvasContainer :draw />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 3;
  const rectWidth = 100;
  const rectHeight = 100;
  const { width: cw, height: ch } = ctx.canvas;
  ctx.save();
  ctx.translate(cw / 2 - rectWidth / 2, ch / 2 - rectHeight / 2);
  ctx.strokeRect(0, 0, rectWidth, rectHeight);
  ctx.restore();
}
</script>

<style scoped></style>
