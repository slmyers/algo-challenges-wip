/*
Runtime: 64 ms, faster than 64.10% of JavaScript online submissions for Minimum Depth of Binary Tree.
Memory Usage: 36.9 MB, less than 100.00% of JavaScript online submissions for Minimum Depth of Binary Tree.
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) { 
    if (!root) return 0
        
    let result = 0
    let level = 0
    let queue = [ root ] 
    while(queue.length) {
        let rowLength = queue.length
        let rowIndex = 0
        level++;
        while(rowIndex < rowLength) {
            let curr = queue.shift()
            // inline edit not tested - convert with De Morgan's law
            if(!(curr.left || curr.right)) {
                return level
            }
                    
            if (curr.left) queue.push(curr.left)
            if (curr.right) queue.push(curr.right)
            
            rowIndex++
        }
    }
    return result
};
