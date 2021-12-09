import { readDayFixture } from './day-common';

export function countUniqueSegmentInstances(input: string[]): number {
  return input.reduce(
    (acc, current) => acc + countUniqueSegmentInstancesInLine(current),
    0,
  );
}

function countUniqueSegmentInstancesInLine(line: string): number {
  const rightSide = line.split(' | ')[1];
  return rightSide
    .split(' ')
    .filter((digit) => [2, 7, 4, 3].includes(digit.length)).length;
}

export function getSegmentTable(line: string): Map<string, string> {
  const segmentTable = new Map<string, string>();
  const uniqueSequence = line.split(' | ')[0].split(' ');
  const one = uniqueSequence.find((s) => s.length === 2);
  const seven = uniqueSequence.find((s) => s.length === 3);
  const six = uniqueSequence.find(
    (s) => s.length === 6 && subtractSequence(one, s).length > 0,
  );
  const four = uniqueSequence.find((s) => s.length === 4);
  const eight = uniqueSequence.find((s) => s.length === 7);
  segmentTable.set('a', subtractSequence(seven, one));
  segmentTable.set('c', subtractSequence(eight, six));
  const five = uniqueSequence.find(
    (s) => s.length === 5 && sumSequences(s, segmentTable.get('c')).length > 5,
  );
  const nine = uniqueSequence.find(
    (s) => s.length === 6 && s !== six && sumSequences(five, s).length < 7,
  );
  const zero = uniqueSequence.find(
    (s) => s.length === 6 && s !== six && s !== nine,
  );
  segmentTable.set('e', subtractSequence(eight, nine));
  segmentTable.set('d', subtractSequence(eight, zero));
  segmentTable.set('f', subtractSequence(one, segmentTable.get('c')));
  segmentTable.set(
    'b',
    subtractSequence(
      four,
      sumSequences(
        segmentTable.get('c'),
        segmentTable.get('f'),
        segmentTable.get('d'),
      ),
    ),
  );
  segmentTable.set(
    'g',
    subtractSequence(
      eight,
      sumSequences(
        segmentTable.get('c'),
        segmentTable.get('b'),
        segmentTable.get('e'),
        segmentTable.get('a'),
        segmentTable.get('f'),
        segmentTable.get('d'),
      ),
    ),
  );

  return segmentTable;
}

function sumSequences(...sequences: string[]): string {
  return [...new Set(sequences.flatMap((sequence) => sequence.split('')))].join(
    '',
  );
}

function subtractSequence(sequence: string, otherSequence: string): string {
  return sequence
    .split('')
    .filter((s) => !otherSequence.includes(s))
    .join('');
}

export function getSegmentDecoder(line: string): (input: string) => number {
  const segmentTable = getSegmentTable(line);
  const matchesAllSegments = (input: string, segments: string[]) =>
    segments.every((s) => input.includes(segmentTable.get(s)));
  return (input: string) =>
    [
      { segments: ['a', 'b', 'c', 'd', 'e', 'f', 'g'], value: 8 },
      { segments: ['a', 'b', 'd', 'e', 'f', 'g'], value: 6 },
      { segments: ['a', 'b', 'c', 'd', 'f', 'g'], value: 9 },
      { segments: ['a', 'b', 'c', 'e', 'f', 'g'], value: 0 },
      { segments: ['a', 'c', 'd', 'e', 'g'], value: 2 },
      { segments: ['a', 'c', 'd', 'f', 'g'], value: 3 },
      { segments: ['a', 'b', 'd', 'f', 'g'], value: 5 },
      { segments: ['b', 'c', 'd', 'f'], value: 4 },
      { segments: ['a', 'c', 'f'], value: 7 },
      { segments: ['c', 'f'], value: 1 },
    ].find((decoder) => matchesAllSegments(input, decoder.segments))?.value;
}

export function decodeLine(line: string): number {
  const values = line.split(' | ')[1].split(' ');
  const decode = getSegmentDecoder(line);
  return parseInt(values.map((value) => decode(value).toString()).join(''), 10);
}

export function decodeAll(input: string[]): number {
  return input.reduce((acc, current) => acc + decodeLine(current), 0);
}

export async function day8(): Promise<string[]> {
  const lines = await readDayFixture(8);
  return [
    countUniqueSegmentInstances(lines).toString(),
    decodeAll(lines).toString(),
  ];
}
