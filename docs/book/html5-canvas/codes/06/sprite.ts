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

export class ImagePainter {
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

export interface Cell {
  x: number;
  y: number;
  w: number;
  h: number;
}

export class SpriteSheetPainter {
  cells: Cell[];
  cellIndex: number;
  spriteSheet: HTMLImageElement;
  constructor(spriteSheet: HTMLImageElement, cells?: Cell[]) {
    this.spriteSheet = spriteSheet;
    this.cells = cells || [];
    this.cellIndex = 0;
  }
  advance() {
    if (this.cellIndex === this.cells.length - 1) {
      this.cellIndex = 0;
    } else {
      this.cellIndex++;
    }
  }
  paint(sprite: Sprite, context: CanvasRenderingContext2D) {
    const cell = this.cells[this.cellIndex];
    console.log("@@@", this.cellIndex);
    context.drawImage(
      this.spriteSheet,
      cell.x,
      cell.y,
      cell.w,
      cell.h,
      sprite.left,
      sprite.top,
      sprite.width,
      sprite.height
    );
  }
}
