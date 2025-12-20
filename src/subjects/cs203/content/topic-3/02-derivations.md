# Derivations

Derivations show how strings are generated from a grammar's start symbol. Understanding derivations is essential for parsing and language analysis.

## Derivation Steps

A **derivation step** applies one production rule:

$$
\alpha A \beta \Rightarrow \alpha \gamma \beta
$$

where $A \to \gamma$ is a production in the grammar, and $\alpha, \beta \in (V \cup \Sigma)^*$ are arbitrary strings of variables and terminals.

## Derivation Sequences

A **derivation** is a sequence of steps:

$$
S \Rightarrow \alpha_1 \Rightarrow \alpha_2 \Rightarrow \cdots \Rightarrow \alpha_n = w
$$

We write $S \Rightarrow^* w$ to mean "$S$ derives $w$ in zero or more steps."

## Example Derivation

Grammar: $S \to AB$, $A \to aA \mid a$, $B \to bB \mid b$

Derive "aabb":

$$
\begin{align*}
S &\Rightarrow AB \\
  &\Rightarrow aAB \\
  &\Rightarrow aaB \\
  &\Rightarrow aabB \\
  &\Rightarrow aabb
\end{align*}
$$

## Leftmost Derivations

In a **leftmost derivation**, we always expand the leftmost variable.

Notation: $\Rightarrow_{\text{lm}}$

Example grammar: $E \to E+T \mid T$, $T \to T*F \mid F$, $F \to \text{id}$

Leftmost derivation of "id + id":

$$
\begin{align*}
E &\Rightarrow_{\text{lm}} E + T \\
  &\Rightarrow_{\text{lm}} T + T \\
  &\Rightarrow_{\text{lm}} F + T \\
  &\Rightarrow_{\text{lm}} \text{id} + T \\
  &\Rightarrow_{\text{lm}} \text{id} + F \\
  &\Rightarrow_{\text{lm}} \text{id} + \text{id}
\end{align*}
$$

## Rightmost Derivations

In a **rightmost derivation**, we always expand the rightmost variable.

Notation: $\Rightarrow_{\text{rm}}$

Rightmost derivation of "id + id":

$$
\begin{align*}
E &\Rightarrow_{\text{rm}} E + T \\
  &\Rightarrow_{\text{rm}} E + F \\
  &\Rightarrow_{\text{rm}} E + \text{id} \\
  &\Rightarrow_{\text{rm}} T + \text{id} \\
  &\Rightarrow_{\text{rm}} F + \text{id} \\
  &\Rightarrow_{\text{rm}} \text{id} + \text{id}
\end{align*}
$$

## Derivation Trees

A derivation can be represented as a tree:
- Root is labeled with start symbol
- Internal nodes are variables
- Children of node A are from applying rule A → X₁X₂...Xₖ
- Leaves are terminals (read left-to-right = derived string)

## Equivalence of Derivations

**Theorem**: For any derivation S ⇒* w, there exists:
1. A leftmost derivation S ⇒_lm* w
2. A rightmost derivation S ⇒_rm* w
3. A parse tree with yield w

All represent the same structural derivation.

## Derivation vs Parse Tree

- A derivation specifies the **order** of rule applications
- A parse tree shows only the **structure** (which rules, not order)
- Many derivations can correspond to one parse tree
- Exactly one leftmost derivation per parse tree

## Length of Derivations

For string w with parse tree having n internal nodes:
- Derivation has exactly n steps
- Each step expands one variable
- Length independent of order

## Sentential Forms

A **sentential form** is any string in (V ∪ Σ)* derivable from S.

A **left-sentential form** is reachable by leftmost derivation.
A **right-sentential form** is reachable by rightmost derivation.

## Example: Multiple Derivations

Grammar: S → AB, A → a, B → b

For string "ab":
- Leftmost: S ⇒ AB ⇒ aB ⇒ ab
- Rightmost: S ⇒ AB ⇒ Ab ⇒ ab
- Other: S ⇒ AB, then could do either A or B first

All yield the same parse tree with root S, children A and B.

## Derivation Complexity

Finding a derivation for w ∈ L(G):
- Naive: exponential search
- CYK algorithm: O(n³|G|) for |w| = n
- Earley parser: O(n³) worst case, O(n) for many practical grammars

## Relation to Parsing

**Parsing** = finding a derivation for an input string

Top-down parsing builds leftmost derivation.
Bottom-up parsing builds rightmost derivation in reverse.

## Detailed Example: Complex Expression

Let's work through a complete example with a more complex expression grammar to illustrate derivation techniques.

**Grammar**:
- E → E + T | E - T | T
- T → T * F | T / F | F
- F → (E) | num | id

**String to derive**: id + num * id

### Complete Leftmost Derivation

$$
\begin{align*}
E &\Rightarrow_{\text{lm}} E + T \\
  &\Rightarrow_{\text{lm}} T + T \\
  &\Rightarrow_{\text{lm}} F + T \\
  &\Rightarrow_{\text{lm}} \text{id} + T \\
  &\Rightarrow_{\text{lm}} \text{id} + T * F \\
  &\Rightarrow_{\text{lm}} \text{id} + F * F \\
  &\Rightarrow_{\text{lm}} \text{id} + \text{num} * F \\
  &\Rightarrow_{\text{lm}} \text{id} + \text{num} * \text{id}
\end{align*}
$$

Notice that at each step, we identify the leftmost variable in the current sentential form and replace it using an appropriate production rule. This process is deterministic once we choose which production to use for each variable.

### Complete Rightmost Derivation

$$
\begin{align*}
E &\Rightarrow_{\text{rm}} E + T \\
  &\Rightarrow_{\text{rm}} E + T * F \\
  &\Rightarrow_{\text{rm}} E + T * \text{id} \\
  &\Rightarrow_{\text{rm}} E + F * \text{id} \\
  &\Rightarrow_{\text{rm}} E + \text{num} * \text{id} \\
  &\Rightarrow_{\text{rm}} T + \text{num} * \text{id} \\
  &\Rightarrow_{\text{rm}} F + \text{num} * \text{id} \\
  &\Rightarrow_{\text{rm}} \text{id} + \text{num} * \text{id}
\end{align*}
$$

Both derivations produce the same final string, but in different orders. The leftmost derivation expands from left to right, while the rightmost derivation works from right to left.

## Derivation Strategies and Choice

When performing a derivation, we often face choices:
- Which variable to expand next?
- Which production rule to use?

**For leftmost/rightmost derivations**: The first choice is eliminated by the constraint (always leftmost/rightmost variable).

**For general derivations**: We can choose any variable, leading to many possible derivation sequences for the same string.

## Example: Derivation with Multiple Paths

Consider the grammar:
- S → AB
- A → aA | a
- B → bB | b

Derive "aabb":

**Path 1** (expand A fully first):
$$
S \Rightarrow AB \Rightarrow aAB \Rightarrow aaB \Rightarrow aabB \Rightarrow aabb
$$

**Path 2** (alternate between A and B):
$$
S \Rightarrow AB \Rightarrow aAB \Rightarrow aAbB \Rightarrow aaB \Rightarrow aabb
$$

**Path 3** (expand B first):
$$
S \Rightarrow AB \Rightarrow AbB \Rightarrow Abb \Rightarrow aAbb \Rightarrow aabb
$$

All three paths lead to the same string and represent the same underlying structure, just with different expansion orders.

## Applications of Leftmost Derivations

### Top-Down Parsing
Predictive parsers and recursive descent parsers construct leftmost derivations:
- Start with start symbol
- Process input left to right
- Predict which production to use based on lookahead

**LL(k) parsers** construct leftmost derivations using k symbols of lookahead.

### Syntax-Directed Translation
Compilers often use leftmost derivations because:
- Natural reading order (left to right)
- Attributes can be computed incrementally
- Matches typical program structure

## Applications of Rightmost Derivations

### Bottom-Up Parsing
Shift-reduce parsers and LR parsers construct rightmost derivations in reverse:
- Start with input string
- Reduce substrings to variables
- End at start symbol

**LR(k) parsers** construct rightmost derivations in reverse using k symbols of lookahead.

### Handle Identification
The rightmost derivation helps identify **handles**—substrings that can be reduced:
- In rightmost derivation, the last step reduces the handle
- Working backward reveals reduction sequence

## Derivation Ambiguity vs Grammar Ambiguity

It's crucial to distinguish:
- **Multiple derivation sequences**: Different orders of applying rules (normal for unambiguous grammars)
- **Multiple parse trees**: Different structures (indicates ambiguous grammar)

An unambiguous grammar can have:
- Many general derivations per string
- Exactly one leftmost derivation per string
- Exactly one rightmost derivation per string
- Exactly one parse tree per string

## Derivation Length and Bounds

For a grammar G in Chomsky Normal Form and string w of length n:

**Theorem**: Any derivation of w has exactly 2n - 1 steps.

**Proof**:
- CNF productions are A → BC or A → a
- Parse tree has n leaves (terminals)
- Parse tree has n - 1 internal nodes with two children (from A → BC rules)
- Parse tree has n leaf-producing nodes (from A → a rules)
- Total steps = (n - 1) + n = 2n - 1

For general CFGs, derivation length varies:
- Minimum: Can be as short as n (all productions of form A → w)
- Maximum: Unbounded (epsilon productions and unit productions can extend derivations)

## Verifying Derivations

To verify a derivation sequence is valid:

1. **Check start**: First sentential form must be S
2. **Check each step**: Each αAβ ⇒ αγβ requires A → γ in grammar
3. **Check variables**: Ensure leftmost/rightmost constraint if specified
4. **Check end**: Final sentential form must be the target string

## Advanced: Derivation Graphs

A **derivation graph** represents all possible derivations:
- Nodes are sentential forms
- Edges represent single derivation steps
- Paths from S to w represent derivations

For unambiguous grammars, all paths from S to w converge to the same parse tree structure.

## Canonical Derivations

**Canonical derivations** are standard forms used for comparison:
- Leftmost derivation is canonical for top-down parsing
- Rightmost derivation is canonical for bottom-up parsing

Using canonical forms:
- Simplifies algorithm design
- Enables efficient parsing
- Makes grammar analysis tractable

## Key Takeaways

- Derivations show the step-by-step generation of strings from a grammar's start symbol
- Leftmost derivations always expand the leftmost variable at each step
- Rightmost derivations always expand the rightmost variable at each step
- A single parse tree corresponds to many derivation sequences but only one leftmost and one rightmost derivation
- Top-down parsers build leftmost derivations; bottom-up parsers build rightmost derivations in reverse
- The order of rule applications affects the derivation sequence but not the final parse tree for unambiguous grammars
- Sentential forms are intermediate strings in derivations that may contain both variables and terminals
- Derivation length depends on grammar form; CNF grammars have predictable derivation lengths
- Understanding derivations is essential for parsing algorithm design and language recognition
