import { readDayFixture } from './day-common';
import { processInputInstructionsWithAim } from './day2-part2';

type Position = { horizontal: number; depth: number };

abstract class Command {
  abstract processPosition(position: Position, units: number): Position;
}

class ForwardCommand extends Command {
  processPosition(position: Position, units: number): Position {
    return {
      ...position,
      horizontal: position.horizontal + units,
    };
  }
}

class DownCommand extends Command {
  processPosition(position: Position, units: number): Position {
    return {
      ...position,
      depth: position.depth + units,
    };
  }
}

class UpCommand extends Command {
  processPosition(position: Position, units: number): Position {
    return {
      ...position,
      depth: position.depth - units,
    };
  }
}

class NoCommand extends Command {
  processPosition(position: Position): Position {
    return position;
  }
}

class CommandFactory {
  public static getCommand(commandName: string): Command {
    switch (commandName) {
      case 'forward':
        return new ForwardCommand();
      case 'up':
        return new UpCommand();
      case 'down':
        return new DownCommand();
      default:
        return new NoCommand();
    }
  }
}

export function processInputInstructions(input: string[]): Position {
  return input.reduce(
    (acc, current) => {
      const [command, units] = current.split(' ');
      return CommandFactory.getCommand(command).processPosition(
        acc,
        parseInt(units, 10),
      );
    },
    { horizontal: 0, depth: 0 },
  );
}

function processPosition(position: Position): number {
  return position.horizontal * position.depth;
}

export async function day2(): Promise<string[]> {
  const lines = await readDayFixture(2);
  return [
    processPosition(processInputInstructions(lines))?.toString(),
    processPosition(processInputInstructionsWithAim(lines))?.toString(),
  ];
}
