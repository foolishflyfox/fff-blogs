<template>
  <CanvasContainer :draw :width="798" :height="563" style="width: 100%" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import imageUrl from "../shared/images/countrypath.jpg?url";

function draw(ctx: CanvasRenderingContext2D) {
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
  };
  image.src = imageUrl;
}
</script>

<style scoped></style>
