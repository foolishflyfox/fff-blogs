<template>
  <div style="position: relative">
    <div :style="tipsStyle as any">
      <p style="color: blue">
        拖动锚点与控制点改变曲线形状。<br /><br />
        在形状调整结束后，点击锚点或<br />
        控制点外的区域结束。
      </p>
      <div>
        <button class="raw-style" @click="tipsStyle.display = 'none'">
          OK
        </button>
        <button class="raw-style" @click="tipsStyle.visibility = 'hidden'">
          不再提醒
        </button>
      </div>
    </div>
    <div style="position: absolute; left: 10px; top: 10px">
      <span>描边色: </span>
      <select class="standard" v-model="curColor">
        <option v-for="color of colors" :value="color">{{ color }}</option>
      </select>
      &nbsp;
      <span>辅助线: </span>
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
import { posDistance } from "@docs/utils";

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
const tipsStyle = ref({
  padding: "5px",
  position: "absolute",
  display: "none",
  visibility: "visible",
  // visibility: "hidden",
  top: "0px",
  left: "0px",
  backgroundColor: "#00e3",
});

let clearAll = () => {};

function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  const { width: cw, height: ch } = ctx.canvas;
  drawGrid(ctx, "lightgray", 10);
  ctx.lineWidth = 1;
  const initImageData = getCanvasImage();
  let curImageData = initImageData;
  let startPos: Pos | null = null;
  let bezierPts: Pos[] = [];
  let bezierPtR = 5;
  let optBezierPtIndex = -1;
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
    optBezierPtIndex = -1;
    if (bezierPts.length) {
      const pos = calcCanvasPos(e);
      for (let i = 0; i < bezierPts.length; i++) {
        const deltaX = bezierPts[i].x - pos.x;
        const deltaY = bezierPts[i].y - pos.y;
        if (deltaX * deltaX + deltaY * deltaY <= bezierPtR * bezierPtR) {
          optBezierPtIndex = i;
          break;
        }
      }
      if (optBezierPtIndex === -1) {
        // 清空锚点与控制点
        drawingBezier(bezierPts, false);
        bezierPts.length = 0;
      }
    }
    if (optBezierPtIndex === -1) {
      // 更新快照
      curImageData = getCanvasImage();
      // 记录起始点
      startPos = calcCanvasPos(e);
    }
  };
  function doDrawGruidwires(pos: Pos) {
    if (!guidewires.value) return;
    ctx.save();
    ctx.strokeStyle = "#00f";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, pos.y + 0.5);
    ctx.lineTo(cw, pos.y + 0.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x + 0.5, 0);
    ctx.lineTo(pos.x + 0.5, ch);
    ctx.stroke();
    ctx.restore();
  }
  function drawingBezier(pts: Pos[], drawPts = true) {
    ctx.putImageData(curImageData, 0, 0);
    ctx.strokeStyle = curColor.value;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    ctx.bezierCurveTo(
      pts[1].x,
      pts[1].y,
      pts[2].x,
      pts[2].y,
      pts[3].x,
      pts[3].y
    );
    ctx.stroke();
    if (drawPts) {
      ctx.save();
      ctx.strokeStyle = "blue";
      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, bezierPtR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(pts[3].x, pts[3].y, bezierPtR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.arc(pts[1].x, pts[1].y, bezierPtR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(pts[2].x, pts[2].y, bezierPtR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
  function getInitBezierPts(pos1: Pos, pos2: Pos) {
    const left = Math.min(pos1.x, pos2.x);
    const top = Math.min(pos1.y, pos2.y);
    const right = Math.max(pos1.x, pos2.x);
    const bottom = Math.max(pos1.y, pos2.y);
    const pts: Pos[] = [
      { x: left, y: top },
      { x: left, y: bottom },
      { x: right, y: top },
      { x: right, y: bottom },
    ];
    return pts;
  }
  function drawInitBezier(pos1: Pos, pos2: Pos) {
    const pts = getInitBezierPts(pos1, pos2);
    drawingBezier(pts, true);
  }
  canvas.onmousemove = (e) => {
    const endPos = calcCanvasPos(e);
    if (optBezierPtIndex !== -1) {
      // 调整形状模式
      bezierPts[optBezierPtIndex].x += e.movementX;
      bezierPts[optBezierPtIndex].y += e.movementY;
      drawingBezier(bezierPts, true);
      doDrawGruidwires(endPos);
    } else if (startPos) {
      // 新建曲线模式
      drawInitBezier(startPos, endPos);
      doDrawGruidwires(endPos);
    }
  };
  canvas.onmouseup = (e) => {
    const endPos = calcCanvasPos(e);
    if (startPos) {
      // 排除点击，但没有拖动的动作
      if (posDistance(startPos, endPos) > 3) {
        drawInitBezier(startPos, endPos);
        bezierPts = getInitBezierPts(startPos, endPos);
        startPos = null;
        if (tipsStyle.value.visibility === "visible") {
          tipsStyle.value.left = e.offsetX + "px";
          tipsStyle.value.top = e.offsetY + "px";
          tipsStyle.value.display = "block";
        }
      } else {
        startPos = null;
      }
    } else if (optBezierPtIndex !== -1) {
      drawingBezier(bezierPts, true);
      optBezierPtIndex = -1;
    }
  };
  clearAll = () => {
    curImageData = initImageData;
    ctx.putImageData(curImageData, 0, 0);
    startPos = null;
    optBezierPtIndex = -1;
    bezierPts.length = 0;
  };
}
</script>

<style scoped></style>
