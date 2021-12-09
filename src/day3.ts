import { readDayFixture, transposeMatrix } from './day-common';

export function getMoreFrequentOrOne(input: string[]): '1' | '0' {
  return input.filter((c) => c === '1').length >=
    input.filter((c) => c === '0').length
    ? '1'
    : '0';
}

function lessFrequentOrZero(input: string[]): '1' | '0' {
  return negateBit(getMoreFrequentOrOne(input));
}

export function getGamma(input: string[]): string {
  const matrix = input.map((i) => i.split(''));
  const transposedMatrix = transposeMatrix<string>(matrix);
  return transposedMatrix
    .reduce((acc, current) => [...acc, getMoreFrequentOrOne(current)], [])
    .join('');
}

export function getOxygenGeneratorRange(input: string[]): string {
  let matrix = input.map((i) => i.split(''));
  let index = 0;
  while (matrix.length > 1) {
    const transposedMatrix = transposeMatrix<string>(matrix);
    const moreFrequent = getMoreFrequentOrOne(transposedMatrix[index]);
    matrix = matrix.filter((e) => e[index] === moreFrequent);
    index++;
  }

  return matrix[0].join('');
}

export function getCO2ScrubberRating(input: string[]): string {
  let matrix = input.map((i) => i.split(''));
  let index = 0;
  while (matrix.length > 1) {
    const transposedMatrix = transposeMatrix<string>(matrix);
    const moreFrequent = lessFrequentOrZero(transposedMatrix[index]);
    matrix = matrix.filter((e) => e[index] === moreFrequent);
    index++;
  }

  return matrix[0].join('');
}

export function getEpsilon(input: string[]): string {
  return getGamma(input).split('').map(negateBit).join('');
}

function negateBit(bit: '1' | '0'): '1' | '0' {
  return bit === '1' ? '0' : '1';
}

function getPowerConsumption(input: string[]): number {
  return parseInt(getGamma(input), 2) * parseInt(getEpsilon(input), 2);
}

function getLifeSupportRating(input: string[]): number {
  return (
    parseInt(getOxygenGeneratorRange(input), 2) *
    parseInt(getCO2ScrubberRating(input), 2)
  );
}

export async function day3(): Promise<string[]> {
  const lines = await readDayFixture(3);
  return [
    getPowerConsumption(lines).toString(),
    getLifeSupportRating(lines).toString(),
  ];
}
