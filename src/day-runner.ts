import { day1 } from './day1';
import { day10 } from './day10';
import { day11 } from './day11';
import { day2 } from './day2';
import { day3 } from './day3';
import { day4 } from './day4';
import { day5 } from './day5';
import { day6 } from './day6';
import { day7 } from './day7';
import { day8 } from './day8';
import { day9 } from './day9';

(async () => {
  [
    await day1(),
    await day2(),
    await day3(),
    await day4(),
    await day5(),
    await day6(),
    await day7(),
    await day8(),
    await day9(),
    await day10(),
    await day11(),
  ].forEach((day, index) =>
    console.log(
      `Day ${index + 1}: `,
      day.map((part, partIndex) => `Part ${partIndex + 1}: ${part}`),
    ),
  );
})();
