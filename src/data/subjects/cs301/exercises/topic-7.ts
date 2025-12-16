import { CodingExercise } from '../../../../core/types';

export const cs301Topic7Exercises: CodingExercise[] = [
  // 1. Page Fault Handler
  {
    id: 'cs301-ex-7-1',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Page Fault Counter',
    description: 'Count page faults for a reference string given a fixed number of frames.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def count_page_faults(reference_string, num_frames):\n    # Return number of page faults (simple LRU)\n    pass',
    solution: `def count_page_faults(reference_string, num_frames):
    frames = []
    faults = 0

    for page in reference_string:
        if page not in frames:
            faults += 1
            if len(frames) >= num_frames:
                frames.pop(0)  # LRU
            frames.append(page)
        else:
            frames.remove(page)
            frames.append(page)  # Move to end (most recent)

    return faults`,
    testCases: [
      { input: '[1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], 3', expectedOutput: '10', isHidden: false, description: 'Standard reference string' },
      { input: '[1, 1, 1, 1], 1', expectedOutput: '1', isHidden: false, description: 'Same page repeated' }
    ],
    hints: ['Track pages in frames', 'Fault on first access or after eviction']
  },
  // 2. FIFO Page Replacement
  {
    id: 'cs301-ex-7-2',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'FIFO Page Replacement',
    description: 'Implement FIFO page replacement and return the sequence of evicted pages.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def fifo_replacement(reference_string, num_frames):\n    # Return list of evicted pages (in order)\n    pass',
    solution: `def fifo_replacement(reference_string, num_frames):
    frames = []
    evicted = []

    for page in reference_string:
        if page not in frames:
            if len(frames) >= num_frames:
                victim = frames.pop(0)
                evicted.append(victim)
            frames.append(page)

    return evicted`,
    testCases: [
      { input: '[1, 2, 3, 4, 1, 2], 3', expectedOutput: '[1, 2]', isHidden: false, description: 'Evict 1 then 2' },
      { input: '[1, 2, 1, 2], 2', expectedOutput: '[]', isHidden: false, description: 'No evictions' }
    ],
    hints: ['Evict oldest (front of queue)', 'Track evictions separately']
  },
  // 3. LRU Page Replacement
  {
    id: 'cs301-ex-7-3',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'LRU Page Replacement',
    description: 'Implement LRU page replacement.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def lru_replacement(reference_string, num_frames):\n    # Return (page_faults, final_frame_state)\n    pass',
    solution: `def lru_replacement(reference_string, num_frames):
    frames = []  # Ordered by recency, most recent at end
    faults = 0

    for page in reference_string:
        if page in frames:
            frames.remove(page)
            frames.append(page)
        else:
            faults += 1
            if len(frames) >= num_frames:
                frames.pop(0)  # Remove LRU (front)
            frames.append(page)

    return (faults, frames)`,
    testCases: [
      { input: '[1, 2, 3, 4, 1, 2, 5], 3', expectedOutput: '(6, [1, 2, 5])', isHidden: false, description: 'LRU simulation' },
      { input: '[1, 2, 1, 2], 2', expectedOutput: '(2, [1, 2])', isHidden: false, description: 'High locality' }
    ],
    hints: ['Move accessed page to end', 'Remove from front on eviction']
  },
  // 4. Optimal Page Replacement
  {
    id: 'cs301-ex-7-4',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Optimal Page Replacement',
    description: 'Implement optimal (OPT) page replacement using future knowledge.',
    difficulty: 4,
    language: 'python',
    starterCode: 'def optimal_replacement(reference_string, num_frames):\n    # Return number of page faults\n    pass',
    solution: `def optimal_replacement(reference_string, num_frames):
    frames = []
    faults = 0

    for i, page in enumerate(reference_string):
        if page in frames:
            continue

        faults += 1
        if len(frames) < num_frames:
            frames.append(page)
        else:
            # Find page used furthest in future
            furthest = -1
            victim = frames[0]
            for frame_page in frames:
                try:
                    next_use = reference_string[i+1:].index(frame_page)
                except ValueError:
                    next_use = float('inf')
                if next_use > furthest:
                    furthest = next_use
                    victim = frame_page
            frames.remove(victim)
            frames.append(page)

    return faults`,
    testCases: [
      { input: '[1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], 3', expectedOutput: '7', isHidden: false, description: 'Optimal replacement' },
      { input: '[1, 2, 3, 1, 2, 3], 3', expectedOutput: '3', isHidden: false, description: 'Perfect fit' }
    ],
    hints: ['Look ahead in reference string', 'Replace page used furthest in future']
  },
  // 5. Clock (Second Chance) Algorithm
  {
    id: 'cs301-ex-7-5',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Clock Algorithm',
    description: 'Implement the clock (second chance) page replacement algorithm.',
    difficulty: 4,
    language: 'python',
    starterCode: 'def clock_replacement(reference_string, num_frames):\n    # Return number of page faults\n    pass',
    solution: `def clock_replacement(reference_string, num_frames):
    frames = []  # (page, reference_bit)
    pointer = 0
    faults = 0

    for page in reference_string:
        # Check if page already in frames
        found = False
        for i, (p, _) in enumerate(frames):
            if p == page:
                frames[i] = (p, 1)  # Set reference bit
                found = True
                break

        if not found:
            faults += 1
            if len(frames) < num_frames:
                frames.append((page, 1))
            else:
                # Find victim using clock
                while True:
                    p, ref = frames[pointer]
                    if ref == 0:
                        frames[pointer] = (page, 1)
                        pointer = (pointer + 1) % num_frames
                        break
                    else:
                        frames[pointer] = (p, 0)  # Second chance
                        pointer = (pointer + 1) % num_frames

    return faults`,
    testCases: [
      { input: '[1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], 3', expectedOutput: '10', isHidden: false, description: 'Clock algorithm' },
      { input: '[1, 2, 3, 1, 2], 3', expectedOutput: '3', isHidden: false, description: 'No evictions needed' }
    ],
    hints: ['Use circular buffer with reference bits', 'Clear reference bit on second chance']
  },
  // 6. Working Set Calculation
  {
    id: 'cs301-ex-7-6',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Working Set Size',
    description: 'Calculate working set size at a given time.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def working_set(reference_string, time, window_size):\n    # Return set of pages in working set at time\n    pass',
    solution: `def working_set(reference_string, time, window_size):
    start = max(0, time - window_size + 1)
    end = time + 1
    window = reference_string[start:end]
    return set(window)`,
    testCases: [
      { input: '[1, 2, 3, 1, 2, 4, 5, 3, 4, 5], 7, 4', expectedOutput: '{3, 4, 5}', isHidden: false, description: 'Working set at t=7' },
      { input: '[1, 2, 3, 4, 5], 2, 3', expectedOutput: '{1, 2, 3}', isHidden: false, description: 'First three pages' }
    ],
    hints: ['Window ends at current time', 'Return unique pages in window']
  },
  // 7. Thrashing Detection
  {
    id: 'cs301-ex-7-7',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Thrashing Detector',
    description: 'Detect if system is thrashing based on page fault rate.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def is_thrashing(page_faults, total_references, threshold):\n    # Return True if page fault rate exceeds threshold\n    pass',
    solution: `def is_thrashing(page_faults, total_references, threshold):
    if total_references == 0:
        return False
    fault_rate = page_faults / total_references
    return fault_rate > threshold`,
    testCases: [
      { input: '80, 100, 0.5', expectedOutput: 'True', isHidden: false, description: '80% fault rate' },
      { input: '10, 100, 0.5', expectedOutput: 'False', isHidden: false, description: '10% fault rate' }
    ],
    hints: ['Calculate fault rate', 'Compare to threshold']
  },
  // 8. Memory-Mapped File Access
  {
    id: 'cs301-ex-7-8',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Memory-Mapped File',
    description: 'Simulate memory-mapped file access.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class MemoryMappedFile:\n    def __init__(self, file_data, page_size):\n        pass\n    \n    def read(self, offset, length):\n        # Return data and list of pages accessed\n        pass',
    solution: `class MemoryMappedFile:
    def __init__(self, file_data, page_size):
        self.data = file_data
        self.page_size = page_size

    def read(self, offset, length):
        if offset < 0 or offset + length > len(self.data):
            return (None, [])

        data = self.data[offset:offset + length]

        # Calculate pages accessed
        start_page = offset // self.page_size
        end_page = (offset + length - 1) // self.page_size
        pages = list(range(start_page, end_page + 1))

        return (data, pages)`,
    testCases: [
      { input: 'mmf = MemoryMappedFile("0123456789ABCDEF", 4); mmf.read(2, 6)', expectedOutput: '("234567", [0, 1])', isHidden: false, description: 'Cross-page read' },
      { input: 'mmf = MemoryMappedFile("ABCD", 4); mmf.read(0, 4)', expectedOutput: '("ABCD", [0])', isHidden: false, description: 'Single page' }
    ],
    hints: ['Calculate page boundaries', 'Track all pages touched']
  },
  // 9. File Allocation Table
  {
    id: 'cs301-ex-7-9',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'FAT File System',
    description: 'Traverse FAT to find all blocks of a file.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def get_file_blocks(fat, start_block):\n    # fat[i] = next block or -1 for end\n    # Return list of all blocks in order\n    pass',
    solution: `def get_file_blocks(fat, start_block):
    blocks = []
    current = start_block

    while current != -1 and current < len(fat):
        if current in blocks:
            break  # Cycle detection
        blocks.append(current)
        current = fat[current]

    return blocks`,
    testCases: [
      { input: '[-1, 4, -1, -1, 7, -1, -1, -1], 1', expectedOutput: '[1, 4, 7]', isHidden: false, description: 'Three blocks' },
      { input: '[2, -1, 3, -1], 0', expectedOutput: '[0, 2, 3]', isHidden: false, description: 'Chain traversal' }
    ],
    hints: ['Follow chain until -1', 'Detect cycles']
  },
  // 10. Inode Block Lookup
  {
    id: 'cs301-ex-7-10',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Inode Block Calculation',
    description: 'Calculate which block holds a given file byte offset using inode structure.',
    difficulty: 4,
    language: 'python',
    starterCode: 'def inode_block_lookup(file_offset, block_size, direct_blocks, indirect_block, double_indirect):\n    # Return (block_number, is_direct, indirection_level)\n    pass',
    solution: `def inode_block_lookup(file_offset, block_size, direct_blocks, indirect_block, double_indirect):
    block_num = file_offset // block_size
    ptrs_per_block = block_size // 4  # Assume 4-byte pointers

    # Direct blocks (12)
    if block_num < 12:
        return (direct_blocks[block_num], True, 0)

    block_num -= 12

    # Single indirect
    if block_num < ptrs_per_block:
        # Would need to read indirect block
        return (indirect_block, False, 1)

    block_num -= ptrs_per_block

    # Double indirect
    if block_num < ptrs_per_block * ptrs_per_block:
        return (double_indirect, False, 2)

    return (-1, False, -1)  # Out of range`,
    testCases: [
      { input: '1000, 4096, [10,11,12,13,14,15,16,17,18,19,20,21], 100, 200', expectedOutput: '(10, True, 0)', isHidden: false, description: 'Direct block' },
      { input: '50000, 4096, [10,11,12,13,14,15,16,17,18,19,20,21], 100, 200', expectedOutput: '(100, False, 1)', isHidden: false, description: 'Single indirect' }
    ],
    hints: ['Calculate block number first', 'Check direct, then indirect levels']
  },
  // 11. Directory Entry Parser
  {
    id: 'cs301-ex-7-11',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Directory Lookup',
    description: 'Look up a file name in a directory and return its inode.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def directory_lookup(directory_entries, filename):\n    # directory_entries: list of (name, inode)\n    # Return inode or -1 if not found\n    pass',
    solution: `def directory_lookup(directory_entries, filename):
    for name, inode in directory_entries:
        if name == filename:
            return inode
    return -1`,
    testCases: [
      { input: '[(".", 100), ("..", 99), ("file.txt", 150)], "file.txt"', expectedOutput: '150', isHidden: false, description: 'File found' },
      { input: '[("a", 1), ("b", 2)], "c"', expectedOutput: '-1', isHidden: false, description: 'File not found' }
    ],
    hints: ['Linear search through entries', 'Compare names exactly']
  },
  // 12. Free Block Bitmap
  {
    id: 'cs301-ex-7-12',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Block Bitmap Allocator',
    description: 'Allocate blocks using a bitmap.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class BlockBitmap:\n    def __init__(self, num_blocks):\n        pass\n    \n    def allocate(self, num_blocks):\n        # Return list of allocated block numbers or empty if not enough\n        pass\n    \n    def free(self, blocks):\n        pass\n    \n    def get_free_count(self):\n        pass',
    solution: `class BlockBitmap:
    def __init__(self, num_blocks):
        self.bitmap = [False] * num_blocks  # False = free

    def allocate(self, num_blocks):
        allocated = []
        for i, used in enumerate(self.bitmap):
            if not used:
                allocated.append(i)
                if len(allocated) == num_blocks:
                    break
        if len(allocated) < num_blocks:
            return []  # Not enough blocks
        for block in allocated:
            self.bitmap[block] = True
        return allocated

    def free(self, blocks):
        for block in blocks:
            if 0 <= block < len(self.bitmap):
                self.bitmap[block] = False

    def get_free_count(self):
        return sum(1 for used in self.bitmap if not used)`,
    testCases: [
      { input: 'bb = BlockBitmap(10); bb.allocate(3)', expectedOutput: '[0, 1, 2]', isHidden: false, description: 'Allocate 3 blocks' },
      { input: 'bb = BlockBitmap(5); bb.allocate(3); bb.get_free_count()', expectedOutput: '2', isHidden: false, description: 'Free count after allocation' }
    ],
    hints: ['Search for free bits', 'Mark allocated bits as used']
  },
  // 13. Path Resolution
  {
    id: 'cs301-ex-7-13',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Path Resolution',
    description: 'Resolve a file path to its inode.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def resolve_path(path, root_inode, get_directory):\n    # get_directory(inode) returns list of (name, inode)\n    # Return final inode or -1 if not found\n    pass',
    solution: `def resolve_path(path, root_inode, get_directory):
    if not path or path == "/":
        return root_inode

    parts = path.strip("/").split("/")
    current = root_inode

    for part in parts:
        if not part:
            continue
        directory = get_directory(current)
        found = False
        for name, inode in directory:
            if name == part:
                current = inode
                found = True
                break
        if not found:
            return -1

    return current`,
    testCases: [
      { input: '"/home/user/file.txt", 1, lambda i: {1: [("home", 2)], 2: [("user", 3)], 3: [("file.txt", 100)]}[i]', expectedOutput: '100', isHidden: false, description: 'Full path resolution' },
      { input: '"/", 1, lambda i: []', expectedOutput: '1', isHidden: false, description: 'Root path' }
    ],
    hints: ['Split path into components', 'Look up each component in current directory']
  },
  // 14. File System Journal
  {
    id: 'cs301-ex-7-14',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Journal Entry',
    description: 'Create and apply journal entries for file system operations.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class JournalEntry:\n    def __init__(self, operation, block, old_data, new_data):\n        pass\n\ndef apply_journal(entries, blocks):\n    # Apply all committed entries to blocks dict\n    # Return updated blocks\n    pass',
    solution: `class JournalEntry:
    def __init__(self, operation, block, old_data, new_data):
        self.operation = operation
        self.block = block
        self.old_data = old_data
        self.new_data = new_data
        self.committed = False

def apply_journal(entries, blocks):
    result = blocks.copy()
    for entry in entries:
        if entry.committed:
            result[entry.block] = entry.new_data
    return result`,
    testCases: [
      { input: 'e = JournalEntry("write", 5, "old", "new"); e.committed = True; apply_journal([e], {5: "old"})', expectedOutput: '{5: "new"}', isHidden: false, description: 'Apply committed entry' },
      { input: 'e = JournalEntry("write", 5, "old", "new"); apply_journal([e], {5: "old"})', expectedOutput: '{5: "old"}', isHidden: false, description: 'Uncommitted not applied' }
    ],
    hints: ['Only apply committed entries', 'Replace block data with new_data']
  },
  // 15. File Permissions Check
  {
    id: 'cs301-ex-7-15',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Permission Check',
    description: 'Check if a user has permission for an operation.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def check_permission(user_id, group_id, file_owner, file_group, file_mode, operation):\n    # file_mode is octal like 0o755\n    # operation: "read", "write", "execute"\n    # Return True if permitted\n    pass',
    solution: `def check_permission(user_id, group_id, file_owner, file_group, file_mode, operation):
    op_bit = {"read": 4, "write": 2, "execute": 1}[operation]

    if user_id == file_owner:
        perms = (file_mode >> 6) & 0o7
    elif group_id == file_group:
        perms = (file_mode >> 3) & 0o7
    else:
        perms = file_mode & 0o7

    return (perms & op_bit) != 0`,
    testCases: [
      { input: '100, 50, 100, 50, 0o755, "read"', expectedOutput: 'True', isHidden: false, description: 'Owner read' },
      { input: '200, 50, 100, 50, 0o750, "read"', expectedOutput: 'True', isHidden: false, description: 'Group read' },
      { input: '300, 60, 100, 50, 0o750, "read"', expectedOutput: 'False', isHidden: false, description: 'Other no read' }
    ],
    hints: ['Check owner, group, then other', 'Extract permission bits']
  },
  // 16. Disk Block Cache
  {
    id: 'cs301-ex-7-16',
    subjectId: 'cs301',
    topicId: 'cs301-t7',
    title: 'Block Cache (Buffer Cache)',
    description: 'Implement a simple LRU block cache.',
    difficulty: 4,
    language: 'python',
    starterCode: 'class BlockCache:\n    def __init__(self, capacity):\n        pass\n    \n    def read(self, block_num, disk_read_func):\n        # Return block data, reading from disk if not cached\n        pass\n    \n    def write(self, block_num, data):\n        # Write to cache (write-back)\n        pass\n    \n    def flush(self, disk_write_func):\n        # Write all dirty blocks to disk\n        pass',
    solution: `class BlockCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # block_num -> (data, dirty)
        self.lru_order = []

    def read(self, block_num, disk_read_func):
        if block_num in self.cache:
            # Move to end (most recent)
            self.lru_order.remove(block_num)
            self.lru_order.append(block_num)
            return self.cache[block_num][0]

        # Read from disk
        data = disk_read_func(block_num)

        # Evict if full
        if len(self.cache) >= self.capacity:
            victim = self.lru_order.pop(0)
            del self.cache[victim]

        self.cache[block_num] = (data, False)
        self.lru_order.append(block_num)
        return data

    def write(self, block_num, data):
        if block_num in self.cache:
            self.lru_order.remove(block_num)

        if len(self.cache) >= self.capacity and block_num not in self.cache:
            victim = self.lru_order.pop(0)
            del self.cache[victim]

        self.cache[block_num] = (data, True)  # Mark dirty
        self.lru_order.append(block_num)

    def flush(self, disk_write_func):
        for block_num, (data, dirty) in list(self.cache.items()):
            if dirty:
                disk_write_func(block_num, data)
                self.cache[block_num] = (data, False)`,
    testCases: [
      { input: 'bc = BlockCache(2); bc.read(1, lambda b: f"data{b}"); bc.read(2, lambda b: f"data{b}"); bc.read(1, lambda b: "new")', expectedOutput: '"data1"', isHidden: false, description: 'Cache hit' },
      { input: 'bc = BlockCache(2); bc.write(1, "x"); 1 in bc.cache', expectedOutput: 'True', isHidden: false, description: 'Write to cache' }
    ],
    hints: ['Use LRU for eviction', 'Track dirty flag for write-back']
  }
];
