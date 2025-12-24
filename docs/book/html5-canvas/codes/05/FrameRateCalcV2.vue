<template>
  <div>
    <div>
      <button
        class="raw-style"
        style="margin-bottom: 10px"
        @click="isRunning = !isRunning"
      >
        {{ isRunning ? "暂停" : "开始" }}
      </button>
    </div>
    <CanvasContainer :draw :width="600" :height="400" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import { drawTextBackground } from "../03/utils";

const isRunning = ref(false);

interface BallData {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  innerColor: string;
  middleColor: string;
  outerColor: string;
  strokeStyle: string;
}
const discs: BallData[] = [
  {
    x: 150,
    y: 250,
    velocityX: -3.2,
    velocityY: 3.5,
    radius: 25,
    innerColor: "rgba(255,255,0,1)",
    middleColor: "rgba(255,255,0,0.7)",
    outerColor: "rgba(255,255,0,0.5)",
    strokeStyle: "gray",
  },
  {
    x: 50,
    y: 150,
    velocityX: 2.2,
    velocityY: 2.5,
    radius: 25,
    innerColor: "rgba(100,145,230,1)",
    middleColor: "rgba(100,145,230,0.7)",
    outerColor: "rgba(100,145,230,0.5)",
    strokeStyle: "blue",
  },
  {
    x: 150,
    y: 75,
    velocityX: 1.2,
    velocityY: 1.5,
    radius: 25,
    innerColor: "rgba(255,0,0,1)",
    middleColor: "rgba(255,0,0,0.7)",
    outerColor: "rgba(255,0,0,0.5)",
    strokeStyle: "orange",
  },
];

let ctx: CanvasRenderingContext2D;
function draw(inCtx: CanvasRenderingContext2D) {
  ctx = inCtx;
}

let lastTime = 0;
let lastUpdateFps = 0;
let frameRate = 0;
function update() {
  if (!isRunning.value) {
    lastTime = 0;
    frameRate = 0;
    return;
  }
  const now = Date.now();
  if (lastTime && now - lastUpdateFps >= 1000) {
    frameRate = Math.round(1000 / (now - lastTime));
    lastUpdateFps = now;
  }
  lastTime = now;
  const { width: cw, height: ch } = ctx.canvas;
  ctx.clearRect(0, 0, cw, ch);
  drawTextBackground(ctx);
  for (const disc of discs) {
    let nextX = disc.x + disc.velocityX;
    let nextY = disc.y + disc.velocityY;
    if (nextX - disc.radius <= 0) {
      nextX = disc.radius;
      disc.velocityX *= -1;
    } else if (nextX + disc.radius >= cw) {
      nextX = cw - disc.radius;
      disc.velocityX *= -1;
    }
    disc.x = nextX;
    if (nextY - disc.radius <= 0) {
      nextY = disc.radius;
      disc.velocityY *= -1;
    } else if (nextY + disc.radius >= ch) {
      nextY = ch - disc.radius;
      disc.velocityY *= -1;
    }
    disc.y = nextY;
    const gradient = ctx.createRadialGradient(
      disc.x,
      disc.y,
      0,
      disc.x,
      disc.y,
      disc.radius
    );
    gradient.addColorStop(0, disc.innerColor);
    gradient.addColorStop(0.5, disc.middleColor);
    gradient.addColorStop(1, disc.outerColor);
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.strokeStyle = disc.strokeStyle;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(disc.x, disc.y, disc.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#6e95e6";
    ctx.font = "bold 32pt Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(frameRate + " fpx", 20, 20);
    ctx.restore();
  }
  requestAnimationFrame(update);
}

watch(isRunning, (v) => {
  if (v) {
    requestAnimationFrame(update);
  }
});
</script>

<style scoped></style>
