<template>
  <div>
    <button class="raw-style" @click="resetImage">重置</button>
    <div style="position: relative">
      <div :style="rubberStyle as any"></div>
      <CanvasContainer
        :draw
        :width="600"
        :height="427"
        style="cursor: crosshair"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import archUrl from "../shared/images/arch.png?url";

const rubberStyle = ref({
  position: "absolute",
  display: "none",
  left: "30px",
  top: "30px",
  width: "200px",
  height: "100px",
  border: "3px yellow solid",
  pointerEvents: "none",
});

let resetImage = () => {};

function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;

  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
  };
  image.src = archUrl;
  let startPos: Pos | null = null;
  ctx.canvas.onmousedown = (e) => {
    const bbox = canvas.getBoundingClientRect();
    startPos = { x: e.clientX - bbox.left, y: e.clientY - bbox.top };
  };
  ctx.canvas.onmousemove = (e) => {
    if (!startPos) return;
    const bbox = canvas.getBoundingClientRect();
    const curPos = { x: e.clientX - bbox.left, y: e.clientY - bbox.top };
    rubberStyle.value.display = "block";
    rubberStyle.value.left = Math.min(startPos.x, curPos.x) + "px";
    rubberStyle.value.top = Math.min(startPos.y, curPos.y) + "px";
    rubberStyle.value.width = Math.abs(startPos.x - curPos.x) + "px";
    rubberStyle.value.height = Math.abs(startPos.y - curPos.y) + "px";
  };
  ctx.canvas.onmouseup = (e) => {
    rubberStyle.value.display = "none";
    if (!startPos) return;
    const bbox = canvas.getBoundingClientRect();
    const endPos = { x: e.clientX - bbox.left, y: e.clientY - bbox.top };
    if (startPos.x !== endPos.x && startPos.y !== endPos.y) {
      const sx = Math.min(startPos.x, endPos.x);
      const sy = Math.min(startPos.y, endPos.y);
      const sw = Math.abs(startPos.x - endPos.x);
      const sh = Math.abs(startPos.y - endPos.y);
      ctx.drawImage(canvas, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    }
    startPos = null;
  };
  resetImage = () => {
    ctx.drawImage(image, 0, 0);
  };
}
</script>

<style scoped></style>
