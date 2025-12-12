<template>
  <CanvasContainer :draw :width="700" :height="450" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

const leftColumnFonts = [
  "2em palatino",
  "bolder 2em palatino",
  "lighter 2em palatino",
  "italic 2em palatino",
  "oblique small-caps 24px palatino",
  "bold 14pt palatino",
  "xx-large palatino",
  "italic xx-large palatino",
];

const rightColumnFonts = [
  "oblique 1.5em lucida console",
  "x-large fantasy",
  "italic 28px monaco",
  "italic large copperplate",
  "36px century",
  "28px tahoma",
  "28px impact",
  "1.7em verdana",
];

function draw(ctx: CanvasRenderingContext2D) {
  ctx.textBaseline = "top";
  for (let i = 0; i < leftColumnFonts.length; i++) {
    ctx.font = leftColumnFonts[i];
    ctx.fillText(leftColumnFonts[i], 20, 55 * i + 20);
  }
  for (let i = 0; i < rightColumnFonts.length; i++) {
    ctx.font = rightColumnFonts[i];
    ctx.fillText(rightColumnFonts[i], 360, 55 * i + 20);
  }
}
</script>

<style scoped></style>
