# Process Management

Process management is the foundation of operating systems, encompassing the creation, execution, and termination of processes. This topic explores how modern operating systems handle the fundamental unit of execution.

## Overview

A **process** is a program in execution. While a program is a passive entity stored on disk, a process is an active entity with a program counter, registers, and allocated memory. Understanding process management is essential for comprehending how operating systems multiplex CPU time among multiple applications.

## Key Concepts

### Process States
Processes transition through several states during their lifetime:
- **New**: Being created
- **Ready**: Waiting to be assigned to a processor
- **Running**: Instructions being executed
- **Waiting**: Waiting for some event (I/O completion, signal)
- **Terminated**: Finished execution

### Process Control Block (PCB)
Each process is represented by a PCB containing:
- Process state and ID
- Program counter and CPU registers
- Memory management information
- I/O status and accounting information

### Context Switching
When the CPU switches from one process to another, the system must save the state of the old process and load the saved state of the new process.

## Learning Objectives

After completing this topic, you will be able to:
1. Explain the process concept and lifecycle
2. Describe process states and transitions
3. Understand the role of the PCB
4. Analyze context switching overhead
5. Compare process creation mechanisms
6. Implement process management in system calls
7. Evaluate interprocess communication methods
