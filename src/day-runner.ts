import { day1 } from './day1';
import { day2 } from './day2';
import { day3 } from './day3';
import { day4 } from './day4';
import { day5 } from './day5';
import { day6 } from './day6';

(async () => {
  [
    await day1(),
    await day2(),
    await day3(),
    await day4(),
    await day5(),
    await day6(),
  ].forEach((day, index) =>
    console.log(
      `Day ${index + 1}: `,
      day.map((part, partIndex) => `Part ${partIndex + 1}: ${part}`),
    ),
  );
})();
