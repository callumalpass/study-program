import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'math304-t1-ex01',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Verify Closure Property',
    difficulty: 1,
    description: 'Given a set and a binary operation, check if the closure property holds. The operation is closed if for all a, b in the set, a * b is also in the set.',
    starterCode: `def is_closed(elements, operation_table):
    """
    Check if the operation is closed on the given set.

    Args:
        elements: List of elements in the set
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]

    Returns:
        True if closed, False otherwise
    """
    pass`,
    solution: `def is_closed(elements, operation_table):
    """
    Check if the operation is closed on the given set.

    Args:
        elements: List of elements in the set
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]

    Returns:
        True if closed, False otherwise
    """
    element_set = set(elements)
    for row in operation_table:
        for result in row:
            if result not in element_set:
                return False
    return True`,
    testCases: [
      { input: '[1, 2, 3], [[1, 2, 3], [2, 3, 1], [3, 1, 2]]', expectedOutput: 'True', isHidden: false, description: 'Closed operation' },
      { input: '[1, 2], [[1, 2], [2, 3]]', expectedOutput: 'False', isHidden: false, description: 'Not closed (3 not in set)' },
      { input: '[0, 1], [[0, 1], [1, 0]]', expectedOutput: 'True', isHidden: true, description: 'Binary operation closed' }
    ],
    hints: ['Check if every result in the operation table is in the original set', 'Use a set for efficient membership checking'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex02',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Find Identity Element',
    difficulty: 2,
    description: 'Given a set and an operation table, find the identity element if it exists. An identity element e satisfies: e * a = a * e = a for all a in the set.',
    starterCode: `def find_identity(elements, operation_table):
    """
    Find the identity element if it exists.

    Args:
        elements: List of elements in the set
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]

    Returns:
        Identity element if exists, None otherwise
    """
    pass`,
    solution: `def find_identity(elements, operation_table):
    """
    Find the identity element if it exists.

    Args:
        elements: List of elements in the set
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]

    Returns:
        Identity element if exists, None otherwise
    """
    n = len(elements)
    for i in range(n):
        is_identity = True
        # Check if elements[i] is identity
        for j in range(n):
            # Check e * a = a and a * e = a
            if operation_table[i][j] != elements[j] or operation_table[j][i] != elements[j]:
                is_identity = False
                break
        if is_identity:
            return elements[i]
    return None`,
    testCases: [
      { input: '[0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: '0', isHidden: false, description: 'Identity is 0' },
      { input: '[1, 2, 3], [[2, 3, 1], [3, 1, 2], [1, 2, 3]]', expectedOutput: '3', isHidden: false, description: 'Identity is 3' },
      { input: '[1, 2], [[1, 2], [2, 1]]', expectedOutput: 'None', isHidden: true, description: 'No identity element' }
    ],
    hints: ['Check each element to see if it acts as identity', 'Identity must satisfy e*a = a and a*e = a for ALL elements a'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex03',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Check Associativity',
    difficulty: 3,
    description: 'Verify if a binary operation is associative. An operation * is associative if (a * b) * c = a * (b * c) for all elements a, b, c.',
    starterCode: `def is_associative(elements, operation_table):
    """
    Check if the operation is associative.

    Args:
        elements: List of elements in the set
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]

    Returns:
        True if associative, False otherwise
    """
    pass`,
    solution: `def is_associative(elements, operation_table):
    """
    Check if the operation is associative.

    Args:
        elements: List of elements in the set
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]

    Returns:
        True if associative, False otherwise
    """
    n = len(elements)
    for i in range(n):
        for j in range(n):
            for k in range(n):
                # Compute (a * b) * c
                ab = operation_table[i][j]
                ab_index = elements.index(ab)
                left = operation_table[ab_index][k]

                # Compute a * (b * c)
                bc = operation_table[j][k]
                bc_index = elements.index(bc)
                right = operation_table[i][bc_index]

                if left != right:
                    return False
    return True`,
    testCases: [
      { input: '[1, 2, 3], [[1, 2, 3], [2, 3, 1], [3, 1, 2]]', expectedOutput: 'True', isHidden: false, description: 'Associative cyclic operation' },
      { input: '[0, 1], [[0, 1], [1, 1]]', expectedOutput: 'True', isHidden: false, description: 'Simple associative operation' },
      { input: '[1, 2], [[1, 2], [2, 2]]', expectedOutput: 'False', isHidden: true, description: 'Non-associative operation' }
    ],
    hints: ['Test (a*b)*c = a*(b*c) for all triples', 'Use indices to look up results in the operation table'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex04',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Find Inverse Elements',
    difficulty: 2,
    description: 'Given a set with an operation and identity element, find the inverse of each element. Element b is the inverse of a if a * b = b * a = e.',
    starterCode: `def find_inverses(elements, operation_table, identity):
    """
    Find the inverse of each element.

    Args:
        elements: List of elements in the set
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]
        identity: The identity element

    Returns:
        Dictionary mapping each element to its inverse (or None if no inverse)
    """
    pass`,
    solution: `def find_inverses(elements, operation_table, identity):
    """
    Find the inverse of each element.

    Args:
        elements: List of elements in the set
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]
        identity: The identity element

    Returns:
        Dictionary mapping each element to its inverse (or None if no inverse)
    """
    inverses = {}
    n = len(elements)

    for i in range(n):
        inverse_found = False
        for j in range(n):
            # Check if elements[j] is inverse of elements[i]
            if operation_table[i][j] == identity and operation_table[j][i] == identity:
                inverses[elements[i]] = elements[j]
                inverse_found = True
                break
        if not inverse_found:
            inverses[elements[i]] = None

    return inverses`,
    testCases: [
      { input: '[0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], 0', expectedOutput: '{0: 0, 1: 2, 2: 1}', isHidden: false, description: 'Cyclic group inverses' },
      { input: '[1, 2, 3, 4], [[1, 2, 3, 4], [2, 1, 4, 3], [3, 4, 1, 2], [4, 3, 2, 1]], 1', expectedOutput: '{1: 1, 2: 2, 3: 3, 4: 4}', isHidden: false, description: 'Klein four-group' },
      { input: '[0, 1], [[0, 1], [1, 0]], 0', expectedOutput: '{0: 0, 1: 1}', isHidden: true, description: 'Simple group inverses' }
    ],
    hints: ['For each element a, find element b such that a*b = b*a = identity', 'Each element should have at most one inverse'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex05',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Verify Group Axioms',
    difficulty: 3,
    description: 'Check if a given set with an operation forms a group by verifying all four group axioms: closure, associativity, identity, and inverses.',
    starterCode: `def is_group(elements, operation_table):
    """
    Check if the set with operation forms a group.

    Args:
        elements: List of elements in the set
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]

    Returns:
        True if it's a group, False otherwise
    """
    pass`,
    solution: `def is_group(elements, operation_table):
    """
    Check if the set with operation forms a group.

    Args:
        elements: List of elements in the set
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]

    Returns:
        True if it's a group, False otherwise
    """
    n = len(elements)
    element_set = set(elements)

    # Check closure
    for row in operation_table:
        for result in row:
            if result not in element_set:
                return False

    # Check associativity
    for i in range(n):
        for j in range(n):
            for k in range(n):
                ab = operation_table[i][j]
                ab_index = elements.index(ab)
                left = operation_table[ab_index][k]

                bc = operation_table[j][k]
                bc_index = elements.index(bc)
                right = operation_table[i][bc_index]

                if left != right:
                    return False

    # Find identity
    identity = None
    for i in range(n):
        is_identity = True
        for j in range(n):
            if operation_table[i][j] != elements[j] or operation_table[j][i] != elements[j]:
                is_identity = False
                break
        if is_identity:
            identity = elements[i]
            break

    if identity is None:
        return False

    # Check inverses
    for i in range(n):
        has_inverse = False
        for j in range(n):
            if operation_table[i][j] == identity and operation_table[j][i] == identity:
                has_inverse = True
                break
        if not has_inverse:
            return False

    return True`,
    testCases: [
      { input: '[0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: 'True', isHidden: false, description: 'Z3 is a group' },
      { input: '[1, 2, 3], [[1, 2, 3], [2, 3, 1], [3, 1, 2]]', expectedOutput: 'True', isHidden: false, description: 'Cyclic group' },
      { input: '[0, 1], [[0, 1], [1, 1]]', expectedOutput: 'False', isHidden: true, description: 'Not a group (1 has no inverse)' }
    ],
    hints: ['Check all four axioms in order', 'If any axiom fails, return False immediately'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex06',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Check Commutativity',
    difficulty: 1,
    description: 'Determine if a binary operation is commutative. An operation * is commutative if a * b = b * a for all elements a, b.',
    starterCode: `def is_commutative(elements, operation_table):
    """
    Check if the operation is commutative.

    Args:
        elements: List of elements in the set
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]

    Returns:
        True if commutative, False otherwise
    """
    pass`,
    solution: `def is_commutative(elements, operation_table):
    """
    Check if the operation is commutative.

    Args:
        elements: List of elements in the set
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]

    Returns:
        True if commutative, False otherwise
    """
    n = len(elements)
    for i in range(n):
        for j in range(n):
            if operation_table[i][j] != operation_table[j][i]:
                return False
    return True`,
    testCases: [
      { input: '[0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: 'True', isHidden: false, description: 'Commutative operation' },
      { input: '[1, 2], [[1, 2], [1, 2]]', expectedOutput: 'False', isHidden: false, description: 'Non-commutative operation' },
      { input: '[0, 1], [[0, 1], [1, 0]]', expectedOutput: 'True', isHidden: true, description: 'Symmetric table' }
    ],
    hints: ['Check if the operation table is symmetric', 'Compare operation_table[i][j] with operation_table[j][i]'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex07',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Compute Element Order',
    difficulty: 2,
    description: 'Find the order of an element in a group. The order of element a is the smallest positive integer n such that a^n = e (identity).',
    starterCode: `def element_order(element, elements, operation_table, identity):
    """
    Find the order of an element in the group.

    Args:
        element: The element whose order we want to find
        elements: List of all elements in the group
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]
        identity: The identity element

    Returns:
        Order of the element
    """
    pass`,
    solution: `def element_order(element, elements, operation_table, identity):
    """
    Find the order of an element in the group.

    Args:
        element: The element whose order we want to find
        elements: List of all elements in the group
        operation_table: 2D list where operation_table[i][j] is elements[i] * elements[j]
        identity: The identity element

    Returns:
        Order of the element
    """
    current = element
    order = 1

    while current != identity:
        element_index = elements.index(element)
        current_index = elements.index(current)
        current = operation_table[current_index][element_index]
        order += 1

        # Prevent infinite loop for invalid groups
        if order > len(elements):
            return -1

    return order`,
    testCases: [
      { input: '1, [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: '4', isHidden: false, description: 'Order of generator in Z4' },
      { input: '2, [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: '2', isHidden: false, description: 'Order of element 2 in Z4' },
      { input: '0, [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], 0', expectedOutput: '1', isHidden: true, description: 'Order of identity is 1' }
    ],
    hints: ['Keep multiplying the element by itself until you get the identity', 'Count how many multiplications it takes'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex08',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Generate Cayley Table',
    difficulty: 2,
    description: 'Given a set of elements and a binary operation function, generate the complete Cayley table (operation table) for the group.',
    starterCode: `def generate_cayley_table(elements, operation):
    """
    Generate the Cayley table for the given operation.

    Args:
        elements: List of elements in the set
        operation: Function that takes two elements and returns their product

    Returns:
        2D list representing the Cayley table
    """
    pass`,
    solution: `def generate_cayley_table(elements, operation):
    """
    Generate the Cayley table for the given operation.

    Args:
        elements: List of elements in the set
        operation: Function that takes two elements and returns their product

    Returns:
        2D list representing the Cayley table
    """
    n = len(elements)
    table = []

    for i in range(n):
        row = []
        for j in range(n):
            result = operation(elements[i], elements[j])
            row.append(result)
        table.append(row)

    return table`,
    testCases: [
      { input: '[0, 1, 2], lambda a, b: (a + b) % 3', expectedOutput: '[[0, 1, 2], [1, 2, 0], [2, 0, 1]]', isHidden: false, description: 'Addition modulo 3' },
      { input: '[1, 2, 3, 4], lambda a, b: (a * b - 1) % 4 + 1', expectedOutput: '[[1, 2, 3, 4], [2, 4, 1, 3], [3, 1, 4, 2], [4, 3, 2, 1]]', isHidden: false, description: 'Multiplication on {1,2,3,4}' },
      { input: '[0, 1], lambda a, b: (a + b) % 2', expectedOutput: '[[0, 1], [1, 0]]', isHidden: true, description: 'Z2 addition' }
    ],
    hints: ['Create a 2D list with n rows and n columns', 'Apply the operation to each pair of elements'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex09',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Check Abelian Group',
    difficulty: 2,
    description: 'Determine if a group is abelian (commutative). A group is abelian if all its elements commute.',
    starterCode: `def is_abelian(elements, operation_table):
    """
    Check if the group is abelian.

    Args:
        elements: List of elements in the group
        operation_table: 2D list representing the group operation

    Returns:
        True if abelian, False otherwise
    """
    pass`,
    solution: `def is_abelian(elements, operation_table):
    """
    Check if the group is abelian.

    Args:
        elements: List of elements in the group
        operation_table: 2D list representing the group operation

    Returns:
        True if abelian, False otherwise
    """
    n = len(elements)
    for i in range(n):
        for j in range(n):
            if operation_table[i][j] != operation_table[j][i]:
                return False
    return True`,
    testCases: [
      { input: '[0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: 'True', isHidden: false, description: 'Z3 is abelian' },
      { input: '[1, 2, 3, 4], [[1, 2, 3, 4], [2, 1, 4, 3], [3, 4, 1, 2], [4, 3, 2, 1]]', expectedOutput: 'True', isHidden: false, description: 'Klein four-group is abelian' },
      { input: '["e", "a", "b"], [["e", "a", "b"], ["a", "b", "e"], ["b", "a", "e"]]', expectedOutput: 'False', isHidden: true, description: 'Non-abelian group' }
    ],
    hints: ['An abelian group has a symmetric Cayley table', 'Check if a*b = b*a for all pairs'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex10',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Find All Elements of Given Order',
    difficulty: 3,
    description: 'Find all elements in a group that have a specified order.',
    starterCode: `def elements_of_order(n, elements, operation_table, identity):
    """
    Find all elements with the given order.

    Args:
        n: The desired order
        elements: List of all elements in the group
        operation_table: 2D list representing the group operation
        identity: The identity element

    Returns:
        List of elements with order n
    """
    pass`,
    solution: `def elements_of_order(n, elements, operation_table, identity):
    """
    Find all elements with the given order.

    Args:
        n: The desired order
        elements: List of all elements in the group
        operation_table: 2D list representing the group operation
        identity: The identity element

    Returns:
        List of elements with order n
    """
    result = []

    for element in elements:
        current = element
        order = 1

        while current != identity:
            element_index = elements.index(element)
            current_index = elements.index(current)
            current = operation_table[current_index][element_index]
            order += 1

            if order > len(elements):
                break

        if order == n:
            result.append(element)

    return result`,
    testCases: [
      { input: '2, [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: '[2]', isHidden: false, description: 'Elements of order 2 in Z4' },
      { input: '1, [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: '[0]', isHidden: false, description: 'Only identity has order 1' },
      { input: '3, [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], 0', expectedOutput: '[1, 2]', isHidden: true, description: 'Elements of order 3 in Z3' }
    ],
    hints: ['Compute the order of each element', 'Collect elements whose order equals n'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex11',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Verify Left Identity',
    difficulty: 1,
    description: 'Check if a given element is a left identity. Element e is a left identity if e * a = a for all a.',
    starterCode: `def is_left_identity(candidate, elements, operation_table):
    """
    Check if candidate is a left identity.

    Args:
        candidate: The element to check
        elements: List of all elements
        operation_table: 2D list representing the operation

    Returns:
        True if candidate is a left identity, False otherwise
    """
    pass`,
    solution: `def is_left_identity(candidate, elements, operation_table):
    """
    Check if candidate is a left identity.

    Args:
        candidate: The element to check
        elements: List of all elements
        operation_table: 2D list representing the operation

    Returns:
        True if candidate is a left identity, False otherwise
    """
    candidate_index = elements.index(candidate)
    n = len(elements)

    for j in range(n):
        if operation_table[candidate_index][j] != elements[j]:
            return False

    return True`,
    testCases: [
      { input: '0, [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: 'True', isHidden: false, description: '0 is left identity' },
      { input: '1, [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: 'False', isHidden: false, description: '1 is not left identity' },
      { input: '2, [1, 2, 3], [[1, 2, 3], [2, 3, 1], [3, 1, 2]]', expectedOutput: 'False', isHidden: true, description: 'Check non-identity' }
    ],
    hints: ['Check the row corresponding to the candidate', 'For left identity, that row should match the elements list'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex12',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Check Latin Square Property',
    difficulty: 2,
    description: 'Verify if a Cayley table forms a Latin square (each element appears exactly once in each row and column). This is necessary but not sufficient for being a group.',
    starterCode: `def is_latin_square(elements, operation_table):
    """
    Check if the operation table is a Latin square.

    Args:
        elements: List of all elements
        operation_table: 2D list representing the operation

    Returns:
        True if Latin square, False otherwise
    """
    pass`,
    solution: `def is_latin_square(elements, operation_table):
    """
    Check if the operation table is a Latin square.

    Args:
        elements: List of all elements
        operation_table: 2D list representing the operation

    Returns:
        True if Latin square, False otherwise
    """
    n = len(elements)
    element_set = set(elements)

    # Check rows
    for row in operation_table:
        if set(row) != element_set:
            return False

    # Check columns
    for j in range(n):
        column = [operation_table[i][j] for i in range(n)]
        if set(column) != element_set:
            return False

    return True`,
    testCases: [
      { input: '[0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: 'True', isHidden: false, description: 'Valid Latin square' },
      { input: '[1, 2], [[1, 2], [1, 2]]', expectedOutput: 'False', isHidden: false, description: 'Not a Latin square' },
      { input: '[0, 1], [[0, 1], [1, 0]]', expectedOutput: 'True', isHidden: true, description: 'Simple Latin square' }
    ],
    hints: ['Check each row has all elements exactly once', 'Check each column has all elements exactly once'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex13',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Compute Power of Element',
    difficulty: 2,
    description: 'Compute a^n in a group, where a is an element and n is a positive integer.',
    starterCode: `def group_power(element, n, elements, operation_table, identity):
    """
    Compute element^n in the group.

    Args:
        element: The base element
        n: The exponent (positive integer)
        elements: List of all elements
        operation_table: 2D list representing the operation
        identity: The identity element

    Returns:
        Result of element^n
    """
    pass`,
    solution: `def group_power(element, n, elements, operation_table, identity):
    """
    Compute element^n in the group.

    Args:
        element: The base element
        n: The exponent (positive integer)
        elements: List of all elements
        operation_table: 2D list representing the operation
        identity: The identity element

    Returns:
        Result of element^n
    """
    if n == 0:
        return identity

    result = element
    for _ in range(n - 1):
        element_index = elements.index(element)
        result_index = elements.index(result)
        result = operation_table[result_index][element_index]

    return result`,
    testCases: [
      { input: '2, 3, [0, 1, 2, 3, 4], [[0, 1, 2, 3, 4], [1, 2, 3, 4, 0], [2, 3, 4, 0, 1], [3, 4, 0, 1, 2], [4, 0, 1, 2, 3]], 0', expectedOutput: '1', isHidden: false, description: '2^3 in Z5' },
      { input: '1, 5, [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], 0', expectedOutput: '2', isHidden: false, description: '1^5 in Z3' },
      { input: '2, 0, [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: '0', isHidden: true, description: 'Any element to power 0 is identity' }
    ],
    hints: ['Multiply the element by itself n times', 'Remember that a^0 = identity'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex14',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Find All Idempotent Elements',
    difficulty: 2,
    description: 'Find all idempotent elements in the structure. An element a is idempotent if a * a = a.',
    starterCode: `def find_idempotents(elements, operation_table):
    """
    Find all idempotent elements.

    Args:
        elements: List of all elements
        operation_table: 2D list representing the operation

    Returns:
        List of idempotent elements
    """
    pass`,
    solution: `def find_idempotents(elements, operation_table):
    """
    Find all idempotent elements.

    Args:
        elements: List of all elements
        operation_table: 2D list representing the operation

    Returns:
        List of idempotent elements
    """
    idempotents = []
    n = len(elements)

    for i in range(n):
        # Check if elements[i] * elements[i] = elements[i]
        if operation_table[i][i] == elements[i]:
            idempotents.append(elements[i])

    return idempotents`,
    testCases: [
      { input: '[0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: '[0]', isHidden: false, description: 'Only identity is idempotent in Z3' },
      { input: '[0, 1], [[0, 0], [0, 1]]', expectedOutput: '[0, 1]', isHidden: false, description: 'Both elements idempotent' },
      { input: '[1, 2, 3, 4], [[1, 2, 3, 4], [2, 1, 4, 3], [3, 4, 1, 2], [4, 3, 2, 1]]', expectedOutput: '[1]', isHidden: true, description: 'Only identity idempotent in Klein group' }
    ],
    hints: ['Check the diagonal of the operation table', 'An element is idempotent if a^2 = a'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex15',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Check Cancellation Property',
    difficulty: 3,
    description: 'Verify if the cancellation property holds. Left cancellation: if a*b = a*c then b = c. Right cancellation: if b*a = c*a then b = c.',
    starterCode: `def has_cancellation(elements, operation_table):
    """
    Check if both left and right cancellation hold.

    Args:
        elements: List of all elements
        operation_table: 2D list representing the operation

    Returns:
        Tuple (has_left_cancellation, has_right_cancellation)
    """
    pass`,
    solution: `def has_cancellation(elements, operation_table):
    """
    Check if both left and right cancellation hold.

    Args:
        elements: List of all elements
        operation_table: 2D list representing the operation

    Returns:
        Tuple (has_left_cancellation, has_right_cancellation)
    """
    n = len(elements)

    # Check left cancellation: a*b = a*c implies b = c
    left_cancel = True
    for i in range(n):
        for j in range(n):
            for k in range(n):
                if operation_table[i][j] == operation_table[i][k] and j != k:
                    left_cancel = False
                    break
            if not left_cancel:
                break
        if not left_cancel:
            break

    # Check right cancellation: b*a = c*a implies b = c
    right_cancel = True
    for i in range(n):
        for j in range(n):
            for k in range(n):
                if operation_table[j][i] == operation_table[k][i] and j != k:
                    right_cancel = False
                    break
            if not right_cancel:
                break
        if not right_cancel:
            break

    return (left_cancel, right_cancel)`,
    testCases: [
      { input: '[0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]]', expectedOutput: '(True, True)', isHidden: false, description: 'Z3 has both cancellation properties' },
      { input: '[0, 1], [[0, 0], [0, 1]]', expectedOutput: '(False, False)', isHidden: false, description: 'No cancellation' },
      { input: '[1, 2, 3, 4], [[1, 2, 3, 4], [2, 1, 4, 3], [3, 4, 1, 2], [4, 3, 2, 1]]', expectedOutput: '(True, True)', isHidden: true, description: 'Klein group has cancellation' }
    ],
    hints: ['Left cancellation means each row has distinct elements', 'Right cancellation means each column has distinct elements'],
    language: 'python'
  },
  {
    id: 'math304-t1-ex16',
    subjectId: 'math304',
    topicId: 'math304-topic-1',
    title: 'Verify Subgroup',
    difficulty: 4,
    description: 'Check if a subset forms a subgroup of a given group. A subset H is a subgroup if it is non-empty, closed under the operation, and closed under inverses.',
    starterCode: `def is_subgroup(subset, elements, operation_table, identity):
    """
    Check if subset is a subgroup of the group.

    Args:
        subset: List of elements forming the potential subgroup
        elements: List of all elements in the group
        operation_table: 2D list representing the group operation
        identity: The identity element of the group

    Returns:
        True if subset is a subgroup, False otherwise
    """
    pass`,
    solution: `def is_subgroup(subset, elements, operation_table, identity):
    """
    Check if subset is a subgroup of the group.

    Args:
        subset: List of elements forming the potential subgroup
        elements: List of all elements in the group
        operation_table: 2D list representing the group operation
        identity: The identity element of the group

    Returns:
        True if subset is a subgroup, False otherwise
    """
    # Check non-empty
    if len(subset) == 0:
        return False

    # Check identity is in subset
    if identity not in subset:
        return False

    subset_set = set(subset)

    # Check closure
    for a in subset:
        for b in subset:
            a_index = elements.index(a)
            b_index = elements.index(b)
            product = operation_table[a_index][b_index]
            if product not in subset_set:
                return False

    # Check inverses
    for a in subset:
        has_inverse = False
        a_index = elements.index(a)
        for b in subset:
            b_index = elements.index(b)
            if operation_table[a_index][b_index] == identity:
                has_inverse = True
                break
        if not has_inverse:
            return False

    return True`,
    testCases: [
      { input: '[0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: 'True', isHidden: false, description: '{0, 2} is subgroup of Z4' },
      { input: '[0, 1], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0', expectedOutput: 'False', isHidden: false, description: '{0, 1} not closed in Z4' },
      { input: '[0], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], 0', expectedOutput: 'True', isHidden: true, description: 'Trivial subgroup' }
    ],
    hints: ['Check identity is in subset', 'Verify closure under the operation', 'Verify closure under inverses'],
    language: 'python'
  }
];
