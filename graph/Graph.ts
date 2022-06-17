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
    if (!this._isDirected) {
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

  depthFirstSearch({ callback }: { callback?: (vertex: Vertex) => void } = {}) {
    enum Color { White, Gray, Black }
    const color = new Map<Vertex, Color>()
    const discovery = new Map<Vertex, number>()
    const finished = new Map<Vertex, number>()
    const predecessor = new Map<Vertex, Vertex | null>()
    const time = { count: 0 }

    this.vertices.forEach(vertex => {
      color.set(vertex, Color.White)
      discovery.set(vertex, 0)
      finished.set(vertex, 0)
      predecessor.set(vertex, null)
    })

    const visit = (vertex: Vertex) => {
      color.set(vertex, Color.Gray)
      discovery.set(vertex, ++time.count)
      const neighbours = this.adjacencyList.get(vertex)
      neighbours?.forEach(neighbour => {
        if (color.get(neighbour) === Color.White) {
          predecessor.set(neighbour, vertex)
          visit(neighbour)
        }
      })
      callback && callback(vertex)
      color.set(vertex, Color.Black)
      finished.set(vertex, ++time.count)
    }

    this.vertices.forEach(vertex => {
      if (color.get(vertex) === Color.White) visit(vertex)
    })

    return { discovery, finished, predecessor }
  }

  /**
   * - Lists all vertises in a order which all the vertex who depends on another will be displayed after the vertex it depends on.
   * - Needs to be an DAG(Directed Acyclic Graph) graph.
   */
  topologicalOrder(): Vertex[] {
    const { finished } = this.depthFirstSearch()
    const finishedArray: [Vertex, number][] = []
    finished.forEach((value, key) => finishedArray.push([key, value]))

    return finishedArray.sort((a, b) => {
      if (a[1] > b[1]) return 1
      if (a[1] < b[1]) return -1
      return 0
    }).map(([key, value]) => key).reverse()
  }

  toString() {
    let string: String = "";
    this.vertices.sort().forEach((vertex) => {
      string = string.concat(
        `${vertex} ->${this.adjacencyList.get(vertex)?.sort().reduce(
          (acc, cur, index, values) => `${acc} ${cur}`,
          ""
        )}\n`
      );
    });
    return string.substring(0, string.length - 1);
  }
}
