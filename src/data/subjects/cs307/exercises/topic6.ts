import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'cs307-t6-ex01',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Parse TLS Version',
    difficulty: 1,
    description: 'Write a function to extract and validate TLS version from a server configuration string.',
    starterCode: `def parse_tls_version(config_line):
    # Extract TLS version (e.g., "TLSv1.2", "TLSv1.3")
    pass

print(parse_tls_version("ssl_protocols TLSv1.2 TLSv1.3;"))
print(parse_tls_version("ssl_protocols SSLv3;"))`,
    solution: `def parse_tls_version(config_line):
    versions = []
    if 'TLSv1.3' in config_line:
        versions.append('TLSv1.3')
    if 'TLSv1.2' in config_line:
        versions.append('TLSv1.2')
    if 'TLSv1.1' in config_line:
        versions.append('TLSv1.1')
    if 'TLSv1.0' in config_line:
        versions.append('TLSv1.0')

    return versions if versions else None

print(parse_tls_version("ssl_protocols TLSv1.2 TLSv1.3;"))
print(parse_tls_version("ssl_protocols SSLv3;"))`,
    testCases: [
      { input: '"ssl_protocols TLSv1.2 TLSv1.3;"', expectedOutput: "['TLSv1.3', 'TLSv1.2']", isHidden: false, description: 'Parse modern TLS' },
      { input: '"ssl_protocols SSLv3;"', expectedOutput: 'None', isHidden: false, description: 'No valid TLS' },
      { input: '"ssl_protocols TLSv1.0;"', expectedOutput: "['TLSv1.0']", isHidden: true, description: 'Old TLS version' }
    ],
    hints: [
      'Check for TLS version strings in config',
      'Return list of found versions',
      'Return None if no TLS versions found'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex02',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Validate Certificate Expiry',
    difficulty: 2,
    description: 'Write a function to check if a certificate expiry date is valid (not expired and not too far in future).',
    starterCode: `from datetime import datetime, timedelta

def is_valid_cert_date(expiry_date_str, current_date_str):
    # Check if cert is valid (not expired, not > 398 days)
    pass

print(is_valid_cert_date("2026-12-31", "2025-12-17"))
print(is_valid_cert_date("2025-01-01", "2025-12-17"))`,
    solution: `from datetime import datetime, timedelta

def is_valid_cert_date(expiry_date_str, current_date_str):
    try:
        expiry = datetime.strptime(expiry_date_str, "%Y-%m-%d")
        current = datetime.strptime(current_date_str, "%Y-%m-%d")

        # Check if expired
        if expiry <= current:
            return False

        # Check if validity period exceeds 398 days (browser limit)
        days_valid = (expiry - current).days
        if days_valid > 398:
            return False

        return True
    except ValueError:
        return False

print(is_valid_cert_date("2026-12-31", "2025-12-17"))
print(is_valid_cert_date("2025-01-01", "2025-12-17"))`,
    testCases: [
      { input: '"2026-12-31", "2025-12-17"', expectedOutput: 'False', isHidden: false, description: 'Too far in future' },
      { input: '"2025-01-01", "2025-12-17"', expectedOutput: 'False', isHidden: false, description: 'Already expired' },
      { input: '"2026-06-01", "2025-12-17"', expectedOutput: 'True', isHidden: true, description: 'Valid cert' }
    ],
    hints: [
      'Parse dates using datetime.strptime',
      'Check if expiry is after current date',
      'Verify validity period is <= 398 days',
      'Handle parsing errors'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex03',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Firewall Rule Parser',
    difficulty: 3,
    description: 'Write a function to parse a firewall rule and extract action, protocol, source, and destination.',
    starterCode: `def parse_firewall_rule(rule_string):
    # Parse: "ALLOW TCP 192.168.1.0/24 -> 10.0.0.5:443"
    # Return dict with action, protocol, source, dest
    pass

print(parse_firewall_rule("ALLOW TCP 192.168.1.0/24 -> 10.0.0.5:443"))
print(parse_firewall_rule("DENY UDP 0.0.0.0/0 -> 10.0.0.10:53"))`,
    solution: `def parse_firewall_rule(rule_string):
    try:
        parts = rule_string.split()
        if len(parts) < 5:
            return None

        action = parts[0]
        protocol = parts[1]
        source = parts[2]
        # parts[3] is '->'
        destination = parts[4]

        return {
            'action': action,
            'protocol': protocol,
            'source': source,
            'destination': destination
        }
    except (IndexError, ValueError):
        return None

print(parse_firewall_rule("ALLOW TCP 192.168.1.0/24 -> 10.0.0.5:443"))
print(parse_firewall_rule("DENY UDP 0.0.0.0/0 -> 10.0.0.10:53"))`,
    testCases: [
      { input: '"ALLOW TCP 192.168.1.0/24 -> 10.0.0.5:443"', expectedOutput: 'dict with action=ALLOW', isHidden: false, description: 'Parse ALLOW rule' },
      { input: '"DENY UDP 0.0.0.0/0 -> 10.0.0.10:53"', expectedOutput: 'dict with protocol=UDP', isHidden: false, description: 'Parse DENY rule' },
      { input: '"INVALID RULE"', expectedOutput: 'None', isHidden: true, description: 'Invalid rule format' }
    ],
    hints: [
      'Split rule string by spaces',
      'Extract action (first word)',
      'Extract protocol (second word)',
      'Parse source and destination'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex04',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Validate IP Address',
    difficulty: 2,
    description: 'Write a function to validate if a string is a valid IPv4 address.',
    starterCode: `def is_valid_ipv4(ip_string):
    # Validate IPv4 format (e.g., "192.168.1.1")
    pass

print(is_valid_ipv4("192.168.1.1"))
print(is_valid_ipv4("256.1.1.1"))
print(is_valid_ipv4("192.168.1"))`,
    solution: `def is_valid_ipv4(ip_string):
    try:
        parts = ip_string.split('.')

        # Must have exactly 4 parts
        if len(parts) != 4:
            return False

        # Each part must be 0-255
        for part in parts:
            num = int(part)
            if num < 0 or num > 255:
                return False

            # No leading zeros (except for "0")
            if len(part) > 1 and part[0] == '0':
                return False

        return True
    except (ValueError, AttributeError):
        return False

print(is_valid_ipv4("192.168.1.1"))
print(is_valid_ipv4("256.1.1.1"))
print(is_valid_ipv4("192.168.1"))`,
    testCases: [
      { input: '"192.168.1.1"', expectedOutput: 'True', isHidden: false, description: 'Valid IPv4' },
      { input: '"256.1.1.1"', expectedOutput: 'False', isHidden: false, description: 'Octet out of range' },
      { input: '"192.168.1"', expectedOutput: 'False', isHidden: true, description: 'Incomplete address' }
    ],
    hints: [
      'Split on dots, must have 4 parts',
      'Each part must be 0-255',
      'Reject leading zeros',
      'Handle conversion errors'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex05',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Parse Security Log Entry',
    difficulty: 3,
    description: 'Write a function to parse a security log entry and extract timestamp, IP, action, and status.',
    starterCode: `def parse_security_log(log_line):
    # Parse: "2025-12-17 10:30:45 192.168.1.100 LOGIN SUCCESS"
    pass

print(parse_security_log("2025-12-17 10:30:45 192.168.1.100 LOGIN SUCCESS"))
print(parse_security_log("2025-12-17 10:31:00 10.0.0.50 ACCESS DENIED"))`,
    solution: `def parse_security_log(log_line):
    try:
        parts = log_line.split()
        if len(parts) < 5:
            return None

        timestamp = f"{parts[0]} {parts[1]}"
        ip_address = parts[2]
        action = parts[3]
        status = parts[4]

        return {
            'timestamp': timestamp,
            'ip': ip_address,
            'action': action,
            'status': status
        }
    except (IndexError, ValueError):
        return None

print(parse_security_log("2025-12-17 10:30:45 192.168.1.100 LOGIN SUCCESS"))
print(parse_security_log("2025-12-17 10:31:00 10.0.0.50 ACCESS DENIED"))`,
    testCases: [
      { input: '"2025-12-17 10:30:45 192.168.1.100 LOGIN SUCCESS"', expectedOutput: 'dict with status=SUCCESS', isHidden: false, description: 'Parse successful login' },
      { input: '"2025-12-17 10:31:00 10.0.0.50 ACCESS DENIED"', expectedOutput: 'dict with action=ACCESS', isHidden: false, description: 'Parse denied access' },
      { input: '"INVALID LOG"', expectedOutput: 'None', isHidden: true, description: 'Invalid format' }
    ],
    hints: [
      'Split by spaces',
      'Combine first two parts for timestamp',
      'Extract IP, action, and status',
      'Handle malformed logs'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex06',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Detect Port Scan',
    difficulty: 4,
    description: 'Write a function to detect potential port scans by analyzing connection attempts from the same IP.',
    starterCode: `def detect_port_scan(connection_logs):
    # connection_logs: list of (ip, port, timestamp) tuples
    # Return IPs with > 10 different ports in 60 seconds
    pass

logs = [
    ("192.168.1.50", 80, 100),
    ("192.168.1.50", 443, 105),
    ("192.168.1.50", 22, 110),
    # ... more ports
]
print(detect_port_scan(logs))`,
    solution: `def detect_port_scan(connection_logs):
    from collections import defaultdict

    # Group by IP
    ip_connections = defaultdict(list)

    for ip, port, timestamp in connection_logs:
        ip_connections[ip].append((port, timestamp))

    suspicious_ips = []

    for ip, connections in ip_connections.items():
        # Check for different ports in short time
        unique_ports = set()
        min_time = float('inf')
        max_time = 0

        for port, timestamp in connections:
            unique_ports.add(port)
            min_time = min(min_time, timestamp)
            max_time = max(max_time, timestamp)

        time_window = max_time - min_time

        # If > 10 different ports in <= 60 seconds
        if len(unique_ports) > 10 and time_window <= 60:
            suspicious_ips.append(ip)

    return suspicious_ips

logs = [
    ("192.168.1.50", 80, 100),
    ("192.168.1.50", 443, 105),
    ("192.168.1.50", 22, 110),
]
print(detect_port_scan(logs))`,
    testCases: [
      { input: 'logs with 15 ports in 60s', expectedOutput: 'Returns IP', isHidden: false, description: 'Detect scan' },
      { input: 'logs with 5 ports', expectedOutput: 'Empty list', isHidden: false, description: 'Normal traffic' },
      { input: 'logs with 15 ports in 120s', expectedOutput: 'Empty list', isHidden: true, description: 'Too slow for scan' }
    ],
    hints: [
      'Group connections by source IP',
      'Count unique ports per IP',
      'Calculate time window',
      'Flag IPs with > 10 ports in <= 60s'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex07',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Validate Subnet Mask',
    difficulty: 2,
    description: 'Write a function to validate if a subnet mask is valid (contiguous 1s followed by 0s in binary).',
    starterCode: `def is_valid_subnet_mask(mask):
    # Validate subnet mask (e.g., "255.255.255.0")
    pass

print(is_valid_subnet_mask("255.255.255.0"))
print(is_valid_subnet_mask("255.255.0.255"))`,
    solution: `def is_valid_subnet_mask(mask):
    try:
        # Parse octets
        octets = mask.split('.')
        if len(octets) != 4:
            return False

        # Convert to binary
        binary_str = ''
        for octet in octets:
            num = int(octet)
            if num < 0 or num > 255:
                return False
            binary_str += format(num, '08b')

        # Check for contiguous 1s followed by 0s
        # Valid pattern: 1*0* (all 1s, then all 0s)
        seen_zero = False
        for bit in binary_str:
            if bit == '0':
                seen_zero = True
            elif seen_zero:  # Found 1 after 0
                return False

        return True
    except (ValueError, AttributeError):
        return False

print(is_valid_subnet_mask("255.255.255.0"))
print(is_valid_subnet_mask("255.255.0.255"))`,
    testCases: [
      { input: '"255.255.255.0"', expectedOutput: 'True', isHidden: false, description: 'Valid /24 mask' },
      { input: '"255.255.0.255"', expectedOutput: 'False', isHidden: false, description: 'Non-contiguous bits' },
      { input: '"255.255.255.128"', expectedOutput: 'True', isHidden: true, description: 'Valid /25 mask' }
    ],
    hints: [
      'Convert mask to binary representation',
      'Check for pattern: 1s followed by 0s',
      'No 1s should appear after first 0',
      'Validate each octet is 0-255'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex08',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Check Weak Cipher Suite',
    difficulty: 2,
    description: 'Write a function to check if a cipher suite is considered weak or deprecated.',
    starterCode: `def is_weak_cipher(cipher_name):
    # Check if cipher uses weak algorithms
    pass

print(is_weak_cipher("TLS_RSA_WITH_AES_128_GCM_SHA256"))
print(is_weak_cipher("TLS_RSA_WITH_DES_CBC_SHA"))`,
    solution: `def is_weak_cipher(cipher_name):
    weak_algorithms = [
        'DES',
        'RC4',
        'MD5',
        '3DES',
        'NULL',
        'EXPORT',
        'anon',
        'ADH'
    ]

    cipher_upper = cipher_name.upper()

    for weak in weak_algorithms:
        if weak in cipher_upper:
            return True

    # Also check for very old SSL versions
    if cipher_upper.startswith('SSL_'):
        return True

    return False

print(is_weak_cipher("TLS_RSA_WITH_AES_128_GCM_SHA256"))
print(is_weak_cipher("TLS_RSA_WITH_DES_CBC_SHA"))`,
    testCases: [
      { input: '"TLS_RSA_WITH_AES_128_GCM_SHA256"', expectedOutput: 'False', isHidden: false, description: 'Strong cipher' },
      { input: '"TLS_RSA_WITH_DES_CBC_SHA"', expectedOutput: 'True', isHidden: false, description: 'Weak DES cipher' },
      { input: '"TLS_RSA_WITH_RC4_128_SHA"', expectedOutput: 'True', isHidden: true, description: 'Weak RC4 cipher' }
    ],
    hints: [
      'List weak algorithms: DES, RC4, MD5, 3DES',
      'Check if cipher name contains weak algorithm',
      'Flag SSL_ prefixed ciphers as weak',
      'Use case-insensitive comparison'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex09',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Calculate Network Address',
    difficulty: 3,
    description: 'Write a function to calculate the network address from an IP and subnet mask.',
    starterCode: `def get_network_address(ip, mask):
    # Calculate network address using bitwise AND
    pass

print(get_network_address("192.168.1.100", "255.255.255.0"))
print(get_network_address("10.20.30.40", "255.255.0.0"))`,
    solution: `def get_network_address(ip, mask):
    try:
        # Parse IP octets
        ip_parts = [int(x) for x in ip.split('.')]
        mask_parts = [int(x) for x in mask.split('.')]

        if len(ip_parts) != 4 or len(mask_parts) != 4:
            return None

        # Bitwise AND each octet
        network_parts = []
        for i in range(4):
            network_parts.append(ip_parts[i] & mask_parts[i])

        return '.'.join(map(str, network_parts))
    except (ValueError, IndexError):
        return None

print(get_network_address("192.168.1.100", "255.255.255.0"))
print(get_network_address("10.20.30.40", "255.255.0.0"))`,
    testCases: [
      { input: '"192.168.1.100", "255.255.255.0"', expectedOutput: '"192.168.1.0"', isHidden: false, description: '/24 network' },
      { input: '"10.20.30.40", "255.255.0.0"', expectedOutput: '"10.20.0.0"', isHidden: false, description: '/16 network' },
      { input: '"172.16.50.25", "255.255.255.128"', expectedOutput: '"172.16.50.0"', isHidden: true, description: '/25 network' }
    ],
    hints: [
      'Split IP and mask into octets',
      'Convert each octet to integer',
      'Use bitwise AND (&) on each pair',
      'Join results back to dotted notation'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex10',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Analyze Failed Login Attempts',
    difficulty: 3,
    description: 'Write a function to identify IPs with excessive failed login attempts (potential brute force).',
    starterCode: `def detect_brute_force(login_logs):
    # login_logs: list of (ip, status, timestamp) tuples
    # Return IPs with >= 5 failures in 300 seconds
    pass

logs = [
    ("192.168.1.50", "FAIL", 1000),
    ("192.168.1.50", "FAIL", 1050),
    # ...
]
print(detect_brute_force(logs))`,
    solution: `def detect_brute_force(login_logs):
    from collections import defaultdict

    # Group failures by IP
    ip_failures = defaultdict(list)

    for ip, status, timestamp in login_logs:
        if status == "FAIL":
            ip_failures[ip].append(timestamp)

    suspicious_ips = []

    for ip, timestamps in ip_failures.items():
        if len(timestamps) < 5:
            continue

        # Sort timestamps
        timestamps.sort()

        # Check for 5+ failures in 300 second window
        for i in range(len(timestamps) - 4):
            window = timestamps[i + 4] - timestamps[i]
            if window <= 300:
                suspicious_ips.append(ip)
                break

    return suspicious_ips

logs = [
    ("192.168.1.50", "FAIL", 1000),
    ("192.168.1.50", "FAIL", 1050),
]
print(detect_brute_force(logs))`,
    testCases: [
      { input: 'logs with 6 failures in 200s', expectedOutput: 'Returns IP', isHidden: false, description: 'Detect brute force' },
      { input: 'logs with 3 failures', expectedOutput: 'Empty list', isHidden: false, description: 'Too few failures' },
      { input: 'logs with 5 failures in 400s', expectedOutput: 'Empty list', isHidden: true, description: 'Window too large' }
    ],
    hints: [
      'Filter for failed login attempts',
      'Group by source IP',
      'Check for 5+ failures in 300s window',
      'Use sliding window approach'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex11',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Validate DNS Record',
    difficulty: 2,
    description: 'Write a function to validate a DNS A record format.',
    starterCode: `def is_valid_dns_a_record(record):
    # Validate: "hostname.example.com IN A 192.168.1.1"
    pass

print(is_valid_dns_a_record("www.example.com IN A 192.168.1.1"))
print(is_valid_dns_a_record("invalid record"))`,
    solution: `def is_valid_dns_a_record(record):
    try:
        parts = record.split()
        if len(parts) != 4:
            return False

        hostname, in_class, record_type, ip_address = parts

        # Check IN class
        if in_class != "IN":
            return False

        # Check A record type
        if record_type != "A":
            return False

        # Validate IP address
        ip_parts = ip_address.split('.')
        if len(ip_parts) != 4:
            return False

        for part in ip_parts:
            num = int(part)
            if num < 0 or num > 255:
                return False

        return True
    except (ValueError, IndexError):
        return False

print(is_valid_dns_a_record("www.example.com IN A 192.168.1.1"))
print(is_valid_dns_a_record("invalid record"))`,
    testCases: [
      { input: '"www.example.com IN A 192.168.1.1"', expectedOutput: 'True', isHidden: false, description: 'Valid A record' },
      { input: '"invalid record"', expectedOutput: 'False', isHidden: false, description: 'Invalid format' },
      { input: '"test.com IN A 256.1.1.1"', expectedOutput: 'False', isHidden: true, description: 'Invalid IP' }
    ],
    hints: [
      'Split record into 4 parts',
      'Verify IN class and A type',
      'Validate IP address format',
      'Handle parsing errors'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex12',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Parse HTTP Security Headers',
    difficulty: 3,
    description: 'Write a function to extract security headers from HTTP response headers.',
    starterCode: `def extract_security_headers(headers_dict):
    # Extract: CSP, HSTS, X-Frame-Options, etc.
    pass

headers = {
    "Content-Type": "text/html",
    "Strict-Transport-Security": "max-age=31536000",
    "X-Frame-Options": "DENY"
}
print(extract_security_headers(headers))`,
    solution: `def extract_security_headers(headers_dict):
    security_header_names = [
        'Strict-Transport-Security',
        'Content-Security-Policy',
        'X-Frame-Options',
        'X-Content-Type-Options',
        'X-XSS-Protection',
        'Referrer-Policy'
    ]

    security_headers = {}

    for header in security_header_names:
        # Case-insensitive lookup
        for key, value in headers_dict.items():
            if key.lower() == header.lower():
                security_headers[header] = value
                break

    return security_headers

headers = {
    "Content-Type": "text/html",
    "Strict-Transport-Security": "max-age=31536000",
    "X-Frame-Options": "DENY"
}
print(extract_security_headers(headers))`,
    testCases: [
      { input: 'headers with HSTS', expectedOutput: 'dict with HSTS', isHidden: false, description: 'Extract HSTS' },
      { input: 'headers with no security', expectedOutput: 'Empty dict', isHidden: false, description: 'No security headers' },
      { input: 'headers with CSP', expectedOutput: 'dict with CSP', isHidden: true, description: 'Extract CSP' }
    ],
    hints: [
      'Define list of security header names',
      'Search headers dictionary case-insensitively',
      'Return dict of found security headers',
      'Include HSTS, CSP, X-Frame-Options'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex13',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Validate MAC Address',
    difficulty: 1,
    description: 'Write a function to validate MAC address format.',
    starterCode: `def is_valid_mac_address(mac):
    # Validate: "AA:BB:CC:DD:EE:FF" or "AA-BB-CC-DD-EE-FF"
    pass

print(is_valid_mac_address("AA:BB:CC:DD:EE:FF"))
print(is_valid_mac_address("AA:BB:CC:DD:EE"))
print(is_valid_mac_address("GG:HH:II:JJ:KK:LL"))`,
    solution: `def is_valid_mac_address(mac):
    import re

    # Support both : and - separators
    pattern = r'^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$'

    if re.match(pattern, mac):
        return True
    return False

print(is_valid_mac_address("AA:BB:CC:DD:EE:FF"))
print(is_valid_mac_address("AA:BB:CC:DD:EE"))
print(is_valid_mac_address("GG:HH:II:JJ:KK:LL"))`,
    testCases: [
      { input: '"AA:BB:CC:DD:EE:FF"', expectedOutput: 'True', isHidden: false, description: 'Valid MAC with colons' },
      { input: '"AA:BB:CC:DD:EE"', expectedOutput: 'False', isHidden: false, description: 'Incomplete MAC' },
      { input: '"AA-BB-CC-DD-EE-FF"', expectedOutput: 'True', isHidden: true, description: 'Valid MAC with dashes' }
    ],
    hints: [
      'MAC has 6 pairs of hex digits',
      'Separated by : or -',
      'Use regex or manual parsing',
      'Validate hex characters (0-9, A-F)'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex14',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Detect DNS Tunneling',
    difficulty: 4,
    description: 'Write a function to detect potential DNS tunneling based on suspicious domain patterns.',
    starterCode: `def detect_dns_tunneling(dns_queries):
    # dns_queries: list of domain names
    # Flag long, random-looking subdomains
    pass

queries = [
    "www.google.com",
    "a3f9d8e2b1c4.malicious.com",
    "very-long-random-subdomain-xyz123abc.evil.com"
]
print(detect_dns_tunneling(queries))`,
    solution: `def detect_dns_tunneling(dns_queries):
    suspicious_domains = []

    for domain in dns_queries:
        parts = domain.split('.')

        for part in parts[:-2]:  # Exclude TLD and domain
            # Check subdomain length
            if len(part) > 20:
                suspicious_domains.append(domain)
                break

            # Check for high entropy (random-looking)
            if len(part) > 10:
                # Count hex-like characters
                hex_chars = sum(1 for c in part if c in '0123456789abcdef')
                if hex_chars / len(part) > 0.6:  # 60% hex chars
                    suspicious_domains.append(domain)
                    break

    return suspicious_domains

queries = [
    "www.google.com",
    "a3f9d8e2b1c4.malicious.com",
    "very-long-random-subdomain-xyz123abc.evil.com"
]
print(detect_dns_tunneling(queries))`,
    testCases: [
      { input: 'Normal domains', expectedOutput: 'Empty list', isHidden: false, description: 'Legitimate DNS' },
      { input: 'Long random subdomain', expectedOutput: 'Returns domain', isHidden: false, description: 'Detect tunneling' },
      { input: 'High entropy subdomain', expectedOutput: 'Returns domain', isHidden: true, description: 'Detect encoded data' }
    ],
    hints: [
      'Check subdomain length (> 20 chars suspicious)',
      'Calculate entropy or randomness',
      'Look for hex-encoded patterns',
      'Exclude normal TLD and domain'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex15',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'VPN Log Parser',
    difficulty: 3,
    description: 'Write a function to parse VPN connection logs and extract user, timestamp, and connection status.',
    starterCode: `def parse_vpn_log(log_line):
    # Parse: "2025-12-17 10:00:00 user@example.com CONNECTED from 203.0.113.5"
    pass

print(parse_vpn_log("2025-12-17 10:00:00 user@example.com CONNECTED from 203.0.113.5"))`,
    solution: `def parse_vpn_log(log_line):
    try:
        parts = log_line.split()
        if len(parts) < 6:
            return None

        timestamp = f"{parts[0]} {parts[1]}"
        user = parts[2]
        status = parts[3]
        # parts[4] is "from"
        source_ip = parts[5]

        return {
            'timestamp': timestamp,
            'user': user,
            'status': status,
            'source_ip': source_ip
        }
    except (IndexError, ValueError):
        return None

print(parse_vpn_log("2025-12-17 10:00:00 user@example.com CONNECTED from 203.0.113.5"))`,
    testCases: [
      { input: 'VPN connect log', expectedOutput: 'dict with status=CONNECTED', isHidden: false, description: 'Parse connection' },
      { input: 'VPN disconnect log', expectedOutput: 'dict with status=DISCONNECTED', isHidden: false, description: 'Parse disconnection' },
      { input: 'Invalid log', expectedOutput: 'None', isHidden: true, description: 'Handle errors' }
    ],
    hints: [
      'Split log line by spaces',
      'Extract timestamp (first two parts)',
      'Parse user, status, and source IP',
      'Handle malformed logs'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t6-ex16',
    subjectId: 'cs307',
    topicId: 'cs307-topic-6',
    title: 'Check Certificate Chain',
    difficulty: 4,
    description: 'Write a function to validate a certificate chain by checking issuer/subject relationships.',
    starterCode: `def validate_cert_chain(certificates):
    # certificates: list of dicts with 'subject' and 'issuer'
    # Verify chain: each cert issued by next in chain
    pass

certs = [
    {"subject": "www.example.com", "issuer": "Intermediate CA"},
    {"subject": "Intermediate CA", "issuer": "Root CA"},
    {"subject": "Root CA", "issuer": "Root CA"}
]
print(validate_cert_chain(certs))`,
    solution: `def validate_cert_chain(certificates):
    if not certificates:
        return False

    # Check each cert is issued by the next
    for i in range(len(certificates) - 1):
        current_cert = certificates[i]
        next_cert = certificates[i + 1]

        # Current cert's issuer should match next cert's subject
        if current_cert['issuer'] != next_cert['subject']:
            return False

    # Last cert should be self-signed (root CA)
    last_cert = certificates[-1]
    if last_cert['subject'] != last_cert['issuer']:
        return False

    return True

certs = [
    {"subject": "www.example.com", "issuer": "Intermediate CA"},
    {"subject": "Intermediate CA", "issuer": "Root CA"},
    {"subject": "Root CA", "issuer": "Root CA"}
]
print(validate_cert_chain(certs))`,
    testCases: [
      { input: 'Valid cert chain', expectedOutput: 'True', isHidden: false, description: 'Valid chain' },
      { input: 'Broken chain', expectedOutput: 'False', isHidden: false, description: 'Invalid chain' },
      { input: 'No root CA', expectedOutput: 'False', isHidden: true, description: 'Missing self-signed root' }
    ],
    hints: [
      'Check each cert is issued by next in chain',
      'Verify issuer of cert[i] matches subject of cert[i+1]',
      'Last cert should be self-signed (root CA)',
      'Root CA: subject == issuer'
    ],
    language: 'python'
  }
];
