import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  {
    id: 'cs406-t4-ex01',
    subjectId: 'cs406',
    topicId: 'cs406-topic-4',
    title: 'Backtracking Search for CSP',
    difficulty: 2,
    description: `Implement backtracking search for constraint satisfaction problems.

Your implementation should:
- Assign variables one at a time
- Check constraints after each assignment
- Backtrack when no legal values remain
- Solve the N-Queens problem as a test case`,
    starterCode: `def is_consistent(assignment, var, value, constraints):
    # Check if assigning value to var is consistent
    pass

def backtracking_search(variables, domains, constraints):
    # Implement backtracking search
    # Returns: complete assignment or None
    pass

# Example: 4-Queens
# variables = [0, 1, 2, 3]  # columns
# domains = {i: [0, 1, 2, 3] for i in range(4)}  # rows
# constraints = lambda v1, val1, v2, val2: ... # no attacks`,
    solution: `def is_consistent(assignment, var, value, constraints):
    """Check if assigning value to var is consistent with current assignment."""
    for assigned_var, assigned_value in assignment.items():
        if not constraints(var, value, assigned_var, assigned_value):
            return False
    return True

def backtracking_search(variables, domains, constraints, assignment=None):
    """
    Backtracking search for CSP.
    Returns: complete assignment or None if no solution
    """
    if assignment is None:
        assignment = {}

    # Check if assignment is complete
    if len(assignment) == len(variables):
        return assignment

    # Select unassigned variable
    unassigned = [v for v in variables if v not in assignment]
    var = unassigned[0]

    # Try each value in domain
    for value in domains[var]:
        if is_consistent(assignment, var, value, constraints):
            assignment[var] = value

            result = backtracking_search(variables, domains, constraints, assignment)

            if result is not None:
                return result

            # Backtrack
            del assignment[var]

    return None  # No solution found

# N-Queens constraints
def queens_constraint(col1, row1, col2, row2):
    """Two queens don't attack each other."""
    # Not same row
    if row1 == row2:
        return False
    # Not same diagonal
    if abs(row1 - row2) == abs(col1 - col2):
        return False
    return True

# Solve 4-Queens
n = 4
variables = list(range(n))  # columns
domains = {i: list(range(n)) for i in range(n)}  # rows

solution = backtracking_search(variables, domains, queens_constraint)

if solution:
    print("4-Queens solution:", solution)
    # Visualize
    for row in range(n):
        line = ""
        for col in range(n):
            if solution[col] == row:
                line += "Q "
            else:
                line += ". "
        print(line)
else:
    print("No solution found")

# Test with 8-Queens
n = 8
variables = list(range(n))
domains = {i: list(range(n)) for i in range(n)}

solution = backtracking_search(variables, domains, queens_constraint)
print(f"\\n8-Queens solution found: {solution is not None}")`  ,
    testCases: [
      { input: 'backtracking_search(variables, domains, queens_constraint)', isHidden: false, description: 'Test backtracking solves 4-Queens' },
      { input: 'is_consistent(assignment, var, value, constraints)', isHidden: false, description: 'Test consistency checking' },
      { input: 'backtracking with 8-Queens', isHidden: false, description: 'Test backtracking finds solution for 8-Queens' }
    ],
    hints: [
      'Check consistency by verifying the new assignment doesn\'t violate constraints with existing assignments',
      'Select any unassigned variable and try values from its domain in order',
      'When a value fails, backtrack by removing it from the assignment and trying the next value'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t4-ex02',
    subjectId: 'cs406',
    topicId: 'cs406-topic-4',
    title: 'AC-3 Constraint Propagation',
    difficulty: 3,
    description: `Implement the AC-3 algorithm for arc consistency.

Your implementation should:
- Maintain a queue of arcs to check
- Remove inconsistent values from domains
- Add affected arcs back to queue when domains change
- Return False if any domain becomes empty`,
    starterCode: `def revise(xi, xj, domains, constraints):
    # Remove values from domain of xi that are inconsistent with xj
    # Return True if domain was revised
    pass

def ac3(variables, domains, constraints):
    # Implement AC-3 algorithm
    # Returns: True if arc consistent, False if inconsistent
    pass`,
    solution: `from collections import deque

def revise(xi, xj, domains, constraints):
    """
    Remove values from domain of xi that are inconsistent with xj.
    Returns True if domain was revised.
    """
    revised = False

    # For each value in xi's domain
    for x in list(domains[xi]):
        # Check if there exists a value in xj's domain that satisfies constraint
        satisfies = False

        for y in domains[xj]:
            if constraints(xi, x, xj, y):
                satisfies = True
                break

        # If no value in xj's domain satisfies, remove x from xi's domain
        if not satisfies:
            domains[xi].remove(x)
            revised = True

    return revised

def ac3(variables, domains, constraints):
    """
    AC-3 algorithm for arc consistency.
    Returns: (consistent, domains) where consistent is True if arc consistent
    """
    # Copy domains to avoid modifying original
    domains = {var: domain[:] for var, domain in domains.items()}

    # Initialize queue with all arcs
    queue = deque()
    for xi in variables:
        for xj in variables:
            if xi != xj:
                queue.append((xi, xj))

    while queue:
        xi, xj = queue.popleft()

        if revise(xi, xj, domains, constraints):
            # Domain was revised

            # If domain is empty, no solution exists
            if len(domains[xi]) == 0:
                return False, domains

            # Add all arcs (xk, xi) where xk != xi and xk != xj
            for xk in variables:
                if xk != xi and xk != xj:
                    queue.append((xk, xi))

    return True, domains

# Test with N-Queens
def queens_constraint(col1, row1, col2, row2):
    """Two queens don't attack each other."""
    if row1 == row2:
        return False
    if abs(row1 - row2) == abs(col1 - col2):
        return False
    return True

# 4-Queens
n = 4
variables = list(range(n))
domains = {i: list(range(n)) for i in range(n)}

print("Initial domains:", domains)

consistent, new_domains = ac3(variables, domains, queens_constraint)

print(f"Arc consistent: {consistent}")
print("Reduced domains:", new_domains)

# Now use backtracking with reduced domains
from topic4_backtracking import backtracking_search

if consistent:
    solution = backtracking_search(variables, new_domains, queens_constraint)
    print("Solution:", solution)

    if solution:
        for row in range(n):
            line = ""
            for col in range(n):
                if solution[col] == row:
                    line += "Q "
                else:
                    line += ". "
            print(line)

# Test with graph coloring
print("\\n--- Graph Coloring Test ---")

# Graph: nodes and edges
nodes = ['A', 'B', 'C', 'D']
edges = [('A', 'B'), ('A', 'C'), ('B', 'C'), ('B', 'D'), ('C', 'D')]
colors = ['red', 'green', 'blue']

domains_coloring = {node: colors[:] for node in nodes}

def coloring_constraint(n1, c1, n2, c2):
    """Adjacent nodes must have different colors."""
    # Check if nodes are adjacent
    if (n1, n2) in edges or (n2, n1) in edges:
        return c1 != c2
    return True

consistent, new_domains = ac3(nodes, domains_coloring, coloring_constraint)
print(f"Coloring arc consistent: {consistent}")
print("Reduced domains:", new_domains)`  ,
    testCases: [
      { input: 'ac3(variables, domains, queens_constraint)', isHidden: false, description: 'Test AC-3 reduces domains for N-Queens' },
      { input: 'revise(xi, xj, domains, constraints)', isHidden: false, description: 'Test revise removes inconsistent values' },
      { input: 'ac3 with graph coloring', isHidden: false, description: 'Test AC-3 with different constraint type' }
    ],
    hints: [
      'Revise removes values from xi\'s domain that have no supporting value in xj\'s domain',
      'When a domain is revised, add all arcs (xk, xi) back to the queue to propagate changes',
      'Return False immediately if any domain becomes empty (no solution exists)'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t4-ex03',
    subjectId: 'cs406',
    topicId: 'cs406-topic-4',
    title: 'CSP with MRV and Forward Checking',
    difficulty: 3,
    description: `Enhance backtracking with Minimum Remaining Values heuristic and forward checking.

Your implementation should:
- Use MRV to select variables (most constrained first)
- Use forward checking to prune domains after each assignment
- Track inference made during search
- Restore domains when backtracking`,
    starterCode: `def select_unassigned_variable_mrv(variables, assignment, domains):
    # Select variable with minimum remaining values
    pass

def forward_check(var, value, assignment, domains, constraints):
    # Check consistency and prune domains
    # Return: (consistent, inferences)
    pass

def backtracking_mrv_fc(variables, domains, constraints):
    # Backtracking with MRV and forward checking
    pass`,
    solution: `def select_unassigned_variable_mrv(variables, assignment, domains):
    """Select unassigned variable with minimum remaining values (MRV)."""
    unassigned = [v for v in variables if v not in assignment]

    if not unassigned:
        return None

    # Select variable with smallest domain
    return min(unassigned, key=lambda var: len(domains[var]))

def forward_check(var, value, assignment, domains, constraints):
    """
    Perform forward checking after assigning var = value.
    Returns: (consistent, inferences) where inferences = {var: [removed_values]}
    """
    inferences = {}

    for other_var in domains:
        if other_var == var or other_var in assignment:
            continue

        removed = []

        for other_value in list(domains[other_var]):
            if not constraints(var, value, other_var, other_value):
                removed.append(other_value)
                domains[other_var].remove(other_value)

        if removed:
            inferences[other_var] = removed

        # If domain becomes empty, inconsistent
        if len(domains[other_var]) == 0:
            return False, inferences

    return True, inferences

def restore_domains(domains, inferences):
    """Restore domains by adding back inferred removals."""
    for var, removed_values in inferences.items():
        domains[var].extend(removed_values)

def backtracking_mrv_fc(variables, domains, constraints, assignment=None, stats=None):
    """
    Backtracking with MRV variable selection and forward checking.
    Returns: complete assignment or None
    """
    if stats is None:
        stats = {'nodes': 0, 'backtracks': 0}

    if assignment is None:
        assignment = {}

    stats['nodes'] += 1

    # Check if assignment is complete
    if len(assignment) == len(variables):
        return assignment

    # Select variable using MRV
    var = select_unassigned_variable_mrv(variables, assignment, domains)

    if var is None:
        return assignment

    # Try each value in domain (could add LCV here)
    for value in list(domains[var]):
        # Check consistency
        consistent = True
        for assigned_var, assigned_value in assignment.items():
            if not constraints(var, value, assigned_var, assigned_value):
                consistent = False
                break

        if consistent:
            assignment[var] = value

            # Save domain state
            old_domain = domains[var]
            domains[var] = [value]

            # Forward checking
            fc_consistent, inferences = forward_check(var, value, assignment, domains, constraints)

            if fc_consistent:
                result = backtracking_mrv_fc(variables, domains, constraints, assignment, stats)

                if result is not None:
                    return result

            # Backtrack
            stats['backtracks'] += 1
            del assignment[var]
            domains[var] = old_domain
            restore_domains(domains, inferences)

    return None

# Test with 8-Queens
def queens_constraint(col1, row1, col2, row2):
    if row1 == row2:
        return False
    if abs(row1 - row2) == abs(col1 - col2):
        return False
    return True

n = 8
variables = list(range(n))
domains = {i: list(range(n)) for i in range(n)}

stats = {'nodes': 0, 'backtracks': 0}
solution = backtracking_mrv_fc(variables, domains, queens_constraint, stats=stats)

print(f"8-Queens solution found: {solution is not None}")
print(f"Nodes explored: {stats['nodes']}")
print(f"Backtracks: {stats['backtracks']}")

if solution:
    print("\\nSolution:")
    for row in range(n):
        line = ""
        for col in range(n):
            if solution[col] == row:
                line += "Q "
            else:
                line += ". "
        print(line)

# Compare with basic backtracking
from topic4_backtracking import backtracking_search

domains_basic = {i: list(range(n)) for i in range(n)}
stats_basic = {'nodes': 0}

def backtracking_with_stats(variables, domains, constraints, assignment=None, stats=None):
    if assignment is None:
        assignment = {}
    stats['nodes'] += 1
    if len(assignment) == len(variables):
        return assignment
    unassigned = [v for v in variables if v not in assignment]
    var = unassigned[0]
    for value in domains[var]:
        consistent = True
        for av, aval in assignment.items():
            if not constraints(var, value, av, aval):
                consistent = False
                break
        if consistent:
            assignment[var] = value
            result = backtracking_with_stats(variables, domains, constraints, assignment, stats)
            if result is not None:
                return result
            del assignment[var]
    return None

solution_basic = backtracking_with_stats(variables, domains_basic, queens_constraint, stats=stats_basic)
print(f"\\nBasic backtracking nodes: {stats_basic['nodes']}")
print(f"MRV+FC improvement: {100 * (1 - stats['nodes'] / stats_basic['nodes']):.1f}% fewer nodes")`  ,
    testCases: [
      { input: 'backtracking_mrv_fc(variables, domains, queens_constraint)', isHidden: false, description: 'Test MRV+FC solves 8-Queens' },
      { input: 'select_unassigned_variable_mrv(variables, assignment, domains)', isHidden: false, description: 'Test MRV selects most constrained variable' },
      { input: 'forward_check(var, value, assignment, domains, constraints)', isHidden: false, description: 'Test forward checking prunes domains' }
    ],
    hints: [
      'MRV heuristic: select the variable with the smallest remaining domain (most constrained)',
      'Forward checking: after assigning a variable, remove inconsistent values from neighbors\' domains',
      'Remember to restore domains when backtracking by adding back removed values'
    ],
    language: 'python'
  }
];
