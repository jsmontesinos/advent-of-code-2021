import { day1 } from './day1';

(async () => {
  [await day1()].forEach((day, index) =>
    console.log(
      `Day ${index + 1}: `,
      day.map((part, partIndex) => `Part ${partIndex + 1}: ${part}`),
    ),
  );
})();
