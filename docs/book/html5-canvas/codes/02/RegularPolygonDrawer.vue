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

class Polygon {
  constructor(
    public ctx: CanvasRenderingContext2D,
    public initRadian: number,
    public sids: number,
    public x: number,
    public y: number,
    public radius: number,
    public fillColor: string,
    public strokeColor: string,
    public isFill: boolean
  ) {}

  private drawPath() {
    this.ctx.beginPath();

    const subRadian = (Math.PI * 2) / this.sids;
    for (let i = 0; i < this.sids; i++) {
      const radian = this.initRadian + subRadian * i;
      const currentX = this.x + this.radius * Math.cos(radian);
      const currentY = this.y + this.radius * Math.sin(radian);
      if (i) {
        this.ctx.lineTo(currentX, currentY);
      } else {
        this.ctx.beginPath();
        this.ctx.moveTo(currentX, currentY);
      }
    }
    this.ctx.closePath();
  }

  drawImage() {
    this.ctx.save();
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.fillStyle = this.fillColor;
    this.ctx.shadowBlur = 5;
    this.ctx.shadowColor = "#0006";
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    this.drawPath();
    if (this.isFill) {
      this.ctx.fill();
    }
    this.ctx.stroke();
    this.ctx.restore();
  }

  isPosInPolygon(pos: Pos) {
    this.drawPath();
    return this.ctx.isPointInPath(pos.x, pos.y);
  }
}

function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  const { width: cw, height: ch } = ctx.canvas;
  drawGrid(ctx, "lightgray", 10);
  ctx.lineWidth = 1;
  const initImageData = getCanvasImage();
  let curImageData = initImageData;
  let startPos: Pos | null = null;
  let dragIndex = -1;
  const polygons: Polygon[] = [];
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
    const curPos = calcCanvasPos(e);
    if (isEdit.value) {
      for (let i = polygons.length - 1; i >= 0; i--) {
        const tPolygon = polygons[i];
        if (tPolygon.isPosInPolygon(curPos)) {
          dragIndex = i;
          break;
        }
      }
    } else {
      // 记录起始点
      startPos = calcCanvasPos(e);
    }
  };

  function createPolygon(startPos: Pos, endPos: Pos) {
    const deltaX = endPos.x - startPos.x;
    const deltaY = endPos.y - startPos.y;
    const radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return new Polygon(
      ctx,
      startAngle.value,
      sideCount.value,
      startPos.x,
      startPos.y,
      radius,
      fillColor.value,
      strokeColor.value,
      isFill.value
    );
  }

  function drawingNewPolygon(e: MouseEvent, guidewire = true) {
    if (!startPos) return;
    ctx.putImageData(curImageData, 0, 0);
    const endPos = calcCanvasPos(e);
    const polygon = createPolygon(startPos, endPos);
    polygon.drawImage();
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
    return polygon;
  }
  canvas.onmousemove = (e) => {
    if (startPos) {
      drawingNewPolygon(e);
    }
    if (dragIndex !== -1) {
      const tPolygon = polygons[dragIndex];
      tPolygon.x += e.movementX;
      tPolygon.y += e.movementY;
      ctx.putImageData(initImageData, 0, 0);
      for (const tp of polygons) {
        tp.drawImage();
      }
    }
  };
  canvas.onmouseup = (e) => {
    if (startPos) {
      const newPolygon = drawingNewPolygon(e, false);
      startPos = null;
      if (newPolygon) {
        polygons.push(newPolygon);
      }
    }
    if (dragIndex !== -1) {
      dragIndex = -1;
    }
    // 更新快照
    curImageData = getCanvasImage();
  };
  clearAll = () => {
    curImageData = initImageData;
    ctx.putImageData(curImageData, 0, 0);
    polygons.length = 0;
  };
}
</script>

<style scoped></style>
