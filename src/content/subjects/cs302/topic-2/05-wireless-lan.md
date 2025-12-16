# Wireless LAN (Wi-Fi)

Wireless Local Area Networks (WLANs) provide network connectivity without physical cables, enabling mobility and flexible deployment. Based on IEEE 802.11 standards and commonly branded as **Wi-Fi**, wireless networking has become ubiquitous in homes, offices, and public spaces.

## Wi-Fi Standards Evolution

```
802.11 Standard Evolution:

Standard    Year  Band        Max Speed    Name
-------------------------------------------------------
802.11      1997  2.4 GHz     2 Mbps       (Legacy)
802.11b     1999  2.4 GHz     11 Mbps      (Legacy)
802.11a     1999  5 GHz       54 Mbps      (Legacy)
802.11g     2003  2.4 GHz     54 Mbps      (Legacy)
802.11n     2009  2.4/5 GHz   600 Mbps     Wi-Fi 4
802.11ac    2013  5 GHz       6.93 Gbps    Wi-Fi 5
802.11ax    2019  2.4/5/6 GHz 9.6 Gbps     Wi-Fi 6/6E
802.11be    2024  2.4/5/6 GHz 46 Gbps      Wi-Fi 7
```

## Wi-Fi Architecture

### Infrastructure Mode

Most common configuration with Access Points:

```
Infrastructure Mode:

    [Internet]
        |
    [Router]
        |
    [Access Point]
      /  |  \
     /   |   \
  [Client 1] [Client 2] [Client 3]

BSS (Basic Service Set):
- AP and associated clients
- Identified by BSSID (AP's MAC)

ESS (Extended Service Set):
- Multiple APs with same SSID
- Enables roaming between APs
```

### Ad-Hoc Mode (IBSS)

Peer-to-peer without Access Point:

```
Ad-Hoc Mode:

  [Device A] <---> [Device B]
       \           /
        \         /
         [Device C]

IBSS (Independent Basic Service Set)
- Direct device-to-device communication
- No central coordination
- Less common today
```

## Wi-Fi Frame Types

```
Frame Types:

1. Management Frames:
   - Beacon: AP announces presence
   - Probe Request/Response: Client discovery
   - Authentication: Identity verification
   - Association Request/Response: Join network
   - Deauthentication: Disconnect

2. Control Frames:
   - RTS (Request to Send)
   - CTS (Clear to Send)
   - ACK (Acknowledgment)

3. Data Frames:
   - Carry actual payload
   - Can be encrypted
```

### 802.11 Frame Format

```
+---------+----------+----------+----------+----------+------+-----+
| Frame   | Duration | Address  | Address  | Address  | Seq  | ... |
| Control |    ID    |    1     |    2     |    3     | Ctrl |     |
| 2 bytes | 2 bytes  | 6 bytes  | 6 bytes  | 6 bytes  | 2b   |     |
+---------+----------+----------+----------+----------+------+-----+
                     |
                     v
+----------+----------+---------+----------+-----+
| Address  | QoS Ctrl |  Data   |   FCS    |
|    4     | (if QoS) |         | 4 bytes  |
| 6 bytes  | 2 bytes  |         |          |
+----------+----------+---------+----------+

Address field meanings depend on To DS and From DS bits:
To DS | From DS | Addr1    | Addr2  | Addr3     | Addr4
------|---------|----------|--------|-----------|-------
  0   |    0    | DA       | SA     | BSSID     | N/A
  0   |    1    | DA       | BSSID  | SA        | N/A
  1   |    0    | BSSID    | SA     | DA        | N/A
  1   |    1    | RA       | TA     | DA        | SA
```

## CSMA/CA Operation

Wi-Fi uses CSMA/CA (Collision Avoidance) since wireless stations cannot detect collisions while transmitting:

```
Basic CSMA/CA:

1. Sense channel
2. If idle for DIFS:
   - Transmit immediately
3. If busy:
   - Wait until idle
   - Wait DIFS
   - Random backoff (contention window)
   - Transmit when backoff reaches 0
4. Wait for ACK
5. If no ACK, double backoff window, retry

Timeline:
        DIFS     Backoff    Frame      SIFS  ACK
[Busy]--|--------|=====|----[DATA]----|---|-[ACK]---|
```

### RTS/CTS Mechanism

Solves the **hidden terminal problem**:

```
Hidden Terminal Problem:

    [A] <-----> [B] <-----> [C]

A cannot hear C. Both might transmit to B simultaneously.

RTS/CTS Solution:

A: [RTS to B]
B:            [CTS to A]  (C hears this, defers)
A:                        [DATA]
B:                                   [ACK]
```

```python
import random
import time

class WiFiStation:
    def __init__(self, name):
        self.name = name
        self.cw_min = 15      # Minimum contention window
        self.cw_max = 1023    # Maximum contention window
        self.cw = self.cw_min # Current contention window

    def csma_ca_transmit(self, channel):
        """Simulate CSMA/CA transmission."""
        # DIFS wait
        difs_slots = 2
        print(f"{self.name}: Waiting DIFS ({difs_slots} slots)")

        # Check channel during DIFS
        if channel.is_busy():
            # Channel busy, start backoff
            backoff = random.randint(0, self.cw)
            print(f"{self.name}: Channel busy, backoff = {backoff}")

            while backoff > 0:
                if not channel.is_busy():
                    backoff -= 1
                # Freeze backoff while busy
                time.sleep(0.001)  # One slot

        # Transmit
        print(f"{self.name}: Transmitting")
        success = channel.transmit()

        if success:
            self.cw = self.cw_min  # Reset on success
        else:
            # Collision: double contention window
            self.cw = min(self.cw * 2, self.cw_max)
            print(f"{self.name}: Collision, new CW = {self.cw}")

        return success
```

## Wi-Fi Security

### Security Evolution

```
WEP (Wired Equivalent Privacy) - BROKEN
- 64/128-bit keys
- RC4 encryption
- Vulnerable to IV attacks
- DO NOT USE

WPA (Wi-Fi Protected Access)
- TKIP encryption (RC4-based)
- Per-packet key mixing
- Message integrity check
- Deprecated

WPA2 (2004)
- CCMP encryption (AES-based)
- Robust security
- Pre-shared key (PSK) or Enterprise (802.1X)
- Still widely used

WPA3 (2018)
- SAE (Simultaneous Authentication of Equals)
- Protected Management Frames
- 192-bit security suite (Enterprise)
- Forward secrecy
- Recommended
```

### WPA2-Personal vs Enterprise

```
WPA2-Personal (PSK):
- Single shared password
- All users have same key
- Suitable for home/small office

        [Client] ---(PSK)---> [AP]

WPA2-Enterprise (802.1X):
- Individual credentials
- RADIUS authentication server
- Per-user/per-session keys
- Suitable for organizations

        [Client] <--EAP--> [AP] <--RADIUS--> [Auth Server]
```

## Wi-Fi Performance Factors

### Channel Width

```
Channel Widths:
- 20 MHz: Standard, more channels available
- 40 MHz: Double throughput, fewer channels
- 80 MHz: Wi-Fi 5+, high throughput
- 160 MHz: Wi-Fi 6+, maximum throughput

Wider channels = More throughput but more interference
```

### MIMO (Multiple Input Multiple Output)

```
MIMO uses multiple antennas for parallel data streams:

Single antenna (SISO):     [TX] --------> [RX]

2x2 MIMO:                  [TX]--/    \--[RX]
                                \/  /\
                                /\  \/
                           [TX]--\    /--[RX]

4x4 MIMO (Wi-Fi 6):
- 4 spatial streams
- Up to 4x throughput
- Better range through beamforming
```

### 2.4 GHz vs 5 GHz vs 6 GHz

```
Band Comparison:

2.4 GHz:
+ Better range/penetration
+ Compatible with all devices
- Only 3 non-overlapping channels
- Crowded (microwaves, Bluetooth, neighbors)

5 GHz:
+ More channels (25 non-overlapping)
+ Less interference
+ Higher speeds
- Shorter range
- Blocked by walls more easily

6 GHz (Wi-Fi 6E):
+ 1200 MHz of clean spectrum
+ 59 new channels
+ No legacy device interference
- Shortest range
- Requires Wi-Fi 6E devices
```

## Key Takeaways

- Wi-Fi (802.11) provides wireless LAN connectivity
- Standards evolve from 11b (11 Mbps) to Wi-Fi 7 (46 Gbps)
- Infrastructure mode (with AP) dominates deployments
- CSMA/CA with RTS/CTS handles collision avoidance
- WPA3 is the current security standard; WEP/WPA are deprecated
- Performance depends on channel width, MIMO, and frequency band
- 5 GHz and 6 GHz offer more channels and less interference

Understanding Wi-Fi technology helps you design, deploy, and troubleshoot wireless networks effectively.
