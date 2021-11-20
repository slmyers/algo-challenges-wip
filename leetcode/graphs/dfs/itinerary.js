/*
You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. 
Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, 
you should return the itinerary that has the smallest lexical order when read as a single string.

For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.

Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]

Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.
*/



/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {
    const flights = tickets.length;
    const graph = new Map()
    let result = []

    // build graph
    for (const ticket of tickets) {
        const [a, b] = ticket;
        let v;
        if (!graph.has(a)) {
            graph.set(a, [])
        }
        v = graph.get(a)
        v.push(b)
    }

    for (const [k, v] of graph.entries()) {
        graph.set(k, v.sort())
    }

    const visitMap = new Map();
    function backtrack(origin, route) {
        if (route.length === flights + 1) {
            result = route
            return true
        }
        const endpoints = graph.get(origin)
        for (const destination of endpoints) {
            if (destination && !visitMap.has(destination)) {
                visitMap.set(destination, true)
                route.push(destination)
                if (backtrack(destination, route)) {
                    return true
                }
                visitMap.delete(destination)
            }
        }

        return false
    }

    // start at root
    backtrack('JFK', ['JFK'])

    return result
};

// console.log(findItinerary([["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]))

/*
 this fails with [ 'JFK', 'ATL', 'JFK', 'SFO', 'SFO', 'SFO' ]
*/
console.log(findItinerary(
    [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
))