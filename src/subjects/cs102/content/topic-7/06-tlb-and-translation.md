---
id: cs102-t7-tlb-translation
title: "TLB and Address Translation"
order: 6
---

# TLB and Address Translation Details

Virtual memory provides each process with its own private address space, but this illusion requires translating virtual addresses to physical addresses on every memory access. The Translation Lookaside Buffer (TLB) caches these translations to make virtual memory practical. Understanding the TLB explains performance anomalies and guides memory-intensive optimization.

## Virtual to Physical Translation

Every memory access goes through address translation:

```
Virtual Address (VA) → Page Table Lookup → Physical Address (PA)
```

A virtual address is split into:
- **Virtual Page Number (VPN)**: Identifies the page
- **Page Offset**: Position within the page

For 4 KB pages with 48-bit virtual addresses:
```
Virtual Address (48 bits):
┌─────────────────────────────────────┬────────────────┐
│         VPN (36 bits)               │ Offset (12 bits)│
└─────────────────────────────────────┴────────────────┘

Physical Address (after translation):
┌─────────────────────────────────────┬────────────────┐
│         PPN (Physical Page Number)   │ Offset (12 bits)│
└─────────────────────────────────────┴────────────────┘
```

The offset passes through unchanged; only the page number is translated.

## Page Table Structure

Modern systems use multi-level page tables to avoid allocating huge tables for sparse address spaces.

### x86-64 Four-Level Page Tables

```
Virtual Address bits:
┌────────┬────────┬────────┬────────┬────────────┐
│ PML4   │ PDPT   │  PD    │  PT    │   Offset   │
│ 9 bits │ 9 bits │ 9 bits │ 9 bits │  12 bits   │
└────────┴────────┴────────┴────────┴────────────┘
     ↓        ↓        ↓        ↓
   512     512      512      512     4096
 entries entries entries entries   bytes/page
```

Each level is a table with 512 entries. The VPN selects indices into each level.

### Translation Walk

To translate a virtual address:

```
1. CR3 register points to PML4 base
2. PML4[bits 47-39] → PDPT base
3. PDPT[bits 38-30] → PD base
4. PD[bits 29-21]   → PT base
5. PT[bits 20-12]   → Physical Page base
6. Append page offset (bits 11-0)
```

This requires **four memory accesses** just to translate one address—unacceptable performance without caching.

## The Translation Lookaside Buffer (TLB)

The TLB caches recent virtual-to-physical translations:

```
TLB Entry:
┌──────────────────┬───────────────────┬──────────┐
│  Virtual Page #   │  Physical Page #   │  Flags   │
└──────────────────┴───────────────────┴──────────┘

Flags: Valid, Read, Write, Execute, User/Kernel, etc.
```

### TLB Operation

```
CPU generates virtual address
        ↓
TLB Lookup (VPN)
        ↓
    ┌───────────────┐
    │   TLB Hit?    │───Yes──→ Use cached PPN (1 cycle)
    └───────────────┘
            │ No
            ↓
    Page Table Walk
    (multiple memory accesses)
            ↓
    Fill TLB Entry
            ↓
    Use PPN
```

**TLB hit**: Translation completed in ~1 cycle
**TLB miss**: Page table walk takes ~100+ cycles

### TLB Statistics

| Component | Typical Size | Hit Rate |
|-----------|--------------|----------|
| L1 DTLB (data) | 64-128 entries | ~99% |
| L1 ITLB (instruction) | 64-128 entries | ~99.9% |
| L2 TLB (unified) | 512-2048 entries | ~99.99% |

With 99% hit rate and 4 KB pages, the TLB covers 256 KB to 512 KB of memory.

## TLB Miss Handling

When the TLB doesn't contain the translation:

### Hardware Page Table Walk (x86)

The CPU automatically walks the page table:
1. Reads CR3 (page table base)
2. Accesses each level in memory
3. Fills TLB entry
4. Retries the original instruction

This is invisible to software but takes 100+ cycles.

### Software-Managed TLB (MIPS, older SPARC)

The OS handles TLB misses via a trap:
1. TLB miss triggers exception
2. OS trap handler walks page table
3. OS inserts TLB entry
4. Returns to retry instruction

More flexible but higher overhead per miss.

## TLB Associativity

TLBs can be:

**Fully associative**: Any entry can hold any translation
- Slow lookup (compare all entries)
- Best hit rate

**Set-associative**: Entries grouped into sets
- 4-way or 8-way common
- Faster lookup
- Good hit rate

### TLB Index Calculation

For a set-associative TLB, the set index comes from VPN bits:

```
VPN: ...XXXXSSSSSOOOOOOOOOOO
              │       │
              │       └── Page offset (12 bits)
              └── Set index (for 32-set TLB: 5 bits)
```

## TLB and Context Switches

Each process has its own virtual address space, so TLB entries from one process are invalid for another.

### TLB Flush on Context Switch

Traditionally, the entire TLB is flushed:
```
Context switch → Clear all TLB entries → New process starts with empty TLB
```

This causes **TLB thrashing**: the new process suffers many misses until the TLB warms up.

### Address Space Identifiers (ASIDs)

Modern CPUs tag TLB entries with a process identifier:

```
TLB Entry:
┌──────┬──────────────────┬───────────────────┬──────────┐
│ ASID │  Virtual Page #   │  Physical Page #   │  Flags   │
└──────┴──────────────────┴───────────────────┴──────────┘
```

Now context switch just changes the current ASID—old entries remain but don't match.

### PCID (Process Context Identifiers)

x86-64 supports 12-bit PCIDs (4096 process IDs). When enabled:
- TLB entries include PCID
- Only entries matching current PCID are used
- Reduces context switch overhead significantly

## TLB and Large Pages

Large pages (2 MB or 1 GB instead of 4 KB) dramatically improve TLB coverage:

| Page Size | TLB Coverage (128 entries) |
|-----------|---------------------------|
| 4 KB | 512 KB |
| 2 MB | 256 MB |
| 1 GB | 128 GB |

Large pages are used for:
- Huge memory regions (databases, VMs)
- Performance-critical applications
- Reducing TLB pressure

### Trade-offs

- Large pages waste memory if not fully used (internal fragmentation)
- Harder to allocate (need contiguous physical memory)
- Less flexible (can't have per-4KB permissions)

## TLB Performance Impact

### Example: Array Traversal

Traversing a 1 MB array with 4 KB pages:
```
1 MB / 4 KB = 256 pages

With 128-entry TLB (fully associative):
- First 128 pages: TLB misses
- Next 128 pages: TLB misses (evicting previous)
- Working set exceeds TLB capacity
```

With 2 MB pages:
```
1 MB fits in 1 page
Single TLB entry covers entire array
```

### Pathological Case: Large Stride

```c
for (int i = 0; i < 1024; i++) {
    sum += arr[i * 4096];  // Access every page once, then move on
}
```

Each access is on a different 4 KB page. With 128-entry TLB:
- First 128 accesses: TLB misses
- Access 129: evicts entry for access 1
- Access 130 on same page as access 1: TLB miss again!

This is **TLB thrashing**—the TLB is too small for the access pattern.

## TLB Shootdown

In multiprocessor systems, when one CPU modifies a page table:

```
CPU 0 changes page table entry
CPU 1's TLB still has old entry

Problem: CPU 1 uses stale translation
```

Solution: **TLB shootdown**
1. CPU 0 sends interrupt to all other CPUs
2. Each CPU invalidates the affected TLB entry
3. All CPUs acknowledge
4. CPU 0 continues

This is expensive (inter-processor interrupts), which is why kernel memory mapping changes are minimized.

## Observing TLB Behavior

### Linux perf Counters

```bash
perf stat -e dTLB-loads,dTLB-load-misses ./program
```

Output:
```
100,000,000 dTLB-loads
    100,000 dTLB-load-misses   # 0.1% miss rate
```

### Interpreting Results

- 0.01% miss rate: Excellent, working set fits in TLB
- 0.1-1% miss rate: Good for large data
- >1% miss rate: Potential performance problem

## Optimization Strategies

### Improve Locality

Access memory sequentially or in tight loops:
```c
// Good: sequential access
for (int i = 0; i < n; i++) sum += arr[i];

// Bad: strided access
for (int i = 0; i < n; i += 4096) sum += arr[i];
```

### Use Large Pages

For huge allocations:
```c
// Linux: allocate with huge pages
void *p = mmap(NULL, size, PROT_READ|PROT_WRITE,
               MAP_PRIVATE|MAP_ANONYMOUS|MAP_HUGETLB, -1, 0);
```

### Reduce Working Set

Keep active data compact:
- Use appropriate data types (don't waste space)
- Avoid pointer-heavy structures that scatter data
- Group related data together

## Key Takeaways

- **Address translation** converts virtual to physical addresses using page tables.
- **Multi-level page tables** avoid allocating tables for unused address ranges.
- **TLB** caches translations; hits take ~1 cycle, misses take 100+ cycles.
- Modern TLBs have 99%+ hit rates covering hundreds of KB to MB of memory.
- **ASID/PCID** tags allow TLB entries to survive context switches.
- **Large pages** (2 MB, 1 GB) dramatically increase TLB coverage.
- **TLB thrashing** occurs when working set exceeds TLB capacity.
- **TLB shootdown** coordinates TLB invalidation across multiprocessor systems.
- **Sequential access patterns** improve TLB efficiency.
- TLB misses are often the hidden cost of pointer-chasing data structures.

