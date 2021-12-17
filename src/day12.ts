import { readDayFixture } from './day-common';

type CaveType = 'start' | 'small' | 'big' | 'end';

interface CaveNodeStrategy {
  shouldIncludeNodeInPath(cave: Cave, path: Array<Cave>): boolean;
}

class Part1NodeStrategy implements CaveNodeStrategy {
  shouldIncludeNodeInPath(cave: Cave, path: Array<Cave>): boolean {
    return (
      cave.type === 'big' ||
      cave.type === 'end' ||
      (cave.type === 'small' &&
        path.every((pathNode) => !pathNode.isEqual(cave)))
    );
  }
}

class Part2NodeStrategy implements CaveNodeStrategy {
  shouldIncludeNodeInPath(cave: Cave, path: Array<Cave>): boolean {
    return (
      cave.type === 'big' ||
      cave.type === 'end' ||
      (cave.type === 'small' &&
        (path.every((pathNode) => !pathNode.isEqual(cave)) ||
          Object.values(
            path
              .filter((pathNode) => pathNode.type === 'small')
              .reduce(
                (acc, current) => ({
                  ...acc,
                  [current.name]: (acc[current.name] ?? 0) + 1,
                }),
                {},
              ),
          ).every((value) => value < 2)))
    );
  }
}

class CaveGraph {
  public start: Cave;
  public end: Cave;
  public nodes: Array<Cave>;

  constructor() {
    this.nodes = [];
  }

  public getNodeByName(name: string): Cave {
    return this.nodes.find((node) => node.name === name);
  }

  public addNode(name: string): Cave {
    const node = new Cave(name);
    if (name === 'start') {
      this.start = node;
    } else if (name === 'end') {
      this.end = node;
    }
    this.nodes.push(node);

    return node;
  }

  private depthFirstSearch(
    node: Cave,
    currentPath: Array<Cave>,
    allPaths: Array<Array<Cave>>,
    caveNodeStrategy: CaveNodeStrategy,
  ): void {
    if (node.name === 'end') {
      allPaths.push(currentPath);
      return;
    }

    node.adjacentNodes.forEach((nextNode) => {
      if (caveNodeStrategy.shouldIncludeNodeInPath(nextNode, currentPath)) {
        this.depthFirstSearch(
          nextNode,
          [...currentPath, nextNode],
          allPaths,
          caveNodeStrategy,
        );
      }
    });
  }

  searchForAllPaths(caveNodeStrategy: CaveNodeStrategy): Array<Array<Cave>> {
    const allPaths: Array<Array<Cave>> = [];
    this.start.adjacentNodes.forEach((node) => {
      this.depthFirstSearch(
        node,
        [this.start, node],
        allPaths,
        caveNodeStrategy,
      );
    });

    return allPaths;
  }
}

class Cave {
  public name: string;
  public type: CaveType;
  public adjacentNodes: Array<Cave>;

  constructor(name: string) {
    this.name = name;
    this.type = this.calculateType();
    this.adjacentNodes = [];
  }

  public isEqual(otherNode: Cave): boolean {
    return this.name === otherNode.name;
  }

  private calculateType(): CaveType {
    if (this.name === 'start') {
      return 'start';
    }
    if (this.name === 'end') {
      return 'end';
    }
    if (this.name === this.name.toUpperCase()) {
      return 'big';
    }

    return 'small';
  }
}

export function calculateCavePaths(input: string[]): string[] {
  return calculateCavePathsInternal(input, new Part1NodeStrategy());
}

export function calculateNumberOfCavePaths(input: string[]): number {
  return calculateCavePaths(input).length;
}

export function calculateCavePathsPart2(input: string[]): string[] {
  return calculateCavePathsInternal(input, new Part2NodeStrategy());
}

export function calculateNumberOfCavePathsPart2(input: string[]): number {
  return calculateCavePathsPart2(input).length;
}

function calculateCavePathsInternal(
  input: string[],
  caveNodeStrategy: CaveNodeStrategy,
): string[] {
  const graph = parseCaveGraph(input);
  return graph
    .searchForAllPaths(caveNodeStrategy)
    .map((path) => path.map((node) => node.name).join('-'));
}

function parseCaveGraph(input: string[]): CaveGraph {
  const graph = new CaveGraph();
  input.forEach((line) => {
    const [nameA, nameB] = line.split('-');
    const nodeA = graph.getNodeByName(nameA) ?? graph.addNode(nameA);
    const nodeB = graph.getNodeByName(nameB) ?? graph.addNode(nameB);
    nodeA.adjacentNodes.push(nodeB);
    nodeB.adjacentNodes.push(nodeA);
  });

  return graph;
}

export async function day12(): Promise<string[]> {
  const lines = await readDayFixture(12);
  return [
    calculateNumberOfCavePaths(lines).toString(),
    calculateNumberOfCavePathsPart2(lines).toString(),
  ];
}
