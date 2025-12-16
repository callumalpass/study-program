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
