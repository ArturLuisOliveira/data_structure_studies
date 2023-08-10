import { Graph } from "./Graph";

describe("graph", () => {
  describe("#addEdge", () => {
    describe("given a graph", () => {
      const graph = new Graph<string>();

      it("should add the edges", () => {
        graph.addVertex("A");
        graph.addVertex("B");
        graph.addVertex("C");
        graph.addVertex("D");

        graph.addEdge("A", "B");
        graph.addEdge("B", "C");
        graph.addEdge("B", "D");

        expect(graph.adjList.get("A")).toEqual(["B"]);
        expect(graph.adjList.get("B")).toEqual(["C", "D"]);
        expect(graph.adjList.get("C")).toEqual([]);
        expect(graph.adjList.get("D")).toEqual([]);
      });
    });
  });

  describe("#addVertex", () => {
    describe("given a graph", () => {
      const graph = new Graph<string>();

      it("should add a new vertex", () => {
        graph.addVertex("A");
        graph.addVertex("B");

        expect(graph.vertices).toEqual(["A", "B"]);
      });
    });
  });
});
