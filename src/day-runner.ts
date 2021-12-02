import { day1 } from './day1';
import { day2 } from './day2';

(async () => {
  [await day1(), await day2()].forEach((day, index) =>
    console.log(
      `Day ${index + 1}: `,
      day.map((part, partIndex) => `Part ${partIndex + 1}: ${part}`),
    ),
  );
})();
