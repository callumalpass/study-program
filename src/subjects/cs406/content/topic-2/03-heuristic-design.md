---
title: "Heuristic Design"
slug: "heuristic-design"
description: "Techniques for designing effective heuristic functions including relaxed problems, pattern databases, landmarks, and combining multiple heuristics"
---

# Heuristic Design

## Introduction

The effectiveness of informed search algorithms like A* depends critically on the quality of the heuristic function. A well-designed heuristic can reduce the search space from millions of nodes to just hundreds, making previously intractable problems solvable in seconds. However, designing effective heuristics is both an art and a science.

A heuristic function $h(n)$ estimates the cost from state $n$ to the nearest goal. For A* to guarantee optimality, the heuristic must be **admissible** (never overestimates) and ideally **consistent** (satisfies the triangle inequality). But admissibility alone isn't enough—we want heuristics that are as close to the true cost as possible without overestimating.

This exploration examines systematic techniques for designing high-quality heuristics: relaxed problems, pattern databases, landmark heuristics, and methods for combining multiple heuristics to create even stronger estimates.

## Relaxed Problem Heuristics

The most common approach to heuristic design is solving a **relaxed version** of the problem—one where we remove constraints to make it easier to solve.

### Concept

A relaxed problem is created by removing restrictions from the original problem. The cost of an optimal solution to the relaxed problem is admissible because any solution to the original problem is also a solution to the relaxed version (with possibly lower cost due to fewer constraints).

**Example: 8-Puzzle**

Original problem: Move tiles to adjacent empty square to reach goal configuration.

Relaxed problems:
1. **Tiles can move anywhere**: Each tile can jump to its goal position directly. Cost = number of misplaced tiles.
2. **Tiles can move to adjacent squares**: Each tile slides to goal position. Cost = Manhattan distance (sum of horizontal + vertical distances).

### Implementation

```python
def misplaced_tiles(state, goal):
    """Count tiles not in goal position (relaxed: tiles can teleport)"""
    return sum(1 for i in range(len(state))
               if state[i] != 0 and state[i] != goal[i])

def manhattan_distance(state, goal):
    """Sum of distances for each tile to reach goal (relaxed: tiles can slide through each other)"""
    distance = 0
    size = int(len(state) ** 0.5)

    for i, tile in enumerate(state):
        if tile == 0:  # Skip blank
            continue

        # Current position
        curr_row, curr_col = i // size, i % size

        # Goal position
        goal_idx = goal.index(tile)
        goal_row, goal_col = goal_idx // size, goal_idx % size

        # Manhattan distance
        distance += abs(curr_row - goal_row) + abs(curr_col - curr_col)

    return distance
```

### Properties

Manhattan distance dominates misplaced tiles (always ≥) because moving a tile to its goal requires at least 1 move, but potentially many:

- Misplaced: counts each wrong tile as 1
- Manhattan: counts actual minimum moves needed

**Domination**: If $h_2(n) \geq h_1(n)$ for all $n$ and both are admissible, then $h_2$ **dominates** $h_1$. A* will expand fewer nodes using $h_2$.

## Pattern Databases

For complex problems, pattern databases precompute exact costs for subproblems and use these as heuristics.

### Concept

A **pattern database** stores the exact cost to solve a subset of the problem. For example, in the 15-puzzle, we might create a database for tiles 1-6, ignoring tiles 7-15 and the blank.

**Construction**:
1. Define pattern (subset of problem variables)
2. Generate all possible states of the pattern
3. Backward BFS from goal to fill database with exact costs
4. Store in hash table or array

**Lookup**: Map current state to pattern (ignore non-pattern variables), retrieve cost from database.

### 15-Puzzle Example

```python
def build_pattern_database(pattern_tiles, goal):
    """Build database for subset of tiles (e.g., tiles 1-6)"""
    database = {}

    # Abstract goal state (only pattern tiles matter)
    abstract_goal = abstract_state(goal, pattern_tiles)

    # Backward BFS from goal
    queue = deque([(abstract_goal, 0)])
    database[abstract_goal] = 0

    while queue:
        state, cost = queue.popleft()

        for action in get_actions(state):
            next_state = apply_action(state, action)

            if next_state not in database:
                database[next_state] = cost + 1
                queue.append((next_state, cost + 1))

    return database

def abstract_state(state, pattern_tiles):
    """Convert state to pattern (only keep pattern tiles, others = 'don't care')"""
    return tuple(tile if tile in pattern_tiles else -1
                 for tile in state)

def pattern_heuristic(state, database, pattern_tiles):
    """Look up cost in precomputed database"""
    abstract = abstract_state(state, pattern_tiles)
    return database.get(abstract, 0)
```

### Additive Pattern Databases

If pattern sets are **disjoint** (no overlapping tiles), their costs can be summed for a stronger heuristic:

```python
def additive_pattern_heuristic(state, db1, pattern1, db2, pattern2):
    """Sum costs from multiple disjoint pattern databases"""
    h1 = pattern_heuristic(state, db1, pattern1)
    h2 = pattern_heuristic(state, db2, pattern2)
    return h1 + h2  # Admissible because patterns are disjoint

# Example: 15-puzzle with two patterns
# Pattern 1: tiles 1-7
# Pattern 2: tiles 8-15
# Still admissible to sum because no tile appears in both
```

**Trade-off**: Larger patterns = more accurate but exponentially more memory. For 15-puzzle:
- 6 tiles: ~10^6 entries
- 8 tiles: ~10^8 entries
- 15 tiles: ~10^13 entries (too large!)

## Landmark Heuristics

Landmarks identify key states that must be passed through on any solution path.

### Concept

A **landmark** is a state or feature that must be achieved to reach the goal. The cost to achieve the landmark is a lower bound on the cost to reach the goal.

**Example: Blocks World**

Goal: Block A on B, B on C, C on table

Landmarks:
1. C must be on table (precondition for B on C)
2. B must be on C (precondition for A on B)
3. A must be on B (goal)

Heuristic: Sum costs to achieve each landmark (admissible if properly accounted for ordering).

### Planning Domains

```python
def landmark_heuristic(state, goal, landmarks):
    """Estimate cost based on unachieved landmarks"""
    cost = 0

    for landmark in landmarks:
        if not satisfied(state, landmark):
            cost += estimate_cost(state, landmark)

    return cost

def find_landmarks(goal):
    """Identify necessary conditions for goal (simplified)"""
    landmarks = []

    # Work backward from goal
    for condition in goal.conditions:
        # Find prerequisites
        prerequisites = get_prerequisites(condition)
        landmarks.extend(prerequisites)

    return landmarks
```

## Combining Heuristics

When we have multiple admissible heuristics, we can combine them to create stronger estimates.

### Maximum of Heuristics

The simplest combination: take the maximum.

```python
def max_heuristic(state, goal):
    """Take maximum of multiple admissible heuristics"""
    h1 = misplaced_tiles(state, goal)
    h2 = manhattan_distance(state, goal)
    h3 = linear_conflict(state, goal)

    return max(h1, h2, h3)
```

**Property**: If $h_1, h_2, ..., h_n$ are all admissible, then $h(n) = \max(h_1(n), ..., h_n(n))$ is also admissible (and dominates each individual heuristic).

### Linear Conflict

An advanced 8/15-puzzle heuristic that adds conflicts to Manhattan distance:

```python
def linear_conflict(state, goal):
    """Manhattan distance + linear conflicts"""
    size = int(len(state) ** 0.5)
    conflicts = 0

    # Check each row
    for row in range(size):
        row_tiles = [state[row*size + col] for col in range(size)]
        goal_row = [goal[row*size + col] for col in range(size)]

        # Count tiles that are in correct row but blocking each other
        for i in range(size):
            for j in range(i+1, size):
                ti, tj = row_tiles[i], row_tiles[j]

                # Both tiles belong in this row
                if ti in goal_row and tj in goal_row:
                    gi, gj = goal_row.index(ti), goal_row.index(tj)

                    # They're in reverse order (conflict)
                    if gi > gj:
                        conflicts += 2  # Each needs to move out and back

    # Repeat for columns...

    return manhattan_distance(state, goal) + conflicts
```

### Weighted Sum (Inadmissible but Practical)

For applications where optimality isn't critical, weighted combinations can be effective:

```python
def weighted_heuristic(state, goal, weights=[1.0, 2.0, 0.5]):
    """Weighted sum (may be inadmissible!)"""
    h1 = misplaced_tiles(state, goal)
    h2 = manhattan_distance(state, goal)
    h3 = pattern_heuristic(state, db, pattern)

    return weights[0]*h1 + weights[1]*h2 + weights[2]*h3
```

**Note**: This can overestimate (inadmissible), so A* may not find optimal solutions. However, it often finds good solutions much faster.

## Heuristic Quality Metrics

### Effective Branching Factor

Measure how well a heuristic prunes the search space:

$$b^* = \frac{N^{1/d}}{1 + \frac{1}{2d} + \frac{1}{3d^2} + ...} \approx N^{1/d}$$

where $N$ = nodes expanded, $d$ = solution depth.

Lower $b^*$ = better heuristic. For 8-puzzle:
- No heuristic: $b^* \approx 2.79$
- Misplaced tiles: $b^* \approx 1.79$
- Manhattan: $b^* \approx 1.42$
- Manhattan + conflicts: $b^* \approx 1.28$

### Informedness

Heuristic $h_2$ is **more informed** than $h_1$ if $h_2(n) \geq h_1(n)$ for all $n$. More informed heuristics expand fewer nodes.

## Key Takeaways

1. **Relaxed problems** provide admissible heuristics by removing constraints—the easier the relaxed problem, the weaker the heuristic
2. **Pattern databases** precompute exact costs for subproblems, trading memory for accuracy
3. **Disjoint pattern databases** can be summed for stronger additive heuristics
4. **Landmarks** identify necessary intermediate goals, providing lower bounds on solution cost
5. **Taking the maximum** of multiple admissible heuristics yields an admissible heuristic that dominates all inputs
6. **Better heuristics** reduce effective branching factor, sometimes transforming intractable problems into solvable ones
7. **Trade-offs exist** between computation time, memory usage, and heuristic accuracy

## Conclusion

Effective heuristics make the difference between tractable and intractable problems. A good heuristic can reduce A* search from exploring millions of nodes to just hundreds. Systematic design techniques—relaxed problems, pattern databases, landmarks, and combinations—enable creating admissible, efficient, and informative heuristics for diverse domains. The key is understanding the problem structure deeply enough to identify what makes states close to or far from the goal.
