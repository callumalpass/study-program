# Minimum Cost Flow

Min-cost flow extends max flow with edge costs, finding cheapest way to send flow.

## Problem
**Flow network** with costs $a(u,v)$ per unit flow. **Goal**: Send $d$ units from $s$ to $t$ minimizing total cost.

## Successive Shortest Paths
Repeatedly send flow along shortest path in residual network with costs.

**Time**: $O(d \cdot E \log V)$ with Dijkstra

## Applications
Transportation, logistics, resource allocation
