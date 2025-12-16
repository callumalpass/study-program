# Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF)

## Introduction

Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) are client-side attacks that exploit the trust relationship between users and web applications. XSS injects malicious scripts into trusted websites, while CSRF tricks users into performing unintended actions. Understanding and preventing these attacks is essential for secure web application development.

## Cross-Site Scripting (XSS)

XSS vulnerabilities occur when applications include untrusted data in web pages without proper validation or escaping. Attackers inject malicious scripts that execute in victims' browsers, potentially stealing credentials, session tokens, or performing actions on behalf of users.

### Types of XSS

1. **Reflected XSS**: Malicious script comes from the current HTTP request
2. **Stored XSS**: Malicious script is stored in the database and served to users
3. **DOM-based XSS**: Vulnerability exists in client-side code rather than server-side

## Reflected XSS

Reflected XSS occurs when user input is immediately returned in the response without proper sanitization.

### Vulnerable Pattern

```python
# VULNERABLE - Flask example
from flask import Flask, request

app = Flask(__name__)

@app.route('/search')
def search_vulnerable():
    query = request.args.get('q', '')
    # Dangerous: Directly embedding user input in HTML
    html = f'''
    <html>
        <body>
            <h1>Search Results</h1>
            <p>You searched for: {query}</p>
        </body>
    </html>
    '''
    return html

# Attack example:
# /search?q=<script>alert(document.cookie)</script>
# The script executes in the victim's browser
```

### Secure Implementation: Output Encoding

```python
# SECURE - Proper output encoding
from flask import Flask, request, render_template_string, escape
import html

app = Flask(__name__)

@app.route('/search')
def search_secure():
    query = request.args.get('q', '')

    # Method 1: Use HTML escaping
    safe_query = html.escape(query)

    html_template = '''
    <html>
        <body>
            <h1>Search Results</h1>
            <p>You searched for: {{ query }}</p>
        </body>
    </html>
    '''

    # Method 2: Use template engine with auto-escaping
    return render_template_string(html_template, query=query)

# Attack attempts are neutralized:
# Input: <script>alert(1)</script>
# Output: &lt;script&gt;alert(1)&lt;/script&gt;
# Browser displays the text literally, doesn't execute it
```

### Context-Specific Encoding

Different contexts require different encoding strategies:

```python
class SecureOutputEncoder:
    """Demonstrates context-specific output encoding"""

    @staticmethod
    def encode_html(text):
        """Encode for HTML body context"""
        import html
        return html.escape(text, quote=True)

    @staticmethod
    def encode_html_attribute(text):
        """Encode for HTML attribute context"""
        import html
        # Encode and always use quotes around attributes
        return html.escape(text, quote=True)

    @staticmethod
    def encode_javascript(text):
        """Encode for JavaScript string context"""
        import json
        # Use JSON encoding for JavaScript strings
        return json.dumps(text)[1:-1]  # Remove surrounding quotes

    @staticmethod
    def encode_url(text):
        """Encode for URL parameter context"""
        from urllib.parse import quote
        return quote(text, safe='')

    @staticmethod
    def encode_css(text):
        """Encode for CSS context"""
        # Only allow alphanumeric characters in CSS contexts
        import re
        return re.sub(r'[^a-zA-Z0-9]', '', text)

# Usage examples
encoder = SecureOutputEncoder()

# HTML context
html_safe = encoder.encode_html(user_input)
output = f'<div>{html_safe}</div>'

# HTML attribute context
attr_safe = encoder.encode_html_attribute(user_input)
output = f'<div data-user="{attr_safe}"></div>'

# JavaScript context
js_safe = encoder.encode_javascript(user_input)
output = f'<script>var username = "{js_safe}";</script>'

# URL context
url_safe = encoder.encode_url(user_input)
output = f'<a href="/profile?name={url_safe}">Profile</a>'
```

## Stored XSS

Stored XSS is more dangerous because the malicious script is permanently stored on the server and served to multiple users.

### Vulnerable Pattern

```python
# VULNERABLE - Stored XSS
from flask import Flask, request, render_template_string
import sqlite3

app = Flask(__name__)

@app.route('/comment', methods=['POST'])
def add_comment_vulnerable():
    comment = request.form.get('comment')
    user_id = request.form.get('user_id')

    # Store comment without sanitization
    conn = sqlite3.connect('comments.db')
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO comments (user_id, text) VALUES (?, ?)",
        (user_id, comment)  # SQL injection is prevented, but XSS is not
    )
    conn.commit()
    conn.close()

    return "Comment added"

@app.route('/comments')
def view_comments_vulnerable():
    conn = sqlite3.connect('comments.db')
    cursor = conn.cursor()
    cursor.execute("SELECT text FROM comments")
    comments = cursor.fetchall()
    conn.close()

    # Dangerous: Rendering stored data without escaping
    html = '<html><body><h1>Comments</h1>'
    for comment in comments:
        html += f'<p>{comment[0]}</p>'  # XSS vulnerability
    html += '</body></html>'

    return html
```

### Secure Implementation: Sanitization and Encoding

```python
# SECURE - Stored XSS prevention
from flask import Flask, request, render_template_string
import sqlite3
import html
import bleach

app = Flask(__name__)

class CommentSanitizer:
    """Secure comment handling with sanitization"""

    def __init__(self):
        # Define allowed HTML tags and attributes
        self.allowed_tags = ['p', 'br', 'strong', 'em', 'u', 'a']
        self.allowed_attributes = {'a': ['href', 'title']}
        self.allowed_protocols = ['http', 'https', 'mailto']

    def sanitize_comment(self, comment):
        """
        Sanitize user comment allowing safe HTML subset
        Use bleach library for robust HTML sanitization
        """
        # Remove dangerous tags and attributes
        clean = bleach.clean(
            comment,
            tags=self.allowed_tags,
            attributes=self.allowed_attributes,
            protocols=self.allowed_protocols,
            strip=True
        )

        # Additional validation
        if len(clean) > 5000:
            raise ValueError("Comment too long")

        return clean

    def sanitize_plaintext(self, text):
        """For contexts where no HTML is allowed"""
        return html.escape(text)

sanitizer = CommentSanitizer()

@app.route('/comment', methods=['POST'])
def add_comment_secure():
    comment = request.form.get('comment')
    user_id = request.form.get('user_id')

    try:
        # Sanitize input before storage
        safe_comment = sanitizer.sanitize_comment(comment)

        conn = sqlite3.connect('comments.db')
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO comments (user_id, text) VALUES (?, ?)",
            (user_id, safe_comment)
        )
        conn.commit()
        conn.close()

        return "Comment added successfully"
    except ValueError as e:
        return str(e), 400

@app.route('/comments')
def view_comments_secure():
    conn = sqlite3.connect('comments.db')
    cursor = conn.cursor()
    cursor.execute("SELECT text FROM comments")
    comments = cursor.fetchall()
    conn.close()

    # Use template with auto-escaping
    template = '''
    <html>
        <body>
            <h1>Comments</h1>
            {% for comment in comments %}
                <div class="comment">{{ comment|safe }}</div>
            {% endfor %}
        </body>
    </html>
    '''

    # Safe because comments were sanitized on input
    return render_template_string(template, comments=[c[0] for c in comments])
```

## DOM-Based XSS

DOM-based XSS occurs when client-side JavaScript processes untrusted data insecurely.

### Vulnerable Pattern

```javascript
// VULNERABLE - DOM-based XSS
function displayWelcome() {
    // Get name from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    // Dangerous: Direct innerHTML assignment
    document.getElementById('welcome').innerHTML = 'Welcome, ' + name + '!';
}

// Attack example:
// ?name=<img src=x onerror=alert(document.cookie)>
// The script executes when the image fails to load
```

### Secure Implementation: Safe DOM Manipulation

```javascript
// SECURE - Safe DOM manipulation
function displayWelcomeSafe() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    // Method 1: Use textContent instead of innerHTML
    const welcomeElement = document.getElementById('welcome');
    welcomeElement.textContent = 'Welcome, ' + name + '!';

    // Method 2: Create text node explicitly
    const textNode = document.createTextNode('Welcome, ' + name + '!');
    welcomeElement.appendChild(textNode);

    // Method 3: Use DOMPurify for HTML content
    const cleanHTML = DOMPurify.sanitize('Welcome, ' + name + '!');
    welcomeElement.innerHTML = cleanHTML;
}

// Comprehensive secure DOM manipulation class
class SecureDOMHandler {
    constructor() {
        // Configure DOMPurify if available
        if (typeof DOMPurify !== 'undefined') {
            this.purify = DOMPurify;
        }
    }

    /**
     * Safely set text content
     */
    setText(element, text) {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        element.textContent = text;
    }

    /**
     * Safely set HTML content with sanitization
     */
    setHTML(element, html) {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }

        if (this.purify) {
            element.innerHTML = this.purify.sanitize(html);
        } else {
            // Fallback: strip all HTML
            element.textContent = this.stripHTML(html);
        }
    }

    /**
     * Strip all HTML tags
     */
    stripHTML(html) {
        const tmp = document.createElement('div');
        tmp.textContent = html;
        return tmp.innerHTML;
    }

    /**
     * Safely set attribute values
     */
    setAttribute(element, attribute, value) {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }

        // Validate attribute name
        const allowedAttributes = ['class', 'id', 'data-*', 'title', 'alt'];
        const dangerous = ['onclick', 'onerror', 'onload', 'href', 'src'];

        if (dangerous.includes(attribute.toLowerCase())) {
            console.error(`Refusing to set dangerous attribute: ${attribute}`);
            return;
        }

        element.setAttribute(attribute, value);
    }

    /**
     * Safely handle URLs
     */
    setHref(element, url) {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }

        // Validate URL protocol
        try {
            const urlObj = new URL(url, window.location.origin);
            const allowedProtocols = ['http:', 'https:', 'mailto:'];

            if (allowedProtocols.includes(urlObj.protocol)) {
                element.href = urlObj.href;
            } else {
                console.error(`Invalid protocol: ${urlObj.protocol}`);
            }
        } catch (e) {
            console.error('Invalid URL:', url);
        }
    }
}

// Usage
const domHandler = new SecureDOMHandler();
domHandler.setText('welcome', userInput);
domHandler.setHTML('content', sanitizedHTML);
domHandler.setHref('profile-link', profileURL);
```

## Content Security Policy (CSP)

CSP provides an additional defense layer by restricting resource loading and script execution.

### Implementing CSP

```python
# Python/Flask with CSP headers
from flask import Flask, make_response

app = Flask(__name__)

def add_security_headers(response):
    """Add Content Security Policy headers"""

    # Strict CSP policy
    csp_policy = (
        "default-src 'self'; "
        "script-src 'self'; "
        "style-src 'self' 'unsafe-inline'; "
        "img-src 'self' data: https:; "
        "font-src 'self'; "
        "connect-src 'self'; "
        "frame-ancestors 'none'; "
        "base-uri 'self'; "
        "form-action 'self'"
    )

    response.headers['Content-Security-Policy'] = csp_policy

    # Additional security headers
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'

    return response

@app.after_request
def apply_security_headers(response):
    return add_security_headers(response)
```

## Cross-Site Request Forgery (CSRF)

CSRF attacks trick authenticated users into performing unwanted actions. The attack leverages the victim's authenticated session to execute unauthorized commands.

### How CSRF Works

1. User logs into vulnerable site (bank.com)
2. User visits attacker's site (evil.com)
3. Attacker's site contains hidden form that submits to bank.com
4. User's browser automatically includes authentication cookies
5. Bank processes the forged request as legitimate

### Vulnerable Pattern

```python
# VULNERABLE - No CSRF protection
from flask import Flask, request, session

app = Flask(__name__)
app.secret_key = 'secret'

@app.route('/transfer', methods=['POST'])
def transfer_money_vulnerable():
    if 'user_id' not in session:
        return "Unauthorized", 401

    # Dangerous: No CSRF token validation
    to_account = request.form.get('to_account')
    amount = request.form.get('amount')

    # Process transfer
    execute_transfer(session['user_id'], to_account, amount)

    return "Transfer complete"

# Attack example (on evil.com):
# <form action="https://bank.com/transfer" method="POST">
#     <input name="to_account" value="attacker_account">
#     <input name="amount" value="10000">
# </form>
# <script>document.forms[0].submit();</script>
```

### Secure Implementation: CSRF Tokens

```python
# SECURE - CSRF token protection
from flask import Flask, request, session, render_template_string
import secrets
import hmac
import hashlib

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

class CSRFProtection:
    """CSRF token generation and validation"""

    def __init__(self, secret_key):
        self.secret_key = secret_key

    def generate_token(self, session_id):
        """Generate CSRF token for session"""
        # Create token using HMAC
        message = f"{session_id}{secrets.token_hex(16)}"
        token = hmac.new(
            self.secret_key.encode(),
            message.encode(),
            hashlib.sha256
        ).hexdigest()

        return token

    def validate_token(self, token, session_id):
        """Validate CSRF token"""
        if not token:
            return False

        # In production, store token in session and compare
        # This is a simplified example
        expected_token = session.get('csrf_token')

        if not expected_token:
            return False

        # Constant-time comparison to prevent timing attacks
        return hmac.compare_digest(token, expected_token)

csrf = CSRFProtection(app.secret_key)

@app.route('/transfer-form')
def transfer_form():
    # Generate CSRF token
    csrf_token = csrf.generate_token(session.get('session_id', ''))
    session['csrf_token'] = csrf_token

    template = '''
    <form action="/transfer" method="POST">
        <input type="hidden" name="csrf_token" value="{{ csrf_token }}">
        <input type="text" name="to_account" placeholder="To Account">
        <input type="number" name="amount" placeholder="Amount">
        <button type="submit">Transfer</button>
    </form>
    '''

    return render_template_string(template, csrf_token=csrf_token)

@app.route('/transfer', methods=['POST'])
def transfer_money_secure():
    if 'user_id' not in session:
        return "Unauthorized", 401

    # Validate CSRF token
    csrf_token = request.form.get('csrf_token')
    if not csrf.validate_token(csrf_token, session.get('session_id', '')):
        return "CSRF validation failed", 403

    # Process transfer
    to_account = request.form.get('to_account')
    amount = request.form.get('amount')

    execute_transfer(session['user_id'], to_account, amount)

    return "Transfer complete"
```

### CSRF Protection with Flask-WTF

```python
# SECURE - Using Flask-WTF for automatic CSRF protection
from flask import Flask, render_template, request
from flask_wtf import FlaskForm, CSRFProtect
from wtforms import StringField, DecimalField, SubmitField
from wtforms.validators import DataRequired, NumberRange

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

# Enable CSRF protection globally
csrf = CSRFProtect(app)

class TransferForm(FlaskForm):
    """Form with automatic CSRF protection"""
    to_account = StringField('To Account', validators=[DataRequired()])
    amount = DecimalField('Amount', validators=[
        DataRequired(),
        NumberRange(min=0.01, max=1000000)
    ])
    submit = SubmitField('Transfer')

@app.route('/transfer', methods=['GET', 'POST'])
def transfer():
    form = TransferForm()

    # CSRF validation happens automatically
    if form.validate_on_submit():
        to_account = form.to_account.data
        amount = form.amount.data

        # Process transfer
        execute_transfer(session['user_id'], to_account, amount)

        return "Transfer complete"

    return render_template('transfer.html', form=form)
```

### Double-Submit Cookie Pattern

```python
# Alternative CSRF protection: Double-Submit Cookie
from flask import Flask, request, make_response
import secrets

app = Flask(__name__)

@app.route('/api/transfer', methods=['POST'])
def transfer_api():
    # Get CSRF token from cookie and header
    cookie_token = request.cookies.get('csrf_token')
    header_token = request.headers.get('X-CSRF-Token')

    # Validate tokens match
    if not cookie_token or not header_token:
        return {'error': 'CSRF token missing'}, 403

    if not hmac.compare_digest(cookie_token, header_token):
        return {'error': 'CSRF validation failed'}, 403

    # Process request
    data = request.json
    execute_transfer(session['user_id'], data['to_account'], data['amount'])

    return {'status': 'success'}

@app.route('/set-csrf-token')
def set_csrf_token():
    response = make_response({'status': 'token set'})

    # Generate and set CSRF token
    csrf_token = secrets.token_hex(32)
    response.set_cookie(
        'csrf_token',
        csrf_token,
        httponly=False,  # JavaScript needs to read this
        secure=True,  # Only send over HTTPS
        samesite='Strict'
    )

    return response
```

## Additional CSRF Defenses

### SameSite Cookie Attribute

```python
# Set SameSite attribute on session cookies
@app.route('/login', methods=['POST'])
def login():
    # ... authentication logic ...

    response = make_response({'status': 'logged in'})
    response.set_cookie(
        'session',
        session_token,
        httponly=True,
        secure=True,
        samesite='Strict'  # Prevents cookie from being sent in cross-site requests
    )

    return response
```

### Custom Request Headers

```javascript
// Client-side: Add custom header to AJAX requests
fetch('/api/transfer', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'  // Custom header
    },
    body: JSON.stringify({
        to_account: '123456',
        amount: 100
    })
});
```

## Summary

XSS and CSRF are prevalent client-side attacks that can be effectively mitigated through proper defensive coding practices. For XSS, the key is context-specific output encoding and input sanitization. For CSRF, implement anti-CSRF tokens, use SameSite cookies, and validate request origins. Combining multiple defense layers provides robust protection.

## Key Takeaways

- Always encode output based on context (HTML, JavaScript, URL, CSS)
- Use Content Security Policy to restrict script execution
- Sanitize stored data before saving and when rendering
- Implement CSRF tokens for state-changing operations
- Use SameSite cookie attribute for additional CSRF protection
- Prefer textContent over innerHTML for DOM manipulation
- Use security libraries (DOMPurify, Flask-WTF, bleach)
- Apply defense-in-depth with multiple security controls
