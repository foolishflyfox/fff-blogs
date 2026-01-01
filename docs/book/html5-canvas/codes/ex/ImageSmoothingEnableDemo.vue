<template>
  <CanvasContainer :draw :width="600" :height="250" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import bigStarUrl from "../shared/images/big-star.png?url";

function draw(ctx: CanvasRenderingContext2D) {
  const image = new Image();
  image.src = bigStarUrl;
  image.onload = () => {
    ctx.font = "18px Arial";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText("源文件", 10, 10);
    ctx.drawImage(image, 10, 50);
    ctx.fillText("Smoothing = TRUE", 100, 10);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(image, 100, 50, image.width * 3, image.height * 3);
    ctx.fillText("Smoothing = FALSE", 300, 10);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, 300, 50, image.width * 3, image.height * 3);
  };
}
</script>

<style scoped></style>
