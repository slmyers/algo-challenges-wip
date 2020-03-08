// I have the Trie working and boy is it ever glorious :praise_the_sun:


const assert = require("assert")
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    let result = []
    const t = new Trie()
    for (const w of words) {
        t.insert(w)
    }

    assert.strictEqual(
        t.find("zack"),
        false,
        "'zack' is not in the list!"
    )

    assert.strictEqual(
        t.find("te"),
        false,
        "'te' is not in the list!"
    )

    assert.strictEqual(
        t.find("test"),
        true,
        "'test' is in the list!"
    )

    assert.strictEqual(
        t.find("testy"),
        true,
        "'testy' is in the list!"
    )

    for (const w of words) {
        assert.strictEqual(
            t.find(w),
            true,
            `'${w}' is in the list!`
        )
    }

    console.log("ALL TESTS PASS!")
};



class Trie {
    constructor() {
        this.root = { root: true, next: {}, count: 0 }
    }
    insert(word) {
        let curr = this.root
        const _word = Array.from(word)
        for (let i = 0; i < _word.length; i++) {
            const c = _word[i]

            if(!curr.next[c]) {
                curr.next[c] = { next: {  }, count: 1 }
            }
            curr = curr.next[c]        
        }
        curr.count++
    }
    find(word) {
        let curr = this.root
        let c = 0
        while(curr.next && word.charAt(c)) {
            const letter = word.charAt(c)
            if (curr.next[letter]) {
                curr = curr.next[letter]
                c++
            } else {
                return false
            }
        }
        return curr.count > 1
    }
}

findWords(
    [
        ["o","a","a","n"],
        ["e","t","a","e"],
        ["i","h","k","r"],
        ["i","f","l","v"]
    ],
    [
        "tea", 
        "test",
        "testy",
        "worth",
        "wall",
        "stall",
        "doll" 
    ]
)
