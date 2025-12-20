---
title: "Constraint Propagation"
slug: "constraint-propagation"
description: "Detailed exploration of constraint propagation techniques including AC-3, node consistency, and path consistency"
---

# Constraint Propagation

## Introduction

Constraint propagation is a family of techniques for reducing the search space of CSPs by enforcing local consistency. The key insight is that by examining constraints locally, we can often deduce that certain variable-value combinations cannot participate in any solution, allowing us to prune them before or during search. This preprocessing can dramatically reduce the effective search space, sometimes even solving the problem without any search at all.

Constraint propagation works by repeatedly applying consistency rules until a fixed point is reached where no more values can be eliminated. While it doesn't guarantee finding a solution (it's incomplete), it can detect unsolvable problems early and significantly reduce the domains that search algorithms must explore.

## Node Consistency

Node consistency is the simplest form of local consistency, dealing with unary constraints (constraints on single variables).

**Definition**: A variable is node-consistent if all values in its domain satisfy the variable's unary constraints.

**Example**: If we have variable X with domain {1, 2, 3, 4, 5} and constraint X > 3, we can achieve node consistency by reducing the domain to {4, 5}.

```python
def enforce_node_consistency(csp):
    """
    Make all variables node-consistent by removing values
    that violate unary constraints
    """
    for var in csp.variables:
        for value in csp.domains[var][:]:  # Copy to avoid modification during iteration
            if not csp.unary_constraints[var](value):
                csp.domains[var].remove(value)
```

Node consistency is straightforward and can be established in O(nd) time where n is the number of variables and d is the maximum domain size. It's typically applied as a preprocessing step.

## Arc Consistency

Arc consistency is the most important and widely used form of local consistency for binary CSPs. It ensures that for every value in a variable's domain, there exists a compatible value in each constrained neighbor's domain.

### Formal Definition

An arc (X, Y) is consistent if for every value x in the domain of X, there exists some value y in the domain of Y such that the constraint between X and Y is satisfied. A CSP is arc-consistent if every arc is consistent.

**Example - Map Coloring**:
```
Consider: X ∈ {Red, Green}, Y ∈ {Red}, Constraint: X ≠ Y
Arc (X, Y) is inconsistent because when X=Red, there's no value in Y's domain that satisfies X ≠ Y
Solution: Remove Red from X's domain → X ∈ {Green}
```

### The AC-3 Algorithm

AC-3 (Arc Consistency Algorithm #3) is the most popular algorithm for enforcing arc consistency. It maintains a queue of arcs to check and processes them until the queue is empty or a domain becomes empty (indicating no solution exists).

```python
def ac3(csp, queue=None):
    """
    AC-3 algorithm for enforcing arc consistency

    Args:
        csp: CSP instance
        queue: Optional initial queue of arcs to check
               If None, start with all arcs

    Returns:
        True if CSP is arc-consistent, False if inconsistency detected
    """
    # Initialize queue with all arcs
    if queue is None:
        queue = [(Xi, Xj) for Xi in csp.variables
                 for Xj in csp.neighbors[Xi]]

    while queue:
        (Xi, Xj) = queue.pop(0)

        # Revise arc (Xi, Xj)
        if revise(csp, Xi, Xj):
            # Domain of Xi was reduced
            if not csp.domains[Xi]:
                # Domain wipeout - no solution
                return False

            # Add all arcs (Xk, Xi) where Xk is a neighbor of Xi
            # (except the arc we just processed)
            for Xk in csp.neighbors[Xi]:
                if Xk != Xj:
                    queue.append((Xk, Xi))

    return True


def revise(csp, Xi, Xj):
    """
    Make arc (Xi, Xj) consistent

    Returns:
        True if domain of Xi was revised, False otherwise
    """
    revised = False

    for x in csp.domains[Xi][:]:  # Iterate over copy
        # Check if there exists a value y in Xj's domain
        # that satisfies the constraint
        if not any(csp.constraints(Xi, x, Xj, y)
                   for y in csp.domains[Xj]):
            # No supporting value found - remove x
            csp.domains[Xi].remove(x)
            revised = True

    return revised
```

### AC-3 Complexity Analysis

- **Time Complexity**: O(cd³) where c is the number of constraints and d is the maximum domain size
  - Each arc can be inserted into the queue at most d times
  - Each revision takes O(d²) time to check all value pairs
  - There are c arcs total

- **Space Complexity**: O(c) for the queue

**Practical Performance**: AC-3 often runs much faster than worst-case in practice because:
1. Domains shrink during execution
2. Many arcs don't need revision
3. Early termination on domain wipeout

### AC-3 Example - Sudoku

For a Sudoku cell constrained by its row, column, and 3×3 box:

```python
# After placing 5 in a cell, AC-3 propagates:
# 1. Remove 5 from all cells in same row
# 2. Remove 5 from all cells in same column
# 3. Remove 5 from all cells in same 3×3 box
# 4. If any cell now has only one value, assign it
# 5. Repeat propagation for that assignment
# 6. Continue until fixed point
```

In easy Sudoku puzzles, AC-3 alone can solve the entire puzzle without any search.

## Path Consistency

Path consistency is a stronger notion than arc consistency that considers paths of length 2 through the constraint graph.

**Definition**: A path (Xi, Xm, Xj) is path-consistent if for every consistent assignment {Xi=a, Xj=b}, there exists a value m for Xm such that {Xi=a, Xm=m} and {Xm=m, Xj=b} are both consistent.

Path consistency can detect inconsistencies that arc consistency misses, but it's more expensive to enforce.

**Example**:
```
Xi ∈ {0, 1}, Xm ∈ {0, 1}, Xj ∈ {0, 1}
Constraints: Xi < Xm, Xm < Xj

Arc-consistent: All arcs are consistent individually
Path-consistent: No! (Xi=0, Xj=1) has no supporting Xm value
                 Xm can't simultaneously satisfy 0 < Xm and Xm < 1
```

### PC-2 Algorithm

The PC-2 algorithm enforces path consistency by checking all paths of length 2 and tightening constraints when needed.

**Complexity**: O(n³d³) for n variables and domain size d - expensive but sometimes worthwhile.

## K-Consistency

K-consistency generalizes these concepts:

- **1-consistent**: Node-consistent
- **2-consistent**: Arc-consistent
- **3-consistent**: Path-consistent
- **k-consistent**: Any consistent assignment to k-1 variables can be extended to any kth variable

**Strong k-consistency**: A CSP is strongly k-consistent if it is j-consistent for all j ≤ k.

**Theorem**: If a CSP with n variables is strongly n-consistent, then a solution can be found without backtracking in O(n²d) time.

However, achieving strong n-consistency is generally exponentially expensive, so it's rarely practical.

## Global Constraints

Many real CSPs involve global constraints that apply to multiple variables simultaneously. Special propagation algorithms exist for common global constraints:

### AllDifferent Constraint

The AllDifferent constraint requires all variables in a set to take different values.

**Example**: In Sudoku, all cells in a row must be different.

**Naive approach**: Check all pairs (O(n²) binary constraints)

**Better approach**: Use specialized algorithms like the matching algorithm based on bipartite graph matching, which can detect more inconsistencies.

```python
def alldiff_propagation(variables, domains):
    """
    Propagate AllDifferent constraint using matching
    Removes values that cannot participate in any complete assignment
    """
    # Build bipartite graph: variables to values
    # Use Hall's theorem and matching to find impossible values
    # More powerful than just pairwise arc consistency
    pass  # Simplified - actual implementation uses graph matching
```

## Directional Arc Consistency

When variable ordering is known (e.g., during search), we can use directional arc consistency (DAC), which only enforces consistency in one direction along the ordering.

**Advantage**: O(cd²) time complexity - faster than AC-3
**Disadvantage**: Only useful when ordering is predetermined

## Combining Propagation with Search

Constraint propagation is most powerful when combined with backtracking search:

1. **Preprocessing**: Run AC-3 before search to reduce initial domains
2. **Interleaving**: Run AC-3 after each assignment during search (MAC - Maintaining Arc Consistency)
3. **Forward Checking**: A lightweight alternative that only checks arcs between assigned and unassigned variables

The tradeoff is computation time per node versus search tree size reduction.

## Key Takeaways

1. Constraint propagation reduces search space by enforcing local consistency
2. Node consistency handles unary constraints and is applied as preprocessing
3. Arc consistency (AC-3) is the most important and widely used technique for binary CSPs
4. AC-3 has O(cd³) complexity but often runs much faster in practice
5. Path consistency and k-consistency are stronger but more expensive
6. Global constraints like AllDifferent benefit from specialized propagation algorithms
7. Combining AC-3 with backtracking search (MAC) is a powerful approach for solving CSPs
8. The key is balancing propagation cost against search space reduction