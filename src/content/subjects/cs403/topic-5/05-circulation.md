# Circulation with Demands

Circulation generalizes flow - no source/sink, vertices have demands/supplies.

## Problem
**Demands**: $d(v)$ for each vertex (positive = supply, negative = demand). **Goal**: Find flow satisfying demands and capacities.

## Reduction
Add super-source connecting to supplies, super-sink from demands. Solve max flow.

## Applications
Scheduling with requirements, inventory management
