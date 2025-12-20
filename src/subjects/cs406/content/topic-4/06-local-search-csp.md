---
title: "Local Search for CSP"
slug: "local-search-csp"
description: "Exploration of local search methods for CSP including min-conflicts, random restarts, and simulated annealing"
---

# Local Search for CSP

## Introduction

While backtracking search systematically explores the space of partial assignments, local search takes a fundamentally different approach: start with a complete assignment (possibly violating constraints) and iteratively improve it by making local changes. This approach trades completeness for efficiency - local search may not find a solution even if one exists, but it can be remarkably effective on large problems where backtracking becomes impractical.

Local search is particularly well-suited for CSPs where finding any solution is acceptable (rather than the optimal solution) and where the problem size makes systematic search prohibitive. It's also naturally parallelizable and can be easily adapted to optimization variants of CSPs.

## The Min-Conflicts Algorithm

The min-conflicts algorithm is the most successful local search method for CSPs. It iteratively selects a variable that violates constraints and reassigns it to the value that minimizes the number of conflicts.

### Algorithm Description

1. Start with a complete assignment (random or heuristic)
2. While conflicts exist and not at max steps:
   - Select a variable involved in a conflict
   - Assign it the value that minimizes conflicts with other variables
   - If multiple values tie, choose randomly
3. Return solution if found, failure otherwise

### Implementation

```python
import random

def min_conflicts(csp, max_steps=100000):
    """
    Min-conflicts algorithm for CSP

    Args:
        csp: CSP instance
        max_steps: Maximum iterations before giving up

    Returns:
        Complete assignment if solution found, None otherwise
    """
    # Initialize with random complete assignment
    current = {var: random.choice(csp.domains[var])
               for var in csp.variables}

    for step in range(max_steps):
        # Find variables in conflict
        conflicted = get_conflicted_variables(current, csp)

        # No conflicts - solution found!
        if not conflicted:
            return current

        # Choose random conflicted variable
        var = random.choice(conflicted)

        # Find value that minimizes conflicts
        value = min_conflicts_value(var, current, csp)

        # Update assignment
        current[var] = value

    # Failed to find solution
    return None


def get_conflicted_variables(assignment, csp):
    """Return list of variables involved in constraint violations"""
    conflicted = []

    for var in csp.variables:
        for neighbor in csp.neighbors[var]:
            if not csp.constraints(var, assignment[var],
                                  neighbor, assignment[neighbor]):
                conflicted.append(var)
                break  # Only add once per variable

    return conflicted


def min_conflicts_value(var, assignment, csp):
    """
    Return value for var that minimizes conflicts

    Args:
        var: Variable to reassign
        assignment: Current complete assignment
        csp: CSP instance

    Returns:
        Value that minimizes conflicts
    """
    def count_conflicts(value):
        """Count conflicts if var assigned to value"""
        conflicts = 0
        for neighbor in csp.neighbors[var]:
            if not csp.constraints(var, value,
                                  neighbor, assignment[neighbor]):
                conflicts += 1
        return conflicts

    # Return value with minimum conflicts
    return min(csp.domains[var], key=count_conflicts)
```

### Example: N-Queens

Min-conflicts excels at the N-Queens problem:

```python
# Initial random assignment (one queen per column)
# Column: 1  2  3  4  5  6  7  8
# Row:    3  7  2  8  5  1  4  6
# Conflicts: Queen in column 3 conflicts with columns 1, 7

# Iteration 1: Fix column 3
# Try each row for column 3:
#   Row 1: 2 conflicts
#   Row 2: 1 conflict   (current)
#   Row 3: 3 conflicts
#   Row 4: 2 conflicts
#   Row 5: 2 conflicts
#   Row 6: 1 conflict   (min)
#   Row 7: 2 conflicts
#   Row 8: 3 conflicts
# Move queen in column 3 to row 6

# Continue until no conflicts remain
```

For the million-queens problem, min-conflicts typically finds a solution in about 50 steps, taking just seconds - while backtracking would take years!

## Why Min-Conflicts Works

The effectiveness of min-conflicts on many CSPs can be explained by the structure of the search space:

1. **Plateau Navigation**: The algorithm can traverse flat regions where many assignments have the same number of conflicts
2. **Greedy Descent**: Each step reduces or maintains conflicts, generally moving toward solutions
3. **Randomization**: Random tie-breaking and variable selection help escape local optima

## Random Restarts

To address the incompleteness of local search, we can use random restarts:

```python
def min_conflicts_with_restarts(csp, max_steps=10000, max_restarts=100):
    """
    Min-conflicts with random restarts

    Args:
        csp: CSP instance
        max_steps: Steps per attempt
        max_restarts: Number of restarts before giving up

    Returns:
        Solution if found, None otherwise
    """
    for restart in range(max_restarts):
        result = min_conflicts(csp, max_steps)
        if result is not None:
            return result

    return None
```

This hybrid approach combines the efficiency of local search with increased robustness:
- Each restart explores a different region of the search space
- Successful on problems where solutions are plentiful but local optima exist
- Probability of finding solution increases with number of restarts

### Restart Strategies

Different restart strategies can be employed:

**Fixed restarts**: Same number of steps per restart
**Geometric restarts**: Increase steps exponentially (100, 200, 400, 800...)
**Randomized restarts**: Vary steps randomly

```python
def geometric_restarts(csp, initial_steps=100, multiplier=2, max_restarts=20):
    """Geometric restart strategy"""
    steps = initial_steps

    for restart in range(max_restarts):
        result = min_conflicts(csp, steps)
        if result is not None:
            return result
        steps *= multiplier

    return None
```

## Simulated Annealing for CSP

Simulated annealing can be adapted for CSPs to escape local optima by occasionally accepting worse moves:

```python
import math
import random

def simulated_annealing_csp(csp, initial_temp=100, cooling_rate=0.95, max_steps=10000):
    """
    Simulated annealing for CSP

    Args:
        csp: CSP instance
        initial_temp: Starting temperature
        cooling_rate: Temperature decay factor (0-1)
        max_steps: Maximum iterations

    Returns:
        Best assignment found
    """
    # Random initial assignment
    current = {var: random.choice(csp.domains[var])
               for var in csp.variables}
    current_conflicts = count_total_conflicts(current, csp)

    best = current.copy()
    best_conflicts = current_conflicts

    temperature = initial_temp

    for step in range(max_steps):
        if current_conflicts == 0:
            return current

        # Choose random variable
        var = random.choice(csp.variables)

        # Choose random value
        new_value = random.choice(csp.domains[var])

        # Calculate conflict delta
        old_value = current[var]
        current[var] = new_value
        new_conflicts = count_total_conflicts(current, csp)
        delta = new_conflicts - current_conflicts

        # Accept if better or with probability based on temperature
        if delta <= 0 or random.random() < math.exp(-delta / temperature):
            current_conflicts = new_conflicts

            # Update best if improved
            if current_conflicts < best_conflicts:
                best = current.copy()
                best_conflicts = current_conflicts
        else:
            # Reject move
            current[var] = old_value

        # Cool down
        temperature *= cooling_rate

    return best


def count_total_conflicts(assignment, csp):
    """Count total number of constraint violations"""
    conflicts = 0
    for var in csp.variables:
        for neighbor in csp.neighbors[var]:
            if not csp.constraints(var, assignment[var],
                                  neighbor, assignment[neighbor]):
                conflicts += 1
    return conflicts // 2  # Each conflict counted twice
```

## Tabu Search for CSP

Tabu search maintains a "tabu list" of recent moves to avoid cycling:

```python
def tabu_search_csp(csp, tabu_size=100, max_steps=10000):
    """
    Tabu search for CSP

    Args:
        csp: CSP instance
        tabu_size: Size of tabu list
        max_steps: Maximum iterations

    Returns:
        Best assignment found
    """
    current = {var: random.choice(csp.domains[var])
               for var in csp.variables}

    tabu_list = []  # List of recent (var, value) moves

    for step in range(max_steps):
        conflicted = get_conflicted_variables(current, csp)

        if not conflicted:
            return current

        # Find best non-tabu move
        best_var = None
        best_value = None
        best_conflicts = float('inf')

        for var in conflicted:
            for value in csp.domains[var]:
                if (var, value) not in tabu_list:
                    current[var] = value
                    conflicts = len(get_conflicted_variables(current, csp))

                    if conflicts < best_conflicts:
                        best_conflicts = conflicts
                        best_var = var
                        best_value = value

                    # Restore
                    current[var] = assignment[var]

        # Make best move
        current[best_var] = best_value
        tabu_list.append((best_var, best_value))

        # Maintain tabu list size
        if len(tabu_list) > tabu_size:
            tabu_list.pop(0)

    return current
```

## Comparison: Local Search vs. Backtracking

| Aspect | Backtracking | Local Search |
|--------|-------------|--------------|
| Completeness | Yes | No (unless with enough restarts) |
| Memory | O(n) | O(n) |
| Scalability | Poor on large problems | Excellent on large problems |
| Solution quality | Exact | May be approximate |
| Parallelization | Difficult | Easy |
| Best for | Small-medium, sparse solutions | Large, dense solutions |

## When to Use Local Search

Local search is preferred when:

1. **Large problem size**: Hundreds or thousands of variables
2. **Dense solutions**: Many solutions exist
3. **Time constraints**: Need quick approximate answers
4. **Optimization**: Minimizing constraint violations is acceptable
5. **Online/Real-time**: Anytime algorithms that improve over time

Examples: N-Queens with N>100, scheduling with soft constraints, configuration problems

## Key Takeaways

1. Local search operates on complete assignments, iteratively reducing conflicts
2. Min-conflicts is the most effective local search algorithm for CSPs
3. Min-conflicts excels on large problems where backtracking is impractical
4. Random restarts address incompleteness while maintaining efficiency
5. Simulated annealing and tabu search help escape local optima
6. Local search is incomplete but scales far better than systematic search
7. The choice between backtracking and local search depends on problem size and solution density
8. Hybrid approaches combining both methods can leverage their complementary strengths
9. Min-conflicts with restarts is remarkably effective on constraint satisfaction and optimization problems