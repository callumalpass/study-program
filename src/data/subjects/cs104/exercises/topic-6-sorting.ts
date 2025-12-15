import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'cs104-t6-ex01',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Bubble Sort Implementation',
    difficulty: 1,
    description: 'Implement the bubble sort algorithm. Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    starterCode: 'def bubble_sort(arr):\n    # Sort arr in-place and return it\n    pass\n\nprint(bubble_sort([64, 34, 25, 12, 22, 11, 90]))',
    solution: 'def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        swapped = False\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped:\n            break\n    return arr\n\nprint(bubble_sort([64, 34, 25, 12, 22, 11, 90]))',
    testCases: [
      { input: '[64, 34, 25, 12, 22, 11, 90]', isHidden: false, description: 'Standard unsorted array' },
      { input: '[5, 1, 4, 2, 8]', isHidden: false, description: 'Small array' },
      { input: '[1, 2, 3]', isHidden: false, description: 'Already sorted' },
      { input: '[]', isHidden: true, description: 'Empty array' },
      { input: '[1]', isHidden: true, description: 'Single element' }
    ],
    hints: ['Compare adjacent elements and swap if out of order', 'Use a flag to detect if no swaps occurred (optimization)', 'After each pass, the largest unsorted element bubbles to its correct position'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex02',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Selection Sort Implementation',
    difficulty: 1,
    description: 'Implement selection sort. This algorithm divides the array into sorted and unsorted regions, repeatedly finding the minimum from the unsorted region and moving it to the sorted region.',
    starterCode: 'def selection_sort(arr):\n    # Sort arr in-place and return it\n    pass\n\nprint(selection_sort([64, 25, 12, 22, 11]))',
    solution: 'def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr\n\nprint(selection_sort([64, 25, 12, 22, 11]))',
    testCases: [
      { input: '[64, 25, 12, 22, 11]', isHidden: false, description: 'Standard array' },
      { input: '[5, 4, 3, 2, 1]', isHidden: false, description: 'Reverse sorted' },
      { input: '[1]', isHidden: false, description: 'Single element' },
      { input: '[]', isHidden: true, description: 'Empty array' }
    ],
    hints: ['Find the minimum element in the unsorted portion', 'Swap it with the first unsorted element', 'Move the boundary between sorted and unsorted one position right'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex03',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Insertion Sort Implementation',
    difficulty: 1,
    description: 'Implement insertion sort. This algorithm builds the sorted array one element at a time by inserting each element into its correct position among previously sorted elements.',
    starterCode: 'def insertion_sort(arr):\n    # Sort arr in-place and return it\n    pass\n\nprint(insertion_sort([12, 11, 13, 5, 6]))',
    solution: 'def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr\n\nprint(insertion_sort([12, 11, 13, 5, 6]))',
    testCases: [
      { input: '[12, 11, 13, 5, 6]', isHidden: false, description: 'Standard array' },
      { input: '[4, 3, 2, 1]', isHidden: false, description: 'Reverse sorted' },
      { input: '[1, 2, 3]', isHidden: false, description: 'Already sorted' },
      { input: '[]', isHidden: true, description: 'Empty array' }
    ],
    hints: ['Start from the second element', 'Compare with elements to the left and shift them right if larger', 'Insert the key at its correct position'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex04',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Merge Sort Implementation',
    difficulty: 2,
    description: 'Implement merge sort using the divide-and-conquer approach. Split the array in half, recursively sort each half, then merge the sorted halves.',
    starterCode: 'def merge_sort(arr):\n    # Return a new sorted array\n    pass\n\ndef merge(left, right):\n    # Merge two sorted arrays\n    pass\n\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))',
    solution: 'def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    \n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    \n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    \n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result\n\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))',
    testCases: [
      { input: '[38, 27, 43, 3, 9, 82, 10]', isHidden: false, description: 'Standard array' },
      { input: '[5, 2, 8, 1]', isHidden: false, description: 'Small array' },
      { input: '[1]', isHidden: false, description: 'Single element' },
      { input: '[]', isHidden: true, description: 'Empty array' }
    ],
    hints: ['Base case: arrays of length 0 or 1 are already sorted', 'Use two pointers to merge sorted arrays', 'Merge sort is stable - maintain relative order of equal elements'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex05',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Quick Sort Implementation',
    difficulty: 3,
    description: 'Implement quick sort with the last element as pivot. Partition the array so elements less than pivot come before it, and elements greater come after.',
    starterCode: 'def quick_sort(arr, low=0, high=None):\n    if high is None:\n        high = len(arr) - 1\n    # Sort arr in-place\n    pass\n\ndef partition(arr, low, high):\n    # Return pivot index\n    pass\n\narr = [10, 7, 8, 9, 1, 5]\nquick_sort(arr)\nprint(arr)',
    solution: 'def quick_sort(arr, low=0, high=None):\n    if high is None:\n        high = len(arr) - 1\n    \n    if low < high:\n        pivot_idx = partition(arr, low, high)\n        quick_sort(arr, low, pivot_idx - 1)\n        quick_sort(arr, pivot_idx + 1, high)\n    return arr\n\ndef partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    \n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    \n    arr[i + 1], arr[high] = arr[high], arr[i + 1]\n    return i + 1\n\narr = [10, 7, 8, 9, 1, 5]\nquick_sort(arr)\nprint(arr)',
    testCases: [
      { input: '[10, 7, 8, 9, 1, 5]', isHidden: false, description: 'Standard array' },
      { input: '[3, 2, 1]', isHidden: false, description: 'Small reverse' },
      { input: '[1, 2, 3]', isHidden: false, description: 'Already sorted' },
      { input: '[]', isHidden: true, description: 'Empty array' }
    ],
    hints: ['Choose last element as pivot', 'i tracks the boundary of elements <= pivot', 'Swap elements <= pivot to the left partition'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex06',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Count Inversions',
    difficulty: 3,
    description: 'Count the number of inversions in an array. An inversion is a pair (i, j) where i < j but arr[i] > arr[j]. Use merge sort for O(n log n) solution.',
    starterCode: 'def count_inversions(arr):\n    # Return number of inversions\n    pass\n\nprint(count_inversions([2, 4, 1, 3, 5]))',
    solution: 'def count_inversions(arr):\n    def merge_count(arr):\n        if len(arr) <= 1:\n            return arr, 0\n        \n        mid = len(arr) // 2\n        left, left_inv = merge_count(arr[:mid])\n        right, right_inv = merge_count(arr[mid:])\n        merged, split_inv = merge(left, right)\n        \n        return merged, left_inv + right_inv + split_inv\n    \n    def merge(left, right):\n        result = []\n        inversions = 0\n        i = j = 0\n        \n        while i < len(left) and j < len(right):\n            if left[i] <= right[j]:\n                result.append(left[i])\n                i += 1\n            else:\n                result.append(right[j])\n                inversions += len(left) - i\n                j += 1\n        \n        result.extend(left[i:])\n        result.extend(right[j:])\n        return result, inversions\n    \n    _, count = merge_count(arr)\n    return count\n\nprint(count_inversions([2, 4, 1, 3, 5]))',
    testCases: [
      { input: '[2, 4, 1, 3, 5]', isHidden: false, description: 'Array with 3 inversions' },
      { input: '[1, 2, 3, 4]', isHidden: false, description: 'Sorted - 0 inversions' },
      { input: '[4, 3, 2, 1]', isHidden: false, description: 'Reverse sorted - max inversions' },
      { input: '[1]', isHidden: true, description: 'Single element' }
    ],
    hints: ['Modify merge sort to count inversions during merge', 'When taking from right array, all remaining left elements form inversions', 'Split inversions are counted during merge'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex07',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Sort Colors (Dutch National Flag)',
    difficulty: 2,
    description: 'Given an array with elements 0, 1, and 2, sort it in-place in one pass. This is the Dutch National Flag problem.',
    starterCode: 'def sort_colors(nums):\n    # Sort in-place\n    pass\n\nnums = [2, 0, 2, 1, 1, 0]\nsort_colors(nums)\nprint(nums)',
    solution: 'def sort_colors(nums):\n    low = 0\n    mid = 0\n    high = len(nums) - 1\n    \n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1\n            mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1\n    \n    return nums\n\nnums = [2, 0, 2, 1, 1, 0]\nsort_colors(nums)\nprint(nums)',
    testCases: [
      { input: '[2, 0, 2, 1, 1, 0]', isHidden: false, description: 'Mixed colors' },
      { input: '[2, 0, 1]', isHidden: false, description: 'One of each' },
      { input: '[0]', isHidden: false, description: 'Single element' },
      { input: '[]', isHidden: true, description: 'Empty array' }
    ],
    hints: ['Use three pointers: low, mid, high', '0s go to the left (low), 2s go to the right (high)', '1s stay in the middle'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex08',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Kth Largest Element (Quick Select)',
    difficulty: 3,
    description: 'Find the kth largest element in an unsorted array using the quick select algorithm (average O(n) time).',
    starterCode: 'def find_kth_largest(nums, k):\n    # Return the kth largest element\n    pass\n\nprint(find_kth_largest([3, 2, 1, 5, 6, 4], 2))',
    solution: 'def find_kth_largest(nums, k):\n    k = len(nums) - k\n    \n    def quick_select(left, right):\n        pivot = nums[right]\n        p = left\n        \n        for i in range(left, right):\n            if nums[i] <= pivot:\n                nums[p], nums[i] = nums[i], nums[p]\n                p += 1\n        \n        nums[p], nums[right] = nums[right], nums[p]\n        \n        if p == k:\n            return nums[p]\n        elif p < k:\n            return quick_select(p + 1, right)\n        else:\n            return quick_select(left, p - 1)\n    \n    return quick_select(0, len(nums) - 1)\n\nprint(find_kth_largest([3, 2, 1, 5, 6, 4], 2))',
    testCases: [
      { input: '[3, 2, 1, 5, 6, 4], 2', isHidden: false, description: '2nd largest in mixed array' },
      { input: '[3, 2, 3, 1, 2, 4, 5, 5, 6], 4', isHidden: false, description: '4th largest with duplicates' },
      { input: '[1], 1', isHidden: false, description: 'Single element' }
    ],
    hints: ['Quick select is like quick sort but only recurses into one partition', 'Convert kth largest to kth smallest index', 'Average O(n) but worst case O(n^2)'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex09',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Merge Sorted Arrays',
    difficulty: 2,
    description: 'Merge two sorted arrays into one sorted array. Do not use built-in sort functions.',
    starterCode: 'def merge_sorted_arrays(arr1, arr2):\n    # Return merged sorted array\n    pass\n\nprint(merge_sorted_arrays([1, 3, 5], [2, 4, 6]))',
    solution: 'def merge_sorted_arrays(arr1, arr2):\n    result = []\n    i = j = 0\n    \n    while i < len(arr1) and j < len(arr2):\n        if arr1[i] <= arr2[j]:\n            result.append(arr1[i])\n            i += 1\n        else:\n            result.append(arr2[j])\n            j += 1\n    \n    result.extend(arr1[i:])\n    result.extend(arr2[j:])\n    return result\n\nprint(merge_sorted_arrays([1, 3, 5], [2, 4, 6]))',
    testCases: [
      { input: '[1, 3, 5], [2, 4, 6]', isHidden: false, description: 'Interleaved' },
      { input: '[1, 2, 3], []', isHidden: false, description: 'One empty' },
      { input: '[], [1, 2]', isHidden: false, description: 'First empty' },
      { input: '[1, 1], [1, 1]', isHidden: true, description: 'Duplicates' }
    ],
    hints: ['Use two pointers, one for each array', 'Compare elements and add the smaller one', 'Append remaining elements from non-empty array'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex10',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Sort Array by Parity',
    difficulty: 1,
    description: 'Given an array of integers, move all even integers to the front and all odd integers to the back.',
    starterCode: 'def sort_by_parity(nums):\n    # Return array with evens first, then odds\n    pass\n\nprint(sort_by_parity([3, 1, 2, 4]))',
    solution: 'def sort_by_parity(nums):\n    left = 0\n    right = len(nums) - 1\n    \n    while left < right:\n        while left < right and nums[left] % 2 == 0:\n            left += 1\n        while left < right and nums[right] % 2 == 1:\n            right -= 1\n        if left < right:\n            nums[left], nums[right] = nums[right], nums[left]\n            left += 1\n            right -= 1\n    \n    return nums\n\nprint(sort_by_parity([3, 1, 2, 4]))',
    testCases: [
      { input: '[3, 1, 2, 4]', isHidden: false, description: 'Mixed parity' },
      { input: '[0]', isHidden: false, description: 'Single even' },
      { input: '[2, 4, 6]', isHidden: false, description: 'All even' },
      { input: '[1, 3, 5]', isHidden: true, description: 'All odd' }
    ],
    hints: ['Use two pointers from both ends', 'Move left pointer right while pointing to evens', 'Move right pointer left while pointing to odds'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex11',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Check If Array Is Sorted',
    difficulty: 1,
    description: 'Write a function that returns True if the array is sorted in non-decreasing order, False otherwise.',
    starterCode: 'def is_sorted(arr):\n    pass\n\nprint(is_sorted([1, 2, 3, 4]))\nprint(is_sorted([1, 3, 2, 4]))',
    solution: 'def is_sorted(arr):\n    for i in range(1, len(arr)):\n        if arr[i] < arr[i - 1]:\n            return False\n    return True\n\nprint(is_sorted([1, 2, 3, 4]))\nprint(is_sorted([1, 3, 2, 4]))',
    testCases: [
      { input: '[1, 2, 3, 4]', isHidden: false, description: 'Sorted' },
      { input: '[1, 3, 2, 4]', isHidden: false, description: 'Not sorted' },
      { input: '[]', isHidden: false, description: 'Empty' },
      { input: '[1, 1, 1]', isHidden: true, description: 'Equal elements' }
    ],
    hints: ['Compare each element with the previous one', 'If any element is smaller than its predecessor, not sorted', 'Empty and single-element arrays are considered sorted'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex12',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Wiggle Sort',
    difficulty: 3,
    description: 'Reorder the array such that nums[0] <= nums[1] >= nums[2] <= nums[3]... (alternating pattern).',
    starterCode: 'def wiggle_sort(nums):\n    # Reorder in-place\n    pass\n\nnums = [3, 5, 2, 1, 6, 4]\nwiggle_sort(nums)\nprint(nums)',
    solution: 'def wiggle_sort(nums):\n    for i in range(len(nums) - 1):\n        if i % 2 == 0:\n            if nums[i] > nums[i + 1]:\n                nums[i], nums[i + 1] = nums[i + 1], nums[i]\n        else:\n            if nums[i] < nums[i + 1]:\n                nums[i], nums[i + 1] = nums[i + 1], nums[i]\n    return nums\n\nnums = [3, 5, 2, 1, 6, 4]\nwiggle_sort(nums)\nprint(nums)',
    testCases: [
      { input: '[3, 5, 2, 1, 6, 4]', isHidden: false, description: 'Standard case' },
      { input: '[1, 2, 3]', isHidden: false, description: 'Small array' },
      { input: '[1]', isHidden: false, description: 'Single element' },
      { input: '[]', isHidden: true, description: 'Empty' }
    ],
    hints: ['At even indices, current should be <= next', 'At odd indices, current should be >= next', 'Swap when the condition is violated'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex13',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Sort Characters by Frequency',
    difficulty: 2,
    description: 'Sort a string by character frequency in descending order. Characters with equal frequency can appear in any order.',
    starterCode: 'def frequency_sort(s):\n    # Return string sorted by frequency\n    pass\n\nprint(frequency_sort("tree"))',
    solution: 'def frequency_sort(s):\n    from collections import Counter\n    \n    freq = Counter(s)\n    sorted_chars = sorted(freq.keys(), key=lambda x: -freq[x])\n    \n    result = []\n    for char in sorted_chars:\n        result.append(char * freq[char])\n    \n    return "".join(result)\n\nprint(frequency_sort("tree"))',
    testCases: [
      { input: '"tree"', isHidden: false, description: 'Tree - e most frequent' },
      { input: '"cccaaa"', isHidden: false, description: 'Tied frequency' },
      { input: '"a"', isHidden: false, description: 'Single char' },
      { input: '""', isHidden: true, description: 'Empty string' }
    ],
    hints: ['Count frequency of each character', 'Sort characters by their frequency (descending)', 'Build result string by repeating each character by its frequency'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex14',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Relative Sort Array',
    difficulty: 2,
    description: 'Sort arr1 so elements appear in the same relative order as arr2. Elements not in arr2 should be placed at the end in ascending order.',
    starterCode: 'def relative_sort(arr1, arr2):\n    pass\n\nprint(relative_sort([2,3,1,3,2,4,6,7,9,2,19], [2,1,4,3,9,6]))',
    solution: 'def relative_sort(arr1, arr2):\n    from collections import Counter\n    \n    count = Counter(arr1)\n    result = []\n    \n    for num in arr2:\n        result.extend([num] * count[num])\n        del count[num]\n    \n    for num in sorted(count.keys()):\n        result.extend([num] * count[num])\n    \n    return result\n\nprint(relative_sort([2,3,1,3,2,4,6,7,9,2,19], [2,1,4,3,9,6]))',
    testCases: [
      { input: '[2,3,1,3,2,4,6,7,9,2,19], [2,1,4,3,9,6]', isHidden: false, description: 'Standard case' },
      { input: '[28,6,22,8,44,17], [22,28,8,6]', isHidden: false, description: 'Different arrays' },
      { input: '[1, 2, 3], []', isHidden: true, description: 'Empty arr2' }
    ],
    hints: ['Count occurrences in arr1', 'Add elements in arr2 order first', 'Sort and add remaining elements'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex15',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Sort Linked List (Merge Sort)',
    difficulty: 4,
    description: 'Sort a linked list using merge sort. Achieve O(n log n) time and O(1) space (excluding recursion stack).',
    starterCode: 'class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef sort_list(head):\n    pass\n\ndef print_list(head):\n    vals = []\n    while head:\n        vals.append(head.val)\n        head = head.next\n    print(vals)\n\nhead = ListNode(4, ListNode(2, ListNode(1, ListNode(3))))\nprint_list(sort_list(head))',
    solution: 'class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef sort_list(head):\n    if not head or not head.next:\n        return head\n    \n    slow = head\n    fast = head.next\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    \n    mid = slow.next\n    slow.next = None\n    \n    left = sort_list(head)\n    right = sort_list(mid)\n    \n    return merge(left, right)\n\ndef merge(l1, l2):\n    dummy = ListNode(0)\n    curr = dummy\n    \n    while l1 and l2:\n        if l1.val <= l2.val:\n            curr.next = l1\n            l1 = l1.next\n        else:\n            curr.next = l2\n            l2 = l2.next\n        curr = curr.next\n    \n    curr.next = l1 if l1 else l2\n    return dummy.next\n\ndef print_list(head):\n    vals = []\n    while head:\n        vals.append(head.val)\n        head = head.next\n    print(vals)\n\nhead = ListNode(4, ListNode(2, ListNode(1, ListNode(3))))\nprint_list(sort_list(head))',
    testCases: [
      { input: '[4, 2, 1, 3]', isHidden: false, description: 'Unsorted list' },
      { input: '[-1, 5, 3, 4, 0]', isHidden: false, description: 'With negatives' },
      { input: '[]', isHidden: true, description: 'Empty list' }
    ],
    hints: ['Use slow/fast pointers to find middle', 'Split list into two halves', 'Recursively sort and merge'],
    language: 'python'
  },
  {
    id: 'cs104-t6-ex16',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Pancake Sort',
    difficulty: 4,
    description: 'Sort an array using only "pancake flips". A flip reverses the first k elements. Return the sequence of k values used.',
    starterCode: 'def pancake_sort(arr):\n    # Return list of k values for flips\n    pass\n\nprint(pancake_sort([3, 2, 4, 1]))',
    solution: 'def pancake_sort(arr):\n    result = []\n    n = len(arr)\n    \n    def flip(k):\n        arr[:k] = arr[:k][::-1]\n    \n    for size in range(n, 1, -1):\n        max_idx = arr.index(max(arr[:size]))\n        \n        if max_idx != size - 1:\n            if max_idx > 0:\n                flip(max_idx + 1)\n                result.append(max_idx + 1)\n            \n            flip(size)\n            result.append(size)\n    \n    return result\n\nprint(pancake_sort([3, 2, 4, 1]))',
    testCases: [
      { input: '[3, 2, 4, 1]', isHidden: false, description: 'Unsorted' },
      { input: '[1, 2, 3]', isHidden: false, description: 'Already sorted' },
      { input: '[2, 1]', isHidden: true, description: 'Two elements' }
    ],
    hints: ['Work from largest to smallest element', 'Flip max to front, then flip to its final position', 'Each element takes at most 2 flips'],
    language: 'python'
  }
];
