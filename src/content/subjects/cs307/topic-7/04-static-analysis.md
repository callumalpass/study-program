# Static Analysis

Static Application Security Testing (SAST) analyzes source code without executing it to find security vulnerabilities. This subtopic covers SAST tools, code scanning techniques, and managing false positives.

## SAST Overview

SAST examines source code, bytecode, or binaries for security flaws.

### SAST Characteristics

```
SAST Properties:

Advantages:
+ Early detection (find issues in development)
+ No running application needed
+ Complete code coverage possible
+ Find exact vulnerability location
+ Identify root cause
+ Integrate in IDE/CI/CD

Disadvantages:
- High false positive rate
- Can't detect runtime issues
- Configuration-dependent vulnerabilities missed
- Business logic flaws difficult to detect
- Language/framework specific
- Requires source code access

Best Used For:
• Code-level vulnerabilities
• Common security patterns
• Compliance requirements
• Developer education
• Continuous integration
```

## SAST Tools

### Popular SAST Tools by Language

```python
class SASTTools:
    """Static analysis security testing tools"""

    @staticmethod
    def tools_by_language():
        """SAST tools organized by programming language"""
        return {
            'python': {
                'bandit': {
                    'type': 'Open source',
                    'strengths': ['Fast', 'Easy to integrate', 'Good coverage'],
                    'weaknesses': ['Limited configuration', 'Some false positives'],
                    'usage': 'bandit -r /path/to/code'
                },
                'pyre': {
                    'type': 'Open source (Facebook)',
                    'strengths': ['Type checking', 'Taint analysis'],
                    'weaknesses': ['Setup complexity', 'Performance'],
                    'usage': 'pyre check'
                },
                'semgrep': {
                    'type': 'Open source',
                    'strengths': ['Custom rules', 'Fast', 'Multi-language'],
                    'weaknesses': ['Rule writing learning curve'],
                    'usage': 'semgrep --config=auto .'
                }
            },
            'javascript': {
                'eslint_security': {
                    'type': 'Open source plugin',
                    'strengths': ['IDE integration', 'Customizable'],
                    'weaknesses': ['Requires configuration'],
                    'usage': 'eslint --plugin security .'
                },
                'nodejsscan': {
                    'type': 'Open source',
                    'strengths': ['Node.js specific', 'Pattern matching'],
                    'weaknesses': ['Limited to Node.js'],
                    'usage': 'nodejsscan -d /path/to/code'
                }
            },
            'java': {
                'spotbugs': {
                    'type': 'Open source',
                    'strengths': ['Mature', 'Good coverage'],
                    'weaknesses': ['Bytecode analysis only'],
                    'usage': 'spotbugs -textui myApp.jar'
                },
                'find_sec_bugs': {
                    'type': 'Open source (SpotBugs plugin)',
                    'strengths': ['Security-focused', 'OWASP patterns'],
                    'weaknesses': ['Requires SpotBugs'],
                    'usage': 'Used as SpotBugs plugin'
                }
            },
            'c_cpp': {
                'cppcheck': {
                    'type': 'Open source',
                    'strengths': ['Memory safety', 'Undefined behavior'],
                    'weaknesses': ['High false positives'],
                    'usage': 'cppcheck --enable=all /path/to/code'
                },
                'flawfinder': {
                    'type': 'Open source',
                    'strengths': ['Simple', 'Fast'],
                    'weaknesses': ['Surface-level analysis'],
                    'usage': 'flawfinder /path/to/code'
                }
            },
            'multi_language': {
                'sonarqube': {
                    'type': 'Commercial/Community',
                    'languages': ['30+ languages'],
                    'strengths': ['Comprehensive', 'Dashboard', 'CI/CD integration'],
                    'weaknesses': ['Resource intensive', 'Setup complexity'],
                    'features': ['Security hotspots', 'Quality gates', 'Trend analysis']
                },
                'semgrep': {
                    'type': 'Open source',
                    'languages': ['20+ languages'],
                    'strengths': ['Fast', 'Custom rules', 'Low false positives'],
                    'weaknesses': ['Limited built-in rules'],
                    'features': ['Pattern matching', 'Taint tracking', 'CI integration']
                },
                'checkmarx': {
                    'type': 'Commercial',
                    'languages': ['25+ languages'],
                    'strengths': ['Accurate', 'Low false positives', 'Support'],
                    'weaknesses': ['Expensive', 'Slow scans'],
                    'features': ['Data flow analysis', 'Remediation guidance']
                }
            }
        }
```

### SAST Integration

```python
import subprocess
import json
from typing import List, Dict
from dataclasses import dataclass

@dataclass
class SASTFinding:
    """SAST finding/issue"""
    tool: str
    file_path: str
    line_number: int
    severity: str
    issue_type: str
    description: str
    cwe_id: str = None
    confidence: str = None

class SASTIntegration:
    """Integrate multiple SAST tools"""

    def __init__(self):
        self.findings = []

    def run_bandit(self, path: str) -> List[SASTFinding]:
        """Run Bandit (Python) SAST"""
        try:
            result = subprocess.run(
                ['bandit', '-r', path, '-f', 'json'],
                capture_output=True,
                text=True,
                timeout=300
            )

            data = json.loads(result.stdout)
            findings = []

            for issue in data.get('results', []):
                finding = SASTFinding(
                    tool='bandit',
                    file_path=issue['filename'],
                    line_number=issue['line_number'],
                    severity=issue['issue_severity'],
                    issue_type=issue['test_id'],
                    description=issue['issue_text'],
                    confidence=issue['issue_confidence'],
                    cwe_id=str(issue.get('issue_cwe', {}).get('id', ''))
                )
                findings.append(finding)

            return findings

        except subprocess.TimeoutExpired:
            print("Bandit scan timed out")
            return []
        except Exception as e:
            print(f"Bandit error: {e}")
            return []

    def run_semgrep(self, path: str) -> List[SASTFinding]:
        """Run Semgrep multi-language SAST"""
        try:
            result = subprocess.run(
                ['semgrep', '--config=auto', '--json', path],
                capture_output=True,
                text=True,
                timeout=300
            )

            data = json.loads(result.stdout)
            findings = []

            for issue in data.get('results', []):
                finding = SASTFinding(
                    tool='semgrep',
                    file_path=issue['path'],
                    line_number=issue['start']['line'],
                    severity=issue['extra']['severity'],
                    issue_type=issue['check_id'],
                    description=issue['extra']['message'],
                    cwe_id=issue['extra'].get('metadata', {}).get('cwe', '')
                )
                findings.append(finding)

            return findings

        except Exception as e:
            print(f"Semgrep error: {e}")
            return []

    def run_eslint_security(self, path: str) -> List[SASTFinding]:
        """Run ESLint with security plugin (JavaScript)"""
        try:
            result = subprocess.run(
                ['eslint', '--plugin', 'security', '--format', 'json', path],
                capture_output=True,
                text=True,
                timeout=300
            )

            data = json.loads(result.stdout)
            findings = []

            for file_result in data:
                for message in file_result.get('messages', []):
                    if 'security/' in message.get('ruleId', ''):
                        finding = SASTFinding(
                            tool='eslint-security',
                            file_path=file_result['filePath'],
                            line_number=message['line'],
                            severity=self._map_eslint_severity(message['severity']),
                            issue_type=message['ruleId'],
                            description=message['message']
                        )
                        findings.append(finding)

            return findings

        except Exception as e:
            print(f"ESLint error: {e}")
            return []

    def aggregate_findings(self, findings_list: List[List[SASTFinding]]) -> Dict:
        """Aggregate findings from multiple tools"""
        all_findings = []
        for findings in findings_list:
            all_findings.extend(findings)

        # Group by severity
        by_severity = {'CRITICAL': [], 'HIGH': [], 'MEDIUM': [], 'LOW': []}
        for finding in all_findings:
            severity = finding.severity.upper()
            if severity in by_severity:
                by_severity[severity].append(finding)

        return {
            'total': len(all_findings),
            'by_severity': {k: len(v) for k, v in by_severity.items()},
            'by_tool': self._group_by_tool(all_findings),
            'findings': all_findings
        }

    def _map_eslint_severity(self, severity: int) -> str:
        """Map ESLint severity to standard"""
        return 'HIGH' if severity == 2 else 'MEDIUM'

    def _group_by_tool(self, findings: List[SASTFinding]) -> Dict:
        """Group findings by tool"""
        by_tool = {}
        for finding in findings:
            if finding.tool not in by_tool:
                by_tool[finding.tool] = 0
            by_tool[finding.tool] += 1
        return by_tool
```

## False Positive Management

### Handling False Positives

```python
class FalsePositiveManager:
    """Manage SAST false positives"""

    def __init__(self):
        self.suppressions = []
        self.false_positive_rate = 0.0

    def mark_false_positive(self, finding: SASTFinding, reason: str):
        """Mark finding as false positive with justification"""
        suppression = {
            'tool': finding.tool,
            'file': finding.file_path,
            'line': finding.line_number,
            'issue_type': finding.issue_type,
            'reason': reason,
            'reviewed_by': 'security_team',
            'date': '2024-01-01'
        }
        self.suppressions.append(suppression)

    def is_suppressed(self, finding: SASTFinding) -> bool:
        """Check if finding is suppressed"""
        for supp in self.suppressions:
            if (supp['file'] == finding.file_path and
                supp['line'] == finding.line_number and
                supp['issue_type'] == finding.issue_type):
                return True
        return False

    def review_suppressions(self):
        """Periodically review suppressions"""
        # Review suppressions quarterly
        # Remove outdated suppressions
        # Re-validate false positive determinations
        pass

    @staticmethod
    def false_positive_categories():
        """Common false positive categories"""
        return {
            'test_code': {
                'description': 'Finding in test files',
                'action': 'Suppress with justification',
                'example': 'Hardcoded credential in unit test'
            },
            'dead_code': {
                'description': 'Unreachable code',
                'action': 'Remove code or suppress',
                'example': 'Vulnerability in commented-out code'
            },
            'framework_specific': {
                'description': 'Framework handles security',
                'action': 'Verify framework protection, suppress',
                'example': 'XSS in template with auto-escaping'
            },
            'compensating_control': {
                'description': 'Protected by other mechanism',
                'action': 'Document control, suppress',
                'example': 'SQL injection protected by WAF'
            },
            'tool_limitation': {
                'description': 'Tool misunderstands code',
                'action': 'Report to vendor, suppress temporarily',
                'example': 'False data flow analysis'
            }
        }

    @staticmethod
    def reducing_false_positives():
        """Strategies to reduce false positives"""
        return {
            'tool_tuning': [
                'Configure severity thresholds',
                'Disable unreliable checks',
                'Customize rule sets',
                'Use multiple tools (consensus)',
                'Update tools regularly'
            ],
            'code_patterns': [
                'Use security libraries correctly',
                'Add code annotations',
                'Follow framework patterns',
                'Document security decisions',
                'Use type hints (Python)'
            ],
            'process': [
                'Manual review of findings',
                'Security expert validation',
                'Developer training',
                'Suppression with justification',
                'Regular review of suppressions'
            ]
        }
```

## Custom Rules

### Writing Custom SAST Rules

```python
class CustomSASTRules:
    """Custom SAST rule development"""

    @staticmethod
    def semgrep_custom_rule_example():
        """Example custom Semgrep rule"""
        return """
# File: custom-rules.yaml
rules:
  - id: hardcoded-api-key
    pattern: |
      api_key = "$VALUE"
    message: Hardcoded API key detected
    severity: ERROR
    languages: [python]
    metadata:
      category: security
      cwe: "CWE-798: Use of Hard-coded Credentials"

  - id: sql-injection-format
    pattern: |
      cursor.execute(f"... {$VAR} ...")
    message: Potential SQL injection using f-string
    severity: ERROR
    languages: [python]
    metadata:
      category: security
      cwe: "CWE-89: SQL Injection"

  - id: weak-crypto
    pattern-either:
      - pattern: hashlib.md5(...)
      - pattern: hashlib.sha1(...)
    message: Weak cryptographic hash function
    severity: WARNING
    languages: [python]
    metadata:
      category: security
      cwe: "CWE-327: Use of a Broken Cryptographic Algorithm"

  - id: eval-usage
    pattern: eval($VAR)
    message: Use of eval() is dangerous
    severity: ERROR
    languages: [python]
    metadata:
      category: security
      cwe: "CWE-95: Improper Neutralization of Directives"
"""

    @staticmethod
    def run_custom_semgrep_rules(path: str, rules_file: str):
        """Run Semgrep with custom rules"""
        import subprocess

        result = subprocess.run(
            ['semgrep', '--config', rules_file, '--json', path],
            capture_output=True,
            text=True
        )

        return json.loads(result.stdout)
```

## CI/CD Integration

### SAST in Pipeline

```yaml
# GitHub Actions SAST Example
name: SAST Security Scan

on: [push, pull_request]

jobs:
  bandit:
    name: Bandit Python SAST
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Bandit
        run: |
          pip install bandit
          bandit -r . -f json -o bandit-report.json || true

      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: bandit-report
          path: bandit-report.json

  semgrep:
    name: Semgrep Multi-language
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: auto

  sonarcloud:
    name: SonarCloud Analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Full history for blame

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

  security-gate:
    name: Security Quality Gate
    runs-on: ubuntu-latest
    needs: [bandit, semgrep, sonarcloud]
    steps:
      - name: Check thresholds
        run: |
          # Fail if critical or high severity issues
          python scripts/check_sast_threshold.py
```

## Best Practices

```python
class SASTBestPractices:
    """SAST implementation best practices"""

    RECOMMENDATIONS = """
    SAST Best Practices:

    1. Tool Selection
       ✓ Choose tools for your languages
       ✓ Consider accuracy vs speed
       ✓ Evaluate false positive rate
       ✓ Check CI/CD integration
       ✓ Consider cost (open source vs commercial)

    2. Integration
       ✓ Run in IDE (developer feedback)
       ✓ Pre-commit hooks
       ✓ CI/CD pipeline
       ✓ Scheduled full scans
       ✓ Pull request checks

    3. Configuration
       ✓ Start with high-severity only
       ✓ Gradually increase coverage
       ✓ Customize rules for codebase
       ✓ Tune thresholds
       ✓ Suppress false positives with justification

    4. Workflow
       ✓ Triage findings promptly
       ✓ Assign to developers
       ✓ Track in issue tracker
       ✓ Define SLAs by severity
       ✓ Verify fixes

    5. False Positive Management
       ✓ Review and validate findings
       ✓ Document suppressions
       ✓ Review suppressions quarterly
       ✓ Improve code to reduce FPs
       ✓ Provide feedback to tool vendor

    6. Developer Enablement
       ✓ Train on secure coding
       ✓ Explain findings (not just report)
       ✓ Provide fix guidance
       ✓ Celebrate improvements
       ✓ Make security easy

    7. Metrics
       ✓ Track vulnerabilities found
       ✓ Time to remediation
       ✓ False positive rate
       ✓ Coverage percentage
       ✓ Developer satisfaction
    """
```

## Summary

Static Analysis (SAST) finds vulnerabilities in source code:

- **Tools**: Bandit (Python), ESLint (JavaScript), SonarQube (multi-language), Semgrep (custom rules)
- **Advantages**: Early detection, pinpoint exact location, no runtime needed
- **Challenges**: False positives, can't find runtime issues, requires tuning
- **Integration**: IDE plugins, pre-commit hooks, CI/CD pipelines
- **False Positives**: Review, suppress with justification, periodic review, tool tuning
- **Custom Rules**: Write project-specific security patterns (Semgrep YAML)

Effective SAST requires: appropriate tool selection, proper configuration, false positive management, developer training, and continuous improvement.
