import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'math303-t3-ex01',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Geometric Series Sum',
    difficulty: 1,
    description: 'Compute the sum of the geometric series Σ(r^n) for n=0 to ∞ when |r| < 1.',
    starterCode: `def geometric_series_sum(r):
    """
    Compute sum of geometric series Σ(r^n) for |r| < 1
    Args:
        r: common ratio with |r| < 1
    Returns:
        float: sum of series
    """
    pass`,
    solution: `def geometric_series_sum(r):
    """
    Compute sum of geometric series Σ(r^n) for |r| < 1
    Args:
        r: common ratio with |r| < 1
    Returns:
        float: sum of series
    """
    return 1.0 / (1.0 - r)`,
    testCases: [
      { input: '0.5', expectedOutput: '2.0', isHidden: false, description: 'r = 1/2' },
      { input: '0.9', expectedOutput: '10.0', isHidden: false, description: 'r = 0.9' },
      { input: '-0.5', expectedOutput: '0.6666666666666666', isHidden: true, description: 'r = -1/2' }
    ],
    hints: ['Formula: 1/(1-r) for |r| < 1'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex02',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Divergence Test',
    difficulty: 1,
    description: 'Apply the divergence test to Σ(n/(n+1)). If lim a_n ≠ 0, series diverges.',
    starterCode: `def divergence_test():
    """
    Check if Σ(n/(n+1)) diverges using divergence test
    Returns:
        bool: True if diverges, False if test inconclusive
    """
    pass`,
    solution: `def divergence_test():
    """
    Check if Σ(n/(n+1)) diverges using divergence test
    Returns:
        bool: True if diverges, False if test inconclusive
    """
    # lim n/(n+1) = 1 ≠ 0, so series diverges
    return True`,
    testCases: [
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Series diverges' },
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Limit test fails' },
      { input: '', expectedOutput: 'True', isHidden: true, description: 'Divergence confirmed' }
    ],
    hints: ['Check lim(n→∞) n/(n+1)', 'If limit ≠ 0, series diverges'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex03',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Harmonic Series Divergence',
    difficulty: 2,
    description: 'Determine if the harmonic series Σ(1/n) converges or diverges.',
    starterCode: `def harmonic_series_converges():
    """
    Check if Σ(1/n) converges
    Returns:
        bool: True if converges, False if diverges
    """
    pass`,
    solution: `def harmonic_series_converges():
    """
    Check if Σ(1/n) converges
    Returns:
        bool: True if converges, False if diverges
    """
    # Harmonic series diverges
    return False`,
    testCases: [
      { input: '', expectedOutput: 'False', isHidden: false, description: 'Harmonic series diverges' },
      { input: '', expectedOutput: 'False', isHidden: false, description: 'Classic divergent series' },
      { input: '', expectedOutput: 'False', isHidden: true, description: 'Does not converge' }
    ],
    hints: ['The harmonic series is a famous divergent series', 'Can be shown using integral test'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex04',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'P-Series Test',
    difficulty: 2,
    description: 'Determine if Σ(1/n^p) converges based on the value of p.',
    starterCode: `def p_series_converges(p):
    """
    Check if Σ(1/n^p) converges
    Args:
        p: exponent
    Returns:
        bool: True if converges, False if diverges
    """
    pass`,
    solution: `def p_series_converges(p):
    """
    Check if Σ(1/n^p) converges
    Args:
        p: exponent
    Returns:
        bool: True if converges, False if diverges
    """
    # p-series converges if and only if p > 1
    return p > 1`,
    testCases: [
      { input: '2', expectedOutput: 'True', isHidden: false, description: 'p = 2 converges' },
      { input: '1', expectedOutput: 'False', isHidden: false, description: 'p = 1 diverges (harmonic)' },
      { input: '0.5', expectedOutput: 'False', isHidden: true, description: 'p = 0.5 diverges' }
    ],
    hints: ['p-series converges if and only if p > 1'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex05',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Comparison Test Application',
    difficulty: 3,
    description: 'Use comparison test: if 0 ≤ a_n ≤ b_n and Σb_n converges, then Σa_n converges.',
    starterCode: `def comparison_test(a_converges, b_converges, a_le_b):
    """
    Apply comparison test
    Args:
        a_converges: whether Σa_n is known to converge (or None)
        b_converges: whether Σb_n is known to converge (or None)
        a_le_b: True if a_n ≤ b_n for all n
    Returns:
        str: 'converges', 'diverges', or 'inconclusive'
    """
    pass`,
    solution: `def comparison_test(a_converges, b_converges, a_le_b):
    """
    Apply comparison test
    Args:
        a_converges: whether Σa_n is known to converge (or None)
        b_converges: whether Σb_n is known to converge (or None)
        a_le_b: True if a_n ≤ b_n for all n
    Returns:
        str: 'converges', 'diverges', or 'inconclusive'
    """
    if not a_le_b:
        return 'inconclusive'
    if b_converges == True:
        return 'converges'
    if a_converges == False:
        return 'diverges'
    return 'inconclusive'`,
    testCases: [
      { input: 'None, True, True', expectedOutput: "'converges'", isHidden: false, description: 'Smaller than convergent' },
      { input: 'False, None, True', expectedOutput: "'diverges'", isHidden: false, description: 'Larger than divergent' },
      { input: 'None, None, False', expectedOutput: "'inconclusive'", isHidden: true, description: 'No comparison possible' }
    ],
    hints: ['If a_n ≤ b_n and Σb_n converges, then Σa_n converges', 'If a_n ≥ b_n and Σb_n diverges, then Σa_n diverges'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex06',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Ratio Test',
    difficulty: 3,
    description: 'Apply ratio test: compute L = lim|a_{n+1}/a_n|. If L < 1 converges, L > 1 diverges.',
    starterCode: `def ratio_test(L):
    """
    Apply ratio test with limit L
    Args:
        L: lim |a_{n+1}/a_n|
    Returns:
        str: 'converges', 'diverges', or 'inconclusive'
    """
    pass`,
    solution: `def ratio_test(L):
    """
    Apply ratio test with limit L
    Args:
        L: lim |a_{n+1}/a_n|
    Returns:
        str: 'converges', 'diverges', or 'inconclusive'
    """
    if L < 1:
        return 'converges'
    elif L > 1:
        return 'diverges'
    else:
        return 'inconclusive'`,
    testCases: [
      { input: '0.5', expectedOutput: "'converges'", isHidden: false, description: 'L < 1' },
      { input: '2.0', expectedOutput: "'diverges'", isHidden: false, description: 'L > 1' },
      { input: '1.0', expectedOutput: "'inconclusive'", isHidden: true, description: 'L = 1' }
    ],
    hints: ['L < 1 implies convergence', 'L > 1 implies divergence', 'L = 1 is inconclusive'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex07',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Root Test',
    difficulty: 3,
    description: 'Apply root test: compute L = lim|a_n|^(1/n). If L < 1 converges, L > 1 diverges.',
    starterCode: `def root_test(L):
    """
    Apply root test with limit L
    Args:
        L: lim |a_n|^(1/n)
    Returns:
        str: 'converges', 'diverges', or 'inconclusive'
    """
    pass`,
    solution: `def root_test(L):
    """
    Apply root test with limit L
    Args:
        L: lim |a_n|^(1/n)
    Returns:
        str: 'converges', 'diverges', or 'inconclusive'
    """
    if L < 1:
        return 'converges'
    elif L > 1:
        return 'diverges'
    else:
        return 'inconclusive'`,
    testCases: [
      { input: '0.8', expectedOutput: "'converges'", isHidden: false, description: 'L < 1' },
      { input: '1.5', expectedOutput: "'diverges'", isHidden: false, description: 'L > 1' },
      { input: '1.0', expectedOutput: "'inconclusive'", isHidden: true, description: 'L = 1' }
    ],
    hints: ['L < 1 implies convergence', 'L > 1 implies divergence', 'L = 1 is inconclusive'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex08',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Integral Test',
    difficulty: 3,
    description: 'Determine if Σ(1/n²) converges using integral test.',
    starterCode: `def integral_test_n_squared():
    """
    Check if Σ(1/n²) converges using integral test
    Returns:
        bool: True if converges, False if diverges
    """
    pass`,
    solution: `def integral_test_n_squared():
    """
    Check if Σ(1/n²) converges using integral test
    Returns:
        bool: True if converges, False if diverges
    """
    # ∫(1/x²)dx from 1 to ∞ = [-1/x] = 1, which is finite
    # So series converges
    return True`,
    testCases: [
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Integral converges' },
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Series converges' },
      { input: '', expectedOutput: 'True', isHidden: true, description: 'p-series with p=2' }
    ],
    hints: ['Evaluate ∫(1/x²)dx from 1 to ∞', 'Integral converges implies series converges'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex09',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Alternating Series Test',
    difficulty: 4,
    description: 'Apply alternating series test to Σ((-1)^n/n): check if a_n decreases and lim a_n = 0.',
    starterCode: `def alternating_series_test():
    """
    Check if Σ((-1)^n/n) converges using alternating series test
    Returns:
        bool: True if converges, False if diverges
    """
    pass`,
    solution: `def alternating_series_test():
    """
    Check if Σ((-1)^n/n) converges using alternating series test
    Returns:
        bool: True if converges, False if diverges
    """
    # a_n = 1/n is decreasing and lim a_n = 0
    # By alternating series test, series converges
    return True`,
    testCases: [
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Alternating harmonic converges' },
      { input: '', expectedOutput: 'True', isHidden: false, description: 'AST conditions satisfied' },
      { input: '', expectedOutput: 'True', isHidden: true, description: 'Conditionally convergent' }
    ],
    hints: ['Check if 1/n is decreasing', 'Check if lim(1/n) = 0', 'Both conditions satisfied implies convergence'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex10',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Absolute Convergence',
    difficulty: 4,
    description: 'Determine if Σ((-1)^n/n²) is absolutely convergent.',
    starterCode: `def is_absolutely_convergent():
    """
    Check if Σ((-1)^n/n²) is absolutely convergent
    Returns:
        bool: True if absolutely convergent
    """
    pass`,
    solution: `def is_absolutely_convergent():
    """
    Check if Σ((-1)^n/n²) is absolutely convergent
    Returns:
        bool: True if absolutely convergent
    """
    # Σ|(-1)^n/n²| = Σ(1/n²) which converges (p-series, p=2)
    # So original series is absolutely convergent
    return True`,
    testCases: [
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Absolutely convergent' },
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Sum of absolute values converges' },
      { input: '', expectedOutput: 'True', isHidden: true, description: 'p-series p=2 converges' }
    ],
    hints: ['Check if Σ(1/n²) converges', 'This is a p-series with p = 2'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex11',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Conditional Convergence',
    difficulty: 4,
    description: 'Determine if Σ((-1)^n/n) is conditionally convergent (converges but not absolutely).',
    starterCode: `def is_conditionally_convergent():
    """
    Check if Σ((-1)^n/n) is conditionally convergent
    Returns:
        bool: True if conditionally convergent
    """
    pass`,
    solution: `def is_conditionally_convergent():
    """
    Check if Σ((-1)^n/n) is conditionally convergent
    Returns:
        bool: True if conditionally convergent
    """
    # Σ((-1)^n/n) converges by alternating series test
    # But Σ|(-1)^n/n| = Σ(1/n) diverges (harmonic series)
    # So it's conditionally convergent
    return True`,
    testCases: [
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Conditionally convergent' },
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Converges but not absolutely' },
      { input: '', expectedOutput: 'True', isHidden: true, description: 'Alternating harmonic' }
    ],
    hints: ['Check if series converges', 'Check if Σ|a_n| diverges', 'If both true, conditionally convergent'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex12',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Limit Comparison Test',
    difficulty: 4,
    description: 'Apply limit comparison test: if lim(a_n/b_n) = c > 0, then Σa_n and Σb_n behave the same.',
    starterCode: `def limit_comparison_test(c, b_converges):
    """
    Apply limit comparison test
    Args:
        c: lim(a_n/b_n), a positive constant
        b_converges: whether Σb_n converges
    Returns:
        bool: whether Σa_n converges
    """
    pass`,
    solution: `def limit_comparison_test(c, b_converges):
    """
    Apply limit comparison test
    Args:
        c: lim(a_n/b_n), a positive constant
        b_converges: whether Σb_n converges
    Returns:
        bool: whether Σa_n converges
    """
    # If c > 0 and finite, both series behave the same
    if c > 0 and c < float('inf'):
        return b_converges
    return None`,
    testCases: [
      { input: '2.5, True', expectedOutput: 'True', isHidden: false, description: 'Both converge' },
      { input: '1.5, False', expectedOutput: 'False', isHidden: false, description: 'Both diverge' },
      { input: '3.0, True', expectedOutput: 'True', isHidden: true, description: 'Positive limit' }
    ],
    hints: ['If lim(a_n/b_n) = c where 0 < c < ∞, series behave the same'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex13',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Telescoping Series',
    difficulty: 4,
    description: 'Find the sum of the telescoping series Σ(1/n - 1/(n+1)).',
    starterCode: `def telescoping_series_sum():
    """
    Find sum of Σ(1/n - 1/(n+1)) from n=1 to ∞
    Returns:
        float: sum of series
    """
    pass`,
    solution: `def telescoping_series_sum():
    """
    Find sum of Σ(1/n - 1/(n+1)) from n=1 to ∞
    Returns:
        float: sum of series
    """
    # Partial sum: (1/1 - 1/2) + (1/2 - 1/3) + ... + (1/n - 1/(n+1))
    # = 1 - 1/(n+1) → 1 as n → ∞
    return 1.0`,
    testCases: [
      { input: '', expectedOutput: '1.0', isHidden: false, description: 'Telescoping to 1' },
      { input: '', expectedOutput: '1.0', isHidden: false, description: 'Series sum' },
      { input: '', expectedOutput: '1.0', isHidden: true, description: 'Partial sums converge to 1' }
    ],
    hints: ['Write out first few partial sums', 'Notice cancellation pattern'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex14',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Ratio Test for Factorials',
    difficulty: 5,
    description: 'Use ratio test to determine if Σ(n!/n^n) converges.',
    starterCode: `def ratio_test_factorial():
    """
    Apply ratio test to Σ(n!/n^n)
    Returns:
        str: 'converges', 'diverges', or 'inconclusive'
    """
    pass`,
    solution: `def ratio_test_factorial():
    """
    Apply ratio test to Σ(n!/n^n)
    Returns:
        str: 'converges', 'diverges', or 'inconclusive'
    """
    # L = lim (n+1)!/(n+1)^(n+1) · n^n/n!
    # = lim (n+1)n^n / (n+1)^(n+1)
    # = lim n^n / (n+1)^n = lim (n/(n+1))^n
    # = lim (1/(1+1/n))^n → 1/e < 1
    # So series converges
    return 'converges'`,
    testCases: [
      { input: '', expectedOutput: "'converges'", isHidden: false, description: 'Ratio test L < 1' },
      { input: '', expectedOutput: "'converges'", isHidden: false, description: 'Factorial series' },
      { input: '', expectedOutput: "'converges'", isHidden: true, description: 'Limit is 1/e' }
    ],
    hints: ['Compute lim |a_{n+1}/a_n|', 'Simplify (n+1)!/(n+1)^(n+1) · n^n/n!', 'Result involves e'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex15',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Root Test for Exponentials',
    difficulty: 5,
    description: 'Use root test to determine if Σ((2n/(3n+1))^n) converges.',
    starterCode: `def root_test_exponential():
    """
    Apply root test to Σ((2n/(3n+1))^n)
    Returns:
        str: 'converges', 'diverges', or 'inconclusive'
    """
    pass`,
    solution: `def root_test_exponential():
    """
    Apply root test to Σ((2n/(3n+1))^n)
    Returns:
        str: 'converges', 'diverges', or 'inconclusive'
    """
    # L = lim ((2n/(3n+1))^n)^(1/n) = lim 2n/(3n+1)
    # = lim 2/(3+1/n) = 2/3 < 1
    # So series converges
    return 'converges'`,
    testCases: [
      { input: '', expectedOutput: "'converges'", isHidden: false, description: 'Root test L < 1' },
      { input: '', expectedOutput: "'converges'", isHidden: false, description: 'Exponential series' },
      { input: '', expectedOutput: "'converges'", isHidden: true, description: 'Limit is 2/3' }
    ],
    hints: ['Compute lim |a_n|^(1/n)', 'The nth root simplifies nicely here', 'Find lim 2n/(3n+1)'],
    language: 'python'
  },
  {
    id: 'math303-t3-ex16',
    subjectId: 'math303',
    topicId: 'math303-topic-3',
    title: 'Cauchy Condensation Test',
    difficulty: 5,
    description: 'Use Cauchy condensation: Σa_n converges iff Σ(2^k·a_{2^k}) converges for decreasing a_n.',
    starterCode: `def cauchy_condensation_test(condensed_converges):
    """
    Apply Cauchy condensation test
    Args:
        condensed_converges: whether Σ(2^k·a_{2^k}) converges
    Returns:
        bool: whether original series Σa_n converges
    """
    pass`,
    solution: `def cauchy_condensation_test(condensed_converges):
    """
    Apply Cauchy condensation test
    Args:
        condensed_converges: whether Σ(2^k·a_{2^k}) converges
    Returns:
        bool: whether original series Σa_n converges
    """
    # By Cauchy condensation, both series behave the same
    return condensed_converges`,
    testCases: [
      { input: 'True', expectedOutput: 'True', isHidden: false, description: 'Both converge' },
      { input: 'False', expectedOutput: 'False', isHidden: false, description: 'Both diverge' },
      { input: 'True', expectedOutput: 'True', isHidden: true, description: 'Condensation equivalence' }
    ],
    hints: ['Cauchy condensation: Σa_n and Σ(2^k·a_{2^k}) behave the same'],
    language: 'python'
  }
];
