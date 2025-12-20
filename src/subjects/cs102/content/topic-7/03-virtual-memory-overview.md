---
id: cs102-t7-virtual-memory-overview
title: "Virtual Memory Overview"
order: 3
---

# Virtual Memory Overview

Virtual memory is one of the most important abstractions in computing. It gives each process the illusion of having a large, private, contiguous memory space, even though physical memory is limited and shared among many processes. Behind this illusion, the operating system and hardware work together to map virtual addresses to physical addresses, provide isolation between processes, and efficiently manage the limited resource of RAM.

## The Problem Virtual Memory Solves

Without virtual memory, programs face several challenges:

**Physical address limitations**: Programs would need to know exactly where in physical memory they're loaded. Moving a program or running multiple instances would require complex relocation.

**Memory fragmentation**: As programs start and stop, physical memory becomes fragmented into small chunks, making it hard to allocate space for new programs.

**No isolation**: Any program could read or write any memory location, including memory belonging to other programs or the operating system.

**Limited memory**: Programs couldn't use more memory than physically available.

Virtual memory solves all of these problems with a single abstraction: each process gets its own private address space that's mapped onto physical memory by the hardware.

## Address Spaces

### Virtual Address Space

Every process has its own **virtual address space**—a range of addresses from 0 to some maximum (e.g., 0 to 2^48 - 1 on x86-64). From the process's perspective, it has sole ownership of this entire range.

A typical 64-bit virtual address space layout:

```
High addresses (0xFFFFFFFF...)
+------------------------+
| Kernel space           |  (reserved for OS)
+------------------------+
| Stack                  |  (grows downward)
|          ↓             |
+------------------------+
|                        |
|     (unused)           |
|                        |
+------------------------+
|          ↑             |
| Heap                   |  (grows upward)
+------------------------+
| BSS (uninitialized)    |
+------------------------+
| Data (initialized)     |
+------------------------+
| Text (code)            |
+------------------------+
Low addresses (0x00000000...)
```

Each process sees this layout, but the actual physical locations backing these virtual addresses are different for each process.

### Physical Address Space

The **physical address space** represents actual RAM. It's much smaller than the virtual address space—a system might have 16 GB of physical RAM but provide 256 TB of virtual address space to each process.

## Pages and Frames

Virtual memory divides both virtual and physical address spaces into fixed-size chunks:

- **Pages**: Fixed-size chunks of virtual memory (typically 4 KB)
- **Frames**: Fixed-size chunks of physical memory (same size as pages)

The page size is a power of 2, enabling efficient address translation. Common sizes:
- 4 KB (standard on x86, ARM)
- 2 MB or 1 GB (huge pages for specific use cases)

### Why Fixed-Size Units?

Using fixed-size pages eliminates external fragmentation—any free frame can hold any page. It also simplifies the hardware because addresses can be split cleanly into page number and offset.

For a 4 KB page size and 32-bit addresses:
- Page offset: 12 bits (2^12 = 4096 bytes per page)
- Virtual page number (VPN): 20 bits (2^20 ≈ 1 million pages)

## Address Translation

When the CPU accesses memory using a virtual address, the hardware must translate it to a physical address. This happens for every memory access—loads, stores, and instruction fetches.

### Translation Process

1. Split the virtual address into **Virtual Page Number (VPN)** and **Page Offset**
2. Look up the VPN in the **page table** to find the **Physical Frame Number (PFN)**
3. Combine the PFN with the page offset to get the physical address
4. Access the physical memory location

```
Virtual Address:  |---- VPN ----|-- Offset --|
                        ↓
                  Page Table
                        ↓
Physical Address: |---- PFN ----|-- Offset --|
```

The page offset remains unchanged—it's just the position within the page. Only the page/frame number is translated.

### Example Translation

Given:
- Virtual address: 0x12345678
- Page size: 4 KB (12-bit offset)

Split the address:
- VPN: 0x12345 (upper 20 bits)
- Offset: 0x678 (lower 12 bits)

If the page table maps VPN 0x12345 → PFN 0xABCDE:
- Physical address: 0xABCDE678

## Page Tables

A **page table** is a data structure (maintained by the OS, used by hardware) that maps virtual page numbers to physical frame numbers.

### Page Table Entry (PTE)

Each entry in the page table contains:
- **Physical Frame Number**: Where this page lives in physical memory
- **Valid/Present bit**: Is this page currently in physical memory?
- **Read/Write bit**: Is writing allowed?
- **User/Supervisor bit**: Can user-mode code access this page?
- **Dirty bit**: Has this page been written to?
- **Accessed bit**: Has this page been read recently?
- **Other bits**: Cache control, no-execute, etc.

### Multi-Level Page Tables

A single-level page table for a 32-bit address space with 4 KB pages would need 2^20 entries. With 4 bytes per entry, that's 4 MB per process—too large when most entries would be invalid.

Modern systems use **multi-level page tables** that only allocate table space for regions actually in use:

**Two-level page table** (32-bit):
- Virtual address: |10-bit dir|10-bit table|12-bit offset|
- First level (page directory): 1024 entries
- Second level (page tables): 1024 entries each, allocated on demand

**Four-level page table** (64-bit x86):
- PML4 → PDPT → PD → PT → physical frame
- Each level has 512 entries (9 bits each)
- Only allocates tables for used regions

## The Memory Management Unit (MMU)

The **MMU** is hardware that performs address translation. It sits between the CPU and memory, intercepting every memory access.

The MMU:
1. Receives virtual addresses from the CPU
2. Translates them to physical addresses using page tables
3. Checks permissions (read/write/execute)
4. Raises exceptions for invalid accesses or missing pages

### Translation Lookaside Buffer (TLB)

Walking multi-level page tables for every memory access would be catastrophically slow. The **TLB** is a small, fast cache of recent virtual-to-physical translations.

TLB characteristics:
- Very small (32-512 entries typically)
- Very fast (accessed in parallel with L1 cache lookup)
- Fully associative (any translation can be in any entry)
- Must be flushed on context switch (or use tagged entries)

**TLB hit**: Translation found in TLB; proceeds immediately.
**TLB miss**: Must walk page tables to find translation; result cached in TLB.

## Page Faults

A **page fault** occurs when a virtual address cannot be translated to a valid physical address. The MMU raises an exception, and the OS handles it.

### Types of Page Faults

**Minor fault** (soft fault): The page is in physical memory but not mapped. The OS just updates the page table. Examples:
- First access to a newly mapped page (lazy allocation)
- Page shared between processes (copy-on-write)

**Major fault** (hard fault): The page is not in physical memory and must be loaded from disk. This is extremely slow (millions of cycles). Examples:
- Page was swapped out to make room for other pages
- Memory-mapped file page not yet loaded
- Executable code not yet read from disk

**Invalid fault**: The access is illegal—invalid address, permission violation. The OS terminates the process with a segmentation fault.

### Page Fault Handling

When a major page fault occurs:
1. MMU raises exception; CPU traps to OS
2. OS identifies which page is needed
3. OS finds a free frame (or evicts one)
4. OS initiates disk I/O to load the page
5. Process is blocked while waiting
6. When I/O completes, OS updates page table
7. Process resumes; instruction is retried

## Demand Paging and Swapping

### Demand Paging

With **demand paging**, pages are only loaded when accessed. When a program starts, few pages are in memory. As it runs and accesses different parts of its address space, pages are faulted in on demand.

Benefits:
- Faster startup (don't need to load entire program)
- Only load pages actually used
- Program can be larger than physical memory

### Swapping

When physical memory is full and a new frame is needed, the OS must evict a page. If the page has been modified (dirty bit set), it must be written to **swap space** on disk before the frame can be reused.

Page replacement algorithms decide which page to evict:
- **LRU**: Evict least recently accessed page
- **Clock**: Approximation of LRU using accessed bits
- **Working set**: Keep recently used pages, evict others

### Thrashing

**Thrashing** occurs when the system spends more time paging than doing useful work. This happens when:
- Total working set of all processes > physical memory
- Pages are constantly being evicted and reloaded

Symptoms: disk constantly active, processes barely progressing, system unresponsive.

Solutions: Add more RAM, reduce number of active processes, kill memory-hungry processes.

## Protection and Isolation

Virtual memory provides strong process isolation:

### Address Space Isolation

Each process has its own page table. Process A's virtual address 0x1000 maps to a different physical frame than process B's virtual address 0x1000. Neither process can access the other's memory.

### Permission Bits

Each page table entry includes permission bits:
- **Read**: Can load from this page
- **Write**: Can store to this page
- **Execute**: Can fetch instructions from this page (NX/XD bit prevents execution)
- **User/Kernel**: User code can/cannot access this page

Violating permissions causes a protection fault.

### Copy-On-Write (COW)

When a process forks, the child initially shares the parent's pages (marked read-only). If either process writes, a page fault occurs, and the OS copies the page—only then does each have a private copy.

This makes fork() fast because most pages are never written and never copied.

## Key Takeaways

- **Virtual memory** gives each process a private address space, providing isolation and flexibility.
- Memory is divided into **pages** (virtual) and **frames** (physical), typically 4 KB each.
- **Page tables** map virtual page numbers to physical frame numbers; multi-level tables save space.
- The **MMU** performs address translation in hardware; the **TLB** caches recent translations.
- **Page faults** occur when translation fails; major faults require slow disk access.
- **Demand paging** loads pages only when accessed; **swapping** evicts pages when memory is full.
- **Thrashing** occurs when the system pages excessively; working set exceeds physical memory.
- Permission bits and separate page tables provide **protection** and **isolation** between processes.
- Virtual memory makes it possible to run programs larger than physical memory and to safely share the system among multiple processes.

