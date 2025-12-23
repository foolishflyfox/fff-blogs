import { DefaultTheme, defineConfig } from "vitepress";
import { posix } from "path";
import { Transformer } from "markmap-lib";
import { fileURLToPath } from "url";

type SidebarItemX = DefaultTheme.SidebarItem & {
  prefix?: string;
};

// 思维导图支持步骤一
const transformer = new Transformer();
function escapeHtml(unsafe: any) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
////结束思维导图设置/////

/**
 * 添加路径前缀
 */
function addLinkPrefix(
  item: SidebarItemX,
  prefix = ""
): DefaultTheme.SidebarItem {
  if (item.link !== undefined) {
    item.link = posix.join(prefix, item.link);
  } else {
    let newPrefix = prefix;
    if (item.prefix) {
      newPrefix = posix.join(newPrefix, item.prefix);
      delete item.prefix;
    }
    if (item.items?.length) {
      item.items.forEach((e) => addLinkPrefix(e, newPrefix));
    }
  }
  return item;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/fff-blogs/",
  title: "My Blogs",
  description: "博客文章内容",
  head: [
    // 设置 favicon
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/fff-blogs/favicon.svg",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 导航栏上显示的 Logo，位于站点标题前
    logo: "/favicon.svg",
    // 可以自定义此项以替换导航中的默认站点标题 (应用配置中的 title)
    siteTitle: "fff blogs",
    nav: [
      { text: "首页", link: "/" },
      { text: "读书", link: "/book/overview" },
      { text: "技术", link: "/technology/overview" },
      { text: "生活", link: "/life/overview" },
    ],

    sidebar: {
      "/book/": [
        {
          text: "书籍",
          items: [
            { text: "总览", link: "overview" },
            {
              text: "软件架构",
              prefix: "architecture",
              collapsed: false,
              items: [
                {
                  text: "软件设计: 从专业到卓越",
                  link: "software-design",
                },
              ],
            },
            {
              text: "HTML5 Canvas 核心技术",
              prefix: "html5-canvas",
              collapsed: true,
              items: [
                { text: "预览", link: "overview" },
                { text: "基础知识", link: "01-essentials" },
                { text: "绘制", link: "02-drawing" },
                { text: "文本", link: "03-text" },
                { text: "图像与视频", link: "04-image-and-video" },
                { text: "动画", link: "05-animation" },
              ],
            },
          ],
        },
      ].map((e) => addLinkPrefix(e, "/book")),
      "/technology/": [
        {
          text: "技术",
          items: [
            { text: "总览", link: "overview" },
            {
              text: "跟月影学可视化",
              prefix: "visualization-yueying",
              collapsed: true,
              items: [
                { text: "开篇词", link: "opening-verse" },
                { text: "01.可视化的四种方式", link: "01-visualize-ways" },
                { text: "02.Canvas 绘图", link: "02-canvas-draw" },
                { text: "03.SVG 绘图", link: "03-svg-draw" },
              ],
            },
            {
              text: "现代计算机图形学入门",
              prefix: "games101",
              collapsed: true,
              items: [
                { text: "概览", link: "overview" },
                {
                  text: "计算机视觉概述",
                  link: "01-overview-of-computer-graphics",
                },
                {
                  text: "线性代数",
                  link: "02-review-of-linear-algebra",
                },
              ],
            },
          ],
        },
      ].map((e) => addLinkPrefix(e, "/technology")),
      "/life/": [
        {
          text: "生活",
          items: [{ text: "总览", link: "overview" }],
        },
      ].map((e) => addLinkPrefix(e, "/life")),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  markdown: {
    // true: 全部显示; false: 全部不显示; number: 只有代码行数 ≥ 该值时才显示
    lineNumbers: true,
    // 全局设置自定义标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
    math: true,
    config: (md) => {
      // 思维导图支持步骤二
      const temp = md.renderer.rules.fence?.bind(md.renderer.rules)!;
      md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        if (token.info === "mindmap") {
          try {
            const { root } = transformer.transform(token.content.trim());
            return `<svg class="markmap-svg" data-json='${escapeHtml(
              JSON.stringify(root)
            )}'></svg>`;
          } catch (ex) {
            return `<pre>${ex}</pre>`;
          }
        }
        return temp(tokens, idx, options, env, slf);
      };
      ////结束思维导图设置////
    },
  },
  vite: {
    server: {
      // 设置服务端口号
      port: 6011,
      // 允许局域网访问
      host: true,
    },
    resolve: {
      alias: {
        // 指定 docs 表示的根目录为 docs
        "@docs": fileURLToPath(new URL("../", import.meta.url)),
      },
    },
  },
});
