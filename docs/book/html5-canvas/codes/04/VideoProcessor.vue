<template>
  <div>
    <video id="videoProcessorVideo" style="display: none">
      <source :src="videoUrl" />
    </video>
    <div class="flex-y-center">
      <button class="raw-style mr-1em" @click="isPause = !isPause">
        {{ isPause ? "播放" : "暂停" }}
      </button>
      <label class="mr-1em">
        <input type="checkbox" v-model="isColor" />
        彩色
      </label>
      <label class="mr-1em">
        <input type="checkbox" v-model="isFlip" />
        翻转
      </label>
    </div>
    <CanvasContainer :draw :width="600" :height="400" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import videoUrl from "../shared/images/movie.mp4?url";

const isPause = ref(true);
const isColor = ref(true);
const isFlip = ref(false);

function draw(ctx: CanvasRenderingContext2D) {
  const video = document.getElementById(
    "videoProcessorVideo"
  ) as HTMLVideoElement;
  const { width: cw, height: ch } = ctx.canvas;
  const offlineCanvas = document.createElement("canvas") as HTMLCanvasElement;
  offlineCanvas.width = cw;
  offlineCanvas.height = ch;
  const offlineCtx = offlineCanvas.getContext("2d")!;
  function redraw() {
    if (isPause.value) return;
    if (video.ended) {
      isPause.value = true;
      return;
    }
    if (isFlip.value) {
      offlineCtx.save();
      offlineCtx.translate(cw / 2, ch / 2);
      offlineCtx.rotate(Math.PI);
      offlineCtx.translate(-cw / 2, -ch / 2);
      offlineCtx.drawImage(video, 0, 0, cw, ch);
      offlineCtx.restore();
    } else {
      offlineCtx.drawImage(video, 0, 0, cw, ch);
    }
    if (!isColor.value) {
      const imageData = offlineCtx.getImageData(0, 0, cw, ch);
      const data = imageData.data;
      const length = data.length;
      for (let i = 0; i < length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }
      offlineCtx.putImageData(imageData, 0, 0);
    }
    ctx.drawImage(offlineCanvas, 0, 0);
    // ctx.drawImage(video, 0, 0);
    requestAnimationFrame(redraw);
  }
  watch(isPause, (v) => {
    if (v) {
      // 点击暂停
      video.pause();
    } else {
      // 点击开始
      video.play();
      redraw();
    }
  });
}
</script>

<style scoped></style>
