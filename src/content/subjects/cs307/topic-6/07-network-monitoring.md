# Network Monitoring

Network monitoring is essential for detecting security incidents, analyzing traffic patterns, and investigating breaches. This subtopic covers SIEM systems, log analysis, and network forensics.

## Security Information and Event Management (SIEM)

SIEM systems aggregate logs from multiple sources for centralized analysis and correlation.

### SIEM Architecture

```
SIEM System Architecture:

┌─────────────────────────────────────────────┐
│ Data Sources                                │
├─────────────────────────────────────────────┤
│ • Firewalls                                 │
│ • IDS/IPS                                   │
│ • Web servers                               │
│ • Application servers                       │
│ • Databases                                 │
│ • Authentication systems                    │
│ • Network devices                           │
│ • Endpoints (workstations, servers)        │
└──────────────┬──────────────────────────────┘
               │ Logs/Events
               ↓
┌─────────────────────────────────────────────┐
│ Log Collection & Aggregation                │
│ • Syslog                                    │
│ • Windows Event Log                         │
│ • SNMP                                      │
│ • API integrations                          │
└──────────────┬──────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────┐
│ Normalization & Parsing                     │
│ • Parse different log formats               │
│ • Extract relevant fields                   │
│ • Standardize timestamps                    │
└──────────────┬──────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────┐
│ Correlation & Analysis                      │
│ • Rule-based detection                      │
│ • Anomaly detection                         │
│ • Threat intelligence integration           │
│ • Pattern matching                          │
└──────────────┬──────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────┐
│ Alerting & Response                         │
│ • Security incidents                        │
│ • Automated responses                       │
│ • Case management                           │
└─────────────────────────────────────────────┘
```

### SIEM Implementation

```python
import json
import re
from datetime import datetime, timedelta
from typing import List, Dict
from collections import defaultdict

class SIEMEvent:
    """Normalized security event"""

    def __init__(self, raw_log: str, source: str):
        self.raw = raw_log
        self.source = source
        self.timestamp = datetime.utcnow()
        self.severity = 'INFO'
        self.category = 'unknown'
        self.fields = {}

    def parse(self):
        """Parse log into structured fields"""
        # Example parsing (simplified)
        if 'Failed password' in self.raw:
            self.category = 'authentication_failure'
            self.severity = 'MEDIUM'
            self._extract_auth_fields()
        elif 'Accepted password' in self.raw:
            self.category = 'authentication_success'
            self.severity = 'INFO'
            self._extract_auth_fields()
        elif 'firewall' in self.raw.lower() and 'denied' in self.raw.lower():
            self.category = 'firewall_block'
            self.severity = 'LOW'

    def _extract_auth_fields(self):
        """Extract authentication-specific fields"""
        # Extract username
        user_match = re.search(r'for (\w+)', self.raw)
        if user_match:
            self.fields['username'] = user_match.group(1)

        # Extract IP
        ip_match = re.search(r'from ([\d.]+)', self.raw)
        if ip_match:
            self.fields['source_ip'] = ip_match.group(1)


class SimpleSIEM:
    """Simplified SIEM system"""

    def __init__(self):
        self.events = []
        self.correlation_rules = []
        self.alerts = []

    def ingest_log(self, raw_log: str, source: str):
        """Ingest and parse log"""
        event = SIEMEvent(raw_log, source)
        event.parse()
        self.events.append(event)

        # Run correlation rules
        self._correlate_events(event)

    def add_correlation_rule(self, rule: Dict):
        """Add correlation rule"""
        self.correlation_rules.append(rule)

    def _correlate_events(self, new_event: SIEMEvent):
        """Correlate events to detect patterns"""
        for rule in self.correlation_rules:
            if rule['type'] == 'brute_force':
                self._check_brute_force(new_event)
            elif rule['type'] == 'port_scan':
                self._check_port_scan(new_event)

    def _check_brute_force(self, event: SIEMEvent):
        """Detect brute force attacks"""
        if event.category != 'authentication_failure':
            return

        source_ip = event.fields.get('source_ip')
        if not source_ip:
            return

        # Count failures from same IP in last 5 minutes
        cutoff = datetime.utcnow() - timedelta(minutes=5)
        failures = [
            e for e in self.events
            if e.category == 'authentication_failure'
            and e.fields.get('source_ip') == source_ip
            and e.timestamp > cutoff
        ]

        if len(failures) >= 5:
            self._create_alert(
                'BRUTE_FORCE_ATTACK',
                f"Brute force attack from {source_ip}: {len(failures)} failures in 5 minutes",
                'HIGH',
                {'source_ip': source_ip, 'failure_count': len(failures)}
            )

    def _check_port_scan(self, event: SIEMEvent):
        """Detect port scanning"""
        # Check for connections to multiple ports from same source
        # Simplified implementation
        pass

    def _create_alert(self, alert_type: str, message: str, severity: str, details: Dict):
        """Create security alert"""
        alert = {
            'type': alert_type,
            'message': message,
            'severity': severity,
            'timestamp': datetime.utcnow().isoformat(),
            'details': details
        }
        self.alerts.append(alert)
        print(f"[SIEM ALERT] {severity}: {message}")

    def search_events(self, query: Dict, time_range: timedelta = None) -> List[SIEMEvent]:
        """Search events"""
        results = self.events

        # Filter by time range
        if time_range:
            cutoff = datetime.utcnow() - time_range
            results = [e for e in results if e.timestamp > cutoff]

        # Filter by category
        if 'category' in query:
            results = [e for e in results if e.category == query['category']]

        # Filter by severity
        if 'severity' in query:
            results = [e for e in results if e.severity == query['severity']]

        # Filter by fields
        if 'fields' in query:
            for field, value in query['fields'].items():
                results = [e for e in results if e.fields.get(field) == value]

        return results

    def generate_report(self, time_range: timedelta = timedelta(days=1)) -> Dict:
        """Generate security report"""
        cutoff = datetime.utcnow() - time_range
        recent_events = [e for e in self.events if e.timestamp > cutoff]

        # Count by category
        by_category = defaultdict(int)
        for event in recent_events:
            by_category[event.category] += 1

        # Count by severity
        by_severity = defaultdict(int)
        for event in recent_events:
            by_severity[event.severity] += 1

        # Top source IPs
        source_ips = defaultdict(int)
        for event in recent_events:
            if 'source_ip' in event.fields:
                source_ips[event.fields['source_ip']] += 1

        return {
            'period': f"Last {time_range.days} day(s)",
            'total_events': len(recent_events),
            'by_category': dict(by_category),
            'by_severity': dict(by_severity),
            'top_source_ips': dict(sorted(source_ips.items(), key=lambda x: x[1], reverse=True)[:10]),
            'alert_count': len([a for a in self.alerts if datetime.fromisoformat(a['timestamp']) > cutoff])
        }


# Example usage
siem = SimpleSIEM()

# Add correlation rule
siem.add_correlation_rule({
    'type': 'brute_force',
    'threshold': 5,
    'window': timedelta(minutes=5)
})

# Ingest logs
siem.ingest_log("Failed password for admin from 203.0.113.50", "ssh")
siem.ingest_log("Failed password for admin from 203.0.113.50", "ssh")
siem.ingest_log("Failed password for root from 203.0.113.50", "ssh")
siem.ingest_log("Accepted password for user from 10.0.1.100", "ssh")

# Search
failed_auth = siem.search_events({
    'category': 'authentication_failure'
}, timedelta(hours=1))

# Report
report = siem.generate_report()
```

## Log Analysis

### Log Collection and Parsing

```python
import re
from typing import Dict, List
from datetime import datetime

class LogParser:
    """Parse various log formats"""

    @staticmethod
    def parse_apache_log(line: str) -> Dict:
        """Parse Apache/Nginx access log"""
        # Format: IP - - [timestamp] "method path protocol" status size
        pattern = r'(\S+) - - \[(.*?)\] "(.*?)" (\d+) (\d+)'
        match = re.match(pattern, line)

        if match:
            ip, timestamp, request, status, size = match.groups()
            method, path, protocol = request.split() if len(request.split()) == 3 else ('', '', '')

            return {
                'source_ip': ip,
                'timestamp': timestamp,
                'method': method,
                'path': path,
                'protocol': protocol,
                'status': int(status),
                'size': int(size)
            }
        return None

    @staticmethod
    def parse_syslog(line: str) -> Dict:
        """Parse syslog format"""
        # Format: Month Day HH:MM:SS hostname program[pid]: message
        pattern = r'(\w+\s+\d+\s+\d+:\d+:\d+)\s+(\S+)\s+(\w+)\[?(\d+)?\]?:\s+(.*)'
        match = re.match(pattern, line)

        if match:
            timestamp, hostname, program, pid, message = match.groups()
            return {
                'timestamp': timestamp,
                'hostname': hostname,
                'program': program,
                'pid': pid,
                'message': message
            }
        return None

    @staticmethod
    def parse_firewall_log(line: str) -> Dict:
        """Parse firewall log"""
        # Simplified iptables format
        fields = {}

        # Extract fields
        for part in line.split():
            if '=' in part:
                key, value = part.split('=', 1)
                fields[key.lower()] = value

        return fields


class LogAnalyzer:
    """Analyze logs for security patterns"""

    def __init__(self):
        self.logs = []

    def analyze_web_logs(self, logs: List[Dict]) -> Dict:
        """Analyze web server logs for attacks"""
        findings = {
            'sql_injection_attempts': [],
            'xss_attempts': [],
            'directory_traversal': [],
            'suspicious_user_agents': [],
            'brute_force_attempts': []
        }

        for log in logs:
            path = log.get('path', '')

            # SQL injection patterns
            if re.search(r"('|--|;|union|select|drop|insert|update)", path, re.I):
                findings['sql_injection_attempts'].append(log)

            # XSS patterns
            if re.search(r"(<script|javascript:|onerror=|onload=)", path, re.I):
                findings['xss_attempts'].append(log)

            # Directory traversal
            if '../' in path or '..\' in path:
                findings['directory_traversal'].append(log)

            # Suspicious user agents
            user_agent = log.get('user_agent', '')
            if any(tool in user_agent.lower() for tool in ['sqlmap', 'nikto', 'nmap', 'burp']):
                findings['suspicious_user_agents'].append(log)

        # Detect brute force (multiple 401/403 from same IP)
        ip_failures = defaultdict(list)
        for log in logs:
            if log.get('status') in [401, 403]:
                ip_failures[log.get('source_ip')].append(log)

        for ip, failures in ip_failures.items():
            if len(failures) > 10:
                findings['brute_force_attempts'].append({
                    'ip': ip,
                    'attempts': len(failures),
                    'paths': list(set(f.get('path') for f in failures))
                })

        return findings

    def detect_anomalies(self, logs: List[Dict]) -> List[Dict]:
        """Detect anomalous log entries"""
        anomalies = []

        # Build baseline (simplified)
        common_paths = defaultdict(int)
        for log in logs:
            common_paths[log.get('path')] += 1

        # Find rare paths
        total_requests = len(logs)
        for log in logs:
            path_frequency = common_paths[log.get('path')] / total_requests
            if path_frequency < 0.01:  # Less than 1% of traffic
                anomalies.append({
                    'type': 'rare_path',
                    'log': log,
                    'frequency': path_frequency
                })

        return anomalies
```

## Network Forensics

### Packet Capture Analysis

```python
class NetworkForensics:
    """Network forensics for incident investigation"""

    def __init__(self):
        self.captured_packets = []

    def analyze_pcap(self, pcap_file: str) -> Dict:
        """Analyze packet capture file"""
        # In production: use scapy or similar library
        analysis = {
            'total_packets': 0,
            'protocols': defaultdict(int),
            'conversations': [],
            'suspicious_patterns': [],
            'extracted_files': []
        }

        return analysis

    def extract_http_traffic(self, packets: List) -> List[Dict]:
        """Extract HTTP requests/responses"""
        http_traffic = []

        # Parse HTTP packets
        # Extract: method, path, headers, body
        # Look for sensitive data, credentials, etc.

        return http_traffic

    def identify_lateral_movement(self, network_logs: List[Dict]) -> List[Dict]:
        """Identify lateral movement patterns"""
        findings = []

        # Look for:
        # - Internal port scanning
        # - Multiple failed auth attempts across systems
        # - Unusual internal connections
        # - Privilege escalation attempts
        # - Data exfiltration

        return findings

    def timeline_reconstruction(self, events: List[Dict]) -> List[Dict]:
        """Reconstruct timeline of security incident"""
        # Sort events by timestamp
        sorted_events = sorted(events, key=lambda x: x.get('timestamp', 0))

        timeline = []
        for event in sorted_events:
            timeline.append({
                'timestamp': event.get('timestamp'),
                'source': event.get('source'),
                'event_type': event.get('type'),
                'description': event.get('description'),
                'severity': event.get('severity')
            })

        return timeline

    @staticmethod
    def indicators_of_compromise() -> Dict:
        """Common IoCs to look for"""
        return {
            'network': [
                'Connections to known C2 servers',
                'Unusual outbound connections',
                'DNS requests to DGA domains',
                'Large data transfers',
                'Unusual protocol usage',
                'Port scanning activity'
            ],
            'host': [
                'Unexpected processes',
                'Modified system files',
                'New user accounts',
                'Scheduled tasks',
                'Registry modifications',
                'Unusual file access patterns'
            ],
            'application': [
                'Failed login attempts',
                'Privilege escalation',
                'Unusual API calls',
                'Error spikes',
                'Configuration changes'
            ]
        }
```

## Monitoring Best Practices

```python
class MonitoringBestPractices:
    """Network monitoring best practices"""

    RECOMMENDATIONS = """
    Network Monitoring Best Practices:

    1. Log Everything (with retention policy)
       ✓ Firewall logs
       ✓ IDS/IPS alerts
       ✓ Authentication logs
       ✓ Application logs
       ✓ Database queries
       ✓ Network flow data
       ✓ DNS queries

    2. Centralize Logs
       ✓ Use SIEM system
       ✓ Standardize timestamps (UTC)
       ✓ Normalize log formats
       ✓ Secure log transport (TLS)

    3. Real-Time Monitoring
       ✓ Automated alerting
       ✓ Correlation rules
       ✓ Anomaly detection
       ✓ Threat intelligence integration

    4. Baseline Normal Behavior
       ✓ Traffic patterns
       ✓ User behavior
       ✓ Application usage
       ✓ Network flows

    5. Retention and Compliance
       ✓ Meet regulatory requirements
       ✓ Balance storage costs
       ✓ Archive old logs
       ✓ Secure log storage

    6. Alert Fatigue Prevention
       ✓ Tune thresholds
       ✓ Reduce false positives
       ✓ Prioritize alerts
       ✓ Automated triage

    7. Regular Review
       ✓ Weekly log review
       ✓ Monthly trend analysis
       ✓ Quarterly rule updates
       ✓ Annual assessment

    8. Incident Response Integration
       ✓ Automated evidence collection
       ✓ Timeline reconstruction
       ✓ Playbook automation
       ✓ Post-incident analysis
    """

    @staticmethod
    def monitoring_metrics() -> Dict:
        """Key metrics to monitor"""
        return {
            'network': {
                'bandwidth_utilization': 'Track usage patterns, detect exfiltration',
                'connection_rate': 'Detect scanning, DDoS',
                'protocol_distribution': 'Detect unusual protocols',
                'geo_locations': 'Detect connections to unusual countries',
                'failed_connections': 'Detect scanning, blocked attacks'
            },
            'authentication': {
                'failed_logins': 'Detect brute force',
                'successful_logins': 'Track user activity',
                'privilege_escalation': 'Detect unauthorized access',
                'account_lockouts': 'Detect attacks, usability issues',
                'unusual_times': 'Detect after-hours access'
            },
            'application': {
                'error_rate': 'Detect attacks, issues',
                'response_time': 'Detect DoS, performance issues',
                'request_patterns': 'Detect scanning, abuse',
                'data_access': 'Detect unauthorized access',
                'configuration_changes': 'Detect tampering'
            }
        }
```

## Summary

Network monitoring is essential for security operations:

- **SIEM**: Centralize logs, correlate events, detect patterns across multiple sources
- **Log Analysis**: Parse logs, detect attacks (SQL injection, XSS, brute force), identify anomalies
- **Network Forensics**: Investigate incidents, reconstruct timelines, identify IoCs
- **Best Practices**: Log everything, centralize, real-time monitoring, tune alerts, integrate with IR
- **Key Metrics**: Monitor authentication, network traffic, application behavior

Effective monitoring requires: comprehensive log collection, centralized analysis, correlation rules, anomaly detection, and integration with incident response processes.
