<template>
  <div>
    <div>
      <button class="raw-style" @click="isNormal = !isNormal">
        {{ isNormal ? "显示浮雕滤镜" : "恢复正常显示" }}
      </button>
    </div>
    <CanvasContainer :draw :width="600" :height="424" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import curvedRoudUrl from "../shared/images/curved-road.png?url";

const isNormal = ref(true);

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, cw, ch);
    function generateEmbossData() {
      const result = ctx.createImageData(cw, ch);
      // 忽略最下方的像素点
      for (let i = 0; i < imageData.data.length - image.width * 4; i += 4) {
        if ((i / 4) % image.width === image.width - 1) {
          for (let j = 0; j < 4; j++) {
            result.data[i + j] = imageData.data[i + j - 4];
          }
          continue;
        }
        for (let j = 0; j < 3; j++) {
          result.data[i + j] =
            128 +
            2 * imageData.data[i + j] -
            imageData.data[i + j + 4] -
            imageData.data[i + j + image.width * 4];
        }
        result.data[i + 3] = imageData.data[i + 3];
      }
      return result;
    }
    const embossImageData = generateEmbossData();

    watch(isNormal, (nv) => {
      let targetData = nv ? imageData : embossImageData;

      ctx.putImageData(targetData, 0, 0);
    });
  };
  image.src = curvedRoudUrl;
}
</script>

<style scoped></style>
