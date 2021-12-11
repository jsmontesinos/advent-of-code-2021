import {
  calculateNextStep,
  calculateNumberOfFlashes,
  getFirstStepWhenAllFlashes,
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
      expect(calculateNextStep(parseGrid(['10', '01']))).toEqual({
        grid: [
          [2, 1],
          [1, 2],
        ],
        flashes: 0,
      });
    });

    it('should evolute 1 step a simple board with 1 flash', () => {
      expect(calculateNextStep(parseGrid(['10', '09']))).toEqual({
        grid: [
          [3, 2],
          [2, 0],
        ],
        flashes: 1,
      });
    });

    it('should return the right simple next board after step 1', () => {
      expect(calculateNextStep(parseGrid(simpleExample))).toEqual({
        grid: [
          [3, 4, 5, 4, 3],
          [4, 0, 0, 0, 4],
          [5, 0, 0, 0, 5],
          [4, 0, 0, 0, 4],
          [3, 4, 5, 4, 3],
        ],
        flashes: 9,
      });
    });

    it('should return 1656 flashes in 100 steps for largeExample', () => {
      expect(calculateNumberOfFlashes(largeExample, 100)).toBe(1656);
    });
  });

  describe('part2', () => {
    describe('getFirstStepWhenAllFlashes', () => {
      it('should return 195 as first step with all octopuses flashing', () => {
        expect(getFirstStepWhenAllFlashes(largeExample)).toBe(195);
      });
    });
  });
});
