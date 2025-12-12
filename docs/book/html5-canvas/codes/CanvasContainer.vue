<template>
  <canvas
    ref="canvasRef"
    :width
    :height
    :style="{ backgroundColor, width: width + 'px', height: height + 'px' }"
  />
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";

const props = withDefaults(
  defineProps<{
    width?: number;
    height?: number;
    backgroundColor?: string;
    draw: (ctx: CanvasRenderingContext2D) => void;
  }>(),
  {
    width: 200,
    height: 200,
    backgroundColor: "#eee",
  }
);

const canvasRef = useTemplateRef("canvasRef");

onMounted(() => {
  if (canvasRef.value) {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext("2d")!;
    props.draw(ctx);
  }
});
</script>

<style scoped></style>
