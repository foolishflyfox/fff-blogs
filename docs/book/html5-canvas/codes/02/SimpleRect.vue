<template>
  <CanvasContainer :draw :width="600" :height="400" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(context: CanvasRenderingContext2D) {
  // 设置线段拐点(矩形拐角)样式为圆角
  context.lineJoin = "round";
  context.lineWidth = 30;
  // 设置主题
  context.font = "24px Helvetica";
  // 绘制文本
  context.fillText("点击任意区域擦除", 175, 40);
  // 绘制矩形
  context.strokeRect(75, 100, 200, 200);
  context.fillRect(325, 100, 200, 200);
  // 绑定鼠标点击事件
  context.canvas.onmousedown = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };
}
</script>

<style scoped></style>
