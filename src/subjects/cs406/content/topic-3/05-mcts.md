---
title: "Monte Carlo Tree Search"
slug: "mcts"
description: "Monte Carlo Tree Search algorithm for game playing with random simulations"
---

# Monte Carlo Tree Search

## Introduction

Monte Carlo Tree Search (MCTS) represents a paradigm shift in game-playing AI. Unlike minimax and alpha-beta pruning, which rely on handcrafted evaluation functions to estimate position values, MCTS uses random simulations (called playouts or rollouts) to evaluate positions empirically. This approach proved revolutionary for games like Go, where designing good evaluation functions had eluded researchers for decades.

MCTS rose to prominence with the success of AlphaGo, which used MCTS guided by deep neural networks to defeat the world champion Go player in 2016. The algorithm's key innovation is its ability to intelligently explore the game tree by balancing exploitation (focusing on promising moves) with exploration (trying less-visited moves that might be better). This balance is achieved through the Upper Confidence Bounds (UCB) formula, which has theoretical guarantees from multi-armed bandit theory.

The fundamental idea is beautifully simple: to evaluate a position, play out random games from that position many times and see who wins. If a move leads to positions where random play wins 70% of the time, that's probably a good move. Over many iterations, MCTS builds a statistical picture of which moves are promising without needing to understand why they're good—the wins and losses speak for themselves.

## The Four Phases of MCTS

MCTS operates in four distinct phases, repeated many times to build up statistics:

### 1. Selection

Starting from the root (current position), traverse the tree by selecting children using a selection policy. The most common policy is UCB1 (Upper Confidence Bound), which balances exploitation of known good moves with exploration of uncertain moves.

### 2. Expansion

When we reach a node with unexplored children, add one or more children to the tree. Typically, we add one child per iteration.

### 3. Simulation (Rollout)

From the newly added node, play out the game to completion using a simple policy (often random moves, or "heavy" playouts with basic heuristics). Record the outcome.

### 4. Backpropagation

Propagate the simulation result back up the tree to the root, updating visit counts and win statistics for each node along the path.

After many iterations, select the child of the root with the best statistics (usually most visits or highest win rate).

## UCT Algorithm Implementation

UCT (Upper Confidence bounds applied to Trees) is the most popular MCTS variant:

```python
import math
import random

class Node:
    """Node in the MCTS tree"""
    def __init__(self, state, parent=None, move=None):
        self.state = state
        self.parent = parent
        self.move = move  # Move that led to this node
        self.children = []
        self.untried_moves = state.get_legal_moves()
        self.visits = 0
        self.wins = 0.0

    def select_child(self):
        """Select child with highest UCB1 value"""
        return max(self.children, key=lambda c: c.ucb1())

    def ucb1(self, exploration_constant=1.414):
        """Calculate UCB1 value for this node"""
        if self.visits == 0:
            return float('inf')  # Unvisited nodes have infinite value

        exploitation = self.wins / self.visits
        exploration = exploration_constant * math.sqrt(math.log(self.parent.visits) / self.visits)
        return exploitation + exploration

    def add_child(self, move, state):
        """Add a child node for the given move"""
        child = Node(state, parent=self, move=move)
        self.untried_moves.remove(move)
        self.children.append(child)
        return child

    def update(self, result):
        """Update node statistics from simulation result"""
        self.visits += 1
        self.wins += result  # result is 1 for win, 0.5 for draw, 0 for loss

def uct_search(root_state, iterations=10000):
    """Perform UCT search from root state"""
    root = Node(root_state)

    for _ in range(iterations):
        node = root
        state = root_state.clone()

        # 1. Selection - traverse tree using UCB1
        while node.untried_moves == [] and node.children != []:
            node = node.select_child()
            state.apply_move(node.move)

        # 2. Expansion - add a new child node
        if node.untried_moves != []:
            move = random.choice(node.untried_moves)
            state.apply_move(move)
            node = node.add_child(move, state)

        # 3. Simulation - play out randomly to terminal state
        while not state.is_terminal():
            move = random.choice(state.get_legal_moves())
            state.apply_move(move)

        # 4. Backpropagation - update statistics
        result = state.get_result(root_state.current_player)
        while node is not None:
            node.update(result)
            node = node.parent
            result = 1 - result  # Flip result for opponent

    # Return move with most visits (most robust)
    return max(root.children, key=lambda c: c.visits).move
```

## The UCB1 Formula

The Upper Confidence Bound formula is the heart of MCTS:

$$UCB1(i) = \frac{w_i}{n_i} + c\sqrt{\frac{\ln N}{n_i}}$$

Where:
- $w_i$ = number of wins for node $i$
- $n_i$ = number of visits to node $i$
- $N$ = total visits to parent node
- $c$ = exploration constant (typically $\sqrt{2}$ or $1.414$)

**Exploitation term** $\frac{w_i}{n_i}$: Average reward from this node (win rate)

**Exploration term** $c\sqrt{\frac{\ln N}{n_i}}$: Uncertainty bonus that grows as the node is relatively less visited

The formula ensures that:
- Nodes with high win rates are favored (exploitation)
- Nodes with few visits get bonus encouragement (exploration)
- The exploration bonus decreases as nodes are visited more
- The exploration bonus increases as siblings are visited more

This creates an elegant balance: initially explore broadly, but gradually focus on promising regions as statistics become reliable.

## Theoretical Properties

MCTS has appealing theoretical guarantees:

**Convergence**: As the number of iterations approaches infinity, UCT converges to the optimal minimax value with probability 1.

**Anytime algorithm**: Can return a result at any time. More iterations = better result, but even limited iterations give reasonable moves.

**Asymmetric growth**: The tree grows asymmetrically, focusing computational resources on promising branches while barely exploring bad ones. Unlike alpha-beta, which must explore uniformly to some depth.

**Aheuristic**: Doesn't require domain knowledge beyond game rules. The same algorithm works for any game.

## Enhancements to Basic MCTS

### Heavy Playouts

Instead of purely random simulation, use simple heuristics to guide playouts:

```python
def heavy_playout(state):
    """Simulation with heuristics for more realistic play"""
    while not state.is_terminal():
        moves = state.get_legal_moves()

        # Prefer moves that capture opponent pieces
        capture_moves = [m for m in moves if state.is_capture(m)]
        if capture_moves and random.random() < 0.7:
            move = random.choice(capture_moves)
        else:
            move = random.choice(moves)

        state.apply_move(move)

    return state.get_result()
```

Heavy playouts can dramatically improve MCTS performance by making simulations more realistic, though they increase computational cost per simulation.

### RAVE (Rapid Action Value Estimation)

RAVE shares information between different parts of the tree by maintaining statistics for moves regardless of when they're played:

```python
class RAVENode(Node):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.rave_wins = {}  # Wins when move played anywhere in playout
        self.rave_visits = {}  # Visits when move played anywhere

    def rave_value(self, move):
        """RAVE estimate for a move"""
        if move not in self.rave_visits or self.rave_visits[move] == 0:
            return 0.5

        return self.rave_wins[move] / self.rave_visits[move]

    def ucb_rave(self, move, beta=0.5):
        """Combine UCB1 with RAVE"""
        ucb_value = self.ucb1()
        rave_value = self.rave_value(move)
        return (1 - beta) * ucb_value + beta * rave_value
```

### Progressive Widening

For games with large branching factors, don't explore all children initially:

```python
def progressive_widening(node, iterations):
    """Only explore sqrt(visits) children at each node"""
    max_children = int(math.sqrt(node.visits))
    return len(node.children) < max_children and len(node.untried_moves) > 0
```

### Prior Knowledge Integration

Combine MCTS with neural networks (as in AlphaGo/AlphaZero):

```python
class NeuralMCTSNode(Node):
    def __init__(self, state, parent=None, prior=0.0):
        super().__init__(state, parent)
        self.prior = prior  # Prior probability from neural network

    def puct_value(self):
        """PUCT formula used in AlphaGo/AlphaZero"""
        if self.visits == 0:
            q_value = 0
        else:
            q_value = self.wins / self.visits

        u_value = self.prior * math.sqrt(self.parent.visits) / (1 + self.visits)
        return q_value + u_value
```

## MCTS vs Minimax/Alpha-Beta

**Advantages of MCTS**:
- No evaluation function needed (uses simulation instead)
- Asymmetric tree growth (focuses on promising regions)
- Anytime algorithm (can stop at any time)
- Works well for games with large branching factors
- Handles randomness and imperfect information naturally

**Disadvantages of MCTS**:
- Slower convergence than minimax with good evaluation
- Requires many simulations for reliable statistics
- Random playouts may not reflect optimal play
- Less effective for tactical, calculation-heavy games

**When to use each**:
- **MCTS**: Games where evaluation functions are hard to design (Go, General Game Playing), games with large branching factors
- **Alpha-beta**: Games with good evaluation functions (chess), games requiring deep tactical analysis

## Applications

**Go**: AlphaGo used MCTS with neural network guidance to achieve superhuman performance

**General Game Playing**: MCTS works for any game without domain-specific tuning

**Real-Time Strategy**: Games like StarCraft use MCTS for high-level strategic planning

**Planning under Uncertainty**: MCTS handles stochastic environments and partial observability

**Combinatorial Optimization**: Beyond games, MCTS solves scheduling, routing, and other optimization problems

## Complete MCTS Implementation Example

Here's a complete, runnable MCTS implementation for tic-tac-toe:

```python
import random
import math

class TicTacToe:
    def __init__(self):
        self.board = [' '] * 9
        self.current_player = 'X'

    def clone(self):
        new_game = TicTacToe()
        new_game.board = self.board.copy()
        new_game.current_player = self.current_player
        return new_game

    def get_legal_moves(self):
        return [i for i, cell in enumerate(self.board) if cell == ' ']

    def apply_move(self, move):
        self.board[move] = self.current_player
        self.current_player = 'O' if self.current_player == 'X' else 'X'

    def is_terminal(self):
        return self.get_winner() is not None or ' ' not in self.board

    def get_winner(self):
        lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
        for line in lines:
            if self.board[line[0]] == self.board[line[1]] == self.board[line[2]] != ' ':
                return self.board[line[0]]
        return None

    def get_result(self, player):
        winner = self.get_winner()
        if winner == player:
            return 1.0
        elif winner is None:
            return 0.5
        else:
            return 0.0

# Use the Node class and uct_search function defined earlier
# Example usage:
# game = TicTacToe()
# best_move = uct_search(game, iterations=10000)
# game.apply_move(best_move)
```

## Key Takeaways

1. **Simulation-based**: MCTS evaluates positions through random playouts rather than evaluation functions
2. **UCB1 balance**: Elegantly balances exploration and exploitation with theoretical guarantees
3. **Asymmetric growth**: Focuses computational resources on promising branches
4. **Anytime**: Returns reasonable results quickly, improves with more time
5. **Domain-independent**: Works for any game without specialized knowledge

## Conclusion

Monte Carlo Tree Search represents a fundamentally different approach to game playing compared to minimax and alpha-beta pruning. By using random simulations rather than evaluation functions, MCTS excels in domains where positions are hard to evaluate but easy to play out. The UCB1 formula provides an elegant solution to the exploration-exploitation dilemma, with theoretical guarantees from multi-armed bandit theory. MCTS achieved its greatest success in Go, where it powered AlphaGo's victory over human champions, but its domain-independent nature makes it valuable for general game playing, planning, and combinatorial optimization. While not ideal for all games, MCTS has permanently expanded the toolkit of game-playing AI.