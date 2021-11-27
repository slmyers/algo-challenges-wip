/*
Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such 
that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

A substring is a contiguous sequence of characters within the string.

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    const mappedT = new Map();
    let required = 0
    for (const c of t) {
        if (!mappedT.has(c)) {
            mappedT.set(c, 0)
        }
        mappedT.set(c, mappedT.get(c) + 1)
    }

    required = mappedT.size


    let left, right, formed, result;
    left = right = formed = 0;
    result = { length: -1, l: 0, r: 0 };
    const window = new Map();
    while (right < s.length) {
        const c = s.charAt(right)

        if (!window.has(c)) {
            window.set(c, 1)
        } else {
            window.set(c, window.get(c) + 1)
        }

        if (mappedT.has(c) && window.get(c) === mappedT.get(c)) {
            formed += 1;
        }

        
        while(left <= right && formed === required) {
            const lc = s.charAt(left)
            const { length } = result;
            if (length === -1 || right - left + 1 < length) {
                result.length = right - left + 1;
                result.l = left;
                result.r = right;
            }

            window.set(lc, window.get(lc) - 1)
            if (mappedT.has(lc) && window.get(lc) < mappedT.get(lc)) {
                formed--;
            }

            left++;
        }

        right++
    }

    return result.length === -1 ? "" : s.slice(result.l, result.r + 1)
};


const assert = require('assert')

assert.equal(minWindow("ADOBECODEBANC", "ABC"), "BANC")
assert.equal(minWindow("a", "a"), "a")
assert.equal(minWindow("a", "aa"), "")
assert.equal(minWindow("aa", "aa"), "aa")