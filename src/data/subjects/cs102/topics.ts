import { Topic } from '../../../core/types';

export const cs102Topics: Topic[] = [
  {
    id: 'cs102-1',
    title: 'Number Systems and Conversion',
    content: String.raw`## Why Number Systems Matter

Everything a computer stores is a sequence of bits. We use different bases to make those bits readable:
- **Binary (base 2):** Hardware view (0/1 signals).
- **Hex (base 16):** Compact human view; 1 hex digit = 4 bits.
- **Octal (base 8):** Historical/Unix permissions shorthand.
- **Decimal (base 10):** Human default.

## Converting Between Bases
- **Binary → Decimal:** Sum each bit × its power of 2. Example: 1011 = 1·2^3 + 0·2^2 + 1·2^1 + 1·2^0 = 11.
- **Decimal → Binary:** Repeated divide-by-2; collect remainders in reverse.
- **Hex ↔ Binary:** Replace each hex digit with its 4-bit binary nibble (A = 1010, F = 1111).
- **Decimal → Hex:** Divide by 16, track remainders 0–F.

## Worked Example: 0x3F to Decimal
0x3F = 3·16^1 + 15·16^0 = 48 + 15 = 63. In binary, 0x3F = 0011 1111.

## Practical Uses
- Memory addresses, color values (#RRGGBB), bit masks, Unix permissions (0755).
- Network masks (e.g., /24), checksums, encoding/decoding tasks.

## Common Pitfalls
- Forgetting to pad binary before grouping for hex.
- Mixing up digit weights (rightmost is 2^0, 16^0, etc.).
- Case sensitivity in hex parsing (a-f vs A-F).`,
    quizIds: ['cs102-quiz-1'],
    exerciseIds: ['cs102-ex-1', 'cs102-t1-ex02', 'cs102-t1-ex03', 'cs102-t1-ex04', 'cs102-t1-ex05', 'cs102-t1-ex06', 'cs102-t1-ex07', 'cs102-t1-ex08', 'cs102-t1-ex09', 'cs102-t1-ex10', 'cs102-t1-drill-1', 'cs102-t1-drill-2']
  },
  {
    id: 'cs102-2',
    title: 'Binary Arithmetic',
    content: String.raw`## Core Ideas
- Binary addition mirrors decimal, but carries on 2 instead of 10.
- Two's complement encodes negatives so addition hardware also does subtraction.
- Overflow happens when the representable range is exceeded (sign flips unexpectedly).

## Two's Complement Refresher
1. Ones complement: flip all bits.
2. Add 1 to get two's complement.
Example (8-bit): 0000 0101 (+5) → flip → 1111 1010 → +1 → 1111 1011 (-5).

## Overflow Rules (Signed)
- Adding two positives yields negative → overflow.
- Adding two negatives yields positive → overflow.
- Mixed-sign addition cannot overflow.

## Worked Example: 0111 1111 + 0000 0001
- Unsigned: 127 + 1 = 128 (fits unsigned 8-bit).
- Signed: +127 + +1 = -128 (overflow, sign flipped).

## Beyond Addition
- **Subtraction:** A - B = A + (two's complement of B).
- **Multiplication (shift-and-add):** For each 1 bit in multiplier, add a shifted multiplicand.
- **Division (shift-subtract):** Align divisor, subtract when possible, shift remainder.

## Pitfalls
- Dropping leading zeros and losing width context (sign bit meaning changes).
- Misinterpreting the same bits as signed vs unsigned values.`,
    quizIds: ['cs102-quiz-2'],
    exerciseIds: ['cs102-ex-2', 'cs102-t2-ex02', 'cs102-t2-ex03', 'cs102-t2-ex04', 'cs102-t2-ex05', 'cs102-t2-ex06', 'cs102-t2-ex07', 'cs102-t2-ex08', 'cs102-t2-ex09', 'cs102-t2-ex10', 'cs102-t2-drill-1', 'cs102-t2-drill-2']
  },
  {
    id: 'cs102-3',
    title: 'Data Representation',
    content: String.raw`## Integers
- **Unsigned n-bit:** 0 to 2^n - 1.
- **Signed (two's complement):** -2^(n-1) to 2^(n-1) - 1.
- Width matters: the same bits mean different numbers if you change n.

## Floating Point (IEEE 754)
- **Single (32-bit):** 1 sign, 8 exponent, 23 fraction bits.
- **Double (64-bit):** 1 sign, 11 exponent, 52 fraction bits.
- Value = (-1)^sign × 1.fraction × 2^(exponent-bias).
- Special cases: zeros, subnormals, ±∞, NaN.
- Precision is finite: 0.1 cannot be represented exactly in binary.

## Characters and Text
- **ASCII:** 7-bit (128 chars), extended 8-bit variants differ.
- **UTF-8:** Variable length, backwards compatible with ASCII, can encode all Unicode.
- **Code point vs encoding:** U+1F600 (😀) encoded in UTF-8 as F0 9F 98 80.

## Endianness
- Little endian: least significant byte first (x86).
- Big endian: most significant byte first (network byte order).
- Matters when reading/writing binary formats or doing pointer casts.

## Pitfalls
- Misreading raw bytes without knowing encoding.
- Assuming floats are exact for decimals.
- Forgetting sign-extension vs zero-extension when widening values.`,
    quizIds: ['cs102-quiz-3'],
    exerciseIds: ['cs102-ex-3', 'cs102-t3-ex02', 'cs102-t3-ex03', 'cs102-t3-ex04', 'cs102-t3-ex05', 'cs102-t3-ex06', 'cs102-t3-ex07', 'cs102-t3-ex08', 'cs102-t3-ex09', 'cs102-t3-ex10', 'cs102-t3-drill-1', 'cs102-t3-drill-2']
  },
  {
    id: 'cs102-4',
    title: 'Boolean Algebra and Logic Gates',
    content: String.raw`## Boolean Building Blocks
- **Primitives:** AND, OR, NOT.
- **Derived:** NAND, NOR, XOR, XNOR. NAND/NOR are functionally complete (can build any gate).
- **Truth Tables:** Enumerate all input combos to verify behavior.

## Key Laws (Simplification Toolkit)
- Identity/Null: p ∧ 1 = p, p ∨ 0 = p.
- Domination: p ∧ 0 = 0, p ∨ 1 = 1.
- Idempotent: p ∧ p = p, p ∨ p = p.
- Complement: p ∧ ¬p = 0, p ∨ ¬p = 1.
- De Morgan: ¬(p ∧ q) = ¬p ∨ ¬q; ¬(p ∨ q) = ¬p ∧ ¬q.
- Distributive: p ∧ (q ∨ r) = (p ∧ q) ∨ (p ∧ r).

## From Algebra to Gates
- Expressions map directly to gate networks.
- XOR handy for parity and adders; NAND common in hardware due to transistor efficiency.
- Simplification reduces gate count → lower cost, faster circuits.

## Example Simplification
Expression: ¬(A ∧ B) ∨ (A ∧ B)
- By complement law: 1. Output is always true (a tautology).

## Common Pitfalls
- Mixing up XOR (different) with OR (at least one).
- Forgetting that NAND/NOR invert outputs.
- Not normalizing expression width before wiring to gates.`,
    quizIds: ['cs102-quiz-4'],
    exerciseIds: ['cs102-ex-4', 'cs102-t4-ex02', 'cs102-t4-ex03', 'cs102-t4-ex04', 'cs102-t4-ex05', 'cs102-t4-ex06', 'cs102-t4-ex07', 'cs102-t4-ex08', 'cs102-t4-ex09', 'cs102-t4-ex10', 'cs102-t4-ex11', 'cs102-t4-drill-1', 'cs102-t4-drill-2']
  },
  {
    id: 'cs102-5',
    title: 'Basic Computer Architecture',
    content: String.raw`## Big Picture
- **Von Neumann model:** Single memory for code/data, CPU, I/O, interconnected by buses.
- **CPU pieces:** ALU (compute), Control Unit (orchestration), Registers (fast scratchpad), PC (program counter).

## Fetch-Decode-Execute
1. Fetch instruction at PC from memory into instruction register.
2. Decode opcode/operands (control signals set).
3. Execute: ALU ops, memory load/store, branch to new PC if needed.
4. Repeat.

## Memory Hierarchy
- Registers (1 cycle) → L1/L2/L3 cache → Main memory → SSD/HDD.
- Locality of reference (temporal/spatial) makes caches effective.
- Performance depends on cache hits/misses; alignment and access patterns matter.

## Instruction Formats
- Typical fields: opcode, destination register, source registers/immediates, addressing mode.
- RISC vs CISC: fixed-size simple ops vs variable-length complex ops.

## Input/Output
- Memory-mapped I/O: devices appear as addresses.
- Interrupts allow devices to signal the CPU asynchronously.

## Pitfalls
- Assuming memory access cost is uniform.
- Forgetting endianness when reading raw memory.
- Off-by-one in program counter changes during branching.`,
    quizIds: ['cs102-quiz-5'],
    exerciseIds: ['cs102-ex-5', 'cs102-t5-ex02', 'cs102-t5-ex03', 'cs102-t5-ex04', 'cs102-t5-ex05', 'cs102-t5-ex06', 'cs102-t5-ex07', 'cs102-t5-ex08', 'cs102-t5-ex09', 'cs102-t5-ex10', 'cs102-t5-drill-1', 'cs102-t5-drill-2']
  }
];
