<template>
  <div style="position: relative">
    <div style="position: absolute; left: 10px; top: 10px">
      <div>
        <span>填充: </span>
        <input type="checkbox" v-model="isFill" />
        &nbsp; &nbsp;
        <span>辅助线: </span>
        <input type="checkbox" v-model="guidewires" />
        &nbsp; &nbsp;
        <span>线宽: </span>
        <select class="standard" v-model="lineWidth">
          <option v-for="i in 6" :value="i">{{ i + ".0" }}</option>
        </select>
        &nbsp; &nbsp;
        <button class="raw-style" @click="clearAll">全部清除</button>
      </div>
      <div style="margin-top: 5px">
        <span>描边色: </span>
        <select class="standard" v-model="strokeColor">
          <option v-for="color of strokeColors" :value="color" :key="color">
            {{ color }}
          </option>
        </select>
        &nbsp; &nbsp;
        <span>填充色: </span>
        <select class="standard" v-model="fillColor">
          <option value="rgba(255,0,0,0.5)">semi-transparent red</option>
          <option value="green">green</option>
          <option value="rgba(0,0,255,0.5)">semi-transparent blue</option>
          <option value="orange">orange</option>
          <option value="rgba(100,140,230,0.5)">
            semi-transparent cornflowerblue
          </option>
          <option value="goldenrod" selected>goldenrod</option>
          <option value="navy">navy</option>
          <option value="purple">purple</option>
        </select>
        &nbsp; &nbsp;
      </div>
    </div>
    <CanvasContainer
      :draw
      :width="600"
      :height="500"
      background-color="#fafafa"
      style="cursor: pointer"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

const strokeColors = [
  "red",
  "green",
  "blue",
  "orange",
  "cornflowerblue",
  "goldenrod",
  "navy",
  "purple",
];

const strokeColor = ref("red");
const fillColor = ref("goldenrod");
const lineWidth = ref(1);
const guidewires = ref(true);
const isFill = ref(true);

let clearAll = () => {};

function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  const { width: cw, height: ch } = ctx.canvas;
  drawGrid(ctx, "lightgray", 10);
  ctx.lineWidth = 1;
  const initImageData = getCanvasImage();
  let curImageData = initImageData;
  let startPos: Pos | null = null;
  function getCanvasImage() {
    return ctx.getImageData(0, 0, cw, ch);
  }
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
    ctx.strokeStyle = strokeColor.value;
    ctx.fillStyle = fillColor.value;
    ctx.lineWidth = lineWidth.value;
    ctx.beginPath();
    const deltaX = endPos.x - startPos.x;
    const deltaY = endPos.y - startPos.y;
    ctx.arc(
      startPos.x,
      startPos.y,
      Math.sqrt(deltaX * deltaX + deltaY * deltaY),
      0,
      Math.PI * 2
    );
    if (isFill.value) {
      ctx.fill();
    }
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
    curImageData = getCanvasImage();
  };
  clearAll = () => {
    curImageData = initImageData;
    ctx.putImageData(curImageData, 0, 0);
  };
}
</script>

<style scoped></style>
