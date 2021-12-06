import { readyDayFixture } from '../src/day-common';
import { getPopulation, getPopulationLength } from '../src/day6';

describe('day 6', () => {
  describe('part 1', () => {
    it('should return 1 fish, decrementing counter for 1 day', () => {
      expect(getPopulation([3], 1)).toEqual([2]);
    });
    it('should return 2 fish, decrementing counter for 1 day', () => {
      expect(getPopulation([3, 4], 1)).toEqual([2, 3]);
    });
    it('should return 2 fish if 1 fish has produced another', () => {
      expect(getPopulation([3], 4)).toEqual([6, 8]);
    });
    it('should return 26 fish after 18 days', () => {
      expect(getPopulation([3, 4, 3, 1, 2], 18)).toEqual([
        6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8,
        8, 8,
      ]);
    });

    it('should return 5934 fish after 80 days', () => {
      expect(getPopulationLength([3, 4, 3, 1, 2], 80)).toBe(5934);
    });

    it('should return 657 fish after 2 days for example input', async () => {
      const input = await returnExampleDay6();
      expect(getPopulationLength(input, 2)).toBe(357);
    });

    it('should grow up to 727 fish after 3 days for example input', async () => {
      const input = await returnExampleDay6();
      expect(getPopulationLength(input, 2)).toBe(357);
    });
  });
});

async function returnExampleDay6() {
  return (await readyDayFixture(6))[0].split(',').map((n) => parseInt(n, 10));
}
