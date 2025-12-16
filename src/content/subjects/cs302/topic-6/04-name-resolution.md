# Name Resolution and Address Handling

## The Need for Name Resolution

Humans use domain names (www.example.com), but sockets require IP addresses. Name resolution bridges this gap.

The `getaddrinfo()` function is the modern, preferred way to resolve names. It:
- Handles both IPv4 and IPv6
- Supports service name to port mapping
- Returns a list of addresses to try
- Is protocol-independent

## getaddrinfo()

```c
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>

int getaddrinfo(const char *node,        // Hostname or IP
                const char *service,      // Service name or port
                const struct addrinfo *hints,  // Preferences
                struct addrinfo **res);   // Results
```

**Parameters**:
- `node`: Hostname ("www.example.com") or IP address ("93.184.216.34")
- `service`: Service name ("http") or port number ("80")
- `hints`: Filter results (IPv4/IPv6, TCP/UDP, etc.)
- `res`: Linked list of results

**Returns**: 0 on success, error code on failure.

## Using getaddrinfo()

```c
struct addrinfo hints, *result, *rp;

memset(&hints, 0, sizeof(hints));
hints.ai_family = AF_UNSPEC;      // IPv4 or IPv6
hints.ai_socktype = SOCK_STREAM;  // TCP

int status = getaddrinfo("www.example.com", "http", &hints, &result);
if (status != 0) {
    fprintf(stderr, "getaddrinfo: %s\n", gai_strerror(status));
    exit(EXIT_FAILURE);
}

// Try each address until one works
for (rp = result; rp != NULL; rp = rp->ai_next) {
    int sockfd = socket(rp->ai_family, rp->ai_socktype, rp->ai_protocol);
    if (sockfd == -1)
        continue;

    if (connect(sockfd, rp->ai_addr, rp->ai_addrlen) == 0) {
        // Success!
        break;
    }

    close(sockfd);
}

freeaddrinfo(result);  // Free the linked list
```

## The addrinfo Structure

```c
struct addrinfo {
    int              ai_flags;     // Input flags
    int              ai_family;    // AF_INET, AF_INET6, AF_UNSPEC
    int              ai_socktype;  // SOCK_STREAM, SOCK_DGRAM
    int              ai_protocol;  // Protocol (usually 0)
    socklen_t        ai_addrlen;   // Length of ai_addr
    struct sockaddr *ai_addr;      // Socket address
    char            *ai_canonname; // Canonical name
    struct addrinfo *ai_next;      // Next in list
};
```

## Hints Flags

Control resolution behavior with `ai_flags`:

```c
hints.ai_flags = AI_PASSIVE;      // For servers (bind to wildcard)
hints.ai_flags = AI_CANONNAME;    // Return canonical name
hints.ai_flags = AI_NUMERICHOST;  // Don't resolve—node must be numeric
hints.ai_flags = AI_V4MAPPED;     // Return IPv4-mapped IPv6 if no IPv6
```

## Server Example with getaddrinfo()

```c
struct addrinfo hints, *result;

memset(&hints, 0, sizeof(hints));
hints.ai_family = AF_UNSPEC;      // IPv4 or IPv6
hints.ai_socktype = SOCK_STREAM;
hints.ai_flags = AI_PASSIVE;      // Use wildcard address

getaddrinfo(NULL, "8080", &hints, &result);

int sockfd = socket(result->ai_family, result->ai_socktype, result->ai_protocol);
bind(sockfd, result->ai_addr, result->ai_addrlen);
listen(sockfd, 10);

freeaddrinfo(result);
```

## getnameinfo(): Reverse Lookup

Convert socket address to hostname and service:

```c
char host[NI_MAXHOST], service[NI_MAXSERV];

int status = getnameinfo((struct sockaddr *)&addr, sizeof(addr),
                         host, sizeof(host),
                         service, sizeof(service),
                         0);

if (status == 0) {
    printf("Host: %s, Service: %s\n", host, service);
}
```

**Flags**:
```c
NI_NUMERICHOST  // Return numeric address, don't resolve
NI_NUMERICSERV  // Return numeric port
NI_NOFQDN       // Return short hostname
NI_NAMEREQD     // Fail if name can't be resolved
```

## IP Address Conversion

**inet_pton()**: Presentation to numeric (string to binary):

```c
struct sockaddr_in addr;
inet_pton(AF_INET, "192.168.1.1", &addr.sin_addr);

struct sockaddr_in6 addr6;
inet_pton(AF_INET6, "2001:db8::1", &addr6.sin6_addr);
```

**inet_ntop()**: Numeric to presentation (binary to string):

```c
char str[INET_ADDRSTRLEN];
inet_ntop(AF_INET, &addr.sin_addr, str, sizeof(str));

char str6[INET6_ADDRSTRLEN];
inet_ntop(AF_INET6, &addr6.sin6_addr, str6, sizeof(str6));
```

## Legacy Functions (Avoid)

**Deprecated**:
- `gethostbyname()`: Not thread-safe, IPv4 only
- `gethostbyaddr()`: Not thread-safe
- `inet_addr()`: Can't distinguish error from 255.255.255.255
- `inet_ntoa()`: Not thread-safe (static buffer)

Always use `getaddrinfo()`, `getnameinfo()`, `inet_pton()`, and `inet_ntop()` instead.

## Protocol-Independent Code

Write code that works with both IPv4 and IPv6:

```c
int create_and_connect(const char *host, const char *port) {
    struct addrinfo hints, *result, *rp;
    int sockfd;

    memset(&hints, 0, sizeof(hints));
    hints.ai_family = AF_UNSPEC;      // IPv4 or IPv6
    hints.ai_socktype = SOCK_STREAM;

    int status = getaddrinfo(host, port, &hints, &result);
    if (status != 0) {
        fprintf(stderr, "getaddrinfo: %s\n", gai_strerror(status));
        return -1;
    }

    for (rp = result; rp != NULL; rp = rp->ai_next) {
        sockfd = socket(rp->ai_family, rp->ai_socktype, rp->ai_protocol);
        if (sockfd == -1)
            continue;

        if (connect(sockfd, rp->ai_addr, rp->ai_addrlen) == 0)
            break;  // Success

        close(sockfd);
    }

    freeaddrinfo(result);

    if (rp == NULL) {
        fprintf(stderr, "Could not connect\n");
        return -1;
    }

    return sockfd;
}
```

## Error Handling

`getaddrinfo()` returns an error code, not -1:

```c
int status = getaddrinfo(host, service, &hints, &result);
if (status != 0) {
    fprintf(stderr, "getaddrinfo error: %s\n", gai_strerror(status));
    return -1;
}
```

Common error codes:
- `EAI_AGAIN`: Name could not be resolved (temporary)
- `EAI_NONAME`: Node or service not known
- `EAI_FAMILY`: Address family not supported
- `EAI_SOCKTYPE`: Socket type not supported

## DNS Caching Considerations

`getaddrinfo()` may cache results. For long-running programs:
- Don't cache addresses indefinitely
- Re-resolve periodically
- Handle DNS changes gracefully
- Consider TTL from DNS response
