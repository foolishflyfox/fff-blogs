<template>
  <div>
    <span>执行次数: </span>
    <span> {{ testedCount }} / {{ allTestCount }} </span>
    &nbsp; &nbsp;
    <span>总运行时间: </span>
    <span> {{ sumMs }} ms </span>
    &nbsp; &nbsp;
    <span>平均运行时间: </span>
    <span>
      {{ (sumMs / (testedCount || 1)).toFixed(avgTimePrecision) }} ms
    </span>
  </div>
</template>

<script setup lang="ts">
import { TestInfo } from "@docs/utils";

interface FullTestInfo extends TestInfo {
  allTestCount: number;
  avgTimePrecision?: number; //
}

withDefaults(defineProps<FullTestInfo>(), {
  avgTimePrecision: 3,
});
</script>

<style scoped></style>
