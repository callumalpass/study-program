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
