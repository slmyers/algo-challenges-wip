// [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
// "ABCB"
// should be: false. I return true (buggggggg) 
// I think it's going A -> B <-> C, that is A to B to C then BACK to B, visited might be bugged

/*
[
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
]
"SEE"

should be: true. I return false (buugugug)
I'm not wrapping around, so [2][3] is adjacent to [0][3]
*/



/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const wordBoard = new WordBoard(board)
    
    return wordBoard.find(word)
};

class WordBoard {
    constructor(board) {
        this.rows = board.length 
        this.cols = board[0].length
        this.board = board
        // initialized in find on every invokation
        this.visited = null
    }
    
    find(word) {
        this.visited = []
        return this.backtrack(0, 0, word)
    }
    
    backtrack(row, col, suffix) {
        if (suffix.length === 0) {
            console.log("+++ +++ ")
            console.log("suffix: " + suffix)
            return true
        }
        
        if (
            !Array.isArray(this.board[row]) ||
            this.outsideOfBounds(row, col) ||
            this.board[row][col] !== suffix.charAt(0)            
        ) {
            return false
        }
            
        let ret = false
        console.log("suffix: " + suffix)
        for (const [i, j] of this.getNeighbors(row, col)) {
            ret = this.backtrack(i, j, suffix.slice(1))
            this.visited.push(`${i}${j}`)
            
            if (ret) break
        }
        
        //console.log("ret: " + ret)
        
        return ret
        
    }
    
    getNeighbors(row, col) {
        return [
            [row - 1, col - 1],
            [row - 1, col],
            [row - 1, col + 1],
            [row, col - 1],
            [row, col + 1],
            [row + 1, col - 1],
            [row + 1, col],
            [row + 1, col + 1]
        ].filter(([i, j]) => this.insideBoard(i, j) && !this.visited.includes(`${i}{j}`))      
    }
    
    insideBoard(row, col) {
        return !this.outsideOfBounds(row, col)
    }
    
    
    outsideOfBounds(row, col) {
        return (
            row > this.rows || 
            col > this.cols ||
            row < 0 ||
            col < 0 
        )
    }
    
}
