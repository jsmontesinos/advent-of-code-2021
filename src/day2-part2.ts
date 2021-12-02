type Status = { horizontal: number; depth: number; aim: number };

abstract class Command {
  abstract execute(status: Status, units: number): Status;
}

class ForwardCommand extends Command {
  execute(status: Status, units: number): Status {
    return {
      ...status,
      horizontal: status.horizontal + units,
      depth: status.depth + status.aim * units,
    };
  }
}

class DownCommand extends Command {
  execute(status: Status, units: number): Status {
    return {
      ...status,
      aim: status.aim + units,
    };
  }
}

class UpCommand extends Command {
  execute(status: Status, units: number): Status {
    return {
      ...status,
      aim: status.aim - units,
    };
  }
}

class NoCommand extends Command {
  execute(status: Status): Status {
    return status;
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

export function processInputInstructionsWithAim(input: string[]): Status {
  return input.reduce(
    (acc, current) => {
      const [command, units] = current.split(' ');
      return CommandFactory.getCommand(command).execute(
        acc,
        parseInt(units, 10),
      );
    },
    { horizontal: 0, depth: 0, aim: 0 },
  );
}
