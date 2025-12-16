# Network Security Basics

Network security involves protecting data as it traverses networks and defending network infrastructure from attacks. This subtopic covers fundamental network security concepts, the OSI model from a security perspective, and common network threats.

## OSI Model Security

Each layer of the OSI model has specific security concerns and protections.

### Security by Layer

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 7 - Application                                      │
│ Security: Input validation, authentication, encryption     │
│ Threats: SQL injection, XSS, API abuse                    │
│ Protection: WAF, application firewalls, secure coding     │
├─────────────────────────────────────────────────────────────┤
│ Layer 6 - Presentation                                     │
│ Security: Data encryption, encoding                        │
│ Threats: Encoding attacks, encryption vulnerabilities     │
│ Protection: TLS/SSL, proper encoding                      │
├─────────────────────────────────────────────────────────────┤
│ Layer 5 - Session                                          │
│ Security: Session management, authentication              │
│ Threats: Session hijacking, fixation                      │
│ Protection: Secure session tokens, timeouts               │
├─────────────────────────────────────────────────────────────┤
│ Layer 4 - Transport                                        │
│ Security: Port filtering, connection tracking             │
│ Threats: Port scanning, SYN floods                        │
│ Protection: Stateful firewalls, rate limiting             │
├─────────────────────────────────────────────────────────────┤
│ Layer 3 - Network                                          │
│ Security: IP filtering, routing security                  │
│ Threats: IP spoofing, routing attacks                     │
│ Protection: Packet filtering, IPsec                       │
├─────────────────────────────────────────────────────────────┤
│ Layer 2 - Data Link                                        │
│ Security: MAC filtering, switch security                  │
│ Threats: MAC spoofing, ARP poisoning, VLAN hopping       │
│ Protection: Port security, VLAN isolation                 │
├─────────────────────────────────────────────────────────────┤
│ Layer 1 - Physical                                         │
│ Security: Physical access control                         │
│ Threats: Wire tapping, physical access                    │
│ Protection: Locked facilities, cable encryption           │
└─────────────────────────────────────────────────────────────┘
```

## Common Network Threats

### Reconnaissance Attacks

```python
# Understanding reconnaissance (for defensive purposes)
import socket
import ipaddress
from typing import List, Dict

class NetworkReconnaissance:
    """Understanding reconnaissance techniques for defense"""

    @staticmethod
    def explain_port_scanning():
        """Explain port scanning techniques"""
        return """
        Port Scanning Types:

        1. TCP Connect Scan
           - Completes full TCP handshake
           - Easily detected
           - No special privileges needed

        2. SYN Scan (Half-Open)
           - Sends SYN, receives SYN-ACK, sends RST
           - Stealthier than connect scan
           - Requires root/admin privileges

        3. UDP Scan
           - Sends UDP packets
           - Slower, less reliable
           - ICMP unreachable = port closed

        4. Service Version Detection
           - Identifies running services
           - Grabs banners
           - Detects versions

        Defense:
        - Use firewall to limit exposed ports
        - Disable unnecessary services
        - Use IDS to detect scans
        - Implement port knocking for sensitive services
        """

    @staticmethod
    def detect_port_scan_behavior() -> Dict:
        """Characteristics of port scanning for detection"""
        return {
            'rapid_connections': 'Many connections in short time',
            'sequential_ports': 'Connections to sequential port numbers',
            'connection_failures': 'High rate of failed connections',
            'partial_handshakes': 'Many incomplete TCP handshakes',
            'unusual_ports': 'Connections to uncommon ports'
        }


class NetworkDefense:
    """Network defense mechanisms"""

    def __init__(self):
        self.connection_attempts = {}

    def detect_scan(self, ip: str, port: int) -> bool:
        """
        Simple scan detection logic
        """
        current_time = time.time()

        if ip not in self.connection_attempts:
            self.connection_attempts[ip] = []

        # Add this attempt
        self.connection_attempts[ip].append({
            'port': port,
            'time': current_time
        })

        # Keep only last 60 seconds
        self.connection_attempts[ip] = [
            attempt for attempt in self.connection_attempts[ip]
            if current_time - attempt['time'] < 60
        ]

        # Check for scan pattern
        recent = self.connection_attempts[ip]

        # More than 10 different ports in 60 seconds = likely scan
        unique_ports = len(set(a['port'] for a in recent))
        if unique_ports > 10:
            return True

        return False

    def block_ip(self, ip: str, duration: int = 3600):
        """Block IP for specified duration (seconds)"""
        print(f"Blocking {ip} for {duration} seconds")
        # In production: Add firewall rule
        # iptables -A INPUT -s {ip} -j DROP
```

### Man-in-the-Middle (MITM) Attacks

```python
import hashlib
import hmac

class MITMDefense:
    """Defending against man-in-the-middle attacks"""

    @staticmethod
    def explain_mitm_attacks():
        """Explain MITM attack types"""
        return """
        MITM Attack Types:

        1. ARP Spoofing
           Attack: Attacker associates their MAC with victim's IP
           Result: Traffic routed through attacker
           Defense: Static ARP entries, ARP inspection

        2. DNS Spoofing
           Attack: Attacker provides false DNS responses
           Result: User directed to malicious site
           Defense: DNSSEC, DNS over HTTPS

        3. SSL Stripping
           Attack: Downgrade HTTPS to HTTP
           Result: Unencrypted communication
           Defense: HSTS, certificate pinning

        4. Session Hijacking
           Attack: Steal session cookies
           Result: Impersonate user
           Defense: Secure cookies, TLS, short timeouts

        5. Rogue Access Point
           Attack: Fake Wi-Fi hotspot
           Result: All traffic visible to attacker
           Defense: VPN, verify network authenticity
        """

    @staticmethod
    def verify_certificate_pinning(cert_hash: str, expected_hash: str) -> bool:
        """
        Certificate pinning - verify server certificate
        Prevents MITM with fraudulent certificates
        """
        return hmac.compare_digest(cert_hash, expected_hash)

    @staticmethod
    def enforce_hsts():
        """
        HTTP Strict Transport Security
        Force HTTPS for all connections
        """
        return {
            'header': 'Strict-Transport-Security',
            'value': 'max-age=31536000; includeSubDomains; preload',
            'purpose': 'Prevent SSL stripping attacks'
        }

    @staticmethod
    def secure_cookie_configuration():
        """
        Secure cookie settings to prevent MITM
        """
        return {
            'secure': True,        # Only sent over HTTPS
            'httponly': True,      # Not accessible via JavaScript
            'samesite': 'Strict',  # CSRF protection
            'domain': None,        # Don't share across subdomains
            'path': '/',
            'max_age': 3600        # Short lifetime
        }
```

### Denial of Service (DoS)

```python
import time
from collections import defaultdict
from datetime import datetime, timedelta

class DoSProtection:
    """Protection against Denial of Service attacks"""

    def __init__(self):
        self.request_counts = defaultdict(list)
        self.blocked_ips = {}

    def rate_limit(self, ip: str, limit: int = 100, window: int = 60) -> bool:
        """
        Rate limiting to prevent DoS
        Returns True if request allowed, False if blocked
        """
        now = datetime.utcnow()

        # Clean old requests
        cutoff = now - timedelta(seconds=window)
        self.request_counts[ip] = [
            timestamp for timestamp in self.request_counts[ip]
            if timestamp > cutoff
        ]

        # Check if blocked
        if ip in self.blocked_ips:
            if now < self.blocked_ips[ip]:
                return False  # Still blocked
            else:
                del self.blocked_ips[ip]  # Unblock

        # Add current request
        self.request_counts[ip].append(now)

        # Check rate limit
        if len(self.request_counts[ip]) > limit:
            # Block for 1 hour
            self.blocked_ips[ip] = now + timedelta(hours=1)
            return False

        return True

    @staticmethod
    def explain_dos_attacks():
        """Explain DoS attack types and defenses"""
        return """
        DoS/DDoS Attack Types:

        1. Volume-Based Attacks
           - UDP floods
           - ICMP floods
           - Amplification attacks (DNS, NTP)
           Defense: Rate limiting, traffic filtering, CDN

        2. Protocol Attacks
           - SYN flood
           - Ping of death
           - Smurf attack
           Defense: SYN cookies, firewall rules, IDS

        3. Application Layer Attacks
           - HTTP flood
           - Slowloris
           - Resource exhaustion
           Defense: Rate limiting, WAF, CAPTCHA

        4. Distributed Attacks (DDoS)
           - Botnet-based attacks
           - Overwhelming volume
           - Difficult to distinguish from legitimate traffic
           Defense: DDoS mitigation service, anycast, traffic analysis

        General Defenses:
        - Rate limiting
        - Connection limits
        - Resource quotas
        - Traffic analysis
        - Blackhole routing
        - CDN/caching
        - Auto-scaling
        """

    def syn_flood_protection(self, connections_per_second: int) -> dict:
        """
        SYN flood protection configuration
        """
        return {
            'syn_cookies': True,          # Enable SYN cookies
            'max_syn_backlog': 2048,      # Limit half-open connections
            'tcp_syncookies': 1,          # Kernel parameter
            'tcp_max_syn_backlog': 2048,  # Kernel parameter
            'connection_rate_limit': connections_per_second
        }

    def application_rate_limiting(self):
        """
        Application-level rate limiting
        """
        return {
            'requests_per_minute': 60,
            'requests_per_hour': 1000,
            'concurrent_connections': 10,
            'request_timeout': 30,        # seconds
            'max_request_size': 1048576,  # 1MB
            'connection_timeout': 10
        }
```

## Network Security Zones

### Defense in Depth Architecture

```
Internet
    │
    ↓
┌─────────────────────────────────────────┐
│ Perimeter (DMZ)                         │
│ ├─ External Firewall                    │
│ ├─ DDoS Protection                      │
│ └─ Public Web Servers                   │
├─────────────────────────────────────────┤
│ Internal Network                        │
│ ├─ Internal Firewall                    │
│ ├─ Application Servers                  │
│ ├─ Internal Services                    │
│ └─ IDS/IPS                             │
├─────────────────────────────────────────┤
│ Secure Zone                             │
│ ├─ Database Servers                     │
│ ├─ Authentication Servers               │
│ └─ Strict Access Control                │
├─────────────────────────────────────────┤
│ Management Network                      │
│ ├─ Separate Physical Network           │
│ ├─ Admin Access Only                    │
│ └─ Monitoring & Logging                 │
└─────────────────────────────────────────┘
```

### Network Segmentation

```python
class NetworkSegmentation:
    """Network segmentation for security"""

    @staticmethod
    def define_security_zones():
        """Define network security zones"""
        return {
            'external': {
                'trust_level': 'untrusted',
                'access': 'public',
                'resources': ['load_balancers', 'cdn', 'public_web'],
                'rules': 'deny_all_except_80_443'
            },
            'dmz': {
                'trust_level': 'low',
                'access': 'restricted',
                'resources': ['web_servers', 'reverse_proxy', 'api_gateway'],
                'rules': 'allow_from_external_to_specific_ports'
            },
            'application': {
                'trust_level': 'medium',
                'access': 'internal',
                'resources': ['app_servers', 'cache', 'message_queue'],
                'rules': 'allow_from_dmz_and_internal'
            },
            'database': {
                'trust_level': 'high',
                'access': 'restricted',
                'resources': ['database', 'backup'],
                'rules': 'allow_only_from_application_zone'
            },
            'management': {
                'trust_level': 'highest',
                'access': 'admin_only',
                'resources': ['monitoring', 'logging', 'authentication'],
                'rules': 'allow_only_from_admin_network'
            }
        }

    @staticmethod
    def firewall_rules_between_zones():
        """Define firewall rules between zones"""
        return [
            {
                'from': 'external',
                'to': 'dmz',
                'ports': [80, 443],
                'protocol': 'tcp',
                'action': 'allow'
            },
            {
                'from': 'dmz',
                'to': 'application',
                'ports': [8080, 8443],
                'protocol': 'tcp',
                'action': 'allow'
            },
            {
                'from': 'application',
                'to': 'database',
                'ports': [5432],  # PostgreSQL
                'protocol': 'tcp',
                'action': 'allow'
            },
            {
                'from': 'management',
                'to': 'all',
                'ports': [22],  # SSH
                'protocol': 'tcp',
                'action': 'allow'
            },
            {
                'from': 'all',
                'to': 'all',
                'ports': 'any',
                'protocol': 'any',
                'action': 'deny'  # Default deny
            }
        ]
```

## Network Monitoring

### Traffic Analysis

```python
import logging
from typing import Dict, List

class NetworkMonitor:
    """Network traffic monitoring for security"""

    def __init__(self):
        self.logger = logging.getLogger('network_security')

    def analyze_traffic_pattern(self, traffic_data: Dict) -> Dict:
        """Analyze network traffic for anomalies"""
        anomalies = []

        # Check for unusual traffic volume
        if traffic_data['bytes_per_second'] > self._get_baseline() * 3:
            anomalies.append({
                'type': 'high_volume',
                'severity': 'medium',
                'details': 'Traffic volume 3x normal'
            })

        # Check for port scanning
        if traffic_data['unique_ports_accessed'] > 100:
            anomalies.append({
                'type': 'port_scan',
                'severity': 'high',
                'details': f"Accessed {traffic_data['unique_ports_accessed']} ports"
            })

        # Check for unusual protocols
        if 'unusual_protocols' in traffic_data:
            anomalies.append({
                'type': 'unusual_protocol',
                'severity': 'medium',
                'details': f"Protocols: {traffic_data['unusual_protocols']}"
            })

        return {
            'timestamp': traffic_data['timestamp'],
            'source_ip': traffic_data['source_ip'],
            'anomalies': anomalies,
            'risk_score': len(anomalies) * 10
        }

    def _get_baseline(self) -> float:
        """Get baseline traffic volume"""
        # In production: Calculate from historical data
        return 1000000  # bytes per second

    def log_security_event(self, event_type: str, details: Dict):
        """Log security event"""
        self.logger.warning(
            f"Security event: {event_type}, "
            f"Source: {details.get('source_ip', 'unknown')}, "
            f"Details: {details}"
        )
```

## Summary

Network security fundamentals provide the foundation for protecting networked systems:

- **OSI Model Security**: Each layer has specific threats and protections
- **Reconnaissance Defense**: Detect and block port scans and network mapping
- **MITM Prevention**: Use encryption, certificate pinning, HSTS to prevent interception
- **DoS Protection**: Implement rate limiting, connection limits, and traffic filtering
- **Network Segmentation**: Divide network into security zones with controlled access
- **Defense in Depth**: Multiple layers of security controls throughout network
- **Monitoring**: Continuous traffic analysis to detect anomalies and attacks

Network security is a critical foundation for overall system security. Understanding network threats and implementing layered defenses is essential for protecting modern applications.
