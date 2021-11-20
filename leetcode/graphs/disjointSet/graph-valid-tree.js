/*
You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where 
edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.

Return true if the edges of the given graph make up a valid tree, and false otherwise.

According to the definition of tree on Wikipedia: “a tree is an undirected graph in which any two vertices are connected by exactly one path.
In other words, any connected graph without simple cycles is a tree.”

Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true

Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false
*/

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function(n, edges) {
    const ds = new DisjointSet(n)
    for (const [x, y] of edges) {
        if (ds.find(y) === ds.find(x)) {
            console.log('early exit')
            return false
        }
        ds.union(x, y)
    }

    const first = ds.find(0)
    for (let i = 1; i < ds.root.length; i++) {
        if (ds.find(i) !== first) {
            return false;
        }
    }
    return true
};

module.exports = validTree

class DisjointSet {
    constructor(n) {
        this.root = Array.from({ length: n }).map((_, i) => i)
        this.rank = Array.from({ length: n }).fill(1)
    }

    find(x) {
        if (x === this.root[x]) {
            return x
        }
        return this.root[x] = this.find(this.root[x])
    }

    union(x, y) {
        const rootX = this.find(x)
        const rootY = this.find(y)
        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.root[rootY] = rootX
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.root[rootX] = rootY
            } else {
                this.root[rootY] = rootX
                this.rank[rootX] += 1
            }
        }
    }

    connected(x, y) {
        return this.find(x) === this.find(y)
    }
}

// validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])
// console.log(validTree(4, [[0,1],[2,3],[1,2]]))
// console.log(validTree(10,
//     [[5,6],[0,2],[1,7],[5,9],[1,8],[3,4],[0,6],[0,7],[0,3],[8,9]]))