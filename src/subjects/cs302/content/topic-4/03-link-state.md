---
id: cs302-t4-ls
title: "Link State Routing"
order: 3
---

# Link State Routing

## The Link State Approach

Link state routing takes a fundamentally different approach than distance vector. Instead of sharing distance information with neighbors, each router shares information about its own directly connected links with all routers in the network. Every router then has a complete map of the network topology and can independently compute optimal paths.

This approach, used by OSPF and IS-IS, provides faster convergence and avoids the count-to-infinity problem that plagues distance vector protocols.

## How Link State Works

The link state algorithm has four main phases:

**1. Neighbor Discovery**: Each router discovers its directly connected neighbors using hello packets.

**2. Link State Advertisement (LSA)**: Each router creates a packet describing its links—which neighbors it can reach and at what cost.

**3. Flooding**: LSAs are reliably distributed to all routers in the network. Each router forwards received LSAs to all other neighbors.

**4. Route Computation**: Using the collected LSAs, each router builds a complete topology map and runs Dijkstra's algorithm to compute shortest paths.

## Link State Advertisements

An LSA contains:
- Router ID of the originating router
- List of neighbors and link costs
- Sequence number (to identify newer versions)
- Age (for eventual expiration)

Example LSA from Router A:
```
Router: A
Sequence: 42
Age: 100
Links:
  To B, cost 1
  To D, cost 3
```

When a router's links change, it generates a new LSA with an incremented sequence number and floods it throughout the network.

## Reliable Flooding

LSAs must reach all routers reliably:

1. Receive LSA on an interface
2. Check sequence number—if older than stored version, discard
3. If newer, update link state database
4. Send acknowledgment to sender
5. Forward LSA out all other interfaces

Sequence numbers ensure only the latest information is used. Acknowledgments ensure reliable delivery. This creates a synchronized link state database across all routers.

## Dijkstra's Algorithm

With the complete topology, each router computes shortest paths using Dijkstra's shortest path first (SPF) algorithm:

```
1. Initialize distances: source = 0, all others = infinity
2. Add source to "confirmed" set
3. For each neighbor of newest confirmed node:
   - Calculate distance through this node
   - If less than current distance, update
4. Select unconfirmed node with smallest distance, add to confirmed
5. Repeat from step 3 until all nodes confirmed
```

The result is a shortest path tree rooted at the computing router. The first hop on each path becomes the next hop in the routing table.

## Example: Link State Operation

Network:
```
    A ---1--- B ---2--- C
    |                   |
    3                   1
    |                   |
    D --------4-------- E
```

Router A's link state database after flooding:
```
A: links to B(1), D(3)
B: links to A(1), C(2)
C: links to B(2), E(1)
D: links to A(3), E(4)
E: links to C(1), D(4)
```

Running Dijkstra from A:
```
Step 1: A confirmed, dist=0
Step 2: Update B(1), D(3)
Step 3: Confirm B (smallest). Update C via B: 1+2=3
Step 4: Confirm C. Update E via C: 3+1=4
Step 5: Confirm D. E via D would be 3+4=7 > 4, no update
Step 6: Confirm E

Result: A→B(1), A→B→C(3), A→D(3), A→B→C→E(4)
```

## OSPF: Open Shortest Path First

OSPF is the most widely deployed link state protocol:

**Features**:
- Hierarchical design with areas
- Fast convergence (subsecond possible)
- Support for VLSM and CIDR
- Authentication
- Load balancing across equal-cost paths
- Designated router for broadcast networks

**Area hierarchy**:
- Area 0 (backbone): Must exist, connects all other areas
- Regular areas: Connect to backbone
- Reduces LSA flooding scope
- Summarization at area borders

**Router types**:
- Internal router: All interfaces in one area
- Area Border Router (ABR): Connects areas
- AS Boundary Router (ASBR): Connects to other routing domains

**Packet types**:
- Hello: Neighbor discovery and maintenance
- Database Description: LSA summary exchange
- Link State Request: Request specific LSAs
- Link State Update: Contains LSAs
- Link State Acknowledgment: Confirms receipt

## Link State Characteristics

**Advantages**:
- Fast convergence
- No count-to-infinity
- Complete topology knowledge
- Support for large networks (with areas)
- Flexible metrics

**Disadvantages**:
- More complex than distance vector
- Higher memory requirements (full topology database)
- CPU-intensive SPF calculation
- Flooding can be bandwidth-intensive during changes

## When to Use Link State

Link state protocols are preferred for:
- Large enterprise networks
- Networks requiring fast convergence
- Networks with complex topologies
- Environments where consistent routing is critical

For small, simple networks, distance vector protocols may be sufficient and simpler to manage.
