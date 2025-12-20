# Input Validation

Input validation is the first line of defense against many common attacks. All input from untrusted sources must be validated before processing to prevent injection attacks, data corruption, and other security issues.

## Validation Strategies

### Whitelist vs Blacklist

```
Whitelist (Preferred):         Blacklist (Avoid):
Define what IS allowed         Define what is NOT allowed
┌─────────────────────┐       ┌─────────────────────┐
│ Allow: [a-zA-Z0-9_] │       │ Block: <script>     │
│                     │       │ Block: DROP TABLE   │
│ Reject everything   │       │ Block: ../          │
│ else                │       │ ...infinite list... │
└─────────────────────┘       └─────────────────────┘

✓ Secure by default           ✗ Easily bypassed
✓ Predictable                 ✗ Incomplete
✓ Maintainable                ✗ Attack variations
```

### Whitelist Validation Examples

```python
import re
from typing import Optional
from enum import Enum

class ValidationError(Exception):
    """Raised when input validation fails"""
    pass

class Validator:
    """Whitelist-based input validation"""

    @staticmethod
    def validate_username(username: str) -> str:
        """
        Whitelist: Only allow alphanumeric and underscore
        Length: 3-32 characters
        """
        if not username:
            raise ValidationError("Username is required")

        # Whitelist: only specific characters allowed
        if not re.match(r'^[a-zA-Z0-9_]{3,32}$', username):
            raise ValidationError(
                "Username must be 3-32 characters, alphanumeric and underscore only"
            )

        return username

    @staticmethod
    def validate_email(email: str) -> str:
        """
        Whitelist: RFC-compliant email format
        """
        if not email:
            raise ValidationError("Email is required")

        # Whitelist pattern for email
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

        if not re.match(pattern, email):
            raise ValidationError("Invalid email format")

        # Additional length check
        if len(email) > 254:  # RFC 5321
            raise ValidationError("Email too long")

        return email.lower()

    @staticmethod
    def validate_phone(phone: str) -> str:
        """
        Whitelist: Digits, spaces, hyphens, parentheses, plus
        """
        # Remove whitespace for validation
        clean_phone = re.sub(r'\s', '', phone)

        # Whitelist: international format
        if not re.match(r'^\+?[0-9]{10,15}$', clean_phone):
            raise ValidationError("Invalid phone number format")

        return clean_phone

    @staticmethod
    def validate_integer(value: str, min_val: int = None,
                        max_val: int = None) -> int:
        """
        Whitelist: Integer within specified range
        """
        # Whitelist: integer format
        if not re.match(r'^-?[0-9]+$', value):
            raise ValidationError("Must be an integer")

        try:
            int_value = int(value)
        except ValueError:
            raise ValidationError("Invalid integer")

        # Range validation
        if min_val is not None and int_value < min_val:
            raise ValidationError(f"Must be at least {min_val}")
        if max_val is not None and int_value > max_val:
            raise ValidationError(f"Must be at most {max_val}")

        return int_value

    @staticmethod
    def validate_date(date_str: str) -> str:
        """
        Whitelist: ISO 8601 date format (YYYY-MM-DD)
        """
        if not re.match(r'^\d{4}-\d{2}-\d{2}$', date_str):
            raise ValidationError("Date must be in YYYY-MM-DD format")

        # Validate actual date
        from datetime import datetime
        try:
            datetime.strptime(date_str, '%Y-%m-%d')
        except ValueError:
            raise ValidationError("Invalid date")

        return date_str

    @staticmethod
    def validate_enum(value: str, allowed_values: list) -> str:
        """
        Whitelist: Exact match against allowed values
        """
        if value not in allowed_values:
            raise ValidationError(
                f"Must be one of: {', '.join(allowed_values)}"
            )
        return value

    @staticmethod
    def validate_file_extension(filename: str, allowed_extensions: list) -> str:
        """
        Whitelist: File extension validation
        """
        if not filename:
            raise ValidationError("Filename is required")

        # Extract extension
        parts = filename.rsplit('.', 1)
        if len(parts) != 2:
            raise ValidationError("File must have an extension")

        extension = parts[1].lower()

        if extension not in allowed_extensions:
            raise ValidationError(
                f"File type not allowed. Allowed: {', '.join(allowed_extensions)}"
            )

        return filename
```

## Input Sanitization

Sanitization removes or encodes dangerous characters while preserving valid input.

### Sanitization Functions

```python
import html
import bleach
from urllib.parse import quote, unquote

class Sanitizer:
    """Input sanitization utilities"""

    @staticmethod
    def sanitize_html(html_input: str, allowed_tags: list = None) -> str:
        """
        Sanitize HTML input, allowing only specific tags
        Uses bleach library for safe HTML handling
        """
        if allowed_tags is None:
            # Default: allow basic formatting only
            allowed_tags = ['p', 'br', 'strong', 'em', 'u', 'a']

        allowed_attributes = {
            'a': ['href', 'title'],
        }

        # Remove all disallowed tags and attributes
        clean_html = bleach.clean(
            html_input,
            tags=allowed_tags,
            attributes=allowed_attributes,
            strip=True
        )

        return clean_html

    @staticmethod
    def sanitize_text(text: str) -> str:
        """
        Sanitize plain text by removing control characters
        """
        # Remove null bytes
        text = text.replace('\x00', '')

        # Remove other control characters except newline, tab, carriage return
        sanitized = ''.join(
            char for char in text
            if char in '\n\r\t' or ord(char) >= 32
        )

        return sanitized

    @staticmethod
    def sanitize_filename(filename: str) -> str:
        """
        Sanitize filename to prevent directory traversal
        """
        # Remove path separators
        filename = filename.replace('/', '').replace('\\', '')

        # Remove null bytes
        filename = filename.replace('\x00', '')

        # Remove leading dots (hidden files)
        filename = filename.lstrip('.')

        # Allow only safe characters
        filename = re.sub(r'[^a-zA-Z0-9._-]', '_', filename)

        # Limit length
        if len(filename) > 255:
            name, ext = filename.rsplit('.', 1) if '.' in filename else (filename, '')
            filename = name[:255-len(ext)-1] + '.' + ext if ext else name[:255]

        return filename

    @staticmethod
    def sanitize_sql_identifier(identifier: str) -> str:
        """
        Sanitize SQL identifier (table/column name)
        NOTE: Still prefer parameterized queries over this
        """
        # Allow only alphanumeric and underscore
        if not re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*$', identifier):
            raise ValidationError("Invalid SQL identifier")

        # Check against SQL keywords (partial list)
        sql_keywords = {'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'TABLE'}
        if identifier.upper() in sql_keywords:
            raise ValidationError("SQL keyword not allowed as identifier")

        return identifier
```

## Parameterized Queries

Parameterized queries (prepared statements) are the primary defense against SQL injection.

### SQL Injection Prevention

```python
import sqlite3
from typing import List, Optional

class DatabaseSafe:
    """Safe database operations using parameterized queries"""

    def __init__(self, db_path: str):
        self.conn = sqlite3.connect(db_path)
        self.cursor = self.conn.cursor()

    def get_user_by_username(self, username: str) -> Optional[dict]:
        """
        SAFE: Parameterized query
        """
        # Parameters are passed separately, not concatenated
        query = "SELECT id, username, email FROM users WHERE username = ?"
        self.cursor.execute(query, (username,))

        row = self.cursor.fetchone()
        if row:
            return {'id': row[0], 'username': row[1], 'email': row[2]}
        return None

    def get_users_by_criteria(self, min_age: int, city: str) -> List[dict]:
        """
        SAFE: Multiple parameters
        """
        query = """
            SELECT id, username, age, city
            FROM users
            WHERE age >= ? AND city = ?
        """
        self.cursor.execute(query, (min_age, city))

        return [
            {'id': row[0], 'username': row[1], 'age': row[2], 'city': row[3]}
            for row in self.cursor.fetchall()
        ]

    def insert_user(self, username: str, email: str, age: int) -> int:
        """
        SAFE: Parameterized INSERT
        """
        query = "INSERT INTO users (username, email, age) VALUES (?, ?, ?)"
        self.cursor.execute(query, (username, email, age))
        self.conn.commit()
        return self.cursor.lastrowid

    def update_user_email(self, user_id: int, new_email: str):
        """
        SAFE: Parameterized UPDATE
        """
        query = "UPDATE users SET email = ? WHERE id = ?"
        self.cursor.execute(query, (new_email, user_id))
        self.conn.commit()

    def search_users(self, search_term: str) -> List[dict]:
        """
        SAFE: LIKE queries with parameterization
        """
        # Still use parameters for LIKE
        query = "SELECT id, username FROM users WHERE username LIKE ?"

        # Sanitize search term and add wildcards
        safe_term = search_term.replace('%', '\\%').replace('_', '\\_')
        search_pattern = f"%{safe_term}%"

        self.cursor.execute(query, (search_pattern,))

        return [
            {'id': row[0], 'username': row[1]}
            for row in self.cursor.fetchall()
        ]


class DatabaseUnsafe:
    """
    DANGEROUS EXAMPLES - DO NOT USE IN PRODUCTION
    Shown for educational purposes only
    """

    def get_user_vulnerable(self, username: str):
        """
        VULNERABLE: SQL Injection
        Attack: username = "admin' OR '1'='1"
        Result: Returns all users
        """
        # DON'T DO THIS
        query = f"SELECT * FROM users WHERE username = '{username}'"
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def delete_user_vulnerable(self, user_id: str):
        """
        VULNERABLE: SQL Injection
        Attack: user_id = "1; DROP TABLE users; --"
        Result: Deletes entire users table
        """
        # DON'T DO THIS
        query = f"DELETE FROM users WHERE id = {user_id}"
        self.cursor.execute(query)
```

### ORM Usage (Safe Alternative)

```python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(120), nullable=False)
    age = Column(Integer)

class UserRepository:
    """Safe database operations using ORM"""

    def __init__(self, db_url: str):
        engine = create_engine(db_url)
        Session = sessionmaker(bind=engine)
        self.session = Session()

    def get_user_by_username(self, username: str) -> Optional[User]:
        """
        SAFE: ORM automatically parameterizes
        """
        return self.session.query(User).filter(
            User.username == username
        ).first()

    def get_users_by_age_range(self, min_age: int, max_age: int) -> List[User]:
        """
        SAFE: ORM handles parameterization
        """
        return self.session.query(User).filter(
            User.age >= min_age,
            User.age <= max_age
        ).all()

    def create_user(self, username: str, email: str, age: int) -> User:
        """
        SAFE: ORM prevents injection
        """
        user = User(username=username, email=email, age=age)
        self.session.add(user)
        self.session.commit()
        return user
```

## Context-Specific Validation

Different contexts require different validation rules.

### Multi-Context Validation

```python
class ContextValidator:
    """Validation varies by usage context"""

    @staticmethod
    def validate_for_sql(value: str) -> str:
        """
        Validate input destined for SQL query
        Note: Still use parameterized queries
        """
        # Remove null bytes
        value = value.replace('\x00', '')

        # Limit length
        if len(value) > 1000:
            raise ValidationError("Input too long")

        return value

    @staticmethod
    def validate_for_html_display(text: str) -> str:
        """
        Validate input that will be displayed in HTML
        Note: Still encode output
        """
        # Remove control characters
        text = Sanitizer.sanitize_text(text)

        # Limit length
        if len(text) > 10000:
            raise ValidationError("Text too long")

        return text

    @staticmethod
    def validate_for_filename(name: str) -> str:
        """
        Validate input used as filename
        """
        # Strict whitelist for filenames
        if not re.match(r'^[a-zA-Z0-9_.-]{1,255}$', name):
            raise ValidationError("Invalid filename")

        # Prevent directory traversal
        if '..' in name or '/' in name or '\\' in name:
            raise ValidationError("Invalid filename characters")

        return name

    @staticmethod
    def validate_for_shell_command(arg: str) -> str:
        """
        Validate input for shell commands
        WARNING: Prefer not executing shell commands with user input
        """
        # Very restrictive whitelist
        if not re.match(r'^[a-zA-Z0-9_.-]{1,100}$', arg):
            raise ValidationError("Invalid command argument")

        return arg

    @staticmethod
    def validate_url(url: str, allowed_schemes: list = None) -> str:
        """
        Validate URL with scheme restriction
        """
        from urllib.parse import urlparse

        if allowed_schemes is None:
            allowed_schemes = ['http', 'https']

        parsed = urlparse(url)

        # Validate scheme
        if parsed.scheme not in allowed_schemes:
            raise ValidationError(
                f"URL scheme must be one of: {', '.join(allowed_schemes)}"
            )

        # Validate hostname exists
        if not parsed.netloc:
            raise ValidationError("Invalid URL: missing hostname")

        return url
```

## Validation Best Practices

### Validation Layer

```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class CreateUserRequest:
    """Input validation at API boundary"""
    username: str
    email: str
    password: str
    age: Optional[int] = None

    def validate(self):
        """Validate all fields"""
        # Username validation
        self.username = Validator.validate_username(self.username)

        # Email validation
        self.email = Validator.validate_email(self.email)

        # Password strength
        if len(self.password) < 12:
            raise ValidationError("Password must be at least 12 characters")

        # Age validation (if provided)
        if self.age is not None:
            if self.age < 13 or self.age > 120:
                raise ValidationError("Age must be between 13 and 120")

        return self


class UserAPI:
    """API with input validation"""

    def create_user(self, request_data: dict) -> dict:
        """
        Validate input at API boundary
        """
        try:
            # Parse and validate request
            request = CreateUserRequest(**request_data)
            request.validate()

            # Process validated input
            user_id = self._create_user_in_db(
                request.username,
                request.email,
                request.password,
                request.age
            )

            return {
                'success': True,
                'user_id': user_id
            }

        except ValidationError as e:
            return {
                'success': False,
                'error': str(e)
            }

        except Exception as e:
            # Don't leak internal errors
            return {
                'success': False,
                'error': 'An error occurred'
            }
```

## Summary

Input validation is critical for preventing injection attacks and data corruption:

- **Whitelist Validation**: Define what IS allowed, reject everything else (preferred approach)
- **Blacklist Validation**: Define what is NOT allowed (easily bypassed, avoid)
- **Sanitization**: Remove or encode dangerous characters while preserving valid input
- **Parameterized Queries**: Primary defense against SQL injection, always use for database operations
- **Context-Specific Validation**: Different contexts (SQL, HTML, filesystem) require different validation
- **Validation Layers**: Validate at system boundaries (API, forms) before processing

Never trust user input. Validate early, validate thoroughly, and use parameterized queries for all database operations.
