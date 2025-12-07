<template>
  <CanvasContainer :width="500" :height="250" :draw />
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
  spritesheet.onload = function (e) {
    drawSpritesheet();
  };
}
</script>

<style scoped></style>
