# Virtual Memory Overview

Virtual memory gives programs the illusion of a large, contiguous memory space, while the OS and hardware map those addresses onto physical memory.

## Why virtual memory exists

It provides:
- **Isolation**: one process can’t easily read another’s memory
- **Convenience**: each process gets its own address space
- **Flexibility**: pages can be moved between RAM and storage

## Pages and page tables

Memory is divided into fixed-size **pages** (e.g., 4 KB). The mapping from virtual pages to physical frames is stored in **page tables**.

The **MMU** (Memory Management Unit) translates virtual addresses to physical addresses.

## Page faults

If a page is not present in RAM, accessing it triggers a **page fault**, and the OS loads it (potentially from disk). Page faults are very slow compared to cache misses.

## Key takeaways

- Virtual memory maps per-process virtual addresses onto physical memory.
- Pages and page tables are the unit of mapping and protection.
- Page faults are expensive and heavily influence performance.

