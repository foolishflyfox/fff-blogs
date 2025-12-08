export function drawGrid(
  ctx: CanvasRenderingContext2D,
  color: string,
  stepx: number,
  stepy?: number
) {
  const canvas = ctx.canvas;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let i = stepx; i < canvas.width; i += stepx) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  const finalStepy = stepy ?? stepx;
  for (let i = finalStepy; i < canvas.height; i += finalStepy) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
  ctx.restore();
}
