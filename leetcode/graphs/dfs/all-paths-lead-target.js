/*
Given the edges of a directed graph where edges[i] = [ai, bi] indicates there is an edge between nodes ai and bi, 
and two nodes source and destination of this graph, determine whether or not all paths starting from source eventually, end at destination, that is:

At least one path exists from the source node to the destination node
If a path exists from the source node to a node with no outgoing edges, then that node is equal to destination.
The number of possible paths from source to destination is a finite number.
Return true if and only if all roads from source lead to destination.

Input: n = 3, edges = [[0,1],[0,2]], source = 0, destination = 2
Output: false
Explanation: It is possible to reach and get stuck on both node 1 and node 2.

Input: n = 4, edges = [[0,1],[0,3],[1,2],[2,1]], source = 0, destination = 3
Output: false
Explanation: We have two possibilities: to end at node 3, or to loop over node 1 and node 2 indefinitely.

Input: n = 4, edges = [[0,1],[0,2],[1,3],[2,3]], source = 0, destination = 3
Output: true

Input: n = 3, edges = [[0,1],[1,1],[1,2]], source = 0, destination = 2
Output: false
Explanation: All paths from the source node end at the destination node, but there are an infinite number of paths, 
such as 0-1-2, 0-1-1-2, 0-1-1-1-2, 0-1-1-1-1-2, and so on.

Input: n = 2, edges = [[0,1],[1,1]], source = 0, destination = 1
Output: false
Explanation: There is infinite self-loop at destination node.
*/

const COLORS = {
    BLACK: 'black',
    GREY: 'grey',
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var leadsToDestination = function(n, edges, source, destination) {
    const graph = new Map()
    const states = new Map()

    for (const [a, b] of edges) {
        if (!graph.has(a)) {
            graph.set(a, [])
        }
        const current = graph.get(a)
        current.push(b)
    }

    function backtrack(node) {
        if (states.has(node)) {
            return states.get(node) === COLORS.BLACK
        }

        if (!graph.get(node)) {
            return node === destination
        }

        states.set(node, COLORS.GREY)

        for (const neighbor of graph.get(node)) {
            if (!backtrack(neighbor)) {
                return false;
            }
        }

        states.set(node, COLORS.BLACK)
        return true;
    }

    
    return backtrack(source)
};

// const assert = require('assert')

// assert.equal(
//     leadsToDestination(3, [[0,1],[0,2]], 0, 2),
//     false
// )

// assert.equal(
//     leadsToDestination( 4, [[0,1],[0,3],[1,2],[2,1]], 0, 3),
//     false
// )

// assert.equal(
//     leadsToDestination(4, [[0,1],[0,2],[1,3],[2,3]], 0, 3),
//     true
// )

// assert.equal(
//     leadsToDestination( 3, [[0,1],[1,1]], 0, 1),
//     false
// )

// assert.equal(
//     leadsToDestination( 2, [[0,1],[1,1],[1,2]], 0, 2),
//     false
// )