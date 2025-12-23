<template>
  <div style="background-color: #eeec; padding: 5px">
    <button @click="start" class="raw-style">开始计算</button>
    <div>
      <div>更新次数: {{ testCount }}</div>
      <div>时间跨度: {{ endTimestamp - startTimestamp }}</div>
      <div>
        帧率: {{ (testCount * 1000) / (endTimestamp - startTimestamp) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const allCount = 500;
let startTimestamp = ref(0);
let endTimestamp = ref(0);
const testCount = ref(0);

function start() {
  startTimestamp.value = Date.now();
  endTimestamp.value = startTimestamp.value;
  testCount.value = 0;
  requestAnimationFrame(update);
}

function update(t: number) {
  endTimestamp.value = Date.now();
  testCount.value++;
  if (testCount.value >= allCount) return;
  requestAnimationFrame(update);
}
</script>

<style scoped></style>
