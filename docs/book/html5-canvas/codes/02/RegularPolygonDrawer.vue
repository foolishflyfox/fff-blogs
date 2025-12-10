<template>
  <div style="position: relative">
    <div style="position: absolute; left: 10px; top: 10px">
      <div>
        <span>编辑模式: </span>
        <input type="checkbox" v-model="isEdit" />
        &nbsp; &nbsp;
        <span>填充: </span>
        <input type="checkbox" v-model="isFill" />
        &nbsp; &nbsp;
        <span>边数: </span>
        <select class="standard" v-model="sideCount">
          <option v-for="v of [4, 6, 8, 10, 12, 20]" :value="v" :key="v">
            {{ v }}
          </option>
        </select>
        &nbsp; &nbsp;
        <span>起始角度: </span>
        <select class="standard" v-model="startAngle">
          <option
            v-for="v of [0, 1 / 8, 1 / 4, 3 / 8, 1 / 2]"
            :value="v * Math.PI"
          >
            {{ 180 * v }}
          </option>
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
      :style="{ cursor: isEdit ? 'pointer' : 'crosshair' }"
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
const sideCount = ref(4);
const isFill = ref(true);
const isEdit = ref(false);
const startAngle = ref(0);

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
    if (isEdit.value) {
    } else {
      // 记录起始点
      startPos = calcCanvasPos(e);
    }
  };
  function drawingNewPolygon(e: MouseEvent, guidewire = true) {
    if (!startPos) return;
    ctx.putImageData(curImageData, 0, 0);
    const endPos = calcCanvasPos(e);
    ctx.strokeStyle = strokeColor.value;
    ctx.fillStyle = fillColor.value;
    ctx.beginPath();
    const deltaX = endPos.x - startPos.x;
    const deltaY = endPos.y - startPos.y;
    const radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const subRadian = (Math.PI * 2) / sideCount.value;
    for (let i = 0; i < sideCount.value; i++) {
      const radian = startAngle.value + subRadian * i;
      const currentX = startPos.x + radius * Math.cos(radian);
      const currentY = startPos.y + radius * Math.sin(radian);
      if (i) {
        ctx.lineTo(currentX, currentY);
      } else {
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
      }
    }
    ctx.closePath();
    if (isFill.value) {
      ctx.fill();
    }
    ctx.stroke();
    // 绘制辅助线
    if (guidewire) {
      ctx.save();
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, startPos.y);
      ctx.lineTo(cw, startPos.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(startPos.x, 0);
      ctx.lineTo(startPos.x, ch);
      ctx.stroke();
      ctx.restore();
    }
  }
  canvas.onmousemove = (e) => {
    drawingNewPolygon(e);
  };
  canvas.onmouseup = (e) => {
    drawingNewPolygon(e, false);
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
