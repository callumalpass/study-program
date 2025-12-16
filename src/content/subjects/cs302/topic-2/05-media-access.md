# Media Access Control

## The Multiple Access Problem

When multiple devices share a common communication channel, they need a way to coordinate access. If two devices transmit simultaneously, their signals interfere, creating a **collision** that corrupts both transmissions.

Media Access Control (MAC) protocols determine how devices share the channel. The goal is to maximize throughput, minimize collisions, and ensure fair access. Different environments call for different approaches.

## Channel Partitioning

Channel partitioning divides the channel among users, preventing collisions by giving each user exclusive access to a portion of the channel.

**Time Division Multiple Access (TDMA)**:
- Time is divided into slots
- Each device gets specific slots
- No collisions (devices transmit in their slots)
- Inefficient when devices have nothing to send (slots are wasted)
- Used in cellular networks (2G GSM)

**Frequency Division Multiple Access (FDMA)**:
- Bandwidth divided into frequency bands
- Each device gets a dedicated band
- Simultaneous transmission possible
- Guard bands needed between channels (wasted bandwidth)
- Used in early cellular, cable TV

**Code Division Multiple Access (CDMA)**:
- Each device has a unique code
- All devices transmit on same frequency simultaneously
- Receiver uses code to extract desired signal
- More efficient spectrum utilization
- Used in 3G cellular

**Wavelength Division Multiple Access (WDMA)**:
- Different wavelengths (colors) of light
- Used in fiber optic networks
- Very high aggregate bandwidth

## Random Access Protocols

Random access protocols let devices transmit whenever they have data. Collisions are possible but handled through detection and recovery mechanisms.

**ALOHA** (developed at University of Hawaii, 1970):
- Pure ALOHA: Transmit whenever you have data
- If no acknowledgment, collision occurred—wait random time, retry
- Maximum throughput: 18% (vulnerable period = 2× frame time)

**Slotted ALOHA**:
- Time divided into slots matching frame size
- Can only start transmission at slot boundaries
- Maximum throughput: 37% (reduced vulnerable period)

**CSMA (Carrier Sense Multiple Access)**:
- Listen before transmitting ("carrier sense")
- If channel busy, wait
- Reduces but doesn't eliminate collisions (propagation delay)
- Variants:
  - 1-persistent: Transmit immediately when channel becomes free
  - Non-persistent: Wait random time if channel busy
  - p-persistent: Transmit with probability p when channel free

## CSMA/CD

**CSMA/CD (Collision Detection)** extends CSMA by detecting collisions during transmission and aborting quickly.

**How CSMA/CD works**:
1. Listen to channel
2. If idle, start transmitting
3. While transmitting, monitor channel
4. If collision detected:
   - Stop transmitting
   - Send jam signal (ensure all stations detect collision)
   - Wait random time (binary exponential backoff)
   - Try again

**Binary Exponential Backoff**:
- After nth collision, choose random k from 0 to 2ⁿ-1
- Wait k × slot time before retrying
- Maximum n is typically 10-16
- Adapts to traffic load

**Requirements for collision detection**:
- Frame must be long enough for collision signal to propagate back
- Minimum frame size ensures transmitter is still sending when collision is detected
- This limits network diameter (maximum cable length)

**Used in**: Original Ethernet (10BASE5, 10BASE2, 10BASE-T hubs)

**Not used in**: Modern switched Ethernet (full-duplex eliminates collisions)

## CSMA/CA

**CSMA/CA (Collision Avoidance)** is used in wireless networks where collision detection is impractical.

**Why not CSMA/CD for wireless?**:
- Can't transmit and receive simultaneously on same frequency
- Hidden terminal problem: A can't hear C, but both can reach B
- Exposed terminal problem: D can hear C, but their transmissions don't conflict

**How CSMA/CA works**:
1. Listen to channel
2. If idle for DIFS (DCF Interframe Space), transmit
3. If busy, wait until idle + DIFS + random backoff
4. Transmit frame
5. Wait for ACK from receiver
6. No ACK means collision—retry with increased backoff

**RTS/CTS (Request to Send / Clear to Send)**:
- Optional mechanism for large frames
- Sender sends small RTS frame
- Receiver responds with CTS frame
- Other stations hear CTS and defer
- Addresses hidden terminal problem

**Used in**: Wi-Fi (802.11)

## Taking Turns Protocols

Taking turns protocols combine advantages of partitioning and random access.

**Polling**:
- Central controller polls each device in turn
- Device transmits when polled
- No collisions
- Overhead: polling messages, latency waiting for poll
- Used in some industrial networks

**Token Passing**:
- Special frame (token) circulates
- Only token holder can transmit
- After transmitting (or if nothing to send), pass token
- Fair access, no collisions
- Problems: token loss, node failure
- Used in: Token Ring, FDDI

## MAC Protocol Comparison

| Protocol | Efficiency | Fairness | Complexity | Latency |
|----------|------------|----------|------------|---------|
| TDMA/FDMA | Low-Med | High | Low | Predictable |
| ALOHA | Low | Medium | Very Low | Variable |
| CSMA/CD | High | Medium | Medium | Variable |
| CSMA/CA | Medium | Medium | Medium | Variable |
| Token | High | High | Medium | Predictable |

**Choosing a protocol**:
- Light load: Random access performs well
- Heavy load: Taking turns or partitioning
- Real-time requirements: Partitioning or token
- Simplicity: CSMA variants
- Wireless: CSMA/CA (collision detection not feasible)

Modern wired Ethernet largely avoids MAC concerns through full-duplex switched connections, where each link is point-to-point with no sharing or collisions.
