<template>
  <div>
    <div class="justify-x-center">
      <!-- 在网页上显示大小为 300px 宽，450px 高 -->
      <!-- 视口(内部坐标系)：宽 60 单位，高 100 单位 -->
      <svg width="300px" height="450px" viewBox="0 0 60 100">
        <!-- 将原点从左上角移到左下角，并翻转 Y 轴 -->
        <!-- 创建了标准的数学坐标系：原点在左下角，Y 轴向上 -->
        <g transform="translate(0, 100) scale(1, -1)">
          <!-- 第一组 -->
          <g>
            <!-- x, y 为柱形左下角坐标，width 为柱形宽度，height 为柱形高度，fill 表示蓝色填充 -->
            <rect x="1" y="0" width="10" height="25" fill="#37c" />
            <rect x="13" y="0" width="10" height="26" fill="#37c" />
            <rect x="25" y="0" width="10" height="40" fill="#37c" />
            <rect x="37" y="0" width="10" height="45" fill="#37c" />
            <rect x="49" y="0" width="10" height="68" fill="#37c" />
          </g>
          <g>
            <rect x="1" y="0" width="10" height="15" fill="#3c7" />
            <rect x="13" y="0" width="10" height="11" fill="#3c7" />
            <rect x="25" y="0" width="10" height="17" fill="#3c7" />
            <rect x="37" y="0" width="10" height="25" fill="#3c7" />
            <rect x="49" y="0" width="10" height="37" fill="#3c7" />
          </g>
        </g>
      </svg>
    </div>
    <div class="graph-desc">
      <div>用 svg 绘制的柱状图</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
