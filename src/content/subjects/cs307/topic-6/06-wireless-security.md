# Wireless Security

Wireless networks introduce unique security challenges due to the broadcast nature of radio signals. This subtopic covers WPA3, rogue access points, and wireless-specific threats and defenses.

## Wireless Security Protocols

### Protocol Evolution

```
Wireless Security Evolution:

┌─────────────────────────────────────────────┐
│ WEP (Wired Equivalent Privacy)              │
│ Status: BROKEN - Do not use                 │
│ - RC4 encryption                            │
│ - 40-bit or 104-bit keys                    │
│ - Crackable in minutes                      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ WPA (Wi-Fi Protected Access)                │
│ Status: DEPRECATED                          │
│ - TKIP encryption                           │
│ - Temporary fix for WEP                     │
│ - Vulnerable to attacks                     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ WPA2 (802.11i)                              │
│ Status: SECURE (but aging)                  │
│ - AES-CCMP encryption                       │
│ - Strong security                           │
│ - Vulnerable to KRACK attack                │
│ - No forward secrecy                        │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ WPA3 (Latest)                               │
│ Status: RECOMMENDED                         │
│ - AES-GCMP encryption                       │
│ - SAE (Simultaneous Authentication)         │
│ - Forward secrecy                           │
│ - Protection against offline attacks        │
│ - Required for Wi-Fi 6                      │
└─────────────────────────────────────────────┘
```

## WPA3 Security Features

### WPA3-Personal (SAE)

```python
from typing import Dict
import hashlib
import hmac

class WPA3Security:
    """WPA3 security features and configuration"""

    @staticmethod
    def explain_sae():
        """Explain Simultaneous Authentication of Equals"""
        return """
        SAE (Dragonfly Key Exchange):

        Advantages over WPA2 PSK:
        1. Password-to-key derivation
           - Uses password + MAC addresses
           - Resistant to offline dictionary attacks
           - Even with captured handshake

        2. Forward Secrecy
           - Each session uses unique keys
           - Compromise of one session doesn't affect others

        3. Protection against attacks
           - KRACK protection (key reinstallation)
           - Dictionary attack protection
           - Downgrade attack protection

        Process:
        1. Commit phase: Exchange commitments
        2. Confirm phase: Verify commitments
        3. Key derivation: Generate unique session keys
        """

    @staticmethod
    def wpa3_features():
        """WPA3 security features"""
        return {
            'wpa3_personal': {
                'authentication': 'SAE (Simultaneous Authentication of Equals)',
                'encryption': 'AES-GCMP-256',
                'key_derivation': 'Password + MAC addresses',
                'forward_secrecy': True,
                'offline_attack_protection': True,
                'minimum_password_length': 8
            },
            'wpa3_enterprise': {
                'authentication': '802.1X with 192-bit security',
                'encryption': 'AES-GCMP-256',
                'key_size': 'minimum 256-bit',
                'certificate': 'Required',
                'management_frame_protection': 'Required'
            },
            'enhanced_open': {
                'name': 'OWE (Opportunistic Wireless Encryption)',
                'use_case': 'Public Wi-Fi',
                'encryption': 'Per-device encryption',
                'authentication': 'None (encryption without auth)',
                'prevents': 'Passive eavesdropping'
            }
        }

    @staticmethod
    def configure_wpa3_personal():
        """WPA3-Personal configuration example"""
        return {
            'ssid': 'SecureNetwork',
            'security': 'WPA3-Personal',
            'passphrase': 'StrongPassword123!',  # Min 8 chars
            'encryption': 'AES-GCMP-256',
            'management_frame_protection': 'Required',
            'pmf': 'required',  # Protected Management Frames
            'transition_mode': False,  # Pure WPA3, no WPA2 fallback
            'sae_groups': [19, 20, 21],  # Elliptic curve groups
            'sae_require_mfp': True
        }

    @staticmethod
    def security_comparison():
        """Compare wireless security protocols"""
        return """
        Security Comparison:

        Feature                WEP    WPA    WPA2   WPA3
        ────────────────────────────────────────────────
        Encryption             RC4    TKIP   CCMP   GCMP
        Key Size (bits)        40-104 128    128    256
        IV Size (bits)         24     48     48     128
        Integrity Check        CRC32  MIC    CCMP   GCMP
        Forward Secrecy        No     No     No     Yes
        Offline Attack Protect No     No     No     Yes
        KRACK Protection       No     No     No     Yes
        PMF Required           No     No     Opt    Yes
        Secure                 ✗      ✗      ✓      ✓✓
        """
```

## Rogue Access Points

### Detection and Prevention

```python
import time
from typing import List, Dict
from dataclasses import dataclass

@dataclass
class AccessPoint:
    """Access point information"""
    bssid: str  # MAC address
    ssid: str
    channel: int
    signal_strength: int
    encryption: str
    vendor: str

class RogueAPDetection:
    """Detect and prevent rogue access points"""

    def __init__(self):
        self.authorized_aps = {}
        self.detected_aps = {}
        self.rogue_aps = []

    def register_authorized_ap(self, bssid: str, ssid: str):
        """Register authorized access point"""
        self.authorized_aps[bssid] = {
            'ssid': ssid,
            'registered_at': time.time()
        }

    def detect_rogue_aps(self, scanned_aps: List[AccessPoint]) -> List[Dict]:
        """Detect rogue access points"""
        rogues = []

        for ap in scanned_aps:
            # Check if AP is authorized
            if ap.bssid not in self.authorized_aps:
                # Check for evil twin (same SSID, different BSSID)
                if self._is_evil_twin(ap):
                    rogues.append({
                        'type': 'evil_twin',
                        'bssid': ap.bssid,
                        'ssid': ap.ssid,
                        'channel': ap.channel,
                        'severity': 'HIGH',
                        'description': 'Impersonating authorized network'
                    })

                # Check for honeypot (common SSID)
                elif self._is_honeypot(ap):
                    rogues.append({
                        'type': 'honeypot',
                        'bssid': ap.bssid,
                        'ssid': ap.ssid,
                        'channel': ap.channel,
                        'severity': 'MEDIUM',
                        'description': 'Suspicious common SSID'
                    })

                # Unknown AP in range
                else:
                    rogues.append({
                        'type': 'unknown',
                        'bssid': ap.bssid,
                        'ssid': ap.ssid,
                        'channel': ap.channel,
                        'severity': 'LOW',
                        'description': 'Unauthorized AP detected'
                    })

        self.rogue_aps.extend(rogues)
        return rogues

    def _is_evil_twin(self, ap: AccessPoint) -> bool:
        """Check if AP is evil twin attack"""
        # Same SSID as authorized but different BSSID
        for auth_bssid, auth_info in self.authorized_aps.items():
            if ap.ssid == auth_info['ssid'] and ap.bssid != auth_bssid:
                return True
        return False

    def _is_honeypot(self, ap: AccessPoint) -> bool:
        """Check for honeypot/suspicious SSIDs"""
        honeypot_ssids = [
            'Free WiFi',
            'Free Internet',
            'Public WiFi',
            'Guest',
            'Airport WiFi',
            'Hotel WiFi'
        ]
        return ap.ssid in honeypot_ssids

    def block_rogue_ap(self, bssid: str):
        """Block rogue access point"""
        # In production: Send deauth frames or use WIPS
        print(f"[WIPS] Blocking rogue AP: {bssid}")

    @staticmethod
    def mitigation_strategies():
        """Rogue AP mitigation strategies"""
        return {
            'detection': [
                'Regular wireless surveys',
                'Wireless Intrusion Prevention System (WIPS)',
                '24/7 monitoring',
                'Anomaly detection',
                'MAC address tracking'
            ],
            'prevention': [
                'Strong WPA3 authentication',
                'Client isolation',
                'Hidden SSID (defense in depth only)',
                'MAC filtering (not sole protection)',
                'User education'
            ],
            'response': [
                'Automatic deauthentication',
                'Alert security team',
                'Physical location tracking',
                'Block rogue AP',
                'Investigate source'
            ]
        }
```

## Wireless Attacks and Defenses

### Common Wireless Attacks

```python
class WirelessAttacks:
    """Understanding wireless attacks for defense"""

    @staticmethod
    def explain_attacks():
        """Explain wireless attack types"""
        return {
            'deauthentication_attack': {
                'description': 'Send deauth frames to disconnect clients',
                'purpose': 'Capture WPA handshake, DoS',
                'defense': [
                    'WPA3 (protected management frames)',
                    'PMF in WPA2',
                    'WIPS detection',
                    'Monitor for excessive deauth frames'
                ]
            },
            'evil_twin': {
                'description': 'Fake AP with same SSID',
                'purpose': 'MITM, credential theft',
                'defense': [
                    'Certificate validation (WPA3-Enterprise)',
                    'User training',
                    'Rogue AP detection',
                    'Use VPN on untrusted networks'
                ]
            },
            'wps_attack': {
                'description': 'Brute force WPS PIN',
                'purpose': 'Gain network access',
                'defense': [
                    'Disable WPS',
                    'WPS with rate limiting (if needed)',
                    'Monitor WPS attempts'
                ]
            },
            'krack_attack': {
                'description': 'Key reinstallation attack on WPA2',
                'purpose': 'Decrypt traffic, inject packets',
                'defense': [
                    'Update clients to patched version',
                    'Upgrade to WPA3',
                    'Use additional encryption (VPN, TLS)'
                ]
            },
            'packet_sniffing': {
                'description': 'Capture wireless traffic',
                'purpose': 'Eavesdropping, credential theft',
                'defense': [
                    'WPA3 encryption',
                    'TLS for all traffic',
                    'VPN on untrusted networks',
                    'Avoid unencrypted protocols'
                ]
            }
        }

    @staticmethod
    def wireless_security_assessment():
        """Wireless security assessment checklist"""
        return {
            'access_points': [
                'WPA3 enabled (or WPA2 with PMF)',
                'Strong passphrases (20+ characters)',
                'WPS disabled',
                'Firmware up to date',
                'Default credentials changed',
                'Remote management disabled',
                'Guest network isolated'
            ],
            'network_configuration': [
                'Separate SSIDs for different purposes',
                'Client isolation enabled',
                'VLAN segmentation',
                'Rate limiting configured',
                'Broadcast SSID (hiding provides minimal security)',
                'MAC filtering (additional layer only)'
            ],
            'monitoring': [
                'WIPS deployed',
                'Regular wireless surveys',
                'Rogue AP detection',
                'Client association monitoring',
                'Unusual traffic patterns'
            ],
            'clients': [
                'Auto-connect disabled for unknown networks',
                'Verify network authenticity',
                'Use VPN on public WiFi',
                'Keep devices updated',
                'Disable WiFi when not needed'
            ]
        }
```

## Enterprise Wireless Security

### WPA3-Enterprise

```python
class EnterpriseWirelessSecurity:
    """Enterprise wireless security with 802.1X"""

    @staticmethod
    def explain_802_1x():
        """Explain 802.1X authentication"""
        return """
        802.1X (Port-Based Access Control):

        Components:
        ┌────────────┐       ┌─────────────┐       ┌─────────────┐
        │ Supplicant │←─────→│ Authenticator│←─────→│   RADIUS    │
        │  (Client)  │  EAPOL │    (AP)     │ RADIUS │   Server    │
        └────────────┘       └─────────────┘       └─────────────┘

        Flow:
        1. Client associates with AP
        2. AP blocks traffic (except 802.1X)
        3. Client sends EAP identity
        4. AP forwards to RADIUS server
        5. RADIUS challenges client
        6. Client provides credentials/certificate
        7. RADIUS validates and sends keys to AP
        8. AP opens port for client traffic

        EAP Methods:
        - EAP-TLS: Certificate-based (most secure)
        - EAP-TTLS: Tunneled TLS
        - PEAP: Protected EAP
        - EAP-PWD: Password-based
        """

    @staticmethod
    def configure_wpa3_enterprise():
        """WPA3-Enterprise configuration"""
        return {
            'ssid': 'CorpSecure',
            'security': 'WPA3-Enterprise',
            'authentication': '802.1X',
            'eap_method': 'EAP-TLS',
            'encryption': 'AES-GCMP-256',
            'radius_server': '10.0.1.100',
            'radius_port': 1812,
            'radius_secret': 'SharedSecret123',
            'accounting_enabled': True,
            'pmf': 'required',
            'minimum_key_size': 256,
            'certificate_validation': 'Required',
            'user_isolation': True,
            'dynamic_vlan': True
        }

    @staticmethod
    def certificate_requirements():
        """Certificate requirements for EAP-TLS"""
        return {
            'server_certificate': {
                'type': 'X.509',
                'key_size': '2048-bit RSA or 256-bit ECC',
                'signature': 'SHA-256 or better',
                'san': 'RADIUS server FQDN',
                'validation': 'Required by clients'
            },
            'client_certificate': {
                'type': 'X.509',
                'issued_by': 'Trusted CA',
                'key_storage': 'Secure (TPM preferred)',
                'revocation': 'CRL or OCSP',
                'renewal': 'Automated'
            },
            'ca_certificate': {
                'distribution': 'Pre-installed on clients',
                'validation': 'Chain of trust',
                'revocation_checking': 'Enabled'
            }
        }
```

## Wireless Monitoring and IDS

```python
class WirelessIDS:
    """Wireless Intrusion Detection System"""

    def __init__(self):
        self.baseline_aps = {}
        self.alerts = []

    def monitor_wireless_environment(self, scan_results: List[AccessPoint]):
        """Monitor for wireless security issues"""
        for ap in scan_results:
            # Check for weak encryption
            if self._has_weak_encryption(ap):
                self._create_alert('WEAK_ENCRYPTION', ap, 'HIGH')

            # Check for hidden SSID with weak security
            if ap.ssid == '' and ap.encryption == 'OPEN':
                self._create_alert('HIDDEN_OPEN_NETWORK', ap, 'MEDIUM')

            # Check for unusual channel usage
            if self._is_unusual_channel(ap):
                self._create_alert('UNUSUAL_CHANNEL', ap, 'LOW')

            # Check for signal strength anomaly
            if self._is_signal_anomaly(ap):
                self._create_alert('SIGNAL_ANOMALY', ap, 'MEDIUM')

    def _has_weak_encryption(self, ap: AccessPoint) -> bool:
        """Check for weak/no encryption"""
        weak_encryption = ['OPEN', 'WEP', 'WPA']
        return ap.encryption in weak_encryption

    def _is_unusual_channel(self, ap: AccessPoint) -> bool:
        """Check for unusual channel (potential attack)"""
        # Normal 2.4GHz channels: 1, 6, 11
        # Normal 5GHz channels: 36, 40, 44, 48, 149, 153, 157, 161
        normal_channels = [1, 6, 11, 36, 40, 44, 48, 149, 153, 157, 161]
        return ap.channel not in normal_channels

    def _is_signal_anomaly(self, ap: AccessPoint) -> bool:
        """Detect signal strength anomalies"""
        if ap.bssid in self.baseline_aps:
            baseline_signal = self.baseline_aps[ap.bssid]['signal']
            # Alert if signal suddenly much stronger (possible attack)
            if ap.signal_strength > baseline_signal + 20:
                return True
        return False

    def _create_alert(self, alert_type: str, ap: AccessPoint, severity: str):
        """Create security alert"""
        self.alerts.append({
            'type': alert_type,
            'bssid': ap.bssid,
            'ssid': ap.ssid,
            'severity': severity,
            'timestamp': time.time()
        })
```

## Summary

Wireless security requires multiple layers of protection:

- **WPA3**: Latest standard with SAE, forward secrecy, and offline attack protection
- **Rogue AP Detection**: Monitor for evil twins, honeypots, and unauthorized access points
- **802.1X**: Enterprise authentication using RADIUS and EAP (EAP-TLS preferred)
- **Protected Management Frames**: Required in WPA3, prevents deauth attacks
- **WIPS**: Wireless Intrusion Prevention System for real-time threat detection
- **Defense in Depth**: Encryption + authentication + monitoring + user training

Always use WPA3 when possible, disable WPS, implement strong authentication for enterprise, and continuously monitor the wireless environment for threats.
