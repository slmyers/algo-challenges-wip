'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

class Node {
    constructor(val, depth) {
        this.val = val
        this.depth = depth
        this.right = null
        this.left = null
    }
}

function buildTree(input) {
    const root = new Node(1, 1)
    const stack = [root]
    const numNodes = input.reduce((accum, row) => accum += row.length, 0)
    let n = 0
    while(n < numNodes && stack.length) {
        let curr = stack.pop()
        const left = input[n][0]
        const right = input[n][1]

        curr.left = left !== -1 ? new Node(left, curr.depth + 1) : null
        curr.right = right !== -1 ? new Node(right, curr.depth + 1) : null
        if (curr.left) {
            stack.push(curr.left)
        }
        if (curr.right) {
            stack.push(curr.right)
        }

        n++
    }

    return root
}

function performSwap(root, k) {
    const stack = [root]
    while (stack.length) {
        const curr = stack.pop()

        if (curr.right) {
            stack.push(curr.right)
        }

        if (curr.left) {
            stack.push(curr.left)
        }

        if (curr.depth % k === 0) {
            const temp = curr.left
            curr.left = curr.right
            curr.right = temp
        }
    }
    return root
}

function toInOrderArray(root, result=[]) {
    if (!root) return result

    toInOrderArray(root.left, result)
    result.push(root.val)
    toInOrderArray(root.right, result)
}

/*
 * Complete the swapNodes function below.
 */
function swapNodes(indexes, queries) {
    /*
     * Write your code here.
     */
    let result = []
    const tree = buildTree(indexes)

    for (const q of queries) {
        performSwap(tree, q)
        let intermediate = []
        const inOrderArray = toInOrderArray(tree, intermediate)
        result.push(intermediate)
    }

    return result
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let indexes = Array(n);

    for (let indexesRowItr = 0; indexesRowItr < n; indexesRowItr++) {
        indexes[indexesRowItr] = readLine().split(' ').map(indexesTemp => parseInt(indexesTemp, 10));
    }

    const queriesCount = parseInt(readLine(), 10);

    let queries = [];

    for (let queriesItr = 0; queriesItr < queriesCount; queriesItr++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    let result = swapNodes(indexes, queries);

    ws.write(result.map(x => x.join(' ')).join("\n") + "\n");

    ws.end();
}
