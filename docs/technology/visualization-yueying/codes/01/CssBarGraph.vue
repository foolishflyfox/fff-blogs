<template>
  <div>
    <div class="bargraph">
      <div v-for="i of 5" :key="i" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
div:has(.bargraph) {
  display: flex;
  justify-content: center;
}
/**
  dateset = {
    current: [15, 11, 17, 25, 37],
    total: [25, 26, 40, 45, 68]
  }
 */
.bargraph {
  display: grid;
  width: 300px;
  height: 450px;
  padding: 10px;
  grid-template-columns: repeat(5, 20%);
}
.bargraph div {
  margin: 0 2px;
}
.bargraph div:nth-child(1) {
  background: linear-gradient(
    to bottom,
    transparent 75%,
    #37c 0,
    #37c 85%,
    #3c7 0
  );
}
.bargraph div:nth-child(2) {
  background: linear-gradient(
    to bottom,
    transparent 74%,
    #37c 0,
    #37c 89%,
    #3c7 0
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
