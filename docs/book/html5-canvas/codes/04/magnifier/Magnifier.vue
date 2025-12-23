<template>
  <div style="background-color: #ccc3; padding: 10px">
    <div class="flex-y-center" style="margin-bottom: 1em">
      <div
        class="mr-10px"
        :style="{
          color: 'blue',
          fontSize: `${0.8 * (1 + amplifyRate)}em`,
          width: '3.6rem',
        }"
      >
        {{ amplifyRate.toFixed(2) }}
      </div>
      <AdjustSlider v-model:rate="amplifyRate" style="margin-right: 2rem" />
      <div>
        <RangeView :range-rate style="margin-right: 1rem" />
      </div>
      <AdjustSlider v-model:rate="rangeRate" />
    </div>
    <CanvasContainer
      :draw
      :width="cw"
      :height="ch"
      background-color="#0000"
      :style="{ cursor: draggingMag ? 'grabbing' : 'grab' }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import AdjustSlider from "./AdjustSlider.vue";
import CanvasContainer from "../../CanvasContainer.vue";
import campUrl from "../../shared/images/camp.png?url";
import RangeView from "./RangeView.vue";
import { mouseEventToPos } from "@docs/utils";

// 缩放比例
const amplifyRate = ref(0.3);
// 缩放范围
const rangeR = 30;
const rangeRate = ref(0.5);
const cw = 600;
const ch = 374;
const offlineCanvas = document.createElement("canvas");
offlineCanvas.width = cw;
offlineCanvas.height = ch;
const offlineCtx = offlineCanvas.getContext("2d")!;
const draggingMag = ref(false);

let magX = cw * 0.6;
let magY = ch * 0.5;

function draw(ctx: CanvasRenderingContext2D) {
  const image = new Image();
  image.onload = () => {
    redraw();
    watch(() => [amplifyRate.value, rangeRate.value], redraw);
  };
  image.src = campUrl;
  function redraw() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(image, 0, 0);
    // 绘制放大镜范围
    const magR = rangeR * (1 + rangeRate.value * 3);
    offlineCtx.clearRect(0, 0, cw, ch);
    offlineCtx.save();
    offlineCtx.translate(magX, magY);
    const scaleV = 1 + amplifyRate.value * 5;
    offlineCtx.scale(scaleV, scaleV);
    offlineCtx.translate(-magX, -magY);
    offlineCtx.drawImage(image, 0, 0, cw, ch);
    offlineCtx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.arc(magX, magY, magR, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(offlineCanvas, 0, 0);
    ctx.restore();
    // 绘制放大镜外轮廓
    ctx.save();
    ctx.lineWidth = 5;
    ctx.shadowBlur = 3;
    ctx.shadowColor = "#0008";
    ctx.strokeStyle = "#eee";
    ctx.beginPath();
    ctx.arc(magX, magY, magR - ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  function updateMagPos(e: MouseEvent) {
    const pos = mouseEventToPos(ctx.canvas, e);
    magX = pos.x;
    magY = pos.y;
    redraw();
  }
  ctx.canvas.onmousedown = (e) => {
    updateMagPos(e);
    draggingMag.value = true;
  };
  ctx.canvas.onmousemove = (e) => {
    if (draggingMag.value) {
      updateMagPos(e);
    }
  };
  ctx.canvas.onmouseup = (e) => {
    draggingMag.value = false;
  };
}
</script>

<style scoped></style>
