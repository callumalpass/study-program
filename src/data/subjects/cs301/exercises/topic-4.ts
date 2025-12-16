import { CodingExercise } from '../../../../core/types';

export const cs301Topic4Exercises: CodingExercise[] = [
  // 1. Race Condition Detection
  {
    id: 'cs301-ex-4-1',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Race Condition Check',
    description: 'Given operations from two threads, detect if a race condition could occur.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def has_race_condition(thread1_ops, thread2_ops, shared_vars):\n    # ops are lists of ("read", var) or ("write", var)\n    # Return True if race condition possible\n    pass',
    solution: `def has_race_condition(thread1_ops, thread2_ops, shared_vars):
    t1_writes = {var for op, var in thread1_ops if op == "write" and var in shared_vars}
    t2_writes = {var for op, var in thread2_ops if op == "write" and var in shared_vars}
    t1_reads = {var for op, var in thread1_ops if op == "read" and var in shared_vars}
    t2_reads = {var for op, var in thread2_ops if op == "read" and var in shared_vars}

    # Race: write-write or read-write on same variable
    if t1_writes & t2_writes:
        return True
    if t1_writes & t2_reads or t2_writes & t1_reads:
        return True
    return False`,
    testCases: [
      { input: '[("read", "x"), ("write", "x")], [("write", "x")], {"x"}', expectedOutput: 'True', isHidden: false, description: 'Write-write race' },
      { input: '[("read", "x")], [("read", "x")], {"x"}', expectedOutput: 'False', isHidden: false, description: 'Read-read no race' }
    ],
    hints: ['Race requires at least one write', 'Check write-write and read-write conflicts']
  },
  // 2. Critical Section Check
  {
    id: 'cs301-ex-4-2',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Critical Section Validator',
    description: 'Check if a solution satisfies mutual exclusion given execution traces.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def validates_mutual_exclusion(traces):\n    # traces: list of (time, thread_id, "enter"|"exit")\n    # Return True if at most one thread in CS at any time\n    pass',
    solution: `def validates_mutual_exclusion(traces):
    sorted_traces = sorted(traces, key=lambda x: x[0])
    in_cs = set()
    for time, tid, action in sorted_traces:
        if action == "enter":
            if in_cs:  # Someone already in CS
                return False
            in_cs.add(tid)
        else:  # exit
            in_cs.discard(tid)
    return True`,
    testCases: [
      { input: '[(0, 1, "enter"), (5, 1, "exit"), (6, 2, "enter")]', expectedOutput: 'True', isHidden: false, description: 'Sequential access' },
      { input: '[(0, 1, "enter"), (2, 2, "enter"), (5, 1, "exit")]', expectedOutput: 'False', isHidden: false, description: 'Overlap violation' }
    ],
    hints: ['Sort by time', 'Track who is in CS']
  },
  // 3. Mutex Implementation
  {
    id: 'cs301-ex-4-3',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Simple Mutex',
    description: 'Implement a mutex with lock and unlock operations.',
    difficulty: 2,
    language: 'python',
    starterCode: 'class Mutex:\n    def __init__(self):\n        pass\n    \n    def lock(self, thread_id):\n        # Return True if acquired, False if already held\n        pass\n    \n    def unlock(self, thread_id):\n        # Return True if released, False if not owner\n        pass\n    \n    def is_locked(self):\n        pass',
    solution: `class Mutex:
    def __init__(self):
        self.owner = None

    def lock(self, thread_id):
        if self.owner is None:
            self.owner = thread_id
            return True
        return False

    def unlock(self, thread_id):
        if self.owner == thread_id:
            self.owner = None
            return True
        return False

    def is_locked(self):
        return self.owner is not None`,
    testCases: [
      { input: 'm = Mutex(); m.lock(1)', expectedOutput: 'True', isHidden: false, description: 'Acquire free lock' },
      { input: 'm = Mutex(); m.lock(1); m.lock(2)', expectedOutput: 'False', isHidden: false, description: 'Already held' },
      { input: 'm = Mutex(); m.lock(1); m.unlock(2)', expectedOutput: 'False', isHidden: true, description: 'Wrong owner' }
    ],
    hints: ['Track the owner', 'Only owner can unlock']
  },
  // 4. Counting Semaphore
  {
    id: 'cs301-ex-4-4',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Counting Semaphore',
    description: 'Implement a counting semaphore with wait and signal operations.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class Semaphore:\n    def __init__(self, initial):\n        pass\n    \n    def wait(self):\n        # Return True if acquired, False if would block\n        pass\n    \n    def signal(self):\n        pass\n    \n    def get_value(self):\n        pass',
    solution: `class Semaphore:
    def __init__(self, initial):
        self.value = initial

    def wait(self):
        if self.value > 0:
            self.value -= 1
            return True
        return False

    def signal(self):
        self.value += 1

    def get_value(self):
        return self.value`,
    testCases: [
      { input: 's = Semaphore(2); s.wait(); s.wait(); s.wait()', expectedOutput: 'False', isHidden: false, description: 'Semaphore exhausted' },
      { input: 's = Semaphore(0); s.signal(); s.wait()', expectedOutput: 'True', isHidden: false, description: 'Signal then wait' }
    ],
    hints: ['Wait decrements if positive', 'Signal always increments']
  },
  // 5. Producer-Consumer Buffer
  {
    id: 'cs301-ex-4-5',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Bounded Buffer',
    description: 'Implement a bounded buffer for producer-consumer with size tracking.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class BoundedBuffer:\n    def __init__(self, capacity):\n        pass\n    \n    def produce(self, item):\n        # Return True if added, False if full\n        pass\n    \n    def consume(self):\n        # Return item or None if empty\n        pass\n    \n    def is_empty(self):\n        pass\n    \n    def is_full(self):\n        pass',
    solution: `class BoundedBuffer:
    def __init__(self, capacity):
        self.capacity = capacity
        self.buffer = []

    def produce(self, item):
        if len(self.buffer) < self.capacity:
            self.buffer.append(item)
            return True
        return False

    def consume(self):
        if self.buffer:
            return self.buffer.pop(0)
        return None

    def is_empty(self):
        return len(self.buffer) == 0

    def is_full(self):
        return len(self.buffer) >= self.capacity`,
    testCases: [
      { input: 'bb = BoundedBuffer(2); bb.produce(1); bb.produce(2); bb.produce(3)', expectedOutput: 'False', isHidden: false, description: 'Buffer full' },
      { input: 'bb = BoundedBuffer(2); bb.produce(1); bb.consume()', expectedOutput: '1', isHidden: false, description: 'Produce and consume' }
    ],
    hints: ['Check capacity before producing', 'FIFO order']
  },
  // 6. Readers-Writers Count
  {
    id: 'cs301-ex-4-6',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Readers-Writers Counter',
    description: 'Track readers and writers for readers-writers problem.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class ReadersWriters:\n    def __init__(self):\n        pass\n    \n    def start_read(self):\n        # Return True if can start reading\n        pass\n    \n    def end_read(self):\n        pass\n    \n    def start_write(self):\n        # Return True if can start writing\n        pass\n    \n    def end_write(self):\n        pass',
    solution: `class ReadersWriters:
    def __init__(self):
        self.readers = 0
        self.writer = False

    def start_read(self):
        if not self.writer:
            self.readers += 1
            return True
        return False

    def end_read(self):
        if self.readers > 0:
            self.readers -= 1

    def start_write(self):
        if self.readers == 0 and not self.writer:
            self.writer = True
            return True
        return False

    def end_write(self):
        self.writer = False`,
    testCases: [
      { input: 'rw = ReadersWriters(); rw.start_read(); rw.start_read()', expectedOutput: 'True', isHidden: false, description: 'Multiple readers OK' },
      { input: 'rw = ReadersWriters(); rw.start_read(); rw.start_write()', expectedOutput: 'False', isHidden: false, description: 'No write while reading' },
      { input: 'rw = ReadersWriters(); rw.start_write(); rw.start_read()', expectedOutput: 'False', isHidden: true, description: 'No read while writing' }
    ],
    hints: ['Multiple readers allowed', 'Writer needs exclusive access']
  },
  // 7. Dining Philosophers State
  {
    id: 'cs301-ex-4-7',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Dining Philosophers State',
    description: 'Track fork states for dining philosophers problem.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class DiningTable:\n    def __init__(self, n):\n        # n philosophers, n forks\n        pass\n    \n    def pickup_forks(self, philosopher_id):\n        # Try to pick up both forks, return True if successful\n        pass\n    \n    def putdown_forks(self, philosopher_id):\n        pass\n    \n    def can_eat(self, philosopher_id):\n        pass',
    solution: `class DiningTable:
    def __init__(self, n):
        self.n = n
        self.forks = [None] * n  # None = free, else holder id

    def pickup_forks(self, philosopher_id):
        left = philosopher_id
        right = (philosopher_id + 1) % self.n
        if self.forks[left] is None and self.forks[right] is None:
            self.forks[left] = philosopher_id
            self.forks[right] = philosopher_id
            return True
        return False

    def putdown_forks(self, philosopher_id):
        left = philosopher_id
        right = (philosopher_id + 1) % self.n
        if self.forks[left] == philosopher_id:
            self.forks[left] = None
        if self.forks[right] == philosopher_id:
            self.forks[right] = None

    def can_eat(self, philosopher_id):
        left = philosopher_id
        right = (philosopher_id + 1) % self.n
        return self.forks[left] == philosopher_id and self.forks[right] == philosopher_id`,
    testCases: [
      { input: 'dt = DiningTable(5); dt.pickup_forks(0)', expectedOutput: 'True', isHidden: false, description: 'Pick up free forks' },
      { input: 'dt = DiningTable(5); dt.pickup_forks(0); dt.pickup_forks(1)', expectedOutput: 'False', isHidden: false, description: 'Neighbor conflict' }
    ],
    hints: ['Each philosopher needs two adjacent forks', 'Both forks must be free']
  },
  // 8. Condition Variable
  {
    id: 'cs301-ex-4-8',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Condition Variable Queue',
    description: 'Implement a simple condition variable wait queue.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class ConditionVariable:\n    def __init__(self):\n        pass\n    \n    def wait(self, thread_id):\n        # Add thread to wait queue\n        pass\n    \n    def signal(self):\n        # Wake one thread, return its id or None\n        pass\n    \n    def broadcast(self):\n        # Wake all threads, return list of ids\n        pass',
    solution: `class ConditionVariable:
    def __init__(self):
        self.wait_queue = []

    def wait(self, thread_id):
        self.wait_queue.append(thread_id)

    def signal(self):
        if self.wait_queue:
            return self.wait_queue.pop(0)
        return None

    def broadcast(self):
        all_waiting = self.wait_queue[:]
        self.wait_queue.clear()
        return all_waiting`,
    testCases: [
      { input: 'cv = ConditionVariable(); cv.wait(1); cv.wait(2); cv.signal()', expectedOutput: '1', isHidden: false, description: 'FIFO wakeup' },
      { input: 'cv = ConditionVariable(); cv.wait(1); cv.wait(2); cv.broadcast()', expectedOutput: '[1, 2]', isHidden: false, description: 'Wake all' }
    ],
    hints: ['Wait adds to queue', 'Signal wakes first, broadcast wakes all']
  },
  // 9. Deadlock Detection Setup
  {
    id: 'cs301-ex-4-9',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Lock Ordering Check',
    description: 'Check if locks are acquired in consistent order (for deadlock prevention).',
    difficulty: 3,
    language: 'python',
    starterCode: 'def consistent_lock_order(sequences):\n    # sequences: list of lock acquisition sequences per thread\n    # Each sequence is list of lock ids\n    # Return True if all follow consistent ordering\n    pass',
    solution: `def consistent_lock_order(sequences):
    # Build a partial order from each sequence
    order_constraints = set()
    for seq in sequences:
        for i in range(len(seq)):
            for j in range(i + 1, len(seq)):
                order_constraints.add((seq[i], seq[j]))

    # Check for conflicts (a < b and b < a)
    for a, b in order_constraints:
        if (b, a) in order_constraints:
            return False
    return True`,
    testCases: [
      { input: '[[1, 2, 3], [1, 2]]', expectedOutput: 'True', isHidden: false, description: 'Consistent order' },
      { input: '[[1, 2], [2, 1]]', expectedOutput: 'False', isHidden: false, description: 'Conflicting order' }
    ],
    hints: ['Build ordering constraints', 'Check for cycles in order']
  },
  // 10. Spinlock Counter
  {
    id: 'cs301-ex-4-10',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Spinlock with Retry Count',
    description: 'Implement a spinlock that tracks spin attempts.',
    difficulty: 2,
    language: 'python',
    starterCode: 'class Spinlock:\n    def __init__(self):\n        pass\n    \n    def try_lock(self, thread_id):\n        # Return True if acquired, False otherwise\n        pass\n    \n    def unlock(self, thread_id):\n        pass\n    \n    def get_contention_count(self):\n        # Return number of failed lock attempts\n        pass',
    solution: `class Spinlock:
    def __init__(self):
        self.owner = None
        self.contention_count = 0

    def try_lock(self, thread_id):
        if self.owner is None:
            self.owner = thread_id
            return True
        self.contention_count += 1
        return False

    def unlock(self, thread_id):
        if self.owner == thread_id:
            self.owner = None

    def get_contention_count(self):
        return self.contention_count`,
    testCases: [
      { input: 'sl = Spinlock(); sl.try_lock(1); sl.try_lock(2); sl.get_contention_count()', expectedOutput: '1', isHidden: false, description: 'One contention' },
      { input: 'sl = Spinlock(); sl.try_lock(1)', expectedOutput: 'True', isHidden: false, description: 'Acquire free lock' }
    ],
    hints: ['Track failed attempts', 'Only count failures']
  },
  // 11. Monitor
  {
    id: 'cs301-ex-4-11',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Simple Monitor',
    description: 'Implement a monitor with entry and exit tracking.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class Monitor:\n    def __init__(self):\n        pass\n    \n    def enter(self, thread_id):\n        # Return True if entered, False if already occupied\n        pass\n    \n    def exit(self, thread_id):\n        # Return True if exited, False if not inside\n        pass\n    \n    def get_occupant(self):\n        pass',
    solution: `class Monitor:
    def __init__(self):
        self.occupant = None

    def enter(self, thread_id):
        if self.occupant is None:
            self.occupant = thread_id
            return True
        return False

    def exit(self, thread_id):
        if self.occupant == thread_id:
            self.occupant = None
            return True
        return False

    def get_occupant(self):
        return self.occupant`,
    testCases: [
      { input: 'm = Monitor(); m.enter(1); m.enter(2)', expectedOutput: 'False', isHidden: false, description: 'Only one inside' },
      { input: 'm = Monitor(); m.enter(1); m.exit(1); m.enter(2)', expectedOutput: 'True', isHidden: false, description: 'Exit then enter' }
    ],
    hints: ['One thread at a time', 'Track current occupant']
  },
  // 12. Test-and-Set
  {
    id: 'cs301-ex-4-12',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Test-and-Set Lock',
    description: 'Implement a lock using test-and-set semantics.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class TASLock:\n    def __init__(self):\n        pass\n    \n    def test_and_set(self):\n        # Return old value and set to True\n        pass\n    \n    def acquire(self):\n        # Return True if acquired\n        pass\n    \n    def release(self):\n        pass',
    solution: `class TASLock:
    def __init__(self):
        self.locked = False

    def test_and_set(self):
        old = self.locked
        self.locked = True
        return old

    def acquire(self):
        old = self.test_and_set()
        return not old  # Acquired if old was False

    def release(self):
        self.locked = False`,
    testCases: [
      { input: 'tas = TASLock(); tas.acquire()', expectedOutput: 'True', isHidden: false, description: 'First acquire' },
      { input: 'tas = TASLock(); tas.acquire(); tas.acquire()', expectedOutput: 'False', isHidden: false, description: 'Already held' }
    ],
    hints: ['TAS returns old value and sets to true', 'Acquired if old was false']
  },
  // 13. Compare-and-Swap
  {
    id: 'cs301-ex-4-13',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Compare-and-Swap',
    description: 'Implement CAS operation and use it for atomic increment.',
    difficulty: 4,
    language: 'python',
    starterCode: 'class AtomicInteger:\n    def __init__(self, initial):\n        pass\n    \n    def compare_and_swap(self, expected, new_value):\n        # Return True if swapped, False otherwise\n        pass\n    \n    def get(self):\n        pass\n    \n    def atomic_increment(self):\n        # Increment using CAS, return new value\n        pass',
    solution: `class AtomicInteger:
    def __init__(self, initial):
        self.value = initial

    def compare_and_swap(self, expected, new_value):
        if self.value == expected:
            self.value = new_value
            return True
        return False

    def get(self):
        return self.value

    def atomic_increment(self):
        while True:
            old = self.value
            if self.compare_and_swap(old, old + 1):
                return old + 1`,
    testCases: [
      { input: 'ai = AtomicInteger(5); ai.compare_and_swap(5, 10); ai.get()', expectedOutput: '10', isHidden: false, description: 'CAS success' },
      { input: 'ai = AtomicInteger(5); ai.compare_and_swap(3, 10); ai.get()', expectedOutput: '5', isHidden: false, description: 'CAS fail' }
    ],
    hints: ['CAS only swaps if current == expected', 'Retry loop for increment']
  },
  // 14. Barrier Synchronization
  {
    id: 'cs301-ex-4-14',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Reusable Barrier',
    description: 'Implement a reusable barrier that resets after all threads pass.',
    difficulty: 4,
    language: 'python',
    starterCode: 'class ReusableBarrier:\n    def __init__(self, n):\n        pass\n    \n    def arrive(self, thread_id):\n        # Return barrier round number when released\n        pass\n    \n    def get_round(self):\n        pass',
    solution: `class ReusableBarrier:
    def __init__(self, n):
        self.n = n
        self.count = 0
        self.round = 0

    def arrive(self, thread_id):
        self.count += 1
        if self.count >= self.n:
            self.round += 1
            self.count = 0
            return self.round
        # In real impl, would wait here
        return self.round

    def get_round(self):
        return self.round`,
    testCases: [
      { input: 'rb = ReusableBarrier(2); rb.arrive(1); rb.arrive(2)', expectedOutput: '1', isHidden: false, description: 'First round complete' },
      { input: 'rb = ReusableBarrier(2); rb.arrive(1); rb.arrive(2); rb.arrive(1); rb.arrive(2)', expectedOutput: '2', isHidden: false, description: 'Second round' }
    ],
    hints: ['Reset count when all arrive', 'Increment round number']
  },
  // 15. Lock-Free Stack
  {
    id: 'cs301-ex-4-15',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Lock-Free Stack Simulation',
    description: 'Simulate a lock-free stack using CAS operations.',
    difficulty: 5,
    language: 'python',
    starterCode: 'class LockFreeStack:\n    def __init__(self):\n        pass\n    \n    def push(self, value):\n        pass\n    \n    def pop(self):\n        # Return value or None if empty\n        pass\n    \n    def peek(self):\n        pass',
    solution: `class LockFreeStack:
    def __init__(self):
        self.head = None  # (value, next)

    def push(self, value):
        while True:
            old_head = self.head
            new_node = (value, old_head)
            # CAS simulation
            if self.head == old_head:
                self.head = new_node
                return

    def pop(self):
        while True:
            old_head = self.head
            if old_head is None:
                return None
            # CAS simulation
            if self.head == old_head:
                self.head = old_head[1]
                return old_head[0]

    def peek(self):
        if self.head:
            return self.head[0]
        return None`,
    testCases: [
      { input: 'lfs = LockFreeStack(); lfs.push(1); lfs.push(2); lfs.pop()', expectedOutput: '2', isHidden: false, description: 'LIFO order' },
      { input: 'lfs = LockFreeStack(); lfs.pop()', expectedOutput: 'None', isHidden: false, description: 'Empty pop' }
    ],
    hints: ['Head points to top node', 'CAS on head pointer']
  },
  // 16. Priority Inheritance
  {
    id: 'cs301-ex-4-16',
    subjectId: 'cs301',
    topicId: 'cs301-t4',
    title: 'Priority Inheritance',
    description: 'Implement priority inheritance protocol for mutex.',
    difficulty: 4,
    language: 'python',
    starterCode: 'class PriorityMutex:\n    def __init__(self):\n        pass\n    \n    def lock(self, thread_id, priority):\n        # Return effective priority of holder (for inheritance)\n        pass\n    \n    def unlock(self, thread_id):\n        pass\n    \n    def get_holder_priority(self):\n        pass',
    solution: `class PriorityMutex:
    def __init__(self):
        self.holder = None
        self.holder_base_priority = None
        self.holder_effective_priority = None
        self.waiting = []  # (tid, priority)

    def lock(self, thread_id, priority):
        if self.holder is None:
            self.holder = thread_id
            self.holder_base_priority = priority
            self.holder_effective_priority = priority
            return priority
        # Priority inheritance
        self.waiting.append((thread_id, priority))
        if priority < self.holder_effective_priority:
            self.holder_effective_priority = priority
        return self.holder_effective_priority

    def unlock(self, thread_id):
        if self.holder == thread_id:
            self.holder = None
            self.holder_base_priority = None
            self.holder_effective_priority = None
            self.waiting.clear()

    def get_holder_priority(self):
        return self.holder_effective_priority`,
    testCases: [
      { input: 'pm = PriorityMutex(); pm.lock(1, 10); pm.lock(2, 1); pm.get_holder_priority()', expectedOutput: '1', isHidden: false, description: 'Priority boosted' },
      { input: 'pm = PriorityMutex(); pm.lock(1, 5); pm.get_holder_priority()', expectedOutput: '5', isHidden: false, description: 'No boost needed' }
    ],
    hints: ['Lower number = higher priority', 'Boost holder to max waiter priority']
  }
];
