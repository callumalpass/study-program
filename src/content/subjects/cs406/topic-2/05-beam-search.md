---
title: "Beam Search"
slug: "beam-search"
description: "Beam search algorithm, beam width, stochastic variants, and applications"
---

# Beam Search

## Introduction

Beam search maintains k best partial solutions, pruning less promising options. It's memory-efficient (stores only k states) while avoiding the myopia of greedy search.

**Concept**: Like breadth-first search but keep only k best nodes at each level.

## Algorithm

```python
def beam_search(problem, k=5):
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
```

**Parameters**:
- k=1: Greedy search
- k=∞: Breadth-first search
- k=3-10: Typical beam width

## Stochastic Beam Search

Instead of keeping k best, sample k states with probability ∝ value.

```python
def stochastic_beam_search(problem, k=5):
    current_level = [problem.initial()]
    
    while current_level:
        # Generate successors
        all_successors = []
        for state in current_level:
            for action in problem.actions(state):
                child = problem.result(state, action)
                all_successors.append(child)
        
        # Sample k states
        values = [problem.value(s) for s in all_successors]
        probabilities = softmax(values)
        current_level = random.choices(all_successors, probabilities, k=k)
    
    return best_state

def softmax(values, temp=1.0):
    exp_values = [math.exp(v/temp) for v in values]
    total = sum(exp_values)
    return [e/total for e in exp_values]
```

## Applications

**Natural Language Processing**:
- Machine translation (k=5-10 typical)
- Speech recognition beam search decoder
- Text generation with beam search

**Planning**:
- Keep k best partial plans
- Prune unlikely branches early

## Limitations

- Incomplete (may miss optimal solution)
- Can concentrate in one region (lack diversity)
- Sensitive to beam width choice

## Conclusion

Beam search balances completeness and efficiency. Useful when memory is limited but need better than greedy. Widely used in NLP applications.
