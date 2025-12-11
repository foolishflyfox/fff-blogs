interface DialInfo {
  x: number;
  y: number;
  r: number;
  radian: number;
  ctrlR?: number;
}
export function drawDial(ctx: CanvasRenderingContext2D, dialInfo: DialInfo) {
  const outR = dialInfo.r - 20;
  const ctrlR = dialInfo.ctrlR ?? 5;
  ctx.save();
  // 绘制最外层环
  ctx.fillStyle = "#aaa5";
  ctx.beginPath();
  ctx.arc(dialInfo.x, dialInfo.y, dialInfo.r, 0, Math.PI * 2);
  ctx.moveTo(dialInfo.x + outR, dialInfo.y);
  ctx.arc(dialInfo.x, dialInfo.y, outR, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.strokeStyle = "#00f8";
  ctx.beginPath();
  ctx.arc(dialInfo.x, dialInfo.y, dialInfo.r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#ccc";
  ctx.beginPath();
  ctx.arc(dialInfo.x, dialInfo.y, outR, 0, Math.PI * 2);
  ctx.stroke();

  // 绘制刻度与数值
  const deltaRadian = Math.PI / 64;
  ctx.strokeStyle = "#00f6";
  ctx.fillStyle = "blue";
  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let i = 0; i < 128; i++) {
    const radian = i * deltaRadian;
    const cosV = Math.cos(radian);
    const sinV = Math.sin(radian);
    const x0 = dialInfo.x + outR * cosV;
    const y0 = dialInfo.y + outR * sinV;
    let len = i % 2 === 0 ? 10 : 5;
    const x1 = dialInfo.x + (outR - len) * cosV;
    const y1 = dialInfo.y + (outR - len) * sinV;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    const x2 = dialInfo.x + (outR - 23) * cosV;
    const y2 = dialInfo.y + (outR - 23) * sinV;
    if (i % 8 === 0) {
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#000a";
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.fillText(
        Math.round((360 - (360 / 128) * i) % 360).toString(),
        x2,
        y2
      );
      ctx.restore();
    }
  }
  ctx.strokeStyle = "lightgray";
  ctx.beginPath();
  ctx.arc(dialInfo.x, dialInfo.y, outR - 10, 0, Math.PI * 2);
  ctx.stroke();
  // 中心圆
  ctx.strokeStyle = "#aaa";
  ctx.fillStyle = "#0bfa";
  ctx.beginPath();
  ctx.arc(dialInfo.x, dialInfo.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // 指针圆
  ctx.fillStyle = "#fe48";
  ctx.strokeStyle = "#dcbf72";
  const targetRadian = dialInfo.radian;
  const targetX = dialInfo.x + (outR + 20) * Math.cos(targetRadian);
  const targetY = dialInfo.y + (outR + 20) * Math.sin(targetRadian);
  ctx.beginPath();
  ctx.arc(targetX, targetY, ctrlR, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(dialInfo.x, dialInfo.y);
  ctx.lineTo(targetX, targetY);
  ctx.stroke();
  ctx.restore();
}
