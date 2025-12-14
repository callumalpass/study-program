import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID for backward compatibility
  {
    id: 'cs102-ex-4',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'Boolean Expression Evaluator',
    difficulty: 3,
    description: 'Create a function that evaluates simple Boolean expressions with AND, OR, and NOT operations. The function should accept a Boolean expression as a string and a dictionary of variable values.',
    starterCode: 'def evaluate_boolean(expression, variables):\n    """\n    Evaluate a Boolean expression.\n    \n    Args:\n        expression: Boolean expression as string (e.g., "A AND B")\n        variables: Dictionary mapping variable names to boolean values\n    \n    Returns:\n        Boolean result of the expression\n    """\n    # Your code here\n    pass',
    testCases: [
    ],
    hints: [
      'Replace variable names in the expression with their values from the dictionary',
      'Convert boolean values to strings "True" and "False" for replacement'
    ],
    solution: 'def evaluate_boolean(expression, variables):\n    result_expr = expression\n    for var_name, var_value in variables.items():\n        result_expr = result_expr.replace(var_name, str(var_value))\n    result_expr = result_expr.replace("AND", "and").replace("OR", "or").replace("NOT", "not")\n    return eval(result_expr)',
    language: 'python'
  },
  {
    id: 'cs102-t4-ex02',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'AND Gate',
    difficulty: 1,
    description: 'Implement a function that simulates an AND gate. Returns True only if both inputs are True.',
    starterCode: '# AND gate implementation\ndef and_gate(a, b):\n    # Your code here\n    pass\n\nprint(and_gate(True, True))\nprint(and_gate(True, False))\nprint(and_gate(False, False))',
    solution: 'def and_gate(a, b):\n    return a and b\n\nprint(and_gate(True, True))\nprint(and_gate(True, False))\nprint(and_gate(False, False))',
    testCases: [
    ],
    hints: [
      'AND returns True only when both inputs are True',
      'You can use Python\'s and operator'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t4-ex03',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'OR Gate',
    difficulty: 1,
    description: 'Implement a function that simulates an OR gate. Returns True if at least one input is True.',
    starterCode: '# OR gate implementation\ndef or_gate(a, b):\n    # Your code here\n    pass\n\nprint(or_gate(True, False))\nprint(or_gate(False, False))',
    solution: 'def or_gate(a, b):\n    return a or b\n\nprint(or_gate(True, False))\nprint(or_gate(False, False))',
    testCases: [
    ],
    hints: [
      'OR returns True when at least one input is True',
      'You can use Python\'s or operator'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t4-ex04',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'XOR Gate',
    difficulty: 2,
    description: 'Implement a function that simulates an XOR (exclusive OR) gate. Returns True if inputs are different.',
    starterCode: '# XOR gate implementation\ndef xor_gate(a, b):\n    # Your code here\n    pass\n\nprint(xor_gate(True, False))\nprint(xor_gate(True, True))',
    solution: 'def xor_gate(a, b):\n    return a != b\n\nprint(xor_gate(True, False))\nprint(xor_gate(True, True))',
    testCases: [
    ],
    hints: [
      'XOR returns True when inputs are different',
      'XOR returns False when inputs are the same',
      'You can use != to check inequality'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t4-ex05',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'NAND Gate',
    difficulty: 2,
    description: 'Implement a NAND gate (NOT AND). NAND is a universal gate - any logic circuit can be built with just NAND gates.',
    starterCode: '# NAND gate implementation\ndef nand_gate(a, b):\n    # Your code here\n    pass\n\nprint(nand_gate(True, True))\nprint(nand_gate(True, False))',
    solution: 'def nand_gate(a, b):\n    return not (a and b)\n\nprint(nand_gate(True, True))\nprint(nand_gate(True, False))',
    testCases: [
    ],
    hints: [
      'NAND = NOT AND',
      'Invert the result of AND gate',
      'NAND only returns False when both inputs are True'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t4-ex06',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'Truth Table Generator',
    difficulty: 3,
    description: 'Write a function that generates a truth table for a boolean expression with 2 variables A and B.',
    starterCode: '# Generate truth table for expression\ndef truth_table(expression):\n    # expression is a string like "A AND B" or "A OR B"\n    # Return list of tuples: [(A, B, result), ...]\n    # Your code here\n    pass\n\nprint(truth_table("A AND B"))',
    solution: 'def truth_table(expression):\n    results = []\n    for a in [False, True]:\n        for b in [False, True]:\n            expr = expression.replace("A", str(a)).replace("B", str(b))\n            expr = expr.replace("AND", "and").replace("OR", "or").replace("NOT", "not")\n            result = eval(expr)\n            results.append((a, b, result))\n    return results\n\nprint(truth_table("A AND B"))',
    testCases: [
    ],
    hints: [
      'Iterate through all combinations of A and B',
      'There are 4 combinations: FF, FT, TF, TT',
      'Substitute values and evaluate expression'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t4-ex07',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'De Morgan\'s Laws',
    difficulty: 4,
    description: 'Implement functions to demonstrate De Morgan\'s laws: NOT(A AND B) = (NOT A) OR (NOT B), NOT(A OR B) = (NOT A) AND (NOT B).',
    starterCode: '# Demonstrate De Morgan\'s Laws\ndef verify_demorgans_and(a, b):\n    # Verify NOT(A AND B) = (NOT A) OR (NOT B)\n    # Return tuple (left_side, right_side, equal)\n    # Your code here\n    pass\n\ndef verify_demorgans_or(a, b):\n    # Verify NOT(A OR B) = (NOT A) AND (NOT B)\n    # Your code here\n    pass\n\nprint(verify_demorgans_and(True, False))\nprint(verify_demorgans_or(True, True))',
    solution: 'def verify_demorgans_and(a, b):\n    left = not (a and b)\n    right = (not a) or (not b)\n    return (left, right, left == right)\n\ndef verify_demorgans_or(a, b):\n    left = not (a or b)\n    right = (not a) and (not b)\n    return (left, right, left == right)\n\nprint(verify_demorgans_and(True, False))\nprint(verify_demorgans_or(True, True))',
    testCases: [
    ],
    hints: [
      'NOT(A AND B) = (NOT A) OR (NOT B)',
      'NOT(A OR B) = (NOT A) AND (NOT B)',
      'Calculate both sides and check if they\'re equal'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t4-ex08',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'Half Adder',
    difficulty: 4,
    description: 'Implement a half adder circuit using logic gates. A half adder adds two bits and produces sum and carry outputs.',
    starterCode: '# Half adder: adds two bits\ndef half_adder(a, b):\n    # Return tuple (sum, carry)\n    # sum = a XOR b\n    # carry = a AND b\n    # Your code here\n    pass\n\nprint(half_adder(0, 0))\nprint(half_adder(1, 1))\nprint(half_adder(1, 0))',
    solution: 'def half_adder(a, b):\n    sum_bit = a ^ b  # XOR for sum\n    carry = a & b    # AND for carry\n    return (sum_bit, carry)\n\nprint(half_adder(0, 0))\nprint(half_adder(1, 1))\nprint(half_adder(1, 0))',
    testCases: [
    ],
    hints: [
      'Sum = A XOR B (use ^ in Python)',
      'Carry = A AND B (use & in Python)',
      'This is the building block of binary adders'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t4-ex09',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'Full Adder',
    difficulty: 5,
    description: 'Implement a full adder circuit that adds two bits plus a carry-in bit, producing sum and carry-out.',
    starterCode: '# Full adder: adds two bits plus carry-in\ndef full_adder(a, b, carry_in):\n    # Return tuple (sum, carry_out)\n    # Your code here\n    pass\n\nprint(full_adder(1, 1, 0))\nprint(full_adder(1, 1, 1))\nprint(full_adder(0, 1, 1))',
    solution: 'def full_adder(a, b, carry_in):\n    # First half adder\n    sum1 = a ^ b\n    carry1 = a & b\n    \n    # Second half adder (with carry_in)\n    sum_out = sum1 ^ carry_in\n    carry2 = sum1 & carry_in\n    \n    # Final carry\n    carry_out = carry1 | carry2\n    \n    return (sum_out, carry_out)\n\nprint(full_adder(1, 1, 0))\nprint(full_adder(1, 1, 1))\nprint(full_adder(0, 1, 1))',
    testCases: [
    ],
    hints: [
      'Full adder = two half adders + OR gate',
      'First half adder: adds A and B',
      'Second half adder: adds result with carry_in',
      'Carry out = carry from either half adder'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t4-ex10',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'Truth Table Generator',
    difficulty: 4,
    description: 'Write a function that, given a Boolean expression using variables A, B, C and operators &, |, ^, ~, and parentheses, returns its truth table as a list of (assignment, result). Assume the expression is safe to eval.',
    starterCode: 'import itertools\n\n# Generate truth table for expression like \"(A & B) | ~C\"\ndef truth_table(expr):\n    # Your code here\n    pass\n\nprint(truth_table(\"A & B\"))',
    solution: 'import itertools\n\ndef truth_table(expr):\n    results = []\n    for vals in itertools.product([0, 1], repeat=3):\n        A, B, C = vals\n        result = int(eval(expr.replace(\"~\", \"1-\")))  # replace ~x with 1-x for NOT\n        results.append(((A, B, C), result))\n    return results\n\nprint(truth_table(\"A & B\"))',
    testCases: [
    ],
    hints: [
      'Iterate over all 2^3 assignments of A,B,C.',
      'Replace ~ with Python-friendly form (e.g., 1- or not).',
      'Use eval cautiously; assume trusted input for this exercise.'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t4-ex11',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'Boolean Simplifier (Algebraic)',
    difficulty: 3,
    description: 'Implement a simple algebraic simplifier that applies a few laws: idempotent (X|X = X, X&X = X), annihilator (X|1 = 1, X&0 = 0), identity (X|0 = X, X&1 = X), complement (X|~X = 1, X&~X = 0). Expression variables are single uppercase letters; operators: | for OR, & for AND, ~ for NOT. No parentheses.',
    starterCode: '# Very small Boolean simplifier\ndef simplify(expr):\n    # expr like \"A|A\" or \"A&1\" or \"A|~A\"\n    # Your code here\n    pass\n\nprint(simplify(\"A|A\"))\nprint(simplify(\"A&1\"))\nprint(simplify(\"A|~A\"))',
    solution: 'def simplify(expr):\n    expr = expr.replace(\" \", \"\")\n    # Handle complement forms first\n    if \"|~\" in expr or \"~\" in expr and \"|\" in expr:\n        parts = expr.split(\"|\")\n        if len(parts) == 2 and parts[1].startswith(\"~\") and parts[1][1:] == parts[0]:\n            return \"1\"\n    if \"&~\" in expr or \"~\" in expr and \"&\" in expr:\n        parts = expr.split(\"&\")\n        if len(parts) == 2 and parts[1].startswith(\"~\") and parts[1][1:] == parts[0]:\n            return \"0\"\n    # Idempotent\n    if \"|\" in expr:\n        a, b = expr.split(\"|\")\n        if a == b:\n            return a\n        if a == \"1\" or b == \"1\":\n            return \"1\"\n        if a == \"0\":\n            return b\n        if b == \"0\":\n            return a\n    if \"&\" in expr:\n        a, b = expr.split(\"&\")\n        if a == b:\n            return a\n        if a == \"0\" or b == \"0\":\n            return \"0\"\n        if a == \"1\":\n            return b\n        if b == \"1\":\n            return a\n    return expr\n\nprint(simplify(\"A|A\"))\nprint(simplify(\"A&1\"))\nprint(simplify(\"A|~A\"))',
    testCases: [
    ],
    hints: [
      'Handle complement cases A|~A=1 and A&~A=0 early.',
      'Then apply idempotent and identity/annihilator laws.',
      'Assume no parentheses and only one operator for simplicity.'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t4-drill-1',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'XOR Parity Bit',
    difficulty: 1,
    description: 'Given a binary string, return 1 if it has odd parity (odd number of 1s), else 0. Use XOR, not count().',
    starterCode: '# Parity using XOR\ndef parity(bit_str):\n    # Your code here\n    pass\n\nprint(parity(\"1011\"))  # 1',
    solution: 'def parity(bit_str):\n    p = 0\n    for b in bit_str:\n        p ^= int(b)\n    return p\n\nprint(parity("1011"))',
    testCases: [
    ],
    hints: [
      'Initialize parity bit to 0 and XOR with each input bit.',
      'XOR accumulates odd/even counts of 1s.'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t4-drill-2',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'NAND from AND/NOT',
    difficulty: 1,
    description: 'Implement a NAND function using only Python’s logical operations (not using bitwise operators). Inputs are booleans.',
    starterCode: '# NAND using and/not\ndef nand(a, b):\n    # Your code here\n    pass\n\nprint(nand(True, True))',
    solution: 'def nand(a, b):\n    return not (a and b)\n\nprint(nand(True, True))',
    testCases: [
    ],
    hints: [
      'NAND is the negation of AND.',
      'Use logical operators, not bitwise.'
    ],
    language: 'python'
  }
];
