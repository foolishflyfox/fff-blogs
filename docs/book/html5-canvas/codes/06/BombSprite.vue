<template>
  <CanvasContainer
    :draw
    :width="600"
    :height="275"
    background-color="lightskyblue"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { ImagePainter, Sprite } from "./sprite";
import bombUrl from "../shared/images/bomb.png?url";
function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  const bomb = new Sprite("bomb", new ImagePainter(bombUrl));
  bomb.left = 220;
  bomb.top = 80;
  bomb.width = 180;
  bomb.height = 130;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bomb.paint(ctx);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
</script>

<style scoped></style>
