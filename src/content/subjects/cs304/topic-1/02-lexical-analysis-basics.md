# Lexical Analysis Basics

Lexical analysis, also known as scanning or tokenization, is the first phase of compilation. It serves as the interface between the raw source code and the parser, transforming a stream of characters into a stream of tokens. This transformation simplifies subsequent phases by providing meaningful units of syntax rather than individual characters. Understanding lexical analysis is essential for comprehending how compilers process and understand source code.

## The Role of the Lexical Analyzer

The lexical analyzer (or scanner or lexer) reads the source program character by character and groups these characters into tokens. A token is a sequence of characters that represents a single atomic unit of meaning in the source language. By producing tokens, the lexical analyzer shields the parser from the low-level details of character processing, whitespace handling, and comment removal.

Consider the simple assignment statement:

```c
count = count + 1;
```

The lexical analyzer would produce a sequence of tokens representing: identifier (`count`), assignment operator (`=`), identifier (`count`), addition operator (`+`), integer literal (`1`), and semicolon (`;`). Each token carries information about what kind of syntactic element it represents and its specific value if applicable.

## Tokens, Lexemes, and Patterns

Understanding the relationship between tokens, lexemes, and patterns is fundamental to lexical analysis.

### Tokens

A token is a pair consisting of a token name (or token type) and an optional attribute value. The token name is an abstract symbol representing the kind of lexical unit, such as IDENTIFIER, NUMBER, KEYWORD, or OPERATOR. The attribute value provides additional information specific to the token instance, such as the actual identifier name or the numeric value.

Common token categories include:
- Keywords (reserved words like `if`, `while`, `class`)
- Identifiers (variable and function names)
- Literals (numbers, strings, characters, booleans)
- Operators (arithmetic, relational, logical)
- Delimiters (parentheses, braces, semicolons, commas)

### Lexemes

A lexeme is the actual sequence of characters in the source code that matches a pattern and is grouped into a token. While the token is the abstract representation, the lexeme is the concrete string of characters from the input. For example, in the statement `int x = 42;`, the lexemes are `int`, `x`, `=`, `42`, and `;`.

### Patterns

A pattern is a rule describing the set of lexemes that can represent a particular token. Patterns are typically specified using regular expressions. For example:
- The pattern for identifiers might be: a letter followed by zero or more letters or digits
- The pattern for integer literals might be: one or more digits
- The pattern for keywords is typically the exact string of the keyword

## Token Representation

Tokens are typically represented as structured data that the parser can easily process. A common representation includes:

```c
typedef struct {
    TokenType type;
    char* lexeme;
    int line;
    int column;
    union {
        int intValue;
        double doubleValue;
        char* stringValue;
    } value;
} Token;
```

The token type identifies what kind of token it is, the lexeme preserves the original text, line and column information aids in error reporting, and the value union stores the semantic value for literals.

## The Scanning Process

Lexical analysis operates by examining the input character stream and attempting to match prefixes against known patterns. The scanner typically uses a longest-match strategy: it continues consuming characters as long as a valid token pattern can be matched, taking the longest possible match when multiple matches are possible.

Here's a conceptual algorithm for scanning:

```python
def scan():
    tokens = []
    position = 0

    while position < len(source):
        # Skip whitespace
        while position < len(source) and source[position].isspace():
            position += 1

        if position >= len(source):
            break

        # Try to match each token pattern
        matched = False
        for pattern in token_patterns:
            if match := pattern.match(source, position):
                token = Token(pattern.type, match.text)
                tokens.append(token)
                position = match.end
                matched = True
                break

        if not matched:
            raise LexicalError(f"Unexpected character at {position}")

    return tokens
```

## Whitespace and Comments

A critical responsibility of the lexical analyzer is handling whitespace and comments. In most programming languages, whitespace (spaces, tabs, newlines) serves only to separate tokens and carries no semantic meaning. The scanner strips out this whitespace, so the parser never sees it.

Similarly, comments are removed during lexical analysis. Whether single-line comments (`// comment`) or multi-line comments (`/* comment */`), the scanner recognizes and discards them, treating them as whitespace. However, the scanner must still track line numbers through comments to provide accurate error location information.

## Lookahead and Ambiguity Resolution

Sometimes the scanner must look ahead at future characters to determine where one token ends and the next begins. This is particularly important when token boundaries are ambiguous.

Consider the C statement:

```c
x=y+++z;
```

The scanner must use lookahead to determine whether this should be parsed as `x = y++ + z` or `x = y + ++z`. Most scanners use a maximal munch rule: always take the longest sequence of characters that matches a valid token pattern. This would yield `x = y++ + z`.

Another common ambiguity involves keywords and identifiers. In most languages, keywords are reserved words that cannot be used as identifiers. The scanner must check whether a sequence of characters matching the identifier pattern is actually a keyword:

```python
def recognize_identifier_or_keyword(text):
    if text in keywords:
        return Token(KEYWORD, text)
    else:
        return Token(IDENTIFIER, text)
```

## Error Detection and Recovery

The lexical analyzer is responsible for detecting and reporting lexical errors—situations where the input doesn't match any valid token pattern. Common lexical errors include:
- Illegal characters (characters not in the source language's alphabet)
- Malformed literals (e.g., `3.14.159` or `"unterminated string`)
- Invalid escape sequences in strings

When errors are detected, the scanner should report them with useful information (line number, column, error description) and attempt to recover so that scanning can continue. Simple recovery strategies include skipping the illegal character or discarding characters until a clear token boundary is found.

## Interaction with the Parser

The lexical analyzer and parser typically interact through a simple interface. The parser calls a function like `getNextToken()` each time it needs another token. This demand-driven approach means the scanner only does work when the parser requests it, and tokens don't need to be stored in large buffers.

Some implementations precompute all tokens in a single pass and store them in an array, which the parser then traverses. This approach simplifies backtracking in the parser but requires more memory.

## Lexical Analyzer Generators

While lexical analyzers can be hand-coded, they're often generated automatically from pattern specifications. Tools like Lex, Flex, and modern equivalents allow compiler writers to specify token patterns using regular expressions, then automatically generate efficient scanner code. This approach reduces development time and errors while producing optimized scanners.

## Key Takeaways

- Lexical analysis transforms a character stream into a token stream, simplifying subsequent compilation phases
- Tokens are abstract symbols representing lexical units; lexemes are the concrete character sequences; patterns define what lexemes match each token type
- The scanner uses longest-match strategies and lookahead to resolve ambiguities in token boundaries
- Whitespace and comments are typically removed during lexical analysis, though line tracking is preserved for error reporting
- Lexical errors like illegal characters and malformed literals are detected and reported with location information
- The scanner and parser interact through a simple interface where the parser requests tokens on demand
- Regular expressions provide a formal notation for specifying token patterns, enabling automatic scanner generation
