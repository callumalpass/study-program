import { CodingExercise } from '../../../../core/types';

export const cs201Topic3Exercises: CodingExercise[] = [
  // 1. Linear Search - Find Index
  {
    id: 'cs201-ex-3-1',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Linear Search - Find Index',
    description: 'Write a function `linear_search(arr, target)` that returns the index of the first occurrence of target in arr, or -1 if not found. Time complexity: O(n).',
    difficulty: 1,
    language: 'python',
    starterCode: 'def linear_search(arr, target):\n    # Your code here\n    pass',
    solution: 'def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i\n    return -1',
    testCases: [
      { input: '[4, 2, 7, 1, 9], 7', expectedOutput: '2', isHidden: false, description: 'Target found at index 2' },
      { input: '[4, 2, 7, 1, 9], 5', expectedOutput: '-1', isHidden: false, description: 'Target not in array' },
      { input: '[1, 1, 1], 1', expectedOutput: '0', isHidden: false, description: 'Multiple occurrences, return first' },
      { input: '[], 5', expectedOutput: '-1', isHidden: true, description: 'Empty array' }
    ],
    hints: ['Iterate through the array from start to end.', 'Return the index immediately when you find the target.', 'If the loop completes without finding the target, return -1.']
  },
  // 2. Linear Search - Find All Occurrences
  {
    id: 'cs201-ex-3-2',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Find All Occurrences',
    description: 'Write a function `find_all_occurrences(arr, target)` that returns a list of all indices where target appears in arr. Return an empty list if not found.',
    difficulty: 1,
    language: 'python',
    starterCode: 'def find_all_occurrences(arr, target):\n    # Your code here\n    pass',
    solution: 'def find_all_occurrences(arr, target):\n    indices = []\n    for i in range(len(arr)):\n        if arr[i] == target:\n            indices.append(i)\n    return indices',
    testCases: [
      { input: '[1, 2, 3, 2, 5, 2], 2', expectedOutput: '[1, 3, 5]', isHidden: false, description: 'Multiple occurrences' },
      { input: '[1, 2, 3], 4', expectedOutput: '[]', isHidden: false, description: 'Not found' },
      { input: '[5, 5, 5, 5], 5', expectedOutput: '[0, 1, 2, 3]', isHidden: false, description: 'All elements match' },
      { input: '[], 1', expectedOutput: '[]', isHidden: true, description: 'Empty array' }
    ],
    hints: ['Create an empty list to store indices.', 'Loop through the entire array, collecting all matching indices.', 'Return the list even if it\'s empty.']
  },
  // 3. Linear Search - Find Maximum
  {
    id: 'cs201-ex-3-3',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Find Maximum Element',
    description: 'Write a function `find_max(arr)` that returns the maximum element in an unsorted array. Return None for empty arrays.',
    difficulty: 1,
    language: 'python',
    starterCode: 'def find_max(arr):\n    # Your code here\n    pass',
    solution: 'def find_max(arr):\n    if not arr:\n        return None\n    max_val = arr[0]\n    for i in range(1, len(arr)):\n        if arr[i] > max_val:\n            max_val = arr[i]\n    return max_val',
    testCases: [
      { input: '[3, 7, 1, 9, 2]', expectedOutput: '9', isHidden: false, description: 'Maximum in middle' },
      { input: '[5]', expectedOutput: '5', isHidden: false, description: 'Single element' },
      { input: '[-5, -1, -10, -3]', expectedOutput: '-1', isHidden: false, description: 'All negative numbers' },
      { input: '[]', expectedOutput: 'None', isHidden: true, description: 'Empty array' }
    ],
    hints: ['Handle the empty array case first.', 'Initialize max_val with the first element.', 'Scan through remaining elements, updating max_val when needed.']
  },
  // 4. Linear Search - Find Minimum
  {
    id: 'cs201-ex-3-4',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Find Minimum with Index',
    description: 'Write a function `find_min_index(arr)` that returns the index of the minimum element in an unsorted array. Return -1 for empty arrays.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def find_min_index(arr):\n    # Your code here\n    pass',
    solution: 'def find_min_index(arr):\n    if not arr:\n        return -1\n    min_idx = 0\n    for i in range(1, len(arr)):\n        if arr[i] < arr[min_idx]:\n            min_idx = i\n    return min_idx',
    testCases: [
      { input: '[3, 7, 1, 9, 2]', expectedOutput: '2', isHidden: false, description: 'Minimum at index 2' },
      { input: '[1, 2, 3, 4]', expectedOutput: '0', isHidden: false, description: 'Minimum at start' },
      { input: '[9, 8, 7, 6, 5]', expectedOutput: '4', isHidden: false, description: 'Minimum at end' },
      { input: '[]', expectedOutput: '-1', isHidden: true, description: 'Empty array' }
    ],
    hints: ['Track the index of the minimum, not just the value.', 'Compare arr[i] with arr[min_idx], not with min_val.', 'This is useful for selection sort!']
  },
  // 5. Binary Search - Basic
  {
    id: 'cs201-ex-3-5',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Binary Search - Basic',
    description: 'Write a function `binary_search(arr, target)` that returns the index of target in a sorted array, or -1 if not found. Time complexity: O(log n).',
    difficulty: 2,
    language: 'python',
    starterCode: 'def binary_search(arr, target):\n    # arr is sorted in ascending order\n    pass',
    solution: 'def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1',
    testCases: [
      { input: '[1, 3, 5, 7, 9, 11], 7', expectedOutput: '3', isHidden: false, description: 'Target found' },
      { input: '[1, 3, 5, 7, 9, 11], 4', expectedOutput: '-1', isHidden: false, description: 'Target not found' },
      { input: '[1, 2, 3, 4, 5], 1', expectedOutput: '0', isHidden: false, description: 'First element' },
      { input: '[1, 2, 3, 4, 5], 5', expectedOutput: '4', isHidden: false, description: 'Last element' },
      { input: '[], 1', expectedOutput: '-1', isHidden: true, description: 'Empty array' }
    ],
    hints: ['Maintain left and right pointers.', 'Calculate mid = (left + right) // 2.', 'If arr[mid] == target, found it!', 'If arr[mid] < target, search right half.', 'Otherwise, search left half.']
  },
  // 6. Binary Search - First Occurrence
  {
    id: 'cs201-ex-3-6',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Binary Search - First Occurrence',
    description: 'Write a function `find_first(arr, target)` that returns the index of the first occurrence of target in a sorted array with duplicates. Return -1 if not found.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def find_first(arr, target):\n    # arr is sorted, may contain duplicates\n    pass',
    solution: 'def find_first(arr, target):\n    left, right = 0, len(arr) - 1\n    result = -1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            result = mid\n            right = mid - 1  # Continue searching left\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return result',
    testCases: [
      { input: '[1, 2, 2, 2, 3, 4], 2', expectedOutput: '1', isHidden: false, description: 'Multiple occurrences, return first' },
      { input: '[1, 1, 1, 1], 1', expectedOutput: '0', isHidden: false, description: 'All same elements' },
      { input: '[1, 2, 3, 4, 5], 3', expectedOutput: '2', isHidden: false, description: 'Single occurrence' },
      { input: '[1, 2, 3], 4', expectedOutput: '-1', isHidden: true, description: 'Not found' }
    ],
    hints: ['When you find the target, don\'t return immediately.', 'Store the index in a result variable.', 'Continue searching the left half to find earlier occurrences.', 'Set right = mid - 1 when target is found.']
  },
  // 7. Binary Search - Last Occurrence
  {
    id: 'cs201-ex-3-7',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Binary Search - Last Occurrence',
    description: 'Write a function `find_last(arr, target)` that returns the index of the last occurrence of target in a sorted array with duplicates. Return -1 if not found.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def find_last(arr, target):\n    # arr is sorted, may contain duplicates\n    pass',
    solution: 'def find_last(arr, target):\n    left, right = 0, len(arr) - 1\n    result = -1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            result = mid\n            left = mid + 1  # Continue searching right\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return result',
    testCases: [
      { input: '[1, 2, 2, 2, 3, 4], 2', expectedOutput: '3', isHidden: false, description: 'Multiple occurrences, return last' },
      { input: '[1, 1, 1, 1], 1', expectedOutput: '3', isHidden: false, description: 'All same elements' },
      { input: '[1, 2, 3, 4, 5], 3', expectedOutput: '2', isHidden: false, description: 'Single occurrence' },
      { input: '[1, 2, 3], 4', expectedOutput: '-1', isHidden: true, description: 'Not found' }
    ],
    hints: ['Similar to find_first, but search right instead.', 'Set left = mid + 1 when target is found.', 'Continue searching the right half to find later occurrences.']
  },
  // 8. Binary Search - Lower Bound
  {
    id: 'cs201-ex-3-8',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Binary Search - Lower Bound',
    description: 'Write a function `lower_bound(arr, target)` that returns the index of the first element >= target. Return len(arr) if all elements are < target.',
    difficulty: 4,
    language: 'python',
    starterCode: 'def lower_bound(arr, target):\n    # arr is sorted\n    # Return index of first element >= target\n    pass',
    solution: 'def lower_bound(arr, target):\n    left, right = 0, len(arr)\n    while left < right:\n        mid = (left + right) // 2\n        if arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid\n    return left',
    testCases: [
      { input: '[1, 3, 5, 7, 9], 5', expectedOutput: '2', isHidden: false, description: 'Exact match' },
      { input: '[1, 3, 5, 7, 9], 4', expectedOutput: '2', isHidden: false, description: 'Between elements' },
      { input: '[1, 3, 5, 7, 9], 0', expectedOutput: '0', isHidden: false, description: 'Before all elements' },
      { input: '[1, 3, 5, 7, 9], 10', expectedOutput: '5', isHidden: false, description: 'After all elements' },
      { input: '[2, 2, 2, 4, 4], 2', expectedOutput: '0', isHidden: true, description: 'Duplicates at start' }
    ],
    hints: ['Use right = len(arr) instead of len(arr) - 1.', 'Loop condition is left < right, not left <= right.', 'If arr[mid] < target, search right: left = mid + 1.', 'Otherwise, arr[mid] might be the answer: right = mid.']
  },
  // 9. Binary Search - Upper Bound
  {
    id: 'cs201-ex-3-9',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Binary Search - Upper Bound',
    description: 'Write a function `upper_bound(arr, target)` that returns the index of the first element > target. Return len(arr) if all elements are <= target.',
    difficulty: 4,
    language: 'python',
    starterCode: 'def upper_bound(arr, target):\n    # arr is sorted\n    # Return index of first element > target\n    pass',
    solution: 'def upper_bound(arr, target):\n    left, right = 0, len(arr)\n    while left < right:\n        mid = (left + right) // 2\n        if arr[mid] <= target:\n            left = mid + 1\n        else:\n            right = mid\n    return left',
    testCases: [
      { input: '[1, 3, 5, 7, 9], 5', expectedOutput: '3', isHidden: false, description: 'First element > 5 is at index 3' },
      { input: '[1, 3, 5, 7, 9], 4', expectedOutput: '2', isHidden: false, description: 'Between elements' },
      { input: '[1, 3, 5, 7, 9], 0', expectedOutput: '0', isHidden: false, description: 'Before all elements' },
      { input: '[1, 3, 5, 7, 9], 10', expectedOutput: '5', isHidden: false, description: 'After all elements' },
      { input: '[2, 2, 2, 4, 4], 2', expectedOutput: '3', isHidden: true, description: 'Duplicates, skip all' }
    ],
    hints: ['Similar to lower_bound, but condition changes.', 'If arr[mid] <= target, search right: left = mid + 1.', 'Otherwise, right = mid.', 'This finds the position AFTER the last occurrence.']
  },
  // 10. Binary Search - Count Occurrences
  {
    id: 'cs201-ex-3-10',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Count Occurrences Using Binary Search',
    description: 'Write a function `count_occurrences(arr, target)` that counts how many times target appears in a sorted array. Use binary search (lower_bound and upper_bound) for O(log n) complexity.',
    difficulty: 4,
    language: 'python',
    starterCode: 'def count_occurrences(arr, target):\n    # arr is sorted\n    # Use binary search approach\n    pass',
    solution: 'def count_occurrences(arr, target):\n    def lower_bound(arr, target):\n        left, right = 0, len(arr)\n        while left < right:\n            mid = (left + right) // 2\n            if arr[mid] < target:\n                left = mid + 1\n            else:\n                right = mid\n        return left\n    \n    def upper_bound(arr, target):\n        left, right = 0, len(arr)\n        while left < right:\n            mid = (left + right) // 2\n            if arr[mid] <= target:\n                left = mid + 1\n            else:\n                right = mid\n        return left\n    \n    return upper_bound(arr, target) - lower_bound(arr, target)',
    testCases: [
      { input: '[1, 2, 2, 2, 3, 4], 2', expectedOutput: '3', isHidden: false, description: 'Three occurrences' },
      { input: '[1, 2, 2, 2, 3, 4], 5', expectedOutput: '0', isHidden: false, description: 'Not found' },
      { input: '[1, 1, 1, 1], 1', expectedOutput: '4', isHidden: false, description: 'All same' },
      { input: '[1, 2, 3, 4, 5], 3', expectedOutput: '1', isHidden: false, description: 'Single occurrence' },
      { input: '[], 1', expectedOutput: '0', isHidden: true, description: 'Empty array' }
    ],
    hints: ['Count = upper_bound(target) - lower_bound(target).', 'Lower bound gives the first position >= target.', 'Upper bound gives the first position > target.', 'The difference is the count!']
  },
  // 11. Binary Search Application - Integer Square Root
  {
    id: 'cs201-ex-3-11',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Integer Square Root',
    description: 'Write a function `sqrt(n)` that returns the integer square root of n (floor of the actual square root). Use binary search on the answer space [0, n].',
    difficulty: 4,
    language: 'python',
    starterCode: 'def sqrt(n):\n    # Return floor(sqrt(n)) using binary search\n    pass',
    solution: 'def sqrt(n):\n    if n == 0:\n        return 0\n    left, right = 1, n\n    result = 0\n    while left <= right:\n        mid = (left + right) // 2\n        if mid * mid == n:\n            return mid\n        elif mid * mid < n:\n            result = mid\n            left = mid + 1\n        else:\n            right = mid - 1\n    return result',
    testCases: [
      { input: '16', expectedOutput: '4', isHidden: false, description: 'Perfect square' },
      { input: '17', expectedOutput: '4', isHidden: false, description: 'Not perfect square' },
      { input: '1', expectedOutput: '1', isHidden: false, description: 'sqrt(1)' },
      { input: '0', expectedOutput: '0', isHidden: false, description: 'sqrt(0)' },
      { input: '100', expectedOutput: '10', isHidden: true, description: 'Larger perfect square' }
    ],
    hints: ['Search space is [1, n].', 'If mid * mid <= n, mid could be the answer, search right for larger.', 'If mid * mid > n, search left for smaller.', 'Keep track of the largest mid where mid * mid <= n.']
  },
  // 12. Binary Search Application - Find Peak Element
  {
    id: 'cs201-ex-3-12',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Find Peak Element',
    description: 'Write a function `find_peak(arr)` that finds the index of a peak element in an array. A peak element is greater than its neighbors. Array has no duplicates. Use binary search for O(log n).',
    difficulty: 5,
    language: 'python',
    starterCode: 'def find_peak(arr):\n    # Find any peak element index\n    # arr[i] != arr[i+1] for all valid i\n    pass',
    solution: 'def find_peak(arr):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        mid = (left + right) // 2\n        if arr[mid] < arr[mid + 1]:\n            left = mid + 1\n        else:\n            right = mid\n    return left',
    testCases: [
      { input: '[1, 2, 3, 1]', expectedOutput: '2', isHidden: false, description: 'Peak in middle' },
      { input: '[1, 2, 1, 3, 5, 6, 4]', expectedOutput: '5', isHidden: false, description: 'Multiple peaks, any valid' },
      { input: '[5, 4, 3, 2, 1]', expectedOutput: '0', isHidden: false, description: 'Peak at start' },
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '4', isHidden: false, description: 'Peak at end' },
      { input: '[1]', expectedOutput: '0', isHidden: true, description: 'Single element' }
    ],
    hints: ['If arr[mid] < arr[mid+1], there must be a peak in the right half.', 'Otherwise, there must be a peak in the left half (including mid).', 'Loop until left == right.', 'Any peak is a valid answer!']
  },
  // 13. Binary Search Application - Search in Rotated Array
  {
    id: 'cs201-ex-3-13',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Search in Rotated Sorted Array',
    description: 'A sorted array has been rotated at some pivot (e.g., [4,5,6,7,0,1,2]). Write `search_rotated(arr, target)` to find the index of target, or -1 if not found. Use O(log n) binary search.',
    difficulty: 5,
    language: 'python',
    starterCode: 'def search_rotated(arr, target):\n    # arr is rotated sorted array (no duplicates)\n    pass',
    solution: 'def search_rotated(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        \n        # Determine which half is sorted\n        if arr[left] <= arr[mid]:\n            # Left half is sorted\n            if arr[left] <= target < arr[mid]:\n                right = mid - 1\n            else:\n                left = mid + 1\n        else:\n            # Right half is sorted\n            if arr[mid] < target <= arr[right]:\n                left = mid + 1\n            else:\n                right = mid - 1\n    return -1',
    testCases: [
      { input: '[4, 5, 6, 7, 0, 1, 2], 0', expectedOutput: '4', isHidden: false, description: 'Target in right sorted portion' },
      { input: '[4, 5, 6, 7, 0, 1, 2], 5', expectedOutput: '1', isHidden: false, description: 'Target in left sorted portion' },
      { input: '[4, 5, 6, 7, 0, 1, 2], 3', expectedOutput: '-1', isHidden: false, description: 'Target not in array' },
      { input: '[1], 1', expectedOutput: '0', isHidden: false, description: 'Single element' },
      { input: '[3, 1], 1', expectedOutput: '1', isHidden: true, description: 'Two elements rotated' }
    ],
    hints: ['At least one half of the array is always sorted.', 'Determine which half is sorted by comparing arr[left] and arr[mid].', 'If left half is sorted and target is in range [arr[left], arr[mid]), search left.', 'Apply similar logic for the right half.', 'This requires careful condition checking!']
  },
  // 14. Binary Search Application - Find Rotation Point
  {
    id: 'cs201-ex-3-14',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Find Minimum in Rotated Array',
    description: 'Write a function `find_min_rotated(arr)` that finds the minimum element in a rotated sorted array (no duplicates). This is the rotation point. Use O(log n) binary search.',
    difficulty: 4,
    language: 'python',
    starterCode: 'def find_min_rotated(arr):\n    # arr is rotated sorted array (no duplicates)\n    pass',
    solution: 'def find_min_rotated(arr):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        mid = (left + right) // 2\n        if arr[mid] > arr[right]:\n            # Minimum is in right half\n            left = mid + 1\n        else:\n            # Minimum is in left half (including mid)\n            right = mid\n    return arr[left]',
    testCases: [
      { input: '[4, 5, 6, 7, 0, 1, 2]', expectedOutput: '0', isHidden: false, description: 'Rotated array' },
      { input: '[3, 4, 5, 1, 2]', expectedOutput: '1', isHidden: false, description: 'Another rotation' },
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '1', isHidden: false, description: 'Not rotated' },
      { input: '[2, 1]', expectedOutput: '1', isHidden: false, description: 'Two elements' },
      { input: '[1]', expectedOutput: '1', isHidden: true, description: 'Single element' }
    ],
    hints: ['Compare arr[mid] with arr[right].', 'If arr[mid] > arr[right], the minimum is in the right half.', 'Otherwise, the minimum is in the left half (including mid).', 'When left == right, you found the minimum.']
  },
  // 15. Interpolation Search Concept - Uniform Distribution
  {
    id: 'cs201-ex-3-15',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Interpolation Search (Uniformly Distributed)',
    description: 'Implement interpolation search for uniformly distributed sorted data. Instead of mid = (left+right)/2, estimate position based on value: pos = left + (target-arr[left])*(right-left)/(arr[right]-arr[left]). Average case: O(log log n).',
    difficulty: 5,
    language: 'python',
    starterCode: 'def interpolation_search(arr, target):\n    # arr is sorted and uniformly distributed\n    pass',
    solution: 'def interpolation_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right and target >= arr[left] and target <= arr[right]:\n        if left == right:\n            if arr[left] == target:\n                return left\n            return -1\n        \n        # Interpolation formula\n        pos = left + int((target - arr[left]) * (right - left) / (arr[right] - arr[left]))\n        \n        if arr[pos] == target:\n            return pos\n        elif arr[pos] < target:\n            left = pos + 1\n        else:\n            right = pos - 1\n    return -1',
    testCases: [
      { input: '[10, 20, 30, 40, 50, 60, 70, 80, 90], 50', expectedOutput: '4', isHidden: false, description: 'Uniformly distributed' },
      { input: '[1, 2, 3, 4, 5, 6, 7, 8, 9], 7', expectedOutput: '6', isHidden: false, description: 'Sequential uniform' },
      { input: '[10, 20, 30, 40, 50], 25', expectedOutput: '-1', isHidden: false, description: 'Not found' },
      { input: '[5], 5', expectedOutput: '0', isHidden: true, description: 'Single element' }
    ],
    hints: ['Check that target is within the range [arr[left], arr[right]].', 'Calculate position using the interpolation formula.', 'Handle the case where left == right separately.', 'Avoid division by zero when arr[right] == arr[left].', 'Works best on uniformly distributed data!']
  },
  // 16. Interpolation vs Binary Search
  {
    id: 'cs201-ex-3-16',
    subjectId: 'cs201',
    topicId: 'cs201-3',
    title: 'Hybrid Search Strategy',
    description: 'Implement a hybrid search that uses interpolation search for uniformly distributed arrays and falls back to binary search otherwise. Return the index of target or -1. This demonstrates understanding of when each algorithm is optimal.',
    difficulty: 5,
    language: 'python',
    starterCode: 'def hybrid_search(arr, target):\n    # Use interpolation if uniform, else binary search\n    pass',
    solution: 'def hybrid_search(arr, target):\n    def is_uniform(arr, left, right, threshold=2):\n        if right - left < 2:\n            return True\n        mid = (left + right) // 2\n        expected_val = arr[left] + (arr[right] - arr[left]) * (mid - left) // (right - left)\n        return abs(arr[mid] - expected_val) <= threshold\n    \n    left, right = 0, len(arr) - 1\n    use_interpolation = is_uniform(arr, left, right)\n    \n    while left <= right:\n        if use_interpolation and target >= arr[left] and target <= arr[right]:\n            if arr[right] == arr[left]:\n                mid = left\n            else:\n                mid = left + int((target - arr[left]) * (right - left) / (arr[right] - arr[left]))\n                mid = max(left, min(mid, right))\n        else:\n            mid = (left + right) // 2\n        \n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1',
    testCases: [
      { input: '[10, 20, 30, 40, 50, 60, 70], 40', expectedOutput: '3', isHidden: false, description: 'Uniform distribution' },
      { input: '[1, 2, 4, 8, 16, 32, 64], 16', expectedOutput: '4', isHidden: false, description: 'Non-uniform (exponential)' },
      { input: '[1, 3, 5, 7, 9, 11], 5', expectedOutput: '2', isHidden: false, description: 'Uniform odd numbers' },
      { input: '[1, 2, 3, 4, 5], 6', expectedOutput: '-1', isHidden: true, description: 'Not found' }
    ],
    hints: ['Check if the array is uniformly distributed.', 'For uniform data, use interpolation search formula.', 'For non-uniform data, use standard binary search.', 'Ensure the interpolated position stays within [left, right].', 'This demonstrates algorithm selection based on data characteristics!']
  }
];
