<template>
  <div style="display: flex">
    <CanvasContainer :draw="draw1" :width="200" :height="200" />
    &nbsp; &nbsp;
    <CanvasContainer :draw="draw2" :width="200" :height="200" />
  </div>
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw1(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "orange";
  ctx.translate(20, 30);
  ctx.rotate(Math.PI / 6);
  ctx.translate(50, 0);
  ctx.scale(0.8, 1.6);
  ctx.rotate(-Math.PI / 4);

  ctx.beginPath();
  const poses = [
    { x: 0, y: 0 },
    { x: 50, y: 0 },
    { x: 50, y: 50 },
    { x: 0, y: 50 },
  ];
  for (let i = 0; i < poses.length; i++) {
    const { x, y } = poses[i];
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
}

function draw2(ctx: CanvasRenderingContext2D) {
  const canvas = document.createElement("canvas");
  const offlineCtx = canvas.getContext("2d")!;
  ctx.fillStyle = "orange";
  offlineCtx.translate(20, 30);
  offlineCtx.rotate(Math.PI / 6);
  offlineCtx.translate(50, 0);
  offlineCtx.scale(0.8, 1.6);
  offlineCtx.rotate(-Math.PI / 4);
  const t = offlineCtx.getTransform();
  const { a, b, c, d, e, f } = t;
  ctx.beginPath();
  const poses = [
    { x: 0, y: 0 },
    { x: 50, y: 0 },
    { x: 50, y: 50 },
    { x: 0, y: 50 },
  ];
  for (let i = 0; i < poses.length; i++) {
    const pos = poses[i];
    const x = a * pos.x + c * pos.y + e;
    const y = b * pos.x + d * pos.y + f;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
}
</script>

<style scoped></style>
