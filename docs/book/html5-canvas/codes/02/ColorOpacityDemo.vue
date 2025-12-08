<template>
  <CanvasContainer :draw :width="600" :height="400" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(context: CanvasRenderingContext2D) {
  context.lineJoin = "round";
  context.lineWidth = 30;
  context.font = "24px Helvetica";
  context.fillText("点击任意区域擦除", 175, 200);
  // 指定描边颜色
  context.strokeStyle = "goldenrod";
  // 指定填充颜色，包括透明度
  context.fillStyle = "rgba(0, 0, 255, 0.5)";
  context.strokeRect(75, 100, 200, 200);
  context.fillRect(325, 100, 200, 200);
  context.canvas.onmousedown = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };
}
</script>

<style scoped></style>
