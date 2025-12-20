# Virtual Memory and File Systems

Virtual memory extends physical memory using disk storage, while file systems provide persistent storage abstraction. This topic covers demand paging, page replacement, and file system implementation.

## Overview

**Virtual memory** allows processes to have address spaces larger than physical memory by using disk as backing store. **File systems** organize and store data persistently, providing a logical view of secondary storage.

## Key Concepts

### Virtual Memory
- **Demand Paging**: Pages loaded only when needed
- **Page Fault**: Access to page not in memory triggers loading
- **Page Replacement**: When memory full, select victim page to swap out
- **Thrashing**: Excessive paging degrading performance

### Page Replacement Algorithms
- **FIFO**: Replace oldest page
- **Optimal**: Replace page not used for longest time (theoretical)
- **LRU**: Replace least recently used page
- **Clock (Second Chance)**: Approximation of LRU

### File System Concepts
- **File Attributes**: Name, type, size, protection, timestamps
- **Directory Structure**: Single-level, two-level, tree, acyclic graph
- **Allocation Methods**: Contiguous, linked, indexed
- **Free Space Management**: Bit vectors, linked lists

## Learning Objectives

After completing this topic, you will be able to:
1. Explain demand paging and page faults
2. Implement page replacement algorithms
3. Calculate page fault rates and working sets
4. Detect and prevent thrashing
5. Design file system structures
6. Compare file allocation methods
7. Implement directory and free space management
