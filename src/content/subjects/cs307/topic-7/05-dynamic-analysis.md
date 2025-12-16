# Dynamic Analysis

Dynamic Application Security Testing (DAST) tests running applications to find vulnerabilities that only appear at runtime. This subtopic covers DAST tools, runtime testing techniques, and web application scanning.

## DAST Overview

DAST tests applications from the outside, like an attacker would.

### DAST vs SAST

```
DAST vs SAST Comparison:

┌──────────────────┬─────────────────┬─────────────────┐
│ Characteristic   │ DAST            │ SAST            │
├──────────────────┼─────────────────┼─────────────────┤
│ Testing Method   │ Black box       │ White box       │
│ Code Access      │ Not required    │ Required        │
│ Execution        │ Running app     │ Static code     │
│ When to Run      │ Late in SDLC    │ Early in SDLC   │
│ Coverage         │ Reachable code  │ All code        │
│ False Positives  │ Low             │ High            │
│ Performance      │ Slow            │ Fast            │
│ Configuration    │ Tests runtime   │ Misses runtime  │
│ Dependencies     │ Tests integrated│ Misses deps     │
└──────────────────┴─────────────────┴─────────────────┘

Ideal: Use both SAST and DAST for comprehensive coverage
```

## DAST Tools

### Popular DAST Tools

```python
class DASTTools:
    """Dynamic application security testing tools"""

    @staticmethod
    def tool_comparison():
        """Compare popular DAST tools"""
        return {
            'owasp_zap': {
                'name': 'OWASP ZAP (Zed Attack Proxy)',
                'type': 'Open source',
                'strengths': [
                    'Free and open source',
                    'Active community',
                    'Extensible (marketplace)',
                    'Good for CI/CD',
                    'API scanning',
                    'Automated + Manual testing'
                ],
                'weaknesses': [
                    'UI can be complex',
                    'Slower than commercial tools',
                    'Requires tuning'
                ],
                'use_cases': [
                    'Continuous scanning',
                    'API testing',
                    'Budget-constrained projects',
                    'Learning web security'
                ]
            },
            'burp_suite': {
                'name': 'Burp Suite',
                'type': 'Commercial (Community edition available)',
                'strengths': [
                    'Industry standard for manual testing',
                    'Excellent proxy/intercept',
                    'Extensions (BApps)',
                    'Great for manual pen testing',
                    'Scanner (Pro version)'
                ],
                'weaknesses': [
                    'Expensive (Pro)',
                    'Manual effort required',
                    'Limited automation (Community)'
                ],
                'use_cases': [
                    'Manual penetration testing',
                    'In-depth security assessment',
                    'Security research',
                    'Bug bounty hunting'
                ]
            },
            'acunetix': {
                'name': 'Acunetix',
                'type': 'Commercial',
                'strengths': [
                    'Fast scanning',
                    'Low false positives',
                    'Good JavaScript analysis',
                    'Network scanning',
                    'Compliance reporting'
                ],
                'weaknesses': [
                    'Expensive',
                    'Limited API testing',
                    'Closed source'
                ],
                'use_cases': [
                    'Enterprise web app testing',
                    'Compliance scanning',
                    'Large application portfolios'
                ]
            },
            'netsparker': {
                'name': 'Netsparker (Invicti)',
                'type': 'Commercial',
                'strengths': [
                    'Proof-based scanning (low FP)',
                    'Automatic exploitation',
                    'Good coverage',
                    'CI/CD integration'
                ],
                'weaknesses': [
                    'Expensive',
                    'Resource intensive'
                ],
                'use_cases': [
                    'Enterprise security testing',
                    'Reducing manual verification',
                    'DevSecOps integration'
                ]
            }
        }
```

## OWASP ZAP

### ZAP Usage and Automation

```python
import time
from zapv2 import ZAPv2

class OWASPZAPScanner:
    """OWASP ZAP automated scanning"""

    def __init__(self, zap_proxy: str = 'http://127.0.0.1:8080'):
        self.zap = ZAPv2(proxies={'http': zap_proxy, 'https': zap_proxy})
        self.target = None

    def spider_scan(self, target_url: str, max_depth: int = 5):
        """Spider/crawl application"""
        print(f'Spidering target {target_url}')
        self.target = target_url

        # Start spider
        scan_id = self.zap.spider.scan(target_url, maxdepth=max_depth)

        # Wait for spider to complete
        while int(self.zap.spider.status(scan_id)) < 100:
            print(f'Spider progress: {self.zap.spider.status(scan_id)}%')
            time.sleep(2)

        print('Spider completed')

    def active_scan(self, target_url: str = None):
        """Perform active vulnerability scan"""
        if target_url is None:
            target_url = self.target

        print(f'Active scanning {target_url}')

        # Start active scan
        scan_id = self.zap.ascan.scan(target_url)

        # Wait for scan to complete
        while int(self.zap.ascan.status(scan_id)) < 100:
            print(f'Scan progress: {self.zap.ascan.status(scan_id)}%')
            time.sleep(5)

        print('Active scan completed')

    def ajax_spider(self, target_url: str):
        """AJAX spider for JavaScript-heavy applications"""
        print(f'AJAX spidering {target_url}')

        # Start AJAX spider
        self.zap.ajaxSpider.scan(target_url)

        # Wait for completion
        while self.zap.ajaxSpider.status == 'running':
            print('AJAX spider running...')
            time.sleep(2)

        print('AJAX spider completed')

    def get_alerts(self, risk_level: str = None) -> list:
        """Get vulnerability alerts"""
        alerts = self.zap.core.alerts(baseurl=self.target)

        if risk_level:
            # Filter by risk level
            alerts = [a for a in alerts if a['risk'] == risk_level]

        return alerts

    def generate_report(self, output_file: str):
        """Generate HTML report"""
        report = self.zap.core.htmlreport()

        with open(output_file, 'w') as f:
            f.write(report)

        print(f'Report saved to {output_file}')

    def baseline_scan(self, target_url: str, config_file: str = None):
        """Quick baseline scan (passive only)"""
        print(f'Baseline scan of {target_url}')

        # Spider first
        self.spider_scan(target_url)

        # Get passive scan results
        alerts = self.get_alerts()

        return {
            'target': target_url,
            'total_alerts': len(alerts),
            'high_risk': len([a for a in alerts if a['risk'] == 'High']),
            'medium_risk': len([a for a in alerts if a['risk'] == 'Medium']),
            'low_risk': len([a for a in alerts if a['risk'] == 'Low']),
            'info': len([a for a in alerts if a['risk'] == 'Informational']),
            'alerts': alerts
        }

    def api_scan(self, openapi_spec: str, target_url: str):
        """Scan API using OpenAPI specification"""
        print(f'Importing OpenAPI spec: {openapi_spec}')

        # Import OpenAPI/Swagger spec
        self.zap.openapi.import_url(openapi_spec, target_url)

        # Active scan
        self.active_scan(target_url)

        return self.get_alerts()

    @staticmethod
    def zap_docker_scan():
        """Example: ZAP Docker scan"""
        return """
        # ZAP Baseline Scan (passive only, fast)
        docker run -t owasp/zap2docker-stable zap-baseline.py \\
          -t https://example.com

        # ZAP Full Scan (active scanning)
        docker run -t owasp/zap2docker-stable zap-full-scan.py \\
          -t https://example.com

        # ZAP API Scan
        docker run -t owasp/zap2docker-stable zap-api-scan.py \\
          -t https://example.com/api \\
          -f openapi \\
          -d /zap/wrk/openapi.yaml

        # Custom ZAP configuration
        docker run -t owasp/zap2docker-stable zap-baseline.py \\
          -t https://example.com \\
          -c zap.conf \\
          -r report.html
        """
```

## Testing Techniques

### Common DAST Testing Patterns

```python
class DASTTestingTechniques:
    """DAST testing techniques"""

    @staticmethod
    def authentication_testing():
        """Test authentication mechanisms"""
        return {
            'credential_testing': [
                'Default credentials',
                'Weak password policy',
                'Brute force protection',
                'Account lockout',
                'Password reset flaws'
            ],
            'session_management': [
                'Session fixation',
                'Session hijacking',
                'Secure session tokens',
                'Session timeout',
                'Logout functionality'
            ],
            'bypass_attempts': [
                'Direct object reference',
                'Path manipulation',
                'Parameter tampering',
                'Forced browsing'
            ]
        }

    @staticmethod
    def injection_testing():
        """Test for injection vulnerabilities"""
        return {
            'sql_injection': {
                'techniques': [
                    "Username: admin' OR '1'='1",
                    "Union-based injection",
                    "Time-based blind injection",
                    "Error-based injection"
                ],
                'locations': [
                    'Login forms',
                    'Search functionality',
                    'URL parameters',
                    'Headers (rare)'
                ]
            },
            'xss': {
                'reflected': "<script>alert('XSS')</script>",
                'stored': "Persistent XSS in user profile",
                'dom_based': "JavaScript-based XSS",
                'locations': [
                    'Input fields',
                    'URL parameters',
                    'HTTP headers',
                    'File uploads'
                ]
            },
            'command_injection': {
                'payloads': [
                    '; ls -la',
                    '| cat /etc/passwd',
                    '`whoami`',
                    '$(whoami)'
                ],
                'locations': [
                    'File operations',
                    'System commands',
                    'Log viewers'
                ]
            }
        }

    @staticmethod
    def configuration_testing():
        """Test security configuration"""
        return {
            'security_headers': [
                'Content-Security-Policy',
                'X-Frame-Options',
                'X-Content-Type-Options',
                'Strict-Transport-Security',
                'X-XSS-Protection'
            ],
            'ssl_tls': [
                'Protocol version (TLS 1.2+)',
                'Cipher suites',
                'Certificate validity',
                'HSTS implementation'
            ],
            'error_handling': [
                'Stack traces exposed',
                'Verbose error messages',
                'Debug mode enabled',
                'Server version disclosure'
            ]
        }
```

## API Testing

### API Security Testing

```python
import requests
from typing import Dict, List

class APISecurityTester:
    """DAST for REST APIs"""

    def __init__(self, base_url: str, auth_token: str = None):
        self.base_url = base_url
        self.session = requests.Session()
        if auth_token:
            self.session.headers['Authorization'] = f'Bearer {auth_token}'

    def test_authentication(self) -> List[Dict]:
        """Test API authentication"""
        findings = []

        # Test unauthenticated access
        response = requests.get(f'{self.base_url}/api/users')
        if response.status_code == 200:
            findings.append({
                'severity': 'HIGH',
                'issue': 'Unauthenticated access to /api/users',
                'description': 'API endpoint accessible without authentication'
            })

        # Test weak/no rate limiting
        rapid_requests = []
        for _ in range(100):
            r = requests.get(f'{self.base_url}/api/login')
            rapid_requests.append(r.status_code)

        if all(status == 200 for status in rapid_requests):
            findings.append({
                'severity': 'MEDIUM',
                'issue': 'No rate limiting on /api/login',
                'description': '100 requests succeeded without rate limiting'
            })

        return findings

    def test_authorization(self) -> List[Dict]:
        """Test API authorization (IDOR, privilege escalation)"""
        findings = []

        # Test IDOR (Insecure Direct Object Reference)
        # Try accessing another user's data
        response = self.session.get(f'{self.base_url}/api/users/1')
        if response.status_code == 200:
            # Try different user ID
            response2 = self.session.get(f'{self.base_url}/api/users/2')
            if response2.status_code == 200:
                findings.append({
                    'severity': 'HIGH',
                    'issue': 'IDOR vulnerability in /api/users/:id',
                    'description': 'Can access other users\' data by changing ID'
                })

        return findings

    def test_injection(self, endpoint: str, param: str) -> List[Dict]:
        """Test for injection vulnerabilities in API"""
        findings = []

        # SQL injection payloads
        sql_payloads = [
            "' OR '1'='1",
            "1' UNION SELECT NULL--",
            "1'; DROP TABLE users--"
        ]

        for payload in sql_payloads:
            response = self.session.get(
                f'{self.base_url}{endpoint}',
                params={param: payload}
            )

            # Check for SQL errors
            error_indicators = ['sql', 'mysql', 'sqlite', 'postgresql', 'syntax error']
            if any(indicator in response.text.lower() for indicator in error_indicators):
                findings.append({
                    'severity': 'CRITICAL',
                    'issue': f'SQL Injection in {endpoint}?{param}=',
                    'description': f'SQL error with payload: {payload}',
                    'response': response.text[:200]
                })
                break

        return findings

    def test_mass_assignment(self, endpoint: str) -> List[Dict]:
        """Test for mass assignment vulnerabilities"""
        findings = []

        # Try adding admin field
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'is_admin': True  # Attempt privilege escalation
        }

        response = self.session.post(f'{self.base_url}{endpoint}', json=data)

        if response.status_code == 201:
            # Check if is_admin was set
            user_data = response.json()
            if user_data.get('is_admin') == True:
                findings.append({
                    'severity': 'CRITICAL',
                    'issue': f'Mass assignment vulnerability in {endpoint}',
                    'description': 'Can set is_admin field during user creation'
                })

        return findings

    def test_excessive_data_exposure(self, endpoint: str) -> List[Dict]:
        """Test for excessive data exposure"""
        findings = []

        response = self.session.get(f'{self.base_url}{endpoint}')

        if response.status_code == 200:
            data = response.json()

            # Check for sensitive fields
            sensitive_fields = ['password', 'password_hash', 'token', 'secret', 'api_key']

            if isinstance(data, dict):
                exposed_fields = [field for field in sensitive_fields if field in data]
                if exposed_fields:
                    findings.append({
                        'severity': 'HIGH',
                        'issue': f'Excessive data exposure in {endpoint}',
                        'description': f'Sensitive fields exposed: {exposed_fields}'
                    })

        return findings
```

## CI/CD Integration

### Automated DAST in Pipeline

```yaml
# GitHub Actions DAST Example
name: DAST Security Scan

on:
  schedule:
    - cron: '0 2 * * 0'  # Weekly on Sunday
  workflow_dispatch:     # Manual trigger

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to staging
        run: # Deploy application to staging environment

  zap-baseline:
    name: ZAP Baseline Scan
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - name: ZAP Scan
        uses: zaproxy/action-baseline@v0.7.0
        with:
          target: 'https://staging.example.com'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a'

  zap-full-scan:
    name: ZAP Full Scan
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - name: ZAP Full Scan
        uses: zaproxy/action-full-scan@v0.4.0
        with:
          target: 'https://staging.example.com'
          allow_issue_writing: false

  api-scan:
    name: API Security Test
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run API tests
        run: |
          python api_security_tests.py

      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: api-scan-results
          path: api-results.json
```

## Best Practices

```python
class DASTBestPractices:
    """DAST implementation best practices"""

    RECOMMENDATIONS = """
    DAST Best Practices:

    1. Environment
       ✓ Test in staging/QA, not production
       ✓ Use production-like data (anonymized)
       ✓ Isolated network segment
       ✓ Coordinate with operations

    2. Scanning Strategy
       ✓ Start with passive/baseline scans
       ✓ Gradually increase aggressiveness
       ✓ Schedule during off-hours
       ✓ Monitor application during scan
       ✓ Have rollback plan

    3. Coverage
       ✓ Authenticated scanning
       ✓ Multiple user roles
       ✓ All application functionality
       ✓ API endpoints
       ✓ AJAX/JavaScript functionality

    4. Configuration
       ✓ Define scan scope clearly
       ✓ Exclude logout/delete actions
       ✓ Tune scan policies
       ✓ Configure authentication
       ✓ Set rate limits

    5. Results Management
       ✓ Triage findings quickly
       ✓ Verify vulnerabilities
       ✓ Reduce false positives
       ✓ Track in issue system
       ✓ Retest after fixes

    6. Integration
       ✓ CI/CD pipeline
       ✓ Regular scheduled scans
       ✓ Alert on critical findings
       ✓ Dashboard reporting
       ✓ Metrics tracking

    7. Complementary Testing
       ✓ Combine with SAST
       ✓ Manual penetration testing
       ✓ Bug bounty program
       ✓ Vulnerability scanning
       ✓ Security monitoring
    """
```

## Summary

Dynamic Analysis (DAST) tests running applications for vulnerabilities:

- **Tools**: OWASP ZAP (open-source), Burp Suite (manual testing), Acunetix (commercial)
- **Advantages**: Tests runtime behavior, low false positives, no source code needed
- **Techniques**: Injection testing, authentication testing, API security testing
- **API Testing**: Authentication, authorization (IDOR), injection, mass assignment
- **CI/CD**: Automated scans in pipeline, baseline scans, scheduled full scans
- **Best Practices**: Test in staging, authenticated scanning, coordinate with ops, verify findings

DAST complements SAST by finding runtime issues, configuration problems, and integration vulnerabilities that static analysis cannot detect.
