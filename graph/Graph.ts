export class Graph<Vertex> {
  private _isDirected: boolean;
  private _vertices: Vertex[];
  private _adjacencyList: Map<Vertex, Vertex[]>;

  get vertices() {
    return this._vertices;
  }

  get adjacencyList() {
    return this._adjacencyList;
  }

  constructor({ isDirected = false }: { isDirected?: boolean } = {}) {
    this._isDirected = isDirected;
    this._vertices = [];
    this._adjacencyList = new Map();
  }

  addVertex(vertex: any) {
    if (!this._vertices.includes(vertex)) {
      this._vertices.push(vertex);
      this._adjacencyList.set(vertex, []);
    }
  }

  addEdge({ vertexA, vertexB }: Record<"vertexA" | "vertexB", Vertex>) {
    if (!this._vertices.includes(vertexA)) {
      this.addVertex(vertexA);
    }
    if (!this._vertices.includes(vertexB)) {
      this.addVertex(vertexB);
    }
    if (!this._adjacencyList.get(vertexA)?.includes(vertexB))
      this._adjacencyList.get(vertexA)?.push(vertexB);
    if (this._isDirected) {
      if (!this._adjacencyList.get(vertexB)?.includes(vertexA))
        this._adjacencyList.get(vertexB)?.push(vertexA);
    }
  }

  breadthFirstSearch({ callback, vertex }: { vertex: Vertex, callback: (vertex: Vertex) => void }) {
    enum Status { Explored, Visited }
    const statuses = new Map<Vertex, Status>()
    const queue: Vertex[] = [vertex]
    while (queue.length) {
      const vertex = queue.shift()
      if (vertex && statuses.get(vertex) !== Status.Explored) {
        const vertices = this._adjacencyList.get(vertex)
        vertices?.forEach(vertex => {
          if (statuses.get(vertex) !== Status.Explored && statuses.get(vertex) !== Status.Visited) {
            queue.push(vertex)
            statuses.set(vertex, Status.Visited)
          }
        })
        statuses.set(vertex, Status.Explored)
        callback(vertex)
      }
    }
  }

  shortestPath(a: Vertex, b: Vertex) {
    const pathAndCostMap = new Map<Vertex, { path?: Vertex, cost: number }>([[a, { cost: 0 }]])
    let previous = a
    this.breadthFirstSearch({
      callback: (vertex) => {
        this._adjacencyList.get(vertex)?.forEach(adjencent => {
          if (!pathAndCostMap.get(adjencent)) pathAndCostMap.set(adjencent, { cost: (pathAndCostMap.get(vertex)?.cost ?? 0) + 1, path: vertex })
        })
      },
      vertex: a
    })
    const path = []
    let next: Vertex | undefined = b
    while (next) {
      path.push(next)
      next = pathAndCostMap.get(next)?.path
    }
    return path.reverse()
  }



  toString() {
    let string: String = "";
    this.adjacencyList.forEach((value, key) => {
      string = string.concat(
        `${key} ->${value.reduce(
          (acc, cur, index, values) => `${acc} ${cur}`,
          ""
        )}\n`
      );
    });
    return string.substring(0, string.length - 1);
  }
}
