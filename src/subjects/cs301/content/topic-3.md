# CPU Scheduling

CPU scheduling determines which process runs when and for how long. This topic examines scheduling algorithms, criteria, and their impact on system performance.

## Overview

The **CPU scheduler** selects a process from the ready queue and allocates the CPU to it. The scheduler must balance competing goals: maximizing CPU utilization, ensuring fairness, minimizing response time for interactive processes, and maximizing throughput for batch processing.

## Key Concepts

### Scheduling Criteria
- **CPU Utilization**: Keep the CPU busy
- **Throughput**: Number of processes completed per time unit
- **Turnaround Time**: Total time from submission to completion
- **Waiting Time**: Time spent in the ready queue
- **Response Time**: Time from submission to first response

### Preemptive vs Non-preemptive
- **Non-preemptive**: Process runs until it voluntarily releases CPU
- **Preemptive**: OS can interrupt running process to schedule another

### Common Algorithms
- First-Come, First-Served (FCFS)
- Shortest-Job-First (SJF)
- Round-Robin (RR)
- Priority Scheduling
- Multilevel Queue Scheduling

## Learning Objectives

After completing this topic, you will be able to:
1. Apply various scheduling algorithms
2. Calculate scheduling metrics (turnaround, waiting, response time)
3. Compare algorithm trade-offs
4. Understand multilevel feedback queues
5. Analyze real-time scheduling requirements
6. Evaluate scheduler performance
7. Design scheduling policies for specific workloads
