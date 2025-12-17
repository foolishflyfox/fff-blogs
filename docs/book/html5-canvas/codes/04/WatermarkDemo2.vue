<template>
  <div>
    <div class="flex-y-center">
      <span class="mr-1em" style="width: 2em">{{ scaleValue.toFixed(2) }}</span>
      <input
        type="range"
        :min="1"
        :max="3"
        :step="0.01"
        v-model.number="scaleValue"
      />
    </div>
    <CanvasContainer :draw :width="600" :height="400" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import lonelybeachUrl from "../shared/images/lonelybeach.png?url";

const scaleValue = ref(1);

function draw(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  const offlineCanvas = document.createElement("canvas") as HTMLCanvasElement;
  offlineCanvas.width = cw;
  offlineCanvas.height = ch;
  const offlineCtx = offlineCanvas.getContext("2d")!;

  image.onload = () => {
    offlineCtx.drawImage(image, 0, 0, cw, ch);
    offlineCtx.strokeStyle = "yellow";
    offlineCtx.fillStyle = "#000";
    const fontSize = 96;
    offlineCtx.font = fontSize + "px Arial";
    offlineCtx.textBaseline = "middle";
    offlineCtx.textAlign = "center";
    offlineCtx.shadowColor = "#0008";
    offlineCtx.shadowBlur = 10;
    const content1 = "Copyright";
    const content2 = "Acme Inc.";
    offlineCtx.fillText(content1, cw / 2, ch / 2 - fontSize / 2);
    offlineCtx.fillText(content2, cw / 2, ch / 2 + fontSize / 2);
    offlineCtx.strokeText(content1, cw / 2, ch / 2 - fontSize / 2);
    offlineCtx.strokeText(content2, cw / 2, ch / 2 + fontSize / 2);
    watchEffect(() => {
      const { width, height } = image;
      const drawW = width * scaleValue.value;
      const drawH = height * scaleValue.value;

      ctx.restore();
      ctx.drawImage(
        offlineCanvas,
        0,
        0,
        cw,
        ch,
        cw / 2 - drawW / 2,
        ch / 2 - drawH / 2,
        drawW,
        drawH
      );
    });
  };
  image.src = lonelybeachUrl;
}
</script>

<style scoped></style>
