import { readDayFixture } from './day-common';

type ParsingResult =
  | CorruptedParsingResult
  | IncompleteParsingResult
  | ValidParsingResult;

type CorruptedParsingResult = {
  status: 'corrupted';
  error: { expected: TokenSymbol; found: TokenSymbol; position: number };
};

type IncompleteParsingResult = {
  status: 'incomplete';
};

type ValidParsingResult = {
  status: 'valid';
};

type ChunkType = 'parentheses' | 'brackets' | 'curlyBrackets' | 'compare';
type ChunkAction = 'open' | 'close';
type TokenSymbol = '{' | '}' | '[' | ']' | '(' | ')' | '<' | '>';
type TokenDefinition = {
  symbol: TokenSymbol;
  type: ChunkType;
  action: ChunkAction;
  points?: number;
};

const tokenList: TokenDefinition[] = [
  { symbol: '{', type: 'curlyBrackets', action: 'open' },
  { symbol: '}', type: 'curlyBrackets', action: 'close', points: 1197 },
  { symbol: '[', type: 'brackets', action: 'open' },
  { symbol: ']', type: 'brackets', action: 'close', points: 57 },
  { symbol: '(', type: 'parentheses', action: 'open' },
  { symbol: ')', type: 'parentheses', action: 'close', points: 3 },
  { symbol: '<', type: 'compare', action: 'open' },
  { symbol: '>', type: 'compare', action: 'close', points: 25137 },
];

const tokenMap: { [key in TokenSymbol]: TokenDefinition } = tokenList.reduce(
  (acc, current) => ({ ...acc, [current.symbol]: current }),
  {} as { [key in TokenSymbol]: TokenDefinition },
);

function findClosingFor(token: TokenDefinition): TokenDefinition {
  return tokenList.find((v) => v.type === token.type && v.action === 'close');
}

function isCorruptedParsingResult(
  result: ParsingResult,
): result is CorruptedParsingResult {
  return result.status === 'corrupted';
}
export function sumPointsForCorruptedLines(input: string[]): number {
  return input
    .map(parseLineChunks)
    .filter(isCorruptedParsingResult)
    .map((result) => tokenMap[result.error.found].points)
    .reduce((acc, current) => acc + current, 0);
}

export function parseLineChunks(input: string): ParsingResult {
  const tokens = input.split('');
  const delimiterQueue: TokenDefinition[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokenMap[tokens[i]];
    if (token.action === 'open') {
      delimiterQueue.push(token);
    } else {
      if (token.type === delimiterQueue[delimiterQueue.length - 1].type) {
        delimiterQueue.pop();
      } else {
        const rightClosing = findClosingFor(
          delimiterQueue[delimiterQueue.length - 1],
        );
        return {
          status: 'corrupted',
          error: {
            found: token.symbol,
            expected: rightClosing.symbol,
            position: i,
          },
        };
      }
    }
  }

  return { status: 'valid' };
}

export async function day10(): Promise<string[]> {
  const lines = await readDayFixture(10);
  return [sumPointsForCorruptedLines(lines).toString()];
}
