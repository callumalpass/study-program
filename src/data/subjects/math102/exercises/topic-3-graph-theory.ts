import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'math102-e3',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Graph Representation',
    difficulty: 2,
    description: 'Implement a function to convert an edge list representation of a graph to an adjacency list representation. An edge list is a list of tuples (u, v) representing edges. An adjacency list is a dictionary where each vertex maps to a list of its neighbors. Handle both directed and undirected graphs.',
    starterCode: 'def edge_list_to_adjacency_list(edges, directed=False):\n    """Convert edge list to adjacency list representation.\n    \n    Args:\n        edges: List of tuples (u, v) representing edges\n        directed: Boolean indicating if graph is directed\n        \n    Returns:\n        Dictionary mapping each vertex to list of neighbors\n    """\n    # Your code here\n    pass',
    solution: 'def edge_list_to_adjacency_list(edges, directed=False):\n    """Convert edge list to adjacency list representation.\n    \n    Args:\n        edges: List of tuples (u, v) representing edges\n        directed: Boolean indicating if graph is directed\n        \n    Returns:\n        Dictionary mapping each vertex to list of neighbors\n    """\n    adj_list = {}\n    \n    # Initialize all vertices\n    for u, v in edges:\n        if u not in adj_list:\n            adj_list[u] = []\n        if v not in adj_list:\n            adj_list[v] = []\n    \n    # Add edges\n    for u, v in edges:\n        adj_list[u].append(v)\n        if not directed:\n            adj_list[v].append(u)\n    \n    return adj_list',
    testCases: [
      { input: '[(0, 1), (1, 2), (2, 0)], False', expectedOutput: '{0: [1, 2], 1: [0, 2], 2: [1, 0]}', isHidden: false, description: 'Undirected triangle graph' },
      { input: '[(0, 1), (1, 2), (2, 0)], True', expectedOutput: '{0: [1], 1: [2], 2: [0]}', isHidden: false, description: 'Directed cycle graph' },
      { input: '[(\'A\', \'B\'), (\'B\', \'C\'), (\'A\', \'C\')], False', expectedOutput: '{\'A\': [\'B\', \'C\'], \'B\': [\'A\', \'C\'], \'C\': [\'B\', \'A\']}', isHidden: true, description: 'Graph with string vertices' },
      { input: '[], False', expectedOutput: '{}', isHidden: true, description: 'Empty graph' }
    ],
    hints: [
      'First, create entries for all vertices that appear in the edge list',
      'For undirected graphs, each edge (u,v) should add v to u\'s list and u to v\'s list',
      'For directed graphs, only add v to u\'s adjacency list',
      'Handle the case of an empty edge list'
    ],
    language: 'python'
  },
  {
    id: 'math102-t3-ex02',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Degree Calculation',
    difficulty: 1,
    description: 'Calculate the degree of each vertex in an undirected graph and verify the handshaking lemma.',
    starterCode: 'def vertex_degrees(adj_list):\n    """Calculate degree of each vertex\n    \n    Args:\n        adj_list: Adjacency list representation\n    Returns:\n        Dictionary mapping vertex to degree\n    """\n    pass\n\ngraph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}\nprint(vertex_degrees(graph))',
    solution: 'def vertex_degrees(adj_list):\n    """Calculate degree of each vertex\n    \n    Args:\n        adj_list: Adjacency list representation\n    Returns:\n        Dictionary mapping vertex to degree\n    """\n    return {v: len(neighbors) for v, neighbors in adj_list.items()}\n\ngraph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}\nprint(vertex_degrees(graph))',
    testCases: [
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', expectedOutput: '{0: 2, 1: 2, 2: 2}', isHidden: false, description: 'Triangle graph' }
    ],
    hints: ['Degree = number of neighbors', 'Sum of degrees = 2 × number of edges'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex03',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Adjacency Matrix',
    difficulty: 2,
    description: 'Convert adjacency list to adjacency matrix representation.',
    starterCode: 'def to_adj_matrix(adj_list, n):\n    """Convert adjacency list to n×n matrix\n    \n    Args:\n        adj_list: Adjacency list with vertices 0 to n-1\n        n: Number of vertices\n    Returns:\n        2D list representing adjacency matrix\n    """\n    pass\n\ngraph = {0: [1, 2], 1: [0], 2: [0]}\nprint(to_adj_matrix(graph, 3))',
    solution: 'def to_adj_matrix(adj_list, n):\n    """Convert adjacency list to n×n matrix\n    \n    Args:\n        adj_list: Adjacency list with vertices 0 to n-1\n        n: Number of vertices\n    Returns:\n        2D list representing adjacency matrix\n    """\n    matrix = [[0] * n for _ in range(n)]\n    for v, neighbors in adj_list.items():\n        for u in neighbors:\n            matrix[v][u] = 1\n    return matrix\n\ngraph = {0: [1, 2], 1: [0], 2: [0]}\nprint(to_adj_matrix(graph, 3))',
    testCases: [
      { input: '{0: [1, 2], 1: [0], 2: [0]}, 3', expectedOutput: '[[0, 1, 1], [1, 0, 0], [1, 0, 0]]', isHidden: false, description: 'Star graph' }
    ],
    hints: ['Initialize n×n matrix of zeros', 'Set matrix[u][v] = 1 for each edge'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex04',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Is Connected',
    difficulty: 2,
    description: 'Check if an undirected graph is connected (all vertices reachable from any vertex).',
    starterCode: 'def is_connected(adj_list):\n    """Check if graph is connected\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if connected, False otherwise\n    """\n    pass\n\nprint(is_connected({0: [1], 1: [0, 2], 2: [1]}))',
    solution: 'def is_connected(adj_list):\n    """Check if graph is connected\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if connected, False otherwise\n    """\n    if not adj_list:\n        return True\n    \n    start = next(iter(adj_list))\n    visited = set()\n    stack = [start]\n    \n    while stack:\n        v = stack.pop()\n        if v not in visited:\n            visited.add(v)\n            for neighbor in adj_list[v]:\n                if neighbor not in visited:\n                    stack.append(neighbor)\n    \n    return len(visited) == len(adj_list)\n\nprint(is_connected({0: [1], 1: [0, 2], 2: [1]}))',
    testCases: [
      { input: '{0: [1], 1: [0, 2], 2: [1]}', expectedOutput: 'True', isHidden: false, description: 'Connected path' },
      { input: '{0: [1], 1: [0], 2: [3], 3: [2]}', expectedOutput: 'False', isHidden: true, description: 'Two components' }
    ],
    hints: ['DFS from any vertex', 'Connected if all vertices visited'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex05',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Is Bipartite',
    difficulty: 3,
    description: 'Check if a graph is bipartite (vertices can be colored with 2 colors such that no adjacent vertices share a color).',
    starterCode: 'def is_bipartite(adj_list):\n    """Check if graph is bipartite\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if bipartite, False otherwise\n    """\n    pass\n\nprint(is_bipartite({0: [1, 3], 1: [0, 2], 2: [1, 3], 3: [0, 2]}))',
    solution: 'def is_bipartite(adj_list):\n    """Check if graph is bipartite\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if bipartite, False otherwise\n    """\n    color = {}\n    \n    for start in adj_list:\n        if start in color:\n            continue\n        \n        stack = [(start, 0)]\n        while stack:\n            v, c = stack.pop()\n            if v in color:\n                if color[v] != c:\n                    return False\n                continue\n            \n            color[v] = c\n            for neighbor in adj_list[v]:\n                stack.append((neighbor, 1 - c))\n    \n    return True\n\nprint(is_bipartite({0: [1, 3], 1: [0, 2], 2: [1, 3], 3: [0, 2]}))',
    testCases: [
      { input: '{0: [1, 3], 1: [0, 2], 2: [1, 3], 3: [0, 2]}', expectedOutput: 'True', isHidden: false, description: '4-cycle is bipartite' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', expectedOutput: 'False', isHidden: true, description: 'Triangle not bipartite' }
    ],
    hints: ['BFS/DFS with 2-coloring', 'If adjacent vertices have same color, not bipartite'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex06',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Has Cycle',
    difficulty: 3,
    description: 'Detect if an undirected graph contains a cycle.',
    starterCode: 'def has_cycle(adj_list):\n    """Detect cycle in undirected graph\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if cycle exists, False otherwise\n    """\n    pass\n\nprint(has_cycle({0: [1, 2], 1: [0, 2], 2: [0, 1]}))',
    solution: 'def has_cycle(adj_list):\n    """Detect cycle in undirected graph\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if cycle exists, False otherwise\n    """\n    visited = set()\n    \n    def dfs(v, parent):\n        visited.add(v)\n        for neighbor in adj_list[v]:\n            if neighbor not in visited:\n                if dfs(neighbor, v):\n                    return True\n            elif neighbor != parent:\n                return True\n        return False\n    \n    for v in adj_list:\n        if v not in visited:\n            if dfs(v, -1):\n                return True\n    return False\n\nprint(has_cycle({0: [1, 2], 1: [0, 2], 2: [0, 1]}))',
    testCases: [
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', expectedOutput: 'True', isHidden: false, description: 'Triangle has cycle' },
      { input: '{0: [1], 1: [0, 2], 2: [1]}', expectedOutput: 'False', isHidden: true, description: 'Path has no cycle' }
    ],
    hints: ['DFS keeping track of parent', 'Back edge (not to parent) means cycle'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex07',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Count Connected Components',
    difficulty: 2,
    description: 'Count the number of connected components in an undirected graph.',
    starterCode: 'def count_components(adj_list):\n    """Count connected components\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        Number of connected components\n    """\n    pass\n\nprint(count_components({0: [1], 1: [0], 2: [3], 3: [2], 4: []}))',
    solution: 'def count_components(adj_list):\n    """Count connected components\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        Number of connected components\n    """\n    visited = set()\n    count = 0\n    \n    def dfs(v):\n        visited.add(v)\n        for neighbor in adj_list[v]:\n            if neighbor not in visited:\n                dfs(neighbor)\n    \n    for v in adj_list:\n        if v not in visited:\n            dfs(v)\n            count += 1\n    \n    return count\n\nprint(count_components({0: [1], 1: [0], 2: [3], 3: [2], 4: []}))',
    testCases: [
      { input: '{0: [1], 1: [0], 2: [3], 3: [2], 4: []}', expectedOutput: '3', isHidden: false, description: '3 components' }
    ],
    hints: ['DFS from each unvisited vertex', 'Each DFS explores one component'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex08',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Is Tree',
    difficulty: 3,
    description: 'Check if an undirected graph is a tree (connected and acyclic).',
    starterCode: 'def is_tree(adj_list):\n    """Check if graph is a tree\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if tree, False otherwise\n    """\n    pass\n\nprint(is_tree({0: [1, 2], 1: [0], 2: [0]}))',
    solution: 'def is_tree(adj_list):\n    """Check if graph is a tree\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if tree, False otherwise\n    """\n    if not adj_list:\n        return True\n    \n    n = len(adj_list)\n    edges = sum(len(neighbors) for neighbors in adj_list.values()) // 2\n    \n    # Tree must have exactly n-1 edges\n    if edges != n - 1:\n        return False\n    \n    # Must be connected\n    visited = set()\n    start = next(iter(adj_list))\n    stack = [start]\n    \n    while stack:\n        v = stack.pop()\n        if v not in visited:\n            visited.add(v)\n            stack.extend(adj_list[v])\n    \n    return len(visited) == n\n\nprint(is_tree({0: [1, 2], 1: [0], 2: [0]}))',
    testCases: [
      { input: '{0: [1, 2], 1: [0], 2: [0]}', expectedOutput: 'True', isHidden: false, description: 'Star is a tree' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', expectedOutput: 'False', isHidden: true, description: 'Triangle not a tree' }
    ],
    hints: ['Tree: n vertices, n-1 edges, connected', 'Or: connected and no cycles'],
    language: 'python'
  }
];
