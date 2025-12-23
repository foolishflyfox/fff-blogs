<template>
  <div>
    <button class="raw-style" @click="clickStart">开始播放</button>
    <video id="canvasVideoPlayerVideo" style="display: none">
      <source :src="videoUrl" />
    </video>
    <canvas
      style="background-color: #eee8"
      id="canvasVideoPlayerCanvas"
      width="600"
      height="400"
    >
      Canvas not supported
    </canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import videoUrl from "../shared/images/movie.mp4?url";

let clickStart = () => {};

onMounted(() => {
  const canvas = document.getElementById(
    "canvasVideoPlayerCanvas"
  ) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  const video = document.getElementById(
    "canvasVideoPlayerVideo"
  ) as HTMLVideoElement;
  function animate() {
    if (!video.ended) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      window.requestAnimationFrame(animate);
    }
  }

  function start() {
    video.play();
    window.requestAnimationFrame(animate);
  }

  clickStart = start;
});
</script>

<style scoped></style>
