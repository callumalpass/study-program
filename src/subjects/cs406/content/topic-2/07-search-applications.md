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

### Protein Folding

Finding the 3D structure of proteins is crucial for understanding biological function and drug design.

**Problem Formulation**:
- **State**: 3D positions of all amino acids
- **Actions**: Rotate bonds between amino acids
- **Objective**: Minimize potential energy
- **Challenges**: Astronomically large search space, complex energy function

**Search Approach**:
```python
def protein_folding_simulated_annealing(sequence, energy_function):
    """Find low-energy protein conformation"""
    # Start with random configuration
    current = random_configuration(sequence)
    current_energy = energy_function(current)

    best = current
    best_energy = current_energy

    T = 1000.0  # High initial temperature
    alpha = 0.999  # Slow cooling

    for iteration in range(1000000):
        # Random perturbation (rotate random bond)
        neighbor = perturb_conformation(current)
        neighbor_energy = energy_function(neighbor)

        delta_E = neighbor_energy - current_energy

        # Accept if lower energy or probabilistically
        if delta_E < 0 or random.random() < math.exp(-delta_E / T):
            current = neighbor
            current_energy = neighbor_energy

            if current_energy < best_energy:
                best = neighbor
                best_energy = neighbor_energy

        T *= alpha

    return best, best_energy
```

**Real-world tools**: Rosetta, AlphaFold (combines search with deep learning)

### Drug Discovery

Searching vast chemical space for therapeutic compounds.

**Problem Formulation**:
- **State**: Chemical structure (molecular graph)
- **Actions**: Add/remove atoms, modify bonds
- **Objectives**:
  - Maximize binding affinity to target protein
  - Minimize toxicity and side effects
  - Ensure synthesizability
- **Search space**: 10^60 possible drug-like molecules!

**Search Approach**:
```python
def drug_discovery_genetic_algorithm(target_protein, population_size=100):
    """Evolve molecules with desired properties"""
    # Initial population of random molecules
    population = [random_molecule() for _ in range(population_size)]

    for generation in range(1000):
        # Evaluate fitness
        fitness_scores = []
        for molecule in population:
            binding = predict_binding_affinity(molecule, target_protein)
            toxicity = predict_toxicity(molecule)
            synthesize = synthesizability_score(molecule)

            # Multi-objective fitness
            fitness = binding - 0.5 * toxicity + 0.3 * synthesize
            fitness_scores.append(fitness)

        # Selection, crossover, mutation
        new_population = []
        while len(new_population) < population_size:
            parent1 = tournament_select(population, fitness_scores)
            parent2 = tournament_select(population, fitness_scores)

            # Molecular crossover (combine substructures)
            child = crossover_molecules(parent1, parent2)

            # Mutation (modify random atom/bond)
            if random.random() < 0.1:
                child = mutate_molecule(child)

            new_population.append(child)

        population = new_population

    # Return best molecule found
    return max(population, key=lambda m: evaluate_fitness(m))
```

### Computational Biology

**Gene Sequence Alignment**:
- **Problem**: Find best alignment of DNA/protein sequences
- **State**: Partial alignment
- **Actions**: Match, insert gap, delete
- **Cost**: Mismatch penalties, gap penalties
- **Algorithm**: Dynamic programming (optimal), A* for large sequences

```python
def sequence_alignment_a_star(seq1, seq2, match=1, mismatch=-1, gap=-2):
    """Align two sequences using A*"""
    def heuristic(state):
        # Remaining characters * best possible score
        i, j, _ = state
        remaining = max(len(seq1) - i, len(seq2) - j)
        return remaining * match

    initial = (0, 0, 0)  # (position in seq1, position in seq2, score)
    goal = (len(seq1), len(seq2))

    # A* search
    frontier = PriorityQueue()
    frontier.put((heuristic(initial), initial))

    while not frontier.empty():
        _, (i, j, score) = frontier.get()

        if i == len(seq1) and j == len(seq2):
            return score

        # Three actions: match/mismatch, gap in seq1, gap in seq2
        if i < len(seq1) and j < len(seq2):
            # Match or mismatch
            new_score = score + (match if seq1[i] == seq2[j] else mismatch)
            new_state = (i+1, j+1, new_score)
            frontier.put((new_score + heuristic(new_state), new_state))

        if i < len(seq1):
            # Gap in seq2
            new_state = (i+1, j, score + gap)
            frontier.put((score + gap + heuristic(new_state), new_state))

        if j < len(seq2):
            # Gap in seq1
            new_state = (i, j+1, score + gap)
            frontier.put((score + gap + heuristic(new_state), new_state))

    return None
```

## Manufacturing and Operations

### Assembly Line Optimization

**Problem**: Sequence tasks to minimize completion time and resource usage.

**Search Formulation**:
- **State**: Partial task assignment
- **Actions**: Assign next task to worker/station
- **Objective**: Minimize makespan, balance workload

```python
class AssemblyLineProblem:
    def __init__(self, tasks, num_stations):
        self.tasks = tasks  # [(duration, dependencies), ...]
        self.num_stations = num_stations

    def is_valid_assignment(self, assignment):
        """Check if dependencies satisfied"""
        for task_id, station_time in enumerate(assignment):
            for dep in self.tasks[task_id].dependencies:
                if assignment[dep] >= station_time:
                    return False
        return True

    def makespan(self, assignment):
        """Maximum completion time across stations"""
        station_times = [0] * self.num_stations
        for task_id, station in enumerate(assignment):
            station_times[station] += self.tasks[task_id].duration
        return max(station_times)

# Solve with beam search
def optimize_assembly(problem, beam_width=10):
    """Find good task assignment with beam search"""
    # Start with no tasks assigned
    beams = [([None] * len(problem.tasks), 0)]

    for task_id in range(len(problem.tasks)):
        candidates = []

        for assignment, cost in beams:
            # Try assigning to each station
            for station in range(problem.num_stations):
                new_assignment = assignment[:]
                new_assignment[task_id] = station

                if problem.is_valid_assignment(new_assignment):
                    new_cost = problem.makespan(new_assignment)
                    candidates.append((new_assignment, new_cost))

        # Keep best beam_width candidates
        candidates.sort(key=lambda x: x[1])
        beams = candidates[:beam_width]

    return beams[0]  # Best assignment
```

### Warehouse Layout Optimization

**Problem**: Arrange products to minimize picking time.

**Approach**: Simulated annealing to find layout minimizing average pick path length.

## Real-Time Systems

### Video Game AI

**Pathfinding for NPCs**:
```python
class GameMap:
    """Grid-based game map with obstacles"""
    def __init__(self, width, height, obstacles):
        self.width = width
        self.height = height
        self.obstacles = set(obstacles)

    def neighbors(self, pos):
        """Get valid adjacent positions"""
        x, y = pos
        candidates = [
            (x+1, y), (x-1, y), (x, y+1), (x, y-1),  # Cardinal
            (x+1, y+1), (x-1, y-1), (x+1, y-1), (x-1, y+1)  # Diagonal
        ]
        return [(nx, ny) for nx, ny in candidates
                if 0 <= nx < self.width and 0 <= ny < self.height
                and (nx, ny) not in self.obstacles]

    def heuristic(self, pos, goal):
        """Octile distance (allows diagonal)"""
        dx = abs(pos[0] - goal[0])
        dy = abs(pos[1] - goal[1])
        return max(dx, dy) + (math.sqrt(2) - 1) * min(dx, dy)

def game_pathfinding(game_map, start, goal):
    """Fast pathfinding for real-time games"""
    return a_star_search(
        initial=start,
        goal_test=lambda pos: pos == goal,
        actions=lambda pos: game_map.neighbors(pos),
        step_cost=lambda p1, p2: math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2),
        heuristic=lambda pos: game_map.heuristic(pos, goal)
    )
```

**Real-time constraints**: Must find path in <1ms for interactive gameplay. Optimizations:
- Pre-computed navigation meshes
- Hierarchical pathfinding (A* on abstract graph, then detailed path)
- Anytime algorithms (return best path so far when time limit reached)

## Machine Learning and AI

### Hyperparameter Optimization

Finding optimal parameters for machine learning models.

**Problem Formulation**:
- **State**: Set of hyperparameters (learning rate, layers, etc.)
- **Actions**: Modify parameters
- **Objective**: Maximize validation accuracy
- **Algorithm**: Random search, grid search, Bayesian optimization

```python
def hyperparameter_search(model_class, param_space, X_train, y_train, X_val, y_val):
    """Search for best hyperparameters"""
    best_params = None
    best_score = float('-inf')

    # Random search
    for trial in range(100):
        # Sample parameters
        params = {
            'learning_rate': random.uniform(0.0001, 0.1),
            'hidden_layers': random.randint(1, 5),
            'layer_size': random.choice([32, 64, 128, 256]),
            'dropout': random.uniform(0.0, 0.5)
        }

        # Train model
        model = model_class(**params)
        model.fit(X_train, y_train)

        # Evaluate
        score = model.score(X_val, y_val)

        if score > best_score:
            best_score = score
            best_params = params
            print(f"Trial {trial}: score={score:.4f}, params={params}")

    return best_params, best_score
```

### Neural Architecture Search

Automatically design neural network architectures.

**Search Space**: Combinations of layer types, connections, operations
**Algorithm**: Genetic algorithms, reinforcement learning, random search

## Economic and Financial Applications

### Portfolio Optimization

**Problem**: Select assets to maximize return while minimizing risk.

**Formulation**:
- **State**: Asset allocation percentages
- **Objective**: Maximize expected return / risk (Sharpe ratio)
- **Constraints**: Total allocation = 100%, diversification limits

**Search**: Genetic algorithms, gradient-based optimization

### Supply Chain Optimization

**Multi-echelon Inventory**:
- **State**: Inventory levels at warehouses, distribution centers, stores
- **Actions**: Order quantities, shipments
- **Objective**: Minimize costs (holding, shortage, transportation)
- **Algorithm**: Dynamic programming, local search

## Key Principles for Application

### Problem Formulation Checklist

1. **State representation**: What information needed to describe a configuration?
2. **Action space**: What moves/decisions are available?
3. **Goal/objective**: What are we trying to achieve?
4. **Constraints**: What rules must be satisfied?
5. **Cost function**: How do we measure solution quality?

### Algorithm Selection Guide

Choose algorithm based on:

| Property | Recommended Algorithm |
|----------|----------------------|
| Small state space (< 10^6 states) | BFS, DFS, or A* |
| Large state space, good heuristic | A* or IDA* |
| Very large state space, limited memory | IDA*, beam search |
| Optimization (no explicit goal) | Local search, genetic algorithms |
| Multiple objectives | Multi-objective optimization, Pareto search |
| Real-time constraints | Anytime algorithms, beam search |
| Discrete choices | Tree search |
| Continuous parameters | Gradient descent, Bayesian optimization |

### Implementation Best Practices

1. **Profile first**: Identify bottlenecks before optimizing
2. **Efficient data structures**: Use appropriate containers (sets for membership, heaps for priority queues)
3. **State caching**: Hash states to avoid recomputation
4. **Early termination**: Return when "good enough" solution found
5. **Iterative deepening**: For unknown solution depth
6. **Parallelization**: Exploit multi-core processors when possible

## Key Takeaways

1. **Search formulation** requires careful thought about states, actions, goals, and costs
2. **Domain knowledge** is crucial for designing effective heuristics
3. **Algorithm choice** depends on problem size, structure, time/memory constraints
4. **Hybrid approaches** often work best (e.g., A* + local search)
5. **Real-world problems** often require trade-offs between optimality and speed
6. **Implementation details** matter significantly for performance
7. **Problem decomposition** can make intractable problems solvable
8. **Search is ubiquitous** in AI, from GPS to protein folding to game playing

## Conclusion

Search algorithms are fundamental to AI applications across countless domains. Success requires:

1. **Problem formulation**: Define states, actions, goals, and costs precisely
2. **Algorithm selection**: Match algorithm properties to problem characteristics
3. **Heuristic design**: Create admissible, informative heuristics leveraging domain knowledge
4. **Implementation**: Use efficient data structures, pruning, and optimization techniques

From GPS navigation to drug discovery, from game AI to supply chain optimization, search algorithms enable AI systems to find solutions in vast and complex spaces. The key is understanding the problem structure deeply enough to choose the right algorithm and design effective heuristics. While no single algorithm solves all problems, the principles and techniques covered in this topic provide a powerful toolkit for tackling real-world search challenges.
