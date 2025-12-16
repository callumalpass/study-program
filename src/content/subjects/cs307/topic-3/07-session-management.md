# Session Management

## Introduction to Session Management

Session management is the process of securely handling user sessions throughout their lifecycle—from creation after authentication to termination at logout or timeout. Proper session management is crucial because sessions represent authenticated state, and vulnerabilities in session handling can lead to account takeover, unauthorized access, and session hijacking attacks.

A session allows the server to maintain state about a user across multiple HTTP requests, which are inherently stateless. Without sessions, users would need to authenticate on every single request.

## Session Lifecycle

A typical session follows this lifecycle:

1. **Creation**: After successful authentication, server creates a unique session
2. **Token Generation**: Server generates unpredictable session identifier
3. **Storage**: Session data stored server-side, ID sent to client
4. **Validation**: Server validates session ID on each request
5. **Renewal**: Session ID regenerated at privilege changes
6. **Termination**: Session destroyed on logout or timeout

## Session Token Generation

Session tokens must be cryptographically random and unpredictable. Using sequential or predictable session IDs allows attackers to guess valid sessions.

```python
import secrets
import hashlib
import hmac
from dataclasses import dataclass, field
from typing import Dict, Optional, Any
from datetime import datetime, timedelta

@dataclass
class Session:
    """Represents a user session"""
    session_id: str
    user_id: str
    created_at: datetime
    last_accessed: datetime
    expires_at: datetime
    data: Dict[str, Any] = field(default_factory=dict)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    is_active: bool = True

class SessionManager:
    """
    Secure session management system
    Implements security best practices
    """

    def __init__(
        self,
        session_timeout: int = 3600,  # 1 hour
        absolute_timeout: int = 28800,  # 8 hours
        secret_key: str = None
    ):
        self.sessions: Dict[str, Session] = {}
        self.session_timeout = session_timeout
        self.absolute_timeout = absolute_timeout

        if secret_key is None:
            secret_key = secrets.token_hex(32)
        self.secret_key = secret_key.encode('utf-8')

    def generate_session_id(self) -> str:
        """
        Generate cryptographically secure session ID
        Uses 256 bits of entropy
        """
        # Generate random bytes
        random_bytes = secrets.token_bytes(32)

        # Hash with secret key for additional security
        session_id = hmac.new(
            self.secret_key,
            random_bytes,
            hashlib.sha256
        ).hexdigest()

        return session_id

    def create_session(
        self,
        user_id: str,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None
    ) -> str:
        """
        Create new session after successful authentication
        Returns session ID
        """
        session_id = self.generate_session_id()

        # Ensure uniqueness (extremely unlikely to collide with good RNG)
        while session_id in self.sessions:
            session_id = self.generate_session_id()

        now = datetime.now()

        session = Session(
            session_id=session_id,
            user_id=user_id,
            created_at=now,
            last_accessed=now,
            expires_at=now + timedelta(seconds=self.absolute_timeout),
            ip_address=ip_address,
            user_agent=user_agent
        )

        self.sessions[session_id] = session
        return session_id

    def validate_session(
        self,
        session_id: str,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None
    ) -> Optional[Session]:
        """
        Validate session and return session object if valid
        Checks expiration, activity timeout, and binding
        """
        if session_id not in self.sessions:
            return None

        session = self.sessions[session_id]

        # Check if session is active
        if not session.is_active:
            return None

        now = datetime.now()

        # Check absolute timeout
        if now > session.expires_at:
            self.destroy_session(session_id)
            return None

        # Check inactivity timeout
        time_since_last_access = (now - session.last_accessed).total_seconds()
        if time_since_last_access > self.session_timeout:
            self.destroy_session(session_id)
            return None

        # Check IP address binding (optional but recommended)
        if ip_address and session.ip_address:
            if ip_address != session.ip_address:
                # Possible session hijacking
                self.destroy_session(session_id)
                return None

        # Check user agent binding
        if user_agent and session.user_agent:
            if user_agent != session.user_agent:
                # Possible session hijacking
                self.destroy_session(session_id)
                return None

        # Update last accessed time
        session.last_accessed = now

        return session

    def regenerate_session_id(
        self,
        old_session_id: str
    ) -> Optional[str]:
        """
        Regenerate session ID after privilege escalation
        Prevents session fixation attacks
        """
        if old_session_id not in self.sessions:
            return None

        old_session = self.sessions[old_session_id]

        # Generate new session ID
        new_session_id = self.generate_session_id()

        # Copy session data with new ID
        new_session = Session(
            session_id=new_session_id,
            user_id=old_session.user_id,
            created_at=old_session.created_at,
            last_accessed=datetime.now(),
            expires_at=old_session.expires_at,
            data=old_session.data.copy(),
            ip_address=old_session.ip_address,
            user_agent=old_session.user_agent,
            is_active=True
        )

        # Store new session
        self.sessions[new_session_id] = new_session

        # Remove old session
        del self.sessions[old_session_id]

        return new_session_id

    def destroy_session(self, session_id: str) -> bool:
        """Destroy session (logout)"""
        if session_id in self.sessions:
            del self.sessions[session_id]
            return True
        return False

    def get_session_data(self, session_id: str, key: str) -> Optional[Any]:
        """Get data from session"""
        session = self.validate_session(session_id)
        if session:
            return session.data.get(key)
        return None

    def set_session_data(
        self,
        session_id: str,
        key: str,
        value: Any
    ) -> bool:
        """Store data in session"""
        session = self.validate_session(session_id)
        if session:
            session.data[key] = value
            return True
        return False

    def cleanup_expired_sessions(self):
        """Remove expired and inactive sessions"""
        now = datetime.now()
        expired = []

        for session_id, session in self.sessions.items():
            # Check absolute timeout
            if now > session.expires_at:
                expired.append(session_id)
                continue

            # Check inactivity timeout
            time_since_last_access = (now - session.last_accessed).total_seconds()
            if time_since_last_access > self.session_timeout:
                expired.append(session_id)

        for session_id in expired:
            del self.sessions[session_id]

        return len(expired)

    def get_active_sessions(self, user_id: str) -> list[Session]:
        """Get all active sessions for a user"""
        return [
            session for session in self.sessions.values()
            if session.user_id == user_id and session.is_active
        ]

    def revoke_all_user_sessions(self, user_id: str) -> int:
        """Revoke all sessions for a user (e.g., password change)"""
        user_sessions = [
            sid for sid, session in self.sessions.items()
            if session.user_id == user_id
        ]

        for session_id in user_sessions:
            del self.sessions[session_id]

        return len(user_sessions)

# Example usage
if __name__ == "__main__":
    manager = SessionManager(
        session_timeout=1800,  # 30 minutes
        absolute_timeout=28800  # 8 hours
    )

    # Create session
    session_id = manager.create_session(
        user_id="user123",
        ip_address="192.168.1.100",
        user_agent="Mozilla/5.0..."
    )
    print(f"Created session: {session_id}")

    # Store data in session
    manager.set_session_data(session_id, "theme", "dark")
    manager.set_session_data(session_id, "language", "en")

    # Validate and retrieve session
    session = manager.validate_session(
        session_id,
        ip_address="192.168.1.100",
        user_agent="Mozilla/5.0..."
    )
    if session:
        print(f"Valid session for user: {session.user_id}")
        theme = manager.get_session_data(session_id, "theme")
        print(f"User theme: {theme}")

    # Regenerate session ID (after login)
    new_session_id = manager.regenerate_session_id(session_id)
    print(f"Regenerated session: {new_session_id}")

    # Destroy session (logout)
    manager.destroy_session(new_session_id)
    print("Session destroyed")
```

## Cookie-Based Session Management

Cookies are the most common mechanism for transmitting session IDs between client and server. Proper cookie configuration is essential for security.

```python
from http.cookies import SimpleCookie
from typing import Optional

class SecureCookieManager:
    """
    Secure cookie-based session management
    Implements cookie security best practices
    """

    def __init__(
        self,
        cookie_name: str = "session_id",
        domain: Optional[str] = None,
        secure: bool = True,
        httponly: bool = True,
        samesite: str = "Strict"
    ):
        self.cookie_name = cookie_name
        self.domain = domain
        self.secure = secure  # Only send over HTTPS
        self.httponly = httponly  # Prevent JavaScript access
        self.samesite = samesite  # CSRF protection

    def create_session_cookie(
        self,
        session_id: str,
        max_age: int = 3600,
        path: str = "/"
    ) -> str:
        """
        Create secure session cookie
        Returns Set-Cookie header value
        """
        cookie = SimpleCookie()
        cookie[self.cookie_name] = session_id

        # Set security attributes
        cookie[self.cookie_name]["path"] = path
        cookie[self.cookie_name]["max-age"] = max_age
        cookie[self.cookie_name]["httponly"] = self.httponly
        cookie[self.cookie_name]["secure"] = self.secure
        cookie[self.cookie_name]["samesite"] = self.samesite

        if self.domain:
            cookie[self.cookie_name]["domain"] = self.domain

        return cookie[self.cookie_name].OutputString()

    def create_delete_cookie(self) -> str:
        """Create cookie that deletes session"""
        cookie = SimpleCookie()
        cookie[self.cookie_name] = ""
        cookie[self.cookie_name]["path"] = "/"
        cookie[self.cookie_name]["max-age"] = 0
        cookie[self.cookie_name]["httponly"] = self.httponly
        cookie[self.cookie_name]["secure"] = self.secure

        return cookie[self.cookie_name].OutputString()

    def parse_session_cookie(self, cookie_header: str) -> Optional[str]:
        """Extract session ID from Cookie header"""
        cookie = SimpleCookie()
        cookie.load(cookie_header)

        if self.cookie_name in cookie:
            return cookie[self.cookie_name].value

        return None

# Example usage
if __name__ == "__main__":
    cookie_mgr = SecureCookieManager(
        cookie_name="session_id",
        secure=True,
        httponly=True,
        samesite="Strict"
    )

    # Create session cookie
    session_id = secrets.token_hex(32)
    set_cookie_header = cookie_mgr.create_session_cookie(
        session_id,
        max_age=3600
    )
    print(f"Set-Cookie: {set_cookie_header}")

    # Parse cookie from request
    cookie_header = f"session_id={session_id}; other_cookie=value"
    parsed_session_id = cookie_mgr.parse_session_cookie(cookie_header)
    print(f"\nParsed session ID: {parsed_session_id}")

    # Delete cookie
    delete_header = cookie_mgr.create_delete_cookie()
    print(f"\nDelete cookie: {delete_header}")
```

## Signed Session Tokens

For added security, session tokens can be signed to prevent tampering. This is useful for client-side session storage (JWT-like approach).

```python
import json
import base64
from typing import Dict, Any, Optional

class SignedSessionToken:
    """
    Signed session token for tamper-proof client-side storage
    Similar to JWT but simplified
    """

    def __init__(self, secret_key: str):
        self.secret_key = secret_key.encode('utf-8')

    def create_token(
        self,
        user_id: str,
        data: Dict[str, Any],
        expires_in: int = 3600
    ) -> str:
        """
        Create signed session token
        """
        payload = {
            'user_id': user_id,
            'data': data,
            'iat': datetime.now().timestamp(),
            'exp': (datetime.now() + timedelta(seconds=expires_in)).timestamp()
        }

        # Encode payload
        payload_json = json.dumps(payload, sort_keys=True)
        payload_b64 = base64.urlsafe_b64encode(
            payload_json.encode('utf-8')
        ).decode('utf-8').rstrip('=')

        # Create signature
        signature = hmac.new(
            self.secret_key,
            payload_b64.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()

        # Combine payload and signature
        return f"{payload_b64}.{signature}"

    def verify_token(self, token: str) -> Optional[Dict[str, Any]]:
        """
        Verify and decode signed token
        Returns payload if valid, None if invalid
        """
        try:
            payload_b64, signature = token.split('.')
        except ValueError:
            return None

        # Verify signature
        expected_signature = hmac.new(
            self.secret_key,
            payload_b64.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()

        if not hmac.compare_digest(signature, expected_signature):
            return None

        # Decode payload
        padding = 4 - (len(payload_b64) % 4)
        payload_b64 += '=' * padding

        try:
            payload_json = base64.urlsafe_b64decode(payload_b64)
            payload = json.loads(payload_json)
        except Exception:
            return None

        # Check expiration
        if datetime.now().timestamp() > payload.get('exp', 0):
            return None

        return payload

# Example usage
if __name__ == "__main__":
    token_mgr = SignedSessionToken(secret_key="your-secret-key-32-chars-min")

    # Create token
    token = token_mgr.create_token(
        user_id="user123",
        data={
            'role': 'admin',
            'department': 'engineering'
        },
        expires_in=3600
    )
    print(f"Token: {token}")

    # Verify token
    payload = token_mgr.verify_token(token)
    if payload:
        print(f"\nValid token for user: {payload['user_id']}")
        print(f"User data: {payload['data']}")
    else:
        print("\nInvalid token")
```

## Session Security Best Practices

### 1. Session Fixation Prevention

Regenerate session ID after login and privilege changes:

```python
def login(username: str, password: str, session_manager: SessionManager):
    """Secure login with session fixation prevention"""
    # Authenticate user
    if not authenticate(username, password):
        return None

    # Create new session (don't reuse any existing session)
    session_id = session_manager.create_session(
        user_id=username,
        ip_address=get_client_ip(),
        user_agent=get_user_agent()
    )

    return session_id

def elevate_privileges(session_id: str, session_manager: SessionManager):
    """Regenerate session when privileges change"""
    session = session_manager.validate_session(session_id)
    if not session:
        return None

    # Perform privilege escalation...

    # Regenerate session ID to prevent fixation
    new_session_id = session_manager.regenerate_session_id(session_id)

    return new_session_id
```

### 2. Session Hijacking Prevention

Implement IP and user agent binding:

```python
class SessionBindingValidator:
    """Validates session binding to prevent hijacking"""

    @staticmethod
    def validate_binding(
        session: Session,
        current_ip: str,
        current_user_agent: str,
        strict_ip: bool = False
    ) -> bool:
        """
        Validate session binding
        strict_ip: Whether to strictly check full IP or just network
        """
        # Check user agent
        if session.user_agent and session.user_agent != current_user_agent:
            return False

        # Check IP address
        if session.ip_address:
            if strict_ip:
                # Strict: exact IP match
                if session.ip_address != current_ip:
                    return False
            else:
                # Lenient: same /24 network (for mobile users)
                session_network = '.'.join(session.ip_address.split('.')[:3])
                current_network = '.'.join(current_ip.split('.')[:3])
                if session_network != current_network:
                    return False

        return True
```

### 3. Concurrent Session Control

Limit number of concurrent sessions per user:

```python
class ConcurrentSessionController:
    """Control concurrent sessions per user"""

    def __init__(self, max_sessions: int = 3):
        self.max_sessions = max_sessions

    def enforce_session_limit(
        self,
        user_id: str,
        session_manager: SessionManager,
        new_session_id: str
    ):
        """
        Enforce maximum concurrent sessions
        Destroys oldest sessions if limit exceeded
        """
        active_sessions = session_manager.get_active_sessions(user_id)

        if len(active_sessions) > self.max_sessions:
            # Sort by last accessed time
            sorted_sessions = sorted(
                active_sessions,
                key=lambda s: s.last_accessed
            )

            # Remove oldest sessions
            sessions_to_remove = len(active_sessions) - self.max_sessions
            for i in range(sessions_to_remove):
                session_manager.destroy_session(sorted_sessions[i].session_id)
```

### 4. Session Activity Logging

Log session events for security monitoring:

```python
from enum import Enum

class SessionEvent(Enum):
    CREATED = "created"
    VALIDATED = "validated"
    REGENERATED = "regenerated"
    DESTROYED = "destroyed"
    EXPIRED = "expired"
    HIJACK_DETECTED = "hijack_detected"

@dataclass
class SessionLog:
    """Session event log entry"""
    timestamp: datetime
    session_id: str
    user_id: str
    event: SessionEvent
    ip_address: Optional[str] = None
    details: Dict[str, Any] = field(default_factory=dict)

class SessionLogger:
    """Log session events for security monitoring"""

    def __init__(self):
        self.logs: list[SessionLog] = []

    def log_event(
        self,
        session_id: str,
        user_id: str,
        event: SessionEvent,
        ip_address: Optional[str] = None,
        details: Dict[str, Any] = None
    ):
        """Log session event"""
        log_entry = SessionLog(
            timestamp=datetime.now(),
            session_id=session_id,
            user_id=user_id,
            event=event,
            ip_address=ip_address,
            details=details or {}
        )
        self.logs.append(log_entry)

    def get_user_activity(self, user_id: str) -> list[SessionLog]:
        """Get session activity for user"""
        return [log for log in self.logs if log.user_id == user_id]

    def detect_anomalies(self, user_id: str) -> list[SessionLog]:
        """Detect suspicious session activity"""
        anomalies = []
        user_logs = self.get_user_activity(user_id)

        # Detect multiple sessions from different IPs
        recent_ips = set()
        for log in user_logs[-10:]:  # Last 10 events
            if log.ip_address:
                recent_ips.add(log.ip_address)

        if len(recent_ips) > 3:
            anomalies.append(user_logs[-1])

        return anomalies
```

## Conclusion

Secure session management is critical for maintaining authenticated state while protecting against session-based attacks. Key principles include generating cryptographically random session IDs, implementing proper timeouts, regenerating session IDs at privilege changes, using secure cookie attributes, binding sessions to client characteristics, and logging session events for security monitoring. By following these best practices and implementing defense-in-depth measures, applications can provide secure session handling that protects user accounts from compromise.
