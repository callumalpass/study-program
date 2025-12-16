import { CodingExercise } from '../../../../core/types';

export const cs301Topic2Exercises: CodingExercise[] = [
  // 1. Thread vs Process
  {
    id: 'cs301-ex-2-1',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Thread Resource Check',
    description: 'Given a resource type, return whether it\'s shared between threads or private to each thread.',
    difficulty: 1,
    language: 'python',
    starterCode: 'def is_shared_resource(resource):\n    # Return "shared" or "private"\n    # Resources: "code", "data", "heap", "stack", "registers", "pc"\n    pass',
    solution: `def is_shared_resource(resource):
    shared = {"code", "data", "heap"}
    private = {"stack", "registers", "pc"}
    if resource in shared:
        return "shared"
    elif resource in private:
        return "private"
    return "unknown"`,
    testCases: [
      { input: '"heap"', expectedOutput: '"shared"', isHidden: false, description: 'Heap is shared' },
      { input: '"stack"', expectedOutput: '"private"', isHidden: false, description: 'Stack is private' },
      { input: '"code"', expectedOutput: '"shared"', isHidden: true, description: 'Code is shared' }
    ],
    hints: ['Code, data, and heap are shared', 'Stack, registers, and PC are private']
  },
  // 2. Thread Creation
  {
    id: 'cs301-ex-2-2',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Thread Manager',
    description: 'Implement a ThreadManager that creates threads with unique IDs and tracks them.',
    difficulty: 2,
    language: 'python',
    starterCode: 'class ThreadManager:\n    def __init__(self):\n        pass\n    \n    def create_thread(self, name):\n        # Return thread_id\n        pass\n    \n    def get_thread_count(self):\n        pass\n    \n    def get_thread_name(self, thread_id):\n        pass',
    solution: `class ThreadManager:
    def __init__(self):
        self.threads = {}
        self.next_id = 1

    def create_thread(self, name):
        tid = self.next_id
        self.threads[tid] = name
        self.next_id += 1
        return tid

    def get_thread_count(self):
        return len(self.threads)

    def get_thread_name(self, thread_id):
        return self.threads.get(thread_id)`,
    testCases: [
      { input: 'tm = ThreadManager(); tm.create_thread("worker")', expectedOutput: '1', isHidden: false, description: 'First thread ID' },
      { input: 'tm = ThreadManager(); tm.create_thread("a"); tm.create_thread("b"); tm.get_thread_count()', expectedOutput: '2', isHidden: false, description: 'Count threads' }
    ],
    hints: ['Track threads in a dictionary', 'Auto-increment IDs']
  },
  // 3. Many-to-One Model
  {
    id: 'cs301-ex-2-3',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Threading Model Simulator',
    description: 'Simulate blocking behavior in many-to-one model. If one user thread blocks, all block.',
    difficulty: 2,
    language: 'python',
    starterCode: 'class ManyToOneModel:\n    def __init__(self, num_user_threads):\n        pass\n    \n    def block_thread(self, tid):\n        # Block thread tid, return number of blocked threads\n        pass\n    \n    def unblock_thread(self, tid):\n        pass',
    solution: `class ManyToOneModel:
    def __init__(self, num_user_threads):
        self.num_threads = num_user_threads
        self.blocked = set()
        self.all_blocked = False

    def block_thread(self, tid):
        self.blocked.add(tid)
        self.all_blocked = True  # In many-to-one, one block = all block
        return self.num_threads

    def unblock_thread(self, tid):
        self.blocked.discard(tid)
        if not self.blocked:
            self.all_blocked = False`,
    testCases: [
      { input: 'mm = ManyToOneModel(5); mm.block_thread(1)', expectedOutput: '5', isHidden: false, description: 'All threads blocked' },
      { input: 'mm = ManyToOneModel(3); mm.block_thread(1); mm.all_blocked', expectedOutput: 'True', isHidden: false, description: 'All blocked flag' }
    ],
    hints: ['One kernel thread for all user threads', 'Blocking one blocks all']
  },
  // 4. Thread Pool
  {
    id: 'cs301-ex-2-4',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Thread Pool Implementation',
    description: 'Implement a simple thread pool with a fixed number of workers and a task queue.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class ThreadPool:\n    def __init__(self, num_workers):\n        pass\n    \n    def submit_task(self, task_id):\n        pass\n    \n    def get_available_workers(self):\n        pass\n    \n    def complete_task(self):\n        # Complete one task, free a worker\n        pass',
    solution: `class ThreadPool:
    def __init__(self, num_workers):
        self.num_workers = num_workers
        self.busy_workers = 0
        self.task_queue = []

    def submit_task(self, task_id):
        if self.busy_workers < self.num_workers:
            self.busy_workers += 1
            return True  # Task started immediately
        else:
            self.task_queue.append(task_id)
            return False  # Task queued

    def get_available_workers(self):
        return self.num_workers - self.busy_workers

    def complete_task(self):
        if self.task_queue:
            self.task_queue.pop(0)
            return True  # Started queued task
        else:
            self.busy_workers = max(0, self.busy_workers - 1)
            return False  # Worker now idle`,
    testCases: [
      { input: 'tp = ThreadPool(2); tp.submit_task(1); tp.submit_task(2); tp.get_available_workers()', expectedOutput: '0', isHidden: false, description: 'All workers busy' },
      { input: 'tp = ThreadPool(1); tp.submit_task(1); tp.submit_task(2); len(tp.task_queue)', expectedOutput: '1', isHidden: false, description: 'Task queued' }
    ],
    hints: ['Track busy workers', 'Queue tasks when pool is full']
  },
  // 5. Thread Safety Check
  {
    id: 'cs301-ex-2-5',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Thread Safety Analyzer',
    description: 'Determine if a function is thread-safe based on its characteristics.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def is_thread_safe(uses_globals, uses_static, uses_locks, is_pure):\n    # Return True if thread-safe, False otherwise\n    pass',
    solution: `def is_thread_safe(uses_globals, uses_static, uses_locks, is_pure):
    # Pure functions are always thread-safe
    if is_pure:
        return True
    # Functions with globals/statics need locks
    if uses_globals or uses_static:
        return uses_locks
    # No shared state = thread-safe
    return True`,
    testCases: [
      { input: 'False, False, False, True', expectedOutput: 'True', isHidden: false, description: 'Pure function' },
      { input: 'True, False, False, False', expectedOutput: 'False', isHidden: false, description: 'Globals without locks' },
      { input: 'True, False, True, False', expectedOutput: 'True', isHidden: true, description: 'Globals with locks' }
    ],
    hints: ['Pure functions have no side effects', 'Shared state needs synchronization']
  },
  // 6. Thread Scheduling
  {
    id: 'cs301-ex-2-6',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'User Thread Scheduler',
    description: 'Implement a simple round-robin scheduler for user-level threads.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class UserThreadScheduler:\n    def __init__(self):\n        pass\n    \n    def add_thread(self, tid):\n        pass\n    \n    def get_next(self):\n        # Return next thread to run\n        pass\n    \n    def yield_thread(self):\n        # Current thread yields\n        pass',
    solution: `class UserThreadScheduler:
    def __init__(self):
        self.threads = []
        self.current_idx = 0

    def add_thread(self, tid):
        self.threads.append(tid)

    def get_next(self):
        if not self.threads:
            return None
        return self.threads[self.current_idx]

    def yield_thread(self):
        if self.threads:
            self.current_idx = (self.current_idx + 1) % len(self.threads)`,
    testCases: [
      { input: 'sch = UserThreadScheduler(); sch.add_thread(1); sch.add_thread(2); sch.get_next()', expectedOutput: '1', isHidden: false, description: 'First thread' },
      { input: 'sch = UserThreadScheduler(); sch.add_thread(1); sch.add_thread(2); sch.yield_thread(); sch.get_next()', expectedOutput: '2', isHidden: false, description: 'After yield' }
    ],
    hints: ['Use round-robin order', 'Wrap around at end']
  },
  // 7. Thread Local Storage
  {
    id: 'cs301-ex-2-7',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Thread Local Storage',
    description: 'Implement thread-local storage where each thread has its own copy of a variable.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class ThreadLocalStorage:\n    def __init__(self):\n        pass\n    \n    def set(self, thread_id, key, value):\n        pass\n    \n    def get(self, thread_id, key):\n        pass',
    solution: `class ThreadLocalStorage:
    def __init__(self):
        self.storage = {}

    def set(self, thread_id, key, value):
        if thread_id not in self.storage:
            self.storage[thread_id] = {}
        self.storage[thread_id][key] = value

    def get(self, thread_id, key):
        if thread_id in self.storage:
            return self.storage[thread_id].get(key)
        return None`,
    testCases: [
      { input: 'tls = ThreadLocalStorage(); tls.set(1, "x", 10); tls.get(1, "x")', expectedOutput: '10', isHidden: false, description: 'Set and get' },
      { input: 'tls = ThreadLocalStorage(); tls.set(1, "x", 10); tls.get(2, "x")', expectedOutput: 'None', isHidden: false, description: 'Different threads' }
    ],
    hints: ['Use nested dictionary', 'Key by thread ID first']
  },
  // 8. Thread Join
  {
    id: 'cs301-ex-2-8',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Thread Join Tracker',
    description: 'Track thread dependencies for join operations.',
    difficulty: 2,
    language: 'python',
    starterCode: 'class JoinTracker:\n    def __init__(self):\n        pass\n    \n    def add_join(self, waiter_tid, waitee_tid):\n        # waiter is waiting for waitee to finish\n        pass\n    \n    def thread_finished(self, tid):\n        # Return list of threads that can now continue\n        pass',
    solution: `class JoinTracker:
    def __init__(self):
        self.waiting_for = {}  # waiter -> waitee
        self.waiters = {}  # waitee -> [waiters]

    def add_join(self, waiter_tid, waitee_tid):
        self.waiting_for[waiter_tid] = waitee_tid
        if waitee_tid not in self.waiters:
            self.waiters[waitee_tid] = []
        self.waiters[waitee_tid].append(waiter_tid)

    def thread_finished(self, tid):
        released = self.waiters.get(tid, [])
        for waiter in released:
            del self.waiting_for[waiter]
        if tid in self.waiters:
            del self.waiters[tid]
        return released`,
    testCases: [
      { input: 'jt = JoinTracker(); jt.add_join(1, 2); jt.thread_finished(2)', expectedOutput: '[1]', isHidden: false, description: 'Release waiter' },
      { input: 'jt = JoinTracker(); jt.thread_finished(5)', expectedOutput: '[]', isHidden: false, description: 'No waiters' }
    ],
    hints: ['Track both directions', 'Release all waiters when thread finishes']
  },
  // 9. Parallelism Calculator
  {
    id: 'cs301-ex-2-9',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Amdahl\'s Law',
    description: 'Calculate speedup using Amdahl\'s Law given parallel fraction and number of processors.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def amdahls_speedup(parallel_fraction, num_processors):\n    # Return theoretical speedup\n    pass',
    solution: `def amdahls_speedup(parallel_fraction, num_processors):
    serial_fraction = 1 - parallel_fraction
    speedup = 1 / (serial_fraction + parallel_fraction / num_processors)
    return round(speedup, 2)`,
    testCases: [
      { input: '0.75, 4', expectedOutput: '2.29', isHidden: false, description: '75% parallel, 4 cores' },
      { input: '0.5, 2', expectedOutput: '1.33', isHidden: false, description: '50% parallel, 2 cores' },
      { input: '1.0, 8', expectedOutput: '8.0', isHidden: true, description: '100% parallel' }
    ],
    hints: ['Speedup = 1 / (S + P/N)', 'S = serial fraction, P = parallel fraction']
  },
  // 10. Thread State Machine
  {
    id: 'cs301-ex-2-10',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Thread State Machine',
    description: 'Implement a thread with states: created, running, blocked, terminated.',
    difficulty: 2,
    language: 'python',
    starterCode: 'class Thread:\n    def __init__(self, tid):\n        pass\n    \n    def start(self):\n        pass\n    \n    def block(self):\n        pass\n    \n    def unblock(self):\n        pass\n    \n    def terminate(self):\n        pass',
    solution: `class Thread:
    def __init__(self, tid):
        self.tid = tid
        self.state = "created"

    def start(self):
        if self.state == "created":
            self.state = "running"
            return True
        return False

    def block(self):
        if self.state == "running":
            self.state = "blocked"
            return True
        return False

    def unblock(self):
        if self.state == "blocked":
            self.state = "running"
            return True
        return False

    def terminate(self):
        if self.state in ("running", "blocked"):
            self.state = "terminated"
            return True
        return False`,
    testCases: [
      { input: 't = Thread(1); t.start(); t.state', expectedOutput: '"running"', isHidden: false, description: 'Start thread' },
      { input: 't = Thread(1); t.start(); t.block(); t.state', expectedOutput: '"blocked"', isHidden: false, description: 'Block thread' }
    ],
    hints: ['Check current state before transitioning', 'Only valid transitions should succeed']
  },
  // 11. OpenMP Parallel Loop
  {
    id: 'cs301-ex-2-11',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Parallel Loop Work Distribution',
    description: 'Calculate how iterations are distributed among threads in a parallel for loop.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def distribute_iterations(total_iterations, num_threads):\n    # Return list of (start, end) for each thread\n    pass',
    solution: `def distribute_iterations(total_iterations, num_threads):
    result = []
    base = total_iterations // num_threads
    remainder = total_iterations % num_threads
    start = 0
    for i in range(num_threads):
        count = base + (1 if i < remainder else 0)
        result.append((start, start + count))
        start += count
    return result`,
    testCases: [
      { input: '10, 3', expectedOutput: '[(0, 4), (4, 7), (7, 10)]', isHidden: false, description: '10 iterations, 3 threads' },
      { input: '8, 4', expectedOutput: '[(0, 2), (2, 4), (4, 6), (6, 8)]', isHidden: false, description: 'Even distribution' }
    ],
    hints: ['Divide evenly, distribute remainder', 'First threads get extra iteration']
  },
  // 12. Thread Cancellation
  {
    id: 'cs301-ex-2-12',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Thread Cancellation Manager',
    description: 'Implement cancellation with deferred mode (threads check cancellation points).',
    difficulty: 3,
    language: 'python',
    starterCode: 'class CancellationManager:\n    def __init__(self):\n        pass\n    \n    def request_cancel(self, tid):\n        pass\n    \n    def check_cancellation(self, tid):\n        # Return True if thread should terminate\n        pass\n    \n    def clear_cancellation(self, tid):\n        pass',
    solution: `class CancellationManager:
    def __init__(self):
        self.pending_cancellations = set()

    def request_cancel(self, tid):
        self.pending_cancellations.add(tid)

    def check_cancellation(self, tid):
        return tid in self.pending_cancellations

    def clear_cancellation(self, tid):
        self.pending_cancellations.discard(tid)`,
    testCases: [
      { input: 'cm = CancellationManager(); cm.request_cancel(1); cm.check_cancellation(1)', expectedOutput: 'True', isHidden: false, description: 'Cancellation requested' },
      { input: 'cm = CancellationManager(); cm.check_cancellation(1)', expectedOutput: 'False', isHidden: false, description: 'No cancellation' }
    ],
    hints: ['Track cancelled thread IDs in a set', 'Threads check at cancellation points']
  },
  // 13. Thread Barrier
  {
    id: 'cs301-ex-2-13',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Barrier Synchronization',
    description: 'Implement a barrier that blocks threads until all have arrived.',
    difficulty: 4,
    language: 'python',
    starterCode: 'class Barrier:\n    def __init__(self, num_threads):\n        pass\n    \n    def wait(self, tid):\n        # Return True if all threads have arrived, False if still waiting\n        pass\n    \n    def reset(self):\n        pass',
    solution: `class Barrier:
    def __init__(self, num_threads):
        self.num_threads = num_threads
        self.arrived = set()

    def wait(self, tid):
        self.arrived.add(tid)
        return len(self.arrived) >= self.num_threads

    def reset(self):
        self.arrived.clear()`,
    testCases: [
      { input: 'b = Barrier(2); b.wait(1)', expectedOutput: 'False', isHidden: false, description: 'First arrival' },
      { input: 'b = Barrier(2); b.wait(1); b.wait(2)', expectedOutput: 'True', isHidden: false, description: 'All arrived' }
    ],
    hints: ['Track arrived threads', 'All must arrive before any can proceed']
  },
  // 14. Thread Priority
  {
    id: 'cs301-ex-2-14',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Thread Priority Scheduler',
    description: 'Schedule threads based on priority (lower number = higher priority).',
    difficulty: 3,
    language: 'python',
    starterCode: 'import heapq\n\nclass PriorityScheduler:\n    def __init__(self):\n        pass\n    \n    def add_thread(self, tid, priority):\n        pass\n    \n    def get_highest_priority(self):\n        # Return tid of highest priority thread (don\'t remove)\n        pass\n    \n    def remove_thread(self, tid):\n        pass',
    solution: `import heapq

class PriorityScheduler:
    def __init__(self):
        self.heap = []
        self.tid_to_priority = {}

    def add_thread(self, tid, priority):
        heapq.heappush(self.heap, (priority, tid))
        self.tid_to_priority[tid] = priority

    def get_highest_priority(self):
        while self.heap:
            priority, tid = self.heap[0]
            if tid in self.tid_to_priority and self.tid_to_priority[tid] == priority:
                return tid
            heapq.heappop(self.heap)
        return None

    def remove_thread(self, tid):
        if tid in self.tid_to_priority:
            del self.tid_to_priority[tid]`,
    testCases: [
      { input: 'ps = PriorityScheduler(); ps.add_thread(1, 5); ps.add_thread(2, 1); ps.get_highest_priority()', expectedOutput: '2', isHidden: false, description: 'Highest priority' },
      { input: 'ps = PriorityScheduler(); ps.add_thread(1, 1); ps.remove_thread(1); ps.get_highest_priority()', expectedOutput: 'None', isHidden: false, description: 'After removal' }
    ],
    hints: ['Use heap for efficient priority lookup', 'Handle lazy deletion']
  },
  // 15. Thread Affinity
  {
    id: 'cs301-ex-2-15',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'CPU Affinity Manager',
    description: 'Manage thread-to-CPU affinity settings.',
    difficulty: 2,
    language: 'python',
    starterCode: 'class AffinityManager:\n    def __init__(self, num_cpus):\n        pass\n    \n    def set_affinity(self, tid, cpu_set):\n        # cpu_set is list of allowed CPUs\n        pass\n    \n    def get_affinity(self, tid):\n        pass\n    \n    def can_run_on(self, tid, cpu):\n        pass',
    solution: `class AffinityManager:
    def __init__(self, num_cpus):
        self.num_cpus = num_cpus
        self.affinities = {}

    def set_affinity(self, tid, cpu_set):
        valid_cpus = [c for c in cpu_set if 0 <= c < self.num_cpus]
        self.affinities[tid] = set(valid_cpus)

    def get_affinity(self, tid):
        return self.affinities.get(tid, set(range(self.num_cpus)))

    def can_run_on(self, tid, cpu):
        affinity = self.get_affinity(tid)
        return cpu in affinity`,
    testCases: [
      { input: 'am = AffinityManager(4); am.set_affinity(1, [0, 1]); am.can_run_on(1, 0)', expectedOutput: 'True', isHidden: false, description: 'Allowed CPU' },
      { input: 'am = AffinityManager(4); am.set_affinity(1, [0, 1]); am.can_run_on(1, 2)', expectedOutput: 'False', isHidden: false, description: 'Not allowed' }
    ],
    hints: ['Default affinity is all CPUs', 'Store as set for O(1) lookup']
  },
  // 16. Thread Signal Handler
  {
    id: 'cs301-ex-2-16',
    subjectId: 'cs301',
    topicId: 'cs301-t2',
    title: 'Thread Signal Delivery',
    description: 'Simulate signal delivery to threads.',
    difficulty: 3,
    language: 'python',
    starterCode: 'class SignalManager:\n    def __init__(self):\n        pass\n    \n    def register_handler(self, tid, signal, handler_name):\n        pass\n    \n    def send_signal(self, tid, signal):\n        # Return handler name or None if no handler\n        pass\n    \n    def get_pending_signals(self, tid):\n        pass',
    solution: `class SignalManager:
    def __init__(self):
        self.handlers = {}  # (tid, signal) -> handler
        self.pending = {}   # tid -> [signals]

    def register_handler(self, tid, signal, handler_name):
        self.handlers[(tid, signal)] = handler_name

    def send_signal(self, tid, signal):
        if (tid, signal) in self.handlers:
            return self.handlers[(tid, signal)]
        # Queue if no handler
        if tid not in self.pending:
            self.pending[tid] = []
        self.pending[tid].append(signal)
        return None

    def get_pending_signals(self, tid):
        return self.pending.get(tid, [])`,
    testCases: [
      { input: 'sm = SignalManager(); sm.register_handler(1, "SIGINT", "handle_int"); sm.send_signal(1, "SIGINT")', expectedOutput: '"handle_int"', isHidden: false, description: 'Handler exists' },
      { input: 'sm = SignalManager(); sm.send_signal(1, "SIGTERM"); sm.get_pending_signals(1)', expectedOutput: '["SIGTERM"]', isHidden: false, description: 'No handler, queued' }
    ],
    hints: ['Key by (tid, signal) for handlers', 'Queue signals without handlers']
  }
];
