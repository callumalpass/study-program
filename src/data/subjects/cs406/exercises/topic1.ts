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
  }
];
