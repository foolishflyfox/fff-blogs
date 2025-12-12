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

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  function drawBackground() {
    const stepY = 12;
    const topMargin = stepY * 4;
    const leftMargin = stepY * 3;
    // 绘制横向线条
    ctx.save();
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 0.5;
    for (let i = ch; i > topMargin; i -= stepY) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(cw, i);
      ctx.stroke();
    }
    // 绘制纵向线条
    ctx.strokeStyle = "rgba(100, 0, 0, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(leftMargin, 0);
    ctx.lineTo(leftMargin, ch);
    ctx.stroke();
    ctx.restore();
  }
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
  drawBackground();
  drawColorGradientText();
  drawImageText();
}
</script>

<style scoped></style>
