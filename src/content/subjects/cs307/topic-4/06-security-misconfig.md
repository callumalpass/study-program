# Security Misconfiguration

## Introduction

Security misconfiguration is a pervasive vulnerability that occurs when security settings are not defined, implemented, or maintained properly. According to OWASP, it is one of the most common issues in web applications. Misconfigurations can occur at any level of the application stack: network services, platforms, web servers, application servers, databases, frameworks, and custom code.

This lesson focuses on identifying common security misconfigurations and implementing secure baseline configurations to prevent them.

## Default Credentials

Default credentials are one of the most dangerous and easily exploitable misconfigurations.

### The Problem

```bash
# Common default credentials that MUST be changed:

# Database Systems
MySQL: root / (no password)
PostgreSQL: postgres / postgres
MongoDB: (no authentication by default)

# Web Applications
WordPress: admin / admin
Jenkins: admin / password
Tomcat: admin / admin, tomcat / tomcat

# Network Devices
Routers: admin / admin, admin / password
IP Cameras: admin / 12345

# These are well-known and actively scanned by attackers
```

### Secure Configuration

```python
# Force password change on first login
class FirstLoginHandler:
    """Enforce password change for default accounts"""

    def __init__(self, db):
        self.db = db

    def check_must_change_password(self, user):
        """Check if user must change password"""
        return user.get('must_change_password', False)

    def authenticate(self, username, password):
        """Authentication with mandatory password change check"""
        user = self.db.get_user(username)

        if not user:
            return None, "Invalid credentials"

        if not self.verify_password(password, user['password_hash']):
            return None, "Invalid credentials"

        # Check if using default password
        if self.is_default_password(username, password):
            user['must_change_password'] = True
            self.db.update_user(user)
            return user, "MUST_CHANGE_PASSWORD"

        # Check force change flag
        if self.check_must_change_password(user):
            return user, "MUST_CHANGE_PASSWORD"

        return user, "SUCCESS"

    def is_default_password(self, username, password):
        """Check if credentials match known defaults"""
        default_combinations = [
            ('admin', 'admin'),
            ('admin', 'password'),
            ('root', 'root'),
            (username, username),  # Username as password
            (username, 'password'),
        ]

        return (username, password) in default_combinations

# Configuration validation on startup
def validate_no_default_credentials():
    """Validate no default credentials exist in production"""
    import os

    if os.getenv('ENVIRONMENT') == 'production':
        dangerous_users = ['admin', 'root', 'test']

        for username in dangerous_users:
            user = db.get_user(username)

            if user and not user.get('password_changed', False):
                raise SecurityException(
                    f"Default credentials detected for user: {username}. "
                    "Change password before deploying to production."
                )
```

### Database Security Configuration

```python
# Secure database initialization
import secrets
import string

def generate_strong_password(length=32):
    """Generate cryptographically strong password"""
    alphabet = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(alphabet) for i in range(length))
    return password

def initialize_database_securely():
    """Initialize database with secure configuration"""
    import psycopg2

    # Generate random password for database user
    db_password = generate_strong_password()

    # Save to secure configuration (environment variable, secrets manager)
    save_to_secrets_manager('DB_PASSWORD', db_password)

    # Create database user with strong password
    admin_conn = psycopg2.connect(
        host='localhost',
        user='postgres',
        password=os.getenv('POSTGRES_ADMIN_PASSWORD')
    )

    cursor = admin_conn.cursor()

    # Create application user with limited privileges
    cursor.execute(f"""
        CREATE USER app_user WITH PASSWORD '{db_password}';
        GRANT CONNECT ON DATABASE app_db TO app_user;
        GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
        REVOKE CREATE ON SCHEMA public FROM app_user;
    """)

    admin_conn.commit()
    cursor.close()
    admin_conn.close()

    print("Database initialized with secure credentials")
    print("Password stored in secrets manager")
```

## Unnecessary Features and Services

Running unnecessary features, services, or ports increases the attack surface.

### Service Hardening

```bash
# Identify and disable unnecessary services

# Linux: Check running services
systemctl list-units --type=service --state=running

# Disable unnecessary services
systemctl disable bluetooth.service
systemctl disable cups.service  # Printing service
systemctl disable avahi-daemon.service  # Network discovery

# Check open ports
netstat -tulpn
ss -tulpn

# Configure firewall to block unnecessary ports
# UFW (Uncomplicated Firewall) example
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 443/tcp   # HTTPS
ufw allow 80/tcp    # HTTP
ufw enable

# For more granular control
ufw allow from 192.168.1.0/24 to any port 22  # SSH only from local network
```

### Application Feature Control

```python
# Feature flag system with security controls
class FeatureManager:
    """Manage feature flags with security awareness"""

    def __init__(self):
        self.features = {}
        self.environment = os.getenv('ENVIRONMENT', 'development')

    def register_feature(self, name, enabled_in_prod=False,
                        requires_auth=True, requires_role=None):
        """Register a feature with security settings"""
        self.features[name] = {
            'enabled_in_prod': enabled_in_prod,
            'requires_auth': requires_auth,
            'requires_role': requires_role,
            'enabled': self.is_feature_enabled(enabled_in_prod)
        }

    def is_feature_enabled(self, enabled_in_prod):
        """Check if feature should be enabled"""
        if self.environment == 'production':
            return enabled_in_prod
        return True  # Enable all features in dev

    def check_feature_access(self, feature_name, user=None):
        """Check if user can access feature"""
        feature = self.features.get(feature_name)

        if not feature:
            return False, "Feature not found"

        if not feature['enabled']:
            return False, "Feature not enabled"

        if feature['requires_auth'] and not user:
            return False, "Authentication required"

        if feature['requires_role']:
            if not user or user.get('role') != feature['requires_role']:
                return False, f"Role {feature['requires_role']} required"

        return True, "Access granted"

# Configure features
features = FeatureManager()

# Debug endpoints - NEVER in production
features.register_feature('debug_api', enabled_in_prod=False)
features.register_feature('test_mode', enabled_in_prod=False)

# Admin features - production with role requirement
features.register_feature('admin_panel',
                         enabled_in_prod=True,
                         requires_role='ADMIN')

# Use in endpoints
@app.route('/api/debug/database')
def debug_database():
    allowed, reason = features.check_feature_access('debug_api', get_current_user())

    if not allowed:
        return jsonify({'error': reason}), 403

    # Debug functionality
    return jsonify({'tables': get_table_list()})
```

## Directory Listing and Information Disclosure

### Web Server Configuration

```nginx
# Nginx secure configuration
server {
    listen 443 ssl http2;
    server_name example.com;

    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Content-Security-Policy "default-src 'self'" always;

    # Disable directory listing
    autoindex off;

    # Hide Nginx version
    server_tokens off;

    # Restrict access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Restrict access to sensitive files
    location ~* \.(git|env|sql|log|conf)$ {
        deny all;
    }

    # Application location
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Hide backend server information
        proxy_hide_header X-Powered-By;
    }
}
```

```apache
# Apache secure configuration (.htaccess or httpd.conf)

# Disable directory listing
Options -Indexes

# Hide Apache version and OS information
ServerTokens Prod
ServerSignature Off

# Disable access to sensitive files
<FilesMatch "^\.">
    Require all denied
</FilesMatch>

<FilesMatch "\.(env|git|sql|log|conf|bak|old)$">
    Require all denied
</FilesMatch>

# Security headers
Header always set X-Frame-Options "DENY"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"

# Disable ETags (information disclosure)
FileETag None
```

### Application-Level Information Disclosure Prevention

```python
# Prevent information disclosure in error messages
from flask import Flask, jsonify
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(
    filename='app.log',
    level=logging.INFO,
    format='%(asctime)s %(levelname)s: %(message)s'
)

# Disable debug mode in production
app.config['DEBUG'] = os.getenv('ENVIRONMENT') != 'production'

# Custom error handlers
@app.errorhandler(404)
def not_found(error):
    """Generic 404 error - don't reveal path information"""
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    """Generic 500 error - don't reveal stack traces"""
    # Log detailed error internally
    logging.error(f"Internal error: {error}", exc_info=True)

    # Return generic message to client
    if app.config['DEBUG']:
        return jsonify({'error': str(error)}), 500
    else:
        return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(Exception)
def handle_exception(error):
    """Catch-all error handler"""
    logging.error(f"Unhandled exception: {error}", exc_info=True)

    # Never expose internal details in production
    if app.config['DEBUG']:
        return jsonify({
            'error': str(error),
            'type': type(error).__name__
        }), 500
    else:
        return jsonify({'error': 'An error occurred'}), 500

# Secure response headers
@app.after_request
def add_security_headers(response):
    """Add security headers to all responses"""
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'

    # Remove headers that disclose information
    response.headers.pop('Server', None)
    response.headers.pop('X-Powered-By', None)

    return response
```

## Secure Configuration Management

### Configuration Validation

```python
import os
from typing import Dict, Any

class ConfigurationValidator:
    """Validate security configuration"""

    def __init__(self):
        self.errors = []
        self.warnings = []

    def validate_production_config(self, config: Dict[str, Any]) -> bool:
        """Validate configuration for production deployment"""

        # Check debug mode
        if config.get('DEBUG', False):
            self.errors.append("DEBUG mode must be disabled in production")

        # Check secret key
        secret_key = config.get('SECRET_KEY', '')
        if not secret_key or len(secret_key) < 32:
            self.errors.append("SECRET_KEY must be at least 32 characters")

        if secret_key in ['dev', 'development', 'test', 'changeme']:
            self.errors.append("SECRET_KEY is using a default/weak value")

        # Check database credentials
        db_password = os.getenv('DB_PASSWORD', '')
        if not db_password or len(db_password) < 16:
            self.errors.append("DB_PASSWORD must be at least 16 characters")

        # Check HTTPS enforcement
        if not config.get('FORCE_HTTPS', True):
            self.warnings.append("HTTPS enforcement is disabled")

        # Check session configuration
        if config.get('SESSION_COOKIE_SECURE', False) == False:
            self.errors.append("SESSION_COOKIE_SECURE must be True in production")

        if config.get('SESSION_COOKIE_HTTPONLY', True) == False:
            self.errors.append("SESSION_COOKIE_HTTPONLY must be True")

        if config.get('SESSION_COOKIE_SAMESITE') != 'Strict':
            self.warnings.append("SESSION_COOKIE_SAMESITE should be 'Strict'")

        # Check allowed hosts
        allowed_hosts = config.get('ALLOWED_HOSTS', [])
        if '*' in allowed_hosts:
            self.errors.append("ALLOWED_HOSTS must not include '*' in production")

        # Check CORS configuration
        cors_origins = config.get('CORS_ORIGINS', [])
        if '*' in cors_origins:
            self.errors.append("CORS_ORIGINS must not include '*' in production")

        # Check file upload configuration
        max_content_length = config.get('MAX_CONTENT_LENGTH', 0)
        if max_content_length == 0 or max_content_length > 50 * 1024 * 1024:
            self.warnings.append("MAX_CONTENT_LENGTH should be set to reasonable limit")

        # Check rate limiting
        if not config.get('RATELIMIT_ENABLED', False):
            self.warnings.append("Rate limiting is not enabled")

        # Return validation result
        if self.errors:
            return False
        return True

    def get_report(self) -> str:
        """Generate validation report"""
        report = []

        if self.errors:
            report.append("ERRORS:")
            for error in self.errors:
                report.append(f"  - {error}")

        if self.warnings:
            report.append("\nWARNINGS:")
            for warning in self.warnings:
                report.append(f"  - {warning}")

        return "\n".join(report)

# Use in application startup
def initialize_app():
    """Initialize application with configuration validation"""
    config = {
        'DEBUG': os.getenv('DEBUG', 'False') == 'True',
        'SECRET_KEY': os.getenv('SECRET_KEY'),
        'FORCE_HTTPS': os.getenv('FORCE_HTTPS', 'True') == 'True',
        'SESSION_COOKIE_SECURE': os.getenv('SESSION_COOKIE_SECURE', 'True') == 'True',
        'SESSION_COOKIE_HTTPONLY': True,
        'SESSION_COOKIE_SAMESITE': 'Strict',
        'ALLOWED_HOSTS': os.getenv('ALLOWED_HOSTS', '').split(','),
        'CORS_ORIGINS': os.getenv('CORS_ORIGINS', '').split(','),
        'MAX_CONTENT_LENGTH': int(os.getenv('MAX_CONTENT_LENGTH', 16 * 1024 * 1024)),
        'RATELIMIT_ENABLED': os.getenv('RATELIMIT_ENABLED', 'True') == 'True'
    }

    validator = ConfigurationValidator()

    if os.getenv('ENVIRONMENT') == 'production':
        if not validator.validate_production_config(config):
            print("CONFIGURATION VALIDATION FAILED:")
            print(validator.get_report())
            raise SystemExit(1)

        if validator.warnings:
            print("Configuration warnings:")
            print(validator.get_report())

    return config
```

## Hardening Checklist

### System-Level Hardening

```python
class SystemHardeningChecklist:
    """Checklist for system hardening"""

    def __init__(self):
        self.checks = []

    def add_check(self, name, command, expected_result=None):
        """Add a hardening check"""
        self.checks.append({
            'name': name,
            'command': command,
            'expected': expected_result
        })

    def run_checks(self):
        """Run all hardening checks"""
        import subprocess

        results = []

        for check in self.checks:
            try:
                result = subprocess.run(
                    check['command'],
                    shell=True,
                    capture_output=True,
                    text=True,
                    timeout=5
                )

                status = 'PASS'
                if check['expected']:
                    if check['expected'] not in result.stdout:
                        status = 'FAIL'

                results.append({
                    'name': check['name'],
                    'status': status,
                    'output': result.stdout.strip()
                })

            except Exception as e:
                results.append({
                    'name': check['name'],
                    'status': 'ERROR',
                    'output': str(e)
                })

        return results

# Define hardening checks
checklist = SystemHardeningChecklist()

# SSH hardening
checklist.add_check(
    "SSH: Root login disabled",
    "grep '^PermitRootLogin' /etc/ssh/sshd_config",
    expected="PermitRootLogin no"
)

checklist.add_check(
    "SSH: Password authentication disabled",
    "grep '^PasswordAuthentication' /etc/ssh/sshd_config",
    expected="PasswordAuthentication no"
)

# Firewall status
checklist.add_check(
    "Firewall: UFW enabled",
    "ufw status",
    expected="Status: active"
)

# Unnecessary services disabled
checklist.add_check(
    "Service: Telnet not installed",
    "which telnet",
    expected=""  # Should not exist
)

# File permissions
checklist.add_check(
    "Permissions: /etc/passwd readable only by owner",
    "stat -c '%a' /etc/passwd",
    expected="644"
)
```

### Application-Level Hardening

```python
class ApplicationSecurityConfig:
    """Secure application configuration template"""

    @staticmethod
    def get_secure_flask_config():
        """Get secure Flask configuration"""
        return {
            # Core security
            'SECRET_KEY': os.getenv('SECRET_KEY'),  # Must be random, 32+ chars
            'DEBUG': False,  # Never True in production

            # Session configuration
            'SESSION_COOKIE_SECURE': True,  # HTTPS only
            'SESSION_COOKIE_HTTPONLY': True,  # No JavaScript access
            'SESSION_COOKIE_SAMESITE': 'Strict',  # CSRF protection
            'PERMANENT_SESSION_LIFETIME': 3600,  # 1 hour timeout

            # File upload security
            'MAX_CONTENT_LENGTH': 16 * 1024 * 1024,  # 16MB max
            'UPLOAD_EXTENSIONS': {'.jpg', '.jpeg', '.png', '.pdf'},
            'UPLOAD_PATH': '/var/uploads',  # Outside web root

            # Database security
            'SQLALCHEMY_DATABASE_URI': os.getenv('DATABASE_URL'),
            'SQLALCHEMY_TRACK_MODIFICATIONS': False,
            'SQLALCHEMY_ECHO': False,  # Don't log SQL in production

            # CORS restrictions
            'CORS_ORIGINS': os.getenv('CORS_ORIGINS', '').split(','),
            'CORS_SUPPORTS_CREDENTIALS': True,

            # Rate limiting
            'RATELIMIT_ENABLED': True,
            'RATELIMIT_STORAGE_URL': 'redis://localhost:6379',
            'RATELIMIT_STRATEGY': 'fixed-window',
            'RATELIMIT_DEFAULT': '100/hour',

            # Security headers
            'SECURITY_HEADERS': {
                'X-Frame-Options': 'DENY',
                'X-Content-Type-Options': 'nosniff',
                'X-XSS-Protection': '1; mode=block',
                'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
                'Content-Security-Policy': "default-src 'self'",
                'Referrer-Policy': 'strict-origin-when-cross-origin'
            },

            # Logging
            'LOG_LEVEL': 'INFO',  # Not DEBUG in production
            'LOG_FILE': '/var/log/app/application.log',
            'LOG_MAX_BYTES': 10485760,  # 10MB
            'LOG_BACKUP_COUNT': 10,

            # Allowed hosts (prevent Host header injection)
            'ALLOWED_HOSTS': os.getenv('ALLOWED_HOSTS', '').split(',')
        }

    @staticmethod
    def apply_security_config(app):
        """Apply security configuration to Flask app"""
        config = ApplicationSecurityConfig.get_secure_flask_config()

        # Apply configuration
        app.config.update(config)

        # Validate in production
        if os.getenv('ENVIRONMENT') == 'production':
            validator = ConfigurationValidator()
            if not validator.validate_production_config(app.config):
                raise Exception("Security configuration validation failed")

        return app
```

## Configuration Templates

### Production Environment File Template

```bash
# .env.production - NEVER commit this file to version control

# Environment
ENVIRONMENT=production

# Application
SECRET_KEY=<GENERATE_RANDOM_32_CHAR_STRING>
DEBUG=False
ALLOWED_HOSTS=example.com,www.example.com

# Database
DATABASE_URL=postgresql://appuser:<STRONG_PASSWORD>@localhost/appdb

# Security
FORCE_HTTPS=True
SESSION_COOKIE_SECURE=True
SESSION_COOKIE_HTTPONLY=True
SESSION_COOKIE_SAMESITE=Strict

# CORS
CORS_ORIGINS=https://example.com

# Rate Limiting
RATELIMIT_ENABLED=True
RATELIMIT_DEFAULT=100/hour

# Logging
LOG_LEVEL=INFO
LOG_FILE=/var/log/app/application.log

# External Services (use secrets manager in production)
AWS_ACCESS_KEY_ID=<FROM_SECRETS_MANAGER>
AWS_SECRET_ACCESS_KEY=<FROM_SECRETS_MANAGER>

# Email
MAIL_SERVER=smtp.example.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=<FROM_SECRETS_MANAGER>
MAIL_PASSWORD=<FROM_SECRETS_MANAGER>
```

## Automated Configuration Auditing

```python
import subprocess
import json

class SecurityAuditor:
    """Automated security configuration audit"""

    def audit_system(self):
        """Run comprehensive security audit"""
        audit_results = {
            'timestamp': datetime.now().isoformat(),
            'checks': []
        }

        # Check for default credentials
        audit_results['checks'].append(
            self.check_default_credentials()
        )

        # Check open ports
        audit_results['checks'].append(
            self.check_open_ports()
        )

        # Check file permissions
        audit_results['checks'].append(
            self.check_file_permissions()
        )

        # Check SSL/TLS configuration
        audit_results['checks'].append(
            self.check_ssl_config()
        )

        # Generate report
        return self.generate_report(audit_results)

    def check_default_credentials(self):
        """Check for default database credentials"""
        # Implementation depends on system
        return {
            'name': 'Default Credentials Check',
            'status': 'PASS',
            'details': 'No default credentials found'
        }

    def check_open_ports(self):
        """Check for unnecessary open ports"""
        expected_ports = {22, 80, 443}
        # Run netstat or ss command
        # Parse output and compare with expected
        return {
            'name': 'Open Ports Check',
            'status': 'PASS',
            'details': f'Only expected ports open: {expected_ports}'
        }

    def generate_report(self, audit_results):
        """Generate audit report"""
        passed = sum(1 for check in audit_results['checks']
                    if check['status'] == 'PASS')
        total = len(audit_results['checks'])

        report = f"Security Audit Report\n"
        report += f"Timestamp: {audit_results['timestamp']}\n"
        report += f"Passed: {passed}/{total}\n\n"

        for check in audit_results['checks']:
            report += f"[{check['status']}] {check['name']}\n"
            report += f"  {check['details']}\n\n"

        return report
```

## Summary

Security misconfiguration is a critical vulnerability that can be prevented through proper hardening, configuration validation, and automated auditing. Always change default credentials, disable unnecessary features and services, implement secure defaults, and validate configurations before deployment. Use configuration management tools and infrastructure as code to ensure consistent secure configurations across environments.

## Key Takeaways

- Change all default credentials immediately
- Disable unnecessary features, services, and ports
- Implement secure configuration baselines
- Validate configuration before production deployment
- Disable directory listing and information disclosure
- Use environment-specific configuration files
- Implement automated configuration auditing
- Apply security headers consistently
- Never expose debug information in production
- Use secrets managers for sensitive configuration
- Harden at multiple layers (OS, web server, application)
- Document and maintain security configurations
