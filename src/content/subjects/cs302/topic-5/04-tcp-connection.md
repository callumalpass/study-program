# TCP Connection Management

## The Three-Way Handshake

TCP establishes connections using a three-way handshake that synchronizes sequence numbers between both parties and ensures both are ready to communicate.

```
Client                              Server
  |                                    |
  |-------- SYN (seq=x) ------------->|
  |                                    |
  |<------ SYN-ACK (seq=y, ack=x+1) ---|
  |                                    |
  |-------- ACK (seq=x+1, ack=y+1) -->|
  |                                    |
  |         Connection Established     |
```

**Step 1 - SYN**: Client sends segment with SYN flag, chooses initial sequence number (ISN).

**Step 2 - SYN-ACK**: Server responds with SYN and ACK flags, chooses its own ISN, acknowledges client's ISN.

**Step 3 - ACK**: Client acknowledges server's ISN. Connection is established.

After the handshake, both sides know:
- The other's initial sequence number
- That the other is ready to receive
- That the path works in both directions

## Initial Sequence Numbers

ISNs are not zero or predictable—they're chosen to be unpredictable to prevent attacks.

**Why random ISNs?**
- Security: Prevents sequence number prediction attacks
- Avoid confusion: Old segments from previous connections won't match

Modern systems use ISN generation based on:
- Cryptographic hash of addresses/ports
- Timer-based component
- Random component

## Connection States

TCP connections move through well-defined states:

**Client states** (active open):
```
CLOSED → SYN_SENT → ESTABLISHED
```

**Server states** (passive open):
```
CLOSED → LISTEN → SYN_RECEIVED → ESTABLISHED
```

**Full state diagram** includes many more states for various scenarios including simultaneous open and closing sequences.

## Connection Termination

TCP uses a four-way handshake to close connections gracefully:

```
Client                              Server
  |                                    |
  |-------- FIN (seq=u) ------------->|
  |                                    |
  |<-------- ACK (ack=u+1) -----------|
  |                                    |
  |<-------- FIN (seq=v) -------------|
  |                                    |
  |-------- ACK (ack=v+1) ----------->|
  |                                    |
  |         Connection Closed          |
```

**Step 1**: One side sends FIN, indicating no more data to send.
**Step 2**: Other side acknowledges the FIN.
**Step 3**: Other side sends its FIN when done.
**Step 4**: First side acknowledges.

The connection is **half-closed** between steps 2 and 3—one side can still send data.

## TIME_WAIT State

After sending the final ACK, the closing initiator enters TIME_WAIT state for 2×MSL (Maximum Segment Lifetime, typically 2 minutes).

**Why TIME_WAIT?**
1. Ensure final ACK is received (can retransmit if not)
2. Allow old segments to expire before new connection on same ports

TIME_WAIT can cause problems on busy servers with many short connections—ports remain unavailable briefly.

## Connection Reset

The RST flag forcefully terminates a connection without graceful handshake:

**When RST is sent**:
- Connection to closed port
- Segment received for non-existent connection
- Application requests abort

**Effect of RST**:
- Connection immediately terminates
- No acknowledgment expected
- Data in flight is lost

RST is abnormal—graceful close (FIN) is preferred when possible.

## Simultaneous Open

Both sides can initiate connection simultaneously:

```
Host A                              Host B
  |-------- SYN (seq=x) ------------->|
  |<-------- SYN (seq=y) -------------|
  |                                    |
  |<------ SYN-ACK (seq=y, ack=x+1) --|
  |-------- SYN-ACK (seq=x, ack=y+1)->|
  |                                    |
  |         Connection Established     |
```

Both hosts go through SYN_SENT → SYN_RECEIVED → ESTABLISHED.

## TCP Options

Options extend the header beyond 20 bytes:

**MSS (Maximum Segment Size)**:
- Announced during handshake
- Largest segment willing to receive
- Default is 536 bytes; typically 1460 for Ethernet

**Window Scale**:
- Multiplies window field by power of 2
- Enables windows larger than 65,535 bytes
- Essential for high-bandwidth, high-latency links

**Timestamps**:
- Round-trip time measurement
- Protection against wrapped sequence numbers (PAWS)

**SACK (Selective Acknowledgment)**:
- Reports non-contiguous received blocks
- Enables more efficient retransmission

Options are negotiated during connection setup; both sides must support them.

## SYN Flood Attack

Attackers can exploit the handshake:

1. Send many SYN packets with spoofed source addresses
2. Server allocates resources for each half-open connection
3. Server eventually runs out of resources

**Defenses**:
- SYN cookies: Don't allocate until handshake complete
- Rate limiting
- Firewalls with connection tracking
- Increased backlog queue

## Connection Tuning

**Backlog**: Number of pending connections server will queue. Important for busy servers.

**Keep-alive**: Optional probes to detect dead connections. Default timeout is often 2 hours.

**Socket options**: SO_REUSEADDR allows immediate reuse of TIME_WAIT ports (use carefully).
