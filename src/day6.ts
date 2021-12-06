import { readyDayFixture } from './day-common';

export function getPopulation(input: number[], days: number): number[] {
  let day = 0;
  const population = [...input];
  while (day < days) {
    let newMembers = 0;
    for (let i = 0; i < population.length; i++) {
      if (population[i] === 0) {
        ++newMembers;
      }
      population[i] = population[i] === 0 ? 6 : population[i] - 1;
    }
    population.push(...new Array(newMembers).fill(8));
    ++day;
  }

  return population;
}

export async function day6(): Promise<string[]> {
  const lines = await readyDayFixture(6);
  return [
    getPopulation(
      lines[0].split(',').map((n) => parseInt(n, 10)),
      80,
    ).length.toString(),
  ];
}
