---
id: cs302-t7-websockets
title: "WebSockets"
order: 6
---

# WebSockets and Real-Time Communication

## The Real-Time Challenge

HTTP is request-response: client asks, server answers. But many applications need:
- Server-initiated messages (push)
- Low-latency bidirectional communication
- Persistent connections

Examples: Chat, live feeds, collaborative editing, gaming, stock tickers.

## Pre-WebSocket Solutions

**Polling**: Client repeatedly asks for updates
```
Client: Any updates?
Server: No
Client: Any updates?
Server: No
Client: Any updates?
Server: Yes, here's data
```
Wastes bandwidth and adds latency.

**Long polling**: Server holds request until data available
```
Client: Any updates? (request held)
...time passes...
Server: Here's data
Client: Any updates? (new request)
```
Better, but still overhead per update.

**Server-Sent Events (SSE)**: One-way server push
```
Client opens connection
Server: event: message
        data: Hello

Server: event: message
        data: World
```
Good for one-way, but client can't easily send.

## WebSocket Protocol

WebSocket provides full-duplex communication over a single TCP connection.

**Features**:
- Bidirectional (both sides send anytime)
- Low overhead (minimal framing)
- Persistent connection
- Works through HTTP infrastructure

**Port 80** (ws://) or **443** (wss://)

## WebSocket Handshake

WebSocket starts as HTTP, then upgrades:

**Client request**:
```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

**Server response**:
```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

After this, the connection speaks WebSocket, not HTTP.

## Sec-WebSocket-Accept

The server proves it received the handshake:

```
Sec-WebSocket-Accept = Base64(SHA1(Sec-WebSocket-Key + GUID))
```

Where GUID is `258EAFA5-E914-47DA-95CA-C5AB0DC85B11`.

This isn't security—it prevents caching proxies from mishandling WebSocket connections.

## WebSocket Frame Format

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|       |A|             |                               |
|N|V|V|V|       |S|             |                               |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+-------------------------------+
|     Extended payload length continued, if payload len == 127  |
+-------------------------------+-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------+-------------------------------+
|                     Payload Data continued ...                |
+---------------------------------------------------------------+
```

**FIN**: Final fragment
**Opcode**: 0x1 text, 0x2 binary, 0x8 close, 0x9 ping, 0xA pong
**MASK**: Client frames must be masked
**Payload length**: 7 bits, or 16/64 bits extended

## WebSocket Message Types

**Text**: UTF-8 encoded string
**Binary**: Raw bytes (images, protobuf, etc.)
**Close**: Terminate connection with optional status
**Ping/Pong**: Keep-alive mechanism

## Client-Side JavaScript

```javascript
const ws = new WebSocket('wss://server.example.com/chat');

ws.onopen = () => {
    console.log('Connected');
    ws.send('Hello, server!');
};

ws.onmessage = (event) => {
    console.log('Received:', event.data);
};

ws.onclose = (event) => {
    console.log('Disconnected:', event.code, event.reason);
};

ws.onerror = (error) => {
    console.error('Error:', error);
};

// Send message
ws.send('Hello');
ws.send(JSON.stringify({type: 'chat', message: 'Hi'}));

// Close connection
ws.close(1000, 'Normal closure');
```

## Server-Side Implementation

Node.js with ws library:
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received:', message);
        ws.send('Echo: ' + message);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
```

Python with websockets:
```python
import asyncio
import websockets

async def handler(websocket, path):
    async for message in websocket:
        await websocket.send(f"Echo: {message}")

asyncio.get_event_loop().run_until_complete(
    websockets.serve(handler, "localhost", 8080))
asyncio.get_event_loop().run_forever()
```

## WebSocket Subprotocols

Application-level protocols over WebSocket:

```javascript
const ws = new WebSocket('wss://server.example.com', ['chat', 'json']);
```

Server selects one in response:
```http
Sec-WebSocket-Protocol: json
```

## Connection Management

**Keep-alive**: Use ping/pong frames
```javascript
// Server sends periodic pings
setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

ws.on('pong', () => {
    ws.isAlive = true;
});
```

**Reconnection**: Client should handle disconnects
```javascript
function connect() {
    const ws = new WebSocket(url);
    ws.onclose = () => {
        setTimeout(connect, 1000);  // Reconnect after 1s
    };
}
```

## Scaling WebSocket Servers

**Challenge**: Each connection holds resources

**Solutions**:
- Connection limits per server
- Sticky sessions (route same client to same server)
- Pub/sub system for cross-server messaging (Redis, etc.)

```
Client → Load Balancer → Server 1 ┐
                        Server 2 ├→ Redis Pub/Sub
                        Server 3 ┘
```

## Security Considerations

**Use WSS** (WebSocket Secure): Always in production

**Origin checking**: Verify Origin header
```javascript
wss.on('connection', (ws, req) => {
    const origin = req.headers.origin;
    if (!isAllowedOrigin(origin)) {
        ws.close(1008, 'Unauthorized');
        return;
    }
});
```

**Authentication**: Token in URL or first message
```javascript
const ws = new WebSocket('wss://server/chat?token=abc123');
```

**Rate limiting**: Prevent abuse

**Input validation**: Treat all messages as untrusted

## WebSocket vs Alternatives

| Feature | WebSocket | SSE | Long Polling |
|---------|-----------|-----|--------------|
| Direction | Bidirectional | Server→Client | Both (awkward) |
| Protocol | ws/wss | HTTP | HTTP |
| Overhead | Low | Low | High |
| Browser support | Excellent | Good | Universal |
| Proxy friendliness | Sometimes issues | Good | Good |

Use WebSocket when you need true bidirectional communication.
