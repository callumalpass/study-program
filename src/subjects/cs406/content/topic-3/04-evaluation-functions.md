---
title: "Evaluation Functions"
slug: "evaluation-functions"
---

# Evaluation Functions

## Introduction
Evaluation functions estimate the value of non-terminal game states, essential for depth-limited search.

## Design Principles
**Material**: Piece values (pawn=1, knight/bishop=3, rook=5, queen=9)
**Position**: Control of center, king safety, pawn structure
**Mobility**: Number of legal moves available

```python
def evaluate(state):
    material = sum(piece_values[p] for p in state.pieces)
    position = evaluate_position(state)
    mobility = len(legal_moves(state))
    return material + 0.1*position + 0.01*mobility
```

## Linear Combinations
$$eval(s) = w_1f_1(s) + w_2f_2(s) + ... + w_nf_n(s)$$

## Learning from Data
Use machine learning to learn weights from expert games or self-play.

## Conclusion
Good evaluation functions critical for strong play. Combine domain knowledge with learned weights for best results.