<template>
  <div>
    <div>
      <button class="raw-style" @click="isNormal = !isNormal">
        {{ isNormal ? "带上墨镜" : "摘掉" }}
      </button>
    </div>
    <CanvasContainer :draw :width="600" :height="424" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import curvedRoudUrl from "../shared/images/curved-road.png?url";

const isNormal = ref(true);

function draw(ctx: CanvasRenderingContext2D) {
  const worker = new Worker(new URL("./sunglass-filter.ts", import.meta.url), {
    type: "module",
  });
  const { width: cw, height: ch } = ctx.canvas;
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, cw, ch);

    worker.onmessage = (e: MessageEvent<ImageData>) => {
      const cx1 = cw * 0.25;
      const cy1 = ch * 0.5;
      const cx2 = cw * 0.75;
      const cy2 = cy1;
      const r = 135;
      const radian = Math.PI / 6;
      const bzX1 = cx1 + r * Math.cos(radian);
      const bzY1 = cy1 - r * Math.sin(radian);
      const bzX2 = cx2 - r * Math.cos(radian);
      const bzY2 = bzY1;
      const bzX3 = cw / 2;
      const bzY3 = ch / 2 - 100;
      // 绘制两个圆
      const canvas2 = document.createElement("canvas") as HTMLCanvasElement;
      canvas2.width = cw;
      canvas2.height = ch;
      const ctx2 = canvas2.getContext("2d")!;
      ctx2.putImageData(e.data, 0, 0);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx1, cy1, r, 0, Math.PI * 2);
      ctx.moveTo(cx2 + r, cy2);
      ctx.arc(cx2, cy2, r, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(canvas2, 0, 0);
      ctx.restore();
      ctx.strokeStyle = "#000";
      ctx.fillStyle = "#880";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bzX1, bzY1);
      ctx.quadraticCurveTo(bzX3, bzY3, bzX2, bzY2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(bzX1, bzY1, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(bzX2, bzY2, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
    };

    watch(isNormal, (nv) => {
      ctx.putImageData(imageData, 0, 0);
      if (!nv) {
        worker.postMessage(ctx.getImageData(0, 0, cw, ch));
      }
    });
  };
  image.src = curvedRoudUrl;
}
</script>

<style scoped></style>
