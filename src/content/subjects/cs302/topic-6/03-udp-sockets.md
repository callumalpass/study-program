# UDP Socket Programming

## UDP vs TCP Sockets

UDP sockets differ from TCP in important ways:

| Aspect | TCP | UDP |
|--------|-----|-----|
| Connection | Required | None |
| Reliability | Guaranteed | Best effort |
| Order | Preserved | May reorder |
| Boundaries | Stream (none) | Message preserved |
| Functions | send/recv | sendto/recvfrom |

UDP is simpler—no connection setup, no teardown, no sequence tracking.

## UDP Server Steps

1. **Create socket**: `socket()`
2. **Bind to address**: `bind()`
3. **Receive/send data**: `recvfrom()`/`sendto()`
4. **Close**: `close()`

No `listen()` or `accept()`—UDP is connectionless.

## Creating a UDP Socket

```c
int sockfd = socket(AF_INET, SOCK_DGRAM, 0);
if (sockfd == -1) {
    perror("socket");
    exit(EXIT_FAILURE);
}
```

`SOCK_DGRAM` creates a UDP socket.

## Binding (Server)

```c
struct sockaddr_in server_addr;
server_addr.sin_family = AF_INET;
server_addr.sin_addr.s_addr = INADDR_ANY;
server_addr.sin_port = htons(12345);

if (bind(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
    perror("bind");
    exit(EXIT_FAILURE);
}
```

Same as TCP binding.

## Sending and Receiving

**recvfrom()**: Receive a datagram and get sender's address:

```c
char buffer[1024];
struct sockaddr_in client_addr;
socklen_t client_len = sizeof(client_addr);

ssize_t bytes = recvfrom(sockfd, buffer, sizeof(buffer), 0,
                         (struct sockaddr *)&client_addr, &client_len);
if (bytes > 0) {
    buffer[bytes] = '\0';
    printf("Received from %s:%d: %s\n",
           inet_ntoa(client_addr.sin_addr),
           ntohs(client_addr.sin_port),
           buffer);
}
```

**sendto()**: Send a datagram to specified address:

```c
const char *response = "Hello from server";
ssize_t sent = sendto(sockfd, response, strlen(response), 0,
                      (struct sockaddr *)&client_addr, client_len);
```

## Complete UDP Server

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define PORT 12345
#define BUFFER_SIZE 1024

int main() {
    int sockfd;
    struct sockaddr_in server_addr, client_addr;
    char buffer[BUFFER_SIZE];
    socklen_t client_len;

    // Create UDP socket
    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (sockfd == -1) {
        perror("socket");
        exit(EXIT_FAILURE);
    }

    // Bind to address
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(PORT);

    if (bind(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        perror("bind");
        exit(EXIT_FAILURE);
    }

    printf("UDP server listening on port %d\n", PORT);

    // Echo loop
    while (1) {
        client_len = sizeof(client_addr);
        ssize_t bytes = recvfrom(sockfd, buffer, BUFFER_SIZE - 1, 0,
                                 (struct sockaddr *)&client_addr, &client_len);

        if (bytes < 0) {
            perror("recvfrom");
            continue;
        }

        buffer[bytes] = '\0';
        printf("Received from %s:%d: %s\n",
               inet_ntoa(client_addr.sin_addr),
               ntohs(client_addr.sin_port),
               buffer);

        // Echo back
        sendto(sockfd, buffer, bytes, 0,
               (struct sockaddr *)&client_addr, client_len);
    }

    close(sockfd);
    return 0;
}
```

## UDP Client

UDP clients are even simpler—no connect required (though you can use it):

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define PORT 12345
#define BUFFER_SIZE 1024

int main() {
    int sockfd;
    struct sockaddr_in server_addr;
    char buffer[BUFFER_SIZE];

    // Create socket
    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (sockfd == -1) {
        perror("socket");
        exit(EXIT_FAILURE);
    }

    // Server address
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    inet_pton(AF_INET, "127.0.0.1", &server_addr.sin_addr);

    // Send message
    const char *message = "Hello UDP server!";
    sendto(sockfd, message, strlen(message), 0,
           (struct sockaddr *)&server_addr, sizeof(server_addr));
    printf("Sent: %s\n", message);

    // Receive response (with timeout)
    struct timeval tv = {5, 0};  // 5 second timeout
    setsockopt(sockfd, SOL_SOCKET, SO_RCVTIMEO, &tv, sizeof(tv));

    socklen_t server_len = sizeof(server_addr);
    ssize_t bytes = recvfrom(sockfd, buffer, BUFFER_SIZE - 1, 0,
                             (struct sockaddr *)&server_addr, &server_len);

    if (bytes > 0) {
        buffer[bytes] = '\0';
        printf("Received: %s\n", buffer);
    } else if (bytes < 0) {
        perror("recvfrom");
    }

    close(sockfd);
    return 0;
}
```

## Connected UDP Sockets

You can call `connect()` on a UDP socket:

```c
connect(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr));

// Now use send/recv instead of sendto/recvfrom
send(sockfd, message, strlen(message), 0);
recv(sockfd, buffer, sizeof(buffer), 0);
```

**Benefits of connected UDP**:
- Simpler API (send/recv)
- Kernel filters incoming datagrams—only from connected address
- ICMP errors are reported to application
- Slightly more efficient

**Note**: "Connected" UDP is not a real connection—it just sets the default destination.

## Message Boundaries

Unlike TCP, UDP preserves message boundaries:

```c
// Sender sends three datagrams
sendto(sock, "Hello", 5, 0, ...);
sendto(sock, "World", 5, 0, ...);
sendto(sock, "!", 1, 0, ...);

// Receiver gets three separate recvfrom calls
// Each returns exactly one datagram
recvfrom(sock, buf, 100, 0, ...);  // Returns 5 bytes: "Hello"
recvfrom(sock, buf, 100, 0, ...);  // Returns 5 bytes: "World"
recvfrom(sock, buf, 100, 0, ...);  // Returns 1 byte: "!"
```

If buffer is smaller than datagram, excess data is lost.

## Handling Lost Datagrams

UDP provides no reliability—implement it if needed:

```c
// Simple timeout-based retry
#define MAX_RETRIES 3
#define TIMEOUT_SEC 2

int send_with_retry(int sockfd, const char *data, size_t len,
                    struct sockaddr *dest, socklen_t dest_len,
                    char *response, size_t resp_len) {
    struct timeval tv = {TIMEOUT_SEC, 0};
    setsockopt(sockfd, SOL_SOCKET, SO_RCVTIMEO, &tv, sizeof(tv));

    for (int i = 0; i < MAX_RETRIES; i++) {
        sendto(sockfd, data, len, 0, dest, dest_len);

        ssize_t bytes = recvfrom(sockfd, response, resp_len, 0, NULL, NULL);
        if (bytes > 0) {
            return bytes;  // Success
        }

        printf("Timeout, retry %d\n", i + 1);
    }

    return -1;  // Failed after retries
}
```

## Multicast with UDP

UDP supports multicast—sending to multiple receivers:

```c
// Join multicast group
struct ip_mreq mreq;
mreq.imr_multiaddr.s_addr = inet_addr("239.0.0.1");  // Multicast group
mreq.imr_interface.s_addr = INADDR_ANY;

setsockopt(sockfd, IPPROTO_IP, IP_ADD_MEMBERSHIP, &mreq, sizeof(mreq));

// Receive multicast datagrams
recvfrom(sockfd, buffer, sizeof(buffer), 0, ...);
```

## Broadcast with UDP

```c
// Enable broadcast
int broadcast = 1;
setsockopt(sockfd, SOL_SOCKET, SO_BROADCAST, &broadcast, sizeof(broadcast));

// Send to broadcast address
struct sockaddr_in broadcast_addr;
broadcast_addr.sin_family = AF_INET;
broadcast_addr.sin_port = htons(12345);
broadcast_addr.sin_addr.s_addr = inet_addr("255.255.255.255");

sendto(sockfd, message, strlen(message), 0,
       (struct sockaddr *)&broadcast_addr, sizeof(broadcast_addr));
```

## When to Use UDP

**Good for UDP**:
- Real-time applications (VoIP, gaming)
- Simple request-response (DNS)
- Broadcast/multicast
- Custom reliability requirements

**Use TCP instead when**:
- Reliability is essential
- Data must be ordered
- Large amounts of data
- Built-in flow/congestion control needed
