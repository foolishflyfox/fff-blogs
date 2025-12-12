<template>
  <div style="display: flex">
    <CanvasContainer :draw="draw1" :width="200" :height="200" />
    &nbsp; &nbsp;
    <CanvasContainer :draw="draw2" :width="200" :height="200" />
    &nbsp; &nbsp;
    <CanvasContainer :draw="draw3" :width="200" :height="200" />
  </div>
</template>

<script setup lang="ts">
import CanvasContainer from "../CanvasContainer.vue";

function draw1(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "orange";
  ctx.translate(20, 30);
  ctx.rotate(Math.PI / 6);
  ctx.translate(50, 0);
  ctx.scale(0.8, 1.6);
  ctx.rotate(-Math.PI / 4);

  const { a, b, c, d, e, f } = ctx.getTransform();
  console.log("draw1 =", a, b, c, d, e, f);
  ctx.beginPath();
  const poses = [
    { x: 0, y: 0 },
    { x: 50, y: 0 },
    { x: 50, y: 50 },
    { x: 0, y: 50 },
  ];
  for (let i = 0; i < poses.length; i++) {
    const { x, y } = poses[i];
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
}

function draw2(ctx: CanvasRenderingContext2D) {
  const canvas = document.createElement("canvas");
  const offlineCtx = canvas.getContext("2d")!;
  ctx.fillStyle = "orange";
  offlineCtx.translate(20, 30);
  offlineCtx.rotate(Math.PI / 6);
  offlineCtx.translate(50, 0);
  offlineCtx.scale(0.8, 1.6);
  offlineCtx.rotate(-Math.PI / 4);
  const t = offlineCtx.getTransform();
  const { a, b, c, d, e, f } = t;
  console.log("draw2 =", a, b, c, d, e, f);
  ctx.beginPath();
  const poses = [
    { x: 0, y: 0 },
    { x: 50, y: 0 },
    { x: 50, y: 50 },
    { x: 0, y: 50 },
  ];
  for (let i = 0; i < poses.length; i++) {
    const pos = poses[i];
    const x = a * pos.x + c * pos.y + e;
    const y = b * pos.x + d * pos.y + f;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
}

class Transform2D {
  // matrix in canvas form:
  // [ a c e ]
  // [ b d f ]
  // [ 0 0 1 ]
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;

  constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }

  // 当前矩阵乘上新的变换矩阵，表示变换
  // this = this * M，其中 M = [a2 c2 e2; b2 d2 f2; 0 0 1]
  multiplyRight(
    a2: number,
    b2: number,
    c2: number,
    d2: number,
    e2: number,
    f2: number
  ): Transform2D;
  // 重载形式
  multiplyRight(other: Transform2D): Transform2D;
  multiplyRight(
    ...args: [number, number, number, number, number, number] | [Transform2D]
  ): this {
    if (args.length === 6) {
      const { a, b, c, d, e, f } = this;
      const [a2, b2, c2, d2, e2, f2] = args;
      const na = a * a2 + c * b2!;
      const nc = a * c2! + c * d2!;
      const ne = a * e2! + c * f2! + e;
      const nb = b * a2! + d * b2!;
      const nd = b * c2! + d * d2!;
      const nf = b * e2! + d * f2! + f;
      this.a = na;
      this.b = nb;
      this.c = nc;
      this.d = nd;
      this.e = ne;
      this.f = nf;
    } else {
      const other = args[0];
      const { a, b, c, d, e, f } = other;
      this.multiplyRight(a, b, c, d, e, f);
    }
    return this;
  }

  // 平移操作
  translate(tx: number, ty: number): Transform2D {
    return this.multiplyRight(1, 0, 0, 1, tx, ty);
  }

  // 旋转操作
  rotate(theta: number): Transform2D {
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    return this.multiplyRight(cos, sin, -sin, cos, 0, 0);
  }

  // 缩放操作
  scale(sx: number, sy: number = sx): Transform2D {
    return this.multiplyRight(sx, 0, 0, sy, 0, 0);
  }

  // 重置为单位矩阵
  reset(): this {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
    return this;
  }

  // 指定变换矩阵
  setTransform(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ): this {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
    return this;
  }

  // 将变换作用于一个点的坐标
  applyToPoint(x: number, y: number): { x: number; y: number } {
    return {
      x: this.a * x + this.c * y + this.e,
      y: this.b * x + this.d * y + this.f,
    };
  }

  // 批量转换多个点的坐标
  applyToPointsFlat(data: number[]): void {
    for (let i = 0; i + 1 < data.length; i += 2) {
      const x = data[i],
        y = data[i + 1];
      data[i] = this.a * x + this.c * y + this.e;
      data[i + 1] = this.b * x + this.d * y + this.f;
    }
  }

  // 返回一个包含6个元素的数组，供 canvas 的 setTransform/transform 使用
  toCanvasParams(): [number, number, number, number, number, number] {
    return [this.a, this.b, this.c, this.d, this.e, this.f];
  }

  // 将变换设置到 canvas 绘图环境中
  applyToContextAsSet(ctx: CanvasRenderingContext2D): void {
    ctx.setTransform(this.a, this.b, this.c, this.d, this.e, this.f);
  }

  // 将变换叠加到 canvas 绘图环境的变换中
  applyToContextAsTransform(ctx: CanvasRenderingContext2D): void {
    ctx.transform(this.a, this.b, this.c, this.d, this.e, this.f);
  }

  // 计算变换的逆，如果没有逆变换，抛出错误
  inverse(): Transform2D {
    const det = this.a * this.d - this.b * this.c;
    if (Math.abs(det) < 1e-12) {
      throw new Error("Non-invertible transform (determinant is zero)");
    }
    const invA = this.d / det;
    const invB = -this.b / det;
    const invC = -this.c / det;
    const invD = this.a / det;
    const invE = -(invA * this.e + invC * this.f);
    const invF = -(invB * this.e + invD * this.f);
    return new Transform2D(invA, invB, invC, invD, invE, invF);
  }
}

function draw3(ctx: CanvasRenderingContext2D) {
  const transform2d = new Transform2D();
  ctx.fillStyle = "orange";
  transform2d.translate(20, 30);
  transform2d.rotate(Math.PI / 6);
  transform2d.translate(50, 0);
  transform2d.scale(0.8, 1.6);
  transform2d.rotate(-Math.PI / 4);

  const { a, b, c, d, e, f } = transform2d;
  console.log("draw3 =", a, b, c, d, e, f);
  ctx.beginPath();
  const poses = [
    { x: 0, y: 0 },
    { x: 50, y: 0 },
    { x: 50, y: 50 },
    { x: 0, y: 50 },
  ];
  for (let i = 0; i < poses.length; i++) {
    const pos = poses[i];
    const { x, y } = transform2d.applyToPoint(pos.x, pos.y);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
}
</script>

<style scoped></style>
