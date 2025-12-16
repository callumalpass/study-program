# Physical Layer Overview

The Physical layer is the foundation of all network communication—it handles the actual transmission of raw bits over a communication channel. Without the Physical layer, digital data would have no way to travel between devices. Understanding this layer helps you troubleshoot connectivity issues, select appropriate cabling, and optimize network performance.

## Physical Layer Functions

The Physical layer is responsible for:

1. **Bit transmission**: Converting data into signals
2. **Physical characteristics**: Defining connectors, cables, voltages
3. **Encoding**: How bits are represented as signals
4. **Transmission mode**: Direction of data flow
5. **Synchronization**: Keeping sender and receiver in sync
6. **Topology**: Physical arrangement of devices

```
Physical Layer Responsibilities:

    [Data: 10110010]
           |
           v
    +----------------+
    | Encoding       | → Convert bits to signal pattern
    +----------------+
           |
           v
    +----------------+
    | Signal         | → Electrical, optical, or radio
    | Generation     |
    +----------------+
           |
           v
    +----------------+
    | Transmission   | → Send over medium
    | Medium         |
    +----------------+
           |
           v
    [Physical Signal traveling through cable/air]
```

## Transmission Media

### Guided Media (Wired)

**Twisted Pair Cable**: Most common LAN cabling

```
Categories:
Cat 5e  - 1 Gbps, 100m max, older standard
Cat 6   - 1-10 Gbps, 55m at 10G
Cat 6a  - 10 Gbps, 100m
Cat 7   - 10 Gbps, shielded
Cat 8   - 40 Gbps, data centers

Structure:
+------------------+
|  Outer Jacket    |
|   +----------+   |
|   | Pair 1   |   |  Four twisted pairs
|   | Pair 2   |   |  (8 wires total)
|   | Pair 3   |   |
|   | Pair 4   |   |
|   +----------+   |
+------------------+

Connectors: RJ-45 (8P8C)
```

**Coaxial Cable**: Used for cable TV, older networks

```
Structure:
     +---+---+---+---+
     |   |   |   |   |
Core--+   +---+   +---Outer Jacket
      Insulator  Shield

Types:
- RG-6: Cable TV, satellite
- RG-59: Older CCTV, legacy
```

**Fiber Optic**: Highest bandwidth, longest distance

```
Types:
Single-mode (SMF): Long distance (up to 100km)
  - Smaller core (9 μm)
  - Laser transmission
  - Used for WAN, backbone

Multi-mode (MMF): Short distance (up to 2km)
  - Larger core (50/62.5 μm)
  - LED or laser
  - Used for LAN, data centers

Structure:
    +---------------------+
    | Jacket              |
    |  +---------------+  |
    |  | Cladding      |  |
    |  |  +---------+  |  |
    |  |  | Core    |  |  | ← Light travels here
    |  |  +---------+  |  |
    |  +---------------+  |
    +---------------------+
```

### Unguided Media (Wireless)

**Radio Frequencies (RF)**:
- Wi-Fi: 2.4 GHz, 5 GHz, 6 GHz bands
- Bluetooth: 2.4 GHz
- Cellular: Various licensed bands

**Microwave**: Point-to-point links, line-of-sight

**Infrared**: Short range, line-of-sight (remote controls)

**Satellite**: Global coverage, high latency

## Signal Types

### Analog vs Digital Signals

```
Analog Signal (continuous):
    ╱╲    ╱╲    ╱╲
   ╱  ╲  ╱  ╲  ╱  ╲
  ╱    ╲╱    ╲╱    ╲

Digital Signal (discrete):
   ┌──┐  ┌──┐     ┌──┐
   │  │  │  │     │  │
───┘  └──┘  └─────┘  └──

Comparison:
| Aspect    | Analog           | Digital         |
|-----------|------------------|-----------------|
| Values    | Infinite range   | Discrete (0,1)  |
| Noise     | Accumulates      | Can regenerate  |
| Bandwidth | Efficient        | Requires more   |
| Equipment | Simpler          | More complex    |
```

### Signal Characteristics

```python
# Signal properties
class Signal:
    def __init__(self, amplitude, frequency, phase):
        self.amplitude = amplitude   # Signal strength (volts)
        self.frequency = frequency   # Cycles per second (Hz)
        self.phase = phase           # Position in cycle (degrees)

    @property
    def wavelength(self):
        """Calculate wavelength in meters."""
        speed_of_light = 3e8  # m/s
        return speed_of_light / self.frequency

    @property
    def period(self):
        """Calculate time for one cycle."""
        return 1 / self.frequency

# Example: FM radio signal
fm_signal = Signal(amplitude=1, frequency=100e6, phase=0)
print(f"FM wavelength: {fm_signal.wavelength:.2f} m")
print(f"Period: {fm_signal.period * 1e9:.2f} ns")
```

## Encoding Schemes

Encoding defines how binary data is represented as physical signals:

### Line Coding (Baseband)

```
NRZ (Non-Return to Zero):
Data:   1  0  1  1  0  0  1
Signal: ─┐  ┌──┐  ┌────┐  ┌─
        │  │  │  │    │  │
        └──┘  └──┘    └──┘
Problem: Long runs of same bit lose synchronization

Manchester Encoding:
Data:     1    0    1    1    0    0    1
Signal: ┌─┐  ┌─┐  ┌─┐  ┌─┐  ┌─┐  ┌─┐  ┌─┐
        │↓│  │↑│  │↓│  │↓│  │↑│  │↑│  │↓│
        └─┘  └─┘  └─┘  └─┘  └─┘  └─┘  └─┘
1 = High-to-low transition
0 = Low-to-high transition
Used in: 10BASE-T Ethernet

4B/5B Encoding:
- Every 4 data bits encoded as 5 signal bits
- Ensures enough transitions for sync
- Used with NRZI for 100BASE-TX
```

### Modulation (Broadband)

Modulation encodes data onto a carrier wave:

```
Amplitude Modulation (AM):
Carrier: ∿∿∿∿∿∿∿∿
Data:    1  0  1
Result:  ∿∿ ∿ ∿∿  (amplitude varies)

Frequency Modulation (FM):
Carrier: ∿∿∿∿∿∿∿∿
Data:    1  0  1
Result:  ∿∿ ~~~ ∿∿ (frequency varies)

Phase Modulation (PM):
Carrier: ∿∿∿∿∿∿∿∿
Data:    1  0  1
Result:  ∿∿ ∿̃∿̃ ∿∿ (phase shifts)

QAM (Quadrature Amplitude Modulation):
- Combines AM and PM
- Multiple bits per symbol
- Used in Wi-Fi, cable modems
- QAM-256 = 8 bits per symbol
```

## Transmission Modes

```
Simplex:        One direction only
                A ──────────→ B
                Example: Broadcast TV

Half-Duplex:    Both directions, not simultaneously
                A ←───────── B
                A ───────── → B
                Example: Walkie-talkie

Full-Duplex:    Both directions simultaneously
                A ←──────────→ B
                Example: Telephone, modern Ethernet
```

## Bandwidth and Data Rate

```
Bandwidth: Range of frequencies a channel can carry
           Measured in Hertz (Hz)

Data Rate (Throughput): Actual bits transmitted per second
           Measured in bps (bits per second)

Relationship (Nyquist for noiseless channel):
  Max Data Rate = 2 × Bandwidth × log₂(L)
  Where L = number of signal levels

Shannon Capacity (with noise):
  Max Data Rate = Bandwidth × log₂(1 + SNR)
  Where SNR = Signal-to-Noise Ratio
```

```python
import math

def nyquist_rate(bandwidth, signal_levels):
    """Calculate max data rate for noiseless channel."""
    return 2 * bandwidth * math.log2(signal_levels)

def shannon_capacity(bandwidth, snr_db):
    """Calculate max data rate with noise."""
    snr_linear = 10 ** (snr_db / 10)
    return bandwidth * math.log2(1 + snr_linear)

# Example: Telephone line
bw = 3100  # Hz (300-3400 Hz voice band)
print(f"Nyquist (2 levels): {nyquist_rate(bw, 2):.0f} bps")
print(f"Shannon (30dB SNR): {shannon_capacity(bw, 30):.0f} bps")
```

## Physical Layer Standards

| Technology | Standard | Speed | Medium |
|------------|----------|-------|--------|
| 10BASE-T | 802.3 | 10 Mbps | Cat 3 UTP |
| 100BASE-TX | 802.3u | 100 Mbps | Cat 5 UTP |
| 1000BASE-T | 802.3ab | 1 Gbps | Cat 5e UTP |
| 10GBASE-T | 802.3an | 10 Gbps | Cat 6a UTP |
| 1000BASE-SX | 802.3z | 1 Gbps | MMF |
| 10GBASE-LR | 802.3ae | 10 Gbps | SMF |

## Key Takeaways

- Physical layer converts bits to signals for transmission
- Transmission media includes copper, fiber, and wireless
- Encoding schemes determine how bits become signals
- Bandwidth limits data rate (Nyquist, Shannon)
- Full-duplex allows simultaneous bidirectional communication
- Different standards optimize for speed, distance, and cost
- Cable selection affects maximum speed and distance

Understanding the Physical layer helps you select appropriate infrastructure and troubleshoot connectivity problems at their most fundamental level.
