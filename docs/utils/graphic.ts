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
