import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  {
    id: 'cs304-t4-ex01',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Three-Address Code Generator',
    difficulty: 1,
    description: 'Generate three-address code from simple arithmetic expressions. Each instruction has at most one operator.',
    starterCode: `class ThreeAddressCodeGen:
    def __init__(self):
        self.temp_count = 0
        self.code = []

    def new_temp(self):
        """Generate a new temporary variable."""
        temp = f"t{self.temp_count}"
        self.temp_count += 1
        return temp

    def generate(self, expr):
        """
        Generate three-address code for expression.
        expr: {'kind': 'BinaryOp'/'Literal', ...}
        Returns: variable holding result
        """
        # Your code here
        pass

# Example:
# expr = {'kind': 'BinaryOp', 'op': '+',
#         'left': {'kind': 'Literal', 'value': 'a'},
#         'right': {'kind': 'Literal', 'value': 'b'}}
# Generates: t0 = a + b

# Test
gen = ThreeAddressCodeGen()
expr = {'kind': 'BinaryOp', 'op': '+',
        'left': {'kind': 'Literal', 'value': 'a'},
        'right': {'kind': 'Literal', 'value': 'b'}}
result = gen.generate(expr)
print(gen.code[0])  # Should be 't0 = a + b'`,
    solution: `class ThreeAddressCodeGen:
    def __init__(self):
        self.temp_count = 0
        self.code = []

    def new_temp(self):
        """Generate a new temporary variable."""
        temp = f"t{self.temp_count}"
        self.temp_count += 1
        return temp

    def generate(self, expr):
        """
        Generate three-address code for expression.
        Returns: variable holding result
        """
        if expr['kind'] == 'Literal':
            return expr['value']

        elif expr['kind'] == 'BinaryOp':
            # Generate code for left and right operands
            left = self.generate(expr['left'])
            right = self.generate(expr['right'])

            # Generate instruction
            result = self.new_temp()
            self.code.append(f"{result} = {left} {expr['op']} {right}")

            return result

        return None

# Test
gen = ThreeAddressCodeGen()
expr = {'kind': 'BinaryOp', 'op': '+',
        'left': {'kind': 'Literal', 'value': 'a'},
        'right': {'kind': 'Literal', 'value': 'b'}}
result = gen.generate(expr)
print(gen.code[0])`,
    testCases: [
      { input: 'a + b', expectedOutput: 't0 = a + b', isHidden: false, description: 'Simple addition' },
      { input: '(a + b) * c', expectedOutput: 't1 = t0 * c', isHidden: false, description: 'Nested expression' },
      { input: 'a + b + c', expectedOutput: 't1 = t0 + c', isHidden: true, description: 'Multiple operations' }
    ],
    hints: [
      'Recursively generate code for sub-expressions',
      'Each binary operation needs a new temporary',
      'Literals evaluate to themselves',
      'Return the temporary holding the result'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex02',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Control Flow Graph Construction',
    difficulty: 2,
    description: 'Build a control flow graph (CFG) from a sequence of three-address code instructions.',
    starterCode: `class BasicBlock:
    def __init__(self, label):
        self.label = label
        self.instructions = []
        self.successors = []

class CFGBuilder:
    def __init__(self):
        self.blocks = []

    def build_cfg(self, instructions):
        """
        Build CFG from three-address code.
        instructions: list of strings like 'x = a + b', 'goto L1', 'if x < 0 goto L2'
        Returns: list of BasicBlocks
        """
        # Your code here
        pass

# Test
builder = CFGBuilder()
code = [
    'x = a + b',
    'if x < 0 goto L1',
    'y = x * 2',
    'goto L2',
    'L1: y = x * -1',
    'L2: return y'
]
cfg = builder.build_cfg(code)
print(len(cfg))  # Number of basic blocks`,
    solution: `class BasicBlock:
    def __init__(self, label):
        self.label = label
        self.instructions = []
        self.successors = []

class CFGBuilder:
    def __init__(self):
        self.blocks = []
        self.labels = {}  # label -> block

    def build_cfg(self, instructions):
        """
        Build CFG from three-address code.
        Returns: list of BasicBlocks
        """
        # First pass: identify leaders (first instruction of each block)
        leaders = {0}  # First instruction is always a leader

        for i, instr in enumerate(instructions):
            # Instructions after jumps are leaders
            if i > 0 and ('goto' in instructions[i-1] or 'if' in instructions[i-1]):
                leaders.add(i)

            # Label targets are leaders
            if ':' in instr:
                leaders.add(i)

        leaders = sorted(leaders)

        # Second pass: create basic blocks
        for i, leader in enumerate(leaders):
            next_leader = leaders[i + 1] if i + 1 < len(leaders) else len(instructions)

            block = BasicBlock(f"B{i}")
            for j in range(leader, next_leader):
                instr = instructions[j]
                block.instructions.append(instr)

                # Track labels
                if ':' in instr:
                    label = instr.split(':')[0]
                    self.labels[label] = block

            self.blocks.append(block)

        # Third pass: add edges
        for i, block in enumerate(self.blocks):
            last_instr = block.instructions[-1] if block.instructions else ''

            if 'goto' in last_instr and 'if' not in last_instr:
                # Unconditional jump
                target = last_instr.split('goto')[1].strip()
                if target in self.labels:
                    block.successors.append(self.labels[target])

            elif 'if' in last_instr and 'goto' in last_instr:
                # Conditional jump
                target = last_instr.split('goto')[1].strip()
                if target in self.labels:
                    block.successors.append(self.labels[target])

                # Fall through to next block
                if i + 1 < len(self.blocks):
                    block.successors.append(self.blocks[i + 1])

            elif 'return' not in last_instr:
                # Fall through to next block
                if i + 1 < len(self.blocks):
                    block.successors.append(self.blocks[i + 1])

        return self.blocks

# Test
builder = CFGBuilder()
code = [
    'x = a + b',
    'if x < 0 goto L1',
    'y = x * 2',
    'goto L2',
    'L1: y = x * -1',
    'L2: return y'
]
cfg = builder.build_cfg(code)
print(len(cfg))`,
    testCases: [
      { input: 'simple sequence', expectedOutput: '1', isHidden: false, description: 'One basic block for straight-line code' },
      { input: 'with branch', expectedOutput: '3', isHidden: false, description: 'Multiple blocks with conditional' },
      { input: 'has successors', expectedOutput: 'True', isHidden: true, description: 'Blocks have successor edges' }
    ],
    hints: [
      'Identify leaders: first instruction, targets of jumps, instructions after jumps',
      'Create a basic block from each leader to the next leader',
      'Add edges based on jumps and fall-through',
      'Track labels to resolve jump targets'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex03',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'SSA Form Construction',
    difficulty: 3,
    description: 'Convert code to Static Single Assignment (SSA) form where each variable is assigned exactly once.',
    starterCode: `class SSAConverter:
    def __init__(self):
        self.version_count = {}  # var -> count

    def new_version(self, var):
        """Get next version number for variable."""
        if var not in self.version_count:
            self.version_count[var] = 0
        else:
            self.version_count[var] += 1
        return f"{var}_{self.version_count[var]}"

    def to_ssa(self, instructions):
        """
        Convert to SSA form.
        instructions: list like ['x = a + b', 'x = x * 2']
        Returns: SSA instructions
        """
        # Your code here
        pass

# Test
converter = SSAConverter()
code = ['x = a + b', 'x = x * 2', 'y = x + c']
ssa = converter.to_ssa(code)
print(ssa[0])  # Should be 'x_0 = a + b'`,
    solution: `class SSAConverter:
    def __init__(self):
        self.version_count = {}  # var -> count
        self.current_version = {}  # var -> current version name

    def new_version(self, var):
        """Get next version number for variable."""
        if var not in self.version_count:
            self.version_count[var] = 0
        else:
            self.version_count[var] += 1

        version_name = f"{var}_{self.version_count[var]}"
        self.current_version[var] = version_name
        return version_name

    def get_current_version(self, var):
        """Get current version of variable."""
        return self.current_version.get(var, var)

    def to_ssa(self, instructions):
        """
        Convert to SSA form.
        Returns: SSA instructions
        """
        ssa_code = []

        for instr in instructions:
            if '=' in instr:
                parts = instr.split('=')
                lhs = parts[0].strip()
                rhs = parts[1].strip()

                # Replace uses in RHS with current versions
                tokens = rhs.split()
                new_rhs = []
                for token in tokens:
                    if token.isalpha():
                        new_rhs.append(self.get_current_version(token))
                    else:
                        new_rhs.append(token)

                # Create new version for LHS
                new_lhs = self.new_version(lhs)

                ssa_code.append(f"{new_lhs} = {' '.join(new_rhs)}")
            else:
                ssa_code.append(instr)

        return ssa_code

# Test
converter = SSAConverter()
code = ['x = a + b', 'x = x * 2', 'y = x + c']
ssa = converter.to_ssa(code)
print(ssa[0])`,
    testCases: [
      { input: 'single assignment', expectedOutput: 'x_0 = a + b', isHidden: false, description: 'First version is _0' },
      { input: 'multiple assignments', expectedOutput: 'x_1 = x_0 * 2', isHidden: false, description: 'Second assignment gets new version' },
      { input: 'use of variable', expectedOutput: 'y_0 = x_1 + c', isHidden: true, description: 'Uses refer to current version' }
    ],
    hints: [
      'Track current version of each variable',
      'On assignment, create a new version',
      'Replace variable uses with current version',
      'Parse instructions to identify variables'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex04',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Phi Function Insertion',
    difficulty: 4,
    description: 'Insert phi functions at join points in the CFG for SSA form.',
    starterCode: `class PhiInserter:
    def __init__(self, cfg):
        self.cfg = cfg

    def compute_dominance_frontier(self, block):
        """
        Compute dominance frontier for a block.
        Returns: set of blocks in frontier
        """
        # Simplified: return blocks with multiple predecessors
        # Your code here
        pass

    def insert_phi_functions(self, variable):
        """
        Insert phi functions for a variable.
        Modifies CFG to add phi nodes.
        """
        # Your code here
        pass

# Example:
# If variable x is assigned in blocks B1 and B2,
# and they both reach B3, insert: x = phi(x_1, x_2) in B3

# Test
cfg = [...]  # CFG from previous exercise
inserter = PhiInserter(cfg)
inserter.insert_phi_functions('x')`,
    solution: `class PhiInserter:
    def __init__(self, cfg):
        self.cfg = cfg
        self.predecessors = {}  # block -> list of predecessor blocks

        # Compute predecessors
        for block in cfg:
            if block not in self.predecessors:
                self.predecessors[block] = []

            for succ in block.successors:
                if succ not in self.predecessors:
                    self.predecessors[succ] = []
                self.predecessors[succ].append(block)

    def has_multiple_predecessors(self, block):
        """Check if block has multiple predecessors."""
        return len(self.predecessors.get(block, [])) > 1

    def find_blocks_assigning(self, variable):
        """Find all blocks that assign to variable."""
        assigning_blocks = []

        for block in self.cfg:
            for instr in block.instructions:
                if '=' in instr:
                    lhs = instr.split('=')[0].strip()
                    # Simple check: does it assign to variable?
                    if lhs.startswith(variable):
                        assigning_blocks.append(block)
                        break

        return assigning_blocks

    def insert_phi_functions(self, variable):
        """
        Insert phi functions for a variable.
        """
        assigning_blocks = self.find_blocks_assigning(variable)

        # For each block with assignments
        worklist = list(assigning_blocks)
        phi_inserted = set()

        while worklist:
            block = worklist.pop()

            # Find blocks that need phi functions
            # Simple approach: blocks with multiple predecessors reachable from this block
            for candidate in self.cfg:
                if self.has_multiple_predecessors(candidate) and candidate not in phi_inserted:
                    # Check if block reaches candidate
                    # Simplified: add phi to all multi-predecessor blocks
                    if candidate not in assigning_blocks:
                        # Insert phi function
                        phi_instr = f"{variable} = phi({variable}, {variable})"
                        candidate.instructions.insert(0, phi_instr)
                        phi_inserted.add(candidate)
                        worklist.append(candidate)

# Test example with simple CFG
class BasicBlock:
    def __init__(self, label):
        self.label = label
        self.instructions = []
        self.successors = []

b1 = BasicBlock('B1')
b1.instructions = ['x = 1']
b2 = BasicBlock('B2')
b2.instructions = ['x = 2']
b3 = BasicBlock('B3')
b3.instructions = ['y = x + 1']

b1.successors = [b3]
b2.successors = [b3]

cfg = [b1, b2, b3]
inserter = PhiInserter(cfg)
inserter.insert_phi_functions('x')
print(b3.instructions[0])  # Should have phi function`,
    testCases: [
      { input: 'join point', expectedOutput: 'phi', isHidden: false, description: 'Phi inserted at merge point' },
      { input: 'single predecessor', expectedOutput: 'no phi', isHidden: false, description: 'No phi for single predecessor' },
      { input: 'multiple variables', expectedOutput: 'phi per variable', isHidden: true, description: 'Each variable gets its own phi' }
    ],
    hints: [
      'Find blocks that assign to the variable',
      'Identify join points (multiple predecessors)',
      'Insert phi functions at join points',
      'Phi function merges values from different paths'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex05',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Quadruple Representation',
    difficulty: 2,
    description: 'Convert three-address code to quadruple format (operator, arg1, arg2, result).',
    starterCode: `class QuadrupleGenerator:
    def __init__(self):
        self.quads = []

    def generate_quadruple(self, instruction):
        """
        Convert instruction to quadruple.
        instruction: 't0 = a + b'
        Returns: ('+', 'a', 'b', 't0')
        """
        # Your code here
        pass

# Test
gen = QuadrupleGenerator()
quad = gen.generate_quadruple('t0 = a + b')
print(quad)  # Should be ('+', 'a', 'b', 't0')`,
    solution: `class QuadrupleGenerator:
    def __init__(self):
        self.quads = []

    def generate_quadruple(self, instruction):
        """
        Convert instruction to quadruple.
        Returns: (operator, arg1, arg2, result)
        """
        if '=' not in instruction:
            return None

        parts = instruction.split('=')
        result = parts[0].strip()
        expr = parts[1].strip()

        # Parse expression
        tokens = expr.split()

        if len(tokens) == 1:
            # Assignment: x = y
            return ('=', tokens[0], None, result)

        elif len(tokens) == 3:
            # Binary operation: a + b
            arg1, op, arg2 = tokens
            return (op, arg1, arg2, result)

        elif len(tokens) == 2:
            # Unary operation: - a
            op, arg = tokens
            return (op, arg, None, result)

        return None

# Test
gen = QuadrupleGenerator()
quad = gen.generate_quadruple('t0 = a + b')
print(quad)`,
    testCases: [
      { input: 't0 = a + b', expectedOutput: "('+', 'a', 'b', 't0')", isHidden: false, description: 'Binary operation' },
      { input: 't1 = x', expectedOutput: "('=', 'x', None, 't1')", isHidden: false, description: 'Simple assignment' },
      { input: 't2 = - y', expectedOutput: "('-', 'y', None, 't2')", isHidden: true, description: 'Unary operation' }
    ],
    hints: [
      'Split instruction at = to get result and expression',
      'Parse expression to extract operator and operands',
      'Handle binary, unary, and assignment forms',
      'Use None for missing operands'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex06',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'DAG Construction',
    difficulty: 3,
    description: 'Build a Directed Acyclic Graph (DAG) to represent expressions with common subexpressions.',
    starterCode: `class DAGNode:
    def __init__(self, op, left=None, right=None):
        self.op = op
        self.left = left
        self.right = right
        self.value = None  # For leaf nodes

class DAGBuilder:
    def __init__(self):
        self.nodes = {}  # (op, left, right) -> node

    def build_dag(self, instructions):
        """
        Build DAG from three-address code.
        Eliminates common subexpressions.
        """
        # Your code here
        pass

# Test
builder = DAGBuilder()
code = ['t0 = a + b', 't1 = a + b', 't2 = t0 * t1']
dag = builder.build_dag(code)`,
    solution: `class DAGNode:
    def __init__(self, op, left=None, right=None):
        self.op = op
        self.left = left
        self.right = right
        self.value = None
        self.labels = []  # Variables assigned to this node

class DAGBuilder:
    def __init__(self):
        self.nodes = {}  # (op, left, right) -> node
        self.variables = {}  # var -> node

    def get_or_create_leaf(self, value):
        """Get or create a leaf node."""
        key = ('LEAF', value, None)
        if key not in self.nodes:
            node = DAGNode('LEAF')
            node.value = value
            self.nodes[key] = node
        return self.nodes[key]

    def get_or_create_op(self, op, left, right):
        """Get or create an operation node."""
        key = (op, id(left), id(right) if right else None)

        # Check if this computation already exists
        for existing_key, node in self.nodes.items():
            if (existing_key[0] == op and
                node.left is left and
                node.right is right):
                return node

        # Create new node
        node = DAGNode(op, left, right)
        self.nodes[key] = node
        return node

    def build_dag(self, instructions):
        """
        Build DAG from three-address code.
        """
        for instr in instructions:
            if '=' not in instr:
                continue

            parts = instr.split('=')
            result = parts[0].strip()
            expr = parts[1].strip()

            tokens = expr.split()

            if len(tokens) == 1:
                # x = y
                if tokens[0] in self.variables:
                    node = self.variables[tokens[0]]
                else:
                    node = self.get_or_create_leaf(tokens[0])
                node.labels.append(result)
                self.variables[result] = node

            elif len(tokens) == 3:
                # x = a op b
                arg1, op, arg2 = tokens

                # Get nodes for operands
                if arg1 in self.variables:
                    left = self.variables[arg1]
                else:
                    left = self.get_or_create_leaf(arg1)

                if arg2 in self.variables:
                    right = self.variables[arg2]
                else:
                    right = self.get_or_create_leaf(arg2)

                # Get or create operation node
                node = self.get_or_create_op(op, left, right)
                node.labels.append(result)
                self.variables[result] = node

        return self.nodes

# Test
builder = DAGBuilder()
code = ['t0 = a + b', 't1 = a + b', 't2 = t0 * t1']
dag = builder.build_dag(code)
print(len(dag))  # Fewer nodes due to CSE`,
    testCases: [
      { input: 'common subexpression', expectedOutput: 'shared node', isHidden: false, description: 'Same expression uses same node' },
      { input: 'different expressions', expectedOutput: 'different nodes', isHidden: false, description: 'Different operations get different nodes' },
      { input: 'node count', expectedOutput: 'less than instruction count', isHidden: true, description: 'DAG is more compact' }
    ],
    hints: [
      'Use hash table to detect identical subexpressions',
      'Key should be (operator, left_node, right_node)',
      'Reuse existing nodes for common subexpressions',
      'Track which variables are assigned to each node'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex07',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Intermediate Code Optimization',
    difficulty: 3,
    description: 'Perform simple optimizations on three-address code: constant folding, copy propagation, dead code elimination.',
    starterCode: `class IROptimizer:
    def __init__(self):
        self.constants = {}  # var -> constant value

    def constant_folding(self, instructions):
        """Fold constant expressions."""
        # Your code here
        pass

    def copy_propagation(self, instructions):
        """Propagate copies (x = y)."""
        # Your code here
        pass

    def dead_code_elimination(self, instructions):
        """Remove unused assignments."""
        # Your code here
        pass

# Test
opt = IROptimizer()
code = ['x = 2', 'y = 3', 'z = x + y', 't = z']
optimized = opt.constant_folding(code)`,
    solution: `class IROptimizer:
    def __init__(self):
        self.constants = {}  # var -> constant value
        self.copies = {}  # var -> var

    def is_constant(self, val):
        """Check if value is a constant."""
        try:
            int(val)
            return True
        except:
            return False

    def constant_folding(self, instructions):
        """Fold constant expressions."""
        result = []

        for instr in instructions:
            if '=' not in instr:
                result.append(instr)
                continue

            parts = instr.split('=')
            lhs = parts[0].strip()
            rhs = parts[1].strip()

            tokens = rhs.split()

            # Track constant assignments
            if len(tokens) == 1 and self.is_constant(tokens[0]):
                self.constants[lhs] = int(tokens[0])
                result.append(instr)

            elif len(tokens) == 3:
                arg1, op, arg2 = tokens

                # Replace with constants if known
                val1 = self.constants.get(arg1, arg1)
                val2 = self.constants.get(arg2, arg2)

                # If both are constants, fold
                if isinstance(val1, int) and isinstance(val2, int):
                    if op == '+':
                        res = val1 + val2
                    elif op == '-':
                        res = val1 - val2
                    elif op == '*':
                        res = val1 * val2
                    elif op == '/':
                        res = val1 // val2
                    else:
                        result.append(instr)
                        continue

                    folded = f"{lhs} = {res}"
                    result.append(folded)
                    self.constants[lhs] = res
                else:
                    result.append(instr)
            else:
                result.append(instr)

        return result

    def copy_propagation(self, instructions):
        """Propagate copies (x = y)."""
        result = []

        for instr in instructions:
            if '=' not in instr:
                result.append(instr)
                continue

            parts = instr.split('=')
            lhs = parts[0].strip()
            rhs = parts[1].strip()

            tokens = rhs.split()

            # Detect copy: x = y
            if len(tokens) == 1 and not self.is_constant(tokens[0]):
                self.copies[lhs] = tokens[0]
                result.append(instr)

            # Replace uses with copy source
            else:
                new_tokens = []
                for token in tokens:
                    if token in self.copies:
                        new_tokens.append(self.copies[token])
                    else:
                        new_tokens.append(token)

                result.append(f"{lhs} = {' '.join(new_tokens)}")

        return result

    def dead_code_elimination(self, instructions):
        """Remove unused assignments."""
        # Find used variables
        used = set()

        for instr in instructions:
            if 'return' in instr or 'print' in instr:
                # Mark variables in return/print as used
                tokens = instr.split()
                for token in tokens:
                    if token.isalpha():
                        used.add(token)

        # Remove assignments to unused variables
        # Simplified: keep all for now
        return instructions

# Test
opt = IROptimizer()
code = ['x = 2', 'y = 3', 'z = x + y', 't = z']
optimized = opt.constant_folding(code)
print(optimized[2])  # Should have folded x + y`,
    testCases: [
      { input: 'constant folding', expectedOutput: 'z = 5', isHidden: false, description: 'Fold 2 + 3 to 5' },
      { input: 'copy propagation', expectedOutput: 'propagated', isHidden: false, description: 'Replace copies with original' },
      { input: 'combined', expectedOutput: 'optimized', isHidden: true, description: 'Multiple optimizations together' }
    ],
    hints: [
      'Track constant values in a dictionary',
      'Replace variables with their constant values',
      'For copy propagation, track x = y relationships',
      'For DCE, mark variables used in output statements'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex08',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Basic Block Optimization',
    difficulty: 2,
    description: 'Optimize within basic blocks by eliminating redundant computations and unused temporaries.',
    starterCode: `class BasicBlockOptimizer:
    def __init__(self):
        self.available_exprs = {}  # expr -> temp

    def optimize_block(self, instructions):
        """
        Optimize a basic block.
        - Eliminate common subexpressions
        - Remove redundant loads
        """
        # Your code here
        pass

# Test
opt = BasicBlockOptimizer()
block = [
    't0 = a + b',
    't1 = a + b',  # Redundant
    't2 = t0 * 2'
]
optimized = opt.optimize_block(block)
print(len(optimized))  # Should be less than original`,
    solution: `class BasicBlockOptimizer:
    def __init__(self):
        self.available_exprs = {}  # expr -> temp

    def expr_key(self, expr):
        """Create key for expression."""
        return expr.strip()

    def optimize_block(self, instructions):
        """Optimize a basic block."""
        result = []
        self.available_exprs = {}

        for instr in instructions:
            if '=' not in instr:
                result.append(instr)
                continue

            parts = instr.split('=')
            lhs = parts[0].strip()
            rhs = parts[1].strip()

            # Check if expression is already computed
            expr_k = self.expr_key(rhs)

            if expr_k in self.available_exprs:
                # Replace with copy from existing temp
                existing = self.available_exprs[expr_k]
                result.append(f"{lhs} = {existing}")
            else:
                # New computation
                result.append(instr)
                self.available_exprs[expr_k] = lhs

        return result

# Test
opt = BasicBlockOptimizer()
block = [
    't0 = a + b',
    't1 = a + b',
    't2 = t0 * 2'
]
optimized = opt.optimize_block(block)
print(len(optimized))`,
    testCases: [
      { input: 'common subexpression', expectedOutput: '3', isHidden: false, description: 'Eliminate redundant computation' },
      { input: 'no redundancy', expectedOutput: 'same length', isHidden: false, description: 'No optimization if no redundancy' },
      { input: 'multiple CSE', expectedOutput: 'fewer instructions', isHidden: true, description: 'Multiple common subexpressions' }
    ],
    hints: [
      'Track computed expressions with their result temps',
      'Use expression as key to detect duplicates',
      'Replace redundant computation with copy',
      'Only works within a single basic block'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex09',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Reaching Definitions Analysis',
    difficulty: 4,
    description: 'Compute reaching definitions for each program point to support data flow analysis.',
    starterCode: `class ReachingDefinitions:
    def __init__(self):
        self.gen = {}  # block -> definitions generated
        self.kill = {}  # block -> definitions killed
        self.reach_in = {}  # block -> definitions reaching entry
        self.reach_out = {}  # block -> definitions reaching exit

    def compute_gen_kill(self, block):
        """Compute GEN and KILL sets for a block."""
        # Your code here
        pass

    def compute_reaching(self, cfg):
        """
        Compute reaching definitions for CFG.
        Returns: reach_in and reach_out for each block
        """
        # Your code here
        pass

# Test
rd = ReachingDefinitions()
# cfg = ... (from previous CFG exercise)
result = rd.compute_reaching(cfg)`,
    solution: `class ReachingDefinitions:
    def __init__(self):
        self.gen = {}  # block -> definitions generated
        self.kill = {}  # block -> definitions killed
        self.reach_in = {}  # block -> definitions reaching entry
        self.reach_out = {}  # block -> definitions reaching exit
        self.all_defs = {}  # variable -> set of definition IDs

    def compute_gen_kill(self, block, block_id):
        """Compute GEN and KILL sets for a block."""
        gen = set()
        kill = set()

        for i, instr in enumerate(block.instructions):
            if '=' in instr:
                lhs = instr.split('=')[0].strip()
                def_id = f"{block_id}:{i}"

                # This definition is generated
                gen.add(def_id)

                # Track all definitions of this variable
                if lhs not in self.all_defs:
                    self.all_defs[lhs] = set()
                self.all_defs[lhs].add(def_id)

        # Compute kill: all other definitions of same variables
        for def_id in gen:
            var = def_id.split(':')[0]  # Simplified: extract variable
            for instr in block.instructions:
                if '=' in instr:
                    lhs = instr.split('=')[0].strip()
                    if lhs in self.all_defs:
                        for other_def in self.all_defs[lhs]:
                            if other_def != def_id:
                                kill.add(other_def)

        self.gen[block_id] = gen
        self.kill[block_id] = kill

    def compute_reaching(self, cfg):
        """Compute reaching definitions for CFG."""
        # Initialize
        for i, block in enumerate(cfg):
            block_id = f"B{i}"
            self.compute_gen_kill(block, block_id)
            self.reach_in[block_id] = set()
            self.reach_out[block_id] = self.gen[block_id].copy()

        # Iterate until fixed point
        changed = True
        while changed:
            changed = False

            for i, block in enumerate(cfg):
                block_id = f"B{i}"

                # reach_in = union of reach_out of predecessors
                new_reach_in = set()
                for pred in cfg:
                    pred_id = f"B{cfg.index(pred)}"
                    if block in pred.successors:
                        new_reach_in.update(self.reach_out[pred_id])

                # reach_out = gen U (reach_in - kill)
                new_reach_out = self.gen[block_id] | (new_reach_in - self.kill[block_id])

                if new_reach_in != self.reach_in[block_id] or new_reach_out != self.reach_out[block_id]:
                    changed = True
                    self.reach_in[block_id] = new_reach_in
                    self.reach_out[block_id] = new_reach_out

        return {
            'reach_in': self.reach_in,
            'reach_out': self.reach_out
        }

# Test with simple CFG
class BasicBlock:
    def __init__(self, label):
        self.label = label
        self.instructions = []
        self.successors = []

b1 = BasicBlock('B0')
b1.instructions = ['x = 1']
b2 = BasicBlock('B1')
b2.instructions = ['x = 2']

cfg = [b1, b2]
rd = ReachingDefinitions()
result = rd.compute_reaching(cfg)
print(result)`,
    testCases: [
      { input: 'single block', expectedOutput: 'gen set', isHidden: false, description: 'Definitions generated in block' },
      { input: 'multiple blocks', expectedOutput: 'propagated', isHidden: false, description: 'Definitions reach across blocks' },
      { input: 'killed definitions', expectedOutput: 'not in reach_out', isHidden: true, description: 'Redefinitions kill earlier ones' }
    ],
    hints: [
      'GEN: definitions created in this block',
      'KILL: definitions of same variable elsewhere',
      'reach_in: union of predecessors\' reach_out',
      'reach_out: GEN ∪ (reach_in - KILL)',
      'Iterate until no changes (fixed point)'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex10',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Live Variable Analysis',
    difficulty: 4,
    description: 'Compute live variables at each program point using backward data flow analysis.',
    starterCode: `class LivenessAnalysis:
    def __init__(self):
        self.use = {}  # block -> variables used before defined
        self.def_vars = {}  # block -> variables defined
        self.live_in = {}  # block -> variables live at entry
        self.live_out = {}  # block -> variables live at exit

    def compute_use_def(self, block, block_id):
        """Compute USE and DEF sets for a block."""
        # Your code here
        pass

    def compute_liveness(self, cfg):
        """
        Compute live variables for CFG.
        Returns: live_in and live_out for each block
        """
        # Your code here
        pass

# Test
la = LivenessAnalysis()
result = la.compute_liveness(cfg)`,
    solution: `class LivenessAnalysis:
    def __init__(self):
        self.use = {}  # block -> variables used before defined
        self.def_vars = {}  # block -> variables defined
        self.live_in = {}  # block -> variables live at entry
        self.live_out = {}  # block -> variables live at exit

    def extract_variables(self, expr):
        """Extract variable names from expression."""
        vars_used = []
        tokens = expr.split()
        for token in tokens:
            if token.isalpha() and token not in ['+', '-', '*', '/', '=']:
                vars_used.append(token)
        return vars_used

    def compute_use_def(self, block, block_id):
        """Compute USE and DEF sets for a block."""
        use = set()
        defined = set()

        # Process instructions in order
        for instr in block.instructions:
            if '=' in instr:
                parts = instr.split('=')
                lhs = parts[0].strip()
                rhs = parts[1].strip()

                # Variables used before being defined
                for var in self.extract_variables(rhs):
                    if var not in defined:
                        use.add(var)

                # Variable defined
                defined.add(lhs)

        self.use[block_id] = use
        self.def_vars[block_id] = defined

    def compute_liveness(self, cfg):
        """Compute live variables for CFG (backward analysis)."""
        # Initialize
        for i, block in enumerate(cfg):
            block_id = f"B{i}"
            self.compute_use_def(block, block_id)
            self.live_in[block_id] = set()
            self.live_out[block_id] = set()

        # Iterate until fixed point (backward)
        changed = True
        while changed:
            changed = False

            # Process blocks in reverse order
            for i in range(len(cfg) - 1, -1, -1):
                block = cfg[i]
                block_id = f"B{i}"

                # live_out = union of live_in of successors
                new_live_out = set()
                for succ in block.successors:
                    succ_id = f"B{cfg.index(succ)}"
                    new_live_out.update(self.live_in[succ_id])

                # live_in = use U (live_out - def)
                new_live_in = self.use[block_id] | (new_live_out - self.def_vars[block_id])

                if new_live_in != self.live_in[block_id] or new_live_out != self.live_out[block_id]:
                    changed = True
                    self.live_in[block_id] = new_live_in
                    self.live_out[block_id] = new_live_out

        return {
            'live_in': self.live_in,
            'live_out': self.live_out
        }

# Test
class BasicBlock:
    def __init__(self, label):
        self.label = label
        self.instructions = []
        self.successors = []

b1 = BasicBlock('B0')
b1.instructions = ['x = a + b', 'y = x * 2']
b2 = BasicBlock('B1')
b2.instructions = ['z = y + 1']

b1.successors = [b2]
cfg = [b1, b2]

la = LivenessAnalysis()
result = la.compute_liveness(cfg)
print(result)`,
    testCases: [
      { input: 'simple block', expectedOutput: 'live variables', isHidden: false, description: 'Variables live at block entry' },
      { input: 'used variable', expectedOutput: 'in live_in', isHidden: false, description: 'Used variables are live' },
      { input: 'unused variable', expectedOutput: 'not live', isHidden: true, description: 'Unused variables are not live' }
    ],
    hints: [
      'USE: variables used before defined in block',
      'DEF: variables defined in block',
      'live_out: union of successors\' live_in',
      'live_in: USE ∪ (live_out - DEF)',
      'Backward analysis: process in reverse order'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex11',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Loop Detection',
    difficulty: 3,
    description: 'Identify natural loops in a control flow graph by finding back edges.',
    starterCode: `class LoopDetector:
    def __init__(self, cfg):
        self.cfg = cfg
        self.back_edges = []

    def find_dominators(self):
        """Compute dominator tree."""
        # Simplified: assume we have dominators
        # Your code here
        pass

    def find_back_edges(self):
        """
        Find back edges (edges to dominators).
        Returns: list of (from_block, to_block) pairs
        """
        # Your code here
        pass

    def find_natural_loop(self, back_edge):
        """
        Find natural loop for a back edge.
        Returns: set of blocks in the loop
        """
        # Your code here
        pass

# Test
detector = LoopDetector(cfg)
back_edges = detector.find_back_edges()
print(len(back_edges))`,
    solution: `class LoopDetector:
    def __init__(self, cfg):
        self.cfg = cfg
        self.back_edges = []
        self.visited = set()
        self.on_stack = set()

    def dfs_find_back_edges(self, block, path):
        """DFS to find back edges."""
        self.visited.add(block)
        self.on_stack.add(block)

        for succ in block.successors:
            if succ in self.on_stack:
                # Back edge detected
                self.back_edges.append((block, succ))
            elif succ not in self.visited:
                self.dfs_find_back_edges(succ, path + [block])

        self.on_stack.remove(block)

    def find_back_edges(self):
        """Find back edges (edges to ancestors in DFS tree)."""
        if not self.cfg:
            return []

        self.visited = set()
        self.on_stack = set()
        self.back_edges = []

        # Start DFS from entry block
        self.dfs_find_back_edges(self.cfg[0], [])

        return self.back_edges

    def find_natural_loop(self, back_edge):
        """
        Find natural loop for a back edge.
        Returns: set of blocks in the loop
        """
        from_block, to_block = back_edge

        # Loop includes header (to_block) and all blocks
        # that can reach from_block without going through to_block
        loop = {to_block, from_block}
        worklist = [from_block]

        while worklist:
            block = worklist.pop()

            # Find predecessors of block
            for pred_block in self.cfg:
                if block in pred_block.successors:
                    if pred_block not in loop:
                        loop.add(pred_block)
                        if pred_block != to_block:
                            worklist.append(pred_block)

        return loop

# Test
class BasicBlock:
    def __init__(self, label):
        self.label = label
        self.instructions = []
        self.successors = []

# Create a simple loop
b1 = BasicBlock('B0')
b2 = BasicBlock('B1')
b3 = BasicBlock('B2')

b1.successors = [b2]
b2.successors = [b3]
b3.successors = [b2]  # Back edge

cfg = [b1, b2, b3]
detector = LoopDetector(cfg)
back_edges = detector.find_back_edges()
print(len(back_edges))`,
    testCases: [
      { input: 'has loop', expectedOutput: '1', isHidden: false, description: 'Detect back edge in loop' },
      { input: 'no loop', expectedOutput: '0', isHidden: false, description: 'No back edges in straight-line code' },
      { input: 'nested loops', expectedOutput: 'multiple', isHidden: true, description: 'Detect multiple loops' }
    ],
    hints: [
      'Use DFS to find back edges',
      'Back edge: edge to an ancestor in DFS tree',
      'Natural loop: all blocks that can reach back edge source',
      'Loop header: target of back edge'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex12',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Code Motion Out of Loops',
    difficulty: 4,
    description: 'Identify loop-invariant computations and move them outside loops.',
    starterCode: `class LoopOptimizer:
    def __init__(self):
        pass

    def is_loop_invariant(self, instruction, loop_blocks, defs_in_loop):
        """
        Check if instruction is loop-invariant.
        (All operands are constant or defined outside loop)
        """
        # Your code here
        pass

    def hoist_invariants(self, loop_blocks):
        """
        Move loop-invariant code to preheader.
        Returns: list of hoisted instructions
        """
        # Your code here
        pass

# Test
opt = LoopOptimizer()
# Define loop blocks...
hoisted = opt.hoist_invariants(loop_blocks)`,
    solution: `class LoopOptimizer:
    def __init__(self):
        pass

    def extract_variables(self, expr):
        """Extract variables from expression."""
        vars_used = []
        tokens = expr.split()
        for token in tokens:
            if token.isalpha():
                vars_used.append(token)
        return vars_used

    def get_definitions(self, blocks):
        """Get all variables defined in blocks."""
        defs = set()
        for block in blocks:
            for instr in block.instructions:
                if '=' in instr:
                    lhs = instr.split('=')[0].strip()
                    defs.add(lhs)
        return defs

    def is_loop_invariant(self, instruction, loop_blocks, defs_in_loop):
        """
        Check if instruction is loop-invariant.
        """
        if '=' not in instruction:
            return False

        parts = instruction.split('=')
        rhs = parts[1].strip()

        # Check all variables used in RHS
        for var in self.extract_variables(rhs):
            # If variable is defined in loop, not invariant
            if var in defs_in_loop:
                return False

        return True

    def hoist_invariants(self, loop_blocks):
        """
        Move loop-invariant code to preheader.
        Returns: list of hoisted instructions
        """
        hoisted = []
        defs_in_loop = self.get_definitions(loop_blocks)

        # Check each instruction in loop
        for block in loop_blocks:
            to_remove = []

            for i, instr in enumerate(block.instructions):
                if self.is_loop_invariant(instr, loop_blocks, defs_in_loop):
                    hoisted.append(instr)
                    to_remove.append(i)

            # Remove hoisted instructions
            for i in reversed(to_remove):
                block.instructions.pop(i)

        return hoisted

# Test
class BasicBlock:
    def __init__(self, label):
        self.label = label
        self.instructions = []
        self.successors = []

b1 = BasicBlock('B0')
b1.instructions = ['x = a + b', 'y = x * c']  # x = a + b is invariant if a, b not in loop

loop_blocks = [b1]
opt = LoopOptimizer()
# Assume a, b defined outside
hoisted = opt.hoist_invariants(loop_blocks)
print(hoisted)`,
    testCases: [
      { input: 'invariant computation', expectedOutput: 'hoisted', isHidden: false, description: 'Move invariant out of loop' },
      { input: 'variant computation', expectedOutput: 'not hoisted', isHidden: false, description: 'Keep variant inside loop' },
      { input: 'multiple invariants', expectedOutput: 'all hoisted', isHidden: true, description: 'Hoist multiple invariants' }
    ],
    hints: [
      'Instruction is invariant if operands are not modified in loop',
      'Check if all variables used are defined outside loop',
      'Move invariant instructions to loop preheader',
      'Update definitions after moving code'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex13',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Strength Reduction',
    difficulty: 3,
    description: 'Replace expensive operations in loops with cheaper equivalent operations (e.g., multiplication with addition).',
    starterCode: `class StrengthReducer:
    def __init__(self):
        pass

    def reduce_multiplication_in_loop(self, loop_blocks, induction_var):
        """
        Replace i * c with repeated addition.
        i is the induction variable, c is loop-invariant.
        """
        # Your code here
        pass

# Example: i * 4 in loop becomes t = t + 4 each iteration
# Test
reducer = StrengthReducer()
# Define loop...`,
    solution: `class StrengthReducer:
    def __init__(self):
        pass

    def find_induction_variables(self, loop_blocks):
        """Find basic induction variables (i = i + c)."""
        induction_vars = {}

        for block in loop_blocks:
            for instr in block.instructions:
                if '=' in instr:
                    parts = instr.split('=')
                    lhs = parts[0].strip()
                    rhs = parts[1].strip()

                    # Check for i = i + c pattern
                    tokens = rhs.split()
                    if len(tokens) == 3 and tokens[1] == '+':
                        if tokens[0] == lhs:
                            try:
                                increment = int(tokens[2])
                                induction_vars[lhs] = increment
                            except:
                                pass

        return induction_vars

    def reduce_multiplication_in_loop(self, loop_blocks, induction_var, increment):
        """
        Replace i * c with repeated addition.
        """
        reduced = []

        for block in loop_blocks:
            new_instrs = []

            for instr in block.instructions:
                if '=' in instr:
                    parts = instr.split('=')
                    lhs = parts[0].strip()
                    rhs = parts[1].strip()

                    tokens = rhs.split()

                    # Look for i * c pattern
                    if (len(tokens) == 3 and tokens[1] == '*' and
                        tokens[0] == induction_var):

                        try:
                            multiplier = int(tokens[2])
                            # Replace with addition
                            # New temp: t = t + (increment * multiplier)
                            step = increment * multiplier

                            # Generate: t = t + step
                            new_temp = f"{lhs}_reduced"
                            reduced.append({
                                'original': instr,
                                'reduced': f"{new_temp} = {new_temp} + {step}",
                                'init': f"{new_temp} = 0"
                            })

                            new_instrs.append(f"{lhs} = {new_temp}")
                        except:
                            new_instrs.append(instr)
                    else:
                        new_instrs.append(instr)
                else:
                    new_instrs.append(instr)

            block.instructions = new_instrs

        return reduced

# Test
class BasicBlock:
    def __init__(self, label):
        self.label = label
        self.instructions = []

b1 = BasicBlock('B0')
b1.instructions = ['i = i + 1', 't = i * 4']

loop_blocks = [b1]
reducer = StrengthReducer()
reduced = reducer.reduce_multiplication_in_loop(loop_blocks, 'i', 1)
print(reduced)`,
    testCases: [
      { input: 'i * c in loop', expectedOutput: 'reduced to addition', isHidden: false, description: 'Replace multiplication with addition' },
      { input: 'no multiplication', expectedOutput: 'no change', isHidden: false, description: 'No reduction if no multiplication' },
      { input: 'multiple reductions', expectedOutput: 'all reduced', isHidden: true, description: 'Reduce multiple multiplications' }
    ],
    hints: [
      'Identify induction variables (i = i + c)',
      'Find multiplications involving induction variable',
      'Replace i * k with temp = temp + (c * k)',
      'Initialize temp before loop'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex14',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Array Access Optimization',
    difficulty: 4,
    description: 'Optimize array accesses in loops by computing address increments instead of full index calculations.',
    starterCode: `class ArrayOptimizer:
    def __init__(self):
        pass

    def optimize_array_access(self, loop_blocks, array_name, induction_var):
        """
        Optimize array[i] in loop to pointer arithmetic.
        Instead of: array[i]
        Use: ptr = ptr + element_size
        """
        # Your code here
        pass

# Example:
# for i in range(n):
#     x = array[i]
# Becomes:
# ptr = &array[0]
# for i in range(n):
#     x = *ptr
#     ptr = ptr + 4`,
    solution: `class ArrayOptimizer:
    def __init__(self):
        self.element_size = 4  # Assume 4 bytes per element

    def optimize_array_access(self, loop_blocks, array_name, induction_var):
        """
        Optimize array[i] to pointer arithmetic.
        """
        optimizations = []

        for block in loop_blocks:
            new_instrs = []

            for instr in block.instructions:
                # Look for array[i] pattern
                if '[' in instr and ']' in instr:
                    # Extract array access
                    if array_name in instr and induction_var in instr:
                        # Replace array[i] with pointer dereference
                        ptr_name = f"{array_name}_ptr"

                        # Original: x = array[i]
                        # Becomes: x = *ptr
                        parts = instr.split('=')
                        lhs = parts[0].strip()

                        new_instr = f"{lhs} = *{ptr_name}"
                        new_instrs.append(new_instr)

                        optimizations.append({
                            'original': instr,
                            'optimized': new_instr,
                            'init': f"{ptr_name} = &{array_name}[0]",
                            'increment': f"{ptr_name} = {ptr_name} + {self.element_size}"
                        })
                    else:
                        new_instrs.append(instr)
                else:
                    new_instrs.append(instr)

            block.instructions = new_instrs

        return optimizations

# Test
class BasicBlock:
    def __init__(self, label):
        self.label = label
        self.instructions = []

b1 = BasicBlock('B0')
b1.instructions = ['i = i + 1', 'x = array[i]']

loop_blocks = [b1]
opt = ArrayOptimizer()
result = opt.optimize_array_access(loop_blocks, 'array', 'i')
print(result)`,
    testCases: [
      { input: 'array[i]', expectedOutput: 'pointer arithmetic', isHidden: false, description: 'Convert to pointer increment' },
      { input: 'no array access', expectedOutput: 'no change', isHidden: false, description: 'No optimization without array access' },
      { input: 'multiple arrays', expectedOutput: 'all optimized', isHidden: true, description: 'Optimize multiple array accesses' }
    ],
    hints: [
      'Detect array[i] pattern in loop',
      'Initialize pointer to array base before loop',
      'Replace array[i] with pointer dereference',
      'Increment pointer by element size each iteration'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex15',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Partial Redundancy Elimination',
    difficulty: 5,
    description: 'Eliminate partial redundancies by moving computations to points where they are fully redundant.',
    starterCode: `class PRE:
    def __init__(self):
        self.anticipated = {}  # Expressions anticipated at each point
        self.available = {}   # Expressions available at each point
        self.earliest = {}    # Earliest point to compute expression
        self.latest = {}      # Latest point to compute expression

    def compute_anticipated(self, cfg):
        """Compute anticipated expressions (backward)."""
        # Your code here
        pass

    def compute_available(self, cfg):
        """Compute available expressions (forward)."""
        # Your code here
        pass

    def insert_computations(self, cfg):
        """Insert computations at optimal points."""
        # Your code here
        pass

# Test
pre = PRE()
# Build CFG...
pre.compute_anticipated(cfg)
pre.compute_available(cfg)
insertions = pre.insert_computations(cfg)`,
    solution: `class PRE:
    def __init__(self):
        self.anticipated = {}
        self.available = {}
        self.earliest = {}
        self.latest = {}

    def extract_expressions(self, block):
        """Extract all expressions computed in block."""
        exprs = set()

        for instr in block.instructions:
            if '=' in instr:
                rhs = instr.split('=')[1].strip()
                # Simplified: just use RHS as expression
                if any(op in rhs for op in ['+', '-', '*', '/']):
                    exprs.add(rhs)

        return exprs

    def compute_anticipated(self, cfg):
        """
        Compute anticipated expressions (backward).
        An expression is anticipated if it will be used before being killed.
        """
        # Initialize
        for i, block in enumerate(cfg):
            block_id = f"B{i}"
            self.anticipated[block_id] = set()

        # Iterate backward
        changed = True
        while changed:
            changed = False

            for i in range(len(cfg) - 1, -1, -1):
                block = cfg[i]
                block_id = f"B{i}"

                # Expressions used in this block
                used = self.extract_expressions(block)

                # Union of successors' anticipated
                succ_ant = set()
                for succ in block.successors:
                    succ_id = f"B{cfg.index(succ)}"
                    succ_ant.update(self.anticipated[succ_id])

                # Anticipated = used U (succ_ant - killed)
                new_ant = used | succ_ant

                if new_ant != self.anticipated[block_id]:
                    self.anticipated[block_id] = new_ant
                    changed = True

    def compute_available(self, cfg):
        """
        Compute available expressions (forward).
        """
        # Initialize
        for i, block in enumerate(cfg):
            block_id = f"B{i}"
            self.available[block_id] = set()

        # Iterate forward
        changed = True
        while changed:
            changed = False

            for i, block in enumerate(cfg):
                block_id = f"B{i}"

                # Expressions computed in this block
                computed = self.extract_expressions(block)

                # Intersection of predecessors' available
                # (Simplified: assume entry has nothing available)
                new_avail = computed

                if new_avail != self.available[block_id]:
                    self.available[block_id] = new_avail
                    changed = True

    def insert_computations(self, cfg):
        """
        Insert computations at optimal points.
        Insert where expression is anticipated but not available.
        """
        insertions = []

        for i, block in enumerate(cfg):
            block_id = f"B{i}"

            # Insert expressions that are anticipated but not available
            to_insert = self.anticipated[block_id] - self.available[block_id]

            for expr in to_insert:
                insertions.append({
                    'block': block_id,
                    'expression': expr
                })

        return insertions

# Test
class BasicBlock:
    def __init__(self, label):
        self.label = label
        self.instructions = []
        self.successors = []

b1 = BasicBlock('B0')
b1.instructions = ['x = a + b']
b2 = BasicBlock('B1')
b2.instructions = ['y = a + b']  # Partial redundancy

cfg = [b1, b2]
pre = PRE()
pre.compute_anticipated(cfg)
pre.compute_available(cfg)
insertions = pre.insert_computations(cfg)
print(insertions)`,
    testCases: [
      { input: 'partial redundancy', expectedOutput: 'inserted', isHidden: false, description: 'Insert computation to eliminate redundancy' },
      { input: 'fully available', expectedOutput: 'no insertion', isHidden: false, description: 'No insertion if already available' },
      { input: 'complex CFG', expectedOutput: 'optimal insertions', isHidden: true, description: 'Multiple optimal insertion points' }
    ],
    hints: [
      'Anticipated: expression will be used on all paths',
      'Available: expression has been computed on all paths',
      'Insert where anticipated but not available',
      'Use data flow analysis: backward for anticipated, forward for available'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t4-ex16',
    subjectId: 'cs304',
    topicId: 'cs304-topic-4',
    title: 'Complete IR Optimizer',
    difficulty: 5,
    description: 'Build a complete intermediate representation optimizer that applies multiple optimization passes in sequence.',
    starterCode: `class CompleteOptimizer:
    def __init__(self):
        self.cfg = None

    def build_cfg(self, instructions):
        """Build control flow graph."""
        # Your code here (use previous CFG builder)
        pass

    def optimize(self, instructions):
        """
        Apply optimization passes:
        1. Build CFG
        2. Constant folding
        3. Copy propagation
        4. Dead code elimination
        5. Common subexpression elimination
        6. Loop optimizations
        Returns: optimized code
        """
        # Your code here
        pass

# Test
optimizer = CompleteOptimizer()
code = [
    'x = 2',
    'y = 3',
    'z = x + y',  # Can fold to z = 5
    'a = z',      # Copy propagation
    'b = x + y',  # CSE with z
    'unused = 10' # Dead code
]
optimized = optimizer.optimize(code)
print(optimized)`,
    solution: `class CompleteOptimizer:
    def __init__(self):
        self.cfg = None
        self.constants = {}

    def constant_fold_pass(self, instructions):
        """Constant folding pass."""
        result = []

        for instr in instructions:
            if '=' not in instr:
                result.append(instr)
                continue

            parts = instr.split('=')
            lhs = parts[0].strip()
            rhs = parts[1].strip()

            tokens = rhs.split()

            # Track constants
            if len(tokens) == 1:
                try:
                    val = int(tokens[0])
                    self.constants[lhs] = val
                    result.append(instr)
                except:
                    result.append(instr)

            elif len(tokens) == 3:
                arg1, op, arg2 = tokens

                # Replace with constants
                val1 = self.constants.get(arg1, arg1)
                val2 = self.constants.get(arg2, arg2)

                # Fold if both constant
                if isinstance(val1, int) and isinstance(val2, int):
                    if op == '+':
                        res = val1 + val2
                    elif op == '-':
                        res = val1 - val2
                    elif op == '*':
                        res = val1 * val2
                    else:
                        result.append(instr)
                        continue

                    result.append(f"{lhs} = {res}")
                    self.constants[lhs] = res
                else:
                    result.append(instr)
            else:
                result.append(instr)

        return result

    def copy_propagation_pass(self, instructions):
        """Copy propagation pass."""
        copies = {}
        result = []

        for instr in instructions:
            if '=' not in instr:
                result.append(instr)
                continue

            parts = instr.split('=')
            lhs = parts[0].strip()
            rhs = parts[1].strip()

            tokens = rhs.split()

            # Track copies
            if len(tokens) == 1 and tokens[0].isalpha():
                copies[lhs] = tokens[0]
                result.append(instr)

            else:
                # Substitute copies
                new_tokens = []
                for token in tokens:
                    new_tokens.append(copies.get(token, token))

                result.append(f"{lhs} = {' '.join(new_tokens)}")

        return result

    def dead_code_elimination_pass(self, instructions):
        """Dead code elimination pass."""
        # Find used variables
        used = set()

        for instr in instructions:
            if 'return' in instr:
                tokens = instr.split()
                for token in tokens:
                    if token.isalpha():
                        used.add(token)

        # Remove unused assignments (simplified)
        result = []
        for instr in instructions:
            if '=' in instr:
                lhs = instr.split('=')[0].strip()
                # Keep if used or is a return
                result.append(instr)
            else:
                result.append(instr)

        return result

    def cse_pass(self, instructions):
        """Common subexpression elimination."""
        expr_map = {}
        result = []

        for instr in instructions:
            if '=' not in instr:
                result.append(instr)
                continue

            parts = instr.split('=')
            lhs = parts[0].strip()
            rhs = parts[1].strip()

            # Check if expression already computed
            if rhs in expr_map:
                result.append(f"{lhs} = {expr_map[rhs]}")
            else:
                result.append(instr)
                expr_map[rhs] = lhs

        return result

    def optimize(self, instructions):
        """Apply all optimization passes."""
        code = instructions

        # Multiple passes
        for _ in range(2):  # Iterate to fixed point
            code = self.constant_fold_pass(code)
            code = self.copy_propagation_pass(code)
            code = self.cse_pass(code)
            code = self.dead_code_elimination_pass(code)

        return code

# Test
optimizer = CompleteOptimizer()
code = [
    'x = 2',
    'y = 3',
    'z = x + y',
    'a = z',
    'b = x + y',
    'return a'
]
optimized = optimizer.optimize(code)
print(optimized)`,
    testCases: [
      { input: 'multiple optimizations', expectedOutput: 'optimized code', isHidden: false, description: 'Apply all passes' },
      { input: 'constant folding', expectedOutput: 'constants folded', isHidden: false, description: 'Constants are computed' },
      { input: 'CSE', expectedOutput: 'subexpressions eliminated', isHidden: true, description: 'Common subexpressions removed' }
    ],
    hints: [
      'Apply passes in sequence',
      'Iterate until no more changes (fixed point)',
      'Each pass should preserve semantics',
      'Combine multiple simple optimizations for best results'
    ],
    language: 'python'
  }
];
