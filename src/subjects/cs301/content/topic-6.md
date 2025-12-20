# Memory Management

Memory management handles allocation, tracking, and deallocation of memory for processes. This topic covers the techniques used to efficiently manage primary memory.

## Overview

**Memory management** is responsible for tracking which parts of memory are in use and by whom, allocating memory to processes when needed, and deallocating it when no longer required. Effective memory management maximizes memory utilization while providing protection between processes.

## Key Concepts

### Address Binding
- **Compile time**: Absolute addresses if memory location known
- **Load time**: Relocatable code; binding at load
- **Execution time**: Binding delayed until runtime; requires hardware support

### Memory Allocation Strategies
- **Contiguous**: Each process occupies contiguous memory block
- **Paging**: Physical memory divided into fixed-size frames
- **Segmentation**: Memory divided into variable-size logical segments

### Fragmentation
- **External**: Total free memory exists but not contiguous
- **Internal**: Allocated memory larger than needed; wasted space within

### Protection and Sharing
- Base and limit registers for protection
- Shared pages for efficient memory use
- Copy-on-write optimization

## Learning Objectives

After completing this topic, you will be able to:
1. Explain address binding at different stages
2. Compare memory allocation strategies
3. Calculate internal and external fragmentation
4. Implement paging with page tables
5. Design segmentation schemes
6. Combine paging and segmentation
7. Optimize memory utilization
