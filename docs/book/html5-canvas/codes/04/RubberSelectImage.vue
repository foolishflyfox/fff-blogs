<template>
  <div>
    <button class="raw-style" @click="resetCanvas">重置</button>
    <CanvasContainer
      :draw
      :width="600"
      :height="427"
      style="cursor: crosshair"
    />
  </div>
</template>

<script setup lang="ts">
import { calcRectInfo, mouseEventToPos } from "@docs/utils";
import CanvasContainer from "../CanvasContainer.vue";
import archUrl from "../shared/images/arch.png?url";

let resetCanvas = () => {};

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  let curImageData: ImageData;
  let startPos: Pos | null = null;
  function initCanvas() {
    ctx.drawImage(image, 0, 0);
    curImageData = ctx.getImageData(0, 0, cw, ch);
    startPos = null;
  }
  image.onload = () => {
    initCanvas();
  };
  ctx.canvas.onmousedown = (e) => {
    startPos = mouseEventToPos(ctx.canvas, e);
  };
  ctx.canvas.onmousemove = (e) => {
    if (startPos) {
      ctx.putImageData(curImageData, 0, 0);
      const endPos = mouseEventToPos(ctx.canvas, e);
      const { left: x, top: y, width, height } = calcRectInfo(startPos, endPos);
      ctx.save();
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      ctx.restore();
    }
  };
  ctx.canvas.onmouseup = (e) => {
    if (startPos) {
      ctx.putImageData(curImageData, 0, 0);
      const endPos = mouseEventToPos(ctx.canvas, e);
      const { left: x, top: y, width, height } = calcRectInfo(startPos, endPos);
      ctx.drawImage(ctx.canvas, x, y, width, height, 0, 0, cw, ch);
      curImageData = ctx.getImageData(0, 0, cw, ch);
      startPos = null;
    }
  };
  resetCanvas = () => {
    initCanvas();
  };
  image.src = archUrl;
}
</script>

<style scoped></style>
