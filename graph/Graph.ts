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
      console.count('count')
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

  depthFirstSearch({ callback, vertex }: { vertex: Vertex, callback: (vertex: Vertex) => void }) {
    enum Status { Explored, Visited }
    const statuses = new Map<Vertex, Status>()
    const stack: Vertex[] = [vertex]
    while (stack.length) {
      console.count('count')
      const vertex = stack.pop()
      if (vertex && statuses.get(vertex) !== Status.Explored) {
        const vertices = this._adjacencyList.get(vertex)
        vertices?.forEach(vertex => {
          if (statuses.get(vertex) !== Status.Explored && statuses.get(vertex) !== Status.Visited) {
            stack.push(vertex)
            statuses.set(vertex, Status.Visited)
          }
        })
        statuses.set(vertex, Status.Explored)
        callback(vertex)
      }
    }
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
