---
title: "Imperfect Information Games"
slug: "imperfect-information"
---

# Imperfect Information Games

## Introduction
Many games hide information: poker (opponent cards), bridge, Scrabble. Requires reasoning about what opponent might know.

## Expectiminimax
Extends minimax with chance nodes:

```python
def expectiminimax(state):
    if terminal(state):
        return utility(state)
    
    if is_max(state):
        return max(expectiminimax(s) for s in successors(state))
    elif is_min(state):
        return min(expectiminimax(s) for s in successors(state))
    else:  # Chance node
        return sum(p * expectiminimax(s) 
                  for p, s in chance_outcomes(state))
```

## Belief States
Maintain probability distribution over possible true states:
$$P(s | observations)$$

## Information Sets
States indistinguishable to the player are grouped into information sets.

## Nash Equilibrium
Optimal mixed strategies where no player can improve unilaterally.

## Poker Example
```python
def poker_strategy(hand, pot, opponent_bet):
    # Compute equity
    win_probability = monte_carlo_eval(hand)
    
    # Expected value of calling
    ev_call = win_probability * (pot + opponent_bet) - opponent_bet
    
    # Decision
    if ev_call > 0:
        return "CALL"
    elif bluff_probability() > threshold:
        return "RAISE"  # Bluff
    else:
        return "FOLD"
```

## Conclusion
Imperfect information adds complexity: must reason probabilistically, consider opponent's knowledge, use mixed strategies.