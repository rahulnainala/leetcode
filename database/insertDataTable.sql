INSERT INTO problems (problem_name, leetcode_link, dataStructure_level, dataStructure, code_description, code)
VALUES
(
 'Contains Duplicates',
 'https://leetcode.com/problems/contains-duplicate/description/',
 'Easy',
 'Arrays',
 'For the Solution I created a for loop to go trough the array from arr\[0\] to arr\[length-1\]. Then I created a second for loop which   will do the above same and check if the element exists. if it exists the we would increase the count. and in the end if count ≥ 1 then we return true according to the question.',
 'function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}' );