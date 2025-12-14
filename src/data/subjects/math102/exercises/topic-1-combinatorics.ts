import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'math102-e1',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Combinations Calculator',
    difficulty: 2,
    description: 'Implement a function that calculates the binomial coefficient C(n,k), also known as "n choose k". This represents the number of ways to choose k items from n items without regard to order. Use the formula C(n,k) = n! / (k! × (n-k)!), but optimize to avoid computing large factorials by canceling terms.',
    starterCode: 'def combinations(n, k):\n    """Calculate C(n,k) = n! / (k! * (n-k)!)\n    \n    Args:\n        n: Total number of items\n        k: Number of items to choose\n        \n    Returns:\n        Number of ways to choose k items from n items\n    """\n    # Your code here\n    pass',
    solution: 'def combinations(n, k):\n    """Calculate C(n,k) = n! / (k! * (n-k)!)\n    \n    Args:\n        n: Total number of items\n        k: Number of items to choose\n        \n    Returns:\n        Number of ways to choose k items from n items\n    """\n    if k > n or k < 0:\n        return 0\n    if k == 0 or k == n:\n        return 1\n    \n    # Optimize by using smaller k\n    k = min(k, n - k)\n    \n    result = 1\n    for i in range(k):\n        result = result * (n - i) // (i + 1)\n    \n    return result',
    testCases: [
      { input: '5, 2', expectedOutput: '10', isHidden: false, description: 'C(5,2) should return 10' },
      { input: '10, 3', expectedOutput: '120', isHidden: false, description: 'C(10,3) should return 120' },
      { input: '6, 0', expectedOutput: '1', isHidden: false, description: 'C(6,0) should return 1 (choosing nothing)' },
      { input: '8, 8', expectedOutput: '1', isHidden: true, description: 'C(8,8) should return 1 (choosing everything)' },
      { input: '15, 7', expectedOutput: '6435', isHidden: true, description: 'C(15,7) should return 6435 (larger case)' }
    ],
    hints: [
      'Remember that C(n,k) = C(n, n-k), so you can optimize by using the smaller value',
      'To avoid overflow, multiply and divide alternately rather than computing factorials separately',
      'Handle edge cases: C(n,0) = 1, C(n,n) = 1, and C(n,k) = 0 if k > n'
    ],
    language: 'python'
  },
  {
    id: 'math102-t1-ex02',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Factorial Function',
    difficulty: 1,
    description: 'Implement a function to calculate n! (n factorial). Use iteration for efficiency.',
    starterCode: 'def factorial(n):\n    """Calculate n! = n × (n-1) × ... × 2 × 1\n    \n    Args:\n        n: Non-negative integer\n    Returns:\n        n factorial\n    """\n    pass\n\nprint(factorial(5))',
    solution: 'def factorial(n):\n    """Calculate n! = n × (n-1) × ... × 2 × 1\n    \n    Args:\n        n: Non-negative integer\n    Returns:\n        n factorial\n    """\n    if n < 0:\n        return None\n    result = 1\n    for i in range(2, n + 1):\n        result *= i\n    return result\n\nprint(factorial(5))',
    testCases: [
      { input: '5', expectedOutput: '120', isHidden: false, description: '5!' },
      { input: '0', expectedOutput: '1', isHidden: true, description: '0! = 1' }
    ],
    hints: ['0! = 1 by definition', 'Multiply from 2 to n'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex03',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Permutations',
    difficulty: 2,
    description: 'Calculate P(n,r) - the number of permutations of n items taken r at a time. P(n,r) = n!/(n-r)!',
    starterCode: 'def permutations(n, r):\n    """Calculate P(n,r) = n!/(n-r)!\n    \n    Args:\n        n: Total items\n        r: Items to arrange\n    Returns:\n        Number of permutations\n    """\n    pass\n\nprint(permutations(5, 3))',
    solution: 'def permutations(n, r):\n    """Calculate P(n,r) = n!/(n-r)!\n    \n    Args:\n        n: Total items\n        r: Items to arrange\n    Returns:\n        Number of permutations\n    """\n    if r > n or r < 0:\n        return 0\n    result = 1\n    for i in range(n, n - r, -1):\n        result *= i\n    return result\n\nprint(permutations(5, 3))',
    testCases: [
      { input: '5, 3', expectedOutput: '60', isHidden: false, description: 'P(5,3)' },
      { input: '4, 4', expectedOutput: '24', isHidden: true, description: 'P(4,4) = 4!' }
    ],
    hints: ['P(n,r) = n × (n-1) × ... × (n-r+1)', 'Multiply r consecutive integers starting from n'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex04',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Pascal\'s Triangle Row',
    difficulty: 2,
    description: 'Generate the nth row of Pascal\'s Triangle. Each element is the sum of the two elements above it.',
    starterCode: 'def pascal_row(n):\n    """Generate the nth row of Pascal\'s Triangle (0-indexed)\n    \n    Args:\n        n: Row number (0-indexed)\n    Returns:\n        List of binomial coefficients\n    """\n    pass\n\nprint(pascal_row(4))',
    solution: 'def pascal_row(n):\n    """Generate the nth row of Pascal\'s Triangle (0-indexed)\n    \n    Args:\n        n: Row number (0-indexed)\n    Returns:\n        List of binomial coefficients\n    """\n    row = [1]\n    for k in range(1, n + 1):\n        row.append(row[-1] * (n - k + 1) // k)\n    return row\n\nprint(pascal_row(4))',
    testCases: [
      { input: '4', expectedOutput: '[1, 4, 6, 4, 1]', isHidden: false, description: 'Row 4' },
      { input: '0', expectedOutput: '[1]', isHidden: true, description: 'Row 0' }
    ],
    hints: ['Each element C(n,k) = C(n,k-1) × (n-k+1) / k', 'Build iteratively from previous element'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex05',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Counting with Repetition',
    difficulty: 3,
    description: 'Calculate the number of permutations of a multiset (permutations with repetitions). Given a string, count distinct arrangements.',
    starterCode: 'from math import factorial\nfrom collections import Counter\n\ndef multiset_permutations(s):\n    """Count distinct permutations of string s\n    \n    Args:\n        s: String (may have repeated characters)\n    Returns:\n        Number of distinct permutations\n    """\n    pass\n\nprint(multiset_permutations("MISSISSIPPI"))',
    solution: 'from math import factorial\nfrom collections import Counter\n\ndef multiset_permutations(s):\n    """Count distinct permutations of string s\n    \n    Args:\n        s: String (may have repeated characters)\n    Returns:\n        Number of distinct permutations\n    """\n    counts = Counter(s)\n    n = len(s)\n    result = factorial(n)\n    for count in counts.values():\n        result //= factorial(count)\n    return result\n\nprint(multiset_permutations("MISSISSIPPI"))',
    testCases: [
      { input: '"MISSISSIPPI"', expectedOutput: '34650', isHidden: false, description: 'MISSISSIPPI permutations' },
      { input: '"AAA"', expectedOutput: '1', isHidden: true, description: 'All same' }
    ],
    hints: ['Formula: n! / (n₁! × n₂! × ... × nₖ!)', 'Use Counter to count occurrences'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex06',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Stars and Bars',
    difficulty: 3,
    description: 'Calculate the number of ways to distribute n identical items into k distinct bins. This is C(n+k-1, k-1).',
    starterCode: 'def distribute(n, k):\n    """Count ways to put n identical items into k distinct bins\n    \n    Args:\n        n: Number of identical items\n        k: Number of distinct bins\n    Returns:\n        Number of distributions\n    """\n    pass\n\nprint(distribute(5, 3))',
    solution: 'def distribute(n, k):\n    """Count ways to put n identical items into k distinct bins\n    \n    Args:\n        n: Number of identical items\n        k: Number of distinct bins\n    Returns:\n        Number of distributions\n    """\n    # This is C(n + k - 1, k - 1)\n    total = n + k - 1\n    choose = k - 1\n    \n    if choose < 0 or choose > total:\n        return 0\n    \n    result = 1\n    for i in range(choose):\n        result = result * (total - i) // (i + 1)\n    return result\n\nprint(distribute(5, 3))',
    testCases: [
      { input: '5, 3', expectedOutput: '21', isHidden: false, description: '5 items in 3 bins' },
      { input: '10, 2', expectedOutput: '11', isHidden: true, description: '10 items in 2 bins' }
    ],
    hints: ['Stars and bars: think of n stars and k-1 bars', 'Formula is C(n+k-1, k-1)'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex07',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Derangements',
    difficulty: 4,
    description: 'Calculate D(n), the number of derangements (permutations with no fixed points). D(n) = (n-1) × (D(n-1) + D(n-2)).',
    starterCode: 'def derangements(n):\n    """Count permutations where no element is in its original position\n    \n    Args:\n        n: Number of elements\n    Returns:\n        Number of derangements\n    """\n    pass\n\nprint(derangements(5))',
    solution: 'def derangements(n):\n    """Count permutations where no element is in its original position\n    \n    Args:\n        n: Number of elements\n    Returns:\n        Number of derangements\n    """\n    if n == 0:\n        return 1\n    if n == 1:\n        return 0\n    \n    d_prev2 = 1  # D(0)\n    d_prev1 = 0  # D(1)\n    \n    for i in range(2, n + 1):\n        d_curr = (i - 1) * (d_prev1 + d_prev2)\n        d_prev2 = d_prev1\n        d_prev1 = d_curr\n    \n    return d_prev1\n\nprint(derangements(5))',
    testCases: [
      { input: '5', expectedOutput: '44', isHidden: false, description: 'D(5)' },
      { input: '3', expectedOutput: '2', isHidden: true, description: 'D(3)' }
    ],
    hints: ['D(0) = 1, D(1) = 0', 'D(n) = (n-1) × (D(n-1) + D(n-2))'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex08',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Inclusion-Exclusion',
    difficulty: 5,
    description: 'Count integers from 1 to n that are divisible by any of the given divisors using inclusion-exclusion principle.',
    starterCode: 'from math import gcd\nfrom functools import reduce\n\ndef count_divisible(n, divisors):\n    """Count integers from 1 to n divisible by any divisor\n    \n    Args:\n        n: Upper limit\n        divisors: List of divisors\n    Returns:\n        Count of divisible integers\n    """\n    pass\n\nprint(count_divisible(100, [2, 3, 5]))',
    solution: 'from math import gcd\nfrom functools import reduce\nfrom itertools import combinations\n\ndef count_divisible(n, divisors):\n    """Count integers from 1 to n divisible by any divisor\n    \n    Args:\n        n: Upper limit\n        divisors: List of divisors\n    Returns:\n        Count of divisible integers\n    """\n    def lcm(a, b):\n        return abs(a * b) // gcd(a, b)\n    \n    total = 0\n    k = len(divisors)\n    \n    for r in range(1, k + 1):\n        for combo in combinations(divisors, r):\n            l = reduce(lcm, combo)\n            count = n // l\n            if r % 2 == 1:\n                total += count\n            else:\n                total -= count\n    \n    return total\n\nprint(count_divisible(100, [2, 3, 5]))',
    testCases: [
      { input: '100, [2, 3, 5]', expectedOutput: '74', isHidden: false, description: 'Divisible by 2, 3, or 5' },
      { input: '10, [2, 5]', expectedOutput: '6', isHidden: true, description: 'Divisible by 2 or 5' }
    ],
    hints: ['|A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|', 'Use LCM for intersections'],
    language: 'python'
  }
];
