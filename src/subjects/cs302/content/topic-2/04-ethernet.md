---
id: cs302-t2-ethernet
title: "Ethernet Technology"
order: 4
---

# Ethernet Technology

**Ethernet** is the dominant Local Area Network (LAN) technology, carrying the vast majority of wired network traffic worldwide. From its origins at Xerox PARC in the 1970s to today's 400 Gbps data center networks, Ethernet has continuously evolved while maintaining backward compatibility.

## Ethernet History and Evolution

```
Ethernet Timeline:

1973: Experimental Ethernet (Xerox PARC, 2.94 Mbps)
1980: DIX Ethernet (Digital, Intel, Xerox)
1983: IEEE 802.3 (10BASE5 "Thick Ethernet")
1990: 10BASE-T (Twisted pair)
1995: Fast Ethernet (100 Mbps)
1999: Gigabit Ethernet
2002: 10 Gigabit Ethernet
2010: 40/100 Gigabit Ethernet
2017: 200/400 Gigabit Ethernet
```

## Ethernet Naming Convention

```
[Speed][Signaling][Segment Type/Length]

Examples:
10BASE-T:
  10    = 10 Mbps
  BASE  = Baseband signaling
  T     = Twisted pair

100BASE-TX:
  100   = 100 Mbps
  BASE  = Baseband
  TX    = Twisted pair, Cat 5

1000BASE-SX:
  1000  = 1000 Mbps (1 Gbps)
  BASE  = Baseband
  SX    = Short wavelength fiber (multimode)

10GBASE-LR:
  10G   = 10 Gbps
  BASE  = Baseband
  LR    = Long reach fiber (single-mode)
```

## Common Ethernet Standards

| Standard | Speed | Medium | Max Distance |
|----------|-------|--------|--------------|
| 10BASE-T | 10 Mbps | Cat 3 UTP | 100m |
| 100BASE-TX | 100 Mbps | Cat 5 UTP | 100m |
| 1000BASE-T | 1 Gbps | Cat 5e UTP | 100m |
| 1000BASE-SX | 1 Gbps | MMF | 550m |
| 1000BASE-LX | 1 Gbps | SMF | 5km |
| 10GBASE-T | 10 Gbps | Cat 6a UTP | 100m |
| 10GBASE-SR | 10 Gbps | MMF | 400m |
| 10GBASE-LR | 10 Gbps | SMF | 10km |
| 25GBASE-SR | 25 Gbps | MMF | 100m |
| 40GBASE-SR4 | 40 Gbps | MMF | 100m |
| 100GBASE-SR4 | 100 Gbps | MMF | 100m |

## Ethernet Frame Structure

```
Ethernet II Frame (DIX):

+---------+-----------+-----------+------+-------------+-----+
|Preamble |   SFD     | Dest MAC  | Src  |   Type      |     |
|  7 bytes|  1 byte   |  6 bytes  | MAC  |  2 bytes    | ... |
+---------+-----------+-----------+------+-------------+-----+
                                         |
                                         v
+----------------------------------------+-----+----------+
|            Payload (Data)              | Pad |   FCS    |
|           46-1500 bytes                |     |  4 bytes |
+----------------------------------------+-----+----------+

Field Details:
- Preamble: 10101010... pattern for clock synchronization
- SFD: Start Frame Delimiter (10101011) marks frame start
- Dest/Src MAC: 48-bit hardware addresses
- Type: Identifies upper layer protocol (EtherType)
- Payload: 46-1500 bytes (padded if <46)
- FCS: Frame Check Sequence (CRC-32)

Minimum frame: 64 bytes (for collision detection)
Maximum frame: 1518 bytes (1522 with VLAN tag)
Jumbo frames: Up to 9000 bytes (non-standard)
```

```python
import struct
from dataclasses import dataclass
from typing import Optional

@dataclass
class EthernetFrame:
    dest_mac: bytes
    src_mac: bytes
    ethertype: int
    payload: bytes
    vlan_tag: Optional[int] = None

    @staticmethod
    def mac_to_string(mac: bytes) -> str:
        return ':'.join(f'{b:02X}' for b in mac)

    @classmethod
    def from_bytes(cls, data: bytes) -> 'EthernetFrame':
        dest_mac = data[0:6]
        src_mac = data[6:12]
        ethertype = struct.unpack('!H', data[12:14])[0]

        # Check for VLAN tag (0x8100)
        if ethertype == 0x8100:
            vlan_tag = struct.unpack('!H', data[14:16])[0] & 0x0FFF
            ethertype = struct.unpack('!H', data[16:18])[0]
            payload = data[18:-4]
        else:
            vlan_tag = None
            payload = data[14:-4]

        return cls(dest_mac, src_mac, ethertype, payload, vlan_tag)

    def __str__(self):
        return (
            f"Dest: {self.mac_to_string(self.dest_mac)}\n"
            f"Src:  {self.mac_to_string(self.src_mac)}\n"
            f"Type: 0x{self.ethertype:04X}\n"
            f"VLAN: {self.vlan_tag}\n"
            f"Payload: {len(self.payload)} bytes"
        )
```

## Ethernet Switching

Modern Ethernet uses **switches** to connect devices, creating a switched network where each port is a separate collision domain.

### Switch Operation

```
Learning and Forwarding:

1. Frame arrives on port 3 from AA:BB:CC:DD:EE:FF
2. Switch learns: MAC AA:BB:CC:DD:EE:FF is on port 3
3. Switch looks up destination MAC in table
4. If found: Forward to that port only
5. If not found: Flood to all ports (except source)

MAC Address Table:
+-------------------+------+--------+
| MAC Address       | Port | Age    |
+-------------------+------+--------+
| AA:BB:CC:DD:EE:FF | 3    | 45s    |
| 11:22:33:44:55:66 | 1    | 120s   |
| DE:AD:BE:EF:CA:FE | 5    | 30s    |
+-------------------+------+--------+
```

### Switch Types

**Unmanaged Switch:**
- Plug-and-play, no configuration
- Basic forwarding only
- Home/small office use

**Managed Switch:**
- Web/CLI configuration interface
- VLAN support
- Port mirroring, QoS
- SNMP monitoring
- Enterprise use

**Layer 3 Switch:**
- Includes routing capability
- Inter-VLAN routing at wire speed
- Replaces router for LAN routing

## VLANs (Virtual LANs)

**VLANs** logically segment a physical network into separate broadcast domains:

```
Physical Network:
    [Switch 1]---[Switch 2]
    /   |   \      |   \
  [A1] [B1] [A2]  [B2] [A3]

Logical VLANs:
  VLAN 10 (Sales):    A1, A2, A3
  VLAN 20 (Engineering): B1, B2

Benefits:
- Security: Separate broadcast domains
- Performance: Reduced broadcast traffic
- Flexibility: Move devices without rewiring
- Cost: One switch supports multiple networks
```

### VLAN Tagging (802.1Q)

```
Tagged Frame (802.1Q):

+-----------+-----------+----------+------+------+-------------+
| Dest MAC  | Src MAC   |TPID(8100)| TCI  | Type |   Payload   |
|  6 bytes  |  6 bytes  | 2 bytes  |  2   |  2   |             |
+-----------+-----------+----------+------+------+-------------+

TCI (Tag Control Information):
+-----+-----+--------------+
| PCP | DEI |     VID      |
| 3b  | 1b  |    12 bits   |
+-----+-----+--------------+

PCP: Priority Code Point (QoS)
DEI: Drop Eligible Indicator
VID: VLAN Identifier (0-4095)
```

```python
def parse_vlan_tag(tci: int) -> dict:
    """Parse 802.1Q TCI field."""
    return {
        'pcp': (tci >> 13) & 0x07,    # Priority (0-7)
        'dei': (tci >> 12) & 0x01,    # Drop eligible
        'vid': tci & 0x0FFF,          # VLAN ID (0-4095)
    }

# Example
tci = 0x2064  # Priority 1, VID 100
tag_info = parse_vlan_tag(tci)
print(f"VLAN: {tag_info['vid']}, Priority: {tag_info['pcp']}")
```

## Spanning Tree Protocol (STP)

**STP** (802.1D) prevents loops in switched networks with redundant links:

```
Without STP (Loop):
    [Switch A]
      |    \
      |     \
      |      [Switch C]
      |     /
      |    /
    [Switch B]

Broadcast storms! Frames loop forever.

With STP:
    [Switch A]  ← Root Bridge
      |    \
      |     X (Blocked port)
      |      [Switch C]
      |     /
      |    /
    [Switch B]

One redundant link blocked, no loops.
```

### STP Operation

```
1. Elect Root Bridge (lowest Bridge ID)
2. Calculate root path cost for each bridge
3. Select Root Port (best path to root)
4. Select Designated Port for each segment
5. Block remaining ports

Port States:
- Blocking: Not forwarding, learning MACs
- Listening: Not forwarding, not learning
- Learning: Not forwarding, learning MACs
- Forwarding: Full operation
- Disabled: Administratively down

Convergence time: 30-50 seconds (classic STP)
RSTP (802.1w): Rapid STP, <1 second convergence
```

## Duplex and Auto-Negotiation

```
Half-Duplex: One direction at a time (CSMA/CD)
Full-Duplex: Both directions simultaneously (no CSMA/CD)

Auto-Negotiation (802.3u):
- Devices exchange capability information
- Agree on highest common speed and duplex
- Fast Link Pulses (FLP) during negotiation

Priority (highest to lowest):
1. 1000BASE-T Full Duplex
2. 1000BASE-T Half Duplex
3. 100BASE-TX Full Duplex
4. 100BASE-TX Half Duplex
5. 10BASE-T Full Duplex
6. 10BASE-T Half Duplex
```

## Key Takeaways

- Ethernet dominates LAN technology with speeds from 10 Mbps to 400 Gbps
- Ethernet naming follows [Speed][BASE][Medium] convention
- Frames contain MACs, type field, payload (46-1500 bytes), and CRC
- Switches learn MAC addresses and forward selectively
- VLANs provide logical network segmentation
- STP prevents loops in redundant topologies
- Auto-negotiation determines speed and duplex automatically

Ethernet's success comes from continuous evolution while maintaining compatibility with existing infrastructure.
