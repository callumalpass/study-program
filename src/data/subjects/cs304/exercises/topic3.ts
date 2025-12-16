import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'cs304-t3-ex01',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Simple Symbol Table',
    difficulty: 1,
    description: 'Implement a basic symbol table that can insert, lookup, and delete variable symbols with their types.',
    starterCode: `class SymbolTable:
    def __init__(self):
        """Initialize an empty symbol table."""
        # Your code here
        pass

    def insert(self, name, symbol_type):
        """Insert a symbol with its type. Return True if successful."""
        # Your code here
        pass

    def lookup(self, name):
        """Look up a symbol. Return its type or None if not found."""
        # Your code here
        pass

    def delete(self, name):
        """Delete a symbol. Return True if successful."""
        # Your code here
        pass

# Test
st = SymbolTable()
st.insert('x', 'int')
print(st.lookup('x'))  # Should print 'int'`,
    solution: `class SymbolTable:
    def __init__(self):
        """Initialize an empty symbol table."""
        self.table = {}

    def insert(self, name, symbol_type):
        """Insert a symbol with its type. Return True if successful."""
        if name in self.table:
            return False  # Symbol already exists
        self.table[name] = symbol_type
        return True

    def lookup(self, name):
        """Look up a symbol. Return its type or None if not found."""
        return self.table.get(name, None)

    def delete(self, name):
        """Delete a symbol. Return True if successful."""
        if name in self.table:
            del self.table[name]
            return True
        return False

# Test
st = SymbolTable()
st.insert('x', 'int')
print(st.lookup('x'))`,
    testCases: [
      { input: 'insert and lookup', expectedOutput: 'int', isHidden: false, description: 'Insert and retrieve symbol' },
      { input: 'lookup nonexistent', expectedOutput: 'None', isHidden: false, description: 'Lookup returns None for missing symbol' },
      { input: 'delete', expectedOutput: 'True', isHidden: true, description: 'Delete existing symbol' }
    ],
    hints: [
      'Use a dictionary to store name -> type mappings',
      'Check if a symbol exists before operations',
      'Return None for lookups of non-existent symbols',
      'Return boolean values to indicate success/failure'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex02',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Scoped Symbol Table',
    difficulty: 2,
    description: 'Implement a symbol table with nested scopes using a stack of dictionaries. Support entering/exiting scopes.',
    starterCode: `class ScopedSymbolTable:
    def __init__(self):
        """Initialize with global scope."""
        self.scopes = [{}]  # Stack of scopes

    def enter_scope(self):
        """Enter a new nested scope."""
        # Your code here
        pass

    def exit_scope(self):
        """Exit current scope."""
        # Your code here
        pass

    def insert(self, name, symbol_type):
        """Insert symbol in current scope."""
        # Your code here
        pass

    def lookup(self, name):
        """Look up symbol from current scope outward."""
        # Your code here
        pass

# Test
st = ScopedSymbolTable()
st.insert('x', 'int')
st.enter_scope()
st.insert('y', 'float')
print(st.lookup('x'))  # Should find 'int' from outer scope`,
    solution: `class ScopedSymbolTable:
    def __init__(self):
        """Initialize with global scope."""
        self.scopes = [{}]  # Stack of scopes

    def enter_scope(self):
        """Enter a new nested scope."""
        self.scopes.append({})

    def exit_scope(self):
        """Exit current scope."""
        if len(self.scopes) > 1:
            self.scopes.pop()

    def insert(self, name, symbol_type):
        """Insert symbol in current scope."""
        self.scopes[-1][name] = symbol_type

    def lookup(self, name):
        """Look up symbol from current scope outward."""
        # Search from innermost to outermost scope
        for scope in reversed(self.scopes):
            if name in scope:
                return scope[name]
        return None

# Test
st = ScopedSymbolTable()
st.insert('x', 'int')
st.enter_scope()
st.insert('y', 'float')
print(st.lookup('x'))`,
    testCases: [
      { input: 'outer scope lookup', expectedOutput: 'int', isHidden: false, description: 'Find variable from outer scope' },
      { input: 'inner scope lookup', expectedOutput: 'float', isHidden: false, description: 'Find variable in current scope' },
      { input: 'after exit scope', expectedOutput: 'None', isHidden: true, description: 'Variable not visible after exiting scope' }
    ],
    hints: [
      'Use a list of dictionaries as a stack',
      'Push a new dictionary when entering a scope',
      'Pop when exiting a scope',
      'Search from innermost to outermost scope for lookups'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex03',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Type Compatibility Checker',
    difficulty: 2,
    description: 'Implement type checking for binary operations, ensuring operands have compatible types.',
    starterCode: `class TypeChecker:
    def __init__(self):
        # Define compatible types for operations
        self.compatible_ops = {
            '+': [('int', 'int', 'int'), ('float', 'float', 'float'),
                  ('string', 'string', 'string')],
            '*': [('int', 'int', 'int'), ('float', 'float', 'float')],
            '==': [('int', 'int', 'bool'), ('float', 'float', 'bool'),
                   ('string', 'string', 'bool')]
        }

    def check_binary_op(self, op, left_type, right_type):
        """
        Check if binary operation is type-compatible.
        Returns result type or None if incompatible.
        """
        # Your code here
        pass

# Test
tc = TypeChecker()
print(tc.check_binary_op('+', 'int', 'int'))  # Should return 'int'
print(tc.check_binary_op('+', 'int', 'string'))  # Should return None`,
    solution: `class TypeChecker:
    def __init__(self):
        # Define compatible types for operations
        self.compatible_ops = {
            '+': [('int', 'int', 'int'), ('float', 'float', 'float'),
                  ('string', 'string', 'string')],
            '*': [('int', 'int', 'int'), ('float', 'float', 'float')],
            '==': [('int', 'int', 'bool'), ('float', 'float', 'bool'),
                   ('string', 'string', 'bool')]
        }

    def check_binary_op(self, op, left_type, right_type):
        """
        Check if binary operation is type-compatible.
        Returns result type or None if incompatible.
        """
        if op not in self.compatible_ops:
            return None

        for left, right, result in self.compatible_ops[op]:
            if left_type == left and right_type == right:
                return result

        return None

# Test
tc = TypeChecker()
print(tc.check_binary_op('+', 'int', 'int'))
print(tc.check_binary_op('+', 'int', 'string'))`,
    testCases: [
      { input: "'+', 'int', 'int'", expectedOutput: 'int', isHidden: false, description: 'Integer addition' },
      { input: "'+', 'int', 'string'", expectedOutput: 'None', isHidden: false, description: 'Incompatible types' },
      { input: "'==', 'float', 'float'", expectedOutput: 'bool', isHidden: true, description: 'Comparison returns bool' }
    ],
    hints: [
      'Look up the operator in the compatibility table',
      'Check if left and right types match any rule',
      'Return the result type from the matching rule',
      'Return None if no matching rule found'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex04',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'AST Type Annotation',
    difficulty: 3,
    description: 'Annotate an abstract syntax tree with type information by traversing and checking types.',
    starterCode: `class TypeAnnotator:
    def __init__(self, symbol_table):
        self.symbol_table = symbol_table

    def annotate(self, node):
        """
        Annotate AST node with type information.
        node: dict with 'kind', 'value', 'left', 'right', etc.
        Returns: type of the node or None if type error.
        """
        # Your code here
        pass

# Example node structure:
# {'kind': 'BinaryOp', 'op': '+', 'left': {...}, 'right': {...}}
# {'kind': 'Variable', 'name': 'x'}
# {'kind': 'Literal', 'type': 'int', 'value': 5}

# Test
st = {'x': 'int', 'y': 'int'}
annotator = TypeAnnotator(st)
node = {'kind': 'BinaryOp', 'op': '+',
        'left': {'kind': 'Variable', 'name': 'x'},
        'right': {'kind': 'Literal', 'type': 'int', 'value': 5}}
print(annotator.annotate(node))  # Should return 'int'`,
    solution: `class TypeAnnotator:
    def __init__(self, symbol_table):
        self.symbol_table = symbol_table
        self.type_rules = {
            '+': [('int', 'int', 'int'), ('float', 'float', 'float')],
            '*': [('int', 'int', 'int'), ('float', 'float', 'float')],
            '-': [('int', 'int', 'int'), ('float', 'float', 'float')]
        }

    def annotate(self, node):
        """
        Annotate AST node with type information.
        Returns: type of the node or None if type error.
        """
        kind = node['kind']

        if kind == 'Literal':
            node['computed_type'] = node['type']
            return node['type']

        elif kind == 'Variable':
            var_type = self.symbol_table.get(node['name'])
            if var_type is None:
                return None  # Undefined variable
            node['computed_type'] = var_type
            return var_type

        elif kind == 'BinaryOp':
            left_type = self.annotate(node['left'])
            right_type = self.annotate(node['right'])

            if left_type is None or right_type is None:
                return None

            # Check type compatibility
            op = node['op']
            if op in self.type_rules:
                for left, right, result in self.type_rules[op]:
                    if left_type == left and right_type == right:
                        node['computed_type'] = result
                        return result

            return None

        return None

# Test
st = {'x': 'int', 'y': 'int'}
annotator = TypeAnnotator(st)
node = {'kind': 'BinaryOp', 'op': '+',
        'left': {'kind': 'Variable', 'name': 'x'},
        'right': {'kind': 'Literal', 'type': 'int', 'value': 5}}
print(annotator.annotate(node))`,
    testCases: [
      { input: 'int + int', expectedOutput: 'int', isHidden: false, description: 'Binary operation with compatible types' },
      { input: 'undefined variable', expectedOutput: 'None', isHidden: false, description: 'Type error for undefined variable' },
      { input: 'nested expression', expectedOutput: 'int', isHidden: true, description: 'Nested binary operations' }
    ],
    hints: [
      'Recursively annotate child nodes first',
      'For literals, return their declared type',
      'For variables, look up type in symbol table',
      'For binary ops, check type compatibility of operands'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex05',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Function Symbol Table',
    difficulty: 3,
    description: 'Extend symbol table to handle function declarations with parameter types and return types.',
    starterCode: `class FunctionSymbolTable:
    def __init__(self):
        self.functions = {}

    def declare_function(self, name, param_types, return_type):
        """
        Declare a function with parameter types and return type.
        param_types: list of types
        return_type: type
        """
        # Your code here
        pass

    def lookup_function(self, name):
        """Return function signature (param_types, return_type) or None."""
        # Your code here
        pass

    def check_call(self, name, arg_types):
        """
        Check if function call is valid.
        Returns return type or None if invalid.
        """
        # Your code here
        pass

# Test
fst = FunctionSymbolTable()
fst.declare_function('add', ['int', 'int'], 'int')
print(fst.check_call('add', ['int', 'int']))  # Should return 'int'`,
    solution: `class FunctionSymbolTable:
    def __init__(self):
        self.functions = {}

    def declare_function(self, name, param_types, return_type):
        """
        Declare a function with parameter types and return type.
        """
        self.functions[name] = {
            'param_types': param_types,
            'return_type': return_type
        }

    def lookup_function(self, name):
        """Return function signature (param_types, return_type) or None."""
        if name in self.functions:
            sig = self.functions[name]
            return (sig['param_types'], sig['return_type'])
        return None

    def check_call(self, name, arg_types):
        """
        Check if function call is valid.
        Returns return type or None if invalid.
        """
        if name not in self.functions:
            return None

        func = self.functions[name]
        param_types = func['param_types']

        # Check argument count
        if len(arg_types) != len(param_types):
            return None

        # Check each argument type
        for arg_type, param_type in zip(arg_types, param_types):
            if arg_type != param_type:
                return None

        return func['return_type']

# Test
fst = FunctionSymbolTable()
fst.declare_function('add', ['int', 'int'], 'int')
print(fst.check_call('add', ['int', 'int']))`,
    testCases: [
      { input: 'valid call', expectedOutput: 'int', isHidden: false, description: 'Function call with correct types' },
      { input: 'wrong arg count', expectedOutput: 'None', isHidden: false, description: 'Too many or too few arguments' },
      { input: 'wrong arg types', expectedOutput: 'None', isHidden: true, description: 'Argument type mismatch' }
    ],
    hints: [
      'Store function signatures as (param_types, return_type)',
      'Check both argument count and types',
      'Return the function\'s return type if call is valid',
      'Return None for type errors or undefined functions'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex06',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Type Inference for Variables',
    difficulty: 3,
    description: 'Implement simple type inference that deduces variable types from their usage.',
    starterCode: `class TypeInference:
    def __init__(self):
        self.var_types = {}  # Inferred types

    def infer_assignment(self, var_name, expr_type):
        """
        Infer type for variable from assignment.
        Returns True if consistent, False if conflict.
        """
        # Your code here
        pass

    def get_type(self, var_name):
        """Get inferred type or None if not yet inferred."""
        # Your code here
        pass

# Test
ti = TypeInference()
ti.infer_assignment('x', 'int')
ti.infer_assignment('x', 'int')  # Consistent
print(ti.get_type('x'))  # Should be 'int'`,
    solution: `class TypeInference:
    def __init__(self):
        self.var_types = {}  # Inferred types

    def infer_assignment(self, var_name, expr_type):
        """
        Infer type for variable from assignment.
        Returns True if consistent, False if conflict.
        """
        if var_name in self.var_types:
            # Check for consistency
            if self.var_types[var_name] != expr_type:
                return False  # Type conflict
        else:
            # Infer new type
            self.var_types[var_name] = expr_type

        return True

    def get_type(self, var_name):
        """Get inferred type or None if not yet inferred."""
        return self.var_types.get(var_name, None)

# Test
ti = TypeInference()
ti.infer_assignment('x', 'int')
ti.infer_assignment('x', 'int')
print(ti.get_type('x'))`,
    testCases: [
      { input: 'consistent types', expectedOutput: 'True', isHidden: false, description: 'Same type assignments are consistent' },
      { input: 'type conflict', expectedOutput: 'False', isHidden: false, description: 'Different types cause conflict' },
      { input: 'get inferred type', expectedOutput: 'int', isHidden: true, description: 'Retrieve inferred type' }
    ],
    hints: [
      'Track inferred types in a dictionary',
      'On first assignment, record the type',
      'On subsequent assignments, check consistency',
      'Return False if types conflict'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex07',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Semantic Error Detection',
    difficulty: 2,
    description: 'Detect common semantic errors like undefined variables, type mismatches, and duplicate declarations.',
    starterCode: `class SemanticAnalyzer:
    def __init__(self):
        self.symbols = {}
        self.errors = []

    def declare_variable(self, name, var_type):
        """Declare variable, detect duplicate declarations."""
        # Your code here
        pass

    def check_variable_use(self, name):
        """Check if variable is defined before use."""
        # Your code here
        pass

    def check_assignment(self, name, value_type):
        """Check type compatibility in assignment."""
        # Your code here
        pass

# Test
sa = SemanticAnalyzer()
sa.declare_variable('x', 'int')
sa.check_assignment('x', 'string')  # Type mismatch
print(len(sa.errors))  # Should have at least one error`,
    solution: `class SemanticAnalyzer:
    def __init__(self):
        self.symbols = {}
        self.errors = []

    def declare_variable(self, name, var_type):
        """Declare variable, detect duplicate declarations."""
        if name in self.symbols:
            self.errors.append(f"Duplicate declaration of '{name}'")
            return False
        self.symbols[name] = var_type
        return True

    def check_variable_use(self, name):
        """Check if variable is defined before use."""
        if name not in self.symbols:
            self.errors.append(f"Undefined variable '{name}'")
            return False
        return True

    def check_assignment(self, name, value_type):
        """Check type compatibility in assignment."""
        if name not in self.symbols:
            self.errors.append(f"Assignment to undefined variable '{name}'")
            return False

        if self.symbols[name] != value_type:
            self.errors.append(
                f"Type mismatch: cannot assign {value_type} to {self.symbols[name]}"
            )
            return False

        return True

# Test
sa = SemanticAnalyzer()
sa.declare_variable('x', 'int')
sa.check_assignment('x', 'string')
print(len(sa.errors))`,
    testCases: [
      { input: 'type mismatch', expectedOutput: '1', isHidden: false, description: 'Detect type mismatch error' },
      { input: 'undefined variable', expectedOutput: '1', isHidden: false, description: 'Detect undefined variable' },
      { input: 'duplicate declaration', expectedOutput: '1', isHidden: true, description: 'Detect duplicate declaration' }
    ],
    hints: [
      'Maintain a list of errors found during analysis',
      'Check symbol table before allowing usage',
      'Compare types for assignment compatibility',
      'Add descriptive error messages to the errors list'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex08',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Constant Folding',
    difficulty: 3,
    description: 'Implement constant folding optimization that evaluates constant expressions at compile time.',
    starterCode: `class ConstantFolder:
    def fold(self, node):
        """
        Fold constant expressions in AST.
        node: {'kind': 'BinaryOp'/'Literal', ...}
        Returns: simplified node
        """
        # Your code here
        pass

# Example:
# {'kind': 'BinaryOp', 'op': '+',
#  'left': {'kind': 'Literal', 'value': 2},
#  'right': {'kind': 'Literal', 'value': 3}}
# Should fold to: {'kind': 'Literal', 'value': 5}

# Test
cf = ConstantFolder()
node = {'kind': 'BinaryOp', 'op': '+',
        'left': {'kind': 'Literal', 'value': 2},
        'right': {'kind': 'Literal', 'value': 3}}
result = cf.fold(node)
print(result['value'] if result['kind'] == 'Literal' else 'not folded')`,
    solution: `class ConstantFolder:
    def fold(self, node):
        """
        Fold constant expressions in AST.
        Returns: simplified node
        """
        if node['kind'] == 'Literal':
            return node

        if node['kind'] == 'BinaryOp':
            # Recursively fold children
            left = self.fold(node['left'])
            right = self.fold(node['right'])

            # If both are literals, compute result
            if left['kind'] == 'Literal' and right['kind'] == 'Literal':
                op = node['op']
                left_val = left['value']
                right_val = right['value']

                if op == '+':
                    result = left_val + right_val
                elif op == '-':
                    result = left_val - right_val
                elif op == '*':
                    result = left_val * right_val
                elif op == '/':
                    if right_val != 0:
                        result = left_val // right_val
                    else:
                        return node  # Can't fold division by zero
                else:
                    return node

                return {'kind': 'Literal', 'value': result}

            # Return node with folded children
            return {
                'kind': 'BinaryOp',
                'op': node['op'],
                'left': left,
                'right': right
            }

        return node

# Test
cf = ConstantFolder()
node = {'kind': 'BinaryOp', 'op': '+',
        'left': {'kind': 'Literal', 'value': 2},
        'right': {'kind': 'Literal', 'value': 3}}
result = cf.fold(node)
print(result['value'] if result['kind'] == 'Literal' else 'not folded')`,
    testCases: [
      { input: '2 + 3', expectedOutput: '5', isHidden: false, description: 'Fold simple addition' },
      { input: '10 * 2', expectedOutput: '20', isHidden: false, description: 'Fold multiplication' },
      { input: 'nested: (2 + 3) * 4', expectedOutput: '20', isHidden: true, description: 'Fold nested expressions' }
    ],
    hints: [
      'Recursively fold child expressions first',
      'If both operands are literals, compute the result',
      'Replace the BinaryOp node with a Literal node',
      'Handle all arithmetic operators'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex09',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Control Flow Analysis',
    difficulty: 4,
    description: 'Detect unreachable code after return statements or in conditional branches.',
    starterCode: `class ControlFlowAnalyzer:
    def __init__(self):
        self.warnings = []

    def analyze_block(self, statements):
        """
        Analyze a block of statements for unreachable code.
        statements: list of {'kind': 'Return'/'If'/'Assignment', ...}
        Returns: True if block definitely returns
        """
        # Your code here
        pass

# Example statements:
# {'kind': 'Return', 'value': ...}
# {'kind': 'Assignment', 'var': 'x', 'value': ...}
# {'kind': 'If', 'condition': ..., 'then': [...], 'else': [...]}

# Test
cfa = ControlFlowAnalyzer()
stmts = [
    {'kind': 'Return', 'value': 5},
    {'kind': 'Assignment', 'var': 'x', 'value': 10}  # Unreachable
]
cfa.analyze_block(stmts)
print(len(cfa.warnings))  # Should detect unreachable code`,
    solution: `class ControlFlowAnalyzer:
    def __init__(self):
        self.warnings = []

    def analyze_block(self, statements):
        """
        Analyze a block of statements for unreachable code.
        Returns: True if block definitely returns
        """
        for i, stmt in enumerate(statements):
            if stmt['kind'] == 'Return':
                # Check if there are statements after return
                if i < len(statements) - 1:
                    self.warnings.append(
                        f"Unreachable code after return statement"
                    )
                return True

            elif stmt['kind'] == 'If':
                # Analyze both branches
                then_returns = self.analyze_block(stmt.get('then', []))
                else_returns = self.analyze_block(stmt.get('else', []))

                # If both branches return, the if statement returns
                if then_returns and else_returns:
                    if i < len(statements) - 1:
                        self.warnings.append(
                            f"Unreachable code after if statement"
                        )
                    return True

        return False

# Test
cfa = ControlFlowAnalyzer()
stmts = [
    {'kind': 'Return', 'value': 5},
    {'kind': 'Assignment', 'var': 'x', 'value': 10}
]
cfa.analyze_block(stmts)
print(len(cfa.warnings))`,
    testCases: [
      { input: 'code after return', expectedOutput: '1', isHidden: false, description: 'Detect unreachable code after return' },
      { input: 'both branches return', expectedOutput: '1', isHidden: false, description: 'Code after if with returns in both branches' },
      { input: 'no unreachable code', expectedOutput: '0', isHidden: true, description: 'Valid control flow' }
    ],
    hints: [
      'Track whether each statement can return',
      'After a return statement, remaining statements are unreachable',
      'If both branches of an if return, code after is unreachable',
      'Recursively analyze nested blocks'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex10',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Type Casting Insertion',
    difficulty: 3,
    description: 'Automatically insert type casts where needed to make expressions type-correct (e.g., int to float).',
    starterCode: `class TypeCaster:
    def __init__(self):
        # Define valid casts
        self.valid_casts = {
            ('int', 'float'): True,
            ('int', 'string'): True,
            ('float', 'string'): True
        }

    def insert_cast(self, node, target_type):
        """
        Insert cast node if needed.
        Returns: node or cast node wrapping it
        """
        # Your code here
        pass

    def can_cast(self, from_type, to_type):
        """Check if cast is valid."""
        # Your code here
        pass

# Test
tc = TypeCaster()
node = {'kind': 'Literal', 'type': 'int', 'value': 5}
result = tc.insert_cast(node, 'float')
print(result['kind'])  # Should be 'Cast'`,
    solution: `class TypeCaster:
    def __init__(self):
        # Define valid casts
        self.valid_casts = {
            ('int', 'float'): True,
            ('int', 'string'): True,
            ('float', 'string'): True
        }

    def can_cast(self, from_type, to_type):
        """Check if cast is valid."""
        if from_type == to_type:
            return True
        return (from_type, to_type) in self.valid_casts

    def insert_cast(self, node, target_type):
        """
        Insert cast node if needed.
        Returns: node or cast node wrapping it
        """
        # Determine source type
        if 'type' in node:
            source_type = node['type']
        elif 'computed_type' in node:
            source_type = node['computed_type']
        else:
            return node  # Can't determine type

        # No cast needed if types match
        if source_type == target_type:
            return node

        # Check if cast is valid
        if not self.can_cast(source_type, target_type):
            return None  # Invalid cast

        # Insert cast node
        return {
            'kind': 'Cast',
            'from_type': source_type,
            'to_type': target_type,
            'expr': node,
            'type': target_type
        }

# Test
tc = TypeCaster()
node = {'kind': 'Literal', 'type': 'int', 'value': 5}
result = tc.insert_cast(node, 'float')
print(result['kind'])`,
    testCases: [
      { input: 'int to float', expectedOutput: 'Cast', isHidden: false, description: 'Insert cast for int to float' },
      { input: 'same type', expectedOutput: 'Literal', isHidden: false, description: 'No cast needed for same type' },
      { input: 'invalid cast', expectedOutput: 'None', isHidden: true, description: 'Return None for invalid cast' }
    ],
    hints: [
      'Check if source and target types are the same',
      'Consult valid_casts table for allowed conversions',
      'Wrap the expression in a Cast node',
      'Return None if cast is not valid'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex11',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Array Type Checking',
    difficulty: 4,
    description: 'Implement type checking for array declarations, indexing, and assignments.',
    starterCode: `class ArrayTypeChecker:
    def __init__(self):
        self.arrays = {}  # name -> (element_type, size)

    def declare_array(self, name, element_type, size):
        """Declare an array with element type and size."""
        # Your code here
        pass

    def check_index(self, array_name, index_type):
        """
        Check array indexing.
        Returns element type or None if error.
        """
        # Your code here
        pass

    def check_element_assignment(self, array_name, value_type):
        """
        Check assignment to array element.
        Returns True if valid.
        """
        # Your code here
        pass

# Test
atc = ArrayTypeChecker()
atc.declare_array('arr', 'int', 10)
print(atc.check_index('arr', 'int'))  # Should return 'int'`,
    solution: `class ArrayTypeChecker:
    def __init__(self):
        self.arrays = {}  # name -> (element_type, size)

    def declare_array(self, name, element_type, size):
        """Declare an array with element type and size."""
        self.arrays[name] = {
            'element_type': element_type,
            'size': size
        }

    def check_index(self, array_name, index_type):
        """
        Check array indexing.
        Returns element type or None if error.
        """
        if array_name not in self.arrays:
            return None  # Array not declared

        if index_type != 'int':
            return None  # Index must be int

        return self.arrays[array_name]['element_type']

    def check_element_assignment(self, array_name, value_type):
        """
        Check assignment to array element.
        Returns True if valid.
        """
        if array_name not in self.arrays:
            return False

        element_type = self.arrays[array_name]['element_type']
        return value_type == element_type

# Test
atc = ArrayTypeChecker()
atc.declare_array('arr', 'int', 10)
print(atc.check_index('arr', 'int'))`,
    testCases: [
      { input: 'valid indexing', expectedOutput: 'int', isHidden: false, description: 'Array indexing with int returns element type' },
      { input: 'non-int index', expectedOutput: 'None', isHidden: false, description: 'Reject non-integer index' },
      { input: 'assignment', expectedOutput: 'True', isHidden: true, description: 'Valid element assignment' }
    ],
    hints: [
      'Store array metadata: element type and size',
      'Index type must be int',
      'Return element type for valid indexing',
      'Check type compatibility for assignments'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex12',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Method Resolution',
    difficulty: 4,
    description: 'Implement method lookup in a class hierarchy, handling inheritance and method overriding.',
    starterCode: `class ClassHierarchy:
    def __init__(self):
        self.classes = {}  # class_name -> {'parent': ..., 'methods': {...}}

    def declare_class(self, name, parent=None):
        """Declare a class with optional parent."""
        # Your code here
        pass

    def add_method(self, class_name, method_name, signature):
        """Add a method to a class."""
        # Your code here
        pass

    def resolve_method(self, class_name, method_name):
        """
        Resolve method by searching class and ancestors.
        Returns method signature or None.
        """
        # Your code here
        pass

# Test
ch = ClassHierarchy()
ch.declare_class('Animal')
ch.add_method('Animal', 'speak', (['self'], 'void'))
ch.declare_class('Dog', parent='Animal')
print(ch.resolve_method('Dog', 'speak'))  # Should find in parent`,
    solution: `class ClassHierarchy:
    def __init__(self):
        self.classes = {}  # class_name -> {'parent': ..., 'methods': {...}}

    def declare_class(self, name, parent=None):
        """Declare a class with optional parent."""
        self.classes[name] = {
            'parent': parent,
            'methods': {}
        }

    def add_method(self, class_name, method_name, signature):
        """Add a method to a class."""
        if class_name in self.classes:
            self.classes[class_name]['methods'][method_name] = signature

    def resolve_method(self, class_name, method_name):
        """
        Resolve method by searching class and ancestors.
        Returns method signature or None.
        """
        # Search current class
        if class_name not in self.classes:
            return None

        current_class = self.classes[class_name]

        # Check if method exists in current class
        if method_name in current_class['methods']:
            return current_class['methods'][method_name]

        # Search parent class
        parent = current_class['parent']
        if parent:
            return self.resolve_method(parent, method_name)

        return None

# Test
ch = ClassHierarchy()
ch.declare_class('Animal')
ch.add_method('Animal', 'speak', (['self'], 'void'))
ch.declare_class('Dog', parent='Animal')
print(ch.resolve_method('Dog', 'speak'))`,
    testCases: [
      { input: 'method in class', expectedOutput: 'signature', isHidden: false, description: 'Find method in same class' },
      { input: 'inherited method', expectedOutput: 'signature', isHidden: false, description: 'Find method in parent class' },
      { input: 'undefined method', expectedOutput: 'None', isHidden: true, description: 'Method not found in hierarchy' }
    ],
    hints: [
      'Search for method in current class first',
      'If not found, recursively search parent class',
      'Store parent class name for each class',
      'Methods can override parent methods'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex13',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Dead Code Elimination',
    difficulty: 3,
    description: 'Identify and remove dead code (unused variables and unreachable statements).',
    starterCode: `class DeadCodeEliminator:
    def __init__(self):
        self.used_vars = set()

    def mark_used_variables(self, node):
        """Mark all variables used in an expression."""
        # Your code here
        pass

    def eliminate_unused_assignments(self, statements):
        """
        Remove assignments to variables that are never used.
        Returns: filtered list of statements
        """
        # Your code here
        pass

# Example statement:
# {'kind': 'Assignment', 'var': 'x', 'expr': ...}
# {'kind': 'Return', 'expr': ...}

# Test
dce = DeadCodeEliminator()
stmts = [
    {'kind': 'Assignment', 'var': 'x', 'expr': {'kind': 'Literal', 'value': 5}},
    {'kind': 'Assignment', 'var': 'y', 'expr': {'kind': 'Literal', 'value': 10}},
    {'kind': 'Return', 'expr': {'kind': 'Variable', 'name': 'y'}}
]
result = dce.eliminate_unused_assignments(stmts)
print(len(result))  # Should be 2 (x assignment removed)`,
    solution: `class DeadCodeEliminator:
    def __init__(self):
        self.used_vars = set()

    def mark_used_variables(self, node):
        """Mark all variables used in an expression."""
        if not node:
            return

        if isinstance(node, dict):
            if node.get('kind') == 'Variable':
                self.used_vars.add(node['name'])

            # Recursively mark in sub-nodes
            for key, value in node.items():
                if key in ['left', 'right', 'expr', 'condition', 'value']:
                    self.mark_used_variables(value)
                elif key == 'then' or key == 'else':
                    for stmt in value:
                        self.mark_used_variables(stmt)

    def eliminate_unused_assignments(self, statements):
        """
        Remove assignments to variables that are never used.
        Returns: filtered list of statements
        """
        # First pass: find all used variables
        self.used_vars = set()
        for stmt in statements:
            if stmt['kind'] != 'Assignment':
                # Mark variables used in non-assignment statements
                self.mark_used_variables(stmt)

        # Second pass: filter out unused assignments
        result = []
        for stmt in statements:
            if stmt['kind'] == 'Assignment':
                # Keep if variable is used
                if stmt['var'] in self.used_vars:
                    # Also mark variables used in RHS
                    self.mark_used_variables(stmt['expr'])
                    result.append(stmt)
            else:
                result.append(stmt)

        return result

# Test
dce = DeadCodeEliminator()
stmts = [
    {'kind': 'Assignment', 'var': 'x', 'expr': {'kind': 'Literal', 'value': 5}},
    {'kind': 'Assignment', 'var': 'y', 'expr': {'kind': 'Literal', 'value': 10}},
    {'kind': 'Return', 'expr': {'kind': 'Variable', 'name': 'y'}}
]
result = dce.eliminate_unused_assignments(stmts)
print(len(result))`,
    testCases: [
      { input: 'unused variable', expectedOutput: '2', isHidden: false, description: 'Remove assignment to unused variable' },
      { input: 'all used', expectedOutput: '3', isHidden: false, description: 'Keep all statements when all are used' },
      { input: 'chain dependency', expectedOutput: '3', isHidden: true, description: 'Keep assignments that contribute to used variables' }
    ],
    hints: [
      'Use two passes: first to find used variables, second to filter',
      'Mark variables used in return/print statements',
      'Keep assignments only if the variable is later used',
      'Recursively search expressions for variable usage'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex14',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Return Type Checking',
    difficulty: 3,
    description: 'Verify that all code paths in a function return values of the correct type.',
    starterCode: `class ReturnChecker:
    def __init__(self, expected_return_type):
        self.expected_type = expected_return_type
        self.errors = []

    def check_return_type(self, statements):
        """
        Check that all return statements have correct type.
        Returns: True if all paths return correct type
        """
        # Your code here
        pass

    def check_all_paths_return(self, statements):
        """
        Check that all code paths return a value.
        Returns: True if all paths return
        """
        # Your code here
        pass

# Example:
# statements = [
#     {'kind': 'If', 'condition': ..., 'then': [...], 'else': [...]},
#     {'kind': 'Return', 'type': 'int', 'value': ...}
# ]

# Test
rc = ReturnChecker('int')
stmts = [{'kind': 'Return', 'type': 'string', 'value': 'hello'}]
rc.check_return_type(stmts)
print(len(rc.errors))  # Should detect type mismatch`,
    solution: `class ReturnChecker:
    def __init__(self, expected_return_type):
        self.expected_type = expected_return_type
        self.errors = []

    def check_return_type(self, statements):
        """
        Check that all return statements have correct type.
        Returns: True if all paths return correct type
        """
        has_return = False

        for stmt in statements:
            if stmt['kind'] == 'Return':
                has_return = True
                return_type = stmt.get('type')

                if return_type != self.expected_type:
                    self.errors.append(
                        f"Type mismatch: expected {self.expected_type}, "
                        f"got {return_type}"
                    )

            elif stmt['kind'] == 'If':
                # Recursively check both branches
                self.check_return_type(stmt.get('then', []))
                self.check_return_type(stmt.get('else', []))

        return len(self.errors) == 0

    def check_all_paths_return(self, statements):
        """
        Check that all code paths return a value.
        Returns: True if all paths return
        """
        for stmt in statements:
            if stmt['kind'] == 'Return':
                return True

            elif stmt['kind'] == 'If':
                then_returns = self.check_all_paths_return(stmt.get('then', []))
                else_returns = self.check_all_paths_return(stmt.get('else', []))

                # Both branches must return
                if then_returns and else_returns:
                    return True

        return False

# Test
rc = ReturnChecker('int')
stmts = [{'kind': 'Return', 'type': 'string', 'value': 'hello'}]
rc.check_return_type(stmts)
print(len(rc.errors))`,
    testCases: [
      { input: 'correct type', expectedOutput: '0', isHidden: false, description: 'Return type matches' },
      { input: 'wrong type', expectedOutput: '1', isHidden: false, description: 'Return type mismatch' },
      { input: 'missing return', expectedOutput: 'False', isHidden: true, description: 'Not all paths return' }
    ],
    hints: [
      'Compare return statement types with expected type',
      'Recursively check conditional branches',
      'All paths must return for non-void functions',
      'Both if and else branches must return'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex15',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Attribute Grammar Evaluation',
    difficulty: 4,
    description: 'Implement attribute grammar for computing inherited and synthesized attributes on parse trees.',
    starterCode: `class AttributeGrammar:
    def __init__(self):
        pass

    def evaluate_synthesized(self, node):
        """
        Compute synthesized attributes (bottom-up).
        Example: expression value
        """
        # Your code here
        pass

    def evaluate_inherited(self, node, parent_attrs):
        """
        Compute inherited attributes (top-down).
        Example: expected type from parent
        """
        # Your code here
        pass

# Node structure:
# {'kind': 'BinaryOp', 'op': '+', 'left': ..., 'right': ...}
# {'kind': 'Literal', 'value': 5}

# Test
ag = AttributeGrammar()
node = {'kind': 'BinaryOp', 'op': '+',
        'left': {'kind': 'Literal', 'value': 3},
        'right': {'kind': 'Literal', 'value': 7}}
result = ag.evaluate_synthesized(node)
print(result)  # Should compute value attribute`,
    solution: `class AttributeGrammar:
    def __init__(self):
        pass

    def evaluate_synthesized(self, node):
        """
        Compute synthesized attributes (bottom-up).
        Example: expression value
        """
        if node['kind'] == 'Literal':
            node['value_attr'] = node['value']
            node['type_attr'] = 'int'
            return node['value_attr']

        elif node['kind'] == 'BinaryOp':
            # Evaluate children first (bottom-up)
            left_val = self.evaluate_synthesized(node['left'])
            right_val = self.evaluate_synthesized(node['right'])

            # Compute this node's attribute
            op = node['op']
            if op == '+':
                result = left_val + right_val
            elif op == '-':
                result = left_val - right_val
            elif op == '*':
                result = left_val * right_val
            else:
                result = 0

            node['value_attr'] = result
            node['type_attr'] = 'int'
            return result

        return None

    def evaluate_inherited(self, node, parent_attrs):
        """
        Compute inherited attributes (top-down).
        Example: expected type from parent
        """
        # Pass down attributes from parent
        node['expected_type'] = parent_attrs.get('expected_type', 'int')

        # Recursively pass to children
        if node['kind'] == 'BinaryOp':
            child_attrs = {'expected_type': node['expected_type']}
            self.evaluate_inherited(node['left'], child_attrs)
            self.evaluate_inherited(node['right'], child_attrs)

# Test
ag = AttributeGrammar()
node = {'kind': 'BinaryOp', 'op': '+',
        'left': {'kind': 'Literal', 'value': 3},
        'right': {'kind': 'Literal', 'value': 7}}
result = ag.evaluate_synthesized(node)
print(result)`,
    testCases: [
      { input: 'simple expression', expectedOutput: '10', isHidden: false, description: 'Synthesized value attribute' },
      { input: 'multiplication', expectedOutput: '21', isHidden: false, description: 'Compute 3 * 7' },
      { input: 'inherited type', expectedOutput: 'int', isHidden: true, description: 'Pass expected type down' }
    ],
    hints: [
      'Synthesized attributes flow bottom-up from children',
      'Inherited attributes flow top-down from parent',
      'Evaluate children before computing node attribute',
      'Store attributes as node properties'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t3-ex16',
    subjectId: 'cs304',
    topicId: 'cs304-topic-3',
    title: 'Complete Semantic Analyzer',
    difficulty: 5,
    description: 'Build a complete semantic analyzer that performs symbol table management, type checking, and semantic error detection.',
    starterCode: `class SemanticAnalyzer:
    def __init__(self):
        self.symbol_table = [{}]  # Scope stack
        self.errors = []
        self.current_function = None

    def enter_scope(self):
        """Enter new scope."""
        # Your code here
        pass

    def exit_scope(self):
        """Exit current scope."""
        # Your code here
        pass

    def analyze_program(self, ast):
        """
        Analyze complete program AST.
        Performs:
        - Symbol table construction
        - Type checking
        - Semantic error detection
        Returns: True if no errors
        """
        # Your code here
        pass

    def analyze_function(self, node):
        """Analyze function declaration."""
        # Your code here
        pass

    def analyze_statement(self, node):
        """Analyze individual statement."""
        # Your code here
        pass

    def analyze_expression(self, node):
        """Analyze expression and return its type."""
        # Your code here
        pass

# Test
analyzer = SemanticAnalyzer()
program = {
    'kind': 'Program',
    'functions': [
        {
            'kind': 'Function',
            'name': 'main',
            'params': [],
            'return_type': 'int',
            'body': [
                {'kind': 'Return', 'expr': {'kind': 'Literal', 'type': 'int', 'value': 0}}
            ]
        }
    ]
}
result = analyzer.analyze_program(program)
print(result)`,
    solution: `class SemanticAnalyzer:
    def __init__(self):
        self.symbol_table = [{}]  # Scope stack
        self.errors = []
        self.current_function = None

    def enter_scope(self):
        """Enter new scope."""
        self.symbol_table.append({})

    def exit_scope(self):
        """Exit current scope."""
        if len(self.symbol_table) > 1:
            self.symbol_table.pop()

    def declare_symbol(self, name, symbol_type):
        """Declare symbol in current scope."""
        if name in self.symbol_table[-1]:
            self.errors.append(f"Duplicate declaration: {name}")
            return False
        self.symbol_table[-1][name] = symbol_type
        return True

    def lookup_symbol(self, name):
        """Look up symbol in all scopes."""
        for scope in reversed(self.symbol_table):
            if name in scope:
                return scope[name]
        return None

    def analyze_program(self, ast):
        """Analyze complete program AST."""
        if ast['kind'] != 'Program':
            return False

        # Analyze each function
        for func in ast.get('functions', []):
            self.analyze_function(func)

        return len(self.errors) == 0

    def analyze_function(self, node):
        """Analyze function declaration."""
        func_name = node['name']
        param_types = [p['type'] for p in node.get('params', [])]
        return_type = node['return_type']

        # Declare function in global scope
        self.symbol_table[0][func_name] = {
            'kind': 'function',
            'params': param_types,
            'return_type': return_type
        }

        # Enter function scope
        self.current_function = return_type
        self.enter_scope()

        # Declare parameters
        for param in node.get('params', []):
            self.declare_symbol(param['name'], param['type'])

        # Analyze function body
        for stmt in node.get('body', []):
            self.analyze_statement(stmt)

        self.exit_scope()
        self.current_function = None

    def analyze_statement(self, node):
        """Analyze individual statement."""
        kind = node['kind']

        if kind == 'Return':
            expr_type = self.analyze_expression(node['expr'])
            if expr_type != self.current_function:
                self.errors.append(
                    f"Return type mismatch: expected {self.current_function}, got {expr_type}"
                )

        elif kind == 'Assignment':
            var_name = node['var']
            var_type = self.lookup_symbol(var_name)

            if var_type is None:
                self.errors.append(f"Undefined variable: {var_name}")
            else:
                expr_type = self.analyze_expression(node['expr'])
                if expr_type != var_type:
                    self.errors.append(
                        f"Type mismatch in assignment to {var_name}"
                    )

        elif kind == 'Declaration':
            self.declare_symbol(node['name'], node['type'])

    def analyze_expression(self, node):
        """Analyze expression and return its type."""
        kind = node['kind']

        if kind == 'Literal':
            return node['type']

        elif kind == 'Variable':
            var_type = self.lookup_symbol(node['name'])
            if var_type is None:
                self.errors.append(f"Undefined variable: {node['name']}")
                return None
            return var_type

        elif kind == 'BinaryOp':
            left_type = self.analyze_expression(node['left'])
            right_type = self.analyze_expression(node['right'])

            if left_type != right_type:
                self.errors.append("Type mismatch in binary operation")
                return None

            return left_type

        return None

# Test
analyzer = SemanticAnalyzer()
program = {
    'kind': 'Program',
    'functions': [
        {
            'kind': 'Function',
            'name': 'main',
            'params': [],
            'return_type': 'int',
            'body': [
                {'kind': 'Return', 'expr': {'kind': 'Literal', 'type': 'int', 'value': 0}}
            ]
        }
    ]
}
result = analyzer.analyze_program(program)
print(result)`,
    testCases: [
      { input: 'valid program', expectedOutput: 'True', isHidden: false, description: 'Program with no errors' },
      { input: 'undefined variable', expectedOutput: 'False', isHidden: false, description: 'Detect undefined variable use' },
      { input: 'type mismatch', expectedOutput: 'False', isHidden: true, description: 'Detect type errors' }
    ],
    hints: [
      'Use scope stack for nested symbol tables',
      'Analyze functions, statements, and expressions recursively',
      'Track current function for return type checking',
      'Collect all errors instead of stopping at first one'
    ],
    language: 'python'
  }
];
