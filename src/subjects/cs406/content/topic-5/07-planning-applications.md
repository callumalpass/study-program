---
title: "Planning Applications"
slug: "planning-applications"
description: "Real-world applications of automated planning in robotics, logistics, manufacturing, space missions, and service composition"
---

# Planning Applications

Automated planning has evolved from a theoretical AI problem to a practical technology deployed in diverse real-world applications. From coordinating autonomous robots to orchestrating complex logistics operations, planning systems enable intelligent agents to achieve goals in dynamic, uncertain environments. This section explores major application domains where planning techniques have made significant impact, examining both the opportunities and challenges unique to each domain.

## Robot Motion Planning

Robot motion planning involves finding collision-free paths for robots to navigate from start to goal configurations while avoiding obstacles. This combines classical planning with continuous state spaces and geometric reasoning.

### Challenges in Robot Planning

1. **Continuous state space**: Robot configurations are continuous (x, y, θ)
2. **High dimensionality**: Multi-joint robots have many degrees of freedom
3. **Geometric constraints**: Must avoid collisions with obstacles
4. **Dynamic obstacles**: Environment may change during execution
5. **Uncertainty**: Sensor noise and actuation errors

### Planning Approaches

**Configuration Space Planning**:
Convert the robot and obstacles into a configuration space (C-space) where the robot is a point:

```python
class ConfigurationSpace:
    """Represent robot configuration space"""

    def __init__(self, robot, obstacles):
        self.robot = robot
        self.obstacles = obstacles
        self.dimensions = robot.dof  # Degrees of freedom

    def is_collision_free(self, config):
        """Check if configuration collides with obstacles"""
        robot_position = self.robot.forward_kinematics(config)

        for obstacle in self.obstacles:
            if self.intersects(robot_position, obstacle):
                return False

        return True

    def sample_free_space(self, n_samples):
        """Sample collision-free configurations"""
        samples = []

        while len(samples) < n_samples:
            config = self.random_configuration()
            if self.is_collision_free(config):
                samples.append(config)

        return samples


class MotionPlanner:
    """Motion planner using RRT (Rapidly-exploring Random Tree)"""

    def __init__(self, c_space, start, goal):
        self.c_space = c_space
        self.start = start
        self.goal = goal
        self.tree = {start: None}  # Map: config -> parent

    def plan(self, max_iterations=1000):
        """Find path from start to goal"""

        for _ in range(max_iterations):
            # Sample random configuration
            random_config = self.c_space.random_configuration()

            # Find nearest node in tree
            nearest = self.find_nearest(random_config)

            # Extend toward random config
            new_config = self.steer(nearest, random_config)

            # Check if path is collision-free
            if self.c_space.is_collision_free(new_config):
                self.tree[new_config] = nearest

                # Check if goal reached
                if self.distance(new_config, self.goal) < 0.1:
                    return self.extract_path(new_config)

        return None  # No path found

    def find_nearest(self, config):
        """Find nearest configuration in tree"""
        nearest = None
        min_dist = float('inf')

        for node in self.tree.keys():
            dist = self.distance(node, config)
            if dist < min_dist:
                min_dist = dist
                nearest = node

        return nearest

    def steer(self, from_config, to_config, step_size=0.1):
        """Move from_config toward to_config by step_size"""
        direction = self.normalize(
            [to_config[i] - from_config[i] for i in range(len(from_config))]
        )

        new_config = tuple(
            from_config[i] + step_size * direction[i]
            for i in range(len(from_config))
        )

        return new_config

    def extract_path(self, goal_node):
        """Extract path from tree"""
        path = []
        current = goal_node

        while current is not None:
            path.append(current)
            current = self.tree[current]

        return list(reversed(path))

    def distance(self, config1, config2):
        """Euclidean distance between configurations"""
        return sum((config1[i] - config2[i])**2
                  for i in range(len(config1)))**0.5

    def normalize(self, vector):
        """Normalize vector to unit length"""
        length = sum(x**2 for x in vector)**0.5
        return tuple(x/length for x in vector) if length > 0 else vector
```

### Task and Motion Planning (TAMP)

TAMP combines high-level task planning with low-level motion planning:

```python
class TaskAndMotionPlanner:
    """Integrate task planning with motion planning"""

    def __init__(self, initial_state, goal, actions, motion_planner):
        self.initial = initial_state
        self.goal = goal
        self.actions = actions
        self.motion_planner = motion_planner

    def plan(self):
        """Find combined task and motion plan"""

        # High-level task planning
        task_plan = self.task_plan(self.initial, self.goal)

        if task_plan is None:
            return None

        # For each task, plan motion
        motion_plan = []
        current_config = self.initial['robot_config']

        for action in task_plan:
            # Compute motion to execute action
            target_config = self.action_target_config(action)

            path = self.motion_planner.plan(current_config, target_config)

            if path is None:
                # Motion planning failed - replan task
                return self.replan_with_motion_constraints(action)

            motion_plan.append({
                'action': action,
                'motion': path
            })

            current_config = target_config

        return motion_plan

    def task_plan(self, initial, goal):
        """High-level task planning"""
        # Use any classical planner (A*, GraphPlan, etc.)
        from collections import deque

        frontier = deque([(initial, [])])
        explored = {frozenset(initial.items())}

        while frontier:
            state, plan = frontier.popleft()

            if self.satisfies_goal(state, goal):
                return plan

            for action in self.applicable_actions(state):
                new_state = self.apply_action(action, state)
                state_key = frozenset(new_state.items())

                if state_key not in explored:
                    explored.add(state_key)
                    frontier.append((new_state, plan + [action]))

        return None
```

## Logistics Planning

Logistics involves coordinating the movement of goods, vehicles, and resources to meet delivery requirements efficiently.

### Domain Model

```python
class LogisticsDomain:
    """Logistics planning domain"""

    def __init__(self):
        self.locations = set()
        self.vehicles = {}  # vehicle -> capacity
        self.packages = {}  # package -> (weight, origin, destination)
        self.roads = []     # List of (loc1, loc2, distance)

    def create_actions(self):
        """Generate logistics actions"""
        actions = []

        # Load package onto vehicle
        for pkg in self.packages:
            for vehicle in self.vehicles:
                actions.append(Action(
                    f"Load({pkg}, {vehicle})",
                    preconditions={
                        f"At({pkg}, ?loc)",
                        f"At({vehicle}, ?loc)",
                        f"CanCarry({vehicle}, {pkg})"
                    },
                    add_effects={f"In({pkg}, {vehicle})"},
                    delete_effects={f"At({pkg}, ?loc)"}
                ))

        # Drive vehicle between locations
        for vehicle in self.vehicles:
            for loc1, loc2, dist in self.roads:
                actions.append(Action(
                    f"Drive({vehicle}, {loc1}, {loc2})",
                    preconditions={f"At({vehicle}, {loc1})"},
                    add_effects={f"At({vehicle}, {loc2})"},
                    delete_effects={f"At({vehicle}, {loc1})"}
                ))

        # Unload package from vehicle
        for pkg in self.packages:
            for vehicle in self.vehicles:
                actions.append(Action(
                    f"Unload({pkg}, {vehicle})",
                    preconditions={
                        f"In({pkg}, {vehicle})",
                        f"At({vehicle}, ?loc)"
                    },
                    add_effects={f"At({pkg}, ?loc)"},
                    delete_effects={f"In({pkg}, {vehicle})"}
                ))

        return actions


class LogisticsOptimizer:
    """Optimize logistics plans for cost"""

    def __init__(self, domain):
        self.domain = domain

    def optimize_plan(self, plan):
        """Optimize plan to minimize distance traveled"""

        # Extract vehicle routes
        routes = self.extract_routes(plan)

        # Optimize each route
        optimized_routes = {}
        for vehicle, route in routes.items():
            optimized_routes[vehicle] = self.optimize_route(route)

        # Reconstruct plan
        return self.reconstruct_plan(optimized_routes)

    def optimize_route(self, route):
        """Solve Traveling Salesman Problem for route"""
        # Use approximation algorithm (nearest neighbor)

        if len(route) <= 2:
            return route

        optimized = [route[0]]  # Start location
        remaining = set(route[1:])

        while remaining:
            current = optimized[-1]
            nearest = min(remaining,
                         key=lambda loc: self.distance(current, loc))
            optimized.append(nearest)
            remaining.remove(nearest)

        return optimized

    def distance(self, loc1, loc2):
        """Get distance between locations"""
        for l1, l2, dist in self.domain.roads:
            if (l1 == loc1 and l2 == loc2) or (l1 == loc2 and l2 == loc1):
                return dist
        return float('inf')
```

## Manufacturing Planning

Manufacturing planning schedules production tasks, allocates resources, and coordinates assembly operations.

### Production Scheduling

```python
class ProductionScheduler:
    """Schedule manufacturing tasks with resource constraints"""

    def __init__(self, tasks, resources, precedence):
        self.tasks = tasks          # task -> duration
        self.resources = resources  # resource -> capacity
        self.precedence = precedence  # List of (task1, task2) pairs

    def schedule(self):
        """Create production schedule"""

        # Topological sort respecting precedence
        sorted_tasks = self.topological_sort()

        # Assign start times
        schedule = {}
        resource_timeline = {r: [] for r in self.resources}

        for task in sorted_tasks:
            # Find earliest start time
            earliest_start = 0

            # Respect precedence constraints
            for pred, succ in self.precedence:
                if succ == task and pred in schedule:
                    earliest_start = max(earliest_start,
                                        schedule[pred]['end'])

            # Check resource availability
            required_resource = self.task_resource(task)
            start_time = self.find_available_slot(
                resource_timeline[required_resource],
                earliest_start,
                self.tasks[task]
            )

            # Schedule task
            schedule[task] = {
                'start': start_time,
                'end': start_time + self.tasks[task],
                'resource': required_resource
            }

            resource_timeline[required_resource].append(
                (start_time, start_time + self.tasks[task])
            )

        return schedule

    def topological_sort(self):
        """Sort tasks respecting precedence"""
        from collections import deque, defaultdict

        in_degree = defaultdict(int)
        graph = defaultdict(list)

        for pred, succ in self.precedence:
            graph[pred].append(succ)
            in_degree[succ] += 1

        queue = deque([t for t in self.tasks if in_degree[t] == 0])
        result = []

        while queue:
            task = queue.popleft()
            result.append(task)

            for successor in graph[task]:
                in_degree[successor] -= 1
                if in_degree[successor] == 0:
                    queue.append(successor)

        return result

    def find_available_slot(self, timeline, earliest, duration):
        """Find earliest time slot of given duration"""

        if not timeline:
            return earliest

        # Sort by start time
        timeline.sort()

        # Try to fit before first task
        if earliest + duration <= timeline[0][0]:
            return earliest

        # Try gaps between tasks
        for i in range(len(timeline) - 1):
            gap_start = max(earliest, timeline[i][1])
            gap_end = timeline[i+1][0]

            if gap_start + duration <= gap_end:
                return gap_start

        # Fit after last task
        return max(earliest, timeline[-1][1])
```

## Space Mission Planning

Space missions require long-horizon planning under strict resource constraints and communication delays.

### NASA's Remote Agent

The Remote Agent was deployed on Deep Space 1 in 1999, demonstrating autonomous planning in space:

```python
class SpacecraftPlanner:
    """Plan spacecraft activities with resource constraints"""

    def __init__(self, spacecraft_state, resources):
        self.state = spacecraft_state
        self.resources = resources  # battery, fuel, memory, etc.

    def plan_mission_phase(self, objectives, duration):
        """Plan activities for mission phase"""

        activities = []
        current_time = 0
        resource_levels = self.resources.copy()

        # Prioritize objectives
        sorted_objectives = self.prioritize_objectives(objectives)

        for objective in sorted_objectives:
            # Check if objective can be achieved
            required_resources = self.objective_resources(objective)

            if self.check_resources(resource_levels, required_resources):
                # Plan activities for objective
                obj_activities = self.decompose_objective(objective)

                for activity in obj_activities:
                    # Schedule activity
                    activities.append({
                        'name': activity,
                        'start': current_time,
                        'duration': self.activity_duration(activity)
                    })

                    # Update resources
                    self.consume_resources(resource_levels, activity)
                    current_time += self.activity_duration(activity)

                    # Add resource generation (solar panels, etc.)
                    self.generate_resources(resource_levels,
                                           self.activity_duration(activity))

            # Check time constraint
            if current_time >= duration:
                break

        return activities

    def check_resources(self, available, required):
        """Check if resources are sufficient"""
        for resource, amount in required.items():
            if available.get(resource, 0) < amount:
                return False
        return True

    def consume_resources(self, resources, activity):
        """Update resources after activity execution"""
        consumption = self.activity_consumption(activity)

        for resource, amount in consumption.items():
            resources[resource] -= amount

    def generate_resources(self, resources, time_elapsed):
        """Generate resources over time (solar power, etc.)"""
        # Solar panel power generation
        if 'battery' in resources:
            resources['battery'] += 10 * time_elapsed  # watts/hour
            resources['battery'] = min(resources['battery'],
                                      self.resources['battery_max'])
```

## Web Service Composition

Service composition automatically combines web services to achieve complex goals.

### Service Planning

```python
class ServiceComposer:
    """Compose web services to achieve goals"""

    def __init__(self, services):
        self.services = services  # Available services

    def compose(self, inputs, outputs):
        """Find service composition from inputs to outputs"""

        # Model as planning problem
        initial_state = set(inputs)
        goal = set(outputs)

        # Create planning actions from services
        actions = []
        for service in self.services:
            actions.append({
                'name': service['name'],
                'preconditions': set(service['inputs']),
                'effects': set(service['outputs'])
            })

        # Forward search for composition
        from collections import deque

        frontier = deque([(initial_state, [])])
        explored = {frozenset(initial_state)}

        while frontier:
            state, composition = frontier.popleft()

            # Goal test
            if goal.issubset(state):
                return composition

            # Try each service
            for action in actions:
                if action['preconditions'].issubset(state):
                    new_state = state | action['effects']
                    state_key = frozenset(new_state)

                    if state_key not in explored:
                        explored.add(state_key)
                        frontier.append((new_state,
                                       composition + [action['name']]))

        return None  # No composition found


# Example usage
services = [
    {
        'name': 'GetWeather',
        'inputs': ['location'],
        'outputs': ['temperature', 'humidity']
    },
    {
        'name': 'RecommendActivity',
        'inputs': ['temperature', 'user_preferences'],
        'outputs': ['activity_suggestion']
    },
    {
        'name': 'BookTicket',
        'inputs': ['activity_suggestion', 'payment_info'],
        'outputs': ['ticket_confirmation']
    }
]

composer = ServiceComposer(services)
composition = composer.compose(
    inputs=['location', 'user_preferences', 'payment_info'],
    outputs=['ticket_confirmation']
)

print("Service composition:", composition)
```

## Game AI Planning

Games use planning for NPC behavior, strategy, and adaptive opponents.

### Real-Time Strategy (RTS) Planning

```python
class RTSPlanner:
    """Planning for RTS game AI"""

    def __init__(self, game_state):
        self.state = game_state
        self.build_order = []
        self.army_composition = {}

    def plan_strategy(self, opponent_state):
        """Create strategic plan"""

        # Economic planning
        eco_plan = self.plan_economy()

        # Military planning
        mil_plan = self.plan_military(opponent_state)

        # Tech planning
        tech_plan = self.plan_technology()

        # Combine into overall strategy
        return self.merge_plans(eco_plan, mil_plan, tech_plan)

    def plan_economy(self):
        """Plan resource gathering and base building"""

        plan = []
        resources = self.state['resources']

        # Build order optimization
        if resources['workers'] < 10:
            plan.append(('BuildWorker', 1))

        if resources['minerals'] > 100:
            plan.append(('BuildSupplyDepot', 2))

        if resources['gas'] < 100:
            plan.append(('BuildRefinery', 3))

        return plan

    def plan_military(self, opponent_state):
        """Plan army composition and attacks"""

        # Counter opponent's strategy
        opponent_army = opponent_state['army']

        counter_units = self.compute_counter_composition(opponent_army)

        plan = []
        for unit_type, count in counter_units.items():
            plan.append(('TrainUnit', unit_type, count))

        # Plan attack timing
        if self.evaluate_army_strength() > 1.5 * self.evaluate_opponent_strength(opponent_state):
            plan.append(('Attack', 'opponent_base'))

        return plan
```

## Challenges in Real-World Planning

All application domains face common challenges:

1. **Uncertainty**: Incomplete information, stochastic effects
2. **Scalability**: Large state spaces, long horizons
3. **Real-time constraints**: Limited computation time
4. **Continuous variables**: Time, space, resources
5. **Multi-agent coordination**: Multiple planners, conflicting goals
6. **Execution monitoring**: Detecting and handling failures
7. **Replanning**: Adapting to changes during execution

## Key Takeaways

1. Robot motion planning combines high-level task planning with low-level geometric path planning
2. Logistics planning optimizes routing and scheduling to minimize cost while meeting delivery requirements
3. Manufacturing uses planning for production scheduling, resource allocation, and assembly coordination
4. Space missions require autonomous planning under strict resource constraints and communication delays
5. Web service composition uses planning to automatically combine services to achieve complex workflows
6. Game AI employs planning for strategic decision-making and adaptive opponent behavior
7. Real-world planning faces challenges including uncertainty, scalability, real-time constraints, and execution monitoring
8. Successful applications typically combine classical planning with domain-specific techniques and heuristics
