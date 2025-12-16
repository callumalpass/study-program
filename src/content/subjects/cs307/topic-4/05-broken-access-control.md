# Broken Access Control

## Introduction

Broken Access Control is the most critical web application security risk according to OWASP Top 10 2021. Access control enforces policies such that users cannot act outside of their intended permissions. Failures in access control allow attackers to access unauthorized functionality and data, potentially leading to data disclosure, modification, or destruction.

This lesson focuses on understanding access control vulnerabilities and implementing robust authorization mechanisms to prevent them.

## Types of Access Control

### Vertical Access Control

Vertical access control restricts access to sensitive functionality based on user roles or privilege levels.

```
Example hierarchy:
- Administrator (highest privilege)
- Manager
- Regular User
- Guest (lowest privilege)
```

### Horizontal Access Control

Horizontal access control restricts access to resources to specific users at the same privilege level.

```
Example:
User A can access their own data but not User B's data
Both are "regular users" with same role
```

### Context-Dependent Access Control

Access decisions based on application state or business logic.

```
Example:
User can edit their order only while it's in "pending" status
Same user cannot edit after order is "shipped"
```

## Insecure Direct Object References (IDOR)

IDOR vulnerabilities occur when applications expose direct references to internal implementation objects without proper authorization checks.

### Vulnerable Pattern

```python
# VULNERABLE - Direct object reference without authorization
from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

@app.route('/api/user/<int:user_id>')
def get_user_profile_vulnerable(user_id):
    """Anyone can access any user's profile"""
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cursor.fetchone()

    if user:
        return jsonify({
            'id': user[0],
            'username': user[1],
            'email': user[2],
            'ssn': user[3],  # Sensitive data exposed!
            'salary': user[4]
        })

    return jsonify({'error': 'User not found'}), 404

# Attack scenario:
# Authenticated as user ID 5
# Request: GET /api/user/6
# Response: Full profile of user 6 including sensitive data
# Attacker can iterate through all user IDs
```

### Secure Implementation: Authorization Checks

```python
# SECURE - Proper authorization enforcement
from flask import Flask, request, jsonify, g
import sqlite3
from functools import wraps

app = Flask(__name__)

def get_current_user():
    """Get currently authenticated user from session"""
    # In real application, verify JWT token or session
    return g.get('current_user')

def require_auth(f):
    """Decorator to require authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user = get_current_user()
        if not user:
            return jsonify({'error': 'Authentication required'}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/api/user/<int:user_id>')
@require_auth
def get_user_profile_secure(user_id):
    """Enforce authorization before returning data"""
    current_user = get_current_user()

    # Authorization check
    if current_user['id'] != user_id and not current_user.get('is_admin'):
        return jsonify({'error': 'Access denied'}), 403

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cursor.fetchone()

    if user:
        # Return only appropriate fields based on requester
        response = {
            'id': user[0],
            'username': user[1],
            'email': user[2]
        }

        # Include sensitive data only for own profile or admin
        if current_user['id'] == user_id or current_user.get('is_admin'):
            response['ssn'] = user[3]
            response['salary'] = user[4]

        return jsonify(response)

    return jsonify({'error': 'User not found'}), 404
```

### Using Indirect References

```python
# SECURE - Indirect reference mapping
import uuid
from flask import session

class ResourceAccessManager:
    """Manage secure resource access with indirect references"""

    def __init__(self):
        # Map session-specific tokens to actual resource IDs
        self.access_tokens = {}

    def create_access_token(self, user_id, resource_id):
        """Create temporary access token for resource"""
        token = str(uuid.uuid4())

        # Store mapping in session-specific storage
        session_key = f"{user_id}:{token}"
        self.access_tokens[session_key] = {
            'resource_id': resource_id,
            'user_id': user_id,
            'expires': time.time() + 3600  # 1 hour expiry
        }

        return token

    def get_resource_id(self, user_id, token):
        """Retrieve resource ID from token with validation"""
        session_key = f"{user_id}:{token}"
        access_info = self.access_tokens.get(session_key)

        if not access_info:
            return None

        # Check expiry
        if time.time() > access_info['expires']:
            del self.access_tokens[session_key]
            return None

        # Verify user match
        if access_info['user_id'] != user_id:
            return None

        return access_info['resource_id']

# Usage
access_manager = ResourceAccessManager()

@app.route('/api/document/<token>')
@require_auth
def get_document(token):
    current_user = get_current_user()

    # Resolve indirect reference
    doc_id = access_manager.get_resource_id(current_user['id'], token)

    if not doc_id:
        return jsonify({'error': 'Invalid or expired token'}), 403

    # Retrieve and return document
    document = get_document_by_id(doc_id)
    return jsonify(document)
```

## Privilege Escalation

Privilege escalation occurs when users gain higher privileges than intended, either vertically (to higher role) or horizontally (to other users' resources).

### Vertical Privilege Escalation - Vulnerable Pattern

```python
# VULNERABLE - Missing role validation
@app.route('/api/admin/users', methods=['POST'])
def create_user_vulnerable():
    """Admin-only endpoint without role check"""
    # No authorization check!

    username = request.json.get('username')
    role = request.json.get('role')

    # Create user with any role
    create_user_in_db(username, role)

    return jsonify({'status': 'User created'})

# Attack scenario:
# Regular user sends: POST /api/admin/users
# Body: {"username": "attacker", "role": "admin"}
# Result: Attacker creates admin account
```

### Secure Implementation: Role-Based Access Control (RBAC)

```python
# SECURE - Comprehensive RBAC implementation
from enum import Enum
from functools import wraps

class Role(Enum):
    """Define application roles"""
    GUEST = 1
    USER = 2
    MANAGER = 3
    ADMIN = 4

class Permission(Enum):
    """Define granular permissions"""
    READ_OWN_DATA = 'read_own_data'
    READ_ALL_DATA = 'read_all_data'
    WRITE_OWN_DATA = 'write_own_data'
    WRITE_ALL_DATA = 'write_all_data'
    DELETE_OWN_DATA = 'delete_own_data'
    DELETE_ALL_DATA = 'delete_all_data'
    MANAGE_USERS = 'manage_users'
    MANAGE_ROLES = 'manage_roles'

# Role-to-permission mapping
ROLE_PERMISSIONS = {
    Role.GUEST: {
        Permission.READ_OWN_DATA
    },
    Role.USER: {
        Permission.READ_OWN_DATA,
        Permission.WRITE_OWN_DATA,
        Permission.DELETE_OWN_DATA
    },
    Role.MANAGER: {
        Permission.READ_OWN_DATA,
        Permission.READ_ALL_DATA,
        Permission.WRITE_OWN_DATA,
        Permission.WRITE_ALL_DATA,
        Permission.DELETE_OWN_DATA
    },
    Role.ADMIN: {
        Permission.READ_OWN_DATA,
        Permission.READ_ALL_DATA,
        Permission.WRITE_OWN_DATA,
        Permission.WRITE_ALL_DATA,
        Permission.DELETE_OWN_DATA,
        Permission.DELETE_ALL_DATA,
        Permission.MANAGE_USERS,
        Permission.MANAGE_ROLES
    }
}

class AccessControl:
    """Centralized access control logic"""

    @staticmethod
    def has_permission(user, permission):
        """Check if user has specific permission"""
        if not user or 'role' not in user:
            return False

        user_role = Role[user['role']]
        user_permissions = ROLE_PERMISSIONS.get(user_role, set())

        return permission in user_permissions

    @staticmethod
    def require_permission(permission):
        """Decorator to enforce permission"""
        def decorator(f):
            @wraps(f)
            def decorated_function(*args, **kwargs):
                user = get_current_user()

                if not AccessControl.has_permission(user, permission):
                    return jsonify({
                        'error': 'Insufficient permissions',
                        'required': permission.value
                    }), 403

                return f(*args, **kwargs)
            return decorated_function
        return decorator

    @staticmethod
    def require_role(required_role):
        """Decorator to enforce minimum role"""
        def decorator(f):
            @wraps(f)
            def decorated_function(*args, **kwargs):
                user = get_current_user()

                if not user or 'role' not in user:
                    return jsonify({'error': 'Authentication required'}), 401

                user_role = Role[user['role']]

                if user_role.value < required_role.value:
                    return jsonify({
                        'error': 'Insufficient privileges',
                        'required_role': required_role.name
                    }), 403

                return f(*args, **kwargs)
            return decorated_function
        return decorator

# Secure endpoint with RBAC
@app.route('/api/admin/users', methods=['POST'])
@require_auth
@AccessControl.require_permission(Permission.MANAGE_USERS)
def create_user_secure():
    """Admin-only endpoint with proper authorization"""
    current_user = get_current_user()

    username = request.json.get('username')
    requested_role = request.json.get('role')

    # Validate requested role
    try:
        new_role = Role[requested_role]
    except KeyError:
        return jsonify({'error': 'Invalid role'}), 400

    # Prevent privilege escalation: Can't create users with higher role
    current_role = Role[current_user['role']]
    if new_role.value > current_role.value:
        return jsonify({'error': 'Cannot create user with higher privileges'}), 403

    # Create user
    create_user_in_db(username, requested_role)

    return jsonify({'status': 'User created'})

@app.route('/api/documents/<int:doc_id>', methods=['DELETE'])
@require_auth
@AccessControl.require_permission(Permission.DELETE_ALL_DATA)
def delete_document(doc_id):
    """Delete document - requires DELETE_ALL_DATA permission"""
    delete_document_from_db(doc_id)
    return jsonify({'status': 'Document deleted'})
```

## Horizontal Privilege Escalation - Mass Assignment

Mass assignment vulnerabilities occur when applications automatically bind user input to internal objects without filtering.

### Vulnerable Pattern

```python
# VULNERABLE - Mass assignment
from flask import request
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String)
    is_admin = Column(Boolean, default=False)
    account_balance = Column(Integer, default=0)

@app.route('/api/profile', methods=['PUT'])
@require_auth
def update_profile_vulnerable():
    current_user = get_current_user()
    user = session.query(User).filter_by(id=current_user['id']).first()

    # Dangerous: Directly update from user input
    for key, value in request.json.items():
        setattr(user, key, value)  # VULNERABILITY

    session.commit()
    return jsonify({'status': 'Profile updated'})

# Attack scenario:
# PUT /api/profile
# Body: {"email": "new@email.com", "is_admin": true, "account_balance": 1000000}
# Result: User grants themselves admin privileges and unlimited balance
```

### Secure Implementation: Explicit Field Whitelisting

```python
# SECURE - Whitelist allowed fields
@app.route('/api/profile', methods=['PUT'])
@require_auth
def update_profile_secure():
    current_user = get_current_user()
    user = session.query(User).filter_by(id=current_user['id']).first()

    # Define allowed fields for update
    allowed_fields = {'username', 'email', 'bio', 'avatar_url'}

    # Only update whitelisted fields
    for key, value in request.json.items():
        if key in allowed_fields:
            # Additional validation per field
            if key == 'email' and not is_valid_email(value):
                return jsonify({'error': f'Invalid {key}'}), 400

            setattr(user, key, value)
        else:
            # Log attempt to modify restricted field
            log_security_event(f"Attempt to modify restricted field: {key}")

    session.commit()
    return jsonify({'status': 'Profile updated'})

# Alternative: Use dedicated update methods
class UserUpdateService:
    """Service class with explicit update methods"""

    @staticmethod
    def update_profile(user, username=None, email=None, bio=None):
        """Explicitly control what can be updated"""
        if username is not None:
            if not is_valid_username(username):
                raise ValueError("Invalid username")
            user.username = username

        if email is not None:
            if not is_valid_email(email):
                raise ValueError("Invalid email")
            user.email = email

        if bio is not None:
            if len(bio) > 500:
                raise ValueError("Bio too long")
            user.bio = bio

        # Protected fields like is_admin, account_balance
        # cannot be modified through this method

        return user
```

## Missing Function Level Access Control

### Vulnerable Pattern

```python
# VULNERABLE - Client-side only restrictions
@app.route('/api/reports/generate', methods=['POST'])
def generate_report_vulnerable():
    """Admin function without server-side check"""
    # Relies on client-side hiding of the button
    # No server-side authorization!

    report_type = request.json.get('type')
    report = generate_sensitive_report(report_type)

    return jsonify(report)

# Attack scenario:
# Regular user discovers endpoint through:
# - JavaScript inspection
# - Intercepting proxy
# - API documentation
# Direct POST request bypasses client-side controls
```

### Secure Implementation: Defense in Depth

```python
# SECURE - Server-side enforcement
@app.route('/api/reports/generate', methods=['POST'])
@require_auth
@AccessControl.require_permission(Permission.READ_ALL_DATA)
def generate_report_secure():
    """Enforce authorization at multiple layers"""
    current_user = get_current_user()
    report_type = request.json.get('type')

    # Layer 1: Role check (done by decorator)
    # Layer 2: Additional business logic validation
    if report_type == 'financial' and not current_user.get('finance_approved'):
        return jsonify({'error': 'Financial reports require additional approval'}), 403

    # Layer 3: Rate limiting for sensitive operations
    if not check_rate_limit(current_user['id'], 'report_generation', limit=10, period=3600):
        return jsonify({'error': 'Rate limit exceeded'}), 429

    # Layer 4: Audit logging
    log_audit_event(
        user_id=current_user['id'],
        action='generate_report',
        resource_type=report_type,
        ip_address=request.remote_addr
    )

    report = generate_sensitive_report(report_type)
    return jsonify(report)
```

## Attribute-Based Access Control (ABAC)

For complex authorization requirements, implement attribute-based access control.

```python
class ABACPolicy:
    """Attribute-Based Access Control policy engine"""

    def __init__(self):
        self.policies = []

    def add_policy(self, name, evaluation_func):
        """Add a policy rule"""
        self.policies.append({
            'name': name,
            'evaluate': evaluation_func
        })

    def evaluate(self, user, resource, action, context=None):
        """Evaluate all policies for access decision"""
        context = context or {}

        for policy in self.policies:
            try:
                if not policy['evaluate'](user, resource, action, context):
                    return False, f"Denied by policy: {policy['name']}"
            except Exception as e:
                # Fail closed - deny on policy evaluation error
                return False, f"Policy error: {str(e)}"

        return True, "Access granted"

# Define policies
abac = ABACPolicy()

# Policy 1: User must own resource or be admin
def ownership_policy(user, resource, action, context):
    if user.get('role') == 'ADMIN':
        return True
    return resource.get('owner_id') == user.get('id')

# Policy 2: Resource must not be archived for modification
def archive_policy(user, resource, action, context):
    if action in ['update', 'delete']:
        return not resource.get('is_archived')
    return True

# Policy 3: Time-based access (business hours only for certain resources)
def time_based_policy(user, resource, action, context):
    if resource.get('type') == 'financial':
        from datetime import datetime
        now = datetime.now()
        # Allow access only during business hours (9 AM - 5 PM)
        if now.hour < 9 or now.hour >= 17:
            return user.get('role') == 'ADMIN'  # Admins exempt
    return True

# Policy 4: Location-based access
def location_policy(user, resource, action, context):
    if resource.get('classification') == 'confidential':
        allowed_countries = ['US', 'UK', 'CA']
        user_country = context.get('country', 'UNKNOWN')
        return user_country in allowed_countries
    return True

# Register policies
abac.add_policy('ownership', ownership_policy)
abac.add_policy('archive', archive_policy)
abac.add_policy('time_based', time_based_policy)
abac.add_policy('location', location_policy)

# Use ABAC in endpoint
@app.route('/api/document/<int:doc_id>', methods=['PUT'])
@require_auth
def update_document(doc_id):
    current_user = get_current_user()
    document = get_document_by_id(doc_id)

    if not document:
        return jsonify({'error': 'Document not found'}), 404

    # Prepare context
    context = {
        'country': get_country_from_ip(request.remote_addr),
        'timestamp': datetime.now()
    }

    # Evaluate ABAC policies
    allowed, reason = abac.evaluate(current_user, document, 'update', context)

    if not allowed:
        log_access_denial(current_user['id'], doc_id, reason)
        return jsonify({'error': reason}), 403

    # Proceed with update
    update_document_in_db(doc_id, request.json)
    return jsonify({'status': 'Document updated'})
```

## Security Best Practices

### Centralized Authorization

```python
class AuthorizationService:
    """Centralized authorization service"""

    def __init__(self, policy_engine):
        self.policy_engine = policy_engine

    def authorize(self, user, resource, action, context=None):
        """
        Single point of authorization enforcement
        Returns: (allowed: bool, reason: str)
        """
        # Input validation
        if not user:
            return False, "No user provided"

        if not resource:
            return False, "No resource provided"

        # Evaluate policies
        allowed, reason = self.policy_engine.evaluate(
            user, resource, action, context
        )

        # Audit logging
        self.log_authorization_decision(
            user, resource, action, allowed, reason
        )

        return allowed, reason

    def log_authorization_decision(self, user, resource, action, allowed, reason):
        """Log all authorization decisions for audit"""
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'user_id': user.get('id'),
            'resource_id': resource.get('id'),
            'resource_type': resource.get('type'),
            'action': action,
            'allowed': allowed,
            'reason': reason
        }
        # Write to audit log
        write_audit_log(log_entry)
```

### Deny by Default

```python
def secure_endpoint_template():
    """Template for secure endpoint implementation"""

    # 1. Authenticate
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Authentication required'}), 401

    # 2. Authorize - DENY BY DEFAULT
    authorized = False
    reason = "Access denied"

    try:
        # Explicit authorization check
        authorized, reason = authorization_service.authorize(
            user, resource, action, context
        )
    except Exception as e:
        # Fail closed on errors
        log_error(f"Authorization error: {e}")
        return jsonify({'error': 'Authorization error'}), 500

    if not authorized:
        return jsonify({'error': reason}), 403

    # 3. Validate input
    # 4. Process request
    # 5. Return response
```

## Summary

Broken access control is the most critical web application security risk. Effective defense requires implementing authorization checks at every layer, using centralized access control logic, following the principle of least privilege, and denying access by default. Never rely on client-side access control, always validate authorization server-side, and implement comprehensive audit logging to detect and respond to access control violations.

## Key Takeaways

- Always perform authorization checks server-side
- Use indirect object references instead of direct IDs
- Implement role-based or attribute-based access control
- Whitelist allowed fields to prevent mass assignment
- Deny by default - require explicit authorization
- Centralize access control logic for consistency
- Log all access decisions for audit trails
- Never trust client-side access control
- Validate authorization at every layer (defense-in-depth)
- Prevent privilege escalation with proper role validation
