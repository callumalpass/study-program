import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'cs307-t7-ex01',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Parse Vulnerability Severity',
    difficulty: 1,
    description: 'Write a function to parse vulnerability severity from a scan report line.',
    starterCode: `def parse_severity(report_line):
    # Extract: CRITICAL, HIGH, MEDIUM, LOW, INFO
    pass

print(parse_severity("CVE-2024-1234 | HIGH | SQL Injection in login.php"))
print(parse_severity("CVE-2024-5678 | LOW | Information disclosure"))`,
    solution: `def parse_severity(report_line):
    severities = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO']

    parts = report_line.split('|')
    if len(parts) < 2:
        return None

    severity_part = parts[1].strip().upper()

    if severity_part in severities:
        return severity_part

    return None

print(parse_severity("CVE-2024-1234 | HIGH | SQL Injection in login.php"))
print(parse_severity("CVE-2024-5678 | LOW | Information disclosure"))`,
    testCases: [
      { input: '"CVE-2024-1234 | HIGH | SQL Injection"', expectedOutput: '"HIGH"', isHidden: false, description: 'Parse HIGH severity' },
      { input: '"CVE-2024-5678 | LOW | Info leak"', expectedOutput: '"LOW"', isHidden: false, description: 'Parse LOW severity' },
      { input: '"Invalid format"', expectedOutput: 'None', isHidden: true, description: 'Invalid format' }
    ],
    hints: [
      'Split on pipe character |',
      'Severity is in second field',
      'Strip whitespace and convert to uppercase',
      'Validate against known severities'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex02',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Calculate CVSS Base Score',
    difficulty: 3,
    description: 'Write a simplified function to calculate CVSS v3 base score from attack vector and impact values.',
    starterCode: `def calculate_cvss_base(attack_vector, impact):
    # attack_vector: 'NETWORK'=0.85, 'ADJACENT'=0.62, 'LOCAL'=0.55, 'PHYSICAL'=0.2
    # impact: 'HIGH'=0.56, 'LOW'=0.22, 'NONE'=0
    # Formula: min(10, attack_vector * impact * 10)
    pass

print(calculate_cvss_base('NETWORK', 'HIGH'))
print(calculate_cvss_base('LOCAL', 'LOW'))`,
    solution: `def calculate_cvss_base(attack_vector, impact):
    av_values = {
        'NETWORK': 0.85,
        'ADJACENT': 0.62,
        'LOCAL': 0.55,
        'PHYSICAL': 0.2
    }

    impact_values = {
        'HIGH': 0.56,
        'LOW': 0.22,
        'NONE': 0
    }

    if attack_vector not in av_values or impact not in impact_values:
        return None

    av = av_values[attack_vector]
    imp = impact_values[impact]

    # Simplified CVSS calculation
    score = min(10.0, av * imp * 10)
    return round(score, 1)

print(calculate_cvss_base('NETWORK', 'HIGH'))
print(calculate_cvss_base('LOCAL', 'LOW'))`,
    testCases: [
      { input: "'NETWORK', 'HIGH'", expectedOutput: '4.8', isHidden: false, description: 'Network attack, high impact' },
      { input: "'LOCAL', 'LOW'", expectedOutput: '1.2', isHidden: false, description: 'Local attack, low impact' },
      { input: "'PHYSICAL', 'NONE'", expectedOutput: '0.0', isHidden: true, description: 'No impact' }
    ],
    hints: [
      'Create dictionaries for AV and Impact values',
      'Multiply AV * Impact * 10',
      'Use min() to cap at 10.0',
      'Round to 1 decimal place'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex03',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Parse CVE Identifier',
    difficulty: 1,
    description: 'Write a function to validate and parse CVE identifiers.',
    starterCode: `def parse_cve(cve_string):
    # Valid format: CVE-YYYY-NNNNN (year and ID)
    pass

print(parse_cve("CVE-2024-12345"))
print(parse_cve("CVE-99-123"))
print(parse_cve("INVALID"))`,
    solution: `def parse_cve(cve_string):
    import re

    # CVE format: CVE-YYYY-NNNNN+
    pattern = r'^CVE-(\\d{4})-(\\d{4,})$'

    match = re.match(pattern, cve_string)
    if not match:
        return None

    year = int(match.group(1))
    cve_id = match.group(2)

    # Year should be reasonable (1999-2099)
    if year < 1999 or year > 2099:
        return None

    return {
        'year': year,
        'id': cve_id,
        'full': cve_string
    }

print(parse_cve("CVE-2024-12345"))
print(parse_cve("CVE-99-123"))
print(parse_cve("INVALID"))`,
    testCases: [
      { input: '"CVE-2024-12345"', expectedOutput: 'dict with year=2024', isHidden: false, description: 'Valid CVE' },
      { input: '"CVE-99-123"', expectedOutput: 'None', isHidden: false, description: 'Invalid year' },
      { input: '"INVALID"', expectedOutput: 'None', isHidden: true, description: 'Not CVE format' }
    ],
    hints: [
      'Use regex to match CVE-YYYY-NNNNN',
      'Year is 4 digits',
      'ID is 4 or more digits',
      'Validate year is reasonable (1999-2099)'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex04',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Categorize Vulnerability Type',
    difficulty: 2,
    description: 'Write a function to categorize vulnerability based on description keywords.',
    starterCode: `def categorize_vulnerability(description):
    # Categories: SQL Injection, XSS, CSRF, Buffer Overflow, etc.
    pass

print(categorize_vulnerability("SQL injection in user login form"))
print(categorize_vulnerability("Cross-site scripting in comment field"))`,
    solution: `def categorize_vulnerability(description):
    desc_lower = description.lower()

    categories = {
        'SQL Injection': ['sql injection', 'sqli', 'sql inject'],
        'XSS': ['cross-site scripting', 'xss', 'javascript injection'],
        'CSRF': ['cross-site request forgery', 'csrf'],
        'Buffer Overflow': ['buffer overflow', 'bof', 'stack overflow'],
        'Authentication': ['authentication', 'auth bypass', 'broken auth'],
        'Access Control': ['access control', 'authorization', 'privilege escalation'],
        'Cryptographic': ['weak encryption', 'crypto', 'insecure hash'],
        'Information Disclosure': ['information disclosure', 'info leak', 'exposure']
    }

    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword in desc_lower:
                return category

    return 'Other'

print(categorize_vulnerability("SQL injection in user login form"))
print(categorize_vulnerability("Cross-site scripting in comment field"))`,
    testCases: [
      { input: '"SQL injection in login"', expectedOutput: '"SQL Injection"', isHidden: false, description: 'Detect SQLi' },
      { input: '"Cross-site scripting in comments"', expectedOutput: '"XSS"', isHidden: false, description: 'Detect XSS' },
      { input: '"Buffer overflow in parser"', expectedOutput: '"Buffer Overflow"', isHidden: true, description: 'Detect BOF' }
    ],
    hints: [
      'Create dictionary of categories and keywords',
      'Convert description to lowercase',
      'Check for keyword matches',
      'Return first matching category'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex05',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Security Checklist Validator',
    difficulty: 2,
    description: 'Write a function to validate that all security checklist items are marked as complete.',
    starterCode: `def validate_security_checklist(checklist):
    # checklist: dict with items and status (True/False)
    # Return list of incomplete items
    pass

checklist = {
    "HTTPS enabled": True,
    "SQL injection testing": False,
    "Password hashing": True,
    "CSRF protection": False
}
print(validate_security_checklist(checklist))`,
    solution: `def validate_security_checklist(checklist):
    incomplete_items = []

    for item, status in checklist.items():
        if not status:
            incomplete_items.append(item)

    return incomplete_items

checklist = {
    "HTTPS enabled": True,
    "SQL injection testing": False,
    "Password hashing": True,
    "CSRF protection": False
}
print(validate_security_checklist(checklist))`,
    testCases: [
      { input: 'Checklist with some incomplete', expectedOutput: 'List of incomplete items', isHidden: false, description: 'Find incomplete items' },
      { input: 'All items complete', expectedOutput: 'Empty list', isHidden: false, description: 'All complete' },
      { input: 'All items incomplete', expectedOutput: 'All items listed', isHidden: true, description: 'None complete' }
    ],
    hints: [
      'Iterate through checklist items',
      'Check if status is False',
      'Add incomplete items to list',
      'Return list of incomplete items'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex06',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Risk Score Calculator',
    difficulty: 3,
    description: 'Write a function to calculate overall risk score from likelihood and impact ratings.',
    starterCode: `def calculate_risk_score(likelihood, impact):
    # likelihood: 1-5 (1=rare, 5=certain)
    # impact: 1-5 (1=negligible, 5=catastrophic)
    # Risk = likelihood * impact
    # Return: score and category (LOW, MEDIUM, HIGH, CRITICAL)
    pass

print(calculate_risk_score(3, 4))
print(calculate_risk_score(1, 2))`,
    solution: `def calculate_risk_score(likelihood, impact):
    if not (1 <= likelihood <= 5 and 1 <= impact <= 5):
        return None

    score = likelihood * impact

    # Categorize risk
    if score <= 4:
        category = 'LOW'
    elif score <= 9:
        category = 'MEDIUM'
    elif score <= 16:
        category = 'HIGH'
    else:
        category = 'CRITICAL'

    return {
        'score': score,
        'category': category,
        'likelihood': likelihood,
        'impact': impact
    }

print(calculate_risk_score(3, 4))
print(calculate_risk_score(1, 2))`,
    testCases: [
      { input: '3, 4', expectedOutput: 'score=12, category=HIGH', isHidden: false, description: 'High risk' },
      { input: '1, 2', expectedOutput: 'score=2, category=LOW', isHidden: false, description: 'Low risk' },
      { input: '5, 5', expectedOutput: 'score=25, category=CRITICAL', isHidden: true, description: 'Critical risk' }
    ],
    hints: [
      'Multiply likelihood by impact',
      'Score 1-4: LOW',
      'Score 5-9: MEDIUM',
      'Score 10-16: HIGH, 17+: CRITICAL'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex07',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Parse Nmap Output',
    difficulty: 3,
    description: 'Write a function to parse Nmap scan output and extract open ports.',
    starterCode: `def parse_nmap_output(nmap_line):
    # Parse: "80/tcp   open  http"
    pass

print(parse_nmap_output("80/tcp   open  http"))
print(parse_nmap_output("443/tcp  open  https"))
print(parse_nmap_output("22/tcp   closed ssh"))`,
    solution: `def parse_nmap_output(nmap_line):
    try:
        parts = nmap_line.split()
        if len(parts) < 3:
            return None

        # Parse port/protocol
        port_proto = parts[0].split('/')
        if len(port_proto) != 2:
            return None

        port = int(port_proto[0])
        protocol = port_proto[1]
        state = parts[1]
        service = parts[2] if len(parts) > 2 else 'unknown'

        # Only return if port is open
        if state != 'open':
            return None

        return {
            'port': port,
            'protocol': protocol,
            'state': state,
            'service': service
        }
    except (ValueError, IndexError):
        return None

print(parse_nmap_output("80/tcp   open  http"))
print(parse_nmap_output("443/tcp  open  https"))
print(parse_nmap_output("22/tcp   closed ssh"))`,
    testCases: [
      { input: '"80/tcp   open  http"', expectedOutput: 'dict with port=80', isHidden: false, description: 'Parse open HTTP port' },
      { input: '"443/tcp  open  https"', expectedOutput: 'dict with service=https', isHidden: false, description: 'Parse open HTTPS port' },
      { input: '"22/tcp   closed ssh"', expectedOutput: 'None', isHidden: true, description: 'Ignore closed ports' }
    ],
    hints: [
      'Split line by whitespace',
      'Parse port/protocol from first field',
      'Extract state and service',
      'Only return open ports'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex08',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Static Analysis Rule',
    difficulty: 2,
    description: 'Write a function to detect hardcoded passwords in code (simple pattern matching).',
    starterCode: `def detect_hardcoded_password(code_line):
    # Detect patterns like: password = "secret123"
    pass

print(detect_hardcoded_password('password = "secret123"'))
print(detect_hardcoded_password('user = "admin"'))`,
    solution: `def detect_hardcoded_password(code_line):
    import re

    # Patterns for hardcoded passwords
    patterns = [
        r'password\\s*=\\s*["\']\\w+["\']',
        r'passwd\\s*=\\s*["\']\\w+["\']',
        r'pwd\\s*=\\s*["\']\\w+["\']',
        r'secret\\s*=\\s*["\']\\w+["\']'
    ]

    code_lower = code_line.lower()

    for pattern in patterns:
        if re.search(pattern, code_lower):
            return True

    return False

print(detect_hardcoded_password('password = "secret123"'))
print(detect_hardcoded_password('user = "admin"'))`,
    testCases: [
      { input: '\'password = "secret123"\'', expectedOutput: 'True', isHidden: false, description: 'Detect hardcoded password' },
      { input: '\'user = "admin"\'', expectedOutput: 'False', isHidden: false, description: 'Not a password' },
      { input: '\'SECRET = "key123"\'', expectedOutput: 'True', isHidden: true, description: 'Detect secret' }
    ],
    hints: [
      'Use regex to match password patterns',
      'Look for: password, passwd, pwd, secret',
      'Match = followed by quoted string',
      'Case-insensitive matching'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex09',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Vulnerability Report Aggregator',
    difficulty: 4,
    description: 'Write a function to aggregate vulnerability counts by severity from multiple scan results.',
    starterCode: `def aggregate_vulnerabilities(scan_results):
    # scan_results: list of dicts with 'severity' key
    # Return counts by severity level
    pass

results = [
    {"id": "V1", "severity": "HIGH"},
    {"id": "V2", "severity": "MEDIUM"},
    {"id": "V3", "severity": "HIGH"},
    {"id": "V4", "severity": "LOW"}
]
print(aggregate_vulnerabilities(results))`,
    solution: `def aggregate_vulnerabilities(scan_results):
    from collections import defaultdict

    severity_counts = defaultdict(int)

    for result in scan_results:
        severity = result.get('severity', 'UNKNOWN')
        severity_counts[severity] += 1

    # Convert to regular dict and sort by severity
    severity_order = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO', 'UNKNOWN']
    ordered_counts = {}

    for severity in severity_order:
        if severity in severity_counts:
            ordered_counts[severity] = severity_counts[severity]

    return ordered_counts

results = [
    {"id": "V1", "severity": "HIGH"},
    {"id": "V2", "severity": "MEDIUM"},
    {"id": "V3", "severity": "HIGH"},
    {"id": "V4", "severity": "LOW"}
]
print(aggregate_vulnerabilities(results))`,
    testCases: [
      { input: 'Results with mixed severities', expectedOutput: 'dict with counts', isHidden: false, description: 'Aggregate counts' },
      { input: 'Empty results', expectedOutput: 'Empty dict', isHidden: false, description: 'No vulnerabilities' },
      { input: 'All same severity', expectedOutput: 'Single severity count', isHidden: true, description: 'Uniform severity' }
    ],
    hints: [
      'Use defaultdict to count occurrences',
      'Iterate through results',
      'Count by severity level',
      'Order by severity (CRITICAL to LOW)'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex10',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Fuzzing Input Generator',
    difficulty: 3,
    description: 'Write a function to generate test inputs for fuzzing by mutating a base input string.',
    starterCode: `def generate_fuzz_inputs(base_input, mutations=5):
    # Generate mutations: add special chars, long strings, etc.
    pass

print(generate_fuzz_inputs("test", 3))`,
    solution: `def generate_fuzz_inputs(base_input, mutations=5):
    import random

    fuzz_inputs = [base_input]  # Include original

    # Mutation strategies
    special_chars = ['<', '>', '"', "'", '&', ';', '|', '\\n', '\\0']

    for _ in range(mutations):
        mutation_type = random.randint(1, 4)

        if mutation_type == 1:
            # Add special characters
            char = random.choice(special_chars)
            fuzz_inputs.append(base_input + char)

        elif mutation_type == 2:
            # Repeat string
            fuzz_inputs.append(base_input * random.randint(10, 100))

        elif mutation_type == 3:
            # Add long string
            fuzz_inputs.append(base_input + 'A' * random.randint(100, 1000))

        elif mutation_type == 4:
            # Insert special char in middle
            char = random.choice(special_chars)
            pos = len(base_input) // 2
            fuzz_inputs.append(base_input[:pos] + char + base_input[pos:])

    return fuzz_inputs

print(generate_fuzz_inputs("test", 3))`,
    testCases: [
      { input: '"test", 3', expectedOutput: 'List of 4 inputs', isHidden: false, description: 'Generate mutations' },
      { input: '"input", 5', expectedOutput: 'List of 6 inputs', isHidden: false, description: 'Multiple mutations' },
      { input: '"a", 1', expectedOutput: 'List of 2 inputs', isHidden: true, description: 'Single mutation' }
    ],
    hints: [
      'Include original input in results',
      'Generate mutations: special chars, long strings',
      'Random selection of mutation types',
      'Return list of fuzzed inputs'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex11',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Security Test Case Generator',
    difficulty: 3,
    description: 'Write a function to generate security test cases for common vulnerabilities.',
    starterCode: `def generate_security_tests(endpoint_type):
    # endpoint_type: 'login', 'search', 'file_upload'
    # Return list of test cases
    pass

print(generate_security_tests('login'))`,
    solution: `def generate_security_tests(endpoint_type):
    test_cases = {
        'login': [
            {'test': 'SQL Injection', 'input': "admin' OR '1'='1"},
            {'test': 'XSS', 'input': '<script>alert(1)</script>'},
            {'test': 'Long password', 'input': 'A' * 10000},
            {'test': 'Empty credentials', 'input': ''},
            {'test': 'Special characters', 'input': "!@#$%^&*()"}
        ],
        'search': [
            {'test': 'XSS in search', 'input': '<img src=x onerror=alert(1)>'},
            {'test': 'SQL Injection', 'input': "' OR 1=1--"},
            {'test': 'Long query', 'input': 'search' * 1000},
            {'test': 'Special chars', 'input': '%00\\n\\r'}
        ],
        'file_upload': [
            {'test': 'Path traversal', 'input': '../../../etc/passwd'},
            {'test': 'Script upload', 'input': 'shell.php'},
            {'test': 'Null byte', 'input': 'file.txt\\x00.php'},
            {'test': 'Large file', 'input': 'A' * 100000000}
        ]
    }

    return test_cases.get(endpoint_type, [])

print(generate_security_tests('login'))`,
    testCases: [
      { input: "'login'", expectedOutput: 'List with SQL injection test', isHidden: false, description: 'Login tests' },
      { input: "'search'", expectedOutput: 'List with XSS test', isHidden: false, description: 'Search tests' },
      { input: "'unknown'", expectedOutput: 'Empty list', isHidden: true, description: 'Unknown endpoint' }
    ],
    hints: [
      'Create dictionary of endpoint types',
      'Each type has list of test cases',
      'Include SQLi, XSS, and boundary tests',
      'Return relevant tests for endpoint type'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex12',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Incident Response Priority',
    difficulty: 2,
    description: 'Write a function to prioritize security incidents based on severity and affected systems.',
    starterCode: `def prioritize_incident(severity, affected_systems):
    # severity: 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'
    # affected_systems: number of systems affected
    # Return priority score (1-10)
    pass

print(prioritize_incident('CRITICAL', 50))
print(prioritize_incident('LOW', 2))`,
    solution: `def prioritize_incident(severity, affected_systems):
    severity_scores = {
        'CRITICAL': 10,
        'HIGH': 7,
        'MEDIUM': 4,
        'LOW': 2
    }

    base_score = severity_scores.get(severity, 1)

    # Increase priority based on affected systems
    if affected_systems >= 100:
        multiplier = 1.5
    elif affected_systems >= 10:
        multiplier = 1.3
    elif affected_systems >= 5:
        multiplier = 1.1
    else:
        multiplier = 1.0

    priority = min(10, int(base_score * multiplier))

    return priority

print(prioritize_incident('CRITICAL', 50))
print(prioritize_incident('LOW', 2))`,
    testCases: [
      { input: "'CRITICAL', 50", expectedOutput: '10', isHidden: false, description: 'Critical with many systems' },
      { input: "'LOW', 2", expectedOutput: '2', isHidden: false, description: 'Low with few systems' },
      { input: "'HIGH', 150", expectedOutput: '10', isHidden: true, description: 'High with massive impact' }
    ],
    hints: [
      'Assign base scores to severities',
      'Multiply by affected systems factor',
      'Cap priority at 10',
      'More systems = higher priority'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex13',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Compliance Checker',
    difficulty: 3,
    description: 'Write a function to check if security controls meet compliance requirements (e.g., PCI DSS).',
    starterCode: `def check_pci_compliance(controls):
    # controls: dict of security controls
    # Return: compliant status and missing controls
    pass

controls = {
    "firewall": True,
    "encryption": True,
    "access_control": False,
    "monitoring": True,
    "vulnerability_scanning": False
}
print(check_pci_compliance(controls))`,
    solution: `def check_pci_compliance(controls):
    required_controls = [
        'firewall',
        'encryption',
        'access_control',
        'monitoring',
        'vulnerability_scanning',
        'secure_systems',
        'restrict_access'
    ]

    missing_controls = []

    for control in required_controls:
        if not controls.get(control, False):
            missing_controls.append(control)

    is_compliant = len(missing_controls) == 0

    return {
        'compliant': is_compliant,
        'missing_controls': missing_controls,
        'compliance_percentage': int(((len(required_controls) - len(missing_controls)) / len(required_controls)) * 100)
    }

controls = {
    "firewall": True,
    "encryption": True,
    "access_control": False,
    "monitoring": True,
    "vulnerability_scanning": False
}
print(check_pci_compliance(controls))`,
    testCases: [
      { input: 'Some controls missing', expectedOutput: 'compliant=False, list missing', isHidden: false, description: 'Non-compliant' },
      { input: 'All controls present', expectedOutput: 'compliant=True', isHidden: false, description: 'Compliant' },
      { input: 'No controls', expectedOutput: 'All missing', isHidden: true, description: 'No compliance' }
    ],
    hints: [
      'Define list of required controls',
      'Check each control is True in dict',
      'Track missing controls',
      'Calculate compliance percentage'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex14',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Security Metrics Dashboard',
    difficulty: 4,
    description: 'Write a function to calculate security metrics from vulnerability scan data.',
    starterCode: `def calculate_security_metrics(vulnerabilities):
    # vulnerabilities: list of dicts with severity and status
    # Return: metrics dict with various KPIs
    pass

vulns = [
    {"severity": "HIGH", "status": "open", "days_open": 30},
    {"severity": "MEDIUM", "status": "fixed", "days_open": 5},
    {"severity": "HIGH", "status": "open", "days_open": 60}
]
print(calculate_security_metrics(vulns))`,
    solution: `def calculate_security_metrics(vulnerabilities):
    total = len(vulnerabilities)
    if total == 0:
        return {}

    open_vulns = [v for v in vulnerabilities if v['status'] == 'open']
    fixed_vulns = [v for v in vulnerabilities if v['status'] == 'fixed']

    # Count by severity
    critical_count = sum(1 for v in vulnerabilities if v.get('severity') == 'CRITICAL')
    high_count = sum(1 for v in vulnerabilities if v.get('severity') == 'HIGH')

    # Calculate average time to fix
    if fixed_vulns:
        avg_time_to_fix = sum(v.get('days_open', 0) for v in fixed_vulns) / len(fixed_vulns)
    else:
        avg_time_to_fix = 0

    # Calculate mean time to remediate (MTTR)
    open_days = [v.get('days_open', 0) for v in open_vulns]
    avg_open_days = sum(open_days) / len(open_days) if open_days else 0

    return {
        'total_vulnerabilities': total,
        'open_count': len(open_vulns),
        'fixed_count': len(fixed_vulns),
        'critical_high_count': critical_count + high_count,
        'fix_rate': round((len(fixed_vulns) / total) * 100, 1),
        'avg_time_to_fix': round(avg_time_to_fix, 1),
        'avg_open_days': round(avg_open_days, 1)
    }

vulns = [
    {"severity": "HIGH", "status": "open", "days_open": 30},
    {"severity": "MEDIUM", "status": "fixed", "days_open": 5},
    {"severity": "HIGH", "status": "open", "days_open": 60}
]
print(calculate_security_metrics(vulns))`,
    testCases: [
      { input: 'Mix of open and fixed vulns', expectedOutput: 'Metrics dict', isHidden: false, description: 'Calculate all metrics' },
      { input: 'All fixed vulns', expectedOutput: 'fix_rate=100', isHidden: false, description: 'Perfect fix rate' },
      { input: 'Empty list', expectedOutput: 'Empty dict', isHidden: true, description: 'No data' }
    ],
    hints: [
      'Count total, open, and fixed vulns',
      'Calculate fix rate percentage',
      'Compute average time to fix',
      'Track critical/high severity counts'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex15',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Penetration Test Report Parser',
    difficulty: 4,
    description: 'Write a function to parse penetration test findings and extract actionable remediation steps.',
    starterCode: `def parse_pentest_finding(finding_text):
    # Extract: title, severity, description, remediation
    pass

finding = """
FINDING: SQL Injection in Login Form
SEVERITY: CRITICAL
DESCRIPTION: The login form is vulnerable to SQL injection attacks.
REMEDIATION: Use parameterized queries and input validation.
"""
print(parse_pentest_finding(finding))`,
    solution: `def parse_pentest_finding(finding_text):
    lines = finding_text.strip().split('\\n')

    finding_data = {
        'title': '',
        'severity': '',
        'description': '',
        'remediation': ''
    }

    current_field = None

    for line in lines:
        line = line.strip()
        if not line:
            continue

        if line.startswith('FINDING:'):
            current_field = 'title'
            finding_data['title'] = line.replace('FINDING:', '').strip()
        elif line.startswith('SEVERITY:'):
            current_field = 'severity'
            finding_data['severity'] = line.replace('SEVERITY:', '').strip()
        elif line.startswith('DESCRIPTION:'):
            current_field = 'description'
            finding_data['description'] = line.replace('DESCRIPTION:', '').strip()
        elif line.startswith('REMEDIATION:'):
            current_field = 'remediation'
            finding_data['remediation'] = line.replace('REMEDIATION:', '').strip()
        elif current_field:
            # Continuation of previous field
            finding_data[current_field] += ' ' + line

    return finding_data

finding = """
FINDING: SQL Injection in Login Form
SEVERITY: CRITICAL
DESCRIPTION: The login form is vulnerable to SQL injection attacks.
REMEDIATION: Use parameterized queries and input validation.
"""
print(parse_pentest_finding(finding))`,
    testCases: [
      { input: 'Full finding text', expectedOutput: 'dict with all fields', isHidden: false, description: 'Parse complete finding' },
      { input: 'Partial finding', expectedOutput: 'dict with some fields', isHidden: false, description: 'Handle incomplete data' },
      { input: 'Multi-line description', expectedOutput: 'Combined description', isHidden: true, description: 'Multi-line fields' }
    ],
    hints: [
      'Split text by newlines',
      'Look for field markers (FINDING:, SEVERITY:, etc.)',
      'Extract content after markers',
      'Handle multi-line field values'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t7-ex16',
    subjectId: 'cs307',
    topicId: 'cs307-topic-7',
    title: 'Security Baseline Validator',
    difficulty: 4,
    description: 'Write a function to validate system configuration against security baseline requirements.',
    starterCode: `def validate_security_baseline(system_config, baseline):
    # Compare system config against baseline
    # Return deviations and compliance score
    pass

config = {
    "password_min_length": 8,
    "session_timeout": 3600,
    "encryption_enabled": True,
    "audit_logging": False
}

baseline = {
    "password_min_length": 12,
    "session_timeout": 1800,
    "encryption_enabled": True,
    "audit_logging": True
}

print(validate_security_baseline(config, baseline))`,
    solution: `def validate_security_baseline(system_config, baseline):
    deviations = []
    compliant_items = 0
    total_items = len(baseline)

    for setting, required_value in baseline.items():
        actual_value = system_config.get(setting)

        if actual_value is None:
            deviations.append({
                'setting': setting,
                'issue': 'missing',
                'required': required_value,
                'actual': None
            })
        elif isinstance(required_value, bool):
            # Boolean check
            if actual_value != required_value:
                deviations.append({
                    'setting': setting,
                    'issue': 'non-compliant',
                    'required': required_value,
                    'actual': actual_value
                })
            else:
                compliant_items += 1
        elif isinstance(required_value, (int, float)):
            # Numeric check (actual should be >= required for security)
            if actual_value < required_value:
                deviations.append({
                    'setting': setting,
                    'issue': 'below_minimum',
                    'required': required_value,
                    'actual': actual_value
                })
            else:
                compliant_items += 1
        else:
            # String or other check
            if actual_value != required_value:
                deviations.append({
                    'setting': setting,
                    'issue': 'non-compliant',
                    'required': required_value,
                    'actual': actual_value
                })
            else:
                compliant_items += 1

    compliance_score = int((compliant_items / total_items) * 100) if total_items > 0 else 0

    return {
        'compliant': len(deviations) == 0,
        'compliance_score': compliance_score,
        'deviations': deviations,
        'total_checks': total_items
    }

config = {
    "password_min_length": 8,
    "session_timeout": 3600,
    "encryption_enabled": True,
    "audit_logging": False
}

baseline = {
    "password_min_length": 12,
    "session_timeout": 1800,
    "encryption_enabled": True,
    "audit_logging": True
}

print(validate_security_baseline(config, baseline))`,
    testCases: [
      { input: 'Config with deviations', expectedOutput: 'List of deviations', isHidden: false, description: 'Find non-compliance' },
      { input: 'Fully compliant config', expectedOutput: 'compliance_score=100', isHidden: false, description: 'Perfect compliance' },
      { input: 'Missing settings', expectedOutput: 'Missing settings flagged', isHidden: true, description: 'Handle missing config' }
    ],
    hints: [
      'Compare each baseline setting to actual config',
      'Check for missing settings',
      'Validate numeric values (actual >= required)',
      'Calculate compliance percentage'
    ],
    language: 'python'
  }
];
