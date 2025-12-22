---
id: cs302-t3-ipv4
title: "IPv4 Addressing"
order: 2
---

# IPv4 Addressing

## IP Address Fundamentals

An IPv4 address is a 32-bit number that uniquely identifies a device on a network. These addresses are typically written in **dotted decimal notation**: four decimal numbers (0-255) separated by dots, each representing one byte.

```
Binary:    11000000 10101000 00000001 00001010
Decimal:   192      168      1        10
Address:   192.168.1.10
```

With 32 bits, IPv4 provides approximately 4.3 billion unique addresses (2³²). While this seemed ample in the 1980s, the explosion of Internet-connected devices has led to address exhaustion, driving adoption of IPv6.

## Address Structure

An IP address has two parts:
- **Network portion**: Identifies the network
- **Host portion**: Identifies the device on that network

The division between network and host portions is flexible. Originally, fixed boundaries defined address classes. Modern addressing uses CIDR (Classless Inter-Domain Routing) for variable-length boundaries.

```
Address:     192.168.1.10
             |-------|---|
             Network  Host
```

Devices on the same network share the same network portion. Routers use the network portion for routing decisions.

## Classful Addressing (Historical)

Originally, IP addresses were divided into classes based on the first few bits:

**Class A** (0xxxxxxx):
- Range: 1.0.0.0 to 126.255.255.255
- Network bits: 8, Host bits: 24
- Networks: 126, Hosts per network: 16 million+
- For very large organizations

**Class B** (10xxxxxx):
- Range: 128.0.0.0 to 191.255.255.255
- Network bits: 16, Host bits: 16
- Networks: 16,384, Hosts per network: 65,534
- For medium organizations

**Class C** (110xxxxx):
- Range: 192.0.0.0 to 223.255.255.255
- Network bits: 24, Host bits: 8
- Networks: 2+ million, Hosts per network: 254
- For small organizations

**Class D** (1110xxxx): 224.0.0.0 to 239.255.255.255 (Multicast)

**Class E** (1111xxxx): 240.0.0.0 to 255.255.255.255 (Reserved)

Classful addressing wasted addresses. A Class B network (65K hosts) might have only a few hundred devices, leaving most addresses unused. This inefficiency accelerated address exhaustion.

## Subnet Masks

A **subnet mask** is a 32-bit value that indicates which bits of an IP address are the network portion (1s) and which are the host portion (0s).

```
IP Address:    192.168.1.10    = 11000000.10101000.00000001.00001010
Subnet Mask:   255.255.255.0   = 11111111.11111111.11111111.00000000
Network:       192.168.1.0     = 11000000.10101000.00000001.00000000
```

To find the network address, AND the IP address with the subnet mask.

**Common subnet masks**:
- 255.0.0.0 (/8): Class A default
- 255.255.0.0 (/16): Class B default
- 255.255.255.0 (/24): Class C default

Subnet masks don't have to align with class boundaries—this flexibility is key to CIDR.

## CIDR Notation

**CIDR (Classless Inter-Domain Routing)** notation specifies the prefix length: the number of network bits.

```
192.168.1.0/24 means:
- Network: 192.168.1.0
- Prefix length: 24 bits
- Subnet mask: 255.255.255.0
- Host range: 192.168.1.1 to 192.168.1.254
- Broadcast: 192.168.1.255
```

CIDR enables efficient address allocation by allowing arbitrary prefix lengths.

**CIDR aggregation**: Multiple networks can be summarized as a single prefix.
```
192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, 192.168.3.0/24
Can be summarized as: 192.168.0.0/22
```

This reduces routing table size—a crucial scalability feature.

## Special Addresses

**Network address**: All host bits zero (e.g., 192.168.1.0/24)
- Identifies the network itself
- Cannot be assigned to a host

**Broadcast address**: All host bits one (e.g., 192.168.1.255/24)
- Packets sent here reach all hosts on the network
- Cannot be assigned to a host

**Loopback**: 127.0.0.0/8 (typically 127.0.0.1)
- Refers to the local host
- Never sent on the network

**Link-local**: 169.254.0.0/16
- Auto-configured when DHCP unavailable
- Not routable

**Private addresses** (RFC 1918):
- 10.0.0.0/8: Large private networks
- 172.16.0.0/12: Medium private networks
- 192.168.0.0/16: Small private networks
- Not routed on the public Internet
- Used with NAT for Internet access

## Address Allocation

**Global coordination**: IANA (Internet Assigned Numbers Authority) allocates blocks to Regional Internet Registries (RIRs):
- ARIN (North America)
- RIPE (Europe, Middle East, Central Asia)
- APNIC (Asia-Pacific)
- LACNIC (Latin America)
- AFRINIC (Africa)

RIRs allocate to ISPs and large organizations, who further allocate to customers.

**Address conservation**: Due to scarcity, addresses are allocated conservatively. Organizations must justify their needs.

## Binary Arithmetic Practice

Converting between binary and decimal is fundamental:

**Decimal to Binary**: Subtract powers of 2
```
192 = 128 + 64 = 10000000 + 01000000 = 11000000
168 = 128 + 32 + 8 = 10101000
```

**Binary to Decimal**: Add powers of 2
```
11000000 = 128 + 64 = 192
```

**Quick conversions** to memorize:
- 128 = 10000000
- 192 = 11000000
- 224 = 11100000
- 240 = 11110000
- 248 = 11111000
- 252 = 11111100
- 254 = 11111110
- 255 = 11111111

Understanding binary is essential for subnetting calculations.

## Determining if Two Hosts Are on the Same Network

A fundamental question in networking: can two hosts communicate directly, or do they need a router? The answer depends on whether they're on the same network.

**To check if hosts are on the same network**:
1. AND each host's IP address with the subnet mask
2. If the results are equal, they're on the same network

**Example**:
```
Host A: 192.168.1.50
Host B: 192.168.1.100
Subnet Mask: 255.255.255.0

Host A & Mask: 192.168.1.0
Host B & Mask: 192.168.1.0
Result: Same network (192.168.1.0/24)
```

**Example with different networks**:
```
Host A: 192.168.1.50
Host B: 192.168.2.100
Subnet Mask: 255.255.255.0

Host A & Mask: 192.168.1.0
Host B & Mask: 192.168.2.0
Result: Different networks - need router
```

This calculation happens on every host for every packet sent. If the destination is on the same network, send directly. If not, send to the default gateway (router).

## Address Exhaustion and Mitigation

IPv4's 4.3 billion addresses seemed infinite in 1981 when the protocol was designed. Today, they're effectively exhausted. Several techniques mitigate this:

**NAT (Network Address Translation)**: Allows multiple devices to share a single public IP address. A home network might have 50 devices but appears as one IP to the Internet. NAT is covered in detail in a later subtopic.

**CIDR**: Replaced wasteful classful allocation with flexible prefix lengths. An organization needing 500 addresses can get a /23 (512 addresses) instead of a Class B (65,536 addresses).

**Private Address Reuse**: The same private addresses (10.x.x.x, 192.168.x.x) are used in millions of networks worldwide. Each is unique only within its network.

**IPv6**: The long-term solution with 128-bit addresses (340 undecillion addresses). Deployment is ongoing but slow due to the success of NAT.

## Common Pitfalls in IP Addressing

**Pitfall 1: Forgetting the network and broadcast addresses**

A /24 network has 256 addresses but only 254 usable for hosts. The first address is the network address (192.168.1.0), and the last is the broadcast address (192.168.1.255). Assigning either to a host causes problems.

**Pitfall 2: Subnet mask mismatches**

If two hosts have different subnet masks, they may disagree about network boundaries. Host A with 255.255.255.0 and Host B with 255.255.0.0 will have different views of the network.

**Pitfall 3: Using public addresses on private networks**

Accidentally using someone else's public IP range on your private network creates routing chaos when traffic tries to reach the real owner of those addresses.

## Key Takeaways

- IPv4 addresses are 32-bit numbers written in dotted decimal notation
- Addresses are divided into network and host portions
- Classful addressing (A/B/C) is historical; CIDR is used today
- Subnet masks indicate which bits are network vs host
- CIDR notation (/24) specifies the prefix length
- Special addresses include network, broadcast, loopback, link-local, and private ranges
- Private addresses (RFC 1918) are not routed on the public Internet
- Binary arithmetic skills are essential for network calculations
