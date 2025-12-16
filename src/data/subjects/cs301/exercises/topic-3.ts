import { CodingExercise } from '../../../../core/types';

export const cs301Topic3Exercises: CodingExercise[] = [
  // 1. FCFS Scheduling
  {
    id: 'cs301-ex-3-1',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'FCFS Waiting Time',
    description: 'Calculate average waiting time for FCFS scheduling given burst times (all arrive at time 0).',
    difficulty: 2,
    language: 'python',
    starterCode: 'def fcfs_avg_waiting_time(burst_times):\n    # Return average waiting time\n    pass',
    solution: `def fcfs_avg_waiting_time(burst_times):
    if not burst_times:
        return 0
    waiting_times = []
    current_time = 0
    for burst in burst_times:
        waiting_times.append(current_time)
        current_time += burst
    return sum(waiting_times) / len(waiting_times)`,
    testCases: [
      { input: '[24, 3, 3]', expectedOutput: '17.0', isHidden: false, description: 'Example from textbook' },
      { input: '[5, 5, 5]', expectedOutput: '5.0', isHidden: false, description: 'Equal burst times' },
      { input: '[1]', expectedOutput: '0.0', isHidden: true, description: 'Single process' }
    ],
    hints: ['First process waits 0', 'Each subsequent process waits for all previous to complete']
  },
  // 2. SJF Scheduling
  {
    id: 'cs301-ex-3-2',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'SJF Non-Preemptive',
    description: 'Return the execution order for non-preemptive SJF (all arrive at time 0).',
    difficulty: 2,
    language: 'python',
    starterCode: 'def sjf_order(processes):\n    # processes: list of (pid, burst_time)\n    # Return list of pids in execution order\n    pass',
    solution: `def sjf_order(processes):
    sorted_procs = sorted(processes, key=lambda x: (x[1], x[0]))
    return [p[0] for p in sorted_procs]`,
    testCases: [
      { input: '[(1, 6), (2, 8), (3, 2), (4, 4)]', expectedOutput: '[3, 4, 1, 2]', isHidden: false, description: 'Sort by burst' },
      { input: '[(1, 5), (2, 5)]', expectedOutput: '[1, 2]', isHidden: false, description: 'Tie-break by PID' }
    ],
    hints: ['Sort by burst time', 'Use PID as tiebreaker']
  },
  // 3. Round Robin
  {
    id: 'cs301-ex-3-3',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'Round Robin Simulation',
    description: 'Simulate Round Robin and return the completion times for each process.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def round_robin(processes, quantum):\n    # processes: list of (pid, burst_time)\n    # Return dict {pid: completion_time}\n    pass',
    solution: `def round_robin(processes, quantum):
    from collections import deque
    queue = deque()
    remaining = {}
    for pid, burst in processes:
        queue.append(pid)
        remaining[pid] = burst

    completion = {}
    time = 0
    while queue:
        pid = queue.popleft()
        run_time = min(quantum, remaining[pid])
        time += run_time
        remaining[pid] -= run_time
        if remaining[pid] > 0:
            queue.append(pid)
        else:
            completion[pid] = time
    return completion`,
    testCases: [
      { input: '[(1, 10), (2, 4), (3, 2)], 4', expectedOutput: '{1: 16, 2: 10, 3: 6}', isHidden: false, description: 'Three processes' },
      { input: '[(1, 3)], 5', expectedOutput: '{1: 3}', isHidden: false, description: 'Single process' }
    ],
    hints: ['Use a queue for round robin', 'Process runs for min(quantum, remaining)']
  },
  // 4. Priority Scheduling
  {
    id: 'cs301-ex-3-4',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'Priority Scheduling Order',
    description: 'Return execution order for non-preemptive priority scheduling (lower = higher priority).',
    difficulty: 2,
    language: 'python',
    starterCode: 'def priority_order(processes):\n    # processes: list of (pid, burst, priority)\n    # Return list of pids in execution order\n    pass',
    solution: `def priority_order(processes):
    sorted_procs = sorted(processes, key=lambda x: (x[2], x[0]))
    return [p[0] for p in sorted_procs]`,
    testCases: [
      { input: '[(1, 10, 3), (2, 1, 1), (3, 2, 4)]', expectedOutput: '[2, 1, 3]', isHidden: false, description: 'Priority order' },
      { input: '[(1, 5, 2), (2, 3, 2)]', expectedOutput: '[1, 2]', isHidden: false, description: 'Same priority' }
    ],
    hints: ['Sort by priority', 'Use PID as tiebreaker']
  },
  // 5. Turnaround Time
  {
    id: 'cs301-ex-3-5',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'Calculate Turnaround Time',
    description: 'Calculate turnaround time for each process given arrival and completion times.',
    difficulty: 1,
    language: 'python',
    starterCode: 'def turnaround_times(processes, completion_times):\n    # processes: list of (pid, arrival_time)\n    # completion_times: dict {pid: completion}\n    # Return dict {pid: turnaround_time}\n    pass',
    solution: `def turnaround_times(processes, completion_times):
    result = {}
    for pid, arrival in processes:
        result[pid] = completion_times[pid] - arrival
    return result`,
    testCases: [
      { input: '[(1, 0), (2, 1)], {1: 5, 2: 8}', expectedOutput: '{1: 5, 2: 7}', isHidden: false, description: 'Two processes' },
      { input: '[(1, 2)], {1: 10}', expectedOutput: '{1: 8}', isHidden: false, description: 'Single process' }
    ],
    hints: ['Turnaround = completion - arrival', 'Simple subtraction']
  },
  // 6. CPU Utilization
  {
    id: 'cs301-ex-3-6',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'CPU Utilization Calculator',
    description: 'Calculate CPU utilization percentage given busy and total time.',
    difficulty: 1,
    language: 'python',
    starterCode: 'def cpu_utilization(busy_time, total_time):\n    # Return utilization as percentage (0-100)\n    pass',
    solution: `def cpu_utilization(busy_time, total_time):
    if total_time == 0:
        return 0
    return (busy_time / total_time) * 100`,
    testCases: [
      { input: '80, 100', expectedOutput: '80.0', isHidden: false, description: '80% utilization' },
      { input: '45, 50', expectedOutput: '90.0', isHidden: false, description: '90% utilization' }
    ],
    hints: ['Utilization = busy/total * 100', 'Handle division by zero']
  },
  // 7. Multilevel Queue
  {
    id: 'cs301-ex-3-7',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'Multilevel Queue Scheduler',
    description: 'Implement a two-level queue: foreground (RR with quantum 4) and background (FCFS). Foreground has priority.',
    difficulty: 4,
    language: 'python',
    starterCode: 'class MultilevelQueue:\n    def __init__(self):\n        pass\n    \n    def add_process(self, pid, queue_type, burst):\n        # queue_type: "foreground" or "background"\n        pass\n    \n    def get_next(self):\n        # Return (pid, run_time) or None\n        pass',
    solution: `class MultilevelQueue:
    def __init__(self):
        self.foreground = []  # (pid, remaining)
        self.background = []  # (pid, remaining)

    def add_process(self, pid, queue_type, burst):
        if queue_type == "foreground":
            self.foreground.append([pid, burst])
        else:
            self.background.append([pid, burst])

    def get_next(self):
        if self.foreground:
            pid, remaining = self.foreground[0]
            run_time = min(4, remaining)
            self.foreground[0][1] -= run_time
            if self.foreground[0][1] <= 0:
                self.foreground.pop(0)
            else:
                self.foreground.append(self.foreground.pop(0))
            return (pid, run_time)
        elif self.background:
            pid, remaining = self.background.pop(0)
            return (pid, remaining)
        return None`,
    testCases: [
      { input: 'mq = MultilevelQueue(); mq.add_process(1, "foreground", 6); mq.get_next()', expectedOutput: '(1, 4)', isHidden: false, description: 'Foreground RR' },
      { input: 'mq = MultilevelQueue(); mq.add_process(1, "background", 10); mq.get_next()', expectedOutput: '(1, 10)', isHidden: false, description: 'Background FCFS' }
    ],
    hints: ['Check foreground first', 'Foreground uses RR, background uses FCFS']
  },
  // 8. Response Time
  {
    id: 'cs301-ex-3-8',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'Response Time Calculator',
    description: 'Calculate response time (time from arrival to first execution).',
    difficulty: 2,
    language: 'python',
    starterCode: 'def response_times(processes, first_run_times):\n    # processes: list of (pid, arrival_time)\n    # first_run_times: dict {pid: first_run_time}\n    # Return dict {pid: response_time}\n    pass',
    solution: `def response_times(processes, first_run_times):
    result = {}
    for pid, arrival in processes:
        result[pid] = first_run_times[pid] - arrival
    return result`,
    testCases: [
      { input: '[(1, 0), (2, 2)], {1: 0, 2: 5}', expectedOutput: '{1: 0, 2: 3}', isHidden: false, description: 'Two processes' },
      { input: '[(1, 1)], {1: 3}', expectedOutput: '{1: 2}', isHidden: false, description: 'Single process' }
    ],
    hints: ['Response = first_run - arrival', 'First process has 0 response if starts immediately']
  },
  // 9. Aging Implementation
  {
    id: 'cs301-ex-3-9',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'Priority Aging',
    description: 'Implement aging: increase priority (decrease value) for waiting processes each time unit.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def apply_aging(processes, aging_rate):\n    # processes: list of [pid, burst, priority, wait_time]\n    # Decrease priority by aging_rate for each unit of wait_time\n    # Return updated processes\n    pass',
    solution: `def apply_aging(processes, aging_rate):
    result = []
    for pid, burst, priority, wait_time in processes:
        new_priority = max(0, priority - (wait_time * aging_rate))
        result.append([pid, burst, new_priority, wait_time])
    return result`,
    testCases: [
      { input: '[[1, 10, 10, 5]], 1', expectedOutput: '[[1, 10, 5, 5]]', isHidden: false, description: 'Age by 5' },
      { input: '[[1, 5, 3, 10]], 1', expectedOutput: '[[1, 5, 0, 10]]', isHidden: false, description: 'Priority floor at 0' }
    ],
    hints: ['New priority = old - (wait * rate)', 'Don\'t go below 0']
  },
  // 10. Gantt Chart Generator
  {
    id: 'cs301-ex-3-10',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'Gantt Chart',
    description: 'Generate a Gantt chart representation for a schedule.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def gantt_chart(schedule):\n    # schedule: list of (pid, start, end)\n    # Return string representation\n    pass',
    solution: `def gantt_chart(schedule):
    result = []
    for pid, start, end in schedule:
        result.append(f"P{pid}[{start}-{end}]")
    return " | ".join(result)`,
    testCases: [
      { input: '[(1, 0, 5), (2, 5, 8)]', expectedOutput: '"P1[0-5] | P2[5-8]"', isHidden: false, description: 'Two processes' },
      { input: '[(1, 0, 3), (2, 3, 6), (1, 6, 10)]', expectedOutput: '"P1[0-3] | P2[3-6] | P1[6-10]"', isHidden: false, description: 'With preemption' }
    ],
    hints: ['Format each segment', 'Join with separator']
  },
  // 11. Throughput Calculator
  {
    id: 'cs301-ex-3-11',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'System Throughput',
    description: 'Calculate throughput (processes completed per time unit).',
    difficulty: 1,
    language: 'python',
    starterCode: 'def throughput(num_completed, total_time):\n    # Return throughput as processes per time unit\n    pass',
    solution: `def throughput(num_completed, total_time):
    if total_time == 0:
        return 0
    return num_completed / total_time`,
    testCases: [
      { input: '10, 100', expectedOutput: '0.1', isHidden: false, description: '10 in 100 time units' },
      { input: '5, 20', expectedOutput: '0.25', isHidden: false, description: '5 in 20 time units' }
    ],
    hints: ['Throughput = completed / time', 'Handle zero time']
  },
  // 12. SRTF Scheduling
  {
    id: 'cs301-ex-3-12',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'SRTF Next Process',
    description: 'Given current time and process states, select next process for SRTF (Shortest Remaining Time First).',
    difficulty: 3,
    language: 'python',
    starterCode: 'def srtf_select(current_time, processes):\n    # processes: list of (pid, arrival, remaining)\n    # Return pid of process to run, or None\n    pass',
    solution: `def srtf_select(current_time, processes):
    available = [(pid, remaining) for pid, arrival, remaining
                 in processes if arrival <= current_time and remaining > 0]
    if not available:
        return None
    available.sort(key=lambda x: (x[1], x[0]))
    return available[0][0]`,
    testCases: [
      { input: '5, [(1, 0, 10), (2, 3, 5), (3, 5, 2)]', expectedOutput: '3', isHidden: false, description: 'Shortest remaining' },
      { input: '1, [(1, 0, 5), (2, 5, 2)]', expectedOutput: '1', isHidden: false, description: 'Only one available' }
    ],
    hints: ['Filter by arrival time', 'Sort by remaining time']
  },
  // 13. Multiprocessor Load Balancing
  {
    id: 'cs301-ex-3-13',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'Load Balancing',
    description: 'Distribute processes across CPUs to balance load (by total burst time).',
    difficulty: 3,
    language: 'python',
    starterCode: 'def balance_load(processes, num_cpus):\n    # processes: list of (pid, burst)\n    # Return dict {cpu_id: [pids]}\n    pass',
    solution: `def balance_load(processes, num_cpus):
    import heapq
    # Min heap of (load, cpu_id)
    cpu_loads = [(0, i) for i in range(num_cpus)]
    assignment = {i: [] for i in range(num_cpus)}

    # Assign largest jobs first for better balance
    sorted_procs = sorted(processes, key=lambda x: -x[1])
    for pid, burst in sorted_procs:
        load, cpu_id = heapq.heappop(cpu_loads)
        assignment[cpu_id].append(pid)
        heapq.heappush(cpu_loads, (load + burst, cpu_id))

    return assignment`,
    testCases: [
      { input: '[(1, 10), (2, 5), (3, 5)], 2', expectedOutput: '{0: [1], 1: [2, 3]}', isHidden: false, description: 'Balance two CPUs' },
      { input: '[(1, 5)], 2', expectedOutput: '{0: [1], 1: []}', isHidden: false, description: 'Single process' }
    ],
    hints: ['Use greedy: assign to least loaded CPU', 'Process largest jobs first']
  },
  // 14. Real-Time Schedulability
  {
    id: 'cs301-ex-3-14',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'Rate Monotonic Schedulability',
    description: 'Check if a task set is schedulable under Rate Monotonic using the utilization bound.',
    difficulty: 3,
    language: 'python',
    starterCode: 'def is_rm_schedulable(tasks):\n    # tasks: list of (computation_time, period)\n    # Return True if schedulable under RM\n    pass',
    solution: `def is_rm_schedulable(tasks):
    import math
    n = len(tasks)
    if n == 0:
        return True
    utilization = sum(c / p for c, p in tasks)
    bound = n * (2 ** (1/n) - 1)
    return utilization <= bound`,
    testCases: [
      { input: '[(1, 4), (1, 5), (1, 10)]', expectedOutput: 'True', isHidden: false, description: 'Schedulable' },
      { input: '[(2, 4), (2, 5), (2, 10)]', expectedOutput: 'False', isHidden: false, description: 'Not schedulable' }
    ],
    hints: ['Utilization = sum(C_i / P_i)', 'Bound = n * (2^(1/n) - 1)']
  },
  // 15. EDF Scheduling
  {
    id: 'cs301-ex-3-15',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'EDF Next Process',
    description: 'Select next process for Earliest Deadline First scheduling.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def edf_select(current_time, processes):\n    # processes: list of (pid, arrival, remaining, deadline)\n    # Return pid of process to run, or None\n    pass',
    solution: `def edf_select(current_time, processes):
    available = [(pid, deadline) for pid, arrival, remaining, deadline
                 in processes if arrival <= current_time and remaining > 0]
    if not available:
        return None
    available.sort(key=lambda x: (x[1], x[0]))
    return available[0][0]`,
    testCases: [
      { input: '0, [(1, 0, 2, 5), (2, 0, 1, 3)]', expectedOutput: '2', isHidden: false, description: 'Earliest deadline first' },
      { input: '5, [(1, 0, 2, 10), (2, 10, 1, 15)]', expectedOutput: '1', isHidden: false, description: 'Only one available' }
    ],
    hints: ['Filter by arrival time', 'Sort by deadline']
  },
  // 16. Convoy Effect Detector
  {
    id: 'cs301-ex-3-16',
    subjectId: 'cs301',
    topicId: 'cs301-t3',
    title: 'Detect Convoy Effect',
    description: 'Detect potential convoy effect: short processes waiting behind long ones in FCFS.',
    difficulty: 2,
    language: 'python',
    starterCode: 'def detect_convoy(processes, threshold_ratio):\n    # processes: list of burst times in arrival order\n    # Return True if any short process waits for process > threshold_ratio times longer\n    pass',
    solution: `def detect_convoy(processes, threshold_ratio):
    for i in range(1, len(processes)):
        for j in range(i):
            if processes[j] > processes[i] * threshold_ratio:
                return True
    return False`,
    testCases: [
      { input: '[100, 1, 1, 1], 5', expectedOutput: 'True', isHidden: false, description: 'Convoy detected' },
      { input: '[5, 5, 5], 2', expectedOutput: 'False', isHidden: false, description: 'No convoy' }
    ],
    hints: ['Check if any early process is much longer than later ones', 'Compare ratios']
  }
];
