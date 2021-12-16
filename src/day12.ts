import { readDayFixture } from './day-common';

type CaveType = 'start' | 'small' | 'big' | 'end';

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
  ): void {
    if (node.name === 'end') {
      allPaths.push(currentPath);
      return;
    }

    node.adjacentNodes.forEach((nextNode) => {
      if (
        (!['start', 'end'].includes(nextNode.type) &&
          nextNode.type === 'big') ||
        currentPath.every((pathNode) => !pathNode.isEqual(nextNode))
      ) {
        this.depthFirstSearch(nextNode, [...currentPath, nextNode], allPaths);
      }
    });
  }

  searchForAllPaths(): Array<Array<Cave>> {
    const allPaths: Array<Array<Cave>> = [];
    this.start.adjacentNodes.forEach((node) => {
      this.depthFirstSearch(node, [this.start, node], allPaths);
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
  const graph = parseCaveGraph(input);
  return graph
    .searchForAllPaths()
    .map((path) => path.map((node) => node.name).join('-'));
}

export function calculateNumberOfCavePaths(input: string[]): number {
  return calculateCavePaths(input).length;
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
  return [calculateNumberOfCavePaths(lines).toString()];
}
