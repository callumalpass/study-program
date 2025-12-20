---
title: "Planning Introduction"
slug: "planning-introduction"
description: "Introduction to automated planning in AI, including state space representation, goal specification, and classical planning assumptions"
---

# Planning Introduction

Planning is a fundamental problem in artificial intelligence that involves finding a sequence of actions to achieve a specified goal. Unlike search problems where we look for a path through a graph, planning requires reasoning about actions, their preconditions, and their effects on the world. Planning systems are used in robotics, autonomous systems, logistics, manufacturing, and many other domains where intelligent agents must act purposefully to achieve objectives.

## What is Automated Planning?

Automated planning is the computational process of generating a sequence of actions that transforms an initial state into a goal state. A planning problem consists of three main components:

1. **Initial State**: A complete description of the world at the start
2. **Goal Specification**: A partial description of desired properties
3. **Actions**: Operations that can change the state of the world

The output of a planning system is a plan - an ordered sequence of actions that, when executed from the initial state, will achieve the goal. Planning differs from classical search in that states and actions are represented using a factored representation (propositions and relationships) rather than atomic states.

## Classical Planning Assumptions

Classical planning makes several simplifying assumptions that make the problem tractable:

**Deterministic**: Each action has exactly one outcome. There is no uncertainty about the effects of actions.

**Fully Observable**: The agent has complete information about the current state. There are no hidden variables or partial observability.

**Finite**: The state space is finite, containing a countable number of states.

**Static**: Nothing in the world changes except through the agent's actions. There are no exogenous events.

**Restricted Goals**: Goals are specified as a conjunction of propositions that must be true in the final state.

**Sequential Plans**: Actions are totally ordered and executed one at a time. No concurrent or parallel actions.

**Implicit Time**: Actions have no duration; effects are instantaneous.

While these assumptions limit the applicability of classical planning, they enable efficient algorithms and provide a foundation for more complex planning approaches.

## State Space Representation

In planning, states are represented using propositions (boolean variables) that describe properties of the world. A state is a set of ground (variable-free) atoms that are true; all other atoms are assumed false (closed-world assumption).

For example, in a blocks world domain:
- `On(A, B)` - Block A is on block B
- `OnTable(C)` - Block C is on the table
- `Clear(A)` - Block A has nothing on top of it
- `Holding(B)` - The robot is holding block B

A complete state might be: `{On(A, B), OnTable(B), OnTable(C), Clear(A), Clear(C), HandEmpty}`

This factored representation is exponentially more compact than enumerating all possible states explicitly.

## Goal Specification

Goals in classical planning are specified as a conjunction of propositions that must be true. Unlike initial states, goal specifications are partial - they only constrain some properties of the final state.

For example, a goal might be: `On(A, B) ∧ On(B, C)` which specifies that block A must be on block B, and block B must be on block C, but doesn't constrain where block C is or whether other blocks exist.

A state `s` satisfies a goal `g` if all propositions in `g` are true in `s`. This is denoted as `s ⊨ g`.

## Actions and State Transitions

Actions are the building blocks of plans. Each action is defined by:

1. **Name and Parameters**: e.g., `Move(block, from, to)`
2. **Preconditions**: Conditions that must be true for the action to be applicable
3. **Effects**: Changes to the state resulting from executing the action
   - **Add list**: Propositions that become true
   - **Delete list**: Propositions that become false

The result of applying action `a` to state `s` is a new state `s'` where:
- All propositions in the add list are added
- All propositions in the delete list are removed
- All other propositions remain unchanged

## PDDL Language

PDDL (Planning Domain Definition Language) is the standard language for representing planning problems. A PDDL problem consists of two files:

**Domain File**: Defines predicates, actions, and their schemas
**Problem File**: Specifies objects, initial state, and goal

Here's a simple PDDL example for the blocks world:

```lisp
(define (domain blocksworld)
  (:predicates
    (on ?x ?y)
    (ontable ?x)
    (clear ?x)
    (holding ?x)
    (handempty))

  (:action pickup
    :parameters (?x)
    :precondition (and (clear ?x) (ontable ?x) (handempty))
    :effect (and (holding ?x) (not (ontable ?x))
                 (not (clear ?x)) (not (handempty))))

  (:action putdown
    :parameters (?x)
    :precondition (holding ?x)
    :effect (and (ontable ?x) (clear ?x) (handempty)
                 (not (holding ?x)))))
```

## State-Space vs Plan-Space Search

There are two fundamental approaches to planning:

**State-Space Search**: Search through the space of world states
- Forward (progression): Start from initial state, apply actions, search for goal state
- Backward (regression): Start from goal, apply actions in reverse, search for initial state

**Plan-Space Search**: Search through the space of partial plans
- Start with an empty or skeletal plan
- Incrementally refine by adding actions, constraints, and orderings
- Continue until a complete, consistent plan is found

State-space search is more common in modern planners due to better heuristics and efficient implementation, but plan-space search can be more flexible for handling complex constraints.

## The Blocks World Example

The blocks world is a classic planning domain that illustrates key concepts:

**Objects**: A set of blocks (A, B, C, ...) and a table
**Predicates**: On(x,y), OnTable(x), Clear(x), Holding(x), HandEmpty
**Actions**: PickUp(x), PutDown(x), Stack(x,y), Unstack(x,y)

Example problem:
```python
# Initial state: A on B, B on table, C on table
initial = {'On(A,B)', 'OnTable(B)', 'OnTable(C)',
           'Clear(A)', 'Clear(C)', 'HandEmpty'}

# Goal: C on A, A on B
goal = {'On(C,A)', 'On(A,B)'}

# Solution plan:
# 1. PickUp(C)
# 2. Stack(C, A)
```

## Python Implementation of State Representation

```python
class State:
    """Represents a planning state as a set of propositions"""

    def __init__(self, propositions):
        self.props = frozenset(propositions)

    def satisfies(self, goal):
        """Check if this state satisfies a goal"""
        return goal.issubset(self.props)

    def apply_action(self, action):
        """Apply an action to get a new state"""
        if not action.is_applicable(self):
            return None

        new_props = self.props.copy()
        new_props = new_props - action.delete_list
        new_props = new_props | action.add_list
        return State(new_props)

    def __hash__(self):
        return hash(self.props)

    def __eq__(self, other):
        return self.props == other.props


class Action:
    """Represents a planning action"""

    def __init__(self, name, preconditions, add_list, delete_list):
        self.name = name
        self.preconditions = frozenset(preconditions)
        self.add_list = frozenset(add_list)
        self.delete_list = frozenset(delete_list)

    def is_applicable(self, state):
        """Check if action can be applied in given state"""
        return self.preconditions.issubset(state.props)
```

## Computational Complexity

Planning is computationally challenging. Even for classical planning with the simplifying assumptions:

- **PLANSAT** (does a plan exist?) is PSPACE-complete in general
- **Bounded planning** (plan of length ≤ k) is NP-complete
- Optimal planning (shortest plan) is even harder

The state space grows exponentially with the number of propositions. For n boolean propositions, there are 2^n possible states. This makes exhaustive search infeasible for all but the smallest problems.

However, practical planning problems often have structure that can be exploited through:
- Effective heuristics
- Factored representations
- Domain-independent planning algorithms
- Preprocessing and analysis techniques

## Key Takeaways

1. Planning generates action sequences to achieve goals, using factored state representations rather than atomic states
2. Classical planning assumes deterministic, fully observable, static environments with sequential actions
3. States are sets of propositions; goals are partial state descriptions; actions have preconditions and effects
4. PDDL is the standard language for representing planning domains and problems
5. Planning can search through state space (forward/backward) or plan space (partial plan refinement)
6. The blocks world is a canonical example illustrating planning concepts
7. Planning is PSPACE-complete in general, requiring efficient algorithms and heuristics for practical problems
8. The factored representation enables more compact encoding than enumerating all states explicitly
