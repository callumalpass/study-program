---
id: cs302-t5-tcp-rel
title: "TCP Reliability Mechanisms"
order: 5
---

# TCP Reliable Data Transfer

## The Challenge

IP provides unreliable service—packets can be lost, corrupted, duplicated, or reordered. TCP builds reliable delivery on top of this unreliable foundation.

TCP's reliability mechanisms must handle:
- Packet loss (dropped by congested routers)
- Bit errors (detected by checksum)
- Reordering (different paths through network)
- Duplication (retransmission received twice)

## Acknowledgments and Retransmission

TCP uses **positive acknowledgment with retransmission (PAR)** or **ARQ (Automatic Repeat Request)**:

1. Sender transmits segment
2. Sender starts timer
3. Receiver sends ACK if received correctly
4. If ACK received, cancel timer
5. If timeout expires, retransmit

**Cumulative ACKs**: TCP ACK number indicates next expected byte, implicitly acknowledging all previous bytes.

## Retransmission Timer

Setting the retransmission timeout (RTO) is crucial:
- Too short: Unnecessary retransmissions
- Too long: Slow recovery from loss

TCP estimates **Round-Trip Time (RTT)** and sets RTO based on it.

**Estimated RTT** (smoothed average):
```
EstimatedRTT = (1-α) × EstimatedRTT + α × SampleRTT
```
Where α typically = 0.125

**RTT Variation** (deviation):
```
DevRTT = (1-β) × DevRTT + β × |SampleRTT - EstimatedRTT|
```
Where β typically = 0.25

**Timeout value**:
```
TimeoutInterval = EstimatedRTT + 4 × DevRTT
```

This formula adapts to network conditions while providing margin for variation.

## Fast Retransmit

Waiting for timeout can be slow. **Fast retransmit** uses duplicate ACKs as a signal of loss:

If sender receives **three duplicate ACKs** (4 ACKs for same sequence number), it retransmits immediately without waiting for timeout.

**Why duplicates indicate loss**: Receiver sends duplicate ACK when it receives out-of-order segment. Multiple duplicates suggest a segment was lost, not just delayed.

```
Sender                              Receiver
  |-------- Seq 1000 --------------->| ACK 1100
  |-------- Seq 1100 --- (lost) -----|
  |-------- Seq 1200 --------------->| ACK 1100 (dup 1)
  |-------- Seq 1300 --------------->| ACK 1100 (dup 2)
  |-------- Seq 1400 --------------->| ACK 1100 (dup 3)
  |                                    |
  |-------- Seq 1100 (retransmit) -->| ACK 1500
```

## Selective Acknowledgment (SACK)

Standard TCP ACKs are cumulative—they can't report gaps.

**SACK option** lets receiver report which blocks have been received:
```
ACK 1100, SACK blocks: 1200-1400, 1500-1600
```

With SACK, sender knows exactly what's missing and can retransmit efficiently.

**SACK benefits**:
- Retransmit only what's actually lost
- Especially helpful when multiple segments are lost
- More efficient than Go-Back-N style retransmission

## Duplicate Detection

Sequence numbers enable duplicate detection:
- Receiver tracks highest sequence number received
- If segment with lower sequence arrives, check if already received
- Duplicates are silently discarded

Duplicates can occur from:
- Retransmission when original was delayed, not lost
- Network path duplication (rare)

## Reordering Handling

Segments may arrive out of order due to different network paths.

**Receiver handling**:
- Buffer out-of-order segments
- Send ACK for highest contiguous byte received
- When gap fills, ACK jumps forward
- Deliver data to application in order

**Sender handling**:
- Delay fast retransmit slightly (reordering threshold)
- Too aggressive retransmission wastes bandwidth

## Checksum

TCP checksum detects bit errors:

**Coverage**: Pseudo-header + TCP header + data

**Pseudo-header** includes IP addresses to detect misdelivery.

**If checksum fails**: Segment is silently discarded. Sender will retransmit.

**Limitation**: Checksum is weak (simple sum). Undetected errors are possible but rare. Applications requiring integrity should use additional protection (TLS).

## Putting It Together

Complete reliable transfer:

1. **Segment sent**: Marked with sequence number, timer started
2. **ACK received**: Outstanding data acknowledged, timer canceled
3. **Loss detected**: Timeout or triple dup ACK
4. **Retransmit**: Send again, restart timer
5. **Eventually succeeds**: Or connection fails after multiple attempts

This creates the illusion of reliable byte stream despite unreliable network.

## Reliability Limits

TCP guarantees delivery **if possible**. Some failures can't be recovered:
- Persistent network partition
- Destination permanently unreachable
- Connection reset

In these cases, TCP reports failure to the application rather than hanging forever.
