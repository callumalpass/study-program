---
id: cs302-t3-icmp
title: "ICMP Protocol"
order: 5
---

# ICMP: Internet Control Message Protocol

## Purpose of ICMP

ICMP (Internet Control Message Protocol) is a companion protocol to IP that provides error reporting and diagnostic functions. When something goes wrong with packet delivery, or when network information is needed, ICMP carries those messages.

ICMP is essential for network troubleshooting. Tools like ping and traceroute rely entirely on ICMP messages. Understanding ICMP helps diagnose connectivity problems and understand network behavior.

## ICMP Message Format

ICMP messages are encapsulated in IP packets with Protocol field = 1.

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|     Type      |     Code      |          Checksum             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         Message Body                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

**Type**: Identifies the message type
**Code**: Provides additional detail within a type
**Checksum**: Error detection for the entire ICMP message
**Message Body**: Type-specific data

## Common ICMP Types

**Type 0 - Echo Reply**: Response to Echo Request (ping response)
**Type 3 - Destination Unreachable**: Packet couldn't be delivered
**Type 5 - Redirect**: Better route available
**Type 8 - Echo Request**: Ping request
**Type 11 - Time Exceeded**: TTL expired or fragment reassembly timeout

## Destination Unreachable (Type 3)

Sent when a packet cannot be delivered. Code field specifies why:

| Code | Meaning |
|------|---------|
| 0 | Network Unreachable |
| 1 | Host Unreachable |
| 2 | Protocol Unreachable |
| 3 | Port Unreachable |
| 4 | Fragmentation Needed and DF Set |
| 5 | Source Route Failed |
| 13 | Communication Administratively Prohibited |

**Network Unreachable**: Router has no route to destination network.

**Host Unreachable**: Can reach network but not specific host (no ARP response).

**Port Unreachable**: Destination host receives packet but no process is listening on that port. Used by UDP to signal delivery failure.

**Fragmentation Needed**: Packet too large and DF flag is set. Essential for Path MTU Discovery.

## Echo Request/Reply (Types 8/0)

The basis for the ping utility.

**Echo Request**: Sent to test reachability
```
Type: 8
Code: 0
Identifier: 16-bit value to match replies
Sequence Number: Incremented for each request
Data: Optional payload (often timestamp)
```

**Echo Reply**: Response to Echo Request
```
Type: 0
Code: 0
Identifier: Copied from request
Sequence Number: Copied from request
Data: Copied from request
```

Ping measures round-trip time (RTT) and packet loss.

## Time Exceeded (Type 11)

**Code 0 - TTL Expired in Transit**: Router decremented TTL to 0. Forms the basis of traceroute.

**Code 1 - Fragment Reassembly Time Exceeded**: Not all fragments arrived within timeout (typically 15-30 seconds).

## Using ICMP for Troubleshooting

**Ping**: Tests basic connectivity
```bash
ping 192.168.1.1
```
- Measures RTT
- Detects packet loss
- Verifies host is up and reachable

**Traceroute**: Discovers path to destination
```bash
traceroute www.example.com
```

Traceroute works by:
1. Send packet with TTL=1 → First router sends Time Exceeded
2. Send packet with TTL=2 → Second router sends Time Exceeded
3. Continue until destination reached
4. Each response reveals a hop in the path

**Windows uses tracert** and sends ICMP Echo Requests. **Linux uses traceroute** and typically sends UDP packets to high ports.

## ICMP Security Considerations

ICMP can be used for attacks:

**Ping flood**: Overwhelming target with Echo Requests
**Smurf attack**: Sending Echo Requests to broadcast address with spoofed source
**ICMP redirect attack**: Malicious redirects to intercept traffic

**Mitigation**:
- Rate-limit ICMP
- Block unnecessary ICMP types at firewalls
- Disable ICMP redirects
- Filter ICMP at network boundaries

**Caution**: Don't block all ICMP. Types 3 (Destination Unreachable) and 11 (Time Exceeded) are essential for proper network operation. Blocking Type 3 Code 4 breaks Path MTU Discovery.

## Path MTU Discovery

PMTUD uses ICMP to discover the smallest MTU along a path:

1. Host sends packet with DF (Don't Fragment) flag set
2. If packet is too large for a link, router sends ICMP Type 3, Code 4 (Fragmentation Needed) including the link's MTU
3. Host reduces packet size and retries
4. Process repeats until packet reaches destination

This avoids fragmentation and its overhead, improving performance.

**Problem**: Some firewalls block ICMP Type 3, causing PMTUD failure. Large packets are silently dropped, creating "black holes."

## ICMPv6

IPv6 uses ICMPv6, which is essential for IPv6 operation (unlike IPv4 where ICMP is helpful but not required):

- Neighbor Discovery (replaces ARP)
- Router discovery
- Path MTU Discovery
- Multicast group management

ICMPv6 must not be blocked—IPv6 won't function properly without it.
