---
title: "CSP Applications"
slug: "csp-applications"
description: "Comprehensive overview of real-world CSP applications including scheduling, resource allocation, and configuration"
---

# CSP Applications

## Introduction

Constraint Satisfaction Problems provide a powerful framework for solving a wide variety of real-world problems across many domains. The declarative nature of CSPs - where we specify what constraints must be satisfied rather than how to satisfy them - makes them particularly well-suited for practical applications. This separation of problem specification from solution algorithm allows domain experts to model problems without deep algorithmic knowledge, while CSP solvers handle the computational challenges.

In this section, we explore major application areas where CSP techniques have proven highly effective, examining how real-world problems are formulated as CSPs and solved using the techniques we've studied.

## Scheduling Problems

Scheduling is perhaps the most common application of CSP techniques, appearing in manufacturing, education, transportation, and many other domains.

### Job Shop Scheduling

In job shop scheduling, we have multiple jobs, each consisting of a sequence of tasks that must be performed on specific machines. The goal is to schedule all tasks while satisfying precedence and resource constraints.

**CSP Formulation**:
- **Variables**: Start time for each task
- **Domains**: Possible time slots (e.g., 0 to 100)
- **Constraints**:
  - Precedence: Task B cannot start before Task A completes (StartB ≥ StartA + DurationA)
  - Resource: No two tasks using the same machine overlap
  - Deadlines: Tasks complete before specified times

```python
class JobShopCSP:
    def __init__(self, jobs, machines):
        self.jobs = jobs  # List of jobs, each with tasks
        self.machines = machines

        # Variables: start time for each task
        self.variables = []
        for job in jobs:
            for task in job.tasks:
                self.variables.append(f"start_{job.id}_{task.id}")

        # Domains: time slots
        self.domains = {var: range(0, 100) for var in self.variables}

    def precedence_constraint(self, task1_start, task2_start, duration1):
        """Task 2 must start after task 1 completes"""
        return task2_start >= task1_start + duration1

    def resource_constraint(self, start1, dur1, start2, dur2):
        """Two tasks on same machine must not overlap"""
        return start1 + dur1 <= start2 or start2 + dur2 <= start1
```

**Applications**:
- Manufacturing: Assembly line scheduling
- Computing: Task scheduling on processors
- Healthcare: Operating room scheduling

### University Course Timetabling

Creating conflict-free timetables for courses, rooms, and instructors is a classic CSP:

**CSP Formulation**:
- **Variables**: Time slot and room for each course section
- **Domains**: Available (time, room) pairs
- **Constraints**:
  - No student enrolled in overlapping courses
  - No instructor teaching multiple courses simultaneously
  - Room capacity ≥ course enrollment
  - Room has required equipment
  - Preferred time slots (soft constraints)

```python
class TimetableCSP:
    def __init__(self, courses, rooms, time_slots):
        # Variables: (time, room) assignment for each course
        self.variables = [f"course_{c.id}" for c in courses]

        # Domains: combinations of time slots and rooms
        self.domains = {}
        for course in courses:
            self.domains[f"course_{course.id}"] = [
                (time, room)
                for time in time_slots
                for room in rooms
                if room.capacity >= course.enrollment
                and room.has_equipment(course.required_equipment)
            ]

    def no_student_conflict(self, course1_assignment, course2_assignment,
                           shared_students):
        """Students can't attend two courses at same time"""
        time1, _ = course1_assignment
        time2, _ = course2_assignment
        return time1 != time2 or not shared_students

    def no_room_conflict(self, assignment1, assignment2):
        """Same room can't host two courses simultaneously"""
        time1, room1 = assignment1
        time2, room2 = assignment2
        return room1 != room2 or time1 != time2
```

**Real-world considerations**:
- Soft constraints for preferences
- Multi-objective optimization (minimize gaps, balance load)
- Incremental solving for changes/updates

### Exam Scheduling

Similar to timetabling but with different constraints:

**Key Constraints**:
- Students can't have conflicting exams
- Spread exams to avoid multiple exams per day per student
- Proctor availability
- Room availability and capacity

## Resource Allocation

CSPs are widely used for allocating limited resources to competing demands.

### Frequency Assignment

Assigning radio frequencies to transmitters while avoiding interference:

**CSP Formulation**:
- **Variables**: Transmitter stations
- **Domains**: Available frequencies
- **Constraints**:
  - Nearby transmitters need different frequencies
  - Separation constraint: |freq(X) - freq(Y)| ≥ k for close stations
  - Limited spectrum (minimize number of frequencies used)

```python
class FrequencyAssignmentCSP:
    def __init__(self, transmitters, frequencies):
        self.variables = transmitters
        self.domains = {t: frequencies for t in transmitters}

    def separation_constraint(self, freq1, freq2, distance, min_separation):
        """
        Frequency separation based on distance between transmitters
        Closer transmitters need more frequency separation
        """
        if distance < 10:  # km
            return abs(freq1 - freq2) >= min_separation
        elif distance < 50:
            return abs(freq1 - freq2) >= min_separation // 2
        return True  # Distant transmitters can use same frequency
```

### Resource Distribution

Distributing resources like vehicles, personnel, or equipment:

**Example - Ambulance Dispatch**:
- **Variables**: Ambulance assignments to emergency calls
- **Domains**: Available ambulances
- **Constraints**:
  - Each call assigned one ambulance
  - Ambulance capacity constraints
  - Response time requirements
  - Ambulance availability windows

## Configuration Problems

Configuration involves selecting and connecting components to meet requirements.

### Computer Configuration

Configuring a computer system from compatible components:

**CSP Formulation**:
- **Variables**: Component slots (CPU, RAM, storage, GPU, etc.)
- **Domains**: Compatible models for each component type
- **Constraints**:
  - Compatibility: CPU socket matches motherboard
  - Power: Total power draw ≤ power supply capacity
  - Physical: Components fit in case
  - Budget: Total cost ≤ budget
  - Performance: Meets minimum specifications

```python
class ComputerConfigCSP:
    def __init__(self, components, requirements):
        self.variables = ['cpu', 'motherboard', 'ram', 'storage',
                         'gpu', 'psu', 'case']
        self.domains = components  # Available options per component
        self.requirements = requirements

    def compatibility_constraint(self, cpu, motherboard):
        """CPU socket must match motherboard socket"""
        return cpu.socket == motherboard.socket

    def power_constraint(self, components_dict, psu):
        """Total power consumption within PSU capacity"""
        total_power = sum(c.power_draw for c in components_dict.values())
        return total_power <= psu.capacity * 0.8  # 80% safety margin

    def budget_constraint(self, components_dict, max_budget):
        """Total cost within budget"""
        total_cost = sum(c.price for c in components_dict.values())
        return total_cost <= max_budget
```

### Network Configuration

Configuring network topology, IP addresses, and routing:

**Constraints**:
- Unique IP addresses
- Subnet masks and routing rules
- Bandwidth requirements
- Redundancy requirements
- Security policies

## Map Coloring and Graph Coloring

Beyond the classic example, graph coloring has many practical applications:

### Register Allocation in Compilers

Assigning program variables to CPU registers:

**CSP Formulation**:
- **Variables**: Program variables
- **Domains**: Available CPU registers
- **Constraints**: Variables with overlapping lifetimes need different registers

This is exactly graph coloring where nodes are variables and edges connect variables that can't share registers.

```python
class RegisterAllocationCSP:
    def __init__(self, variables, interference_graph, num_registers):
        self.variables = variables
        self.domains = {v: list(range(num_registers)) for v in variables}
        self.interference = interference_graph

    def no_interference(self, var1_reg, var2_reg):
        """Variables that interfere need different registers"""
        return var1_reg != var2_reg
```

### Sudoku and Logic Puzzles

Sudoku is a perfect CSP application:

**CSP Formulation**:
- **Variables**: 81 cells (or only empty cells)
- **Domains**: {1, 2, 3, 4, 5, 6, 7, 8, 9}
- **Constraints**: AllDifferent for each row, column, and 3×3 box

```python
class SudokuCSP:
    def __init__(self, puzzle):
        # Variables: empty cells
        self.variables = []
        for i in range(9):
            for j in range(9):
                if puzzle[i][j] == 0:
                    self.variables.append((i, j))

        # Domains: 1-9 for each empty cell
        self.domains = {var: list(range(1, 10)) for var in self.variables}

    def row_constraint(self, cells_in_row):
        """All different in row"""
        return len(cells_in_row) == len(set(cells_in_row))

    def box_constraint(self, cells_in_box):
        """All different in 3x3 box"""
        return len(cells_in_box) == len(set(cells_in_box))
```

**CSP solving advantages**:
- AC-3 propagation solves easy puzzles instantly
- Backtracking with MRV handles harder puzzles efficiently
- Can detect unsolvable puzzles early

## Planning as CSP

Classical AI planning can be formulated as a CSP:

**Variables**: Action at each time step
**Domains**: Possible actions
**Constraints**: Preconditions, effects, goal achievement

This CSP-based planning (GraphPlan) competes with dedicated planning algorithms.

## Circuit Design and Verification

### VLSI Layout

Placing components on a chip:

**Constraints**:
- Non-overlapping components
- Wire length minimization
- Thermal constraints
- Signal timing constraints

### Boolean Satisfiability (SAT)

While technically a special case of CSP with boolean domains, SAT has enormous practical importance:

**Applications**:
- Hardware verification
- Software verification
- Automated theorem proving
- Cryptanalysis

Modern SAT solvers are essentially specialized CSP solvers optimized for boolean domains.

## Transportation and Logistics

### Vehicle Routing

Assigning delivery routes to vehicles:

**Constraints**:
- Vehicle capacity
- Time windows for deliveries
- Driver hours regulations
- Road network constraints

### Airline Crew Scheduling

Assigning crew members to flights:

**Constraints**:
- Required certifications
- Rest period requirements
- Maximum hours regulations
- Base location preferences
- Union rules

## Success Factors in Real Applications

CSPs succeed in practice when:

1. **Clear constraints**: Requirements can be formulated precisely
2. **Tight constraints**: Fewer solutions make search more effective
3. **Local consistency**: Constraint propagation prunes effectively
4. **Structure**: Problem decomposition or symmetries can be exploited
5. **Hybrid approaches**: Combining CSP with optimization or heuristics

## Key Takeaways

1. CSPs provide a unified framework for diverse real-world problems
2. Scheduling and resource allocation are the most common CSP applications
3. Configuration problems benefit from CSP's declarative approach
4. Graph coloring has applications beyond map coloring (register allocation, etc.)
5. Timetabling and scheduling involve both hard constraints and soft preferences
6. Modern CSP solvers handle problems with thousands of variables
7. Real applications often combine CSP techniques with domain-specific heuristics
8. The separation of problem specification from solving algorithm is CSP's key strength
9. Success requires good problem formulation, not just powerful solving techniques