import { WrittenExercise } from '../../../../core/types';

export const topic3Exercises: WrittenExercise[] = [
  {
    id: 'cs203-t3-ex1',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Basic CFG Design',
    description: 'Design a context-free grammar for the language L = {aⁿbⁿ | n ≥ 1}. Show derivations for "ab" and "aabb".',
    difficulty: 1,
    hints: [
      'Each "a" must be matched with a "b"',
      'Think recursively: add one "a" and one "b" at a time',
      'Need to ensure at least one of each',
    ],
    solution: `**Context-Free Grammar for L = {aⁿbⁿ | n ≥ 1}**

**Grammar G:**
S → aSb | ab

**Alternative (using n ≥ 0 base):**
S → aSb | ε would give {aⁿbⁿ | n ≥ 0}
For n ≥ 1: S → aSb | ab

**Derivation of "ab":**
S ⇒ ab

**Derivation of "aabb":**
S ⇒ aSb ⇒ aabb

**Derivation of "aaabbb":**
S ⇒ aSb ⇒ aaSbb ⇒ aaabbb

**Correctness argument:**

**Claim:** L(G) = {aⁿbⁿ | n ≥ 1}

*Part 1: L(G) ⊆ {aⁿbⁿ | n ≥ 1}*
- Every derivation starts with S
- S → ab produces a¹b¹ ✓
- S → aSb adds one 'a' prefix and one 'b' suffix
- By induction: after k applications of S → aSb followed by S → ab:
  - Result is aᵏ⁺¹bᵏ⁺¹ ∈ {aⁿbⁿ | n ≥ 1}

*Part 2: {aⁿbⁿ | n ≥ 1} ⊆ L(G)*
- For any n ≥ 1, apply S → aSb (n-1) times, then S → ab
- This produces aⁿbⁿ

**Parse tree for "aabb":**
\`\`\`
    S
   /|\\
  a S b
    |
   ab
\`\`\``,
  },
  {
    id: 'cs203-t3-ex2',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Grammar for Palindromes',
    description: 'Design a CFG for the language of all palindromes over {a, b}. Include derivations for "aba" and "abba".',
    difficulty: 1,
    hints: [
      'A palindrome reads the same forwards and backwards',
      'Add the same symbol to both ends',
      'Handle both odd and even length palindromes',
    ],
    solution: `**CFG for palindromes over {a, b}:**

**Grammar G:**
S → aSa | bSb | a | b | ε

**Explanation:**
- S → aSa: add 'a' to both ends
- S → bSb: add 'b' to both ends
- S → a: odd-length palindrome with 'a' center
- S → b: odd-length palindrome with 'b' center
- S → ε: even-length palindrome (empty center)

**Derivation of "aba":**
S ⇒ aSa ⇒ aba (using S → b)

**Derivation of "abba":**
S ⇒ aSa ⇒ abSba ⇒ abba (using S → ε)

**More examples:**
- "aa": S ⇒ aSa ⇒ aa (S → ε)
- "aaa": S ⇒ aSa ⇒ aaa (S → a)
- "baab": S ⇒ bSb ⇒ baSab ⇒ baab (S → ε)

**Parse tree for "abba":**
\`\`\`
      S
     /|\\
    a S a
     /|\\
    b S b
      |
      ε
\`\`\`

**Correctness:**
- Every derivation produces a palindrome (symmetric additions)
- Every palindrome can be derived:
  - Empty: use S → ε
  - Single char: use S → a or S → b
  - Longer: first and last chars match, recurse on middle`,
  },
  {
    id: 'cs203-t3-ex3',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Leftmost and Rightmost Derivations',
    description: 'For the grammar S → AB, A → aA | a, B → bB | b, give both leftmost and rightmost derivations for "aabb".',
    difficulty: 3,
    hints: [
      'Leftmost: always expand the leftmost variable',
      'Rightmost: always expand the rightmost variable',
      'Both should produce the same string',
    ],
    solution: `**Grammar:**
S → AB
A → aA | a
B → bB | b

**Leftmost derivation of "aabb":**
(Always expand the leftmost variable)

S ⇒_lm AB        (S → AB, expand S)
  ⇒_lm aAB       (A → aA, expand leftmost A)
  ⇒_lm aaB       (A → a, expand leftmost A)
  ⇒_lm aabB      (B → bB, expand leftmost B)
  ⇒_lm aabb      (B → b, expand leftmost B)

**Rightmost derivation of "aabb":**
(Always expand the rightmost variable)

S ⇒_rm AB        (S → AB, expand S)
  ⇒_rm AbB       (B → bB, expand rightmost B)
  ⇒_rm Abb       (B → b, expand rightmost B)
  ⇒_rm aAbb      (A → aA, expand rightmost A, which is the only A)
  ⇒_rm aabb      (A → a, expand rightmost A)

**Both produce: "aabb" ✓**

**Parse tree (same for both):**
\`\`\`
      S
     / \\
    A   B
   /|   |\\
  a A   b B
    |     |
    a     b
\`\`\`

**Key insight:**
- Different derivations, same parse tree
- Leftmost and rightmost derivations are canonical forms
- Ambiguity occurs when multiple leftmost (or rightmost) derivations exist for the same string`,
  },
  {
    id: 'cs203-t3-ex4',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Ambiguous Grammar',
    description: 'Show that the grammar S → SS | a | b is ambiguous by finding a string with two different parse trees.',
    difficulty: 3,
    hints: [
      'Try a string with at least 3 symbols',
      'Think about different ways to group concatenations',
      'Consider how "aab" could be parsed',
    ],
    solution: `**Proving ambiguity of S → SS | a | b**

**Consider the string "aab":**

**Parse Tree 1:** Group as (aa)b
\`\`\`
      S
     / \\
    S   S
   /\\   |
  S  S  b
  |  |
  a  a
\`\`\`
Derivation: S ⇒ SS ⇒ SSS ⇒ aSS ⇒ aaS ⇒ aab

**Parse Tree 2:** Group as a(ab)
\`\`\`
      S
     / \\
    S   S
    |  / \\
    a S   S
      |   |
      a   b
\`\`\`
Derivation: S ⇒ SS ⇒ aS ⇒ aSS ⇒ aaS ⇒ aab

**These are different parse trees for the same string "aab".**

**Leftmost derivations:**
1. S ⇒ SS ⇒ SSS ⇒ aSS ⇒ aaS ⇒ aab
2. S ⇒ SS ⇒ aS ⇒ aSS ⇒ aaS ⇒ aab

**Wait, these look similar. Let me reconsider the trees:**

Actually, for tree 1: S ⇒ SS ⇒ (SS)S ⇒ ... different structure
For tree 2: S ⇒ SS ⇒ S(SS) ⇒ ...

**Clearer leftmost derivations:**
Tree 1: S ⇒ SS ⇒ SSS ⇒ aSSS → ... wait, this gets complicated.

**Better approach - use "ab":**
- Tree 1: S → SS → aS → ab (left child is 'a', right child is 'b')
- Tree 2: This is the only parse for "ab" with SS

**For "aaa":**
\`\`\`
Tree 1:       S           Tree 2:       S
            / \\                       / \\
           S   S                     S   S
          /\\   |                     |   |\\
         S  S  a                     a  S  S
         |  |                           |  |
         a  a                           a  a
\`\`\`

These represent (a·a)·a vs a·(a·a) - different parse trees!

**Conclusion:** The grammar is ambiguous because "aaa" (and "aab") have multiple distinct parse trees. ∎`,
  },
  {
    id: 'cs203-t3-ex5',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Chomsky Normal Form Conversion',
    description: 'Convert the grammar S → aAB, A → bB | ε, B → b to Chomsky Normal Form.',
    difficulty: 5,
    hints: [
      'First eliminate ε-productions',
      'Then eliminate unit productions',
      'Finally convert to binary productions with terminals replaced',
    ],
    solution: `**Converting to Chomsky Normal Form**

**Original grammar:**
S → aAB
A → bB | ε
B → b

**Step 1: Eliminate ε-productions**

Nullable variables: A (since A → ε)

For each production with A, add version without A:
- S → aAB becomes S → aAB | aB
- A → bB stays (no A on right side)
- B → b stays

Remove A → ε.

After Step 1:
S → aAB | aB
A → bB
B → b

**Step 2: Eliminate unit productions**
No unit productions (A → B form), so nothing to do.

**Step 3: Convert to CNF**

CNF requires: A → BC or A → a

**Problem productions:**
- S → aAB (length 3, starts with terminal)
- S → aB (length 2, has terminal)
- A → bB (length 2, has terminal)

**Fix 1:** Replace terminals with new variables
- Create Cₐ → a, C_b → b

After replacement:
S → CₐAB | CₐB
A → C_bB
B → b
Cₐ → a
C_b → b

**Fix 2:** Break long productions into binary
- S → CₐAB becomes S → CₐD, D → AB

**Final CNF grammar:**
S → CₐD | CₐB
D → AB
A → C_bB
B → b
Cₐ → a
C_b → b

**Verification for "abB" → "abb":**
S ⇒ CₐD ⇒ aD ⇒ aAB ⇒ aC_bBB ⇒ abBB ⇒ abbB ⇒ abbb
Hmm, let's trace "ab":
S ⇒ CₐB ⇒ aB ⇒ ab ✓`,
  },
  {
    id: 'cs203-t3-ex6',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Pumping Lemma for CFLs',
    description: 'Use the pumping lemma for context-free languages to prove that L = {aⁿbⁿcⁿ | n ≥ 0} is not context-free.',
    difficulty: 5,
    hints: [
      'Choose string aᵖbᵖcᵖ where p is the pumping length',
      'For s = uvxyz, vy can\'t cover all three symbols equally',
      'Pumping will unbalance the counts',
    ],
    solution: `**Proof that L = {aⁿbⁿcⁿ | n ≥ 0} is not context-free**

Assume for contradiction that L is context-free with pumping length p.

**Choose string:** s = aᵖbᵖcᵖ ∈ L with |s| = 3p ≥ p

**Apply CFL pumping lemma:** s = uvxyz where:
1. |vy| > 0 (v and y aren't both empty)
2. |vxy| ≤ p
3. uvⁱxyⁱz ∈ L for all i ≥ 0

**Key constraint:** |vxy| ≤ p

Since |vxy| ≤ p and s = aᵖbᵖcᵖ, the substring vxy:
- Can span at most two different symbol types
- Cannot span all three (a's, b's, and c's)

**Case analysis:**

**Case 1:** vxy is entirely within aᵖ (all a's)
Then vy consists only of a's.
Pumping: uv²xy²z has more a's than b's or c's.
So uv²xy²z ∉ L (unequal counts). Contradiction.

**Case 2:** vxy is entirely within bᵖ (all b's)
Then vy consists only of b's.
Pumping: uv²xy²z has more b's than a's or c's.
So uv²xy²z ∉ L. Contradiction.

**Case 3:** vxy is entirely within cᵖ (all c's)
Then vy consists only of c's.
Pumping: uv²xy²z has more c's than a's or b's.
So uv²xy²z ∉ L. Contradiction.

**Case 4:** vxy spans a's and b's
Then vy contains only a's and b's (no c's).
Pumping: uv²xy²z has more a's and/or b's, same c's.
Since |vy| > 0, at least one of a-count or b-count increases.
But c-count stays at p.
So uv²xy²z ∉ L. Contradiction.

**Case 5:** vxy spans b's and c's
Then vy contains only b's and c's (no a's).
Pumping increases b's and/or c's, a-count stays at p.
So uv²xy²z ∉ L. Contradiction.

**All cases lead to contradiction.**

**Conclusion:** L = {aⁿbⁿcⁿ} is not context-free. ∎`,
  },
  {
    id: 'cs203-t3-ex7',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'CFG for Expression Grammar',
    description: 'Design an unambiguous CFG for arithmetic expressions with +, *, and parentheses over variable x. Ensure * has higher precedence than + and both are left-associative.',
    difficulty: 5,
    hints: [
      'Use separate non-terminals for different precedence levels',
      'Lower precedence operators at higher levels of the grammar',
      'Left-recursion gives left-associativity',
    ],
    solution: `**Unambiguous Expression Grammar**

**Grammar G:**
E → E + T | T
T → T * F | F
F → (E) | x

**Explanation:**
- E (Expression): handles addition (lowest precedence)
- T (Term): handles multiplication (higher precedence)
- F (Factor): handles atoms and parentheses (highest precedence)

**Precedence enforcement:**
- * binds tighter because T appears inside E's production
- To reach * in E + T, must go through T first
- Parentheses override precedence by restarting with E

**Left-associativity:**
- E → E + T makes + left-associative: x+x+x = (x+x)+x
- T → T * F makes * left-associative: x*x*x = (x*x)*x

**Example derivations:**

**"x+x*x" (should be x+(x*x)):**
E ⇒ E + T ⇒ T + T ⇒ F + T ⇒ x + T ⇒ x + T * F ⇒ x + F * F ⇒ x + x * F ⇒ x + x * x

Parse tree groups as x + (x * x) ✓

**"x+x+x" (should be (x+x)+x):**
E ⇒ E + T ⇒ E + T + T ⇒ T + T + T ⇒ x + T + T ⇒ x + x + T ⇒ x + x + x

Wait, that derivation doesn't show left-assoc clearly. Correct tree:
E ⇒ E + T ⇒ (E + T) + T ⇒ ... leftmost E becomes x+x, then +T gives +x

**Parse tree for x+x+x:**
\`\`\`
        E
       /|\\
      E + T
     /|\\  |
    E + T  x
    |   |
    T   x
    |
    x
\`\`\`

This groups as ((x)+x)+x = (x+x)+x ✓`,
  },
  {
    id: 'cs203-t3-ex8',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Closure Under Union',
    description: 'Prove that context-free languages are closed under union. Given CFGs G₁ and G₂, construct a CFG for L(G₁) ∪ L(G₂).',
    difficulty: 3,
    hints: [
      'Create a new start symbol',
      'Choose which grammar to use',
      'Ensure variable names don\'t clash',
    ],
    solution: `**Theorem:** CFLs are closed under union.

**Proof by construction:**

Let G₁ = (V₁, Σ, R₁, S₁) generate L₁
Let G₂ = (V₂, Σ, R₂, S₂) generate L₂

Assume V₁ ∩ V₂ = ∅ (rename if necessary).

**Construct G = (V, Σ, R, S) for L₁ ∪ L₂:**

- V = V₁ ∪ V₂ ∪ {S} where S is new
- R = R₁ ∪ R₂ ∪ {S → S₁ | S₂}
- Start symbol: S

**Correctness:**

**Part 1: L(G) ⊆ L₁ ∪ L₂**
Any derivation in G starts with S → S₁ or S → S₂.
- If S → S₁: subsequent derivation uses only R₁ rules, producing string in L₁
- If S → S₂: subsequent derivation uses only R₂ rules, producing string in L₂
Therefore any string derived is in L₁ or L₂.

**Part 2: L₁ ∪ L₂ ⊆ L(G)**
- If w ∈ L₁: S ⇒ S₁ ⇒* w using R₁ rules
- If w ∈ L₂: S ⇒ S₂ ⇒* w using R₂ rules
Therefore any string in L₁ ∪ L₂ can be derived in G.

**Example:**
G₁: S₁ → aS₁b | ε (generates {aⁿbⁿ})
G₂: S₂ → cS₂ | ε (generates c*)

G: S → S₁ | S₂
   S₁ → aS₁b | ε
   S₂ → cS₂ | ε

L(G) = {aⁿbⁿ | n ≥ 0} ∪ {cᵐ | m ≥ 0} ∎`,
  },
  {
    id: 'cs203-t3-ex9',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Non-Closure Under Intersection',
    description: 'Prove that context-free languages are NOT closed under intersection using specific languages.',
    difficulty: 3,
    hints: [
      'Use two CFLs whose intersection is not context-free',
      'Consider {aⁿbⁿcᵐ} ∩ {aᵐbⁿcⁿ}',
      'The intersection would require matching all three',
    ],
    solution: `**Theorem:** CFLs are NOT closed under intersection.

**Proof:**

**Define two context-free languages:**
- L₁ = {aⁿbⁿcᵐ | n, m ≥ 0}
- L₂ = {aᵐbⁿcⁿ | n, m ≥ 0}

**Show L₁ is context-free:**
Grammar for L₁:
S → AB
A → aAb | ε
B → cB | ε

This generates strings with equal a's and b's, followed by any number of c's.
L₁ is context-free. ✓

**Show L₂ is context-free:**
Grammar for L₂:
S → AB
A → aA | ε
B → bBc | ε

This generates any number of a's, followed by equal b's and c's.
L₂ is context-free. ✓

**Compute L₁ ∩ L₂:**
w ∈ L₁ ∩ L₂ ⟺ w ∈ L₁ AND w ∈ L₂
⟺ w = aⁿbⁿcᵐ AND w = aᵐ'bⁿ'cⁿ'
⟺ n = n' (number of a's = number where a's match)...

Actually: w = aⁱbʲcᵏ where:
- From L₁: i = j (equal a's and b's)
- From L₂: j = k (equal b's and c's)
- Combined: i = j = k

**Therefore: L₁ ∩ L₂ = {aⁿbⁿcⁿ | n ≥ 0}**

**We proved earlier that {aⁿbⁿcⁿ} is NOT context-free.**

**Conclusion:**
L₁ and L₂ are both context-free, but L₁ ∩ L₂ is not context-free.

Therefore CFLs are not closed under intersection. ∎

**Corollary:** CFLs are not closed under complement either.
(If closed under complement: L₁ ∩ L₂ = (L̄₁ ∪ L̄₂)̄ using De Morgan's law. Union is closed, so intersection would be closed. Contradiction.)`,
  },
  {
    id: 'cs203-t3-ex10',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'CYK Parsing Algorithm',
    description: 'Use the CYK algorithm to determine if "baaba" is in the language of the CNF grammar: S → AB | BC, A → BA | a, B → CC | b, C → AB | a.',
    difficulty: 5,
    hints: [
      'Build a triangular table bottom-up',
      'Row 1: which variables generate each single symbol',
      'Each cell (i,j): which variables generate substring from i of length j',
    ],
    solution: `**CYK Algorithm for "baaba"**

**Grammar in CNF:**
S → AB | BC
A → BA | a
B → CC | b
C → AB | a

**String:** b a a b a (positions 1,2,3,4,5)

**Build table T where T[i,j] = variables generating substring starting at i with length j**

**Row 1 (length 1):**
- T[1,1]: b → {B} (B → b)
- T[2,1]: a → {A, C} (A → a, C → a)
- T[3,1]: a → {A, C}
- T[4,1]: b → {B}
- T[5,1]: a → {A, C}

**Row 2 (length 2):**
- T[1,2]: "ba" = T[1,1]·T[2,1] = {B}·{A,C}
  - B·A = BA → A, so A ∈ T[1,2]
  - B·C = BC → S, so S ∈ T[1,2]
  - T[1,2] = {A, S}

- T[2,2]: "aa" = T[2,1]·T[3,1] = {A,C}·{A,C}
  - A·A = AA → nothing
  - A·C = AC → nothing
  - C·A = CA → nothing
  - C·C = CC → B, so B ∈ T[2,2]
  - T[2,2] = {B}

- T[3,2]: "ab" = T[3,1]·T[4,1] = {A,C}·{B}
  - A·B = AB → S,C, so S,C ∈ T[3,2]
  - C·B = CB → nothing
  - T[3,2] = {S, C}

- T[4,2]: "ba" = T[4,1]·T[5,1] = {B}·{A,C}
  - B·A = BA → A
  - B·C = BC → S
  - T[4,2] = {A, S}

**Row 3 (length 3):**
- T[1,3]: "baa" = T[1,1]·T[2,2] ∪ T[1,2]·T[3,1]
  - {B}·{B} = BB → nothing
  - {A,S}·{A,C} = AA,AC,SA,SC → nothing
  - T[1,3] = {}

- T[2,3]: "aab" = T[2,1]·T[3,2] ∪ T[2,2]·T[4,1]
  - {A,C}·{S,C} = AS,AC,CS,CC → CC → B
  - {B}·{B} = BB → nothing
  - T[2,3] = {B}

- T[3,3]: "aba" = T[3,1]·T[4,2] ∪ T[3,2]·T[5,1]
  - {A,C}·{A,S} = AA,AS,CA,CS → nothing
  - {S,C}·{A,C} = SA,SC,CA,CC → CC → B
  - T[3,3] = {B}

**Row 4 (length 4):**
- T[1,4]: "baab" = T[1,1]·T[2,3] ∪ T[1,2]·T[3,2] ∪ T[1,3]·T[4,1]
  - {B}·{B} = BB → nothing
  - {A,S}·{S,C} = AS,AC,SS,SC → nothing
  - {}·{B} = nothing
  - T[1,4] = {}

- T[2,4]: "aaba" = T[2,1]·T[3,3] ∪ T[2,2]·T[4,2] ∪ T[2,3]·T[5,1]
  - {A,C}·{B} = AB,CB → AB → S,C
  - {B}·{A,S} = BA,BS → BA → A
  - {B}·{A,C} = BA,BC → BA → A, BC → S
  - T[2,4] = {S, C, A}

**Row 5 (length 5):**
- T[1,5]: "baaba" = T[1,1]·T[2,4] ∪ T[1,2]·T[3,3] ∪ T[1,3]·T[4,2] ∪ T[1,4]·T[5,1]
  - {B}·{S,C,A} = BS,BC,BA → BC → S, BA → A
  - {A,S}·{B} = AB,SB → AB → S,C
  - {}·{A,S} = nothing
  - {}·{A,C} = nothing
  - T[1,5] = {S, A, C}

**S ∈ T[1,5], so "baaba" ∈ L(G) ✓**`,
  },
  {
    id: 'cs203-t3-ex11',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Eliminating ε-Productions',
    description: 'Remove ε-productions from the grammar: S → ABC, A → aA | ε, B → bB | ε, C → c.',
    difficulty: 3,
    hints: [
      'Find all nullable variables',
      'For each production with nullable variables, add versions without them',
      'Remove the ε-productions themselves',
    ],
    solution: `**Eliminating ε-Productions**

**Original grammar:**
S → ABC
A → aA | ε
B → bB | ε
C → c

**Step 1: Find nullable variables**
- A is nullable (A → ε)
- B is nullable (B → ε)
- S is nullable? S → ABC, need A, B, C all nullable. C is not nullable.
- So nullable = {A, B}

**Step 2: Add productions for each way to omit nullable variables**

For S → ABC:
- Keep ABC
- Omit A: BC
- Omit B: AC
- Omit both A and B: C
New: S → ABC | BC | AC | C

For A → aA:
- Keep aA
- Omit A: a
New: A → aA | a

For B → bB:
- Keep bB
- Omit B: b
New: B → bB | b

For C → c:
- No nullable variables
Keep: C → c

**Step 3: Remove ε-productions**
Remove A → ε and B → ε

**Final grammar (ε-free):**
S → ABC | BC | AC | C
A → aA | a
B → bB | b
C → c

**Verification:**
Original: S ⇒ ABC ⇒ aABC ⇒ aBC ⇒ abBC ⇒ abC ⇒ abc (using ε twice)
New: S ⇒ AC ⇒ aAC ⇒ aC... wait let me redo:
New: S ⇒ AC ⇒ aC ⇒ ac (if A → a)
New: S ⇒ ABC ⇒ aABC ⇒ aBC ⇒ abC ⇒ abc ✓`,
  },
  {
    id: 'cs203-t3-ex12',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Eliminating Unit Productions',
    description: 'Remove unit productions from: S → A | ab, A → B | a, B → S | bb.',
    difficulty: 3,
    hints: [
      'Unit productions are A → B where B is a single variable',
      'Find all unit pairs (A, B) where A ⇒* B using only unit productions',
      'Replace with non-unit productions',
    ],
    solution: `**Eliminating Unit Productions**

**Original grammar:**
S → A | ab
A → B | a
B → S | bb

**Step 1: Identify unit productions**
- S → A (unit)
- A → B (unit)
- B → S (unit)

**Step 2: Compute unit pairs (transitive closure)**
Unit pairs (X, Y) where X ⇒* Y using only unit productions:

Reflexive: (S,S), (A,A), (B,B)

Direct unit productions:
- S → A: (S, A)
- A → B: (A, B)
- B → S: (B, S)

Transitive:
- (S, A) and (A, B) → (S, B)
- (A, B) and (B, S) → (A, S)
- (B, S) and (S, A) → (B, A)
- Continue: (S, B) and (B, S) → (S, S) already have
- (B, A) and (A, B) → (B, B) already have

**All unit pairs:** {(S,S), (S,A), (S,B), (A,A), (A,B), (A,S), (B,B), (B,S), (B,A)}

**Step 3: For each unit pair (X, Y), add X → α for each non-unit Y → α**

Non-unit productions:
- S → ab
- A → a
- B → bb

For (S, S): S → ab (already there)
For (S, A): S → a
For (S, B): S → bb
For (A, A): A → a (already there)
For (A, B): A → bb
For (A, S): A → ab
For (B, B): B → bb (already there)
For (B, S): B → ab
For (B, A): B → a

**Step 4: Remove unit productions**

**Final grammar:**
S → ab | a | bb
A → a | bb | ab
B → bb | ab | a

**Verification:**
Original: S ⇒ A ⇒ B ⇒ bb
New: S ⇒ bb ✓`,
  },
  {
    id: 'cs203-t3-ex13',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Grammar for Matching Brackets',
    description: 'Design a CFG for strings of properly nested brackets using [ and ]. Include strings like "[]", "[[]]", "[][]", "[[][]]".',
    difficulty: 1,
    hints: [
      'Each [ must have a matching ]',
      'Brackets can be nested or sequential',
      'Think recursively: balanced string = [ balanced ] or concat of balanced',
    ],
    solution: `**CFG for Properly Nested Brackets**

**Grammar G:**
S → [S] | SS | ε

**Alternative (often cleaner):**
S → [S]S | ε

**Explanation:**
- S → ε: empty string is balanced
- S → [S]: a pair of brackets around a balanced string
- S → SS: concatenation of two balanced strings
- Combined [S]S handles both nesting and sequence

**Derivations:**

**"[]":**
S ⇒ [S] ⇒ [] (using S → ε)

**"[[]]":**
S ⇒ [S] ⇒ [[S]] ⇒ [[]]

**"[][]":**
S ⇒ SS ⇒ [S]S ⇒ []S ⇒ [][S] ⇒ [][]

Or with S → [S]S:
S ⇒ [S]S ⇒ []S ⇒ [][S]S ⇒ [][ε]ε ⇒ [][]

**"[[][]]":**
S ⇒ [S] ⇒ [SS] ⇒ [[S]S] ⇒ [[]S] ⇒ [[][S]] ⇒ [[][][]]

Hmm, that's [[][]], let me redo:
S ⇒ [S] ⇒ [SS] ⇒ [[S]S] ⇒ [[][S]] ⇒ [[][][]]...

For exactly "[[][]]":
S ⇒ [S] ⇒ [SS] ⇒ [[S][S]] ⇒ [[][]] ✓

**Parse tree for "[[]][]":**
\`\`\`
       S
      /|
     S S
    /|  |\\
   [ S ] []
     |
    [S]
     |
     ε
\`\`\`

Using S → [S]S version:
\`\`\`
         S
        /|\\\\
       [ S ] S
         |   |\\\\
        [S]S [ S ] S
         | |   |   |
         ε ε   ε   ε
\`\`\``,
  },
  {
    id: 'cs203-t3-ex14',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Greibach Normal Form',
    description: 'Describe Greibach Normal Form (GNF) and explain why every CFG without ε (except possibly S → ε) can be converted to GNF.',
    difficulty: 5,
    hints: [
      'GNF requires all productions to start with a terminal',
      'This is useful for PDA construction',
      'Conversion involves left-recursion elimination',
    ],
    solution: `**Greibach Normal Form (GNF)**

**Definition:**
A CFG is in Greibach Normal Form if every production has the form:
A → aα
where a ∈ Σ (terminal) and α ∈ V* (string of variables)

Special case: S → ε is allowed only if S doesn't appear on any right-hand side.

**Properties of GNF:**
1. Every production starts with exactly one terminal
2. Followed by zero or more variables
3. Reading one terminal = one derivation step
4. Natural correspondence with PDAs (one input symbol per transition)

**Why every ε-free CFG can be converted to GNF:**

**Sketch of conversion algorithm:**

1. **Start with CNF** (or any ε-free form)

2. **Order variables:** A₁, A₂, ..., Aₙ

3. **Transform productions so Aᵢ → Aⱼγ only when j > i:**
   - If Aᵢ → Aⱼγ with j < i: substitute Aⱼ's productions
   - If Aᵢ → Aᵢγ (left recursion): eliminate using new variable

4. **Eliminate left recursion:**
   For Aᵢ → Aᵢα₁ | ... | Aᵢαₘ | β₁ | ... | βₖ (βⱼ don't start with Aᵢ):
   Replace with:
   - Aᵢ → β₁ | ... | βₖ | β₁Bᵢ | ... | βₖBᵢ
   - Bᵢ → α₁ | ... | αₘ | α₁Bᵢ | ... | αₘBᵢ

5. **After step 4:** All productions Aᵢ → Aⱼγ have j > i

6. **Back-substitute:** Starting from Aₙ (highest), substitute downward so all productions start with terminals

**Example:**
A → Aa | Ab | c
Eliminate left recursion:
A → c | cB
B → a | b | aB | bB

Now all productions for A start with terminal 'c'. ✓

**Key insight:** Left recursion elimination and systematic substitution guarantee we can always make productions start with terminals.

**GNF is useful for:**
- PDA construction (one-to-one with derivation steps)
- Proving |derivation| = |string| for non-ε strings
- Parsing algorithms`,
  },
  {
    id: 'cs203-t3-ex15',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Inherent Ambiguity',
    description: 'Explain what it means for a context-free language to be inherently ambiguous. Give an example of such a language.',
    difficulty: 5,
    hints: [
      'Inherent ambiguity is about the language, not a specific grammar',
      'No unambiguous grammar exists for the language',
      'Classic example involves matching two different things',
    ],
    solution: `**Inherent Ambiguity**

**Definition:**
A context-free language L is **inherently ambiguous** if every CFG G with L(G) = L is ambiguous.

In other words, no unambiguous grammar exists for L.

**Key distinction:**
- Ambiguous grammar: some string has multiple parse trees
- Inherently ambiguous language: EVERY grammar for it is ambiguous

**Classic example:**
L = {aⁿbⁿcᵐdᵐ | n, m ≥ 1} ∪ {aⁿbᵐcᵐdⁿ | n, m ≥ 1}

**Why L is inherently ambiguous:**

Consider strings where n = m, e.g., a²b²c²d² = "aabbccdd"

This string is in L because:
1. It's in {aⁿbⁿcᵐdᵐ} with n = 2, m = 2
2. It's in {aⁿbᵐcᵐdⁿ} with n = 2, m = 2

Any grammar for L must handle both cases. For strings where n = m, the grammar cannot "know" which pattern applies, leading to two fundamentally different derivations.

**Proof sketch (Ogden's lemma based):**
- Use Ogden's lemma (marked pumping lemma) to show that any grammar must have productions that can derive both patterns independently for certain strings.
- The "overlap" strings (n = m) will always have multiple derivations.

**Another example:**
L = {aⁱbʲcᵏ | i = j or j = k}

Strings with i = j = k are in L via both conditions, causing inherent ambiguity.

**Implications:**
- Some CFLs have no unambiguous grammar
- LR/LL parsing cannot work for such languages
- Inherently ambiguous languages still have deterministic recognizers (parsers), just not unambiguous ones

**Contrast with removable ambiguity:**
L = {all strings over {a,b}} has:
- Ambiguous grammar: S → SS | a | b
- Unambiguous grammar: S → aS | bS | ε

So this L is NOT inherently ambiguous.`,
  },
  {
    id: 'cs203-t3-ex16',
    subjectId: 'cs203',
    topicId: 'cs203-topic-3',
    type: 'written',
    title: 'Closure Under Kleene Star',
    description: 'Prove that context-free languages are closed under Kleene star. Given a CFG G, construct a CFG for L(G)*.',
    difficulty: 3,
    hints: [
      'L* = {ε} ∪ L ∪ LL ∪ LLL ∪ ...',
      'Add a new start symbol',
      'Allow repeating derivations from the original grammar',
    ],
    solution: `**Theorem:** CFLs are closed under Kleene star.

**Proof by construction:**

Let G = (V, Σ, R, S) be a CFG for L.

Construct G' = (V', Σ, R', S') for L*:

**Construction:**
- V' = V ∪ {S'} where S' is a new start symbol
- R' = R ∪ {S' → SS' | ε}

**Alternative (cleaner) construction:**
- R' = R ∪ {S' → S S' | ε}

**Correctness:**

**Part 1: L(G') ⊆ L***
Any derivation in G' looks like:
S' ⇒ SS' ⇒ w₁S' ⇒ w₁SS' ⇒ w₁w₂S' ⇒ ... ⇒ w₁w₂...wₖS' ⇒ w₁w₂...wₖ

Where each wᵢ ∈ L (derived using original rules from S).
So the final string is w₁w₂...wₖ ∈ Lᵏ ⊆ L*.

Also S' ⇒ ε gives ε ∈ L⁰ ⊆ L*.

**Part 2: L* ⊆ L(G')**
For any w ∈ L*:
- If w = ε: S' ⇒ ε ✓
- If w = w₁w₂...wₖ where each wᵢ ∈ L:
  S' ⇒ SS' ⇒ w₁S' ⇒ w₁SS' ⇒ w₁w₂S' ⇒ ... ⇒ w₁...wₖS' ⇒ w₁...wₖ ✓

**Example:**
G: S → ab generates L = {ab}

G' for L*:
S' → SS' | ε
S → ab

Derivation of "abab":
S' ⇒ SS' ⇒ abS' ⇒ abSS' ⇒ ababS' ⇒ abab ✓

Derivation of ε:
S' ⇒ ε ✓

**Result:** L(G') = L* = {ε, ab, abab, ababab, ...} ∎`,
  },
];
