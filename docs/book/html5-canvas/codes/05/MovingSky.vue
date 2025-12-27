<template>
  <div>
    <div style="margin-bottom: 5px">
      <button class="raw-style" @click="clickBtn">
        {{ running ? "暂停" : "开始" }}
      </button>
    </div>
    <CanvasContainer :draw="(v) => (ctx = v)" :width="cw" :height="ch" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import skyUrl from "../shared/images/sky.png?url";
import CanvasContainer from "../CanvasContainer.vue";

const running = ref(false);
let ctx: CanvasRenderingContext2D | undefined;
const skyVelocity = 30;
const cw = 600;
const ch = 270;
let translate = 0;
let lastDrawTime = 0;
let clickBtn = () => {};

onMounted(() => {
  const image = new Image();
  image.onload = () => {
    ctx?.drawImage(image, 0, 0);
  };
  image.src = skyUrl;

  function redraw() {
    if (!running.value) return;
    const now = Date.now();
    const deltaMs = now - lastDrawTime;
    const deltaPixel = (deltaMs * skyVelocity) / 1000;
    translate += deltaPixel;
    if (translate >= cw) translate %= cw;
    if (ctx) {
      ctx.save();
      ctx.translate(-translate, 0);
      ctx.drawImage(image, 0, 0);
      ctx.drawImage(image, cw - 1, 0);
      ctx.restore();
    }
    lastDrawTime = now;
    requestAnimationFrame(redraw);
  }

  function start() {
    lastDrawTime = Date.now();
    running.value = true;
    redraw();
  }

  function stop() {
    running.value = false;
    lastDrawTime = 0;
  }

  clickBtn = () => {
    if (running.value) {
      stop();
    } else {
      start();
    }
  };
  nextTick(clickBtn);
});
</script>

<style scoped></style>
