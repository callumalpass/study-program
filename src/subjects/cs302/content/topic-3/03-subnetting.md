# Subnetting

## What is Subnetting?

Subnetting divides a larger network into smaller, more manageable sub-networks. By borrowing bits from the host portion of an address to create additional network bits, organizations can create multiple logical networks from a single allocated address block.

Subnetting provides several benefits: improved security through network segmentation, reduced broadcast domain size, more efficient address utilization, and easier network management.

## The Subnetting Process

Given a network address and required subnet configuration:

1. Determine how many subnets are needed
2. Determine how many hosts per subnet
3. Calculate the number of bits to borrow
4. Determine the new subnet mask
5. Calculate subnet addresses and ranges

**Example**: Subnet 192.168.1.0/24 into 4 subnets

Original: /24 = 256 addresses (254 usable hosts)
Need: 4 subnets
Bits to borrow: 2 bits (2² = 4 subnets)
New mask: /26 (24 + 2 = 26)

**Resulting subnets**:
| Subnet | Network | Host Range | Broadcast |
|--------|---------|------------|-----------|
| 0 | 192.168.1.0/26 | .1-.62 | .63 |
| 1 | 192.168.1.64/26 | .65-.126 | .127 |
| 2 | 192.168.1.128/26 | .129-.190 | .191 |
| 3 | 192.168.1.192/26 | .193-.254 | .255 |

Each subnet has 64 addresses (62 usable for hosts).

## Subnet Calculations

**Number of subnets**:

$$\text{Number of subnets} = 2^n$$

where $n$ = number of borrowed bits

**Hosts per subnet**:

$$\text{Usable hosts} = 2^h - 2$$

where $h$ = number of remaining host bits

The $-2$ accounts for network and broadcast addresses.

**Block size** (increment):

$$\text{Block size} = 256 - \text{last octet of subnet mask}$$

**Example**: Mask 255.255.255.192 (/26)

$$\text{Block size} = 256 - 192 = 64$$

Subnets start at: 0, 64, 128, 192

## Variable Length Subnet Masks (VLSM)

Traditional subnetting creates equal-sized subnets. **VLSM** allows different subnet sizes within the same address space, matching subnet size to actual requirements.

**Example**: 192.168.1.0/24 needs:
- 1 subnet with 100 hosts
- 2 subnets with 30 hosts each
- 4 subnets with 10 hosts each

**VLSM allocation**:
1. Start with largest requirement: 100 hosts needs /25 (126 hosts)
   - 192.168.1.0/25 (hosts: .1-.126)
2. Next: 30 hosts needs /27 (30 hosts)
   - 192.168.1.128/27 (hosts: .129-.158)
   - 192.168.1.160/27 (hosts: .161-.190)
3. Finally: 10 hosts needs /28 (14 hosts)
   - 192.168.1.192/28, .208/28, .224/28, .240/28

VLSM requires routing protocols that support classless addressing (OSPF, EIGRP, BGP—not RIPv1).

## Supernetting (Route Aggregation)

The opposite of subnetting, **supernetting** combines multiple networks into a single larger network for routing purposes.

**Example**: Aggregate these networks:
- 192.168.0.0/24
- 192.168.1.0/24
- 192.168.2.0/24
- 192.168.3.0/24

Find common bits:
```
192.168.0.0 = 11000000.10101000.00000000.xxxxxxxx
192.168.1.0 = 11000000.10101000.00000001.xxxxxxxx
192.168.2.0 = 11000000.10101000.00000010.xxxxxxxx
192.168.3.0 = 11000000.10101000.00000011.xxxxxxxx
```

First 22 bits are identical: **192.168.0.0/22**

Supernetting reduces routing table size—instead of four entries, routers need only one.

## Subnet Design Best Practices

**Planning considerations**:
- Current host requirements
- Future growth
- Network segmentation needs
- Administrative boundaries

**Leave room for growth**: Don't allocate subnets exactly to current needs.

**Document everything**: Maintain clear records of allocations.

**Use consistent sizing**: Where practical, use uniform subnet sizes for simplicity.

**Consider topology**: Align subnets with physical or logical boundaries.

## Worked Example

**Problem**: Design a subnet scheme for 192.168.10.0/24 with:
- Engineering: 50 hosts
- Sales: 25 hosts
- Management: 10 hosts
- Server room: 5 hosts

**Solution**:

1. Engineering (50 hosts): Need 64 addresses (/26 = 62 usable)
   - 192.168.10.0/26 (range: .1-.62)

2. Sales (25 hosts): Need 32 addresses (/27 = 30 usable)
   - 192.168.10.64/27 (range: .65-.94)

3. Management (10 hosts): Need 16 addresses (/28 = 14 usable)
   - 192.168.10.96/28 (range: .97-.110)

4. Server room (5 hosts): Need 8 addresses (/29 = 6 usable)
   - 192.168.10.112/29 (range: .113-.118)

**Remaining**: 192.168.10.120/29 through 192.168.10.248/29 available for future use.

## Common Subnet Masks Reference

| CIDR | Mask | Hosts | Block |
|------|------|-------|-------|
| /24 | 255.255.255.0 | 254 | 256 |
| /25 | 255.255.255.128 | 126 | 128 |
| /26 | 255.255.255.192 | 62 | 64 |
| /27 | 255.255.255.224 | 30 | 32 |
| /28 | 255.255.255.240 | 14 | 16 |
| /29 | 255.255.255.248 | 6 | 8 |
| /30 | 255.255.255.252 | 2 | 4 |
| /31 | 255.255.255.254 | 2* | 2 |
| /32 | 255.255.255.255 | 1 | 1 |

*/31 is special: used for point-to-point links (no broadcast needed)
