<template>
  <div class="svg-container">
    <svg id="cities-topo-svg" xmlns="http://www.w3.org/2000/svg"></svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as d3 from "d3-hierarchy";
import { cities } from "../02/cities";

onMounted(() => {
  const svgroot = document.getElementById(
    "cities-topo-svg"
  ) as unknown as SVGSVGElement;
  const regions = d3
    .hierarchy(cities) // 把原始数据转成D3 能理解的树形结构对象，
    .sum((d) => 1) // 计算各节点的 value 值
    .sort((a, b) => b.value! - a.value!); // 将整颗树按节点的 value 值从大到小排序
  const pack = d3
    .pack()
    .size([svgroot.clientWidth, svgroot.clientHeight])
    .padding(10);
  const root = pack(regions as any);

  const bgColors = ["#eee", "#0bf", "#0f5"];
  function drawNode(node: d3.HierarchyCircularNode<any>) {
    if (!node) return;
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", String(node.x));
    circle.setAttribute("cy", String(node.y));
    circle.setAttribute("r", String(node.r));
    circle.setAttribute("fill", bgColors[node.depth]);
    circle.setAttribute("stroke", "black");
    circle.setAttribute("strokeWidth", "1");
    svgroot.append(circle);
    if (node.children?.length) {
      // 绘制子节点
      for (const subNode of node.children) {
        drawNode(subNode);
      }
    } else {
      // 绘制文本
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("fill", "black");
      text.setAttribute("font-family", "Arial");
      text.setAttribute("font-size", "12px");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("x", String(node.x));
      text.setAttribute("y", String(node.y));
      text.textContent = node.data.name;
      svgroot.appendChild(text);
    }
  }
  drawNode(root);
});
</script>

<style scoped>
#cities-topo-svg {
  width: 100%;
  aspect-ratio: 1 / 1;
}
</style>
