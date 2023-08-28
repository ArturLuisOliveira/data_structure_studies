import { Graph } from "../Graph";
import { breadthFirstSearch } from "./breadthFirstSearch";

describe("breadth first search", () => {
  describe("given a graph", () => {
    const graph = new Graph<string>();

    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");
    graph.addVertex("E");
    graph.addVertex("F");
    graph.addVertex("G");

    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("B", "D");
    graph.addEdge("B", "E");
    graph.addEdge("C", "F");
    graph.addEdge("C", "G");

    it("performs the breadth first search correctly", () => {
      const ordered: string[] = [];
      breadthFirstSearch({
        graph,
        startVertex: "A",
        callback: (current) => ordered.push(current),
      });

      expect(ordered).toEqual(["A", "B", "C", "D", "E", "F", "G"]);
    });
  });
});
