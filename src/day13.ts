import { readDayFixture } from './day-common';

function calculateFold(points: Point[], fold: Fold): Point[] {
  const foldingResult = points.map((point) => foldPoint(point, fold));

  return [
    ...new Map<string, Point>(
      foldingResult.map((v) => [`${v[0]}_${v[1]}`, v]),
    ).values(),
  ];
}

export function calculateOverlappingPoints(input: string[]): number {
  const origami = parseTransparentOrigami(input);

  return calculateFold(origami.points, origami.folds[0]).length;
}

export function solveOrigami(input: string[]): Point[] {
  const origami = parseTransparentOrigami(input);

  return origami.folds.reduce(
    (acc, fold) => calculateFold(acc, fold),
    origami.points,
  );
}

export function plotPoints(points: Point[]): string[] {
  const maxX = Math.max(...points.map((point) => point[0]));
  const maxY = Math.max(...points.map((point) => point[1]));
  const result: Array<string> = [];
  for (let i = 0; i <= maxY; i++) {
    let line = '';
    for (let j = 0; j <= maxX; j++) {
      line += points.some((point) => pointEquals(point, [j, i])) ? '#' : '.';
    }
    result.push(line);
  }

  return result;
}

function pointEquals(point1: Point, point2: Point): boolean {
  return point1[0] === point2[0] && point1[1] === point2[1];
}

export function foldPoint(point: Point, fold: Fold): Point {
  return fold[0] === 'x'
    ? [foldNumber(point[0], fold[1]), point[1]]
    : [point[0], foldNumber(point[1], fold[1])];
}

function foldNumber(value: number, axis: number) {
  return axis > value ? value : axis * 2 - value;
}

type Point = [number, number];
type FoldAxis = 'x' | 'y';
type Fold = [FoldAxis, number];

type TransparentOrigami = {
  points: Point[];
  folds: Fold[];
};

export function parseTransparentOrigami(input: string[]): TransparentOrigami {
  const emptyLineIndex = input.findIndex((line) => line.trim() === '');
  return {
    points: input
      .slice(0, emptyLineIndex)
      .map((line) => [
        parseInt(line.split(',')[0], 10),
        parseInt(line.split(',')[1], 10),
      ]),
    folds: input.slice(emptyLineIndex + 1).map((line) => {
      const fold = line.split(' ')[2].split('=');
      return [fold[0] as FoldAxis, parseInt(fold[1], 10)];
    }),
  };
}

export async function day13(): Promise<string[]> {
  const lines = await readDayFixture(13);
  return [calculateOverlappingPoints(lines).toString()];
}

(async () => {
  const lines = await readDayFixture(13);
  const plotting = await plotPoints(solveOrigami(lines));
  plotting.forEach((line) => console.log(line));
})();
