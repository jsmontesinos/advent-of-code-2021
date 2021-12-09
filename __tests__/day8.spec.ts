import {
  countUniqueSegmentInstances,
  decodeAll,
  decodeLine,
  getSegmentDecoder,
  getSegmentTable,
} from '../src/day8';

const simpleExampleInput =
  'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf';
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

describe('day 8', () => {
  describe('part 1', () => {
    it('should get 0 number of unique segment instances in a | cedba cedbg cedba', () => {
      expect(countUniqueSegmentInstances(['a | cedba cedbg cedba'])).toBe(0);
    });

    it('should get 0 number of unique segment instances in simple example input', () => {
      expect(countUniqueSegmentInstances([simpleExampleInput])).toBe(0);
    });

    it('should detect 1 in a | ce cedbg cedba', () => {
      expect(countUniqueSegmentInstances(['a | ce cedbg cedba'])).toBe(1);
    });

    it('should detect 8 in a | ce acedbg cedba', () => {
      expect(countUniqueSegmentInstances(['a | ce acedbfg cedba'])).toBe(2);
    });

    it('should detect 7 in a | ceb acedb cedba', () => {
      expect(countUniqueSegmentInstances(['a | ceb acedb cedba'])).toBe(1);
    });

    it('should detect 4 in a | ceba acedb cedba', () => {
      expect(countUniqueSegmentInstances(['a | ceba acedb cedba'])).toBe(1);
    });

    it('should detect 4 and 7 in a | ceb acedb cedba, a | ceba acedb cedba', () => {
      expect(
        countUniqueSegmentInstances([
          'a | ceba acedb cedba',
          'a | ceb acedb cedba',
        ]),
      ).toBe(2);
    });

    it('should get number of unique segment instances in example input', () => {
      expect(countUniqueSegmentInstances(exampleInput)).toBe(26);
    });
  });

  describe('part 2', () => {
    describe('getSegmentTable', () => {
      it('should infer segments for simpleExampleInput segment', () => {
        const segmentTable = getSegmentTable(simpleExampleInput);

        expect(segmentTable.get('a')).toBe('d');
        expect(segmentTable.get('c')).toBe('a');
        expect(segmentTable.get('f')).toBe('b');
        expect(segmentTable.get('e')).toBe('g');
        expect(segmentTable.get('d')).toBe('f');
        expect(segmentTable.get('b')).toBe('e');
        expect(segmentTable.get('g')).toBe('c');
      });

      it('should infer segments for exampleInput[3] segment', () => {
        const segmentTable = getSegmentTable(exampleInput[3]);

        expect(segmentTable.get('a')).toBe('d');
        expect(segmentTable.get('c')).toBe('b');
        expect(segmentTable.get('f')).toBe('c');
        expect(segmentTable.get('e')).toBe('g');
        expect(segmentTable.get('d')).toBe('a');
        expect(segmentTable.get('b')).toBe('f');
        expect(segmentTable.get('g')).toBe('e');
      });
    });
    describe('getDecodingTable', () => {
      it('should return decoding table for simple example', () => {
        const decoder = getSegmentDecoder(simpleExampleInput);

        expect(decoder('acedgfb')).toBe(8);
        expect(decoder('cdfbe')).toBe(5);
        expect(decoder('gcdfa')).toBe(2);
        expect(decoder('fbcad')).toBe(3);
        expect(decoder('dab')).toBe(7);
        expect(decoder('cefabd')).toBe(9);
        expect(decoder('cdfgeb')).toBe(6);
        expect(decoder('eafb')).toBe(4);
        expect(decoder('cagedb')).toBe(0);
        expect(decoder('ab')).toBe(1);
      });
    });
    describe('decodeDisplay', () => {
      it('should decode all lines and return 5353 for simple example first line', () => {
        expect(decodeLine(simpleExampleInput)).toBe(5353);
      });

      exampleInput.forEach((line) => {
        it(`should return a numeric value for line ${line}`, () => {
          expect(decodeLine(line)).toBeGreaterThan(0);
        });
      });

      it('should decode all lines and return 5353 for simple example', () => {
        expect(decodeAll([simpleExampleInput])).toBe(5353);
      });

      it('should decode all lines and return 61229 for larger example', () => {
        expect(decodeAll(exampleInput)).toBe(61229);
      });
    });
  });
});
