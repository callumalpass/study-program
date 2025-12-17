---
title: "Raft Consensus Algorithm"
slug: "raft"
description: "Comprehensive guide to Raft consensus including leader election, log replication, safety guarantees, and comparison with Paxos"
---

# Raft Consensus Algorithm

## Introduction

Raft is a consensus algorithm designed to be understandable. Created by Diego Ongaro and John Ousterhout in 2013, Raft was explicitly designed to be easier to understand and implement than Paxos while providing the same guarantees.

Raft has become widely adopted in production systems including etcd (Kubernetes), Consul (HashiCorp), and CockroachDB. Its clarity has made it the consensus algorithm of choice for many new distributed systems.

## Design for Understandability

Raft uses **leader-based approach** and **strong leader** (all log entries flow from leader to followers). This simplifies reasoning compared to Paxos's symmetric roles.

**Key design decisions**:
1. Leader election with randomized timeouts
2. Log replication from leader to followers
3. Safety through term numbers and commitment rules

## Raft Roles

**Leader**: Handles all client requests, replicates log to followers
**Follower**: Passive, responds to leader and candidate RPCs
**Candidate**: Seeking votes to become leader

```python
class RaftState(Enum):
    FOLLOWER = 1
    CANDIDATE = 2
    LEADER = 3


class RaftNode:
    def __init__(self, node_id, peers):
        self.id = node_id
        self.peers = peers

        # Persistent state (on all servers)
        self.current_term = 0
        self.voted_for = None
        self.log = []  # [(term, command), ...]

        # Volatile state (on all servers)
        self.commit_index = 0
        self.last_applied = 0

        # Volatile state (on leaders)
        self.next_index = {}  # For each follower
        self.match_index = {}  # For each follower

        # Raft state
        self.state = RaftState.FOLLOWER
        self.leader_id = None

        # Timing
        self.election_timeout = self.random_timeout()
        self.last_heartbeat = time.time()
```

## Leader Election

When follower doesn't hear from leader within election timeout, it starts election:

**Election process**:
1. Increment term
2. Vote for self
3. Send RequestVote RPCs to all peers
4. If receive majority votes: become leader
5. If receive higher term: become follower
6. If election timeout: start new election

```python
def start_election(self):
    """Start leader election"""
    # Increment term
    self.current_term += 1

    # Vote for self
    self.voted_for = self.id
    self.state = RaftState.CANDIDATE

    votes_received = 1  # Own vote

    # Request votes from all peers
    for peer in self.peers:
        response = peer.request_vote(
            term=self.current_term,
            candidate_id=self.id,
            last_log_index=len(self.log) - 1,
            last_log_term=self.log[-1][0] if self.log else 0
        )

        if response['vote_granted']:
            votes_received += 1

    # Check if won election
    if votes_received > len(self.peers) / 2:
        self.become_leader()
    else:
        # Lost election or split vote
        self.state = RaftState.FOLLOWER


def request_vote(self, term, candidate_id, last_log_index, last_log_term):
    """Handle RequestVote RPC"""
    # If term < currentTerm, reject
    if term < self.current_term:
        return {'term': self.current_term, 'vote_granted': False}

    # If term > currentTerm, update term and become follower
    if term > self.current_term:
        self.current_term = term
        self.voted_for = None
        self.state = RaftState.FOLLOWER

    # Grant vote if:
    # 1. Haven't voted or already voted for this candidate
    # 2. Candidate's log is at least as up-to-date as ours
    if (self.voted_for is None or self.voted_for == candidate_id) and \
       self.is_log_up_to_date(last_log_index, last_log_term):

        self.voted_for = candidate_id
        self.last_heartbeat = time.time()

        return {'term': self.current_term, 'vote_granted': True}

    return {'term': self.current_term, 'vote_granted': False}


def is_log_up_to_date(self, last_log_index, last_log_term):
    """Check if candidate's log is at least as up-to-date"""
    if not self.log:
        return True

    my_last_term = self.log[-1][0]
    my_last_index = len(self.log) - 1

    # Compare terms first, then indices
    if last_log_term != my_last_term:
        return last_log_term >= my_last_term

    return last_log_index >= my_last_index
```

**Election Safety**: At most one leader per term
**Randomized timeouts**: Prevent split votes

## Log Replication

Leader receives client requests, appends to log, replicates to followers:

```python
def append_entries(self, entries):
    """Leader appends new entries to log"""
    if self.state != RaftState.LEADER:
        return False

    # Append to local log
    for entry in entries:
        self.log.append((self.current_term, entry))

    # Replicate to followers
    self.replicate_log()

    return True


def replicate_log(self):
    """Replicate log entries to followers"""
    for peer in self.peers:
        # Determine which entries to send
        next_idx = self.next_index[peer.id]
        prev_log_index = next_idx - 1
        prev_log_term = self.log[prev_log_index][0] if prev_log_index >= 0 else 0

        entries_to_send = self.log[next_idx:]

        # Send AppendEntries RPC
        response = peer.append_entries_rpc(
            term=self.current_term,
            leader_id=self.id,
            prev_log_index=prev_log_index,
            prev_log_term=prev_log_term,
            entries=entries_to_send,
            leader_commit=self.commit_index
        )

        if response['success']:
            # Update next_index and match_index
            self.next_index[peer.id] = next_idx + len(entries_to_send)
            self.match_index[peer.id] = self.next_index[peer.id] - 1

            # Check if can commit
            self.update_commit_index()
        else:
            # Decrement next_index and retry
            self.next_index[peer.id] = max(0, self.next_index[peer.id] - 1)


def append_entries_rpc(self, term, leader_id, prev_log_index, prev_log_term,
                       entries, leader_commit):
    """Handle AppendEntries RPC (follower)"""
    # Reply false if term < currentTerm
    if term < self.current_term:
        return {'term': self.current_term, 'success': False}

    # Update term and become follower if necessary
    if term > self.current_term:
        self.current_term = term
        self.voted_for = None

    self.state = RaftState.FOLLOWER
    self.leader_id = leader_id
    self.last_heartbeat = time.time()

    # Reply false if log doesn't contain entry at prev_log_index
    # with prev_log_term
    if prev_log_index >= len(self.log):
        return {'term': self.current_term, 'success': False}

    if prev_log_index >= 0 and self.log[prev_log_index][0] != prev_log_term:
        # Conflict: delete conflicting entry and all that follow
        self.log = self.log[:prev_log_index]
        return {'term': self.current_term, 'success': False}

    # Append new entries
    for i, entry in enumerate(entries):
        log_index = prev_log_index + 1 + i
        if log_index < len(self.log):
            # Overwrite if different
            if self.log[log_index] != entry:
                self.log = self.log[:log_index]
                self.log.append(entry)
        else:
            # Append new entry
            self.log.append(entry)

    # Update commit index
    if leader_commit > self.commit_index:
        self.commit_index = min(leader_commit, len(self.log) - 1)

    return {'term': self.current_term, 'success': True}
```

## Safety

**Log Matching Property**: If two logs contain entry with same index and term, all preceding entries are identical

**Leader Completeness**: If entry committed in term T, it will be in leader's log for all later terms

**State Machine Safety**: If server applies log entry at index i, no other server applies different entry at i

```python
def update_commit_index(self):
    """Update commit index based on replicated entries"""
    # Find highest N where majority has replicated
    for n in range(len(self.log) - 1, self.commit_index, -1):
        if self.log[n][0] == self.current_term:
            # Count replicas
            replicas = 1  # Self
            for peer in self.peers:
                if self.match_index[peer.id] >= n:
                    replicas += 1

            # If majority, commit
            if replicas > len(self.peers) / 2:
                self.commit_index = n
                break
```

## Client Interaction

```python
class RaftClient:
    def __init__(self, cluster):
        self.cluster = cluster
        self.leader = None

    def send_command(self, command):
        """Send command to cluster"""
        # Find leader
        if not self.leader:
            self.leader = self.find_leader()

        # Send to leader
        response = self.leader.client_request(command)

        if response['success']:
            return response['result']
        else:
            # Not leader, redirect
            self.leader = response['leader']
            return self.send_command(command)


def client_request(self, command):
    """Handle client request (leader only)"""
    if self.state != RaftState.LEADER:
        return {'success': False, 'leader': self.leader_id}

    # Append to log
    self.log.append((self.current_term, command))

    # Replicate
    self.replicate_log()

    # Wait for commit
    index = len(self.log) - 1
    while self.commit_index < index:
        time.sleep(0.01)

    # Apply to state machine
    result = self.apply_to_state_machine(command)

    return {'success': True, 'result': result}
```

## Comparison: Raft vs Paxos

| Aspect | Raft | Paxos |
|--------|------|-------|
| **Understandability** | Designed for clarity | Complex |
| **Leadership** | Strong leader | Symmetric roles |
| **Log structure** | Leader appends only | Can have gaps |
| **Election** | Randomized timeouts | Proposal numbers |
| **Implementation** | Easier | Harder |
| **Adoption** | Growing (etcd, Consul) | Established (Chubby, ZooKeeper) |

## Practical Usage

**etcd**: Kubernetes uses etcd for coordination
```python
import etcd3

etcd = etcd3.client()
etcd.put('/key', 'value')  # Replicated via Raft
```

**Consul**: Service discovery and configuration
**CockroachDB**: Distributed SQL database

## Summary

Raft provides consensus with emphasis on understandability.

**Key features**:
- Strong leader simplifies design
- Leader election with randomized timeouts
- Log replication ensures consistency
- Safety guarantees through careful rules

**Advantages**:
- Easier to understand than Paxos
- Proven correctness
- Widely adopted

**Use Raft when**:
- Need consensus for replicated state machine
- Understandability is important
- Building new distributed system

Raft has made consensus accessible, enabling more developers to build correct distributed systems.
