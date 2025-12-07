<template>
  <CanvasContainer :width="400" :draw />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(context: CanvasRenderingContext2D) {
  const canvas = context.canvas;
  context.font = "38pt Arial";
  context.fillStyle = "cornflowerblue";
  context.strokeStyle = "blue";
  context.fillText(
    "Hello Canvas",
    canvas.width / 2 - 150,
    canvas.height / 2 + 15
  );
  context.strokeText(
    "Hello Canvas",
    canvas.width / 2 - 150,
    canvas.height / 2 + 15
  );
}
</script>

<style scoped></style>
