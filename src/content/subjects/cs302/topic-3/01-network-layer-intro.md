# Network Layer Introduction

The Network layer is responsible for getting packets from source to destination across multiple interconnected networks. While the Data Link layer handles communication within a single network segment, the Network layer enables communication across the entire Internet—routing packets through many intermediate networks to reach their final destination.

## Network Layer Functions

The Network layer provides two primary services:

### 1. Forwarding (Data Plane)

Moving packets from router input to appropriate router output:

```
Forwarding Process:

    Incoming Packet          Router           Outgoing Packet
    [Dest: 10.0.0.5] ---> [Lookup Table] ---> [Dest: 10.0.0.5]
          |                     |                    |
       Input Port           Decision            Output Port
                          (Which port?)

Forwarding is local, per-router, happens in nanoseconds
```

### 2. Routing (Control Plane)

Determining the end-to-end path packets take:

```
Routing Process:

    [Source] --> [R1] --> [R2] --> [R3] --> [Destination]
                  |        |        |
            Routing protocols determine this path
            (RIP, OSPF, BGP, etc.)

Routing is network-wide, path computation, happens in seconds/minutes
```

## Network Layer Service Models

Different service models offer different guarantees:

```
Connectionless (Datagram) - Internet Model:
+----------------------------------------------+
| Each packet routed independently              |
| No guaranteed delivery                        |
| No guaranteed ordering                        |
| No guaranteed bandwidth                       |
| Simple, scalable, robust                      |
+----------------------------------------------+
Used by: IP (Internet Protocol)

Connection-Oriented (Virtual Circuit):
+----------------------------------------------+
| Path established before data transfer         |
| Resources may be reserved                     |
| Packets follow same path                      |
| More complex network                          |
+----------------------------------------------+
Used by: ATM, MPLS (somewhat), legacy X.25
```

## Internet Protocol (IP)

**IP** is the Network layer protocol of the Internet, responsible for addressing and routing:

```
IP Responsibilities:
- Logical addressing (IP addresses)
- Packet formatting (IP header)
- Fragmentation and reassembly
- TTL management (prevent infinite loops)
- Best-effort delivery (no guarantees)

What IP does NOT provide:
- Reliability (use TCP)
- Order (use TCP)
- Error correction
- Congestion control
```

## IPv4 Packet Format

```
IPv4 Header (20-60 bytes):

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
|                    Options (if IHL > 5)                       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

Key Fields:
- Version: 4 (IPv4)
- IHL: Header length in 32-bit words (typically 5 = 20 bytes)
- DSCP/ECN: Quality of Service marking
- Total Length: Entire packet size (max 65,535 bytes)
- TTL: Hop limit (decremented at each router)
- Protocol: Upper layer (6=TCP, 17=UDP, 1=ICMP)
```

```python
import struct
from dataclasses import dataclass

@dataclass
class IPv4Header:
    version: int
    ihl: int
    dscp: int
    ecn: int
    total_length: int
    identification: int
    flags: int
    fragment_offset: int
    ttl: int
    protocol: int
    checksum: int
    src_ip: str
    dst_ip: str

    @classmethod
    def from_bytes(cls, data: bytes) -> 'IPv4Header':
        # Parse first 20 bytes of header
        version_ihl = data[0]
        version = version_ihl >> 4
        ihl = version_ihl & 0x0F

        dscp_ecn = data[1]
        dscp = dscp_ecn >> 2
        ecn = dscp_ecn & 0x03

        total_length = struct.unpack('!H', data[2:4])[0]
        identification = struct.unpack('!H', data[4:6])[0]

        flags_offset = struct.unpack('!H', data[6:8])[0]
        flags = flags_offset >> 13
        fragment_offset = flags_offset & 0x1FFF

        ttl = data[8]
        protocol = data[9]
        checksum = struct.unpack('!H', data[10:12])[0]

        src_ip = '.'.join(str(b) for b in data[12:16])
        dst_ip = '.'.join(str(b) for b in data[16:20])

        return cls(
            version, ihl, dscp, ecn, total_length,
            identification, flags, fragment_offset,
            ttl, protocol, checksum, src_ip, dst_ip
        )

# Protocol numbers
PROTOCOLS = {
    1: 'ICMP',
    6: 'TCP',
    17: 'UDP',
    47: 'GRE',
    50: 'ESP',
    89: 'OSPF',
}
```

## IP Fragmentation

When a packet exceeds the **Maximum Transmission Unit (MTU)** of a link, it must be fragmented:

```
Fragmentation Example:

Original packet: 4000 bytes
MTU of link: 1500 bytes

Fragment 1: Bytes 0-1479, Offset=0, MF=1
Fragment 2: Bytes 1480-2959, Offset=185 (1480/8), MF=1
Fragment 3: Bytes 2960-3999, Offset=370 (2960/8), MF=0

Flags:
- MF (More Fragments): 1 if more fragments follow
- DF (Don't Fragment): Packet should be dropped if too large

Reassembly happens at destination, not intermediate routers
```

## Time To Live (TTL)

TTL prevents packets from looping forever:

```
TTL Operation:

[Source TTL=64] --> [R1 TTL=63] --> [R2 TTL=62] --> [Dest TTL=61]

Each router decrements TTL by 1
If TTL reaches 0:
  - Drop packet
  - Send ICMP "Time Exceeded" to source

TTL also used by traceroute to map paths!
```

## ICMP (Internet Control Message Protocol)

ICMP provides network diagnostics and error reporting:

```
Common ICMP Messages:

Type | Code | Description
-----|------|---------------------------
0    | 0    | Echo Reply (ping response)
3    | 0    | Destination Unreachable - Network
3    | 1    | Destination Unreachable - Host
3    | 3    | Destination Unreachable - Port
8    | 0    | Echo Request (ping)
11   | 0    | Time Exceeded (TTL expired)
```

```python
def traceroute_concept(destination, max_hops=30):
    """Conceptual traceroute algorithm."""
    for ttl in range(1, max_hops + 1):
        # Send packet with TTL = ttl
        # Wait for response

        # If destination reached:
        #   print(f"{ttl}: {destination} - reached!")
        #   break

        # If Time Exceeded received:
        #   router_ip = extract_from_icmp()
        #   rtt = measure_round_trip()
        #   print(f"{ttl}: {router_ip} - {rtt}ms")

        # If timeout:
        #   print(f"{ttl}: * * *")
        pass

# Actual traceroute output:
# 1  192.168.1.1     1.234 ms
# 2  10.0.0.1        5.678 ms
# 3  72.14.215.85   15.234 ms
# 4  216.58.214.78  20.345 ms
```

## Network Layer Devices

### Router

Routers are the fundamental Network layer device:

```
Router Functions:
- Connect different networks
- Forward packets based on destination IP
- Decrement TTL
- May fragment packets
- Run routing protocols
- Separate broadcast domains

Routing Table:
+----------------+-------------+----------+--------+
| Destination    | Next Hop    | Interface| Metric |
+----------------+-------------+----------+--------+
| 192.168.1.0/24 | Direct      | eth0     | 0      |
| 10.0.0.0/8     | 192.168.1.1 | eth0     | 1      |
| 0.0.0.0/0      | 192.168.1.1 | eth0     | 1      |
+----------------+-------------+----------+--------+
```

### Layer 3 Switch

Combines switching and routing:

```
Layer 3 Switch:
- Routes between VLANs at wire speed
- Hardware-based forwarding
- Commonly used for inter-VLAN routing
- Replaces router for internal routing
```

## Key Takeaways

- Network layer enables communication across multiple networks
- Forwarding (data plane) is local; routing (control plane) is network-wide
- IP provides addressing, fragmentation, and best-effort delivery
- IPv4 header contains source/destination addresses, TTL, protocol
- Fragmentation splits packets exceeding MTU
- TTL prevents infinite packet loops
- ICMP provides diagnostics (ping, traceroute) and error reporting
- Routers make forwarding decisions based on routing tables

Understanding the Network layer is essential for troubleshooting connectivity issues and designing scalable network architectures.
