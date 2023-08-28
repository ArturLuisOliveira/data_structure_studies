import { Graph } from "../Graph";

enum Exploration {
  NOT_VISITED = "NOT_VISITED",
  VISITED = "VISITED",
  EXPLORED = "EXPLORED",
}

export const breadthFirstSearch = <T>({
  graph,
  callback,
  startVertex,
}: {
  graph: Graph<T>;
  startVertex: T;
  callback?: (vertex: T) => void;
}) => {
  const queue: T[] = [];
  const exploration = new Map<T, Exploration>();

  graph.vertices.map((vertex) => {
    exploration.set(vertex, Exploration.NOT_VISITED);
  });

  queue.push(startVertex);

  while (queue.length > 0) {
    const current = queue.pop();

    if (current != null) {
      const neighbors = graph.adjList.get(current);

      exploration.set(current, Exploration.VISITED);

      if (neighbors != null) {
        for (const neighbor of neighbors) {
          if (exploration.get(neighbor) === Exploration.NOT_VISITED) {
            exploration.set(neighbor, Exploration.VISITED);
            queue.unshift(neighbor);
          }
        }
      }
      exploration.set(current, Exploration.EXPLORED);

      if (callback != null) {
        callback(current);
      }
    }
  }
};
