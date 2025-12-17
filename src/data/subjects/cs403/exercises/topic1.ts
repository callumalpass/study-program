import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'cs403-t1-ex01',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Verify 3-SAT Instance',
    difficulty: 2,
    description: 'Given a 3-SAT formula and a truth assignment, verify if the assignment satisfies the formula. This demonstrates that SAT is in NP - verification is polynomial time.',
    starterCode: `def verify_3sat(formula, assignment):
    """
    Verify if a truth assignment satisfies a 3-SAT formula.

    Args:
        formula: List of clauses, where each clause is a list of literals.
                 Positive integers represent variables, negative integers represent negated variables.
                 Example: [[1, -2, 3], [-1, 2, -3]] means (x1 OR NOT x2 OR x3) AND (NOT x1 OR x2 OR NOT x3)
        assignment: Dictionary mapping variable numbers to boolean values.
                    Example: {1: True, 2: False, 3: True}

    Returns:
        bool: True if the assignment satisfies the formula, False otherwise.
    """
    # Your code here
    pass`,
    solution: `def verify_3sat(formula, assignment):
    """
    Verify if a truth assignment satisfies a 3-SAT formula.

    Args:
        formula: List of clauses, where each clause is a list of literals.
        assignment: Dictionary mapping variable numbers to boolean values.

    Returns:
        bool: True if the assignment satisfies the formula, False otherwise.
    """
    for clause in formula:
        clause_satisfied = False
        for literal in clause:
            var_num = abs(literal)
            var_value = assignment.get(var_num, False)

            # Check if literal is satisfied
            if literal > 0:  # Positive literal
                if var_value:
                    clause_satisfied = True
                    break
            else:  # Negative literal
                if not var_value:
                    clause_satisfied = True
                    break

        # If any clause is not satisfied, formula is not satisfied
        if not clause_satisfied:
            return False

    return True`,
    testCases: [
      {
        input: 'formula = [[1, 2, 3]], assignment = {1: True, 2: False, 3: False}',
        isHidden: false,
        description: 'Single clause, first literal satisfies it'
      },
      {
        input: 'formula = [[1, -2, 3], [-1, 2, -3]], assignment = {1: True, 2: True, 3: False}',
        isHidden: false,
        description: 'Two clauses, both satisfied'
      },
      {
        input: 'formula = [[1, 2, 3], [-1, -2, -3]], assignment = {1: False, 2: False, 3: False}',
        isHidden: false,
        description: 'Formula not satisfied'
      }
    ],
    hints: [
      'A clause is satisfied if at least one of its literals is true',
      'For a positive literal k, check if assignment[k] is True',
      'For a negative literal -k, check if assignment[k] is False',
      'The entire formula is satisfied if all clauses are satisfied'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex02',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Hamiltonian Cycle Verification',
    difficulty: 3,
    description: 'Given a graph and a proposed Hamiltonian cycle, verify if it is valid. This shows that Hamiltonian Cycle is in NP.',
    starterCode: `def verify_hamiltonian_cycle(graph, cycle):
    """
    Verify if a proposed cycle is a valid Hamiltonian cycle.

    Args:
        graph: Dictionary representing adjacency list.
               Example: {0: [1, 2], 1: [0, 2], 2: [0, 1]}
        cycle: List of vertices representing the proposed cycle.
               Example: [0, 1, 2, 0]

    Returns:
        bool: True if cycle is a valid Hamiltonian cycle, False otherwise.
    """
    # Your code here
    pass`,
    solution: `def verify_hamiltonian_cycle(graph, cycle):
    """
    Verify if a proposed cycle is a valid Hamiltonian cycle.

    Args:
        graph: Dictionary representing adjacency list.
        cycle: List of vertices representing the proposed cycle.

    Returns:
        bool: True if cycle is a valid Hamiltonian cycle, False otherwise.
    """
    n = len(graph)

    # Check if cycle has correct length (n+1 vertices)
    if len(cycle) != n + 1:
        return False

    # Check if first and last vertices are the same
    if cycle[0] != cycle[-1]:
        return False

    # Check if all vertices (except the repeated one) appear exactly once
    if len(set(cycle[:-1])) != n:
        return False

    # Check if all vertices in the cycle are in the graph
    for vertex in cycle[:-1]:
        if vertex not in graph:
            return False

    # Check if consecutive vertices in the cycle are connected by edges
    for i in range(len(cycle) - 1):
        if cycle[i + 1] not in graph[cycle[i]]:
            return False

    return True`,
    testCases: [
      {
        input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}, cycle = [0, 1, 2, 0]',
        isHidden: false,
        description: 'Valid Hamiltonian cycle in a triangle'
      },
      {
        input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}, cycle = [0, 1, 0]',
        isHidden: false,
        description: 'Invalid - does not visit all vertices'
      },
      {
        input: 'graph = {0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}, cycle = [0, 1, 2, 3, 0]',
        isHidden: false,
        description: 'Invalid - edge 3->0 does not exist'
      }
    ],
    hints: [
      'A Hamiltonian cycle must visit every vertex exactly once and return to start',
      'Check that the cycle length is n+1 (where n is number of vertices)',
      'Verify that first and last vertices in the cycle are the same',
      'Ensure every consecutive pair of vertices in the cycle has an edge between them'
    ],
    language: 'python'
  }
];
