# Network Devices and Their Functions

Network devices are the hardware components that enable communication between computers. Each type of device operates at specific layers of the network stack and performs distinct functions. Understanding these devices is crucial for designing, troubleshooting, and securing networks.

## Layer 1 Devices: Physical Layer

### Repeater

A **repeater** regenerates and amplifies signals to extend network reach. It operates purely at the physical layer, dealing only with electrical or optical signals.

**Functions:**
- Receives weakened signal
- Amplifies and regenerates signal
- Retransmits on output port

**Limitations:**
- Cannot filter traffic
- Amplifies noise along with signal
- No intelligence—forwards everything

**Use case:** Extending cable runs beyond maximum length (e.g., 100m for Cat5e Ethernet)

### Hub

A **hub** is a multi-port repeater that connects multiple devices in a star topology. It broadcasts all incoming traffic to every port.

**Functions:**
- Receives signal on one port
- Regenerates and broadcasts to all other ports
- Creates single collision domain

**Why hubs are obsolete:**
- All devices share bandwidth
- Collisions increase with more devices
- Security risk (all traffic visible to all ports)
- Replaced by switches in modern networks

```
Hub Operation:

    [PC A] sends frame to [PC C]
         |
    [Hub] broadcasts to ALL ports
    /    |    \
[PC B] [PC C] [PC D]
(receives) (intended) (receives)
```

## Layer 2 Devices: Data Link Layer

### Network Interface Card (NIC)

The **NIC** (Network Interface Card) provides the physical interface between a computer and the network. Every networked device has at least one NIC.

**Functions:**
- Converts data to/from electrical/optical signals
- Contains unique MAC address
- Handles framing and error detection
- Manages media access

**Key concepts:**
- **MAC Address**: 48-bit unique identifier (e.g., `00:1A:2B:3C:4D:5E`)
- Modern NICs often integrated into motherboards
- Support various speeds: 100 Mbps, 1 Gbps, 10 Gbps

```python
# Getting MAC address in Python
import uuid

def get_mac_address():
    """Get the MAC address of the first interface."""
    mac = uuid.getnode()
    mac_str = ':'.join(('%012x' % mac)[i:i+2] for i in range(0, 12, 2))
    return mac_str

print(f"MAC Address: {get_mac_address()}")
```

### Bridge

A **bridge** connects two network segments and makes forwarding decisions based on MAC addresses.

**Functions:**
- Learns MAC addresses on each port
- Forwards frames only to appropriate segment
- Reduces collision domains
- Filters local traffic

**Operation:**
1. Receives frame
2. Examines destination MAC
3. Looks up in MAC table
4. Forwards only to correct segment (or floods if unknown)

### Switch

A **switch** is a multi-port bridge that has become the cornerstone of modern LANs. Each port creates a separate collision domain.

**Functions:**
- Learns MAC addresses automatically
- Makes forwarding decisions per-frame
- Creates separate collision domains per port
- Full-duplex communication
- Can support VLANs

**Switch operation:**

```
MAC Address Table:
+-------------+------+
| MAC Address | Port |
+-------------+------+
| AA:BB:CC:... | 1   |
| DD:EE:FF:... | 2   |
| 11:22:33:... | 3   |
+-------------+------+

Frame arrives on Port 4 destined for DD:EE:FF:...
Switch looks up MAC table → forwards ONLY to Port 2
```

**Types of switches:**
- **Unmanaged**: Plug-and-play, no configuration
- **Managed**: Configurable, supports VLANs, monitoring
- **Layer 3 Switch**: Can perform routing functions

```python
# Simulating a simple switch MAC table
class SimpleSwitch:
    def __init__(self):
        self.mac_table = {}

    def learn(self, mac_address, port):
        """Learn which port a MAC address is on."""
        self.mac_table[mac_address] = port

    def forward(self, src_mac, dst_mac, in_port):
        """Determine where to forward a frame."""
        # Learn source MAC
        self.learn(src_mac, in_port)

        # Look up destination
        if dst_mac in self.mac_table:
            return self.mac_table[dst_mac]  # Unicast
        else:
            return "flood"  # Unknown destination, flood all ports

switch = SimpleSwitch()
switch.learn("AA:BB:CC:DD:EE:FF", 1)
result = switch.forward("11:22:33:44:55:66", "AA:BB:CC:DD:EE:FF", 2)
print(f"Forward to port: {result}")  # Port 1
```

### Wireless Access Point (WAP)

A **WAP** bridges wireless clients to a wired network, enabling Wi-Fi connectivity.

**Functions:**
- Converts wireless signals to wired
- Manages wireless associations
- Handles encryption (WPA2/WPA3)
- Broadcasts SSID (network name)

## Layer 3 Devices: Network Layer

### Router

A **router** is the fundamental device for connecting different networks and making routing decisions based on IP addresses.

**Functions:**
- Connects different networks (LANs, WANs)
- Makes routing decisions using routing tables
- Separates broadcast domains
- Can perform NAT (Network Address Translation)
- May include firewall features

**How routers work:**

```
Routing Table:
+----------------+----------------+-------------+
| Destination    | Next Hop       | Interface   |
+----------------+----------------+-------------+
| 192.168.1.0/24 | Directly conn. | eth0        |
| 10.0.0.0/8     | 192.168.1.1    | eth0        |
| 0.0.0.0/0      | 203.0.113.1    | eth1        |
+----------------+----------------+-------------+

Packet arrives destined for 10.0.5.100:
1. Router checks routing table
2. Matches 10.0.0.0/8 network
3. Forwards to next hop 192.168.1.1
```

**Types of routers:**
- **Home/SOHO routers**: Combined router, switch, WAP, firewall
- **Enterprise routers**: High performance, advanced features
- **Core routers**: Internet backbone, massive throughput
- **Edge routers**: Connect enterprise to ISP

```python
# Simple routing decision simulation
def route_packet(destination_ip, routing_table):
    """Determine next hop for a packet."""
    import ipaddress

    dest = ipaddress.ip_address(destination_ip)
    best_match = None
    best_prefix_len = -1

    for network, next_hop in routing_table.items():
        net = ipaddress.ip_network(network)
        if dest in net and net.prefixlen > best_prefix_len:
            best_match = next_hop
            best_prefix_len = net.prefixlen

    return best_match or "default"

routing_table = {
    "192.168.1.0/24": "direct",
    "10.0.0.0/8": "192.168.1.1",
    "0.0.0.0/0": "gateway"
}

print(route_packet("10.5.5.5", routing_table))  # 192.168.1.1
print(route_packet("8.8.8.8", routing_table))   # gateway
```

### Layer 3 Switch

A **Layer 3 switch** combines switching and routing capabilities, making wire-speed routing decisions.

**Advantages:**
- Faster than traditional routers for inter-VLAN routing
- Lower latency
- Hardware-based routing

## Security Devices

### Firewall

A **firewall** controls network traffic based on security rules, acting as a barrier between trusted and untrusted networks.

**Types:**
- **Packet filter**: Examines headers (Layer 3-4)
- **Stateful inspection**: Tracks connection state
- **Application firewall**: Inspects application data (Layer 7)
- **Next-Gen Firewall (NGFW)**: Combines multiple technologies

**Firewall rules example:**
```
Rule 1: ALLOW TCP from any to 192.168.1.10:443 (HTTPS)
Rule 2: ALLOW TCP from any to 192.168.1.10:22 (SSH from internal only)
Rule 3: DENY all (default deny)
```

### Intrusion Detection/Prevention System (IDS/IPS)

- **IDS**: Monitors traffic and alerts on suspicious activity
- **IPS**: Monitors and can block malicious traffic

## Network Address Translation (NAT)

NAT devices (typically routers) translate between private and public IP addresses:

```
Inside Network (Private):    NAT Router    Outside (Public):
192.168.1.10:5000   ------>              ------>  203.0.113.1:12345
192.168.1.11:5001   ------>  Translation ------>  203.0.113.1:12346
192.168.1.12:5002   ------>              ------>  203.0.113.1:12347
```

## Device Comparison Summary

| Device | Layer | Addressing | Domain Separation |
|--------|-------|------------|-------------------|
| Repeater | 1 | None | None |
| Hub | 1 | None | None |
| Switch | 2 | MAC | Collision domains |
| Bridge | 2 | MAC | Collision domains |
| Router | 3 | IP | Broadcast domains |
| Firewall | 3-7 | IP/Ports | Security zones |

## Key Takeaways

- Network devices operate at specific layers with distinct functions
- Hubs broadcast everything; switches forward intelligently based on MAC
- Routers connect different networks using IP addresses
- Switches create collision domains; routers create broadcast domains
- Modern networks rely heavily on switches and routers
- Security devices (firewalls, IDS/IPS) protect network boundaries
- Layer 3 switches blur the line between switching and routing

Understanding these devices and their roles is essential for network design, troubleshooting, and security implementation.
