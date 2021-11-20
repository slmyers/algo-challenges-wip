/*
You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] 
indicates that there is an edge between ai and bi in the graph.

Return the number of connected components in the graph.

Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2

Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
Output: 1

*/

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
    const ds = new DisjointSet(n)
    for (const [x, y] of edges) {
        ds.union(x, y)
    }
    const onlyRoots = Array.from({ length: n }).map((_, i) => ds.find(i))
    return new Set(onlyRoots).size
};

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

// console.log(countComponents(4,
//     [[0,1],[2,3],[1,2]]))