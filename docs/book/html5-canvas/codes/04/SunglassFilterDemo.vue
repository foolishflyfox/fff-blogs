<template>
  <div>
    <div>
      <button class="raw-style" @click="isNormal = !isNormal">
        {{ isNormal ? "显示墨镜滤镜" : "恢复正常显示" }}
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
  const worker = new Worker(new URL("./sunglass-filter.ts", import.meta.url), {
    type: "module",
  });
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, cw, ch);

    worker.onmessage = (e: MessageEvent<ImageData>) => {
      ctx.putImageData(e.data, 0, 0);
    };

    watch(isNormal, (nv) => {
      if (nv) {
        ctx.putImageData(imageData, 0, 0);
      } else {
        worker.postMessage(ctx.getImageData(0, 0, cw, ch));
      }
    });
  };
  image.src = curvedRoudUrl;
}
</script>

<style scoped></style>
