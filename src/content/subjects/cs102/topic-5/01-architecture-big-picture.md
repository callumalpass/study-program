# Computer Architecture: The Big Picture

Computer architecture describes how a computer is structured and how it executes programs. CS102 focuses on the conceptual model that connects software to hardware.

## The main components

At a high level, a computer consists of:
- **CPU** (Central Processing Unit): executes instructions
- **Memory** (RAM): stores instructions and data while running
- **Storage** (SSD/HDD): persistent data (slower than RAM)
- **I/O devices**: keyboard, display, network, disk controllers, etc.

In many introductory models, the CPU is split into:
- **Datapath**: moves and transforms data (registers, ALU, buses)
- **Control**: decides which operations happen when

## Stored-program concept

Modern computers store both:
- program instructions
- program data

in memory. The CPU fetches instructions from memory and executes them one at a time (or in a pipeline).

This is the heart of the Von Neumann model: **instructions are data**.

## Why this matters for programmers

Understanding architecture helps you reason about:
- performance (why caches matter)
- correctness (integer overflow, floating point behavior)
- low-level bugs (pointer mistakes, memory layout issues)
- security (buffer overflows, memory corruption)

## Key takeaways

- Architecture is the bridge between code and hardware behavior.
- CPU = datapath + control, working over memory and I/O.
- The stored-program model explains why “instructions live in memory too.”

