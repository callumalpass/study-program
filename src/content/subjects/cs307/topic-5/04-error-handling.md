# Error Handling

Secure error handling prevents information leakage while maintaining useful logs for debugging and security monitoring. Errors should provide minimal information to users but detailed information to developers and security teams.

## Secure Error Messages

Error messages shown to users should be generic and avoid revealing system internals, while detailed errors should be logged securely.

### User-Facing vs Internal Errors

```python
import logging
import traceback
from typing import Optional
from datetime import datetime

class SecureErrorHandler:
    """Handle errors securely with proper separation"""

    def __init__(self):
        # Configure secure logging
        self.logger = logging.getLogger('security')
        self.logger.setLevel(logging.INFO)

        # Log to file, not console in production
        handler = logging.FileHandler('/var/log/app/security.log')
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)

    def handle_authentication_error(self, username: str, reason: str) -> dict:
        """
        Handle authentication errors securely
        """
        # Generate error correlation ID
        error_id = self._generate_error_id()

        # Log detailed information internally
        self.logger.warning(
            f"Authentication failed - ID: {error_id}, "
            f"Username: {username}, Reason: {reason}"
        )

        # Return generic message to user
        return {
            'success': False,
            'message': 'Invalid username or password',  # Generic
            'error_id': error_id  # For support reference
        }

    def handle_database_error(self, operation: str, error: Exception) -> dict:
        """
        Handle database errors without leaking schema
        """
        error_id = self._generate_error_id()

        # Log full error details internally
        self.logger.error(
            f"Database error - ID: {error_id}, "
            f"Operation: {operation}, "
            f"Error: {str(error)}, "
            f"Traceback: {traceback.format_exc()}"
        )

        # Generic message to user
        return {
            'success': False,
            'message': 'A database error occurred. Please try again later.',
            'error_id': error_id
        }

    def handle_file_upload_error(self, filename: str, error: Exception) -> dict:
        """
        Handle file upload errors securely
        """
        error_id = self._generate_error_id()

        # Log details (without file contents)
        self.logger.error(
            f"File upload failed - ID: {error_id}, "
            f"Filename: {filename}, "
            f"Error type: {type(error).__name__}"
        )

        # Determine user-friendly message
        if isinstance(error, ValueError):
            message = "Invalid file format"
        elif isinstance(error, IOError):
            message = "File upload failed. Please try again."
        else:
            message = "An error occurred during upload"

        return {
            'success': False,
            'message': message,
            'error_id': error_id
        }

    def _generate_error_id(self) -> str:
        """Generate unique error correlation ID"""
        import uuid
        return f"ERR-{uuid.uuid4().hex[:8].upper()}"


# DANGEROUS - Examples of what NOT to do
class InsecureErrorHandler:
    """
    VULNERABLE EXAMPLES - DO NOT USE
    For educational purposes only
    """

    def handle_db_error_vulnerable(self, error: Exception) -> dict:
        """
        VULNERABLE: Exposes database structure
        Attack: Learn about database schema from error messages
        """
        # DON'T DO THIS
        return {
            'error': str(error),  # "Table 'users' doesn't exist"
            'query': error.query,  # Exposes SQL queries
            'stack_trace': traceback.format_exc()  # Exposes code paths
        }

    def handle_auth_error_verbose(self, username: str) -> dict:
        """
        VULNERABLE: Username enumeration
        Attack: Determine which usernames exist
        """
        # DON'T DO THIS - Different messages reveal user existence
        user_exists = self._check_user_exists(username)

        if not user_exists:
            return {'error': 'Username does not exist'}  # Reveals no user
        else:
            return {'error': 'Incorrect password'}  # Reveals user exists
```

## Logging Without Leaking

Logs should contain enough information for debugging and security analysis, but must not contain sensitive data.

### Secure Logging Practices

```python
import logging
import hashlib
import json
from typing import Any, Dict

class SecureLogger:
    """Logging that doesn't leak sensitive information"""

    def __init__(self, name: str):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)

        # Production: log to file with rotation
        handler = logging.FileHandler('/var/log/app/application.log')
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)

    def log_user_action(self, user_id: int, action: str, details: dict = None):
        """
        Log user action without sensitive data
        """
        # Safe to log: user ID, action, timestamp
        log_entry = {
            'user_id': user_id,
            'action': action,
            'timestamp': datetime.utcnow().isoformat()
        }

        # Sanitize details before logging
        if details:
            log_entry['details'] = self._sanitize_log_data(details)

        self.logger.info(f"User action: {json.dumps(log_entry)}")

    def log_authentication_attempt(self, username: str, success: bool,
                                   ip_address: str):
        """
        Log authentication without passwords
        """
        # Hash username for privacy
        username_hash = hashlib.sha256(username.encode()).hexdigest()[:16]

        self.logger.info(
            f"Auth attempt - User hash: {username_hash}, "
            f"Success: {success}, IP: {ip_address}"
        )

    def log_payment(self, user_id: int, amount: float, card_last4: str):
        """
        Log payment without full card numbers
        """
        self.logger.info(
            f"Payment processed - User: {user_id}, "
            f"Amount: ${amount:.2f}, "
            f"Card ending: {card_last4}"
        )
        # NEVER log full card numbers or CVV

    def log_error_with_context(self, error: Exception, context: dict):
        """
        Log errors with context but without sensitive data
        """
        # Sanitize context
        safe_context = self._sanitize_log_data(context)

        self.logger.error(
            f"Error: {type(error).__name__} - {str(error)}, "
            f"Context: {json.dumps(safe_context)}"
        )

    def _sanitize_log_data(self, data: dict) -> dict:
        """
        Remove sensitive fields from log data
        """
        sensitive_fields = {
            'password', 'token', 'api_key', 'secret',
            'credit_card', 'ssn', 'cvv', 'pin'
        }

        sanitized = {}
        for key, value in data.items():
            # Remove sensitive fields
            if key.lower() in sensitive_fields:
                sanitized[key] = '[REDACTED]'
            # Truncate long values
            elif isinstance(value, str) and len(value) > 200:
                sanitized[key] = value[:200] + '...[truncated]'
            # Recursively sanitize nested dicts
            elif isinstance(value, dict):
                sanitized[key] = self._sanitize_log_data(value)
            else:
                sanitized[key] = value

        return sanitized


class AuditLogger:
    """Security audit logging for compliance"""

    def __init__(self):
        self.logger = logging.getLogger('audit')
        self.logger.setLevel(logging.INFO)

        # Audit logs may need special handling
        handler = logging.FileHandler('/var/log/app/audit.log')
        formatter = logging.Formatter(
            '%(asctime)s - AUDIT - %(message)s'
        )
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)

    def log_access_granted(self, user_id: int, resource: str, action: str):
        """Log successful authorization"""
        self.logger.info(
            f"ACCESS_GRANTED - User: {user_id}, "
            f"Resource: {resource}, Action: {action}"
        )

    def log_access_denied(self, user_id: int, resource: str, action: str):
        """Log failed authorization"""
        self.logger.warning(
            f"ACCESS_DENIED - User: {user_id}, "
            f"Resource: {resource}, Action: {action}"
        )

    def log_privilege_escalation(self, admin_id: int, target_user_id: int,
                                 new_role: str):
        """Log privilege changes"""
        self.logger.warning(
            f"PRIVILEGE_CHANGE - Admin: {admin_id}, "
            f"Target: {target_user_id}, New role: {new_role}"
        )

    def log_data_export(self, user_id: int, record_count: int,
                       data_type: str):
        """Log data exports for compliance"""
        self.logger.info(
            f"DATA_EXPORT - User: {user_id}, "
            f"Records: {record_count}, Type: {data_type}"
        )
```

## Exception Handling Patterns

### Safe Exception Handling

```python
from typing import Optional, Callable
from functools import wraps

class SecureExceptionHandler:
    """Patterns for secure exception handling"""

    def __init__(self, logger: SecureLogger):
        self.logger = logger

    def safe_execute(self, func: Callable, *args, **kwargs) -> tuple:
        """
        Execute function with secure error handling
        Returns: (success, result_or_error)
        """
        try:
            result = func(*args, **kwargs)
            return (True, result)

        except ValueError as e:
            # Validation errors can be shown to user
            self.logger.logger.info(f"Validation error: {str(e)}")
            return (False, str(e))

        except PermissionError as e:
            # Permission errors should be vague
            self.logger.logger.warning(f"Permission denied: {str(e)}")
            return (False, "Access denied")

        except Exception as e:
            # Unexpected errors: log details, return generic message
            error_id = self._log_unexpected_error(e)
            return (False, f"An error occurred (ID: {error_id})")

    def _log_unexpected_error(self, error: Exception) -> str:
        """Log unexpected error with full details"""
        import uuid
        error_id = str(uuid.uuid4())

        self.logger.logger.error(
            f"Unexpected error {error_id}: {type(error).__name__} - {str(error)}"
        )
        self.logger.logger.debug(f"Traceback for {error_id}:\n{traceback.format_exc()}")

        return error_id


def secure_endpoint(logger: SecureLogger):
    """Decorator for secure API endpoint error handling"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                result = func(*args, **kwargs)
                return {
                    'success': True,
                    'data': result
                }

            except ValueError as e:
                # Client error - safe to return
                logger.logger.info(f"Client error: {str(e)}")
                return {
                    'success': False,
                    'error': str(e)
                }, 400

            except PermissionError:
                # Don't reveal why access was denied
                logger.logger.warning(f"Unauthorized access attempt")
                return {
                    'success': False,
                    'error': 'Access denied'
                }, 403

            except Exception as e:
                # Server error - log but don't expose
                error_id = str(uuid.uuid4())
                logger.logger.error(
                    f"Server error {error_id}: {type(error).__name__}"
                )
                return {
                    'success': False,
                    'error': 'Internal server error',
                    'error_id': error_id
                }, 500

        return wrapper
    return decorator


# Usage example
@secure_endpoint(SecureLogger('api'))
def create_user(username: str, email: str, password: str):
    """API endpoint with secure error handling"""
    # Validation errors are returned to client
    if len(password) < 12:
        raise ValueError("Password must be at least 12 characters")

    # Business logic
    user_id = save_user_to_db(username, email, password)

    return {'user_id': user_id}
```

## Error Recovery

### Fail Securely

```python
class SecureDataAccess:
    """Data access with secure error recovery"""

    def __init__(self, db, cache, logger):
        self.db = db
        self.cache = cache
        self.logger = logger

    def get_user_profile(self, user_id: int) -> Optional[dict]:
        """
        Get user profile with fallback handling
        """
        try:
            # Try cache first
            cached = self.cache.get(f"user:{user_id}")
            if cached:
                return cached

        except Exception as e:
            # Cache failure: log and continue to database
            self.logger.logger.warning(f"Cache error: {type(e).__name__}")
            # Don't fail entire operation due to cache

        try:
            # Fetch from database
            user = self.db.get_user(user_id)

            if user:
                # Try to update cache (best effort)
                try:
                    self.cache.set(f"user:{user_id}", user)
                except Exception:
                    # Cache update failed, but we have the data
                    pass

            return user

        except Exception as e:
            # Database error: log and return None
            self.logger.logger.error(f"Database error: {type(e).__name__}")
            return None

    def update_user_safely(self, user_id: int, updates: dict) -> bool:
        """
        Update user with transaction rollback on error
        """
        try:
            # Start transaction
            self.db.begin_transaction()

            # Validate updates
            validated = self._validate_updates(updates)

            # Apply updates
            self.db.update_user(user_id, validated)

            # Commit transaction
            self.db.commit()

            # Invalidate cache
            try:
                self.cache.delete(f"user:{user_id}")
            except Exception:
                # Cache invalidation failed, but update succeeded
                self.logger.logger.warning("Cache invalidation failed")

            return True

        except Exception as e:
            # Rollback on any error
            try:
                self.db.rollback()
            except Exception as rollback_error:
                self.logger.logger.error(
                    f"Rollback failed: {type(rollback_error).__name__}"
                )

            # Log original error
            self.logger.logger.error(
                f"Update failed: {type(e).__name__}"
            )

            return False
```

## Rate Limiting for Error Responses

### Prevent Information Leakage via Timing

```python
import time
from collections import defaultdict
from datetime import datetime, timedelta

class RateLimitedErrorHandler:
    """Rate limit error responses to prevent enumeration"""

    def __init__(self):
        self.attempts = defaultdict(list)
        self.lockout_duration = timedelta(minutes=15)
        self.max_attempts = 5

    def handle_login_error(self, username: str, ip_address: str) -> dict:
        """
        Handle login error with rate limiting
        Prevents username enumeration via timing attacks
        """
        # Track failed attempts
        key = f"{username}:{ip_address}"
        now = datetime.utcnow()

        # Clean old attempts
        self.attempts[key] = [
            timestamp for timestamp in self.attempts[key]
            if now - timestamp < self.lockout_duration
        ]

        # Check if locked out
        if len(self.attempts[key]) >= self.max_attempts:
            # Add artificial delay (prevent timing attacks)
            time.sleep(1)

            return {
                'success': False,
                'message': 'Too many failed attempts. Try again later.',
                'locked_until': (
                    self.attempts[key][0] + self.lockout_duration
                ).isoformat()
            }

        # Record this attempt
        self.attempts[key].append(now)

        # Add consistent delay (prevent timing attacks)
        # Same delay whether username exists or not
        time.sleep(1)

        # Generic error message
        return {
            'success': False,
            'message': 'Invalid username or password'
        }

    def is_rate_limited(self, identifier: str) -> bool:
        """Check if identifier is rate limited"""
        now = datetime.utcnow()

        # Clean old attempts
        self.attempts[identifier] = [
            timestamp for timestamp in self.attempts[identifier]
            if now - timestamp < self.lockout_duration
        ]

        return len(self.attempts[identifier]) >= self.max_attempts
```

## Monitoring and Alerting

### Security Event Detection

```python
class SecurityMonitor:
    """Monitor for security-relevant errors"""

    def __init__(self, logger: AuditLogger):
        self.logger = logger
        self.alert_thresholds = {
            'failed_auth': 10,  # 10 failures in window
            'permission_denied': 20,
            'sql_error': 5
        }

    def track_error(self, error_type: str, details: dict):
        """
        Track errors and alert on suspicious patterns
        """
        # Log the error
        self.logger.logger.warning(
            f"Security event - Type: {error_type}, Details: {json.dumps(details)}"
        )

        # Check for alert conditions
        if self._should_alert(error_type):
            self._send_alert(error_type, details)

    def _should_alert(self, error_type: str) -> bool:
        """Determine if pattern requires alerting"""
        # Implementation would check recent error counts
        # This is simplified for example
        return False

    def _send_alert(self, error_type: str, details: dict):
        """Send security alert"""
        self.logger.logger.critical(
            f"SECURITY ALERT - Type: {error_type}, Details: {json.dumps(details)}"
        )
        # In production: send to SIEM, email security team, etc.
```

## Summary

Secure error handling balances usability with security:

- **Generic User Messages**: Return minimal information to users, prevent enumeration
- **Detailed Internal Logs**: Log full details internally for debugging and security analysis
- **Sanitize Log Data**: Never log passwords, tokens, or full credit card numbers
- **Error Correlation IDs**: Link user-facing errors to internal logs for support
- **Consistent Timing**: Prevent information leakage via timing differences
- **Fail Securely**: On error, deny access rather than granting it
- **Security Monitoring**: Track error patterns to detect attacks

Error handling is not just about preventing crashes - it's a critical security control that prevents information leakage and enables effective security monitoring.
