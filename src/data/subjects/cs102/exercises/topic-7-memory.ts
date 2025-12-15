import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'cs102-t7-ex01',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Calculate Total Bits',
    difficulty: 1,
    description: 'Write a function `total_bits(bytes)` that returns the number of bits in a given number of bytes.',
    starterCode: 'def total_bits(bytes_count):\n    # Your code here\n    pass\n\nprint(total_bits(2))  # 16',
    solution: 'def total_bits(bytes_count):\n    return bytes_count * 8\n\nprint(total_bits(2))',
    testCases: [],
    hints: ['1 byte = 8 bits.'],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex02',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Addressable Memory',
    difficulty: 2,
    description: 'How many distinct addresses can be represented by `n` bits? Write `addressable_locations(n)`.',
    starterCode: 'def addressable_locations(n_bits):\n    # Your code here\n    pass\n\nprint(addressable_locations(32))',
    solution: 'def addressable_locations(n_bits):\n    return 2 ** n_bits\n\nprint(addressable_locations(32))',
    testCases: [],
    hints: ['The number of combinations of n bits is 2 to the power of n.'],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex03',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Cache Line Index',
    difficulty: 3,
    description: 'In a Direct Mapped Cache, the index is calculated as `(address // block_size) % num_lines`. Write this function.',
    starterCode: 'def get_cache_index(address, block_size, num_lines):\n    # Your code here\n    pass\n\nprint(get_cache_index(100, 16, 8))',
    solution: 'def get_cache_index(address, block_size, num_lines):\n    return (address // block_size) % num_lines\n\nprint(get_cache_index(100, 16, 8))',
    testCases: [],
    hints:
      [
        'Integer division `//` gets the block number.',
        'Modulo `%` maps it to a line index.'
      ],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex04',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Cache Tag Calculation',
    difficulty: 3,
    description: 'The tag identifies which block is currently in the line. `tag = address // (block_size * num_lines)`. Write `get_cache_tag`.',
    starterCode: 'def get_cache_tag(address, block_size, num_lines):\n    # Your code here\n    pass',
    solution: 'def get_cache_tag(address, block_size, num_lines):\n    return address // (block_size * num_lines)\n',
    testCases: [],
    hints: ['Divide the address by the total size of the cache (in bytes).'],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex05',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Simulate Cache Hit',
    difficulty: 3,
    description: 'Write `is_cache_hit(cache_tags, index, tag)`. `cache_tags` is a list of current tags at each index. Return True if `cache_tags[index]` matches `tag`, else False.',
    starterCode: 'def is_cache_hit(cache_tags, index, tag):\n    # Your code here\n    pass\n\ntags = [-1, 5, 20, -1] # -1 means empty\nprint(is_cache_hit(tags, 1, 5)) # True',
    solution: 'def is_cache_hit(cache_tags, index, tag):\n    if index < 0 or index >= len(cache_tags):\n        return False\n    return cache_tags[index] == tag\n\ntags = [-1, 5, 20, -1]\nprint(is_cache_hit(tags, 1, 5))',
    testCases: [],
    hints: ['Check if the value at the given index equals the tag.'],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex06',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'LRU Update',
    difficulty: 4,
    description: 'Simulate updating an LRU list. You have a list `lru_queue` of indices. When an index is accessed, it moves to the back (most recently used). Write `update_lru(queue, index)`.',
    starterCode: 'def update_lru(queue, index):\n    # Remove index if present, then append to end\n    pass\n\nq = [1, 2, 3]\nupdate_lru(q, 2)\nprint(q) # [1, 3, 2]',
    solution: 'def update_lru(queue, index):\n    if index in queue:\n        queue.remove(index)\n    queue.append(index)\n    return queue\n\nq = [1, 2, 3]\nupdate_lru(q, 2)\nprint(q)',
    testCases: [],
    hints:
      [
        'Use `remove()` to take it out.',
        'Use `append()` to put it at the end.'
      ],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex07',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Byte Alignment',
    difficulty: 2,
    description: 'Data accesses are often aligned to 4 or 8 bytes. Write `is_aligned(address, alignment)` returning True if address is a multiple of alignment.',
    starterCode: 'def is_aligned(addr, align):\n    pass\n\nprint(is_aligned(100, 4)) # True\nprint(is_aligned(101, 4)) # False',
    solution: 'def is_aligned(addr, align):\n    return addr % align == 0\n\nprint(is_aligned(100, 4))',
    testCases: [],
    hints: ['Use the modulo operator.'],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex08',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Page Number Calculation',
    difficulty: 3,
    description: 'Virtual memory splits addresses into Page Number and Offset. `page_num = address // page_size`. Write this function.',
    starterCode: 'def get_page_number(address, page_size):\n    pass',
    solution: 'def get_page_number(address, page_size):\n    return address // page_size',
    testCases: [],
    hints: ['Integer division.'],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex09',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Page Offset Calculation',
    difficulty: 3,
    description: 'The offset is `address % page_size`. Write `get_page_offset(address, page_size)`.',
    starterCode: 'def get_page_offset(address, page_size):\n    pass',
    solution: 'def get_page_offset(address, page_size):\n    return address % page_size',
    testCases: [],
    hints: ['Modulo operator.'],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex10',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Simulate Page Fault',
    difficulty: 3,
    description: 'Check if a page number is in the `page_table` (a set). Return True if IT IS (Hit), False if NOT (Page Fault).',
    starterCode: 'def check_page_table(page_table, page_num):\n    pass',
    solution: 'def check_page_table(page_table, page_num):\n    return page_num in page_table',
    testCases: [],
    hints: ['Use the `in` operator.'],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex11',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Physical Address Translation',
    difficulty: 4,
    description: 'Convert virtual address to physical. `phys_addr = frame_num * page_size + offset`. Write `translate(virt_addr, page_size, page_table_dict)`. `page_table_dict` maps page_num -> frame_num.',
    starterCode: 'def translate(virt_addr, page_size, page_table):\n    # 1. Get page num and offset\n    # 2. Look up frame num\n    # 3. Calculate phys addr\n    pass',
    solution: 'def translate(virt_addr, page_size, page_table):\n    p_num = virt_addr // page_size\n    offset = virt_addr % page_size\n    if p_num in page_table:\n        frame = page_table[p_num]\n        return frame * page_size + offset\n    return -1 # Fault\n',
    testCases: [],
    hints:
      [
        'Extract page number and offset first.',
        'Find the frame number in the dictionary.',
        'Combine frame number and offset.'
      ],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex12',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Disk Access Time Estimate',
    difficulty: 2,
    description: 'Estimate access time. `time = seek_time + rotational_latency + transfer_time`. Write a function that sums these.',
    starterCode: 'def disk_time(seek, rot, xfer):\n    pass',
    solution: 'def disk_time(seek, rot, xfer):\n    return seek + rot + xfer',
    testCases: [],
    hints: ['Just add them up.'],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex13',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Effective Access Time (EAT)',
    difficulty: 4,
    description: 'EAT = Hit_Time + (Miss_Rate * Miss_Penalty). Write `calc_eat(hit_time, miss_rate, miss_penalty)`.',
    starterCode: 'def calc_eat(h_time, m_rate, m_penalty):\n    # m_rate is a float 0.0-1.0\n    pass',
    solution: 'def calc_eat(h_time, m_rate, m_penalty):\n    return h_time + (m_rate * m_penalty)',
    testCases: [],
    hints: ['Apply the formula directly.'],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex14',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Multi-Level Cache EAT',
    difficulty: 5,
    description: 'EAT = L1_Hit + L1_Miss_Rate * (L2_Hit + L2_Miss_Rate * Main_Mem_Time). Write `calc_eat_l2(l1_hit, l1_miss, l2_hit, l2_miss, mem_time)`.',
    starterCode: 'def calc_eat_l2(l1h, l1m, l2h, l2m, mem):\n    pass',
    solution: 'def calc_eat_l2(l1h, l1m, l2h, l2m, mem):\n    return l1h + l1m * (l2h + l2m * mem)',
    testCases: [],
    hints: ['Nest the formulas: cost of L1 miss is the EAT of L2.'],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex15',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Interrupt Overhead',
    difficulty: 3,
    description: 'Calculate overhead %: `(interrupt_service_time / interval_between_interrupts) * 100`.',
    starterCode: 'def interrupt_overhead(service_time, interval):\n    pass',
    solution: 'def interrupt_overhead(service_time, interval):\n    return (service_time / interval) * 100',
    testCases: [],
    hints: ['Simple percentage calculation.'],
    language: 'python'
  },
  {
    id: 'cs102-t7-ex16',
    subjectId: 'cs102',
    topicId: 'cs102-7',
    title: 'Memory Drill Complete',
    difficulty: 1,
    description: 'Return "ACK".',
    starterCode: 'def ack():\n    pass',
    solution: 'def ack():\n    return "ACK"',
    testCases: [],
    hints: ['Return "ACK"'],
    language: 'python'
  }
];
