<template>
  <CanvasContainer :draw :width="600" :height="400" background-color="#eee8" />
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";
import { Cell, Sprite, SpriteSheetPainter } from "./sprite";
import runningSpriteSheetUrl from "../shared/images/running-sprite-sheet.png?url";

function draw(ctx: CanvasRenderingContext2D) {
  const image = new Image();
  image.src = runningSpriteSheetUrl;
  const { width: cw, height: ch } = ctx.canvas;
  const runnerCells: Cell[] = [
    { x: 0, y: 0, w: 47, h: 64 },
    { x: 55, y: 0, w: 44, h: 64 },
    { x: 107, y: 0, w: 39, h: 64 },
    { x: 152, y: 0, w: 44, h: 64 },
    { x: 208, y: 0, w: 49, h: 64 },
    { x: 265, y: 0, w: 46, h: 64 },
    { x: 320, y: 0, w: 42, h: 64 },
    { x: 380, y: 0, w: 35, h: 64 },
    { x: 425, y: 0, w: 35, h: 64 },
  ];
  const spriteSheetPainter = new SpriteSheetPainter(image, runnerCells);
  let lastTime = 0;
  const sprite = new Sprite("running", spriteSheetPainter, [
    {
      execute(s, ctx, timer) {
        const now = Date.now();
        if (lastTime) {
          const deltaTime = now - lastTime;
          s.left -= (deltaTime * 3) / 100;
          if (s.left < 0) {
            s.left = cw - sprite.width;
          }
        }
        lastTime = now;
      },
    },
  ]);
  sprite.top = (ch - 60) / 2;
  sprite.left = cw / 2;
  sprite.width = 50;
  sprite.height = 80;
  function redraw() {
    if (image.complete) {
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(image, 0, 0);
      spriteSheetPainter.advance();
      sprite.update(ctx, Date.now());
      sprite.paint(ctx);
    }
    setTimeout(redraw, 125);
  }
  redraw();
}
</script>

<style scoped></style>
