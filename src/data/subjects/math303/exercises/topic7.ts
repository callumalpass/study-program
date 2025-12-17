import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'math303-t7-ex01',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Pointwise Convergence Check',
    difficulty: 1,
    description: 'Check if f_n(x) = x^n converges pointwise on [0,1].',
    starterCode: `def pointwise_limit(x):
    """
    Find pointwise limit of f_n(x) = x^n on [0,1]
    Args:
        x: point in [0,1]
    Returns:
        float: lim_{n→∞} x^n
    """
    pass`,
    solution: `def pointwise_limit(x):
    """
    Find pointwise limit of f_n(x) = x^n on [0,1]
    Args:
        x: point in [0,1]
    Returns:
        float: lim_{n→∞} x^n
    """
    # For x ∈ [0,1): x^n → 0
    # For x = 1: x^n → 1
    if x < 1:
        return 0.0
    else:
        return 1.0`,
    testCases: [
      { input: '0.5', expectedOutput: '0.0', isHidden: false, description: 'x < 1' },
      { input: '1', expectedOutput: '1.0', isHidden: false, description: 'x = 1' },
      { input: '0.9', expectedOutput: '0.0', isHidden: true, description: 'x = 0.9' }
    ],
    hints: ['For |x| < 1, x^n → 0', 'For x = 1, x^n → 1'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex02',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Uniform Convergence Definition',
    difficulty: 2,
    description: 'Check uniform convergence: for all ε > 0, ∃N: n ≥ N ⟹ |f_n(x) - f(x)| < ε for all x.',
    starterCode: `def is_uniformly_convergent(sup_difference, epsilon):
    """
    Check if sup|f_n(x) - f(x)| < epsilon
    Args:
        sup_difference: sup_x |f_n(x) - f(x)|
        epsilon: tolerance
    Returns:
        bool: True if uniformly convergent for this epsilon
    """
    pass`,
    solution: `def is_uniformly_convergent(sup_difference, epsilon):
    """
    Check if sup|f_n(x) - f(x)| < epsilon
    Args:
        sup_difference: sup_x |f_n(x) - f(x)|
        epsilon: tolerance
    Returns:
        bool: True if uniformly convergent for this epsilon
    """
    # Uniform convergence requires sup difference < epsilon
    return sup_difference < epsilon`,
    testCases: [
      { input: '0.01, 0.1', expectedOutput: 'True', isHidden: false, description: 'Sup less than epsilon' },
      { input: '0.5, 0.1', expectedOutput: 'False', isHidden: false, description: 'Sup exceeds epsilon' },
      { input: '0.0001, 0.001', expectedOutput: 'True', isHidden: true, description: 'Small difference' }
    ],
    hints: ['Uniform if sup_x |f_n(x) - f(x)| → 0'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex03',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Weierstrass M-Test',
    difficulty: 3,
    description: 'Apply M-test: if |f_n(x)| ≤ M_n and ΣM_n converges, then Σf_n converges uniformly.',
    starterCode: `def weierstrass_m_test(M_n_converges):
    """
    Check if series converges uniformly using M-test
    Args:
        M_n_converges: whether ΣM_n converges
    Returns:
        bool: True if M-test guarantees uniform convergence
    """
    pass`,
    solution: `def weierstrass_m_test(M_n_converges):
    """
    Check if series converges uniformly using M-test
    Args:
        M_n_converges: whether ΣM_n converges
    Returns:
        bool: True if M-test guarantees uniform convergence
    """
    # If ΣM_n converges, then Σf_n converges uniformly
    return M_n_converges`,
    testCases: [
      { input: 'True', expectedOutput: 'True', isHidden: false, description: 'M-test applies' },
      { input: 'False', expectedOutput: 'False', isHidden: false, description: 'M-test fails' },
      { input: 'True', expectedOutput: 'True', isHidden: true, description: 'Uniform convergence' }
    ],
    hints: ['M-test: |f_n| ≤ M_n and ΣM_n converges ⟹ Σf_n uniformly convergent'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex04',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Uniform Convergence vs Pointwise',
    difficulty: 3,
    description: 'Determine if f_n(x) = x/n converges uniformly on [0,1].',
    starterCode: `def uniform_convergence_x_over_n():
    """
    Check if f_n(x) = x/n converges uniformly on [0,1]
    Returns:
        tuple: (uniformly_convergent: bool, limit_function: str)
    """
    pass`,
    solution: `def uniform_convergence_x_over_n():
    """
    Check if f_n(x) = x/n converges uniformly on [0,1]
    Returns:
        tuple: (uniformly_convergent: bool, limit_function: str)
    """
    # Pointwise limit: lim x/n = 0 for all x
    # sup_x |x/n - 0| = 1/n → 0
    # So converges uniformly to f(x) = 0
    return (True, "f(x) = 0")`,
    testCases: [
      { input: '', expectedOutput: '(True, "f(x) = 0")', isHidden: false, description: 'Uniform to zero' },
      { input: '', expectedOutput: '(True, "f(x) = 0")', isHidden: false, description: 'Supremum vanishes' },
      { input: '', expectedOutput: '(True, "f(x) = 0")', isHidden: true, description: 'Uniform convergence holds' }
    ],
    hints: ['Find sup_x |f_n(x) - f(x)|', 'For f_n(x) = x/n, sup on [0,1] is 1/n'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex05',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Non-Uniform Convergence Example',
    difficulty: 3,
    description: 'Show f_n(x) = x^n does not converge uniformly on [0,1].',
    starterCode: `def non_uniform_convergence():
    """
    Check if f_n(x) = x^n converges uniformly on [0,1]
    Returns:
        bool: True if uniformly convergent
    """
    pass`,
    solution: `def non_uniform_convergence():
    """
    Check if f_n(x) = x^n converges uniformly on [0,1]
    Returns:
        bool: True if uniformly convergent
    """
    # Pointwise limit: f(x) = 0 for x<1, f(1)=1 (discontinuous)
    # Uniform convergence preserves continuity
    # Since f_n continuous but f discontinuous, not uniform
    return False`,
    testCases: [
      { input: '', expectedOutput: 'False', isHidden: false, description: 'Not uniformly convergent' },
      { input: '', expectedOutput: 'False', isHidden: false, description: 'Limit is discontinuous' },
      { input: '', expectedOutput: 'False', isHidden: true, description: 'Fails uniform convergence' }
    ],
    hints: ['Pointwise limit is discontinuous', 'Uniform convergence preserves continuity'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex06',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Continuity Preservation',
    difficulty: 4,
    description: 'If f_n continuous and f_n → f uniformly, then f is continuous.',
    starterCode: `def uniform_preserves_continuity(f_n_continuous, converges_uniformly):
    """
    Check if limit function is continuous
    Args:
        f_n_continuous: whether each f_n is continuous
        converges_uniformly: whether convergence is uniform
    Returns:
        bool: True if f is continuous
    """
    pass`,
    solution: `def uniform_preserves_continuity(f_n_continuous, converges_uniformly):
    """
    Check if limit function is continuous
    Args:
        f_n_continuous: whether each f_n is continuous
        converges_uniformly: whether convergence is uniform
    Returns:
        bool: True if f is continuous
    """
    # Uniform convergence of continuous functions preserves continuity
    return f_n_continuous and converges_uniformly`,
    testCases: [
      { input: 'True, True', expectedOutput: 'True', isHidden: false, description: 'Limit is continuous' },
      { input: 'True, False', expectedOutput: 'False', isHidden: false, description: 'Pointwise may not preserve' },
      { input: 'False, True', expectedOutput: 'False', isHidden: true, description: 'Functions not continuous' }
    ],
    hints: ['Uniform convergence preserves continuity', 'Pointwise convergence does not necessarily preserve it'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex07',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Integration and Uniform Convergence',
    difficulty: 4,
    description: 'If f_n → f uniformly, then ∫f_n → ∫f.',
    starterCode: `def uniform_integration(int_f_n, converges_uniformly):
    """
    Check if ∫f_n → ∫f
    Args:
        int_f_n: sequence of ∫f_n values
        converges_uniformly: whether f_n → f uniformly
    Returns:
        bool: True if can conclude ∫f_n → ∫f
    """
    pass`,
    solution: `def uniform_integration(int_f_n, converges_uniformly):
    """
    Check if ∫f_n → ∫f
    Args:
        int_f_n: sequence of ∫f_n values
        converges_uniformly: whether f_n → f uniformly
    Returns:
        bool: True if can conclude ∫f_n → ∫f
    """
    # Uniform convergence allows interchange: lim ∫f_n = ∫ lim f_n
    return converges_uniformly`,
    testCases: [
      { input: '[1, 2, 3], True', expectedOutput: 'True', isHidden: false, description: 'Can interchange limit and integral' },
      { input: '[1, 2, 3], False', expectedOutput: 'False', isHidden: false, description: 'Cannot guarantee interchange' },
      { input: '[0.5, 0.6, 0.7], True', expectedOutput: 'True', isHidden: true, description: 'Uniform convergence sufficient' }
    ],
    hints: ['Uniform convergence allows: lim ∫f_n = ∫ lim f_n'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex08',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Differentiation and Uniform Convergence',
    difficulty: 4,
    description: 'If f_n\' → g uniformly and f_n → f pointwise, then f\' = g.',
    starterCode: `def uniform_differentiation(derivatives_converge_uniformly, functions_converge):
    """
    Check if can conclude f' = g
    Args:
        derivatives_converge_uniformly: whether f_n' → g uniformly
        functions_converge: whether f_n → f
    Returns:
        bool: True if f' = g
    """
    pass`,
    solution: `def uniform_differentiation(derivatives_converge_uniformly, functions_converge):
    """
    Check if can conclude f' = g
    Args:
        derivatives_converge_uniformly: whether f_n' → g uniformly
        functions_converge: whether f_n → f
    Returns:
        bool: True if f' = g
    """
    # Requires uniform convergence of DERIVATIVES
    return derivatives_converge_uniformly and functions_converge`,
    testCases: [
      { input: 'True, True', expectedOutput: 'True', isHidden: false, description: 'Can interchange limit and derivative' },
      { input: 'False, True', expectedOutput: 'False', isHidden: false, description: 'Derivatives must converge uniformly' },
      { input: 'True, False', expectedOutput: 'False', isHidden: true, description: 'Functions must converge' }
    ],
    hints: ['Need uniform convergence of f_n\' to interchange limit and derivative'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex09',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Power Series Convergence',
    difficulty: 4,
    description: 'Determine radius of convergence for Σx^n/n.',
    starterCode: `def radius_of_convergence():
    """
    Find radius of convergence for Σ(x^n/n)
    Returns:
        float: radius R
    """
    pass`,
    solution: `def radius_of_convergence():
    """
    Find radius of convergence for Σ(x^n/n)
    Returns:
        float: radius R
    """
    # Use ratio test: lim |a_{n+1}/a_n| = lim |n/(n+1)| = 1
    # R = 1/L = 1/1 = 1
    return 1.0`,
    testCases: [
      { input: '', expectedOutput: '1.0', isHidden: false, description: 'Radius is 1' },
      { input: '', expectedOutput: '1.0', isHidden: false, description: 'Converges for |x| < 1' },
      { input: '', expectedOutput: '1.0', isHidden: true, description: 'R = 1' }
    ],
    hints: ['Use ratio test or root test', 'R = 1/lim|a_{n+1}/a_n|'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex10',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Uniform Convergence on Compact Sets',
    difficulty: 4,
    description: 'Power series converges uniformly on compact subsets of its interval of convergence.',
    starterCode: `def uniform_on_compact(x, R):
    """
    Check if power series with radius R converges uniformly at x
    Args:
        x: point to check
        R: radius of convergence
    Returns:
        bool: True if x in region of uniform convergence
    """
    pass`,
    solution: `def uniform_on_compact(x, R):
    """
    Check if power series with radius R converges uniformly at x
    Args:
        x: point to check
        R: radius of convergence
    Returns:
        bool: True if x in region of uniform convergence
    """
    # Converges uniformly on compact subsets, e.g., |x| ≤ r < R
    # For simplicity, check if |x| < R (strict inequality)
    return abs(x) < R`,
    testCases: [
      { input: '0.5, 1', expectedOutput: 'True', isHidden: false, description: 'Inside radius' },
      { input: '1.5, 1', expectedOutput: 'False', isHidden: false, description: 'Outside radius' },
      { input: '0.9, 1', expectedOutput: 'True', isHidden: true, description: 'Near boundary' }
    ],
    hints: ['Power series converges uniformly on compact subsets of (-R, R)'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex11',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Cauchy Criterion for Uniform Convergence',
    difficulty: 5,
    description: 'f_n converges uniformly iff for all ε > 0, ∃N: m,n ≥ N ⟹ sup|f_m(x) - f_n(x)| < ε.',
    starterCode: `def cauchy_criterion_uniform(sup_diff, epsilon):
    """
    Check Cauchy criterion for uniform convergence
    Args:
        sup_diff: sup_x |f_m(x) - f_n(x)| for large m, n
        epsilon: tolerance
    Returns:
        bool: True if Cauchy criterion satisfied
    """
    pass`,
    solution: `def cauchy_criterion_uniform(sup_diff, epsilon):
    """
    Check Cauchy criterion for uniform convergence
    Args:
        sup_diff: sup_x |f_m(x) - f_n(x)| for large m, n
        epsilon: tolerance
    Returns:
        bool: True if Cauchy criterion satisfied
    """
    # Cauchy: sup difference < epsilon for large m, n
    return sup_diff < epsilon`,
    testCases: [
      { input: '0.001, 0.01', expectedOutput: 'True', isHidden: false, description: 'Cauchy criterion holds' },
      { input: '0.1, 0.01', expectedOutput: 'False', isHidden: false, description: 'Fails Cauchy criterion' },
      { input: '0.0001, 0.001', expectedOutput: 'True', isHidden: true, description: 'Small supremum' }
    ],
    hints: ['Cauchy: sup_x |f_m - f_n| → 0 as m,n → ∞'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex12',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Dini\'s Theorem',
    difficulty: 5,
    description: 'If f_n continuous, f_n ↓ f pointwise on compact K, and f continuous, then f_n → f uniformly.',
    starterCode: `def dinis_theorem(is_decreasing, is_compact, f_n_continuous, f_continuous):
    """
    Check if Dini's theorem guarantees uniform convergence
    Args:
        is_decreasing: whether f_n ↓ (monotone decreasing)
        is_compact: whether domain is compact
        f_n_continuous: whether each f_n is continuous
        f_continuous: whether f is continuous
    Returns:
        bool: True if Dini's theorem applies
    """
    pass`,
    solution: `def dinis_theorem(is_decreasing, is_compact, f_n_continuous, f_continuous):
    """
    Check if Dini's theorem guarantees uniform convergence
    Args:
        is_decreasing: whether f_n ↓ (monotone decreasing)
        is_compact: whether domain is compact
        f_n_continuous: whether each f_n is continuous
        f_continuous: whether f is continuous
    Returns:
        bool: True if Dini's theorem applies
    """
    # Dini: all four conditions required
    return is_decreasing and is_compact and f_n_continuous and f_continuous`,
    testCases: [
      { input: 'True, True, True, True', expectedOutput: 'True', isHidden: false, description: 'All conditions met' },
      { input: 'True, False, True, True', expectedOutput: 'False', isHidden: false, description: 'Not compact' },
      { input: 'False, True, True, True', expectedOutput: 'False', isHidden: true, description: 'Not monotone' }
    ],
    hints: ['Dini requires: monotone, compact, all continuous'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex13',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Arzela-Ascoli Theorem Setup',
    difficulty: 5,
    description: 'Check if sequence is equicontinuous and uniformly bounded.',
    starterCode: `def arzela_ascoli_conditions(is_equicontinuous, is_uniformly_bounded):
    """
    Check if Arzela-Ascoli conditions are met
    Args:
        is_equicontinuous: whether family is equicontinuous
        is_uniformly_bounded: whether family is uniformly bounded
    Returns:
        bool: True if has convergent subsequence
    """
    pass`,
    solution: `def arzela_ascoli_conditions(is_equicontinuous, is_uniformly_bounded):
    """
    Check if Arzela-Ascoli conditions are met
    Args:
        is_equicontinuous: whether family is equicontinuous
        is_uniformly_bounded: whether family is uniformly bounded
    Returns:
        bool: True if has convergent subsequence
    """
    # Arzela-Ascoli: equicontinuous + uniformly bounded ⟹ has uniformly convergent subsequence
    return is_equicontinuous and is_uniformly_bounded`,
    testCases: [
      { input: 'True, True', expectedOutput: 'True', isHidden: false, description: 'Both conditions met' },
      { input: 'True, False', expectedOutput: 'False', isHidden: false, description: 'Not uniformly bounded' },
      { input: 'False, True', expectedOutput: 'False', isHidden: true, description: 'Not equicontinuous' }
    ],
    hints: ['Arzela-Ascoli requires both equicontinuity and uniform boundedness'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex14',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Stone-Weierstrass Application',
    difficulty: 5,
    description: 'Polynomials are dense in C[a,b] (continuous functions on [a,b]).',
    starterCode: `def can_approximate_with_polynomials(is_continuous, on_closed_interval):
    """
    Check if function can be uniformly approximated by polynomials
    Args:
        is_continuous: whether function is continuous
        on_closed_interval: whether on closed bounded interval
    Returns:
        bool: True if Stone-Weierstrass applies
    """
    pass`,
    solution: `def can_approximate_with_polynomials(is_continuous, on_closed_interval):
    """
    Check if function can be uniformly approximated by polynomials
    Args:
        is_continuous: whether function is continuous
        on_closed_interval: whether on closed bounded interval
    Returns:
        bool: True if Stone-Weierstrass applies
    """
    # Stone-Weierstrass: continuous on compact ⟹ can approximate with polynomials
    return is_continuous and on_closed_interval`,
    testCases: [
      { input: 'True, True', expectedOutput: 'True', isHidden: false, description: 'Can approximate' },
      { input: 'True, False', expectedOutput: 'False', isHidden: false, description: 'Not on closed interval' },
      { input: 'False, True', expectedOutput: 'False', isHidden: true, description: 'Not continuous' }
    ],
    hints: ['Stone-Weierstrass: polynomials dense in C[a,b]'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex15',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Uniform Norm Convergence',
    difficulty: 5,
    description: 'Compute ||f_n - f||_∞ = sup_x |f_n(x) - f(x)|.',
    starterCode: `def uniform_norm(f_n_values, f_values):
    """
    Compute ||f_n - f||_∞
    Args:
        f_n_values: list of f_n(x_i) values
        f_values: list of f(x_i) values at same points
    Returns:
        float: supremum of |f_n - f|
    """
    pass`,
    solution: `def uniform_norm(f_n_values, f_values):
    """
    Compute ||f_n - f||_∞
    Args:
        f_n_values: list of f_n(x_i) values
        f_values: list of f(x_i) values at same points
    Returns:
        float: supremum of |f_n - f|
    """
    # ||f_n - f||_∞ = max |f_n(x) - f(x)|
    differences = [abs(fn - f) for fn, f in zip(f_n_values, f_values)]
    return max(differences)`,
    testCases: [
      { input: '[1, 2, 3], [1.1, 1.9, 3.2]', expectedOutput: '0.2', isHidden: false, description: 'Maximum difference' },
      { input: '[0, 0.5, 1], [0, 0.5, 1]', expectedOutput: '0', isHidden: false, description: 'Identical functions' },
      { input: '[2, 4, 6], [1, 3, 5]', expectedOutput: '1', isHidden: true, description: 'Constant difference' }
    ],
    hints: ['||f||_∞ = sup_x |f(x)|', 'Take maximum of absolute differences'],
    language: 'python'
  },
  {
    id: 'math303-t7-ex16',
    subjectId: 'math303',
    topicId: 'math303-topic-7',
    title: 'Series Uniform Convergence',
    difficulty: 5,
    description: 'Determine if Σ(x^n/n!) converges uniformly on any bounded interval.',
    starterCode: `def series_uniform_convergence():
    """
    Check if Σ(x^n/n!) converges uniformly on bounded intervals
    Returns:
        bool: True if uniformly convergent on any bounded interval
    """
    pass`,
    solution: `def series_uniform_convergence():
    """
    Check if Σ(x^n/n!) converges uniformly on bounded intervals
    Returns:
        bool: True if uniformly convergent on any bounded interval
    """
    # Power series for e^x converges uniformly on compact subsets
    # On any bounded interval [-M, M], can apply M-test
    return True`,
    testCases: [
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Uniformly convergent' },
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Power series for e^x' },
      { input: '', expectedOutput: 'True', isHidden: true, description: 'Uniform on compacts' }
    ],
    hints: ['Power series converges uniformly on compact subsets', 'Use M-test with M_n = M^n/n!'],
    language: 'python'
  }
];
