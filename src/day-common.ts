import { createInterface } from 'readline';
import { createReadStream } from 'fs';

export async function readyDayFixture(day: number): Promise<string[]> {
  return readFile(`./fixtures/day${day}`);
}

async function readFile(fileName: string): Promise<string[]> {
  const readInterface = createInterface(createReadStream(fileName));

  const result: string[] = [];
  for await (const line of readInterface) {
    result.push(line);
  }

  return result;
}

/** This function split lines in groups separated by a blank line which is removed from the list */
export function splitInGroups(lines: string[]): string[][] {
  return lines
    .map((line) => line.trim())
    .reduce(
      (acc, line) =>
        line.length
          ? [
              ...(acc.length ? acc.slice(0, -1) : []),
              [...(acc.length ? acc[acc.length - 1] : []), line],
            ]
          : [...acc, []],
      [],
    )
    .filter((group) => group.length);
}

/** This function transpose a Matrix */
export function transposeMatrix<T>(a: T[][]): T[][] {
  return Object.keys(a[0]).map((c) => a.map((r) => r[c]));
}
