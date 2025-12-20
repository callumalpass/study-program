---
title: "Evaluation Functions"
slug: "evaluation-functions"
description: "Design and implementation of evaluation functions for game state assessment"
---

# Evaluation Functions

## Introduction

Evaluation functions are the secret sauce that makes game-playing AI practical. Since we cannot search entire game trees for complex games like chess, we must cut off search at some depth and estimate the value of non-terminal positions. An evaluation function serves as a heuristic that estimates how good a position is for a player without searching to the end of the game.

The quality of the evaluation function often determines the strength of a game-playing program. Even with perfect search (alpha-beta pruning with optimal move ordering), a poor evaluation function will lead to bad moves. Conversely, a strong evaluation function can compensate for shallower search depth, making moves that "understand" the position deeply.

Designing evaluation functions is both an art and a science. It requires deep domain knowledge of the game, understanding of what makes positions strong or weak, and the ability to quantify these intuitive concepts. Modern approaches increasingly use machine learning to automatically discover good evaluation functions from data, but hand-crafted features based on expert knowledge remain important.

## Core Design Principles

A good evaluation function should satisfy several key properties:

1. **Agreement with utility at terminal states**: If the game is over, the evaluation should return the actual utility (win/loss/draw)
2. **Correlation with winning chances**: Higher evaluations should correspond to higher probability of winning
3. **Efficiency**: Must be fast to compute since it's called millions of times during search
4. **Monotonicity**: Small changes in position should generally lead to small changes in evaluation
5. **Domain knowledge**: Should incorporate expert understanding of what makes positions strong

The evaluation function is typically structured as a weighted linear combination of features that capture different aspects of the position.

## Features for Chess

Chess evaluation functions traditionally focus on several key aspects:

### Material

The most basic and important feature is material balance—the total value of pieces each side has.

**Standard piece values**:
- Pawn = 1
- Knight = 3
- Bishop = 3 (slightly more than knight in open positions)
- Rook = 5
- Queen = 9
- King = infinite (game ends if captured)

```python
def material_count(state):
    """Calculate material balance from MAX's perspective"""
    piece_values = {'P': 1, 'N': 3, 'B': 3, 'R': 5, 'Q': 9, 'K': 0}

    material = 0
    for piece in state.pieces:
        value = piece_values[piece.type]
        if piece.color == 'white':  # MAX
            material += value
        else:  # MIN
            material -= value

    return material
```

These values are approximate and can vary based on position. For example, bishops are slightly stronger in open positions, while knights excel in closed positions.

### Positional Factors

Beyond raw material, piece placement matters enormously.

**Center control**: Pieces in the center control more squares and have more influence
```python
def center_control(state):
    """Reward pieces controlling central squares"""
    center_squares = ['d4', 'd5', 'e4', 'e5']
    score = 0

    for square in center_squares:
        attackers = state.attackers(square)
        for piece in attackers:
            if piece.color == 'white':
                score += 0.5
            else:
                score -= 0.5

    return score
```

**King safety**: The king should be protected, especially in the opening and middlegame
```python
def king_safety(state):
    """Evaluate king safety based on pawn shield and attackers"""
    score = 0

    white_king_square = state.king_square('white')
    black_king_square = state.king_square('black')

    # Pawn shield (pawns near king)
    score += count_pawn_shield(state, white_king_square, 'white')
    score -= count_pawn_shield(state, black_king_square, 'black')

    # Attacking pieces near king
    score -= count_attackers_near(state, white_king_square, 'black') * 0.5
    score += count_attackers_near(state, black_king_square, 'white') * 0.5

    return score
```

**Pawn structure**: Pawn formations are semi-permanent and crucial
```python
def pawn_structure(state):
    """Evaluate pawn structure quality"""
    score = 0

    # Penalize doubled pawns (two pawns on same file)
    score -= count_doubled_pawns(state, 'white') * 0.5
    score += count_doubled_pawns(state, 'black') * 0.5

    # Penalize isolated pawns (no friendly pawns on adjacent files)
    score -= count_isolated_pawns(state, 'white') * 0.5
    score += count_isolated_pawns(state, 'black') * 0.5

    # Reward passed pawns (no enemy pawns blocking path to promotion)
    score += count_passed_pawns(state, 'white') * 0.75
    score -= count_passed_pawns(state, 'black') * 0.75

    return score
```

### Mobility

The number of legal moves available is a good proxy for piece activity and control.

```python
def mobility(state):
    """Evaluate mobility (number of legal moves)"""
    # Generate all legal moves for current player
    max_moves = len(list(state.legal_moves)) if state.turn == 'white' else 0
    min_moves = len(list(state.legal_moves)) if state.turn == 'black' else 0

    # Switch turns to count opponent's mobility
    state_copy = state.copy()
    state_copy.switch_turn()

    if state.turn == 'white':
        min_moves = len(list(state_copy.legal_moves))
    else:
        max_moves = len(list(state_copy.legal_moves))

    return (max_moves - min_moves) * 0.1
```

### Piece-Specific Features

Different pieces have different positional values:

```python
def piece_square_tables(state):
    """Use piece-square tables for positional evaluation"""
    # Example: pawn position values (8x8 table)
    pawn_table = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
        [0.1, 0.1, 0.2, 0.3, 0.3, 0.2, 0.1, 0.1],
        [0.0, 0.0, 0.1, 0.25, 0.25, 0.1, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.2, 0.2, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, -0.2, -0.2, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
    ]

    score = 0
    for piece in state.pieces:
        row, col = piece.position
        if piece.type == 'P':
            if piece.color == 'white':
                score += pawn_table[row][col]
            else:
                score -= pawn_table[7-row][col]  # Flip for black

    # Similar tables for knights, bishops, etc.
    return score
```

## Complete Evaluation Function

Combining all features into a complete evaluation function:

```python
def evaluate(state):
    """Complete chess evaluation function"""
    # Terminal states
    if state.is_checkmate():
        return -10000 if state.turn == 'white' else 10000
    if state.is_stalemate() or state.is_draw():
        return 0

    # Feature weights (tuned through experience or machine learning)
    w_material = 1.0
    w_mobility = 0.1
    w_center = 0.3
    w_king_safety = 0.5
    w_pawn_structure = 0.25
    w_piece_square = 0.2

    # Compute weighted sum of features
    score = (
        w_material * material_count(state) +
        w_mobility * mobility(state) +
        w_center * center_control(state) +
        w_king_safety * king_safety(state) +
        w_pawn_structure * pawn_structure(state) +
        w_piece_square * piece_square_tables(state)
    )

    return score
```

## Linear Combinations

Most evaluation functions take the form of a weighted linear combination:

$$eval(s) = w_1f_1(s) + w_2f_2(s) + ... + w_nf_n(s)$$

Where:
- $f_i(s)$ are features extracted from state $s$
- $w_i$ are weights determining feature importance
- The sum gives overall position evaluation

This linear form has several advantages:
- **Simplicity**: Easy to understand and debug
- **Efficiency**: Just arithmetic operations
- **Interpretability**: Can see which features contribute to evaluation
- **Tunability**: Can adjust weights to improve performance

## Learning Weights from Data

Rather than hand-tuning weights, we can use machine learning to learn optimal weights from data.

### Supervised Learning Approach

```python
import numpy as np
from sklearn.linear_model import LinearRegression

def learn_weights_supervised(training_games):
    """Learn evaluation weights from expert games"""
    X = []  # Feature vectors
    y = []  # Target values (game outcomes)

    for game in training_games:
        for state in game.positions:
            # Extract features
            features = [
                material_count(state),
                mobility(state),
                center_control(state),
                king_safety(state),
                pawn_structure(state)
            ]
            X.append(features)

            # Target: outcome from this position (1=win, 0=draw, -1=loss)
            y.append(game.outcome_from_perspective(state))

    # Fit linear regression
    model = LinearRegression()
    model.fit(X, y)

    return model.coef_  # These are the learned weights
```

### Reinforcement Learning Approach

More sophisticated: use self-play with temporal difference learning:

```python
def learn_weights_td(num_games=10000, learning_rate=0.01):
    """Learn weights through self-play using TD-learning"""
    weights = np.random.randn(num_features) * 0.1

    for game_num in range(num_games):
        game = play_self_play_game(weights)

        # Update weights based on game outcome
        for i, (state, next_state) in enumerate(zip(game.states[:-1], game.states[1:])):
            # Current evaluation
            v_current = evaluate_with_weights(state, weights)
            # Next evaluation
            v_next = evaluate_with_weights(next_state, weights)

            # TD error
            td_error = v_next - v_current

            # Update weights
            features = extract_features(state)
            weights += learning_rate * td_error * features

    return weights
```

## Game-Specific Considerations

Different games require different evaluation approaches:

**Go**: Material (stones on board) is less important than territory and influence. Evaluation functions were historically weak, leading to Monte Carlo methods.

**Chess**: Material + positional factors work well. Modern engines use hundreds of features.

**Checkers**: Simpler than chess. Material, king count, and control metrics suffice.

**Tic-Tac-Toe**: Simple enough that evaluation functions aren't needed—can search to the end.

## Modern Neural Network Evaluation

Modern game-playing AI (AlphaGo, AlphaZero, Stockfish NNUE) uses neural networks as evaluation functions:

```python
import torch.nn as nn

class ChessEvaluationNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(12, 256, 3, padding=1)  # 12 piece types
        self.conv2 = nn.Conv2d(256, 256, 3, padding=1)
        self.fc1 = nn.Linear(256 * 8 * 8, 1024)
        self.fc2 = nn.Linear(1024, 1)  # Single evaluation score

    def forward(self, board_tensor):
        x = torch.relu(self.conv1(board_tensor))
        x = torch.relu(self.conv2(x))
        x = x.view(x.size(0), -1)
        x = torch.relu(self.fc1(x))
        return torch.tanh(self.fc2(x))  # Output in [-1, 1]
```

Neural networks can learn complex non-linear patterns that hand-crafted features miss, but require massive training data.

## Key Takeaways

1. **Essential for depth-limited search**: Evaluation functions estimate position value when we can't search to the end
2. **Domain knowledge matters**: Understanding the game is crucial for feature selection
3. **Weighted features**: Linear combinations of features with tuned weights work well
4. **Machine learning**: Can learn weights and even entire evaluation functions from data
5. **Trade-offs**: More features = more accurate but slower; simpler = faster but less accurate

## Conclusion

Evaluation functions are critical for strong game play. They bridge the gap between shallow search that's computationally feasible and deep understanding that's strategically necessary. Good evaluation functions combine domain expertise with machine learning, using features that capture essential aspects of position quality. Modern approaches increasingly use neural networks trained on millions of games, but the fundamental principle remains: estimate position value accurately and efficiently. The evaluation function, combined with efficient search (alpha-beta pruning), determines the strength of a game-playing program.