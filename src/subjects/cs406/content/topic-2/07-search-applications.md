---
title: "Search Applications"
slug: "search-applications"
description: "Real-world applications of search algorithms in pathfinding, puzzles, planning, and optimization"
---

# Search Applications

## Introduction

Search algorithms power countless AI applications: GPS navigation, game playing, puzzle solving, robot planning, resource allocation. Understanding how to formulate problems and select appropriate algorithms is essential for practical AI development.

## Pathfinding and Navigation

**GPS Navigation**:
- **State**: Current location
- **Actions**: Drive to connected intersection
- **Goal**: Destination
- **Algorithm**: A* with straight-line distance heuristic

```python
def gps_navigate(start, goal, road_network):
    def heuristic(location):
        return haversine_distance(location, goal)
    
    return a_star_search(
        initial=start,
        goal_test=lambda loc: loc == goal,
        actions=lambda loc: road_network.neighbors(loc),
        step_cost=lambda l1, l2: road_network.distance(l1, l2),
        heuristic=heuristic
    )
```

**Robot Navigation**:
- **Grid world**: Discrete cells, 4-8 connected
- **Continuous space**: RRT, PRM for high-dimensional robots
- **Dynamic obstacles**: D* Lite for replanning

## Puzzle Solving

**8-Puzzle**:
```python
class EightPuzzle:
    def __init__(self, initial):
        self.initial = tuple(initial)
        self.goal = (0,1,2,3,4,5,6,7,8)
    
    def actions(self, state):
        blank = state.index(0)
        row, col = blank // 3, blank % 3
        moves = []
        if row > 0: moves.append('UP')
        if row < 2: moves.append('DOWN')
        if col > 0: moves.append('LEFT')
        if col < 2: moves.append('RIGHT')
        return moves
    
    def result(self, state, action):
        state = list(state)
        blank = state.index(0)
        row, col = blank // 3, blank % 3
        
        if action == 'UP':
            swap_idx = (row-1)*3 + col
        elif action == 'DOWN':
            swap_idx = (row+1)*3 + col
        elif action == 'LEFT':
            swap_idx = row*3 + (col-1)
        else:  # RIGHT
            swap_idx = row*3 + (col+1)
        
        state[blank], state[swap_idx] = state[swap_idx], state[blank]
        return tuple(state)
    
    def manhattan(self, state):
        distance = 0
        for i, tile in enumerate(state):
            if tile != 0:
                goal_row, goal_col = tile // 3, tile % 3
                curr_row, curr_col = i // 3, i % 3
                distance += abs(goal_row - curr_row) + abs(goal_col - curr_col)
        return distance

# Solve
puzzle = EightPuzzle([7,2,4,5,0,6,8,3,1])
solution = a_star_search(puzzle, puzzle.manhattan)
```

**Rubik's Cube**:
- Pattern databases for heuristics
- IDA* for memory efficiency
- Can solve optimally in seconds

## Game Playing

**2048 Game**:
- **Search**: Expectimax for random tile placement
- **Heuristic**: Monotonicity, smoothness, empty cells

**Sokoban (Warehouse puzzle)**:
- **Search**: A* with pattern database heuristic
- **Challenge**: Irreversible moves (push box to corner = dead end)

## Route Planning

**Airline Routing**:
- Minimize cost, time, or connections
- Constraints: available flights, layover times
- UCS with additional constraints

**Logistics Delivery**:
- TSP for route optimization
- Variants: time windows, capacity constraints
- Local search (simulated annealing) for large instances

## Resource Allocation

**Job Scheduling**:
- Assign jobs to machines
- Minimize makespan (latest completion time)
- Search through assignment space with local search

**Course Scheduling**:
- Assign courses to rooms and times
- Satisfy constraints (professor availability, room capacity)
- CSP + search

## Scientific Applications

**Protein Folding**:
- Find 3D structure minimizing energy
- State: amino acid positions
- Objective: Minimize potential energy
- Search: Monte Carlo methods, simulated annealing

**Drug Discovery**:
- Search chemical space for effective compounds
- Optimize binding affinity, minimize side effects
- Genetic algorithms, Bayesian optimization

## Conclusion

Search algorithms are fundamental to AI applications. Success requires:
1. **Problem formulation**: Define states, actions, goals, costs
2. **Algorithm selection**: Match algorithm to problem properties
3. **Heuristic design**: Create admissible, informative heuristics
4. **Implementation**: Efficient data structures, pruning

From GPS to protein folding, search algorithms enable AI systems to find solutions in vast spaces.
