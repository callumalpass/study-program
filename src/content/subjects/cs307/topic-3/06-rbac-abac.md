# Role-Based and Attribute-Based Access Control

## Role-Based Access Control (RBAC)

Role-Based Access Control is one of the most widely used access control models in enterprise systems. Instead of assigning permissions directly to users, permissions are assigned to roles, and users are assigned to roles. This simplifies permission management in large organizations.

### RBAC Principles

RBAC is based on three fundamental components:

1. **Users**: Individual entities that need access to resources
2. **Roles**: Collections of permissions representing job functions
3. **Permissions**: Authorizations to perform operations on resources

The relationship is: Users → Roles → Permissions

### RBAC Levels

RBAC has four standardized levels of increasing complexity:

- **RBAC0**: Base model with users, roles, permissions
- **RBAC1**: Adds role hierarchies
- **RBAC2**: Adds constraints (mutual exclusion, cardinality)
- **RBAC3**: Combines RBAC1 and RBAC2

## Implementing RBAC

Here's a comprehensive RBAC implementation:

```python
from dataclasses import dataclass, field
from typing import Set, Dict, Optional, List
from enum import Enum

class Operation(Enum):
    """Operations that can be performed"""
    CREATE = "create"
    READ = "read"
    UPDATE = "update"
    DELETE = "delete"
    EXECUTE = "execute"
    APPROVE = "approve"

@dataclass
class Permission:
    """Represents a permission to perform operation on resource"""
    resource_type: str
    operation: Operation
    resource_id: Optional[str] = None  # None means all resources of type

    def __hash__(self):
        return hash((self.resource_type, self.operation, self.resource_id))

    def matches(self, resource_type: str, operation: Operation, resource_id: str) -> bool:
        """Check if this permission grants access"""
        if self.resource_type != resource_type:
            return False
        if self.operation != operation:
            return False
        if self.resource_id is not None and self.resource_id != resource_id:
            return False
        return True

@dataclass
class Role:
    """Represents a role in the system"""
    name: str
    description: str
    permissions: Set[Permission] = field(default_factory=set)
    parent_roles: Set[str] = field(default_factory=set)

@dataclass
class User:
    """Represents a user with assigned roles"""
    username: str
    email: str
    roles: Set[str] = field(default_factory=set)
    is_active: bool = True

@dataclass
class RoleConstraint:
    """Constraint on role assignment"""
    name: str
    constraint_type: str  # "mutually_exclusive", "cardinality", "prerequisite"
    roles: Set[str] = field(default_factory=set)
    max_count: Optional[int] = None
    prerequisite_role: Optional[str] = None

class RBACSystem:
    """
    Comprehensive Role-Based Access Control system
    Implements RBAC3 (with hierarchies and constraints)
    """

    def __init__(self):
        self.users: Dict[str, User] = {}
        self.roles: Dict[str, Role] = {}
        self.constraints: List[RoleConstraint] = []

    def create_role(
        self,
        name: str,
        description: str,
        permissions: Set[Permission] = None,
        parent_roles: Set[str] = None
    ) -> Role:
        """Create a new role"""
        if name in self.roles:
            raise ValueError(f"Role {name} already exists")

        # Verify parent roles exist
        if parent_roles:
            for parent in parent_roles:
                if parent not in self.roles:
                    raise ValueError(f"Parent role {parent} does not exist")

        role = Role(
            name=name,
            description=description,
            permissions=permissions or set(),
            parent_roles=parent_roles or set()
        )

        self.roles[name] = role
        return role

    def add_permission_to_role(
        self,
        role_name: str,
        permission: Permission
    ):
        """Add permission to a role"""
        if role_name not in self.roles:
            raise ValueError(f"Role {role_name} does not exist")

        self.roles[role_name].permissions.add(permission)

    def create_user(
        self,
        username: str,
        email: str,
        roles: Set[str] = None
    ) -> User:
        """Create a new user"""
        if username in self.users:
            raise ValueError(f"User {username} already exists")

        user = User(
            username=username,
            email=email,
            roles=roles or set()
        )

        # Validate role assignments
        if roles:
            for role in roles:
                if role not in self.roles:
                    raise ValueError(f"Role {role} does not exist")

        # Check constraints
        if roles:
            self._check_constraints(username, roles)

        self.users[username] = user
        return user

    def assign_role(self, username: str, role_name: str):
        """Assign role to user"""
        if username not in self.users:
            raise ValueError(f"User {username} does not exist")
        if role_name not in self.roles:
            raise ValueError(f"Role {role_name} does not exist")

        user = self.users[username]
        new_roles = user.roles.copy()
        new_roles.add(role_name)

        # Check constraints with new role set
        self._check_constraints(username, new_roles)

        user.roles.add(role_name)

    def revoke_role(self, username: str, role_name: str):
        """Revoke role from user"""
        if username not in self.users:
            raise ValueError(f"User {username} does not exist")

        user = self.users[username]
        user.roles.discard(role_name)

    def get_all_permissions(self, role_name: str) -> Set[Permission]:
        """
        Get all permissions for a role including inherited permissions
        Handles role hierarchies
        """
        if role_name not in self.roles:
            return set()

        permissions = set()
        visited = set()

        def collect_permissions(role_name: str):
            if role_name in visited or role_name not in self.roles:
                return

            visited.add(role_name)
            role = self.roles[role_name]

            # Add direct permissions
            permissions.update(role.permissions)

            # Add inherited permissions from parent roles
            for parent in role.parent_roles:
                collect_permissions(parent)

        collect_permissions(role_name)
        return permissions

    def get_user_permissions(self, username: str) -> Set[Permission]:
        """Get all permissions for a user from all their roles"""
        if username not in self.users:
            return set()

        user = self.users[username]
        if not user.is_active:
            return set()

        all_permissions = set()
        for role_name in user.roles:
            all_permissions.update(self.get_all_permissions(role_name))

        return all_permissions

    def check_access(
        self,
        username: str,
        resource_type: str,
        operation: Operation,
        resource_id: str
    ) -> bool:
        """Check if user has permission to perform operation"""
        if username not in self.users:
            return False

        user = self.users[username]
        if not user.is_active:
            return False

        permissions = self.get_user_permissions(username)

        for permission in permissions:
            if permission.matches(resource_type, operation, resource_id):
                return True

        return False

    def add_constraint(self, constraint: RoleConstraint):
        """Add role assignment constraint"""
        self.constraints.append(constraint)

    def _check_constraints(self, username: str, roles: Set[str]):
        """Validate role assignments against constraints"""
        for constraint in self.constraints:
            if constraint.constraint_type == "mutually_exclusive":
                # Check if user has more than one mutually exclusive role
                intersection = roles & constraint.roles
                if len(intersection) > 1:
                    raise ValueError(
                        f"Roles {intersection} are mutually exclusive"
                    )

            elif constraint.constraint_type == "cardinality":
                # Check if user has too many instances of constrained roles
                intersection = roles & constraint.roles
                if len(intersection) > constraint.max_count:
                    raise ValueError(
                        f"Cannot assign more than {constraint.max_count} "
                        f"of roles {constraint.roles}"
                    )

            elif constraint.constraint_type == "prerequisite":
                # Check if prerequisite role is assigned
                if constraint.roles & roles:
                    if constraint.prerequisite_role not in roles:
                        raise ValueError(
                            f"Role {constraint.prerequisite_role} "
                            f"is required before assigning {constraint.roles}"
                        )

    def get_role_hierarchy(self, role_name: str) -> Dict[str, List[str]]:
        """Get complete role hierarchy for a role"""
        if role_name not in self.roles:
            return {}

        hierarchy = {}
        visited = set()

        def build_hierarchy(role_name: str):
            if role_name in visited or role_name not in self.roles:
                return

            visited.add(role_name)
            role = self.roles[role_name]
            hierarchy[role_name] = list(role.parent_roles)

            for parent in role.parent_roles:
                build_hierarchy(parent)

        build_hierarchy(role_name)
        return hierarchy

# Example usage
if __name__ == "__main__":
    rbac = RBACSystem()

    # Create organizational roles with hierarchy
    # Base role
    employee_role = rbac.create_role(
        "employee",
        "Basic employee role",
        permissions={
            Permission("document", Operation.READ, None),
            Permission("profile", Operation.UPDATE, None)
        }
    )

    # Developer role inherits from employee
    developer_role = rbac.create_role(
        "developer",
        "Software developer",
        permissions={
            Permission("code", Operation.CREATE, None),
            Permission("code", Operation.UPDATE, None),
            Permission("deployment", Operation.READ, None)
        },
        parent_roles={"employee"}
    )

    # Senior developer
    senior_dev_role = rbac.create_role(
        "senior_developer",
        "Senior software developer",
        permissions={
            Permission("code", Operation.DELETE, None),
            Permission("deployment", Operation.EXECUTE, None)
        },
        parent_roles={"developer"}
    )

    # Manager role
    manager_role = rbac.create_role(
        "manager",
        "Team manager",
        permissions={
            Permission("report", Operation.READ, None),
            Permission("expense", Operation.APPROVE, None),
            Permission("employee", Operation.READ, None)
        },
        parent_roles={"employee"}
    )

    # Admin role
    admin_role = rbac.create_role(
        "admin",
        "System administrator",
        permissions={
            Permission("system", Operation.CREATE, None),
            Permission("system", Operation.DELETE, None),
            Permission("user", Operation.CREATE, None),
            Permission("user", Operation.DELETE, None)
        }
    )

    # Add constraints
    # Developers and managers are mutually exclusive
    rbac.add_constraint(RoleConstraint(
        name="dev_mgr_exclusive",
        constraint_type="mutually_exclusive",
        roles={"developer", "manager"}
    ))

    # Senior developer requires developer role
    rbac.add_constraint(RoleConstraint(
        name="senior_dev_prerequisite",
        constraint_type="prerequisite",
        roles={"senior_developer"},
        prerequisite_role="developer"
    ))

    # Create users
    alice = rbac.create_user("alice", "alice@company.com", {"senior_developer"})
    bob = rbac.create_user("bob", "bob@company.com", {"manager"})
    charlie = rbac.create_user("charlie", "charlie@company.com", {"developer"})

    # Test permissions
    print("=== Permission Tests ===")
    print(f"Alice can create code: {rbac.check_access('alice', 'code', Operation.CREATE, 'file.py')}")
    print(f"Alice can delete code: {rbac.check_access('alice', 'code', Operation.DELETE, 'file.py')}")
    print(f"Alice can read documents: {rbac.check_access('alice', 'document', Operation.READ, 'doc.txt')}")
    print(f"Bob can approve expenses: {rbac.check_access('bob', 'expense', Operation.APPROVE, 'exp123')}")
    print(f"Bob can create code: {rbac.check_access('bob', 'code', Operation.CREATE, 'file.py')}")
    print(f"Charlie can execute deployment: {rbac.check_access('charlie', 'deployment', Operation.EXECUTE, 'prod')}")

    # Show role hierarchy
    print("\n=== Alice's Role Hierarchy ===")
    hierarchy = rbac.get_role_hierarchy("senior_developer")
    for role, parents in hierarchy.items():
        print(f"{role} -> {parents}")

    # Show all permissions
    print("\n=== Alice's Permissions ===")
    for perm in rbac.get_user_permissions("alice"):
        print(f"  {perm.resource_type}.{perm.operation.value}")
```

## Attribute-Based Access Control (ABAC)

ABAC is a more flexible access control model that makes decisions based on attributes of users, resources, actions, and environment. It's particularly useful for complex, dynamic environments where RBAC's role-based approach becomes unwieldy.

### ABAC Components

1. **Subject Attributes**: User properties (department, clearance level, location)
2. **Resource Attributes**: Resource properties (classification, owner, type)
3. **Action Attributes**: Operation properties (read, write, approve)
4. **Environmental Attributes**: Context (time, location, threat level)

### ABAC Policy Structure

ABAC policies are expressed as rules: "IF conditions THEN allow/deny"

```python
from typing import Any, Callable, List
from datetime import datetime, time
import ipaddress

@dataclass
class Attribute:
    """Represents an attribute with name and value"""
    name: str
    value: Any

    def __hash__(self):
        return hash((self.name, str(self.value)))

@dataclass
class Subject:
    """Subject (user) with attributes"""
    id: str
    attributes: Dict[str, Any] = field(default_factory=dict)

    def get_attribute(self, name: str) -> Any:
        return self.attributes.get(name)

@dataclass
class Resource:
    """Resource with attributes"""
    id: str
    resource_type: str
    attributes: Dict[str, Any] = field(default_factory=dict)

    def get_attribute(self, name: str) -> Any:
        return self.attributes.get(name)

@dataclass
class Action:
    """Action with attributes"""
    operation: str
    attributes: Dict[str, Any] = field(default_factory=dict)

@dataclass
class Environment:
    """Environmental context"""
    attributes: Dict[str, Any] = field(default_factory=dict)

    def get_attribute(self, name: str) -> Any:
        return self.attributes.get(name)

class PolicyRule:
    """ABAC policy rule"""

    def __init__(
        self,
        name: str,
        description: str,
        condition: Callable[[Subject, Resource, Action, Environment], bool],
        effect: str = "allow"  # "allow" or "deny"
    ):
        self.name = name
        self.description = description
        self.condition = condition
        self.effect = effect

    def evaluate(
        self,
        subject: Subject,
        resource: Resource,
        action: Action,
        environment: Environment
    ) -> Optional[str]:
        """
        Evaluate rule
        Returns "allow", "deny", or None if rule doesn't apply
        """
        try:
            if self.condition(subject, resource, action, environment):
                return self.effect
        except Exception as e:
            # Rule evaluation error - safe default is deny
            print(f"Rule {self.name} evaluation error: {e}")
            return None

        return None

class ABACSystem:
    """
    Attribute-Based Access Control system
    Evaluates access based on attributes and policies
    """

    def __init__(self):
        self.policies: List[PolicyRule] = []
        self.default_decision = "deny"

    def add_policy(self, policy: PolicyRule):
        """Add policy rule"""
        self.policies.append(policy)

    def evaluate(
        self,
        subject: Subject,
        resource: Resource,
        action: Action,
        environment: Environment
    ) -> bool:
        """
        Evaluate access request against all policies
        Uses deny-override: any deny overrides any allow
        """
        has_allow = False
        has_deny = False

        for policy in self.policies:
            result = policy.evaluate(subject, resource, action, environment)

            if result == "allow":
                has_allow = True
            elif result == "deny":
                has_deny = True
                # Deny overrides, can return immediately
                return False

        # If any allow and no deny
        if has_allow and not has_deny:
            return True

        # Default deny
        return False

# Example policies
def create_example_policies() -> List[PolicyRule]:
    """Create example ABAC policies"""

    policies = []

    # Policy 1: Employees can read their own documents
    policies.append(PolicyRule(
        name="read_own_documents",
        description="Users can read their own documents",
        condition=lambda s, r, a, e: (
            a.operation == "read" and
            r.resource_type == "document" and
            r.get_attribute("owner") == s.id
        ),
        effect="allow"
    ))

    # Policy 2: Managers can read department documents
    policies.append(PolicyRule(
        name="manager_read_dept_docs",
        description="Managers can read documents in their department",
        condition=lambda s, r, a, e: (
            a.operation == "read" and
            r.resource_type == "document" and
            s.get_attribute("role") == "manager" and
            r.get_attribute("department") == s.get_attribute("department")
        ),
        effect="allow"
    ))

    # Policy 3: Only access during business hours
    policies.append(PolicyRule(
        name="business_hours_only",
        description="Sensitive documents only during business hours",
        condition=lambda s, r, a, e: (
            r.get_attribute("classification") == "sensitive" and
            not (time(9, 0) <= e.get_attribute("current_time").time() <= time(17, 0))
        ),
        effect="deny"
    ))

    # Policy 4: Geographic restriction
    policies.append(PolicyRule(
        name="geo_restriction",
        description="Classified documents only from approved locations",
        condition=lambda s, r, a, e: (
            r.get_attribute("classification") == "classified" and
            e.get_attribute("location") not in ["US", "UK", "CA"]
        ),
        effect="deny"
    ))

    # Policy 5: Role-based creation
    policies.append(PolicyRule(
        name="content_creator_can_create",
        description="Content creators can create documents",
        condition=lambda s, r, a, e: (
            a.operation == "create" and
            r.resource_type == "document" and
            "content_creator" in s.get_attribute("roles", [])
        ),
        effect="allow"
    ))

    # Policy 6: Approval workflow
    policies.append(PolicyRule(
        name="senior_approval_required",
        description="Senior staff can approve budgets over $10k",
        condition=lambda s, r, a, e: (
            a.operation == "approve" and
            r.resource_type == "budget" and
            r.get_attribute("amount", 0) > 10000 and
            s.get_attribute("level") != "senior"
        ),
        effect="deny"
    ))

    # Policy 7: IP-based restriction
    policies.append(PolicyRule(
        name="internal_network_only",
        description="Admin operations only from internal network",
        condition=lambda s, r, a, e: (
            a.operation in ["delete", "modify_permissions"] and
            not is_internal_ip(e.get_attribute("source_ip"))
        ),
        effect="deny"
    ))

    return policies

def is_internal_ip(ip_str: str) -> bool:
    """Check if IP is in internal network"""
    try:
        ip = ipaddress.ip_address(ip_str)
        # Check if private IP
        return ip.is_private
    except ValueError:
        return False

# Example usage
if __name__ == "__main__":
    abac = ABACSystem()

    # Add policies
    for policy in create_example_policies():
        abac.add_policy(policy)

    # Create test subjects
    alice = Subject(
        id="alice",
        attributes={
            "role": "manager",
            "department": "engineering",
            "roles": ["content_creator", "reviewer"],
            "level": "senior"
        }
    )

    bob = Subject(
        id="bob",
        attributes={
            "role": "employee",
            "department": "engineering",
            "roles": ["content_creator"],
            "level": "junior"
        }
    )

    # Create test resources
    doc1 = Resource(
        id="doc1",
        resource_type="document",
        attributes={
            "owner": "alice",
            "department": "engineering",
            "classification": "internal"
        }
    )

    doc2 = Resource(
        id="doc2",
        resource_type="document",
        attributes={
            "owner": "bob",
            "department": "engineering",
            "classification": "sensitive"
        }
    )

    budget1 = Resource(
        id="budget1",
        resource_type="budget",
        attributes={
            "amount": 15000,
            "department": "engineering"
        }
    )

    # Create actions
    read_action = Action(operation="read")
    approve_action = Action(operation="approve")
    create_action = Action(operation="create")

    # Create environment
    env_business_hours = Environment(attributes={
        "current_time": datetime.now().replace(hour=14, minute=0),
        "location": "US",
        "source_ip": "192.168.1.100"
    })

    env_after_hours = Environment(attributes={
        "current_time": datetime.now().replace(hour=20, minute=0),
        "location": "US",
        "source_ip": "192.168.1.100"
    })

    # Test access decisions
    print("=== ABAC Access Decisions ===")

    # Alice reads her own document
    result = abac.evaluate(alice, doc1, read_action, env_business_hours)
    print(f"Alice reads own document: {result}")

    # Alice reads Bob's document (same department)
    result = abac.evaluate(alice, doc2, read_action, env_business_hours)
    print(f"Alice reads Bob's document: {result}")

    # Bob reads Alice's document (not a manager)
    result = abac.evaluate(bob, doc1, read_action, env_business_hours)
    print(f"Bob reads Alice's document: {result}")

    # Alice reads sensitive doc after hours (denied by time policy)
    result = abac.evaluate(alice, doc2, read_action, env_after_hours)
    print(f"Alice reads sensitive doc after hours: {result}")

    # Alice approves large budget (senior)
    result = abac.evaluate(alice, budget1, approve_action, env_business_hours)
    print(f"Alice approves $15k budget: {result}")

    # Bob approves large budget (not senior)
    result = abac.evaluate(bob, budget1, approve_action, env_business_hours)
    print(f"Bob approves $15k budget: {result}")

    # Bob creates document
    result = abac.evaluate(bob, doc1, create_action, env_business_hours)
    print(f"Bob creates document: {result}")
```

## RBAC vs ABAC Comparison

### When to Use RBAC

- Stable organizational structure
- Clear job functions and roles
- Moderate number of roles (< 100)
- Permissions align with roles
- Simpler to understand and manage

### When to Use ABAC

- Dynamic, fine-grained access control needed
- Many contextual factors affect decisions
- Complex business rules
- Need for real-time policy updates
- Cross-organizational access

### Hybrid RBAC/ABAC

Many modern systems combine both approaches:

```python
class HybridAccessControl:
    """Combines RBAC and ABAC for flexible access control"""

    def __init__(self):
        self.rbac = RBACSystem()
        self.abac = ABACSystem()

    def check_access(
        self,
        username: str,
        resource_type: str,
        operation: str,
        resource_id: str,
        context: Dict[str, Any] = None
    ) -> bool:
        """
        Check access using both RBAC and ABAC
        RBAC provides baseline permissions
        ABAC adds contextual enforcement
        """
        # First check RBAC for baseline permission
        has_rbac_permission = self.rbac.check_access(
            username,
            resource_type,
            Operation(operation),
            resource_id
        )

        if not has_rbac_permission:
            return False

        # Then check ABAC for contextual constraints
        if context:
            # Build ABAC request from context
            subject = Subject(
                id=username,
                attributes=context.get("subject_attrs", {})
            )
            resource = Resource(
                id=resource_id,
                resource_type=resource_type,
                attributes=context.get("resource_attrs", {})
            )
            action = Action(operation=operation)
            environment = Environment(
                attributes=context.get("environment_attrs", {})
            )

            has_abac_permission = self.abac.evaluate(
                subject, resource, action, environment
            )

            return has_abac_permission

        # If no context provided, RBAC permission is sufficient
        return True
```

## Conclusion

RBAC and ABAC represent two powerful approaches to access control. RBAC provides a practical, manageable solution for organizations with well-defined roles and stable permission structures. ABAC offers greater flexibility and expressiveness for complex, dynamic environments where access decisions depend on multiple contextual factors. Understanding both models and knowing when to apply each is essential for designing secure, scalable access control systems. Modern applications often benefit from hybrid approaches that combine the simplicity of RBAC with the flexibility of ABAC.
