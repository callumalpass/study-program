# Registers, the ALU, and Buses

To execute instructions efficiently, the CPU keeps frequently used values close at hand in **registers**, performs computations in the **ALU**, and moves data over **buses**.

## Registers

Registers are small, fast storage locations inside the CPU. They store:
- temporary values
- addresses
- intermediate computation results

Common conceptual register roles:
- general-purpose registers (R0, R1, …)
- special-purpose registers (PC, SP, flags)

## The ALU (Arithmetic Logic Unit)

The ALU performs operations like:
- addition/subtraction
- bitwise AND/OR/XOR/NOT
- shifts
- comparisons (often by subtracting and setting flags)

Many architectures use **status flags** set by ALU operations, e.g.:
- ZF (zero): result is 0
- SF (sign): result is negative (in signed interpretation)
- CF (carry): unsigned carry out
- OF (overflow): signed overflow

## Buses

A bus is a set of wires used to carry:
- **data** (values)
- **addresses** (where to read/write)
- **control signals** (read/write, clock, enable signals)

Even if you don’t design hardware, the bus idea helps you understand why moving data between memory and CPU is slower than operating on registers.

## Key takeaways

- Registers are fast, scarce storage; memory is larger but slower.
- The ALU handles arithmetic and bitwise logic, often producing flags.
- Buses and control signals coordinate movement and operations across the CPU.

