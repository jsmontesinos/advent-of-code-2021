import { calculateNumberOfCavePaths, calculateCavePaths } from '../src/day12';

const simpleExample = [
  'start-A',
  'start-b',
  'A-c',
  'A-b',
  'b-d',
  'A-end',
  'b-end',
];

const largerExample = [
  'dc-end',
  'HN-start',
  'start-kj',
  'dc-start',
  'dc-HN',
  'LN-dc',
  'HN-end',
  'kj-sa',
  'kj-HN',
  'kj-dc',
];

const evenLargerExample = [
  'fs-end',
  'he-DX',
  'fs-he',
  'start-DX',
  'pj-DX',
  'end-zg',
  'zg-sl',
  'zg-pj',
  'pj-he',
  'RW-he',
  'fs-DX',
  'pj-RW',
  'zg-RW',
  'start-pj',
  'he-WI',
  'zg-he',
  'pj-fs',
  'start-RW',
];

describe('day 12', () => {
  describe('part 1', () => {
    it('should return 1 for most simple path: start-end', () => {
      expect(calculateNumberOfCavePaths(['start-end'])).toBe(1);
    });
    it('should return 1 for example: start-a, a-end', () => {
      expect(calculateNumberOfCavePaths(['start-a', 'a-end'])).toBe(1);
    });
    it('should return 2 for example: start-a, a-end, start-end', () => {
      expect(
        calculateNumberOfCavePaths(['start-a', 'a-end', 'start-end']),
      ).toBe(2);
    });
    it('should return possible paths for example: start-a, a-end, start-end', () => {
      expect(calculateCavePaths(['start-a', 'a-end', 'start-end'])).toEqual([
        'start-a-end',
        'start-end',
      ]);
    });
    it('should return possible paths for example: start-a, a-end, start-b, b-end, a-b, b-d', () => {
      expect(
        calculateCavePaths([
          'start-a',
          'a-end',
          'a-b',
          'b-d',
          'b-end',
          'start-b',
        ]),
      ).toEqual([
        'start-a-end',
        'start-a-b-end',
        'start-b-a-end',
        'start-b-end',
      ]);
    });
    it('should return possible paths for example with uppercase character: start-a, a-end, start-B, B-end, a-B, B-d', () => {
      expect(
        calculateCavePaths([
          'start-a',
          'a-end',
          'a-B',
          'B-d',
          'B-end',
          'start-B',
        ]),
      ).toEqual([
        'start-a-end',
        'start-a-B-d-B-end',
        'start-a-B-end',
        'start-B-a-end',
        'start-B-a-B-d-B-end',
        'start-B-a-B-end',
        'start-B-d-B-a-end',
        'start-B-d-B-a-B-end',
        'start-B-d-B-end',
        'start-B-end',
      ]);
    });
    it('should return 10 paths for simpleExample', () => {
      expect(calculateNumberOfCavePaths(simpleExample)).toBe(10);
    });

    it('should return 19 paths for largerExample', () => {
      expect(calculateNumberOfCavePaths(largerExample)).toBe(19);
    });

    it('should return 226 paths for evenLargerExample', () => {
      expect(calculateNumberOfCavePaths(evenLargerExample)).toBe(226);
    });
  });
});
