import { CodingExercise } from '../../../../core/types';

export const cs201Topic7Exercises: CodingExercise[] = [
  // Exercises 1-4: Graph Representations
  {
    id: 'cs201-ex-7-1',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Build Adjacency List from Edges',
    description: 'Given a list of edges, create an adjacency list representation of an undirected graph. Each edge is a tuple (u, v) representing a connection between vertices u and v.',
    difficulty: 1,
    language: 'python',
    starterCode: `def build_adjacency_list(edges, num_vertices):
    """
    Build an adjacency list from a list of edges.

    Args:
        edges: List of tuples (u, v) representing edges
        num_vertices: Total number of vertices (0 to num_vertices-1)

    Returns:
        Dictionary where keys are vertices and values are lists of adjacent vertices
    """
    # Your code here
    pass`,
    solution: `def build_adjacency_list(edges, num_vertices):
    """
    Build an adjacency list from a list of edges.

    Args:
        edges: List of tuples (u, v) representing edges
        num_vertices: Total number of vertices (0 to num_vertices-1)

    Returns:
        Dictionary where keys are vertices and values are lists of adjacent vertices
    """
    # Initialize adjacency list with empty lists for each vertex
    adj_list = {i: [] for i in range(num_vertices)}

    # Add edges to adjacency list (undirected graph)
    for u, v in edges:
        adj_list[u].append(v)
        adj_list[v].append(u)

    return adj_list`,
    testCases: [
      {
        input: '[(0, 1), (0, 2), (1, 2), (2, 3)], 4',
        expectedOutput: '{0: [1, 2], 1: [0, 2], 2: [0, 1, 3], 3: [2]}',
        isHidden: false,
        description: 'Simple 4-vertex graph'
      },
      {
        input: '[], 3',
        expectedOutput: '{0: [], 1: [], 2: []}',
        isHidden: false,
        description: 'Graph with no edges'
      },
      {
        input: '[(0, 1), (1, 2), (2, 3), (3, 4)], 5',
        expectedOutput: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2, 4], 4: [3]}',
        isHidden: false,
        description: 'Linear graph (chain)'
      }
    ],
    hints: [
      'Initialize a dictionary with empty lists for each vertex',
      'For undirected graphs, add each edge in both directions',
      'Remember to handle vertices with no edges'
    ]
  },
  {
    id: 'cs201-ex-7-2',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Build Directed Adjacency List',
    description: 'Create an adjacency list for a directed graph. Each edge (u, v) should only create a connection from u to v, not vice versa.',
    difficulty: 1,
    language: 'python',
    starterCode: `def build_directed_adjacency_list(edges, num_vertices):
    """
    Build an adjacency list for a directed graph.

    Args:
        edges: List of tuples (u, v) representing directed edges from u to v
        num_vertices: Total number of vertices

    Returns:
        Dictionary representing directed adjacency list
    """
    # Your code here
    pass`,
    solution: `def build_directed_adjacency_list(edges, num_vertices):
    """
    Build an adjacency list for a directed graph.

    Args:
        edges: List of tuples (u, v) representing directed edges from u to v
        num_vertices: Total number of vertices

    Returns:
        Dictionary representing directed adjacency list
    """
    # Initialize adjacency list
    adj_list = {i: [] for i in range(num_vertices)}

    # Add directed edges
    for u, v in edges:
        adj_list[u].append(v)

    return adj_list`,
    testCases: [
      {
        input: '[(0, 1), (0, 2), (1, 2), (2, 0)], 3',
        expectedOutput: '{0: [1, 2], 1: [2], 2: [0]}',
        isHidden: false,
        description: 'Directed graph with cycle'
      },
      {
        input: '[(0, 1), (1, 2), (2, 3)], 4',
        expectedOutput: '{0: [1], 1: [2], 2: [3], 3: []}',
        isHidden: false,
        description: 'Directed acyclic graph (DAG)'
      },
      {
        input: '[], 2',
        expectedOutput: '{0: [], 1: []}',
        isHidden: false,
        description: 'No edges'
      }
    ],
    hints: [
      'For directed graphs, only add edge from u to v, not from v to u',
      'Some vertices may have no outgoing edges',
      'Initialize all vertices even if they have no edges'
    ]
  },
  {
    id: 'cs201-ex-7-3',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Adjacency List to Matrix',
    description: 'Convert an adjacency list representation to an adjacency matrix. For an undirected graph with n vertices, create an n×n matrix where matrix[i][j] = 1 if there is an edge between i and j.',
    difficulty: 2,
    language: 'python',
    starterCode: `def adjacency_list_to_matrix(adj_list):
    """
    Convert adjacency list to adjacency matrix.

    Args:
        adj_list: Dictionary where keys are vertices and values are lists of neighbors

    Returns:
        2D list (matrix) representing the graph
    """
    # Your code here
    pass`,
    solution: `def adjacency_list_to_matrix(adj_list):
    """
    Convert adjacency list to adjacency matrix.

    Args:
        adj_list: Dictionary where keys are vertices and values are lists of neighbors

    Returns:
        2D list (matrix) representing the graph
    """
    n = len(adj_list)
    # Initialize matrix with zeros
    matrix = [[0] * n for _ in range(n)]

    # Fill in the edges
    for vertex, neighbors in adj_list.items():
        for neighbor in neighbors:
            matrix[vertex][neighbor] = 1

    return matrix`,
    testCases: [
      {
        input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}',
        expectedOutput: '[[0, 1, 1], [1, 0, 1], [1, 1, 0]]',
        isHidden: false,
        description: 'Triangle graph'
      },
      {
        input: '{0: [1], 1: [0], 2: []}',
        expectedOutput: '[[0, 1, 0], [1, 0, 0], [0, 0, 0]]',
        isHidden: false,
        description: 'Graph with isolated vertex'
      },
      {
        input: '{0: [], 1: [], 2: []}',
        expectedOutput: '[[0, 0, 0], [0, 0, 0], [0, 0, 0]]',
        isHidden: false,
        description: 'No edges'
      }
    ],
    hints: [
      'Initialize an n×n matrix with all zeros',
      'Set matrix[i][j] = 1 for each edge from i to j',
      'The size of the matrix is determined by the number of vertices'
    ]
  },
  {
    id: 'cs201-ex-7-4',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Count Graph Edges',
    description: 'Given an adjacency list of an undirected graph, count the total number of edges. Be careful not to double-count edges!',
    difficulty: 2,
    language: 'python',
    starterCode: `def count_edges(adj_list):
    """
    Count the number of edges in an undirected graph.

    Args:
        adj_list: Dictionary representing adjacency list

    Returns:
        Integer count of edges
    """
    # Your code here
    pass`,
    solution: `def count_edges(adj_list):
    """
    Count the number of edges in an undirected graph.

    Args:
        adj_list: Dictionary representing adjacency list

    Returns:
        Integer count of edges
    """
    # Count all connections and divide by 2 (each edge counted twice)
    total_connections = sum(len(neighbors) for neighbors in adj_list.values())
    return total_connections // 2`,
    testCases: [
      {
        input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}',
        expectedOutput: '3',
        isHidden: false,
        description: 'Triangle graph (3 edges)'
      },
      {
        input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}',
        expectedOutput: '3',
        isHidden: false,
        description: 'Linear chain (3 edges)'
      },
      {
        input: '{0: [], 1: [], 2: []}',
        expectedOutput: '0',
        isHidden: false,
        description: 'No edges'
      },
      {
        input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}',
        expectedOutput: '3',
        isHidden: false,
        description: 'Star graph (3 edges)'
      }
    ],
    hints: [
      'In an undirected graph, each edge appears twice in the adjacency list',
      'Count all neighbor entries and divide by 2',
      'Use sum() with a generator expression for efficiency'
    ]
  },

  // Exercises 5-8: BFS Implementation and Applications
  {
    id: 'cs201-ex-7-5',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Breadth-First Search Traversal',
    description: 'Implement BFS to traverse a graph starting from a given vertex. Return the vertices in the order they are visited.',
    difficulty: 2,
    language: 'python',
    starterCode: `from collections import deque

def bfs_traversal(adj_list, start):
    """
    Perform BFS traversal starting from a given vertex.

    Args:
        adj_list: Dictionary representing adjacency list
        start: Starting vertex

    Returns:
        List of vertices in BFS order
    """
    # Your code here
    pass`,
    solution: `from collections import deque

def bfs_traversal(adj_list, start):
    """
    Perform BFS traversal starting from a given vertex.

    Args:
        adj_list: Dictionary representing adjacency list
        start: Starting vertex

    Returns:
        List of vertices in BFS order
    """
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []

    while queue:
        vertex = queue.popleft()
        result.append(vertex)

        # Visit all unvisited neighbors
        for neighbor in adj_list[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result`,
    testCases: [
      {
        input: '{0: [1, 2], 1: [0, 3, 4], 2: [0, 4], 3: [1], 4: [1, 2]}, 0',
        expectedOutput: '[0, 1, 2, 3, 4]',
        isHidden: false,
        description: 'Small connected graph'
      },
      {
        input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}, 0',
        expectedOutput: '[0, 1, 2, 3]',
        isHidden: false,
        description: 'Linear chain'
      },
      {
        input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}, 0',
        expectedOutput: '[0, 1, 2, 3]',
        isHidden: false,
        description: 'Star graph'
      }
    ],
    hints: [
      'Use a queue (deque) to track vertices to visit',
      'Keep a set of visited vertices to avoid revisiting',
      'Mark vertices as visited when adding to queue, not when removing'
    ]
  },
  {
    id: 'cs201-ex-7-6',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'BFS Level Order Traversal',
    description: 'Implement BFS to return vertices grouped by their distance (level) from the start vertex. Return a list of lists, where each sublist contains all vertices at that distance.',
    difficulty: 3,
    language: 'python',
    starterCode: `from collections import deque

def bfs_by_level(adj_list, start):
    """
    Perform BFS and return vertices grouped by level.

    Args:
        adj_list: Dictionary representing adjacency list
        start: Starting vertex

    Returns:
        List of lists, where result[i] contains all vertices at distance i
    """
    # Your code here
    pass`,
    solution: `from collections import deque

def bfs_by_level(adj_list, start):
    """
    Perform BFS and return vertices grouped by level.

    Args:
        adj_list: Dictionary representing adjacency list
        start: Starting vertex

    Returns:
        List of lists, where result[i] contains all vertices at distance i
    """
    visited = {start}
    queue = deque([start])
    levels = []

    while queue:
        level_size = len(queue)
        current_level = []

        for _ in range(level_size):
            vertex = queue.popleft()
            current_level.append(vertex)

            for neighbor in adj_list[vertex]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

        levels.append(current_level)

    return levels`,
    testCases: [
      {
        input: '{0: [1, 2], 1: [0, 3, 4], 2: [0, 4], 3: [1], 4: [1, 2]}, 0',
        expectedOutput: '[[0], [1, 2], [3, 4]]',
        isHidden: false,
        description: 'Graph with 3 levels'
      },
      {
        input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}, 0',
        expectedOutput: '[[0], [1], [2], [3]]',
        isHidden: false,
        description: 'Linear chain'
      },
      {
        input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}, 0',
        expectedOutput: '[[0], [1, 2, 3]]',
        isHidden: false,
        description: 'Star graph'
      }
    ],
    hints: [
      'Process the queue level by level using its current size',
      'For each level, process exactly level_size vertices',
      'Add all vertices at the same distance to the same sublist'
    ]
  },
  {
    id: 'cs201-ex-7-7',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Shortest Path in Unweighted Graph',
    description: 'Find the shortest path between two vertices in an unweighted graph using BFS. Return the path as a list of vertices, or an empty list if no path exists.',
    difficulty: 3,
    language: 'python',
    starterCode: `from collections import deque

def shortest_path(adj_list, start, end):
    """
    Find shortest path between two vertices using BFS.

    Args:
        adj_list: Dictionary representing adjacency list
        start: Starting vertex
        end: Target vertex

    Returns:
        List representing the shortest path from start to end
    """
    # Your code here
    pass`,
    solution: `from collections import deque

def shortest_path(adj_list, start, end):
    """
    Find shortest path between two vertices using BFS.

    Args:
        adj_list: Dictionary representing adjacency list
        start: Starting vertex
        end: Target vertex

    Returns:
        List representing the shortest path from start to end
    """
    if start == end:
        return [start]

    visited = {start}
    queue = deque([start])
    parent = {start: None}

    while queue:
        vertex = queue.popleft()

        for neighbor in adj_list[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                parent[neighbor] = vertex
                queue.append(neighbor)

                # Found the target
                if neighbor == end:
                    # Reconstruct path
                    path = []
                    current = end
                    while current is not None:
                        path.append(current)
                        current = parent[current]
                    return path[::-1]

    # No path found
    return []`,
    testCases: [
      {
        input: '{0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2, 4], 4: [3]}, 0, 4',
        expectedOutput: '[0, 1, 3, 4]',
        isHidden: false,
        description: 'Path exists with length 3'
      },
      {
        input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}, 0, 3',
        expectedOutput: '[0, 1, 2, 3]',
        isHidden: false,
        description: 'Linear path'
      },
      {
        input: '{0: [1], 1: [0], 2: [3], 3: [2]}, 0, 3',
        expectedOutput: '[]',
        isHidden: false,
        description: 'No path exists (disconnected components)'
      },
      {
        input: '{0: [1, 2], 1: [0], 2: [0]}, 0, 0',
        expectedOutput: '[0]',
        isHidden: false,
        description: 'Start equals end'
      }
    ],
    hints: [
      'Track parent relationships during BFS to reconstruct the path',
      'Stop BFS as soon as you reach the target vertex',
      'Reconstruct path by following parent pointers backwards',
      'Handle edge cases: start == end, no path exists'
    ]
  },
  {
    id: 'cs201-ex-7-8',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Distance Between Vertices',
    description: 'Calculate the shortest distance (minimum number of edges) between two vertices in an unweighted graph. Return -1 if no path exists.',
    difficulty: 2,
    language: 'python',
    starterCode: `from collections import deque

def shortest_distance(adj_list, start, end):
    """
    Find the shortest distance between two vertices.

    Args:
        adj_list: Dictionary representing adjacency list
        start: Starting vertex
        end: Target vertex

    Returns:
        Integer distance, or -1 if no path exists
    """
    # Your code here
    pass`,
    solution: `from collections import deque

def shortest_distance(adj_list, start, end):
    """
    Find the shortest distance between two vertices.

    Args:
        adj_list: Dictionary representing adjacency list
        start: Starting vertex
        end: Target vertex

    Returns:
        Integer distance, or -1 if no path exists
    """
    if start == end:
        return 0

    visited = {start}
    queue = deque([(start, 0)])

    while queue:
        vertex, distance = queue.popleft()

        for neighbor in adj_list[vertex]:
            if neighbor not in visited:
                if neighbor == end:
                    return distance + 1

                visited.add(neighbor)
                queue.append((neighbor, distance + 1))

    return -1`,
    testCases: [
      {
        input: '{0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2, 4], 4: [3]}, 0, 4',
        expectedOutput: '3',
        isHidden: false,
        description: 'Distance is 3'
      },
      {
        input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}, 0, 3',
        expectedOutput: '3',
        isHidden: false,
        description: 'Linear distance'
      },
      {
        input: '{0: [1], 1: [0], 2: [3], 3: [2]}, 0, 3',
        expectedOutput: '-1',
        isHidden: false,
        description: 'No path (return -1)'
      },
      {
        input: '{0: [1, 2], 1: [0], 2: [0]}, 0, 0',
        expectedOutput: '0',
        isHidden: false,
        description: 'Same vertex (distance 0)'
      }
    ],
    hints: [
      'Use BFS with distance tracking in the queue',
      'Store tuples (vertex, distance) in the queue',
      'Return distance + 1 when target is found',
      'Return -1 if BFS completes without finding target'
    ]
  },

  // Exercises 9-12: DFS Implementation and Applications
  {
    id: 'cs201-ex-7-9',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Depth-First Search Traversal',
    description: 'Implement DFS to traverse a graph starting from a given vertex. Return the vertices in the order they are visited. Use recursion.',
    difficulty: 2,
    language: 'python',
    starterCode: `def dfs_traversal(adj_list, start):
    """
    Perform DFS traversal starting from a given vertex.

    Args:
        adj_list: Dictionary representing adjacency list
        start: Starting vertex

    Returns:
        List of vertices in DFS order
    """
    # Your code here
    pass`,
    solution: `def dfs_traversal(adj_list, start):
    """
    Perform DFS traversal starting from a given vertex.

    Args:
        adj_list: Dictionary representing adjacency list
        start: Starting vertex

    Returns:
        List of vertices in DFS order
    """
    visited = set()
    result = []

    def dfs(vertex):
        visited.add(vertex)
        result.append(vertex)

        for neighbor in adj_list[vertex]:
            if neighbor not in visited:
                dfs(neighbor)

    dfs(start)
    return result`,
    testCases: [
      {
        input: '{0: [1, 2], 1: [0, 3, 4], 2: [0, 4], 3: [1], 4: [1, 2]}, 0',
        expectedOutput: '[0, 1, 3, 4, 2]',
        isHidden: false,
        description: 'Connected graph DFS'
      },
      {
        input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}, 0',
        expectedOutput: '[0, 1, 2, 3]',
        isHidden: false,
        description: 'Linear chain'
      },
      {
        input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}, 0',
        expectedOutput: '[0, 1, 2, 3]',
        isHidden: false,
        description: 'Star graph'
      }
    ],
    hints: [
      'Use recursion to implement DFS',
      'Keep a visited set to track explored vertices',
      'Add vertex to result when first visiting it',
      'Recursively visit all unvisited neighbors'
    ]
  },
  {
    id: 'cs201-ex-7-10',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Iterative DFS Traversal',
    description: 'Implement DFS using an iterative approach with a stack instead of recursion. Return vertices in DFS order.',
    difficulty: 3,
    language: 'python',
    starterCode: `def dfs_iterative(adj_list, start):
    """
    Perform iterative DFS traversal using a stack.

    Args:
        adj_list: Dictionary representing adjacency list
        start: Starting vertex

    Returns:
        List of vertices in DFS order
    """
    # Your code here
    pass`,
    solution: `def dfs_iterative(adj_list, start):
    """
    Perform iterative DFS traversal using a stack.

    Args:
        adj_list: Dictionary representing adjacency list
        start: Starting vertex

    Returns:
        List of vertices in DFS order
    """
    visited = set()
    stack = [start]
    result = []

    while stack:
        vertex = stack.pop()

        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)

            # Add neighbors to stack in reverse order
            # This maintains left-to-right traversal order
            for neighbor in reversed(adj_list[vertex]):
                if neighbor not in visited:
                    stack.append(neighbor)

    return result`,
    testCases: [
      {
        input: '{0: [1, 2], 1: [0, 3, 4], 2: [0, 4], 3: [1], 4: [1, 2]}, 0',
        expectedOutput: '[0, 1, 3, 4, 2]',
        isHidden: false,
        description: 'Connected graph DFS'
      },
      {
        input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}, 0',
        expectedOutput: '[0, 1, 2, 3]',
        isHidden: false,
        description: 'Linear chain'
      },
      {
        input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}, 0',
        expectedOutput: '[0, 1, 2, 3]',
        isHidden: false,
        description: 'Star graph'
      }
    ],
    hints: [
      'Use a stack (list) instead of recursion',
      'Pop from stack to get next vertex to visit',
      'Check if vertex is visited when popping (not when pushing)',
      'Reverse neighbor order when pushing to maintain left-to-right order'
    ]
  },
  {
    id: 'cs201-ex-7-11',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Detect Cycle in Undirected Graph',
    description: 'Determine if an undirected graph contains a cycle using DFS. Return True if a cycle exists, False otherwise.',
    difficulty: 3,
    language: 'python',
    starterCode: `def has_cycle(adj_list):
    """
    Detect if an undirected graph contains a cycle.

    Args:
        adj_list: Dictionary representing adjacency list

    Returns:
        Boolean indicating if cycle exists
    """
    # Your code here
    pass`,
    solution: `def has_cycle(adj_list):
    """
    Detect if an undirected graph contains a cycle.

    Args:
        adj_list: Dictionary representing adjacency list

    Returns:
        Boolean indicating if cycle exists
    """
    visited = set()

    def dfs(vertex, parent):
        visited.add(vertex)

        for neighbor in adj_list[vertex]:
            if neighbor not in visited:
                if dfs(neighbor, vertex):
                    return True
            elif neighbor != parent:
                # Found a visited vertex that's not the parent - cycle!
                return True

        return False

    # Check all components
    for vertex in adj_list:
        if vertex not in visited:
            if dfs(vertex, None):
                return True

    return False`,
    testCases: [
      {
        input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}',
        expectedOutput: 'True',
        isHidden: false,
        description: 'Triangle (has cycle)'
      },
      {
        input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}',
        expectedOutput: 'False',
        isHidden: false,
        description: 'Linear chain (no cycle)'
      },
      {
        input: '{0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2]}',
        expectedOutput: 'True',
        isHidden: false,
        description: 'Square graph (has cycle)'
      },
      {
        input: '{0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}',
        expectedOutput: 'False',
        isHidden: false,
        description: 'Star graph (no cycle)'
      }
    ],
    hints: [
      'Track the parent vertex to avoid false positives in undirected graphs',
      'A cycle exists if you visit a neighbor that is already visited and not the parent',
      'Check all connected components in case graph is disconnected',
      'Use DFS with parent tracking'
    ]
  },
  {
    id: 'cs201-ex-7-12',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Count Connected Components',
    description: 'Count the number of connected components in an undirected graph. A connected component is a maximal set of vertices where each pair is connected by a path.',
    difficulty: 3,
    language: 'python',
    starterCode: `def count_components(adj_list):
    """
    Count the number of connected components in a graph.

    Args:
        adj_list: Dictionary representing adjacency list

    Returns:
        Integer count of connected components
    """
    # Your code here
    pass`,
    solution: `def count_components(adj_list):
    """
    Count the number of connected components in a graph.

    Args:
        adj_list: Dictionary representing adjacency list

    Returns:
        Integer count of connected components
    """
    visited = set()
    count = 0

    def dfs(vertex):
        visited.add(vertex)
        for neighbor in adj_list[vertex]:
            if neighbor not in visited:
                dfs(neighbor)

    # Start DFS from each unvisited vertex
    for vertex in adj_list:
        if vertex not in visited:
            dfs(vertex)
            count += 1

    return count`,
    testCases: [
      {
        input: '{0: [1, 2], 1: [0, 2], 2: [0, 1], 3: [4], 4: [3], 5: []}',
        expectedOutput: '3',
        isHidden: false,
        description: 'Three components: {0,1,2}, {3,4}, {5}'
      },
      {
        input: '{0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}',
        expectedOutput: '1',
        isHidden: false,
        description: 'Single connected component'
      },
      {
        input: '{0: [], 1: [], 2: [], 3: []}',
        expectedOutput: '4',
        isHidden: false,
        description: 'All isolated vertices'
      },
      {
        input: '{0: [1, 2], 1: [0], 2: [0], 3: [4, 5], 4: [3], 5: [3]}',
        expectedOutput: '2',
        isHidden: false,
        description: 'Two components: {0,1,2} and {3,4,5}'
      }
    ],
    hints: [
      'Start DFS from each unvisited vertex',
      'Increment counter for each new DFS start',
      'Each DFS explores one complete connected component',
      'Isolated vertices count as separate components'
    ]
  },

  // Exercises 13-16: Topological Sort and Dijkstra's Algorithm
  {
    id: 'cs201-ex-7-13',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Topological Sort (DFS)',
    description: 'Perform topological sort on a directed acyclic graph (DAG) using DFS. Return vertices in topologically sorted order, where each vertex appears before all vertices it has edges to.',
    difficulty: 4,
    language: 'python',
    starterCode: `def topological_sort(adj_list):
    """
    Perform topological sort on a DAG using DFS.

    Args:
        adj_list: Dictionary representing directed adjacency list

    Returns:
        List of vertices in topological order
    """
    # Your code here
    pass`,
    solution: `def topological_sort(adj_list):
    """
    Perform topological sort on a DAG using DFS.

    Args:
        adj_list: Dictionary representing directed adjacency list

    Returns:
        List of vertices in topological order
    """
    visited = set()
    stack = []

    def dfs(vertex):
        visited.add(vertex)

        for neighbor in adj_list[vertex]:
            if neighbor not in visited:
                dfs(neighbor)

        # Add to stack after visiting all descendants
        stack.append(vertex)

    # Visit all vertices
    for vertex in adj_list:
        if vertex not in visited:
            dfs(vertex)

    # Return reversed stack
    return stack[::-1]`,
    testCases: [
      {
        input: '{0: [1, 2], 1: [3], 2: [3], 3: []}',
        expectedOutput: '[0, 1, 2, 3]',
        isHidden: false,
        description: 'Simple DAG'
      },
      {
        input: '{5: [2, 0], 4: [0, 1], 2: [3], 3: [1], 0: [], 1: []}',
        expectedOutput: '[5, 4, 2, 3, 1, 0]',
        isHidden: false,
        description: 'Complex DAG (multiple valid orderings possible)'
      },
      {
        input: '{0: [1], 1: [2], 2: [3], 3: []}',
        expectedOutput: '[0, 1, 2, 3]',
        isHidden: false,
        description: 'Linear dependency chain'
      }
    ],
    hints: [
      'Use DFS and add vertices to stack after visiting all descendants',
      'Reverse the stack to get topological order',
      'Process all vertices in case graph has multiple components',
      'A vertex should appear before all its descendants in the result'
    ]
  },
  {
    id: 'cs201-ex-7-14',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Detect Cycle in Directed Graph',
    description: 'Detect if a directed graph contains a cycle using DFS with recursion stack tracking. Return True if a cycle exists.',
    difficulty: 4,
    language: 'python',
    starterCode: `def has_cycle_directed(adj_list):
    """
    Detect cycle in a directed graph.

    Args:
        adj_list: Dictionary representing directed adjacency list

    Returns:
        Boolean indicating if cycle exists
    """
    # Your code here
    pass`,
    solution: `def has_cycle_directed(adj_list):
    """
    Detect cycle in a directed graph.

    Args:
        adj_list: Dictionary representing directed adjacency list

    Returns:
        Boolean indicating if cycle exists
    """
    visited = set()
    rec_stack = set()  # Tracks current recursion path

    def dfs(vertex):
        visited.add(vertex)
        rec_stack.add(vertex)

        for neighbor in adj_list[vertex]:
            if neighbor not in visited:
                if dfs(neighbor):
                    return True
            elif neighbor in rec_stack:
                # Found a back edge - cycle detected!
                return True

        # Remove from recursion stack when backtracking
        rec_stack.remove(vertex)
        return False

    # Check all components
    for vertex in adj_list:
        if vertex not in visited:
            if dfs(vertex):
                return True

    return False`,
    testCases: [
      {
        input: '{0: [1], 1: [2], 2: [0]}',
        expectedOutput: 'True',
        isHidden: false,
        description: 'Simple cycle: 0->1->2->0'
      },
      {
        input: '{0: [1, 2], 1: [3], 2: [3], 3: []}',
        expectedOutput: 'False',
        isHidden: false,
        description: 'DAG (no cycle)'
      },
      {
        input: '{0: [1], 1: [2], 2: [3], 3: [1]}',
        expectedOutput: 'True',
        isHidden: false,
        description: 'Cycle: 1->2->3->1'
      },
      {
        input: '{0: [1], 1: [2], 2: [3], 3: []}',
        expectedOutput: 'False',
        isHidden: false,
        description: 'Linear chain (no cycle)'
      }
    ],
    hints: [
      'Use two sets: visited (global) and rec_stack (current path)',
      'A cycle exists if you reach a vertex already in the recursion stack',
      'Remove vertices from rec_stack when backtracking',
      'Different from undirected cycle detection - need recursion stack'
    ]
  },
  {
    id: 'cs201-ex-7-15',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Dijkstra\'s Algorithm - Basic',
    description: 'Implement Dijkstra\'s algorithm to find shortest distances from a source vertex to all other vertices in a weighted graph. Graph is represented as adjacency list where each neighbor is a tuple (vertex, weight).',
    difficulty: 4,
    language: 'python',
    starterCode: `import heapq

def dijkstra(adj_list, start):
    """
    Find shortest distances from start to all vertices.

    Args:
        adj_list: Dict where adj_list[u] = [(v1, w1), (v2, w2), ...]
                  Each tuple (v, w) represents edge from u to v with weight w
        start: Starting vertex

    Returns:
        Dictionary mapping each vertex to its shortest distance from start
    """
    # Your code here
    pass`,
    solution: `import heapq

def dijkstra(adj_list, start):
    """
    Find shortest distances from start to all vertices.

    Args:
        adj_list: Dict where adj_list[u] = [(v1, w1), (v2, w2), ...]
                  Each tuple (v, w) represents edge from u to v with weight w
        start: Starting vertex

    Returns:
        Dictionary mapping each vertex to its shortest distance from start
    """
    # Initialize distances
    distances = {vertex: float('inf') for vertex in adj_list}
    distances[start] = 0

    # Priority queue: (distance, vertex)
    pq = [(0, start)]
    visited = set()

    while pq:
        current_dist, u = heapq.heappop(pq)

        if u in visited:
            continue

        visited.add(u)

        # Relax edges
        for v, weight in adj_list[u]:
            distance = current_dist + weight

            if distance < distances[v]:
                distances[v] = distance
                heapq.heappush(pq, (distance, v))

    return distances`,
    testCases: [
      {
        input: '{0: [(1, 4), (2, 1)], 1: [(3, 1)], 2: [(1, 2), (3, 5)], 3: []}, 0',
        expectedOutput: '{0: 0, 1: 3, 2: 1, 3: 4}',
        isHidden: false,
        description: 'Simple weighted graph'
      },
      {
        input: '{0: [(1, 1), (2, 4)], 1: [(2, 2), (3, 5)], 2: [(3, 1)], 3: []}, 0',
        expectedOutput: '{0: 0, 1: 1, 2: 3, 3: 4}',
        isHidden: false,
        description: 'Multiple paths to vertices'
      },
      {
        input: '{0: [(1, 10)], 1: [], 2: [(3, 1)], 3: []}, 0',
        expectedOutput: '{0: 0, 1: 10, 2: inf, 3: inf}',
        isHidden: false,
        description: 'Disconnected vertices (unreachable)'
      }
    ],
    hints: [
      'Use a priority queue (min-heap) to always process nearest vertex',
      'Initialize all distances to infinity except start (0)',
      'Relax edges: if current_dist + edge_weight < distances[neighbor], update',
      'Mark vertices as visited to avoid reprocessing'
    ]
  },
  {
    id: 'cs201-ex-7-16',
    subjectId: 'cs201',
    topicId: 'cs201-7',
    title: 'Dijkstra\'s Algorithm - Path Reconstruction',
    description: 'Implement Dijkstra\'s algorithm to find the shortest path (not just distance) from source to a target vertex. Return the path as a list of vertices.',
    difficulty: 5,
    language: 'python',
    starterCode: `import heapq

def dijkstra_path(adj_list, start, end):
    """
    Find shortest path from start to end using Dijkstra's algorithm.

    Args:
        adj_list: Dict where adj_list[u] = [(v1, w1), (v2, w2), ...]
        start: Starting vertex
        end: Target vertex

    Returns:
        Tuple (distance, path) where distance is shortest distance
        and path is list of vertices. Return (float('inf'), []) if unreachable.
    """
    # Your code here
    pass`,
    solution: `import heapq

def dijkstra_path(adj_list, start, end):
    """
    Find shortest path from start to end using Dijkstra's algorithm.

    Args:
        adj_list: Dict where adj_list[u] = [(v1, w1), (v2, w2), ...]
        start: Starting vertex
        end: Target vertex

    Returns:
        Tuple (distance, path) where distance is shortest distance
        and path is list of vertices. Return (float('inf'), []) if unreachable.
    """
    distances = {vertex: float('inf') for vertex in adj_list}
    distances[start] = 0
    parent = {start: None}

    pq = [(0, start)]
    visited = set()

    while pq:
        current_dist, u = heapq.heappop(pq)

        if u in visited:
            continue

        visited.add(u)

        # Early termination if we reached the target
        if u == end:
            break

        for v, weight in adj_list[u]:
            distance = current_dist + weight

            if distance < distances[v]:
                distances[v] = distance
                parent[v] = u
                heapq.heappush(pq, (distance, v))

    # Reconstruct path
    if distances[end] == float('inf'):
        return (float('inf'), [])

    path = []
    current = end
    while current is not None:
        path.append(current)
        current = parent.get(current)

    return (distances[end], path[::-1])`,
    testCases: [
      {
        input: '{0: [(1, 4), (2, 1)], 1: [(3, 1)], 2: [(1, 2), (3, 5)], 3: []}, 0, 3',
        expectedOutput: '(4, [0, 2, 1, 3])',
        isHidden: false,
        description: 'Shortest path with distance 4'
      },
      {
        input: '{0: [(1, 1), (2, 4)], 1: [(2, 2), (3, 5)], 2: [(3, 1)], 3: []}, 0, 3',
        expectedOutput: '(4, [0, 1, 2, 3])',
        isHidden: false,
        description: 'Path via multiple vertices'
      },
      {
        input: '{0: [(1, 10)], 1: [], 2: [(3, 1)], 3: []}, 0, 3',
        expectedOutput: '(inf, [])',
        isHidden: false,
        description: 'No path exists (unreachable)'
      },
      {
        input: '{0: [(1, 5), (2, 3)], 1: [(3, 1)], 2: [(1, 1), (3, 6)], 3: []}, 0, 3',
        expectedOutput: '(5, [0, 2, 1, 3])',
        isHidden: false,
        description: 'Complex graph with multiple paths'
      }
    ],
    hints: [
      'Track parent pointers while running Dijkstra\'s algorithm',
      'Update parent when you find a shorter path to a vertex',
      'Reconstruct path by following parent pointers from end to start',
      'Can terminate early when target vertex is visited',
      'Return (inf, []) if target is unreachable'
    ]
  }
];
