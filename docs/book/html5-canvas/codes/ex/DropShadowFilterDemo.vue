<template>
  <div>
    <div>
      <div>阴影配置</div>
      <div>
        <label class="flex-y-center">
          x 偏移:
          <input
            type="range"
            :min="-20"
            :max="20"
            :step="1"
            v-model="offsetX"
          />
        </label>
        <label class="flex-y-center">
          y 偏移:
          <input
            type="range"
            :min="-20"
            :max="20"
            :step="1"
            v-model="offsetY"
          />
        </label>
        <label class="flex-y-center">
          模糊半径:
          <input
            type="range"
            :min="0"
            :max="20"
            :step="1"
            v-model="blurRadius"
          />
        </label>
        <label class="flex-y-center">
          颜色:
          <input type="color" v-model="color" />
        </label>
        <div>阴影参数：{{ shadow }}</div>
      </div>
    </div>
    <CanvasContainer :draw :width="200" :height="200" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import firefoxUrl from "../shared/images/firefox-logo.svg?url";

const offsetX = ref(10);
const offsetY = ref(10);
const blurRadius = ref(5);
const color = ref("#00bfff");
const image = new Image();
const shadow = computed(
  () =>
    `drop-shadow(${offsetX.value}px ${offsetY.value}px ${blurRadius.value}px ${color.value})`
);
image.src = firefoxUrl;

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  function redraw() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.filter = shadow.value;
    ctx.drawImage(image, 50, 50, 100, 100);
    ctx.restore();
  }
  image.onload = redraw;
  watch(shadow, redraw);
}
</script>

<style scoped></style>
