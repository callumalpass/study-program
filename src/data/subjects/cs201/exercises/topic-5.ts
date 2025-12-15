import { CodingExercise } from '../../../../core/types';

export const cs201Topic5Exercises: CodingExercise[] = [
  {
    id: 'cs201-ex-5-1',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'Fibonacci Number - Memoization',
    description: `Implement a function to calculate the nth Fibonacci number using memoization (top-down dynamic programming).

The Fibonacci sequence is defined as:
- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2) for n > 1

Your function should use memoization to avoid redundant calculations.`,
    difficulty: 1,
    language: 'python',
    starterCode: `def fibonacci(n: int) -> int:
    """
    Calculate the nth Fibonacci number using memoization.

    Args:
        n: The position in the Fibonacci sequence (0-indexed)

    Returns:
        The nth Fibonacci number
    """
    # TODO: Implement memoization approach
    pass`,
    solution: `def fibonacci(n: int) -> int:
    """
    Calculate the nth Fibonacci number using memoization.

    Args:
        n: The position in the Fibonacci sequence (0-indexed)

    Returns:
        The nth Fibonacci number
    """
    memo = {}

    def fib_helper(n: int) -> int:
        if n in memo:
            return memo[n]

        if n <= 1:
            return n

        memo[n] = fib_helper(n - 1) + fib_helper(n - 2)
        return memo[n]

    return fib_helper(n)`,
    testCases: [
      { input: '0', expectedOutput: '0', isHidden: false, description: 'Test case' },
      { input: '1', expectedOutput: '1', isHidden: false, description: 'Test case' },
      { input: '5', expectedOutput: '5', isHidden: false, description: 'Test case' },
      { input: '10', expectedOutput: '55', isHidden: false, description: 'Test case' },
      { input: '20', expectedOutput: '6765', isHidden: false, description: 'Test case' },
      { input: '30', expectedOutput: '832040', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use a dictionary to store previously calculated Fibonacci numbers',
      'Create a helper function that checks the memo before calculating',
      'The base cases are F(0) = 0 and F(1) = 1'
    ]
  },
  {
    id: 'cs201-ex-5-2',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'Fibonacci Number - Tabulation',
    description: `Implement a function to calculate the nth Fibonacci number using tabulation (bottom-up dynamic programming).

Unlike memoization, tabulation builds the solution iteratively from the bottom up, storing all intermediate results in a table.`,
    difficulty: 1,
    language: 'python',
    starterCode: `def fibonacci_tabulation(n: int) -> int:
    """
    Calculate the nth Fibonacci number using tabulation.

    Args:
        n: The position in the Fibonacci sequence (0-indexed)

    Returns:
        The nth Fibonacci number
    """
    # TODO: Implement tabulation approach
    pass`,
    solution: `def fibonacci_tabulation(n: int) -> int:
    """
    Calculate the nth Fibonacci number using tabulation.

    Args:
        n: The position in the Fibonacci sequence (0-indexed)

    Returns:
        The nth Fibonacci number
    """
    if n <= 1:
        return n

    # Create a table to store Fibonacci numbers
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1

    # Fill the table bottom-up
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]`,
    testCases: [
      { input: '0', expectedOutput: '0', isHidden: false, description: 'Test case' },
      { input: '1', expectedOutput: '1', isHidden: false, description: 'Test case' },
      { input: '5', expectedOutput: '5', isHidden: false, description: 'Test case' },
      { input: '10', expectedOutput: '55', isHidden: false, description: 'Test case' },
      { input: '20', expectedOutput: '6765', isHidden: false, description: 'Test case' },
      { input: '30', expectedOutput: '832040', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Create an array to store Fibonacci numbers from 0 to n',
      'Initialize the first two values: dp[0] = 0 and dp[1] = 1',
      'Fill the array iteratively using the recurrence relation'
    ]
  },
  {
    id: 'cs201-ex-5-3',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'Fibonacci Number - Space Optimized',
    description: `Implement a space-optimized version of the Fibonacci calculation.

Since we only need the last two values to calculate the next Fibonacci number, we can reduce space complexity from O(n) to O(1).`,
    difficulty: 2,
    language: 'python',
    starterCode: `def fibonacci_optimized(n: int) -> int:
    """
    Calculate the nth Fibonacci number with O(1) space complexity.

    Args:
        n: The position in the Fibonacci sequence (0-indexed)

    Returns:
        The nth Fibonacci number
    """
    # TODO: Implement space-optimized approach
    pass`,
    solution: `def fibonacci_optimized(n: int) -> int:
    """
    Calculate the nth Fibonacci number with O(1) space complexity.

    Args:
        n: The position in the Fibonacci sequence (0-indexed)

    Returns:
        The nth Fibonacci number
    """
    if n <= 1:
        return n

    # Only keep track of the last two values
    prev2 = 0  # F(0)
    prev1 = 1  # F(1)

    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1`,
    testCases: [
      { input: '0', expectedOutput: '0', isHidden: false, description: 'Test case' },
      { input: '1', expectedOutput: '1', isHidden: false, description: 'Test case' },
      { input: '5', expectedOutput: '5', isHidden: false, description: 'Test case' },
      { input: '10', expectedOutput: '55', isHidden: false, description: 'Test case' },
      { input: '20', expectedOutput: '6765', isHidden: false, description: 'Test case' },
      { input: '30', expectedOutput: '832040', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'You only need two variables to track the previous two Fibonacci numbers',
      'Update these variables in each iteration',
      'This achieves O(1) space complexity instead of O(n)'
    ]
  },
  {
    id: 'cs201-ex-5-4',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'Fibonacci Variants - Tribonacci',
    description: `Implement the Tribonacci sequence, a variant of Fibonacci where each number is the sum of the previous three numbers.

The Tribonacci sequence is defined as:
- T(0) = 0
- T(1) = 1
- T(2) = 1
- T(n) = T(n-1) + T(n-2) + T(n-3) for n > 2

Use dynamic programming to solve this efficiently.`,
    difficulty: 2,
    language: 'python',
    starterCode: `def tribonacci(n: int) -> int:
    """
    Calculate the nth Tribonacci number.

    Args:
        n: The position in the Tribonacci sequence (0-indexed)

    Returns:
        The nth Tribonacci number
    """
    # TODO: Implement tribonacci with DP
    pass`,
    solution: `def tribonacci(n: int) -> int:
    """
    Calculate the nth Tribonacci number.

    Args:
        n: The position in the Tribonacci sequence (0-indexed)

    Returns:
        The nth Tribonacci number
    """
    if n == 0:
        return 0
    if n <= 2:
        return 1

    # Space-optimized approach: only keep last 3 values
    prev3 = 0  # T(0)
    prev2 = 1  # T(1)
    prev1 = 1  # T(2)

    for i in range(3, n + 1):
        current = prev1 + prev2 + prev3
        prev3 = prev2
        prev2 = prev1
        prev1 = current

    return prev1`,
    testCases: [
      { input: '0', expectedOutput: '0', isHidden: false, description: 'Test case' },
      { input: '1', expectedOutput: '1', isHidden: false, description: 'Test case' },
      { input: '2', expectedOutput: '1', isHidden: false, description: 'Test case' },
      { input: '4', expectedOutput: '4', isHidden: false, description: 'Test case' },
      { input: '10', expectedOutput: '149', isHidden: false, description: 'Test case' },
      { input: '25', expectedOutput: '1389537', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Similar to Fibonacci, but you need to track three previous values',
      'Base cases: T(0) = 0, T(1) = 1, T(2) = 1',
      'Each new value is the sum of the previous three'
    ]
  },
  {
    id: 'cs201-ex-5-5',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'Climbing Stairs',
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example:
- Input: n = 3
- Output: 3
- Explanation: There are three ways to climb to the top:
  1. 1 step + 1 step + 1 step
  2. 1 step + 2 steps
  3. 2 steps + 1 step`,
    difficulty: 2,
    language: 'python',
    starterCode: `def climb_stairs(n: int) -> int:
    """
    Calculate the number of distinct ways to climb n stairs.

    Args:
        n: The number of stairs

    Returns:
        The number of distinct ways to reach the top
    """
    # TODO: Implement using dynamic programming
    pass`,
    solution: `def climb_stairs(n: int) -> int:
    """
    Calculate the number of distinct ways to climb n stairs.

    Args:
        n: The number of stairs

    Returns:
        The number of distinct ways to reach the top
    """
    if n <= 2:
        return n

    # dp[i] represents the number of ways to reach step i
    # We can reach step i from step i-1 (take 1 step) or from step i-2 (take 2 steps)
    prev2 = 1  # ways to reach step 1
    prev1 = 2  # ways to reach step 2

    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1`,
    testCases: [
      { input: '1', expectedOutput: '1', isHidden: false, description: 'Test case' },
      { input: '2', expectedOutput: '2', isHidden: false, description: 'Test case' },
      { input: '3', expectedOutput: '3', isHidden: false, description: 'Test case' },
      { input: '5', expectedOutput: '8', isHidden: false, description: 'Test case' },
      { input: '10', expectedOutput: '89', isHidden: false, description: 'Test case' },
      { input: '20', expectedOutput: '10946', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'This is similar to the Fibonacci sequence',
      'To reach step n, you can come from step n-1 or step n-2',
      'dp[i] = dp[i-1] + dp[i-2]'
    ]
  },
  {
    id: 'cs201-ex-5-6',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'Min Cost Climbing Stairs',
    description: `You are given an array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the floor.

Example:
- Input: cost = [10, 15, 20]
- Output: 15
- Explanation: Start at index 1, pay 15, and climb two steps to reach the top.`,
    difficulty: 2,
    language: 'python',
    starterCode: `def min_cost_climbing_stairs(cost: list[int]) -> int:
    """
    Calculate the minimum cost to reach the top of the stairs.

    Args:
        cost: List of costs for each step

    Returns:
        The minimum cost to reach the top
    """
    # TODO: Implement using dynamic programming
    pass`,
    solution: `def min_cost_climbing_stairs(cost: list[int]) -> int:
    """
    Calculate the minimum cost to reach the top of the stairs.

    Args:
        cost: List of costs for each step

    Returns:
        The minimum cost to reach the top
    """
    n = len(cost)

    if n <= 2:
        return min(cost)

    # dp[i] represents the minimum cost to reach step i
    prev2 = cost[0]
    prev1 = cost[1]

    for i in range(2, n):
        current = cost[i] + min(prev1, prev2)
        prev2 = prev1
        prev1 = current

    # The top is one step beyond the last step
    # We can reach it from either the last or second-to-last step
    return min(prev1, prev2)`,
    testCases: [
      { input: '[10, 15, 20]', expectedOutput: '15', isHidden: false, description: 'Test case' },
      { input: '[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]', expectedOutput: '6', isHidden: false, description: 'Test case' },
      { input: '[10, 15]', expectedOutput: '10', isHidden: false, description: 'Test case' },
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '6', isHidden: false, description: 'Test case' },
      { input: '[0, 0, 0, 1]', expectedOutput: '0', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'dp[i] represents the minimum cost to reach step i',
      'At each step, you can come from the previous step or two steps back',
      'The final answer is the minimum of reaching the last two steps'
    ]
  },
  {
    id: 'cs201-ex-5-7',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'House Robber',
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed.

The constraint is that adjacent houses have security systems connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an array of non-negative integers representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Example:
- Input: nums = [2, 7, 9, 3, 1]
- Output: 12
- Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total = 2 + 9 + 1 = 12.`,
    difficulty: 3,
    language: 'python',
    starterCode: `def rob(nums: list[int]) -> int:
    """
    Calculate the maximum amount of money that can be robbed.

    Args:
        nums: List of money in each house

    Returns:
        The maximum amount that can be robbed
    """
    # TODO: Implement using dynamic programming
    pass`,
    solution: `def rob(nums: list[int]) -> int:
    """
    Calculate the maximum amount of money that can be robbed.

    Args:
        nums: List of money in each house

    Returns:
        The maximum amount that can be robbed
    """
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    # dp[i] represents the maximum money that can be robbed up to house i
    # At each house, we have two choices:
    # 1. Rob this house + max money from houses up to i-2
    # 2. Don't rob this house, keep max money from houses up to i-1

    prev2 = nums[0]
    prev1 = max(nums[0], nums[1])

    for i in range(2, len(nums)):
        current = max(prev1, nums[i] + prev2)
        prev2 = prev1
        prev1 = current

    return prev1`,
    testCases: [
      { input: '[1, 2, 3, 1]', expectedOutput: '4', isHidden: false, description: 'Test case' },
      { input: '[2, 7, 9, 3, 1]', expectedOutput: '12', isHidden: false, description: 'Test case' },
      { input: '[5]', expectedOutput: '5', isHidden: false, description: 'Test case' },
      { input: '[2, 1, 1, 2]', expectedOutput: '4', isHidden: false, description: 'Test case' },
      { input: '[1, 3, 1, 3, 100]', expectedOutput: '103', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'At each house, you have two choices: rob it or skip it',
      'If you rob house i, you cannot rob house i-1',
      'dp[i] = max(dp[i-1], nums[i] + dp[i-2])'
    ]
  },
  {
    id: 'cs201-ex-5-8',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'House Robber II - Circular',
    description: `This is an extension of the House Robber problem. All houses are arranged in a circle, meaning the first house is the neighbor of the last one.

You cannot rob both the first and last house. Given an array of non-negative integers representing the amount of money of each house, return the maximum amount of money you can rob.

Example:
- Input: nums = [2, 3, 2]
- Output: 3
- Explanation: You cannot rob house 1 (money = 2) and house 3 (money = 2), since they are adjacent. Rob house 2 (money = 3).`,
    difficulty: 3,
    language: 'python',
    starterCode: `def rob_circular(nums: list[int]) -> int:
    """
    Calculate the maximum amount of money that can be robbed from circular houses.

    Args:
        nums: List of money in each house

    Returns:
        The maximum amount that can be robbed
    """
    # TODO: Implement using dynamic programming
    pass`,
    solution: `def rob_circular(nums: list[int]) -> int:
    """
    Calculate the maximum amount of money that can be robbed from circular houses.

    Args:
        nums: List of money in each house

    Returns:
        The maximum amount that can be robbed
    """
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    if len(nums) == 2:
        return max(nums[0], nums[1])

    def rob_linear(houses):
        if not houses:
            return 0
        if len(houses) == 1:
            return houses[0]

        prev2 = houses[0]
        prev1 = max(houses[0], houses[1])

        for i in range(2, len(houses)):
            current = max(prev1, houses[i] + prev2)
            prev2 = prev1
            prev1 = current

        return prev1

    # Case 1: Rob houses from 0 to n-2 (exclude last house)
    # Case 2: Rob houses from 1 to n-1 (exclude first house)
    return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))`,
    testCases: [
      { input: '[2, 3, 2]', expectedOutput: '3', isHidden: false, description: 'Test case' },
      { input: '[1, 2, 3, 1]', expectedOutput: '4', isHidden: false, description: 'Test case' },
      { input: '[1, 2, 3]', expectedOutput: '3', isHidden: false, description: 'Test case' },
      { input: '[5, 1, 1, 5]', expectedOutput: '5', isHidden: false, description: 'Test case' },
      { input: '[1, 1, 1, 2]', expectedOutput: '3', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Since houses are in a circle, you cannot rob both first and last house',
      'Break the problem into two cases: exclude first house OR exclude last house',
      'Run the linear House Robber algorithm on both cases and take the maximum'
    ]
  },
  {
    id: 'cs201-ex-5-9',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'Coin Change - Minimum Coins',
    description: `You are given an array of coin denominations and a target amount. Return the fewest number of coins needed to make up that amount. If the amount cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Example:
- Input: coins = [1, 2, 5], amount = 11
- Output: 3
- Explanation: 11 = 5 + 5 + 1 (3 coins)`,
    difficulty: 3,
    language: 'python',
    starterCode: `def coin_change(coins: list[int], amount: int) -> int:
    """
    Find the minimum number of coins needed to make the amount.

    Args:
        coins: List of coin denominations
        amount: Target amount

    Returns:
        Minimum number of coins needed, or -1 if impossible
    """
    # TODO: Implement using dynamic programming
    pass`,
    solution: `def coin_change(coins: list[int], amount: int) -> int:
    """
    Find the minimum number of coins needed to make the amount.

    Args:
        coins: List of coin denominations
        amount: Target amount

    Returns:
        Minimum number of coins needed, or -1 if impossible
    """
    # dp[i] represents the minimum number of coins needed to make amount i
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # 0 coins needed to make amount 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1`,
    testCases: [
      { input: '[1, 2, 5], 11', expectedOutput: '3', isHidden: false, description: 'Test case' },
      { input: '[2], 3', expectedOutput: '-1', isHidden: false, description: 'Test case' },
      { input: '[1], 0', expectedOutput: '0', isHidden: false, description: 'Test case' },
      { input: '[1, 3, 4], 6', expectedOutput: '2', isHidden: false, description: 'Test case' },
      { input: '[1, 5, 10, 25], 63', expectedOutput: '6', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'dp[i] represents the minimum coins needed to make amount i',
      'For each amount, try using each coin and take the minimum',
      'dp[i] = min(dp[i], dp[i - coin] + 1) for each coin'
    ]
  },
  {
    id: 'cs201-ex-5-10',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'Coin Change - Number of Ways',
    description: `You are given an array of coin denominations and a target amount. Return the number of combinations that make up that amount.

You may assume that you have an infinite number of each kind of coin.

Example:
- Input: coins = [1, 2, 5], amount = 5
- Output: 4
- Explanation: There are four ways to make amount 5:
  - 5 = 5
  - 5 = 2 + 2 + 1
  - 5 = 2 + 1 + 1 + 1
  - 5 = 1 + 1 + 1 + 1 + 1`,
    difficulty: 3,
    language: 'python',
    starterCode: `def coin_change_ways(coins: list[int], amount: int) -> int:
    """
    Find the number of ways to make the amount using the coins.

    Args:
        coins: List of coin denominations
        amount: Target amount

    Returns:
        Number of combinations that make up the amount
    """
    # TODO: Implement using dynamic programming
    pass`,
    solution: `def coin_change_ways(coins: list[int], amount: int) -> int:
    """
    Find the number of ways to make the amount using the coins.

    Args:
        coins: List of coin denominations
        amount: Target amount

    Returns:
        Number of combinations that make up the amount
    """
    # dp[i] represents the number of ways to make amount i
    dp = [0] * (amount + 1)
    dp[0] = 1  # One way to make amount 0: use no coins

    # Process each coin one at a time to avoid counting permutations
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]

    return dp[amount]`,
    testCases: [
      { input: '[1, 2, 5], 5', expectedOutput: '4', isHidden: false, description: 'Test case' },
      { input: '[2], 3', expectedOutput: '0', isHidden: false, description: 'Test case' },
      { input: '[10], 10', expectedOutput: '1', isHidden: false, description: 'Test case' },
      { input: '[1, 2, 3], 4', expectedOutput: '4', isHidden: false, description: 'Test case' },
      { input: '[1, 5, 10, 25], 100', expectedOutput: '242', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'This counts combinations, not permutations',
      'Process coins one at a time to avoid counting duplicates',
      'dp[i] += dp[i - coin] for each coin and amount'
    ]
  },
  {
    id: 'cs201-ex-5-11',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'Rod Cutting Problem',
    description: `Given a rod of length n and an array of prices where prices[i] denotes the price of a rod of length i+1, determine the maximum value obtainable by cutting up the rod and selling the pieces.

Example:
- Input: prices = [1, 5, 8, 9, 10, 17, 17, 20], length = 4
- Output: 10
- Explanation: Maximum value is 10, obtained by cutting the rod into two pieces of length 2 each (5 + 5 = 10).`,
    difficulty: 3,
    language: 'python',
    starterCode: `def rod_cutting(prices: list[int], length: int) -> int:
    """
    Find the maximum value obtainable by cutting up the rod.

    Args:
        prices: List where prices[i] is the price of a rod of length i+1
        length: The length of the rod

    Returns:
        Maximum value obtainable
    """
    # TODO: Implement using dynamic programming
    pass`,
    solution: `def rod_cutting(prices: list[int], length: int) -> int:
    """
    Find the maximum value obtainable by cutting up the rod.

    Args:
        prices: List where prices[i] is the price of a rod of length i+1
        length: The length of the rod

    Returns:
        Maximum value obtainable
    """
    # dp[i] represents the maximum value obtainable for a rod of length i
    dp = [0] * (length + 1)

    for i in range(1, length + 1):
        max_value = 0
        # Try all possible first cuts
        for j in range(i):
            # j+1 is the length of the first piece (prices[j])
            # i-j-1 is the remaining length
            max_value = max(max_value, prices[j] + dp[i - j - 1])
        dp[i] = max_value

    return dp[length]`,
    testCases: [
      { input: '[1, 5, 8, 9, 10, 17, 17, 20], 4', expectedOutput: '10', isHidden: false, description: 'Test case' },
      { input: '[3, 5, 8, 9, 10, 17, 17, 20], 8', expectedOutput: '24', isHidden: false, description: 'Test case' },
      { input: '[1, 5, 8, 9], 2', expectedOutput: '5', isHidden: false, description: 'Test case' },
      { input: '[2, 5, 7, 8, 10], 5', expectedOutput: '12', isHidden: false, description: 'Test case' },
      { input: '[1, 1, 1, 1, 1], 5', expectedOutput: '5', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'dp[i] represents the maximum value for a rod of length i',
      'Try all possible positions for the first cut',
      'For each cut at position j, the value is prices[j] + dp[remaining_length]'
    ]
  },
  {
    id: 'cs201-ex-5-12',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'Rod Cutting with Costs',
    description: `This is an extension of the rod cutting problem. Now, each cut has a cost associated with it.

Given a rod of length n, an array of prices, and a cost per cut, determine the maximum profit obtainable by cutting up the rod and selling the pieces (profit = total price - cutting costs).

Example:
- Input: prices = [1, 5, 8, 9], length = 4, cost_per_cut = 1
- Output: 8
- Explanation: Cut into two pieces of length 2 each. Value = 5 + 5 = 10, Cost = 1 cut = 1, Profit = 9. But keeping length 4 gives 9 with no cuts. Best is actually two length-2 pieces: 5+5-1=9, or length 1 and 3: 1+8-1=8.`,
    difficulty: 4,
    language: 'python',
    starterCode: `def rod_cutting_with_cost(prices: list[int], length: int, cost_per_cut: int) -> int:
    """
    Find the maximum profit obtainable by cutting up the rod.

    Args:
        prices: List where prices[i] is the price of a rod of length i+1
        length: The length of the rod
        cost_per_cut: The cost of making each cut

    Returns:
        Maximum profit obtainable
    """
    # TODO: Implement using dynamic programming
    pass`,
    solution: `def rod_cutting_with_cost(prices: list[int], length: int, cost_per_cut: int) -> int:
    """
    Find the maximum profit obtainable by cutting up the rod.

    Args:
        prices: List where prices[i] is the price of a rod of length i+1
        length: The length of the rod
        cost_per_cut: The cost of making each cut

    Returns:
        Maximum profit obtainable
    """
    # dp[i] represents the maximum profit for a rod of length i
    dp = [0] * (length + 1)

    for i in range(1, length + 1):
        # Option 1: Don't cut at all
        max_profit = prices[i - 1] if i <= len(prices) else 0

        # Option 2: Make cuts
        for j in range(1, i):
            # Cut into piece of length j and remaining length i-j
            # This costs one cut
            profit = prices[j - 1] + dp[i - j] - cost_per_cut
            max_profit = max(max_profit, profit)

        dp[i] = max_profit

    return dp[length]`,
    testCases: [
      { input: '[1, 5, 8, 9], 4, 1', expectedOutput: '8', isHidden: false, description: 'Test case' },
      { input: '[1, 5, 8, 9, 10, 17, 17, 20], 8, 2', expectedOutput: '18', isHidden: false, description: 'Test case' },
      { input: '[3, 5, 8, 9], 3, 0', expectedOutput: '8', isHidden: false, description: 'Test case' },
      { input: '[2, 5, 7, 8], 4, 3', expectedOutput: '8', isHidden: false, description: 'Test case' },
      { input: '[1, 5, 8, 9], 2, 10', expectedOutput: '5', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Consider the option of not making any cuts at all',
      'When making a cut, subtract the cost_per_cut from the profit',
      'Compare no-cut profit with all possible cutting strategies'
    ]
  },
  {
    id: 'cs201-ex-5-13',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'Longest Common Subsequence',
    description: `Given two strings text1 and text2, return the length of their longest common subsequence (LCS). A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

If there is no common subsequence, return 0.

Example:
- Input: text1 = "abcde", text2 = "ace"
- Output: 3
- Explanation: The longest common subsequence is "ace" with length 3.`,
    difficulty: 4,
    language: 'python',
    starterCode: `def longest_common_subsequence(text1: str, text2: str) -> int:
    """
    Find the length of the longest common subsequence.

    Args:
        text1: First string
        text2: Second string

    Returns:
        Length of the longest common subsequence
    """
    # TODO: Implement using dynamic programming
    pass`,
    solution: `def longest_common_subsequence(text1: str, text2: str) -> int:
    """
    Find the length of the longest common subsequence.

    Args:
        text1: First string
        text2: Second string

    Returns:
        Length of the longest common subsequence
    """
    m, n = len(text1), len(text2)

    # dp[i][j] represents LCS length of text1[0:i] and text2[0:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                # Characters match: add 1 to LCS of previous strings
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                # Characters don't match: take max of excluding one character
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]`,
    testCases: [
      { input: '"abcde", "ace"', expectedOutput: '3', isHidden: false, description: 'Test case' },
      { input: '"abc", "abc"', expectedOutput: '3', isHidden: false, description: 'Test case' },
      { input: '"abc", "def"', expectedOutput: '0', isHidden: false, description: 'Test case' },
      { input: '"aggtab", "gxtxayb"', expectedOutput: '4', isHidden: false, description: 'Test case' },
      { input: '"programming", "gaming"', expectedOutput: '6', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use a 2D DP table where dp[i][j] represents LCS of text1[0:i] and text2[0:j]',
      'If characters match, dp[i][j] = dp[i-1][j-1] + 1',
      'If they don\'t match, dp[i][j] = max(dp[i-1][j], dp[i][j-1])'
    ]
  },
  {
    id: 'cs201-ex-5-14',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: 'Longest Common Subsequence - Reconstruction',
    description: `Given two strings, not only find the length of their longest common subsequence, but also return the actual subsequence string.

Example:
- Input: text1 = "abcde", text2 = "ace"
- Output: "ace"
- Explanation: The longest common subsequence is "ace".`,
    difficulty: 4,
    language: 'python',
    starterCode: `def lcs_string(text1: str, text2: str) -> str:
    """
    Find the longest common subsequence string.

    Args:
        text1: First string
        text2: Second string

    Returns:
        The longest common subsequence as a string
    """
    # TODO: Implement using dynamic programming with backtracking
    pass`,
    solution: `def lcs_string(text1: str, text2: str) -> str:
    """
    Find the longest common subsequence string.

    Args:
        text1: First string
        text2: Second string

    Returns:
        The longest common subsequence as a string
    """
    m, n = len(text1), len(text2)

    # Build the DP table
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Backtrack to reconstruct the LCS
    lcs = []
    i, j = m, n

    while i > 0 and j > 0:
        if text1[i - 1] == text2[j - 1]:
            # This character is part of LCS
            lcs.append(text1[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1

    # Reverse since we built it backwards
    return ''.join(reversed(lcs))`,
    testCases: [
      { input: '"abcde", "ace"', expectedOutput: '"ace"', isHidden: false, description: 'Test case' },
      { input: '"abc", "abc"', expectedOutput: '"abc"', isHidden: false, description: 'Test case' },
      { input: '"abc", "def"', expectedOutput: '""', isHidden: false, description: 'Test case' },
      { input: '"aggtab", "gxtxayb"', expectedOutput: '"gtab"', isHidden: false, description: 'Test case' },
      { input: '"AGGTAB", "GXTXAYB"', expectedOutput: '"GTAB"', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'First build the DP table as in the standard LCS problem',
      'Then backtrack from dp[m][n] to reconstruct the sequence',
      'When characters match, include that character and move diagonally',
      'When they don\'t match, move in the direction of the larger value'
    ]
  },
  {
    id: 'cs201-ex-5-15',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: '0/1 Knapsack Problem',
    description: `Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack.

Each item can be included at most once (0/1 choice). You cannot break an item.

Example:
- Input: values = [60, 100, 120], weights = [10, 20, 30], capacity = 50
- Output: 220
- Explanation: Take items with values 100 and 120 (weights 20 + 30 = 50).`,
    difficulty: 4,
    language: 'python',
    starterCode: `def knapsack_01(values: list[int], weights: list[int], capacity: int) -> int:
    """
    Solve the 0/1 knapsack problem.

    Args:
        values: List of values for each item
        weights: List of weights for each item
        capacity: Maximum weight capacity of the knapsack

    Returns:
        Maximum value that can be obtained
    """
    # TODO: Implement using dynamic programming
    pass`,
    solution: `def knapsack_01(values: list[int], weights: list[int], capacity: int) -> int:
    """
    Solve the 0/1 knapsack problem.

    Args:
        values: List of values for each item
        weights: List of weights for each item
        capacity: Maximum weight capacity of the knapsack

    Returns:
        Maximum value that can be obtained
    """
    n = len(values)

    # dp[i][w] represents max value using first i items with capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Option 1: Don't include item i-1
            dp[i][w] = dp[i - 1][w]

            # Option 2: Include item i-1 (if it fits)
            if weights[i - 1] <= w:
                include_value = values[i - 1] + dp[i - 1][w - weights[i - 1]]
                dp[i][w] = max(dp[i][w], include_value)

    return dp[n][capacity]`,
    testCases: [
      { input: '[60, 100, 120], [10, 20, 30], 50', expectedOutput: '220', isHidden: false, description: 'Test case' },
      { input: '[10, 20, 30], [1, 2, 3], 5', expectedOutput: '50', isHidden: false, description: 'Test case' },
      { input: '[1, 4, 5, 7], [1, 3, 4, 5], 7', expectedOutput: '9', isHidden: false, description: 'Test case' },
      { input: '[10], [5], 10', expectedOutput: '10', isHidden: false, description: 'Test case' },
      { input: '[10, 20, 30], [5, 10, 15], 10', expectedOutput: '30', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use a 2D DP table where dp[i][w] represents max value with first i items and capacity w',
      'For each item, you have two choices: include it or exclude it',
      'If including item i, add its value to dp[i-1][w-weight[i]]'
    ]
  },
  {
    id: 'cs201-ex-5-16',
    subjectId: 'cs201',
    topicId: 'cs201-5',
    title: '0/1 Knapsack - Space Optimized',
    description: `Solve the 0/1 knapsack problem with space optimization. Instead of using a 2D table, optimize to use only O(W) space where W is the capacity.

This is the same problem as the standard 0/1 knapsack, but with better space complexity.

Example:
- Input: values = [60, 100, 120], weights = [10, 20, 30], capacity = 50
- Output: 220`,
    difficulty: 5,
    language: 'python',
    starterCode: `def knapsack_optimized(values: list[int], weights: list[int], capacity: int) -> int:
    """
    Solve the 0/1 knapsack problem with O(W) space complexity.

    Args:
        values: List of values for each item
        weights: List of weights for each item
        capacity: Maximum weight capacity of the knapsack

    Returns:
        Maximum value that can be obtained
    """
    # TODO: Implement space-optimized version
    pass`,
    solution: `def knapsack_optimized(values: list[int], weights: list[int], capacity: int) -> int:
    """
    Solve the 0/1 knapsack problem with O(W) space complexity.

    Args:
        values: List of values for each item
        weights: List of weights for each item
        capacity: Maximum weight capacity of the knapsack

    Returns:
        Maximum value that can be obtained
    """
    n = len(values)

    # Use a 1D array instead of 2D
    # dp[w] represents max value with capacity w
    dp = [0] * (capacity + 1)

    for i in range(n):
        # Traverse from right to left to avoid using updated values
        for w in range(capacity, weights[i] - 1, -1):
            # Choose max of: not including item i, or including item i
            dp[w] = max(dp[w], values[i] + dp[w - weights[i]])

    return dp[capacity]`,
    testCases: [
      { input: '[60, 100, 120], [10, 20, 30], 50', expectedOutput: '220', isHidden: false, description: 'Test case' },
      { input: '[10, 20, 30], [1, 2, 3], 5', expectedOutput: '50', isHidden: false, description: 'Test case' },
      { input: '[1, 4, 5, 7], [1, 3, 4, 5], 7', expectedOutput: '9', isHidden: false, description: 'Test case' },
      { input: '[10], [5], 10', expectedOutput: '10', isHidden: false, description: 'Test case' },
      { input: '[10, 20, 30], [5, 10, 15], 10', expectedOutput: '30', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use a 1D array instead of 2D to save space',
      'Traverse the capacity from right to left to avoid overwriting values you still need',
      'This achieves O(W) space instead of O(nW)'
    ]
  }
];
