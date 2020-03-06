// https://www.hackerrank.com/challenges/find-the-running-median/problem

// super dumb version

// I think it O(n * m * log(m))?
// native sort is quicksort so m * log(m)
// there are n elements
// so O(n * m * log(m))

function computeMedian(values) {
    if (values.length === 0) return 0

    const half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];

    return (values[half - 1] + values[half]) / 2.0;
}

function runningMedian(a) {
    let result = []
    let current = []
    /*
     * Write your code here.
     */
    while(a.length) {
        current.push(a.shift())
        result.push(Number(computeMedian(current)).toFixed(1))
    }
    return result
}

// end super dumb






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

function medianOfMedians(n) {

}

function computeMedian(arr) {
    let result = null

    arr.sort()
    const length = arr.length
    const mid = length / 2
    if (length % 2 !== 0) {
        result = arr[Math.floor(mid)]
    } else {
        result = (arr[Math.floor(mid) - 1] + arr[Math.floor(mid)]) / 2
    }

    return result
}

/*
 * Complete the runningMedian function below.
 */
function runningMedian(a) {
    let result = []
    let current = []
    /*
     * Write your code here.
     */
    while(a.length) {
        current.push(a.shift())
        computeMedian(current)
    }
    
    return result.map(n => Number(n).toFixed(1))
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const aCount = parseInt(readLine(), 10);

    let a = [];

    for (let aItr = 0; aItr < aCount; aItr++) {
        const aItem = parseInt(readLine(), 10);
        a.push(aItem);
    }

    let result = runningMedian(a);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
