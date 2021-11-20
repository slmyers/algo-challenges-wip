/*
There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, 
and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are 
directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2

Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
*/

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
 var findCircleNum = function(isConnected) {
    const ds = new DisjointSet(isConnected[0].length)
    for (let i = 0; i < isConnected[0].length; i++) {
        for (let j = 0; j < isConnected[0].length; j++) {            
            if (isConnected[i][j]) {
                console.log({ i, j})
                ds.union(i, j)
                console.log(ds.root)
            }
           
        }
    }
    // console.log('.....')
    // console.log(ds.root)
    // TODO: need to walk graph
    return new Set(ds.root).size
};

module.exports.findCircleNum = findCircleNum;

class DisjointSet {
    constructor(n) {
        this.root = Array.from({ length: n }).map((_, i) => i)
        this.rank = Array.from({ length: n }).map(() => 1)
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