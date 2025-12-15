import { Quiz } from '../../../core/types';

export const cs102Quizzes: Quiz[] = [
  // TOPIC 1: Number Systems
  {
    id: 'cs102-quiz-1',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Number Systems Fundamentals',
    questions: [
      {
        id: 'cs102-q1-1',
        type: 'multiple_choice',
        prompt: 'What is the decimal value of binary 11010?',
        options: ['24', '26', '28', '30'],
        correctAnswer: 1,
        explanation: '16 + 8 + 2 = 26.'
      },
      {
        id: 'cs102-q1-2',
        type: 'multiple_choice',
        prompt: 'What is the hexadecimal representation of decimal 255?',
        options: ['EE', 'FF', '100', 'FE'],
        correctAnswer: 1,
        explanation: 'FF = 15*16 + 15 = 255.'
      },
      {
        id: 'cs102-q1-3',
        type: 'multiple_choice',
        prompt: 'How many bits represent one hex digit?',
        options: ['2', '3', '4', '8'],
        correctAnswer: 2,
        explanation: 'Hex digits 0-F represent values 0-15, which takes 4 bits (2^4=16).'
      },
      {
        id: 'cs102-q1-4',
        type: 'true_false',
        prompt: 'Binary 100000 equals octal 40.',
        correctAnswer: true,
        explanation: '100000 (bin) = 32 (dec). 40 (oct) = 4*8 = 32 (dec).'
      },
      {
        id: 'cs102-q1-5',
        type: 'multiple_choice',
        prompt: 'What is the largest value representable by 8 bits?',
        options: ['128', '255', '256', '512'],
        correctAnswer: 1,
        explanation: '2^8 - 1 = 255.'
      }
    ]
  },
  {
    id: 'cs102-quiz-1-b',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Number Systems Application',
    questions: [
      {
        id: 'cs102-q1-b-1',
        type: 'multiple_choice',
        prompt: 'Convert hex 1A to binary.',
        options: ['00011010', '00011011', '00101010', '00010101'],
        correctAnswer: 0,
        explanation: '1->0001, A->1010. Combined: 00011010.'
      },
      {
        id: 'cs102-q1-b-2',
        type: 'fill_blank',
        prompt: 'What is the decimal value of octal 10?',
        correctAnswer: '8',
        explanation: '1*8 + 0*1 = 8.'
      },
      {
        id: 'cs102-q1-b-3',
        type: 'true_false',
        prompt: 'A byte contains exactly 2 nibbles.',
        correctAnswer: true,
        explanation: 'A nibble is 4 bits. A byte is 8 bits. 8/4 = 2.'
      },
      {
        id: 'cs102-q1-b-4',
        type: 'multiple_choice',
        prompt: 'Which number is larger?',
        options: ['Binary 1100', 'Decimal 11', 'Hex A', 'Octal 13'],
        correctAnswer: 0,
        explanation: '1100=12. Dec 11. Hex A=10. Oct 13=11. Largest is 12.'
      },
      {
        id: 'cs102-q1-b-5',
        type: 'multiple_choice',
        prompt: 'Convert binary 11110000 to hex.',
        options: ['F0', '0F', 'E0', '80'],
        correctAnswer: 0,
        explanation: '1111=F, 0000=0. So F0.'
      }
    ]
  },
  {
    id: 'cs102-quiz-1-c',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Number Systems Advanced',
    questions: [
      {
        id: 'cs102-q1-c-1',
        type: 'multiple_choice',
        prompt: 'What is the next integer after hex 9F?',
        options: ['A0', '100', '9E', '90'],
        correctAnswer: 0,
        explanation: 'After F comes 0 and carry 1 to the next digit. 9+1=A. So A0.'
      },
      {
        id: 'cs102-q1-c-2',
        type: 'multiple_choice',
        prompt: 'How many bytes are needed to store the number 65536?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 2,
        explanation: '65535 is the max for 2 bytes (16 bits). 65536 requires 17 bits, so 3 bytes (24 bits) are needed.'
      },
      {
        id: 'cs102-q1-c-3',
        type: 'fill_blank',
        prompt: 'The binary number 101010 represents what in decimal?',
        correctAnswer: '42',
        explanation: '32 + 8 + 2 = 42.'
      },
      {
        id: 'cs102-q1-c-4',
        type: 'true_false',
        prompt: 'Base 64 encoding uses A-Z, a-z, 0-9, and two symbols.',
        correctAnswer: true,
        explanation: '26+26+10+2 = 64 symbols.'
      },
      {
        id: 'cs102-q1-c-5',
        type: 'multiple_choice',
        prompt: 'Which base is typically used for defining CSS colors?',
        options: ['Binary', 'Octal', 'Decimal', 'Hexadecimal'],
        correctAnswer: 3,
        explanation: 'Hex colors like #FF0000 are standard.'
      }
    ]
  },

  // TOPIC 2: Binary Arithmetic
  {
    id: 'cs102-quiz-2',
    subjectId: 'cs102',
    topicId: 'cs102-2',
    title: 'Binary Arithmetic Fundamentals',
    questions: [
      {
        id: 'cs102-q2-1',
        type: 'multiple_choice',
        prompt: '1011 + 0110 = ?',
        options: ['10000', '10001', '10010', '10011'],
        correctAnswer: 1,
        explanation: '11 + 6 = 17 (10001).'
      },
      {
        id: 'cs102-q2-2',
        type: 'multiple_choice',
        prompt: 'The two\'s complement of 0101 is:',
        options: ['1010', '1011', '1100', '0101'],
        correctAnswer: 1,
        explanation: 'Invert 0101 -> 1010. Add 1 -> 1011.'
      },
      {
        id: 'cs102-q2-3',
        type: 'true_false',
        prompt: 'Adding two positive numbers can result in a negative number in signed arithmetic.',
        correctAnswer: true,
        explanation: 'This is called "overflow".'
      },
      {
        id: 'cs102-q2-4',
        type: 'multiple_choice',
        prompt: 'Subtracting binary is equivalent to:',
        options: ['Adding the inverse', 'Adding the two\'s complement', 'ANDing the bits', 'ORing the bits'],
        correctAnswer: 1,
        explanation: 'A - B = A + (-B).'
      },
      {
        id: 'cs102-q2-5',
        type: 'multiple_choice',
        prompt: '1111 (signed 4-bit) represents:',
        options: ['15', '-1', '-0', '1'],
        correctAnswer: 1,
        explanation: 'In two\'s complement, all 1s is -1.'
      }
    ]
  },
  {
    id: 'cs102-quiz-2-b',
    subjectId: 'cs102',
    topicId: 'cs102-2',
    title: 'Binary Arithmetic Application',
    questions: [
      {
        id: 'cs102-q2-b-1',
        type: 'multiple_choice',
        prompt: 'Perform logical left shift on 0011 by 1.',
        options: ['0001', '0110', '1100', '0111'],
        correctAnswer: 1,
        explanation: 'Shift bits left, fill with 0. 0011 -> 0110.'
      },
      {
        id: 'cs102-q2-b-2',
        type: 'fill_blank',
        prompt: 'What is 1010 (binary) multiplied by 10 (binary) in binary?',
        correctAnswer: '10100',
        explanation: 'Multiplying by 2 (10 bin) is a left shift. 1010 -> 10100.'
      },
      {
        id: 'cs102-q2-b-3',
        type: 'true_false',
        prompt: 'In unsigned arithmetic, a carry out of the MSB indicates overflow.',
        correctAnswer: true,
        explanation: 'If the result is too large to fit, a carry occurs.'
      },
      {
        id: 'cs102-q2-b-4',
        type: 'multiple_choice',
        prompt: 'Which operation clears a specific bit?',
        options: ['OR with 1', 'AND with 0', 'XOR with 1', 'NOT'],
        correctAnswer: 1,
        explanation: 'ANDing with 0 forces the bit to 0.'
      },
      {
        id: 'cs102-q2-b-5',
        type: 'multiple_choice',
        prompt: 'What is -3 in 4-bit two\'s complement?',
        options: ['1101', '1011', '1100', '1110'],
        correctAnswer: 0,
        explanation: '+3 is 0011. Invert -> 1100. Add 1 -> 1101.'
      }
    ]
  },
  {
    id: 'cs102-quiz-2-c',
    subjectId: 'cs102',
    topicId: 'cs102-2',
    title: 'Binary Arithmetic Advanced',
    questions: [
      {
        id: 'cs102-q2-c-1',
        type: 'multiple_choice',
        prompt: 'What is 0x80 + 0x80 in 8-bit signed arithmetic?',
        options: ['0x00 with Overflow', '0x100', '0x00', '0xFF'],
        correctAnswer: 0,
        explanation: '-128 + -128 = -256, which cannot fit in 8 bits (range -128 to +127). Result bits are 00, but overflow flag is set.'
      },
      {
        id: 'cs102-q2-c-2',
        type: 'multiple_choice',
        prompt: 'Arithmetic Right Shift of 1100 (signed) by 1 yields:',
        options: ['0110', '1110', '0011', '1001'],
        correctAnswer: 1,
        explanation: 'Arithmetic shift preserves the sign bit (1). So 1... shifts in. 1100 -> 1110.'
      },
      {
        id: 'cs102-q2-c-3',
        type: 'fill_blank',
        prompt: 'The range of a 5-bit two\'s complement number is -16 to ...?',
        correctAnswer: '15',
        explanation: '2^(5-1) - 1 = 15.'
      },
      {
        id: 'cs102-q2-c-4',
        type: 'true_false',
        prompt: 'XORing a value with itself results in 0.',
        correctAnswer: true,
        explanation: 'Always true. 1^1=0, 0^0=0.'
      },
      {
        id: 'cs102-q2-c-5',
        type: 'multiple_choice',
        prompt: 'To toggle the LSB of a number, you should:',
        options: ['AND with 1', 'OR with 1', 'XOR with 1', 'ADD 1'],
        correctAnswer: 2,
        explanation: 'XOR with 1 flips the bit.'
      }
    ]
  },

  // TOPIC 3: Data Representation
  {
    id: 'cs102-quiz-3',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Data Representation Fundamentals',
    questions: [
      {
        id: 'cs102-q3-1',
        type: 'multiple_choice',
        prompt: 'Range of 8-bit unsigned integer?',
        options: ['0-255', '-128 to 127', '0-256', '0-512'],
        correctAnswer: 0,
        explanation: '2^8 - 1 = 255.'
      },
      {
        id: 'cs102-q3-2',
        type: 'multiple_choice',
        prompt: 'Which encoding supports emojis?',
        options: ['ASCII', 'UTF-8', 'Base64', 'ANSI'],
        correctAnswer: 1,
        explanation: 'UTF-8 (Unicode).'
      },
      {
        id: 'cs102-q3-3',
        type: 'true_false',
        prompt: 'ASCII is a 7-bit code.',
        correctAnswer: true,
        explanation: 'Standard ASCII uses 7 bits (0-127).'
      },
      {
        id: 'cs102-q3-4',
        type: 'multiple_choice',
        prompt: 'IEEE 754 defines standard for:',
        options: ['Integers', 'Floating Point', 'Characters', 'Images'],
        correctAnswer: 1,
        explanation: 'Floating point arithmetic standard.'
      },
      {
        id: 'cs102-q3-5',
        type: 'multiple_choice',
        prompt: 'How many bits in a standard double precision float?',
        options: ['32', '64', '80', '128'],
        correctAnswer: 1,
        explanation: 'Double is 64-bit.'
      }
    ]
  },
  {
    id: 'cs102-quiz-3-b',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Data Representation Application',
    questions: [
      {
        id: 'cs102-q3-b-1',
        type: 'multiple_choice',
        prompt: 'Which hex byte represents the ASCII letter "A"?',
        options: ['41', '61', '30', '20'],
        correctAnswer: 0,
        explanation: 'A is 65 decimal, which is 0x41.'
      },
      {
        id: 'cs102-q3-b-2',
        type: 'fill_blank',
        prompt: 'If a system is Little Endian, the 32-bit int 0x12345678 is stored in memory as bytes: 78 56 ... ... (fill the last byte)',
        correctAnswer: '12',
        explanation: 'Reverse order: 78 56 34 12.'
      },
      {
        id: 'cs102-q3-b-3',
        type: 'true_false',
        prompt: '0.1 can be represented exactly in standard binary floating point.',
        correctAnswer: false,
        explanation: 'It is a repeating fraction in binary.'
      },
      {
        id: 'cs102-q3-b-4',
        type: 'multiple_choice',
        prompt: 'In IEEE 754 single precision, the exponent bias is:',
        options: ['127', '128', '15', '0'],
        correctAnswer: 0,
        explanation: 'Bias is 127.'
      },
      {
        id: 'cs102-q3-b-5',
        type: 'multiple_choice',
        prompt: 'UTF-8 uses variable length encoding. A character can be:',
        options: ['Always 1 byte', '1 to 4 bytes', 'Always 2 bytes', 'Always 4 bytes'],
        correctAnswer: 1,
        explanation: 'ASCII is 1 byte, others are 2-4.'
      }
    ]
  },
  {
    id: 'cs102-quiz-3-c',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Data Representation Advanced',
    questions: [
      {
        id: 'cs102-q3-c-1',
        type: 'multiple_choice',
        prompt: 'What special value corresponds to exponent=All-Ones and fraction=Non-Zero in IEEE 754?',
        options: ['Infinity', 'Zero', 'NaN', 'Denormalized'],
        correctAnswer: 2,
        explanation: 'NaN (Not a Number).'
      },
      {
        id: 'cs102-q3-c-2',
        type: 'multiple_choice',
        prompt: 'To convert "A" (0x41) to "a" (0x61), you can:',
        options: ['Add 0x20', 'Subtract 0x20', 'XOR with 0xFF', 'AND with 0xDF'],
        correctAnswer: 0,
        explanation: '0x41 + 0x20 = 0x61.'
      },
      {
        id: 'cs102-q3-c-3',
        type: 'true_false',
        prompt: 'Two\'s complement range is symmetric (e.g., -127 to +127).',
        correctAnswer: false,
        explanation: 'It is asymmetric. -128 to +127. There is one more negative number.'
      },
      {
        id: 'cs102-q3-c-4',
        type: 'fill_blank',
        prompt: 'The precision of a 32-bit float is approximately how many decimal digits?',
        correctAnswer: '7',
        explanation: '23 bits of mantissa corresponds to log10(2^24) approx 7.22.'
      },
      {
        id: 'cs102-q3-c-5',
        type: 'multiple_choice',
        prompt: 'BOM (Byte Order Mark) for Big Endian UTF-16 is:',
        options: ['FE FF', 'FF FE', 'EF BB BF', '00 00'],
        correctAnswer: 0,
        explanation: 'FE FF is Big Endian.'
      }
    ]
  },

  // TOPIC 4: Boolean Logic
  {
    id: 'cs102-quiz-4',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'Logic Gates Fundamentals',
    questions: [
      {
        id: 'cs102-q4-1',
        type: 'multiple_choice',
        prompt: 'Output of AND when inputs are 1, 1?',
        options: ['0', '1'],
        correctAnswer: 1,
        explanation: '1 AND 1 = 1.'
      },
      {
        id: 'cs102-q4-2',
        type: 'multiple_choice',
        prompt: 'Output of XOR when inputs are 1, 1?',
        options: ['0', '1'],
        correctAnswer: 0,
        explanation: 'Exclusive OR means one or the other, but not both.'
      },
      {
        id: 'cs102-q4-3',
        type: 'multiple_choice',
        prompt: 'Which gate outputs 0 only when both inputs are 1?',
        options: ['OR', 'NAND', 'NOR', 'XOR'],
        correctAnswer: 1,
        explanation: 'NAND is NOT AND. 1 AND 1 = 1, NOT 1 = 0.'
      },
      {
        id: 'cs102-q4-4',
        type: 'true_false',
        prompt: 'NOT(A) is 1 if A is 0.',
        correctAnswer: true,
        explanation: 'Inverter logic.'
      },
      {
        id: 'cs102-q4-5',
        type: 'multiple_choice',
        prompt: 'De Morgan: NOT(A AND B) = ?',
        options: ['NOT A AND NOT B', 'NOT A OR NOT B'],
        correctAnswer: 1,
        explanation: 'Break the line, change the sign.'
      }
    ]
  },
  {
    id: 'cs102-quiz-4-b',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'Logic Gates Application',
    questions: [
      {
        id: 'cs102-q4-b-1',
        type: 'multiple_choice',
        prompt: 'If A=1, B=0, C=1, what is (A AND B) OR C?',
        options: ['0', '1'],
        correctAnswer: 1,
        explanation: '(1 AND 0) = 0. 0 OR 1 = 1.'
      },
      {
        id: 'cs102-q4-b-2',
        type: 'multiple_choice',
        prompt: 'Which gate is "Universal"?',
        options: ['AND', 'OR', 'NAND', 'XOR'],
        correctAnswer: 2,
        explanation: 'NAND (and NOR) can build all other gates.'
      },
      {
        id: 'cs102-q4-b-3',
        type: 'true_false',
        prompt: 'A Half Adder produces a Sum and a Carry.',
        correctAnswer: true,
        explanation: 'Sum = A XOR B, Carry = A AND B.'
      },
      {
        id: 'cs102-q4-b-4',
        type: 'multiple_choice',
        prompt: 'Simplest form of A OR (A AND B)?',
        options: ['A', 'B', 'A AND B', '1'],
        correctAnswer: 0,
        explanation: 'Absorption Law.'
      },
      {
        id: 'cs102-q4-b-5',
        type: 'fill_blank',
        prompt: 'How many rows are in a truth table for 3 variables?',
        correctAnswer: '8',
        explanation: '2^3 = 8.'
      }
    ]
  },
  {
    id: 'cs102-quiz-4-c',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'Logic Gates Advanced',
    questions: [
      {
        id: 'cs102-q4-c-1',
        type: 'multiple_choice',
        prompt: 'A Full Adder can be constructed from:',
        options: ['2 Half Adders + OR', '2 Half Adders + AND', '3 Half Adders', '2 OR gates'],
        correctAnswer: 0,
        explanation: 'Standard composition.'
      },
      {
        id: 'cs102-q4-c-2',
        type: 'multiple_choice',
        prompt: 'Which expression is equivalent to A XOR B?',
        options: ['(A+B)(AB)', '(A+B)(~A+~B)', 'A+B', 'AB'],
        correctAnswer: 1,
        explanation: '(A OR B) AND (NOT A OR NOT B) is equivalent to (A OR B) AND NOT(A AND B).'
      },
      {
        id: 'cs102-q4-c-3',
        type: 'true_false',
        prompt: 'A 4:1 Multiplexer needs 2 selection bits.',
        correctAnswer: true,
        explanation: '2 bits can select 4 lines (00, 01, 10, 11).'
      },
      {
        id: 'cs102-q4-c-4',
        type: 'multiple_choice',
        prompt: 'The dual of expression (A + 1) is:',
        options: ['A . 1', 'A . 0', 'A + 0', '0'],
        correctAnswer: 1,
        explanation: 'Swap OR(+) with AND(.), and 1 with 0.'
      },
      {
        id: 'cs102-q4-c-5',
        type: 'multiple_choice',
        prompt: 'K-Maps are used for:',
        options: ['Calculating delay', 'Minimizing boolean expressions', 'Drawing circuits', 'Testing gates'],
        correctAnswer: 1,
        explanation: 'Karnaugh Maps help visualize simplification.'
      }
    ]
  },

  // TOPIC 5: Architecture
  {
    id: 'cs102-quiz-5',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Computer Architecture Fundamentals',
    questions: [
      {
        id: 'cs102-q5-1',
        type: 'multiple_choice',
        prompt: 'The "brain" of the computer is:',
        options: ['RAM', 'CPU', 'HDD', 'PSU'],
        correctAnswer: 1,
        explanation: 'CPU executes instructions.'
      },
      {
        id: 'cs102-q5-2',
        type: 'multiple_choice',
        prompt: 'ALU stands for:',
        options: ['Algorithmic Logic Unit', 'Arithmetic Logic Unit', 'Access Load Utility', 'Arithmetic Linear Unit'],
        correctAnswer: 1,
        explanation: 'It performs math and logic.'
      },
      {
        id: 'cs102-q5-3',
        type: 'true_false',
        prompt: 'Registers are faster than RAM.',
        correctAnswer: true,
        explanation: 'Registers are on-die and fastest.'
      },
      {
        id: 'cs102-q5-4',
        type: 'multiple_choice',
        prompt: 'The PC register holds:',
        options: ['Previous Command', 'Program Counter', 'Peripheral Control', 'Process Context'],
        correctAnswer: 1,
        explanation: 'Address of next instruction.'
      },
      {
        id: 'cs102-q5-5',
        type: 'multiple_choice',
        prompt: 'Fetch-Decode-Execute is:',
        options: ['The instruction cycle', 'The boot process', 'Memory management', 'Compiling'],
        correctAnswer: 0,
        explanation: 'Standard CPU cycle.'
      }
    ]
  },
  {
    id: 'cs102-quiz-5-b',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Architecture Application',
    questions: [
      {
        id: 'cs102-q5-b-1',
        type: 'multiple_choice',
        prompt: 'Which bus carries the memory address to fetch?',
        options: ['Data Bus', 'Address Bus', 'Control Bus', 'System Bus'],
        correctAnswer: 1,
        explanation: 'Address bus carries the location.'
      },
      {
        id: 'cs102-q5-b-2',
        type: 'true_false',
        prompt: 'A 32-bit CPU generally has 32-bit wide registers.',
        correctAnswer: true,
        explanation: 'The "bitness" usually refers to register/word size.'
      },
      {
        id: 'cs102-q5-b-3',
        type: 'multiple_choice',
        prompt: 'Von Neumann architecture feature:',
        options: ['Separate data/code memory', 'Shared data/code memory', 'No memory', 'Analog processing'],
        correctAnswer: 1,
        explanation: 'Von Neumann stores program and data in the same memory (unlike Harvard).'
      },
      {
        id: 'cs102-q5-b-4',
        type: 'multiple_choice',
        prompt: 'What happens if a Cache Miss occurs?',
        options: ['CPU stops', 'Fetch from RAM (slower)', 'Error thrown', 'Blue screen'],
        correctAnswer: 1,
        explanation: 'The system fetches from the next level of hierarchy.'
      },
      {
        id: 'cs102-q5-b-5',
        type: 'fill_blank',
        prompt: 'RISC stands for ________ Instruction Set Computer.',
        correctAnswer: 'Reduced',
        explanation: 'Reduced.'
      }
    ]
  },
  {
    id: 'cs102-quiz-5-c',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Architecture Advanced',
    questions: [
      {
        id: 'cs102-q5-c-1',
        type: 'multiple_choice',
        prompt: 'Pipelining improves performance by:',
        options: ['Increasing clock speed', 'Overlapping instruction phases', 'Adding more RAM', 'Reducing heat'],
        correctAnswer: 1,
        explanation: 'Multiple instructions are processed simultaneously in different stages.'
      },
      {
        id: 'cs102-q5-c-2',
        type: 'multiple_choice',
        prompt: 'A "Hazard" in pipelining refers to:',
        options: ['A dangerous voltage', 'A dependency causing a stall', 'A virus', 'A broken pin'],
        correctAnswer: 1,
        explanation: 'Data, structural, or control hazards prevent the next instruction from executing.'
      },
      {
        id: 'cs102-q5-c-3',
        type: 'true_false',
        prompt: 'CISC architectures usually have variable length instructions.',
        correctAnswer: true,
        explanation: 'x86 is CISC and has instructions from 1 to 15 bytes.'
      },
      {
        id: 'cs102-q5-c-4',
        type: 'multiple_choice',
        prompt: 'Which is NOT a type of cache mapping?',
        options: ['Direct Mapped', 'Fully Associative', 'Set Associative', 'Random Mapped'],
        correctAnswer: 3,
        explanation: 'Random mapped is not a standard term.'
      },
      {
        id: 'cs102-q5-c-5',
        type: 'multiple_choice',
        prompt: 'Superscalar processors can:',
        options: ['Execute >1 instruction per cycle', 'Run without a clock', 'Use 128-bit logic', 'Never stall'],
        correctAnswer: 0,
        explanation: 'They have multiple execution units (ALUs) to parallelize instruction completion.'
      }
    ]
  },

  // TOPIC 6: Assembly
  {
    id: 'cs102-quiz-6',
    subjectId: 'cs102',
    topicId: 'cs102-6',
    title: 'Assembly Basics Quiz',
    questions: [
      {
        id: 'cs102-q6-1',
        type: 'multiple_choice',
        prompt: 'In "MOV AX, 5", "MOV" is the:',
        options: ['Operand', 'Opcode', 'Label', 'Comment'],
        correctAnswer: 1,
        explanation: 'Opcode (Operation Code).'
      },
      {
        id: 'cs102-q6-2',
        type: 'multiple_choice',
        prompt: 'Which instruction adds values?',
        options: ['MOV', 'JMP', 'ADD', 'CMP'],
        correctAnswer: 2,
        explanation: 'ADD is for addition.'
      },
      {
        id: 'cs102-q6-3',
        type: 'true_false',
        prompt: 'Assembly language is portable across different CPU architectures.',
        correctAnswer: false,
        explanation: 'It is specific to the ISA (e.g., x86 assembly doesn\'t work on ARM).'
      },
      {
        id: 'cs102-q6-4',
        type: 'multiple_choice',
        prompt: 'JMP represents a:',
        options: ['Conditional Jump', 'Unconditional Jump', 'Function Call', 'Stop'],
        correctAnswer: 1,
        explanation: 'Jump always.'
      },
      {
        id: 'cs102-q6-5',
        type: 'fill_blank',
        prompt: 'The ";" character in assembly usually starts a ______.',
        correctAnswer: 'Comment',
        explanation: 'Comments.'
      }
    ]
  },
  {
    id: 'cs102-quiz-6-b',
    subjectId: 'cs102',
    topicId: 'cs102-6',
    title: 'Assembly Application Quiz',
    questions: [
      {
        id: 'cs102-q6-b-1',
        type: 'multiple_choice',
        prompt: 'CMP A, B followed by JE Label means:',
        options: ['Jump if A > B', 'Jump if A < B', 'Jump if A = B', 'Jump always'],
        correctAnswer: 2,
        explanation: 'Jump if Equal.'
      },
      {
        id: 'cs102-q6-b-2',
        type: 'multiple_choice',
        prompt: 'Stack operates on LIFO principle. LIFO means:',
        options: ['Last In First Out', 'Low Interest First Option', 'Last Int First Op', 'Linear Input'],
        correctAnswer: 0,
        explanation: 'Last In First Out.'
      },
      {
        id: 'cs102-q6-b-3',
        type: 'true_false',
        prompt: 'PUSH adds an item to the stack.',
        correctAnswer: true,
        explanation: 'True.'
      },
      {
        id: 'cs102-q6-b-4',
        type: 'multiple_choice',
        prompt: 'Addressing mode for "MOV AX, [1000]"?',
        options: ['Immediate', 'Register', 'Direct', 'Indirect'],
        correctAnswer: 2,
        explanation: 'Accessing memory at a constant address.'
      },
      {
        id: 'cs102-q6-b-5',
        type: 'multiple_choice',
        prompt: 'If AX=5, "SUB AX, 5" sets the Zero Flag to:',
        options: ['0', '1', 'Undefined', 'No change'],
        correctAnswer: 1,
        explanation: 'Result is 0, so Zero Flag becomes 1 (True).'
      }
    ]
  },
  {
    id: 'cs102-quiz-6-c',
    subjectId: 'cs102',
    topicId: 'cs102-6',
    title: 'Assembly Advanced Quiz',
    questions: [
      {
        id: 'cs102-q6-c-1',
        type: 'multiple_choice',
        prompt: 'CALL instruction typically does what extra step compared to JMP?',
        options: ['Clears registers', 'Pushes return address to stack', 'Halts CPU', 'None'],
        correctAnswer: 1,
        explanation: 'So RET can return to the correct location.'
      },
      {
        id: 'cs102-q6-c-2',
        type: 'multiple_choice',
        prompt: 'The Stack Pointer (SP) usually grows:',
        options: ['Upwards (higher addresses)', 'Downwards (lower addresses)', 'Randomly', 'It doesn\'t move'],
        correctAnswer: 1,
        explanation: 'In most architectures (like x86), stack grows down.'
      },
      {
        id: 'cs102-q6-c-3',
        type: 'true_false',
        prompt: 'Indirect addressing "MOV AX, [BX]" is useful for arrays.',
        correctAnswer: true,
        explanation: 'You can increment BX to traverse the array.'
      },
      {
        id: 'cs102-q6-c-4',
        type: 'multiple_choice',
        prompt: 'Which flag is set if a signed arithmetic result is too large?',
        options: ['Carry Flag', 'Zero Flag', 'Overflow Flag', 'Parity Flag'],
        correctAnswer: 2,
        explanation: 'Overflow flag (OF).'
      },
      {
        id: 'cs102-q6-c-5',
        type: 'fill_blank',
        prompt: 'NOP stands for No ______.',
        correctAnswer: 'Operation',
        explanation: 'No Operation. Used for padding or timing.'
      }
    ]
  },

  // TOPIC 7: Memory Hierarchy
  {
    id: 'cs102-quiz-7',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Memory Hierarchy Basics',
    questions: [
      {
        id: 'cs102-q7-1',
        type: 'multiple_choice',
        prompt: 'Which is fastest?',
        options: ['Hard Disk', 'RAM', 'L1 Cache', 'USB Drive'],
        correctAnswer: 2,
        explanation: 'L1 Cache is closest to CPU.'
      },
      {
        id: 'cs102-q7-2',
        type: 'multiple_choice',
        prompt: 'Why use a hierarchy?',
        options: ['To confuse users', 'To balance speed, size, and cost', 'To use more power', 'Aesthetics'],
        correctAnswer: 1,
        explanation: 'Fast memory is expensive and small. Slow memory is cheap and large.'
      },
      {
        id: 'cs102-q7-3',
        type: 'true_false',
        prompt: 'Volatile memory loses data when power is off.',
        correctAnswer: true,
        explanation: 'RAM is volatile. Disk is non-volatile.'
      },
      {
        id: 'cs102-q7-4',
        type: 'multiple_choice',
        prompt: 'DMA stands for:',
        options: ['Direct Memory Access', 'Digital Media Audio', 'Dynamic Memory Allocation', 'Double Mapped Address'],
        correctAnswer: 0,
        explanation: 'Direct Memory Access.'
      },
      {
        id: 'cs102-q7-5',
        type: 'multiple_choice',
        prompt: 'Virtual memory uses:',
        options: ['Tapes', 'Pages', 'Blocks only', 'Segments only'],
        correctAnswer: 1,
        explanation: 'Paging is the standard technique.'
      }
    ]
  },
  {
    id: 'cs102-quiz-7-b',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Memory & I/O Application',
    questions: [
      {
        id: 'cs102-q7-b-1',
        type: 'multiple_choice',
        prompt: 'Temporal Locality means:',
        options: ['Data nearby is accessed', 'Data accessed recently will be accessed again', 'Data is temporary', 'Data is slow'],
        correctAnswer: 1,
        explanation: 'Recently used items are likely to be used again.'
      },
      {
        id: 'cs102-q7-b-2',
        type: 'multiple_choice',
        prompt: 'Interrupt driven I/O is better than Polling because:',
        options: ['It uses more CPU', 'CPU waits for device', 'CPU can do other work', 'It is simpler'],
        correctAnswer: 2,
        explanation: 'CPU doesn\'t busy-wait.'
      },
      {
        id: 'cs102-q7-b-3',
        type: 'true_false',
        prompt: 'A Page Fault occurs when data is not in Cache.',
        correctAnswer: false,
        explanation: 'Page Fault is when data is not in RAM (it is swapped to disk). Cache miss is different.'
      },
      {
        id: 'cs102-q7-b-4',
        type: 'multiple_choice',
        prompt: 'Moving pages between RAM and Disk is called:',
        options: ['Thrashing', 'Swapping', 'Caching', 'Flushing'],
        correctAnswer: 1,
        explanation: 'Swapping (or Paging).'
      },
      {
        id: 'cs102-q7-b-5',
        type: 'fill_blank',
        prompt: 'SRAM is used for Cache, DRAM is used for ______.',
        correctAnswer: 'RAM',
        explanation: 'Main Memory (RAM).'
      }
    ]
  },
  {
    id: 'cs102-quiz-7-c',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Memory & I/O Advanced',
    questions: [
      {
        id: 'cs102-q7-c-1',
        type: 'multiple_choice',
        prompt: 'If a cache has a hit rate of 90% and miss penalty is 100 cycles, what is the impact?',
        options: ['Huge slowdown', 'Minor slowdown', '10 cycles average penalty', '90 cycles average penalty'],
        correctAnswer: 2,
        explanation: 'Average Memory Access Time uses 0.10 * 100 = 10 cycles added.'
      },
      {
        id: 'cs102-q7-c-2',
        type: 'multiple_choice',
        prompt: 'LRU stands for:',
        options: ['Last Recently Used', 'Least Recently Used', 'Longest Run Unit', 'Linear RAM Util'],
        correctAnswer: 1,
        explanation: 'Eviction policy: remove the one not used for the longest time.'
      },
      {
        id: 'cs102-q7-c-3',
        type: 'true_false',
        prompt: 'Thrashing occurs when the OS spends more time paging than executing.',
        correctAnswer: true,
        explanation: 'Performance collapses.'
      },
      {
        id: 'cs102-q7-c-4',
        type: 'multiple_choice',
        prompt: 'Which write policy updates RAM immediately?',
        options: ['Write-Back', 'Write-Through', 'Write-Allocate', 'Write-Around'],
        correctAnswer: 1,
        explanation: 'Write-Through writes to cache and RAM simultaneously.'
      },
      {
        id: 'cs102-q7-c-5',
        type: 'multiple_choice',
        prompt: 'TLB (Translation Lookaside Buffer) caches:',
        options: ['Instructions', 'Data', 'Page Table Entries', 'Disk sectors'],
        correctAnswer: 2,
        explanation: 'Caches virtual-to-physical address translations.'
      }
    ]
  }
];