<script setup>
import {
  RequestAnimationFrameFps,
  ElasticBallDemo,
  FrameRateCalc,
  FrameRateCalcV2,
  TestDoubleCache,
  MovingSky,
  ParallaxDemo,
  DragMagnifier,
} from './codes/05';
</script>

# 动画

Canvas 所提供的底层图像处理能力完全可以用来创建动画中的帧。

## 动画循环

在 Canvas 中实现动画效果很简单：只需要在播放动画时持续更新并绘制就行。

持续的更新与重绘就叫做“动画循环”(animation loop)，它是所有动画的核心逻辑。

动画是一种持续的循环，但是我们无法实现这种持续循环，至少我们还不能用运行于浏览器中的 JavaScript 代码来实现传统意义上的持续循环。

例如下面的这段 JavaScript 代码：

```js
function animate() {
  // 更新并重绘动画对象
}
while (true) {
  // 会使浏览器失去响应，不要这么做
  animate();
}
```

为了让浏览器子循环执行过程中得以喘息，可以使用 `window.setInterval()` 或 `window.setTimeout()` 来执行循环，示例如下：

```js
/** 使用 setInterval 来实现动画循环 */
function animate() {
  // 更新并重绘动画对象
}
// 以 60 FPS 的帧率更新动画
setInterval(animate, 1000 / 60);
```

```js
/** 使用 setTimeout 实现动画循环 */
function animate() {
  const start = Date.now();
  // 更新并重绘动画对象
  ...
  const finish = Date.now();
  setTimeout(animate, 1000 / 60 - (finish - start));
}
animate()
```

其中 `setInterval` 方法每隔一定的时间，就会调用一次传给它的函数，然而 `setTimeout` 方法则只会在到达指定时间点，将传递给它的函数调用一次。由于这两个方法在调用机制上的差别，所以使用 `setInterval` 来实现动画循环时，只需调用一次就够了，而如果用 `setTimeout` 来做，则需要持续地调用它。注意：调用 `setTimeout` 时，必须明确告诉浏览器下一次执行动画循环的时间，所以，我们每次调用它时，都必须将下次执行动画循环 的时间点计算出来。与此相反，如果使用 `setInterval` 方法，则只需指定一次调用间隔即可。

虽说 `setTimeout` 和 `setInterval` 方法有很多用途，然而它们并不是专门用于实现动画的。实现动画循环的首选方式，是 W3C 标准中名为 `requestAnimationFrame` 方法。

:::warning

**不要使用 `window.setInterval` 或 `window.setTimeout` 来做动画。**

我们必须要认识到，`window.setInterval` 与 `window.setTimeout` 并不能提供制作动画所需的精确计时机制。它们只能让应用程序在某个大致时间点上运行代码的通用方法。

比如，根据 HTML5 规范，浏览器为了节省电力消耗，可以拉长执行代码的间隔时间。以浏览器术语来说，就是 **“强制规定时间间隔的下限”**。并且浏览器也确实是这么做的。

:::

:::tip

**不应主动命令浏览器何时去绘制下一帧动画，这应由浏览器来通知你**

虽说 `setTimeout` 与 `setInterval` 的时间间隔机制并不精确，不过在调用它们时，开发者会主动告知其绘制下一帧动画的时间。

然而，调用者其实并不知道绘制下一帧动画的最佳时机，你很可能根本不了解浏览器绘制动画的内部机制。相反，浏览器肯定比调用者更了解绘制下一帧动画的最佳时机。

所以，我们不要像 `setTimeout` 或 `setInterval` 方法那样，主动命令浏览器何时去绘制下一帧动画，而应该让浏览器在它觉得可以绘制下一帧动画时通知你。我们用 `requestAnimationFrame` 方法来实现此功能。

:::

### 通过 requestAnimationFrame 方法让浏览器自行决定帧速率

下面是 `requestAnimationFrame` 的用法：

```js
function animate() {
  // 更新并重绘动画对象
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

想要播放动画，就调用 `requestAnimationFrame` 方法，并将执行动画播放函数的引用传递给它，浏览器在决定绘制第一帧动画时，就会调用这个函数。通常在动画播放函数中，我们也会根据情况再次调用 `requestAnimationFrame` 方法，使动画循环持续地执行下去。

下面的例子用于计算 `requestAnimationFrame` 的大致帧率：

<RequestAnimationFrameFps />

测试得到，`requestAnimationFrame` 的帧率为 60 FPS。

W3C 也提供了 `cancelAnimationFrame` 方法，用于取消回调函数。`requestAnimationFrame` 方法会返回一个 long 类型的对象，用做标识回调函数身份的句柄。以后若要取消回调函数的执行，可以将其传给 `cancelAnimationFrame` 方法。

:::tip

一般来说，动画都是基于时间的，所以，`requestAnimationFrame` 方法在回调动画回调函数时，会传递给它一个时间值，该值表示从页面导航开始计时，单位 ms。

:::

### 可移植于各浏览器平台的动画循环逻辑

下面是一个动画的示例：

<ElasticBallDemo />

## 帧速率的计算

动画是由一系列叫做“帧”的图像组成的，这些图像的显示频率就叫做“帧速率”(frame rate)。通常来说，有必要计算一下帧速率。

下面的例子显示了帧速率：

<FrameRateCalc />

## 以不同的帧速率来执行各种任务

很多动画持续在播放动画时，还要执行其他任务。例如，在播放动画时，可能还要显示剧情文本、播放音乐或是更新游戏分数。此类任务大多不需要以每秒 60 帧的速度执行。所以说，要学会将不同的任务安排在不同的帧速率上执行，这一点很重要。

下面的例子是对上一个帧速率计算的改进，更新动画帧速率数值这个任务，其运行速度没必要与动画更新速率保持一致。

<FrameRateCalcV2 />

## 恢复动画背景

实现动画效果所用的大多数技术都比较简单，例如借助 `requestAnimationFrame`，每隔一段时间就调用一次自定义的 `animate` 方法，还有就是根据动画内容计算出运动物体的下一次位置，并将其绘制到新坐标处，这个做起来也很容器。绘制动画时，具有挑战性的环节在于如何处理背景。从本质上讲，无外乎这三种方法：

- 将所有内容都擦除，并重新绘制。
- 仅绘制内容发生变化的那部分区域。
- 从离屏缓冲区中将内容发生变化的那部分背景图像复制到屏幕上。

将所有内容都擦除，并重新绘制，这是最直截了当的办法。如果仅重绘发生变化的区域，那么还是得擦除并重画背景，只不过执行操作的范围仅局限于屏幕上图像由变化的那块区域。最后，我们还有第三种选择，就是从离屏缓冲区中将内容发生变化的那部分背景图像复制到屏幕上(这也叫做“图块复制”,blitting).

:::tip

**是否要把每帧动画的所有内容都重绘一遍？**

虽然听起来有些反常，但有时把每帧动画的所有内容都重绘一边，反倒可以获得最佳性能。通常来说，如果背景很简单，而且你要绘制的运动问题也比较简单的话，那么将所有内容都擦掉并重新绘制，也许是个好办法。

:::

### 利用剪辑区域来处理动画背景

如果背景图像很简单，那么先擦掉背景然后再重绘下一帧动画这个办法效果还不错。不过如果背景很复杂，那么在画每帧之前都重绘背景，其耗时就太长了。这种情况下，可以考虑将重绘操作限制在 canvas 中的某个特定区域内。

利用剪辑区域，可以将所有的绘制操作都限定在由某条路径所定义的范围内。设置好剪辑区域后，接下来执行的绘制命令就只会在改区域内生效。

利用剪辑区域技术来恢复上一帧动画所占背景图像的执行步骤：

1. 调用 `context.save` 保存屏幕 canvas 的状态；
2. 通过调用 `beginPath` 开始一段新的路径
3. 在 context 对象上调用 `acr`、`rect` 等方法来设置路径
4. 调用 `context.clip` 方法，将当前路径设置为屏幕 canvas 的剪辑区域
5. 擦除屏幕 canvas 中的图像(实际只会擦除剪辑区域所在的这一块范围)
6. 将背景图像绘制到屏幕 canvas 中
7. 恢复屏幕 canvas 的状态参数，该操作主要是为了重置剪辑区域

### 利用图块复制技术处理动画背景

将整个背景一次性地绘制到离屏 canvas 中，稍后从离屏 canvas 中只将修复动画背景所需的那一块图像复制到屏幕上即可。

## 利用双缓冲技术绘制动画

目前为止，本章所用的动画逻辑如下：

```js
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
...
function animation(time) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // 更新并绘制动画对象
  requestAnimationFrame(animation);
}
requestAnimationFrame(animation);
```

上述代码线清除 canvas，然后绘制下一帧动画。假如动画是单缓冲的(single buffered)，那么就意味着其内容会被立刻绘制到屏幕 canvas 中。这样的话，擦除背景的那一瞬间所造成的空白可能会使动画看起来有些闪烁。

防止闪烁的一种办法是使用双缓冲(double buffering)，如果用双缓冲，那么就不是将动画内容直接绘制到屏幕 canvas 中，而是先将所有东西都绘制到离屏 canvas 中，然后将该离屏 canvas 中的全部内容一次性复制到屏幕 canvas 中。逻辑如下：

```js
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// 创建离屏 canvas
const offscreenCanvas = document.createElement('canvas');
const offscreenContext = offscreenCanvas.getContext('2d');
...
offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;
...
function animate(now) {
  offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
  // 在离屏 canvas 上更新绘制动画
  ...
  // 清除屏幕画布，并将离屏画布内容绘制到屏幕画布
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(offlineCanvas, 0, 0);
}
```

双缓冲技术可以有效消除动画绘制时的闪烁，所以浏览器会自动采用双缓冲来实现 canvas 元素，开发者并不需要自己来实现它。而且如果按上述代码来手工实现双缓冲的话，反倒降低了动画的绘制效率。

如果你曾经在调试器中单步执行过与 Canvas 有关的代码，那么可能会怀疑浏览器到底有没有自动运用双缓冲来绘制 canvas 元素。毕竟我们在调试器中单步执行代码时，对 canvas API 的调用是立即生效的。但实际上，它们还是通过双缓冲机制运作的。

可以通过如下代码来验证，浏览器确实是使用双缓冲技术来绘制 canvas 元素的：

```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let sum = 0;

function animation(now) {
  // 擦除屏幕画布
  eraseBackground();
  // 擦除背景，模拟繁忙操作
  for (let i = 0; i < 500000; ++i) {
    sum += i;
  }
  drawBackground();
  draw();
  requestAnimationRequest(animate);
}
```

示例如下：

<TestDoubleCache />

可以看到，没有出现灰色背景，说明浏览器的确有双缓冲。

## 基于时间的运动

不论底层的帧速率如何，动画都应该以稳定的速度播放才对。

想让动画以稳定的速度运行，而不受帧速率的影响，那就要根据物体的速度计算出它在两帧之间所移动的像素数。计算公式如下：

$$
\frac{像素}{帧}=\frac{像素}{秒} / \frac{帧}{秒}
$$

该公式页可以写成如下形式：

$$
\frac{像素}{帧}=\frac{像素}{秒} \times \frac{秒}{帧}
$$

上述公式可以算出问题每一帧应该移动多少像素。代码如下：

```js
function updateTimeBased(time) {
  let disc = null;
  let elapsedTime = time - lastTime;
  for (let i = 0; i < discs.length; ++i) {
    disc = discs[i];
    // 基于时间的移动速度
    deltaX = disc.velocityX * (elapsedTime / 1000);
    deltaY = disc.velocityY * (elapsedTime / 1000);

    if (
      disc.x + deltaX + disc.radius > topContext.canvas.width ||
      disc.x + deltaX - disc.radius < 0
    ) {
      disc.velocityX = -disc.velocityX;
      deltaX = -deltaX;
    }
    if (
      disc.y + deltay + disc.radius > topContext.canvas.height ||
      disc.y + deltaY - disc.radius < 0
    ) {
      disc.velocityY = -disc.velocityY;
      deltaY = -deltaY;
    }
    disc.x = disc.x + deltaX;
    disc.y = disc.y + deltaY;
    lastTime = time;
  }
}
```

## 背景的滚动

很多动画的背景本身也是移动的，如下示例所示，以流动的云彩作为背景，你也可以实现一幅动画，将其用作某款横向卷轴电子游戏的背景。

<MovingSky />

该示例通过移动 canvas 绘图环境对象的原点坐标来实现背景滚动效果，代码如下：

```ts
cosnt SKY_VELOCITY = 30; // 每秒移动30个像素
let skyOffset = 0; // 移动偏移量
...
function draw() {
  skyOffset = skyOffset < canvas.width ? skyOffset + SKY_VELOCITY / fps : 0;
  context.save();
  context.translate(-skyOffset, 0);
  context.drawImage(sky, 0, 0);
  context.drawImage(sky, sky.width, 0);
  context.restore();
}
```

## 视差动画

动画制作者让各个动画图层以不同的速度滚动，这样就实现了视差效果。如下例子，共有 4 个动画图层，其中蓝天和白云比其他物体距离观察者更远，所以天空图层从右向左的滚动速度非常慢。接下来，离观察者烧近一些的则是背景中的小树，它们比天空图层移动得稍快些，但是不如前面的大树速度快，因为大树距离观察者更近。最后，位于最前方的草地图层的滚动速度最快。

<ParallaxDemo />

## 用户手势

有些动画可以自行播放，而另一些则需要用户参与互动。在桌面电脑与移动设备上，用户通常会以鼠标或手指触摸来与动画互动，这些方式称为用户手势。

在之前第四章中，我们实现了放大镜程序。下面的示例在上述放大镜程序的基础上，用户可以通过快速拖拽的方式将放大镜“扔”出去。放大镜扔出去后，就会沿着刚才拖拽鼠标的方向继续移动，其速度与用户拖拽它的力度有关。若是碰到 canvas 的边缘，就会被弹回，并继续沿反方向前行。

<DragMagnifier />

## 定时动画
