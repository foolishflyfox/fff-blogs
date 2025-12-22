export function mouseEventToPos(canvas: HTMLCanvasElement, e: MouseEvent) {
  const bcr = canvas.getBoundingClientRect();
  return {
    x: e.clientX - bcr.left,
    y: e.clientY - bcr.top,
  };
}

/**
 * 创建离屏 canvas
 * @param width 离屏 canvas 宽度
 * @param height 离屏 canvas 高度
 */
export function createOfflineCanvas(width?: number, height?: number) {
  const result = document.createElement("canvas") as HTMLCanvasElement;
  if (width !== undefined) {
    result.width = width;
  }
  if (height !== undefined) {
    result.height = height;
  }
  return result;
}
