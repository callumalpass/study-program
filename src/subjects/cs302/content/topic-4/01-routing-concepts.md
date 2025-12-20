# Routing Concepts

## What is Routing?

Routing is the process of selecting paths through a network for traffic to flow. When a packet arrives at a router, the router must decide where to send it next to move it closer to its destination. This decision-making process, repeated at each router along the path, enables communication across vast networks.

The Internet consists of thousands of interconnected networks. No single entity controls the entire routing system. Instead, routing emerges from the collective decisions of routers running distributed algorithms to share topology information and compute paths.

## Routing vs Forwarding

These terms are often confused but represent distinct functions:

**Routing** (Control Plane):
- Determines paths through the network
- Builds and maintains routing tables
- Runs algorithms and protocols
- Happens in the background
- Time scale: seconds to minutes

**Forwarding** (Data Plane):
- Moves packets from input to output
- Consults forwarding table for each packet
- Simple lookup operation
- Happens per packet
- Time scale: microseconds

Routing creates the map; forwarding follows the map.

## Routing Tables

A **routing table** contains information about known destinations and how to reach them:

```
Destination      Gateway         Interface    Metric
192.168.1.0/24   0.0.0.0        eth0         0
10.0.0.0/8       192.168.1.1    eth0         10
172.16.0.0/12    192.168.1.2    eth0         20
0.0.0.0/0        192.168.1.254  eth0         1
```

**Components**:
- **Destination**: Network prefix being routed to
- **Gateway/Next Hop**: Where to send packets (or direct if local)
- **Interface**: Which physical interface to use
- **Metric**: Cost to reach destination (lower is better)

## Routing Algorithm Goals

A good routing algorithm should:
- **Find correct paths**: Packets should reach their destinations
- **Find optimal paths**: Minimize cost, latency, or hops
- **Be efficient**: Minimize overhead and converge quickly
- **Be robust**: Handle failures gracefully
- **Be scalable**: Work for small and large networks
- **Be fair**: Provide reasonable service to all traffic

## Static vs Dynamic Routing

**Static Routing**:
- Administrator manually configures routes
- No automatic adaptation to changes
- Simple, low overhead
- Suitable for small, stable networks
- Common for default routes and specific overrides

**Dynamic Routing**:
- Routers automatically discover and update routes
- Adapts to topology changes
- More complex, some overhead
- Essential for large networks
- Uses routing protocols (RIP, OSPF, BGP)

Most networks use a combination: dynamic routing for the main network with static routes for specific cases.

## Routing Algorithm Classification

**Global vs Decentralized**:
- **Global (Link State)**: All routers have complete topology information; each computes routes independently
- **Decentralized (Distance Vector)**: Routers know only neighbors; exchange distance information iteratively

**Static vs Dynamic**:
- **Static**: Routes change slowly, typically by administrator
- **Dynamic**: Routes change in response to network conditions

**Load-Sensitive vs Load-Insensitive**:
- **Load-Sensitive**: Consider current traffic when choosing routes
- **Load-Insensitive**: Routes based on topology only (most common)

## Metrics

Routing algorithms use metrics to compare paths. Common metrics:

**Hop Count**: Number of routers traversed. Simple but ignores link speed.

**Bandwidth**: Capacity of links. Higher is better.

**Delay**: Time to traverse links. Lower is better.

**Load**: Current traffic on links. Lower is better.

**Reliability**: Error rate of links. Higher reliability is better.

**Cost**: Administrative value assigned to links.

Different protocols use different metrics. OSPF uses cost (often based on bandwidth). RIP uses hop count. BGP considers policy and AS path length.

## Convergence

When network topology changes (link fails, new link added), routing tables must update to reflect the new reality. **Convergence** is the process of routers reaching a consistent view of the network.

**Convergence time**: How long until all routers agree on routes.

**During convergence**:
- Routes may be inconsistent
- Packets may loop
- Some destinations may be temporarily unreachable

Fast convergence is crucial for network stability. Well-designed protocols minimize convergence time while avoiding oscillation.

## Autonomous Systems

The Internet is divided into **Autonomous Systems (AS)**: networks under single administrative control. Each AS has a unique number (ASN).

**Interior routing**: Within an AS, using Interior Gateway Protocols (IGPs)
- RIP, OSPF, EIGRP, IS-IS
- Focus on finding best paths

**Exterior routing**: Between ASes, using Exterior Gateway Protocols (EGPs)
- BGP (Border Gateway Protocol)
- Focus on policy and reachability

This hierarchy enables the Internet to scale. Each AS manages its internal routing independently while BGP handles inter-AS connectivity.
