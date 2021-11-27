/*
Given a string s, find the length of the longest substring without repeating characters.

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Input: s = ""
Output: 0
*/

/**
* @param {string} s
* @return {number}
*/
var lengthOfLongestSubstring = function(s) {
   const history = new Set();
   let i, j, result;
   i = j = result = 0;

   while (i < s.length) {
       const c = s.charAt(i)        
       while(history.has(c)) {
           history.delete(s.charAt(j))
           ++j;
       }
       history.add(c);
       result = Math.max(result, i - j + 1)
       ++i;
   }
   return result
};