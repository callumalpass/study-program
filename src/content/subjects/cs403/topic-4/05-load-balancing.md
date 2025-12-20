# Online Load Balancing: Greedy and Potential Function Analysis

## Introduction

Online load balancing is one of the most practically important online problems, with direct applications in web server farms, cloud computing, and distributed systems. The problem asks: as jobs arrive, how should we assign them to machines to minimize the maximum load (makespan)?

Unlike offline scheduling where we know all jobs upfront, online load balancing must make irrevocable assignment decisions as each job arrives. This models real systems where requests arrive unpredictably and must be handled immediately.

The greedy approach—assign each job to the least loaded machine—is natural and widely used. Remarkably, this simple strategy achieves a 2-competitive ratio, which is optimal for deterministic algorithms without additional information.

## Problem Definition

**Input**:
- $m$ identical machines (servers, processors)
- Jobs arrive online with processing times $p_1, p_2, \ldots, p_n$

**Assignment**: When job $j$ with processing time $p_j$ arrives, immediately assign it to some machine $i$.

**Load**: The load on machine $i$ is $L_i = \sum_{j \text{ assigned to } i} p_j$

**Makespan**: The maximum load across all machines: $C_{\max} = \max_{i=1}^{m} L_i$

**Goal**: Minimize the makespan.

**Note**: Jobs are non-preemptive—once assigned, they cannot be moved.

## Greedy Algorithm (List Scheduling)

**Algorithm**: Assign each arriving job to the machine with the smallest current load.

```typescript
function greedyLoadBalance(jobs: number[], m: number): number[] {
    const load = new Array(m).fill(0);
    const assignment: number[] = [];

    for (const job of jobs) {
        // Find machine with minimum load
        let minMachine = 0;
        for (let i = 1; i < m; i++) {
            if (load[i] < load[minMachine]) {
                minMachine = i;
            }
        }

        // Assign job to that machine
        assignment.push(minMachine);
        load[minMachine] += job;
    }

    return assignment;
}

function getMakespan(jobs: number[], assignment: number[], m: number): number {
    const load = new Array(m).fill(0);
    for (let i = 0; i < jobs.length; i++) {
        load[assignment[i]] += jobs[i];
    }
    return Math.max(...load);
}
```

**Time complexity**: O(n log m) using a min-heap for machine loads, or O(nm) with linear search.

## Competitive Analysis

**Theorem**: The greedy algorithm is 2-competitive.

**Proof**:

Let $C^*$ = optimal makespan (offline).

**Lower bounds on OPT**:
1. $C^* \geq \frac{1}{m} \sum_j p_j$ (average load)
2. $C^* \geq \max_j p_j$ (largest job must fit somewhere)

**Analysis of greedy**:

Let machine $i^*$ have the maximum load $C_{\max}$ in greedy's schedule. Let $j^*$ be the last job assigned to $i^*$.

At the moment $j^*$ was assigned, machine $i^*$ had the minimum load. Therefore:
$$L_{i^*} - p_{j^*} \leq \frac{1}{m} \sum_j p_j \leq C^*$$

Since $p_{j^*} \leq C^*$:
$$C_{\max} = L_{i^*} = (L_{i^*} - p_{j^*}) + p_{j^*} \leq C^* + C^* = 2C^*$$

**Therefore**: Greedy achieves makespan at most $2 \cdot \text{OPT}$.

**Tightness**: The bound is tight. Consider $m$ machines, $m(m-1)$ jobs of size 1, then one job of size $m$.
- Greedy distributes small jobs evenly, then adds large job: makespan = $(m-1) + m = 2m - 1$
- Optimal: put large job alone, distribute small jobs: makespan = $m$
- Ratio approaches 2 as $m \to \infty$

## Lower Bound for Deterministic Algorithms

**Theorem**: No deterministic online algorithm achieves competitive ratio better than $2 - 1/m$.

**Proof**: Consider the adversarial sequence construction:
1. Send $m(m-1)$ jobs of size 1
2. Observe algorithm's assignment; some machine has load $\geq m-1$
3. Send one job of size $m$ assigned adversarially to most-loaded machine

Any deterministic algorithm must make at least one machine have high load, which the adversary exploits.

## Potential Function Analysis

Potential functions provide a systematic framework for analyzing online algorithms.

**Potential function**: $\Phi = \sum_{i=1}^{m} L_i^2$

**Amortized cost**: actual cost + $\Delta \Phi$

**Analysis for greedy**:

When job $p_j$ is assigned to machine $i$:
$$\Delta \Phi = (L_i + p_j)^2 - L_i^2 = 2L_i p_j + p_j^2$$

Since greedy picks machine with minimum load:
$$L_i \leq \frac{1}{m} \sum_k L_k = \frac{\text{total load}}{m}$$

This bound on $L_i$ controls the amortized cost, leading to the 2-competitive bound.

**Advantage of potential functions**: They reduce competitive ratio proofs to per-step accounting arguments, which are often simpler to verify.

## Improved Bounds with Additional Information

**Semi-online (know total load)**: 4/3-competitive algorithms exist.

**Semi-online (know largest job)**: Better than 2-competitive possible.

**Semi-online (sorted input)**: LPT (Longest Processing Time first) achieves 4/3-competitive.

```typescript
function lptSchedule(jobs: number[], m: number): number[] {
    // Sort jobs in decreasing order
    const sortedJobs = jobs.map((p, i) => ({ p, i }))
                          .sort((a, b) => b.p - a.p);

    const load = new Array(m).fill(0);
    const assignment = new Array(jobs.length);

    for (const { p, i } of sortedJobs) {
        const minMachine = load.indexOf(Math.min(...load));
        assignment[i] = minMachine;
        load[minMachine] += p;
    }

    return assignment;
}
```

**Theorem (Graham, 1969)**: LPT achieves makespan at most $(4/3 - 1/(3m)) \cdot \text{OPT}$.

## Related Machines (Heterogeneous)

When machines have different speeds $s_1, \ldots, s_m$:
- Job $j$ on machine $i$ takes time $p_j / s_i$
- Load on machine $i$: $L_i = \sum_{j \text{ on } i} p_j / s_i$

**Greedy for related machines**: Assign to machine minimizing completion time.

**Competitive ratio**: $O(\log m)$ for greedy on related machines.

**Better algorithms**: Using more sophisticated potential functions, $O(\log m)$-competitive algorithms exist.

## Applications

**Web server load balancing**: Distribute HTTP requests across backend servers. Real systems use weighted round-robin or least-connections (approximating greedy).

**Cloud computing**: Assign virtual machines to physical hosts. Must balance load while respecting resource constraints.

**MapReduce**: Distribute map tasks to workers. Speculative execution handles stragglers.

**Game server matchmaking**: Distribute players to game instances. Balance latency and server load.

**DNS load balancing**: Return different IP addresses to distribute traffic geographically.

## Practical Considerations

**Beyond makespan**: Real systems optimize for latency percentiles, throughput, fairness.

**Machine heterogeneity**: Cloud servers vary in CPU, memory, network. Requires weighted scheduling.

**Job migration**: If jobs can be moved after initial assignment, better performance possible.

**Stochastic arrivals**: With probabilistic job size distributions, different strategies may perform better on average.

**Locality**: Assigning jobs to machines with cached data reduces overall cost.

## Key Takeaways

- Greedy (least-loaded) achieves optimal 2-competitive ratio for identical machines
- The 2 bound is tight: no deterministic online algorithm can do better
- Potential function analysis provides systematic proofs of competitive bounds
- With additional information (job sizes, sorted order), better ratios are achievable
- LPT achieves 4/3-competitive with offline sorting
- Real systems approximate greedy with practical modifications for heterogeneity, locality, and fairness
