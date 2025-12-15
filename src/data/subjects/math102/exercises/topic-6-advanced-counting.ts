import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'math102-t6-ex01',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Generating Function for Coin Change',
    difficulty: 2,
    description: 'Use generating functions to count the number of ways to make change for n cents using coins of denominations 1, 5, and 10 cents.',
    starterCode: 'def coin_change_ways(n):\n    """Count ways to make n cents using 1, 5, 10 cent coins\n    \n    Args:\n        n: Target amount in cents\n    Returns:\n        Number of ways to make change\n    """\n    pass\n\nprint(coin_change_ways(20))',
    solution: 'def coin_change_ways(n):\n    """Count ways to make n cents using 1, 5, 10 cent coins\n    \n    Args:\n        n: Target amount in cents\n    Returns:\n        Number of ways to make change\n    """\n    # Dynamic programming approach\n    ways = [0] * (n + 1)\n    ways[0] = 1\n    \n    coins = [1, 5, 10]\n    for coin in coins:\n        for i in range(coin, n + 1):\n            ways[i] += ways[i - coin]\n    \n    return ways[n]\n\nprint(coin_change_ways(20))',
    testCases: [
      { input: '20', isHidden: false, description: '20 cents: 9 ways' },
      { input: '10', isHidden: false, description: '10 cents: 4 ways' },
      { input: '25', isHidden: true, description: '25 cents' },
      { input: '0', isHidden: true, description: '0 cents: 1 way' }
    ],
    hints: ['Use dynamic programming', 'Process each coin denomination in order', 'ways[i] accumulates from ways[i-coin]'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex02',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Integer Partitions',
    difficulty: 2,
    description: 'Count the number of ways to partition integer n into positive integers (order doesn\'t matter).',
    starterCode: 'def partition_count(n):\n    """Count integer partitions of n\n    \n    Args:\n        n: Positive integer\n    Returns:\n        Number of partitions\n    """\n    pass\n\nprint(partition_count(5))',
    solution: 'def partition_count(n):\n    """Count integer partitions of n\n    \n    Args:\n        n: Positive integer\n    Returns:\n        Number of partitions\n    """\n    # dp[i][j] = partitions of i using numbers <= j\n    dp = [[0] * (n + 1) for _ in range(n + 1)]\n    \n    # Base case\n    for j in range(n + 1):\n        dp[0][j] = 1\n    \n    for i in range(1, n + 1):\n        for j in range(1, n + 1):\n            dp[i][j] = dp[i][j-1]  # Don\'t use j\n            if i >= j:\n                dp[i][j] += dp[i-j][j]  # Use at least one j\n    \n    return dp[n][n]\n\nprint(partition_count(5))',
    testCases: [
      { input: '5', isHidden: false, description: 'p(5) = 7' },
      { input: '4', isHidden: false, description: 'p(4) = 5' },
      { input: '10', isHidden: true, description: 'p(10) = 42' },
      { input: '1', isHidden: true, description: 'p(1) = 1' }
    ],
    hints: ['Use DP with max element constraint', 'dp[n][k] = partitions of n with parts ≤ k'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex03',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Stirling Numbers of the Second Kind',
    difficulty: 3,
    description: 'Calculate S(n,k), the number of ways to partition n distinct objects into k non-empty subsets.',
    starterCode: 'def stirling_second(n, k):\n    """Calculate S(n,k)\n    \n    Args:\n        n: Number of objects\n        k: Number of non-empty subsets\n    Returns:\n        Stirling number S(n,k)\n    """\n    pass\n\nprint(stirling_second(5, 2))',
    solution: 'def stirling_second(n, k):\n    """Calculate S(n,k)\n    \n    Args:\n        n: Number of objects\n        k: Number of non-empty subsets\n    Returns:\n        Stirling number S(n,k)\n    """\n    if n == 0 and k == 0:\n        return 1\n    if n == 0 or k == 0:\n        return 0\n    if k > n:\n        return 0\n    \n    # Use DP: S(n,k) = k*S(n-1,k) + S(n-1,k-1)\n    dp = [[0] * (k + 1) for _ in range(n + 1)]\n    dp[0][0] = 1\n    \n    for i in range(1, n + 1):\n        for j in range(1, min(i, k) + 1):\n            dp[i][j] = j * dp[i-1][j] + dp[i-1][j-1]\n    \n    return dp[n][k]\n\nprint(stirling_second(5, 2))',
    testCases: [
      { input: '5, 2', isHidden: false, description: 'S(5,2) = 15' },
      { input: '4, 3', isHidden: false, description: 'S(4,3) = 6' },
      { input: '6, 3', isHidden: true, description: 'S(6,3) = 90' },
      { input: '5, 5', isHidden: true, description: 'S(n,n) = 1' }
    ],
    hints: ['Recurrence: S(n,k) = k·S(n-1,k) + S(n-1,k-1)', 'Base cases: S(0,0)=1, S(n,0)=0, S(0,k)=0'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex04',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Bell Numbers',
    difficulty: 3,
    description: 'Calculate B(n), the number of ways to partition a set of n elements (sum of all Stirling numbers S(n,k)).',
    starterCode: 'def bell_number(n):\n    """Calculate B(n) = sum of S(n,k) for k=0 to n\n    \n    Args:\n        n: Number of elements\n    Returns:\n        Bell number B(n)\n    """\n    pass\n\nprint(bell_number(5))',
    solution: 'def bell_number(n):\n    """Calculate B(n) = sum of S(n,k) for k=0 to n\n    \n    Args:\n        n: Number of elements\n    Returns:\n        Bell number B(n)\n    """\n    # Use Bell triangle\n    bell = [[0] * (n + 1) for _ in range(n + 1)]\n    bell[0][0] = 1\n    \n    for i in range(1, n + 1):\n        bell[i][0] = bell[i-1][i-1]\n        for j in range(1, i + 1):\n            bell[i][j] = bell[i-1][j-1] + bell[i][j-1]\n    \n    return bell[n][0]\n\nprint(bell_number(5))',
    testCases: [
      { input: '5', isHidden: false, description: 'B(5) = 52' },
      { input: '4', isHidden: false, description: 'B(4) = 15' },
      { input: '6', isHidden: true, description: 'B(6) = 203' },
      { input: '0', isHidden: true, description: 'B(0) = 1' }
    ],
    hints: ['Use Bell triangle', 'Each row starts with last element of previous row', 'Each element = sum of left and upper-left'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex05',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Stirling Numbers of the First Kind',
    difficulty: 4,
    description: 'Calculate s(n,k), the (unsigned) Stirling number of the first kind, representing the number of permutations of n elements with k cycles.',
    starterCode: 'def stirling_first(n, k):\n    """Calculate unsigned s(n,k)\n    \n    Args:\n        n: Number of elements\n        k: Number of cycles\n    Returns:\n        Unsigned Stirling number s(n,k)\n    """\n    pass\n\nprint(stirling_first(5, 2))',
    solution: 'def stirling_first(n, k):\n    """Calculate unsigned s(n,k)\n    \n    Args:\n        n: Number of elements\n        k: Number of cycles\n    Returns:\n        Unsigned Stirling number s(n,k)\n    """\n    if n == 0 and k == 0:\n        return 1\n    if n == 0 or k == 0:\n        return 0\n    if k > n:\n        return 0\n    \n    # Recurrence: s(n,k) = (n-1)*s(n-1,k) + s(n-1,k-1)\n    dp = [[0] * (k + 1) for _ in range(n + 1)]\n    dp[0][0] = 1\n    \n    for i in range(1, n + 1):\n        for j in range(1, min(i, k) + 1):\n            dp[i][j] = (i - 1) * dp[i-1][j] + dp[i-1][j-1]\n    \n    return dp[n][k]\n\nprint(stirling_first(5, 2))',
    testCases: [
      { input: '5, 2', isHidden: false, description: 's(5,2) = 50' },
      { input: '4, 3', isHidden: false, description: 's(4,3) = 11' },
      { input: '5, 1', isHidden: true, description: 's(n,1) = (n-1)!' },
      { input: '4, 4', isHidden: true, description: 's(n,n) = 1' }
    ],
    hints: ['Recurrence: s(n,k) = (n-1)·s(n-1,k) + s(n-1,k-1)', 'Similar to Stirling second kind but different coefficient'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex06',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Partition with Distinct Parts',
    difficulty: 3,
    description: 'Count partitions of n where all parts are distinct (no repeated numbers).',
    starterCode: 'def partition_distinct(n):\n    """Count partitions of n with distinct parts\n    \n    Args:\n        n: Positive integer\n    Returns:\n        Number of distinct-part partitions\n    """\n    pass\n\nprint(partition_distinct(6))',
    solution: 'def partition_distinct(n):\n    """Count partitions of n with distinct parts\n    \n    Args:\n        n: Positive integer\n    Returns:\n        Number of distinct-part partitions\n    """\n    # dp[i][j] = partitions of i using distinct numbers <= j\n    dp = [[0] * (n + 1) for _ in range(n + 1)]\n    \n    for j in range(n + 1):\n        dp[0][j] = 1\n    \n    for i in range(1, n + 1):\n        for j in range(1, n + 1):\n            dp[i][j] = dp[i][j-1]  # Don\'t use j\n            if i >= j:\n                dp[i][j] += dp[i-j][j-1]  # Use j (can\'t use again)\n    \n    return dp[n][n]\n\nprint(partition_distinct(6))',
    testCases: [
      { input: '6', isHidden: false, description: 'q(6) = 4: 6, 5+1, 4+2, 3+2+1' },
      { input: '5', isHidden: false, description: 'q(5) = 3' },
      { input: '10', isHidden: true, description: 'q(10) = 10' },
      { input: '1', isHidden: true, description: 'q(1) = 1' }
    ],
    hints: ['Similar to regular partitions but can\'t reuse numbers', 'dp[i-j][j-1] ensures j is not used again'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex07',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Partition with Odd Parts',
    difficulty: 3,
    description: 'Count partitions of n where all parts are odd numbers.',
    starterCode: 'def partition_odd(n):\n    """Count partitions of n with only odd parts\n    \n    Args:\n        n: Positive integer\n    Returns:\n        Number of odd-part partitions\n    """\n    pass\n\nprint(partition_odd(7))',
    solution: 'def partition_odd(n):\n    """Count partitions of n with only odd parts\n    \n    Args:\n        n: Positive integer\n    Returns:\n        Number of odd-part partitions\n    """\n    # Dynamic programming\n    ways = [0] * (n + 1)\n    ways[0] = 1\n    \n    # Use only odd numbers\n    for num in range(1, n + 1, 2):  # 1, 3, 5, 7, ...\n        for i in range(num, n + 1):\n            ways[i] += ways[i - num]\n    \n    return ways[n]\n\nprint(partition_odd(7))',
    testCases: [
      { input: '7', isHidden: false, description: 'Odd parts of 7: 5 ways' },
      { input: '5', isHidden: false, description: 'Odd parts of 5: 3 ways' },
      { input: '10', isHidden: true, description: 'Odd parts of 10' },
      { input: '1', isHidden: true, description: 'Only 1: 1 way' }
    ],
    hints: ['Use coin change DP with odd coins only', 'Iterate through 1, 3, 5, 7, ...'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex08',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Compositions of n',
    difficulty: 2,
    description: 'Count compositions of n (ordered partitions). For example, 3 = 1+2 and 3 = 2+1 are different compositions.',
    starterCode: 'def composition_count(n):\n    """Count ordered partitions (compositions) of n\n    \n    Args:\n        n: Positive integer\n    Returns:\n        Number of compositions\n    """\n    pass\n\nprint(composition_count(5))',
    solution: 'def composition_count(n):\n    """Count ordered partitions (compositions) of n\n    \n    Args:\n        n: Positive integer\n    Returns:\n        Number of compositions\n    """\n    if n == 0:\n        return 1\n    if n == 1:\n        return 1\n    \n    # Each composition is determined by n-1 binary choices\n    # (whether to place a separator or not)\n    return 2 ** (n - 1)\n\nprint(composition_count(5))',
    testCases: [
      { input: '5', isHidden: false, description: '2^4 = 16 compositions' },
      { input: '3', isHidden: false, description: '2^2 = 4 compositions' },
      { input: '10', isHidden: true, description: '2^9 = 512' },
      { input: '1', isHidden: true, description: '2^0 = 1' }
    ],
    hints: ['Think of n-1 gaps between n ones', 'Each gap can have a separator or not', 'Answer is 2^(n-1)'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex09',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Generating Function Product Coefficients',
    difficulty: 2,
    description: 'Find the coefficient of x^k in the expansion of (1 + x + x^2 + ... + x^m)^n.',
    starterCode: 'def coeff_in_product(n, m, k):\n    """Find coefficient of x^k in (1+x+...+x^m)^n\n    \n    Args:\n        n: Power of the polynomial\n        m: Highest degree in base polynomial\n        k: Target degree\n    Returns:\n        Coefficient of x^k\n    """\n    pass\n\nprint(coeff_in_product(3, 2, 4))',
    solution: 'def coeff_in_product(n, m, k):\n    """Find coefficient of x^k in (1+x+...+x^m)^n\n    \n    Args:\n        n: Power of the polynomial\n        m: Highest degree in base polynomial\n        k: Target degree\n    Returns:\n        Coefficient of x^k\n    """\n    # Use dynamic programming\n    # dp[i][j] = coefficient of x^j in (1+x+...+x^m)^i\n    dp = [[0] * (k + 1) for _ in range(n + 1)]\n    dp[0][0] = 1\n    \n    for i in range(1, n + 1):\n        for j in range(k + 1):\n            for deg in range(min(m, j) + 1):\n                dp[i][j] += dp[i-1][j-deg]\n    \n    return dp[n][k]\n\nprint(coeff_in_product(3, 2, 4))',
    testCases: [
      { input: '3, 2, 4', isHidden: false, description: '(1+x+x²)³ coeff of x⁴' },
      { input: '2, 3, 3', isHidden: false, description: '(1+x+x²+x³)² coeff of x³' },
      { input: '4, 2, 6', isHidden: true, description: 'Larger values' },
      { input: '3, 1, 2', isHidden: true, description: '(1+x)³ coeff of x²' }
    ],
    hints: ['Use DP to multiply polynomials', 'dp[i][j] tracks coefficient of x^j after i multiplications'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex10',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Ferrers Diagram Conjugate',
    difficulty: 3,
    description: 'Given a partition as a list, compute its conjugate partition (transpose of Ferrers diagram).',
    starterCode: 'def conjugate_partition(partition):\n    """Compute conjugate partition\n    \n    Args:\n        partition: List of parts in non-increasing order\n    Returns:\n        Conjugate partition\n    """\n    pass\n\nprint(conjugate_partition([4, 3, 1]))',
    solution: 'def conjugate_partition(partition):\n    """Compute conjugate partition\n    \n    Args:\n        partition: List of parts in non-increasing order\n    Returns:\n        Conjugate partition\n    """\n    if not partition:\n        return []\n    \n    max_part = max(partition)\n    conjugate = []\n    \n    for i in range(1, max_part + 1):\n        count = sum(1 for p in partition if p >= i)\n        conjugate.append(count)\n    \n    return conjugate\n\nprint(conjugate_partition([4, 3, 1]))',
    testCases: [
      { input: '[4, 3, 1]', isHidden: false, description: 'Conjugate of [4,3,1]' },
      { input: '[5, 3, 3, 1]', isHidden: false, description: 'Conjugate of [5,3,3,1]' },
      { input: '[3, 3, 3]', isHidden: true, description: 'Self-conjugate shape' },
      { input: '[4]', isHidden: true, description: 'Single row' }
    ],
    hints: ['Count how many parts are >= i for each i', 'Conjugate flips rows and columns of Ferrers diagram'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex11',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Catalan via Generating Functions',
    difficulty: 4,
    description: 'Use the generating function approach to compute Catalan numbers C(n) = (2n choose n)/(n+1).',
    starterCode: 'from math import comb\n\ndef catalan_gf(n):\n    """Compute nth Catalan number\n    \n    Args:\n        n: Index\n    Returns:\n        C(n)\n    """\n    pass\n\nprint(catalan_gf(5))',
    solution: 'from math import comb\n\ndef catalan_gf(n):\n    """Compute nth Catalan number\n    \n    Args:\n        n: Index\n    Returns:\n        C(n)\n    """\n    # C(n) = C(2n,n) / (n+1)\n    return comb(2 * n, n) // (n + 1)\n\nprint(catalan_gf(5))',
    testCases: [
      { input: '5', isHidden: false, description: 'C(5) = 42' },
      { input: '4', isHidden: false, description: 'C(4) = 14' },
      { input: '10', isHidden: true, description: 'C(10) = 16796' },
      { input: '0', isHidden: true, description: 'C(0) = 1' }
    ],
    hints: ['Formula: C(n) = (2n)! / ((n+1)! × n!)', 'Equivalently: C(2n,n)/(n+1)'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex12',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Pentagonal Number Theorem',
    difficulty: 5,
    description: 'Use Euler\'s pentagonal number theorem to compute partition numbers more efficiently.',
    starterCode: 'def partition_euler(n):\n    """Compute p(n) using pentagonal number theorem\n    \n    Args:\n        n: Number to partition\n    Returns:\n        Number of partitions\n    """\n    pass\n\nprint(partition_euler(10))',
    solution: 'def partition_euler(n):\n    """Compute p(n) using pentagonal number theorem\n    \n    Args:\n        n: Number to partition\n    Returns:\n        Number of partitions\n    """\n    p = [0] * (n + 1)\n    p[0] = 1\n    \n    for i in range(1, n + 1):\n        k = 1\n        while True:\n            # Pentagonal numbers: k(3k-1)/2 and k(3k+1)/2\n            pent1 = k * (3 * k - 1) // 2\n            pent2 = k * (3 * k + 1) // 2\n            \n            if pent1 > i:\n                break\n            \n            sign = (-1) ** (k + 1)\n            p[i] += sign * p[i - pent1]\n            \n            if pent2 <= i:\n                p[i] += sign * p[i - pent2]\n            \n            k += 1\n    \n    return p[n]\n\nprint(partition_euler(10))',
    testCases: [
      { input: '10', isHidden: false, description: 'p(10) = 42' },
      { input: '5', isHidden: false, description: 'p(5) = 7' },
      { input: '20', isHidden: true, description: 'p(20) = 627' },
      { input: '1', isHidden: true, description: 'p(1) = 1' }
    ],
    hints: ['p(n) = sum over pentagonal numbers with alternating signs', 'Pentagonal: k(3k±1)/2'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex13',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Surjective Functions Count',
    difficulty: 4,
    description: 'Count surjective (onto) functions from a set of size n to a set of size k using Stirling numbers.',
    starterCode: 'def surjective_count(n, k):\n    """Count onto functions from n elements to k elements\n    \n    Args:\n        n: Domain size\n        k: Codomain size\n    Returns:\n        Number of surjective functions\n    """\n    pass\n\nprint(surjective_count(5, 3))',
    solution: 'from math import factorial\n\ndef stirling_second(n, k):\n    if n == 0 and k == 0:\n        return 1\n    if n == 0 or k == 0 or k > n:\n        return 0\n    \n    dp = [[0] * (k + 1) for _ in range(n + 1)]\n    dp[0][0] = 1\n    \n    for i in range(1, n + 1):\n        for j in range(1, min(i, k) + 1):\n            dp[i][j] = j * dp[i-1][j] + dp[i-1][j-1]\n    \n    return dp[n][k]\n\ndef surjective_count(n, k):\n    """Count onto functions from n elements to k elements\n    \n    Args:\n        n: Domain size\n        k: Codomain size\n    Returns:\n        Number of surjective functions\n    """\n    if k > n:\n        return 0\n    \n    # Number of surjections = S(n,k) × k!\n    return stirling_second(n, k) * factorial(k)\n\nprint(surjective_count(5, 3))',
    testCases: [
      { input: '5, 3', isHidden: false, description: 'S(5,3) × 3! = 150' },
      { input: '4, 2', isHidden: false, description: 'S(4,2) × 2! = 14' },
      { input: '6, 4', isHidden: true, description: 'Larger values' },
      { input: '3, 3', isHidden: true, description: 'All singletons: 6' }
    ],
    hints: ['Use Stirling numbers S(n,k)', 'Answer is S(n,k) × k!'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex14',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Exponential Generating Functions',
    difficulty: 4,
    description: 'Use exponential generating functions to count permutations with forbidden patterns.',
    starterCode: 'from math import factorial\n\ndef derangement_egf(n):\n    """Calculate derangements using EGF approach\n    \n    Args:\n        n: Number of elements\n    Returns:\n        Number of derangements\n    """\n    pass\n\nprint(derangement_egf(5))',
    solution: 'from math import factorial\n\ndef derangement_egf(n):\n    """Calculate derangements using EGF approach\n    \n    Args:\n        n: Number of elements\n    Returns:\n        Number of derangements\n    """\n    if n == 0:\n        return 1\n    if n == 1:\n        return 0\n    \n    # EGF approach: D(n) ≈ n! / e\n    # Exact: sum of (-1)^k × n! / k! for k=0 to n\n    result = 0\n    for k in range(n + 1):\n        sign = (-1) ** k\n        result += sign * factorial(n) // factorial(k)\n    \n    return result\n\nprint(derangement_egf(5))',
    testCases: [
      { input: '5', isHidden: false, description: 'D(5) = 44' },
      { input: '4', isHidden: false, description: 'D(4) = 9' },
      { input: '6', isHidden: true, description: 'D(6) = 265' },
      { input: '1', isHidden: true, description: 'D(1) = 0' }
    ],
    hints: ['D(n) = n! × sum of (-1)^k/k! for k=0 to n', 'This is n!/e rounded to nearest integer'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex15',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Young Tableaux Counting',
    difficulty: 5,
    description: 'Count the number of standard Young tableaux of a given shape using the hook length formula.',
    starterCode: 'from math import factorial\n\ndef count_tableaux(shape):\n    """Count standard Young tableaux using hook length formula\n    \n    Args:\n        shape: Partition as list [λ1, λ2, ...]\n    Returns:\n        Number of standard Young tableaux\n    """\n    pass\n\nprint(count_tableaux([3, 2, 1]))',
    solution: 'from math import factorial\n\ndef count_tableaux(shape):\n    """Count standard Young tableaux using hook length formula\n    \n    Args:\n        shape: Partition as list [λ1, λ2, ...]\n    Returns:\n        Number of standard Young tableaux\n    """\n    if not shape:\n        return 1\n    \n    n = sum(shape)\n    hook_product = 1\n    \n    for i, row_len in enumerate(shape):\n        for j in range(row_len):\n            # Hook length = cells to right + cells below + 1\n            cells_right = row_len - j - 1\n            cells_below = sum(1 for k in range(i + 1, len(shape)) if shape[k] > j)\n            hook_length = cells_right + cells_below + 1\n            hook_product *= hook_length\n    \n    return factorial(n) // hook_product\n\nprint(count_tableaux([3, 2, 1]))',
    testCases: [
      { input: '[3, 2, 1]', isHidden: false, description: 'Shape [3,2,1]: 16 tableaux' },
      { input: '[3, 2]', isHidden: false, description: 'Shape [3,2]: 5 tableaux' },
      { input: '[4, 3, 2, 1]', isHidden: true, description: 'Larger staircase' },
      { input: '[3, 3]', isHidden: true, description: 'Rectangle 2×3' }
    ],
    hints: ['Hook length = cells right + cells below + 1', 'Answer = n! / (product of all hook lengths)'],
    language: 'python'
  },
  {
    id: 'math102-t6-ex16',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'q-Binomial Coefficients',
    difficulty: 5,
    description: 'Compute the q-binomial coefficient (Gaussian binomial coefficient) [n k]_q, which counts k-dimensional subspaces of an n-dimensional vector space over GF(q).',
    starterCode: 'def q_binomial(n, k, q):\n    """Compute q-binomial coefficient [n k]_q\n    \n    Args:\n        n: Upper parameter\n        k: Lower parameter  \n        q: Base\n    Returns:\n        q-binomial coefficient\n    """\n    pass\n\nprint(q_binomial(5, 2, 2))',
    solution: 'def q_binomial(n, k, q):\n    """Compute q-binomial coefficient [n k]_q\n    \n    Args:\n        n: Upper parameter\n        k: Lower parameter\n        q: Base\n    Returns:\n        q-binomial coefficient\n    """\n    if k < 0 or k > n:\n        return 0\n    if k == 0 or k == n:\n        return 1\n    \n    # [n k]_q = product of (q^i - 1) for i in range / similar for denominator\n    def q_factorial(m):\n        """Compute [m]_q! = [1]_q × [2]_q × ... × [m]_q"""\n        result = 1\n        for i in range(1, m + 1):\n            # [i]_q = (q^i - 1)/(q - 1)\n            result *= (q**i - 1)\n        return result\n    \n    numerator = q_factorial(n)\n    denominator = q_factorial(k) * q_factorial(n - k)\n    \n    # Additional powers of (q-1)\n    for i in range(k):\n        numerator //= (q - 1)\n    for i in range(n - k):\n        numerator //= (q - 1)\n    \n    return numerator // denominator\n\nprint(q_binomial(5, 2, 2))',
    testCases: [
      { input: '5, 2, 2', isHidden: false, description: '[5 2]_2 (GF(2) subspaces)' },
      { input: '4, 2, 2', isHidden: false, description: '[4 2]_2 = 35' },
      { input: '6, 3, 2', isHidden: true, description: 'Larger dimension' },
      { input: '3, 1, 3', isHidden: true, description: '[3 1]_3 = 13' }
    ],
    hints: ['[n]_q = (q^n - 1)/(q - 1)', '[n]_q! = [1]_q × [2]_q × ... × [n]_q', '[n k]_q = [n]_q! / ([k]_q! × [n-k]_q!)'],
    language: 'python'
  }
];
