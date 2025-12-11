<template>
  <CanvasContainer :draw :width="500" :height="300" background-color="#0bf8" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  function drawArrow() {
    ctx.fillStyle = "#6e95e6";
    ctx.strokeStyle = "#fff";
    const { width: cw, height: ch } = ctx.canvas;
    const cx = cw / 2;
    const cy = ch / 2;
    const longR = 130;
    const roundR = 30;
    // 计算三个控制点
    const ctrlPts: Pos[] = [];
    for (const rt of [-1 / 3, 1 / 3, 1]) {
      const radian = Math.PI * rt;
      const x = 150 + Math.cos(radian) * longR;
      const y = 150 + Math.sin(radian) * longR;
      ctrlPts.push({ x, y });
    }
    // 计算锚点
    const archPts: Pos[] = [];
    archPts.push({
      x: ctrlPts[0].x + Math.cos((Math.PI * 5) / 6) * roundR,
      y: ctrlPts[0].y + Math.sin((Math.PI * 5) / 6) * roundR,
    });
    archPts.push({
      x: ctrlPts[0].x,
      y: ctrlPts[0].y + roundR,
    });
    archPts.push({
      x: ctrlPts[1].x,
      y: ctrlPts[1].y - roundR,
    });
    archPts.push({
      x: ctrlPts[1].x + Math.cos((Math.PI * 7) / 6) * roundR,
      y: ctrlPts[1].y + Math.sin((Math.PI * 7) / 6) * roundR,
    });
    archPts.push({
      x: ctrlPts[2].x + Math.cos(Math.PI / 6) * roundR,
      y: ctrlPts[2].y + Math.sin(Math.PI / 6) * roundR,
    });
    archPts.push({
      x: ctrlPts[2].x + Math.cos(-Math.PI / 6) * roundR,
      y: ctrlPts[2].y + Math.sin(-Math.PI / 6) * roundR,
    });
    // 绘制三角
    ctx.beginPath();
    ctx.moveTo(archPts[5].x, archPts[5].y);
    for (let i = 0; i < 3; i++) {
      ctx.lineTo(archPts[i * 2].x, archPts[i * 2].y);
      ctx.quadraticCurveTo(
        ctrlPts[i].x,
        ctrlPts[i].y,
        archPts[i * 2 + 1].x,
        archPts[i * 2 + 1].y
      );
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  drawArrow();
  ctx.translate(ctx.canvas.width, 0);
  ctx.scale(-1, 1);
  drawArrow();
}
</script>

<style scoped></style>
