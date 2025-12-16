import type { Exam } from '../../../core/types';

export const cs202Exams: Exam[] = [
  {
    id: 'cs202-midterm',
    subjectId: 'cs202',
    title: 'CS202 Midterm Exam',
    durationMinutes: 90,
    instructions: [
      'Covers Topics 1-4: Instruction Set Architecture, Assembly Language, CPU Datapath, and Pipelining.',
      'Answer all questions. Passing score is 70%.',
      'For multiple choice, select the single best answer.',
      'Show your work for calculations where applicable.',
    ],
    questions: [
      // Topic 1: ISA (7 questions)
      {
        id: 'cs202-mid-1',
        type: 'multiple_choice',
        prompt: 'What is the primary purpose of an Instruction Set Architecture (ISA)?',
        options: [
          'To determine processor clock speed',
          'To define the interface between software and hardware',
          'To specify cache organization',
          'To manage operating system resources'
        ],
        correctAnswer: 1,
        explanation: 'The ISA defines the abstract interface between software and hardware, specifying available instructions, registers, and memory model.'
      },
      {
        id: 'cs202-mid-2',
        type: 'multiple_choice',
        prompt: 'In MIPS, how many bits are used for the opcode field in R-format instructions?',
        options: ['4 bits', '5 bits', '6 bits', '8 bits'],
        correctAnswer: 2,
        explanation: 'MIPS R-format uses 6 bits for opcode (bits 31-26), with the funct field providing additional operation specification.'
      },
      {
        id: 'cs202-mid-3',
        type: 'multiple_choice',
        prompt: 'Which addressing mode is used by the instruction "lw $t0, 8($s0)"?',
        options: ['Immediate', 'Register', 'Base + Offset', 'PC-relative'],
        correctAnswer: 2,
        explanation: 'Base + offset (displacement) addressing adds a constant offset (8) to the base register ($s0) to compute the effective address.'
      },
      {
        id: 'cs202-mid-4',
        type: 'multiple_choice',
        prompt: 'What is the key difference between CISC and RISC architectures?',
        options: [
          'CISC has more registers than RISC',
          'RISC uses variable-length instructions',
          'CISC has complex multi-cycle instructions while RISC emphasizes simple single-cycle instructions',
          'RISC processors are always faster than CISC'
        ],
        correctAnswer: 2,
        explanation: 'CISC features complex instructions that may span multiple cycles, while RISC emphasizes simpler instructions optimized for pipelining.'
      },
      {
        id: 'cs202-mid-5',
        type: 'multiple_choice',
        prompt: 'In a load-store architecture, which operations can access memory?',
        options: [
          'All arithmetic operations',
          'Only load and store instructions',
          'Any instruction with an immediate operand',
          'Only branch instructions'
        ],
        correctAnswer: 1,
        explanation: 'Load-store architectures restrict memory access to dedicated load and store instructions; arithmetic operates only on registers.'
      },
      {
        id: 'cs202-mid-6',
        type: 'multiple_choice',
        prompt: 'What is the maximum value that can be stored in a 16-bit unsigned immediate field?',
        options: ['32,767', '65,535', '127', '255'],
        correctAnswer: 1,
        explanation: '2^16 - 1 = 65,535 is the maximum unsigned value in 16 bits.'
      },
      {
        id: 'cs202-mid-7',
        type: 'multiple_choice',
        prompt: 'Which MIPS instruction format uses a 26-bit address field?',
        options: ['R-format', 'I-format', 'J-format', 'All formats'],
        correctAnswer: 2,
        explanation: 'J-format (jump) uses 6 bits for opcode and 26 bits for the target address field.'
      },
      // Topic 2: Assembly (6 questions)
      {
        id: 'cs202-mid-8',
        type: 'multiple_choice',
        prompt: 'Which register is used to store the return address when executing a jal instruction?',
        options: ['$v0', '$a0', '$ra', '$sp'],
        correctAnswer: 2,
        explanation: '$ra (register 31) holds the return address saved by jal, used to return from procedure calls.'
      },
      {
        id: 'cs202-mid-9',
        type: 'multiple_choice',
        prompt: 'What does "sll $t0, $t1, 2" compute?',
        options: [
          '$t1 + 2 stored in $t0',
          '$t1 shifted left by 2 bits stored in $t0',
          '$t1 shifted right by 2 bits',
          '$t1 × $t2 stored in $t0'
        ],
        correctAnswer: 1,
        explanation: 'sll (shift left logical) shifts $t1 left by 2 bits (equivalent to multiplying by 4) and stores in $t0.'
      },
      {
        id: 'cs202-mid-10',
        type: 'multiple_choice',
        prompt: 'In the MIPS calling convention, which registers are callee-saved?',
        options: ['$t0-$t9', '$s0-$s7', '$a0-$a3', '$v0-$v1'],
        correctAnswer: 1,
        explanation: '$s0-$s7 are callee-saved; if a function uses them, it must save and restore their original values.'
      },
      {
        id: 'cs202-mid-11',
        type: 'multiple_choice',
        prompt: 'What is the syscall code to print an integer in MIPS?',
        options: ['1', '4', '5', '10'],
        correctAnswer: 0,
        explanation: 'Syscall 1 prints the integer in $a0. Code 4 prints string, 5 reads integer, 10 exits.'
      },
      {
        id: 'cs202-mid-12',
        type: 'multiple_choice',
        prompt: 'When a function prologue allocates stack space, the stack pointer:',
        options: [
          'Increases (moves to higher addresses)',
          'Decreases (moves to lower addresses)',
          'Stays the same',
          'Is reset to zero'
        ],
        correctAnswer: 1,
        explanation: 'The stack grows downward in MIPS, so $sp decreases to allocate space for locals and saved registers.'
      },
      {
        id: 'cs202-mid-13',
        type: 'multiple_choice',
        prompt: 'What is the purpose of the .asciiz directive?',
        options: [
          'Allocate space for integers',
          'Define a null-terminated string',
          'Specify code alignment',
          'Declare a function'
        ],
        correctAnswer: 1,
        explanation: '.asciiz creates a null-terminated ASCII string suitable for use with print_string syscall.'
      },
      // Topic 3: CPU Datapath (7 questions)
      {
        id: 'cs202-mid-14',
        type: 'multiple_choice',
        prompt: 'In a single-cycle datapath, what determines the clock period?',
        options: [
          'The fastest instruction',
          'The slowest instruction',
          'The average instruction time',
          'The register file access time'
        ],
        correctAnswer: 1,
        explanation: 'Single-cycle must use the slowest instruction timing (usually lw) for all instructions.'
      },
      {
        id: 'cs202-mid-15',
        type: 'multiple_choice',
        prompt: 'What does the ALUSrc control signal select?',
        options: [
          'Which register to write',
          'Whether second ALU input comes from register or immediate',
          'The ALU operation',
          'Memory read or write'
        ],
        correctAnswer: 1,
        explanation: 'ALUSrc selects whether the second ALU operand comes from a register (0) or sign-extended immediate (1).'
      },
      {
        id: 'cs202-mid-16',
        type: 'multiple_choice',
        prompt: 'For an R-type instruction, what should the RegDst control signal be?',
        options: ['0 (rt)', '1 (rd)', 'Don\'t care', 'Depends on opcode'],
        correctAnswer: 1,
        explanation: 'R-type instructions write to rd (the destination register field), so RegDst=1.'
      },
      {
        id: 'cs202-mid-17',
        type: 'multiple_choice',
        prompt: 'What is the main advantage of multi-cycle datapath over single-cycle?',
        options: [
          'Simpler control unit',
          'Shorter clock period',
          'Fewer registers needed',
          'Less memory'
        ],
        correctAnswer: 1,
        explanation: 'Multi-cycle allows shorter clock periods because each cycle only handles one stage, not the entire instruction.'
      },
      {
        id: 'cs202-mid-18',
        type: 'multiple_choice',
        prompt: 'The CPU performance equation is: Time = Instructions × CPI × ?',
        options: [
          'Memory latency',
          'Cache hit rate',
          'Clock period',
          'Pipeline depth'
        ],
        correctAnswer: 2,
        explanation: 'CPU Time = Instructions × CPI × Clock Period. This is the fundamental performance equation.'
      },
      {
        id: 'cs202-mid-19',
        type: 'multiple_choice',
        prompt: 'What does the sign-extend unit do?',
        options: [
          'Extends 32-bit values to 64 bits',
          'Converts 16-bit immediate to 32 bits preserving sign',
          'Handles overflow detection',
          'Extends the opcode field'
        ],
        correctAnswer: 1,
        explanation: 'The sign-extend unit converts 16-bit immediates to 32 bits by replicating the sign bit.'
      },
      {
        id: 'cs202-mid-20',
        type: 'multiple_choice',
        prompt: 'How many read ports does a typical MIPS register file have?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        explanation: 'MIPS register file has 2 read ports (for rs and rt) and 1 write port (for rd).'
      },
      // Topic 4: Pipelining (7 questions)
      {
        id: 'cs202-mid-21',
        type: 'multiple_choice',
        prompt: 'What is the ideal speedup of a 5-stage pipeline over unpipelined execution?',
        options: ['2×', '3×', '5×', '10×'],
        correctAnswer: 2,
        explanation: 'Ideally, an N-stage pipeline provides N× throughput improvement with N instructions in flight.'
      },
      {
        id: 'cs202-mid-22',
        type: 'multiple_choice',
        prompt: 'A RAW (Read After Write) hazard is also called:',
        options: ['Output dependency', 'Anti-dependency', 'True dependency', 'Structural hazard'],
        correctAnswer: 2,
        explanation: 'RAW is a true dependency because the data flow requires the read to happen after the write.'
      },
      {
        id: 'cs202-mid-23',
        type: 'multiple_choice',
        prompt: 'Data forwarding (bypassing) reduces stalls by:',
        options: [
          'Predicting branch outcomes',
          'Routing results directly to where they are needed',
          'Increasing register file ports',
          'Using more memory'
        ],
        correctAnswer: 1,
        explanation: 'Forwarding routes results from pipeline registers directly to ALU inputs before they reach the register file.'
      },
      {
        id: 'cs202-mid-24',
        type: 'multiple_choice',
        prompt: 'Why can\'t forwarding eliminate the load-use hazard completely?',
        options: [
          'Memory is too slow',
          'Load data isn\'t available until after MEM, but is needed in EX',
          'Register file has too few ports',
          'The ALU cannot accept forwarded data'
        ],
        correctAnswer: 1,
        explanation: 'Load data is available after MEM, but the dependent instruction needs it in EX, one cycle earlier.'
      },
      {
        id: 'cs202-mid-25',
        type: 'multiple_choice',
        prompt: 'A 2-bit branch predictor\'s key advantage over 1-bit is:',
        options: [
          'Faster prediction',
          'Tolerates one misprediction in a loop',
          'Uses less hardware',
          'Predicts indirect jumps better'
        ],
        correctAnswer: 1,
        explanation: 'A 2-bit predictor requires two mispredictions to change direction, avoiding double misprediction in loops.'
      },
      {
        id: 'cs202-mid-26',
        type: 'multiple_choice',
        prompt: 'Control hazards are caused by:',
        options: [
          'Data dependencies',
          'Resource conflicts',
          'Branch and jump instructions',
          'Cache misses'
        ],
        correctAnswer: 2,
        explanation: 'Control hazards occur because the next instruction address isn\'t known until branches/jumps are resolved.'
      },
      {
        id: 'cs202-mid-27',
        type: 'multiple_choice',
        prompt: 'In a 5-stage pipeline, how many stall cycles are needed for "lw $t0, 0($a0); add $t1, $t0, $t2" with forwarding?',
        options: ['0', '1', '2', '3'],
        correctAnswer: 1,
        explanation: '1 stall is needed because load data is available after MEM but add needs it in EX.'
      },
    ],
  },
  {
    id: 'cs202-final',
    subjectId: 'cs202',
    title: 'CS202 Final Exam',
    durationMinutes: 150,
    instructions: [
      'Comprehensive exam covering all topics: ISA, Assembly, Datapath, Pipelining, Cache, Memory Hierarchy, and ILP.',
      'Answer all questions. Passing score is 70%.',
      'For multiple choice, select the single best answer.',
      'Show your work for calculations where applicable.',
    ],
    questions: [
      // Topics 1-4 Review (12 questions)
      {
        id: 'cs202-final-1',
        type: 'multiple_choice',
        prompt: 'Which of the following is NOT part of the ISA?',
        options: ['Instruction encoding', 'Register count', 'Cache size', 'Addressing modes'],
        correctAnswer: 2,
        explanation: 'Cache size is a microarchitecture detail, not part of the ISA visible to programmers.'
      },
      {
        id: 'cs202-final-2',
        type: 'multiple_choice',
        prompt: 'The instruction "addi $t0, $zero, 100" is equivalent to:',
        options: ['add $t0, $zero, 100', 'li $t0, 100', 'move $t0, 100', 'la $t0, 100'],
        correctAnswer: 1,
        explanation: 'li (load immediate) is a pseudo-instruction that assembles to addi with $zero as source.'
      },
      {
        id: 'cs202-final-3',
        type: 'multiple_choice',
        prompt: 'In a recursive function, what must always be saved on the stack?',
        options: [
          'Only local variables',
          'Only $ra',
          '$ra and registers the function modifies',
          'All 32 registers'
        ],
        correctAnswer: 2,
        explanation: 'Recursive functions must save $ra (for nested calls) and any registers they need to preserve.'
      },
      {
        id: 'cs202-final-4',
        type: 'multiple_choice',
        prompt: 'If CPI = 1.5 and clock rate = 2 GHz, what is the MIPS (millions of instructions per second)?',
        options: ['1333', '2000', '3000', '750'],
        correctAnswer: 0,
        explanation: 'MIPS = Clock rate / CPI = 2000 MHz / 1.5 = 1333 MIPS.'
      },
      {
        id: 'cs202-final-5',
        type: 'multiple_choice',
        prompt: 'Which control signal must be 1 for a store word instruction?',
        options: ['RegWrite', 'MemWrite', 'MemRead', 'Branch'],
        correctAnswer: 1,
        explanation: 'MemWrite=1 enables writing data to memory, used by store instructions.'
      },
      {
        id: 'cs202-final-6',
        type: 'multiple_choice',
        prompt: 'What is stored in pipeline registers?',
        options: [
          'Only instruction opcodes',
          'Intermediate data and control signals',
          'Memory addresses only',
          'Branch predictions'
        ],
        correctAnswer: 1,
        explanation: 'Pipeline registers hold all information needed by the next stage: data values and control signals.'
      },
      {
        id: 'cs202-final-7',
        type: 'multiple_choice',
        prompt: 'A structural hazard can occur when:',
        options: [
          'Two instructions have data dependency',
          'A branch target is unknown',
          'Two instructions need the same hardware resource simultaneously',
          'The cache misses'
        ],
        correctAnswer: 2,
        explanation: 'Structural hazards occur when hardware resources are insufficient for simultaneous access.'
      },
      {
        id: 'cs202-final-8',
        type: 'multiple_choice',
        prompt: 'What does the Branch Target Buffer (BTB) store?',
        options: [
          'Branch prediction outcomes only',
          'Target addresses of recent branches',
          'All instruction addresses',
          'Register values'
        ],
        correctAnswer: 1,
        explanation: 'BTB caches target addresses so the target is known immediately, reducing branch penalty.'
      },
      {
        id: 'cs202-final-9',
        type: 'multiple_choice',
        prompt: 'In MIPS, negative numbers are represented using:',
        options: [
          'Sign-magnitude',
          'One\'s complement',
          'Two\'s complement',
          'BCD'
        ],
        correctAnswer: 2,
        explanation: 'MIPS uses two\'s complement for signed integer representation.'
      },
      {
        id: 'cs202-final-10',
        type: 'multiple_choice',
        prompt: 'The purpose of the ALU control unit is to:',
        options: [
          'Generate the next PC',
          'Determine the specific ALU operation from ALUOp and funct',
          'Control memory access',
          'Select registers'
        ],
        correctAnswer: 1,
        explanation: 'ALU control takes ALUOp and funct fields to determine the specific ALU operation.'
      },
      {
        id: 'cs202-final-11',
        type: 'multiple_choice',
        prompt: 'Pipeline stalls (bubbles) are implemented by:',
        options: [
          'Speeding up the clock',
          'Inserting nop operations and preventing PC/IF-ID update',
          'Skipping instructions',
          'Flushing the entire pipeline'
        ],
        correctAnswer: 1,
        explanation: 'Stalls insert bubbles by preventing pipeline register updates and inserting nops.'
      },
      {
        id: 'cs202-final-12',
        type: 'multiple_choice',
        prompt: 'Which dependency type CANNOT be removed by register renaming?',
        options: ['WAR', 'WAW', 'RAW', 'Both WAR and WAW'],
        correctAnswer: 2,
        explanation: 'RAW is a true data dependency that cannot be eliminated; WAR and WAW are false dependencies.'
      },
      // Topic 5: Cache (11 questions)
      {
        id: 'cs202-final-13',
        type: 'multiple_choice',
        prompt: 'Caches are effective because of:',
        options: ['Random memory access patterns', 'Locality of reference', 'Unlimited memory bandwidth', 'Fast DRAM'],
        correctAnswer: 1,
        explanation: 'Caches exploit temporal and spatial locality in program memory access patterns.'
      },
      {
        id: 'cs202-final-14',
        type: 'multiple_choice',
        prompt: 'In a direct-mapped cache, each memory block maps to:',
        options: ['Any cache line', 'Exactly one cache line', 'Two cache lines', 'Half the cache'],
        correctAnswer: 1,
        explanation: 'Direct-mapped caches have exactly one possible location for each memory block.'
      },
      {
        id: 'cs202-final-15',
        type: 'multiple_choice',
        prompt: 'A 64KB, 4-way set-associative cache with 64-byte blocks has how many sets?',
        options: ['256', '512', '1024', '128'],
        correctAnswer: 0,
        explanation: 'Total blocks = 64KB/64B = 1024. Sets = 1024/4 = 256 sets.'
      },
      {
        id: 'cs202-final-16',
        type: 'multiple_choice',
        prompt: 'What type of miss occurs on the first access to a memory block?',
        options: ['Conflict miss', 'Capacity miss', 'Compulsory miss', 'Coherence miss'],
        correctAnswer: 2,
        explanation: 'Compulsory (cold) misses occur on first access to a block, regardless of cache configuration.'
      },
      {
        id: 'cs202-final-17',
        type: 'multiple_choice',
        prompt: 'Write-back policy differs from write-through by:',
        options: [
          'Writing to memory on every write',
          'Writing to memory only on eviction',
          'Never writing to memory',
          'Using larger blocks'
        ],
        correctAnswer: 1,
        explanation: 'Write-back writes to memory only when a dirty block is evicted, reducing memory traffic.'
      },
      {
        id: 'cs202-final-18',
        type: 'multiple_choice',
        prompt: 'What does the dirty bit indicate in a cache line?',
        options: [
          'The line is invalid',
          'The line has been modified and differs from memory',
          'The line was recently accessed',
          'The line is locked'
        ],
        correctAnswer: 1,
        explanation: 'The dirty bit indicates the cache block was modified and must be written back when evicted.'
      },
      {
        id: 'cs202-final-19',
        type: 'multiple_choice',
        prompt: 'AMAT = 2 + 0.05 × 100 = ?',
        options: ['5 cycles', '7 cycles', '10 cycles', '12 cycles'],
        correctAnswer: 1,
        explanation: 'AMAT = Hit time + Miss rate × Miss penalty = 2 + 0.05 × 100 = 2 + 5 = 7 cycles.'
      },
      {
        id: 'cs202-final-20',
        type: 'multiple_choice',
        prompt: 'LRU replacement policy evicts:',
        options: ['The newest block', 'The least recently used block', 'A random block', 'The most frequently used block'],
        correctAnswer: 1,
        explanation: 'LRU (Least Recently Used) evicts the block not accessed for the longest time.'
      },
      {
        id: 'cs202-final-21',
        type: 'multiple_choice',
        prompt: 'VIPT caches avoid aliasing problems when:',
        options: [
          'Cache size equals page size',
          'Index bits fit within page offset',
          'Tags are virtual',
          'Never'
        ],
        correctAnswer: 1,
        explanation: 'VIPT works without aliasing when index bits come entirely from the page offset (unchanged in translation).'
      },
      {
        id: 'cs202-final-22',
        type: 'multiple_choice',
        prompt: 'Which technique helps reduce compulsory misses?',
        options: ['Larger cache', 'Higher associativity', 'Prefetching', 'Write-back'],
        correctAnswer: 2,
        explanation: 'Prefetching fetches data before it\'s needed, reducing compulsory misses.'
      },
      {
        id: 'cs202-final-23',
        type: 'multiple_choice',
        prompt: 'The purpose of a write buffer is to:',
        options: [
          'Increase cache size',
          'Hide write latency from the processor',
          'Store cache tags',
          'Buffer read data'
        ],
        correctAnswer: 1,
        explanation: 'Write buffers queue writes allowing the CPU to continue without waiting for memory.'
      },
      // Topic 6: Memory Hierarchy (10 questions)
      {
        id: 'cs202-final-24',
        type: 'multiple_choice',
        prompt: 'SRAM is faster than DRAM because:',
        options: [
          'SRAM is larger',
          'SRAM uses flip-flops, no refresh needed',
          'SRAM is non-volatile',
          'SRAM uses capacitors'
        ],
        correctAnswer: 1,
        explanation: 'SRAM uses 6 transistors in flip-flop configuration with no refresh requirement.'
      },
      {
        id: 'cs202-final-25',
        type: 'multiple_choice',
        prompt: 'DDR (Double Data Rate) means:',
        options: [
          'Double capacity',
          'Data transfers on both clock edges',
          'Two memory channels',
          'Double voltage'
        ],
        correctAnswer: 1,
        explanation: 'DDR transfers data on both rising and falling clock edges, doubling the effective data rate.'
      },
      {
        id: 'cs202-final-26',
        type: 'multiple_choice',
        prompt: 'A row buffer hit in DRAM is fast because:',
        options: [
          'Data is in the CPU cache',
          'The row is already in sense amplifiers',
          'Memory is pre-fetched',
          'Refresh was just completed'
        ],
        correctAnswer: 1,
        explanation: 'Row buffer hit means the requested row is already open, requiring only column access.'
      },
      {
        id: 'cs202-final-27',
        type: 'multiple_choice',
        prompt: 'SSDs are faster than HDDs for random access primarily because:',
        options: [
          'Larger caches',
          'No mechanical seek time',
          'Faster memory chips',
          'More channels'
        ],
        correctAnswer: 1,
        explanation: 'SSDs eliminate mechanical seek and rotation latency that dominates HDD random access time.'
      },
      {
        id: 'cs202-final-28',
        type: 'multiple_choice',
        prompt: 'The Flash Translation Layer (FTL) handles:',
        options: [
          'CPU instruction translation',
          'Address mapping and wear leveling for flash',
          'Virtual memory',
          'Cache coherence'
        ],
        correctAnswer: 1,
        explanation: 'FTL manages flash\'s erase-before-write constraint through address mapping and wear leveling.'
      },
      {
        id: 'cs202-final-29',
        type: 'multiple_choice',
        prompt: 'Calculate bandwidth: DDR4-3200, 64-bit channel',
        options: ['12.8 GB/s', '25.6 GB/s', '51.2 GB/s', '6.4 GB/s'],
        correctAnswer: 1,
        explanation: 'Bandwidth = 3200 MT/s × 8 bytes = 25,600 MB/s = 25.6 GB/s.'
      },
      {
        id: 'cs202-final-30',
        type: 'multiple_choice',
        prompt: 'According to Little\'s Law, to increase memory throughput you need:',
        options: [
          'Faster clock only',
          'Larger cache only',
          'More outstanding memory requests',
          'Lower latency only'
        ],
        correctAnswer: 2,
        explanation: 'Little\'s Law: Throughput = Outstanding requests / Latency. More requests increase throughput.'
      },
      {
        id: 'cs202-final-31',
        type: 'multiple_choice',
        prompt: 'FR-FCFS memory scheduling prioritizes:',
        options: [
          'Oldest requests always',
          'Row buffer hits, then by age',
          'Smallest requests first',
          'Write requests'
        ],
        correctAnswer: 1,
        explanation: 'FR-FCFS prioritizes requests hitting the open row buffer to exploit row locality.'
      },
      {
        id: 'cs202-final-32',
        type: 'multiple_choice',
        prompt: 'HBM achieves high bandwidth through:',
        options: [
          'Higher clock speeds',
          '3D stacking with wide interfaces',
          'Larger capacitors',
          'More refresh'
        ],
        correctAnswer: 1,
        explanation: 'HBM uses 3D stacking with TSVs and 1024-bit wide interfaces for extreme bandwidth.'
      },
      {
        id: 'cs202-final-33',
        type: 'multiple_choice',
        prompt: 'Which memory technology is non-volatile?',
        options: ['SRAM', 'DRAM', 'Flash', 'All of the above'],
        correctAnswer: 2,
        explanation: 'Flash retains data without power. SRAM and DRAM are volatile.'
      },
      // Topic 7: ILP (10 questions)
      {
        id: 'cs202-final-34',
        type: 'multiple_choice',
        prompt: 'Instruction-Level Parallelism (ILP) refers to:',
        options: [
          'Running multiple programs',
          'Executing multiple instructions simultaneously within one program',
          'Multiple CPU cores',
          'SIMD operations'
        ],
        correctAnswer: 1,
        explanation: 'ILP is executing multiple instructions from a single instruction stream in parallel.'
      },
      {
        id: 'cs202-final-35',
        type: 'multiple_choice',
        prompt: 'In Tomasulo\'s algorithm, reservation stations:',
        options: [
          'Store branch predictions',
          'Hold instructions waiting for operands',
          'Cache memory data',
          'Track program counter values'
        ],
        correctAnswer: 1,
        explanation: 'Reservation stations hold instructions waiting for their source operands to become available.'
      },
      {
        id: 'cs202-final-36',
        type: 'multiple_choice',
        prompt: 'The Reorder Buffer (ROB) ensures:',
        options: [
          'Faster execution',
          'In-order commit despite out-of-order execution',
          'More reservation stations',
          'Better cache performance'
        ],
        correctAnswer: 1,
        explanation: 'ROB maintains program order for commits, enabling precise exceptions with OoO execution.'
      },
      {
        id: 'cs202-final-37',
        type: 'multiple_choice',
        prompt: 'Register renaming eliminates which hazards?',
        options: ['RAW only', 'WAR and WAW', 'All hazards', 'Control hazards'],
        correctAnswer: 1,
        explanation: 'Renaming eliminates false dependencies (WAR, WAW) but not true dependencies (RAW).'
      },
      {
        id: 'cs202-final-38',
        type: 'multiple_choice',
        prompt: 'VLIW processors rely on:',
        options: [
          'Hardware to find parallelism',
          'Compiler to explicitly encode parallelism',
          'Branch prediction',
          'Cache prefetching'
        ],
        correctAnswer: 1,
        explanation: 'VLIW depends on the compiler to find and encode parallelism in wide instructions.'
      },
      {
        id: 'cs202-final-39',
        type: 'multiple_choice',
        prompt: 'AVX-512 registers are how many bits wide?',
        options: ['128', '256', '512', '1024'],
        correctAnswer: 2,
        explanation: 'AVX-512 provides 512-bit registers for SIMD operations.'
      },
      {
        id: 'cs202-final-40',
        type: 'multiple_choice',
        prompt: 'Speculative execution means:',
        options: [
          'Random instruction selection',
          'Executing instructions before knowing if they should execute',
          'Parallel memory access',
          'Multi-threading'
        ],
        correctAnswer: 1,
        explanation: 'Speculative execution executes past branches before outcomes are known, recovering if wrong.'
      },
      {
        id: 'cs202-final-41',
        type: 'multiple_choice',
        prompt: 'The Common Data Bus (CDB) in Tomasulo\'s:',
        options: [
          'Connects CPU to memory',
          'Broadcasts results to all waiting units',
          'Handles instruction fetch',
          'Manages branch prediction'
        ],
        correctAnswer: 1,
        explanation: 'CDB broadcasts results to all reservation stations and registers simultaneously.'
      },
      {
        id: 'cs202-final-42',
        type: 'multiple_choice',
        prompt: 'The main limit to increasing ILP is:',
        options: [
          'Clock speed',
          'True data dependencies and branches',
          'Cache size',
          'Register count'
        ],
        correctAnswer: 1,
        explanation: 'True dependencies and control flow (branches) fundamentally limit available ILP.'
      },
      {
        id: 'cs202-final-43',
        type: 'multiple_choice',
        prompt: 'SIMD is most effective for:',
        options: [
          'Branch-heavy code',
          'Irregular memory access',
          'Regular operations on arrays of data',
          'Single-threaded applications'
        ],
        correctAnswer: 2,
        explanation: 'SIMD excels at applying the same operation to many data elements, common in array processing.'
      },
    ],
  },
];
