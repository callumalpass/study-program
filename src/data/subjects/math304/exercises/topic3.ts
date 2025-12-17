import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'math304-t3-ex01',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Compose Two Permutations',
    difficulty: 1,
    description: 'Compose two permutations given in list notation. Permutation composition applies right to left: (fg)(x) = f(g(x)).',
    starterCode: `def compose_permutations(f, g):
    """
    Compose permutations f and g (apply g then f).

    Args:
        f: First permutation as list where f[i] is image of i
        g: Second permutation as list where g[i] is image of i

    Returns:
        Composition f∘g as list
    """
    pass`,
    solution: `def compose_permutations(f, g):
    """
    Compose permutations f and g (apply g then f).

    Args:
        f: First permutation as list where f[i] is image of i
        g: Second permutation as list where g[i] is image of i

    Returns:
        Composition f∘g as list
    """
    n = len(f)
    result = []

    for i in range(n):
        # Apply g first, then f
        result.append(f[g[i]])

    return result`,
    testCases: [
      { input: '[1, 2, 0], [2, 0, 1]', expectedOutput: '[0, 1, 2]', isHidden: false, description: 'Compose two 3-cycles' },
      { input: '[1, 0, 2, 3], [0, 1, 3, 2]', expectedOutput: '[1, 0, 3, 2]', isHidden: false, description: 'Compose transpositions' },
      { input: '[2, 0, 1], [1, 2, 0]', expectedOutput: '[1, 2, 0]', isHidden: true, description: 'Composition of cycles' }
    ],
    hints: ['Apply g first, then apply f to the result', 'result[i] = f[g[i]]'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex02',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Find Permutation Inverse',
    difficulty: 2,
    description: 'Find the inverse of a permutation. The inverse satisfies f∘f^(-1) = f^(-1)∘f = identity.',
    starterCode: `def permutation_inverse(perm):
    """
    Find the inverse of a permutation.

    Args:
        perm: Permutation as list where perm[i] is image of i

    Returns:
        Inverse permutation as list
    """
    pass`,
    solution: `def permutation_inverse(perm):
    """
    Find the inverse of a permutation.

    Args:
        perm: Permutation as list where perm[i] is image of i

    Returns:
        Inverse permutation as list
    """
    n = len(perm)
    inverse = [0] * n

    for i in range(n):
        inverse[perm[i]] = i

    return inverse`,
    testCases: [
      { input: '[1, 2, 0]', expectedOutput: '[2, 0, 1]', isHidden: false, description: 'Inverse of 3-cycle' },
      { input: '[1, 0, 2, 3]', expectedOutput: '[1, 0, 2, 3]', isHidden: false, description: 'Transposition is self-inverse' },
      { input: '[3, 0, 1, 2]', expectedOutput: '[1, 2, 3, 0]', isHidden: true, description: 'Inverse of 4-cycle' }
    ],
    hints: ['If perm[i] = j, then inverse[j] = i', 'The inverse "undoes" the permutation'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex03',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Convert to Cycle Notation',
    difficulty: 3,
    description: 'Convert a permutation from list notation to cycle notation. Express as list of disjoint cycles.',
    starterCode: `def to_cycle_notation(perm):
    """
    Convert permutation to cycle notation.

    Args:
        perm: Permutation as list where perm[i] is image of i

    Returns:
        List of cycles (each cycle is a list of elements)
    """
    pass`,
    solution: `def to_cycle_notation(perm):
    """
    Convert permutation to cycle notation.

    Args:
        perm: Permutation as list where perm[i] is image of i

    Returns:
        List of cycles (each cycle is a list of elements)
    """
    n = len(perm)
    visited = [False] * n
    cycles = []

    for i in range(n):
        if not visited[i]:
            cycle = []
            current = i

            while not visited[current]:
                visited[current] = True
                cycle.append(current)
                current = perm[current]

            # Only include non-trivial cycles (length > 1)
            if len(cycle) > 1:
                cycles.append(cycle)

    return cycles`,
    testCases: [
      { input: '[1, 2, 0, 3]', expectedOutput: '[[0, 1, 2]]', isHidden: false, description: 'One 3-cycle' },
      { input: '[1, 0, 3, 2]', expectedOutput: '[[0, 1], [2, 3]]', isHidden: false, description: 'Two transpositions' },
      { input: '[2, 0, 3, 1]', expectedOutput: '[[0, 2, 3, 1]]', isHidden: true, description: 'One 4-cycle' }
    ],
    hints: ['Follow each element to see where it goes', 'Stop when you return to the starting element', 'Skip fixed points (1-cycles)'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex04',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Convert from Cycle Notation',
    difficulty: 2,
    description: 'Convert a permutation from cycle notation to list notation.',
    starterCode: `def from_cycle_notation(cycles, n):
    """
    Convert cycle notation to list notation.

    Args:
        cycles: List of cycles (each cycle is a list of elements)
        n: Size of the permutation

    Returns:
        Permutation as list
    """
    pass`,
    solution: `def from_cycle_notation(cycles, n):
    """
    Convert cycle notation to list notation.

    Args:
        cycles: List of cycles (each cycle is a list of elements)
        n: Size of the permutation

    Returns:
        Permutation as list
    """
    perm = list(range(n))  # Start with identity

    for cycle in cycles:
        if len(cycle) > 1:
            # Map each element to the next in the cycle
            for i in range(len(cycle)):
                perm[cycle[i]] = cycle[(i + 1) % len(cycle)]

    return perm`,
    testCases: [
      { input: '[[0, 1, 2]], 4', expectedOutput: '[1, 2, 0, 3]', isHidden: false, description: '3-cycle on 4 elements' },
      { input: '[[0, 1], [2, 3]], 4', expectedOutput: '[1, 0, 3, 2]', isHidden: false, description: 'Two transpositions' },
      { input: '[[0, 2, 3, 1]], 4', expectedOutput: '[2, 0, 3, 1]', isHidden: true, description: '4-cycle' }
    ],
    hints: ['Start with identity permutation', 'For each cycle, map each element to the next', 'Last element maps to first'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex05',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Find Permutation Order',
    difficulty: 3,
    description: 'Find the order of a permutation. The order is the smallest positive integer k such that applying the permutation k times gives the identity.',
    starterCode: `def permutation_order(perm):
    """
    Find the order of a permutation.

    Args:
        perm: Permutation as list where perm[i] is image of i

    Returns:
        Order of the permutation
    """
    pass`,
    solution: `def permutation_order(perm):
    """
    Find the order of a permutation.

    Args:
        perm: Permutation as list where perm[i] is image of i

    Returns:
        Order of the permutation
    """
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    def lcm(a, b):
        return (a * b) // gcd(a, b)

    n = len(perm)
    visited = [False] * n
    cycle_lengths = []

    # Find all cycle lengths
    for i in range(n):
        if not visited[i]:
            length = 0
            current = i

            while not visited[current]:
                visited[current] = True
                length += 1
                current = perm[current]

            cycle_lengths.append(length)

    # Order is LCM of all cycle lengths
    result = 1
    for length in cycle_lengths:
        result = lcm(result, length)

    return result`,
    testCases: [
      { input: '[1, 2, 0, 3]', expectedOutput: '3', isHidden: false, description: 'Order of 3-cycle' },
      { input: '[1, 0, 3, 2]', expectedOutput: '2', isHidden: false, description: 'Order of product of transpositions' },
      { input: '[1, 2, 3, 0, 5, 4]', expectedOutput: '4', isHidden: true, description: 'LCM of cycles (2,2) = 4' }
    ],
    hints: ['Find cycle decomposition', 'Order is LCM of cycle lengths', 'Use LCM because cycles are disjoint'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex06',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Check Permutation Parity',
    difficulty: 3,
    description: 'Determine if a permutation is even or odd. A permutation is even if it can be expressed as product of an even number of transpositions.',
    starterCode: `def is_even_permutation(perm):
    """
    Check if permutation is even.

    Args:
        perm: Permutation as list where perm[i] is image of i

    Returns:
        True if even, False if odd
    """
    pass`,
    solution: `def is_even_permutation(perm):
    """
    Check if permutation is even.

    Args:
        perm: Permutation as list where perm[i] is image of i

    Returns:
        True if even, False if odd
    """
    n = len(perm)
    visited = [False] * n
    num_cycles = 0

    # Count number of cycles
    for i in range(n):
        if not visited[i]:
            current = i
            while not visited[current]:
                visited[current] = True
                current = perm[current]
            num_cycles += 1

    # A permutation is even iff (n - number_of_cycles) is even
    return (n - num_cycles) % 2 == 0`,
    testCases: [
      { input: '[1, 2, 0]', expectedOutput: 'True', isHidden: false, description: '3-cycle is even' },
      { input: '[1, 0, 2]', expectedOutput: 'False', isHidden: false, description: 'Transposition is odd' },
      { input: '[1, 0, 3, 2]', expectedOutput: 'True', isHidden: true, description: 'Product of two transpositions is even' }
    ],
    hints: ['Count the number of cycles (including fixed points)', 'Permutation is even iff (n - cycles) is even', 'Cycle of length k needs k-1 transpositions'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex07',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Compute Permutation Power',
    difficulty: 2,
    description: 'Compute the k-th power of a permutation (apply it k times).',
    starterCode: `def permutation_power(perm, k):
    """
    Compute perm^k (apply permutation k times).

    Args:
        perm: Permutation as list where perm[i] is image of i
        k: Non-negative integer exponent

    Returns:
        Result of applying perm k times
    """
    pass`,
    solution: `def permutation_power(perm, k):
    """
    Compute perm^k (apply permutation k times).

    Args:
        perm: Permutation as list where perm[i] is image of i
        k: Non-negative integer exponent

    Returns:
        Result of applying perm k times
    """
    n = len(perm)
    result = list(range(n))  # Identity

    for _ in range(k):
        new_result = []
        for i in range(n):
            new_result.append(result[perm[i]])
        result = new_result

    return result`,
    testCases: [
      { input: '[1, 2, 0], 2', expectedOutput: '[2, 0, 1]', isHidden: false, description: '3-cycle squared' },
      { input: '[1, 2, 0], 3', expectedOutput: '[0, 1, 2]', isHidden: false, description: '3-cycle cubed is identity' },
      { input: '[1, 0, 2, 3], 2', expectedOutput: '[0, 1, 2, 3]', isHidden: true, description: 'Transposition squared is identity' }
    ],
    hints: ['Start with identity permutation', 'Apply the permutation k times', 'Optimize by using order if needed'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex08',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Count Inversions',
    difficulty: 2,
    description: 'Count the number of inversions in a permutation. An inversion is a pair (i,j) where i < j but perm[i] > perm[j].',
    starterCode: `def count_inversions(perm):
    """
    Count inversions in a permutation.

    Args:
        perm: Permutation as list

    Returns:
        Number of inversions
    """
    pass`,
    solution: `def count_inversions(perm):
    """
    Count inversions in a permutation.

    Args:
        perm: Permutation as list

    Returns:
        Number of inversions
    """
    count = 0
    n = len(perm)

    for i in range(n):
        for j in range(i + 1, n):
            if perm[i] > perm[j]:
                count += 1

    return count`,
    testCases: [
      { input: '[2, 1, 0]', expectedOutput: '3', isHidden: false, description: 'Reverse has maximum inversions' },
      { input: '[0, 1, 2]', expectedOutput: '0', isHidden: false, description: 'Identity has no inversions' },
      { input: '[1, 0, 2, 3]', expectedOutput: '1', isHidden: true, description: 'One transposition' }
    ],
    hints: ['Check all pairs (i,j) where i < j', 'Count pairs where perm[i] > perm[j]', 'Parity of inversions matches parity of permutation'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex09',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Generate Symmetric Group',
    difficulty: 4,
    description: 'Generate all permutations of n elements (the symmetric group Sn).',
    starterCode: `def generate_symmetric_group(n):
    """
    Generate all permutations of {0, 1, ..., n-1}.

    Args:
        n: Size of the set

    Returns:
        List of all permutations (each permutation is a list)
    """
    pass`,
    solution: `def generate_symmetric_group(n):
    """
    Generate all permutations of {0, 1, ..., n-1}.

    Args:
        n: Size of the set

    Returns:
        List of all permutations (each permutation is a list)
    """
    def permute(arr, start, result):
        if start == len(arr):
            result.append(arr[:])
            return

        for i in range(start, len(arr)):
            arr[start], arr[i] = arr[i], arr[start]
            permute(arr, start + 1, result)
            arr[start], arr[i] = arr[i], arr[start]

    result = []
    permute(list(range(n)), 0, result)
    return sorted(result)`,
    testCases: [
      { input: '2', expectedOutput: '[[0, 1], [1, 0]]', isHidden: false, description: 'S2 has 2 permutations' },
      { input: '3', expectedOutput: '[[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]', isHidden: false, description: 'S3 has 6 permutations' },
      { input: '1', expectedOutput: '[[0]]', isHidden: true, description: 'S1 has 1 permutation' }
    ],
    hints: ['Use recursive backtracking', 'Swap elements to generate permutations', '|Sn| = n!'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex10',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Find Conjugate Permutation',
    difficulty: 4,
    description: 'Compute the conjugate of permutation σ by τ: τστ^(-1). Conjugation preserves cycle structure.',
    starterCode: `def conjugate_permutation(sigma, tau):
    """
    Compute τστ^(-1).

    Args:
        sigma: Permutation to conjugate
        tau: Conjugating permutation

    Returns:
        Conjugated permutation
    """
    pass`,
    solution: `def conjugate_permutation(sigma, tau):
    """
    Compute τστ^(-1).

    Args:
        sigma: Permutation to conjugate
        tau: Conjugating permutation

    Returns:
        Conjugated permutation
    """
    n = len(sigma)

    # Find tau inverse
    tau_inv = [0] * n
    for i in range(n):
        tau_inv[tau[i]] = i

    # Compute tau * sigma * tau_inv
    result = []
    for i in range(n):
        # Apply tau_inv, then sigma, then tau
        result.append(tau[sigma[tau_inv[i]]])

    return result`,
    testCases: [
      { input: '[1, 2, 0], [0, 2, 1]', expectedOutput: '[2, 0, 1]', isHidden: false, description: 'Conjugate 3-cycle' },
      { input: '[1, 0, 2, 3], [2, 3, 0, 1]', expectedOutput: '[3, 2, 0, 1]', isHidden: false, description: 'Conjugate transposition' },
      { input: '[1, 0, 2], [1, 2, 0]', expectedOutput: '[0, 2, 1]', isHidden: true, description: 'Conjugation changes cycle' }
    ],
    hints: ['Compute τστ^(-1) by composing three permutations', 'First find inverse of τ', 'Conjugation preserves cycle type'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex11',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Find Cycle Type',
    difficulty: 2,
    description: 'Determine the cycle type of a permutation. Cycle type is a partition describing the lengths of disjoint cycles.',
    starterCode: `def cycle_type(perm):
    """
    Find cycle type of permutation.

    Args:
        perm: Permutation as list

    Returns:
        Sorted list of cycle lengths (descending order)
    """
    pass`,
    solution: `def cycle_type(perm):
    """
    Find cycle type of permutation.

    Args:
        perm: Permutation as list

    Returns:
        Sorted list of cycle lengths (descending order)
    """
    n = len(perm)
    visited = [False] * n
    lengths = []

    for i in range(n):
        if not visited[i]:
            length = 0
            current = i

            while not visited[current]:
                visited[current] = True
                length += 1
                current = perm[current]

            lengths.append(length)

    return sorted(lengths, reverse=True)`,
    testCases: [
      { input: '[1, 2, 0, 4, 3]', expectedOutput: '[3, 2]', isHidden: false, description: 'Cycle type (3,2)' },
      { input: '[1, 0, 3, 2]', expectedOutput: '[2, 2]', isHidden: false, description: 'Cycle type (2,2)' },
      { input: '[0, 1, 2, 3]', expectedOutput: '[1, 1, 1, 1]', isHidden: true, description: 'Identity has all 1-cycles' }
    ],
    hints: ['Find all cycles including fixed points', 'Return sorted list of cycle lengths', 'Usually sorted in descending order'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex12',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Check if Permutations Commute',
    difficulty: 2,
    description: 'Determine if two permutations commute (σ∘τ = τ∘σ). Disjoint cycles always commute.',
    starterCode: `def permutations_commute(sigma, tau):
    """
    Check if two permutations commute.

    Args:
        sigma: First permutation
        tau: Second permutation

    Returns:
        True if they commute, False otherwise
    """
    pass`,
    solution: `def permutations_commute(sigma, tau):
    """
    Check if two permutations commute.

    Args:
        sigma: First permutation
        tau: Second permutation

    Returns:
        True if they commute, False otherwise
    """
    n = len(sigma)

    # Compute sigma * tau
    sigma_tau = []
    for i in range(n):
        sigma_tau.append(sigma[tau[i]])

    # Compute tau * sigma
    tau_sigma = []
    for i in range(n):
        tau_sigma.append(tau[sigma[i]])

    return sigma_tau == tau_sigma`,
    testCases: [
      { input: '[1, 2, 0, 3], [0, 1, 2, 3]', expectedOutput: 'True', isHidden: false, description: 'Anything commutes with identity' },
      { input: '[1, 0, 2, 3], [0, 1, 3, 2]', expectedOutput: 'True', isHidden: false, description: 'Disjoint cycles commute' },
      { input: '[1, 0, 2, 3], [1, 2, 0, 3]', expectedOutput: 'False', isHidden: true, description: 'Non-disjoint cycles do not commute' }
    ],
    hints: ['Compute both compositions σ∘τ and τ∘σ', 'Check if they are equal', 'Disjoint cycles always commute'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex13',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Express as Product of Transpositions',
    difficulty: 3,
    description: 'Express a permutation as a product of transpositions (2-cycles).',
    starterCode: `def to_transpositions(perm):
    """
    Express permutation as product of transpositions.

    Args:
        perm: Permutation as list

    Returns:
        List of transpositions (each transposition is a 2-element list)
    """
    pass`,
    solution: `def to_transpositions(perm):
    """
    Express permutation as product of transpositions.

    Args:
        perm: Permutation as list

    Returns:
        List of transpositions (each transposition is a 2-element list)
    """
    n = len(perm)
    visited = [False] * n
    transpositions = []

    for i in range(n):
        if not visited[i]:
            cycle = []
            current = i

            while not visited[current]:
                visited[current] = True
                cycle.append(current)
                current = perm[current]

            # Convert cycle to transpositions
            # (a b c d) = (a b)(a c)(a d)
            if len(cycle) > 1:
                for j in range(len(cycle) - 1, 0, -1):
                    transpositions.append([cycle[0], cycle[j]])

    return transpositions`,
    testCases: [
      { input: '[1, 2, 0]', expectedOutput: '[[0, 2], [0, 1]]', isHidden: false, description: '3-cycle = 2 transpositions' },
      { input: '[1, 0, 2, 3]', expectedOutput: '[[0, 1]]', isHidden: false, description: 'Transposition is already transposition' },
      { input: '[0, 1, 2]', expectedOutput: '[]', isHidden: true, description: 'Identity has no transpositions' }
    ],
    hints: ['Convert each cycle to transpositions', 'Cycle (a b c) = (a c)(a b)', 'Apply transpositions right to left'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex14',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Find Centralizer of Permutation',
    difficulty: 5,
    description: 'Find all permutations that commute with a given permutation. This is the centralizer in the symmetric group.',
    starterCode: `def centralizer(perm, n):
    """
    Find all permutations that commute with perm.

    Args:
        perm: Permutation as list
        n: Size of symmetric group

    Returns:
        List of all permutations that commute with perm
    """
    pass`,
    solution: `def centralizer(perm, n):
    """
    Find all permutations that commute with perm.

    Args:
        perm: Permutation as list
        n: Size of symmetric group

    Returns:
        List of all permutations that commute with perm
    """
    def generate_permutations(arr, start, result):
        if start == len(arr):
            result.append(arr[:])
            return
        for i in range(start, len(arr)):
            arr[start], arr[i] = arr[i], arr[start]
            generate_permutations(arr, start + 1, result)
            arr[start], arr[i] = arr[i], arr[start]

    # Generate all permutations
    all_perms = []
    generate_permutations(list(range(n)), 0, all_perms)

    # Filter those that commute
    centralizer_perms = []

    for tau in all_perms:
        # Check if perm * tau == tau * perm
        perm_tau = [perm[tau[i]] for i in range(n)]
        tau_perm = [tau[perm[i]] for i in range(n)]

        if perm_tau == tau_perm:
            centralizer_perms.append(tau)

    return sorted(centralizer_perms)`,
    testCases: [
      { input: '[1, 0, 2], 3', expectedOutput: '[[0, 1, 2], [1, 0, 2]]', isHidden: false, description: 'Centralizer of transposition' },
      { input: '[0, 1, 2], 3', expectedOutput: '[[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]', isHidden: false, description: 'Centralizer of identity is whole group' },
      { input: '[1, 0], 2', expectedOutput: '[[0, 1], [1, 0]]', isHidden: true, description: 'Centralizer in S2' }
    ],
    hints: ['Generate all permutations', 'Test each for commutativity with given permutation', 'Warning: expensive for n > 4'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex15',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Count Fixed Points',
    difficulty: 1,
    description: 'Count the number of fixed points of a permutation. A fixed point is an element i where perm[i] = i.',
    starterCode: `def count_fixed_points(perm):
    """
    Count fixed points of permutation.

    Args:
        perm: Permutation as list

    Returns:
        Number of fixed points
    """
    pass`,
    solution: `def count_fixed_points(perm):
    """
    Count fixed points of permutation.

    Args:
        perm: Permutation as list

    Returns:
        Number of fixed points
    """
    count = 0
    for i in range(len(perm)):
        if perm[i] == i:
            count += 1
    return count`,
    testCases: [
      { input: '[0, 1, 2, 3]', expectedOutput: '4', isHidden: false, description: 'Identity fixes everything' },
      { input: '[1, 0, 2, 3]', expectedOutput: '2', isHidden: false, description: 'Transposition fixes 2 points' },
      { input: '[2, 0, 1]', expectedOutput: '0', isHidden: true, description: '3-cycle has no fixed points' }
    ],
    hints: ['Check each position i', 'Count where perm[i] == i'],
    language: 'python'
  },
  {
    id: 'math304-t3-ex16',
    subjectId: 'math304',
    topicId: 'math304-topic-3',
    title: 'Check Alternating Group Membership',
    difficulty: 2,
    description: 'Determine if a permutation belongs to the alternating group An (subgroup of even permutations).',
    starterCode: `def in_alternating_group(perm):
    """
    Check if permutation is in the alternating group.

    Args:
        perm: Permutation as list

    Returns:
        True if permutation is even, False if odd
    """
    pass`,
    solution: `def in_alternating_group(perm):
    """
    Check if permutation is in the alternating group.

    Args:
        perm: Permutation as list

    Returns:
        True if permutation is even, False if odd
    """
    n = len(perm)
    visited = [False] * n
    num_cycles = 0

    for i in range(n):
        if not visited[i]:
            current = i
            while not visited[current]:
                visited[current] = True
                current = perm[current]
            num_cycles += 1

    # Even iff (n - num_cycles) is even
    return (n - num_cycles) % 2 == 0`,
    testCases: [
      { input: '[1, 2, 0]', expectedOutput: 'True', isHidden: false, description: '3-cycle is even' },
      { input: '[1, 0, 2, 3]', expectedOutput: 'False', isHidden: false, description: 'Single transposition is odd' },
      { input: '[1, 0, 3, 2]', expectedOutput: 'True', isHidden: true, description: 'Two transpositions is even' }
    ],
    hints: ['Count cycles (including 1-cycles)', 'Permutation is even iff (n - cycle_count) is even', 'Alternating group An consists of all even permutations'],
    language: 'python'
  }
];
