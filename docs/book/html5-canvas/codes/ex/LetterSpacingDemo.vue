<template>
  <CanvasContainer :draw :width="600" :height="200" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.font = "30px serif";
  ctx.fillText(`Hello world(默认: ${ctx.letterSpacing})`, 10, 40);

  ctx.letterSpacing = "10px";
  ctx.fillText(`Hello world(${ctx.letterSpacing})`, 10, 90);

  ctx.letterSpacing = "0.6em";
  ctx.fillText(`Hello world(${ctx.letterSpacing})`, 10, 140);
}
</script>

<style scoped></style>
