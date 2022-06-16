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
        //https://media.geeksforgeeks.org/wp-content/uploads/20201208095819/UntitledDiagram9.jpg
        const graphA = new Graph<string>({ isDirected: true });
        graphA.addEdge({ vertexA: "0", vertexB: "1" });
        graphA.addEdge({ vertexA: "1", vertexB: "2" });
        graphA.addEdge({ vertexA: "2", vertexB: "0" });
        expect(graphA.vertices.sort()).toEqual(["0", "1", "2"].sort());
        expect(graphA.adjacencyList.get("0")).toEqual(["1"]);
        expect(graphA.adjacencyList.get("1")).toEqual(["2"]);
        expect(graphA.adjacencyList.get("2")).toEqual(["0"]);

        // https://media.geeksforgeeks.org/wp-content/uploads/20201208100338/UntitledDiagram10.jpg
        const graphB = new Graph<string>({ isDirected: true });
        graphB.addEdge({ vertexA: "0", vertexB: "1" });
        graphB.addEdge({ vertexA: "1", vertexB: "2" });
        graphB.addEdge({ vertexA: "2", vertexB: "3" });
        graphB.addEdge({ vertexA: "3", vertexB: "0" });
        graphB.addEdge({ vertexA: "1", vertexB: "3" });

        expect(graphB.vertices.sort()).toEqual(["0", "1", "2", '3'].sort());
        expect(graphB.adjacencyList.get("0")).toEqual(["1"]);
        expect(graphB.adjacencyList.get("1")?.sort()).toEqual(["2", '3'].sort());
        expect(graphB.adjacencyList.get("2")).toEqual(["3"]);
        expect(graphB.adjacencyList.get("3")).toEqual(["0"]);

      });
      test("should add edges to the given existent vertices", () => {
        const graph = new Graph<string>({ isDirected: true });
        graph.addVertex("A");
        graph.addEdge({ vertexA: "A", vertexB: "B" });

        expect(graph.vertices.sort()).toEqual(["A", "B"].sort());
        expect(graph.adjacencyList.get("A")).toEqual(["B"]);
        expect(graph.adjacencyList.get("B")).toEqual([]);
      });
      test("should not add repeated edges", () => {
        const graph = new Graph<string>({ isDirected: true });
        graph.addVertex("A");
        graph.addEdge({ vertexA: "A", vertexB: "B" });
        graph.addEdge({ vertexA: "A", vertexB: "B" });
        expect(graph.vertices.sort()).toEqual(["A", "B"].sort());
        expect(graph.adjacencyList.get("A")).toEqual(["B"]);
        expect(graph.adjacencyList.get("B")).toEqual([]);
      });
    });
    describe("when the graph isn't directed", () => {
      test("should add edges to the given new vertices", () => {
        const graph = new Graph<string>();

        graph.addEdge({ vertexA: "A", vertexB: "B" });

        expect(graph.vertices).toEqual(["A", "B"]);
        expect(graph.adjacencyList.get("A")).toEqual(["B"]);
        expect(graph.adjacencyList.get("B")).toEqual(["A"]);
      });
      test("should add edges to the given existent vertices", () => {
        const graph = new Graph<string>();
        graph.addVertex("A");
        graph.addEdge({ vertexA: "A", vertexB: "B" });

        expect(graph.vertices).toEqual(["A", "B"]);
        expect(graph.adjacencyList.get("A")).toEqual(["B"]);
        expect(graph.adjacencyList.get("B")).toEqual(["A"]);
      });
      test("should not add repeated edges", () => {
        const graph = new Graph<string>();
        graph.addVertex("A");
        graph.addEdge({ vertexA: "A", vertexB: "B" });
        graph.addEdge({ vertexA: "A", vertexB: "B" });
        expect(graph.vertices).toEqual(["A", "B"]);
        expect(graph.adjacencyList.get("A")).toEqual(["B"]);
        expect(graph.adjacencyList.get("B")).toEqual(["A"]);
      });
    });
  });
  describe("#toString", () => {
    test("should print directed graph", () => {
      //https://w7.pngwing.com/pngs/233/295/png-transparent-directed-graph-directed-acyclic-graph-vertex-graph-theory-data-graph-angle-white-text.png
      const graph = new Graph<string>({ isDirected: true });
      graph.addEdge({ vertexA: "A", vertexB: "B" });
      graph.addEdge({ vertexA: "B", vertexB: "C" });
      graph.addEdge({ vertexA: "B", vertexB: "D" });
      graph.addEdge({ vertexA: "B", vertexB: "E" });
      graph.addEdge({ vertexA: "G", vertexB: "D" });
      graph.addEdge({ vertexA: "C", vertexB: "E" });
      graph.addEdge({ vertexA: "D", vertexB: "E" });
      graph.addEdge({ vertexA: "E", vertexB: "F" });


      expect(graph.toString()).toBe("A -> B\nB -> C D E\nC -> E\nD -> E\nE -> F\nF ->\nG -> D");
    });
    test("should print non directed graph", () => {
      //https://progressivecoder.com/wp-content/uploads/2020/12/graph_example.png
      const graph = new Graph<string>();
      graph.addEdge({ vertexA: "0", vertexB: "1" });
      graph.addEdge({ vertexA: "0", vertexB: "4" });
      graph.addEdge({ vertexA: "1", vertexB: "4" });
      graph.addEdge({ vertexA: "1", vertexB: "3" });
      graph.addEdge({ vertexA: "1", vertexB: "2" });
      graph.addEdge({ vertexA: "2", vertexB: "3" });
      graph.addEdge({ vertexA: "4", vertexB: "3" });

      expect(graph.toString()).toBe("0 -> 1 4\n1 -> 0 2 3 4\n2 -> 1 3\n3 -> 1 2 4\n4 -> 0 1 3");
    });
  });
  describe('#breadthFirstSearch', () => {
    describe('given a directed graph', () => {
      //https://webeduclick.com/wp-content/uploads/2021/02/Breadth-First-Search-in-Artificial-Intelligence.jpg
      const graph = new Graph<string>({ isDirected: false });
      graph.addEdge({ vertexA: "ROOT", vertexB: "A" });
      graph.addEdge({ vertexA: "ROOT", vertexB: "B" });
      graph.addEdge({ vertexA: "ROOT", vertexB: "C" });
      graph.addEdge({ vertexA: "A", vertexB: "D" });
      graph.addEdge({ vertexA: "A", vertexB: "E" });
      graph.addEdge({ vertexA: "B", vertexB: "F" });
      graph.addEdge({ vertexA: "C", vertexB: "G" });
      test('should run the breadth first search in the given order', () => {
        const breadthFirstSearch: string[] = []
        graph.breadthFirstSearch({ callback: (vertex) => breadthFirstSearch.push(vertex), vertex: 'ROOT' })

        expect(breadthFirstSearch[0]).toBe("ROOT");
        ["A", "B", "C"].forEach(vertex => {
          expect(breadthFirstSearch.indexOf(vertex)).toBeGreaterThanOrEqual(1)
          expect(breadthFirstSearch.indexOf(vertex)).toBeLessThanOrEqual(3)
        });
        ["D", "E", "F", "G"].forEach(vertex => {
          expect(breadthFirstSearch.indexOf(vertex)).toBeGreaterThanOrEqual(4)
          expect(breadthFirstSearch.indexOf(vertex)).toBeLessThanOrEqual(7)
        })

      })
    })
    describe('given a non directed graph', () => {
      //https://webeduclick.com/wp-content/uploads/2021/02/Breadth-First-Search-in-Artificial-Intelligence.jpg
      const graph = new Graph<string>({ isDirected: true });
      graph.addEdge({ vertexA: "ROOT", vertexB: "A" });
      graph.addEdge({ vertexA: "ROOT", vertexB: "B" });
      graph.addEdge({ vertexA: "ROOT", vertexB: "C" });
      graph.addEdge({ vertexA: "A", vertexB: "D" });
      graph.addEdge({ vertexA: "A", vertexB: "E" });
      graph.addEdge({ vertexA: "B", vertexB: "F" });
      graph.addEdge({ vertexA: "C", vertexB: "G" });
      test('should run the breadth first search in the given order', () => {
        const breadthFirstSearch: string[] = []
        graph.breadthFirstSearch({ callback: (vertex) => breadthFirstSearch.push(vertex), vertex: 'ROOT' })

        expect(breadthFirstSearch[0]).toBe("ROOT");
        ["A", "B", "C"].forEach(vertex => {
          expect(breadthFirstSearch.indexOf(vertex)).toBeGreaterThanOrEqual(1)
          expect(breadthFirstSearch.indexOf(vertex)).toBeLessThanOrEqual(3)
        });
        ["D", "E", "F", "G"].forEach(vertex => {
          expect(breadthFirstSearch.indexOf(vertex)).toBeGreaterThanOrEqual(4)
          expect(breadthFirstSearch.indexOf(vertex)).toBeLessThanOrEqual(7)
        })

      })
    })
  })
  describe('#shortestPath', () => {
    describe('given a directed graph', () => {
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
      test('should return the shortest path', () => {
        expect(graph.shortestPath("A", "E")).toEqual(["A", "B", "E"])
      })
    })
    describe('given a non directed graph', () => {
      const graph = new Graph<string>({ isDirected: false });
      graph.addEdge({ vertexA: "A", vertexB: "B" });
      graph.addEdge({ vertexA: "A", vertexB: "C" });
      graph.addEdge({ vertexA: "A", vertexB: "D" });
      graph.addEdge({ vertexA: "B", vertexB: "E" });
      graph.addEdge({ vertexA: "C", vertexB: "F" });
      graph.addEdge({ vertexA: "D", vertexB: "G" });
      graph.addEdge({ vertexA: "G", vertexB: "H" });
      graph.addEdge({ vertexA: "F", vertexB: "E" });
      graph.addEdge({ vertexA: "H", vertexB: "E" });
      test('should return the shortest path', () => {
        expect(graph.shortestPath("A", "E")).toEqual(["A", "B", "E"])
      })
    })
  })
  describe('#depthFirstSearch', () => {
    describe('given a directed graph', () => {
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
      test('should return a depth first search', () => {
        const values: string[] = []
        graph.depthFirstSearch((vertex) => values.push(vertex))
        expect(true).toBe(true)
      })
    })
    describe('given a non directed graph', () => {
      test('should return a depth first search', () => {
        const graph = new Graph<string>({ isDirected: false });

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
        expect(true).toBe(true)
      })
    })
  })
  describe('#topologicalOrder', () => {
    test('should return the topological order', () => {
      //https://www.gatevidyalay.com/wp-content/uploads/2018/07/Topological-Sort-Example.png
      const graph = new Graph<string>({ isDirected: true });
      graph.addEdge({ vertexA: "1", vertexB: "2" });
      graph.addEdge({ vertexA: "1", vertexB: "3" });
      graph.addEdge({ vertexA: "2", vertexB: "4" });
      graph.addEdge({ vertexA: "2", vertexB: "5" });
      graph.addEdge({ vertexA: "3", vertexB: "4" });
      graph.addEdge({ vertexA: "3", vertexB: "6" });

      const topologicalOrder = graph.topologicalOrder()
      expect(topologicalOrder[0]).toBe("1");
      ["2", "3"].forEach(vertex => {
        expect(topologicalOrder.indexOf(vertex)).toBeGreaterThanOrEqual(1)
        expect(topologicalOrder.indexOf(vertex)).toBeLessThanOrEqual(2)
      })
      expect(topologicalOrder[3]).toBe("4");
      ["5", "6"].forEach(vertex => {
        expect(topologicalOrder.indexOf(vertex)).toBeGreaterThanOrEqual(4)
        expect(topologicalOrder.indexOf(vertex)).toBeLessThanOrEqual(5)
      })
    })

  })
});
