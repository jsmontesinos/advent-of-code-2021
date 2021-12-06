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
    for (let i = 0; i < newMembers; i++) {
      population.push(8);
    }
    ++day;
  }

  return population;
}

export function getPopulationLength(input: number[], days: number): number {
  let day = 0;
  let populationCounters = new Map<number, number>();
  for (let i = 0; i < input.length; i++) {
    populationCounters.set(
      input[i],
      (populationCounters.get(input[i]) ?? 0) + 1,
    );
  }
  while (day < days) {
    const newPopulationCounters = new Map<number, number>();
    for (const key of populationCounters.keys()) {
      if (key > 0) {
        newPopulationCounters.set(
          key - 1,
          (newPopulationCounters.get(key - 1) ?? 0) +
            populationCounters.get(key),
        );
      } else {
        newPopulationCounters.set(
          6,
          (newPopulationCounters.get(6) ?? 0) + populationCounters.get(key),
        );
        newPopulationCounters.set(
          8,
          (newPopulationCounters.get(8) ?? 0) + populationCounters.get(key),
        );
      }
    }
    populationCounters = newPopulationCounters;
    ++day;
  }

  return [...populationCounters.values()].reduce(
    (acc, current) => acc + current,
    0,
  );
}

export async function day6(): Promise<string[]> {
  const lines = await readyDayFixture(6);
  return [
    getPopulationLength(
      lines[0].split(',').map((n) => parseInt(n, 10)),
      80,
    ).toString(),
    getPopulationLength(
      lines[0].split(',').map((n) => parseInt(n, 10)),
      256,
    ).toString(),
  ];
}
