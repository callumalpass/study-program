import type { Quiz } from '../../../core/types';

export const cs202Quizzes: Quiz[] = [
  // Topic 1: Instruction Set Architecture
  {
    id: 'cs202-topic1-quiz1',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    title: 'ISA Fundamentals',
    questions: [
      {
        id: 'cs202-t1-q1-1',
        type: 'multiple_choice',
        prompt: 'What is the primary purpose of an Instruction Set Architecture (ISA)?',
        options: [
          'To define the physical layout of transistors on a chip',
          'To specify the interface between software and hardware',
          'To determine the clock speed of a processor',
          'To manage memory allocation in the operating system'
        ],
        correctAnswer: 1,
        explanation: 'An ISA defines the abstract interface between software and hardware, specifying instructions, registers, memory model, and data types that programs can use.'
      },
      {
        id: 'cs202-t1-q1-2',
        type: 'multiple_choice',
        prompt: 'In a 32-bit MIPS R-format instruction, how many bits are allocated for the opcode field?',
        options: ['4 bits', '5 bits', '6 bits', '8 bits'],
        correctAnswer: 2,
        explanation: 'MIPS R-format instructions use 6 bits for the opcode field, which is used in conjunction with the funct field to specify the operation.'
      },
      {
        id: 'cs202-t1-q1-3',
        type: 'multiple_choice',
        prompt: 'Which addressing mode uses the instruction itself to contain the operand value?',
        options: ['Register addressing', 'Immediate addressing', 'Direct addressing', 'Indirect addressing'],
        correctAnswer: 1,
        explanation: 'Immediate addressing embeds the operand value directly in the instruction, requiring no memory access to fetch the operand.'
      },
      {
        id: 'cs202-t1-q1-4',
        type: 'multiple_choice',
        prompt: 'What distinguishes a load-store architecture from a memory-memory architecture?',
        options: [
          'Load-store has more registers',
          'Only load and store instructions can access memory',
          'Load-store uses virtual memory',
          'Memory-memory is faster'
        ],
        correctAnswer: 1,
        explanation: 'In a load-store architecture, arithmetic/logic operations only work with registers; memory access requires explicit load/store instructions.'
      },
      {
        id: 'cs202-t1-q1-5',
        type: 'multiple_choice',
        prompt: 'Which type of ISA design typically has fixed-length instructions?',
        options: ['CISC', 'RISC', 'Both equally', 'Neither'],
        correctAnswer: 1,
        explanation: 'RISC architectures typically use fixed-length instructions for simpler decoding and pipelining, while CISC often uses variable-length instructions.'
      },
    ],
  },
  {
    id: 'cs202-topic1-quiz2',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    title: 'Addressing Modes and Formats',
    questions: [
      {
        id: 'cs202-t1-q2-1',
        type: 'multiple_choice',
        prompt: 'In base+offset addressing, the effective address is calculated as:',
        options: [
          'Contents of base register only',
          'Offset value only',
          'Base register contents + offset',
          'Base register × offset'
        ],
        correctAnswer: 2,
        explanation: 'Base+offset (or displacement) addressing adds a constant offset to the contents of a base register to compute the effective address.'
      },
      {
        id: 'cs202-t1-q2-2',
        type: 'multiple_choice',
        prompt: 'What is the maximum immediate value that can be represented in a MIPS I-format instruction?',
        options: ['255', '65535', '32767 (signed)', 'Both B and C depending on interpretation'],
        correctAnswer: 3,
        explanation: 'The 16-bit immediate can represent 0-65535 unsigned or -32768 to +32767 signed, depending on how the instruction interprets it.'
      },
      {
        id: 'cs202-t1-q2-3',
        type: 'multiple_choice',
        prompt: 'PC-relative addressing is most commonly used for:',
        options: ['Loading constants', 'Array indexing', 'Branch instructions', 'Stack operations'],
        correctAnswer: 2,
        explanation: 'PC-relative addressing calculates the target address relative to the current PC, which is ideal for nearby branch targets.'
      },
      {
        id: 'cs202-t1-q2-4',
        type: 'multiple_choice',
        prompt: 'Which instruction format would MIPS use for the instruction "add $t0, $t1, $t2"?',
        options: ['R-format', 'I-format', 'J-format', 'Pseudo-format'],
        correctAnswer: 0,
        explanation: 'R-format is used for register-to-register operations like add, which specify three registers (rd, rs, rt).'
      },
      {
        id: 'cs202-t1-q2-5',
        type: 'multiple_choice',
        prompt: 'What is the purpose of the "funct" field in MIPS R-format instructions?',
        options: [
          'To specify the destination register',
          'To extend the opcode for more operation types',
          'To store immediate values',
          'To indicate branch conditions'
        ],
        correctAnswer: 1,
        explanation: 'The funct field provides additional opcode bits for R-format instructions, allowing the same opcode to specify different operations.'
      },
    ],
  },
  {
    id: 'cs202-topic1-quiz3',
    subjectId: 'cs202',
    topicId: 'cs202-topic1',
    title: 'CISC vs RISC and Modern ISAs',
    questions: [
      {
        id: 'cs202-t1-q3-1',
        type: 'multiple_choice',
        prompt: 'Which characteristic is typical of CISC architectures?',
        options: [
          'Fixed-length instructions',
          'Load-store only memory access',
          'Complex multi-cycle instructions',
          'Large register files'
        ],
        correctAnswer: 2,
        explanation: 'CISC architectures feature complex instructions that may take multiple cycles and can perform memory access with arithmetic operations.'
      },
      {
        id: 'cs202-t1-q3-2',
        type: 'multiple_choice',
        prompt: 'Modern x86 processors internally convert CISC instructions to:',
        options: ['Assembly code', 'Micro-operations (μops)', 'Bytecode', 'Machine code'],
        correctAnswer: 1,
        explanation: 'Modern x86 CPUs decode complex CISC instructions into simpler RISC-like micro-operations for efficient execution.'
      },
      {
        id: 'cs202-t1-q3-3',
        type: 'multiple_choice',
        prompt: 'ARM is classified as which type of architecture?',
        options: ['Pure CISC', 'Pure RISC', 'RISC-inspired', 'Hybrid memory-memory'],
        correctAnswer: 2,
        explanation: 'ARM is RISC-inspired with load-store design and fixed-length instructions, though newer versions add some complex instructions.'
      },
      {
        id: 'cs202-t1-q3-4',
        type: 'multiple_choice',
        prompt: 'What advantage does RISC-V being open-source provide?',
        options: [
          'Faster execution speed',
          'No licensing fees and customization freedom',
          'More instructions available',
          'Automatic compatibility with x86'
        ],
        correctAnswer: 1,
        explanation: 'RISC-V is open-source with no licensing fees, allowing anyone to implement and customize it without paying royalties.'
      },
      {
        id: 'cs202-t1-q3-5',
        type: 'multiple_choice',
        prompt: 'Why do RISC architectures typically use more instructions to accomplish the same task as CISC?',
        options: [
          'RISC compilers are less efficient',
          'RISC has simpler, more primitive instructions',
          'RISC has fewer registers',
          'RISC memory is slower'
        ],
        correctAnswer: 1,
        explanation: 'RISC uses simpler primitive instructions, so complex operations require multiple instructions, but each executes quickly.'
      },
    ],
  },

  // Topic 2: Assembly Language Programming
  {
    id: 'cs202-topic2-quiz1',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    title: 'Assembly Basics',
    questions: [
      {
        id: 'cs202-t2-q1-1',
        type: 'multiple_choice',
        prompt: 'In MIPS assembly, which register is conventionally used for the return address?',
        options: ['$v0', '$a0', '$ra', '$sp'],
        correctAnswer: 2,
        explanation: '$ra (register 31) holds the return address saved by jal instruction, used to return from procedure calls.'
      },
      {
        id: 'cs202-t2-q1-2',
        type: 'multiple_choice',
        prompt: 'What does the instruction "sll $t0, $t1, 2" accomplish?',
        options: [
          'Adds 2 to $t1 and stores in $t0',
          'Shifts $t1 left by 2 bits, stores in $t0',
          'Shifts $t1 right by 2 bits, stores in $t0',
          'Stores the value 2 in $t0'
        ],
        correctAnswer: 1,
        explanation: 'sll (shift left logical) shifts the bits of $t1 left by 2 positions (equivalent to multiplying by 4) and stores the result in $t0.'
      },
      {
        id: 'cs202-t2-q1-3',
        type: 'multiple_choice',
        prompt: 'Which directive is used to define a null-terminated string in MIPS assembly?',
        options: ['.word', '.byte', '.asciiz', '.space'],
        correctAnswer: 2,
        explanation: '.asciiz creates a null-terminated ASCII string (the z stands for zero-terminated), suitable for use with print_string syscall.'
      },
      {
        id: 'cs202-t2-q1-4',
        type: 'multiple_choice',
        prompt: 'What is the result of "andi $t0, $t1, 0xFF" if $t1 contains 0x12345678?',
        options: ['0x12345678', '0x00000078', '0x00000012', '0xFFFFFF78'],
        correctAnswer: 1,
        explanation: 'andi performs bitwise AND with the immediate value 0xFF, which masks out all but the lowest 8 bits, giving 0x78.'
      },
      {
        id: 'cs202-t2-q1-5',
        type: 'multiple_choice',
        prompt: 'In MIPS, what is the difference between "add" and "addu"?',
        options: [
          'add is for floating point, addu for integers',
          'add can cause overflow exception, addu cannot',
          'addu is unsigned and uses larger values',
          'There is no difference'
        ],
        correctAnswer: 1,
        explanation: 'add generates an overflow exception if the result overflows; addu (unsigned) does not trap on overflow.'
      },
    ],
  },
  {
    id: 'cs202-topic2-quiz2',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    title: 'Control Flow and Memory',
    questions: [
      {
        id: 'cs202-t2-q2-1',
        type: 'multiple_choice',
        prompt: 'What is the target address of "beq $t0, $t1, label" if PC=0x1000 and label is at offset +16?',
        options: ['0x1000', '0x1010', '0x1014', '0x1004'],
        correctAnswer: 2,
        explanation: 'beq calculates target as PC+4+(offset×4). With PC=0x1000 and offset=4 words (16 bytes), target is 0x1004+16=0x1014.'
      },
      {
        id: 'cs202-t2-q2-2',
        type: 'multiple_choice',
        prompt: 'Which instruction would you use to implement "if (a >= b)" where a is in $t0 and b is in $t1?',
        options: [
          'bge $t0, $t1, target (pseudo)',
          'slt $t2, $t0, $t1; beq $t2, $zero, target',
          'slt $t2, $t1, $t0; bne $t2, $zero, target',
          'Both B and C are correct'
        ],
        correctAnswer: 3,
        explanation: 'a >= b is equivalent to NOT(a < b). Both slt/beq and checking b < a work correctly for implementing this condition.'
      },
      {
        id: 'cs202-t2-q2-3',
        type: 'multiple_choice',
        prompt: 'To load a word from memory address 8($sp), which instruction is used?',
        options: ['lb $t0, 8($sp)', 'lw $t0, 8($sp)', 'sw $t0, 8($sp)', 'la $t0, 8($sp)'],
        correctAnswer: 1,
        explanation: 'lw (load word) loads a 32-bit word from the address computed as $sp + 8 into register $t0.'
      },
      {
        id: 'cs202-t2-q2-4',
        type: 'multiple_choice',
        prompt: 'In a for loop counting from 0 to N-1, which comparison is most efficient in MIPS?',
        options: [
          'Compare i == N',
          'Compare i < N',
          'Compare i != N',
          'Compare i >= N'
        ],
        correctAnswer: 2,
        explanation: 'Using bne (branch if not equal) for i != N is efficient as MIPS has a native bne instruction; less-than requires slt.'
      },
      {
        id: 'cs202-t2-q2-5',
        type: 'multiple_choice',
        prompt: 'What does the "lui" instruction do?',
        options: [
          'Loads a byte from memory',
          'Loads immediate into upper 16 bits of register',
          'Performs unsigned comparison',
          'Links to a subroutine'
        ],
        correctAnswer: 1,
        explanation: 'lui (load upper immediate) loads a 16-bit value into the upper half of a register, setting the lower 16 bits to zero.'
      },
    ],
  },
  {
    id: 'cs202-topic2-quiz3',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    title: 'Procedures and System Calls',
    questions: [
      {
        id: 'cs202-t2-q3-1',
        type: 'multiple_choice',
        prompt: 'Which registers must a callee save before using (callee-saved)?',
        options: [
          '$t0-$t9',
          '$s0-$s7',
          '$a0-$a3',
          '$v0-$v1'
        ],
        correctAnswer: 1,
        explanation: '$s0-$s7 are callee-saved registers; if a function uses them, it must save and restore their original values.'
      },
      {
        id: 'cs202-t2-q3-2',
        type: 'multiple_choice',
        prompt: 'What happens to the stack pointer during a typical function prologue?',
        options: [
          'It increases (moves to higher addresses)',
          'It decreases (moves to lower addresses)',
          'It stays the same',
          'It is reset to zero'
        ],
        correctAnswer: 1,
        explanation: 'The stack grows downward in MIPS, so the stack pointer decreases to allocate space for local variables and saved registers.'
      },
      {
        id: 'cs202-t2-q3-3',
        type: 'multiple_choice',
        prompt: 'To print an integer using MIPS syscall, which value should be in $v0?',
        options: ['1', '4', '5', '10'],
        correctAnswer: 0,
        explanation: 'Syscall code 1 prints the integer in $a0. Code 4 prints string, 5 reads integer, 10 exits program.'
      },
      {
        id: 'cs202-t2-q3-4',
        type: 'multiple_choice',
        prompt: 'In a recursive function, what must always be saved on the stack?',
        options: [
          'Only local variables',
          'Only the return address',
          'Return address and any registers the function modifies',
          'All 32 registers'
        ],
        correctAnswer: 2,
        explanation: 'A recursive function must save $ra (for nested calls) and any caller-saved registers it needs to preserve across the recursive call.'
      },
      {
        id: 'cs202-t2-q3-5',
        type: 'multiple_choice',
        prompt: 'What is the purpose of the frame pointer ($fp)?',
        options: [
          'To store function return values',
          'To provide a stable reference to the stack frame',
          'To count function arguments',
          'To store the global pointer'
        ],
        correctAnswer: 1,
        explanation: 'The frame pointer provides a stable base for accessing local variables and parameters, even as $sp changes within the function.'
      },
    ],
  },

  // Topic 3: CPU Datapath and Control
  {
    id: 'cs202-topic3-quiz1',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    title: 'Datapath Components',
    questions: [
      {
        id: 'cs202-t3-q1-1',
        type: 'multiple_choice',
        prompt: 'Which datapath component is responsible for calculating the next instruction address?',
        options: ['ALU', 'PC adder', 'Register file', 'Memory unit'],
        correctAnswer: 1,
        explanation: 'The PC adder (typically adds 4 to PC for sequential execution) calculates the next instruction address.'
      },
      {
        id: 'cs202-t3-q1-2',
        type: 'multiple_choice',
        prompt: 'In a single-cycle datapath, when is the register file written?',
        options: [
          'At the beginning of the cycle',
          'During the middle of the cycle',
          'At the end of the cycle (falling edge)',
          'It is never written'
        ],
        correctAnswer: 2,
        explanation: 'The register file is written at the end of the cycle on the falling clock edge, after all computations are complete.'
      },
      {
        id: 'cs202-t3-q1-3',
        type: 'multiple_choice',
        prompt: 'What is the purpose of the sign-extend unit in the datapath?',
        options: [
          'To extend registers to 64 bits',
          'To convert 16-bit immediates to 32 bits',
          'To handle negative memory addresses',
          'To extend the opcode field'
        ],
        correctAnswer: 1,
        explanation: 'The sign-extend unit converts 16-bit immediate values to 32 bits by replicating the sign bit.'
      },
      {
        id: 'cs202-t3-q1-4',
        type: 'multiple_choice',
        prompt: 'How many read ports does a typical MIPS register file have?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        explanation: 'The MIPS register file has 2 read ports (for rs and rt) and 1 write port (for rd), supporting R-type instructions.'
      },
      {
        id: 'cs202-t3-q1-5',
        type: 'multiple_choice',
        prompt: 'Which multiplexer selects between immediate and register as the second ALU input?',
        options: ['PC mux', 'RegDst mux', 'ALUSrc mux', 'MemToReg mux'],
        correctAnswer: 2,
        explanation: 'The ALUSrc multiplexer selects whether the second ALU operand comes from a register or the sign-extended immediate.'
      },
    ],
  },
  {
    id: 'cs202-topic3-quiz2',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    title: 'Control Unit Design',
    questions: [
      {
        id: 'cs202-t3-q2-1',
        type: 'multiple_choice',
        prompt: 'What input does the main control unit use to generate control signals?',
        options: ['Register values', 'ALU result', 'Opcode field', 'Memory data'],
        correctAnswer: 2,
        explanation: 'The main control unit decodes the opcode (bits 31-26) to determine which control signals to assert.'
      },
      {
        id: 'cs202-t3-q2-2',
        type: 'multiple_choice',
        prompt: 'For an R-type instruction, what should the RegDst control signal be?',
        options: ['0 (use rt)', '1 (use rd)', 'Don\'t care', 'Depends on funct'],
        correctAnswer: 1,
        explanation: 'R-type instructions write to rd (destination register), so RegDst=1 to select the rd field.'
      },
      {
        id: 'cs202-t3-q2-3',
        type: 'multiple_choice',
        prompt: 'Which control signal determines if data memory is written?',
        options: ['RegWrite', 'MemWrite', 'ALUOp', 'Branch'],
        correctAnswer: 1,
        explanation: 'MemWrite=1 enables writing to data memory, used by store instructions.'
      },
      {
        id: 'cs202-t3-q2-4',
        type: 'multiple_choice',
        prompt: 'The ALU control unit takes which inputs?',
        options: [
          'Opcode only',
          'Funct field only',
          'ALUOp and funct field',
          'Register values'
        ],
        correctAnswer: 2,
        explanation: 'The ALU control takes the ALUOp signal from main control and the funct field to determine the specific ALU operation.'
      },
      {
        id: 'cs202-t3-q2-5',
        type: 'multiple_choice',
        prompt: 'For a beq instruction, when is the branch taken?',
        options: [
          'When ALU result is non-zero',
          'When ALU result is zero (Zero flag = 1)',
          'When overflow occurs',
          'Always'
        ],
        correctAnswer: 1,
        explanation: 'beq branches when the two registers are equal, which the ALU determines by subtraction giving zero (Zero=1).'
      },
    ],
  },
  {
    id: 'cs202-topic3-quiz3',
    subjectId: 'cs202',
    topicId: 'cs202-topic3',
    title: 'Multi-Cycle and Performance',
    questions: [
      {
        id: 'cs202-t3-q3-1',
        type: 'multiple_choice',
        prompt: 'What is the main advantage of multi-cycle design over single-cycle?',
        options: [
          'Simpler control logic',
          'Faster clock period',
          'Fewer registers needed',
          'Less memory bandwidth'
        ],
        correctAnswer: 1,
        explanation: 'Multi-cycle allows shorter clock periods because each cycle only needs time for one stage, not the longest instruction.'
      },
      {
        id: 'cs202-t3-q3-2',
        type: 'multiple_choice',
        prompt: 'In multi-cycle design, what is the purpose of the Instruction Register (IR)?',
        options: [
          'To store the next PC value',
          'To hold the instruction being executed across cycles',
          'To store ALU results',
          'To buffer memory data'
        ],
        correctAnswer: 1,
        explanation: 'The IR holds the current instruction so it remains available throughout all cycles of execution.'
      },
      {
        id: 'cs202-t3-q3-3',
        type: 'multiple_choice',
        prompt: 'If CPI = 4 and clock rate = 500 MHz, how many instructions execute per second?',
        options: ['125 million', '500 million', '2 billion', '4 billion'],
        correctAnswer: 0,
        explanation: 'Instructions/second = clock rate / CPI = 500 MHz / 4 = 125 million instructions per second.'
      },
      {
        id: 'cs202-t3-q3-4',
        type: 'multiple_choice',
        prompt: 'Which factor does NOT directly appear in the CPU performance equation?',
        options: ['Instruction count', 'CPI', 'Clock rate', 'Number of registers'],
        correctAnswer: 3,
        explanation: 'CPU time = Instructions × CPI × Clock period. Register count affects CPI indirectly but is not in the equation.'
      },
      {
        id: 'cs202-t3-q3-5',
        type: 'multiple_choice',
        prompt: 'In a multi-cycle FSM, what does each state typically represent?',
        options: [
          'A different instruction type',
          'A different clock cycle of execution',
          'A different register access',
          'A different memory address'
        ],
        correctAnswer: 1,
        explanation: 'Each state in the multi-cycle FSM represents one clock cycle of the instruction execution process.'
      },
    ],
  },

  // Topic 4: Pipelining
  {
    id: 'cs202-topic4-quiz1',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    title: 'Pipeline Basics',
    questions: [
      {
        id: 'cs202-t4-q1-1',
        type: 'multiple_choice',
        prompt: 'What is the ideal speedup of a 5-stage pipeline over a single-cycle processor?',
        options: ['2×', '3×', '5×', '10×'],
        correctAnswer: 2,
        explanation: 'Ideally, an N-stage pipeline provides N× throughput improvement because N instructions are in flight simultaneously.'
      },
      {
        id: 'cs202-t4-q1-2',
        type: 'multiple_choice',
        prompt: 'Which of the following is NOT a standard stage in the classic 5-stage MIPS pipeline?',
        options: ['Instruction Fetch (IF)', 'Decode (ID)', 'Memory Access (MEM)', 'Cache Lookup (CL)'],
        correctAnswer: 3,
        explanation: 'The five stages are IF, ID, EX, MEM, WB. Cache lookup happens within IF and MEM, not as a separate stage.'
      },
      {
        id: 'cs202-t4-q1-3',
        type: 'multiple_choice',
        prompt: 'What determines the clock period in a pipelined processor?',
        options: [
          'Sum of all stage delays',
          'Delay of the slowest stage',
          'Delay of the fastest stage',
          'Average of all stage delays'
        ],
        correctAnswer: 1,
        explanation: 'The clock period must be at least as long as the slowest pipeline stage, as all stages must complete in one cycle.'
      },
      {
        id: 'cs202-t4-q1-4',
        type: 'multiple_choice',
        prompt: 'What is stored in pipeline registers?',
        options: [
          'Only instruction opcodes',
          'Intermediate results and control signals',
          'Memory addresses only',
          'Branch outcomes'
        ],
        correctAnswer: 1,
        explanation: 'Pipeline registers store all information needed by the next stage: data values, register numbers, and control signals.'
      },
      {
        id: 'cs202-t4-q1-5',
        type: 'multiple_choice',
        prompt: 'Pipelining improves processor performance primarily by increasing:',
        options: ['Instruction latency', 'Instruction throughput', 'Register count', 'Memory bandwidth'],
        correctAnswer: 1,
        explanation: 'Pipelining increases throughput (instructions completed per unit time) while latency for individual instructions may increase.'
      },
    ],
  },
  {
    id: 'cs202-topic4-quiz2',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    title: 'Pipeline Hazards',
    questions: [
      {
        id: 'cs202-t4-q2-1',
        type: 'multiple_choice',
        prompt: 'What type of hazard occurs when an instruction needs a result not yet produced?',
        options: ['Structural hazard', 'Data hazard (RAW)', 'Control hazard', 'WAW hazard'],
        correctAnswer: 1,
        explanation: 'RAW (Read After Write) hazards occur when an instruction needs to read a value that a previous instruction has not yet written.'
      },
      {
        id: 'cs202-t4-q2-2',
        type: 'multiple_choice',
        prompt: 'A structural hazard can be caused by:',
        options: [
          'Two instructions needing the same functional unit simultaneously',
          'A branch instruction',
          'Data dependencies',
          'Cache misses'
        ],
        correctAnswer: 0,
        explanation: 'Structural hazards occur when hardware resources are insufficient for the instructions that need them simultaneously.'
      },
      {
        id: 'cs202-t4-q2-3',
        type: 'multiple_choice',
        prompt: 'How many stall cycles are needed for "lw $t0, 0($a0); add $t1, $t0, $t2" without forwarding?',
        options: ['0', '1', '2', '3'],
        correctAnswer: 2,
        explanation: 'Without forwarding, the add must wait for lw to reach WB (2 cycles after lw\'s MEM stage when data is available).'
      },
      {
        id: 'cs202-t4-q2-4',
        type: 'multiple_choice',
        prompt: 'Control hazards are caused by:',
        options: [
          'Memory access conflicts',
          'Register file port limitations',
          'Branch and jump instructions',
          'Long ALU operations'
        ],
        correctAnswer: 2,
        explanation: 'Control hazards occur because the next instruction address isn\'t known until branch/jump instructions are resolved.'
      },
      {
        id: 'cs202-t4-q2-5',
        type: 'multiple_choice',
        prompt: 'A load-use hazard specifically refers to:',
        options: [
          'Any data hazard',
          'Using a loaded value in the next instruction',
          'Loading from an invalid address',
          'Two concurrent loads'
        ],
        correctAnswer: 1,
        explanation: 'A load-use hazard occurs when the instruction immediately after a load needs to use the loaded value.'
      },
    ],
  },
  {
    id: 'cs202-topic4-quiz3',
    subjectId: 'cs202',
    topicId: 'cs202-topic4',
    title: 'Forwarding and Branch Prediction',
    questions: [
      {
        id: 'cs202-t4-q3-1',
        type: 'multiple_choice',
        prompt: 'Data forwarding (bypassing) gets values from:',
        options: [
          'The register file only',
          'Pipeline registers before values reach the register file',
          'Main memory',
          'The instruction cache'
        ],
        correctAnswer: 1,
        explanation: 'Forwarding paths route results from EX/MEM or MEM/WB pipeline registers directly to the ALU inputs.'
      },
      {
        id: 'cs202-t4-q3-2',
        type: 'multiple_choice',
        prompt: 'Why can\'t forwarding completely eliminate the load-use hazard?',
        options: [
          'Memory is too slow',
          'The loaded data isn\'t available until after MEM, too late for EX',
          'The register file is unavailable',
          'Forwarding paths don\'t exist for loads'
        ],
        correctAnswer: 1,
        explanation: 'Load data is available after MEM, but the dependent instruction needs it in EX, one cycle earlier.'
      },
      {
        id: 'cs202-t4-q3-3',
        type: 'multiple_choice',
        prompt: 'A 2-bit branch predictor\'s key advantage over 1-bit is:',
        options: [
          'Faster prediction',
          'Tolerates one misprediction in a loop',
          'Uses less hardware',
          'Predicts indirect jumps'
        ],
        correctAnswer: 1,
        explanation: 'A 2-bit predictor requires two mispredictions to change state, avoiding misprediction on both loop entry and exit.'
      },
      {
        id: 'cs202-t4-q3-4',
        type: 'multiple_choice',
        prompt: 'In a 5-stage pipeline with branches resolved in ID, the branch penalty is:',
        options: ['0 cycles', '1 cycle', '2 cycles', '4 cycles'],
        correctAnswer: 1,
        explanation: 'If the branch is resolved in ID (stage 2), one instruction (in IF) may have been fetched wrongly, giving 1 cycle penalty.'
      },
      {
        id: 'cs202-t4-q3-5',
        type: 'multiple_choice',
        prompt: 'The branch target buffer (BTB) stores:',
        options: [
          'Branch prediction outcomes only',
          'Target addresses of recently taken branches',
          'All instruction addresses',
          'Register values'
        ],
        correctAnswer: 1,
        explanation: 'The BTB caches target addresses of branches so the target is known immediately, reducing branch penalty.'
      },
    ],
  },

  // Topic 5: Cache Memory
  {
    id: 'cs202-topic5-quiz1',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    title: 'Cache Basics',
    questions: [
      {
        id: 'cs202-t5-q1-1',
        type: 'multiple_choice',
        prompt: 'What principle makes caches effective?',
        options: ['Memory speed', 'CPU frequency', 'Locality of reference', 'Instruction pipelining'],
        correctAnswer: 2,
        explanation: 'Caches work because programs exhibit locality: recently accessed data (temporal) and nearby data (spatial) are likely to be accessed again.'
      },
      {
        id: 'cs202-t5-q1-2',
        type: 'multiple_choice',
        prompt: 'In a cache address breakdown, what do the tag bits identify?',
        options: [
          'Which byte within a block',
          'Which cache line to check',
          'Which memory block is stored',
          'The memory bank number'
        ],
        correctAnswer: 2,
        explanation: 'The tag bits uniquely identify which memory block is stored in a cache line, distinguishing between blocks that map to the same index.'
      },
      {
        id: 'cs202-t5-q1-3',
        type: 'multiple_choice',
        prompt: 'A cache with 64-byte blocks requires how many offset bits?',
        options: ['4', '5', '6', '7'],
        correctAnswer: 2,
        explanation: 'Block offset bits = log₂(block size) = log₂(64) = 6 bits to address any byte within the 64-byte block.'
      },
      {
        id: 'cs202-t5-q1-4',
        type: 'multiple_choice',
        prompt: 'What does the valid bit indicate?',
        options: [
          'The data has been modified',
          'The cache line contains valid data',
          'The address is valid',
          'The cache is enabled'
        ],
        correctAnswer: 1,
        explanation: 'The valid bit indicates whether the cache line contains valid data; it\'s 0 on startup and after invalidation.'
      },
      {
        id: 'cs202-t5-q1-5',
        type: 'multiple_choice',
        prompt: 'AMAT (Average Memory Access Time) is calculated as:',
        options: [
          'Hit time × Miss rate',
          'Hit time + Miss rate × Miss penalty',
          'Miss rate + Miss penalty',
          'Hit time + Miss penalty'
        ],
        correctAnswer: 1,
        explanation: 'AMAT = Hit time + Miss rate × Miss penalty, accounting for both hit and miss scenarios.'
      },
    ],
  },
  {
    id: 'cs202-topic5-quiz2',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    title: 'Cache Organization',
    questions: [
      {
        id: 'cs202-t5-q2-1',
        type: 'multiple_choice',
        prompt: 'In a direct-mapped cache, each memory block maps to:',
        options: [
          'Any cache line',
          'Exactly one cache line',
          'Two possible cache lines',
          'Four possible cache lines'
        ],
        correctAnswer: 1,
        explanation: 'In direct-mapped caches, each memory block maps to exactly one cache line, determined by its address.'
      },
      {
        id: 'cs202-t5-q2-2',
        type: 'multiple_choice',
        prompt: 'A 4-way set-associative cache requires how many tag comparisons per access?',
        options: ['1', '2', '4', '8'],
        correctAnswer: 2,
        explanation: 'A 4-way cache has 4 blocks per set, requiring 4 tag comparisons (done in parallel) to check for a hit.'
      },
      {
        id: 'cs202-t5-q2-3',
        type: 'multiple_choice',
        prompt: 'Which cache type has the lowest conflict miss rate?',
        options: ['Direct-mapped', '2-way set-associative', '4-way set-associative', 'Fully associative'],
        correctAnswer: 3,
        explanation: 'Fully associative caches have no conflict misses because any block can go anywhere.'
      },
      {
        id: 'cs202-t5-q2-4',
        type: 'multiple_choice',
        prompt: 'For a 32KB, 4-way set-associative cache with 64-byte blocks, how many sets are there?',
        options: ['64', '128', '256', '512'],
        correctAnswer: 1,
        explanation: 'Total blocks = 32KB / 64B = 512. Sets = 512 / 4 ways = 128 sets.'
      },
      {
        id: 'cs202-t5-q2-5',
        type: 'multiple_choice',
        prompt: 'LRU replacement policy evicts:',
        options: [
          'The newest block',
          'The block accessed longest ago',
          'A random block',
          'The block with most accesses'
        ],
        correctAnswer: 1,
        explanation: 'LRU (Least Recently Used) evicts the block that has not been accessed for the longest time.'
      },
    ],
  },
  {
    id: 'cs202-topic5-quiz3',
    subjectId: 'cs202',
    topicId: 'cs202-topic5',
    title: 'Write Policies and Optimization',
    questions: [
      {
        id: 'cs202-t5-q3-1',
        type: 'multiple_choice',
        prompt: 'Write-through policy means:',
        options: [
          'Writes go only to cache',
          'Writes go to both cache and memory',
          'Writes bypass the cache',
          'Writes are buffered indefinitely'
        ],
        correctAnswer: 1,
        explanation: 'Write-through writes data to both the cache and main memory on every write, keeping them consistent.'
      },
      {
        id: 'cs202-t5-q3-2',
        type: 'multiple_choice',
        prompt: 'What does the dirty bit indicate in write-back caches?',
        options: [
          'The block is invalid',
          'The block has been modified and differs from memory',
          'The block is being accessed',
          'The block should be written through'
        ],
        correctAnswer: 1,
        explanation: 'The dirty bit indicates the cache block has been modified and must be written to memory when evicted.'
      },
      {
        id: 'cs202-t5-q3-3',
        type: 'multiple_choice',
        prompt: 'Which type of miss cannot be avoided by increasing cache size?',
        options: ['Compulsory miss', 'Capacity miss', 'Conflict miss', 'Coherence miss'],
        correctAnswer: 0,
        explanation: 'Compulsory (cold) misses occur on the first access to a block and cannot be avoided by larger caches.'
      },
      {
        id: 'cs202-t5-q3-4',
        type: 'multiple_choice',
        prompt: 'A write buffer helps by:',
        options: [
          'Increasing hit rate',
          'Hiding write latency from the processor',
          'Reducing cache size needed',
          'Eliminating dirty bits'
        ],
        correctAnswer: 1,
        explanation: 'Write buffers queue writes and allow the CPU to continue without waiting for memory writes to complete.'
      },
      {
        id: 'cs202-t5-q3-5',
        type: 'multiple_choice',
        prompt: 'Prefetching reduces which type of misses?',
        options: ['Conflict misses only', 'Capacity misses only', 'Compulsory misses', 'All miss types equally'],
        correctAnswer: 2,
        explanation: 'Prefetching fetches data before it\'s needed, primarily reducing compulsory misses by having data ready.'
      },
    ],
  },

  // Topic 6: Memory Hierarchy
  {
    id: 'cs202-topic6-quiz1',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    title: 'Memory Technologies',
    questions: [
      {
        id: 'cs202-t6-q1-1',
        type: 'multiple_choice',
        prompt: 'Why is SRAM faster than DRAM?',
        options: [
          'SRAM uses larger transistors',
          'SRAM uses flip-flops, no refresh needed',
          'SRAM is closer to the CPU',
          'SRAM has more bandwidth'
        ],
        correctAnswer: 1,
        explanation: 'SRAM uses 6 transistors in a flip-flop configuration that holds state without refresh, allowing faster access than DRAM\'s capacitor-based cells.'
      },
      {
        id: 'cs202-t6-q1-2',
        type: 'multiple_choice',
        prompt: 'DRAM requires periodic refresh because:',
        options: [
          'Capacitors leak charge',
          'Transistors wear out',
          'Memory controllers require it',
          'The bus needs to be cleared'
        ],
        correctAnswer: 0,
        explanation: 'DRAM stores data as charge in tiny capacitors that leak over time; refresh reads and rewrites each row periodically.'
      },
      {
        id: 'cs202-t6-q1-3',
        type: 'multiple_choice',
        prompt: 'The term DDR (Double Data Rate) means:',
        options: [
          'Twice the memory capacity',
          'Data transfers on both clock edges',
          'Two memory channels',
          'Double the voltage'
        ],
        correctAnswer: 1,
        explanation: 'DDR transfers data on both rising and falling clock edges, doubling the data rate compared to SDR.'
      },
      {
        id: 'cs202-t6-q1-4',
        type: 'multiple_choice',
        prompt: 'Which memory technology is non-volatile?',
        options: ['SRAM', 'DRAM', 'Flash/SSD', 'All of the above'],
        correctAnswer: 2,
        explanation: 'Flash memory retains data without power (non-volatile), while SRAM and DRAM lose data when power is removed.'
      },
      {
        id: 'cs202-t6-q1-5',
        type: 'multiple_choice',
        prompt: 'Why are there multiple cache levels (L1, L2, L3)?',
        options: [
          'For redundancy',
          'To balance speed vs. capacity trade-offs',
          'For power management',
          'Required by x86 architecture'
        ],
        correctAnswer: 1,
        explanation: 'Multiple levels allow small fast L1 caches for low latency and larger slower L2/L3 caches for capacity.'
      },
    ],
  },
  {
    id: 'cs202-topic6-quiz2',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    title: 'DRAM and Storage',
    questions: [
      {
        id: 'cs202-t6-q2-1',
        type: 'multiple_choice',
        prompt: 'In DRAM, a row buffer hit means:',
        options: [
          'The data is in the cache',
          'The requested row is already open',
          'The memory controller found the data',
          'The refresh is complete'
        ],
        correctAnswer: 1,
        explanation: 'A row buffer hit occurs when the requested data\'s row is already in the sense amplifiers, requiring only a column access.'
      },
      {
        id: 'cs202-t6-q2-2',
        type: 'multiple_choice',
        prompt: 'The three main components of HDD access time are:',
        options: [
          'Read, write, verify',
          'Seek, rotation, transfer',
          'Cache, buffer, disk',
          'Connect, access, disconnect'
        ],
        correctAnswer: 1,
        explanation: 'HDD access time = seek time (move head) + rotational latency (wait for sector) + transfer time (read data).'
      },
      {
        id: 'cs202-t6-q2-3',
        type: 'multiple_choice',
        prompt: 'SSDs are faster than HDDs for random access primarily because:',
        options: [
          'They have larger caches',
          'They have no mechanical seek time',
          'They use faster memory chips',
          'They have more bandwidth'
        ],
        correctAnswer: 1,
        explanation: 'SSDs eliminate mechanical seek and rotation time, making random access nearly as fast as sequential.'
      },
      {
        id: 'cs202-t6-q2-4',
        type: 'multiple_choice',
        prompt: 'Flash memory write limitation (erase-before-write) is handled by:',
        options: [
          'Larger blocks',
          'Flash Translation Layer (FTL)',
          'More power',
          'Faster controllers'
        ],
        correctAnswer: 1,
        explanation: 'The FTL manages address mapping, wear leveling, and garbage collection to handle flash\'s erase-before-write constraint.'
      },
      {
        id: 'cs202-t6-q2-5',
        type: 'multiple_choice',
        prompt: 'Wear leveling in SSDs ensures:',
        options: [
          'Even distribution of writes across all cells',
          'Data is never lost',
          'Faster read speeds',
          'Lower power consumption'
        ],
        correctAnswer: 0,
        explanation: 'Wear leveling distributes writes evenly so no cells wear out prematurely, extending SSD lifespan.'
      },
    ],
  },
  {
    id: 'cs202-topic6-quiz3',
    subjectId: 'cs202',
    topicId: 'cs202-topic6',
    title: 'Memory Controllers and Performance',
    questions: [
      {
        id: 'cs202-t6-q3-1',
        type: 'multiple_choice',
        prompt: 'A memory controller\'s primary function is to:',
        options: [
          'Store data',
          'Manage CPU cache',
          'Interface between CPU and DRAM',
          'Compress memory data'
        ],
        correctAnswer: 2,
        explanation: 'The memory controller handles all communication between the CPU and DRAM, including scheduling, timing, and refresh.'
      },
      {
        id: 'cs202-t6-q3-2',
        type: 'multiple_choice',
        prompt: 'Memory bandwidth is typically measured in:',
        options: ['MHz', 'GB/s', 'Latency', 'Instructions per second'],
        correctAnswer: 1,
        explanation: 'Memory bandwidth is the data transfer rate, measured in GB/s (gigabytes per second).'
      },
      {
        id: 'cs202-t6-q3-3',
        type: 'multiple_choice',
        prompt: 'According to Little\'s Law, to achieve high memory bandwidth you need:',
        options: [
          'Faster memory chips',
          'Many outstanding memory requests',
          'Larger cache',
          'Lower latency only'
        ],
        correctAnswer: 1,
        explanation: 'Little\'s Law: Bandwidth = Outstanding requests / Latency. More outstanding requests enable higher bandwidth despite latency.'
      },
      {
        id: 'cs202-t6-q3-4',
        type: 'multiple_choice',
        prompt: 'FR-FCFS memory scheduling prioritizes:',
        options: [
          'Oldest requests first',
          'Row buffer hits, then oldest',
          'Smallest requests first',
          'Random ordering'
        ],
        correctAnswer: 1,
        explanation: 'FR-FCFS (First Ready, First Come First Served) prioritizes requests that hit the open row buffer, then by age.'
      },
      {
        id: 'cs202-t6-q3-5',
        type: 'multiple_choice',
        prompt: 'High Bandwidth Memory (HBM) achieves high bandwidth through:',
        options: [
          'Faster clock speeds',
          '3D stacking with wide interfaces',
          'Larger capacitors',
          'More refresh cycles'
        ],
        correctAnswer: 1,
        explanation: 'HBM stacks DRAM dies with through-silicon vias (TSVs) and uses a very wide (1024-bit) interface.'
      },
    ],
  },

  // Topic 7: Instruction-Level Parallelism
  {
    id: 'cs202-topic7-quiz1',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    title: 'ILP Fundamentals',
    questions: [
      {
        id: 'cs202-t7-q1-1',
        type: 'multiple_choice',
        prompt: 'What is Instruction-Level Parallelism (ILP)?',
        options: [
          'Running multiple programs simultaneously',
          'Executing multiple instructions at the same time within a program',
          'Using multiple CPU cores',
          'Parallelizing I/O operations'
        ],
        correctAnswer: 1,
        explanation: 'ILP refers to executing multiple instructions simultaneously from a single instruction stream by exploiting independence between instructions.'
      },
      {
        id: 'cs202-t7-q1-2',
        type: 'multiple_choice',
        prompt: 'Which dependency type cannot be eliminated by register renaming?',
        options: ['WAR (Write After Read)', 'WAW (Write After Write)', 'RAW (Read After Write)', 'All can be eliminated'],
        correctAnswer: 2,
        explanation: 'RAW (true) dependencies represent actual data flow and cannot be eliminated; WAR and WAW are false dependencies removable by renaming.'
      },
      {
        id: 'cs202-t7-q1-3',
        type: 'multiple_choice',
        prompt: 'IPC (Instructions Per Cycle) greater than 1 is achieved by:',
        options: [
          'Faster clock speed',
          'Superscalar or multiple-issue execution',
          'Larger caches',
          'Better branch prediction alone'
        ],
        correctAnswer: 1,
        explanation: 'IPC > 1 requires issuing and executing multiple instructions per cycle, which is the definition of superscalar.'
      },
      {
        id: 'cs202-t7-q1-4',
        type: 'multiple_choice',
        prompt: 'What limits the amount of ILP available in typical programs?',
        options: [
          'Hardware limitations only',
          'Data dependencies, branches, and memory latency',
          'Compiler quality only',
          'Number of registers'
        ],
        correctAnswer: 1,
        explanation: 'True data dependencies, control flow (branches), and memory latency fundamentally limit available ILP.'
      },
      {
        id: 'cs202-t7-q1-5',
        type: 'multiple_choice',
        prompt: 'Typical achieved IPC on modern out-of-order processors is:',
        options: ['0.5-1', '1-2', '2-3', '4-6'],
        correctAnswer: 2,
        explanation: 'Modern OoO processors typically achieve IPC of 2-3, despite theoretical issue widths of 4-8.'
      },
    ],
  },
  {
    id: 'cs202-topic7-quiz2',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    title: 'Dynamic Scheduling',
    questions: [
      {
        id: 'cs202-t7-q2-1',
        type: 'multiple_choice',
        prompt: 'What is the purpose of reservation stations in Tomasulo\'s algorithm?',
        options: [
          'To store instructions waiting for operands',
          'To hold the program counter',
          'To cache memory data',
          'To predict branches'
        ],
        correctAnswer: 0,
        explanation: 'Reservation stations hold instructions waiting for their source operands to become available.'
      },
      {
        id: 'cs202-t7-q2-2',
        type: 'multiple_choice',
        prompt: 'The Common Data Bus (CDB) in Tomasulo\'s algorithm:',
        options: [
          'Connects CPU to memory',
          'Broadcasts results to all waiting stations',
          'Fetches instructions',
          'Handles branch prediction'
        ],
        correctAnswer: 1,
        explanation: 'The CDB broadcasts results to all reservation stations and registers simultaneously, enabling operand forwarding.'
      },
      {
        id: 'cs202-t7-q2-3',
        type: 'multiple_choice',
        prompt: 'Register renaming eliminates which hazards?',
        options: [
          'RAW only',
          'WAR and WAW only',
          'All hazards',
          'Structural hazards'
        ],
        correctAnswer: 1,
        explanation: 'Register renaming eliminates false dependencies (WAR, WAW) by mapping multiple uses of an architectural register to different physical registers.'
      },
      {
        id: 'cs202-t7-q2-4',
        type: 'multiple_choice',
        prompt: 'The Reorder Buffer (ROB) ensures:',
        options: [
          'Faster execution',
          'In-order commit despite out-of-order execution',
          'More reservation stations',
          'Better cache performance'
        ],
        correctAnswer: 1,
        explanation: 'The ROB maintains program order for commits, ensuring precise exceptions even when instructions execute out of order.'
      },
      {
        id: 'cs202-t7-q2-5',
        type: 'multiple_choice',
        prompt: 'Speculative execution means:',
        options: [
          'Guessing instruction addresses',
          'Executing instructions before knowing if they should execute',
          'Random instruction selection',
          'Parallel memory access'
        ],
        correctAnswer: 1,
        explanation: 'Speculative execution executes instructions past branches before the branch outcome is known, recovering if wrong.'
      },
    ],
  },
  {
    id: 'cs202-topic7-quiz3',
    subjectId: 'cs202',
    topicId: 'cs202-topic7',
    title: 'VLIW and SIMD',
    questions: [
      {
        id: 'cs202-t7-q3-1',
        type: 'multiple_choice',
        prompt: 'VLIW processors differ from superscalar by:',
        options: [
          'Being slower',
          'Relying on compiler to find parallelism instead of hardware',
          'Using more registers',
          'Having deeper pipelines'
        ],
        correctAnswer: 1,
        explanation: 'VLIW relies on the compiler to find and encode parallelism in wide instructions, simplifying hardware.'
      },
      {
        id: 'cs202-t7-q3-2',
        type: 'multiple_choice',
        prompt: 'SIMD (Single Instruction Multiple Data) is best suited for:',
        options: [
          'Branch-heavy code',
          'Irregular memory access',
          'Regular operations on arrays of data',
          'Database queries'
        ],
        correctAnswer: 2,
        explanation: 'SIMD excels at applying the same operation to many data elements, common in graphics, scientific computing, and ML.'
      },
      {
        id: 'cs202-t7-q3-3',
        type: 'multiple_choice',
        prompt: 'AVX-512 registers are how many bits wide?',
        options: ['128 bits', '256 bits', '512 bits', '1024 bits'],
        correctAnswer: 2,
        explanation: 'AVX-512 provides 512-bit registers, capable of processing 16 single-precision floats simultaneously.'
      },
      {
        id: 'cs202-t7-q3-4',
        type: 'multiple_choice',
        prompt: 'A key disadvantage of VLIW is:',
        options: [
          'Higher power consumption',
          'Poor binary compatibility across implementations',
          'Smaller code size',
          'Simpler compilers needed'
        ],
        correctAnswer: 1,
        explanation: 'VLIW binaries are tied to specific hardware; changing pipeline depth or functional units breaks compatibility.'
      },
      {
        id: 'cs202-t7-q3-5',
        type: 'multiple_choice',
        prompt: 'The main reason ILP improvements have diminished is:',
        options: [
          'Clock speeds can\'t increase',
          'Fundamental limits from dependencies and branches',
          'Memory got too fast',
          'Compilers improved too much'
        ],
        correctAnswer: 1,
        explanation: 'Diminishing ILP returns come from fundamental limits: true dependencies, branch mispredictions, and memory latency.'
      },
    ],
  },
];
