<template>
  <div>
    <div>
      <label>
        <input type="checkbox" v-model="scaleImage" />
        缩放图片适配画布
      </label>
    </div>
    <CanvasContainer :draw :width="650" :height="458" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import waterfalllUrl from "../shared/images/waterfall.png?url";

const scaleImage = ref(false);

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
  };
  image.src = waterfalllUrl;
  watchEffect(() => {
    if (scaleImage.value) {
      ctx.drawImage(image, 0, 0, cw, ch);
    } else {
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(image, 0, 0);
    }
  });
}
</script>

<style scoped></style>
