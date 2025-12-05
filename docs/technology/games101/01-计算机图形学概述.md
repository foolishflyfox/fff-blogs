# 计算机图形学概述 - 笔记

如何判断一个画面好，从技术角度看，就是直接看这个画面是否足够亮，这个标准非常简单，体现了图形渲染中的一个关键技术：**全局光照**，如果全局光照做得好，整个画面就会亮，看起来很舒服。

计算机图形学的应用：

- 游戏
- 影视特效
- 动画
- CAD (Computer Aided Design)
- 室内设计
- 三维建模/三维扫描
- 数据可视化
- 增强现实 AR / 虚拟现实 VR
- 图片编辑
- 数字孪生，3D 仿真
- GUI 设计

课程内容：

1. 光栅化（OpenGL）：将三维空间的几何形体显示在屏幕上
   - shader 着色器（GLSL 语法）
   - 曲线/曲面
   - ray tracing 光线追踪
   - 路径追踪
   - 物体表面建模
2. 实时的计算机图形学：每秒能生成 30 幅画面，或者 30 帧，也就是 30FPS。不能满足该要就就成为离线图形学
3. 光线追踪
4. 动画模拟仿真

计算机图形学和计算机视觉的区别：

- 一切需要猜测的内容，基本上属于计算机视觉，是由 Image 到 Model 的推导过程；
- 将 Model 渲染成一幅 Image 的过程，成为计算机图形学

计算机视觉的例子：

- 摄像头中物体识别
- 人脸识别
- 疲劳驾驶的检测
- OpenCV

计算机图形学的例子：

- 3D 建模
- 动画创作
- OpenGL

书籍推荐：

- 虎书：[Fundamentals Of Computer Graphics](https://book.douban.com/subject/35755152/)
  - [Github 中文翻译](https://github.com/NWPU66/Fundamentals-Of-Computer-Graphics-5th-CN)

作业的编程语言：C++，开发 IDE：Visual Studio 或 VSCode。
