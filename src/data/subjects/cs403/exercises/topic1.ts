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
        assignment: Dictionary mapping variable numbers to boolean values.

    Returns:
        bool: True if the assignment satisfies the formula, False otherwise.
    """
    # Your code here
    pass`,
    solution: `def verify_3sat(formula, assignment):
    for clause in formula:
        clause_satisfied = False
        for literal in clause:
            var_num = abs(literal)
            var_value = assignment.get(var_num, False)
            if literal > 0:
                if var_value:
                    clause_satisfied = True
                    break
            else:
                if not var_value:
                    clause_satisfied = True
                    break
        if not clause_satisfied:
            return False
    return True`,
    testCases: [
      { input: 'formula = [[1, 2, 3]], assignment = {1: True, 2: False, 3: False}', isHidden: false, description: 'Single clause satisfied' },
      { input: 'formula = [[1, -2, 3], [-1, 2, -3]], assignment = {1: True, 2: True, 3: False}', isHidden: false, description: 'Two clauses satisfied' },
      { input: 'formula = [[1, 2, 3], [-1, -2, -3]], assignment = {1: False, 2: False, 3: False}', isHidden: false, description: 'Not satisfied' }
    ],
    hints: ['A clause is satisfied if at least one literal is true', 'Check all clauses must be satisfied'],
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
        cycle: List of vertices representing the proposed cycle.

    Returns:
        bool: True if cycle is a valid Hamiltonian cycle, False otherwise.
    """
    # Your code here
    pass`,
    solution: `def verify_hamiltonian_cycle(graph, cycle):
    n = len(graph)
    if len(cycle) != n + 1:
        return False
    if cycle[0] != cycle[-1]:
        return False
    if len(set(cycle[:-1])) != n:
        return False
    for vertex in cycle[:-1]:
        if vertex not in graph:
            return False
    for i in range(len(cycle) - 1):
        if cycle[i + 1] not in graph[cycle[i]]:
            return False
    return True`,
    testCases: [
      { input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}, cycle = [0, 1, 2, 0]', isHidden: false, description: 'Valid cycle in triangle' },
      { input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}, cycle = [0, 1, 0]', isHidden: false, description: 'Invalid - missing vertex' }
    ],
    hints: ['Check cycle visits all vertices exactly once', 'Verify edges exist between consecutive vertices'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex03',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Vertex Cover Verifier',
    difficulty: 2,
    description: 'Verify if a given set of vertices forms a valid vertex cover of a graph - every edge must have at least one endpoint in the cover.',
    starterCode: `def verify_vertex_cover(edges, cover, k):
    """
    Verify if cover is a valid vertex cover of size at most k.

    Args:
        edges: List of tuples representing edges [(u, v), ...]
        cover: Set of vertices in the proposed cover
        k: Maximum allowed cover size

    Returns:
        bool: True if cover is valid and |cover| <= k
    """
    # Your code here
    pass`,
    solution: `def verify_vertex_cover(edges, cover, k):
    if len(cover) > k:
        return False
    for u, v in edges:
        if u not in cover and v not in cover:
            return False
    return True`,
    testCases: [
      { input: 'edges = [(0,1), (1,2), (2,0)], cover = {0, 1}, k = 2', isHidden: false, description: 'Valid cover' },
      { input: 'edges = [(0,1), (1,2), (2,0)], cover = {0}, k = 2', isHidden: false, description: 'Invalid - edge 1-2 not covered' }
    ],
    hints: ['Check every edge has at least one endpoint in cover', 'Verify cover size constraint'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex04',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Independent Set Verifier',
    difficulty: 2,
    description: 'Verify if a set of vertices forms an independent set in a graph (no two vertices in the set are adjacent).',
    starterCode: `def verify_independent_set(graph, vertices, k):
    """
    Verify if vertices form an independent set of size at least k.

    Args:
        graph: Adjacency list representation
        vertices: Set of vertices in proposed independent set
        k: Minimum required size

    Returns:
        bool: True if valid independent set of size >= k
    """
    # Your code here
    pass`,
    solution: `def verify_independent_set(graph, vertices, k):
    if len(vertices) < k:
        return False
    vertex_list = list(vertices)
    for i in range(len(vertex_list)):
        for j in range(i + 1, len(vertex_list)):
            if vertex_list[j] in graph.get(vertex_list[i], []):
                return False
    return True`,
    testCases: [
      { input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}, vertices = {0}, k = 1', isHidden: false, description: 'Single vertex is independent' },
      { input: 'graph = {0: [1], 1: [0, 2], 2: [1]}, vertices = {0, 2}, k = 2', isHidden: false, description: 'Valid independent set' }
    ],
    hints: ['No two vertices in the set should share an edge', 'Check all pairs of vertices'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex05',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Clique Verifier',
    difficulty: 2,
    description: 'Verify if a set of vertices forms a clique (complete subgraph) in the given graph.',
    starterCode: `def verify_clique(graph, vertices, k):
    """
    Verify if vertices form a clique of size at least k.

    Args:
        graph: Adjacency list representation
        vertices: Set of vertices in proposed clique
        k: Minimum clique size

    Returns:
        bool: True if valid clique of size >= k
    """
    # Your code here
    pass`,
    solution: `def verify_clique(graph, vertices, k):
    if len(vertices) < k:
        return False
    vertex_list = list(vertices)
    for i in range(len(vertex_list)):
        for j in range(i + 1, len(vertex_list)):
            if vertex_list[j] not in graph.get(vertex_list[i], []):
                return False
    return True`,
    testCases: [
      { input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}, vertices = {0, 1, 2}, k = 3', isHidden: false, description: 'Triangle is a clique' },
      { input: 'graph = {0: [1], 1: [0, 2], 2: [1]}, vertices = {0, 2}, k = 2', isHidden: false, description: 'Invalid - no edge between 0 and 2' }
    ],
    hints: ['Every pair of vertices in a clique must be connected', 'Check all pairs'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex06',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Subset Sum Verifier',
    difficulty: 1,
    description: 'Verify if a subset of numbers sums to a target value.',
    starterCode: `def verify_subset_sum(numbers, subset, target):
    """
    Verify if the given subset sums to target.

    Args:
        numbers: List of available numbers
        subset: Indices of numbers in the proposed subset
        target: Target sum

    Returns:
        bool: True if subset sums to target
    """
    # Your code here
    pass`,
    solution: `def verify_subset_sum(numbers, subset, target):
    total = sum(numbers[i] for i in subset)
    return total == target`,
    testCases: [
      { input: 'numbers = [3, 1, 5, 2], subset = [0, 3], target = 5', isHidden: false, description: '3 + 2 = 5' },
      { input: 'numbers = [1, 2, 3], subset = [0, 1, 2], target = 6', isHidden: false, description: 'All elements' }
    ],
    hints: ['Sum the elements at the given indices', 'Compare to target'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex07',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Graph Coloring Verifier',
    difficulty: 2,
    description: 'Verify if a coloring is a valid k-coloring of a graph (no adjacent vertices share a color).',
    starterCode: `def verify_coloring(graph, coloring, k):
    """
    Verify if coloring is a valid k-coloring.

    Args:
        graph: Adjacency list
        coloring: Dictionary mapping vertex to color (0 to k-1)
        k: Number of colors

    Returns:
        bool: True if valid k-coloring
    """
    # Your code here
    pass`,
    solution: `def verify_coloring(graph, coloring, k):
    for vertex in graph:
        if vertex not in coloring or coloring[vertex] >= k:
            return False
        for neighbor in graph[vertex]:
            if coloring.get(vertex) == coloring.get(neighbor):
                return False
    return True`,
    testCases: [
      { input: 'graph = {0: [1], 1: [0, 2], 2: [1]}, coloring = {0: 0, 1: 1, 2: 0}, k = 2', isHidden: false, description: 'Valid 2-coloring of path' },
      { input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}, coloring = {0: 0, 1: 1, 2: 0}, k = 2', isHidden: false, description: 'Invalid - triangle needs 3 colors' }
    ],
    hints: ['Check no adjacent vertices have the same color', 'Verify all colors are in range'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex08',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Partition Problem Verifier',
    difficulty: 2,
    description: 'Verify if a partition divides a set into two subsets with equal sums.',
    starterCode: `def verify_partition(numbers, partition):
    """
    Verify if partition divides numbers into two equal-sum subsets.

    Args:
        numbers: List of numbers
        partition: Set of indices for one subset

    Returns:
        bool: True if partition is valid
    """
    # Your code here
    pass`,
    solution: `def verify_partition(numbers, partition):
    total = sum(numbers)
    if total % 2 != 0:
        return False
    subset_sum = sum(numbers[i] for i in partition)
    return subset_sum == total // 2`,
    testCases: [
      { input: 'numbers = [1, 5, 3, 3], partition = {1}', isHidden: false, description: '{5} and {1,3,3} both sum to 6' },
      { input: 'numbers = [1, 2, 3, 5], partition = {0, 2}', isHidden: false, description: 'Valid partition: {1,3} and {2,5}' }
    ],
    hints: ['Sum must be even for partition to exist', 'One subset determines the other'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex09',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Reduce Vertex Cover to Independent Set',
    difficulty: 4,
    description: 'Implement a polynomial-time reduction from Vertex Cover to Independent Set. Given a graph and parameter k for vertex cover, output an instance for independent set.',
    starterCode: `def reduce_vc_to_is(graph, k):
    """
    Reduce Vertex Cover to Independent Set.

    Args:
        graph: Adjacency list (original graph)
        k: Vertex cover size bound

    Returns:
        tuple: (same_graph, k_prime) where finding IS of size k_prime
               in same_graph solves the VC instance
    """
    # Your code here
    pass`,
    solution: `def reduce_vc_to_is(graph, k):
    n = len(graph)
    k_prime = n - k  # IS of size n-k exists iff VC of size k exists
    return (graph, k_prime)`,
    testCases: [
      { input: 'graph = {0: [1], 1: [0]}, k = 1', isHidden: false, description: 'Edge graph: VC=1 iff IS=1' },
      { input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}, k = 2', isHidden: false, description: 'Triangle: VC=2 iff IS=1' }
    ],
    hints: ['Complement relationship: V - VC is an IS', 'Graph stays the same, only k changes'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex10',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Reduce 3-SAT to Clique',
    difficulty: 5,
    description: 'Implement the classic reduction from 3-SAT to Clique. Build a graph where satisfying assignments correspond to cliques.',
    starterCode: `def reduce_3sat_to_clique(formula):
    """
    Reduce 3-SAT to Clique problem.

    Args:
        formula: List of clauses, each with 3 literals

    Returns:
        tuple: (graph, k) where graph has a clique of size k
               iff formula is satisfiable
    """
    # Your code here
    pass`,
    solution: `def reduce_3sat_to_clique(formula):
    k = len(formula)  # One vertex per literal, k clauses
    graph = {}

    # Create vertices: (clause_index, literal_position)
    for i, clause in enumerate(formula):
        for j in range(3):
            graph[(i, j)] = []

    # Add edges between non-conflicting literals from different clauses
    for i1, clause1 in enumerate(formula):
        for j1 in range(3):
            for i2, clause2 in enumerate(formula):
                if i1 >= i2:
                    continue
                for j2 in range(3):
                    lit1, lit2 = clause1[j1], clause2[j2]
                    # Connect if literals don't conflict
                    if lit1 != -lit2:
                        graph[(i1, j1)].append((i2, j2))
                        graph[(i2, j2)].append((i1, j1))

    return (graph, k)`,
    testCases: [
      { input: 'formula = [[1, 2, 3], [-1, -2, -3]]', isHidden: false, description: 'Two clauses' },
      { input: 'formula = [[1, 2, 3]]', isHidden: false, description: 'Single clause' }
    ],
    hints: ['Create vertex for each literal occurrence', 'Connect non-conflicting literals from different clauses', 'Clique size = number of clauses'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex11',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Reduce Clique to Vertex Cover',
    difficulty: 4,
    description: 'Implement the reduction from Clique to Vertex Cover using graph complementation.',
    starterCode: `def reduce_clique_to_vc(graph, k):
    """
    Reduce Clique to Vertex Cover.

    Args:
        graph: Adjacency list
        k: Clique size bound

    Returns:
        tuple: (complement_graph, k_prime) for equivalent VC instance
    """
    # Your code here
    pass`,
    solution: `def reduce_clique_to_vc(graph, k):
    vertices = list(graph.keys())
    n = len(vertices)

    # Build complement graph
    complement = {v: [] for v in vertices}
    for v in vertices:
        for u in vertices:
            if u != v and u not in graph[v]:
                complement[v].append(u)

    k_prime = n - k  # VC of size n-k in complement
    return (complement, k_prime)`,
    testCases: [
      { input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}, k = 3', isHidden: false, description: 'Triangle has clique 3' },
      { input: 'graph = {0: [1], 1: [0], 2: []}, k = 2', isHidden: false, description: 'Edge plus isolated vertex' }
    ],
    hints: ['Complement graph: edge iff no edge in original', 'Clique in G iff Independent Set in complement'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex12',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Traveling Salesman Verifier',
    difficulty: 3,
    description: 'Verify if a proposed tour is a valid Hamiltonian cycle with total weight at most k.',
    starterCode: `def verify_tsp(distances, tour, k):
    """
    Verify if tour is valid TSP solution with cost <= k.

    Args:
        distances: 2D matrix of distances
        tour: List of vertices in visit order (including return)
        k: Maximum allowed tour cost

    Returns:
        bool: True if valid tour with cost <= k
    """
    # Your code here
    pass`,
    solution: `def verify_tsp(distances, tour, k):
    n = len(distances)
    if len(tour) != n + 1:
        return False
    if tour[0] != tour[-1]:
        return False
    if len(set(tour[:-1])) != n:
        return False

    total_cost = 0
    for i in range(len(tour) - 1):
        total_cost += distances[tour[i]][tour[i + 1]]

    return total_cost <= k`,
    testCases: [
      { input: 'distances = [[0,10,15],[10,0,20],[15,20,0]], tour = [0,1,2,0], k = 45', isHidden: false, description: 'Tour cost = 10+20+15 = 45' },
      { input: 'distances = [[0,10,15],[10,0,20],[15,20,0]], tour = [0,1,2,0], k = 40', isHidden: false, description: 'Tour cost exceeds k' }
    ],
    hints: ['Sum edge weights along the tour', 'Verify it is a valid Hamiltonian cycle'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex13',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Set Cover Verifier',
    difficulty: 2,
    description: 'Verify if a collection of sets covers all elements in the universe.',
    starterCode: `def verify_set_cover(universe, sets, selected, k):
    """
    Verify if selected sets form a valid set cover.

    Args:
        universe: Set of all elements to cover
        sets: List of sets available
        selected: Indices of selected sets
        k: Maximum number of sets allowed

    Returns:
        bool: True if selected sets cover universe with |selected| <= k
    """
    # Your code here
    pass`,
    solution: `def verify_set_cover(universe, sets, selected, k):
    if len(selected) > k:
        return False
    covered = set()
    for i in selected:
        covered.update(sets[i])
    return universe.issubset(covered)`,
    testCases: [
      { input: 'universe = {1,2,3,4}, sets = [{1,2}, {2,3}, {3,4}], selected = [0, 2], k = 2', isHidden: false, description: '{1,2} and {3,4} cover all' },
      { input: 'universe = {1,2,3,4}, sets = [{1,2}, {3}], selected = [0, 1], k = 2', isHidden: false, description: 'Missing element 4' }
    ],
    hints: ['Union all selected sets', 'Check if universe is covered'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex14',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Circuit Satisfiability Verifier',
    difficulty: 3,
    description: 'Verify if a given input assignment satisfies a boolean circuit.',
    starterCode: `def verify_circuit_sat(circuit, inputs):
    """
    Verify if inputs satisfy the boolean circuit.

    Args:
        circuit: List of gates [(type, input1, input2), ...]
                 Types: 'AND', 'OR', 'NOT', 'INPUT'
        inputs: List of input values (True/False)

    Returns:
        bool: True if circuit outputs True
    """
    # Your code here
    pass`,
    solution: `def verify_circuit_sat(circuit, inputs):
    values = list(inputs)  # Wire values

    for gate_type, *operands in circuit:
        if gate_type == 'INPUT':
            continue
        elif gate_type == 'AND':
            result = values[operands[0]] and values[operands[1]]
        elif gate_type == 'OR':
            result = values[operands[0]] or values[operands[1]]
        elif gate_type == 'NOT':
            result = not values[operands[0]]
        values.append(result)

    return values[-1]`,
    testCases: [
      { input: "circuit = [('INPUT',), ('INPUT',), ('AND', 0, 1)], inputs = [True, True]", isHidden: false, description: 'AND gate satisfied' },
      { input: "circuit = [('INPUT',), ('NOT', 0)], inputs = [False]", isHidden: false, description: 'NOT gate satisfied' }
    ],
    hints: ['Evaluate gates in topological order', 'Track wire values as you go'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex15',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Integer Linear Programming Verifier',
    difficulty: 3,
    description: 'Verify if a proposed solution satisfies integer linear programming constraints.',
    starterCode: `def verify_ilp(A, b, c, x, bound):
    """
    Verify if x is a valid ILP solution with objective >= bound.

    Args:
        A: Constraint matrix (list of lists)
        b: Constraint bounds (Ax <= b)
        c: Objective coefficients
        x: Proposed solution (integers)
        bound: Minimum objective value required

    Returns:
        bool: True if constraints satisfied and c.x >= bound
    """
    # Your code here
    pass`,
    solution: `def verify_ilp(A, b, c, x, bound):
    # Check all constraints Ax <= b
    for i, row in enumerate(A):
        lhs = sum(row[j] * x[j] for j in range(len(x)))
        if lhs > b[i]:
            return False

    # Check objective value
    objective = sum(c[j] * x[j] for j in range(len(x)))
    return objective >= bound`,
    testCases: [
      { input: 'A = [[1, 1], [2, 1]], b = [4, 5], c = [1, 2], x = [1, 2], bound = 4', isHidden: false, description: 'Valid ILP solution' },
      { input: 'A = [[1, 1]], b = [2], c = [1, 1], x = [2, 1], bound = 2', isHidden: false, description: 'Constraint violated' }
    ],
    hints: ['Check each constraint row', 'Compute objective function'],
    language: 'python'
  },
  {
    id: 'cs403-t1-ex16',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'Bin Packing Verifier',
    difficulty: 2,
    description: 'Verify if a proposed bin assignment is valid for the bin packing problem.',
    starterCode: `def verify_bin_packing(items, capacity, assignment, num_bins):
    """
    Verify if assignment is valid bin packing with <= num_bins bins.

    Args:
        items: List of item sizes
        capacity: Bin capacity
        assignment: List mapping item index to bin number
        num_bins: Maximum allowed bins

    Returns:
        bool: True if valid packing within bin limit
    """
    # Your code here
    pass`,
    solution: `def verify_bin_packing(items, capacity, assignment, num_bins):
    if max(assignment) >= num_bins:
        return False

    bin_loads = [0] * num_bins
    for i, item_size in enumerate(items):
        bin_loads[assignment[i]] += item_size

    return all(load <= capacity for load in bin_loads)`,
    testCases: [
      { input: 'items = [4, 3, 3], capacity = 5, assignment = [0, 1, 1], num_bins = 2', isHidden: false, description: 'Bin 0: 4, Bin 1: 6 - invalid' },
      { input: 'items = [2, 3, 2], capacity = 5, assignment = [0, 0, 1], num_bins = 2', isHidden: false, description: 'Valid packing' }
    ],
    hints: ['Track total size in each bin', 'Check no bin exceeds capacity'],
    language: 'python'
  }
];
