# Swapping

Swapping moves entire processes between main memory and disk. This subtopic covers swapping concepts, implementation, and modern swap systems.

## Swapping Concept

When memory is full, move processes to disk (backing store):

```
Main Memory                    Disk (Backing Store)
┌─────────────────┐           ┌─────────────────┐
│   Process A     │           │                 │
├─────────────────┤           │   Process D     │
│   Process B     │ ←──────── │   (swapped out) │
├─────────────────┤   swap    │                 │
│   Process C     │ ───────→  │   Process B     │
├─────────────────┤           │   (being saved) │
│   (Free)        │           │                 │
└─────────────────┘           └─────────────────┘
```

## Swap Operations

### Swap Out

Move process from memory to disk:

```c
void swap_out(Process* p) {
    // Choose process to swap out
    // (often idle or low-priority)

    // Save process memory to swap space
    size_t size = p->memory_size;
    disk_offset offset = allocate_swap_space(size);

    write_to_disk(offset, p->memory_base, size);

    // Update process state
    p->swapped = true;
    p->swap_location = offset;

    // Free memory
    free_memory(p->memory_base, size);

    // Mark process as not ready
    p->state = SWAPPED_OUT;
}
```

### Swap In

Bring process back from disk:

```c
void swap_in(Process* p) {
    // Allocate memory
    size_t size = p->memory_size;
    void* memory = allocate_memory(size);

    if (memory == NULL) {
        // No space - must swap out another process
        Process* victim = select_swap_victim();
        swap_out(victim);
        memory = allocate_memory(size);
    }

    // Load from disk
    read_from_disk(p->swap_location, memory, size);

    // Update process state
    p->memory_base = memory;
    p->swapped = false;

    // Free swap space
    free_swap_space(p->swap_location, size);

    // Mark process as ready
    p->state = READY;
}
```

## Swap Space Management

### Dedicated Swap Partition

```
Disk Layout:
┌─────────────────────────────────────────┐
│         Root Filesystem                 │
├─────────────────────────────────────────┤
│         Swap Partition                  │
│  ┌──────────────────────────────────┐  │
│  │ Slot 0 │ Slot 1 │ Slot 2 │ ...   │  │
│  └──────────────────────────────────┘  │
├─────────────────────────────────────────┤
│         Home Filesystem                 │
└─────────────────────────────────────────┘
```

### Swap File

```bash
# Create swap file on Linux
dd if=/dev/zero of=/swapfile bs=1M count=4096
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

### Swap Space Allocation

```c
#define SWAP_SLOT_SIZE PAGE_SIZE

typedef struct {
    bool allocated[MAX_SWAP_SLOTS];
    int free_count;
} SwapSpace;

int allocate_swap_slot(SwapSpace* ss) {
    for (int i = 0; i < MAX_SWAP_SLOTS; i++) {
        if (!ss->allocated[i]) {
            ss->allocated[i] = true;
            ss->free_count--;
            return i;
        }
    }
    return -1;  // Swap full
}

void free_swap_slot(SwapSpace* ss, int slot) {
    ss->allocated[slot] = false;
    ss->free_count++;
}
```

## Swap Time Calculation

```
Swap time = Transfer time + Seek time + Rotational latency

For 100MB process on HDD:
  Transfer: 100MB / 100MB/s = 1 second
  Seek: ~10ms (average)
  Rotational: ~5ms (average)

Total swap out: ~1 second
Total swap in: ~1 second
Round trip: ~2 seconds

This is why swapping is expensive!
```

## Swapping Policies

### When to Swap Out

```c
bool should_swap_out() {
    // Memory pressure
    if (free_memory() < LOW_THRESHOLD) {
        return true;
    }

    // Too many processes
    if (ready_process_count() > MAX_IN_MEMORY) {
        return true;
    }

    return false;
}
```

### Swap Out Victim Selection

```c
Process* select_swap_victim() {
    Process* best = NULL;
    int best_score = INT_MAX;

    for (Process* p = process_list; p != NULL; p = p->next) {
        if (p->state == BLOCKED || p->state == READY) {
            int score = calculate_swap_score(p);
            if (score < best_score) {
                best_score = score;
                best = p;
            }
        }
    }

    return best;
}

int calculate_swap_score(Process* p) {
    int score = 0;

    // Prefer to swap blocked processes
    if (p->state == BLOCKED) {
        score -= 1000;
    }

    // Prefer low priority
    score += p->priority * 10;

    // Prefer processes not recently used
    score += (current_time - p->last_run_time);

    // Consider size (larger = more expensive)
    score -= p->memory_size / 1024;

    return score;
}
```

### When to Swap In

```c
void scheduler() {
    Process* next = select_next_process();

    if (next->swapped) {
        // Must swap in before running
        swap_in(next);
    }

    run(next);
}

// Or proactive swap-in
void proactive_swap_in() {
    // Bring back processes that might run soon
    for (Process* p = swapped_list; p != NULL; p = p->next) {
        if (p->wait_time < EXPECTED_WAIT_THRESHOLD) {
            if (free_memory() > COMFORTABLE_THRESHOLD) {
                swap_in(p);
            }
        }
    }
}
```

## Standard Swapping vs Demand Paging

### Standard Swapping

```
Entire process swapped:
┌───────────────────────────────────────┐
│   Code │ Data │ Heap │ Stack │ All!  │
└───────────────────────────────────────┘
         ↓
    ┌──────────┐
    │   Disk   │
    └──────────┘

Expensive! Process can't run until fully loaded.
```

### Demand Paging (Modern Approach)

```
Only needed pages swapped:
┌────┬────┬────┬────┬────┬────┐
│ P0 │ P1 │ P2 │ P3 │ P4 │ P5 │
└────┴────┴────┴────┴────┴────┘
  ↓         ↓
  In        On
Memory     Disk

Finer granularity, load only what's needed.
```

## Linux Swap System

### Swap Areas

```c
// /proc/swaps shows swap areas
// Example output:
// Filename          Type        Size      Used   Priority
// /dev/sda2         partition   4194304   0      -2
// /swapfile         file        2097148   0      -3
```

### Swappiness

```bash
# Control how aggressively to swap
# 0 = avoid swapping, 100 = swap aggressively
cat /proc/sys/vm/swappiness
# Default: 60

# Set temporarily
echo 10 > /proc/sys/vm/swappiness

# Set permanently in /etc/sysctl.conf
vm.swappiness = 10
```

### OOM Killer

```c
// When swap is full and memory exhausted
// Linux kills processes to free memory

// View OOM score
// cat /proc/<pid>/oom_score

// Protect process from OOM killer
// echo -17 > /proc/<pid>/oom_adj  (old)
// echo -1000 > /proc/<pid>/oom_score_adj  (new)
```

## Swap Performance

### SSD vs HDD

```
HDD Swap:
  Sequential read: 100-200 MB/s
  Random read: 0.5-1 MB/s
  Seek time: 5-10ms

SSD Swap:
  Sequential read: 500-3000 MB/s
  Random read: 200-500 MB/s
  No seek time

SSD is much better for swap!
```

### ZRAM (Compressed RAM)

```bash
# Compressed swap in RAM
# Faster than disk, trades CPU for I/O

# Enable zram
modprobe zram
echo lz4 > /sys/block/zram0/comp_algorithm
echo 4G > /sys/block/zram0/disksize
mkswap /dev/zram0
swapon /dev/zram0

# Typical compression: 2-3x
# 4GB zram can hold 8-12GB of swap data
```

## Mobile Device Swapping

### Android

```
No traditional swap (flash wear)
Uses:
- zram for compressed swap
- App killing instead of swapping
- Low Memory Killer (LMK)
```

### iOS

```
No swap at all
Aggressive app termination
Compressed memory
```

## Thrashing Preview

When too much swapping occurs:

```
CPU Utilization
     │
100% │
     │        ╱╲
     │       ╱  ╲
     │      ╱    ╲
     │     ╱      ╲
     │    ╱        ╲╲
     │   ╱          ╲╲
     │  ╱            ╲╲
     │ ╱              ╲╲
  0% │╱                ╲╲
     └──────────────────────────────
         Degree of Multiprogramming

Too many processes → constant swapping → thrashing
```

## Summary

Swapping manages memory overcommitment:
- Moves entire processes to/from disk
- Expensive due to disk I/O
- Swap space can be partition or file
- Victim selection balances fairness and efficiency
- Modern systems prefer demand paging
- Linux provides swappiness tuning
- SSD and zram improve swap performance
- Mobile devices avoid traditional swap
- Excessive swapping causes thrashing
