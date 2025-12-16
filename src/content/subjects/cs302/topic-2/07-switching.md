# Ethernet Switching

## From Hubs to Switches

Early Ethernet networks used hubs—simple devices that repeat incoming signals to all ports. While cheap, hubs create a single collision domain where only one device can transmit at a time.

**Switches** revolutionized Ethernet by learning which devices are connected to which ports and forwarding frames only to the appropriate port. This creates separate collision domains for each port, enabling simultaneous communication between multiple device pairs.

The transition from shared to switched Ethernet dramatically improved network performance and scalability.

## How Switches Work

A switch operates at Layer 2 (data link layer) and makes forwarding decisions based on MAC addresses.

**Basic operation**:
1. Frame arrives on a port
2. Switch examines source MAC address and updates its MAC table
3. Switch looks up destination MAC address in MAC table
4. If found: forward frame only to that port (unicast)
5. If not found: flood frame to all ports except source (unknown unicast)
6. If broadcast: flood to all ports except source

**MAC Address Table** (CAM table):
- Maps MAC addresses to switch ports
- Entries have timeout (typically 300 seconds)
- Learned dynamically through source address observation
- Limited size (thousands to millions of entries)

## Learning Process

**Self-learning switches** automatically build their MAC tables:

1. Switch starts with empty table
2. Frame arrives from device A on port 1
3. Switch records: MAC-A → Port 1
4. Destination is MAC-B, not in table
5. Switch floods frame to all ports except port 1
6. Device B receives frame on port 3 and responds
7. Response arrives from MAC-B on port 3
8. Switch records: MAC-B → Port 3
9. Future frames to MAC-B go only to port 3

This process requires no configuration—switches "learn" the network topology automatically.

## Switch Forwarding

**Store-and-Forward**:
- Receive entire frame
- Check CRC for errors
- Look up destination
- Forward if CRC valid
- Higher latency but ensures error-free forwarding

**Cut-Through**:
- Start forwarding after receiving destination address
- Lower latency (doesn't wait for entire frame)
- May forward corrupt frames
- Variants: fragment-free waits for first 64 bytes (collision check)

**Adaptive**:
- Starts with cut-through
- Switches to store-and-forward if error rate increases

## Spanning Tree Protocol (STP)

Networks often have redundant paths for reliability. However, loops in a switched network cause:
- **Broadcast storms**: Broadcasts circulate endlessly
- **MAC table instability**: Same MAC appears on multiple ports
- **Duplicate frames**: Same frame arrives multiple times

**Spanning Tree Protocol (802.1D)** prevents loops by:
1. Electing a root bridge (lowest bridge ID)
2. Calculating shortest path to root from each switch
3. Blocking redundant paths (one port per segment to root)
4. Reconfiguring if topology changes

**STP port states**:
- Blocking: Not forwarding, learning MAC addresses
- Listening: Transitioning, not forwarding or learning
- Learning: Building MAC table, not forwarding
- Forwarding: Normal operation
- Disabled: Administratively shut down

**Convergence time**: Original STP takes 30-50 seconds to converge after a change—problematic for modern networks.

**RSTP (Rapid STP, 802.1w)**:
- Faster convergence (seconds instead of minutes)
- New port states: Discarding, Learning, Forwarding
- Proposal/agreement mechanism for quick transitions
- Backward compatible with STP

**MSTP (Multiple STP, 802.1s)**:
- Supports multiple spanning trees for different VLANs
- Load balancing across redundant paths
- More efficient use of links

## VLANs

**Virtual LANs** logically segment a physical network into multiple broadcast domains.

**Benefits**:
- Security: Isolate sensitive traffic
- Performance: Limit broadcast domain size
- Flexibility: Group devices by function, not location
- Management: Simplify network administration

**VLAN operation**:
- Access ports: Connected to end devices, belong to one VLAN
- Trunk ports: Connect switches, carry multiple VLANs with 802.1Q tags
- Native VLAN: Untagged traffic on trunks

**Inter-VLAN routing**:
- VLANs cannot communicate directly (different broadcast domains)
- Router or Layer 3 switch required
- "Router-on-a-stick": Single router interface with subinterfaces

## Layer 2 vs Layer 3 Switching

**Layer 2 Switch**:
- Forwards based on MAC addresses
- Single broadcast domain (per VLAN)
- No IP routing capability
- Lower cost, simpler

**Layer 3 Switch** (Multilayer Switch):
- Combines switching and routing
- Can route between VLANs
- Hardware-based routing (wire speed)
- More expensive but more capable

**When to use Layer 3**:
- Inter-VLAN communication needed
- Large networks with multiple subnets
- Traffic filtering at network boundaries

## Switch Management

**Management interfaces**:
- Console port: Serial connection for initial setup
- Web interface: Browser-based configuration
- SSH/Telnet: Command-line remote access
- SNMP: Monitoring and automation

**Common configurations**:
- VLAN assignments
- Port security (MAC filtering, sticky MAC)
- STP parameters
- Port mirroring (for monitoring)
- Link aggregation (bonding multiple ports)

## Link Aggregation (802.3ad/LACP)

Link Aggregation combines multiple physical links into one logical link:
- Increased bandwidth (2×, 4×, etc.)
- Redundancy (if one link fails, others continue)
- Load balancing across member links

**LACP (Link Aggregation Control Protocol)**:
- Automatic negotiation
- Detects misconfiguration
- Industry standard

Load balancing typically based on hash of addresses (source/destination MAC, IP, port) to maintain packet ordering within flows.
