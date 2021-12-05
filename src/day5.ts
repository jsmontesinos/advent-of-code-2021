import { readyDayFixture } from './day-common';

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
  // Horizontal line
  if (yDiff !== 0 && xDiff === 0) {
    return plotLine(line, Math.abs(yDiff), 0, yDiff >= 0 ? 1 : -1);
  }
  // Vertical line
  else if (xDiff !== 0 && yDiff === 0) {
    return plotLine(line, Math.abs(xDiff), xDiff >= 0 ? 1 : -1, 0);
  }
  // Diagonal line
  else {
    return plotLine(
      line,
      Math.min(Math.abs(xDiff), Math.abs(yDiff)),
      xDiff >= 0 ? 1 : -1,
      yDiff >= 0 ? 1 : -1,
    );
  }
}

function plotLine(
  line: Line,
  steps: number,
  xFactor: 0 | 1 | -1,
  yFactor: 0 | 1 | -1,
): Point[] {
  const plotting: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    plotting.push({
      x: line.start.x + i * xFactor,
      y: line.start.y + i * yFactor,
    });
  }
  return plotting;
}

export function isHorizontalOrVertical(line: Line): boolean {
  return line.start.x === line.end.x || line.start.y === line.end.y;
}

export function computePointsOverlapping(
  input: string[],
  lineFilter: (line: Line) => boolean = () => true,
): number {
  const getPointKey = (point: Point) => `${point.x}_${point.y}`;

  const countingMap = input
    .map(parseLine)
    .filter(lineFilter)
    .flatMap(plotHydrothermalLine)
    .map(getPointKey)
    .reduce(
      (acc, current) => acc.set(current, (acc.get(current) ?? 0) + 1),
      new Map<string, number>(),
    );

  return [...countingMap.values()].filter((entry) => entry > 1).length;
}

export async function day5(): Promise<string[]> {
  const lines = await readyDayFixture(5);
  return [
    computePointsOverlapping(lines, isHorizontalOrVertical).toString(),
    computePointsOverlapping(lines).toString(),
  ];
}
