<template>
  <div style="position: relative">
    <div style="position: absolute; left: 10px; top: 10px">
      <div>
        <span>填充: </span>
        <input type="checkbox" v-model="isFill" />
        &nbsp; &nbsp;
        <span>边数: </span>
        <select class="standard" v-model="sideCount">
          <option v-for="v of [4, 6, 8, 10, 12, 20]" :value="v" :key="v">
            {{ v }}
          </option>
        </select>
        &nbsp; &nbsp;
        <span>起始角度: </span>
        <select class="standard" v-model="startAngle">
          <option
            v-for="v of [0, 1 / 8, 1 / 4, 3 / 8, 1 / 2]"
            :value="v * Math.PI"
          >
            {{ 180 * v }}
          </option>
        </select>
        &nbsp; &nbsp;
        <button class="raw-style" @click="clearAll">全部清除</button>
      </div>
      <div style="margin-top: 5px">
        <span>描边色: </span>
        <select class="standard" v-model="strokeColor">
          <option v-for="color of strokeColors" :value="color" :key="color">
            {{ color }}
          </option>
        </select>
        &nbsp; &nbsp;
        <span>填充色: </span>
        <select class="standard" v-model="fillColor">
          <option value="rgba(255,0,0,0.5)">semi-transparent red</option>
          <option value="green">green</option>
          <option value="rgba(0,0,255,0.5)">semi-transparent blue</option>
          <option value="orange">orange</option>
          <option value="rgba(100,140,230,0.5)">
            semi-transparent cornflowerblue
          </option>
          <option value="goldenrod" selected>goldenrod</option>
          <option value="navy">navy</option>
          <option value="purple">purple</option>
        </select>
        &nbsp; &nbsp;
      </div>
    </div>
    <CanvasContainer
      :draw
      :width="600"
      :height="500"
      background-color="#fafafa"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CanvasContainer from "../CanvasContainer.vue";
import { drawGrid } from "../shared/utils";
import { posDistance } from "@docs/utils";
import { drawDial } from "./drawDial";

const strokeColors = [
  "red",
  "green",
  "blue",
  "orange",
  "cornflowerblue",
  "goldenrod",
  "navy",
  "purple",
];

const strokeColor = ref("red");
const fillColor = ref("goldenrod");
const sideCount = ref(4);
const isFill = ref(true);
const startAngle = ref(0);

let clearAll = () => {};

interface MovePos extends Pos {
  moveX: number;
  moveY: number;
}

class Polygon {
  constructor(
    public parent: MyCanvas,
    public ctx: CanvasRenderingContext2D,
    public radian: number,
    public sids: number,
    public x: number,
    public y: number,
    public radius: number,
    public fillColor: string,
    public strokeColor: string,
    public isFill: boolean
  ) {}

  private drawPath() {
    this.ctx.beginPath();

    const subRadian = (Math.PI * 2) / this.sids;
    for (let i = 0; i < this.sids; i++) {
      const radian = this.radian + subRadian * i;
      const currentX = this.x + this.radius * Math.cos(radian);
      const currentY = this.y + this.radius * Math.sin(radian);
      if (i) {
        this.ctx.lineTo(currentX, currentY);
      } else {
        this.ctx.beginPath();
        this.ctx.moveTo(currentX, currentY);
      }
    }
    this.ctx.closePath();
  }

  drawImage() {
    this.ctx.save();
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.fillStyle = this.fillColor;
    this.ctx.shadowBlur = 5;
    this.ctx.shadowColor = "#0006";
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    this.drawPath();
    if (this.isFill) {
      this.ctx.fill();
    }
    this.ctx.stroke();
    this.ctx.restore();
  }
  drawCtrl() {
    if (this.parent.optTarget === this) {
      drawDial(this.ctx, {
        x: this.x,
        y: this.y,
        r: this.radius,
        radian: this.radian,
      });
    }
  }

  isPosInPolygon(pos: Pos) {
    this.drawPath();
    return this.ctx.isPointInPath(pos.x, pos.y);
  }

  public onmousedown(pos: Pos): boolean {
    if (this.isPosInPolygon(pos)) {
      this.parent.optTarget = this;
      this.parent.optType = "move";
      return true;
    }
    return false;
  }

  public ondrag(e: MovePos): boolean {
    if (this.parent.optType === "move") {
      this.x += e.moveX;
      this.y += e.moveY;
      return true;
    }
    return false;
  }

  public onmouseup(e: Pos): boolean {
    return false;
  }
}

class MyCanvas {
  private canvas: HTMLCanvasElement;
  private polygons: Polygon[] = [];
  private cw: number;
  private ch: number;
  public optType: "new" | "move" | "rotate" | null = null;
  public optTarget: Polygon | null = null;
  private newOptStatus: { start: Pos; end?: Pos } | null = null;
  constructor(private ctx: CanvasRenderingContext2D) {
    this.canvas = ctx.canvas;
    this.cw = this.canvas.width;
    this.ch = this.canvas.height;
    this.canvas.onmousedown = this.mousedownHandler.bind(this);
    this.canvas.onmousemove = this.mousemoveHandler.bind(this);
    this.canvas.onmouseup = this.mouseupHandler.bind(this);
  }
  public redraw() {
    this.ctx.clearRect(0, 0, this.cw, this.ch);
    drawGrid(this.ctx, "lightgray", 10);
    for (const p of this.polygons) {
      p.drawImage();
    }
    for (const p of this.polygons) {
      p.drawCtrl();
    }
    if (
      this.optType === "new" &&
      this.newOptStatus?.start &&
      this.newOptStatus.end
    ) {
      const p = this.createPolygon(
        this.newOptStatus.start,
        this.newOptStatus.end
      );
      p.drawImage();
    }
  }

  private createPolygon(start: Pos, end: Pos) {
    const r = posDistance(start, end);
    return new Polygon(
      this,
      this.ctx,
      startAngle.value,
      sideCount.value,
      start.x,
      start.y,
      r,
      fillColor.value,
      strokeColor.value,
      isFill.value
    );
  }

  private calcCanvasPos(e: MouseEvent) {
    const { left, top } = this.canvas.getBoundingClientRect();
    return { x: e.clientX - left, y: e.clientY - top };
  }

  private mousedownHandler(e: MouseEvent) {
    const pos = this.calcCanvasPos(e);
    let eProcessed = false;
    for (let i = this.polygons.length - 1; i >= 0 && !eProcessed; --i) {
      eProcessed = this.polygons[i].onmousedown(pos);
    }
    if (!eProcessed) {
      eProcessed = this.onmousedown(pos);
    }
    this.redraw();
  }

  private mousemoveHandler(e: MouseEvent) {
    if (e.buttons === 1) {
      const pos: MovePos = {
        ...this.calcCanvasPos(e),
        moveX: e.movementX,
        moveY: e.movementY,
      };
      if (this.optType === "new") {
        this.ondrag(pos);
        this.redraw();
      } else if (this.optTarget && this.optType) {
        this.optTarget.ondrag(pos);
        this.redraw();
      }
    }
  }

  private mouseupHandler(e: MouseEvent) {
    const pos = this.calcCanvasPos(e);
    if (this.optType === "new") {
      this.onmouseup(pos);
    } else if (this.optType && this.optTarget) {
      this.optTarget.onmouseup(pos);
    }
    this.redraw();
  }

  private onmousedown(p: Pos): boolean {
    this.optType = "new";
    this.optTarget = null;
    this.newOptStatus = {
      start: p,
    };
    return true;
  }

  private ondrag(e: MovePos): boolean {
    if (this.newOptStatus) {
      this.newOptStatus.end = e;
    }
    return true;
  }

  private onmouseup(e: Pos): boolean {
    if (this.newOptStatus?.start) {
      const polygon = this.createPolygon(this.newOptStatus.start, e);
      this.polygons.push(polygon);
      this.newOptStatus = null;
      this.optType = null;
    }
    return true;
  }

  clearAll() {
    console.log("#@@", this.polygons);
    this.polygons.length = 0;
    this.newOptStatus = null;
    this.optTarget = null;
    this.optType = null;
    this.redraw();
  }
}

function draw(ctx: CanvasRenderingContext2D) {
  const myCanvas = new MyCanvas(ctx);
  myCanvas.redraw();
  clearAll = myCanvas.clearAll.bind(myCanvas);
}
</script>

<style scoped></style>
