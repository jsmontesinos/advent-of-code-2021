import { readyDayFixture, splitInGroups, transposeMatrix } from './day-common';

type Bingo = { gameNumbers: number[]; boards: BingoBoard[] };
type BingoBoard = number[][];
type BoardState = { value: number; selected: boolean }[][];
type BingoGame = { winningNumbers: number[]; state: BoardState };

class BingoBoardResolver {
  private boardState: BoardState;

  constructor(board: BingoBoard) {
    this.boardState = board.map((line) =>
      line.map((field) => ({ value: field, selected: false })),
    );
  }

  public getBoard(): BingoBoard {
    return this.boardState.map((line) => line.map((field) => field.value));
  }

  public getState(): BoardState {
    return this.boardState;
  }

  public play(playedNumber: number): void {
    this.boardState = this.boardState.map((line) =>
      line.map((field) => ({
        ...field,
        selected: field.selected || field.value === playedNumber,
      })),
    );
  }

  public wins(): boolean {
    return (
      this.someLineWins(this.boardState) ||
      this.someLineWins(transposeMatrix(this.boardState))
    );
  }

  private someLineWins(state: BoardState) {
    return state.some((line) => line.every((field) => field.selected));
  }
}

export function parseBingo(input: string[]): Bingo {
  return {
    gameNumbers: input[0].split(',').map((s) => parseInt(s, 10)),
    boards: splitInGroups(input.slice(2)).map((g) =>
      g.map((l) => l.split(/\s+/).map((n) => parseInt(n, 10))),
    ),
  };
}

export class BingoGameResolver {
  private boards: BingoBoardResolver[];

  constructor(private bingo: Bingo) {
    this.boards = bingo.boards.map((board) => new BingoBoardResolver(board));
  }

  public play(): BingoGame {
    for (
      let gameNumberIndex = 0;
      gameNumberIndex < this.bingo.gameNumbers.length;
      gameNumberIndex++
    ) {
      for (const resolver of this.boards) {
        resolver.play(this.bingo.gameNumbers[gameNumberIndex]);
        if (resolver.wins()) {
          return {
            winningNumbers: this.bingo.gameNumbers.slice(
              0,
              gameNumberIndex + 1,
            ),
            state: resolver.getState(),
          };
        }
      }
    }

    return null;
  }

  public playToLose(): BingoGame {
    const winnerBoards: BingoBoardResolver[] = [];
    let gameNumberIndex = 0;
    while (gameNumberIndex < this.bingo.gameNumbers.length) {
      for (const resolver of this.boards) {
        if (!resolver.wins()) {
          resolver.play(this.bingo.gameNumbers[gameNumberIndex]);
          if (resolver.wins()) {
            winnerBoards.push(resolver);
          }
        }
      }
      if (this.boards.length === winnerBoards.length) {
        break;
      }
      ++gameNumberIndex;
    }
    return {
      winningNumbers: this.bingo.gameNumbers.slice(0, gameNumberIndex + 1),
      state: winnerBoards[winnerBoards.length - 1].getState(),
    };
  }
}

export function resolveBingoScore(lines: string[]): number {
  const game = new BingoGameResolver(parseBingo(lines));
  return getScoreForBoardState(game.play());
}

export function getScoreFromLastWinBoard(lines: string[]): number {
  const game = new BingoGameResolver(parseBingo(lines));
  return getScoreForBoardState(game.playToLose());
}

function getScoreForBoardState(game: BingoGame): number {
  return (
    game.state.reduce(
      (acc, current) =>
        acc +
        current
          .filter((cell) => !cell.selected)
          .reduce((acc, current) => acc + current.value, 0),
      0,
    ) * game.winningNumbers[game.winningNumbers.length - 1]
  );
}

export async function day4(): Promise<string[]> {
  const lines = await readyDayFixture(4);
  return [
    resolveBingoScore(lines).toString(),
    getScoreFromLastWinBoard(lines).toString(),
  ];
}
