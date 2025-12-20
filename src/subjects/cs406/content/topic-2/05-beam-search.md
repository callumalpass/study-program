---
title: "Beam Search"
slug: "beam-search"
description: "Beam search algorithm, beam width, stochastic variants, and applications"
---

# Beam Search

## Introduction

Beam search is a heuristic search algorithm that explores a graph by expanding the most promising nodes in a limited set. It maintains k best partial solutions at each level, pruning less promising options to save memory. This makes beam search memory-efficient (stores only k states) while avoiding the myopia of purely greedy search.

**Core Concept**: Like breadth-first search, beam search explores level by level. However, instead of keeping all nodes at each level, it keeps only the k best candidates according to an evaluation function.

Beam search sits between greedy best-first search (k=1) and breadth-first search (k=∞), offering a tunable trade-off between memory efficiency and solution quality. It's particularly valuable when:
- Memory is severely limited
- Search space is enormous
- Good solutions are acceptable (optimality not required)
- An evaluation function can distinguish promising states

## Algorithm

### Basic Beam Search

The standard beam search algorithm maintains a fixed-size set of candidates at each depth level:

```python
def beam_search(problem, k=5):
    """
    Beam search with beam width k

    Args:
        problem: Search problem with initial(), goal_test(), actions(), result()
        k: Beam width (number of candidates to keep)

    Returns:
        Solution path or None if no solution found
    """
    current_level = [problem.initial()]

    while current_level:
        # Check for goal
        for state in current_level:
            if problem.goal_test(state):
                return extract_path(state)

        # Generate all successors
        next_level = []
        for state in current_level:
            for action in problem.actions(state):
                child = problem.result(state, action)
                next_level.append((problem.value(child), child))

        # Keep k best
        next_level.sort(reverse=True)
        current_level = [state for _, state in next_level[:k]]

        if not current_level:
            return None

    return None

def extract_path(state):
    """Reconstruct path from initial to state (assuming parent pointers)"""
    path = []
    while state:
        path.append(state)
        state = state.parent
    return path[::-1]
```

### Complexity Analysis

**Time Complexity**: $O(k \cdot b \cdot d)$
- $k$ states per level
- Each generates $b$ successors (branching factor)
- Search to depth $d$

**Space Complexity**: $O(k)$
- Only k states stored at any time
- Much better than BFS: $O(b^d)$

**Parameters**:
- **k=1**: Greedy search (fast, often poor quality)
- **k=3-10**: Typical beam width (good balance)
- **k=∞**: Breadth-first search (complete, memory-intensive)

### Beam Search with Heuristic

Enhanced version using both path cost and heuristic estimate:

```python
def beam_search_heuristic(problem, heuristic, k=5):
    """Beam search using f(n) = g(n) + h(n) for ranking"""

    # Wrap states with cost tracking
    class Node:
        def __init__(self, state, parent=None, action=None, cost=0):
            self.state = state
            self.parent = parent
            self.action = action
            self.g = cost  # Path cost
            self.h = heuristic(state)  # Heuristic estimate
            self.f = self.g + self.h  # Total estimate

    current_level = [Node(problem.initial())]

    while current_level:
        # Check for goal
        for node in current_level:
            if problem.goal_test(node.state):
                return extract_path_from_node(node)

        # Generate successors
        next_level = []
        for node in current_level:
            for action in problem.actions(node.state):
                child_state = problem.result(node.state, action)
                child_cost = node.g + problem.step_cost(node.state, action)
                child_node = Node(child_state, node, action, child_cost)
                next_level.append(child_node)

        # Keep k best by f-value
        next_level.sort(key=lambda n: n.f)
        current_level = next_level[:k]

        if not current_level:
            return None

    return None
```

## Stochastic Beam Search

Standard beam search deterministically keeps the k best nodes, which can lead to lack of diversity—all k beams may explore similar regions. **Stochastic beam search** addresses this by sampling k nodes probabilistically.

### Algorithm

Instead of keeping k best, sample k states with probability proportional to their evaluation scores:

```python
import random
import math

def stochastic_beam_search(problem, k=5, temperature=1.0):
    """
    Stochastic beam search with probabilistic selection

    Args:
        problem: Search problem
        k: Number of beams
        temperature: Controls randomness (low = more greedy, high = more random)
    """
    current_level = [problem.initial()]

    while current_level:
        # Check for goal
        for state in current_level:
            if problem.goal_test(state):
                return extract_path(state)

        # Generate all successors
        all_successors = []
        for state in current_level:
            for action in problem.actions(state):
                child = problem.result(state, action)
                all_successors.append(child)

        if not all_successors:
            return None

        # Sample k states probabilistically
        values = [problem.value(s) for s in all_successors]
        probabilities = softmax(values, temperature)
        current_level = random.choices(all_successors, probabilities, k=min(k, len(all_successors)))

    return None

def softmax(values, temp=1.0):
    """Convert scores to probability distribution"""
    # Shift values for numerical stability
    shifted = [v - max(values) for v in values]
    exp_values = [math.exp(v / temp) for v in shifted]
    total = sum(exp_values)
    return [e / total for e in exp_values]
```

### Benefits

**Diversity**: Probabilistic selection encourages exploration of diverse regions, reducing the risk of all beams converging to the same suboptimal area.

**Temperature Parameter**:
- **Low temperature** (e.g., 0.1): Nearly deterministic, similar to standard beam search
- **Medium temperature** (e.g., 1.0): Balanced exploration
- **High temperature** (e.g., 10.0): Nearly uniform sampling

## Applications

### Natural Language Processing

Beam search is extensively used in sequence generation tasks:

**Machine Translation**:
```python
def translate_with_beam_search(source_sentence, model, k=5):
    """Generate translation using beam search decoder"""
    # Start with <START> token
    beams = [([START_TOKEN], 0.0)]  # (sequence, log_probability)

    for step in range(MAX_LENGTH):
        candidates = []

        for sequence, score in beams:
            if sequence[-1] == END_TOKEN:
                candidates.append((sequence, score))
                continue

            # Get next word probabilities from model
            probs = model.predict_next(sequence)

            # Expand with top words
            for word, prob in probs.items():
                new_sequence = sequence + [word]
                new_score = score + math.log(prob)
                candidates.append((new_sequence, new_score))

        # Keep k best
        candidates.sort(key=lambda x: x[1], reverse=True)
        beams = candidates[:k]

        # Check if all beams ended
        if all(seq[-1] == END_TOKEN for seq, _ in beams):
            break

    # Return best complete translation
    return beams[0][0]
```

**Typical beam widths**:
- k=1: Greedy decoding (fast, lower quality)
- k=5-10: Standard (good balance)
- k=50+: High quality but slower

**Speech Recognition**:
Beam search decodes acoustic features to text, maintaining k most likely word sequences.

**Text Generation**:
Language models use beam search to generate coherent continuations, avoiding the repetition often seen with greedy decoding.

### Planning and Robotics

**Path Planning**:
Keep k best partial paths, pruning unlikely routes early.

**Task Planning**:
Maintain k most promising partial plans, reducing memory while exploring multiple options.

```python
def robot_planning_beam_search(start_state, goal, k=5):
    """Plan robot actions with beam search"""
    beams = [([start_state], 0)]  # (state_sequence, cost)

    for depth in range(MAX_DEPTH):
        candidates = []

        for path, cost in beams:
            current = path[-1]

            if current == goal:
                return path

            # Try each action
            for action in get_actions(current):
                next_state = apply_action(current, action)
                new_path = path + [next_state]
                new_cost = cost + action_cost(action)
                candidates.append((new_path, new_cost))

        # Keep k lowest-cost paths
        candidates.sort(key=lambda x: x[1])
        beams = candidates[:k]

    return beams[0][0] if beams else None
```

### Optimization Problems

**Feature Selection**:
Select k best feature subsets at each stage, avoiding exhaustive search through all $2^n$ combinations.

**Combinatorial Optimization**:
Prune search space in problems like scheduling, routing, and resource allocation.

## Variants and Enhancements

### Diverse Beam Search

Explicitly enforce diversity by dividing beams into groups:

```python
def diverse_beam_search(problem, k=6, num_groups=3, diversity_penalty=0.5):
    """Beam search with diversity groups"""
    group_size = k // num_groups
    groups = [[problem.initial()] for _ in range(num_groups)]

    while any(groups):
        all_successors = []

        for g, group in enumerate(groups):
            for state in group:
                for action in problem.actions(state):
                    child = problem.result(state, action)
                    score = problem.value(child)

                    # Penalize similarity to other groups
                    for other_g in range(g):
                        for other_state in groups[other_g]:
                            if similar(child, other_state):
                                score -= diversity_penalty

                    all_successors.append((score, child, g))

        # Assign successors to groups
        all_successors.sort(reverse=True)
        groups = [[] for _ in range(num_groups)]

        for score, state, group_id in all_successors[:k]:
            if len(groups[group_id]) < group_size:
                groups[group_id].append(state)

    return best_from_groups(groups)
```

### Adaptive Beam Width

Dynamically adjust beam width based on search progress:

```python
def adaptive_beam_search(problem, initial_k=5, max_k=20):
    """Adjust beam width if not making progress"""
    k = initial_k
    best_score = float('-inf')
    stagnant_steps = 0

    current_level = [problem.initial()]

    for depth in range(MAX_DEPTH):
        # Standard beam search step...

        # Check progress
        current_best = max(problem.value(s) for s in current_level)
        if current_best > best_score:
            best_score = current_best
            stagnant_steps = 0
        else:
            stagnant_steps += 1

        # Increase beam width if stuck
        if stagnant_steps > 3 and k < max_k:
            k = min(k * 2, max_k)
            stagnant_steps = 0
```

## Limitations and Considerations

### Incompleteness

Beam search is **incomplete**—it may miss the optimal solution or any solution:
- Pruning can discard the path to the goal
- No guarantee of finding solution even if one exists
- Quality depends heavily on evaluation function

### Lack of Diversity

All k beams may converge to similar regions, missing better solutions elsewhere. Stochastic or diverse variants help but don't eliminate this issue.

### Sensitivity to Beam Width

- **Too small** (k=1-2): Acts like greedy search, poor quality
- **Too large** (k=100+): Approaches exhaustive search, memory issues
- **Optimal k**: Problem-dependent, often found empirically

### No Optimality Guarantees

Unlike A* with admissible heuristic, beam search provides no optimality guarantees. It trades completeness and optimality for efficiency.

## Key Takeaways

1. **Beam search** keeps k best candidates per level, balancing memory and solution quality
2. **Space complexity** is $O(k)$ vs $O(b^d)$ for BFS—crucial for large problems
3. **Beam width k** controls the exploration-efficiency trade-off
4. **Stochastic variants** use probabilistic selection for better diversity
5. **NLP applications** extensively use beam search for translation, generation, and speech recognition
6. **Incompleteness** means it may miss optimal solutions, unlike A*
7. **Diversity mechanisms** help prevent all beams from converging to the same region
8. **Practical effectiveness** depends on evaluation function quality

## Conclusion

Beam search balances completeness and efficiency, making it invaluable when memory is limited but greedy search is too myopic. While incomplete and non-optimal, it often finds good solutions quickly with far less memory than exhaustive methods. Its widespread use in modern NLP systems—powering machine translation, speech recognition, and text generation—demonstrates its practical value. The key to effective beam search is choosing appropriate beam width and evaluation function for the specific problem domain.
