# Signal Encoding and Modulation

## From Bits to Signals

Digital data exists as sequences of 0s and 1s in computer memory, but physical media transmit signals—variations in voltage, light intensity, or electromagnetic waves. Signal encoding defines how digital data is converted to physical signals for transmission and back again at the receiver.

The choice of encoding scheme affects bandwidth efficiency, error detection capability, and synchronization between sender and receiver. Understanding encoding helps in selecting appropriate technologies and troubleshooting transmission problems.

## Baseband vs Broadband

**Baseband transmission** uses the entire bandwidth of the medium for a single channel. Digital signals are sent directly without modulation. Ethernet uses baseband transmission.

**Broadband transmission** divides the bandwidth into multiple frequency channels, allowing multiple signals to share the same medium simultaneously. Cable TV and DSL use broadband techniques.

The term "broadband" in marketing often just means "high bandwidth," but technically it refers to this multi-channel approach.

## Digital Encoding Schemes

Digital encoding schemes represent binary data as discrete signal levels or transitions:

**Non-Return to Zero (NRZ)**:
- NRZ-L: 1 = high voltage, 0 = low voltage (or vice versa)
- Simple but has problems: long runs of 1s or 0s have no transitions, making synchronization difficult
- DC component can cause issues with some media

**Non-Return to Zero Inverted (NRZI)**:
- Transition (change) represents 1, no transition represents 0
- Solves the synchronization problem for long runs of 0s
- Still problematic for long runs of 1s

**Manchester Encoding**:
- Each bit has a transition in the middle of the bit period
- 0 = high-to-low transition, 1 = low-to-high (or vice versa)
- Self-clocking: receiver can extract timing from transitions
- Used in 10 Mbps Ethernet
- Disadvantage: requires twice the bandwidth (50% efficiency)

**Differential Manchester**:
- Transition at mid-bit always occurs
- Transition at start of bit period = 0, no transition = 1
- Used in Token Ring
- More resilient to signal polarity inversion

**4B/5B Encoding**:
- Maps each 4 bits of data to a 5-bit code
- Codes are chosen to ensure sufficient transitions
- 80% efficiency (better than Manchester's 50%)
- Used with NRZI in 100 Mbps Ethernet

**8B/10B Encoding**:
- Maps 8 data bits to 10 transmitted bits
- Ensures DC balance and sufficient transitions
- 80% efficiency
- Used in Gigabit Ethernet and Fibre Channel

## Line Coding Properties

Good encoding schemes have several desirable properties:

**Self-clocking**: The receiver can extract timing information from the signal itself, without a separate clock channel. Transitions in the signal help maintain synchronization.

**DC balance**: The average voltage should be zero over time. Some media (like transformers) cannot pass DC components.

**Error detection**: Some encoding schemes can detect certain transmission errors inherently.

**Bandwidth efficiency**: Maximizing data rate for a given signal rate.

**Low complexity**: Encoding and decoding should be simple to implement.

## Modulation Techniques

For broadband transmission and some wireless communications, digital data modulates a carrier signal. The carrier is a high-frequency sine wave, and data is encoded by varying its amplitude, frequency, or phase.

**Amplitude Shift Keying (ASK)**:
- Varies the amplitude (height) of the carrier
- 0 = low amplitude, 1 = high amplitude
- Simple but susceptible to noise

**Frequency Shift Keying (FSK)**:
- Varies the frequency of the carrier
- 0 = lower frequency, 1 = higher frequency
- More resilient to noise than ASK
- Used in early modems, Bluetooth

**Phase Shift Keying (PSK)**:
- Varies the phase of the carrier
- BPSK: Two phases (0°, 180°), 1 bit per symbol
- QPSK: Four phases (0°, 90°, 180°, 270°), 2 bits per symbol
- More efficient use of bandwidth

**Quadrature Amplitude Modulation (QAM)**:
- Combines amplitude and phase modulation
- 16-QAM: 16 different combinations, 4 bits per symbol
- 64-QAM: 64 combinations, 6 bits per symbol
- 256-QAM: 256 combinations, 8 bits per symbol
- Higher-order QAM requires better SNR

## Baud Rate vs Bit Rate

**Baud rate** measures signal changes per second (symbols per second).

**Bit rate** measures data transmitted per second.

If each symbol represents multiple bits, bit rate exceeds baud rate:
- Bit rate = Baud rate × bits per symbol

Example: 1000 baud with QPSK (2 bits/symbol) = 2000 bps

Modern high-speed systems use complex modulation to maximize bit rate while staying within bandwidth limits.

## Multiplexing

Multiple signals can share a single medium through multiplexing:

**Frequency Division Multiplexing (FDM)**:
- Different channels use different frequency bands
- Used in cable TV, radio broadcasting
- Requires guard bands between channels

**Time Division Multiplexing (TDM)**:
- Different channels take turns using the full bandwidth
- Synchronous TDM: fixed time slots
- Statistical TDM: slots allocated on demand
- Used in digital telephone systems

**Wavelength Division Multiplexing (WDM)**:
- FDM applied to fiber optics
- Different channels use different light wavelengths
- Dense WDM (DWDM): many closely spaced channels
- Enables enormous capacity in fiber networks

**Code Division Multiple Access (CDMA)**:
- Each channel has a unique code
- All channels transmit simultaneously on same frequency
- Receiver uses code to extract desired signal
- Used in cellular networks
