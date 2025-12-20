---
title: "Planning Graphs"
slug: "planning-graphs"
description: "Planning graph construction, mutex relations, the GraphPlan algorithm, and extracting heuristics from planning graphs"
---

# Planning Graphs

Planning graphs are a powerful data structure for reasoning about planning problems. Introduced with the GraphPlan algorithm in 1997, planning graphs provide a polynomial-time method for analyzing reachability and estimating distances to goals. They encode information about which propositions and actions can possibly occur together, using mutex (mutual exclusion) relations to prune impossible combinations. Planning graphs are used both for planning directly (GraphPlan) and for computing heuristics for other planners.

## What is a Planning Graph?

A planning graph is a directed, leveled graph with alternating levels of:

1. **Proposition layers**: Sets of propositions that could be true
2. **Action layers**: Sets of actions that could be executed

The graph grows forward from the initial state, with each level representing a time step. Importantly, the planning graph is an over-approximation - it includes all possible states reachable in k steps, plus some impossible states that are pruned using mutex relations.

### Planning Graph Structure

```
Level 0:  [Propositions from initial state]
            ↓
Level 1:  [Actions applicable at level 0]
            ↓
Level 2:  [Propositions achievable by actions at level 1]
            ↓
Level 3:  [Actions applicable at level 2]
            ↓
          ...continues...
```

Each proposition at level i+1 is connected to actions at level i that add it. Each action at level i is connected to its preconditions at level i and its effects at level i+1.

## Mutex Relations

Mutex relations identify pairs of propositions or actions that cannot occur together at the same level. They are crucial for pruning impossible combinations.

### Types of Mutex Relations

**Action Mutexes**: Two actions are mutex if:

1. **Inconsistent Effects**: One deletes a proposition the other adds
   ```
   PickUp(A) deletes OnTable(A)
   PickUp(B) deletes OnTable(B)
   But: PickUp(A) and PutDown(A) are mutex (inconsistent effects)
   ```

2. **Interference**: One deletes a precondition of the other
   ```
   PickUp(A) requires HandEmpty
   PickUp(B) deletes HandEmpty
   → PickUp(A) and PickUp(B) are mutex
   ```

3. **Competing Needs**: Preconditions are mutually exclusive
   ```
   If Clear(A) and On(B,A) are mutex at level i,
   then Stack(C,A) and Unstack(B,A) are mutex at level i+1
   ```

**Proposition Mutexes**: Two propositions are mutex if:

1. **Complementary**: One is the negation of the other
   ```
   Holding(A) and HandEmpty are mutex
   ```

2. **All Achieving Actions are Mutex**: Every pair of actions that could achieve them is mutex
   ```
   If all ways to achieve p are mutex with all ways to achieve q,
   then p and q are mutex
   ```

## Planning Graph Construction

### Algorithm

```
function BUILD-PLANNING-GRAPH(initial, actions):
    graph ← empty planning graph
    P₀ ← initial state
    level ← 0

    repeat:
        // Add proposition layer
        Add P_level to graph
        Compute mutex relations for P_level

        // Add action layer
        A_level ← applicable actions at P_level
        Add no-op actions for each proposition
        Add A_level to graph
        Compute mutex relations for A_level

        // Add next proposition layer
        P_{level+1} ← {p | p ∈ effects of A_level}
        level ← level + 1

    until graph has leveled off

    return graph
```

### No-Op Actions

No-op (no operation) actions are special actions added for each proposition:

```
Action: NoOp(p)
Precondition: p
Effect: p
```

No-ops allow propositions to persist across levels without change. They're essential for correct planning graph construction.

### Python Implementation

```python
class PlanningGraph:
    """Planning graph with mutex relations"""

    def __init__(self, initial_state, actions):
        self.initial_state = frozenset(initial_state)
        self.actions = actions
        self.prop_layers = [self.initial_state]
        self.action_layers = []
        self.prop_mutexes = [set()]  # Mutex pairs at each prop layer
        self.action_mutexes = []     # Mutex pairs at each action layer

    def expand(self):
        """Expand graph by one level"""
        level = len(self.action_layers)

        # Get applicable actions at current proposition layer
        applicable = self._get_applicable_actions(level)

        # Add no-op actions for persistence
        no_ops = self._create_no_ops(self.prop_layers[level])
        all_actions = applicable + no_ops

        self.action_layers.append(all_actions)

        # Compute action mutexes
        action_mutexes = self._compute_action_mutexes(all_actions, level)
        self.action_mutexes.append(action_mutexes)

        # Compute next proposition layer
        next_props = set()
        for action in all_actions:
            next_props.update(action.add_list)

        self.prop_layers.append(frozenset(next_props))

        # Compute proposition mutexes
        prop_mutexes = self._compute_prop_mutexes(next_props, level + 1)
        self.prop_mutexes.append(prop_mutexes)

    def _get_applicable_actions(self, level):
        """Get actions whose preconditions are in current prop layer"""
        applicable = []
        current_props = self.prop_layers[level]

        for action in self.actions:
            if action.preconditions.issubset(current_props):
                # Check that preconditions are not mutex
                if not self._any_mutex(action.preconditions, level):
                    applicable.append(action)

        return applicable

    def _create_no_ops(self, propositions):
        """Create no-op actions for each proposition"""
        from collections import namedtuple
        Action = namedtuple('Action', ['name', 'preconditions', 'add_list', 'delete_list'])

        no_ops = []
        for prop in propositions:
            no_op = Action(
                f"NoOp({prop})",
                frozenset([prop]),
                frozenset([prop]),
                frozenset()
            )
            no_ops.append(no_op)

        return no_ops

    def _compute_action_mutexes(self, actions, level):
        """Compute mutex pairs for action layer"""
        mutexes = set()

        for i, a1 in enumerate(actions):
            for a2 in actions[i+1:]:
                if self._actions_mutex(a1, a2, level):
                    mutexes.add((a1.name, a2.name))

        return mutexes

    def _actions_mutex(self, a1, a2, level):
        """Check if two actions are mutex"""

        # Inconsistent effects
        if a1.delete_list & a2.add_list or a2.delete_list & a1.add_list:
            return True

        # Interference
        if a1.delete_list & a2.preconditions or a2.delete_list & a1.preconditions:
            return True

        # Competing needs
        if self._any_mutex(a1.preconditions | a2.preconditions, level):
            return True

        return False

    def _compute_prop_mutexes(self, props, level):
        """Compute mutex pairs for proposition layer"""
        mutexes = set()

        props_list = list(props)
        for i, p1 in enumerate(props_list):
            for p2 in props_list[i+1:]:
                if self._props_mutex(p1, p2, level):
                    mutexes.add((p1, p2))

        return mutexes

    def _props_mutex(self, p1, p2, level):
        """Check if two propositions are mutex"""

        # All ways of achieving p1 are mutex with all ways of achieving p2
        achievers_p1 = [a for a in self.action_layers[level-1]
                       if p1 in a.add_list]
        achievers_p2 = [a for a in self.action_layers[level-1]
                       if p2 in a.add_list]

        for a1 in achievers_p1:
            for a2 in achievers_p2:
                pair = (a1.name, a2.name) if a1.name < a2.name else (a2.name, a1.name)
                if pair not in self.action_mutexes[level-1]:
                    return False  # Found non-mutex pair

        return True  # All pairs are mutex

    def _any_mutex(self, propositions, level):
        """Check if any pair of propositions is mutex"""
        props = list(propositions)
        for i, p1 in enumerate(props):
            for p2 in props[i+1:]:
                pair = (p1, p2) if p1 < p2 else (p2, p1)
                if pair in self.prop_mutexes[level]:
                    return True
        return False

    def has_leveled_off(self):
        """Check if graph has leveled off"""
        if len(self.prop_layers) < 2:
            return False

        # Leveled off if last two prop layers are identical
        return (self.prop_layers[-1] == self.prop_layers[-2] and
                self.prop_mutexes[-1] == self.prop_mutexes[-2])

    def goal_possible(self, goal, level):
        """Check if goal is possible at given level"""
        # All goal propositions must be present
        if not goal.issubset(self.prop_layers[level]):
            return False

        # No goal propositions can be mutex
        return not self._any_mutex(goal, level)
```

## The GraphPlan Algorithm

GraphPlan uses planning graphs to find plans by:

1. Expanding the graph level by level
2. Attempting to extract a valid plan when goal appears possible
3. Backtracking if extraction fails
4. Continuing until plan found or graph levels off without finding plan

### Algorithm

```
function GRAPHPLAN(problem):
    graph ← initial planning graph

    while True:
        if problem.goal appears in graph and is not mutex:
            plan ← EXTRACT-SOLUTION(graph, problem.goal)
            if plan ≠ FAILURE:
                return plan

        if graph has leveled off:
            return FAILURE

        EXPAND-GRAPH(graph)
```

### Solution Extraction

```python
def extract_solution(graph, goal, level):
    """Extract solution from planning graph via backward search"""

    if level == 0:
        # Base case: check if goal satisfied by initial state
        return [] if goal.issubset(graph.prop_layers[0]) else None

    # Try to find actions at level-1 that achieve goal
    for action_set in generate_action_sets(graph, goal, level-1):
        # Check if action set is valid (no mutexes)
        if is_valid_action_set(action_set, graph, level-1):
            # Recursively solve for preconditions
            subgoal = compute_subgoal(action_set)
            subplan = extract_solution(graph, subgoal, level-1)

            if subplan is not None:
                return subplan + [action_set]

    return None  # Backtrack


def generate_action_sets(graph, goal, level):
    """Generate possible action sets to achieve goal"""

    # For each goal proposition, find actions that achieve it
    achievers = {}
    for g in goal:
        achievers[g] = [a for a in graph.action_layers[level]
                       if g in a.add_list]

    # Generate all combinations (Cartesian product)
    import itertools
    for action_tuple in itertools.product(*achievers.values()):
        yield set(action_tuple)


def is_valid_action_set(action_set, graph, level):
    """Check if actions can be executed together (no mutexes)"""

    actions = list(action_set)
    for i, a1 in enumerate(actions):
        for a2 in actions[i+1:]:
            pair = (a1.name, a2.name) if a1.name < a2.name else (a2.name, a1.name)
            if pair in graph.action_mutexes[level]:
                return False

    return True


def compute_subgoal(action_set):
    """Compute preconditions needed for action set"""

    subgoal = set()
    for action in action_set:
        subgoal.update(action.preconditions)

    return frozenset(subgoal)
```

## Complete GraphPlan Implementation

```python
class GraphPlanner:
    """GraphPlan algorithm implementation"""

    def __init__(self, initial_state, goal, actions):
        self.initial = frozenset(initial_state)
        self.goal = frozenset(goal)
        self.actions = actions
        self.graph = None

    def plan(self):
        """Run GraphPlan algorithm"""

        self.graph = PlanningGraph(self.initial, self.actions)

        for level in range(100):  # Max depth
            # Expand graph
            if level > 0:
                self.graph.expand()

            # Check if goal is possible at this level
            if self.graph.goal_possible(self.goal, level):
                print(f"Goal possible at level {level}, extracting solution...")

                # Try to extract solution
                plan = self._extract_solution(self.goal, level)

                if plan is not None:
                    return self._flatten_plan(plan)

            # Check for level-off (no solution exists)
            if level > 0 and self.graph.has_leveled_off():
                return None

        return None

    def _extract_solution(self, goal, level):
        """Recursively extract solution"""

        if level == 0:
            return [] if goal.issubset(self.initial) else None

        # Try different action sets
        for action_set in self._generate_action_sets(goal, level-1):
            if self._is_valid_action_set(action_set, level-1):
                # Compute subgoal
                subgoal = set()
                for action in action_set:
                    subgoal.update(action.preconditions)

                # Recursive call
                subplan = self._extract_solution(frozenset(subgoal), level-1)

                if subplan is not None:
                    # Filter out no-ops
                    real_actions = [a for a in action_set
                                  if not a.name.startswith("NoOp")]
                    return subplan + [real_actions]

        return None

    def _generate_action_sets(self, goal, level):
        """Generate action sets that could achieve goal"""

        # For each goal proposition, get achievers
        achievers = {}
        for g in goal:
            achievers[g] = [a for a in self.graph.action_layers[level]
                           if g in a.add_list]

            if not achievers[g]:
                return  # No way to achieve this goal proposition

        # Generate combinations
        import itertools
        for action_tuple in itertools.product(*achievers.values()):
            yield list(action_tuple)

    def _is_valid_action_set(self, action_set, level):
        """Check if actions are not pairwise mutex"""

        for i, a1 in enumerate(action_set):
            for a2 in action_set[i+1:]:
                pair = (a1.name, a2.name) if a1.name < a2.name else (a2.name, a1.name)
                if pair in self.graph.action_mutexes[level]:
                    return False

        return True

    def _flatten_plan(self, plan):
        """Convert plan to flat list of actions"""

        flat = []
        for action_set in plan:
            flat.extend(action_set)

        return flat
```

## Extracting Heuristics from Planning Graphs

Planning graphs are extremely useful for computing heuristics for other planners:

### Level-Based Heuristics

```python
def h_level(state, goal, actions):
    """Heuristic: level at which goal first appears"""

    graph = PlanningGraph(state, actions)

    for level in range(100):
        if level > 0:
            graph.expand()

        if goal.issubset(graph.prop_layers[level]):
            return level

    return float('inf')
```

### Max-Level Heuristic

```python
def h_max_level(state, goal, actions):
    """Maximum level at which any goal proposition appears"""

    graph = PlanningGraph(state, actions)
    max_level = 0

    while True:
        if all(g in graph.prop_layers[len(graph.prop_layers)-1] for g in goal):
            break

        graph.expand()

        if graph.has_leveled_off():
            return float('inf')

    # Find max level for any goal proposition
    for g in goal:
        for level, props in enumerate(graph.prop_layers):
            if g in props:
                max_level = max(max_level, level)
                break

    return max_level
```

### Set-Level Heuristic

```python
def h_set_level(state, goal, actions):
    """Level at which all goal props appear non-mutex"""

    graph = PlanningGraph(state, actions)

    for level in range(100):
        if level > 0:
            graph.expand()

        if graph.goal_possible(goal, level):
            return level

    return float('inf')
```

## Complexity Analysis

**Planning Graph Construction**:
- **Time**: O(n × a × p) where n is levels, a is actions, p is propositions
- **Space**: O(n × (a + p))
- **Polynomial** in problem size

**GraphPlan Search**:
- **Worst case**: Exponential in plan length
- **Best case**: Polynomial (when graph provides tight bounds)
- **Practical**: Often much faster than other planners

## Key Takeaways

1. Planning graphs are leveled graphs alternating between proposition layers and action layers
2. Mutex relations identify impossible combinations of propositions or actions at the same level
3. Actions are mutex if they have inconsistent effects, interfere with each other, or have competing needs
4. Propositions are mutex if all actions achieving them are pairwise mutex
5. GraphPlan expands the planning graph until the goal appears possible, then attempts solution extraction
6. Solution extraction works backward through the graph, selecting action sets that achieve goals without mutexes
7. Planning graphs can compute admissible heuristics based on the level at which goals first appear
8. Planning graph construction is polynomial, making it efficient for heuristic computation
