# Framing and Frame Structure

## The Need for Framing

The physical layer provides a stream of bits, but higher layers need to work with discrete units of data. Framing is the process of organizing bits into frames—logical units that can be addressed, error-checked, and processed independently.

Without framing, the receiver couldn't tell where one message ends and another begins. Framing provides boundaries that let the data link layer reliably identify complete units of data for processing.

## Framing Methods

Several techniques can mark frame boundaries:

**Character Count**:
- Frame header contains the number of bytes in the frame
- Simple but problematic: if count is corrupted, receiver loses synchronization
- All subsequent frames may be misinterpreted
- Rarely used alone due to this vulnerability

**Flag Bytes with Byte Stuffing**:
- Special byte marks start and end of frame (e.g., 0x7E)
- Problem: what if the flag byte appears in the data?
- Solution: byte stuffing—escape special bytes in data
- Example: flag (0x7E) becomes 0x7D 0x5E in data
- Escape byte (0x7D) becomes 0x7D 0x5D
- Used in PPP (Point-to-Point Protocol)

**Flag Bits with Bit Stuffing**:
- Special bit pattern marks frame boundaries (e.g., 01111110)
- Bit stuffing: After five consecutive 1s in data, insert a 0
- Receiver removes stuffed 0s after five 1s
- Ensures flag pattern never appears in data
- Used in HDLC (High-Level Data Link Control)

**Physical Layer Coding Violations**:
- Use illegal encoding patterns to mark boundaries
- Example: In Manchester encoding, transitions define bits
- No transition is illegal—can be used as delimiter
- Doesn't require stuffing
- Used in 802.3 Ethernet

## Frame Structure

While frame formats vary by protocol, most include common elements:

```
| Preamble | Header | Payload | Trailer |
```

**Preamble**: A known bit pattern that helps receivers synchronize their clocks and recognize the start of a frame. Ethernet's preamble is 7 bytes of 10101010 followed by 10101011.

**Header**: Contains addressing and control information:
- Destination address (MAC address)
- Source address
- Length or type field
- Protocol-specific control fields

**Payload**: The data being transmitted. This is typically a packet from the network layer. Payload has minimum and maximum sizes:
- Minimum: prevents very short frames (simplifies collision detection)
- Maximum: prevents one station from monopolizing the medium

**Trailer**: Usually contains error detection information like a checksum or CRC.

## Ethernet Frame Format

Ethernet (IEEE 802.3) is the dominant LAN technology. Its frame format:

```
| Preamble | SFD | Dest MAC | Src MAC | Type/Len | Payload | FCS |
| 7 bytes  | 1B  | 6 bytes  | 6 bytes | 2 bytes  | 46-1500 | 4B  |
```

**Preamble (7 bytes)**: Pattern 10101010... for clock synchronization

**Start Frame Delimiter (SFD, 1 byte)**: 10101011 marks the end of preamble, start of frame

**Destination MAC (6 bytes)**: Where the frame should go
- First bit: 0 = unicast, 1 = multicast/broadcast
- All 1s = broadcast (FF:FF:FF:FF:FF:FF)

**Source MAC (6 bytes)**: Who sent the frame
- Always unicast

**Type/Length (2 bytes)**:
- If ≤ 1500: indicates payload length
- If ≥ 1536: indicates protocol type (e.g., 0x0800 = IPv4)

**Payload (46-1500 bytes)**:
- Minimum 46 bytes (padded if necessary)
- Maximum 1500 bytes (standard MTU)
- Contains network layer packet

**Frame Check Sequence (FCS, 4 bytes)**:
- 32-bit CRC for error detection
- Computed over addresses, type, and payload

**Frame length**: 64-1518 bytes (not counting preamble)

## Other Frame Formats

**802.11 Wi-Fi Frame**:
- More complex header for wireless
- Four address fields possible (for bridging)
- Duration field for medium reservation
- Sequence control for fragmentation

**PPP Frame**:
- Used for point-to-point links
- Flag bytes (0x7E) at both ends
- Address (0xFF) and Control (0x03) fields
- Protocol field identifies payload
- Uses byte stuffing

**HDLC Frame**:
- ISO standard data link protocol
- Flag pattern 01111110 at both ends
- Uses bit stuffing
- Basis for many other protocols

## Minimum and Maximum Frame Sizes

**Minimum size** matters for collision detection in CSMA/CD networks:
- In Ethernet: 64 bytes (including addresses and FCS)
- If payload is less than 46 bytes, padding is added
- Ensures frame transmission time is longer than round-trip propagation time
- Without minimum size, collisions might go undetected

**Maximum size** prevents medium monopolization:
- Standard Ethernet MTU: 1500 bytes payload
- Jumbo frames: 9000 bytes payload (for data centers)
- Larger frames improve efficiency but require more buffer space

## Frame Processing

When a frame arrives at a device:

1. **Synchronization**: Preamble helps receiver lock onto signal timing
2. **Start detection**: SFD indicates frame content begins
3. **Address check**: Is this frame for me?
   - Exact match with device's MAC address
   - Broadcast address (all 1s)
   - Multicast group the device has joined
4. **Error check**: Compute CRC and compare with FCS
   - If mismatch, frame is discarded silently
5. **Type processing**: Based on Type field, pass payload to appropriate network layer protocol
6. **Payload extraction**: Remove frame header/trailer, deliver payload

Frames addressed to other devices (in promiscuous mode) or frames with CRC errors are normally discarded.
