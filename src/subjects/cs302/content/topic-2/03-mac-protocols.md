---
id: cs302-t2-mac
title: "Media Access Control Protocols"
order: 3
---

# Media Access Control Protocols

When multiple devices share a communication channel, **Media Access Control (MAC)** protocols determine who transmits when. Without coordination, simultaneous transmissions collide and corrupt each other. MAC protocols solve this fundamental challenge of shared medium access.

## The Multiple Access Problem

```
Shared Medium Challenge:

    [A]     [B]     [C]     [D]
      \      |       |      /
       \     |       |     /
        ========Bus=========
         (shared channel)

If A and C transmit simultaneously → Collision!
Data corrupted, must retransmit
```

**Three categories of MAC protocols:**
1. **Channel Partitioning**: Divide channel among users
2. **Random Access**: Nodes transmit at will, handle collisions
3. **Taking Turns**: Nodes take turns transmitting

## Channel Partitioning Protocols

### Time Division Multiple Access (TDMA)

Divides time into fixed slots, each user gets dedicated slot:

```
Time →
+-------+-------+-------+-------+-------+-------+
| A     | B     | C     | D     | A     | B     |
+-------+-------+-------+-------+-------+-------+
  Slot 1  Slot 2  Slot 3  Slot 4  Slot 1  Slot 2
         ← Frame 1 →              ← Frame 2 →

Advantages:
+ No collisions
+ Fair access
+ Predictable delay

Disadvantages:
- Unused slots wasted if node idle
- Must wait for slot even if channel empty
```

### Frequency Division Multiple Access (FDMA)

Divides frequency spectrum into separate bands:

```
Frequency
    ^
    |   +---+   +---+   +---+   +---+
    |   | A |   | B |   | C |   | D |
    |   +---+   +---+   +---+   +---+
    +--------------------------------→ Time

Each station gets dedicated frequency band
Used in: Radio, cable TV, cellular (older systems)
```

### Code Division Multiple Access (CDMA)

All users transmit simultaneously using unique codes:

```
Each user assigned unique "chipping" code
Signals encoded with code, can be separated at receiver
Used in: 3G cellular, GPS

Analogy: Multiple conversations in room
         with different languages
         Each listener "tunes in" to their language
```

## Random Access Protocols

### ALOHA

The original random access protocol (University of Hawaii, 1970):

**Pure ALOHA:**
```
Transmit whenever you have data
If collision detected, wait random time, retransmit

Efficiency: Maximum ~18.4% channel utilization
Problem: Vulnerable period = 2× frame time
```

**Slotted ALOHA:**
```
Time divided into slots equal to frame time
Transmit only at beginning of slot

Efficiency: Maximum ~36.8% channel utilization
Better: Collision only if same slot chosen
```

### CSMA (Carrier Sense Multiple Access)

"Listen before transmit" - improves on ALOHA:

```
CSMA Rules:
1. Listen to channel (carrier sense)
2. If busy, wait
3. If idle, transmit

Types:
1-persistent: Transmit immediately when idle (aggressive)
Non-persistent: Wait random time when busy (polite)
p-persistent: Transmit with probability p when idle
```

```python
import random
import time

class CSMANode:
    def __init__(self, persistence='1-persistent'):
        self.persistence = persistence

    def channel_is_busy(self):
        """Check if channel is in use (simulated)."""
        return random.random() < 0.3  # 30% busy

    def attempt_transmit(self):
        """CSMA transmission logic."""
        if self.persistence == '1-persistent':
            while self.channel_is_busy():
                pass  # Keep checking
            return True  # Transmit immediately

        elif self.persistence == 'non-persistent':
            if self.channel_is_busy():
                time.sleep(random.uniform(0, 1))  # Random backoff
                return self.attempt_transmit()  # Try again
            return True

        elif self.persistence == 'p-persistent':
            p = 0.5  # Transmission probability
            while True:
                if not self.channel_is_busy():
                    if random.random() < p:
                        return True  # Transmit
                    time.sleep(0.01)  # Wait one slot
```

### CSMA/CD (Collision Detection)

Used in **wired Ethernet** - detect collisions while transmitting:

```
CSMA/CD Algorithm:

1. Carrier sense: Is channel idle?
   - If busy, wait
   - If idle, transmit

2. Transmit and listen for collision

3. If collision detected:
   a. Send jam signal (48 bits)
   b. Increment attempt counter
   c. If attempts < 16:
      - Wait random backoff time
      - Go to step 1
   d. Else: Give up, report error

Binary Exponential Backoff:
After n collisions, choose k from {0, 1, ..., 2^n - 1}
Wait k × 512 bit times
Maximum: 2^10 - 1 = 1023 slots
```

```
CSMA/CD Timeline:

Time →
A: [========== Transmitting ===========]
B:     [===]                            (detected collision)
       ↓
       [JAM]   [=== Retransmit ===]
              ↑
              Backoff period
```

```python
import random

def binary_exponential_backoff(collision_count, slot_time=51.2e-6):
    """
    Calculate backoff time for CSMA/CD.
    slot_time: 51.2 microseconds for 10 Mbps Ethernet
    """
    max_k = min(collision_count, 10)  # Cap at 10
    k = random.randint(0, 2**max_k - 1)
    backoff_time = k * slot_time
    return backoff_time

# Example: Successive collisions
for attempt in range(1, 6):
    backoff = binary_exponential_backoff(attempt)
    print(f"Collision {attempt}: backoff = {backoff*1e6:.1f} μs")
```

### CSMA/CA (Collision Avoidance)

Used in **wireless (Wi-Fi)** - cannot detect collisions while transmitting:

```
Why CA instead of CD for wireless?
- Transmitter can't hear while transmitting
- Hidden terminal problem
- Signal attenuation over distance

CSMA/CA Algorithm:

1. Sense channel
2. If idle for DIFS (DCF Interframe Space):
   - Transmit
3. If busy:
   - Wait until idle
   - Wait DIFS
   - Start random backoff counter
   - Decrement counter while idle
   - If channel becomes busy, freeze counter
   - Transmit when counter reaches zero

Optional RTS/CTS:
[Sender] --RTS--> [Receiver]
[Sender] <--CTS-- [Receiver]
[Sender] --DATA-> [Receiver]
[Sender] <--ACK-- [Receiver]
```

## Taking Turns Protocols

### Polling

Central controller grants permission to transmit:

```
Master/Controller polls each node in turn:

Controller: "Node A, your turn"
Node A:     [Transmits data]
Controller: "Node B, your turn"
Node B:     [Nothing to send]
Controller: "Node C, your turn"
Node C:     [Transmits data]
...

Advantages: No collisions, fair access
Disadvantages: Polling overhead, single point of failure
```

### Token Passing

Token circulates; holder can transmit:

```
Token Ring/FDDI:

       [A] ←--token--- [B]
        |               |
        v               ^
       [D] ---token--→ [C]

Rules:
- Only token holder can transmit
- After transmitting, pass token
- If nothing to send, pass token immediately

Advantages: Predictable, no collisions
Disadvantages: Token loss requires recovery
```

## Comparison of MAC Protocols

| Protocol | Collisions | Efficiency | Latency | Complexity |
|----------|------------|------------|---------|------------|
| TDMA | None | Low if sparse | Fixed | Medium |
| FDMA | None | Low if sparse | Low | Medium |
| Pure ALOHA | Yes | ~18% | Variable | Low |
| Slotted ALOHA | Yes | ~37% | Variable | Low |
| CSMA/CD | Yes | High | Variable | Medium |
| CSMA/CA | Avoided | Moderate | Variable | High |
| Token | None | High | Variable | Medium |

## Key Takeaways

- MAC protocols coordinate access to shared communication channels
- Channel partitioning (TDMA, FDMA) prevents collisions but wastes capacity
- Random access (ALOHA, CSMA) is efficient under light load
- CSMA/CD detects collisions in wired networks (Ethernet)
- CSMA/CA avoids collisions in wireless networks (Wi-Fi)
- Binary exponential backoff provides fair collision recovery
- Taking turns protocols (polling, token) guarantee access but add overhead

Choosing the right MAC protocol depends on medium type, traffic patterns, and latency requirements.
