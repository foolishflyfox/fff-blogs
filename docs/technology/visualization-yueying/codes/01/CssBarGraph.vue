<template>
  <div>
    <div class="justify-x-center">
      <div class="bargraph">
        <div v-for="i of 5" :key="i" />
      </div>
    </div>
    <div class="graph-desc">
      <div>用 HTML+CSS 绘制的柱状图</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/**
  dateset = {
    current: [15, 11, 17, 25, 37],
    total: [25, 26, 40, 45, 68]
  }
 */
.bargraph {
  display: grid; /* 使用 Grid 布局 */
  width: 300px; /* 图表总宽度 */
  height: 450px; /* 图表总高度 */
  padding: 10px; /* 内边距 */
  grid-template-columns: repeat(5, 20%); /* 5各等宽列，每列占 20% */
}
.bargraph div {
  /* 每个柱子左右 2px 外边距，形成间隔 */
  margin: 0 2px;
}
.bargraph div:nth-child(1) {
  background: linear-gradient(
    /* 从上到下的渐变方向 */ to bottom,
    /* 从顶部到 75% 的位置是透明 */ transparent 75%,
    /* 从 75% 处开始变为蓝色 (#37c) */ #37c 0,
    /* 蓝色持续到 85% 的位置 */ #37c 85%,
    /* 从 85% 处开始变为绿色(#3c7)到底部 */ #3c7 0
  );
}
.bargraph div:nth-child(2) {
  /** 标准写法 */
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 74%,
    #37c 74%,
    #37c 89%,
    #3c7 89%,
    #3c7 100%
  );
}
.bargraph div:nth-child(3) {
  background: linear-gradient(
    to bottom,
    transparent 60%,
    #37c 0,
    #37c 83%,
    #3c7 0
  );
}
.bargraph div:nth-child(4) {
  background: linear-gradient(
    to bottom,
    transparent 55%,
    #37c 0,
    #37c 75%,
    #3c7 0
  );
}
.bargraph div:nth-child(5) {
  background: linear-gradient(
    to bottom,
    transparent 32%,
    #37c 0,
    #37c 63%,
    #3c7 0
  );
}
</style>
