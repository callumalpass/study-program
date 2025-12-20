---
title: "STRIPS Planning"
slug: "strips-planning"
description: "The STRIPS representation for planning problems, including operators, preconditions, add/delete lists, and the Shakey robot"
---

# STRIPS Planning

STRIPS (Stanford Research Institute Problem Solver) is a pioneering automated planning system developed in the early 1970s for the Shakey robot project. It introduced a simple yet powerful representation for planning problems that remains influential today. The STRIPS representation uses a language for describing states, actions, and goals that balances expressiveness with computational tractability.

## The Shakey Robot

Shakey was a mobile robot developed at SRI International from 1966-1972. It was one of the first robots to integrate logical reasoning with physical action. Shakey could perform tasks like navigating rooms, pushing boxes, and turning lights on and off.

The planning challenges Shakey faced included:
- Moving between rooms through doorways
- Pushing objects to desired locations
- Climbing ramps to reach switches
- Coordinating perception, planning, and action

STRIPS was developed specifically to enable Shakey to plan sequences of actions to achieve goals in its physical environment. The success of STRIPS established automated planning as a core AI problem.

## STRIPS Representation

The STRIPS representation defines planning problems using three components:

### 1. States

A state is represented as a set of ground (variable-free) positive literals. Each literal is a predicate applied to specific objects:
- `InRoom(Robot, Room1)`
- `At(Box1, Room2)`
- `Adjacent(Room1, Room2)`

The **closed-world assumption** states that any proposition not explicitly listed in the state is false. This makes states compact - we only list what is true.

### 2. Goals

Goals are conjunctions of literals that must be true in the final state:
- `InRoom(Robot, Room3) ∧ At(Box1, Room3)`

Goals are partial descriptions - they constrain some propositions while leaving others unspecified.

### 3. Actions (Operators)

STRIPS operators define the actions available to the planning agent. Each operator has:

**Action Schema**: Name with typed parameters
```
Move(robot, from, to)
```

**Preconditions**: Conditions that must hold for the action to be applicable
```
InRoom(robot, from) ∧ Adjacent(from, to)
```

**Effects**: Changes to the state
- **Add list**: Literals that become true
- **Delete list**: Literals that become false

```
Add: InRoom(robot, to)
Delete: InRoom(robot, from)
```

## STRIPS Operators in Detail

Let's examine STRIPS operators for the Shakey domain:

### Move Action
```
Action: Move(r, from, to)
Preconditions: InRoom(r, from) ∧ Adjacent(from, to)
Add List: InRoom(r, to)
Delete List: InRoom(r, from)
```

### Push Action
```
Action: Push(robot, box, from, to)
Preconditions:
  InRoom(robot, from) ∧
  At(box, from) ∧
  Adjacent(from, to)
Add List:
  InRoom(robot, to) ∧
  At(box, to)
Delete List:
  InRoom(robot, from) ∧
  At(box, from)
```

### ClimbOn Action
```
Action: ClimbOn(robot, box)
Preconditions:
  InRoom(robot, r) ∧
  At(box, r) ∧
  OnFloor(robot)
Add List: On(robot, box)
Delete List: OnFloor(robot)
```

## The STRIPS Assumption

The STRIPS assumption states that every literal not mentioned in an action's effects remains unchanged. This is also called the **frame assumption**.

For example, when executing `Move(Robot, Room1, Room2)`:
- Explicitly changed: `InRoom(Robot, Room1)` becomes false, `InRoom(Robot, Room2)` becomes true
- Unchanged: `At(Box1, Room1)`, `Adjacent(Room1, Room2)`, etc. all maintain their truth values

This assumption avoids the frame problem - the need to explicitly state everything that doesn't change. Without it, action descriptions would be impossibly verbose.

## Grounding and Instantiation

STRIPS operators are action schemas with variables. To use them in planning, we must **ground** them by substituting specific objects for variables.

Given objects: `Robot1, Room1, Room2, Box1`

The schema `Move(r, from, to)` grounds to:
- `Move(Robot1, Room1, Room2)`
- `Move(Robot1, Room2, Room1)`
- (and all other valid object combinations)

For n objects and an action with k parameters, there are O(n^k) ground actions. This can lead to a large branching factor in search.

## Python Implementation of STRIPS

```python
class STRIPSOperator:
    """A STRIPS action schema with variables"""

    def __init__(self, name, params, preconditions, add_list, delete_list):
        self.name = name
        self.params = params  # List of parameter names
        self.preconditions = preconditions  # Set of literals with variables
        self.add_list = add_list
        self.delete_list = delete_list

    def ground(self, objects):
        """Generate all ground instances of this operator"""
        ground_actions = []

        # Generate all combinations of objects for parameters
        from itertools import product
        for binding in product(objects, repeat=len(self.params)):
            # Create substitution mapping
            substitution = dict(zip(self.params, binding))

            # Ground the preconditions and effects
            grounded_preconds = self._substitute(self.preconditions, substitution)
            grounded_add = self._substitute(self.add_list, substitution)
            grounded_delete = self._substitute(self.delete_list, substitution)

            # Create ground action
            action_name = f"{self.name}({', '.join(binding)})"
            ground_actions.append(
                GroundAction(action_name, grounded_preconds,
                           grounded_add, grounded_delete)
            )

        return ground_actions

    def _substitute(self, literals, substitution):
        """Apply variable substitution to literals"""
        result = set()
        for literal in literals:
            # Replace variables with bound objects
            grounded = literal
            for var, obj in substitution.items():
                grounded = grounded.replace(f"?{var}", obj)
            result.add(grounded)
        return result


class GroundAction:
    """A fully instantiated STRIPS action"""

    def __init__(self, name, preconditions, add_list, delete_list):
        self.name = name
        self.preconditions = frozenset(preconditions)
        self.add_list = frozenset(add_list)
        self.delete_list = frozenset(delete_list)

    def is_applicable(self, state):
        """Check if all preconditions are satisfied"""
        return self.preconditions.issubset(state)

    def apply(self, state):
        """Apply action to state, returning new state"""
        if not self.is_applicable(state):
            return None

        new_state = state.copy()
        new_state -= self.delete_list  # Remove deleted literals
        new_state |= self.add_list      # Add new literals
        return frozenset(new_state)

    def __repr__(self):
        return self.name
```

## Example: Blocks World in STRIPS

```python
# Define STRIPS operators for blocks world
pickup = STRIPSOperator(
    name="PickUp",
    params=["x"],
    preconditions={"Clear(?x)", "OnTable(?x)", "HandEmpty"},
    add_list={"Holding(?x)"},
    delete_list={"Clear(?x)", "OnTable(?x)", "HandEmpty"}
)

putdown = STRIPSOperator(
    name="PutDown",
    params=["x"],
    preconditions={"Holding(?x)"},
    add_list={"OnTable(?x)", "Clear(?x)", "HandEmpty"},
    delete_list={"Holding(?x)"}
)

stack = STRIPSOperator(
    name="Stack",
    params=["x", "y"],
    preconditions={"Holding(?x)", "Clear(?y)"},
    add_list={"On(?x, ?y)", "Clear(?x)", "HandEmpty"},
    delete_list={"Holding(?x)", "Clear(?y)"}
)

unstack = STRIPSOperator(
    name="Unstack",
    params=["x", "y"],
    preconditions={"On(?x, ?y)", "Clear(?x)", "HandEmpty"},
    add_list={"Holding(?x)", "Clear(?y)"},
    delete_list={"On(?x, ?y)", "Clear(?x)", "HandEmpty"}
)

# Initial state
initial_state = frozenset({
    "On(A, B)", "OnTable(B)", "OnTable(C)",
    "Clear(A)", "Clear(C)", "HandEmpty"
})

# Goal
goal = frozenset({"On(C, A)", "On(A, B)"})

# Ground actions for blocks A, B, C
objects = ["A", "B", "C"]
all_actions = []
for operator in [pickup, putdown, stack, unstack]:
    all_actions.extend(operator.ground(objects))

print(f"Total ground actions: {len(all_actions)}")
```

## Forward Search in STRIPS

Forward search (progression) starts from the initial state and applies actions to reach the goal:

```python
from collections import deque

def forward_search(initial_state, goal, actions):
    """Breadth-first search in state space"""

    if goal.issubset(initial_state):
        return []  # Already at goal

    frontier = deque([(initial_state, [])])
    explored = {initial_state}

    while frontier:
        state, plan = frontier.popleft()

        # Try all applicable actions
        for action in actions:
            if action.is_applicable(state):
                new_state = action.apply(state)

                if new_state not in explored:
                    new_plan = plan + [action]

                    # Check if goal is reached
                    if goal.issubset(new_state):
                        return new_plan

                    frontier.append((new_state, new_plan))
                    explored.add(new_state)

    return None  # No plan found
```

## Backward Search in STRIPS

Backward search (regression) starts from the goal and applies actions in reverse:

```python
def regress(goal, action):
    """Compute the regression of a goal through an action"""

    # Check if action is relevant (affects the goal)
    if not action.add_list.intersection(goal):
        return None

    # Remove effects achieved by action
    new_goal = goal - action.add_list

    # Add preconditions needed
    new_goal = new_goal | action.preconditions

    # Check for inconsistency (can't delete something we need)
    if action.delete_list.intersection(goal):
        return None

    return frozenset(new_goal)


def backward_search(initial_state, goal, actions):
    """Backward search from goal to initial state"""

    if goal.issubset(initial_state):
        return []

    frontier = deque([(goal, [])])
    explored = {goal}

    while frontier:
        current_goal, plan = frontier.popleft()

        # Try regressing through each action
        for action in actions:
            regressed_goal = regress(current_goal, action)

            if regressed_goal and regressed_goal not in explored:
                new_plan = [action] + plan

                # Check if we've reached the initial state
                if regressed_goal.issubset(initial_state):
                    return new_plan

                frontier.append((regressed_goal, new_plan))
                explored.add(regressed_goal)

    return None
```

## STRIPS Limitations

While influential, STRIPS has several limitations:

1. **No negative preconditions**: Can't express "robot NOT in Room1"
2. **No conditional effects**: Can't express "if X then Y"
3. **No quantification**: Can't express "all blocks are clear"
4. **No functions**: Can't represent numeric values or arithmetic
5. **No equality constraints**: Can't express "from ≠ to"

These limitations led to extensions like ADL (Action Description Language) and PDDL, which add:
- Negative literals in preconditions and goals
- Conditional effects
- Universal and existential quantification
- Equality and typing
- Numeric fluents and durative actions

## Complexity Analysis

For STRIPS planning:

**State space size**: O(2^n) where n is the number of propositions
**Branching factor**: O(m × k^p) where m is the number of action schemas, k is the number of objects, p is the maximum parameters per action
**Plan length**: Can be exponential in the number of propositions

The planning problem (PLANSAT) for STRIPS is PSPACE-complete, meaning it's at least as hard as any problem in NP and potentially harder.

## Key Takeaways

1. STRIPS was developed for the Shakey robot and established automated planning as a core AI problem
2. STRIPS operators have preconditions, add lists, and delete lists defining state transitions
3. The frame assumption states that unlisted properties remain unchanged after action execution
4. Action schemas with variables must be grounded to create specific action instances
5. Forward search applies actions from the initial state; backward search regresses goals through actions
6. STRIPS assumes positive literals only, but extensions like ADL and PDDL add expressiveness
7. The closed-world assumption makes states compact by only listing true propositions
8. Planning complexity is PSPACE-complete for STRIPS, requiring efficient algorithms for practical use
