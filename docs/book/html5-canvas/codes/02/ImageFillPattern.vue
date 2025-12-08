<template>
  <div>
    <div
      style="display: inline-block; margin-right: 10px"
      v-for="e of ['repeat', 'repeat-x', 'repeat-y', 'no-repeat']"
    >
      <input
        name="patternRadio"
        type="radio"
        :checked="imagePattern === e"
        @click="changeImagePattern(e)"
      />
      <span>{{ e }}</span>
    </div>
    <CanvasContainer
      :draw
      :width="450"
      :height="275"
      style="border: 1px solid #888"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import redBallUrl from "../shared/images/redball.png?url";

const imagePattern = ref("repeat");

let changeImagePattern = (patterStr: string) => {};
function draw(ctx: CanvasRenderingContext2D) {
  const image = new Image();
  const { width: cw, height: ch } = ctx.canvas;
  changeImagePattern = (patterStr: string) => {
    ctx.clearRect(0, 0, cw, ch);
    const pattern = ctx.createPattern(image, patterStr)!;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, cw, ch);
  };
  image.onload = () => changeImagePattern(imagePattern.value);
  image.src = redBallUrl;
}
</script>

<style scoped></style>
