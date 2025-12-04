<template>
  <div>
    <canvas id="cities-canvas" width="1700" height="1700" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { drawCities } from "./demo";
onMounted(() => {
  const canvas = document.getElementById("cities-canvas") as HTMLCanvasElement;
  drawCities(canvas.getContext("2d")!);
});
</script>

<style scoped>
#cities-canvas {
  width: 100%;
  aspect-ratio: 1 / 1;
}
</style>
