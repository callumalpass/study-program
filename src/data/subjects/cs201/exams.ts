import { Exam } from '../../../core/types';

export const cs201Exams: Exam[] = [
  {
    id: 'cs201-exam-midterm',
    subjectId: 'cs201',
    title: 'CS201 Midterm Exam',
    durationMinutes: 90,
    instructions: [
      'This exam covers Algorithm Analysis, Sorting, Searching, and Divide & Conquer.',
      'Answer all questions.',
      'You may use pseudo-code for written answers.',
      'Show your work for complexity analysis questions.'
    ],
    questions: [
      // ========== Topic 1: Algorithm Analysis (4 questions) ==========
      {
        id: 'mid-q1',
        type: 'multiple_choice',
        prompt: 'Which function grows the fastest as n increases?',
        options: ['O(n log n)', 'O(n^2)', 'O(n)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'O(n^2) is quadratic and grows faster than linearithmic, linear, or logarithmic functions.'
      },
      {
        id: 'mid-q2',
        type: 'true_false',
        prompt: 'An O(n) algorithm is always faster than an O(n^2) algorithm for any input size n > 0.',
        correctAnswer: false,
        explanation: 'For small n, constants matter. An O(n^2) algorithm might be faster if the constant factor is small.'
      },
      {
        id: 'mid-q3',
        type: 'code_output',
        prompt: 'What is the time complexity of this function?',
        codeSnippet: `def mystery(n):
    count = 0
    i = n
    while i > 0:
        for j in range(n):
            count += 1
        i = i // 2
    return count`,
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'The outer while loop runs log(n) times (halving i), and the inner loop runs n times each, giving O(n log n).'
      },
      {
        id: 'mid-q4',
        type: 'fill_blank',
        prompt: 'Big-Theta (Θ) notation represents a ______ bound on the growth rate.',
        correctAnswer: 'tight',
        explanation: 'Big-Theta means the function is bounded both above and below asymptotically.'
      },

      // ========== Topic 2: Sorting (5 questions) ==========
      {
        id: 'mid-q5',
        type: 'multiple_choice',
        prompt: 'Which sorting algorithm has a worst-case time complexity of O(n^2)?',
        options: ['Merge Sort', 'Heap Sort', 'Quick Sort', 'Radix Sort'],
        correctAnswer: 2,
        explanation: 'Quick Sort has a worst-case of O(n^2) when the pivot is poorly chosen (e.g., sorted array). Merge and Heap are always O(n log n).'
      },
      {
        id: 'mid-q6',
        type: 'multiple_choice',
        prompt: 'Which of the following sorting algorithms is stable?',
        options: ['Heap Sort', 'Quick Sort', 'Selection Sort', 'Merge Sort'],
        correctAnswer: 3,
        explanation: 'Merge Sort is stable - it preserves the relative order of equal elements. Heap, Quick, and Selection Sort are not stable.'
      },
      {
        id: 'mid-q7',
        type: 'true_false',
        prompt: 'Insertion Sort has O(n) time complexity when the input is already sorted.',
        correctAnswer: true,
        explanation: 'On sorted input, each element is compared once and no shifting occurs, giving O(n) best-case performance.'
      },
      {
        id: 'mid-q8',
        type: 'coding',
        prompt: 'Implement Insertion Sort for a list of integers. The function should sort in-place and return the sorted array.',
        starterCode: 'def insertion_sort(arr):\n    # Sort in-place and return arr\n    pass',
        language: 'python',
        solution: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
        testCases: [
          { input: 'insertion_sort([3, 1, 4, 1, 5])', expectedOutput: '[1, 1, 3, 4, 5]', isHidden: false, description: 'Sort random list' },
          { input: 'insertion_sort([5, 4, 3, 2, 1])', expectedOutput: '[1, 2, 3, 4, 5]', isHidden: false, description: 'Reverse sorted' },
          { input: 'insertion_sort([])', expectedOutput: '[]', isHidden: true, description: 'Empty list' },
          { input: 'insertion_sort([1])', expectedOutput: '[1]', isHidden: true, description: 'Single element' }
        ],
        correctAnswer: true,
        explanation: 'Standard insertion sort: iterate from second element, insert each into its correct position in the sorted prefix.'
      },
      {
        id: 'mid-q9',
        type: 'written',
        prompt: 'Explain why Quick Sort can degrade to O(n^2) and describe one technique to mitigate this.',
        correctAnswer: 'pivot sorted unbalanced partition random median',
        explanation: 'Quick Sort degrades when partitions are unbalanced (e.g., pivot is always min/max). Mitigation includes random pivot selection or median-of-three.',
        modelAnswer: 'Quick Sort degrades to O(n^2) when the pivot selection consistently creates unbalanced partitions. This happens when the pivot is always the smallest or largest element, such as choosing the first element on already-sorted data. Each partition then has size 0 and n-1 instead of roughly n/2 and n/2. To mitigate this, we can: (1) Choose a random pivot, (2) Use median-of-three (compare first, middle, last elements and use median), or (3) Use a different algorithm like Introsort that switches to Heap Sort when recursion depth exceeds a threshold.'
      },

      // ========== Topic 3: Searching (4 questions) ==========
      {
        id: 'mid-q10',
        type: 'fill_blank',
        prompt: 'Binary Search requires the input array to be ______.',
        correctAnswer: 'sorted',
        explanation: 'Binary search relies on the order of elements to eliminate half the search space.'
      },
      {
        id: 'mid-q11',
        type: 'multiple_choice',
        prompt: 'How many comparisons does Binary Search need at most for an array of 1024 elements?',
        options: ['10', '11', '32', '1024'],
        correctAnswer: 1,
        explanation: 'Binary Search needs at most ceil(log2(n)) + 1 = 11 comparisons for 1024 elements.'
      },
      {
        id: 'mid-q12',
        type: 'coding',
        prompt: 'Implement Binary Search that returns the index of target in a sorted array, or -1 if not found.',
        starterCode: 'def binary_search(arr, target):\n    # Return index of target or -1\n    pass',
        language: 'python',
        solution: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
        testCases: [
          { input: 'binary_search([1, 3, 5, 7, 9], 5)', expectedOutput: '2', isHidden: false, description: 'Find middle element' },
          { input: 'binary_search([1, 3, 5, 7, 9], 1)', expectedOutput: '0', isHidden: false, description: 'Find first element' },
          { input: 'binary_search([1, 3, 5, 7, 9], 4)', expectedOutput: '-1', isHidden: false, description: 'Element not found' },
          { input: 'binary_search([], 5)', expectedOutput: '-1', isHidden: true, description: 'Empty array' }
        ],
        correctAnswer: true,
        explanation: 'Standard binary search with low and high pointers, checking middle element each iteration.'
      },
      {
        id: 'mid-q13',
        type: 'true_false',
        prompt: 'Linear Search is more efficient than Binary Search when searching an unsorted array once.',
        correctAnswer: true,
        explanation: 'For a single search on unsorted data, Linear Search O(n) is better than Sort O(n log n) + Binary Search O(log n).'
      },

      // ========== Topic 4: Divide and Conquer (4 questions) ==========
      {
        id: 'mid-q14',
        type: 'written',
        prompt: 'Explain the three steps of the Divide and Conquer paradigm and give an example algorithm.',
        correctAnswer: 'divide conquer combine merge sort',
        explanation: '1. Divide the problem into subproblems. 2. Conquer subproblems recursively. 3. Combine solutions.',
        modelAnswer: 'The three steps of Divide and Conquer are: 1) DIVIDE: Break the original problem into smaller, independent sub-problems of the same type. 2) CONQUER: Solve the sub-problems recursively. If a subproblem is small enough (base case), solve it directly. 3) COMBINE: Merge the solutions of the sub-problems to form the solution for the original problem. Example: Merge Sort divides the array in half (divide), recursively sorts each half (conquer), and merges the sorted halves together (combine).'
      },
      {
        id: 'mid-q15',
        type: 'multiple_choice',
        prompt: 'Using the Master Theorem, what is the complexity of T(n) = 2T(n/2) + O(n)?',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'With a=2, b=2, f(n)=O(n): since a = b^1, this is Case 2, giving O(n log n).'
      },
      {
        id: 'mid-q16',
        type: 'multiple_choice',
        prompt: 'Which of these is NOT a Divide and Conquer algorithm?',
        options: ['Merge Sort', 'Binary Search', 'Insertion Sort', 'Quick Sort'],
        correctAnswer: 2,
        explanation: 'Insertion Sort builds the solution incrementally without dividing the problem into subproblems.'
      },
      {
        id: 'mid-q17',
        type: 'code_output',
        prompt: 'What is the time complexity of this divide and conquer algorithm?',
        codeSnippet: `def dc(n):
    if n <= 1:
        return 1
    return dc(n // 2) + dc(n // 2) + n`,
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)'],
        correctAnswer: 1,
        explanation: 'T(n) = 2T(n/2) + O(n), which by Master Theorem gives O(n log n).'
      },

      // ========== Additional Questions ==========
      {
        id: 'mid-q18',
        type: 'multiple_choice',
        prompt: 'Which of the following best describes amortized analysis?',
        options: [
          'Analyzing the worst-case of a single operation',
          'Analyzing the average cost per operation over a sequence',
          'Analyzing space complexity only',
          'Analyzing parallel algorithm performance'
        ],
        correctAnswer: 1,
        explanation: 'Amortized analysis considers the average cost per operation over a sequence of operations, even when individual operations may vary greatly.'
      },
      {
        id: 'mid-q19',
        type: 'true_false',
        prompt: 'Counting Sort is a comparison-based sorting algorithm.',
        correctAnswer: false,
        explanation: 'Counting Sort does not compare elements directly. It counts occurrences and uses arithmetic to place elements, achieving O(n+k) time.'
      },
      {
        id: 'mid-q20',
        type: 'multiple_choice',
        prompt: 'What is the worst-case time complexity of Merge Sort?',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'Merge Sort always divides in half and merges in O(n) time, giving O(n log n) in all cases.'
      },
      {
        id: 'mid-q21',
        type: 'code_output',
        prompt: 'What is the time complexity of this code?',
        codeSnippet: `def foo(n):
    if n <= 1:
        return 1
    return foo(n-1) + foo(n-1)`,
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)'],
        correctAnswer: 3,
        explanation: 'Each call branches into two calls, creating a tree with 2^n nodes. This is exponential time O(2^n).'
      },
      {
        id: 'mid-q22',
        type: 'fill_blank',
        prompt: 'The lower bound for comparison-based sorting is ______ comparisons.',
        correctAnswer: 'n log n',
        explanation: 'Any comparison sort must make at least Ω(n log n) comparisons to distinguish between n! possible orderings.'
      },
      {
        id: 'mid-q23',
        type: 'multiple_choice',
        prompt: 'Which data structure is typically used to implement Binary Search Tree operations efficiently?',
        options: ['Array', 'Linked List', 'Tree nodes with left/right pointers', 'Hash Table'],
        correctAnswer: 2,
        explanation: 'BSTs use nodes with left and right child pointers to maintain the binary search property.'
      },
      {
        id: 'mid-q24',
        type: 'true_false',
        prompt: 'Interpolation Search has O(log log n) average time complexity on uniformly distributed data.',
        correctAnswer: true,
        explanation: 'On uniformly distributed data, interpolation search estimates position accurately, achieving O(log log n) average case.'
      },
      {
        id: 'mid-q25',
        type: 'written',
        prompt: 'Explain why Quick Sort has O(n^2) worst-case complexity and describe one technique to mitigate this.',
        correctAnswer: 'pivot unbalanced partition random median',
        explanation: 'Quick Sort degrades when partitions are unbalanced. Mitigation techniques include random pivot selection or median-of-three.',
        modelAnswer: 'Quick Sort has O(n^2) worst-case when the pivot selection consistently creates unbalanced partitions. For example, if the first element is always chosen as pivot on already-sorted data, each partition has sizes 0 and n-1, requiring n levels of recursion with O(n) work each. To mitigate: (1) Random pivot selection makes worst-case unlikely, (2) Median-of-three selects median of first, middle, and last elements, (3) Introsort switches to Heapsort when recursion depth exceeds a threshold.'
      },
      {
        id: 'mid-q26',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of finding the minimum element in an unsorted array of n elements?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 2,
        explanation: 'Finding the minimum requires examining every element at least once, giving O(n) time. No comparison-based algorithm can do better.'
      }
    ]
  },
  {
    id: 'cs201-exam-final',
    subjectId: 'cs201',
    title: 'CS201 Final Exam',
    durationMinutes: 150,
    instructions: [
      'Comprehensive exam covering all topics in CS201.',
      'Topics: Analysis, Sorting, Searching, D&C, Dynamic Programming, Greedy, Graphs, and Complexity Theory.',
      'Answer all questions. Show work where applicable.',
      'You may use pseudo-code for algorithm implementations.'
    ],
    questions: [
      // ========== Topic 1: Algorithm Analysis (3 questions) ==========
      {
        id: 'fin-q1',
        type: 'multiple_choice',
        prompt: 'Rank these complexities from fastest to slowest growth: O(n!), O(2^n), O(n^2), O(n log n)',
        options: [
          'O(n log n) < O(n^2) < O(2^n) < O(n!)',
          'O(n^2) < O(n log n) < O(2^n) < O(n!)',
          'O(n log n) < O(2^n) < O(n^2) < O(n!)',
          'O(2^n) < O(n!) < O(n^2) < O(n log n)'
        ],
        correctAnswer: 0,
        explanation: 'n log n grows slower than n^2, which grows slower than 2^n, which grows slower than n!.'
      },
      {
        id: 'fin-q2',
        type: 'code_output',
        prompt: 'What is the space complexity of this recursive function?',
        codeSnippet: `def sum_array(arr, n):
    if n <= 0:
        return 0
    return arr[n-1] + sum_array(arr, n-1)`,
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correctAnswer: 2,
        explanation: 'Each recursive call adds a frame to the stack. With n calls before reaching base case, space is O(n).'
      },
      {
        id: 'fin-q3',
        type: 'fill_blank',
        prompt: 'Amortized analysis considers the ______ cost per operation over a sequence of operations.',
        correctAnswer: 'average',
        explanation: 'Amortized analysis averages the cost over a sequence, even if individual operations vary in cost.'
      },

      // ========== Topic 2-4: Sorting, Searching, D&C (4 questions) ==========
      {
        id: 'fin-q4',
        type: 'multiple_choice',
        prompt: 'Which sorting algorithm would you choose for sorting a very large file that doesn\'t fit in memory?',
        options: ['Quick Sort', 'Heap Sort', 'External Merge Sort', 'Insertion Sort'],
        correctAnswer: 2,
        explanation: 'External Merge Sort is designed for data that exceeds available memory, using disk efficiently.'
      },
      {
        id: 'fin-q5',
        type: 'coding',
        prompt: 'Implement the merge function for Merge Sort that combines two sorted arrays into one sorted array.',
        starterCode: 'def merge(left, right):\n    # Merge two sorted arrays\n    pass',
        language: 'python',
        solution: `def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
        testCases: [
          { input: 'merge([1, 3, 5], [2, 4, 6])', expectedOutput: '[1, 2, 3, 4, 5, 6]', isHidden: false, description: 'Interleaved merge' },
          { input: 'merge([1, 2], [3, 4])', expectedOutput: '[1, 2, 3, 4]', isHidden: false, description: 'Sequential merge' },
          { input: 'merge([], [1, 2])', expectedOutput: '[1, 2]', isHidden: true, description: 'One empty array' },
          { input: 'merge([], [])', expectedOutput: '[]', isHidden: true, description: 'Both empty' }
        ],
        correctAnswer: true,
        explanation: 'Use two pointers to compare elements and build the merged result.'
      },
      {
        id: 'fin-q6',
        type: 'multiple_choice',
        prompt: 'What is the recurrence relation for the number of comparisons in Binary Search?',
        options: ['T(n) = T(n-1) + 1', 'T(n) = T(n/2) + 1', 'T(n) = 2T(n/2) + 1', 'T(n) = T(n/2) + n'],
        correctAnswer: 1,
        explanation: 'Binary Search makes one comparison and recursively searches half the array: T(n) = T(n/2) + 1.'
      },
      {
        id: 'fin-q7',
        type: 'true_false',
        prompt: 'The maximum subarray problem can be solved in O(n) time using Kadane\'s algorithm.',
        correctAnswer: true,
        explanation: 'Kadane\'s algorithm scans once, tracking the maximum sum ending at each position, achieving O(n).'
      },

      // ========== Topic 5: Dynamic Programming (5 questions) ==========
      {
        id: 'fin-q8',
        type: 'multiple_choice',
        prompt: 'What is the main difference between Dynamic Programming and Divide and Conquer?',
        options: [
          'DP uses recursion, D&C does not',
          'DP solves overlapping subproblems, D&C solves independent ones',
          'DP is always slower',
          'D&C requires sorting'
        ],
        correctAnswer: 1,
        explanation: 'DP is optimized for overlapping subproblems by using memoization/tabulation to avoid recomputation.'
      },
      {
        id: 'fin-q9',
        type: 'coding',
        prompt: 'Implement the Fibonacci sequence using Dynamic Programming (Tabulation) to return the nth number.',
        starterCode: 'def fib(n):\n    # Return nth Fibonacci number (0-indexed: fib(0)=0, fib(1)=1)\n    pass',
        language: 'python',
        solution: `def fib(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`,
        testCases: [
          { input: 'fib(10)', expectedOutput: '55', isHidden: false, description: 'fib(10)' },
          { input: 'fib(0)', expectedOutput: '0', isHidden: false, description: 'fib(0)' },
          { input: 'fib(1)', expectedOutput: '1', isHidden: true, description: 'fib(1)' },
          { input: 'fib(20)', expectedOutput: '6765', isHidden: true, description: 'fib(20)' }
        ],
        correctAnswer: true,
        explanation: 'Build up from base cases using a table, avoiding exponential recursive calls.'
      },
      {
        id: 'fin-q10',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of the standard 0/1 Knapsack DP solution with n items and capacity W?',
        options: ['O(n)', 'O(nW)', 'O(n^2)', 'O(2^n)'],
        correctAnswer: 1,
        explanation: 'The DP table has n rows and W columns, and each cell is filled in O(1), giving O(nW).'
      },
      {
        id: 'fin-q11',
        type: 'written',
        prompt: 'Describe the two key properties that make a problem suitable for Dynamic Programming.',
        correctAnswer: 'optimal substructure overlapping subproblems',
        explanation: 'DP requires optimal substructure (solution built from subproblem solutions) and overlapping subproblems.',
        modelAnswer: 'The two key properties are: 1) OPTIMAL SUBSTRUCTURE: The optimal solution to the problem can be constructed from optimal solutions of its subproblems. For example, the shortest path from A to C through B is the shortest path from A to B plus the shortest path from B to C. 2) OVERLAPPING SUBPROBLEMS: The recursive solution involves solving the same subproblems multiple times. Unlike Divide and Conquer where subproblems are independent, DP problems have repeated subproblems. For example, computing Fibonacci(5) requires Fibonacci(3) multiple times. DP stores these results to avoid recomputation.'
      },
      {
        id: 'fin-q12',
        type: 'code_output',
        prompt: 'What does this DP compute?',
        codeSnippet: `def dp(s1, s2):
    m, n = len(s1), len(s2)
    table = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                table[i][j] = table[i-1][j-1] + 1
            else:
                table[i][j] = max(table[i-1][j], table[i][j-1])
    return table[m][n]`,
        options: ['Edit Distance', 'Longest Common Subsequence', 'Longest Common Substring', 'String Matching Count'],
        correctAnswer: 1,
        explanation: 'This is the classic LCS algorithm - when characters match, add 1 to diagonal; otherwise take max of left/up.'
      },

      // ========== Topic 6: Greedy Algorithms (4 questions) ==========
      {
        id: 'fin-q13',
        type: 'true_false',
        prompt: 'Greedy algorithms always find the global optimal solution for the 0/1 Knapsack problem.',
        correctAnswer: false,
        explanation: 'Greedy fails for 0/1 Knapsack because taking the best item may prevent better combinations. DP is required.'
      },
      {
        id: 'fin-q14',
        type: 'multiple_choice',
        prompt: 'In the Activity Selection problem, which greedy strategy gives an optimal solution?',
        options: [
          'Select the activity with the earliest start time',
          'Select the activity with the shortest duration',
          'Select the activity with the earliest finish time',
          'Select the activity with the latest start time'
        ],
        correctAnswer: 2,
        explanation: 'Selecting the earliest-finishing activity maximizes remaining time for other activities.'
      },
      {
        id: 'fin-q15',
        type: 'coding',
        prompt: 'Implement a greedy solution for the coin change problem that returns the minimum number of coins for US denominations [25, 10, 5, 1].',
        starterCode: 'def min_coins_greedy(amount):\n    # Return minimum coins for amount using [25, 10, 5, 1]\n    pass',
        language: 'python',
        solution: `def min_coins_greedy(amount):
    coins = [25, 10, 5, 1]
    count = 0
    for coin in coins:
        count += amount // coin
        amount %= coin
    return count`,
        testCases: [
          { input: 'min_coins_greedy(41)', expectedOutput: '4', isHidden: false, description: '25+10+5+1 = 4 coins' },
          { input: 'min_coins_greedy(25)', expectedOutput: '1', isHidden: false, description: 'One quarter' },
          { input: 'min_coins_greedy(0)', expectedOutput: '0', isHidden: true, description: 'Zero amount' },
          { input: 'min_coins_greedy(99)', expectedOutput: '9', isHidden: true, description: '99 cents' }
        ],
        correctAnswer: true,
        explanation: 'For standard US coins, greedy works optimally. Take as many of each denomination as possible.'
      },
      {
        id: 'fin-q16',
        type: 'multiple_choice',
        prompt: 'Which of these problems can be solved optimally using a greedy algorithm?',
        options: ['0/1 Knapsack', 'Traveling Salesman', 'Fractional Knapsack', 'Longest Common Subsequence'],
        correctAnswer: 2,
        explanation: 'Fractional Knapsack allows partial items, so greedy by value/weight ratio is optimal.'
      },

      // ========== Topic 7: Graph Algorithms (5 questions) ==========
      {
        id: 'fin-q17',
        type: 'multiple_choice',
        prompt: 'Which algorithm is best for finding the shortest path in an unweighted graph?',
        options: ['DFS', 'BFS', 'Dijkstra', 'Bellman-Ford'],
        correctAnswer: 1,
        explanation: 'BFS explores level by level, guaranteeing the shortest path in unweighted graphs in O(V+E).'
      },
      {
        id: 'fin-q18',
        type: 'multiple_choice',
        prompt: 'Dijkstra\'s algorithm fails if the graph contains:',
        options: ['Cycles', 'Negative edge weights', 'Disconnected components', 'More than 1000 vertices'],
        correctAnswer: 1,
        explanation: 'Dijkstra assumes once a node is finalized, its distance is optimal. Negative edges can violate this.'
      },
      {
        id: 'fin-q19',
        type: 'true_false',
        prompt: 'Topological sort can be performed on any directed graph.',
        correctAnswer: false,
        explanation: 'Topological sort is only possible for Directed Acyclic Graphs (DAGs). Cycles make it impossible.'
      },
      {
        id: 'fin-q20',
        type: 'coding',
        prompt: 'Implement BFS that returns the shortest distance from start to all reachable nodes in an unweighted graph.',
        starterCode: 'def bfs_distances(graph, start):\n    # graph is adjacency list {node: [neighbors]}\n    # Return dict {node: distance from start}\n    pass',
        language: 'python',
        solution: `def bfs_distances(graph, start):
    from collections import deque
    distances = {start: 0}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph.get(node, []):
            if neighbor not in distances:
                distances[neighbor] = distances[node] + 1
                queue.append(neighbor)
    return distances`,
        testCases: [
          { input: "bfs_distances({'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}, 'A')", expectedOutput: "{'A': 0, 'B': 1, 'C': 1, 'D': 2}", isHidden: false, description: 'Simple graph' },
          { input: "bfs_distances({'A': []}, 'A')", expectedOutput: "{'A': 0}", isHidden: false, description: 'Single node' },
          { input: "bfs_distances({'A': ['B'], 'B': ['A']}, 'A')", expectedOutput: "{'A': 0, 'B': 1}", isHidden: true, description: 'Cycle handling' }
        ],
        correctAnswer: true,
        explanation: 'BFS with distance tracking - each level is one more step from start.'
      },
      {
        id: 'fin-q21',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of Dijkstra\'s algorithm with a binary heap?',
        options: ['O(V^2)', 'O(V + E)', 'O(E log V)', 'O(V * E)'],
        correctAnswer: 2,
        explanation: 'With a binary heap, extracting min is O(log V) and we do this V times, plus E decrease-key operations at O(log V) each.'
      },

      // ========== Topic 8: Complexity Theory (4 questions) ==========
      {
        id: 'fin-q22',
        type: 'fill_blank',
        prompt: 'If P = NP, then every problem whose solution can be verified in polynomial time can also be ______ in polynomial time.',
        correctAnswer: 'solved',
        explanation: 'P = NP would mean verification and solving have the same computational power.'
      },
      {
        id: 'fin-q23',
        type: 'multiple_choice',
        prompt: 'Which of these is an NP-Complete problem?',
        options: ['Sorting', 'Shortest Path', 'Traveling Salesman (decision version)', 'Binary Search'],
        correctAnswer: 2,
        explanation: 'TSP (decision: is there a tour ≤ k?) is NP-Complete. Sorting and search are in P.'
      },
      {
        id: 'fin-q24',
        type: 'true_false',
        prompt: 'Every problem in P is also in NP.',
        correctAnswer: true,
        explanation: 'If you can solve a problem in polynomial time, you can verify a solution in polynomial time. P ⊆ NP.'
      },
      {
        id: 'fin-q25',
        type: 'written',
        prompt: 'Explain what it means for a problem to be NP-Complete and what practical approach you would take when faced with such a problem.',
        correctAnswer: 'hardest NP verify polynomial reduce approximation heuristic',
        explanation: 'NP-Complete problems are the hardest in NP. Practical approaches include approximation algorithms and heuristics.',
        modelAnswer: 'A problem is NP-Complete if: 1) It is in NP (solutions can be verified in polynomial time), and 2) Every problem in NP can be reduced to it in polynomial time. This means NP-Complete problems are the "hardest" problems in NP - if any NP-Complete problem could be solved in polynomial time, then P = NP. Practical approaches when facing NP-Complete problems: 1) Use approximation algorithms that find near-optimal solutions with guaranteed bounds. 2) Use heuristics (like genetic algorithms, simulated annealing) that work well in practice but have no guarantees. 3) Exploit special structure in your specific instance. 4) Use exponential algorithms if the input is small enough. 5) Use constraint solvers or SAT solvers that are highly optimized for many real-world instances.'
      },

      // ========== Additional Questions ==========
      {
        id: 'fin-q26',
        type: 'multiple_choice',
        prompt: 'Which algorithm finds Strongly Connected Components in O(V + E) time?',
        options: ['Floyd-Warshall', 'Kosaraju\'s Algorithm', 'Dijkstra\'s Algorithm', 'Prim\'s Algorithm'],
        correctAnswer: 1,
        explanation: 'Kosaraju\'s algorithm uses two DFS passes to find all SCCs in linear time O(V + E).'
      },
      {
        id: 'fin-q27',
        type: 'true_false',
        prompt: 'The Ford-Fulkerson algorithm for maximum flow always terminates when edge capacities are irrational numbers.',
        correctAnswer: false,
        explanation: 'With irrational capacities, Ford-Fulkerson may not terminate. Edmonds-Karp (using BFS) guarantees termination.'
      },
      {
        id: 'fin-q28',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of Floyd-Warshall algorithm for all-pairs shortest paths?',
        options: ['O(V + E)', 'O(V^2)', 'O(V^3)', 'O(V^2 log V)'],
        correctAnswer: 2,
        explanation: 'Floyd-Warshall has three nested loops over vertices, giving O(V^3) time complexity.'
      },
      {
        id: 'fin-q29',
        type: 'code_output',
        prompt: 'What is the time complexity of this code?',
        codeSnippet: `def mystery(arr, k):
    n = len(arr)
    result = 0
    for i in range(n):
        for j in range(min(i + k, n)):
            result += arr[j]
    return result`,
        options: ['O(n)', 'O(nk)', 'O(n^2)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'The inner loop runs at most k iterations for each of n outer iterations, giving O(nk).'
      },
      {
        id: 'fin-q30',
        type: 'multiple_choice',
        prompt: 'Which data structure is used to efficiently implement Huffman coding?',
        options: ['Stack', 'Queue', 'Min-Heap (Priority Queue)', 'Hash Table'],
        correctAnswer: 2,
        explanation: 'Huffman coding repeatedly extracts the two minimum-frequency nodes, which is efficient with a min-heap.'
      },
      {
        id: 'fin-q31',
        type: 'fill_blank',
        prompt: 'Kruskal\'s algorithm uses a ______ data structure to efficiently detect cycles when building an MST.',
        correctAnswer: 'union-find',
        explanation: 'Union-Find (Disjoint Set Union) allows near-constant time cycle detection when adding edges.'
      },
      {
        id: 'fin-q32',
        type: 'multiple_choice',
        prompt: 'What is the approximation ratio of the greedy 2-approximation algorithm for Vertex Cover?',
        options: ['Within 1.5x optimal', 'Within 2x optimal', 'Within log(n)x optimal', 'Exactly optimal'],
        correctAnswer: 1,
        explanation: 'The greedy algorithm for Vertex Cover guarantees a solution at most twice the optimal size.'
      },
      {
        id: 'fin-q33',
        type: 'coding',
        prompt: 'Implement a function to detect if a directed graph has a cycle using DFS.',
        starterCode: 'def has_cycle(graph):\n    # graph is adjacency list {node: [neighbors]}\n    # Return True if cycle exists, False otherwise\n    pass',
        language: 'python',
        solution: `def has_cycle(graph):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {node: WHITE for node in graph}

    def dfs(node):
        color[node] = GRAY
        for neighbor in graph.get(node, []):
            if neighbor not in color:
                color[neighbor] = WHITE
            if color[neighbor] == GRAY:
                return True
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node] = BLACK
        return False

    for node in graph:
        if color[node] == WHITE:
            if dfs(node):
                return True
    return False`,
        testCases: [
          { input: "has_cycle({'A': ['B'], 'B': ['C'], 'C': ['A']})", expectedOutput: 'True', isHidden: false, description: 'Simple cycle' },
          { input: "has_cycle({'A': ['B'], 'B': ['C'], 'C': []})", expectedOutput: 'False', isHidden: false, description: 'No cycle' },
          { input: "has_cycle({'A': ['A']})", expectedOutput: 'True', isHidden: true, description: 'Self loop' }
        ],
        correctAnswer: true,
        explanation: 'Use three-color DFS: white=unvisited, gray=in progress, black=done. A gray node visited again indicates a cycle.'
      },
      {
        id: 'fin-q34',
        type: 'multiple_choice',
        prompt: 'Which of the following is NOT a valid approach for the Longest Common Subsequence problem?',
        options: ['Dynamic Programming with O(mn) table', 'Greedy selection of matching characters', 'Memoized recursion', 'Space-optimized DP with O(min(m,n)) space'],
        correctAnswer: 1,
        explanation: 'Greedy does not work for LCS because choosing matching characters greedily may miss the optimal solution.'
      },
      {
        id: 'fin-q35',
        type: 'true_false',
        prompt: 'Strassen\'s algorithm for matrix multiplication has a better asymptotic complexity than the naive O(n^3) algorithm.',
        correctAnswer: true,
        explanation: 'Strassen\'s algorithm achieves O(n^2.807) by reducing 8 recursive multiplications to 7.'
      },
      {
        id: 'fin-q36',
        type: 'multiple_choice',
        prompt: 'What problem does the Bellman-Ford algorithm solve that Dijkstra cannot?',
        options: [
          'Finding shortest paths in unweighted graphs',
          'Finding shortest paths with negative edge weights',
          'Finding all-pairs shortest paths',
          'Finding minimum spanning trees'
        ],
        correctAnswer: 1,
        explanation: 'Bellman-Ford handles negative edge weights and can detect negative cycles, unlike Dijkstra.'
      },
      {
        id: 'fin-q37',
        type: 'written',
        prompt: 'Explain the difference between Prim\'s and Kruskal\'s algorithms for finding Minimum Spanning Trees.',
        correctAnswer: 'grow tree edges vertices greedy union-find priority queue',
        explanation: 'Both are greedy but Prim grows one tree while Kruskal merges forests.',
        modelAnswer: 'Both Prim\'s and Kruskal\'s are greedy algorithms for MST, but they differ in approach: PRIM\'S ALGORITHM: Grows a single tree from a starting vertex. At each step, add the minimum-weight edge connecting a tree vertex to a non-tree vertex. Uses a priority queue. Time: O(E log V) with binary heap. Best for dense graphs. KRUSKAL\'S ALGORITHM: Processes all edges globally. Sort edges by weight, then add each edge if it doesn\'t create a cycle (checked via Union-Find). Time: O(E log E) for sorting. Best for sparse graphs. Key difference: Prim is vertex-centric (grows one tree), Kruskal is edge-centric (merges forest components).'
      },
      {
        id: 'fin-q38',
        type: 'multiple_choice',
        prompt: 'In the context of approximation algorithms, what does PTAS stand for?',
        options: [
          'Polynomial Time Approximation Scheme',
          'Probabilistic Time Algorithm Solution',
          'Parallel Task Assignment System',
          'Parameterized Tree Analysis Structure'
        ],
        correctAnswer: 0,
        explanation: 'PTAS (Polynomial Time Approximation Scheme) achieves (1+ε)-approximation in time polynomial in n for any fixed ε > 0.'
      },
      {
        id: 'fin-q39',
        type: 'code_output',
        prompt: 'What does this algorithm compute?',
        codeSnippet: `def algo(graph, s):
    dist = {v: float('inf') for v in graph}
    dist[s] = 0
    for _ in range(len(graph) - 1):
        for u in graph:
            for v, w in graph[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
    return dist`,
        options: ['BFS distances', 'DFS traversal order', 'Single-source shortest paths (Bellman-Ford)', 'Topological sort'],
        correctAnswer: 2,
        explanation: 'This is Bellman-Ford: relaxing all edges V-1 times finds shortest paths even with negative weights.'
      },
      {
        id: 'fin-q40',
        type: 'multiple_choice',
        prompt: 'What is the space complexity of the standard recursive Fibonacci implementation without memoization?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(2^n)'],
        correctAnswer: 2,
        explanation: 'The recursion depth is O(n), so the call stack uses O(n) space, even though time is O(2^n).'
      },
      {
        id: 'fin-q41',
        type: 'fill_blank',
        prompt: 'The ______ algorithm solves the maximum flow problem by finding augmenting paths using BFS, guaranteeing polynomial time.',
        correctAnswer: 'Edmonds-Karp',
        explanation: 'Edmonds-Karp uses BFS to find shortest augmenting paths, giving O(VE^2) time complexity.'
      },
      {
        id: 'fin-q42',
        type: 'multiple_choice',
        prompt: 'Which of the following problems is NOT known to be NP-Complete?',
        options: ['3-SAT', 'Hamiltonian Path', 'Shortest Path in a weighted graph', 'Graph Coloring with k ≥ 3 colors'],
        correctAnswer: 2,
        explanation: 'Shortest path can be solved in polynomial time using Dijkstra or Bellman-Ford. The others are classic NP-Complete problems.'
      }
    ]
  }
];
