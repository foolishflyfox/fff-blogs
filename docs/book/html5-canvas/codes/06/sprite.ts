export interface Painter {
  paint(sprite: Sprite, ctx: CanvasRenderingContext2D): void;
}

export interface Behavior {
  execute(sprite: Sprite, ctx: CanvasRenderingContext2D, time: number): void;
}

export class Sprite {
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
