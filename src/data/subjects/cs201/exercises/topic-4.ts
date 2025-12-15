import { CodingExercise } from '../../../../core/types';

export const cs201Topic4Exercises: CodingExercise[] = [
  // 1. Basic Recursion - Power Function
  {
    id: 'cs201-ex-4-1',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Recursive Power (Linear)',
    description: 'Implement a simple recursive power function that computes x^n by multiplying x repeatedly. This is the basic O(n) approach before optimization.',
    difficulty: 1,
    language: 'python',
    starterCode: 'def power_linear(x, n):\n    # Base case: n = 0\n    # Recursive case: x * x^(n-1)\n    pass',
    solution: 'def power_linear(x, n):\n    if n == 0:\n        return 1\n    return x * power_linear(x, n - 1)',
    testCases: [
      { input: '2, 3', expectedOutput: '8', isHidden: false, description: '2^3 = 8' },
      { input: '5, 2', expectedOutput: '25', isHidden: false, description: '5^2 = 25' },
      { input: '10, 0', expectedOutput: '1', isHidden: true, description: 'Any number to power 0 is 1' }
    ],
    hints: ['Base case: when n is 0, return 1.', 'Recursive case: multiply x by power(x, n-1).']
  },

  // 2. Sum Array Recursively
  {
    id: 'cs201-ex-4-2',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Recursive Array Sum',
    description: 'Sum an array using divide and conquer. Split the array in half and recursively sum each half.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def sum_array_recursive(arr):\n    # Base case: empty or single element\n    # Divide: split array in half\n    # Conquer: recursively sum each half\n    # Combine: add the two sums\n    pass',
    solution: 'def sum_array_recursive(arr):\n    if len(arr) == 0:\n        return 0\n    if len(arr) == 1:\n        return arr[0]\n    mid = len(arr) // 2\n    left_sum = sum_array_recursive(arr[:mid])\n    right_sum = sum_array_recursive(arr[mid:])\n    return left_sum + right_sum',
    testCases: [
      { input: '[1, 2, 3, 4]', expectedOutput: '10', isHidden: false, description: 'Sum of 1+2+3+4' },
      { input: '[5]', expectedOutput: '5', isHidden: false, description: 'Single element' },
      { input: '[]', expectedOutput: '0', isHidden: true, description: 'Empty array' },
      { input: '[10, -5, 3, -2]', expectedOutput: '6', isHidden: true, description: 'Mixed positive and negative' }
    ],
    hints: ['Base case: return 0 for empty, arr[0] for single element.', 'Find midpoint with len(arr) // 2.', 'Split into arr[:mid] and arr[mid:].']
  },

  // 3. Find Maximum Recursively
  {
    id: 'cs201-ex-4-3',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Recursive Maximum',
    description: 'Find the maximum element in an array using divide and conquer. Compare maximums from left and right halves.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def find_max_recursive(arr):\n    # Base case: single element\n    # Divide into left and right halves\n    # Return max of left_max and right_max\n    pass',
    solution: 'def find_max_recursive(arr):\n    if len(arr) == 1:\n        return arr[0]\n    mid = len(arr) // 2\n    left_max = find_max_recursive(arr[:mid])\n    right_max = find_max_recursive(arr[mid:])\n    return max(left_max, right_max)',
    testCases: [
      { input: '[3, 1, 4, 1, 5, 9, 2]', expectedOutput: '9', isHidden: false, description: 'Maximum is 9' },
      { input: '[10]', expectedOutput: '10', isHidden: false, description: 'Single element' },
      { input: '[-5, -2, -8, -1]', expectedOutput: '-1', isHidden: true, description: 'All negative numbers' }
    ],
    hints: ['Base case: single element is the max.', 'Recursively find max in left and right halves.', 'Return the larger of the two.']
  },

  // 4. Power Using D&C
  {
    id: 'cs201-ex-4-4',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Fast Power (Divide & Conquer)',
    description: 'Implement fast exponentiation using divide and conquer. For even n, x^n = (x^(n/2))^2. This reduces time complexity from O(n) to O(log n).',
    difficulty: 3,
    language: 'python',
    starterCode: 'def power_fast(x, n):\n    # Base case: n = 0\n    # If n is even: compute x^(n/2) and square it\n    # If n is odd: x * x^(n-1)\n    pass',
    solution: 'def power_fast(x, n):\n    if n == 0:\n        return 1\n    if n % 2 == 0:\n        half = power_fast(x, n // 2)\n        return half * half\n    else:\n        return x * power_fast(x, n - 1)',
    testCases: [
      { input: '2, 10', expectedOutput: '1024', isHidden: false, description: '2^10 = 1024' },
      { input: '3, 5', expectedOutput: '243', isHidden: false, description: '3^5 = 243' },
      { input: '7, 0', expectedOutput: '1', isHidden: true, description: 'Any number to power 0' },
      { input: '2, 20', expectedOutput: '1048576', isHidden: true, description: 'Large exponent 2^20' }
    ],
    hints: ['For even n, compute half = x^(n/2) once, then return half * half.', 'For odd n, multiply x by x^(n-1).', 'This avoids redundant calculations.']
  },

  // 5. Maximum Subarray - Brute Force
  {
    id: 'cs201-ex-4-5',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Maximum Subarray (Brute Force)',
    description: 'Find the contiguous subarray with the largest sum using the brute force approach. Check all possible subarrays. Time complexity: O(n^2).',
    difficulty: 3,
    language: 'python',
    starterCode: 'def max_subarray_brute(arr):\n    # Try all possible subarrays\n    # Return the maximum sum\n    pass',
    solution: 'def max_subarray_brute(arr):\n    max_sum = float(\'-inf\')\n    for i in range(len(arr)):\n        current_sum = 0\n        for j in range(i, len(arr)):\n            current_sum += arr[j]\n            max_sum = max(max_sum, current_sum)\n    return max_sum',
    testCases: [
      { input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]', expectedOutput: '6', isHidden: false, description: 'Subarray [4,-1,2,1] has sum 6' },
      { input: '[1]', expectedOutput: '1', isHidden: false, description: 'Single element' },
      { input: '[-1, -2, -3]', expectedOutput: '-1', isHidden: true, description: 'All negative, best is -1' },
      { input: '[5, -3, 5]', expectedOutput: '7', isHidden: true, description: 'Entire array sum is 7' }
    ],
    hints: ['Use nested loops: outer for start index i, inner for end index j.', 'Track running sum from i to j.', 'Update max_sum whenever you find a larger sum.']
  },

  // 6. Maximum Crossing Subarray
  {
    id: 'cs201-ex-4-6',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Maximum Crossing Subarray',
    description: 'Find the maximum subarray that crosses the midpoint. This is a helper function for the divide-and-conquer maximum subarray algorithm.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def max_crossing_subarray(arr, low, mid, high):\n    # Find max sum from mid going left\n    # Find max sum from mid+1 going right\n    # Return their sum\n    pass',
    solution: 'def max_crossing_subarray(arr, low, mid, high):\n    left_sum = float(\'-inf\')\n    total = 0\n    for i in range(mid, low - 1, -1):\n        total += arr[i]\n        left_sum = max(left_sum, total)\n    \n    right_sum = float(\'-inf\')\n    total = 0\n    for i in range(mid + 1, high + 1):\n        total += arr[i]\n        right_sum = max(right_sum, total)\n    \n    return left_sum + right_sum',
    testCases: [
      { input: '[1, -2, 3, 4, -5], 0, 2, 4', expectedOutput: '6', isHidden: false, description: 'Crossing at mid=2: [3,4]' },
      { input: '[-1, 2, -1], 0, 1, 2', expectedOutput: '1', isHidden: false, description: 'Best crossing is just [2]' },
      { input: '[5, -3, -2, 6], 0, 1, 3', expectedOutput: '6', isHidden: true, description: 'Crossing gives [5,-3,-2,6]=6' }
    ],
    hints: ['Start from mid and go left, tracking the best sum.', 'Start from mid+1 and go right, tracking the best sum.', 'The crossing sum is left_sum + right_sum.']
  },

  // 7. Maximum Subarray D&C Helper
  {
    id: 'cs201-ex-4-7',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Maximum Subarray (Divide & Conquer)',
    description: 'Find the maximum subarray using divide and conquer. The maximum is either entirely in the left half, entirely in the right half, or crosses the middle. Time: O(n log n).',
    difficulty: 4,
    language: 'python',
    starterCode: 'def max_subarray_dc(arr, low, high):\n    # Base case: single element\n    # Divide: find middle\n    # Conquer: recursively find max in left and right\n    # Combine: compare left, right, and crossing\n    pass\n\ndef max_crossing(arr, low, mid, high):\n    # Helper function from previous exercise\n    left_sum = float(\'-inf\')\n    total = 0\n    for i in range(mid, low - 1, -1):\n        total += arr[i]\n        left_sum = max(left_sum, total)\n    right_sum = float(\'-inf\')\n    total = 0\n    for i in range(mid + 1, high + 1):\n        total += arr[i]\n        right_sum = max(right_sum, total)\n    return left_sum + right_sum',
    solution: 'def max_subarray_dc(arr, low, high):\n    if low == high:\n        return arr[low]\n    \n    mid = (low + high) // 2\n    left_max = max_subarray_dc(arr, low, mid)\n    right_max = max_subarray_dc(arr, mid + 1, high)\n    cross_max = max_crossing(arr, low, mid, high)\n    \n    return max(left_max, right_max, cross_max)\n\ndef max_crossing(arr, low, mid, high):\n    left_sum = float(\'-inf\')\n    total = 0\n    for i in range(mid, low - 1, -1):\n        total += arr[i]\n        left_sum = max(left_sum, total)\n    right_sum = float(\'-inf\')\n    total = 0\n    for i in range(mid + 1, high + 1):\n        total += arr[i]\n        right_sum = max(right_sum, total)\n    return left_sum + right_sum',
    testCases: [
      { input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4], 0, 8', expectedOutput: '6', isHidden: false, description: 'Classic example: [4,-1,2,1]=6' },
      { input: '[1, 2, 3], 0, 2', expectedOutput: '6', isHidden: false, description: 'All positive: sum all' },
      { input: '[-5, -2, -8], 0, 2', expectedOutput: '-2', isHidden: true, description: 'All negative: best is -2' }
    ],
    hints: ['Base case: if low == high, return arr[low].', 'Find mid = (low + high) // 2.', 'Compare max from left half, right half, and crossing.']
  },

  // 8. Maximum Subarray Kadane's Algorithm
  {
    id: 'cs201-ex-4-8',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: "Maximum Subarray (Kadane's Algorithm)",
    description: "Solve the maximum subarray problem in O(n) time using Kadane's algorithm. This is more efficient than divide and conquer but demonstrates the trade-off between algorithmic approaches.",
    difficulty: 4,
    language: 'python',
    starterCode: 'def max_subarray_kadane(arr):\n    # Track current_sum and max_sum\n    # If current_sum becomes negative, reset to 0\n    pass',
    solution: 'def max_subarray_kadane(arr):\n    max_sum = float(\'-inf\')\n    current_sum = 0\n    for num in arr:\n        current_sum = max(num, current_sum + num)\n        max_sum = max(max_sum, current_sum)\n    return max_sum',
    testCases: [
      { input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]', expectedOutput: '6', isHidden: false, description: 'Same result as D&C approach' },
      { input: '[1, 2, 3, 4]', expectedOutput: '10', isHidden: false, description: 'All positive' },
      { input: '[-1, -2, -3]', expectedOutput: '-1', isHidden: true, description: 'All negative' }
    ],
    hints: ['Keep a running sum that resets when it goes negative.', 'Track the maximum sum seen so far.', 'For each element, decide: start new subarray or continue current?']
  },

  // 9. Merge Sort - Merge Function
  {
    id: 'cs201-ex-4-9',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Merge Two Sorted Arrays',
    description: 'Implement the merge function that combines two sorted arrays into one sorted array. This is the "combine" step of merge sort. Time: O(n).',
    difficulty: 2,
    language: 'python',
    starterCode: 'def merge(left, right):\n    # Merge two sorted arrays\n    # Use two pointers\n    pass',
    solution: 'def merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result',
    testCases: [
      { input: '[1, 3, 5], [2, 4, 6]', expectedOutput: '[1, 2, 3, 4, 5, 6]', isHidden: false, description: 'Interleaved arrays' },
      { input: '[1, 2], [3, 4]', expectedOutput: '[1, 2, 3, 4]', isHidden: false, description: 'No interleaving needed' },
      { input: '[], [1, 2]', expectedOutput: '[1, 2]', isHidden: true, description: 'One empty array' },
      { input: '[5], [1, 3]', expectedOutput: '[1, 3, 5]', isHidden: true, description: 'Different sizes' }
    ],
    hints: ['Use two pointers, one for each array.', 'Compare elements and append the smaller one.', 'After one array is exhausted, append the rest of the other.']
  },

  // 10. Merge Sort Implementation
  {
    id: 'cs201-ex-4-10',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Merge Sort',
    description: 'Implement the complete merge sort algorithm. Divide array in half, recursively sort each half, then merge. Time: O(n log n).',
    difficulty: 4,
    language: 'python',
    starterCode: 'def merge_sort(arr):\n    # Base case: array of size 0 or 1\n    # Divide: split in half\n    # Conquer: recursively sort each half\n    # Combine: merge sorted halves\n    pass\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result',
    solution: 'def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    \n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result',
    testCases: [
      { input: '[3, 1, 4, 1, 5, 9, 2, 6]', expectedOutput: '[1, 1, 2, 3, 4, 5, 6, 9]', isHidden: false, description: 'Unsorted array' },
      { input: '[5, 4, 3, 2, 1]', expectedOutput: '[1, 2, 3, 4, 5]', isHidden: false, description: 'Reverse sorted' },
      { input: '[1]', expectedOutput: '[1]', isHidden: true, description: 'Single element' },
      { input: '[]', expectedOutput: '[]', isHidden: true, description: 'Empty array' }
    ],
    hints: ['Base case: if array has 0 or 1 elements, it\'s already sorted.', 'Split at midpoint: arr[:mid] and arr[mid:].', 'Recursively sort left and right, then merge them.']
  },

  // 11. Merge Sort In-Place Merge
  {
    id: 'cs201-ex-4-11',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Merge Sort with Index Range',
    description: 'Implement merge sort that works on a portion of the array specified by indices. This is more space-efficient and demonstrates the complete D&C pattern.',
    difficulty: 5,
    language: 'python',
    starterCode: 'def merge_sort_range(arr, left, right):\n    # Sort arr[left:right+1] in place\n    # Base case: left >= right\n    pass\n\ndef merge_range(arr, left, mid, right):\n    # Merge arr[left:mid+1] and arr[mid+1:right+1]\n    pass',
    solution: 'def merge_sort_range(arr, left, right):\n    if left >= right:\n        return\n    \n    mid = (left + right) // 2\n    merge_sort_range(arr, left, mid)\n    merge_sort_range(arr, mid + 1, right)\n    merge_range(arr, left, mid, right)\n\ndef merge_range(arr, left, mid, right):\n    left_part = arr[left:mid+1]\n    right_part = arr[mid+1:right+1]\n    \n    i = j = 0\n    k = left\n    \n    while i < len(left_part) and j < len(right_part):\n        if left_part[i] <= right_part[j]:\n            arr[k] = left_part[i]\n            i += 1\n        else:\n            arr[k] = right_part[j]\n            j += 1\n        k += 1\n    \n    while i < len(left_part):\n        arr[k] = left_part[i]\n        i += 1\n        k += 1\n    \n    while j < len(right_part):\n        arr[k] = right_part[j]\n        j += 1\n        k += 1',
    testCases: [
      { input: '[3, 1, 4, 1, 5], 0, 4', expectedOutput: '[1, 1, 3, 4, 5]', isHidden: false, description: 'Sort entire array' },
      { input: '[1, 5, 3, 2, 4], 1, 3', expectedOutput: '[1, 2, 3, 5, 4]', isHidden: false, description: 'Sort middle portion' },
      { input: '[9, 7, 5, 3, 1], 0, 4', expectedOutput: '[1, 3, 5, 7, 9]', isHidden: true, description: 'Reverse order' }
    ],
    hints: ['Base case: if left >= right, nothing to sort.', 'Find mid = (left + right) // 2.', 'Recursively sort [left, mid] and [mid+1, right].', 'Merge the two sorted portions.']
  },

  // 12. Analyze Merge Sort Comparisons
  {
    id: 'cs201-ex-4-12',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Count Merge Sort Comparisons',
    description: 'Implement merge sort that also counts the number of comparisons made. This helps understand the O(n log n) complexity empirically.',
    difficulty: 4,
    language: 'python',
    starterCode: 'def merge_sort_count(arr):\n    # Return (sorted_array, comparison_count)\n    pass\n\ndef merge_count(left, right):\n    # Return (merged_array, comparison_count)\n    pass',
    solution: 'def merge_sort_count(arr):\n    if len(arr) <= 1:\n        return (arr, 0)\n    \n    mid = len(arr) // 2\n    left, left_count = merge_sort_count(arr[:mid])\n    right, right_count = merge_sort_count(arr[mid:])\n    merged, merge_count = merge_count(left, right)\n    \n    return (merged, left_count + right_count + merge_count)\n\ndef merge_count(left, right):\n    result = []\n    i = j = 0\n    comparisons = 0\n    \n    while i < len(left) and j < len(right):\n        comparisons += 1\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    \n    result.extend(left[i:])\n    result.extend(right[j:])\n    return (result, comparisons)',
    testCases: [
      { input: '[3, 1, 4, 2]', expectedOutput: '([1, 2, 3, 4], 4)', isHidden: false, description: 'Array of 4 elements' },
      { input: '[5, 4, 3, 2, 1]', expectedOutput: '([1, 2, 3, 4, 5], 7)', isHidden: false, description: 'Worst case ordering' },
      { input: '[1]', expectedOutput: '([1], 0)', isHidden: true, description: 'Single element, no comparisons' }
    ],
    hints: ['Return a tuple (sorted_array, count).', 'Count comparisons during the merge step.', 'Sum up counts from left, right, and merge.']
  },

  // 13. Count Inversions
  {
    id: 'cs201-ex-4-13',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Count Inversions',
    description: 'Count the number of inversions in an array using divide and conquer. An inversion is a pair (i,j) where i < j but arr[i] > arr[j]. This is a classic D&C application. Time: O(n log n).',
    difficulty: 5,
    language: 'python',
    starterCode: 'def count_inversions(arr):\n    # Return (sorted_array, inversion_count)\n    # Use modified merge sort\n    pass\n\ndef merge_count_inversions(left, right):\n    # Count inversions while merging\n    pass',
    solution: 'def count_inversions(arr):\n    if len(arr) <= 1:\n        return (arr, 0)\n    \n    mid = len(arr) // 2\n    left, left_inv = count_inversions(arr[:mid])\n    right, right_inv = count_inversions(arr[mid:])\n    merged, split_inv = merge_count_inversions(left, right)\n    \n    return (merged, left_inv + right_inv + split_inv)\n\ndef merge_count_inversions(left, right):\n    result = []\n    i = j = 0\n    inversions = 0\n    \n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            inversions += len(left) - i\n            j += 1\n    \n    result.extend(left[i:])\n    result.extend(right[j:])\n    return (result, inversions)',
    testCases: [
      { input: '[2, 1, 3, 1, 2]', expectedOutput: '([1, 1, 2, 2, 3], 4)', isHidden: false, description: '4 inversions' },
      { input: '[1, 2, 3]', expectedOutput: '([1, 2, 3], 0)', isHidden: false, description: 'Already sorted, 0 inversions' },
      { input: '[3, 2, 1]', expectedOutput: '([1, 2, 3], 3)', isHidden: true, description: 'Reverse sorted, maximum inversions' },
      { input: '[1]', expectedOutput: '([1], 0)', isHidden: true, description: 'Single element' }
    ],
    hints: ['Modify merge sort to count inversions.', 'When taking from right array, remaining left elements are all inversions.', 'inversions += len(left) - i when right[j] < left[i].']
  },

  // 14. Closest Pair - 1D Simplified
  {
    id: 'cs201-ex-4-14',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Closest Pair of Points (1D)',
    description: 'Find the closest pair of points on a line (1D). First sort the points, then use divide and conquer to find the minimum distance. This is a simplified version of the 2D problem.',
    difficulty: 4,
    language: 'python',
    starterCode: 'def closest_pair_1d(points):\n    # Points is a sorted list of numbers\n    # Return the minimum distance between any two points\n    # Use divide and conquer\n    pass',
    solution: 'def closest_pair_1d(points):\n    points = sorted(points)\n    \n    def helper(left, right):\n        if right - left <= 1:\n            return float(\'inf\')\n        if right - left == 2:\n            return abs(points[right] - points[left])\n        \n        mid = (left + right) // 2\n        left_min = helper(left, mid)\n        right_min = helper(mid + 1, right)\n        \n        # The crossing minimum is just points[mid+1] - points[mid]\n        cross_min = abs(points[mid + 1] - points[mid])\n        \n        return min(left_min, right_min, cross_min)\n    \n    return helper(0, len(points) - 1)',
    testCases: [
      { input: '[1, 5, 3, 19, 18, 25]', expectedOutput: '1', isHidden: false, description: 'Closest pair: 18 and 19' },
      { input: '[1, 10, 20, 30]', expectedOutput: '9', isHidden: false, description: 'Closest pair: 1 and 10' },
      { input: '[5, 5]', expectedOutput: '0', isHidden: true, description: 'Identical points' },
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '1', isHidden: true, description: 'Evenly spaced' }
    ],
    hints: ['First sort the points.', 'Base case: 2 points, return their distance.', 'Recursively find minimum in left and right halves.', 'Check the crossing case: points[mid+1] - points[mid].']
  },

  // 15. Binary Search Recursive
  {
    id: 'cs201-ex-4-15',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Binary Search (Recursive D&C)',
    description: 'Implement binary search using divide and conquer recursion. This is a classic example of the D&C paradigm with O(log n) time complexity.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def binary_search_recursive(arr, target, left, right):\n    # Base case: not found\n    # Check middle element\n    # Recursively search left or right half\n    pass',
    solution: 'def binary_search_recursive(arr, target, left, right):\n    if left > right:\n        return -1\n    \n    mid = (left + right) // 2\n    \n    if arr[mid] == target:\n        return mid\n    elif arr[mid] > target:\n        return binary_search_recursive(arr, target, left, mid - 1)\n    else:\n        return binary_search_recursive(arr, target, mid + 1, right)',
    testCases: [
      { input: '[1, 3, 5, 7, 9, 11], 7, 0, 5', expectedOutput: '3', isHidden: false, description: 'Found at index 3' },
      { input: '[1, 3, 5, 7, 9, 11], 4, 0, 5', expectedOutput: '-1', isHidden: false, description: 'Not found' },
      { input: '[2, 4, 6, 8, 10], 2, 0, 4', expectedOutput: '0', isHidden: true, description: 'First element' },
      { input: '[2, 4, 6, 8, 10], 10, 0, 4', expectedOutput: '4', isHidden: true, description: 'Last element' }
    ],
    hints: ['Base case: left > right means not found, return -1.', 'Calculate mid = (left + right) // 2.', 'If arr[mid] == target, return mid.', 'Otherwise recursively search left or right half.']
  },

  // 16. Strassen Matrix Multiplication (Simplified)
  {
    id: 'cs201-ex-4-16',
    subjectId: 'cs201',
    topicId: 'cs201-4',
    title: 'Matrix Multiplication (D&C)',
    description: 'Implement basic matrix multiplication using divide and conquer by splitting matrices into quadrants. This demonstrates D&C on 2D structures (full Strassen algorithm omitted for simplicity).',
    difficulty: 5,
    language: 'python',
    starterCode: 'def matrix_multiply_dc(A, B):\n    # Multiply two square matrices using D&C\n    # Base case: 1x1 matrix\n    # Divide into quadrants and recursively multiply\n    pass',
    solution: 'def matrix_multiply_dc(A, B):\n    n = len(A)\n    \n    # Base case: 1x1 matrix\n    if n == 1:\n        return [[A[0][0] * B[0][0]]]\n    \n    # Divide into quadrants\n    mid = n // 2\n    A11 = [row[:mid] for row in A[:mid]]\n    A12 = [row[mid:] for row in A[:mid]]\n    A21 = [row[:mid] for row in A[mid:]]\n    A22 = [row[mid:] for row in A[mid:]]\n    \n    B11 = [row[:mid] for row in B[:mid]]\n    B12 = [row[mid:] for row in B[:mid]]\n    B21 = [row[:mid] for row in B[mid:]]\n    B22 = [row[mid:] for row in B[mid:]]\n    \n    # Recursive multiplication\n    C11 = add_matrices(matrix_multiply_dc(A11, B11), matrix_multiply_dc(A12, B21))\n    C12 = add_matrices(matrix_multiply_dc(A11, B12), matrix_multiply_dc(A12, B22))\n    C21 = add_matrices(matrix_multiply_dc(A21, B11), matrix_multiply_dc(A22, B21))\n    C22 = add_matrices(matrix_multiply_dc(A21, B12), matrix_multiply_dc(A22, B22))\n    \n    # Combine quadrants\n    C = []\n    for i in range(mid):\n        C.append(C11[i] + C12[i])\n    for i in range(mid):\n        C.append(C21[i] + C22[i])\n    \n    return C\n\ndef add_matrices(A, B):\n    n = len(A)\n    return [[A[i][j] + B[i][j] for j in range(n)] for i in range(n)]',
    testCases: [
      { input: '[[1, 2], [3, 4]], [[5, 6], [7, 8]]', expectedOutput: '[[19, 22], [43, 50]]', isHidden: false, description: '2x2 matrix multiplication' },
      { input: '[[1]], [[5]]', expectedOutput: '[[5]]', isHidden: false, description: '1x1 base case' },
      { input: '[[1, 0], [0, 1]], [[5, 6], [7, 8]]', expectedOutput: '[[5, 6], [7, 8]]', isHidden: true, description: 'Identity matrix' }
    ],
    hints: ['Base case: 1x1 matrix, multiply single elements.', 'Split each matrix into 4 quadrants.', 'Recursively multiply quadrants.', 'Combine results: C11 = A11*B11 + A12*B21, etc.']
  }
];
