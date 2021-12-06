export function getPopulation(input: number[], days: number): number[] {
  return input.map((n) => n - days);
}
