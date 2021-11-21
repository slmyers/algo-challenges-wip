/*
Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, 
find all possible paths from node 0 to node n - 1 and return them in any order.

The graph is given as follows: graph[i] is a list of all nodes you can visit 
from node i (i.e., there is a directed edge from node i to node graph[i][j]).

Input: graph = [[1,2],[3],[3],[]]
Output: [[0,1,3],[0,2,3]]
Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

Input: graph = [[1],[]]
Output: [[0,1]]

Input: graph = [[1,2,3],[2],[3],[]]
Output: [[0,1,2,3],[0,2,3],[0,3]]

Input: graph = [[1,3],[2],[3],[]]
Output: [[0,1,2,3],[0,3]]
*/

/**
 * Returns all possible paths from the start node to the end node within a DAG.
 * @param {number[][]} graph // indexes are nodes, values are node connections.
 * @return {number[][]} // All paths from the start node to the end node.
 */
 const allPathsSourceTarget = graph => {
    // The end node in the graph.
    const target = graph.length-1
    /* The queue data structure used to traverse the graph in a BFS manner.
       Initialised to contain the first node within the graph. */
    const queue = [ [0] ]
    // Stores all of the possible paths from start to end.
    const result = []
    // While the queue is still populated.
    while (queue.length) {
        // The current path taken so far.
        const currentList = queue.shift()
        // The current node we're traversing.
        const currentNode = currentList[currentList.length-1]
        
        // Found a path to the target node.
        if (currentNode === target) {
            // Add the path to the result list of paths.
            result.push(currentList)
        // Path to target not has not yet been found.
        } else {
            // For every node connected to the current node.
            graph[currentNode].forEach(nextNode => {
                // Traverse the connected node.
                queue.push([...currentList, nextNode])
            })
        }                
    }
    
    // Traversed all nodes / node connections within the graph.
    return result
}
