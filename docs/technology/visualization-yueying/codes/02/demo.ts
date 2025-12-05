import * as d3 from "d3-hierarchy";
import { cities } from "./cities";

export function drawCities(ctx: CanvasRenderingContext2D) {
  const regions = d3
    .hierarchy(cities) // 把原始数据转成D3 能理解的树形结构对象，
    .sum((d) => 1) // 计算各节点的 value 值
    .sort((a, b) => b.value! - a.value!); // 将整颗树按节点的 value 值从大到小排序
  const pack = d3.pack().size([1600, 1600]).padding(20);
  const root = pack(regions as any);
  const bgColors = ["#eee", "#0bf", "#0f5"];
  // 设置绘图时的描边
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.font = `bold 30px Arial`;
  ctx.textAlign = "center"; // 设置文本水平居中
  ctx.textBaseline = "middle"; // 设置文本垂直居中
  ctx.translate(50, 50);
  function drawNode(node: d3.HierarchyCircularNode<any>) {
    if (!node) return;
    ctx.beginPath();
    ctx.fillStyle = bgColors[node.depth];
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (node.children?.length) {
      for (const subNode of node.children) {
        drawNode(subNode);
      }
    } else {
      // 城市，绘制文本
      ctx.fillStyle = "#000";
      const cityName = node.data.name as string;
      ctx.fillText(cityName, node.x, node.y);
    }
  }
  drawNode(root);
}
