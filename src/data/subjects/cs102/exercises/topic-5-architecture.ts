import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID for backward compatibility
  {
    id: 'cs102-ex-5',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Simple CPU Simulator',
    difficulty: 4,
    description: 'Implement a simple CPU simulator that can execute basic instructions on a set of registers. Support operations: LOAD (load value to register), ADD (add two registers), and STORE (store register value).',
    starterCode: 'class SimpleCPU:\n    def __init__(self):\n        self.registers = {\'R0\': 0, \'R1\': 0, \'R2\': 0, \'R3\': 0}\n        self.memory = {}\n    \n    def execute(self, instruction):\n        # Your code here\n        pass\n    \n    def get_register(self, reg_name):\n        return self.registers.get(reg_name, 0)',
    testCases: [
      { input: 'cpu = SimpleCPU(); cpu.execute("LOAD R0 10"); cpu.get_register("R0")', expectedOutput: '10', isHidden: false, description: 'Load value into register' },
      { input: 'cpu = SimpleCPU(); cpu.execute("LOAD R0 5"); cpu.execute("LOAD R1 3"); cpu.execute("ADD R2 R0 R1"); cpu.get_register("R2")', expectedOutput: '8', isHidden: false, description: 'Add two registers' },
      { input: 'cpu = SimpleCPU(); cpu.execute("LOAD R0 15"); cpu.execute("LOAD R1 7"); cpu.execute("ADD R2 R0 R1"); cpu.get_register("R2")', expectedOutput: '22', isHidden: true, description: 'Complex addition operation' }
    ],
    hints: [
      'Split the instruction string into parts using split()',
      'The first part is the operation, remaining parts are operands',
      'For LOAD, the second part is the register and third is the value',
      'For ADD, second part is destination, third and fourth are source registers'
    ],
    solution: 'class SimpleCPU:\n    def __init__(self):\n        self.registers = {\'R0\': 0, \'R1\': 0, \'R2\': 0, \'R3\': 0}\n        self.memory = {}\n    \n    def execute(self, instruction):\n        parts = instruction.split()\n        operation = parts[0]\n        \n        if operation == \'LOAD\':\n            reg = parts[1]\n            value = int(parts[2])\n            self.registers[reg] = value\n        elif operation == \'ADD\':\n            dest = parts[1]\n            src1 = parts[2]\n            src2 = parts[3]\n            self.registers[dest] = self.registers[src1] + self.registers[src2]\n        elif operation == \'STORE\':\n            reg = parts[1]\n            addr = int(parts[2])\n            self.memory[addr] = self.registers[reg]\n    \n    def get_register(self, reg_name):\n        return self.registers.get(reg_name, 0)',
    language: 'python'
  },
  {
    id: 'cs102-t5-ex02',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Memory Simulator',
    difficulty: 1,
    description: 'Create a simple memory simulator that can read and write bytes to addresses.',
    starterCode: 'class Memory:\n    def __init__(self, size=256):\n        # Initialize memory array\n        # Your code here\n        pass\n    \n    def write(self, address, value):\n        # Write value at address\n        # Your code here\n        pass\n    \n    def read(self, address):\n        # Read value at address\n        # Your code here\n        pass\n\nmem = Memory()\nmem.write(0, 42)\nprint(mem.read(0))',
    solution: 'class Memory:\n    def __init__(self, size=256):\n        self.data = [0] * size\n    \n    def write(self, address, value):\n        if 0 <= address < len(self.data):\n            self.data[address] = value & 0xFF  # Keep byte range\n    \n    def read(self, address):\n        if 0 <= address < len(self.data):\n            return self.data[address]\n        return 0\n\nmem = Memory()\nmem.write(0, 42)\nprint(mem.read(0))',
    testCases: [
      { input: 'mem = Memory(); mem.write(0, 42); mem.read(0)', expectedOutput: '42', isHidden: false, description: 'Write and read' },
      { input: 'mem = Memory(); mem.read(10)', expectedOutput: '0', isHidden: false, description: 'Read uninitialized' },
      { input: 'mem = Memory(); mem.write(100, 255); mem.read(100)', expectedOutput: '255', isHidden: true, description: 'Write max byte value' }
    ],
    hints: [
      'Use a list to represent memory',
      'Check address bounds before read/write',
      'Bytes are 0-255 range'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t5-ex03',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Program Counter',
    difficulty: 1,
    description: 'Implement a program counter that tracks the current instruction address and supports increment and jump operations.',
    starterCode: 'class ProgramCounter:\n    def __init__(self):\n        # Your code here\n        pass\n    \n    def increment(self):\n        # Move to next instruction\n        pass\n    \n    def jump(self, address):\n        # Jump to specific address\n        pass\n    \n    def get_address(self):\n        # Return current address\n        pass\n\npc = ProgramCounter()\nprint(pc.get_address())\npc.increment()\nprint(pc.get_address())',
    solution: 'class ProgramCounter:\n    def __init__(self):\n        self.address = 0\n    \n    def increment(self):\n        self.address += 1\n    \n    def jump(self, address):\n        self.address = address\n    \n    def get_address(self):\n        return self.address\n\npc = ProgramCounter()\nprint(pc.get_address())\npc.increment()\nprint(pc.get_address())',
    testCases: [
      { input: 'pc = ProgramCounter(); pc.get_address()', expectedOutput: '0', isHidden: false, description: 'Initial value' },
      { input: 'pc = ProgramCounter(); pc.increment(); pc.get_address()', expectedOutput: '1', isHidden: false, description: 'After increment' },
      { input: 'pc = ProgramCounter(); pc.jump(100); pc.get_address()', expectedOutput: '100', isHidden: true, description: 'After jump' }
    ],
    hints: [
      'Start at address 0',
      'Increment adds 1 to address',
      'Jump sets address to new value'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t5-ex04',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'ALU Operations',
    difficulty: 2,
    description: 'Implement a simple ALU (Arithmetic Logic Unit) that supports basic operations: ADD, SUB, AND, OR, NOT.',
    starterCode: 'class ALU:\n    def execute(self, operation, operand1, operand2=None):\n        # Execute ALU operation\n        # Your code here\n        pass\n\nalu = ALU()\nprint(alu.execute("ADD", 5, 3))\nprint(alu.execute("NOT", 255))',
    solution: 'class ALU:\n    def execute(self, operation, operand1, operand2=None):\n        if operation == "ADD":\n            return operand1 + operand2\n        elif operation == "SUB":\n            return operand1 - operand2\n        elif operation == "AND":\n            return operand1 & operand2\n        elif operation == "OR":\n            return operand1 | operand2\n        elif operation == "NOT":\n            return ~operand1 & 0xFF  # 8-bit NOT\n        return 0\n\nalu = ALU()\nprint(alu.execute("ADD", 5, 3))\nprint(alu.execute("NOT", 255))',
    testCases: [
      { input: 'ALU().execute("ADD", 5, 3)', expectedOutput: '8', isHidden: false, description: '5 + 3 = 8' },
      { input: 'ALU().execute("SUB", 10, 4)', expectedOutput: '6', isHidden: false, description: '10 - 4 = 6' },
      { input: 'ALU().execute("AND", 12, 10)', expectedOutput: '8', isHidden: true, description: '12 AND 10 = 8' }
    ],
    hints: [
      'Use + for ADD, - for SUB',
      'Use & for AND, | for OR, ~ for NOT',
      'NOT operation may need masking for fixed bit width'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t5-ex05',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Fetch-Decode-Execute Cycle',
    difficulty: 3,
    description: 'Simulate the fetch-decode-execute cycle. Given a list of instructions in memory, fetch and execute them in sequence.',
    starterCode: 'class FDESimulator:\n    def __init__(self, program):\n        # program is a list of instructions\n        self.memory = program\n        self.pc = 0\n        self.registers = {\'R0\': 0, \'R1\': 0}\n    \n    def fetch(self):\n        # Return instruction at PC and increment PC\n        pass\n    \n    def decode_execute(self, instruction):\n        # Decode and execute the instruction\n        pass\n    \n    def run(self):\n        # Run until end of program\n        pass\n\nsim = FDESimulator(["LOAD R0 5", "LOAD R1 3", "ADD R0 R0 R1"])\nsim.run()\nprint(sim.registers["R0"])',
    solution: 'class FDESimulator:\n    def __init__(self, program):\n        self.memory = program\n        self.pc = 0\n        self.registers = {\'R0\': 0, \'R1\': 0}\n    \n    def fetch(self):\n        if self.pc < len(self.memory):\n            instruction = self.memory[self.pc]\n            self.pc += 1\n            return instruction\n        return None\n    \n    def decode_execute(self, instruction):\n        parts = instruction.split()\n        op = parts[0]\n        if op == "LOAD":\n            self.registers[parts[1]] = int(parts[2])\n        elif op == "ADD":\n            self.registers[parts[1]] = self.registers[parts[2]] + self.registers[parts[3]]\n    \n    def run(self):\n        while True:\n            instruction = self.fetch()\n            if instruction is None:\n                break\n            self.decode_execute(instruction)\n\nsim = FDESimulator(["LOAD R0 5", "LOAD R1 3", "ADD R0 R0 R1"])\nsim.run()\nprint(sim.registers["R0"])',
    testCases: [
      { input: 'sim = FDESimulator(["LOAD R0 5", "LOAD R1 3", "ADD R0 R0 R1"]); sim.run(); sim.registers["R0"]', expectedOutput: '8', isHidden: false, description: 'Simple program' },
      { input: 'sim = FDESimulator(["LOAD R0 10"]); sim.run(); sim.registers["R0"]', expectedOutput: '10', isHidden: true, description: 'Single instruction' }
    ],
    hints: [
      'Fetch: get instruction at PC, increment PC',
      'Decode: parse the instruction string',
      'Execute: perform the operation',
      'Loop until no more instructions'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t5-ex06',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Cache Simulator',
    difficulty: 3,
    description: 'Implement a simple direct-mapped cache with 4 entries. Track hits and misses.',
    starterCode: 'class Cache:\n    def __init__(self, size=4):\n        # Your code here\n        pass\n    \n    def access(self, address):\n        # Return (hit/miss, value)\n        # Your code here\n        pass\n    \n    def get_stats(self):\n        # Return (hits, misses)\n        pass\n\ncache = Cache()\ncache.access(0)\ncache.access(0)  # Should be hit\nprint(cache.get_stats())',
    solution: 'class Cache:\n    def __init__(self, size=4):\n        self.size = size\n        self.data = [None] * size\n        self.hits = 0\n        self.misses = 0\n    \n    def access(self, address):\n        index = address % self.size\n        if self.data[index] == address:\n            self.hits += 1\n            return ("hit", address)\n        else:\n            self.misses += 1\n            self.data[index] = address\n            return ("miss", address)\n    \n    def get_stats(self):\n        return (self.hits, self.misses)\n\ncache = Cache()\ncache.access(0)\ncache.access(0)\nprint(cache.get_stats())',
    testCases: [
      { input: 'c = Cache(); c.access(0); c.access(0); c.get_stats()', expectedOutput: '(1, 1)', isHidden: false, description: 'One hit, one miss' },
      { input: 'c = Cache(); c.access(0); c.access(4); c.access(0); c.get_stats()', expectedOutput: '(0, 3)', isHidden: true, description: 'Cache conflict' }
    ],
    hints: [
      'Direct-mapped: address % cache_size gives index',
      'If entry at index matches, it\'s a hit',
      'Otherwise, it\'s a miss and we update the cache'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t5-ex07',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Stack Machine',
    difficulty: 4,
    description: 'Implement a stack-based virtual machine that supports PUSH, POP, ADD, SUB operations.',
    starterCode: 'class StackMachine:\n    def __init__(self):\n        self.stack = []\n    \n    def execute(self, instruction):\n        # Execute instruction\n        # PUSH n - push n onto stack\n        # POP - pop top of stack\n        # ADD - pop two, push sum\n        # SUB - pop two, push difference\n        pass\n    \n    def top(self):\n        return self.stack[-1] if self.stack else None\n\nsm = StackMachine()\nsm.execute("PUSH 5")\nsm.execute("PUSH 3")\nsm.execute("ADD")\nprint(sm.top())',
    solution: 'class StackMachine:\n    def __init__(self):\n        self.stack = []\n    \n    def execute(self, instruction):\n        parts = instruction.split()\n        op = parts[0]\n        \n        if op == "PUSH":\n            self.stack.append(int(parts[1]))\n        elif op == "POP":\n            if self.stack:\n                return self.stack.pop()\n        elif op == "ADD":\n            if len(self.stack) >= 2:\n                b = self.stack.pop()\n                a = self.stack.pop()\n                self.stack.append(a + b)\n        elif op == "SUB":\n            if len(self.stack) >= 2:\n                b = self.stack.pop()\n                a = self.stack.pop()\n                self.stack.append(a - b)\n    \n    def top(self):\n        return self.stack[-1] if self.stack else None\n\nsm = StackMachine()\nsm.execute("PUSH 5")\nsm.execute("PUSH 3")\nsm.execute("ADD")\nprint(sm.top())',
    testCases: [
      { input: 'sm = StackMachine(); sm.execute("PUSH 5"); sm.execute("PUSH 3"); sm.execute("ADD"); sm.top()', expectedOutput: '8', isHidden: false, description: '5 + 3 = 8' },
      { input: 'sm = StackMachine(); sm.execute("PUSH 10"); sm.execute("PUSH 3"); sm.execute("SUB"); sm.top()', expectedOutput: '7', isHidden: true, description: '10 - 3 = 7' }
    ],
    hints: [
      'PUSH adds to top of stack',
      'ADD/SUB pop two operands, push result',
      'Order matters for subtraction'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t5-ex08',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'CPU with Branching',
    difficulty: 5,
    description: 'Extend the CPU simulator to support conditional branching: JMP (unconditional), JZ (jump if zero), JNZ (jump if not zero).',
    starterCode: 'class CPUWithBranching:\n    def __init__(self, program):\n        self.program = program\n        self.pc = 0\n        self.registers = {\'R0\': 0, \'R1\': 0, \'R2\': 0}\n        self.zero_flag = False\n    \n    def execute_instruction(self):\n        # Fetch and execute one instruction\n        # Your code here\n        pass\n    \n    def run(self):\n        while self.pc < len(self.program):\n            self.execute_instruction()\n\n# Program counts down from 3 to 0\nprog = ["LOAD R0 3", "SUB R0 R0 1", "JNZ 1", "HALT"]\ncpu = CPUWithBranching(prog)\ncpu.run()\nprint(cpu.registers["R0"])',
    solution: 'class CPUWithBranching:\n    def __init__(self, program):\n        self.program = program\n        self.pc = 0\n        self.registers = {\'R0\': 0, \'R1\': 0, \'R2\': 0}\n        self.zero_flag = False\n        self.halted = False\n    \n    def execute_instruction(self):\n        if self.pc >= len(self.program):\n            self.halted = True\n            return\n        \n        instruction = self.program[self.pc]\n        parts = instruction.split()\n        op = parts[0]\n        \n        if op == "LOAD":\n            self.registers[parts[1]] = int(parts[2])\n            self.pc += 1\n        elif op == "SUB":\n            val = self.registers[parts[2]] - int(parts[3])\n            self.registers[parts[1]] = val\n            self.zero_flag = (val == 0)\n            self.pc += 1\n        elif op == "JMP":\n            self.pc = int(parts[1])\n        elif op == "JZ":\n            if self.zero_flag:\n                self.pc = int(parts[1])\n            else:\n                self.pc += 1\n        elif op == "JNZ":\n            if not self.zero_flag:\n                self.pc = int(parts[1])\n            else:\n                self.pc += 1\n        elif op == "HALT":\n            self.halted = True\n    \n    def run(self):\n        while not self.halted and self.pc < len(self.program):\n            self.execute_instruction()\n\nprog = ["LOAD R0 3", "SUB R0 R0 1", "JNZ 1", "HALT"]\ncpu = CPUWithBranching(prog)\ncpu.run()\nprint(cpu.registers["R0"])',
    testCases: [
      { input: 'prog = ["LOAD R0 3", "SUB R0 R0 1", "JNZ 1", "HALT"]; cpu = CPUWithBranching(prog); cpu.run(); cpu.registers["R0"]', expectedOutput: '0', isHidden: false, description: 'Count down loop' },
      { input: 'prog = ["LOAD R0 0", "JZ 3", "LOAD R0 99", "HALT"]; cpu = CPUWithBranching(prog); cpu.run(); cpu.registers["R0"]', expectedOutput: '0', isHidden: true, description: 'Skip instruction with JZ' }
    ],
    hints: [
      'Use a zero flag updated after arithmetic',
      'JMP: set PC to address',
      'JZ: jump only if zero flag is set',
      'JNZ: jump only if zero flag is not set'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t5-ex09',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Direct-Mapped Cache Simulator',
    difficulty: 4,
    description: 'Simulate a tiny direct-mapped cache. Given a list of byte addresses, a cache size in lines, and a line size in bytes, return the number of hits and misses.',
    starterCode: '# Direct-mapped cache simulator\ndef cache_sim(addresses, num_lines, line_size):\n    # addresses: list of ints\n    # Return tuple (hits, misses)\n    pass\n\nprint(cache_sim([0, 4, 8, 0, 16, 4], num_lines=2, line_size=4))',
    solution: 'def cache_sim(addresses, num_lines, line_size):\n    cache_tags = [None] * num_lines\n    hits = misses = 0\n    for addr in addresses:\n        line_index = (addr // line_size) % num_lines\n        tag = addr // line_size\n        if cache_tags[line_index] == tag:\n            hits += 1\n        else:\n            misses += 1\n            cache_tags[line_index] = tag\n    return (hits, misses)\n\nprint(cache_sim([0, 4, 8, 0, 16, 4], num_lines=2, line_size=4))',
    testCases: [
      { input: '[0, 4, 8, 0, 16, 4], 2, 4', expectedOutput: '(2, 4)', isHidden: false, description: 'Hits on second 0 and second 4' },
      { input: '[0, 1, 2, 3, 4, 5, 6, 7], 1, 4', expectedOutput: '(0, 8)', isHidden: false, description: 'Single-line cache thrashes' },
      { input: '[0, 32, 0, 32], 4, 8', expectedOutput: '(2, 2)', isHidden: true, description: 'Alternating tags map to different lines' }
    ],
    hints: [
      'Line index = (address / line_size) mod num_lines.',
      'Tag = address / line_size (integer division).',
      'On miss, replace the line with the new tag.'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t5-ex10',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Instruction Trace Logger',
    difficulty: 3,
    description: 'Extend the simple CPU simulator to emit a trace of (pc, instruction) for each step. Return the trace list. Use the same instruction set as the earlier CPUWithBranching exercise.',
    starterCode: 'class TracingCPU:\n    def __init__(self, program):\n        self.program = program\n        self.pc = 0\n        self.registers = {\"R0\": 0, \"R1\": 0}\n        self.zero_flag = False\n        self.trace = []\n    \n    def step(self):\n        # Execute one instruction and log (pc, instruction)\n        pass\n    \n    def run(self):\n        while self.pc < len(self.program):\n            self.step()\n\nprog = [\"LOAD R0 2\", \"SUB R0 R0 1\", \"JNZ 1\", \"HALT\"]\ncpu = TracingCPU(prog)\ncpu.run()\nprint(cpu.trace)',
    solution: 'class TracingCPU:\n    def __init__(self, program):\n        self.program = program\n        self.pc = 0\n        self.registers = {\"R0\": 0, \"R1\": 0}\n        self.zero_flag = False\n        self.halted = False\n        self.trace = []\n    \n    def step(self):\n        if self.halted or self.pc >= len(self.program):\n            return\n        instr = self.program[self.pc]\n        self.trace.append((self.pc, instr))\n        parts = instr.split()\n        op = parts[0]\n        if op == \"LOAD\":\n            self.registers[parts[1]] = int(parts[2])\n            self.zero_flag = (self.registers[parts[1]] == 0)\n            self.pc += 1\n        elif op == \"SUB\":\n            dest, src, imm = parts[1], parts[2], int(parts[3])\n            self.registers[dest] = self.registers[src] - imm\n            self.zero_flag = (self.registers[dest] == 0)\n            self.pc += 1\n        elif op == \"JNZ\":\n            target = int(parts[1])\n            if not self.zero_flag:\n                self.pc = target\n            else:\n                self.pc += 1\n        elif op == \"HALT\":\n            self.halted = True\n        else:\n            self.pc += 1\n    \n    def run(self):\n        while not self.halted and self.pc < len(self.program):\n            self.step()\n\nprog = [\"LOAD R0 2\", \"SUB R0 R0 1\", \"JNZ 1\", \"HALT\"]\ncpu = TracingCPU(prog)\ncpu.run()\nprint(cpu.trace)',
    testCases: [
      { input: 'prog = ["LOAD R0 2", "SUB R0 R0 1", "JNZ 1", "HALT"]; cpu = TracingCPU(prog); cpu.run(); cpu.trace', expectedOutput: '[(0, "LOAD R0 2"), (1, "SUB R0 R0 1"), (2, "JNZ 1"), (1, "SUB R0 R0 1"), (2, "JNZ 1"), (3, "HALT")]', isHidden: false, description: 'Loop twice then halt' },
      { input: 'prog = ["LOAD R0 1", "SUB R0 R0 1", "JNZ 1", "HALT"]; cpu = TracingCPU(prog); cpu.run(); cpu.trace', expectedOutput: '[(0, "LOAD R0 1"), (1, "SUB R0 R0 1"), (2, "JNZ 1"), (3, "HALT")]', isHidden: true, description: 'Skip jump when zero' }
    ],
    hints: [
      'Log (pc, instruction) before executing it.',
      'Update zero_flag after arithmetic and loads.',
      'Stop on HALT or when pc runs off the end.'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t5-drill-1',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Program Counter Increment',
    difficulty: 1,
    description: 'Given a starting PC and instruction size (bytes), compute the next PC after sequential execution of n instructions.',
    starterCode: '# Compute next PC after n sequential instructions\ndef next_pc(start_pc, instr_size, n):\n    # Your code here\n    pass\n\nprint(next_pc(0, 4, 3))  # 12',
    solution: 'def next_pc(start_pc, instr_size, n):\n    return start_pc + instr_size * n\n\nprint(next_pc(0, 4, 3))',
    testCases: [
      { input: '0, 4, 3', expectedOutput: '12', isHidden: false, description: '3 instructions * 4 bytes' },
      { input: '100, 2, 5', expectedOutput: '110', isHidden: false, description: '5 short instructions' },
      { input: '16, 1, 0', expectedOutput: '16', isHidden: true, description: 'No instructions' }
    ],
    hints: [
      'Sequential execution just increments by instr_size each step.',
      'Arithmetic only.'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t5-drill-2',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Cycles vs Time',
    difficulty: 1,
    description: 'Given CPU frequency in MHz and number of cycles, return the elapsed time in microseconds.',
    starterCode: '# Convert cycles to microseconds\ndef cycles_to_us(cycles, mhz):\n    # Your code here\n    pass\n\nprint(cycles_to_us(10_000, 100))  # 100 us',
    solution: 'def cycles_to_us(cycles, mhz):\n    # period per cycle in microseconds = 1 / (mhz)\n    period_us = 1.0 / mhz\n    return cycles * period_us\n\nprint(cycles_to_us(10_000, 100))',
    testCases: [
      { input: '10000, 100', expectedOutput: '100.0', isHidden: false, description: '10k cycles at 100 MHz' },
      { input: '1, 50', expectedOutput: '0.02', isHidden: false, description: 'Single cycle' },
      { input: '500, 200', expectedOutput: '2.5', isHidden: true, description: '500 cycles' }
    ],
    hints: [
      '1 MHz = 1 cycle per microsecond.',
      'Time = cycles / (frequency in cycles per microsecond).'
    ],
    language: 'python'
  }
];
