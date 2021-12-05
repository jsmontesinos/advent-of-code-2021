import { computePointsOverlapping, parseHydrothermalLines } from '../src/day5';

describe('day1', () => {
  describe('parseHydrothermalLines', () => {
    it('should parse an input of just one line', () => {
      const input = ['1,1 -> 1,3'];
      expect(parseHydrothermalLines(input)).toEqual([
        { start: { x: 1, y: 1 }, end: { x: 1, y: 3 } },
      ]);
    });
  });

  describe('part1', () => {
    const inputExample = [
      '0,9 -> 5,9',
      '8,0 -> 0,8',
      '9,4 -> 3,4',
      '2,2 -> 2,1',
      '7,0 -> 7,4',
      '6,4 -> 2,0',
      '0,9 -> 2,9',
      '3,4 -> 1,4',
      '0,0 -> 8,8',
      '5,5 -> 8,2',
    ];
    it.skip('should return 5 points overlaping', () => {
      expect(computePointsOverlapping(inputExample)).toBe(5);
    });
  });
});
