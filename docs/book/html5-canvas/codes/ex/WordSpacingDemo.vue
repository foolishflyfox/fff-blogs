<template>
  <CanvasContainer :draw :width="600" :height="200" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.font = "30px serif";
  ctx.fillText(`Hello world(默认: ${ctx.wordSpacing})`, 10, 40);

  ctx.wordSpacing = "30px";
  ctx.fillText(`Hello world(${ctx.wordSpacing})`, 10, 90);

  ctx.wordSpacing = "3em";
  ctx.fillText(`Hello world(${ctx.wordSpacing})`, 10, 140);
}
</script>

<style scoped></style>
