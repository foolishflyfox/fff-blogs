<template>
  <div>
    <div style="margin-bottom: 5px">
      <lable class="mr-1em">
        秒数(0~60):
        <input
          type="number"
          class="raw-style"
          :disabled="running"
          v-model="curValue"
          @change="resetValue"
        />
      </lable>
      <button class="raw-style" @click="running = !running">
        {{ running ? "停止" : "开始" }}
      </button>
    </div>
    <CanvasContainer
      class="canvas-container"
      background-color="white"
      :draw
      :width="500"
      :height="430"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";
import { drawDial } from "./draw-timer";

const running = ref(false);
let initValue = 10;
const curValue = ref(initValue);
let lastTime = 0;

let ctx: CanvasRenderingContext2D;

function resetValue() {
  initValue = curValue.value;
  drawTimer(initValue);
}

function draw(v: CanvasRenderingContext2D) {
  ctx = v;
  drawTimer(initValue);
}

function drawTimer(v: number) {
  const { width: cw, height: ch } = ctx.canvas;
  const centerX = cw / 2;
  const centerY = ch / 2;
  const radian = (-v - 15) * (Math.PI / 30);
  ctx.clearRect(0, 0, cw, ch);
  drawGrid(ctx, "lightgray", 10);
  drawDial(ctx, { x: centerX, y: centerY, r: 200, radian });
}

function updateTimer() {
  if (!running.value) return;
  if (curValue.value === 0) {
    running.value = false;
    return;
  }
  const now = Date.now();
  const newMs = curValue.value * 1000 - (now - lastTime);
  if (newMs <= 0) {
    curValue.value = 0;
  } else {
    curValue.value = Math.round(newMs / 10) / 100;
  }
  drawTimer(curValue.value);
  lastTime = now;
  requestAnimationFrame(updateTimer);
}

watch(running, (v) => {
  if (v) {
    if (curValue.value === 0) {
      curValue.value = initValue;
    }
    lastTime = Date.now();
    updateTimer();
  } else {
    lastTime = 0;
  }
});
</script>

<style scoped>
.canvas-container {
  border-radius: 5px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
}
</style>
