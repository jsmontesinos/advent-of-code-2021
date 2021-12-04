import {
  getCO2ScrubberRating,
  getEpsilon,
  getGamma,
  getOxygenGeneratorRange,
} from '../src/day3';

const dayExampleInput = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

describe('day3', () => {
  describe('part 1', () => {
    describe('getGamma', () => {
      it('should return 00100 for a 00100 input', () => {
        expect(getGamma(['00100'])).toBe('00100');
      });

      it('should return 11110 for a 11110 input', () => {
        expect(getGamma(['11110'])).toBe('11110');
      });

      it('should return 10110 for a [00100, 11110, 10110] input', () => {
        expect(getGamma(['00100', '11110', '10110'])).toBe('10110');
      });

      it('should return 10110 for a large input', () => {
        const input = [
          '00100',
          '11110',
          '10110',
          '10111',
          '10101',
          '01111',
          '00111',
          '11100',
          '10000',
          '11001',
          '00010',
          '01010',
        ];
        expect(getGamma(input)).toBe('10110');
      });
    });
    describe('getEpsilon', () => {
      it('should return 10110 for a large input', () => {
        expect(getEpsilon(dayExampleInput)).toBe('01001');
      });
    });
  });

  describe('part 2', () => {
    describe('getOxygenGeneratorRange', () => {
      it('should return first value when array length is 1', () => {
        expect(getOxygenGeneratorRange(['00100'])).toBe('00100');
      });

      it('should return 10110 for a [00100, 11110, 10110] input', () => {
        expect(getOxygenGeneratorRange(['00100', '11110', '10110'])).toBe(
          '11110',
        );
      });

      it('should return 10111 if input is dayExampleInput', () => {
        expect(getOxygenGeneratorRange(dayExampleInput)).toBe('10111');
      });
    });
    describe('getCO2ScrubberRating', () => {
      it('should return first value when array length is 1', () => {
        expect(getCO2ScrubberRating(['00100'])).toBe('00100');
      });

      it('should return 10110 for a [00100, 11110, 10110] input', () => {
        expect(getCO2ScrubberRating(['00100', '11110', '10110'])).toBe('00100');
      });

      it('should return 01010 if input is dayExampleInput', () => {
        expect(getCO2ScrubberRating(dayExampleInput)).toBe('01010');
      });
    });
  });
});
