# Firewalls and IDS/IPS

Firewalls and Intrusion Detection/Prevention Systems are fundamental network security controls. This subtopic covers firewall types, IDS/IPS systems, and the difference between signature-based and anomaly-based detection.

## Firewall Types

Firewalls filter network traffic based on various criteria and operate at different layers.

### Packet Filtering Firewalls

```
Packet Filtering (Layer 3/4):

┌─────────────────────────────────────────────┐
│ Packet Header Analysis                      │
├─────────────────────────────────────────────┤
│ Source IP:      192.168.1.100              │
│ Destination IP: 203.0.113.50               │
│ Source Port:    54321                       │
│ Dest Port:      80 (HTTP)                  │
│ Protocol:       TCP                         │
│ Flags:          SYN                         │
└─────────────────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────────────┐
│ Firewall Rules                              │
├─────────────────────────────────────────────┤
│ ALLOW 192.168.1.0/24 → ANY:80 TCP          │
│ ALLOW 192.168.1.0/24 → ANY:443 TCP         │
│ DENY  ANY → 192.168.1.0/24 ANY             │
│ ALLOW ANY → ANY ANY (default)              │
└─────────────────────────────────────────────┘
         │
         ↓
    ALLOW or DENY

Pros:
+ Fast (minimal inspection)
+ Simple to configure
+ Low resource usage

Cons:
- No application awareness
- Can't detect attacks in payload
- Vulnerable to IP spoofing
```

### Stateful Firewalls

```python
from enum import Enum
from typing import Dict, Tuple
from dataclasses import dataclass
from datetime import datetime, timedelta

class ConnectionState(Enum):
    NEW = "new"
    ESTABLISHED = "established"
    RELATED = "related"
    INVALID = "invalid"

@dataclass
class Connection:
    src_ip: str
    dst_ip: str
    src_port: int
    dst_port: int
    protocol: str
    state: ConnectionState
    created: datetime
    last_seen: datetime

class StatefulFirewall:
    """
    Stateful firewall tracks connection state
    More intelligent than simple packet filtering
    """

    def __init__(self):
        self.connection_table = {}
        self.rules = []

    def add_rule(self, rule: dict):
        """Add firewall rule"""
        self.rules.append(rule)

    def process_packet(self, packet: dict) -> bool:
        """
        Process packet with state tracking
        Returns True if allowed, False if denied
        """
        conn_key = self._get_connection_key(packet)

        # Check if part of existing connection
        if conn_key in self.connection_table:
            conn = self.connection_table[conn_key]

            # Update last seen
            conn.last_seen = datetime.utcnow()

            # Verify packet is valid for connection state
            if self._validate_packet_state(packet, conn):
                conn.state = ConnectionState.ESTABLISHED
                return True
            else:
                conn.state = ConnectionState.INVALID
                return False

        # New connection attempt
        if packet.get('flags') == 'SYN':
            # Check against rules
            if self._check_rules(packet):
                # Create connection entry
                self._create_connection(packet)
                return True

        return False

    def _get_connection_key(self, packet: dict) -> Tuple:
        """Generate unique connection key"""
        return (
            packet['src_ip'],
            packet['dst_ip'],
            packet['src_port'],
            packet['dst_port'],
            packet['protocol']
        )

    def _validate_packet_state(self, packet: dict, conn: Connection) -> bool:
        """Validate packet against connection state"""
        if conn.state == ConnectionState.ESTABLISHED:
            # Allow established connections
            return True
        elif conn.state == ConnectionState.NEW:
            # Expect SYN-ACK for TCP
            if packet['protocol'] == 'TCP' and 'ACK' in packet.get('flags', ''):
                return True
        return False

    def _check_rules(self, packet: dict) -> bool:
        """Check packet against firewall rules"""
        for rule in self.rules:
            if self._match_rule(packet, rule):
                return rule['action'] == 'ALLOW'
        # Default deny
        return False

    def _match_rule(self, packet: dict, rule: dict) -> bool:
        """Check if packet matches rule"""
        if rule.get('src_ip') and packet['src_ip'] != rule['src_ip']:
            return False
        if rule.get('dst_port') and packet['dst_port'] != rule['dst_port']:
            return False
        if rule.get('protocol') and packet['protocol'] != rule['protocol']:
            return False
        return True

    def _create_connection(self, packet: dict):
        """Create new connection entry"""
        conn_key = self._get_connection_key(packet)
        self.connection_table[conn_key] = Connection(
            src_ip=packet['src_ip'],
            dst_ip=packet['dst_ip'],
            src_port=packet['src_port'],
            dst_port=packet['dst_port'],
            protocol=packet['protocol'],
            state=ConnectionState.NEW,
            created=datetime.utcnow(),
            last_seen=datetime.utcnow()
        )

    def cleanup_old_connections(self, timeout: int = 300):
        """Remove stale connections"""
        now = datetime.utcnow()
        cutoff = now - timedelta(seconds=timeout)

        to_remove = [
            key for key, conn in self.connection_table.items()
            if conn.last_seen < cutoff
        ]

        for key in to_remove:
            del self.connection_table[key]
```

### Application Layer Firewalls (WAF)

```python
import re
from typing import List, Dict

class WebApplicationFirewall:
    """
    Application layer firewall (Layer 7)
    Inspects HTTP/HTTPS traffic for attacks
    """

    def __init__(self):
        self.rules = self._load_default_rules()

    def _load_default_rules(self) -> List[Dict]:
        """Load default WAF rules"""
        return [
            {
                'name': 'SQL Injection Detection',
                'pattern': r"(\bunion\b.*\bselect\b)|(\bor\b.*=.*)|(\bdrop\b.*\btable\b)",
                'severity': 'HIGH',
                'action': 'BLOCK'
            },
            {
                'name': 'XSS Detection',
                'pattern': r"<script[^>]*>.*?</script>|javascript:|onerror=|onload=",
                'severity': 'HIGH',
                'action': 'BLOCK'
            },
            {
                'name': 'Path Traversal',
                'pattern': r"\.\./|\.\.\\ ",
                'severity': 'HIGH',
                'action': 'BLOCK'
            },
            {
                'name': 'Command Injection',
                'pattern': r"[;&|`$]|\bwget\b|\bcurl\b|\bash\b",
                'severity': 'HIGH',
                'action': 'BLOCK'
            },
            {
                'name': 'Suspicious User-Agent',
                'pattern': r"(sqlmap|nikto|nmap|masscan)",
                'severity': 'MEDIUM',
                'action': 'BLOCK'
            }
        ]

    def inspect_request(self, request: dict) -> Dict:
        """
        Inspect HTTP request for malicious content
        """
        findings = []

        # Check URL
        for rule in self.rules:
            if re.search(rule['pattern'], request.get('url', ''), re.IGNORECASE):
                findings.append({
                    'rule': rule['name'],
                    'location': 'URL',
                    'severity': rule['severity'],
                    'action': rule['action']
                })

        # Check parameters
        for param, value in request.get('params', {}).items():
            for rule in self.rules:
                if re.search(rule['pattern'], str(value), re.IGNORECASE):
                    findings.append({
                        'rule': rule['name'],
                        'location': f'Parameter: {param}',
                        'severity': rule['severity'],
                        'action': rule['action']
                    })

        # Check headers
        for header, value in request.get('headers', {}).items():
            for rule in self.rules:
                if re.search(rule['pattern'], str(value), re.IGNORECASE):
                    findings.append({
                        'rule': rule['name'],
                        'location': f'Header: {header}',
                        'severity': rule['severity'],
                        'action': rule['action']
                    })

        # Determine action
        if any(f['action'] == 'BLOCK' for f in findings):
            action = 'BLOCK'
        else:
            action = 'ALLOW'

        return {
            'action': action,
            'findings': findings,
            'request_id': request.get('id')
        }

    def add_custom_rule(self, name: str, pattern: str, severity: str, action: str):
        """Add custom WAF rule"""
        self.rules.append({
            'name': name,
            'pattern': pattern,
            'severity': severity,
            'action': action
        })
```

## Intrusion Detection Systems (IDS)

IDS monitors network traffic for suspicious activity and alerts administrators.

### Signature-Based IDS

```python
from typing import List, Dict
import hashlib

class SignatureBasedIDS:
    """
    Signature-based IDS
    Detects known attack patterns
    """

    def __init__(self):
        self.signatures = self._load_signatures()
        self.alerts = []

    def _load_signatures(self) -> List[Dict]:
        """Load attack signatures"""
        return [
            {
                'id': 'SIG-001',
                'name': 'Nmap SYN Scan',
                'pattern': 'rapid_syn_packets',
                'severity': 'MEDIUM',
                'description': 'Possible port scanning activity'
            },
            {
                'id': 'SIG-002',
                'name': 'SQL Injection Attempt',
                'pattern': r"' OR '1'='1",
                'severity': 'HIGH',
                'description': 'SQL injection attack pattern detected'
            },
            {
                'id': 'SIG-003',
                'name': 'Brute Force SSH',
                'pattern': 'multiple_ssh_failures',
                'severity': 'HIGH',
                'description': 'Multiple failed SSH login attempts'
            },
            {
                'id': 'SIG-004',
                'name': 'Metasploit User-Agent',
                'pattern': r'Metasploit|Meterpreter',
                'severity': 'CRITICAL',
                'description': 'Metasploit framework detected'
            }
        ]

    def analyze_packet(self, packet: dict) -> List[Dict]:
        """
        Analyze packet against signatures
        """
        matches = []

        for sig in self.signatures:
            if self._check_signature(packet, sig):
                alert = {
                    'signature_id': sig['id'],
                    'signature_name': sig['name'],
                    'severity': sig['severity'],
                    'description': sig['description'],
                    'source_ip': packet.get('src_ip'),
                    'destination_ip': packet.get('dst_ip'),
                    'timestamp': datetime.utcnow().isoformat()
                }
                matches.append(alert)
                self.alerts.append(alert)

        return matches

    def _check_signature(self, packet: dict, signature: dict) -> bool:
        """Check if packet matches signature"""
        pattern = signature['pattern']

        # Check payload
        if 'payload' in packet:
            if isinstance(pattern, str) and pattern in packet['payload']:
                return True

        # Check for behavioral patterns
        if pattern == 'rapid_syn_packets':
            # Would check connection rate
            pass
        elif pattern == 'multiple_ssh_failures':
            # Would check auth failure rate
            pass

        return False

    def get_recent_alerts(self, hours: int = 24) -> List[Dict]:
        """Get recent alerts"""
        cutoff = datetime.utcnow() - timedelta(hours=hours)
        return [
            alert for alert in self.alerts
            if datetime.fromisoformat(alert['timestamp']) > cutoff
        ]


# Pros and Cons of Signature-Based IDS
"""
Pros:
+ Low false positives (known attacks)
+ Fast detection of known threats
+ Easy to understand alerts
+ Effective against known exploits

Cons:
- Cannot detect new/unknown attacks (zero-days)
- Requires constant signature updates
- Can be evaded with obfuscation
- High maintenance overhead
"""
```

### Anomaly-Based IDS

```python
import numpy as np
from typing import Dict, List

class AnomalyBasedIDS:
    """
    Anomaly-based IDS
    Detects deviations from normal behavior
    """

    def __init__(self):
        self.baseline = {}
        self.training_mode = True
        self.anomalies = []

    def learn_baseline(self, traffic_samples: List[Dict]):
        """
        Learn normal traffic patterns
        """
        metrics = {
            'packets_per_second': [],
            'bytes_per_second': [],
            'connections_per_minute': [],
            'unique_ports': [],
            'protocol_distribution': {}
        }

        for sample in traffic_samples:
            metrics['packets_per_second'].append(sample.get('packets_per_second', 0))
            metrics['bytes_per_second'].append(sample.get('bytes_per_second', 0))
            metrics['connections_per_minute'].append(sample.get('connections_per_minute', 0))

        # Calculate baselines (mean and std dev)
        self.baseline = {
            'packets_per_second': {
                'mean': np.mean(metrics['packets_per_second']),
                'std': np.std(metrics['packets_per_second'])
            },
            'bytes_per_second': {
                'mean': np.mean(metrics['bytes_per_second']),
                'std': np.std(metrics['bytes_per_second'])
            },
            'connections_per_minute': {
                'mean': np.mean(metrics['connections_per_minute']),
                'std': np.std(metrics['connections_per_minute'])
            }
        }

        self.training_mode = False

    def detect_anomaly(self, traffic: dict) -> List[Dict]:
        """
        Detect anomalies in current traffic
        """
        if self.training_mode:
            return []

        anomalies = []
        threshold = 3  # Standard deviations

        # Check each metric
        for metric, values in self.baseline.items():
            current_value = traffic.get(metric, 0)
            mean = values['mean']
            std = values['std']

            # Calculate z-score
            if std > 0:
                z_score = abs((current_value - mean) / std)

                if z_score > threshold:
                    anomaly = {
                        'type': 'statistical_anomaly',
                        'metric': metric,
                        'current_value': current_value,
                        'expected_range': f"{mean - threshold*std:.2f} - {mean + threshold*std:.2f}",
                        'severity': self._calculate_severity(z_score),
                        'timestamp': datetime.utcnow().isoformat()
                    }
                    anomalies.append(anomaly)
                    self.anomalies.append(anomaly)

        return anomalies

    def _calculate_severity(self, z_score: float) -> str:
        """Calculate severity based on z-score"""
        if z_score > 5:
            return 'CRITICAL'
        elif z_score > 4:
            return 'HIGH'
        elif z_score > 3:
            return 'MEDIUM'
        else:
            return 'LOW'


# Pros and Cons of Anomaly-Based IDS
"""
Pros:
+ Can detect unknown attacks (zero-days)
+ Adapts to environment
+ Doesn't need signature updates
+ Detects insider threats

Cons:
- Higher false positive rate
- Requires training period
- Difficult to interpret alerts
- Can be fooled by slow attacks
"""
```

## Intrusion Prevention Systems (IPS)

IPS actively blocks detected threats (IDS + blocking capability).

```python
class IntrusionPreventionSystem:
    """
    IPS combines detection with prevention
    Automatically blocks malicious traffic
    """

    def __init__(self):
        self.ids = SignatureBasedIDS()
        self.blocked_ips = {}
        self.auto_block_enabled = True

    def process_traffic(self, packet: dict) -> Dict:
        """
        Process traffic and take action
        """
        # Detect threats
        alerts = self.ids.analyze_packet(packet)

        result = {
            'action': 'ALLOW',
            'alerts': alerts,
            'reason': None
        }

        # Check if IP already blocked
        src_ip = packet.get('src_ip')
        if src_ip in self.blocked_ips:
            result['action'] = 'BLOCK'
            result['reason'] = 'IP previously blocked'
            return result

        # Check severity of alerts
        if alerts:
            max_severity = max(alert['severity'] for alert in alerts)

            # Auto-block on HIGH or CRITICAL
            if self.auto_block_enabled and max_severity in ['HIGH', 'CRITICAL']:
                self._block_ip(src_ip, duration=3600)
                result['action'] = 'BLOCK'
                result['reason'] = f"Automatic block due to {max_severity} severity alert"
            else:
                # Alert only (IDS mode)
                result['action'] = 'ALERT'
                result['reason'] = f"Alert generated: {alerts[0]['signature_name']}"

        return result

    def _block_ip(self, ip: str, duration: int):
        """Block IP address"""
        expiry = datetime.utcnow() + timedelta(seconds=duration)
        self.blocked_ips[ip] = expiry

        # In production: Add firewall rule
        print(f"[IPS] Blocking {ip} until {expiry}")
        # iptables -A INPUT -s {ip} -j DROP

    def unblock_ip(self, ip: str):
        """Manually unblock IP"""
        if ip in self.blocked_ips:
            del self.blocked_ips[ip]
            # Remove firewall rule
            print(f"[IPS] Unblocked {ip}")

    def cleanup_expired_blocks(self):
        """Remove expired blocks"""
        now = datetime.utcnow()
        expired = [ip for ip, expiry in self.blocked_ips.items() if expiry < now]

        for ip in expired:
            self.unblock_ip(ip)
```

## IDS/IPS Deployment Models

```
Deployment Options:

1. Network-Based IDS/IPS (NIDS/NIPS)
   ┌──────────────────────────────────┐
   │ Internet                         │
   └──────────────┬───────────────────┘
                  │
         ┌────────▼────────┐
         │   Firewall      │
         └────────┬────────┘
                  │
         ┌────────▼────────┐
         │   IDS/IPS       │ ← Monitors all traffic
         │   (TAP/SPAN)    │
         └────────┬────────┘
                  │
         ┌────────▼────────┐
         │ Internal Network│
         └─────────────────┘

2. Host-Based IDS/IPS (HIDS/HIPS)
   ┌─────────────────────────────┐
   │ Server                      │
   │ ┌─────────────────────────┐ │
   │ │ Application             │ │
   │ └──────────┬──────────────┘ │
   │            │                │
   │ ┌──────────▼──────────────┐ │
   │ │ HIDS/HIPS Agent         │ │ ← Monitors host
   │ │ - File integrity        │ │
   │ │ - Log analysis          │ │
   │ │ - Process monitoring    │ │
   │ └─────────────────────────┘ │
   └─────────────────────────────┘
```

## Summary

Firewalls and IDS/IPS are essential network security controls:

- **Packet Filtering**: Fast but limited to header inspection (Layer 3/4)
- **Stateful Firewalls**: Track connection state for better security
- **Application Firewalls (WAF)**: Inspect application-layer protocols (Layer 7)
- **Signature-Based IDS**: Detect known attacks with low false positives
- **Anomaly-Based IDS**: Detect unknown attacks by identifying abnormal behavior
- **IPS**: Automatically block detected threats (IDS with prevention)

Use multiple layers: packet filtering for perimeter, stateful firewall for connection tracking, WAF for applications, and IDS/IPS for threat detection and prevention.
