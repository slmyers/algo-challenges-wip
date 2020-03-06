'use strict';

// input 'ha' provides two hits for [c] but only one for [k],
// so the sugestions would be ha<c> and hac<kerrank>

/*
[ [ 'c', 'c' ],
  [ 'k' ],
  [ 'e' ],
  [ 'r' ],
  [ 'r' ],
  [ 'a' ],
  [ 'n' ],
  [ 'k' ] ]
*/

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

            if(!curr.letters[convertedToInt]) {
                curr.letters[convertedToInt] =  new Node
            } else {
                // console.log("====")
                // console.log(curr.score)
                curr.score++
                // console.log(curr.score)
                // console.log("====")
            }
            // let _c = sentence.charAt(i)
            // if(
            //     _c === "h" || 
            //     _c === "a" ||
            //     _c === "c" ||
            //     _c === "k"
            // ) {
            //     console.log(curr)
            //     console.log("++++")
            // }

            curr = curr.letters[convertedToInt]
        }
    }

    traverse(sentence="") {
        let curr = this.root
        let prev = curr
        let i = 0
        let accum = []
        while(curr !== null && sentence.charAt(i)) {
            let letter = sentence.charCodeAt(i) - 97
            accum.push(letter)
            // console.log(curr)
            prev = curr
            curr = curr.letters[letter]
            i++
            // console.log(curr)
        }
        // console.log(accum)
        return {
            accum,
            curr,
            prev
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
                    if(!result[curr.height]) result[curr.height] = []
                    result[curr.height].push({...col, i, height: curr.height + 1})
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
    const { accum, curr, prev } = t.traverse("ha")
    const v = t.processPaths(accum, curr)
    console.log(curr.letters)
    console.log(curr.letters[2])
    // console.log(
    //     v.map(([{i, height, score}, other]) => {
    //         const char = String.fromCharCode(i + 97)
    //         console.log("score: " + score)
    //         if(other) console.log(other)
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
