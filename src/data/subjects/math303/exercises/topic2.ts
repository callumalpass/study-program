import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'math303-t2-ex01',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Compute Sequence Limit',
    difficulty: 1,
    description: 'Compute the limit of the sequence a_n = 1/n as n → ∞.',
    starterCode: `def sequence_limit_reciprocal():
    """
    Find lim(n→∞) 1/n
    Returns:
        float: limit value
    """
    pass`,
    solution: `def sequence_limit_reciprocal():
    """
    Find lim(n→∞) 1/n
    Returns:
        float: limit value
    """
    return 0.0`,
    testCases: [
      { input: '', expectedOutput: '0.0', isHidden: false, description: 'Limit of 1/n' },
      { input: '', expectedOutput: '0.0', isHidden: false, description: 'Reciprocal sequence' },
      { input: '', expectedOutput: '0.0', isHidden: true, description: 'Verify convergence to 0' }
    ],
    hints: ['As n gets larger, 1/n gets smaller', 'The limit is 0'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex02',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Constant Sequence Limit',
    difficulty: 1,
    description: 'Find the limit of the constant sequence a_n = c for all n.',
    starterCode: `def constant_sequence_limit(c):
    """
    Find lim(n→∞) c
    Args:
        c: constant value
    Returns:
        float: limit value
    """
    pass`,
    solution: `def constant_sequence_limit(c):
    """
    Find lim(n→∞) c
    Args:
        c: constant value
    Returns:
        float: limit value
    """
    return c`,
    testCases: [
      { input: '5', expectedOutput: '5', isHidden: false, description: 'Constant 5' },
      { input: '-3.2', expectedOutput: '-3.2', isHidden: false, description: 'Constant -3.2' },
      { input: '0', expectedOutput: '0', isHidden: true, description: 'Constant 0' }
    ],
    hints: ['A constant sequence converges to its constant value'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex03',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Linear Rational Sequence',
    difficulty: 2,
    description: 'Compute the limit of a_n = n/(n+1) as n → ∞.',
    starterCode: `def limit_linear_rational():
    """
    Find lim(n→∞) n/(n+1)
    Returns:
        float: limit value
    """
    pass`,
    solution: `def limit_linear_rational():
    """
    Find lim(n→∞) n/(n+1)
    Returns:
        float: limit value
    """
    # Divide numerator and denominator by n: 1/(1+1/n) → 1
    return 1.0`,
    testCases: [
      { input: '', expectedOutput: '1.0', isHidden: false, description: 'Limit of n/(n+1)' },
      { input: '', expectedOutput: '1.0', isHidden: false, description: 'Rational sequence' },
      { input: '', expectedOutput: '1.0', isHidden: true, description: 'Verify limit is 1' }
    ],
    hints: ['Divide numerator and denominator by n', 'As n → ∞, 1/n → 0'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex04',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Quadratic Rational Sequence',
    difficulty: 2,
    description: 'Compute the limit of a_n = (2n² + 3n)/(n² + 1) as n → ∞.',
    starterCode: `def limit_quadratic_rational():
    """
    Find lim(n→∞) (2n² + 3n)/(n² + 1)
    Returns:
        float: limit value
    """
    pass`,
    solution: `def limit_quadratic_rational():
    """
    Find lim(n→∞) (2n² + 3n)/(n² + 1)
    Returns:
        float: limit value
    """
    # Divide by n²: (2 + 3/n)/(1 + 1/n²) → 2/1 = 2
    return 2.0`,
    testCases: [
      { input: '', expectedOutput: '2.0', isHidden: false, description: 'Quadratic rational limit' },
      { input: '', expectedOutput: '2.0', isHidden: false, description: 'Leading coefficient ratio' },
      { input: '', expectedOutput: '2.0', isHidden: true, description: 'Verify limit is 2' }
    ],
    hints: ['Divide numerator and denominator by n²', 'The limit is the ratio of leading coefficients'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex05',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Geometric Sequence Limit',
    difficulty: 2,
    description: 'Compute the limit of a_n = r^n for |r| < 1 as n → ∞.',
    starterCode: `def limit_geometric(r):
    """
    Find lim(n→∞) r^n for |r| < 1
    Args:
        r: ratio with |r| < 1
    Returns:
        float: limit value
    """
    pass`,
    solution: `def limit_geometric(r):
    """
    Find lim(n→∞) r^n for |r| < 1
    Args:
        r: ratio with |r| < 1
    Returns:
        float: limit value
    """
    return 0.0`,
    testCases: [
      { input: '0.5', expectedOutput: '0.0', isHidden: false, description: 'r = 0.5' },
      { input: '-0.5', expectedOutput: '0.0', isHidden: false, description: 'r = -0.5' },
      { input: '0.9', expectedOutput: '0.0', isHidden: true, description: 'r = 0.9' }
    ],
    hints: ['For |r| < 1, r^n → 0 as n → ∞'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex06',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Verify Convergence with Epsilon',
    difficulty: 3,
    description: 'Verify that sequence a_n = 1/n converges to 0 by finding N such that |a_n - 0| < ε for all n ≥ N.',
    starterCode: `def find_N_for_epsilon(epsilon):
    """
    Find N such that |1/n| < epsilon for all n >= N
    Args:
        epsilon: tolerance
    Returns:
        int: N value
    """
    pass`,
    solution: `def find_N_for_epsilon(epsilon):
    """
    Find N such that |1/n| < epsilon for all n >= N
    Args:
        epsilon: tolerance
    Returns:
        int: N value
    """
    import math
    # |1/n| < epsilon ⟺ n > 1/epsilon
    return math.ceil(1.0 / epsilon)`,
    testCases: [
      { input: '0.1', expectedOutput: '10', isHidden: false, description: 'epsilon = 0.1' },
      { input: '0.01', expectedOutput: '100', isHidden: false, description: 'epsilon = 0.01' },
      { input: '0.001', expectedOutput: '1000', isHidden: true, description: 'epsilon = 0.001' }
    ],
    hints: ['Solve |1/n| < ε for n', 'N should be ceil(1/ε)'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex07',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Squeeze Theorem Application',
    difficulty: 3,
    description: 'Use the squeeze theorem to find lim(n→∞) sin(n)/n.',
    starterCode: `def limit_sin_over_n():
    """
    Find lim(n→∞) sin(n)/n using squeeze theorem
    Returns:
        float: limit value
    """
    pass`,
    solution: `def limit_sin_over_n():
    """
    Find lim(n→∞) sin(n)/n using squeeze theorem
    Returns:
        float: limit value
    """
    # -1 ≤ sin(n) ≤ 1, so -1/n ≤ sin(n)/n ≤ 1/n
    # Both -1/n and 1/n → 0, so sin(n)/n → 0
    return 0.0`,
    testCases: [
      { input: '', expectedOutput: '0.0', isHidden: false, description: 'Squeeze theorem limit' },
      { input: '', expectedOutput: '0.0', isHidden: false, description: 'Bounded numerator' },
      { input: '', expectedOutput: '0.0', isHidden: true, description: 'Verify limit is 0' }
    ],
    hints: ['Use -1 ≤ sin(n) ≤ 1', 'Apply squeeze theorem with -1/n and 1/n'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex08',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Check Sequence Convergence',
    difficulty: 3,
    description: 'Determine if the sequence a_n = (-1)^n converges.',
    starterCode: `def does_alternating_converge():
    """
    Check if a_n = (-1)^n converges
    Returns:
        bool: True if converges, False otherwise
    """
    pass`,
    solution: `def does_alternating_converge():
    """
    Check if a_n = (-1)^n converges
    Returns:
        bool: True if converges, False otherwise
    """
    # Sequence alternates between -1 and 1, does not converge
    return False`,
    testCases: [
      { input: '', expectedOutput: 'False', isHidden: false, description: 'Alternating sequence' },
      { input: '', expectedOutput: 'False', isHidden: false, description: 'No limit exists' },
      { input: '', expectedOutput: 'False', isHidden: true, description: 'Divergent sequence' }
    ],
    hints: ['The sequence oscillates between -1 and 1', 'A convergent sequence must approach a single value'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex09',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Limit of Sum',
    difficulty: 3,
    description: 'Given sequences a_n → L and b_n → M, find lim(a_n + b_n).',
    starterCode: `def limit_of_sum(L, M):
    """
    Find lim(a_n + b_n) given lim a_n = L and lim b_n = M
    Args:
        L: limit of a_n
        M: limit of b_n
    Returns:
        float: lim(a_n + b_n)
    """
    pass`,
    solution: `def limit_of_sum(L, M):
    """
    Find lim(a_n + b_n) given lim a_n = L and lim b_n = M
    Args:
        L: limit of a_n
        M: limit of b_n
    Returns:
        float: lim(a_n + b_n)
    """
    return L + M`,
    testCases: [
      { input: '2, 3', expectedOutput: '5', isHidden: false, description: 'Sum of limits' },
      { input: '-1, 4', expectedOutput: '3', isHidden: false, description: 'Mixed signs' },
      { input: '0, 0', expectedOutput: '0', isHidden: true, description: 'Both zero' }
    ],
    hints: ['lim(a_n + b_n) = lim a_n + lim b_n'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex10',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Limit of Product',
    difficulty: 3,
    description: 'Given sequences a_n → L and b_n → M, find lim(a_n · b_n).',
    starterCode: `def limit_of_product(L, M):
    """
    Find lim(a_n · b_n) given lim a_n = L and lim b_n = M
    Args:
        L: limit of a_n
        M: limit of b_n
    Returns:
        float: lim(a_n · b_n)
    """
    pass`,
    solution: `def limit_of_product(L, M):
    """
    Find lim(a_n · b_n) given lim a_n = L and lim b_n = M
    Args:
        L: limit of a_n
        M: limit of b_n
    Returns:
        float: lim(a_n · b_n)
    """
    return L * M`,
    testCases: [
      { input: '2, 3', expectedOutput: '6', isHidden: false, description: 'Product of limits' },
      { input: '-1, 4', expectedOutput: '-4', isHidden: false, description: 'Mixed signs' },
      { input: '0, 5', expectedOutput: '0', isHidden: true, description: 'One zero' }
    ],
    hints: ['lim(a_n · b_n) = lim a_n · lim b_n'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex11',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Limit of Quotient',
    difficulty: 4,
    description: 'Given sequences a_n → L and b_n → M with M ≠ 0, find lim(a_n / b_n).',
    starterCode: `def limit_of_quotient(L, M):
    """
    Find lim(a_n / b_n) given lim a_n = L and lim b_n = M ≠ 0
    Args:
        L: limit of a_n
        M: limit of b_n (nonzero)
    Returns:
        float: lim(a_n / b_n)
    """
    pass`,
    solution: `def limit_of_quotient(L, M):
    """
    Find lim(a_n / b_n) given lim a_n = L and lim b_n = M ≠ 0
    Args:
        L: limit of a_n
        M: limit of b_n (nonzero)
    Returns:
        float: lim(a_n / b_n)
    """
    return L / M`,
    testCases: [
      { input: '6, 2', expectedOutput: '3.0', isHidden: false, description: 'Quotient of limits' },
      { input: '4, -2', expectedOutput: '-2.0', isHidden: false, description: 'Negative denominator' },
      { input: '0, 5', expectedOutput: '0.0', isHidden: true, description: 'Zero numerator' }
    ],
    hints: ['lim(a_n / b_n) = lim a_n / lim b_n when lim b_n ≠ 0'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex12',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Monotone Convergence Check',
    difficulty: 4,
    description: 'Check if the monotone increasing sequence a_n = 1 - 1/n converges.',
    starterCode: `def monotone_sequence_converges():
    """
    Check if a_n = 1 - 1/n converges
    Returns:
        tuple: (converges: bool, limit: float or None)
    """
    pass`,
    solution: `def monotone_sequence_converges():
    """
    Check if a_n = 1 - 1/n converges
    Returns:
        tuple: (converges: bool, limit: float or None)
    """
    # Sequence is increasing and bounded above by 1
    # By monotone convergence theorem, it converges to 1
    return (True, 1.0)`,
    testCases: [
      { input: '', expectedOutput: '(True, 1.0)', isHidden: false, description: 'Monotone increasing bounded' },
      { input: '', expectedOutput: '(True, 1.0)', isHidden: false, description: 'Converges to 1' },
      { input: '', expectedOutput: '(True, 1.0)', isHidden: true, description: 'MCT application' }
    ],
    hints: ['The sequence is increasing and bounded above', 'Apply Monotone Convergence Theorem'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex13',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Cauchy Sequence Verification',
    difficulty: 4,
    description: 'Verify that a_n = 1/n is a Cauchy sequence by showing |a_n - a_m| < ε for n, m large enough.',
    starterCode: `def verify_cauchy(epsilon):
    """
    Find N such that |1/n - 1/m| < epsilon for all n,m >= N
    Args:
        epsilon: tolerance
    Returns:
        int: N value
    """
    pass`,
    solution: `def verify_cauchy(epsilon):
    """
    Find N such that |1/n - 1/m| < epsilon for all n,m >= N
    Args:
        epsilon: tolerance
    Returns:
        int: N value
    """
    import math
    # |1/n - 1/m| ≤ |1/n| + |1/m| < 2/N if n,m ≥ N
    # So 2/N < epsilon ⟹ N > 2/epsilon
    return math.ceil(2.0 / epsilon)`,
    testCases: [
      { input: '0.1', expectedOutput: '20', isHidden: false, description: 'epsilon = 0.1' },
      { input: '0.01', expectedOutput: '200', isHidden: false, description: 'epsilon = 0.01' },
      { input: '0.001', expectedOutput: '2000', isHidden: true, description: 'epsilon = 0.001' }
    ],
    hints: ['Use triangle inequality: |1/n - 1/m| ≤ 1/n + 1/m', 'Both terms less than 1/N when n,m ≥ N'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex14',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Subsequence Limit',
    difficulty: 4,
    description: 'Given sequence a_n and its subsequence a_{2n}, if a_n → L, what does a_{2n} converge to?',
    starterCode: `def subsequence_limit(L):
    """
    Find lim a_{2n} given lim a_n = L
    Args:
        L: limit of a_n
    Returns:
        float: limit of a_{2n}
    """
    pass`,
    solution: `def subsequence_limit(L):
    """
    Find lim a_{2n} given lim a_n = L
    Args:
        L: limit of a_n
    Returns:
        float: limit of a_{2n}
    """
    # Every subsequence of a convergent sequence converges to the same limit
    return L`,
    testCases: [
      { input: '5', expectedOutput: '5', isHidden: false, description: 'Subsequence has same limit' },
      { input: '0', expectedOutput: '0', isHidden: false, description: 'Zero limit' },
      { input: '-3.2', expectedOutput: '-3.2', isHidden: true, description: 'Negative limit' }
    ],
    hints: ['Any subsequence of a convergent sequence converges to the same limit'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex15',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Bounded Sequence Check',
    difficulty: 5,
    description: 'Determine if the sequence a_n = sin(n) is bounded.',
    starterCode: `def is_sin_n_bounded():
    """
    Check if a_n = sin(n) is bounded
    Returns:
        tuple: (is_bounded: bool, lower_bound: float or None, upper_bound: float or None)
    """
    pass`,
    solution: `def is_sin_n_bounded():
    """
    Check if a_n = sin(n) is bounded
    Returns:
        tuple: (is_bounded: bool, lower_bound: float or None, upper_bound: float or None)
    """
    # -1 ≤ sin(n) ≤ 1 for all n
    return (True, -1.0, 1.0)`,
    testCases: [
      { input: '', expectedOutput: '(True, -1.0, 1.0)', isHidden: false, description: 'Sine is bounded' },
      { input: '', expectedOutput: '(True, -1.0, 1.0)', isHidden: false, description: 'Range of sine' },
      { input: '', expectedOutput: '(True, -1.0, 1.0)', isHidden: true, description: 'Bounds are -1 and 1' }
    ],
    hints: ['The sine function always stays between -1 and 1'],
    language: 'python'
  },
  {
    id: 'math303-t2-ex16',
    subjectId: 'math303',
    topicId: 'math303-topic-2',
    title: 'Recursive Sequence Limit',
    difficulty: 5,
    description: 'Find the limit of the recursive sequence a_1 = 1, a_{n+1} = √(2 + a_n).',
    starterCode: `def recursive_sequence_limit():
    """
    Find lim a_n where a_1 = 1, a_{n+1} = √(2 + a_n)
    Returns:
        float: limit value
    """
    pass`,
    solution: `def recursive_sequence_limit():
    """
    Find lim a_n where a_1 = 1, a_{n+1} = √(2 + a_n)
    Returns:
        float: limit value
    """
    # If L = lim a_n, then L = √(2 + L)
    # L² = 2 + L ⟹ L² - L - 2 = 0 ⟹ (L-2)(L+1) = 0
    # Since a_n > 0, L = 2
    return 2.0`,
    testCases: [
      { input: '', expectedOutput: '2.0', isHidden: false, description: 'Recursive sequence limit' },
      { input: '', expectedOutput: '2.0', isHidden: false, description: 'Fixed point equation' },
      { input: '', expectedOutput: '2.0', isHidden: true, description: 'Limit is 2' }
    ],
    hints: ['Assume limit L exists and solve L = √(2 + L)', 'Square both sides and solve the quadratic'],
    language: 'python'
  }
];
