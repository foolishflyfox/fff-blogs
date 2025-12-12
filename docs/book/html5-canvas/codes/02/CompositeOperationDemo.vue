<template>
  <div>
    <CanvasContainer
      :draw
      :width="cw"
      :height="Math.ceil(gco.length / colCnt) * demoSize"
      background-color="#fafafa"
    />
    <div>各合成类型含义：</div>
    <ul>
      <li v-for="i in gco.length">
        <span style="font-weight: bold">{{ gco[i - 1] }} :</span>
        {{ gcoText[i - 1] || "" }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

const gco = [
  "source-over",
  "source-in",
  "source-out",
  "source-atop",
  "destination-over",
  "destination-in",
  "destination-out",
  "destination-atop",
  "lighter",
  "copy",
  "xor",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];
const gcoText = [
  "这是默认设置，并在现有画布上下文之上绘制新图形。",
  "新图形只在新图形和目标画布重叠的地方绘制。其他的都是透明的。",
  "在不与现有画布内容重叠的地方绘制新图形。",
  "新图形只在与现有画布内容重叠的地方绘制。",
  "在现有的画布内容后面绘制新的图形。",
  "现有的画布内容保持在新图形和现有画布内容重叠的位置。其他的都是透明的。",
  "现有内容保持在新图形不重叠的地方。",
  "现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的。",
  "两个重叠图形的颜色是通过颜色值相加来确定的。",
  "只显示新图形。",
  "图像中，那些重叠和正常绘制之外的其他地方是透明的。",
  "将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。",
  "像素被倒转，相乘，再倒转，结果是一幅更明亮的图片。",
  "multiply 和 screen 的结合，原本暗的地方更暗，原本亮的地方更亮。",
  "保留两个图层中最暗的像素。",
  "保留两个图层中最亮的像素。",
  "将底层除以顶层的反置。",
  "将反置的底层除以顶层，然后将结果反过来。",
  "multiply 和 screen 的结合，类似于叠加，但上下图层互换了。",
  "用顶层减去底层或者相反来得到一个正值。",
  "一个柔和版本的 hard-light。纯黑或纯白不会导致纯黑或纯白。",
  "和 difference 相似，但对比度较低。",
  "保留了底层的亮度和色度，同时采用了顶层的色调。",
  "保留底层的亮度和色调，同时采用顶层的色度。",
  "保留了底层的亮度，同时采用了顶层的色调和色度。",
  "保持底层的色调和色度，同时采用顶层的亮度。",
];
const cw = 600;
const colCnt = 6;
const demoSize = cw / colCnt;
function draw(ctx: CanvasRenderingContext2D) {
  ctx.font = "12px Arial";
  ctx.textBaseline = "top";
  for (let i = 0; i < gco.length; i++) {
    const left = (i % colCnt) * demoSize;
    const top = Math.floor(i / colCnt) * demoSize;
    const offlineCanvas = document.createElement("canvas");
    const offlineCtx = offlineCanvas.getContext("2d")!;
    offlineCtx.fillStyle = "blue";
    offlineCtx.fillRect(5, 15, 50, 50);
    offlineCtx.globalCompositeOperation = gco[i] as any;
    offlineCtx.fillStyle = "red";
    offlineCtx.beginPath();
    offlineCtx.arc(55, 65, 30, 0, Math.PI * 2);
    offlineCtx.fill();
    ctx.save();
    ctx.translate(left, top);
    ctx.drawImage(offlineCanvas, 0, 0);
    ctx.fillText(gco[i], 2, 0);
    ctx.restore();
  }
}
</script>

<style scoped></style>
