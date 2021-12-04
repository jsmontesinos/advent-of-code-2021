import {
  BingoGameResolver,
  getScoreFromLastWinBoard,
  parseBingo,
  resolveBingoScore,
} from '../src/day4';

const fullExampleInput = [
  '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1',
  '',
  '22 13 17 11  0',
  '8  2 23  4 24',
  '21  9 14 16  7',
  '6 10  3 18  5',
  '1 12 20 15 19',
  '',
  '3 15  0  2 22',
  '9 18 13 17  5',
  '19  8  7 25 23',
  '20 11 10 24  4',
  '14 21 16 12  6',
  '',
  '14 21 17 24  4',
  '10 16 15  9 19',
  '18  8 23 26 20',
  '22 11 13  6  5',
  '2  0 12  3  7',
];

describe('day 4', () => {
  describe('parsing', () => {
    it('should return a line of number and an empty list of boards', () => {
      const input = ['1,2,17,15'];

      expect(parseBingo(input)).toEqual({
        gameNumbers: [1, 2, 17, 15],
        boards: [],
      });
    });

    it('should return a single board', () => {
      const input = [
        '1,2,17,15',
        '',
        '22 13 17 11  0',
        '8  2 23  4 24',
        '21  9 14 16  7',
        '6 10  3 18  5',
        '1 12 20 15 19',
      ];

      expect(parseBingo(input)).toEqual({
        gameNumbers: [1, 2, 17, 15],
        boards: [
          [
            [22, 13, 17, 11, 0],
            [8, 2, 23, 4, 24],
            [21, 9, 14, 16, 7],
            [6, 10, 3, 18, 5],
            [1, 12, 20, 15, 19],
          ],
        ],
      });
    });

    it('should return two board game', () => {
      const input = [
        '1,2,17,15',
        '',
        '22 13 17 11  0',
        '8  2 23  4 24',
        '21  9 14 16  7',
        '6 10  3 18  5',
        '1 12 20 15 19',
        '',
        '23 13 17 11  0',
        '0  2 23  4 24',
        '21  9 14 16  7',
        '6 10  3 18  5',
        '1 12 20 15 20',
      ];

      expect(parseBingo(input)).toEqual({
        gameNumbers: [1, 2, 17, 15],
        boards: [
          [
            [22, 13, 17, 11, 0],
            [8, 2, 23, 4, 24],
            [21, 9, 14, 16, 7],
            [6, 10, 3, 18, 5],
            [1, 12, 20, 15, 19],
          ],
          [
            [23, 13, 17, 11, 0],
            [0, 2, 23, 4, 24],
            [21, 9, 14, 16, 7],
            [6, 10, 3, 18, 5],
            [1, 12, 20, 15, 20],
          ],
        ],
      });
    });
  });
  describe('part 1', () => {
    it('should return numbers needed to fullfil a single board', () => {
      const input = [
        '6,1,10,3,15,18,5,22,13',
        '',
        '22 13 17 11  0',
        '8  2 23  4 24',
        '21  9 14 16  7',
        '6 10  3 18  5',
        '1 12 20 15 19',
      ];

      const game = new BingoGameResolver(parseBingo(input));
      expect(game.play()).toEqual({
        winningNumbers: [6, 1, 10, 3, 15, 18, 5],
        state: [
          [
            { value: 22, selected: false },
            { value: 13, selected: false },
            { value: 17, selected: false },
            { value: 11, selected: false },
            { value: 0, selected: false },
          ],
          [
            { value: 8, selected: false },
            { value: 2, selected: false },
            { value: 23, selected: false },
            { value: 4, selected: false },
            { value: 24, selected: false },
          ],
          [
            { value: 21, selected: false },
            { value: 9, selected: false },
            { value: 14, selected: false },
            { value: 16, selected: false },
            { value: 7, selected: false },
          ],
          [
            { value: 6, selected: true },
            { value: 10, selected: true },
            { value: 3, selected: true },
            { value: 18, selected: true },
            { value: 5, selected: true },
          ],
          [
            { value: 1, selected: true },
            { value: 12, selected: false },
            { value: 20, selected: false },
            { value: 15, selected: true },
            { value: 19, selected: false },
          ],
        ],
      });
    });
    it('should return 4512 as result from a full bingo example', () => {
      expect(resolveBingoScore(fullExampleInput)).toBe(4512);
    });
  });

  describe('part 2', () => {
    it('should let the octupus win in the full example', () => {
      expect(getScoreFromLastWinBoard(fullExampleInput)).toBe(1924);
    });
  });
});
