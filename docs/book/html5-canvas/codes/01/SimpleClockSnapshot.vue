<template>
  <div>
    <button class="raw-style" @click="toggleSnapshot">
      {{ isSnapshot ? "返回画布" : "截图" }}
    </button>
    <img v-show="isSnapshot" :src="imageSrc" ref="imageRef" />
    <CanvasContainer v-show="!isSnapshot" :draw />
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, useTemplateRef } from "vue";
import CanvasContainer from "../CanvasContainer.vue";

let timerId: number | undefined;
const isSnapshot = ref(false);
const imageRef = useTemplateRef("imageRef");
const imageSrc = ref("");
let toggleSnapshot = () => {};
function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  if (imageRef.value) {
    imageRef.value.style.width = canvas.width + "px";
    imageRef.value.style.height = canvas.height + "px";
  }
  toggleSnapshot = () => {
    if (!isSnapshot.value) {
      imageSrc.value = canvas.toDataURL();
    }
    isSnapshot.value = !isSnapshot.value;
  };
  function drawClock() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    ctx.clearRect(0, 0, canvas.width, canvas.width);
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    ctx.font = "10pt Arial";
    // 设置文本居中
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // 中心点位置
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = canvas.width / 2 - 20;
    // 绘制时钟外面的圆
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    // 绘制中心
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();
    // 绘制外部的时间数字
    for (let i = 1; i < 13; i++) {
      const textR = r + 10;
      const radian = -Math.PI / 2 + i * (Math.PI / 6);
      const textX = cx + textR * Math.cos(radian);
      const textY = cy + textR * Math.sin(radian);
      ctx.fillText(String(i), textX, textY);
    }
    // 绘制时针
    ctx.save();
    ctx.lineWidth = 5; // 时针宽度
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const realHour = (hours * 3600 + minutes * 60 + seconds) / 3600;
    const hourRadian = -Math.PI / 2 + ((realHour % 12) * Math.PI) / 6;
    const hourRadius = r - 20;
    const hourX = cx + hourRadius * Math.cos(hourRadian);
    const hourY = cy + hourRadius * Math.sin(hourRadian);
    ctx.lineTo(hourX, hourY);
    ctx.stroke();
    ctx.restore();
    // 绘制分针
    ctx.save();
    ctx.lineWidth = 3; // 分针宽度
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const realMinute = (minutes * 60 + seconds) / 60;
    const minuteRadian = -Math.PI / 2 + ((realMinute % 60) * Math.PI) / 30;
    const minuteRadius = r - 12;
    const minuteX = cx + minuteRadius * Math.cos(minuteRadian);
    const minuteY = cy + minuteRadius * Math.sin(minuteRadian);
    ctx.lineTo(minuteX, minuteY);
    ctx.stroke();
    ctx.restore();
    // 绘制秒针
    ctx.save();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const secondRadian = -Math.PI / 2 + (seconds * Math.PI) / 30;
    const secondRadius = r - 7;
    const secondX = cx + secondRadius * Math.cos(secondRadian);
    const secondY = cy + secondRadius * Math.sin(secondRadian);
    ctx.lineTo(secondX, secondY);
    ctx.stroke();
    ctx.restore();
  }
  drawClock();
  timerId = window.setInterval(drawClock, 1000);
}

onUnmounted(() => {
  if (timerId) {
    window.clearInterval(timerId);
  }
});
</script>

<style scoped></style>
