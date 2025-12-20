---
title: "Hierarchical Planning"
slug: "hierarchical-planning"
description: "Hierarchical Task Network (HTN) planning, task decomposition, methods vs operators, and real-world applications"
---

# Hierarchical Planning

Hierarchical planning addresses the scalability challenges of classical planning by organizing tasks into hierarchies. Rather than searching through a flat space of primitive actions, hierarchical planning decomposes high-level tasks into subtasks recursively until reaching primitive actions. This approach mirrors how humans plan - we think in terms of abstract goals and refine them into concrete steps. Hierarchical Task Network (HTN) planning is the dominant framework for hierarchical planning.

## Motivation for Hierarchical Planning

Classical planning faces several challenges:

**Large Search Spaces**: Even with good heuristics, the state space can be enormous
**Lack of Structure**: Treats all action sequences equally, ignoring domain knowledge
**Inefficient**: Considers many irrelevant action orderings
**Unnatural**: Humans plan hierarchically, not by searching through primitive actions

Consider planning a trip:
- Classical planning: Search through atomic actions (walk to door, open door, step outside, ...)
- Hierarchical planning: Decompose "travel to airport" → "drive to airport" → "start car, drive, park"

The hierarchical approach uses domain knowledge about typical task decompositions, dramatically reducing the search space.

## Hierarchical Task Networks (HTN)

HTN planning extends classical planning with:

1. **Primitive tasks**: Directly executable actions (like STRIPS operators)
2. **Compound tasks**: High-level tasks requiring decomposition
3. **Methods**: Recipes for decomposing compound tasks into subtasks
4. **Task networks**: Partially ordered sets of tasks with constraints

### HTN Problem Definition

An HTN planning problem consists of:

```
⟨P, M, D, I, G⟩

P: Primitive operators (like STRIPS actions)
M: Methods for decomposing compound tasks
D: Initial task network (high-level goal)
I: Initial state
G: Goal conditions (optional in pure HTN)
```

### Tasks vs Actions

**Primitive Task**: An action that can be executed directly
```python
class PrimitiveTask:
    def __init__(self, name, preconditions, effects):
        self.name = name
        self.preconditions = preconditions
        self.add_effects = effects['add']
        self.delete_effects = effects['delete']

    def is_applicable(self, state):
        return self.preconditions.issubset(state)

    def apply(self, state):
        new_state = state - self.delete_effects
        new_state = new_state | self.add_effects
        return new_state
```

**Compound Task**: A high-level task requiring decomposition
```python
class CompoundTask:
    def __init__(self, name, parameters):
        self.name = name
        self.parameters = parameters

    def __repr__(self):
        return f"{self.name}({', '.join(self.parameters)})"
```

## Methods: Decomposing Tasks

Methods specify how to decompose compound tasks into subtasks. Each method has:

1. **Task**: The compound task being decomposed
2. **Preconditions**: Conditions that must hold for this decomposition
3. **Subtasks**: The decomposition (ordered or partially ordered tasks)
4. **Constraints**: Ordering and variable binding constraints

### Method Representation

```python
class Method:
    def __init__(self, name, task, preconditions, subtasks, ordering):
        self.name = name
        self.task = task  # Compound task this decomposes
        self.preconditions = preconditions
        self.subtasks = subtasks  # List of subtasks
        self.ordering = ordering  # Partial order constraints

    def is_applicable(self, state):
        return self.preconditions.issubset(state)

    def decompose(self):
        return self.subtasks, self.ordering
```

### Example: Travel Planning

```python
# Compound task
travel_to_airport = CompoundTask("TravelTo", ["Airport"])

# Method 1: Drive to airport
drive_method = Method(
    name="Drive-To-Airport",
    task=travel_to_airport,
    preconditions={"HasCar", "HasLicense"},
    subtasks=[
        CompoundTask("GetInCar", []),
        PrimitiveTask("StartCar", {"InCar", "HasKeys"},
                     {'add': {"CarRunning"}, 'delete': set()}),
        PrimitiveTask("DriveToLocation", {"CarRunning"},
                     {'add': {"At(Airport)"}, 'delete': {"At(Home)"}}),
    ],
    ordering=[(0, 1), (1, 2)]  # Sequential ordering
)

# Method 2: Take taxi to airport
taxi_method = Method(
    name="Taxi-To-Airport",
    task=travel_to_airport,
    preconditions={"HasMoney"},
    subtasks=[
        PrimitiveTask("CallTaxi", {"HasPhone"},
                     {'add': {"TaxiComing"}, 'delete': set()}),
        PrimitiveTask("GetInTaxi", {"TaxiComing"},
                     {'add': {"InTaxi"}, 'delete': set()}),
        PrimitiveTask("TaxiDrive", {"InTaxi"},
                     {'add': {"At(Airport)"}, 'delete': {"At(Home)", "HasMoney"}}),
    ],
    ordering=[(0, 1), (1, 2)]
)
```

## HTN Planning Algorithm

The basic HTN planning algorithm decomposes tasks recursively:

```
function HTN-PLAN(state, tasks, methods, operators):
    if tasks is empty:
        return []  // Success

    task ← FIRST(tasks)
    remaining ← REST(tasks)

    if task is primitive:
        if task is applicable in state:
            new_state ← APPLY(task, state)
            plan ← HTN-PLAN(new_state, remaining, methods, operators)
            if plan ≠ FAILURE:
                return [task] + plan
        return FAILURE

    else:  // task is compound
        for each method that decomposes task:
            if method is applicable in state:
                subtasks ← DECOMPOSE(task, method)
                plan ← HTN-PLAN(state, subtasks + remaining, methods, operators)
                if plan ≠ FAILURE:
                    return plan

        return FAILURE
```

### Python Implementation

```python
class HTNPlanner:
    """Simple HTN planner with total ordering"""

    def __init__(self, initial_state, methods, operators):
        self.initial_state = frozenset(initial_state)
        self.methods = methods  # Dict: task_name -> list of methods
        self.operators = operators  # Dict: task_name -> primitive operator

    def plan(self, task_network):
        """Find a plan for the given task network"""
        return self._plan_recursive(self.initial_state, task_network)

    def _plan_recursive(self, state, tasks):
        """Recursive HTN planning"""

        if not tasks:
            return []  # Success - no more tasks

        task = tasks[0]
        remaining = tasks[1:]

        # Check if task is primitive
        if task.name in self.operators:
            operator = self.operators[task.name]

            if operator.is_applicable(state):
                new_state = operator.apply(state)
                subplan = self._plan_recursive(new_state, remaining)

                if subplan is not None:
                    return [task] + subplan

            return None  # Primitive action not applicable

        # Task is compound - try each applicable method
        if task.name in self.methods:
            for method in self.methods[task.name]:
                if method.is_applicable(state):
                    subtasks, _ = method.decompose()

                    # Try planning with this decomposition
                    subplan = self._plan_recursive(state, subtasks + remaining)

                    if subplan is not None:
                        return subplan

        return None  # No applicable method found


# Example usage
from collections import namedtuple

Task = namedtuple('Task', ['name', 'params'])
Operator = namedtuple('Operator', ['name', 'preconditions', 'add_effects', 'delete_effects'])

# Define primitive operators
operators = {
    'PickUp': Operator(
        'PickUp',
        preconditions={'Clear(A)', 'OnTable(A)', 'HandEmpty'},
        add_effects={'Holding(A)'},
        delete_effects={'Clear(A)', 'OnTable(A)', 'HandEmpty'}
    ),
    'Stack': Operator(
        'Stack',
        preconditions={'Holding(A)', 'Clear(B)'},
        add_effects={'On(A,B)', 'Clear(A)', 'HandEmpty'},
        delete_effects={'Holding(A)', 'Clear(B)'}
    ),
}

# Create simple method wrapper
class SimpleMethod:
    def __init__(self, preconditions, subtask_names):
        self.preconditions = preconditions
        self.subtask_names = subtask_names

    def is_applicable(self, state):
        return self.preconditions.issubset(state)

    def decompose(self):
        tasks = [Task(name, []) for name in self.subtask_names]
        return tasks, []

# Define methods for compound task
methods = {
    'PutOn': [
        SimpleMethod(
            preconditions={'OnTable(A)', 'Clear(A)', 'Clear(B)', 'HandEmpty'},
            subtask_names=['PickUp', 'Stack']
        )
    ]
}

# Plan for high-level task
initial = {'OnTable(A)', 'OnTable(B)', 'Clear(A)', 'Clear(B)', 'HandEmpty'}
goal_task = Task('PutOn', ['A', 'B'])

planner = HTNPlanner(initial, methods, operators)
plan = planner.plan([goal_task])

if plan:
    print("Plan found:", [str(task) for task in plan])
else:
    print("No plan found")
```

## Partial-Order HTN Planning

Rather than totally ordering tasks, partial-order HTN planning maintains a partially ordered task network:

```python
class PartialOrderHTN:
    """HTN planner with partial ordering"""

    def __init__(self, initial_state, methods, operators):
        self.initial_state = initial_state
        self.methods = methods
        self.operators = operators

    def plan(self, task_network):
        """Plan with partial ordering"""

        # Task network: set of tasks + ordering constraints
        tasks = task_network['tasks']
        orderings = task_network['orderings']  # List of (task_i, task_j) pairs

        return self._search(self.initial_state, tasks, orderings)

    def _search(self, state, tasks, orderings):
        """Search with commitment to task ordering"""

        if not tasks:
            return []

        # Find a task with no predecessors
        task = self._select_task(tasks, orderings)

        if self._is_primitive(task):
            # Execute primitive task
            if self._applicable(task, state):
                new_state = self._apply(task, state)
                new_tasks = tasks - {task}
                new_orderings = [(t1, t2) for t1, t2 in orderings
                                if t1 != task and t2 != task]

                plan = self._search(new_state, new_tasks, new_orderings)
                if plan is not None:
                    return [task] + plan
        else:
            # Decompose compound task
            for method in self._applicable_methods(task, state):
                subtasks, sub_orderings = method.decompose()

                new_tasks = (tasks - {task}) | set(subtasks)
                new_orderings = self._merge_orderings(
                    orderings, sub_orderings, task
                )

                plan = self._search(state, new_tasks, new_orderings)
                if plan is not None:
                    return plan

        return None

    def _select_task(self, tasks, orderings):
        """Select a task with no predecessors"""
        has_predecessor = {t2 for _, t2 in orderings}
        for task in tasks:
            if task not in has_predecessor:
                return task
        return list(tasks)[0]  # Fallback
```

## HTN vs Classical Planning

### Advantages of HTN

1. **Incorporates domain knowledge**: Methods encode expert knowledge
2. **Reduced search space**: Decomposition guides search efficiently
3. **Natural representation**: Matches how humans think about planning
4. **Scalability**: Handles larger problems than classical planning
5. **Expressiveness**: Can represent preferences and constraints

### Disadvantages of HTN

1. **Requires methods**: Need to specify decomposition knowledge
2. **Incomplete**: May miss solutions if methods are incomplete
3. **Less general**: Methods are domain-specific
4. **Harder to verify**: Correctness depends on method completeness

### Comparison

| Aspect | Classical Planning | HTN Planning |
|--------|-------------------|--------------|
| Knowledge | Domain-independent | Domain-specific methods |
| Search Space | All action sequences | Guided by decomposition |
| Completeness | Complete if optimal | Depends on methods |
| Scalability | Limited | Better for large problems |
| Expertise | None required | Requires method engineering |

## Applications of HTN Planning

### Robotics

HTN planning is widely used in robotics for task planning:

```python
# High-level task: Serve coffee
serve_coffee_methods = [
    Method(
        "Serve-Coffee-Method-1",
        task=CompoundTask("ServeCoffee", ["cup", "person"]),
        preconditions={"CoffeeMakerReady"},
        subtasks=[
            CompoundTask("GetCup", ["cup"]),
            PrimitiveTask("BrewCoffee", ...),
            CompoundTask("Navigate", ["person"]),
            PrimitiveTask("HandOver", ...),
        ],
        ordering=[(0,1), (1,2), (2,3)]
    )
]
```

### Manufacturing

Production planning uses HTN to decompose manufacturing goals:

```
Task: Manufacture Widget
Methods:
  - Assemble from parts (if parts available)
  - Manufacture from raw materials (if no parts)

Task: Assemble Widget
Subtasks:
  - Get Part A
  - Get Part B
  - Join A and B
  - Quality Check
```

### Video Game AI

Game AI uses HTN for NPC behavior:

```python
# Combat AI
attack_enemy_methods = [
    Method(
        "Melee-Attack",
        task=CompoundTask("AttackEnemy", ["enemy"]),
        preconditions={"Close(enemy)", "HasWeapon"},
        subtasks=[
            CompoundTask("Approach", ["enemy"]),
            PrimitiveTask("Strike", ...),
        ],
        ordering=[(0, 1)]
    ),
    Method(
        "Ranged-Attack",
        task=CompoundTask("AttackEnemy", ["enemy"]),
        preconditions={"HasBow", "HasArrow"},
        subtasks=[
            CompoundTask("FindCover", []),
            PrimitiveTask("AimAndShoot", ...),
        ],
        ordering=[(0, 1)]
    )
]
```

### Military Planning

Military operations use HTN for mission planning:

```
Task: Capture Objective
Methods:
  - Direct assault (if superior force)
  - Flanking maneuver (if terrain suitable)
  - Siege (if fortified)

Each method decomposes into:
  - Reconnaissance
  - Movement
  - Engagement
  - Consolidation
```

## Modern HTN Systems

Several practical HTN planning systems exist:

**SHOP2**: Simple Hierarchical Ordered Planner
- Total-order planning
- Efficient forward decomposition
- Used in real-world applications

**SIADEX**: HTN planner for crisis management
- Handles temporal and resource constraints
- Used by emergency response teams

**HTN-Maker**: Learning HTN methods from examples
- Automatically acquires domain knowledge
- Reduces method engineering burden

## Complexity Analysis

**HTN Planning Complexity**:
- Undecidable in general (with full expressiveness)
- Decidable with restrictions (finite methods, bounded depth)
- Polynomial with fixed task network structure
- Exponential in decomposition depth

**Practical Performance**:
- Much faster than classical planning on structured domains
- Performance depends on method quality
- Scales to hundreds of tasks in real applications

## Key Takeaways

1. Hierarchical planning decomposes high-level tasks into subtasks recursively, using domain knowledge to guide search
2. HTN planning uses methods to specify how compound tasks decompose into subtasks with ordering constraints
3. Methods have preconditions, subtasks, and ordering constraints that structure the planning process
4. Primitive tasks are directly executable actions; compound tasks require decomposition
5. HTN planning is more efficient than classical planning on structured domains but requires domain-specific methods
6. Partial-order HTN planning maintains flexibility by delaying commitment to task orderings
7. HTN planning is widely used in robotics, manufacturing, game AI, and military planning
8. The completeness of HTN planning depends on the completeness of the provided methods
