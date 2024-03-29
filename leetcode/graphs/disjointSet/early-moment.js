/*
There are n people in a social group labeled from 0 to n - 1. You are given an array logs where logs[i] = [timestampi, xi, yi] 
indicates that xi and yi will be friends at the time timestampi.

Friendship is symmetric. That means if a is friends with b, then b is friends with a. Also, person a is acquainted with a 
person b if a is friends with b, or a is a friend of someone acquainted with b.

Return the earliest time for which every person became acquainted with every other person. If there is no such earliest time, return -1.

Input: logs = [[20190101,0,1],[20190104,3,4],[20190107,2,3],[20190211,1,5],[20190224,2,4],[20190301,0,3],[20190312,1,2],[20190322,4,5]], n = 6
Output: 20190301
Explanation: 
The first event occurs at timestamp = 20190101 and after 0 and 1 become friends we have the following friendship groups [0,1], [2], [3], [4], [5].
The second event occurs at timestamp = 20190104 and after 3 and 4 become friends we have the following friendship groups [0,1], [2], [3,4], [5].
The third event occurs at timestamp = 20190107 and after 2 and 3 become friends we have the following friendship groups [0,1], [2,3,4], [5].
The fourth event occurs at timestamp = 20190211 and after 1 and 5 become friends we have the following friendship groups [0,1,5], [2,3,4].
The fifth event occurs at timestamp = 20190224 and as 2 and 4 are already friends anything happens.
The sixth event occurs at timestamp = 20190301 and after 0 and 3 become friends we have that all become friends.


Input: logs = [[0,2,0],[1,0,1],[3,0,3],[4,1,2],[7,3,1]], n = 4
Output: 3
*/
const UNINITIALIZED_VALUE = Number.MAX_SAFE_INTEGER


/**
 * @param {number[][]} logs
 * @param {number} n
 * @return {number}
 */
var earliestAcq = function(logs, n) {
    const ds = new DisjointSet(n)
    logs.sort((a, b) => a[0] - b[0])
    for (const [timestamp, x, y] of logs) {
        // const before = ds.size
        ds.union(x, y)
        if ( ds.size === 1 ) {
            return timestamp
        }
        
    }
    // console.log(ds.size)
    // console.log(ds)
    // if (ds.size !== 1) {
    //     return -1
    // }

    return -1
};



class DisjointSet {
    constructor(n) {
        this.root = Array.from({ length: n }).map((_, i) => i)
        this.size = n;
    }

    find(x) {
        return this.root[x]
    }
    
    union(x, y) {
        let rootX = this.find(x)
        let rootY = this.find(y)

        if (rootX !== rootY) {
            for (let i = 0; i < this.root.length; i++) {
                if (this.root[i] === rootY) {
                    this.root[i] = rootX
                }
            }
            this.size -= 1
        }
    }
}

// console.log(earliestAcq([[20190101,0,1],[20190104,3,4],[20190107,2,3],[20190211,1,5],[20190224,2,4],[20190301,0,3],[20190312,1,2],[20190322,4,5]],
//     6))

console.log(earliestAcq([[7,3,1],[2,3,0],[3,2,1],[6,0,1],[0,2,0],[4,3,2]],
    4)) // expects 3