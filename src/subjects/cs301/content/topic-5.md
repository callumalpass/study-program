# Deadlock

Deadlock occurs when processes wait indefinitely for resources held by each other. This topic explores deadlock conditions, prevention strategies, and recovery mechanisms.

## Overview

A **deadlock** is a situation where a set of processes are blocked, each waiting for a resource held by another process in the set. Understanding and handling deadlocks is crucial for building reliable concurrent systems.

## Key Concepts

### Necessary Conditions (Coffman Conditions)
All four must hold simultaneously for deadlock:
1. **Mutual Exclusion**: Resources cannot be shared
2. **Hold and Wait**: Process holds resources while waiting for others
3. **No Preemption**: Resources cannot be forcibly taken
4. **Circular Wait**: Circular chain of processes waiting for resources

### Handling Strategies
- **Prevention**: Ensure at least one condition cannot hold
- **Avoidance**: Dynamically examine resource allocation (Banker's Algorithm)
- **Detection**: Allow deadlocks, detect and recover
- **Ignorance**: Assume deadlocks are rare (used by most general-purpose OS)

### Resource Allocation Graph
Visual representation showing:
- Processes and resources as nodes
- Request edges: process → resource
- Assignment edges: resource → process

## Learning Objectives

After completing this topic, you will be able to:
1. Identify the four necessary conditions for deadlock
2. Apply deadlock prevention techniques
3. Implement the Banker's Algorithm for avoidance
4. Construct and analyze resource allocation graphs
5. Design deadlock detection algorithms
6. Implement deadlock recovery strategies
7. Evaluate tradeoffs between handling strategies
