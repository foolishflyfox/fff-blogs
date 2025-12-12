export function drawTextBackground(ctx: CanvasRenderingContext2D) {
  const { width: cw, height: ch } = ctx.canvas;
  const stepY = 12;
  const topMargin = stepY * 4;
  const leftMargin = stepY * 3;
  // 绘制横向线条
  ctx.save();
  ctx.strokeStyle = "lightgray";
  ctx.lineWidth = 0.5;
  for (let i = ch; i > topMargin; i -= stepY) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(cw, i);
    ctx.stroke();
  }
  // 绘制纵向线条
  ctx.strokeStyle = "rgba(100, 0, 0, 0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(leftMargin, 0);
  ctx.lineTo(leftMargin, ch);
  ctx.stroke();
  ctx.restore();
}
