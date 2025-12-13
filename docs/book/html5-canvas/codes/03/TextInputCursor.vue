<template>
  <CanvasContainer :draw :width="500" :height="80" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

let timerId = 0;
function draw(ctx: CanvasRenderingContext2D) {
  const content = "你好，世界";
  const x = 20;
  const y = 20;
  const height = 36;
  ctx.font = `${height}px Arial`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "blue";
  ctx.fillText(content, x, y);
  const tm = ctx.measureText(content);
  const textWidth = tm.width;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  let showCursor = true;
  timerId = window.setInterval(() => {
    const xEnd = x + textWidth + 5;
    ctx.clearRect(xEnd - 3, y, 6, height);
    if (showCursor) {
      ctx.beginPath();
      ctx.moveTo(xEnd, y);
      ctx.lineTo(xEnd, y + height);
      ctx.stroke();
    }
    showCursor = !showCursor;
  }, 1000);
}
</script>

<style scoped></style>
