<template>
  <div>
    <button class="raw-style">重置</button>
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
    }
  };
  ctx.canvas.onmouseup = (e) => {};
  image.src = archUrl;
}
</script>

<style scoped></style>
