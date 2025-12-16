# Physical Transmission Media

## Introduction to Physical Media

Physical transmission media form the foundation of all network communication. Whether data travels through copper wires, glass fibers, or air, the physical medium determines fundamental characteristics like bandwidth, distance limitations, and susceptibility to interference. Understanding physical media helps in designing, troubleshooting, and optimizing networks.

Media are classified as **guided** (data follows a physical path) or **unguided** (data radiates through space). Each type has distinct properties that make it suitable for different applications.

## Copper Wiring

Copper has been the dominant medium for local networking since the inception of computer networks. Its electrical conductivity allows signals to travel through wires, though resistance causes signal attenuation over distance.

**Twisted Pair Cable** is the most common network medium. Two insulated copper wires are twisted together to reduce electromagnetic interference (EMI). The twisting helps cancel out noise that affects both wires equally.

- **Unshielded Twisted Pair (UTP)**: No additional shielding, most common for LANs
- **Shielded Twisted Pair (STP)**: Metal shielding reduces interference, used in noisy environments

**UTP Categories:**
| Category | Bandwidth | Common Use |
|----------|-----------|------------|
| Cat 5 | 100 MHz | 100 Mbps Ethernet |
| Cat 5e | 100 MHz | 1 Gbps Ethernet |
| Cat 6 | 250 MHz | 1-10 Gbps Ethernet |
| Cat 6a | 500 MHz | 10 Gbps Ethernet |
| Cat 7 | 600 MHz | 10 Gbps+ with shielding |
| Cat 8 | 2000 MHz | 25-40 Gbps data centers |

Maximum segment length for twisted pair is typically 100 meters for Ethernet, limited by signal attenuation and timing constraints.

**Coaxial Cable** consists of a central copper conductor surrounded by insulation, a braided metal shield, and an outer jacket. The shielding provides excellent noise immunity.

- **Thicknet (10BASE5)**: Early Ethernet backbone, 500m segments
- **Thinnet (10BASE2)**: Cheaper, more flexible, 185m segments
- **Modern coax**: Used for cable TV/Internet, can carry high bandwidth

Coaxial cable is largely replaced by twisted pair in LANs but remains important for cable television and Internet service.

## Fiber Optic Cable

Fiber optic cables transmit data as pulses of light through glass or plastic fibers. Light travels through the fiber core via total internal reflection, bouncing off the cladding that surrounds the core.

**Advantages of fiber:**
- Very high bandwidth (terabits per second possible)
- Long distances (kilometers without amplification)
- Immune to electromagnetic interference
- Difficult to tap (more secure)
- Lightweight and thin

**Disadvantages:**
- More expensive than copper
- Requires specialized equipment for termination
- More fragile (can break if bent sharply)
- Cannot carry electrical power

**Types of fiber:**
- **Single-mode**: Very narrow core (8-10 microns), light travels in single path, longer distances (up to 100 km), more expensive equipment
- **Multi-mode**: Wider core (50-62.5 microns), light bounces at multiple angles, shorter distances (up to 2 km), cheaper equipment

Fiber is essential for long-haul networks, data center interconnects, and backbone infrastructure. As bandwidth demands increase, fiber is increasingly used for building wiring as well.

## Wireless Media

Wireless communication uses electromagnetic radiation through the atmosphere or space. Different frequencies have different properties regarding range, bandwidth, and obstacle penetration.

**Radio Frequency (RF):**
- Omnidirectional propagation
- Penetrates walls and obstacles
- Subject to interference and eavesdropping
- Licensed and unlicensed spectrum available

**Wi-Fi frequencies:**
- 2.4 GHz: Better range, penetrates walls, more interference (crowded spectrum)
- 5 GHz: Higher bandwidth, less interference, shorter range
- 6 GHz: Wi-Fi 6E, even higher bandwidth, minimal congestion

**Microwave:**
- Line-of-sight required
- High bandwidth possible
- Used for point-to-point links and satellite

**Infrared:**
- Very short range
- Cannot penetrate walls (good for security)
- Used for remote controls, some short-range data

**Cellular networks:**
- Licensed spectrum managed by carriers
- Generations (2G, 3G, 4G LTE, 5G) offer increasing bandwidth
- Wide area coverage through cell tower networks

## Signal Propagation

Understanding how signals propagate helps in network design and troubleshooting:

**Attenuation**: Signal strength decreases with distance. All media experience attenuation, requiring repeaters or amplifiers for long distances.

**Distortion**: Different frequency components may travel at different speeds, causing signal distortion. Equalization techniques compensate for this.

**Noise**: Unwanted signals interfere with the intended signal. Sources include electromagnetic interference (EMI), radio frequency interference (RFI), crosstalk from adjacent wires, and thermal noise in components.

**Signal-to-Noise Ratio (SNR)**: The ratio of signal strength to noise strength, usually measured in decibels. Higher SNR means cleaner signals and lower error rates.

**Bandwidth and Data Rate**: Bandwidth (in Hz) limits how fast data can be transmitted. Shannon's theorem provides the theoretical maximum: C = B × log₂(1 + SNR), where C is capacity in bps and B is bandwidth in Hz.

## Choosing Physical Media

Selecting the right medium involves tradeoffs:

**Cost**: Initial installation and long-term maintenance
**Bandwidth**: Current and future capacity needs
**Distance**: How far signals must travel
**Environment**: Indoor/outdoor, EMI sources, physical obstacles
**Security**: Susceptibility to eavesdropping
**Flexibility**: Ease of adding/moving connections

For most LANs, Category 6 or 6a UTP provides good bandwidth at reasonable cost. Fiber is used for backbone connections, long distances, and high-bandwidth requirements. Wireless provides convenience and mobility but with lower bandwidth and security concerns.
