# Network Layer and IP

## Introduction

The network layer is responsible for the crucial task of moving data across multiple interconnected networks. While the data link layer handles communication within a single network segment, the network layer enables communication between devices that may be separated by many intermediate networks and routers.

This topic focuses on the Internet Protocol (IP), which forms the foundation of modern internetworking. We explore IP addressing schemes, subnetting, packet structure, and the mechanisms that allow data to find its way across the global Internet.

## The Role of the Network Layer

The network layer provides two fundamental services: addressing and routing. Addressing assigns a unique identifier to each device on a network, allowing packets to specify their destination. Routing determines the path that packets should take through the network to reach their destination efficiently.

Unlike data link addresses (MAC addresses), which are flat and used only within a single network segment, network layer addresses (IP addresses) are hierarchical and enable routing across multiple networks.

## IP Addressing

IP addresses come in two versions: IPv4 and IPv6. IPv4 uses 32-bit addresses, providing approximately 4.3 billion unique addresses. While this seemed sufficient in the early days of the Internet, address exhaustion led to the development of IPv6, which uses 128-bit addresses and provides an essentially unlimited address space.

Understanding IP addressing includes mastering concepts like classful and classless addressing, subnetting, CIDR notation, private address ranges, and Network Address Translation (NAT).

## Learning Objectives

By the end of this topic, you will be able to:
- Explain the functions of the network layer
- Convert between binary and dotted-decimal IP address notation
- Calculate subnet masks and identify network/host portions
- Design IP addressing schemes using CIDR
- Describe the IPv4 packet header fields and their purposes
- Understand the differences between IPv4 and IPv6
- Explain fragmentation and reassembly
- Configure IP addresses and default gateways
