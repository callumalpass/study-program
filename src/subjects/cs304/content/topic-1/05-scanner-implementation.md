# Hand-Coded Scanner Implementation

While automated tools like Lex and Flex can generate scanners from regular expression specifications, understanding how to hand-code a scanner provides deep insights into lexical analysis mechanics. Hand-coded scanners offer fine-grained control over performance, error handling, and special-case processing that generated scanners may not provide. This knowledge is invaluable for implementing specialized scanners, debugging generated code, and appreciating the algorithms behind scanner generators.

## Scanner Architecture

A hand-coded scanner typically consists of several components working together:

### Input Buffer Management

The scanner needs to efficiently read characters from the source file. A double-buffering scheme is often used to handle arbitrary-length input while maintaining good performance:

```c
#define BUFFER_SIZE 4096

typedef struct {
    char buffer[2][BUFFER_SIZE];
    int current_buffer;
    int position;
    FILE* input_file;
    int line_number;
    int column_number;
} Scanner;

char peek(Scanner* scanner) {
    return scanner->buffer[scanner->current_buffer][scanner->position];
}

char advance(Scanner* scanner) {
    char ch = peek(scanner);

    if (ch == '\n') {
        scanner->line_number++;
        scanner->column_number = 0;
    } else {
        scanner->column_number++;
    }

    scanner->position++;
    if (scanner->position >= BUFFER_SIZE) {
        // Switch buffers and refill
        scanner->current_buffer = 1 - scanner->current_buffer;
        scanner->position = 0;
        fread(scanner->buffer[scanner->current_buffer], 1, BUFFER_SIZE,
              scanner->input_file);
    }

    return ch;
}
```

This design allows the scanner to look ahead without complex pointer arithmetic while efficiently handling large files.

### Token Structure

Define a structure to represent tokens with all necessary information:

```c
typedef enum {
    TOKEN_IDENTIFIER,
    TOKEN_NUMBER,
    TOKEN_STRING,
    TOKEN_KEYWORD_IF,
    TOKEN_KEYWORD_WHILE,
    TOKEN_KEYWORD_RETURN,
    TOKEN_PLUS,
    TOKEN_MINUS,
    TOKEN_STAR,
    TOKEN_SLASH,
    TOKEN_ASSIGN,
    TOKEN_EQUAL,
    TOKEN_LPAREN,
    TOKEN_RPAREN,
    TOKEN_LBRACE,
    TOKEN_RBRACE,
    TOKEN_SEMICOLON,
    TOKEN_EOF,
    TOKEN_ERROR
} TokenType;

typedef struct {
    TokenType type;
    char* lexeme;
    int line;
    int column;
    union {
        long long int_value;
        double float_value;
        char* string_value;
    } value;
} Token;
```

### Main Scanning Loop

The core scanner function orchestrates the entire process:

```c
Token* scan_token(Scanner* scanner) {
    skip_whitespace_and_comments(scanner);

    if (is_at_end(scanner)) {
        return make_token(TOKEN_EOF, "", scanner);
    }

    scanner->token_start = scanner->position;
    scanner->token_line = scanner->line_number;
    scanner->token_column = scanner->column_number;

    char ch = advance(scanner);

    if (isalpha(ch) || ch == '_') return scan_identifier(scanner);
    if (isdigit(ch)) return scan_number(scanner);
    if (ch == '"') return scan_string(scanner);

    // Single-character tokens and operators
    switch (ch) {
        case '+': return make_token(TOKEN_PLUS, "+", scanner);
        case '-': return make_token(TOKEN_MINUS, "-", scanner);
        case '*': return make_token(TOKEN_STAR, "*", scanner);
        case '/': return make_token(TOKEN_SLASH, "/", scanner);
        case '(': return make_token(TOKEN_LPAREN, "(", scanner);
        case ')': return make_token(TOKEN_RPAREN, ")", scanner);
        case '{': return make_token(TOKEN_LBRACE, "{", scanner);
        case '}': return make_token(TOKEN_RBRACE, "}", scanner);
        case ';': return make_token(TOKEN_SEMICOLON, ";", scanner);
        case '=':
            if (peek(scanner) == '=') {
                advance(scanner);
                return make_token(TOKEN_EQUAL, "==", scanner);
            }
            return make_token(TOKEN_ASSIGN, "=", scanner);
    }

    return make_error_token("Unexpected character", scanner);
}
```

## Scanning Identifiers and Keywords

Identifiers follow a simple pattern: letter or underscore, followed by any number of letters, digits, or underscores. Keywords are checked after collecting the identifier:

```c
Token* scan_identifier(Scanner* scanner) {
    while (isalnum(peek(scanner)) || peek(scanner) == '_') {
        advance(scanner);
    }

    char* lexeme = extract_lexeme(scanner);
    TokenType type = identify_keyword(lexeme);

    if (type == TOKEN_IDENTIFIER) {
        Token* token = make_token(type, lexeme, scanner);
        return token;
    } else {
        return make_token(type, lexeme, scanner);
    }
}

TokenType identify_keyword(const char* lexeme) {
    // Use a hash table or trie for efficiency
    static const struct {
        const char* keyword;
        TokenType type;
    } keywords[] = {
        {"if", TOKEN_KEYWORD_IF},
        {"while", TOKEN_KEYWORD_WHILE},
        {"return", TOKEN_KEYWORD_RETURN},
        // ... more keywords
        {NULL, TOKEN_IDENTIFIER}
    };

    for (int i = 0; keywords[i].keyword != NULL; i++) {
        if (strcmp(lexeme, keywords[i].keyword) == 0) {
            return keywords[i].type;
        }
    }

    return TOKEN_IDENTIFIER;
}
```

For better performance with many keywords, use a perfect hash function or a trie data structure instead of linear search.

## Scanning Numeric Literals

Numeric literals require careful handling of integers, floating-point numbers, and potentially different bases:

```c
Token* scan_number(Scanner* scanner) {
    bool is_float = false;

    // Scan integer part
    while (isdigit(peek(scanner))) {
        advance(scanner);
    }

    // Check for decimal point
    if (peek(scanner) == '.' && isdigit(peek_ahead(scanner, 1))) {
        is_float = true;
        advance(scanner);  // consume '.'

        while (isdigit(peek(scanner))) {
            advance(scanner);
        }
    }

    // Check for exponent
    if (peek(scanner) == 'e' || peek(scanner) == 'E') {
        is_float = true;
        advance(scanner);

        if (peek(scanner) == '+' || peek(scanner) == '-') {
            advance(scanner);
        }

        if (!isdigit(peek(scanner))) {
            return make_error_token("Invalid exponent", scanner);
        }

        while (isdigit(peek(scanner))) {
            advance(scanner);
        }
    }

    char* lexeme = extract_lexeme(scanner);
    Token* token = make_token(TOKEN_NUMBER, lexeme, scanner);

    if (is_float) {
        token->value.float_value = strtod(lexeme, NULL);
    } else {
        token->value.int_value = strtoll(lexeme, NULL, 10);
    }

    return token;
}
```

Additional considerations include:
- Hexadecimal (0x prefix), octal (0 prefix), binary (0b prefix)
- Underscores in numeric literals (1_000_000)
- Suffix specifiers (123L, 3.14f)
- Range checking and overflow detection

## Scanning String Literals

String literals require handling escape sequences and detecting unterminated strings:

```c
Token* scan_string(Scanner* scanner) {
    // Opening quote already consumed
    char* string_buffer = malloc(256);
    int capacity = 256;
    int length = 0;

    while (peek(scanner) != '"' && !is_at_end(scanner)) {
        if (peek(scanner) == '\n') {
            return make_error_token("Unterminated string", scanner);
        }

        if (peek(scanner) == '\\') {
            advance(scanner);
            char escaped = scan_escape_sequence(scanner);
            if (escaped == '\0') {
                return make_error_token("Invalid escape sequence", scanner);
            }
            string_buffer[length++] = escaped;
        } else {
            string_buffer[length++] = advance(scanner);
        }

        if (length >= capacity) {
            capacity *= 2;
            string_buffer = realloc(string_buffer, capacity);
        }
    }

    if (is_at_end(scanner)) {
        return make_error_token("Unterminated string", scanner);
    }

    advance(scanner);  // consume closing quote

    string_buffer[length] = '\0';
    Token* token = make_token(TOKEN_STRING, "string", scanner);
    token->value.string_value = string_buffer;

    return token;
}

char scan_escape_sequence(Scanner* scanner) {
    char ch = advance(scanner);
    switch (ch) {
        case 'n': return '\n';
        case 't': return '\t';
        case 'r': return '\r';
        case '\\': return '\\';
        case '"': return '"';
        case '0': return '\0';
        // Handle \xHH for hex, \uHHHH for unicode, etc.
        default: return '\0';  // Invalid escape
    }
}
```

## Handling Whitespace and Comments

Whitespace and comments are skipped but must update position tracking:

```c
void skip_whitespace_and_comments(Scanner* scanner) {
    while (true) {
        char ch = peek(scanner);

        switch (ch) {
            case ' ':
            case '\t':
            case '\r':
            case '\n':
                advance(scanner);
                break;

            case '/':
                if (peek_ahead(scanner, 1) == '/') {
                    // Single-line comment
                    while (peek(scanner) != '\n' && !is_at_end(scanner)) {
                        advance(scanner);
                    }
                } else if (peek_ahead(scanner, 1) == '*') {
                    // Multi-line comment
                    advance(scanner);  // consume /
                    advance(scanner);  // consume *

                    while (!is_at_end(scanner)) {
                        if (peek(scanner) == '*' &&
                            peek_ahead(scanner, 1) == '/') {
                            advance(scanner);  // consume *
                            advance(scanner);  // consume /
                            break;
                        }
                        advance(scanner);
                    }
                } else {
                    return;
                }
                break;

            default:
                return;
        }
    }
}
```

## Lookahead and Maximal Munch

Many operators require lookahead to distinguish them:

```c
Token* scan_operator(Scanner* scanner, char first) {
    switch (first) {
        case '=':
            if (peek(scanner) == '=') {
                advance(scanner);
                return make_token(TOKEN_EQUAL, "==", scanner);
            }
            return make_token(TOKEN_ASSIGN, "=", scanner);

        case '!':
            if (peek(scanner) == '=') {
                advance(scanner);
                return make_token(TOKEN_NOT_EQUAL, "!=", scanner);
            }
            return make_token(TOKEN_NOT, "!", scanner);

        case '<':
            if (peek(scanner) == '=') {
                advance(scanner);
                return make_token(TOKEN_LESS_EQUAL, "<=", scanner);
            } else if (peek(scanner) == '<') {
                advance(scanner);
                return make_token(TOKEN_SHIFT_LEFT, "<<", scanner);
            }
            return make_token(TOKEN_LESS, "<", scanner);

        case '+':
            if (peek(scanner) == '+') {
                advance(scanner);
                return make_token(TOKEN_INCREMENT, "++", scanner);
            } else if (peek(scanner) == '=') {
                advance(scanner);
                return make_token(TOKEN_PLUS_ASSIGN, "+=", scanner);
            }
            return make_token(TOKEN_PLUS, "+", scanner);
    }
}
```

The maximal munch rule ensures the scanner always takes the longest possible token.

## Performance Optimization

Several techniques improve hand-coded scanner performance:

### Character Classification Tables

Instead of repeated function calls, use lookup tables:

```c
static const unsigned char char_type[256] = {
    // Initialize array where each entry indicates character type
    // 0 = other, 1 = letter, 2 = digit, 3 = whitespace, etc.
};

#define IS_ALPHA(c) (char_type[(unsigned char)(c)] == 1)
#define IS_DIGIT(c) (char_type[(unsigned char)(c)] == 2)
#define IS_SPACE(c) (char_type[(unsigned char)(c)] == 3)
```

### Keyword Recognition with Perfect Hashing

Generate a minimal perfect hash function for keywords to achieve O(1) lookup.

### Inlining Hot Paths

Inline frequently called functions like `peek()` and `advance()` to reduce call overhead.

## Key Takeaways

- Hand-coded scanners provide fine-grained control over performance and error handling beyond what scanner generators offer
- Efficient input buffering using double-buffer schemes enables handling arbitrary-length files with good performance
- Scanners must carefully handle identifiers vs keywords, numeric literals with various formats, and string literals with escape sequences
- Lookahead is essential for distinguishing multi-character operators and implementing maximal munch
- Whitespace and comment handling must preserve line and column tracking for error reporting
- Performance optimizations include character classification tables, perfect hashing for keywords, and inlining hot paths
- Understanding hand-coded scanner implementation illuminates the algorithms used by automatic scanner generators
