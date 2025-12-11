<template>
  <CanvasContainer
    :draw
    :width="600"
    :height="420"
    background-color="#00ffff"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  ctx.fillStyle = "#6492e8";
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 2;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.font = "bold 92pt Arial";
  const content = "Spinning";
  ctx.translate(canvas.width / 2, canvas.height / 2);
  let stop = true;
  let ccwRotate = true;
  const deltaRadian = Math.PI / 180;
  function drawContent() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.beginPath();
    ctx.fillText(content, 0, 0);
    ctx.strokeText(content, 0, 0);
  }
  function redraw() {
    if (!stop) {
      if (ccwRotate) {
        ctx.rotate(deltaRadian * -1);
        ctx.scale(0.99, 0.99);
      } else {
        ctx.rotate(deltaRadian);
        ctx.scale(1.01, 1.01);
      }
      drawContent();
    }
    if (!document.hidden) {
      requestAnimationFrame(redraw);
    }
  }
  drawContent();

  canvas.onmouseup = () => {
    if (stop) {
      stop = false;
    } else {
      stop = true;
      ccwRotate = !ccwRotate;
    }
  };
  requestAnimationFrame(redraw);
}
</script>

<style scoped></style>
