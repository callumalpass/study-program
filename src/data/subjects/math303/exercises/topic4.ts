import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  {
    id: 'math303-t4-ex01',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Check Continuity at Point',
    difficulty: 1,
    description: 'Check if f(x) = x² is continuous at x = 2.',
    starterCode: `def is_continuous_polynomial():
    """
    Check if f(x) = x² is continuous at x = 2
    Returns:
        bool: True if continuous
    """
    pass`,
    solution: `def is_continuous_polynomial():
    """
    Check if f(x) = x² is continuous at x = 2
    Returns:
        bool: True if continuous
    """
    # Polynomials are continuous everywhere
    return True`,
    testCases: [
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Polynomial is continuous' },
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Continuous at x=2' },
      { input: '', expectedOutput: 'True', isHidden: true, description: 'All polynomials continuous' }
    ],
    hints: ['Polynomials are continuous at all points'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex02',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Removable Discontinuity',
    difficulty: 2,
    description: 'Check if f(x) = (x²-4)/(x-2) has a removable discontinuity at x = 2.',
    starterCode: `def has_removable_discontinuity():
    """
    Check if f(x) = (x²-4)/(x-2) has removable discontinuity at x=2
    Returns:
        bool: True if removable discontinuity exists
    """
    pass`,
    solution: `def has_removable_discontinuity():
    """
    Check if f(x) = (x²-4)/(x-2) has removable discontinuity at x=2
    Returns:
        bool: True if removable discontinuity exists
    """
    # f(x) = (x-2)(x+2)/(x-2) = x+2 for x ≠ 2
    # lim_{x→2} f(x) = 4 exists, so discontinuity is removable
    return True`,
    testCases: [
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Removable discontinuity' },
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Limit exists at x=2' },
      { input: '', expectedOutput: 'True', isHidden: true, description: 'Can be removed by redefining' }
    ],
    hints: ['Factor the numerator', 'Check if limit exists at x = 2'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex03',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Jump Discontinuity',
    difficulty: 2,
    description: 'Determine if the step function has a jump discontinuity at x = 0.',
    starterCode: `def has_jump_discontinuity():
    """
    Check if f(x) = -1 for x<0, 1 for x≥0 has jump discontinuity at x=0
    Returns:
        bool: True if jump discontinuity exists
    """
    pass`,
    solution: `def has_jump_discontinuity():
    """
    Check if f(x) = -1 for x<0, 1 for x≥0 has jump discontinuity at x=0
    Returns:
        bool: True if jump discontinuity exists
    """
    # lim_{x→0⁻} f(x) = -1, lim_{x→0⁺} f(x) = 1
    # Limits exist but are not equal, so jump discontinuity
    return True`,
    testCases: [
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Jump discontinuity' },
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Left and right limits differ' },
      { input: '', expectedOutput: 'True', isHidden: true, description: 'Step function discontinuity' }
    ],
    hints: ['Check left and right limits at x = 0', 'Jump discontinuity when both exist but differ'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex04',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Epsilon-Delta Definition',
    difficulty: 3,
    description: 'Find δ > 0 such that |f(x) - L| < ε whenever |x - a| < δ for f(x) = 2x at x = 3.',
    starterCode: `def find_delta_linear(epsilon, a=3):
    """
    Find delta for f(x) = 2x at x = 3 given epsilon
    Args:
        epsilon: tolerance
        a: point (default 3)
    Returns:
        float: delta value
    """
    pass`,
    solution: `def find_delta_linear(epsilon, a=3):
    """
    Find delta for f(x) = 2x at x = 3 given epsilon
    Args:
        epsilon: tolerance
        a: point (default 3)
    Returns:
        float: delta value
    """
    # |2x - 6| < ε ⟺ |2(x-3)| < ε ⟺ |x-3| < ε/2
    # So δ = ε/2
    return epsilon / 2.0`,
    testCases: [
      { input: '0.1, 3', expectedOutput: '0.05', isHidden: false, description: 'epsilon = 0.1' },
      { input: '0.02, 3', expectedOutput: '0.01', isHidden: false, description: 'epsilon = 0.02' },
      { input: '1.0, 3', expectedOutput: '0.5', isHidden: true, description: 'epsilon = 1.0' }
    ],
    hints: ['For f(x) = 2x, |f(x) - f(a)| = 2|x - a|', 'Set δ = ε/2'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex05',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Continuity of Composition',
    difficulty: 3,
    description: 'If f and g are continuous, is f(g(x)) continuous?',
    starterCode: `def composition_continuous(f_continuous, g_continuous):
    """
    Check if composition f(g(x)) is continuous
    Args:
        f_continuous: whether f is continuous
        g_continuous: whether g is continuous
    Returns:
        bool: whether f ∘ g is continuous
    """
    pass`,
    solution: `def composition_continuous(f_continuous, g_continuous):
    """
    Check if composition f(g(x)) is continuous
    Args:
        f_continuous: whether f is continuous
        g_continuous: whether g is continuous
    Returns:
        bool: whether f ∘ g is continuous
    """
    # Composition of continuous functions is continuous
    return f_continuous and g_continuous`,
    testCases: [
      { input: 'True, True', expectedOutput: 'True', isHidden: false, description: 'Both continuous' },
      { input: 'True, False', expectedOutput: 'False', isHidden: false, description: 'g not continuous' },
      { input: 'False, True', expectedOutput: 'False', isHidden: true, description: 'f not continuous' }
    ],
    hints: ['Composition of continuous functions is continuous'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex06',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Intermediate Value Theorem',
    difficulty: 3,
    description: 'Use IVT: if f continuous on [a,b] and k between f(a) and f(b), then ∃c: f(c) = k.',
    starterCode: `def ivt_has_root(f_a, f_b):
    """
    Check if continuous f has a root in [a,b] given f(a) and f(b)
    Args:
        f_a: f(a)
        f_b: f(b)
    Returns:
        bool: True if IVT guarantees a root exists
    """
    pass`,
    solution: `def ivt_has_root(f_a, f_b):
    """
    Check if continuous f has a root in [a,b] given f(a) and f(b)
    Args:
        f_a: f(a)
        f_b: f(b)
    Returns:
        bool: True if IVT guarantees a root exists
    """
    # Root exists if f(a) and f(b) have opposite signs
    return f_a * f_b < 0`,
    testCases: [
      { input: '-1, 1', expectedOutput: 'True', isHidden: false, description: 'Opposite signs' },
      { input: '1, 2', expectedOutput: 'False', isHidden: false, description: 'Same sign' },
      { input: '-5, 3', expectedOutput: 'True', isHidden: true, description: 'Root exists' }
    ],
    hints: ['IVT guarantees root if f(a) and f(b) have opposite signs'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex07',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Extreme Value Theorem',
    difficulty: 3,
    description: 'EVT: continuous function on closed interval [a,b] attains max and min.',
    starterCode: `def evt_guarantees_extrema(is_continuous, is_closed_interval):
    """
    Check if EVT guarantees max and min exist
    Args:
        is_continuous: whether function is continuous
        is_closed_interval: whether domain is closed interval
    Returns:
        bool: True if EVT applies
    """
    pass`,
    solution: `def evt_guarantees_extrema(is_continuous, is_closed_interval):
    """
    Check if EVT guarantees max and min exist
    Args:
        is_continuous: whether function is continuous
        is_closed_interval: whether domain is closed interval
    Returns:
        bool: True if EVT applies
    """
    # EVT requires both continuity and closed interval
    return is_continuous and is_closed_interval`,
    testCases: [
      { input: 'True, True', expectedOutput: 'True', isHidden: false, description: 'EVT applies' },
      { input: 'True, False', expectedOutput: 'False', isHidden: false, description: 'Open interval' },
      { input: 'False, True', expectedOutput: 'False', isHidden: true, description: 'Not continuous' }
    ],
    hints: ['EVT requires continuity and closed interval'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex08',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Uniform Continuity Check',
    difficulty: 4,
    description: 'Determine if f(x) = x² is uniformly continuous on [0, 1].',
    starterCode: `def is_uniformly_continuous_bounded():
    """
    Check if f(x) = x² is uniformly continuous on [0,1]
    Returns:
        bool: True if uniformly continuous
    """
    pass`,
    solution: `def is_uniformly_continuous_bounded():
    """
    Check if f(x) = x² is uniformly continuous on [0,1]
    Returns:
        bool: True if uniformly continuous
    """
    # Continuous on closed bounded interval implies uniformly continuous
    return True`,
    testCases: [
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Uniformly continuous' },
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Closed interval property' },
      { input: '', expectedOutput: 'True', isHidden: true, description: 'Compact domain' }
    ],
    hints: ['Continuous on closed bounded interval is uniformly continuous'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex09',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Lipschitz Continuity',
    difficulty: 4,
    description: 'Check if f(x) = 2x satisfies |f(x) - f(y)| ≤ L|x - y| (Lipschitz condition).',
    starterCode: `def lipschitz_constant_linear():
    """
    Find Lipschitz constant L for f(x) = 2x
    Returns:
        float: Lipschitz constant
    """
    pass`,
    solution: `def lipschitz_constant_linear():
    """
    Find Lipschitz constant L for f(x) = 2x
    Returns:
        float: Lipschitz constant
    """
    # |2x - 2y| = 2|x - y|, so L = 2
    return 2.0`,
    testCases: [
      { input: '', expectedOutput: '2.0', isHidden: false, description: 'Lipschitz constant is 2' },
      { input: '', expectedOutput: '2.0', isHidden: false, description: 'Linear function slope' },
      { input: '', expectedOutput: '2.0', isHidden: true, description: 'L = 2 works' }
    ],
    hints: ['For f(x) = 2x, |f(x) - f(y)| = 2|x - y|', 'Lipschitz constant is 2'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex10',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Delta for Quadratic Function',
    difficulty: 4,
    description: 'Find δ for f(x) = x² at x = 2 given ε using epsilon-delta definition.',
    starterCode: `def find_delta_quadratic(epsilon, a=2):
    """
    Find delta for f(x) = x² at x = 2 given epsilon
    Args:
        epsilon: tolerance
        a: point (default 2)
    Returns:
        float: delta value
    """
    pass`,
    solution: `def find_delta_quadratic(epsilon, a=2):
    """
    Find delta for f(x) = x² at x = 2 given epsilon
    Args:
        epsilon: tolerance
        a: point (default 2)
    Returns:
        float: delta value
    """
    # |x² - 4| = |x-2||x+2|
    # For |x-2| < 1, we have 1 < x < 3, so |x+2| < 5
    # |x² - 4| < 5|x-2| < ε if |x-2| < ε/5
    # δ = min(1, ε/5)
    return min(1.0, epsilon / 5.0)`,
    testCases: [
      { input: '0.5, 2', expectedOutput: '0.1', isHidden: false, description: 'epsilon = 0.5' },
      { input: '10.0, 2', expectedOutput: '1.0', isHidden: false, description: 'epsilon = 10' },
      { input: '1.0, 2', expectedOutput: '0.2', isHidden: true, description: 'epsilon = 1.0' }
    ],
    hints: ['Factor |x² - 4| = |x-2||x+2|', 'Bound |x+2| by restricting |x-2| < 1', 'Set δ = min(1, ε/5)'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex11',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Continuity of Absolute Value',
    difficulty: 2,
    description: 'Verify that |x| is continuous at x = 0.',
    starterCode: `def is_abs_continuous():
    """
    Check if |x| is continuous at x = 0
    Returns:
        bool: True if continuous
    """
    pass`,
    solution: `def is_abs_continuous():
    """
    Check if |x| is continuous at x = 0
    Returns:
        bool: True if continuous
    """
    # |x| is continuous everywhere, including x = 0
    return True`,
    testCases: [
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Absolute value continuous' },
      { input: '', expectedOutput: 'True', isHidden: false, description: 'Continuous at origin' },
      { input: '', expectedOutput: 'True', isHidden: true, description: 'All points continuous' }
    ],
    hints: ['|x| is continuous at all points'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex12',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Sequential Continuity',
    difficulty: 4,
    description: 'Verify f continuous at a iff for all sequences x_n → a, we have f(x_n) → f(a).',
    starterCode: `def sequential_continuity(x_n_converges_to_a, f_xn_converges_to_fa):
    """
    Check sequential criterion for continuity
    Args:
        x_n_converges_to_a: whether all sequences x_n → a
        f_xn_converges_to_fa: whether f(x_n) → f(a) for all such sequences
    Returns:
        bool: whether f is continuous at a
    """
    pass`,
    solution: `def sequential_continuity(x_n_converges_to_a, f_xn_converges_to_fa):
    """
    Check sequential criterion for continuity
    Args:
        x_n_converges_to_a: whether all sequences x_n → a
        f_xn_converges_to_fa: whether f(x_n) → f(a) for all such sequences
    Returns:
        bool: whether f is continuous at a
    """
    # Sequential criterion: both conditions must hold
    return x_n_converges_to_a and f_xn_converges_to_fa`,
    testCases: [
      { input: 'True, True', expectedOutput: 'True', isHidden: false, description: 'Sequential continuity' },
      { input: 'True, False', expectedOutput: 'False', isHidden: false, description: 'Not continuous' },
      { input: 'False, True', expectedOutput: 'False', isHidden: true, description: 'Condition fails' }
    ],
    hints: ['f continuous at a iff x_n → a implies f(x_n) → f(a)'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex13',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'One-Sided Continuity',
    difficulty: 3,
    description: 'Check if f is right-continuous at x = 0 (lim_{x→0⁺} f(x) = f(0)).',
    starterCode: `def is_right_continuous(right_limit, f_0):
    """
    Check if f is right-continuous at x = 0
    Args:
        right_limit: lim_{x→0⁺} f(x)
        f_0: f(0)
    Returns:
        bool: True if right-continuous
    """
    pass`,
    solution: `def is_right_continuous(right_limit, f_0):
    """
    Check if f is right-continuous at x = 0
    Args:
        right_limit: lim_{x→0⁺} f(x)
        f_0: f(0)
    Returns:
        bool: True if right-continuous
    """
    # Right-continuous if right limit equals function value
    return right_limit == f_0`,
    testCases: [
      { input: '5, 5', expectedOutput: 'True', isHidden: false, description: 'Right-continuous' },
      { input: '3, 5', expectedOutput: 'False', isHidden: false, description: 'Limits differ' },
      { input: '0, 0', expectedOutput: 'True', isHidden: true, description: 'Both zero' }
    ],
    hints: ['Right-continuous if lim_{x→a⁺} f(x) = f(a)'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex14',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Continuity on Domain',
    difficulty: 4,
    description: 'Determine the largest domain where f(x) = 1/(x-2) is continuous.',
    starterCode: `def continuity_domain_rational():
    """
    Find where f(x) = 1/(x-2) is continuous
    Returns:
        str: description of domain
    """
    pass`,
    solution: `def continuity_domain_rational():
    """
    Find where f(x) = 1/(x-2) is continuous
    Returns:
        str: description of domain
    """
    # Continuous everywhere except x = 2
    return "(-∞, 2) ∪ (2, ∞)"`,
    testCases: [
      { input: '', expectedOutput: '"(-∞, 2) ∪ (2, ∞)"', isHidden: false, description: 'All reals except 2' },
      { input: '', expectedOutput: '"(-∞, 2) ∪ (2, ∞)"', isHidden: false, description: 'Undefined at x=2' },
      { input: '', expectedOutput: '"(-∞, 2) ∪ (2, ∞)"', isHidden: true, description: 'Domain of continuity' }
    ],
    hints: ['Function undefined where denominator is zero', 'Continuous everywhere else'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex15',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Fixed Point Theorem',
    difficulty: 5,
    description: 'If f: [0,1] → [0,1] is continuous, then ∃c: f(c) = c (fixed point).',
    starterCode: `def has_fixed_point(is_continuous, maps_to_self):
    """
    Check if fixed point theorem applies
    Args:
        is_continuous: whether f is continuous
        maps_to_self: whether f([0,1]) ⊆ [0,1]
    Returns:
        bool: True if fixed point guaranteed
    """
    pass`,
    solution: `def has_fixed_point(is_continuous, maps_to_self):
    """
    Check if fixed point theorem applies
    Args:
        is_continuous: whether f is continuous
        maps_to_self: whether f([0,1]) ⊆ [0,1]
    Returns:
        bool: True if fixed point guaranteed
    """
    # Fixed point theorem requires both conditions
    return is_continuous and maps_to_self`,
    testCases: [
      { input: 'True, True', expectedOutput: 'True', isHidden: false, description: 'Fixed point exists' },
      { input: 'True, False', expectedOutput: 'False', isHidden: false, description: 'Does not map to self' },
      { input: 'False, True', expectedOutput: 'False', isHidden: true, description: 'Not continuous' }
    ],
    hints: ['Fixed point theorem applies to continuous f: [a,b] → [a,b]', 'Use IVT on g(x) = f(x) - x'],
    language: 'python'
  },
  {
    id: 'math303-t4-ex16',
    subjectId: 'math303',
    topicId: 'math303-topic-4',
    title: 'Uniform Continuity on Unbounded',
    difficulty: 5,
    description: 'Determine if f(x) = x² is uniformly continuous on [0, ∞).',
    starterCode: `def is_uniformly_continuous_unbounded():
    """
    Check if f(x) = x² is uniformly continuous on [0, ∞)
    Returns:
        bool: True if uniformly continuous
    """
    pass`,
    solution: `def is_uniformly_continuous_unbounded():
    """
    Check if f(x) = x² is uniformly continuous on [0, ∞)
    Returns:
        bool: True if uniformly continuous
    """
    # f(x) = x² is not uniformly continuous on [0, ∞)
    # |x² - y²| = |x-y||x+y| can be large even for small |x-y|
    return False`,
    testCases: [
      { input: '', expectedOutput: 'False', isHidden: false, description: 'Not uniformly continuous' },
      { input: '', expectedOutput: 'False', isHidden: false, description: 'Unbounded derivative' },
      { input: '', expectedOutput: 'False', isHidden: true, description: 'Fails on unbounded domain' }
    ],
    hints: ['Check |f(x) - f(y)| for x, y far from origin', 'Derivative grows without bound'],
    language: 'python'
  }
];
