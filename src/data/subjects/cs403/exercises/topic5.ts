import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'cs403-t5-ex01',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Matrix Chain Multiplication',
    difficulty: 3,
    description: 'Find the optimal way to multiply a chain of matrices to minimize scalar multiplications.',
    starterCode: `def matrix_chain_order(dimensions):
    """
    Find minimum scalar multiplications for matrix chain.

    Args:
        dimensions: List where matrix i is dimensions[i-1] x dimensions[i]

    Returns:
        int: Minimum number of scalar multiplications
    """
    # Your code here
    pass`,
    solution: `def matrix_chain_order(dimensions):
    n = len(dimensions) - 1
    dp = [[0] * n for _ in range(n)]

    for l in range(2, n + 1):
        for i in range(n - l + 1):
            j = i + l - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k+1][j] + dimensions[i] * dimensions[k+1] * dimensions[j+1]
                dp[i][j] = min(dp[i][j], cost)

    return dp[0][n-1]`,
    testCases: [
      { input: 'dimensions = [10, 20, 30, 40, 30]', isHidden: false, description: 'Four matrices' },
      { input: 'dimensions = [10, 20, 30]', isHidden: false, description: 'Two matrices' }
    ],
    hints: ['dp[i][j] = min cost to multiply matrices i through j', 'Try all split points k'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex02',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Edit Distance',
    difficulty: 3,
    description: 'Compute minimum edit distance between two strings using DP.',
    starterCode: `def edit_distance(str1, str2):
    """
    Compute minimum edit distance.

    Args:
        str1, str2: Input strings

    Returns:
        int: Minimum operations to transform str1 to str2
    """
    # Your code here
    pass`,
    solution: `def edit_distance(str1, str2):
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])

    return dp[m][n]`,
    testCases: [
      { input: 'str1 = "kitten", str2 = "sitting"', isHidden: false, description: 'Classic example' },
      { input: 'str1 = "horse", str2 = "ros"', isHidden: false, description: 'Multiple ops' }
    ],
    hints: ['dp[i][j] = edit distance of first i chars and first j chars', 'Three operations: insert, delete, substitute'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex03',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Longest Common Subsequence',
    difficulty: 2,
    description: 'Find the length of the longest common subsequence of two strings.',
    starterCode: `def lcs_length(str1, str2):
    """
    Find length of longest common subsequence.

    Args:
        str1, str2: Input strings

    Returns:
        int: Length of LCS
    """
    # Your code here
    pass`,
    solution: `def lcs_length(str1, str2):
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]`,
    testCases: [
      { input: 'str1 = "ABCBDAB", str2 = "BDCAB"', isHidden: false, description: 'LCS is BCAB or BDAB' },
      { input: 'str1 = "AGGTAB", str2 = "GXTXAYB"', isHidden: false, description: 'LCS is GTAB' }
    ],
    hints: ['If chars match, extend LCS', 'Otherwise take max of excluding either char'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex04',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Reconstruct LCS',
    difficulty: 3,
    description: 'Not just find the length, but reconstruct an actual LCS.',
    starterCode: `def lcs(str1, str2):
    """
    Find an actual longest common subsequence.

    Args:
        str1, str2: Input strings

    Returns:
        str: A longest common subsequence
    """
    # Your code here
    pass`,
    solution: `def lcs(str1, str2):
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    # Backtrack
    result = []
    i, j = m, n
    while i > 0 and j > 0:
        if str1[i-1] == str2[j-1]:
            result.append(str1[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1

    return ''.join(reversed(result))`,
    testCases: [
      { input: 'str1 = "ABCDGH", str2 = "AEDFHR"', isHidden: false, description: 'LCS is ADH' },
      { input: 'str1 = "ABC", str2 = "AC"', isHidden: false, description: 'Simple case' }
    ],
    hints: ['Build DP table first', 'Backtrack from dp[m][n] to reconstruct'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex05',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: '0/1 Knapsack',
    difficulty: 3,
    description: 'Solve the classic 0/1 knapsack problem using dynamic programming.',
    starterCode: `def knapsack(weights, values, capacity):
    """
    Find maximum value achievable within capacity.

    Args:
        weights: List of item weights
        values: List of item values
        capacity: Knapsack capacity

    Returns:
        int: Maximum value
    """
    # Your code here
    pass`,
    solution: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]  # Don't take item i
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1])

    return dp[n][capacity]`,
    testCases: [
      { input: 'weights = [2, 3, 4, 5], values = [3, 4, 5, 6], capacity = 8', isHidden: false, description: 'Standard knapsack' },
      { input: 'weights = [1, 2, 3], values = [10, 15, 40], capacity = 4', isHidden: false, description: 'Choose items 2 and 3' }
    ],
    hints: ['dp[i][w] = max value using first i items with capacity w', 'Either take or skip each item'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex06',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Knapsack Item Reconstruction',
    difficulty: 3,
    description: 'Find which items are selected in optimal knapsack solution.',
    starterCode: `def knapsack_items(weights, values, capacity):
    """
    Find items selected in optimal knapsack solution.

    Args:
        weights, values: Item weights and values
        capacity: Knapsack capacity

    Returns:
        list: Indices of selected items
    """
    # Your code here
    pass`,
    solution: `def knapsack_items(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1])

    # Backtrack
    selected = []
    w = capacity
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i-1][w]:
            selected.append(i - 1)
            w -= weights[i-1]

    return selected[::-1]`,
    testCases: [
      { input: 'weights = [2, 3, 4, 5], values = [3, 4, 5, 6], capacity = 8', isHidden: false, description: 'Find selected items' },
      { input: 'weights = [1, 2, 3], values = [6, 10, 12], capacity = 5', isHidden: false, description: 'Items 1 and 2' }
    ],
    hints: ['Build DP table first', 'Backtrack to find which items were taken'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex07',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Unbounded Knapsack',
    difficulty: 2,
    description: 'Solve knapsack where items can be used unlimited times.',
    starterCode: `def unbounded_knapsack(weights, values, capacity):
    """
    Knapsack with unlimited copies of each item.

    Args:
        weights, values: Item properties
        capacity: Knapsack capacity

    Returns:
        int: Maximum value
    """
    # Your code here
    pass`,
    solution: `def unbounded_knapsack(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for w in range(1, capacity + 1):
        for i in range(len(weights)):
            if weights[i] <= w:
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[capacity]`,
    testCases: [
      { input: 'weights = [1, 3, 4, 5], values = [10, 40, 50, 70], capacity = 8', isHidden: false, description: 'Can repeat items' },
      { input: 'weights = [2, 4], values = [5, 11], capacity = 10', isHidden: false, description: 'Choose wisely' }
    ],
    hints: ['1D DP suffices since items can repeat', 'dp[w] = max value with capacity w'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex08',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Coin Change Minimum Coins',
    difficulty: 2,
    description: 'Find minimum number of coins to make a given amount.',
    starterCode: `def coin_change(coins, amount):
    """
    Find minimum coins needed for amount.

    Args:
        coins: List of coin denominations
        amount: Target amount

    Returns:
        int: Minimum coins, or -1 if impossible
    """
    # Your code here
    pass`,
    solution: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for a in range(1, amount + 1):
        for coin in coins:
            if coin <= a and dp[a - coin] + 1 < dp[a]:
                dp[a] = dp[a - coin] + 1

    return dp[amount] if dp[amount] != float('inf') else -1`,
    testCases: [
      { input: 'coins = [1, 2, 5], amount = 11', isHidden: false, description: '5+5+1 = 3 coins' },
      { input: 'coins = [2], amount = 3', isHidden: false, description: 'Impossible' }
    ],
    hints: ['dp[a] = min coins for amount a', 'Try all coins that fit'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex09',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Coin Change Count Ways',
    difficulty: 2,
    description: 'Count the number of ways to make change for an amount.',
    starterCode: `def coin_change_ways(coins, amount):
    """
    Count ways to make change.

    Args:
        coins: Coin denominations
        amount: Target amount

    Returns:
        int: Number of distinct ways
    """
    # Your code here
    pass`,
    solution: `def coin_change_ways(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1

    for coin in coins:
        for a in range(coin, amount + 1):
            dp[a] += dp[a - coin]

    return dp[amount]`,
    testCases: [
      { input: 'coins = [1, 2, 5], amount = 5', isHidden: false, description: '4 ways: 5, 2+2+1, 2+1+1+1, 1+1+1+1+1' },
      { input: 'coins = [2], amount = 3', isHidden: false, description: '0 ways' }
    ],
    hints: ['Process coins one at a time to avoid counting duplicates', 'dp[a] = number of ways to make a'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex10',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'TSP via Bitmask DP',
    difficulty: 5,
    description: 'Solve TSP exactly using Held-Karp algorithm with bitmask DP.',
    starterCode: `def tsp_held_karp(dist):
    """
    Solve TSP using Held-Karp algorithm.

    Args:
        dist: Distance matrix (n x n)

    Returns:
        int: Minimum tour cost
    """
    # Your code here
    pass`,
    solution: `def tsp_held_karp(dist):
    n = len(dist)
    INF = float('inf')
    dp = [[INF] * n for _ in range(1 << n)]
    dp[1][0] = 0  # Start at city 0

    for mask in range(1 << n):
        for last in range(n):
            if not (mask & (1 << last)):
                continue
            if dp[mask][last] == INF:
                continue

            for next_city in range(n):
                if mask & (1 << next_city):
                    continue
                new_mask = mask | (1 << next_city)
                dp[new_mask][next_city] = min(dp[new_mask][next_city],
                                               dp[mask][last] + dist[last][next_city])

    full_mask = (1 << n) - 1
    result = min(dp[full_mask][last] + dist[last][0] for last in range(1, n))
    return result`,
    testCases: [
      { input: 'dist = [[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]]', isHidden: false, description: '4 cities' },
      { input: 'dist = [[0,1,2],[1,0,1],[2,1,0]]', isHidden: false, description: '3 cities - triangle' }
    ],
    hints: ['Bitmask represents visited cities', 'dp[mask][last] = min cost to visit cities in mask, ending at last'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex11',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Longest Increasing Subsequence',
    difficulty: 3,
    description: 'Find length of longest strictly increasing subsequence.',
    starterCode: `def lis_length(nums):
    """
    Find length of longest increasing subsequence.

    Args:
        nums: List of integers

    Returns:
        int: LIS length
    """
    # Your code here
    pass`,
    solution: `def lis_length(nums):
    if not nums:
        return 0

    n = len(nums)
    dp = [1] * n  # dp[i] = LIS ending at i

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)`,
    testCases: [
      { input: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]', isHidden: false, description: 'LIS is [2,3,7,101]' },
      { input: 'nums = [0, 1, 0, 3, 2, 3]', isHidden: false, description: 'LIS length 4' }
    ],
    hints: ['dp[i] = length of LIS ending at index i', 'O(n²) basic, O(n log n) with binary search'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex12',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'LIS O(n log n)',
    difficulty: 4,
    description: 'Implement the O(n log n) LIS algorithm using binary search.',
    starterCode: `def lis_fast(nums):
    """
    O(n log n) LIS algorithm.

    Args:
        nums: List of integers

    Returns:
        int: LIS length
    """
    # Your code here
    pass`,
    solution: `import bisect

def lis_fast(nums):
    if not nums:
        return 0

    tails = []  # tails[i] = smallest tail of LIS of length i+1

    for num in nums:
        pos = bisect.bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num

    return len(tails)`,
    testCases: [
      { input: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]', isHidden: false, description: 'Same result, faster' },
      { input: 'nums = [1, 3, 6, 7, 9, 4, 10, 5, 6]', isHidden: false, description: 'Longer sequence' }
    ],
    hints: ['Maintain array of smallest tails for each length', 'Use binary search to find position'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex13',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Optimal Binary Search Tree',
    difficulty: 4,
    description: 'Find the minimum cost BST given search frequencies.',
    starterCode: `def optimal_bst(keys, freq):
    """
    Find minimum expected search cost BST.

    Args:
        keys: Sorted keys
        freq: Search frequency for each key

    Returns:
        float: Minimum expected cost
    """
    # Your code here
    pass`,
    solution: `def optimal_bst(keys, freq):
    n = len(keys)
    dp = [[0] * n for _ in range(n)]
    prefix_sum = [0] * (n + 1)
    for i in range(n):
        prefix_sum[i+1] = prefix_sum[i] + freq[i]

    def sum_freq(i, j):
        return prefix_sum[j+1] - prefix_sum[i]

    for i in range(n):
        dp[i][i] = freq[i]

    for l in range(2, n + 1):
        for i in range(n - l + 1):
            j = i + l - 1
            dp[i][j] = float('inf')
            for r in range(i, j + 1):
                left = dp[i][r-1] if r > i else 0
                right = dp[r+1][j] if r < j else 0
                cost = left + right + sum_freq(i, j)
                dp[i][j] = min(dp[i][j], cost)

    return dp[0][n-1]`,
    testCases: [
      { input: 'keys = [10, 12, 20], freq = [34, 8, 50]', isHidden: false, description: 'Three keys' },
      { input: 'keys = [1, 2, 3, 4], freq = [1, 2, 3, 4]', isHidden: false, description: 'Four keys' }
    ],
    hints: ['Try each key as root', 'Cost = left subtree + right subtree + sum of frequencies'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex14',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Rod Cutting',
    difficulty: 2,
    description: 'Find maximum revenue from cutting a rod into pieces.',
    starterCode: `def rod_cutting(prices, n):
    """
    Find maximum revenue from rod of length n.

    Args:
        prices: prices[i] = price for rod of length i+1
        n: Rod length

    Returns:
        int: Maximum revenue
    """
    # Your code here
    pass`,
    solution: `def rod_cutting(prices, n):
    dp = [0] * (n + 1)

    for i in range(1, n + 1):
        for j in range(1, min(i, len(prices)) + 1):
            dp[i] = max(dp[i], prices[j-1] + dp[i-j])

    return dp[n]`,
    testCases: [
      { input: 'prices = [1, 5, 8, 9, 10, 17, 17, 20], n = 8', isHidden: false, description: 'Rod of length 8' },
      { input: 'prices = [2, 5, 7, 8], n = 5', isHidden: false, description: 'Rod of length 5' }
    ],
    hints: ['dp[i] = max revenue for rod of length i', 'Try all first cut positions'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex15',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Palindrome Partitioning',
    difficulty: 4,
    description: 'Find minimum cuts to partition string into palindromes.',
    starterCode: `def min_palindrome_cuts(s):
    """
    Minimum cuts to partition into palindromes.

    Args:
        s: Input string

    Returns:
        int: Minimum number of cuts
    """
    # Your code here
    pass`,
    solution: `def min_palindrome_cuts(s):
    n = len(s)
    if n <= 1:
        return 0

    # Precompute palindrome table
    is_palin = [[False] * n for _ in range(n)]
    for i in range(n):
        is_palin[i][i] = True
    for i in range(n - 1):
        is_palin[i][i+1] = (s[i] == s[i+1])
    for l in range(3, n + 1):
        for i in range(n - l + 1):
            j = i + l - 1
            is_palin[i][j] = (s[i] == s[j]) and is_palin[i+1][j-1]

    # dp[i] = min cuts for s[0..i]
    dp = list(range(n))
    for i in range(1, n):
        if is_palin[0][i]:
            dp[i] = 0
        else:
            for j in range(i):
                if is_palin[j+1][i]:
                    dp[i] = min(dp[i], dp[j] + 1)

    return dp[n-1]`,
    testCases: [
      { input: 's = "aab"', isHidden: false, description: 'Cut into "aa" and "b"' },
      { input: 's = "aabba"', isHidden: false, description: 'Already palindrome' }
    ],
    hints: ['Precompute all palindrome substrings', 'dp[i] = min cuts for prefix of length i+1'],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex16',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Egg Drop Problem',
    difficulty: 4,
    description: 'Find minimum trials to find critical floor with k eggs and n floors.',
    starterCode: `def egg_drop(eggs, floors):
    """
    Minimum trials for egg drop problem.

    Args:
        eggs: Number of eggs
        floors: Number of floors

    Returns:
        int: Minimum trials in worst case
    """
    # Your code here
    pass`,
    solution: `def egg_drop(eggs, floors):
    # dp[e][f] = min trials with e eggs and f floors
    dp = [[0] * (floors + 1) for _ in range(eggs + 1)]

    # Base cases
    for f in range(floors + 1):
        dp[1][f] = f  # 1 egg: must try linearly

    for e in range(1, eggs + 1):
        dp[e][0] = 0
        dp[e][1] = 1

    for e in range(2, eggs + 1):
        for f in range(2, floors + 1):
            dp[e][f] = float('inf')
            for x in range(1, f + 1):
                # Drop from floor x
                breaks = dp[e-1][x-1]      # Egg breaks: search below
                survives = dp[e][f-x]       # Egg survives: search above
                worst = 1 + max(breaks, survives)
                dp[e][f] = min(dp[e][f], worst)

    return dp[eggs][floors]`,
    testCases: [
      { input: 'eggs = 2, floors = 10', isHidden: false, description: 'Classic 2 eggs, 10 floors' },
      { input: 'eggs = 3, floors = 14', isHidden: false, description: '3 eggs, 14 floors' }
    ],
    hints: ['Try dropping from each floor', 'Take max of break/survive (worst case), min over choices'],
    language: 'python'
  }
];
