<template>
  <div style="background-color: #eee; padding: 5px">
    <div style="margin-bottom: 1em" v-if="startEnable">
      <button class="raw-style" @click="start">开始测试 For 循环</button>
    </div>
    <div>
      <div>
        <div>
          通过属性遍历二维数组：
          <TestInfoPanel v-bind="propertyAccesses2dInfo" :all-test-count />
        </div>
        <HighLighterPre :code="propertyAccesses2d" />
      </div>
      <div>
        <div>
          通过属性遍历一维数组：
          <TestInfoPanel v-bind="propertyAccesses1dInfo" :all-test-count />
        </div>
        <HighLighterPre :code="propertyAccesses1d" />
      </div>
      <div>
        <div>
          通过局部变量遍历二维数组：
          <TestInfoPanel v-bind="localVariables2dInfo" :all-test-count />
        </div>
        <HighLighterPre :code="localVariables2d" />
      </div>
      <div>
        <div>
          通过局部变量遍历一维数组：
          <TestInfoPanel v-bind="localVariables1dInfo" :all-test-count />
        </div>
        <HighLighterPre :code="localVariables1d" />
      </div>
      <div>
        <div>
          通过局部变量遍历一维数组（hack-1）：
          <TestInfoPanel v-bind="localVariables1dHackOneInfo" :all-test-count />
        </div>
        <HighLighterPre :code="localVariables1dHackOne" />
      </div>
      <div>
        <div>
          通过局部变量遍历一维数组（hack-2）：
          <TestInfoPanel v-bind="localVariables1dHackTwoInfo" :all-test-count />
        </div>
        <HighLighterPre :code="localVariables1dHackTwo" />
      </div>
      <div>
        <div>
          通过局部变量遍历一维数组（hack-3）：
          <TestInfoPanel
            v-bind="localVariables1dHackThreeInfo"
            :all-test-count
          />
        </div>
        <HighLighterPre :code="localVariables1dHackThree" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HighLighterPre } from "@docs/components";
import { Ref, ref } from "vue";
import logCrossingUrl from "../shared/images/log-crossing.png?url";
import { TestInfo } from "@docs/utils";
import TestInfoPanel from "./TestInfoPanel.vue";

const startEnable = ref(true);

const image = new Image();
let imageData: ImageData;
image.onload = () => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(image, 0, 0);
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
};
image.src = logCrossingUrl;

const allTestCount = 100;

async function start() {
  startEnable.value = false;
  await testFrame(propertyAccesses2dTest, propertyAccesses2dInfo);
  await testFrame(propertyAccesses1dTest, propertyAccesses1dInfo);
  await testFrame(localVariables2dTest, localVariables2dInfo);
  await testFrame(localVariables1dTest, localVariables1dInfo);
  await testFrame(localVariables1dHackOneTest, localVariables1dHackOneInfo);
  await testFrame(localVariables1dHackTwoTest, localVariables1dHackTwoInfo);
  await testFrame(localVariables1dHackThreeTest, localVariables1dHackThreeInfo);
}

async function testFrame(func: () => void, info: Ref<TestInfo>) {
  for (; info.value.testedCount < allTestCount; info.value.testedCount++) {
    const t0 = Date.now();
    func();
    const t1 = Date.now();
    info.value.sumMs += t1 - t0;
    await new Promise((r) => setTimeout(r, 0));
  }
}

const defaultTestInfo: TestInfo = {
  sumMs: 0,
  testedCount: 0,
};

const propertyAccesses2dInfo = ref({ ...defaultTestInfo });
const propertyAccesses2d = `for (let y = 0; y < imageData.height; y++) {
  for (let x = 0; x < imageData.width; x++) {
    const off = (y * imageData.width + x) * 4;
    imageData.data[off] += 10;
    imageData.data[off + 1] += 20;
    imageData.data[off + 2] += 30;
    imageData.data[off + 3] += 40;
  }
}`;
function propertyAccesses2dTest() {
  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const off = (y * imageData.width + x) * 4;
      imageData.data[off] += 10;
      imageData.data[off + 1] += 20;
      imageData.data[off + 2] += 30;
      imageData.data[off + 3] += 40;
    }
  }
}

const propertyAccesses1dInfo = ref({ ...defaultTestInfo });
const propertyAccesses1d = `for (let i = 0; i < imageData.data.length; i += 4) {
  imageData.data[i] += 10;
  imageData.data[i + 1] += 20;
  imageData.data[i + 2] += 30;
  imageData.data[i + 3] += 40;
}`;
function propertyAccesses1dTest() {
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] += 10;
    imageData.data[i + 1] += 20;
    imageData.data[i + 2] += 30;
    imageData.data[i + 3] += 40;
  }
}

const localVariables2dInfo = ref({ ...defaultTestInfo });
const localVariables2d = `const { width, height, data } = imageData;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const off = (y * width + x) * 4;
    data[off] += 10;
    data[off + 1] += 20;
    data[off + 2] += 30;
    data[off + 3] += 40;
  }
}`;
function localVariables2dTest() {
  const { width, height, data } = imageData;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const off = (y * width + x) * 4;
      data[off] += 10;
      data[off + 1] += 20;
      data[off + 2] += 30;
      data[off + 3] += 40;
    }
  }
}

const localVariables1dInfo = ref({ ...defaultTestInfo });
const localVariables1d = `const data = imageData.data;
const length = data.length;
for (let i = 0; i < length; i += 4) {
  data[i] += 10;
  data[i + 1] += 20;
  data[i + 2] += 30;
  data[i + 3] += 40;
}`;
function localVariables1dTest() {
  const data = imageData.data;
  const length = data.length;
  for (let i = 0; i < length; i += 4) {
    data[i] += 10;
    data[i + 1] += 20;
    data[i + 2] += 30;
    data[i + 3] += 40;
  }
}

const localVariables1dHackOneInfo = ref({ ...defaultTestInfo });
const localVariables1dHackOne = `const data = imageData.data;
const length = data.length;
for (let i = -1; i < length; ) {
  data[++i] += 10;
  data[++i] += 20;
  data[++i] += 30;
  data[++i] += 40;
}`;
function localVariables1dHackOneTest() {
  const data = imageData.data;
  const length = data.length;
  for (let i = -1; i < length; ) {
    data[++i] += 10;
    data[++i] += 20;
    data[++i] += 30;
    data[++i] += 40;
  }
}

const localVariables1dHackTwoInfo = ref({ ...defaultTestInfo });
const localVariables1dHackTwo = `const data = imageData.data;
const length = data.length;
let i = -1;
while (i < length) {
  data[++i] += 10;
  data[++i] += 20;
  data[++i] += 30;
  data[++i] += 40;
}`;
function localVariables1dHackTwoTest() {
  const data = imageData.data;
  const length = data.length;
  let i = -1;
  while (i < length) {
    data[++i] += 10;
    data[++i] += 20;
    data[++i] += 30;
    data[++i] += 40;
  }
}

const localVariables1dHackThreeInfo = ref({ ...defaultTestInfo });
const localVariables1dHackThree = `const data = imageData.data;
let i = data.length;
while (i >=0) {
  data[--i] += 40;
  data[--i] += 30;
  data[--i] += 20;
  data[--i] += 10;
}`;
function localVariables1dHackThreeTest() {
  const data = imageData.data;
  let i = data.length;
  while (i >= 0) {
    data[--i] += 40;
    data[--i] += 30;
    data[--i] += 20;
    data[--i] += 10;
  }
}
</script>

<style scoped></style>
