# Virtual Memory and Caches

Caches must work together with virtual memory—a system that provides each process with its own address space and enables memory protection. The interaction between virtual addresses, physical addresses, and caching creates important design decisions that affect performance.

## Virtual Memory Basics

### Address Translation

Programs use **virtual addresses**; memory uses **physical addresses**:

```
Virtual Address (CPU generates)
         │
         ▼
    ┌─────────┐
    │   MMU   │  ◄── Memory Management Unit
    │ (TLB +  │
    │  Page   │
    │ Tables) │
    └────┬────┘
         │
         ▼
Physical Address (sent to memory/cache)
```

### Page-Based Translation

Memory divided into fixed-size **pages** (typically 4KB):

```
Virtual Address:
┌─────────────────────────┬──────────────────┐
│   Virtual Page Number   │   Page Offset    │
│        (VPN)            │                  │
└─────────────────────────┴──────────────────┘
           │                       │
           ▼                       │
    ┌──────────────┐               │
    │  Page Table  │               │
    │    Lookup    │               │
    └──────┬───────┘               │
           │                       │
           ▼                       ▼
┌─────────────────────────┬──────────────────┐
│  Physical Frame Number  │   Page Offset    │
│        (PFN)            │  (unchanged)     │
└─────────────────────────┴──────────────────┘
Physical Address
```

### Translation Lookaside Buffer (TLB)

Page table in memory is slow—cache translations in TLB:

```
Virtual Address
      │
      ▼
┌───────────────────────────────────────────┐
│              TLB (fast)                    │
│  VPN → PFN mappings, 32-1024 entries      │
├───────────────┬───────────────────────────┤
│ VPN    │ PFN  │ Valid │ Prot │ ASID │ ... │
├────────┼──────┼───────┼──────┼──────┼─────┤
│ 0x1234 │ 0x5A │   1   │ RWX  │  3   │     │
│ 0x1235 │ 0x7F │   1   │ R-X  │  3   │     │
└────────┴──────┴───────┴──────┴──────┴─────┘
      │
      │ Hit: Use PFN directly
      │ Miss: Walk page table, update TLB
      ▼
Physical Address
```

**TLB hit**: Translation in 1-2 cycles.
**TLB miss**: Page table walk, 10-100+ cycles.

## Cache Indexing and Tagging

### The Challenge

When should address translation happen relative to cache access?

**Options**:
1. Virtually Indexed, Virtually Tagged (VIVT)
2. Physically Indexed, Physically Tagged (PIPT)
3. Virtually Indexed, Physically Tagged (VIPT)

### VIVT (Virtual-Virtual)

Cache uses virtual addresses for both index and tag:

```
Virtual Address → [Index | Tag]
                     │
                     ▼
              Cache Lookup
                     │
                     ▼
                   Data
```

**Advantages**:
- No translation needed before cache access
- Fastest cache hit path

**Disadvantages**:
- **Aliasing**: Same physical page mapped to different virtual addresses
- **Context switch**: Must flush cache or tag with process ID
- **Coherence**: Hard to maintain across processes

Rarely used in modern systems.

### PIPT (Physical-Physical)

Cache uses physical address for both index and tag:

```
Virtual Address
       │
       ▼
   ┌───────┐
   │  TLB  │  ← Must complete first!
   └───┬───┘
       │
       ▼
Physical Address → [Index | Tag]
                       │
                       ▼
                 Cache Lookup
```

**Advantages**:
- No aliasing problems
- No flush on context switch
- Simple coherence

**Disadvantages**:
- TLB lookup on critical path
- Adds latency to every cache access

Common for L2/L3 caches where latency is less critical.

### VIPT (Virtual-Physical) — Best of Both

Use virtual address for index, physical address for tag:

```
Virtual Address: [VPN | Index | Offset]
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
     Cache Index                    TLB Lookup
     (immediate)                   (in parallel)
            │                             │
            │                             │
            ▼                             ▼
     Read All Ways               Physical Frame
      in Set                          │
            │                         │
            └──────────┬──────────────┘
                       │
                  Tag Compare
                  (Physical)
```

**Key insight**: If index bits come entirely from page offset (which doesn't change), we can access cache and TLB in parallel.

**Constraint**: Cache size / associativity ≤ page size

```
Example: 4KB pages, 32KB 8-way cache
- 32KB / 8 ways = 4KB per way
- Index bits fit within 12-bit page offset ✓
```

**Advantages**:
- Cache access starts immediately (parallel with TLB)
- Physical tags avoid aliasing
- No flush needed on context switch

VIPT is standard for modern L1 caches.

## Aliasing Problem

### What is Aliasing?

Two virtual addresses mapping to same physical address:

```
Process A: VA 0x1000 → PA 0x5000
Process B: VA 0x2000 → PA 0x5000 (shared memory)
```

With VIVT cache:
```
Cache line 0x10: Data from VA 0x1000
Cache line 0x20: Data from VA 0x2000
Both are same physical data—inconsistency!
```

### Solutions

1. **PIPT**: Use physical addresses—no aliasing possible
2. **VIPT with small cache**: Index bits in page offset—same index for aliases
3. **Software management**: OS ensures aliases use same cache colors
4. **Hardware detection**: Check for aliases on miss

## Context Switches and Caches

### Process Isolation

Each process has its own virtual address space:

```
Process A: VA 0x1000 → PA 0x5000
Process B: VA 0x1000 → PA 0x8000 (different physical!)
```

### TLB Management

On context switch, TLB entries from old process are invalid:

**Option 1**: Flush TLB
```
Context switch → Clear all TLB entries
New process starts with empty TLB (cold misses)
```

**Option 2**: Address Space ID (ASID)
```
TLB Entry: [ASID | VPN | PFN | ...]

Process A (ASID 3): 0x1000 → 0x5000
Process B (ASID 7): 0x1000 → 0x8000

Both can coexist—match ASID with current process
```

ASID avoids TLB flush overhead.

### Cache Management

With PIPT or VIPT caches, physical tags ensure correctness:
- Different processes have different physical pages
- Cache entries naturally distinguished

With VIVT caches:
- Must flush or use process tags
- Rarely used in modern systems

## TLB Design

### TLB Structure

Typically fully associative (32-512 entries):

```
┌────────────────────────────────────────────────────────────┐
│                         TLB                                 │
├──────┬──────┬───────┬──────┬──────┬───────┬───────────────┤
│ ASID │ VPN  │  PFN  │ Valid│ Prot │ Global│    Other      │
├──────┼──────┼───────┼──────┼──────┼───────┼───────────────┤
│  3   │0x1234│ 0x5A  │  1   │ RWX  │   0   │ Dirty, Age... │
│  3   │0x1235│ 0x7F  │  1   │ R--  │   0   │               │
│  0   │0x0000│ 0x01  │  1   │ R-X  │   1   │ (kernel page) │
└──────┴──────┴───────┴──────┴──────┴───────┴───────────────┘
```

**Global bit**: Kernel pages shared across all processes (don't check ASID).

### Multi-Level TLBs

Like caches, TLBs have multiple levels:

```
        ┌──────────────────┐
        │    L1 I-TLB      │  8-64 entries, 1 cycle
        │    L1 D-TLB      │  8-64 entries, 1 cycle
        └────────┬─────────┘
                 │ Miss
                 ▼
        ┌──────────────────┐
        │     L2 TLB       │  256-2048 entries, ~5 cycles
        │   (unified)      │
        └────────┬─────────┘
                 │ Miss
                 ▼
        ┌──────────────────┐
        │   Page Table     │  Memory walk, 10-100+ cycles
        │     Walk         │
        └──────────────────┘
```

### Page Table Walks

On TLB miss, hardware or software walks page table:

```
x86 4-level page table:

Virtual Address → PML4 → PDPT → PD → PT → Physical Frame
                   │       │      │     │
                   └───────┴──────┴─────┘
                     4 memory accesses!
```

**Page walk caches**: Cache intermediate page table entries.

## Putting It All Together

### Modern Cache/TLB Access

```
CPU generates Virtual Address
              │
    ┌─────────┴─────────┐
    │                   │
    ▼                   ▼
┌───────┐         ┌──────────┐
│  TLB  │         │ L1 Cache │
│Lookup │         │  (VIPT)  │
└───┬───┘         └────┬─────┘
    │                  │
    │ Physical         │ Tag + Data
    │ Address          │
    │                  │
    └────────┬─────────┘
             │
        Tag Compare
             │
        ┌────┴────┐
        │         │
       Hit      Miss
        │         │
        ▼         ▼
    Return    Check L2
     Data     (PIPT)
```

### Example: Intel Core

| Component | Size | Associativity | Translation |
|-----------|------|---------------|-------------|
| L1 I-TLB | 128 entries | 8-way | - |
| L1 D-TLB | 64 entries | 4-way | - |
| L2 TLB | 2048 entries | 16-way | - |
| L1 I-Cache | 32KB | 8-way | VIPT |
| L1 D-Cache | 48KB | 12-way | VIPT |
| L2 Cache | 1.25MB | 10-way | PIPT |
| L3 Cache | 30MB | 12-way | PIPT |

## Performance Impact

### TLB Miss Costs

```
TLB hit: ~1 cycle
L2 TLB hit: ~5 cycles
Page walk (all cached): ~30 cycles
Page walk (some miss): ~100+ cycles
Page fault: ~millions of cycles (disk)
```

### Optimizing for TLB

**Use huge pages**: 2MB or 1GB pages = fewer TLB entries needed.

```
4KB pages: 512 TLB entries = 2MB coverage
2MB pages: 512 TLB entries = 1GB coverage!
```

**Improve locality**: Sequential access = fewer unique pages.

## Key Takeaways

- Virtual memory provides isolation and protection
- TLB caches virtual-to-physical translations
- VIPT caches allow parallel TLB and cache lookup
- PIPT caches eliminate aliasing but add latency
- ASID avoids TLB flush on context switch
- Multi-level TLBs reduce translation miss penalty
- Page walks can cost 10-100+ cycles
- Huge pages improve TLB coverage
- Cache and TLB design are closely coupled
- L1 typically VIPT, L2/L3 typically PIPT

