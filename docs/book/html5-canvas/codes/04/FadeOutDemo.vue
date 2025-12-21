<template>
  <div>
    <button class="raw-style" @click="clickButton">图片淡出</button>
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
  function drawImage() {
    ctx.drawImage(image, 0, 0);
  }
  let initCount = -120;
  // 淡出动画的帧数
  let animateFrameCount = 25;
  let count = initCount;
  function redraw() {
    if (count < initCount) {
      requestAnimationFrame(redraw);
    } else {
      if (count === initCount) {
        ctx.putImageData(originImageData, 0, 0);
      } else if (count >= 0) {
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
      }
      count--;
      requestAnimationFrame(redraw);
    }
  }

  // 点击图片淡出按钮执行的回调
  function startFadeout() {
    count = animateFrameCount;
  }

  image.onload = (e) => {
    drawImage();
    originImageData = ctx.getImageData(0, 0, cw, ch);
    redraw();
  };
  image.src = logCrossingUrl;

  clickButton = startFadeout;
}
</script>

<style scoped></style>
