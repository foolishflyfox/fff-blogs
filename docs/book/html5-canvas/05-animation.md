<script setup>
import {
  RequestAnimationFrameFps,
  ElasticBallDemo,
  FrameRateCalc,
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
