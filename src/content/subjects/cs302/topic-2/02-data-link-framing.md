# Data Link Layer and Framing

The Data Link layer bridges the gap between raw bit transmission and network-layer packet delivery. It organizes bits into meaningful units called **frames**, provides addressing for local delivery, and detects transmission errors. This layer is essential for reliable communication within a network segment.

## Data Link Layer Functions

The Data Link layer handles:

1. **Framing**: Packaging bits into frames
2. **Physical addressing**: MAC addresses for local delivery
3. **Error detection**: Identifying transmission errors
4. **Flow control**: Preventing receiver overload
5. **Media access control**: Managing shared medium access

```
Data Link Layer Position:

    Network Layer
         |
         | Packets
         v
    +------------+
    | Data Link  |  ← Adds header/trailer, creates frames
    +------------+
         |
         | Frames
         v
    Physical Layer
         |
         | Bits
         v
    [Wire/Wireless]
```

## Framing

**Framing** delineates where one frame ends and the next begins. Without framing, the receiver couldn't distinguish frame boundaries in the bit stream.

### Framing Methods

**Character Count**: First byte indicates frame length
```
[Count][Data...][Count][Data...]

Problem: Single error corrupts all subsequent frames
```

**Byte Stuffing (Character Stuffing)**: Special delimiter characters
```
Frame format:
[FLAG] [Data...] [FLAG]

FLAG = Special byte (e.g., 0x7E)

Problem: What if FLAG appears in data?
Solution: Escape character (ESC = 0x7D)

Original:  0x7E in data
Transmitted: 0x7D 0x5E (escaped)

Original:  0x7D in data
Transmitted: 0x7D 0x5D (escape the escape)
```

**Bit Stuffing**: Used in HDLC and derivatives
```
FLAG pattern: 01111110 (six consecutive 1s)

Rule: After five consecutive 1s in data, insert 0

Original data:  01111110101111111
After stuffing: 011111 0 10101111 0 11
                      ^         ^
                   inserted bits

Receiver removes stuffed bits to recover original data
```

### Ethernet Frame Format

```
Ethernet II Frame:

+----------+----------+------+----------------+-----+
| Dest MAC | Src MAC  | Type |    Payload     | FCS |
|  6 bytes |  6 bytes |  2   |  46-1500 bytes |  4  |
+----------+----------+------+----------------+-----+

Preamble/SFD (not shown): 8 bytes for synchronization

Type field values (EtherType):
  0x0800 = IPv4
  0x0806 = ARP
  0x86DD = IPv6
  0x8100 = VLAN tagged

FCS = Frame Check Sequence (CRC-32)
```

```python
import struct

class EthernetFrame:
    """Simple Ethernet frame parser."""

    def __init__(self, raw_data):
        # First 14 bytes are header
        self.dest_mac = raw_data[0:6]
        self.src_mac = raw_data[6:12]
        self.ethertype = struct.unpack('!H', raw_data[12:14])[0]
        self.payload = raw_data[14:-4]  # Exclude FCS
        self.fcs = raw_data[-4:]

    def format_mac(self, mac_bytes):
        """Convert MAC bytes to readable string."""
        return ':'.join(f'{b:02x}' for b in mac_bytes)

    def __str__(self):
        return (
            f"Dest: {self.format_mac(self.dest_mac)}\n"
            f"Src:  {self.format_mac(self.src_mac)}\n"
            f"Type: 0x{self.ethertype:04x}\n"
            f"Payload: {len(self.payload)} bytes"
        )

# EtherType lookup
ETHERTYPES = {
    0x0800: "IPv4",
    0x0806: "ARP",
    0x86DD: "IPv6",
    0x8100: "VLAN",
}
```

### IEEE 802.3 Frame Format

```
802.3 Frame (with LLC):

+----------+----------+--------+-----+----------------+-----+
| Dest MAC | Src MAC  | Length | LLC |    Payload     | FCS |
|  6 bytes |  6 bytes |   2    | 3+  |  variable      |  4  |
+----------+----------+--------+-----+----------------+-----+

Length field: Payload size (≤1500)
LLC: Logical Link Control header

Distinction from Ethernet II:
- If value ≤ 1500: Length field (802.3)
- If value ≥ 1536: EtherType (Ethernet II)
```

## Error Detection

The Data Link layer detects (but typically doesn't correct) transmission errors.

### Parity

**Single parity bit**: Detects single-bit errors

```
Even parity: Total 1s must be even
Data:    1011001 (four 1s)
Parity:  0
Sent:    10110010

Odd parity: Total 1s must be odd
Data:    1011001 (four 1s)
Parity:  1
Sent:    10110011

Limitation: Cannot detect even number of errors
```

### Checksum

**Internet checksum**: Used in IP, TCP, UDP headers

```python
def calculate_checksum(data):
    """Calculate Internet checksum (RFC 1071)."""
    if len(data) % 2:
        data += b'\x00'  # Pad to even length

    total = 0
    for i in range(0, len(data), 2):
        word = (data[i] << 8) + data[i+1]
        total += word

    # Fold 32-bit sum to 16 bits
    while total >> 16:
        total = (total & 0xFFFF) + (total >> 16)

    return ~total & 0xFFFF

# Example
data = b"Hello, World!"
checksum = calculate_checksum(data)
print(f"Checksum: 0x{checksum:04x}")
```

### Cyclic Redundancy Check (CRC)

**CRC** is the standard for Data Link error detection, offering strong error detection with low overhead.

```
CRC Concept:
1. Treat data as large binary number
2. Divide by generator polynomial
3. Remainder is the CRC
4. Append CRC to data
5. Receiver divides; zero remainder = no error

Common polynomials:
CRC-16: x¹⁶ + x¹⁵ + x² + 1
CRC-32: x³² + x²⁶ + x²³ + x²² + x¹⁶ + x¹² + x¹¹ + x¹⁰ + x⁸ + x⁷ + x⁵ + x⁴ + x² + x + 1

CRC-32 (Ethernet): Detects all single and double bit errors,
                   all odd-number-of-bit errors,
                   all burst errors ≤32 bits
```

```python
import binascii

def crc32_ethernet(data):
    """Calculate Ethernet CRC-32."""
    return binascii.crc32(data) & 0xFFFFFFFF

# Example
frame_data = b"Test frame data"
crc = crc32_ethernet(frame_data)
print(f"CRC-32: 0x{crc:08x}")

# Verify: receiver calculates CRC of data+CRC
# Should get constant value (CRC residue)
```

## Frame Delivery Types

### Unicast

Single sender to single receiver:
```
Source: AA:BB:CC:DD:EE:FF
Destination: 11:22:33:44:55:66

Only the destination device processes the frame
```

### Broadcast

Single sender to all devices on segment:
```
Destination: FF:FF:FF:FF:FF:FF

All devices on local network receive and process
Used for: ARP requests, DHCP discover, etc.
```

### Multicast

Single sender to group of devices:
```
Destination: 01:00:5E:xx:xx:xx (IPv4 multicast)
            33:33:xx:xx:xx:xx (IPv6 multicast)

Only devices subscribed to group process frame
Used for: Streaming, routing protocols
```

## Data Link Sublayers

IEEE 802 divides the Data Link layer into two sublayers:

```
+------------------------+
|    Network Layer       |
+------------------------+
        |
+------------------------+
|  LLC (Logical Link     |  ← Flow control, error handling
|       Control)         |     Protocol multiplexing
+------------------------+
|  MAC (Media Access     |  ← Physical addressing
|       Control)         |     Media access control
+------------------------+
        |
+------------------------+
|    Physical Layer      |
+------------------------+

LLC (802.2): Interface to Network layer
MAC (802.3, 802.11, etc.): Specific to medium type
```

## Key Takeaways

- Framing organizes bits into meaningful units with clear boundaries
- Common framing methods: byte stuffing, bit stuffing, length fields
- Ethernet frames include source/destination MACs, type/length, payload, and FCS
- Error detection catches transmission errors using parity, checksum, or CRC
- CRC-32 provides strong error detection for Ethernet
- Frame delivery can be unicast, broadcast, or multicast
- LLC provides network layer interface; MAC handles media access

Understanding framing and error detection is essential for analyzing network traffic and troubleshooting Data Link layer problems.
