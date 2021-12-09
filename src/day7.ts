import { readDayFixture } from './day-common';

export function getLessFuelPositionForCrabSubmarines(input: number[]): number {
  const orderedInput = [...input].sort((a, b) => a - b);

  const half = Math.floor(orderedInput.length / 2);

  return orderedInput.length % 2
    ? orderedInput[half]
    : Math.round((orderedInput[half - 1] + orderedInput[half]) / 2.0);
}

export function getFuelNeededForCrabSubmarines(input: number[]): number {
  const median = getLessFuelPositionForCrabSubmarines(input);
  return input.reduce((acc, current) => acc + Math.abs(current - median), 0);
}

export function getFuelDistanceBetweenTwoValues(a: number, b: number): number {
  const reference = Math.abs(a - b);
  return ((reference + 1) * reference) / 2;
}

export function getFuelNeededForCrabSubmarinesWithIncrementalDistanceFunction(
  input: number[],
): number {
  const maxPosition = Math.max(...input);
  let minConsumption = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i <= maxPosition; i++) {
    const positionConsumption = input.reduce(
      (acc, current) => acc + getFuelDistanceBetweenTwoValues(current, i),
      0,
    );
    if (positionConsumption < minConsumption) {
      minConsumption = positionConsumption;
    }
  }

  return minConsumption;
}

export async function day7(): Promise<string[]> {
  const lines = await readDayFixture(7);
  const numericValues = lines[0].split(',').map((n) => parseInt(n, 10));
  return [
    getFuelNeededForCrabSubmarines(numericValues).toString(),
    getFuelNeededForCrabSubmarinesWithIncrementalDistanceFunction(
      numericValues,
    ).toString(),
  ];
}
