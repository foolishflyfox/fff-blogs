<template>
  <div>
    <div class="justify-x-center">
      <canvas id="graph-bar" width="300px" height="450px" />
    </div>
    <div class="graph-desc">
      <div>用 Canvas 2D 绘制的柱状图</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const dataset = {
    total: [25, 26, 40, 45, 68],
    current: [15, 11, 17, 25, 37],
  };
  // 柱数量
  const barCount = dataset.total.length;
  const canvas = document.querySelector(
    "canvas#graph-bar"
  ) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  // 每列的宽度
  const splitWidth = canvas.width / barCount;
  // 每个柱宽度
  const barWidth = 45;
  for (let i = 0; i < barCount; ++i) {
    const x = i * splitWidth;
    const totalY = Math.round(((100 - dataset.total[i]) * canvas.height) / 100);
    const currentY = Math.round(
      ((100 - dataset.current[i]) * canvas.height) / 100
    );
    const totalHeight = canvas.height - totalY;
    const currentHeight = canvas.height - currentY;
    ctx.fillStyle = "#37c";
    ctx.fillRect(x, totalY, barWidth, totalHeight);
    console.log(x, totalY, barWidth, totalHeight);
    ctx.fillStyle = "#3c7";
    ctx.fillRect(x, currentY, barWidth, currentHeight);
  }
});
</script>

<style scoped></style>
