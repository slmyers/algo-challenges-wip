const assert = require('assert')
const { QuickUnion, QuickFind, RankUnion, PathCompression, OptimizedDisjointSet } = require('./index')

describe.only('OptimizedDisjointSet', function () {
    let q

    beforeEach(function () {
        q = new OptimizedDisjointSet(10)
    })

    describe('find', function () {
        it('finds the root node of an entry', function () {
            assert.equal(q.find(0), 0)

            q.union(0, 1)
            q.union(1, 4)

            assert.equal(q.find(4), 0)
        })
    })

    describe('union', function () {
        it('unions two nodes', function () {
            q.union(1, 2)

            assert.equal(q.root[2], 1)

            q.union(2, 6)

            assert.equal(q.root[6], 1)
        })

        it('does this thing', function () {
            q.root = [0, 0, 0, 1, 4, 4, 4]
            q.rankArray = [4, 1, 0, 0, 3, 0, 0]

            q.union(0, 5)

            assert.deepEqual(q.root, [0,0,0,1,0,4,4])
            assert.deepEqual(q.rankArray, [4, 1, 0, 0, 3, 0, 0])
        })

        it('does this thing2', function () {
            q.union(0, 4)
            q.union(4, 5)
            assert.deepEqual(q.root, [0,1,2,3,0,0,6,7,8,9])
        })
    })

    describe('connected', function () {
        it('can tell if there is a connection', function () {
            q.root[2] = 0
            q.root[4] = 0
            assert.equal(q.connected(2, 4), true)
        })
    })
})

describe('PathCompression', function () {
    let q

    beforeEach(function () {
        q = new PathCompression(10)
    })

    describe('find', function () {
        it('finds the root node of an entry', function () {
            assert.equal(q.find(0), 0)

            q.union(0, 1)
            q.union(1, 4)

            assert.equal(q.find(4), 0)
        })
    })

    describe('union', function () {
        it('unions two nodes', function () {
            q.union(1, 2)

            assert.equal(q.rootArray[2], 1)

            q.union(2, 6)

            assert.equal(q.rootArray[6], 1)
        })

        it('does this thing', function () {
            q.rootArray = [0, 0, 0, 1, 4, 4, 4]
            q.rankArray = [4, 1, 0, 0, 3, 0, 0]

            q.union(0, 5)

            assert.deepEqual(q.rootArray, [0,0,0,1,0,4,4])
            assert.deepEqual(q.rankArray, [4, 1, 0, 0, 3, 0, 0])
        })

        it('does this thing2', function () {
            q.union(0, 4)
            q.union(4, 5)
            assert.deepEqual(q.rootArray, [0,1,2,3,0,0,6,7,8,9])
        })
    })

    describe('connected', function () {
        it('can tell if there is a connection', function () {
            q.rootArray[2] = 0
            q.rootArray[4] = 0
            assert.equal(q.connected(2, 4), true)
        })
    })
})

describe('RankUnion', function () {
    let q

    beforeEach(function () {
        q = new RankUnion(10)
    })

    describe('find', function () {
        it('finds the root node of an entry', function () {
            assert.equal(q.find(0), 0)

            q.union(0, 1)
            q.union(1, 4)

            assert.equal(q.find(4), 0)
        })
    })

    describe('union', function () {
        it('unions two nodes', function () {
            q.union(1, 2)

            assert.equal(q.rootArray[2], 1)

            q.union(2, 6)

            assert.equal(q.rootArray[6], 1)
        })

        it('does this thing', function () {
            q.rootArray = [0, 0, 0, 1, 4, 4, 4]
            q.rankArray = [4, 1, 0, 0, 3, 0, 0]

            q.union(0, 5)

            assert.deepEqual(q.rootArray, [0,0,0,1,0,4,4])
            assert.deepEqual(q.rankArray, [4, 1, 0, 0, 3, 0, 0])
        })

        it('does this thing2', function () {
            // console.log(JSON.stringify(q, null, 4))
            q.union(0, 4)
            assert.deepEqual(q.rootArray, [0, 1, 2, 3, 0, 5, 6, 7, 8, 9])
            assert.deepEqual(q.rank, [2, 1, 1, 1, 1, 1, 1, 1, 1, 1])
            q.union(4, 1)
            assert.deepEqual(q.rootArray, [0, 0, 2, 3, 0, 5, 6, 7, 8, 9])
            assert.deepEqual(q.rank, [2, 1, 1, 1, 1, 1, 1, 1, 1, 1])
            q.union(9, 8)
            q.union(9, 7)
            assert.deepEqual(q.rootArray, [0, 0, 2, 3, 0, 5, 6, 9, 9, 9])
            assert.deepEqual(q.rank, [2, 1, 1, 1, 1, 1, 1, 1, 1, 2])
            q.union(4, 9)
            assert.deepEqual(q.rootArray, [0, 0, 2, 3, 0, 5, 6, 9, 9, 0])
            assert.deepEqual(q.rank, [3, 1, 1, 1, 1, 1, 1, 1, 1, 2])
        })
    })

    describe('connected', function () {
        it('can tell if there is a connection', function () {
            q.rootArray[2] = 0
            q.rootArray[4] = 0
            assert.equal(q.connected(2, 4), true)
        })
    })
})

describe('QuickUnion', function () {
    let q

    beforeEach(function () {
        q = new QuickUnion(10)
    })

    describe('find', function () {
        it('finds the root node of an entry', function () {
            assert.equal(q.find(0), 0)

            q.union(0, 1)
            q.union(1, 4)

            assert.equal(q.find(4), 0)
        })
    })

    describe('union', function () {
        it('unions two nodes', function () {
            q.union(1, 2)

            assert.equal(q.rootArray[2], 1)

            q.union(2, 6)

            assert.equal(q.rootArray[6], 1)
        })

        it('does this thing', function () {
            q.rootArray = [0, 0, 0, 0, 4, 4, 4]

            q.union(0, 5)

            assert.deepEqual(q.rootArray, [0,0,0,0,0,4,4])
        })
    })

    describe('connected', function () {
        it('can tell if there is a connection', function () {
            q.rootArray[2] = 0
            q.rootArray[4] = 0
            assert.equal(q.connected(2, 4), true)
        })
    })
})

describe('QuickFind', function () {
    let q

    beforeEach(function () {
        q = new QuickFind(10)
    })

    describe('find', function () {
        it('finds the root node of an entry', function () {
            assert.equal(q.find(0), 0)

            q.union(0, 1)
            q.union(1, 4)

            assert.equal(q.find(4), 0)
        })
    })

    describe('union', function () {
        it('unions two nodes', function () {
            q.union(1, 2)

            assert.equal(q.rootArray[2], 1)

            q.union(2, 6)

            assert.equal(q.rootArray[6], 1)
        })

        it('does this thing', function () {
            q.rootArray = [0, 0, 0, 0, 4, 4, 4]

            q.union(0, 5)

            assert.deepEqual(q.rootArray, [0,0,0,0,0,0,0])
        })
    })

    describe('connected', function () {
        it('can tell if there is a connection', function () {
            q.rootArray[2] = 0
            q.rootArray[4] = 0
            assert.equal(q.connected(2, 4), true)
        })
    })
})



