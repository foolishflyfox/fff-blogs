<template>
  <div>
    <div style="margin-bottom: 5px">
      <button class="raw-style" @click="start">
        开始测试双缓冲，观察是否有灰色背景出现
      </button>
    </div>
    <CanvasContainer :draw :width="cw" :height="ch" />
  </div>
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

const cw = 600;
const ch = 400;

let ctx: CanvasRenderingContext2D;
function draw(context: CanvasRenderingContext2D) {
  ctx = context;
  ctx.fillStyle = "orange";
  ctx.fillRect(0, 0, cw, ch);
}

function start() {
  ctx.clearRect(0, 0, cw, ch);
  let sum = 0;
  const t0 = Date.now();
  for (let i = 0; i < 50000000; ++i) {
    sum += i;
  }
  const t1 = Date.now();
  ctx.fillStyle = "#0bf";
  ctx.fillRect(0, 0, cw, ch);
  console.log("间隔时间: " + (t1 - t0) + " ms");
}
</script>

<style scoped></style>
