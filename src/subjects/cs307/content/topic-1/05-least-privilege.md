# Principle of Least Privilege

## Introduction

The Principle of Least Privilege (PoLP) is a fundamental security concept stating that every user, program, or process should have only the minimum privileges necessary to perform its intended function. This principle minimizes the potential damage from accidents, errors, or malicious actions by limiting what each entity can access and modify.

Think of it this way: a delivery person shouldn't have the keys to your entire house just to drop off a package at your doorstep. They need access only to the specific area required for their legitimate task.

## Why Least Privilege Matters

### Limiting Damage from Compromises

When an account or system is compromised, the damage is limited to that account's privileges:

```python
# Example: Limited damage from compromised account

# Bad Practice: Admin privileges for regular tasks
user_account = {
    'username': 'web_app',
    'privileges': ['READ', 'WRITE', 'DELETE', 'DROP_TABLE', 'CREATE_USER']
}
# If compromised: Attacker can destroy entire database

# Good Practice: Minimal necessary privileges
user_account = {
    'username': 'web_app',
    'privileges': ['READ', 'INSERT', 'UPDATE']  # Only what's needed
}
# If compromised: Attacker cannot delete data or modify schema
```

### Reducing Attack Surface

Fewer privileges mean:
- Fewer potential vulnerabilities to exploit
- Smaller blast radius from security incidents
- Easier to audit and monitor unusual activity
- Simpler privilege management

### Real-World Impact

Consider these scenarios:

**Scenario 1: Excessive Privileges**
- A web application runs with root/administrator privileges
- SQL injection vulnerability discovered
- Attacker gains complete system control
- Entire server compromised

**Scenario 2: Least Privilege**
- Web application runs with limited user account
- Same SQL injection vulnerability
- Attacker can only access application's database
- Damage contained, system integrity maintained

## Implementing Least Privilege

### 1. User Account Management

Grant users only the permissions required for their role.

```python
class UserPermissionManager:
    """Manage user permissions following least privilege"""

    def __init__(self):
        self.role_permissions = self.define_roles()

    def define_roles(self):
        """Define minimum permissions for each role"""

        return {
            'viewer': {
                'permissions': ['READ'],
                'resources': ['public_data', 'assigned_projects']
            },
            'contributor': {
                'permissions': ['READ', 'CREATE', 'UPDATE'],
                'resources': ['assigned_projects']
            },
            'manager': {
                'permissions': ['READ', 'CREATE', 'UPDATE', 'DELETE'],
                'resources': ['managed_projects']
            },
            'admin': {
                'permissions': ['READ', 'CREATE', 'UPDATE', 'DELETE', 'ADMIN'],
                'resources': ['all']
            }
        }

    def assign_minimum_role(self, user, required_actions):
        """Assign the least privileged role that satisfies requirements"""

        # Determine minimum role needed
        for role, config in self.role_permissions.items():
            if all(action in config['permissions'] for action in required_actions):
                user.assign_role(role)
                return role

        # If no role provides exactly what's needed, create custom role
        custom_role = self.create_custom_role(required_actions)
        user.assign_role(custom_role)
        return custom_role

    def create_custom_role(self, required_permissions):
        """Create role with exactly the needed permissions"""

        return {
            'name': f"custom_{hash(tuple(required_permissions))}",
            'permissions': required_permissions,
            'type': 'custom'
        }

    def review_permissions(self, user):
        """Periodically review and reduce unnecessary permissions"""

        current_permissions = user.get_permissions()
        actual_usage = self.analyze_permission_usage(user)

        # Identify unused permissions
        unused = set(current_permissions) - set(actual_usage)

        if unused:
            # Flag for review
            return {
                'user': user.id,
                'unused_permissions': list(unused),
                'recommendation': 'Remove unused permissions'
            }

        return None
```

### 2. Service Account Management

Applications and services should run with minimal privileges.

```python
class ServiceAccountManager:
    """Manage service accounts with least privilege"""

    def create_database_service_account(self, application_name, required_operations):
        """Create database account with minimal permissions"""

        # Never use root/admin credentials for applications
        username = f"{application_name}_app"

        # Determine exact permissions needed
        permissions = self.map_operations_to_permissions(required_operations)

        # Create account with only these permissions
        sql_commands = []

        # Create user
        sql_commands.append(
            f"CREATE USER '{username}'@'localhost' "
            f"IDENTIFIED BY '{self.generate_strong_password()}'"
        )

        # Grant minimum permissions on specific tables only
        if 'read_users' in required_operations:
            sql_commands.append(
                f"GRANT SELECT ON app_db.users TO '{username}'@'localhost'"
            )

        if 'write_orders' in required_operations:
            sql_commands.append(
                f"GRANT INSERT, UPDATE ON app_db.orders TO '{username}'@'localhost'"
            )

        # Explicitly do NOT grant:
        # - DELETE (if not needed)
        # - DROP (never needed for application)
        # - CREATE (schema changes should be manual)
        # - GRANT OPTION (can't delegate permissions)

        sql_commands.append("FLUSH PRIVILEGES")

        return {
            'username': username,
            'permissions': permissions,
            'sql_commands': sql_commands
        }

    def create_file_system_service_account(self, service_name, required_paths):
        """Create OS account with minimal file system access"""

        username = f"{service_name}_svc"

        # Create account without login shell (can't be used interactively)
        os_commands = [
            f"useradd -r -s /usr/sbin/nologin {username}"
        ]

        # Set permissions on specific directories only
        for path, permissions in required_paths.items():
            if permissions == 'read':
                os_commands.append(f"setfacl -m u:{username}:r {path}")
            elif permissions == 'write':
                os_commands.append(f"setfacl -m u:{username}:rw {path}")

        # Service should NOT have:
        # - Access to /etc (configuration)
        # - Access to /home (user data)
        # - Access to /root (admin files)
        # - Sudo privileges

        return os_commands
```

### 3. Temporary Privilege Elevation

When higher privileges are needed temporarily, use just-in-time elevation.

```python
class PrivilegeElevationManager:
    """Manage temporary privilege elevation"""

    def __init__(self):
        self.active_elevations = {}

    def request_temporary_elevation(self, user, privilege, duration_minutes, justification):
        """Grant elevated privilege temporarily"""

        # Verify user is authorized to request elevation
        if not self.can_request_elevation(user, privilege):
            raise PermissionError(f"User {user.id} cannot request {privilege}")

        # Require approval for sensitive privileges
        if self.requires_approval(privilege):
            approval_request = self.create_approval_request(
                user, privilege, justification
            )
            return {'status': 'pending_approval', 'request_id': approval_request.id}

        # Grant temporary privilege
        elevation_id = self.grant_temporary_privilege(
            user, privilege, duration_minutes
        )

        # Schedule automatic revocation
        self.schedule_revocation(elevation_id, duration_minutes)

        # Log the elevation
        self.audit_log.log(
            f"Temporary privilege granted: {user.id} -> {privilege} "
            f"for {duration_minutes} minutes. Justification: {justification}"
        )

        return {
            'status': 'granted',
            'elevation_id': elevation_id,
            'expires_at': datetime.now() + timedelta(minutes=duration_minutes)
        }

    def execute_with_elevated_privilege(self, user, privilege, operation):
        """Execute specific operation with elevated privilege, then revoke"""

        # Verify authorization
        if not self.can_use_privilege(user, privilege):
            raise PermissionError("Privilege not granted")

        try:
            # Temporarily assume privilege
            with self.elevated_context(user, privilege):
                result = operation()

            # Log successful use
            self.audit_log.log(
                f"Elevated operation completed: {user.id} used {privilege}"
            )

            return result

        finally:
            # Automatically drop privilege after operation
            self.drop_privilege(user, privilege)

    def elevated_context(self, user, privilege):
        """Context manager for temporary privilege elevation"""

        class ElevatedContext:
            def __init__(self, manager, user, privilege):
                self.manager = manager
                self.user = user
                self.privilege = privilege

            def __enter__(self):
                self.manager.add_privilege(self.user, self.privilege)
                return self

            def __exit__(self, exc_type, exc_val, exc_tb):
                self.manager.remove_privilege(self.user, self.privilege)

        return ElevatedContext(self, user, privilege)
```

### 4. Application-Level Least Privilege

Applications should request only the permissions they need.

```python
class ApplicationPermissions:
    """Define and enforce application-level permissions"""

    def __init__(self):
        self.api_permissions = self.define_api_permissions()

    def define_api_permissions(self):
        """Fine-grained API permissions"""

        return {
            'profile.read': 'Read user profile information',
            'profile.write': 'Update user profile',
            'orders.read': 'View order history',
            'orders.create': 'Place new orders',
            'orders.cancel': 'Cancel orders',
            'admin.users.read': 'View all users (admin)',
            'admin.users.write': 'Modify user accounts (admin)'
        }

    def request_minimum_permissions(self, app_purpose):
        """Request only permissions needed for app's purpose"""

        permission_sets = {
            'read_only_dashboard': [
                'profile.read',
                'orders.read'
            ],
            'customer_app': [
                'profile.read',
                'profile.write',
                'orders.read',
                'orders.create',
                'orders.cancel'
            ],
            'admin_panel': [
                'profile.read',
                'orders.read',
                'admin.users.read',
                'admin.users.write'
            ]
        }

        return permission_sets.get(app_purpose, [])

    def validate_permission_request(self, requested_permissions, user_role):
        """Ensure requested permissions are appropriate for user role"""

        allowed_by_role = {
            'customer': ['profile.read', 'profile.write', 'orders.*'],
            'support': ['profile.read', 'orders.*'],
            'admin': ['*']
        }

        role_permissions = allowed_by_role.get(user_role, [])

        for permission in requested_permissions:
            if not self.permission_matches_pattern(permission, role_permissions):
                raise PermissionError(
                    f"Role '{user_role}' cannot request permission '{permission}'"
                )

        return True

# OAuth example: Request minimal scopes
class OAuth2Client:
    """OAuth client requesting minimal scopes"""

    def request_authorization(self, purpose):
        """Request only scopes needed for specific purpose"""

        # Bad: Request all possible scopes
        # scopes = ['read', 'write', 'delete', 'admin']

        # Good: Request only what's needed
        scope_mapping = {
            'view_profile': ['profile.read'],
            'edit_profile': ['profile.read', 'profile.write'],
            'post_on_behalf': ['posts.create']
        }

        minimal_scopes = scope_mapping.get(purpose, [])

        auth_url = (
            f"https://oauth.provider.com/authorize?"
            f"client_id={self.client_id}&"
            f"scope={','.join(minimal_scopes)}&"
            f"response_type=code"
        )

        return auth_url
```

## Need-to-Know Principle

A related concept where access is granted based on necessity for job functions, regardless of clearance level.

```python
class NeedToKnowAccess:
    """Implement need-to-know access control"""

    def __init__(self):
        self.data_classification = DataClassificationService()
        self.access_log = AuditLogger()

    def grant_access(self, user, resource, justification):
        """Grant access only if user demonstrates need"""

        # Check if access is necessary for user's current responsibilities
        if not self.demonstrates_need(user, resource, justification):
            self.access_log.log_denied_access(user, resource, "No demonstrated need")
            raise PermissionError("Access denied - no demonstrated need to know")

        # Check if user's role typically requires this access
        if not self.is_typical_for_role(user.role, resource):
            # Flag for additional review
            self.flag_for_review(user, resource, justification)

        # Check data classification vs user clearance
        classification = self.data_classification.get_level(resource)
        if not user.has_clearance(classification):
            raise PermissionError("Insufficient clearance level")

        # Grant time-limited access
        access_grant = {
            'user_id': user.id,
            'resource': resource,
            'granted_at': datetime.now(),
            'expires_at': datetime.now() + timedelta(days=30),
            'justification': justification
        }

        self.access_log.log_granted_access(access_grant)
        return access_grant

    def demonstrates_need(self, user, resource, justification):
        """Verify legitimate business need"""

        # Check if user is assigned to project requiring this data
        user_projects = self.get_user_projects(user)
        resource_projects = self.get_resource_projects(resource)

        if not set(user_projects).intersection(set(resource_projects)):
            return False

        # Check if justification is substantive
        if not justification or len(justification) < 20:
            return False

        return True

    def periodic_access_review(self):
        """Review and revoke unnecessary access"""

        all_grants = self.get_all_access_grants()

        for grant in all_grants:
            # Check if still needed
            if not self.is_still_needed(grant):
                self.revoke_access(grant)
                self.notify_user(grant['user_id'], "Access revoked due to no longer needed")

            # Check if expired
            if grant['expires_at'] < datetime.now():
                self.revoke_access(grant)

        return self.generate_review_report(all_grants)
```

## Common Least Privilege Violations and Fixes

### Violation 1: Running Web Apps as Root

```python
# BAD: Web application running as root
"""
[Unit]
Description=Web Application
[Service]
User=root  # DANGEROUS!
ExecStart=/usr/bin/python3 /opt/webapp/app.py
[Install]
WantedBy=multi-user.target
"""

# GOOD: Dedicated user with minimal permissions
"""
# Create dedicated user
useradd -r -s /usr/sbin/nologin webapp

# Set ownership
chown -R webapp:webapp /opt/webapp
chmod 750 /opt/webapp

# Service configuration
[Unit]
Description=Web Application
[Service]
User=webapp  # Dedicated user
Group=webapp
ExecStart=/usr/bin/python3 /opt/webapp/app.py
# Additional restrictions
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/opt/webapp/data
[Install]
WantedBy=multi-user.target
"""
```

### Violation 2: Shared Administrator Accounts

```python
class IndividualAccountEnforcement:
    """Enforce individual accounts instead of shared admin accounts"""

    def __init__(self):
        self.audit_log = AuditLogger()

    def perform_admin_action(self, action, admin_user):
        """Require individual admin accounts for accountability"""

        # BAD: Everyone uses 'admin' or 'root' account
        # Can't determine who performed action

        # GOOD: Each administrator has individual account
        if admin_user.account_type == 'shared':
            raise SecurityError("Shared accounts not permitted for admin actions")

        # Verify individual identity
        if not admin_user.is_individually_authenticated():
            raise SecurityError("Individual authentication required")

        # Log action with specific user
        self.audit_log.log({
            'timestamp': datetime.now(),
            'user': admin_user.individual_id,  # Specific person
            'action': action,
            'account': admin_user.admin_account
        })

        # Execute action
        return self.execute_admin_action(action)
```

### Violation 3: Permanent Elevated Privileges

```python
class TemporaryElevation:
    """Use sudo/temporary elevation instead of running as admin"""

    def administrative_task(self):
        """Elevate privileges only when needed, only for duration needed"""

        # BAD: Always run with admin privileges
        # if user.is_admin:
        #     perform_task()

        # GOOD: Elevate temporarily for specific operation
        if self.requires_admin_privileges():
            # Request temporary elevation
            with self.temporary_elevation('admin', duration=timedelta(minutes=5)):
                self.perform_privileged_operation()

        # Automatically drop privileges after operation

    def temporary_elevation(self, privilege_level, duration):
        """Context manager for temporary privilege elevation"""

        class TempElevation:
            def __init__(self, manager, privilege, duration):
                self.manager = manager
                self.privilege = privilege
                self.duration = duration
                self.original_privileges = None

            def __enter__(self):
                self.original_privileges = self.manager.get_current_privileges()
                self.manager.elevate_to(self.privilege)
                self.manager.schedule_auto_revoke(self.duration)
                return self

            def __exit__(self, exc_type, exc_val, exc_tb):
                self.manager.restore_privileges(self.original_privileges)

        return TempElevation(self, privilege_level, duration)
```

### Violation 4: Overly Broad Database Permissions

```python
class DatabasePermissionManagement:
    """Grant minimal database permissions"""

    def setup_application_db_user(self):
        """Create database user with minimal necessary permissions"""

        # BAD: Grant ALL PRIVILEGES
        """
        GRANT ALL PRIVILEGES ON *.* TO 'app'@'localhost';
        """

        # GOOD: Grant specific permissions on specific tables
        commands = [
            # Read-only reporting user
            "CREATE USER 'reports'@'localhost' IDENTIFIED BY 'strong_password';",
            "GRANT SELECT ON analytics.* TO 'reports'@'localhost';",

            # Application user - only what's needed
            "CREATE USER 'webapp'@'localhost' IDENTIFIED BY 'strong_password';",
            "GRANT SELECT, INSERT, UPDATE ON appdb.users TO 'webapp'@'localhost';",
            "GRANT SELECT, INSERT, UPDATE ON appdb.orders TO 'webapp'@'localhost';",
            # Note: No DELETE, no DROP, no schema modification

            # Batch processing user
            "CREATE USER 'batch'@'localhost' IDENTIFIED BY 'strong_password';",
            "GRANT SELECT, INSERT ON appdb.reports TO 'batch'@'localhost';",

            "FLUSH PRIVILEGES;"
        ]

        return commands
```

## Monitoring and Auditing Least Privilege

```python
class PrivilegeMonitoring:
    """Monitor and audit privilege usage"""

    def detect_privilege_violations(self):
        """Identify potential least privilege violations"""

        violations = []

        # 1. Detect privilege escalation attempts
        escalation_attempts = self.detect_escalation_attempts()
        if escalation_attempts:
            violations.extend(escalation_attempts)

        # 2. Identify users with excessive permissions
        over_privileged_users = self.find_over_privileged_users()
        if over_privileged_users:
            violations.extend(over_privileged_users)

        # 3. Find unused elevated privileges
        unused_privileges = self.find_unused_privileges()
        if unused_privileges:
            violations.extend(unused_privileges)

        # 4. Detect dormant admin accounts
        dormant_admins = self.find_dormant_admin_accounts()
        if dormant_admins:
            violations.extend(dormant_admins)

        return violations

    def find_over_privileged_users(self):
        """Identify users with more privileges than they use"""

        users = self.get_all_users()
        over_privileged = []

        for user in users:
            # Get assigned permissions
            assigned = set(user.get_permissions())

            # Get actually used permissions (last 90 days)
            used = set(self.get_permission_usage(user, days=90))

            # Find unused permissions
            unused = assigned - used

            if len(unused) > 0:
                over_privileged.append({
                    'user': user.id,
                    'unused_permissions': list(unused),
                    'recommendation': 'Review and remove unused permissions'
                })

        return over_privileged

    def detect_escalation_attempts(self):
        """Detect attempts to gain unauthorized privileges"""

        attempts = []

        # Check audit logs for permission denied events
        denied_events = self.audit_log.get_denied_access_events()

        # Group by user
        from collections import Counter
        by_user = Counter([event['user'] for event in denied_events])

        # Flag users with many denied attempts
        for user, count in by_user.items():
            if count > 10:  # Threshold
                attempts.append({
                    'user': user,
                    'denied_count': count,
                    'severity': 'HIGH',
                    'recommendation': 'Investigate potential privilege escalation attempt'
                })

        return attempts
```

## Best Practices Summary

### 1. Default Deny
```python
# Default to no access, explicitly grant what's needed
def check_permission(user, resource, action):
    # Start with denial
    if not user.has_explicit_permission(resource, action):
        return False
    return True
```

### 2. Time-Limited Access
```python
# Grant access for limited time periods
access_grant = {
    'expires_at': datetime.now() + timedelta(days=30),
    'requires_renewal': True
}
```

### 3. Regular Reviews
```python
# Periodically review and remove unnecessary privileges
def quarterly_access_review():
    for user in all_users:
        review_permissions(user)
        remove_unused_permissions(user)
```

### 4. Separation of Duties
```python
# No single person should have complete control
def approve_transaction(initiator, approver):
    if initiator.id == approver.id:
        raise Error("Cannot approve own transaction")
```

## Conclusion

The Principle of Least Privilege is one of the most effective security controls. By limiting what each user, process, and system can do, you:

- Contain damage from security incidents
- Reduce the attack surface
- Improve accountability through better audit trails
- Simplify security management
- Comply with regulatory requirements

Remember: Privileges should be granted based on need, limited in scope, and reviewed regularly. When in doubt, grant less rather than more—you can always add permissions later if truly needed.

## Key Takeaways

- Grant minimum necessary privileges for each function
- Use role-based access control with fine-grained permissions
- Implement temporary privilege elevation for admin tasks
- Avoid shared administrator accounts
- Regularly review and revoke unnecessary permissions
- Service accounts should have minimal database and file system access
- Applications should request minimal API scopes
- Monitor for privilege escalation attempts
- Default to deny, explicitly grant what's needed
