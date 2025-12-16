# Penetration Testing

Penetration testing simulates real-world attacks to identify vulnerabilities that automated tools miss. This subtopic covers penetration testing methodology, scope definition, and ethical reporting practices.

## Penetration Testing Overview

Penetration testing is authorized simulated attacks to evaluate security defenses.

### Penetration Testing Types

```
Penetration Test Types:

┌─────────────────────────────────────────────┐
│ Black Box Testing                           │
│ - No prior knowledge                        │
│ - Simulates external attacker               │
│ - Tests external defenses                   │
│ - Most realistic                            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ White Box Testing                           │
│ - Full knowledge (source code, architecture)│
│ - Comprehensive testing                     │
│ - Finds more vulnerabilities                │
│ - Less realistic attack simulation          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Gray Box Testing                            │
│ - Partial knowledge                         │
│ - Balanced approach                         │
│ - Simulates insider threat                  │
│ - Common in practice                        │
└─────────────────────────────────────────────┘
```

## Penetration Testing Methodology

### Industry Standard: PTES

```python
class PenetrationTestingMethodology:
    """Penetration Testing Execution Standard (PTES)"""

    @staticmethod
    def ptes_phases():
        """PTES methodology phases"""
        return {
            '1_pre_engagement': {
                'description': 'Define scope and rules',
                'activities': [
                    'Scope definition',
                    'Rules of engagement',
                    'Goals and objectives',
                    'Communication plan',
                    'Legal agreements (NDA, authorization)',
                    'Timeline and schedule'
                ],
                'deliverables': [
                    'Statement of Work (SOW)',
                    'Rules of Engagement (ROE)',
                    'Signed authorization letter'
                ]
            },
            '2_intelligence_gathering': {
                'description': 'Collect information about target',
                'activities': [
                    'OSINT (Open Source Intelligence)',
                    'DNS enumeration',
                    'Network mapping',
                    'Subdomain discovery',
                    'Employee information',
                    'Technology stack identification'
                ],
                'tools': [
                    'Google dorking',
                    'theHarvester',
                    'Shodan',
                    'Maltego',
                    'Recon-ng'
                ]
            },
            '3_threat_modeling': {
                'description': 'Identify attack vectors',
                'activities': [
                    'Asset identification',
                    'Threat actor profiling',
                    'Attack surface analysis',
                    'Attack vector identification',
                    'Risk assessment'
                ],
                'frameworks': [
                    'STRIDE',
                    'DREAD',
                    'Attack trees'
                ]
            },
            '4_vulnerability_analysis': {
                'description': 'Identify vulnerabilities',
                'activities': [
                    'Automated scanning',
                    'Manual testing',
                    'Configuration review',
                    'Weakness identification',
                    'Vulnerability validation'
                ],
                'tools': [
                    'Nessus',
                    'OpenVAS',
                    'Nikto',
                    'Burp Suite',
                    'OWASP ZAP'
                ]
            },
            '5_exploitation': {
                'description': 'Exploit identified vulnerabilities',
                'activities': [
                    'Proof of concept',
                    'Gain access',
                    'Privilege escalation',
                    'Lateral movement',
                    'Data exfiltration (simulated)',
                    'Document evidence'
                ],
                'tools': [
                    'Metasploit',
                    'Custom exploits',
                    'Social engineering',
                    'Password attacks'
                ],
                'IMPORTANT': 'Only with explicit authorization'
            },
            '6_post_exploitation': {
                'description': 'Determine value of compromise',
                'activities': [
                    'Persistence establishment',
                    'Data discovery',
                    'Pivoting',
                    'Additional system compromise',
                    'Impact assessment',
                    'Clean up'
                ],
                'ethics': 'Minimize business impact, document all actions'
            },
            '7_reporting': {
                'description': 'Document findings and recommendations',
                'deliverables': [
                    'Executive summary',
                    'Technical findings',
                    'Vulnerability details',
                    'Risk ratings',
                    'Remediation recommendations',
                    'Appendices (evidence)'
                ],
                'components': [
                    'Methodology',
                    'Scope',
                    'Timeline',
                    'Findings by severity',
                    'Attack chains',
                    'Business impact',
                    'Prioritized recommendations'
                ]
            }
        }

    @staticmethod
    def example_scope_document():
        """Example penetration test scope"""
        return """
        Penetration Test Scope Document

        1. TEST OBJECTIVES
           - Identify security vulnerabilities in web application
           - Test authentication and authorization mechanisms
           - Evaluate security of customer data
           - Assess API security

        2. IN SCOPE
           - Web application: https://app.example.com
           - API endpoints: https://api.example.com/*
           - Mobile app backend
           - IP range: 203.0.113.0/24

        3. OUT OF SCOPE
           - Physical security testing
           - Social engineering of employees
           - Denial of Service attacks
           - Third-party integrations
           - Production database (use staging)

        4. TESTING CONSTRAINTS
           - Testing window: Mon-Fri 6pm-6am, Sat-Sun all day
           - No testing during blackout dates (releases, holidays)
           - Maximum 10 concurrent threads
           - Notify security team before exploitation attempts

        5. RULES OF ENGAGEMENT
           - Stop immediately if production impact detected
           - Document all findings with screenshots
           - Report critical findings within 24 hours
           - Secure handling of any discovered data
           - Clean up artifacts after testing

        6. COMMUNICATION
           - Daily status updates
           - Emergency contact: security@example.com
           - Slack channel: #pentest
           - Final presentation scheduled

        7. DELIVERABLES
           - Penetration test report
           - Executive summary
           - Technical appendix
           - Remediation presentation
           - Retest after 30 days (included)
        """
```

## Testing Techniques

### Common Penetration Testing Techniques

```python
class PenetrationTestingTechniques:
    """Common penetration testing techniques (educational)"""

    @staticmethod
    def reconnaissance_techniques():
        """Information gathering techniques"""
        return {
            'passive_recon': {
                'google_dorking': 'site:example.com filetype:pdf',
                'dns_enumeration': 'Enumerate subdomains, DNS records',
                'whois_lookup': 'Domain registration information',
                'social_media': 'Employee information, technology used',
                'job_postings': 'Technology stack from job listings',
                'public_documents': 'Metadata in published files'
            },
            'active_recon': {
                'port_scanning': 'Identify open ports and services',
                'service_enumeration': 'Determine software versions',
                'os_fingerprinting': 'Identify operating systems',
                'network_mapping': 'Map network topology',
                'banner_grabbing': 'Collect service banners'
            }
        }

    @staticmethod
    def exploitation_techniques():
        """Common exploitation methods"""
        return {
            'web_application': [
                'SQL injection',
                'Cross-site scripting (XSS)',
                'CSRF',
                'Authentication bypass',
                'Session hijacking',
                'File upload vulnerabilities',
                'Path traversal',
                'XXE (XML External Entity)',
                'SSRF (Server-Side Request Forgery)',
                'Insecure deserialization'
            ],
            'network': [
                'Credential attacks (brute force, password spraying)',
                'Man-in-the-Middle',
                'ARP spoofing',
                'Network protocol exploits',
                'Wireless attacks',
                'VPN vulnerabilities'
            ],
            'system': [
                'Buffer overflow',
                'Privilege escalation',
                'Kernel exploits',
                'DLL hijacking',
                'Unquoted service paths',
                'Weak file permissions'
            ]
        }

    @staticmethod
    def privilege_escalation():
        """Privilege escalation techniques"""
        return {
            'linux': [
                'SUID binaries',
                'Sudo misconfigurations',
                'Kernel exploits',
                'Cron jobs',
                'Writable /etc/passwd',
                'Docker escape',
                'Capabilities abuse'
            ],
            'windows': [
                'Unquoted service paths',
                'Weak service permissions',
                'AlwaysInstallElevated',
                'Token impersonation',
                'Kernel exploits',
                'DLL hijacking',
                'Stored credentials'
            ]
        }
```

## Ethical Considerations

### Responsible Disclosure

```python
class EthicalPenetrationTesting:
    """Ethical guidelines for penetration testing"""

    ETHICAL_GUIDELINES = """
    Ethical Penetration Testing Guidelines:

    1. AUTHORIZATION
       ✓ Written authorization from system owner
       ✓ Clear scope definition
       ✓ Authorized IP addresses only
       ✓ Respect boundaries
       ✗ NEVER test without permission

    2. MINIMIZE HARM
       ✓ Avoid business disruption
       ✓ No data destruction
       ✓ No DoS attacks (unless authorized)
       ✓ Test in non-production when possible
       ✓ Have rollback plan

    3. DATA PROTECTION
       ✓ Secure handling of discovered data
       ✓ Do not exfiltrate real customer data
       ✓ Use test data for PoC
       ✓ Delete artifacts after testing
       ✓ Encrypt findings in transit

    4. CONFIDENTIALITY
       ✓ NDA with client
       ✓ Protect sensitive findings
       ✓ Secure report delivery
       ✓ No public disclosure without permission
       ✓ Secure deletion of test data

    5. PROFESSIONAL CONDUCT
       ✓ Report all findings
       ✓ Do not exploit for personal gain
       ✓ No blackmail or extortion
       ✓ Respect intellectual property
       ✓ Maintain professional standards

    6. RESPONSIBLE DISCLOSURE
       ✓ Report to client first
       ✓ Allow time for remediation
       ✓ Coordinate disclosure timeline
       ✓ Follow industry disclosure practices
       ✓ Public good over personal recognition
    """

    @staticmethod
    def responsible_disclosure_process():
        """Responsible disclosure timeline"""
        return {
            'day_0': 'Vulnerability discovered during authorized test',
            'day_1': 'Report to client immediately (critical) or within SLA',
            'day_7': 'Client acknowledges receipt',
            'day_30': 'Client provides remediation timeline',
            'day_90': 'Target remediation date',
            'day_120': 'Verify fix with retest',
            'day_150': 'Coordinated public disclosure (if applicable)',
            'notes': [
                'Critical vulnerabilities: report immediately',
                'Actively exploited: expedited timeline',
                'Client unresponsive: escalate through proper channels',
                'Public disclosure only with client agreement'
            ]
        }
```

## Reporting

### Penetration Test Report Structure

```python
class PenetrationTestReport:
    """Penetration test report structure"""

    @staticmethod
    def report_template():
        """Standard penetration test report template"""
        return {
            'executive_summary': {
                'purpose': 'High-level overview for executives',
                'contents': [
                    'Test objectives',
                    'Scope summary',
                    'Key findings (non-technical)',
                    'Risk assessment',
                    'Overall security posture',
                    'High-priority recommendations'
                ],
                'length': '2-3 pages',
                'audience': 'Executives, management'
            },
            'technical_summary': {
                'purpose': 'Technical overview',
                'contents': [
                    'Methodology',
                    'Scope details',
                    'Tools used',
                    'Timeline',
                    'Summary of findings by severity',
                    'Attack chains'
                ],
                'length': '5-10 pages',
                'audience': 'Technical staff, security team'
            },
            'detailed_findings': {
                'purpose': 'Complete vulnerability documentation',
                'per_finding': {
                    'title': 'Clear, descriptive name',
                    'severity': 'Critical/High/Medium/Low/Info',
                    'cvss_score': 'CVSS 3.1 score and vector',
                    'description': 'What is the vulnerability',
                    'impact': 'What can an attacker do',
                    'affected_systems': 'Specific hosts/URLs',
                    'reproduction_steps': 'Step-by-step how to reproduce',
                    'evidence': 'Screenshots, command output',
                    'recommendations': 'How to fix',
                    'references': 'CVEs, advisories, documentation'
                },
                'length': 'Variable (1-2 pages per finding)',
                'audience': 'Developers, security team'
            },
            'remediation_roadmap': {
                'purpose': 'Prioritized fix plan',
                'contents': [
                    'Quick wins (easy, high impact)',
                    'Short-term (30 days)',
                    'Medium-term (90 days)',
                    'Long-term (strategic)',
                    'Effort estimates',
                    'Dependencies'
                ],
                'length': '3-5 pages',
                'audience': 'Development, project managers'
            },
            'appendices': {
                'contents': [
                    'Scope document',
                    'Methodology details',
                    'Tool output',
                    'Additional screenshots',
                    'Network diagrams',
                    'Glossary of terms'
                ]
            }
        }

    @staticmethod
    def finding_severity_criteria():
        """Criteria for assigning severity levels"""
        return {
            'critical': {
                'characteristics': [
                    'Remote code execution without authentication',
                    'Full system compromise',
                    'Massive data breach possible',
                    'Wormable vulnerability',
                    'Actively exploited in wild'
                ],
                'example': 'Unauthenticated SQL injection with admin access',
                'sla': 'Fix within 24-48 hours'
            },
            'high': {
                'characteristics': [
                    'Authenticated RCE',
                    'Privilege escalation to admin',
                    'Sensitive data exposure',
                    'Authentication bypass'
                ],
                'example': 'Authenticated user can read arbitrary files',
                'sla': 'Fix within 7 days'
            },
            'medium': {
                'characteristics': [
                    'Limited information disclosure',
                    'Minor privilege escalation',
                    'XSS vulnerabilities',
                    'Security misconfiguration'
                ],
                'example': 'Reflected XSS in authenticated context',
                'sla': 'Fix within 30 days'
            },
            'low': {
                'characteristics': [
                    'Minimal impact vulnerabilities',
                    'Requires complex attack chain',
                    'Limited sensitive information',
                    'Best practice violations'
                ],
                'example': 'Missing security headers',
                'sla': 'Fix within 90 days'
            },
            'info': {
                'characteristics': [
                    'No direct security impact',
                    'Informational only',
                    'Security awareness',
                    'Future considerations'
                ],
                'example': 'Server version disclosure',
                'sla': 'Address at convenience'
            }
        }

    @staticmethod
    def example_finding():
        """Example penetration test finding"""
        return """
        FINDING: SQL Injection in Login Form

        Severity: CRITICAL
        CVSS 3.1 Score: 9.8 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)

        Description:
        The login form at https://app.example.com/login is vulnerable to SQL
        injection. An attacker can inject SQL commands through the username
        parameter, bypassing authentication and gaining administrative access.

        Affected Systems:
        - https://app.example.com/login
        - IP: 203.0.113.50

        Impact:
        An unauthenticated attacker can:
        - Bypass authentication
        - Extract entire database (customer data, credentials)
        - Modify or delete data
        - Execute operating system commands
        - Compromise backend database server

        Reproduction Steps:
        1. Navigate to https://app.example.com/login
        2. Enter username: admin' OR '1'='1
        3. Enter any password
        4. Click "Login"
        5. Successfully authenticated as administrator

        Evidence:
        [Screenshot showing successful login]
        [Screenshot showing admin panel access]

        SQL Query Extracted:
        SELECT * FROM users WHERE username='admin' OR '1'='1' AND password='...'

        Recommendations:
        1. IMMEDIATE: Take login form offline until fixed
        2. Implement parameterized queries (prepared statements)
        3. Use ORM framework (SQLAlchemy, Django ORM)
        4. Input validation (whitelist alphanumeric only)
        5. Web Application Firewall (WAF) as defense in depth
        6. Regular security testing
        7. Security code review

        Code Example (Vulnerable):
        query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"

        Code Example (Fixed):
        query = "SELECT * FROM users WHERE username=? AND password=?"
        cursor.execute(query, (username, password_hash))

        References:
        - OWASP SQL Injection: https://owasp.org/www-community/attacks/SQL_Injection
        - CWE-89: https://cwe.mitre.org/data/definitions/89.html
        - OWASP Top 10 2021: A03:2021 - Injection
        """
```

## Summary

Penetration testing simulates real-world attacks to find vulnerabilities:

- **Methodology**: PTES (Pre-engagement → Intelligence → Threat Modeling → Vulnerability Analysis → Exploitation → Post-Exploitation → Reporting)
- **Types**: Black box (no knowledge), White box (full knowledge), Gray box (partial knowledge)
- **Scope**: Clear definition of in-scope/out-of-scope, rules of engagement, authorization
- **Ethics**: Written authorization required, minimize harm, protect data, responsible disclosure
- **Reporting**: Executive summary, technical details, remediation roadmap, severity-based prioritization

Always obtain written authorization, stay within scope, minimize business impact, and provide actionable remediation guidance.
