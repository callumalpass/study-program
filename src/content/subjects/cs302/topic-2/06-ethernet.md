# Ethernet Technology

## History and Evolution

Ethernet was invented at Xerox PARC in the 1970s by Robert Metcalfe and David Boggs. Named after the luminiferous ether (once thought to carry light waves), Ethernet has become the dominant LAN technology, evolving from 2.94 Mbps over coaxial cable to 400 Gbps over fiber optic.

The IEEE 802.3 standard formalized Ethernet in 1983. Since then, Ethernet has increased in speed by a factor of over 100,000 while maintaining backward compatibility at higher layers. This remarkable evolution demonstrates the power of good architectural design.

## Ethernet Standards

Ethernet standards follow a naming convention: speed (in Mbps or Gbps), encoding type (BASE for baseband), and medium indicator.

**10 Mbps Ethernet (Legacy)**:
- 10BASE5 (Thicknet): 500m coax segments
- 10BASE2 (Thinnet): 185m coax segments
- 10BASE-T: Twisted pair, star topology with hub

**100 Mbps Fast Ethernet**:
- 100BASE-TX: Cat5 UTP, 100m
- 100BASE-FX: Fiber optic, 2km

**1 Gbps Gigabit Ethernet**:
- 1000BASE-T: Cat5e/6 UTP, 100m
- 1000BASE-SX: Multi-mode fiber, 550m
- 1000BASE-LX: Single-mode fiber, 5km

**10 Gbps 10 Gigabit Ethernet**:
- 10GBASE-T: Cat6a UTP, 100m
- 10GBASE-SR: Multi-mode fiber, 300m
- 10GBASE-LR: Single-mode fiber, 10km

**Higher speeds**:
- 25 Gbps: Data center servers
- 40 Gbps: Data center aggregation
- 100 Gbps: Core networks, data centers
- 200/400 Gbps: Latest standards

## MAC Addresses

Every Ethernet interface has a unique 48-bit MAC (Media Access Control) address, usually written as six pairs of hexadecimal digits: `00:1A:2B:3C:4D:5E`.

**Address structure**:
- First 24 bits: Organizationally Unique Identifier (OUI), assigned to manufacturers
- Last 24 bits: Assigned by manufacturer, unique per interface
- First bit: 0 = unicast, 1 = multicast
- Second bit: 0 = globally unique, 1 = locally administered

**Special addresses**:
- `FF:FF:FF:FF:FF:FF`: Broadcast (all stations receive)
- `01:00:5E:xx:xx:xx`: IPv4 multicast
- `33:33:xx:xx:xx:xx`: IPv6 multicast

MAC addresses are burned into hardware but can often be changed in software (useful for virtualization, troubleshooting, or security).

## Ethernet Frame Format

Standard Ethernet frame:
```
| Preamble | SFD | Dest MAC | Src MAC | Type | Payload | FCS |
| 7 bytes  | 1B  | 6 bytes  | 6 bytes | 2B   | 46-1500 | 4B  |
```

**Preamble (7 bytes)**: 10101010 pattern for clock synchronization

**Start Frame Delimiter (1 byte)**: 10101011 marks frame start

**Destination MAC (6 bytes)**: Target address

**Source MAC (6 bytes)**: Sender address

**EtherType/Length (2 bytes)**:
- Values ≥ 1536 (0x0600): Protocol identifier (EtherType)
- Values ≤ 1500: Payload length (802.3 format)
- Common EtherTypes: 0x0800 (IPv4), 0x86DD (IPv6), 0x0806 (ARP)

**Payload (46-1500 bytes)**: Data from higher layers

**Frame Check Sequence (4 bytes)**: CRC-32 for error detection

**Total frame size**: 64-1518 bytes (excluding preamble and SFD)

## VLAN Tagging (802.1Q)

VLANs (Virtual LANs) logically separate networks on shared physical infrastructure. The 802.1Q standard adds a 4-byte tag to frames:

```
| Dest | Src | 802.1Q Tag | Type | Payload | FCS |
                | TPID | TCI |
                | 2B   | 2B  |
```

**Tag Protocol Identifier (TPID)**: 0x8100 indicates tagged frame

**Tag Control Information (TCI)**:
- Priority (3 bits): Quality of Service priority
- DEI (1 bit): Drop Eligible Indicator
- VLAN ID (12 bits): 1-4094 (0 and 4095 reserved)

Tagged frames can be up to 1522 bytes. Switch ports are configured as access (untagged) or trunk (tagged) ports.

## Auto-Negotiation

Modern Ethernet interfaces automatically negotiate:
- Speed: 10, 100, 1000, 10000 Mbps, etc.
- Duplex: Half or full duplex
- Flow control: Pause frame support

Auto-negotiation uses Fast Link Pulse (FLP) signals during link establishment. Each end advertises capabilities; they agree on the best common mode.

**Common issue**: If one end is set to auto and the other is hardcoded, duplex mismatch can occur (one side half-duplex, other full-duplex), causing poor performance.

## Duplex Modes

**Half-duplex**: Can send or receive, not both simultaneously. Requires CSMA/CD for shared media. Rarely used in modern networks.

**Full-duplex**: Can send and receive simultaneously on separate pairs. No collisions, no CSMA/CD needed. Standard in switched networks.

Full-duplex effectively doubles the available bandwidth (1 Gbps full-duplex = 1 Gbps each direction, 2 Gbps aggregate).

## Flow Control

**Pause frames (802.3x)**: When receiver buffers fill, it sends a pause frame requesting sender to stop temporarily.

**Priority Flow Control (802.1Qbb)**: Pause individual traffic classes instead of all traffic. Important for lossless Ethernet in data centers (storage protocols).

## Jumbo Frames

Standard Ethernet MTU is 1500 bytes. **Jumbo frames** increase MTU to 9000 bytes or more.

**Benefits**:
- Reduced per-packet overhead
- Improved throughput for large transfers
- Reduced CPU load

**Considerations**:
- All devices in path must support same MTU
- Not standardized (interoperability issues)
- Primarily used in data centers

## Ethernet Evolution

Ethernet's success comes from:
- **Simplicity**: Easy to understand and implement
- **Low cost**: Economies of scale
- **Compatibility**: Same frame format across speeds
- **Flexibility**: Works over copper, fiber, wireless
- **Standards process**: IEEE 802.3 working group continues evolution

From shared coax to 400 Gbps point-to-point fiber, Ethernet has remained relevant by adapting to new requirements while maintaining its essential character.
