// https://www.hackerrank.com/challenges/contacts/problem?isFullScreen=true

// working on building the suggestions

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
    constructor() {
        this.letters = []
        this.score = 1
        for(let i = 0; i < 26; i++) {
            this.letters[i] = null
        }
    }
}

class Trie {
    constructor(sentences=[]) {
        this.root = new Node
        for (const sentence of sentences) {
            this.insert(sentence)
        }
    }

    insert(sentence="") {
        let curr = this.root
        for(let i = 0; i < sentence.length; i++) {
            const convertedToInt = sentence.charCodeAt(i) - 97
            console.log("char: " + sentence.charAt(i))
            if(!curr) {
                var nodeInTrie = new Node
                nodeInTrie.letters[convertedToInt] = nodeInTrie
            } else {
                const c = sentence.charAt(i)
                curr.score++
            }
            curr = nodeInTrie
        }
        console.log("-----------------")
    }

    traverse(sentence="") {
        let curr = this.root
        let prev = curr
        let i = 0
        let accum = []
        while(curr !== null && !Number.isNaN(sentence.charCodeAt(i))) {
            let letter = sentence.charCodeAt(i) - 97
            accum.push(letter)
            prev = curr
            curr = curr.letters[letter]
            i++
        }
        // console.log(accum)
        return {
            accum,
            curr,
            // prev
        }
    }

    processPaths(explored, unexplored) {
        if (!unexplored) return explored

        const result = []
        unexplored.height = 0
        let stack = [ unexplored ]
        while(stack.length) {
            const curr = stack.pop()
            const intermediate = []
            for (let i = 0; i < 26; i++) {
                let col = curr.letters[i]
                if (col) {
                    stack.push({
                        ...col,
                        height: curr.height + 1
                    })
                    if (!Array.isArray(result[curr.height])){
                        result[curr.height] = []
                    }
                    result[curr.height].push({i, ...col, height: curr.height + 1})
                }
            }
        }
        return result
    }
}

/*
 * Complete the contacts function below.
 */
function contacts(queries) {
    /*
     * Write your code here.
     */
    const t = new Trie([
        queries[0][1], 
        queries[1][1]
    ])
    const { accum, curr } = t.traverse("ha")
    const v = t.processPaths(accum, curr)
    // console.log(
    //     v.map(([{i, height, score}]) => {
    //         const char = String.fromCharCode(i + 97)
    //         console.log("score: " + score)
    //         return Array(score).fill(char, 0, score)
    //     })
        
    // )
    return [2]
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const queriesRows = parseInt(readLine(), 10);

    let queries = Array(queriesRows);

    for (let queriesRowItr = 0; queriesRowItr < queriesRows; queriesRowItr++) {
        queries[queriesRowItr] = readLine().split(' ');
    }

    let result = contacts(queries);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
