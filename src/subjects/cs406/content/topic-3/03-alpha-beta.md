---
title: "Alpha-Beta Pruning"
slug: "alpha-beta"
description: "Alpha-beta pruning algorithm for efficient game tree search"
---

# Alpha-Beta Pruning

## Introduction

Alpha-beta pruning is a dramatic optimization to the minimax algorithm that can reduce the number of nodes evaluated by orders of magnitude without affecting the final decision. The key insight is that we can often prove that certain branches of the game tree cannot possibly influence the final decision, so we can safely skip exploring them entirely.

The algorithm was first described by researchers at Carnegie Mellon University in 1958 and has since become a fundamental technique in game-playing AI. Alpha-beta pruning maintains two values—alpha and beta—that represent bounds on the minimax value as the search progresses. These bounds allow the algorithm to detect when further exploration of a branch is unnecessary.

The beauty of alpha-beta pruning is that it returns exactly the same move as minimax—it's provably equivalent—but can run dramatically faster. In the best case with optimal move ordering, alpha-beta effectively doubles the depth we can search in the same amount of time. This doubling of search depth can make the difference between amateur-level and expert-level play.

## The Pruning Principle

The fundamental idea behind alpha-beta pruning is maintaining two bounds:

**Alpha ($\alpha$)**: The best value (highest) that MAX can guarantee so far along the path to the root. If we're exploring a MIN node and find a value less than or equal to alpha, MAX will never allow play to reach this node because MAX has a better alternative higher in the tree.

**Beta ($\beta$)**: The best value (lowest) that MIN can guarantee so far along the path to the root. If we're exploring a MAX node and find a value greater than or equal to beta, MIN will never allow play to reach this node because MIN has a better alternative higher in the tree.

**Pruning conditions**:
- **At MAX node**: If $v \geq \beta$, prune remaining siblings (beta cutoff). MIN won't choose this path because MIN can force a lower value elsewhere.
- **At MIN node**: If $v \leq \alpha$, prune remaining siblings (alpha cutoff). MAX won't choose this path because MAX can force a higher value elsewhere.

Initially, alpha starts at $-\infty$ (MAX has no guaranteed value yet) and beta starts at $+\infty$ (MIN has no guaranteed value yet). As we explore the tree, these bounds tighten, allowing us to prune more aggressively.

## Algorithm

The alpha-beta algorithm extends minimax by passing alpha and beta bounds down the tree and checking for pruning opportunities.

```python
def alpha_beta_search(state, game):
    """Return the best action using alpha-beta pruning"""
    def max_value(state, alpha, beta):
        """Compute value for MAX node with alpha-beta bounds"""
        if game.terminal(state):
            return game.utility(state)

        v = float('-inf')
        for action in game.actions(state):
            v = max(v, min_value(game.result(state, action), alpha, beta))
            if v >= beta:
                return v  # Beta cutoff: MIN will avoid this branch
            alpha = max(alpha, v)  # Update MAX's best guarantee
        return v

    def min_value(state, alpha, beta):
        """Compute value for MIN node with alpha-beta bounds"""
        if game.terminal(state):
            return game.utility(state)

        v = float('inf')
        for action in game.actions(state):
            v = min(v, max_value(game.result(state, action), alpha, beta))
            if v <= alpha:
                return v  # Alpha cutoff: MAX will avoid this branch
            beta = min(beta, v)  # Update MIN's best guarantee
        return v

    # Initialize bounds and find best action
    alpha, beta = float('-inf'), float('inf')
    best_action = None
    best_value = float('-inf')

    for action in game.actions(state):
        value = min_value(game.result(state, action), alpha, beta)
        if value > best_value:
            best_value = value
            best_action = action
        alpha = max(alpha, value)

    return best_action
```

The algorithm is almost identical to minimax, with the key differences being:
1. Alpha and beta parameters are passed down the tree
2. After computing each child's value, we check if we can prune
3. We update alpha at MAX nodes and beta at MIN nodes

## Pruning Example

Consider this game tree fragment:

```
         MAX (α=-∞, β=+∞)
        /    |    \
       /     |     \
     MIN    MIN    MIN
    / | \   (α=3)
   3  12 8
```

At the first MIN node, we find values 3, 12, 8. MIN chooses 3, so alpha becomes 3 (MAX can guarantee at least 3).

Now at the second MIN node:
- We evaluate first child and find value 2
- Since 2 ≤ 3 (alpha), we can prune the rest of this branch!
- MAX won't choose this path anyway because MAX already has a way to guarantee 3

This simple example shows how alpha-beta avoids unnecessary work.

## Effectiveness and Complexity

The effectiveness of alpha-beta pruning depends critically on move ordering—the order in which we examine children at each node.

**Best case** (perfect move ordering): $O(b^{d/2})$ instead of $O(b^d)$
- Effectively doubles the solvable search depth!
- For chess with $b=35$ and $d=6$: reduces $35^6 \approx 1.8$ billion nodes to $35^3 \approx 43$ thousand nodes
- This is a reduction factor of about 42,000!

**Worst case** (terrible move ordering): $O(b^d)$
- No pruning occurs if we always examine worst moves first
- Same as basic minimax

**Average case** (random move ordering): $O(b^{3d/4})$
- Still a significant improvement over minimax
- But not as dramatic as the best case

The best case occurs when we always examine the best move first at each node. In this case, the first move establishes a bound that causes all siblings to be pruned. The worst case occurs when we always examine the best move last, preventing any pruning.

**Practical performance**: With good move ordering heuristics, alpha-beta typically achieves performance close to the best case, making it dramatically superior to plain minimax.

## Move Ordering

Since alpha-beta's effectiveness depends on move ordering, it's crucial to examine promising moves first.

```python
def ordered_actions(state, game, transposition_table=None):
    """Order moves to maximize alpha-beta pruning"""
    actions = game.actions(state)

    # Score each move based on various heuristics
    def move_priority(action):
        score = 0

        # Check transposition table first (best source of info)
        if transposition_table and action in transposition_table:
            score += 10000  # Highest priority

        # Captures are usually good
        if is_capture(state, action):
            score += 1000 + captured_piece_value(state, action)

        # Checks and threats
        if gives_check(state, action):
            score += 500

        # Central control (for chess-like games)
        score += centrality_score(action)

        # Killer moves (moves that caused cutoffs at same depth)
        if is_killer_move(action):
            score += 100

        return score

    # Sort actions by priority (highest first)
    return sorted(actions, key=move_priority, reverse=True)
```

**Key move ordering techniques**:

1. **Transposition table hits**: If we've already evaluated this position in a different part of the tree, use that information
2. **Captures**: Moves that capture opponent pieces, especially high-value pieces
3. **Checks**: Moves that check the opponent's king (in chess)
4. **Killer moves**: Moves that caused cutoffs at the same depth in other branches
5. **History heuristic**: Moves that have historically caused cutoffs
6. **Principal variation**: Moves from the best line found in a previous iteration (with iterative deepening)
7. **MVV-LVA** (Most Valuable Victim - Least Valuable Attacker): Captures ordered by value difference

## Iterative Deepening

Alpha-beta is often combined with iterative deepening to improve move ordering:

```python
def iterative_deepening_alpha_beta(state, game, max_depth, time_limit):
    """Repeatedly search at increasing depths"""
    best_move = None

    for depth in range(1, max_depth + 1):
        if time_exceeded(time_limit):
            break

        # Use best move from previous iteration to order moves
        move = alpha_beta_search(state, game, depth, best_move)
        best_move = move

    return best_move
```

This approach has several advantages:
- Provides move ordering for deeper searches
- Can return best move found so far if time runs out
- Enables time management in competitive play

## Transposition Tables

Games often reach the same position through different move sequences (transpositions). A transposition table caches previously computed values:

```python
class TranspositionTable:
    def __init__(self):
        self.table = {}

    def lookup(self, state, depth, alpha, beta):
        """Check if we've already evaluated this position"""
        key = hash(state)
        if key in self.table:
            entry = self.table[key]
            if entry['depth'] >= depth:
                # Can use this value if it's from deep enough search
                return entry['value']
        return None

    def store(self, state, depth, value):
        """Store evaluated position"""
        key = hash(state)
        self.table[key] = {'depth': depth, 'value': value}
```

Transposition tables can reduce effective branching factor significantly, especially in chess endgames where many move sequences lead to the same position.

## Enhancements and Variations

Several refinements to basic alpha-beta pruning exist:

1. **Aspiration windows**: Search with narrow alpha-beta window around expected value, re-search if value falls outside
2. **Null move pruning**: Try passing the turn to opponent to get quick lower bound
3. **Late move reductions**: Search later moves (after good ones) to reduced depth
4. **Futility pruning**: Skip moves that appear too weak to raise alpha

## Key Takeaways

1. **Pruning is safe**: Alpha-beta returns the same result as minimax, guaranteed
2. **Order matters**: Move ordering is critical for effectiveness
3. **Exponential speedup**: Best case doubles search depth (equivalent to exponential speedup)
4. **Practical impact**: Transforms intractable problems into solvable ones
5. **Foundation**: Basis for all modern game-playing programs

## Conclusion

Alpha-beta pruning makes minimax practical for complex games like chess, checkers, and Go (before Monte Carlo methods). With good move ordering, it can search roughly twice as deep in the same time, which translates to dramatically stronger play. Combined with evaluation functions, transposition tables, iterative deepening, and other enhancements, alpha-beta pruning forms the backbone of classical game-playing AI. Modern chess engines still use alpha-beta at their core, augmented with sophisticated evaluation functions and search extensions that have been refined over decades.
