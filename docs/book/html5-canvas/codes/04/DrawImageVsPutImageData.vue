<template>
  <div style="background-color: #eee; padding: 5px">
    <div>
      <button v-if="startEnable" @click="startTest" class="raw-style">
        开始测试 drawImage 和 putImageData 的性能
      </button>
    </div>
    <div>
      <div class="font-bold">putImageData 测试结果:</div>
      <ul>
        <li>测试次数: {{ putImageDataTest.count }} / {{ testTimes }}</li>
        <li>执行总时间: {{ putImageDataTest.sumMs }} ms</li>
        <li>
          平均执行时间:
          {{
            (putImageDataTest.sumMs / (putImageDataTest.count || 1)).toFixed(2)
          }}
          ms
        </li>
      </ul>
    </div>
    <div>
      <div class="font-bold">drawImage 测试结果:</div>
      <ul>
        <li>测试次数: {{ drawImageTest.count }} / {{ testTimes }}</li>
        <li>执行总时间: {{ drawImageTest.sumMs }} ms</li>
        <li>
          平均执行时间:
          {{ (drawImageTest.sumMs / (drawImageTest.count || 1)).toFixed(2) }}
          ms
        </li>
      </ul>
    </div>
    <div>
      <div class="font-bold">drawImage 测试绘制 canvas 结果:</div>
      <ul>
        <li>测试次数: {{ drawCanvasTest.count }} / {{ testTimes }}</li>
        <li>执行总时间: {{ drawCanvasTest.sumMs }} ms</li>
        <li>
          平均执行时间:
          {{ (drawCanvasTest.sumMs / (drawCanvasTest.count || 1)).toFixed(2) }}
          ms
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import logCrossingUrl from "../shared/images/log-crossing.png?url";
import { createOfflineCanvas } from "@docs/utils";

const testTimes = 5000;

const putImageDataTest = ref({
  count: 0,
  sumMs: 0,
});
const drawImageTest = ref({
  count: 0,
  sumMs: 0,
});
const drawCanvasTest = ref({
  count: 0,
  sumMs: 0,
});
const image = new Image();
let imageData: ImageData;
let drawImageCanvas: HTMLCanvasElement;
let drawImageCtx: CanvasRenderingContext2D;
let putImageDataCanvas: HTMLCanvasElement;
let putImageDataCtx: CanvasRenderingContext2D;
let drawCanvasCanvas: HTMLCanvasElement;
let drawCanvasCtx: CanvasRenderingContext2D;
image.onload = () => {
  const { width: w, height: h } = image;
  drawImageCanvas = createOfflineCanvas(w, h);
  drawImageCtx = drawImageCanvas.getContext("2d")!;
  putImageDataCanvas = createOfflineCanvas(w, h);
  putImageDataCtx = putImageDataCanvas.getContext("2d")!;
  drawImageCtx.drawImage(image, 0, 0);
  imageData = drawImageCtx.getImageData(0, 0, w, h);
  drawCanvasCanvas = createOfflineCanvas(w, h);
  drawCanvasCtx = drawCanvasCanvas.getContext("2d")!;
};
image.src = logCrossingUrl;

const startEnable = ref(true);
function startTest() {
  startEnable.value = false;
  while (putImageDataTest.value.count < testTimes) {
    const t0 = Date.now();
    putImageDataCtx.putImageData(imageData, 0, 0);
    const t1 = Date.now();
    putImageDataTest.value.sumMs += t1 - t0;
    putImageDataTest.value.count++;
  }
  while (drawImageTest.value.count < testTimes) {
    const t0 = Date.now();
    drawImageCtx.drawImage(image, 0, 0);
    const t1 = Date.now();
    drawImageTest.value.sumMs += t1 - t0;
    drawImageTest.value.count++;
  }
  while (drawCanvasTest.value.count < testTimes) {
    const t0 = Date.now();
    drawCanvasCtx.drawImage(drawImageCanvas, 0, 0);
    const t1 = Date.now();
    drawCanvasTest.value.sumMs += t1 - t0;
    drawCanvasTest.value.count++;
  }
}
</script>

<style scoped></style>
