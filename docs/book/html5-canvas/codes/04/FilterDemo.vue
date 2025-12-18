<template>
  <div>
    <div>
      <span class="mr-1em">模式:</span>
      <label class="mr-1em">
        <input type="radio" value="normal" v-model="mode" />
        正常
      </label>
      <label class="mr-1em">
        <input type="radio" value="negative" v-model="mode" />
        负片滤镜
      </label>
      <label class="mr-1em">
        <input type="radio" value="blackwhite" v-model="mode" />
        黑白滤镜
      </label>
    </div>
    <CanvasContainer :draw :width="600" :height="424" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import curvedRoudUrl from "../shared/images/curved-road.png?url";

const mode = ref("normal");

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, cw, ch);
    function generateNegativeData() {
      const result = ctx.createImageData(cw, ch);
      for (let i = 0; i < imageData.data.length; i += 4) {
        result.data[i] = 255 - imageData.data[i];
        result.data[i + 1] = 255 - imageData.data[i + 1];
        result.data[i + 2] = 255 - imageData.data[i + 2];
        result.data[i + 3] = imageData.data[i + 3];
      }
      return result;
    }
    function generateBlackwhiteData() {
      const result = ctx.createImageData(cw, ch);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const data = imageData.data;
        const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
        const v = Math.floor((r + g + b) / 3);
        result.data[i] = v;
        result.data[i + 1] = v;
        result.data[i + 2] = v;
        result.data[i + 3] = a;
      }
      return result;
    }
    watch(mode, (nv) => {
      let targetData = imageData;
      if (nv === "negative") {
        targetData = generateNegativeData();
      } else if (nv === "blackwhite") {
        targetData = generateBlackwhiteData();
      }
      ctx.putImageData(targetData, 0, 0);
    });
  };
  image.src = curvedRoudUrl;
}
</script>

<style scoped></style>
