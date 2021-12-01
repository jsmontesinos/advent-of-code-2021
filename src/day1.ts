import { readyDayFixture } from './day-common';

export function depthIncreaseCounter(input: number[]): number {
  return input.reduce(
    (acc, current, currentIndex) =>
      currentIndex > 0 && current - input[currentIndex - 1] > 0 ? acc + 1 : acc,
    0,
  );
}

export function threeMeasurementWindowIncreaseCounter(input: number[]): number {
  return depthIncreaseCounter(
    input.reduce(
      (acc, current, index, array) =>
        index <= array.length - 3
          ? [...acc, current + array[index + 1] + array[index + 2]]
          : acc,
      [],
    ),
  );
}

export async function day1(): Promise<string[]> {
  const lines = await readyDayFixture(1);
  return [
    depthIncreaseCounter(lines.map((line) => parseInt(line, 10)))?.toString(),
    threeMeasurementWindowIncreaseCounter(
      lines.map((line) => parseInt(line, 10)),
    )?.toString(),
  ];
}
