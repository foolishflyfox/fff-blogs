<template>
  <CanvasContainer
    :width="500"
    :height="250"
    :draw
    background-color="#fff"
    style="border: 1px #888 solid"
  />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import runningSpriteSheetUrl from "../shared/images/running-sprite-sheet.png?url";
function draw(context: CanvasRenderingContext2D) {
  const canvas = context.canvas;
  const spritesheet = new Image();

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
  drawBackground();
  spritesheet.onload = function (e) {
    drawSpritesheet();
  };
}
</script>

<style scoped></style>
