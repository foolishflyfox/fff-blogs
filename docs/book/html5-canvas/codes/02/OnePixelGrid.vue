<template>
  <CanvasContainer :draw :width="400" :height="300" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

function draw(ctx: CanvasRenderingContext2D) {
  drawGrid(ctx, "lightgray", 10);
}
</script>

<style scoped></style>
