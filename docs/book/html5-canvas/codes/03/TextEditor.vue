<template>
  <div>
    <div style="font-weight: bold; color: red">todo: 待完成</div>
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
import { ref } from "vue";
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
const strokeColor = ref("navy");
const fillColor = ref("rgba(218,165,32,0.5)");
const fill = ref(true);

function draw(ctx: CanvasRenderingContext2D) {
  const canvas = ctx.canvas;
  drawTextBackground(ctx);
  //   document.onkeydown()
}
</script>

<style scoped></style>
