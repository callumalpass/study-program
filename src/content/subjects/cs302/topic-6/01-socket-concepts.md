# Socket Programming Concepts

## What is a Socket?

A **socket** is an endpoint for communication between two programs. It's the programming interface that applications use to send and receive data over a network. The socket API abstracts the complexity of the network stack, providing a relatively simple interface for network communication.

Think of a socket like a phone—you don't need to understand how the telephone network works to make a call. Similarly, sockets let you communicate over the Internet without understanding the details of TCP/IP.

## The Socket Abstraction

Sockets provide several key abstractions:

**Endpoint identification**: A socket is identified by an IP address and port number combination.

**Connection abstraction**: For TCP, sockets represent a connection between two endpoints.

**Data transfer**: Read from and write to sockets like files.

**Protocol independence**: The same API works for different protocols (TCP, UDP, etc.).

## Socket Types

**Stream sockets (SOCK_STREAM)**:
- Connection-oriented
- Reliable, ordered byte stream
- Used with TCP
- Like a phone call—establish connection, talk, hang up

**Datagram sockets (SOCK_DGRAM)**:
- Connectionless
- Unreliable, message-oriented
- Used with UDP
- Like sending letters—each is independent

**Raw sockets (SOCK_RAW)**:
- Direct access to network layer
- Used for implementing protocols or diagnostics
- Requires special privileges

## Socket Addresses

Different address families use different structures:

**IPv4 (AF_INET)**:
```c
struct sockaddr_in {
    sa_family_t    sin_family;  // AF_INET
    in_port_t      sin_port;    // Port (network byte order)
    struct in_addr sin_addr;    // IPv4 address
};
```

**IPv6 (AF_INET6)**:
```c
struct sockaddr_in6 {
    sa_family_t     sin6_family;   // AF_INET6
    in_port_t       sin6_port;     // Port
    uint32_t        sin6_flowinfo; // Flow info
    struct in6_addr sin6_addr;     // IPv6 address
    uint32_t        sin6_scope_id; // Scope ID
};
```

The generic `sockaddr` structure is used in API calls for polymorphism.

## Byte Ordering

Network protocols use **big-endian** (network byte order), but machines may use little-endian.

**Conversion functions**:
```c
htons()  // Host to network short (16-bit)
htonl()  // Host to network long (32-bit)
ntohs()  // Network to host short
ntohl()  // Network to host long
```

Always convert when:
- Setting port numbers
- Setting IP addresses
- Reading/writing protocol fields

## Creating a Socket

```c
int socket(int domain, int type, int protocol);
```

**domain**: Address family
- `AF_INET`: IPv4
- `AF_INET6`: IPv6
- `AF_UNIX`: Local (Unix domain)

**type**: Socket type
- `SOCK_STREAM`: TCP
- `SOCK_DGRAM`: UDP
- `SOCK_RAW`: Raw

**protocol**: Usually 0 (default for type)

**Returns**: Socket descriptor (like file descriptor) or -1 on error.

```c
int sockfd = socket(AF_INET, SOCK_STREAM, 0);
if (sockfd < 0) {
    perror("socket");
    exit(1);
}
```

## The Client-Server Model

Most network applications follow the client-server pattern:

**Server**:
1. Create socket
2. Bind to address
3. Listen for connections (TCP) or wait for data (UDP)
4. Accept connections (TCP)
5. Send/receive data
6. Close connection

**Client**:
1. Create socket
2. Connect to server (TCP) or specify destination (UDP)
3. Send/receive data
4. Close connection

The server runs continuously, handling client requests. Clients initiate contact.

## Socket Lifecycle

**TCP socket lifecycle**:
```
CLOSED → socket() → bound/unbound
                  ↓
       bind() → BOUND
                  ↓
       listen() → LISTENING
                  ↓
       accept() → CONNECTED (new socket)
                  ↓
       close() → TIME_WAIT → CLOSED
```

**UDP socket lifecycle**:
```
CLOSED → socket() → created
                  ↓
       bind() → ready for sendto/recvfrom
                  ↓
       close() → CLOSED
```

## Error Handling

Socket operations return -1 on error and set `errno`:

```c
int sockfd = socket(AF_INET, SOCK_STREAM, 0);
if (sockfd == -1) {
    fprintf(stderr, "socket error: %s\n", strerror(errno));
    exit(EXIT_FAILURE);
}
```

Common errors:
- `EACCES`: Permission denied
- `EADDRINUSE`: Address already in use
- `ECONNREFUSED`: Connection refused
- `ETIMEDOUT`: Connection timed out
- `ENETUNREACH`: Network unreachable

## Socket Options

Configure socket behavior with `setsockopt()`:

```c
int setsockopt(int sockfd, int level, int optname,
               const void *optval, socklen_t optlen);
```

**Common options**:
```c
// Allow address reuse (avoid TIME_WAIT issues)
int opt = 1;
setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

// Set receive timeout
struct timeval tv = {5, 0};  // 5 seconds
setsockopt(sockfd, SOL_SOCKET, SO_RCVTIMEO, &tv, sizeof(tv));

// Disable Nagle's algorithm
int flag = 1;
setsockopt(sockfd, IPPROTO_TCP, TCP_NODELAY, &flag, sizeof(flag));
```

## Modern Considerations

**IPv6 support**: Write code that works with both IPv4 and IPv6 using `getaddrinfo()`.

**Non-blocking I/O**: For scalable servers, avoid blocking on socket operations.

**Security**: Validate all input, handle partial reads/writes, use TLS for encryption.

Understanding these concepts is essential before diving into specific socket operations.
