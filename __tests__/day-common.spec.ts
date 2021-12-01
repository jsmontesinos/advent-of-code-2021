import { splitInGroups } from '../src/day-common';

describe('splitInGroups()', () => {
  it('should split a list of strings in groups', () => {
    const input = ['ab', 'c', '', 'abc', 'de', '', 'ab'];

    expect(splitInGroups(input)).toEqual([['ab', 'c'], ['abc', 'de'], ['ab']]);
  });

  it('should exclude initial and final blank lines', () => {
    const input = ['', 'ab', 'c', '', 'abc', ''];

    expect(splitInGroups(input)).toEqual([['ab', 'c'], ['abc']]);
  });
});
