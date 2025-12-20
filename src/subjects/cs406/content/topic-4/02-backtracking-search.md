---
title: "Backtracking Search"
slug: "backtracking-search"
description: "Comprehensive guide to backtracking algorithms for CSP including forward checking and backjumping"
---

# Backtracking Search

## Introduction

Backtracking search is the fundamental algorithm for solving Constraint Satisfaction Problems. It systematically explores the space of possible variable assignments, extending partial solutions one variable at a time and backtracking when constraints are violated. While conceptually simple, backtracking forms the foundation for sophisticated CSP solvers and can be enhanced with numerous optimizations that dramatically improve performance.

The basic idea is to incrementally build a solution by assigning values to variables one at a time, checking constraints as we go. When we reach a dead end (a variable with no legal values remaining), we backtrack to the most recent decision point and try a different value. This depth-first search strategy is both memory-efficient and complete - it will find a solution if one exists.

## Basic Backtracking Algorithm

The recursive backtracking algorithm follows this structure:

```python
def backtracking_search(csp):
    """Main entry point for backtracking search"""
    return backtrack({}, csp)

def backtrack(assignment, csp):
    """
    Recursive backtracking algorithm

    Args:
        assignment: Current partial assignment (dict)
        csp: CSP instance with variables, domains, constraints

    Returns:
        Complete assignment if solution found, None otherwise
    """
    # Base case: all variables assigned
    if len(assignment) == len(csp.variables):
        return assignment

    # Select an unassigned variable
    var = select_unassigned_variable(assignment, csp)

    # Try each value in the variable's domain
    for value in order_domain_values(var, assignment, csp):
        # Check if value is consistent with assignment
        if is_consistent(var, value, assignment, csp):
            # Add assignment
            assignment[var] = value

            # Recurse
            result = backtrack(assignment, csp)
            if result is not None:
                return result

            # Backtrack: remove assignment
            del assignment[var]

    # No solution found
    return None

def is_consistent(var, value, assignment, csp):
    """Check if var=value is consistent with current assignment"""
    for other_var in assignment:
        if not csp.constraints(var, value, other_var, assignment[other_var]):
            return False
    return True
```

### Algorithm Properties

- **Completeness**: Guaranteed to find a solution if one exists
- **Time Complexity**: O(d^n) worst case, where d is domain size and n is number of variables
- **Space Complexity**: O(n) for the recursive call stack and current assignment
- **Optimality**: Finds any solution, not necessarily optimal (unless all solutions are enumerated)

## Chronological Backtracking

The basic algorithm performs chronological backtracking - when a dead end is reached, it undoes the most recent assignment and tries the next value. This is simple but inefficient because it may repeatedly fail due to the same earlier decision without recognizing the true source of the conflict.

**Example**: In a 4-coloring problem, suppose X₁=Red causes X₁₀₀=Red to be invalid. Chronological backtracking will try all combinations of X₂ through X₉₉ before finally backtracking to X₁, even though these intermediate variables are irrelevant to the conflict.

## Forward Checking

Forward checking is a simple but powerful enhancement that prevents future failures by eliminating values from unassigned variables that are inconsistent with the current assignment.

### How Forward Checking Works

When we assign X=x:
1. For each unassigned variable Y connected to X by a constraint
2. Remove from Y's domain any value y that violates the constraint with X=x
3. If any domain becomes empty, backtrack immediately

This prunes the search space early by detecting dead ends sooner.

```python
def backtrack_with_forward_checking(assignment, csp, domains):
    """Backtracking with forward checking"""
    if len(assignment) == len(csp.variables):
        return assignment

    var = select_unassigned_variable(assignment, csp)

    for value in order_domain_values(var, assignment, csp):
        if is_consistent(var, value, assignment, csp):
            assignment[var] = value

            # Forward checking: prune domains
            removed = {}
            domains_consistent = True

            for neighbor in csp.neighbors[var]:
                if neighbor not in assignment:
                    removed[neighbor] = []
                    for neighbor_value in domains[neighbor][:]:
                        if not csp.constraints(var, value, neighbor, neighbor_value):
                            domains[neighbor].remove(neighbor_value)
                            removed[neighbor].append(neighbor_value)

                    # Domain wipeout - immediate failure
                    if not domains[neighbor]:
                        domains_consistent = False
                        break

            if domains_consistent:
                result = backtrack_with_forward_checking(assignment, csp, domains)
                if result is not None:
                    return result

            # Restore domains
            for neighbor, values in removed.items():
                domains[neighbor].extend(values)

            del assignment[var]

    return None
```

**Advantages**:
- Detects failures earlier than basic backtracking
- Reduces branching factor by eliminating inconsistent values
- Simple to implement and understand

**Limitations**:
- Only checks pairwise consistency between assigned and unassigned variables
- Doesn't detect inconsistencies between unassigned variables

## Maintaining Arc Consistency (MAC)

A more powerful approach is to maintain arc consistency throughout the search. After each assignment, we run a constraint propagation algorithm (like AC-3) to ensure all unassigned variables are arc-consistent with each other.

This is more expensive per node but can dramatically reduce the search tree size by detecting failures even earlier than forward checking.

```python
def backtrack_with_mac(assignment, csp, domains):
    """Backtracking with Maintaining Arc Consistency"""
    if len(assignment) == len(csp.variables):
        return assignment

    var = select_unassigned_variable(assignment, csp)

    for value in order_domain_values(var, assignment, csp):
        if is_consistent(var, value, assignment, csp):
            assignment[var] = value

            # Save domains for restoration
            saved_domains = {v: domains[v][:] for v in domains}

            # Enforce arc consistency
            if ac3_inference(csp, var, value, domains, assignment):
                result = backtrack_with_mac(assignment, csp, domains)
                if result is not None:
                    return result

            # Restore domains
            domains.update(saved_domains)
            del assignment[var]

    return None
```

## Conflict-Directed Backjumping

Instead of backtracking to the immediately preceding variable, backjumping analyzes the conflict to determine which earlier assignment caused the failure, then jumps directly to that decision point.

### Conflict Set

Each variable maintains a **conflict set** - the set of previously assigned variables that constrain it. When a domain wipeout occurs:
1. Compute the conflict set (union of all constraint participants)
2. Backjump to the most recent variable in the conflict set
3. Update that variable's conflict set

**Benefits**:
- Avoids redundant search in irrelevant parts of the tree
- Particularly effective in sparse constraint graphs
- Can be combined with forward checking or MAC

**Example**:
```
X₁=A → X₂=B → X₃=C → X₄ has no valid values
If X₄ is only constrained by X₁ and X₃, backjump to X₃
Don't waste time trying different values for X₂
```

## Comparison of Techniques

| Technique | Detection Power | Cost per Node | Best Use Case |
|-----------|----------------|---------------|---------------|
| Basic Backtracking | Low | Very Low | Small, simple problems |
| Forward Checking | Medium | Low | General purpose, good default |
| MAC | High | Medium-High | Hard problems, worth the overhead |
| Backjumping | Medium | Low-Medium | Sparse graphs, few conflicts |

## Practical Implementation Tips

1. **Combine techniques**: MAC + backjumping can be very powerful
2. **Use heuristics**: Variable and value ordering (covered in later topics) are crucial
3. **Preprocess**: Run AC-3 before search to reduce initial domains
4. **Monitor statistics**: Track backtracks, nodes visited, constraint checks
5. **Time limits**: Implement cutoffs for practical applications

## Key Takeaways

1. Backtracking is the fundamental complete algorithm for CSP solving
2. Forward checking eliminates inconsistent values from future variables, detecting failures earlier
3. MAC maintains full arc consistency, providing even stronger pruning at higher computational cost
4. Conflict-directed backjumping avoids redundant search by jumping to the source of conflicts
5. The choice of technique depends on problem structure and size
6. These basic techniques form the foundation for industrial-strength CSP solvers
7. Combining backtracking enhancements with good heuristics (next topics) yields the best performance