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

## Tabu Search

**Concept**: Maintain a memory of recent moves to avoid cycling and revisiting states.

Tabu search keeps a **tabu list** of recently visited states or moves. These are forbidden for a certain number of iterations, forcing exploration of new regions.

```python
def tabu_search(problem, tabu_tenure=7, max_iter=10000):
    current = problem.initial()
    best = current
    best_value = problem.value(current)

    tabu_list = deque(maxlen=tabu_tenure)

    for iteration in range(max_iter):
        neighbors = problem.neighbors(current)

        # Find best non-tabu neighbor
        best_neighbor = None
        best_neighbor_value = float('-inf')

        for neighbor in neighbors:
            # Skip if in tabu list (unless it's better than best so far - aspiration)
            if neighbor in tabu_list:
                if problem.value(neighbor) <= best_value:
                    continue

            value = problem.value(neighbor)
            if value > best_neighbor_value:
                best_neighbor = neighbor
                best_neighbor_value = value

        if best_neighbor is None:
            break

        current = best_neighbor
        tabu_list.append(current)

        # Update global best
        if best_neighbor_value > best_value:
            best = best_neighbor
            best_value = best_neighbor_value

    return best, best_value
```

**Features**:
- **Tabu tenure**: How long moves stay forbidden (typically 5-10)
- **Aspiration criteria**: Override tabu status if neighbor is better than best found
- **Diversification**: Periodically restart or jump to unexplored regions

**Applications**: Vehicle routing, scheduling, graph coloring.

## Applications

**TSP (Traveling Salesman)**:

The TSP seeks the shortest route visiting all cities exactly once. Local search is highly effective for this NP-hard problem.

```python
def two_opt(tour):
    """Generate neighbors by reversing segments of tour"""
    neighbors = []
    n = len(tour)

    for i in range(n-1):
        for j in range(i+2, n):
            # Reverse segment from i+1 to j
            neighbor = tour[:i+1] + tour[i+1:j+1][::-1] + tour[j+1:]
            neighbors.append(neighbor)

    return neighbors

def tsp_simulated_annealing(cities, distances):
    """Solve TSP with simulated annealing"""
    import random

    # Initial random tour
    tour = list(range(len(cities)))
    random.shuffle(tour)

    def tour_cost(t):
        return sum(distances[t[i]][t[i+1]] for i in range(len(t)-1)) + \
               distances[t[-1]][t[0]]

    current_cost = tour_cost(tour)
    best_tour = tour[:]
    best_cost = current_cost

    T = 100.0
    alpha = 0.995

    for iteration in range(100000):
        # Random 2-opt move
        i, j = sorted(random.sample(range(len(tour)), 2))
        neighbor = tour[:i] + tour[i:j][::-1] + tour[j:]
        neighbor_cost = tour_cost(neighbor)

        delta = neighbor_cost - current_cost

        if delta < 0 or random.random() < math.exp(-delta / T):
            tour = neighbor
            current_cost = neighbor_cost

            if current_cost < best_cost:
                best_tour = tour[:]
                best_cost = current_cost

        T *= alpha
        if T < 0.01:
            break

    return best_tour, best_cost
```

**Job Scheduling**:

Assign $n$ jobs to $m$ machines to minimize makespan (time until all jobs complete).

```python
class SchedulingProblem:
    def __init__(self, job_durations, num_machines):
        self.jobs = job_durations
        self.m = num_machines

    def initial(self):
        # Random assignment
        return tuple(random.randint(0, self.m-1) for _ in self.jobs)

    def neighbors(self, state):
        # Move one job to different machine
        neighbors = []
        for job_idx in range(len(self.jobs)):
            for machine in range(self.m):
                if state[job_idx] != machine:
                    neighbor = list(state)
                    neighbor[job_idx] = machine
                    neighbors.append(tuple(neighbor))
        return neighbors

    def value(self, state):
        # Negative makespan (maximize)
        machine_times = [0] * self.m
        for job_idx, machine in enumerate(state):
            machine_times[machine] += self.jobs[job_idx]
        return -max(machine_times)

# Solve with hill climbing
problem = SchedulingProblem([10, 5, 8, 12, 6, 15, 9], num_machines=3)
solution, value = random_restart_hill_climbing(problem, restarts=50)
```

**Neural Network Training**:

Gradient descent is a form of local search in weight space.

```python
def gradient_descent(X, y, learning_rate=0.01, iterations=1000):
    """Train linear model with gradient descent (local search)"""
    n_features = X.shape[1]
    weights = np.zeros(n_features)

    for iteration in range(iterations):
        # Current state: weight vector
        predictions = X @ weights

        # Objective: minimize mean squared error
        loss = np.mean((predictions - y) ** 2)

        # Gradient: direction of steepest ascent
        gradient = (2/len(y)) * X.T @ (predictions - y)

        # Move to neighbor (opposite of gradient)
        weights -= learning_rate * gradient

    return weights
```

**Key insight**: Gradient descent is hill climbing in continuous space, where neighbors are infinitesimally close states in the direction of the negative gradient.

**Vehicle Routing**:

Extend TSP to multiple vehicles with capacity constraints.

```python
def vehicle_routing_neighbor(routes):
    """Generate neighbor by moving customer between routes"""
    # Pick random route and customer
    route_idx = random.randint(0, len(routes)-1)
    if len(routes[route_idx]) <= 1:
        return routes

    customer_idx = random.randint(0, len(routes[route_idx])-1)
    customer = routes[route_idx][customer_idx]

    # Move to different route
    new_route_idx = random.randint(0, len(routes)-1)

    new_routes = [r[:] for r in routes]
    new_routes[route_idx].pop(customer_idx)
    new_routes[new_route_idx].append(customer)

    return new_routes
```

## Comparison of Local Search Methods

| Method | Strengths | Weaknesses | Best For |
|--------|-----------|------------|----------|
| Hill Climbing | Simple, fast | Stuck in local maxima | Quick solutions, many restarts |
| Simulated Annealing | Escapes local maxima | Slow, parameter tuning | High-quality solutions, enough time |
| Genetic Algorithms | Population diversity | Complex, many parameters | Combinatorial problems, parallel |
| Tabu Search | Memory prevents cycling | Memory overhead | Structured neighborhoods |

**Parameter Sensitivity**:
- Hill climbing: None (deterministic given start)
- Simulated annealing: Temperature schedule critical
- Genetic algorithms: Population size, mutation rate, crossover rate
- Tabu search: Tabu tenure, aspiration criteria

## Advanced Techniques

**Variable Neighborhood Search**: Systematically change neighborhood structure to escape local optima.

**Iterated Local Search**: Perturb the current solution and restart local search, keeping best overall.

```python
def iterated_local_search(problem, perturbation_strength=5):
    current = hill_climbing(problem)
    best = current

    for iteration in range(100):
        # Perturb current solution
        perturbed = perturb(current, strength=perturbation_strength)

        # Local search from perturbed state
        local_optimum = hill_climbing_from(problem, perturbed)

        # Keep if better
        if problem.value(local_optimum) > problem.value(best):
            best = local_optimum
            current = local_optimum
        else:
            current = local_optimum  # Continue from here anyway

    return best
```

**Parallel Local Search**: Run multiple searches in parallel, share best solutions.

## Key Takeaways

1. **Local search** maintains only current state, making it memory-efficient for large problems
2. **Hill climbing** is fast but gets stuck in local maxima (~86% failure rate on 8-queens)
3. **Random restarts** dramatically improve hill climbing success rate
4. **Simulated annealing** probabilistically accepts worse moves, proven to find global optimum with proper cooling schedule
5. **Genetic algorithms** maintain populations and use crossover/mutation inspired by evolution
6. **Tabu search** uses memory to avoid revisiting recent states
7. **Applications** range from TSP to neural network training—any optimization where path doesn't matter
8. **Trade-offs** exist between solution quality, computation time, and algorithm complexity

## Conclusion

Local search trades completeness for efficiency, making it ideal for optimization problems where we care about solution quality, not the path taken. Hill climbing is simple but gets stuck in local maxima. Simulated annealing escapes local maxima probabilistically by accepting worse moves with decreasing probability. Genetic algorithms use populations and evolutionary operators to maintain diversity. Tabu search prevents cycling with memory. The choice depends on problem structure, time constraints, and solution quality requirements. For many real-world problems—especially large-scale optimization—local search methods are the only practical approach.
