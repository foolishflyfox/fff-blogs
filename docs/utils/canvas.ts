export function mouseEventToPos(canvas: HTMLCanvasElement, e: MouseEvent) {
  const bcr = canvas.getBoundingClientRect();
  return {
    x: e.clientX - bcr.left,
    y: e.clientY - bcr.top,
  };
}
