<template>
  <CanvasContainer
    class="ball-sprite-canvas"
    :width="650"
    :height="375"
    :draw
    background-color="#fff"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";
import { Sprite } from "./sprite";

function draw(ctx: CanvasRenderingContext2D) {
  const radius = 75;
  const ball = new Sprite("ball", {
    paint(sprite, ctx) {
      ctx.beginPath();
      ctx.arc(
        sprite.left + sprite.width / 2,
        sprite.top + sprite.height / 2,
        radius,
        0,
        Math.PI * 2
      );
      ctx.clip();
      ctx.shadowColor = "rgb(0,0,0)";
      ctx.shadowOffsetX = -4;
      ctx.shadowOffsetY = -4;
      ctx.shadowBlur = 8;

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(100,100,195)";

      ctx.fillStyle = "rgba(30,144,255,0.15)";
      ctx.fill();
      ctx.stroke();
    },
  });
  drawGrid(ctx, "lightgray", 10);
  ball.left = 320;
  ball.top = 160;
  ball.paint(ctx);
}
</script>

<style scoped>
.ball-sprite-canvas {
  box-shadow: 5px 5px 15px #0008;
}
</style>
