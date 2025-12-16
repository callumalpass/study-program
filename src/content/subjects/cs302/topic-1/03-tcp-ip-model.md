# The TCP/IP Model

While the OSI model provides a conceptual framework, the **TCP/IP model** (also called the Internet model) describes how the Internet actually works. Developed through practical implementation rather than theoretical design, TCP/IP has become the de facto standard for network communication worldwide.

## TCP/IP vs OSI

The TCP/IP model predates the OSI model and takes a more pragmatic approach with fewer layers:

```
        OSI Model                    TCP/IP Model
    +----------------+           +----------------+
    |  Application   |           |                |
    +----------------+           |  Application   |
    | Presentation   |           |                |
    +----------------+           +----------------+
    |    Session     |           |   Transport    |
    +----------------+           +----------------+
    |   Transport    |           |    Internet    |
    +----------------+           +----------------+
    |    Network     |           | Network Access |
    +----------------+           | (Link Layer)   |
    |   Data Link    |           +----------------+
    +----------------+
    |   Physical     |
    +----------------+
```

Key differences:

| Aspect | OSI Model | TCP/IP Model |
|--------|-----------|--------------|
| Layers | 7 | 4 (or 5) |
| Origin | ISO standard | DARPA research |
| Approach | Theory-first | Implementation-first |
| Adoption | Reference model | Actual Internet |
| Flexibility | Rigid layer boundaries | More flexible |

## The Four TCP/IP Layers

### Layer 4: Application Layer

The TCP/IP Application layer combines OSI's Application, Presentation, and Session layers. It handles all application-specific functionality:

**Responsibilities:**
- User interface to network services
- Data representation and encoding
- Session management (when needed)
- Application protocols

**Key Protocols:**

| Protocol | Purpose | Port |
|----------|---------|------|
| HTTP/HTTPS | Web communication | 80/443 |
| FTP | File transfer | 20/21 |
| SMTP | Email sending | 25/587 |
| POP3/IMAP | Email retrieval | 110/143 |
| DNS | Name resolution | 53 |
| SSH | Secure shell | 22 |
| DHCP | IP configuration | 67/68 |

```python
# Application layer: DNS lookup using socket
import socket

# DNS resolution happens at the application layer
ip_address = socket.gethostbyname('www.google.com')
print(f"Resolved IP: {ip_address}")

# HTTP request example
import http.client
conn = http.client.HTTPSConnection("www.example.com")
conn.request("GET", "/")
response = conn.getresponse()
print(f"Status: {response.status}")
```

### Layer 3: Transport Layer

The Transport layer provides end-to-end communication services, offering either reliable or unreliable delivery:

**Responsibilities:**
- Process-to-process delivery using ports
- Segmentation and reassembly
- Connection management (TCP)
- Error detection and recovery
- Flow control and congestion control

**Key Protocols:**

**TCP (Transmission Control Protocol):**
- Connection-oriented
- Reliable delivery with acknowledgments
- In-order delivery
- Flow and congestion control
- Used by: HTTP, FTP, SMTP, SSH

**UDP (User Datagram Protocol):**
- Connectionless
- Unreliable (best-effort) delivery
- No ordering guarantees
- Lower overhead, faster
- Used by: DNS, DHCP, streaming, gaming

```python
# Transport layer: Port numbers identify applications
# Server listening on port 8080
import socket

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('0.0.0.0', 8080))  # Port 8080 identifies this application
server.listen(5)

# Multiple applications can run simultaneously using different ports
# Web server: port 80
# SSH server: port 22
# Database: port 5432
```

### Layer 2: Internet Layer

The Internet layer handles logical addressing and routing, enabling communication across different networks:

**Responsibilities:**
- Logical addressing (IP addresses)
- Routing packets across networks
- Packet fragmentation and reassembly
- Delivering packets from source to destination

**Key Protocols:**

**IP (Internet Protocol):**
- IPv4: 32-bit addresses (e.g., 192.168.1.1)
- IPv6: 128-bit addresses (e.g., 2001:db8::1)
- Best-effort delivery (no guarantees)
- Routing based on destination address

**ICMP (Internet Control Message Protocol):**
- Error reporting (destination unreachable, time exceeded)
- Diagnostics (ping, traceroute)

**ARP (Address Resolution Protocol):**
- Maps IP addresses to MAC addresses
- Essential for local network communication

```python
# Internet layer: Working with IP addresses
import ipaddress

# IPv4 address manipulation
ipv4 = ipaddress.ip_address('192.168.1.100')
network = ipaddress.ip_network('192.168.1.0/24')

print(f"Is private: {ipv4.is_private}")  # True
print(f"Network: {network.network_address}")
print(f"Broadcast: {network.broadcast_address}")
print(f"Hosts: {list(network.hosts())[:5]}")  # First 5 hosts

# IPv6 address
ipv6 = ipaddress.ip_address('2001:db8::1')
print(f"IPv6 compressed: {ipv6.compressed}")
```

### Layer 1: Network Access Layer

The Network Access (or Link) layer combines OSI's Data Link and Physical layers, handling the actual transmission over physical media:

**Responsibilities:**
- Physical addressing (MAC addresses)
- Framing data for transmission
- Media access control
- Error detection at frame level
- Physical signal transmission

**Key Technologies:**
- Ethernet (wired LAN)
- Wi-Fi (802.11 wireless)
- PPP (Point-to-Point Protocol)
- DSL, Cable, Fiber

```
Frame structure (Ethernet):

+----------+----------+------+----------------+-----+
| Dest MAC | Src MAC  | Type |    Payload     | CRC |
| 6 bytes  | 6 bytes  |2 byte| 46-1500 bytes  |4 byte|
+----------+----------+------+----------------+-----+
```

## Protocol Stack in Action

When you browse a website, here's how data flows through the TCP/IP stack:

```
User types: https://www.example.com

APPLICATION LAYER:
  - Browser constructs HTTP GET request
  - DNS resolves domain to IP address

TRANSPORT LAYER:
  - TCP establishes connection (3-way handshake)
  - Data segmented, sequence numbers added
  - Port 443 (HTTPS) specified

INTERNET LAYER:
  - IP header added with source/destination IPs
  - Routing decisions made at each hop

NETWORK ACCESS LAYER:
  - Frame created with MAC addresses
  - Transmitted as electrical/optical signals

[Through network to server, then reversed for response]
```

## Encapsulation in TCP/IP

```
Application Data: "GET /index.html HTTP/1.1..."
        |
        v
+-------+----------------------------+
|TCP Hdr|    Application Data        |  Segment
+-------+----------------------------+
        |
        v
+------+-------+----------------------------+
|IP Hdr|TCP Hdr|    Application Data        |  Packet
+------+-------+----------------------------+
        |
        v
+--------+------+-------+--------------------+-----+
|Eth Hdr |IP Hdr|TCP Hdr|  Application Data  | CRC |  Frame
+--------+------+-------+--------------------+-----+
```

## Five-Layer Model

Some textbooks use a **five-layer model** that separates the Network Access layer:

1. **Application** (HTTP, DNS, FTP)
2. **Transport** (TCP, UDP)
3. **Network** (IP, ICMP)
4. **Data Link** (Ethernet, Wi-Fi)
5. **Physical** (cables, signals)

This model combines OSI's precision with TCP/IP's practicality and is commonly used in teaching.

## Protocol Data Units (PDUs)

| Layer | PDU Name | Addressing |
|-------|----------|------------|
| Application | Message | — |
| Transport | Segment/Datagram | Port numbers |
| Internet | Packet | IP addresses |
| Network Access | Frame | MAC addresses |

## Key Takeaways

- TCP/IP is the practical model underlying the Internet
- Four layers: Application, Transport, Internet, Network Access
- TCP provides reliable, ordered delivery; UDP provides fast, unreliable delivery
- IP handles logical addressing and routing between networks
- Each layer has specific protocols and addressing schemes
- Data is encapsulated going down and decapsulated going up
- Understanding TCP/IP is essential for any network programming or troubleshooting

The TCP/IP model provides the foundation for understanding how Internet communication actually works, from the applications you use daily to the physical infrastructure carrying your data.
