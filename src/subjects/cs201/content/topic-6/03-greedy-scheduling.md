# Greedy Scheduling Algorithms

Scheduling is among the most practically important algorithmic domains. Operating systems schedule processes, project managers schedule tasks, airlines schedule crews, and factories schedule production. Many scheduling problems have elegant greedy solutions: shortest job first minimizes average completion time, earliest deadline first minimizes maximum lateness, and earliest finish time maximizes throughput. Understanding which greedy rule applies to which objective is essential algorithmic knowledge.

The beauty of greedy scheduling lies in its simplicity. Sort jobs by the right criterion, then process them in order. The challenge is identifying the right criterion—sorting by start time, duration, deadline, or value/weight ratio each solves different objectives. Choosing wrong produces suboptimal schedules. Choosing right often produces optimal schedules with clean proofs via exchange arguments.

Not all scheduling problems yield to greedy approaches. Weighted interval scheduling requires dynamic programming. Job shop scheduling with precedence constraints is NP-hard. Load balancing across machines admits only approximation algorithms. Recognizing which problems are "greedy-able" and which require more sophisticated techniques is a crucial skill.

## Job Scheduling Framework

### Common Elements

- **Jobs**: Tasks with processing times, deadlines, weights
- **Machines**: Resources that process jobs
- **Objective**: Minimize completion time, lateness, or maximize throughput

### Notation

- p_j: Processing time of job j
- d_j: Deadline of job j
- w_j: Weight/priority of job j
- C_j: Completion time of job j
- L_j = C_j - d_j: Lateness of job j

## Single Machine Scheduling

### Minimizing Total Completion Time

**Problem**: Schedule n jobs on one machine to minimize Σ C_j

**Greedy**: Shortest Processing Time (SPT) first

```python
def minimize_total_completion(jobs):
    """jobs: list of processing times"""
    sorted_jobs = sorted(enumerate(jobs), key=lambda x: x[1])
    schedule = [j[0] for j in sorted_jobs]
    return schedule
```

**Proof** (Exchange argument):

If jobs i and j are adjacent with p_i > p_j and i before j:
- Swapping reduces total completion time by p_i - p_j
- Optimal has no such pairs, which means SPT order

### Weighted Completion Time

**Problem**: Minimize Σ w_j × C_j

**Greedy**: Sort by w_j/p_j (weight-to-processing ratio) descending

```python
def minimize_weighted_completion(jobs):
    """jobs: list of (processing_time, weight)"""
    indexed_jobs = list(enumerate(jobs))
    # Sort by w/p ratio descending
    sorted_jobs = sorted(indexed_jobs,
                         key=lambda x: x[1][1]/x[1][0],
                         reverse=True)
    return [j[0] for j in sorted_jobs]
```

**Also known as**: Smith's Rule

### Minimizing Maximum Lateness

**Problem**: Minimize max(L_j) = max(C_j - d_j)

**Greedy**: Earliest Deadline First (EDF)

```python
def minimize_max_lateness(jobs):
    """jobs: list of (processing_time, deadline)"""
    indexed_jobs = list(enumerate(jobs))
    # Sort by deadline
    sorted_jobs = sorted(indexed_jobs, key=lambda x: x[1][1])

    schedule = []
    current_time = 0
    max_lateness = float('-inf')

    for idx, (p, d) in sorted_jobs:
        schedule.append(idx)
        current_time += p
        lateness = current_time - d
        max_lateness = max(max_lateness, lateness)

    return schedule, max_lateness
```

**Proof**: If job i with later deadline precedes job j with earlier deadline, swapping doesn't increase maximum lateness.

## Interval Scheduling

### Maximum Non-Overlapping Intervals

**Problem**: Select maximum number of non-overlapping intervals

**Greedy**: Earliest finish time first

```python
def max_non_overlapping(intervals):
    """intervals: list of (start, end)"""
    # Sort by end time
    sorted_intervals = sorted(enumerate(intervals), key=lambda x: x[1][1])

    selected = []
    last_end = float('-inf')

    for idx, (start, end) in sorted_intervals:
        if start >= last_end:
            selected.append(idx)
            last_end = end

    return selected
```

**Time**: O(n log n)

### Interval Partitioning (Coloring)

**Problem**: Assign intervals to minimum number of resources (no overlaps on same resource)

**Greedy**: Process by start time, assign to any available resource

```python
import heapq

def interval_partitioning(intervals):
    """Returns number of resources needed"""
    if not intervals:
        return 0

    # Sort by start time
    sorted_intervals = sorted(intervals, key=lambda x: x[0])

    # Min-heap of end times (one per active resource)
    resources = []  # heap of end times

    for start, end in sorted_intervals:
        if resources and resources[0] <= start:
            # Reuse resource that finished earliest
            heapq.heappop(resources)
        heapq.heappush(resources, end)

    return len(resources)
```

**Result equals**: Maximum depth (number of overlapping intervals at any point)

### Weighted Interval Scheduling

**Problem**: Select non-overlapping intervals maximizing total weight

**Greedy doesn't work!** Need dynamic programming.

```python
def weighted_interval_scheduling(intervals):
    """intervals: list of (start, end, weight)"""
    n = len(intervals)
    # Sort by end time
    sorted_intervals = sorted(enumerate(intervals), key=lambda x: x[1][1])

    # For each interval, find latest compatible predecessor
    def find_predecessor(j):
        for i in range(j - 1, -1, -1):
            if sorted_intervals[i][1][1] <= sorted_intervals[j][1][0]:
                return i
        return -1

    # DP
    dp = [0] * (n + 1)
    for j in range(1, n + 1):
        idx, (start, end, weight) = sorted_intervals[j - 1]
        pred = find_predecessor(j - 1)
        dp[j] = max(dp[j - 1], weight + dp[pred + 1])

    return dp[n]
```

**Time**: O(n²) naive, O(n log n) with binary search

## Parallel Machine Scheduling

### Load Balancing (Makespan)

**Problem**: Assign n jobs to m machines minimizing makespan (max load)

**Greedy**: List Scheduling - assign each job to least loaded machine

```python
import heapq

def list_scheduling(jobs, m):
    """Assign jobs to m machines"""
    # Min-heap: (current_load, machine_id, jobs_list)
    machines = [(0, i, []) for i in range(m)]

    for job_id, processing_time in enumerate(jobs):
        load, machine_id, job_list = heapq.heappop(machines)
        job_list.append(job_id)
        heapq.heappush(machines, (load + processing_time, machine_id, job_list))

    return [(mid, jobs) for load, mid, jobs in machines]
```

**Approximation ratio**: 2 - 1/m

**LPT (Longest Processing Time first)**: Sort jobs descending, then list schedule.
- Approximation ratio: 4/3 - 1/(3m)

```python
def lpt_scheduling(jobs, m):
    # Sort by processing time descending
    sorted_jobs = sorted(enumerate(jobs), key=lambda x: -x[1])

    machines = [(0, i, []) for i in range(m)]

    for job_id, processing_time in sorted_jobs:
        load, machine_id, job_list = heapq.heappop(machines)
        job_list.append(job_id)
        heapq.heappush(machines, (load + processing_time, machine_id, job_list))

    return [(mid, jobs) for load, mid, jobs in machines]
```

## Real-Time Scheduling

### Earliest Deadline First (EDF)

For preemptive scheduling with arrivals:

```python
def edf_schedule(tasks, time_horizon):
    """
    tasks: list of (arrival, processing, deadline)
    Returns schedule as list of (time, job_id)
    """
    import heapq

    events = []  # (time, type, task_id)
    for i, (arrival, proc, deadline) in enumerate(tasks):
        events.append((arrival, 'arrive', i, proc, deadline))

    events.sort()
    ready_queue = []  # (deadline, remaining_time, task_id)
    schedule = []
    current_time = 0

    event_idx = 0
    while event_idx < len(events) or ready_queue:
        # Add newly arrived tasks
        while event_idx < len(events) and events[event_idx][0] <= current_time:
            _, _, task_id, proc, deadline = events[event_idx]
            heapq.heappush(ready_queue, (deadline, proc, task_id))
            event_idx += 1

        if ready_queue:
            deadline, remaining, task_id = heapq.heappop(ready_queue)
            schedule.append((current_time, task_id))

            # Determine run duration
            next_arrival = events[event_idx][0] if event_idx < len(events) else float('inf')
            run_time = min(remaining, next_arrival - current_time)

            current_time += run_time
            remaining -= run_time

            if remaining > 0:
                heapq.heappush(ready_queue, (deadline, remaining, task_id))
        else:
            current_time = events[event_idx][0]

    return schedule
```

**Optimality**: EDF is optimal for preemptive single-machine scheduling (minimizes maximum lateness).

### Rate Monotonic Scheduling

For periodic tasks, assign priorities by period (shorter period = higher priority).

**Schedulability test**: Σ(C_i/T_i) ≤ n(2^(1/n) - 1)

As n → ∞, bound approaches ln(2) ≈ 0.693

## Job Shop Scheduling

Multiple machines, each job has a sequence of operations on different machines.

**NP-hard in general**, but greedy heuristics work well:

- **First Come First Served**
- **Shortest Processing Time**
- **Priority dispatch rules**

## Summary of Greedy Rules

| Problem | Greedy Rule | Optimality |
|---------|-------------|------------|
| Min Σ C_j | SPT | Optimal |
| Min Σ w_j C_j | w/p ratio | Optimal |
| Min max L_j | EDF | Optimal |
| Max non-overlapping | Earliest finish | Optimal |
| Min resources | Process by start | Optimal |
| Makespan (parallel) | List/LPT | 2-approx / 4/3-approx |
| Weighted intervals | DP needed | - |

## When Greedy Fails

- Weighted interval scheduling
- Job shop scheduling
- Resource-constrained project scheduling
- Most multi-machine deadline problems

These require DP, branch and bound, or approximation algorithms.

