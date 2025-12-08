<template>
  <div style="position: relative">
    <div class="glasspane">
      <div style="color: yellow; font-size: 23px">Bouncing Balls</div>
      <p style="color: blue; font-size: 16px">One hundred balls bouncing</p>
      <a id="startButton" @click="toggleStartButton">{{
        isStarted ? "Stop" : "Start"
      }}</a>
    </div>
    <CanvasContainer
      :draw
      :width="canvasWidth"
      :height="canvasHeight"
      background-color="#fff"
      style="border: 1px solid #ccc"
    />
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { drawGrid as drawGridUtil } from "../shared/utils";
import CanvasContainer from "../CanvasContainer.vue";

const canvasWidth = 750;
const canvasHeight = 500;
let timerId: number | undefined;
let isStarted = ref(false);
let toggleStartButton: () => void = () => {};
class Ball {
  color: string; // 颜色
  x: number; // x 位置
  y: number; // y 位置
  vx: number; // x方向速度
  vy: number; // y方向速度
  r: number; // 半径
  constructor() {
    const rand = () => Math.floor(Math.random() * 255);
    this.color = `rgb(${rand()}, ${rand()}, ${rand()})`;
    this.x = this.y = 150;
    const vrate = 5;
    this.vx = Math.random() * vrate;
    this.vy = Math.random() * vrate;
    this.r = Math.random() * 50;
  }
  // 球运动一次
  move() {
    let nextX = this.x + this.vx;
    let nextY = this.y + this.vy;
    if (nextX + this.r >= canvasWidth) {
      nextX = canvasWidth - this.r;
      this.vx *= -1;
    } else if (nextX - this.r <= 0) {
      nextX = this.r;
      this.vx *= -1;
    }
    if (nextY + this.r >= canvasHeight) {
      nextY = canvasHeight - this.r;
      this.vy *= -1;
    } else if (nextY - this.r <= 0) {
      nextY = this.r;
      this.vy *= -1;
    }
    this.x = nextX;
    this.y = nextY;
  }
}
function draw(ctx: CanvasRenderingContext2D) {
  // 初始化球信息
  const balls = Array.from({ length: 100 }).map(() => new Ball());
  // 绘制网格线
  function drawGrid() {
    drawGridUtil(ctx, "#ccc", 10);
  }
  function redraw() {
    // 暂停状态
    if (!isStarted.value) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // 先绘制网格线
    drawGrid();
    // 再绘制球
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      ball.move();
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  toggleStartButton = () => {
    if (!timerId) {
      timerId = window.setInterval(redraw, 32);
      isStarted.value = true;
    } else {
      isStarted.value = !isStarted.value;
    }
  };
  drawGrid();
}

onUnmounted(() => {
  if (timerId) {
    window.clearInterval(timerId);
  }
});
</script>

<style scoped>
.glasspane {
  position: absolute;
  left: 30px;
  top: 30px;
  background-color: #0005;
  padding: 20px 20px;
  border: 2px solid #888;
  box-shadow: 5px 5px 15px #0008;
  cursor: pointer;
}
#startButton {
  text-decoration: none;
  font-size: 42px;
  font-weight: bold;
  color: #ccc;
}
#startButton:hover {
  color: yellow;
}
</style>
