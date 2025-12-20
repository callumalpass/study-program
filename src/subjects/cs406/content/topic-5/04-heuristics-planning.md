---
title: "Planning Heuristics"
slug: "heuristics-planning"
description: "Heuristic functions for planning including delete-relaxation, additive and max heuristics, landmark counting, and pattern databases"
---

# Planning Heuristics

Heuristics are essential for scaling planning to real-world problems. Without good heuristics, even moderately-sized planning problems become intractable due to exponential state spaces. Planning heuristics estimate the cost (number of actions) to reach the goal from a given state, guiding search toward promising regions. The most successful planning heuristics are based on solving relaxed versions of the planning problem.

## The Need for Heuristics in Planning

Classical uninformed search algorithms struggle with planning problems:

**Breadth-First Search**: Guarantees optimal solutions but explores enormous state spaces
**Depth-First Search**: Memory efficient but can explore infinitely without finding solutions
**Iterative Deepening**: Combines advantages but still explores too many states

The state space size is O(2^n) for n propositions, making exhaustive search infeasible. Heuristics enable informed search (A*, greedy best-first) that dramatically reduces the number of states explored.

### Properties of Good Planning Heuristics

1. **Admissible**: Never overestimates the true cost (for optimal planning)
2. **Consistent**: h(s) ≤ cost(s, s') + h(s') for all states s, s'
3. **Informative**: Provides good guidance toward the goal
4. **Efficient**: Can be computed quickly
5. **Domain-independent**: Works across different planning domains

## Delete-Relaxation Heuristic

The most influential class of planning heuristics is based on **delete-relaxation** - ignoring the delete effects of actions.

### The Relaxed Planning Problem

In the relaxed problem:
- Actions can only add propositions, never delete them
- Once a proposition becomes true, it stays true forever
- The relaxed problem is easier: finding an optimal relaxed plan is polynomial

For each action, we keep preconditions and add effects but ignore delete effects:

```
Original Action: Move(robot, from, to)
  Preconditions: At(robot, from)
  Add: At(robot, to)
  Delete: At(robot, from)

Relaxed Action: Move(robot, from, to)
  Preconditions: At(robot, from)
  Add: At(robot, to)
  Delete: ∅
```

### Why Delete-Relaxation Works

The relaxed plan length is an admissible heuristic because:
1. Any action sequence solving the original problem also solves the relaxed problem
2. The relaxed problem may have shorter solutions (can't be harder)
3. Therefore: h*(s) ≥ h_relax(s) where h* is the true cost

### Computing Relaxed Plans

```python
def relaxed_planning_graph(state, goal, actions):
    """Build planning graph for relaxed problem"""

    # Initialize with propositions true in current state
    prop_layers = [set(state)]
    action_layers = []

    level = 0
    while not goal.issubset(prop_layers[-1]):
        # Find applicable actions at this level
        applicable = []
        for action in actions:
            if action.preconditions.issubset(prop_layers[level]):
                applicable.append(action)

        if not applicable:
            return float('inf')  # Goal unreachable

        action_layers.append(applicable)

        # Compute next proposition layer (monotonically growing)
        new_props = prop_layers[level].copy()
        for action in applicable:
            new_props.update(action.add_list)
            # Note: No delete effects!

        prop_layers.append(new_props)
        level += 1

        # Prevent infinite loops
        if level > 100:
            return float('inf')

    return level  # Number of action layers needed
```

## The h-max Heuristic

The **h-max** heuristic computes the cost of achieving each proposition in the relaxed problem, then takes the maximum over goal propositions.

### Algorithm

```python
def h_max(state, goal, actions):
    """Compute h-max heuristic using relaxed problem"""

    # Initialize costs: 0 for propositions in current state, ∞ otherwise
    cost = {}
    for prop in get_all_propositions(actions):
        cost[prop] = 0 if prop in state else float('inf')

    # Iterate until convergence (fixed point)
    changed = True
    while changed:
        changed = False

        for action in actions:
            # Cost of achieving action's preconditions
            action_cost = max(cost[p] for p in action.preconditions)

            # Update costs of propositions in add list
            for prop in action.add_list:
                new_cost = action_cost + 1
                if new_cost < cost[prop]:
                    cost[prop] = new_cost
                    changed = True

    # Return maximum cost over goal propositions
    if any(cost[g] == float('inf') for g in goal):
        return float('inf')

    return max(cost[g] for g in goal)


def get_all_propositions(actions):
    """Extract all propositions mentioned in actions"""
    props = set()
    for action in actions:
        props.update(action.preconditions)
        props.update(action.add_list)
    return props
```

### Properties of h-max

**Admissible**: Yes - never overestimates because it uses the relaxed problem
**Informative**: Moderately informative but can be pessimistic
**Complexity**: O(|A| × |P|) where |A| is actions, |P| is propositions

h-max assumes each goal can be achieved independently and takes the hardest one. This ignores beneficial interactions where achieving one goal helps achieve others.

## The h-add Heuristic

The **h-add** (additive) heuristic sums the costs of achieving each goal proposition independently.

### Algorithm

```python
def h_add(state, goal, actions):
    """Compute h-add heuristic using relaxed problem"""

    # Initialize costs
    cost = {}
    for prop in get_all_propositions(actions):
        cost[prop] = 0 if prop in state else float('inf')

    # Iterate until convergence
    changed = True
    while changed:
        changed = False

        for action in actions:
            # Sum costs of preconditions
            action_cost = sum(cost[p] for p in action.preconditions)

            # Update costs of effects
            for prop in action.add_list:
                new_cost = action_cost + 1
                if new_cost < cost[prop]:
                    cost[prop] = new_cost
                    changed = True

    # Return sum of costs for goal propositions
    if any(cost[g] == float('inf') for g in goal):
        return float('inf')

    return sum(cost[g] for g in goal)
```

### Properties of h-add

**Admissible**: No - can overestimate due to double-counting
**Informative**: More informative than h-max in practice
**Complexity**: O(|A| × |P|)

h-add assumes goals are completely independent and counts shared subgoals multiple times. Despite being inadmissible, it often guides search more effectively than h-max.

## Complete Implementation Example

```python
from collections import namedtuple
import heapq

Action = namedtuple('Action', ['name', 'preconditions', 'add_list', 'delete_list'])

class HeuristicPlanner:
    """A* planner with choice of heuristics"""

    def __init__(self, initial, goal, actions, heuristic='h_add'):
        self.initial = frozenset(initial)
        self.goal = frozenset(goal)
        self.actions = actions
        self.heuristic_fn = self.h_add if heuristic == 'h_add' else self.h_max
        self.all_props = self._get_all_props()

    def search(self):
        """A* search with heuristic"""

        if self.goal.issubset(self.initial):
            return []

        # Priority queue: (f_cost, g_cost, state, plan)
        h_init = self.heuristic_fn(self.initial)
        frontier = [(h_init, 0, self.initial, [])]
        explored = set()
        nodes_expanded = 0

        while frontier:
            f_cost, g_cost, state, plan = heapq.heappop(frontier)

            if state in explored:
                continue

            explored.add(state)
            nodes_expanded += 1

            # Try all applicable actions
            for action in self.actions:
                if action.preconditions.issubset(state):
                    new_state = self._apply(action, state)

                    if new_state not in explored:
                        new_plan = plan + [action]
                        new_g = g_cost + 1

                        # Goal test
                        if self.goal.issubset(new_state):
                            print(f"Nodes expanded: {nodes_expanded}")
                            return new_plan

                        new_h = self.heuristic_fn(new_state)
                        new_f = new_g + new_h

                        heapq.heappush(frontier, (new_f, new_g, new_state, new_plan))

        return None

    def _apply(self, action, state):
        """Apply action to state"""
        new_state = state - action.delete_list
        new_state = new_state | action.add_list
        return frozenset(new_state)

    def _get_all_props(self):
        """Get all propositions from actions"""
        props = set()
        for action in self.actions:
            props.update(action.preconditions)
            props.update(action.add_list)
            props.update(action.delete_list)
        props.update(self.initial)
        props.update(self.goal)
        return props

    def h_max(self, state):
        """h-max heuristic"""
        cost = {p: (0 if p in state else float('inf')) for p in self.all_props}

        changed = True
        iterations = 0
        while changed and iterations < 100:
            changed = False
            iterations += 1

            for action in self.actions:
                if action.preconditions:
                    action_cost = max(cost[p] for p in action.preconditions)
                else:
                    action_cost = 0

                for prop in action.add_list:
                    new_cost = action_cost + 1
                    if new_cost < cost[prop]:
                        cost[prop] = new_cost
                        changed = True

        goal_costs = [cost[g] for g in self.goal]
        if any(c == float('inf') for c in goal_costs):
            return float('inf')

        return max(goal_costs) if goal_costs else 0

    def h_add(self, state):
        """h-add heuristic"""
        cost = {p: (0 if p in state else float('inf')) for p in self.all_props}

        changed = True
        iterations = 0
        while changed and iterations < 100:
            changed = False
            iterations += 1

            for action in self.actions:
                if action.preconditions:
                    action_cost = sum(cost[p] for p in action.preconditions)
                else:
                    action_cost = 0

                for prop in action.add_list:
                    new_cost = action_cost + 1
                    if new_cost < cost[prop]:
                        cost[prop] = new_cost
                        changed = True

        goal_costs = [cost[g] for g in self.goal]
        if any(c == float('inf') for c in goal_costs):
            return float('inf')

        return sum(goal_costs) if goal_costs else 0


# Example usage
actions = [
    Action("PickUp(A)", {"Clear(A)", "OnTable(A)", "HandEmpty"},
           {"Holding(A)"}, {"Clear(A)", "OnTable(A)", "HandEmpty"}),
    Action("PutDown(A)", {"Holding(A)"},
           {"OnTable(A)", "Clear(A)", "HandEmpty"}, {"Holding(A)"}),
    Action("Stack(A,B)", {"Holding(A)", "Clear(B)"},
           {"On(A,B)", "Clear(A)", "HandEmpty"}, {"Holding(A)", "Clear(B)"}),
]

initial = {"OnTable(A)", "OnTable(B)", "Clear(A)", "Clear(B)", "HandEmpty"}
goal = {"On(A,B)"}

print("Using h-max:")
planner_max = HeuristicPlanner(initial, goal, actions, 'h_max')
plan = planner_max.search()
print("Plan:", [a.name for a in plan] if plan else "No solution")

print("\nUsing h-add:")
planner_add = HeuristicPlanner(initial, goal, actions, 'h_add')
plan = planner_add.search()
print("Plan:", [a.name for a in plan] if plan else "No solution")
```

## Landmark Counting Heuristic

**Landmarks** are propositions that must be true at some point in every valid plan.

### Types of Landmarks

1. **Fact landmarks**: Propositions that must be achieved
2. **Action landmarks**: Actions that must be executed
3. **Ordering landmarks**: Constraints like "A must be achieved before B"

### Computing Landmarks

```python
def find_landmarks(initial, goal, actions):
    """Identify fact landmarks using backward analysis"""

    landmarks = set(goal)
    changed = True

    while changed:
        changed = False

        for landmark in list(landmarks):
            # Find all actions that can achieve this landmark
            achievers = [a for a in actions if landmark in a.add_list]

            if not achievers:
                continue

            # If all achievers require a common precondition, it's a landmark
            if achievers:
                common_preconds = set(achievers[0].preconditions)
                for achiever in achievers[1:]:
                    common_preconds &= achiever.preconditions

                for precond in common_preconds:
                    if precond not in landmarks and precond not in initial:
                        landmarks.add(precond)
                        changed = True

    return landmarks
```

### Landmark Counting Heuristic

```python
def h_landmark(state, goal, actions, landmarks):
    """Count unachieved landmarks"""
    unachieved = sum(1 for lm in landmarks if lm not in state)
    return unachieved
```

## Pattern Databases for Planning

Pattern databases (PDBs) precompute exact costs for abstract versions of the problem.

### Creating Abstractions

```python
def create_pattern_database(pattern_props, goal, actions):
    """Precompute costs for pattern abstraction"""

    # Abstract actions by projecting onto pattern propositions
    abstract_actions = []
    for action in actions:
        abs_preconds = action.preconditions & pattern_props
        abs_add = action.add_list & pattern_props
        abs_del = action.delete_list & pattern_props

        if abs_add:  # Only keep actions that affect pattern
            abstract_actions.append(
                Action(action.name, abs_preconds, abs_add, abs_del)
            )

    # Build database using backward search from abstract goal
    db = {}
    abstract_goal = goal & pattern_props

    # BFS from goal in abstract space
    from collections import deque
    frontier = deque([(abstract_goal, 0)])
    db[abstract_goal] = 0

    while frontier:
        abs_state, cost = frontier.popleft()

        for action in abstract_actions:
            # Regress through action
            if action.add_list & abs_state:
                regressed = (abs_state - action.add_list) | action.preconditions
                regressed = frozenset(regressed)

                if regressed not in db:
                    db[regressed] = cost + 1
                    frontier.append((regressed, cost + 1))

    return db


def h_pdb(state, pattern_db, pattern_props):
    """Lookup cost in pattern database"""
    abstract_state = frozenset(state & pattern_props)
    return pattern_db.get(abstract_state, float('inf'))
```

## Comparing Heuristics

### Empirical Comparison

| Heuristic | Admissible | Informativeness | Computation Time | Best For |
|-----------|------------|-----------------|------------------|----------|
| h-max | Yes | Low-Medium | Fast | Quick estimates |
| h-add | No | Medium-High | Fast | Satisficing planning |
| Landmarks | Yes | High | Medium | Goal-directed domains |
| PDB | Yes | Very High | Slow (precomp) | Repetitive problems |

### Time vs Quality Tradeoff

```
h-max: Fast, less informed
h-add: Fast, more informed but inadmissible
Landmarks: Moderate, very informed
PDB: Slow precomputation, extremely informed queries
```

## Key Takeaways

1. Heuristics are essential for scaling planning to realistic problems with large state spaces
2. Delete-relaxation ignores delete effects, creating an easier problem whose solution length lower-bounds the true cost
3. h-max takes the maximum cost over goal propositions; h-add sums them (inadmissible but more informative)
4. Both h-max and h-add can be computed efficiently in polynomial time
5. Landmarks are propositions that must be achieved in any valid plan, providing strong guidance
6. Pattern databases precompute exact costs for abstract versions of problems
7. Admissible heuristics guarantee optimal solutions but may expand more nodes than inadmissible ones
8. The choice of heuristic depends on whether optimality is required and computational resources available
