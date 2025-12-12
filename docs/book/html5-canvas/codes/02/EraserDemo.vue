<template>
  <div style="position: relative">
    <div style="position: absolute; left: 10px; top: 10px">
      <div>
        <span>模式: </span>
        <select class="standard" v-model="mode">
          <option value="edit">编辑模式</option>
          <option value="eraser">橡皮擦模式</option>
        </select>
        &nbsp;&nbsp;
        <template v-if="mode === 'edit'">
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
        </template>
        <template v-else>
          <span>橡皮擦形状: </span>
          <select v-model="eraserShape" class="standard">
            <option value="circle">圆形</option>
            <option value="rect">方形</option>
          </select>
          &nbsp;&nbsp;
          <span>橡皮擦大小:</span>
          <select v-model="eraserWidth" class="standard">
            <option v-for="i in 8" :value="25 * i">{{ 25 * i }}</option>
          </select>
        </template>
      </div>
      <div style="margin-top: 5px" v-if="mode === 'edit'">
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

const mode = ref("edit");
// 编辑模式变量
const strokeColor = ref("red");
const fillColor = ref("goldenrod");
const lineWidth = ref(1);
const guidewires = ref(true);
const isFill = ref(true);
// 橡皮擦模式变量
const eraserShape = ref("circle");
const eraserWidth = ref(25);
const erasing = ref(false);

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
    if (mode.value === "edit") {
      startPos = calcCanvasPos(e);
    } else {
      erasing.value = true;
    }
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
  function eraseArea(e: MouseEvent) {
    const pos = calcCanvasPos(e);
    ctx.save();
    ctx.beginPath();
    const w = eraserWidth.value;
    if (eraserShape.value === "circle") {
      ctx.arc(pos.x, pos.y, w / 2, 0, Math.PI * 2);
    } else {
      ctx.rect(pos.x - w / 2, pos.y - w / 2, w, w);
    }
    ctx.clip();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawGrid(ctx, "lightgray", 10);
    ctx.restore();
  }
  canvas.onmousemove = (e) => {
    if (mode.value === "edit") {
      drawingNewLine(e);
    } else {
      if (erasing.value) {
        eraseArea(e);
      }
    }
  };
  canvas.onmouseup = (e) => {
    if (mode.value === "edit") {
      drawingNewLine(e, false);
      startPos = null;
    } else {
      if (erasing.value) {
        eraseArea(e);
        erasing.value = false;
      }
    }
    // 更新快照
    curImageData = getCanvasImage();
  };
}
</script>

<style scoped></style>
