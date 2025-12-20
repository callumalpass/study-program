---
id: cs302-t4-practice
title: "Routing Best Practices"
order: 7
---

# Routing in Practice

## Building a Routing Table

A router's routing table combines information from multiple sources:

**Directly Connected**: Networks on router's own interfaces. Highest priority—these are known for certain.

**Static Routes**: Manually configured by administrator. Used for default routes, specific overrides, or simple networks.

**Dynamic Routes**: Learned from routing protocols. Different protocols have different administrative distances.

**Administrative Distance** (Cisco term) determines preference when multiple sources report the same destination:

| Source | AD |
|--------|-----|
| Connected | 0 |
| Static | 1 |
| eBGP | 20 |
| OSPF | 110 |
| IS-IS | 115 |
| RIP | 120 |
| iBGP | 200 |

Lower AD wins. If a static route (AD 1) and OSPF route (AD 110) both exist for the same prefix, the static route is used.

## Route Selection Process

When a packet arrives:

1. **Longest Prefix Match**: Find all matching routes; select the one with the longest prefix
2. **Best Route**: If multiple routes with same prefix, use AD then metric to select best
3. **Forward**: Send packet to selected next hop

```
Routing Table:
10.0.0.0/8      via 192.168.1.1
10.1.0.0/16     via 192.168.1.2
10.1.2.0/24     via 192.168.1.3

Packet to 10.1.2.50:
- Matches 10.0.0.0/8, 10.1.0.0/16, and 10.1.2.0/24
- Longest match: 10.1.2.0/24
- Forward via 192.168.1.3
```

## Default Routes

A **default route** (0.0.0.0/0) matches any destination. Used when no more specific route exists.

**Typical uses**:
- Hosts: Point to local router
- Stub networks: Point toward Internet
- Edge routers: Point to ISP

**Configuration**:
```
ip route 0.0.0.0 0.0.0.0 203.0.113.1
```

## Route Summarization

**Summarization** (supernetting) combines multiple routes into a single, less specific route.

**Benefits**:
- Smaller routing tables
- Faster lookups
- Less update traffic
- Hidden internal changes

**Example**:
```
Before: 192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, 192.168.3.0/24
After:  192.168.0.0/22
```

**Careful**: Summarization can cause suboptimal routing or black holes if not all component routes exist.

## Troubleshooting Routing

**Common problems**:
- Missing routes
- Suboptimal paths
- Routing loops
- Black holes

**Tools**:

**show ip route** (or equivalent): Display routing table
```
C    192.168.1.0/24 is directly connected, Eth0
O    10.0.0.0/8 [110/20] via 192.168.1.1
S*   0.0.0.0/0 [1/0] via 192.168.1.254
```

**traceroute**: Shows path to destination, identifies where packets are lost or looped.

**ping**: Basic reachability test.

**show ip protocols**: Display routing protocol status.

**debug**: Watch routing protocol operation in real-time.

## Routing Best Practices

**Design**:
- Use hierarchical addressing (enables summarization)
- Document everything
- Plan for growth
- Avoid single points of failure

**Security**:
- Filter routes at boundaries
- Authenticate routing protocols
- Monitor for anomalies

**Operations**:
- Test changes before implementing
- Have rollback plans
- Monitor routing stability
- Keep software updated

## Route Redistribution

When multiple routing protocols are used, **redistribution** shares routes between them:

```
router ospf 1
  redistribute rip metric 100

router rip
  redistribute ospf 1 metric 3
```

**Cautions**:
- Can create routing loops
- Metric conversion is tricky
- Filter to prevent unwanted propagation
- Document clearly

Use redistribution sparingly—single routing protocol is preferred when possible.

## Policy-Based Routing

Standard routing forwards based on destination only. **Policy-Based Routing (PBR)** can forward based on other criteria:

- Source address
- Application (port number)
- Protocol
- Time of day

**Use cases**:
- Send traffic from certain users via specific links
- Load balancing
- Traffic engineering
- Security enforcement

## Equal-Cost Multi-Path (ECMP)

When multiple equal-cost paths exist, routers can load balance:

```
Routing Table:
10.0.0.0/8 via 192.168.1.1 [110/20]
10.0.0.0/8 via 192.168.1.2 [110/20]
```

**Load balancing methods**:
- Per-packet: Maximum distribution but may cause reordering
- Per-flow: Same flow uses same path, maintains order
- Per-destination: Simple, may not distribute evenly

ECMP improves bandwidth utilization and provides redundancy.

## Modern Developments

**Software-Defined Networking (SDN)**: Centralized control plane makes routing decisions; switches just forward.

**Segment Routing**: Encodes path in packet header; simplifies traffic engineering.

**IPv6 Routing**: Same concepts, different address format. OSPFv3, BGP4+.

Routing continues to evolve to meet the demands of modern networks, but fundamental concepts—forwarding, longest match, convergence—remain essential knowledge.
