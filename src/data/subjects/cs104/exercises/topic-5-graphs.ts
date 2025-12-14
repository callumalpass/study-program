import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs104-exercise-5',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'Course Schedule (Graph Cycle Detection)',
    difficulty: 3,
    description: 'Given a number of courses and their prerequisites, determine if it\'s possible to complete all courses. This is a cycle detection problem in a directed graph.',
    language: 'python',
    starterCode: 'def can_finish(num_courses, prerequisites):\n    # prerequisites is a list of [course, prerequisite] pairs\n    # Your code here\n    pass',
    testCases: [
      { input: 'num_courses=2, prerequisites=[[1,0]]', expectedOutput: 'True', isHidden: false, description: 'Can take course 0 then course 1' },
      { input: 'num_courses=2, prerequisites=[[1,0],[0,1]]', expectedOutput: 'False', isHidden: false, description: 'Circular dependency' },
      { input: 'num_courses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]', expectedOutput: 'True', isHidden: true, description: 'Multiple valid orderings exist' }
    ],
    hints: ['Build an adjacency list to represent the graph', 'Use DFS with a visited state tracking: unvisited, visiting, visited', 'If you encounter a node in "visiting" state, a cycle exists'],
    solution: 'def can_finish(num_courses, prerequisites):\n    # Build adjacency list\n    graph = {i: [] for i in range(num_courses)}\n    for course, prereq in prerequisites:\n        graph[course].append(prereq)\n    \n    # 0 = unvisited, 1 = visiting, 2 = visited\n    state = [0] * num_courses\n    \n    def has_cycle(course):\n        if state[course] == 1:  # Currently visiting - cycle detected\n            return True\n        if state[course] == 2:  # Already visited\n            return False\n        \n        state[course] = 1  # Mark as visiting\n        for prereq in graph[course]:\n            if has_cycle(prereq):\n                return True\n        state[course] = 2  # Mark as visited\n        return False\n    \n    for course in range(num_courses):\n        if has_cycle(course):\n            return False\n    \n    return True'
  },
  {
    id: 'cs104-t5-ex02',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'BFS - Shortest Path in Unweighted Graph',
    difficulty: 2,
    description: 'Find the shortest path between two nodes in an unweighted graph using BFS. Return the path length, or -1 if no path exists.',
    starterCode: 'from collections import deque\n\ndef shortest_path(graph, start, end):\n    # graph is adjacency list: {node: [neighbors]}\n    pass\n\ngraph = {0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2, 4], 4: [3]}\nprint(shortest_path(graph, 0, 4))',
    solution: 'from collections import deque\n\ndef shortest_path(graph, start, end):\n    if start == end:\n        return 0\n    \n    visited = {start}\n    queue = deque([(start, 0)])\n    \n    while queue:\n        node, distance = queue.popleft()\n        for neighbor in graph.get(node, []):\n            if neighbor == end:\n                return distance + 1\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append((neighbor, distance + 1))\n    \n    return -1\n\ngraph = {0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2, 4], 4: [3]}\nprint(shortest_path(graph, 0, 4))',
    testCases: [
      { input: 'graph, start=0, end=4', expectedOutput: '3', isHidden: false, description: 'Path 0->1->3->4 or 0->2->3->4' },
      { input: 'graph, start=0, end=0', expectedOutput: '0', isHidden: true, description: 'Same node' }
    ],
    hints: ['BFS finds shortest path in unweighted graphs', 'Track visited nodes to avoid cycles', 'Store distance with each node in queue'],
    language: 'python'
  },
  {
    id: 'cs104-t5-ex03',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'DFS - Count Connected Components',
    difficulty: 2,
    description: 'Count the number of connected components in an undirected graph.',
    starterCode: 'def count_components(n, edges):\n    # n is number of nodes (0 to n-1)\n    # edges is list of [a, b] pairs\n    pass\n\nprint(count_components(5, [[0,1], [1,2], [3,4]]))',
    solution: 'def count_components(n, edges):\n    # Build adjacency list\n    graph = {i: [] for i in range(n)}\n    for a, b in edges:\n        graph[a].append(b)\n        graph[b].append(a)\n    \n    visited = set()\n    count = 0\n    \n    def dfs(node):\n        visited.add(node)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                dfs(neighbor)\n    \n    for node in range(n):\n        if node not in visited:\n            dfs(node)\n            count += 1\n    \n    return count\n\nprint(count_components(5, [[0,1], [1,2], [3,4]]))',
    testCases: [
      { input: 'n=5, edges=[[0,1],[1,2],[3,4]]', expectedOutput: '2', isHidden: false, description: 'Two components' },
      { input: 'n=5, edges=[[0,1],[1,2],[2,3],[3,4]]', expectedOutput: '1', isHidden: true, description: 'All connected' }
    ],
    hints: ['Build undirected adjacency list (add both directions)', 'DFS from each unvisited node starts a new component'],
    language: 'python'
  },
  {
    id: 'cs104-t5-ex04',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'Clone Graph',
    difficulty: 3,
    description: 'Given a reference to a node in a connected undirected graph, return a deep copy. Each node has a value and list of neighbors.',
    starterCode: 'class Node:\n    def __init__(self, val=0, neighbors=None):\n        self.val = val\n        self.neighbors = neighbors if neighbors else []\n\ndef clone_graph(node):\n    # Return deep copy of graph\n    pass',
    solution: 'class Node:\n    def __init__(self, val=0, neighbors=None):\n        self.val = val\n        self.neighbors = neighbors if neighbors else []\n\ndef clone_graph(node):\n    if not node:\n        return None\n    \n    cloned = {}  # original node -> cloned node\n    \n    def dfs(node):\n        if node in cloned:\n            return cloned[node]\n        \n        copy = Node(node.val)\n        cloned[node] = copy\n        \n        for neighbor in node.neighbors:\n            copy.neighbors.append(dfs(neighbor))\n        \n        return copy\n    \n    return dfs(node)',
    testCases: [
      { input: 'Graph: [[2,4],[1,3],[2,4],[1,3]]', expectedOutput: 'Deep copy with same structure', isHidden: false, description: 'Clone graph' }
    ],
    hints: ['Use hash map to track original -> clone mapping', 'DFS to traverse and clone each node', 'Check if already cloned before creating new node'],
    language: 'python'
  },
  {
    id: 'cs104-t5-ex05',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'Topological Sort',
    difficulty: 3,
    description: 'Perform topological sort on a directed acyclic graph. Return a valid ordering, or empty list if graph has a cycle.',
    starterCode: 'def topological_sort(n, edges):\n    # n nodes (0 to n-1), edges are [from, to] pairs\n    # Return list in topological order\n    pass\n\nprint(topological_sort(4, [[0,1], [0,2], [1,3], [2,3]]))',
    solution: 'from collections import deque\n\ndef topological_sort(n, edges):\n    # Build graph and count in-degrees\n    graph = {i: [] for i in range(n)}\n    in_degree = [0] * n\n    \n    for a, b in edges:\n        graph[a].append(b)\n        in_degree[b] += 1\n    \n    # Start with nodes having 0 in-degree\n    queue = deque([i for i in range(n) if in_degree[i] == 0])\n    result = []\n    \n    while queue:\n        node = queue.popleft()\n        result.append(node)\n        for neighbor in graph[node]:\n            in_degree[neighbor] -= 1\n            if in_degree[neighbor] == 0:\n                queue.append(neighbor)\n    \n    return result if len(result) == n else []\n\nprint(topological_sort(4, [[0,1], [0,2], [1,3], [2,3]]))',
    testCases: [
      { input: 'n=4, edges=[[0,1],[0,2],[1,3],[2,3]]', expectedOutput: '[0, 1, 2, 3] or [0, 2, 1, 3]', isHidden: false, description: 'Valid topological order' },
      { input: 'n=2, edges=[[0,1],[1,0]]', expectedOutput: '[]', isHidden: true, description: 'Cycle detected' }
    ],
    hints: ['Use Kahn\'s algorithm with in-degree counting', 'Start with nodes having in-degree 0', 'If result length != n, there was a cycle'],
    language: 'python'
  },
  {
    id: 'cs104-t5-ex06',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'Dijkstra\'s Shortest Path',
    difficulty: 4,
    description: 'Implement Dijkstra\'s algorithm to find the shortest path from a source to all other nodes in a weighted graph.',
    starterCode: 'import heapq\n\ndef dijkstra(graph, start):\n    # graph: {node: [(neighbor, weight), ...]}\n    # Return dict of shortest distances from start\n    pass\n\ngraph = {\n    0: [(1, 4), (2, 1)],\n    1: [(3, 1)],\n    2: [(1, 2), (3, 5)],\n    3: []\n}\nprint(dijkstra(graph, 0))',
    solution: 'import heapq\n\ndef dijkstra(graph, start):\n    distances = {node: float(\'inf\') for node in graph}\n    distances[start] = 0\n    heap = [(0, start)]  # (distance, node)\n    \n    while heap:\n        dist, node = heapq.heappop(heap)\n        \n        if dist > distances[node]:\n            continue\n        \n        for neighbor, weight in graph.get(node, []):\n            new_dist = dist + weight\n            if new_dist < distances[neighbor]:\n                distances[neighbor] = new_dist\n                heapq.heappush(heap, (new_dist, neighbor))\n    \n    return distances\n\ngraph = {\n    0: [(1, 4), (2, 1)],\n    1: [(3, 1)],\n    2: [(1, 2), (3, 5)],\n    3: []\n}\nprint(dijkstra(graph, 0))',
    testCases: [
      { input: 'graph from 0', expectedOutput: '{0: 0, 1: 3, 2: 1, 3: 4}', isHidden: false, description: 'Shortest paths' }
    ],
    hints: ['Use min heap for efficiency', 'Skip if we\'ve found a shorter path already', 'Update distance if new path is shorter'],
    language: 'python'
  },
  {
    id: 'cs104-t5-ex07',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'Number of Islands',
    difficulty: 2,
    description: 'Given a 2D grid of "1"s (land) and "0"s (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent lands.',
    starterCode: 'def num_islands(grid):\n    # grid is list of lists of "0" and "1"\n    pass\n\ngrid = [\n    ["1","1","0","0","0"],\n    ["1","1","0","0","0"],\n    ["0","0","1","0","0"],\n    ["0","0","0","1","1"]\n]\nprint(num_islands(grid))',
    solution: 'def num_islands(grid):\n    if not grid:\n        return 0\n    \n    rows, cols = len(grid), len(grid[0])\n    count = 0\n    \n    def dfs(r, c):\n        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == "0":\n            return\n        grid[r][c] = "0"  # Mark as visited\n        dfs(r+1, c)\n        dfs(r-1, c)\n        dfs(r, c+1)\n        dfs(r, c-1)\n    \n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == "1":\n                dfs(r, c)\n                count += 1\n    \n    return count\n\ngrid = [\n    ["1","1","0","0","0"],\n    ["1","1","0","0","0"],\n    ["0","0","1","0","0"],\n    ["0","0","0","1","1"]\n]\nprint(num_islands(grid))',
    testCases: [
      { input: 'grid with 3 islands', expectedOutput: '3', isHidden: false, description: 'Count islands' },
      { input: 'all water', expectedOutput: '0', isHidden: true, description: 'No islands' }
    ],
    hints: ['Use DFS/BFS to explore each island', 'Mark visited cells to avoid counting twice', 'Each DFS from a new "1" is a new island'],
    language: 'python'
  },
  {
    id: 'cs104-t5-ex08',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'Minimum Spanning Tree (Prim\'s)',
    difficulty: 5,
    description: 'Implement Prim\'s algorithm to find the minimum spanning tree of a weighted undirected graph. Return the total weight.',
    starterCode: 'import heapq\n\ndef prim_mst(n, edges):\n    # n nodes (0 to n-1)\n    # edges: [[a, b, weight], ...]\n    # Return total weight of MST\n    pass\n\nprint(prim_mst(4, [[0,1,1], [0,2,4], [1,2,2], [1,3,6], [2,3,3]]))',
    solution: 'import heapq\n\ndef prim_mst(n, edges):\n    # Build adjacency list\n    graph = {i: [] for i in range(n)}\n    for a, b, w in edges:\n        graph[a].append((w, b))\n        graph[b].append((w, a))\n    \n    visited = set()\n    heap = [(0, 0)]  # (weight, node), start from node 0\n    total_weight = 0\n    \n    while heap and len(visited) < n:\n        weight, node = heapq.heappop(heap)\n        \n        if node in visited:\n            continue\n        \n        visited.add(node)\n        total_weight += weight\n        \n        for edge_weight, neighbor in graph[node]:\n            if neighbor not in visited:\n                heapq.heappush(heap, (edge_weight, neighbor))\n    \n    return total_weight if len(visited) == n else -1\n\nprint(prim_mst(4, [[0,1,1], [0,2,4], [1,2,2], [1,3,6], [2,3,3]]))',
    testCases: [
      { input: 'n=4, edges given', expectedOutput: '6', isHidden: false, description: 'MST weight: 1+2+3' },
      { input: 'disconnected graph', expectedOutput: '-1', isHidden: true, description: 'No MST possible' }
    ],
    hints: ['Use min heap to always pick minimum weight edge', 'Start from any node, greedily add cheapest edge to unvisited node', 'MST has n-1 edges for n nodes'],
    language: 'python'
  }
];
