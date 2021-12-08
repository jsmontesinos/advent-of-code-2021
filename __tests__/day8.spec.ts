import { countUniqueSegmentInstances } from '../src/day8';

describe('day 8', () => {
  describe('part 1', () => {
    const exampleInput = [
      'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
      'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
      'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
      'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
      'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
      'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
      'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
      'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
      'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
      'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce',
    ];

    it('should get 0 number of unique segment instances in a | cedba cedbg cedba', () => {
      expect(countUniqueSegmentInstances(['a | cedba cedbg cedba'])).toBe(0);
    });

    it('should get 1 number of unique segment instances in a | ce cedbg cedba', () => {
      expect(countUniqueSegmentInstances(['a | ce cedbg cedba'])).toBe(1);
    });

    it.skip('should get number of unique segment instances in example input', () => {
      expect(countUniqueSegmentInstances(exampleInput)).toBe(26);
    });
  });
});
