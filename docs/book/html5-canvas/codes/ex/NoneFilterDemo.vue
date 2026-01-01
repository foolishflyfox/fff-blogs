<template>
  <CanvasContainer :draw :width="200" :height="200" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import firefoxUrl from "../shared/images/firefox-logo.svg?url";

function draw(ctx: CanvasRenderingContext2D) {
  const image = new Image();
  image.src = firefoxUrl;
  image.onload = () => {
    ctx.save();
    ctx.filter = "none";
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  };
}
</script>

<style scoped></style>
