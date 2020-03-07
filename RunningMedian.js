// https://www.hackerrank.com/challenges/find-the-running-median/problem

// using kth smallest quickselect where k is median index
function computeMedian(values) {
    if (values.length === 0) return 0

    const half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];

    return (values[half - 1] + values[half]) / 2.0;
}

function swap(a, i, j) {
    let t = a[i]
    a[i] = a[j]
    a[j] = t 
}

function partition(arr, left, right, pivot) {
    let pivotValue = arr[pivot]
    let lesserThanTailIndex = left

    // console.log("------")
    // console.log("before clear")
    // console.log(arr)
    // clear the pivot
    swap(arr, pivot, right)
    // console.log("after clear")
    // console.log(arr)

    // bulldoze through sort space
    for (let i = left; i < right; i++) {
        if (arr[i] < pivotValue) {
            swap(arr, i, lesserThanTailIndex)
            lesserThanTailIndex++
        }
    } 
    // console.log("bulldozed")
    // console.log(arr)
    // // restore the pivot
    // console.log("restored")
    swap(arr, right, lesserThanTailIndex)
    // console.log(arr)
    console.log("-----")

    return lesserThanTailIndex
}

function medianSelect(arr, k) {
    if (arr.length <= 1) return arr[0]

    let n = arr.length
    let i = 0
    let j = n - 1
    const input = [...arr]

    while (i <= j) {
        let chosenPivotIndex = getRandomInt(j - i) + i
        // console.log(arr)
        // console.log("chosenPivotIndex: " + chosenPivotIndex)
        // console.log("j: " + j)
        // console.log("i: " + i)
        // console.log("length: " + arr.length)
        let actualPivotIndex = partition(arr, i, j, chosenPivotIndex)
        // console.log("actual pivot index: " + actualPivotIndex + `, k: ${k}`)
        if (actualPivotIndex === n - k) {
            return arr[actualPivotIndex]
        } else if (actualPivotIndex > n - k) {
            // overshot
            j = actualPivotIndex - 1
        } else {
            i = actualPivotIndex + 1
        }
    }
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
        const half = Math.floor(current.length / 2);

        if (current.length < 25 && 1 === 4 /* do not enter */) {
            // simpler to just calculate
            result.push(Number(computeMedian(current)).toFixed(1))
        } else {
            // TODO: this seems to calculate the correct median for odd sized arrays
            medianSelect(current, half + 1)
        }
    }
    return result
}

// END quickselect




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
