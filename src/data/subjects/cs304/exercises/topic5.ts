import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'cs304-t5-ex01',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Simple Expression Code Generator',
    difficulty: 1,
    description: 'Implement a basic code generator that converts arithmetic expressions into three-address code instructions. Given an expression tree, generate a sequence of instructions.',
    starterCode: `class CodeGenerator:
    def __init__(self):
        self.temp_count = 0
        self.instructions = []

    def new_temp(self):
        """Generate a new temporary variable name."""
        temp = f"t{self.temp_count}"
        self.temp_count += 1
        return temp

    def generate(self, expr):
        """
        Generate code for an expression.
        expr is a dict with 'op' and 'left'/'right' for binary ops,
        or 'value' for constants.
        Returns the temporary variable holding the result.
        """
        # TODO: Implement code generation
        pass

# Example usage:
# gen = CodeGenerator()
# expr = {'op': '+', 'left': {'value': 5}, 'right': {'value': 3}}
# result = gen.generate(expr)
# print(gen.instructions)`,
    solution: `class CodeGenerator:
    def __init__(self):
        self.temp_count = 0
        self.instructions = []

    def new_temp(self):
        """Generate a new temporary variable name."""
        temp = f"t{self.temp_count}"
        self.temp_count += 1
        return temp

    def generate(self, expr):
        """
        Generate code for an expression.
        expr is a dict with 'op' and 'left'/'right' for binary ops,
        or 'value' for constants.
        Returns the temporary variable holding the result.
        """
        if 'value' in expr:
            # Constant value
            return str(expr['value'])

        # Binary operation
        left_result = self.generate(expr['left'])
        right_result = self.generate(expr['right'])
        temp = self.new_temp()

        self.instructions.append(f"{temp} = {left_result} {expr['op']} {right_result}")
        return temp`,
    testCases: [
      {
        input: `gen = CodeGenerator()
expr = {'op': '+', 'left': {'value': 5}, 'right': {'value': 3}}
result = gen.generate(expr)
print(','.join(gen.instructions))`,
        expectedOutput: 't0 = 5 + 3',
        isHidden: false,
        description: 'Simple addition'
      },
      {
        input: `gen = CodeGenerator()
expr = {'op': '*', 'left': {'op': '+', 'left': {'value': 2}, 'right': {'value': 3}}, 'right': {'value': 4}}
result = gen.generate(expr)
print(','.join(gen.instructions))`,
        expectedOutput: 't0 = 2 + 3,t1 = t0 * 4',
        isHidden: false,
        description: 'Nested expression (2 + 3) * 4'
      },
      {
        input: `gen = CodeGenerator()
expr = {'op': '-', 'left': {'op': '*', 'left': {'value': 5}, 'right': {'value': 6}}, 'right': {'op': '+', 'left': {'value': 2}, 'right': {'value': 1}}}
result = gen.generate(expr)
print(','.join(gen.instructions))`,
        isHidden: true,
        description: 'Complex expression (5 * 6) - (2 + 1)'
      }
    ],
    hints: [
      'Use recursion to handle nested expressions',
      'Generate code for left and right operands first',
      'Create a new temporary for each operation result',
      'For constants, return the value directly without creating a temporary'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex02',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Instruction Selection with Costs',
    difficulty: 2,
    description: 'Implement an instruction selector that chooses between multiple instruction patterns based on cost. Select the cheapest instruction sequence to implement operations.',
    starterCode: `class InstructionSelector:
    def __init__(self):
        self.instructions = []
        # Cost table: operation -> (instruction_template, cost)
        self.patterns = {
            'add_imm': ('ADD {dest}, {src}, #{imm}', 1),  # Add immediate
            'add_reg': ('ADD {dest}, {src1}, {src2}', 1),  # Add registers
            'load_imm': ('MOV {dest}, #{imm}', 1),  # Load immediate
            'load_add': ('LDR {dest}, [#{addr}]', 2),  # Load from memory then add
        }

    def select_add(self, dest, left, right):
        """
        Select best instruction(s) for addition.
        left and right can be registers or immediate values (dict with 'imm' key).
        Returns total cost.
        """
        # TODO: Implement instruction selection
        pass`,
    solution: `class InstructionSelector:
    def __init__(self):
        self.instructions = []
        # Cost table: operation -> (instruction_template, cost)
        self.patterns = {
            'add_imm': ('ADD {dest}, {src}, #{imm}', 1),  # Add immediate
            'add_reg': ('ADD {dest}, {src1}, {src2}', 1),  # Add registers
            'load_imm': ('MOV {dest}, #{imm}', 1),  # Load immediate
            'load_add': ('LDR {dest}, [#{addr}]', 2),  # Load from memory then add
        }

    def select_add(self, dest, left, right):
        """
        Select best instruction(s) for addition.
        left and right can be registers or immediate values (dict with 'imm' key).
        Returns total cost.
        """
        total_cost = 0

        # Both are registers
        if isinstance(left, str) and isinstance(right, str):
            template, cost = self.patterns['add_reg']
            self.instructions.append(template.format(dest=dest, src1=left, src2=right))
            total_cost = cost

        # Right is immediate
        elif isinstance(left, str) and isinstance(right, dict) and 'imm' in right:
            template, cost = self.patterns['add_imm']
            self.instructions.append(template.format(dest=dest, src=left, imm=right['imm']))
            total_cost = cost

        # Left is immediate
        elif isinstance(left, dict) and 'imm' in left and isinstance(right, str):
            template, cost = self.patterns['add_imm']
            self.instructions.append(template.format(dest=dest, src=right, imm=left['imm']))
            total_cost = cost

        # Both are immediates - need to load one first
        elif isinstance(left, dict) and isinstance(right, dict):
            template, cost = self.patterns['load_imm']
            temp = 'r_temp'
            self.instructions.append(template.format(dest=temp, imm=left['imm']))
            total_cost += cost

            template, cost = self.patterns['add_imm']
            self.instructions.append(template.format(dest=dest, src=temp, imm=right['imm']))
            total_cost += cost

        return total_cost`,
    testCases: [
      {
        input: `sel = InstructionSelector()
cost = sel.select_add('r0', 'r1', {'imm': 5})
print(cost)
print(sel.instructions[0])`,
        expectedOutput: '1\nADD r0, r1, #5',
        isHidden: false,
        description: 'Register + immediate'
      },
      {
        input: `sel = InstructionSelector()
cost = sel.select_add('r0', 'r1', 'r2')
print(cost)
print(sel.instructions[0])`,
        expectedOutput: '1\nADD r0, r1, r2',
        isHidden: false,
        description: 'Register + register'
      },
      {
        input: `sel = InstructionSelector()
cost = sel.select_add('r0', {'imm': 10}, {'imm': 20})
print(cost)
print(len(sel.instructions))`,
        isHidden: true,
        description: 'Two immediates (requires load first)'
      }
    ],
    hints: [
      'Check the types of operands to determine which pattern to use',
      'Immediate values are represented as dicts with an "imm" key',
      'When both operands are immediates, you need to load one into a register first',
      'Return the sum of costs for all instructions generated'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex03',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Basic Register Allocator',
    difficulty: 3,
    description: 'Implement a simple register allocator that assigns registers to variables using a linear scan approach. Handle register spilling when registers run out.',
    starterCode: `class RegisterAllocator:
    def __init__(self, num_registers=4):
        self.num_registers = num_registers
        self.allocation = {}  # variable -> register
        self.free_registers = [f"r{i}" for i in range(num_registers)]
        self.spilled = []  # variables that had to be spilled

    def allocate(self, variable, live_ranges):
        """
        Allocate a register for a variable.
        live_ranges: dict mapping variable -> (start, end) positions
        Returns the allocated register or 'SPILL' if no registers available.
        """
        # TODO: Implement register allocation
        pass

    def free(self, variable):
        """Free the register used by a variable."""
        # TODO: Implement register freeing
        pass`,
    solution: `class RegisterAllocator:
    def __init__(self, num_registers=4):
        self.num_registers = num_registers
        self.allocation = {}  # variable -> register
        self.free_registers = [f"r{i}" for i in range(num_registers)]
        self.spilled = []  # variables that had to be spilled

    def allocate(self, variable, live_ranges):
        """
        Allocate a register for a variable.
        live_ranges: dict mapping variable -> (start, end) positions
        Returns the allocated register or 'SPILL' if no registers available.
        """
        if variable in self.allocation:
            return self.allocation[variable]

        # Try to allocate a free register
        if self.free_registers:
            reg = self.free_registers.pop(0)
            self.allocation[variable] = reg
            return reg

        # No free registers - need to spill
        # Find a variable to spill (choose one with earliest end time that hasn't ended yet)
        current_pos = live_ranges[variable][0]
        spill_candidate = None
        earliest_end = float('inf')

        for var, reg in self.allocation.items():
            var_start, var_end = live_ranges.get(var, (0, float('inf')))
            if var_end < current_pos:
                # This variable's live range has ended, we can reuse its register
                spill_candidate = var
                break
            elif var_end < earliest_end:
                earliest_end = var_end
                spill_candidate = var

        if spill_candidate:
            # Spill the candidate and reuse its register
            reg = self.allocation[spill_candidate]
            del self.allocation[spill_candidate]
            self.spilled.append(spill_candidate)
            self.allocation[variable] = reg
            return reg

        # All registers in use with longer live ranges
        self.spilled.append(variable)
        return 'SPILL'

    def free(self, variable):
        """Free the register used by a variable."""
        if variable in self.allocation:
            reg = self.allocation[variable]
            del self.allocation[variable]
            self.free_registers.append(reg)`,
    testCases: [
      {
        input: `alloc = RegisterAllocator(num_registers=2)
live_ranges = {'a': (0, 5), 'b': (1, 3), 'c': (4, 8)}
r1 = alloc.allocate('a', live_ranges)
r2 = alloc.allocate('b', live_ranges)
print(f"{r1},{r2}")`,
        expectedOutput: 'r0,r1',
        isHidden: false,
        description: 'Simple allocation with available registers'
      },
      {
        input: `alloc = RegisterAllocator(num_registers=2)
live_ranges = {'a': (0, 5), 'b': (1, 3), 'c': (2, 8)}
r1 = alloc.allocate('a', live_ranges)
r2 = alloc.allocate('b', live_ranges)
r3 = alloc.allocate('c', live_ranges)
print(f"{r3}" if r3 == 'SPILL' else r3)`,
        isHidden: false,
        description: 'Allocation requiring spilling'
      },
      {
        input: `alloc = RegisterAllocator(num_registers=2)
live_ranges = {'a': (0, 2), 'b': (3, 5), 'c': (6, 8)}
r1 = alloc.allocate('a', live_ranges)
alloc.free('a')
r2 = alloc.allocate('b', live_ranges)
print(f"{r1},{r2}")`,
        isHidden: true,
        description: 'Register reuse after freeing'
      }
    ],
    hints: [
      'Keep track of which registers are free and which are allocated',
      'When all registers are in use, choose a variable to spill',
      'A good spilling heuristic is to spill the variable with the earliest end time',
      'Check if any allocated variables have already ended their live range'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex04',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Live Range Analysis',
    difficulty: 2,
    description: 'Implement live range analysis for variables in a sequence of three-address code instructions. Determine where each variable is live (defined and used).',
    starterCode: `def compute_live_ranges(instructions):
    """
    Compute live ranges for variables in three-address code.
    instructions: list of strings like "t0 = a + b"
    Returns: dict mapping variable -> (first_use, last_use) line numbers
    """
    # TODO: Implement live range analysis
    pass

# Example:
# instructions = ["t0 = a + b", "t1 = t0 * c", "d = t1 + t0"]
# Returns: {'a': (0, 0), 'b': (0, 0), 't0': (0, 2), 'c': (1, 1), 't1': (1, 2), 'd': (2, 2)}`,
    solution: `def compute_live_ranges(instructions):
    """
    Compute live ranges for variables in three-address code.
    instructions: list of strings like "t0 = a + b"
    Returns: dict mapping variable -> (first_use, last_use) line numbers
    """
    live_ranges = {}

    for i, instr in enumerate(instructions):
        # Parse instruction: "dest = operand1 op operand2" or "dest = operand"
        parts = instr.split('=')
        if len(parts) != 2:
            continue

        dest = parts[0].strip()
        expr = parts[1].strip()

        # Update destination variable
        if dest not in live_ranges:
            live_ranges[dest] = (i, i)
        else:
            live_ranges[dest] = (live_ranges[dest][0], i)

        # Extract and update operand variables
        # Simple tokenization: split by operators and spaces
        tokens = expr.replace('+', ' ').replace('-', ' ').replace('*', ' ').replace('/', ' ').split()

        for token in tokens:
            token = token.strip()
            # Check if it's a variable (not a number)
            if token and not token.isdigit():
                if token not in live_ranges:
                    live_ranges[token] = (i, i)
                else:
                    live_ranges[token] = (live_ranges[token][0], i)

    return live_ranges`,
    testCases: [
      {
        input: `instructions = ["t0 = a + b", "t1 = t0 * c", "d = t1 + t0"]
ranges = compute_live_ranges(instructions)
print(f"{ranges['t0'][0]},{ranges['t0'][1]}")`,
        expectedOutput: '0,2',
        isHidden: false,
        description: 'Variable t0 used from line 0 to 2'
      },
      {
        input: `instructions = ["x = 5 + 3", "y = x * 2", "z = y + x"]
ranges = compute_live_ranges(instructions)
print(len(ranges))`,
        expectedOutput: '3',
        isHidden: false,
        description: 'Count of variables'
      },
      {
        input: `instructions = ["a = b + c", "d = a + e", "f = d - a"]
ranges = compute_live_ranges(instructions)
print(f"{ranges['a'][0]},{ranges['a'][1]}")`,
        isHidden: true,
        description: 'Variable a live range'
      }
    ],
    hints: [
      'Track both definitions (left side of =) and uses (right side)',
      'For each variable, record the first and last line where it appears',
      'Parse instructions by splitting on operators to find all variables',
      'Numbers are not variables and should be ignored'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex05',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Graph Coloring Register Allocation',
    difficulty: 4,
    description: 'Implement register allocation using graph coloring. Build an interference graph and color it with K colors representing K registers.',
    starterCode: `class GraphColoringAllocator:
    def __init__(self, num_registers):
        self.num_registers = num_registers
        self.graph = {}  # adjacency list: variable -> set of interfering variables
        self.colors = {}  # variable -> register number
        self.spilled = []

    def add_interference(self, var1, var2):
        """Add an interference edge between two variables."""
        # TODO: Implement
        pass

    def color_graph(self):
        """
        Color the interference graph using greedy coloring.
        Returns dict mapping variable -> register number (0 to num_registers-1).
        Variables that can't be colored are added to self.spilled.
        """
        # TODO: Implement graph coloring
        pass`,
    solution: `class GraphColoringAllocator:
    def __init__(self, num_registers):
        self.num_registers = num_registers
        self.graph = {}  # adjacency list: variable -> set of interfering variables
        self.colors = {}  # variable -> register number
        self.spilled = []

    def add_interference(self, var1, var2):
        """Add an interference edge between two variables."""
        if var1 not in self.graph:
            self.graph[var1] = set()
        if var2 not in self.graph:
            self.graph[var2] = set()

        self.graph[var1].add(var2)
        self.graph[var2].add(var1)

    def color_graph(self):
        """
        Color the interference graph using greedy coloring.
        Returns dict mapping variable -> register number (0 to num_registers-1).
        Variables that can't be colored are added to self.spilled.
        """
        # Sort variables by degree (most constrained first)
        variables = sorted(self.graph.keys(),
                         key=lambda v: len(self.graph[v]),
                         reverse=True)

        for var in variables:
            # Find colors used by neighbors
            used_colors = set()
            for neighbor in self.graph[var]:
                if neighbor in self.colors:
                    used_colors.add(self.colors[neighbor])

            # Try to find an available color
            available = None
            for color in range(self.num_registers):
                if color not in used_colors:
                    available = color
                    break

            if available is not None:
                self.colors[var] = available
            else:
                # Can't color this variable - spill it
                self.spilled.append(var)

        return self.colors`,
    testCases: [
      {
        input: `alloc = GraphColoringAllocator(num_registers=3)
alloc.add_interference('a', 'b')
alloc.add_interference('b', 'c')
alloc.add_interference('a', 'c')
colors = alloc.color_graph()
print(len(set(colors.values())))`,
        expectedOutput: '3',
        isHidden: false,
        description: 'Triangle graph needs 3 colors'
      },
      {
        input: `alloc = GraphColoringAllocator(num_registers=2)
alloc.add_interference('a', 'b')
alloc.add_interference('c', 'd')
colors = alloc.color_graph()
print(len(colors))`,
        expectedOutput: '4',
        isHidden: false,
        description: 'Two independent edges need 2 colors'
      },
      {
        input: `alloc = GraphColoringAllocator(num_registers=2)
alloc.add_interference('a', 'b')
alloc.add_interference('b', 'c')
alloc.add_interference('c', 'a')
colors = alloc.color_graph()
print(len(alloc.spilled))`,
        isHidden: true,
        description: 'Triangle with only 2 registers requires spilling'
      }
    ],
    hints: [
      'Build an adjacency list representation of the interference graph',
      'Use a greedy coloring algorithm: assign the lowest available color to each node',
      'Sort variables by degree (number of interferences) to improve coloring',
      'If no color is available for a variable, it must be spilled'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex06',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Instruction Scheduling with Dependencies',
    difficulty: 3,
    description: 'Implement instruction scheduling that reorders instructions to minimize pipeline stalls while respecting data dependencies.',
    starterCode: `class InstructionScheduler:
    def __init__(self):
        self.dependencies = {}  # instruction_id -> list of dependency instruction_ids

    def add_dependency(self, instr_id, depends_on):
        """Add a dependency: instr_id depends on depends_on."""
        if instr_id not in self.dependencies:
            self.dependencies[instr_id] = []
        self.dependencies[instr_id].append(depends_on)

    def schedule(self, instructions):
        """
        Schedule instructions respecting dependencies.
        instructions: list of instruction IDs
        Returns: list of instruction IDs in scheduled order
        """
        # TODO: Implement topological sort for scheduling
        pass`,
    solution: `class InstructionScheduler:
    def __init__(self):
        self.dependencies = {}  # instruction_id -> list of dependency instruction_ids

    def add_dependency(self, instr_id, depends_on):
        """Add a dependency: instr_id depends on depends_on."""
        if instr_id not in self.dependencies:
            self.dependencies[instr_id] = []
        self.dependencies[instr_id].append(depends_on)

    def schedule(self, instructions):
        """
        Schedule instructions respecting dependencies.
        instructions: list of instruction IDs
        Returns: list of instruction IDs in scheduled order
        """
        # Initialize all instructions with empty dependencies if not present
        for instr in instructions:
            if instr not in self.dependencies:
                self.dependencies[instr] = []

        # Topological sort using Kahn's algorithm
        # Count incoming edges
        in_degree = {instr: 0 for instr in instructions}
        for instr in instructions:
            for dep in self.dependencies[instr]:
                if dep in in_degree:
                    in_degree[instr] += 1

        # Queue of instructions with no dependencies
        ready = [instr for instr in instructions if in_degree[instr] == 0]
        scheduled = []

        while ready:
            # Pick instruction with no dependencies
            current = ready.pop(0)
            scheduled.append(current)

            # Update in-degrees for instructions that depend on current
            for instr in instructions:
                if current in self.dependencies[instr]:
                    in_degree[instr] -= 1
                    if in_degree[instr] == 0 and instr not in scheduled:
                        ready.append(instr)

        return scheduled`,
    testCases: [
      {
        input: `scheduler = InstructionScheduler()
scheduler.add_dependency('i2', 'i1')
scheduler.add_dependency('i3', 'i1')
scheduled = scheduler.schedule(['i1', 'i2', 'i3'])
print(scheduled[0])`,
        expectedOutput: 'i1',
        isHidden: false,
        description: 'i1 must come first'
      },
      {
        input: `scheduler = InstructionScheduler()
scheduler.add_dependency('i2', 'i1')
scheduler.add_dependency('i3', 'i2')
scheduled = scheduler.schedule(['i1', 'i2', 'i3'])
print(','.join(scheduled))`,
        expectedOutput: 'i1,i2,i3',
        isHidden: false,
        description: 'Linear dependency chain'
      },
      {
        input: `scheduler = InstructionScheduler()
scheduler.add_dependency('i3', 'i1')
scheduler.add_dependency('i3', 'i2')
scheduled = scheduler.schedule(['i1', 'i2', 'i3'])
print(scheduled[2])`,
        isHidden: true,
        description: 'i3 depends on both i1 and i2'
      }
    ],
    hints: [
      'Use topological sorting to order instructions',
      'Kahn\'s algorithm works by repeatedly selecting nodes with no incoming edges',
      'Track the in-degree (number of dependencies) for each instruction',
      'Instructions with no dependencies can be scheduled first'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex07',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Stack Frame Layout Generator',
    difficulty: 2,
    description: 'Generate stack frame layout for a function, including space for local variables, parameters, and saved registers.',
    starterCode: `class StackFrameGenerator:
    def __init__(self, word_size=4):
        self.word_size = word_size  # bytes per word

    def generate_layout(self, num_params, local_vars, saved_regs):
        """
        Generate stack frame layout.
        num_params: number of parameters
        local_vars: list of (name, size_in_words) tuples
        saved_regs: list of register names to save

        Returns: dict with 'total_size' and 'offsets' (dict of name->offset from FP)
        """
        # TODO: Implement stack frame layout
        # Layout (growing downward):
        # - Parameters (above frame pointer)
        # - Saved registers
        # - Local variables
        pass`,
    solution: `class StackFrameGenerator:
    def __init__(self, word_size=4):
        self.word_size = word_size  # bytes per word

    def generate_layout(self, num_params, local_vars, saved_regs):
        """
        Generate stack frame layout.
        num_params: number of parameters
        local_vars: list of (name, size_in_words) tuples
        saved_regs: list of register names to save

        Returns: dict with 'total_size' and 'offsets' (dict of name->offset from FP)
        """
        offsets = {}
        current_offset = 0

        # Parameters are at positive offsets (above FP)
        for i in range(num_params):
            param_name = f"param{i}"
            offsets[param_name] = (i + 1) * self.word_size

        # Saved registers at negative offsets (below FP)
        for i, reg in enumerate(saved_regs):
            current_offset -= self.word_size
            offsets[reg] = current_offset

        # Local variables below saved registers
        for name, size_words in local_vars:
            current_offset -= size_words * self.word_size
            offsets[name] = current_offset

        # Total frame size is absolute value of most negative offset
        total_size = abs(current_offset)

        return {
            'total_size': total_size,
            'offsets': offsets
        }`,
    testCases: [
      {
        input: `gen = StackFrameGenerator(word_size=4)
layout = gen.generate_layout(2, [('x', 1), ('y', 1)], ['r1', 'r2'])
print(layout['total_size'])`,
        expectedOutput: '16',
        isHidden: false,
        description: '2 saved regs + 2 locals = 16 bytes'
      },
      {
        input: `gen = StackFrameGenerator(word_size=4)
layout = gen.generate_layout(1, [('arr', 4)], ['r1'])
print(layout['offsets']['arr'])`,
        expectedOutput: '-20',
        isHidden: false,
        description: 'Array offset below saved register'
      },
      {
        input: `gen = StackFrameGenerator(word_size=4)
layout = gen.generate_layout(3, [], [])
print(layout['offsets']['param1'])`,
        isHidden: true,
        description: 'Parameter offset above frame pointer'
      }
    ],
    hints: [
      'Parameters are at positive offsets from the frame pointer',
      'Saved registers and local variables are at negative offsets',
      'Allocate space in order: saved registers first, then local variables',
      'Total frame size is the sum of all space needed below the frame pointer'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex08',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Calling Convention Implementation',
    difficulty: 3,
    description: 'Implement code generation for function calls following a specific calling convention (caller-save vs callee-save registers).',
    starterCode: `class CallingConvention:
    def __init__(self):
        self.caller_save = ['r0', 'r1', 'r2']  # Caller must save these
        self.callee_save = ['r3', 'r4', 'r5']  # Callee must save these
        self.instructions = []

    def generate_call(self, function_name, args, live_regs):
        """
        Generate code for a function call.
        args: list of argument values
        live_regs: set of registers that are live across the call
        """
        # TODO: Generate caller-side code
        # 1. Save caller-save registers that are live
        # 2. Move arguments to parameter registers
        # 3. Call function
        # 4. Restore caller-save registers
        pass

    def generate_prologue(self, used_callee_save):
        """Generate function prologue saving callee-save registers."""
        # TODO: Save registers that the function will use
        pass

    def generate_epilogue(self, used_callee_save):
        """Generate function epilogue restoring callee-save registers."""
        # TODO: Restore saved registers
        pass`,
    solution: `class CallingConvention:
    def __init__(self):
        self.caller_save = ['r0', 'r1', 'r2']  # Caller must save these
        self.callee_save = ['r3', 'r4', 'r5']  # Callee must save these
        self.instructions = []

    def generate_call(self, function_name, args, live_regs):
        """
        Generate code for a function call.
        args: list of argument values
        live_regs: set of registers that are live across the call
        """
        # Save caller-save registers that are live
        saved = []
        for reg in self.caller_save:
            if reg in live_regs:
                self.instructions.append(f"PUSH {reg}")
                saved.append(reg)

        # Move arguments to parameter registers
        for i, arg in enumerate(args[:len(self.caller_save)]):
            self.instructions.append(f"MOV r{i}, {arg}")

        # Call function
        self.instructions.append(f"CALL {function_name}")

        # Restore caller-save registers in reverse order
        for reg in reversed(saved):
            self.instructions.append(f"POP {reg}")

    def generate_prologue(self, used_callee_save):
        """Generate function prologue saving callee-save registers."""
        for reg in used_callee_save:
            if reg in self.callee_save:
                self.instructions.append(f"PUSH {reg}")

    def generate_epilogue(self, used_callee_save):
        """Generate function epilogue restoring callee-save registers."""
        for reg in reversed(used_callee_save):
            if reg in self.callee_save:
                self.instructions.append(f"POP {reg}")`,
    testCases: [
      {
        input: `cc = CallingConvention()
cc.generate_call('foo', ['5', '10'], {'r0', 'r1'})
print(cc.instructions[0])`,
        expectedOutput: 'PUSH r0',
        isHidden: false,
        description: 'Save live caller-save registers'
      },
      {
        input: `cc = CallingConvention()
cc.generate_prologue(['r3', 'r4'])
print(len(cc.instructions))`,
        expectedOutput: '2',
        isHidden: false,
        description: 'Prologue saves 2 callee-save registers'
      },
      {
        input: `cc = CallingConvention()
cc.generate_call('bar', ['1', '2', '3'], {'r1'})
count = sum(1 for i in cc.instructions if 'MOV' in i)
print(count)`,
        isHidden: true,
        description: 'Count MOV instructions for arguments'
      }
    ],
    hints: [
      'Caller-save registers must be saved by the caller before the call',
      'Only save registers that are actually live across the call',
      'Use PUSH/POP to save/restore registers on the stack',
      'Restore registers in reverse order of saving'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex09',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Peephole Optimizer',
    difficulty: 2,
    description: 'Implement a peephole optimizer that applies local optimizations to a sequence of instructions (e.g., removing redundant loads/stores).',
    starterCode: `class PeepholeOptimizer:
    def optimize(self, instructions):
        """
        Apply peephole optimizations to instruction sequence.
        Optimizations:
        1. Remove redundant MOV: MOV r1, r1 -> (removed)
        2. Combine ADD+ADD: ADD r1, r1, #1; ADD r1, r1, #2 -> ADD r1, r1, #3
        3. Remove dead store: MOV r1, #5; MOV r1, #10 -> MOV r1, #10

        Returns: optimized instruction list
        """
        # TODO: Implement peephole optimizations
        pass`,
    solution: `class PeepholeOptimizer:
    def optimize(self, instructions):
        """
        Apply peephole optimizations to instruction sequence.
        Optimizations:
        1. Remove redundant MOV: MOV r1, r1 -> (removed)
        2. Combine ADD+ADD: ADD r1, r1, #1; ADD r1, r1, #2 -> ADD r1, r1, #3
        3. Remove dead store: MOV r1, #5; MOV r1, #10 -> MOV r1, #10

        Returns: optimized instruction list
        """
        optimized = []
        i = 0

        while i < len(instructions):
            instr = instructions[i]

            # Check for redundant MOV r, r
            if instr.startswith('MOV'):
                parts = instr.split(',')
                if len(parts) == 2:
                    dest = parts[0].replace('MOV', '').strip()
                    src = parts[1].strip()
                    if dest == src:
                        i += 1
                        continue  # Skip this instruction

            # Check for consecutive ADD to same register with immediates
            if i + 1 < len(instructions) and instr.startswith('ADD'):
                next_instr = instructions[i + 1]
                if next_instr.startswith('ADD'):
                    # Parse: ADD r1, r1, #N
                    parts1 = instr.split(',')
                    parts2 = next_instr.split(',')

                    if len(parts1) == 3 and len(parts2) == 3:
                        dest1 = parts1[0].replace('ADD', '').strip()
                        src1 = parts1[1].strip()
                        imm1 = parts1[2].strip()

                        dest2 = parts2[0].replace('ADD', '').strip()
                        src2 = parts2[1].strip()
                        imm2 = parts2[2].strip()

                        if (dest1 == dest2 == src1 == src2 and
                            imm1.startswith('#') and imm2.startswith('#')):
                            val1 = int(imm1[1:])
                            val2 = int(imm2[1:])
                            combined = f"ADD {dest1}, {src1}, #{val1 + val2}"
                            optimized.append(combined)
                            i += 2
                            continue

            # Check for dead store (consecutive MOV to same register)
            if i + 1 < len(instructions) and instr.startswith('MOV'):
                next_instr = instructions[i + 1]
                if next_instr.startswith('MOV'):
                    parts1 = instr.split(',')
                    parts2 = next_instr.split(',')

                    if len(parts1) == 2 and len(parts2) == 2:
                        dest1 = parts1[0].replace('MOV', '').strip()
                        dest2 = parts2[0].replace('MOV', '').strip()

                        if dest1 == dest2:
                            # Skip first MOV, keep second
                            i += 1
                            continue

            optimized.append(instr)
            i += 1

        return optimized`,
    testCases: [
      {
        input: `opt = PeepholeOptimizer()
result = opt.optimize(['MOV r1, r1', 'ADD r2, r3, #5'])
print(len(result))`,
        expectedOutput: '1',
        isHidden: false,
        description: 'Remove redundant MOV'
      },
      {
        input: `opt = PeepholeOptimizer()
result = opt.optimize(['ADD r1, r1, #5', 'ADD r1, r1, #3'])
print(result[0])`,
        expectedOutput: 'ADD r1, r1, #8',
        isHidden: false,
        description: 'Combine consecutive ADDs'
      },
      {
        input: `opt = PeepholeOptimizer()
result = opt.optimize(['MOV r1, #5', 'MOV r1, #10', 'ADD r1, r1, #1'])
print(len(result))`,
        isHidden: true,
        description: 'Remove dead store'
      }
    ],
    hints: [
      'Process instructions in sequence, looking for patterns',
      'For redundant MOV, check if source and destination are the same',
      'For ADD combining, check that both instructions use the same register',
      'For dead stores, check if consecutive instructions write to the same register'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex10',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Spill Code Generator',
    difficulty: 3,
    description: 'Generate spill code to save and restore variables to/from memory when registers are exhausted.',
    starterCode: `class SpillCodeGenerator:
    def __init__(self):
        self.spill_offset = 0  # Current offset in spill area
        self.spill_map = {}  # variable -> memory offset

    def allocate_spill_slot(self, variable):
        """Allocate a spill slot for a variable. Returns memory offset."""
        # TODO: Implement spill slot allocation
        pass

    def generate_spill(self, variable, register):
        """Generate code to spill variable from register to memory."""
        # TODO: Generate STORE instruction
        pass

    def generate_reload(self, variable, register):
        """Generate code to reload variable from memory to register."""
        # TODO: Generate LOAD instruction
        pass`,
    solution: `class SpillCodeGenerator:
    def __init__(self):
        self.spill_offset = 0  # Current offset in spill area
        self.spill_map = {}  # variable -> memory offset

    def allocate_spill_slot(self, variable):
        """Allocate a spill slot for a variable. Returns memory offset."""
        if variable not in self.spill_map:
            self.spill_map[variable] = self.spill_offset
            self.spill_offset += 4  # Assume 4-byte slots
        return self.spill_map[variable]

    def generate_spill(self, variable, register):
        """Generate code to spill variable from register to memory."""
        offset = self.allocate_spill_slot(variable)
        return f"STORE {register}, [SP + {offset}]"

    def generate_reload(self, variable, register):
        """Generate code to reload variable from memory to register."""
        if variable not in self.spill_map:
            raise ValueError(f"Variable {variable} has not been spilled")
        offset = self.spill_map[variable]
        return f"LOAD {register}, [SP + {offset}]"`,
    testCases: [
      {
        input: `gen = SpillCodeGenerator()
code = gen.generate_spill('x', 'r1')
print(code)`,
        expectedOutput: 'STORE r1, [SP + 0]',
        isHidden: false,
        description: 'First spill at offset 0'
      },
      {
        input: `gen = SpillCodeGenerator()
gen.generate_spill('x', 'r1')
gen.generate_spill('y', 'r2')
code = gen.generate_reload('x', 'r3')
print(code)`,
        expectedOutput: 'LOAD r3, [SP + 0]',
        isHidden: false,
        description: 'Reload previously spilled variable'
      },
      {
        input: `gen = SpillCodeGenerator()
gen.generate_spill('a', 'r1')
gen.generate_spill('b', 'r2')
offset_b = gen.spill_map['b']
print(offset_b)`,
        isHidden: true,
        description: 'Second variable at offset 4'
      }
    ],
    hints: [
      'Maintain a mapping from variables to their spill locations',
      'Allocate spill slots sequentially with a fixed size (e.g., 4 bytes)',
      'Use stack pointer (SP) relative addressing for spill locations',
      'Generate STORE instructions to save and LOAD instructions to reload'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex11',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Target-Specific Instruction Mapper',
    difficulty: 3,
    description: 'Map generic IR operations to target-specific machine instructions, handling different addressing modes and instruction variants.',
    starterCode: `class InstructionMapper:
    def __init__(self):
        # Target machine has these instruction formats:
        # ADD reg, reg, reg
        # ADD reg, reg, #imm
        # LOAD reg, [reg + #offset]
        # STORE reg, [reg + #offset]
        pass

    def map_binary_op(self, op, dest, left, right):
        """
        Map a binary operation to target instructions.
        Operands can be: {'reg': 'r0'}, {'imm': 5}, or {'mem': addr}
        Returns list of instructions.
        """
        # TODO: Implement mapping logic
        pass`,
    solution: `class InstructionMapper:
    def __init__(self):
        # Target machine has these instruction formats:
        # ADD reg, reg, reg
        # ADD reg, reg, #imm
        # LOAD reg, [reg + #offset]
        # STORE reg, [reg + #offset]
        pass

    def map_binary_op(self, op, dest, left, right):
        """
        Map a binary operation to target instructions.
        Operands can be: {'reg': 'r0'}, {'imm': 5}, or {'mem': addr}
        Returns list of instructions.
        """
        instructions = []

        # Handle different operand types
        left_reg = None
        right_reg = None

        # Load left operand
        if 'reg' in left:
            left_reg = left['reg']
        elif 'imm' in left:
            left_reg = 'temp0'
            instructions.append(f"MOV {left_reg}, #{left['imm']}")
        elif 'mem' in left:
            left_reg = 'temp0'
            instructions.append(f"LOAD {left_reg}, [{left['mem']}]")

        # Load right operand
        if 'reg' in right:
            right_reg = right['reg']
        elif 'imm' in right:
            # Can use immediate addressing mode
            instructions.append(f"{op.upper()} {dest}, {left_reg}, #{right['imm']}")
            return instructions
        elif 'mem' in right:
            right_reg = 'temp1'
            instructions.append(f"LOAD {right_reg}, [{right['mem']}]")

        # Generate the operation
        instructions.append(f"{op.upper()} {dest}, {left_reg}, {right_reg}")

        return instructions`,
    testCases: [
      {
        input: `mapper = InstructionMapper()
instrs = mapper.map_binary_op('add', 'r0', {'reg': 'r1'}, {'imm': 5})
print(instrs[-1])`,
        expectedOutput: 'ADD r0, r1, #5',
        isHidden: false,
        description: 'Register + immediate'
      },
      {
        input: `mapper = InstructionMapper()
instrs = mapper.map_binary_op('add', 'r0', {'imm': 10}, {'reg': 'r2'})
print(len(instrs))`,
        expectedOutput: '2',
        isHidden: false,
        description: 'Immediate needs to be loaded first'
      },
      {
        input: `mapper = InstructionMapper()
instrs = mapper.map_binary_op('add', 'r0', {'reg': 'r1'}, {'reg': 'r2'})
print(instrs[0])`,
        isHidden: true,
        description: 'Register + register'
      }
    ],
    hints: [
      'Check the type of each operand (register, immediate, or memory)',
      'Immediates can often be used directly in arithmetic instructions',
      'Memory operands need to be loaded into temporary registers first',
      'Build the instruction sequence step by step'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex12',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Basic Block Code Generator',
    difficulty: 4,
    description: 'Generate optimized code for a basic block by performing instruction selection and basic register allocation within the block.',
    starterCode: `class BasicBlockCodeGen:
    def __init__(self, num_registers=4):
        self.num_registers = num_registers
        self.instructions = []
        self.register_map = {}  # temp var -> register
        self.next_reg = 0

    def get_register(self, temp):
        """Allocate or retrieve register for a temporary variable."""
        # TODO: Implement register allocation within block
        pass

    def generate_code(self, three_address_code):
        """
        Generate machine code for a basic block.
        three_address_code: list of (dest, op, left, right) tuples
        """
        # TODO: Generate code with register allocation
        pass`,
    solution: `class BasicBlockCodeGen:
    def __init__(self, num_registers=4):
        self.num_registers = num_registers
        self.instructions = []
        self.register_map = {}  # temp var -> register
        self.next_reg = 0

    def get_register(self, temp):
        """Allocate or retrieve register for a temporary variable."""
        if temp not in self.register_map:
            if self.next_reg < self.num_registers:
                self.register_map[temp] = f"r{self.next_reg}"
                self.next_reg += 1
            else:
                # Simple strategy: reuse r0 when out of registers
                self.register_map[temp] = "r0"
        return self.register_map[temp]

    def generate_code(self, three_address_code):
        """
        Generate machine code for a basic block.
        three_address_code: list of (dest, op, left, right) tuples
        """
        for dest, op, left, right in three_address_code:
            # Get or allocate registers for operands
            if isinstance(left, str) and left.startswith('t'):
                left_reg = self.get_register(left)
            else:
                left_reg = str(left)

            if isinstance(right, str) and right.startswith('t'):
                right_reg = self.get_register(right)
            else:
                right_reg = str(right)

            # Allocate register for destination
            dest_reg = self.get_register(dest)

            # Generate instruction
            if str(right_reg).isdigit():
                # Immediate operand
                self.instructions.append(f"{op.upper()} {dest_reg}, {left_reg}, #{right_reg}")
            else:
                # Register operand
                self.instructions.append(f"{op.upper()} {dest_reg}, {left_reg}, {right_reg}")

        return self.instructions`,
    testCases: [
      {
        input: `gen = BasicBlockCodeGen(num_registers=4)
code = [('t0', 'add', 5, 3), ('t1', 'mul', 't0', 2)]
instrs = gen.generate_code(code)
print(len(instrs))`,
        expectedOutput: '2',
        isHidden: false,
        description: 'Two instructions generated'
      },
      {
        input: `gen = BasicBlockCodeGen(num_registers=4)
code = [('t0', 'add', 10, 20)]
instrs = gen.generate_code(code)
print(gen.register_map['t0'])`,
        expectedOutput: 'r0',
        isHidden: false,
        description: 't0 allocated to r0'
      },
      {
        input: `gen = BasicBlockCodeGen(num_registers=2)
code = [('t0', 'add', 1, 2), ('t1', 'add', 3, 4), ('t2', 'add', 't0', 't1')]
instrs = gen.generate_code(code)
print(len(instrs))`,
        isHidden: true,
        description: 'Multiple temporaries with limited registers'
      }
    ],
    hints: [
      'Maintain a mapping from temporary variables to registers',
      'Allocate registers sequentially until you run out',
      'Check if operands are temporaries or immediate values',
      'Use different instruction formats for immediate vs register operands'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex13',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Branch Optimization',
    difficulty: 2,
    description: 'Optimize conditional branches by inverting conditions and eliminating unnecessary jumps.',
    starterCode: `class BranchOptimizer:
    def optimize_branch_chain(self, instructions):
        """
        Optimize branch instructions.
        - Remove branches to next instruction
        - Invert conditions to eliminate jumps

        Instructions format: list of (label, instruction) tuples
        """
        # TODO: Implement branch optimizations
        pass`,
    solution: `class BranchOptimizer:
    def optimize_branch_chain(self, instructions):
        """
        Optimize branch instructions.
        - Remove branches to next instruction
        - Invert conditions to eliminate jumps

        Instructions format: list of (label, instruction) tuples
        """
        optimized = []

        for i, (label, instr) in enumerate(instructions):
            skip = False

            # Check for branch to next instruction
            if instr.startswith('JMP') or instr.startswith('BEQ') or instr.startswith('BNE'):
                parts = instr.split()
                if len(parts) == 2:
                    target = parts[1]

                    # Check if target is the next instruction
                    if i + 1 < len(instructions):
                        next_label = instructions[i + 1][0]
                        if target == next_label:
                            # Branch to next instruction - remove it
                            skip = True

            if not skip:
                optimized.append((label, instr))

        return optimized`,
    testCases: [
      {
        input: `opt = BranchOptimizer()
instrs = [('L1', 'ADD r0, r1, #1'), ('L2', 'JMP L3'), ('L3', 'MOV r2, r0')]
result = opt.optimize_branch_chain(instrs)
print(len(result))`,
        expectedOutput: '2',
        isHidden: false,
        description: 'Remove jump to next instruction'
      },
      {
        input: `opt = BranchOptimizer()
instrs = [('L1', 'BEQ L2'), ('L2', 'ADD r0, r1, #1')]
result = opt.optimize_branch_chain(instrs)
print(len(result))`,
        expectedOutput: '1',
        isHidden: false,
        description: 'Remove conditional branch to next'
      },
      {
        input: `opt = BranchOptimizer()
instrs = [('L1', 'JMP L5'), ('L2', 'ADD r0, #1'), ('L5', 'MOV r1, r0')]
result = opt.optimize_branch_chain(instrs)
print(len(result))`,
        isHidden: true,
        description: 'Keep jump to non-adjacent label'
      }
    ],
    hints: [
      'Check if a branch target is the immediately following instruction',
      'Compare the target label with the label of the next instruction',
      'Remove branches to the next instruction as they are redundant',
      'Preserve other branches that jump to non-adjacent locations'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex14',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Constant Pool Generator',
    difficulty: 2,
    description: 'Generate a constant pool for large immediate values that cannot be encoded directly in instructions.',
    starterCode: `class ConstantPoolGenerator:
    def __init__(self, max_immediate=255):
        self.max_immediate = max_immediate
        self.pool = {}  # value -> label
        self.pool_counter = 0

    def add_constant(self, value):
        """Add a constant to the pool if it's too large. Returns label or None."""
        # TODO: Check if value needs to go in pool
        # Return pool label if needed, None otherwise
        pass

    def generate_load(self, reg, value):
        """Generate instruction to load a value into a register."""
        # TODO: Use immediate or pool load based on value size
        pass`,
    solution: `class ConstantPoolGenerator:
    def __init__(self, max_immediate=255):
        self.max_immediate = max_immediate
        self.pool = {}  # value -> label
        self.pool_counter = 0

    def add_constant(self, value):
        """Add a constant to the pool if it's too large. Returns label or None."""
        if abs(value) <= self.max_immediate:
            return None  # Can use immediate encoding

        if value not in self.pool:
            label = f"CONST_{self.pool_counter}"
            self.pool[value] = label
            self.pool_counter += 1

        return self.pool[value]

    def generate_load(self, reg, value):
        """Generate instruction to load a value into a register."""
        label = self.add_constant(value)

        if label is None:
            # Small value - use immediate
            return f"MOV {reg}, #{value}"
        else:
            # Large value - load from pool
            return f"LDR {reg}, ={label}"`,
    testCases: [
      {
        input: `gen = ConstantPoolGenerator(max_immediate=255)
instr = gen.generate_load('r0', 100)
print(instr)`,
        expectedOutput: 'MOV r0, #100',
        isHidden: false,
        description: 'Small constant uses immediate'
      },
      {
        input: `gen = ConstantPoolGenerator(max_immediate=255)
instr = gen.generate_load('r0', 1000)
print(instr)`,
        expectedOutput: 'LDR r0, =CONST_0',
        isHidden: false,
        description: 'Large constant uses pool'
      },
      {
        input: `gen = ConstantPoolGenerator(max_immediate=255)
gen.generate_load('r0', 1000)
gen.generate_load('r1', 1000)
print(len(gen.pool))`,
        isHidden: true,
        description: 'Same constant reuses pool entry'
      }
    ],
    hints: [
      'Compare constant values against the maximum immediate value',
      'Create a unique label for each distinct large constant',
      'Reuse pool entries for the same constant value',
      'Use MOV for small values and LDR for pool references'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex15',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Condition Code Optimizer',
    difficulty: 3,
    description: 'Optimize the use of condition codes by eliminating redundant comparisons and reusing previously set flags.',
    starterCode: `class ConditionCodeOptimizer:
    def __init__(self):
        self.last_flags_set = None  # Track what last set the flags

    def optimize(self, instructions):
        """
        Optimize condition code usage.
        - Remove redundant CMP instructions
        - Track operations that set flags

        Instruction format: strings like "ADD r0, r1, r2", "CMP r0, #0", "BEQ L1"
        """
        # TODO: Implement optimization
        pass`,
    solution: `class ConditionCodeOptimizer:
    def __init__(self):
        self.last_flags_set = None  # Track what last set the flags

    def optimize(self, instructions):
        """
        Optimize condition code usage.
        - Remove redundant CMP instructions
        - Track operations that set flags

        Instruction format: strings like "ADD r0, r1, r2", "CMP r0, #0", "BEQ L1"
        """
        optimized = []

        for instr in instructions:
            parts = instr.split()
            op = parts[0]

            # Check for redundant CMP
            if op == 'CMP':
                # CMP sets flags based on comparison
                operands = ' '.join(parts[1:])

                # If the same comparison was just done, skip it
                if self.last_flags_set == ('CMP', operands):
                    continue  # Redundant comparison

                self.last_flags_set = ('CMP', operands)
                optimized.append(instr)

            # Arithmetic operations that set flags
            elif op in ['ADD', 'SUB', 'AND', 'OR']:
                # These operations set flags as a side effect
                # Extract destination register
                dest = parts[1].rstrip(',')
                self.last_flags_set = (op, dest)
                optimized.append(instr)

            # Branch instructions use flags but don't modify them
            elif op in ['BEQ', 'BNE', 'BLT', 'BGT']:
                optimized.append(instr)
                # Don't clear last_flags_set - flags are still valid

            # Other instructions may clobber flags
            else:
                self.last_flags_set = None
                optimized.append(instr)

        return optimized`,
    testCases: [
      {
        input: `opt = ConditionCodeOptimizer()
instrs = ['CMP r0, #0', 'BEQ L1', 'CMP r0, #0', 'BNE L2']
result = opt.optimize(instrs)
print(len(result))`,
        expectedOutput: '3',
        isHidden: false,
        description: 'Remove redundant second CMP'
      },
      {
        input: `opt = ConditionCodeOptimizer()
instrs = ['SUB r0, r1, r2', 'CMP r0, #0', 'BEQ L1']
result = opt.optimize(instrs)
print(len(result))`,
        expectedOutput: '3',
        isHidden: false,
        description: 'SUB sets flags but CMP is different comparison'
      },
      {
        input: `opt = ConditionCodeOptimizer()
instrs = ['CMP r0, #5', 'BEQ L1', 'ADD r1, r2, #1', 'CMP r0, #5']
result = opt.optimize(instrs)
print(len(result))`,
        isHidden: true,
        description: 'ADD clobbers flags, CMP needed again'
      }
    ],
    hints: [
      'Track what operation last set the condition flags',
      'Arithmetic operations like ADD and SUB set flags as a side effect',
      'Branch instructions use flags but don\'t modify them',
      'Remove consecutive identical CMP instructions'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t5-ex16',
    subjectId: 'cs304',
    topicId: 'cs304-topic-5',
    title: 'Advanced Register Coalescing',
    difficulty: 5,
    description: 'Implement register coalescing to reduce copy instructions by assigning the same register to variables connected by move operations.',
    starterCode: `class RegisterCoalescer:
    def __init__(self):
        self.copies = []  # List of (dest, src) copy operations
        self.interference = {}  # Interference graph
        self.coalesced = {}  # Variable -> coalesced representative

    def add_copy(self, dest, src):
        """Record a copy operation."""
        self.copies.append((dest, src))

    def add_interference(self, var1, var2):
        """Record that two variables interfere."""
        if var1 not in self.interference:
            self.interference[var1] = set()
        if var2 not in self.interference:
            self.interference[var2] = set()
        self.interference[var1].add(var2)
        self.interference[var2].add(var1)

    def can_coalesce(self, dest, src):
        """Check if dest and src can be coalesced (don't interfere)."""
        # TODO: Implement coalescing check
        pass

    def coalesce(self):
        """Perform register coalescing. Returns mapping of variables to coalesced names."""
        # TODO: Implement coalescing algorithm
        pass`,
    solution: `class RegisterCoalescer:
    def __init__(self):
        self.copies = []  # List of (dest, src) copy operations
        self.interference = {}  # Interference graph
        self.coalesced = {}  # Variable -> coalesced representative

    def add_copy(self, dest, src):
        """Record a copy operation."""
        self.copies.append((dest, src))

    def add_interference(self, var1, var2):
        """Record that two variables interfere."""
        if var1 not in self.interference:
            self.interference[var1] = set()
        if var2 not in self.interference:
            self.interference[var2] = set()
        self.interference[var1].add(var2)
        self.interference[var2].add(var1)

    def find_representative(self, var):
        """Find the coalesced representative for a variable."""
        if var not in self.coalesced:
            return var
        # Path compression
        if self.coalesced[var] != var:
            self.coalesced[var] = self.find_representative(self.coalesced[var])
        return self.coalesced[var]

    def can_coalesce(self, dest, src):
        """Check if dest and src can be coalesced (don't interfere)."""
        dest_rep = self.find_representative(dest)
        src_rep = self.find_representative(src)

        if dest_rep == src_rep:
            return False  # Already coalesced

        # Check if representatives interfere
        dest_neighbors = self.interference.get(dest_rep, set())
        src_neighbors = self.interference.get(src_rep, set())

        # Can coalesce if they don't interfere with each other
        if src_rep in dest_neighbors or dest_rep in src_neighbors:
            return False

        # Briggs' criterion: conservative coalescing
        # Can coalesce if the combined node has fewer than K high-degree neighbors
        # For simplicity, we'll just check direct interference
        return True

    def coalesce(self):
        """Perform register coalescing. Returns mapping of variables to coalesced names."""
        # Initialize coalesced mapping
        all_vars = set()
        for dest, src in self.copies:
            all_vars.add(dest)
            all_vars.add(src)
        for var in all_vars:
            self.coalesced[var] = var

        # Try to coalesce each copy
        for dest, src in self.copies:
            if self.can_coalesce(dest, src):
                dest_rep = self.find_representative(dest)
                src_rep = self.find_representative(src)

                # Union: make src point to dest
                self.coalesced[src_rep] = dest_rep

                # Merge interference edges
                if src_rep in self.interference:
                    if dest_rep not in self.interference:
                        self.interference[dest_rep] = set()
                    self.interference[dest_rep].update(self.interference[src_rep])

        # Build final mapping
        result = {}
        for var in all_vars:
            result[var] = self.find_representative(var)

        return result`,
    testCases: [
      {
        input: `coalescer = RegisterCoalescer()
coalescer.add_copy('a', 'b')
result = coalescer.coalesce()
print(result['a'] == result['b'])`,
        expectedOutput: 'True',
        isHidden: false,
        description: 'Non-interfering copy can be coalesced'
      },
      {
        input: `coalescer = RegisterCoalescer()
coalescer.add_copy('a', 'b')
coalescer.add_interference('a', 'b')
result = coalescer.coalesce()
print(result['a'] == result['b'])`,
        expectedOutput: 'False',
        isHidden: false,
        description: 'Interfering variables cannot be coalesced'
      },
      {
        input: `coalescer = RegisterCoalescer()
coalescer.add_copy('a', 'b')
coalescer.add_copy('b', 'c')
result = coalescer.coalesce()
print(result['a'] == result['c'])`,
        isHidden: true,
        description: 'Transitive coalescing'
      }
    ],
    hints: [
      'Use union-find to track coalesced variables',
      'Check if variables interfere before coalescing',
      'When coalescing, merge the interference edges of both variables',
      'Use path compression in find_representative for efficiency'
    ],
    language: 'python'
  }
];
