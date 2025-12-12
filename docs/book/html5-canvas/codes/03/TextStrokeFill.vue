<template>
  <div>
    <label class="mr-1em">
      <input type="checkbox" v-model="isStroke" />
      描边
    </label>
    <label class="mr-1em">
      <input type="checkbox" v-model="isFill" />
      填充
    </label>
    <label class="mr-1em">
      <input type="checkbox" v-model="isShadow" />
      阴影
    </label>
    <CanvasContainer :draw :width="600" :height="220" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import CanvasContainer from "../CanvasContainer.vue";

const isStroke = ref(true);
const isFill = ref(true);
const isShadow = ref(true);

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  function drawBackground() {
    const stepY = 12;
    const topMargin = stepY * 4;
    const leftMargin = stepY * 3;
    // 绘制横向线条
    ctx.save();
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 0.5;
    for (let i = ch; i > topMargin; i -= stepY) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(cw, i);
      ctx.stroke();
    }
    // 绘制纵向线条
    ctx.strokeStyle = "rgba(100, 0, 0, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(leftMargin, 0);
    ctx.lineTo(leftMargin, ch);
    ctx.stroke();
    ctx.restore();
  }
  function redraw(fill: boolean, stroke: boolean, shadow: boolean) {
    const content = "HTML5";
    ctx.clearRect(0, 0, cw, ch);
    drawBackground();
    ctx.save();
    ctx.font = "128px Palatino";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (shadow) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#0008";
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
    }
    if (fill) {
      ctx.fillStyle = "cornflowerblue";
      ctx.fillText(content, cw / 2, ch / 2);
    }
    if (stroke) {
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.strokeText(content, cw / 2, ch / 2);
    }
    ctx.restore();
  }

  watchEffect(() => {
    redraw(isFill.value, isStroke.value, isShadow.value);
  });
}
</script>

<style scoped></style>
