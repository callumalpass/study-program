# Knapsack Variants and Extensions

Multiple knapsack variants with different constraints.

## 0/1 Knapsack
**DP**: $K[i,w] = \max(K[i-1,w], K[i-1,w-w_i] + v_i)$

## Unbounded Knapsack
Unlimited copies. **DP**: $K[w] = \max_i (K[w-w_i] + v_i)$

## Bounded Knapsack
Limited copies $c_i$. Convert to 0/1 by replication.

## Multidimensional
Multiple constraints (weight, volume). **Complexity**: Harder, pseudo-polynomial in dimensions.
