# Error Detection and Correction

## Why Errors Occur

Physical transmission is inherently imperfect. Electromagnetic interference, thermal noise, signal attenuation, and crosstalk can all corrupt data in transit. A single bit flip can change a 0 to a 1 or vice versa, potentially causing anything from minor data corruption to system crashes.

The data link layer provides mechanisms to detect—and sometimes correct—transmission errors. Understanding these mechanisms is crucial for building reliable networks and choosing appropriate protocols.

## Types of Errors

**Single-bit errors**: One bit is flipped. Relatively rare in modern networks with good shielding and encoding.

**Burst errors**: Multiple consecutive bits are corrupted. More common because noise events typically last longer than one bit period.

**Random errors**: Errors scattered throughout the data. Statistical error rate depends on link quality.

Error rates are typically expressed as Bit Error Rate (BER)—the probability that any given bit is corrupted. A BER of 10⁻⁶ means on average one bit in a million is wrong.

## Error Detection vs Correction

**Error detection** identifies that an error occurred but not which bits are wrong. The receiver can request retransmission.

**Error correction** (Forward Error Correction, FEC) includes enough redundant information to identify and fix errors without retransmission.

Tradeoffs:
- Detection: Less overhead, requires retransmission capability
- Correction: More overhead, works when retransmission is impractical (satellite, storage)

## Parity

**Simple parity** adds one bit to make the total number of 1s even (even parity) or odd (odd parity).

Example (even parity):
- Data: 1011010 → Parity bit: 0 → Transmitted: 10110100
- Data: 1011011 → Parity bit: 1 → Transmitted: 10110111

The receiver counts 1s. If the total isn't even, an error occurred.

**Limitations**:
- Detects single-bit errors
- Fails on even numbers of errors (two errors cancel out)
- Cannot identify which bit is wrong

**Two-dimensional parity** arranges data in a matrix with parity for rows and columns. Can detect more errors and even correct single-bit errors by identifying the row and column.

## Checksums

A **checksum** is computed from the data and transmitted alongside it. The receiver computes the checksum independently and compares.

**Internet Checksum** (used in IP, TCP, UDP):
1. Divide data into 16-bit words
2. Add all words using one's complement arithmetic
3. Take one's complement of the sum
4. Transmit result as checksum

```
Example:
Data words: 0xE34F, 0x2396, 0x4427
Sum: 0xE34F + 0x2396 + 0x4427 = 0x14B0C
Fold carry: 0x4B0C + 0x0001 = 0x4B0D
Checksum: ~0x4B0D = 0xB4F2
```

Receiver adds all words including checksum. Result should be 0xFFFF.

**Advantages**: Simple to compute, reasonable error detection
**Limitations**: Cannot detect all errors (swapped words, certain bit patterns)

## Cyclic Redundancy Check (CRC)

CRC provides much stronger error detection than simple checksums. It treats data as a large binary number, divides it by a predetermined polynomial, and uses the remainder as the check value.

**How CRC works**:
1. Append n zeros to data (n = degree of polynomial)
2. Divide by generator polynomial using XOR (no carries)
3. The n-bit remainder is the CRC
4. Replace the appended zeros with the CRC
5. Transmit data + CRC

**CRC-32** (used in Ethernet):
- Generator polynomial: 0x04C11DB7
- Detects all single-bit errors
- Detects all double-bit errors
- Detects any odd number of errors
- Detects all burst errors up to 32 bits
- High probability of detecting longer bursts

**CRC computation example** (simplified):
```
Data: 1101011011
Generator: 10011

1101011011 0000  (append 4 zeros for CRC-4)
÷ 10011
---------
Remainder: 1110

Transmit: 1101011011 1110
```

CRCs are implemented efficiently in hardware using shift registers.

## Forward Error Correction

FEC codes add enough redundancy to correct errors without retransmission.

**Hamming codes**:
- Add parity bits at power-of-2 positions
- Each parity bit checks specific data positions
- Can detect and correct single-bit errors
- Can detect (but not correct) double-bit errors
- Hamming distance determines error-correcting capability

**Block codes**:
- Divide data into blocks
- Add redundancy to each block
- Examples: Reed-Solomon codes (used in CDs, DVDs, QR codes)

**Convolutional codes**:
- Encode continuous streams
- Current output depends on current and previous inputs
- Decoded using Viterbi algorithm
- Used in deep-space communication, dial-up modems

**LDPC (Low-Density Parity-Check)**:
- Very efficient near-Shannon-limit codes
- Used in Wi-Fi, 5G, satellite communication

## Error Handling Strategies

Different layers handle errors differently:

**Data link layer**:
- Detects errors via CRC
- May discard corrupted frames silently
- May request retransmission (ARQ protocols)

**Transport layer (TCP)**:
- Checksum catches errors missed below
- Retransmits lost/corrupted segments
- Application sees error-free stream

**Application layer**:
- May add additional integrity checks
- Application-specific error handling

**ARQ (Automatic Repeat Request)**:
- Stop-and-Wait: Send one frame, wait for ACK
- Go-Back-N: Continue sending, retransmit from error
- Selective Repeat: Retransmit only errored frames

## Practical Considerations

**Choosing error handling approach**:
- High BER links: FEC or hybrid (FEC + ARQ)
- Low latency requirements: FEC (no retransmission delay)
- Variable conditions: Adaptive FEC

**Performance impact**:
- CRC computation adds processing overhead
- FEC reduces effective throughput (redundancy overhead)
- Retransmission adds latency

Modern networks achieve extremely low error rates after error detection/correction, typically better than 10⁻¹² BER for user data.
