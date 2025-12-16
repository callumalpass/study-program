# Transport Layer: TCP and UDP

## Introduction

The transport layer provides end-to-end communication services for applications. While the network layer moves packets between hosts, the transport layer enables communication between specific processes running on those hosts. It extends the host-to-host delivery service of the network layer to a process-to-process delivery service.

This topic examines the two primary transport protocols of the Internet: TCP (Transmission Control Protocol) and UDP (User Datagram Protocol). Understanding when and how to use each protocol is essential for designing networked applications.

## Transport Layer Services

The transport layer provides several important services. Multiplexing and demultiplexing allow multiple applications to share the network simultaneously, with each application's data delivered to the correct process. Error detection identifies corrupted data. Beyond these basics, TCP adds reliability, flow control, and congestion control.

Ports are the key mechanism for multiplexing. Each application binds to a port number, and the transport layer uses source and destination port numbers to route data to the correct application.

## TCP vs UDP

TCP and UDP represent fundamentally different philosophies. TCP is connection-oriented and provides reliable, ordered delivery of data. It ensures that all data arrives correctly and in order, retransmitting lost packets and acknowledging received data. This comes at the cost of additional overhead and latency.

UDP is connectionless and provides best-effort delivery. It adds minimal overhead to IP, simply providing port-based multiplexing and optional error detection. Applications that need reliability must implement it themselves, but they gain flexibility and reduced latency.

## Learning Objectives

By the end of this topic, you will be able to:
- Explain multiplexing/demultiplexing using port numbers
- Understand UDP segment structure and when to use UDP
- Describe TCP's connection establishment (three-way handshake)
- Explain TCP's reliable data transfer mechanisms
- Understand TCP flow control using sliding windows
- Analyze TCP congestion control (slow start, congestion avoidance)
- Calculate throughput and round-trip time effects
- Choose appropriate transport protocols for different applications
