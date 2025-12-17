import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'cs406-t2-ex01',
    subjectId: 'cs406',
    topicId: 'cs406-topic-2',
    title: 'Breadth-First Search Implementation',
    difficulty: 2,
    description: `Implement BFS for finding the shortest path in a graph.

Your implementation should:
- Use a queue for frontier management
- Track explored nodes
- Return the path from start to goal
- Handle graphs with cycles`,
    starterCode: `from collections import deque

def bfs(graph, start, goal):
    """
    graph: dict where graph[node] = list of neighbors
    start: starting node
    goal: goal node
    Returns: path from start to goal, or None if no path exists
    """
    # TODO: Implement BFS
    pass

# Example:
# graph = {
#     'A': ['B', 'C'],
#     'B': ['A', 'D', 'E'],
#     'C': ['A', 'F'],
#     'D': ['B'],
#     'E': ['B', 'F'],
#     'F': ['C', 'E']
# }
# print(bfs(graph, 'A', 'F'))  # Should return path like ['A', 'C', 'F']`,
    solution: `from collections import deque

def bfs(graph, start, goal):
    """
    graph: dict where graph[node] = list of neighbors
    start: starting node
    goal: goal node
    Returns: path from start to goal, or None if no path exists
    """
    if start == goal:
        return [start]

    # Queue stores (node, path to that node)
    frontier = deque([(start, [start])])
    explored = set()

    while frontier:
        node, path = frontier.popleft()

        if node in explored:
            continue

        explored.add(node)

        for neighbor in graph.get(node, []):
            if neighbor in explored:
                continue

            new_path = path + [neighbor]

            if neighbor == goal:
                return new_path

            frontier.append((neighbor, new_path))

    return None  # No path found

# Test
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}
print(bfs(graph, 'A', 'F'))  # ['A', 'C', 'F']
print(bfs(graph, 'A', 'D'))  # ['A', 'B', 'D']`,
    testCases: [
      { input: "bfs(graph, 'A', 'F')", isHidden: false, description: 'Test BFS finds shortest path from A to F' },
      { input: "bfs(graph, 'A', 'D')", isHidden: false, description: 'Test BFS finds shortest path from A to D' },
      { input: "bfs(graph, 'A', 'A')", isHidden: false, description: 'Test BFS with start == goal' }
    ],
    hints: [
      'Use a deque (double-ended queue) for efficient frontier management',
      'Track the path to each node, not just the node itself, in the frontier',
      'Use a set to keep track of explored nodes to avoid revisiting them'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t2-ex02',
    subjectId: 'cs406',
    topicId: 'cs406-topic-2',
    title: 'A* Search with Manhattan Distance',
    difficulty: 3,
    description: `Implement A* search for pathfinding on a 2D grid with obstacles.

Your implementation should:
- Use Manhattan distance as heuristic
- Handle obstacles (blocked cells)
- Return the optimal path
- Use a priority queue for the frontier`,
    starterCode: `import heapq

def manhattan_distance(pos1, pos2):
    # Calculate Manhattan distance
    pass

def astar(grid, start, goal):
    """
    grid: 2D list where 0=free, 1=obstacle
    start: (x, y) starting position
    goal: (x, y) goal position
    Returns: list of (x, y) positions in path, or None
    """
    # TODO: Implement A*
    pass

# Example:
# grid = [
#     [0, 0, 0, 0, 0],
#     [0, 1, 1, 1, 0],
#     [0, 0, 0, 0, 0],
#     [0, 1, 1, 1, 0],
#     [0, 0, 0, 0, 0]
# ]
# print(astar(grid, (0, 0), (4, 4)))`,
    solution: `import heapq

def manhattan_distance(pos1, pos2):
    return abs(pos1[0] - pos2[0]) + abs(pos1[1] - pos2[1])

def astar(grid, start, goal):
    """
    grid: 2D list where 0=free, 1=obstacle
    start: (x, y) starting position
    goal: (x, y) goal position
    Returns: list of (x, y) positions in path, or None
    """
    rows, cols = len(grid), len(grid[0])

    # Priority queue: (f_score, g_score, position, path)
    frontier = [(0 + manhattan_distance(start, goal), 0, start, [start])]
    explored = set()

    while frontier:
        f_score, g_score, pos, path = heapq.heappop(frontier)

        if pos == goal:
            return path

        if pos in explored:
            continue

        explored.add(pos)

        # Explore neighbors (up, down, left, right)
        x, y = pos
        for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            nx, ny = x + dx, y + dy

            # Check bounds
            if not (0 <= nx < cols and 0 <= ny < rows):
                continue

            # Check obstacle
            if grid[ny][nx] == 1:
                continue

            if (nx, ny) in explored:
                continue

            new_g = g_score + 1
            new_h = manhattan_distance((nx, ny), goal)
            new_f = new_g + new_h
            new_path = path + [(nx, ny)]

            heapq.heappush(frontier, (new_f, new_g, (nx, ny), new_path))

    return None  # No path found

# Test
grid = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
]
path = astar(grid, (0, 0), (4, 4))
print(path)
print(f"Path length: {len(path) if path else 'No path'}")`  ,
    testCases: [
      { input: 'astar(grid, (0, 0), (4, 4))', isHidden: false, description: 'Test A* finds path in grid with obstacles' },
      { input: 'manhattan_distance((0, 0), (3, 4))', isHidden: false, description: 'Test Manhattan distance calculation' },
      { input: 'astar(grid, (0, 0), (1, 1))', isHidden: false, description: 'Test A* finds short path' }
    ],
    hints: [
      'Manhattan distance is |x1-x2| + |y1-y2|, a common heuristic for grid-based pathfinding',
      'Use a priority queue (heapq) to always expand the node with lowest f = g + h',
      'Remember to check for obstacles and bounds before adding neighbors to the frontier'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t2-ex03',
    subjectId: 'cs406',
    topicId: 'cs406-topic-2',
    title: 'Hill Climbing for 8-Queens',
    difficulty: 3,
    description: `Implement hill climbing to solve the 8-queens problem.

Your implementation should:
- Start with a random configuration
- Use conflicts as the cost function
- Implement steepest-ascent hill climbing
- Detect local minima
- Support random restarts`,
    starterCode: `import random

def count_conflicts(board):
    # Count number of pairs of queens attacking each other
    pass

def get_neighbors(board):
    # Generate all neighbor states (move one queen in its column)
    pass

def hill_climbing(n=8, max_restarts=100):
    # Implement hill climbing with random restarts
    pass`,
    solution: `import random

def count_conflicts(board):
    """Count number of pairs of queens attacking each other."""
    n = len(board)
    conflicts = 0

    for i in range(n):
        for j in range(i + 1, n):
            # Same row
            if board[i] == board[j]:
                conflicts += 1
            # Same diagonal
            if abs(board[i] - board[j]) == abs(i - j):
                conflicts += 1

    return conflicts

def get_neighbors(board):
    """Generate all neighbor states by moving one queen in its column."""
    n = len(board)
    neighbors = []

    for col in range(n):
        for row in range(n):
            if row != board[col]:
                neighbor = board[:]
                neighbor[col] = row
                neighbors.append(neighbor)

    return neighbors

def hill_climbing(n=8, max_restarts=100):
    """Hill climbing with random restarts for n-queens."""

    for restart in range(max_restarts):
        # Random initial state: each queen in random row of its column
        current = [random.randint(0, n - 1) for _ in range(n)]
        current_cost = count_conflicts(current)

        while True:
            if current_cost == 0:
                return current, restart  # Solution found

            # Find best neighbor
            neighbors = get_neighbors(current)
            best_neighbor = None
            best_cost = current_cost

            for neighbor in neighbors:
                cost = count_conflicts(neighbor)
                if cost < best_cost:
                    best_neighbor = neighbor
                    best_cost = cost

            # If no improvement, we're stuck (local minimum)
            if best_neighbor is None:
                break  # Restart

            current = best_neighbor
            current_cost = best_cost

    return None, max_restarts  # Failed to find solution

# Test
solution, restarts = hill_climbing(8, max_restarts=100)
if solution:
    print(f"Solution found after {restarts} restarts:")
    print(solution)
    print(f"Conflicts: {count_conflicts(solution)}")
else:
    print("No solution found")

# Visualize
def print_board(board):
    n = len(board)
    for row in range(n):
        line = ""
        for col in range(n):
            if board[col] == row:
                line += "Q "
            else:
                line += ". "
        print(line)

if solution:
    print("\\nBoard visualization:")
    print_board(solution)`,
    testCases: [
      { input: 'hill_climbing(8, max_restarts=100)', isHidden: false, description: 'Test hill climbing solves 8-queens' },
      { input: 'count_conflicts([0,1,2,3,4,5,6,7])', isHidden: false, description: 'Test conflict counting for diagonal board' },
      { input: 'len(get_neighbors([0,0,0,0,0,0,0,0]))', isHidden: false, description: 'Test neighbor generation produces correct number of states' }
    ],
    hints: [
      'Count conflicts by checking all pairs of queens for row and diagonal attacks',
      'Steepest-ascent means always picking the best neighbor, not just the first improvement',
      'When stuck in a local minimum (no improving neighbors), restart with a new random state'
    ],
    language: 'python'
  }
];
