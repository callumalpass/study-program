# Common Graph Problems

Graph problems are frequently asked in coding interviews and competitive programming. This section covers essential problems and patterns that build on the fundamentals covered earlier.

## Problem 1: Number of Islands

Count connected components in a 2D grid:

```python
def num_islands(grid):
    """Count number of islands (connected '1's)."""
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'  # Mark visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)

    return count
```

**Time**: O(rows × cols), **Space**: O(rows × cols) for recursion

## Problem 2: Clone Graph

Create a deep copy of a graph:

```python
def clone_graph(node):
    """Clone an undirected graph."""
    if not node:
        return None

    cloned = {}

    def dfs(n):
        if n in cloned:
            return cloned[n]

        clone = Node(n.val)
        cloned[n] = clone

        for neighbor in n.neighbors:
            clone.neighbors.append(dfs(neighbor))

        return clone

    return dfs(node)
```

## Problem 3: Course Schedule (Cycle Detection)

Determine if all courses can be finished:

```python
def can_finish(num_courses, prerequisites):
    """Check if course schedule is possible (no cycle in dependencies)."""
    graph = {i: [] for i in range(num_courses)}
    for course, prereq in prerequisites:
        graph[prereq].append(course)

    # 0: unvisited, 1: visiting, 2: visited
    state = [0] * num_courses

    def has_cycle(course):
        if state[course] == 1:
            return True  # Back edge
        if state[course] == 2:
            return False  # Already processed

        state[course] = 1
        for next_course in graph[course]:
            if has_cycle(next_course):
                return True
        state[course] = 2
        return False

    for course in range(num_courses):
        if has_cycle(course):
            return False

    return True
```

## Problem 4: Word Ladder

Find shortest transformation sequence:

```python
from collections import deque

def ladder_length(begin_word, end_word, word_list):
    """Find length of shortest transformation sequence."""
    word_set = set(word_list)
    if end_word not in word_set:
        return 0

    queue = deque([(begin_word, 1)])
    visited = {begin_word}

    while queue:
        word, length = queue.popleft()

        if word == end_word:
            return length

        # Try all single-character changes
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                new_word = word[:i] + c + word[i+1:]
                if new_word in word_set and new_word not in visited:
                    visited.add(new_word)
                    queue.append((new_word, length + 1))

    return 0

# "hit" -> "hot" -> "dot" -> "dog" -> "cog" = 5
```

## Problem 5: Pacific Atlantic Water Flow

Find cells that can flow to both oceans:

```python
def pacific_atlantic(heights):
    """Find cells that can reach both Pacific and Atlantic oceans."""
    if not heights:
        return []

    rows, cols = len(heights), len(heights[0])
    pacific = set()
    atlantic = set()

    def dfs(r, c, reachable, prev_height):
        if (r < 0 or r >= rows or c < 0 or c >= cols or
            (r, c) in reachable or heights[r][c] < prev_height):
            return

        reachable.add((r, c))
        for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            dfs(r + dr, c + dc, reachable, heights[r][c])

    # Start from ocean edges
    for c in range(cols):
        dfs(0, c, pacific, 0)           # Top edge (Pacific)
        dfs(rows - 1, c, atlantic, 0)   # Bottom edge (Atlantic)

    for r in range(rows):
        dfs(r, 0, pacific, 0)           # Left edge (Pacific)
        dfs(r, cols - 1, atlantic, 0)   # Right edge (Atlantic)

    return list(pacific & atlantic)
```

## Problem 6: Network Delay Time

Find time for signal to reach all nodes (Dijkstra):

```python
import heapq

def network_delay_time(times, n, k):
    """
    Find time for signal from k to reach all nodes.
    times: [[u, v, w], ...] edges with weights
    """
    graph = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        graph[u].append((v, w))

    dist = {i: float('inf') for i in range(1, n + 1)}
    dist[k] = 0
    pq = [(0, k)]

    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue

        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))

    max_dist = max(dist.values())
    return max_dist if max_dist < float('inf') else -1
```

## Problem 7: Redundant Connection

Find edge that creates cycle in a tree:

```python
def find_redundant_connection(edges):
    """Find the edge that creates a cycle."""
    parent = list(range(len(edges) + 1))

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    for u, v in edges:
        pu, pv = find(u), find(v)
        if pu == pv:
            return [u, v]  # This edge creates cycle
        parent[pu] = pv

    return []
```

## Problem 8: Alien Dictionary

Derive order of characters from sorted words:

```python
def alien_order(words):
    """Derive character order from sorted alien words."""
    # Build graph from adjacent word comparisons
    graph = {c: set() for word in words for c in word}

    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        min_len = min(len(w1), len(w2))

        # Check for invalid case: prefix comes after longer word
        if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:
            return ""

        for j in range(min_len):
            if w1[j] != w2[j]:
                graph[w1[j]].add(w2[j])
                break

    # Topological sort
    result = []
    state = {}  # 0: unvisited, 1: visiting, 2: visited

    def dfs(c):
        if c in state:
            return state[c] == 2
        state[c] = 1
        for neighbor in graph[c]:
            if not dfs(neighbor):
                return False
        state[c] = 2
        result.append(c)
        return True

    for c in graph:
        if c not in state:
            if not dfs(c):
                return ""

    return ''.join(reversed(result))
```

## Problem 9: Bipartite Graph Check

Determine if graph can be 2-colored:

```python
def is_bipartite(graph):
    """Check if graph is bipartite using BFS coloring."""
    n = len(graph)
    color = [-1] * n

    for start in range(n):
        if color[start] != -1:
            continue

        queue = [start]
        color[start] = 0

        while queue:
            node = queue.pop(0)
            for neighbor in graph[node]:
                if color[neighbor] == -1:
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    return False

    return True
```

## Problem 10: Cheapest Flights Within K Stops

Modified Dijkstra with stop constraint:

```python
def find_cheapest_price(n, flights, src, dst, k):
    """Find cheapest flight with at most k stops."""
    graph = {i: [] for i in range(n)}
    for u, v, w in flights:
        graph[u].append((v, w))

    # (cost, stops, node)
    pq = [(0, 0, src)]
    best = {}  # (node, stops) -> min_cost

    while pq:
        cost, stops, node = heapq.heappop(pq)

        if node == dst:
            return cost

        if stops > k:
            continue

        if (node, stops) in best and best[(node, stops)] <= cost:
            continue
        best[(node, stops)] = cost

        for neighbor, price in graph[node]:
            heapq.heappush(pq, (cost + price, stops + 1, neighbor))

    return -1
```

## Summary

Graph problems require recognizing patterns: use DFS for connectivity and cycle detection, BFS for shortest paths in unweighted graphs, Dijkstra for weighted graphs, topological sort for dependencies, and Union-Find for connectivity queries. Practice identifying which technique applies to each problem.
