---
title: "Monte Carlo Tree Search"
slug: "mcts"
---

# Monte Carlo Tree Search

## Introduction
MCTS uses random simulations to evaluate positions, powering AlphaGo and modern game AI.

## UCT Algorithm
```python
import math, random

def uct_search(state, iterations=1000):
    root = Node(state)
    
    for _ in range(iterations):
        node = root
        # Selection: UCB1
        while node.untried_moves == [] and node.children != []:
            node = node.select_child()
        
        # Expansion
        if node.untried_moves != []:
            move = random.choice(node.untried_moves)
            node = node.add_child(move)
        
        # Simulation
        result = simulate(node.state)
        
        # Backpropagation
        while node:
            node.update(result)
            node = node.parent
    
    return root.best_child().move

class Node:
    def select_child(self):
        return max(self.children, 
                  key=lambda c: c.wins/c.visits + 
                               math.sqrt(2*math.log(self.visits)/c.visits))
```

## UCB1 Formula
$$UCB1 = \frac{w_i}{n_i} + c\sqrt{\frac{\ln N}{n_i}}$$
- $w_i$: wins for node $i$
- $n_i$: visits to node $i$  
- $N$: total visits to parent
- $c$: exploration constant

## Applications
Go (AlphaGo), General Game Playing, Real-time Strategy

## Conclusion
MCTS excels when evaluation functions hard to design. Balances exploration and exploitation elegantly.