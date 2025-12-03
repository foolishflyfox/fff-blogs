<template>
  <div>
    <div class="justify-x-center">
      <div class="piegraph" />
    </div>
    <div class="graph-desc">
      <div>使用椭圆渐变绘制的饼图</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.piegraph {
  display: inline-block;
  width: 250px;
  height: 250px;
  border-radius: 50%; /* 使其成为圆形 */
  background-image: conic-gradient(
    #37c 30deg,
    #3c7 30deg,
    #3c7 65deg,
    orange 65deg,
    orange 110deg,
    #f73 110deg,
    #f73 200deg,
    #ccc 200deg
  );
}
</style>
