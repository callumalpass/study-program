import { CodingExercise } from '../../../../core/types';

export const cs301Topic1Exercises: CodingExercise[] = [
  // 1. Process States
  {
    id: 'cs301-ex-1-1',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Process State Validator',
    description: 'Write a function that validates process state transitions. Return True if the transition from `from_state` to `to_state` is valid.',
    difficulty: 1,
    language: 'python',
    starterCode: 'def is_valid_transition(from_state, to_state):\n    # Valid states: "new", "ready", "running", "waiting", "terminated"\n    pass',
    solution: `def is_valid_transition(from_state, to_state):
    valid_transitions = {
        "new": ["ready"],
        "ready": ["running"],
        "running": ["ready", "waiting", "terminated"],
        "waiting": ["ready"],
        "terminated": []
    }
    return to_state in valid_transitions.get(from_state, [])`,
    testCases: [
      { input: '"ready", "running"', expectedOutput: 'True', isHidden: false, description: 'Ready to running' },
      { input: '"waiting", "running"', expectedOutput: 'False', isHidden: false, description: 'Invalid: waiting to running' },
      { input: '"running", "terminated"', expectedOutput: 'True', isHidden: true, description: 'Running to terminated' }
    ],
    hints: ['Define a dictionary of valid transitions', 'Check if to_state is in the list for from_state']
  },
  // 2. PCB Structure
  {
    id: 'cs301-ex-1-2',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Process Control Block',
    description: 'Implement a ProcessControlBlock class with pid, state, program_counter, and registers. Include a method to save and restore state.',
    difficulty: 2,
    language: 'python',
    starterCode: 'class ProcessControlBlock:\n    def __init__(self, pid):\n        pass\n    \n    def save_state(self, pc, registers):\n        pass\n    \n    def restore_state(self):\n        # Return (pc, registers)\n        pass',
    solution: `class ProcessControlBlock:
    def __init__(self, pid):
        self.pid = pid
        self.state = "new"
        self.program_counter = 0
        self.registers = {}

    def save_state(self, pc, registers):
        self.program_counter = pc
        self.registers = registers.copy()

    def restore_state(self):
        return (self.program_counter, self.registers.copy())`,
    testCases: [
      { input: 'pcb = ProcessControlBlock(1); pcb.save_state(100, {"eax": 5}); pcb.restore_state()', expectedOutput: '(100, {"eax": 5})', isHidden: false, description: 'Save and restore' },
      { input: 'pcb = ProcessControlBlock(2); pcb.state', expectedOutput: '"new"', isHidden: false, description: 'Initial state' }
    ],
    hints: ['Initialize all fields in __init__', 'Copy registers to avoid aliasing']
  },
  // 3. Process Queue
  {
    id: 'cs301-ex-1-3',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Ready Queue',
    description: 'Implement a ready queue for processes with enqueue, dequeue, and is_empty operations.',
    difficulty: 1,
    language: 'python',
    starterCode: 'class ReadyQueue:\n    def __init__(self):\n        pass\n    \n    def enqueue(self, process_id):\n        pass\n    \n    def dequeue(self):\n        # Return process_id or None if empty\n        pass\n    \n    def is_empty(self):\n        pass',
    solution: `class ReadyQueue:
    def __init__(self):
        self.queue = []

    def enqueue(self, process_id):
        self.queue.append(process_id)

    def dequeue(self):
        if self.queue:
            return self.queue.pop(0)
        return None

    def is_empty(self):
        return len(self.queue) == 0`,
    testCases: [
      { input: 'q = ReadyQueue(); q.enqueue(1); q.enqueue(2); q.dequeue()', expectedOutput: '1', isHidden: false, description: 'FIFO order' },
      { input: 'q = ReadyQueue(); q.is_empty()', expectedOutput: 'True', isHidden: false, description: 'Empty check' }
    ],
    hints: ['Use a list as the underlying storage', 'pop(0) removes the first element']
  },
  // 4. Context Switch Counter
  {
    id: 'cs301-ex-1-4',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Context Switch Simulation',
    description: 'Simulate context switches. Given a list of (process_id, burst_time) and a time quantum, count the number of context switches.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def count_context_switches(processes, quantum):\n    # processes: list of (pid, burst_time)\n    # Return number of context switches\n    pass',
    solution: `def count_context_switches(processes, quantum):
    from collections import deque
    queue = deque()
    for pid, burst in processes:
        queue.append([pid, burst])

    switches = 0
    while queue:
        pid, remaining = queue.popleft()
        if remaining > quantum:
            queue.append([pid, remaining - quantum])
            switches += 1
        else:
            if queue:  # More processes to run
                switches += 1
    return switches`,
    testCases: [
      { input: '[(1, 10), (2, 5)], 3', expectedOutput: '4', isHidden: false, description: 'Two processes' },
      { input: '[(1, 5)], 10', expectedOutput: '0', isHidden: false, description: 'Single process, no switch' }
    ],
    hints: ['Use Round Robin logic', 'Count switches when moving to next process']
  },
  // 5. Fork Simulation
  {
    id: 'cs301-ex-1-5',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Fork Tree',
    description: 'Calculate how many processes exist after n fork() calls in sequence (each process forks once).',
    difficulty: 2,
    language: 'python',
    starterCode: 'def count_processes_after_forks(n):\n    # Return total number of processes after n sequential forks\n    pass',
    solution: `def count_processes_after_forks(n):
    # Each fork doubles the number of processes
    return 2 ** n`,
    testCases: [
      { input: '3', expectedOutput: '8', isHidden: false, description: 'Three forks' },
      { input: '0', expectedOutput: '1', isHidden: false, description: 'No forks' },
      { input: '5', expectedOutput: '32', isHidden: true, description: 'Five forks' }
    ],
    hints: ['Each fork doubles the process count', 'Think exponentially']
  },
  // 6. Process Tree
  {
    id: 'cs301-ex-1-6',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Process Tree Depth',
    description: 'Given a parent-child relationship dict, find the depth of a given process from the root (pid 1).',
    difficulty: 3,
    language: 'python',
    starterCode: 'def process_depth(parent_map, pid):\n    # parent_map[child] = parent\n    # Return depth from root (pid 1 has depth 0)\n    pass',
    solution: `def process_depth(parent_map, pid):
    depth = 0
    current = pid
    while current != 1:
        if current not in parent_map:
            return -1  # Not connected to root
        current = parent_map[current]
        depth += 1
    return depth`,
    testCases: [
      { input: '{2: 1, 3: 1, 4: 2, 5: 2}, 5', expectedOutput: '2', isHidden: false, description: 'Depth 2' },
      { input: '{2: 1}, 1', expectedOutput: '0', isHidden: false, description: 'Root process' }
    ],
    hints: ['Traverse up to root', 'Count steps']
  },
  // 7. Shared Memory Region
  {
    id: 'cs301-ex-1-7',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Shared Memory Buffer',
    description: 'Implement a simple shared memory buffer with read and write operations. Buffer has fixed size.',
    difficulty: 2,
    language: 'python',
    starterCode: 'class SharedMemory:\n    def __init__(self, size):\n        pass\n    \n    def write(self, offset, data):\n        # Write data at offset, return True if successful\n        pass\n    \n    def read(self, offset, length):\n        # Read length bytes from offset\n        pass',
    solution: `class SharedMemory:
    def __init__(self, size):
        self.buffer = [0] * size
        self.size = size

    def write(self, offset, data):
        if offset < 0 or offset + len(data) > self.size:
            return False
        for i, byte in enumerate(data):
            self.buffer[offset + i] = byte
        return True

    def read(self, offset, length):
        if offset < 0 or offset + length > self.size:
            return None
        return self.buffer[offset:offset + length]`,
    testCases: [
      { input: 'sm = SharedMemory(10); sm.write(0, [1,2,3]); sm.read(0, 3)', expectedOutput: '[1, 2, 3]', isHidden: false, description: 'Write and read' },
      { input: 'sm = SharedMemory(5); sm.write(3, [1,2,3])', expectedOutput: 'False', isHidden: false, description: 'Out of bounds' }
    ],
    hints: ['Check bounds before operations', 'Use a list for the buffer']
  },
  // 8. Message Queue
  {
    id: 'cs301-ex-1-8',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Message Passing Queue',
    description: 'Implement a message queue for IPC with send and receive operations.',
    difficulty: 2,
    language: 'python',
    starterCode: 'class MessageQueue:\n    def __init__(self):\n        pass\n    \n    def send(self, sender_id, message):\n        pass\n    \n    def receive(self):\n        # Return (sender_id, message) or None\n        pass',
    solution: `class MessageQueue:
    def __init__(self):
        self.messages = []

    def send(self, sender_id, message):
        self.messages.append((sender_id, message))

    def receive(self):
        if self.messages:
            return self.messages.pop(0)
        return None`,
    testCases: [
      { input: 'mq = MessageQueue(); mq.send(1, "hello"); mq.receive()', expectedOutput: '(1, "hello")', isHidden: false, description: 'Send and receive' },
      { input: 'mq = MessageQueue(); mq.receive()', expectedOutput: 'None', isHidden: false, description: 'Empty queue' }
    ],
    hints: ['Store tuples of (sender, message)', 'FIFO order']
  },
  // 9. Process Scheduler Simulator
  {
    id: 'cs301-ex-1-9',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'FCFS Scheduler',
    description: 'Implement FCFS scheduler. Given arrival times and burst times, return the order of completion.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def fcfs_schedule(processes):\n    # processes: list of (pid, arrival_time, burst_time)\n    # Return list of pids in completion order\n    pass',
    solution: `def fcfs_schedule(processes):
    # Sort by arrival time
    sorted_procs = sorted(processes, key=lambda x: (x[1], x[0]))
    return [p[0] for p in sorted_procs]`,
    testCases: [
      { input: '[(1, 0, 5), (2, 1, 3), (3, 2, 1)]', expectedOutput: '[1, 2, 3]', isHidden: false, description: 'Sequential arrival' },
      { input: '[(1, 2, 5), (2, 0, 3)]', expectedOutput: '[2, 1]', isHidden: false, description: 'P2 arrives first' }
    ],
    hints: ['Sort by arrival time', 'FCFS is non-preemptive']
  },
  // 10. Zombie Process Detector
  {
    id: 'cs301-ex-1-10',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Zombie Process Detection',
    description: 'Given process info, identify zombie processes (terminated but parent hasn\'t called wait).',
    difficulty: 2,
    language: 'python',
    starterCode: 'def find_zombies(processes, waited_pids):\n    # processes: list of (pid, state) where state is "running" or "terminated"\n    # waited_pids: set of pids that parent has waited on\n    # Return list of zombie pids\n    pass',
    solution: `def find_zombies(processes, waited_pids):
    zombies = []
    for pid, state in processes:
        if state == "terminated" and pid not in waited_pids:
            zombies.append(pid)
    return zombies`,
    testCases: [
      { input: '[(1, "terminated"), (2, "running"), (3, "terminated")], {1}', expectedOutput: '[3]', isHidden: false, description: 'One zombie' },
      { input: '[(1, "terminated")], {1}', expectedOutput: '[]', isHidden: false, description: 'No zombies' }
    ],
    hints: ['Zombie = terminated but not waited on', 'Check both conditions']
  },
  // 11. Orphan Process Handler
  {
    id: 'cs301-ex-1-11',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Orphan Process Adoption',
    description: 'Reparent orphan processes to init (pid 1). Return updated parent map.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def adopt_orphans(parent_map, terminated_pids):\n    # parent_map: {child: parent}\n    # terminated_pids: set of terminated parent pids\n    # Return new parent_map with orphans reparented to 1\n    pass',
    solution: `def adopt_orphans(parent_map, terminated_pids):
    new_map = {}
    for child, parent in parent_map.items():
        if parent in terminated_pids:
            new_map[child] = 1  # Adopt by init
        else:
            new_map[child] = parent
    return new_map`,
    testCases: [
      { input: '{2: 1, 3: 2, 4: 2}, {2}', expectedOutput: '{2: 1, 3: 1, 4: 1}', isHidden: false, description: 'Orphans adopted' },
      { input: '{2: 1}, set()', expectedOutput: '{2: 1}', isHidden: false, description: 'No orphans' }
    ],
    hints: ['Check if parent is terminated', 'Reparent to pid 1']
  },
  // 12. Process Memory Layout
  {
    id: 'cs301-ex-1-12',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Memory Layout Calculator',
    description: 'Calculate total process memory given sizes of text, data, heap, and stack segments.',
    difficulty: 1,
    language: 'python',
    starterCode: 'def calculate_process_memory(text, data, heap, stack):\n    # Return total memory in bytes\n    pass',
    solution: `def calculate_process_memory(text, data, heap, stack):
    return text + data + heap + stack`,
    testCases: [
      { input: '1024, 512, 2048, 1024', expectedOutput: '4608', isHidden: false, description: 'Sum of segments' },
      { input: '0, 0, 0, 0', expectedOutput: '0', isHidden: false, description: 'Empty process' }
    ],
    hints: ['Simply add all segments', 'Each segment is independent']
  },
  // 13. Process Priority Queue
  {
    id: 'cs301-ex-1-13',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Priority Ready Queue',
    description: 'Implement a priority-based ready queue where lower number = higher priority.',
    difficulty: 3,
    language: 'python',
    starterCode: 'import heapq\n\nclass PriorityReadyQueue:\n    def __init__(self):\n        pass\n    \n    def enqueue(self, pid, priority):\n        pass\n    \n    def dequeue(self):\n        # Return pid of highest priority process\n        pass',
    solution: `import heapq

class PriorityReadyQueue:
    def __init__(self):
        self.heap = []

    def enqueue(self, pid, priority):
        heapq.heappush(self.heap, (priority, pid))

    def dequeue(self):
        if self.heap:
            priority, pid = heapq.heappop(self.heap)
            return pid
        return None`,
    testCases: [
      { input: 'pq = PriorityReadyQueue(); pq.enqueue(1, 5); pq.enqueue(2, 1); pq.dequeue()', expectedOutput: '2', isHidden: false, description: 'Higher priority first' },
      { input: 'pq = PriorityReadyQueue(); pq.dequeue()', expectedOutput: 'None', isHidden: false, description: 'Empty queue' }
    ],
    hints: ['Use heapq for min-heap', 'Store (priority, pid) tuples']
  },
  // 14. IPC Pipe
  {
    id: 'cs301-ex-1-14',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Simple Pipe',
    description: 'Implement a unidirectional pipe with fixed buffer size.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class Pipe:\n    def __init__(self, buffer_size):\n        pass\n    \n    def write(self, data):\n        # Return number of bytes written (0 if full)\n        pass\n    \n    def read(self, n):\n        # Return up to n bytes\n        pass',
    solution: `class Pipe:
    def __init__(self, buffer_size):
        self.buffer = []
        self.max_size = buffer_size

    def write(self, data):
        space = self.max_size - len(self.buffer)
        to_write = data[:space]
        self.buffer.extend(to_write)
        return len(to_write)

    def read(self, n):
        result = self.buffer[:n]
        self.buffer = self.buffer[n:]
        return result`,
    testCases: [
      { input: 'p = Pipe(5); p.write([1,2,3]); p.read(2)', expectedOutput: '[1, 2]', isHidden: false, description: 'Write then read' },
      { input: 'p = Pipe(2); p.write([1,2,3,4])', expectedOutput: '2', isHidden: false, description: 'Buffer full' }
    ],
    hints: ['Track buffer capacity', 'Handle partial writes']
  },
  // 15. Process Hierarchy
  {
    id: 'cs301-ex-1-15',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Count Descendants',
    description: 'Count all descendants (children, grandchildren, etc.) of a process.',
    difficulty: 4,
    language: 'python',
    starterCode: 'def count_descendants(parent_map, pid):\n    # parent_map: {child: parent}\n    # Return count of all descendants of pid\n    pass',
    solution: `def count_descendants(parent_map, pid):
    # Build children map
    children = {}
    for child, parent in parent_map.items():
        if parent not in children:
            children[parent] = []
        children[parent].append(child)

    # DFS to count descendants
    def dfs(p):
        count = 0
        for child in children.get(p, []):
            count += 1 + dfs(child)
        return count

    return dfs(pid)`,
    testCases: [
      { input: '{2: 1, 3: 1, 4: 2, 5: 2, 6: 4}, 1', expectedOutput: '5', isHidden: false, description: 'All from root' },
      { input: '{2: 1, 3: 1, 4: 2, 5: 2, 6: 4}, 2', expectedOutput: '3', isHidden: false, description: 'Subtree' }
    ],
    hints: ['Build a children map first', 'Use DFS to count']
  },
  // 16. Exec Simulation
  {
    id: 'cs301-ex-1-16',
    subjectId: 'cs301',
    topicId: 'cs301-t1',
    title: 'Exec System Call',
    description: 'Simulate exec() by replacing process image. Return the new process state after exec.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def exec_process(pcb, new_program, new_args):\n    # pcb: dict with pid, program, args, state\n    # Return updated pcb (keep pid, update rest)\n    pass',
    solution: `def exec_process(pcb, new_program, new_args):
    return {
        'pid': pcb['pid'],
        'program': new_program,
        'args': new_args,
        'state': 'running',
        'program_counter': 0,
        'registers': {}
    }`,
    testCases: [
      { input: '{"pid": 1, "program": "a", "args": []}, "b", ["x"]', expectedOutput: '{"pid": 1, "program": "b", "args": ["x"], "state": "running", "program_counter": 0, "registers": {}}', isHidden: false, description: 'Exec replaces program' },
      { input: '{"pid": 5, "program": "old", "args": ["y"]}, "new", []', expectedOutput: '{"pid": 5, "program": "new", "args": [], "state": "running", "program_counter": 0, "registers": {}}', isHidden: false, description: 'Keep pid' }
    ],
    hints: ['Keep the pid unchanged', 'Reset program counter and registers']
  }
];
