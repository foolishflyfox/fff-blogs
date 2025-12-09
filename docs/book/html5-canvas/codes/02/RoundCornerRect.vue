<template>
  <CanvasContainer
    :draw
    :width="510"
    :height="170"
    background-color="lightskyblue"
    class="canvas-container"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "red";
  function drawRoundCornerRect(
    x: number,
    y: number,
    size: number,
    fillColor: string,
    cornerR: number
  ) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x + size - cornerR, y);
    ctx.arcTo(x + size, y, x + size, y + cornerR, cornerR);
    ctx.lineTo(x + size, y + size - cornerR);
    ctx.arcTo(x + size, y + size, x + size - cornerR, y + size, cornerR);
    ctx.lineTo(x + cornerR, y + size);
    ctx.arcTo(x, y + size, x, y + size - cornerR, cornerR);
    ctx.lineTo(x, y + cornerR);
    ctx.arcTo(x, y, x + cornerR, y, cornerR);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  drawRoundCornerRect(30, 30, 100, "yellow", 10);
  drawRoundCornerRect(150, 30, 100, "green", 20);
  drawRoundCornerRect(270, 30, 100, "white", 30);
  drawRoundCornerRect(390, 30, 100, "blue", 40);
}
</script>

<style scoped>
.canvas-container {
  border-radius: 5px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
}
</style>
