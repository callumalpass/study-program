---
title: "Planning Search Strategies"
slug: "forward-backward-search"
description: "Forward (progression) and backward (regression) search strategies for planning, including relevant actions and comparative analysis"
---

# Planning Search Strategies

Planning can be approached as a search problem in state space, where the goal is to find a sequence of actions connecting an initial state to a goal state. Two fundamental approaches exist: forward search (progression planning) and backward search (regression planning). Each has distinct advantages and challenges, and understanding both is essential for effective planning systems.

## State-Space Search for Planning

State-space search treats planning as navigating through a graph where:
- **Nodes** are world states (sets of true propositions)
- **Edges** are actions (state transitions)
- **Start node** is the initial state
- **Goal nodes** are states satisfying the goal specification

The challenge is that this graph is typically enormous. With n boolean propositions, there are 2^n possible states. Even moderate problems can have state spaces too large to enumerate explicitly.

## Forward Search (Progression Planning)

Forward search, also called progression planning, starts from the initial state and searches forward by applying actions until reaching a state that satisfies the goal.

### Algorithm

```
function FORWARD-SEARCH(initial, goal, actions):
    frontier ← {initial}
    explored ← {}

    while frontier is not empty:
        state ← POP(frontier)

        if SATISFIES(state, goal):
            return EXTRACT-PLAN(state)

        add state to explored

        for each action in actions:
            if APPLICABLE(action, state):
                new_state ← APPLY(action, state)

                if new_state not in explored and not in frontier:
                    add new_state to frontier

    return FAILURE
```

### Python Implementation

```python
from collections import deque

class ForwardPlanner:
    """Forward (progression) search planner"""

    def __init__(self, initial_state, goal, actions):
        self.initial = frozenset(initial_state)
        self.goal = frozenset(goal)
        self.actions = actions

    def search(self):
        """Breadth-first forward search"""

        if self.goal.issubset(self.initial):
            return []  # Already at goal

        # Each frontier entry: (state, plan, cost)
        frontier = deque([(self.initial, [], 0)])
        explored = {self.initial}
        nodes_expanded = 0

        while frontier:
            state, plan, cost = frontier.popleft()
            nodes_expanded += 1

            # Generate successor states
            for action in self.get_applicable_actions(state):
                new_state = self.apply_action(action, state)

                if new_state not in explored:
                    new_plan = plan + [action]
                    new_cost = cost + 1

                    # Goal test
                    if self.goal.issubset(new_state):
                        print(f"Nodes expanded: {nodes_expanded}")
                        return new_plan

                    frontier.append((new_state, new_plan, new_cost))
                    explored.add(new_state)

        return None  # No solution

    def get_applicable_actions(self, state):
        """Return actions whose preconditions are satisfied"""
        applicable = []
        for action in self.actions:
            if action.preconditions.issubset(state):
                applicable.append(action)
        return applicable

    def apply_action(self, action, state):
        """Apply action to state, returning new state"""
        new_state = state - action.delete_list
        new_state = new_state | action.add_list
        return frozenset(new_state)


# Example usage
from collections import namedtuple

Action = namedtuple('Action', ['name', 'preconditions', 'add_list', 'delete_list'])

# Blocks world actions
actions = [
    Action("PickUp(A)", {"Clear(A)", "OnTable(A)", "HandEmpty"},
           {"Holding(A)"}, {"Clear(A)", "OnTable(A)", "HandEmpty"}),
    Action("Stack(A,B)", {"Holding(A)", "Clear(B)"},
           {"On(A,B)", "Clear(A)", "HandEmpty"}, {"Holding(A)", "Clear(B)"}),
    Action("Unstack(A,B)", {"On(A,B)", "Clear(A)", "HandEmpty"},
           {"Holding(A)", "Clear(B)"}, {"On(A,B)", "Clear(A)", "HandEmpty"})
]

initial = {"On(A,B)", "OnTable(B)", "Clear(A)", "HandEmpty"}
goal = {"On(B,A)"}

planner = ForwardPlanner(initial, goal, actions)
plan = planner.search()
print("Plan:", [a.name for a in plan] if plan else "No solution")
```

### Advantages of Forward Search

1. **Directed progress**: Each action moves toward unknown territory
2. **Efficient goal testing**: Simply check if current state contains goal
3. **Good with specific initial state**: Works well when initial state is completely specified
4. **Natural for simulation**: Matches how actions execute in the real world
5. **Easy to implement**: Straightforward application of classical search algorithms

### Disadvantages of Forward Search

1. **Large branching factor**: Many actions may be applicable in each state
2. **Explores irrelevant states**: May generate states that can never lead to the goal
3. **Memory intensive**: Must store many states in explored set
4. **Struggles with multiple goals**: Difficulty coordinating achievement of multiple goal conditions

## Backward Search (Regression Planning)

Backward search, also called regression planning, starts from the goal and searches backward by regressing the goal through actions until reaching a state satisfied by the initial state.

### Goal Regression

The key operation in backward search is **regression** - computing what must be true before an action for the goal to be achieved after.

For a goal `g` and action `a`, the regressed goal `g'` is:

```
g' = (g - ADD(a)) ∪ PRECOND(a)
```

Intuitively:
1. Remove conditions achieved by the action (they're in the add list)
2. Add preconditions needed to execute the action
3. Keep conditions not affected by the action

An action is **relevant** for regression if:
1. It achieves at least one goal condition (intersection with add list)
2. It doesn't delete any goal condition (no conflict with delete list)

### Algorithm

```
function BACKWARD-SEARCH(initial, goal, actions):
    frontier ← {goal}
    explored ← {}

    while frontier is not empty:
        subgoal ← POP(frontier)

        if SATISFIED-BY(initial, subgoal):
            return EXTRACT-PLAN(subgoal)

        add subgoal to explored

        for each action in RELEVANT-ACTIONS(subgoal, actions):
            new_subgoal ← REGRESS(subgoal, action)

            if new_subgoal is consistent and not in explored:
                add new_subgoal to frontier

    return FAILURE
```

### Python Implementation

```python
class BackwardPlanner:
    """Backward (regression) search planner"""

    def __init__(self, initial_state, goal, actions):
        self.initial = frozenset(initial_state)
        self.goal = frozenset(goal)
        self.actions = actions

    def search(self):
        """Breadth-first backward search"""

        if self.goal.issubset(self.initial):
            return []

        # Each frontier entry: (subgoal, plan)
        frontier = deque([(self.goal, [])])
        explored = {self.goal}
        nodes_expanded = 0

        while frontier:
            subgoal, plan = frontier.popleft()
            nodes_expanded += 1

            # Try regressing through relevant actions
            for action in self.get_relevant_actions(subgoal):
                regressed = self.regress(subgoal, action)

                if regressed and regressed not in explored:
                    new_plan = [action] + plan

                    # Check if regressed goal is satisfied by initial state
                    if regressed.issubset(self.initial):
                        print(f"Nodes expanded: {nodes_expanded}")
                        return new_plan

                    frontier.append((regressed, new_plan))
                    explored.add(regressed)

        return None

    def get_relevant_actions(self, goal):
        """Return actions that are relevant for achieving goal"""
        relevant = []
        for action in self.actions:
            # Action is relevant if it achieves something we need
            if action.add_list.intersection(goal):
                # And doesn't delete something we need
                if not action.delete_list.intersection(goal):
                    relevant.append(action)
        return relevant

    def regress(self, goal, action):
        """Regress goal through action"""

        # Remove what action achieves
        new_goal = goal - action.add_list

        # Add what action requires
        new_goal = new_goal | action.preconditions

        # Check consistency (no impossible conjunctions)
        if self.is_consistent(new_goal):
            return frozenset(new_goal)
        return None

    def is_consistent(self, goal):
        """Check if goal is logically consistent"""
        # In basic STRIPS, just check for obvious contradictions
        # More sophisticated versions would check for mutex conditions
        return True  # Assume consistent in this simple implementation


# Example usage
planner = BackwardPlanner(initial, goal, actions)
plan = planner.search()
print("Plan:", [a.name for a in plan] if plan else "No solution")
```

### Advantages of Backward Search

1. **Smaller branching factor**: Only relevant actions are considered
2. **Goal-directed**: Only explores subgoals that could lead to the goal
3. **Good with multiple goals**: Can handle conjunctive goals naturally
4. **Better with partial goal specs**: Handles underspecified goals well

### Disadvantages of Backward Search

1. **Complex goal testing**: Must check if initial state satisfies regressed goal
2. **Subgoal complexity**: Regressed goals can become complex
3. **Less intuitive**: Reasoning backward is counterintuitive
4. **May generate impossible states**: Regressed goals might be inconsistent

## Relevant Actions

The concept of **relevant actions** is crucial for efficient backward search. An action is relevant for a goal if:

```python
def is_relevant(action, goal):
    """Check if action is relevant for goal"""

    # Must achieve at least one goal proposition
    if not action.add_list.intersection(goal):
        return False

    # Must not delete any goal proposition
    if action.delete_list.intersection(goal):
        return False

    return True
```

This dramatically reduces the branching factor in backward search compared to forward search.

### Example

Goal: `{On(A,B), On(B,C)}`

Relevant actions:
- `Stack(A, B)` - achieves `On(A,B)` ✓
- `Stack(B, C)` - achieves `On(B,C)` ✓

Irrelevant actions:
- `PickUp(D)` - doesn't achieve any goal proposition ✗
- `Unstack(A, B)` - deletes `On(A,B)` which we need ✗

## Comparison and Trade-offs

### Branching Factor

**Forward Search**:
```python
# All actions with satisfied preconditions
branching_factor_forward = |{a : PRECOND(a) ⊆ state}|
```

**Backward Search**:
```python
# Only relevant actions
branching_factor_backward = |{a : ADD(a) ∩ goal ≠ ∅ ∧ DEL(a) ∩ goal = ∅}|
```

Typically: `branching_factor_backward << branching_factor_forward`

### State Space Size

Both search the same fundamental state space, but:
- Forward search explores from one state (initial) to many (goal-satisfying states)
- Backward search explores from one goal to one state (initial)

### Goal Structure Impact

**Single, specific goal**: Forward search may be better
**Multiple, conjunctive goals**: Backward search typically better
**Partially specified goal**: Backward search more efficient

### Implementation Complexity

```
Forward Search: Simple to implement, intuitive
Backward Search: More complex, requires regression logic
```

## Bidirectional Search

Combining forward and backward search can be more efficient:

```python
class BidirectionalPlanner:
    """Bidirectional search planner"""

    def search(self):
        forward_frontier = {self.initial: []}
        backward_frontier = {self.goal: []}

        while forward_frontier and backward_frontier:
            # Expand forward
            state, plan_f = self.expand_forward(forward_frontier)

            # Check if state matches any backward subgoal
            for subgoal, plan_b in backward_frontier.items():
                if subgoal.issubset(state):
                    return plan_f + plan_b

            # Expand backward
            subgoal, plan_b = self.expand_backward(backward_frontier)

            # Check if any forward state satisfies subgoal
            for state, plan_f in forward_frontier.items():
                if subgoal.issubset(state):
                    return plan_f + plan_b

        return None
```

## Heuristic-Guided Search

Both forward and backward search benefit from heuristics:

**Forward Search with A***:
```python
def heuristic_forward_search(initial, goal, actions, heuristic):
    frontier = PriorityQueue()
    frontier.push((initial, [], 0), priority=heuristic(initial, goal))

    while frontier:
        state, plan, cost = frontier.pop()

        if goal.issubset(state):
            return plan

        for action in applicable_actions(state, actions):
            new_state = apply(action, state)
            new_cost = cost + 1
            priority = new_cost + heuristic(new_state, goal)
            frontier.push((new_state, plan + [action], new_cost), priority)
```

Common heuristics:
- Number of unsatisfied goal propositions
- Delete-relaxation heuristic
- Planning graph heuristic

## Complexity Analysis

**Time Complexity**:
- Forward: O(b^d) where b is branching factor, d is solution depth
- Backward: O(b'^d) where b' is typically smaller due to relevant actions

**Space Complexity**:
- Both: O(b^d) for storing explored states

**Practical Performance**:
- Backward often faster on problems with many applicable actions
- Forward often faster on problems with specific initial states
- Heuristics critical for both approaches

## Key Takeaways

1. Forward search applies actions from initial state toward goal; backward search regresses goal toward initial state
2. Forward search has larger branching factor but simpler implementation; backward search has smaller branching factor but requires regression logic
3. Relevant actions in backward search only include those that achieve goal conditions without deleting them
4. Backward search is typically better for problems with multiple goals or partial goal specifications
5. Forward search is more intuitive and matches real-world action execution
6. Bidirectional search can combine advantages of both approaches
7. Both approaches benefit significantly from informed heuristics to guide search
8. Choice between forward and backward depends on problem structure, goal specificity, and branching factors
