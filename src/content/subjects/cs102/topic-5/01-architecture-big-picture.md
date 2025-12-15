# Computer Architecture: The Big Picture

Computer architecture describes how a computer is organized and how it executes programs. It's the layer that connects the software you write to the physical hardware that runs it. Understanding architecture explains why programs behave the way they do—why some operations are fast and others slow, why certain bugs are possible, and how the CPU actually carries out your instructions.

## What Is Computer Architecture?

Architecture sits between two worlds:
- **Above**: Software, programming languages, operating systems
- **Below**: Digital circuits, transistors, physics

At the architecture level, we think about:
- How instructions are represented and executed
- How data moves between components
- How memory is organized and accessed
- How the CPU coordinates everything

This abstraction allows programmers to write code without knowing circuit details, while hardware designers can optimize circuits without breaking software.

## The Main Components

At the highest level, a computer system consists of several major components connected together:

### CPU (Central Processing Unit)

The CPU is the "brain" of the computer—it executes instructions. The CPU contains:
- **Arithmetic Logic Unit (ALU)**: Performs calculations and logic operations
- **Registers**: Small, fast storage locations inside the CPU
- **Control Unit**: Decides which operations happen and when
- **Program Counter (PC)**: Tracks which instruction to execute next

The CPU doesn't store programs or large data—it fetches them from memory, processes them, and writes results back.

### Memory (RAM)

**Random Access Memory** stores both instructions and data while a program runs. Key properties:
- **Volatile**: Contents are lost when power is off
- **Byte-addressed**: Each byte has a unique numeric address
- **Random access**: Any address can be accessed directly (unlike tape, which is sequential)
- **Faster than storage**: Nanoseconds vs. milliseconds

Memory is larger than registers but slower to access. A typical desktop might have 8-32 GB of RAM.

### Storage (SSD/HDD)

Storage provides **persistent** data that survives power loss:
- **Hard Disk Drives (HDD)**: Spinning magnetic platters, cheaper per GB but slower
- **Solid State Drives (SSD)**: Flash memory, faster but more expensive

Storage is orders of magnitude slower than RAM—accessing a file might take milliseconds, while RAM access takes nanoseconds. This speed gap motivates caching and memory hierarchies.

### I/O Devices

Input/Output devices connect the computer to the outside world:
- **Input**: Keyboard, mouse, camera, microphone, network interface
- **Output**: Display, speakers, printer, network interface
- **Storage**: Disk controllers (storage devices are also I/O from the CPU's perspective)

I/O devices communicate with the CPU through controllers and buses, often using interrupts to signal when they need attention.

## The Datapath and Control Unit

Within the CPU, we distinguish two major subsystems:

### Datapath

The **datapath** is the collection of components that store and manipulate data:
- Registers (temporary storage)
- ALU (computation)
- Buses (wires connecting components)
- Multiplexers (selecting which data to route where)

The datapath is the "muscle"—it does the actual work of moving and transforming data.

### Control Unit

The **control unit** is the "brain within the brain"—it decides what the datapath should do:
- Reads the current instruction
- Generates control signals (e.g., "ALU should add," "write to register R3")
- Sequences operations through the instruction cycle

The control unit doesn't perform calculations itself; it orchestrates the datapath to perform them correctly.

## The Stored-Program Concept

One of the most important ideas in computer architecture is the **stored-program concept**: both instructions and data reside in the same memory.

Before this idea (circa 1940s), computers were often programmed by physically rewiring them. The stored-program model changed everything:
- Programs can be loaded from storage into memory
- Programs can modify other programs (or themselves!)
- The same memory hardware serves both purposes
- Instructions are just data—bit patterns interpreted as operations

This is the heart of the **Von Neumann architecture**, named after mathematician John von Neumann who helped formalize it.

### Von Neumann Architecture

The classic Von Neumann model has:
- A processing unit (CPU with ALU and registers)
- A control unit (manages instruction execution)
- Memory (stores both instructions and data)
- I/O mechanisms

A limitation of this model is the **Von Neumann bottleneck**: both instructions and data share the same memory bus, which can limit performance. Modern architectures mitigate this with caches and separate instruction/data paths.

### Harvard Architecture (Brief Note)

An alternative is **Harvard architecture**, which uses separate memories (and buses) for instructions and data. Many embedded processors and DSPs use this model for performance reasons. Modern CPUs often have Harvard-like cache organization (separate L1 instruction and data caches) while maintaining a Von Neumann model at the main memory level.

## Instruction Set Architecture (ISA)

The **Instruction Set Architecture** is the interface between software and hardware. It defines:
- What instructions exist (add, load, branch, etc.)
- What registers are available
- How memory is addressed
- How data types are represented

The ISA is like a contract: software written for an ISA will run on any hardware that implements it. x86, ARM, RISC-V, and MIPS are all examples of ISAs.

**CISC vs. RISC**: Traditional architectures like x86 are "Complex Instruction Set Computing"—many instructions, some doing complex operations. RISC (Reduced Instruction Set Computing) architectures like ARM and RISC-V have simpler, more uniform instructions. Modern x86 CPUs internally translate CISC instructions to RISC-like micro-operations.

## Why Architecture Matters for Programmers

Even if you never design hardware, understanding architecture helps you:

### Reason About Performance

- **Registers vs. memory**: Accessing a register takes ~1 cycle; accessing RAM might take 100+ cycles. Keeping data in registers makes code faster.
- **Caches**: CPUs use small, fast caches to hide memory latency. Cache-friendly code (good locality) runs faster.
- **Pipelining**: CPUs overlap instruction execution. Branches can disrupt pipelines, causing stalls.

### Understand Correctness Issues

- **Integer overflow**: Fixed-width integers wrap around or produce undefined behavior.
- **Floating-point precision**: IEEE-754 representation has inherent limitations.
- **Memory ordering**: On multi-core systems, memory operations may appear out of order without proper synchronization.

### Debug Low-Level Problems

- **Pointer bugs**: Understanding memory layout helps diagnose crashes.
- **Buffer overflows**: Knowing stack and heap organization reveals exploitation paths.
- **Alignment issues**: Some architectures require data at aligned addresses.

### Write Secure Code

- **Stack layout**: Understanding how return addresses are stored helps prevent buffer overflow attacks.
- **Memory protection**: Virtual memory and page tables enable process isolation.
- **Side channels**: Cache behavior can leak information (Spectre, Meltdown).

## The Memory Hierarchy (Preview)

Modern systems use a **hierarchy** of storage with different speed/size trade-offs:

```
Registers      ~1 cycle     ~hundreds of bytes
L1 Cache       ~4 cycles    ~32-64 KB
L2 Cache       ~10 cycles   ~256 KB - 1 MB
L3 Cache       ~40 cycles   ~4-32 MB
RAM            ~100 cycles  ~8-64 GB
SSD            ~10,000 cycles   ~256 GB - 4 TB
HDD            ~10,000,000 cycles  ~1-16 TB
```

The goal: make the common case fast. Programs tend to access the same data repeatedly (temporal locality) and nearby data sequentially (spatial locality). Caches exploit these patterns.

## The Execution Model

At the most abstract level, the CPU repeatedly:
1. **Fetches** an instruction from memory (at the address in the PC)
2. **Decodes** the instruction to understand what operation to perform
3. **Executes** the operation (arithmetic, memory access, branch, etc.)
4. **Writes back** results (to a register or memory)
5. Updates the PC to the next instruction

This is the **instruction cycle**, covered in detail in the next subtopic.

## Key Takeaways

- Architecture bridges software and hardware—understanding it explains program behavior.
- Main components: **CPU** (datapath + control), **memory** (instructions and data), **storage** (persistent), **I/O** (external world).
- The **stored-program concept** (Von Neumann model) means instructions are data stored in memory.
- **ISA** defines the software/hardware interface: available instructions, registers, addressing modes.
- Architecture knowledge helps with **performance** (caches, pipelines), **correctness** (overflow, precision), **debugging** (memory layout), and **security** (stack attacks).
- The **memory hierarchy** trades off size and speed, exploiting locality for performance.

