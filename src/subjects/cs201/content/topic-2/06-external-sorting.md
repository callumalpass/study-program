---
id: cs201-t2-external
title: "External Sorting"
order: 6
---

# External Sorting

The algorithms we've studied assume data fits in memory, but real-world datasets routinely exceed available RAM. Sorting a terabyte of log files, processing satellite imagery, or building database indexes all require external sorting—algorithms designed for data that lives primarily on disk. The fundamental challenge shifts from minimizing comparisons to minimizing I/O operations, since disk access is roughly 100,000 times slower than memory access.

External sorting algorithms exploit a key insight: sequential disk access is vastly faster than random access. A hard drive that requires 10 milliseconds to seek to a random location can transfer megabytes per second once positioned. External merge sort capitalizes on this by organizing work into sequential passes over the data. First, we sort chunks that fit in memory and write them as "runs" to disk. Then we merge runs together, reading and writing sequentially. The total I/O is proportional to the data size times the logarithm of the number of runs—often just two or three full passes through the data.

Understanding external sorting illuminates the broader principle of algorithm design for memory hierarchies. The same principles apply to cache-efficient algorithms that minimize cache misses, to out-of-core algorithms for GPU programming, and to distributed sorting across clusters. The I/O model of computation, which counts block transfers rather than individual operations, provides theoretical foundation for analyzing these algorithms.

## The Memory Hierarchy Problem

| Storage Level | Access Time | Size |
|--------------|-------------|------|
| L1 Cache | 1 ns | 64 KB |
| L2 Cache | 4 ns | 256 KB |
| RAM | 100 ns | 16 GB |
| SSD | 100 μs | 1 TB |
| HDD | 10 ms | 10 TB |

Disk is ~100,000× slower than RAM. Minimizing disk accesses is critical.

## I/O Model

Define complexity in terms of I/O operations, not comparisons.

**Parameters**:
- N = number of elements
- M = memory size (elements)
- B = block size (elements per disk page)

**Goal**: Minimize number of I/O operations.

## External Merge Sort

The standard algorithm for external sorting.

### Phase 1: Create Sorted Runs

```python
def create_sorted_runs(input_file, memory_size):
    runs = []
    while data remaining:
        # Read M elements into memory
        chunk = read_next_chunk(input_file, memory_size)
        # Sort in memory using quicksort/heapsort
        chunk.sort()
        # Write sorted run to disk
        run_file = write_run_to_disk(chunk)
        runs.append(run_file)
    return runs
```

Creates ⌈N/M⌉ sorted runs, each of size M.

### Phase 2: Merge Runs

```python
def k_way_merge(runs, output_file, memory_size, block_size):
    k = len(runs)
    # Allocate input buffers for each run
    input_buffers = [Buffer(block_size) for _ in range(k)]
    output_buffer = Buffer(block_size)

    # Initialize heap with first element from each run
    heap = []
    for i, run in enumerate(runs):
        element = read_block(run, input_buffers[i])
        heap.push((element, i))

    while heap:
        element, run_idx = heap.pop_min()
        output_buffer.add(element)

        if output_buffer.full():
            write_block(output_file, output_buffer)
            output_buffer.clear()

        # Get next element from same run
        next_elem = get_next(runs[run_idx], input_buffers[run_idx])
        if next_elem is not None:
            heap.push((next_elem, run_idx))

    # Flush remaining output
    write_block(output_file, output_buffer)
```

### Analysis

**Number of runs after Phase 1**: ⌈N/M⌉

**Merge fan-in**: k = M/B - 1 (reserve one buffer for output)

**Number of merge passes**: ⌈log_k(N/M)⌉

**I/O complexity**:
- Phase 1: O(N/B) reads + O(N/B) writes
- Each merge pass: O(N/B) reads + O(N/B) writes
- Total: O((N/B) × log_{M/B}(N/M))

### Example Calculation

Sort 1 TB of data with 4 GB RAM and 4 KB blocks:
- N = 250 billion elements (assuming 4 bytes each)
- M = 1 billion elements
- B = 1000 elements

Runs: 250 runs
Fan-in: ~1,000,000
Passes: ⌈log_{1M}(250)⌉ = 1

Only 2 full scans of the data!

## Replacement Selection

Improve Phase 1 by generating longer runs using a priority queue.

```python
def replacement_selection(input_file, memory_size):
    heap = MinHeap()
    current_run = []
    run_marker = 0

    # Fill heap initially
    for _ in range(memory_size):
        elem = read_next(input_file)
        heap.push((elem, run_marker))

    while heap:
        elem, marker = heap.pop_min()

        if marker == run_marker:
            current_run.append(elem)
        else:
            # Start new run
            write_run(current_run)
            current_run = [elem]
            run_marker = marker

        # Read next element if available
        next_elem = read_next(input_file)
        if next_elem is not None:
            if next_elem >= elem:
                heap.push((next_elem, run_marker))
            else:
                heap.push((next_elem, run_marker + 1))

    write_run(current_run)
```

**Average run length**: 2M (twice memory size)

**Benefit**: Fewer runs → fewer merge passes

## Polyphase Merge

Optimize merge phase for tape drives (sequential access only).

Instead of k-way merge with k tapes, uses k tapes with Fibonacci distribution.

**Advantage**: Reduces number of tape passes
**Disadvantage**: Complex, rarely needed with random-access storage

## Cache-Oblivious Algorithms

Algorithms that perform optimally regardless of cache parameters.

### Funnel Sort

Recursive merge sort designed to be cache-efficient:

```
funnel_sort(A):
    if |A| <= base_case:
        use insertion sort
    else:
        split A into √n subarrays
        recursively sort each subarray
        merge using k-funnel where k = √n
```

**I/O complexity**: O((N/B) × log_{M/B}(N/M))

Same as optimal external merge sort, but without knowing M or B!

### K-Funnel Data Structure

A k-funnel merges k sorted sequences:
- Binary tree of √k-funnels
- Buffers at each node
- Each buffer sized optimally for cache

## Practical Considerations

### Double Buffering

Read next block while processing current:

```python
def merge_with_double_buffer(runs):
    # While processing buffer A, read into buffer B
    current_buffers = [read_block(run) for run in runs]
    next_buffers = [None] * len(runs)

    async_read(runs[0], next_buffers[0])

    while data_remaining:
        process(current_buffers)
        wait_for_async_read()

        # Swap buffers
        current_buffers, next_buffers = next_buffers, current_buffers
        async_read(runs, next_buffers)
```

Overlaps I/O with computation.

### Run Formation Techniques

1. **Quicksort in memory**: Fast, but runs exactly size M
2. **Replacement selection**: Runs average 2M
3. **Natural runs**: Exploit existing order in input

### External vs In-Place

| Approach | Space | I/O | Use Case |
|----------|-------|-----|----------|
| External merge | O(N) | Optimal | Large files |
| External quicksort | O(N) | Often worse | Rarely used |
| In-place merge | O(1) | Much worse | Memory constrained |

## Modern Implementations

### Database Systems

```sql
-- Sort 1 billion rows
SELECT * FROM huge_table ORDER BY column;
```

Internally uses external merge sort with:
- Multiple merge threads
- Compression of intermediate runs
- Adaptive memory allocation

### MapReduce Sorting

Distributed external sorting:
1. **Map**: Partition data by key range
2. **Shuffle**: Move data to appropriate reducers
3. **Reduce**: Each reducer sorts its partition

TeraSort: Sorts 1 TB in under 1 minute on cluster.

### SSD Considerations

SSDs change the calculus:
- Random reads much faster than HDD
- Write amplification concerns
- Different block sizes optimal

## Summary

| Algorithm | I/O Complexity | Best For |
|-----------|----------------|----------|
| External Merge | O((N/B) log_{M/B}(N/M)) | General purpose |
| Replacement Selection | Same, fewer runs | Random input |
| Polyphase Merge | Optimized | Tape drives |
| Funnel Sort | Same | Cache-oblivious |

External sorting enables processing datasets far larger than available memory, making it essential for database systems, data warehouses, and large-scale data processing.
