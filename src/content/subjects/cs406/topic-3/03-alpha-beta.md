---
title: "Alpha-Beta Pruning"
slug: "alpha-beta"
description: "Alpha-beta pruning algorithm for efficient game tree search"
---

# Alpha-Beta Pruning

## Introduction

Alpha-beta pruning dramatically reduces the number of nodes minimax must explore without affecting the final decision. It maintains two values (alpha, beta) representing bounds on the minimax value.

## Algorithm

```python
def alpha_beta_search(state, game):
    def max_value(state, alpha, beta):
        if game.terminal(state):
            return game.utility(state)
        v = float('-inf')
        for action in game.actions(state):
            v = max(v, min_value(game.result(state, action), alpha, beta))
            if v >= beta:
                return v  # Beta cutoff
            alpha = max(alpha, v)
        return v
    
    def min_value(state, alpha, beta):
        if game.terminal(state):
            return game.utility(state)
        v = float('inf')
        for action in game.actions(state):
            v = min(v, max_value(game.result(state, action), alpha, beta))
            if v <= alpha:
                return v  # Alpha cutoff
            beta = min(beta, v)
        return v
    
    alpha, beta = float('-inf'), float('inf')
    return max(game.actions(state),
               key=lambda a: min_value(game.result(state, a), alpha, beta))
```

**Alpha ($\alpha$)**: Best value MAX can guarantee
**Beta ($\beta$)**: Best value MIN can guarantee

**Pruning conditions**:
- At MAX node: if $v \geq \beta$, prune (MIN won't allow this path)
- At MIN node: if $v \leq \alpha$, prune (MAX has better alternative)

## Effectiveness

**Best case**: $O(b^{d/2})$ instead of $O(b^d)$
- Doubles solvable depth!
- If $b=35$, $d=6$: reduces $35^6 = 1.8B$ to $35^3 = 43K$ nodes

**Worst case**: $O(b^d)$ (no pruning if moves poorly ordered)

**Average case**: $O(b^{3d/4})$ with random ordering

## Move Ordering

Better move ordering → more pruning:

```python
def ordered_actions(state, game):
    # Try likely good moves first
    actions = game.actions(state)
    
    # Order by: captures, threats, etc.
    return sorted(actions, key=lambda a: move_priority(state, a), reverse=True)
```

**Techniques**:
- Try capturing moves first
- Try checks/threats
- Use previous search results (iterative deepening)
- Transposition table hits

## Conclusion

Alpha-beta pruning makes minimax practical for complex games. With good move ordering, can search twice as deep in the same time. Combined with evaluation functions and transposition tables, enables strong game-playing AI.
