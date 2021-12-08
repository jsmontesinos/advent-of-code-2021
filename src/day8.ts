export function countUniqueSegmentInstances(input: string[]): number {
  const rightSide = input[0].split(' | ')[1];
  return rightSide.split(' ').filter((digit) => digit.length === 2).length;
}
