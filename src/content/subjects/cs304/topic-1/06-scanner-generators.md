# Scanner Generators: Lex and Flex

Scanner generators automate the process of creating lexical analyzers from high-level specifications. Instead of hand-coding a scanner with explicit state management and character processing, compiler writers can declaratively specify token patterns using regular expressions and let tools generate efficient scanner code. Lex and its successor Flex are the most widely-used scanner generators, and understanding them is essential for practical compiler construction.

## Introduction to Lex and Flex

Lex (short for "lexical analyzer generator") was developed in the 1970s as part of the Unix programming environment. Flex (Fast Lexical Analyzer Generator) is a modern, faster, and more feature-rich reimplementation of Lex. Both tools take a specification file containing regular expression patterns and associated actions, then generate C code implementing a scanner that recognizes those patterns.

The key advantage of scanner generators is productivity: they eliminate tedious, error-prone manual coding while producing efficient, optimized scanners. They handle details like buffer management, longest-match resolution, and state machine construction automatically.

## Lex/Flex Specification Structure

A Lex or Flex specification file consists of three sections separated by `%%` delimiters:

```
definitions
%%
rules
%%
user code
```

### Definitions Section

The definitions section contains:
- C code enclosed in `%{ %}` blocks (included verbatim in generated code)
- Named regular expression definitions
- Options and declarations

Example:

```lex
%{
#include <stdio.h>
#include "tokens.h"
int line_number = 1;
%}

DIGIT    [0-9]
LETTER   [A-Za-z]
ID       {LETTER}({LETTER}|{DIGIT})*
```

### Rules Section

The rules section contains pattern-action pairs. Each line specifies a regular expression pattern followed by C code to execute when that pattern matches:

```lex
{ID}        { return IDENTIFIER; }
{DIGIT}+    { yylval.int_val = atoi(yytext); return NUMBER; }
"if"        { return IF; }
"while"     { return WHILE; }
"+"         { return PLUS; }
"-"         { return MINUS; }
[ \t]+      { /* skip whitespace */ }
\n          { line_number++; }
.           { printf("Unexpected character: %s\n", yytext); }
```

### User Code Section

The user code section contains additional C functions, including a `main()` function if you're building a standalone program:

```c
int main() {
    yylex();
    return 0;
}
```

## Regular Expression Syntax in Lex/Flex

Lex and Flex support standard regular expression operators plus some extensions:

### Basic Operators

- `x`: Match character x
- `.`: Match any character except newline
- `[xyz]`: Match any character in the set
- `[^xyz]`: Match any character not in the set
- `[a-z]`: Match any character in the range
- `r*`: Zero or more occurrences of r
- `r+`: One or more occurrences of r
- `r?`: Zero or one occurrence of r
- `r{n}`: Exactly n occurrences of r
- `r{n,}`: At least n occurrences of r
- `r{n,m}`: Between n and m occurrences of r

### Concatenation and Alternation

- `rs`: r followed by s
- `r|s`: r or s

### Anchors and Boundaries

- `^r`: r at beginning of line
- `r$`: r at end of line
- `\<r`: r at beginning of word
- `r\>`: r at end of word

### Definitions and Groups

- `{name}`: Reference a named definition
- `(r)`: Grouping
- `"text"`: Literal string (special characters lose meaning)

## Important Lex/Flex Variables and Functions

The generated scanner code includes several important global variables and functions:

### Variables

- `yytext`: Pointer to the matched text (lexeme)
- `yyleng`: Length of the matched text
- `yylval`: Value to pass to parser (for semantic information)
- `yylineno`: Current line number (if %option yylineno is used)

### Functions

- `yylex()`: The main scanning function (call to get next token)
- `yywrap()`: Called at EOF; return 1 to stop, 0 to continue with another file
- `yyrestart(FILE*)`: Reset scanner to read from a new file
- `yymore()`: Append next token to current token
- `yyless(n)`: Push back all but first n characters of current token
- `input()`: Read next character from input
- `unput(c)`: Push character back onto input

## Complete Example: Simple Expression Scanner

Here's a complete Flex specification for scanning arithmetic expressions:

```lex
%{
#include <stdio.h>
#include <stdlib.h>
#include "parser.h"  // Token definitions from parser

int line_number = 1;
%}

%option noyywrap
%option yylineno

DIGIT    [0-9]
LETTER   [A-Za-z_]
ID       {LETTER}({LETTER}|{DIGIT})*
INT      {DIGIT}+
FLOAT    {DIGIT}+\.{DIGIT}*|\.{DIGIT}+
EXPONENT [eE][+-]?{DIGIT}+
NUMBER   {INT}|{FLOAT}{EXPONENT}?

%%

"if"        { return IF; }
"else"      { return ELSE; }
"while"     { return WHILE; }
"return"    { return RETURN; }

{ID}        {
                yylval.string = strdup(yytext);
                return IDENTIFIER;
            }

{NUMBER}    {
                yylval.number = atof(yytext);
                return NUMBER;
            }

"+"         { return PLUS; }
"-"         { return MINUS; }
"*"         { return TIMES; }
"/"         { return DIVIDE; }
"="         { return ASSIGN; }
"=="        { return EQUAL; }
"!="        { return NOT_EQUAL; }
"<"         { return LESS; }
">"         { return GREATER; }
"<="        { return LESS_EQUAL; }
">="        { return GREATER_EQUAL; }

"("         { return LPAREN; }
")"         { return RPAREN; }
"{"         { return LBRACE; }
"}"         { return RBRACE; }
";"         { return SEMICOLON; }
","         { return COMMA; }

[ \t\r]+    { /* skip whitespace */ }
\n          { line_number++; }

"//"[^\n]*  { /* skip single-line comments */ }

"/*"        {
                // Multi-line comment
                int c;
                while ((c = input()) != 0) {
                    if (c == '\n') line_number++;
                    else if (c == '*') {
                        if ((c = input()) == '/') break;
                        else unput(c);
                    }
                }
            }

.           {
                fprintf(stderr, "Error: unexpected character '%s' at line %d\n",
                        yytext, line_number);
                return ERROR;
            }

%%

int yywrap() {
    return 1;
}
```

## Building and Using a Flex Scanner

To generate and compile a scanner:

```bash
# Generate scanner code
flex scanner.l

# Compile generated code
gcc lex.yy.c -o scanner -lfl

# Run scanner
./scanner < input.txt
```

The `-lfl` flag links the Flex library, which provides default implementations of functions like `yywrap()`.

## Advanced Features

### Start Conditions (States)

Flex supports start conditions for handling context-dependent scanning, like string literals or nested comments:

```lex
%x STRING COMMENT

%%

\"          { BEGIN(STRING); /* start string state */ }
<STRING>\"  { BEGIN(INITIAL); return STRING_LITERAL; }
<STRING>\n  { printf("Error: unterminated string\n"); }
<STRING>.   { /* accumulate string content */ }

"/*"            { BEGIN(COMMENT); }
<COMMENT>"*/"   { BEGIN(INITIAL); }
<COMMENT>\n     { line_number++; }
<COMMENT>.      { /* skip comment content */ }
```

The `%x` declares exclusive start conditions. In state STRING, only rules prefixed with `<STRING>` match. The `BEGIN()` macro switches states.

### Multiple Input Buffers

Flex supports scanning multiple files or switching between buffers:

```c
YY_BUFFER_STATE create_buffer(FILE* file, int size);
void switch_to_buffer(YY_BUFFER_STATE buffer);
void delete_buffer(YY_BUFFER_STATE buffer);

// Example: handling #include directives
YY_BUFFER_STATE include_stack[MAX_INCLUDE_DEPTH];
int include_stack_ptr = 0;

void push_include(const char* filename) {
    if (include_stack_ptr >= MAX_INCLUDE_DEPTH) {
        fprintf(stderr, "Includes nested too deeply\n");
        exit(1);
    }

    include_stack[include_stack_ptr++] = YY_CURRENT_BUFFER;
    FILE* file = fopen(filename, "r");
    yy_switch_to_buffer(yy_create_buffer(file, YY_BUF_SIZE));
}
```

### Reentrant Scanners

By default, Flex generates scanners with global state, making them non-reentrant. The `%option reentrant` directive generates reentrant code suitable for multi-threaded applications:

```lex
%option reentrant
%option bison-bridge

%%
/* rules... */
%%

int main() {
    yyscan_t scanner;
    yylex_init(&scanner);
    yylex(scanner);
    yylex_destroy(scanner);
    return 0;
}
```

### C++ Scanner Generation

Flex can generate C++ scanner classes:

```lex
%option c++
%option yyclass="MyScanner"

%%
/* rules... */
%%

int main() {
    MyScanner scanner;
    scanner.yylex();
    return 0;
}
```

## Integration with Parsers

Scanners typically work with parsers generated by tools like Yacc or Bison. The scanner provides tokens to the parser on demand:

```c
// Parser calls yylex() to get next token
int token = yylex();

// Scanner sets yylval to pass semantic information
yylval.string_value = strdup(yytext);
```

The parser and scanner share token type definitions (typically in a header file generated by the parser generator).

## Performance Considerations

Flex generates highly optimized scanners, but specification choices affect performance:

- **Rule ordering matters**: Place common patterns first for faster matching
- **Use character classes**: `[a-z]` is faster than `a|b|c|...|z`
- **Minimize action code**: Keep actions simple; do heavy processing elsewhere
- **Avoid backtracking**: Design patterns to minimize ambiguity
- **Use start conditions**: They reduce the number of patterns checked in each state

## Common Pitfalls

Several issues commonly arise when using Lex/Flex:

- **Forgetting `yywrap()`**: Must return 1 to indicate EOF, or use `%option noyywrap`
- **Pattern overlap**: When multiple patterns match, Flex uses the longest match, then the first rule
- **Memory leaks**: Be careful with `strdup()` in actions; ensure memory is freed
- **Newline handling**: Remember that `.` doesn't match newlines
- **Token ordering**: Keywords must appear before general identifier patterns

## Key Takeaways

- Lex and Flex automate scanner generation from regular expression specifications, dramatically improving productivity
- Specifications consist of three sections: definitions, rules, and user code, separated by `%%` delimiters
- Rules map regular expression patterns to C code actions executed when patterns match
- Important variables include `yytext` (matched text), `yyleng` (match length), and `yylval` (semantic value)
- Start conditions enable context-dependent scanning for handling complex lexical structures like strings and comments
- Flex supports advanced features including multiple buffers, reentrant scanners, and C++ code generation
- Generated scanners integrate seamlessly with parser generators like Yacc and Bison for complete compiler front-ends
