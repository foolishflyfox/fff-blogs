<template>
  <div style="position: relative">
    <div style="position: absolute; left: 10px; top: 10px">
      <span>Stroke color: </span>
      <select class="standard" v-model="curColor">
        <option v-for="color of colors" :value="color">{{ color }}</option>
      </select>
      &nbsp;
      <span>Guidewires: </span>
      <input type="checkbox" v-model="guidewires" />
      &nbsp;
      <button class="raw-style" @click="clearAll">全部清除</button>
    </div>
    <CanvasContainer
      :draw
      :width="600"
      :height="400"
      background-color="#fafafa"
      style="cursor: pointer"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";
import { cursorTo } from "readline";

const colors = [
  "red",
  "green",
  "blue",
  "orange",
  "cornflowerblue",
  "goldenrod",
  "navy",
  "purple",
];

const curColor = ref("red");
const guidewires = ref(true);

let clearAll = () => {};

function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  const { width: cw, height: ch } = ctx.canvas;
  drawGrid(ctx, "lightgray", 10);
  ctx.lineWidth = 1;
  const initImageData = ctx.getImageData(0, 0, cw, ch);
  let curImageData = initImageData;
  let startPos: Pos | null = null;
  function windowPosToCanvasPos(windowPos: Pos) {
    const { left, top } = canvas.getBoundingClientRect();
    return { x: windowPos.x - left, y: windowPos.y - top };
  }
  function calcCanvasPos(e: MouseEvent) {
    return windowPosToCanvasPos({ x: e.clientX, y: e.clientY });
  }
  canvas.onmousedown = (e) => {
    // 记录起始点
    startPos = calcCanvasPos(e);
  };
  function drawingNewLine(e: MouseEvent, drawGuidewires?: boolean) {
    if (!startPos) return;
    ctx.putImageData(curImageData, 0, 0);
    const endPos = calcCanvasPos(e);
    ctx.strokeStyle = curColor.value;
    ctx.beginPath();
    ctx.moveTo(startPos.x, startPos.y);
    ctx.lineTo(endPos.x, endPos.y);
    ctx.stroke();
    if (drawGuidewires ?? guidewires.value) {
      ctx.save();
      ctx.strokeStyle = "#00f";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, endPos.y + 0.5);
      ctx.lineTo(cw, endPos.y + 0.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(endPos.x + 0.5, 0);
      ctx.lineTo(endPos.x + 0.5, ch);
      ctx.stroke();
      ctx.restore();
    }
  }
  canvas.onmousemove = (e) => {
    drawingNewLine(e);
  };
  canvas.onmouseup = (e) => {
    drawingNewLine(e, false);
    startPos = null;
    // 更新快照
    curImageData = ctx.getImageData(0, 0, cw, ch);
  };
  clearAll = () => {
    curImageData = initImageData;
    ctx.putImageData(curImageData, 0, 0);
  };
}
</script>

<style scoped></style>
