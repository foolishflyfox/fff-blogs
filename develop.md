# 文档开发

## 注意事项

### 编译文档报错

执行 `pnpm docs:build` 报错，例如：

```txt
vitepress v2.0.0-alpha.15

⠋ building client + server bundles...
... ...
⠋ rendering pages...ReferenceError: window is not defined at setup (file:///Users/foolishflyfox/Code/GitRepository/git-remote/fff-blogs/docs/.vitepress/.temp/technology_visualization-yueying_01-visualize-ways.md.js:45:24) at _sfc_main$1.setup
(file:///Users/foolishflyfox/Code/GitRepository/git-remote/fff-blogs/docs/.vitepress/.temp/technology_visualization-yueying_01-visualize-ways.md.js:82:25)
... ...
```

但生成的产物没有问题。这是因为：

在 VitePress 构建时使用 SSR（服务端渲染），SSR 会执行你的 Vue 组件的 `setup()` 函数，但 Node 环境没有 window / document，所以报错。但是 Vue 的生命周期中的 `onMounted`、`onUpdated` 等 “客户端生命周期” 不会在 SSR 执行。

vue 组件的 `setup` 中的代码会执行两次，一次是在 SSR 阶段（Node 环境）执行，另一次是在浏览器客户端阶段再执行一次。

SSR 阶段执行 `setup()` 是为了让服务端能够“预先渲染组件”，生成最终的 HTML 字符串（带状态），不执行 `setup()`，SSR 根本没办法渲染出 HTML。

解决方法：

1. `setup()` 会在 SSR 执行，因此不能直接写 DOM 操作，所有需要 DOM 的代码必须放在 `onMounted()` 里

2. 或用：`if (typeof window !== 'undefined') { ... }`
