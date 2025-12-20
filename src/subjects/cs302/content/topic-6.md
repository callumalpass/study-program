# Socket Programming

## Introduction

Socket programming is the practical interface between applications and the transport layer. Sockets provide an API that allows programs to send and receive data over a network, abstracting away the complexities of lower-level protocols. Understanding socket programming is essential for building any networked application.

This topic provides hands-on experience with network programming, covering both TCP and UDP sockets. We explore client-server architectures, concurrent server designs, and common patterns for building robust networked applications.

## What is a Socket?

A socket is an endpoint for communication. It combines an IP address and a port number, uniquely identifying a communication endpoint on a host. Sockets are created, configured, used for data transfer, and eventually closed.

The socket API originated in Berkeley Unix (BSD) in the 1980s and has become the standard interface for network programming across virtually all operating systems and programming languages.

## Client-Server Model

Most networked applications follow the client-server model. The server creates a socket, binds it to a well-known port, and listens for incoming connections. Clients create sockets and connect to the server. Once connected, both sides can send and receive data.

This model requires careful consideration of issues like handling multiple simultaneous clients, managing connection state, and gracefully handling network failures and client disconnections.

## Learning Objectives

By the end of this topic, you will be able to:
- Create TCP client and server applications
- Implement UDP datagram communication
- Understand the socket lifecycle (create, bind, listen, accept, connect, send, receive, close)
- Handle multiple clients using multithreading or multiplexing
- Use select() or poll() for I/O multiplexing
- Implement common patterns like echo servers and chat applications
- Handle network errors and implement timeout mechanisms
- Debug network applications using tools like netstat and tcpdump
