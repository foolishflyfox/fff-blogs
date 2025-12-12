<template>
  <CanvasContainer :draw :width="600" :height="420" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  let clipR = 0;
  function drawText() {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, cw, ch);
    ctx.fillStyle = "#6d94e4";
    ctx.strokeStyle = "yellow";
    ctx.font = "bold 128pt Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("HTML5", cw / 2, ch / 2);
    ctx.strokeText("HTML5", cw / 2, ch / 2);
    ctx.restore();
  }
  function redraw() {
    if (clipR > 0) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, cw, ch);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cw / 2, ch / 2, clipR, 0, Math.PI * 2);
      ctx.clip();
      drawText();
      ctx.restore();
    } else {
      drawText();
    }
  }
  function animate() {
    if (clipR > 0) {
      redraw();
      clipR -= 3;
      requestAnimationFrame(animate);
    } else {
      clipR = 0;
      redraw();
    }
  }
  redraw();
  ctx.canvas.onmousedown = () => {
    clipR = cw / 2;
    animate();
  };
}
</script>

<style scoped></style>
