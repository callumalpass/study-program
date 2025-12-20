# Transport Layer Services

## Role of the Transport Layer

The transport layer provides communication services between application processes running on different hosts. While the network layer delivers packets from one host to another, the transport layer extends this to deliver data from one process to another.

This process-to-process delivery is what allows multiple applications to use the network simultaneously. A web browser, email client, and video stream can all operate concurrently because the transport layer directs incoming data to the correct application.

## Multiplexing and Demultiplexing

The transport layer's most fundamental service is **multiplexing** (at the sender) and **demultiplexing** (at the receiver).

**Multiplexing**: Gathering data from multiple application processes, adding transport headers, and passing segments to the network layer.

**Demultiplexing**: Examining transport headers on incoming segments and directing each to the appropriate application process.

**Port Numbers**: The mechanism for multiplexing. Each application endpoint is identified by a 16-bit port number (0-65535).

| Port Range | Usage |
|------------|-------|
| 0-1023 | Well-known ports (assigned by IANA) |
| 1024-49151 | Registered ports (registered applications) |
| 49152-65535 | Dynamic/private ports (ephemeral) |

A transport layer segment includes source port and destination port, enabling demultiplexing at both ends.

## Connection-Oriented vs Connectionless

**Connection-Oriented Service (TCP)**:
- Connection established before data transfer
- Data delivered reliably and in order
- Connection terminated when done
- Higher overhead but guaranteed delivery

**Connectionless Service (UDP)**:
- No connection setup
- Data sent immediately
- No delivery guarantees
- Lower overhead, faster for some applications

The choice between them depends on application requirements.

## Reliability

Some applications require every bit to arrive correctly; others can tolerate some loss.

**Reliable delivery** means:
- All data arrives
- Data arrives in order
- No duplicates
- No corruption

TCP provides reliable delivery through:
- Sequence numbers
- Acknowledgments
- Retransmission of lost data
- Checksums for integrity

UDP provides no reliability—this is left to the application if needed.

## Flow Control

**Flow control** prevents a fast sender from overwhelming a slow receiver.

Without flow control, the receiver's buffers could overflow, causing data loss. TCP implements flow control using a **sliding window** mechanism, where the receiver advertises how much buffer space it has available.

UDP has no flow control. If the application sends faster than the receiver can process, data is lost.

## Congestion Control

**Congestion control** prevents senders from overwhelming the network itself.

When too many sources send too fast, routers become congested:
- Queues fill up
- Packets are dropped
- Retransmissions make it worse
- Network can collapse

TCP implements congestion control, reducing transmission rate when congestion is detected. This keeps the network stable but may reduce an individual application's throughput.

UDP has no congestion control. UDP applications can send at whatever rate they choose, potentially contributing to congestion.

## Error Detection

Both TCP and UDP include **checksums** for error detection. The checksum covers the header and data.

If the checksum doesn't match, the segment is discarded:
- TCP: Sender will retransmit (reliable)
- UDP: Data is simply lost (unreliable)

## Service Summary

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Yes | No |
| Reliability | Yes | No |
| Ordering | Yes | No |
| Flow control | Yes | No |
| Congestion control | Yes | No |
| Error detection | Yes | Yes |
| Speed | Slower | Faster |
| Overhead | Higher | Lower |

## Choosing a Transport Protocol

**Use TCP when**:
- Data must arrive correctly (file transfer, web, email)
- Order matters
- Application can't handle its own reliability

**Use UDP when**:
- Speed is critical
- Some loss is acceptable (real-time video/audio)
- Application handles its own reliability
- Multicast or broadcast needed
- Simple request-response (DNS queries)

Many applications use TCP for simplicity. Specialized applications (gaming, VoIP, streaming) may prefer UDP with application-level reliability for portions that need it.

## Transport Layer in the Stack

The transport layer sits between:
- Above: Application layer (HTTP, SMTP, DNS, etc.)
- Below: Network layer (IP)

```
Application → Transport → Network → Data Link → Physical
            (TCP/UDP)      (IP)
```

The transport layer provides the interface that applications use to access the network, hiding the complexity of lower layers.
