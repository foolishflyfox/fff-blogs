<template>
  <div>
    <div style="margin-bottom: 5px">
      <button class="raw-style" @click="clickBtn">
        {{ running ? "暂停" : "开始" }}
      </button>
    </div>
    <CanvasContainer :draw="(v) => (ctx = v)" :width="cw" :height="ch" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import skyUrl from "../shared/images/sky.png?url";
import smalltreeUrl from "../shared/images/smalltree.png?url";
import treeTwoTrunksUrl from "../shared/images/tree-twotrunks.png?url";
import grassUrl from "../shared/images/grass.png?url";
import CanvasContainer from "../CanvasContainer.vue";

const running = ref(false);
let ctx: CanvasRenderingContext2D | undefined;
const skyVelocity = 20;
const smalltreeVelocity = 25;
const treeTwoTrunksVelocity = 30;
const grassVelocity = 35;
const cw = 600;
const ch = 270;
let skyTranslate = 0;
let smalltreeTranslate = 0;
let treeTwoTrunksTranslate = 0;
let grassTranslate = 0;

let lastDrawTime = 0;
let clickBtn = () => {};

onMounted(() => {
  const skyImage = new Image();
  skyImage.src = skyUrl;
  const grassImage = new Image();
  grassImage.src = grassUrl;

  const smalltreeImage = new Image();
  let smalltreeCanvas: HTMLCanvasElement = document.createElement(
    "canvas"
  ) as HTMLCanvasElement;
  smalltreeImage.onload = () => {
    smalltreeCanvas.width = smalltreeImage.width + 80;
    smalltreeCanvas.height = smalltreeImage.height;
    const smalltreeCtx = smalltreeCanvas.getContext("2d")!;
    const { width: imgWidth, height: imgHeight } = smalltreeImage;
    smalltreeCtx.drawImage(
      smalltreeImage,
      0,
      0,
      imgWidth * 0.9,
      imgHeight * 0.9
    );
  };
  smalltreeImage.src = smalltreeUrl;

  const treeTwoTrunksImage = new Image();
  let treeTwoTrunksCanvas: HTMLCanvasElement = document.createElement(
    "canvas"
  ) as HTMLCanvasElement;
  treeTwoTrunksImage.onload = () => {
    treeTwoTrunksCanvas.width = treeTwoTrunksImage.width + 120;
    treeTwoTrunksCanvas.height = treeTwoTrunksImage.height;
    const treeTwoTrunksCtx = treeTwoTrunksCanvas.getContext("2d")!;
    const { width: imgWidth, height: imgHeight } = treeTwoTrunksImage;
    treeTwoTrunksCtx.drawImage(
      treeTwoTrunksImage,
      0,
      0,
      imgWidth * 0.7,
      imgHeight * 0.7
    );
  };
  treeTwoTrunksImage.src = treeTwoTrunksUrl;

  function redraw() {
    if (!running.value) return;
    const now = Date.now();
    const deltaMs = now - lastDrawTime;
    // const fps = Math.round(1000 / deltaMs);
    const skyDeltaPixel = (deltaMs * skyVelocity) / 1000;
    skyTranslate += skyDeltaPixel;
    skyTranslate %= cw;
    const smalltreeDeltaPixel = (deltaMs * smalltreeVelocity) / 1000;
    smalltreeTranslate += smalltreeDeltaPixel;
    smalltreeTranslate %= smalltreeCanvas.width;
    const treetwoTrunksDeltaPixel = (deltaMs * treeTwoTrunksVelocity) / 1000;
    treeTwoTrunksTranslate += treetwoTrunksDeltaPixel;
    treeTwoTrunksTranslate %= treeTwoTrunksCanvas.width;
    const grassDeltaPixel = (deltaMs * grassVelocity) / 1000;
    grassTranslate += grassDeltaPixel;
    grassTranslate %= cw;
    if (ctx) {
      // 绘制天空
      ctx.save();
      ctx.translate(-skyTranslate, 0);
      ctx.drawImage(skyImage, 0, 0);
      ctx.drawImage(skyImage, cw - 1, 0);
      ctx.restore();
      // 绘制远处的树
      ctx.save();
      ctx.translate(-smalltreeTranslate, 90);
      ctx.fillStyle = ctx.createPattern(smalltreeCanvas, "repeat-x")!;
      ctx.fillRect(0, 0, 2 * cw, smalltreeCanvas.height);
      ctx.restore();
      // 绘制近处的树
      ctx.save();
      ctx.translate(-treeTwoTrunksTranslate, 90);
      ctx.fillStyle = ctx.createPattern(treeTwoTrunksCanvas, "repeat-x")!;
      ctx.fillRect(0, 0, 2 * cw, treeTwoTrunksCanvas.height);
      ctx.restore();
      // 绘制近处的草
      ctx.save();
      ctx.translate(-grassTranslate, 0);
      const grassHeight = grassImage.height * 1.8;
      ctx.drawImage(grassImage, 0, ch - grassHeight, cw, grassHeight);
      ctx.drawImage(grassImage, cw - 1, ch - grassHeight, cw, grassHeight);
      ctx.restore();
    }
    lastDrawTime = now;
    requestAnimationFrame(redraw);
  }

  function start() {
    lastDrawTime = Date.now();
    running.value = true;
    redraw();
  }

  function stop() {
    running.value = false;
    lastDrawTime = 0;
  }

  clickBtn = () => {
    if (running.value) {
      stop();
    } else {
      start();
    }
  };
  nextTick(clickBtn);
});
</script>

<style scoped></style>
