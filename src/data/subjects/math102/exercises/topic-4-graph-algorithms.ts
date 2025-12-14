import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'math102-e4',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Breadth-First Search',
    difficulty: 3,
    description: 'Implement the Breadth-First Search (BFS) algorithm to find the shortest path between two vertices in an unweighted graph. BFS explores vertices level by level using a queue. Return the path as a list of vertices from start to end, or None if no path exists.',
    starterCode: 'from collections import deque\n\ndef bfs_shortest_path(graph, start, end):\n    """Find shortest path using BFS.\n    \n    Args:\n        graph: Adjacency list representation (dict)\n        start: Starting vertex\n        end: Ending vertex\n        \n    Returns:\n        List of vertices in path from start to end, or None\n    """\n    # Your code here\n    pass',
    solution: 'from collections import deque\n\ndef bfs_shortest_path(graph, start, end):\n    """Find shortest path using BFS.\n    \n    Args:\n        graph: Adjacency list representation (dict)\n        start: Starting vertex\n        end: Ending vertex\n        \n    Returns:\n        List of vertices in path from start to end, or None\n    """\n    if start not in graph or end not in graph:\n        return None\n    \n    if start == end:\n        return [start]\n    \n    queue = deque([start])\n    visited = {start}\n    parent = {start: None}\n    \n    while queue:\n        current = queue.popleft()\n        \n        if current == end:\n            # Reconstruct path\n            path = []\n            while current is not None:\n                path.append(current)\n                current = parent[current]\n            return path[::-1]\n        \n        for neighbor in graph[current]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                parent[neighbor] = current\n                queue.append(neighbor)\n    \n    return None',
    testCases: [
      { input: '{0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2]}, 0, 3', expectedOutput: '[0, 1, 3]', isHidden: false, description: 'Find path in simple graph' },
      { input: '{0: [1], 1: [2], 2: [3], 3: []}, 0, 3', expectedOutput: '[0, 1, 2, 3]', isHidden: false, description: 'Find path in linear graph' },
      { input: '{0: [1], 1: [0], 2: [3], 3: [2]}, 0, 3', expectedOutput: 'None', isHidden: true, description: 'No path exists between disconnected components' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}, 0, 0', expectedOutput: '[0]', isHidden: true, description: 'Start and end are the same' }
    ],
    hints: [
      'Use a queue to track vertices to visit and a set to track visited vertices',
      'Keep a parent dictionary to reconstruct the path once you reach the end',
      'When you find the end vertex, backtrack through parents to build the path',
      'Remember to reverse the path before returning it'
    ],
    language: 'python'
  },
  {
    id: 'math102-t4-ex02',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Depth-First Search',
    difficulty: 2,
    description: 'Implement DFS to check if a path exists between two vertices.',
    starterCode: 'def dfs_path_exists(graph, start, end):\n    """Check if path exists using DFS\n    \n    Args:\n        graph: Adjacency list\n        start, end: Vertices\n    Returns:\n        True if path exists\n    """\n    pass\n\nprint(dfs_path_exists({0: [1], 1: [2], 2: []}, 0, 2))',
    solution: 'def dfs_path_exists(graph, start, end):\n    """Check if path exists using DFS\n    \n    Args:\n        graph: Adjacency list\n        start, end: Vertices\n    Returns:\n        True if path exists\n    """\n    visited = set()\n    \n    def dfs(v):\n        if v == end:\n            return True\n        visited.add(v)\n        for neighbor in graph.get(v, []):\n            if neighbor not in visited:\n                if dfs(neighbor):\n                    return True\n        return False\n    \n    return dfs(start)\n\nprint(dfs_path_exists({0: [1], 1: [2], 2: []}, 0, 2))',
    testCases: [
      { input: '{0: [1], 1: [2], 2: []}, 0, 2', expectedOutput: 'True', isHidden: false, description: 'Path exists' },
      { input: '{0: [1], 1: [], 2: []}, 0, 2', expectedOutput: 'False', isHidden: true, description: 'No path' }
    ],
    hints: ['Recursive DFS returns True when end found', 'Track visited to avoid cycles'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex03',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Topological Sort',
    difficulty: 3,
    description: 'Implement topological sort for a directed acyclic graph (DAG).',
    starterCode: 'def topological_sort(graph):\n    """Topological sort of DAG\n    \n    Args:\n        graph: Adjacency list of directed graph\n    Returns:\n        List of vertices in topological order\n    """\n    pass\n\nprint(topological_sort({0: [1, 2], 1: [3], 2: [3], 3: []}))',
    solution: 'def topological_sort(graph):\n    """Topological sort of DAG\n    \n    Args:\n        graph: Adjacency list of directed graph\n    Returns:\n        List of vertices in topological order\n    """\n    visited = set()\n    result = []\n    \n    def dfs(v):\n        visited.add(v)\n        for neighbor in graph.get(v, []):\n            if neighbor not in visited:\n                dfs(neighbor)\n        result.append(v)\n    \n    for v in graph:\n        if v not in visited:\n            dfs(v)\n    \n    return result[::-1]\n\nprint(topological_sort({0: [1, 2], 1: [3], 2: [3], 3: []}))',
    testCases: [
      { input: '{0: [1, 2], 1: [3], 2: [3], 3: []}', expectedOutput: '[0, 2, 1, 3]', isHidden: false, description: 'Diamond DAG' }
    ],
    hints: ['DFS postorder gives reverse topological order', 'Append after visiting all neighbors'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex04',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Dijkstra\'s Algorithm',
    difficulty: 4,
    description: 'Implement Dijkstra\'s algorithm for shortest paths in weighted graphs.',
    starterCode: 'import heapq\n\ndef dijkstra(graph, start):\n    """Find shortest paths from start to all vertices\n    \n    Args:\n        graph: {v: [(neighbor, weight), ...]}\n        start: Starting vertex\n    Returns:\n        Dictionary of shortest distances\n    """\n    pass\n\ng = {0: [(1, 4), (2, 1)], 1: [(3, 1)], 2: [(1, 2), (3, 5)], 3: []}\nprint(dijkstra(g, 0))',
    solution: 'import heapq\n\ndef dijkstra(graph, start):\n    """Find shortest paths from start to all vertices\n    \n    Args:\n        graph: {v: [(neighbor, weight), ...]}\n        start: Starting vertex\n    Returns:\n        Dictionary of shortest distances\n    """\n    dist = {v: float(\'inf\') for v in graph}\n    dist[start] = 0\n    pq = [(0, start)]\n    \n    while pq:\n        d, v = heapq.heappop(pq)\n        if d > dist[v]:\n            continue\n        for neighbor, weight in graph.get(v, []):\n            new_dist = dist[v] + weight\n            if new_dist < dist[neighbor]:\n                dist[neighbor] = new_dist\n                heapq.heappush(pq, (new_dist, neighbor))\n    \n    return dist\n\ng = {0: [(1, 4), (2, 1)], 1: [(3, 1)], 2: [(1, 2), (3, 5)], 3: []}\nprint(dijkstra(g, 0))',
    testCases: [
      { input: 'g, 0', expectedOutput: '{0: 0, 1: 3, 2: 1, 3: 4}', isHidden: false, description: 'Shortest paths' }
    ],
    hints: ['Use min-heap for efficiency', 'Skip if already found shorter path'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex05',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Kruskal\'s MST',
    difficulty: 4,
    description: 'Implement Kruskal\'s algorithm for Minimum Spanning Tree using Union-Find.',
    starterCode: 'def kruskal_mst(n, edges):\n    """Find MST using Kruskal\'s algorithm\n    \n    Args:\n        n: Number of vertices (0 to n-1)\n        edges: List of (u, v, weight)\n    Returns:\n        List of edges in MST and total weight\n    """\n    pass\n\nprint(kruskal_mst(4, [(0,1,1), (1,2,2), (2,3,3), (0,3,4), (1,3,5)]))',
    solution: 'def kruskal_mst(n, edges):\n    """Find MST using Kruskal\'s algorithm\n    \n    Args:\n        n: Number of vertices (0 to n-1)\n        edges: List of (u, v, weight)\n    Returns:\n        List of edges in MST and total weight\n    """\n    parent = list(range(n))\n    rank = [0] * n\n    \n    def find(x):\n        if parent[x] != x:\n            parent[x] = find(parent[x])\n        return parent[x]\n    \n    def union(x, y):\n        px, py = find(x), find(y)\n        if px == py:\n            return False\n        if rank[px] < rank[py]:\n            px, py = py, px\n        parent[py] = px\n        if rank[px] == rank[py]:\n            rank[px] += 1\n        return True\n    \n    edges = sorted(edges, key=lambda e: e[2])\n    mst = []\n    total = 0\n    \n    for u, v, w in edges:\n        if union(u, v):\n            mst.append((u, v, w))\n            total += w\n    \n    return mst, total\n\nprint(kruskal_mst(4, [(0,1,1), (1,2,2), (2,3,3), (0,3,4), (1,3,5)]))',
    testCases: [
      { input: '4, [(0,1,1), (1,2,2), (2,3,3), (0,3,4), (1,3,5)]', expectedOutput: '([(0, 1, 1), (1, 2, 2), (2, 3, 3)], 6)', isHidden: false, description: 'MST weight 6' }
    ],
    hints: ['Sort edges by weight', 'Use Union-Find to detect cycles'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex06',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'BFS Level Order',
    difficulty: 2,
    description: 'Return vertices level by level from a starting vertex.',
    starterCode: 'from collections import deque\n\ndef bfs_levels(graph, start):\n    """Return vertices grouped by BFS level\n    \n    Args:\n        graph: Adjacency list\n        start: Starting vertex\n    Returns:\n        List of lists, each containing vertices at that level\n    """\n    pass\n\nprint(bfs_levels({0: [1, 2], 1: [3], 2: [3], 3: []}, 0))',
    solution: 'from collections import deque\n\ndef bfs_levels(graph, start):\n    """Return vertices grouped by BFS level\n    \n    Args:\n        graph: Adjacency list\n        start: Starting vertex\n    Returns:\n        List of lists, each containing vertices at that level\n    """\n    levels = []\n    visited = {start}\n    queue = deque([start])\n    \n    while queue:\n        level_size = len(queue)\n        current_level = []\n        for _ in range(level_size):\n            v = queue.popleft()\n            current_level.append(v)\n            for neighbor in graph.get(v, []):\n                if neighbor not in visited:\n                    visited.add(neighbor)\n                    queue.append(neighbor)\n        levels.append(current_level)\n    \n    return levels\n\nprint(bfs_levels({0: [1, 2], 1: [3], 2: [3], 3: []}, 0))',
    testCases: [
      { input: '{0: [1, 2], 1: [3], 2: [3], 3: []}, 0', expectedOutput: '[[0], [1, 2], [3]]', isHidden: false, description: 'Level order' }
    ],
    hints: ['Track level size before processing', 'Process all nodes at current level'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex07',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Bellman-Ford',
    difficulty: 4,
    description: 'Implement Bellman-Ford algorithm that handles negative weights.',
    starterCode: 'def bellman_ford(n, edges, start):\n    """Shortest paths handling negative weights\n    \n    Args:\n        n: Number of vertices\n        edges: List of (u, v, weight)\n        start: Starting vertex\n    Returns:\n        Distance dict or None if negative cycle\n    """\n    pass\n\nprint(bellman_ford(3, [(0,1,4), (0,2,5), (1,2,-3)], 0))',
    solution: 'def bellman_ford(n, edges, start):\n    """Shortest paths handling negative weights\n    \n    Args:\n        n: Number of vertices\n        edges: List of (u, v, weight)\n        start: Starting vertex\n    Returns:\n        Distance dict or None if negative cycle\n    """\n    dist = {i: float(\'inf\') for i in range(n)}\n    dist[start] = 0\n    \n    for _ in range(n - 1):\n        for u, v, w in edges:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n    \n    # Check for negative cycle\n    for u, v, w in edges:\n        if dist[u] + w < dist[v]:\n            return None\n    \n    return dist\n\nprint(bellman_ford(3, [(0,1,4), (0,2,5), (1,2,-3)], 0))',
    testCases: [
      { input: '3, [(0,1,4), (0,2,5), (1,2,-3)], 0', expectedOutput: '{0: 0, 1: 4, 2: 1}', isHidden: false, description: 'Negative edge' }
    ],
    hints: ['Relax all edges n-1 times', 'Check for improvements on nth pass'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex08',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Floyd-Warshall',
    difficulty: 5,
    description: 'Implement Floyd-Warshall for all-pairs shortest paths.',
    starterCode: 'def floyd_warshall(n, edges):\n    """All-pairs shortest paths\n    \n    Args:\n        n: Number of vertices\n        edges: List of (u, v, weight)\n    Returns:\n        n×n distance matrix\n    """\n    pass\n\nprint(floyd_warshall(3, [(0,1,3), (1,2,1), (0,2,6)]))',
    solution: 'def floyd_warshall(n, edges):\n    """All-pairs shortest paths\n    \n    Args:\n        n: Number of vertices\n        edges: List of (u, v, weight)\n    Returns:\n        n×n distance matrix\n    """\n    INF = float(\'inf\')\n    dist = [[INF] * n for _ in range(n)]\n    \n    for i in range(n):\n        dist[i][i] = 0\n    \n    for u, v, w in edges:\n        dist[u][v] = w\n    \n    for k in range(n):\n        for i in range(n):\n            for j in range(n):\n                if dist[i][k] + dist[k][j] < dist[i][j]:\n                    dist[i][j] = dist[i][k] + dist[k][j]\n    \n    return dist\n\nprint(floyd_warshall(3, [(0,1,3), (1,2,1), (0,2,6)]))',
    testCases: [
      { input: '3, [(0,1,3), (1,2,1), (0,2,6)]', expectedOutput: '[[0, 3, 4], [inf, 0, 1], [inf, inf, 0]]', isHidden: false, description: 'All pairs' }
    ],
    hints: ['O(n³) complexity', 'Try all intermediate vertices k'],
    language: 'python'
  }
];
