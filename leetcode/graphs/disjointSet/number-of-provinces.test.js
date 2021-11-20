const assert = require('assert')
const { findCircleNum } = require('./number-of-provinces')

describe('findCircleNum', function () {
    it('[[1,0,0],[0,1,0],[0,0,1]]', function () {
        assert.equal(findCircleNum([[1,0,0],[0,1,0],[0,0,1]]), 3)
    })

    it('[[1,1,0],[1,1,0],[0,0,1]]', function () {
        assert.equal(
            findCircleNum([[1,1,0],[1,1,0],[0,0,1]]),
            2
        )
    })

    it.only('[[1,0,0,1],[0,1,1,0],[0,1,1,1],[1,0,1,1]]', function () {
        assert.equal(
            findCircleNum([[1,0,0,1],[0,1,1,0],[0,1,1,1],[1,0,1,1]]),
            1
        )
    })
})