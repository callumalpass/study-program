---
id: cs302-t1-intro
title: "Introduction to Computer Networks"
order: 1
---

# Introduction to Computer Networks

Computer networks form the backbone of modern digital communication, connecting billions of devices worldwide and enabling everything from email to streaming video. Understanding how networks operate is essential for any computer scientist, as virtually every modern application relies on network communication in some form.

## What is a Computer Network?

A **computer network** is a collection of interconnected computing devices that can exchange data and share resources. These devices—called **hosts** or **end systems**—include traditional computers, servers, smartphones, IoT devices, and increasingly, vehicles, appliances, and industrial equipment.

Networks enable communication through **communication links** and **packet switches**. Communication links can be physical (copper wire, fiber optic cable) or wireless (radio waves, satellite). Packet switches—primarily **routers** and **link-layer switches**—forward packets of data toward their destinations.

```
Simple Network Topology:

    [Computer A] ----+
                      \
                       [Router] ---- [Internet] ---- [Server]
                      /
    [Computer B] ----+
```

## Why Study Networks?

Understanding networks matters for several reasons:

1. **Ubiquity**: Nearly every application communicates over networks
2. **Performance**: Network design directly impacts application speed and reliability
3. **Security**: Network vulnerabilities are primary attack vectors
4. **Career relevance**: Networking skills are in high demand across industries

As a developer, you'll encounter networks whether building web applications, mobile apps, distributed systems, or cloud services. Even "local" applications increasingly rely on network services for updates, authentication, and data synchronization.

## The Internet: A Network of Networks

The **Internet** is not a single network but a "network of networks"—an interconnection of thousands of individual networks including:

- **Access networks**: Connect end users (home networks, enterprise networks, mobile networks)
- **Regional ISPs**: Aggregate traffic from access networks
- **Tier-1 ISPs**: Form the Internet backbone (AT&T, NTT, Level 3)
- **Internet Exchange Points (IXPs)**: Where ISPs peer with each other
- **Content provider networks**: Run by companies like Google, Netflix, Facebook

```
Internet Hierarchy:

    Tier-1 ISP <----> Tier-1 ISP <----> Tier-1 ISP
         |                |                |
    Regional ISP     Regional ISP     Content Provider
         |                |                |
    Access ISP       Access ISP        Data Center
         |                |
    [End Users]      [End Users]
```

This hierarchical structure evolved organically as the Internet grew from a research project (ARPANET) into a global infrastructure.

## Protocols: The Language of Networks

For devices to communicate, they must agree on **protocols**—rules governing message format, order, and actions taken on transmission and receipt. Protocols define:

- **Syntax**: The structure and format of data
- **Semantics**: The meaning of each section of bits
- **Timing**: When data should be sent and how fast

Consider a simple analogy: human conversation follows protocols too. We greet each other, take turns speaking, and signal when we're done. Network protocols formalize these conventions for machines.

```python
# Conceptual example: A simple request-response protocol
# Client sends: "REQUEST:resource_name"
# Server responds: "RESPONSE:data" or "ERROR:message"

def client_request(resource):
    message = f"REQUEST:{resource}"
    send(message)
    response = receive()
    if response.startswith("RESPONSE:"):
        return response[9:]  # Extract data
    else:
        raise Error(response[6:])  # Extract error message
```

Key Internet protocols include:

| Protocol | Purpose | Layer |
|----------|---------|-------|
| HTTP/HTTPS | Web communication | Application |
| TCP | Reliable data transfer | Transport |
| UDP | Fast, unreliable transfer | Transport |
| IP | Addressing and routing | Network |
| Ethernet | Local network access | Link |

## Network Edge vs. Network Core

Networks can be divided into two regions:

**Network Edge**: Where end systems and applications reside
- Hosts (clients and servers)
- Access networks (DSL, cable, fiber, wireless)
- First-hop routers

**Network Core**: The mesh of interconnected routers
- Routes packets from source to destination
- Uses either circuit switching or packet switching

Modern networks primarily use **packet switching**, where data is divided into packets that travel independently through the network. This differs from **circuit switching** (used in traditional telephone networks), where a dedicated path is established for the duration of communication.

## Packet Switching Fundamentals

In packet-switched networks, messages are broken into **packets**—small chunks of data, typically 1,000-2,000 bytes. Each packet contains:

- **Header**: Addressing and control information
- **Payload**: The actual data being transmitted

Packets traverse the network through **store-and-forward transmission**: each switch must receive the entire packet before forwarding it to the next link. This introduces **transmission delay** but enables efficient sharing of network resources.

```
Packet Structure:
+------------------+----------------------------------+
|     Header       |            Payload               |
+------------------+----------------------------------+
| Source Address   |                                  |
| Dest Address     |          Actual Data             |
| Sequence Number  |                                  |
| Checksum         |                                  |
+------------------+----------------------------------+
```

## Key Takeaways

- Computer networks connect devices to enable communication and resource sharing
- The Internet is a hierarchical network of networks, not a single entity
- Protocols define the rules for network communication
- Networks consist of an edge (end systems) and core (routers)
- Modern networks use packet switching for efficient resource utilization
- Understanding networks is essential for modern software development

In the following sections, we'll explore the OSI and TCP/IP reference models that organize network functionality into layers, making complex systems manageable through abstraction.
