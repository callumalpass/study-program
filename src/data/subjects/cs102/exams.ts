import { Exam } from '../../../core/types';

export const cs102Exams: Exam[] = [
  {
    id: 'cs102-midterm',
    subjectId: 'cs102',
    title: 'Midterm Exam',
    durationMinutes: 75,
    instructions: [
      'Closed-book style: rely on concepts, not copy/paste.',
      'Answer all questions; passing is 70% or higher.',
    ],
    questions: [
      // Number Systems
      {
        id: 'cs102-mid-1',
        type: 'multiple_choice',
        prompt: 'Convert decimal 45 to binary.',
        options: ['101101', '101011', '00101101', '110101'],
        correctAnswer: 0,
        explanation: '32 + 8 + 4 + 1 = 45.'
      },
      {
        id: 'cs102-mid-2',
        type: 'multiple_choice',
        prompt: 'Convert hex C0 to decimal.',
        options: ['190', '192', '200', '180'],
        correctAnswer: 1,
        explanation: '12 * 16 = 192.'
      },
      {
        id: 'cs102-mid-3',
        type: 'fill_blank',
        prompt: 'What is the largest decimal value an 8-bit unsigned integer can hold?',
        correctAnswer: '255',
        explanation: '2^8 - 1 = 255.'
      },
      // Binary Arithmetic
      {
        id: 'cs102-mid-4',
        type: 'multiple_choice',
        prompt: '1100 + 0101 (binary) = ?',
        options: ['10000', '10001', '10010', '11100'],
        correctAnswer: 1,
        explanation: '12 + 5 = 17 (10001).'
      },
      {
        id: 'cs102-mid-5',
        type: 'multiple_choice',
        prompt: 'The 4-bit two\'s complement of -2 is:',
        options: ['1110', '1101', '1010', '0010'],
        correctAnswer: 0,
        explanation: '2 is 0010. Invert 1101. Add 1 -> 1110.'
      },
      {
        id: 'cs102-mid-6',
        type: 'true_false',
        prompt: 'Overflow cannot occur when adding a positive and a negative number.',
        correctAnswer: true,
        explanation: 'The result will always be within the range of the larger magnitude operand type.'
      },
      // Data Representation
      {
        id: 'cs102-mid-7',
        type: 'multiple_choice',
        prompt: 'ASCII value for space character is:',
        options: ['0', '32', '64', '127'],
        correctAnswer: 1,
        explanation: '0x20 = 32.'
      },
      {
        id: 'cs102-mid-8',
        type: 'multiple_choice',
        prompt: 'UTF-8 is:',
        options: ['Fixed width 16-bit', 'Variable width 1-4 bytes', 'Fixed width 8-bit', 'Variable width 2-4 bytes'],
        correctAnswer: 1,
        explanation: 'Variable width.'
      },
      {
        id: 'cs102-mid-9',
        type: 'code_output',
        prompt: 'What is the float value of sign=0, exp=127, mantissa=0?',
        codeSnippet: 'IEEE 754: 0 01111111 0000000...',
        correctAnswer: '1.0',
        explanation: 'Exp 127 - Bias 127 = 0. 1.0 * 2^0 = 1.0.'
      },
      // Boolean Logic
      {
        id: 'cs102-mid-10',
        type: 'multiple_choice',
        prompt: 'A NAND B is equivalent to:',
        options: ['NOT A AND NOT B', 'NOT A OR NOT B', 'NOT A AND B', 'A OR NOT B'],
        correctAnswer: 1,
        explanation: 'De Morgan\'s Law.'
      },
      {
        id: 'cs102-mid-11',
        type: 'multiple_choice',
        prompt: 'XOR gives 1 when:',
        options: ['Inputs are equal', 'Inputs are different', 'Both are 1', 'Both are 0'],
        correctAnswer: 1,
        explanation: 'Exclusive OR.'
      },
      {
        id: 'cs102-mid-12',
        type: 'true_false',
        prompt: 'A full adder has 3 inputs.',
        correctAnswer: true,
        explanation: 'A, B, Carry-In.'
      },
      // Mixed/Applied
      {
        id: 'cs102-mid-13',
        type: 'multiple_choice',
        prompt: 'Which gate is shown by truth table: 0,0->1; 0,1->1; 1,0->1; 1,1->0?',
        options: ['NAND', 'NOR', 'XOR', 'AND'],
        correctAnswer: 0,
        explanation: 'NAND output is 0 only when both inputs are 1.'
      },
      {
        id: 'cs102-mid-14',
        type: 'fill_blank',
        prompt: '0x2B AND 0x0F results in 0x___',
        correctAnswer: '0B',
        explanation: '00101011 AND 00001111 = 00001011 (0B).'
      },
      {
        id: 'cs102-mid-15',
        type: 'code_output',
        prompt: 'What is the output?',
        codeSnippet: 'print(bin(5 << 2))',
        correctAnswer: '0b10100',
        explanation: '5 (101) shifted left 2 is 10100 (20).'
      },
      // More coverage...
      {
        id: 'cs102-mid-16',
        type: 'multiple_choice',
        prompt: 'Big Endian stores the MSB at:',
        options: ['Lowest address', 'Highest address', 'Middle address', 'Random address'],
        correctAnswer: 0,
        explanation: 'Big Endian = Big End First.'
      },
      {
        id: 'cs102-mid-17',
        type: 'multiple_choice',
        prompt: 'What is the smallest signed 8-bit number?',
        options: ['-127', '-128', '0', '-255'],
        correctAnswer: 1,
        explanation: '-128 (10000000).'
      },
      {
        id: 'cs102-mid-18',
        type: 'true_false',
        prompt: 'Floating point numbers are distributed evenly on the number line.',
        correctAnswer: false,
        explanation: 'They are denser near zero.'
      },
      {
        id: 'cs102-mid-19',
        type: 'multiple_choice',
        prompt: 'Multiplexer (MUX) is used for:',
        options: ['Data Selection', 'Data Storage', 'Data Encryption', 'Data Deletion'],
        correctAnswer: 0,
        explanation: 'Selects one of N inputs.'
      },
      {
        id: 'cs102-mid-20',
        type: 'fill_blank',
        prompt: 'The hex digit representing binary 1110 is ____.',
        correctAnswer: 'E',
        explanation: '14 is E.'
      },
      {
        id: 'cs102-mid-21',
        type: 'multiple_choice',
        prompt: 'Sum of products (SOP) uses:',
        options: ['ANDs feeding an OR', 'ORs feeding an AND', 'NANDs only', 'NORs only'],
        correctAnswer: 0,
        explanation: 'Minterms (AND) summed (OR).'
      },
      {
        id: 'cs102-mid-22',
        type: 'multiple_choice',
        prompt: 'Which is a Universal Gate?',
        options: ['NOR', 'XOR', 'AND', 'NOT'],
        correctAnswer: 0,
        explanation: 'NOR (and NAND) are universal.'
      },
      {
        id: 'cs102-mid-23',
        type: 'true_false',
        prompt: 'Gray code changes only 1 bit between successive values.',
        correctAnswer: true,
        explanation: 'Minimizes errors in transitions.'
      },
      {
        id: 'cs102-mid-24',
        type: 'multiple_choice',
        prompt: 'Octal 10 equals Hex:',
        options: ['8', 'A', '10', 'C'],
        correctAnswer: 0,
        explanation: 'Oct 10 = Dec 8 = Hex 8.'
      },
      {
        id: 'cs102-mid-25',
        type: 'code_output',
        prompt: 'Output?',
        codeSnippet: '1 XOR 1 XOR 0',
        correctAnswer: '0',
        explanation: '1^1=0, 0^0=0.'
      }
    ]
  },
  {
    id: 'cs102-final',
    subjectId: 'cs102',
    title: 'Final Exam',
    durationMinutes: 120,
    instructions: [
      'Closed-book style: rely on concepts, not copy/paste.',
      'Answer all questions; passing is 70% or higher.',
    ],
    questions: [
      // Architecture
      {
        id: 'cs102-fin-1',
        type: 'multiple_choice',
        prompt: 'The register that points to the top of the stack is:',
        options: ['SP', 'PC', 'IR', 'MAR'],
        correctAnswer: 0,
        explanation: 'Stack Pointer.'
      },
      {
        id: 'cs102-fin-2',
        type: 'multiple_choice',
        prompt: 'Which is NOT a step in instruction cycle?',
        options: ['Fetch', 'Decode', 'Compile', 'Execute'],
        correctAnswer: 2,
        explanation: 'Compiling happens before runtime.'
      },
      {
        id: 'cs102-fin-3',
        type: 'multiple_choice',
        prompt: 'RISC architectures typically use:',
        options: ['Fixed length instructions', 'Variable length instructions', 'Complex hardware', 'Few registers'],
        correctAnswer: 0,
        explanation: 'Fixed length simplifies pipeline.'
      },
      // Assembly
      {
        id: 'cs102-fin-4',
        type: 'code_output',
        prompt: 'MOV AX, 5\nADD AX, 3\nResult in AX?',
        codeSnippet: '',
        correctAnswer: '8',
        explanation: '5+3=8.'
      },
      {
        id: 'cs102-fin-5',
        type: 'multiple_choice',
        prompt: 'What does JE target?',
        options: ['Jump if Equal', 'Jump if Empty', 'Jump if Error', 'Jump to End'],
        correctAnswer: 0,
        explanation: 'Jump Equal.'
      },
      {
        id: 'cs102-fin-6',
        type: 'fill_blank',
        prompt: 'The opcode for "Move" is usually ____.',
        correctAnswer: 'MOV',
        explanation: 'MOV.'
      },
      // Memory
      {
        id: 'cs102-fin-7',
        type: 'multiple_choice',
        prompt: 'L1 Cache is:',
        options: ['Faster than L2', 'Slower than L2', 'Same as RAM', 'Non-volatile'],
        correctAnswer: 0,
        explanation: 'Fastest and smallest.'
      },
      {
        id: 'cs102-fin-8',
        type: 'multiple_choice',
        prompt: 'A high hit rate is desirable for:',
        options: ['Cache', 'Misses', 'Page Faults', 'Interrupts'],
        correctAnswer: 0,
        explanation: 'Cache efficiency.'
      },
      {
        id: 'cs102-fin-9',
        type: 'true_false',
        prompt: 'Spatial locality refers to accessing nearby data.',
        correctAnswer: true,
        explanation: 'True.'
      },
      // Logic & Numbers Review
      {
        id: 'cs102-fin-10',
        type: 'multiple_choice',
        prompt: 'De Morgan: ~(A + B) = ?',
        options: ['~A . ~B', '~A + ~B', '~A . B', 'A . ~B'],
        correctAnswer: 0,
        explanation: 'NOR = NOT A AND NOT B.'
      },
      {
        id: 'cs102-fin-11',
        type: 'multiple_choice',
        prompt: 'Hex 100 in decimal is:',
        options: ['256', '255', '100', '16'],
        correctAnswer: 0,
        explanation: '16^2 = 256.'
      },
      {
        id: 'cs102-fin-12',
        type: 'fill_blank',
        prompt: 'How many inputs does a NOT gate have?',
        correctAnswer: '1',
        explanation: 'Single input.'
      },
      // More Architecture/Assembly
      {
        id: 'cs102-fin-13',
        type: 'multiple_choice',
        prompt: 'Pipelining hazard caused by data dependency is:',
        options: ['Data Hazard', 'Structural Hazard', 'Control Hazard', 'Fire Hazard'],
        correctAnswer: 0,
        explanation: 'Data hazard.'
      },
      {
        id: 'cs102-fin-14',
        type: 'multiple_choice',
        prompt: 'Zero Flag (ZF) is set when:',
        options: ['Result is 0', 'Result is negative', 'Overflow', 'Carry'],
        correctAnswer: 0,
        explanation: 'Result is zero.'
      },
      {
        id: 'cs102-fin-15',
        type: 'multiple_choice',
        prompt: 'Addressing mode where the instruction contains the value:',
        options: ['Immediate', 'Direct', 'Indirect', 'Register'],
        correctAnswer: 0,
        explanation: 'Immediate.'
      },
      // Mixed Bags
      {
        id: 'cs102-fin-16',
        type: 'multiple_choice',
        prompt: 'What logic gate simulates a light switch with two switches (staircase)?',
        options: ['XOR', 'AND', 'OR', 'NAND'],
        correctAnswer: 0,
        explanation: 'XOR/XNOR allows toggling from either side.'
      },
      {
        id: 'cs102-fin-17',
        type: 'multiple_choice',
        prompt: 'Two\'s complement of -128 (8-bit) is:',
        options: ['10000000', '01111111', '11111111', '00000000'],
        correctAnswer: 0,
        explanation: 'It is its own two\'s complement (exception).'
      },
      {
        id: 'cs102-fin-18',
        type: 'true_false',
        prompt: 'DRAM requires refreshing.',
        correctAnswer: true,
        explanation: 'Capacitors leak charge.'
      },
      {
        id: 'cs102-fin-19',
        type: 'multiple_choice',
        prompt: 'Memory that maps virtual to physical addresses:',
        options: ['MMU', 'ALU', 'FPU', 'GPU'],
        correctAnswer: 0,
        explanation: 'Memory Management Unit.'
      },
      {
        id: 'cs102-fin-20',
        type: 'fill_blank',
        prompt: 'In assembly, RET returns from a ______.',
        correctAnswer: 'Procedure',
        explanation: 'Procedure/Function/Subroutine.'
      },
      {
        id: 'cs102-fin-21',
        type: 'multiple_choice',
        prompt: 'Which is bigger?',
        options: ['1 TB', '1 GB', '1 MB', '1 KB'],
        correctAnswer: 0,
        explanation: 'Terra > Giga.'
      },
      {
        id: 'cs102-fin-22',
        type: 'multiple_choice',
        prompt: 'Unicode code point U+0041 is:',
        options: ['A', 'a', '1', '@'],
        correctAnswer: 0,
        explanation: 'A.'
      },
      {
        id: 'cs102-fin-23',
        type: 'true_false',
        prompt: 'A cache line contains only one byte.',
        correctAnswer: false,
        explanation: 'It contains a block (e.g., 64 bytes).'
      },
      {
        id: 'cs102-fin-24',
        type: 'multiple_choice',
        prompt: 'The stored program concept is attributed to:',
        options: ['Von Neumann', 'Turing', 'Babbage', 'Lovelace'],
        correctAnswer: 0,
        explanation: 'Von Neumann architecture.'
      },
      {
        id: 'cs102-fin-25',
        type: 'code_output',
        prompt: '1 OR 0 AND 0 (Order: AND first)',
        codeSnippet: '',
        correctAnswer: '1',
        explanation: '0 AND 0 = 0. 1 OR 0 = 1.'
      },
      {
        id: 'cs102-fin-26',
        type: 'multiple_choice',
        prompt: 'Which is non-volatile?',
        options: ['ROM', 'RAM', 'Cache', 'Registers'],
        correctAnswer: 0,
        explanation: 'Read Only Memory retains data.'
      },
      {
        id: 'cs102-fin-27',
        type: 'multiple_choice',
        prompt: 'Clock speed is measured in:',
        options: ['Hertz', 'Watts', 'Bytes', 'Ohms'],
        correctAnswer: 0,
        explanation: 'Hz (cycles per second).'
      },
      {
        id: 'cs102-fin-28',
        type: 'multiple_choice',
        prompt: 'A bus that allows data to flow in both directions is:',
        options: ['Bidirectional', 'Unidirectional', 'Omnidirectional', 'None'],
        correctAnswer: 0,
        explanation: 'Data bus is bidirectional.'
      },
      {
        id: 'cs102-fin-29',
        type: 'true_false',
        prompt: 'Assembler converts assembly to machine code.',
        correctAnswer: true,
        explanation: 'True.'
      },
      {
        id: 'cs102-fin-30',
        type: 'multiple_choice',
        prompt: 'The binary equivalent of decimal 10 is:',
        options: ['1010', '1001', '1100', '1110'],
        correctAnswer: 0,
        explanation: '8+2=10.'
      },
      {
        id: 'cs102-fin-31',
        type: 'multiple_choice',
        prompt: 'Sign extension means:',
        options: ['Adding 0s to the right', 'Repeating the sign bit on the left when widening', 'Flipping all bits', 'Adding 1 to the value'],
        correctAnswer: 1,
        explanation: 'When widening a two’s complement value (e.g., 8-bit to 16-bit), you preserve the numeric value by copying the sign bit into the new high bits.'
      },
      {
        id: 'cs102-fin-32',
        type: 'fill_blank',
        prompt: 'In IEEE-754 single-precision (32-bit) floating point, the exponent bias is ____.',
        correctAnswer: '127',
        explanation: 'Single-precision uses an 8-bit exponent with bias 127.'
      },
      {
        id: 'cs102-fin-33',
        type: 'code_output',
        prompt: 'What is the final value of R0?',
        codeSnippet: `MOV R0, #0
MOV R1, #5
loop:
ADD R0, R0, R1
SUB R1, R1, #1
CMP R1, #0
JGT loop`,
        correctAnswer: '15',
        explanation: 'R0 accumulates 5+4+3+2+1 = 15; loop stops when R1 becomes 0.'
      },
      {
        id: 'cs102-fin-34',
        type: 'true_false',
        prompt: 'On a little-endian machine, the 32-bit value 0x01020304 is stored in memory (low→high addresses) as 04 03 02 01.',
        correctAnswer: true,
        explanation: 'Little endian stores the least significant byte at the lowest address.'
      },
      {
        id: 'cs102-fin-35',
        type: 'multiple_choice',
        prompt: 'You access a memory block for the first time and it is not in the cache. This miss is best described as:',
        options: ['Conflict miss', 'Capacity miss', 'Compulsory miss', 'Write-back miss'],
        correctAnswer: 2,
        explanation: 'The first access to a block must miss because the cache has never loaded it: a compulsory (cold) miss.'
      },
      {
        id: 'cs102-fin-36',
        type: 'written',
        prompt: 'Define temporal locality and spatial locality. Give one concrete example of each in a program.',
        correctAnswer: '',
        explanation: 'Temporal locality: recently accessed data/instructions are likely to be accessed again soon (e.g., repeatedly reading/updating a loop counter or frequently called function code). Spatial locality: nearby memory locations are likely to be accessed soon (e.g., iterating through an array sequentially so accessing arr[i] makes arr[i+1] likely).',
        modelAnswer: 'Temporal locality: recently accessed data/instructions are likely to be accessed again soon (e.g., repeatedly reading/updating a loop counter or frequently called function code). Spatial locality: nearby memory locations are likely to be accessed soon (e.g., iterating through an array sequentially so accessing arr[i] makes arr[i+1] likely).'
      },
      {
        id: 'cs102-fin-37',
        type: 'multiple_choice',
        prompt: 'Which expression is equivalent to XOR (A ⊕ B)?',
        options: ['(A AND B) OR (NOT A AND NOT B)', '(A AND NOT B) OR (NOT A AND B)', '(A OR B) AND (A AND B)', 'NOT(A OR B)'],
        correctAnswer: 1,
        explanation: 'XOR is true exactly when the inputs differ: (A ∧ ¬B) ∨ (¬A ∧ B).'
      },
      {
        id: 'cs102-fin-38',
        type: 'fill_blank',
        prompt: 'To compute the two’s complement negation of an N-bit value, invert all bits and add ____.',
        correctAnswer: '1',
        explanation: 'Two’s complement negation is bitwise NOT plus 1 within the fixed width.'
      },
      {
        id: 'cs102-fin-39',
        type: 'multiple_choice',
        prompt: 'A pipeline hazard caused by a branch where the next instruction address is unknown is a:',
        options: ['Data hazard', 'Structural hazard', 'Control hazard', 'Memory hazard'],
        correctAnswer: 2,
        explanation: 'Branches change control flow; until the branch is resolved, the pipeline may not know what to fetch next.'
      },
      {
        id: 'cs102-fin-40',
        type: 'code_output',
        prompt: 'What is the result in hex?',
        codeSnippet: '0x2B XOR 0x0F',
        correctAnswer: '0x24',
        explanation: '0x2B = 0010 1011, 0x0F = 0000 1111, XOR = 0010 0100 = 0x24.'
      },
      {
        id: 'cs102-fin-41',
        type: 'written',
        prompt: 'In 8-bit two’s complement, why is -128 a special case when you try to negate it?',
        correctAnswer: '',
        explanation: '8-bit two’s complement ranges from -128 to 127, so +128 is not representable. The bit pattern for -128 is 10000000; inverting gives 01111111 and adding 1 returns 10000000 again. Negating overflows and wraps back to itself.',
        modelAnswer: '8-bit two’s complement ranges from -128 to 127, so +128 is not representable. The bit pattern for -128 is 10000000; inverting gives 01111111 and adding 1 returns 10000000 again. Negating overflows and wraps back to itself.'
      },
      {
        id: 'cs102-fin-42',
        type: 'multiple_choice',
        prompt: 'DMA (Direct Memory Access) primarily improves performance by:',
        options: ['Making the CPU clock faster', 'Allowing devices to transfer blocks to/from RAM without per-byte CPU involvement', 'Eliminating the need for caches', 'Storing all programs in ROM'],
        correctAnswer: 1,
        explanation: 'DMA moves data between I/O devices and RAM with minimal CPU overhead; the CPU sets up the transfer and is notified when it completes.'
      }
    ]
  }
];
