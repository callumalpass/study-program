# Makespan Minimization: Graham's List Scheduling

## Introduction

Makespan minimization (scheduling jobs on parallel machines) is a fundamental problem in computer science and operations research. Graham's List Scheduling algorithm (1966) provides a elegant 2-approximation - one of the earliest approximation algorithms.

This problem demonstrates how simple greedy strategies can provide provable guarantees, and how analysis techniques apply across domains.

## Problem Definition

**Input**:
- $n$ jobs with processing times $p_1, \ldots, p_n$
- $m$ identical machines

**Output**: Assignment of jobs to machines

**Objective**: Minimize makespan (maximum completion time across all machines)

**Makespan**:
$$C_{max} = \max_{i=1}^m \sum_{j \in M_i} p_j$$

where $M_i$ is the set of jobs assigned to machine $i$.

### Example

Jobs: $p_1=2, p_2=3, p_3=4, p_4=5, p_5=2$
Machines: $m=2$

**Optimal assignment**:
- Machine 1: jobs {1,3,5}, total=8
- Machine 2: jobs {2,4}, total=8
- Makespan = 8

**Bad assignment**:
- Machine 1: jobs {4,5}, total=7
- Machine 2: jobs {1,2,3}, total=9
- Makespan = 9

## Graham's List Scheduling

**Algorithm**: Assign each job to machine with current minimum load.

```typescript
function listScheduling(jobs: number[], m: number): number {
    const machineLoad: number[] = Array(m).fill(0);
    
    for (const jobTime of jobs) {
        // Find machine with minimum load
        const minMachine = machineLoad.indexOf(Math.min(...machineLoad));
        
        // Assign job to that machine
        machineLoad[minMachine] += jobTime;
    }
    
    return Math.max(...machineLoad);
}
```

**Time**: $O(n \cdot m)$ or $O(n \log m)$ with priority queue

## Analysis

**Theorem**: List Scheduling is a 2-approximation.

**Proof**:

Let ALG = makespan of list scheduling, OPT = optimal makespan.

**Lower bound 1**: Average load
$$\text{OPT} \geq \frac{\sum_{j=1}^n p_j}{m}$$

**Lower bound 2**: Maximum job
$$\text{OPT} \geq \max_j p_j$$

**Upper bound**: Let job $j^*$ be last to complete.
$$\text{ALG} = C(j^*) = \text{load before } j^* + p_{j^*}$$

At time $j^*$ was assigned, all machines had load $\geq$ (load before $j^*$).

Therefore:
$$m \cdot (\text{load before } j^*) \leq \sum_{j \neq j^*} p_j$$

$$\text{load before } j^* \leq \frac{\sum_{j \neq j^*} p_j}{m} \leq \frac{\sum_j p_j}{m} \leq \text{OPT}$$

Thus:
$$\text{ALG} = \text{load before } j^* + p_{j^*} \leq \text{OPT} + p_{j^*} \leq \text{OPT} + \text{OPT} = 2 \cdot \text{OPT}$$

Therefore, List Scheduling is a 2-approximation. ✓

## Sorted List Scheduling (LPT)

**Longest Processing Time (LPT)**: Sort jobs in decreasing order before assigning.

```typescript
function LPT(jobs: number[], m: number): number {
    const sortedJobs = [...jobs].sort((a, b) => b - a);
    return listScheduling(sortedJobs, m);
}
```

**Theorem**: LPT is a $(4/3)$-approximation.

**Better bound**: For $m \geq 3$: LPT $\leq \frac{4}{3} \text{OPT} - \frac{1}{3}$

**Tight**: There exist instances where LPT = $\frac{4}{3} \text{OPT} - \frac{1}{3}$

## PTAS for Fixed $m$

**Theorem**: For fixed $m$, makespan minimization has a PTAS.

**Idea**: 
- Enumerate all assignments of large jobs
- Use greedy for small jobs

**Time**: $O(n \cdot (m+1)^{1/\epsilon})$

**For variable $m$**: Problem is strongly NP-complete, no FPTAS unless P=NP.

## Related Problems

### Weighted Jobs
Jobs have weights, minimize weighted completion time.
Different approximation algorithms needed.

### Precedence Constraints
Jobs have dependencies.
More complex - even 2-approximation is non-trivial.

### Unrelated Machines
Machines have different speeds for different jobs.
Harder - $(1+\epsilon)$-approximation exists.

## Applications

**Data centers**: Distribute computation across servers
**Manufacturing**: Schedule tasks on production lines
**Cloud computing**: Allocate resources to minimize response time

## Analysis of LPT

The LPT algorithm's improvement over basic list scheduling comes from a key structural observation:

**Lemma**: If LPT schedules job $j^*$ last with $p_{j^*} > \frac{1}{3}OPT$, then OPT must also have a machine with only one job.

**Proof**: If $p_{j^*} > \frac{1}{3}OPT$, then at most 2 such large jobs can share a machine in OPT. Since LPT processes jobs in decreasing order, large jobs are placed first. The analysis proceeds by case analysis on the number of large jobs.

**Tight Example**:
Consider $m = 3$ machines with jobs: $2, 2, 2, 2, 2, 2, 3, 3, 3$.
- OPT makespan: 7 (machines get {3,2,2}, {3,2,2}, {3,2,2})
- LPT makespan: 8 (first three 3's on separate machines, then 2's fill in)
- Ratio: $8/7 = 4/3 - 1/21$

This shows the $4/3$ bound is essentially tight.

## Local Search Heuristics

While greedy provides worst-case guarantees, local search often performs better in practice:

```typescript
function localSearchScheduling(jobs: number[], m: number): number {
    // Start with LPT solution
    let assignment = LPTAssignment(jobs, m);
    let makespan = computeMakespan(assignment);

    let improved = true;
    while (improved) {
        improved = false;

        // Try moving jobs from busiest to least loaded machine
        const [maxMachine, minMachine] = findMaxMinMachines(assignment);

        for (const job of assignment[maxMachine]) {
            // Check if moving job reduces makespan
            const newMakespan = computeMakespanAfterMove(assignment, job, maxMachine, minMachine);
            if (newMakespan < makespan) {
                moveJob(assignment, job, maxMachine, minMachine);
                makespan = newMakespan;
                improved = true;
                break;
            }
        }
    }

    return makespan;
}
```

Local search can achieve arbitrarily good approximations with sufficient iterations.

## Online Scheduling

When jobs arrive one-by-one without knowledge of future:

**Theorem**: No deterministic online algorithm can achieve better than $\frac{3}{2}$-competitive ratio for online makespan minimization.

**Graham's List Scheduling** achieves 2-competitive online, which is optimal for this problem class.

## Conclusion

List Scheduling demonstrates that simple greedy strategies can provide provable approximations. The improvement from 2-approximation (unsorted) to 4/3-approximation (LPT) shows how preprocessing can help. Local search heuristics often find near-optimal solutions in practice.

For fixed machines, PTAS exists, but variable machines remains strongly NP-complete—showing the boundary between tractable and intractable approximation. Online variants add another dimension of complexity where competitive analysis replaces approximation ratios.
