---
title: "Leader Election Algorithms"
slug: "leader-election"
description: "Comprehensive guide to distributed leader election including Bully algorithm, Ring algorithm, and practical implementations in production systems like ZooKeeper and etcd"
---

# Leader Election Algorithms

## Introduction

Leader election is a fundamental problem in distributed systems: how do processes agree on a single coordinator when no central authority exists? A leader (also called coordinator, master, or primary) is essential for many distributed algorithms - coordinating distributed transactions, managing distributed locks, serving as the write master in replicated databases, or coordinating cluster membership.

The challenge arises because distributed systems lack global knowledge and face failures. Processes must elect a leader using only local information and message passing, handle failures of the current leader gracefully, avoid having multiple leaders simultaneously (split-brain), and ensure eventually all processes agree on the same leader.

Many production systems rely on leader election: ZooKeeper for coordinating distributed applications, etcd for Kubernetes cluster management, MongoDB for replica set coordination, Apache Kafka for partition leadership, and Consul for service discovery coordination.

## Requirements

A correct leader election algorithm must satisfy:

**Safety**: At most one process is elected leader at any time
**Liveness**: Eventually, some process is elected leader
**Agreement**: All non-faulty processes agree on the same leader
**Termination**: Algorithm completes in finite time

## Bully Algorithm

The Bully algorithm assumes processes have unique IDs and can communicate with all other processes. The process with the highest ID becomes leader.

### Algorithm

When a process $P$ detects the leader has failed:

1. **Election message**: $P$ sends ELECTION to all processes with higher IDs
2. **Response**: If any higher ID process responds with ALIVE, $P$ waits for new leader announcement
3. **Become leader**: If no response (timeout), $P$ becomes leader and sends COORDINATOR to all processes

When process $P$ receives ELECTION from lower ID:
- Respond with ALIVE
- Start own election (if not already electing)

```python
import socket
import threading
import time
import pickle

class BullyNode:
    def __init__(self, node_id, all_nodes):
        self.id = node_id
        self.all_nodes = all_nodes  # {id: (host, port)}
        self.leader_id = None
        self.in_election = False
        self.election_timeout = 2.0
        self.alive = True
        self.responses_received = 0

    def start_election(self):
        """Initiate election"""
        print(f"[Node {self.id}] Starting election")
        self.in_election = True
        self.responses_received = 0

        # Send ELECTION to higher ID nodes
        higher_nodes = [n for n in self.all_nodes if n > self.id]

        if not higher_nodes:
            # No higher IDs - become leader
            self.become_leader()
            return

        for node_id in higher_nodes:
            self.send_election(node_id)

        # Wait for responses with timeout
        start_time = time.time()
        while (time.time() - start_time < self.election_timeout and
               self.responses_received < len(higher_nodes)):
            time.sleep(0.1)

        if self.responses_received == 0:
            # No responses - become leader
            self.become_leader()
        else:
            # Higher node responded - wait for coordinator message
            print(f"[Node {self.id}] Higher node responded, waiting for coordinator")

    def become_leader(self):
        """Become the leader"""
        self.leader_id = self.id
        self.in_election = False
        print(f"[Node {self.id}] I am the leader!")

        # Announce to all nodes
        for node_id in self.all_nodes:
            if node_id != self.id:
                self.send_coordinator(node_id)

    def send_election(self, dest_id):
        """Send ELECTION message"""
        msg = {'type': 'ELECTION', 'from': self.id}
        self.send_message(dest_id, msg)

    def send_coordinator(self, dest_id):
        """Send COORDINATOR message"""
        msg = {'type': 'COORDINATOR', 'leader_id': self.id}
        self.send_message(dest_id, msg)

    def send_alive(self, dest_id):
        """Send ALIVE response"""
        msg = {'type': 'ALIVE', 'from': self.id}
        self.send_message(dest_id, msg)

    def handle_election(self, from_id):
        """Handle ELECTION message from lower ID"""
        if from_id < self.id:
            # Respond with ALIVE
            self.send_alive(from_id)

            # Start own election if not already
            if not self.in_election:
                threading.Thread(target=self.start_election, daemon=True).start()

    def handle_alive(self):
        """Handle ALIVE response"""
        self.responses_received += 1

    def handle_coordinator(self, leader_id):
        """Handle COORDINATOR announcement"""
        self.leader_id = leader_id
        self.in_election = False
        print(f"[Node {self.id}] New leader is Node {leader_id}")

    def send_message(self, dest_id, msg):
        """Send message to dest_id"""
        try:
            host, port = self.all_nodes[dest_id]
            sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            sock.sendto(pickle.dumps(msg), (host, port))
            sock.close()
        except:
            pass  # Node might be down
```

### Complexity

- **Messages**: O(n²) in worst case (all nodes start election)
- **Time**: O(n) (sequential elections)

### Advantages/Disadvantages

**Advantages**:
- Simple to understand and implement
- Eventually elects highest ID node
- Handles failures automatically

**Disadvantages**:
- High message complexity
- Aggressive - higher ID nodes "bully" lower ones
- Not robust to network partitions

## Ring Algorithm

Processes are organized in a logical ring. Election message circulates around the ring, collecting IDs.

### Algorithm

1. Process $P$ starts election by sending ELECTION message containing its ID
2. Each process receiving ELECTION:
   - If own ID higher than all in message, add own ID to list and forward
   - If own ID is highest in list, declare victory (send COORDINATOR)
3. COORDINATOR message circulates, informing all of new leader

```python
class RingNode:
    def __init__(self, node_id, next_node):
        self.id = node_id
        self.next_node = next_node  # Next node in ring
        self.leader_id = None
        self.participant_ids = set()
        self.in_election = False

    def start_election(self):
        """Initiate election"""
        print(f"[Node {self.id}] Starting election")
        self.in_election = True
        self.participant_ids = {self.id}

        # Send to next node
        msg = {'type': 'ELECTION', 'ids': [self.id]}
        self.send_to_next(msg)

    def handle_election(self, ids):
        """Handle incoming ELECTION message"""
        if self.id in ids:
            # Message completed circle - elect leader
            leader = max(ids)
            self.announce_leader(leader)
            return

        # Add own ID and forward
        ids.append(self.id)
        msg = {'type': 'ELECTION', 'ids': ids}
        self.send_to_next(msg)

    def announce_leader(self, leader_id):
        """Announce leader"""
        self.leader_id = leader_id
        self.in_election = False

        if self.id == leader_id:
            print(f"[Node {self.id}] I am the leader!")

        # Forward announcement
        msg = {'type': 'COORDINATOR', 'leader_id': leader_id}
        self.send_to_next(msg)

    def handle_coordinator(self, leader_id):
        """Handle COORDINATOR message"""
        if self.leader_id == leader_id:
            # Already processed - stop circulation
            return

        self.leader_id = leader_id
        print(f"[Node {self.id}] New leader is Node {leader_id}")

        # Forward
        msg = {'type': 'COORDINATOR', 'leader_id': leader_id}
        self.send_to_next(msg)
```

### Complexity

- **Messages**: O(n²) worst case (depends on who initiates)
- **Time**: O(n) (message must traverse ring)

## Production Systems

### ZooKeeper Leader Election

```python
from kazoo.client import KazooClient
from kazoo.recipe.election import Election

def run_as_leader():
    """Code that runs when elected leader"""
    print("I am the leader!")
    # Perform leader duties
    while is_leader:
        coordinate_cluster()
        time.sleep(1)

# Connect to ZooKeeper
zk = KazooClient(hosts='localhost:2181')
zk.start()

# Participate in election
election = Election(zk, "/election/leader")

# This blocks until elected, then runs function
election.run(run_as_leader)
```

**How it works**:
1. Each node creates ephemeral sequential znode
2. Node with lowest sequence number is leader
3. Other nodes watch the next lower znode
4. When leader fails (znode deleted), next node becomes leader

### etcd Leader Election

```python
import etcd3

def become_leader(lease_id):
    """Become leader with lease"""
    print("I am the leader!")

    # Perform leader duties
    while True:
        # Do work
        coordinate_cluster()

        # Keep lease alive
        etcd.refresh_lease(lease_id)
        time.sleep(1)

etcd = etcd3.client()

# Campaign for leadership
election = etcd.election("/election/leader")

while True:
    try:
        # Try to become leader
        election.campaign()

        # If campaign succeeds, we are leader
        lease = election.lease()
        become_leader(lease.id)

    except Exception:
        # Lost leadership, retry
        time.sleep(1)
```

## Handling Failures

### Split Brain Prevention

```python
class LeaderWithHeartbeat:
    def __init__(self, node_id, quorum_size):
        self.id = node_id
        self.is_leader = False
        self.quorum_size = quorum_size
        self.heartbeat_responses = 0
        self.heartbeat_interval = 1.0

    def leader_loop(self):
        """Leader sends heartbeats"""
        while self.is_leader:
            self.heartbeat_responses = 0

            # Send heartbeat to all nodes
            self.send_heartbeats()

            # Wait for responses
            time.sleep(self.heartbeat_interval)

            # Check quorum
            if self.heartbeat_responses < self.quorum_size:
                print("Lost quorum - stepping down as leader")
                self.is_leader = False
                self.start_election()

    def send_heartbeats(self):
        """Send heartbeat to all nodes"""
        for node in all_nodes:
            msg = {'type': 'HEARTBEAT', 'leader_id': self.id}
            self.send(node, msg)
```

### Fencing Tokens

```python
class FencedLeader:
    def __init__(self):
        self.epoch = 0  # Monotonically increasing
        self.is_leader = False

    def become_leader(self, new_epoch):
        """Become leader with new epoch"""
        if new_epoch > self.epoch:
            self.epoch = new_epoch
            self.is_leader = True
            print(f"Leader with epoch {self.epoch}")

    def perform_operation(self, operation):
        """Perform operation with fencing token"""
        # Include epoch with operation
        msg = {
            'operation': operation,
            'epoch': self.epoch
        }

        # Storage system checks epoch
        return storage.execute_if_epoch_valid(msg)

# Storage system
class FencedStorage:
    def __init__(self):
        self.current_epoch = 0

    def execute_if_epoch_valid(self, msg):
        """Only execute if epoch is current"""
        if msg['epoch'] >= self.current_epoch:
            self.current_epoch = msg['epoch']
            # Execute operation
            return self.execute(msg['operation'])
        else:
            # Stale leader - reject
            return {'error': 'Stale epoch'}
```

## Summary

Leader election is critical for distributed coordination, with various algorithms offering different tradeoffs.

Key takeaways:

- **Bully algorithm**: Simple, elects highest ID, O(n²) messages
- **Ring algorithm**: Logical ring topology, O(n) to O(n²) messages
- **Production systems**: ZooKeeper and etcd provide robust leader election
- **Split brain**: Prevent with quorums and heartbeats
- **Fencing tokens**: Prevent operations from stale leaders

Choose based on:
- Network topology (ring vs fully connected)
- Failure tolerance requirements
- Message complexity tolerance
- Need for external coordination service

Modern systems typically use ZooKeeper or etcd rather than implementing election from scratch.
