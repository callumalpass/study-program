import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'math102-e2',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Fibonacci with Memoization',
    difficulty: 2,
    description: 'Implement the Fibonacci sequence using memoization to avoid redundant calculations. The Fibonacci recurrence is F(n) = F(n-1) + F(n-2) with base cases F(0) = 0 and F(1) = 1. Without memoization, this has exponential time complexity. With memoization, achieve O(n) time complexity.',
    starterCode: 'def fibonacci(n, memo=None):\n    """Calculate the nth Fibonacci number using memoization.\n    \n    Args:\n        n: The index in the Fibonacci sequence\n        memo: Dictionary for memoization (default: None)\n        \n    Returns:\n        The nth Fibonacci number\n    """\n    # Your code here\n    pass',
    solution: 'def fibonacci(n, memo=None):\n    """Calculate the nth Fibonacci number using memoization.\n    \n    Args:\n        n: The index in the Fibonacci sequence\n        memo: Dictionary for memoization (default: None)\n        \n    Returns:\n        The nth Fibonacci number\n    """\n    if memo is None:\n        memo = {}\n    \n    if n in memo:\n        return memo[n]\n    \n    if n <= 1:\n        return n\n    \n    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)\n    return memo[n]',
    testCases: [
    ],
    hints: [
      'Initialize the memoization dictionary if it is None',
      'Check if the result for n is already in the memo dictionary before computing',
      'Store the computed result in memo before returning it',
      'The base cases are F(0) = 0 and F(1) = 1'
    ],
    language: 'python'
  },
  {
    id: 'math102-t2-ex02',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Iterative Fibonacci',
    difficulty: 1,
    description: 'Implement Fibonacci using iteration with O(n) time and O(1) space.',
    starterCode: 'def fib_iterative(n):\n    """Calculate nth Fibonacci number iteratively\n    \n    Args:\n        n: Index in sequence\n    Returns:\n        nth Fibonacci number\n    """\n    pass\n\nprint(fib_iterative(10))',
    solution: 'def fib_iterative(n):\n    """Calculate nth Fibonacci number iteratively\n    \n    Args:\n        n: Index in sequence\n    Returns:\n        nth Fibonacci number\n    """\n    if n <= 1:\n        return n\n    \n    prev2, prev1 = 0, 1\n    for _ in range(2, n + 1):\n        curr = prev1 + prev2\n        prev2, prev1 = prev1, curr\n    return prev1\n\nprint(fib_iterative(10))',
    testCases: [
    ],
    hints: ['Track only the last two values', 'Update in-place each iteration'],
    language: 'python'
  },
  {
    id: 'math102-t2-ex03',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Tower of Hanoi',
    difficulty: 2,
    description: 'Count the minimum moves to solve Tower of Hanoi with n disks. The recurrence is T(n) = 2T(n-1) + 1.',
    starterCode: 'def hanoi_moves(n):\n    """Calculate minimum moves to solve Tower of Hanoi\n    \n    Args:\n        n: Number of disks\n    Returns:\n        Minimum number of moves\n    """\n    pass\n\nprint(hanoi_moves(4))',
    solution: 'def hanoi_moves(n):\n    """Calculate minimum moves to solve Tower of Hanoi\n    \n    Args:\n        n: Number of disks\n    Returns:\n        Minimum number of moves\n    """\n    # T(n) = 2^n - 1 (closed form)\n    return 2**n - 1\n\nprint(hanoi_moves(4))',
    testCases: [
    ],
    hints: ['T(n) = 2T(n-1) + 1', 'Closed form is 2^n - 1'],
    language: 'python'
  },
  {
    id: 'math102-t2-ex04',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Staircase Climbing',
    difficulty: 2,
    description: 'Count ways to climb n stairs if you can take 1 or 2 steps at a time. This is essentially Fibonacci!',
    starterCode: 'def climb_stairs(n):\n    """Count ways to climb n stairs with 1 or 2 steps\n    \n    Args:\n        n: Number of stairs\n    Returns:\n        Number of ways\n    """\n    pass\n\nprint(climb_stairs(5))',
    solution: 'def climb_stairs(n):\n    """Count ways to climb n stairs with 1 or 2 steps\n    \n    Args:\n        n: Number of stairs\n    Returns:\n        Number of ways\n    """\n    if n <= 2:\n        return n\n    \n    prev2, prev1 = 1, 2\n    for _ in range(3, n + 1):\n        curr = prev1 + prev2\n        prev2, prev1 = prev1, curr\n    return prev1\n\nprint(climb_stairs(5))',
    testCases: [
    ],
    hints: ['Ways(n) = Ways(n-1) + Ways(n-2)', 'Base: Ways(1)=1, Ways(2)=2'],
    language: 'python'
  },
  {
    id: 'math102-t2-ex05',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Linear Recurrence Solver',
    difficulty: 3,
    description: 'Solve the recurrence a(n) = c1*a(n-1) + c2*a(n-2) with given base cases using matrix exponentiation for O(log n) complexity.',
    starterCode: 'def solve_recurrence(c1, c2, a0, a1, n):\n    """Solve linear recurrence a(n) = c1*a(n-1) + c2*a(n-2)\n    \n    Args:\n        c1, c2: Coefficients\n        a0, a1: Base cases a(0) and a(1)\n        n: Index to compute\n    Returns:\n        a(n)\n    """\n    pass\n\n# Fibonacci: a(n) = 1*a(n-1) + 1*a(n-2), a(0)=0, a(1)=1\nprint(solve_recurrence(1, 1, 0, 1, 10))',
    solution: 'def solve_recurrence(c1, c2, a0, a1, n):\n    """Solve linear recurrence a(n) = c1*a(n-1) + c2*a(n-2)\n    \n    Args:\n        c1, c2: Coefficients\n        a0, a1: Base cases a(0) and a(1)\n        n: Index to compute\n    Returns:\n        a(n)\n    """\n    if n == 0:\n        return a0\n    if n == 1:\n        return a1\n    \n    def matrix_mult(A, B):\n        return [\n            [A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]],\n            [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]]\n        ]\n    \n    def matrix_pow(M, p):\n        result = [[1, 0], [0, 1]]  # Identity\n        while p > 0:\n            if p % 2 == 1:\n                result = matrix_mult(result, M)\n            M = matrix_mult(M, M)\n            p //= 2\n        return result\n    \n    M = [[c1, c2], [1, 0]]\n    Mn = matrix_pow(M, n - 1)\n    return Mn[0][0] * a1 + Mn[0][1] * a0\n\nprint(solve_recurrence(1, 1, 0, 1, 10))',
    testCases: [
    ],
    hints: ['Use matrix [[c1, c2], [1, 0]]', 'Matrix exponentiation gives O(log n)'],
    language: 'python'
  },
  {
    id: 'math102-t2-ex06',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Catalan Numbers',
    difficulty: 3,
    description: 'Calculate the nth Catalan number. C(n) = C(n-1)*2*(2n-1)/(n+1) or C(n) = (2n)! / ((n+1)!*n!)',
    starterCode: 'def catalan(n):\n    """Calculate nth Catalan number\n    \n    Args:\n        n: Index (0-indexed)\n    Returns:\n        nth Catalan number\n    """\n    pass\n\nprint(catalan(5))',
    solution: 'def catalan(n):\n    """Calculate nth Catalan number\n    \n    Args:\n        n: Index (0-indexed)\n    Returns:\n        nth Catalan number\n    """\n    if n <= 1:\n        return 1\n    \n    cat = 1\n    for i in range(1, n + 1):\n        cat = cat * 2 * (2*i - 1) // (i + 1)\n    return cat\n\nprint(catalan(5))',
    testCases: [
    ],
    hints: ['C(0) = C(1) = 1', 'C(n) = C(n-1) * 2(2n-1) / (n+1)'],
    language: 'python'
  },
  {
    id: 'math102-t2-ex07',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Divide and Conquer Recurrence',
    difficulty: 4,
    description: 'Analyze a divide-and-conquer recurrence. Given T(n) = a*T(n/b) + f(n), use Master Theorem to determine complexity.',
    starterCode: 'def analyze_dc(a, b, f_degree):\n    """Determine complexity of T(n) = a*T(n/b) + n^f_degree\n    \n    Args:\n        a: Number of subproblems\n        b: Factor by which size decreases\n        f_degree: Degree of polynomial f(n) = n^f_degree\n    Returns:\n        String describing complexity\n    """\n    pass\n\nprint(analyze_dc(2, 2, 1))  # Merge sort',
    solution: 'import math\n\ndef analyze_dc(a, b, f_degree):\n    """Determine complexity of T(n) = a*T(n/b) + n^f_degree\n    \n    Args:\n        a: Number of subproblems\n        b: Factor by which size decreases\n        f_degree: Degree of polynomial f(n) = n^f_degree\n    Returns:\n        String describing complexity\n    """\n    log_b_a = math.log(a) / math.log(b)\n    \n    if f_degree < log_b_a:\n        return f"O(n^{log_b_a:.2f})"\n    elif abs(f_degree - log_b_a) < 0.01:\n        return f"O(n^{f_degree} log n)"\n    else:\n        return f"O(n^{f_degree})"\n\nprint(analyze_dc(2, 2, 1))',
    testCases: [
    ],
    hints: ['Compare f_degree with log_b(a)', 'Three cases of Master Theorem'],
    language: 'python'
  },
  {
    id: 'math102-t2-ex08',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Dynamic Programming: Coin Change',
    difficulty: 4,
    description: 'Find minimum coins needed to make amount n. Use the recurrence: dp[n] = min(dp[n-c] for each coin c) + 1.',
    starterCode: 'def min_coins(coins, amount):\n    """Find minimum coins to make amount\n    \n    Args:\n        coins: List of coin denominations\n        amount: Target amount\n    Returns:\n        Minimum coins needed, or -1 if impossible\n    """\n    pass\n\nprint(min_coins([1, 5, 10, 25], 37))',
    solution: 'def min_coins(coins, amount):\n    """Find minimum coins to make amount\n    \n    Args:\n        coins: List of coin denominations\n        amount: Target amount\n    Returns:\n        Minimum coins needed, or -1 if impossible\n    """\n    dp = [float(\'inf\')] * (amount + 1)\n    dp[0] = 0\n    \n    for i in range(1, amount + 1):\n        for coin in coins:\n            if coin <= i and dp[i - coin] + 1 < dp[i]:\n                dp[i] = dp[i - coin] + 1\n    \n    return dp[amount] if dp[amount] != float(\'inf\') else -1\n\nprint(min_coins([1, 5, 10, 25], 37))',
    testCases: [
    ],
    hints: ['dp[0] = 0', 'Build up from smaller amounts'],
    language: 'python'
  }
];
