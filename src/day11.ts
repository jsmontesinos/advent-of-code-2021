type GridStep = { grid: number[][]; flashes: number };

export function parseGrid(input: string[]): GridStep {
  return {
    grid: input.map((line) => line.split('').map((cell) => parseInt(cell, 10))),
    flashes: 0,
  };
}

// @ts-ignore
export function calculateNextEvolution(gridStep: GridStep): GridStep {
  return {
    grid: gridStep.grid.map((line) => line.map((cell) => cell + 1)),
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
