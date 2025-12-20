---
id: cs302-t5-udp
title: "User Datagram Protocol (UDP)"
order: 2
---

# UDP: User Datagram Protocol

## UDP Overview

UDP (User Datagram Protocol) is a minimal transport protocol that adds little beyond IP. It provides multiplexing through port numbers and optional error detection through a checksum, but nothing more—no reliability, ordering, flow control, or congestion control.

This simplicity makes UDP attractive when applications need speed and can handle or tolerate data loss. Understanding UDP helps appreciate what TCP adds and when those additions are worth their cost.

## UDP Segment Format

UDP has a simple 8-byte header:

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length             |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                             Data                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

**Source Port (16 bits)**: Sender's port. Optional—can be 0 if no reply expected.

**Destination Port (16 bits)**: Receiver's port. Required for demultiplexing.

**Length (16 bits)**: Total length of UDP header and data in bytes. Minimum is 8 (header only).

**Checksum (16 bits)**: Error detection. Optional in IPv4, mandatory in IPv6.

Compare to TCP's minimum 20-byte header—UDP's simplicity is evident.

## UDP Checksum

The UDP checksum covers:
- A pseudo-header (IP addresses and protocol)
- UDP header
- UDP data

**Pseudo-header** (for IPv4):
```
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source Address                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination Address                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|      Zero     |    Protocol   |          UDP Length           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

Including IP addresses in the checksum detects misdelivery to wrong host.

**Checksum calculation**:
1. Set checksum field to 0
2. Add all 16-bit words (pseudo-header, header, data)
3. Take one's complement of sum
4. If result is 0, use 0xFFFF (to distinguish from "no checksum")

If checksum verification fails, the datagram is silently discarded.

## UDP Characteristics

**No Connection**: No handshake. Send data immediately.

**No Reliability**: Lost datagrams are not retransmitted.

**No Ordering**: Datagrams may arrive out of order.

**No Flow Control**: Sender can overwhelm receiver.

**No Congestion Control**: Sender doesn't adapt to network congestion.

**Message Boundaries**: UDP preserves message boundaries—each send() creates one datagram.

## Why Use UDP?

Despite its limitations, UDP has important use cases:

**Real-Time Applications**:
- Voice over IP (VoIP)
- Video streaming
- Online gaming
- Late data is often useless; retransmission adds latency

**Simple Request-Response**:
- DNS queries
- NTP (time synchronization)
- DHCP
- One round-trip is efficient

**Multicast and Broadcast**:
- TCP is unicast only
- UDP supports sending to multiple receivers

**Application-Controlled Reliability**:
- Applications can implement exactly the reliability they need
- Example: QUIC (HTTP/3) builds reliability on UDP

**Low Overhead**:
- 8 bytes vs. TCP's minimum 20
- No connection state to maintain
- Less processing per packet

## Common UDP Applications

| Application | Port | Notes |
|-------------|------|-------|
| DNS | 53 | Queries and small responses |
| DHCP | 67/68 | Client/server |
| NTP | 123 | Time synchronization |
| SNMP | 161/162 | Network management |
| RTP | Dynamic | Real-time media |
| QUIC | 443 | HTTP/3 transport |
| Gaming | Various | Low latency critical |

## UDP Programming

UDP sockets are simpler than TCP:

```python
# UDP Server
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(('', 12345))
while True:
    data, addr = sock.recvfrom(1024)
    print(f"Received {data} from {addr}")
    sock.sendto(b"ACK", addr)

# UDP Client
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.sendto(b"Hello", ('server', 12345))
data, addr = sock.recvfrom(1024)
```

Key differences from TCP:
- No connect() needed (can use it for convenience)
- Use sendto()/recvfrom() instead of send()/recv()
- Each send creates separate datagram
- No streaming—discrete messages

## UDP Limitations to Consider

**Maximum Size**: UDP length field is 16 bits, maximum 65,535 bytes including header. Practical limit often lower due to IP fragmentation.

**Fragmentation**: Large UDP datagrams may be fragmented at IP layer. If any fragment lost, entire datagram lost.

**NAT/Firewall Issues**: Without connection state, NAT mappings timeout quickly.

**No Built-in Security**: No encryption or authentication (use DTLS for secure UDP).

UDP's simplicity is both strength and limitation—appropriate for some applications, insufficient for others.
