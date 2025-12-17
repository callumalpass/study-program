import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  {
    id: 'math304-t4-ex01',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Compute Left Coset',
    difficulty: 2,
    description: 'Compute the left coset gH = {g*h : h in H} of a subgroup H by element g.',
    starterCode: `def left_coset(g, subgroup, elements, operation_table):
    """
    Compute left coset gH.

    Args:
        g: Group element
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        Sorted list of elements in gH
    """
    pass`,
    solution: `def left_coset(g, subgroup, elements, operation_table):
    """
    Compute left coset gH.

    Args:
        g: Group element
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        Sorted list of elements in gH
    """
    coset = []
    g_index = elements.index(g)

    for h in subgroup:
        h_index = elements.index(h)
        product = operation_table[g_index][h_index]
        coset.append(product)

    return sorted(coset)`,
    testCases: [
      { input: '1, [0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: '[1, 3]', isHidden: false, description: 'Left coset 1H in Z4' },
      { input: '2, [0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]]', expectedOutput: '[2, 5]', isHidden: false, description: 'Left coset in Z6' },
      { input: '0, [0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: '[0, 2]', isHidden: true, description: '0H = H' }
    ],
    hints: ['Multiply g by each element in H', 'Use the operation table for multiplication', 'gH consists of all products g*h'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex02',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Compute Right Coset',
    difficulty: 2,
    description: 'Compute the right coset Hg = {h*g : h in H} of a subgroup H by element g.',
    starterCode: `def right_coset(g, subgroup, elements, operation_table):
    """
    Compute right coset Hg.

    Args:
        g: Group element
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        Sorted list of elements in Hg
    """
    pass`,
    solution: `def right_coset(g, subgroup, elements, operation_table):
    """
    Compute right coset Hg.

    Args:
        g: Group element
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        Sorted list of elements in Hg
    """
    coset = []
    g_index = elements.index(g)

    for h in subgroup:
        h_index = elements.index(h)
        product = operation_table[h_index][g_index]
        coset.append(product)

    return sorted(coset)`,
    testCases: [
      { input: '1, [0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: '[1, 3]', isHidden: false, description: 'Right coset H1 in Z4 (abelian)' },
      { input: '2, [0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]]', expectedOutput: '[2, 5]', isHidden: false, description: 'Right coset in Z6' },
      { input: '1, [0], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: '[1]', isHidden: true, description: 'Right coset of trivial subgroup' }
    ],
    hints: ['Multiply each element in H by g', 'Order matters: compute h*g not g*h', 'In abelian groups, left and right cosets are equal'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex03',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Find All Left Cosets',
    difficulty: 3,
    description: 'Find all distinct left cosets of a subgroup H in a group G.',
    starterCode: `def all_left_cosets(subgroup, elements, operation_table):
    """
    Find all distinct left cosets of H.

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        List of cosets (each coset is a sorted list)
    """
    pass`,
    solution: `def all_left_cosets(subgroup, elements, operation_table):
    """
    Find all distinct left cosets of H.

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        List of cosets (each coset is a sorted list)
    """
    cosets = []
    seen = set()

    for g in elements:
        coset = []
        g_index = elements.index(g)

        for h in subgroup:
            h_index = elements.index(h)
            product = operation_table[g_index][h_index]
            coset.append(product)

        coset_tuple = tuple(sorted(coset))

        if coset_tuple not in seen:
            seen.add(coset_tuple)
            cosets.append(sorted(coset))

    return sorted(cosets)`,
    testCases: [
      { input: '[0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: '[[0, 2], [1, 3]]', isHidden: false, description: 'Left cosets of <2> in Z4' },
      { input: '[0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]]', expectedOutput: '[[0, 3], [1, 4], [2, 5]]', isHidden: false, description: 'Three cosets in Z6' },
      { input: '[0], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: '[[0], [1], [2]]', isHidden: true, description: 'Trivial subgroup gives all singletons' }
    ],
    hints: ['Compute gH for each g in G', 'Remove duplicate cosets', 'Number of cosets is |G|/|H|'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex04',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Verify Lagrange Theorem',
    difficulty: 2,
    description: 'Verify Lagrange\'s theorem: |G| = |H| × [G:H], where [G:H] is the index (number of cosets).',
    starterCode: `def verify_lagrange(subgroup, elements, operation_table):
    """
    Verify Lagrange's theorem for the given subgroup.

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        Tuple (|G|, |H|, [G:H], lagrange_holds)
    """
    pass`,
    solution: `def verify_lagrange(subgroup, elements, operation_table):
    """
    Verify Lagrange's theorem for the given subgroup.

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        Tuple (|G|, |H|, [G:H], lagrange_holds)
    """
    g_order = len(elements)
    h_order = len(subgroup)

    # Count distinct cosets
    seen = set()
    for g in elements:
        coset = []
        g_index = elements.index(g)

        for h in subgroup:
            h_index = elements.index(h)
            product = operation_table[g_index][h_index]
            coset.append(product)

        seen.add(tuple(sorted(coset)))

    index = len(seen)
    lagrange_holds = (g_order == h_order * index)

    return (g_order, h_order, index, lagrange_holds)`,
    testCases: [
      { input: '[0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: '(4, 2, 2, True)', isHidden: false, description: 'Lagrange holds: 4 = 2 × 2' },
      { input: '[0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]]', expectedOutput: '(6, 2, 3, True)', isHidden: false, description: 'Lagrange holds: 6 = 2 × 3' },
      { input: '[0], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: '(3, 1, 3, True)', isHidden: true, description: 'Trivial subgroup: 3 = 1 × 3' }
    ],
    hints: ['Count group order |G|', 'Count subgroup order |H|', 'Count number of distinct cosets [G:H]', 'Check if |G| = |H| × [G:H]'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex05',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Check if Subgroup is Normal',
    difficulty: 3,
    description: 'Check if a subgroup H is normal (gH = Hg for all g). Normal subgroups have left and right cosets equal.',
    starterCode: `def is_normal_subgroup(subgroup, elements, operation_table):
    """
    Check if H is a normal subgroup.

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        True if H is normal, False otherwise
    """
    pass`,
    solution: `def is_normal_subgroup(subgroup, elements, operation_table):
    """
    Check if H is a normal subgroup.

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        True if H is normal, False otherwise
    """
    for g in elements:
        g_index = elements.index(g)

        # Compute left coset gH
        left_coset = set()
        for h in subgroup:
            h_index = elements.index(h)
            left_coset.add(operation_table[g_index][h_index])

        # Compute right coset Hg
        right_coset = set()
        for h in subgroup:
            h_index = elements.index(h)
            right_coset.add(operation_table[h_index][g_index])

        if left_coset != right_coset:
            return False

    return True`,
    testCases: [
      { input: '[0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: 'True', isHidden: false, description: 'All subgroups of abelian groups are normal' },
      { input: '[0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]]', expectedOutput: 'True', isHidden: false, description: 'Subgroup of Z6 is normal' },
      { input: '[0], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: 'True', isHidden: true, description: 'Trivial subgroup is always normal' }
    ],
    hints: ['Check gH = Hg for all g in G', 'In abelian groups, all subgroups are normal', 'Equivalently, check if gHg^(-1) = H'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex06',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Compute Quotient Group',
    difficulty: 4,
    description: 'Construct the quotient group G/H when H is a normal subgroup. Elements are cosets, operation is (aH)(bH) = (ab)H.',
    starterCode: `def quotient_group(subgroup, elements, operation_table):
    """
    Construct quotient group G/H.

    Args:
        subgroup: List of elements in normal subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        Tuple (coset_list, quotient_table) where coset_list[i] is the i-th coset
    """
    pass`,
    solution: `def quotient_group(subgroup, elements, operation_table):
    """
    Construct quotient group G/H.

    Args:
        subgroup: List of elements in normal subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        Tuple (coset_list, quotient_table) where coset_list[i] is the i-th coset
    """
    # Find all distinct cosets
    cosets = []
    seen = set()
    coset_map = {}

    for g in elements:
        coset = []
        g_index = elements.index(g)

        for h in subgroup:
            h_index = elements.index(h)
            product = operation_table[g_index][h_index]
            coset.append(product)

        coset_tuple = tuple(sorted(coset))

        if coset_tuple not in seen:
            seen.add(coset_tuple)
            cosets.append(sorted(coset))

        # Map each element to its coset index
        for elem in coset:
            coset_map[elem] = len(cosets) - 1

    # Build quotient operation table
    n = len(cosets)
    quotient_table = [[0] * n for _ in range(n)]

    for i in range(n):
        for j in range(n):
            # Pick representatives
            rep_i = cosets[i][0]
            rep_j = cosets[j][0]

            # Multiply in G
            rep_i_idx = elements.index(rep_i)
            rep_j_idx = elements.index(rep_j)
            product = operation_table[rep_i_idx][rep_j_idx]

            # Find which coset the product belongs to
            quotient_table[i][j] = coset_map[product]

    return (cosets, quotient_table)`,
    testCases: [
      { input: '[0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: '([[0, 2], [1, 3]], [[0, 1], [1, 0]])', isHidden: false, description: 'Z4/<2> ≅ Z2' },
      { input: '[0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]]', expectedOutput: '([[0, 3], [1, 4], [2, 5]], [[0, 1, 2], [1, 2, 0], [2, 0, 1]])', isHidden: false, description: 'Z6/<3> ≅ Z3' },
      { input: '[0, 1, 2], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: '([[0, 1, 2]], [[0]])', isHidden: true, description: 'G/G is trivial' }
    ],
    hints: ['Find all cosets of H', 'Define operation on cosets: (aH)(bH) = (ab)H', 'Build Cayley table for quotient group'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex07',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Find Coset Representative',
    difficulty: 1,
    description: 'Given an element, find a canonical representative of its coset (typically the smallest element).',
    starterCode: `def coset_representative(element, subgroup, elements, operation_table):
    """
    Find canonical representative of coset containing element.

    Args:
        element: Group element
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        Smallest element in the coset containing element
    """
    pass`,
    solution: `def coset_representative(element, subgroup, elements, operation_table):
    """
    Find canonical representative of coset containing element.

    Args:
        element: Group element
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        Smallest element in the coset containing element
    """
    # Find which coset element belongs to
    for g in elements:
        coset = []
        g_index = elements.index(g)

        for h in subgroup:
            h_index = elements.index(h)
            product = operation_table[g_index][h_index]
            coset.append(product)

        if element in coset:
            return min(coset)

    return None`,
    testCases: [
      { input: '3, [0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: '1', isHidden: false, description: '3 is in coset {1, 3}' },
      { input: '5, [0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]]', expectedOutput: '2', isHidden: false, description: '5 is in coset {2, 5}' },
      { input: '2, [0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: '0', isHidden: true, description: '2 is in H itself' }
    ],
    hints: ['Find which coset contains the element', 'Return the minimum element in that coset', 'If element in H, representative is min(H)'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex08',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Check Coset Equality',
    difficulty: 2,
    description: 'Determine if two elements generate the same left coset: aH = bH iff a^(-1)b in H.',
    starterCode: `def same_coset(a, b, subgroup, elements, operation_table, identity):
    """
    Check if a and b are in the same left coset of H.

    Args:
        a, b: Group elements
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation
        identity: Identity element

    Returns:
        True if aH = bH, False otherwise
    """
    pass`,
    solution: `def same_coset(a, b, subgroup, elements, operation_table, identity):
    """
    Check if a and b are in the same left coset of H.

    Args:
        a, b: Group elements
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation
        identity: Identity element

    Returns:
        True if aH = bH, False otherwise
    """
    # Find a^(-1)
    a_index = elements.index(a)
    a_inv = None
    for i in range(len(elements)):
        if operation_table[a_index][i] == identity:
            a_inv = elements[i]
            break

    # Compute a^(-1) * b
    a_inv_index = elements.index(a_inv)
    b_index = elements.index(b)
    product = operation_table[a_inv_index][b_index]

    # Check if product is in H
    return product in subgroup`,
    testCases: [
      { input: '1, 3, [0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: 'True', isHidden: false, description: '1H = 3H in Z4' },
      { input: '1, 2, [0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: 'False', isHidden: false, description: '1H ≠ 2H in Z4' },
      { input: '0, 2, [0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: 'True', isHidden: true, description: 'Both in H' }
    ],
    hints: ['aH = bH iff a^(-1)b ∈ H', 'Find inverse of a', 'Compute a^(-1)b and check membership in H'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex09',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Compute Index of Subgroup',
    difficulty: 1,
    description: 'Calculate the index [G:H], which is the number of distinct left (or right) cosets of H in G.',
    starterCode: `def subgroup_index(subgroup, elements, operation_table):
    """
    Compute index [G:H].

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        Index [G:H]
    """
    pass`,
    solution: `def subgroup_index(subgroup, elements, operation_table):
    """
    Compute index [G:H].

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        Index [G:H]
    """
    seen = set()

    for g in elements:
        coset = []
        g_index = elements.index(g)

        for h in subgroup:
            h_index = elements.index(h)
            product = operation_table[g_index][h_index]
            coset.append(product)

        seen.add(tuple(sorted(coset)))

    return len(seen)`,
    testCases: [
      { input: '[0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: '2', isHidden: false, description: '[Z4:<2>] = 2' },
      { input: '[0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]]', expectedOutput: '3', isHidden: false, description: '[Z6:<3>] = 3' },
      { input: '[0, 1, 2], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: '1', isHidden: true, description: '[G:G] = 1' }
    ],
    hints: ['Count distinct left cosets', 'By Lagrange, [G:H] = |G|/|H|', 'Number of left cosets equals number of right cosets'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex10',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Find All Subgroups of Given Index',
    difficulty: 4,
    description: 'Find all subgroups of a specific index in a group.',
    starterCode: `def subgroups_of_index(n, elements, operation_table, identity):
    """
    Find all subgroups with index n.

    Args:
        n: Desired index
        elements: List of all group elements
        operation_table: 2D list representing group operation
        identity: Identity element

    Returns:
        List of subgroups (each as sorted list) with index n
    """
    pass`,
    solution: `def subgroups_of_index(n, elements, operation_table, identity):
    """
    Find all subgroups with index n.

    Args:
        n: Desired index
        elements: List of all group elements
        operation_table: 2D list representing group operation
        identity: Identity element

    Returns:
        List of subgroups (each as sorted list) with index n
    """
    from itertools import combinations

    group_order = len(elements)
    subgroup_order = group_order // n

    if group_order % n != 0:
        return []

    result = []

    # Try all subsets of the right size
    for subset in combinations(elements, subgroup_order):
        if identity not in subset:
            continue

        # Check if it's a subgroup
        subset_set = set(subset)

        # Check closure
        is_closed = True
        for a in subset:
            for b in subset:
                a_idx = elements.index(a)
                b_idx = elements.index(b)
                if operation_table[a_idx][b_idx] not in subset_set:
                    is_closed = False
                    break
            if not is_closed:
                break

        if not is_closed:
            continue

        # Check inverses
        has_inverses = True
        for a in subset:
            has_inv = False
            a_idx = elements.index(a)
            for b in subset:
                b_idx = elements.index(b)
                if operation_table[a_idx][b_idx] == identity:
                    has_inv = True
                    break
            if not has_inv:
                has_inverses = False
                break

        if is_closed and has_inverses:
            result.append(sorted(list(subset)))

    return result`,
    testCases: [
      { input: '2, [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: '[[0, 2]]', isHidden: false, description: 'Subgroup of index 2 in Z4' },
      { input: '3, [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]], 0', expectedOutput: '[[0, 2, 4], [0, 3]]', isHidden: false, description: 'Two subgroups of index 3 in Z6' },
      { input: '1, [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], 0', expectedOutput: '[[0, 1, 2]]', isHidden: true, description: 'Only G has index 1' }
    ],
    hints: ['Index n means subgroup has order |G|/n', 'Try all subsets of correct size', 'Verify subgroup axioms'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex11',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Coset Partition',
    difficulty: 2,
    description: 'Verify that cosets partition the group (every element in exactly one coset).',
    starterCode: `def verify_coset_partition(subgroup, elements, operation_table):
    """
    Verify cosets partition the group.

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        True if cosets partition G, False otherwise
    """
    pass`,
    solution: `def verify_coset_partition(subgroup, elements, operation_table):
    """
    Verify cosets partition the group.

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        True if cosets partition G, False otherwise
    """
    all_coset_elements = set()

    # Collect all cosets
    seen_cosets = set()

    for g in elements:
        coset = []
        g_index = elements.index(g)

        for h in subgroup:
            h_index = elements.index(h)
            product = operation_table[g_index][h_index]
            coset.append(product)

        coset_tuple = tuple(sorted(coset))

        if coset_tuple not in seen_cosets:
            seen_cosets.add(coset_tuple)

            # Check for overlap
            coset_set = set(coset)
            if all_coset_elements & coset_set:
                return False

            all_coset_elements.update(coset_set)

    # Check all elements covered
    return all_coset_elements == set(elements)`,
    testCases: [
      { input: '[0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: 'True', isHidden: false, description: 'Cosets partition Z4' },
      { input: '[0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]]', expectedOutput: 'True', isHidden: false, description: 'Cosets partition Z6' },
      { input: '[0], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: 'True', isHidden: true, description: 'Trivial subgroup partitions' }
    ],
    hints: ['Cosets are either disjoint or equal', 'Union of all cosets should equal G', 'No element should appear in multiple distinct cosets'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex12',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Apply Lagrange to Element Orders',
    difficulty: 2,
    description: 'Use Lagrange\'s theorem to verify that element orders divide group order.',
    starterCode: `def verify_order_divides(elements, operation_table, identity):
    """
    Verify all element orders divide group order.

    Args:
        elements: List of all group elements
        operation_table: 2D list representing group operation
        identity: Identity element

    Returns:
        True if all element orders divide |G|, False otherwise
    """
    pass`,
    solution: `def verify_order_divides(elements, operation_table, identity):
    """
    Verify all element orders divide group order.

    Args:
        elements: List of all group elements
        operation_table: 2D list representing group operation
        identity: Identity element

    Returns:
        True if all element orders divide |G|, False otherwise
    """
    n = len(elements)

    for element in elements:
        current = element
        order = 1

        while current != identity:
            element_index = elements.index(element)
            current_index = elements.index(current)
            current = operation_table[current_index][element_index]
            order += 1

            if order > n:
                return False

        # Check if order divides n
        if n % order != 0:
            return False

    return True`,
    testCases: [
      { input: '[0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: 'True', isHidden: false, description: 'Orders in Z4: {1,2,4} all divide 4' },
      { input: '[0, 1, 2, 3, 4], [[0, 1, 2, 3, 4], [1, 2, 3, 4, 0], [2, 3, 4, 0, 1], [3, 4, 0, 1, 2], [4, 0, 1, 2, 3]], 0', expectedOutput: 'True', isHidden: false, description: 'Orders in Z5: {1,5} all divide 5' },
      { input: '[0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], 0', expectedOutput: 'True', isHidden: true, description: 'Orders in Z3: {1,3} all divide 3' }
    ],
    hints: ['Compute order of each element', 'Check if |G| is divisible by each order', 'This is consequence of Lagrange theorem'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex13',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Find Normalizer of Subgroup',
    difficulty: 4,
    description: 'Find the normalizer N(H) = {g in G : gHg^(-1) = H}. This is the largest subgroup in which H is normal.',
    starterCode: `def normalizer(subgroup, elements, operation_table, identity):
    """
    Find normalizer of subgroup H.

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation
        identity: Identity element

    Returns:
        Sorted list of elements in N(H)
    """
    pass`,
    solution: `def normalizer(subgroup, elements, operation_table, identity):
    """
    Find normalizer of subgroup H.

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation
        identity: Identity element

    Returns:
        Sorted list of elements in N(H)
    """
    normalizer_elements = []
    subgroup_set = set(subgroup)

    for g in elements:
        g_index = elements.index(g)

        # Find g^(-1)
        g_inv = None
        for i in range(len(elements)):
            if operation_table[g_index][i] == identity:
                g_inv = elements[i]
                break

        g_inv_index = elements.index(g_inv)

        # Compute gHg^(-1)
        conjugate = set()
        for h in subgroup:
            h_index = elements.index(h)
            # Compute g * h * g^(-1)
            gh = operation_table[g_index][h_index]
            gh_index = elements.index(gh)
            ghg_inv = operation_table[gh_index][g_inv_index]
            conjugate.add(ghg_inv)

        # Check if conjugate equals H
        if conjugate == subgroup_set:
            normalizer_elements.append(g)

    return sorted(normalizer_elements)`,
    testCases: [
      { input: '[0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: '[0, 1, 2, 3]', isHidden: false, description: 'In abelian group, N(H) = G' },
      { input: '[0], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], 0', expectedOutput: '[0, 1, 2]', isHidden: false, description: 'N({e}) = G' },
      { input: '[0, 1, 2], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], 0', expectedOutput: '[0, 1, 2]', isHidden: true, description: 'N(G) = G' }
    ],
    hints: ['For each g, check if gHg^(-1) = H', 'Compute conjugate of H by g', 'H is always in its normalizer'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex14',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Check Subgroup Index is Prime',
    difficulty: 2,
    description: 'If [G:H] is prime, check that H is maximal (no proper subgroup between H and G).',
    starterCode: `def is_prime(n):
    """Check if n is prime."""
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def index_is_prime(subgroup, elements, operation_table):
    """
    Check if index [G:H] is prime.

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        True if [G:H] is prime, False otherwise
    """
    pass`,
    solution: `def is_prime(n):
    """Check if n is prime."""
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def index_is_prime(subgroup, elements, operation_table):
    """
    Check if index [G:H] is prime.

    Args:
        subgroup: List of elements in subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        True if [G:H] is prime, False otherwise
    """
    # Count distinct cosets
    seen = set()

    for g in elements:
        coset = []
        g_index = elements.index(g)

        for h in subgroup:
            h_index = elements.index(h)
            product = operation_table[g_index][h_index]
            coset.append(product)

        seen.add(tuple(sorted(coset)))

    index = len(seen)
    return is_prime(index)`,
    testCases: [
      { input: '[0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]]', expectedOutput: 'True', isHidden: false, description: '[Z6:<3>] = 3 is prime' },
      { input: '[0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: 'True', isHidden: false, description: '[Z4:<2>] = 2 is prime' },
      { input: '[0], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]]', expectedOutput: 'False', isHidden: true, description: '[Z4:{e}] = 4 is not prime' }
    ],
    hints: ['Compute index [G:H] = |G|/|H|', 'Check if index is prime', 'If index is prime, H is maximal'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex15',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Double Coset Decomposition',
    difficulty: 5,
    description: 'Given subgroups H and K, compute the double coset decomposition: G = union of HgK.',
    starterCode: `def double_cosets(subgroup_h, subgroup_k, elements, operation_table):
    """
    Find all double cosets HgK.

    Args:
        subgroup_h: List of elements in subgroup H
        subgroup_k: List of elements in subgroup K
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        List of double cosets (each as sorted list)
    """
    pass`,
    solution: `def double_cosets(subgroup_h, subgroup_k, elements, operation_table):
    """
    Find all double cosets HgK.

    Args:
        subgroup_h: List of elements in subgroup H
        subgroup_k: List of elements in subgroup K
        elements: List of all group elements
        operation_table: 2D list representing group operation

    Returns:
        List of double cosets (each as sorted list)
    """
    cosets = []
    seen = set()

    for g in elements:
        double_coset = set()
        g_index = elements.index(g)

        # Compute HgK
        for h in subgroup_h:
            h_index = elements.index(h)
            hg = operation_table[h_index][g_index]
            hg_index = elements.index(hg)

            for k in subgroup_k:
                k_index = elements.index(k)
                hgk = operation_table[hg_index][k_index]
                double_coset.add(hgk)

        coset_tuple = tuple(sorted(double_coset))

        if coset_tuple not in seen:
            seen.add(coset_tuple)
            cosets.append(sorted(list(double_coset)))

    return sorted(cosets)`,
    testCases: [
      { input: '[0, 2], [0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]]', expectedOutput: '[[0, 1, 2, 3, 4, 5]]', isHidden: false, description: 'Single double coset in Z6' },
      { input: '[0], [0], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: '[[0], [1], [2]]', isHidden: false, description: 'Trivial subgroups give singletons' },
      { input: '[0, 1], [0, 1], [0, 1], [[0, 1], [1, 0]]', expectedOutput: '[[0, 1]]', isHidden: true, description: 'H=K=G gives one coset' }
    ],
    hints: ['For each g, compute HgK = {hgk : h∈H, k∈K}', 'Remove duplicate double cosets', 'Double cosets partition G'],
    language: 'python'
  },
  {
    id: 'math304-t4-ex16',
    subjectId: 'math304',
    topicId: 'math304-topic-4',
    title: 'Verify Correspondence Theorem',
    difficulty: 5,
    description: 'For normal subgroup H, verify the correspondence between subgroups of G containing H and subgroups of G/H.',
    starterCode: `def correspondence_theorem(normal_subgroup, elements, operation_table, identity):
    """
    Find subgroups containing H and corresponding subgroups of G/H.

    Args:
        normal_subgroup: List of elements in normal subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation
        identity: Identity element

    Returns:
        Number of subgroups containing H
    """
    pass`,
    solution: `def correspondence_theorem(normal_subgroup, elements, operation_table, identity):
    """
    Find subgroups containing H and corresponding subgroups of G/H.

    Args:
        normal_subgroup: List of elements in normal subgroup H
        elements: List of all group elements
        operation_table: 2D list representing group operation
        identity: Identity element

    Returns:
        Number of subgroups containing H
    """
    from itertools import combinations

    normal_set = set(normal_subgroup)
    count = 0

    # Try all subsets containing H
    other_elements = [e for e in elements if e not in normal_set]

    for r in range(len(other_elements) + 1):
        for extra in combinations(other_elements, r):
            candidate = list(normal_set) + list(extra)
            candidate_set = set(candidate)

            # Check if it's a subgroup
            is_closed = True
            for a in candidate:
                for b in candidate:
                    a_idx = elements.index(a)
                    b_idx = elements.index(b)
                    if operation_table[a_idx][b_idx] not in candidate_set:
                        is_closed = False
                        break
                if not is_closed:
                    break

            if not is_closed:
                continue

            # Check inverses
            has_inverses = True
            for a in candidate:
                has_inv = False
                a_idx = elements.index(a)
                for b in candidate:
                    b_idx = elements.index(b)
                    if operation_table[a_idx][b_idx] == identity:
                        has_inv = True
                        break
                if not has_inv:
                    has_inverses = False
                    break

            if is_closed and has_inverses:
                count += 1

    return count`,
    testCases: [
      { input: '[0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: '2', isHidden: false, description: 'H and G contain H in Z4' },
      { input: '[0], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], 0', expectedOutput: '2', isHidden: false, description: '{e} and G contain {e}' },
      { input: '[0, 1, 2], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], 0', expectedOutput: '1', isHidden: true, description: 'Only G contains G' }
    ],
    hints: ['Find all subgroups K with H ⊆ K ⊆ G', 'These correspond to subgroups of G/H', 'Use subset enumeration with subgroup test'],
    language: 'python'
  }
];
