<template>
  <div>
    <div>
      <label class="flex-y-center">
        亮度:
        <input
          type="range"
          :min="0"
          :max="300"
          :step="1"
          v-model="brightness"
        />
        <div>&nbsp; brightness({{ brightness }}%)</div>
      </label>
    </div>
    <CanvasContainer :draw :width="200" :height="200" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import firefoxUrl from "../shared/images/firefox-logo.svg?url";

const brightness = ref(100);
const image = new Image();
image.src = firefoxUrl;

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  function redraw() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.filter = `brightness(${brightness.value}%)`;
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  }
  image.onload = redraw;
  watch(brightness, redraw);
}
</script>

<style scoped></style>
