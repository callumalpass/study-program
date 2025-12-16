# Network Fundamentals

## What is a Computer Network?

A computer network is a collection of computing devices connected together to share resources and communicate. Networks range from simple two-computer setups to the global Internet connecting billions of devices. Understanding networks begins with grasping their fundamental purpose: enabling communication and resource sharing.

Networks evolved from the desire to share expensive computing resources. In the 1960s, computers were large, expensive mainframes. Connecting multiple terminals to a single computer allowed many users to share its processing power. As computers became cheaper and more numerous, the focus shifted to connecting computers to each other, enabling file sharing, message passing, and distributed computing.

## Network Components

Every network consists of several basic components. **End systems** (or hosts) are the devices that send and receive data—computers, smartphones, servers, and IoT devices. **Communication links** carry data between devices and can be wired (copper, fiber optic) or wireless (radio, satellite). **Network devices** like switches and routers forward data between different parts of the network.

The **network interface card (NIC)** connects a host to the network, providing both physical connectivity and an address (MAC address) that uniquely identifies the device on its local network. Modern computers have NICs built into their motherboards, though specialized applications may use dedicated network cards.

## Types of Networks

Networks are commonly classified by their geographic scope. A **Local Area Network (LAN)** connects devices within a limited area like a home, office, or campus. LANs typically use Ethernet or Wi-Fi technology and are owned and operated by a single organization.

A **Wide Area Network (WAN)** spans larger geographic areas, connecting LANs across cities, countries, or continents. WANs often use leased telecommunication lines or internet connections. The Internet itself can be viewed as a global WAN of WANs.

**Metropolitan Area Networks (MANs)** fall between LANs and WANs, typically covering a city or large campus. **Personal Area Networks (PANs)** connect devices within a person's immediate workspace, often using Bluetooth or similar short-range technologies.

## Network Topologies

The **topology** of a network describes how its nodes are connected. Physical topology refers to the actual layout of cables and devices, while logical topology describes how data flows through the network.

Common topologies include:

**Bus topology**: All devices connect to a single cable. Simple and inexpensive, but a single cable failure affects the entire network. Early Ethernet networks used bus topology.

**Star topology**: All devices connect to a central hub or switch. Failure of one connection affects only that device. Most modern LANs use star topology with Ethernet switches.

**Ring topology**: Devices form a circular chain, with each device connected to exactly two others. Data travels around the ring. Token Ring networks used this topology.

**Mesh topology**: Devices have multiple interconnections, providing redundancy. If one link fails, data can take an alternate path. The Internet's core uses mesh topology for resilience.

**Tree (hierarchical) topology**: A combination of star topologies connected in a hierarchy. Common in large organizations with departmental networks connected to a central backbone.

## Packet Switching vs Circuit Switching

Networks use two fundamental approaches to moving data. **Circuit switching**, used in traditional telephone networks, establishes a dedicated communication path between two endpoints before data transfer begins. This path remains exclusive to that communication for its entire duration, guaranteeing consistent bandwidth and low latency but wasting capacity when the path is idle.

**Packet switching**, used in the Internet, divides data into small packets that are sent independently through the network. Each packet may take a different path and is reassembled at the destination. This approach shares network capacity efficiently—links are only used when packets are actually being transmitted—but introduces variable delay and the possibility of packet loss.

The Internet's use of packet switching enables efficient sharing of network resources among many users. Statistical multiplexing allows more users to share a link than circuit switching would permit, though at the cost of occasional congestion when many users transmit simultaneously.

## Network Performance Metrics

Several metrics characterize network performance:

**Bandwidth** (or throughput) measures the rate at which data can be transferred, typically in bits per second (bps). Modern networks may offer megabits (Mbps), gigabits (Gbps), or even terabits (Tbps) per second.

**Latency** measures the time for data to travel from source to destination. It includes transmission delay (time to push bits onto the link), propagation delay (time for signals to travel through the medium), processing delay (time at intermediate devices), and queuing delay (time waiting in buffers).

**Jitter** measures the variation in latency. Consistent latency is important for real-time applications like voice and video.

**Packet loss** occurs when network devices drop packets due to congestion or errors. Lost packets must be retransmitted or tolerated by the application.

Understanding these metrics is crucial for designing, troubleshooting, and optimizing networks. Different applications have different requirements—video streaming prioritizes bandwidth, while interactive gaming prioritizes low latency.

## The Internet

The Internet is not a single network but a network of networks. It consists of thousands of interconnected networks, from small home networks to large corporate networks to massive service provider networks. These networks are connected through Internet Exchange Points (IXPs) and transit agreements.

The Internet's design principles have enabled its remarkable growth and flexibility. Key principles include end-to-end arguments (putting complexity at endpoints rather than in the network), decentralized control, and the use of open standards.

Internet governance involves multiple organizations. The **Internet Engineering Task Force (IETF)** develops technical standards. **ICANN** coordinates global Internet identifiers like domain names and IP addresses. **Regional Internet Registries (RIRs)** allocate IP addresses in different geographic regions.
