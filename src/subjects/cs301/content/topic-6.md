# Memory Management

Every running program needs memory—but there's never enough to go around. In this topic, you'll learn how operating systems juggle memory between processes, from simple contiguous allocation to sophisticated paging schemes that create the illusion of infinite memory.

**Learning Objectives:**
- Explain address binding at compile, load, and execution time
- Compare contiguous allocation, paging, and segmentation
- Calculate page table entries and physical addresses
- Analyze internal and external fragmentation
- Implement paging with multi-level page tables
- Design memory protection and sharing mechanisms

---

## Core Concepts

### The Memory Hierarchy

```
               ┌──────────────┐
               │  Registers   │  ← Fastest, smallest
               ├──────────────┤
               │    Cache     │
               ├──────────────┤
               │  Main Memory │  ← OS manages this
               ├──────────────┤
               │    Disk      │  ← Virtual memory extends here
               └──────────────┘  ← Slowest, largest
```

The OS manages main memory, deciding which processes get which portions, and uses disk to extend available memory through virtual memory.

### Address Binding

Programs use symbolic addresses (variable names). These must be bound to physical addresses at some point:

**Compile Time:**
```c
// Absolute addresses generated at compile time
// Only works if memory location is known in advance
// Example: embedded systems with fixed memory layout
int* ptr = (int*)0x1000;  // Hardcoded address
```

**Load Time:**
```c
// Relocatable code with relative addresses
// Bound when program is loaded into memory
// If starting address changes, must reload
```

**Execution Time (Dynamic):**
```c
// Addresses resolved during execution
// Requires hardware support (MMU)
// Enables moving processes in memory
// Used by modern operating systems
```

### Logical vs Physical Addresses

```
┌─────────────┐                    ┌─────────────┐
│   Process   │                    │   Physical  │
│   (Logical) │ ───── MMU ─────→   │   Memory    │
│   Address   │                    │   Address   │
└─────────────┘                    └─────────────┘
     500                               14500
                    Base = 14000
                    Logical 500 → Physical 14500
```

The **Memory Management Unit (MMU)** translates logical addresses to physical addresses at runtime.

---

## Contiguous Memory Allocation

Each process occupies a contiguous block of memory.

### Fixed Partitions

Memory divided into fixed-size partitions:

```
┌────────────────────┐
│        OS          │
├────────────────────┤
│   Partition 1      │  8 MB
│   (Process A)      │
├────────────────────┤
│   Partition 2      │  8 MB
│   (Process B)      │
├────────────────────┤
│   Partition 3      │  8 MB
│   (empty)          │
├────────────────────┤
│   Partition 4      │  8 MB
│   (Process C)      │
└────────────────────┘
```

**Problem:** Internal fragmentation—if process needs 3MB, 5MB wasted in 8MB partition.

### Variable Partitions

Partitions sized to process needs:

```
┌────────────────────┐
│        OS          │
├────────────────────┤
│   Process A (5MB)  │
├────────────────────┤
│   Hole (3MB)       │  ← External fragmentation
├────────────────────┤
│   Process B (10MB) │
├────────────────────┤
│   Hole (2MB)       │  ← Can't fit 4MB process!
└────────────────────┘
```

**Problem:** External fragmentation—total free memory exists but isn't contiguous.

### Allocation Strategies

```c
// First Fit: Allocate first hole that's big enough
Hole* first_fit(int size) {
    for (Hole* h = holes; h != NULL; h = h->next)
        if (h->size >= size) return h;
    return NULL;
}

// Best Fit: Allocate smallest hole that's big enough
Hole* best_fit(int size) {
    Hole* best = NULL;
    for (Hole* h = holes; h != NULL; h = h->next)
        if (h->size >= size && (best == NULL || h->size < best->size))
            best = h;
    return best;
}

// Worst Fit: Allocate largest hole
Hole* worst_fit(int size) {
    Hole* worst = NULL;
    for (Hole* h = holes; h != NULL; h = h->next)
        if (h->size >= size && (worst == NULL || h->size > worst->size))
            worst = h;
    return worst;
}
```

**Performance:** First fit and best fit generally outperform worst fit. First fit is fastest.

---

## Paging

Divide physical memory into fixed-size **frames** and logical memory into same-size **pages**.

```
Logical Memory              Physical Memory
┌────────────┐              ┌────────────┐
│   Page 0   │───────────→  │  Frame 5   │
├────────────┤              ├────────────┤
│   Page 1   │──────┐       │  Frame 1   │←─────┐
├────────────┤      │       ├────────────┤      │
│   Page 2   │──┐   │       │  Frame 2   │←─┐   │
├────────────┤  │   │       ├────────────┤  │   │
│   Page 3   │  │   └────→  │  Frame 3   │  │   │
└────────────┘  │           ├────────────┤  │   │
                │           │  Frame 4   │  │   │
                │           ├────────────┤  │   │
                │           │  Frame 5   │←─┴───┤
                └────────→  ├────────────┤      │
                            │  Frame 6   │      │
                            └────────────┘      │
                                                │
                            Pages can map to any frame (non-contiguous)
```

**Benefits:**
- No external fragmentation
- Efficient use of memory
- Easy to implement sharing and protection

**Trade-off:**
- Internal fragmentation (average: half a page per process)
- Page table overhead

### Address Translation

```
Logical Address:
┌────────────────────┬───────────────┐
│    Page Number     │  Page Offset  │
│      (p)           │     (d)       │
└────────────────────┴───────────────┘

Physical Address:
┌────────────────────┬───────────────┐
│   Frame Number     │  Page Offset  │
│      (f)           │     (d)       │
└────────────────────┴───────────────┘
```

**Example:**
```
Page size: 4 KB (2^12 bytes)
Logical address: 0x12345

Page number (p) = 0x12345 / 0x1000 = 0x12 = 18
Offset (d) = 0x12345 % 0x1000 = 0x345

Look up page table[18] → Frame 7

Physical address = (7 * 0x1000) + 0x345 = 0x7345
```

### Page Table Structure

```c
typedef struct {
    unsigned int frame_number : 20;   // Physical frame
    unsigned int present : 1;          // Page in memory?
    unsigned int read_write : 1;       // 0=read-only, 1=read/write
    unsigned int user_supervisor : 1;  // 0=kernel, 1=user accessible
    unsigned int accessed : 1;         // Page was read
    unsigned int dirty : 1;            // Page was written
    unsigned int reserved : 7;
} PageTableEntry;
```

### Multi-Level Page Tables

Single page table for 32-bit address space with 4KB pages:
- 2^20 entries × 4 bytes = 4MB per process!

Solution: Multi-level page tables

```
32-bit Virtual Address:
┌──────────┬──────────┬─────────────┐
│   Dir    │   Page   │   Offset    │
│  10 bits │  10 bits │   12 bits   │
└──────────┴──────────┴─────────────┘

Two-Level Lookup:
                    ┌─────────────┐
CR3 ──────────────→ │ Page Dir    │
                    │  Entry[Dir] │──→ Page Table
                    └─────────────┘      │
                                         ↓
                                    ┌─────────────┐
                                    │ Page Table  │
                                    │ Entry[Page] │──→ Frame
                                    └─────────────┘
```

```c
uint32_t translate(uint32_t virtual_addr) {
    uint32_t dir_index = (virtual_addr >> 22) & 0x3FF;
    uint32_t page_index = (virtual_addr >> 12) & 0x3FF;
    uint32_t offset = virtual_addr & 0xFFF;

    PageDirEntry* pde = &page_directory[dir_index];
    if (!pde->present) page_fault();

    PageTableEntry* pte = &pde->page_table[page_index];
    if (!pte->present) page_fault();

    return (pte->frame_number << 12) | offset;
}
```

### Translation Lookaside Buffer (TLB)

Cache for page table entries to speed up translation:

```
┌────────────────────────────────────────────────┐
│                      TLB                        │
│  Page# │ Frame# │ Valid │ Accessed │ Dirty     │
│────────┼────────┼───────┼──────────┼───────────│
│   14   │   32   │   1   │    1     │    0      │
│   18   │    7   │   1   │    1     │    1      │
│  102   │   85   │   1   │    0     │    0      │
└────────────────────────────────────────────────┘

TLB Hit: ~1ns (no memory access needed)
TLB Miss: ~100ns (must access page table in memory)
```

---

## Segmentation

Divide program into logical segments:

```
┌─────────────────┐
│      Code       │  Segment 0
├─────────────────┤
│      Data       │  Segment 1
├─────────────────┤
│      Stack      │  Segment 2
├─────────────────┤
│      Heap       │  Segment 3
└─────────────────┘

Logical Address: <segment-number, offset>
```

### Segment Table

```c
typedef struct {
    uint32_t base;   // Starting address in physical memory
    uint32_t limit;  // Length of segment
    uint8_t read;    // Read permission
    uint8_t write;   // Write permission
    uint8_t execute; // Execute permission
} SegmentDescriptor;

uint32_t translate(uint16_t segment, uint32_t offset) {
    SegmentDescriptor* sd = &segment_table[segment];

    // Check bounds
    if (offset >= sd->limit)
        segmentation_fault();

    // Check permissions (based on access type)

    return sd->base + offset;
}
```

### Paged Segmentation

Combine both: Segments are paged to avoid external fragmentation:

```
Logical Address: <segment, page, offset>

Segment Table      Page Table        Physical Memory
┌──────────┐      ┌──────────┐      ┌──────────┐
│ Seg 0    │ ──→  │ Page 0→5 │      │ Frame 5  │
│ Page Tab │      │ Page 1→9 │      │ Frame 9  │
└──────────┘      └──────────┘      └──────────┘
```

---

## Memory Protection

### Page-Level Protection

```c
// Page table entry protection bits
if (access == WRITE && !pte->read_write) {
    protection_fault();  // Write to read-only page
}

if (mode == USER && !pte->user_supervisor) {
    protection_fault();  // User accessing kernel page
}
```

### Shared Pages

Multiple processes can share same physical frame:

```
Process A              Process B
┌──────────┐          ┌──────────┐
│ Page 0   │──────┐   │ Page 0   │
├──────────┤      │   ├──────────┤
│ Page 1   │      ├──→│ Frame 42 │←┐  Shared library (libc)
├──────────┤      │   ├──────────┤ │
│ Page 2   │──────┘   │ Page 1   │─┘
└──────────┘          └──────────┘
```

### Copy-on-Write (COW)

Defer copying until write occurs:

```
After fork():
Parent Page Table     Child Page Table
     ↓                      ↓
┌──────────┐          ┌──────────┐
│ Page 0   │────────→ │ Frame 5  │ (shared, read-only)
└──────────┘          └──────────┘

On write by child:
┌──────────┐          ┌──────────┐
│ Frame 5  │          │ Frame 99 │ (new copy)
└──────────┘          └──────────┘
```

```c
void handle_cow_fault(PageTableEntry* pte) {
    // Allocate new frame
    void* new_frame = allocate_frame();

    // Copy content
    memcpy(new_frame, pte->frame_address, PAGE_SIZE);

    // Update page table entry
    pte->frame_number = frame_to_number(new_frame);
    pte->read_write = 1;  // Now writable
}
```

---

## Common Calculations

### Page Table Size

```
Given:
- Virtual address space: 32 bits (4GB)
- Page size: 4KB (2^12)
- PTE size: 4 bytes

Number of pages = 2^32 / 2^12 = 2^20 = 1M pages
Page table size = 1M × 4 bytes = 4MB per process

With 2-level paging:
- First level: 1024 entries × 4 bytes = 4KB
- Each second level: 1024 entries × 4 bytes = 4KB
- Only allocate second-level tables as needed
```

### Address Translation

```
Given:
- Page size: 8KB = 2^13 bytes
- Virtual address: 0x2A5E0

Page number = 0x2A5E0 / 0x2000 = 21 (0x15)
Offset = 0x2A5E0 % 0x2000 = 0x5E0

If page table[21] = frame 7:
Physical address = 7 × 0x2000 + 0x5E0 = 0xE5E0
```

### Fragmentation

```
Internal fragmentation (paging):
- Average waste: half a page per process
- 100 processes × 4KB pages = ~200KB wasted

External fragmentation (contiguous):
- "50% rule": After enough allocations/deallocations,
  ~1/3 of memory may be unusable fragments
```

---

## Common Mistakes

### Mistake 1: Off-by-One in Page Calculation

```c
// WRONG - integer division truncates
int pages_needed = process_size / page_size;

// CORRECT - round up
int pages_needed = (process_size + page_size - 1) / page_size;
// Or use ceiling division
int pages_needed = (process_size - 1) / page_size + 1;
```

### Mistake 2: Ignoring TLB Flushes

```c
// After updating page table, must flush TLB
update_page_table(page, new_frame);
flush_tlb();  // Otherwise stale entries may be used
```

### Mistake 3: Shared Page Accounting

```c
// WRONG - double counting shared pages
for (process in processes)
    total += process.page_count;

// CORRECT - count unique frames
Set<Frame> unique_frames;
for (process in processes)
    for (page in process.pages)
        unique_frames.add(page.frame);
total = unique_frames.size;
```

---

## Summary

You've learned how operating systems manage memory:

- **Address Binding**: Compile time, load time, or execution time
- **Contiguous Allocation**: Simple but causes fragmentation
- **Paging**: Fixed-size pages eliminate external fragmentation
- **Page Tables**: Map logical pages to physical frames; use multiple levels to save space
- **TLB**: Cache for fast address translation
- **Segmentation**: Logical divisions of program (code, data, stack)
- **Protection**: Per-page read/write/execute permissions
- **Sharing**: Multiple processes can share same frames (COW optimization)

**Key takeaways:**
- Paging is the foundation of modern memory management
- Multi-level page tables trade lookup time for space
- TLB makes paging practical (caches frequent translations)
- Copy-on-write optimizes fork() by deferring copies

---

## Further Exploration

Ready for more? Explore:
- Inverted page tables for large address spaces
- Huge pages (2MB, 1GB) to reduce TLB misses
- NUMA-aware memory allocation
- Kernel address space layout randomization (KASLR)
- Memory-mapped files and demand paging
