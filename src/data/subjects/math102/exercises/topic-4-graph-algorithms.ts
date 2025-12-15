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
      { input: '{0: [1, 2], 1: [0, 3], 2: [0], 3: [1]}, 0, 3', isHidden: false, description: 'Path 0→1→3' },
      { input: '{0: [1], 1: [0, 2], 2: [1]}, 0, 2', isHidden: false, description: 'Path 0→1→2' },
      { input: '{0: [1], 1: [0], 2: []}, 0, 2', isHidden: true, description: 'No path exists' },
      { input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}, 0, 0', isHidden: true, description: 'Same start and end' }
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
      { input: '{0: [1], 1: [2], 2: []}, 0, 2', isHidden: false, description: 'Path exists' },
      { input: '{0: [1], 1: [0], 2: []}, 0, 2', isHidden: false, description: 'No path to isolated vertex' },
      { input: '{0: [1, 2], 1: [3], 2: [3], 3: []}, 0, 3', isHidden: true, description: 'Multiple paths exist' },
      { input: '{0: []}, 0, 0', isHidden: true, description: 'Same vertex' }
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
      { input: '{0: [1, 2], 1: [3], 2: [3], 3: []}', isHidden: false, description: 'Diamond DAG' },
      { input: '{0: [1], 1: [2], 2: []}', isHidden: false, description: 'Linear chain' },
      { input: '{0: [], 1: [], 2: []}', isHidden: true, description: 'No edges' },
      { input: '{0: [1, 2, 3], 1: [], 2: [], 3: []}', isHidden: true, description: 'Fan out from 0' }
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
      { input: '{0: [(1, 4), (2, 1)], 1: [(3, 1)], 2: [(1, 2), (3, 5)], 3: []}, 0', isHidden: false, description: 'Find shortest paths' },
      { input: '{0: [(1, 1)], 1: [(2, 2)], 2: []}, 0', isHidden: false, description: 'Linear chain' },
      { input: '{0: [(1, 10), (2, 5)], 1: [(3, 1)], 2: [(1, 3)], 3: []}, 0', isHidden: true, description: 'Shorter indirect path' },
      { input: '{0: []}, 0', isHidden: true, description: 'Single vertex' }
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
      { input: '4, [(0,1,1), (1,2,2), (2,3,3), (0,3,4), (1,3,5)]', isHidden: false, description: 'MST weight 6' },
      { input: '3, [(0,1,1), (1,2,2), (0,2,3)]', isHidden: false, description: 'Triangle MST' },
      { input: '4, [(0,1,1), (2,3,1)]', isHidden: true, description: 'Disconnected graph' },
      { input: '2, [(0,1,5)]', isHidden: true, description: 'Single edge' }
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
      { input: '{0: [1, 2], 1: [3], 2: [3], 3: []}, 0', isHidden: false, description: '3 levels' },
      { input: '{0: [1, 2, 3], 1: [], 2: [], 3: []}, 0', isHidden: false, description: '2 levels (star)' },
      { input: '{0: [1], 1: [2], 2: [3], 3: []}, 0', isHidden: true, description: '4 levels (chain)' },
      { input: '{0: []}, 0', isHidden: true, description: 'Single vertex' }
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
      { input: '3, [(0,1,4), (0,2,5), (1,2,-3)], 0', isHidden: false, description: 'Negative edge' },
      { input: '3, [(0,1,1), (1,2,2)], 0', isHidden: false, description: 'Simple path' },
      { input: '3, [(0,1,1), (1,2,-5), (2,0,2)], 0', isHidden: true, description: 'Negative cycle' },
      { input: '2, [(0,1,3)], 0', isHidden: true, description: 'Two vertices' }
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
      { input: '3, [(0,1,3), (1,2,1), (0,2,6)]', isHidden: false, description: '3 vertices' },
      { input: '4, [(0,1,1), (1,2,2), (2,3,3)]', isHidden: false, description: 'Chain' },
      { input: '3, [(0,1,1), (1,0,1), (1,2,2)]', isHidden: true, description: 'Bidirectional edge' },
      { input: '2, [(0,1,5)]', isHidden: true, description: 'Two vertices' }
    ],
    hints: ['O(n³) complexity', 'Try all intermediate vertices k'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex09',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Prim\'s MST Algorithm',
    difficulty: 4,
    description: 'Implement Prim\'s algorithm for finding the Minimum Spanning Tree. Start from any vertex and greedily add the minimum weight edge that connects a new vertex.',
    starterCode: 'import heapq\n\ndef prim_mst(n, edges):\n    """Find MST using Prim\'s algorithm\n    \n    Args:\n        n: Number of vertices (0 to n-1)\n        edges: List of (u, v, weight)\n    Returns:\n        (mst_edges, total_weight)\n    """\n    pass\n\nprint(prim_mst(4, [(0,1,1), (1,2,2), (2,3,3), (0,3,4), (1,3,5)]))',
    solution: 'import heapq\n\ndef prim_mst(n, edges):\n    """Find MST using Prim\'s algorithm\n    \n    Args:\n        n: Number of vertices (0 to n-1)\n        edges: List of (u, v, weight)\n    Returns:\n        (mst_edges, total_weight)\n    """\n    # Build adjacency list\n    graph = {i: [] for i in range(n)}\n    for u, v, w in edges:\n        graph[u].append((v, w))\n        graph[v].append((u, w))\n    \n    visited = set([0])\n    mst = []\n    total = 0\n    pq = [(w, 0, v) for v, w in graph[0]]\n    heapq.heapify(pq)\n    \n    while pq and len(visited) < n:\n        w, u, v = heapq.heappop(pq)\n        if v in visited:\n            continue\n        \n        visited.add(v)\n        mst.append((u, v, w))\n        total += w\n        \n        for neighbor, weight in graph[v]:\n            if neighbor not in visited:\n                heapq.heappush(pq, (weight, v, neighbor))\n    \n    return mst, total\n\nprint(prim_mst(4, [(0,1,1), (1,2,2), (2,3,3), (0,3,4), (1,3,5)]))',
    testCases: [
      { input: '4, [(0,1,1), (1,2,2), (2,3,3), (0,3,4), (1,3,5)]', isHidden: false, description: 'MST weight 6' },
      { input: '3, [(0,1,2), (1,2,3), (0,2,5)]', isHidden: false, description: 'Triangle' },
      { input: '4, [(0,1,1), (0,2,1), (0,3,1)]', isHidden: true, description: 'Star graph' },
      { input: '2, [(0,1,10)]', isHidden: true, description: 'Two vertices' }
    ],
    hints: ['Start from any vertex', 'Use min-heap for edge selection', 'Skip edges to visited vertices'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex10',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Strongly Connected Components',
    difficulty: 5,
    description: 'Find all strongly connected components in a directed graph using Kosaraju\'s algorithm (two DFS passes).',
    starterCode: 'def strongly_connected_components(graph):\n    """Find SCCs using Kosaraju\'s algorithm\n    \n    Args:\n        graph: Adjacency list of directed graph\n    Returns:\n        List of SCCs (each SCC is a list of vertices)\n    """\n    pass\n\nprint(strongly_connected_components({0: [1], 1: [2], 2: [0], 3: [1, 2]}))',
    solution: 'def strongly_connected_components(graph):\n    """Find SCCs using Kosaraju\'s algorithm\n    \n    Args:\n        graph: Adjacency list of directed graph\n    Returns:\n        List of SCCs (each SCC is a list of vertices)\n    """\n    # First DFS to get finishing order\n    visited = set()\n    stack = []\n    \n    def dfs1(v):\n        visited.add(v)\n        for neighbor in graph.get(v, []):\n            if neighbor not in visited:\n                dfs1(neighbor)\n        stack.append(v)\n    \n    for v in graph:\n        if v not in visited:\n            dfs1(v)\n    \n    # Build reverse graph\n    reverse_graph = {v: [] for v in graph}\n    for v in graph:\n        for u in graph[v]:\n            if u not in reverse_graph:\n                reverse_graph[u] = []\n            reverse_graph[u].append(v)\n    \n    # Second DFS on reverse graph in reverse finishing order\n    visited = set()\n    sccs = []\n    \n    def dfs2(v, component):\n        visited.add(v)\n        component.append(v)\n        for neighbor in reverse_graph.get(v, []):\n            if neighbor not in visited:\n                dfs2(neighbor, component)\n    \n    while stack:\n        v = stack.pop()\n        if v not in visited:\n            component = []\n            dfs2(v, component)\n            sccs.append(component)\n    \n    return sccs\n\nprint(strongly_connected_components({0: [1], 1: [2], 2: [0], 3: [1, 2]}))',
    testCases: [
      { input: '{0: [1], 1: [2], 2: [0], 3: [1, 2]}', isHidden: false, description: 'Cycle + external vertex' },
      { input: '{0: [1], 1: [2], 2: []}', isHidden: false, description: 'Chain: 3 SCCs' },
      { input: '{0: [1], 1: [0]}', isHidden: true, description: 'Single SCC of 2' },
      { input: '{0: []}', isHidden: true, description: 'Single vertex' }
    ],
    hints: ['DFS to get finishing times', 'Reverse graph', 'DFS in reverse finishing order'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex11',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Tarjan\'s SCC Algorithm',
    difficulty: 5,
    description: 'Implement Tarjan\'s algorithm for finding strongly connected components using a single DFS with low-link values.',
    starterCode: 'def tarjan_scc(graph):\n    """Find SCCs using Tarjan\'s algorithm\n    \n    Args:\n        graph: Adjacency list\n    Returns:\n        List of SCCs\n    """\n    pass\n\nprint(tarjan_scc({0: [1], 1: [2], 2: [0], 3: [1]}))',
    solution: 'def tarjan_scc(graph):\n    """Find SCCs using Tarjan\'s algorithm\n    \n    Args:\n        graph: Adjacency list\n    Returns:\n        List of SCCs\n    """\n    index_counter = [0]\n    stack = []\n    lowlink = {}\n    index = {}\n    on_stack = set()\n    sccs = []\n    \n    def dfs(v):\n        index[v] = index_counter[0]\n        lowlink[v] = index_counter[0]\n        index_counter[0] += 1\n        stack.append(v)\n        on_stack.add(v)\n        \n        for w in graph.get(v, []):\n            if w not in index:\n                dfs(w)\n                lowlink[v] = min(lowlink[v], lowlink[w])\n            elif w in on_stack:\n                lowlink[v] = min(lowlink[v], index[w])\n        \n        if lowlink[v] == index[v]:\n            scc = []\n            while True:\n                w = stack.pop()\n                on_stack.remove(w)\n                scc.append(w)\n                if w == v:\n                    break\n            sccs.append(scc)\n    \n    for v in graph:\n        if v not in index:\n            dfs(v)\n    \n    return sccs\n\nprint(tarjan_scc({0: [1], 1: [2], 2: [0], 3: [1]}))',
    testCases: [
      { input: '{0: [1], 1: [2], 2: [0], 3: [1]}', isHidden: false, description: 'Cycle with tail' },
      { input: '{0: [1], 1: [0, 2], 2: []}', isHidden: false, description: 'Cycle + chain' },
      { input: '{0: [1, 2], 1: [2], 2: [0]}', isHidden: true, description: 'All one SCC' },
      { input: '{0: [], 1: [], 2: []}', isHidden: true, description: 'No edges' }
    ],
    hints: ['Track index and lowlink values', 'Use stack for current path', 'SCC found when lowlink[v] == index[v]'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex12',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Articulation Points (Cut Vertices)',
    difficulty: 4,
    description: 'Find all articulation points in an undirected graph. An articulation point is a vertex whose removal increases the number of connected components.',
    starterCode: 'def find_articulation_points(graph):\n    """Find articulation points\n    \n    Args:\n        graph: Adjacency list\n    Returns:\n        List of articulation points\n    """\n    pass\n\nprint(find_articulation_points({0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}))',
    solution: 'def find_articulation_points(graph):\n    """Find articulation points\n    \n    Args:\n        graph: Adjacency list\n    Returns:\n        List of articulation points\n    """\n    visited = set()\n    disc = {}\n    low = {}\n    parent = {}\n    ap = set()\n    time = [0]\n    \n    def dfs(u):\n        children = 0\n        visited.add(u)\n        disc[u] = low[u] = time[0]\n        time[0] += 1\n        \n        for v in graph.get(u, []):\n            if v not in visited:\n                children += 1\n                parent[v] = u\n                dfs(v)\n                low[u] = min(low[u], low[v])\n                \n                # u is articulation point if:\n                # 1. u is root and has 2+ children\n                # 2. u is not root and low[v] >= disc[u]\n                if parent.get(u) is None and children > 1:\n                    ap.add(u)\n                if parent.get(u) is not None and low[v] >= disc[u]:\n                    ap.add(u)\n            elif v != parent.get(u):\n                low[u] = min(low[u], disc[v])\n    \n    for v in graph:\n        if v not in visited:\n            parent[v] = None\n            dfs(v)\n    \n    return list(ap)\n\nprint(find_articulation_points({0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}))',
    testCases: [
      { input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}', isHidden: false, description: 'Chain: 1 and 2 are APs' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle: no APs' },
      { input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}', isHidden: true, description: 'Star: 0 is AP' },
      { input: '{0: [1], 1: [0]}', isHidden: true, description: 'Two vertices: no APs' }
    ],
    hints: ['Track discovery time and low values', 'Root is AP if it has 2+ children', 'Non-root is AP if low[child] >= disc[u]'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex13',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Bridge Detection',
    difficulty: 4,
    description: 'Find all bridges in an undirected graph. A bridge is an edge whose removal increases the number of connected components.',
    starterCode: 'def find_bridges(graph):\n    """Find all bridges\n    \n    Args:\n        graph: Adjacency list\n    Returns:\n        List of bridge edges (u, v)\n    """\n    pass\n\nprint(find_bridges({0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}))',
    solution: 'def find_bridges(graph):\n    """Find all bridges\n    \n    Args:\n        graph: Adjacency list\n    Returns:\n        List of bridge edges (u, v)\n    """\n    visited = set()\n    disc = {}\n    low = {}\n    parent = {}\n    bridges = []\n    time = [0]\n    \n    def dfs(u):\n        visited.add(u)\n        disc[u] = low[u] = time[0]\n        time[0] += 1\n        \n        for v in graph.get(u, []):\n            if v not in visited:\n                parent[v] = u\n                dfs(v)\n                low[u] = min(low[u], low[v])\n                \n                # Edge u-v is a bridge if low[v] > disc[u]\n                if low[v] > disc[u]:\n                    bridges.append((u, v))\n            elif v != parent.get(u):\n                low[u] = min(low[u], disc[v])\n    \n    for v in graph:\n        if v not in visited:\n            parent[v] = None\n            dfs(v)\n    \n    return bridges\n\nprint(find_bridges({0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}))',
    testCases: [
      { input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}', isHidden: false, description: 'All edges are bridges' },
      { input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}', isHidden: false, description: 'Triangle: no bridges' },
      { input: '{0: [1, 2], 1: [0, 2, 3], 2: [0, 1], 3: [1]}', isHidden: true, description: 'One bridge' },
      { input: '{0: [1], 1: [0]}', isHidden: true, description: 'Single edge: one bridge' }
    ],
    hints: ['Similar to articulation points', 'Bridge if low[v] > disc[u]'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex14',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'A* Search Algorithm',
    difficulty: 5,
    description: 'Implement A* pathfinding with a heuristic function. Use f(n) = g(n) + h(n) where g is actual cost and h is heuristic.',
    starterCode: 'import heapq\n\ndef astar(graph, start, goal, heuristic):\n    """A* pathfinding algorithm\n    \n    Args:\n        graph: {v: [(neighbor, cost), ...]}\n        start: Start vertex\n        goal: Goal vertex\n        heuristic: Function h(v) estimating cost to goal\n    Returns:\n        (path, cost) or (None, inf) if no path\n    """\n    pass\n\ng = {0: [(1, 1), (2, 4)], 1: [(3, 2)], 2: [(3, 1)], 3: []}\nh = {0: 3, 1: 2, 2: 1, 3: 0}\nprint(astar(g, 0, 3, lambda v: h[v]))',
    solution: 'import heapq\n\ndef astar(graph, start, goal, heuristic):\n    """A* pathfinding algorithm\n    \n    Args:\n        graph: {v: [(neighbor, cost), ...]}\n        start: Start vertex\n        goal: Goal vertex\n        heuristic: Function h(v) estimating cost to goal\n    Returns:\n        (path, cost) or (None, inf) if no path\n    """\n    pq = [(heuristic(start), 0, start, [start])]\n    visited = set()\n    \n    while pq:\n        f, g, current, path = heapq.heappop(pq)\n        \n        if current == goal:\n            return path, g\n        \n        if current in visited:\n            continue\n        visited.add(current)\n        \n        for neighbor, cost in graph.get(current, []):\n            if neighbor not in visited:\n                new_g = g + cost\n                new_f = new_g + heuristic(neighbor)\n                new_path = path + [neighbor]\n                heapq.heappush(pq, (new_f, new_g, neighbor, new_path))\n    \n    return None, float(\'inf\')\n\ng = {0: [(1, 1), (2, 4)], 1: [(3, 2)], 2: [(3, 1)], 3: []}\nh = {0: 3, 1: 2, 2: 1, 3: 0}\nprint(astar(g, 0, 3, lambda v: h[v]))',
    testCases: [
      { input: '{0: [(1, 1), (2, 4)], 1: [(3, 2)], 2: [(3, 1)], 3: []}, 0, 3, h={0:3,1:2,2:1,3:0}', isHidden: false, description: 'Find optimal path' },
      { input: '{0: [(1, 1)], 1: [(2, 1)], 2: []}, 0, 2, h={0:2,1:1,2:0}', isHidden: false, description: 'Linear path' },
      { input: '{0: [(1, 5)], 1: [], 2: []}, 0, 2, h={0:1,1:1,2:0}', isHidden: true, description: 'No path' },
      { input: '{0: []}, 0, 0, h={0:0}', isHidden: true, description: 'Same start and goal' }
    ],
    hints: ['f = g + h (actual + heuristic)', 'Use min-heap with f values', 'Track path in heap entries'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex15',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Bipartite Matching',
    difficulty: 4,
    description: 'Find maximum matching in a bipartite graph using augmenting paths (Hungarian algorithm approach).',
    starterCode: 'def max_bipartite_matching(left, right, edges):\n    """Find maximum matching in bipartite graph\n    \n    Args:\n        left: Set of left vertices\n        right: Set of right vertices\n        edges: List of (left_v, right_v) edges\n    Returns:\n        List of matched edges\n    """\n    pass\n\nprint(max_bipartite_matching({0, 1, 2}, {3, 4, 5}, [(0,3), (0,4), (1,4), (2,5)]))',
    solution: 'def max_bipartite_matching(left, right, edges):\n    """Find maximum matching in bipartite graph\n    \n    Args:\n        left: Set of left vertices\n        right: Set of right vertices\n        edges: List of (left_v, right_v) edges\n    Returns:\n        List of matched edges\n    """\n    # Build adjacency list\n    graph = {v: [] for v in left}\n    for u, v in edges:\n        graph[u].append(v)\n    \n    match = {}\n    \n    def dfs(u, visited):\n        for v in graph[u]:\n            if v in visited:\n                continue\n            visited.add(v)\n            \n            if v not in match or dfs(match[v], visited):\n                match[v] = u\n                return True\n        return False\n    \n    for u in left:\n        dfs(u, set())\n    \n    return [(v, u) for u, v in match.items()]\n\nprint(max_bipartite_matching({0, 1, 2}, {3, 4, 5}, [(0,3), (0,4), (1,4), (2,5)]))',
    testCases: [
      { input: '{0, 1, 2}, {3, 4, 5}, [(0,3), (0,4), (1,4), (2,5)]', isHidden: false, description: 'Max matching 3' },
      { input: '{0, 1}, {2, 3}, [(0,2), (1,3)]', isHidden: false, description: 'Perfect matching' },
      { input: '{0, 1, 2}, {3, 4}, [(0,3), (1,3), (2,4)]', isHidden: true, description: 'Max matching 2' },
      { input: '{0}, {1}, [(0,1)]', isHidden: true, description: 'Single edge' }
    ],
    hints: ['Use augmenting paths', 'DFS to find alternating paths', 'Try to match each left vertex'],
    language: 'python'
  },
  {
    id: 'math102-t4-ex16',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Johnson\'s Algorithm',
    difficulty: 5,
    description: 'Implement Johnson\'s algorithm for all-pairs shortest paths that handles negative weights by reweighting the graph.',
    starterCode: 'import heapq\n\ndef johnson(n, edges):\n    """All-pairs shortest paths with negative weights\n    \n    Args:\n        n: Number of vertices\n        edges: List of (u, v, weight)\n    Returns:\n        n×n distance matrix or None if negative cycle\n    """\n    pass\n\nprint(johnson(3, [(0,1,4), (0,2,5), (1,2,-2)]))',
    solution: 'import heapq\n\ndef johnson(n, edges):\n    """All-pairs shortest paths with negative weights\n    \n    Args:\n        n: Number of vertices\n        edges: List of (u, v, weight)\n    Returns:\n        n×n distance matrix or None if negative cycle\n    """\n    # Add new vertex n connected to all others with weight 0\n    extended_edges = edges + [(n, i, 0) for i in range(n)]\n    \n    # Bellman-Ford from new vertex to find reweighting function h\n    h = [float(\'inf\')] * (n + 1)\n    h[n] = 0\n    \n    for _ in range(n):\n        for u, v, w in extended_edges:\n            if h[u] + w < h[v]:\n                h[v] = h[u] + w\n    \n    # Check for negative cycle\n    for u, v, w in extended_edges:\n        if h[u] + w < h[v]:\n            return None\n    \n    # Build reweighted graph\n    graph = {i: [] for i in range(n)}\n    for u, v, w in edges:\n        new_w = w + h[u] - h[v]\n        graph[u].append((v, new_w))\n    \n    # Run Dijkstra from each vertex\n    dist = [[float(\'inf\')] * n for _ in range(n)]\n    \n    for start in range(n):\n        d = [float(\'inf\')] * n\n        d[start] = 0\n        pq = [(0, start)]\n        \n        while pq:\n            curr_d, u = heapq.heappop(pq)\n            if curr_d > d[u]:\n                continue\n            for v, w in graph[u]:\n                if d[u] + w < d[v]:\n                    d[v] = d[u] + w\n                    heapq.heappush(pq, (d[v], v))\n        \n        for v in range(n):\n            if d[v] != float(\'inf\'):\n                dist[start][v] = d[v] - h[start] + h[v]\n            else:\n                dist[start][v] = float(\'inf\')\n    \n    return dist\n\nprint(johnson(3, [(0,1,4), (0,2,5), (1,2,-2)]))',
    testCases: [
      { input: '3, [(0,1,4), (0,2,5), (1,2,-2)]', isHidden: false, description: 'Negative edge' },
      { input: '3, [(0,1,1), (1,2,2), (0,2,5)]', isHidden: false, description: 'No negative edges' },
      { input: '3, [(0,1,1), (1,2,-5), (2,0,2)]', isHidden: true, description: 'Negative cycle' },
      { input: '2, [(0,1,3), (1,0,-1)]', isHidden: true, description: 'Bidirectional edges' }
    ],
    hints: ['Add auxiliary vertex', 'Bellman-Ford to find h values', 'Reweight: w\' = w + h[u] - h[v]', 'Dijkstra from each vertex'],
    language: 'python'
  }
];
