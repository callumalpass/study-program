import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'math304-t6-ex01',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Verify Ring Axioms',
    difficulty: 3,
    description: 'Check if a set with two operations forms a ring. Must satisfy: abelian group under addition, monoid under multiplication, and distributivity.',
    starterCode: `def is_ring(elements, add_table, mul_table, zero):
    """
    Check if structure is a ring.

    Args:
        elements: List of ring elements
        add_table: Addition operation table
        mul_table: Multiplication operation table
        zero: Additive identity

    Returns:
        True if ring, False otherwise
    """
    pass`,
    solution: `def is_ring(elements, add_table, mul_table, zero):
    """
    Check if structure is a ring.

    Args:
        elements: List of ring elements
        add_table: Addition operation table
        mul_table: Multiplication operation table
        zero: Additive identity

    Returns:
        True if ring, False otherwise
    """
    n = len(elements)

    # Check abelian group under addition (simplified check)
    # Identity exists (given as zero)
    # Check associativity, commutativity, inverses for addition
    for i in range(n):
        for j in range(n):
            # Commutativity
            if add_table[i][j] != add_table[j][i]:
                return False

    # Check distributivity
    for i in range(n):
        for j in range(n):
            for k in range(n):
                # a(b+c) = ab + ac
                bc = add_table[j][k]
                bc_idx = elements.index(bc)
                left = mul_table[i][bc_idx]

                ab = mul_table[i][j]
                ac = mul_table[i][k]
                ab_idx = elements.index(ab)
                ac_idx = elements.index(ac)
                right = add_table[ab_idx][ac_idx]

                if left != right:
                    return False

                # (a+b)c = ac + bc
                ab_sum = add_table[i][j]
                ab_sum_idx = elements.index(ab_sum)
                left2 = mul_table[ab_sum_idx][k]

                ac2 = mul_table[i][k]
                bc2 = mul_table[j][k]
                ac2_idx = elements.index(ac2)
                bc2_idx = elements.index(bc2)
                right2 = add_table[ac2_idx][bc2_idx]

                if left2 != right2:
                    return False

    return True`,
    testCases: [
      { input: '[0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], [[0, 0, 0], [0, 1, 2], [0, 2, 1]], 0', expectedOutput: 'True', isHidden: false, description: 'Z3 is a ring' },
      { input: '[0, 1], [[0, 1], [1, 0]], [[0, 0], [0, 1]], 0', expectedOutput: 'True', isHidden: false, description: 'Z2 is a ring' },
      { input: '[0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]], 0', expectedOutput: 'True', isHidden: true, description: 'Z4 is a ring' }
    ],
    hints: ['Check addition is abelian group', 'Check distributivity a(b+c) = ab+ac', 'Check distributivity (a+b)c = ac+bc'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex02',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Check Commutative Ring',
    difficulty: 1,
    description: 'Determine if a ring is commutative. A ring is commutative if ab = ba for all elements.',
    starterCode: `def is_commutative_ring(elements, mul_table):
    """
    Check if ring is commutative.

    Args:
        elements: List of ring elements
        mul_table: Multiplication operation table

    Returns:
        True if commutative, False otherwise
    """
    pass`,
    solution: `def is_commutative_ring(elements, mul_table):
    """
    Check if ring is commutative.

    Args:
        elements: List of ring elements
        mul_table: Multiplication operation table

    Returns:
        True if commutative, False otherwise
    """
    n = len(elements)

    for i in range(n):
        for j in range(n):
            if mul_table[i][j] != mul_table[j][i]:
                return False

    return True`,
    testCases: [
      { input: '[0, 1, 2], [[0, 0, 0], [0, 1, 2], [0, 2, 1]]', expectedOutput: 'True', isHidden: false, description: 'Z3 is commutative' },
      { input: '[0, 1], [[0, 0], [0, 1]]', expectedOutput: 'True', isHidden: false, description: 'Z2 is commutative' },
      { input: '[0, 1, 2, 3], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]]', expectedOutput: 'True', isHidden: true, description: 'Z4 is commutative' }
    ],
    hints: ['Check if multiplication table is symmetric', 'Compare mul_table[i][j] with mul_table[j][i]'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex03',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Find Zero Divisors',
    difficulty: 2,
    description: 'Find all zero divisors in a ring. Element a is a zero divisor if there exists nonzero b with ab = 0 or ba = 0.',
    starterCode: `def find_zero_divisors(elements, mul_table, zero):
    """
    Find all zero divisors.

    Args:
        elements: List of ring elements
        mul_table: Multiplication operation table
        zero: Zero element

    Returns:
        Sorted list of zero divisors (excluding zero itself)
    """
    pass`,
    solution: `def find_zero_divisors(elements, mul_table, zero):
    """
    Find all zero divisors.

    Args:
        elements: List of ring elements
        mul_table: Multiplication operation table
        zero: Zero element

    Returns:
        Sorted list of zero divisors (excluding zero itself)
    """
    zero_divisors = []
    n = len(elements)

    for i in range(n):
        a = elements[i]
        if a == zero:
            continue

        is_zero_divisor = False

        for j in range(n):
            b = elements[j]
            if b == zero:
                continue

            # Check ab = 0 or ba = 0
            if mul_table[i][j] == zero or mul_table[j][i] == zero:
                is_zero_divisor = True
                break

        if is_zero_divisor:
            zero_divisors.append(a)

    return sorted(zero_divisors)`,
    testCases: [
      { input: '[0, 1, 2, 3, 4], [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 1, 3], [0, 3, 1, 4, 2], [0, 4, 3, 2, 1]], 0', expectedOutput: '[]', isHidden: false, description: 'Z5 has no zero divisors (field)' },
      { input: '[0, 1, 2, 3], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]], 0', expectedOutput: '[2]', isHidden: false, description: 'Z4 has zero divisor 2' },
      { input: '[0, 1, 2], [[0, 0, 0], [0, 1, 2], [0, 2, 1]], 0', expectedOutput: '[]', isHidden: true, description: 'Z3 has no zero divisors' }
    ],
    hints: ['For each nonzero a, check if ab = 0 for some nonzero b', 'Zero divisors prevent cancellation', 'Integral domains have no zero divisors'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex04',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Find Units in Ring',
    difficulty: 2,
    description: 'Find all units (invertible elements) in a ring. Element a is a unit if there exists b with ab = ba = 1.',
    starterCode: `def find_units(elements, mul_table, one):
    """
    Find all units in the ring.

    Args:
        elements: List of ring elements
        mul_table: Multiplication operation table
        one: Multiplicative identity

    Returns:
        Sorted list of units
    """
    pass`,
    solution: `def find_units(elements, mul_table, one):
    """
    Find all units in the ring.

    Args:
        elements: List of ring elements
        mul_table: Multiplication operation table
        one: Multiplicative identity

    Returns:
        Sorted list of units
    """
    units = []
    n = len(elements)

    for i in range(n):
        a = elements[i]
        has_inverse = False

        for j in range(n):
            # Check if ab = ba = 1
            if mul_table[i][j] == one and mul_table[j][i] == one:
                has_inverse = True
                break

        if has_inverse:
            units.append(a)

    return sorted(units)`,
    testCases: [
      { input: '[0, 1, 2, 3, 4], [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 1, 3], [0, 3, 1, 4, 2], [0, 4, 3, 2, 1]], 1', expectedOutput: '[1, 2, 3, 4]', isHidden: false, description: 'All nonzero elements in Z5 are units' },
      { input: '[0, 1, 2, 3], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]], 1', expectedOutput: '[1, 3]', isHidden: false, description: 'Units in Z4 are 1 and 3' },
      { input: '[0, 1, 2], [[0, 0, 0], [0, 1, 2], [0, 2, 1]], 1', expectedOutput: '[1, 2]', isHidden: true, description: 'Units in Z3' }
    ],
    hints: ['Find elements with multiplicative inverse', 'Check if ab = ba = 1 for some b', 'Units form a group under multiplication'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex05',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Check if Element in Ideal',
    difficulty: 2,
    description: 'Check if an element belongs to an ideal generated by a set. Ideal I is closed under addition and absorption (ra, ar in I for all r in R).',
    starterCode: `def in_ideal(element, generators, elements, add_table, mul_table):
    """
    Check if element is in ideal generated by generators.

    Args:
        element: Element to check
        generators: List of ideal generators
        elements: List of ring elements
        add_table: Addition table
        mul_table: Multiplication table

    Returns:
        True if element in ideal, False otherwise
    """
    pass`,
    solution: `def in_ideal(element, generators, elements, add_table, mul_table):
    """
    Check if element is in ideal generated by generators.

    Args:
        element: Element to check
        generators: List of ideal generators
        elements: List of ring elements
        add_table: Addition table
        mul_table: Multiplication table

    Returns:
        True if element in ideal, False otherwise
    """
    # Generate ideal by closure
    ideal = set(generators)
    changed = True

    while changed:
        changed = False
        new_elements = set()

        # Add sums of ideal elements
        for a in ideal:
            for b in ideal:
                a_idx = elements.index(a)
                b_idx = elements.index(b)
                sum_elem = add_table[a_idx][b_idx]
                if sum_elem not in ideal:
                    new_elements.add(sum_elem)
                    changed = True

        # Add multiples ra and ar for all r
        for r in elements:
            for a in ideal:
                r_idx = elements.index(r)
                a_idx = elements.index(a)

                ra = mul_table[r_idx][a_idx]
                ar = mul_table[a_idx][r_idx]

                if ra not in ideal:
                    new_elements.add(ra)
                    changed = True

                if ar not in ideal:
                    new_elements.add(ar)
                    changed = True

        ideal.update(new_elements)

    return element in ideal`,
    testCases: [
      { input: '2, [2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]]', expectedOutput: 'True', isHidden: false, description: '2 in ideal <2> in Z4' },
      { input: '1, [2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]]', expectedOutput: 'False', isHidden: false, description: '1 not in ideal <2> in Z4' },
      { input: '0, [2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]]', expectedOutput: 'True', isHidden: true, description: '0 always in ideal' }
    ],
    hints: ['Generate ideal by closure under addition and multiplication', 'Keep adding elements until no new elements found', 'Ideal contains 0 and is closed under ra and ar'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex06',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Generate Principal Ideal',
    difficulty: 3,
    description: 'Generate the principal ideal <a> = {ra : r in R} in a commutative ring.',
    starterCode: `def principal_ideal(generator, elements, mul_table):
    """
    Generate principal ideal <a>.

    Args:
        generator: Ideal generator
        elements: List of ring elements
        mul_table: Multiplication table

    Returns:
        Sorted list of elements in <a>
    """
    pass`,
    solution: `def principal_ideal(generator, elements, mul_table):
    """
    Generate principal ideal <a>.

    Args:
        generator: Ideal generator
        elements: List of ring elements
        mul_table: Multiplication table

    Returns:
        Sorted list of elements in <a>
    """
    ideal = set()
    gen_idx = elements.index(generator)

    # Multiply generator by all ring elements
    for i in range(len(elements)):
        product = mul_table[i][gen_idx]
        ideal.add(product)

    return sorted(list(ideal))`,
    testCases: [
      { input: '2, [0, 1, 2, 3, 4, 5], [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5], [0, 2, 4, 0, 2, 4], [0, 3, 0, 3, 0, 3], [0, 4, 2, 0, 4, 2], [0, 5, 4, 3, 2, 1]]', expectedOutput: '[0, 2, 4]', isHidden: false, description: '<2> in Z6' },
      { input: '1, [0, 1, 2, 3, 4], [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 1, 3], [0, 3, 1, 4, 2], [0, 4, 3, 2, 1]]', expectedOutput: '[0, 1, 2, 3, 4]', isHidden: false, description: '<1> = Z5 (unit)' },
      { input: '0, [0, 1, 2], [[0, 0, 0], [0, 1, 2], [0, 2, 1]]', expectedOutput: '[0]', isHidden: true, description: '<0> = {0}' }
    ],
    hints: ['Compute ra for all r in R', 'In commutative ring, this equals {ar}', 'Ideal contains all multiples of generator'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex07',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Check if Ideal is Prime',
    difficulty: 4,
    description: 'Check if an ideal I is prime. I is prime if ab in I implies a in I or b in I.',
    starterCode: `def is_prime_ideal(ideal, elements, mul_table, zero):
    """
    Check if ideal is prime.

    Args:
        ideal: List of elements in the ideal
        elements: List of ring elements
        mul_table: Multiplication table
        zero: Zero element

    Returns:
        True if prime ideal, False otherwise
    """
    pass`,
    solution: `def is_prime_ideal(ideal, elements, mul_table, zero):
    """
    Check if ideal is prime.

    Args:
        ideal: List of elements in the ideal
        elements: List of ring elements
        mul_table: Multiplication table
        zero: Zero element

    Returns:
        True if prime ideal, False otherwise
    """
    ideal_set = set(ideal)

    # Prime ideal must be proper (not the whole ring)
    if ideal_set == set(elements):
        return False

    # Check: if ab in I, then a in I or b in I
    for i in range(len(elements)):
        for j in range(len(elements)):
            a = elements[i]
            b = elements[j]
            ab = mul_table[i][j]

            if ab in ideal_set:
                if a not in ideal_set and b not in ideal_set:
                    return False

    return True`,
    testCases: [
      { input: '[0, 2, 4], [0, 1, 2, 3, 4, 5], [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5], [0, 2, 4, 0, 2, 4], [0, 3, 0, 3, 0, 3], [0, 4, 2, 0, 4, 2], [0, 5, 4, 3, 2, 1]], 0', expectedOutput: 'True', isHidden: false, description: '<2> is prime in Z6' },
      { input: '[0], [0, 1, 2, 3, 4], [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 1, 3], [0, 3, 1, 4, 2], [0, 4, 3, 2, 1]], 0', expectedOutput: 'True', isHidden: false, description: '{0} is prime in Z5' },
      { input: '[0, 2], [0, 1, 2, 3], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]], 0', expectedOutput: 'False', isHidden: true, description: '<2> not prime in Z4 (2*2=0)' }
    ],
    hints: ['Check if ideal is proper (not whole ring)', 'For all a, b: if ab in I, then a in I or b in I', 'Prime ideals correspond to integral domains in quotient'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex08',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Check if Ideal is Maximal',
    difficulty: 4,
    description: 'Check if an ideal I is maximal. I is maximal if there is no proper ideal J with I ⊂ J ⊂ R.',
    starterCode: `def is_maximal_ideal(ideal, elements, add_table, mul_table, zero):
    """
    Check if ideal is maximal.

    Args:
        ideal: List of elements in the ideal
        elements: List of ring elements
        add_table: Addition table
        mul_table: Multiplication table
        zero: Zero element

    Returns:
        True if maximal, False otherwise
    """
    pass`,
    solution: `def is_maximal_ideal(ideal, elements, add_table, mul_table, zero):
    """
    Check if ideal is maximal.

    Args:
        ideal: List of elements in the ideal
        elements: List of ring elements
        add_table: Addition table
        mul_table: Multiplication table
        zero: Zero element

    Returns:
        True if maximal, False otherwise
    """
    from itertools import combinations

    ideal_set = set(ideal)

    # Must be proper ideal
    if ideal_set == set(elements):
        return False

    # Try adding each element not in I
    for elem in elements:
        if elem in ideal_set:
            continue

        # Generate ideal containing I and elem
        new_ideal = set(ideal)
        new_ideal.add(elem)

        changed = True
        while changed:
            changed = False
            to_add = set()

            # Add sums
            for a in new_ideal:
                for b in new_ideal:
                    a_idx = elements.index(a)
                    b_idx = elements.index(b)
                    sum_elem = add_table[a_idx][b_idx]
                    if sum_elem not in new_ideal:
                        to_add.add(sum_elem)
                        changed = True

            # Add multiples
            for r in elements:
                for a in new_ideal:
                    r_idx = elements.index(r)
                    a_idx = elements.index(a)
                    ra = mul_table[r_idx][a_idx]
                    ar = mul_table[a_idx][r_idx]
                    if ra not in new_ideal:
                        to_add.add(ra)
                        changed = True
                    if ar not in new_ideal:
                        to_add.add(ar)
                        changed = True

            new_ideal.update(to_add)

        # If new ideal is whole ring, continue; otherwise not maximal
        if new_ideal != set(elements):
            return False

    return True`,
    testCases: [
      { input: '[0, 2, 4], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]], [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5], [0, 2, 4, 0, 2, 4], [0, 3, 0, 3, 0, 3], [0, 4, 2, 0, 4, 2], [0, 5, 4, 3, 2, 1]], 0', expectedOutput: 'False', isHidden: false, description: '<2> not maximal in Z6' },
      { input: '[0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]], [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5], [0, 2, 4, 0, 2, 4], [0, 3, 0, 3, 0, 3], [0, 4, 2, 0, 4, 2], [0, 5, 4, 3, 2, 1]], 0', expectedOutput: 'True', isHidden: false, description: '<3> is maximal in Z6' },
      { input: '[0], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], [[0, 0, 0], [0, 1, 2], [0, 2, 1]], 0', expectedOutput: 'True', isHidden: true, description: '{0} maximal in field Z3' }
    ],
    hints: ['Check if ideal is proper', 'For each element not in I, check if <I, a> = R', 'Maximal ideals correspond to fields in quotient'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex09',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Check Integral Domain',
    difficulty: 2,
    description: 'Check if a commutative ring is an integral domain (no zero divisors).',
    starterCode: `def is_integral_domain(elements, mul_table, zero):
    """
    Check if ring is an integral domain.

    Args:
        elements: List of ring elements
        mul_table: Multiplication table
        zero: Zero element

    Returns:
        True if integral domain, False otherwise
    """
    pass`,
    solution: `def is_integral_domain(elements, mul_table, zero):
    """
    Check if ring is an integral domain.

    Args:
        elements: List of ring elements
        mul_table: Multiplication table
        zero: Zero element

    Returns:
        True if integral domain, False otherwise
    """
    n = len(elements)

    # Check for zero divisors
    for i in range(n):
        if elements[i] == zero:
            continue

        for j in range(n):
            if elements[j] == zero:
                continue

            if mul_table[i][j] == zero:
                return False

    return True`,
    testCases: [
      { input: '[0, 1, 2, 3, 4], [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 1, 3], [0, 3, 1, 4, 2], [0, 4, 3, 2, 1]], 0', expectedOutput: 'True', isHidden: false, description: 'Z5 is integral domain' },
      { input: '[0, 1, 2, 3], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]], 0', expectedOutput: 'False', isHidden: false, description: 'Z4 not integral domain (2*2=0)' },
      { input: '[0, 1, 2], [[0, 0, 0], [0, 1, 2], [0, 2, 1]], 0', expectedOutput: 'True', isHidden: true, description: 'Z3 is integral domain' }
    ],
    hints: ['Check if there exist nonzero a, b with ab = 0', 'Integral domain = commutative ring with no zero divisors', 'All fields are integral domains'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex10',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Check if Ring is Field',
    difficulty: 2,
    description: 'Check if a ring is a field. A field is a commutative ring where every nonzero element is a unit.',
    starterCode: `def is_field(elements, mul_table, zero, one):
    """
    Check if ring is a field.

    Args:
        elements: List of ring elements
        mul_table: Multiplication table
        zero: Zero element
        one: Multiplicative identity

    Returns:
        True if field, False otherwise
    """
    pass`,
    solution: `def is_field(elements, mul_table, zero, one):
    """
    Check if ring is a field.

    Args:
        elements: List of ring elements
        mul_table: Multiplication table
        zero: Zero element
        one: Multiplicative identity

    Returns:
        True if field, False otherwise
    """
    n = len(elements)

    # Check every nonzero element has inverse
    for i in range(n):
        if elements[i] == zero:
            continue

        has_inverse = False
        for j in range(n):
            if mul_table[i][j] == one and mul_table[j][i] == one:
                has_inverse = True
                break

        if not has_inverse:
            return False

    return True`,
    testCases: [
      { input: '[0, 1, 2, 3, 4], [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 1, 3], [0, 3, 1, 4, 2], [0, 4, 3, 2, 1]], 0, 1', expectedOutput: 'True', isHidden: false, description: 'Z5 is a field' },
      { input: '[0, 1, 2, 3], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]], 0, 1', expectedOutput: 'False', isHidden: false, description: 'Z4 not a field' },
      { input: '[0, 1, 2], [[0, 0, 0], [0, 1, 2], [0, 2, 1]], 0, 1', expectedOutput: 'True', isHidden: true, description: 'Z3 is a field' }
    ],
    hints: ['Check if every nonzero element has multiplicative inverse', 'Field = commutative division ring', 'Zp is field iff p is prime'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex11',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Compute Characteristic of Ring',
    difficulty: 3,
    description: 'Find the characteristic of a ring. The characteristic is the smallest positive n with n·1 = 0, or 0 if no such n exists.',
    starterCode: `def ring_characteristic(elements, add_table, zero, one):
    """
    Compute characteristic of ring.

    Args:
        elements: List of ring elements
        add_table: Addition table
        zero: Zero element
        one: Multiplicative identity

    Returns:
        Characteristic of the ring
    """
    pass`,
    solution: `def ring_characteristic(elements, add_table, zero, one):
    """
    Compute characteristic of ring.

    Args:
        elements: List of ring elements
        add_table: Addition table
        zero: Zero element
        one: Multiplicative identity

    Returns:
        Characteristic of the ring
    """
    current = one
    n = 1
    one_idx = elements.index(one)

    while current != zero and n <= len(elements):
        current_idx = elements.index(current)
        current = add_table[current_idx][one_idx]
        n += 1

    if current == zero:
        return n - 1
    else:
        return 0`,
    testCases: [
      { input: '[0, 1, 2, 3, 4], [[0, 1, 2, 3, 4], [1, 2, 3, 4, 0], [2, 3, 4, 0, 1], [3, 4, 0, 1, 2], [4, 0, 1, 2, 3]], 0, 1', expectedOutput: '5', isHidden: false, description: 'Z5 has characteristic 5' },
      { input: '[0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], 0, 1', expectedOutput: '4', isHidden: false, description: 'Z4 has characteristic 4' },
      { input: '[0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], 0, 1', expectedOutput: '3', isHidden: true, description: 'Z3 has characteristic 3' }
    ],
    hints: ['Add 1 to itself repeatedly', 'Count how many times until you get 0', 'Characteristic divides ring order for finite rings'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex12',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Find Nilpotent Elements',
    difficulty: 3,
    description: 'Find all nilpotent elements in a ring. Element a is nilpotent if a^n = 0 for some positive integer n.',
    starterCode: `def find_nilpotent_elements(elements, mul_table, zero):
    """
    Find all nilpotent elements.

    Args:
        elements: List of ring elements
        mul_table: Multiplication table
        zero: Zero element

    Returns:
        Sorted list of nilpotent elements
    """
    pass`,
    solution: `def find_nilpotent_elements(elements, mul_table, zero):
    """
    Find all nilpotent elements.

    Args:
        elements: List of ring elements
        mul_table: Multiplication table
        zero: Zero element

    Returns:
        Sorted list of nilpotent elements
    """
    nilpotent = []
    n = len(elements)

    for i in range(n):
        a = elements[i]
        current = a
        current_idx = i

        # Compute powers until we reach zero or exceed ring size
        for _ in range(n):
            if current == zero:
                nilpotent.append(a)
                break

            # Compute current * a
            a_idx = elements.index(a)
            current = mul_table[current_idx][a_idx]
            current_idx = elements.index(current)

    return sorted(nilpotent)`,
    testCases: [
      { input: '[0, 1, 2, 3], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]], 0', expectedOutput: '[0, 2]', isHidden: false, description: '0 and 2 are nilpotent in Z4' },
      { input: '[0, 1, 2, 3, 4], [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 1, 3], [0, 3, 1, 4, 2], [0, 4, 3, 2, 1]], 0', expectedOutput: '[0]', isHidden: false, description: 'Only 0 nilpotent in Z5' },
      { input: '[0, 1, 2], [[0, 0, 0], [0, 1, 2], [0, 2, 1]], 0', expectedOutput: '[0]', isHidden: true, description: 'Only 0 nilpotent in Z3' }
    ],
    hints: ['For each element, compute successive powers', 'Check if any power equals zero', 'Zero is always nilpotent'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex13',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Find Idempotent Elements in Ring',
    difficulty: 2,
    description: 'Find all idempotent elements in a ring. Element a is idempotent if a² = a.',
    starterCode: `def find_ring_idempotents(elements, mul_table):
    """
    Find all idempotent elements.

    Args:
        elements: List of ring elements
        mul_table: Multiplication table

    Returns:
        Sorted list of idempotent elements
    """
    pass`,
    solution: `def find_ring_idempotents(elements, mul_table):
    """
    Find all idempotent elements.

    Args:
        elements: List of ring elements
        mul_table: Multiplication table

    Returns:
        Sorted list of idempotent elements
    """
    idempotents = []
    n = len(elements)

    for i in range(n):
        # Check if a² = a
        if mul_table[i][i] == elements[i]:
            idempotents.append(elements[i])

    return sorted(idempotents)`,
    testCases: [
      { input: '[0, 1, 2, 3], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]]', expectedOutput: '[0, 1]', isHidden: false, description: '0 and 1 are idempotent in Z4' },
      { input: '[0, 1, 2, 3, 4], [[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 1, 3], [0, 3, 1, 4, 2], [0, 4, 3, 2, 1]]', expectedOutput: '[0, 1]', isHidden: false, description: 'Only 0 and 1 in Z5' },
      { input: '[0, 1, 2], [[0, 0, 0], [0, 1, 2], [0, 2, 1]]', expectedOutput: '[0, 1]', isHidden: true, description: 'Idempotents in Z3' }
    ],
    hints: ['Check diagonal of multiplication table', 'a is idempotent if a² = a', '0 and 1 are always idempotent'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex14',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Sum of Ideals',
    difficulty: 3,
    description: 'Compute the sum of two ideals I + J = {i + j : i ∈ I, j ∈ J}.',
    starterCode: `def ideal_sum(ideal1, ideal2, elements, add_table, mul_table):
    """
    Compute sum of two ideals.

    Args:
        ideal1, ideal2: Lists of elements in ideals
        elements: List of ring elements
        add_table: Addition table
        mul_table: Multiplication table

    Returns:
        Sorted list of elements in I + J
    """
    pass`,
    solution: `def ideal_sum(ideal1, ideal2, elements, add_table, mul_table):
    """
    Compute sum of two ideals.

    Args:
        ideal1, ideal2: Lists of elements in ideals
        elements: List of ring elements
        add_table: Addition table
        mul_table: Multiplication table

    Returns:
        Sorted list of elements in I + J
    """
    # Start with union
    result = set(ideal1) | set(ideal2)

    changed = True
    while changed:
        changed = False
        new_elements = set()

        # Add sums
        for a in result:
            for b in result:
                a_idx = elements.index(a)
                b_idx = elements.index(b)
                sum_elem = add_table[a_idx][b_idx]
                if sum_elem not in result:
                    new_elements.add(sum_elem)
                    changed = True

        # Add multiples (ideal property)
        for r in elements:
            for a in result:
                r_idx = elements.index(r)
                a_idx = elements.index(a)
                ra = mul_table[r_idx][a_idx]
                ar = mul_table[a_idx][r_idx]
                if ra not in result:
                    new_elements.add(ra)
                    changed = True
                if ar not in result:
                    new_elements.add(ar)
                    changed = True

        result.update(new_elements)

    return sorted(list(result))`,
    testCases: [
      { input: '[0, 2, 4], [0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]], [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5], [0, 2, 4, 0, 2, 4], [0, 3, 0, 3, 0, 3], [0, 4, 2, 0, 4, 2], [0, 5, 4, 3, 2, 1]]', expectedOutput: '[0, 1, 2, 3, 4, 5]', isHidden: false, description: '<2> + <3> = Z6' },
      { input: '[0, 2], [0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]], [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5], [0, 2, 4, 0, 2, 4], [0, 3, 0, 3, 0, 3], [0, 4, 2, 0, 4, 2], [0, 5, 4, 3, 2, 1]]', expectedOutput: '[0, 1, 2, 3, 4, 5]', isHidden: false, description: 'Sum of coprime ideals' },
      { input: '[0], [0], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], [[0, 0, 0], [0, 1, 2], [0, 2, 1]]', expectedOutput: '[0]', isHidden: true, description: '{0} + {0} = {0}' }
    ],
    hints: ['Start with union of both ideals', 'Close under addition and multiplication', 'I + J is smallest ideal containing both'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex15',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Intersection of Ideals',
    difficulty: 2,
    description: 'Compute the intersection of two ideals I ∩ J.',
    starterCode: `def ideal_intersection(ideal1, ideal2):
    """
    Compute intersection of two ideals.

    Args:
        ideal1, ideal2: Lists of elements in ideals

    Returns:
        Sorted list of elements in I ∩ J
    """
    pass`,
    solution: `def ideal_intersection(ideal1, ideal2):
    """
    Compute intersection of two ideals.

    Args:
        ideal1, ideal2: Lists of elements in ideals

    Returns:
        Sorted list of elements in I ∩ J
    """
    intersection = set(ideal1) & set(ideal2)
    return sorted(list(intersection))`,
    testCases: [
      { input: '[0, 2, 4], [0, 3]', expectedOutput: '[0]', isHidden: false, description: '<2> ∩ <3> = {0} in Z6' },
      { input: '[0, 2, 4], [0, 2, 4]', expectedOutput: '[0, 2, 4]', isHidden: false, description: 'I ∩ I = I' },
      { input: '[0, 1, 2], [0, 2]', expectedOutput: '[0, 2]', isHidden: true, description: 'Intersection with subset' }
    ],
    hints: ['Intersection is set intersection', 'I ∩ J is automatically an ideal', 'Simple set operation'],
    language: 'python'
  },
  {
    id: 'math304-t6-ex16',
    subjectId: 'math304',
    topicId: 'math304-topic-6',
    title: 'Product of Ideals',
    difficulty: 4,
    description: 'Compute the product of two ideals IJ = {finite sums of ij : i ∈ I, j ∈ J}.',
    starterCode: `def ideal_product(ideal1, ideal2, elements, add_table, mul_table):
    """
    Compute product of two ideals.

    Args:
        ideal1, ideal2: Lists of elements in ideals
        elements: List of ring elements
        add_table: Addition table
        mul_table: Multiplication table

    Returns:
        Sorted list of elements in IJ
    """
    pass`,
    solution: `def ideal_product(ideal1, ideal2, elements, add_table, mul_table):
    """
    Compute product of two ideals.

    Args:
        ideal1, ideal2: Lists of elements in ideals
        elements: List of ring elements
        add_table: Addition table
        mul_table: Multiplication table

    Returns:
        Sorted list of elements in IJ
    """
    # Start with products ij
    result = set()

    for i in ideal1:
        for j in ideal2:
            i_idx = elements.index(i)
            j_idx = elements.index(j)
            product = mul_table[i_idx][j_idx]
            result.add(product)

    # Close under addition and absorption
    changed = True
    while changed:
        changed = False
        new_elements = set()

        # Add sums
        for a in result:
            for b in result:
                a_idx = elements.index(a)
                b_idx = elements.index(b)
                sum_elem = add_table[a_idx][b_idx]
                if sum_elem not in result:
                    new_elements.add(sum_elem)
                    changed = True

        # Add multiples
        for r in elements:
            for a in result:
                r_idx = elements.index(r)
                a_idx = elements.index(a)
                ra = mul_table[r_idx][a_idx]
                ar = mul_table[a_idx][r_idx]
                if ra not in result:
                    new_elements.add(ra)
                    changed = True
                if ar not in result:
                    new_elements.add(ar)
                    changed = True

        result.update(new_elements)

    return sorted(list(result))`,
    testCases: [
      { input: '[0, 2, 4], [0, 3], [0, 1, 2, 3, 4, 5], [[0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 0], [2, 3, 4, 5, 0, 1], [3, 4, 5, 0, 1, 2], [4, 5, 0, 1, 2, 3], [5, 0, 1, 2, 3, 4]], [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5], [0, 2, 4, 0, 2, 4], [0, 3, 0, 3, 0, 3], [0, 4, 2, 0, 4, 2], [0, 5, 4, 3, 2, 1]]', expectedOutput: '[0]', isHidden: false, description: '<2><3> = {0} in Z6' },
      { input: '[0, 2], [0, 2], [0, 1, 2, 3], [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 0, 2], [0, 3, 2, 1]]', expectedOutput: '[0]', isHidden: false, description: '<2>² = {0} in Z4' },
      { input: '[0, 1, 2], [0, 1, 2], [0, 1, 2], [[0, 1, 2], [1, 2, 0], [2, 0, 1]], [[0, 0, 0], [0, 1, 2], [0, 2, 1]]', expectedOutput: '[0, 1, 2]', isHidden: true, description: 'R·R = R' }
    ],
    hints: ['Generate all products ij', 'Close under addition and ideal absorption', 'IJ ⊆ I ∩ J'],
    language: 'python'
  }
];
