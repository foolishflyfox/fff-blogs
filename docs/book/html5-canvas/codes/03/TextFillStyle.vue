<template>
  <CanvasContainer
    :draw
    :width="600"
    :height="300"
    background-color="#fafafa"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import redballUrl from "../shared/images/redball.png?url";
import { drawTextBackground } from "./utils";

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;

  function drawColorGradientText() {
    const lc = ctx.createLinearGradient(cw / 4, ch / 4, cw * 0.75, ch * 0.75);
    lc.addColorStop(0, "blue");
    lc.addColorStop(0.4, "white");
    lc.addColorStop(1, "red");
    ctx.fillStyle = lc;
    ctx.fillText("Canvas", 300, 75);
    ctx.strokeText("Canvas", 300, 75);
  }
  function drawImageText() {
    const image = new Image();
    image.onload = () => {
      const pattern = ctx.createPattern(image, "repeat")!;
      ctx.fillStyle = pattern;
      ctx.fillText("Canvas", 300, 225);
      ctx.strokeText("Canvas", 300, 225);
    };
    image.src = redballUrl;
  }
  ctx.font = "bold 96pt Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "blue";
  drawTextBackground(ctx);
  drawColorGradientText();
  drawImageText();
}
</script>

<style scoped></style>
