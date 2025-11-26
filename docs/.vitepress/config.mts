import { DefaultTheme, defineConfig } from "vitepress";
import { posix } from "path";

type SidebarItemX = DefaultTheme.SidebarItem & {
  prefix?: string;
};

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
          ],
        },
      ].map((e) => addLinkPrefix(e, "/book")),
      "/technology/": [
        {
          text: "技术",
          items: [{ text: "总览", link: "overview" }],
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
  vite: {
    server: {
      // 设置服务端口号
      port: 6011,
      // 允许局域网访问
      host: true,
    },
  },
});
