/**

 * Finds the shortest path from a start node to all other nodes in a weighted graph.

 * @param {Object} graph - Adjacency list with weights.

 * @param {string} start - The starting vertex.

 * @returns {Object} - Shortest distances to all vertices.

 */

function dijkstra(graph, start) {

  // 1. Setup tracking objects

  const distances = {};

  const visited = new Set();

  const nodes = Object.keys(graph);



  // 2. Initialize all distances to Infinity, and start node to 0

  for (const node of nodes) {

    distances[node] = Infinity;

  }

  distances[start] = 0;



  /**

   * Helper: Find the unvisited node with the smallest distance.

   * In a production-heavy system, replace this with a Priority Queue.

   */

  const getLowestDistanceNode = () => {

    return Object.keys(distances).reduce((lowest, node) => {

      if (lowest === null || distances[node] < distances[lowest]) {

        if (!visited.has(node)) {

          lowest = node;

        }

      }

      return lowest;

    }, null);

  };



  let currentNode = getLowestDistanceNode();



  // 3. Main Loop: Process nodes until no more unvisited nodes are reachable

  while (currentNode !== null && distances[currentNode] !== Infinity) {

    const distanceToCurrent = distances[currentNode];

    const neighbors = graph[currentNode];



    // Check each neighbor of the current node

    for (const neighbor in neighbors) {

      const weight = neighbors[neighbor];

      const totalDistance = distanceToCurrent + weight;



      // If a shorter path is found, update the distance table

      if (totalDistance < distances[neighbor]) {

        distances[neighbor] = totalDistance;

      }

    }



    // Mark current node as visited

    visited.add(currentNode);

    

    // Pick the next node to explore

    currentNode = getLowestDistanceNode();

  }



  return distances;

}



// --- Testing the Solution ---

const graph = {

  'A': { 'B': 4, 'C': 2 },

  'B': { 'A': 4, 'C': 5, 'D': 10 },

  'C': { 'A': 2, 'B': 5, 'D': 3 },

  'D': { 'B': 10, 'C': 3 }

};



const results = dijkstra(graph, 'A');

console.log('Shortest Distances from A:', results);

// Expected: { A: 0, B: 4, C: 2, D: 5 }
