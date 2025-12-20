---
title: "Exact Inference"
slug: "exact-inference"
description: "Exact probabilistic inference algorithms including variable elimination, belief propagation, and junction tree methods"
---

# Exact Inference

Exact inference in Bayesian networks involves computing exact probabilities for query variables given observed evidence. While conceptually straightforward, exact inference is computationally challenging - it's NP-hard in the general case. However, several clever algorithms exploit the structure of Bayesian networks to perform inference efficiently in many practical scenarios.

## Introduction to Inference Problems

Inference in Bayesian networks addresses several types of queries:

**Query Types:**

1. **Probability Queries**: Compute $P(X|E=e)$ where $X$ is a query variable and $E=e$ is evidence
2. **MAP (Maximum A Posteriori)**: Find $\arg\max_x P(X=x|E=e)$
3. **MPE (Most Probable Explanation)**: Find the most likely assignment to all variables given evidence
4. **Marginal Probabilities**: Compute $P(X_i)$ for each variable

The fundamental operation underlying all these queries is computing marginal probabilities by summing over irrelevant variables. For a query $P(X|E=e)$, we compute:

$$P(X|E=e) = \alpha \sum_{Y} P(X, Y, E=e)$$

where $\alpha$ is a normalization constant and $Y$ represents all non-query, non-evidence variables (hidden variables).

## Variable Elimination

Variable elimination is the foundational algorithm for exact inference in Bayesian networks. It systematically eliminates variables one at a time through summation, avoiding the need to construct the full joint distribution.

**Algorithm Overview:**

1. Start with factors (CPTs) from the Bayesian network
2. For each hidden variable (in some elimination order):
   - Collect all factors containing that variable
   - Multiply these factors together
   - Sum out (marginalize) the variable
   - Store the resulting factor
3. Multiply remaining factors and normalize

**Mathematical Foundation:**

Given a Bayesian network, we can write:

$$P(X, E=e) = \sum_{Y} \prod_{i=1}^{n} P(X_i | \text{Parents}(X_i))$$

Variable elimination rearranges this computation to push summations inside, performing multiplications only over relevant variables.

**Example: Burglar Alarm Network**

Query: $P(B|J=true, M=true)$ - Probability of burglary given both John and Mary called.

```python
import numpy as np
from functools import reduce

class Factor:
    """Represents a factor (table) in variable elimination."""

    def __init__(self, variables, values):
        """
        Args:
            variables: List of variable names
            values: Dict mapping variable assignments to probabilities
        """
        self.variables = list(variables)
        self.values = values

    def multiply(self, other):
        """Multiply two factors."""
        # Variables in result are union of both factors
        new_vars = list(set(self.variables + other.variables))

        # Compute products for all assignments
        new_values = {}
        for assignment in self._get_all_assignments(new_vars):
            # Get values from both factors
            key1 = tuple(assignment[v] for v in self.variables if v in assignment)
            key2 = tuple(assignment[v] for v in other.variables if v in assignment)

            val1 = self.values.get(key1, 1.0)
            val2 = other.values.get(key2, 1.0)

            key = tuple(assignment[v] for v in new_vars)
            new_values[key] = val1 * val2

        return Factor(new_vars, new_values)

    def marginalize(self, variable):
        """Sum out a variable from the factor."""
        if variable not in self.variables:
            return self

        # Variables remaining after marginalization
        new_vars = [v for v in self.variables if v != variable]

        # Sum over all values of the marginalized variable
        new_values = {}
        var_index = self.variables.index(variable)

        for assignment, prob in self.values.items():
            # Remove the marginalized variable from assignment
            new_assignment = tuple(assignment[i] for i in range(len(assignment))
                                 if i != var_index)
            new_values[new_assignment] = new_values.get(new_assignment, 0) + prob

        return Factor(new_vars, new_values)

    def _get_all_assignments(self, variables):
        """Generate all possible assignments for variables."""
        # Simplified: assumes binary variables
        if not variables:
            return [{}]

        assignments = []
        for val in [True, False]:
            rest_assignments = self._get_all_assignments(variables[1:])
            for rest in rest_assignments:
                assignment = {variables[0]: val}
                assignment.update(rest)
                assignments.append(assignment)

        return assignments

    def normalize(self):
        """Normalize factor to sum to 1."""
        total = sum(self.values.values())
        normalized_values = {k: v/total for k, v in self.values.items()}
        return Factor(self.variables, normalized_values)


def variable_elimination(factors, query_var, evidence, elimination_order):
    """
    Perform variable elimination for inference.

    Args:
        factors: List of Factor objects from the network
        query_var: Variable to compute probability for
        evidence: Dict of observed variables and their values
        elimination_order: Order to eliminate hidden variables

    Returns:
        Factor representing P(query_var | evidence)
    """
    # Reduce factors based on evidence
    reduced_factors = []
    for factor in factors:
        reduced = factor
        for var, val in evidence.items():
            if var in factor.variables:
                # Fix variable to observed value
                reduced = reduce_factor(reduced, var, val)
        reduced_factors.append(reduced)

    # Eliminate hidden variables
    for var in elimination_order:
        # Collect factors containing this variable
        relevant = [f for f in reduced_factors if var in f.variables]
        irrelevant = [f for f in reduced_factors if var not in f.variables]

        if relevant:
            # Multiply relevant factors
            product = reduce(lambda f1, f2: f1.multiply(f2), relevant)

            # Marginalize out the variable
            marginalized = product.marginalize(var)

            # Update factor list
            reduced_factors = irrelevant + [marginalized]

    # Multiply remaining factors
    result = reduce(lambda f1, f2: f1.multiply(f2), reduced_factors)

    # Normalize
    return result.normalize()


def reduce_factor(factor, variable, value):
    """Reduce factor by fixing a variable to a value."""
    if variable not in factor.variables:
        return factor

    var_index = factor.variables.index(variable)
    new_vars = [v for v in factor.variables if v != variable]

    new_values = {}
    for assignment, prob in factor.values.items():
        if assignment[var_index] == value:
            new_assignment = tuple(assignment[i] for i in range(len(assignment))
                                 if i != var_index)
            new_values[new_assignment] = prob

    return Factor(new_vars, new_values)


# Example usage
print("Variable elimination computes exact marginal probabilities")
```

## Complexity Analysis

The complexity of variable elimination depends critically on the elimination order:

- **Time complexity**: $O(n \cdot d^{w+1})$ where $n$ is the number of variables, $d$ is the domain size, and $w$ is the induced width
- **Space complexity**: $O(d^w)$

**Induced Width:**

The induced width is the size of the largest factor created during elimination. It depends on the elimination order and the network structure. Finding the optimal elimination order is NP-hard itself, but good heuristics exist:

1. **Min-neighbors**: Eliminate the variable with fewest neighbors
2. **Min-fill**: Eliminate the variable that adds fewest edges to the graph
3. **Weighted min-fill**: Consider both neighbors and domain sizes

```python
def min_neighbors_ordering(network):
    """
    Heuristic for choosing elimination order.

    Args:
        network: Dict mapping variables to their neighbors

    Returns:
        List of variables in elimination order
    """
    remaining = set(network.keys())
    ordering = []

    while remaining:
        # Choose variable with minimum neighbors
        min_var = min(remaining, key=lambda v: len(network[v] & remaining))
        ordering.append(min_var)
        remaining.remove(min_var)

    return ordering

# Example network structure
network = {
    'B': {'A'},
    'E': {'A'},
    'A': {'B', 'E', 'J', 'M'},
    'J': {'A'},
    'M': {'A'}
}

order = min_neighbors_ordering(network)
print(f"Elimination order: {order}")
```

## Junction Tree Algorithm

The junction tree (also called join tree or clique tree) algorithm is a more sophisticated approach that enables efficient inference for multiple queries on the same network. It preprocesses the network into a tree structure where inference can be performed through local message passing.

**Algorithm Steps:**

1. **Moralization**: Convert directed graph to undirected by connecting parents of each node
2. **Triangulation**: Add edges to make the graph chordal (no cycles of length > 3 without chord)
3. **Form junction tree**: Create tree of cliques satisfying the running intersection property
4. **Initialize potentials**: Assign CPTs to cliques
5. **Message passing**: Propagate beliefs through the tree

**Running Intersection Property:**

For any variable $X$, all cliques containing $X$ form a connected subtree. This ensures consistent beliefs across the tree.

**Advantages:**

- Perform multiple queries efficiently after preprocessing
- Natural for dynamic updating when evidence changes
- Theoretical foundation for belief propagation

```python
class JunctionTree:
    """Junction tree for exact inference."""

    def __init__(self, cliques, edges):
        """
        Args:
            cliques: List of cliques (sets of variables)
            edges: List of (clique1, clique2) pairs forming tree
        """
        self.cliques = cliques
        self.edges = edges
        self.potentials = {i: {} for i in range(len(cliques))}
        self.messages = {}

    def initialize_potentials(self, factors):
        """Assign factors to cliques."""
        for factor in factors:
            # Find a clique containing all factor variables
            for i, clique in enumerate(self.cliques):
                if set(factor.variables).issubset(clique):
                    # Multiply factor into clique potential
                    # (simplified - actual implementation multiplies factors)
                    self.potentials[i] = factor
                    break

    def pass_messages(self):
        """Perform belief propagation on junction tree."""
        # Collect phase: messages from leaves to root
        # Distribute phase: messages from root to leaves
        # (simplified implementation)
        for i, j in self.edges:
            sepset = self.cliques[i] & self.cliques[j]
            # Compute message from i to j by marginalizing i's potential
            # This is simplified pseudocode
            message = self._marginalize_to_sepset(self.potentials[i], sepset)
            self.messages[(i, j)] = message

    def _marginalize_to_sepset(self, potential, sepset):
        """Marginalize potential to separator set."""
        # Implementation would marginalize out variables not in sepset
        return potential

    def query(self, variable):
        """Query marginal probability after message passing."""
        # Find clique containing variable
        for i, clique in enumerate(self.cliques):
            if variable in clique:
                # Marginalize clique potential to variable
                # (simplified - actual implementation marginalizes)
                return self.potentials[i]
        return None


print("Junction tree enables efficient repeated queries")
```

## Belief Propagation

Belief propagation (sum-product algorithm) is a message-passing algorithm that works on the original Bayesian network structure (when it's a tree or polytree) or on the junction tree.

**Message Passing Rules:**

For a variable $X$ with parents $U$ and children $Y$:

$$\pi(X) = \prod_{U_i \in U} \lambda_{U_i}(X)$$

$$\lambda(X) = \prod_{Y_j \in Y} \lambda_{Y_j}(X)$$

$$P(X) \propto \pi(X) \cdot \lambda(X)$$

These messages represent:
- $\pi$: Evidence from ancestors (predictive support)
- $\lambda$: Evidence from descendants (diagnostic support)

For tree-structured networks, belief propagation is exact and efficient. For networks with loops, loopy belief propagation can be used as an approximate method.

## Key Takeaways

1. **Exact inference** computes precise probabilities but is NP-hard in general
2. **Variable elimination** is the fundamental algorithm, systematically summing out hidden variables
3. **Elimination order** critically affects computational complexity - optimal ordering is itself NP-hard
4. **Induced width** determines the size of the largest factor and thus the computational cost
5. **Junction tree algorithm** preprocesses the network for efficient repeated queries
6. **Belief propagation** uses local message passing and is exact for tree-structured networks
7. **Time-space tradeoffs** exist: caching intermediate results speeds up repeated queries but uses more memory
8. **Network structure** determines tractability - trees are easy, densely connected networks are hard

Exact inference provides guaranteed correct answers but may be intractable for large, densely connected networks. In such cases, approximate inference methods become necessary, trading accuracy for computational efficiency. Understanding these exact methods is crucial both for practical applications where they're feasible and as a foundation for approximate techniques.
