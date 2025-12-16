# Network Layer Functions

## The Role of the Network Layer

The network layer (Layer 3) enables communication between devices that are not directly connected. While the data link layer handles communication within a single network segment, the network layer moves data across multiple interconnected networks, making global communication possible.

The Internet is a "network of networks"—thousands of independent networks connected through routers. The network layer provides the abstraction that lets applications communicate without knowing or caring about the physical path their data takes.

## Key Network Layer Functions

**Logical Addressing**: The network layer assigns globally unique addresses (IP addresses) that identify hosts across all connected networks. Unlike MAC addresses, which are flat and local, network layer addresses are hierarchical and routable.

**Routing**: The process of determining the best path for data to travel from source to destination. Routing algorithms build routing tables that guide forwarding decisions.

**Forwarding**: The actual movement of packets from input to output at each router. When a packet arrives, the router examines the destination address and consults its forwarding table to determine the outgoing interface.

**Fragmentation and Reassembly**: Different networks may have different maximum packet sizes (MTU). When a packet is too large for a network, it must be fragmented into smaller pieces and reassembled at the destination.

**Error Handling**: The network layer reports certain error conditions (unreachable destinations, time exceeded) back to the source through protocols like ICMP.

## Routing vs Forwarding

While often confused, routing and forwarding are distinct functions:

**Routing** is a control-plane function that determines paths through the network. Routing algorithms run on routers, exchanging information to build a consistent view of the network topology. This happens in the background, not for each packet.

**Forwarding** is a data-plane function that moves packets based on routing decisions. For each arriving packet, the router looks up the destination in its forwarding table and sends the packet out the appropriate interface. This happens at wire speed.

```
Analogy:
- Routing = Planning your road trip (which highways to take)
- Forwarding = Making a decision at each intersection (which exit)
```

The separation allows routing algorithms to be complex and slow while forwarding remains simple and fast.

## Network Layer Service Models

The network layer can provide different service models:

**Connection-oriented (Virtual Circuits)**:
- Path established before data transfer
- All packets follow same path
- Network maintains per-flow state
- Can guarantee bandwidth, order, delivery
- More complex, less scalable
- Example: ATM (Asynchronous Transfer Mode)

**Connectionless (Datagram)**:
- No path establishment
- Each packet routed independently
- Network maintains no per-flow state
- Best-effort delivery (no guarantees)
- Simple, scalable
- Example: IP (Internet Protocol)

The Internet uses the connectionless model. This design choice, reflecting the end-to-end principle, keeps the network core simple and pushes complexity to endpoints.

## The IP Protocol

The Internet Protocol (IP) is the network layer protocol of the Internet. Everything on the Internet uses IP for network-layer communication.

**IP Characteristics**:
- Connectionless: No setup required
- Unreliable: No delivery guarantees
- Best-effort: Packets may be lost, duplicated, or reordered
- Globally addressed: IP addresses are unique worldwide

IP's simplicity is intentional. By not guaranteeing delivery, IP avoids the complexity of maintaining state in routers. Reliability is provided by TCP at the transport layer when needed.

**IP's Job**: Get packets from source to destination across any combination of networks, adapting to different underlying technologies.

## Routers

Routers are the fundamental devices of the network layer. They connect different networks and forward packets between them.

**Router architecture**:
- Input ports: Receive packets, perform lookup
- Switching fabric: Moves packets from input to output
- Output ports: Queue and transmit packets
- Routing processor: Runs routing protocols, manages tables

**Router operation**:
1. Receive packet on input port
2. Check IP header (version, checksum, TTL)
3. Look up destination in forwarding table
4. Decrement TTL (discard if zero)
5. Update checksum
6. Send to output port via switching fabric
7. Queue if output busy
8. Transmit

Routers make decisions based on destination IP addresses. They don't look at payload content—this layer independence is fundamental to the Internet's design.

## Forwarding Tables

A forwarding table maps destination prefixes to output interfaces (next hops).

**Example forwarding table**:
| Destination | Next Hop | Interface |
|-------------|----------|-----------|
| 192.168.1.0/24 | Direct | eth0 |
| 10.0.0.0/8 | 192.168.1.1 | eth0 |
| 0.0.0.0/0 | 172.16.0.1 | eth1 |

**Longest Prefix Match**: When multiple entries match a destination, use the one with the longest prefix. This allows hierarchical aggregation while permitting specific exceptions.

Example: For destination 10.1.2.3:
- 10.0.0.0/8 matches (prefix length 8)
- 10.1.0.0/16 matches (prefix length 16)
- 10.1.2.0/24 matches (prefix length 24)
→ Use 10.1.2.0/24 (longest match)

## Default Routes

The **default route** (0.0.0.0/0) matches any destination. It's used when no more specific route exists, typically pointing toward the rest of the Internet.

Hosts usually have just a default route pointing to their local router (default gateway). Routers have more detailed tables but still use default routes for destinations they don't know specifically.

## Quality of Service (QoS)

While basic IP provides only best-effort service, mechanisms exist for differentiated treatment:

**Type of Service / DiffServ**: IP header field marks traffic priority
**Integrated Services (IntServ)**: Per-flow resource reservation
**Traffic shaping**: Controlling packet timing
**Queue management**: Prioritizing certain traffic in router queues

These mechanisms help support applications with varying requirements (voice needs low latency, video needs bandwidth, bulk transfer can tolerate delay).
