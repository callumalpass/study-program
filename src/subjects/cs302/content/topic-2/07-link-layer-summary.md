---
id: cs302-t2-summary
title: "Link Layer Summary"
order: 7
---

# Link Layer: Summary and Best Practices

The Data Link layer provides the foundation for all higher-layer communication, handling the nitty-gritty details of getting frames from one node to another on the same network segment. This summary consolidates key concepts and provides practical guidance for working with link-layer technologies.

## Layer 2 Protocols Summary

```
Protocol Overview:

+------------------+----------------------------------+
|    Protocol      |           Purpose                |
+------------------+----------------------------------+
| Ethernet (802.3) | Wired LAN standard              |
| Wi-Fi (802.11)   | Wireless LAN standard           |
| ARP              | IP to MAC address resolution    |
| STP (802.1D)     | Loop prevention in switched nets|
| VLAN (802.1Q)    | Logical network segmentation    |
| PPP              | Point-to-point connections      |
+------------------+----------------------------------+
```

## Comparing Layer 2 Technologies

```
Technology Comparison:

Feature        | Ethernet   | Wi-Fi       | Fiber
---------------|------------|-------------|-------------
Medium         | Copper     | Radio       | Light
Max Speed      | 400 Gbps   | 9.6 Gbps    | 400 Gbps+
Max Distance   | 100m (UTP) | ~100m       | 100km
MAC Protocol   | CSMA/CD*   | CSMA/CA     | N/A
Collisions     | Rare*      | Possible    | None
Security       | Physical   | Encryption  | Physical

* Modern switched Ethernet eliminates CSMA/CD
```

## Troubleshooting Link Layer Issues

### Common Problems and Solutions

```
Problem: No Connectivity
-----------------------
1. Check physical connection (cable, port LEDs)
2. Verify link status: ip link show (Linux)
3. Check cable type (straight vs crossover)
4. Test with known-good cable
5. Verify port configuration (speed/duplex)

Problem: Intermittent Connectivity
----------------------------------
1. Check for duplex mismatch (auto-negotiate!)
2. Look for CRC errors (damaged cable)
3. Monitor for collisions (half-duplex or hub)
4. Check for spanning tree issues
5. Verify cable length (<100m for Cat5e)

Problem: Slow Performance
------------------------
1. Check negotiated speed (should be max)
2. Look for duplex mismatch
3. Monitor for high utilization
4. Check switch port errors
5. Verify VLAN configuration
```

### Useful Commands

```bash
# Linux: View interface details
ip link show
ip -s link  # With statistics
ethtool eth0  # Detailed info

# Check ARP cache
ip neigh show  # Linux
arp -a         # Windows/macOS

# Monitor traffic
tcpdump -i eth0 arp
tcpdump -i eth0 ether host aa:bb:cc:dd:ee:ff

# Check switch connections (CDP/LLDP)
lldpctl
```

```python
import subprocess
import re

def check_interface_status(interface='eth0'):
    """Check network interface status."""

    # Get link info
    result = subprocess.run(
        ['ip', '-s', 'link', 'show', interface],
        capture_output=True, text=True
    )

    output = result.stdout
    info = {}

    # Parse state
    if 'state UP' in output:
        info['state'] = 'UP'
    elif 'state DOWN' in output:
        info['state'] = 'DOWN'

    # Parse MAC address
    mac_match = re.search(r'link/ether ([0-9a-f:]+)', output)
    if mac_match:
        info['mac'] = mac_match.group(1)

    # Parse RX/TX statistics
    rx_match = re.search(r'RX:.*?(\d+)\s+packets', output, re.DOTALL)
    tx_match = re.search(r'TX:.*?(\d+)\s+packets', output, re.DOTALL)

    if rx_match:
        info['rx_packets'] = int(rx_match.group(1))
    if tx_match:
        info['tx_packets'] = int(tx_match.group(1))

    return info

# Example usage
status = check_interface_status('eth0')
print(f"Interface Status: {status}")
```

## Layer 2 Security Best Practices

### Switch Security

```
1. Port Security
   - Limit MACs per port
   - Static MAC binding for critical devices
   - Violation actions: shutdown, restrict, protect

2. DHCP Snooping
   - Prevent rogue DHCP servers
   - Build IP-MAC binding table
   - Required for Dynamic ARP Inspection

3. Dynamic ARP Inspection (DAI)
   - Validate ARP against DHCP bindings
   - Prevent ARP spoofing

4. 802.1X Port Authentication
   - Require credentials before network access
   - RADIUS backend
   - Machine and/or user authentication

5. VLAN Best Practices
   - Don't use VLAN 1 for user traffic
   - Separate sensitive systems
   - Disable unused ports
```

### Wireless Security

```
1. Use WPA3 (or WPA2 minimum)
   - Never use WEP or open networks
   - Enterprise mode for organizations

2. Disable WPS
   - PIN vulnerable to brute force
   - Often exploitable

3. Strong Passwords
   - Long passphrases for PSK
   - Unique per network

4. Guest Network Isolation
   - Separate VLAN for guests
   - No access to internal resources

5. Management Security
   - Change default credentials
   - Use HTTPS for management
   - Limit management access
```

## Network Design Considerations

### Hierarchical Design

```
Three-Tier Architecture:

+------------------+
|    Core Layer    |  ← High-speed backbone
+------------------+     Minimal features
         |
+------------------+
| Distribution     |  ← Policy enforcement
| Layer            |     Inter-VLAN routing
+------------------+     QoS, security
         |
+------------------+
|   Access Layer   |  ← End user connectivity
+------------------+     Port security, VLANs

Benefits:
- Scalability
- Simplified management
- Clear fault domains
- Modular growth
```

### Redundancy and High Availability

```
Redundancy Techniques:

1. Link Aggregation (LACP/802.3ad)
   - Bundle multiple links
   - Increased bandwidth + failover
   - Load balancing

2. Spanning Tree (STP/RSTP/MSTP)
   - Prevent loops
   - Provide failover paths
   - RSTP for fast convergence

3. First-Hop Redundancy (HSRP/VRRP)
   - Virtual gateway IP
   - Automatic failover
   - Transparent to clients

4. Dual-Homed Devices
   - Multiple NICs
   - Connect to different switches
```

## Performance Optimization

### Ethernet Performance Tips

```
1. Full Duplex
   - Ensure auto-negotiation succeeds
   - Or manually configure both ends

2. Flow Control
   - Enable for bursty traffic
   - May not be needed for switched nets

3. Jumbo Frames
   - 9000 byte MTU
   - Reduces overhead for large transfers
   - Entire path must support

4. Quality of Service (QoS)
   - 802.1p priority queuing
   - DSCP marking
   - Critical for VoIP, video
```

### VLAN Design

```
VLAN Planning:

VLAN ID | Purpose          | Subnet
--------|------------------|----------------
1       | Native (unused)  | -
10      | Management       | 10.0.10.0/24
20      | Servers          | 10.0.20.0/24
100     | Engineering      | 10.0.100.0/24
200     | Sales            | 10.0.200.0/24
999     | Guest            | 10.0.255.0/24

Principles:
- Separate by function, not location
- Keep VLANs reasonably sized
- Document everything
- Plan for growth
```

## Quick Reference

### Layer 2 Addresses

```
MAC Address:   48 bits, 6 bytes
Format:        AA:BB:CC:DD:EE:FF
               OUI (vendor) + NIC ID
Broadcast:     FF:FF:FF:FF:FF:FF
Multicast:     Bit 0 of first byte = 1
```

### Common EtherTypes

```
0x0800 - IPv4
0x0806 - ARP
0x8100 - VLAN Tagged Frame (802.1Q)
0x86DD - IPv6
0x88CC - LLDP
0x8847 - MPLS Unicast
```

### Frame Sizes

```
Ethernet minimum: 64 bytes (including FCS)
Ethernet maximum: 1518 bytes (1522 with VLAN tag)
Jumbo frames:     Up to 9000 bytes
```

## Key Takeaways

- The Data Link layer handles node-to-node delivery using MAC addresses
- Ethernet dominates wired LANs; Wi-Fi dominates wireless
- Switches provide intelligent forwarding; hubs are obsolete
- VLANs logically segment networks; STP prevents loops
- ARP resolves IP to MAC addresses locally
- Security features (port security, 802.1X, DAI) are essential
- Proper design includes redundancy, VLANs, and clear hierarchy
- Troubleshooting requires understanding of frame structure and MAC operation

Mastery of Layer 2 technologies provides the foundation for building and maintaining reliable network infrastructure.
