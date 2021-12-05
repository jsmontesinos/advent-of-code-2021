type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

function parsePoint(input: string): Point {
  const coordinates = input.split(',');
  return { x: parseInt(coordinates[0], 10), y: parseInt(coordinates[1], 10) };
}

function parseLine(input: string): Line {
  const points = input.split(' -> ');
  return { start: parsePoint(points[0]), end: parsePoint(points[1]) };
}

export function parseHydrothermalLines(input: string[]): Array<Line> {
  return input.map(parseLine);
}

export function plotHydrothermalLine(line: Line): Point[] {
  const yDiff = line.end.y - line.start.y;
  const xDiff = line.end.x - line.start.x;
  const plotting: Point[] = [];
  for (let i = 0; i <= Math.abs(xDiff); i++) {
    for (let j = 0; j <= Math.abs(yDiff); j++) {
      plotting.push({
        x: xDiff >= 0 ? line.start.x + i : line.start.x - i,
        y: yDiff >= 0 ? line.start.y + j : line.start.y - j,
      });
    }
  }

  return plotting;
}

// @ts-ignore
export function computePointsOverlapping(input: string[]): number {
  return 0;
}
