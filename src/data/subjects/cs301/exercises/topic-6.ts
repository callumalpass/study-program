import { CodingExercise } from '../../../../core/types';

export const cs301Topic6Exercises: CodingExercise[] = [
  // 1. Address Binding
  {
    id: 'cs301-ex-6-1',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Logical to Physical Address',
    description: 'Convert logical address to physical using base and limit registers.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def translate_address(logical_addr, base, limit):\n    # Return physical address or -1 if invalid\n    pass',
    solution: `def translate_address(logical_addr, base, limit):
    if logical_addr < 0 or logical_addr >= limit:
        return -1  # Address out of bounds
    return base + logical_addr`,
    testCases: [
      { input: '100, 5000, 1000', expectedOutput: '5100', isHidden: false, description: 'Valid translation' },
      { input: '1500, 5000, 1000', expectedOutput: '-1', isHidden: false, description: 'Out of bounds' }
    ],
    hints: ['Check against limit first', 'Physical = base + logical']
  },
  // 2. First Fit Allocation
  {
    id: 'cs301-ex-6-2',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'First Fit Allocator',
    description: 'Implement First Fit memory allocation.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def first_fit(memory_blocks, process_size):\n    # memory_blocks: list of (start, size, is_free)\n    # Return start address or -1 if no fit\n    pass',
    solution: `def first_fit(memory_blocks, process_size):
    for start, size, is_free in memory_blocks:
        if is_free and size >= process_size:
            return start
    return -1`,
    testCases: [
      { input: '[(0, 100, True), (100, 200, False), (300, 150, True)], 120', expectedOutput: '300', isHidden: false, description: 'First fit' },
      { input: '[(0, 50, True)], 100', expectedOutput: '-1', isHidden: false, description: 'No fit' }
    ],
    hints: ['Find first free block that fits', 'Return start address']
  },
  // 3. Best Fit Allocation
  {
    id: 'cs301-ex-6-3',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Best Fit Allocator',
    description: 'Implement Best Fit memory allocation (smallest adequate block).',
    difficulty: 3,
    language: 'python',
    starterCode: 'def best_fit(memory_blocks, process_size):\n    # Return start address of best fitting block or -1\n    pass',
    solution: `def best_fit(memory_blocks, process_size):
    best_start = -1
    best_size = float('inf')

    for start, size, is_free in memory_blocks:
        if is_free and size >= process_size:
            if size < best_size:
                best_size = size
                best_start = start
    return best_start`,
    testCases: [
      { input: '[(0, 200, True), (200, 100, True), (300, 150, True)], 90', expectedOutput: '200', isHidden: false, description: 'Best fit is 100' },
      { input: '[(0, 100, True), (100, 100, True)], 100', expectedOutput: '0', isHidden: false, description: 'Exact fit' }
    ],
    hints: ['Track smallest adequate block', 'Minimize waste']
  },
  // 4. Worst Fit Allocation
  {
    id: 'cs301-ex-6-4',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Worst Fit Allocator',
    description: 'Implement Worst Fit memory allocation (largest adequate block).',
    difficulty: 2,
    language: 'python',
    starterCode: 'def worst_fit(memory_blocks, process_size):\n    # Return start address of largest fitting block or -1\n    pass',
    solution: `def worst_fit(memory_blocks, process_size):
    worst_start = -1
    worst_size = -1

    for start, size, is_free in memory_blocks:
        if is_free and size >= process_size:
            if size > worst_size:
                worst_size = size
                worst_start = start
    return worst_start`,
    testCases: [
      { input: '[(0, 100, True), (100, 200, True), (300, 150, True)], 50', expectedOutput: '100', isHidden: false, description: 'Worst fit is 200' },
      { input: '[(0, 50, True)], 100', expectedOutput: '-1', isHidden: false, description: 'No fit' }
    ],
    hints: ['Track largest adequate block', 'Leave large remainder']
  },
  // 5. External Fragmentation
  {
    id: 'cs301-ex-6-5',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'External Fragmentation Calculator',
    description: 'Calculate total external fragmentation (free but unusable memory).',
    difficulty: 2,
    language: 'python',
    starterCode: 'def external_fragmentation(memory_blocks, min_useful_size):\n    # Return total free space in blocks smaller than min_useful_size\n    pass',
    solution: `def external_fragmentation(memory_blocks, min_useful_size):
    fragmented = 0
    for start, size, is_free in memory_blocks:
        if is_free and size < min_useful_size:
            fragmented += size
    return fragmented`,
    testCases: [
      { input: '[(0, 50, True), (50, 200, False), (250, 30, True)], 100', expectedOutput: '80', isHidden: false, description: 'Two small free blocks' },
      { input: '[(0, 200, True)], 100', expectedOutput: '0', isHidden: false, description: 'Large enough block' }
    ],
    hints: ['Sum free blocks below threshold', 'Ignore large free blocks']
  },
  // 6. Page Table Entry
  {
    id: 'cs301-ex-6-6',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Page Table Lookup',
    description: 'Translate logical address using page table.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def page_translate(logical_addr, page_table, page_size):\n    # page_table[page_num] = (frame_num, valid_bit)\n    # Return physical address or -1 if invalid\n    pass',
    solution: `def page_translate(logical_addr, page_table, page_size):
    page_num = logical_addr // page_size
    page_offset = logical_addr % page_size

    if page_num >= len(page_table):
        return -1

    frame_num, valid = page_table[page_num]
    if not valid:
        return -1

    physical_addr = frame_num * page_size + page_offset
    return physical_addr`,
    testCases: [
      { input: '5000, [(2, True), (3, True)], 4096', expectedOutput: '12904', isHidden: false, description: 'Page 1, offset 904' },
      { input: '1000, [(5, False)], 4096', expectedOutput: '-1', isHidden: false, description: 'Invalid page' }
    ],
    hints: ['Extract page number and offset', 'Check valid bit']
  },
  // 7. Internal Fragmentation
  {
    id: 'cs301-ex-6-7',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Internal Fragmentation',
    description: 'Calculate internal fragmentation for a process.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def internal_fragmentation(process_size, page_size):\n    # Return wasted space in last page\n    pass',
    solution: `def internal_fragmentation(process_size, page_size):
    pages_needed = (process_size + page_size - 1) // page_size
    allocated = pages_needed * page_size
    return allocated - process_size`,
    testCases: [
      { input: '10000, 4096', expectedOutput: '2288', isHidden: false, description: '3 pages, 2288 wasted' },
      { input: '8192, 4096', expectedOutput: '0', isHidden: false, description: 'Exact fit' }
    ],
    hints: ['Calculate pages needed', 'Subtract process size from allocated']
  },
  // 8. TLB Hit/Miss
  {
    id: 'cs301-ex-6-8',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'TLB Simulation',
    description: 'Simulate TLB lookups and calculate hit rate.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def tlb_simulation(page_references, tlb_size):\n    # Return (hits, misses, hit_rate)\n    pass',
    solution: `def tlb_simulation(page_references, tlb_size):
    tlb = []  # LRU order
    hits = 0
    misses = 0

    for page in page_references:
        if page in tlb:
            hits += 1
            tlb.remove(page)
            tlb.append(page)  # Move to end (most recent)
        else:
            misses += 1
            if len(tlb) >= tlb_size:
                tlb.pop(0)  # Remove LRU
            tlb.append(page)

    total = hits + misses
    hit_rate = hits / total if total > 0 else 0
    return (hits, misses, round(hit_rate, 2))`,
    testCases: [
      { input: '[1, 2, 3, 1, 2, 4, 1], 3', expectedOutput: '(3, 4, 0.43)', isHidden: false, description: 'Mixed hits/misses' },
      { input: '[1, 1, 1, 1], 1', expectedOutput: '(3, 1, 0.75)', isHidden: false, description: 'High locality' }
    ],
    hints: ['Use LRU replacement', 'Track hits and misses']
  },
  // 9. Effective Access Time
  {
    id: 'cs301-ex-6-9',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Effective Access Time',
    description: 'Calculate EAT with TLB.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def effective_access_time(tlb_hit_ratio, tlb_time, memory_time):\n    # Return EAT in same time units\n    pass',
    solution: `def effective_access_time(tlb_hit_ratio, tlb_time, memory_time):
    # TLB hit: TLB + memory (for data)
    # TLB miss: TLB + memory (page table) + memory (data)
    eat = (tlb_hit_ratio * (tlb_time + memory_time) +
           (1 - tlb_hit_ratio) * (tlb_time + 2 * memory_time))
    return round(eat, 2)`,
    testCases: [
      { input: '0.9, 10, 100', expectedOutput: '120.0', isHidden: false, description: '90% hit rate' },
      { input: '0.98, 10, 100', expectedOutput: '112.2', isHidden: false, description: '98% hit rate' }
    ],
    hints: ['EAT = hit_ratio * hit_time + miss_ratio * miss_time', 'Miss requires extra memory access']
  },
  // 10. Multi-level Page Table
  {
    id: 'cs301-ex-6-10',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Two-Level Page Table',
    description: 'Calculate address bits for two-level page table.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def two_level_bits(addr_bits, page_size_kb, pte_size_bytes):\n    # Return (outer_bits, inner_bits, offset_bits)\n    pass',
    solution: `def two_level_bits(addr_bits, page_size_kb, pte_size_bytes):
    import math
    page_size = page_size_kb * 1024
    offset_bits = int(math.log2(page_size))

    # PTEs per page
    ptes_per_page = page_size // pte_size_bytes
    inner_bits = int(math.log2(ptes_per_page))

    # Remaining bits for outer
    outer_bits = addr_bits - offset_bits - inner_bits

    return (outer_bits, inner_bits, offset_bits)`,
    testCases: [
      { input: '32, 4, 4', expectedOutput: '(10, 10, 12)', isHidden: false, description: '32-bit, 4KB pages' },
      { input: '64, 4, 8', expectedOutput: '(43, 9, 12)', isHidden: false, description: '64-bit, 4KB pages' }
    ],
    hints: ['Offset bits = log2(page_size)', 'Inner bits = log2(PTEs per page)']
  },
  // 11. Segment Table Lookup
  {
    id: 'cs301-ex-6-11',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Segmentation Translation',
    description: 'Translate segment:offset address.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def segment_translate(segment_num, offset, segment_table):\n    # segment_table[seg] = (base, limit)\n    # Return physical address or -1 if invalid\n    pass',
    solution: `def segment_translate(segment_num, offset, segment_table):
    if segment_num >= len(segment_table):
        return -1

    base, limit = segment_table[segment_num]
    if offset >= limit:
        return -1

    return base + offset`,
    testCases: [
      { input: '0, 500, [(1000, 1000), (2000, 500)]', expectedOutput: '1500', isHidden: false, description: 'Valid segment access' },
      { input: '1, 600, [(1000, 1000), (2000, 500)]', expectedOutput: '-1', isHidden: false, description: 'Offset exceeds limit' }
    ],
    hints: ['Check segment exists', 'Check offset within limit']
  },
  // 12. Memory Compaction
  {
    id: 'cs301-ex-6-12',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Memory Compaction',
    description: 'Calculate new addresses after compaction.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def compact_memory(allocations):\n    # allocations: list of (name, start, size)\n    # Return new allocations after compaction\n    pass',
    solution: `def compact_memory(allocations):
    # Sort by start address and compact
    sorted_allocs = sorted(allocations, key=lambda x: x[1])
    result = []
    current_addr = 0

    for name, start, size in sorted_allocs:
        result.append((name, current_addr, size))
        current_addr += size

    return result`,
    testCases: [
      { input: '[("A", 100, 50), ("B", 0, 30), ("C", 200, 40)]', expectedOutput: '[("B", 0, 30), ("A", 30, 50), ("C", 80, 40)]', isHidden: false, description: 'Compacted layout' },
      { input: '[("X", 0, 100)]', expectedOutput: '[("X", 0, 100)]', isHidden: false, description: 'Already compact' }
    ],
    hints: ['Sort by original position', 'Place contiguously from 0']
  },
  // 13. Page Table Size
  {
    id: 'cs301-ex-6-13',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Page Table Size Calculator',
    description: 'Calculate page table size in bytes.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def page_table_size(virtual_addr_bits, page_size_kb, pte_bytes):\n    # Return page table size in bytes\n    pass',
    solution: `def page_table_size(virtual_addr_bits, page_size_kb, pte_bytes):
    import math
    page_size = page_size_kb * 1024
    offset_bits = int(math.log2(page_size))
    page_number_bits = virtual_addr_bits - offset_bits
    num_pages = 2 ** page_number_bits
    return num_pages * pte_bytes`,
    testCases: [
      { input: '32, 4, 4', expectedOutput: '4194304', isHidden: false, description: '32-bit, 4KB pages, 4B PTE' },
      { input: '20, 4, 4', expectedOutput: '1024', isHidden: false, description: '20-bit address space' }
    ],
    hints: ['Num pages = 2^(addr_bits - offset_bits)', 'Size = num_pages * PTE_size']
  },
  // 14. Inverted Page Table
  {
    id: 'cs301-ex-6-14',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Inverted Page Table Lookup',
    description: 'Search inverted page table for translation.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def inverted_lookup(pid, page_num, inverted_table):\n    # inverted_table[frame] = (pid, page_num) or None\n    # Return frame number or -1 if not found\n    pass',
    solution: `def inverted_lookup(pid, page_num, inverted_table):
    for frame, entry in enumerate(inverted_table):
        if entry is not None:
            if entry[0] == pid and entry[1] == page_num:
                return frame
    return -1`,
    testCases: [
      { input: '1, 5, [None, (1, 5), (2, 3)]', expectedOutput: '1', isHidden: false, description: 'Found in frame 1' },
      { input: '1, 10, [(1, 5), (2, 3)]', expectedOutput: '-1', isHidden: false, description: 'Not found' }
    ],
    hints: ['Search entire table', 'Match both PID and page number']
  },
  // 15. Swap Space Size
  {
    id: 'cs301-ex-6-15',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Swap Space Calculator',
    description: 'Calculate required swap space for processes.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def required_swap_space(processes, physical_memory):\n    # processes: list of memory sizes\n    # Return minimum swap space needed\n    pass',
    solution: `def required_swap_space(processes, physical_memory):
    total_virtual = sum(processes)
    if total_virtual <= physical_memory:
        return 0
    return total_virtual - physical_memory`,
    testCases: [
      { input: '[500, 300, 400], 800', expectedOutput: '400', isHidden: false, description: 'Need 400 swap' },
      { input: '[200, 300], 600', expectedOutput: '0', isHidden: false, description: 'Fits in memory' }
    ],
    hints: ['Swap = total virtual - physical', 'Minimum is 0']
  },
  // 16. Address Space Layout
  {
    id: 'cs301-ex-6-16',
    subjectId: 'cs301',
    topicId: 'cs301-t6',
    title: 'Address Space Layout',
    description: 'Validate process address space layout.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def validate_layout(text_start, text_size, data_start, data_size, heap_start, stack_end, total_size):\n    # Return True if layout is valid (no overlaps, within bounds)\n    pass',
    solution: `def validate_layout(text_start, text_size, data_start, data_size, heap_start, stack_end, total_size):
    text_end = text_start + text_size
    data_end = data_start + data_size

    # Check bounds
    if text_start < 0 or text_end > total_size:
        return False
    if data_start < 0 or data_end > total_size:
        return False
    if heap_start < 0 or heap_start > total_size:
        return False
    if stack_end < 0 or stack_end > total_size:
        return False

    # Check no overlap between text and data
    if not (text_end <= data_start or data_end <= text_start):
        return False

    # Check heap doesn't overlap with text/data
    if heap_start < max(text_end, data_end):
        return False

    return True`,
    testCases: [
      { input: '0, 1000, 1000, 500, 1500, 4096, 4096', expectedOutput: 'True', isHidden: false, description: 'Valid layout' },
      { input: '0, 1000, 500, 1000, 1500, 4096, 4096', expectedOutput: 'False', isHidden: false, description: 'Text/data overlap' }
    ],
    hints: ['Check each section within bounds', 'Check for overlaps']
  }
];
