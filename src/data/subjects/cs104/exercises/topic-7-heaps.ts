import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'cs104-t7-ex01',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Basic Min Heap Operations',
    difficulty: 1,
    description: 'Use Python\'s heapq module to implement basic min-heap operations. Insert values and extract the minimum.',
    starterCode: 'import heapq\n\ndef heap_operations(values):\n    # Insert all values, then extract them in sorted order\n    pass\n\nprint(heap_operations([5, 3, 8, 1, 2]))',
    solution: 'import heapq\n\ndef heap_operations(values):\n    heap = []\n    for val in values:\n        heapq.heappush(heap, val)\n    \n    result = []\n    while heap:\n        result.append(heapq.heappop(heap))\n    return result\n\nprint(heap_operations([5, 3, 8, 1, 2]))',
    testCases: [
      { input: '[5, 3, 8, 1, 2]', isHidden: false, description: 'Basic list with mixed values' },
      { input: '[1]', isHidden: false, description: 'Single element' },
      { input: '[]', isHidden: false, description: 'Empty list' },
      { input: '[3, 3, 3]', isHidden: true, description: 'All duplicate values' }
    ],
    hints: ['Use heapq.heappush() to insert', 'Use heapq.heappop() to extract minimum', 'Elements come out in sorted order'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex02',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Kth Largest Element Using Heap',
    difficulty: 2,
    description: 'Find the kth largest element in an array using a min-heap of size k.',
    starterCode: 'import heapq\n\ndef find_kth_largest(nums, k):\n    pass\n\nprint(find_kth_largest([3, 2, 1, 5, 6, 4], 2))',
    solution: 'import heapq\n\ndef find_kth_largest(nums, k):\n    heap = []\n    for num in nums:\n        heapq.heappush(heap, num)\n        if len(heap) > k:\n            heapq.heappop(heap)\n    return heap[0]\n\nprint(find_kth_largest([3, 2, 1, 5, 6, 4], 2))',
    testCases: [
      { input: '[3, 2, 1, 5, 6, 4], 2', isHidden: false, description: 'Find 2nd largest in unsorted array' },
      { input: '[3, 2, 3, 1, 2, 4, 5, 5, 6], 4', isHidden: false, description: 'Array with duplicates' },
      { input: '[1], 1', isHidden: false, description: 'Single element array' },
      { input: '[7, 6, 5, 4, 3, 2, 1], 7', isHidden: true, description: 'Find smallest in descending array' }
    ],
    hints: ['Keep a min-heap of exactly k elements', 'If heap grows beyond k, pop the smallest', 'The root of the heap is the kth largest'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex03',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Implement Max Heap',
    difficulty: 2,
    description: 'Implement a max heap class with insert, extract_max, and peek methods. Since Python\'s heapq is a min-heap, negate values.',
    starterCode: 'import heapq\n\nclass MaxHeap:\n    def __init__(self):\n        self.heap = []\n    \n    def insert(self, val):\n        pass\n    \n    def extract_max(self):\n        pass\n    \n    def peek(self):\n        pass\n\nmh = MaxHeap()\nfor v in [3, 1, 4, 1, 5, 9, 2, 6]:\n    mh.insert(v)\nprint(mh.extract_max())\nprint(mh.peek())',
    solution: 'import heapq\n\nclass MaxHeap:\n    def __init__(self):\n        self.heap = []\n    \n    def insert(self, val):\n        heapq.heappush(self.heap, -val)\n    \n    def extract_max(self):\n        if self.heap:\n            return -heapq.heappop(self.heap)\n        return None\n    \n    def peek(self):\n        if self.heap:\n            return -self.heap[0]\n        return None\n\nmh = MaxHeap()\nfor v in [3, 1, 4, 1, 5, 9, 2, 6]:\n    mh.insert(v)\nprint(mh.extract_max())\nprint(mh.peek())',
    testCases: [
      { input: '[3, 1, 4, 1, 5, 9, 2, 6]', isHidden: false, description: 'Extract max twice from multiple elements' },
      { input: '[1]', isHidden: false, description: 'Single element max heap' },
      { input: '[]', isHidden: true, description: 'Empty heap operations' }
    ],
    hints: ['Negate values when pushing to convert min-heap to max-heap', 'Negate again when extracting to get original value', 'heap[0] is always the smallest (most negative)'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex04',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Merge K Sorted Lists',
    difficulty: 3,
    description: 'Merge k sorted lists into one sorted list using a heap. This is more efficient than merging pairs.',
    starterCode: 'import heapq\n\ndef merge_k_sorted(lists):\n    pass\n\nprint(merge_k_sorted([[1, 4, 5], [1, 3, 4], [2, 6]]))',
    solution: 'import heapq\n\ndef merge_k_sorted(lists):\n    heap = []\n    \n    # Initialize heap with first element from each list\n    for i, lst in enumerate(lists):\n        if lst:\n            heapq.heappush(heap, (lst[0], i, 0))\n    \n    result = []\n    while heap:\n        val, list_idx, elem_idx = heapq.heappop(heap)\n        result.append(val)\n        \n        # Add next element from same list if exists\n        if elem_idx + 1 < len(lists[list_idx]):\n            next_val = lists[list_idx][elem_idx + 1]\n            heapq.heappush(heap, (next_val, list_idx, elem_idx + 1))\n    \n    return result\n\nprint(merge_k_sorted([[1, 4, 5], [1, 3, 4], [2, 6]]))',
    testCases: [
      { input: '[[1, 4, 5], [1, 3, 4], [2, 6]]', isHidden: false, description: 'Merge three sorted lists' },
      { input: '[[]]', isHidden: false, description: 'List containing empty list' },
      { input: '[[1], [2], [3]]', isHidden: false, description: 'Single element lists' },
      { input: '[]', isHidden: true, description: 'Empty list of lists' }
    ],
    hints: ['Store (value, list_index, element_index) in heap', 'Always pop the minimum and push next from same list', 'Time complexity: O(n log k) where n is total elements'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex05',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Find Median from Data Stream',
    difficulty: 4,
    description: 'Design a data structure that supports adding numbers and finding the median efficiently. Use two heaps.',
    starterCode: 'import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        pass\n    \n    def add_num(self, num):\n        pass\n    \n    def find_median(self):\n        pass\n\nmf = MedianFinder()\nfor num in [1, 2, 3, 4, 5]:\n    mf.add_num(num)\n    print(mf.find_median())',
    solution: 'import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.small = []  # max-heap (negated) for smaller half\n        self.large = []  # min-heap for larger half\n    \n    def add_num(self, num):\n        # Add to max-heap (small)\n        heapq.heappush(self.small, -num)\n        \n        # Balance: move largest from small to large\n        heapq.heappush(self.large, -heapq.heappop(self.small))\n        \n        # Keep small same size or 1 larger\n        if len(self.large) > len(self.small):\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n    \n    def find_median(self):\n        if len(self.small) > len(self.large):\n            return -self.small[0]\n        return (-self.small[0] + self.large[0]) / 2\n\nmf = MedianFinder()\nfor num in [1, 2, 3, 4, 5]:\n    mf.add_num(num)\n    print(mf.find_median())',
    testCases: [
      { input: '[1, 2, 3, 4, 5]', isHidden: false, description: 'Sequential additions with increasing values' },
      { input: '[2, 1]', isHidden: false, description: 'Two elements out of order' },
      { input: '[5]', isHidden: true, description: 'Single element median' }
    ],
    hints: ['Use max-heap for smaller half, min-heap for larger half', 'Keep heaps balanced (differ by at most 1)', 'Median is either top of small or average of both tops'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex06',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Top K Frequent Elements',
    difficulty: 2,
    description: 'Given an array and integer k, return the k most frequent elements.',
    starterCode: 'import heapq\nfrom collections import Counter\n\ndef top_k_frequent(nums, k):\n    pass\n\nprint(top_k_frequent([1, 1, 1, 2, 2, 3], 2))',
    solution: 'import heapq\nfrom collections import Counter\n\ndef top_k_frequent(nums, k):\n    freq = Counter(nums)\n    \n    # Use min-heap of size k\n    heap = []\n    for num, count in freq.items():\n        heapq.heappush(heap, (count, num))\n        if len(heap) > k:\n            heapq.heappop(heap)\n    \n    return [num for count, num in heap]\n\nprint(top_k_frequent([1, 1, 1, 2, 2, 3], 2))',
    testCases: [
      { input: '[1, 1, 1, 2, 2, 3], 2', isHidden: false, description: 'Find 2 most frequent elements' },
      { input: '[1], 1', isHidden: false, description: 'Single element with k=1' },
      { input: '[4, 1, -1, 2, -1, 2, 3], 2', isHidden: true, description: 'Array with negative numbers' }
    ],
    hints: ['Count frequencies with Counter', 'Use min-heap of size k with (frequency, element)', 'Pop when heap exceeds k elements'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex07',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Implement Heap Sort',
    difficulty: 3,
    description: 'Implement heap sort algorithm. Build a max-heap, then repeatedly extract the maximum.',
    starterCode: 'def heap_sort(arr):\n    pass\n\nprint(heap_sort([12, 11, 13, 5, 6, 7]))',
    solution: 'def heap_sort(arr):\n    n = len(arr)\n    \n    def heapify(n, i):\n        largest = i\n        left = 2 * i + 1\n        right = 2 * i + 2\n        \n        if left < n and arr[left] > arr[largest]:\n            largest = left\n        if right < n and arr[right] > arr[largest]:\n            largest = right\n        \n        if largest != i:\n            arr[i], arr[largest] = arr[largest], arr[i]\n            heapify(n, largest)\n    \n    # Build max-heap\n    for i in range(n // 2 - 1, -1, -1):\n        heapify(n, i)\n    \n    # Extract elements one by one\n    for i in range(n - 1, 0, -1):\n        arr[0], arr[i] = arr[i], arr[0]\n        heapify(i, 0)\n    \n    return arr\n\nprint(heap_sort([12, 11, 13, 5, 6, 7]))',
    testCases: [
      { input: '[12, 11, 13, 5, 6, 7]', isHidden: false, description: 'Unsorted array with 6 elements' },
      { input: '[4, 3, 2, 1]', isHidden: false, description: 'Reverse sorted array' },
      { input: '[]', isHidden: false, description: 'Empty array' },
      { input: '[1]', isHidden: true, description: 'Single element array' }
    ],
    hints: ['Build max-heap starting from last non-leaf node', 'Swap root with last element, reduce heap size, heapify', 'O(n log n) time, O(1) space'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex08',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'K Closest Points to Origin',
    difficulty: 2,
    description: 'Find the k closest points to the origin (0, 0). Distance is calculated as sqrt(x^2 + y^2).',
    starterCode: 'import heapq\n\ndef k_closest(points, k):\n    pass\n\nprint(k_closest([[1, 3], [-2, 2], [5, 8], [0, 1]], 2))',
    solution: 'import heapq\n\ndef k_closest(points, k):\n    # Use max-heap of size k (negate distances)\n    heap = []\n    \n    for x, y in points:\n        dist = x * x + y * y  # No need for sqrt for comparison\n        heapq.heappush(heap, (-dist, [x, y]))\n        if len(heap) > k:\n            heapq.heappop(heap)\n    \n    return [point for _, point in heap]\n\nprint(k_closest([[1, 3], [-2, 2], [5, 8], [0, 1]], 2))',
    testCases: [
      { input: '[[1, 3], [-2, 2], [5, 8], [0, 1]], 2', isHidden: false, description: 'Find 2 closest points from 4' },
      { input: '[[3, 3], [5, -1], [-2, 4]], 2', isHidden: false, description: 'Points with negative coordinates' },
      { input: '[[0, 0]], 1', isHidden: true, description: 'Origin point only' }
    ],
    hints: ['Use squared distance (no need for sqrt)', 'Max-heap keeps k smallest by removing largest', 'Negate distances for max-heap behavior'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex09',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Last Stone Weight',
    difficulty: 1,
    description: 'Smash stones together: take two heaviest, if different weights, put difference back. Return last stone weight or 0.',
    starterCode: 'import heapq\n\ndef last_stone_weight(stones):\n    pass\n\nprint(last_stone_weight([2, 7, 4, 1, 8, 1]))',
    solution: 'import heapq\n\ndef last_stone_weight(stones):\n    # Convert to max-heap by negating\n    heap = [-s for s in stones]\n    heapq.heapify(heap)\n    \n    while len(heap) > 1:\n        first = -heapq.heappop(heap)\n        second = -heapq.heappop(heap)\n        \n        if first != second:\n            heapq.heappush(heap, -(first - second))\n    \n    return -heap[0] if heap else 0\n\nprint(last_stone_weight([2, 7, 4, 1, 8, 1]))',
    testCases: [
      { input: '[2, 7, 4, 1, 8, 1]', isHidden: false, description: 'Multiple stones with different weights' },
      { input: '[1]', isHidden: false, description: 'Single stone' },
      { input: '[2, 2]', isHidden: false, description: 'Two equal stones' },
      { input: '[]', isHidden: true, description: 'No stones' }
    ],
    hints: ['Need max-heap to always get two heaviest', 'Negate values for max-heap in Python', 'Keep smashing until 0 or 1 stones remain'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex10',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Task Scheduler',
    difficulty: 4,
    description: 'Given tasks and cooling interval n, find minimum time to finish all tasks. Same tasks must be separated by at least n intervals.',
    starterCode: 'import heapq\nfrom collections import Counter\n\ndef least_interval(tasks, n):\n    pass\n\nprint(least_interval(["A","A","A","B","B","B"], 2))',
    solution: 'import heapq\nfrom collections import Counter, deque\n\ndef least_interval(tasks, n):\n    freq = Counter(tasks)\n    heap = [-cnt for cnt in freq.values()]  # Max-heap\n    heapq.heapify(heap)\n    \n    time = 0\n    cooldown = deque()  # (available_time, count)\n    \n    while heap or cooldown:\n        time += 1\n        \n        if heap:\n            cnt = heapq.heappop(heap) + 1  # Execute one task\n            if cnt < 0:\n                cooldown.append((time + n, cnt))\n        \n        if cooldown and cooldown[0][0] == time:\n            heapq.heappush(heap, cooldown.popleft()[1])\n    \n    return time\n\nprint(least_interval(["A","A","A","B","B","B"], 2))',
    testCases: [
      { input: '["A","A","A","B","B","B"], 2', isHidden: false, description: 'Equal frequency tasks with cooldown 2' },
      { input: '["A","A","A","B","B","B"], 0', isHidden: false, description: 'No cooldown period' },
      { input: '["A","A","A","A","A","A","B","C","D","E","F","G"], 2', isHidden: true, description: 'One dominant task with many others' }
    ],
    hints: ['Always schedule most frequent available task', 'Track when each task type becomes available', 'Idle if no task available but work remains'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex11',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Check if Array is a Min Heap',
    difficulty: 1,
    description: 'Given an array representing a complete binary tree, check if it satisfies the min-heap property.',
    starterCode: 'def is_min_heap(arr):\n    pass\n\nprint(is_min_heap([1, 2, 3, 4, 5]))\nprint(is_min_heap([1, 5, 2, 4, 3]))',
    solution: 'def is_min_heap(arr):\n    n = len(arr)\n    for i in range(n):\n        left = 2 * i + 1\n        right = 2 * i + 2\n        \n        if left < n and arr[i] > arr[left]:\n            return False\n        if right < n and arr[i] > arr[right]:\n            return False\n    \n    return True\n\nprint(is_min_heap([1, 2, 3, 4, 5]))\nprint(is_min_heap([1, 5, 2, 4, 3]))',
    testCases: [
      { input: '[1, 2, 3, 4, 5]', isHidden: false, description: 'Valid min heap' },
      { input: '[1, 5, 2, 4, 3]', isHidden: false, description: 'Invalid heap structure' },
      { input: '[]', isHidden: false, description: 'Empty array is valid' },
      { input: '[1]', isHidden: true, description: 'Single element is valid' }
    ],
    hints: ['For each node, check if it is smaller than both children', 'Use index formulas: left = 2*i+1, right = 2*i+2', 'Only check children that exist (within bounds)'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex12',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Kth Smallest Element in Sorted Matrix',
    difficulty: 3,
    description: 'Find the kth smallest element in a matrix where each row and column is sorted.',
    starterCode: 'import heapq\n\ndef kth_smallest(matrix, k):\n    pass\n\nmatrix = [\n    [1, 5, 9],\n    [10, 11, 13],\n    [12, 13, 15]\n]\nprint(kth_smallest(matrix, 8))',
    solution: 'import heapq\n\ndef kth_smallest(matrix, k):\n    n = len(matrix)\n    heap = [(matrix[0][0], 0, 0)]\n    visited = {(0, 0)}\n    \n    for _ in range(k):\n        val, r, c = heapq.heappop(heap)\n        \n        if _ == k - 1:\n            return val\n        \n        # Add right neighbor\n        if c + 1 < n and (r, c + 1) not in visited:\n            heapq.heappush(heap, (matrix[r][c + 1], r, c + 1))\n            visited.add((r, c + 1))\n        \n        # Add bottom neighbor\n        if r + 1 < n and (r + 1, c) not in visited:\n            heapq.heappush(heap, (matrix[r + 1][c], r + 1, c))\n            visited.add((r + 1, c))\n    \n    return val\n\nmatrix = [\n    [1, 5, 9],\n    [10, 11, 13],\n    [12, 13, 15]\n]\nprint(kth_smallest(matrix, 8))',
    testCases: [
      { input: '[[1,5,9],[10,11,13],[12,13,15]], 8', isHidden: false, description: '3x3 sorted matrix' },
      { input: '[[-5]], 1', isHidden: false, description: 'Single element matrix' },
      { input: '[[1,2],[1,3]], 2', isHidden: true, description: 'Matrix with duplicate values' }
    ],
    hints: ['Start with top-left corner in heap', 'Pop k times, each time add right and bottom neighbors', 'Use visited set to avoid duplicates'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex13',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Reorganize String',
    difficulty: 3,
    description: 'Reorganize string so no two adjacent characters are the same. Return empty string if impossible.',
    starterCode: 'import heapq\nfrom collections import Counter\n\ndef reorganize_string(s):\n    pass\n\nprint(reorganize_string("aab"))\nprint(reorganize_string("aaab"))',
    solution: 'import heapq\nfrom collections import Counter\n\ndef reorganize_string(s):\n    freq = Counter(s)\n    heap = [(-count, char) for char, count in freq.items()]\n    heapq.heapify(heap)\n    \n    result = []\n    prev_count, prev_char = 0, ""\n    \n    while heap:\n        count, char = heapq.heappop(heap)\n        result.append(char)\n        \n        # Push back previous character if still has count\n        if prev_count < 0:\n            heapq.heappush(heap, (prev_count, prev_char))\n        \n        prev_count = count + 1  # Used one\n        prev_char = char\n    \n    result = "".join(result)\n    return result if len(result) == len(s) else ""\n\nprint(reorganize_string("aab"))\nprint(reorganize_string("aaab"))',
    testCases: [
      { input: '"aab"', isHidden: false, description: 'Simple reorganization possible' },
      { input: '"aaab"', isHidden: false, description: 'Impossible to reorganize' },
      { input: '"vvvlo"', isHidden: false, description: 'Multiple reorganizations needed' },
      { input: '""', isHidden: true, description: 'Empty string' }
    ],
    hints: ['Use max-heap to always pick most frequent available char', 'Hold back the just-used character for one round', 'Impossible if any character appears > (n+1)/2 times'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex14',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Min Heap Implementation from Scratch',
    difficulty: 3,
    description: 'Implement a min-heap class without using heapq. Implement insert, extract_min, heapify_up, and heapify_down.',
    starterCode: 'class MinHeap:\n    def __init__(self):\n        self.heap = []\n    \n    def parent(self, i):\n        return (i - 1) // 2\n    \n    def left_child(self, i):\n        return 2 * i + 1\n    \n    def right_child(self, i):\n        return 2 * i + 2\n    \n    def insert(self, key):\n        pass\n    \n    def extract_min(self):\n        pass\n    \n    def _heapify_up(self, i):\n        pass\n    \n    def _heapify_down(self, i):\n        pass\n\nmh = MinHeap()\nfor v in [5, 3, 8, 1, 2]:\n    mh.insert(v)\nprint([mh.extract_min() for _ in range(5)])',
    solution: 'class MinHeap:\n    def __init__(self):\n        self.heap = []\n    \n    def parent(self, i):\n        return (i - 1) // 2\n    \n    def left_child(self, i):\n        return 2 * i + 1\n    \n    def right_child(self, i):\n        return 2 * i + 2\n    \n    def insert(self, key):\n        self.heap.append(key)\n        self._heapify_up(len(self.heap) - 1)\n    \n    def extract_min(self):\n        if not self.heap:\n            return None\n        if len(self.heap) == 1:\n            return self.heap.pop()\n        \n        min_val = self.heap[0]\n        self.heap[0] = self.heap.pop()\n        self._heapify_down(0)\n        return min_val\n    \n    def _heapify_up(self, i):\n        parent = self.parent(i)\n        while i > 0 and self.heap[i] < self.heap[parent]:\n            self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]\n            i = parent\n            parent = self.parent(i)\n    \n    def _heapify_down(self, i):\n        smallest = i\n        left = self.left_child(i)\n        right = self.right_child(i)\n        \n        if left < len(self.heap) and self.heap[left] < self.heap[smallest]:\n            smallest = left\n        if right < len(self.heap) and self.heap[right] < self.heap[smallest]:\n            smallest = right\n        \n        if smallest != i:\n            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]\n            self._heapify_down(smallest)\n\nmh = MinHeap()\nfor v in [5, 3, 8, 1, 2]:\n    mh.insert(v)\nprint([mh.extract_min() for _ in range(5)])',
    testCases: [
      { input: '[5, 3, 8, 1, 2]', isHidden: false, description: 'Basic unsorted array' },
      { input: '[1]', isHidden: false, description: 'Single element' },
      { input: '[]', isHidden: true, description: 'Empty array' }
    ],
    hints: ['heapify_up: swap with parent while smaller', 'heapify_down: swap with smallest child while larger', 'extract_min: move last element to root, then heapify down'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex15',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Smallest Range Covering K Lists',
    difficulty: 5,
    description: 'Find the smallest range that includes at least one element from each of k sorted lists.',
    starterCode: 'import heapq\n\ndef smallest_range(nums):\n    pass\n\nprint(smallest_range([[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]))',
    solution: 'import heapq\n\ndef smallest_range(nums):\n    heap = []\n    current_max = float("-inf")\n    \n    # Initialize: first element from each list\n    for i, lst in enumerate(nums):\n        heapq.heappush(heap, (lst[0], i, 0))\n        current_max = max(current_max, lst[0])\n    \n    result = [float("-inf"), float("inf")]\n    \n    while True:\n        current_min, list_idx, elem_idx = heapq.heappop(heap)\n        \n        # Update result if smaller range found\n        if current_max - current_min < result[1] - result[0]:\n            result = [current_min, current_max]\n        \n        # Move to next element in that list\n        if elem_idx + 1 == len(nums[list_idx]):\n            break  # Exhausted one list\n        \n        next_val = nums[list_idx][elem_idx + 1]\n        heapq.heappush(heap, (next_val, list_idx, elem_idx + 1))\n        current_max = max(current_max, next_val)\n    \n    return result\n\nprint(smallest_range([[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]))',
    testCases: [
      { input: '[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]', isHidden: false, description: 'Three lists with different ranges' },
      { input: '[[1,2,3],[1,2,3],[1,2,3]]', isHidden: false, description: 'Identical sorted lists' },
      { input: '[[1],[2],[3]]', isHidden: true, description: 'Single element lists' }
    ],
    hints: ['Track current min (from heap) and current max', 'Range = [min, max] when all lists represented', 'Advance pointer in list that has current min'],
    language: 'python'
  },
  {
    id: 'cs104-t7-ex16',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'IPO - Maximize Capital',
    difficulty: 5,
    description: 'You have initial capital and can complete k projects. Each project has profit and required capital. Maximize final capital.',
    starterCode: 'import heapq\n\ndef find_maximized_capital(k, w, profits, capital):\n    # k: max projects, w: initial capital\n    pass\n\nprint(find_maximized_capital(2, 0, [1, 2, 3], [0, 1, 1]))',
    solution: 'import heapq\n\ndef find_maximized_capital(k, w, profits, capital):\n    projects = sorted(zip(capital, profits))  # Sort by capital required\n    heap = []  # Max-heap of available profits\n    idx = 0\n    n = len(profits)\n    \n    for _ in range(k):\n        # Add all projects we can now afford\n        while idx < n and projects[idx][0] <= w:\n            heapq.heappush(heap, -projects[idx][1])  # Max-heap\n            idx += 1\n        \n        if not heap:\n            break  # No affordable projects\n        \n        # Do most profitable project\n        w += -heapq.heappop(heap)\n    \n    return w\n\nprint(find_maximized_capital(2, 0, [1, 2, 3], [0, 1, 1]))',
    testCases: [
      { input: '2, 0, [1, 2, 3], [0, 1, 1]', isHidden: false, description: 'Two projects from zero capital' },
      { input: '3, 0, [1, 2, 3], [0, 1, 2]', isHidden: false, description: 'Three projects with progressive capital' },
      { input: '1, 0, [1, 2, 3], [1, 1, 2]', isHidden: true, description: 'Cannot afford any project' }
    ],
    hints: ['Sort projects by capital requirement', 'Use max-heap to pick most profitable affordable project', 'Greedily pick highest profit each time'],
    language: 'python'
  }
];
