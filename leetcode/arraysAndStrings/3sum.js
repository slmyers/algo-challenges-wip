/*
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] 
such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

Input: nums = []
Output: []

Input: nums = [0]
Output: []
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
    if (nums.length < 3) {
        return []
    }

    // build index (n => [...indices])
    const index = new Map()
    for (let i = 0; i < nums.length; i++) {
        const curr = nums[i]
        if (!index.has(curr)) {
            index.set(curr, [])
        }
        index.get(curr).push(i)
    }

    for (const [value, indices] of index.entries()) {
        const target = value * -1;
        // TODO...
        const compliment = twoSum(index, target, curr)
    }
};

var twoSum = function (map, target) {

}