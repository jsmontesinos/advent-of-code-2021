import { getPopulation } from '../src/day6';

describe('day 6', () => {
  describe('part 1', () => {
    it('should return 1 fish, decrementing counter for 1 day', () => {
      expect(getPopulation([3], 1)).toEqual([2]);
    });
    it.skip('should return 26 fish after 18 days', () => {
      expect(getPopulation([3, 4, 3, 1, 2], 18)).toEqual([
        6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8,
        8, 8,
      ]);
    });

    it.skip('should return 5934 fish after 80 days', () => {
      expect(getPopulation([3, 4, 3, 1, 2], 80).length).toBe(5934);
    });
  });
});
