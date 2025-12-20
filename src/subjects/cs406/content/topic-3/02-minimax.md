---
title: "Minimax Algorithm"
slug: "minimax"  
description: "Minimax algorithm for optimal play in two-player zero-sum games with implementation"
---

# Minimax Algorithm

## Introduction

Minimax is the fundamental algorithm for optimal play in two-player, deterministic, zero-sum games with perfect information. It computes the minimax decision: the move that leads to the best outcome assuming the opponent plays optimally.

## Minimax Principle

**MAX player**: Wants to **maximize** utility
**MIN player**: Wants to **minimize** utility (equivalent to maximizing their own utility in zero-sum game)

**Minimax value** $MINIMAX(s)$:
- If terminal: $UTILITY(s)$
- If MAX to move: $\max_{a \in Actions(s)} MINIMAX(RESULT(s,a))$
- If MIN to move: $\min_{a \in Actions(s)} MINIMAX(RESULT(s,a))$

**Optimal move**: Choose action achieving minimax value

## Algorithm

```python
def minimax_decision(state, game):
    def max_value(state):
        if game.terminal(state):
            return game.utility(state)
        v = float('-inf')
        for action in game.actions(state):
            v = max(v, min_value(game.result(state, action)))
        return v
    
    def min_value(state):
        if game.terminal(state):
            return game.utility(state)
        v = float('inf')
        for action in game.actions(state):
            v = min(v, max_value(game.result(state, action)))
        return v
    
    # Return action with maximum minimax value
    return max(game.actions(state),
               key=lambda a: min_value(game.result(state, a)))
```

## Example: Tic-Tac-Toe

```
MAX's turn (X):
     X | O | X
    -----------
     O | O | 
    -----------
       | X | 

Available actions: [4, 6, 7]

For each action, compute minimum of MIN's responses:
- Action 4: MIN can force utility 0 (draw)
- Action 6: MIN can force utility -1 (O wins)  
- Action 7: MIN can force utility 0 (draw)

Minimax chooses action 4 or 7 (both give utility 0 against optimal opponent)
```

**Complete Game Tree**:
```python
def display_minimax_tree(state, game, depth=0):
    indent = "  " * depth
    if game.terminal(state):
        print(f"{indent}Terminal: utility = {game.utility(state)}")
        return
    
    if depth % 2 == 0:  # MAX
        print(f"{indent}MAX node:")
        for action in game.actions(state):
            print(f"{indent}  Action {action}:")
            display_minimax_tree(game.result(state, action), game, depth+1)
    else:  # MIN
        print(f"{indent}MIN node:")
        for action in game.actions(state):
            print(f"{indent}  Action {action}:")
            display_minimax_tree(game.result(state, action), game, depth+1)
```

## Properties

**Completeness**: Yes (finite game trees)

**Optimality**: Yes (against optimal opponent)

**Time Complexity**: $O(b^m)$ where $b$ = branching factor, $m$ = max depth

**Space Complexity**: $O(bm)$ (depth-first generation)

## Limitations

**Exponential cost**: Chess has $b \approx 35$, typical game $m \approx 100$
- $35^{100}$ positions impossible to explore!

**Solutions**:
1. Depth-limited search + evaluation function
2. Alpha-beta pruning (next topic)
3. Move ordering
4. Transposition tables

## Depth-Limited Minimax

```python
def depth_limited_minimax(state, game, depth, eval_fn):
    def max_value(state, depth):
        if game.terminal(state) or depth == 0:
            return eval_fn(state)
        v = float('-inf')
        for action in game.actions(state):
            v = max(v, min_value(game.result(state, action), depth-1))
        return v
    
    def min_value(state, depth):
        if game.terminal(state) or depth == 0:
            return eval_fn(state)
        v = float('inf')
        for action in game.actions(state):
            v = min(v, max_value(game.result(state, action), depth-1))
        return v
    
    return max(game.actions(state),
               key=lambda a: min_value(game.result(state, action), depth-1))
```

**Evaluation Function**: Estimates utility of non-terminal states
```python
def chess_eval(state):
    # Material value
    material = count_material(state)
    # Positional factors
    position = evaluate_position(state)
    # Mobility
    mobility = count_legal_moves(state)
    
    return material + 0.1*position + 0.01*mobility
```

## Optimality Proof

**Theorem**: Minimax finds optimal strategy for MAX against optimal MIN.

**Proof** (by induction on depth):

**Base case**: At terminal nodes, utility is exact.

**Inductive step**: Assume minimax is optimal for depth $d-1$.

At depth $d$:
- MAX node: Choosing $\max$ of children gives best outcome against optimal MIN
- MIN node: MIN will choose $\min$ (worst for MAX), MAX accounts for this

Therefore minimax is optimal at depth $d$. ∎

## Conclusion

Minimax provides optimal strategy for two-player zero-sum games but has exponential cost. Practical implementations use depth limits, evaluation functions, and alpha-beta pruning to make search tractable. Despite limitations, minimax's theoretical foundation underpins all game-playing AI.
