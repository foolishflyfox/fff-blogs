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
import imageUrl from "../../shared/images/grand-canyon.png?url";
import RangeView from "./RangeView.vue";
import { mouseEventToPos, posDistance } from "@docs/utils";

// 缩放比例
const amplifyRate = ref(0.3);
// 缩放范围
const rangeR = 30;
const rangeRate = ref(0.5);
const cw = 600;
const ch = 388;
const draggingMag = ref(false);

let magX = cw * 0.6;
let magY = ch * 0.5;

interface LastMoveInfo extends Pos {
  time: number;
}

let lastMoveInfo: LastMoveInfo | null = null;
let lastMoveInfo2: LastMoveInfo | null = null;

function draw(ctx: CanvasRenderingContext2D) {
  const offlineCanvas = document.createElement("canvas");
  offlineCanvas.width = cw;
  offlineCanvas.height = ch;
  const offlineCtx = offlineCanvas.getContext("2d")!;

  const image = new Image();
  image.onload = () => {
    redraw();
    watch(() => [amplifyRate.value, rangeRate.value], redraw);
  };
  image.src = imageUrl;
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
    return pos;
  }
  ctx.canvas.onmousedown = (e) => {
    autoMoveInfo = null;
    lastMoveInfo = null;
    lastMoveInfo2 = null;
    updateMagPos(e);
    draggingMag.value = true;
  };
  ctx.canvas.onmousemove = (e) => {
    if (draggingMag.value) {
      const pos = updateMagPos(e);
      const curMoveInfo = {
        ...pos,
        time: Date.now(),
      };
      if (lastMoveInfo2) {
        lastMoveInfo = lastMoveInfo2;
      }
      lastMoveInfo2 = curMoveInfo;
    }
  };
  let autoMoveInfo: LastMoveInfo | null = null;
  function autoMove() {
    if (!autoMoveInfo) return;
    const magR = rangeR * (1 + rangeRate.value * 3);
    const now = Date.now();
    magX += autoMoveInfo.x * (now - autoMoveInfo.time);
    magY += autoMoveInfo.y * (now - autoMoveInfo.time);
    // console.log("magx/y:", magX, magY);
    if (magX + magR >= cw) {
      magX = cw - magR;
      autoMoveInfo.x *= -1;
    } else if (magX - magR <= 0) {
      magX = magR;
      autoMoveInfo.x *= -1;
    }
    if (magY + magR >= ch) {
      magY = ch - magR;
      autoMoveInfo.y *= -1;
    } else if (magY - magR <= 0) {
      magY = magR;
      autoMoveInfo.y *= -1;
    }
    redraw();
    autoMoveInfo.time = now;
    requestAnimationFrame(autoMove);
  }
  ctx.canvas.onmouseup = (e) => {
    draggingMag.value = false;
    if (lastMoveInfo) {
      const lastInfo = lastMoveInfo;
      lastMoveInfo = null;
      const curPos = mouseEventToPos(ctx.canvas, e);
      const now = Date.now();
      const distance = posDistance(lastInfo, curPos);
      if (distance < 2) {
        autoMoveInfo = null;
      } else {
        autoMoveInfo = {
          x: (curPos.x - lastInfo.x) / (now - lastInfo.time) / 10,
          y: (curPos.y - lastInfo.y) / (now - lastInfo.time) / 10,
          time: now,
        };

        requestAnimationFrame(autoMove);
      }
    }
  };
}
</script>

<style scoped></style>
