---
title: "Minimax Algorithm"
slug: "minimax"
description: "Minimax algorithm for optimal play in two-player zero-sum games with implementation"
---

# Minimax Algorithm

## Introduction

Minimax is the fundamental algorithm for optimal play in two-player, deterministic, zero-sum games with perfect information. It computes the minimax decision: the move that leads to the best outcome assuming the opponent plays optimally. The algorithm gets its name from the fact that it minimizes the maximum possible loss—a conservative strategy that guarantees the best worst-case outcome.

The minimax algorithm revolutionized game playing when it was first formalized in the 1920s by John von Neumann as part of his foundational work on game theory. It provides both a practical algorithm for game-playing programs and a theoretical framework for understanding optimal strategic behavior. While modern game-playing AI often uses more sophisticated techniques, minimax remains the conceptual foundation upon which all adversarial search algorithms are built.

The key insight of minimax is that in a zero-sum game, we can assume our opponent will play optimally against us. Rather than hoping for opponent mistakes, minimax plans for the worst case: what if the opponent makes the best possible move at every turn? By considering this adversarial behavior, minimax finds moves that maximize our guaranteed minimum payoff, regardless of what the opponent does.

## Minimax Principle

**MAX player**: Wants to **maximize** the utility value
**MIN player**: Wants to **minimize** the utility value (which is equivalent to maximizing their own utility in a zero-sum game)

The **minimax value** of a state $s$, denoted $MINIMAX(s)$, is defined recursively:

- If $s$ is terminal: $MINIMAX(s) = UTILITY(s)$
- If MAX is to move: $MINIMAX(s) = \max_{a \in ACTIONS(s)} MINIMAX(RESULT(s,a))$
- If MIN is to move: $MINIMAX(s) = \min_{a \in ACTIONS(s)} MINIMAX(RESULT(s,a))$

The **optimal move** for the player to move is the action that achieves the minimax value. For MAX, this means choosing the action with the maximum minimax value; for MIN, choosing the action with the minimum minimax value.

This recursive definition naturally corresponds to a depth-first traversal of the game tree, where values propagate upward from terminal nodes. At MAX nodes, we take the maximum of child values; at MIN nodes, we take the minimum.

## Algorithm

The minimax algorithm is typically implemented using two mutually recursive functions: one for MAX nodes and one for MIN nodes.

```python
def minimax_decision(state, game):
    """Return the best action for the current player using minimax"""
    def max_value(state):
        """Compute minimax value for a MAX node"""
        if game.terminal(state):
            return game.utility(state)
        v = float('-inf')
        for action in game.actions(state):
            v = max(v, min_value(game.result(state, action)))
        return v

    def min_value(state):
        """Compute minimax value for a MIN node"""
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

The algorithm explores the game tree depth-first. At each MAX node, it recursively computes the minimax value of each successor and returns the maximum. At each MIN node, it returns the minimum of its successors. Terminal nodes return their utility directly.

## Example: Tic-Tac-Toe

Consider this tic-tac-toe position where MAX (X) is to move:

```
MAX's turn (X):
     X | O | X
    -----------
     O | O |
    -----------
       | X |

Available actions: [4, 6, 7]
```

To apply minimax, we analyze each possible move:

**Action 4** (center position):
- Results in: `X|O|X / O|X|O / _|X|_`
- MIN (O) can respond with move 6 or 7
- Both lead to draws with optimal play
- Minimax value: 0

**Action 6** (bottom-left):
- Results in: `X|O|X / O|O|_ / X|X|_`
- MIN (O) moves to position 5, completing the middle row
- MIN wins!
- Minimax value: -1

**Action 7** (bottom-middle):
- Results in: `X|O|X / O|O|_ / _|X|_`
- MIN's best response doesn't lead to a win
- Results in draw with optimal play
- Minimax value: 0

**Minimax decision**: Choose action 4 or 7 (both guarantee a draw, which is the best possible outcome against optimal play).

**Complete Game Tree Visualization**:
```python
def display_minimax_tree(state, game, depth=0):
    """Recursively display the minimax game tree"""
    indent = "  " * depth
    if game.terminal(state):
        print(f"{indent}Terminal: utility = {game.utility(state)}")
        return

    if depth % 2 == 0:  # MAX node
        print(f"{indent}MAX node:")
        values = []
        for action in game.actions(state):
            print(f"{indent}  Action {action}:")
            val = display_minimax_tree(game.result(state, action), game, depth+1)
            values.append(val)
        minimax_val = max(values)
        print(f"{indent}Minimax value: {minimax_val}")
        return minimax_val
    else:  # MIN node
        print(f"{indent}MIN node:")
        values = []
        for action in game.actions(state):
            print(f"{indent}  Action {action}:")
            val = display_minimax_tree(game.result(state, action), game, depth+1)
            values.append(val)
        minimax_val = min(values)
        print(f"{indent}Minimax value: {minimax_val}")
        return minimax_val
```

## Properties

**Completeness**: Yes, minimax is complete for finite game trees. It will always find a move (assuming at least one legal move exists).

**Optimality**: Yes, minimax finds the optimal strategy against an optimal opponent. No other strategy can guarantee a better outcome.

**Time Complexity**: $O(b^m)$ where $b$ is the branching factor (average number of legal moves per position) and $m$ is the maximum depth of the tree (length of the longest game). This is exponential in the game length.

**Space Complexity**: $O(bm)$ when using depth-first generation of the game tree. We only need to store the path from root to current node plus siblings at each level.

## Limitations

**Exponential Time Complexity**: The main limitation of minimax is its exponential time complexity.

For chess:
- Branching factor $b \approx 35$ (average legal moves)
- Typical game length $m \approx 80$ moves (160 plies)
- Complete game tree: $35^{160} \approx 10^{240}$ positions
- Observable universe contains only $\approx 10^{80}$ atoms!

Clearly, we cannot explore the complete game tree for chess or other complex games.

**Practical Solutions**:

1. **Depth-limited search + evaluation function**: Stop searching at a fixed depth and estimate position values
2. **Alpha-beta pruning**: Eliminate branches that cannot affect the final decision (covered in next topic)
3. **Move ordering**: Examine promising moves first to maximize pruning
4. **Transposition tables**: Cache previously computed positions to avoid redundant work
5. **Iterative deepening**: Gradually increase search depth, using results from shallow searches to order moves

## Depth-Limited Minimax

For complex games, we must limit search depth and use an evaluation function to estimate the value of non-terminal positions.

```python
def depth_limited_minimax(state, game, depth, eval_fn):
    """Minimax with depth limit and evaluation function"""
    def max_value(state, depth):
        # Base cases: terminal state or depth limit reached
        if game.terminal(state):
            return game.utility(state)
        if depth == 0:
            return eval_fn(state)

        v = float('-inf')
        for action in game.actions(state):
            v = max(v, min_value(game.result(state, action), depth-1))
        return v

    def min_value(state, depth):
        # Base cases: terminal state or depth limit reached
        if game.terminal(state):
            return game.utility(state)
        if depth == 0:
            return eval_fn(state)

        v = float('inf')
        for action in game.actions(state):
            v = min(v, max_value(game.result(state, action), depth-1))
        return v

    # Choose action with best minimax value at given depth
    return max(game.actions(state),
               key=lambda a: min_value(game.result(state, a), depth-1))
```

**Evaluation Function Example**: For chess, a simple evaluation function might combine material count, positional advantages, and mobility.

```python
def chess_eval(state):
    """Evaluate a chess position from MAX's perspective"""
    # Material value: sum of piece values
    piece_values = {'P': 1, 'N': 3, 'B': 3, 'R': 5, 'Q': 9, 'K': 0}
    material = sum(piece_values.get(piece.type, 0) * (1 if piece.color == 'white' else -1)
                   for piece in state.pieces)

    # Positional factors: control of center, king safety, pawn structure
    position = evaluate_position(state)

    # Mobility: number of legal moves available
    mobility = len(list(state.legal_moves))

    # Weighted combination
    return material + 0.1*position + 0.01*mobility
```

The quality of the evaluation function is crucial for strength of play. Modern chess engines use sophisticated evaluation functions with hundreds of features, often tuned by machine learning on millions of games.

## Optimality Proof

**Theorem**: Minimax finds the optimal strategy for MAX against an optimal MIN player.

**Proof** (by induction on tree depth):

**Base case** (depth 0): At terminal nodes, the minimax value equals the actual utility. This is trivially optimal.

**Inductive hypothesis**: Assume minimax is optimal for all game trees of depth $d-1$ or less.

**Inductive step**: Consider a game tree of depth $d$.

Case 1: Root is a MAX node
- Let $a^*$ be the action chosen by minimax
- By the inductive hypothesis, the minimax value of each child is optimal for that subtree
- MAX chooses the child with maximum minimax value
- No other action can give MAX a better guaranteed outcome against optimal MIN
- Therefore, $a^*$ is optimal

Case 2: Root is a MIN node
- Symmetric argument: MIN chooses the minimum, which is worst for MAX
- This is exactly what MAX assumes in computing minimax values
- Therefore the minimax value correctly represents optimal play

By induction, minimax is optimal for game trees of any finite depth. ∎

This proof formalizes the intuition that minimax is optimal because it correctly models adversarial behavior: MAX assumes MIN will minimize, and MIN assumes MAX will maximize.

## Key Takeaways

1. **Optimal play**: Minimax finds the best strategy assuming both players play optimally
2. **Recursive structure**: Minimax values propagate up from terminal nodes
3. **Exponential complexity**: Minimax explores $O(b^m)$ nodes, impractical for complex games
4. **Depth limiting**: Practical implementations use depth limits with evaluation functions
5. **Foundation**: Minimax provides the theoretical basis for all adversarial search

## Conclusion

Minimax provides the optimal strategy for two-player zero-sum games but has exponential computational cost. For complex games like chess, practical implementations must use depth limits combined with evaluation functions to estimate position values. Despite this limitation, minimax's theoretical foundation underpins all game-playing AI. Modern improvements like alpha-beta pruning, transposition tables, and neural network evaluation functions build upon the core minimax framework, making it possible to play games at superhuman levels.
