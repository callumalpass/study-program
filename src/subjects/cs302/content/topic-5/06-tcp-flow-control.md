---
id: cs302-t5-tcp-flow
title: "TCP Flow Control"
order: 6
---

# TCP Flow Control

## The Flow Control Problem

When data arrives faster than the receiver can process it, the receiver's buffer fills up. Without intervention, subsequent data would be dropped and need retransmission—wasteful and slow.

Flow control is the mechanism by which the receiver tells the sender how fast to transmit, preventing buffer overflow while maximizing throughput.

## The Receive Window

TCP implements flow control using a **sliding window** protocol. The receiver advertises its available buffer space in the **Window** field of every TCP segment.

**Receive Window (rwnd)**: Number of bytes the receiver is willing to accept.

The sender limits outstanding unacknowledged data to at most rwnd bytes:

$$\text{LastByteSent} - \text{LastByteAcked} \leq \text{rwnd}$$

## Sliding Window Operation

**At receiver**:
```
|----received----|----rwnd----|
                 ^            ^
            LastByteRcvd   BufferEnd
```

The receiver advertises:

$$\text{rwnd} = \text{BufferSize} - (\text{LastByteRcvd} - \text{LastByteRead})$$

As application reads data, rwnd grows. As data arrives, rwnd shrinks.

**At sender**:
```
|--ACK'd--|--sent,unACK'd--|--can send--|--can't send--|
          ^                ^            ^
    LastByteAcked    LastByteSent    LastByteAcked + rwnd
```

Sender can send up to rwnd bytes beyond last acknowledged byte.

## Example

Initial state:
- Receiver buffer: 4000 bytes
- rwnd = 4000

**Sequence**:
1. Sender sends 1000 bytes (seq 0-999)
2. Receiver advertises rwnd = 3000
3. Sender sends 2000 bytes (seq 1000-2999)
4. Receiver advertises rwnd = 1000
5. Application reads 3000 bytes
6. Receiver advertises rwnd = 4000
7. Sender can send more

The window slides forward as data is acknowledged and processed.

## Zero Window

If the application is slow, rwnd can reach zero:
- Receiver buffer is full
- Receiver advertises rwnd = 0
- Sender must stop

**The persist timer**: When rwnd = 0, sender periodically sends **window probe** segments (1 byte or zero-length) to check if window has reopened.

Without probes, deadlock is possible:
- Receiver sends rwnd = 0
- Application processes data, receiver sends rwnd = 4000
- That ACK is lost
- Both sides wait forever

Window probes prevent this deadlock.

## Silly Window Syndrome

**Problem**: Inefficient transmission when small windows are advertised.

**Receiver-side SWS**: Receiver advertises tiny windows as application reads small amounts. Results in many tiny segments.

**Sender-side SWS**: Sender transmits tiny amounts as window opens slightly.

**Solutions**:

**Receiver-side (Clark's solution)**: Don't advertise window increase until:
- Buffer is half empty, OR
- MSS bytes are available

**Sender-side (Nagle's algorithm)**: Don't send small segments if data is outstanding:
```
if (data_to_send < MSS && unacked_data > 0)
    wait for ACK
else
    send
```

Nagle's algorithm accumulates small writes into larger segments. Can be disabled (TCP_NODELAY) when low latency is critical.

## Window Scaling

The Window field is 16 bits, maximum 65,535 bytes. Insufficient for high-bandwidth, high-latency links (e.g., satellite, transcontinental fiber).

**Window scale option** (RFC 7323):
- Negotiated during handshake
- Scale factor from 0-14

$$\text{Window} = \text{WindowField} \times 2^{\text{scale}}$$

**Example**: Window field = 65535, scale = 4

$$\text{Actual window} = 65535 \times 2^4 = 65535 \times 16 = 1{,}048{,}560 \text{ bytes}$$

Window scaling is essential for modern high-speed networks.

## Bandwidth-Delay Product

For maximum throughput, the window must be at least as large as the **bandwidth-delay product (BDP)**:

$$\text{BDP} = \text{Bandwidth} \times \text{RTT}$$

**Example**: 1 Gbps link, 100ms RTT

$$\text{BDP} = \frac{1{,}000{,}000{,}000 \text{ bits/s} \times 0.100 \text{ s}}{8 \text{ bits/byte}} = 12{,}500{,}000 \text{ bytes}$$

Without window scaling, maximum throughput on this link would be limited to:

$$\text{Max Throughput} = \frac{65{,}535 \text{ bytes}}{0.100 \text{ s}} = 655{,}350 \text{ bytes/s} \approx 5.2 \text{ Mbps}$$

Far below the link's capacity. Window scaling enables full utilization.

## Flow Control vs Congestion Control

**Flow control**: Prevents overwhelming the receiver
- Uses receive window (rwnd)
- Receiver-controlled

**Congestion control**: Prevents overwhelming the network
- Uses congestion window (cwnd)
- Sender-controlled

Sender transmits at minimum of rwnd and cwnd:

$$\text{EffectiveWindow} = \min(\text{rwnd}, \text{cwnd})$$

Both mechanisms work together to achieve reliable, efficient transfer.
