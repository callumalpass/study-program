import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'cs406-t5-ex01',
    subjectId: 'cs406',
    topicId: 'cs406-topic-5',
    title: 'STRIPS Planning Representation',
    difficulty: 2,
    description: `Implement a STRIPS-style planning problem representation.

Your implementation should:
- Define states as sets of propositions
- Define actions with preconditions and effects
- Check if an action is applicable in a state
- Apply actions to generate successor states`,
    starterCode: `class Action:
    def __init__(self, name, preconditions, add_effects, delete_effects):
        pass

    def is_applicable(self, state):
        # Check if action can be applied in state
        pass

    def apply(self, state):
        # Apply action to state, return new state
        pass

class PlanningProblem:
    def __init__(self, initial_state, goal, actions):
        pass

# Example: Blocks World
# Blocks: A, B, C
# States: sets like {'on(A,B)', 'on(B,table)', 'clear(A)', 'clear(C)'}`,
    solution: `class Action:
    def __init__(self, name, preconditions, add_effects, delete_effects):
        self.name = name
        self.preconditions = set(preconditions)
        self.add_effects = set(add_effects)
        self.delete_effects = set(delete_effects)

    def is_applicable(self, state):
        """Check if all preconditions are satisfied in state."""
        return self.preconditions.issubset(state)

    def apply(self, state):
        """Apply action to state, return new state."""
        if not self.is_applicable(state):
            return None

        new_state = state.copy()
        new_state -= self.delete_effects
        new_state |= self.add_effects

        return new_state

    def __repr__(self):
        return f"Action({self.name})"

class PlanningProblem:
    def __init__(self, initial_state, goal, actions):
        self.initial_state = initial_state
        self.goal = goal
        self.actions = actions

    def is_goal(self, state):
        """Check if state satisfies goal."""
        return self.goal.issubset(state)

    def get_applicable_actions(self, state):
        """Return list of actions applicable in state."""
        return [action for action in self.actions if action.is_applicable(state)]

# Blocks World Example
# Actions: move(X, Y) - move block X onto block Y

def create_blocks_world():
    """Create a simple blocks world problem."""

    initial_state = {
        'on(A,table)', 'on(B,table)', 'on(C,A)',
        'clear(C)', 'clear(B)', 'handempty'
    }

    goal = {
        'on(A,B)', 'on(B,C)'
    }

    actions = []

    # Action: pickup(X) - pick up block X from table
    for block in ['A', 'B', 'C']:
        actions.append(Action(
            name=f'pickup({block})',
            preconditions=[f'on({block},table)', f'clear({block})', 'handempty'],
            add_effects=[f'holding({block})'],
            delete_effects=[f'on({block},table)', f'clear({block})', 'handempty']
        ))

    # Action: putdown(X) - put down block X on table
    for block in ['A', 'B', 'C']:
        actions.append(Action(
            name=f'putdown({block})',
            preconditions=[f'holding({block})'],
            add_effects=[f'on({block},table)', f'clear({block})', 'handempty'],
            delete_effects=[f'holding({block})']
        ))

    # Action: stack(X, Y) - stack block X on block Y
    for x in ['A', 'B', 'C']:
        for y in ['A', 'B', 'C']:
            if x != y:
                actions.append(Action(
                    name=f'stack({x},{y})',
                    preconditions=[f'holding({x})', f'clear({y})'],
                    add_effects=[f'on({x},{y})', f'clear({x})', 'handempty'],
                    delete_effects=[f'holding({x})', f'clear({y})']
                ))

    # Action: unstack(X, Y) - unstack block X from block Y
    for x in ['A', 'B', 'C']:
        for y in ['A', 'B', 'C']:
            if x != y:
                actions.append(Action(
                    name=f'unstack({x},{y})',
                    preconditions=[f'on({x},{y})', f'clear({x})', 'handempty'],
                    add_effects=[f'holding({x})', f'clear({y})'],
                    delete_effects=[f'on({x},{y})', f'clear({x})', 'handempty']
                ))

    return PlanningProblem(initial_state, goal, actions)

# Test
problem = create_blocks_world()
print("Initial state:", problem.initial_state)
print("Goal:", problem.goal)
print(f"Is goal satisfied? {problem.is_goal(problem.initial_state)}")

# Test action application
state = problem.initial_state
print(f"\\nApplicable actions in initial state:")
for action in problem.get_applicable_actions(state):
    print(f"  {action.name}")

# Apply an action
unstack_c_a = [a for a in problem.actions if a.name == 'unstack(C,A)'][0]
new_state = unstack_c_a.apply(state)
print(f"\\nAfter {unstack_c_a.name}:")
print(new_state)`  ,
    testCases: [
      { input: 'action.is_applicable(state)', isHidden: false, description: 'Test action applicability checking' },
      { input: 'action.apply(state)', isHidden: false, description: 'Test action application produces correct successor state' },
      { input: 'problem.get_applicable_actions(state)', isHidden: false, description: 'Test finding all applicable actions in a state' }
    ],
    hints: [
      'States are sets of propositions (strings like "on(A,B)", "clear(C)")',
      'An action is applicable if all its preconditions are in the current state',
      'Apply an action by removing delete effects and adding add effects to the state'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t5-ex02',
    subjectId: 'cs406',
    topicId: 'cs406-topic-5',
    title: 'Forward State-Space Planning',
    difficulty: 3,
    description: `Implement forward state-space search for planning.

Your implementation should:
- Search forward from initial state
- Use A* with a planning heuristic
- Generate successor states by applying actions
- Return the plan (sequence of actions)`,
    starterCode: `import heapq

def h_goal_count(state, goal):
    # Heuristic: number of unsatisfied goal propositions
    pass

def forward_search(problem):
    # Implement forward A* search for planning
    # Return: list of actions (plan) or None
    pass`,
    solution: `import heapq

def h_goal_count(state, goal):
    """Heuristic: number of unsatisfied goal propositions."""
    return len(goal - state)

def forward_search(problem, heuristic=h_goal_count):
    """
    Forward state-space A* search for planning.
    Returns: list of actions (plan) or None if no plan found
    """
    initial = problem.initial_state

    # Priority queue: (f, g, state, plan)
    frontier = [(heuristic(initial, problem.goal), 0, initial, [])]
    explored = set()

    nodes_expanded = 0

    while frontier:
        f, g, state, plan = heapq.heappop(frontier)

        # Convert state to frozenset for hashing
        state_key = frozenset(state)

        if state_key in explored:
            continue

        explored.add(state_key)
        nodes_expanded += 1

        # Goal check
        if problem.is_goal(state):
            print(f"Plan found! Nodes expanded: {nodes_expanded}")
            return plan

        # Expand state
        for action in problem.get_applicable_actions(state):
            new_state = action.apply(state)

            if new_state is None:
                continue

            new_state_key = frozenset(new_state)

            if new_state_key in explored:
                continue

            new_g = g + 1  # Unit cost per action
            new_h = heuristic(new_state, problem.goal)
            new_f = new_g + new_h
            new_plan = plan + [action]

            heapq.heappush(frontier, (new_f, new_g, new_state, new_plan))

    print(f"No plan found. Nodes expanded: {nodes_expanded}")
    return None

# Test with Blocks World
from topic5_strips import create_blocks_world

problem = create_blocks_world()
print("Initial state:", problem.initial_state)
print("Goal:", problem.goal)

plan = forward_search(problem)

if plan:
    print(f"\\nPlan ({len(plan)} steps):")
    state = problem.initial_state
    for i, action in enumerate(plan):
        print(f"{i+1}. {action.name}")
        state = action.apply(state)
    print("\\nFinal state:", state)
    print(f"Goal satisfied: {problem.is_goal(state)}")
else:
    print("No plan found!")

# Test with more complex delete-relaxation heuristic
def h_delete_relaxation(state, goal):
    """
    Better heuristic: solve delete-relaxed problem.
    (Simplified version: just count goal propositions)
    """
    # In full implementation, this would solve the problem
    # ignoring delete effects to get admissible estimate
    return len(goal - state)

print("\\n--- Testing with delete-relaxation heuristic ---")
plan2 = forward_search(problem, heuristic=h_delete_relaxation)

if plan2:
    print(f"Plan length: {len(plan2)}")`  ,
    testCases: [
      { input: 'forward_search(problem)', isHidden: false, description: 'Test forward search finds valid plan' },
      { input: 'h_goal_count(state, goal)', isHidden: false, description: 'Test heuristic counts unsatisfied goals' },
      { input: 'plan execution reaches goal', isHidden: false, description: 'Test executing plan satisfies goal' }
    ],
    hints: [
      'Use A* search with states instead of paths - the g-value is the number of actions taken',
      'The goal-count heuristic counts propositions in the goal that are not in the current state',
      'Use frozenset to make states hashable for the explored set'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t5-ex03',
    subjectId: 'cs406',
    topicId: 'cs406-topic-5',
    title: 'GraphPlan Algorithm',
    difficulty: 4,
    description: `Implement a simplified GraphPlan algorithm.

Your implementation should:
- Build planning graph with alternating proposition/action layers
- Identify mutex relations between actions
- Extract solution from the graph
- Handle multiple levels until fixed point`,
    starterCode: `class PlanningGraph:
    def __init__(self, problem):
        self.problem = problem
        self.prop_layers = []
        self.action_layers = []

    def expand(self):
        # Add one proposition and action layer
        pass

    def extract_solution(self):
        # Try to extract plan from graph
        pass

def graphplan(problem):
    # Implement GraphPlan
    pass`,
    solution: `class PlanningGraph:
    def __init__(self, problem):
        self.problem = problem
        self.prop_layers = [problem.initial_state.copy()]
        self.action_layers = []

    def expand(self):
        """Add one proposition layer and one action layer."""
        if not self.prop_layers:
            return False

        prev_props = self.prop_layers[-1]

        # Action layer: applicable actions from previous prop layer
        applicable = []
        for action in self.problem.actions:
            if action.is_applicable(prev_props):
                applicable.append(action)

        # Add no-op actions for each proposition
        for prop in prev_props:
            from topic5_strips import Action
            noop = Action(
                name=f'no-op({prop})',
                preconditions=[prop],
                add_effects=[prop],
                delete_effects=[]
            )
            applicable.append(noop)

        self.action_layers.append(applicable)

        # Proposition layer: effects of all actions in action layer
        new_props = set()
        for action in applicable:
            new_props |= action.add_effects

        self.prop_layers.append(new_props)

        return True

    def all_goals_reachable(self):
        """Check if all goal propositions are in latest layer."""
        if not self.prop_layers:
            return False

        return self.problem.goal.issubset(self.prop_layers[-1])

    def extract_solution(self, level=None):
        """
        Try to extract plan from graph at given level.
        Simplified version: just check if goals are reachable.
        """
        if level is None:
            level = len(self.prop_layers) - 1

        if level < 0:
            return None

        # Check if goals are in this layer
        if not self.problem.goal.issubset(self.prop_layers[level]):
            return None

        # For simplicity, find actions that achieve goals
        # (Full GraphPlan would do backward search with mutex checking)

        plan = []
        current_goals = self.problem.goal.copy()
        current_level = level

        while current_level > 0 and current_goals:
            # Find actions in previous layer that achieve current goals
            actions = self.action_layers[current_level - 1]

            # Greedy selection (not optimal)
            selected = []
            achieved = set()

            for action in actions:
                if action.name.startswith('no-op'):
                    continue

                # Check if action achieves any goal
                if action.add_effects & current_goals:
                    selected.append(action)
                    achieved |= action.add_effects

            plan = selected + plan
            current_goals = set()

            # New goals = preconditions of selected actions
            for action in selected:
                current_goals |= action.preconditions

            current_level -= 1

        return plan if current_level == 0 else None

    def has_reached_fixed_point(self):
        """Check if two consecutive prop layers are identical."""
        if len(self.prop_layers) < 2:
            return False

        return self.prop_layers[-1] == self.prop_layers[-2]

def graphplan(problem, max_levels=10):
    """
    GraphPlan algorithm (simplified).
    Returns: plan (list of actions) or None
    """
    graph = PlanningGraph(problem)

    for level in range(max_levels):
        print(f"Level {level}: {len(graph.prop_layers[-1])} propositions")

        # Check if all goals are reachable
        if graph.all_goals_reachable():
            print(f"Goals reachable at level {level}")

            # Try to extract solution
            plan = graph.extract_solution()

            if plan:
                return plan

        # Expand graph
        graph.expand()

        # Check for fixed point
        if graph.has_reached_fixed_point():
            print("Fixed point reached, no solution exists")
            return None

    print("Max levels reached")
    return None

# Test
from topic5_strips import create_blocks_world

problem = create_blocks_world()
print("Initial state:", problem.initial_state)
print("Goal:", problem.goal)

plan = graphplan(problem)

if plan:
    print(f"\\nGraphPlan found plan ({len(plan)} steps):")
    state = problem.initial_state
    for i, action in enumerate(plan):
        print(f"{i+1}. {action.name}")
        state = action.apply(state)

    print("\\nFinal state:", state)
    print(f"Goal satisfied: {problem.is_goal(state)}")
else:
    print("\\nNo plan found")

# Compare with forward search
from topic5_forward import forward_search
print("\\n--- Comparing with Forward Search ---")
plan_forward = forward_search(problem)
if plan_forward:
    print(f"Forward search plan length: {len(plan_forward)}")
if plan:
    print(f"GraphPlan plan length: {len(plan)}")`  ,
    testCases: [
      { input: 'graphplan(problem)', isHidden: false, description: 'Test GraphPlan finds valid plan' },
      { input: 'graph.expand()', isHidden: false, description: 'Test graph expansion adds proposition and action layers' },
      { input: 'graph.all_goals_reachable()', isHidden: false, description: 'Test goal reachability detection' }
    ],
    hints: [
      'Build alternating layers: propositions, then actions, then propositions, etc.',
      'Include no-op actions for each proposition to maintain persistence',
      'Extract solution by working backwards from the goal layer, selecting actions that achieve goals',
      'Reach fixed point when two consecutive proposition layers are identical (no new propositions)'
    ],
    language: 'python'
  }
];
