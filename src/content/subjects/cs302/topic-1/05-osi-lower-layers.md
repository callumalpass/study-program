# OSI Lower Layers: Transport, Network, Data Link, and Physical

## Introduction to Lower Layers

The lower four layers of the OSI model handle the mechanics of data transmission across networks. While upper layers deal with application-level concerns, lower layers ensure that bits get from source to destination reliably and efficiently. These layers form the foundation upon which all network communication is built.

Network infrastructure devices (routers, switches, hubs) typically operate at these lower layers, while end-host software implements the full stack from physical through application.

## Layer 4: The Transport Layer

The transport layer provides end-to-end communication services for applications. It extends the network layer's host-to-host delivery to process-to-process delivery, allowing multiple applications on a single host to share the network simultaneously.

**Key functions of the transport layer:**
- **Segmentation and reassembly**: Breaking application data into segments for transmission and reassembling at destination
- **Connection management**: Establishing, maintaining, and terminating connections (for connection-oriented protocols)
- **Multiplexing/demultiplexing**: Using port numbers to direct data to correct applications
- **Flow control**: Preventing senders from overwhelming receivers
- **Reliability**: Ensuring data arrives correctly through acknowledgments and retransmissions
- **Congestion control**: Adapting transmission rate to network conditions

**Service types provided:**
- **Connection-oriented, reliable**: Like a telephone call—setup required, guaranteed delivery (TCP)
- **Connectionless, unreliable**: Like postcards—no setup, best-effort delivery (UDP)
- **Connectionless, reliable**: Rarely implemented but theoretically possible

The transport layer is the lowest layer that provides true end-to-end services—everything below it operates hop-by-hop, with each router handling the packet independently.

## Layer 3: The Network Layer

The network layer is responsible for moving packets from source to destination across potentially many intermediate networks. It's where internetworking happens—connecting different types of networks into a unified communication system.

**Key functions of the network layer:**
- **Logical addressing**: Providing addresses (like IP addresses) that identify hosts across all connected networks
- **Routing**: Determining the path packets should take through the network
- **Forwarding**: Moving packets from input to output at each router
- **Fragmentation**: Breaking large packets into smaller pieces when necessary
- **Packet lifetime management**: Preventing packets from circulating forever (TTL)

**Routing vs Forwarding:**
- **Routing** is the process of building routing tables that map destinations to next hops
- **Forwarding** is the actual process of moving a packet based on those tables

The network layer abstracts away the heterogeneity of underlying networks. Different physical networks (Ethernet, Wi-Fi, cellular) can be joined into a single logical network where hosts can communicate regardless of their physical connection type.

**Key protocols:**
- IP (Internet Protocol): The network layer protocol of the Internet
- ICMP (Internet Control Message Protocol): Error reporting and diagnostics
- ARP (Address Resolution Protocol): Mapping IP addresses to MAC addresses

## Layer 2: The Data Link Layer

The data link layer provides reliable transfer of data across a single physical link. It takes raw bit transmission from the physical layer and adds structure, error detection, and media access control.

**Key functions of the data link layer:**
- **Framing**: Organizing bits into discrete frames with clear boundaries
- **Physical addressing**: Using MAC addresses to identify devices on the same network segment
- **Error detection/correction**: Identifying (and sometimes fixing) transmission errors
- **Flow control**: Managing transmission rate between directly connected devices
- **Media access control**: Coordinating access to shared media

**Data link sublayers:**
The IEEE divided the data link layer into two sublayers:
- **Logical Link Control (LLC)**: Provides flow control and error handling
- **Media Access Control (MAC)**: Controls how devices access the physical medium

**Frame structure:**
A typical frame includes:
- Header: Contains addresses and control information
- Payload: The data being transported (often a network layer packet)
- Trailer: Usually contains error detection code (like CRC)

**Key protocols:**
- Ethernet (IEEE 802.3): The dominant LAN technology
- Wi-Fi (IEEE 802.11): Wireless LAN technology
- PPP (Point-to-Point Protocol): WAN link protocol

## Layer 1: The Physical Layer

The physical layer is concerned with transmitting raw bits over a physical medium. It defines the electrical, mechanical, and procedural specifications for network hardware.

**Key functions of the physical layer:**
- **Bit representation**: How bits are represented as electrical or optical signals
- **Data rate**: The number of bits transmitted per second
- **Synchronization**: How sender and receiver maintain timing
- **Physical topology**: How devices are physically connected
- **Transmission mode**: Simplex, half-duplex, or full-duplex

**Physical layer specifications include:**
- **Electrical**: Voltage levels, impedance, signal timing
- **Mechanical**: Connector types, pin layouts, cable specifications
- **Procedural**: Sequence of steps for establishing and using physical connections

**Transmission media:**
- **Copper wire**: Twisted pair (Cat5, Cat6), coaxial cable
- **Fiber optic**: Single-mode, multi-mode
- **Wireless**: Radio frequency, infrared, microwave

**Encoding schemes:**
Physical layers use various encoding methods to represent bits:
- **NRZ (Non-Return to Zero)**: Simple but has synchronization issues
- **Manchester encoding**: Self-clocking but uses double bandwidth
- **4B/5B, 8B/10B**: Map data bits to larger patterns to ensure transitions

## Layer Interaction Example

Consider data traveling from a web browser to a web server:

1. **Application layer**: HTTP GET request is created
2. **Transport layer**: Request becomes TCP segment with port 80, sequence numbers
3. **Network layer**: Segment becomes IP packet with source/destination IP addresses
4. **Data link layer**: Packet becomes Ethernet frame with MAC addresses
5. **Physical layer**: Frame becomes electrical signals on the wire

At each router along the path:
- Physical layer receives signals and reconstructs frame
- Data link layer checks frame integrity, extracts packet
- Network layer examines destination IP, makes routing decision
- Data link layer creates new frame for next hop
- Physical layer transmits signals on outgoing interface

The transport layer segment and application data pass through unchanged—routers don't examine or modify them.

## Summary: Layer Responsibilities

Understanding which layer handles which function is crucial for troubleshooting:

| Layer | PDU | Address Type | Devices |
|-------|-----|--------------|---------|
| Transport | Segment | Port numbers | - |
| Network | Packet | IP addresses | Routers |
| Data Link | Frame | MAC addresses | Switches |
| Physical | Bits | - | Hubs, cables |

Each layer adds its own addressing and control information, building upon the services of the layer below.
