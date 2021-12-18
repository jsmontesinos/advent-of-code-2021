import { readDayFixture } from './day-common';

export function calculateOverlappingPoints(input: string[]): number {
  const origami = parseTransparentOrigami(input);
  const foldingResult = origami.points.map((point) =>
    foldPoint(point, origami.folds[0]),
  );

  return new Map(foldingResult.map((v) => [`${v[0]}_${v[1]}`, v])).size;
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
