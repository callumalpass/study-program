# Security Testing Introduction

Security testing identifies vulnerabilities before attackers can exploit them. This subtopic covers security testing methodologies, integration with the Software Development Lifecycle (SDLC), and the security testing landscape.

## Security Testing Overview

Security testing validates that security controls work as intended and identifies vulnerabilities.

### Types of Security Testing

```
Security Testing Categories:

┌──────────────────────────────────────────────────┐
│ Static Application Security Testing (SAST)      │
│ - Analyzes source code without execution         │
│ - Finds code-level vulnerabilities               │
│ - Early in SDLC                                  │
│ - Examples: Bandit, SonarQube, Checkmarx        │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Dynamic Application Security Testing (DAST)     │
│ - Tests running application                      │
│ - Black-box testing                              │
│ - Finds runtime vulnerabilities                  │
│ - Examples: OWASP ZAP, Burp Suite               │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Interactive Application Security Testing (IAST) │
│ - Combines SAST and DAST                         │
│ - Instruments application                        │
│ - Runtime code analysis                          │
│ - Examples: Contrast Security, Seeker            │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Software Composition Analysis (SCA)              │
│ - Scans dependencies                             │
│ - Identifies vulnerable libraries                │
│ - License compliance                             │
│ - Examples: Snyk, WhiteSource, Black Duck       │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Penetration Testing                              │
│ - Manual security assessment                     │
│ - Simulates real attacks                         │
│ - Business logic testing                         │
│ - Expert-driven                                  │
└──────────────────────────────────────────────────┘
```

## Security Testing Methodologies

### OWASP Testing Guide

```python
class OWASPTestingGuide:
    """OWASP Web Application Testing methodology"""

    @staticmethod
    def testing_categories():
        """OWASP testing categories"""
        return {
            'information_gathering': [
                'Fingerprint web server',
                'Identify application framework',
                'Map application architecture',
                'Enumerate infrastructure',
                'Review webserver metafiles',
                'Identify application entry points'
            ],
            'configuration_management': [
                'Test network infrastructure',
                'Test application platform',
                'Test file extensions handling',
                'Review old backup files',
                'Enumerate admin interfaces',
                'Test HTTP methods'
            ],
            'identity_management': [
                'Test role definitions',
                'Test user registration process',
                'Test account provisioning',
                'Test account enumeration',
                'Test weak username policy'
            ],
            'authentication': [
                'Test credentials over encrypted channel',
                'Test default credentials',
                'Test weak lockout mechanism',
                'Test bypassing authentication',
                'Test password quality rules',
                'Test remember me functionality',
                'Test password reset functionality',
                'Test multi-factor authentication'
            ],
            'authorization': [
                'Test path traversal',
                'Test bypassing authorization',
                'Test privilege escalation',
                'Test insecure direct object references'
            ],
            'session_management': [
                'Test session fixation',
                'Test exposed session variables',
                'Test session hijacking',
                'Test CSRF',
                'Test logout functionality',
                'Test session timeout'
            ],
            'input_validation': [
                'Test reflected XSS',
                'Test stored XSS',
                'Test SQL injection',
                'Test LDAP injection',
                'Test XML injection',
                'Test SSI injection',
                'Test command injection',
                'Test buffer overflow'
            ],
            'error_handling': [
                'Test error codes',
                'Test stack traces',
                'Test application errors'
            ],
            'cryptography': [
                'Test weak SSL/TLS',
                'Test weak cryptography',
                'Test sensitive data in transit',
                'Test sensitive data at rest'
            ],
            'business_logic': [
                'Test business logic flaws',
                'Test malicious file upload',
                'Test integrity checks',
                'Test process timing',
                'Test number of times function can be used',
                'Test circumvention of work flows'
            ]
        }

    @staticmethod
    def create_test_plan(application_type: str) -> dict:
        """Create security test plan"""
        return {
            'scope': {
                'in_scope': ['Web application', 'API endpoints', 'Authentication'],
                'out_of_scope': ['Physical security', 'Social engineering'],
                'testing_window': '2024-01-01 to 2024-01-07',
                'environment': 'staging'
            },
            'methodology': 'OWASP Testing Guide v4',
            'test_types': ['SAST', 'DAST', 'Manual testing'],
            'tools': ['OWASP ZAP', 'Burp Suite', 'Bandit'],
            'team': {
                'lead_tester': 'Security Team',
                'developers': ['Dev Team'],
                'stakeholders': ['Product Owner', 'CISO']
            },
            'deliverables': [
                'Vulnerability report',
                'Executive summary',
                'Remediation recommendations',
                'Retest report'
            ]
        }
```

## SDLC Integration

Security testing should be integrated throughout the development lifecycle.

### Shift Left Security

```
Traditional SDLC:                    Shift Left Security:
┌──────────────────┐                ┌──────────────────┐
│ Requirements     │                │ Requirements     │
│                  │                │ + Threat Modeling│ ← Security
├──────────────────┤                ├──────────────────┤
│ Design           │                │ Design           │
│                  │                │ + Security Design│ ← Security
├──────────────────┤                ├──────────────────┤
│ Development      │                │ Development      │
│                  │                │ + SAST           │ ← Security
│                  │                │ + SCA            │ ← Security
│                  │                │ + IDE plugins    │ ← Security
├──────────────────┤                ├──────────────────┤
│ Testing          │                │ Testing          │
│                  │                │ + DAST           │ ← Security
│                  │                │ + Fuzzing        │ ← Security
├──────────────────┤                ├──────────────────┤
│ Deployment       │                │ Deployment       │
│ + Security Test  │ ← Late!        │ + Container Scan │ ← Security
└──────────────────┘                ├──────────────────┤
                                    │ Production       │
                                    │ + Monitoring     │ ← Security
                                    │ + Pen Testing    │ ← Security
                                    └──────────────────┘

Benefits:
• Find issues earlier (cheaper to fix)
• Continuous security feedback
• Faster remediation
• Security culture
```

### DevSecOps Integration

```python
class DevSecOpsPipeline:
    """Security in CI/CD pipeline"""

    @staticmethod
    def security_pipeline_stages():
        """Security checks at each pipeline stage"""
        return {
            'commit': {
                'pre_commit_hooks': [
                    'Secret scanning (git-secrets)',
                    'Linting (security rules)',
                    'Format validation'
                ],
                'tools': ['pre-commit', 'git-secrets', 'detect-secrets']
            },
            'build': {
                'checks': [
                    'SAST scanning',
                    'Dependency scanning',
                    'License compliance',
                    'Code quality gates'
                ],
                'tools': ['SonarQube', 'Snyk', 'Bandit', 'npm audit']
            },
            'test': {
                'checks': [
                    'DAST scanning',
                    'API security testing',
                    'Security unit tests',
                    'Integration security tests'
                ],
                'tools': ['OWASP ZAP', 'Postman', 'pytest-security']
            },
            'package': {
                'checks': [
                    'Container image scanning',
                    'Malware scanning',
                    'Configuration validation'
                ],
                'tools': ['Trivy', 'Clair', 'Anchore']
            },
            'deploy': {
                'checks': [
                    'Infrastructure scanning',
                    'Configuration review',
                    'Compliance validation'
                ],
                'tools': ['Terraform scan', 'CloudSploit', 'ScoutSuite']
            },
            'operate': {
                'checks': [
                    'Runtime protection',
                    'Monitoring & alerting',
                    'Penetration testing',
                    'Bug bounty program'
                ],
                'tools': ['Falco', 'SIEM', 'Burp Suite Pro']
            }
        }

    @staticmethod
    def example_github_actions_security():
        """Example GitHub Actions security pipeline"""
        return """
name: Security Pipeline

on: [push, pull_request]

jobs:
  sast:
    name: Static Analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Bandit (Python SAST)
        run: |
          pip install bandit
          bandit -r . -f json -o bandit-report.json

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

  sca:
    name: Dependency Scanning
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run pip-audit
        run: |
          pip install pip-audit
          pip-audit

      - name: Snyk Security Scan
        uses: snyk/actions/python@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  secrets:
    name: Secret Scanning
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Gitleaks
        uses: gitleaks/gitleaks-action@v2

  dast:
    name: Dynamic Analysis
    runs-on: ubuntu-latest
    needs: [sast, sca]
    steps:
      - name: Deploy to test environment
        run: # Deploy application

      - name: OWASP ZAP Scan
        uses: zaproxy/action-baseline@v0.7.0
        with:
          target: 'https://test.example.com'

  container:
    name: Container Security
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build image
        run: docker build -t myapp:latest .

      - name: Trivy scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:latest'
          severity: 'CRITICAL,HIGH'

  compliance:
    name: Security Gate
    runs-on: ubuntu-latest
    needs: [sast, sca, dast, container]
    steps:
      - name: Check thresholds
        run: |
          python scripts/security_gate.py
          # Fails if critical vulnerabilities found
"""
```

## Security Testing Levels

### Testing Pyramid

```
Security Testing Pyramid:

           ┌───────────────┐
           │  Penetration  │  ← Manual, Expert-driven
           │    Testing    │     Expensive, Infrequent
           └───────────────┘
         ┌───────────────────┐
         │  DAST / Fuzzing   │  ← Automated, Runtime
         │                   │     Moderate cost
         └───────────────────┘
       ┌───────────────────────┐
       │   SAST / SCA          │  ← Automated, Fast
       │                       │     Low cost, Frequent
       └───────────────────────┘
     ┌─────────────────────────────┐
     │  Security Unit Tests        │  ← Developer-written
     │  + Code Review              │     Cheapest, Continuous
     └─────────────────────────────┘

Strategy:
• Many security unit tests (fast feedback)
• Regular SAST/SCA (every commit)
• Frequent DAST (every deployment)
• Periodic pen tests (quarterly)
```

## Security Testing Metrics

```python
class SecurityMetrics:
    """Track security testing effectiveness"""

    @staticmethod
    def key_metrics():
        """Important security metrics"""
        return {
            'vulnerability_metrics': {
                'total_vulnerabilities': 'Total vulns found',
                'by_severity': 'Critical/High/Medium/Low counts',
                'mean_time_to_detect': 'Average time to find vuln',
                'mean_time_to_remediate': 'Average time to fix vuln',
                'vulnerability_density': 'Vulns per 1000 LOC',
                'open_vulnerabilities': 'Currently open vulns',
                'recurrence_rate': 'Same vuln found again'
            },
            'coverage_metrics': {
                'code_coverage': '% of code tested',
                'endpoint_coverage': '% of endpoints tested',
                'test_automation_rate': '% automated vs manual',
                'dependency_scan_coverage': '% deps scanned'
            },
            'process_metrics': {
                'scan_frequency': 'Scans per week/month',
                'false_positive_rate': '% false positives',
                'remediation_rate': '% vulns fixed',
                'sla_compliance': '% fixed within SLA',
                'security_test_time': 'Time spent testing'
            },
            'trend_metrics': {
                'vulnerability_trend': 'Increasing/decreasing over time',
                'security_debt': 'Accumulation of unfixed vulns',
                'sprint_burndown': 'Security issues per sprint'
            }
        }

    @staticmethod
    def calculate_risk_score(vulnerabilities: list) -> float:
        """Calculate overall risk score"""
        severity_weights = {
            'CRITICAL': 10,
            'HIGH': 7,
            'MEDIUM': 4,
            'LOW': 1
        }

        total_score = sum(
            severity_weights.get(v.get('severity', 'LOW'), 0)
            for v in vulnerabilities
        )

        return total_score

    @staticmethod
    def security_dashboard():
        """Security testing dashboard metrics"""
        return {
            'critical_vulnerabilities': 0,
            'high_vulnerabilities': 3,
            'medium_vulnerabilities': 12,
            'low_vulnerabilities': 45,
            'total_vulnerabilities': 60,
            'mean_time_to_remediate_critical': '2 hours',
            'mean_time_to_remediate_high': '3 days',
            'sca_scans_this_week': 35,
            'sast_scans_this_week': 50,
            'dast_scans_this_week': 7,
            'last_penetration_test': '2024-01-01',
            'security_test_coverage': '85%',
            'false_positive_rate': '15%'
        }
```

## Testing Standards and Frameworks

```python
class SecurityStandards:
    """Security testing standards"""

    STANDARDS = {
        'OWASP_ASVS': {
            'name': 'Application Security Verification Standard',
            'purpose': 'Security requirements and testing guide',
            'levels': '3 levels (opportunistic, standard, advanced)',
            'use': 'Define security requirements, guide testing'
        },
        'OWASP_Top_10': {
            'name': 'OWASP Top 10',
            'purpose': 'Most critical web app security risks',
            'frequency': 'Updated every 3-4 years',
            'use': 'Prioritize testing, security awareness'
        },
        'NIST_800_53': {
            'name': 'Security and Privacy Controls',
            'purpose': 'Security controls for federal systems',
            'scope': 'Comprehensive security framework',
            'use': 'Compliance, security controls'
        },
        'PCI_DSS': {
            'name': 'Payment Card Industry Data Security Standard',
            'purpose': 'Protect cardholder data',
            'requirements': 'Security testing required',
            'use': 'Payment processing compliance'
        },
        'ISO_27001': {
            'name': 'Information Security Management',
            'purpose': 'Security management system',
            'scope': 'Organization-wide security',
            'use': 'Security program framework'
        }
    }
```

## Summary

Security testing is essential for identifying vulnerabilities before attackers:

- **Testing Types**: SAST (code), DAST (runtime), SCA (dependencies), Penetration Testing (manual)
- **Methodologies**: OWASP Testing Guide, NIST, industry best practices
- **SDLC Integration**: Shift left, DevSecOps, security at every stage
- **Testing Pyramid**: Many unit tests, regular automated scans, periodic pen tests
- **Metrics**: Track vulnerabilities, coverage, remediation time, trends
- **Standards**: OWASP ASVS, Top 10, NIST 800-53, PCI DSS for guidance

Effective security testing requires: automated tools, manual expertise, continuous integration, metrics tracking, and a security-first culture throughout development.
