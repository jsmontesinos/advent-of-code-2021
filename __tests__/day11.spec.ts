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

    it.skip('should return the right simple next board after step 1', () => {
      expect(calculateNextEvolution(simpleExample)).toEqual({
        grid: ['34543', '40004', '50005', '40004', '34543'],
        flashes: 8,
      });
    });
    it.skip('should return the right simple next board after step 2', () => {
      expect(calculateNextEvolution(simpleExample)).toEqual({
        grid: ['45654', '51115', '61116', '51115', '45654'],
        flashes: 0,
      });
    });
    it.skip('should return 1656 flashes in 100 steps for largeExample', () => {
      expect(calculateNumberOfFlashes(largeExample, 100)).toBe(1656);
    });
  });
});
