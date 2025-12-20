---
id: cs302-t1-addressing
title: "Network Addressing Fundamentals"
order: 6
---

# Network Addressing Fundamentals

Addressing is how devices locate and communicate with each other across networks. Different layers use different addressing schemes—MAC addresses at Layer 2 and IP addresses at Layer 3. Understanding addressing is fundamental to network troubleshooting and design.

## MAC Addresses (Layer 2)

A **MAC address** (Media Access Control) is a hardware identifier assigned to network interface cards. It's used for communication within a local network segment.

### MAC Address Structure

MAC addresses are 48 bits (6 bytes), typically written as hex pairs:

```
Format: XX:XX:XX:XX:XX:XX
        or XX-XX-XX-XX-XX-XX

Example: 00:1A:2B:3C:4D:5E

Structure:
+------------------------+------------------------+
|    OUI (24 bits)       |   NIC Specific (24)    |
+------------------------+------------------------+
     Vendor ID              Unique identifier

First 3 bytes: Organizationally Unique Identifier (OUI)
  - Assigned to manufacturers by IEEE
  - Identifies the vendor (e.g., 00:1A:2B = Dell)

Last 3 bytes: Device identifier
  - Assigned by manufacturer
  - Unique within vendor's allocation
```

### MAC Address Types

```
Unicast:    First byte is even (bit 0 = 0)
            Example: 00:1A:2B:3C:4D:5E
            Destination: Single specific device

Multicast:  First byte is odd (bit 0 = 1)
            Example: 01:00:5E:xx:xx:xx (IPv4 multicast)
            Destination: Group of devices

Broadcast:  FF:FF:FF:FF:FF:FF
            Destination: All devices on segment
```

### MAC Address Operations

```python
# Working with MAC addresses in Python
import re

def validate_mac(mac):
    """Validate MAC address format."""
    pattern = r'^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$'
    return bool(re.match(pattern, mac))

def normalize_mac(mac):
    """Convert MAC to standard colon-separated format."""
    # Remove separators and convert to uppercase
    clean = mac.replace(':', '').replace('-', '').upper()
    # Insert colons
    return ':'.join(clean[i:i+2] for i in range(0, 12, 2))

def get_vendor_oui(mac):
    """Extract OUI (vendor prefix) from MAC."""
    normalized = normalize_mac(mac)
    return normalized[:8]  # First 3 bytes (8 chars including colons)

print(validate_mac("00:1A:2B:3C:4D:5E"))  # True
print(normalize_mac("00-1a-2b-3c-4d-5e"))  # 00:1A:2B:3C:4D:5E
print(get_vendor_oui("00:1A:2B:3C:4D:5E"))  # 00:1A:2B
```

## IP Addresses (Layer 3)

**IP addresses** provide logical addressing for routing packets across networks. Unlike MAC addresses, IP addresses are configurable and hierarchical.

### IPv4 Addresses

IPv4 uses 32-bit addresses, typically written in dotted decimal notation:

```
Binary:  11000000.10101000.00000001.00001010
Decimal: 192     .168     .1       .10

Each octet: 0-255 (8 bits)
Total combinations: 2^32 ≈ 4.3 billion addresses
```

### IPv4 Address Classes (Historical)

```
Class A: 1.0.0.0   - 126.255.255.255   /8   (16M hosts)
         First bit: 0
         Network.Host.Host.Host

Class B: 128.0.0.0 - 191.255.255.255   /16  (65K hosts)
         First bits: 10
         Network.Network.Host.Host

Class C: 192.0.0.0 - 223.255.255.255   /24  (254 hosts)
         First bits: 110
         Network.Network.Network.Host

Class D: 224.0.0.0 - 239.255.255.255   (Multicast)
Class E: 240.0.0.0 - 255.255.255.255   (Reserved)
```

### Private IP Ranges (RFC 1918)

Reserved for internal networks, not routable on Internet:

```
10.0.0.0    - 10.255.255.255    (10.0.0.0/8)      - Class A
172.16.0.0  - 172.31.255.255    (172.16.0.0/12)   - Class B
192.168.0.0 - 192.168.255.255   (192.168.0.0/16)  - Class C
```

### Special Addresses

```
127.0.0.0/8     - Loopback (localhost)
169.254.0.0/16  - Link-local (APIPA - auto-assigned)
0.0.0.0         - "This network" / default route
255.255.255.255 - Limited broadcast
```

## Subnetting

**Subnetting** divides a network into smaller subnetworks for efficiency and organization.

### Subnet Masks

The subnet mask determines which bits represent the network vs. host:

```
IP Address:   192.168.1.100
Subnet Mask:  255.255.255.0  (or /24)

Binary:
IP:     11000000.10101000.00000001.01100100
Mask:   11111111.11111111.11111111.00000000
        |-------- Network -------| |- Host-|

Network:  192.168.1.0
Host:     0.0.0.100 (or just .100)
Broadcast: 192.168.1.255
```

### CIDR Notation

**CIDR** (Classless Inter-Domain Routing) notation specifies the number of network bits:

```
192.168.1.0/24   → 24 network bits, 8 host bits
10.0.0.0/8       → 8 network bits, 24 host bits
172.16.0.0/12    → 12 network bits, 20 host bits
```

### Subnetting Calculations

```python
import ipaddress

def subnet_info(cidr):
    """Calculate subnet information from CIDR notation."""
    network = ipaddress.ip_network(cidr, strict=False)

    return {
        'network_address': str(network.network_address),
        'broadcast_address': str(network.broadcast_address),
        'netmask': str(network.netmask),
        'prefix_length': network.prefixlen,
        'num_hosts': network.num_addresses - 2,  # Exclude network and broadcast
        'first_host': str(list(network.hosts())[0]) if network.num_addresses > 2 else None,
        'last_host': str(list(network.hosts())[-1]) if network.num_addresses > 2 else None,
    }

# Example
info = subnet_info('192.168.1.0/24')
print(f"Network: {info['network_address']}")
print(f"Broadcast: {info['broadcast_address']}")
print(f"Usable hosts: {info['num_hosts']}")
print(f"Host range: {info['first_host']} - {info['last_host']}")
```

### Subnet Cheat Sheet

```
/30 = 255.255.255.252  → 4 addresses, 2 hosts   (point-to-point)
/28 = 255.255.255.240  → 16 addresses, 14 hosts
/26 = 255.255.255.192  → 64 addresses, 62 hosts
/24 = 255.255.255.0    → 256 addresses, 254 hosts
/22 = 255.255.252.0    → 1024 addresses, 1022 hosts
/16 = 255.255.0.0      → 65,536 addresses
/8  = 255.0.0.0        → 16,777,216 addresses
```

## IPv6 Addresses

IPv6 uses 128-bit addresses to solve IPv4 exhaustion:

```
Format: Eight groups of 4 hex digits
        2001:0db8:85a3:0000:0000:8a2e:0370:7334

Simplified rules:
1. Leading zeros can be omitted: 0db8 → db8
2. Consecutive zero groups replaced by ::  (once only)
   2001:0db8:0000:0000:0000:0000:0000:0001
   → 2001:db8::1

Address space: 2^128 ≈ 340 undecillion addresses
```

### IPv6 Address Types

```
Global Unicast:     2000::/3
   (Routable on Internet)

Link-Local:         fe80::/10
   (Not routed, auto-configured)

Loopback:           ::1
   (Equivalent to 127.0.0.1)

Multicast:          ff00::/8

Unique Local:       fc00::/7
   (Private addresses, like RFC 1918)
```

## Address Resolution

### ARP (Address Resolution Protocol)

ARP maps IP addresses to MAC addresses within a local network:

```
ARP Process:

1. Host A wants to send to 192.168.1.20
2. Host A broadcasts: "Who has 192.168.1.20? Tell 192.168.1.10"
3. Host B (192.168.1.20) replies: "192.168.1.20 is at AA:BB:CC:DD:EE:FF"
4. Host A caches mapping and sends frame

ARP Cache:
+-----------------+-------------------+
| IP Address      | MAC Address       |
+-----------------+-------------------+
| 192.168.1.20    | AA:BB:CC:DD:EE:FF |
| 192.168.1.1     | 00:11:22:33:44:55 |
+-----------------+-------------------+
```

```python
# View ARP cache (conceptual)
import subprocess

def view_arp_cache():
    """Display ARP cache entries."""
    result = subprocess.run(['arp', '-a'], capture_output=True, text=True)
    return result.stdout

print(view_arp_cache())
```

## Port Numbers

**Port numbers** identify specific applications/services on a host:

```
Range: 0-65535 (16 bits)

Well-known ports (0-1023):
  - 20/21: FTP
  - 22: SSH
  - 23: Telnet
  - 25: SMTP
  - 53: DNS
  - 80: HTTP
  - 443: HTTPS

Registered ports (1024-49151):
  - Application-specific

Dynamic/Private ports (49152-65535):
  - Client-side ephemeral ports

Socket Address: IP:Port
  Example: 192.168.1.10:443
```

## Key Takeaways

- MAC addresses identify devices on local networks (Layer 2)
- IP addresses provide logical, hierarchical addressing (Layer 3)
- IPv4 uses 32-bit addresses; IPv6 uses 128-bit addresses
- Subnetting divides networks efficiently using subnet masks
- CIDR notation simplifies subnet representation
- ARP resolves IP addresses to MAC addresses locally
- Port numbers identify specific services/applications
- Private IP ranges are not routable on the public Internet

Mastering addressing is essential for network configuration, troubleshooting, and security analysis.
