# Access Control Models

## Introduction to Access Control

Access control is the process of determining whether a subject (user, process, or system) should be granted access to an object (file, resource, or service). While authentication answers "who are you?", access control answers "what are you allowed to do?"

Access control serves three primary security goals:
- **Confidentiality**: Preventing unauthorized information disclosure
- **Integrity**: Preventing unauthorized modification of information
- **Availability**: Ensuring authorized users can access resources when needed

## Foundational Access Control Models

There are three foundational models that form the basis of modern access control systems:

### Discretionary Access Control (DAC)

DAC is based on the identity of users and groups. The owner of a resource has discretion over who can access it. This is the model used by most operating systems (Unix file permissions, Windows ACLs).

**Characteristics**:
- Resource owners control access
- Access rights can be transferred
- Flexible and easy to implement
- Vulnerable to Trojan horses

```python
from dataclasses import dataclass, field
from typing import Set, Dict, Optional
from enum import Enum, Flag

class Permission(Flag):
    """File system permissions"""
    NONE = 0
    READ = 1
    WRITE = 2
    EXECUTE = 4
    DELETE = 8

    def __str__(self):
        parts = []
        if self & Permission.READ:
            parts.append('r')
        if self & Permission.WRITE:
            parts.append('w')
        if self & Permission.EXECUTE:
            parts.append('x')
        if self & Permission.DELETE:
            parts.append('d')
        return ''.join(parts) if parts else '-'

@dataclass
class Resource:
    """Represents a protected resource in DAC system"""
    name: str
    owner: str
    group: str
    owner_permissions: Permission = Permission.READ | Permission.WRITE
    group_permissions: Permission = Permission.READ
    other_permissions: Permission = Permission.NONE
    acl: Dict[str, Permission] = field(default_factory=dict)

@dataclass
class User:
    """Represents a user in the system"""
    username: str
    groups: Set[str] = field(default_factory=set)

class DACSystem:
    """
    Discretionary Access Control implementation
    Similar to Unix file permissions with ACLs
    """

    def __init__(self):
        self.resources: Dict[str, Resource] = {}
        self.users: Dict[str, User] = {}

    def create_user(self, username: str, groups: Set[str] = None) -> User:
        """Create a new user"""
        if groups is None:
            groups = set()

        user = User(username=username, groups=groups)
        self.users[username] = user
        return user

    def create_resource(
        self,
        name: str,
        owner: str,
        group: str,
        owner_perms: Permission = Permission.READ | Permission.WRITE,
        group_perms: Permission = Permission.READ,
        other_perms: Permission = Permission.NONE
    ) -> Resource:
        """Create a new resource"""
        if owner not in self.users:
            raise ValueError(f"User {owner} does not exist")

        resource = Resource(
            name=name,
            owner=owner,
            group=group,
            owner_permissions=owner_perms,
            group_permissions=group_perms,
            other_permissions=other_perms
        )

        self.resources[name] = resource
        return resource

    def check_access(
        self,
        username: str,
        resource_name: str,
        required_permission: Permission
    ) -> bool:
        """Check if user has required permission on resource"""
        if username not in self.users:
            return False

        if resource_name not in self.resources:
            return False

        user = self.users[username]
        resource = self.resources[resource_name]

        # Check ACL first (most specific)
        if username in resource.acl:
            granted_perms = resource.acl[username]
            return bool(granted_perms & required_permission)

        # Check if user is owner
        if user.username == resource.owner:
            return bool(resource.owner_permissions & required_permission)

        # Check if user is in resource's group
        if resource.group in user.groups:
            return bool(resource.group_permissions & required_permission)

        # Check other permissions
        return bool(resource.other_permissions & required_permission)

    def chmod(
        self,
        username: str,
        resource_name: str,
        owner_perms: Permission = None,
        group_perms: Permission = None,
        other_perms: Permission = None
    ):
        """Change resource permissions (owner only)"""
        if resource_name not in self.resources:
            raise ValueError(f"Resource {resource_name} does not exist")

        resource = self.resources[resource_name]

        # Only owner can change permissions
        if username != resource.owner:
            raise PermissionError("Only owner can change permissions")

        if owner_perms is not None:
            resource.owner_permissions = owner_perms
        if group_perms is not None:
            resource.group_permissions = group_perms
        if other_perms is not None:
            resource.other_permissions = other_perms

    def set_acl(
        self,
        owner: str,
        resource_name: str,
        username: str,
        permissions: Permission
    ):
        """Set ACL entry for specific user (owner only)"""
        if resource_name not in self.resources:
            raise ValueError(f"Resource {resource_name} does not exist")

        resource = self.resources[resource_name]

        if owner != resource.owner:
            raise PermissionError("Only owner can modify ACL")

        resource.acl[username] = permissions

# Example usage
if __name__ == "__main__":
    dac = DACSystem()

    # Create users
    alice = dac.create_user("alice", {"developers"})
    bob = dac.create_user("bob", {"developers"})
    charlie = dac.create_user("charlie", {"managers"})

    # Create resource
    doc = dac.create_resource(
        name="document.txt",
        owner="alice",
        group="developers",
        owner_perms=Permission.READ | Permission.WRITE | Permission.DELETE,
        group_perms=Permission.READ | Permission.WRITE,
        other_perms=Permission.READ
    )

    # Check access
    print(f"Alice can read: {dac.check_access('alice', 'document.txt', Permission.READ)}")
    print(f"Alice can write: {dac.check_access('alice', 'document.txt', Permission.WRITE)}")
    print(f"Bob can write: {dac.check_access('bob', 'document.txt', Permission.WRITE)}")
    print(f"Charlie can write: {dac.check_access('charlie', 'document.txt', Permission.WRITE)}")
    print(f"Charlie can read: {dac.check_access('charlie', 'document.txt', Permission.READ)}")

    # Set ACL to grant Charlie write access
    dac.set_acl("alice", "document.txt", "charlie", Permission.READ | Permission.WRITE)
    print(f"\nAfter ACL: Charlie can write: {dac.check_access('charlie', 'document.txt', Permission.WRITE)}")
```

### Mandatory Access Control (MAC)

MAC uses security labels to enforce access control policies. The system enforces policies that users cannot override. This model is used in high-security environments like military and government systems.

**Characteristics**:
- System enforces policy, not users
- Based on security labels and clearances
- Prevents information leakage
- Complex to implement and manage

The most common MAC model is the Bell-LaPadula model:
- **No Read Up**: Subject cannot read objects at higher security levels
- **No Write Down**: Subject cannot write to objects at lower security levels

```python
from enum import IntEnum
from typing import Set, Dict

class SecurityLevel(IntEnum):
    """Security clearance levels"""
    UNCLASSIFIED = 0
    CONFIDENTIAL = 1
    SECRET = 2
    TOP_SECRET = 3

@dataclass
class MACSubject:
    """Subject (user/process) with security clearance"""
    name: str
    clearance: SecurityLevel
    categories: Set[str] = field(default_factory=set)

@dataclass
class MACObject:
    """Object (resource) with security classification"""
    name: str
    classification: SecurityLevel
    categories: Set[str] = field(default_factory=set)
    owner: str = ""

class MACSystem:
    """
    Mandatory Access Control system
    Implements Bell-LaPadula model
    """

    def __init__(self):
        self.subjects: Dict[str, MACSubject] = {}
        self.objects: Dict[str, MACObject] = {}

    def create_subject(
        self,
        name: str,
        clearance: SecurityLevel,
        categories: Set[str] = None
    ) -> MACSubject:
        """Create subject with security clearance"""
        if categories is None:
            categories = set()

        subject = MACSubject(
            name=name,
            clearance=clearance,
            categories=categories
        )
        self.subjects[name] = subject
        return subject

    def create_object(
        self,
        name: str,
        classification: SecurityLevel,
        categories: Set[str] = None,
        owner: str = ""
    ) -> MACObject:
        """Create object with security classification"""
        if categories is None:
            categories = set()

        obj = MACObject(
            name=name,
            classification=classification,
            categories=categories,
            owner=owner
        )
        self.objects[name] = obj
        return obj

    def can_read(self, subject_name: str, object_name: str) -> bool:
        """
        Check if subject can read object
        Bell-LaPadula: No Read Up (simple security property)
        Subject clearance must dominate object classification
        """
        if subject_name not in self.subjects or object_name not in self.objects:
            return False

        subject = self.subjects[subject_name]
        obj = self.objects[object_name]

        # Check level: subject clearance >= object classification
        if subject.clearance < obj.classification:
            return False

        # Check categories: subject categories must include all object categories
        if not obj.categories.issubset(subject.categories):
            return False

        return True

    def can_write(self, subject_name: str, object_name: str) -> bool:
        """
        Check if subject can write to object
        Bell-LaPadula: No Write Down (*-property)
        Subject clearance must not dominate object classification
        """
        if subject_name not in self.subjects or object_name not in self.objects:
            return False

        subject = self.subjects[subject_name]
        obj = self.objects[object_name]

        # Check level: subject clearance <= object classification
        # (Can write to same or higher classification)
        if subject.clearance > obj.classification:
            return False

        # Check categories: object categories must include all subject categories
        if not subject.categories.issubset(obj.categories):
            return False

        return True

    def get_max_read_level(self, subject_name: str) -> SecurityLevel:
        """Get maximum classification level subject can read"""
        if subject_name not in self.subjects:
            return SecurityLevel.UNCLASSIFIED

        return self.subjects[subject_name].clearance

    def get_min_write_level(self, subject_name: str) -> SecurityLevel:
        """Get minimum classification level subject can write to"""
        if subject_name not in self.subjects:
            return SecurityLevel.TOP_SECRET

        return self.subjects[subject_name].clearance

# Example usage
if __name__ == "__main__":
    mac = MACSystem()

    # Create subjects with different clearances
    analyst = mac.create_subject(
        "analyst1",
        SecurityLevel.SECRET,
        {"NATO", "INTEL"}
    )

    officer = mac.create_subject(
        "officer1",
        SecurityLevel.TOP_SECRET,
        {"NATO", "INTEL", "CRYPTO"}
    )

    contractor = mac.create_subject(
        "contractor1",
        SecurityLevel.CONFIDENTIAL,
        {"NATO"}
    )

    # Create objects with different classifications
    unclass_doc = mac.create_object(
        "public_report.pdf",
        SecurityLevel.UNCLASSIFIED,
        set()
    )

    secret_doc = mac.create_object(
        "ops_plan.pdf",
        SecurityLevel.SECRET,
        {"NATO", "INTEL"}
    )

    top_secret_doc = mac.create_object(
        "crypto_keys.dat",
        SecurityLevel.TOP_SECRET,
        {"CRYPTO"}
    )

    # Test read access (No Read Up)
    print("=== Read Access (No Read Up) ===")
    print(f"Contractor can read unclassified: {mac.can_read('contractor1', 'public_report.pdf')}")
    print(f"Contractor can read secret: {mac.can_read('contractor1', 'ops_plan.pdf')}")
    print(f"Analyst can read secret: {mac.can_read('analyst1', 'ops_plan.pdf')}")
    print(f"Analyst can read top secret: {mac.can_read('analyst1', 'crypto_keys.dat')}")
    print(f"Officer can read top secret: {mac.can_read('officer1', 'crypto_keys.dat')}")

    # Test write access (No Write Down)
    print("\n=== Write Access (No Write Down) ===")
    print(f"Officer can write to unclassified: {mac.can_write('officer1', 'public_report.pdf')}")
    print(f"Officer can write to top secret: {mac.can_write('officer1', 'crypto_keys.dat')}")
    print(f"Contractor can write to secret: {mac.can_write('contractor1', 'ops_plan.pdf')}")
```

### Capability-Based Access Control

Capability-based systems use unforgeable tokens (capabilities) that grant specific rights to specific objects. Possession of a capability is both necessary and sufficient for access.

**Characteristics**:
- Capabilities are unforgeable references
- No need for separate authentication on each access
- Easy to delegate and revoke
- Used in modern systems (file descriptors, handles)

```python
import secrets
import hmac
import hashlib
from typing import Optional, Set
from datetime import datetime, timedelta

@dataclass
class Capability:
    """
    Unforgeable capability token
    Grants specific permissions on specific resource
    """
    capability_id: str
    resource_id: str
    permissions: Set[str]
    owner: str
    created_at: datetime
    expires_at: Optional[datetime] = None
    signature: str = ""

class CapabilitySystem:
    """
    Capability-based access control system
    Capabilities are cryptographically signed tokens
    """

    def __init__(self, signing_key: str):
        self.signing_key = signing_key.encode('utf-8')
        self.capabilities: Dict[str, Capability] = {}
        self.resources: Dict[str, Dict] = {}

    def create_resource(self, resource_id: str, data: Dict) -> bool:
        """Create a new resource"""
        if resource_id in self.resources:
            return False

        self.resources[resource_id] = data
        return True

    def create_capability(
        self,
        resource_id: str,
        permissions: Set[str],
        owner: str,
        expires_in_hours: Optional[int] = None
    ) -> Capability:
        """
        Create a new capability for resource
        Returns signed, unforgeable capability
        """
        if resource_id not in self.resources:
            raise ValueError(f"Resource {resource_id} does not exist")

        # Generate unique capability ID
        capability_id = secrets.token_urlsafe(32)

        created_at = datetime.now()
        expires_at = None
        if expires_in_hours:
            expires_at = created_at + timedelta(hours=expires_in_hours)

        # Create capability
        capability = Capability(
            capability_id=capability_id,
            resource_id=resource_id,
            permissions=permissions,
            owner=owner,
            created_at=created_at,
            expires_at=expires_at
        )

        # Sign capability
        capability.signature = self._sign_capability(capability)

        # Store capability
        self.capabilities[capability_id] = capability

        return capability

    def verify_capability(
        self,
        capability_id: str,
        required_permission: str
    ) -> bool:
        """
        Verify capability is valid and grants required permission
        """
        if capability_id not in self.capabilities:
            return False

        capability = self.capabilities[capability_id]

        # Verify signature
        expected_signature = self._sign_capability(capability)
        if not hmac.compare_digest(capability.signature, expected_signature):
            return False

        # Check expiration
        if capability.expires_at and datetime.now() > capability.expires_at:
            return False

        # Check permission
        if required_permission not in capability.permissions:
            return False

        return True

    def access_resource(
        self,
        capability_id: str,
        operation: str
    ) -> Optional[Dict]:
        """
        Access resource using capability
        Returns resource data if capability is valid
        """
        if not self.verify_capability(capability_id, operation):
            return None

        capability = self.capabilities[capability_id]
        return self.resources.get(capability.resource_id)

    def delegate_capability(
        self,
        original_capability_id: str,
        new_owner: str,
        restricted_permissions: Optional[Set[str]] = None,
        expires_in_hours: Optional[int] = 24
    ) -> Optional[Capability]:
        """
        Create delegated capability with equal or lesser permissions
        """
        if original_capability_id not in self.capabilities:
            return None

        original = self.capabilities[original_capability_id]

        # Determine permissions for delegated capability
        if restricted_permissions:
            # Can only delegate subset of original permissions
            if not restricted_permissions.issubset(original.permissions):
                return None
            permissions = restricted_permissions
        else:
            permissions = original.permissions.copy()

        # Create new capability
        return self.create_capability(
            resource_id=original.resource_id,
            permissions=permissions,
            owner=new_owner,
            expires_in_hours=expires_in_hours
        )

    def revoke_capability(self, capability_id: str) -> bool:
        """Revoke a capability"""
        if capability_id not in self.capabilities:
            return False

        del self.capabilities[capability_id]
        return True

    def _sign_capability(self, capability: Capability) -> str:
        """Create HMAC signature for capability"""
        # Create message from capability components
        message = (
            f"{capability.capability_id}:"
            f"{capability.resource_id}:"
            f"{','.join(sorted(capability.permissions))}:"
            f"{capability.owner}:"
            f"{capability.created_at.isoformat()}"
        )

        if capability.expires_at:
            message += f":{capability.expires_at.isoformat()}"

        signature = hmac.new(
            self.signing_key,
            message.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()

        return signature

# Example usage
if __name__ == "__main__":
    cap_system = CapabilitySystem(signing_key="super-secret-key-min-32-chars")

    # Create resources
    cap_system.create_resource(
        "file_001",
        {"name": "confidential.txt", "content": "Secret data"}
    )

    # Alice creates capability for file
    alice_cap = cap_system.create_capability(
        resource_id="file_001",
        permissions={"read", "write", "delete"},
        owner="alice",
        expires_in_hours=24
    )

    print(f"Alice's capability: {alice_cap.capability_id}")
    print(f"Permissions: {alice_cap.permissions}")

    # Alice accesses file
    data = cap_system.access_resource(alice_cap.capability_id, "read")
    print(f"\nAlice reads: {data}")

    # Alice delegates read-only capability to Bob
    bob_cap = cap_system.delegate_capability(
        alice_cap.capability_id,
        new_owner="bob",
        restricted_permissions={"read"},
        expires_in_hours=2
    )

    print(f"\nBob's capability: {bob_cap.capability_id}")
    print(f"Bob's permissions: {bob_cap.permissions}")

    # Bob tries to read (succeeds)
    data = cap_system.access_resource(bob_cap.capability_id, "read")
    print(f"Bob reads: {data}")

    # Bob tries to write (fails)
    can_write = cap_system.verify_capability(bob_cap.capability_id, "write")
    print(f"Bob can write: {can_write}")

    # Revoke Bob's capability
    cap_system.revoke_capability(bob_cap.capability_id)
    data = cap_system.access_resource(bob_cap.capability_id, "read")
    print(f"\nAfter revocation, Bob reads: {data}")
```

## Comparing Access Control Models

### DAC vs MAC vs Capabilities

| Feature | DAC | MAC | Capabilities |
|---------|-----|-----|--------------|
| Control | Owner decides | System enforces | Token possession |
| Flexibility | High | Low | Medium |
| Security | Lower | Higher | High |
| Complexity | Low | High | Medium |
| Use Cases | General purpose | Military/Gov | Distributed systems |

### When to Use Each Model

**DAC**:
- General-purpose applications
- File systems
- Collaborative environments
- When flexibility is important

**MAC**:
- High-security environments
- Need to prevent information leakage
- Regulatory compliance (e.g., government)
- Classified information systems

**Capabilities**:
- Distributed systems
- Microservices architectures
- Need for fine-grained delegation
- Systems requiring audit trails

## Hybrid Approaches

Modern systems often combine multiple models:

```python
class HybridAccessControl:
    """
    Hybrid system combining DAC, MAC, and capabilities
    """

    def __init__(self):
        self.dac = DACSystem()
        self.mac = MACSystem()
        self.cap = CapabilitySystem(signing_key="hybrid-system-key-32-chars")

    def check_access(
        self,
        subject: str,
        resource: str,
        operation: str,
        capability_id: Optional[str] = None
    ) -> bool:
        """
        Check access using all three models
        All must allow for access to be granted
        """
        # Check MAC first (mandatory policy)
        if not self.mac.can_read(subject, resource):
            return False

        # Check DAC (discretionary policy)
        dac_permission = getattr(Permission, operation.upper(), Permission.NONE)
        if not self.dac.check_access(subject, resource, dac_permission):
            return False

        # Check capability if provided
        if capability_id:
            if not self.cap.verify_capability(capability_id, operation):
                return False

        return True
```

## Conclusion

Access control models provide different trade-offs between security, flexibility, and complexity. DAC offers flexibility through owner-controlled permissions, MAC enforces mandatory security policies to prevent information leakage, and capability-based systems provide fine-grained, delegable access rights. Understanding these foundational models is essential for designing secure systems and choosing the right approach for specific security requirements.
