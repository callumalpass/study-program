import { WrittenExercise } from '../../../../core/types';

export const topic2Exercises: WrittenExercise[] = [
  {
    id: 'cs203-t2-ex1',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Basic Regular Expression',
    description: 'Write a regular expression for the language L = {w ∈ {a,b}* | w contains at least two a\'s}.',
    difficulty: 1,
    hints: [
      'Two a\'s with anything before, between, and after',
      'Use (a|b)* for "any string"',
      'Think: stuff, then a, then stuff, then a, then stuff',
    ],
    solution: `**Regular Expression:** (a|b)*a(a|b)*a(a|b)*

**Alternative forms:**
- b*ab*a(a|b)*
- (b|ab*a)*ab*a(a|b)* (more complex)

**Explanation:**
- (a|b)* matches any string (zero or more of 'a' or 'b')
- First 'a' ensures at least one a
- Second 'a' ensures at least two a's
- Pattern: [anything] a [anything] a [anything]

**Verification:**
- "aa" ∈ L: (a|b)* = ε, first a, (a|b)* = ε, second a, (a|b)* = ε ✓
- "bab" ∉ L: only one a ✗
- "abba" ∈ L: ε, a, bb, a, ε ✓
- "baba" ∈ L: b, a, b, a, ε ✓`,
  },
  {
    id: 'cs203-t2-ex2',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Language from Regular Expression',
    description: 'Describe in English the language defined by the regular expression (0|1)*1(0|1)(0|1). List all strings of length 4 or less in this language.',
    difficulty: 1,
    hints: [
      'Read the regex from left to right',
      'The suffix is fixed: 1 followed by two symbols',
      'Enumerate systematically',
    ],
    solution: `**Language description:**
All binary strings where the third-to-last symbol is 1.

Or equivalently: All binary strings ending with "1" followed by any two binary symbols.

**Structure:**
- (0|1)*: any prefix (including empty)
- 1: third-to-last must be 1
- (0|1): second-to-last is any bit
- (0|1): last is any bit

**Strings of length 4 or less:**

Length 3 (minimum): 1xy where x,y ∈ {0,1}
- 100, 101, 110, 111

Length 4: z1xy where z,x,y ∈ {0,1}
- 0100, 0101, 0110, 0111
- 1100, 1101, 1110, 1111

**Complete list:**
{100, 101, 110, 111, 0100, 0101, 0110, 0111, 1100, 1101, 1110, 1111}

**Total: 12 strings** (4 of length 3, 8 of length 4)

Note: No valid strings of length < 3 exist (need at least 3 symbols for "1 _ _" pattern).`,
  },
  {
    id: 'cs203-t2-ex3',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Thompson\'s Construction',
    description: 'Apply Thompson\'s construction to build an NFA for the regular expression (ab|b)*. Show the construction step by step.',
    difficulty: 3,
    hints: [
      'Build NFAs for primitives first',
      'Combine using standard constructions for |, ·, and *',
      'The result will have many ε-transitions',
    ],
    solution: `**Thompson's Construction for (ab|b)***

**Step 1: Build NFA for 'a'**
\`\`\`
(1) --a--> (2)
\`\`\`

**Step 2: Build NFA for 'b'**
\`\`\`
(3) --b--> (4)
\`\`\`

**Step 3: Build NFA for 'ab' (concatenation)**
Connect NFA(a) to NFA(b):
\`\`\`
(1) --a--> (2) --ε--> (3) --b--> (4)
\`\`\`

**Step 4: Build another NFA for 'b'**
\`\`\`
(5) --b--> (6)
\`\`\`

**Step 5: Build NFA for 'ab|b' (union)**
Add new start (7) with ε to both sub-NFAs, new accept (8):
\`\`\`
        ε--> (1) --a--> (2) --ε--> (3) --b--> (4) --ε--
       /                                              \\
(7) --<                                                >-- (8)
       \\                                              /
        ε--> (5) --b--> (6) --ε---------------------ε--
\`\`\`

**Step 6: Build NFA for (ab|b)* (Kleene star)**
Add new start (9) with ε to old start and new accept (10):
\`\`\`
     ε (skip)
(9) ---------> (10)
 |    ε         ^
 v              | ε (loop back)
(7) --> [ab|b NFA] --> (8) --ε--> (10)
                        |
                        ε--> (7)
\`\`\`

**Final NFA:**
- States: {9, 7, 1, 2, 3, 4, 5, 6, 8, 10}
- Start: 9
- Accept: {10}
- Transitions include ε-transitions for all connections`,
  },
  {
    id: 'cs203-t2-ex4',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'State Elimination Details',
    description: 'Use state elimination to convert this DFA to a regex: States {1, 2, 3}, start 1, accept 3. δ(1,a)=2, δ(1,b)=3, δ(2,a)=3, δ(2,b)=1, δ(3,a)=3, δ(3,b)=3. Eliminate state 2 first.',
    difficulty: 5,
    hints: [
      'First convert to GNFA with new start and accept',
      'When eliminating state 2, find all paths through it',
      'Update edge labels to include detour through eliminated state',
    ],
    solution: `**State Elimination Process**

**Step 1: Convert to GNFA**
Add start state S (→ε→ 1) and accept state F (3 →ε→ F)

Initial edges:
- S →ε→ 1
- 1 →a→ 2
- 1 →b→ 3
- 2 →a→ 3
- 2 →b→ 1
- 3 →(a|b)→ 3 (combine self-loops)
- 3 →ε→ F

**Step 2: Eliminate state 2**
Find paths through state 2:
- 1 →a→ 2 →a→ 3: path "aa"
- 1 →a→ 2 →b→ 1: path "ab" (back to 1)

No self-loop on state 2, so no iteration.

After elimination:
- S →ε→ 1
- 1 →b→ 3 (direct)
- 1 →aa→ 3 (through 2)
- 1 →ab→ 1 (through 2, back to 1)
- 3 →(a|b)→ 3
- 3 →ε→ F

Combine 1→3 edges: 1 →(b|aa)→ 3

**Step 3: Eliminate state 1**
Paths through 1:
- S →ε→ 1 →(b|aa)→ 3
- 1 has self-loop: 1 →ab→ 1

Path S to 3 through 1: ε·(ab)*·(b|aa) = (ab)*(b|aa)

After elimination:
- S →(ab)*(b|aa)→ 3
- 3 →(a|b)→ 3
- 3 →ε→ F

**Step 4: Eliminate state 3**
Path S to F through 3:
- S →(ab)*(b|aa)→ 3 →(a|b)*→ 3 →ε→ F

**Final regex: (ab)*(b|aa)(a|b)***

**Verification:**
- "b": (ab)⁰·b·(a|b)⁰ ✓
- "aa": (ab)⁰·aa·(a|b)⁰ ✓
- "aba": (ab)¹·a·(a|b)⁰ — but "aba" needs checking: 1→a→2→b→1→a→2→a→3 ✓`,
  },
  {
    id: 'cs203-t2-ex5',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Algebraic Simplification',
    description: 'Simplify the following regular expression using algebraic identities: (a|b)*(a|ε)(b|ε) Give the simplified form and list the identities used.',
    difficulty: 3,
    hints: [
      'Expand using distributivity',
      'Use (a|b)* properties',
      'a*a = a* · a, and (a|b)*a ⊆ (a|b)*',
    ],
    solution: `**Simplification of (a|b)*(a|ε)(b|ε)**

**Step 1: Expand (a|ε)(b|ε)**
Using distributivity: (r|s)(t|u) = rt|ru|st|su

(a|ε)(b|ε) = ab | a·ε | ε·b | ε·ε
           = ab | a | b | ε

**Step 2: Substitute back**
(a|b)*(ab | a | b | ε)

**Step 3: Distribute (a|b)***
= (a|b)*ab | (a|b)*a | (a|b)*b | (a|b)*ε

**Step 4: Simplify each term**
- (a|b)*ε = (a|b)* (identity: r·ε = r)
- (a|b)*a ⊆ (a|b)* (since (a|b)*a matches strings ending in 'a')
- Similarly (a|b)*b ⊆ (a|b)* and (a|b)*ab ⊆ (a|b)*

**Step 5: Key insight**
(a|b)* already contains all strings over {a,b}!

So: (a|b)*ab | (a|b)*a | (a|b)*b | (a|b)* = (a|b)*

(Union with subsets doesn't change the result)

**Final simplified form: (a|b)***

**Identities used:**
1. Distributivity: r(s|t) = rs|rt
2. Identity: r·ε = r
3. Absorption: r | rs = r for any s (when (a|b)*X ⊆ (a|b)*)
4. Idempotence: r | r = r`,
  },
  {
    id: 'cs203-t2-ex6',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Regex for Fixed Length',
    description: 'Write a regular expression for all binary strings of length exactly 4 that do not contain "00" as a substring.',
    difficulty: 3,
    hints: [
      'Enumerate patterns or think about "never two 0s in a row"',
      'After a 0, must have a 1',
      'Build up valid 4-symbol sequences',
    ],
    solution: `**Analysis:**
Need binary strings of length 4 with no "00" substring.

**Approach 1: Systematic enumeration**
After 0, must see 1. After 1, can see 0 or 1.

Valid patterns (where 0 can't be followed by 0):
Starting with 1: 1___ where each position follows the rule
Starting with 0: 01__ where each position follows the rule

**Building the regex:**
Let's think of it as: (1|01)* but constrained to length 4.

Possible 4-character strings:
- 1111 ✓
- 1110 ✓
- 1101 ✓
- 1100 ✗ (has "00")
- 1011 ✓
- 1010 ✓
- 1001 ✗
- 1000 ✗
- 0111 ✓
- 0110 ✓
- 0101 ✓
- 0100 ✗
- 0011 ✗
- 0010 ✗
- 0001 ✗
- 0000 ✗

Valid: {1111, 1110, 1101, 1011, 1010, 0111, 0110, 0101}

**Regular expression (explicit union):**
1111 | 1110 | 1101 | 1011 | 1010 | 0111 | 0110 | 0101

**Factored form:**
= 1(111|110|101|011|010) | 01(11|10|01)
= 1(1(11|10|01)|01(1|0)) | 01(1(1|0)|01)

**Cleaner factored form:**
(1|01)(1|01)(1|0)(1|ε) where we ensure length 4...

Actually simplest: **1(1|01)*(1|0) constrained to length 4:**

**(11|101|01)(11|10|01) | 1(11|10|01)(1|0)**

Or just enumerate: **1111|1110|1101|1011|1010|0111|0110|0101**`,
  },
  {
    id: 'cs203-t2-ex7',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Decision Problem - Emptiness',
    description: 'Describe an algorithm to decide whether the language of a given DFA is empty. What is the time complexity? Apply it to determine if the DFA with states {1,2,3}, start 1, accept {3}, δ(1,a)=2, δ(1,b)=1, δ(2,a)=2, δ(2,b)=2 has an empty language.',
    difficulty: 3,
    hints: [
      'Empty language means no accepting state is reachable',
      'Use graph reachability (BFS or DFS)',
      'The DFA is a directed graph',
    ],
    solution: `**Algorithm for DFA Emptiness:**

**Input:** DFA M = (Q, Σ, δ, q₀, F)
**Output:** TRUE if L(M) = ∅, FALSE otherwise

**Algorithm:**
1. Perform BFS/DFS from start state q₀
2. Mark all reachable states
3. Return TRUE if F ∩ (reachable states) = ∅
4. Return FALSE otherwise

**Pseudocode:**
\`\`\`
function isEmpty(M):
    visited = {q₀}
    queue = [q₀]
    while queue not empty:
        q = queue.dequeue()
        for each a in Σ:
            p = δ(q, a)
            if p not in visited:
                visited.add(p)
                queue.enqueue(p)
    return (F ∩ visited) == ∅
\`\`\`

**Time Complexity:** O(|Q| × |Σ|)
- Visit each state at most once
- Check |Σ| transitions per state
- Linear in DFA size

**Application to given DFA:**
- States: {1, 2, 3}, Start: 1, Accept: {3}
- δ(1,a)=2, δ(1,b)=1, δ(2,a)=2, δ(2,b)=2

**BFS from state 1:**
- Initial: visited = {1}, queue = [1]
- Process 1: δ(1,a)=2, δ(1,b)=1
  - Add 2: visited = {1,2}, queue = [2]
- Process 2: δ(2,a)=2, δ(2,b)=2
  - 2 already visited

**Reachable states: {1, 2}**
**Accept states: {3}**
**Intersection: ∅**

**Result: Language is EMPTY (TRUE)**

State 3 is unreachable from the start state, so no string is accepted.`,
  },
  {
    id: 'cs203-t2-ex8',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Decision Problem - Universality',
    description: 'Describe an algorithm to decide whether a given DFA accepts all strings (L = Σ*). What is the time complexity?',
    difficulty: 3,
    hints: [
      'L = Σ* iff L̄ = ∅',
      'Complement a DFA by swapping accept and non-accept states',
      'Then test for emptiness',
    ],
    solution: `**Algorithm for DFA Universality:**

**Input:** DFA M = (Q, Σ, δ, q₀, F)
**Output:** TRUE if L(M) = Σ*, FALSE otherwise

**Key insight:** L(M) = Σ* ⟺ L̄(M) = ∅

**Algorithm:**
1. Construct complement DFA M̄:
   - Same states, transitions, and start state
   - Accept states F̄ = Q - F
2. Test if L(M̄) = ∅ using emptiness algorithm
3. Return TRUE if empty (original is universal)
4. Return FALSE otherwise

**Pseudocode:**
\`\`\`
function isUniversal(M):
    // Construct complement
    M_bar = (Q, Σ, δ, q₀, Q - F)

    // Test emptiness of complement
    return isEmpty(M_bar)
\`\`\`

**Detailed steps for emptiness check:**
\`\`\`
function isUniversal(M):
    visited = {q₀}
    queue = [q₀]
    rejecting_states = Q - F

    while queue not empty:
        q = queue.dequeue()
        if q in rejecting_states:
            // Found reachable rejecting state
            // So some string is rejected
            return FALSE
        for each a in Σ:
            p = δ(q, a)
            if p not in visited:
                visited.add(p)
                queue.enqueue(p)

    // No rejecting state reachable
    return TRUE
\`\`\`

**Time Complexity:** O(|Q| × |Σ|)
- Same as emptiness test
- No actual construction needed
- Just check if any non-accepting state is reachable

**Correctness:**
- L(M) = Σ* ⟺ no string is rejected
- String w is rejected ⟺ δ*(q₀, w) ∉ F
- ⟺ some non-accepting state is reachable
- ⟺ complement is non-empty`,
  },
  {
    id: 'cs203-t2-ex9',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Homomorphism on Regular Languages',
    description: 'Define a homomorphism h: {a,b}* → {0,1}* where h(a) = 01 and h(b) = 1. If L is the regular language a*b, what is h(L)? Write a regular expression for h(L).',
    difficulty: 3,
    hints: [
      'Apply h to each symbol in strings of L',
      'h extends to strings: h(w₁w₂) = h(w₁)h(w₂)',
      'Think about what strings in a*b look like',
    ],
    solution: `**Homomorphism h: {a,b}* → {0,1}***
- h(a) = 01
- h(b) = 1

**Language L = a*b**
L = {b, ab, aab, aaab, ...} = {aⁿb | n ≥ 0}

**Computing h(L):**
h(aⁿb) = h(a)ⁿh(b) = (01)ⁿ1

So h(L) = {(01)ⁿ1 | n ≥ 0} = {1, 011, 01011, 0101011, ...}

**Regular expression for h(L):**
**(01)*1**

**Verification:**
- h(b) = h(a⁰b) = (01)⁰·1 = 1 ✓
- h(ab) = h(a¹b) = (01)¹·1 = 011 ✓
- h(aab) = h(a²b) = (01)²·1 = 01011 ✓

**Properties demonstrated:**
1. Homomorphism maps each symbol to a string
2. Extends to strings by concatenation
3. Regular languages are closed under homomorphism
4. If L is described by regex r, h(L) is described by h(r) where h is applied to each symbol

For L = a*b:
- h(a*b) = h(a)*h(b) = (01)*1 ✓`,
  },
  {
    id: 'cs203-t2-ex10',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Inverse Homomorphism',
    description: 'For the same homomorphism h(a)=01, h(b)=1, let L = {011, 0111}. Compute h⁻¹(L) = {w | h(w) ∈ L}.',
    difficulty: 5,
    hints: [
      'Find all strings w where h(w) equals something in L',
      'h(w) = 011 means w must expand to 011',
      'Try different combinations of a and b',
    ],
    solution: `**Inverse Homomorphism h⁻¹(L)**

h(a) = 01, h(b) = 1
L = {011, 0111}

Need to find all w ∈ {a,b}* such that h(w) ∈ L.

**For h(w) = 011:**
Need h(w) to have length 3 and be "011".

Possible factorizations of "011":
- (01)(1) → h(a)h(b) = h(ab), length(ab) = 2 ✓
- (0)(11) → no single symbol maps to 0 ✗
- (011) → no single symbol maps to 011 ✗
- (0)(1)(1) → no single symbol maps to 0 ✗

So h(ab) = 011 → ab ∈ h⁻¹(L) ✓

**For h(w) = 0111:**
Need h(w) to have length 4 and be "0111".

Possible factorizations:
- (01)(1)(1) → h(a)h(b)h(b) = h(abb), check: h(abb) = 01·1·1 = 0111 ✓
- (01)(11) → h(a)(11), but no symbol maps to 11 ✗
- (0)(111) → no symbol maps to 0 ✗
- (0111) → no symbol maps to 0111 ✗

So h(abb) = 0111 → abb ∈ h⁻¹(L) ✓

**Are there other possibilities?**
- bb: h(bb) = 11 ≠ 011, 0111 ✗
- aa: h(aa) = 0101 ≠ 011, 0111 ✗
- a: h(a) = 01 ≠ 011, 0111 ✗
- b: h(b) = 1 ≠ 011, 0111 ✗
- aab: h(aab) = 01011 ≠ 011, 0111 ✗
- bab: h(bab) = 1011 ≠ 011, 0111 ✗

**h⁻¹(L) = {ab, abb}**`,
  },
  {
    id: 'cs203-t2-ex11',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Regular Expression Equivalence',
    description: 'Prove or disprove: The regular expressions (a|b)* and a*b*a*b* are equivalent (describe the same language).',
    difficulty: 3,
    hints: [
      'What languages do they describe?',
      'Is every string in one also in the other?',
      'Try to find a counterexample',
    ],
    solution: `**Claim: (a|b)* and a*b*a*b* are NOT equivalent.**

**Language of (a|b)*:**
All strings over {a,b}, including:
- ε, a, b, aa, ab, ba, bb, aaa, aba, bab, ...
- Any combination of a's and b's in any order

**Language of a*b*a*b*:**
Strings of form: (some a's)(some b's)(some a's)(some b's)
- ε (all parts empty) ✓
- a, aa, aaa, ... (first part only) ✓
- b, bb, ... (second part only) ✓
- ab, aab, abb, ... ✓
- ba, bba, ... (third and fourth parts) ✓
- aba, abab, ... ✓

**Finding a counterexample:**
Consider "bab":
- In (a|b)*: Yes (b·a·b) ✓
- In a*b*a*b*: Need to split as aⁱbʲaᵏbˡ
  - b = a⁰b¹a⁰b⁰? Then "ab" part is b, need to place "ab" at end...
  - Actually: a⁰b¹a¹b¹ = "bab" ✓

Consider "abab":
- In (a|b)*: Yes ✓
- In a*b*a*b*: a¹b¹a¹b¹ = "abab" ✓

Consider "baba":
- In (a|b)*: Yes ✓
- In a*b*a*b*: We need aⁱbʲaᵏbˡ = "baba"
  - If i=0: bʲaᵏbˡ = "baba", so j=1, then aᵏbˡ = "aba"
  - Then k≥1 (need 'a'), k=1 gives bˡ = "ba" - but b* can't produce "ba"!

**Counterexample found: "baba" ∈ (a|b)* but baba ∉ a*b*a*b***

**Proof that baba ∉ a*b*a*b*:**
Any string in a*b*a*b* has at most 2 "runs" of a's (consecutive a's) and at most 2 "runs" of b's, with structure (a-run)(b-run)(a-run)(b-run).

"baba" has structure: b, a, b, a = 4 alternations, which requires 2 b-runs with an a-run between them. This pattern (b-a-b-a) cannot fit a*b*a*b*.

**Conclusion: The expressions are NOT equivalent. ∎**`,
  },
  {
    id: 'cs203-t2-ex12',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Kleene Star Properties',
    description: 'Prove the identity (r*)* = r* for regular expressions. That is, show L((r*)*) = L(r*).',
    difficulty: 3,
    hints: [
      'Show inclusion in both directions',
      '(r*)* = concatenations of concatenations of L(r) strings',
      'Concatenation is associative',
    ],
    solution: `**Theorem: (r*)* = r***

Let L = L(r). We show L((r*)*) = L(r*).

**Recall definitions:**
- L(r*) = L* = {ε} ∪ L ∪ LL ∪ LLL ∪ ... = ⋃_{n≥0} Lⁿ
- L((r*)*) = (L*)* = ⋃_{n≥0} (L*)ⁿ

**Part 1: L* ⊆ (L*)***
- L* is the set of all concatenations of L strings
- (L*)* is the set of all concatenations of L* strings
- Since ε ∈ L*, we have L* = L* · {ε} ⊆ L* · L* ⊆ (L*)*
- Therefore L* ⊆ (L*)* ✓

**Part 2: (L*)* ⊆ L***
Let w ∈ (L*)*.
Then w = w₁w₂...wₖ where each wᵢ ∈ L*.

Each wᵢ ∈ L* means wᵢ = uᵢ₁uᵢ₂...uᵢₘᵢ where each uᵢⱼ ∈ L.

So w = u₁₁u₁₂...u₁ₘ₁ u₂₁u₂₂...u₂ₘ₂ ... uₖ₁...uₖₘₖ

This is a concatenation of strings from L, hence w ∈ L*.

Therefore (L*)* ⊆ L* ✓

**Conclusion: (L*)* = L*, so (r*)* = r* ∎**

**Intuition:**
- L* = "any number of L strings concatenated"
- (L*)* = "any number of (any number of L strings) concatenated"
- But concatenating concatenations is just concatenation
- So (L*)* = L*

**Analogous to arithmetic:** ((n×a) + (m×a)) is still a multiple of a.`,
  },
  {
    id: 'cs203-t2-ex13',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Decision Problem - Infiniteness',
    description: 'Describe an algorithm to decide whether a given DFA accepts infinitely many strings. What is the key insight?',
    difficulty: 3,
    hints: [
      'When can a DFA accept infinitely many strings?',
      'Think about cycles in the transition graph',
      'A cycle reachable from start and reaching accept gives infinity',
    ],
    solution: `**Algorithm for DFA Infiniteness:**

**Key Insight:**
L(M) is infinite ⟺ M has a cycle on a path from start to some accepting state.

If there's such a cycle, we can traverse it any number of times, generating infinitely many accepted strings.

**Algorithm:**

**Input:** DFA M = (Q, Σ, δ, q₀, F)
**Output:** TRUE if |L(M)| = ∞, FALSE otherwise

1. Find all states reachable from q₀ (forward reachability)
2. Find all states that can reach some f ∈ F (backward reachability)
3. Let U = (forward reachable) ∩ (backward reachable) = "useful" states
4. Check if the subgraph induced by U contains a cycle
5. Return TRUE if cycle exists, FALSE otherwise

**Pseudocode:**
\`\`\`
function isInfinite(M):
    // Step 1: Forward reachability from q₀
    forward = BFS_forward(q₀)

    // Step 2: Backward reachability to F
    backward = BFS_backward(F)

    // Step 3: Useful states
    useful = forward ∩ backward

    // Step 4: Check for cycle in useful subgraph
    return hasCycle(useful, δ)
\`\`\`

**Time Complexity:** O(|Q| × |Σ|)
- BFS is O(|Q| × |Σ|)
- Cycle detection is O(|Q| + |E|) = O(|Q| × |Σ|)

**Alternative using pumping:**
L is infinite ⟺ ∃ string w ∈ L with |Q| ≤ |w| < 2|Q|

This follows from pumping lemma: if L has strings of all lengths ≥ |Q|, it's infinite.

So: enumerate/test strings of length |Q| to 2|Q|-1.
Less efficient but theoretically interesting.`,
  },
  {
    id: 'cs203-t2-ex14',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Regex to NFA Size',
    description: 'If a regular expression r has length n (total symbols and operators), how many states does Thompson\'s construction produce? Give a tight bound.',
    difficulty: 3,
    hints: [
      'Count states added for each construction',
      'Base cases add 2 states each',
      'Union adds 2, concatenation adds 0, star adds 2',
    ],
    solution: `**Thompson's Construction State Count**

**State counts per construction:**

1. **Base case ∅:** 2 states (start, accept)
2. **Base case ε:** 2 states (start, accept with ε-edge)
3. **Base case a (symbol):** 2 states (start →a→ accept)
4. **Union r|s:** 2 new states (new start and accept)
5. **Concatenation rs:** 0 new states (merge accept of r with start of s)
6. **Kleene star r*:** 2 new states (new start and accept)

**Counting for expression of length n:**

An expression of length n has:
- k symbols (base cases), where k ≤ n
- Operators: at most n - k operators (union, concat, star)

Each symbol creates 2 states.
Each union/star creates 2 additional states.
Concatenation creates 0 additional states.

**Upper bound analysis:**
- Worst case: all base cases are symbols, rest are | or *
- Symbols: ≤ n, each adds 2 states
- Operators | and *: each adds 2 states

**Tight bound: O(n) states**

More precisely: ≤ 2n states

**Proof:**
- Expression with n nodes in syntax tree
- Each leaf (symbol, ε, ∅) contributes 2 states
- Each internal node (|, ·, *) contributes at most 2 states
- Total internal nodes ≤ number of leaves - 1
- So total states ≤ 2 × (leaves) + 2 × (leaves - 1) ≤ 4 × leaves ≤ 2n

**Exact count:** The NFA from Thompson's construction has exactly 2n states where n is the number of nodes in the regex syntax tree (counting each symbol and operator).

For a regex string of length n, this is **O(n) states**.`,
  },
  {
    id: 'cs203-t2-ex15',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Quotient Operation',
    description: 'For languages L₁ and L₂, define L₁/L₂ = {x | ∃y ∈ L₂: xy ∈ L₁} (right quotient). Prove that if L₁ is regular and L₂ is any language, then L₁/L₂ is regular.',
    difficulty: 5,
    hints: [
      'Build from a DFA for L₁',
      'What states should be accepting in the quotient DFA?',
      'State q should accept if some y ∈ L₂ leads from q to accepting',
    ],
    solution: `**Theorem:** If L₁ is regular, then L₁/L₂ is regular for any L₂.

**Proof by construction:**

Let M = (Q, Σ, δ, q₀, F) be a DFA for L₁.

Construct DFA M' = (Q, Σ, δ, q₀, F') for L₁/L₂ where:
- F' = {q ∈ Q | ∃y ∈ L₂: δ*(q, y) ∈ F}

That is, a state is accepting in M' if some string from L₂ leads from it to an accepting state of M.

**Correctness:**

x ∈ L₁/L₂ ⟺ ∃y ∈ L₂: xy ∈ L₁
           ⟺ ∃y ∈ L₂: δ*(q₀, xy) ∈ F
           ⟺ ∃y ∈ L₂: δ*(δ*(q₀, x), y) ∈ F
           ⟺ δ*(q₀, x) ∈ F'
           ⟺ M' accepts x

**Why this works:**
- M' has the same states and transitions as M
- Only the accepting states change
- A state q is in F' if reaching q gives "hope" of accepting with some suffix from L₂

**Key insight:**
The quotient construction only changes F, so:
- Number of states: same as M
- Transitions: same as M
- Only accepting states are redefined

**Regularity preserved:**
Even if L₂ is non-regular (or even non-recursive), F' is still a finite set of states (subset of Q).

The construction doesn't need to "compute" anything about L₂ at runtime - F' is determined statically.

**Example:**
L₁ = a*b*, L₂ = {aⁿbⁿ | n ≥ 0}
L₁/L₂ = {x | ∃y ∈ L₂: xy ∈ a*b*}
      = {aⁱ | ∃aⁿbⁿ: aⁱaⁿbⁿ ∈ a*b*}
      = a* (since aⁱ⁺ⁿbⁿ ∈ a*b* for any i, n)

L₁/L₂ is regular even though L₂ is not! ∎`,
  },
  {
    id: 'cs203-t2-ex16',
    subjectId: 'cs203',
    topicId: 'cs203-topic-2',
    type: 'written',
    title: 'Concatenation Star Identity',
    description: 'Prove or disprove: (rs)* = ε | r(sr)*s for all regular expressions r and s.',
    difficulty: 5,
    hints: [
      'Think about what strings are in (rs)*',
      'Think about what strings are in ε | r(sr)*s',
      'Try specific examples first',
    ],
    solution: `**Claim: (rs)* = ε | r(sr)*s is FALSE in general.**

**Analysis of both sides:**

**Left side: (rs)***
L((rs)*) = {ε, rs, rsrs, rsrsrs, ...} = {(rs)ⁿ | n ≥ 0}

**Right side: ε | r(sr)*s**
L(ε | r(sr)*s) = {ε} ∪ L(r(sr)*s)
               = {ε} ∪ {r·(sr)ⁿ·s | n ≥ 0}
               = {ε, rs, rsrs, rsrsrs, ...} where each has r at front, s at back

Wait, let's compute more carefully:
- r(sr)⁰s = rs
- r(sr)¹s = rsrs
- r(sr)²s = rsrsrs

So L(ε | r(sr)*s) = {ε, rs, rsrs, rsrsrs, ...}

This looks the same as (rs)*!

**Let's verify the identity:**

For n ≥ 1: (rs)ⁿ vs r(sr)ⁿ⁻¹s

(rs)ⁿ = (rs)(rs)...(rs) [n times]
r(sr)ⁿ⁻¹s = r(sr)(sr)...(sr)s [n-1 copies of sr]
          = r·s·r·s·r...·s·r·s [this has n r's and n s's alternating]
          = (rs)(rs)...(rs) [n times] ✓

**The identity appears to be TRUE!**

**Formal Proof:**

**Part 1: (rs)* ⊆ ε | r(sr)*s**
- ε ∈ (rs)* and ε ∈ {ε | r(sr)*s} ✓
- (rs)ⁿ for n ≥ 1:
  - (rs)ⁿ = rs·(rs)ⁿ⁻¹ = r·(s·r)ⁿ⁻¹·s = r(sr)ⁿ⁻¹s ∈ r(sr)*s ✓

**Part 2: ε | r(sr)*s ⊆ (rs)***
- ε ∈ (rs)* ✓
- r(sr)ⁿs = r·(sr)ⁿ·s = (rs)·(rs)ⁿ⁻¹·(rs)...

Hmm, let me recompute: r(sr)ⁿs with n=1:
rsrs = r·sr·s. And (rs)² = rsrs ✓

**Conclusion: The identity (rs)* = ε | r(sr)*s is TRUE. ∎**`,
  },
];
