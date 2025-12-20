---
title: "Bayesian Networks"
slug: "bayesian-networks"
description: "Directed acyclic graphs for probabilistic reasoning, including structure, semantics, d-separation, and conditional independence"
---

# Bayesian Networks

Bayesian networks (also called belief networks or Bayes nets) are powerful probabilistic graphical models that represent complex joint probability distributions in a compact and interpretable way. By combining graph theory with probability theory, Bayesian networks provide an elegant framework for reasoning under uncertainty, making them one of the most widely used tools in artificial intelligence.

## Introduction to Bayesian Networks

A Bayesian network is a directed acyclic graph (DAG) where:
- **Nodes** represent random variables
- **Edges** represent direct probabilistic dependencies
- Each node has a **conditional probability table (CPT)** specifying $P(\text{Node}|\text{Parents})$

The key insight is that the graph structure encodes conditional independence relationships, allowing us to decompose a complex joint distribution into local conditional distributions. This dramatically reduces the number of parameters needed to specify the full joint probability distribution.

For $n$ binary variables, a naive joint distribution requires $2^n - 1$ parameters. However, a Bayesian network with at most $k$ parents per node requires only $O(n \cdot 2^k)$ parameters - an exponential savings.

## Structure and Semantics

**Formal Definition:**

A Bayesian network represents the joint probability distribution as:

$$P(X_1, X_2, ..., X_n) = \prod_{i=1}^{n} P(X_i | \text{Parents}(X_i))$$

This factorization follows from applying the chain rule and exploiting conditional independence assumptions encoded in the graph structure.

**Example: Burglar Alarm Network**

Consider a classic example with five variables:
- **B**: Burglary occurred
- **E**: Earthquake occurred
- **A**: Alarm sounds
- **J**: John calls
- **M**: Mary calls

The network structure captures these dependencies:
- Burglary and Earthquake are independent causes that can trigger the Alarm
- John and Mary independently call when they hear the Alarm

```python
import numpy as np
from collections import defaultdict

class BayesianNetwork:
    """Simple Bayesian Network implementation."""

    def __init__(self):
        self.nodes = {}
        self.parents = defaultdict(list)
        self.cpts = {}

    def add_node(self, name, parents, cpt):
        """
        Add a node to the network.

        Args:
            name: Variable name
            parents: List of parent variable names
            cpt: Conditional probability table (dict or array)
        """
        self.nodes[name] = True
        self.parents[name] = parents
        self.cpts[name] = cpt

    def get_probability(self, node, value, parent_values):
        """Get P(node=value | parent_values)."""
        cpt = self.cpts[node]
        if not self.parents[node]:
            # No parents - just prior probability
            return cpt[value]
        else:
            # Look up in CPT based on parent values
            key = tuple(parent_values) + (value,)
            return cpt.get(key, 0.0)

# Build the Burglar Alarm network
bn = BayesianNetwork()

# P(B) - Prior probability of burglary
bn.add_node('B', [], {True: 0.001, False: 0.999})

# P(E) - Prior probability of earthquake
bn.add_node('E', [], {True: 0.002, False: 0.998})

# P(A|B,E) - Alarm given burglary and earthquake
bn.add_node('A', ['B', 'E'], {
    (True, True, True): 0.95,    # Both causes
    (True, True, False): 0.05,
    (True, False, True): 0.94,   # Burglary only
    (True, False, False): 0.06,
    (False, True, True): 0.29,   # Earthquake only
    (False, True, False): 0.71,
    (False, False, True): 0.001, # Neither
    (False, False, False): 0.999
})

# P(J|A) - John calls given alarm
bn.add_node('J', ['A'], {
    (True, True): 0.90,
    (True, False): 0.10,
    (False, True): 0.05,
    (False, False): 0.95
})

# P(M|A) - Mary calls given alarm
bn.add_node('M', ['A'], {
    (True, True): 0.70,
    (True, False): 0.30,
    (False, True): 0.01,
    (False, False): 0.99
})

print("Bayesian Network constructed with 5 nodes")
```

## Conditional Independence in Bayesian Networks

The graph structure encodes powerful conditional independence relationships. A variable is conditionally independent of its non-descendants given its parents:

$$X_i \perp \text{NonDescendants}(X_i) \, | \, \text{Parents}(X_i)$$

This is called the **local Markov property** and is the key to efficient inference.

**Example:**

In the alarm network:
- Burglary and Earthquake are (unconditionally) independent: $B \perp E$
- John and Mary are independent given Alarm: $J \perp M \, | \, A$
- Burglary and Mary are dependent (through Alarm), but conditionally independent given Alarm: $B \perp M \, | \, A$

## D-Separation

D-separation (directed separation) is a graphical criterion for determining conditional independence from the network structure alone, without examining probability values.

**Three Basic Connection Types:**

1. **Chain**: $X \rightarrow Y \rightarrow Z$
   - $X$ and $Z$ are dependent
   - $X \perp Z \, | \, Y$ (conditionally independent given $Y$)

2. **Fork**: $X \leftarrow Y \rightarrow Z$
   - $X$ and $Z$ are dependent (common cause)
   - $X \perp Z \, | \, Y$ (conditionally independent given $Y$)

3. **Collider (V-structure)**: $X \rightarrow Y \leftarrow Z$
   - $X$ and $Z$ are independent
   - $X$ and $Z$ become dependent given $Y$ (explaining away effect)

**D-Separation Algorithm:**

Two sets of variables $X$ and $Z$ are d-separated by $Y$ if every undirected path between $X$ and $Z$ is "blocked" by $Y$. A path is blocked if:
- It contains a chain or fork with the middle node in $Y$, OR
- It contains a collider where neither the collider nor its descendants are in $Y$

If $X$ and $Z$ are d-separated by $Y$, then $X \perp Z \, | \, Y$ in all distributions that factorize according to the network.

```python
def find_d_separation(graph, X, Z, Y):
    """
    Check if X and Z are d-separated by Y.

    Args:
        graph: Dict mapping nodes to parents
        X: Set of query variables
        Z: Set of target variables
        Y: Set of observed variables

    Returns:
        Boolean indicating d-separation
    """
    # Simplified implementation for demonstration
    # Real implementation requires path enumeration

    def is_path_blocked(path, observed):
        """Check if a path is blocked by observed variables."""
        for i in range(len(path) - 1):
            prev_node = path[i-1] if i > 0 else None
            curr_node = path[i]
            next_node = path[i+1]

            # Check for collider
            if (prev_node and next_node and
                curr_node not in graph.get(prev_node, []) and
                curr_node not in graph.get(next_node, [])):
                # Collider: blocked unless curr_node or descendant in observed
                if curr_node not in observed:
                    return True
            # Chain or fork: blocked if curr_node in observed
            elif curr_node in observed:
                return True

        return False

    # This is a simplified check
    # Full implementation needs to enumerate all paths
    return False  # Placeholder

# Example usage
graph = {
    'A': ['B', 'E'],
    'J': ['A'],
    'M': ['A']
}

print("D-separation checking requires path analysis")
```

## Constructing Bayesian Networks

Building a Bayesian network involves two steps:

**1. Structure Learning:**
- Identify variables and their dependencies
- Create DAG structure
- Can be done manually (domain knowledge) or automatically (from data)

**2. Parameter Learning:**
- Estimate conditional probability tables
- Use maximum likelihood estimation from data
- Apply Bayesian methods for uncertainty in parameters

**Design Principles:**

- **Causal direction**: Edges should follow causal relationships when possible
- **Minimize parents**: Fewer parents means smaller CPTs and faster inference
- **Exploit independence**: Use domain knowledge to identify conditional independencies
- **Avoid cycles**: Must maintain DAG property

```python
def learn_cpt_from_data(data, variable, parents):
    """
    Learn CPT from data using maximum likelihood estimation.

    Args:
        data: List of samples (dicts mapping variables to values)
        variable: Target variable
        parents: List of parent variables

    Returns:
        Conditional probability table
    """
    from collections import Counter

    # Count occurrences
    counts = Counter()
    parent_counts = Counter()

    for sample in data:
        parent_values = tuple(sample[p] for p in parents)
        var_value = sample[variable]

        counts[(parent_values, var_value)] += 1
        parent_counts[parent_values] += 1

    # Compute conditional probabilities
    cpt = {}
    for (parent_vals, var_val), count in counts.items():
        total = parent_counts[parent_vals]
        cpt[parent_vals + (var_val,)] = count / total

    return cpt

# Example: Learn from data
training_data = [
    {'B': False, 'E': False, 'A': False, 'J': False, 'M': False},
    {'B': True, 'E': False, 'A': True, 'J': True, 'M': True},
    {'B': False, 'E': False, 'A': False, 'J': False, 'M': False},
    # ... more samples
]

# Learn P(A|B,E)
cpt_alarm = learn_cpt_from_data(training_data, 'A', ['B', 'E'])
print(f"Learned CPT for Alarm: {len(cpt_alarm)} entries")
```

## Applications and Advantages

**Advantages of Bayesian Networks:**

1. **Compact representation**: Exponentially fewer parameters than full joint distribution
2. **Interpretable structure**: Graph shows relationships clearly
3. **Handles missing data**: Can perform inference with incomplete observations
4. **Combines prior knowledge and data**: Prior knowledge in structure, data for parameters
5. **Bidirectional reasoning**: Can reason from causes to effects or effects to causes

**Common Applications:**

- Medical diagnosis (e.g., disease networks)
- Fault diagnosis in systems
- Spam filtering
- Genetic regulatory networks
- Risk assessment
- Decision support systems

## Key Takeaways

1. **Bayesian networks** use directed acyclic graphs to represent joint probability distributions compactly
2. The **chain rule factorization** decomposes the joint into local conditional probabilities
3. **Conditional independence** is encoded in the graph structure, reducing parameters exponentially
4. **D-separation** provides a graphical test for conditional independence without computing probabilities
5. **Three connection types** (chain, fork, collider) determine how information flows through the network
6. **Explaining away** occurs at colliders, where independent causes become dependent given the effect
7. **Construction** requires both structure learning (identifying dependencies) and parameter learning (estimating CPTs)
8. Bayesian networks enable **efficient inference** by exploiting the factored representation

Bayesian networks provide a principled framework for reasoning under uncertainty that scales to complex real-world problems. Their combination of graphical structure and probability theory makes them invaluable for AI systems that must make decisions with incomplete information.
