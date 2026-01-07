# Virtual Memory and File Systems

How can a computer with 8GB of RAM run programs that need 16GB? How does your filesystem magically store billions of files? In this topic, you'll learn how virtual memory creates the illusion of unlimited RAM, and how file systems organize persistent storage.

**Learning Objectives:**
- Explain demand paging and handle page faults
- Implement and compare page replacement algorithms (FIFO, LRU, Clock)
- Calculate page fault rates and analyze working sets
- Detect and prevent thrashing
- Design file system structures and allocation methods
- Implement directory structures and free space management

---

## Virtual Memory

### The Big Idea

Virtual memory separates logical memory from physical memory, allowing:
- Programs larger than physical RAM to run
- More processes to run concurrently
- Memory protection between processes
- Efficient memory sharing

```
┌─────────────────────────────────────────────────────────┐
│                  Virtual Address Space                   │
│    (Process thinks it has all this memory)              │
├─────────────────────────────────────────────────────────┤
│ Page 0 │ Page 1 │ Page 2 │ Page 3 │ ... │ Page N       │
└────┬────┴────┬───┴────┬───┴────────┴─────┴──────────────┘
     │         │        │
     ↓         ↓        ↓
┌────────┐ ┌────────┐  ┌─────────────────────┐
│Frame 5 │ │Frame 2 │  │ Disk (swap space)   │
│ (RAM)  │ │ (RAM)  │  │ (not in RAM yet)    │
└────────┘ └────────┘  └─────────────────────┘
```

### Demand Paging

Load pages into memory only when needed, not in advance:

```
┌────────────────────────────────────────────────────────┐
│  Page Table Entry                                       │
├───────────────┬───────────┬─────────────────────────────┤
│ Frame Number  │  Valid=1  │  Page is in physical memory │
├───────────────┼───────────┼─────────────────────────────┤
│ Disk Location │  Valid=0  │  Page is on disk (swap)     │
└───────────────┴───────────┴─────────────────────────────┘
```

**Benefits:**
- Faster process startup (load only what's needed)
- More processes can run (each uses less RAM)
- Programs can exceed physical memory size

### Page Fault Handling

When a process accesses a page not in memory:

```
1. CPU generates memory access
2. MMU checks page table → Valid bit = 0
3. Page fault exception raised
4. OS page fault handler:
   a. Find free frame (or evict one)
   b. Read page from disk into frame
   c. Update page table (frame #, valid=1)
   d. Restart the instruction
5. Process continues, unaware of the fault
```

```c
void page_fault_handler(uint32_t faulting_address) {
    uint32_t page_num = faulting_address / PAGE_SIZE;
    PageTableEntry* pte = get_page_table_entry(page_num);

    // Find a free frame
    int frame = get_free_frame();
    if (frame == -1) {
        frame = select_victim_page();
        if (page_table[victim].dirty) {
            write_to_disk(victim);  // Save modified page
        }
    }

    // Load page from disk
    read_from_disk(page_num, frame);

    // Update page table
    pte->frame_number = frame;
    pte->valid = 1;

    // Resume process (restart faulting instruction)
}
```

### Effective Access Time

```
Page fault rate: p (0 ≤ p ≤ 1)
Memory access time: 100ns
Page fault service time: 8ms (disk I/O)

EAT = (1 - p) × 100ns + p × 8,000,000ns

If p = 0.001 (1 fault per 1000 accesses):
EAT = 0.999 × 100 + 0.001 × 8,000,000
    = 99.9 + 8,000
    = 8,099.9ns (80× slower than no faults!)

For < 10% slowdown (EAT < 110ns):
(1 - p) × 100 + p × 8,000,000 < 110
p < 10 / 7,999,900
p < 0.00000125 (less than 1 fault per 800,000 accesses!)
```

---

## Page Replacement Algorithms

When all frames are in use, which page should be evicted?

### FIFO (First-In, First-Out)

Replace the oldest page:

```c
int fifo_replacement(Queue* page_queue) {
    int victim = dequeue(page_queue);
    return victim;
}

// On page load:
enqueue(page_queue, new_page);
```

**Example:**
```
Reference string: 7, 0, 1, 2, 0, 3, 0, 4
Frames: 3

Step  Reference  Frames         Fault?
1     7          [7, -, -]      Yes
2     0          [7, 0, -]      Yes
3     1          [7, 0, 1]      Yes
4     2          [2, 0, 1]      Yes (7 replaced, oldest)
5     0          [2, 0, 1]      No  (0 already in)
6     3          [2, 3, 1]      Yes (0 replaced)
7     0          [2, 3, 0]      Yes (1 replaced)
8     4          [4, 3, 0]      Yes (2 replaced)

Total faults: 7
```

**Belady's Anomaly:** FIFO can have more faults with more frames!

### Optimal (OPT)

Replace the page that won't be used for the longest time (theoretical best):

```c
int optimal_replacement(int* future_refs, int current_pos) {
    int victim = -1;
    int farthest_use = -1;

    for (int frame = 0; frame < num_frames; frame++) {
        int next_use = find_next_use(pages[frame], future_refs, current_pos);
        if (next_use == NEVER) return frame;
        if (next_use > farthest_use) {
            farthest_use = next_use;
            victim = frame;
        }
    }
    return victim;
}
```

**Not implementable** (requires future knowledge), but useful as a benchmark.

### LRU (Least Recently Used)

Replace the page that hasn't been used for the longest time:

```c
// Counter-based implementation
typedef struct {
    int page_number;
    uint64_t last_access_time;
} FrameEntry;

int lru_replacement() {
    int victim = 0;
    uint64_t oldest = frames[0].last_access_time;

    for (int i = 1; i < num_frames; i++) {
        if (frames[i].last_access_time < oldest) {
            oldest = frames[i].last_access_time;
            victim = i;
        }
    }
    return victim;
}

// On each memory access:
frames[accessed_frame].last_access_time = current_time++;
```

**Problem:** Maintaining exact LRU is expensive. Solutions:
- Hardware counter per page (expensive)
- Stack of page numbers (expensive updates)
- Approximations (next section)

### Clock Algorithm (Second Chance)

LRU approximation using a reference bit:

```
Frames arranged in circular buffer with a "clock hand"

┌───┐
│ 0 │→ Page A, ref=1
├───┤
│ 1 │→ Page B, ref=0  ← Clock hand points here
├───┤
│ 2 │→ Page C, ref=1
├───┤
│ 3 │→ Page D, ref=1
└───┘

On replacement:
1. Check frame at clock hand
2. If ref=1: set ref=0, advance hand, repeat
3. If ref=0: evict this page
```

```c
int clock_replacement() {
    while (true) {
        if (frames[clock_hand].reference_bit == 0) {
            int victim = clock_hand;
            clock_hand = (clock_hand + 1) % num_frames;
            return victim;
        }
        frames[clock_hand].reference_bit = 0;  // Second chance
        clock_hand = (clock_hand + 1) % num_frames;
    }
}

// On page access (done by hardware):
frames[accessed_frame].reference_bit = 1;
```

### Enhanced Clock (NRU)

Use both reference (R) and modified (M) bits:

```
Priority for replacement:
1. (R=0, M=0) - Not used, not modified (best victim)
2. (R=0, M=1) - Not used, modified
3. (R=1, M=0) - Used, not modified
4. (R=1, M=1) - Used, modified (worst victim)
```

---

## Working Set and Thrashing

### Working Set Model

The **working set** is the set of pages a process is actively using:

```
W(t, Δ) = set of pages referenced in time interval [t-Δ, t]

Process 1: Working set = {A, B, C, D}     needs 4 frames
Process 2: Working set = {X, Y}           needs 2 frames
Process 3: Working set = {P, Q, R}        needs 3 frames

Total working set = 9 frames
If physical memory < 9 frames → thrashing
```

### Thrashing

Thrashing occurs when the system spends more time paging than executing:

```
CPU Utilization
     ^
     │         ┌────── Thrashing begins
     │        /│
     │       / │
     │      /  │\
     │     /   │ \
     │    /    │  \────────
     │   /     │
     │  /      │
     └─/───────┴──────────────→ Degree of Multiprogramming
```

**Causes:**
- Too many processes for available memory
- Each process's working set can't fit in allocated frames

**Detection:**
```c
if (page_fault_rate > UPPER_THRESHOLD) {
    // Allocate more frames to this process
    // Or suspend some processes
}
if (page_fault_rate < LOWER_THRESHOLD) {
    // Can reduce frames for this process
    // Or add more processes
}
```

**Prevention:**
- Working set model: Only run processes whose working sets fit
- Page fault frequency: Dynamically adjust frame allocation

---

## File Systems

### File Concepts

A **file** is a named collection of related information stored on secondary storage.

```c
struct file_attributes {
    char name[MAX_NAME];
    enum { REGULAR, DIRECTORY, DEVICE } type;
    uint64_t size;
    uint32_t permissions;  // rwxrwxrwx
    uint32_t owner_uid;
    uint32_t group_gid;
    time_t created;
    time_t modified;
    time_t accessed;
    uint64_t first_block;  // Location on disk
};
```

### File Operations

```c
// Create and write
int fd = open("file.txt", O_CREAT | O_WRONLY, 0644);
write(fd, buffer, size);
close(fd);

// Read
int fd = open("file.txt", O_RDONLY);
read(fd, buffer, size);
lseek(fd, offset, SEEK_SET);  // Random access
close(fd);
```

### Directory Structure

```
Single-Level:        Two-Level:           Tree (Hierarchical):
┌───────────┐       ┌───────────┐        ┌───────────┐
│ All files │       │   Users   │        │     /     │
│ in one    │       ├─────┬─────┤        ├─────┬─────┤
│ directory │       │UserA│UserB│        │ home│ etc │
└───────────┘       │files│files│        │┌───┐│     │
                    └─────┴─────┘        ││usr││     │
                                         │└───┘│     │
                                         └─────┴─────┘
```

### File Allocation Methods

**1. Contiguous Allocation:**
```
┌─────────────────────────────────────────────┐
│  File A  │     File B     │    Free    │ C │
└─────────────────────────────────────────────┘
Block 0-2      Block 3-6      Block 7-9   10

Directory entry: (start block, length)
+ Fast sequential and random access
- External fragmentation
- File size must be known at creation
```

**2. Linked Allocation:**
```
File A: Block 2 → Block 5 → Block 8 → Block 11 → NULL

┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│   │   │ A │   │   │ A │   │   │ A │   │   │ A │
│   │   │→5 │   │   │→8 │   │   │→11│   │   │END│
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
  0   1   2   3   4   5   6   7   8   9  10  11

+ No external fragmentation
+ Files can grow easily
- Slow random access (must traverse links)
- Pointer overhead in each block
```

**3. Indexed Allocation:**
```
File A: Index block at block 5
┌───────────────┐
│ Index Block 5 │
├───────────────┤
│ ptr[0] → 2    │
│ ptr[1] → 8    │
│ ptr[2] → 11   │
│ ptr[3] → 15   │
│ ...           │
└───────────────┘

+ Fast random access
+ No external fragmentation
- Index block overhead
- Limited file size (limited pointers in index)
```

### Unix Inode Structure

Combines direct and indirect pointers for efficiency:

```
┌─────────────────────────────────────┐
│              Inode                   │
├─────────────────────────────────────┤
│ mode, uid, gid, size, timestamps    │
├─────────────────────────────────────┤
│ direct[0]  → block 100              │
│ direct[1]  → block 245              │
│ ...        (12 direct pointers)     │
│ direct[11] → block 892              │
├─────────────────────────────────────┤
│ indirect   → index block → data     │
├─────────────────────────────────────┤
│ double     → index → index → data   │
├─────────────────────────────────────┤
│ triple     → index → index → index  │
└─────────────────────────────────────┘

Small files: Direct pointers only (fast)
Large files: Use indirect pointers
```

### Free Space Management

**Bit Vector (Bitmap):**
```
Block 0123456789...
      1100110010...

1 = free, 0 = allocated

+ Fast to find contiguous blocks
- Large for big disks (1TB / 4KB = 32MB bitmap)
```

**Linked List:**
```
Free list head → Block 3 → Block 5 → Block 9 → NULL

+ No extra space when disk is full
- Slow to find contiguous blocks
```

---

## Common Calculations

### Page Fault Rate

```
Given:
- Reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5
- 3 frames, LRU replacement

Trace:
Ref: 1  Frames: [1,-,-]     Fault
Ref: 2  Frames: [1,2,-]     Fault
Ref: 3  Frames: [1,2,3]     Fault
Ref: 4  Frames: [4,2,3]     Fault (1 is LRU)
Ref: 1  Frames: [4,1,3]     Fault (2 is LRU)
Ref: 2  Frames: [4,1,2]     Fault (3 is LRU)
Ref: 5  Frames: [5,1,2]     Fault (4 is LRU)
Ref: 1  Frames: [5,1,2]     Hit
Ref: 2  Frames: [5,1,2]     Hit
Ref: 3  Frames: [3,1,2]     Fault (5 is LRU)
Ref: 4  Frames: [3,4,2]     Fault (1 is LRU)
Ref: 5  Frames: [3,4,5]     Fault (2 is LRU)

Faults: 10, References: 12
Fault rate: 10/12 = 83%
```

### Disk Block Calculations

```
Given:
- Block size: 4KB
- Block pointer: 4 bytes
- 12 direct, 1 single, 1 double, 1 triple indirect

Blocks per index block: 4KB / 4 = 1024

Maximum file size:
Direct:    12 × 4KB = 48KB
Single:    1024 × 4KB = 4MB
Double:    1024² × 4KB = 4GB
Triple:    1024³ × 4KB = 4TB

Total: ~4TB (limited by 32-bit block numbers)
```

---

## Summary

You've learned how operating systems extend memory and manage files:

**Virtual Memory:**
- **Demand Paging**: Load pages only when accessed
- **Page Faults**: Trigger when accessing non-resident pages
- **Replacement Algorithms**: FIFO, LRU, Clock balance simplicity and performance
- **Working Set**: Pages actively used by a process
- **Thrashing**: Excessive paging that kills performance

**File Systems:**
- **Allocation Methods**: Contiguous (fast), linked (flexible), indexed (balanced)
- **Inode Structure**: Direct + indirect pointers for all file sizes
- **Free Space**: Bitmaps (fast search) or linked lists (space efficient)

**Key takeaways:**
- Virtual memory makes RAM seem unlimited but disk I/O is 10,000× slower
- LRU is ideal but Clock approximates it cheaply
- Unix inodes are elegant: fast for small files, support huge files
- Free space management trades speed vs. space overhead

---

## Further Exploration

Ready to go deeper? Explore:
- Copy-on-write file systems (ZFS, Btrfs)
- Memory-mapped files (mmap)
- Page cache and buffer cache
- Journaling file systems for crash recovery
- RAID levels for redundancy and performance
