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
  const plotting: Point[] = [];
  for (let i = 0; i <= yDiff; i++) {
    plotting.push({ x: line.start.x, y: line.start.x + i });
  }

  return plotting;
}

// @ts-ignore
export function computePointsOverlapping(input: string[]): number {
  return 0;
}
