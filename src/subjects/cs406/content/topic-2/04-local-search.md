---
title: "Local Search Algorithms"
slug: "local-search"
description: "Local search including hill climbing, simulated annealing, genetic algorithms for optimization problems"
---

# Local Search Algorithms

## Introduction

Local search algorithms explore state space by moving from current state to neighboring states, optimizing an objective function. These methods excel at optimization problems where the path doesn't matter—only the final solution quality.

Unlike systematic search (BFS, A*), local search:
- Maintains only current state (minimal memory)
- Finds good solutions quickly
- May not find globally optimal solutions
- Doesn't maintain explored set

**Applications**: Scheduling, circuit design, machine learning, resource allocation.

## Hill Climbing

**Concept**: Always move to best neighboring state (greedy local search).

```python
def hill_climbing(problem, max_iter=10000):
    current = problem.initial()
    current_value = problem.value(current)
    
    for _ in range(max_iter):
        neighbors = problem.neighbors(current)
        
        # Find best neighbor
        best_neighbor = None
        best_value = current_value
        
        for neighbor in neighbors:
            value = problem.value(neighbor)
            if value > best_value:
                best_neighbor = neighbor
                best_value = value
        
        if best_neighbor is None:  # Local maximum
            return current, current_value
        
        current = best_neighbor
        current_value = best_value
    
    return current, current_value
```

**8-Queens Example**:
```python
# State: queen positions [row for each column]
# Value: -(number of attacking pairs)
# Neighbors: move one queen to different row

def num_attacks(state):
    attacks = 0
    for i in range(len(state)):
        for j in range(i+1, len(state)):
            if state[i] == state[j]:  # Same row
                attacks += 1
            if abs(state[i] - state[j]) == j - i:  # Diagonal
                attacks += 1
    return attacks
```

**Problems**:
- Gets stuck in local maxima (~86% for 8-queens)
- Plateau regions with no improvement
- Ridges (hard to navigate)

**Solution: Random Restart**
```python
def random_restart_hill_climbing(problem, restarts=100):
    best = None
    best_value = float('-inf')
    
    for _ in range(restarts):
        state, value = hill_climbing(problem)
        if value > best_value:
            best = state
            best_value = value
    return best, best_value
```

## Simulated Annealing

**Idea**: Allow downhill moves with probability decreasing over time (inspired by metallurgy).

$$P(accept) = e^{\Delta E / T}$$

where $\Delta E$ = change in value, $T$ = temperature.

```python
import math, random

def simulated_annealing(problem, schedule):
    current = problem.initial()
    current_value = problem.value(current)
    
    for t in range(1, 100000):
        T = schedule(t)
        if T == 0:
            return current, current_value
        
        neighbor = random.choice(problem.neighbors(current))
        neighbor_value = problem.value(neighbor)
        
        delta = neighbor_value - current_value
        
        if delta > 0 or random.random() < math.exp(delta / T):
            current = neighbor
            current_value = neighbor_value
    
    return current, current_value

# Temperature schedules
def exp_schedule(T0=100, alpha=0.99):
    return lambda t: T0 * (alpha ** t)

def linear_schedule(T0=100, k=0.01):
    return lambda t: max(0, T0 - k*t)
```

**Properties**:
- High T: accepts most moves (exploration)
- Low T: accepts only improvements (exploitation)
- Proven to find global optimum with proper schedule

## Genetic Algorithms

**Concept**: Population of states, evolve using selection, crossover, mutation.

```python
def genetic_algorithm(problem, pop_size=100, generations=1000):
    population = [problem.random_state() for _ in range(pop_size)]
    
    for gen in range(generations):
        # Evaluate fitness
        fitness = [problem.fitness(ind) for ind in population]
        
        # New population
        new_pop = []
        while len(new_pop) < pop_size:
            # Selection
            parent1 = tournament_select(population, fitness)
            parent2 = tournament_select(population, fitness)
            
            # Crossover
            child = crossover(parent1, parent2)
            
            # Mutation
            if random.random() < 0.01:
                child = mutate(child)
            
            new_pop.append(child)
        
        population = new_pop
    
    return max(population, key=problem.fitness)

def tournament_select(pop, fitness, k=3):
    tournament = random.sample(list(zip(pop, fitness)), k)
    return max(tournament, key=lambda x: x[1])[0]

def crossover(p1, p2):
    point = random.randint(1, len(p1)-1)
    return p1[:point] + p2[point:]

def mutate(individual):
    ind = list(individual)
    i = random.randint(0, len(ind)-1)
    ind[i] = random.randint(0, 7)  # For 8-queens
    return tuple(ind)
```

## Applications

**TSP (Traveling Salesman)**:
- Simulated annealing with 2-opt neighbors
- Genetic algorithms with edge recombination crossover

**Job Scheduling**:
- State: job assignments to machines
- Local search: swap jobs between machines
- Minimize makespan

**Neural Network Training**:
- Gradient descent is local search
- State: weight values
- Objective: minimize loss

## Conclusion

Local search trades completeness for efficiency. Hill climbing is simple but gets stuck. Simulated annealing escapes local maxima probabilistically. Genetic algorithms use populations. Choice depends on problem structure and requirements.
