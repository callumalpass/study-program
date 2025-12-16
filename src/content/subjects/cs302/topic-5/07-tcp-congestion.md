# TCP Congestion Control

## The Congestion Problem

When senders transmit faster than the network can handle, queues build up in routers. Eventually queues overflow, packets are dropped, and retransmissions make congestion worse—a **congestion collapse**.

Congestion control prevents this by having senders detect and respond to network congestion. Unlike flow control (which protects the receiver), congestion control protects the network itself.

## Congestion Window

TCP maintains a **congestion window (cwnd)** separate from the receive window:

```
EffectiveWindow = min(cwnd, rwnd)
```

The sender limits outstanding data to the effective window:
```
LastByteSent - LastByteAcked ≤ min(cwnd, rwnd)
```

cwnd is adjusted based on perceived network conditions.

## Congestion Signals

TCP infers congestion from:

**Packet loss**: If a segment is lost (timeout or triple dup ACK), the network is probably congested.

**Increasing RTT**: Longer round-trip times suggest queues are building up.

**Explicit Congestion Notification (ECN)**: Routers can mark packets to signal congestion before dropping.

## AIMD: Additive Increase, Multiplicative Decrease

TCP's fundamental approach is **AIMD**:

**Additive Increase**: When no congestion detected, increase cwnd by 1 MSS per RTT.
```
cwnd = cwnd + MSS × (MSS / cwnd)  // per ACK
```

**Multiplicative Decrease**: When loss detected, cut cwnd in half.
```
cwnd = cwnd / 2
```

AIMD provides:
- **Efficiency**: Probes for available bandwidth
- **Fairness**: Multiple flows converge to equal shares
- **Stability**: Oscillates around optimal point

## Slow Start

Despite its name, slow start grows cwnd exponentially:

1. Start with cwnd = 1 MSS
2. For each ACK received, cwnd += 1 MSS
3. Each RTT, cwnd doubles

```
RTT 1: cwnd = 1 MSS
RTT 2: cwnd = 2 MSS
RTT 3: cwnd = 4 MSS
RTT 4: cwnd = 8 MSS
...
```

Slow start continues until:
- Loss occurs (congestion)
- cwnd reaches **slow start threshold (ssthresh)**
- cwnd reaches rwnd

## Congestion Avoidance

When cwnd ≥ ssthresh, TCP enters **congestion avoidance**:
- Linear growth: increase by 1 MSS per RTT
- More conservative than slow start
- Probes for available capacity carefully

## Responding to Loss

**Timeout** (severe congestion):
```
ssthresh = cwnd / 2
cwnd = 1 MSS
Enter slow start
```

**Triple duplicate ACK** (mild congestion):
```
ssthresh = cwnd / 2
cwnd = ssthresh + 3 MSS
Enter fast recovery
```

Timeout is treated as severe because no ACKs are arriving. Triple dup ACK is milder because ACKs are still flowing.

## Fast Recovery

After fast retransmit, **fast recovery** avoids slow start:

1. ssthresh = cwnd / 2
2. cwnd = ssthresh + 3 MSS (account for packets in flight)
3. For each additional dup ACK: cwnd += 1 MSS
4. When new ACK arrives: cwnd = ssthresh, enter congestion avoidance

Fast recovery keeps the pipe full during loss recovery.

## TCP Tahoe vs Reno

**TCP Tahoe** (original):
- Slow start
- Congestion avoidance
- Fast retransmit
- Always goes to slow start after loss

**TCP Reno** (improved):
- Adds fast recovery
- Distinguishes timeout from dup ACK
- Much better performance with isolated losses

## TCP NewReno

Improves on Reno for multiple losses in a window:

**Problem with Reno**: Partial ACK during fast recovery triggers exit, but more losses may exist.

**NewReno solution**: Stay in fast recovery until all data from original window is ACKed. Retransmit one segment per partial ACK.

## TCP CUBIC

Modern default in Linux and many systems:

**Key idea**: Use cubic function of time since last congestion event.

```
cwnd = C × (t - K)³ + W_max
```

Where:
- C = scaling constant
- t = time since last reduction
- K = time to reach W_max
- W_max = window size at last congestion

**Characteristics**:
- Rapid growth far from W_max
- Slow probing near W_max
- Better utilization of high-bandwidth links
- RTT-fairness (unlike Reno)

## Explicit Congestion Notification (ECN)

ECN allows routers to signal congestion without dropping packets:

1. Sender marks packets as ECN-capable
2. Congested router marks packet (CE = Congestion Experienced)
3. Receiver echoes marking in ACK (ECE flag)
4. Sender responds as if loss occurred
5. Sender clears echo (CWR flag)

**Benefits**:
- Earlier congestion signal
- No packet loss needed
- Better for short flows
- Lower latency

## Congestion Control and Fairness

**Fairness goal**: Equal bandwidth share for competing flows.

**AIMD achieves fairness**: Both additive increase and multiplicative decrease converge to fair share over time.

**RTT fairness problem**: Flows with shorter RTT increase cwnd faster. CUBIC addresses this.

**Bufferbloat**: Excessive buffering delays congestion signals. ECN and active queue management help.

## Bandwidth-Delay Product

For full utilization:
```
cwnd ≥ Bandwidth × RTT
```

Example: 100 Mbps link, 100ms RTT
```
BDP = 100,000,000 × 0.100 / 8 = 1,250,000 bytes
```

cwnd must reach 1.25 MB for full utilization.

## Modern Congestion Control

**BBR (Bottleneck Bandwidth and RTT)**:
- Model-based rather than loss-based
- Estimates bottleneck bandwidth and minimum RTT
- Paces packets to match estimated capacity
- Better performance over lossy links

**QUIC congestion control**:
- Pluggable algorithms
- Per-stream flow control
- Better loss detection with packet numbers

Congestion control continues to evolve as networks change.

## Summary

TCP congestion control:
1. **Slow start**: Exponential growth to find capacity
2. **Congestion avoidance**: Linear probing for more
3. **Fast retransmit**: Quick response to dup ACKs
4. **Fast recovery**: Maintain throughput during recovery

The balance between efficiency and stability makes TCP work across diverse network conditions.
