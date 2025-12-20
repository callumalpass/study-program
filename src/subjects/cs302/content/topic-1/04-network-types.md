---
id: cs302-t1-types
title: "Types of Networks"
order: 4
---

# Types of Networks

Networks are classified by their geographic scope, ownership, and topology. Understanding these classifications helps you choose appropriate technologies and design effective network solutions for different scenarios.

## Classification by Geographic Scope

### Personal Area Network (PAN)

A **PAN** covers a very small area, typically within reach of a person—about 10 meters. PANs connect personal devices for individual use.

**Characteristics:**
- Range: ~10 meters
- Devices: Smartphones, laptops, wearables, headphones
- Technologies: Bluetooth, USB, infrared

**Examples:**
- Smartphone connected to wireless earbuds
- Smartwatch syncing with phone
- Laptop connected to wireless keyboard/mouse

```
PAN Example:
                    [Smartwatch]
                         |
    [Earbuds] --- [Smartphone] --- [Laptop]
                         |
                    [Fitness Band]
```

### Local Area Network (LAN)

A **LAN** connects devices within a limited geographic area—typically a building or campus. LANs are the most common network type in homes and offices.

**Characteristics:**
- Range: Up to a few kilometers
- High speed: 100 Mbps to 10+ Gbps
- Low latency
- Usually single ownership
- Technologies: Ethernet, Wi-Fi

**Common LAN topologies:**
- **Star**: All devices connect to central switch (most common)
- **Bus**: Single cable connects all devices (legacy)
- **Ring**: Devices form a closed loop (legacy)

```
Star Topology LAN:

    [PC 1]    [PC 2]    [Printer]
       \        |        /
        \       |       /
         [  Switch  ]
              |
           [Router]
              |
         [Internet]
```

**LAN technologies:**
- **Ethernet**: IEEE 802.3, dominant wired standard
- **Wi-Fi**: IEEE 802.11, wireless LAN standard

### Metropolitan Area Network (MAN)

A **MAN** spans a city or large campus, connecting multiple LANs within a metropolitan area.

**Characteristics:**
- Range: Up to ~50 km
- Connects buildings, campuses, city infrastructure
- Often owned by single organization or consortium
- Technologies: Fiber optics, WiMAX, metro Ethernet

**Examples:**
- University campus network connecting multiple buildings
- City-wide network for government offices
- Cable TV network infrastructure

### Wide Area Network (WAN)

A **WAN** spans large geographic areas—countries, continents, or globally. The Internet itself is the largest WAN.

**Characteristics:**
- Range: Unlimited (global)
- Connects LANs and MANs across distances
- Uses leased lines, satellites, public infrastructure
- Higher latency than LANs
- Often uses third-party carriers

**WAN Technologies:**
- **MPLS**: Multiprotocol Label Switching
- **Leased lines**: Dedicated point-to-point connections
- **Frame Relay**: Legacy packet-switching (mostly deprecated)
- **VPN**: Virtual Private Networks over public Internet

```
WAN connecting offices:

[LA Office LAN]                        [NYC Office LAN]
      |                                       |
   [Router] ---- [WAN/Internet] ---- [Router]
      |                                       |
[SF Office LAN]                        [Chicago Office LAN]
```

## Classification by Ownership

### Private Networks

**Private networks** are owned and operated by a single organization:
- Corporate intranets
- Home networks
- University campus networks

Characteristics:
- Controlled access
- Custom security policies
- Private IP addressing

### Public Networks

**Public networks** provide services to anyone willing to pay:
- Internet Service Providers (ISPs)
- Public Wi-Fi hotspots
- Cellular networks

## Network Topologies

The **topology** describes how devices are arranged and connected:

### Physical Topologies

```
BUS TOPOLOGY:
    [PC]----[PC]----[PC]----[PC]----[PC]
    =====================================
              (Shared cable)

    - Single point of failure
    - Limited scalability
    - Legacy technology

RING TOPOLOGY:
         [PC]
        /    \
    [PC]      [PC]
        \    /
         [PC]

    - Data travels in one direction
    - Token passing for access control
    - Single break disrupts network

STAR TOPOLOGY:
         [PC]
           |
    [PC]--[Switch]--[PC]
           |
         [PC]

    - Central device manages traffic
    - Easy to add/remove devices
    - Central point of failure
    - MOST COMMON TODAY

MESH TOPOLOGY:
    [PC]------[PC]
     | \    / |
     |   \/   |
     |   /\   |
     | /    \ |
    [PC]------[PC]

    - Full mesh: every device connected to every other
    - Partial mesh: some redundant connections
    - High reliability
    - Used in WANs and critical infrastructure

TREE (HIERARCHICAL) TOPOLOGY:
              [Core]
             /     \
        [Dist1]   [Dist2]
        /    \    /    \
     [Acc] [Acc] [Acc] [Acc]

    - Multiple star networks connected
    - Common in enterprise networks
    - Hierarchical design
```

### Logical Topologies

The **logical topology** describes how data flows, regardless of physical arrangement:
- A physically star network might operate as a logical bus (original Ethernet)
- Virtual LANs (VLANs) create logical segmentation over physical infrastructure

## Switching Techniques

Networks use different techniques to move data:

### Circuit Switching

Establishes a dedicated path for the entire communication session:
- Traditional telephone networks (PSTN)
- Guaranteed bandwidth once connected
- Resources reserved even when idle
- Connection setup delay

```
Circuit Switching:

    A =====[Dedicated Path]===== B

    Path established first, then data flows
    Resources reserved for duration of call
```

### Packet Switching

Data divided into packets that travel independently:
- Modern data networks (Internet)
- Efficient resource utilization
- Variable delay (queuing)
- No connection setup required

```
Packet Switching:

    A --> [P1] --> [Router] --> [P1] --> B
      --> [P2] -->    |    --> [P2] -->
      --> [P3] -------|-----> [P3] -->

    Each packet routed independently
    May take different paths
```

### Message Switching

Entire messages stored and forwarded (store-and-forward):
- Legacy technique
- Email systems conceptually similar
- Higher latency than packet switching

## Network Performance Metrics

When comparing networks, consider:

| Metric | Description | Units |
|--------|-------------|-------|
| Bandwidth | Maximum data rate | bps, Mbps, Gbps |
| Throughput | Actual data rate achieved | bps, Mbps, Gbps |
| Latency | Time for data to traverse network | ms |
| Jitter | Variation in latency | ms |
| Packet Loss | Percentage of packets not delivered | % |

```python
# Measuring network performance with Python
import subprocess
import re

def ping_host(host, count=4):
    """Measure latency to a host."""
    result = subprocess.run(
        ['ping', '-c', str(count), host],
        capture_output=True,
        text=True
    )

    # Parse average latency from output
    match = re.search(r'avg[^=]*=\s*([\d.]+)', result.stdout)
    if match:
        return float(match.group(1))
    return None

# Example usage
latency = ping_host('google.com')
print(f"Average latency to Google: {latency} ms")
```

## Key Takeaways

- Networks are classified by scope: PAN, LAN, MAN, WAN
- LANs are most common and typically use Ethernet or Wi-Fi
- WANs connect geographically distant networks
- Topologies describe physical and logical arrangements
- Star topology dominates modern LANs
- Packet switching enables efficient Internet communication
- Network performance is measured by bandwidth, latency, throughput, and reliability

Understanding network types and topologies helps you design appropriate solutions and troubleshoot connectivity issues effectively.
