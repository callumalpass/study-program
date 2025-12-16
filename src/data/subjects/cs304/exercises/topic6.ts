import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'cs304-t6-ex01',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Constant Folding',
    difficulty: 1,
    description: 'Implement constant folding optimization that evaluates constant expressions at compile time.',
    starterCode: `class ConstantFolder:
    def fold(self, expr):
        """
        Fold constant expressions.
        expr: dict with 'op' and 'left'/'right', or 'value' for constants
        Returns: simplified expression
        """
        # TODO: Implement constant folding
        pass

# Example: {'op': '+', 'left': {'value': 5}, 'right': {'value': 3}} -> {'value': 8}`,
    solution: `class ConstantFolder:
    def fold(self, expr):
        """
        Fold constant expressions.
        expr: dict with 'op' and 'left'/'right', or 'value' for constants
        Returns: simplified expression
        """
        # Base case: already a constant
        if 'value' in expr:
            return expr

        # Recursively fold subexpressions
        left = self.fold(expr['left'])
        right = self.fold(expr['right'])

        # If both operands are constants, evaluate
        if 'value' in left and 'value' in right:
            left_val = left['value']
            right_val = right['value']

            if expr['op'] == '+':
                return {'value': left_val + right_val}
            elif expr['op'] == '-':
                return {'value': left_val - right_val}
            elif expr['op'] == '*':
                return {'value': left_val * right_val}
            elif expr['op'] == '/':
                if right_val != 0:
                    return {'value': left_val // right_val}

        # Cannot fold - return expression with folded subexpressions
        return {'op': expr['op'], 'left': left, 'right': right}`,
    testCases: [
      {
        input: `folder = ConstantFolder()
result = folder.fold({'op': '+', 'left': {'value': 5}, 'right': {'value': 3}})
print(result['value'])`,
        expectedOutput: '8',
        isHidden: false,
        description: 'Simple addition folding'
      },
      {
        input: `folder = ConstantFolder()
result = folder.fold({'op': '*', 'left': {'op': '+', 'left': {'value': 2}, 'right': {'value': 3}}, 'right': {'value': 4}})
print(result['value'])`,
        expectedOutput: '20',
        isHidden: false,
        description: 'Nested expression (2 + 3) * 4'
      },
      {
        input: `folder = ConstantFolder()
result = folder.fold({'op': '+', 'left': {'value': 10}, 'right': {'var': 'x'}})
print('op' in result)`,
        isHidden: true,
        description: 'Cannot fold with variable operand'
      }
    ],
    hints: [
      'Recursively fold left and right subexpressions first',
      'Check if both operands are constants after folding',
      'If both are constants, evaluate the operation',
      'Return the folded subexpressions if they cannot be completely evaluated'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex02',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Constant Propagation',
    difficulty: 2,
    description: 'Implement constant propagation that tracks constant values of variables and substitutes them in expressions.',
    starterCode: `class ConstantPropagator:
    def __init__(self):
        self.constants = {}  # variable -> constant value

    def propagate(self, statements):
        """
        Propagate constants through statements.
        statements: list of (var, expr) tuples
        Returns: list of optimized statements
        """
        # TODO: Implement constant propagation
        pass`,
    solution: `class ConstantPropagator:
    def __init__(self):
        self.constants = {}  # variable -> constant value

    def evaluate(self, expr):
        """Evaluate expression using known constants."""
        if isinstance(expr, int):
            return expr

        if isinstance(expr, str):
            # Variable reference
            if expr in self.constants:
                return self.constants[expr]
            return expr

        if isinstance(expr, dict):
            if 'value' in expr:
                return expr['value']

            if 'var' in expr:
                var = expr['var']
                if var in self.constants:
                    return self.constants[var]
                return expr

            # Binary operation
            if 'op' in expr:
                left = self.evaluate(expr['left'])
                right = self.evaluate(expr['right'])

                # If both are constants, evaluate
                if isinstance(left, int) and isinstance(right, int):
                    if expr['op'] == '+':
                        return left + right
                    elif expr['op'] == '-':
                        return left - right
                    elif expr['op'] == '*':
                        return left * right
                    elif expr['op'] == '/':
                        return left // right if right != 0 else expr

                return {'op': expr['op'], 'left': left, 'right': right}

        return expr

    def propagate(self, statements):
        """
        Propagate constants through statements.
        statements: list of (var, expr) tuples
        Returns: list of optimized statements
        """
        optimized = []

        for var, expr in statements:
            # Evaluate expression with known constants
            result = self.evaluate(expr)

            # If result is a constant, record it
            if isinstance(result, int):
                self.constants[var] = result

            optimized.append((var, result))

        return optimized`,
    testCases: [
      {
        input: `prop = ConstantPropagator()
stmts = [('x', 5), ('y', {'op': '+', 'left': {'var': 'x'}, 'right': 3})]
result = prop.propagate(stmts)
print(result[1][1])`,
        expectedOutput: '8',
        isHidden: false,
        description: 'Propagate x=5 into y=x+3'
      },
      {
        input: `prop = ConstantPropagator()
stmts = [('a', 10), ('b', 20), ('c', {'op': '*', 'left': {'var': 'a'}, 'right': {'var': 'b'}})]
result = prop.propagate(stmts)
print(result[2][1])`,
        expectedOutput: '200',
        isHidden: false,
        description: 'Propagate both operands'
      },
      {
        input: `prop = ConstantPropagator()
stmts = [('x', 5), ('y', {'var': 'x'}), ('z', {'op': '+', 'left': {'var': 'y'}, 'right': 1})]
result = prop.propagate(stmts)
print(result[2][1])`,
        isHidden: true,
        description: 'Transitive propagation'
      }
    ],
    hints: [
      'Maintain a map of variables to their constant values',
      'When evaluating expressions, substitute known constant values',
      'Update the constant map when a variable is assigned a constant',
      'Recursively evaluate nested expressions'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex03',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Dead Code Elimination',
    difficulty: 2,
    description: 'Implement dead code elimination that removes assignments to variables that are never used.',
    starterCode: `class DeadCodeEliminator:
    def eliminate(self, statements):
        """
        Remove dead code (assignments to unused variables).
        statements: list of (var, expr) tuples
        Returns: list of statements with dead code removed
        """
        # TODO: Implement dead code elimination
        # Hint: Work backwards to track which variables are used
        pass`,
    solution: `class DeadCodeEliminator:
    def get_used_vars(self, expr):
        """Extract variables used in an expression."""
        if isinstance(expr, str):
            return {expr}

        if isinstance(expr, int):
            return set()

        if isinstance(expr, dict):
            if 'var' in expr:
                return {expr['var']}

            if 'value' in expr:
                return set()

            if 'op' in expr:
                left_vars = self.get_used_vars(expr['left'])
                right_vars = self.get_used_vars(expr['right'])
                return left_vars | right_vars

        return set()

    def eliminate(self, statements):
        """
        Remove dead code (assignments to unused variables).
        statements: list of (var, expr) tuples
        Returns: list of statements with dead code removed
        """
        # First pass: collect all used variables (working backwards)
        live = set()
        used_in = {}  # var -> set of variables it uses

        for var, expr in statements:
            used_vars = self.get_used_vars(expr)
            used_in[var] = used_vars

        # Mark variables as live if they're used in live variables
        # Start by assuming last statement is live
        if statements:
            live.add(statements[-1][0])

        # Work backwards
        changed = True
        while changed:
            changed = False
            for var, expr in reversed(statements):
                if var in live:
                    # This variable is live, so variables it uses are live
                    for used_var in used_in.get(var, []):
                        if used_var not in live:
                            live.add(used_var)
                            changed = True

        # Second pass: keep only live statements
        result = []
        for var, expr in statements:
            if var in live or not isinstance(expr, (int, dict)):
                result.append((var, expr))

        return result`,
    testCases: [
      {
        input: `elim = DeadCodeEliminator()
stmts = [('x', 5), ('y', 10), ('z', {'op': '+', 'left': {'var': 'x'}, 'right': 3})]
result = elim.eliminate(stmts)
print(len(result))`,
        expectedOutput: '2',
        isHidden: false,
        description: 'Remove unused y assignment'
      },
      {
        input: `elim = DeadCodeEliminator()
stmts = [('a', 1), ('b', 2), ('c', 3)]
result = elim.eliminate(stmts)
print(len(result))`,
        expectedOutput: '1',
        isHidden: false,
        description: 'Keep only last assignment'
      },
      {
        input: `elim = DeadCodeEliminator()
stmts = [('x', 5), ('y', {'var': 'x'}), ('z', {'var': 'y'})]
result = elim.eliminate(stmts)
print(len(result))`,
        isHidden: true,
        description: 'Keep all in use chain'
      }
    ],
    hints: [
      'Work backwards from the end of the statements',
      'Track which variables are live (will be used later)',
      'A variable is live if it appears in the expression of a live variable',
      'Remove assignments to variables that are never live'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex04',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Common Subexpression Elimination',
    difficulty: 3,
    description: 'Implement CSE to identify and eliminate redundant computations by reusing previously computed values.',
    starterCode: `class CSE:
    def __init__(self):
        self.expressions = {}  # expr_str -> variable holding result
        self.temp_count = 0

    def expr_to_string(self, expr):
        """Convert expression to canonical string form."""
        # TODO: Implement expression serialization
        pass

    def eliminate(self, statements):
        """
        Eliminate common subexpressions.
        statements: list of (var, expr) tuples
        Returns: optimized statements
        """
        # TODO: Implement CSE
        pass`,
    solution: `class CSE:
    def __init__(self):
        self.expressions = {}  # expr_str -> variable holding result
        self.temp_count = 0

    def expr_to_string(self, expr):
        """Convert expression to canonical string form."""
        if isinstance(expr, int):
            return str(expr)

        if isinstance(expr, str):
            return expr

        if isinstance(expr, dict):
            if 'value' in expr:
                return str(expr['value'])

            if 'var' in expr:
                return expr['var']

            if 'op' in expr:
                left_str = self.expr_to_string(expr['left'])
                right_str = self.expr_to_string(expr['right'])
                # Canonical form for commutative operators
                if expr['op'] in ['+', '*']:
                    left_str, right_str = sorted([left_str, right_str])
                return f"({left_str} {expr['op']} {right_str})"

        return str(expr)

    def eliminate(self, statements):
        """
        Eliminate common subexpressions.
        statements: list of (var, expr) tuples
        Returns: optimized statements
        """
        optimized = []

        for var, expr in statements:
            # Only eliminate non-trivial expressions
            if isinstance(expr, dict) and 'op' in expr:
                expr_str = self.expr_to_string(expr)

                if expr_str in self.expressions:
                    # Reuse previous computation
                    prev_var = self.expressions[expr_str]
                    optimized.append((var, {'var': prev_var}))
                else:
                    # New expression - compute and record it
                    self.expressions[expr_str] = var
                    optimized.append((var, expr))
            else:
                optimized.append((var, expr))

                # If assigning a simple value, invalidate expressions using old value of var
                # For simplicity, we'll just add the statement
                # In practice, would need to track which expressions are invalidated

        return optimized`,
    testCases: [
      {
        input: `cse = CSE()
stmts = [
    ('t1', {'op': '+', 'left': {'var': 'a'}, 'right': {'var': 'b'}}),
    ('t2', {'op': '+', 'left': {'var': 'a'}, 'right': {'var': 'b'}})
]
result = cse.eliminate(stmts)
print(result[1][1])`,
        expectedOutput: "{'var': 't1'}",
        isHidden: false,
        description: 'Eliminate duplicate a+b'
      },
      {
        input: `cse = CSE()
stmts = [
    ('t1', {'op': '*', 'left': {'var': 'x'}, 'right': {'value': 2}}),
    ('t2', {'op': '+', 'left': {'var': 't1'}, 'right': 1}),
    ('t3', {'op': '*', 'left': {'var': 'x'}, 'right': {'value': 2}})
]
result = cse.eliminate(stmts)
print(result[2][1])`,
        expectedOutput: "{'var': 't1'}",
        isHidden: false,
        description: 'Reuse x*2 computation'
      },
      {
        input: `cse = CSE()
stmts = [
    ('t1', {'op': '+', 'left': {'var': 'a'}, 'right': {'var': 'b'}}),
    ('t2', {'op': '+', 'left': {'var': 'b'}, 'right': {'var': 'a'}})
]
result = cse.eliminate(stmts)
print(result[1][1])`,
        isHidden: true,
        description: 'Commutative operation a+b = b+a'
      }
    ],
    hints: [
      'Convert expressions to a canonical string representation',
      'For commutative operators (+, *), sort operands to ensure a+b and b+a match',
      'Maintain a map from expression strings to variables holding their results',
      'Replace duplicate expressions with references to the first computation'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex05',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Copy Propagation',
    difficulty: 2,
    description: 'Implement copy propagation that replaces uses of a variable with its copied value.',
    starterCode: `class CopyPropagator:
    def __init__(self):
        self.copies = {}  # variable -> variable it copies

    def propagate(self, statements):
        """
        Propagate copies through statements.
        statements: list of (var, expr) tuples
        Returns: optimized statements
        """
        # TODO: Implement copy propagation
        pass`,
    solution: `class CopyPropagator:
    def __init__(self):
        self.copies = {}  # variable -> variable it copies

    def substitute(self, expr):
        """Substitute variables with their copied values."""
        if isinstance(expr, str):
            # Variable reference
            if expr in self.copies:
                return self.substitute(self.copies[expr])
            return expr

        if isinstance(expr, int):
            return expr

        if isinstance(expr, dict):
            if 'var' in expr:
                var = expr['var']
                if var in self.copies:
                    return {'var': self.substitute(self.copies[var])}
                return expr

            if 'value' in expr:
                return expr

            if 'op' in expr:
                left = self.substitute(expr['left'])
                right = self.substitute(expr['right'])
                return {'op': expr['op'], 'left': left, 'right': right}

        return expr

    def propagate(self, statements):
        """
        Propagate copies through statements.
        statements: list of (var, expr) tuples
        Returns: optimized statements
        """
        optimized = []

        for var, expr in statements:
            # Substitute in the expression
            new_expr = self.substitute(expr)

            # Check if this is a copy assignment
            if isinstance(new_expr, dict) and 'var' in new_expr:
                # Record the copy
                self.copies[var] = new_expr['var']

            # If variable is redefined, it's no longer a copy
            if var in self.copies and not (isinstance(new_expr, dict) and 'var' in new_expr):
                del self.copies[var]

            optimized.append((var, new_expr))

        return optimized`,
    testCases: [
      {
        input: `prop = CopyPropagator()
stmts = [('x', 5), ('y', {'var': 'x'}), ('z', {'op': '+', 'left': {'var': 'y'}, 'right': 1})]
result = prop.propagate(stmts)
print(result[2][1]['left']['var'])`,
        expectedOutput: 'x',
        isHidden: false,
        description: 'Propagate y=x, replace y with x'
      },
      {
        input: `prop = CopyPropagator()
stmts = [('a', {'var': 'b'}), ('c', {'var': 'a'}), ('d', {'var': 'c'})]
result = prop.propagate(stmts)
print(result[2][1]['var'])`,
        expectedOutput: 'b',
        isHidden: false,
        description: 'Transitive copy propagation'
      },
      {
        input: `prop = CopyPropagator()
stmts = [('x', {'var': 'y'}), ('x', 10), ('z', {'var': 'x'})]
result = prop.propagate(stmts)
print(result[2][1])`,
        isHidden: true,
        description: 'Copy invalidated by reassignment'
      }
    ],
    hints: [
      'Track which variables are copies of other variables',
      'When substituting, follow the chain of copies transitively',
      'Replace uses of copy variables with the original variable',
      'Invalidate copy information when a variable is reassigned'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex06',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Reaching Definitions Analysis',
    difficulty: 3,
    description: 'Implement reaching definitions data flow analysis to determine which definitions reach each program point.',
    starterCode: `class ReachingDefinitions:
    def __init__(self):
        self.definitions = {}  # variable -> list of definition points

    def analyze(self, statements):
        """
        Compute reaching definitions for each statement.
        statements: list of (var, expr) tuples
        Returns: dict mapping line_number -> set of (var, def_line) reaching that point
        """
        # TODO: Implement reaching definitions analysis
        pass`,
    solution: `class ReachingDefinitions:
    def __init__(self):
        self.definitions = {}  # variable -> list of definition points

    def analyze(self, statements):
        """
        Compute reaching definitions for each statement.
        statements: list of (var, expr) tuples
        Returns: dict mapping line_number -> set of (var, def_line) reaching that point
        """
        reaching = {}  # line -> set of (var, def_line)

        # Initialize: no definitions reach the start
        reaching[0] = set()

        # Process each statement
        for i, (var, expr) in enumerate(statements):
            # Definitions reaching this point are those from previous point
            if i == 0:
                reaching[i] = set()
            else:
                reaching[i] = reaching[i - 1].copy()

            # This statement kills previous definitions of var
            reaching[i] = {(v, line) for v, line in reaching[i] if v != var}

            # This statement generates a new definition of var
            reaching[i].add((var, i))

            # Propagate to next statement
            if i + 1 not in reaching:
                reaching[i + 1] = set()

        return reaching`,
    testCases: [
      {
        input: `rd = ReachingDefinitions()
stmts = [('x', 1), ('y', 2), ('x', 3)]
result = rd.analyze(stmts)
defs = result[2]
x_defs = [line for var, line in defs if var == 'x']
print(x_defs[0])`,
        expectedOutput: '2',
        isHidden: false,
        description: 'Second definition of x kills first'
      },
      {
        input: `rd = ReachingDefinitions()
stmts = [('a', 1), ('b', 2)]
result = rd.analyze(stmts)
print(len(result[2]))`,
        expectedOutput: '2',
        isHidden: false,
        description: 'Both definitions reach end'
      },
      {
        input: `rd = ReachingDefinitions()
stmts = [('x', 5), ('y', {'var': 'x'}), ('x', 10)]
result = rd.analyze(stmts)
x_defs = [line for var, line in result[3] if var == 'x']
print(x_defs[0])`,
        isHidden: true,
        description: 'Most recent x definition reaches end'
      }
    ],
    hints: [
      'At each program point, track which definitions are live',
      'A new definition of a variable kills previous definitions of that variable',
      'Propagate reaching definitions forward through the program',
      'Each definition is identified by (variable, line_number) pair'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex07',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Live Variable Analysis',
    difficulty: 3,
    description: 'Implement live variable analysis to determine which variables are live (will be used in the future) at each program point.',
    starterCode: `class LiveVariableAnalysis:
    def get_uses(self, expr):
        """Get variables used in an expression."""
        # TODO: Extract variables from expression
        pass

    def analyze(self, statements):
        """
        Compute live variables at each program point.
        statements: list of (var, expr) tuples
        Returns: dict mapping line_number -> set of live variables
        """
        # TODO: Implement backward data flow analysis
        pass`,
    solution: `class LiveVariableAnalysis:
    def get_uses(self, expr):
        """Get variables used in an expression."""
        if isinstance(expr, str):
            return {expr}

        if isinstance(expr, int):
            return set()

        if isinstance(expr, dict):
            if 'var' in expr:
                return {expr['var']}

            if 'value' in expr:
                return set()

            if 'op' in expr:
                left_uses = self.get_uses(expr['left'])
                right_uses = self.get_uses(expr['right'])
                return left_uses | right_uses

        return set()

    def analyze(self, statements):
        """
        Compute live variables at each program point.
        statements: list of (var, expr) tuples
        Returns: dict mapping line_number -> set of live variables
        """
        n = len(statements)
        live = {}

        # Initialize: nothing is live after the last statement
        for i in range(n + 1):
            live[i] = set()

        # Iterate backwards until fixed point
        changed = True
        while changed:
            changed = False
            for i in range(n - 1, -1, -1):
                var, expr = statements[i]

                # live_out[i] = live_in[i+1]
                old_live = live[i].copy()

                # live_in[i] = (live_out[i] - {var}) ∪ uses(expr)
                live[i] = live[i + 1].copy()
                live[i].discard(var)  # var is defined here
                live[i].update(self.get_uses(expr))  # variables used here

                if live[i] != old_live:
                    changed = True

        return live`,
    testCases: [
      {
        input: `lva = LiveVariableAnalysis()
stmts = [('x', 5), ('y', {'var': 'x'})]
result = lva.analyze(stmts)
print('x' in result[0])`,
        expectedOutput: 'True',
        isHidden: false,
        description: 'x is live at start (used later)'
      },
      {
        input: `lva = LiveVariableAnalysis()
stmts = [('a', 1), ('b', 2), ('c', {'var': 'a'})]
result = lva.analyze(stmts)
print('b' in result[3])`,
        expectedOutput: 'False',
        isHidden: false,
        description: 'b is not live at end (not used after definition)'
      },
      {
        input: `lva = LiveVariableAnalysis()
stmts = [('x', 5), ('x', 10), ('y', {'var': 'x'})]
result = lva.analyze(stmts)
print('x' in result[0])`,
        isHidden: true,
        description: 'First x is not live (overwritten before use)'
      }
    ],
    hints: [
      'Work backwards from the end of the program',
      'A variable is live if it will be used before being redefined',
      'At each point: live = (live_after - defined) ∪ used',
      'Iterate until the live sets stop changing (fixed point)'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex08',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Strength Reduction',
    difficulty: 3,
    description: 'Implement strength reduction to replace expensive operations (multiplication, division) with cheaper ones (addition, shifts).',
    starterCode: `class StrengthReducer:
    def reduce(self, expr):
        """
        Apply strength reduction to expressions.
        - Replace multiplication by power of 2 with left shift
        - Replace division by power of 2 with right shift
        - Replace x * 1 with x, x * 0 with 0
        """
        # TODO: Implement strength reduction
        pass`,
    solution: `class StrengthReducer:
    def is_power_of_2(self, n):
        """Check if n is a power of 2."""
        return n > 0 and (n & (n - 1)) == 0

    def log2(self, n):
        """Compute log base 2 of n (assumes n is power of 2)."""
        count = 0
        while n > 1:
            n >>= 1
            count += 1
        return count

    def reduce(self, expr):
        """
        Apply strength reduction to expressions.
        - Replace multiplication by power of 2 with left shift
        - Replace division by power of 2 with right shift
        - Replace x * 1 with x, x * 0 with 0
        """
        if not isinstance(expr, dict) or 'op' not in expr:
            return expr

        # Recursively reduce subexpressions
        left = self.reduce(expr['left'])
        right = self.reduce(expr['right'])

        op = expr['op']

        # Get constant value if right operand is constant
        right_val = None
        if isinstance(right, dict) and 'value' in right:
            right_val = right['value']
        elif isinstance(right, int):
            right_val = right

        # Multiplication optimizations
        if op == '*':
            if right_val == 0:
                return {'value': 0}
            elif right_val == 1:
                return left
            elif right_val is not None and self.is_power_of_2(right_val):
                # Replace with left shift
                shift = self.log2(right_val)
                return {'op': '<<', 'left': left, 'right': {'value': shift}}

        # Division optimizations
        elif op == '/':
            if right_val == 1:
                return left
            elif right_val is not None and self.is_power_of_2(right_val):
                # Replace with right shift
                shift = self.log2(right_val)
                return {'op': '>>', 'left': left, 'right': {'value': shift}}

        return {'op': op, 'left': left, 'right': right}`,
    testCases: [
      {
        input: `reducer = StrengthReducer()
expr = {'op': '*', 'left': {'var': 'x'}, 'right': {'value': 8}}
result = reducer.reduce(expr)
print(result['op'])`,
        expectedOutput: '<<',
        isHidden: false,
        description: 'x * 8 becomes x << 3'
      },
      {
        input: `reducer = StrengthReducer()
expr = {'op': '*', 'left': {'var': 'x'}, 'right': {'value': 1}}
result = reducer.reduce(expr)
print(result)`,
        expectedOutput: "{'var': 'x'}",
        isHidden: false,
        description: 'x * 1 becomes x'
      },
      {
        input: `reducer = StrengthReducer()
expr = {'op': '/', 'left': {'var': 'y'}, 'right': {'value': 16}}
result = reducer.reduce(expr)
print(result['right']['value'])`,
        isHidden: true,
        description: 'y / 16 becomes y >> 4'
      }
    ],
    hints: [
      'Check if multiplier/divisor is a power of 2',
      'Multiplication by 2^n can be replaced with left shift by n',
      'Division by 2^n can be replaced with right shift by n',
      'Handle identity cases: x * 1 = x, x * 0 = 0'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex09',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Loop Invariant Code Motion',
    difficulty: 4,
    description: 'Implement loop invariant code motion to move computations that don\'t change in a loop outside the loop.',
    starterCode: `class LoopInvariantMotion:
    def __init__(self):
        self.loop_vars = set()  # Variables modified in loop

    def is_invariant(self, expr, loop_vars):
        """Check if expression is loop invariant."""
        # TODO: Determine if expr depends only on non-loop variables
        pass

    def hoist(self, loop_body):
        """
        Move loop-invariant code out of loop.
        loop_body: list of (var, expr) tuples
        Returns: (preheader, new_loop_body)
        """
        # TODO: Implement hoisting
        pass`,
    solution: `class LoopInvariantMotion:
    def __init__(self):
        self.loop_vars = set()  # Variables modified in loop

    def get_vars(self, expr):
        """Get all variables used in an expression."""
        if isinstance(expr, str):
            return {expr}

        if isinstance(expr, int):
            return set()

        if isinstance(expr, dict):
            if 'var' in expr:
                return {expr['var']}

            if 'value' in expr:
                return set()

            if 'op' in expr:
                left_vars = self.get_vars(expr['left'])
                right_vars = self.get_vars(expr['right'])
                return left_vars | right_vars

        return set()

    def is_invariant(self, expr, loop_vars):
        """Check if expression is loop invariant."""
        # Get all variables used in expression
        used_vars = self.get_vars(expr)

        # Invariant if no loop-modified variables are used
        return len(used_vars & loop_vars) == 0

    def hoist(self, loop_body):
        """
        Move loop-invariant code out of loop.
        loop_body: list of (var, expr) tuples
        Returns: (preheader, new_loop_body)
        """
        # First pass: identify variables modified in loop
        loop_vars = set()
        for var, expr in loop_body:
            loop_vars.add(var)

        # Second pass: identify invariant statements
        preheader = []
        new_body = []

        for var, expr in loop_body:
            if self.is_invariant(expr, loop_vars) and isinstance(expr, dict):
                # This is invariant - hoist it
                preheader.append((var, expr))
            else:
                # Keep in loop
                new_body.append((var, expr))

        return preheader, new_body`,
    testCases: [
      {
        input: `lim = LoopInvariantMotion()
loop = [('x', {'op': '+', 'left': {'var': 'a'}, 'right': {'var': 'b'}}), ('i', {'op': '+', 'left': {'var': 'i'}, 'right': 1})]
preheader, body = lim.hoist(loop)
print(len(preheader))`,
        expectedOutput: '1',
        isHidden: false,
        description: 'Hoist a+b (invariant)'
      },
      {
        input: `lim = LoopInvariantMotion()
loop = [('x', {'op': '*', 'left': {'var': 'i'}, 'right': 2}), ('i', {'op': '+', 'left': {'var': 'i'}, 'right': 1})]
preheader, body = lim.hoist(loop)
print(len(preheader))`,
        expectedOutput: '0',
        isHidden: false,
        description: 'Cannot hoist i*2 (i is modified)'
      },
      {
        input: `lim = LoopInvariantMotion()
loop = [('y', {'op': '+', 'left': {'value': 5}, 'right': {'value': 3}}), ('z', {'var': 'y'})]
preheader, body = lim.hoist(loop)
print(len(preheader))`,
        isHidden: true,
        description: 'Hoist constant expression'
      }
    ],
    hints: [
      'First identify all variables that are modified in the loop',
      'An expression is invariant if it uses only non-loop variables',
      'Hoist invariant computations to a preheader before the loop',
      'Be careful with dependencies: hoisted code should not use loop variables'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex10',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Induction Variable Elimination',
    difficulty: 4,
    description: 'Identify and optimize induction variables in loops by replacing derived induction variables with computations based on the basic induction variable.',
    starterCode: `class InductionVariableOptimizer:
    def find_basic_induction_vars(self, loop_body):
        """
        Find basic induction variables (vars of form i = i + c).
        Returns dict: var -> increment
        """
        # TODO: Identify basic induction variables
        pass

    def optimize(self, loop_body):
        """
        Optimize induction variables.
        Replace j = c1 * i + c2 with incremental updates.
        """
        # TODO: Implement induction variable optimization
        pass`,
    solution: `class InductionVariableOptimizer:
    def find_basic_induction_vars(self, loop_body):
        """
        Find basic induction variables (vars of form i = i + c).
        Returns dict: var -> increment
        """
        basic_ivs = {}

        for var, expr in loop_body:
            if isinstance(expr, dict) and expr.get('op') == '+':
                left = expr['left']
                right = expr['right']

                # Check for i = i + c
                if isinstance(left, dict) and left.get('var') == var:
                    if isinstance(right, dict) and 'value' in right:
                        basic_ivs[var] = right['value']
                    elif isinstance(right, int):
                        basic_ivs[var] = right

        return basic_ivs

    def optimize(self, loop_body):
        """
        Optimize induction variables.
        Replace j = c1 * i + c2 with incremental updates.
        """
        # Find basic induction variables
        basic_ivs = self.find_basic_induction_vars(loop_body)

        optimized = []

        for var, expr in loop_body:
            # Check if this is a derived induction variable: j = c * i + d
            if isinstance(expr, dict) and expr.get('op') in ['+', '*']:
                # Simplified check for j = c * i form
                if expr['op'] == '*':
                    left = expr['left']
                    right = expr['right']

                    # Check if multiplying by a basic IV
                    basic_iv = None
                    multiplier = None

                    if isinstance(left, dict) and left.get('var') in basic_ivs:
                        basic_iv = left['var']
                        if isinstance(right, dict) and 'value' in right:
                            multiplier = right['value']

                    if basic_iv and multiplier:
                        # This is a derived IV: j = c * i
                        # Can optimize to: j = j + c * increment_of_i
                        increment = basic_ivs[basic_iv] * multiplier
                        new_expr = {
                            'op': '+',
                            'left': {'var': var},
                            'right': {'value': increment}
                        }
                        optimized.append((var, new_expr))
                        continue

            # Keep statement as-is
            optimized.append((var, expr))

        return optimized`,
    testCases: [
      {
        input: `ivo = InductionVariableOptimizer()
loop = [('i', {'op': '+', 'left': {'var': 'i'}, 'right': {'value': 1}})]
basic = ivo.find_basic_induction_vars(loop)
print(basic['i'])`,
        expectedOutput: '1',
        isHidden: false,
        description: 'Identify basic IV i = i + 1'
      },
      {
        input: `ivo = InductionVariableOptimizer()
loop = [
    ('i', {'op': '+', 'left': {'var': 'i'}, 'right': {'value': 1}}),
    ('j', {'op': '*', 'left': {'var': 'i'}, 'right': {'value': 4}})
]
optimized = ivo.optimize(loop)
print(optimized[1][1]['right']['value'])`,
        expectedOutput: '4',
        isHidden: false,
        description: 'Transform j = i * 4 to j = j + 4'
      },
      {
        input: `ivo = InductionVariableOptimizer()
loop = [
    ('i', {'op': '+', 'left': {'var': 'i'}, 'right': {'value': 2}}),
    ('j', {'op': '*', 'left': {'var': 'i'}, 'right': {'value': 3}})
]
optimized = ivo.optimize(loop)
print(optimized[1][1]['right']['value'])`,
        isHidden: true,
        description: 'j = i * 3 becomes j = j + 6 (since i += 2)'
      }
    ],
    hints: [
      'Basic induction variables have the form i = i + c',
      'Derived induction variables are linear functions of basic IVs',
      'Replace j = c * i with j = j + (c * increment_of_i)',
      'Track the increment value for each basic induction variable'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex11',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Algebraic Simplification',
    difficulty: 2,
    description: 'Implement algebraic simplifications like x + 0 = x, x * 1 = x, x - x = 0, etc.',
    starterCode: `class AlgebraicSimplifier:
    def simplify(self, expr):
        """
        Apply algebraic simplifications.
        - x + 0 = x, 0 + x = x
        - x * 1 = x, 1 * x = x
        - x * 0 = 0, 0 * x = 0
        - x - 0 = x
        - x - x = 0
        """
        # TODO: Implement simplifications
        pass`,
    solution: `class AlgebraicSimplifier:
    def expr_equal(self, e1, e2):
        """Check if two expressions are equal."""
        if isinstance(e1, int) and isinstance(e2, int):
            return e1 == e2

        if isinstance(e1, str) and isinstance(e2, str):
            return e1 == e2

        if isinstance(e1, dict) and isinstance(e2, dict):
            if 'var' in e1 and 'var' in e2:
                return e1['var'] == e2['var']
            if 'value' in e1 and 'value' in e2:
                return e1['value'] == e2['value']

        return False

    def get_value(self, expr):
        """Get constant value if expression is a constant."""
        if isinstance(expr, int):
            return expr
        if isinstance(expr, dict) and 'value' in expr:
            return expr['value']
        return None

    def simplify(self, expr):
        """
        Apply algebraic simplifications.
        - x + 0 = x, 0 + x = x
        - x * 1 = x, 1 * x = x
        - x * 0 = 0, 0 * x = 0
        - x - 0 = x
        - x - x = 0
        """
        if not isinstance(expr, dict) or 'op' not in expr:
            return expr

        # Recursively simplify subexpressions
        left = self.simplify(expr['left'])
        right = self.simplify(expr['right'])

        op = expr['op']
        left_val = self.get_value(left)
        right_val = self.get_value(right)

        # Addition simplifications
        if op == '+':
            if left_val == 0:
                return right
            if right_val == 0:
                return left

        # Subtraction simplifications
        elif op == '-':
            if right_val == 0:
                return left
            if self.expr_equal(left, right):
                return {'value': 0}

        # Multiplication simplifications
        elif op == '*':
            if left_val == 0 or right_val == 0:
                return {'value': 0}
            if left_val == 1:
                return right
            if right_val == 1:
                return left

        # Division simplifications
        elif op == '/':
            if right_val == 1:
                return left

        return {'op': op, 'left': left, 'right': right}`,
    testCases: [
      {
        input: `simp = AlgebraicSimplifier()
result = simp.simplify({'op': '+', 'left': {'var': 'x'}, 'right': {'value': 0}})
print(result)`,
        expectedOutput: "{'var': 'x'}",
        isHidden: false,
        description: 'x + 0 = x'
      },
      {
        input: `simp = AlgebraicSimplifier()
result = simp.simplify({'op': '*', 'left': {'var': 'y'}, 'right': {'value': 1}})
print(result)`,
        expectedOutput: "{'var': 'y'}",
        isHidden: false,
        description: 'y * 1 = y'
      },
      {
        input: `simp = AlgebraicSimplifier()
result = simp.simplify({'op': '-', 'left': {'var': 'z'}, 'right': {'var': 'z'}})
print(result['value'])`,
        isHidden: true,
        description: 'z - z = 0'
      }
    ],
    hints: [
      'Check for identity elements: 0 for addition, 1 for multiplication',
      'Handle both left and right operand positions',
      'For x - x, check if both operands are the same variable',
      'Recursively simplify subexpressions first'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex12',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Available Expressions Analysis',
    difficulty: 3,
    description: 'Implement available expressions analysis to determine which expressions have been computed and are still valid at each program point.',
    starterCode: `class AvailableExpressions:
    def expr_to_str(self, expr):
        """Convert expression to string for comparison."""
        # TODO: Implement
        pass

    def analyze(self, statements):
        """
        Compute available expressions at each program point.
        Returns: dict mapping line_number -> set of available expression strings
        """
        # TODO: Implement forward data flow analysis
        pass`,
    solution: `class AvailableExpressions:
    def expr_to_str(self, expr):
        """Convert expression to string for comparison."""
        if isinstance(expr, int):
            return str(expr)

        if isinstance(expr, str):
            return expr

        if isinstance(expr, dict):
            if 'value' in expr:
                return str(expr['value'])

            if 'var' in expr:
                return expr['var']

            if 'op' in expr:
                left = self.expr_to_str(expr['left'])
                right = self.expr_to_str(expr['right'])
                return f"({left} {expr['op']} {right})"

        return ""

    def get_exprs(self, expr):
        """Get all subexpressions."""
        exprs = set()

        if isinstance(expr, dict) and 'op' in expr:
            expr_str = self.expr_to_str(expr)
            exprs.add(expr_str)

            # Recursively get subexpressions
            exprs.update(self.get_exprs(expr['left']))
            exprs.update(self.get_exprs(expr['right']))

        return exprs

    def analyze(self, statements):
        """
        Compute available expressions at each program point.
        Returns: dict mapping line_number -> set of available expression strings
        """
        n = len(statements)
        available = {}

        # Initialize: no expressions available at start
        for i in range(n + 1):
            available[i] = set()

        # Iterate forward until fixed point
        changed = True
        while changed:
            changed = False

            for i, (var, expr) in enumerate(statements):
                # available_in[i] = available_out[i-1]
                old_available = available[i].copy()

                if i > 0:
                    available[i] = available[i - 1].copy()
                else:
                    available[i] = set()

                # Kill expressions that use the variable being defined
                available[i] = {e for e in available[i] if var not in e}

                # Gen: add new expressions computed here
                new_exprs = self.get_exprs(expr)
                available[i].update(new_exprs)

                # Propagate to next point
                available[i + 1] = available[i].copy()

                if available[i] != old_available:
                    changed = True

        return available`,
    testCases: [
      {
        input: `ae = AvailableExpressions()
stmts = [('t1', {'op': '+', 'left': {'var': 'a'}, 'right': {'var': 'b'}}), ('t2', {'var': 't1'})]
result = ae.analyze(stmts)
print('(a + b)' in result[1])`,
        expectedOutput: 'True',
        isHidden: false,
        description: 'a+b is available after first statement'
      },
      {
        input: `ae = AvailableExpressions()
stmts = [('x', {'op': '+', 'left': {'var': 'a'}, 'right': {'var': 'b'}}), ('a', 10)]
result = ae.analyze(stmts)
print('(a + b)' in result[2])`,
        expectedOutput: 'False',
        isHidden: false,
        description: 'a+b is killed when a is redefined'
      },
      {
        input: `ae = AvailableExpressions()
stmts = [('t1', {'op': '*', 'left': {'var': 'x'}, 'right': {'value': 2}}), ('t2', {'op': '+', 'left': {'var': 't1'}, 'right': 1})]
result = ae.analyze(stmts)
print('(x * 2)' in result[2])`,
        isHidden: true,
        description: 'x*2 remains available'
      }
    ],
    hints: [
      'Work forwards through the program',
      'An expression is available if it has been computed and not invalidated',
      'Kill expressions when any variable they use is redefined',
      'Generate new expressions when they are computed'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex13',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Partial Redundancy Elimination',
    difficulty: 5,
    description: 'Implement partial redundancy elimination to optimize cases where an expression is redundant on some paths but not others.',
    starterCode: `class PartialRedundancyElimination:
    def __init__(self):
        self.anticipated = {}  # Anticipated expressions
        self.available = {}  # Available expressions

    def compute_anticipated(self, cfg):
        """
        Compute anticipated expressions (will be used on all paths).
        cfg: list of basic blocks, each block is list of statements
        """
        # TODO: Backward analysis
        pass

    def eliminate(self, cfg):
        """
        Perform partial redundancy elimination.
        Insert computations at optimal points.
        """
        # TODO: Implement PRE
        pass`,
    solution: `class PartialRedundancyElimination:
    def __init__(self):
        self.anticipated = {}  # Anticipated expressions
        self.available = {}  # Available expressions

    def expr_to_str(self, expr):
        """Convert expression to string."""
        if isinstance(expr, dict) and 'op' in expr:
            left = self.expr_to_str(expr.get('left', ''))
            right = self.expr_to_str(expr.get('right', ''))
            return f"({left} {expr['op']} {right})"
        if isinstance(expr, dict) and 'var' in expr:
            return expr['var']
        if isinstance(expr, dict) and 'value' in expr:
            return str(expr['value'])
        return str(expr)

    def get_exprs(self, block):
        """Get all expressions in a block."""
        exprs = set()
        for var, expr in block:
            if isinstance(expr, dict) and 'op' in expr:
                exprs.add(self.expr_to_str(expr))
        return exprs

    def compute_anticipated(self, cfg):
        """
        Compute anticipated expressions (will be used on all paths).
        cfg: list of basic blocks, each block is list of statements
        Simplified: just check if expression appears in block
        """
        for i, block in enumerate(cfg):
            self.anticipated[i] = self.get_exprs(block)

    def eliminate(self, cfg):
        """
        Perform partial redundancy elimination.
        Insert computations at optimal points.
        Simplified implementation: identify common expressions across blocks
        """
        # Compute anticipated expressions
        self.compute_anticipated(cfg)

        # Find expressions that appear in multiple blocks
        all_exprs = set()
        expr_blocks = {}

        for i, block in enumerate(cfg):
            exprs = self.get_exprs(block)
            all_exprs.update(exprs)

            for expr in exprs:
                if expr not in expr_blocks:
                    expr_blocks[expr] = []
                expr_blocks[expr].append(i)

        # Identify partially redundant expressions (appear in 2+ blocks)
        partially_redundant = {expr: blocks for expr, blocks in expr_blocks.items() if len(blocks) > 1}

        return partially_redundant`,
    testCases: [
      {
        input: `pre = PartialRedundancyElimination()
cfg = [
    [('t1', {'op': '+', 'left': {'var': 'a'}, 'right': {'var': 'b'}})],
    [('t2', {'op': '+', 'left': {'var': 'a'}, 'right': {'var': 'b'}})]
]
result = pre.eliminate(cfg)
print(len(result))`,
        expectedOutput: '1',
        isHidden: false,
        description: 'Find one partially redundant expression'
      },
      {
        input: `pre = PartialRedundancyElimination()
cfg = [
    [('x', 1)],
    [('y', 2)]
]
result = pre.eliminate(cfg)
print(len(result))`,
        expectedOutput: '0',
        isHidden: false,
        description: 'No redundant expressions'
      },
      {
        input: `pre = PartialRedundancyElimination()
cfg = [
    [('t1', {'op': '*', 'left': {'var': 'x'}, 'right': {'value': 2}})],
    [('t2', 5)],
    [('t3', {'op': '*', 'left': {'var': 'x'}, 'right': {'value': 2}})]
]
result = pre.eliminate(cfg)
print('(x * 2)' in result)`,
        isHidden: true,
        description: 'Expression in blocks 0 and 2'
      }
    ],
    hints: [
      'PRE combines anticipation and availability analysis',
      'An expression is partially redundant if it\'s redundant on some paths',
      'Insert computations at optimal points to make expressions fully redundant',
      'This is a simplified version focusing on identifying redundancy'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex14',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Tail Call Optimization',
    difficulty: 3,
    description: 'Implement tail call optimization to convert tail-recursive functions into iterative loops.',
    starterCode: `class TailCallOptimizer:
    def is_tail_call(self, function_body):
        """
        Check if last statement is a recursive call.
        function_body: list of statements, last should be return statement
        """
        # TODO: Check for tail recursion pattern
        pass

    def optimize(self, function_name, function_body):
        """
        Convert tail recursive function to loop.
        Returns optimized function body.
        """
        # TODO: Transform to iterative version
        pass`,
    solution: `class TailCallOptimizer:
    def is_tail_call(self, function_body, function_name):
        """
        Check if last statement is a recursive call.
        function_body: list of statements
        """
        if not function_body:
            return False

        last_stmt = function_body[-1]

        # Check if it's a return statement with a call
        if isinstance(last_stmt, dict) and last_stmt.get('type') == 'return':
            expr = last_stmt.get('value')
            if isinstance(expr, dict) and expr.get('type') == 'call':
                return expr.get('function') == function_name

        return False

    def optimize(self, function_name, params, function_body):
        """
        Convert tail recursive function to loop.
        params: list of parameter names
        function_body: list of statement dicts
        Returns optimized function body.
        """
        if not self.is_tail_call(function_body, function_name):
            return function_body

        # Create loop structure
        optimized = []

        # Add loop start label
        optimized.append({'type': 'label', 'name': 'loop_start'})

        # Transform body: replace return with jump to start and parameter updates
        for stmt in function_body[:-1]:
            optimized.append(stmt)

        # Last statement is the tail call - replace with parameter updates and loop
        last_stmt = function_body[-1]
        if isinstance(last_stmt, dict) and last_stmt.get('type') == 'return':
            call_expr = last_stmt['value']
            if isinstance(call_expr, dict) and call_expr.get('type') == 'call':
                # Update parameters with new arguments
                args = call_expr.get('args', [])
                for i, arg in enumerate(args):
                    if i < len(params):
                        optimized.append({
                            'type': 'assign',
                            'var': params[i],
                            'value': arg
                        })

                # Jump back to loop start
                optimized.append({'type': 'goto', 'label': 'loop_start'})

        return optimized`,
    testCases: [
      {
        input: `tco = TailCallOptimizer()
body = [
    {'type': 'if', 'condition': 'n == 0', 'then': [{'type': 'return', 'value': 1}]},
    {'type': 'return', 'value': {'type': 'call', 'function': 'fact', 'args': ['n-1', 'acc*n']}}
]
is_tail = tco.is_tail_call(body, 'fact')
print(is_tail)`,
        expectedOutput: 'True',
        isHidden: false,
        description: 'Detect tail recursive call'
      },
      {
        input: `tco = TailCallOptimizer()
body = [
    {'type': 'assign', 'var': 'x', 'value': 1},
    {'type': 'return', 'value': {'type': 'call', 'function': 'foo', 'args': ['x']}}
]
optimized = tco.optimize('foo', ['n'], body)
print(optimized[-1]['type'])`,
        expectedOutput: 'goto',
        isHidden: false,
        description: 'Transform to loop with goto'
      },
      {
        input: `tco = TailCallOptimizer()
body = [{'type': 'return', 'value': 'n'}]
optimized = tco.optimize('foo', ['n'], body)
print(len(optimized))`,
        isHidden: true,
        description: 'Non-tail-recursive function unchanged'
      }
    ],
    hints: [
      'A tail call is when the last action is a recursive call',
      'Convert the tail call into a loop that updates parameters and restarts',
      'Replace the return statement with parameter updates and a jump to the start',
      'Add a loop label at the beginning of the function'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex15',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Unreachable Code Elimination',
    difficulty: 2,
    description: 'Implement unreachable code elimination to remove code that can never be executed.',
    starterCode: `class UnreachableCodeEliminator:
    def find_reachable(self, cfg, entry_block=0):
        """
        Find all reachable basic blocks.
        cfg: dict mapping block_id -> {'code': [...], 'successors': [block_ids]}
        Returns: set of reachable block IDs
        """
        # TODO: Implement reachability analysis
        pass

    def eliminate(self, cfg, entry_block=0):
        """Remove unreachable blocks from CFG."""
        # TODO: Remove unreachable blocks
        pass`,
    solution: `class UnreachableCodeEliminator:
    def find_reachable(self, cfg, entry_block=0):
        """
        Find all reachable basic blocks.
        cfg: dict mapping block_id -> {'code': [...], 'successors': [block_ids]}
        Returns: set of reachable block IDs
        """
        reachable = set()
        worklist = [entry_block]

        while worklist:
            current = worklist.pop(0)

            if current in reachable:
                continue

            reachable.add(current)

            # Add successors to worklist
            if current in cfg:
                successors = cfg[current].get('successors', [])
                for succ in successors:
                    if succ not in reachable:
                        worklist.append(succ)

        return reachable

    def eliminate(self, cfg, entry_block=0):
        """Remove unreachable blocks from CFG."""
        reachable = self.find_reachable(cfg, entry_block)

        # Create new CFG with only reachable blocks
        new_cfg = {}
        for block_id in reachable:
            if block_id in cfg:
                new_cfg[block_id] = cfg[block_id]

        return new_cfg`,
    testCases: [
      {
        input: `uce = UnreachableCodeEliminator()
cfg = {
    0: {'code': ['x = 1'], 'successors': [1]},
    1: {'code': ['y = 2'], 'successors': []},
    2: {'code': ['z = 3'], 'successors': []}
}
reachable = uce.find_reachable(cfg, 0)
print(2 in reachable)`,
        expectedOutput: 'False',
        isHidden: false,
        description: 'Block 2 is unreachable from entry'
      },
      {
        input: `uce = UnreachableCodeEliminator()
cfg = {
    0: {'code': ['x = 1'], 'successors': [1, 2]},
    1: {'code': ['y = 2'], 'successors': [3]},
    2: {'code': ['z = 3'], 'successors': [3]},
    3: {'code': ['return'], 'successors': []}
}
new_cfg = uce.eliminate(cfg, 0)
print(len(new_cfg))`,
        expectedOutput: '4',
        isHidden: false,
        description: 'All blocks reachable'
      },
      {
        input: `uce = UnreachableCodeEliminator()
cfg = {
    0: {'code': ['x = 1'], 'successors': [1]},
    1: {'code': ['return'], 'successors': []},
    2: {'code': ['y = 2'], 'successors': [3]},
    3: {'code': ['z = 3'], 'successors': []}
}
new_cfg = uce.eliminate(cfg, 0)
print(len(new_cfg))`,
        isHidden: true,
        description: 'Blocks 2 and 3 unreachable'
      }
    ],
    hints: [
      'Use a worklist algorithm starting from the entry block',
      'Mark blocks as reachable when visited',
      'Add successor blocks to the worklist',
      'Remove blocks that are never marked as reachable'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t6-ex16',
    subjectId: 'cs304',
    topicId: 'cs304-topic-6',
    title: 'Inline Expansion',
    difficulty: 4,
    description: 'Implement function inlining to replace function calls with the function body for small functions.',
    starterCode: `class FunctionInliner:
    def __init__(self, inline_threshold=5):
        self.inline_threshold = inline_threshold
        self.functions = {}  # function_name -> body

    def should_inline(self, function_name):
        """Decide if function should be inlined based on size."""
        # TODO: Check function size
        pass

    def inline_call(self, call_site, function_name, args):
        """
        Inline a function call.
        call_site: (var, call_expr)
        Returns: list of statements replacing the call
        """
        # TODO: Substitute parameters with arguments
        # Rename local variables to avoid conflicts
        pass`,
    solution: `class FunctionInliner:
    def __init__(self, inline_threshold=5):
        self.inline_threshold = inline_threshold
        self.functions = {}  # function_name -> {'params': [...], 'body': [...]}
        self.inline_counter = 0

    def register_function(self, name, params, body):
        """Register a function for potential inlining."""
        self.functions[name] = {'params': params, 'body': body}

    def should_inline(self, function_name):
        """Decide if function should be inlined based on size."""
        if function_name not in self.functions:
            return False

        body = self.functions[function_name]['body']
        return len(body) <= self.inline_threshold

    def rename_var(self, var, suffix):
        """Rename a variable to avoid conflicts."""
        if isinstance(var, str):
            return f"{var}_{suffix}"
        if isinstance(var, dict) and 'var' in var:
            return {'var': f"{var['var']}_{suffix}"}
        return var

    def rename_expr(self, expr, suffix, param_map):
        """Rename variables in an expression."""
        if isinstance(expr, str):
            if expr in param_map:
                return param_map[expr]
            return f"{expr}_{suffix}"

        if isinstance(expr, int):
            return expr

        if isinstance(expr, dict):
            if 'var' in expr:
                var = expr['var']
                if var in param_map:
                    return param_map[var]
                return {'var': f"{var}_{suffix}"}

            if 'value' in expr:
                return expr

            if 'op' in expr:
                left = self.rename_expr(expr['left'], suffix, param_map)
                right = self.rename_expr(expr['right'], suffix, param_map)
                return {'op': expr['op'], 'left': left, 'right': right}

        return expr

    def inline_call(self, result_var, function_name, args):
        """
        Inline a function call.
        Returns: list of statements replacing the call
        """
        if not self.should_inline(function_name):
            return None

        func_info = self.functions[function_name]
        params = func_info['params']
        body = func_info['body']

        # Create unique suffix for this inlining
        suffix = f"inline{self.inline_counter}"
        self.inline_counter += 1

        # Create parameter substitution map
        param_map = {}
        for i, param in enumerate(params):
            if i < len(args):
                param_map[param] = args[i]

        # Inline the body with renamed variables
        inlined = []
        for var, expr in body:
            new_var = f"{var}_{suffix}"
            new_expr = self.rename_expr(expr, suffix, param_map)
            inlined.append((new_var, new_expr))

        # Last statement's result should be assigned to result_var
        if inlined:
            last_var = inlined[-1][0]
            inlined.append((result_var, {'var': last_var}))

        return inlined`,
    testCases: [
      {
        input: `inliner = FunctionInliner(inline_threshold=5)
inliner.register_function('add', ['a', 'b'], [('result', {'op': '+', 'left': {'var': 'a'}, 'right': {'var': 'b'}})])
should = inliner.should_inline('add')
print(should)`,
        expectedOutput: 'True',
        isHidden: false,
        description: 'Small function should be inlined'
      },
      {
        input: `inliner = FunctionInliner(inline_threshold=5)
inliner.register_function('foo', ['x'], [('t1', 1), ('t2', 2)])
inlined = inliner.inline_call('result', 'foo', [{'value': 10}])
print(len(inlined))`,
        expectedOutput: '3',
        isHidden: false,
        description: 'Inlined body plus result assignment'
      },
      {
        input: `inliner = FunctionInliner(inline_threshold=2)
inliner.register_function('big', ['x'], [('t1', 1), ('t2', 2), ('t3', 3)])
should = inliner.should_inline('big')
print(should)`,
        isHidden: true,
        description: 'Large function should not be inlined'
      }
    ],
    hints: [
      'Check function size against threshold to decide if it should be inlined',
      'Substitute formal parameters with actual arguments',
      'Rename local variables to avoid name conflicts with the caller',
      'Connect the inlined code result to the call site result variable'
    ],
    language: 'python'
  }
];
