export class Graph<T> {
  isDirected: boolean;

  vertices: T[] = [];
  equalCallback: (a: T, b: T) => boolean = (a, b) => a == b;
  adjList: Map<T, T[]> = new Map();

  constructor(isDirected = false) {
    this.isDirected = isDirected;
  }

  addEdge(from: T, to: T) {
    this.adjList.get(from)?.push(to);
    if (this.isDirected) this.adjList.get(to)?.push(from);
  }

  addVertex(vertex: T) {
    for (const currentVertex of this.vertices) {
      if (this.equalCallback(vertex, currentVertex)) return;
    }
    this.vertices.push(vertex);
    this.adjList.set(vertex, []);
  }

  toString() {
    let string = "";

    this.adjList.forEach((value, key) => {
      string = `${string}\n${String(key)}: ${String(value)}`;
    });

    return string;
  }
}
