---
id: cs203-t2-syntax
title: "Regex Syntax"
order: 1
---

# Regular Expression Syntax

Regular expressions provide a concise algebraic notation for describing regular languages. They are fundamental to pattern matching, text processing, and lexical analysis.

## Basic Building Blocks

Regular expressions are built from three primitives:

1. **Empty string**: ε (epsilon) represents the language {ε}
2. **Single symbol**: For any a ∈ Σ, the regex "a" represents {a}
3. **Empty language**: ∅ represents the empty language {}

## Three Basic Operations

### Union (Alternation)
If R and S are regular expressions:
- R | S (or R + S) represents L(R) ∪ L(S)
- Matches strings matched by R **or** S

### Concatenation
If R and S are regular expressions:
- RS represents L(R) · L(S) = {xy | x ∈ L(R), y ∈ L(S)}
- Matches strings formed by R followed by S

### Kleene Star
If R is a regular expression:
- R* represents L(R)* = {ε} ∪ L(R) ∪ L(R)L(R) ∪ ...
- Matches zero or more repetitions of R

## Operator Precedence

From highest to lowest:
1. **Star** (*) binds tightest
2. **Concatenation** (implicit)
3. **Union** (|) binds loosest

Examples:
- ab* means a(b*) not (ab)*
- ab|c means (ab)|c not a(b|c)
- Use parentheses for explicit grouping

## Formal Definition

A regular expression over alphabet Σ is defined inductively:

**Base cases**:
- ε is a regex (denoting {ε})
- ∅ is a regex (denoting {})
- For each a ∈ Σ, a is a regex (denoting {a})

**Recursive cases**: If R and S are regexes:
- (R | S) is a regex (denoting L(R) ∪ L(S))
- (RS) is a regex (denoting L(R) · L(S))
- (R*) is a regex (denoting L(R)*)

## Extended Syntax (Practical)

Modern regex implementations add convenience operators:

### One or More
- R⁺ = RR* (one or more of R)

### Optional
- R? = (R | ε) (zero or one of R)

### Character Classes
- [abc] = (a | b | c)
- [a-z] = (a | b | ... | z)
- [^abc] = complement of {a,b,c}

### Bounded Repetition
- R{n} = RRR...R (exactly n times)
- R{n,m} = R^n | R^(n+1) | ... | R^m

### Wildcards
- . (dot) matches any single character

## Examples

| Pattern | Description | Example matches |
|---------|-------------|-----------------|
| a*b | Any a's followed by b | b, ab, aab, aaab |
| (ab)* | Repetitions of "ab" | ε, ab, abab |
| a\|b | a or b | a, b |
| (a\|b)* | Any string of a's and b's | ε, a, ab, ba, aab |
| a*b* | a's followed by b's | ε, a, b, ab, aabb |
| (a*b*)* | Same as (a\|b)* | Any string |

## Language of a Regular Expression

The function L(R) maps regex to language:
- L(ε) = {ε}
- L(∅) = {}
- L(a) = {a}
- L(R | S) = L(R) ∪ L(S)
- L(RS) = L(R) · L(S)
- L(R*) = L(R)*

## Regex Equality

Two regular expressions are **equivalent** if they denote the same language: R ≡ S iff L(R) = L(S).

Testing equivalence:
1. Convert both to minimal DFAs
2. Check if minimal DFAs are identical

## Common Patterns

| Pattern | Language Description |
|---------|---------------------|
| Σ* | All strings |
| Σ*aΣ* | Strings containing 'a' |
| (Σ*aΣ*aΣ*) | Strings with at least two a's |
| (ΣΣ)* | Even-length strings |
| b*ab*ab* | Exactly two a's |

## Worked Examples

### Example 1: Binary Numbers Divisible by 3

**Problem**: Create a regex for binary strings representing numbers divisible by 3.

**Solution**: This requires tracking remainders mod 3. While possible with a DFA, expressing it as a regex is complex. A simpler approach:

For alphabet {0,1}, the pattern is: $(0 \mid 1(01^*0)^*1)^*$

This uses the mathematical property that alternating sums of bits determine divisibility.

### Example 2: Email-like Patterns

**Problem**: Match simplified email patterns: `word@word.word`

**Solution**: Using extended syntax:
- $[a\text{-}z]^+ @ [a\text{-}z]^+ \backslash. [a\text{-}z]^+$

Breaking it down:
- $[a\text{-}z]^+$: one or more lowercase letters
- $@$: literal at symbol
- $\backslash.$: escaped dot (dot is wildcard otherwise)

### Example 3: Comments in Programming

**Problem**: Match C-style comments `/* ... */`

**Solution**: $/\backslash* \Sigma^* \backslash*/$

However, this is greedy and matches too much. The correct minimal match requires:
$$/\backslash* (\Sigma - \{*\})^* \backslash*^+ ((\Sigma - \{/, *\}) (\Sigma - \{*\})^* \backslash*^+)^* /$$

This demonstrates regex complexity for seemingly simple patterns.

## Practical Applications

### Text Processing

Regular expressions are ubiquitous in text manipulation:
- **Search and replace**: editors like vim, emacs, VSCode
- **Validation**: email addresses, phone numbers, dates
- **Extraction**: parsing log files, extracting data from text

### Lexical Analysis

Compilers use regex for tokenization:
```
IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]*
NUMBER: [0-9]+(\.[0-9]+)?
STRING: "([^"\\]|\\.)*"
```

The lexer converts source code into tokens, with each token type defined by a regex.

### Pattern Matching in Programming Languages

Modern languages provide regex support:
- **Python**: `re` module
- **JavaScript**: built-in regex literals `/pattern/flags`
- **Java**: `java.util.regex` package
- **Perl**: native regex integration

## Design Considerations

### Writing Clear Regexes

1. **Use parentheses liberally**: Make precedence explicit
2. **Factor common patterns**: $(abc \mid abd) \rightarrow ab(c \mid d)$
3. **Avoid redundancy**: $a^*a^* \rightarrow a^*$
4. **Document complex patterns**: Add comments explaining intent

### Performance Implications

Different constructions have different costs:
- **DFA matching**: $O(n)$ time, guaranteed
- **NFA backtracking**: Potentially exponential
- **Greedy vs. non-greedy**: Affects match length and speed

For critical applications, convert to DFA or use DFA-based engines.

## Connection to Formal Language Theory

Regular expressions are equivalent in power to:
- **Finite automata** (DFA/NFA)
- **Right-linear grammars**
- **Monadic second-order logic** (MSO) over strings

This equivalence means:
- Any regex can be converted to a DFA
- Any DFA can be converted to a regex
- Regex can express exactly the regular languages, no more, no less

Languages **not** expressible by regex:
- $\{a^n b^n \mid n \geq 0\}$: balanced parentheses
- $\{ww \mid w \in \Sigma^*\}$: repeated substrings
- Prime-length strings (in unary)

These require more powerful models like context-free grammars or Turing machines.

## Key Takeaways

- Regular expressions provide a **concise algebraic notation** for describing regular languages using three basic operations: union, concatenation, and Kleene star
- **Operator precedence** matters: star binds tightest, then concatenation, then union (use parentheses for clarity)
- The formal definition uses **inductive construction**: base cases (ε, ∅, single symbols) and recursive cases (union, concatenation, star)
- **Extended syntax** (like +, ?, character classes, bounded repetition) adds convenience but doesn't increase expressive power
- Two regexes are **equivalent** if they denote the same language; testing equivalence requires converting to minimal DFAs
- Regular expressions are widely used in **text processing, lexical analysis, and pattern matching** across programming languages
- Regex design should balance **clarity, simplicity, and performance**; complex patterns may need conversion to DFA for efficiency
- Regular expressions are **equivalent to finite automata** and can express exactly the regular languages—no more, no less
