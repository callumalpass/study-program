# Flow Applications: Project Selection, Image Segmentation, and Closure Problems

## Introduction

The true power of network flow lies not in solving flow problems directly, but in the remarkable variety of optimization problems that reduce to flow. Through clever graph constructions, problems in scheduling, selection, segmentation, and matching all become special cases of maximum flow or minimum cut.

This section explores several important applications, demonstrating the modeling techniques that make flow algorithms so widely useful. The key insight is that the max-flow min-cut theorem provides both an algorithmic tool and a duality relationship that captures many optimization structures.

## Project Selection Problem

**Problem**: Given projects with profits (positive or negative) and dependency constraints, select a subset maximizing total profit while respecting dependencies.

**Formal setup**:
- Projects $P$ with profit $p_i$ (can be negative for costly projects)
- Dependencies: if project $j$ depends on $i$, selecting $j$ requires selecting $i$

**Reduction to min-cut**:

1. Create source $s$ and sink $t$
2. For each project $i$:
   - If $p_i > 0$: add edge $(s, i)$ with capacity $p_i$
   - If $p_i < 0$: add edge $(i, t)$ with capacity $|p_i|$
3. For each dependency $j \to i$: add edge $(i, j)$ with capacity $\infty$

```typescript
function projectSelection(
    profits: number[],
    dependencies: [number, number][]  // [dependent, dependency]
): { selected: number[]; maxProfit: number } {
    const n = profits.length;
    const s = n;
    const t = n + 1;

    const network = new FlowNetwork(n + 2);

    let totalPositive = 0;

    for (let i = 0; i < n; i++) {
        if (profits[i] > 0) {
            network.addEdge(s, i, profits[i]);
            totalPositive += profits[i];
        } else if (profits[i] < 0) {
            network.addEdge(i, t, -profits[i]);
        }
    }

    // Dependencies with infinite capacity
    for (const [j, i] of dependencies) {
        network.addEdge(i, j, Infinity);
    }

    const minCut = maxFlow(network, s, t);

    // Selected projects: those on source side of min cut
    const selected = findSourceSide(network, s);

    return {
        selected: selected.filter(v => v < n),
        maxProfit: totalPositive - minCut
    };
}
```

**Why it works**:
- Selecting a profitable project means not cutting its edge from source (keeping profit)
- Selecting a costly project means cutting its edge to sink (paying cost)
- Infinite dependency edges force selecting prerequisites

## Image Segmentation

**Problem**: Partition image pixels into foreground and background, minimizing boundary cost while respecting pixel likelihood.

**Setup**:
- Pixels $p$ with foreground likelihood $f_p$ and background likelihood $b_p$
- Neighboring pixels $(p, q)$ with separation penalty $w_{pq}$

**Reduction to min-cut**:

1. Source = foreground, Sink = background
2. Edge $(s, p)$ with capacity $f_p$ (cost of assigning $p$ to background)
3. Edge $(p, t)$ with capacity $b_p$ (cost of assigning $p$ to foreground)
4. Edge $(p, q)$ with capacity $w_{pq}$ for neighbors (separation cost)

```typescript
function imageSegmentation(
    pixels: number[],
    foregroundLikelihood: number[],
    backgroundLikelihood: number[],
    neighbors: [number, number][],
    separationCost: Map<string, number>
): Set<number> {
    const n = pixels.length;
    const s = n;
    const t = n + 1;

    const network = new FlowNetwork(n + 2);

    // Pixel-to-source/sink edges
    for (let p = 0; p < n; p++) {
        network.addEdge(s, p, foregroundLikelihood[p]);
        network.addEdge(p, t, backgroundLikelihood[p]);
    }

    // Neighbor separation edges
    for (const [p, q] of neighbors) {
        const cost = separationCost.get(`${p},${q}`) || 0;
        network.addEdge(p, q, cost);
        network.addEdge(q, p, cost);
    }

    maxFlow(network, s, t);

    // Foreground: source side of min cut
    return findSourceSide(network, s);
}
```

**Submodularity**: The objective function is submodular, guaranteeing that min-cut gives the global optimum.

## Closure Problems

**Problem**: Find maximum-weight closure of a directed graph—a subset of vertices with no outgoing edges.

**Definition**: A closure $C$ satisfies: if $v \in C$ and $(v, u) \in E$, then $u \in C$.

**Reduction**: Same as project selection with edges reversed—a closure is a set of projects where all dependencies are satisfied.

```typescript
function maxWeightClosure(
    weights: number[],
    edges: [number, number][]
): { closure: number[]; weight: number } {
    // Same as project selection where edges are dependencies
    return projectSelection(weights, edges.map(([u, v]) => [u, v]));
}
```

**Applications**: Mining (select ore locations requiring access tunnels), compiler optimization (select optimizations with prerequisites).

## Baseball Elimination

**Problem**: Determine if team $x$ can still win the league, given current standings and remaining games.

**Setup**:
- Teams with wins $w_i$ and remaining games $r_i$
- Games $g_{ij}$ remaining between teams $i$ and $j$

**Question**: Can team $x$ finish with most wins?

**Construction**:
- Source connects to game nodes (one per remaining game not involving $x$)
- Game node $(i,j)$ connects to team nodes $i$ and $j$
- Team node $i$ connects to sink with capacity $w_x + r_x - w_i$

**Result**: Team $x$ can win iff max flow saturates all edges from source.

```typescript
function canTeamWin(
    team: number,
    wins: number[],
    remaining: number[],
    gamesRemaining: number[][]
): boolean {
    const n = wins.length;
    const maxPossibleWins = wins[team] + remaining[team];

    // Check if any team already has more wins
    for (let i = 0; i < n; i++) {
        if (wins[i] > maxPossibleWins) return false;
    }

    // Build flow network
    // ... (game nodes, team nodes, capacities)

    const flow = maxFlow(network, source, sink);
    const totalGames = sumGamesNotInvolving(team, gamesRemaining);

    return flow === totalGames;
}
```

## Survey Design

**Problem**: Select survey questions to ask respondents, respecting minimum/maximum constraints per topic and respondent.

**Reduction**: Circulation with lower and upper bounds.

## Airline Scheduling

**Problem**: Assign aircraft to flight legs minimizing aircraft needed while covering all flights.

**Reduction**: Min-cost flow where flow represents aircraft routing.

## Representative Selection

**Problem**: Select committee members satisfying representation requirements.

**Reduction**: Max-flow with vertex capacities (reduce to standard flow by splitting vertices).

## Modeling Techniques

**Common patterns**:

1. **Source/sink for binary decisions**: Edge from source = benefit of choosing, edge to sink = cost of not choosing

2. **Infinite capacity for hard constraints**: Dependency edges that must not be cut

3. **Capacity = penalty**: Cutting edge incurs penalty equal to capacity

4. **Vertex splitting**: Handle vertex capacities by replacing $v$ with $v_{in}$, $v_{out}$ and edge between them

5. **Multiple sources/sinks**: Add super-source and super-sink

## Key Takeaways

- Flow reductions turn diverse problems into graph cuts
- Project selection, image segmentation, and closure are min-cut problems
- The construction encodes profits, costs, and constraints in edge capacities
- Infinite edges encode hard constraints that must be satisfied
- Many scheduling and selection problems reduce to flow variants
- Understanding these patterns enables applying flow to new problems
