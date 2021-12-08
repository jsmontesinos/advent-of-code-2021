import { readyDayFixture } from './day-common';

export function countUniqueSegmentInstances(input: string[]): number {
  return input.reduce(
    (acc, current) => acc + countUniqueSegmentInstancesInLine(current),
    0,
  );
}

function countUniqueSegmentInstancesInLine(line: string): number {
  const rightSide = line.split(' | ')[1];
  return rightSide
    .split(' ')
    .filter((digit) => [2, 7, 4, 3].includes(digit.length)).length;
}

export async function day8(): Promise<string[]> {
  const lines = await readyDayFixture(8);
  return [countUniqueSegmentInstances(lines).toString()];
}
