# Secure Dependencies

Modern applications depend on numerous third-party libraries and frameworks. Managing these dependencies securely is critical, as vulnerabilities in dependencies can compromise the entire application. This subtopic covers dependency auditing, software composition analysis, and keeping dependencies updated.

## Dependency Risk

### The Dependency Problem

```
Modern Application Dependencies:

Your Application (1000 lines)
    ├─ Framework (50,000 lines)
    │   ├─ Database Library (20,000 lines)
    │   ├─ HTTP Library (15,000 lines)
    │   └─ Utilities (10,000 lines)
    ├─ Authentication Library (30,000 lines)
    │   ├─ Crypto Library (40,000 lines)
    │   └─ Token Library (5,000 lines)
    └─ Logging Library (8,000 lines)
        └─ File I/O Library (12,000 lines)

Total: ~190,000 lines (99.5% dependencies)

Risks:
✗ Known vulnerabilities in dependencies
✗ Unmaintained/abandoned libraries
✗ Malicious packages (supply chain attacks)
✗ Transitive dependencies (dependencies of dependencies)
✗ License compliance issues
```

## Dependency Auditing

### Python: pip-audit and safety

```bash
# Install security audit tools
pip install pip-audit safety

# Audit dependencies for known vulnerabilities
pip-audit

# Example output:
# Found 2 known vulnerabilities in 1 package
# Package    Version  Vulnerability  Fixed In
# ─────────────────────────────────────────────
# requests   2.25.0   CVE-2023-32681  2.31.0
# flask      1.1.2    CVE-2023-30861  2.3.2

# Check using Safety database
safety check

# Scan requirements.txt
safety check -r requirements.txt

# Generate report
pip-audit --format json > audit-report.json
```

### JavaScript/Node.js: npm audit

```bash
# Audit npm dependencies
npm audit

# Example output:
# found 3 vulnerabilities (1 moderate, 2 high)
#
# High: Regular Expression Denial of Service
# Package: trim
# Dependency of: express
# Path: express > finalhandler > trim
# Fix: npm audit fix

# Automatically fix vulnerabilities
npm audit fix

# Fix including breaking changes
npm audit fix --force

# Get detailed report
npm audit --json > audit-report.json

# Check specific package
npm view express versions
```

### Automated Dependency Scanning

```python
import subprocess
import json
from typing import List, Dict
from dataclasses import dataclass

@dataclass
class Vulnerability:
    package: str
    version: str
    vulnerability_id: str
    severity: str
    fixed_version: str
    description: str

class DependencyScanner:
    """Automated dependency vulnerability scanning"""

    def __init__(self, project_type: str):
        self.project_type = project_type

    def scan_dependencies(self) -> List[Vulnerability]:
        """Scan project dependencies for vulnerabilities"""
        if self.project_type == 'python':
            return self._scan_python()
        elif self.project_type == 'node':
            return self._scan_node()
        else:
            raise ValueError(f"Unsupported project type: {self.project_type}")

    def _scan_python(self) -> List[Vulnerability]:
        """Scan Python dependencies"""
        try:
            # Run pip-audit
            result = subprocess.run(
                ['pip-audit', '--format', 'json'],
                capture_output=True,
                text=True,
                timeout=60
            )

            if result.returncode != 0:
                # Non-zero exit means vulnerabilities found
                data = json.loads(result.stdout)
                return self._parse_pip_audit(data)

            return []

        except subprocess.TimeoutExpired:
            raise RuntimeError("Dependency scan timed out")
        except json.JSONDecodeError:
            raise RuntimeError("Failed to parse audit results")

    def _parse_pip_audit(self, data: dict) -> List[Vulnerability]:
        """Parse pip-audit JSON output"""
        vulnerabilities = []

        for vuln in data.get('vulnerabilities', []):
            vulnerabilities.append(Vulnerability(
                package=vuln['name'],
                version=vuln['version'],
                vulnerability_id=vuln['id'],
                severity=vuln.get('severity', 'UNKNOWN'),
                fixed_version=vuln.get('fix_versions', ['N/A'])[0],
                description=vuln.get('description', '')
            ))

        return vulnerabilities

    def _scan_node(self) -> List[Vulnerability]:
        """Scan Node.js dependencies"""
        try:
            result = subprocess.run(
                ['npm', 'audit', '--json'],
                capture_output=True,
                text=True,
                timeout=60
            )

            data = json.loads(result.stdout)
            return self._parse_npm_audit(data)

        except Exception as e:
            raise RuntimeError(f"npm audit failed: {e}")

    def _parse_npm_audit(self, data: dict) -> List[Vulnerability]:
        """Parse npm audit JSON output"""
        vulnerabilities = []

        for adv_id, advisory in data.get('advisories', {}).items():
            vulnerabilities.append(Vulnerability(
                package=advisory['module_name'],
                version=advisory.get('findings', [{}])[0].get('version', 'N/A'),
                vulnerability_id=str(adv_id),
                severity=advisory['severity'].upper(),
                fixed_version=advisory.get('patched_versions', 'N/A'),
                description=advisory['title']
            ))

        return vulnerabilities

    def generate_report(self, vulnerabilities: List[Vulnerability]) -> str:
        """Generate human-readable report"""
        if not vulnerabilities:
            return "✓ No known vulnerabilities found"

        report = f"✗ Found {len(vulnerabilities)} vulnerabilities:\n\n"

        # Group by severity
        by_severity = {'CRITICAL': [], 'HIGH': [], 'MODERATE': [], 'LOW': []}
        for vuln in vulnerabilities:
            severity = vuln.severity.upper()
            if severity in by_severity:
                by_severity[severity].append(vuln)

        for severity in ['CRITICAL', 'HIGH', 'MODERATE', 'LOW']:
            if by_severity[severity]:
                report += f"{severity} ({len(by_severity[severity])}):\n"
                for vuln in by_severity[severity]:
                    report += f"  - {vuln.package} {vuln.version}\n"
                    report += f"    {vuln.vulnerability_id}: {vuln.description}\n"
                    report += f"    Fix: Upgrade to {vuln.fixed_version}\n\n"

        return report
```

## Software Composition Analysis (SCA)

### SCA Tools

```python
from typing import List, Dict
import re

class SCAAnalyzer:
    """Software Composition Analysis"""

    def __init__(self, project_path: str):
        self.project_path = project_path
        self.dependencies = {}

    def analyze_dependencies(self) -> Dict:
        """Comprehensive dependency analysis"""
        analysis = {
            'total_dependencies': 0,
            'outdated': [],
            'unmaintained': [],
            'licenses': {},
            'vulnerabilities': []
        }

        # Get all dependencies
        deps = self._get_dependencies()
        analysis['total_dependencies'] = len(deps)

        # Check each dependency
        for dep_name, dep_version in deps.items():
            # Check if outdated
            latest = self._get_latest_version(dep_name)
            if latest and latest != dep_version:
                analysis['outdated'].append({
                    'name': dep_name,
                    'current': dep_version,
                    'latest': latest
                })

            # Check maintenance status
            if self._is_unmaintained(dep_name):
                analysis['unmaintained'].append(dep_name)

            # Check license
            license_info = self._get_license(dep_name)
            if license_info:
                analysis['licenses'][dep_name] = license_info

        return analysis

    def check_dependency_age(self, package_name: str) -> Dict:
        """Check how old a dependency is"""
        # In real implementation, would query package registry
        return {
            'package': package_name,
            'last_update': '2023-01-15',
            'age_days': 300,
            'is_stale': True
        }

    def find_alternative_packages(self, package_name: str) -> List[str]:
        """Find actively maintained alternatives"""
        # Simplified example
        alternatives = {
            'request': ['httpx', 'aiohttp'],
            'moment': ['date-fns', 'dayjs'],
            'lodash': ['ramda', 'native JavaScript']
        }
        return alternatives.get(package_name, [])

    def _get_dependencies(self) -> Dict[str, str]:
        """Get project dependencies"""
        # Simplified - real implementation would parse requirements.txt, package.json, etc.
        return {}

    def _get_latest_version(self, package: str) -> str:
        """Get latest available version"""
        # Would query package registry (PyPI, npm, etc.)
        return None

    def _is_unmaintained(self, package: str) -> bool:
        """Check if package is unmaintained"""
        # Check last update date, commit activity, issue response time
        return False

    def _get_license(self, package: str) -> str:
        """Get package license"""
        # Would parse package metadata
        return None
```

### Dependency Lock Files

```bash
# Python: Use lock file for reproducible builds
pip install pip-tools

# Generate requirements.txt from dependencies
pip-compile requirements.in

# This creates requirements.txt with exact versions:
# flask==2.3.2
# werkzeug==2.3.6
# jinja2==3.1.2
# ...

# Install exact versions
pip-sync requirements.txt

# Node.js: package-lock.json is automatically created
npm install  # Creates/updates package-lock.json

# Commit lock files to version control
# This ensures everyone uses same dependency versions
```

## Keeping Dependencies Updated

### Update Strategy

```python
from enum import Enum
from typing import List
from dataclasses import dataclass

class UpdatePriority(Enum):
    CRITICAL = 1  # Security vulnerabilities - update immediately
    HIGH = 2      # Major bugs, deprecations
    MEDIUM = 3    # New features, improvements
    LOW = 4       # Minor updates

@dataclass
class DependencyUpdate:
    package: str
    current_version: str
    new_version: str
    priority: UpdatePriority
    breaking_changes: bool
    security_fix: bool
    changelog_url: str

class DependencyUpdateManager:
    """Manage dependency updates strategically"""

    def __init__(self):
        self.updates_available = []

    def check_updates(self) -> List[DependencyUpdate]:
        """Check for available updates"""
        # Would query package registries
        # Compare current versions with latest
        return self.updates_available

    def prioritize_updates(self, updates: List[DependencyUpdate]) -> List[DependencyUpdate]:
        """Prioritize updates by importance"""
        def priority_key(update):
            # Security fixes first
            if update.security_fix:
                return (0, update.priority.value)
            return (1, update.priority.value)

        return sorted(updates, key=priority_key)

    def can_auto_update(self, update: DependencyUpdate) -> bool:
        """Determine if update can be automated"""
        # Auto-update criteria:
        # 1. Security patch
        # 2. No breaking changes
        # 3. Patch version only (semver)
        if update.security_fix and not update.breaking_changes:
            # Check if patch version (x.y.Z)
            return self._is_patch_version(update.current_version, update.new_version)
        return False

    def _is_patch_version(self, current: str, new: str) -> bool:
        """Check if update is patch version only"""
        import re

        def parse_version(v):
            match = re.match(r'(\d+)\.(\d+)\.(\d+)', v)
            if match:
                return tuple(map(int, match.groups()))
            return None

        curr = parse_version(current)
        new_v = parse_version(new)

        if curr and new_v:
            # Same major and minor, only patch changed
            return curr[0] == new_v[0] and curr[1] == new_v[1]

        return False

    def create_update_pr(self, update: DependencyUpdate) -> str:
        """Create pull request for dependency update"""
        pr_description = f"""
## Dependency Update: {update.package}

**Current Version:** {update.current_version}
**New Version:** {update.new_version}
**Priority:** {update.priority.name}

{'⚠️ **SECURITY FIX**' if update.security_fix else ''}
{'⚠️ **BREAKING CHANGES**' if update.breaking_changes else ''}

### Changes
See: {update.changelog_url}

### Testing Required
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Security scan clean

### Checklist
- [ ] Reviewed changelog
- [ ] Updated documentation (if needed)
- [ ] Verified backward compatibility
"""
        return pr_description
```

### Automated Update Tools

```bash
# Dependabot (GitHub)
# Create .github/dependabot.yml
cat > .github/dependabot.yml << 'EOF'
version: 2
updates:
  # Python dependencies
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"
    # Only security updates
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "security"

  # Node.js dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
EOF

# Renovate Bot
# Create renovate.json
cat > renovate.json << 'EOF'
{
  "extends": ["config:base"],
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "automerge": true
    },
    {
      "matchPackagePatterns": ["*"],
      "matchUpdateTypes": ["major"],
      "automerge": false,
      "labels": ["breaking-change"]
    }
  ],
  "vulnerabilityAlerts": {
    "enabled": true,
    "labels": ["security"]
  }
}
EOF
```

## Supply Chain Security

### Package Verification

```python
import hashlib
import requests
from typing import Optional

class PackageVerifier:
    """Verify package integrity and authenticity"""

    def verify_package_hash(self, package_path: str, expected_hash: str) -> bool:
        """Verify package hasn't been tampered with"""
        sha256_hash = hashlib.sha256()

        with open(package_path, "rb") as f:
            # Read in chunks for large files
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)

        computed_hash = sha256_hash.hexdigest()
        return computed_hash == expected_hash

    def check_package_signature(self, package_name: str) -> bool:
        """Check if package is signed (PyPI, npm)"""
        # Would verify GPG signature or similar
        # PyPI supports PGP signatures
        # npm has package provenance
        return True

    def verify_package_source(self, package_name: str) -> dict:
        """Verify package comes from trusted source"""
        # Check:
        # 1. Published by verified maintainer
        # 2. Download count (popularity)
        # 3. GitHub repository exists and matches
        # 4. Recent activity
        return {
            'trusted': True,
            'verified_publisher': True,
            'popular': True,
            'active': True
        }

    def scan_for_malware(self, package_path: str) -> dict:
        """Scan package for malicious code patterns"""
        suspicious_patterns = [
            rb'eval\(',           # Dynamic code execution
            rb'exec\(',           # Code execution
            rb'__import__',       # Dynamic imports
            rb'subprocess',       # Shell execution
            rb'os\.system',       # Shell execution
            rb'socket\.',         # Network access
        ]

        findings = []

        with open(package_path, 'rb') as f:
            content = f.read()

            for pattern in suspicious_patterns:
                if pattern in content:
                    findings.append(pattern.decode())

        return {
            'suspicious': len(findings) > 0,
            'findings': findings
        }
```

### Dependency Pinning

```python
# requirements.txt - Pin exact versions
"""
# DO THIS: Pin exact versions for production
flask==2.3.2
requests==2.31.0
sqlalchemy==2.0.19

# NOT THIS: Allows any version (dangerous)
flask
requests
sqlalchemy

# NOT THIS: Allows minor/patch updates (can break things)
flask>=2.0.0
requests~=2.31.0
"""

# package.json - Use exact versions
"""
{
  "dependencies": {
    "express": "4.18.2",     // Exact version
    "lodash": "4.17.21"      // Exact version
  }
}

// NOT THIS:
{
  "dependencies": {
    "express": "^4.18.2",    // Allows 4.x.x (can break)
    "lodash": "~4.17.21"     // Allows 4.17.x (can break)
  }
}
"""
```

## Best Practices

### Dependency Management Policy

```python
class DependencyPolicy:
    """Organizational dependency management policy"""

    POLICY = """
    Dependency Security Policy

    1. APPROVAL
       - All new dependencies require security review
       - Check for known vulnerabilities before adding
       - Verify package source and maintainer

    2. MONITORING
       - Automated daily scans for vulnerabilities
       - Weekly dependency update checks
       - Monthly manual security review

    3. UPDATES
       - Security patches: Apply within 24 hours
       - Critical bugs: Apply within 1 week
       - Minor updates: Apply monthly
       - Major updates: Plan and test thoroughly

    4. RESTRICTIONS
       - No dependencies with known high/critical vulnerabilities
       - No unmaintained packages (no updates >1 year)
       - No packages from unverified sources
       - Minimize dependency count (review necessity)

    5. DOCUMENTATION
       - Document reason for each dependency
       - Track dependency licenses
       - Maintain inventory of all dependencies
    """

    @staticmethod
    def evaluate_dependency(package: str, version: str) -> dict:
        """Evaluate if dependency meets policy"""
        checks = {
            'has_vulnerabilities': False,  # Check vulnerability databases
            'is_maintained': True,          # Last update <1 year ago
            'has_verified_source': True,    # From trusted registry
            'license_compatible': True,     # Compatible with project license
            'has_alternatives': False,      # Are there better options?
        }

        approved = all([
            not checks['has_vulnerabilities'],
            checks['is_maintained'],
            checks['has_verified_source'],
            checks['license_compatible']
        ])

        return {
            'approved': approved,
            'checks': checks,
            'recommendation': 'APPROVE' if approved else 'REJECT'
        }
```

## Summary

Secure dependency management is critical for application security:

- **Dependency Auditing**: Regularly scan for known vulnerabilities (pip-audit, npm audit)
- **SCA Tools**: Analyze dependencies for security, license, and maintenance status
- **Keep Updated**: Apply security patches quickly, plan for major updates
- **Lock Files**: Use dependency lock files for reproducible builds
- **Supply Chain Security**: Verify package integrity, signatures, and sources
- **Dependency Pinning**: Pin exact versions in production
- **Automated Tools**: Use Dependabot, Renovate for automated updates
- **Policy**: Establish organizational policies for dependency approval and management

Remember: Your application is only as secure as its least secure dependency. Managing dependencies is not optional - it's a critical security control.
