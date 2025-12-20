# Code Review and Analysis

Code review and automated analysis are essential for identifying security vulnerabilities before they reach production. This subtopic covers manual security code review techniques and automated static analysis tools.

## Security Code Review

Security-focused code reviews go beyond functional correctness to identify potential security issues.

### Security Review Checklist

```
Security Code Review Checklist

┌─────────────────────────────────────────────────────┐
│ INPUT VALIDATION                                    │
├─────────────────────────────────────────────────────┤
│ ☐ All user input validated (whitelist preferred)   │
│ ☐ Input length limits enforced                     │
│ ☐ Input type validation performed                  │
│ ☐ Special characters handled correctly             │
│ ☐ File upload restrictions in place                │
├─────────────────────────────────────────────────────┤
│ AUTHENTICATION & AUTHORIZATION                      │
├─────────────────────────────────────────────────────┤
│ ☐ Authentication on all protected endpoints        │
│ ☐ Password policy enforced                         │
│ ☐ Authorization checks on all actions              │
│ ☐ Session management secure                        │
│ ☐ No hard-coded credentials                        │
├─────────────────────────────────────────────────────┤
│ DATA PROTECTION                                     │
├─────────────────────────────────────────────────────┤
│ ☐ Sensitive data encrypted at rest                 │
│ ☐ Sensitive data encrypted in transit (TLS)        │
│ ☐ No sensitive data in logs                        │
│ ☐ Secure random number generation                  │
│ ☐ Cryptographic best practices followed            │
├─────────────────────────────────────────────────────┤
│ OUTPUT ENCODING                                     │
├─────────────────────────────────────────────────────┤
│ ☐ HTML output properly encoded                     │
│ ☐ JavaScript output properly encoded               │
│ ☐ SQL parameterized (no string concatenation)      │
│ ☐ OS commands properly escaped (or avoided)        │
│ ☐ Context-aware encoding used                      │
├─────────────────────────────────────────────────────┤
│ ERROR HANDLING                                      │
├─────────────────────────────────────────────────────┤
│ ☐ Error messages don't leak information            │
│ ☐ Errors logged securely                           │
│ ☐ Fail securely (deny by default)                  │
│ ☐ No stack traces to users                         │
│ ☐ Proper exception handling                        │
├─────────────────────────────────────────────────────┤
│ BUSINESS LOGIC                                      │
├─────────────────────────────────────────────────────┤
│ ☐ Race conditions prevented                        │
│ ☐ Rate limiting implemented                        │
│ ☐ Transaction integrity maintained                 │
│ ☐ State changes validated                          │
│ ☐ Replay attacks prevented                         │
└─────────────────────────────────────────────────────┘
```

### Manual Review Examples

```python
# REVIEW EXAMPLE 1: SQL Injection

# VULNERABLE CODE
def get_user_bad(username):
    query = f"SELECT * FROM users WHERE username = '{username}'"
    return db.execute(query)

# REVIEWER NOTES:
# ❌ SQL injection vulnerability
# ❌ User input directly concatenated into query
# ❌ Attacker can inject: admin' OR '1'='1
# 🔧 FIX: Use parameterized queries

# SECURE CODE
def get_user_good(username):
    query = "SELECT * FROM users WHERE username = ?"
    return db.execute(query, (username,))

# REVIEWER NOTES:
# ✓ Parameterized query prevents injection
# ✓ Database driver handles escaping


# REVIEW EXAMPLE 2: Authentication

# VULNERABLE CODE
def login_bad(username, password):
    user = get_user(username)
    if user and user.password == password:
        return create_session(user)
    return None

# REVIEWER NOTES:
# ❌ Plain text password comparison
# ❌ No password hashing
# ❌ Timing attack possible (different code paths)
# ❌ No rate limiting
# 🔧 FIX: Hash passwords, constant-time comparison, rate limiting

# SECURE CODE
import hmac
import hashlib
import time

def login_good(username, password):
    # Add artificial delay (prevent timing attacks)
    start = time.time()

    user = get_user(username)

    if user:
        # Constant-time comparison
        expected = user.password_hash.encode()
        provided = hash_password(password, user.salt).encode()
        password_match = hmac.compare_digest(expected, provided)
    else:
        # Still compute hash even if user doesn't exist (prevent timing)
        hash_password(password, b'dummy_salt')
        password_match = False

    # Ensure minimum response time (prevent timing attacks)
    elapsed = time.time() - start
    if elapsed < 0.5:
        time.sleep(0.5 - elapsed)

    if user and password_match:
        # Check rate limiting
        if is_rate_limited(username):
            return None
        return create_session(user)

    # Log failed attempt
    log_failed_login(username)
    return None

# REVIEWER NOTES:
# ✓ Password hashing
# ✓ Constant-time comparison
# ✓ Consistent response time
# ✓ Rate limiting check
# ✓ Failed attempt logging


# REVIEW EXAMPLE 3: Authorization

# VULNERABLE CODE
def delete_document_bad(doc_id):
    doc = Document.get(doc_id)
    doc.delete()
    return {"success": True}

# REVIEWER NOTES:
# ❌ No authorization check
# ❌ Any user can delete any document
# ❌ No audit logging
# 🔧 FIX: Check ownership/permissions

# SECURE CODE
def delete_document_good(doc_id, current_user):
    doc = Document.get(doc_id)

    if not doc:
        return {"error": "Document not found"}, 404

    # Authorization check
    if doc.owner_id != current_user.id and not current_user.is_admin:
        audit_log.warning(f"Unauthorized delete attempt: user {current_user.id} on doc {doc_id}")
        return {"error": "Access denied"}, 403

    # Audit log before action
    audit_log.info(f"Document deleted: {doc_id} by user {current_user.id}")

    doc.delete()
    return {"success": True}

# REVIEWER NOTES:
# ✓ Authorization check (ownership or admin)
# ✓ Existence check
# ✓ Audit logging
# ✓ Proper error codes


# REVIEW EXAMPLE 4: File Upload

# VULNERABLE CODE
def upload_file_bad(file, filename):
    path = f"/uploads/{filename}"
    with open(path, 'wb') as f:
        f.write(file.read())
    return path

# REVIEWER NOTES:
# ❌ No file type validation
# ❌ Path traversal vulnerability (../../etc/passwd)
# ❌ No size limit
# ❌ Executable files allowed
# 🔧 FIX: Validate type, sanitize filename, limit size

# SECURE CODE
import os
import magic
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def upload_file_good(file, filename, user_id):
    # Check file size
    file.seek(0, 2)  # Seek to end
    size = file.tell()
    file.seek(0)  # Reset

    if size > MAX_FILE_SIZE:
        return {"error": "File too large"}, 400

    # Sanitize filename (prevent path traversal)
    safe_filename = secure_filename(filename)

    # Validate extension
    ext = safe_filename.rsplit('.', 1)[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return {"error": "File type not allowed"}, 400

    # Validate file content (not just extension)
    file_content = file.read()
    file.seek(0)

    mime = magic.from_buffer(file_content, mime=True)
    if not mime.startswith('image/') and mime != 'application/pdf':
        return {"error": "Invalid file content"}, 400

    # Generate unique filename (prevent overwrites)
    import uuid
    unique_filename = f"{user_id}_{uuid.uuid4()}_{safe_filename}"

    # Store in user-specific directory
    upload_dir = f"/uploads/{user_id}"
    os.makedirs(upload_dir, exist_ok=True)

    path = os.path.join(upload_dir, unique_filename)

    # Write file
    with open(path, 'wb') as f:
        f.write(file_content)

    # Log upload
    audit_log.info(f"File uploaded: {unique_filename} by user {user_id}")

    return {"path": path}, 200

# REVIEWER NOTES:
# ✓ File size limit
# ✓ Filename sanitization (secure_filename)
# ✓ Extension whitelist
# ✓ Content-type validation (magic bytes)
# ✓ Unique filename generation
# ✓ User-specific directories
# ✓ Audit logging
```

## Static Analysis Tools

Automated static analysis can find many common vulnerabilities.

### Python: Bandit

```bash
# Install Bandit
pip install bandit

# Run Bandit on project
bandit -r /path/to/project

# Example output:
# >> Issue: [B608:hardcoded_sql_expressions] Possible SQL injection vector
#    Severity: Medium   Confidence: Low
#    Location: app.py:45
#    More Info: https://bandit.readthedocs.io/en/latest/
# 44    def get_user(username):
# 45        query = "SELECT * FROM users WHERE name = '%s'" % username
# 46        return db.execute(query)

# Generate JSON report
bandit -r . -f json -o bandit-report.json

# Configure with .bandit file
cat > .bandit << 'EOF'
[bandit]
exclude_dirs = /test,/venv
tests = B201,B301,B302,B303,B304,B305,B306
skips = B404,B603
EOF
```

### JavaScript: ESLint with Security Plugin

```bash
# Install ESLint with security plugin
npm install --save-dev eslint eslint-plugin-security

# Create .eslintrc.json
cat > .eslintrc.json << 'EOF'
{
  "plugins": ["security"],
  "extends": ["plugin:security/recommended"],
  "rules": {
    "security/detect-object-injection": "warn",
    "security/detect-non-literal-regexp": "warn",
    "security/detect-unsafe-regex": "error",
    "security/detect-buffer-noassert": "error",
    "security/detect-eval-with-expression": "error",
    "security/detect-no-csrf-before-method-override": "error",
    "security/detect-possible-timing-attacks": "warn"
  }
}
EOF

# Run ESLint
npx eslint .

# Example output:
# /app.js
#   45:12  error  Unsafe Regular Expression  security/detect-unsafe-regex
#   67:8   error  eval with expression       security/detect-eval-with-expression
```

### Multi-Language: SonarQube

```python
import subprocess
from typing import List, Dict

class StaticAnalyzer:
    """Wrapper for static analysis tools"""

    def __init__(self, project_path: str, language: str):
        self.project_path = project_path
        self.language = language

    def run_analysis(self) -> Dict:
        """Run appropriate static analysis tool"""
        if self.language == 'python':
            return self._run_bandit()
        elif self.language == 'javascript':
            return self._run_eslint()
        else:
            raise ValueError(f"Unsupported language: {self.language}")

    def _run_bandit(self) -> Dict:
        """Run Bandit for Python"""
        try:
            result = subprocess.run(
                ['bandit', '-r', self.project_path, '-f', 'json'],
                capture_output=True,
                text=True,
                timeout=300
            )

            import json
            data = json.loads(result.stdout)

            return {
                'tool': 'bandit',
                'issues': self._parse_bandit_results(data),
                'summary': {
                    'total': len(data.get('results', [])),
                    'high': len([r for r in data.get('results', []) if r['issue_severity'] == 'HIGH']),
                    'medium': len([r for r in data.get('results', []) if r['issue_severity'] == 'MEDIUM']),
                    'low': len([r for r in data.get('results', []) if r['issue_severity'] == 'LOW'])
                }
            }

        except Exception as e:
            return {'error': str(e)}

    def _parse_bandit_results(self, data: dict) -> List[Dict]:
        """Parse Bandit JSON output"""
        issues = []

        for result in data.get('results', []):
            issues.append({
                'severity': result['issue_severity'],
                'confidence': result['issue_confidence'],
                'description': result['issue_text'],
                'file': result['filename'],
                'line': result['line_number'],
                'code': result['code'],
                'cwe': result.get('issue_cwe', {}).get('id', 'N/A')
            })

        return issues

    def generate_report(self, results: Dict) -> str:
        """Generate human-readable report"""
        if 'error' in results:
            return f"Error running analysis: {results['error']}"

        summary = results['summary']
        report = f"""
Security Analysis Report ({results['tool']})
{'=' * 50}

Summary:
  Total Issues: {summary['total']}
  High Severity: {summary['high']}
  Medium Severity: {summary['medium']}
  Low Severity: {summary['low']}

Issues:
"""

        for issue in sorted(results['issues'], key=lambda x: x['severity'], reverse=True):
            report += f"""
[{issue['severity']}] {issue['description']}
  File: {issue['file']}:{issue['line']}
  CWE: {issue['cwe']}
  Code:
    {issue['code']}
"""

        return report
```

### Custom Security Rules

```python
import ast
from typing import List

class SecurityASTVisitor(ast.NodeVisitor):
    """Custom AST visitor for security checks"""

    def __init__(self):
        self.issues = []

    def visit_Call(self, node):
        """Check function calls for security issues"""
        # Check for eval()
        if isinstance(node.func, ast.Name) and node.func.id == 'eval':
            self.issues.append({
                'severity': 'HIGH',
                'line': node.lineno,
                'issue': 'Use of eval() is dangerous',
                'recommendation': 'Use ast.literal_eval() or avoid dynamic execution'
            })

        # Check for exec()
        if isinstance(node.func, ast.Name) and node.func.id == 'exec':
            self.issues.append({
                'severity': 'HIGH',
                'line': node.lineno,
                'issue': 'Use of exec() is dangerous',
                'recommendation': 'Avoid dynamic code execution'
            })

        # Check for pickle.loads() with untrusted data
        if isinstance(node.func, ast.Attribute):
            if (isinstance(node.func.value, ast.Name) and
                node.func.value.id == 'pickle' and
                node.func.attr == 'loads'):
                self.issues.append({
                    'severity': 'HIGH',
                    'line': node.lineno,
                    'issue': 'pickle.loads() with untrusted data is unsafe',
                    'recommendation': 'Use JSON for untrusted data'
                })

        self.generic_visit(node)

    def visit_Str(self, node):
        """Check string literals for secrets"""
        # Check for potential secrets
        if any(keyword in node.s.lower() for keyword in ['password', 'api_key', 'secret']):
            # Check if it looks like a real secret (long, random)
            if len(node.s) > 20 and not node.s.isalpha():
                self.issues.append({
                    'severity': 'MEDIUM',
                    'line': node.lineno,
                    'issue': 'Possible hardcoded secret',
                    'recommendation': 'Use environment variables for secrets'
                })

        self.generic_visit(node)

def analyze_python_file(filepath: str) -> List[Dict]:
    """Analyze Python file for security issues"""
    with open(filepath, 'r') as f:
        code = f.read()

    try:
        tree = ast.parse(code)
        visitor = SecurityASTVisitor()
        visitor.visit(tree)
        return visitor.issues
    except SyntaxError:
        return [{'severity': 'ERROR', 'issue': 'Syntax error in file'}]


# Usage example
issues = analyze_python_file('app.py')
for issue in issues:
    print(f"[{issue['severity']}] Line {issue.get('line', '?')}: {issue['issue']}")
    if 'recommendation' in issue:
        print(f"  → {issue['recommendation']}")
```

## Continuous Integration Integration

### CI/CD Security Pipeline

```yaml
# GitHub Actions example
name: Security Checks

on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          pip install bandit safety pip-audit

      - name: Run Bandit (SAST)
        run: |
          bandit -r . -f json -o bandit-report.json
        continue-on-error: true

      - name: Run Safety (Dependency Check)
        run: |
          safety check --json > safety-report.json
        continue-on-error: true

      - name: Run pip-audit (Vulnerability Scan)
        run: |
          pip-audit --format json > pip-audit-report.json
        continue-on-error: true

      - name: Upload security reports
        uses: actions/upload-artifact@v3
        with:
          name: security-reports
          path: |
            bandit-report.json
            safety-report.json
            pip-audit-report.json

      - name: Fail on high severity issues
        run: |
          python scripts/check_security_threshold.py
```

### Security Gate Script

```python
import json
import sys

def check_security_threshold():
    """Fail build if security threshold exceeded"""

    # Load Bandit report
    with open('bandit-report.json', 'r') as f:
        bandit = json.load(f)

    # Count high severity issues
    high_severity = len([
        r for r in bandit.get('results', [])
        if r['issue_severity'] == 'HIGH'
    ])

    # Define thresholds
    MAX_HIGH = 0  # Zero tolerance for high severity
    MAX_MEDIUM = 5

    medium_severity = len([
        r for r in bandit.get('results', [])
        if r['issue_severity'] == 'MEDIUM'
    ])

    print(f"Security Issues Found:")
    print(f"  High: {high_severity} (max: {MAX_HIGH})")
    print(f"  Medium: {medium_severity} (max: {MAX_MEDIUM})")

    # Fail if threshold exceeded
    if high_severity > MAX_HIGH:
        print(f"❌ FAILED: {high_severity} high severity issues found")
        sys.exit(1)

    if medium_severity > MAX_MEDIUM:
        print(f"❌ FAILED: {medium_severity} medium severity issues (max {MAX_MEDIUM})")
        sys.exit(1)

    print("✓ PASSED: Security threshold met")
    sys.exit(0)

if __name__ == '__main__':
    check_security_threshold()
```

## Code Review Best Practices

### Review Process

```python
class SecurityReviewProcess:
    """Guidelines for security code review"""

    REVIEW_GUIDELINES = """
    Security Code Review Process

    1. BEFORE REVIEW
       - Understand the change's purpose
       - Identify attack surface changes
       - Check related security requirements

    2. DURING REVIEW
       - Use security checklist
       - Look for common vulnerability patterns
       - Check all user inputs and outputs
       - Verify authentication/authorization
       - Check for information leakage
       - Review error handling

    3. REVIEW PRIORITIES
       - Critical paths first (auth, payment, etc.)
       - New code over refactoring
       - Public APIs over internal functions
       - User input handling

    4. AUTOMATED CHECKS
       - Static analysis passed
       - Dependency scan clean
       - Tests include security cases
       - No secrets committed

    5. APPROVAL CRITERIA
       - No high severity issues
       - All medium issues addressed or documented
       - Security implications understood
       - Audit logging appropriate
    """

    @staticmethod
    def get_review_template() -> str:
        """Template for security review comments"""
        return """
## Security Review

### Checklist
- [ ] Input validation reviewed
- [ ] Output encoding verified
- [ ] Authentication/authorization checked
- [ ] Error handling secure
- [ ] No sensitive data leakage
- [ ] Dependencies secure
- [ ] Static analysis clean

### Findings
(List security issues here)

### Recommendations
(List security improvements)

### Approval Status
- [ ] Approved
- [ ] Approved with comments
- [ ] Changes requested
"""
```

## Summary

Code review and analysis are critical security controls:

- **Manual Review**: Use security-focused checklists, examine authentication, authorization, input validation, and output encoding
- **Static Analysis**: Automate vulnerability detection with Bandit (Python), ESLint (JavaScript), SonarQube
- **Custom Rules**: Write project-specific security checks using AST analysis
- **CI/CD Integration**: Run security checks automatically on every commit/PR
- **Security Gates**: Fail builds that exceed security thresholds
- **Review Process**: Establish systematic security review procedures

Combining manual review with automated tools provides defense in depth for code security. No single approach catches everything - use multiple layers.
