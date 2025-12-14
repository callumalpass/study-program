import { CodingExercise } from '../../../core/types';

export const math102Exercises: CodingExercise[] = [
  {
    id: 'math102-e1',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Combinations Calculator',
    description: 'Implement a function that calculates the binomial coefficient C(n,k), also known as "n choose k". This represents the number of ways to choose k items from n items without regard to order. Use the formula C(n,k) = n! / (k! × (n-k)!), but optimize to avoid computing large factorials by canceling terms.',
    starterCode: 'def combinations(n, k):\n    """Calculate C(n,k) = n! / (k! * (n-k)!)\n    \n    Args:\n        n: Total number of items\n        k: Number of items to choose\n        \n    Returns:\n        Number of ways to choose k items from n items\n    """\n    # Your code here\n    pass',
    solution: 'def combinations(n, k):\n    """Calculate C(n,k) = n! / (k! * (n-k)!)\n    \n    Args:\n        n: Total number of items\n        k: Number of items to choose\n        \n    Returns:\n        Number of ways to choose k items from n items\n    """\n    if k > n or k < 0:\n        return 0\n    if k == 0 or k == n:\n        return 1\n    \n    # Optimize by using smaller k\n    k = min(k, n - k)\n    \n    result = 1\n    for i in range(k):\n        result = result * (n - i) // (i + 1)\n    \n    return result',
    testCases: [
      {
        input: '5, 2',
        expectedOutput: '10',
        isHidden: false,
        description: 'C(5,2) should return 10'
      },
      {
        input: '10, 3',
        expectedOutput: '120',
        isHidden: false,
        description: 'C(10,3) should return 120'
      },
      {
        input: '6, 0',
        expectedOutput: '1',
        isHidden: false,
        description: 'C(6,0) should return 1 (choosing nothing)'
      },
      {
        input: '8, 8',
        expectedOutput: '1',
        isHidden: true,
        description: 'C(8,8) should return 1 (choosing everything)'
      },
      {
        input: '15, 7',
        expectedOutput: '6435',
        isHidden: true,
        description: 'C(15,7) should return 6435 (larger case)'
      }
    ],
    hints: [
      'Remember that C(n,k) = C(n, n-k), so you can optimize by using the smaller value',
      'To avoid overflow, multiply and divide alternately rather than computing factorials separately',
      'Handle edge cases: C(n,0) = 1, C(n,n) = 1, and C(n,k) = 0 if k > n'
    ],
    language: 'python'
  },
  {
    id: 'math102-e2',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Fibonacci with Memoization',
    description: 'Implement the Fibonacci sequence using memoization to avoid redundant calculations. The Fibonacci recurrence is F(n) = F(n-1) + F(n-2) with base cases F(0) = 0 and F(1) = 1. Without memoization, this has exponential time complexity. With memoization, achieve O(n) time complexity.',
    starterCode: 'def fibonacci(n, memo=None):\n    """Calculate the nth Fibonacci number using memoization.\n    \n    Args:\n        n: The index in the Fibonacci sequence\n        memo: Dictionary for memoization (default: None)\n        \n    Returns:\n        The nth Fibonacci number\n    """\n    # Your code here\n    pass',
    solution: 'def fibonacci(n, memo=None):\n    """Calculate the nth Fibonacci number using memoization.\n    \n    Args:\n        n: The index in the Fibonacci sequence\n        memo: Dictionary for memoization (default: None)\n        \n    Returns:\n        The nth Fibonacci number\n    """\n    if memo is None:\n        memo = {}\n    \n    if n in memo:\n        return memo[n]\n    \n    if n <= 1:\n        return n\n    \n    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)\n    return memo[n]',
    testCases: [
      {
        input: '0',
        expectedOutput: '0',
        isHidden: false,
        description: 'F(0) should return 0'
      },
      {
        input: '1',
        expectedOutput: '1',
        isHidden: false,
        description: 'F(1) should return 1'
      },
      {
        input: '10',
        expectedOutput: '55',
        isHidden: false,
        description: 'F(10) should return 55'
      },
      {
        input: '20',
        expectedOutput: '6765',
        isHidden: true,
        description: 'F(20) should return 6765'
      },
      {
        input: '30',
        expectedOutput: '832040',
        isHidden: true,
        description: 'F(30) should efficiently handle larger inputs'
      }
    ],
    hints: [
      'Initialize the memoization dictionary if it is None',
      'Check if the result for n is already in the memo dictionary before computing',
      'Store the computed result in memo before returning it',
      'The base cases are F(0) = 0 and F(1) = 1'
    ],
    language: 'python'
  },
  {
    id: 'math102-e3',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Graph Representation',
    description: 'Implement a function to convert an edge list representation of a graph to an adjacency list representation. An edge list is a list of tuples (u, v) representing edges. An adjacency list is a dictionary where each vertex maps to a list of its neighbors. Handle both directed and undirected graphs.',
    starterCode: 'def edge_list_to_adjacency_list(edges, directed=False):\n    """Convert edge list to adjacency list representation.\n    \n    Args:\n        edges: List of tuples (u, v) representing edges\n        directed: Boolean indicating if graph is directed\n        \n    Returns:\n        Dictionary mapping each vertex to list of neighbors\n    """\n    # Your code here\n    pass',
    solution: 'def edge_list_to_adjacency_list(edges, directed=False):\n    """Convert edge list to adjacency list representation.\n    \n    Args:\n        edges: List of tuples (u, v) representing edges\n        directed: Boolean indicating if graph is directed\n        \n    Returns:\n        Dictionary mapping each vertex to list of neighbors\n    """\n    adj_list = {}\n    \n    # Initialize all vertices\n    for u, v in edges:\n        if u not in adj_list:\n            adj_list[u] = []\n        if v not in adj_list:\n            adj_list[v] = []\n    \n    # Add edges\n    for u, v in edges:\n        adj_list[u].append(v)\n        if not directed:\n            adj_list[v].append(u)\n    \n    return adj_list',
    testCases: [
      {
        input: '[(0, 1), (1, 2), (2, 0)], False',
        expectedOutput: '{0: [1, 2], 1: [0, 2], 2: [1, 0]}',
        isHidden: false,
        description: 'Undirected triangle graph'
      },
      {
        input: '[(0, 1), (1, 2), (2, 0)], True',
        expectedOutput: '{0: [1], 1: [2], 2: [0]}',
        isHidden: false,
        description: 'Directed cycle graph'
      },
      {
        input: '[(\'A\', \'B\'), (\'B\', \'C\'), (\'A\', \'C\')], False',
        expectedOutput: '{\'A\': [\'B\', \'C\'], \'B\': [\'A\', \'C\'], \'C\': [\'B\', \'A\']}',
        isHidden: true,
        description: 'Graph with string vertices'
      },
      {
        input: '[], False',
        expectedOutput: '{}',
        isHidden: true,
        description: 'Empty graph'
      }
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
    id: 'math102-e4',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Breadth-First Search',
    description: 'Implement the Breadth-First Search (BFS) algorithm to find the shortest path between two vertices in an unweighted graph. BFS explores vertices level by level using a queue. Return the path as a list of vertices from start to end, or None if no path exists.',
    starterCode: 'from collections import deque\n\ndef bfs_shortest_path(graph, start, end):\n    """Find shortest path using BFS.\n    \n    Args:\n        graph: Adjacency list representation (dict)\n        start: Starting vertex\n        end: Ending vertex\n        \n    Returns:\n        List of vertices in path from start to end, or None\n    """\n    # Your code here\n    pass',
    solution: 'from collections import deque\n\ndef bfs_shortest_path(graph, start, end):\n    """Find shortest path using BFS.\n    \n    Args:\n        graph: Adjacency list representation (dict)\n        start: Starting vertex\n        end: Ending vertex\n        \n    Returns:\n        List of vertices in path from start to end, or None\n    """\n    if start not in graph or end not in graph:\n        return None\n    \n    if start == end:\n        return [start]\n    \n    queue = deque([start])\n    visited = {start}\n    parent = {start: None}\n    \n    while queue:\n        current = queue.popleft()\n        \n        if current == end:\n            # Reconstruct path\n            path = []\n            while current is not None:\n                path.append(current)\n                current = parent[current]\n            return path[::-1]\n        \n        for neighbor in graph[current]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                parent[neighbor] = current\n                queue.append(neighbor)\n    \n    return None',
    testCases: [
      {
        input: '{0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2]}, 0, 3',
        expectedOutput: '[0, 1, 3]',
        isHidden: false,
        description: 'Find path in simple graph'
      },
      {
        input: '{0: [1], 1: [2], 2: [3], 3: []}, 0, 3',
        expectedOutput: '[0, 1, 2, 3]',
        isHidden: false,
        description: 'Find path in linear graph'
      },
      {
        input: '{0: [1], 1: [0], 2: [3], 3: [2]}, 0, 3',
        expectedOutput: 'None',
        isHidden: true,
        description: 'No path exists between disconnected components'
      },
      {
        input: '{0: [1, 2], 1: [0, 2], 2: [0, 1]}, 0, 0',
        expectedOutput: '[0]',
        isHidden: true,
        description: 'Start and end are the same'
      }
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
    id: 'math102-e5',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'Euclidean Algorithm',
    description: 'Implement the Euclidean algorithm to find the greatest common divisor (GCD) of two integers. The algorithm is based on the principle that gcd(a,b) = gcd(b, a mod b). Continue until the remainder is 0. Also implement the extended version to find coefficients x and y such that ax + by = gcd(a,b).',
    starterCode: 'def gcd(a, b):\n    """Calculate GCD using Euclidean algorithm.\n    \n    Args:\n        a: First integer\n        b: Second integer\n        \n    Returns:\n        Greatest common divisor of a and b\n    """\n    # Your code here\n    pass\n\ndef extended_gcd(a, b):\n    """Extended Euclidean algorithm.\n    \n    Args:\n        a: First integer\n        b: Second integer\n        \n    Returns:\n        Tuple (gcd, x, y) where ax + by = gcd\n    """\n    # Your code here\n    pass',
    solution: 'def gcd(a, b):\n    """Calculate GCD using Euclidean algorithm.\n    \n    Args:\n        a: First integer\n        b: Second integer\n        \n    Returns:\n        Greatest common divisor of a and b\n    """\n    while b != 0:\n        a, b = b, a % b\n    return abs(a)\n\ndef extended_gcd(a, b):\n    """Extended Euclidean algorithm.\n    \n    Args:\n        a: First integer\n        b: Second integer\n        \n    Returns:\n        Tuple (gcd, x, y) where ax + by = gcd\n    """\n    if b == 0:\n        return abs(a), 1 if a >= 0 else -1, 0\n    \n    x1, y1 = 1, 0\n    x2, y2 = 0, 1\n    \n    while b != 0:\n        q = a // b\n        a, b = b, a % b\n        x1, x2 = x2, x1 - q * x2\n        y1, y2 = y2, y1 - q * y2\n    \n    return abs(a), x1 if a >= 0 else -x1, y1 if a >= 0 else -y1',
    testCases: [
      {
        input: '48, 18',
        expectedOutput: '6',
        isHidden: false,
        description: 'gcd(48, 18) should return 6'
      },
      {
        input: '100, 35',
        expectedOutput: '5',
        isHidden: false,
        description: 'gcd(100, 35) should return 5'
      },
      {
        input: '17, 13',
        expectedOutput: '1',
        isHidden: true,
        description: 'gcd of coprime numbers should return 1'
      },
      {
        input: '0, 5',
        expectedOutput: '5',
        isHidden: true,
        description: 'gcd(0, n) should return n'
      }
    ],
    hints: [
      'For the basic GCD, repeatedly replace (a,b) with (b, a mod b) until b is 0',
      'The extended version tracks coefficients that combine to give the GCD',
      'Handle the base case when b equals 0',
      'Remember to handle negative numbers by taking absolute values'
    ],
    language: 'python'
  }
];
