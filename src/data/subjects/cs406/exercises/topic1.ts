import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'cs406-t1-ex01',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Simple Reflex Agent for Thermostat',
    difficulty: 1,
    description: `Implement a simple reflex agent that controls a thermostat.

Your implementation should:
- Read temperature from a sensor
- Turn on heating if temperature < 18°C
- Turn on cooling if temperature > 24°C
- Turn off both otherwise
- Log all state changes`,
    starterCode: `class ThermostatAgent:
    def __init__(self, target_low=18, target_high=24):
        self.target_low = target_low
        self.target_high = target_high
        self.heating_on = False
        self.cooling_on = False

    def perceive(self, temperature: float) -> dict:
        # Return perception
        pass

    def decide_action(self, percept: dict) -> str:
        # Decide what action to take
        pass

    def execute(self, action: str):
        # Execute the action
        pass

# Example usage:
# agent = ThermostatAgent()
# agent.perceive(15.0)  # Cold
# agent.perceive(22.0)  # Just right
# agent.perceive(26.0)  # Hot`,
    solution: `class ThermostatAgent:
    def __init__(self, target_low=18, target_high=24):
        self.target_low = target_low
        self.target_high = target_high
        self.heating_on = False
        self.cooling_on = False
        self.log = []

    def perceive(self, temperature: float) -> dict:
        return {
            'temperature': temperature,
            'too_cold': temperature < self.target_low,
            'too_hot': temperature > self.target_high,
            'comfortable': self.target_low <= temperature <= self.target_high
        }

    def decide_action(self, percept: dict) -> str:
        if percept['too_cold']:
            return 'HEAT_ON'
        elif percept['too_hot']:
            return 'COOL_ON'
        else:
            return 'OFF'

    def execute(self, action: str):
        if action == 'HEAT_ON':
            if not self.heating_on:
                self.heating_on = True
                self.cooling_on = False
                self.log.append('Heating ON')
        elif action == 'COOL_ON':
            if not self.cooling_on:
                self.heating_on = False
                self.cooling_on = True
                self.log.append('Cooling ON')
        else:  # OFF
            if self.heating_on or self.cooling_on:
                self.heating_on = False
                self.cooling_on = False
                self.log.append('System OFF')

    def run(self, temperature: float):
        percept = self.perceive(temperature)
        action = self.decide_action(percept)
        self.execute(action)
        return action

# Test
agent = ThermostatAgent()
print(agent.run(15.0))  # HEAT_ON
print(agent.run(22.0))  # OFF
print(agent.run(26.0))  # COOL_ON
print('Log:', agent.log)`,
    testCases: [
      { input: 'agent.run(15.0)', isHidden: false, description: 'Test cold temperature (below 18°C)' },
      { input: 'agent.run(22.0)', isHidden: false, description: 'Test comfortable temperature (18-24°C)' },
      { input: 'agent.run(26.0)', isHidden: false, description: 'Test hot temperature (above 24°C)' }
    ],
    hints: [
      'Start by implementing the perceive() method to create a dictionary with temperature information',
      'The decide_action() method should check percept values and return appropriate action strings',
      'Use boolean flags (heating_on, cooling_on) to track current state and avoid duplicate log entries'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex02',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Model-Based Agent with State',
    difficulty: 2,
    description: `Implement a model-based vacuum cleaner agent that maintains state.

The agent should:
- Track which locations it has visited
- Remember which locations are clean
- Move to dirty locations efficiently
- Handle a 2D grid environment`,
    starterCode: `class VacuumAgent:
    def __init__(self, grid_size=(3, 3)):
        self.grid_size = grid_size
        self.position = (0, 0)
        # TODO: Initialize internal state

    def update_state(self, percept):
        # Update internal model of world
        pass

    def choose_action(self):
        # Choose action based on state
        pass

# Grid: 0=clean, 1=dirty
# Actions: 'SUCK', 'UP', 'DOWN', 'LEFT', 'RIGHT'`,
    solution: `class VacuumAgent:
    def __init__(self, grid_size=(3, 3)):
        self.grid_size = grid_size
        self.position = (0, 0)
        self.world_state = {}  # (x,y) -> 'clean'/'dirty'/'unknown'
        self.visited = set()

        # Initialize all as unknown
        for i in range(grid_size[0]):
            for j in range(grid_size[1]):
                self.world_state[(i, j)] = 'unknown'

    def update_state(self, percept):
        # percept = {'location': (x,y), 'dirty': bool}
        loc = percept['location']
        self.position = loc
        self.visited.add(loc)

        if percept['dirty']:
            self.world_state[loc] = 'dirty'
        else:
            self.world_state[loc] = 'clean'

    def choose_action(self):
        x, y = self.position

        # If current location dirty, suck
        if self.world_state[self.position] == 'dirty':
            self.world_state[self.position] = 'clean'
            return 'SUCK'

        # Find nearest dirty or unknown location
        target = self.find_target()

        if target is None:
            return 'DONE'  # All clean

        # Move toward target
        tx, ty = target
        if tx < x and x > 0:
            return 'LEFT'
        elif tx > x and x < self.grid_size[0] - 1:
            return 'RIGHT'
        elif ty < y and y > 0:
            return 'DOWN'
        elif ty > y and y < self.grid_size[1] - 1:
            return 'UP'

        return 'DONE'

    def find_target(self):
        # Find nearest dirty or unknown location
        for dx in range(max(self.grid_size)):
            for dy in range(max(self.grid_size)):
                # Check all locations at Manhattan distance dx+dy
                for loc in self.get_locations_at_distance(dx + dy):
                    if self.world_state.get(loc, 'unknown') in ['dirty', 'unknown']:
                        return loc
        return None

    def get_locations_at_distance(self, dist):
        x, y = self.position
        locs = []
        for i in range(self.grid_size[0]):
            for j in range(self.grid_size[1]):
                if abs(i - x) + abs(j - y) == dist:
                    locs.append((i, j))
        return locs

# Test
agent = VacuumAgent((3, 3))
agent.update_state({'location': (0, 0), 'dirty': True})
print(agent.choose_action())  # SUCK
agent.update_state({'location': (0, 0), 'dirty': False})
print(agent.choose_action())  # Move to explore`,
    testCases: [
      { input: 'agent.choose_action() when location is dirty', isHidden: false, description: 'Test agent sucks when location is dirty' },
      { input: 'agent.choose_action() after cleaning', isHidden: false, description: 'Test agent moves to explore after cleaning' },
      { input: 'agent.world_state tracking', isHidden: false, description: 'Test internal state is maintained correctly' }
    ],
    hints: [
      'Use a dictionary to store the world state, mapping (x,y) positions to clean/dirty/unknown',
      'The find_target() method should search for the nearest dirty or unknown location using Manhattan distance',
      'Remember to update the world_state after sucking to mark the location as clean'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex03',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Goal-Based Agent for Route Planning',
    difficulty: 2,
    description: `Implement a goal-based agent that plans routes to reach a destination.

Your implementation should:
- Maintain a world model (map)
- Define goals (target locations)
- Plan sequences of actions to reach goals
- Adapt to changing environments`,
    starterCode: `class RouteAgent:
    def __init__(self, world_map, start, goal):
        self.world_map = world_map
        self.position = start
        self.goal = goal
        self.plan = []

    def make_plan(self):
        # Create plan to reach goal
        pass

    def execute_plan(self):
        # Execute the plan step by step
        pass

# World map: graph with nodes and edges
# world_map = {'A': ['B', 'C'], 'B': ['D'], ...}`,
    solution: `from collections import deque

class RouteAgent:
    def __init__(self, world_map, start, goal):
        self.world_map = world_map
        self.position = start
        self.goal = goal
        self.plan = []

    def make_plan(self):
        """Use BFS to find path from current position to goal."""
        if self.position == self.goal:
            return []

        queue = deque([(self.position, [self.position])])
        visited = set()

        while queue:
            node, path = queue.popleft()

            if node in visited:
                continue

            visited.add(node)

            if node == self.goal:
                self.plan = path[1:]  # Exclude starting position
                return self.plan

            for neighbor in self.world_map.get(node, []):
                if neighbor not in visited:
                    queue.append((neighbor, path + [neighbor]))

        return None  # No path found

    def execute_plan(self):
        """Execute plan step by step."""
        if not self.plan:
            return "Already at goal or no plan"

        steps = []
        for next_pos in self.plan:
            steps.append(f"Move from {self.position} to {next_pos}")
            self.position = next_pos

        return steps

    def replan_if_needed(self, blocked_nodes):
        """Replan if current plan goes through blocked nodes."""
        if any(node in blocked_nodes for node in self.plan):
            # Remove blocked nodes from map temporarily
            temp_map = {k: [v for v in vals if v not in blocked_nodes]
                       for k, vals in self.world_map.items()}

            old_map = self.world_map
            self.world_map = temp_map

            result = self.make_plan()

            self.world_map = old_map
            return result is not None

        return True

# Test
world_map = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': ['G'],
    'E': ['G'],
    'F': ['G'],
    'G': []
}

agent = RouteAgent(world_map, 'A', 'G')
print("Initial position:", agent.position)
print("Goal:", agent.goal)

plan = agent.make_plan()
print("Plan:", plan)

steps = agent.execute_plan()
print("Execution:")
for step in steps:
    print(f"  {step}")

print("Final position:", agent.position)`,
    testCases: [
      { input: 'agent.make_plan()', isHidden: false, description: 'Test agent creates valid plan to goal' },
      { input: 'agent.execute_plan()', isHidden: false, description: 'Test plan execution reaches goal' },
      { input: 'agent.replan_if_needed(blocked_nodes)', isHidden: false, description: 'Test agent replans when obstacles appear' }
    ],
    hints: [
      'Use BFS to find the shortest path from current position to goal',
      'Store the plan as a sequence of positions to visit',
      'Execute the plan by moving through each position in order'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex04',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Utility-Based Agent for Resource Allocation',
    difficulty: 3,
    description: `Implement a utility-based agent that allocates resources to maximize utility.

Your implementation should:
- Define utility function for different outcomes
- Evaluate expected utility of actions
- Choose action that maximizes expected utility
- Handle uncertain outcomes`,
    starterCode: `class ResourceAgent:
    def __init__(self, resources):
        self.resources = resources

    def utility(self, allocation):
        # Calculate utility of resource allocation
        pass

    def choose_action(self, possible_actions):
        # Choose action with maximum expected utility
        pass

# Example: Allocate budget between projects
# Each project has cost and uncertain return`,
    solution: `import random

class ResourceAgent:
    def __init__(self, resources):
        self.resources = resources

    def utility(self, allocation):
        """
        Calculate utility of resource allocation.
        allocation: dict mapping project -> amount

        Utility increases with allocation but with diminishing returns.
        """
        total_utility = 0

        for project, amount in allocation.items():
            # Diminishing returns: sqrt(amount) * project_value
            project_value = {
                'A': 100,
                'B': 150,
                'C': 80
            }.get(project, 50)

            total_utility += (amount ** 0.5) * project_value

        return total_utility

    def expected_utility(self, action, outcomes, probabilities):
        """
        Calculate expected utility of action.
        action: resource allocation
        outcomes: list of possible results
        probabilities: probability of each outcome
        """
        expected = 0
        for outcome, prob in zip(outcomes, probabilities):
            # Apply outcome multiplier to allocation
            adjusted = {k: v * outcome for k, v in action.items()}
            expected += prob * self.utility(adjusted)

        return expected

    def choose_action(self, possible_actions, outcomes=None, probabilities=None):
        """Choose action with maximum expected utility."""
        if outcomes is None:
            # Deterministic case
            best_action = None
            best_utility = float('-inf')

            for action in possible_actions:
                # Check if allocation is valid (within resources)
                if sum(action.values()) <= self.resources:
                    util = self.utility(action)
                    if util > best_utility:
                        best_utility = util
                        best_action = action

            return best_action, best_utility
        else:
            # Stochastic case
            best_action = None
            best_expected = float('-inf')

            for action in possible_actions:
                if sum(action.values()) <= self.resources:
                    expected = self.expected_utility(action, outcomes, probabilities)
                    if expected > best_expected:
                        best_expected = expected
                        best_action = action

            return best_action, best_expected

# Test
agent = ResourceAgent(resources=100)

# Possible allocations
possible_actions = [
    {'A': 50, 'B': 50, 'C': 0},
    {'A': 60, 'B': 20, 'C': 20},
    {'A': 30, 'B': 30, 'C': 40},
    {'A': 0, 'B': 100, 'C': 0},
    {'A': 40, 'B': 40, 'C': 20}
]

print("Resource Allocation Agent")
print(f"Total resources: {agent.resources}")
print()

# Deterministic case
print("Deterministic utility:")
best_action, best_util = agent.choose_action(possible_actions)
print(f"Best allocation: {best_action}")
print(f"Utility: {best_util:.2f}")
print()

# Stochastic case (uncertain outcomes)
print("Stochastic case (uncertain project success):")
outcomes = [0.5, 1.0, 1.5]  # Project could underperform, meet, or exceed expectations
probabilities = [0.2, 0.5, 0.3]

best_action, best_expected = agent.choose_action(
    possible_actions,
    outcomes,
    probabilities
)
print(f"Best allocation: {best_action}")
print(f"Expected utility: {best_expected:.2f}")`,
    testCases: [
      { input: 'agent.utility(allocation)', isHidden: false, description: 'Test utility calculation for allocation' },
      { input: 'agent.choose_action(possible_actions)', isHidden: false, description: 'Test agent chooses action maximizing utility' },
      { input: 'agent.expected_utility(action, outcomes, probabilities)', isHidden: false, description: 'Test expected utility with uncertainty' }
    ],
    hints: [
      'Utility function should capture preferences (e.g., diminishing returns)',
      'Expected utility = sum of (probability × utility) over all possible outcomes',
      'Choose the action with highest expected utility among valid options'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex05',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Learning Agent with Experience',
    difficulty: 3,
    description: `Implement a learning agent that improves from experience.

Your implementation should:
- Maintain performance history
- Learn from successes and failures
- Update internal model based on experience
- Improve decision-making over time`,
    starterCode: `class LearningAgent:
    def __init__(self):
        self.experience = []
        self.model = {}

    def act(self, state):
        # Choose action based on current model
        pass

    def learn(self, state, action, reward):
        # Update model based on experience
        pass

    def performance(self):
        # Return average reward
        pass`,
    solution: `import random

class LearningAgent:
    def __init__(self, actions, learning_rate=0.1, epsilon=0.1):
        self.actions = actions
        self.experience = []

        # Q-values: (state, action) -> expected reward
        self.q_values = {}

        self.learning_rate = learning_rate
        self.epsilon = epsilon  # Exploration rate

    def get_q_value(self, state, action):
        """Get Q-value for state-action pair."""
        return self.q_values.get((state, action), 0.0)

    def act(self, state):
        """Choose action using epsilon-greedy policy."""
        # Exploration: random action
        if random.random() < self.epsilon:
            return random.choice(self.actions)

        # Exploitation: best known action
        best_action = None
        best_value = float('-inf')

        for action in self.actions:
            q_val = self.get_q_value(state, action)
            if q_val > best_value:
                best_value = q_val
                best_action = action

        # If all Q-values are 0, choose randomly
        if best_action is None:
            best_action = random.choice(self.actions)

        return best_action

    def learn(self, state, action, reward, next_state=None):
        """Update Q-value based on experience."""
        self.experience.append((state, action, reward))

        # Current Q-value
        current_q = self.get_q_value(state, action)

        # Simple update: moving average toward observed reward
        if next_state is None:
            # Terminal state
            target = reward
        else:
            # Q-learning update: reward + best future Q-value
            best_next_q = max(
                (self.get_q_value(next_state, a) for a in self.actions),
                default=0.0
            )
            target = reward + best_next_q

        # Update Q-value
        new_q = current_q + self.learning_rate * (target - current_q)
        self.q_values[(state, action)] = new_q

    def performance(self):
        """Return average reward over all experience."""
        if not self.experience:
            return 0.0

        total_reward = sum(reward for _, _, reward in self.experience)
        return total_reward / len(self.experience)

    def get_policy(self):
        """Extract learned policy."""
        policy = {}
        states = set(state for (state, _), _ in self.q_values.items())

        for state in states:
            best_action = None
            best_value = float('-inf')

            for action in self.actions:
                q_val = self.get_q_value(state, action)
                if q_val > best_value:
                    best_value = q_val
                    best_action = action

            policy[state] = best_action

        return policy

# Test with simple grid world
actions = ['up', 'down', 'left', 'right']
agent = LearningAgent(actions, learning_rate=0.1, epsilon=0.2)

print("Learning Agent Simulation")
print("="*50)

# Simulate episodes
# State: (x, y), Goal: (5, 5), Reward: -1 per step, +10 at goal

def get_next_state(state, action):
    """Get next state given action."""
    x, y = state
    if action == 'up':
        return (x, min(y + 1, 5))
    elif action == 'down':
        return (x, max(y - 1, 0))
    elif action == 'left':
        return (max(x - 1, 0), y)
    elif action == 'right':
        return (min(x + 1, 5), y)
    return state

def get_reward(state):
    """Get reward for reaching state."""
    if state == (5, 5):
        return 10.0
    return -1.0

# Train for multiple episodes
num_episodes = 100
for episode in range(num_episodes):
    state = (0, 0)
    steps = 0
    max_steps = 50

    while state != (5, 5) and steps < max_steps:
        action = agent.act(state)
        next_state = get_next_state(state, action)
        reward = get_reward(next_state)

        agent.learn(state, action, reward, next_state)

        state = next_state
        steps += 1

    if (episode + 1) % 20 == 0:
        print(f"Episode {episode + 1}: Avg reward = {agent.performance():.2f}")

print()
print(f"Final average reward: {agent.performance():.2f}")
print(f"Total experiences: {len(agent.experience)}")

# Show learned policy for some states
print("\\nLearned policy (sample states):")
policy = agent.get_policy()
for state in [(0, 0), (2, 2), (4, 4), (5, 4)]:
    if state in policy:
        print(f"  State {state}: {policy[state]}")`,
    testCases: [
      { input: 'agent.act(state)', isHidden: false, description: 'Test agent chooses actions (exploration vs exploitation)' },
      { input: 'agent.learn(state, action, reward)', isHidden: false, description: 'Test learning updates Q-values' },
      { input: 'agent.performance()', isHidden: false, description: 'Test performance improves over time' }
    ],
    hints: [
      'Use Q-learning to learn value of state-action pairs',
      'Epsilon-greedy policy balances exploration (random) and exploitation (best known)',
      'Update Q-values using: Q(s,a) ← Q(s,a) + α[r + max Q(s\',a\') - Q(s,a)]'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex06',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Multi-Agent System - Collaborative Agents',
    difficulty: 3,
    description: `Implement multiple agents that collaborate to achieve a shared goal.

Your implementation should:
- Coordinate multiple agents
- Share information between agents
- Divide tasks among agents
- Achieve goals faster through collaboration`,
    starterCode: `class CollaborativeAgent:
    def __init__(self, agent_id, shared_knowledge):
        self.id = agent_id
        self.shared_knowledge = shared_knowledge

    def perceive(self, environment):
        pass

    def communicate(self, message):
        pass

    def act(self):
        pass`,
    solution: `class SharedKnowledge:
    """Shared knowledge base for collaborative agents."""
    def __init__(self):
        self.discovered_items = set()
        self.agent_positions = {}
        self.assigned_tasks = {}

    def add_discovery(self, item, location):
        """Add newly discovered item."""
        self.discovered_items.add((item, location))

    def update_position(self, agent_id, position):
        """Update agent position."""
        self.agent_positions[agent_id] = position

    def assign_task(self, agent_id, task):
        """Assign task to agent."""
        self.assigned_tasks[agent_id] = task

    def get_unassigned_items(self):
        """Get items not yet assigned to any agent."""
        assigned = set(task for task in self.assigned_tasks.values() if task)
        return [item for item in self.discovered_items if item not in assigned]

class CollaborativeAgent:
    def __init__(self, agent_id, position, shared_knowledge):
        self.id = agent_id
        self.position = position
        self.shared_knowledge = shared_knowledge
        self.holding = None
        self.target = None

    def perceive(self, environment):
        """Perceive environment and share discoveries."""
        # Check current location for items
        if self.position in environment:
            item = environment[self.position]
            self.shared_knowledge.add_discovery(item, self.position)

        # Update own position
        self.shared_knowledge.update_position(self.id, self.position)

    def communicate(self, message):
        """Process message from another agent."""
        if message['type'] == 'request_help':
            return self.offer_help(message)
        elif message['type'] == 'task_complete':
            return self.acknowledge_completion(message)

    def select_task(self):
        """Select next task based on shared knowledge."""
        # Check if already have a task
        if self.target:
            return self.target

        # Get unassigned items
        unassigned = self.shared_knowledge.get_unassigned_items()

        if not unassigned:
            return None

        # Choose nearest unassigned item
        best_item = None
        best_distance = float('inf')

        for item, location in unassigned:
            distance = abs(location[0] - self.position[0]) + abs(location[1] - self.position[1])
            if distance < best_distance:
                best_distance = distance
                best_item = (item, location)

        if best_item:
            self.shared_knowledge.assign_task(self.id, best_item)
            self.target = best_item

        return self.target

    def act(self):
        """Execute action toward current goal."""
        if not self.target:
            self.select_task()

        if not self.target:
            return f"Agent {self.id}: No tasks available"

        item, location = self.target

        # Move toward target
        if self.position != location:
            # Simple movement (Manhattan)
            x, y = self.position
            tx, ty = location

            if x < tx:
                self.position = (x + 1, y)
            elif x > tx:
                self.position = (x - 1, y)
            elif y < ty:
                self.position = (x, y + 1)
            elif y > ty:
                self.position = (x, y - 1)

            self.shared_knowledge.update_position(self.id, self.position)
            return f"Agent {self.id}: Moving to {location}"
        else:
            # Reached target, pick up item
            self.holding = item
            self.target = None
            self.shared_knowledge.assign_task(self.id, None)
            return f"Agent {self.id}: Collected {item}"

    def offer_help(self, message):
        """Offer to help another agent."""
        return {
            'agent_id': self.id,
            'available': self.target is None,
            'position': self.position
        }

    def acknowledge_completion(self, message):
        """Acknowledge task completion."""
        return f"Agent {self.id}: Acknowledged completion by Agent {message['agent_id']}"

# Test multi-agent collaboration
print("Multi-Agent Collaboration Simulation")
print("="*50)

# Environment: items at locations
environment = {
    (2, 3): 'ItemA',
    (5, 1): 'ItemB',
    (1, 5): 'ItemC',
    (7, 7): 'ItemD',
    (3, 8): 'ItemE'
}

# Shared knowledge
shared = SharedKnowledge()

# Create agents at different positions
agents = [
    CollaborativeAgent('Agent1', (0, 0), shared),
    CollaborativeAgent('Agent2', (5, 5), shared),
    CollaborativeAgent('Agent3', (8, 0), shared)
]

print(f"Environment has {len(environment)} items to collect")
print(f"Number of agents: {len(agents)}")
print()

# Simulate
collected = 0
max_steps = 50

for step in range(max_steps):
    print(f"Step {step + 1}:")

    # All agents perceive
    for agent in agents:
        agent.perceive(environment)

    # All agents act
    for agent in agents:
        action = agent.act()
        print(f"  {action}")

        if "Collected" in action:
            collected += 1

    # Check if all items collected
    if collected >= len(environment):
        print(f"\\nAll items collected in {step + 1} steps!")
        break

    print()

print(f"\\nFinal state:")
print(f"Items collected: {collected}/{len(environment)}")
for agent in agents:
    print(f"  {agent.id} at {agent.position}, holding: {agent.holding}")`,
    testCases: [
      { input: 'agent.perceive(environment)', isHidden: false, description: 'Test agent perceives and shares information' },
      { input: 'agent.select_task()', isHidden: false, description: 'Test agents coordinate to avoid duplicate work' },
      { input: 'agent.act()', isHidden: false, description: 'Test agents work together to complete all tasks' }
    ],
    hints: [
      'Use shared knowledge structure for communication between agents',
      'Agents should claim tasks to avoid duplication',
      'Each agent selects nearest unassigned task for efficiency'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex07',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Reactive Agent with Subsumption Architecture',
    difficulty: 2,
    description: `Implement a reactive agent using subsumption architecture with layered behaviors.

Your implementation should:
- Define multiple behavior layers
- Implement priority-based arbitration
- Higher layers can override lower layers
- React quickly to environment changes`,
    starterCode: `class Behavior:
    def __init__(self, name, priority):
        self.name = name
        self.priority = priority

    def is_active(self, percepts):
        # Check if behavior should activate
        pass

    def action(self, percepts):
        # Return action to execute
        pass

class SubsumptionAgent:
    def __init__(self):
        self.behaviors = []

    def add_behavior(self, behavior):
        pass

    def select_action(self, percepts):
        pass`,
    solution: `class Behavior:
    """Base class for behaviors in subsumption architecture."""
    def __init__(self, name, priority):
        self.name = name
        self.priority = priority

    def is_active(self, percepts):
        """Check if behavior conditions are met."""
        raise NotImplementedError

    def action(self, percepts):
        """Return action to execute."""
        raise NotImplementedError

class AvoidObstacle(Behavior):
    """High priority: avoid obstacles."""
    def __init__(self):
        super().__init__("AvoidObstacle", priority=3)

    def is_active(self, percepts):
        return percepts.get('obstacle_ahead', False)

    def action(self, percepts):
        # Turn away from obstacle
        if percepts.get('obstacle_left', False):
            return 'turn_right'
        else:
            return 'turn_left'

class MoveToGoal(Behavior):
    """Medium priority: move toward goal."""
    def __init__(self):
        super().__init__("MoveToGoal", priority=2)

    def is_active(self, percepts):
        return percepts.get('goal_detected', False)

    def action(self, percepts):
        goal_dir = percepts.get('goal_direction')
        if goal_dir == 'left':
            return 'turn_left'
        elif goal_dir == 'right':
            return 'turn_right'
        else:
            return 'move_forward'

class Wander(Behavior):
    """Low priority: random exploration."""
    def __init__(self):
        super().__init__("Wander", priority=1)

    def is_active(self, percepts):
        return True  # Always active as fallback

    def action(self, percepts):
        import random
        return random.choice(['move_forward', 'turn_left', 'turn_right'])

class SubsumptionAgent:
    """Agent using subsumption architecture."""
    def __init__(self):
        self.behaviors = []

    def add_behavior(self, behavior):
        """Add behavior to agent."""
        self.behaviors.append(behavior)
        # Sort by priority (highest first)
        self.behaviors.sort(key=lambda b: b.priority, reverse=True)

    def select_action(self, percepts):
        """Select action from highest priority active behavior."""
        for behavior in self.behaviors:
            if behavior.is_active(percepts):
                action = behavior.action(percepts)
                return action, behavior.name

        return 'stop', 'None'

# Test subsumption agent
print("Subsumption Architecture Agent")
print("="*50)

# Create agent
agent = SubsumptionAgent()

# Add behaviors (order doesn't matter, sorted by priority)
agent.add_behavior(Wander())
agent.add_behavior(MoveToGoal())
agent.add_behavior(AvoidObstacle())

print("Behaviors (by priority):")
for b in agent.behaviors:
    print(f"  {b.name} (priority {b.priority})")
print()

# Test scenarios
scenarios = [
    {
        'name': 'Obstacle ahead',
        'percepts': {'obstacle_ahead': True, 'obstacle_left': False, 'goal_detected': True, 'goal_direction': 'forward'}
    },
    {
        'name': 'Goal visible, no obstacles',
        'percepts': {'obstacle_ahead': False, 'goal_detected': True, 'goal_direction': 'left'}
    },
    {
        'name': 'No goal, no obstacles',
        'percepts': {'obstacle_ahead': False, 'goal_detected': False}
    },
    {
        'name': 'Goal right, obstacle ahead',
        'percepts': {'obstacle_ahead': True, 'obstacle_left': True, 'goal_detected': True, 'goal_direction': 'right'}
    }
]

for scenario in scenarios:
    action, behavior = agent.select_action(scenario['percepts'])
    print(f"Scenario: {scenario['name']}")
    print(f"  Active behavior: {behavior}")
    print(f"  Action: {action}")
    print()

# Simulation
print("="*50)
print("Simulation")
print("="*50)

position = (0, 0)
goal = (5, 5)
obstacles = [(2, 2), (3, 2), (4, 3)]

for step in range(15):
    # Create percepts based on position
    percepts = {}

    # Check obstacle ahead (simplified)
    x, y = position
    obstacle_positions = [
        (x+1, y), (x, y+1), (x-1, y), (x, y-1)
    ]
    percepts['obstacle_ahead'] = any(pos in obstacles for pos in obstacle_positions)
    percepts['obstacle_left'] = (x-1, y) in obstacles

    # Check goal
    percepts['goal_detected'] = True
    gx, gy = goal
    if gx > x:
        percepts['goal_direction'] = 'right'
    elif gx < x:
        percepts['goal_direction'] = 'left'
    elif gy > y:
        percepts['goal_direction'] = 'forward'
    else:
        percepts['goal_direction'] = 'forward'

    # Select action
    action, behavior = agent.select_action(percepts)

    print(f"Step {step+1}: Position {position}, Behavior: {behavior}, Action: {action}")

    # Update position (simplified)
    if action == 'move_forward' and not percepts['obstacle_ahead']:
        if position[1] < goal[1]:
            position = (position[0], position[1] + 1)
        elif position[0] < goal[0]:
            position = (position[0] + 1, position[1])
    elif action == 'turn_right':
        if position[0] < goal[0]:
            position = (position[0] + 1, position[1])
    elif action == 'turn_left':
        if position[1] < goal[1]:
            position = (position[0], position[1] + 1)

    if position == goal:
        print(f"\\nGoal reached at step {step+1}!")
        break`,
    testCases: [
      { input: 'agent.select_action(percepts)', isHidden: false, description: 'Test agent selects highest priority active behavior' },
      { input: 'behavior.is_active(percepts)', isHidden: false, description: 'Test behavior activation conditions' },
      { input: 'agent with obstacle', isHidden: false, description: 'Test avoid behavior overrides move-to-goal' }
    ],
    hints: [
      'Subsumption: higher priority behaviors suppress lower ones',
      'Check behaviors in priority order, use first active one',
      'Avoid behavior should have highest priority for safety'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex08',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Agent Environment Interaction Loop',
    difficulty: 2,
    description: `Implement a complete agent-environment interaction simulation.

Your implementation should:
- Define environment with states and transitions
- Implement agent with perception and action
- Run interaction loop
- Track performance metrics`,
    starterCode: `class Environment:
    def __init__(self, initial_state):
        self.state = initial_state

    def get_percepts(self):
        pass

    def apply_action(self, action):
        pass

class Agent:
    def perceive(self, percepts):
        pass

    def decide(self):
        pass

def run_simulation(env, agent, steps):
    pass`,
    solution: `import random

class GridEnvironment:
    """Simple grid world environment."""
    def __init__(self, size, goal, obstacles):
        self.size = size
        self.goal = goal
        self.obstacles = obstacles
        self.agent_pos = (0, 0)
        self.steps = 0
        self.done = False

    def get_percepts(self):
        """Return percepts for agent."""
        return {
            'position': self.agent_pos,
            'goal': self.goal,
            'obstacles': self.obstacles,
            'at_goal': self.agent_pos == self.goal,
            'steps': self.steps
        }

    def apply_action(self, action):
        """Apply action and return reward."""
        if self.done:
            return 0

        x, y = self.agent_pos

        # Apply movement
        if action == 'up':
            new_pos = (x, min(y + 1, self.size - 1))
        elif action == 'down':
            new_pos = (x, max(y - 1, 0))
        elif action == 'left':
            new_pos = (max(x - 1, 0), y)
        elif action == 'right':
            new_pos = (min(x + 1, self.size - 1), y)
        else:
            new_pos = self.agent_pos

        # Check if valid (not obstacle)
        if new_pos not in self.obstacles:
            self.agent_pos = new_pos

        self.steps += 1

        # Calculate reward
        if self.agent_pos == self.goal:
            self.done = True
            return 10  # Goal reached
        elif self.agent_pos in self.obstacles:
            return -5  # Hit obstacle
        else:
            return -1  # Step cost

class SimpleAgent:
    """Simple goal-directed agent."""
    def __init__(self):
        self.percepts = None

    def perceive(self, percepts):
        """Store percepts."""
        self.percepts = percepts

    def decide(self):
        """Decide action based on percepts."""
        if self.percepts is None:
            return 'stop'

        if self.percepts['at_goal']:
            return 'stop'

        # Simple strategy: move toward goal
        pos = self.percepts['position']
        goal = self.percepts['goal']
        obstacles = self.percepts['obstacles']

        x, y = pos
        gx, gy = goal

        # Try to move toward goal
        if gx > x:
            if (x + 1, y) not in obstacles:
                return 'right'
        elif gx < x:
            if (x - 1, y) not in obstacles:
                return 'left'

        if gy > y:
            if (x, y + 1) not in obstacles:
                return 'up'
        elif gy < y:
            if (x, y - 1) not in obstacles:
                return 'down'

        # If blocked, try random move
        return random.choice(['up', 'down', 'left', 'right'])

def run_simulation(env, agent, max_steps=100):
    """Run agent-environment interaction loop."""
    total_reward = 0
    history = []

    for step in range(max_steps):
        # Get percepts
        percepts = env.get_percepts()

        # Agent perceives
        agent.perceive(percepts)

        # Agent decides
        action = agent.decide()

        # Apply action to environment
        reward = env.apply_action(action)
        total_reward += reward

        # Record history
        history.append({
            'step': step,
            'position': percepts['position'],
            'action': action,
            'reward': reward
        })

        # Check if done
        if env.done:
            print(f"Goal reached in {step + 1} steps!")
            break

    return {
        'total_reward': total_reward,
        'steps': env.steps,
        'success': env.done,
        'history': history
    }

# Test simulation
print("Agent-Environment Simulation")
print("="*50)

# Create environment
env = GridEnvironment(
    size=6,
    goal=(5, 5),
    obstacles=[(2, 2), (2, 3), (3, 2)]
)

# Create agent
agent = SimpleAgent()

print(f"Environment size: {env.size}x{env.size}")
print(f"Goal: {env.goal}")
print(f"Obstacles: {env.obstacles}")
print(f"Starting position: {env.agent_pos}")
print()

# Run simulation
results = run_simulation(env, agent, max_steps=100)

print()
print("Results:")
print(f"  Success: {results['success']}")
print(f"  Total steps: {results['steps']}")
print(f"  Total reward: {results['total_reward']}")
print()

print("Path taken:")
for i, entry in enumerate(results['history'][:20]):  # Show first 20 steps
    print(f"  Step {entry['step'] + 1}: {entry['position']} -> {entry['action']} (reward: {entry['reward']})")

if len(results['history']) > 20:
    print(f"  ... ({len(results['history']) - 20} more steps)")`,
    testCases: [
      { input: 'env.get_percepts()', isHidden: false, description: 'Test environment provides percepts' },
      { input: 'env.apply_action(action)', isHidden: false, description: 'Test environment updates based on action' },
      { input: 'run_simulation(env, agent, steps)', isHidden: false, description: 'Test complete simulation runs correctly' }
    ],
    hints: [
      'Perception-action loop: percepts -> decision -> action -> update environment',
      'Environment maintains state and returns percepts to agent',
      'Agent chooses actions based on percepts, environment applies them'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex09',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Performance Measure for Agent Evaluation',
    difficulty: 2,
    description: `Implement performance measures to evaluate agent effectiveness.

Your implementation should:
- Define multiple performance metrics
- Track agent performance over time
- Compare different agent strategies
- Visualize performance data`,
    starterCode: `class PerformanceMeasure:
    def __init__(self):
        pass

    def record(self, state, action, reward):
        pass

    def evaluate(self):
        pass

    def compare_agents(self, agent_results):
        pass`,
    solution: `class PerformanceMeasure:
    """Track and evaluate agent performance."""
    def __init__(self, metrics=None):
        if metrics is None:
            metrics = ['total_reward', 'steps', 'success_rate']

        self.metrics = metrics
        self.history = []
        self.episodes = []
        self.current_episode = {
            'rewards': [],
            'actions': [],
            'steps': 0,
            'success': False
        }

    def record(self, state, action, reward):
        """Record single step."""
        self.history.append({
            'state': state,
            'action': action,
            'reward': reward
        })

        self.current_episode['rewards'].append(reward)
        self.current_episode['actions'].append(action)
        self.current_episode['steps'] += 1

    def end_episode(self, success=False):
        """Mark episode as complete."""
        self.current_episode['success'] = success
        self.current_episode['total_reward'] = sum(self.current_episode['rewards'])
        self.episodes.append(self.current_episode.copy())

        # Reset for next episode
        self.current_episode = {
            'rewards': [],
            'actions': [],
            'steps': 0,
            'success': False
        }

    def evaluate(self):
        """Calculate performance metrics."""
        if not self.episodes:
            return {}

        metrics = {}

        # Total reward
        metrics['total_reward'] = sum(ep['total_reward'] for ep in self.episodes)
        metrics['avg_reward_per_episode'] = metrics['total_reward'] / len(self.episodes)

        # Steps
        metrics['total_steps'] = sum(ep['steps'] for ep in self.episodes)
        metrics['avg_steps_per_episode'] = metrics['total_steps'] / len(self.episodes)

        # Success rate
        successes = sum(1 for ep in self.episodes if ep['success'])
        metrics['success_rate'] = successes / len(self.episodes)
        metrics['num_episodes'] = len(self.episodes)
        metrics['num_successes'] = successes

        # Efficiency (reward per step)
        metrics['efficiency'] = metrics['total_reward'] / max(metrics['total_steps'], 1)

        return metrics

    def compare_agents(self, agent_results):
        """Compare multiple agents."""
        comparison = {}

        for agent_name, results in agent_results.items():
            comparison[agent_name] = results.evaluate()

        return comparison

    def print_summary(self):
        """Print performance summary."""
        metrics = self.evaluate()

        print("Performance Summary")
        print("="*50)
        print(f"Episodes: {metrics.get('num_episodes', 0)}")
        print(f"Success rate: {metrics.get('success_rate', 0):.1%}")
        print(f"Avg reward per episode: {metrics.get('avg_reward_per_episode', 0):.2f}")
        print(f"Avg steps per episode: {metrics.get('avg_steps_per_episode', 0):.1f}")
        print(f"Efficiency (reward/step): {metrics.get('efficiency', 0):.3f}")

    def plot_learning_curve(self):
        """Plot learning curve (rewards over episodes)."""
        if not self.episodes:
            print("No episodes to plot")
            return

        episode_numbers = list(range(1, len(self.episodes) + 1))
        rewards = [ep['total_reward'] for ep in self.episodes]

        # Simple text-based plot
        print("\\nLearning Curve (Total Reward per Episode)")
        print("="*50)

        max_reward = max(rewards) if rewards else 1
        min_reward = min(rewards) if rewards else 0

        for i, (ep_num, reward) in enumerate(zip(episode_numbers[:20], rewards[:20])):
            # Normalize to 0-40 characters
            if max_reward != min_reward:
                bar_len = int(40 * (reward - min_reward) / (max_reward - min_reward))
            else:
                bar_len = 20

            bar = '#' * bar_len
            print(f"Ep {ep_num:3d}: {bar} ({reward:.1f})")

        if len(episode_numbers) > 20:
            print(f"... ({len(episode_numbers) - 20} more episodes)")

# Test performance measurement
print("Performance Measurement Example")
print("="*50)

# Simulate two agents with different strategies
pm_agent1 = PerformanceMeasure()
pm_agent2 = PerformanceMeasure()

# Agent 1: Conservative (slower but steady)
print("Agent 1: Conservative strategy")
for episode in range(10):
    for step in range(15):
        reward = -1  # Step cost
        pm_agent1.record(None, 'move', reward)

    # Reaches goal
    pm_agent1.record(None, 'reach_goal', 10)
    pm_agent1.end_episode(success=True)

print()
pm_agent1.print_summary()

# Agent 2: Aggressive (faster but riskier)
print("\\nAgent 2: Aggressive strategy")
for episode in range(10):
    # Sometimes fails (hits obstacle)
    if episode % 3 == 0:
        for step in range(5):
            pm_agent2.record(None, 'move', -1)
        pm_agent2.record(None, 'hit_obstacle', -5)
        pm_agent2.end_episode(success=False)
    else:
        # Reaches goal quickly
        for step in range(8):
            pm_agent2.record(None, 'move', -1)
        pm_agent2.record(None, 'reach_goal', 10)
        pm_agent2.end_episode(success=True)

print()
pm_agent2.print_summary()

# Compare agents
print("\\n" + "="*50)
print("Agent Comparison")
print("="*50)

comparison = pm_agent1.compare_agents({
    'Conservative': pm_agent1,
    'Aggressive': pm_agent2
})

for agent_name, metrics in comparison.items():
    print(f"\\n{agent_name}:")
    print(f"  Success rate: {metrics['success_rate']:.1%}")
    print(f"  Avg reward: {metrics['avg_reward_per_episode']:.2f}")
    print(f"  Avg steps: {metrics['avg_steps_per_episode']:.1f}")
    print(f"  Efficiency: {metrics['efficiency']:.3f}")

# Show learning curve
pm_agent1.plot_learning_curve()`,
    testCases: [
      { input: 'pm.record(state, action, reward)', isHidden: false, description: 'Test recording agent steps' },
      { input: 'pm.evaluate()', isHidden: false, description: 'Test computing performance metrics' },
      { input: 'pm.compare_agents(agent_results)', isHidden: false, description: 'Test comparing multiple agents' }
    ],
    hints: [
      'Track multiple metrics: total reward, success rate, efficiency',
      'Record episodes separately to measure learning over time',
      'Compare agents using normalized metrics like reward per step'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex10',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Rational Agent Decision Making',
    difficulty: 2,
    description: `Implement a rational agent that selects actions to maximize expected utility.

Your implementation should:
- Evaluate utility of possible outcomes
- Calculate expected utility for each action
- Select action with highest expected utility
- Handle probabilistic outcomes`,
    starterCode: `class RationalAgent:
    def __init__(self, utility_function):
        self.utility = utility_function

    def expected_utility(self, action, outcomes):
        # Calculate expected utility of action
        pass

    def choose_action(self, possible_actions):
        # Choose action maximizing expected utility
        pass`,
    solution: `class RationalAgent:
    """Agent that maximizes expected utility."""
    def __init__(self, utility_function):
        self.utility = utility_function
        self.history = []

    def expected_utility(self, action, outcomes, probabilities):
        """
        Calculate expected utility of action.

        action: action identifier
        outcomes: list of possible outcome states
        probabilities: probability of each outcome
        """
        expected = 0.0

        for outcome, prob in zip(outcomes, probabilities):
            utility_val = self.utility(outcome)
            expected += prob * utility_val

        return expected

    def choose_action(self, possible_actions, outcome_model):
        """
        Choose action maximizing expected utility.

        possible_actions: list of available actions
        outcome_model: function(action) -> (outcomes, probabilities)
        """
        best_action = None
        best_expected = float('-inf')

        for action in possible_actions:
            outcomes, probabilities = outcome_model(action)
            expected = self.expected_utility(action, outcomes, probabilities)

            if expected > best_expected:
                best_expected = expected
                best_action = action

        self.history.append({
            'action': best_action,
            'expected_utility': best_expected
        })

        return best_action, best_expected

    def performance_summary(self):
        """Summary of decision history."""
        if not self.history:
            return "No decisions made"

        total_expected = sum(h['expected_utility'] for h in self.history)
        avg_expected = total_expected / len(self.history)

        return {
            'decisions': len(self.history),
            'avg_expected_utility': avg_expected,
            'total_expected_utility': total_expected
        }

# Example: Investment decision agent

def investment_utility(outcome):
    """Utility function for money (with risk aversion)."""
    # Square root for diminishing marginal utility
    money = outcome['money']
    return money ** 0.5

# Create agent
agent = RationalAgent(investment_utility)

print("Rational Agent - Investment Decisions")
print("="*50)

# Define outcome models for different actions
def outcome_model(action):
    """Model outcomes and probabilities for each action."""
    if action == 'safe_investment':
        # Safe: guaranteed 5% return
        outcomes = [
            {'money': 105}
        ]
        probabilities = [1.0]

    elif action == 'moderate_risk':
        # Moderate: 60% chance of 15% return, 40% chance of 0% return
        outcomes = [
            {'money': 115},
            {'money': 100}
        ]
        probabilities = [0.6, 0.4]

    elif action == 'high_risk':
        # High risk: 40% chance of 50% return, 60% chance of -20% loss
        outcomes = [
            {'money': 150},
            {'money': 80}
        ]
        probabilities = [0.4, 0.6]

    else:
        outcomes = [{'money': 100}]
        probabilities = [1.0]

    return outcomes, probabilities

# Available actions
actions = ['safe_investment', 'moderate_risk', 'high_risk']

print("Initial capital: $100")
print("\\nEvaluating investment options:")
print()

# Evaluate each action
for action in actions:
    outcomes, probs = outcome_model(action)
    expected = agent.expected_utility(action, outcomes, probs)

    print(f"{action}:")
    print(f"  Possible outcomes:")
    for outcome, prob in zip(outcomes, probs):
        print(f"    ${outcome['money']} (prob: {prob:.1%})")
    print(f"  Expected utility: {expected:.2f}")
    print()

# Agent chooses best action
best_action, best_utility = agent.choose_action(actions, outcome_model)

print("="*50)
print(f"Agent chooses: {best_action}")
print(f"Expected utility: {best_utility:.2f}")
print()

# Multiple decisions
print("="*50)
print("Multiple Decision Scenario")
print("="*50)

decisions = []
for i in range(5):
    action, utility = agent.choose_action(actions, outcome_model)
    decisions.append(action)
    print(f"Decision {i+1}: {action} (EU: {utility:.2f})")

summary = agent.performance_summary()
print(f"\\nSummary:")
print(f"  Total decisions: {summary['decisions']}")
print(f"  Avg expected utility: {summary['avg_expected_utility']:.2f}")

# Test with different utility function (risk-seeking)
print("\\n" + "="*50)
print("Risk-Seeking Agent (logarithmic utility)")
print("="*50)

def risk_seeking_utility(outcome):
    """Risk-seeking utility function."""
    import math
    money = outcome['money']
    # Exponential for risk-seeking behavior
    return money ** 1.5

agent2 = RationalAgent(risk_seeking_utility)

for action in actions:
    outcomes, probs = outcome_model(action)
    expected = agent2.expected_utility(action, outcomes, probs)
    print(f"{action}: EU = {expected:.2f}")

best_action2, best_utility2 = agent2.choose_action(actions, outcome_model)
print(f"\\nRisk-seeking agent chooses: {best_action2}")`,
    testCases: [
      { input: 'agent.expected_utility(action, outcomes, probabilities)', isHidden: false, description: 'Test expected utility calculation' },
      { input: 'agent.choose_action(possible_actions, outcome_model)', isHidden: false, description: 'Test agent selects action with highest expected utility' },
      { input: 'different utility functions', isHidden: false, description: 'Test different utility functions lead to different choices' }
    ],
    hints: [
      'Expected utility = sum of (probability × utility) over all outcomes',
      'Compare expected utility of all actions, choose highest',
      'Utility function encodes agent preferences (risk-averse vs risk-seeking)'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex11',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Agent State Representation',
    difficulty: 2,
    description: `Implement different state representations for agents.

Your implementation should:
- Atomic state representation
- Factored state representation (feature-based)
- Structured state representation (objects and relations)
- Convert between representations`,
    starterCode: `class AtomicState:
    pass

class FactoredState:
    pass

class StructuredState:
    pass

def convert_atomic_to_factored(atomic_state):
    pass

def convert_factored_to_structured(factored_state):
    pass`,
    solution: `class AtomicState:
    """Atomic state: single indivisible identifier."""
    def __init__(self, state_id):
        self.state_id = state_id

    def __repr__(self):
        return f"AtomicState({self.state_id})"

    def __eq__(self, other):
        return isinstance(other, AtomicState) and self.state_id == other.state_id

    def __hash__(self):
        return hash(self.state_id)

class FactoredState:
    """Factored state: set of variable-value pairs."""
    def __init__(self, variables):
        self.variables = variables  # dict: variable -> value

    def __repr__(self):
        vars_str = ", ".join(f"{k}={v}" for k, v in self.variables.items())
        return f"FactoredState({vars_str})"

    def __eq__(self, other):
        return isinstance(other, FactoredState) and self.variables == other.variables

    def __hash__(self):
        return hash(tuple(sorted(self.variables.items())))

    def get(self, variable, default=None):
        return self.variables.get(variable, default)

    def set(self, variable, value):
        self.variables[variable] = value

class StructuredState:
    """Structured state: objects with properties and relations."""
    def __init__(self):
        self.objects = {}  # object_id -> properties dict
        self.relations = []  # list of (relation_name, obj1, obj2)

    def add_object(self, obj_id, properties):
        self.objects[obj_id] = properties

    def add_relation(self, relation_name, obj1, obj2):
        self.relations.append((relation_name, obj1, obj2))

    def get_object_property(self, obj_id, property_name):
        return self.objects.get(obj_id, {}).get(property_name)

    def query_relations(self, relation_name):
        return [(o1, o2) for rel, o1, o2 in self.relations if rel == relation_name]

    def __repr__(self):
        objs_str = f"{len(self.objects)} objects"
        rels_str = f"{len(self.relations)} relations"
        return f"StructuredState({objs_str}, {rels_str})"

def convert_atomic_to_factored(atomic_state, state_mapping):
    """
    Convert atomic state to factored representation.
    state_mapping: dict mapping state_id -> variables dict
    """
    variables = state_mapping.get(atomic_state.state_id, {})
    return FactoredState(variables.copy())

def convert_factored_to_atomic(factored_state, reverse_mapping):
    """
    Convert factored state to atomic representation.
    reverse_mapping: dict mapping variables tuple -> state_id
    """
    key = tuple(sorted(factored_state.variables.items()))
    state_id = reverse_mapping.get(key, f"state_{hash(key)}")
    return AtomicState(state_id)

def convert_factored_to_structured(factored_state):
    """Convert factored state to structured representation."""
    structured = StructuredState()

    # Extract objects from variables
    # Assume variables like "robot_x", "robot_y", "box_x", "box_y"

    objects = {}
    for var, val in factored_state.variables.items():
        parts = var.split('_')
        if len(parts) >= 2:
            obj_name = parts[0]
            property_name = '_'.join(parts[1:])

            if obj_name not in objects:
                objects[obj_name] = {}
            objects[obj_name][property_name] = val
        else:
            # Global property
            if 'global' not in objects:
                objects['global'] = {}
            objects['global'][var] = val

    # Add objects to structured state
    for obj_name, properties in objects.items():
        structured.add_object(obj_name, properties)

    # Infer relations based on properties
    # Example: if robot and box have same position, they're "at" same location
    obj_names = list(objects.keys())
    for i, obj1 in enumerate(obj_names):
        for obj2 in obj_names[i+1:]:
            if obj1 == 'global' or obj2 == 'global':
                continue

            # Check if same location
            if objects[obj1].get('x') == objects[obj2].get('x') and \
               objects[obj1].get('y') == objects[obj2].get('y'):
                structured.add_relation('same_location', obj1, obj2)

    return structured

# Test different representations
print("State Representation Examples")
print("="*50)

# Atomic state
print("\\n1. Atomic State:")
atomic = AtomicState("state_42")
print(f"   {atomic}")

# Factored state
print("\\n2. Factored State:")
factored = FactoredState({
    'robot_x': 3,
    'robot_y': 2,
    'box_x': 3,
    'box_y': 2,
    'goal_x': 5,
    'goal_y': 5,
    'holding': True
})
print(f"   {factored}")
print(f"   Robot position: ({factored.get('robot_x')}, {factored.get('robot_y')})")
print(f"   Holding: {factored.get('holding')}")

# Structured state
print("\\n3. Structured State:")
structured = StructuredState()
structured.add_object('robot', {'x': 3, 'y': 2, 'holding': True})
structured.add_object('box', {'x': 3, 'y': 2, 'weight': 10})
structured.add_object('goal', {'x': 5, 'y': 5})
structured.add_relation('at', 'robot', 'box')
structured.add_relation('holding', 'robot', 'box')

print(f"   {structured}")
print(f"   Objects:")
for obj_id, props in structured.objects.items():
    print(f"     {obj_id}: {props}")
print(f"   Relations:")
for rel in structured.relations:
    print(f"     {rel[0]}({rel[1]}, {rel[2]})")

# Conversions
print("\\n" + "="*50)
print("State Conversions")
print("="*50)

# Atomic to Factored
print("\\nAtomic -> Factored:")
state_mapping = {
    "state_42": {'x': 5, 'y': 3, 'energy': 100}
}
atomic = AtomicState("state_42")
factored_from_atomic = convert_atomic_to_factored(atomic, state_mapping)
print(f"   {atomic} -> {factored_from_atomic}")

# Factored to Structured
print("\\nFactored -> Structured:")
factored = FactoredState({
    'robot_x': 2,
    'robot_y': 3,
    'box_x': 2,
    'box_y': 3,
})
structured_from_factored = convert_factored_to_structured(factored)
print(f"   {factored}")
print(f"   -> {structured_from_factored}")
print(f"   Objects: {list(structured_from_factored.objects.keys())}")
print(f"   Relations: {structured_from_factored.relations}")

# Compare representations
print("\\n" + "="*50)
print("Representation Comparison")
print("="*50)
print("\\nAtomic State:")
print("  + Simplest representation")
print("  + Easy to implement")
print("  - No structure for reasoning")
print("  - Exponential number of states")

print("\\nFactored State:")
print("  + Compact representation")
print("  + Easy to query properties")
print("  + Good for feature-based learning")
print("  - No explicit object relations")

print("\\nStructured State:")
print("  + Explicit objects and relations")
print("  + Supports complex reasoning")
print("  + Natural for many domains")
print("  - More complex to implement")`,
    testCases: [
      { input: 'factored_state.get(variable)', isHidden: false, description: 'Test factored state variable access' },
      { input: 'structured_state.query_relations(name)', isHidden: false, description: 'Test structured state relation queries' },
      { input: 'convert_factored_to_structured(factored)', isHidden: false, description: 'Test conversion between representations' }
    ],
    hints: [
      'Atomic: single identifier, simplest but least informative',
      'Factored: variable-value pairs, good for feature-based reasoning',
      'Structured: objects and relations, most expressive'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex12',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'PEAS Analysis for Agent Design',
    difficulty: 1,
    description: `Perform PEAS analysis (Performance, Environment, Actuators, Sensors) for different agent types.

Your implementation should:
- Define PEAS for various agent types
- Validate PEAS specifications
- Compare different agent designs
- Generate agent specifications from PEAS`,
    starterCode: `class PEASSpecification:
    def __init__(self, performance, environment, actuators, sensors):
        pass

    def validate(self):
        # Check if specification is complete
        pass

    def compare(self, other_spec):
        # Compare two PEAS specifications
        pass`,
    solution: `class PEASSpecification:
    """PEAS specification for agent design."""
    def __init__(self, agent_type, performance, environment, actuators, sensors):
        self.agent_type = agent_type
        self.performance = performance  # list of performance measures
        self.environment = environment  # dict describing environment
        self.actuators = actuators  # list of actuators
        self.sensors = sensors  # list of sensors

    def validate(self):
        """Check if specification is complete and consistent."""
        errors = []

        if not self.performance:
            errors.append("No performance measures defined")

        if not self.environment:
            errors.append("Environment not specified")

        if not self.actuators:
            errors.append("No actuators defined")

        if not self.sensors:
            errors.append("No sensors defined")

        # Check environment properties
        required_props = ['observable', 'deterministic', 'episodic', 'static', 'discrete', 'agents']
        for prop in required_props:
            if prop not in self.environment:
                errors.append(f"Environment property '{prop}' not specified")

        return len(errors) == 0, errors

    def compare(self, other_spec):
        """Compare two PEAS specifications."""
        comparison = {
            'agent_types': (self.agent_type, other_spec.agent_type),
            'differences': []
        }

        # Compare performance measures
        perf_diff = set(self.performance) ^ set(other_spec.performance)
        if perf_diff:
            comparison['differences'].append(f"Performance measures differ: {perf_diff}")

        # Compare actuators
        act_diff = set(self.actuators) ^ set(other_spec.actuators)
        if act_diff:
            comparison['differences'].append(f"Actuators differ: {act_diff}")

        # Compare sensors
        sens_diff = set(self.sensors) ^ set(other_spec.sensors)
        if sens_diff:
            comparison['differences'].append(f"Sensors differ: {sens_diff}")

        # Compare environment
        for key in self.environment:
            if key in other_spec.environment:
                if self.environment[key] != other_spec.environment[key]:
                    comparison['differences'].append(
                        f"Environment {key}: {self.environment[key]} vs {other_spec.environment[key]}"
                    )

        return comparison

    def __repr__(self):
        return f"PEAS({self.agent_type})"

    def print_specification(self):
        """Print detailed PEAS specification."""
        print(f"\\nPEAS Specification: {self.agent_type}")
        print("="*60)

        print("\\nPerformance Measures:")
        for pm in self.performance:
            print(f"  - {pm}")

        print("\\nEnvironment:")
        for key, val in self.environment.items():
            print(f"  - {key}: {val}")

        print("\\nActuators:")
        for act in self.actuators:
            print(f"  - {act}")

        print("\\nSensors:")
        for sens in self.sensors:
            print(f"  - {sens}")

# Example PEAS specifications

# 1. Autonomous Vacuum Cleaner
vacuum_peas = PEASSpecification(
    agent_type="Autonomous Vacuum Cleaner",
    performance=[
        "Amount of dirt cleaned",
        "Energy efficiency",
        "Coverage area",
        "Time to complete cleaning"
    ],
    environment={
        'observable': 'partially',  # Can sense immediate surroundings
        'deterministic': 'stochastic',  # Dirt appears unpredictably
        'episodic': False,  # Continuous cleaning
        'static': False,  # Dirt can appear while cleaning
        'discrete': True,  # Grid-based world
        'agents': 'single',  # Usually one vacuum
        'properties': ['Floor type', 'Obstacles', 'Dirt distribution']
    },
    actuators=[
        "Wheels (forward, backward, turn)",
        "Vacuum motor",
        "Brush",
        "Charging contact"
    ],
    sensors=[
        "Dirt detector",
        "Bump sensor",
        "Cliff detector",
        "Battery level sensor",
        "Camera (optional)"
    ]
)

# 2. Self-Driving Car
car_peas = PEASSpecification(
    agent_type="Self-Driving Car",
    performance=[
        "Safety (no accidents)",
        "Destination reached",
        "Travel time",
        "Fuel efficiency",
        "Passenger comfort",
        "Traffic law compliance"
    ],
    environment={
        'observable': 'partially',  # Limited by sensors
        'deterministic': 'stochastic',  # Other drivers unpredictable
        'episodic': False,  # Continuous driving
        'static': False,  # Dynamic traffic
        'discrete': False,  # Continuous space and time
        'agents': 'multi',  # Many other vehicles
        'properties': ['Roads', 'Traffic', 'Weather', 'Pedestrians']
    },
    actuators=[
        "Steering",
        "Accelerator",
        "Brake",
        "Turn signals",
        "Horn"
    ],
    sensors=[
        "Cameras",
        "Lidar",
        "Radar",
        "GPS",
        "IMU (Inertial Measurement Unit)",
        "Wheel encoders",
        "Ultrasonic sensors"
    ]
)

# 3. Chess-Playing Agent
chess_peas = PEASSpecification(
    agent_type="Chess Player",
    performance=[
        "Win/loss/draw outcome",
        "Move quality",
        "Time per move",
        "Rating improvement"
    ],
    environment={
        'observable': 'fully',  # Complete board state visible
        'deterministic': 'deterministic',  # Rules are deterministic
        'episodic': True,  # Each game is independent
        'static': False,  # Opponent makes moves
        'discrete': True,  # Discrete board and moves
        'agents': 'two',  # Two players
        'properties': ['Chess board', '8x8 grid', 'Standard rules']
    },
    actuators=[
        "Move pieces"
    ],
    sensors=[
        "Board state sensor"
    ]
)

# 4. Medical Diagnosis Agent
medical_peas = PEASSpecification(
    agent_type="Medical Diagnosis System",
    performance=[
        "Diagnostic accuracy",
        "False positive/negative rates",
        "Time to diagnosis",
        "Patient outcome improvement"
    ],
    environment={
        'observable': 'partially',  # Limited by tests available
        'deterministic': 'stochastic',  # Disease progression uncertain
        'episodic': True,  # Each patient case separate
        'static': False,  # Patient condition changes
        'discrete': False,  # Continuous measurements
        'agents': 'multi',  # Doctors, other systems
        'properties': ['Patient symptoms', 'Test results', 'Medical history']
    },
    actuators=[
        "Request tests",
        "Propose diagnosis",
        "Suggest treatment",
        "Alert doctor"
    ],
    sensors=[
        "Patient symptoms input",
        "Lab test results",
        "Imaging data",
        "Vital signs",
        "Medical history database"
    ]
)

# Display specifications
print("PEAS Specifications for Different Agent Types")
print("="*60)

for peas in [vacuum_peas, car_peas, chess_peas, medical_peas]:
    peas.print_specification()

    is_valid, errors = peas.validate()
    if is_valid:
        print("\\n✓ Specification is valid and complete")
    else:
        print("\\n✗ Specification issues:")
        for error in errors:
            print(f"  - {error}")

# Compare specifications
print("\\n" + "="*60)
print("Comparing Specifications")
print("="*60)

comparison = vacuum_peas.compare(car_peas)
print(f"\\nComparing: {comparison['agent_types'][0]} vs {comparison['agent_types'][1]}")
if comparison['differences']:
    print("\\nKey differences:")
    for diff in comparison['differences']:
        print(f"  - {diff}")
else:
    print("\\nNo significant differences found")

# Environment type analysis
print("\\n" + "="*60)
print("Environment Type Analysis")
print("="*60)

agents = [vacuum_peas, car_peas, chess_peas, medical_peas]

print("\\n{:<30} {:<15} {:<15} {:<10} {:<10}".format(
    "Agent", "Observable", "Deterministic", "Episodic", "Agents"
))
print("-" * 80)

for peas in agents:
    env = peas.environment
    print("{:<30} {:<15} {:<15} {:<10} {:<10}".format(
        peas.agent_type[:28],
        env['observable'],
        env['deterministic'],
        str(env['episodic']),
        env['agents']
    ))`,
    testCases: [
      { input: 'peas.validate()', isHidden: false, description: 'Test PEAS specification validation' },
      { input: 'peas.compare(other_peas)', isHidden: false, description: 'Test comparing two PEAS specifications' },
      { input: 'peas.print_specification()', isHidden: false, description: 'Test printing complete PEAS details' }
    ],
    hints: [
      'PEAS: Performance measure, Environment, Actuators, Sensors',
      'Performance: how agent success is measured',
      'Environment: properties like observable, deterministic, episodic',
      'Actuators: how agent affects environment',
      'Sensors: how agent perceives environment'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex13',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Agent Communication Language (ACL)',
    difficulty: 3,
    description: `Implement basic agent communication using ACL primitives.

Your implementation should:
- Define message types (inform, request, query)
- Implement message passing between agents
- Handle speech acts and performatives
- Coordinate multi-agent tasks through communication`,
    starterCode: `class Message:
    def __init__(self, sender, receiver, performative, content):
        pass

class CommunicatingAgent:
    def __init__(self, agent_id):
        self.id = agent_id
        self.inbox = []

    def send(self, message):
        pass

    def receive(self):
        pass

    def handle_message(self, message):
        pass`,
    solution: `from collections import deque
import time

class Message:
    """ACL message with performative and content."""
    def __init__(self, sender, receiver, performative, content, reply_to=None):
        self.sender = sender
        self.receiver = receiver
        self.performative = performative  # inform, request, query, agree, refuse, etc.
        self.content = content
        self.reply_to = reply_to  # message being replied to
        self.timestamp = time.time()

    def __repr__(self):
        return f"Message({self.sender}->{self.receiver}: {self.performative}({self.content}))"

class MessageBroker:
    """Central message broker for agent communication."""
    def __init__(self):
        self.agents = {}  # agent_id -> agent
        self.message_log = []

    def register_agent(self, agent):
        self.agents[agent.id] = agent

    def send_message(self, message):
        """Route message to receiver."""
        self.message_log.append(message)

        if message.receiver in self.agents:
            self.agents[message.receiver].receive(message)
            return True
        elif message.receiver == 'broadcast':
            # Broadcast to all except sender
            for agent_id, agent in self.agents.items():
                if agent_id != message.sender:
                    agent.receive(message)
            return True
        else:
            print(f"Warning: Agent {message.receiver} not found")
            return False

class CommunicatingAgent:
    """Agent capable of ACL communication."""
    def __init__(self, agent_id, broker):
        self.id = agent_id
        self.broker = broker
        self.inbox = deque()
        self.knowledge_base = {}  # stores received information
        self.pending_requests = {}  # request_id -> original message

    def send(self, receiver, performative, content, reply_to=None):
        """Send message to another agent."""
        message = Message(self.id, receiver, performative, content, reply_to)
        self.broker.send_message(message)
        return message

    def receive(self, message):
        """Receive message (called by broker)."""
        self.inbox.append(message)

    def process_messages(self):
        """Process all messages in inbox."""
        responses = []

        while self.inbox:
            message = self.inbox.popleft()
            response = self.handle_message(message)
            if response:
                responses.append(response)

        return responses

    def handle_message(self, message):
        """Handle incoming message based on performative."""
        print(f"[{self.id}] Received: {message.performative} from {message.sender}: {message.content}")

        if message.performative == 'inform':
            return self.handle_inform(message)
        elif message.performative == 'request':
            return self.handle_request(message)
        elif message.performative == 'query':
            return self.handle_query(message)
        elif message.performative == 'agree':
            return self.handle_agree(message)
        elif message.performative == 'refuse':
            return self.handle_refuse(message)
        elif message.performative == 'confirm':
            return self.handle_confirm(message)
        else:
            print(f"[{self.id}] Unknown performative: {message.performative}")
            return None

    def handle_inform(self, message):
        """Handle inform message (receiving information)."""
        # Store information in knowledge base
        if isinstance(message.content, dict):
            self.knowledge_base.update(message.content)
        else:
            self.knowledge_base[f"info_from_{message.sender}"] = message.content

        # Acknowledge receipt
        return self.send(message.sender, 'confirm', f"Received: {message.content}", message)

    def handle_request(self, message):
        """Handle request message."""
        # Check if we can fulfill request
        request = message.content

        if self.can_fulfill(request):
            # Agree to request
            response = self.send(message.sender, 'agree', f"Will fulfill: {request}", message)
            # Actually fulfill it
            result = self.fulfill_request(request)
            self.send(message.sender, 'inform', result, message)
            return response
        else:
            # Refuse request
            return self.send(message.sender, 'refuse', f"Cannot fulfill: {request}", message)

    def handle_query(self, message):
        """Handle query message."""
        query = message.content

        # Look up in knowledge base
        result = self.knowledge_base.get(query, "Unknown")

        return self.send(message.sender, 'inform', {query: result}, message)

    def handle_agree(self, message):
        """Handle agreement to our request."""
        print(f"[{self.id}] {message.sender} agreed to: {message.content}")
        return None

    def handle_refuse(self, message):
        """Handle refusal of our request."""
        print(f"[{self.id}] {message.sender} refused: {message.content}")
        return None

    def handle_confirm(self, message):
        """Handle confirmation message."""
        print(f"[{self.id}] Confirmed by {message.sender}: {message.content}")
        return None

    def can_fulfill(self, request):
        """Check if agent can fulfill request."""
        # Simple implementation: check if we have relevant knowledge
        if isinstance(request, dict):
            task = request.get('task', '')
            return task in ['compute', 'search', 'inform']
        return True

    def fulfill_request(self, request):
        """Fulfill a request and return result."""
        if isinstance(request, dict):
            task = request.get('task')
            if task == 'compute':
                return {'result': 'computation_done'}
            elif task == 'search':
                return {'result': 'search_complete'}
        return {'result': 'task_completed'}

# Test agent communication
print("Agent Communication Language (ACL) Example")
print("="*60)

# Create broker and agents
broker = MessageBroker()

agent1 = CommunicatingAgent('Agent1', broker)
agent2 = CommunicatingAgent('Agent2', broker)
agent3 = CommunicatingAgent('Agent3', broker)

broker.register_agent(agent1)
broker.register_agent(agent2)
broker.register_agent(agent3)

print("\\nScenario 1: Information sharing")
print("-"*60)

# Agent1 informs Agent2 of some information
agent1.send('Agent2', 'inform', {'temperature': 25, 'humidity': 60})
agent2.process_messages()

# Agent2 queries Agent3
agent2.send('Agent3', 'inform', {'location': 'lab', 'status': 'active'})
agent3.process_messages()

print("\\nScenario 2: Request handling")
print("-"*60)

# Agent1 requests Agent2 to perform a task
agent1.send('Agent2', 'request', {'task': 'compute', 'data': [1, 2, 3]})
agent2.process_messages()
agent1.process_messages()  # Process agree/refuse and result

print("\\nScenario 3: Query")
print("-"*60)

# Agent1 queries Agent3
agent1.send('Agent3', 'query', 'location')
agent3.process_messages()
agent1.process_messages()  # Process response

print("\\nScenario 4: Broadcast")
print("-"*60)

# Agent1 broadcasts to all
agent1.send('broadcast', 'inform', {'announcement': 'System update at 10pm'})
agent2.process_messages()
agent3.process_messages()

print("\\nKnowledge Bases:")
print("-"*60)
print(f"Agent1: {agent1.knowledge_base}")
print(f"Agent2: {agent2.knowledge_base}")
print(f"Agent3: {agent3.knowledge_base}")

print(f"\\nTotal messages sent: {len(broker.message_log)}")`,
    testCases: [
      { input: 'agent.send(receiver, performative, content)', isHidden: false, description: 'Test sending ACL messages' },
      { input: 'agent.handle_message(message)', isHidden: false, description: 'Test handling different performatives' },
      { input: 'broker.send_message(message)', isHidden: false, description: 'Test message routing through broker' }
    ],
    hints: [
      'ACL performatives: inform (share info), request (ask to do something), query (ask question)',
      'Use message broker pattern for routing messages between agents',
      'Agents should respond appropriately based on performative type'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex14',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Belief-Desire-Intention (BDI) Agent',
    difficulty: 4,
    description: `Implement a BDI agent architecture with beliefs, desires, and intentions.

Your implementation should:
- Maintain belief base (world model)
- Define desires (goals)
- Form intentions (committed plans)
- Update beliefs from percepts
- Revise intentions based on beliefs`,
    starterCode: `class BDIAgent:
    def __init__(self):
        self.beliefs = {}
        self.desires = []
        self.intentions = []

    def update_beliefs(self, percepts):
        pass

    def generate_options(self):
        pass

    def filter_intentions(self):
        pass

    def execute_intention(self):
        pass`,
    solution: `from collections import deque

class Belief:
    """Represents agent's belief about the world."""
    def __init__(self, predicate, value, confidence=1.0):
        self.predicate = predicate
        self.value = value
        self.confidence = confidence  # 0.0 to 1.0
        self.timestamp = 0

    def __repr__(self):
        return f"Belief({self.predicate}={self.value}, conf={self.confidence:.2f})"

class Desire:
    """Represents agent's goal/desire."""
    def __init__(self, goal, priority=1.0):
        self.goal = goal
        self.priority = priority

    def __repr__(self):
        return f"Desire({self.goal}, priority={self.priority:.1f})"

class Intention:
    """Represents agent's intention (committed plan)."""
    def __init__(self, goal, plan):
        self.goal = goal
        self.plan = deque(plan)  # sequence of actions
        self.completed = False

    def next_action(self):
        """Get next action in plan."""
        if self.plan:
            return self.plan[0]
        return None

    def execute_step(self):
        """Execute next step of plan."""
        if self.plan:
            return self.plan.popleft()
        self.completed = True
        return None

    def is_complete(self):
        """Check if intention is complete."""
        return len(self.plan) == 0

    def __repr__(self):
        return f"Intention({self.goal}, {len(self.plan)} steps remaining)"

class BDIAgent:
    """Belief-Desire-Intention agent architecture."""
    def __init__(self, name="BDI-Agent"):
        self.name = name
        self.beliefs = {}  # predicate -> Belief
        self.desires = []  # list of Desire
        self.intentions = []  # list of Intention
        self.time = 0

    def update_beliefs(self, percepts):
        """Update beliefs based on percepts (sense-think-act cycle)."""
        print(f"[{self.name}] Updating beliefs from percepts...")

        for predicate, value in percepts.items():
            if predicate in self.beliefs:
                # Update existing belief
                old_value = self.beliefs[predicate].value
                self.beliefs[predicate].value = value
                self.beliefs[predicate].timestamp = self.time
                print(f"  Updated: {predicate} = {value} (was {old_value})")
            else:
                # New belief
                self.beliefs[predicate] = Belief(predicate, value)
                self.beliefs[predicate].timestamp = self.time
                print(f"  New: {predicate} = {value}")

    def add_desire(self, goal, priority=1.0):
        """Add new desire/goal."""
        desire = Desire(goal, priority)
        self.desires.append(desire)
        print(f"[{self.name}] New desire: {desire}")

    def generate_options(self):
        """Generate possible options (plans) for desires."""
        options = []

        for desire in self.desires:
            # Check if desire is achievable given current beliefs
            if self.is_achievable(desire):
                plan = self.plan_for_desire(desire)
                if plan:
                    options.append((desire, plan))

        return options

    def is_achievable(self, desire):
        """Check if desire is achievable given current beliefs."""
        goal = desire.goal

        # Simple check: can we reach the goal?
        if 'blocked' in self.beliefs and self.beliefs['blocked'].value:
            return False  # Can't achieve anything if blocked

        return True

    def plan_for_desire(self, desire):
        """Generate plan to achieve desire."""
        goal = desire.goal

        # Simple planning based on goal type
        if goal == 'reach_location':
            target = self.beliefs.get('target_location')
            if target:
                return ['move_toward_target', 'move_toward_target', 'arrive']

        elif goal == 'collect_resource':
            if self.beliefs.get('resource_location'):
                return ['move_to_resource', 'pickup_resource', 'return']

        elif goal == 'avoid_danger':
            if self.beliefs.get('danger_present', Belief('danger_present', False)).value:
                return ['move_away', 'find_safe_location', 'wait']

        return []

    def filter_intentions(self, options):
        """Filter options to select intentions (deliberation)."""
        print(f"[{self.name}] Filtering {len(options)} options...")

        # Remove completed intentions
        self.intentions = [i for i in self.intentions if not i.is_complete()]

        # If no current intentions, select from options
        if not self.intentions and options:
            # Select highest priority desire
            options.sort(key=lambda x: x[0].priority, reverse=True)
            desire, plan = options[0]

            intention = Intention(desire.goal, plan)
            self.intentions.append(intention)
            print(f"  Selected intention: {intention}")

        # Revise intentions based on changed beliefs
        self.revise_intentions()

    def revise_intentions(self):
        """Revise intentions based on new beliefs."""
        # Check if intentions are still valid
        to_remove = []

        for intention in self.intentions:
            # Check if goal is already achieved
            if self.is_goal_achieved(intention.goal):
                print(f"  Goal achieved: {intention.goal}")
                to_remove.append(intention)

            # Check if intention is impossible now
            elif not self.is_intention_possible(intention):
                print(f"  Intention no longer possible: {intention.goal}")
                to_remove.append(intention)

        for intention in to_remove:
            self.intentions.remove(intention)

    def is_goal_achieved(self, goal):
        """Check if goal is achieved."""
        if goal == 'reach_location':
            return self.beliefs.get('at_target', Belief('at_target', False)).value
        elif goal == 'collect_resource':
            return self.beliefs.get('has_resource', Belief('has_resource', False)).value
        return False

    def is_intention_possible(self, intention):
        """Check if intention is still possible given beliefs."""
        if 'blocked' in self.beliefs and self.beliefs['blocked'].value:
            return False
        return True

    def execute_intention(self):
        """Execute current intention."""
        if not self.intentions:
            print(f"[{self.name}] No intentions to execute")
            return None

        intention = self.intentions[0]
        action = intention.execute_step()

        if action:
            print(f"[{self.name}] Executing: {action}")
            return action
        else:
            print(f"[{self.name}] Intention complete: {intention.goal}")
            self.intentions.remove(intention)
            return None

    def run_cycle(self, percepts):
        """Run one BDI cycle."""
        print(f"\\n{'='*60}")
        print(f"[{self.name}] BDI Cycle {self.time}")
        print(f"{'='*60}")

        # 1. Update beliefs from percepts
        self.update_beliefs(percepts)

        # 2. Generate options from desires
        options = self.generate_options()

        # 3. Filter/select intentions
        self.filter_intentions(options)

        # 4. Execute intention
        action = self.execute_intention()

        self.time += 1

        return action

    def print_state(self):
        """Print current BDI state."""
        print(f"\\n[{self.name}] Current State:")
        print(f"  Beliefs:")
        for belief in self.beliefs.values():
            print(f"    {belief}")
        print(f"  Desires:")
        for desire in self.desires:
            print(f"    {desire}")
        print(f"  Intentions:")
        for intention in self.intentions:
            print(f"    {intention}")

# Test BDI agent
print("Belief-Desire-Intention (BDI) Agent")
print("="*60)

# Create agent
agent = BDIAgent("Explorer")

# Add desires
agent.add_desire('reach_location', priority=2.0)
agent.add_desire('collect_resource', priority=1.5)
agent.add_desire('avoid_danger', priority=3.0)

# Simulation
scenarios = [
    {
        'step': 1,
        'percepts': {
            'target_location': (10, 10),
            'current_location': (0, 0),
            'blocked': False,
            'at_target': False
        }
    },
    {
        'step': 2,
        'percepts': {
            'target_location': (10, 10),
            'current_location': (5, 5),
            'blocked': False,
            'at_target': False,
            'resource_location': (5, 6)
        }
    },
    {
        'step': 3,
        'percepts': {
            'target_location': (10, 10),
            'current_location': (8, 8),
            'blocked': False,
            'at_target': False,
            'danger_present': True
        }
    },
    {
        'step': 4,
        'percepts': {
            'target_location': (10, 10),
            'current_location': (10, 10),
            'blocked': False,
            'at_target': True,
            'danger_present': False
        }
    }
]

for scenario in scenarios:
    action = agent.run_cycle(scenario['percepts'])
    agent.print_state()

print("\\n" + "="*60)
print("BDI Architecture Summary")
print("="*60)
print("\\nBeliefs: Agent's model of the world")
print("  - Updated from percepts")
print("  - Can be uncertain (confidence)")
print("\\nDesires: Agent's goals")
print("  - Have priorities")
print("  - May conflict")
print("\\nIntentions: Committed plans")
print("  - Selected from options")
print("  - Executed step-by-step")
print("  - Revised when beliefs change")`,
    testCases: [
      { input: 'agent.update_beliefs(percepts)', isHidden: false, description: 'Test belief update from percepts' },
      { input: 'agent.generate_options()', isHidden: false, description: 'Test generating options from desires' },
      { input: 'agent.filter_intentions(options)', isHidden: false, description: 'Test selecting intentions from options' },
      { input: 'agent.execute_intention()', isHidden: false, description: 'Test executing intention steps' }
    ],
    hints: [
      'Beliefs: agent\'s knowledge about world state',
      'Desires: goals agent wants to achieve',
      'Intentions: plans agent commits to executing',
      'BDI cycle: update beliefs -> generate options -> filter -> execute'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex15',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Environment Types and Agent Design',
    difficulty: 2,
    description: `Implement agents optimized for different environment types.

Your implementation should:
- Handle fully vs partially observable environments
- Adapt to deterministic vs stochastic environments
- Work in episodic vs sequential environments
- Function in single-agent vs multi-agent environments`,
    starterCode: `class EnvironmentAdapter:
    def __init__(self, env_type):
        self.env_type = env_type

    def design_agent(self):
        # Design agent appropriate for environment type
        pass

    def select_architecture(self):
        # Select agent architecture based on environment
        pass`,
    solution: `class Environment:
    """Base environment class."""
    def __init__(self, properties):
        self.properties = properties
        # Properties: observable, deterministic, episodic, static, discrete, agents

    def __repr__(self):
        props_str = ", ".join(f"{k}={v}" for k, v in self.properties.items())
        return f"Environment({props_str})"

class Agent:
    """Base agent class."""
    def __init__(self, name, architecture):
        self.name = name
        self.architecture = architecture

    def __repr__(self):
        return f"Agent({self.name}, {self.architecture})"

class EnvironmentAdapter:
    """Adapt agent design to environment properties."""
    def __init__(self):
        pass

    def analyze_environment(self, env):
        """Analyze environment properties."""
        props = env.properties

        analysis = {
            'observability': 'full' if props.get('observable') == 'fully' else 'partial',
            'determinism': 'deterministic' if props.get('deterministic') == 'deterministic' else 'stochastic',
            'episodic': props.get('episodic', False),
            'static': props.get('static', False),
            'discrete': props.get('discrete', True),
            'agents': props.get('agents', 'single')
        }

        return analysis

    def design_agent(self, env):
        """Design agent appropriate for environment."""
        analysis = self.analyze_environment(env)

        print(f"\\nDesigning agent for environment:")
        print(f"  Observability: {analysis['observability']}")
        print(f"  Determinism: {analysis['determinism']}")
        print(f"  Episodic: {analysis['episodic']}")
        print(f"  Static: {analysis['static']}")
        print(f"  Agents: {analysis['agents']}")
        print()

        # Select architecture
        architecture = self.select_architecture(analysis)

        # Select required capabilities
        capabilities = self.select_capabilities(analysis)

        # Design considerations
        considerations = self.design_considerations(analysis)

        return {
            'architecture': architecture,
            'capabilities': capabilities,
            'considerations': considerations
        }

    def select_architecture(self, analysis):
        """Select agent architecture based on environment."""
        if analysis['observability'] == 'partial' and analysis['determinism'] == 'stochastic':
            # Complex environment: need sophisticated reasoning
            if analysis['episodic']:
                return "Utility-based agent"
            else:
                return "Learning agent with probabilistic reasoning"

        elif analysis['observability'] == 'full' and analysis['determinism'] == 'deterministic':
            # Simple environment: can use simpler architecture
            if analysis['episodic']:
                return "Simple reflex agent"
            else:
                return "Model-based agent"

        elif analysis['observability'] == 'partial':
            # Need to maintain state
            return "Model-based agent"

        elif analysis['determinism'] == 'stochastic':
            # Need to handle uncertainty
            return "Utility-based agent"

        else:
            return "Goal-based agent"

    def select_capabilities(self, analysis):
        """Select required capabilities."""
        capabilities = []

        if analysis['observability'] == 'partial':
            capabilities.append("State estimation")
            capabilities.append("Sensor fusion")

        if analysis['determinism'] == 'stochastic':
            capabilities.append("Probabilistic reasoning")
            capabilities.append("Risk assessment")

        if not analysis['episodic']:
            capabilities.append("Planning")
            capabilities.append("Memory")

        if not analysis['static']:
            capabilities.append("Continuous monitoring")
            capabilities.append("Replanning")

        if analysis['agents'] == 'multi':
            capabilities.append("Communication")
            capabilities.append("Coordination")
            capabilities.append("Game-theoretic reasoning")

        return capabilities

    def design_considerations(self, analysis):
        """Design considerations based on environment."""
        considerations = []

        # Observability
        if analysis['observability'] == 'partial':
            considerations.append("Maintain belief state over possible worlds")
            considerations.append("Active sensing strategy may be beneficial")
        else:
            considerations.append("Can use simple state representation")

        # Determinism
        if analysis['determinism'] == 'stochastic':
            considerations.append("Use probabilistic action models")
            considerations.append("Consider expected utility, not just goal achievement")
        else:
            considerations.append("Can use deterministic planning algorithms")

        # Episodic vs Sequential
        if analysis['episodic']:
            considerations.append("No need to plan ahead")
            considerations.append("Each episode independent")
        else:
            considerations.append("Actions affect future states")
            considerations.append("Need lookahead and planning")

        # Static vs Dynamic
        if not analysis['static']:
            considerations.append("Environment changes while agent deliberates")
            considerations.append("Fast decision-making important")
            considerations.append("May need reactive components")
        else:
            considerations.append("Can take time to deliberate")

        # Single vs Multi-agent
        if analysis['agents'] == 'multi':
            considerations.append("Model other agents' behavior")
            considerations.append("Potential for cooperation or competition")
        else:
            considerations.append("Environment predictable (except randomness)")

        return considerations

# Test environment adapter
print("Environment-Based Agent Design")
print("="*60)

adapter = EnvironmentAdapter()

# Test different environment types

# 1. Chess
print("\\n" + "="*60)
print("Environment 1: Chess")
print("="*60)

chess_env = Environment({
    'observable': 'fully',
    'deterministic': 'deterministic',
    'episodic': True,
    'static': False,  # Opponent moves
    'discrete': True,
    'agents': 'two'
})

design = adapter.design_agent(chess_env)
print(f"Recommended architecture: {design['architecture']}")
print(f"\\nRequired capabilities:")
for cap in design['capabilities']:
    print(f"  - {cap}")
print(f"\\nDesign considerations:")
for con in design['considerations']:
    print(f"  - {con}")

# 2. Self-driving car
print("\\n" + "="*60)
print("Environment 2: Self-Driving Car")
print("="*60)

car_env = Environment({
    'observable': 'partially',
    'deterministic': 'stochastic',
    'episodic': False,
    'static': False,
    'discrete': False,
    'agents': 'multi'
})

design = adapter.design_agent(car_env)
print(f"Recommended architecture: {design['architecture']}")
print(f"\\nRequired capabilities:")
for cap in design['capabilities']:
    print(f"  - {cap}")
print(f"\\nDesign considerations:")
for con in design['considerations']:
    print(f"  - {con}")

# 3. Robotic vacuum
print("\\n" + "="*60)
print("Environment 3: Robotic Vacuum")
print("="*60)

vacuum_env = Environment({
    'observable': 'partially',
    'deterministic': 'stochastic',
    'episodic': False,
    'static': False,  # Dirt appears
    'discrete': True,
    'agents': 'single'
})

design = adapter.design_agent(vacuum_env)
print(f"Recommended architecture: {design['architecture']}")
print(f"\\nRequired capabilities:")
for cap in design['capabilities']:
    print(f"  - {cap}")
print(f"\\nDesign considerations:")
for con in design['considerations']:
    print(f"  - {con}")

# 4. Medical diagnosis
print("\\n" + "="*60)
print("Environment 4: Medical Diagnosis")
print("="*60)

medical_env = Environment({
    'observable': 'partially',
    'deterministic': 'stochastic',
    'episodic': True,  # Each patient separate
    'static': False,  # Patient condition changes
    'discrete': False,
    'agents': 'multi'  # Doctors, other systems
})

design = adapter.design_agent(medical_env)
print(f"Recommended architecture: {design['architecture']}")
print(f"\\nRequired capabilities:")
for cap in design['capabilities']:
    print(f"  - {cap}")
print(f"\\nDesign considerations:")
for con in design['considerations']:
    print(f"  - {con}")

# Summary table
print("\\n" + "="*60)
print("Architecture Selection Summary")
print("="*60)

environments = [
    ("Chess", chess_env),
    ("Self-Driving Car", car_env),
    ("Robotic Vacuum", vacuum_env),
    ("Medical Diagnosis", medical_env)
]

print("\\n{:<20} {:<15} {:<15} {:<25}".format(
    "Environment", "Observable", "Deterministic", "Architecture"
))
print("-"*80)

for name, env in environments:
    analysis = adapter.analyze_environment(env)
    architecture = adapter.select_architecture(analysis)
    print("{:<20} {:<15} {:<15} {:<25}".format(
        name[:18],
        analysis['observability'],
        analysis['determinism'],
        architecture[:23]
    ))`,
    testCases: [
      { input: 'adapter.analyze_environment(env)', isHidden: false, description: 'Test environment analysis' },
      { input: 'adapter.select_architecture(analysis)', isHidden: false, description: 'Test architecture selection' },
      { input: 'adapter.design_agent(env)', isHidden: false, description: 'Test complete agent design' }
    ],
    hints: [
      'Partially observable: need state estimation and memory',
      'Stochastic: need probabilistic reasoning and utility',
      'Sequential (not episodic): need planning and lookahead',
      'Multi-agent: need coordination and communication'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t1-ex16',
    subjectId: 'cs406',
    topicId: 'cs406-topic-1',
    title: 'Agent Rationality and Bounded Rationality',
    difficulty: 3,
    description: `Implement agents with different rationality assumptions.

Your implementation should:
- Implement perfectly rational agent (unlimited computation)
- Implement boundedly rational agent (limited time/resources)
- Compare performance under resource constraints
- Demonstrate satisficing vs optimizing behavior`,
    starterCode: `class RationalAgent:
    def decide(self, state, actions):
        # Perfect rationality: find optimal action
        pass

class BoundedRationalAgent:
    def decide(self, state, actions, time_limit):
        # Bounded rationality: find good enough action
        pass

def compare_rationality(rational, bounded):
    pass`,
    solution: `import time
import random

class RationalAgent:
    """Perfectly rational agent (unlimited computation)."""
    def __init__(self, utility_function):
        self.utility = utility_function
        self.decisions = []

    def decide(self, state, actions):
        """
        Find optimal action by evaluating all possibilities.
        This may take a long time for complex problems.
        """
        start_time = time.time()

        best_action = None
        best_utility = float('-inf')

        # Evaluate all actions exhaustively
        for action in actions:
            # Simulate outcome
            outcome = self.simulate_outcome(state, action)
            utility = self.utility(outcome)

            if utility > best_utility:
                best_utility = utility
                best_action = action

        elapsed_time = time.time() - start_time

        self.decisions.append({
            'action': best_action,
            'utility': best_utility,
            'time': elapsed_time,
            'actions_evaluated': len(actions)
        })

        return best_action, best_utility

    def simulate_outcome(self, state, action):
        """Simulate outcome of action."""
        # Simple simulation
        return {
            'state': state,
            'action': action,
            'reward': random.gauss(action.get('expected_reward', 0), 1.0)
        }

class BoundedRationalAgent:
    """Boundedly rational agent (limited computation)."""
    def __init__(self, utility_function, satisficing_threshold=0.8):
        self.utility = utility_function
        self.satisficing_threshold = satisficing_threshold
        self.decisions = []

    def decide(self, state, actions, time_limit=None, max_evaluations=None):
        """
        Find good enough action within resource constraints.
        Uses satisficing: stop when action exceeds threshold.
        """
        start_time = time.time()

        best_action = None
        best_utility = float('-inf')
        evaluations = 0

        # Shuffle actions for randomized search
        actions_to_try = list(actions)
        random.shuffle(actions_to_try)

        for action in actions_to_try:
            # Check resource constraints
            if time_limit and (time.time() - start_time) > time_limit:
                break

            if max_evaluations and evaluations >= max_evaluations:
                break

            # Evaluate action
            outcome = self.simulate_outcome(state, action)
            utility = self.utility(outcome)
            evaluations += 1

            if utility > best_utility:
                best_utility = utility
                best_action = action

            # Satisficing: stop if good enough
            if utility >= self.satisficing_threshold * self.max_possible_utility():
                break

        elapsed_time = time.time() - start_time

        self.decisions.append({
            'action': best_action,
            'utility': best_utility,
            'time': elapsed_time,
            'actions_evaluated': evaluations
        })

        return best_action, best_utility

    def simulate_outcome(self, state, action):
        """Simulate outcome of action."""
        return {
            'state': state,
            'action': action,
            'reward': random.gauss(action.get('expected_reward', 0), 1.0)
        }

    def max_possible_utility(self):
        """Estimate maximum possible utility."""
        return 1.0  # Normalize to [0, 1]

class AdaptiveAgent:
    """Agent that adapts rationality to situation."""
    def __init__(self, utility_function):
        self.utility = utility_function
        self.decisions = []

    def decide(self, state, actions, urgency=0.5):
        """
        Adapt decision strategy based on urgency.
        Low urgency: more deliberation (rational)
        High urgency: quick decision (bounded)
        """
        start_time = time.time()

        # Adapt evaluation strategy based on urgency
        if urgency < 0.3:
            # Low urgency: evaluate many actions
            max_evals = len(actions)
        elif urgency < 0.7:
            # Medium urgency: evaluate subset
            max_evals = len(actions) // 2
        else:
            # High urgency: quick heuristic
            max_evals = 3

        best_action = None
        best_utility = float('-inf')

        # Prioritize actions by heuristic
        actions_sorted = sorted(
            actions,
            key=lambda a: a.get('expected_reward', 0),
            reverse=True
        )

        for i, action in enumerate(actions_sorted[:max_evals]):
            outcome = self.simulate_outcome(state, action)
            utility = self.utility(outcome)

            if utility > best_utility:
                best_utility = utility
                best_action = action

        elapsed_time = time.time() - start_time

        self.decisions.append({
            'action': best_action,
            'utility': best_utility,
            'time': elapsed_time,
            'actions_evaluated': min(max_evals, len(actions)),
            'urgency': urgency
        })

        return best_action, best_utility

    def simulate_outcome(self, state, action):
        """Simulate outcome of action."""
        return {
            'state': state,
            'action': action,
            'reward': random.gauss(action.get('expected_reward', 0), 1.0)
        }

def utility_function(outcome):
    """Simple utility function based on reward."""
    reward = outcome.get('reward', 0)
    # Normalize to [0, 1]
    return (reward + 10) / 20.0

def compare_rationality(rational, bounded, adaptive, num_trials=10):
    """Compare different rationality approaches."""

    print("\\nComparing Rationality Approaches")
    print("="*60)

    for trial in range(num_trials):
        # Generate decision problem
        state = {'trial': trial}
        num_actions = 20 + trial * 5  # Increasing complexity

        actions = [
            {'id': i, 'expected_reward': random.uniform(-5, 5)}
            for i in range(num_actions)
        ]

        # Rational agent (no constraints)
        rational.decide(state, actions)

        # Bounded rational agent (limited evaluations)
        bounded.decide(state, actions, max_evaluations=10)

        # Adaptive agent (medium urgency)
        adaptive.decide(state, actions, urgency=0.5)

    # Print results
    print(f"\\nResults after {num_trials} trials:")
    print("-"*60)

    agents = [
        ('Rational', rational),
        ('Bounded Rational', bounded),
        ('Adaptive', adaptive)
    ]

    for name, agent in agents:
        decisions = agent.decisions
        avg_utility = sum(d['utility'] for d in decisions) / len(decisions)
        avg_time = sum(d['time'] for d in decisions) / len(decisions)
        avg_evals = sum(d['actions_evaluated'] for d in decisions) / len(decisions)

        print(f"\\n{name}:")
        print(f"  Avg utility: {avg_utility:.4f}")
        print(f"  Avg time: {avg_time*1000:.2f} ms")
        print(f"  Avg evaluations: {avg_evals:.1f}")

    return agents

# Test different rationality levels
print("Agent Rationality Comparison")
print("="*60)

# Create agents
rational_agent = RationalAgent(utility_function)
bounded_agent = BoundedRationalAgent(utility_function, satisficing_threshold=0.7)
adaptive_agent = AdaptiveAgent(utility_function)

# Compare performance
agents = compare_rationality(rational_agent, bounded_agent, adaptive_agent, num_trials=10)

# Detailed analysis
print("\\n" + "="*60)
print("Rationality Trade-offs")
print("="*60)

print("\\nPerfect Rationality:")
print("  + Always finds optimal action")
print("  - Computationally expensive")
print("  - May be too slow for real-time decisions")

print("\\nBounded Rationality:")
print("  + Fast decision making")
print("  + Satisficing: finds 'good enough' solutions")
print("  - May miss optimal actions")
print("  + More realistic model of human/agent behavior")

print("\\nAdaptive Rationality:")
print("  + Adapts to situation demands")
print("  + Balances speed and optimality")
print("  + Useful in varying time pressure")

# Visualize satisficing
print("\\n" + "="*60)
print("Satisficing Behavior")
print("="*60)

state = {}
actions = [
    {'id': 1, 'expected_reward': 3.0},
    {'id': 2, 'expected_reward': 5.0},
    {'id': 3, 'expected_reward': 8.0},  # Optimal
    {'id': 4, 'expected_reward': 7.5},
    {'id': 5, 'expected_reward': 4.0},
]

print("\\nAvailable actions:")
for action in actions:
    print(f"  Action {action['id']}: expected reward = {action['expected_reward']}")

# Bounded agent with high threshold
bounded_high = BoundedRationalAgent(utility_function, satisficing_threshold=0.9)
action, utility = bounded_high.decide(state, actions, max_evaluations=5)
print(f"\\nBounded agent (high threshold): chose action {action['id'] if action else 'None'}")

# Bounded agent with low threshold
bounded_low = BoundedRationalAgent(utility_function, satisficing_threshold=0.6)
action, utility = bounded_low.decide(state, actions, max_evaluations=5)
print(f"Bounded agent (low threshold): chose action {action['id'] if action else 'None'}")

# Rational agent
action, utility = rational_agent.decide(state, actions)
print(f"Rational agent: chose action {action['id'] if action else 'None'}")`,
    testCases: [
      { input: 'rational_agent.decide(state, actions)', isHidden: false, description: 'Test rational agent finds optimal action' },
      { input: 'bounded_agent.decide(state, actions, time_limit)', isHidden: false, description: 'Test bounded agent with resource constraints' },
      { input: 'compare_rationality(rational, bounded)', isHidden: false, description: 'Test performance comparison' }
    ],
    hints: [
      'Perfect rationality: evaluate all options, choose best (may be slow)',
      'Bounded rationality: evaluate limited options, satisfice (faster)',
      'Satisficing: stop when solution is "good enough" vs optimal',
      'Trade-off: decision quality vs computational resources'
    ],
    language: 'python'
  }
];
