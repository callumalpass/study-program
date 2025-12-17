# k-Server Problem and Work Function Algorithm

## Introduction

The k-server problem generalizes paging to arbitrary metric spaces. It's one of the most important problems in online algorithms, unifying many resource allocation problems under a single framework.

## Problem Definition

**Input**:
- Metric space $(X, d)$ with $n$ points
- $k$ servers at initial positions
- Sequence of requests at points in $X$

**Service**: When request arrives at point $p$, move a server to $p$

**Cost**: Sum of distances servers move

**Goal**: Minimize total movement cost

## Examples

**Paging**: Metric is uniform ($d(x,y) = 1$ if $x \neq y$). Cache of size $k$ = $k$ servers. Request at page = request at point.

**Euclidean**: Servers in $\mathbb{R}^2$, distance is Euclidean. Applications: robot motion planning, vehicle routing.

## k-Server Conjecture

**Conjecture** (Manasse-McGeoch-Sleator, 1988): There exists $k$-competitive algorithm for any metric space.

**Status**: Open! Best known: $(2k-1)$-competitive.

**Special cases proved**:
- Line ($k$-competitive)
- Tree ($k$-competitive)  
- Uniform metric ($k$-competitive - paging)

## Work Function Algorithm

**Work function** $w_t(C)$: Minimum cost to serve first $t$ requests and end with servers at configuration $C$.

**Recurrence**:
$$w_t(C) = \min_{C'} (w_{t-1}(C') + d(C', C) + d(C, r_t))$$

where $d(C, r_t)$ is min distance from any server in $C$ to request $r_t$.

**Algorithm**: Maintain all work functions implicitly. On request, move to minimize potential function.

**Competitive ratio**: $(2k-1)$-competitive

## Special Case: 2 Servers on Line

**Double Coverage**: Move both servers toward request until one reaches it.

**Competitive ratio**: $k=2$ competitive on line.

**Generalization**: DC is $k$-competitive on trees.

## Lower Bounds

**Theorem**: Any deterministic algorithm for $k$-server has competitive ratio $\geq k$.

**Proof**: Adversary forces $k$ phase changes, each costing $\Omega(1)$ for online algorithm but amortized cost $O(1/k)$ for offline.

**Randomized**: $\Omega(\log k)$ lower bound against oblivious adversary.

## Applications

**Task scheduling**: Servers = processors, requests = tasks

**Robot motion**: Multiple robots serving requests in warehouse

**Network routing**: Servers = mobile base stations, requests = users

**Load balancing**: Servers = physical machines, requests = jobs

## Open Problems

**k-server conjecture**: Still open for general metric spaces

**Randomized k-server**: Best algorithm is $O(\log^2 k)$-competitive. Optimal?

**Weighted k-server**: Servers have different costs. Harder than standard k-server.

## Conclusion

The k-server problem unifies many online resource allocation problems. While the k-server conjecture remains open, work function algorithm provides best known guarantee. Understanding k-server helps analyze online algorithms across diverse applications.
