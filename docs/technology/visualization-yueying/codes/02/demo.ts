import * as d3 from "d3-hierarchy";

const cities = {
  name: "中国",
  children: [
    {
      name: "浙江",
      children: [
        { name: "杭州" },
        { name: "宁波" },
        { name: "温州" },
        { name: "绍兴" },
      ],
    },
    {
      name: "广西",
      children: [
        { name: "南宁" },
        { name: "桂林" },
        { name: "柳州" },
        { name: "防城港" },
      ],
    },
    {
      name: "甘肃",
      children: [
        { name: "兰州" },
        { name: "金昌" },
        { name: "天水" },
        { name: "武威" },
        { name: "酒泉" },
        { name: "嘉峪关" },
      ],
    },
    {
      name: "河北",
      children: [
        { name: "石家庄" },
        { name: "唐山" },
        { name: "秦皇岛" },
        { name: "邯郸" },
      ],
    },
    {
      name: "黑龙江",
      children: [
        { name: "哈尔滨" },
        { name: "齐齐哈尔" },
        { name: "大庆" },
        { name: "牡丹江" },
      ],
    },
    {
      name: "江苏",
      children: [
        { name: "南京" },
        { name: "无锡" },
        { name: "徐州" },
        { name: "常州" },
        { name: "连云港" },
        { name: "淮安" },
      ],
    },
    {
      name: "湖南",
      children: [
        { name: "长沙" },
        { name: "株洲" },
        { name: "衡阳" },
        { name: "岳阳" },
        { name: "邵阳" },
      ],
    },
    {
      name: "海南",
      children: [{ name: "海口" }, { name: "三亚" }, { name: "三沙" }],
    },
    {
      name: "西藏",
      children: [{ name: "拉萨" }, { name: "昌都" }, { name: "林芝" }],
    },
    {
      name: "陕西",
      children: [
        { name: "西安" },
        { name: "咸阳" },
        { name: "延安" },
        { name: "安康" },
        { name: "汉中" },
        { name: "榆林" },
      ],
    },
  ],
};

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
