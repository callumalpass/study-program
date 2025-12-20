# Virtual Memory Concepts

Virtual memory separates logical memory from physical memory, allowing programs larger than physical memory to run. This subtopic covers virtual memory concepts, benefits, and implementation overview.

## Virtual Memory Motivation

### Problems Without Virtual Memory

1. **Limited by physical RAM**: Can't run large programs
2. **Waste**: Loaded code/data may not be used immediately
3. **No isolation**: Processes can access each other's memory
4. **No sharing**: Can't efficiently share code

### Virtual Memory Solution

Each process gets its own virtual address space:

```
Process A Virtual Space:        Physical Memory:
┌─────────────────┐ 4GB        ┌─────────────────┐
│                 │            │   Process A     │
│     Stack       │            │   pages         │
├─────────────────┤            ├─────────────────┤
│                 │            │   Kernel        │
│     (gap)       │            ├─────────────────┤
│                 │            │   Process B     │
├─────────────────┤            │   pages         │
│     Heap        │            ├─────────────────┤
├─────────────────┤            │   Shared        │
│     Data        │            │   Library       │
├─────────────────┤            ├─────────────────┤
│     Code        │            │   Free          │
└─────────────────┘ 0          └─────────────────┘

Virtual space >> Physical memory
Pages loaded on demand
```

## Key Concepts

### Demand Paging

Load pages only when accessed:

```c
// Program has 1000 pages
// At startup, only load a few pages

void access_page(int page_num) {
    if (!page_table[page_num].present) {
        // Page not in memory - trigger page fault
        page_fault_handler(page_num);
    }
    // Now page is in memory, continue
}
```

### Page Fault

Access to page not in memory:

```
1. CPU generates address
2. MMU checks page table: Present bit = 0
3. MMU raises page fault exception
4. OS page fault handler:
   a. Find page on disk
   b. Allocate physical frame
   c. Load page from disk to frame
   d. Update page table
   e. Restart instruction
```

### Valid/Invalid Bit

```c
typedef struct {
    uint32_t frame : 20;
    uint32_t valid : 1;      // In memory?
    uint32_t reference : 1;  // Recently accessed?
    uint32_t dirty : 1;      // Modified?
    // ...
} PageTableEntry;

// Valid = 1: Page in memory, can access
// Valid = 0: Page on disk or invalid
```

## Virtual Address Space

### Process Layout (64-bit Linux)

```
┌─────────────────────────────────┐ 0xFFFF_FFFF_FFFF_FFFF
│         Kernel Space            │
│         (shared)                │
├─────────────────────────────────┤ 0x0000_7FFF_FFFF_FFFF
│         Stack                   │ ↓ grows down
├─────────────────────────────────┤
│                                 │
│         (unmapped)              │
│                                 │
├─────────────────────────────────┤
│     Memory Mapped Files         │
│     Shared Libraries            │
├─────────────────────────────────┤
│         Heap                    │ ↑ grows up
├─────────────────────────────────┤
│         BSS (uninitialized)     │
├─────────────────────────────────┤
│         Data (initialized)      │
├─────────────────────────────────┤
│         Text (code)             │
└─────────────────────────────────┘ 0x0000_0000_0040_0000
```

### Sparse Address Space

Most virtual addresses are invalid:

```c
// 48-bit virtual address = 256TB
// Process uses maybe 100MB

// Valid ranges:
// 0x400000 - 0x500000     Code (1MB)
// 0x600000 - 0x700000     Data (1MB)
// 0x7f0000000000 - ...    Libraries
// 0x7fffffff0000 - ...    Stack

// Everything else: invalid
// Accessing invalid → segmentation fault
```

## Benefits of Virtual Memory

### 1. Larger Address Space

```
Physical RAM: 8GB
Virtual space: 256TB (per process!)

Process can use more than physical memory
Unused pages stay on disk
```

### 2. Memory Protection

```c
// Each process has own page table
// Can only access own pages

// Kernel pages marked supervisor-only
// Process can't access kernel memory

// Code pages marked read-only
// Can't modify program code
```

### 3. Memory Sharing

```
Shared library (libc):
Process A page table: VA 0x7f00 → Frame 100
Process B page table: VA 0x7f00 → Frame 100
                                  ↓
                              Same frame!
                              (one copy in RAM)
```

### 4. Copy-on-Write (COW)

```c
// fork() doesn't copy memory immediately
pid_t pid = fork();

// Parent and child share pages (read-only)
// On write, page copied then modified

Process A: page → Frame 100 (RO)
Process B: page → Frame 100 (RO)

Process B writes:
  1. Allocate Frame 200
  2. Copy Frame 100 to Frame 200
  3. Process B: page → Frame 200 (RW)
  4. Process A: page → Frame 100 (RW)
```

### 5. Memory-Mapped Files

```c
// Map file directly into address space
void* addr = mmap(NULL, size, PROT_READ,
                  MAP_PRIVATE, fd, 0);

// Access file as memory
char c = ((char*)addr)[100];  // Reads from file!

// Page faults load file contents
// Modified pages written back to file
```

## Page Fault Handling

### Page Fault Types

```c
typedef enum {
    MINOR_FAULT,     // Page in memory, just update table
    MAJOR_FAULT,     // Must read from disk
    INVALID_FAULT    // Illegal access
} PageFaultType;

void page_fault_handler(uint32_t address, AccessType type) {
    PageTableEntry* pte = lookup_pte(address);

    if (pte == NULL || !is_valid_address(address)) {
        // Invalid address
        send_signal(SIGSEGV);
        return;
    }

    if (pte->valid) {
        // Minor fault (copy-on-write, etc.)
        handle_minor_fault(address, pte);
    } else {
        // Major fault - load from disk
        handle_major_fault(address, pte);
    }
}
```

### Major Page Fault Flow

```c
void handle_major_fault(uint32_t address, PageTableEntry* pte) {
    // 1. Find free frame
    int frame = allocate_frame();
    if (frame == -1) {
        // No free frames - must evict
        frame = select_victim_frame();
        evict_page(frame);
    }

    // 2. Read page from disk
    disk_read(pte->disk_location, frame_to_address(frame));

    // 3. Update page table
    pte->frame = frame;
    pte->valid = true;

    // 4. Restart instruction
    // (automatically when handler returns)
}
```

## Performance

### Effective Access Time

```
Page fault rate: p (0 ≤ p ≤ 1)
Memory access time: 100ns
Page fault time: 10ms

EAT = (1-p) × 100ns + p × 10ms
    = (1-p) × 100ns + p × 10,000,000ns

For EAT < 110ns (10% overhead):
  (1-p) × 100 + p × 10,000,000 < 110
  p < 1/1,000,000

Need page fault rate < 0.0001%!
```

### Why It Works: Locality

```
Temporal locality: Recently accessed → likely accessed again
Spatial locality: Nearby addresses → likely accessed together

Working set: Pages actively used

Most accesses hit working set (in RAM)
Page faults rare → virtual memory efficient
```

## Summary

Virtual memory provides powerful abstraction:
- Each process gets private address space
- Physical memory shared/managed by OS
- Demand paging loads pages as needed
- Page faults bring pages from disk
- Benefits: larger space, protection, sharing, COW
- Works due to locality of reference
- Essential for modern operating systems
