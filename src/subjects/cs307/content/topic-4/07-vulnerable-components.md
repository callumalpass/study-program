# Vulnerable and Outdated Components

## Introduction

Using components with known vulnerabilities is one of the most critical security risks in modern applications. Applications today rely heavily on third-party libraries, frameworks, and dependencies. When these components contain vulnerabilities, they expose the entire application to potential exploitation. According to OWASP, this issue is widespread because many organizations don't track or update their dependencies regularly.

This lesson focuses on identifying vulnerable components, implementing dependency management best practices, and maintaining a secure software supply chain.

## Understanding the Dependency Problem

Modern applications can have hundreds or thousands of dependencies, including transitive dependencies (dependencies of dependencies).

### Dependency Tree Example

```bash
# Node.js example - showing dependency tree
npm ls

# Output shows the complexity:
my-app@1.0.0
├─┬ express@4.17.1
│ ├─┬ body-parser@1.19.0
│ │ ├─┬ debug@2.6.9
│ │ │ └── ms@2.0.0
│ │ ├── http-errors@1.7.2
│ │ └─┬ type-is@1.6.18
│ │   └── media-typer@0.3.0
│ ├── cookie@0.4.0
│ └─┬ send@0.17.1
│   └─┬ mime@1.6.0
...

# A simple app can have 200+ dependencies
# Each dependency is a potential vulnerability
```

## CVE Tracking and Monitoring

### Setting Up Automated Vulnerability Scanning

```python
# Python: Using safety to check for known vulnerabilities
import subprocess
import json
from datetime import datetime

class DependencyScanner:
    """Scan dependencies for known vulnerabilities"""

    def __init__(self, project_path):
        self.project_path = project_path
        self.vulnerabilities = []

    def scan_python_dependencies(self):
        """Scan Python dependencies using safety"""
        try:
            # Generate requirements file
            subprocess.run(
                ['pip', 'freeze', '>', 'requirements.txt'],
                shell=True,
                cwd=self.project_path
            )

            # Run safety check
            result = subprocess.run(
                ['safety', 'check', '--json'],
                capture_output=True,
                text=True,
                cwd=self.project_path
            )

            if result.stdout:
                vulnerabilities = json.loads(result.stdout)
                return self.process_vulnerabilities(vulnerabilities)

        except Exception as e:
            print(f"Error scanning dependencies: {e}")
            return []

    def process_vulnerabilities(self, vulnerabilities):
        """Process and categorize vulnerabilities"""
        processed = []

        for vuln in vulnerabilities:
            processed.append({
                'package': vuln.get('package'),
                'installed_version': vuln.get('installed_version'),
                'vulnerable_spec': vuln.get('vulnerable_spec'),
                'cve': vuln.get('cve'),
                'advisory': vuln.get('advisory'),
                'severity': self.determine_severity(vuln),
                'fixed_version': vuln.get('fixed_version')
            })

        return processed

    def determine_severity(self, vuln):
        """Determine vulnerability severity"""
        advisory = vuln.get('advisory', '').lower()

        if 'critical' in advisory or 'rce' in advisory:
            return 'CRITICAL'
        elif 'high' in advisory:
            return 'HIGH'
        elif 'moderate' in advisory or 'medium' in advisory:
            return 'MEDIUM'
        else:
            return 'LOW'

    def generate_report(self, vulnerabilities):
        """Generate vulnerability report"""
        report = {
            'timestamp': datetime.now().isoformat(),
            'total_vulnerabilities': len(vulnerabilities),
            'by_severity': {
                'CRITICAL': 0,
                'HIGH': 0,
                'MEDIUM': 0,
                'LOW': 0
            },
            'vulnerabilities': vulnerabilities
        }

        for vuln in vulnerabilities:
            severity = vuln.get('severity', 'LOW')
            report['by_severity'][severity] += 1

        return report

# Usage
scanner = DependencyScanner('/path/to/project')
vulnerabilities = scanner.scan_python_dependencies()
report = scanner.generate_report(vulnerabilities)

# Alert on critical vulnerabilities
if report['by_severity']['CRITICAL'] > 0:
    send_alert(f"CRITICAL: {report['by_severity']['CRITICAL']} critical vulnerabilities found")
```

### JavaScript/Node.js Dependency Scanning

```javascript
// Node.js: Automated vulnerability scanning
const { execSync } = require('child_process');
const fs = require('fs');

class NodeDependencyScanner {
    constructor(projectPath) {
        this.projectPath = projectPath;
    }

    /**
     * Scan npm dependencies for vulnerabilities
     */
    scanDependencies() {
        try {
            // Run npm audit with JSON output
            const result = execSync('npm audit --json', {
                cwd: this.projectPath,
                encoding: 'utf-8'
            });

            const auditData = JSON.parse(result);
            return this.processAuditResults(auditData);

        } catch (error) {
            // npm audit exits with non-zero code if vulnerabilities found
            if (error.stdout) {
                const auditData = JSON.parse(error.stdout);
                return this.processAuditResults(auditData);
            }
            throw error;
        }
    }

    /**
     * Process npm audit results
     */
    processAuditResults(auditData) {
        const vulnerabilities = [];

        // Process advisories
        if (auditData.advisories) {
            for (const [id, advisory] of Object.entries(auditData.advisories)) {
                vulnerabilities.push({
                    id: id,
                    title: advisory.title,
                    module_name: advisory.module_name,
                    severity: advisory.severity.toUpperCase(),
                    cve: advisory.cves.join(', '),
                    vulnerable_versions: advisory.vulnerable_versions,
                    patched_versions: advisory.patched_versions,
                    recommendation: advisory.recommendation,
                    url: advisory.url
                });
            }
        }

        return {
            timestamp: new Date().toISOString(),
            total_vulnerabilities: vulnerabilities.length,
            by_severity: this.countBySeverity(vulnerabilities),
            vulnerabilities: vulnerabilities
        };
    }

    /**
     * Count vulnerabilities by severity
     */
    countBySeverity(vulnerabilities) {
        const counts = {
            CRITICAL: 0,
            HIGH: 0,
            MODERATE: 0,
            LOW: 0
        };

        for (const vuln of vulnerabilities) {
            counts[vuln.severity] = (counts[vuln.severity] || 0) + 1;
        }

        return counts;
    }

    /**
     * Attempt automated fix
     */
    attemptAutoFix() {
        try {
            console.log('Attempting to fix vulnerabilities...');

            // Run npm audit fix
            execSync('npm audit fix', {
                cwd: this.projectPath,
                stdio: 'inherit'
            });

            console.log('Auto-fix completed');

            // Scan again to check remaining vulnerabilities
            return this.scanDependencies();

        } catch (error) {
            console.error('Auto-fix failed:', error.message);
            return null;
        }
    }
}

// Usage
const scanner = new NodeDependencyScanner(process.cwd());
const report = scanner.scanDependencies();

console.log(`Found ${report.total_vulnerabilities} vulnerabilities`);
console.log('By severity:', report.by_severity);

// Attempt to auto-fix
if (report.total_vulnerabilities > 0) {
    const updatedReport = scanner.attemptAutoFix();
    if (updatedReport && updatedReport.total_vulnerabilities > 0) {
        console.log('Manual intervention required for remaining vulnerabilities');
    }
}
```

## Dependency Management Best Practices

### Lock Files and Version Pinning

```python
# Python: requirements.txt with pinned versions

# BAD - Unpinned versions
requests>=2.0
flask
django>3.0

# GOOD - Pinned versions
requests==2.28.1
flask==2.2.2
django==4.1.3

# Use pip-tools to manage dependencies
# requirements.in (high-level dependencies)
"""
requests
flask
django
"""

# Generate pinned requirements.txt
# pip-compile requirements.in

# Requirements.txt will contain all transitive dependencies pinned
```

```json
// Node.js: package-lock.json
// ALWAYS commit package-lock.json to version control

{
  "name": "my-app",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "my-app",
      "version": "1.0.0",
      "dependencies": {
        "express": "4.18.2"
      }
    },
    "node_modules/express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-...",
      "dependencies": {
        "accepts": "~1.3.8",
        "array-flatten": "1.1.1"
      }
    }
  }
}
```

### Automated Dependency Updates

```yaml
# GitHub Dependabot configuration
# .github/dependabot.yml

version: 2
updates:
  # Enable version updates for npm
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    # Limit number of open pull requests
    open-pull-requests-limit: 10
    # Group minor and patch updates
    groups:
      production-dependencies:
        dependency-type: "production"
        update-types:
          - "minor"
          - "patch"
      development-dependencies:
        dependency-type: "development"
        update-types:
          - "minor"
          - "patch"

  # Enable version updates for Python
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"
    # Only security updates for production
    open-pull-requests-limit: 5

  # Enable version updates for Docker
  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"
```

### Dependency Review Process

```python
class DependencyReviewWorkflow:
    """Workflow for reviewing and approving dependency updates"""

    def __init__(self):
        self.pending_updates = []

    def review_update(self, package, current_version, new_version):
        """Review a dependency update"""

        review = {
            'package': package,
            'current_version': current_version,
            'new_version': new_version,
            'checks': {}
        }

        # Check 1: Is it a major version change?
        review['checks']['is_major_update'] = self.is_major_version_change(
            current_version, new_version
        )

        # Check 2: Are there known vulnerabilities in current version?
        review['checks']['has_vulnerabilities'] = self.check_vulnerabilities(
            package, current_version
        )

        # Check 3: What's in the changelog?
        review['checks']['changelog'] = self.fetch_changelog(
            package, current_version, new_version
        )

        # Check 4: Are tests passing with new version?
        review['checks']['tests_passing'] = self.run_tests_with_update(
            package, new_version
        )

        # Check 5: Is the package still maintained?
        review['checks']['is_maintained'] = self.check_maintenance_status(package)

        # Decision
        review['recommendation'] = self.make_recommendation(review['checks'])

        return review

    def is_major_version_change(self, current, new):
        """Check if version change is major (semver)"""
        current_major = int(current.split('.')[0])
        new_major = int(new.split('.')[0])
        return new_major > current_major

    def check_vulnerabilities(self, package, version):
        """Check if current version has known vulnerabilities"""
        # Query vulnerability database
        # Return list of CVEs
        return []

    def make_recommendation(self, checks):
        """Make update recommendation based on checks"""

        # Critical: Security vulnerabilities - APPROVE immediately
        if checks['has_vulnerabilities']:
            return {
                'action': 'APPROVE',
                'priority': 'CRITICAL',
                'reason': 'Security vulnerabilities in current version'
            }

        # Major version changes require manual review
        if checks['is_major_update']:
            return {
                'action': 'MANUAL_REVIEW',
                'priority': 'MEDIUM',
                'reason': 'Major version change - check for breaking changes'
            }

        # Tests failing - REJECT
        if not checks['tests_passing']:
            return {
                'action': 'REJECT',
                'priority': 'HIGH',
                'reason': 'Tests failing with new version'
            }

        # Unmaintained package - INVESTIGATE
        if not checks['is_maintained']:
            return {
                'action': 'INVESTIGATE',
                'priority': 'MEDIUM',
                'reason': 'Package appears unmaintained - consider alternatives'
            }

        # Default: Minor/patch update with passing tests - APPROVE
        return {
            'action': 'APPROVE',
            'priority': 'LOW',
            'reason': 'Minor/patch update with passing tests'
        }
```

## Software Bill of Materials (SBOM)

An SBOM is a complete inventory of all components in your application.

### Generating SBOM

```python
# Generate SBOM for Python project
import json
import subprocess
from datetime import datetime

class SBOMGenerator:
    """Generate Software Bill of Materials"""

    def __init__(self, project_name, project_version):
        self.project_name = project_name
        self.project_version = project_version

    def generate_sbom(self):
        """Generate SBOM in CycloneDX format"""

        sbom = {
            'bomFormat': 'CycloneDX',
            'specVersion': '1.4',
            'version': 1,
            'metadata': {
                'timestamp': datetime.now().isoformat(),
                'component': {
                    'type': 'application',
                    'name': self.project_name,
                    'version': self.project_version
                }
            },
            'components': []
        }

        # Get list of installed packages
        result = subprocess.run(
            ['pip', 'list', '--format=json'],
            capture_output=True,
            text=True
        )

        packages = json.loads(result.stdout)

        for package in packages:
            component = {
                'type': 'library',
                'name': package['name'],
                'version': package['version'],
                'purl': f"pkg:pypi/{package['name']}@{package['version']}"
            }

            # Get package metadata
            metadata = self.get_package_metadata(package['name'])
            if metadata:
                component['licenses'] = metadata.get('licenses', [])
                component['description'] = metadata.get('description', '')

            sbom['components'].append(component)

        return sbom

    def get_package_metadata(self, package_name):
        """Get package metadata from PyPI"""
        try:
            result = subprocess.run(
                ['pip', 'show', package_name, '--verbose'],
                capture_output=True,
                text=True
            )

            # Parse output
            metadata = {}
            for line in result.stdout.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    metadata[key.strip().lower()] = value.strip()

            return metadata

        except Exception as e:
            return None

    def save_sbom(self, filename='sbom.json'):
        """Save SBOM to file"""
        sbom = self.generate_sbom()

        with open(filename, 'w') as f:
            json.dump(sbom, f, indent=2)

        print(f"SBOM generated: {filename}")
        print(f"Total components: {len(sbom['components'])}")

        return filename

# Usage
generator = SBOMGenerator('my-application', '1.0.0')
generator.save_sbom()
```

## Continuous Monitoring

### CI/CD Integration

```yaml
# GitHub Actions workflow for dependency scanning
# .github/workflows/security-scan.yml

name: Security Scan

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    # Run daily at 2 AM
    - cron: '0 2 * * *'

jobs:
  dependency-scan:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'

    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install safety bandit

    - name: Security scan with Safety
      run: |
        pip install -r requirements.txt
        safety check --json --output safety-report.json
      continue-on-error: true

    - name: Security scan with Bandit
      run: |
        bandit -r . -f json -o bandit-report.json
      continue-on-error: true

    - name: Upload security reports
      uses: actions/upload-artifact@v3
      with:
        name: security-reports
        path: |
          safety-report.json
          bandit-report.json

    - name: Check for critical vulnerabilities
      run: |
        python scripts/check_critical_vulns.py safety-report.json

  npm-audit:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Run npm audit
      run: |
        npm audit --json > npm-audit-report.json
      continue-on-error: true

    - name: Check audit results
      run: |
        node scripts/check-npm-audit.js

  container-scan:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Build Docker image
      run: docker build -t myapp:latest .

    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: 'myapp:latest'
        format: 'json'
        output: 'trivy-report.json'
        severity: 'CRITICAL,HIGH'

    - name: Upload Trivy report
      uses: actions/upload-artifact@v3
      with:
        name: trivy-report
        path: trivy-report.json
```

### Vulnerability Alerting

```python
class VulnerabilityAlertingService:
    """Service to alert on discovered vulnerabilities"""

    def __init__(self, notification_channels):
        self.channels = notification_channels
        self.severity_thresholds = {
            'CRITICAL': True,  # Always alert
            'HIGH': True,      # Always alert
            'MEDIUM': False,   # Aggregate in daily report
            'LOW': False       # Aggregate in weekly report
        }

    def process_scan_results(self, scan_results):
        """Process scan results and send appropriate alerts"""

        critical_vulns = []
        high_vulns = []
        other_vulns = []

        for vuln in scan_results.get('vulnerabilities', []):
            severity = vuln.get('severity', 'LOW')

            if severity == 'CRITICAL':
                critical_vulns.append(vuln)
            elif severity == 'HIGH':
                high_vulns.append(vuln)
            else:
                other_vulns.append(vuln)

        # Immediate alerts for critical/high
        if critical_vulns:
            self.send_critical_alert(critical_vulns)

        if high_vulns:
            self.send_high_priority_alert(high_vulns)

        # Store others for aggregated reports
        if other_vulns:
            self.store_for_aggregation(other_vulns)

    def send_critical_alert(self, vulnerabilities):
        """Send immediate alert for critical vulnerabilities"""

        message = f"""
        🚨 CRITICAL SECURITY ALERT 🚨

        {len(vulnerabilities)} CRITICAL vulnerabilities discovered

        Immediate action required:
        """

        for vuln in vulnerabilities:
            message += f"""
            Package: {vuln['package']}
            CVE: {vuln.get('cve', 'N/A')}
            Description: {vuln.get('advisory', 'N/A')}
            Fix: Update to {vuln.get('fixed_version', 'N/A')}
            """

        # Send to all critical channels
        for channel in self.channels:
            if channel['type'] == 'pagerduty':
                self.send_pagerduty_alert(message, severity='critical')
            elif channel['type'] == 'slack':
                self.send_slack_alert(message, channel='#security-critical')
            elif channel['type'] == 'email':
                self.send_email_alert(message, recipients=['security-team@company.com'])

    def send_slack_alert(self, message, channel):
        """Send Slack notification"""
        # Implementation using Slack API
        pass

    def send_pagerduty_alert(self, message, severity):
        """Send PagerDuty incident"""
        # Implementation using PagerDuty API
        pass

    def send_email_alert(self, message, recipients):
        """Send email notification"""
        # Implementation using SMTP
        pass
```

## Secure Dependency Selection

### Vetting New Dependencies

```python
class DependencyVettingChecklist:
    """Checklist for vetting new dependencies"""

    def __init__(self, package_name, ecosystem='pypi'):
        self.package_name = package_name
        self.ecosystem = ecosystem
        self.checks = {}

    def run_all_checks(self):
        """Run all vetting checks"""

        self.checks['maintenance'] = self.check_maintenance()
        self.checks['popularity'] = self.check_popularity()
        self.checks['security'] = self.check_security_history()
        self.checks['license'] = self.check_license()
        self.checks['dependencies'] = self.check_dependency_count()
        self.checks['quality'] = self.check_code_quality()

        return self.make_recommendation()

    def check_maintenance(self):
        """Check if package is actively maintained"""
        # Check last commit date, release frequency
        # GitHub API or package registry API
        return {
            'last_release': '2023-10-15',
            'release_frequency': 'Monthly',
            'status': 'ACTIVELY_MAINTAINED'
        }

    def check_popularity(self):
        """Check package popularity and adoption"""
        # Downloads per month, stars, forks
        return {
            'monthly_downloads': 1000000,
            'github_stars': 5000,
            'status': 'WIDELY_USED'
        }

    def check_security_history(self):
        """Check for past security vulnerabilities"""
        # Query vulnerability databases
        return {
            'total_cves': 2,
            'recent_cves': 0,
            'response_time': 'Fast',  # Time to patch vulnerabilities
            'status': 'GOOD'
        }

    def check_license(self):
        """Check if license is compatible"""
        acceptable_licenses = [
            'MIT', 'Apache-2.0', 'BSD-3-Clause', 'ISC'
        ]

        package_license = 'MIT'  # From package metadata

        return {
            'license': package_license,
            'compatible': package_license in acceptable_licenses
        }

    def check_dependency_count(self):
        """Check number of dependencies"""
        # Fewer dependencies = smaller attack surface
        dependency_count = 5  # Count from package metadata

        status = 'LOW' if dependency_count < 10 else \
                 'MEDIUM' if dependency_count < 50 else 'HIGH'

        return {
            'count': dependency_count,
            'status': status
        }

    def make_recommendation(self):
        """Make recommendation based on checks"""

        # Red flags
        if self.checks['license']['compatible'] == False:
            return 'REJECT - Incompatible license'

        if self.checks['maintenance']['status'] == 'ABANDONED':
            return 'REJECT - Package abandoned'

        if self.checks['security']['recent_cves'] > 0:
            return 'REVIEW - Recent security issues'

        # Positive indicators
        if (self.checks['maintenance']['status'] == 'ACTIVELY_MAINTAINED' and
            self.checks['popularity']['status'] == 'WIDELY_USED' and
            self.checks['security']['status'] == 'GOOD'):
            return 'APPROVE - Meets all criteria'

        return 'REVIEW - Manual review recommended'
```

## Update Strategy

```python
class DependencyUpdateStrategy:
    """Define strategy for dependency updates"""

    @staticmethod
    def categorize_update(current_version, new_version):
        """Categorize update type (major/minor/patch)"""
        current = current_version.split('.')
        new = new_version.split('.')

        if current[0] != new[0]:
            return 'MAJOR'
        elif current[1] != new[1]:
            return 'MINOR'
        else:
            return 'PATCH'

    @staticmethod
    def get_update_policy(update_type, has_vulnerabilities=False):
        """Get update policy based on type"""

        if has_vulnerabilities:
            return {
                'action': 'UPDATE_IMMEDIATELY',
                'testing': 'ACCELERATED',
                'approval': 'SECURITY_TEAM',
                'timeline': '24_HOURS'
            }

        policies = {
            'PATCH': {
                'action': 'AUTO_UPDATE',
                'testing': 'AUTOMATED',
                'approval': 'NOT_REQUIRED',
                'timeline': 'NEXT_RELEASE'
            },
            'MINOR': {
                'action': 'SCHEDULED_UPDATE',
                'testing': 'FULL',
                'approval': 'TECH_LEAD',
                'timeline': 'NEXT_SPRINT'
            },
            'MAJOR': {
                'action': 'PLANNED_UPDATE',
                'testing': 'COMPREHENSIVE',
                'approval': 'ARCHITECTURE_REVIEW',
                'timeline': 'NEXT_QUARTER'
            }
        }

        return policies.get(update_type)
```

## Summary

Managing vulnerable and outdated components requires a comprehensive approach including automated scanning, dependency pinning, continuous monitoring, and a defined update strategy. Regularly scan for vulnerabilities, maintain an SBOM, vet new dependencies carefully, and have a process for rapid response to critical security updates. Integrate security scanning into CI/CD pipelines to catch vulnerabilities early.

## Key Takeaways

- Use dependency scanning tools (Safety, npm audit, Snyk, etc.)
- Pin dependency versions with lock files
- Generate and maintain Software Bill of Materials (SBOM)
- Implement automated dependency updates with Dependabot
- Integrate security scanning into CI/CD pipelines
- Vet new dependencies before adding them
- Have different update policies for patch/minor/major versions
- Respond immediately to critical security vulnerabilities
- Monitor dependencies continuously, not just at development time
- Keep dependencies minimal - fewer dependencies = smaller attack surface
- Use only maintained, popular packages from trusted sources
- Document dependency approval process
