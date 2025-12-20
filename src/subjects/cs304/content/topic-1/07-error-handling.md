# Error Handling and Recovery in Lexical Analysis

Error handling is a critical aspect of lexical analysis that significantly impacts the usability and quality of a compiler. While much compiler theory focuses on recognizing correct programs, real-world compilers must gracefully handle incorrect input, providing helpful diagnostic messages and recovering to continue analysis. Effective error handling in the scanner enables detection of multiple errors in a single compilation pass, dramatically improving the developer experience.

## Types of Lexical Errors

Lexical errors occur when the scanner encounters input that doesn't match any valid token pattern. Common categories include:

### Illegal Characters

Characters that aren't part of the language's alphabet appear in the source code. For example, encountering `@` or `$` in a language that doesn't use these characters:

```c
int count@ = 42;  // '@' is illegal
```

### Malformed Tokens

Token patterns that are partially matched but incomplete or incorrect:

```c
float x = 3.14.159;  // Two decimal points
string s = "unterminated string
int octal = 0782;    // Invalid octal digit
```

### Invalid Escape Sequences

String or character literals with unrecognized escape sequences:

```c
char c = '\q';  // '\q' is not a valid escape
string s = "line one\xZZ";  // Invalid hex escape
```

### Encoding Errors

Problems with character encoding, especially when source files contain unexpected byte sequences:

```c
// UTF-8 byte sequence errors
// Surrogate halves in UTF-16
// Invalid code points
```

## Error Detection Strategies

The scanner must recognize when input doesn't match valid patterns and cannot form a token:

### Catch-All Pattern

Use a final pattern that matches any character not matched by previous rules:

```lex
%%
/* All valid token patterns above */

.   {
        fprintf(stderr, "Lexical error: unexpected character '%s' at line %d, column %d\n",
                yytext, yylineno, column);
        /* Recovery strategy here */
    }
```

This catch-all ensures nothing slips through undetected, though it provides minimal information.

### Explicit Error Patterns

Define specific patterns for common errors:

```lex
{DIGIT}+{ID}  {
                fprintf(stderr, "Error: identifier cannot start with digit: '%s'\n",
                        yytext);
                /* Recovery */
              }

\"([^\"]|\\.)*$  {
                    fprintf(stderr, "Error: unterminated string at line %d\n",
                            yylineno);
                    /* Recovery */
                 }

0[0-7]*[89][0-9]*  {
                      fprintf(stderr, "Error: invalid octal literal '%s'\n",
                              yytext);
                      /* Recovery */
                   }
```

Explicit error patterns provide more specific, helpful error messages.

### State-Based Error Detection

When using start conditions, detect errors specific to each state:

```lex
%x STRING

%%
\"              { BEGIN(STRING); string_buffer_pos = 0; }

<STRING>\"      { BEGIN(INITIAL); return STRING_LITERAL; }

<STRING>\n      {
                    fprintf(stderr, "Error: unterminated string at line %d\n",
                            yylineno);
                    BEGIN(INITIAL);  // Recovery: return to normal state
                }

<STRING><<EOF>> {
                    fprintf(stderr, "Error: unterminated string at EOF\n");
                    BEGIN(INITIAL);
                    return ERROR;
                }

<STRING>\\.     { /* process escape sequence */ }

<STRING>.       { /* accumulate string character */ }
```

## Error Reporting

Quality error messages help developers quickly locate and understand problems:

### Essential Information

Every error message should include:

- **Location**: Line number and column (or character offset)
- **Description**: Clear explanation of what went wrong
- **Context**: The problematic lexeme or surrounding text

```c
void report_error(const char* message, const char* lexeme,
                  int line, int column) {
    fprintf(stderr, "%d:%d: error: %s\n", line, column, message);
    fprintf(stderr, "  Found: '%s'\n", lexeme);
}
```

### Error Severity Levels

Distinguish between different severity levels:

```c
typedef enum {
    ERROR_WARNING,
    ERROR_ERROR,
    ERROR_FATAL
} ErrorLevel;

void report_lexical_error(ErrorLevel level, const char* message,
                          int line, int column) {
    const char* level_str = (level == ERROR_WARNING) ? "warning" :
                           (level == ERROR_ERROR) ? "error" : "fatal error";

    fprintf(stderr, "%d:%d: %s: %s\n", line, column, level_str, message);

    if (level == ERROR_FATAL) {
        exit(1);
    }
}
```

### Source Context Display

Show the offending line with a visual indicator:

```c
void display_error_context(const char* source_line, int column,
                           const char* message) {
    fprintf(stderr, "%s\n", source_line);

    // Print spaces up to error column
    for (int i = 0; i < column - 1; i++) {
        fprintf(stderr, " ");
    }
    fprintf(stderr, "^\n");

    for (int i = 0; i < column - 1; i++) {
        fprintf(stderr, " ");
    }
    fprintf(stderr, "%s\n", message);
}
```

Output example:

```
int count@ = 42;
         ^
         unexpected character '@'
```

Modern compilers often use color coding and rich formatting for even clearer error presentation.

## Error Recovery Strategies

After detecting an error, the scanner must recover to continue analyzing subsequent input:

### Panic Mode Recovery

Skip characters until reaching a synchronization point (like a semicolon, closing brace, or newline):

```c
void panic_mode_recovery(Scanner* scanner) {
    while (!is_at_end(scanner)) {
        char ch = peek(scanner);

        // Synchronization points
        if (ch == ';' || ch == '}' || ch == '\n') {
            advance(scanner);  // consume sync character
            return;
        }

        advance(scanner);  // skip character
    }
}
```

This approach ensures scanning can continue after an error, potentially finding more errors in the same pass.

### Character Deletion

Simply skip the illegal character and continue:

```lex
.   {
        fprintf(stderr, "Error: unexpected character '%s', skipping\n",
                yytext);
        /* Continue to next character automatically */
    }
```

This works well for truly extraneous characters but may cascade into more errors if the character was significant.

### Character Insertion

Hypothetically insert a missing character to complete a token:

```c
Token* scan_string(Scanner* scanner) {
    // ... scanning string content ...

    if (peek(scanner) == '\n') {
        report_error("unterminated string, inserting closing quote",
                     line_number, column_number);
        // Pretend we found closing quote and return string token
        return make_token(TOKEN_STRING, string_buffer, scanner);
    }
}
```

This allows parsing to continue as if the program were correct.

### Token Substitution

Replace an erroneous token with a valid placeholder:

```c
Token* scan_invalid_number(Scanner* scanner) {
    char* lexeme = extract_lexeme(scanner);
    fprintf(stderr, "Error: invalid number literal '%s', treating as 0\n",
            lexeme);

    Token* token = make_token(TOKEN_NUMBER, lexeme, scanner);
    token->value.int_value = 0;  // Substitute with 0
    return token;
}
```

This enables semantic analysis to proceed even with lexical errors.

### State Reset

When using start conditions, recover by returning to the initial state:

```lex
<STRING>\n  {
                fprintf(stderr, "Error: unterminated string\n");
                BEGIN(INITIAL);  // Reset to initial state
            }
```

## Error Accumulation

Track all errors encountered rather than stopping at the first:

```c
typedef struct {
    char* message;
    int line;
    int column;
    ErrorLevel level;
} ErrorRecord;

typedef struct {
    ErrorRecord* errors;
    int error_count;
    int error_capacity;
    int warning_count;
    int error_limit;  // Stop after this many errors
} ErrorManager;

void add_error(ErrorManager* mgr, const char* message,
               int line, int column, ErrorLevel level) {
    if (mgr->error_count >= mgr->error_limit) {
        fprintf(stderr, "Too many errors, stopping compilation\n");
        exit(1);
    }

    // Allocate more space if needed
    if (mgr->error_count >= mgr->error_capacity) {
        mgr->error_capacity *= 2;
        mgr->errors = realloc(mgr->errors,
                             mgr->error_capacity * sizeof(ErrorRecord));
    }

    ErrorRecord* record = &mgr->errors[mgr->error_count++];
    record->message = strdup(message);
    record->line = line;
    record->column = column;
    record->level = level;

    if (level == ERROR_WARNING) {
        mgr->warning_count++;
    }

    // Immediately display the error
    report_error_record(record);
}
```

## Warnings vs Errors

Some lexical issues are suspicious but not necessarily wrong:

```c
// Warning: character literal with multiple characters
'abc'

// Warning: octal escape sequence out of range
'\777'

// Warning: unusual Unicode character in identifier
int a\u200B = 10;  // Zero-width space
```

Warnings allow compilation to proceed while alerting developers to potential problems.

## Special Cases

### Handling Include Files

When errors occur in included files, track the include stack:

```c
typedef struct {
    const char* filename;
    int line;
} IncludeFrame;

IncludeFrame include_stack[MAX_INCLUDE_DEPTH];
int include_depth = 0;

void report_error_with_stack(const char* message, int line) {
    fprintf(stderr, "In file %s:%d: %s\n",
            include_stack[include_depth].filename, line, message);

    // Show include chain
    for (int i = include_depth - 1; i >= 0; i--) {
        fprintf(stderr, "  Included from %s:%d\n",
                include_stack[i].filename, include_stack[i].line);
    }
}
```

### Unicode and Multibyte Characters

Handle encoding errors gracefully:

```c
int read_utf8_character(Scanner* scanner) {
    unsigned char first = advance(scanner);

    // Single-byte ASCII
    if (first < 0x80) return first;

    // Multi-byte sequence
    int codepoint;
    int continuation_bytes;

    if ((first & 0xE0) == 0xC0) {
        codepoint = first & 0x1F;
        continuation_bytes = 1;
    } else if ((first & 0xF0) == 0xE0) {
        codepoint = first & 0x0F;
        continuation_bytes = 2;
    } else if ((first & 0xF8) == 0xF0) {
        codepoint = first & 0x07;
        continuation_bytes = 3;
    } else {
        report_error("Invalid UTF-8 start byte", scanner->line,
                    scanner->column);
        return 0xFFFD;  // Replacement character
    }

    for (int i = 0; i < continuation_bytes; i++) {
        unsigned char byte = advance(scanner);
        if ((byte & 0xC0) != 0x80) {
            report_error("Invalid UTF-8 continuation byte",
                        scanner->line, scanner->column);
            return 0xFFFD;
        }
        codepoint = (codepoint << 6) | (byte & 0x3F);
    }

    return codepoint;
}
```

## Testing Error Handling

Thorough testing ensures error handling works correctly:

```c
void test_error_handling() {
    test_illegal_character("int x @ 42;");
    test_malformed_number("float f = 3.14.159;");
    test_unterminated_string("char* s = \"hello");
    test_invalid_escape("char c = '\\q';");
    test_recovery("int a = 1; @ int b = 2;");  // Ensure continues after error
}
```

## Key Takeaways

- Lexical error handling detects illegal characters, malformed tokens, invalid escapes, and encoding errors
- Effective error messages include precise location information, clear descriptions, and source context
- Recovery strategies like panic mode, character deletion, and state reset enable continued scanning after errors
- Accumulating errors allows reporting multiple problems in a single compilation pass, improving developer productivity
- Distinguishing warnings from errors allows compilation to proceed while alerting developers to suspicious patterns
- Special handling is needed for include files and multibyte character encodings
- Quality error handling significantly impacts compiler usability and developer experience
