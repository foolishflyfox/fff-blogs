<template>
  <CanvasContainer :draw :width="500" :height="500" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw(ctx: CanvasRenderingContext2D) {
  //   ctx.font = "30px Arial";
  document.fonts.load("30px 'Inconsolata'").then(() => {
    ctx.font = "30px 'Inconsolata'";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const fontStretchs: CanvasFontStretch[] = [
      "normal",
      "ultra-condensed",
      "extra-condensed",
      "condensed",
      "semi-condensed",
      "semi-expanded",
      "expanded",
      "extra-expanded",
      "ultra-expanded",
    ];
    for (let i = 0; i < fontStretchs.length; i++) {
      ctx.fontStretch = fontStretchs[i];
      ctx.fillText(`Hello world (默认: ${ctx.fontStretch})`, 5, 40 * i + 10);
    }
  });
}
</script>

<style scoped></style>
