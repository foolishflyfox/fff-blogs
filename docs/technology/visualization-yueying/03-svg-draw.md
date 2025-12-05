<script setup>
import { SimpleCircleSvg, CitiesTopoSvg, CitiesTopoSvgDynamic } from './codes/03'
</script>

# 03. 声明式图形系统 - SVG 绘图

SVG 的全称是 Scalable Vector Graphics，可缩放矢量图，它是浏览器支持的一种基于 XML 语法的图像格式。

对于前端工程师而言，使用 SVG 的门槛很低。因为描述 SVG 的 XML 语言本身和 HTML 非常接近，都是标签 + 属性构成的，而且浏览器的 CSS、JavaScript 都能够正常作用于 SVG 元素。这让我们在操作 SVG 时，没有特别大的难度，甚至可以认为，SVG 就是 HTML 的增强版。

对于可视化来说，SVG 是非常重要的图形系统。它既可以用 JavaScript 操作绘制各种几何图形，还可以作为浏览器支持的一种图片格式，来独立使用 img 标签加载或通过 Canvas 绘制。

即使我们选择使用 HTML 和 CSS、Canvas2D 或 WebGL 的方式实现可视化，但我们依然可以且很有可能使用 SVG 图像。

## 利用 SVG 绘制几何图形

SVG 属于声明式绘图系统，它的绘制方式和 Canvas 不同，它不需要 JS 操作绘图指令，只需要和 HTML 一样声明一些标签即可实现绘图了。

下面是 SVG 声明的例子：

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="orange" />
</svg>
```

上面的代码中，`svg` 元素是 SVG 的根元素，属性 xmlns 是 xml 的名字空间。第一行代码表示，`svg` 元素的 xmlns 属性值是 http://www.w3.org/2000/svg ，浏览器根据该属性就能够识别出这是一段 SVG 的内容了。

`svg` 元素下的 `circle` 元素表示这是一个绘制在 SVG 图像中的圆形，属性 `cx` 和 `cy` 是坐标，表示圆心的位置在图像的 x=100、y=50 位置。属性 `r` 表示圆的半径，`r=40` 表示半径为 40。

SVG 坐标系和 Canvas 坐标系完全一样，都是以图像左上角为原点，x 轴向右、y 轴向下的左手坐标系。默认情况下，SVG 坐标与浏览器像素对应，所以 `cx`、`cy`、`r` 值的单位就是 px，也就是像素，不需要特别设置。

我们可以通过 svg 元素设置 `viewBox` 属性，来改变 SVG 的坐标系。如果设置了 `viewBox` 属性，那 SVG 内部的绘制就都是相对于 SVG 坐标系的了。

下面就是上述 SVG 的显示了：

<SimpleCircleSvg />

## 利用 SVG 绘制层次关系图

下面我们使用 SVG 的方式绘制第二节中用 Canvas 绘制的城市关系图。

首先，我们需要获取 SVG 对象。

```js
const svgroot = document.querySelector("svg");
```

然后通过创建 SVG 元素，并将元素添加到 DOM 文档中，让图形显示出来，具体代码如下：

```ts
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
  circle.setAttribute("stroke-width", "1");
  svgroot.append(circle);
  if (node.children?.length) {
    // 绘制子节点
    for (const subNode of node.children) {
      drawNode(subNode);
    }
  } else {
    // 绘制文本
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
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
```

我们使用 `document.createElementNS` 方法来创建 SVG 元素，这与创建普通的 HTML 元素的方法 `document.createElement` 不同。其中第一个参数是名字空间，第二个参数是要创建的元素标签名，因为要绘制的是圆形，所以我们创建了 `circle` 元素。设置属性后，将 circle 添加到 svgroot 中。

之后递归创建子节点，并添加文本元素。

显示效果如下：

<CitiesTopoSvg />

## SVG 和 Canvas 的不同点

### 写法上的不同

SVG 是以创建图形元素绘图的“声明式”绘图系统，Canvas 是执行绘图指令的“指令式”绘图系统。

SVG 的渲染性能相对比较低。

### 用户交互实现上的不同

因为 SVG 的一个图形对应一个元素，所以很容易给 SVG 图形元素添加对应的鼠标事件。但 Canvas 不容易做到。

下面是使用 svg 添加鼠标监听事件的一个例子：

```ts
// 实现交互功能
const curTargetText = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "text"
);
curTargetText.setAttribute("fill", "orange");
curTargetText.setAttribute("font-family", "Arial");
curTargetText.setAttribute("font-size", "36px");
curTargetText.setAttribute("text-anchor", "start");
curTargetText.setAttribute("x", "0");
curTargetText.setAttribute("y", "30");
curTargetText.textContent = "";
svgroot.appendChild(curTargetText);
let preCircle: SVGCircleElement | undefined;
let preCircleOriginColor: string | null = null;
svgroot.addEventListener("mousemove", (evt) => {
  let target = evt.target as HTMLElement;
  if (target.nodeName === "text") {
    const targetText = target as unknown as SVGTextElement;
    curTargetText.textContent = targetText.textContent;
  } else if (target.nodeName === "circle") {
    const targetCircle = target as unknown as SVGCircleElement;
    if (targetCircle === preCircle) {
      // 圆形节点没变，直接返回
      return;
    }
    curTargetText.textContent = "";
    if (preCircleOriginColor) {
      preCircle?.setAttribute("fill", preCircleOriginColor);
    }
    preCircleOriginColor = targetCircle.getAttribute("fill");
    preCircle = targetCircle;
    targetCircle.setAttribute("fill", "orange");
  } else if (target.nodeName === "svg") {
    if (preCircleOriginColor) {
      preCircle?.setAttribute("fill", preCircleOriginColor);
      preCircle = undefined;
      preCircleOriginColor = null;
    }
  }
});
```

通过 `svgroot.addEventListener` 添加了对 SVG 元素的鼠标事件监听。

你可以将鼠标移动到层级图上验证一下效果：

<CitiesTopoSvgDynamic />
