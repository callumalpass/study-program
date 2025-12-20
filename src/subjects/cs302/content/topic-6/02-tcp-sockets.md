---
id: cs302-t6-tcp
title: "TCP Socket Programming"
order: 2
---

# TCP Socket Programming

## TCP Server Steps

A TCP server follows these steps:

1. **Create socket**: `socket()`
2. **Bind to address**: `bind()`
3. **Listen for connections**: `listen()`
4. **Accept connections**: `accept()`
5. **Send/receive data**: `send()`/`recv()`
6. **Close**: `close()`

Let's examine each step in detail.

## Creating the Socket

```c
int server_fd = socket(AF_INET, SOCK_STREAM, 0);
if (server_fd == -1) {
    perror("socket failed");
    exit(EXIT_FAILURE);
}
```

`SOCK_STREAM` creates a TCP socket.

## Binding to an Address

```c
struct sockaddr_in address;
address.sin_family = AF_INET;
address.sin_addr.s_addr = INADDR_ANY;  // Accept connections on any interface
address.sin_port = htons(8080);         // Port 8080

if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
    perror("bind failed");
    exit(EXIT_FAILURE);
}
```

`INADDR_ANY` binds to all available interfaces. Use a specific IP to bind to one interface.

**Common bind errors**:
- `EADDRINUSE`: Port already in use (use `SO_REUSEADDR`)
- `EACCES`: Binding to port < 1024 without root

## Listening for Connections

```c
if (listen(server_fd, 10) < 0) {
    perror("listen failed");
    exit(EXIT_FAILURE);
}
```

The **backlog** (10 here) is the maximum length of the pending connection queue. This is not the maximum number of simultaneous connections—it's connections waiting to be accepted.

## Accepting Connections

```c
struct sockaddr_in client_addr;
socklen_t client_len = sizeof(client_addr);

int client_fd = accept(server_fd, (struct sockaddr *)&client_addr, &client_len);
if (client_fd < 0) {
    perror("accept failed");
    exit(EXIT_FAILURE);
}

// client_addr now contains client's IP and port
printf("Connection from %s:%d\n",
       inet_ntoa(client_addr.sin_addr),
       ntohs(client_addr.sin_port));
```

`accept()` returns a **new socket** for this specific connection. The original socket continues listening.

## Sending and Receiving Data

```c
// Receiving
char buffer[1024];
ssize_t bytes_read = recv(client_fd, buffer, sizeof(buffer) - 1, 0);
if (bytes_read > 0) {
    buffer[bytes_read] = '\0';
    printf("Received: %s\n", buffer);
}

// Sending
const char *response = "Hello from server";
ssize_t bytes_sent = send(client_fd, response, strlen(response), 0);
```

**Important**: `recv()` may return fewer bytes than requested—this is normal. Loop until you have all expected data.

## Complete TCP Server

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define PORT 8080
#define BUFFER_SIZE 1024

int main() {
    int server_fd, client_fd;
    struct sockaddr_in address;
    char buffer[BUFFER_SIZE];

    // Create socket
    server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd == -1) {
        perror("socket");
        exit(EXIT_FAILURE);
    }

    // Allow address reuse
    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    // Bind
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("bind");
        exit(EXIT_FAILURE);
    }

    // Listen
    if (listen(server_fd, 10) < 0) {
        perror("listen");
        exit(EXIT_FAILURE);
    }

    printf("Server listening on port %d\n", PORT);

    // Accept and handle connections
    while (1) {
        socklen_t addrlen = sizeof(address);
        client_fd = accept(server_fd, (struct sockaddr *)&address, &addrlen);
        if (client_fd < 0) {
            perror("accept");
            continue;
        }

        printf("Client connected\n");

        // Echo server: read and echo back
        ssize_t bytes;
        while ((bytes = recv(client_fd, buffer, BUFFER_SIZE - 1, 0)) > 0) {
            buffer[bytes] = '\0';
            printf("Received: %s\n", buffer);
            send(client_fd, buffer, bytes, 0);
        }

        printf("Client disconnected\n");
        close(client_fd);
    }

    close(server_fd);
    return 0;
}
```

## TCP Client Steps

A TCP client is simpler:

1. **Create socket**: `socket()`
2. **Connect to server**: `connect()`
3. **Send/receive data**: `send()`/`recv()`
4. **Close**: `close()`

## Complete TCP Client

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define PORT 8080
#define BUFFER_SIZE 1024

int main() {
    int sockfd;
    struct sockaddr_in server_addr;
    char buffer[BUFFER_SIZE];

    // Create socket
    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd == -1) {
        perror("socket");
        exit(EXIT_FAILURE);
    }

    // Server address
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);

    // Convert IP address
    if (inet_pton(AF_INET, "127.0.0.1", &server_addr.sin_addr) <= 0) {
        perror("inet_pton");
        exit(EXIT_FAILURE);
    }

    // Connect
    if (connect(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        perror("connect");
        exit(EXIT_FAILURE);
    }

    printf("Connected to server\n");

    // Send message
    const char *message = "Hello from client";
    send(sockfd, message, strlen(message), 0);
    printf("Sent: %s\n", message);

    // Receive response
    ssize_t bytes = recv(sockfd, buffer, BUFFER_SIZE - 1, 0);
    if (bytes > 0) {
        buffer[bytes] = '\0';
        printf("Received: %s\n", buffer);
    }

    close(sockfd);
    return 0;
}
```

## Handling Partial Sends and Receives

TCP is a byte stream—`send()` and `recv()` may transfer fewer bytes than requested:

```c
// Send all data
ssize_t send_all(int sockfd, const char *buf, size_t len) {
    size_t total_sent = 0;
    while (total_sent < len) {
        ssize_t sent = send(sockfd, buf + total_sent, len - total_sent, 0);
        if (sent <= 0) {
            return sent;  // Error or connection closed
        }
        total_sent += sent;
    }
    return total_sent;
}

// Receive exact number of bytes
ssize_t recv_all(int sockfd, char *buf, size_t len) {
    size_t total_recv = 0;
    while (total_recv < len) {
        ssize_t recvd = recv(sockfd, buf + total_recv, len - total_recv, 0);
        if (recvd <= 0) {
            return recvd;  // Error or connection closed
        }
        total_recv += recvd;
    }
    return total_recv;
}
```

## Connection Termination

Graceful shutdown:

```c
// Stop sending (half-close)
shutdown(sockfd, SHUT_WR);

// Read remaining data from peer
while (recv(sockfd, buffer, sizeof(buffer), 0) > 0);

// Close socket
close(sockfd);
```

`shutdown()` vs `close()`:
- `shutdown(SHUT_WR)`: Sends FIN, stops writing
- `shutdown(SHUT_RD)`: Stops reading
- `close()`: Releases socket when reference count reaches zero

## Common Pitfalls

1. **Forgetting byte order conversion**: Always use `htons()`/`ntohs()` for ports
2. **Not handling partial reads**: Loop until all data received
3. **Ignoring return values**: Always check for errors
4. **Resource leaks**: Close sockets in all code paths
5. **Blocking forever**: Set timeouts for production code
