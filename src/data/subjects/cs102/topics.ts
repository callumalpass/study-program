import { Topic } from '../../../core/types';

export const cs102Topics: Topic[] = [
  {
    id: 'cs102-1',
    title: 'Number Systems and Conversion',
    content: 'Number systems are foundational to understanding how computers represent and process data. The decimal system (base-10) is what humans naturally use, but computers operate using binary (base-2), where each digit is either 0 or 1. Hexadecimal (base-16) provides a compact way to represent binary values, using digits 0-9 and letters A-F. Converting between these systems is essential for computer science.\n\nTo convert from binary to decimal, multiply each bit by its corresponding power of 2 and sum the results. For example, binary 1011 equals 8+0+2+1=11 in decimal. Converting from decimal to binary involves repeatedly dividing by 2 and recording remainders. Hexadecimal conversion often uses binary as an intermediate step, where each hex digit represents exactly 4 binary bits.\n\nOctal (base-8) is less common but still used in some systems. Understanding these conversions helps programmers work with memory addresses, color codes, file permissions, and low-level debugging. Mastering number systems provides insight into how computers fundamentally represent all information as sequences of bits.',
    quizIds: ['cs102-quiz-1'],
    exerciseIds: ['cs102-ex-1', 'cs102-t1-ex02', 'cs102-t1-ex03', 'cs102-t1-ex04', 'cs102-t1-ex05', 'cs102-t1-ex06', 'cs102-t1-ex07', 'cs102-t1-ex08']
  },
  {
    id: 'cs102-2',
    title: 'Binary Arithmetic',
    content: 'Binary arithmetic forms the basis of all computer calculations. Addition in binary follows similar rules to decimal addition, but carries occur when the sum reaches 2 rather than 10. For example, 1+1=10 in binary (which is 2 in decimal). Binary subtraction can be performed directly, but computers typically use addition with negative numbers instead.\n\nTwo\'s complement representation is the standard method for representing signed integers in computers. To find the two\'s complement of a number, invert all bits (ones\' complement) and add 1. This elegant system allows the same hardware to perform both addition and subtraction, and eliminates the problem of having two representations for zero.\n\nOverflow occurs when an arithmetic operation produces a result too large to fit in the allocated number of bits. Understanding overflow is critical for writing robust software, as it can lead to subtle bugs and security vulnerabilities. Binary multiplication and division follow algorithms similar to decimal long multiplication and division, but are simpler due to only having two possible digits.',
    quizIds: ['cs102-quiz-2'],
    exerciseIds: ['cs102-ex-2', 'cs102-t2-ex02', 'cs102-t2-ex03', 'cs102-t2-ex04', 'cs102-t2-ex05', 'cs102-t2-ex06', 'cs102-t2-ex07', 'cs102-t2-ex08']
  },
  {
    id: 'cs102-3',
    title: 'Data Representation',
    content: 'Computers represent all data as binary numbers, but different types of data require different encoding schemes. Integers can be represented as unsigned (only positive values) or signed (using two\'s complement for negative values). The range of representable values depends on the number of bits allocated: an 8-bit unsigned integer can represent 0-255, while an 8-bit signed integer represents -128 to 127.\n\nFloating-point representation allows computers to approximate real numbers. The IEEE 754 standard defines formats for single-precision (32-bit) and double-precision (64-bit) floating-point numbers. These formats divide bits into sign, exponent, and mantissa fields, enabling representation of very large and very small numbers, though with limited precision.\n\nCharacter encoding maps characters to numbers. ASCII uses 7 or 8 bits to represent 128 or 256 characters, sufficient for English but not for international text. Unicode, particularly UTF-8 encoding, has become the standard for representing text in any language. Understanding data representation helps programmers choose appropriate data types, avoid precision errors, and work with binary file formats.',
    quizIds: ['cs102-quiz-3'],
    exerciseIds: ['cs102-ex-3', 'cs102-t3-ex02', 'cs102-t3-ex03', 'cs102-t3-ex04', 'cs102-t3-ex05', 'cs102-t3-ex06', 'cs102-t3-ex07', 'cs102-t3-ex08']
  },
  {
    id: 'cs102-4',
    title: 'Boolean Algebra and Logic Gates',
    content: 'Boolean algebra is the mathematical foundation of digital logic, operating on binary values (true/false or 1/0). The fundamental operations are AND, OR, and NOT. AND produces 1 only when both inputs are 1; OR produces 1 when either input is 1; NOT inverts its input. From these basic operations, we can derive NAND, NOR, XOR, and XNOR gates, which have specific applications in circuit design.\n\nBoolean algebra follows laws similar to regular algebra, including commutative, associative, and distributive properties, plus unique laws like De Morgan\'s theorems. These laws allow us to simplify complex Boolean expressions, which is essential for optimizing digital circuits. Truth tables provide a systematic way to evaluate Boolean expressions for all possible input combinations.\n\nLogic gates are physical implementations of Boolean operations using transistors. By combining logic gates, we can build complex digital circuits that perform arithmetic, store data, and make decisions. Understanding Boolean algebra and logic gates bridges the gap between abstract computer science concepts and physical hardware implementation, revealing how software instructions ultimately become electrical signals.',
    quizIds: ['cs102-quiz-4'],
    exerciseIds: ['cs102-ex-4', 'cs102-t4-ex02', 'cs102-t4-ex03', 'cs102-t4-ex04', 'cs102-t4-ex05', 'cs102-t4-ex06', 'cs102-t4-ex07', 'cs102-t4-ex08', 'cs102-t4-ex09']
  },
  {
    id: 'cs102-5',
    title: 'Basic Computer Architecture',
    content: 'Computer architecture describes the fundamental organization of computer systems. The Von Neumann architecture, used in most modern computers, consists of a CPU (Central Processing Unit), memory, and I/O devices connected by buses. The CPU contains the ALU (Arithmetic Logic Unit) for computations, control unit for managing instruction execution, and registers for fast temporary storage.\n\nThe fetch-decode-execute cycle is the basic operation of a CPU. During fetch, an instruction is retrieved from memory at the address in the program counter. During decode, the control unit interprets the instruction to determine what operation to perform. During execute, the CPU carries out the instruction, which might involve arithmetic operations, memory access, or changing the program counter.\n\nMemory hierarchy optimizes the tradeoff between speed and cost. Registers are fastest but smallest and most expensive. Cache memory provides fast access to frequently used data. Main memory (RAM) is larger but slower. Secondary storage (hard drives, SSDs) is largest but slowest. Understanding computer architecture helps programmers write efficient code that takes advantage of hardware capabilities and understand performance characteristics of different operations.',
    quizIds: ['cs102-quiz-5'],
    exerciseIds: ['cs102-ex-5', 'cs102-t5-ex02', 'cs102-t5-ex03', 'cs102-t5-ex04', 'cs102-t5-ex05', 'cs102-t5-ex06', 'cs102-t5-ex07', 'cs102-t5-ex08']
  }
];
