<template>
  <div>
    <div>
      <span>坐标值: </span>
      <span id="readout" style="color: blue"></span>
    </div>
    <CanvasContainer
      :width="500"
      :height="250"
      :draw
      background-color="#fff"
      style="border: 1px #888 solid"
    />
  </div>
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import runningSpriteSheetUrl from "../shared/images/running-sprite-sheet.png?url";
function draw(context: CanvasRenderingContext2D) {
  const canvas = context.canvas;
  const spritesheet = new Image();
  // 显示坐标的值的元素
  const readout = document.querySelector("#readout") as HTMLSpanElement;
  // 绘制图片
  function drawSpritesheet() {
    context.drawImage(spritesheet, 0, 0);
  }
  spritesheet.src = runningSpriteSheetUrl;

  /**
   * 绘制作为背景的横线
   */
  function drawBackground() {
    const VERTICAL_LINE_SPACING = 12;
    let i = canvas.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "lightgray";
    context.lineWidth = 0.5;
    while (i > VERTICAL_LINE_SPACING * 4) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(canvas.width, i);
      context.stroke();
      i -= VERTICAL_LINE_SPACING;
    }
  }
  /**
   * 绘制定位线
   */
  function drawGridelines(x: number, y: number) {
    context.strokeStyle = "rgba(0, 0, 230, 0.8)";
    context.lineWidth = 0.5;
    // 绘制水平线
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
    // 绘制垂直线
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }
  /**
   * 更新显示的坐标值
   */
  function updateReadout(x: number, y: number) {
    readout.innerHTML = `(${x.toFixed(0)}, ${y.toFixed(0)})`;
  }
  /**
   * window 坐标到 canvas 坐标转换
   */
  function windowPosToCanvasPos(windowX: number, windowY: number) {
    const bbox = canvas.getBoundingClientRect();
    return {
      x: (windowX - bbox.left) * (canvas.width / bbox.width),
      y: (windowY - bbox.top) * (canvas.height / bbox.height),
    };
  }

  drawBackground();
  spritesheet.onload = function (e) {
    drawSpritesheet();
  };
  // 处理鼠标移动事件
  canvas.onmousemove = (e) => {
    const canvasPos = windowPosToCanvasPos(e.clientX, e.clientY);
    drawBackground();
    drawSpritesheet();
    drawGridelines(canvasPos.x, canvasPos.y);
    updateReadout(canvasPos.x, canvasPos.y);
  };
}
</script>

<style scoped></style>
