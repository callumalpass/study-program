import { Quiz } from '../../../core/types';

export const cs102Quizzes: Quiz[] = [
  {
    id: 'cs102-quiz-1',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Number Systems and Conversion Quiz',
    questions: [
      {
        id: 'cs102-q1-1',
        type: 'multiple_choice',
        prompt: 'What is the decimal value of binary 11010?',
        options: ['24', '26', '28', '30'],
        correctAnswer: 1,
        explanation: 'Binary 11010 = 1×16 + 1×8 + 0×4 + 1×2 + 0×1 = 16 + 8 + 2 = 26 in decimal.'
      },
      {
        id: 'cs102-q1-2',
        type: 'multiple_choice',
        prompt: 'What is the hexadecimal representation of decimal 255?',
        options: ['EE', 'FF', '100', 'FE'],
        correctAnswer: 1,
        explanation: 'Decimal 255 = 15×16 + 15×1 = F×16 + F = FF in hexadecimal.'
      },
      {
        id: 'cs102-q1-3',
        type: 'multiple_choice',
        prompt: 'How many bits are required to represent one hexadecimal digit?',
        options: ['2 bits', '4 bits', '8 bits', '16 bits'],
        correctAnswer: 1,
        explanation: 'Each hexadecimal digit represents 16 possible values (0-15), which requires exactly 4 binary bits (2^4 = 16).'
      },
      {
        id: 'cs102-q1-4',
        type: 'true_false',
        prompt: 'Binary 100000 equals octal 40.',
        correctAnswer: true,
        explanation: '100000₂ = 32 + 0 + 0 + 0 + 0 + 0 = 32₁₀. 40₈ = 4·8 + 0 = 32₁₀, so they match.'
      },
      {
        id: 'cs102-q1-5',
        type: 'multiple_choice',
        prompt: 'Which base is most convenient to group binary into 3-bit chunks?',
        options: ['Base 4', 'Base 8', 'Base 10', 'Base 16'],
        correctAnswer: 1,
        explanation: 'Octal (base 8) maps 1 digit ↔ 3 bits (2^3 = 8), making grouping natural.'
      }
    ]
  },
  {
    id: 'cs102-quiz-2',
    subjectId: 'cs102',
    topicId: 'cs102-2',
    title: 'Binary Arithmetic Quiz',
    questions: [
      {
        id: 'cs102-q2-1',
        type: 'multiple_choice',
        prompt: 'What is the result of binary addition: 1011 + 0110?',
        options: ['10000', '10001', '10010', '10011'],
        correctAnswer: 1,
        explanation: '1011 (11) + 0110 (6) = 10001 (17 in decimal). Working right to left: 1+0=1, 1+1=10 (carry 1), 0+1+1=10 (carry 1), 1+0+1=10.'
      },
      {
        id: 'cs102-q2-2',
        type: 'multiple_choice',
        prompt: 'What is the two\'s complement of binary 0101 (4-bit)?',
        options: ['1010', '1011', '1100', '1101'],
        correctAnswer: 1,
        explanation: 'Two\'s complement is found by inverting all bits (0101 → 1010) and adding 1 (1010 + 1 = 1011). This represents -5 in 4-bit two\'s complement.'
      },
      {
        id: 'cs102-q2-3',
        type: 'true_false',
        prompt: 'In two\'s complement representation, there is only one representation for zero.',
        correctAnswer: true,
        explanation: 'True. One advantage of two\'s complement over sign-magnitude representation is that zero has only one representation (all bits zero), eliminating the problem of negative zero.'
      },
      {
        id: 'cs102-q2-4',
        type: 'multiple_choice',
        prompt: 'What is the two\'s complement 8-bit representation of -1?',
        options: ['0000 0001', '1111 1111', '1000 0000', '0111 1111'],
        correctAnswer: 1,
        explanation: 'Start from 0000 0001, flip bits → 1111 1110, add 1 → 1111 1111.'
      },
      {
        id: 'cs102-q2-5',
        type: 'multiple_choice',
        prompt: 'Binary 0101 1010 + 0011 0011 (unsigned) equals:',
        options: ['1000 1101', '0111 1101', '1100 1101', '1001 0000'],
        correctAnswer: 0,
        explanation: '90 + 51 = 141 decimal → 1000 1101₂.'
      }
    ]
  },
  {
    id: 'cs102-quiz-3',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Data Representation Quiz',
    questions: [
      {
        id: 'cs102-q3-1',
        type: 'multiple_choice',
        prompt: 'What is the range of values for an 8-bit unsigned integer?',
        options: ['-128 to 127', '0 to 255', '-255 to 255', '0 to 256'],
        correctAnswer: 1,
        explanation: 'An 8-bit unsigned integer can represent 2^8 = 256 different values, ranging from 0 to 255.'
      },
      {
        id: 'cs102-q3-2',
        type: 'multiple_choice',
        prompt: 'Which encoding standard is most suitable for representing international text?',
        options: ['ASCII', 'EBCDIC', 'UTF-8', 'Binary'],
        correctAnswer: 2,
        explanation: 'UTF-8 is a Unicode encoding that can represent characters from virtually all written languages, making it ideal for international text. ASCII only supports 128 characters.'
      },
      {
        id: 'cs102-q3-3',
        type: 'true_false',
        prompt: 'Floating-point representation can exactly represent all decimal numbers.',
        correctAnswer: false,
        explanation: 'False. Floating-point representation cannot exactly represent many decimal numbers (like 0.1) due to the binary nature of computers, leading to precision limitations.'
      },
      {
        id: 'cs102-q3-4',
        type: 'multiple_choice',
        prompt: 'Which of these byte sequences is valid UTF-8?',
        options: ['FF FE', 'C3 A9', '80 80', 'C0 AF'],
        correctAnswer: 1,
        explanation: 'C3 A9 is UTF-8 for é (U+00E9). FF FE is a UTF-16 BOM, 80 80 and C0 AF are invalid UTF-8 forms.'
      },
      {
        id: 'cs102-q3-5',
        type: 'multiple_choice',
        prompt: 'In IEEE 754 single-precision, the exponent bias is:',
        options: ['127', '128', '1023', '2047'],
        correctAnswer: 0,
        explanation: 'Single-precision uses an 8-bit exponent with bias 127. Double uses 11 bits with bias 1023.'
      }
    ]
  },
  {
    id: 'cs102-quiz-4',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'Boolean Algebra and Logic Gates Quiz',
    questions: [
      {
        id: 'cs102-q4-1',
        type: 'multiple_choice',
        prompt: 'What is the output of an AND gate when both inputs are 1?',
        options: ['0', '1', 'Undefined', 'Depends on implementation'],
        correctAnswer: 1,
        explanation: 'An AND gate outputs 1 only when both inputs are 1. For all other input combinations (0,0), (0,1), or (1,0), the output is 0.'
      },
      {
        id: 'cs102-q4-2',
        type: 'multiple_choice',
        prompt: 'According to De Morgan\'s theorem, NOT(A AND B) is equivalent to:',
        options: ['(NOT A) AND (NOT B)', '(NOT A) OR (NOT B)', 'A OR B', 'A AND B'],
        correctAnswer: 1,
        explanation: 'De Morgan\'s theorem states that NOT(A AND B) = (NOT A) OR (NOT B). This is one of the fundamental laws for simplifying Boolean expressions.'
      },
      {
        id: 'cs102-q4-3',
        type: 'multiple_choice',
        prompt: 'What is the output of an XOR gate when inputs are different?',
        options: ['0', '1', 'Both inputs', 'Neither input'],
        correctAnswer: 1,
        explanation: 'An XOR (exclusive OR) gate outputs 1 when the inputs are different (one 0 and one 1), and outputs 0 when both inputs are the same.'
      },
      {
        id: 'cs102-q4-4',
        type: 'true_false',
        prompt: 'NAND gates alone can be combined to build any Boolean function.',
        correctAnswer: true,
        explanation: 'True. NAND is functionally complete; you can derive NOT, AND, OR, and any other gate from it.'
      },
      {
        id: 'cs102-q4-5',
        type: 'multiple_choice',
        prompt: 'Simplify the expression (A ∧ 1) ∨ (A ∧ 0).',
        options: ['A', '¬A', '1', '0'],
        correctAnswer: 0,
        explanation: 'A ∧ 1 = A, A ∧ 0 = 0, so expression reduces to A ∨ 0 = A.'
      }
    ]
  },
  {
    id: 'cs102-quiz-5',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Basic Computer Architecture Quiz',
    questions: [
      {
        id: 'cs102-q5-1',
        type: 'multiple_choice',
        prompt: 'Which component of the CPU performs arithmetic and logical operations?',
        options: ['Control Unit', 'ALU', 'Registers', 'Cache'],
        correctAnswer: 1,
        explanation: 'The ALU (Arithmetic Logic Unit) is responsible for performing all arithmetic operations (addition, subtraction) and logical operations (AND, OR, NOT).'
      },
      {
        id: 'cs102-q5-2',
        type: 'multiple_choice',
        prompt: 'What are the three main phases of the fetch-decode-execute cycle?',
        options: ['Read-Write-Store', 'Fetch-Decode-Execute', 'Load-Process-Save', 'Input-Compute-Output'],
        correctAnswer: 1,
        explanation: 'The CPU operates in a continuous cycle of fetching instructions from memory, decoding them to understand what operation to perform, and executing the instruction.'
      },
      {
        id: 'cs102-q5-3',
        type: 'true_false',
        prompt: 'Cache memory is larger but slower than main memory (RAM).',
        correctAnswer: false,
        explanation: 'False. Cache memory is smaller but much faster than main memory. It sits between the CPU and RAM to provide quick access to frequently used data.'
      },
      {
        id: 'cs102-q5-4',
        type: 'multiple_choice',
        prompt: 'Which component holds the address of the next instruction to fetch?',
        options: ['Instruction register', 'Program counter', 'Stack pointer', 'Memory address register'],
        correctAnswer: 1,
        explanation: 'The program counter (PC) tracks the address of the next instruction to fetch.'
      },
      {
        id: 'cs102-q5-5',
        type: 'multiple_choice',
        prompt: 'A cache hit means:',
        options: ['Data found in main memory', 'Data found in cache', 'Data found on disk', 'Data lost'],
        correctAnswer: 1,
        explanation: 'A cache hit finds the requested data in the cache, avoiding a slower main-memory access.'
      }
    ]
  }
];
