import {
  calculateOverlappingPoints,
  foldPoint,
  parseTransparentOrigami,
} from '../src/day13';

const exampleInput = [
  '6,10',
  '0,14',
  '9,10',
  '0,3',
  '10,4',
  '4,11',
  '6,0',
  '6,12',
  '4,1',
  '0,13',
  '10,12',
  '3,4',
  '3,0',
  '8,4',
  '1,10',
  '2,14',
  '8,10',
  '9,0',
  '',
  'fold along y=7',
  'fold along x=5',
];

describe('day13', () => {
  describe('part1', () => {
    describe('parseTransparentOrigami()', () => {
      it('should parse board and fold instructions', () => {
        const smallBoardAndInstructions = [
          '0,14',
          '0,13',
          '4,11',
          '',
          'fold along y=7',
          'fold along x=5',
        ];
        expect(parseTransparentOrigami(smallBoardAndInstructions)).toEqual({
          points: [
            [0, 14],
            [0, 13],
            [4, 11],
          ],
          folds: [
            ['y', 7],
            ['x', 5],
          ],
        });
      });
    });

    describe('foldPoint()', () => {
      it('should fold a single point along y axis', () => {
        expect(foldPoint([0, 2], ['y', 1])).toEqual([0, 0]);
      });

      it('should not fold a single point along y axis if point is over axis', () => {
        expect(foldPoint([0, 0], ['y', 1])).toEqual([0, 0]);
      });

      it('should fold a single point along x axis', () => {
        expect(foldPoint([2, 0], ['x', 1])).toEqual([0, 0]);
      });
    });

    describe('what thing or calculateOverlappingPoints()', () => {
      it('should solve folding for one point grid', () => {
        expect(calculateOverlappingPoints(['0,0', '', 'fold along y=1'])).toBe(
          1,
        );
      });

      it('should solve folding for two points grid', () => {
        expect(
          calculateOverlappingPoints(['0,0', '1,0', '', 'fold along y=1']),
        ).toBe(2);
      });

      it('should solve folding for two overlapping points grid', () => {
        expect(
          calculateOverlappingPoints(['0,0', '0,2', '', 'fold along y=1']),
        ).toBe(1);
      });

      it('should return 17 as overlapping points for example', () => {
        expect(calculateOverlappingPoints(exampleInput)).toBe(17);
      });
    });
  });
});
