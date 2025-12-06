import DefaultTheme from "vitepress/theme";
import "./custom.css";
// @ts-ignore
import { Markmap } from "markmap-view";

import { onContentUpdated, Theme } from "vitepress";

// 思维导图支持步骤三: 渲染函数定义
function renderMindmap() {
  const mindmaps = document.querySelectorAll(".markmap-svg");
  for (const mindmap of mindmaps) {
    const dataJson = mindmap.getAttribute("data-json");
    mindmap.removeAttribute("data-json");
    if (mindmap instanceof SVGElement && dataJson) {
      if (mindmap.children.length > 0) continue;
      mindmap.style.width = "100%";
      mindmap.style.maxWidth = "100vw";
      const mp = Markmap.create(
        mindmap,
        {
          autoFit: true,
          pan: false,
          zoom: false,
        },
        JSON.parse(dataJson)
      );
      let hasAdjusted = false;
      const adjustPage = () => {
        if (hasAdjusted) return;
        const width = mp.state.rect.x2 - mp.state.rect.x1; // SVG 的实际宽度
        const height = mp.state.rect.y2 - mp.state.rect.y1; // SVG 的实际高度
        if (!width || !height) return;
        hasAdjusted = true;
        const aspectRatio = height / width; // 高宽比
        // 定义一个子方法用于重新设置 mindmap 的高度
        function setMindmapHeight(mindmap: SVGElement, aspectRatio: number) {
          const realHeight = mindmap.clientWidth * aspectRatio + 30;
          mindmap.style.height = `${realHeight}px`;
          mp.fit();
        }
        // 注册 window 的窗口大小变动事件
        window.addEventListener("resize", () => {
          setMindmapHeight(mindmap, aspectRatio);
        });
        // 初始设置时调用子方法
        setMindmapHeight(mindmap, aspectRatio);
      };
      // 重新设置 SVG 的高度
      setTimeout(adjustPage, 100);
      // 解决通过 `cmd + 超链接` 打开思维导图，错过了初始化时机，导致思维导图过小的问题
      document.addEventListener("visibilitychange", () => {
        setTimeout(adjustPage, 100);
      });
    }
  }
}

export default {
  extends: DefaultTheme,
  setup() {
    onContentUpdated(() => {
      // 思维导图支持步骤四: 使用渲染函数
      renderMindmap();
    });
  },
} satisfies Theme;
