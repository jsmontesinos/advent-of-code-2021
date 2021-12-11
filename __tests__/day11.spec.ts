import {
  calculateNextEvolution,
  calculateNumberOfFlashes,
  parseGrid,
} from '../src/day11';

const simpleExample = ['11111', '19991', '19191', '19991', '11111'];

const largeExample = [
  '5483143223',
  '2745854711',
  '5264556173',
  '6141336146',
  '6357385478',
  '4167524645',
  '2176841721',
  '6882881134',
  '4846848554',
  '5283751526',
];

describe('day1', () => {
  describe('part1', () => {
    it('should parse the simpleExample board and return a step 0 grid', () => {
      expect(parseGrid(simpleExample)).toEqual({
        grid: [
          [1, 1, 1, 1, 1],
          [1, 9, 9, 9, 1],
          [1, 9, 1, 9, 1],
          [1, 9, 9, 9, 1],
          [1, 1, 1, 1, 1],
        ],
        flashes: 0,
      });
    });

    it('should evolute 1 step a simple board without flashing', () => {
      expect(calculateNextEvolution(parseGrid(['10', '01']))).toEqual({
        grid: [
          [2, 1],
          [1, 2],
        ],
        flashes: 0,
      });
    });

    it.skip('should return the right simple next board after step 1', () => {
      expect(calculateNextEvolution(parseGrid(simpleExample))).toEqual({
        grid: [
          [3, 4, 5, 4, 3],
          [4, 0, 0, 0, 4],
          [5, 0, 0, 0, 5],
          [4, 0, 0, 0, 4],
          [3, 4, 5, 4, 3],
        ],
        flashes: 8,
      });
    });

    it.skip('should return the right simple next board after step 2', () => {
      expect(calculateNextEvolution(parseGrid(simpleExample))).toEqual({
        grid: [
          [4, 5, 6, 5, 4],
          [5, 1, 1, 1, 5],
          [6, 1, 1, 1, 6],
          [5, 1, 1, 1, 5],
          [4, 5, 6, 5, 4],
        ],
        flashes: 0,
      });
    });
    it.skip('should return 1656 flashes in 100 steps for largeExample', () => {
      expect(calculateNumberOfFlashes(largeExample, 100)).toBe(1656);
    });
  });
});
