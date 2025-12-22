---
id: cs302-t5-tcp-basics
title: "TCP Fundamentals"
order: 3
---

# TCP Fundamentals

## What TCP Provides

TCP (Transmission Control Protocol) transforms IP's unreliable datagram service into a reliable byte stream. Applications using TCP can send data knowing it will arrive correctly, in order, and without duplicates—or they'll be notified of failure.

TCP handles the complexity of reliability, allowing applications to focus on their logic rather than network issues. This is why TCP is used for the majority of Internet traffic: web browsing, email, file transfer, and most other applications.

## TCP Segment Format

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Offset |  Res  |C|E|U|A|P|R|S|F|          Window             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |         Urgent Pointer        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (if any)                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                             Data                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

**Header fields (minimum 20 bytes)**:

**Source Port/Destination Port (16 bits each)**: For multiplexing.

**Sequence Number (32 bits)**: Position of first data byte in this segment within the byte stream.

**Acknowledgment Number (32 bits)**: Next byte expected from the other side (acknowledges receipt of all prior bytes).

**Data Offset (4 bits)**: Header length in 32-bit words (minimum 5 = 20 bytes).

**Flags (6 bits)**:
- URG: Urgent pointer valid
- ACK: Acknowledgment valid
- PSH: Push data to application
- RST: Reset connection
- SYN: Synchronize sequence numbers
- FIN: Finish (no more data)

**Window (16 bits)**: Flow control—receive buffer space available.

**Checksum (16 bits)**: Covers header, data, and pseudo-header.

**Urgent Pointer (16 bits)**: Points to urgent data (if URG set).

## Sequence Numbers

TCP views data as a **byte stream**. Sequence numbers identify byte positions, not segment numbers.

**Example**:
- Segment 1: Sequence = 1000, Data = 100 bytes (bytes 1000-1099)
- Segment 2: Sequence = 1100, Data = 150 bytes (bytes 1100-1249)
- Segment 3: Sequence = 1250, Data = 50 bytes (bytes 1250-1299)

The receiver uses sequence numbers to:
- Reorder out-of-order segments
- Detect duplicates
- Detect missing data

## Acknowledgments

TCP uses **cumulative acknowledgments**. The ACK number indicates the next expected byte.

**Example**:
- Received bytes 1000-1099, 1100-1199
- ACK = 1200 (expecting byte 1200 next)

If bytes 1100-1199 were lost but 1200-1299 received:
- ACK = 1100 (still expecting byte 1100)
- Out-of-order data is buffered but not acknowledged

**Delayed ACKs**: To reduce overhead, TCP may delay ACKs slightly (up to 200ms) hoping to piggyback on outgoing data.

## Connection-Oriented Nature

TCP is connection-oriented:

1. **Establish connection** (three-way handshake)
2. **Transfer data** bidirectionally
3. **Close connection** gracefully

Unlike UDP, TCP maintains state:
- Sequence numbers for both directions
- Acknowledgment status
- Receive window
- Congestion window
- Timers

This state enables reliability but requires memory and processing.

## TCP Features Summary

**Reliable delivery**: Lost segments are retransmitted.

**Ordered delivery**: Data presented to application in order sent.

**No duplicates**: Duplicate segments are detected and discarded.

**Stream interface**: Application sees continuous byte stream, not discrete messages.

**Full duplex**: Data flows both directions simultaneously.

**Flow control**: Receiver controls sender's rate.

**Congestion control**: Sender adapts to network conditions.

## TCP vs UDP Trade-offs

| TCP | UDP |
|-----|-----|
| Reliable | Unreliable |
| Connection setup overhead | No setup |
| In-order delivery | May arrive out of order |
| Stream-oriented | Message-oriented |
| Flow control prevents overflow | No flow control |
| Congestion control is "fair" | Can be "greedy" |
| Higher latency | Lower latency |

TCP is the right choice for most applications. UDP is appropriate when applications need fine-grained control or cannot tolerate TCP's latency.

## Maximum Segment Size (MSS)

The **Maximum Segment Size (MSS)** is the largest amount of data that TCP will send in a single segment, excluding the TCP header. MSS is negotiated during connection establishment:

```
Client: "My MSS is 1460 bytes"
Server: "My MSS is 1460 bytes"
```

**Common MSS values**:
- **1460 bytes**: Standard for Ethernet (1500 MTU - 20 IP header - 20 TCP header)
- **1220 bytes**: Used over some VPN tunnels
- **536 bytes**: Minimum that must be supported

MSS is independent of the window size. A large window doesn't mean large segments—MSS limits individual segment size while window controls how much unacknowledged data can be in flight.

**Why not just use very large segments?** The Maximum Transmission Unit (MTU) of the network path limits segment size. If a segment is too large, it must be fragmented by IP, which is inefficient and can cause problems if fragments are lost.

## TCP Pseudo-Header and Checksum

TCP's checksum protects against data corruption. Unlike many checksums, TCP's checksum covers more than just the TCP segment—it includes a **pseudo-header** containing IP addresses:

```
Pseudo-Header (12 bytes):
+---------------------------+
| Source IP Address (4)     |
+---------------------------+
| Destination IP Address (4)|
+---------------------------+
|  Zero |Protocol|TCP Length|
+---------------------------+
```

This pseudo-header ensures that a segment arriving at the wrong destination (due to IP address corruption) will fail its checksum. The checksum algorithm is the one's complement of the one's complement sum of all 16-bit words.

**Checksum calculation**:
1. Set checksum field to zero
2. Pad to 16-bit boundary if needed
3. Sum all 16-bit words (including pseudo-header, header, and data)
4. Take one's complement of the sum

While not as strong as CRC, this checksum catches most transmission errors and is fast to compute in software.

## TCP Timers

TCP uses several timers to ensure reliability:

**Retransmission Timer**: Triggers retransmission if an ACK doesn't arrive in time. The timeout value (RTO) is calculated from measured round-trip times:

```
RTO = SRTT + 4 × RTTVAR

Where:
  SRTT = Smoothed Round-Trip Time
  RTTVAR = Round-Trip Time Variation
```

If a segment is retransmitted, TCP applies **exponential backoff**: the timeout doubles for each successive retransmission (1s, 2s, 4s, 8s...).

**Persistence Timer**: Prevents deadlock when the receiver advertises a zero window. TCP periodically sends probe segments to check if the window has opened.

**Keepalive Timer**: Detects dead connections. If no data is exchanged for a period (typically 2 hours), TCP sends keepalive probes. If no response, the connection is closed.

**TIME-WAIT Timer**: After closing a connection, TCP waits (2 × MSL, typically 60-240 seconds) before the same socket pair can be reused. This ensures delayed packets from the old connection don't interfere with a new one.

## Common TCP Mistakes

**Mistake 1: Assuming one send() = one recv()**

TCP is a byte stream. A single `send()` may be delivered across multiple `recv()` calls, or multiple `send()` calls may arrive in a single `recv()`. Applications must handle partial reads and implement message boundaries.

**Mistake 2: Ignoring half-closed connections**

When one side sends FIN, it can still receive data. Applications must handle the case where the peer has closed its sending side but you haven't finished sending.

**Mistake 3: Not handling connection resets properly**

A RST can arrive at any time. Applications should gracefully handle `ECONNRESET` errors rather than crashing.

## Key Takeaways

- TCP transforms unreliable IP into a reliable byte stream service
- Sequence numbers identify byte positions, enabling reordering and duplicate detection
- Cumulative acknowledgments indicate the next expected byte
- TCP maintains connection state: sequence numbers, windows, timers
- The segment format includes ports, sequence/ack numbers, flags, window, and checksum
- MSS negotiation prevents fragmentation
- Multiple timers ensure reliability and detect failures
- TCP is connection-oriented and full-duplex, suitable for most applications
