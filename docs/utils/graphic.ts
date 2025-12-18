export function posDistance(pos1: Pos, pos2: Pos) {
  const deltaX = pos1.x - pos2.x;
  const deltaY = pos1.y - pos2.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

export function square(v: number) {
  return v * v;
}

export function isDistanceLessEqual(
  pos1: Pos,
  pos2: Pos,
  limitDistance: number
) {
  const deltaX = pos1.x - pos2.x;
  const deltaY = pos1.y - pos2.y;
  return deltaX * deltaX + deltaY * deltaY <= limitDistance * limitDistance;
}

/** 根据两个点作为对角线，所创建的矩形信息 */
export function calcRectInfo(pos1: Pos, pos2: Pos) {
  const left = Math.min(pos1.x, pos2.x);
  const top = Math.min(pos1.y, pos2.y);
  const right = Math.max(pos1.x, pos2.x);
  const bottom = Math.max(pos1.y, pos2.y);
  const width = right - left;
  const height = bottom - top;
  return { left, top, right, bottom, width, height };
}
