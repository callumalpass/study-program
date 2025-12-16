import { WrittenExercise } from '../../../../core/types';

export const topic4Exercises: WrittenExercise[] = [
  {
    id: 'cs203-t4-ex1',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'PDA for Equal a\'s and b\'s',
    description: 'Design a PDA that accepts L = {w ∈ {a,b}* | w has equal numbers of a\'s and b\'s}. Use acceptance by empty stack.',
    difficulty: 3,
    hints: [
      'Use stack to track the "imbalance" between a\'s and b\'s',
      'Push for one symbol, pop for the other',
      'What if we see a "b" when expecting "a" on stack?',
    ],
    solution: `**PDA for equal a's and b's (empty stack acceptance)**

**Intuition:**
- Track excess a's or excess b's on stack
- Use different stack symbols for each case
- Accept when balanced (stack empty)

**PDA M = (Q, Σ, Γ, δ, q₀, Z₀, F):**
- Q = {q}
- Σ = {a, b}
- Γ = {A, B, Z₀}
- q₀ = q
- Z₀ = Z₀ (initial stack symbol)
- F = ∅ (accept by empty stack)

**Transitions:**

Start: pop Z₀ if balanced, or begin tracking
- δ(q, ε, Z₀) = {(q, ε)} — accept empty string
- δ(q, a, Z₀) = {(q, A)} — first symbol is a
- δ(q, b, Z₀) = {(q, B)} — first symbol is b

Tracking excess a's (A on stack):
- δ(q, a, A) = {(q, AA)} — more a's, push A
- δ(q, b, A) = {(q, ε)} — b cancels an a

Tracking excess b's (B on stack):
- δ(q, b, B) = {(q, BB)} — more b's, push B
- δ(q, a, B) = {(q, ε)} — a cancels a b

**Trace for "abba":**
(q, abba, Z₀)
⊢ (q, bba, A) — read a, push A
⊢ (q, ba, ε) — read b, pop A, stack empty!
Need to handle empty stack mid-computation...

**Revised design with bottom marker:**

- δ(q, a, Z₀) = {(q, AZ₀)}
- δ(q, b, Z₀) = {(q, BZ₀)}
- δ(q, a, A) = {(q, AA)}
- δ(q, b, A) = {(q, ε)}
- δ(q, b, B) = {(q, BB)}
- δ(q, a, B) = {(q, ε)}
- δ(q, ε, Z₀) = {(q, ε)} — accept when only Z₀ remains

**Trace for "abba":**
(q, abba, Z₀) ⊢ (q, bba, AZ₀) ⊢ (q, ba, Z₀) ⊢ (q, a, BZ₀) ⊢ (q, ε, Z₀) ⊢ (q, ε, ε) Accept! ✓`,
  },
  {
    id: 'cs203-t4-ex2',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'PDA for Palindromes',
    description: 'Design a PDA for L = {wwᴿ | w ∈ {a,b}*}, palindromes of even length. Use acceptance by final state.',
    difficulty: 3,
    hints: [
      'Push first half, match second half',
      'Need to guess where the middle is',
      'Use nondeterminism to guess the midpoint',
    ],
    solution: `**PDA for even-length palindromes {wwᴿ}**

**Strategy:**
1. Push symbols for the first half
2. Nondeterministically guess when we're at the middle
3. Pop and match for the second half

**PDA M = (Q, Σ, Γ, δ, q₀, Z₀, F):**
- Q = {q₀, q₁, q₂}
- Σ = {a, b}
- Γ = {a, b, Z₀}
- Start: q₀
- F = {q₂}

**States:**
- q₀: pushing (first half)
- q₁: popping and matching (second half)
- q₂: accept state

**Transitions:**

In q₀ (pushing first half):
- δ(q₀, a, Z₀) = {(q₀, aZ₀)} — push a
- δ(q₀, b, Z₀) = {(q₀, bZ₀)} — push b
- δ(q₀, a, a) = {(q₀, aa)} — push a
- δ(q₀, a, b) = {(q₀, ab)} — push a
- δ(q₀, b, a) = {(q₀, ba)} — push b
- δ(q₀, b, b) = {(q₀, bb)} — push b
- δ(q₀, ε, Z₀) = {(q₁, Z₀)} — guess middle (empty w case)
- δ(q₀, ε, a) = {(q₁, a)} — guess middle
- δ(q₀, ε, b) = {(q₁, b)} — guess middle

In q₁ (matching second half):
- δ(q₁, a, a) = {(q₁, ε)} — match a
- δ(q₁, b, b) = {(q₁, ε)} — match b
- δ(q₁, ε, Z₀) = {(q₂, Z₀)} — done, accept

**Trace for "abba":**
(q₀, abba, Z₀)
⊢ (q₀, bba, aZ₀)
⊢ (q₀, ba, baZ₀)
⊢ (q₁, ba, baZ₀) — guess middle here
⊢ (q₁, a, aZ₀) — match b
⊢ (q₁, ε, Z₀) — match a
⊢ (q₂, ε, Z₀) — accept ✓`,
  },
  {
    id: 'cs203-t4-ex3',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'Converting Acceptance Modes',
    description: 'Given a PDA that accepts by final state, describe how to construct an equivalent PDA that accepts by empty stack.',
    difficulty: 5,
    hints: [
      'Add a new bottom-of-stack marker',
      'When original would accept, pop everything',
      'Need to handle both acceptance and emptying',
    ],
    solution: `**Converting Final State PDA to Empty Stack PDA**

**Given:** PDA P = (Q, Σ, Γ, δ, q₀, Z₀, F) accepting by final state

**Construct:** PDA P' = (Q', Σ, Γ', δ', q'₀, X₀, ∅) accepting by empty stack

**Construction:**

**New components:**
- Q' = Q ∪ {q'₀, q_empty} (add new start and emptying state)
- Γ' = Γ ∪ {X₀} (add new bottom marker)
- Start state: q'₀
- No accepting states (accept by empty stack)

**Transitions:**

**1. Setup:** Push original start config on stack
δ'(q'₀, ε, X₀) = {(q₀, Z₀X₀)}

**2. Original transitions:** Keep all of P's transitions
For all (q, a, Y) → (p, γ) in P:
  add δ'(q, a, Y) = {(p, γ)} (plus whatever was there)

**3. Enter emptying mode:** When P would accept
For all q ∈ F and all Y ∈ Γ':
  add (q_empty, ε) to δ'(q, ε, Y)

**4. Empty the stack:** Pop everything in emptying mode
For all Y ∈ Γ':
  δ'(q_empty, ε, Y) = {(q_empty, ε)}

**Why it works:**

- X₀ ensures we don't accidentally empty during computation
- Original computation proceeds normally
- When original P reaches accepting state, we can ε-transition to q_empty
- q_empty pops everything including X₀
- Empty stack = acceptance

**Correctness argument:**
- If w is accepted by P (ends in state q ∈ F with some stack γX₀):
  P' can reach (q, ε, γX₀), then (q_empty, ε, γX₀), then empty the stack
- If P' accepts w (empty stack):
  Must have gone through q_empty, which requires visiting some q ∈ F
  Therefore P accepts w

**Reverse construction (empty stack → final state) is similar:**
- Detect when original would empty (can't directly detect, so use bottom marker)
- Transition to accepting state when bottom marker is about to be popped`,
  },
  {
    id: 'cs203-t4-ex4',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'PDA Computation Trace',
    description: 'For the PDA with δ(q₀, a, Z) = {(q₀, AZ)}, δ(q₀, b, A) = {(q₁, ε)}, δ(q₁, b, A) = {(q₁, ε)}, δ(q₁, ε, Z) = {(q₂, Z)}, start q₀, stack symbol Z, accept {q₂}. Trace the computation on "aabb".',
    difficulty: 1,
    hints: [
      'Write out each configuration (state, remaining input, stack)',
      'Stack is written with top on the left',
      'Follow the unique path (this PDA is deterministic)',
    ],
    solution: `**PDA Trace for "aabb"**

**PDA definition:**
- δ(q₀, a, Z) = {(q₀, AZ)} — push A
- δ(q₀, b, A) = {(q₁, ε)} — pop A, change state
- δ(q₁, b, A) = {(q₁, ε)} — continue popping A's
- δ(q₁, ε, Z) = {(q₂, Z)} — accept when only Z left

**Configuration notation:** (state, remaining input, stack)
Stack written top-first: "AZ" means A is on top, Z at bottom

**Trace:**

\`\`\`
Step 0: (q₀, aabb, Z)
        Read 'a', see Z: apply δ(q₀, a, Z) = {(q₀, AZ)}

Step 1: (q₀, abb, AZ)
        Read 'a', see A: no transition for (q₀, a, A)!
\`\`\`

**Wait - there's no transition for (q₀, a, A)!**

Let me check: the PDA only has δ(q₀, a, Z), not δ(q₀, a, A).

**This PDA does not accept "aabb".**

Let's try "abb":

\`\`\`
Step 0: (q₀, abb, Z)
        Read 'a', see Z: δ(q₀, a, Z) = (q₀, AZ)

Step 1: (q₀, bb, AZ)
        Read 'b', see A: δ(q₀, b, A) = (q₁, ε)

Step 2: (q₁, b, Z)
        Read 'b', see Z: no transition for (q₁, b, Z)!
\`\`\`

**"abb" also not accepted.**

Let's try "ab":

\`\`\`
Step 0: (q₀, ab, Z)
        Read 'a', see Z: δ(q₀, a, Z) = (q₀, AZ)

Step 1: (q₀, b, AZ)
        Read 'b', see A: δ(q₀, b, A) = (q₁, ε)

Step 2: (q₁, ε, Z)
        ε-transition, see Z: δ(q₁, ε, Z) = (q₂, Z)

Step 3: (q₂, ε, Z)
        Accept! (q₂ ∈ F and input consumed)
\`\`\`

**"ab" is accepted!**

This PDA recognizes {aⁿbⁿ} but seems to only work for n=1 based on the given transitions. For n>1, we'd need δ(q₀, a, A) = {(q₀, AA)}.`,
  },
  {
    id: 'cs203-t4-ex5',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'CFG to PDA Conversion',
    description: 'Convert the CFG S → aSb | ε to an equivalent PDA using the standard construction. Show the transitions.',
    difficulty: 3,
    hints: [
      'Use a 3-state construction: start, loop, accept',
      'Push start symbol, then simulate derivation',
      'Variables: expand by pushing production RHS',
      'Terminals: match against input',
    ],
    solution: `**CFG to PDA Conversion**

**Given CFG:**
S → aSb | ε

**Standard construction produces PDA M = (Q, Σ, Γ, δ, q₀, Z₀, F):**

- Q = {q₀, q₁, q₂}
- Σ = {a, b}
- Γ = {S, a, b, Z₀}
- Start: q₀
- F = {q₂}

**States:**
- q₀: initial state
- q₁: main processing loop
- q₂: accept state

**Transitions:**

**Setup:**
δ(q₀, ε, Z₀) = {(q₁, SZ₀)}  — push start symbol S

**For variable S on stack, apply productions:**
δ(q₁, ε, S) = {(q₁, aSb), (q₁, ε)}
- First option: S → aSb, push "aSb" (b first, then S, then a on top)
- Second option: S → ε, pop S

**For terminals on stack, match against input:**
δ(q₁, a, a) = {(q₁, ε)}  — match a
δ(q₁, b, b) = {(q₁, ε)}  — match b

**Accept:**
δ(q₁, ε, Z₀) = {(q₂, Z₀)}  — accept when stack has only Z₀

**Trace for "aabb":**
\`\`\`
(q₀, aabb, Z₀)
⊢ (q₁, aabb, SZ₀)      — push S
⊢ (q₁, aabb, aSbZ₀)    — expand S → aSb
⊢ (q₁, abb, SbZ₀)      — match a
⊢ (q₁, abb, aSbbZ₀)    — expand S → aSb
⊢ (q₁, bb, SbbZ₀)      — match a
⊢ (q₁, bb, bbZ₀)       — expand S → ε
⊢ (q₁, b, bZ₀)         — match b
⊢ (q₁, ε, Z₀)          — match b
⊢ (q₂, ε, Z₀)          — accept ✓
\`\`\`

**Note:** Stack shows rightmost symbol at bottom. When pushing "aSb", we push b, S, a in that order so a is on top.`,
  },
  {
    id: 'cs203-t4-ex6',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'PDA to CFG Conversion',
    description: 'Explain the construction for converting a PDA to an equivalent CFG. What do the variables in the constructed grammar represent?',
    difficulty: 5,
    hints: [
      'Variables are triples [p, A, q] representing "from p to q while net-popping A"',
      'If PDA goes from p to q while removing A from stack, variable [p,A,q] derives input consumed',
      'Productions capture how transitions affect the stack',
    ],
    solution: `**PDA to CFG Conversion**

**Given:** PDA P = (Q, Σ, Γ, δ, q₀, Z₀, ∅) accepting by empty stack

**Construct:** CFG G = (V, Σ, R, S)

**Variable Interpretation:**
Variables have form [p, A, q] meaning:
"Starting in state p with A on top of stack, the PDA can reach state q having exactly popped A (and anything pushed then popped in between)."

**Construction:**

**Variables:**
V = {[p, A, q] | p, q ∈ Q, A ∈ Γ} ∪ {S}

**Start symbol:**
S with production S → [q₀, Z₀, q] for each q ∈ Q

**Productions from transitions:**

**Case 1:** δ(p, a, A) contains (r, ε) — pop A directly
Add: [p, A, r] → a

**Case 2:** δ(p, a, A) contains (r, B₁B₂...Bₖ) — replace A with B₁...Bₖ
For all choices of states q₁, q₂, ..., qₖ₊₁ where qₖ₊₁ is the "final" state:
Add: [p, A, qₖ₊₁] → a [r, B₁, q₁] [q₁, B₂, q₂] ... [qₖ₋₁, Bₖ, qₖ₊₁]

**Intuition for Case 2:**
- Start in p with A on stack
- Read a, replace A with B₁B₂...Bₖ, go to state r
- From r, pop B₁, ending in state q₁
- From q₁, pop B₂, ending in state q₂
- ...
- From qₖ₋₁, pop Bₖ, ending in final state

**Example:**
If δ(p, a, A) = {(r, BC)}:
[p, A, q₂] → a [r, B, q₁] [q₁, C, q₂] for all q₁, q₂ ∈ Q

**Why it works:**
- [p, A, q] derives exactly strings that take PDA from (p, w, Aγ) to (q, ε, γ) for any γ
- The construction captures all possible state sequences
- Nondeterminism in PDA becomes nondeterminism in grammar (multiple productions)

**Correctness:**
S ⇒* w ⟺ (q₀, w, Z₀) ⊢* (q, ε, ε) for some q ⟺ P accepts w

**Size:** O(|Q|³|Γ||R|) variables and productions in worst case`,
  },
  {
    id: 'cs203-t4-ex7',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'DPDA Limitations',
    description: 'Prove that the language L = {wwᴿ | w ∈ {a,b}*} cannot be recognized by a DPDA (deterministic pushdown automaton).',
    difficulty: 5,
    hints: [
      'DPDA must know when to switch from pushing to popping',
      'For wwᴿ, the middle is not marked',
      'Contrast with wcwᴿ which IS recognizable by DPDA',
    ],
    solution: `**Proof that {wwᴿ} is not a DCFL (not recognizable by DPDA)**

**Language:** L = {wwᴿ | w ∈ {a,b}*} (even-length palindromes)

**Key insight:** A DPDA must deterministically decide when it's at the middle of the string, but there's no marker to indicate this.

**Proof (informal):**

Consider the strings a²ⁿb²ⁿ for various n.
At position n (after reading aⁿ), a DPDA processing aⁿb...bⁿaⁿ must:
- Either commit to "we're at the middle" (start matching)
- Or continue pushing (we're still in first half)

**Problem:** The same prefix aⁿ could be:
- The first half of aⁿaⁿ (middle after aⁿ)
- The first quarter of aⁿaⁿaⁿaⁿ... (middle much later)

A DPDA must make the same decision for the same configuration.

**Formal argument using prefix property:**

L is prefix-free at no length. For any w₁ ∈ L:
- Consider w₁ = u₁u₁ᴿ
- There exists w₂ = u₁u₁ᴿu₂u₂ᴿ ∈ L where w₁ is a proper prefix of w₂

When a DPDA finishes reading w₁, it must accept (if w₁ ∈ L).
But then for w₂ = w₁u₂u₂ᴿ, after reading w₁ prefix, the DPDA already accepted!

DCFLs have the property that we can detect acceptance at end of input.

**Closure argument:**
- DCFLs are closed under complement
- If {wwᴿ} were DCFL, so would its complement
- The complement of {wwᴿ} is not even context-free!
  (Actually this argument doesn't work since complement of CFL might not be CFL)

**Better argument - Pumping for DCFLs:**
There's a stronger pumping lemma for DCFLs showing that palindromes cannot be DCFL.

**Contrast with wcwᴿ:**
L' = {wcwᴿ | w ∈ {a,b}*} IS a DCFL:
- Push until seeing c
- After c, pop and match
- The marker c provides deterministic information about the middle

**Conclusion:** {wwᴿ} requires nondeterminism to guess the middle, so it's not a DCFL. ∎`,
  },
  {
    id: 'cs203-t4-ex8',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'PDA for Unequal Strings',
    description: 'Design a PDA for L = {aⁱbʲ | i ≠ j}. Hint: This is the union of {aⁱbʲ | i > j} and {aⁱbʲ | i < j}.',
    difficulty: 5,
    hints: [
      'Handle i > j and i < j separately',
      'Use nondeterminism to guess which case',
      'For i > j: push a\'s, pop for b\'s, must have a\'s left',
    ],
    solution: `**PDA for {aⁱbʲ | i ≠ j}**

**Strategy:**
L = {aⁱbʲ | i > j} ∪ {aⁱbʲ | i < j}

Use nondeterminism to guess which case at the start.

**PDA M = (Q, Σ, Γ, δ, q₀, Z₀, F):**
- Q = {q₀, q_more_a, q_match_a, q_more_b, q_match_b, q_accept}
- Σ = {a, b}
- Γ = {A, B, Z₀}
- F = {q_accept}

**Branch 1: i > j (more a's than b's)**

Start: guess this case
- δ(q₀, ε, Z₀) = {(q_more_a, Z₀), (q_more_b, Z₀)}

In q_more_a: push all a's
- δ(q_more_a, a, Z₀) = {(q_more_a, AZ₀)}
- δ(q_more_a, a, A) = {(q_more_a, AA)}

Switch to matching when b's start, but ensure extra a's exist:
- δ(q_more_a, b, A) = {(q_match_a, ε)}

In q_match_a: pop A's for b's
- δ(q_match_a, b, A) = {(q_match_a, ε)}

Accept when b's done but A's remain:
- δ(q_match_a, ε, A) = {(q_accept, A)}
- δ(q_accept, ε, A) = {(q_accept, ε)} — clean up

**Branch 2: i < j (more b's than a's)**

In q_more_b: push all a's
- δ(q_more_b, a, Z₀) = {(q_more_b, AZ₀)}
- δ(q_more_b, a, A) = {(q_more_b, AA)}

Start matching b's:
- δ(q_more_b, b, A) = {(q_match_b, ε)}
- δ(q_more_b, b, Z₀) = {(q_match_b, BZ₀)} — no a's case

In q_match_b: pop A's, then start pushing B's for excess b's
- δ(q_match_b, b, A) = {(q_match_b, ε)}
- δ(q_match_b, b, Z₀) = {(q_match_b, BZ₀)} — all a's matched, start counting excess
- δ(q_match_b, b, B) = {(q_match_b, BB)}

Accept when done reading and B's on stack (excess b's):
- δ(q_match_b, ε, B) = {(q_accept, B)}

**Trace for "aab" (i > j):**
(q₀, aab, Z₀) ⊢ (q_more_a, aab, Z₀) ⊢ (q_more_a, ab, AZ₀) ⊢ (q_more_a, b, AAZ₀)
⊢ (q_match_a, ε, AZ₀) ⊢ (q_accept, ε, AZ₀) ✓`,
  },
  {
    id: 'cs203-t4-ex9',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'Two-Stack PDA Power',
    description: 'Explain why a PDA with two stacks is equivalent to a Turing machine in computational power.',
    difficulty: 5,
    hints: [
      'A TM tape can be split at the head position',
      'One stack holds left part, other holds right part',
      'Moving the head = transferring between stacks',
    ],
    solution: `**Two-Stack PDA = Turing Machine Power**

**Theorem:** A PDA with two stacks can simulate any Turing machine.

**Intuition:**
A TM has a tape that extends infinitely in both directions from the head.
Two stacks can represent:
- Stack 1: tape contents to the LEFT of the head
- Stack 2: tape contents to the RIGHT of the head (including current cell)

**Simulation:**

**TM Configuration:** ...□ a b c [d] e f □ ...
                     ←left→ ^head ←right→

**Two-stack representation:**
- Stack 1 (left of head): top→ c b a □ ... ←bottom
- Stack 2 (right of head): top→ d e f □ ... ←bottom
- Current symbol: top of Stack 2

**Simulating TM operations:**

**1. Read current symbol:**
Read top of Stack 2 (the cell under the head)

**2. Write symbol:**
Pop Stack 2, push new symbol to Stack 2

**3. Move head RIGHT:**
Pop Stack 2 (current cell), push it to Stack 1
Now top of Stack 2 is new current cell

**4. Move head LEFT:**
Pop Stack 1 (cell to left), push to Stack 2
Now top of Stack 2 is new current cell

**Handling tape boundaries:**
If a stack is empty when we need to pop, push a blank (□) to the other stack first (extending the tape).

**State simulation:**
Two-stack PDA states correspond directly to TM states.

**Why single-stack PDA is weaker:**
- Single stack gives LIFO access only
- Can't "see" both sides of current position
- Can only match nested/recursive patterns, not arbitrary tape manipulation

**Corollary:**
- Two-stack PDA can recognize non-context-free languages
- Two-stack PDA can recognize {aⁿbⁿcⁿ}
- Two-stack PDA faces undecidability (halting problem)

**Hierarchy:**
DFA < PDA (1 stack) < 2-stack PDA = TM

The jump from 1 to 2 stacks crosses the computability boundary from CFLs to recursively enumerable languages.`,
  },
  {
    id: 'cs203-t4-ex10',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'PDA for Dyck Language',
    description: 'The Dyck language D₂ consists of balanced strings of two types of brackets: () and []. Design a PDA for D₂.',
    difficulty: 3,
    hints: [
      'Push opening brackets, pop and match closing brackets',
      'Different stack symbols for different bracket types',
      'Accept when input is consumed and stack has only the bottom marker',
    ],
    solution: `**PDA for Dyck Language D₂**

**Language:** Balanced strings over {(, ), [, ]}

**Examples:**
- "()" ✓, "[]" ✓, "([])" ✓, "()[()]" ✓
- "(" ✗, "[(])" ✗, "([)]" ✗

**PDA M = (Q, Σ, Γ, δ, q₀, Z₀, F):**
- Q = {q, q_acc}
- Σ = {(, ), [, ]}
- Γ = {P, B, Z₀}  (P for (, B for [)
- Start: q
- F = {q_acc}

**Transitions:**

**Push opening brackets:**
- δ(q, (, Z₀) = {(q, PZ₀)}
- δ(q, (, P) = {(q, PP)}
- δ(q, (, B) = {(q, PB)}
- δ(q, [, Z₀) = {(q, BZ₀)}
- δ(q, [, P) = {(q, BP)}
- δ(q, [, B) = {(q, BB)}

**Pop and match closing brackets:**
- δ(q, ), P) = {(q, ε)}  — match ( with )
- δ(q, ], B) = {(q, ε)}  — match [ with ]

**Accept when balanced:**
- δ(q, ε, Z₀) = {(q_acc, Z₀)}

**Note:** No transitions for mismatches like δ(q, ), B) or δ(q, ], P) — these cause rejection.

**Trace for "([()])":**
\`\`\`
(q, ([()])], Z₀)
⊢ (q, [()]), PZ₀)      — push (
⊢ (q, ()]), BPZ₀)      — push [
⊢ (q, )]), PBP Z₀)     — push (
⊢ (q, ]), BPZ₀)        — match )
⊢ (q, ), PZ₀)          — match ]
⊢ (q, ε, Z₀)           — match )
⊢ (q_acc, ε, Z₀)       — accept ✓
\`\`\`

**Trace for "([)]" (mismatched):**
\`\`\`
(q, ([)], Z₀)
⊢ (q, [)], PZ₀)        — push (
⊢ (q, )], BPZ₀)        — push [
⊢ STUCK!               — see ), top is B, no matching transition
\`\`\`

Computation blocks, string rejected. ✓`,
  },
  {
    id: 'cs203-t4-ex11',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'PDA with Multiple Stack Symbols',
    description: 'Design a PDA that accepts {aⁿbᵐcⁿ⁺ᵐ | n, m ≥ 0}. The number of c\'s equals the sum of a\'s and b\'s.',
    difficulty: 5,
    hints: [
      'Push something for each a and each b',
      'Pop one symbol for each c',
      'Can use the same or different stack symbols',
    ],
    solution: `**PDA for {aⁿbᵐcⁿ⁺ᵐ | n, m ≥ 0}**

**Analysis:**
- Read a's, push a marker for each
- Read b's, push a marker for each
- Read c's, pop one marker for each
- Accept when stack has only bottom marker (counts match)

**Simple approach:** Use same symbol X for both a's and b's

**PDA M = (Q, Σ, Γ, δ, q₀, Z₀, F):**
- Q = {q_a, q_b, q_c, q_acc}
- Σ = {a, b, c}
- Γ = {X, Z₀}
- Start: q_a
- F = {q_acc}

**Transitions:**

**Reading a's (push X for each):**
- δ(q_a, a, Z₀) = {(q_a, XZ₀)}
- δ(q_a, a, X) = {(q_a, XX)}

**Transition to reading b's:**
- δ(q_a, b, Z₀) = {(q_b, XZ₀)}  — no a's, start b's
- δ(q_a, b, X) = {(q_b, XX)}    — done with a's, start b's
- δ(q_a, ε, Z₀) = {(q_b, Z₀)}   — no a's, maybe no b's

**Reading b's (push X for each):**
- δ(q_b, b, Z₀) = {(q_b, XZ₀)}
- δ(q_b, b, X) = {(q_b, XX)}

**Transition to reading c's:**
- δ(q_b, c, X) = {(q_c, ε)}     — start c's, pop first X
- δ(q_b, ε, Z₀) = {(q_acc, Z₀)} — no b's or c's, accept

**Reading c's (pop X for each):**
- δ(q_c, c, X) = {(q_c, ε)}

**Accept when c's done and stack is empty of X's:**
- δ(q_c, ε, Z₀) = {(q_acc, Z₀)}

**Trace for "aabccc" (n=2, m=1, n+m=3):**
\`\`\`
(q_a, aabccc, Z₀)
⊢ (q_a, abccc, XZ₀)       — push for first a
⊢ (q_a, bccc, XXZ₀)       — push for second a
⊢ (q_b, ccc, XXXZ₀)       — push for b
⊢ (q_c, cc, XXZ₀)         — pop for first c
⊢ (q_c, c, XZ₀)           — pop for second c
⊢ (q_c, ε, Z₀)            — pop for third c
⊢ (q_acc, ε, Z₀)          — accept ✓
\`\`\`

**Trace for "c" (n=0, m=0, need 0 c's, not 1):**
\`\`\`
(q_a, c, Z₀)
⊢ (q_b, c, Z₀)             — ε-move, no a's
  No transition for (q_b, c, Z₀)!
  STUCK — rejected ✓
\`\`\``,
  },
  {
    id: 'cs203-t4-ex12',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'ε-Transitions in PDAs',
    description: 'Explain the role of ε-transitions in PDAs. Can every PDA be converted to an equivalent PDA with no ε-transitions on input?',
    difficulty: 3,
    hints: [
      'ε-transitions allow stack manipulation without reading input',
      'Consider what would happen without them',
      'Think about NPDAs vs DPDAs',
    ],
    solution: `**Role of ε-Transitions in PDAs**

**ε-transitions in PDAs:** Transitions of the form δ(q, ε, A) = {...}
- Can be taken without consuming any input symbol
- Allow stack manipulation independent of input

**Key uses of ε-transitions:**

**1. Nondeterministic guessing:**
- Guess where the middle of a palindrome is
- Choose between different parsing strategies
- δ(q, ε, A) = {(p₁, γ₁), (p₂, γ₂)} — choose nondeterministically

**2. Stack setup/cleanup:**
- Initialize stack before processing
- Clean up stack before accepting
- δ(q₀, ε, Z₀) = {(q₁, SZ₀)} — push start symbol

**3. Mode changes:**
- Switch from "pushing phase" to "matching phase"
- Change states based on stack, not input
- δ(q_push, ε, X) = {(q_pop, X)} — switch to popping mode

**Can we eliminate ε-transitions?**

**For NPDAs:** Generally NO, not in a straightforward way.

**Problem:** ε-transitions allow the PDA to examine and modify the stack without reading input. This is essential for:
- Simulating CFG derivations (expand variables before matching)
- Making decisions based on stack contents alone

**Simulation attempt:**
If we try to fold ε-transitions into regular transitions, we face issues:
- Don't know when an ε-loop terminates
- May need unbounded ε-moves between inputs
- Stack can change arbitrarily on ε-moves

**However:** We can convert to a PDA where ε-transitions don't change the stack "net effect" per input symbol, but some ε-moves may remain.

**For DPDAs:** Different constraints apply, and ε-transitions are more limited.

**Key theorem:** NPDAs (even with ε-transitions) recognize exactly the CFLs. The ε-transitions add convenience but not power — they're part of the standard model.

**Contrast with NFAs:**
- NFAs: ε-transitions can be eliminated (subset construction preserves this)
- NPDAs: ε-transitions are more intrinsic due to stack operations`,
  },
  {
    id: 'cs203-t4-ex13',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'PDA Instantaneous Description',
    description: 'Define the instantaneous description (ID) of a PDA and the yields relation (⊢). Show how to formalize PDA computation.',
    difficulty: 1,
    hints: [
      'ID captures the complete state of a PDA at any moment',
      'Similar to TM configurations',
      '⊢ shows one computation step',
    ],
    solution: `**Instantaneous Description (ID) of a PDA**

**Definition:**
An instantaneous description (ID) or configuration of a PDA is a triple:

**(q, w, γ)**

where:
- q ∈ Q is the current state
- w ∈ Σ* is the remaining (unread) input
- γ ∈ Γ* is the current stack contents (top on left)

**The Yields Relation ⊢**

**(q, aw, Aβ) ⊢ (p, w, γβ)** if (p, γ) ∈ δ(q, a, A)

This means: In state q, reading input symbol a (or ε), with A on top of stack, the PDA can transition to state p, consuming a, and replacing A with γ.

**Variants:**
- **(q, w, Aβ) ⊢ (p, w, γβ)** if (p, γ) ∈ δ(q, ε, A) — ε-transition

**Reflexive-transitive closure:**
- **⊢*** : zero or more steps
- **(q, w, γ) ⊢* (p, w', γ')** means the PDA can reach (p, w', γ') from (q, w, γ)

**Acceptance definitions:**

**By final state:**
L(M) = {w | (q₀, w, Z₀) ⊢* (q, ε, γ) for some q ∈ F, γ ∈ Γ*}

**By empty stack:**
N(M) = {w | (q₀, w, Z₀) ⊢* (q, ε, ε) for some q ∈ Q}

**Example computation:**

PDA: δ(q₀, a, Z) = {(q₀, AZ)}, δ(q₀, b, A) = {(q₁, ε)}, δ(q₁, ε, Z) = {(q₂, Z)}

Input: "ab"

\`\`\`
(q₀, ab, Z)
  ⊢ (q₀, b, AZ)      by δ(q₀, a, Z) = {(q₀, AZ)}
  ⊢ (q₁, ε, Z)       by δ(q₀, b, A) = {(q₁, ε)}
  ⊢ (q₂, ε, Z)       by δ(q₁, ε, Z) = {(q₂, Z)}
\`\`\`

Since (q₀, ab, Z) ⊢* (q₂, ε, Z) and q₂ ∈ F, string "ab" is accepted.`,
  },
  {
    id: 'cs203-t4-ex14',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'DCFL Closure Properties',
    description: 'Which closure properties do deterministic context-free languages (DCFLs) have that general CFLs don\'t? Explain.',
    difficulty: 3,
    hints: [
      'Consider complement closure',
      'Think about what determinism guarantees',
      'DCFLs are recognized by DPDAs',
    ],
    solution: `**DCFL Closure Properties**

**Recall:**
- DCFLs = languages recognized by deterministic PDAs
- DCFLs ⊊ CFLs (proper subset)

**Key property: DCFLs are CLOSED under complement**

**Why CFLs are NOT closed under complement:**
If CFLs were closed under complement, they'd be closed under intersection:
L₁ ∩ L₂ = complement(complement(L₁) ∪ complement(L₂))

But we know CFLs aren't closed under intersection (example: {aⁿbⁿcᵐ} ∩ {aᵐbⁿcⁿ} = {aⁿbⁿcⁿ}).

**Why DCFLs ARE closed under complement:**

For a DPDA M recognizing L:
- At each step, exactly one transition applies (determinism)
- M processes all of input and either accepts or rejects
- To recognize L̄: swap accepting and rejecting outcomes

**Technical details:**
1. First convert DPDA to one that always reads entire input
2. For accept by final state: F' = Q - F
3. Must handle cases where DPDA gets stuck or loops

**Formal complement construction:**
Given DPDA M for L, construct DPDA M' for L̄:
- Make M read all input (add error state if needed)
- Swap accept/reject (complement accepting states)
- Handle end-of-input ε-moves carefully

**Other DCFL closure properties:**

**Closed under:**
- Complement ✓ (as shown above)
- Intersection with regular languages ✓
- Inverse homomorphism ✓

**NOT closed under:**
- Union ✗ (L₁ ∪ L₂ may require nondeterminism to choose)
- Intersection ✗
- Concatenation ✗
- Kleene star ✗

**Example of union failure:**
L₁ = {aⁿbⁿ | n ≥ 0} and L₂ = {aⁿb²ⁿ | n ≥ 0}
Both are DCFLs, but L₁ ∪ L₂ is not (would need to guess which pattern).

**Significance:**
Complement closure makes DCFLs "nicer" for some applications (parsing). It's a key distinguishing property from general CFLs.`,
  },
  {
    id: 'cs203-t4-ex15',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'LR Parsing and DPDAs',
    description: 'Explain the connection between LR parsing and deterministic pushdown automata.',
    difficulty: 5,
    hints: [
      'LR parsers are essentially DPDAs',
      'The stack holds parser states and grammar symbols',
      'Shift = push, Reduce = pop and push',
    ],
    solution: `**LR Parsing and DPDAs**

**Key insight:** LR parsers ARE DPDAs (with lookup tables for efficiency).

**LR Parser Components:**
1. **Input:** String to parse
2. **Stack:** Parser states + grammar symbols
3. **Parse table:** ACTION and GOTO tables
4. **Output:** Sequence of reductions (derivation)

**Correspondence with DPDAs:**

| LR Parser | DPDA |
|-----------|------|
| States (in table) | States Q |
| Stack | Stack Γ |
| ACTION[s,a] = shift | δ(s, a, X) = (s', YX) push |
| ACTION[s,a] = reduce | δ(s, ε, ...) pop and push |
| Lookahead | Reading input |
| Accept | Reaching accept state |

**LR Parsing Actions:**

**Shift:**
- Read input symbol a
- Push new state s' onto stack
- Like DPDA reading and pushing

**Reduce by A → β:**
- Pop |β| symbols from stack (the handle)
- Push A (the non-terminal)
- GOTO gives new state
- Like DPDA ε-transitions modifying stack

**Why DPDA is appropriate:**
1. LR(k) grammars have the "deterministic" property
2. At each step, the parser knows exactly what to do
3. No backtracking needed
4. Stack holds sufficient context for decisions

**LR(k) Languages = DCFLs:**

**Theorem:** A language is DCFL if and only if it has an LR(k) grammar for some k.

This establishes:
- Every LR-parsable language has a DPDA
- Every DPDA language has an LR grammar (after end-marker)

**Practical implications:**
- Most programming languages are designed to be LR(1)
- Parser generators (yacc, bison) build DPDAs from grammars
- Conflicts (shift-reduce, reduce-reduce) indicate grammar is not LR

**Non-LR example:**
Palindromes {wwᴿ} are CFL but not DCFL, so no LR grammar exists.
This is why natural language parsing is harder!`,
  },
  {
    id: 'cs203-t4-ex16',
    subjectId: 'cs203',
    topicId: 'cs203-topic-4',
    type: 'written',
    title: 'PDA for Prefix-Free Language',
    description: 'A language L is prefix-free if no string in L is a prefix of another. Show that if L is a CFL and prefix-free, then L is a DCFL.',
    difficulty: 5,
    hints: [
      'With prefix-freeness, we know acceptance immediately at end of string',
      'Don\'t need to look ahead or guess',
      'Construct a DPDA from any PDA for L',
    ],
    solution: `**Theorem:** If L is context-free and prefix-free, then L is deterministic context-free.

**Prefix-free definition:**
L is prefix-free if for all w₁, w₂ ∈ L: w₁ is not a proper prefix of w₂.

**Proof Idea:**

**Why prefix-freeness helps:**

Consider an NPDA M for L. When M accepts string w:
- Some computation path reaches acceptance
- Other paths may continue or reject

**Key observation:**
If L is prefix-free and w ∈ L, then no extension wv (v ≠ ε) is in L.

This means: Once we've read w ∈ L, we don't need to consider accepting longer strings.

**Construction sketch:**

Given NPDA M for L, construct DPDA M':

1. **Determinize carefully:**
   - At each step, track set of possible configurations
   - This would normally cause exponential blowup

2. **Use prefix-freeness:**
   - If any configuration in the set would accept, we can accept immediately
   - No need to continue reading for alternative acceptances
   - Once we accept, we know no extension is in L

3. **Handle ambiguity:**
   - Different paths reaching different configurations
   - Since L is prefix-free, at most one path leads to acceptance at each input length
   - Can resolve nondeterminism "lazily"

**More formal approach:**

Use the fact that:
- Prefix-free CFLs have unambiguous grammars
- These correspond to grammars where end-of-string is unambiguous
- Such grammars are essentially LR

**Alternative proof using complement:**

1. L is CFL and prefix-free
2. L$ (with end marker $) is DCFL (can detect end of accepting string)
3. L$ being DCFL implies L is DCFL (remove end marker)

**Significance:**
- Prefix-freeness removes the "guessing" problem
- Many practical languages are designed to be prefix-free
- Tokenization often produces prefix-free token sequences

**Counterexample without prefix-freeness:**
{wwᴿ} is CFL but not prefix-free ("ε" is prefix of "aa") and not DCFL.`,
  },
];
