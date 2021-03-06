import {
  calculateBasin,
  calculateRiskLevel,
  locateLowPoints,
  multiplyThreeLargerBasins,
  parseToHeightMap,
} from '../src/day9';

describe('day 9', () => {
  const example = [
    '2199943210',
    '3987894921',
    '9856789892',
    '8767896789',
    '9899965678',
  ];
  describe('part 1', () => {
    describe('locateLowPoints()', () => {
      it('should locate a low height position in string 9808', () => {
        expect(locateLowPoints(parseToHeightMap(['9808']))).toEqual([
          { x: 2, y: 0, height: 0 },
        ]);
      });
      it('should locate three low height position in two string 9808, 9080', () => {
        expect(locateLowPoints(parseToHeightMap(['9308', '9580']))).toEqual([
          { x: 2, y: 0, height: 0 },
          { x: 3, y: 1, height: 0 },
        ]);
      });
      it('should localize low height points in day 9 example', () => {
        expect(locateLowPoints(parseToHeightMap(example))).toEqual([
          { x: 1, y: 0, height: 1 },
          { x: 9, y: 0, height: 0 },
          { x: 2, y: 2, height: 5 },
          { x: 6, y: 4, height: 5 },
        ]);
      });
      it('should calculate risk level for day 9 example', () => {
        expect(
          calculateRiskLevel(locateLowPoints(parseToHeightMap(example))),
        ).toBe(15);
      });
    });
  });
  describe('part 2', () => {
    describe('calculateBasin()', () => {
      it('should calculate top left basin for example', () => {
        expect(
          calculateBasin(parseToHeightMap(example), { x: 1, y: 0, height: 1 }),
        ).toEqual([
          { x: 1, y: 0, height: 1 },
          { x: 0, y: 0, height: 2 },
          { x: 0, y: 1, height: 3 },
        ]);
      });
    });
    describe('multiplyThreeLargerBasins', () => {
      it('should return 1134 for example', () => {
        expect(multiplyThreeLargerBasins(parseToHeightMap(example))).toBe(1134);
      });
    });
  });
});
