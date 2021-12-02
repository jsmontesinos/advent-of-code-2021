import { processInputInstructions } from '../src/day2';
import { processInputInstructionsWithAim } from '../src/day2-part2';

const simpleInput = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2',
];

describe('day2', () => {
  describe('part 1', () => {
    it('should return 150 for an example input', () => {
      expect(processInputInstructions(simpleInput)).toEqual({
        horizontal: 15,
        depth: 10,
      });
    });
  });
  describe('part 2', () => {
    it('should return 900 for an example input', () => {
      expect(processInputInstructionsWithAim(simpleInput)).toEqual({
        aim: 10,
        horizontal: 15,
        depth: 60,
      });
    });
  });
});
