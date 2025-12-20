---
title: "Variable Ordering"
slug: "variable-ordering"
description: "Comprehensive coverage of variable ordering heuristics including MRV and degree heuristic"
---

# Variable Ordering

## Introduction

In backtracking search for CSPs, the order in which we choose variables to assign can have a dramatic impact on performance. A poor ordering might lead to exploring millions of nodes, while a good ordering might find a solution after examining just a few dozen. Variable ordering heuristics aim to minimize the size of the search tree by making intelligent decisions about which variable to assign next.

The fundamental principle behind effective variable ordering is to **fail fast** - choose variables that are most likely to cause failure as early as possible. By detecting dead ends quickly, we avoid wasting time exploring doomed subtrees. This leads to the most important variable ordering heuristic: Minimum Remaining Values.

## Static vs. Dynamic Ordering

Before diving into specific heuristics, it's important to distinguish between two approaches:

**Static Ordering**: Determine the complete variable ordering before search begins. Simple but inflexible - doesn't adapt to information learned during search.

**Dynamic Ordering**: Choose the next variable at each step based on the current state of the search. More expensive per node but usually leads to much smaller search trees. Modern CSP solvers almost always use dynamic ordering.

## Minimum Remaining Values (MRV)

The Minimum Remaining Values heuristic, also called the "most constrained variable" or "fail-first" heuristic, selects the variable with the smallest remaining domain.

### Rationale

If a variable has only one value left in its domain, we must assign that value (or backtrack if it doesn't work). If we wait to assign this variable, we might waste time exploring other branches that will eventually fail when we reach it. By choosing the most constrained variable first, we:

1. Detect failures as early as possible
2. Reduce the branching factor in subsequent choices
3. Minimize the depth of failed branches

### Implementation

```python
def select_unassigned_variable_mrv(assignment, csp):
    """
    Select unassigned variable with minimum remaining values

    Args:
        assignment: Current partial assignment
        csp: CSP instance with variables, domains, constraints

    Returns:
        Unassigned variable with smallest domain
    """
    unassigned = [v for v in csp.variables if v not in assignment]

    # Return variable with minimum domain size
    return min(unassigned, key=lambda var: len(csp.domains[var]))
```

### Example - N-Queens

Consider an 8-queens problem after placing queens in columns 1-3:

```
Column 1: Domain = {2} (only row 2 viable)
Column 2: Domain = {4, 5}
Column 3: Domain = {1, 6, 7}
Column 4: Domain = {3, 7}
Column 5: Domain = {1, 4, 6, 8}
```

MRV selects Column 1 (domain size 1) before the others. If Row 2 doesn't work for Column 1, we backtrack immediately rather than exploring all possibilities for Columns 2-5 first.

### Performance Impact

**Without MRV**: Average search tree size = O(d^n) where d is average domain size
**With MRV**: Can reduce search tree by orders of magnitude in constrained problems

For the N-Queens problem, MRV can reduce nodes explored from millions to thousands.

## Degree Heuristic

The degree heuristic breaks ties when multiple variables have the same MRV. It selects the variable involved in the largest number of constraints with unassigned variables.

### Rationale

A high-degree variable constrains many other variables. Assigning it early:
1. Maximizes constraint propagation to other variables
2. Reduces domains of many neighbors simultaneously
3. Makes future MRV selections more effective

### Implementation

```python
def select_unassigned_variable_degree(assignment, csp):
    """
    Select unassigned variable with highest degree
    (most constraints on remaining variables)
    """
    unassigned = [v for v in csp.variables if v not in assignment]

    def degree(var):
        """Count constraints with unassigned variables"""
        return sum(1 for neighbor in csp.neighbors[var]
                   if neighbor not in assignment)

    return max(unassigned, key=degree)
```

### Combined MRV + Degree Heuristic

The standard approach combines both heuristics:

```python
def select_unassigned_variable(assignment, csp):
    """
    Select next variable using MRV, breaking ties with degree heuristic

    This is the recommended approach for general CSP solving
    """
    unassigned = [v for v in csp.variables if v not in assignment]

    def heuristic_value(var):
        # Primary criterion: MRV (ascending)
        mrv = len(csp.domains[var])

        # Secondary criterion: Degree (descending, so negate)
        degree = -sum(1 for neighbor in csp.neighbors[var]
                      if neighbor not in assignment)

        return (mrv, degree)

    return min(unassigned, key=heuristic_value)
```

### Example - Map Coloring

```
South Australia (SA): 5 neighbors, domain size 2
Western Australia (WA): 2 neighbors, domain size 2
Queensland (Q): 3 neighbors, domain size 3
```

Both SA and WA have MRV=2. Degree heuristic chooses SA (5 neighbors) over WA (2 neighbors).

## Max-Degree Heuristic (Initial Ordering)

For the very first variable assignment (when all variables are unassigned), MRV doesn't help since all domains are equal. The max-degree heuristic is useful here:

**Strategy**: Start with the variable involved in the most constraints.

**Rationale**: Maximum propagation to other variables right from the start.

```python
def select_first_variable(csp):
    """Select initial variable using max-degree heuristic"""
    return max(csp.variables, key=lambda v: len(csp.neighbors[v]))
```

## Domain/Weighted Degree Heuristic

An advanced heuristic that learns from conflicts during search.

### Concept

Maintain a weight for each constraint, initially 1. When a constraint causes a domain wipeout (failure), increment its weight. Select the variable that maximizes:

```
weight_sum(var) / domain_size(var)
```

This favors variables involved in constraints that have caused past failures.

```python
class WeightedDegreeCSP:
    def __init__(self, csp):
        self.csp = csp
        # Initialize constraint weights
        self.constraint_weights = {c: 1 for c in csp.constraints}

    def select_variable(self, assignment):
        """Select variable using weighted degree heuristic"""
        unassigned = [v for v in self.csp.variables
                      if v not in assignment]

        def weighted_degree(var):
            weight_sum = sum(self.constraint_weights[(var, neighbor)]
                           for neighbor in self.csp.neighbors[var]
                           if neighbor not in assignment)
            return weight_sum / len(self.csp.domains[var])

        return max(unassigned, key=weighted_degree)

    def record_failure(self, var):
        """Increment weights for constraints involving var"""
        for neighbor in self.csp.neighbors[var]:
            self.constraint_weights[(var, neighbor)] += 1
```

**Advantages**:
- Adapts to problem structure during search
- Often outperforms static heuristics on hard problems
- Particularly effective when combined with restarts

## Random Tie-Breaking

When multiple variables are equally good according to the heuristic, random tie-breaking can help:

```python
import random

def select_unassigned_variable_with_random_ties(assignment, csp):
    """MRV with degree tiebreaker and random final tiebreaking"""
    unassigned = [v for v in csp.variables if v not in assignment]

    # Group by (MRV, degree)
    def heuristic_value(var):
        mrv = len(csp.domains[var])
        degree = -sum(1 for n in csp.neighbors[var] if n not in assignment)
        return (mrv, degree)

    # Find minimum heuristic value
    min_value = min(heuristic_value(v) for v in unassigned)

    # Get all variables with minimum value
    candidates = [v for v in unassigned
                  if heuristic_value(v) == min_value]

    # Random choice among ties
    return random.choice(candidates)
```

This can improve performance when used with random restarts.

## Experimental Comparison

Empirical studies on various CSP benchmarks show:

| Heuristic | Nodes Explored (Relative) | Time per Node |
|-----------|---------------------------|---------------|
| Static ordering | 100x | 1x |
| Random ordering | 50x | 1.1x |
| Max-degree | 10x | 1.1x |
| MRV | 5x | 1.2x |
| MRV + Degree | 3x | 1.3x |
| Weighted Degree | 2x | 1.5x |

The numbers vary by problem, but MRV almost always provides significant improvement.

## When Variable Ordering Matters Most

Variable ordering heuristics provide the greatest benefit when:

1. **Tight constraints**: Problems with many conflicts benefit from fail-fast
2. **Non-uniform domains**: MRV is most useful when domain sizes vary significantly
3. **Sparse graphs**: Degree heuristic is more valuable in sparse constraint graphs
4. **Hard satisfiable problems**: Near the phase transition between SAT and UNSAT

## Key Takeaways

1. Variable ordering can reduce search tree size by orders of magnitude
2. MRV (Minimum Remaining Values) is the single most important variable ordering heuristic
3. The degree heuristic effectively breaks ties in MRV
4. Combining MRV and degree heuristic is the standard approach
5. Dynamic variable ordering adapts to search state and outperforms static ordering
6. Advanced heuristics like weighted degree can learn from search experience
7. The "fail first" principle - choose the most constrained variable - is fundamental to effective CSP solving
8. Implementation overhead of sophisticated heuristics is usually worthwhile for non-trivial problems