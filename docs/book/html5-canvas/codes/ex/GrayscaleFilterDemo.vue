<template>
  <div>
    <div>
      <label class="flex-y-center">
        灰度:
        <input type="range" :min="0" :max="100" :step="1" v-model="grayscale" />
        <div>&nbsp; {{ grayscaleArg }}</div>
      </label>
    </div>
    <CanvasContainer :draw :width="200" :height="200" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import firefoxUrl from "../shared/images/firefox-logo.svg?url";

const grayscale = ref(50);
const grayscaleArg = computed(() => `grayscale(${grayscale.value}%)`);

function draw(ctx: CanvasRenderingContext2D) {
  const image = new Image();
  image.src = firefoxUrl;
  const { width: cw, height: ch } = ctx.canvas;
  function redraw() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.filter = grayscaleArg.value;
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  }
  image.onload = redraw;
  watch(grayscale, redraw);
}
</script>

<style scoped></style>
