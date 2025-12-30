<template>
  <CanvasContainer
    class="clock-sprite-canvas"
    :width="500"
    :height="500"
    :draw
    background-color="#fff"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";
import { Painter, Sprite } from "./sprite";

function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  const { width: cw, height: ch } = canvas;
  const ballPainter: Painter = {
    paint(sprite, ctx) {
      const x = sprite.left + sprite.width / 2;
      const y = sprite.top + sprite.height / 2;
      const radius = sprite.width / 2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.clearRect(0, 0, cw, ch);
      // 继续绘制精灵图
      ctx.shadowColor = "rgb(0,0,0)";
      ctx.shadowOffsetX = -4;
      ctx.shadowOffsetY = -4;
      ctx.shadowBlur = 8;

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(100,100,195)";

      ctx.fillStyle = "rgba(218, 165, 32, 0.1)";
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    },
  };
  const ball = new Sprite("ball", ballPainter);
  const clockR = canvas.width / 2 - 40;
  function drawClockFace() {
    ctx.save();
    ctx.strokeStyle = "#8888";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cw / 2, ch / 2, clockR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  function drawHand(loc: number) {
    // 将 ball 移动到合适的位置
    const angle = (Math.PI * 2 * loc) / 60 - Math.PI / 2;

    const centerX = canvas.width / 2 + Math.cos(angle) * clockR;
    const centerY = canvas.height / 2 + Math.sin(angle) * clockR;
    ball.left = centerX - ball.width / 2;
    ball.top = centerY - ball.height / 2;
    ctx.save();
    ctx.strokeStyle = "#8888";
    ctx.beginPath();
    ctx.moveTo(cw / 2, ch / 2);
    ctx.lineTo(centerX, centerY);
    ctx.stroke();
    ctx.restore();
    ball.paint(ctx);
  }
  function drawHands() {
    const date = new Date();

    // 时
    const hour = date.getHours() % 12;
    ball.width = 50;
    ball.height = 50;
    drawHand(hour * 5 + (date.getMinutes() / 60) * 5);
    // 分
    ball.width = 35;
    ball.height = 25;
    drawHand(date.getMinutes());
    // 秒
    ball.width = 20;
    ball.height = 20;
    drawHand(date.getSeconds());
    // 中心点
    ball.width = 10;
    ball.height = 10;
    ball.left = canvas.width / 2 - ball.width / 2;
    ball.top = canvas.height / 2 - ball.height / 2;
    ballPainter.paint(ball, ctx);
  }
  function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, "lightgray", 10);
    drawClockFace();
    drawHands();
    requestAnimationFrame(redraw);
  }
  redraw();
}
</script>

<style scoped>
.clock-sprite-canvas {
  box-shadow: 5px 5px 15px #0008;
}
</style>
