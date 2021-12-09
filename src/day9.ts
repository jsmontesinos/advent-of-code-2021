import { readyDayFixture } from './day-common';

type HeightMap = number[][];
type HeightMapPosition = { x: number; y: number; height: number };

export function parseToHeightMap(input: string[]): HeightMap {
  return input.map((line) => line.split('').map((cell) => parseInt(cell, 10)));
}

export function locateLowPoints(heightMap: HeightMap): HeightMapPosition[] {
  const lowPoints: HeightMapPosition[] = [];
  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      if (isLocalMinimum(heightMap, j, i)) {
        lowPoints.push({ x: j, y: i, height: heightMap[i][j] });
      }
    }
  }
  return lowPoints;
}

function isLocalMinimum(heightMap: HeightMap, x: number, y: number) {
  return (
    (x === 0 || heightMap[y][x - 1] > heightMap[y][x]) &&
    (x === heightMap[y].length - 1 || heightMap[y][x + 1] > heightMap[y][x]) &&
    (y === 0 || heightMap[y - 1][x] > heightMap[y][x]) &&
    (y === heightMap.length - 1 || heightMap[y + 1][x] > heightMap[y][x])
  );
}

export function calculateRiskLevel(positions: HeightMapPosition[]): number {
  return positions.reduce((acc, current) => current.height + 1 + acc, 0);
}

export async function day9(): Promise<string[]> {
  const lines = await readyDayFixture(9);
  return [
    calculateRiskLevel(locateLowPoints(parseToHeightMap(lines))).toString(),
  ];
}
