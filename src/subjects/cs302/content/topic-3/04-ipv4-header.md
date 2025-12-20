---
id: cs302-t3-header
title: "IPv4 Header Format"
order: 4
---

# IPv4 Packet Header

## Header Structure Overview

Every IPv4 packet begins with a header containing control information needed for routing and delivery. The header is at least 20 bytes (160 bits) and can extend to 60 bytes with options. Understanding the header fields is essential for network troubleshooting and protocol analysis.

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |    DSCP   |ECN|         Total Length          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|     Fragment Offset     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |        Header Checksum        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source Address                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination Address                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (if any)                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

## Header Fields

**Version (4 bits)**: IP version number. For IPv4, this is always 4.

**Internet Header Length (IHL, 4 bits)**: Header length in 32-bit words. Minimum value is 5 (20 bytes); maximum is 15 (60 bytes). Values above 5 indicate options are present.

**Differentiated Services Code Point (DSCP, 6 bits)**: Used for Quality of Service. Originally called Type of Service (ToS). Higher values indicate higher priority.

**Explicit Congestion Notification (ECN, 2 bits)**: Allows routers to signal congestion without dropping packets. Requires end-to-end support.

**Total Length (16 bits)**: Total packet size in bytes, including header and data. Maximum value is 65,535 bytes, though practical limits are lower due to MTU constraints.

**Identification (16 bits)**: Unique identifier for the packet. Used to reassemble fragments—all fragments of the same original packet share this ID.

**Flags (3 bits)**:
- Bit 0: Reserved, must be 0
- Bit 1: Don't Fragment (DF). If set and fragmentation needed, packet is dropped
- Bit 2: More Fragments (MF). Set on all fragments except the last

**Fragment Offset (13 bits)**: Position of this fragment in the original packet, measured in 8-byte units. First fragment has offset 0.

**Time to Live (TTL, 8 bits)**: Maximum number of hops the packet can traverse. Each router decrements TTL by 1. If TTL reaches 0, the packet is discarded and an ICMP Time Exceeded message is sent. Prevents packets from circulating forever.

**Protocol (8 bits)**: Identifies the protocol of the payload.
- 1 = ICMP
- 6 = TCP
- 17 = UDP
- 50 = ESP (IPsec)
- 89 = OSPF

**Header Checksum (16 bits)**: Error detection for the header only (not the payload). Recalculated at each hop because TTL changes. Uses one's complement sum.

**Source Address (32 bits)**: IPv4 address of the sender.

**Destination Address (32 bits)**: IPv4 address of the intended recipient.

**Options (variable)**: Rarely used. Include Source Routing, Record Route, Timestamp. Options make processing slower, so they're typically avoided.

## Fragmentation

When a packet is larger than the MTU of the outgoing link, it must be fragmented.

**Fragmentation process**:
1. Router determines payload must be split
2. Creates multiple fragments, each with its own header
3. Sets Identification to same value in all fragments
4. Sets Fragment Offset according to position
5. Sets MF flag on all but last fragment
6. Adjusts Total Length in each fragment

**Example**: 4000-byte packet, MTU 1500
```
Original: [Header:20][Data:3980]

Fragment 1: [Header:20][Data:1480] Offset=0, MF=1
Fragment 2: [Header:20][Data:1480] Offset=185 (1480/8), MF=1
Fragment 3: [Header:20][Data:1020] Offset=370 (2960/8), MF=0
```

**Reassembly**: Only the final destination reassembles fragments. It uses Identification and Fragment Offset to reconstruct the original packet. If any fragment is lost, the entire packet must be retransmitted.

**Path MTU Discovery**: Rather than fragmenting, modern hosts discover the smallest MTU along the path and send appropriately sized packets. Uses DF flag and ICMP Fragmentation Needed messages.

## TTL and Loop Prevention

TTL prevents routing loops from causing packets to circulate indefinitely.

**Typical initial values**:
- Linux: 64
- Windows: 128
- Network equipment: 255

**TTL uses**:
- Loop prevention (primary purpose)
- Limiting packet scope (multicast TTL)
- Traceroute (incrementing TTL to discover path)

## Header Checksum Calculation

The checksum algorithm:
1. Set checksum field to 0
2. Sum all 16-bit words in header using one's complement
3. Take one's complement of the result
4. Store in checksum field

**Verification**: Sum all words including checksum. Result should be 0xFFFF.

**Note**: Checksum must be recalculated at each hop because TTL changes.

## Packet Processing at a Router

When a packet arrives:
1. Verify Version = 4
2. Verify IHL ≥ 5
3. Verify Total Length ≥ IHL × 4
4. Verify Header Checksum
5. Decrement TTL; if 0, send ICMP Time Exceeded
6. Recalculate checksum
7. Look up destination in routing table
8. Fragment if necessary (or drop if DF set)
9. Forward to appropriate interface
