/*
You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.

You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.

Return the answers to all queries. If a single answer cannot be determined, return -1.0.

Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.


Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
Explanation: 
Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
return: [6.0, 0.5, -1.0, 1.0, -1.0 ]

Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75000,0.40000,5.00000,0.20000]

Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
Output: [0.50000,2.00000,-1.00000,-1.00000]
*/

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
    const vs = new ValueSets()
    for (let i = 0; i < equations.length; i++) {
        vs.union(...equations[i], values[i])
        console.log(vs)
    }

    let results = []
    for (const [dividend, divisor] of queries) {
        if(!(vs.gidWeight.has(dividend) && vs.gidWeight.has(divisor))) {
            results.push(-1.0)
        } else {
            const { groupId: dividendGid, nodeWeight: dividendWeight } = vs.find(dividend)
            const { groupId: divisorGid, nodeWeight: divisorWeight } = vs.find(divisor)
            if (dividendGid !==  divisorGid) {
                results.push(-1.0)
            } else {
                results.push( dividendWeight / divisorWeight )
            }
        }
    }
    return results
};


class ValueSets {
    constructor() {
        this.gidWeight = new Map();
    }

    find(nodeId) {
        if (!this.gidWeight.has(nodeId)) {
            this.gidWeight.set(nodeId, { groupId: nodeId, nodeWeight: 1 })
        }
        const { groupId, nodeWeight } = this.gidWeight.get(nodeId);
        if (groupId !== nodeId) {
            const { groupId: newGroupId, nodeWeight: groupWeight } = this.find(groupId)
            this.gidWeight.set(nodeId, { groupId: newGroupId, nodeWeight: nodeWeight * groupWeight })
        }

        return this.gidWeight.get(nodeId)
    }

    union(x, y, v) {
        const { groupId: dividendGid, nodeWeight: dividendWeight } = this.find(x)
        const { groupId: divisorGid, nodeWeight: divisorWeight } = this.find(y)

        if (dividendGid !== divisorGid) {
            this.gidWeight.set(dividendGid, 
                { groupId: divisorGid, nodeWeight: (divisorWeight * v) / dividendWeight }
            )
        }
    }

    connected(x, y) {
        return this.find(x) === this.find(y)
    }
}


console.log(calcEquation([["a","b"],["b","c"]],
[2.0,3.0],
[["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]))