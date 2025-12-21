<template>
  <div>
    <button class="raw-style" @click="clickButton">图片淡入</button>
    <CanvasContainer :draw :width="600" :height="422" />
  </div>
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import logCrossingUrl from "../shared/images/log-crossing.png?url";

let clickButton = () => {};

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  let originImageData: ImageData;
  // 淡入动画的帧数
  let animateFrameCount = 250;
  let count = animateFrameCount + 1;
  function redraw() {
    if (count > animateFrameCount) {
      requestAnimationFrame(redraw);
    } else {
      const newImageData = ctx.createImageData(cw, ch);
      for (let i = 0; i < originImageData.data.length; i++) {
        if ((i + 1) % 4 === 0) {
          // 计算透明度
          const oldAlpha = originImageData.data[i];
          const newAlpha = Math.floor((oldAlpha * count) / animateFrameCount);
          newImageData.data[i] = newAlpha;
        } else {
          newImageData.data[i] = originImageData.data[i];
        }
      }
      ctx.putImageData(newImageData, 0, 0);

      count++;
      requestAnimationFrame(redraw);
    }
  }

  // 点击图片淡出按钮执行的回调
  function startFadeIn() {
    count = 0;
  }

  image.onload = (e) => {
    const offlineCanvas = document.createElement("canvas") as HTMLCanvasElement;
    offlineCanvas.width = cw;
    offlineCanvas.height = ch;
    const offlineCtx = offlineCanvas.getContext("2d")!;
    offlineCtx.drawImage(image, 0, 0);
    originImageData = offlineCtx.getImageData(0, 0, cw, ch);
    redraw();
  };
  image.src = logCrossingUrl;

  clickButton = startFadeIn;
}
</script>

<style scoped></style>
