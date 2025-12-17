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
