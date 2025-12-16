# Encapsulation and Protocol Data Units

## What is Encapsulation?

Encapsulation is the process by which each layer of the network stack adds its own header (and sometimes trailer) to data received from the layer above. As data travels down the protocol stack, it accumulates layers of control information, like a letter being placed in progressively larger envelopes.

When data reaches its destination, the reverse process occurs: each layer removes and processes its header, passing the remaining data up to the next layer. This process is called decapsulation.

Encapsulation is fundamental to layered architecture. It allows each layer to operate independently, adding the information it needs without regard to the contents of other layers' headers. A network layer router, for example, only examines the network layer header—it doesn't need to understand transport or application protocols.

## Protocol Data Units

Each layer has its own term for the data it handles:

| Layer | PDU Name | Contains |
|-------|----------|----------|
| Application | Data/Message | Application information |
| Transport | Segment (TCP) / Datagram (UDP) | Application data + transport header |
| Network | Packet | Segment + network header |
| Data Link | Frame | Packet + data link header + trailer |
| Physical | Bits | The frame as a stream of bits |

These Protocol Data Units (PDUs) are nested like Russian dolls. A frame contains a packet, which contains a segment, which contains application data. Each layer treats the entire PDU from the layer above as its payload.

## The Encapsulation Process

Let's trace how an HTTP request is encapsulated:

**Step 1: Application Layer**
The web browser creates an HTTP GET request:
```
GET /index.html HTTP/1.1
Host: www.example.com
```
This is the application-layer message.

**Step 2: Transport Layer**
TCP encapsulates the HTTP request by adding a TCP header:
- Source port (e.g., 52341)
- Destination port (80 for HTTP)
- Sequence number
- Acknowledgment number
- Flags, window size, checksum

The result is a TCP segment.

**Step 3: Network Layer**
IP encapsulates the TCP segment by adding an IP header:
- Source IP address
- Destination IP address
- Time to Live (TTL)
- Protocol (TCP = 6)
- Header checksum

The result is an IP packet.

**Step 4: Data Link Layer**
Ethernet encapsulates the IP packet by adding:
- Header: Source MAC address, Destination MAC address, EtherType
- Trailer: Frame Check Sequence (FCS) for error detection

The result is an Ethernet frame.

**Step 5: Physical Layer**
The frame is converted to electrical signals (voltages) or optical signals for transmission.

## Header Fields and Their Purpose

Each header contains fields that the layer needs to do its job:

**Ethernet Header (14 bytes)**:
```
| Destination MAC (6B) | Source MAC (6B) | EtherType (2B) |
```
- MAC addresses identify devices on the local network
- EtherType indicates the protocol of the payload (0x0800 = IPv4)

**IP Header (20+ bytes)**:
```
| Version | IHL | TOS | Total Length |
| ID | Flags | Fragment Offset |
| TTL | Protocol | Header Checksum |
| Source IP Address |
| Destination IP Address |
```
- IP addresses enable routing across networks
- TTL prevents packets from circulating forever
- Protocol identifies the transport protocol (6=TCP, 17=UDP)

**TCP Header (20+ bytes)**:
```
| Source Port | Destination Port |
| Sequence Number |
| Acknowledgment Number |
| Offset | Flags | Window |
| Checksum | Urgent Pointer |
```
- Ports enable multiplexing to specific applications
- Sequence/Ack numbers enable reliable delivery
- Flags control connection state (SYN, ACK, FIN)

## Overhead Analysis

Each header adds overhead to the data being transmitted. For small messages, this overhead can be significant:

**Minimum headers for TCP over IPv4 over Ethernet:**
- Ethernet: 14 bytes header + 4 bytes FCS = 18 bytes
- IP: 20 bytes
- TCP: 20 bytes
- **Total overhead: 58 bytes**

For a 100-byte HTTP message, about 37% is overhead. For a 1-byte message, overhead would dominate. This is why protocols often try to batch small messages together.

**Maximum Transmission Unit (MTU):**
Each link has a maximum frame size. Ethernet's standard MTU is 1500 bytes for the IP packet. If data exceeds this, the network layer must fragment it into smaller packets.

## Decapsulation Process

On the receiving side, each layer processes and removes its header:

1. **Physical layer**: Converts signals to bits
2. **Data link layer**:
   - Checks FCS for errors
   - Verifies destination MAC address matches
   - Removes Ethernet header/trailer
   - Passes packet to network layer based on EtherType
3. **Network layer**:
   - Verifies checksum
   - Checks destination IP address
   - Removes IP header
   - Passes segment to transport layer based on Protocol field
4. **Transport layer**:
   - Verifies checksum
   - Matches segment to connection using ports
   - Removes transport header
   - Passes data to application
5. **Application layer**: Interprets the HTTP request

At each layer, the header tells the layer how to process the data and where to pass it next.

## Analyzing Network Traffic

Understanding encapsulation is crucial for network analysis. Tools like Wireshark capture and display packets, showing the encapsulation layers:

```
Frame (Ethernet)
├── Ethernet Header
│   ├── Destination: 00:1a:2b:3c:4d:5e
│   ├── Source: 00:11:22:33:44:55
│   └── Type: IPv4 (0x0800)
└── Payload (IP Packet)
    ├── IP Header
    │   ├── Source: 192.168.1.100
    │   ├── Destination: 93.184.216.34
    │   └── Protocol: TCP (6)
    └── Payload (TCP Segment)
        ├── TCP Header
        │   ├── Source Port: 52341
        │   ├── Destination Port: 80
        │   └── Flags: SYN
        └── Payload (Application Data)
            └── HTTP Request
```

This layered view helps in:
- Debugging connectivity issues
- Analyzing protocol behavior
- Detecting security threats
- Understanding network performance

## Practical Applications

**Firewalls** operate at different layers:
- Packet filters examine IP headers (Layer 3)
- Stateful firewalls track TCP connections (Layer 4)
- Application firewalls understand application protocols (Layer 7)

**Network Address Translation (NAT)** modifies IP headers (Layer 3) and TCP/UDP headers (Layer 4) to allow multiple internal hosts to share one public IP.

**Load balancers** may operate at Layer 4 (distributing based on IP/port) or Layer 7 (distributing based on application content).

**Tunneling protocols** (like VPNs) encapsulate packets inside other packets, creating multiple layers of encapsulation.

Understanding encapsulation helps you work with these technologies effectively and troubleshoot network issues by identifying which layer is causing problems.
