import {
  calculateSuggestionPoints,
  getMiddleScoreForSuggestions,
  parseLineChunks,
  sumPointsForCorruptedLines,
} from '../src/day10';

const exampleInput = [
  '[({(<(())[]>[[{[]{<()<>>',
  '[(()[<>])]({[<{<<[]>>(',
  '{([(<{}[<>[]}>{[]{[(<()>',
  '(((({<>}<{<{<>}{[]{[]{}',
  '[[<[([]))<([[{}[[()]]]',
  '[{[{({}]{}}([{[{{{}}([]',
  '{<[[]]>}<{[{[{[]{()[[[]',
  '[<(<(<(<{}))><([]([]()',
  '<{([([[(<>()){}]>(<<{{',
  '<{([{{}}[<[[[<>{}]]]>[]]',
];

describe('day10', () => {
  describe('part1', () => {
    it('should return corrupted ] for {([(<{}[<>[]}>{[]{[(<()> parsing', () => {
      expect(parseLineChunks(exampleInput[2])).toEqual({
        status: 'corrupted',
        error: { expected: ']', found: '}', position: 12 },
      });
    });
    it('should return corrupted ] for [[<[([]))<([[{}[[()]]] parsing', () => {
      expect(parseLineChunks(exampleInput[4])).toEqual({
        status: 'corrupted',
        error: { expected: ']', found: ')', position: 8 },
      });
    });
    it('should resolve 26397 points for example Input', () => {
      expect(sumPointsForCorruptedLines(exampleInput)).toBe(26397);
    });
  });
  describe('part2', () => {
    describe('parseLineChunks()', () => {
      it('should return }}]])})] for [({(<(())[]>[[{[]{<()<>>', () => {
        expect(parseLineChunks(exampleInput[0])).toEqual({
          status: 'incomplete',
          suggestion: '}}]])})]',
        });
      });
      it('should return )}>]}) for [(()[<>])]({[<{<<[]>>(', () => {
        expect(parseLineChunks(exampleInput[1])).toEqual({
          status: 'incomplete',
          suggestion: ')}>]})',
        });
      });
      it('should return }}>}>)))) for (((({<>}<{<{<>}{[]{[]{}', () => {
        expect(parseLineChunks(exampleInput[3])).toEqual({
          status: 'incomplete',
          suggestion: '}}>}>))))',
        });
      });
    });
    describe('calculateSuggestionPoints', () => {
      it('should return 288957 for suggestion }}]])})]', () => {
        expect(calculateSuggestionPoints('}}]])})]')).toBe(288957);
      });
      it('should return 5566 for suggestion )}>]})', () => {
        expect(calculateSuggestionPoints(')}>]})')).toBe(5566);
      });
    });
    describe('getMiddleScoreForSuggestions', () => {
      it('should return middle score 288957', () => {
        expect(getMiddleScoreForSuggestions(exampleInput)).toBe(288957);
      });
    });
  });
});
