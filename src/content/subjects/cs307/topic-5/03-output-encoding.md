# Output Encoding

Output encoding is essential for preventing injection attacks by ensuring that user-supplied data is treated as data, not executable code. The encoding method must match the output context (HTML, JavaScript, URL, etc.).

## Context-Aware Encoding

Different output contexts require different encoding schemes to prevent interpretation as code.

### Output Contexts

```
User Input → Validation → Processing → Context-Aware Encoding → Output

┌─────────────────────────────────────────────────────────────┐
│ Context          │ Risk              │ Encoding Needed     │
├─────────────────────────────────────────────────────────────┤
│ HTML Body        │ XSS               │ HTML Entity Encode  │
│ HTML Attribute   │ XSS               │ HTML Attr Encode    │
│ JavaScript       │ XSS, Code Inject  │ JavaScript Encode   │
│ URL Parameter    │ Open Redirect     │ URL Encode          │
│ CSS              │ CSS Injection     │ CSS Encode          │
│ SQL              │ SQL Injection     │ Parameterization    │
└─────────────────────────────────────────────────────────────┘
```

## HTML Encoding

### HTML Entity Encoding

```python
import html
from typing import Dict

class HTMLEncoder:
    """HTML output encoding to prevent XSS"""

    @staticmethod
    def encode_html_content(text: str) -> str:
        """
        Encode for HTML body content
        Converts: < > & " ' to entities
        """
        return html.escape(text, quote=True)

    @staticmethod
    def encode_html_attribute(text: str) -> str:
        """
        Encode for HTML attribute values
        Must be more aggressive than body encoding
        """
        # Use html.escape with quote=True
        encoded = html.escape(text, quote=True)

        # Additional encoding for attributes
        encoded = encoded.replace('\n', '&#10;')
        encoded = encoded.replace('\r', '&#13;')
        encoded = encoded.replace('\t', '&#9;')

        return encoded

    @staticmethod
    def encode_html_dangerous_attrs(attr_name: str, attr_value: str) -> str:
        """
        Special handling for dangerous attributes
        """
        # Event handlers should never contain user input
        dangerous_attrs = ['onclick', 'onerror', 'onload', 'onmouseover']

        if attr_name.lower() in dangerous_attrs:
            raise ValueError(f"User input not allowed in {attr_name} attribute")

        # href and src need URL validation
        if attr_name.lower() in ['href', 'src']:
            return HTMLEncoder.encode_url_attribute(attr_value)

        return HTMLEncoder.encode_html_attribute(attr_value)

    @staticmethod
    def encode_url_attribute(url: str) -> str:
        """
        Encode and validate URL in href/src attributes
        """
        # Prevent javascript: URLs
        if url.strip().lower().startswith('javascript:'):
            raise ValueError("JavaScript URLs not allowed")

        # Prevent data: URLs (can contain scripts)
        if url.strip().lower().startswith('data:'):
            raise ValueError("Data URLs not allowed")

        # Whitelist allowed schemes
        from urllib.parse import urlparse
        parsed = urlparse(url)

        allowed_schemes = ['http', 'https', 'mailto', '']
        if parsed.scheme and parsed.scheme.lower() not in allowed_schemes:
            raise ValueError(f"URL scheme not allowed: {parsed.scheme}")

        return html.escape(url, quote=True)


# Usage examples
class SafeHTMLRenderer:
    """Render user content safely in HTML"""

    def render_user_comment(self, username: str, comment: str) -> str:
        """
        Render user-generated content in HTML
        """
        # Encode for HTML context
        safe_username = HTMLEncoder.encode_html_content(username)
        safe_comment = HTMLEncoder.encode_html_content(comment)

        return f"""
        <div class="comment">
            <strong>{safe_username}</strong>
            <p>{safe_comment}</p>
        </div>
        """

    def render_user_profile_link(self, username: str, profile_url: str) -> str:
        """
        Render link with user input
        """
        # Encode for different contexts
        safe_username = HTMLEncoder.encode_html_content(username)

        try:
            safe_url = HTMLEncoder.encode_url_attribute(profile_url)
        except ValueError:
            # Invalid URL, don't create link
            return f"<span>{safe_username}</span>"

        # Encode for attribute context
        safe_title = HTMLEncoder.encode_html_attribute(f"View {username}'s profile")

        return f'<a href="{safe_url}" title="{safe_title}">{safe_username}</a>'


# DANGEROUS - Examples of what NOT to do
class UnsafeHTMLRenderer:
    """
    VULNERABLE EXAMPLES - DO NOT USE
    For educational purposes only
    """

    def render_comment_vulnerable(self, username: str, comment: str) -> str:
        """
        VULNERABLE: No encoding
        Attack: comment = '<script>alert("XSS")</script>'
        Result: Script executes
        """
        # DON'T DO THIS
        return f"<div><strong>{username}</strong><p>{comment}</p></div>"

    def render_link_vulnerable(self, text: str, url: str) -> str:
        """
        VULNERABLE: No URL validation
        Attack: url = 'javascript:alert("XSS")'
        Result: Script executes on click
        """
        # DON'T DO THIS
        return f'<a href="{url}">{text}</a>'
```

## JavaScript Encoding

### JavaScript Context Encoding

```python
import json
import re

class JavaScriptEncoder:
    """Encoding for JavaScript context"""

    @staticmethod
    def encode_javascript_string(text: str) -> str:
        """
        Encode for JavaScript string context
        Escapes quotes, backslashes, and control characters
        """
        # Use JSON encoding (safe for JS strings)
        # Remove outer quotes from JSON string
        encoded = json.dumps(text)[1:-1]

        return encoded

    @staticmethod
    def encode_javascript_variable(data: any) -> str:
        """
        Encode data for JavaScript variable assignment
        """
        # JSON encoding is safe for JS
        return json.dumps(data)

    @staticmethod
    def render_json_in_script(data: dict) -> str:
        """
        Safely embed JSON in script tag
        """
        # Encode as JSON
        json_str = json.dumps(data)

        # Escape </script> to prevent breaking out
        json_str = json_str.replace('</', '<\\/')

        return json_str


class SafeJavaScriptRenderer:
    """Render JavaScript with user data safely"""

    def render_inline_script(self, user_data: dict) -> str:
        """
        Render inline script with user data
        """
        safe_json = JavaScriptEncoder.render_json_in_script(user_data)

        return f"""
        <script>
            const userData = {safe_json};
            // Use userData safely
            console.log(userData);
        </script>
        """

    def render_data_attribute(self, data: dict) -> str:
        """
        Better approach: Use data attributes instead of inline scripts
        """
        safe_json = HTMLEncoder.encode_html_attribute(json.dumps(data))

        return f"""
        <div id="user-data" data-user='{safe_json}'></div>
        <script>
            // Parse in external script
            const elem = document.getElementById('user-data');
            const userData = JSON.parse(elem.dataset.user);
        </script>
        """


# DANGEROUS - Examples of what NOT to do
class UnsafeJavaScriptRenderer:
    """
    VULNERABLE EXAMPLES - DO NOT USE
    """

    def render_script_vulnerable(self, username: str) -> str:
        """
        VULNERABLE: Direct interpolation
        Attack: username = '"; alert("XSS"); //'
        Result: Script injection
        """
        # DON'T DO THIS
        return f"""
        <script>
            var username = "{username}";
            console.log(username);
        </script>
        """

    def render_event_handler_vulnerable(self, message: str) -> str:
        """
        VULNERABLE: User input in event handler
        Attack: message = 'test"; alert("XSS"); //'
        Result: Script injection
        """
        # DON'T DO THIS - Never put user input in event handlers
        return f'<button onclick="alert(\'{message}\')">Click</button>'
```

## URL Encoding

### URL Context Encoding

```python
from urllib.parse import quote, quote_plus, urlencode, urlparse, urlunparse

class URLEncoder:
    """URL encoding for different contexts"""

    @staticmethod
    def encode_url_parameter(value: str) -> str:
        """
        Encode for URL query parameter value
        """
        # Percent-encode special characters
        return quote(value, safe='')

    @staticmethod
    def encode_url_path_segment(segment: str) -> str:
        """
        Encode for URL path segment
        """
        # Encode but allow /
        return quote(segment, safe='')

    @staticmethod
    def build_url_with_params(base_url: str, params: dict) -> str:
        """
        Build URL with parameters safely
        """
        # Validate base URL
        parsed = urlparse(base_url)

        if parsed.scheme not in ['http', 'https']:
            raise ValueError("Only HTTP/HTTPS URLs allowed")

        # Encode parameters
        query_string = urlencode(params)

        # Reconstruct URL
        return f"{base_url}?{query_string}"

    @staticmethod
    def validate_redirect_url(url: str, allowed_domains: list) -> str:
        """
        Validate redirect URL to prevent open redirect
        """
        parsed = urlparse(url)

        # Relative URLs are OK
        if not parsed.netloc:
            return url

        # Check against whitelist
        if parsed.netloc not in allowed_domains:
            raise ValueError(f"Redirect to {parsed.netloc} not allowed")

        # Only allow HTTP/HTTPS
        if parsed.scheme not in ['http', 'https']:
            raise ValueError("Only HTTP/HTTPS redirects allowed")

        return url


class SafeURLHandler:
    """Handle URLs with user input safely"""

    def __init__(self, allowed_domains: list):
        self.allowed_domains = allowed_domains

    def create_search_url(self, query: str, page: int = 1) -> str:
        """
        Create search URL with user query
        """
        base_url = "https://example.com/search"

        params = {
            'q': query,  # Automatically encoded by urlencode
            'page': page
        }

        return URLEncoder.build_url_with_params(base_url, params)

    def handle_redirect(self, redirect_url: str) -> str:
        """
        Handle redirect with validation
        """
        try:
            # Validate before redirecting
            safe_url = URLEncoder.validate_redirect_url(
                redirect_url,
                self.allowed_domains
            )
            return safe_url

        except ValueError:
            # Invalid redirect, go to default page
            return "https://example.com/home"

    def render_link_with_params(self, text: str, url: str, params: dict) -> str:
        """
        Render HTML link with URL parameters
        """
        # Build URL with encoded parameters
        full_url = URLEncoder.build_url_with_params(url, params)

        # HTML encode the URL for attribute context
        safe_url = HTMLEncoder.encode_html_attribute(full_url)
        safe_text = HTMLEncoder.encode_html_content(text)

        return f'<a href="{safe_url}">{safe_text}</a>'
```

## CSS Encoding

### CSS Context Encoding

```python
import re

class CSSEncoder:
    """Encoding for CSS context"""

    @staticmethod
    def encode_css_string(text: str) -> str:
        """
        Encode for CSS string context
        """
        # Escape backslashes and quotes
        encoded = text.replace('\\', '\\\\')
        encoded = encoded.replace('"', '\\"')
        encoded = encoded.replace("'", "\\'")

        # Escape newlines
        encoded = encoded.replace('\n', '\\A ')
        encoded = encoded.replace('\r', '\\D ')

        return encoded

    @staticmethod
    def validate_css_color(color: str) -> str:
        """
        Validate CSS color value (whitelist approach)
        """
        # Hex color
        if re.match(r'^#[0-9A-Fa-f]{3,6}$', color):
            return color

        # RGB/RGBA
        if re.match(r'^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$', color):
            return color

        # Named colors (partial list)
        named_colors = {
            'black', 'white', 'red', 'green', 'blue',
            'yellow', 'purple', 'orange', 'gray'
        }
        if color.lower() in named_colors:
            return color

        raise ValueError("Invalid color value")

    @staticmethod
    def validate_css_size(size: str) -> str:
        """
        Validate CSS size value
        """
        # Allow number with unit
        if re.match(r'^\d+(\.\d+)?(px|em|rem|%|vh|vw)$', size):
            return size

        raise ValueError("Invalid size value")


class SafeCSSRenderer:
    """Render CSS with user input safely"""

    def render_user_style(self, user_color: str, user_size: str) -> str:
        """
        Render inline style with validation
        WARNING: Avoid user-controlled CSS when possible
        """
        try:
            # Validate color
            safe_color = CSSEncoder.validate_css_color(user_color)
            safe_size = CSSEncoder.validate_css_size(user_size)

            # Build style attribute
            style = f"color: {safe_color}; font-size: {safe_size};"

            # Still HTML-encode for attribute context
            return HTMLEncoder.encode_html_attribute(style)

        except ValueError:
            # Use default style if validation fails
            return "color: black; font-size: 14px;"
```

## Complete Example

### Multi-Context Encoding

```python
class SafeWebPage:
    """Complete example with multiple encoding contexts"""

    def render_search_results(self, query: str, results: list) -> str:
        """
        Render search page with multiple encoding contexts
        """
        # HTML encode query for display
        safe_query_html = HTMLEncoder.encode_html_content(query)

        # JavaScript encode query for analytics
        safe_query_js = JavaScriptEncoder.encode_javascript_string(query)

        # URL encode query for pagination
        safe_query_url = URLEncoder.encode_url_parameter(query)

        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Search Results for {safe_query_html}</title>
        </head>
        <body>
            <h1>Results for "{safe_query_html}"</h1>

            <div class="results">
        """

        # Render each result
        for result in results:
            safe_title = HTMLEncoder.encode_html_content(result['title'])
            safe_url = HTMLEncoder.encode_url_attribute(result['url'])
            safe_snippet = HTMLEncoder.encode_html_content(result['snippet'])

            html += f"""
                <div class="result">
                    <h2><a href="{safe_url}">{safe_title}</a></h2>
                    <p>{safe_snippet}</p>
                </div>
            """

        # Pagination with encoded query
        html += f"""
            </div>

            <div class="pagination">
                <a href="/search?q={safe_query_url}&page=2">Next Page</a>
            </div>

            <script>
                // Analytics tracking
                const searchQuery = "{safe_query_js}";
                console.log("Search performed:", searchQuery);
            </script>
        </body>
        </html>
        """

        return html

    def render_user_profile(self, user: dict) -> str:
        """
        Render user profile with mixed content
        """
        # Different encoding for different contexts
        safe_name = HTMLEncoder.encode_html_content(user['name'])
        safe_bio = HTMLEncoder.encode_html_content(user['bio'])
        safe_website = HTMLEncoder.encode_url_attribute(user['website'])

        # JSON for client-side
        user_data = {
            'id': user['id'],
            'name': user['name'],
            'followers': user['followers']
        }
        safe_json = JavaScriptEncoder.render_json_in_script(user_data)

        return f"""
        <div class="profile">
            <h1>{safe_name}</h1>
            <p class="bio">{safe_bio}</p>
            <a href="{safe_website}">Website</a>

            <script>
                const userProfile = {safe_json};
                // Initialize profile widget
                initProfile(userProfile);
            </script>
        </div>
        """
```

## Content Security Policy

CSP provides an additional layer of defense against XSS by restricting what can execute.

```python
class CSPHandler:
    """Content Security Policy configuration"""

    @staticmethod
    def get_strict_csp_header() -> str:
        """
        Generate strict CSP header
        """
        policy = [
            "default-src 'self'",
            "script-src 'self'",  # No inline scripts
            "style-src 'self'",   # No inline styles
            "img-src 'self' https:",
            "font-src 'self'",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'"
        ]

        return '; '.join(policy)

    @staticmethod
    def get_csp_with_nonce(nonce: str) -> str:
        """
        CSP allowing inline scripts with nonce
        Better than 'unsafe-inline'
        """
        policy = [
            "default-src 'self'",
            f"script-src 'self' 'nonce-{nonce}'",
            f"style-src 'self' 'nonce-{nonce}'",
            "img-src 'self' https:",
            "font-src 'self'",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'"
        ]

        return '; '.join(policy)
```

## Summary

Output encoding prevents injection attacks by ensuring user data cannot be interpreted as code:

- **Context-Aware Encoding**: Different contexts (HTML, JavaScript, URL, CSS) require different encoding
- **HTML Encoding**: Encode `< > & " '` to entities for HTML context
- **JavaScript Encoding**: Use JSON encoding for JavaScript context, avoid inline event handlers
- **URL Encoding**: Percent-encode special characters, validate redirect URLs
- **CSS Encoding**: Validate color/size values, avoid user-controlled CSS when possible
- **Defense in Depth**: Combine encoding with validation, CSP, and other security controls

Always encode output based on the context where it will be used. Encoding is not optional - it's required for every piece of user-controlled data that appears in output.
