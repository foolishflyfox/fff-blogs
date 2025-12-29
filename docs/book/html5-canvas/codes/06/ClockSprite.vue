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
import { Painter, Sprite } from "./sprite";

function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  const ballPainter: Painter = {
    paint(sprite, ctx) {
      const x = sprite.left + sprite.width / 2;
      const y = sprite.top + sprite.height / 2;
      const radius = sprite.width / 2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.clip();
      // 继续绘制精灵图
      ctx.shadowColor = "rgb(0,0,0)";
      ctx.shadowOffsetX = -4;
      ctx.shadowOffsetY = -4;
      ctx.shadowBlur = 8;

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(100,100,195)";

      ctx.fillStyle = "rgba(30,144,255,0.15)";
      ctx.fill();
      ctx.restore();
    },
  };
  const ball = new Sprite("ball", ballPainter);
  function drawHand(loc: number, isHour: boolean) {
    // 将 ball 移动到合适的位置
    const angle = (Math.PI * 2 * loc) / 60 - Math.PI / 2;

    ball.paint(ctx);
  }
  function drawHands() {
    const date = new Date();
    // 秒
    ball.width = 20;
    ball.height = 20;
    drawHand(date.getSeconds(), false);
    // 分
    ball.width = 35;
    ball.height = 25;
    drawHand(date.getMinutes(), false);
    // 时
    const hour = date.getHours() % 12;
    ball.width = 50;
    ball.height = 50;
    drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true);
    // 中心点
    ball.width = 10;
    ball.height = 10;
    ball.left = canvas.width / 2 - ball.width / 2;
    ball.top = canvas.height / 2 - ball.height / 2;
    ballPainter.paint(ball, ctx);
  }
}
</script>

<style scoped>
.clock-sprite-canvas {
  box-shadow: 5px 5px 15px #0008;
}
</style>
