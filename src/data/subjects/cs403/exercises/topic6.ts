import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'cs403-t6-ex01',
    subjectId: 'cs403',
    topicId: 'cs403-topic-6',
    title: 'Ford-Fulkerson Algorithm',
    difficulty: 4,
    description: 'Implement the Ford-Fulkerson algorithm to find the maximum flow in a network using DFS to find augmenting paths.',
    starterCode: `def ford_fulkerson(graph, source, sink):
    """
    Find maximum flow using Ford-Fulkerson algorithm.

    Args:
        graph: Adjacency matrix where graph[u][v] is the capacity from u to v.
        source: Source vertex.
        sink: Sink vertex.

    Returns:
        int: Maximum flow value.
    """
    # Your code here
    pass`,
    solution: `def ford_fulkerson(graph, source, sink):
    """
    Find maximum flow using Ford-Fulkerson algorithm.

    Args:
        graph: Adjacency matrix where graph[u][v] is the capacity from u to v.
        source: Source vertex.
        sink: Sink vertex.

    Returns:
        int: Maximum flow value.
    """
    # Create residual graph
    n = len(graph)
    residual = [row[:] for row in graph]

    def dfs(s, t, parent):
        """Find augmenting path using DFS."""
        visited = [False] * n
        stack = [s]
        visited[s] = True

        while stack:
            u = stack.pop()

            for v in range(n):
                if not visited[v] and residual[u][v] > 0:
                    stack.append(v)
                    visited[v] = True
                    parent[v] = u
                    if v == t:
                        return True
        return False

    parent = [-1] * n
    max_flow = 0

    # While there is an augmenting path
    while dfs(source, sink, parent):
        # Find minimum capacity along the path
        path_flow = float('inf')
        s = sink
        while s != source:
            path_flow = min(path_flow, residual[parent[s]][s])
            s = parent[s]

        # Update residual capacities
        v = sink
        while v != source:
            u = parent[v]
            residual[u][v] -= path_flow
            residual[v][u] += path_flow
            v = parent[v]

        max_flow += path_flow
        parent = [-1] * n

    return max_flow`,
    testCases: [
      {
        input: 'graph = [[0, 16, 13, 0, 0, 0], [0, 0, 10, 12, 0, 0], [0, 4, 0, 0, 14, 0], [0, 0, 9, 0, 0, 20], [0, 0, 0, 7, 0, 4], [0, 0, 0, 0, 0, 0]], source = 0, sink = 5',
        isHidden: false,
        description: 'Standard flow network - max flow is 23'
      },
      {
        input: 'graph = [[0, 10, 10, 0], [0, 0, 2, 10], [0, 0, 0, 10], [0, 0, 0, 0]], source = 0, sink = 3',
        isHidden: false,
        description: 'Simple network with bottleneck'
      },
      {
        input: 'graph = [[0, 5, 0], [0, 0, 5], [0, 0, 0]], source = 0, sink = 2',
        isHidden: false,
        description: 'Linear path network'
      }
    ],
    hints: [
      'Create a residual graph that tracks remaining capacity',
      'Use DFS to find an augmenting path from source to sink',
      'Find the minimum capacity along the augmenting path',
      'Update residual capacities: decrease forward edges, increase backward edges',
      'Repeat until no augmenting path exists'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t6-ex02',
    subjectId: 'cs403',
    topicId: 'cs403-topic-6',
    title: 'Bipartite Matching',
    difficulty: 3,
    description: 'Find maximum matching in a bipartite graph by reducing it to a max-flow problem.',
    starterCode: `def max_bipartite_matching(graph):
    """
    Find maximum matching in a bipartite graph.

    Args:
        graph: Adjacency list where graph[u] contains vertices in right set
               that u (in left set) is connected to.
               Example: {0: [0, 1], 1: [0, 2], 2: [1]} means
               Left set {0,1,2} connects to Right set {0,1,2}

    Returns:
        int: Size of maximum matching.
    """
    # Your code here
    pass`,
    solution: `def max_bipartite_matching(graph):
    """
    Find maximum matching in a bipartite graph.

    Args:
        graph: Adjacency list where graph[u] contains vertices in right set
               that u (in left set) is connected to.

    Returns:
        int: Size of maximum matching.
    """
    # match[v] stores the match for vertex v in right set (-1 if unmatched)
    n_right = max(max(neighbors) for neighbors in graph.values() if neighbors) + 1
    match = [-1] * n_right

    def dfs(u, visited):
        """Try to find an augmenting path starting from u."""
        for v in graph.get(u, []):
            if visited[v]:
                continue
            visited[v] = True

            # If v is unmatched or we can find an augmenting path
            # from the vertex matched to v
            if match[v] == -1 or dfs(match[v], visited):
                match[v] = u
                return True
        return False

    matching_size = 0
    for u in graph:
        visited = [False] * n_right
        if dfs(u, visited):
            matching_size += 1

    return matching_size`,
    testCases: [
      {
        input: 'graph = {0: [0, 1], 1: [0, 2], 2: [1]}',
        isHidden: false,
        description: 'Small bipartite graph - matching size 3'
      },
      {
        input: 'graph = {0: [0], 1: [0], 2: [1]}',
        isHidden: false,
        description: 'Two vertices compete for same match'
      },
      {
        input: 'graph = {0: [0, 1, 2], 1: [1, 2], 2: [2]}',
        isHidden: false,
        description: 'Multiple possible matchings'
      }
    ],
    hints: [
      'Use augmenting paths to incrementally increase the matching',
      'For each vertex in left set, try to find an augmenting path',
      'An augmenting path ends at an unmatched vertex or can reroute an existing match',
      'Use DFS to find augmenting paths',
      'Keep track of which right vertices are matched and to whom'
    ],
    language: 'python'
  }
];
