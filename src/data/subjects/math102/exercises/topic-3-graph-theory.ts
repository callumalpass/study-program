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
      { input: '[(0,1), (1,2)], False', isHidden: false, description: 'Simple path, undirected' },
      { input: '[(0,1), (1,2)], True', isHidden: false, description: 'Simple path, directed' },
      { input: '[(0,1), (0,2), (1,2)], False', isHidden: true, description: 'Triangle, undirected' },
      { input: '[], False', isHidden: true, description: 'Empty graph' }
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
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle: all degree 2' },
      { input: '{0: [1], 1: [0]}', isHidden: false, description: 'Single edge: both degree 1' },
      { input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}', isHidden: true, description: 'Star graph' },
      { input: '{0: []}', isHidden: true, description: 'Isolated vertex: degree 0' }
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
      { input: '{0: [1, 2], 1: [0], 2: [0]}, 3', isHidden: false, description: 'Small graph to matrix' },
      { input: '{0: [1], 1: [0]}, 2', isHidden: false, description: 'Two vertices' },
      { input: '{0: [], 1: [], 2: []}, 3', isHidden: true, description: 'No edges' },
      { input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}, 4', isHidden: true, description: 'Star graph' }
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
      { input: '{0: [1], 1: [0, 2], 2: [1]}', isHidden: false, description: 'Connected path' },
      { input: '{0: [1], 1: [0], 2: []}', isHidden: false, description: 'Disconnected: isolated vertex' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: true, description: 'Connected triangle' },
      { input: '{}', isHidden: true, description: 'Empty graph' }
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
      { input: '{0: [1, 3], 1: [0, 2], 2: [1, 3], 3: [0, 2]}', isHidden: false, description: 'Cycle of 4: bipartite' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle: NOT bipartite' },
      { input: '{0: [1], 1: [0]}', isHidden: true, description: 'Single edge: bipartite' },
      { input: '{0: [1, 2, 3, 4], 1: [0], 2: [0], 3: [0], 4: [0]}', isHidden: true, description: 'Star: bipartite' }
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
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle: has cycle' },
      { input: '{0: [1, 2], 1: [0], 2: [0]}', isHidden: false, description: 'Star: no cycle' },
      { input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}', isHidden: true, description: 'Path: no cycle' },
      { input: '{0: [1], 1: [0, 2], 2: [1, 3, 0], 3: [2]}', isHidden: true, description: 'Cycle present' }
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
      { input: '{0: [1], 1: [0], 2: [3], 3: [2], 4: []}', isHidden: false, description: '3 components' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: '1 component' },
      { input: '{0: [], 1: [], 2: []}', isHidden: true, description: 'All isolated: 3 components' },
      { input: '{}', isHidden: true, description: 'Empty: 0 components' }
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
      { input: '{0: [1, 2], 1: [0], 2: [0]}', isHidden: false, description: 'Star: is tree' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle: not tree' },
      { input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}', isHidden: true, description: 'Path: is tree' },
      { input: '{0: [], 1: []}', isHidden: true, description: 'Disconnected: not tree' }
    ],
    hints: ['Tree: n vertices, n-1 edges, connected', 'Or: connected and no cycles'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex09',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Eulerian Path Existence',
    difficulty: 3,
    description: 'Check if an undirected graph has an Eulerian path (a path that visits every edge exactly once). An Eulerian path exists if the graph has exactly 0 or 2 vertices with odd degree.',
    starterCode: 'def has_eulerian_path(adj_list):\n    """Check if graph has an Eulerian path\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if Eulerian path exists\n    """\n    pass\n\nprint(has_eulerian_path({0: [1, 2], 1: [0, 2], 2: [0, 1]}))',
    solution: 'def has_eulerian_path(adj_list):\n    """Check if graph has an Eulerian path\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if Eulerian path exists\n    """\n    # Check connectivity (except isolated vertices)\n    non_isolated = {v for v in adj_list if len(adj_list[v]) > 0}\n    if non_isolated:\n        visited = set()\n        start = next(iter(non_isolated))\n        stack = [start]\n        while stack:\n            v = stack.pop()\n            if v not in visited:\n                visited.add(v)\n                stack.extend(adj_list[v])\n        if visited != non_isolated:\n            return False\n    \n    # Count vertices with odd degree\n    odd_degree_count = sum(1 for v in adj_list if len(adj_list[v]) % 2 == 1)\n    return odd_degree_count == 0 or odd_degree_count == 2\n\nprint(has_eulerian_path({0: [1, 2], 1: [0, 2], 2: [0, 1]}))',
    testCases: [
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle: all even degree' },
      { input: '{0: [1], 1: [0, 2], 2: [1]}', isHidden: false, description: 'Path: 2 odd degree vertices' },
      { input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}', isHidden: true, description: 'Star: 3 odd degree' },
      { input: '{0: [1], 1: [0], 2: []}', isHidden: true, description: 'Disconnected' }
    ],
    hints: ['Eulerian path: 0 or 2 vertices with odd degree', 'Graph must be connected'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex10',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Eulerian Circuit',
    difficulty: 4,
    description: 'Check if a graph has an Eulerian circuit (a cycle visiting every edge exactly once). All vertices must have even degree.',
    starterCode: 'def has_eulerian_circuit(adj_list):\n    """Check if graph has an Eulerian circuit\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if Eulerian circuit exists\n    """\n    pass\n\nprint(has_eulerian_circuit({0: [1, 2], 1: [0, 2], 2: [0, 1]}))',
    solution: 'def has_eulerian_circuit(adj_list):\n    """Check if graph has an Eulerian circuit\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if Eulerian circuit exists\n    """\n    # Check connectivity\n    non_isolated = {v for v in adj_list if len(adj_list[v]) > 0}\n    if non_isolated:\n        visited = set()\n        start = next(iter(non_isolated))\n        stack = [start]\n        while stack:\n            v = stack.pop()\n            if v not in visited:\n                visited.add(v)\n                stack.extend(adj_list[v])\n        if visited != non_isolated:\n            return False\n    \n    # All vertices must have even degree\n    return all(len(neighbors) % 2 == 0 for neighbors in adj_list.values())\n\nprint(has_eulerian_circuit({0: [1, 2], 1: [0, 2], 2: [0, 1]}))',
    testCases: [
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle: has circuit' },
      { input: '{0: [1], 1: [0, 2], 2: [1]}', isHidden: false, description: 'Path: no circuit (odd deg)' },
      { input: '{0: [1, 2, 3], 1: [0, 2, 3], 2: [0, 1, 3], 3: [0, 1, 2]}', isHidden: true, description: 'K4: no circuit' },
      { input: '{0: [1, 3], 1: [0, 2], 2: [1, 3], 3: [0, 2]}', isHidden: true, description: 'C4: has circuit' }
    ],
    hints: ['Eulerian circuit: all vertices have even degree', 'Must be connected'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex11',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Graph Diameter',
    difficulty: 3,
    description: 'Find the diameter of a graph (the longest shortest path between any two vertices). Use BFS from each vertex.',
    starterCode: 'from collections import deque\n\ndef graph_diameter(adj_list):\n    """Find graph diameter\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        Diameter (maximum shortest path length)\n    """\n    pass\n\nprint(graph_diameter({0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}))',
    solution: 'from collections import deque\n\ndef graph_diameter(adj_list):\n    """Find graph diameter\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        Diameter (maximum shortest path length)\n    """\n    def bfs_farthest(start):\n        visited = {start}\n        queue = deque([(start, 0)])\n        max_dist = 0\n        while queue:\n            v, dist = queue.popleft()\n            max_dist = max(max_dist, dist)\n            for neighbor in adj_list[v]:\n                if neighbor not in visited:\n                    visited.add(neighbor)\n                    queue.append((neighbor, dist + 1))\n        return max_dist\n    \n    if not adj_list:\n        return 0\n    \n    diameter = 0\n    for v in adj_list:\n        diameter = max(diameter, bfs_farthest(v))\n    return diameter\n\nprint(graph_diameter({0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}))',
    testCases: [
      { input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}', isHidden: false, description: 'Path of 4: diameter 3' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle: diameter 1' },
      { input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}', isHidden: true, description: 'Star: diameter 2' },
      { input: '{0: [1], 1: [0]}', isHidden: true, description: 'Single edge: diameter 1' }
    ],
    hints: ['BFS from each vertex to find maximum distance', 'Diameter is max of all shortest paths'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex12',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Graph Center',
    difficulty: 4,
    description: 'Find the center(s) of a graph - vertices with minimum eccentricity. Eccentricity is the maximum distance from a vertex to any other vertex.',
    starterCode: 'from collections import deque\n\ndef graph_center(adj_list):\n    """Find center vertices of graph\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        List of center vertices\n    """\n    pass\n\nprint(graph_center({0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}))',
    solution: 'from collections import deque\n\ndef graph_center(adj_list):\n    """Find center vertices of graph\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        List of center vertices\n    """\n    def eccentricity(start):\n        visited = {start}\n        queue = deque([(start, 0)])\n        max_dist = 0\n        while queue:\n            v, dist = queue.popleft()\n            max_dist = max(max_dist, dist)\n            for neighbor in adj_list[v]:\n                if neighbor not in visited:\n                    visited.add(neighbor)\n                    queue.append((neighbor, dist + 1))\n        return max_dist\n    \n    if not adj_list:\n        return []\n    \n    ecc = {v: eccentricity(v) for v in adj_list}\n    min_ecc = min(ecc.values())\n    return [v for v, e in ecc.items() if e == min_ecc]\n\nprint(graph_center({0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}))',
    testCases: [
      { input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}', isHidden: false, description: 'Path: center is [1, 2]' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle: all are center' },
      { input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}', isHidden: true, description: 'Star: center is [0]' },
      { input: '{0: [1], 1: [0, 2], 2: [1]}', isHidden: true, description: 'Path of 3: center is [1]' }
    ],
    hints: ['Eccentricity = max distance to any vertex', 'Center has minimum eccentricity'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex13',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Planarity Check (Kuratowski)',
    difficulty: 5,
    description: 'Check if a graph is planar (can be drawn without edge crossings). For small graphs, check if it avoids K5 and K3,3 subdivisions.',
    starterCode: 'def is_planar(adj_list):\n    """Simple planarity check\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if likely planar (using simple heuristics)\n    """\n    pass\n\nprint(is_planar({0: [1, 2, 3], 1: [0, 2, 3], 2: [0, 1, 3], 3: [0, 1, 2]}))',
    solution: 'def is_planar(adj_list):\n    """Simple planarity check\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        True if likely planar (using simple heuristics)\n    """\n    n = len(adj_list)\n    if n <= 4:\n        return True\n    \n    # Count edges\n    edges = sum(len(neighbors) for neighbors in adj_list.values()) // 2\n    \n    # Planar graph: e <= 3n - 6\n    if edges > 3 * n - 6:\n        return False\n    \n    # If no triangles, e <= 2n - 4\n    # Simple heuristic: not a full implementation of Kuratowski\n    return True\n\nprint(is_planar({0: [1, 2, 3], 1: [0, 2, 3], 2: [0, 1, 3], 3: [0, 1, 2]}))',
    testCases: [
      { input: '{0: [1, 2, 3], 1: [0, 2, 3], 2: [0, 1, 3], 3: [0, 1, 2]}', isHidden: false, description: 'K4: planar' },
      { input: '{0: [1], 1: [0, 2], 2: [1]}', isHidden: false, description: 'Path: planar' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: true, description: 'Triangle: planar' },
      { input: '{}', isHidden: true, description: 'Empty: trivially planar' }
    ],
    hints: ['Planar graph: edges ≤ 3n - 6', 'K5 and K3,3 are non-planar'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex14',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Graph Complement',
    difficulty: 2,
    description: 'Generate the complement of a graph. The complement has the same vertices but only edges that were NOT in the original graph.',
    starterCode: 'def graph_complement(adj_list):\n    """Generate complement graph\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        Adjacency list of complement\n    """\n    pass\n\nprint(graph_complement({0: [1], 1: [0], 2: []}))',
    solution: 'def graph_complement(adj_list):\n    """Generate complement graph\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        Adjacency list of complement\n    """\n    vertices = set(adj_list.keys())\n    complement = {v: [] for v in vertices}\n    \n    for v in vertices:\n        neighbors = set(adj_list[v])\n        for u in vertices:\n            if u != v and u not in neighbors:\n                complement[v].append(u)\n    \n    return complement\n\nprint(graph_complement({0: [1], 1: [0], 2: []}))',
    testCases: [
      { input: '{0: [1], 1: [0], 2: []}', isHidden: false, description: 'Add edges to 2' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'K3 complement is empty' },
      { input: '{0: [], 1: [], 2: []}', isHidden: true, description: 'Empty complement is K3' },
      { input: '{0: [1], 1: [0]}', isHidden: true, description: 'K2 complement' }
    ],
    hints: ['For each vertex, connect to non-neighbors', 'Exclude self-loops'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex15',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Regular Graph Check',
    difficulty: 2,
    description: 'Check if a graph is k-regular (all vertices have the same degree k).',
    starterCode: 'def is_regular(adj_list):\n    """Check if graph is regular\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        (is_regular, k) where k is the degree\n    """\n    pass\n\nprint(is_regular({0: [1, 2], 1: [0, 2], 2: [0, 1]}))',
    solution: 'def is_regular(adj_list):\n    """Check if graph is regular\n    \n    Args:\n        adj_list: Adjacency list\n    Returns:\n        (is_regular, k) where k is the degree\n    """\n    if not adj_list:\n        return True, 0\n    \n    degrees = [len(neighbors) for neighbors in adj_list.values()]\n    k = degrees[0]\n    is_reg = all(d == k for d in degrees)\n    return is_reg, k if is_reg else -1\n\nprint(is_regular({0: [1, 2], 1: [0, 2], 2: [0, 1]}))',
    testCases: [
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'K3: 2-regular' },
      { input: '{0: [1], 1: [0, 2], 2: [1]}', isHidden: false, description: 'Path: not regular' },
      { input: '{0: [1, 3], 1: [0, 2], 2: [1, 3], 3: [0, 2]}', isHidden: true, description: 'C4: 2-regular' },
      { input: '{0: []}', isHidden: true, description: 'Single vertex: 0-regular' }
    ],
    hints: ['All vertices must have same degree', 'Check if all degrees equal'],
    language: 'python'
  },
  {
    id: 'math102-t3-ex16',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Graph Isomorphism Check',
    difficulty: 5,
    description: 'Check if two graphs are isomorphic (same structure). Compare degree sequences as a necessary but not sufficient condition.',
    starterCode: 'def could_be_isomorphic(g1, g2):\n    """Check if graphs could be isomorphic\n    \n    Args:\n        g1, g2: Adjacency lists\n    Returns:\n        True if degree sequences match\n    """\n    pass\n\nprint(could_be_isomorphic({0: [1], 1: [0]}, {2: [3], 3: [2]}))',
    solution: 'def could_be_isomorphic(g1, g2):\n    """Check if graphs could be isomorphic\n    \n    Args:\n        g1, g2: Adjacency lists\n    Returns:\n        True if degree sequences match\n    """\n    if len(g1) != len(g2):\n        return False\n    \n    deg1 = sorted([len(neighbors) for neighbors in g1.values()])\n    deg2 = sorted([len(neighbors) for neighbors in g2.values()])\n    \n    return deg1 == deg2\n\nprint(could_be_isomorphic({0: [1], 1: [0]}, {2: [3], 3: [2]}))',
    testCases: [
      { input: '{0: [1], 1: [0]}, {2: [3], 3: [2]}', isHidden: false, description: 'Both K2: isomorphic' },
      { input: '{0: [1, 2], 1: [0], 2: [0]}, {0: [1], 1: [0, 2], 2: [1]}', isHidden: false, description: 'Same degrees' },
      { input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}, {0: [1], 1: [0, 2], 2: [1]}', isHidden: true, description: 'Different degrees' },
      { input: '{0: [], 1: []}, {0: []}', isHidden: true, description: 'Different sizes' }
    ],
    hints: ['Compare sorted degree sequences', 'Same sequence is necessary, not sufficient'],
    language: 'python'
  }
];
