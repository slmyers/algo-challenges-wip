/*
You are given a string s, and an array of pairs of indices in the string pairs where 
pairs[i] = [a, b] indicates 2 indices(0-indexed) of the string.

You can swap the characters at any pair of indices in the given pairs any number of times.

Return the lexicographically smallest string that s can be changed to after using the swaps.

Input: s = "dcab", pairs = [[0,3],[1,2]]
Output: "bacd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[1] and s[2], s = "bacd"

Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
Output: "abcd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[0] and s[2], s = "acbd"
Swap s[1] and s[2], s = "abcd"

Input: s = "cba", pairs = [[0,1],[1,2]]
Output: "abc"
Explaination: 
Swap s[0] and s[1], s = "bca"
Swap s[1] and s[2], s = "bac"
Swap s[0] and s[1], s = "abc"
*/

/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
 var smallestStringWithSwaps = function(s, pairs) {
    const ds = new OptimizedDisjointSet(s.length)
    for (const [x, y] of pairs) {
        ds.union(x, y)
    }

    if (ds.size === 1) {
        return s.split("").sort().join("")
    }

    const partitions = {}
    for (let i = 0; i < s.length; i++) {
        const r = ds.find(i)
        if (partitions[r] === undefined) {
            partitions[r] = []
        }
        partitions[r].push(s.charAt(i))
    }

    for (const [key, value] of Object.entries(partitions)) {
        partitions[key] = value.sort()
    }

    let result = []
    for (let i = 0; i < s.length; i++) {
        const root = ds.find(i)
        result.push(partitions[root].shift())
    }

    return result.join("")
};

class OptimizedDisjointSet {
    constructor(n) {
        this.root = Array.from({ length: n }).map((_, i) => i)
        this.rank = Array.from({ length: n }).map(() => 1)
        this.size = n
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
            this.size -= 1
        }
    }

    connected(x, y) {
        return this.find(x) === this.find(y)
    }
}
