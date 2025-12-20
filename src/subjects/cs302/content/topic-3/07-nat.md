---
id: cs302-t3-nat
title: "Network Address Translation"
order: 7
---

# NAT: Network Address Translation

## The Address Shortage Problem

As IPv4 addresses became scarce, organizations needed a way to connect more devices than they had public IP addresses. Network Address Translation (NAT) provides a solution by allowing multiple devices to share a single public IP address.

NAT has become ubiquitous in home and enterprise networks. While IPv6 was designed to eliminate the need for NAT, NAT remains essential in IPv4 networks and continues to be widely deployed.

## How NAT Works

NAT modifies IP addresses in packet headers as they pass through a router or firewall. The NAT device maintains a translation table mapping internal addresses to external addresses.

**Basic NAT** (one-to-one):
- Each internal address maps to a unique external address
- Requires multiple public IPs
- Simple but doesn't conserve addresses

**NAPT** (Network Address Port Translation), also called PAT:
- Multiple internal addresses share one external address
- Uses port numbers to distinguish connections
- Most common form of NAT
- Also called "NAT overload" or "masquerading"

## NAPT Operation

When an internal host initiates a connection:

1. **Outbound packet**: Source 192.168.1.10:49152 → Dest 93.184.216.34:80
2. **NAT translates**: Source becomes 203.0.113.1:30000
3. **Creates table entry**: 192.168.1.10:49152 ↔ 203.0.113.1:30000
4. **Outbound continues**: 203.0.113.1:30000 → 93.184.216.34:80

When reply arrives:
1. **Inbound packet**: Source 93.184.216.34:80 → Dest 203.0.113.1:30000
2. **NAT looks up**: 203.0.113.1:30000 → 192.168.1.10:49152
3. **NAT translates**: Dest becomes 192.168.1.10:49152
4. **Delivers to internal host**

The translation table tracks active connections and their mappings.

## NAT Translation Table

Example NAPT table:
| Internal Address | Internal Port | External Address | External Port | Protocol |
|------------------|---------------|------------------|---------------|----------|
| 192.168.1.10 | 49152 | 203.0.113.1 | 30000 | TCP |
| 192.168.1.20 | 50001 | 203.0.113.1 | 30001 | TCP |
| 192.168.1.10 | 53422 | 203.0.113.1 | 30002 | UDP |

Entries typically timeout after inactivity (minutes for UDP, hours for TCP).

## Types of NAT

**Full Cone NAT**: Once internal host sends to any external host, any external host can send back through the mapped port. Least restrictive.

**Restricted Cone NAT**: External host can only send if internal host previously sent to that external IP.

**Port Restricted Cone NAT**: External host can only send if internal host previously sent to that external IP:port.

**Symmetric NAT**: Different external mapping for each destination. Most restrictive, problematic for P2P.

## NAT and Incoming Connections

NAT breaks the end-to-end model of IP. External hosts cannot initiate connections to internal hosts because there's no translation entry.

**Solutions for inbound connections**:

**Port Forwarding**: Manually configure NAT to forward specific external ports to internal hosts.
```
External 203.0.113.1:80 → Internal 192.168.1.100:80
```

**UPnP (Universal Plug and Play)**: Applications automatically configure port forwarding. Convenient but security risks.

**NAT Traversal**: Techniques to work around NAT:
- STUN: Discover external address and NAT type
- TURN: Relay traffic through a server
- ICE: Framework combining multiple techniques

## Advantages of NAT

**Address conservation**: One public IP serves many devices.

**Security**: Internal addresses hidden from Internet. Provides basic firewall-like protection.

**Flexibility**: Change ISPs without renumbering internal network.

**IPv4 extension**: Extended IPv4's useful life by decades.

## Disadvantages of NAT

**Breaks end-to-end**: Applications expecting direct connectivity fail.

**Protocol complications**: Protocols embedding IP addresses in payload (FTP, SIP, H.323) require Application Layer Gateways (ALGs).

**Performance overhead**: Translation adds latency and router load.

**Logging challenges**: Multiple users share one public IP, complicating accountability.

**P2P difficulties**: Peer-to-peer applications struggle with NAT.

## Double NAT

When multiple NAT devices are in the path (e.g., ISP NAT + home router NAT):
- Creates additional complexity
- Can break port forwarding
- Multiple translation lookups add latency
- Often encountered with carrier-grade NAT (CGNAT)

## Carrier-Grade NAT (CGNAT)

ISPs deploy large-scale NAT to share limited IPv4 addresses among customers:
- Customers already using private addresses are NAT'd again
- Port blocks allocated per customer
- Breaks customer port forwarding
- Makes IPv6 more attractive

CGNAT uses reserved range 100.64.0.0/10 to avoid conflicts with customer networks.

## NAT and IPv6

IPv6 was designed to eliminate NAT's necessity—every device can have a globally unique address. However:
- NAT66 exists but is generally discouraged
- NPTv6 (Network Prefix Translation) provides some NAT-like features
- Privacy concerns led to IPv6 Privacy Extensions instead of NAT

NAT should be viewed as an IPv4 workaround, not a permanent architectural feature.
