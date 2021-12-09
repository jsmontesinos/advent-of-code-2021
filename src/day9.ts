import { readDayFixture } from './day-common';

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
        lowPoints.push(getHeightMapPosition(heightMap, j, i));
      }
    }
  }
  return lowPoints;
}

function getHeightMapPosition(
  heightMap: HeightMap,
  x: number,
  y: number,
): HeightMapPosition {
  return { x, y, height: heightMap[y][x] };
}

function isLocalMinimum(heightMap: HeightMap, x: number, y: number) {
  return (
    (isOutsideMap(heightMap, x - 1, y) ||
      heightMap[y][x - 1] > heightMap[y][x]) &&
    (isOutsideMap(heightMap, x + 1, y) ||
      heightMap[y][x + 1] > heightMap[y][x]) &&
    (isOutsideMap(heightMap, x, y - 1) ||
      heightMap[y - 1][x] > heightMap[y][x]) &&
    (isOutsideMap(heightMap, x, y + 1) || heightMap[y + 1][x] > heightMap[y][x])
  );
}

function isOutsideMap(heightMap: HeightMap, x: number, y: number) {
  return x < 0 || y < 0 || x >= heightMap[0].length || y >= heightMap.length;
}

export function calculateRiskLevel(positions: HeightMapPosition[]): number {
  return positions.reduce((acc, current) => current.height + 1 + acc, 0);
}

export function calculateBasin(
  heightMap: HeightMap,
  position: HeightMapPosition,
): HeightMapPosition[] {
  const visited = heightMap.map((line) => line.map(() => false));
  const recursiveCalculateBasinIfNeeded = (x: number, y: number) =>
    !isOutsideMap(heightMap, x, y) && !visited[y][x] && heightMap[y][x] !== 9
      ? recursiveCalculateBasin(getHeightMapPosition(heightMap, x, y))
      : [];
  const recursiveCalculateBasin = (recursivePosition: HeightMapPosition) => {
    const { x, y } = recursivePosition;
    visited[y][x] = true;
    return [
      getHeightMapPosition(heightMap, x, y),
      ...recursiveCalculateBasinIfNeeded(x - 1, y),
      ...recursiveCalculateBasinIfNeeded(x + 1, y),
      ...recursiveCalculateBasinIfNeeded(x, y - 1),
      ...recursiveCalculateBasinIfNeeded(x, y + 1),
    ];
  };

  return recursiveCalculateBasin(position);
}

export function multiplyThreeLargerBasins(heightMap: HeightMap): number {
  const lowerPoints = locateLowPoints(heightMap);
  const allBasins = lowerPoints
    .map((p) => calculateBasin(heightMap, p))
    .sort((a, b) => a.length - b.length);
  return allBasins.slice(-3).reduce((acc, current) => acc * current.length, 1);
}

export async function day9(): Promise<string[]> {
  const lines = await readDayFixture(9);
  return [
    calculateRiskLevel(locateLowPoints(parseToHeightMap(lines))).toString(),
    multiplyThreeLargerBasins(parseToHeightMap(lines)).toString(),
  ];
}
