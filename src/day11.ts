type GridStep = { grid: number[][]; flashes: number };

export function parseGrid(input: string[]): GridStep {
  return {
    grid: input.map((line) => line.split('').map((cell) => parseInt(cell, 10))),
    flashes: 0,
  };
}

// @ts-ignore
export function calculateNextEvolution(input: string[]): GridStep {
  return {
    grid: [],
    flashes: 0,
  };
}

export function calculateNumberOfFlashes(
  // @ts-ignore
  input: string[],
  // @ts-ignore
  steps: number,
): number {
  return 0;
}
