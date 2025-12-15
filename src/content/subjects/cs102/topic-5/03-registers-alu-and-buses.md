# Registers, the ALU, and Buses

The CPU's datapath consists of components that store, move, and transform data. **Registers** provide fast, temporary storage inside the CPU. The **ALU** performs arithmetic and logic operations. **Buses** carry data between components. Understanding these building blocks reveals how the CPU actually executes instructions.

## Registers: Fast Storage Inside the CPU

Registers are small storage locations built directly into the processor. They're the fastest memory in the system—accessing a register takes just one clock cycle, compared to potentially hundreds of cycles for main memory.

### Why Registers?

Memory access is slow. Even with caches, accessing RAM takes many cycles. By keeping frequently-used values in registers, the CPU can operate much faster. The instruction set architecture defines which registers exist and how they're used.

### Register Properties

- **Small capacity**: Typically 16-64 registers, each holding one word (32 or 64 bits)
- **Very fast**: Access time measured in fractions of a nanosecond
- **Limited**: Instructions must explicitly manage what's in registers
- **Named**: Registers have names like R0, R1, RAX, SP, etc.

### Types of Registers

#### General-Purpose Registers (GPRs)

Most registers are general-purpose—they can hold any data or address. Programs use them for:
- Local variables
- Function arguments
- Intermediate calculation results
- Pointers and addresses

Typical RISC architectures have 32 general-purpose registers (R0-R31). x86-64 has 16 (RAX, RBX, RCX, RDX, RSI, RDI, RBP, RSP, R8-R15).

#### Special-Purpose Registers

Some registers have dedicated functions:

**Program Counter (PC)**: Address of the next instruction. Updated after each fetch or by branches.

**Stack Pointer (SP)**: Address of the top of the stack. Used by push, pop, call, and return instructions.

**Frame/Base Pointer (FP/BP)**: Points to the current stack frame. Helps access local variables and parameters.

**Link Register (LR)**: On some architectures, stores the return address for function calls.

**Status/Flags Register**: Contains condition codes set by arithmetic operations (zero, negative, carry, overflow).

### The Register File

Internally, registers are organized in a **register file**—a small, multi-ported memory array. Key features:

- **Multiple read ports**: Allows reading two (or more) registers simultaneously
- **Write port**: Allows writing one result per cycle
- **Fast access**: Highly optimized for speed

For an instruction like `ADD R3, R1, R2`:
1. R1 and R2 are read simultaneously from the register file
2. The ALU computes R1 + R2
3. The result is written to R3 through the write port

### Register Naming Conventions

Different architectures use different conventions:

**MIPS**: $0-$31, with conventions like $sp (stack pointer), $ra (return address)

**x86-64**: Historical names (RAX, RBX) plus newer numbered registers (R8-R15)

**ARM**: R0-R15 with R13=SP, R14=LR, R15=PC

Understanding your architecture's register conventions is essential for reading assembly.

## The ALU: Computation Engine

The **Arithmetic Logic Unit** performs all the mathematical and logical operations in the CPU. Every ADD, SUB, AND, OR, shift, and comparison goes through the ALU.

### ALU Inputs and Outputs

The ALU has:
- **Two data inputs** (operands A and B)
- **Operation select** (control signals specifying which operation)
- **Data output** (the result)
- **Status flags output** (condition codes)

### Arithmetic Operations

The ALU performs integer arithmetic:
- **Addition**: A + B
- **Subtraction**: A - B (implemented as A + (-B) using two's complement)
- **Increment/Decrement**: A + 1, A - 1
- **Comparison**: Subtract without storing result, just set flags

Some ALUs also support:
- **Multiplication**: Often separate hardware due to complexity
- **Division**: Usually separate or microcoded

### Logic Operations

Bitwise operations on each bit position:
- **AND**: A & B (both bits must be 1)
- **OR**: A | B (either bit can be 1)
- **XOR**: A ^ B (bits must differ)
- **NOT**: ~A (flip all bits)
- **NAND, NOR**: Combined operations

### Shift Operations

Moving bits left or right:
- **Logical shift left (LSL)**: Shift bits left, fill with 0s
- **Logical shift right (LSR)**: Shift bits right, fill with 0s
- **Arithmetic shift right (ASR)**: Shift right, preserve sign bit
- **Rotate**: Bits that fall off one end come back on the other

### Status Flags

After most ALU operations, flags are updated:

**Zero Flag (ZF)**: Set if result equals zero. Used for equality comparisons.

**Sign/Negative Flag (SF/NF)**: Set if result is negative (MSB = 1 in two's complement).

**Carry Flag (CF)**: Set if unsigned operation overflowed. For addition, indicates carry out of MSB. For subtraction, indicates borrow.

**Overflow Flag (OF/V)**: Set if signed operation overflowed. Occurs when the result doesn't fit in the signed range.

### How Operations Become Flags

**Example**: Comparing A and B

The CPU subtracts B from A (computing A - B) but discards the result. Only the flags matter:
- If A == B: Result is 0, ZF set
- If A < B (signed): Result is negative, SF set (or OF different from SF)
- If A < B (unsigned): Borrow occurred, CF set
- If A > B: None of the above

Branch instructions then test these flags:
- BEQ (branch if equal): Jump if ZF set
- BLT (branch if less than): Jump if SF ≠ OF
- BGT (branch if greater than): Jump if ZF clear AND SF == OF

### ALU Implementation

Internally, the ALU uses:
- **Adder circuits**: Ripple-carry or carry-lookahead adders
- **Logic gates**: AND, OR, XOR for bitwise operations
- **Multiplexers**: Select which operation's result to output
- **Shifters**: Barrel shifters for variable-length shifts

A simple ALU might have:
1. Adder for arithmetic
2. AND/OR/XOR gates for logic
3. Shifter for shifts
4. MUX to select final output based on operation code

## Buses: Data Highways

A **bus** is a set of parallel wires that carry data between CPU components. Buses allow different parts of the system to communicate without direct point-to-point connections between every pair.

### Types of Bus Signals

#### Data Bus

Carries actual data values—register contents, memory data, ALU results. Width matches the architecture's word size (32 or 64 bits typically).

#### Address Bus

Carries memory addresses. Width determines addressable memory:
- 32-bit address bus: 4 GB addressable
- 64-bit address bus: Theoretically 16 exabytes

#### Control Bus

Carries signals that coordinate operations:
- Read/write signals
- Clock signals
- Interrupt lines
- Bus request/grant signals

### Internal vs. External Buses

**Internal buses** connect components within the CPU:
- Register file to ALU
- ALU output to registers
- PC to instruction fetch logic

**External buses** connect CPU to memory and I/O:
- System bus (CPU to memory controller)
- Memory bus (controller to RAM)
- I/O bus (CPU to peripherals)

### Bus Arbitration

Only one device can drive a bus at a time. **Bus arbitration** determines who gets access:
- **Master**: Device currently controlling the bus (usually CPU)
- **Arbitration**: Protocol for resolving conflicts when multiple devices need the bus

### Bus Timing

Buses operate synchronously (with a clock) or asynchronously:

**Synchronous bus**: All transfers aligned to clock edges. Simpler but speed limited by slowest device.

**Asynchronous bus**: Handshaking protocols (request/acknowledge) coordinate transfers. More complex but can accommodate different speeds.

### The Bus Bottleneck

Buses are shared resources—only one transfer happens at a time. This creates the **Von Neumann bottleneck**: data and instructions compete for the same bus to memory.

Modern systems mitigate this with:
- **Caches**: Reduce bus traffic by keeping data close to CPU
- **Multiple buses**: Separate paths for different purposes
- **Point-to-point links**: Replace shared buses with dedicated connections

## Putting It Together: Datapath Operation

Here's how these components work together for `ADD R3, R1, R2`:

1. **Register File Read**: R1 and R2 values placed on internal buses to ALU inputs
2. **ALU Operation**: Control signals select ADD; ALU computes sum
3. **Flag Update**: Zero, sign, carry, overflow flags updated
4. **Result Bus**: ALU output travels on bus to register file
5. **Register Write**: Result stored in R3

For a load instruction like `LOAD R1, [R2 + 100]`:

1. **Address Calculation**: R2 read from register file, sent to ALU with immediate 100; ALU adds
2. **Address Bus**: Sum placed on address bus to memory
3. **Memory Read**: Memory returns data on data bus
4. **Register Write**: Data from bus stored in R1

## Key Takeaways

- **Registers** are fast, limited storage inside the CPU; much faster than memory.
- **General-purpose registers** hold data and addresses; **special-purpose registers** (PC, SP, flags) have dedicated functions.
- The **register file** is a multi-ported array enabling simultaneous reads and writes.
- The **ALU** performs arithmetic (add, subtract) and logic (AND, OR, XOR, shift) operations.
- **Flags** (zero, sign, carry, overflow) record operation results; branches test them.
- **Buses** carry data (data bus), addresses (address bus), and control signals (control bus) between components.
- Only one device can drive a bus at a time—this creates potential bottlenecks.
- Understanding the datapath explains how instructions actually execute in hardware.

