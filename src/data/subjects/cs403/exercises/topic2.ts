import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'cs403-t2-ex01',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Vertex Cover 2-Approximation',
    difficulty: 3,
    description: 'Implement a 2-approximation algorithm for the minimum vertex cover problem using the edge selection strategy.',
    starterCode: `def vertex_cover_approximation(graph):
    """
    Find a 2-approximation for minimum vertex cover.

    Args:
        graph: Dictionary representing adjacency list.

    Returns:
        set: A vertex cover (set of vertices covering all edges).
    """
    # Your code here
    pass`,
    solution: `def vertex_cover_approximation(graph):
    edges = set()
    for u in graph:
        for v in graph[u]:
            if u < v:
                edges.add((u, v))

    cover = set()

    while edges:
        u, v = edges.pop()
        cover.add(u)
        cover.add(v)
        edges = {e for e in edges if u not in e and v not in e}

    return cover`,
    testCases: [
      { input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle graph' },
      { input: 'graph = {0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}', isHidden: false, description: 'Path graph' }
    ],
    hints: ['Select an edge and add both endpoints', 'Remove all covered edges'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex02',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Greedy Set Cover',
    difficulty: 3,
    description: 'Implement the greedy O(log n)-approximation algorithm for the set cover problem.',
    starterCode: `def greedy_set_cover(universe, sets):
    """
    Find an approximate set cover using the greedy algorithm.

    Args:
        universe: Set of elements to cover.
        sets: List of sets.

    Returns:
        list: Indices of sets in the cover.
    """
    # Your code here
    pass`,
    solution: `def greedy_set_cover(universe, sets):
    uncovered = set(universe)
    cover_indices = []

    while uncovered:
        best_idx = max(range(len(sets)), key=lambda i: len(sets[i] & uncovered))
        if len(sets[best_idx] & uncovered) == 0:
            break
        cover_indices.append(best_idx)
        uncovered -= sets[best_idx]

    return cover_indices`,
    testCases: [
      { input: 'universe = {1, 2, 3, 4, 5}, sets = [{1, 2, 3}, {2, 4}, {3, 4}, {4, 5}]', isHidden: false, description: 'Basic instance' },
      { input: 'universe = {1, 2, 3}, sets = [{1}, {2}, {3}, {1, 2, 3}]', isHidden: false, description: 'Prefer largest set' }
    ],
    hints: ['Select set covering most uncovered elements', 'O(log n) approximation'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex03',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Metric TSP 2-Approximation',
    difficulty: 4,
    description: 'Implement a 2-approximation for metric TSP using minimum spanning tree.',
    starterCode: `def tsp_mst_approximation(distances):
    """
    Find a 2-approximation for metric TSP using MST.

    Args:
        distances: 2D matrix of distances (satisfies triangle inequality)

    Returns:
        list: Tour as list of vertex indices
    """
    # Your code here
    pass`,
    solution: `def tsp_mst_approximation(distances):
    n = len(distances)
    # Prim's MST
    in_mst = [False] * n
    mst_adj = [[] for _ in range(n)]
    in_mst[0] = True
    edges = [(distances[0][j], 0, j) for j in range(1, n)]
    import heapq
    heapq.heapify(edges)

    while edges:
        cost, u, v = heapq.heappop(edges)
        if in_mst[v]:
            continue
        in_mst[v] = True
        mst_adj[u].append(v)
        mst_adj[v].append(u)
        for w in range(n):
            if not in_mst[w]:
                heapq.heappush(edges, (distances[v][w], v, w))

    # DFS preorder traversal
    tour = []
    visited = [False] * n
    def dfs(v):
        visited[v] = True
        tour.append(v)
        for u in mst_adj[v]:
            if not visited[u]:
                dfs(u)
    dfs(0)
    tour.append(0)
    return tour`,
    testCases: [
      { input: 'distances = [[0,1,2],[1,0,1],[2,1,0]]', isHidden: false, description: '3-city metric TSP' },
      { input: 'distances = [[0,1,1,1],[1,0,1,1],[1,1,0,1],[1,1,1,0]]', isHidden: false, description: 'Complete graph' }
    ],
    hints: ['Build MST first', 'DFS preorder gives Hamiltonian path', 'Triangle inequality ensures shortcutting works'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex04',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Load Balancing Approximation',
    difficulty: 3,
    description: 'Implement a 2-approximation for load balancing (makespan minimization) using LPT scheduling.',
    starterCode: `def load_balance(jobs, num_machines):
    """
    Assign jobs to machines to minimize makespan.

    Args:
        jobs: List of job processing times
        num_machines: Number of machines

    Returns:
        list: Assignment of each job to a machine
    """
    # Your code here
    pass`,
    solution: `def load_balance(jobs, num_machines):
    n = len(jobs)
    assignment = [0] * n
    loads = [0] * num_machines

    # Sort jobs by decreasing size (LPT)
    sorted_jobs = sorted(enumerate(jobs), key=lambda x: -x[1])

    for job_idx, job_time in sorted_jobs:
        # Assign to least loaded machine
        min_machine = min(range(num_machines), key=lambda m: loads[m])
        assignment[job_idx] = min_machine
        loads[min_machine] += job_time

    return assignment`,
    testCases: [
      { input: 'jobs = [3, 3, 2, 2, 2], num_machines = 2', isHidden: false, description: 'Balance 5 jobs on 2 machines' },
      { input: 'jobs = [5, 4, 3, 2, 1], num_machines = 3', isHidden: false, description: 'LPT scheduling' }
    ],
    hints: ['Sort jobs by decreasing time', 'Assign to least loaded machine', 'This is LPT (Longest Processing Time)'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex05',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Bin Packing First Fit Decreasing',
    difficulty: 3,
    description: 'Implement the First Fit Decreasing (FFD) algorithm for bin packing, which achieves an 11/9 approximation.',
    starterCode: `def bin_packing_ffd(items, capacity):
    """
    Pack items into bins using First Fit Decreasing.

    Args:
        items: List of item sizes
        capacity: Bin capacity

    Returns:
        list: Assignment of each item to a bin
    """
    # Your code here
    pass`,
    solution: `def bin_packing_ffd(items, capacity):
    n = len(items)
    assignment = [0] * n
    sorted_items = sorted(enumerate(items), key=lambda x: -x[1])

    bins = []  # Current space remaining in each bin

    for item_idx, size in sorted_items:
        placed = False
        for bin_idx, remaining in enumerate(bins):
            if remaining >= size:
                assignment[item_idx] = bin_idx
                bins[bin_idx] -= size
                placed = True
                break
        if not placed:
            assignment[item_idx] = len(bins)
            bins.append(capacity - size)

    return assignment`,
    testCases: [
      { input: 'items = [4, 8, 1, 4, 2, 1], capacity = 10', isHidden: false, description: 'Decreasing order helps' },
      { input: 'items = [7, 5, 5, 3, 3, 3, 3], capacity = 10', isHidden: false, description: 'FFD packing' }
    ],
    hints: ['Sort items by decreasing size first', 'First Fit: put in first bin that fits', '11/9 OPT + 6/9 approximation'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex06',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Knapsack FPTAS',
    difficulty: 5,
    description: 'Implement a Fully Polynomial-Time Approximation Scheme (FPTAS) for the 0/1 knapsack problem.',
    starterCode: `def knapsack_fptas(weights, values, capacity, epsilon):
    """
    (1-epsilon)-approximation for knapsack.

    Args:
        weights: List of item weights
        values: List of item values
        capacity: Knapsack capacity
        epsilon: Approximation parameter (0 < epsilon < 1)

    Returns:
        list: Indices of selected items
    """
    # Your code here
    pass`,
    solution: `def knapsack_fptas(weights, values, capacity, epsilon):
    n = len(values)
    if n == 0:
        return []

    v_max = max(values)
    K = epsilon * v_max / n  # Scaling factor

    # Scale values
    scaled = [int(v / K) for v in values]
    V = sum(scaled)

    # DP with scaled values
    # dp[v] = min weight to achieve value v
    INF = float('inf')
    dp = [INF] * (V + 1)
    dp[0] = 0
    parent = [[-1, -1] for _ in range(V + 1)]

    for i in range(n):
        for v in range(V, scaled[i] - 1, -1):
            if dp[v - scaled[i]] + weights[i] < dp[v]:
                dp[v] = dp[v - scaled[i]] + weights[i]
                parent[v] = [i, v - scaled[i]]

    # Find best achievable value within capacity
    best_v = max(v for v in range(V + 1) if dp[v] <= capacity)

    # Reconstruct solution
    selected = []
    v = best_v
    while parent[v][0] != -1:
        selected.append(parent[v][0])
        v = parent[v][1]

    return selected`,
    testCases: [
      { input: 'weights = [2, 3, 4, 5], values = [3, 4, 5, 6], capacity = 8, epsilon = 0.5', isHidden: false, description: 'FPTAS knapsack' },
      { input: 'weights = [1, 2, 3], values = [10, 20, 30], capacity = 4, epsilon = 0.3', isHidden: false, description: 'Small instance' }
    ],
    hints: ['Scale values by K = εv_max/n', 'Run DP on scaled values', 'Time is O(n³/ε)'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex07',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'MAX-SAT Approximation',
    difficulty: 4,
    description: 'Implement a 1/2-approximation for MAX-SAT using random assignment.',
    starterCode: `def max_sat_random(formula, num_vars):
    """
    Random 1/2-approximation for MAX-SAT.

    Args:
        formula: List of clauses (each clause is list of literals)
        num_vars: Number of variables

    Returns:
        tuple: (assignment dict, number of satisfied clauses)
    """
    # Your code here
    pass`,
    solution: `import random

def max_sat_random(formula, num_vars):
    # Random assignment
    assignment = {i: random.random() < 0.5 for i in range(1, num_vars + 1)}

    # Count satisfied clauses
    satisfied = 0
    for clause in formula:
        for literal in clause:
            var = abs(literal)
            if (literal > 0 and assignment[var]) or (literal < 0 and not assignment[var]):
                satisfied += 1
                break

    return (assignment, satisfied)`,
    testCases: [
      { input: 'formula = [[1, 2], [-1, -2], [1, -2]], num_vars = 2', isHidden: false, description: 'Simple MAX-SAT' },
      { input: 'formula = [[1], [-1]], num_vars = 1', isHidden: false, description: 'Contradictory clauses' }
    ],
    hints: ['Random assignment satisfies each clause with probability >= 1/2', 'Expected number >= m/2 clauses'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex08',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Christofides Algorithm Helper',
    difficulty: 4,
    description: 'Implement minimum weight perfect matching for odd-degree vertices (part of Christofides algorithm).',
    starterCode: `def find_odd_vertices(mst_adj, n):
    """
    Find vertices with odd degree in MST.

    Args:
        mst_adj: Adjacency list of MST
        n: Number of vertices

    Returns:
        list: Vertices with odd degree
    """
    # Your code here
    pass`,
    solution: `def find_odd_vertices(mst_adj, n):
    odd_vertices = []
    for v in range(n):
        if len(mst_adj[v]) % 2 == 1:
            odd_vertices.append(v)
    return odd_vertices`,
    testCases: [
      { input: 'mst_adj = [[1], [0, 2], [1]], n = 3', isHidden: false, description: 'Path: endpoints odd' },
      { input: 'mst_adj = [[1, 2, 3], [0], [0], [0]], n = 4', isHidden: false, description: 'Star: center has degree 3' }
    ],
    hints: ['Count degree of each vertex', 'Odd if degree is odd number'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex09',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Weighted Vertex Cover LP Rounding',
    difficulty: 4,
    description: 'Implement LP rounding for weighted vertex cover (2-approximation).',
    starterCode: `def weighted_vertex_cover_lp(graph, weights):
    """
    2-approximation for weighted vertex cover via LP rounding.

    Args:
        graph: Adjacency list
        weights: Vertex weights

    Returns:
        set: Vertices in cover
    """
    # Your code here (assume LP solution provided)
    pass`,
    solution: `def weighted_vertex_cover_lp(graph, weights):
    # Simulate LP relaxation result
    # In practice, would solve LP: min sum(w_v * x_v) s.t. x_u + x_v >= 1 for each edge
    # Round: include v if x_v >= 1/2

    n = len(graph)
    # Simple greedy heuristic simulating LP
    cover = set()
    uncovered_edges = set()
    for u in graph:
        for v in graph[u]:
            if u < v:
                uncovered_edges.add((u, v))

    while uncovered_edges:
        # Pick edge, add cheaper endpoint (heuristic for LP)
        u, v = uncovered_edges.pop()
        chosen = u if weights[u] <= weights[v] else v
        cover.add(chosen)
        uncovered_edges = {e for e in uncovered_edges if chosen not in e}

    return cover`,
    testCases: [
      { input: 'graph = {0: [1], 1: [0, 2], 2: [1]}, weights = [1, 10, 1]', isHidden: false, description: 'Prefer cheap vertices' },
      { input: 'graph = {0: [1, 2], 1: [0], 2: [0]}, weights = [3, 1, 1]', isHidden: false, description: 'Star with expensive center' }
    ],
    hints: ['LP relaxation allows fractional solutions', 'Round threshold at 1/2', 'This gives 2-approximation'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex10',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Max Cut Approximation',
    difficulty: 4,
    description: 'Implement a 1/2-approximation for MAX-CUT using a simple greedy algorithm.',
    starterCode: `def max_cut_greedy(graph):
    """
    1/2-approximation for MAX-CUT.

    Args:
        graph: Adjacency list with edge weights

    Returns:
        tuple: (set S, set T) partition
    """
    # Your code here
    pass`,
    solution: `def max_cut_greedy(graph):
    vertices = list(graph.keys())
    S, T = set(), set()

    for v in vertices:
        # Count edges to S and T
        edges_to_S = sum(1 for u in graph[v] if u in S)
        edges_to_T = sum(1 for u in graph[v] if u in T)

        # Put v on side with fewer neighbors (more crossing edges)
        if edges_to_S <= edges_to_T:
            S.add(v)
        else:
            T.add(v)

    return (S, T)`,
    testCases: [
      { input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle' },
      { input: 'graph = {0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}', isHidden: false, description: 'Star graph' }
    ],
    hints: ['Process vertices one by one', 'Put each vertex where it creates more cut edges', 'Each edge counted with probability >= 1/2'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex11',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Metric k-Center',
    difficulty: 4,
    description: 'Implement a 2-approximation for the metric k-center problem.',
    starterCode: `def k_center(distances, k):
    """
    2-approximation for k-center.

    Args:
        distances: Distance matrix
        k: Number of centers

    Returns:
        list: Indices of k center vertices
    """
    # Your code here
    pass`,
    solution: `def k_center(distances, k):
    n = len(distances)
    if k >= n:
        return list(range(n))

    centers = [0]  # Start with arbitrary point
    min_dist = list(distances[0])  # Distance to nearest center

    for _ in range(k - 1):
        # Find farthest point from current centers
        farthest = max(range(n), key=lambda v: min_dist[v])
        centers.append(farthest)

        # Update min distances
        for v in range(n):
            min_dist[v] = min(min_dist[v], distances[farthest][v])

    return centers`,
    testCases: [
      { input: 'distances = [[0,1,2],[1,0,1],[2,1,0]], k = 2', isHidden: false, description: '3 points, 2 centers' },
      { input: 'distances = [[0,1,1,1],[1,0,1,1],[1,1,0,1],[1,1,1,0]], k = 1', isHidden: false, description: 'Single center' }
    ],
    hints: ['Greedy farthest-first traversal', 'Each new center is farthest from existing', '2-approximation for metric spaces'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex12',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Steiner Tree Approximation',
    difficulty: 5,
    description: 'Implement a 2-approximation for the Steiner tree problem using MST on metric closure.',
    starterCode: `def steiner_tree(graph, terminals):
    """
    2-approximation for Steiner tree.

    Args:
        graph: Weighted adjacency list
        terminals: Set of terminal vertices

    Returns:
        list: Edges in approximate Steiner tree
    """
    # Your code here
    pass`,
    solution: `def steiner_tree(graph, terminals):
    # Compute shortest paths between all terminals
    import heapq

    def dijkstra(src):
        dist = {v: float('inf') for v in graph}
        dist[src] = 0
        pq = [(0, src)]
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]:
                continue
            for v, w in graph[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    heapq.heappush(pq, (dist[v], v))
        return dist

    # Build complete graph on terminals with shortest path distances
    terminal_list = list(terminals)
    terminal_dist = {t: dijkstra(t) for t in terminal_list}

    # MST on terminals using Prim's
    in_mst = {terminal_list[0]}
    mst_edges = []
    while len(in_mst) < len(terminal_list):
        best_edge = None
        best_cost = float('inf')
        for u in in_mst:
            for v in terminal_list:
                if v not in in_mst and terminal_dist[u][v] < best_cost:
                    best_cost = terminal_dist[u][v]
                    best_edge = (u, v)
        if best_edge:
            mst_edges.append(best_edge)
            in_mst.add(best_edge[1])

    return mst_edges`,
    testCases: [
      { input: 'graph = {0: [(1, 1)], 1: [(0, 1), (2, 1)], 2: [(1, 1)]}, terminals = {0, 2}', isHidden: false, description: 'Path graph' },
      { input: 'graph = {0: [(1, 1), (2, 2)], 1: [(0, 1), (2, 1)], 2: [(0, 2), (1, 1)]}, terminals = {0, 1, 2}', isHidden: false, description: 'Triangle' }
    ],
    hints: ['Compute metric closure on terminals', 'Find MST on terminal graph', 'Expand paths back to original graph'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex13',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Facility Location Greedy',
    difficulty: 4,
    description: 'Implement a greedy approximation for the uncapacitated facility location problem.',
    starterCode: `def facility_location(facility_costs, connection_costs):
    """
    Greedy approximation for facility location.

    Args:
        facility_costs: List of opening costs for each facility
        connection_costs: 2D list where [i][j] is cost to connect client i to facility j

    Returns:
        list: Indices of opened facilities
    """
    # Your code here
    pass`,
    solution: `def facility_location(facility_costs, connection_costs):
    num_clients = len(connection_costs)
    num_facilities = len(facility_costs)

    opened = set()
    assigned = [None] * num_clients

    # Greedy: repeatedly open best facility
    while None in assigned:
        best_facility = None
        best_improvement = -float('inf')

        for f in range(num_facilities):
            if f in opened:
                continue
            # Cost to open and connect unassigned clients
            improvement = -facility_costs[f]
            for c in range(num_clients):
                if assigned[c] is None:
                    curr_cost = min(connection_costs[c][of] for of in opened) if opened else float('inf')
                    new_cost = connection_costs[c][f]
                    improvement += max(0, curr_cost - new_cost)

            if improvement > best_improvement:
                best_improvement = improvement
                best_facility = f

        if best_facility is None:
            break

        opened.add(best_facility)
        # Assign clients to closest open facility
        for c in range(num_clients):
            if assigned[c] is None or connection_costs[c][best_facility] < connection_costs[c][assigned[c]]:
                assigned[c] = best_facility

    return list(opened)`,
    testCases: [
      { input: 'facility_costs = [10, 10], connection_costs = [[1, 5], [5, 1]]', isHidden: false, description: 'Two facilities, two clients' },
      { input: 'facility_costs = [5, 5, 5], connection_costs = [[1, 2, 3], [3, 2, 1]]', isHidden: false, description: 'Symmetric setup' }
    ],
    hints: ['Open facility with best cost/benefit ratio', 'Consider opening cost plus connection savings'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex14',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Graph Coloring Greedy',
    difficulty: 2,
    description: 'Implement greedy graph coloring that uses at most Δ+1 colors where Δ is max degree.',
    starterCode: `def greedy_coloring(graph):
    """
    Greedy graph coloring.

    Args:
        graph: Adjacency list

    Returns:
        dict: Mapping from vertex to color
    """
    # Your code here
    pass`,
    solution: `def greedy_coloring(graph):
    coloring = {}
    vertices = sorted(graph.keys(), key=lambda v: -len(graph[v]))  # Process high-degree first

    for v in vertices:
        # Find colors used by neighbors
        neighbor_colors = {coloring[u] for u in graph[v] if u in coloring}

        # Assign smallest available color
        color = 0
        while color in neighbor_colors:
            color += 1
        coloring[v] = color

    return coloring`,
    testCases: [
      { input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle needs 3 colors' },
      { input: 'graph = {0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}', isHidden: false, description: 'Path needs 2 colors' }
    ],
    hints: ['Use smallest color not used by neighbors', 'At most Δ+1 colors needed'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex15',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Makespan Lower Bound',
    difficulty: 2,
    description: 'Compute lower bounds on optimal makespan for load balancing.',
    starterCode: `def makespan_lower_bound(jobs, num_machines):
    """
    Compute lower bounds on optimal makespan.

    Args:
        jobs: List of job times
        num_machines: Number of machines

    Returns:
        float: Lower bound on optimal makespan
    """
    # Your code here
    pass`,
    solution: `def makespan_lower_bound(jobs, num_machines):
    # Two lower bounds:
    # 1. Average load
    avg_bound = sum(jobs) / num_machines
    # 2. Largest job
    max_bound = max(jobs) if jobs else 0
    return max(avg_bound, max_bound)`,
    testCases: [
      { input: 'jobs = [4, 3, 3], num_machines = 2', isHidden: false, description: 'Total=10, max=4, LB=5' },
      { input: 'jobs = [10, 1, 1, 1], num_machines = 2', isHidden: false, description: 'Large job dominates' }
    ],
    hints: ['Average load is a lower bound', 'Largest job is a lower bound', 'Take maximum'],
    language: 'python'
  },
  {
    id: 'cs403-t2-ex16',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Approximation Ratio Calculator',
    difficulty: 2,
    description: 'Calculate the approximation ratio given algorithm output and optimal solution.',
    starterCode: `def approximation_ratio(algorithm_value, optimal_value, is_minimization):
    """
    Calculate approximation ratio.

    Args:
        algorithm_value: Value achieved by algorithm
        optimal_value: Optimal value
        is_minimization: True if minimization problem

    Returns:
        float: Approximation ratio (>= 1)
    """
    # Your code here
    pass`,
    solution: `def approximation_ratio(algorithm_value, optimal_value, is_minimization):
    if optimal_value == 0:
        return float('inf') if algorithm_value != 0 else 1.0

    if is_minimization:
        return algorithm_value / optimal_value
    else:
        return optimal_value / algorithm_value`,
    testCases: [
      { input: 'algorithm_value = 10, optimal_value = 5, is_minimization = True', isHidden: false, description: '2-approx for min' },
      { input: 'algorithm_value = 7, optimal_value = 10, is_minimization = False', isHidden: false, description: '10/7-approx for max' }
    ],
    hints: ['For min: ALG/OPT', 'For max: OPT/ALG', 'Ratio >= 1 by convention'],
    language: 'python'
  }
];
