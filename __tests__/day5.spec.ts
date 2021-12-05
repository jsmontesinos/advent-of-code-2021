import {
  computePointsOverlapping,
  isHorizontalOrVertical,
  parseHydrothermalLines,
  plotHydrothermalLine,
} from '../src/day5';

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

describe('day1', () => {
  describe('parseHydrothermalLines', () => {
    it('should parse an input of just one line', () => {
      const input = ['1,1 -> 1,3'];
      expect(parseHydrothermalLines(input)).toEqual([
        { start: { x: 1, y: 1 }, end: { x: 1, y: 3 } },
      ]);
    });

    it('should parse an input of two lines', () => {
      const input = ['1,1 -> 1,3', '2,1 -> 1,0'];
      expect(parseHydrothermalLines(input)).toEqual([
        { start: { x: 1, y: 1 }, end: { x: 1, y: 3 } },
        { start: { x: 2, y: 1 }, end: { x: 1, y: 0 } },
      ]);
    });
  });

  describe('plotHydrothermalLine', () => {
    it('should plot all points in an horizontal line', () => {
      const horizontalLine = { start: { x: 1, y: 1 }, end: { x: 1, y: 3 } };
      expect(plotHydrothermalLine(horizontalLine)).toEqual([
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ]);
    });

    it('should plot all points in an horizontal line where end.y < start.y', () => {
      const horizontalLine = { start: { x: 1, y: 4 }, end: { x: 1, y: 1 } };
      expect(plotHydrothermalLine(horizontalLine)).toEqual([
        { x: 1, y: 4 },
        { x: 1, y: 3 },
        { x: 1, y: 2 },
        { x: 1, y: 1 },
      ]);
    });

    it('should plot all points in an vertical line', () => {
      const horizontalLine = { start: { x: 1, y: 1 }, end: { x: 3, y: 1 } };
      expect(plotHydrothermalLine(horizontalLine)).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
      ]);
    });

    it('should plot all points in an vertical line where end.x < start.x', () => {
      const horizontalLine = { start: { x: 4, y: 1 }, end: { x: 1, y: 1 } };
      expect(plotHydrothermalLine(horizontalLine)).toEqual([
        { x: 4, y: 1 },
        { x: 3, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
      ]);
    });

    it('should plot all points in an diagonal line', () => {
      const horizontalLine = { start: { x: 1, y: 1 }, end: { x: 3, y: 3 } };
      expect(plotHydrothermalLine(horizontalLine)).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ]);
    });

    it('should plot all points in an diagonal line for more complex line', () => {
      const horizontalLine = { start: { x: 9, y: 7 }, end: { x: 7, y: 9 } };
      expect(plotHydrothermalLine(horizontalLine)).toEqual([
        { x: 9, y: 7 },
        { x: 8, y: 8 },
        { x: 7, y: 9 },
      ]);
    });
  });

  describe('part1', () => {
    it('should return 5 points overlapping', () => {
      expect(
        computePointsOverlapping(inputExample, isHorizontalOrVertical),
      ).toBe(5);
    });
  });

  describe('part2', () => {
    it('should return 12 points overlapping', () => {
      expect(computePointsOverlapping(inputExample)).toBe(12);
    });
  });
});
