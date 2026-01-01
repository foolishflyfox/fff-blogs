<template>
  <div>
    <div>参数：</div>
    <div class="flex-y-center">
      <div>x: 椭圆圆心的x轴坐标</div>
      <input type="range" :min="100" :max="cw - 100" v-model="x" />
    </div>
    <div class="flex-y-center">
      <div>y: 椭圆圆心的y轴坐标</div>
      <input type="range" :min="100" :max="ch - 100" v-model="y" />
      <div>{{ y }}</div>
    </div>
    <div class="flex-y-center">
      <div>radiusX: 椭圆长轴半径</div>
      <input type="range" :min="10" :max="cw / 2" v-model="radiusX" />
      <div>{{ radiusX }}</div>
    </div>
    <div class="flex-y-center">
      <div>radiusY: 椭圆长轴半径</div>
      <input type="range" :min="10" :max="ch / 2" v-model="radiusY" />
      <div>{{ radiusY }}</div>
    </div>
    <div class="flex-y-center">
      <div>rotation: 椭圆旋转角度</div>
      <input
        type="range"
        :min="0"
        :max="Math.PI * 2"
        :step="0.01"
        v-model="rotation"
      />
      <div>{{ rotation }}</div>
    </div>
    <div class="flex-y-center">
      <div>startAngle: 椭圆起始偏心角</div>
      <input
        type="range"
        :min="0"
        :max="Math.PI * 2"
        :step="0.01"
        v-model="startAngle"
      />
      <div>{{ startAngle }}</div>
    </div>
    <div class="flex-y-center">
      <div>endAngle: 椭圆结束偏心角</div>
      <input
        type="range"
        :min="0"
        :max="Math.PI * 2"
        :step="0.01"
        v-model="endAngle"
      />
      <div>{{ endAngle }}</div>
    </div>
    <div class="flex-y-center">
      <div>counterclockwise: 逆时针绘制</div>
      <input type="checkbox" v-model="counterclockwise" />
    </div>
    <div class="font-bold">
      代码:
      <code
        >ctx.ellipse({{ x }}, {{ y }}, {{ radiusX }}, {{ radiusY }},
        {{ rotation }}, {{ startAngle }}, {{ endAngle }},
        {{ counterclockwise }})</code
      >
    </div>
    <CanvasContainer :draw :width="cw" :height="ch" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
const cw = 600;
const ch = 400;
const x = ref(cw / 2);
const y = ref(ch / 2);
const radiusX = ref(150);
const radiusY = ref(80);
const rotation = ref(0);
const startAngle = ref(0);
const endAngle = ref(Math.PI * 2);
const counterclockwise = ref(false);

function draw(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "red";
  watchEffect(() => {
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#0bf";
    ctx.beginPath();
    ctx.ellipse(
      x.value,
      y.value,
      radiusX.value,
      radiusY.value,
      rotation.value,
      startAngle.value,
      endAngle.value,
      counterclockwise.value
    );
    ctx.fill();
  });
}
</script>

<style scoped></style>
