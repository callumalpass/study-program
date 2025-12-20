---
title: "Constraint Satisfaction Problems"
slug: "csp-introduction"
description: "Introduction to CSP formulation including variables, domains, constraints, and constraint graphs"
---

# Constraint Satisfaction Problems

## Introduction

Constraint Satisfaction Problems (CSPs) are a fundamental class of problems in artificial intelligence that involve finding assignments to variables that satisfy a set of constraints. CSPs provide a powerful framework for representing and solving many real-world problems, from scheduling and planning to circuit design and resource allocation. Unlike search problems where we seek a path to a goal, CSPs focus on finding configurations that meet all specified requirements.

A CSP is formally defined by three components: a set of variables, a domain of values for each variable, and a set of constraints that specify which combinations of values are acceptable. This declarative representation separates the problem definition from the solution method, making CSPs highly versatile and applicable across diverse domains.

## Components of a CSP

### Variables

Variables represent the entities we need to assign values to in order to solve the problem. In a map coloring problem, each region is a variable. In the N-queens problem, each column position is a variable representing which row the queen should be placed in. Variables are typically denoted as X₁, X₂, ..., Xₙ.

### Domains

Each variable has an associated domain - the set of possible values it can take. Domains can be discrete (finite or infinite) or continuous. In map coloring, the domain might be {Red, Green, Blue}. In the N-queens problem for an 8x8 board, each variable has domain {1, 2, 3, 4, 5, 6, 7, 8} representing possible row positions.

The size and structure of domains significantly impact the difficulty of solving a CSP. Larger domains generally lead to more complex search spaces, while smaller domains may make the problem more constrained and potentially easier to solve through constraint propagation.

### Constraints

Constraints define the rules that govern which combinations of variable assignments are valid. A constraint can be:

- **Unary constraints**: Restrictions on a single variable (e.g., X₁ ≠ Red)
- **Binary constraints**: Restrictions between two variables (e.g., X₁ ≠ X₂)
- **N-ary constraints**: Restrictions involving three or more variables (e.g., X₁ + X₂ + X₃ < 10)

Constraints can be specified explicitly by listing allowed (or forbidden) combinations, or implicitly through mathematical relationships, predicates, or procedural tests.

## Constraint Graphs

A constraint graph is a visual representation of a CSP where:
- Nodes represent variables
- Edges connect variables that participate in constraints
- For binary CSPs, each edge represents one binary constraint

Constraint graphs help visualize the structure of a CSP and identify properties like connectivity, which influences solution strategies. Highly connected graphs tend to be harder to solve but may benefit more from constraint propagation techniques.

## Classic CSP Examples

### Map Coloring

The map coloring problem requires coloring regions of a map such that no two adjacent regions share the same color. This is a classic example of a binary CSP:
- **Variables**: Regions on the map (WA, NT, SA, Q, NSW, V, T for Australia)
- **Domains**: Available colors (e.g., {Red, Green, Blue})
- **Constraints**: Adjacent regions must have different colors (WA ≠ NT, WA ≠ SA, etc.)

```python
# Map coloring CSP representation
variables = ['WA', 'NT', 'SA', 'Q', 'NSW', 'V', 'T']
domains = {var: ['Red', 'Green', 'Blue'] for var in variables}
constraints = [
    ('WA', 'NT'), ('WA', 'SA'), ('NT', 'SA'), ('NT', 'Q'),
    ('SA', 'Q'), ('SA', 'NSW'), ('SA', 'V'), ('Q', 'NSW'), ('NSW', 'V')
]
```

### N-Queens Problem

Place N queens on an N×N chessboard such that no two queens attack each other:
- **Variables**: X₁, X₂, ..., Xₙ (one per column)
- **Domains**: {1, 2, ..., N} (row positions)
- **Constraints**:
  - No two queens in the same row: Xᵢ ≠ Xⱼ for all i ≠ j
  - No two queens on the same diagonal: |Xᵢ - Xⱼ| ≠ |i - j|

```python
def queens_constraint(qi, qj, i, j):
    """Check if two queens conflict"""
    return qi != qj and abs(qi - qj) != abs(i - j)
```

### Sudoku

Fill a 9×9 grid with digits 1-9 such that each row, column, and 3×3 subgrid contains all digits:
- **Variables**: 81 cells (or only empty cells)
- **Domains**: {1, 2, 3, 4, 5, 6, 7, 8, 9}
- **Constraints**: AllDiff constraints for each row, column, and 3×3 box

## CSP Solution Concepts

A **solution** to a CSP is a complete assignment of values to all variables that satisfies all constraints. Some key concepts:

- **Consistent assignment**: An assignment that doesn't violate any constraints (may be partial or complete)
- **Complete assignment**: Every variable has been assigned a value
- **Partial assignment**: Some variables remain unassigned

CSPs can have:
- **No solution**: Over-constrained problems
- **Exactly one solution**: Many puzzle problems
- **Multiple solutions**: Under-constrained problems

## Types of CSP

### Based on Variable Types
- **Discrete finite domains**: Most common, e.g., map coloring, scheduling
- **Discrete infinite domains**: Requires constraint languages (integers, strings)
- **Continuous domains**: Linear programming, requires specialized techniques

### Based on Constraint Types
- **Binary CSPs**: All constraints involve at most two variables
- **Non-binary CSPs**: Constraints can involve any number of variables

Any non-binary CSP can be transformed into a binary CSP through the introduction of auxiliary variables, though this may not always be beneficial for solving efficiency.

## Key Takeaways

1. CSPs provide a declarative framework for representing problems with variables, domains, and constraints
2. The constraint graph structure significantly influences problem difficulty and solution approaches
3. Classic examples like map coloring, N-queens, and Sudoku illustrate fundamental CSP concepts
4. Binary constraints are most common, but n-ary constraints naturally represent some problems
5. Understanding CSP structure is crucial for selecting appropriate solution techniques
6. CSPs separate problem representation from solution methods, enabling general-purpose solvers