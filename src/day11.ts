import { readDayFixture } from './day-common';

type GridStep = { grid: number[][]; flashes: number };

export function parseGrid(input: string[]): GridStep {
  return {
    grid: input.map((line) => line.split('').map((cell) => parseInt(cell, 10))),
    flashes: 0,
  };
}

export function calculateNextEvolution(gridStep: GridStep): GridStep {
  let flashes = 0;
  const grid = gridStep.grid.map((line) => line.map((cell) => cell + 1));
  let iterationFlashes = 0;
  do {
    iterationFlashes = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] > 9) {
          ++iterationFlashes;
          flashGridInPosition(grid, i, j);
        }
      }
    }
    flashes += iterationFlashes;
  } while (iterationFlashes > 0);

  return {
    grid: grid.map((line) => line.map((cell) => (cell < 0 ? 0 : cell))),
    flashes,
  };
}

function flashGridInPosition(grid: number[][], i: number, j: number) {
  grid[i][j] = Number.MIN_SAFE_INTEGER;
  if (!isOutsideGrid(grid, i + 1, j)) {
    grid[i + 1][j] += 1;
  }
  if (!isOutsideGrid(grid, i - 1, j)) {
    grid[i - 1][j] += 1;
  }
  if (!isOutsideGrid(grid, i, j + 1)) {
    grid[i][j + 1] += 1;
  }
  if (!isOutsideGrid(grid, i, j - 1)) {
    grid[i][j - 1] += 1;
  }
  if (!isOutsideGrid(grid, i + 1, j + 1)) {
    grid[i + 1][j + 1] += 1;
  }
  if (!isOutsideGrid(grid, i + 1, j - 1)) {
    grid[i + 1][j - 1] += 1;
  }
  if (!isOutsideGrid(grid, i - 1, j + 1)) {
    grid[i - 1][j + 1] += 1;
  }
  if (!isOutsideGrid(grid, i - 1, j - 1)) {
    grid[i - 1][j - 1] += 1;
  }
}

function isOutsideGrid(grid: number[][], i: number, j: number) {
  return j < 0 || i < 0 || j >= grid[0].length || i >= grid.length;
}

export function calculateNumberOfFlashes(
  input: string[],
  steps: number,
): number {
  let grid = parseGrid(input);
  let totalFlashes = 0;
  for (let i = 0; i < steps; i++) {
    grid = calculateNextEvolution(grid);
    totalFlashes += grid.flashes;
  }

  return totalFlashes;
}

export function getFirstStepWhenAllFlashes(input: string[]): number {
  let grid = parseGrid(input);
  let flashes = 0;
  let step = 0;
  const allFlashing = grid.grid.length * grid.grid[0].length;
  while (flashes < allFlashing) {
    grid = calculateNextEvolution(grid);
    flashes = grid.flashes;
    ++step;
  }

  return step;
}

export async function day11(): Promise<string[]> {
  const lines = await readDayFixture(11);
  return [
    calculateNumberOfFlashes(lines, 100).toString(),
    getFirstStepWhenAllFlashes(lines).toString(),
  ];
}
