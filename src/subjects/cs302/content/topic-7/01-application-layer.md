---
id: cs302-t7-app
title: "Application Layer Overview"
order: 1
---

# Application Layer Overview

## The Application Layer

The application layer sits at the top of the network stack, directly serving user applications. While lower layers handle the mechanics of data delivery, the application layer defines *what* that data means and *how* applications communicate.

The application layer encompasses:
- **Protocols**: Rules for communication (HTTP, SMTP, DNS)
- **APIs**: Programming interfaces (sockets, HTTP libraries)
- **Applications**: Programs using the network (browsers, email clients)

## Client-Server Architecture

Most Internet applications follow the client-server model:

**Server**:
- Always-on host
- Permanent IP address (or discoverable via DNS)
- Waits for incoming requests
- Serves multiple clients

**Client**:
- Initiates communication
- May have dynamic IP
- May be intermittently connected
- Communicates with server, not directly with other clients

Examples: Web browsing, email, file transfer

## Peer-to-Peer Architecture

Alternative model where peers communicate directly:

**Characteristics**:
- No always-on server
- Arbitrary end systems communicate
- Peers request and provide services
- Self-scaling as peers add capacity

**Examples**: BitTorrent, some messaging apps

**Challenges**:
- Discovery of peers
- NAT traversal
- Managing unreliable peers
- Security and trust

## Application Layer Protocol Components

A protocol defines:

**Message types**: Request, response, error
**Message syntax**: Fields and their formats
**Message semantics**: Meaning of fields
**Rules**: When and how to send messages

**Example (HTTP)**:
- Types: GET, POST, PUT, DELETE requests; 200, 404, 500 responses
- Syntax: Header lines, body format
- Semantics: What each header means
- Rules: Request-response pattern, persistent connections

## Process Communication

**Process**: Program running on a host

**Inter-process communication**: How processes on different hosts communicate

**Key concepts**:
- Client process initiates communication
- Server process waits for contact
- Processes communicate via sockets
- Identified by IP address + port number

## Ports and Addressing

Applications are addressed by:
- **IP address**: Identifies the host
- **Port number**: Identifies the application/service

**Well-known ports** (0-1023):
| Port | Service |
|------|---------|
| 20/21 | FTP |
| 22 | SSH |
| 25 | SMTP |
| 53 | DNS |
| 80 | HTTP |
| 443 | HTTPS |

**Registered ports** (1024-49151): Assigned by IANA
**Dynamic ports** (49152-65535): Client-side ephemeral ports

## Transport Services Required

Applications need different transport properties:

**Data integrity**: Must data arrive error-free?
- File transfer: Yes, absolutely
- Audio streaming: Some loss acceptable

**Throughput**: How much bandwidth needed?
- Video streaming: Requires minimum bandwidth
- Email: Elastic, works at any speed

**Timing**: How delay-sensitive?
- Gaming, VoIP: Very sensitive
- Email, file transfer: Tolerant

**Security**: Encryption needed?
- Banking: Absolutely
- Public web pages: Less critical

## TCP vs UDP for Applications

| Application | Transport | Why |
|-------------|-----------|-----|
| Web | TCP | Reliability essential |
| Email | TCP | Must deliver messages |
| File transfer | TCP | Data integrity required |
| DNS | Usually UDP | Small queries, quick responses |
| VoIP | UDP/RTP | Low latency > reliability |
| Video streaming | UDP/HTTP | Adaptive streaming varies |
| Gaming | UDP | Low latency critical |

## Application Protocols vs Applications

**Protocol**: Rules for communication
- HTTP defines request/response format
- SMTP defines email message format

**Application**: Software that uses protocols
- Chrome implements HTTP
- Outlook implements SMTP, IMAP

One application may use multiple protocols (browser uses HTTP, DNS, TLS).

## Stateless vs Stateful Protocols

**Stateless** (HTTP):
- Each request independent
- Server maintains no state
- Simple, scalable
- State in cookies/tokens

**Stateful** (FTP):
- Server tracks session state
- Login required
- State: current directory, mode
- More complex

Modern trend is stateless with state passed in tokens.

## Protocol Layers

Application protocols often layer:

```
Application Data
     ↓
HTTP (application protocol)
     ↓
TLS (security)
     ↓
TCP (transport)
     ↓
IP (network)
```

HTTPS = HTTP over TLS over TCP

## Standards and RFCs

Application protocols are defined in RFCs:
- HTTP: RFC 7230-7235 (HTTP/1.1), RFC 9110-9114 (HTTP/2, HTTP/3)
- SMTP: RFC 5321
- DNS: RFC 1034, 1035

RFCs ensure interoperability—any HTTP client can talk to any HTTP server.

## Building Applications

Understanding application protocols lets you:
- **Implement clients**: Write code that speaks HTTP, SMTP, etc.
- **Implement servers**: Accept and handle protocol requests
- **Debug**: Understand what's happening on the wire
- **Design**: Create new application protocols

The following sections examine specific protocols in detail.
