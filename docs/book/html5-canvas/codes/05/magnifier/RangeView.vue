<template>
  <CanvasContainer :draw :width="sz" :height="sz" background-color="#0000" />
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import CanvasContainer from "../../CanvasContainer.vue";

const props = defineProps<{
  rangeRate: number;
}>();

const sz = 40;

function draw(ctx: CanvasRenderingContext2D) {
  watchEffect(() => {
    ctx.clearRect(0, 0, sz, sz);
    const r = (0.2 + 0.8 * props.rangeRate) * (sz / 2 - 2);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(sz / 2, sz / 2, r, 0, Math.PI * 2);
    ctx.stroke();
  });
}
</script>

<style scoped></style>
