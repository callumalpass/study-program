# Injection Attacks

## Introduction

Injection attacks occur when untrusted data is sent to an interpreter as part of a command or query. The attacker's hostile data tricks the interpreter into executing unintended commands or accessing unauthorized data. Injection vulnerabilities rank among the most dangerous and prevalent security issues, consistently appearing in the OWASP Top 10.

Understanding injection attacks is critical for defensive programming. This lesson focuses on recognizing vulnerable patterns and implementing secure alternatives.

## SQL Injection

SQL injection (SQLi) occurs when user input is incorporated into SQL queries without proper validation or sanitization. Attackers can manipulate queries to bypass authentication, extract sensitive data, modify database contents, or execute administrative operations.

### Vulnerable Pattern

```python
# VULNERABLE - Never do this!
def get_user_vulnerable(username):
    import sqlite3
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # Dangerous: Direct string concatenation
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)

    return cursor.fetchone()

# Attack example:
# username = "admin' OR '1'='1"
# Results in: SELECT * FROM users WHERE username = 'admin' OR '1'='1'
# This bypasses authentication by making the condition always true
```

### Secure Implementation: Parameterized Queries

```python
# SECURE - Always use parameterized queries
def get_user_secure(username):
    import sqlite3
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # Safe: Use parameterized query with placeholders
    query = "SELECT * FROM users WHERE username = ?"
    cursor.execute(query, (username,))

    return cursor.fetchone()

# The database driver handles escaping and quoting
# Attack attempts are treated as literal strings, not SQL code
```

### Parameterized Queries in Different Languages

```python
# Python with SQLite
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))

# Python with PostgreSQL (psycopg2)
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))

# Python with MySQL (mysql-connector)
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

```java
// Java with JDBC
String query = "SELECT * FROM users WHERE username = ?";
PreparedStatement stmt = connection.prepareStatement(query);
stmt.setString(1, username);
ResultSet rs = stmt.executeQuery();
```

```javascript
// Node.js with PostgreSQL (pg library)
const query = 'SELECT * FROM users WHERE username = $1';
const values = [username];
const result = await client.query(query, values);
```

```php
// PHP with PDO
$stmt = $pdo->prepare('SELECT * FROM users WHERE username = :username');
$stmt->execute(['username' => $username]);
$user = $stmt->fetch();
```

### Using ORMs for Additional Protection

Object-Relational Mapping (ORM) libraries provide an additional layer of protection:

```python
# Python with SQLAlchemy ORM
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String)

# Create session
engine = create_engine('sqlite:///users.db')
Session = sessionmaker(bind=engine)
session = Session()

# Safe query using ORM
def get_user_orm(username):
    # SQLAlchemy automatically parameterizes this query
    user = session.query(User).filter(User.username == username).first()
    return user

# Even complex queries are automatically parameterized
def search_users_orm(search_term, min_id):
    users = session.query(User).filter(
        User.username.like(f'%{search_term}%'),  # Still parameterized
        User.id >= min_id
    ).all()
    return users
```

### Defense Against Second-Order SQL Injection

Second-order SQL injection occurs when data is stored safely but retrieved and used unsafely later:

```python
class SecureUserService:
    """Demonstrates defense against second-order SQL injection"""

    def __init__(self, db_connection):
        self.conn = db_connection

    def create_user(self, username, email):
        """Safely store user data - step 1"""
        cursor = self.conn.cursor()
        # This is safe - parameterized query
        cursor.execute(
            "INSERT INTO users (username, email) VALUES (?, ?)",
            (username, email)
        )
        self.conn.commit()

    def get_user_posts(self, user_id):
        """
        Safely retrieve and use stored data - step 2
        Even though username is stored data, treat it as untrusted
        """
        cursor = self.conn.cursor()

        # Get username (stored data)
        cursor.execute("SELECT username FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()

        if not user:
            return []

        username = user[0]

        # STILL use parameterized query even with stored data
        # DON'T assume stored data is safe for string concatenation
        cursor.execute(
            "SELECT * FROM posts WHERE author = ?",
            (username,)
        )

        return cursor.fetchall()
```

## Command Injection

Command injection occurs when applications execute system commands with user-supplied input. Attackers can chain commands or inject malicious commands to compromise the system.

### Vulnerable Pattern

```python
# VULNERABLE - Never do this!
import os

def ping_host_vulnerable(hostname):
    # Dangerous: Direct command execution with user input
    command = f"ping -c 4 {hostname}"
    result = os.system(command)
    return result

# Attack example:
# hostname = "example.com; rm -rf /"
# Results in: ping -c 4 example.com; rm -rf /
# This executes two commands: ping AND a destructive rm command
```

### Secure Implementation: Avoid Shell Execution

```python
# SECURE - Use subprocess with argument list
import subprocess
import shlex

def ping_host_secure(hostname):
    """
    Secure implementation using subprocess
    Arguments passed as list prevent shell interpretation
    """
    try:
        # Use list of arguments instead of shell string
        result = subprocess.run(
            ['ping', '-c', '4', hostname],
            shell=False,  # Critical: Never use shell=True with user input
            capture_output=True,
            text=True,
            timeout=10  # Prevent indefinite execution
        )
        return result.stdout
    except subprocess.TimeoutExpired:
        return "Ping timeout"
    except Exception as e:
        return f"Error: {str(e)}"

# Attack attempts are treated as literal arguments to ping
# hostname = "example.com; rm -rf /" becomes a literal hostname
# ping will fail with "unknown host" - no command execution
```

### Input Validation and Sanitization

```python
import re

class SecureCommandExecutor:
    """Demonstrates defense-in-depth for command execution"""

    def __init__(self):
        # Define allowed patterns for different input types
        self.validators = {
            'hostname': re.compile(r'^[a-zA-Z0-9.-]+$'),
            'ip_address': re.compile(r'^(\d{1,3}\.){3}\d{1,3}$'),
            'filename': re.compile(r'^[a-zA-Z0-9._-]+$')
        }

    def validate_input(self, input_value, input_type):
        """Validate input against whitelist pattern"""
        if input_type not in self.validators:
            raise ValueError(f"Unknown input type: {input_type}")

        pattern = self.validators[input_type]
        if not pattern.match(input_value):
            raise ValueError(f"Invalid {input_type}: {input_value}")

        return True

    def ping_host(self, hostname):
        """
        Secure ping implementation with multiple layers of defense:
        1. Input validation (whitelist)
        2. Subprocess without shell
        3. Timeout protection
        """
        # Layer 1: Validate input
        self.validate_input(hostname, 'hostname')

        # Additional length check
        if len(hostname) > 255:
            raise ValueError("Hostname too long")

        # Layer 2: Use subprocess safely
        try:
            result = subprocess.run(
                ['ping', '-c', '4', hostname],
                shell=False,
                capture_output=True,
                text=True,
                timeout=10
            )
            return {
                'success': result.returncode == 0,
                'output': result.stdout,
                'error': result.stderr
            }
        except subprocess.TimeoutExpired:
            return {'success': False, 'error': 'Timeout'}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def convert_image(self, input_file, output_format):
        """
        Secure image conversion example
        Demonstrates validation of multiple parameters
        """
        # Validate both inputs
        self.validate_input(input_file, 'filename')

        # Whitelist allowed formats
        allowed_formats = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
        if output_format.lower() not in allowed_formats:
            raise ValueError(f"Invalid output format: {output_format}")

        # Construct safe command
        output_file = f"{input_file.rsplit('.', 1)[0]}.{output_format}"

        result = subprocess.run(
            ['convert', input_file, output_file],
            shell=False,
            capture_output=True,
            timeout=30
        )

        return result.returncode == 0
```

## LDAP Injection

LDAP injection attacks target applications that construct LDAP queries from user input. These attacks can bypass authentication or extract sensitive directory information.

### Vulnerable Pattern

```python
# VULNERABLE - Direct string concatenation in LDAP filter
def authenticate_user_vulnerable(username, password):
    import ldap

    conn = ldap.initialize('ldap://ldap.example.com')

    # Dangerous: Direct string concatenation
    filter_str = f"(&(uid={username})(userPassword={password}))"

    # Attack example:
    # username = "admin)(uid=*))(&(uid=*"
    # Results in: (&(uid=admin)(uid=*))(&(uid=*)(userPassword=password))
    # This manipulates the LDAP query logic
```

### Secure Implementation: LDAP Escaping

```python
# SECURE - Escape LDAP special characters
import ldap
from ldap.filter import escape_filter_chars

def authenticate_user_secure(username, password):
    """Secure LDAP authentication with proper escaping"""

    # Escape special LDAP characters
    safe_username = escape_filter_chars(username)
    safe_password = escape_filter_chars(password)

    # Construct filter with escaped values
    filter_str = f"(&(uid={safe_username})(userPassword={safe_password}))"

    try:
        conn = ldap.initialize('ldap://ldap.example.com')
        # Use LDAP with escaped input
        result = conn.search_s(
            'dc=example,dc=com',
            ldap.SCOPE_SUBTREE,
            filter_str
        )
        return len(result) > 0
    except ldap.LDAPError as e:
        print(f"LDAP error: {e}")
        return False
```

## NoSQL Injection

NoSQL databases like MongoDB are also vulnerable to injection attacks, though the attack vectors differ from traditional SQL injection.

### Vulnerable Pattern

```javascript
// VULNERABLE - Node.js/MongoDB
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Dangerous: Direct object insertion
    const user = await db.collection('users').findOne({
        username: username,
        password: password
    });

    // Attack example:
    // POST body: {"username": {"$ne": null}, "password": {"$ne": null}}
    // This matches any user where username and password exist
});
```

### Secure Implementation: Type Validation

```javascript
// SECURE - Validate input types and sanitize
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate that inputs are strings
    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: 'Invalid input types' });
    }

    // Additional validation
    if (username.length === 0 || username.length > 100) {
        return res.status(400).json({ error: 'Invalid username length' });
    }

    try {
        // Hash password before comparison
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.collection('users').findOne({
            username: username  // Now guaranteed to be a string
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Use bcrypt.compare for password verification
        const isValid = await bcrypt.compare(password, user.password);

        if (isValid) {
            // Generate session token
            res.json({ success: true });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
```

## XML Injection and XXE

XML External Entity (XXE) attacks exploit vulnerable XML parsers that process external entity references.

### Secure XML Parsing

```python
# SECURE - Disable external entity processing
import xml.etree.ElementTree as ET
from defusedxml.ElementTree import parse as safe_parse

def parse_xml_secure(xml_file):
    """
    Secure XML parsing with external entity processing disabled
    Use defusedxml library for protection
    """
    try:
        # defusedxml disables dangerous XML features by default
        tree = safe_parse(xml_file)
        root = tree.getroot()
        return root
    except Exception as e:
        print(f"XML parsing error: {e}")
        return None

# Alternative: Configure standard parser securely
def parse_xml_manual_config(xml_string):
    """Manual configuration of XML parser security"""
    # Create parser with safe defaults
    parser = ET.XMLParser()

    # These are default in Python 3.x but explicit is better
    parser.entity = {}  # Disable entity expansion
    parser.parser.SetParamEntityParsing(0)  # Disable parameter entities

    try:
        root = ET.fromstring(xml_string, parser=parser)
        return root
    except ET.ParseError as e:
        print(f"XML parsing error: {e}")
        return None
```

## Defense Strategy Summary

### Core Principles

1. **Never Trust User Input**: Treat all external input as potentially malicious
2. **Use Parameterized Interfaces**: Prepared statements, parameterized queries, ORM libraries
3. **Avoid Shell Execution**: Use subprocess with argument lists, not shell strings
4. **Validate Input**: Whitelist validation against known-good patterns
5. **Escape Output**: Context-specific escaping for SQL, LDAP, XML, etc.
6. **Principle of Least Privilege**: Database accounts should have minimal necessary permissions
7. **Defense in Depth**: Multiple layers of protection

### Implementation Checklist

```python
class InjectionDefenseChecklist:
    """Security checklist for injection prevention"""

    @staticmethod
    def validate_code_review(code_file):
        """Checklist items for code review"""
        checks = {
            'no_string_concatenation_in_queries': False,
            'parameterized_queries_used': False,
            'orm_used_correctly': False,
            'input_validation_present': False,
            'subprocess_shell_false': False,
            'output_encoding_appropriate': False,
            'least_privilege_db_account': False,
            'secure_xml_parser_config': False,
            'nosql_type_validation': False,
            'ldap_escaping_present': False
        }

        # Automated checks could be implemented here
        # For now, returns checklist for manual review

        return checks
```

## Summary

Injection attacks represent a critical security threat across all types of applications. Prevention requires a defense-in-depth approach combining parameterized interfaces, input validation, output encoding, and least privilege. The key is to separate data from code by using secure APIs that handle escaping and quoting automatically. Never construct queries or commands by concatenating user input with strings.

## Key Takeaways

- Always use parameterized queries or prepared statements for database access
- Never use `shell=True` in subprocess calls with user input
- Validate input against whitelists of allowed characters
- Use ORMs for additional protection layer
- Escape special characters for LDAP, XML, and other interpreters
- Validate input types for NoSQL databases
- Apply defense-in-depth with multiple security controls
- Configure parsers securely (disable XXE, entity expansion)
