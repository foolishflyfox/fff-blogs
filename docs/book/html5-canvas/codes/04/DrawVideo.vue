<template>
  <div>
    <video
      id="drawVideoDemoVideo"
      :src="videoUrl"
      width="320"
      height="240"
      controls
    >
      不支持视频
    </video>
    <div>
      <button @click="capture" class="raw-style">抓取图片</button>
    </div>
    <CanvasContainer :draw :width="300" :height="300" />
  </div>
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import videoUrl from "../shared/images/movie.mp4?url";

let capture = () => {};
function draw(ctx: CanvasRenderingContext2D) {
  capture = () => {
    const videoElement = document.getElementById(
      "drawVideoDemoVideo"
    ) as HTMLVideoElement;
    ctx.drawImage(videoElement, 0, 0);
  };
}
</script>

<style scoped></style>
