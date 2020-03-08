// javascript sucks because no data structures, i'm just going to learn something that has a heap built-in
// that being said, this only really needs a `sink down` / `peek` / `extract` method

class Heap {
    constructor(arr) {        
        this.heap = arr
        this._bubbleComparator = () => {
            throw new Error("unimplemented")
        }
    }
    
    insert(val) {
        this.heap.push(val)
        this._bubbleUp()
        return this
    }
    
    _bubbleUp() {
        let i = this.heap.length - 1
        let insertedValue = this.heap[i]
        while(i >= 0) {
            const parentIndex = Math.floor((i - 1) / 2)
            const parentValue = this.heap[parentIndex]            
            if (!this._bubbleComparator(insertedValue, parentValue)) {
                return
            }
            this._swap(i, parentIndex)
            i = parentIndex
        }
    }
    
    _swap(i, parentIndex) {
        let temp = this.heap[parentIndex]
        this.heap[parentIndex] = this.heap[i]
        this.heap[i] = temp
    }
}


class MaxHeap extends Heap {
    constructor(arr) {
        super(arr)
        this._bubbleComparator = (a, b) => (a > b)
        this.heap.sort((a, b) => !this._bubbleComparator(a, b))
    }
}

class MinHeap extends Heap {
    constructor(arr) {
        super(arr)
        this._bubbleComparator = (a, b) => (a < b)
        this.heap.sort((a, b) => !this._bubbleComparator(a, b))
    }
}

const assert = require("assert")
const __min__ = new MinHeap([4, 2, 6])
const __min__2 = new MinHeap([])
const __max__ = new MaxHeap([2, 1, 3])

assert.deepEqual(
    __min__2.insert(3).insert(2).heap,
    [2, 3],
    JSON.stringify(__min__2, null, 4)
)

assert.deepEqual(
    __min__.insert(1).heap,
    [1, 2, 6, 4],
    JSON.stringify(__min__, null, 4)
)

// assert.deepEqual(
//     __min__.heap,
//     [2, 4, 6],
//     JSON.stringify(__min__, null, 4)
// )
assert.deepEqual(
    __max__.heap,
    [3, 2, 1],
    JSON.stringify(__max__, null, 4)
)
