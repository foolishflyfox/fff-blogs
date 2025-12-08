<template>
  <div style="position: relative">
    <div style="position: absolute; left: 500px; top: 10px">
      <div>
        <input
          type="checkbox"
          :checked="sameDirection"
          @click="toggleSameDirection"
        />
        <span style="font-weight: bold">两圆同向</span>
      </div>
      <div>
        <input
          type="checkbox"
          :checked="annotationVisible"
          @click="toggleAnnotationVisible"
        />
        <span style="font-weight: bold">显示注解</span>
      </div>
    </div>
    <CanvasContainer
      :draw
      :width="600"
      :height="400"
      background-color="#f8f8f8"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";

const sameDirection = ref(false);
const annotationVisible = ref(true);

let toggleSameDirection = () => {};
let toggleAnnotationVisible = () => {};

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  ctx.fillStyle = "rgba(100, 140, 230, 0.5)";
  ctx.strokeStyle = ctx.fillStyle;
  ctx.font = "13pt Arial";
  function drawTwoArcs() {
    ctx.save();
    ctx.beginPath();
    // 外部圆，逆时针方向绘制
    ctx.arc(300, 180, 150, 0, Math.PI * 2, true);
    // 内部圆，根据传入的参数决定
    ctx.arc(300, 180, 100, 0, Math.PI * 2, sameDirection.value);
    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.shadowOffsetX = 12;
    ctx.shadowOffsetY = 12;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.restore();
    ctx.stroke();
  }
  function drawAll() {
    ctx.clearRect(0, 0, cw, ch);
    drawGrid(ctx, "lightgray", 10);
    drawTwoArcs();
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.fillText("一个路径包含2个圆", 10, 20);
    ctx.fillText(
      "context.arc(300, 180, 150, 0, Math.PI * 2, true)",
      10,
      ch - 30
    );
    ctx.fillText(
      `context.arc(300, 180, 100, 0, Math.PI * 2, ${sameDirection.value})`,
      10,
      ch - 10
    );
    ctx.restore();
    if (annotationVisible.value) {
      ctx.save();
      ctx.fillStyle = "#00f";
      ctx.fillText("逆时针", 440, 100);
      ctx.fillText(sameDirection.value ? "逆时针" : "顺时针", 330, 160);
      ctx.strokeStyle = "#00f";
      ctx.beginPath();
      ctx.moveTo(300, 180);
      ctx.lineTo(100, 250);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(430, 200);
      ctx.lineTo(520, 250);
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(100, 250, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(520, 250, 3, 0, Math.PI * 2);
      ctx.fill();
      if (!sameDirection.value) {
        ctx.fillText("+1", 205, 200);
      }
      ctx.fillText("-1", 133, 230);
      ctx.fillText(sameDirection.value ? "-1" : "0", 90, 240);
      ctx.fillText("-1", 460, 210);
      ctx.fillText("-1", 520, 240);
      ctx.restore();
    }
  }
  drawAll();
  toggleSameDirection = () => {
    sameDirection.value = !sameDirection.value;
    drawAll();
  };
  toggleAnnotationVisible = () => {
    annotationVisible.value = !annotationVisible.value;
    drawAll();
  };
}
</script>

<style scoped></style>
