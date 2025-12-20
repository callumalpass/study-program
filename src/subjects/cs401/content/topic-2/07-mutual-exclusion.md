---
title: "Distributed Mutual Exclusion"
slug: "mutual-exclusion"
description: "Comprehensive guide to distributed mutual exclusion algorithms including Lamport's algorithm, Ricart-Agrawala, token ring, and comparison with centralized approaches"
---

# Distributed Mutual Exclusion

## Introduction

Mutual exclusion ensures that only one process at a time can access a shared resource or execute a critical section. In centralized systems, this is achieved with locks, semaphores, or monitors. In distributed systems without shared memory, achieving mutual exclusion requires coordination through message passing.

The challenge is to ensure **safety** (at most one process in critical section), **liveness** (eventually every request is granted), and **fairness** (requests granted in reasonable order) using only asynchronous message passing without central coordination.

## Requirements

A correct distributed mutual exclusion algorithm must satisfy:

**Safety (Mutual Exclusion)**: At most one process executes critical section at any time
**Liveness (Progress)**: Requests eventually granted (no deadlock, no starvation)
**Fairness**: Requests granted in "fair" order (often timestamp/FIFO order)

Additional desirable properties:
**Fault tolerance**: Handles process and communication failures
**Low message complexity**: Minimizes network overhead
**Low synchronization delay**: Minimizes wait time

## Centralized Algorithm (Baseline)

One process acts as coordinator, grants access:

```python
class CentralizedMutex:
    def __init__(self, is_coordinator=False):
        self.is_coordinator = is_coordinator
        self.queue = []  # Request queue (at coordinator)
        self.in_use = False

    def request_cs(self):
        """Request critical section"""
        if self.is_coordinator:
            # Coordinator grants to self immediately if free
            if not self.in_use:
                self.in_use = True
                return True
            self.queue.append(self.id)
            return False

        # Send REQUEST to coordinator
        self.send_to_coordinator({'type': 'REQUEST', 'from': self.id})
        # Wait for GRANT
        self.wait_for_grant()

    # Coordinator handles requests
    def handle_request(self, from_id):
        if not self.in_use:
            # Grant immediately
            self.in_use = True
            self.send_grant(from_id)
        else:
            # Queue request
            self.queue.append(from_id)

    def release_cs(self):
        """Release critical section"""
        if self.is_coordinator:
            self.in_use = False
            if self.queue:
                next_id = self.queue.pop(0)
                self.in_use = True
                self.send_grant(next_id)
        else:
            # Send RELEASE to coordinator
            self.send_to_coordinator({'type': 'RELEASE', 'from': self.id})

    # Coordinator handles releases
    def handle_release(self):
        self.in_use = False
        if self.queue:
            next_id = self.queue.pop(0)
            self.in_use = True
            self.send_grant(next_id)
```

**Messages per critical section**: 3 (REQUEST, GRANT, RELEASE)
**Problem**: Single point of failure (coordinator)

## Lamport's Mutual Exclusion

Uses Lamport clocks and fully distributed approach. All processes maintain request queues.

### Algorithm

Process $P_i$ requesting critical section:
1. Send timestamped REQUEST to all processes (including self)
2. Wait until:
   - Own request at head of local queue
   - Received REPLY from all other processes with timestamp > own request

Process $P_j$ receiving REQUEST from $P_i$:
1. Add request to local queue (ordered by timestamp)
2. Send REPLY to $P_i$

Process releasing critical section:
1. Remove own request from queue
2. Send RELEASE to all processes

```python
import heapq
import time

class LamportMutex:
    def __init__(self, process_id, num_processes):
        self.id = process_id
        self.num_processes = num_processes
        self.clock = LamportClock()
        self.request_queue = []  # Priority queue: (timestamp, process_id)
        self.replies = set()  # Replies received
        self.requesting = False

    def request_cs(self):
        """Request critical section"""
        self.requesting = True
        timestamp = self.clock.send_event()

        # Add own request to queue
        heapq.heappush(self.request_queue, (timestamp, self.id))

        # Send REQUEST to all other processes
        for i in range(self.num_processes):
            if i != self.id:
                self.send_request(i, timestamp)

        # Wait until conditions met
        while not self.can_enter_cs():
            time.sleep(0.01)

        print(f"[P{self.id}] Entering critical section")

    def can_enter_cs(self):
        """Check if can enter critical section"""
        if not self.requesting:
            return False

        # Own request at head of queue
        if not self.request_queue or self.request_queue[0][1] != self.id:
            return False

        # Received REPLY from all others
        return len(self.replies) == self.num_processes - 1

    def release_cs(self):
        """Release critical section"""
        print(f"[P{self.id}] Releasing critical section")

        # Remove own request from queue
        self.request_queue = [(ts, pid) for ts, pid in self.request_queue
                             if pid != self.id]
        heapq.heapify(self.request_queue)

        self.replies.clear()
        self.requesting = False

        # Send RELEASE to all
        for i in range(self.num_processes):
            if i != self.id:
                self.send_release(i)

    def handle_request(self, from_id, timestamp):
        """Handle REQUEST from another process"""
        self.clock.receive_event(timestamp)

        # Add to queue
        heapq.heappush(self.request_queue, (timestamp, from_id))

        # Send REPLY
        reply_ts = self.clock.send_event()
        self.send_reply(from_id, reply_ts)

    def handle_reply(self, from_id):
        """Handle REPLY from another process"""
        self.replies.add(from_id)

    def handle_release(self, from_id):
        """Handle RELEASE from another process"""
        # Remove from_id's request from queue
        self.request_queue = [(ts, pid) for ts, pid in self.request_queue
                             if pid != from_id]
        heapq.heapify(self.request_queue)
```

**Messages per critical section**: 3(n-1)
- n-1 REQUEST messages
- n-1 REPLY messages
- n-1 RELEASE messages

**Advantages**:
- No single point of failure
- Fair (FIFO ordering by timestamp)

**Disadvantages**:
- High message complexity O(n)
- Requires communication with all processes

## Ricart-Agrawala Algorithm

Optimization of Lamport's algorithm - removes RELEASE messages by piggybacking on REPLY.

### Algorithm

Process $P_i$ requesting critical section:
1. Send timestamped REQUEST to all processes
2. Wait for REPLY from all

Process $P_j$ receiving REQUEST from $P_i$:
1. If not requesting or $P_i$'s timestamp < own timestamp:
   - Send REPLY immediately
2. Else (requesting and own timestamp < $P_i$'s):
   - Defer REPLY until after releasing CS

Process releasing CS:
- Send deferred REPLYs

```python
class RicartAgrawala:
    def __init__(self, process_id, num_processes):
        self.id = process_id
        self.num_processes = num_processes
        self.clock = LamportClock()
        self.requesting = False
        self.request_timestamp = None
        self.replies_received = 0
        self.deferred_replies = []  # Processes to reply to after release

    def request_cs(self):
        """Request critical section"""
        self.requesting = True
        self.request_timestamp = self.clock.send_event()
        self.replies_received = 0

        # Send REQUEST to all
        for i in range(self.num_processes):
            if i != self.id:
                self.send_request(i, self.request_timestamp)

        # Wait for all REPLYs
        while self.replies_received < self.num_processes - 1:
            time.sleep(0.01)

        print(f"[P{self.id}] Entering critical section")

    def release_cs(self):
        """Release critical section"""
        print(f"[P{self.id}] Releasing critical section")

        self.requesting = False
        self.request_timestamp = None

        # Send deferred REPLYs
        for process_id in self.deferred_replies:
            self.send_reply(process_id)

        self.deferred_replies.clear()

    def handle_request(self, from_id, timestamp):
        """Handle REQUEST from another process"""
        self.clock.receive_event(timestamp)

        # Should we defer reply?
        should_defer = (
            self.requesting and
            (self.request_timestamp, self.id) < (timestamp, from_id)
        )

        if should_defer:
            # Defer reply (we have priority)
            self.deferred_replies.append(from_id)
        else:
            # Send REPLY immediately
            reply_ts = self.clock.send_event()
            self.send_reply(from_id, reply_ts)

    def handle_reply(self, from_id):
        """Handle REPLY"""
        self.replies_received += 1
```

**Messages per critical section**: 2(n-1)
- n-1 REQUEST
- n-1 REPLY

**Improvement over Lamport**: Saves n-1 RELEASE messages

## Token Ring

Physical or logical ring topology. Token circulates; only token holder can enter CS.

```python
class TokenRing:
    def __init__(self, process_id, next_process):
        self.id = process_id
        self.next_process = next_process
        self.has_token = (process_id == 0)  # Process 0 starts with token
        self.waiting_for_cs = False

    def request_cs(self):
        """Request critical section"""
        self.waiting_for_cs = True

        # Wait for token
        while not self.has_token:
            time.sleep(0.01)

        print(f"[P{self.id}] Entering critical section")

    def release_cs(self):
        """Release critical section and pass token"""
        print(f"[P{self.id}] Releasing critical section")

        self.waiting_for_cs = False
        self.has_token = False

        # Pass token to next
        self.send_token(self.next_process)

    def receive_token(self):
        """Receive token from previous process"""
        self.has_token = True

        if not self.waiting_for_cs:
            # Not requesting - pass token immediately
            self.send_token(self.next_process)
            self.has_token = False

    def send_token(self, dest_id):
        """Send token to dest_id"""
        msg = {'type': 'TOKEN'}
        # Send message...
```

**Messages per critical section**: 
- Best case: 0 (if process already has token)
- Worst case: n-1 (token must travel around ring)
- Average: n/2

**Advantages**:
- Simple
- Fairness (round-robin)
- Low message complexity (just token passing)

**Disadvantages**:
- Token can be lost (requires regeneration)
- Latency (wait for token to circulate)
- Failure of one process breaks ring

## Comparison

| Algorithm | Messages/CS | Sync Delay | Pros | Cons |
|-----------|-------------|------------|------|------|
| **Centralized** | 3 | 2 | Simple, low messages | Single point of failure |
| **Lamport** | 3(n-1) | (n-1) | Distributed, fair | High messages |
| **Ricart-Agrawala** | 2(n-1) | (n-1) | Better than Lamport | Still high messages |
| **Token Ring** | 0 to n-1 | 0 to n-1 | Low average messages | Token loss, ring failure |

## Quorum-Based Approach

Request permission from majority (quorum), not all processes.

```python
class QuorumMutex:
    def __init__(self, process_id, quorum_size):
        self.id = process_id
        self.quorum_size = quorum_size
        self.grants_received = 0

    def request_cs(self):
        """Request critical section"""
        self.grants_received = 0
        timestamp = self.clock.send_event()

        # Request from quorum (not all processes)
        quorum_processes = self.select_quorum()
        for pid in quorum_processes:
            self.send_request(pid, timestamp)

        # Wait for quorum grants
        while self.grants_received < self.quorum_size:
            time.sleep(0.01)

        print(f"[P{self.id}] Quorum achieved, entering CS")
```

**Advantages**: Lower message complexity, fault tolerant
**Disadvantages**: Complex quorum selection, potential conflicts

## Handling Failures

```python
class FaultTolerantMutex:
    def __init__(self):
        self.timeout = 5.0  # seconds

    def request_cs_with_timeout(self):
        """Request with timeout to detect failures"""
        start = time.time()

        self.send_requests()

        while not self.can_enter():
            if time.time() - start > self.timeout:
                # Timeout - some processes may have failed
                # Retry or use quorum
                return self.handle_timeout()

            time.sleep(0.01)

    def handle_timeout(self):
        """Handle timeout (possible failures)"""
        # Option 1: Retry with remaining processes
        # Option 2: Reduce quorum requirement
        # Option 3: Elect new coordinator
        pass
```

## Summary

Distributed mutual exclusion ensures safe concurrent access without shared memory.

Key takeaways:

- **Centralized**: Simple but single point of failure
- **Lamport**: Fully distributed, fair, but O(n) messages
- **Ricart-Agrawala**: Optimized Lamport, 2(n-1) messages
- **Token Ring**: Simple, fair, but vulnerable to token loss
- **Quorum-based**: Lower messages, fault tolerant

Choose based on:
- Failure tolerance needs
- Network topology
- Message overhead tolerance
- Fairness requirements

Modern systems often use centralized coordinators (ZooKeeper, etcd) with leader election for fault tolerance rather than fully distributed algorithms.
