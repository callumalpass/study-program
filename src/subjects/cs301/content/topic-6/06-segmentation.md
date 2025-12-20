---
id: cs301-t6-segmentation
title: "Segmentation"
order: 6
---

# Segmentation

Segmentation is a memory management scheme that divides memory into variable-length segments. This subtopic covers segmentation concepts, segment tables, and segmentation with paging.

## Segmentation Concept

Memory divided into logical units called segments:
- Code segment
- Data segment
- Stack segment
- Heap segment

```
Programmer's view:
┌─────────────────────────┐
│  main() code            │  Segment 0: Code
├─────────────────────────┤
│  Global variables       │  Segment 1: Data
├─────────────────────────┤
│  malloc'd memory        │  Segment 2: Heap
├─────────────────────────┤
│  Local variables        │  Segment 3: Stack
├─────────────────────────┤
│  Shared library         │  Segment 4: Shared
└─────────────────────────┘

Each segment has meaningful purpose!
```

## Segmentation vs Paging

| Aspect | Paging | Segmentation |
|--------|--------|--------------|
| Unit | Fixed-size page | Variable-size segment |
| View | Physical (frames) | Logical (code, data) |
| Programmer aware | No | Yes |
| Fragmentation | Internal | External |
| Sharing | By page | By segment (natural) |
| Protection | Per page | Per segment |

## Logical Address in Segmentation

```
┌──────────────────┬──────────────────────────┐
│ Segment Number   │    Offset within Segment │
│   (s bits)       │       (d bits)           │
└──────────────────┴──────────────────────────┘

Example: 16-bit segment, 16-bit offset
         → 2^16 segments × 2^16 bytes each
```

## Segment Table

```c
typedef struct {
    uint32_t base;      // Starting address
    uint32_t limit;     // Segment length
    uint16_t permissions; // R/W/X
    bool present;       // In memory?
} SegmentDescriptor;

typedef struct {
    SegmentDescriptor entries[MAX_SEGMENTS];
    int count;
} SegmentTable;
```

### Segment Table Entry

```
┌──────────────────────────────────────────────┐
│ Base Address │ Limit │ P │ Perm │ Reserved   │
├──────────────┼───────┼───┼──────┼────────────┤
│   32 bits    │ 20bit │ 1 │  3   │    8       │
└──────────────────────────────────────────────┘

Base: Starting physical address
Limit: Segment size
P: Present in memory
Perm: Read/Write/Execute permissions
```

## Address Translation

```
Logical Address:
┌─────────────┬─────────────────────┐
│ Segment (s) │     Offset (d)      │
└─────────────┴─────────────────────┘
       │
       ↓
┌─────────────────────────────────────┐
│        Segment Table                │
│  ┌───────────────────────────────┐ │
│  │ Entry[s]: base, limit, perms  │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
       │
       ↓
   Check: d < limit?
       │
       ├─── No ──→ Trap (Segmentation Fault)
       │
       ↓ Yes
Physical Address = base + d
```

### Implementation

```c
uint32_t translate_segment(uint16_t segment, uint16_t offset,
                          SegmentTable* st) {
    // Check segment number valid
    if (segment >= st->count) {
        trap(SEGMENT_FAULT);
    }

    SegmentDescriptor* seg = &st->entries[segment];

    // Check present
    if (!seg->present) {
        trap(SEGMENT_NOT_PRESENT);
    }

    // Check offset within limit
    if (offset >= seg->limit) {
        trap(SEGMENTATION_FAULT);
    }

    // Check permissions (during access)
    check_permissions(seg, access_type);

    // Compute physical address
    return seg->base + offset;
}
```

## Segmentation Example

```
Process segments:

Segment Table:
┌─────────┬────────┬───────┬───────┐
│ Segment │  Base  │ Limit │ Perms │
├─────────┼────────┼───────┼───────┤
│    0    │ 0x1000 │ 2000  │  RX   │  Code
│    1    │ 0x4000 │ 1500  │  RW   │  Data
│    2    │ 0x6000 │ 4000  │  RW   │  Heap
│    3    │ 0x8000 │ 1000  │  RW   │  Stack
└─────────┴────────┴───────┴───────┘

Address (2, 500):  Segment 2, Offset 500
  Base = 0x6000
  Limit = 4000, 500 < 4000 ✓
  Physical = 0x6000 + 500 = 0x61F4

Address (1, 2000): Segment 1, Offset 2000
  Limit = 1500, 2000 > 1500 ✗
  → SEGMENTATION FAULT!
```

## Protection and Sharing

### Per-Segment Protection

```c
typedef enum {
    SEG_READ = 0x1,
    SEG_WRITE = 0x2,
    SEG_EXECUTE = 0x4
} SegmentPermission;

void check_permissions(SegmentDescriptor* seg, AccessType type) {
    switch (type) {
        case READ:
            if (!(seg->permissions & SEG_READ)) {
                trap(PROTECTION_FAULT);
            }
            break;
        case WRITE:
            if (!(seg->permissions & SEG_WRITE)) {
                trap(PROTECTION_FAULT);
            }
            break;
        case EXECUTE:
            if (!(seg->permissions & SEG_EXECUTE)) {
                trap(PROTECTION_FAULT);
            }
            break;
    }
}
```

### Segment Sharing

```
Process A:                    Process B:
Segment Table:               Segment Table:
┌─────┬───────┐              ┌─────┬───────┐
│  0  │ 0x1000│──────┐      │  0  │ 0x1000│──────┐
│  1  │ 0x3000│      │      │  1  │ 0x5000│      │
│  2  │ 0x4000│      │      │  2  │ 0x7000│      │
└─────┴───────┘      │      └─────┴───────┘      │
                     │                           │
                     └───────────┬───────────────┘
                                 │
                                 ↓
                    Physical Memory (Shared Code)
                          ┌───────────┐
                          │  0x1000   │  Same physical location
                          │  Code     │
                          └───────────┘
```

## x86 Segmentation

### Segment Registers

```
CS: Code Segment
DS: Data Segment
SS: Stack Segment
ES, FS, GS: Extra segments
```

### Protected Mode Segments

```c
// x86 Segment Descriptor (64 bits)
struct SegmentDescriptor {
    uint16_t limit_low;      // Bits 0-15 of limit
    uint16_t base_low;       // Bits 0-15 of base
    uint8_t  base_middle;    // Bits 16-23 of base
    uint8_t  access;         // Access byte
    uint8_t  granularity;    // Flags + limit bits 16-19
    uint8_t  base_high;      // Bits 24-31 of base
};

// Access byte:
// P (1): Present
// DPL (2): Privilege level (0-3)
// S (1): System/Code-Data
// Type (4): Segment type
```

### Modern x86-64

In 64-bit mode, segmentation is mostly disabled:
- CS, DS, ES, SS bases are 0
- FS, GS still usable (thread-local storage)
- Flat memory model with paging

```c
// Linux uses FS for thread-local storage
// Access __thread variables through FS base

__thread int my_tls_var;  // Uses FS segment
```

## Segmentation with Paging

Combine both schemes for best of both worlds:

```
Logical Address
┌─────────┬───────────────────────────────┐
│ Segment │           Offset               │
└─────────┴───────────────────────────────┘
     │
     ↓
Segment Table
     │
     ↓
Linear Address (within segment's address space)
┌──────────────────────┬──────────────┐
│     Page Number      │ Page Offset  │
└──────────────────────┴──────────────┘
     │
     ↓
Page Table
     │
     ↓
Physical Address
```

### Intel Implementation

```
                    Logical Address
                          │
                   ┌──────┴──────┐
                   │   Segment   │
                   │   Selector  │
                   └──────┬──────┘
                          │
           ┌──────────────┴──────────────┐
           │    Segmentation Unit        │
           │    (Segment Translation)    │
           └──────────────┬──────────────┘
                          │
                   Linear Address
                          │
           ┌──────────────┴──────────────┐
           │      Paging Unit            │
           │    (Page Translation)       │
           └──────────────┬──────────────┘
                          │
                   Physical Address
```

## External Fragmentation

Segmentation suffers from external fragmentation:

```
Memory after several allocations/deallocations:
┌─────────────────────┐
│   Segment A (10KB)  │
├─────────────────────┤
│   Free (5KB)        │
├─────────────────────┤
│   Segment B (20KB)  │
├─────────────────────┤
│   Free (8KB)        │
├─────────────────────┤
│   Segment C (15KB)  │
├─────────────────────┤
│   Free (12KB)       │
└─────────────────────┘

Can't allocate 20KB segment even though 25KB free!
```

### Solutions

1. **Compaction**: Move segments to consolidate free space
2. **Best fit allocation**: Minimize fragmentation
3. **Combine with paging**: Let pages handle physical allocation

## Advantages and Disadvantages

### Advantages

1. **Natural protection**: Each segment has permissions
2. **Natural sharing**: Share code/library segments
3. **Meaningful units**: Programmer-visible segments
4. **Variable-size**: Segments match actual needs
5. **Growth**: Segments can grow independently

### Disadvantages

1. **External fragmentation**: Compaction needed
2. **Complex allocation**: Variable-size allocation
3. **Segment table size**: One entry per segment
4. **Limited address space**: Segment + offset limits

## Summary

Segmentation provides logical memory division:
- Variable-size segments match program structure
- Natural protection (code read-only, stack read-write)
- Easy sharing of code and libraries
- External fragmentation is main drawback
- x86 uses segmentation in protected mode
- Modern x86-64 uses flat model (paging only)
- Can combine with paging for best results
- Less common than paging in modern systems
