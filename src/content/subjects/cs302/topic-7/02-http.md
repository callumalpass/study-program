# HTTP: HyperText Transfer Protocol

## HTTP Overview

HTTP (HyperText Transfer Protocol) is the foundation of the World Wide Web. Originally designed for transferring HTML documents, it now carries all types of content: images, videos, APIs, and more.

HTTP is:
- **Text-based**: Human-readable (mostly)
- **Request-response**: Client asks, server answers
- **Stateless**: Each request independent
- **Extensible**: Headers allow new functionality

## HTTP Request-Response Cycle

```mermaid
sequenceDiagram
    participant Client as Web Client
    participant Server as Web Server

    Note over Client,Server: Connection Established (TCP/TLS)

    Client->>Server: HTTP GET /index.html HTTP/1.1<br/>Host: www.example.com<br/>User-Agent: Mozilla/5.0<br/>Accept: text/html

    Note over Server: Process request<br/>Locate resource<br/>Generate response

    Server->>Client: HTTP/1.1 200 OK<br/>Content-Type: text/html<br/>Content-Length: 1234<br/><br/><!DOCTYPE html>...

    Note over Client: Render HTML

    Client->>Server: HTTP GET /style.css HTTP/1.1

    Server->>Client: HTTP/1.1 200 OK<br/>Content-Type: text/css<br/><br/>body { color: blue; }

    Client->>Server: HTTP GET /missing.jpg HTTP/1.1

    Server->>Client: HTTP/1.1 404 Not Found<br/>Content-Type: text/html<br/><br/><h1>Not Found</h1>
```

## HTTP Request Format

```
Method SP Request-URI SP HTTP-Version CRLF
Header-field: value CRLF
Header-field: value CRLF
CRLF
[Message body]
```

**Example**:
```http
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
Accept-Language: en-US

```

## HTTP Methods

**GET**: Retrieve resource
- No request body
- Safe and idempotent
- Cacheable

**POST**: Submit data
- Has request body
- Not idempotent
- Create new resource

**PUT**: Replace resource
- Has request body
- Idempotent
- Update existing resource

**DELETE**: Remove resource
- Idempotent
- Remove resource

**HEAD**: GET without body
- Check resource existence
- Get headers only

**OPTIONS**: Query capabilities
**PATCH**: Partial update

## HTTP Response Format

```
HTTP-Version SP Status-Code SP Reason-Phrase CRLF
Header-field: value CRLF
Header-field: value CRLF
CRLF
[Message body]
```

**Example**:
```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234
Date: Mon, 23 May 2023 22:38:34 GMT

<!DOCTYPE html>
<html>...
```

## Status Codes

**1xx Informational**:
- 100 Continue

**2xx Success**:
- 200 OK
- 201 Created
- 204 No Content

**3xx Redirection**:
- 301 Moved Permanently
- 302 Found (temporary redirect)
- 304 Not Modified

**4xx Client Error**:
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 405 Method Not Allowed

**5xx Server Error**:
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable

## Important Headers

**Request headers**:
```http
Host: www.example.com          # Required in HTTP/1.1
User-Agent: Mozilla/5.0        # Client identity
Accept: text/html,application/json
Accept-Language: en-US
Accept-Encoding: gzip, deflate
Cookie: session=abc123
Authorization: Bearer token123
```

**Response headers**:
```http
Content-Type: text/html; charset=utf-8
Content-Length: 1234
Content-Encoding: gzip
Cache-Control: max-age=3600
Set-Cookie: session=xyz789
Location: /new-page           # For redirects
```

## Persistent Connections

**HTTP/1.0**: New TCP connection per request
**HTTP/1.1**: Persistent connections (default)

```http
Connection: keep-alive    # Keep connection open
Connection: close         # Close after response
```

Persistent connections avoid TCP handshake overhead for multiple requests.

## HTTP/1.1 Pipelining

Send multiple requests without waiting for responses:

```
Request 1 →
Request 2 →
Request 3 →
           ← Response 1
           ← Response 2
           ← Response 3
```

**Limitation**: Head-of-line blocking—responses must be in order. If Response 1 is slow, 2 and 3 wait.

## HTTP/2

Binary protocol with multiplexing:

**Streams**: Multiple requests/responses over one connection
**Multiplexing**: True parallel requests, no HOL blocking
**Header compression**: HPACK reduces header size
**Server push**: Server sends resources proactively
**Priority**: Clients hint at importance

```
Stream 1: Request → Response
Stream 2: Request → Response  } All over single TCP connection
Stream 3: Request → Response
```

## HTTP/3 and QUIC

HTTP/3 uses QUIC instead of TCP:

**QUIC benefits**:
- Built-in encryption (TLS 1.3)
- Faster connection establishment
- Stream multiplexing at transport layer
- No TCP head-of-line blocking
- Connection migration (IP changes)

## Caching

**Cache-Control** header directs caching:

```http
Cache-Control: public, max-age=3600    # Cache for 1 hour
Cache-Control: private                  # User-specific, don't cache publicly
Cache-Control: no-cache                 # Revalidate before using
Cache-Control: no-store                 # Never cache
```

**Conditional requests**:
```http
If-Modified-Since: Wed, 21 Oct 2015 07:28:00 GMT
If-None-Match: "33a64df551425fcc55e4d42a148795d9"
```

Response: 304 Not Modified (use cache) or 200 OK (new content)

## Cookies

HTTP is stateless; cookies add state:

**Server sets cookie**:
```http
Set-Cookie: session=abc123; Path=/; HttpOnly; Secure
```

**Client sends cookie**:
```http
Cookie: session=abc123
```

**Cookie attributes**:
- `Expires`/`Max-Age`: When cookie expires
- `Domain`: Which domains receive cookie
- `Path`: Which paths receive cookie
- `Secure`: Only send over HTTPS
- `HttpOnly`: No JavaScript access
- `SameSite`: CSRF protection

## HTTPS

HTTP over TLS:

1. TCP handshake
2. TLS handshake (certificates, keys)
3. Encrypted HTTP communication

```
Client                          Server
   |-- ClientHello --------------->|
   |<-------------- ServerHello ---|
   |<-------------- Certificate ---|
   |-- Key Exchange -------------->|
   |<---- Encrypted HTTP traffic ->|
```

HTTPS provides:
- **Confidentiality**: Encrypted
- **Integrity**: Tampering detected
- **Authentication**: Server identity verified

## REST APIs

HTTP for APIs, not just web pages:

```http
GET /api/users/123 HTTP/1.1
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{"id": 123, "name": "Alice"}
```

**RESTful conventions**:
- GET /users - List users
- POST /users - Create user
- GET /users/123 - Get user 123
- PUT /users/123 - Replace user 123
- DELETE /users/123 - Delete user 123

JSON typically used for request/response bodies.
