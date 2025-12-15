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
      { input: '5, 2', isHidden: false, description: 'C(5,2) = 10' },
      { input: '10, 3', isHidden: false, description: 'C(10,3) = 120' },
      { input: '20, 10', isHidden: true, description: 'Large combination C(20,10)' },
      { input: '5, 0', isHidden: true, description: 'Edge case: k=0' },
      { input: '5, 5', isHidden: true, description: 'Edge case: k=n' }
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
      { input: '5', isHidden: false, description: '5! = 120' },
      { input: '0', isHidden: false, description: '0! = 1' },
      { input: '10', isHidden: true, description: '10! = 3628800' },
      { input: '1', isHidden: true, description: '1! = 1' }
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
      { input: '5, 3', isHidden: false, description: 'P(5,3) = 60' },
      { input: '10, 2', isHidden: false, description: 'P(10,2) = 90' },
      { input: '7, 7', isHidden: true, description: 'P(n,n) = n!' },
      { input: '5, 0', isHidden: true, description: 'P(n,0) = 1' }
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
      { input: '4', isHidden: false, description: 'Row 4: [1, 4, 6, 4, 1]' },
      { input: '0', isHidden: false, description: 'Row 0: [1]' },
      { input: '6', isHidden: true, description: 'Row 6' },
      { input: '10', isHidden: true, description: 'Row 10' }
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
      { input: '"MISSISSIPPI"', isHidden: false, description: 'MISSISSIPPI: 34650' },
      { input: '"AAB"', isHidden: false, description: 'AAB: 3' },
      { input: '"ABCDE"', isHidden: true, description: 'All distinct: 5!' },
      { input: '"AAAA"', isHidden: true, description: 'All same: 1' }
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
      { input: '5, 3', isHidden: false, description: '5 items, 3 bins: 21 ways' },
      { input: '3, 2', isHidden: false, description: '3 items, 2 bins: 4 ways' },
      { input: '10, 4', isHidden: true, description: '10 items, 4 bins' },
      { input: '0, 3', isHidden: true, description: 'Edge: 0 items' }
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
      { input: '5', isHidden: false, description: 'D(5) = 44' },
      { input: '3', isHidden: false, description: 'D(3) = 2' },
      { input: '10', isHidden: true, description: 'D(10) = 1334961' },
      { input: '1', isHidden: true, description: 'D(1) = 0' }
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
      { input: '100, [2, 3, 5]', isHidden: false, description: 'Divisible by 2, 3, or 5' },
      { input: '100, [2, 3]', isHidden: false, description: 'Divisible by 2 or 3: 67' },
      { input: '1000, [2, 3, 5, 7]', isHidden: true, description: 'Larger range, 4 divisors' },
      { input: '50, [6]', isHidden: true, description: 'Single divisor' }
    ],
    hints: ['|A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|', 'Use LCM for intersections'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex09',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Binomial Coefficient Identity',
    difficulty: 2,
    description: 'Verify Pascal\'s identity: C(n,k) = C(n-1,k-1) + C(n-1,k). Write a function that demonstrates this.',
    starterCode: 'def verify_pascal_identity(n, k):\n    """Verify C(n,k) = C(n-1,k-1) + C(n-1,k)\n    \n    Returns:\n        Tuple (left_side, right_side, are_equal)\n    """\n    pass\n\nprint(verify_pascal_identity(5, 2))',
    solution: 'from math import comb\n\ndef verify_pascal_identity(n, k):\n    """Verify C(n,k) = C(n-1,k-1) + C(n-1,k)\n    \n    Returns:\n        Tuple (left_side, right_side, are_equal)\n    """\n    if k < 1 or k >= n:\n        return None, None, False\n    \n    left = comb(n, k)\n    right = comb(n-1, k-1) + comb(n-1, k)\n    return left, right, left == right\n\nprint(verify_pascal_identity(5, 2))',
    testCases: [
      { input: '5, 2', isHidden: false, description: 'C(5,2) = C(4,1) + C(4,2)' },
      { input: '10, 3', isHidden: false, description: 'Verify Pascal identity' },
      { input: '20, 8', isHidden: true, description: 'Large values' }
    ],
    hints: ['Use Python\'s math.comb() or write your own', 'Check edge cases where k=0 or k=n'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex10',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Counting Subsets by Size',
    difficulty: 2,
    description: 'Count subsets of size k from a set of n elements. Also verify that sum of C(n,k) for k=0 to n equals 2^n.',
    starterCode: 'from math import comb\n\ndef subset_counts(n):\n    """Return list of C(n,k) for k = 0 to n and verify sum = 2^n\n    \n    Returns:\n        Tuple (list of counts, total, 2^n, verified)\n    """\n    pass\n\nprint(subset_counts(5))',
    solution: 'from math import comb\n\ndef subset_counts(n):\n    """Return list of C(n,k) for k = 0 to n and verify sum = 2^n\n    \n    Returns:\n        Tuple (list of counts, total, 2^n, verified)\n    """\n    counts = [comb(n, k) for k in range(n + 1)]\n    total = sum(counts)\n    expected = 2 ** n\n    return counts, total, expected, total == expected\n\nprint(subset_counts(5))',
    testCases: [
      { input: '5', isHidden: false, description: 'Sum = 2^5 = 32' },
      { input: '4', isHidden: false, description: 'Sum = 2^4 = 16' },
      { input: '10', isHidden: true, description: 'Sum = 2^10 = 1024' }
    ],
    hints: ['Use list comprehension', 'The binomial theorem gives this identity'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex11',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Circular Permutations',
    difficulty: 3,
    description: 'Count distinct circular arrangements of n people around a round table. In circular permutations, rotations are considered identical.',
    starterCode: 'from math import factorial\n\ndef circular_permutations(n):\n    """Count circular arrangements of n distinct items\n    \n    Returns:\n        Number of distinct circular permutations\n    """\n    pass\n\nprint(circular_permutations(5))',
    solution: 'from math import factorial\n\ndef circular_permutations(n):\n    """Count circular arrangements of n distinct items\n    \n    Returns:\n        Number of distinct circular permutations\n    """\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n    return factorial(n - 1)\n\nprint(circular_permutations(5))',
    testCases: [
      { input: '5', isHidden: false, description: '(5-1)! = 24' },
      { input: '4', isHidden: false, description: '(4-1)! = 6' },
      { input: '8', isHidden: true, description: '(8-1)! = 5040' },
      { input: '1', isHidden: true, description: 'Single person: 1' }
    ],
    hints: ['Fix one person\'s position, arrange the rest', 'Answer is (n-1)!'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex12',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Multinomial Coefficient',
    difficulty: 3,
    description: 'Calculate the multinomial coefficient (n; k1, k2, ..., km) = n! / (k1! × k2! × ... × km!).',
    starterCode: 'from math import factorial\n\ndef multinomial(n, groups):\n    """Calculate multinomial coefficient\n    \n    Args:\n        n: Total items\n        groups: List of group sizes [k1, k2, ..., km]\n    Returns:\n        Multinomial coefficient\n    """\n    pass\n\nprint(multinomial(10, [3, 3, 4]))',
    solution: 'from math import factorial\n\ndef multinomial(n, groups):\n    """Calculate multinomial coefficient\n    \n    Args:\n        n: Total items\n        groups: List of group sizes [k1, k2, ..., km]\n    Returns:\n        Multinomial coefficient\n    """\n    if sum(groups) != n:\n        return 0\n    \n    result = factorial(n)\n    for k in groups:\n        result //= factorial(k)\n    return result\n\nprint(multinomial(10, [3, 3, 4]))',
    testCases: [
      { input: '10, [3, 3, 4]', isHidden: false, description: '10!/(3!3!4!) = 4200' },
      { input: '6, [2, 2, 2]', isHidden: false, description: '6!/(2!2!2!) = 90' },
      { input: '12, [4, 4, 4]', isHidden: true, description: 'Larger multinomial' },
      { input: '5, [1, 1, 1, 1, 1]', isHidden: true, description: 'All singletons: 5!' }
    ],
    hints: ['Verify that groups sum to n', 'Divide n! by product of factorials'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex13',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Necklace Counting',
    difficulty: 4,
    description: 'Count distinct necklaces with n beads of 2 colors. Account for both rotations and reflections being equivalent.',
    starterCode: 'def count_necklaces(n):\n    """Count distinct necklaces with n beads of 2 colors\n    \n    Uses Burnside\'s lemma (simplified for 2 colors)\n    """\n    pass\n\nprint(count_necklaces(4))',
    solution: 'from math import gcd\n\ndef count_necklaces(n):\n    """Count distinct necklaces with n beads of 2 colors\n    \n    Uses Burnside\'s lemma for dihedral group\n    """\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 2\n    \n    # Rotations contribution\n    rot_sum = sum(2 ** gcd(k, n) for k in range(n))\n    \n    # Reflections contribution\n    if n % 2 == 0:\n        ref_sum = (n // 2) * (2 ** (n // 2)) + (n // 2) * (2 ** (n // 2 + 1))\n    else:\n        ref_sum = n * (2 ** ((n + 1) // 2))\n    \n    return (rot_sum + ref_sum) // (2 * n)\n\nprint(count_necklaces(4))',
    testCases: [
      { input: '4', isHidden: false, description: '4-bead necklaces' },
      { input: '3', isHidden: false, description: '3-bead necklaces: 4' },
      { input: '6', isHidden: true, description: '6-bead necklaces' },
      { input: '5', isHidden: true, description: '5-bead necklaces: 8' }
    ],
    hints: ['Burnside\'s lemma: average over group actions', 'Dihedral group has rotations and reflections'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex14',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Lattice Paths with Obstacles',
    difficulty: 4,
    description: 'Count paths from (0,0) to (m,n) avoiding a blocked cell at (bx,by).',
    starterCode: 'from math import comb\n\ndef paths_avoiding(m, n, bx, by):\n    """Count lattice paths avoiding blocked cell\n    \n    Args:\n        m, n: Target coordinates\n        bx, by: Blocked cell coordinates\n    Returns:\n        Number of valid paths\n    """\n    pass\n\nprint(paths_avoiding(4, 4, 2, 2))',
    solution: 'from math import comb\n\ndef paths_avoiding(m, n, bx, by):\n    """Count lattice paths avoiding blocked cell\n    \n    Args:\n        m, n: Target coordinates\n        bx, by: Blocked cell coordinates\n    Returns:\n        Number of valid paths\n    """\n    # Total paths without restriction\n    total = comb(m + n, n)\n    \n    # Paths through blocked cell = paths to block × paths from block to end\n    if bx <= m and by <= n:\n        through_block = comb(bx + by, by) * comb((m - bx) + (n - by), n - by)\n    else:\n        through_block = 0\n    \n    return total - through_block\n\nprint(paths_avoiding(4, 4, 2, 2))',
    testCases: [
      { input: '4, 4, 2, 2', isHidden: false, description: 'Avoid center cell' },
      { input: '3, 3, 1, 1', isHidden: false, description: '3×3 grid, block (1,1)' },
      { input: '5, 5, 3, 2', isHidden: true, description: 'Larger grid' },
      { input: '4, 4, 0, 0', isHidden: true, description: 'Block origin' }
    ],
    hints: ['Use complement: total - paths through block', 'Paths through block = paths to block × paths from block'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex15',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Restricted Permutations',
    difficulty: 4,
    description: 'Count permutations where certain elements cannot be in certain positions. Use inclusion-exclusion.',
    starterCode: 'from math import factorial\nfrom itertools import combinations\n\ndef restricted_perms(n, forbidden):\n    """Count permutations with forbidden positions\n    \n    Args:\n        n: Number of elements\n        forbidden: List of (element, position) pairs that are forbidden\n    Returns:\n        Number of valid permutations\n    """\n    pass\n\n# Element 0 can\'t be at position 0, element 1 can\'t be at position 1\nprint(restricted_perms(3, [(0, 0), (1, 1)]))',
    solution: 'from math import factorial\nfrom itertools import combinations\n\ndef restricted_perms(n, forbidden):\n    """Count permutations with forbidden positions\n    \n    Args:\n        n: Number of elements\n        forbidden: List of (element, position) pairs that are forbidden\n    Returns:\n        Number of valid permutations\n    """\n    # Inclusion-exclusion over subsets of forbidden pairs\n    total = 0\n    m = len(forbidden)\n    \n    for r in range(m + 1):\n        for subset in combinations(range(m), r):\n            # Check if subset is compatible (no element/position repeated)\n            elems = set()\n            posns = set()\n            valid = True\n            for i in subset:\n                e, p = forbidden[i]\n                if e in elems or p in posns:\n                    valid = False\n                    break\n                elems.add(e)\n                posns.add(p)\n            \n            if valid:\n                # (-1)^r × (n - len(subset))!\n                contrib = ((-1) ** r) * factorial(n - len(subset))\n                total += contrib\n    \n    return total\n\nprint(restricted_perms(3, [(0, 0), (1, 1)]))',
    testCases: [
      { input: '3, [(0, 0), (1, 1)]', isHidden: false, description: '2 restrictions' },
      { input: '4, [(0, 0)]', isHidden: false, description: 'Single restriction' },
      { input: '5, [(0, 0), (1, 1), (2, 2)]', isHidden: true, description: 'More restrictions' },
      { input: '3, []', isHidden: true, description: 'No restrictions: 3!' }
    ],
    hints: ['Use inclusion-exclusion over forbidden pairs', 'Ensure no conflicts in chosen subset'],
    language: 'python'
  },
  {
    id: 'math102-t1-ex16',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Catalan Number Applications',
    difficulty: 5,
    description: 'Implement multiple interpretations of Catalan numbers: valid parentheses, binary trees, and non-crossing partitions.',
    starterCode: 'from math import comb\n\ndef catalan(n):\n    """Calculate nth Catalan number"""\n    pass\n\ndef count_valid_parens(n):\n    """Count valid sequences of n pairs of parentheses"""\n    pass\n\ndef count_binary_trees(n):\n    """Count full binary trees with n+1 leaves"""\n    pass\n\nprint(f"C(5) = {catalan(5)}")\nprint(f"Valid parens: {count_valid_parens(5)}")\nprint(f"Binary trees: {count_binary_trees(5)}")',
    solution: 'from math import comb\n\ndef catalan(n):\n    """Calculate nth Catalan number"""\n    return comb(2 * n, n) // (n + 1)\n\ndef count_valid_parens(n):\n    """Count valid sequences of n pairs of parentheses\n    This equals C(n) by bijection\n    """\n    return catalan(n)\n\ndef count_binary_trees(n):\n    """Count full binary trees with n+1 leaves\n    This also equals C(n)\n    """\n    return catalan(n)\n\n# Alternative: generate actual sequences\ndef generate_valid_parens(n):\n    result = []\n    def backtrack(s, open_count, close_count):\n        if len(s) == 2 * n:\n            result.append(s)\n            return\n        if open_count < n:\n            backtrack(s + \'(\', open_count + 1, close_count)\n        if close_count < open_count:\n            backtrack(s + \')\', open_count, close_count + 1)\n    backtrack(\'\', 0, 0)\n    return result\n\nprint(f"C(5) = {catalan(5)}")\nprint(f"Valid parens: {count_valid_parens(5)}")\nprint(f"Binary trees: {count_binary_trees(5)}")\nprint(f"Generated: {len(generate_valid_parens(5))}")',
    testCases: [
      { input: '5', isHidden: false, description: 'C(5) = 42' },
      { input: '3', isHidden: false, description: 'C(3) = 5' },
      { input: '10', isHidden: true, description: 'C(10) = 16796' },
      { input: '0', isHidden: true, description: 'C(0) = 1' }
    ],
    hints: ['C(n) = C(2n,n)/(n+1)', 'Many combinatorial objects are counted by Catalan numbers'],
    language: 'python'
  }
];
