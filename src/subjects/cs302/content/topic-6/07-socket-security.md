---
id: cs302-t6-security
title: "Socket Security"
order: 7
---

# Socket Security

## Security Threats

Network applications face numerous threats:

**Eavesdropping**: Attackers read data in transit
**Tampering**: Attackers modify data
**Spoofing**: Attackers impersonate legitimate parties
**Denial of Service**: Attackers overwhelm the server
**Injection**: Malformed input exploits vulnerabilities

Socket programmers must defend against all of these.

## Input Validation

Never trust data from the network:

```c
// Dangerous: Buffer overflow
char buffer[100];
recv(sockfd, buffer, 1000, 0);  // Can overflow!

// Safe: Limit read size
recv(sockfd, buffer, sizeof(buffer) - 1, 0);
buffer[99] = '\0';  // Ensure null termination
```

**Validate all input**:
- Check lengths before copying
- Validate message formats
- Reject unexpected data
- Handle partial receives correctly

## Length-Prefixed Protocols

Use explicit lengths rather than delimiters:

```c
// Send: length prefix + data
uint32_t len = htonl(strlen(message));
send(sockfd, &len, sizeof(len), 0);
send(sockfd, message, strlen(message), 0);

// Receive: read length, then data
uint32_t len;
recv(sockfd, &len, sizeof(len), 0);
len = ntohl(len);

if (len > MAX_MESSAGE_SIZE) {
    // Reject oversized message
    close(sockfd);
    return;
}

char *buffer = malloc(len + 1);
recv_all(sockfd, buffer, len);
buffer[len] = '\0';
```

## Denial of Service Protection

**Resource limits**:
```c
// Limit concurrent connections
if (num_connections >= MAX_CONNECTIONS) {
    close(client_fd);
    continue;
}

// Limit connections per IP
if (connections_from_ip(client_ip) >= MAX_PER_IP) {
    close(client_fd);
    continue;
}
```

**Timeouts**:
```c
struct timeval tv = {30, 0};  // 30 second timeout
setsockopt(sockfd, SOL_SOCKET, SO_RCVTIMEO, &tv, sizeof(tv));
setsockopt(sockfd, SOL_SOCKET, SO_SNDTIMEO, &tv, sizeof(tv));
```

**Rate limiting**:
```c
// Simple token bucket
if (tokens <= 0) {
    // Too many requests
    send_error(client_fd, "Rate limited");
    continue;
}
tokens--;
// Refill tokens periodically
```

## TLS/SSL Integration

Use TLS for encryption and authentication:

```c
#include <openssl/ssl.h>
#include <openssl/err.h>

// Initialize OpenSSL
SSL_library_init();
SSL_load_error_strings();

// Create context
SSL_CTX *ctx = SSL_CTX_new(TLS_server_method());

// Load certificate and key
SSL_CTX_use_certificate_file(ctx, "server.crt", SSL_FILETYPE_PEM);
SSL_CTX_use_PrivateKey_file(ctx, "server.key", SSL_FILETYPE_PEM);

// Wrap socket
int client_fd = accept(server_fd, ...);
SSL *ssl = SSL_new(ctx);
SSL_set_fd(ssl, client_fd);

// TLS handshake
if (SSL_accept(ssl) <= 0) {
    ERR_print_errors_fp(stderr);
    SSL_free(ssl);
    close(client_fd);
    continue;
}

// Encrypted communication
SSL_write(ssl, data, len);
SSL_read(ssl, buffer, sizeof(buffer));

// Cleanup
SSL_shutdown(ssl);
SSL_free(ssl);
close(client_fd);
```

## TLS Client

```c
SSL_CTX *ctx = SSL_CTX_new(TLS_client_method());

// Enable certificate verification
SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER, NULL);
SSL_CTX_set_default_verify_paths(ctx);

int sockfd = connect_to_server(...);
SSL *ssl = SSL_new(ctx);
SSL_set_fd(ssl, sockfd);

// Set hostname for SNI
SSL_set_tlsext_host_name(ssl, "example.com");

// Connect
if (SSL_connect(ssl) <= 0) {
    // Handshake failed
}

// Verify hostname
X509 *cert = SSL_get_peer_certificate(ssl);
// Check cert matches expected hostname
```

## Authentication Patterns

**Pre-shared key**:
```c
// Client sends key
send(sockfd, api_key, strlen(api_key), 0);

// Server validates
if (!validate_api_key(received_key)) {
    close(sockfd);
}
```

**Challenge-response**:
```c
// Server sends random challenge
unsigned char challenge[32];
RAND_bytes(challenge, sizeof(challenge));
send(sockfd, challenge, sizeof(challenge), 0);

// Client signs with private key
// Server verifies signature
```

**Certificate authentication** (mTLS):
```c
// Server requires client certificate
SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER | SSL_VERIFY_FAIL_IF_NO_PEER_CERT, NULL);
```

## Secure Coding Practices

**Avoid information leakage**:
```c
// Bad: Reveals existence of users
if (!user_exists(username)) {
    send_error("User not found");
} else if (!password_matches(username, password)) {
    send_error("Wrong password");
}

// Better: Consistent response
if (!authenticate(username, password)) {
    send_error("Authentication failed");
}
```

**Clear sensitive data**:
```c
// Zero password from memory
memset(password, 0, strlen(password));

// Use explicit_bzero if available (not optimized away)
explicit_bzero(secret_key, sizeof(secret_key));
```

**Check return values**:
```c
// Every send/recv can fail
ssize_t n = send(sockfd, data, len, 0);
if (n < 0) {
    // Handle error
} else if (n < len) {
    // Handle partial send
}
```

## Common Vulnerabilities

**Buffer overflow**: Fixed-size buffers with unchecked input
**Format string**: Using user input as printf format
**Integer overflow**: Length calculations wrap around
**Use after free**: Socket used after close
**Race conditions**: TOCTOU vulnerabilities

## Security Checklist

1. ✓ Validate all input lengths
2. ✓ Use TLS for sensitive data
3. ✓ Implement authentication
4. ✓ Set timeouts on all operations
5. ✓ Limit resources (connections, bandwidth)
6. ✓ Log security-relevant events
7. ✓ Clear sensitive data from memory
8. ✓ Handle errors without information leakage
9. ✓ Use secure random number generation
10. ✓ Keep dependencies updated

## Testing

**Fuzzing**: Send malformed data
```bash
# Using netcat to send garbage
cat /dev/urandom | head -c 1000 | nc localhost 8080
```

**Load testing**: Verify DoS protections
```bash
# Using ab (Apache Bench)
ab -n 10000 -c 100 http://localhost:8080/
```

**Security scanning**: Use tools like nmap, nikto

Security is not optional—build it in from the start.
