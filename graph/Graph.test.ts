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

      graph.breadthFirstSearch({ callback: (vertex) => console.log({ vertex }), vertex: 'A' })
      expect(true).toBe(true);
    })

  })

  describe('#shortestPath', () => {
    /**
     * A -
     * 
     */
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
});
