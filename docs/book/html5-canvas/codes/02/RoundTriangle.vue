<template>
  <CanvasContainer :draw :width="500" :height="500" background-color="#0bf8" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#6e95e6";
  ctx.strokeStyle = "#fff";
  const { width: cw, height: ch } = ctx.canvas;
  const cx = cw / 2 + 60;
  const cy = ch / 2;
  const longR = 260;
  const roundR = 60;
  // 计算三个控制点
  const ctrlPts: Pos[] = [];
  for (const rt of [-1 / 3, 1 / 3, 1]) {
    const radian = Math.PI * rt;
    const x = cx + Math.cos(radian) * longR;
    const y = cy + Math.sin(radian) * longR;
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
  // 绘制控制点
  ctx.fillStyle = "#fff";
  for (const pt of ctrlPts) {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#00f";
  for (let i = 1; i < archPts.length; i += 2) {
    ctx.beginPath();
    ctx.arc(archPts[i].x, archPts[i].y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}
</script>

<style scoped></style>
