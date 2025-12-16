import { WrittenExercise } from '../../../../core/types';

export const topic1Exercises: WrittenExercise[] = [
  {
    id: 'cs203-t1-ex1',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'DFA for Strings Ending in "ab"',
    description: 'Design a DFA over alphabet Σ = {a, b} that accepts all strings ending with "ab". Provide the formal 5-tuple definition and draw the state diagram.',
    difficulty: 1,
    hints: [
      'Think about what information you need to remember',
      'You need to track the last two symbols seen',
      'Consider states: "nothing relevant", "saw a", "saw ab"',
    ],
    solution: `**DFA M = (Q, Σ, δ, q₀, F)**

Q = {q₀, q₁, q₂}
Σ = {a, b}
q₀ = q₀ (start state)
F = {q₂}

Transition function δ:
| State | a  | b  |
|-------|----|----|
| q₀    | q₁ | q₀ |
| q₁    | q₁ | q₂ |
| q₂    | q₁ | q₀ |

**State meanings:**
- q₀: Haven't seen pattern or last was b (not after a)
- q₁: Last symbol was 'a'
- q₂: Last two symbols were "ab" (accepting)

**Correctness argument:**
- From any state, seeing 'a' transitions to q₁ (potential start of "ab")
- From q₁, seeing 'b' completes "ab", going to accepting q₂
- From q₂, seeing 'b' breaks the pattern (returns to q₀)
- From q₂, seeing 'a' could start new pattern (goes to q₁)`,
  },
  {
    id: 'cs203-t1-ex2',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'NFA with ε-Transitions',
    description: 'Convert the following NFA with ε-transitions to an equivalent NFA without ε-transitions. The NFA has states {q₀, q₁, q₂}, start state q₀, accepting state q₂, and transitions: δ(q₀, a) = {q₀}, δ(q₀, ε) = {q₁}, δ(q₁, b) = {q₁}, δ(q₁, ε) = {q₂}, δ(q₂, a) = {q₂}.',
    difficulty: 3,
    hints: [
      'First compute ε-closure for each state',
      'Then build new transitions by following ε-closures',
      'Any state with accepting state in its ε-closure becomes accepting',
    ],
    solution: `**Step 1: Compute ε-closures**
- ε-closure(q₀) = {q₀, q₁, q₂} (follow q₀→q₁→q₂)
- ε-closure(q₁) = {q₁, q₂} (follow q₁→q₂)
- ε-closure(q₂) = {q₂}

**Step 2: Determine new accepting states**
States with q₂ in their ε-closure: {q₀, q₁, q₂}
So F' = {q₀, q₁, q₂}

**Step 3: Compute new transitions**
For δ'(q, a), compute ε-closure(δ(ε-closure(q), a)):

δ'(q₀, a) = ε-closure(δ({q₀,q₁,q₂}, a)) = ε-closure({q₀,q₂}) = {q₀,q₁,q₂}
δ'(q₀, b) = ε-closure(δ({q₀,q₁,q₂}, b)) = ε-closure({q₁}) = {q₁,q₂}

δ'(q₁, a) = ε-closure(δ({q₁,q₂}, a)) = ε-closure({q₂}) = {q₂}
δ'(q₁, b) = ε-closure(δ({q₁,q₂}, b)) = ε-closure({q₁}) = {q₁,q₂}

δ'(q₂, a) = ε-closure(δ({q₂}, a)) = ε-closure({q₂}) = {q₂}
δ'(q₂, b) = ε-closure(δ({q₂}, b)) = ε-closure(∅) = ∅

**Resulting NFA without ε-transitions:**
- States: {q₀, q₁, q₂}
- Start: q₀
- Accept: {q₀, q₁, q₂}
- Transitions as computed above`,
  },
  {
    id: 'cs203-t1-ex3',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'Subset Construction',
    description: 'Apply the subset construction algorithm to convert the following NFA to a DFA: States {p, q, r}, start state p, accepting state r, transitions: δ(p, 0) = {p, q}, δ(p, 1) = {p}, δ(q, 0) = {r}, δ(q, 1) = {r}, δ(r, 0) = ∅, δ(r, 1) = ∅.',
    difficulty: 3,
    hints: [
      'Each DFA state is a subset of NFA states',
      'Start with the set containing just the NFA start state',
      'A DFA state is accepting if it contains any NFA accepting state',
    ],
    solution: `**Subset Construction**

Start state: {p}

**Build transitions from reachable states:**

From {p}:
- On 0: δ({p}, 0) = δ(p, 0) = {p, q}
- On 1: δ({p}, 1) = δ(p, 1) = {p}

From {p, q}:
- On 0: δ(p, 0) ∪ δ(q, 0) = {p, q} ∪ {r} = {p, q, r}
- On 1: δ(p, 1) ∪ δ(q, 1) = {p} ∪ {r} = {p, r}

From {p, q, r}:
- On 0: δ(p, 0) ∪ δ(q, 0) ∪ δ(r, 0) = {p, q} ∪ {r} ∪ ∅ = {p, q, r}
- On 1: δ(p, 1) ∪ δ(q, 1) ∪ δ(r, 1) = {p} ∪ {r} ∪ ∅ = {p, r}

From {p, r}:
- On 0: δ(p, 0) ∪ δ(r, 0) = {p, q} ∪ ∅ = {p, q}
- On 1: δ(p, 1) ∪ δ(r, 1) = {p} ∪ ∅ = {p}

**Resulting DFA:**
- States: {{p}, {p,q}, {p,q,r}, {p,r}}
- Start: {p}
- Accept: {{p,q,r}, {p,r}} (contain r)
- Transition table:
| State    | 0       | 1     |
|----------|---------|-------|
| {p}      | {p,q}   | {p}   |
| {p,q}    | {p,q,r} | {p,r} |
| {p,q,r}  | {p,q,r} | {p,r} |
| {p,r}    | {p,q}   | {p}   |`,
  },
  {
    id: 'cs203-t1-ex4',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'DFA Minimization',
    description: 'Minimize the following DFA using the table-filling algorithm: States {A, B, C, D, E}, alphabet {0, 1}, start A, accept {C, E}. Transitions: δ(A,0)=B, δ(A,1)=C, δ(B,0)=D, δ(B,1)=E, δ(C,0)=B, δ(C,1)=C, δ(D,0)=D, δ(D,1)=E, δ(E,0)=B, δ(E,1)=C.',
    difficulty: 5,
    hints: [
      'First mark pairs where one is accepting and one is not',
      'Then iteratively mark pairs whose transitions lead to marked pairs',
      'Unmarked pairs at the end are equivalent',
    ],
    solution: `**Table-Filling Algorithm**

**Step 1: Initial marking (accepting vs non-accepting)**
Mark pairs (A,C), (A,E), (B,C), (B,E), (D,C), (D,E)

Table after step 1:
|   | A | B | C | D |
|---|---|---|---|---|
| B | - |   |   |   |
| C | X | X |   |   |
| D | - | - | X |   |
| E | X | X | - | X |

**Step 2: Iterative marking**
Check unmarked pairs:

(A,B): δ(A,0)=B, δ(B,0)=D → check (B,D)
       δ(A,1)=C, δ(B,1)=E → check (C,E) unmarked
(B,D): δ(B,0)=D, δ(D,0)=D → check (D,D) same
       δ(B,1)=E, δ(D,1)=E → check (E,E) same
(A,D): δ(A,0)=B, δ(D,0)=D → check (B,D)
       δ(A,1)=C, δ(D,1)=E → check (C,E) unmarked
(C,E): δ(C,0)=B, δ(E,0)=B → check (B,B) same
       δ(C,1)=C, δ(E,1)=C → check (C,C) same

No new marks in this iteration.

**Step 3: Identify equivalent states**
Unmarked pairs: (A,B), (A,D), (B,D), (C,E)
Equivalence classes: {A,B,D}, {C,E}

**Minimal DFA:**
States: {ABD, CE}
Start: ABD
Accept: {CE}
Transitions:
- δ(ABD, 0) = ABD (since B→D, D→D, A→B, all in {A,B,D})
- δ(ABD, 1) = CE (since A→C, B→E, D→E, all in {C,E})
- δ(CE, 0) = ABD (since C→B, E→B)
- δ(CE, 1) = CE (since C→C, E→C)

**Result: 2-state minimal DFA**`,
  },
  {
    id: 'cs203-t1-ex5',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'State Elimination to Regular Expression',
    description: 'Convert the following DFA to a regular expression using state elimination: States {q₀, q₁, q₂}, start q₀, accept q₂. Transitions: δ(q₀, a) = q₁, δ(q₀, b) = q₀, δ(q₁, a) = q₁, δ(q₁, b) = q₂, δ(q₂, a) = q₂, δ(q₂, b) = q₂.',
    difficulty: 5,
    hints: [
      'Add new start and accept states with ε-transitions',
      'Eliminate intermediate states one by one',
      'When eliminating state q, update all paths that go through q',
    ],
    solution: `**Step 1: Add new start (s) and accept (f) states**
Add ε from s to q₀ and ε from q₂ to f.

**Step 2: Eliminate q₁**
Paths through q₁:
- q₀ →a q₁ →b q₂ becomes q₀ →(aa*b) q₂
- q₁ has self-loop on a, so path is a·a*·b = aa*b

After eliminating q₁:
- s →ε q₀
- q₀ →b q₀ (self-loop)
- q₀ →(aa*b) q₂
- q₂ →(a|b) q₂ (self-loop)
- q₂ →ε f

**Step 3: Eliminate q₀**
Paths through q₀:
- s →ε q₀ →(aa*b) q₂
- q₀ has self-loop b, so path is ε·b*·(aa*b) = b*aa*b

After eliminating q₀:
- s →(b*aa*b) q₂
- q₂ →(a|b) q₂
- q₂ →ε f

**Step 4: Eliminate q₂**
Path from s to f through q₂:
- s →(b*aa*b) q₂ →(a|b)* (self-loop) →ε f
- Result: b*aa*b(a|b)*

**Final Regular Expression: b*aa*b(a|b)***

Simplified: b*a⁺b(a|b)* where a⁺ = aa*

This matches strings over {a,b} that contain the pattern: some b's, then one or more a's, then a b, then anything.`,
  },
  {
    id: 'cs203-t1-ex6',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'Product Construction for Intersection',
    description: 'Given two DFAs: M₁ accepts strings over {a,b} with an even number of a\'s, M₂ accepts strings with an odd number of b\'s. Construct a DFA accepting the intersection (even a\'s AND odd b\'s).',
    difficulty: 3,
    hints: [
      'Product construction creates states as pairs (q₁, q₂)',
      'Both components must accept for the product state to accept',
      'Each component transitions independently',
    ],
    solution: `**DFA M₁ (even a's):**
States: {e_a, o_a} (even, odd count of a's)
Start: e_a, Accept: {e_a}
δ₁(e_a, a) = o_a, δ₁(e_a, b) = e_a
δ₁(o_a, a) = e_a, δ₁(o_a, b) = o_a

**DFA M₂ (odd b's):**
States: {e_b, o_b} (even, odd count of b's)
Start: e_b, Accept: {o_b}
δ₂(e_b, a) = e_b, δ₂(e_b, b) = o_b
δ₂(o_b, a) = o_b, δ₂(o_b, b) = e_b

**Product DFA M₁ × M₂:**
States: {(e_a,e_b), (e_a,o_b), (o_a,e_b), (o_a,o_b)}
Start: (e_a, e_b)
Accept: {(e_a, o_b)} (even a's AND odd b's)

Transitions:
| State      | a          | b          |
|------------|------------|------------|
| (e_a, e_b) | (o_a, e_b) | (e_a, o_b) |
| (e_a, o_b) | (o_a, o_b) | (e_a, e_b) |
| (o_a, e_b) | (e_a, e_b) | (o_a, o_b) |
| (o_a, o_b) | (e_a, o_b) | (o_a, e_b) |

**Verification:**
- "ab": (e_a,e_b) →a (o_a,e_b) →b (o_a,o_b) → reject ✓
- "b": (e_a,e_b) →b (e_a,o_b) → accept ✓
- "aab": (e_a,e_b) →a (o_a,e_b) →a (e_a,e_b) →b (e_a,o_b) → accept ✓`,
  },
  {
    id: 'cs203-t1-ex7',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'Pumping Lemma Proof',
    description: 'Use the pumping lemma to prove that L = {aⁿbⁿ | n ≥ 0} is not regular.',
    difficulty: 3,
    hints: [
      'Assume L is regular with pumping length p',
      'Choose a string in L with length at least p',
      'Show that pumping leads to a string not in L',
    ],
    solution: `**Proof by contradiction using Pumping Lemma**

Assume L = {aⁿbⁿ | n ≥ 0} is regular.
Then the pumping lemma applies with some pumping length p.

**Choose string:** s = aᵖbᵖ ∈ L with |s| = 2p ≥ p

**By pumping lemma:** s = xyz where:
1. |y| > 0
2. |xy| ≤ p
3. xyⁱz ∈ L for all i ≥ 0

**Analyze the split:**
Since |xy| ≤ p and s starts with p a's:
- x = aʲ for some j ≥ 0
- y = aᵏ for some k > 0 (since |y| > 0)
- z = aᵖ⁻ʲ⁻ᵏbᵖ

So xy consists only of a's.

**Pump with i = 0:**
xy⁰z = xz = aʲaᵖ⁻ʲ⁻ᵏbᵖ = aᵖ⁻ᵏbᵖ

Since k > 0, we have p - k < p a's but still p b's.
Therefore aᵖ⁻ᵏbᵖ ∉ L (unequal counts).

**Contradiction:** The pumping lemma guarantees xy⁰z ∈ L, but we showed xy⁰z ∉ L.

**Conclusion:** Our assumption was wrong. L is not regular. ∎`,
  },
  {
    id: 'cs203-t1-ex8',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'DFA for Divisibility',
    description: 'Design a DFA that accepts binary strings representing numbers divisible by 3. The input is read most-significant-bit first. For example, "110" represents 6 and should be accepted.',
    difficulty: 5,
    hints: [
      'Track the remainder when divided by 3',
      'Reading bit b after having value v gives new value 2v + b',
      'New remainder = (2 * old_remainder + bit) mod 3',
    ],
    solution: `**DFA for divisibility by 3:**

**Key insight:** If current value mod 3 = r, then after reading bit b:
new_remainder = (2r + b) mod 3

**States:** {q₀, q₁, q₂} representing remainders 0, 1, 2
**Start:** q₀ (remainder 0, empty string represents 0)
**Accept:** {q₀} (remainder 0 means divisible by 3)

**Transition table:**
| State | 0 | 1 |
|-------|---|---|
| q₀    | q₀| q₁|
| q₁    | q₂| q₀|
| q₂    | q₁| q₂|

**Derivation:**
From q₀ (r=0): 0→(2·0+0) mod 3=0→q₀, 1→(2·0+1) mod 3=1→q₁
From q₁ (r=1): 0→(2·1+0) mod 3=2→q₂, 1→(2·1+1) mod 3=0→q₀
From q₂ (r=2): 0→(2·2+0) mod 3=1→q₁, 1→(2·2+1) mod 3=2→q₂

**Verification:**
- "110" (6): q₀→1→q₁→1→q₀→0→q₀ ✓ accept (6÷3=2)
- "101" (5): q₀→1→q₁→0→q₂→1→q₂ ✗ reject (5÷3=1 r 2)
- "1001" (9): q₀→1→q₁→0→q₂→0→q₁→1→q₀ ✓ accept (9÷3=3)
- "0" (0): q₀→0→q₀ ✓ accept (0÷3=0)`,
  },
  {
    id: 'cs203-t1-ex9',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'Closure Under Reversal',
    description: 'Prove that regular languages are closed under reversal. That is, if L is regular, then Lᴿ = {wᴿ | w ∈ L} is also regular.',
    difficulty: 3,
    hints: [
      'Start with a DFA for L',
      'Reverse all transitions',
      'Swap start and accepting states',
      'The result may be an NFA',
    ],
    solution: `**Theorem:** If L is regular, then Lᴿ is regular.

**Proof:**
Let M = (Q, Σ, δ, q₀, F) be a DFA for L.

Construct NFA Mᴿ = (Q', Σ, δ', q₀', F') for Lᴿ:

**Construction:**
- Q' = Q ∪ {q_new} (add new start state)
- q₀' = q_new
- F' = {q₀} (old start becomes sole accept state)
- δ' defined as:
  - δ'(q_new, ε) = F (ε-transitions from new start to old accept states)
  - δ'(q, a) = {p | δ(p, a) = q} (reverse all original transitions)

**Why this works:**
- Original: M accepts w iff δ*(q₀, w) ∈ F
- Reversed: There's a path q₀ →w₁ q₁ →w₂ ... →wₙ qₙ with qₙ ∈ F
- In Mᴿ: Start at q_new, ε-move to qₙ, then follow reversed path to q₀
- Path in Mᴿ accepts wᴿ = wₙ...w₂w₁

**Formal argument:**
w ∈ L ⟺ δ*(q₀, w) ∈ F
     ⟺ there's a path from q₀ to some f ∈ F on w
     ⟺ there's a reversed path from f to q₀ on wᴿ in Mᴿ
     ⟺ wᴿ ∈ L(Mᴿ)

Since NFAs recognize exactly regular languages, Lᴿ is regular. ∎`,
  },
  {
    id: 'cs203-t1-ex10',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'Myhill-Nerode Equivalence',
    description: 'Use the Myhill-Nerode theorem to show that L = {w ∈ {a,b}* | w has the same number of a\'s and b\'s} is not regular by identifying infinitely many equivalence classes.',
    difficulty: 5,
    hints: [
      'Find strings x, y where no matter what z you append, xz and yz behave differently',
      'Consider strings aⁿ for different n',
      'Show that aⁱ and aʲ are distinguishable for i ≠ j',
    ],
    solution: `**Myhill-Nerode Theorem approach**

The Myhill-Nerode theorem states: L is regular iff it has finitely many equivalence classes under ≡_L, where:
x ≡_L y ⟺ ∀z: xz ∈ L ⟺ yz ∈ L

**Claim:** For L = {equal a's and b's}, the strings a, aa, aaa, ... are pairwise inequivalent.

**Proof that aⁱ and aʲ are inequivalent for i ≠ j:**

Consider the distinguishing suffix z = bⁱ:
- aⁱbⁱ has i a's and i b's → aⁱbⁱ ∈ L
- aʲbⁱ has j a's and i b's → since j ≠ i, aʲbⁱ ∉ L

Therefore aⁱ ≢_L aʲ whenever i ≠ j.

**Conclusion:**
The strings {a, aa, aaa, aaaa, ...} form infinitely many distinct equivalence classes under ≡_L.

By Myhill-Nerode theorem, L has infinitely many equivalence classes.

Therefore L is not regular. ∎

**Alternative view:**
Any DFA for L would need distinct states for a, aa, aaa, ... since they need different numbers of b's to reach acceptance. Infinitely many states required → not finite → not a DFA.`,
  },
  {
    id: 'cs203-t1-ex11',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'NFA Design',
    description: 'Design an NFA (using nondeterminism effectively) that accepts strings over {a, b} where the third symbol from the end is "a". Explain why this is easier with an NFA than a DFA.',
    difficulty: 3,
    hints: [
      'NFA can "guess" when it\'s 3 symbols from the end',
      'Use nondeterminism to try starting the "last 3" check at every position',
      'Compare the state count to what a DFA would need',
    ],
    solution: `**NFA for "third symbol from end is a":**

**States:** {q₀, q₁, q₂, q₃}
**Start:** q₀
**Accept:** {q₃}
**Alphabet:** {a, b}

**Transitions:**
- δ(q₀, a) = {q₀, q₁}  (stay or guess "this a is third from end")
- δ(q₀, b) = {q₀}       (stay, waiting)
- δ(q₁, a) = {q₂}       (second from end)
- δ(q₁, b) = {q₂}       (second from end)
- δ(q₂, a) = {q₃}       (last symbol)
- δ(q₂, b) = {q₃}       (last symbol)

**How it works:**
1. q₀ is a "waiting" state that loops on any symbol
2. When reading 'a' in q₀, nondeterministically also go to q₁
3. q₁, q₂, q₃ count the last 3 positions
4. Accept iff some branch reaches q₃ exactly at end

**Why NFA is easier:**
- NFA: 4 states, uses nondeterminism to "guess" the position
- DFA: Must track all possible "last 3 symbols" combinations
  - Need to remember last 3 symbols: 2³ = 8 states
  - States like {aaa, aab, aba, abb, baa, bab, bba, bbb}
  - Accept states: {aaa, aab, aba, abb} (third from end is a)

**NFA advantage:** Nondeterminism lets us "guess" the right position instead of tracking all possibilities deterministically.`,
  },
  {
    id: 'cs203-t1-ex12',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'Distinguishing Strings',
    description: 'For the language L = {strings over {0,1} containing "01" as substring}, identify which of the following pairs of strings are distinguishable: (ε, 0), (0, 00), (01, 010). Provide distinguishing suffixes.',
    difficulty: 3,
    hints: [
      'Two strings x, y are distinguishable if some suffix z puts xz in L and yz out (or vice versa)',
      'Think about what each string "needs" to reach acceptance',
      'Consider minimal strings that would complete the pattern',
    ],
    solution: `**Language:** L = {w ∈ {0,1}* | w contains "01"}

**Analysis of pairs:**

**Pair (ε, 0):**
- ε needs "01" appended → "01" ∈ L ✓
- 0 needs "1" appended → "01" ∈ L ✓

Try z = "1":
- ε·1 = "1" ∉ L (no "01")
- 0·1 = "01" ∈ L ✓

**Distinguishing suffix: z = "1"**
Therefore ε and 0 are **distinguishable**.

**Pair (0, 00):**
- 0 needs at least "1" to get "01"
- 00 needs at least "1" to get "001" which contains "01"

Try z = "1":
- 0·1 = "01" ∈ L ✓
- 00·1 = "001" ∈ L ✓ (contains "01")

For any z: both 0z and 00z contain "01" iff z starts with "1" or z contains "01"
This is the same condition!

**No distinguishing suffix exists.**
Therefore 0 and 00 are **indistinguishable** (equivalent).

**Pair (01, 010):**
Both already contain "01", so both are in L.
For any suffix z:
- 01·z contains "01" → 01z ∈ L
- 010·z contains "01" → 010z ∈ L

**No distinguishing suffix exists.**
Therefore 01 and 010 are **indistinguishable**.

**Summary:**
- (ε, 0): Distinguishable by z = "1"
- (0, 00): Indistinguishable
- (01, 010): Indistinguishable`,
  },
  {
    id: 'cs203-t1-ex13',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'Closure Under Complement',
    description: 'Prove that regular languages are closed under complement. Given a DFA M for language L, construct a DFA for L̄ (the complement of L).',
    difficulty: 1,
    hints: [
      'The complement accepts exactly what the original rejects',
      'Simply swap accepting and non-accepting states',
      'This only works directly for DFAs, not NFAs',
    ],
    solution: `**Theorem:** If L is regular, then L̄ = Σ* - L is regular.

**Proof:**
Let M = (Q, Σ, δ, q₀, F) be a DFA for L.

Construct DFA M̄ = (Q, Σ, δ, q₀, Q - F) for L̄.

**Construction is trivial:**
- Same states Q
- Same alphabet Σ
- Same transition function δ
- Same start state q₀
- **New accepting states:** F̄ = Q - F (complement of original accepting states)

**Correctness:**
For any string w ∈ Σ*:
- Let q = δ*(q₀, w) be the state reached after processing w
- M accepts w ⟺ q ∈ F
- M̄ accepts w ⟺ q ∈ (Q - F) ⟺ q ∉ F
- Therefore: M̄ accepts w ⟺ M rejects w ⟺ w ∈ L̄ ✓

**Important note:**
This construction requires a DFA (or complete NFA).
- In a DFA, every string leads to exactly one state
- In an NFA, rejecting means "no accepting path exists"
- Simply swapping accept states in an NFA doesn't give the complement!

**Example:**
If M accepts L = {strings ending in "ab"}
Then M̄ accepts L̄ = {strings NOT ending in "ab"} = {ε, a, b, aa, ba, bb, ...}`,
  },
  {
    id: 'cs203-t1-ex14',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'Extended Transition Function',
    description: 'For the DFA M with states {A, B}, start A, accept {B}, and δ(A,0)=B, δ(A,1)=A, δ(B,0)=A, δ(B,1)=B, compute δ*(A, w) for w = 0110 step by step. What language does M accept?',
    difficulty: 1,
    hints: [
      'δ* processes one symbol at a time',
      'δ*(q, wa) = δ(δ*(q, w), a)',
      'Look for a pattern in what makes M accept',
    ],
    solution: `**Extended transition function computation:**

**Definition:** δ*(q, ε) = q, and δ*(q, wa) = δ(δ*(q, w), a)

**Computing δ*(A, 0110):**

Step 1: δ*(A, ε) = A

Step 2: δ*(A, 0) = δ(δ*(A, ε), 0) = δ(A, 0) = B

Step 3: δ*(A, 01) = δ(δ*(A, 0), 1) = δ(B, 1) = B

Step 4: δ*(A, 011) = δ(δ*(A, 01), 1) = δ(B, 1) = B

Step 5: δ*(A, 0110) = δ(δ*(A, 011), 0) = δ(B, 0) = A

**Result:** δ*(A, 0110) = A

Since A ∉ F = {B}, the string "0110" is **rejected**.

**Trace summary:**
A →0→ B →1→ B →1→ B →0→ A (reject)

**Identifying the language:**
Looking at transitions:
- From A: 0 goes to B (accept), 1 stays in A
- From B: 1 stays in B (accept), 0 goes to A

Pattern: State B = "last symbol was 0" or "sequence of 1s after a 0"
Actually: A = even number of 0s, B = odd number of 0s

**M accepts L = {w | w has an odd number of 0s}**

Verification of "0110":
- Number of 0s = 2 (even) → reject ✓`,
  },
  {
    id: 'cs203-t1-ex15',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'Concatenation Closure',
    description: 'Prove that regular languages are closed under concatenation. Given NFAs M₁ for L₁ and M₂ for L₂, construct an NFA for L₁L₂.',
    difficulty: 3,
    hints: [
      'Run M₁, then at the end switch to M₂',
      'Add ε-transitions from M₁ accept states to M₂ start state',
      'Only M₂ accept states should be accepting in the result',
    ],
    solution: `**Theorem:** If L₁ and L₂ are regular, then L₁L₂ is regular.

**Proof by construction:**

Let M₁ = (Q₁, Σ, δ₁, q₁, F₁) be an NFA for L₁
Let M₂ = (Q₂, Σ, δ₂, q₂, F₂) be an NFA for L₂

Construct NFA M = (Q, Σ, δ, q₀, F) for L₁L₂:

**Construction:**
- Q = Q₁ ∪ Q₂ (disjoint union)
- q₀ = q₁ (start of M₁)
- F = F₂ (only M₂'s accept states)
- δ defined as:
  - δ(q, a) = δ₁(q, a) for q ∈ Q₁, a ∈ Σ
  - δ(q, a) = δ₂(q, a) for q ∈ Q₂, a ∈ Σ
  - δ(q, ε) = δ₁(q, ε) ∪ {q₂} for q ∈ F₁ (add ε to M₂ start)
  - δ(q, ε) = δ₂(q, ε) for q ∈ Q₂

**Intuition:**
1. Start in M₁'s start state
2. Process input through M₁
3. When in an accepting state of M₁, can ε-transition to M₂
4. Continue processing in M₂
5. Accept when M₂ accepts

**Correctness:**
w ∈ L₁L₂ ⟺ w = xy where x ∈ L₁ and y ∈ L₂
         ⟺ M₁ accepts x (reaching F₁) and M₂ accepts y
         ⟺ M can process x in M₁ part, ε-move to M₂, process y
         ⟺ M accepts w

**Diagram:**
\`\`\`
[M₁] --ε--> [M₂]
  ↑           ↓
start       accept
\`\`\``,
  },
  {
    id: 'cs203-t1-ex16',
    subjectId: 'cs203',
    topicId: 'cs203-topic-1',
    type: 'written',
    title: 'Pumping Lemma for ww',
    description: 'Use the pumping lemma to prove that L = {ww | w ∈ {a,b}*} is not regular.',
    difficulty: 5,
    hints: [
      'Choose a specific string in L of length ≥ p',
      'Consider aᵖbᵖaᵖbᵖ',
      'Since |xy| ≤ p, y must be in the first block of a\'s',
    ],
    solution: `**Proof that L = {ww | w ∈ {a,b}*} is not regular**

Assume for contradiction that L is regular with pumping length p.

**Choose string:** s = aᵖbᵖaᵖbᵖ

Check: s = ww where w = aᵖbᵖ, so s ∈ L ✓
Check: |s| = 4p ≥ p ✓

**Apply pumping lemma:** s = xyz where |y| > 0, |xy| ≤ p

Since |xy| ≤ p and s starts with p a's:
- xy consists entirely of a's from the first block
- x = aⁱ, y = aʲ for some i ≥ 0, j > 0, i + j ≤ p
- z = aᵖ⁻ⁱ⁻ʲbᵖaᵖbᵖ

**Pump with i = 2:**
xy²z = aⁱ · aʲ · aʲ · aᵖ⁻ⁱ⁻ʲbᵖaᵖbᵖ
     = aᵖ⁺ʲbᵖaᵖbᵖ

This has length 4p + j, which is odd when j is odd... but more importantly:

For xy²z to be in L, it must equal uu for some u.
|xy²z| = 4p + j, so |u| = (4p + j)/2 = 2p + j/2

If j is odd, this isn't an integer, contradiction.
If j is even, u would need to be aᵖ⁺ʲ/²bᵖ, but then:
uu = aᵖ⁺ʲ/²bᵖaᵖ⁺ʲ/²bᵖ ≠ aᵖ⁺ʲbᵖaᵖbᵖ = xy²z

(The first half has p + j/2 a's, but xy²z has p + j a's in first part)

**Contradiction:** xy²z ∉ L but pumping lemma guarantees xy²z ∈ L.

**Conclusion:** L is not regular. ∎`,
  },
];
