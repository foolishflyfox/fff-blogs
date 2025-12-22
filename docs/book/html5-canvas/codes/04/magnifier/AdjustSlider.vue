<template>
  <CanvasContainer :draw :width="cw" :height="ch" background-color="#0000" />
</template>

<script setup lang="ts">
import { mouseEventToPos } from "@docs/utils";
import CanvasContainer from "../../CanvasContainer.vue";

const rate = defineModel<number>("rate", { required: true });
const cw = 200;
const ch = 38;
const barWidth = 24;
const vMargin = (ch - barWidth) / 2;

function draw(ctx: CanvasRenderingContext2D) {
  let dragging = false;
  const canvas = ctx.canvas;
  const linearGradient = ctx.createLinearGradient(0, 0, 0, ch - vMargin);
  linearGradient.addColorStop(0, "#6e85c0");
  linearGradient.addColorStop(0.35, "#fff");
  linearGradient.addColorStop(1, "#34469c");
  ctx.strokeStyle = "#4e5eb2";

  function redraw() {
    ctx.fillStyle = linearGradient;
    ctx.beginPath();
    // ctx.moveTo(barWidth / 2, vMargin);
    ctx.moveTo(cw - barWidth / 2, vMargin);
    ctx.arc(
      cw - barWidth / 2,
      ch / 2,
      barWidth / 2,
      -Math.PI / 2,
      Math.PI / 2,
      false
    );

    ctx.lineTo(barWidth / 2, ch - vMargin);
    ctx.arc(
      barWidth / 2,
      ch / 2,
      barWidth / 2,
      Math.PI / 2,
      Math.PI * 1.5,
      false
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ff08";
    ctx.beginPath();
    ctx.arc(
      (cw - ch) * rate.value + ch / 2,
      ch / 2,
      ch / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();
  }

  ctx.canvas.onmousedown = (e) => {
    const pos = mouseEventToPos(canvas, e);
    dragging = true;
  };
  ctx.canvas.onmousemove = (e) => {};
  ctx.canvas.onmouseup = (e) => {
    dragging = false;
  };
  redraw();
}
</script>

<style scoped></style>
