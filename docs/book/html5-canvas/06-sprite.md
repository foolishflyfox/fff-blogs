<script setup>
import {
  BallSprite,
  ClockSprite,
  BombSprite,
} from './codes/06';
</script>

# 精灵

在制作基于 Canvas 的动画时，最好能够将这些基础功能都封装为 JavaScript 语言的对象，这样的话，每次实现动画时就不用从头开始编写代码了。

:::tip

本章会实现三种设计模式：策略模式(Strategy)、命令模式(Command)与享元模式(Flyweight)。策略模式用于将精灵与绘制器解耦(decouple)，命令模式用于实现啊精灵的动作，而享元模式则可以让我们用一个实例来表示多个精灵。

本章还实现了开源项目中的两个概念。一个叫“行为”，它源于 Android 平台一款知名的开源游戏: Replica Island；第二个概念叫做“精灵动画制作器”，此概念源自一个知名的动画底层程序库 Animator.js。

:::

## 精灵概述

要制作一个有用的精灵对象，必须让开发者能将它们绘制出来，能够将其放置于动画中的指定位置，并且能以给定的速度将其从一个地方移动到另一个地方。

这些精灵对象或许还能接受调用者的命令，来执行某些特定的动作，例如下落、弹起、飞行、爆炸，以及与其他精灵碰撞等等。

`painter` 属性是一个指向 Painter 对象的引用，该对象使用 `paint(spirte, context)` 方法来绘制精灵。`behaviors` 属性指向一个对象数组，数组中的每个对象都会以 `execute(sprite, context, time)` 方法来对精灵进行某种形式的操作。

下面列出了 Sprite 对象的属性：

- `top`: 精灵左上角(upper left-hand corner,检查 ulhc)的 Y 坐标；
- `left`: 精灵左上角的 X 坐标
- `width`: 精灵宽度
- `height`: 精灵高度
- `velocityX`: 精灵水平速度
- `velocityY`: 精灵垂直速度
- `behaviors`: 一个包含精灵行为对象的数组，在精灵执行更新逻辑时，该数组中的各行为对象都会被应用于此精灵
- `painter`: 用于绘制此精灵对象的绘制器
- `visible`: 表示此精灵是否看见的 boolean 标志
- `animating`: 表示此精灵是否正在执行动画效果的 boolean 标志

精灵对象有两个方法：`paint()` 与 `update()`。`update()` 方法用于执行每个精灵的行为，执行的顺序就是这些行为被加入到精灵中的顺序。`paint()` 方法则将精灵的绘制代理给绘制器来做，不过仅仅在精灵确实有绘制器并且可见时，此方法才会生效。Sprite 对象的代码如下：

```ts
interface Painter {
  paint(sprite: Sprite, ctx: CanvasRenderingContext2D): void;
}

interface Behavior {
  execute(sprite: Sprite, ctx: CanvasRenderingContext2D, time: number): void;
}

class Sprite {
  name: string;
  top = 0;
  left = 0;
  width = 10;
  height = 10;
  velocityX = 0;
  velocityY = 0;
  visible = true;
  animating = false;
  painter?: Painter;
  behaviors: Behavior[];

  constructor(name: string, painter?: Painter, behaviors?: Behavior[]) {
    this.name = name;
    this.painter = painter;
    this.behaviors = behaviors || [];
  }

  paint(ctx: CanvasRenderingContext2D) {
    if (this.painter && this.visible) {
      this.painter.paint(this, ctx);
    }
  }

  update(ctx: CanvasRenderingContext2D, time: number) {
    for (let i = 0; i < this.behaviors.length; ++i) {
      this.behaviors[i].execute(this, ctx, time);
    }
  }
}
```

知道了精灵的实现后，来看看如何使用它吧。下面的程序展示了一个简单的精灵对象。

<BallSprite />

实现的代码如下：

```ts
const context = document.getElementById("canvas").getContext("2d");
const radius = 75;
const ball = new Sprite("ball", {
  paint(sprite, ctx) {
    ctx.beginPath();
    ctx.arc(
      sprite.left + sprite.width / 2,
      sprite.top + sprite.height / 2,
      radius,
      0,
      Math.PI * 2
    );
    ctx.clip();
    ctx.shadowColor = "rgb(0,0,0)";
    ctx.shadowOffsetX = -4;
    ctx.shadowOffsetY = -4;
    ctx.shadowBlur = 8;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(100,100,195)";

    ctx.fillStyle = "rgba(30,144,255,0.15)";
    ctx.fill();
    ctx.stroke();
  },
});
drawGrid(ctx, "lightgray", 10);
ball.left = 320;
ball.top = 160;
ball.paint(ctx);
```

这段代码创建了一个名为 ball 的精灵对象，并在创建该对象时指定了一个自定义的绘制函数来绘制该小球，但并未绑定任何行为。

## 精灵绘制器

Sprite 对象与绘制其内容的绘制器间是解耦的(decoupled)。这样在程序运行时，就可以为精灵动态设定绘制器了，它每隔一段时间就将精灵的绘制器交换一次。

Painter 对象只需实现如下方法即可：`void paint(sprite, context)`。所有 Painter 对象都可被归纳为以下三类：

- 描边及填充绘制器：使用 Canvas 的图形 API 来绘制精灵；
- 图像绘制器：用于绘制图像；
- 精灵表绘制器：用于绘制精灵表中的单个精灵；

### 描边与填充绘制器

描边与填充绘制器(stroe and fill painter)会调用包括 `stroe` 与 `fill` 在内的 Canvas 图形函数来绘制精灵。如下示例中的时钟，它的三个指针就是使用精灵来表示的。

<ClockSprite />

首先，程序创建了一个用于绘制精灵的对象，然后这个 Painter 对象传给 Sprite 构造器。

```ts
const ballPainter: Painter = {
  paint(sprite, ctx) {
    const x = sprite.left + sprite.width / 2;
    const y = sprite.top + sprite.height / 2;
    const radius = sprite.width / 2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.clip();
    // 继续绘制精灵图...
    ctx.restore();
  },
};
const ball = new Sprite("ball", ballPainter);
```

接下来，应用程序使用名为 ball 的精灵对象来绘制时钟指针，代码如下：

```ts
function drawHand(loc: number, isHour: boolean) {
  // 将 ball 移动到合适的位置
  ...
  ball.paint(ctx);
}
function drawHands() {
  const date = new Date();
  // 秒
  ball.width = 20;
  ball.height = 20;
  drawHand(date.getSeconds(), false);
  // 分
  ball.width = 35;
  ball.height = 25;
  drawHand(date.getMinutes(), false);
  // 时
  const hour = date.getHours() % 12;
  ball.width = 50;
  ball.height = 50;
  drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true);
  // 中心点
  ball.width = 10;
  ball.height = 10;
  ball.left = canvas.width / 2 - ball.width / 2;
  ball.top = canvas.height / 2 - ball.height / 2;
  ballPainter.paint(ball, ctx);
}
```

:::tip

虽说上述应用看上去需要 4 个精灵对象才能绘制出来，可实际上只用了 1 个。使用一个对象来表示多个概念，就是享元模式。它减少了需要创建的对象数，从而降低了内存占用量，这对动画和电子游戏的制作尤为重要。

:::

### 图像绘制器

图像绘制器对象含有一个指向图像对象的引用，它会将此图像绘制到经由 `paint()` 方法所传入的绘图环境对象之上。图形绘制器实现起来很简单，如下代码所示：

```ts
class ImagePainter {
  image: HTMLImageElement;
  constructor(imageUrl: string) {
    this.image = new Image();
    this.image.src = imageUrl;
  }

  paint(sprite: Sprite, context: CanvasRenderingContext2D) {
    if (this.image.complete) {
      context.drawImage(
        this.image,
        sprite.left,
        sprite.top,
        sprite.width,
        sprite.height
      );
    }
  }
}
```

在创建图像绘制器时，需要将指向 URL 的引用传给 `ImagePainter` 构造器。只有当图像完全载入后，图像绘制器的 `paint` 方法才会将其绘制出来。

如下所示的这个精灵，就是用图像绘制器来构建的。

<BombSprite />

代码如下，演示了一幅简单的动画，它反复地绘制一个含有炸弹图像的精灵。

```ts
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bomb = new Sprite("bomb", new ImagePainter(bombUrl));
bomb.left = 220;
bomb.top = 80;
bomb.width = 180;
bomb.height = 130;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bomb.paint(ctx);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```
