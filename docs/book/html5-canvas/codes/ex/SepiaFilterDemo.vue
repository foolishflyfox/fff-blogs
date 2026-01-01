<template>
  <div>
    <div>
      <label class="flex-y-center">
        深褐色比例:
        <input type="range" :min="0" :max="100" :step="1" v-model="sepia" />
        <div>&nbsp; {{ sepiaArg }}</div>
      </label>
    </div>
    <CanvasContainer :draw :width="200" :height="200" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import firefoxUrl from "../shared/images/firefox-logo.svg?url";

const sepia = ref(50);
const sepiaArg = computed(() => `sepia(${sepia.value}%)`);
const image = new Image();
image.src = firefoxUrl;

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  function redraw() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.filter = sepiaArg.value;
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  }
  image.onload = redraw;
  watch(sepia, redraw);
}
</script>

<style scoped></style>
