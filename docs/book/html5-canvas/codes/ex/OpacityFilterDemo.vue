<template>
  <div>
    <div>
      <label class="flex-y-center">
        不透明度比例:
        <input type="range" :min="0" :max="100" :step="1" v-model="opacity" />
        <div>&nbsp; {{ opacityArg }}</div>
      </label>
    </div>
    <CanvasContainer :draw :width="200" :height="200" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import firefoxUrl from "../shared/images/firefox-logo.svg?url";

const opacity = ref(70);
const opacityArg = computed(() => `opacity(${opacity.value}%)`);
const image = new Image();
image.src = firefoxUrl;

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  function redraw() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.filter = opacityArg.value;
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  }
  image.onload = redraw;
  watch(opacity, redraw);
}
</script>

<style scoped></style>
