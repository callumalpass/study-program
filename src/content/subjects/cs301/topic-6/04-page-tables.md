# Page Table Structures

Page tables can become very large. This subtopic covers hierarchical page tables, hashed page tables, and inverted page tables.

## Page Table Size Problem

### Calculation

```
32-bit address space, 4KB pages:
  Pages = 2^32 / 2^12 = 2^20 = 1M pages
  Entry size = 4 bytes
  Page table size = 4MB per process!

64-bit address space, 4KB pages:
  Pages = 2^64 / 2^12 = 2^52 pages
  Entry size = 8 bytes
  Page table size = 32 PETABYTES!
```

### The Problem

- Each process needs its own page table
- Page table must be in memory for translation
- Most entries unused (sparse address space)

## Hierarchical Page Tables

### Two-Level Page Table

Split page table into multiple levels:

```
32-bit address (4KB pages):
┌──────────────┬──────────────┬──────────────┐
│ P1 (10 bits) │ P2 (10 bits) │ Offset (12)  │
└──────────────┴──────────────┴──────────────┘

P1: Index into outer page table
P2: Index into inner page table
Offset: Position within page
```

### Translation Process

```
                    Logical Address
                          │
         ┌────────────────┼────────────────┐
         │                │                │
         ↓                ↓                ↓
      P1 (10)          P2 (10)        Offset (12)
         │                │                │
         │                │                │
         ↓                │                │
┌─────────────────┐      │                │
│  Outer Page     │      │                │
│  Table          │      │                │
│  ┌───────────┐  │      │                │
│  │ entry[P1] │──┼──────┘                │
│  └───────────┘  │      │                │
└─────────────────┘      │                │
                         ↓                │
              ┌─────────────────┐         │
              │  Inner Page     │         │
              │  Table          │         │
              │  ┌───────────┐  │         │
              │  │ entry[P2] │──┼─────────┘
              │  └───────────┘  │         │
              └─────────────────┘         │
                         │                │
                         ↓                ↓
                    Frame Number    +   Offset
                         │                │
                         └────────────────┘
                                │
                                ↓
                         Physical Address
```

### Implementation

```c
// Two-level page table (32-bit, 4KB pages)
#define P1_SHIFT 22
#define P2_SHIFT 12
#define OFFSET_MASK 0xFFF
#define P2_MASK 0x3FF
#define P1_MASK 0x3FF

typedef struct {
    uint32_t frame : 20;
    uint32_t present : 1;
    uint32_t rw : 1;
    uint32_t reserved : 10;
} PageTableEntry;

// Outer page table (page directory)
typedef struct {
    PageTableEntry* inner_tables[1024];
    bool present[1024];
} OuterPageTable;

uint32_t translate_two_level(uint32_t logical,
                             OuterPageTable* outer) {
    uint32_t p1 = (logical >> P1_SHIFT) & P1_MASK;
    uint32_t p2 = (logical >> P2_SHIFT) & P2_MASK;
    uint32_t offset = logical & OFFSET_MASK;

    // Check outer table
    if (!outer->present[p1]) {
        page_fault(logical);
    }

    // Get inner table
    PageTableEntry* inner = outer->inner_tables[p1];

    // Check inner table
    if (!inner[p2].present) {
        page_fault(logical);
    }

    // Construct physical address
    return (inner[p2].frame << P2_SHIFT) | offset;
}
```

### Space Savings

```
Without hierarchy:
  1M entries × 4 bytes = 4MB always

With two-level:
  Outer table: 1024 entries × 4 bytes = 4KB
  Inner tables: Only for used regions

Example process using 8MB:
  Code: 1MB → 1 inner table
  Data: 2MB → 1 inner table
  Stack: 1MB → 1 inner table

  Total: 4KB (outer) + 3 × 4KB (inner) = 16KB
  Savings: 4MB → 16KB (250× reduction)
```

## Three-Level and Four-Level Page Tables

### 64-bit Systems

```
x86-64 with 4KB pages (48-bit address used):
┌────────┬────────┬────────┬────────┬──────────┐
│PML4(9) │PDPT(9) │PD(9)   │PT(9)   │Offset(12)│
└────────┴────────┴────────┴────────┴──────────┘

PML4: Page Map Level 4 (512 entries)
PDPT: Page Directory Pointer Table
PD:   Page Directory
PT:   Page Table
```

### Linux Page Table Levels

```c
// Linux supports multiple levels
typedef struct {
    pgd_t* pgd;    // Page Global Directory
    p4d_t* p4d;    // Page 4th-level Directory (x86-64 5-level)
    pud_t* pud;    // Page Upper Directory
    pmd_t* pmd;    // Page Middle Directory
    pte_t* pte;    // Page Table Entry
} PageTableWalk;

pte_t* lookup_page(unsigned long addr) {
    pgd_t* pgd = pgd_offset(current->mm, addr);
    if (pgd_none(*pgd)) return NULL;

    p4d_t* p4d = p4d_offset(pgd, addr);
    if (p4d_none(*p4d)) return NULL;

    pud_t* pud = pud_offset(p4d, addr);
    if (pud_none(*pud)) return NULL;

    pmd_t* pmd = pmd_offset(pud, addr);
    if (pmd_none(*pmd)) return NULL;

    return pte_offset(pmd, addr);
}
```

## Hashed Page Tables

### Concept

Use hash table instead of hierarchical array:

```
Virtual Address → Hash Function → Hash Table → Frame Number

Hash table bucket contains:
- Virtual page number
- Frame number
- Pointer to next entry (chaining)
```

### Implementation

```c
#define HASH_SIZE 4096

typedef struct HashEntry {
    uint32_t vpn;           // Virtual page number
    uint32_t frame;         // Physical frame
    struct HashEntry* next; // Chain
} HashEntry;

HashEntry* hash_table[HASH_SIZE];

uint32_t hash_function(uint32_t vpn) {
    return vpn % HASH_SIZE;
}

int lookup_hashed(uint32_t vpn) {
    uint32_t index = hash_function(vpn);
    HashEntry* entry = hash_table[index];

    while (entry != NULL) {
        if (entry->vpn == vpn) {
            return entry->frame;
        }
        entry = entry->next;
    }

    return -1;  // Page fault
}

void insert_hashed(uint32_t vpn, uint32_t frame) {
    uint32_t index = hash_function(vpn);

    HashEntry* entry = malloc(sizeof(HashEntry));
    entry->vpn = vpn;
    entry->frame = frame;
    entry->next = hash_table[index];
    hash_table[index] = entry;
}
```

### Clustered Page Tables

Group entries to improve cache performance:

```c
#define CLUSTER_SIZE 4

typedef struct {
    uint32_t vpn[CLUSTER_SIZE];
    uint32_t frame[CLUSTER_SIZE];
    int count;
    struct ClusterEntry* next;
} ClusterEntry;

// Check multiple entries in one cache line
```

## Inverted Page Tables

### Concept

One entry per physical frame, not per virtual page:

```
Traditional:                    Inverted:
┌─────────────────┐            ┌─────────────────┐
│ VPN 0 → Frame   │            │ Frame 0: PID,VPN│
│ VPN 1 → Frame   │            │ Frame 1: PID,VPN│
│ VPN 2 → Frame   │            │ Frame 2: PID,VPN│
│ ...             │            │ Frame 3: PID,VPN│
│ VPN N → Frame   │            │ ...             │
└─────────────────┘            └─────────────────┘
  (per process!)                 (one for system)
```

### Size Comparison

```
Traditional (per process):
  1M entries × 4 bytes × 100 processes = 400MB

Inverted (global):
  Physical frames × entry size
  1GB RAM / 4KB = 256K frames
  256K × 8 bytes = 2MB total!
```

### Implementation

```c
typedef struct {
    int pid;          // Process ID
    uint32_t vpn;     // Virtual page number
    bool valid;
} InvertedEntry;

InvertedEntry inverted_table[TOTAL_FRAMES];

int lookup_inverted(int pid, uint32_t vpn) {
    // Linear search (slow!)
    for (int i = 0; i < TOTAL_FRAMES; i++) {
        if (inverted_table[i].valid &&
            inverted_table[i].pid == pid &&
            inverted_table[i].vpn == vpn) {
            return i;  // Frame number
        }
    }
    return -1;  // Page fault
}
```

### Hash-Assisted Inverted Table

```c
// Use hash table for fast lookup
uint32_t hash_inv(int pid, uint32_t vpn) {
    return (pid ^ vpn) % HASH_SIZE;
}

typedef struct HashNode {
    int frame;
    struct HashNode* next;
} HashNode;

HashNode* hash_index[HASH_SIZE];

int lookup_fast(int pid, uint32_t vpn) {
    uint32_t index = hash_inv(pid, vpn);
    HashNode* node = hash_index[index];

    while (node != NULL) {
        int frame = node->frame;
        if (inverted_table[frame].pid == pid &&
            inverted_table[frame].vpn == vpn) {
            return frame;
        }
        node = node->next;
    }
    return -1;
}
```

### Inverted Table Drawbacks

1. **Sharing difficult**: Must search for each process's mapping
2. **Linear search slow**: Without hash, O(n) lookup
3. **Extra lookup**: Hash + verify = 2 memory accesses

## Comparison

```
Structure          | Size         | Lookup | Sharing
-------------------|--------------|--------|----------
Single-level       | O(V)         | O(1)   | Easy
Hierarchical       | O(used)      | O(L)   | Easy
Hashed             | O(used)      | O(1+)  | Easy
Inverted           | O(P)         | O(1+)  | Hard

V = virtual pages, P = physical frames, L = levels
```

## TLB and Page Tables

All structures benefit from TLB caching:

```
              Address
                 │
                 ↓
         ┌───────────────┐
         │  Check TLB    │
         └───────────────┘
           │           │
        Hit ↓         Miss ↓
           │             │
           │      ┌──────┴──────┐
           │      │ Walk page   │
           │      │ table       │
           │      └─────────────┘
           │             │
           │             ↓
           │      ┌─────────────┐
           │      │ Update TLB  │
           │      └─────────────┘
           │             │
           └─────────────┘
                   │
                   ↓
            Physical Address
```

## Summary

Page table structures trade space vs time:
- **Hierarchical**: Space-efficient for sparse spaces
- **Hashed**: Good for large, sparse address spaces
- **Inverted**: Minimal size but complex sharing
- Modern systems use multi-level hierarchical (x86-64: 4-5 levels)
- TLB makes any structure efficient in practice
- Linux uses flexible multi-level with huge page support
- Choice depends on address space size and usage pattern
