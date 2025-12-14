import { Topic } from '../../../core/types';

export const cs102Topics: Topic[] = [
  {
    id: 'cs102-1',
    title: 'Number Systems and Conversion',
    content: `## Introduction

At their core, computers are just vast collections of switches that can be either on or off. To communicate with these machines, we need a way to translate our human world of decimal numbers and text into the binary world of 1s and 0s. This topic explores the fundamental language of computers: number systems.

**Learning Objectives:**
- Understand why computers use binary instead of decimal
- Convert numbers between Binary (base 2), Decimal (base 10), and Hexadecimal (base 16)
- Perform calculations using positional notation
- Memorize the first 16 binary/hex values
- Understand the relationship between hex digits and 4-bit nibbles

---

## Core Concepts

### Why Binary?

Computers use binary because it is reliable and easy to implement in hardware. A transistor is either conducting current (1) or not (0). It's much harder to build a circuit that reliably distinguishes between 10 different voltage levels (decimal) than just two.

### Positional Notation

In any number system, the position of a digit determines its value.
- **Decimal (Base 10):** digits 0-9, powers of 10.
  $357 = 3 \times 10^2 + 5 \times 10^1 + 7 \times 10^0$
- **Binary (Base 2):** digits 0-1, powers of 2.
  $1011_2 = 1 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 1 \times 2^0 = 8 + 0 + 2 + 1 = 11_{10}$

### Hexadecimal (Base 16)

Binary gets long and hard to read ($11111111_2$ is 255). Hexadecimal is a shorthand for binary.
- Digits: 0-9 and A-F (where A=10, B=11... F=15).
- One hex digit represents exactly 4 bits (a "nibble").

**The Magic Map:**
- 0000 = 0
- 0101 = 5
- 1010 = A (10)
- 1111 = F (15)

### Converting Between Bases

**Binary → Decimal:**
Sum the powers of 2 where the bit is 1.
$10010_2 = 16 + 2 = 18$

**Decimal → Binary:**
Repeatedly divide by 2 and record the remainders. Read remainders from bottom (last) to top (first).
$13 / 2 = 6$ rem 1
$6 / 2 = 3$ rem 0
$3 / 2 = 1$ rem 1
$1 / 2 = 0$ rem 1
Result: $1101_2$

**Binary ↔ Hex:**
Group bits by 4, starting from the right.
$1101011_2$ → $0110 \ 1011$ → $6 \ B$ → $6B_{16}$

---

## Common Patterns and Idioms

### The "0x" Prefix
Programmers use prefixes to tell bases apart:
- `0b` for binary (e.g., `0b1010`)
- `0x` for hex (e.g., `0xFF`)
- `0` or `0o` for octal (less common now)

### Powers of 2 Shortcuts
Memorizing these speeds up your work significantly:
- $2^0 = 1$
- $2^1 = 2$
- $2^2 = 4$
- $2^3 = 8$
- $2^4 = 16$
- $2^5 = 32$
- $2^6 = 64$
- $2^7 = 128$
- $2^8 = 256$ (one byte max value + 1)
- $2^{10} = 1024$ (approx 1000, "1K")

---

## Common Mistakes and Pitfalls

### Mistake 1: Confusing Values with Representations
Remember that "11" means eleven in decimal, three in binary, and seventeen in hex. The *value* is the abstract quantity; the *representation* depends on the base.

### Mistake 2: Off-by-One in Ranges
An n-bit number can represent $2^n$ distinct values, ranging from $0$ to $2^n - 1$.
- 8 bits: 0 to 255 (not 256!)

### Mistake 3: Grouping Direction
When converting binary to hex, always group by 4 starting from the **right** (least significant bit).
Right: $110101 \to 0011 \ 0101 \to 35_{16}$
Wrong: $110101 \to 1101 \ 0100 \to D4_{16}$

---

## Best Practices

1. **Pad with zeros:** When writing binary, pad to 4 or 8 bits (e.g., write `0101` instead of `101`) to make hex conversion easier.
2. **Use the 8-4-2-1 rule:** For 4-bit binary, just sum the weights 8, 4, 2, 1. (e.g., 1011 = 8 + 2 + 1 = 11 = B).
3. **Practice mental math:** Try to recognize common patterns like `1111` (F), `1010` (A), `1000` (8).

---

## Further Exploration

- **Octal (Base 8):** Used in Unix file permissions (e.g., `chmod 755`). Why is it useful? (Hint: 3 bits).
- **Base64:** How we send binary data (images, files) over text-only protocols like email.
- **Finger Binary:** Learn to count to 31 on one hand and 1023 on two hands!`,
    quizIds: ['cs102-quiz-1'],
    exerciseIds: ['cs102-ex-1', 'cs102-t1-ex02', 'cs102-t1-ex03', 'cs102-t1-ex04', 'cs102-t1-ex05', 'cs102-t1-ex06', 'cs102-t1-ex07', 'cs102-t1-ex08', 'cs102-t1-ex09', 'cs102-t1-ex10', 'cs102-t1-drill-1', 'cs102-t1-drill-2']
  },
  {
    id: 'cs102-2',
    title: 'Binary Arithmetic',
    content: `## Introduction

Just like we learn to add and subtract in decimal in elementary school, computers need to perform arithmetic in binary. This topic covers the mechanics of binary addition, how computers handle negative numbers (it's clever!), and the dreaded concept of overflow.

**Learning Objectives:**
- Perform binary addition and subtraction
- Understand the limitations of fixed-width arithmetic (Overflow)
- Represent negative numbers using Sign-Magnitude and Two's Complement
- Convert between decimal and Two's Complement values
- Perform arithmetic with signed numbers

---

## Core Concepts

### Binary Addition

It works exactly like decimal addition, but you carry when you reach 2, not 10.
Rules:
- 0 + 0 = 0
- 0 + 1 = 1
- 1 + 1 = 0 (carry 1)
- 1 + 1 + 1 = 1 (carry 1)

Example ($5 + 6$):
\
  0101 (5)
+ 0110 (6)
------
  1011 (11)
\

### Representing Negative Numbers

How do we store "-5" bits?

1.  **Sign-Magnitude (Naive):** Use the first bit as a sign (0=+, 1=-).
    - $00000101 = +5$
    - $10000101 = -5$
    - *Problem:* Two zeros (+0 and -0) and hard to build adder circuits.

2.  **Two's Complement (Standard):** This is what modern computers use.
    - To make a number negative: **Invert all bits and add 1.**
    - Example: +5 is 
0000 0101
    - Invert: 
1111 1010
    - Add 1: 
1111 1011
 (-5 in Two's Complement)

**Why Two's Complement?**
It allows the CPU to use the *same* circuit for addition and subtraction.
$5 + (-5) = 0$
\
  0000 0101 (+5)
+ 1111 1011 (-5)
-----------
1 0000 0000 (0, ignoring the carry out of the 8th bit)
\

### Overflow

In the physical world, numbers go on forever. In computers, we have a fixed number of bits (e.g., 8, 16, 32, 64). If a calculation result is too big to fit, it "wraps around" – this is **overflow**.

- **Unsigned Overflow:** $255 + 1 \to 0$ (Carry flag set)
- **Signed Overflow:** Adding two positive numbers yields a negative result (or vice versa). $127 + 1 \to -128$.

---

## Common Patterns and Idioms

### Sign Extension
When moving a number from a smaller container to a larger one (e.g., 8-bit to 16-bit):
- **Unsigned:** Pad with zeros.
- **Signed:** Pad with the *sign bit* (copy the MSB).
  - 8-bit -5: 
1111 1011
  - 16-bit -5: 
1111 1111 1111 1011

### Subtraction is Addition
Computers rarely have a "subtract" circuit. Instead, $A - B$ is calculated as $A + (-B)$.

---

## Common Mistakes and Pitfalls

### Mistake 1: Ignoring Width
Two's complement only makes sense if you know the number of bits.
`111` is 7 if unsigned, but -1 if it's a signed 3-bit number.

### Mistake 2: The Weird Number
In Two's Complement, the range is asymmetrical.
8-bit range: -128 to +127.
There is no positive 128! Trying to negate -128 results in -128 (overflow).

---

## Best Practices

1. **Always specify bit width:** When doing binary math on paper, draw a box or write "8-bit" to remind yourself of the limits.
2. **Check for overflow:** If adding two positives gives a negative, or two negatives gives a positive, you have overflowed.
3. **Use hex for checking:** Converting to hex often makes it easier to spot patterns than reading long strings of 1s and 0s.

---

## Further Exploration

- **Floating Point Math:** How do we add 1.5 + 2.75? (Hint: It involves aligning decimal points).
- **Saturation Arithmetic:** Used in graphics. If $200 + 100 > 255$, the result stays at 255 (white) instead of wrapping to 44 (dark).`,
    quizIds: ['cs102-quiz-2'],
    exerciseIds: ['cs102-ex-2', 'cs102-t2-ex02', 'cs102-t2-ex03', 'cs102-t2-ex04', 'cs102-t2-ex05', 'cs102-t2-ex06', 'cs102-t2-ex07', 'cs102-t2-ex08', 'cs102-t2-ex09', 'cs102-t2-ex10', 'cs102-t2-drill-1', 'cs102-t2-drill-2']
  },
  {
    id: 'cs102-3',
    title: 'Data Representation',
    content: `## Introduction

We can store integers, but what about the rest of the world? Real-world software deals with text, decimals, images, and sound. This topic explains how we encode these complex types of data into the universal language of bits.

**Learning Objectives:**
- Explain how non-integer data is stored in binary
- Understand the IEEE-754 standard for floating-point numbers
- Differentiate between ASCII and Unicode/UTF-8
- Understand Big-Endian vs Little-Endian byte ordering
- Recognize the limits of precision in floating-point math

---

## Core Concepts

### Floating Point (IEEE 754)

Storing decimals (like 3.14) is tricky. We use "scientific notation for binary."
Value = $(-1)^S \times 1.F \times 2^{E-B}$

**32-bit Float Structure:**
- **Sign (1 bit):** 0 for +, 1 for -.
- **Exponent (8 bits):** The scale factor (biased).
- **Mantissa/Fraction (23 bits):** The precision.

**Key Insight:** Floats are not exact. They are approximations.
`0.1 + 0.2 == 0.3` is usually **False** in computers!

### Text Encoding

**ASCII (The Old Standard):**
- 7 bits per character.
- Covers English letters, numbers, and basic symbols.
- A = 65, a = 97, 0 = 48.

**Unicode & UTF-8 (The Modern Standard):**
- **Unicode:** A giant list of every character in human languages (each has a "Code Point" like U+1F600).
- **UTF-8:** A clever way to store those code points.
  - Common English chars use 1 byte (same as ASCII).
  - Other chars use 2, 3, or 4 bytes.
  - Backward compatible with ASCII!

### Endianness

When storing a multi-byte number (like a 32-bit integer) in memory, which byte comes first?
- **Big Endian:** Most significant byte at lowest address (like writing left-to-right).
- **Little Endian:** Least significant byte at lowest address (standard for x86/Intel CPUs).

Example: The number `0x12345678`
- Big Endian memory: `12 34 56 78`
- Little Endian memory: `78 56 34 12`

---

## Common Patterns and Idioms

### The "Null Terminator"
In C and many low-level formats, strings end with a byte of value 0 (`\0`). This marks the end of the text.

### Magic Numbers
File formats often start with specific bytes to identify them.
- JPEG starts with `FF D8`
- PNG starts with `89 50 4E 47` (.PNG)

---

## Common Mistakes and Pitfalls

### Mistake 1: Using Floats for Money
Never use floats for currency! The tiny precision errors add up. Use integers (count in cents) or distinct Decimal types.

### Mistake 2: Confusing Encoding with Font
UTF-8 stores the *character* (the abstract letter). A font determines how it *looks*. If you see "" or empty boxes, your data might be correct, but your font is missing the glyph.

### Mistake 3: Byte Order Confusion
Reading binary data from a file or network? Check the endianness. Network traffic is usually Big Endian; your PC is likely Little Endian.

---

## Best Practices

1. **Always use UTF-8:** Unless you have a specific reason not to, default to UTF-8 for text.
2. **Comparison Epsilon:** When comparing floats, check if they are "close enough," not equal.
   `abs(a - b) < 0.00001`
3. **Know your limits:** A 32-bit integer maxes out at ~2 billion. For global population counts or simplified timestamps, you need 64 bits.

---

## Further Exploration

- **Color:** How computers store color (RGB, Hex codes).
- **Audio:** Sampling rates and bit depth.
- **Compression:** How do we make files smaller? (Lossless vs Lossy).`,
    quizIds: ['cs102-quiz-3'],
    exerciseIds: ['cs102-ex-3', 'cs102-t3-ex02', 'cs102-t3-ex03', 'cs102-t3-ex04', 'cs102-t3-ex05', 'cs102-t3-ex06', 'cs102-t3-ex07', 'cs102-t3-ex08', 'cs102-t3-ex09', 'cs102-t3-ex10', 'cs102-t3-drill-1', 'cs102-t3-drill-2']
  },
  {
    id: 'cs102-4',
    title: 'Boolean Algebra and Logic Gates',
    content: `## Introduction

Before software, there is hardware. Hardware is built from logic gates, which are physical implementations of Boolean Algebra. This topic bridges the gap between math and circuitry, showing you how computers "think" using simple logic rules.

**Learning Objectives:**
- Understand the behavior of basic logic gates: AND, OR, NOT, NAND, NOR, XOR
- Construct Truth Tables to analyze circuit behavior
- Simplify Boolean expressions using algebraic laws (De Morgan's, Distributive, etc.)
- Understand why NAND/NOR are "universal gates"
- Design simple circuits like Adders and Multiplexers

---

## Core Concepts

### The Basic Gates

| Gate | Symbol | Logic | Description |
|------|--------|-------|-------------|
| **NOT** | Triangle w/ circle | $\neg A$ | Inverter. 0 becomes 1, 1 becomes 0. |
| **AND** | D-shape | $A \cdot B$ | True only if ALL inputs are True. |
| **OR** | Curved D-shape | $A + B$ | True if AT LEAST ONE input is True. |
| **XOR** | OR w/ double line | $A \oplus B$ | True if inputs are DIFFERENT. |

### Universal Gates (NAND / NOR)
You can build *any* other gate using only NAND gates (or only NOR gates). This is important because NAND gates are often cheaper and faster to manufacture in silicon.

### Boolean Algebra Laws
Just like regular algebra has rules ($x(y+z) = xy + xz$), Boolean algebra has rules to simplify circuits:

1.  **Identity:** $A \cdot 1 = A$
2.  **Null:** $A \cdot 0 = 0$
3.  **Idempotent:** $A \cdot A = A$ (Doing it twice changes nothing)
4.  **Inverse:** $A \cdot \neg A = 0$ (Can't be True and False at same time)
5.  **De Morgan's Laws:**
    - $\neg(A \cdot B) = \neg A + \neg B$ (Break the line, change the sign)
    - $\neg(A + B) = \neg A \cdot \neg B$

### Combinational Logic
These are circuits where the output depends *only* on the current inputs. (e.g., an Adder).
**Example: Half Adder** (Adds two bits)
- Sum = $A \oplus B$
- Carry = $A \cdot B$

---

## Common Patterns and Idioms

### "Don't Care" Conditions
Sometimes, for certain input combinations, we don't care what the output is (maybe those inputs are impossible). We mark these as 'X' in truth tables, allowing for more simplification.

### Multiplexer (Mux)
The "Traffic Cop" of circuits. It selects one of several inputs to forward to the output, based on a "select" signal. It's the hardware equivalent of an `if/else` statement or an array lookup.

---

## Common Mistakes and Pitfalls

### Mistake 1: XOR vs OR
In English, "or" is ambiguous ("Coffee or Tea?" usually means XOR). In logic:
- OR: One or the other, or *both*.
- XOR: One or the other, but *not both*.

### Mistake 2: Bubble Blindness
The little circle (bubble) at the output of a gate means NOT.
- AND with a bubble = NAND.
- Input with a bubble = Input is inverted before entering the gate.

---

## Best Practices

1. **Draw it out:** Never try to solve complex logic in your head. Draw the circuit or write the equation.
2. **Use Truth Tables:** When in doubt, list every possible input combination (00, 01, 10, 11...) and calculate the output row by row. It's the ultimate proof.
3. **Simplify first:** Before building a circuit, simplify the equation. It saves transistors (money/power).

---

## Further Exploration

- **Karnaugh Maps (K-Maps):** A graphical method for simplifying boolean algebra without doing the math.
- **Sequential Logic:** Circuits with memory (Flip-Flops). Output depends on inputs AND past history.
- **FPGA:** Field Programmable Gate Arrays – chips where you can "code" the connections between gates!`,
    quizIds: ['cs102-quiz-4'],
    exerciseIds: ['cs102-ex-4', 'cs102-t4-ex02', 'cs102-t4-ex03', 'cs102-t4-ex04', 'cs102-t4-ex05', 'cs102-t4-ex06', 'cs102-t4-ex07', 'cs102-t4-ex08', 'cs102-t4-ex09', 'cs102-t4-ex10', 'cs102-t4-ex11', 'cs102-t4-drill-1', 'cs102-t4-drill-2']
  },
  {
    id: 'cs102-5',
    title: 'Basic Computer Architecture',
    content: `## Introduction

Now that we have logic gates, how do we build a computer? This topic introduces the Von Neumann architecture, the standard design for almost all modern computers. We'll look at the "Brain" (CPU), the "Short-term Memory" (RAM), and how they talk to each other.

**Learning Objectives:**
- Describe the Von Neumann architecture components (ALU, Control Unit, Memory, I/O)
- Explain the Fetch-Decode-Execute cycle
- Differentiate between Register, Cache, Main Memory, and Disk
- Understand the role of the Program Counter (PC)
- Distinguish between RISC and CISC design philosophies

---

## Core Concepts

### The Von Neumann Model
Proposed by John von Neumann in 1945, this design has:
1.  **Memory:** Stores both data AND program instructions.
2.  **Processing Unit:** Contains the ALU (Math) and Registers (Fast storage).
3.  **Control Unit:** Directs the flow of data.
4.  **Input/Output:** Mechanisms to talk to the world.

### The Heartbeat: Fetch-Decode-Execute
The CPU runs a never-ending loop:
1.  **Fetch:** Get the next instruction from memory address stored in the Program Counter (PC).
2.  **Decode:** Figure out what the instruction means (e.g., "Add Register A to Register B").
3.  **Execute:** Do the operation (Use ALU, read/write memory).
4.  **Repeat:** Increment PC and go back to step 1.

### Memory Hierarchy
We want memory to be fast (expensive) and huge (cheap). We can't have both, so we layer them:
1.  **Registers:** Inside CPU. Instant access. Tiny capacity (Bytes).
2.  **Cache (L1/L2/L3):** On CPU die. Very fast. Small capacity (MB).
3.  **RAM (Main Memory):** Separate chip. Fast. Medium capacity (GB).
4.  **Disk (SSD/HDD):** Persistent. Slow. Huge capacity (TB).

### The Bus
The "highway" that connects everything.
- **Data Bus:** Carries the actual information.
- **Address Bus:** Specifies *where* in memory data is coming from or going to.
- **Control Bus:** Signals read/write, interrupts, etc.

---

## Common Patterns and Idioms

### The "Bottleneck"
The Von Neumann Bottleneck is the speed limit caused by the separation of CPU and Memory. The CPU can process faster than Memory can deliver data. Caches exist primarily to hide this latency.

### Polling vs Interrupts
- **Polling:** CPU keeps asking device "Are you ready? Are you ready?" (Wastes CPU time).
- **Interrupts:** CPU works on other things. Device pokes the CPU ("Interrupt") when ready. (Efficient).

---

## Common Mistakes and Pitfalls

### Mistake 1: Gigabyte vs Gibibyte
- GB (Gigabyte) = $10^9$ bytes (Storage manufacturers use this).
- GiB (Gibibyte) = $2^{30}$ bytes (Operating systems use this).
This is why your 500GB drive shows up as ~465GB in Windows.

### Mistake 2: Clock Speed Myth
A 4GHz CPU is not necessarily twice as fast as a 2GHz CPU. Architecture (how much work gets done *per tick*) matters just as much.

---

## Best Practices

1. **Locality of Reference:** Code runs faster if it accesses data that is close together in memory (Spatial Locality) or accesses the same data repeatedly (Temporal Locality), because this exploits the Cache.
2. **Understand the abstraction:** High-level code (Python) is translated to Assembly, which is translated to Machine Code (Binary), which controls Transistors. Knowing this helps you debug weird performance issues.

---

## Further Exploration

- **Pipelining:** Doing Fetch-Decode-Execute for different instructions simultaneously (like an assembly line).
- **Multicore:** Putting multiple CPUs on one chip.
- **GPU:** A different architecture designed for doing massive parallel math (graphics, AI).`,
    quizIds: ['cs102-quiz-5'],
    exerciseIds: ['cs102-ex-5', 'cs102-t5-ex02', 'cs102-t5-ex03', 'cs102-t5-ex04', 'cs102-t5-ex05', 'cs102-t5-ex06', 'cs102-t5-ex07', 'cs102-t5-ex08', 'cs102-t5-ex09', 'cs102-t5-ex10', 'cs102-t5-drill-1', 'cs102-t5-drill-2']
  }
];