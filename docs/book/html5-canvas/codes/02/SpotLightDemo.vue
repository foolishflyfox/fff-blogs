<template>
  <div style="display: flex">
    <div>
      <select
        class="standard"
        :size="gco.length"
        style="padding-right: 0; background-image: none"
        v-model="curGco"
      >
        <option v-for="v of gco" :value="v">{{ v }}</option>
      </select>
    </div>
    &nbsp;
    <CanvasContainer :draw :width="500" :height="400" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CanvasContainer from "../CanvasContainer.vue";

const gco = [
  "source-over",
  "source-in",
  "source-out",
  "source-atop",
  "destination-over",
  "destination-in",
  "destination-out",
  "destination-atop",
  "lighter",
  "copy",
  "xor",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];
const curGco = ref("source-over");
function draw(ctx: CanvasRenderingContext2D) {
  function redraw(e?: MouseEvent) {
    const { width: cw, height: ch } = ctx.canvas;
    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.fillStyle = "#6d93e3";
    ctx.strokeStyle = "#d4d993";
    ctx.lineWidth = 3;
    // 注意，bold 必须放在前面
    ctx.font = "bold 128px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    const content = "HTML5";
    ctx.fillText(content, cw / 2, ch / 2);
    ctx.strokeText(content, cw / 2, ch / 2);
    ctx.globalCompositeOperation = curGco.value as any;
    if (e) {
      const { left, top } = ctx.canvas.getBoundingClientRect();
      const [x, y] = [e.clientX - left, e.clientY - top];
      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.arc(x, y, 100, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
  redraw();
  ctx.canvas.onmousemove = (e) => {
    redraw(e);
  };
}
</script>

<style scoped></style>
