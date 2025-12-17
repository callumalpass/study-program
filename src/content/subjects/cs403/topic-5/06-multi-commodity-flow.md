# Multi-Commodity Flow

Multiple commodities flow simultaneously through network, sharing capacities.

## Problem
$k$ commodities, each with source $s_i$, sink $t_i$, demand $d_i$. **Constraint**: Total flow through edge $\leq$ capacity.

## Linear Programming
Formulate as LP with variables $f_i(e)$ for each commodity and edge. **Solvable in polynomial time** but slower than single-commodity.

## Applications
Telecommunications, internet routing, transportation
