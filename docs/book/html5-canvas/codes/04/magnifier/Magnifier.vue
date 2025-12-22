<template>
  <div>
    <div>
      <AdjustSlider v-model:rate="scaleRate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AdjustSlider from "./AdjustSlider.vue";
const scaleRate = ref(0.3);
</script>

<style scoped></style>
