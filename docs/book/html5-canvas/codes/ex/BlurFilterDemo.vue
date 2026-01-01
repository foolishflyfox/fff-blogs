<template>
  <div>
    <label class="flex-y-center">
      <div>参数值:</div>
      <input type="range" :min="0" :max="10" :step="1" v-model="blurArg" />
      <div style="margin-left: 5px">blur({{ blurArg }}px)</div>
    </label>
    <CanvasContainer :draw :width="200" :height="200" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import firefoxUrl from "../shared/images/firefox-logo.svg?url";

const blurArg = ref(5);

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  image.src = firefoxUrl;
  function redraw() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.filter = `blur(${blurArg.value}px)`;
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  }
  image.onload = () => {
    redraw();
  };
  watch(blurArg, redraw);
}
</script>

<style scoped></style>
