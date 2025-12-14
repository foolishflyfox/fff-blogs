<template>
  <div>
    <div style="margin-bottom: 5px">
      <span>字体:</span>
      <select class="standard mr-1em" v-model="fontFamily">
        <option :value="v" v-for="v of fontFamilies">{{ v }}</option>
      </select>
      <span>大小:</span>
      <select class="standard mr-1em" v-model="fontSize">
        <option :value="v" v-for="v in [32, 48, 64, 128]">
          {{ `${v} px` }}
        </option>
      </select>
      <br />
      <span>描边色:</span>
      <select class="standard mr-1em" v-model="strokeColor">
        <option v-for="v in strokeColors" :value="v">{{ v }}</option>
      </select>
      <span>填充色</span>
      <select class="standard mr-1em" v-model="fillColor">
        <option value="rgba(255,0,0,0.5)">semi-transparent red</option>
        <option value="green">green</option>
        <option value="rgba(0,0,255,0.5)">semi-transparent blue</option>
        <option value="orange">orange</option>
        <option value="rgba(100,140,230,0.5)">
          semi-transparent cornflowerblue
        </option>
        <option value="rgba(218,165,32,0.5)">semi-transparent goldenrod</option>
        <option value="navy">navy</option>
        <option value="purple">purple</option>
      </select>
      <span>填充:</span>
      <input type="checkbox" v-model="fill" />
    </div>
    <CanvasContainer
      :draw
      :width="650"
      :height="500"
      background-color="#fafafa"
      style="cursor: text"
    />
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watchEffect } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import { drawTextBackground } from "./utils";

const fontFamilies = [
  "Arial",
  "Comic Sans",
  "Lucida Sans",
  "Helvetica",
  "Palatino",
];
const strokeColors = [
  "red",
  "green",
  "blue",
  "orange",
  "cornflowerblue",
  "goldenrod",
  "navy",
  "purple",
];
const fontFamily = ref("Comic Sans");
const fontSize = ref(48);
const strokeColor = ref("red");
const fillColor = ref("rgba(218,165,32,0.5)");
const fill = ref(true);
let timerId = 0;

let needRedraw = true;
let textCursorToggle = true;

class TextContent {
  private chars: string[] = [];
  font: string;
  fillColor: string;
  strokeColor: string;
  fill: boolean;
  private x: number;
  private y: number;
  private ctx: CanvasRenderingContext2D;
  fontSize: number;
  // 是否正在编辑
  editing: boolean;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize.value;
    this.font = `${fontSize.value}px ${fontFamily.value}`;
    this.fillColor = fillColor.value;
    this.strokeColor = strokeColor.value;
    this.fill = fill.value;
    this.editing = true;
  }

  addChar(c: string) {
    this.chars.push(c);
  }

  delChar() {
    this.chars.pop();
  }

  draw() {
    this.ctx.save();
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.fillStyle = this.fillColor;
    this.ctx.font = this.font;
    this.ctx.textAlign = "start";
    this.ctx.textBaseline = "middle";
    let cursorX = this.x;
    if (this.chars.length) {
      const content = this.chars.join("");
      this.ctx.strokeText(content, this.x, this.y);
      if (this.fill) {
        this.ctx.fillText(content, this.x, this.y);
      }
      cursorX = this.x + this.ctx.measureText(content).width + 10;
    }
    if (this.editing && textCursorToggle) {
      this.ctx.strokeStyle = "#333";
      this.ctx.beginPath();
      this.ctx.moveTo(cursorX, this.y - this.fontSize / 2);
      this.ctx.lineTo(cursorX, this.y + this.fontSize / 2);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }
}

const textContents: TextContent[] = [];

function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;

  canvas.onmousedown = (e: MouseEvent) => {
    // 计算坐标位置
    const bcr = canvas.getBoundingClientRect();
    const x = e.clientX - bcr.left;
    const y = e.clientY - bcr.top;
    if (textContents.length) {
      textContents[textContents.length - 1].editing = false;
    }
    textContents.push(new TextContent(ctx, x, y));
    textCursorToggle = true;
    needRedraw = true;
  };
  document.onkeydown = (e: KeyboardEvent) => {
    if (textContents.length && textContents[textContents.length - 1].editing) {
      if (e.key.length === 1) {
        textContents[textContents.length - 1].addChar(e.key);
        needRedraw = true;
      } else if (e.key === "Backspace") {
        textContents[textContents.length - 1].delChar();
        needRedraw = true;
      }
    }
  };
  function redraw() {
    if (needRedraw) {
      needRedraw = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawTextBackground(ctx);
      ctx.save();
      for (const textContent of textContents) {
        textContent.draw();
      }
      ctx.restore();
    }
    requestAnimationFrame(redraw);
  }
  requestAnimationFrame(redraw);
  // 实现光标闪烁效果
  timerId = window.setInterval(() => {
    textCursorToggle = !textCursorToggle;
    needRedraw = true;
  }, 1000);
}

watchEffect(() => {
  const textConfig = {
    fontSize: fontSize.value,
    font: `${fontSize.value}px ${fontFamily.value}`,
    strokeColor: strokeColor.value,
    fillColor: fillColor.value,
    fill: fill.value,
  };
  const lastTextContent = textContents[textContents.length - 1];

  if (lastTextContent?.editing) {
    lastTextContent.fontSize = textConfig.fontSize;
    lastTextContent.font = textConfig.font;
    lastTextContent.strokeColor = textConfig.strokeColor;
    lastTextContent.fillColor = textConfig.fillColor;
    lastTextContent.fill = textConfig.fill;
    needRedraw = true;
  }
});

onUnmounted(() => {
  if (timerId) {
    window.clearInterval(timerId);
  }
});
</script>

<style scoped></style>
