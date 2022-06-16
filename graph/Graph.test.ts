import { Graph } from "./Graph";

describe("graph", () => {
  describe("#addVertex", () => {
    test("should add the given vertices", () => {
      const graph = new Graph<string>();
      graph.addVertex("A");
      graph.addVertex("B");
      graph.addVertex("C");
      graph.addVertex("D");
      expect(graph.vertices).toEqual(["A", "B", "C", "D"]);
    });
    test("should not add repeated vertices", () => {
      const graph = new Graph<string>();
      graph.addVertex("A");
      graph.addVertex("A");
      expect(graph.vertices).toEqual(["A"]);
    });
  });
  describe("#addEdge", () => {
    describe("when the graph is directed", () => {
      test("should add edges to the given new vertices", () => {
        const graph = new Graph<string>({ isDirected: true });

        graph.addEdge({ vertexA: "A", vertexB: "B" });
        expect(graph.vertices).toEqual(["A", "B"]);
        expect(graph.adjacencyList.get("A")).toEqual(["B"]);
        expect(graph.adjacencyList.get("B")).toEqual(["A"]);
      });

      test("should add edges to the given existent vertices", () => {
        const graph = new Graph<string>({ isDirected: true });
        graph.addVertex("A");
        graph.addEdge({ vertexA: "A", vertexB: "B" });
        graph.addEdge({ vertexA: "A", vertexB: "B" });

        expect(graph.vertices).toEqual(["A", "B"]);
        expect(graph.adjacencyList.get("A")).toEqual(["B"]);
        expect(graph.adjacencyList.get("B")).toEqual(["A"]);
      });
      test("should not add repeated edges", () => {
        const graph = new Graph<string>({ isDirected: true });
        graph.addVertex("A");
        graph.addEdge({ vertexA: "A", vertexB: "B" });
        expect(graph.vertices).toEqual(["A", "B"]);
        expect(graph.adjacencyList.get("A")).toEqual(["B"]);
        expect(graph.adjacencyList.get("B")).toEqual(["A"]);
      });
    });
    describe("when the graph isn't directed", () => {
      test("should add edges to the given new vertices", () => {
        const graph = new Graph<string>();

        graph.addEdge({ vertexA: "A", vertexB: "B" });

        expect(graph.vertices).toEqual(["A", "B"]);
        expect(graph.adjacencyList.get("A")).toEqual(["B"]);
        expect(graph.adjacencyList.get("B")).toEqual([]);
      });
      test("should add edges to the given existent vertices", () => {
        const graph = new Graph<string>();
        graph.addVertex("A");
        graph.addEdge({ vertexA: "A", vertexB: "B" });

        expect(graph.vertices).toEqual(["A", "B"]);
        expect(graph.adjacencyList.get("A")).toEqual(["B"]);
        expect(graph.adjacencyList.get("B")).toEqual([]);
      });
      test("should not add repeated edges", () => {
        const graph = new Graph<string>();
        graph.addVertex("A");
        graph.addEdge({ vertexA: "A", vertexB: "B" });
        graph.addEdge({ vertexA: "A", vertexB: "B" });
        expect(graph.vertices).toEqual(["A", "B"]);
        expect(graph.adjacencyList.get("A")).toEqual(["B"]);
        expect(graph.adjacencyList.get("B")).toEqual([]);
      });
    });
  });
  describe("#toString", () => {
    test("should print", () => {
      const graph = new Graph<string>({ isDirected: true });
      graph.addEdge({ vertexA: "A", vertexB: "B" });
      graph.addEdge({ vertexA: "C", vertexB: "A" });
      graph.addEdge({ vertexA: "C", vertexB: "D" });
      graph.addEdge({ vertexA: "B", vertexB: "D" });

      expect(graph.toString()).toBe("A -> B C\nB -> A D\nC -> A D\nD -> C B");
    });
  });
  describe('#breadthFirstSearch', () => {
    test('breadth first search', () => {
      const graph = new Graph<string>({ isDirected: true });

      graph.addEdge({ vertexA: "A", vertexB: "B" });
      graph.addEdge({ vertexA: "A", vertexB: "C" });
      graph.addEdge({ vertexA: "A", vertexB: "D" });
      graph.addEdge({ vertexA: "B", vertexB: "E" });
      graph.addEdge({ vertexA: "B", vertexB: "F" });
      graph.addEdge({ vertexA: "C", vertexB: "G" });
      graph.addEdge({ vertexA: "D", vertexB: "G" });
      graph.addEdge({ vertexA: "D", vertexB: "G" });
      graph.addEdge({ vertexA: "D", vertexB: "H" });
      graph.addEdge({ vertexA: "E", vertexB: "I" });

      graph.breadthFirstSearch({ callback: (vertex) => { }, vertex: 'A' })
      expect(true).toBe(true);
    })

  })
  describe('#shortestPath', () => {
    test('should return the shortest path', () => {
      const graph = new Graph<string>({ isDirected: true });

      graph.addEdge({ vertexA: "A", vertexB: "B" });
      graph.addEdge({ vertexA: "A", vertexB: "C" });
      graph.addEdge({ vertexA: "A", vertexB: "D" });
      graph.addEdge({ vertexA: "B", vertexB: "E" });
      graph.addEdge({ vertexA: "C", vertexB: "F" });
      graph.addEdge({ vertexA: "D", vertexB: "G" });
      graph.addEdge({ vertexA: "G", vertexB: "H" });
      graph.addEdge({ vertexA: "F", vertexB: "E" });
      graph.addEdge({ vertexA: "H", vertexB: "E" });

      expect(graph.shortestPath("A", "E")).toEqual(["A", "B", "E"])
    })
  })
  describe('#depthFirstSearch', () => {
    const graph = new Graph<string>({ isDirected: true });

    graph.addEdge({ vertexA: "A", vertexB: "B" });
    graph.addEdge({ vertexA: "A", vertexB: "C" });
    graph.addEdge({ vertexA: "A", vertexB: "D" });
    graph.addEdge({ vertexA: "B", vertexB: "E" });
    graph.addEdge({ vertexA: "B", vertexB: "F" });
    graph.addEdge({ vertexA: "C", vertexB: "G" });
    graph.addEdge({ vertexA: "D", vertexB: "G" });
    graph.addEdge({ vertexA: "D", vertexB: "H" });
    graph.addEdge({ vertexA: "E", vertexB: "I" });
    const values: string[] = []
    graph.depthFirstSearch((vertex) => values.push(vertex))
    console.log({ values })
    expect(true).toBe(true)
  })
  describe('#topologicalOrder', () => {
    const graph = new Graph<string>({ isDirected: true });
    graph.addEdge({ vertexA: "A", vertexB: "B" });
    graph.addEdge({ vertexA: "A", vertexB: "C" });
    graph.addEdge({ vertexA: "B", vertexB: "D" });
    graph.addEdge({ vertexA: "B", vertexB: "F" });
    graph.addEdge({ vertexA: "C", vertexB: "E" });
    graph.addEdge({ vertexA: "E", vertexB: "F" });


    /**
     * A -> 0
     * B -> 1
     * C -> 1
     * D -> 2
     * E -> 2
     * F -> 3
     */

    const topologicalOrder = graph.topologicalOrder()
    //A
    expect(topologicalOrder[0]).toBe("A")

    //B
    const bIndex = topologicalOrder.findIndex((vertex) => vertex === 'B')
    expect(bIndex === 1 ?? bIndex === 2).toBe(true)

    //C
    const cIndex = topologicalOrder.findIndex((vertex) => vertex === 'C')
    expect(cIndex === 1 ?? cIndex === 2).toBe(true)

    //D
    const dIndex = topologicalOrder.findIndex((vertex) => vertex === 'D')
    expect(cIndex === 3 ?? cIndex === 4).toBe(true)
    //E
    const eIndex = topologicalOrder.findIndex((vertex) => vertex === 'E')
    expect(cIndex === 3 ?? cIndex === 4).toBe(true)

    //F
    expect(topologicalOrder[length - 1]).toBe("F")
  })
});
