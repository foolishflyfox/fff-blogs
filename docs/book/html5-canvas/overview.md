# HTML5 Canvas 核心技术 - 图形、动画与游戏开发

知识要点思维导图：

```mindmap
# Canvas 技术
## canvas 标签
### 属性
- `width` 画布逻辑宽
- `height` 画布逻辑高
- `onmousedown`: 鼠标按下处理函数
- `onmouseup`: 鼠标松开处理函数
- `onmouseover`: 鼠标悬停处理函数
- `onmouseout`: 鼠标离开处理函数
### 方法
- `getContext` 获取绘图环境
- `toDataURL` 生成 Base64 URL
- `toBlob` 生成类文件 Blob 对象
- `addEventListener`: 事件处理注册
- `removeEventListener`: 事件处理注销
## context 绘图环境
### 属性
- `canvas`: 所属 canvas 对象
- `fillStyle`: 填充色
- `font`: 字体
- `globalAlpha`: 全局透明度
- `globalCompsiteOperation`: 全局叠加模式
- `lineCap`: 线段端点形状
- `lineJoin`: 线段拐点形状
- `lineWidth`: 线段宽度
- `miterLimit`: 最大斜接长度
- `shadowBlur`: 阴影模糊级数
- `shadowColor`: 阴影颜色
- `shadowOffsetX`: 阴影 x 偏移
- `shadowOffsetY`: 阴影 y 偏移
- `strokeStyle`: 描边色
- `textAlign`: 文本水平对齐方式
- `textBaseline`: 文本垂直对齐方式
- `lineDashOffset`: 虚线绘制偏移
### 方法
#### 状态
- `save`: 保存 canvas 状态
- `restore`: 恢复 canvas 状态
- `setLineDash`: 设置虚线模式
- `getLineDash`: 获取虚线模式
- `getImageData`: 获取绘图数据
- `putImageData`: 恢复绘图数据
#### 创建
- `createLinearGradient`: 线性渐变
- `createRadialGradient`: 放射渐变
- `createConicGradient`: 锥形渐变
- `createPattern`: 创建图案
#### 绘制
- `fillText`: 填充文本
- `strokeText`: 描边文本
- `drawImage`: 绘制图片
- `clearRect`: 清除矩形区域
- `strokeRect`: 矩形描边
- `fillRect`: 矩形填充
- `beginPath`: 开始新路径
- `closePath`: 闭合当前路径
- `moveTo`: 移动画笔
- `lineTo`: 绘制线段路径
- `rect`: 绘制矩形
- `arc`: 绘制圆弧
- `arcTo`: 绘制圆弧
- `quadraticCurveTo`: 二次贝塞尔
- `bezierCurveTo`: 三次贝塞尔
- `stroke`: 当前路径描边
- `fill`: 当前路径填充
#### 变换
- `translate`: 平移
#### 计算
- `isPointInPath`: 是否包含点
## 渐变色
- `addColorStop`: 添加颜色停止点
```
