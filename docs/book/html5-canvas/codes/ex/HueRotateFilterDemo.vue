<template>
  <div>
    <div>
      <label class="flex-y-center">
        色相旋转角度:
        <input type="range" :min="0" :max="360" :step="1" v-model="hueRotate" />
        <div>&nbsp; {{ hueRotateArg }}</div>
      </label>
    </div>
    <CanvasContainer :draw :width="200" :height="200" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import firefoxUrl from "../shared/images/firefox-logo.svg?url";

const hueRotate = ref(180);
const hueRotateArg = computed(() => `hue-rotate(${hueRotate.value}deg)`);
const image = new Image();
image.src = firefoxUrl;

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  function redraw() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.filter = hueRotateArg.value;
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  }
  image.onload = redraw;
  watch(hueRotate, redraw);
}
</script>

<style scoped></style>
