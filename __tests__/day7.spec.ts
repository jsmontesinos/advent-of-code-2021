import {
  getFuelDistanceBetweenTwoValues,
  getFuelNeededForCrabSubmarines,
  getFuelNeededForCrabSubmarinesWithIncrementalDistanceFunction,
  getLessFuelPositionForCrabSubmarines,
} from '../src/day7';

describe('day 7', () => {
  describe('part 1', () => {
    it('should return 5 as less fuel position', () => {
      expect(
        getLessFuelPositionForCrabSubmarines([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      ).toBe(5);
    });
    it('should return 2 as less fuel position', () => {
      expect(
        getLessFuelPositionForCrabSubmarines([16, 1, 2, 0, 4, 2, 7, 1, 2, 14]),
      ).toBe(2);
    });
    it('should return 3 as less fuel position when there are two less positions', () => {
      expect(
        getLessFuelPositionForCrabSubmarines([16, 1, 3, 0, 4, 2, 7, 1, 2, 14]),
      ).toBe(3);
    });
    it('should return 37 fuel units  for example input array', () => {
      expect(
        getFuelNeededForCrabSubmarines([16, 1, 2, 0, 4, 2, 7, 1, 2, 14]),
      ).toBe(37);
    });
  });

  describe('part 2', () => {
    [
      [1, 5, 10],
      [3, 10, 28],
      [2, 5, 6],
    ].forEach((example) => {
      it(`should return ${example[2]} distance for ${example[0]} to ${example[1]}`, () => {
        expect(getFuelDistanceBetweenTwoValues(example[0], example[1])).toBe(
          example[2],
        );
      });
    });
    it('should return 168 fuel units with incremental fuel distance function', () => {
      expect(
        getFuelNeededForCrabSubmarinesWithIncrementalDistanceFunction([
          16, 1, 2, 0, 4, 2, 7, 1, 2, 14,
        ]),
      ).toBe(168);
    });
  });
});
