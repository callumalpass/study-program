import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'cs302-t7-ex01',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'HTTP Request Parser',
    difficulty: 2,
    description: 'Parse an HTTP request line. Extract method, path, and HTTP version.',
    starterCode: '# Parse HTTP request line\ndef parse_request_line(line):\n    # Return dict with: method, path, version\n    pass\n\n# Test your function\nprint(parse_request_line("GET /index.html HTTP/1.1"))\nprint(parse_request_line("POST /api/users HTTP/1.1"))',
    solution: 'def parse_request_line(line):\n    parts = line.strip().split(" ")\n    if len(parts) != 3:\n        return None\n    return {\n        "method": parts[0],\n        "path": parts[1],\n        "version": parts[2]\n    }\n\nprint(parse_request_line("GET /index.html HTTP/1.1"))\nprint(parse_request_line("POST /api/users HTTP/1.1"))',
    testCases: [
      { input: '"GET /index.html HTTP/1.1"', isHidden: false, description: 'GET request' },
      { input: '"POST /api/users HTTP/1.1"', isHidden: false, description: 'POST request' },
      { input: '"DELETE /api/item/5 HTTP/1.1"', isHidden: true, description: 'DELETE request' }
    ],
    hints: [
      'Request line format: METHOD PATH HTTP/VERSION',
      'Split by spaces',
      'Exactly 3 parts expected',
      'Common methods: GET, POST, PUT, DELETE'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex02',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'HTTP Header Parser',
    difficulty: 2,
    description: 'Parse HTTP headers from a string. Return a dictionary of header names to values.',
    starterCode: '# Parse HTTP headers\ndef parse_headers(header_text):\n    # Return dict of header: value pairs\n    pass\n\n# Test your function\nheaders = """Host: example.com\nContent-Type: application/json\nContent-Length: 42"""\nprint(parse_headers(headers))',
    solution: 'def parse_headers(header_text):\n    headers = {}\n    for line in header_text.strip().split("\\n"):\n        if ":" in line:\n            name, value = line.split(":", 1)\n            headers[name.strip()] = value.strip()\n    return headers\n\nheaders = """Host: example.com\nContent-Type: application/json\nContent-Length: 42"""\nprint(parse_headers(headers))',
    testCases: [
      { input: 'standard headers', isHidden: false, description: 'Parse three headers' },
      { input: 'header with colon in value', isHidden: true, description: 'Handle colons' }
    ],
    hints: [
      'Headers format: Name: Value',
      'Split on first colon only',
      'Strip whitespace from both parts',
      'One header per line'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex03',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'HTTP Response Builder',
    difficulty: 3,
    description: 'Build an HTTP response with status line, headers, and body.',
    starterCode: '# Build HTTP response\ndef build_response(status_code, headers, body):\n    # Return complete HTTP response string\n    pass\n\n# Test your function\nresponse = build_response(\n    200,\n    {"Content-Type": "text/html"},\n    "<h1>Hello</h1>"\n)\nprint(response)',
    solution: 'def build_response(status_code, headers, body):\n    status_messages = {\n        200: "OK",\n        201: "Created",\n        400: "Bad Request",\n        404: "Not Found",\n        500: "Internal Server Error"\n    }\n    status_msg = status_messages.get(status_code, "Unknown")\n    \n    # Add Content-Length if not present\n    if "Content-Length" not in headers:\n        headers["Content-Length"] = len(body.encode() if isinstance(body, str) else body)\n    \n    # Build response\n    lines = [f"HTTP/1.1 {status_code} {status_msg}"]\n    for name, value in headers.items():\n        lines.append(f"{name}: {value}")\n    lines.append("")  # Empty line before body\n    lines.append(body)\n    \n    return "\\r\\n".join(lines)\n\nresponse = build_response(\n    200,\n    {"Content-Type": "text/html"},\n    "<h1>Hello</h1>"\n)\nprint(response)',
    testCases: [
      { input: '200 OK response', isHidden: false, description: 'Success response' },
      { input: '404 Not Found', isHidden: true, description: 'Error response' }
    ],
    hints: [
      'Status line: HTTP/1.1 CODE MESSAGE',
      'Headers: Name: Value (one per line)',
      'Blank line separates headers from body',
      'Use \\r\\n for line endings in HTTP'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex04',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'URL Parser',
    difficulty: 2,
    description: 'Parse a URL into its components: scheme, host, port, path, and query string.',
    starterCode: '# Parse URL components\ndef parse_url(url):\n    # Return dict with: scheme, host, port, path, query\n    pass\n\n# Test your function\nprint(parse_url("https://example.com:8080/api/users?id=5"))\nprint(parse_url("http://localhost/index.html"))',
    solution: 'def parse_url(url):\n    result = {\n        "scheme": "",\n        "host": "",\n        "port": None,\n        "path": "/",\n        "query": ""\n    }\n    \n    # Extract scheme\n    if "://" in url:\n        result["scheme"], url = url.split("://", 1)\n    \n    # Extract path and query\n    if "/" in url:\n        host_part, path_part = url.split("/", 1)\n        result["path"] = "/" + path_part\n    else:\n        host_part = url\n    \n    # Extract query\n    if "?" in result["path"]:\n        result["path"], result["query"] = result["path"].split("?", 1)\n    \n    # Extract port\n    if ":" in host_part:\n        result["host"], port = host_part.split(":")\n        result["port"] = int(port)\n    else:\n        result["host"] = host_part\n        # Default ports\n        if result["scheme"] == "https":\n            result["port"] = 443\n        elif result["scheme"] == "http":\n            result["port"] = 80\n    \n    return result\n\nprint(parse_url("https://example.com:8080/api/users?id=5"))\nprint(parse_url("http://localhost/index.html"))',
    testCases: [
      { input: 'full URL with port and query', isHidden: false, description: 'All components' },
      { input: 'simple URL', isHidden: false, description: 'Default port' },
      { input: 'URL without path', isHidden: true, description: 'Default path' }
    ],
    hints: [
      'Split on :// for scheme',
      'Split on first / for host vs path',
      'Split on ? for path vs query',
      'Default port: 80 for http, 443 for https'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex05',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'Query String Parser',
    difficulty: 2,
    description: 'Parse URL query string into key-value pairs. Handle URL encoding.',
    starterCode: 'from urllib.parse import unquote\n\n# Parse query string\ndef parse_query_string(query):\n    # Return dict of key: value pairs\n    pass\n\n# Test your function\nprint(parse_query_string("name=John&age=25&city=New%20York"))\nprint(parse_query_string("search=hello+world&page=1"))',
    solution: 'from urllib.parse import unquote_plus\n\ndef parse_query_string(query):\n    if not query:\n        return {}\n    \n    params = {}\n    for pair in query.split("&"):\n        if "=" in pair:\n            key, value = pair.split("=", 1)\n            # Decode URL encoding (+ and %XX)\n            params[unquote_plus(key)] = unquote_plus(value)\n        else:\n            params[pair] = ""\n    return params\n\nprint(parse_query_string("name=John&age=25&city=New%20York"))\nprint(parse_query_string("search=hello+world&page=1"))',
    testCases: [
      { input: 'simple params', isHidden: false, description: 'Parse key=value pairs' },
      { input: 'URL encoded', isHidden: false, description: 'Decode %20 and +' },
      { input: 'empty value', isHidden: true, description: 'Handle missing value' }
    ],
    hints: [
      'Split on & for each parameter',
      'Split on = for key/value',
      '%20 and + both represent space',
      'Use unquote_plus for decoding'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex06',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'DNS Query Builder',
    difficulty: 4,
    description: 'Build a simplified DNS query message. Create header and question section.',
    starterCode: 'import struct\nimport random\n\n# Build DNS query for a domain\ndef build_dns_query(domain, query_type="A"):\n    # Return bytes representing DNS query\n    pass\n\n# Test your function\nquery = build_dns_query("example.com")\nprint(query.hex())',
    solution: 'import struct\nimport random\n\ndef build_dns_query(domain, query_type="A"):\n    # Query types\n    qtypes = {"A": 1, "AAAA": 28, "MX": 15, "CNAME": 5, "NS": 2}\n    qtype = qtypes.get(query_type, 1)\n    \n    # Header (12 bytes)\n    transaction_id = random.randint(0, 65535)\n    flags = 0x0100  # Standard query, recursion desired\n    questions = 1\n    answers = 0\n    authority = 0\n    additional = 0\n    \n    header = struct.pack(">HHHHHH",\n        transaction_id, flags, questions, answers, authority, additional)\n    \n    # Question section\n    question = b""\n    for part in domain.split("."):\n        question += struct.pack("B", len(part)) + part.encode()\n    question += b"\\x00"  # Null terminator\n    question += struct.pack(">HH", qtype, 1)  # Type and class (IN=1)\n    \n    return header + question\n\nquery = build_dns_query("example.com")\nprint(query.hex())',
    testCases: [
      { input: 'example.com', isHidden: false, description: 'A record query' },
      { input: 'MX query', isHidden: true, description: 'Mail server query' }
    ],
    hints: [
      'DNS header is 12 bytes',
      'Domain encoded as length-prefixed labels',
      'example.com -> 7example3com0',
      'QType 1=A, QClass 1=IN'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex07',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'SMTP Command Parser',
    difficulty: 2,
    description: 'Parse SMTP commands and their arguments. Support HELO, MAIL FROM, RCPT TO, DATA.',
    starterCode: '# Parse SMTP command\ndef parse_smtp_command(line):\n    # Return dict with: command, argument\n    pass\n\n# Test your function\nprint(parse_smtp_command("HELO mail.example.com"))\nprint(parse_smtp_command("MAIL FROM:<sender@example.com>"))\nprint(parse_smtp_command("RCPT TO:<recipient@example.com>"))',
    solution: 'def parse_smtp_command(line):\n    line = line.strip()\n    \n    # Handle commands with special formats\n    if line.upper().startswith("MAIL FROM:"):\n        return {"command": "MAIL FROM", "argument": line[10:].strip("<>")}\n    elif line.upper().startswith("RCPT TO:"):\n        return {"command": "RCPT TO", "argument": line[8:].strip("<>")}\n    \n    # General command parsing\n    parts = line.split(" ", 1)\n    command = parts[0].upper()\n    argument = parts[1] if len(parts) > 1 else ""\n    \n    return {"command": command, "argument": argument}\n\nprint(parse_smtp_command("HELO mail.example.com"))\nprint(parse_smtp_command("MAIL FROM:<sender@example.com>"))\nprint(parse_smtp_command("RCPT TO:<recipient@example.com>"))',
    testCases: [
      { input: 'HELO command', isHidden: false, description: 'Simple command' },
      { input: 'MAIL FROM', isHidden: false, description: 'Email address' },
      { input: 'DATA', isHidden: true, description: 'No argument' }
    ],
    hints: [
      'SMTP commands are case-insensitive',
      'MAIL FROM and RCPT TO have special format',
      'Remove angle brackets from addresses',
      'Split on first space for general commands'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex08',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'FTP Response Parser',
    difficulty: 2,
    description: 'Parse FTP server responses. Extract status code and message.',
    starterCode: '# Parse FTP response\ndef parse_ftp_response(response):\n    # Return dict with: code, message, is_multiline\n    pass\n\n# Test your function\nprint(parse_ftp_response("220 Welcome to FTP server"))\nprint(parse_ftp_response("150-Opening data connection\\n150 for file transfer"))',
    solution: 'def parse_ftp_response(response):\n    lines = response.strip().split("\\n")\n    first_line = lines[0]\n    \n    # Check for multi-line response (code followed by -)\n    if len(first_line) >= 4 and first_line[3] == "-":\n        code = int(first_line[:3])\n        # Multi-line: collect until line starts with "code "\n        messages = [first_line[4:]]\n        for line in lines[1:]:\n            if line.startswith(f"{code} "):\n                messages.append(line[4:])\n                break\n            messages.append(line)\n        return {\n            "code": code,\n            "message": "\\n".join(messages),\n            "is_multiline": True\n        }\n    else:\n        code = int(first_line[:3])\n        message = first_line[4:] if len(first_line) > 4 else ""\n        return {\n            "code": code,\n            "message": message,\n            "is_multiline": False\n        }\n\nprint(parse_ftp_response("220 Welcome to FTP server"))\nprint(parse_ftp_response("150-Opening data connection\\n150 for file transfer"))',
    testCases: [
      { input: 'single line response', isHidden: false, description: 'Simple response' },
      { input: 'multi-line response', isHidden: true, description: 'Code-message format' }
    ],
    hints: [
      'FTP response: 3-digit code + space + message',
      'Multi-line: code + hyphen, ends with code + space',
      'Code ranges: 1xx=info, 2xx=success, 4xx/5xx=error',
      'Extract code as integer'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex09',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'Cookie Parser',
    difficulty: 3,
    description: 'Parse HTTP Set-Cookie header. Extract cookie name, value, and attributes.',
    starterCode: '# Parse Set-Cookie header\ndef parse_cookie(set_cookie):\n    # Return dict with: name, value, attributes\n    pass\n\n# Test your function\nprint(parse_cookie("session=abc123; Path=/; HttpOnly; Secure"))\nprint(parse_cookie("user=john; Expires=Wed, 09 Jun 2025 10:18:14 GMT; Domain=.example.com"))',
    solution: 'def parse_cookie(set_cookie):\n    parts = set_cookie.split(";")\n    \n    # First part is name=value\n    name_value = parts[0].strip()\n    if "=" in name_value:\n        name, value = name_value.split("=", 1)\n    else:\n        name, value = name_value, ""\n    \n    # Parse attributes\n    attributes = {}\n    for part in parts[1:]:\n        part = part.strip()\n        if "=" in part:\n            attr_name, attr_value = part.split("=", 1)\n            attributes[attr_name.lower()] = attr_value\n        else:\n            attributes[part.lower()] = True\n    \n    return {\n        "name": name.strip(),\n        "value": value.strip(),\n        "attributes": attributes\n    }\n\nprint(parse_cookie("session=abc123; Path=/; HttpOnly; Secure"))\nprint(parse_cookie("user=john; Expires=Wed, 09 Jun 2025 10:18:14 GMT; Domain=.example.com"))',
    testCases: [
      { input: 'cookie with flags', isHidden: false, description: 'HttpOnly, Secure' },
      { input: 'cookie with expires', isHidden: true, description: 'Date attribute' }
    ],
    hints: [
      'Format: name=value; attr1; attr2=value2',
      'First part is always name=value',
      'Attributes may or may not have values',
      'HttpOnly, Secure are flag attributes'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex10',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'JSON-RPC Request Builder',
    difficulty: 3,
    description: 'Build JSON-RPC 2.0 request messages. Include method, params, and id.',
    starterCode: 'import json\n\n# Build JSON-RPC request\ndef build_jsonrpc_request(method, params=None, request_id=1):\n    # Return JSON string\n    pass\n\n# Test your function\nprint(build_jsonrpc_request("getUser", {"id": 5}))\nprint(build_jsonrpc_request("listItems", [1, 2, 3], 42))',
    solution: 'import json\n\ndef build_jsonrpc_request(method, params=None, request_id=1):\n    request = {\n        "jsonrpc": "2.0",\n        "method": method,\n        "id": request_id\n    }\n    if params is not None:\n        request["params"] = params\n    return json.dumps(request)\n\nprint(build_jsonrpc_request("getUser", {"id": 5}))\nprint(build_jsonrpc_request("listItems", [1, 2, 3], 42))',
    testCases: [
      { input: 'named params', isHidden: false, description: 'Object params' },
      { input: 'positional params', isHidden: false, description: 'Array params' },
      { input: 'no params', isHidden: true, description: 'Method only' }
    ],
    hints: [
      'JSON-RPC 2.0 requires "jsonrpc": "2.0"',
      'method and id are required',
      'params is optional (object or array)',
      'Use json.dumps for encoding'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex11',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'WebSocket Frame Parser',
    difficulty: 4,
    description: 'Parse a WebSocket frame header. Extract fin, opcode, mask flag, and payload length.',
    starterCode: '# Parse WebSocket frame header\ndef parse_ws_header(header_bytes):\n    # Return dict with: fin, opcode, masked, payload_len\n    pass\n\n# Test your function\n# Binary: 10000001 00000101 = FIN=1, opcode=1 (text), len=5\nheader = bytes([0x81, 0x05])\nprint(parse_ws_header(header))',
    solution: 'def parse_ws_header(header_bytes):\n    if len(header_bytes) < 2:\n        return None\n    \n    byte1 = header_bytes[0]\n    byte2 = header_bytes[1]\n    \n    fin = (byte1 >> 7) & 1\n    opcode = byte1 & 0x0F\n    masked = (byte2 >> 7) & 1\n    payload_len = byte2 & 0x7F\n    \n    opcodes = {\n        0: "continuation",\n        1: "text",\n        2: "binary",\n        8: "close",\n        9: "ping",\n        10: "pong"\n    }\n    \n    return {\n        "fin": bool(fin),\n        "opcode": opcode,\n        "opcode_name": opcodes.get(opcode, "unknown"),\n        "masked": bool(masked),\n        "payload_len": payload_len\n    }\n\nheader = bytes([0x81, 0x05])\nprint(parse_ws_header(header))',
    testCases: [
      { input: 'text frame', isHidden: false, description: 'FIN=1, opcode=1' },
      { input: 'masked frame', isHidden: true, description: 'Client to server' }
    ],
    hints: [
      'Byte 1: FIN(1) + RSV(3) + opcode(4)',
      'Byte 2: MASK(1) + payload_len(7)',
      'Opcode 1=text, 2=binary, 8=close',
      'Client-to-server frames must be masked'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex12',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'MIME Type Detector',
    difficulty: 2,
    description: 'Detect MIME type from file extension or magic bytes.',
    starterCode: '# Detect MIME type\ndef detect_mime_type(filename=None, data=None):\n    # Return MIME type string\n    pass\n\n# Test your function\nprint(detect_mime_type(filename="image.png"))\nprint(detect_mime_type(filename="document.pdf"))\nprint(detect_mime_type(data=b"\\x89PNG\\r\\n\\x1a\\n"))',
    solution: 'def detect_mime_type(filename=None, data=None):\n    # Extension mapping\n    extensions = {\n        ".html": "text/html",\n        ".htm": "text/html",\n        ".css": "text/css",\n        ".js": "application/javascript",\n        ".json": "application/json",\n        ".xml": "application/xml",\n        ".txt": "text/plain",\n        ".png": "image/png",\n        ".jpg": "image/jpeg",\n        ".jpeg": "image/jpeg",\n        ".gif": "image/gif",\n        ".svg": "image/svg+xml",\n        ".pdf": "application/pdf",\n        ".zip": "application/zip"\n    }\n    \n    # Magic bytes\n    magic = {\n        b"\\x89PNG\\r\\n\\x1a\\n": "image/png",\n        b"\\xff\\xd8\\xff": "image/jpeg",\n        b"GIF87a": "image/gif",\n        b"GIF89a": "image/gif",\n        b"%PDF": "application/pdf",\n        b"PK\\x03\\x04": "application/zip"\n    }\n    \n    # Check magic bytes first\n    if data:\n        for signature, mime in magic.items():\n            if data.startswith(signature):\n                return mime\n    \n    # Check extension\n    if filename:\n        ext = "." + filename.split(".")[-1].lower() if "." in filename else ""\n        return extensions.get(ext, "application/octet-stream")\n    \n    return "application/octet-stream"\n\nprint(detect_mime_type(filename="image.png"))\nprint(detect_mime_type(filename="document.pdf"))\nprint(detect_mime_type(data=b"\\x89PNG\\r\\n\\x1a\\n"))',
    testCases: [
      { input: 'filename with extension', isHidden: false, description: 'By extension' },
      { input: 'magic bytes', isHidden: true, description: 'By content' }
    ],
    hints: [
      'Map file extensions to MIME types',
      'Magic bytes: first few bytes identify format',
      'PNG starts with \\x89PNG',
      'Default: application/octet-stream'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex13',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'HTTP Basic Auth Encoder',
    difficulty: 2,
    description: 'Encode and decode HTTP Basic Authentication credentials.',
    starterCode: 'import base64\n\n# Encode Basic Auth\ndef encode_basic_auth(username, password):\n    # Return Authorization header value\n    pass\n\n# Decode Basic Auth\ndef decode_basic_auth(auth_header):\n    # Return (username, password) or None\n    pass\n\n# Test your functions\nauth = encode_basic_auth("admin", "secret")\nprint(auth)\nprint(decode_basic_auth(auth))',
    solution: 'import base64\n\ndef encode_basic_auth(username, password):\n    credentials = f"{username}:{password}"\n    encoded = base64.b64encode(credentials.encode()).decode()\n    return f"Basic {encoded}"\n\ndef decode_basic_auth(auth_header):\n    if not auth_header.startswith("Basic "):\n        return None\n    try:\n        encoded = auth_header[6:]\n        decoded = base64.b64decode(encoded).decode()\n        username, password = decoded.split(":", 1)\n        return (username, password)\n    except Exception:\n        return None\n\nauth = encode_basic_auth("admin", "secret")\nprint(auth)\nprint(decode_basic_auth(auth))',
    testCases: [
      { input: 'encode admin:secret', isHidden: false, description: 'Encode credentials' },
      { input: 'decode back', isHidden: false, description: 'Decode header' },
      { input: 'password with colon', isHidden: true, description: 'Handle special chars' }
    ],
    hints: [
      'Format: "Basic " + base64(username:password)',
      'Use base64.b64encode for encoding',
      'Split on first colon when decoding',
      'Password can contain colons'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex14',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'HTTP Cache Control Parser',
    difficulty: 3,
    description: 'Parse HTTP Cache-Control header directives.',
    starterCode: '# Parse Cache-Control header\ndef parse_cache_control(header):\n    # Return dict of directives\n    pass\n\n# Test your function\nprint(parse_cache_control("max-age=3600, no-cache, private"))\nprint(parse_cache_control("public, max-age=86400, s-maxage=3600"))',
    solution: 'def parse_cache_control(header):\n    directives = {}\n    \n    for part in header.split(","):\n        part = part.strip().lower()\n        if "=" in part:\n            name, value = part.split("=", 1)\n            # Try to convert to int if possible\n            try:\n                value = int(value)\n            except ValueError:\n                pass\n            directives[name.strip()] = value\n        else:\n            directives[part] = True\n    \n    return directives\n\nprint(parse_cache_control("max-age=3600, no-cache, private"))\nprint(parse_cache_control("public, max-age=86400, s-maxage=3600"))',
    testCases: [
      { input: 'max-age and flags', isHidden: false, description: 'Mixed directives' },
      { input: 'multiple max-age types', isHidden: true, description: 's-maxage' }
    ],
    hints: [
      'Directives separated by commas',
      'Some have values (max-age=3600)',
      'Some are flags (no-cache, private)',
      'Convert numeric values to int'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex15',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'REST API Router',
    difficulty: 4,
    description: 'Implement a simple REST API router. Match URL patterns and extract path parameters.',
    starterCode: 'class Router:\n    def __init__(self):\n        self.routes = []  # (method, pattern, handler_name)\n    \n    def add_route(self, method, pattern, handler):\n        # pattern like "/users/:id"\n        pass\n    \n    def match(self, method, path):\n        # Return (handler, params) or None\n        pass\n\n# Test your class\nrouter = Router()\nrouter.add_route("GET", "/users", "list_users")\nrouter.add_route("GET", "/users/:id", "get_user")\nrouter.add_route("POST", "/users", "create_user")\n\nprint(router.match("GET", "/users"))\nprint(router.match("GET", "/users/42"))\nprint(router.match("POST", "/users"))',
    solution: 'import re\n\nclass Router:\n    def __init__(self):\n        self.routes = []\n    \n    def add_route(self, method, pattern, handler):\n        # Convert :param to regex capture group\n        regex_pattern = pattern\n        param_names = []\n        \n        # Find all :param patterns\n        for match in re.finditer(r":([a-zA-Z_]+)", pattern):\n            param_names.append(match.group(1))\n        \n        # Replace :param with regex\n        regex_pattern = re.sub(r":([a-zA-Z_]+)", r"([^/]+)", pattern)\n        regex_pattern = f"^{regex_pattern}$"\n        \n        self.routes.append((method, regex_pattern, param_names, handler))\n    \n    def match(self, method, path):\n        for route_method, pattern, param_names, handler in self.routes:\n            if route_method != method:\n                continue\n            match = re.match(pattern, path)\n            if match:\n                params = dict(zip(param_names, match.groups()))\n                return (handler, params)\n        return None\n\nrouter = Router()\nrouter.add_route("GET", "/users", "list_users")\nrouter.add_route("GET", "/users/:id", "get_user")\nrouter.add_route("POST", "/users", "create_user")\n\nprint(router.match("GET", "/users"))\nprint(router.match("GET", "/users/42"))\nprint(router.match("POST", "/users"))',
    testCases: [
      { input: 'exact match', isHidden: false, description: 'Static route' },
      { input: 'param extraction', isHidden: false, description: ':id parameter' },
      { input: 'method mismatch', isHidden: true, description: 'Wrong method' }
    ],
    hints: [
      'Convert :param to regex capture groups',
      'Match method and path separately',
      'Extract captured groups as params',
      'First matching route wins'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t7-ex16',
    subjectId: 'cs302',
    topicId: 'cs302-topic-7',
    title: 'TLS Certificate Parser',
    difficulty: 4,
    description: 'Parse basic X.509 certificate information (simplified). Extract subject, issuer, and validity.',
    starterCode: '# Simplified certificate parser (from dict representation)\ndef parse_certificate(cert_dict):\n    # cert_dict simulates parsed ASN.1 structure\n    # Return dict with: subject_cn, issuer_cn, valid_from, valid_to, is_expired\n    pass\n\n# Test with simulated certificate data\nfrom datetime import datetime, timedelta\n\ncert = {\n    "subject": {"CN": "example.com", "O": "Example Inc"},\n    "issuer": {"CN": "Root CA", "O": "Certificate Authority"},\n    "not_before": datetime.now() - timedelta(days=30),\n    "not_after": datetime.now() + timedelta(days=335)\n}\nprint(parse_certificate(cert))',
    solution: 'from datetime import datetime\n\ndef parse_certificate(cert_dict):\n    now = datetime.now()\n    \n    subject = cert_dict.get("subject", {})\n    issuer = cert_dict.get("issuer", {})\n    not_before = cert_dict.get("not_before")\n    not_after = cert_dict.get("not_after")\n    \n    is_expired = False\n    is_not_yet_valid = False\n    \n    if not_after and now > not_after:\n        is_expired = True\n    if not_before and now < not_before:\n        is_not_yet_valid = True\n    \n    days_until_expiry = None\n    if not_after:\n        delta = not_after - now\n        days_until_expiry = delta.days\n    \n    return {\n        "subject_cn": subject.get("CN"),\n        "subject_org": subject.get("O"),\n        "issuer_cn": issuer.get("CN"),\n        "issuer_org": issuer.get("O"),\n        "valid_from": not_before.isoformat() if not_before else None,\n        "valid_to": not_after.isoformat() if not_after else None,\n        "is_expired": is_expired,\n        "is_not_yet_valid": is_not_yet_valid,\n        "days_until_expiry": days_until_expiry\n    }\n\nfrom datetime import timedelta\ncert = {\n    "subject": {"CN": "example.com", "O": "Example Inc"},\n    "issuer": {"CN": "Root CA", "O": "Certificate Authority"},\n    "not_before": datetime.now() - timedelta(days=30),\n    "not_after": datetime.now() + timedelta(days=335)\n}\nprint(parse_certificate(cert))',
    testCases: [
      { input: 'valid certificate', isHidden: false, description: 'Extract fields' },
      { input: 'expired certificate', isHidden: true, description: 'Check expiry' }
    ],
    hints: [
      'CN = Common Name (domain or entity)',
      'O = Organization',
      'not_before/not_after define validity period',
      'Compare current time for expiry check'
    ],
    language: 'python'
  }
];
