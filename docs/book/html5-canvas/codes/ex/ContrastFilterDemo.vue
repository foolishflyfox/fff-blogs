<template>
  <div>
    <div>
      <label class="flex-y-center">
        对比度:
        <input type="range" :min="0" :max="300" :step="1" v-model="contrast" />
        <div>&nbsp; contrast({{ contrast }}%)</div>
      </label>
    </div>
    <CanvasContainer :draw :width="200" :height="200" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import firefoxUrl from "../shared/images/firefox-logo.svg?url";

const contrast = ref(200);

function draw(ctx: CanvasRenderingContext2D) {
  const image = new Image();
  image.src = firefoxUrl;
  const { width: cw, height: ch } = ctx.canvas;
  function redraw() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.filter = `contrast(${contrast.value}%)`;
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  }
  image.onload = redraw;
  watch(contrast, redraw);
}
</script>

<style scoped></style>
