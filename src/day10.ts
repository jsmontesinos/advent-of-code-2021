import { readDayFixture } from './day-common';

type ParsingResult =
  | CorruptedParsingResult
  | IncompleteParsingResult
  | ValidParsingResult;

type CorruptedParsingResult = {
  status: 'corrupted';
  error: {
    expected: ClosingTokenSymbol;
    found: ClosingTokenSymbol;
    position: number;
  };
};

type IncompleteParsingResult = {
  status: 'incomplete';
  suggestion: string;
};

type ValidParsingResult = {
  status: 'valid';
};

type ChunkType = 'parentheses' | 'brackets' | 'curlyBrackets' | 'compare';
type ChunkAction = 'open' | 'close';
type OpeningTokenSymbol = '{' | '[' | '(' | '<';
type ClosingTokenSymbol = '}' | ']' | ')' | '>';
type TokenSymbol = OpeningTokenSymbol | ClosingTokenSymbol;

type OpeningTokenDefinition = {
  symbol: OpeningTokenSymbol;
  type: ChunkType;
  action: ChunkAction;
};

type ClosingTokenDefinition = {
  symbol: ClosingTokenSymbol;
  type: ChunkType;
  action: ChunkAction;
  points: number;
  suggestionPoints: number;
};

type TokenDefinition = OpeningTokenDefinition | ClosingTokenDefinition;

const openingTokenList: OpeningTokenDefinition[] = [
  { symbol: '{', type: 'curlyBrackets', action: 'open' },
  { symbol: '[', type: 'brackets', action: 'open' },
  { symbol: '(', type: 'parentheses', action: 'open' },
  { symbol: '<', type: 'compare', action: 'open' },
];

const closingTokenList: ClosingTokenDefinition[] = [
  {
    symbol: '}',
    type: 'curlyBrackets',
    action: 'close',
    points: 1197,
    suggestionPoints: 3,
  },

  {
    symbol: ']',
    type: 'brackets',
    action: 'close',
    points: 57,
    suggestionPoints: 2,
  },

  {
    symbol: ')',
    type: 'parentheses',
    action: 'close',
    points: 3,
    suggestionPoints: 1,
  },

  {
    symbol: '>',
    type: 'compare',
    action: 'close',
    points: 25137,
    suggestionPoints: 4,
  },
];

const closingTokenMap: { [key in TokenSymbol]: ClosingTokenDefinition } =
  closingTokenList.reduce(
    (acc, current) => ({ ...acc, [current.symbol]: current }),
    {} as { [key in TokenSymbol]: ClosingTokenDefinition },
  );

const tokenMap: { [key in TokenSymbol]: TokenDefinition } = [
  ...closingTokenList,
  ...openingTokenList,
].reduce(
  (acc, current) => ({ ...acc, [current.symbol]: current }),
  {} as { [key in TokenSymbol]: TokenDefinition },
);

function findClosingFor(token: TokenDefinition): ClosingTokenDefinition {
  return closingTokenList.find((v) => v.type === token.type);
}

function isCorruptedParsingResult(
  result: ParsingResult,
): result is CorruptedParsingResult {
  return result.status === 'corrupted';
}

function isIncompleteParsingResult(
  result: ParsingResult,
): result is IncompleteParsingResult {
  return result.status === 'incomplete';
}

export function sumPointsForCorruptedLines(input: string[]): number {
  return input
    .map(parseLineChunks)
    .filter(isCorruptedParsingResult)
    .map((result) => closingTokenMap[result.error.found].points)
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

  if (delimiterQueue.length) {
    return {
      status: 'incomplete',
      suggestion: delimiterQueue
        .map((d) => findClosingFor(d).symbol)
        .reverse()
        .join(''),
    };
  } else {
    return { status: 'valid' };
  }
}

export function calculateSuggestionPoints(suggestion: string): number {
  return suggestion
    .split('')
    .map((s) => closingTokenMap[s].suggestionPoints)
    .reduce((acc, current) => 5 * acc + current, 0);
}

export function getMiddleScoreForSuggestions(input: string[]): number {
  const sortedScores = input
    .map(parseLineChunks)
    .filter(isIncompleteParsingResult)
    .map((chunk) => calculateSuggestionPoints(chunk.suggestion))
    .sort((a, b) => a - b);

  return sortedScores[Math.round((sortedScores.length - 1) / 2)];
}

export async function day10(): Promise<string[]> {
  const lines = await readDayFixture(10);
  return [
    sumPointsForCorruptedLines(lines).toString(),
    getMiddleScoreForSuggestions(lines).toString(),
  ];
}
