---
title: "Paxos Consensus Algorithm"
slug: "paxos"
description: "Comprehensive guide to Paxos consensus algorithm including Basic Paxos, Multi-Paxos, roles, phases, and practical implementations"
---

# Paxos Consensus Algorithm

## Introduction

Paxos, invented by Leslie Lamport in 1989 and published in 1998, is one of the most important and influential consensus algorithms in distributed systems. Despite its reputation for being difficult to understand, Paxos solves the fundamental problem of reaching consensus in an asynchronous network where processes can fail.

Paxos is used in many production systems including Google's Chubby lock service, Apache ZooKeeper (ZAB is Paxos-like), and numerous distributed databases. Understanding Paxos is essential for anyone working with distributed systems, as it represents a fundamental breakthrough in consensus protocols.

## The Problem Paxos Solves

**Goal**: Get distributed processes to agree on a single value
**Challenges**:
- Processes can crash (fail-stop model)
- Messages can be delayed or lost
- No synchronized clocks
- Asynchronous network

**Guarantees**:
- Safety: Only one value is chosen
- Validity: Chosen value was proposed
- Termination: Some value is eventually chosen (with majority alive)

## Roles in Paxos

Processes can act in multiple roles:

**Proposers**: Propose values
**Acceptors**: Vote on proposed values (typically 2f+1 acceptors to tolerate f failures)
**Learners**: Learn the chosen value

```mermaid
graph LR
    P[Proposer] -->|Propose value| A[Acceptors]
    A -->|Accept value| L[Learners]
    L -->|Learn chosen value| App[Application]
```

## Basic Paxos Algorithm

### Phase 1: Prepare

**Proposer**:
1. Choose unique proposal number n
2. Send PREPARE(n) to majority of acceptors

**Acceptor** receiving PREPARE(n):
1. If n > highest_promised:
   - Promise not to accept proposals < n
   - Respond with PROMISE(n, accepted_value, accepted_number)
2. Else: Ignore or reject

### Phase 2: Accept

**Proposer** receiving PROMISE from majority:
1. If any acceptor accepted a value: use highest numbered accepted value
2. Else: use own value
3. Send ACCEPT(n, value) to majority

**Acceptor** receiving ACCEPT(n, v):
1. If n >= highest_promised:
   - Accept proposal
   - Respond with ACCEPTED(n, v)
2. Else: Reject

**Chosen**: Value is chosen when majority of acceptors accept it

```python
class PaxosProposer:
    def __init__(self, proposer_id, acceptors):
        self.id = proposer_id
        self.acceptors = acceptors
        self.proposal_number = 0

    def propose(self, value):
        """Propose a value using Paxos"""
        # Generate unique proposal number
        self.proposal_number = self.generate_proposal_number()

        # Phase 1: Prepare
        promises = self.prepare_phase(self.proposal_number)

        if len(promises) < self.majority():
            return None  # Failed to get majority

        # Check if any value already accepted
        proposed_value = self.select_value(promises, value)

        # Phase 2: Accept
        accepted = self.accept_phase(self.proposal_number, proposed_value)

        if len(accepted) >= self.majority():
            return proposed_value  # Consensus reached!

        return None  # Failed

    def prepare_phase(self, n):
        """Phase 1: Send PREPARE to acceptors"""
        promises = []

        for acceptor in self.acceptors:
            response = acceptor.handle_prepare(n)
            if response and response['type'] == 'PROMISE':
                promises.append(response)

        return promises

    def select_value(self, promises, default_value):
        """Select value for Phase 2"""
        # Find highest accepted value in promises
        max_accepted_n = -1
        selected_value = default_value

        for promise in promises:
            if promise.get('accepted_n', -1) > max_accepted_n:
                max_accepted_n = promise['accepted_n']
                selected_value = promise['accepted_value']

        return selected_value

    def accept_phase(self, n, value):
        """Phase 2: Send ACCEPT to acceptors"""
        accepted = []

        for acceptor in self.acceptors:
            response = acceptor.handle_accept(n, value)
            if response and response['type'] == 'ACCEPTED':
                accepted.append(response)

        return accepted

    def majority(self):
        """Majority size"""
        return len(self.acceptors) // 2 + 1

    def generate_proposal_number(self):
        """Generate unique, increasing proposal number"""
        # Include proposer ID to ensure uniqueness
        return (time.time() * 1000000) + self.id


class PaxosAcceptor:
    def __init__(self, acceptor_id):
        self.id = acceptor_id
        self.promised_n = -1  # Highest promised proposal number
        self.accepted_n = -1  # Highest accepted proposal number
        self.accepted_value = None

    def handle_prepare(self, n):
        """Handle PREPARE request"""
        if n > self.promised_n:
            # Promise not to accept anything < n
            self.promised_n = n

            # Return promise with any accepted value
            return {
                'type': 'PROMISE',
                'promised_n': n,
                'accepted_n': self.accepted_n,
                'accepted_value': self.accepted_value
            }

        # Reject (or ignore)
        return {'type': 'REJECT', 'promised_n': self.promised_n}

    def handle_accept(self, n, value):
        """Handle ACCEPT request"""
        if n >= self.promised_n:
            # Accept the proposal
            self.promised_n = n
            self.accepted_n = n
            self.accepted_value = value

            # Write to stable storage
            self.write_to_disk(n, value)

            return {'type': 'ACCEPTED', 'n': n, 'value': value}

        # Reject
        return {'type': 'REJECT', 'promised_n': self.promised_n}

    def write_to_disk(self, n, value):
        """Persist accepted value"""
        # Write to durable storage for recovery
        pass


class PaxosLearner:
    def __init__(self, acceptors):
        self.acceptors = acceptors
        self.accepted_values = {}  # value -> count

    def learn(self):
        """Learn the chosen value"""
        # Query acceptors for their accepted values
        for acceptor in self.acceptors:
            if acceptor.accepted_value:
                v = acceptor.accepted_value
                self.accepted_values[v] = self.accepted_values.get(v, 0) + 1

        # Value accepted by majority is chosen
        majority = len(self.acceptors) // 2 + 1

        for value, count in self.accepted_values.items():
            if count >= majority:
                return value  # This value was chosen

        return None  # No value chosen yet
```

## Multi-Paxos

Basic Paxos chooses one value. Multi-Paxos chooses sequence of values (for state machine replication).

**Optimization**: Elect a leader to skip Phase 1 for subsequent values

```python
class MultiPaxos:
    def __init__(self, node_id, acceptors):
        self.id = node_id
        self.acceptors = acceptors
        self.log = []  # Sequence of chosen values
        self.is_leader = False
        self.leader_proposal_n = None

    def become_leader(self):
        """Become leader by running Phase 1 once"""
        n = self.generate_proposal_number()

        # Phase 1 for all future slots
        promises = self.prepare_phase(n, for_all_slots=True)

        if len(promises) >= self.majority():
            self.is_leader = True
            self.leader_proposal_n = n
            return True

        return False

    def propose_next_value(self, value):
        """Propose next value in sequence"""
        if not self.is_leader:
            return False

        slot = len(self.log)

        # Skip Phase 1 (already did it when became leader)
        # Go straight to Phase 2
        accepted = self.accept_phase(slot, self.leader_proposal_n, value)

        if len(accepted) >= self.majority():
            self.log.append(value)
            return True

        # Lost leadership or conflict
        self.is_leader = False
        return False
```

## Example Execution

```python
# Setup: 3 acceptors, 2 proposers
acceptors = [PaxosAcceptor(i) for i in range(3)]
proposer1 = PaxosProposer(1, acceptors)
proposer2 = PaxosProposer(2, acceptors)

# Proposer 1 proposes "value_a"
result1 = proposer1.propose("value_a")

# Proposer 2 proposes "value_b" concurrently
result2 = proposer2.propose("value_b")

# Learner learns the chosen value
learner = PaxosLearner(acceptors)
chosen_value = learner.learn()

print(f"Chosen value: {chosen_value}")  # One of value_a or value_b
```

## Handling Failures

**Acceptor failure**:
- Paxos tolerates up to f failures with 2f+1 acceptors
- Failed acceptors don't affect safety
- May affect liveness (need majority)

**Proposer failure**:
- Another proposer can take over
- May cause dueling proposers (livelock)
- Solution: Exponential backoff or leader election

**Message loss**:
- Proposer retries if no response
- Idempotent operations ensure safety

## Optimizations

**Fast Paxos**: Clients send directly to acceptors (saves 1 RTT)

**Cheap Paxos**: Use auxiliary acceptors only during failures

**Generalized Paxos**: Allow commutative commands to be reordered

**EPaxos**: Leaderless, low latency across WAN

## Practical Implementations

**Google Chubby**: Lock service using Paxos
**Apache ZooKeeper**: ZAB (Paxos-like) protocol
**etcd**: Uses Raft (simpler than Paxos)
**Spanner**: Uses Paxos for replication

## Summary

Paxos solves consensus in asynchronous systems with failures.

**Key properties**:
- Safety always guaranteed (even during failures/partitions)
- Liveness requires majority and eventual synchrony
- Tolerates f failures with 2f+1 acceptors

**Phases**:
1. Prepare: Get permission to propose
2. Accept: Propose value and get accepted

**Multi-Paxos**: Optimize for sequence of values with leader election

**Challenges**:
- Complex to understand and implement correctly
- Potential for dueling proposers (livelock)
- Requires careful handling of proposal numbers

Paxos is fundamental to distributed systems, providing the theoretical foundation for many consensus protocols including Raft, ZAB, and others.
