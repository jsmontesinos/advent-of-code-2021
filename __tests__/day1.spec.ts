import {
  depthIncreaseCounter,
  threeMeasurementWindowIncreaseCounter,
} from '../src/day1';

describe('day1', () => {
  describe('part 1', () => {
    it('should return how many times the depth increases', async () => {
      const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
      expect(await depthIncreaseCounter(input)).toEqual(7);
    });
  });
  describe('part 2', () => {
    it('should return how many times the three measurement window increases', async () => {
      const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
      expect(await threeMeasurementWindowIncreaseCounter(input)).toEqual(5);
    });

    it('should return how many times the three measurement window increases in [1, 2, 4, 3, 4, 5, 3, 3]', async () => {
      const input = [1, 2, 4, 3, 4, 5, 3, 3];
      expect(await threeMeasurementWindowIncreaseCounter(input)).toEqual(3);
    });
  });
});
