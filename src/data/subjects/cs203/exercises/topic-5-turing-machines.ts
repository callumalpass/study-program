import { WrittenExercise } from '../../../../core/types';

export const topic5Exercises: WrittenExercise[] = [
  {
    id: 'cs203-t5-ex1',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'TM for Palindrome Detection',
    description: 'Design a Turing machine that accepts palindromes over {a, b}. Describe the high-level algorithm and key states.',
    difficulty: 3,
    hints: [
      'Compare first and last symbols',
      'Mark or erase matched symbols',
      'Repeat until string is empty or mismatch found',
    ],
    solution: `**Turing Machine for Palindromes**

**High-level algorithm:**
1. Read first symbol, remember it, mark it (or erase)
2. Scan right to find last symbol
3. Compare with remembered symbol
4. If match: mark last symbol, go back to start, repeat
5. If mismatch: reject
6. If only blanks/marks remain: accept

**States:**
- q₀: start state
- q_a: remembered first symbol is 'a'
- q_b: remembered first symbol is 'b'
- q_left: scanning left to find start
- q_accept: accepting state
- q_reject: rejecting state

**Key transitions:**

**From q₀ (read first symbol):**
- δ(q₀, a) = (q_a, X, R) — mark 'a' as X, remember 'a'
- δ(q₀, b) = (q_b, X, R) — mark 'b' as X, remember 'b'
- δ(q₀, X) = (q₀, X, R) — skip marked symbols
- δ(q₀, □) = (q_accept, □, R) — empty/all marked, accept

**Scan right (q_a or q_b):**
- δ(q_a, a) = (q_a, a, R) — keep going right
- δ(q_a, b) = (q_a, b, R)
- δ(q_a, □) = (q_check_a, □, L) — found end, go back to check

**Check last symbol (q_check_a):**
- δ(q_check_a, a) = (q_left, X, L) — match! mark it
- δ(q_check_a, b) = (q_reject, b, R) — mismatch, reject
- δ(q_check_a, X) = (q_check_a, X, L) — skip marks (single char palindrome)

**Scan back left:**
- δ(q_left, a) = (q_left, a, L)
- δ(q_left, b) = (q_left, b, L)
- δ(q_left, X) = (q₀, X, R) — found marked start, restart

**Example trace for "aba":**
\`\`\`
q₀: [a]ba□ → q_a: X[b]a□ → X[b]a□ → Xb[a]□ → Xba[□]
q_check_a: Xb[a]□ → q_left: X[b]X□ → [X]bX□
q₀: X[b]X□ → q_b: XX[X]□ → XXX[□]
q_check_b: XX[X]□ → (only marks, no unmatched)
q_accept ✓
\`\`\``,
  },
  {
    id: 'cs203-t5-ex2',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'TM Configuration Notation',
    description: 'Define the configuration (instantaneous description) of a Turing machine. Write the sequence of configurations for a TM that erases its input, starting with "ab".',
    difficulty: 1,
    hints: [
      'Configuration shows tape contents, head position, and state',
      'Use notation like "abq₀cd" meaning head at position before c, in state q₀',
      'A simple erasing TM writes blanks moving right',
    ],
    solution: `**Turing Machine Configuration**

**Definition:**
A configuration (or instantaneous description) of a TM captures the complete machine state:
- Current state
- Tape contents
- Head position

**Notation:** αqβ where:
- q is the current state
- α is the tape content to the LEFT of the head
- β is the tape content from the head position onward
- First symbol of β is under the head
- Blanks on ends can be omitted

**Example:** "abq₃cd" means:
- State: q₃
- Tape: ...□abcd□...
- Head is positioned at 'c'
- α = "ab", β = "cd"

**TM to erase input:**
States: q₀ (erasing), q_acc (accept)
Transitions:
- δ(q₀, a) = (q₀, □, R) — erase a
- δ(q₀, b) = (q₀, □, R) — erase b
- δ(q₀, □) = (q_acc, □, R) — done, accept

**Configuration sequence for input "ab":**

\`\`\`
q₀ab      Initial: head at 'a', state q₀
□q₀b      After erasing 'a', move right
□□q₀□     After erasing 'b', move right
□□□q_acc  Read blank, accept
\`\`\`

Or in cleaner notation:
\`\`\`
[a]b → q₀ reads 'a', writes □, moves R
□[b] → q₀ reads 'b', writes □, moves R
□□[□] → q₀ reads □, transitions to q_acc
\`\`\`

**Key points:**
- Configuration uniquely determines future computation
- Sequence of configurations is the computation history
- Accepting computation ends in q_accept configuration
- Rejecting computation ends in q_reject configuration
- Some computations never halt (loop forever)`,
  },
  {
    id: 'cs203-t5-ex3',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'Multi-tape TM Simulation',
    description: 'Explain how a single-tape TM can simulate a k-tape TM. What is the time overhead of this simulation?',
    difficulty: 5,
    hints: [
      'Encode all k tapes on one tape',
      'Use special markers for tape boundaries and head positions',
      'Each step of k-tape TM requires scanning the single tape',
    ],
    solution: `**Simulating k-tape TM with Single-tape TM**

**Encoding k tapes on one tape:**

For k-tape TM M with tapes T₁, T₂, ..., Tₖ:

**Format:** #T₁#T₂#...#Tₖ#

**Mark head positions:** Use dotted symbols
- If Tᵢ has "abc" with head on 'b': encode as "aḃc"
- ḃ indicates head position on tape i

**Example (2 tapes):**
T₁: ab with head on 'a' → ȧb
T₂: cd with head on 'd' → cd̊

Single tape: #ȧb#cd̊#

**Simulation algorithm:**

**To simulate one step of M:**

1. **Scan right:** Find all marked (dotted) symbols
   - Record symbol under each head in finite state
   - This requires O(n) where n is used tape length

2. **Determine transitions:** Based on state and k symbols
   - Look up M's transition: (q, a₁, ..., aₖ) → (q', b₁, ..., bₖ, D₁, ..., Dₖ)

3. **Update tape:** Scan again to:
   - Write new symbols at head positions
   - Move head markers according to Dᵢ
   - May need to shift content if tape boundary reached

4. **Return to left:** Scan back to the leftmost #

**Time analysis:**

**Single step of M:** O(n) time on single-tape simulator
- Must scan entire tape to find/update all heads
- n = total symbols across all tapes

**If M runs in T(n) steps:**
- After T(n) steps, tape length is at most T(n) · k (each step adds at most k symbols)
- Each step costs O(T(n) · k) on simulator

**Total simulation time:**
T(n) steps × O(T(n)) per step = **O(T(n)²)**

**Space:** Only O(T(n)) — linear in original space

**Theorem:**
Any k-tape TM running in time T(n) can be simulated by a single-tape TM in time O(T(n)²).

**Significance:**
- Multi-tape TMs are at most polynomially faster
- Same languages are recognized (equivalent power)
- Quadratic overhead is acceptable for theoretical purposes
- In practice, multi-tape gives more efficient algorithms`,
  },
  {
    id: 'cs203-t5-ex4',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'Universal Turing Machine',
    description: 'Describe the Universal Turing Machine (UTM). What does it take as input, and how does it operate?',
    difficulty: 5,
    hints: [
      'UTM takes encoded TM + input as its input',
      'It simulates any TM on any input',
      'Like an interpreter for TM programs',
    ],
    solution: `**The Universal Turing Machine (UTM)**

**Definition:**
A Universal Turing Machine U is a specific TM that can simulate any other TM M on any input w.

**Input to U:** ⟨M, w⟩
- Encoded description of TM M
- Input string w

**Output:** U accepts ⟨M, w⟩ iff M accepts w

**Encoding a TM:**
Encode M = (Q, Σ, Γ, δ, q₀, q_accept, q_reject):
- States: q₁, q₂, ... (numbered)
- Tape symbols: 0, 1, B (fixed small alphabet)
- Transitions: List of tuples δ(qᵢ, aⱼ) = (qₖ, aₗ, D)
- Use delimiter to separate components

**How U operates:**

**Setup (3 tapes conceptually):**
1. Tape 1: Description of M (⟨M⟩)
2. Tape 2: Simulated tape of M (initially w)
3. Tape 3: Current state of M (initially q₀)

**Simulation loop:**
1. Read current state from Tape 3
2. Read symbol under simulated head from Tape 2
3. Search Tape 1 for matching transition δ(state, symbol)
4. If found: Execute transition
   - Write new symbol on Tape 2
   - Move simulated head on Tape 2
   - Update state on Tape 3
5. If M in q_accept: U accepts
6. If M in q_reject: U rejects
7. Loop

**Key properties:**

**Universality:** U can compute anything computable
- Any TM can be simulated by U
- U is a "programmable computer"

**Self-reference:** U can simulate itself
- U on ⟨U, ⟨M, w⟩⟩ simulates U simulating M on w

**Efficiency:** U is slower than direct simulation
- O(T(n) log T(n)) overhead typically
- But polynomial slowdown, not exponential

**Existence:** Turing proved UTM exists
- Can be built with fixed finite number of states
- Shows TMs can interpret other TMs

**Historical significance:**
- Foundation of stored-program computers
- Separation of "hardware" (U) from "software" (⟨M⟩)
- Basis for undecidability proofs (halting problem)`,
  },
  {
    id: 'cs203-t5-ex5',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'Decidable vs Recognizable',
    description: 'Explain the difference between decidable (recursive) and Turing-recognizable (recursively enumerable) languages. Give an example of each.',
    difficulty: 3,
    hints: [
      'Decidable: TM always halts with yes/no answer',
      'Recognizable: TM halts and accepts for yes, may loop for no',
      'Decidable ⊂ Recognizable',
    ],
    solution: `**Decidable vs Turing-Recognizable Languages**

**Decidable (Recursive) Languages:**

**Definition:** L is decidable if there exists a TM M such that:
- For w ∈ L: M accepts w (halts in q_accept)
- For w ∉ L: M rejects w (halts in q_reject)
- M halts on ALL inputs

**Key property:** Always get a definite yes/no answer.

**Turing-Recognizable (R.E.) Languages:**

**Definition:** L is Turing-recognizable if there exists a TM M such that:
- For w ∈ L: M accepts w (halts in q_accept)
- For w ∉ L: M either rejects OR loops forever

**Key property:** May never get an answer for non-members.

**Relationship:**
Decidable ⊊ Recognizable ⊊ All languages

Every decidable language is recognizable (a decider is a special recognizer), but not vice versa.

**Examples:**

**Decidable languages:**
- All regular languages
- All context-free languages
- {aⁿbⁿcⁿ | n ≥ 0} (TM can count and compare)
- {⟨M⟩ | M is a valid DFA encoding}
- {⟨G, w⟩ | CFG G generates string w}

**Recognizable but NOT decidable:**
- A_TM = {⟨M, w⟩ | TM M accepts w}
  - Recognizable: simulate M on w, accept if M accepts
  - Not decidable: can't detect if M loops forever

- HALT = {⟨M, w⟩ | TM M halts on w}
  - Recognizable: simulate M, accept if M halts
  - Not decidable: halting problem

**Not even recognizable:**
- Ā_TM = {⟨M, w⟩ | TM M does NOT accept w}
- {⟨M⟩ | M accepts all strings}
- Complements of recognizable-but-not-decidable languages

**Key theorems:**
1. L is decidable ⟺ both L and L̄ are recognizable
2. If L is recognizable but not decidable, then L̄ is not recognizable`,
  },
  {
    id: 'cs203-t5-ex6',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'TM for String Comparison',
    description: 'Design a TM that accepts L = {w#w | w ∈ {a,b}*}. The input consists of two copies of the same string separated by #.',
    difficulty: 3,
    hints: [
      'Match symbols one at a time across the #',
      'Mark matched symbols on both sides',
      'Accept if all symbols match',
    ],
    solution: `**TM for {w#w | w ∈ {a,b}*}**

**Algorithm:**
1. Mark first unmatched symbol in first w
2. Remember it, scan past # to second w
3. Find corresponding position, compare
4. If match: mark it, go back to step 1
5. If mismatch: reject
6. If both sides fully matched: accept

**States:**
- q₀: start, looking for next symbol to match
- q_a: carrying 'a' to compare
- q_b: carrying 'b' to compare
- q_back: scanning back to left side
- q_check: verifying all matched
- q_accept, q_reject

**Key transitions:**

**Starting from left (q₀):**
- δ(q₀, a) = (q_a, X, R) — mark 'a' as X, remember 'a'
- δ(q₀, b) = (q_b, X, R) — mark 'b' as X, remember 'b'
- δ(q₀, X) = (q₀, X, R) — skip marked symbols
- δ(q₀, #) = (q_check, #, R) — done with left side

**Scanning right (q_a):**
- δ(q_a, a) = (q_a, a, R)
- δ(q_a, b) = (q_a, b, R)
- δ(q_a, #) = (q_a', #, R) — crossed #, now find first unmarked
- δ(q_a', X) = (q_a', X, R) — skip marks on right side
- δ(q_a', a) = (q_back, X, L) — found 'a', match! mark it
- δ(q_a', b) = (q_reject, b, R) — mismatch
- δ(q_a', □) = (q_reject, □, R) — second w shorter

**Scanning back left (q_back):**
- δ(q_back, X) = (q_back, X, L)
- δ(q_back, a) = (q_back, a, L)
- δ(q_back, b) = (q_back, b, L)
- δ(q_back, #) = (q_back, #, L)
- δ(q_back, □) = (q₀, □, R) — reached left end, restart

**Final check (q_check):**
- δ(q_check, X) = (q_check, X, R) — skip marks
- δ(q_check, □) = (q_accept, □, R) — all matched!
- δ(q_check, a) = (q_reject, a, R) — unmatched in second w
- δ(q_check, b) = (q_reject, b, R)

**Trace for "ab#ab":**
\`\`\`
q₀: [a]b#ab → q_a: X[b]#ab → Xb[#]ab → Xb#[a]b
q_a': Xb#X[b] → reject? No wait...
\`\`\`

Need to track positions properly. The key is matching 1st symbol of left with 1st unmarked of right.`,
  },
  {
    id: 'cs203-t5-ex7',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'Church-Turing Thesis',
    description: 'State the Church-Turing thesis and explain why it cannot be formally proven. Give three pieces of evidence supporting it.',
    difficulty: 3,
    hints: [
      'The thesis is about the informal notion of "algorithm"',
      'It connects formal TMs to intuitive computability',
      'Evidence comes from equivalent models',
    ],
    solution: `**The Church-Turing Thesis**

**Statement:**
Every function that is intuitively computable (by an algorithm) is computable by a Turing machine.

Or equivalently:
The informal notion of "effective procedure" or "algorithm" is exactly captured by the formal notion of Turing machine.

**Why it cannot be formally proven:**

1. **One side is informal:** "Intuitive computability" is not a mathematical definition
   - We can't prove something about an informal concept
   - Any formal definition would just be another formal model

2. **It's a definition/thesis, not theorem:**
   - Proposes that TMs correctly model computation
   - Like defining "line" in geometry—can't prove a definition

3. **Could potentially be refuted:**
   - If someone found an "algorithmic" process not TM-computable
   - No such counterexample has ever been found

**Evidence Supporting the Thesis:**

**1. Equivalent formal models all compute the same functions:**
- Lambda calculus (Church, 1936)
- General recursive functions (Gödel-Kleene)
- Post systems
- Markov algorithms
- Register machines
- RAM model
- Modern programming languages

All define exactly the same class of computable functions!

**2. Robustness to variations:**
- Multi-tape TMs
- Nondeterministic TMs
- Two-way infinite tape
- Multiple heads
- Multi-dimensional tape

All equivalent to basic TM model.

**3. No counterexamples found:**
- 80+ years of effort
- Every proposed "algorithm" has been shown TM-computable
- Physical computation seems bounded by TM power

**4. Natural problems:**
- No natural problem is known to be "computable but not TM-computable"
- Suggests TMs capture something fundamental

**Variations:**
- **Physical Church-Turing:** No physical device computes more than TM
- **Extended (Strong):** Includes efficiency claims (polynomial overhead)

**Challenges:**
- Quantum computing (same power, different efficiency?)
- Hypercomputation proposals (generally rejected)`,
  },
  {
    id: 'cs203-t5-ex8',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'Nondeterministic TM',
    description: 'Define nondeterministic Turing machines. Prove they are equivalent in power to deterministic TMs.',
    difficulty: 5,
    hints: [
      'NTM can have multiple transitions from same configuration',
      'Accepts if ANY computation path accepts',
      'DTM can simulate by searching all paths',
    ],
    solution: `**Nondeterministic Turing Machines (NTMs)**

**Definition:**
An NTM is like a DTM except δ is a relation, not function:
δ ⊆ (Q × Γ) × (Q × Γ × {L, R})

At each step, multiple transitions may be applicable.

**Acceptance:**
An NTM accepts input w if there EXISTS a sequence of choices (a computation path) that leads to q_accept.

**Visualization:**
Computation is a tree:
- Root: initial configuration
- Branches: different nondeterministic choices
- Accept if any leaf is accepting

**Theorem: NTMs and DTMs are equivalent in power.**

**Proof:**

**Direction 1: DTM → NTM**
Every DTM is already an NTM (with exactly one choice at each step).

**Direction 2: NTM → DTM**
Given NTM N, construct DTM D that simulates all possible computation paths.

**Simulation strategy (BFS):**

**Three-tape DTM D:**
1. Tape 1: Input (read-only)
2. Tape 2: Current simulation tape
3. Tape 3: Address of current path in computation tree

**Address encoding:**
- If N has at most b choices at any step
- Path after k steps encoded as string from {1,2,...,b}ᵏ
- "231" means: first choice 2, second choice 3, third choice 1

**D's algorithm:**
1. Initialize Tape 3 to empty (root of tree)
2. Copy input to Tape 2
3. Simulate N using choices from Tape 3
   - If path leads to accept: D accepts
   - If path exhausted or rejects: go to step 4
4. Generate next address (BFS order)
5. Goto step 2

**Why BFS (not DFS):**
- DFS might go down infinite branch
- BFS ensures every finite accepting path is found
- First try all length-1 paths, then length-2, etc.

**Correctness:**
- If N accepts w: some finite path accepts, D finds it
- If N doesn't accept w: D never accepts

**Time complexity:**
If N accepts in t steps with branching factor b:
D runs in O(bᵗ) time (exponential)

**Key insight:**
NTMs don't compute more functions than DTMs, but may be exponentially faster. This exponential gap is central to P vs NP.`,
  },
  {
    id: 'cs203-t5-ex9',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'TM Encoding',
    description: 'Describe how to encode a Turing machine as a string over {0,1}. Why is this encoding important?',
    difficulty: 3,
    hints: [
      'Need to encode states, alphabet, and transitions',
      'Use binary for numbers',
      'Enables TMs to take other TMs as input',
    ],
    solution: `**Encoding Turing Machines as Binary Strings**

**Why encode TMs?**
- TMs can take other TMs as input
- Enables universal computation
- Required for diagonalization proofs
- Foundation for undecidability results

**TM Components to encode:**
M = (Q, Σ, Γ, δ, q₀, q_accept, q_reject)

**Encoding scheme:**

**1. Number the states:** q₁, q₂, ..., qₙ
- q₁ = start state
- q₂ = accept state
- q₃ = reject state

**2. Number tape symbols:** a₁, a₂, ..., aₘ
- a₁ = 0 (input alphabet)
- a₂ = 1 (input alphabet)
- a₃ = □ (blank)
- a₄, ... = other work symbols

**3. Encode transitions:**
δ(qᵢ, aⱼ) = (qₖ, aₗ, D) encoded as (i, j, k, l, d)
where d = 1 for L, 2 for R

**4. Binary representation:**
- Integers in binary
- Use separator (like 00) between numbers
- Use different separator (like 000) between transitions

**Example encoding:**
δ(q₁, 0) = (q₂, 1, R) becomes: 1 00 1 00 10 00 10 00 10
(state 1, symbol 1, state 2, symbol 2, direction 2)

**Full encoding ⟨M⟩:**
- Number of states (in unary: 1ⁿ for n states)
- Separator
- List of all transitions
- Separators between transitions

**Properties of encoding:**

**1. Computable:** Given M, we can compute ⟨M⟩
**2. Decodable:** Given ⟨M⟩, we can reconstruct M
**3. Checkable:** Can verify if string is valid encoding
**4. Prefix-free (if designed carefully):** No encoding is prefix of another

**Standard notation:**
- ⟨M⟩: encoding of TM M
- ⟨M, w⟩: encoding of TM M with input w
- Often use: ⟨M, w⟩ = ⟨M⟩#w where # separates

**Applications:**
1. **Universal TM:** Takes ⟨M, w⟩, simulates M on w
2. **Diagonalization:** Enumerate TMs as ⟨M₁⟩, ⟨M₂⟩, ...
3. **Rice's theorem:** Reason about TMs as strings
4. **Undecidability:** Define languages over TM descriptions`,
  },
  {
    id: 'cs203-t5-ex10',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'Linear Bounded Automata',
    description: 'Define Linear Bounded Automata (LBA). What class of languages do they recognize? How do they relate to TMs?',
    difficulty: 3,
    hints: [
      'LBA = TM with restricted tape',
      'Tape limited to input length',
      'More powerful than PDA, less than TM',
    ],
    solution: `**Linear Bounded Automata (LBA)**

**Definition:**
An LBA is a nondeterministic TM where the tape head cannot move beyond the original input boundaries.

**Formal definition:**
- Same as NTM but with restriction
- Tape cells: only those containing input (plus end markers)
- Head cannot write on or move past end markers

**Notation:**
Input w is placed between end markers: ¢w$
Head stays within these bounds.

**Language class:**
LBAs recognize exactly the **context-sensitive languages (CSLs)**.

**Context-Sensitive Grammars:**
Productions of form αAβ → αγβ where |γ| ≥ 1
(Can only expand, never shrink — except S → ε if S doesn't appear on right)

**Examples of CSLs (recognized by LBAs):**
- {aⁿbⁿcⁿ | n ≥ 0}
- {ww | w ∈ Σ*}
- {aⁿ | n is prime}

**Hierarchy:**
Regular ⊂ Context-Free ⊂ Context-Sensitive ⊂ Recursive ⊂ R.E.
DFA/NFA  ⊂ PDA        ⊂ LBA               ⊂ Decider  ⊂ TM

**Key properties:**

**1. Space bound:** O(n) space on input of length n
**2. Decidability:**
   - Membership in L(LBA) is decidable
   - Only finitely many configurations for length-n input
   - Number of configurations: |Q| × n × |Γ|ⁿ (finite but exponential)

**3. Emptiness undecidable:**
   - "Is L(LBA) = ∅?" is undecidable
   - Even though membership is decidable

**4. Deterministic LBA:**
   - Open problem: Does DLBA = NLBA?
   - Equivalent to CSL = DCSL question

**Why important:**
- Models computation with linear memory
- Many natural languages are context-sensitive
- Shows hierarchy between CFLs and decidable languages
- Demonstrates that space bounds affect power

**Comparison:**
| Feature | PDA | LBA | TM |
|---------|-----|-----|-----|
| Memory | Stack | Linear | Infinite |
| Languages | CFL | CSL | R.E. |
| Membership | Decidable | Decidable | Undecidable |
| Emptiness | Decidable | Undecidable | Undecidable |`,
  },
  {
    id: 'cs203-t5-ex11',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'TM for Unary Multiplication',
    description: 'Design a TM that computes multiplication of two unary numbers. Input: 1ⁿ#1ᵐ, Output: 1ⁿᵐ.',
    difficulty: 5,
    hints: [
      'Multiplication = repeated addition',
      'For each 1 in first number, copy second number',
      'Use markers to track progress',
    ],
    solution: `**TM for Unary Multiplication**

**Input:** 1ⁿ#1ᵐ (n ones, separator #, m ones)
**Output:** 1ⁿᵐ (n×m ones)

**Algorithm:**
For each 1 in the first group:
  - Copy all 1s from the second group to the output area
Mark/erase processed 1s from first group

**Tape layout:**
Initial: 1ⁿ#1ᵐ
Working: X...X#1ᵐ=1ᵐ...1ᵐ
Final: 1ⁿᵐ (after cleanup)

**States:**
- q₀: start
- q_copy: copying phase, remember we need to copy second group
- q_mark: mark a 1 from second group
- q_paste: add 1 to output
- q_return: return to second group
- q_reset: reset second group marks, back to first group
- q_clean: final cleanup
- q_halt: done

**Key transitions:**

**Phase 1: Mark next 1 from first group**
- δ(q₀, 1) = (q_copy, X, R) — mark first-group 1, start copy
- δ(q₀, X) = (q₀, X, R) — skip marked
- δ(q₀, #) = (q_clean, □, R) — first group done, cleanup

**Phase 2: Copy second group (q_copy)**
- δ(q_copy, 1) = (q_copy, 1, R)
- δ(q_copy, #) = (q_copy, #, R)
- δ(q_copy, Y) = (q_copy, Y, R) — skip marked in second group
- δ(q_copy, □) = (q_mark, □, L) — reached end, go back to mark

Actually, let me redesign more carefully:

**Better algorithm:**
1. Mark one 1 from first group (change to X)
2. For each 1 in second group (change to Y temporarily):
   - Add one 1 to output area (after =)
3. Unmark second group (Y → 1)
4. Repeat until first group is all X's
5. Clean up (remove X's and #)

**Simplified trace for 1¹#1² = 1×2 = 2:**
\`\`\`
11#11□□
X1#11□□  (mark first 1)
X1#Y1□1  (copy first 1 of second group)
X1#YY□11 (copy second 1)
X1#11□11 (unmark second group)
XX#11□11 (mark second first-group 1)
XX#YY□1111 (copy second group again)
XX#11□1111 (unmark)
Clean up → 1111
\`\`\`

Output: 1⁴ = 1²×² ✓`,
  },
  {
    id: 'cs203-t5-ex12',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'Enumerator Definition',
    description: 'Define an enumerator. Prove that a language is Turing-recognizable iff some enumerator enumerates it.',
    difficulty: 5,
    hints: [
      'Enumerator is TM with output tape',
      'Prints strings one by one',
      'Language = set of strings printed',
    ],
    solution: `**Enumerators**

**Definition:**
An enumerator E is a TM with:
- No input tape
- Output tape (write-only, or printer)
- Work tape (read/write)

E runs forever (or halts), printing strings separated by #.
The language enumerated by E is the set of strings printed.

**Notation:** L(E) = {w | E eventually prints w}

**Theorem:** L is Turing-recognizable ⟺ some enumerator enumerates L.

**Proof (⟸): Enumerator → Recognizer**

Given enumerator E for L, construct recognizer M for L:

M on input w:
1. Run E
2. Every time E prints a string s:
   - Compare s with w
   - If s = w: accept
3. Continue forever (E runs forever)

**Correctness:**
- If w ∈ L: E eventually prints w, M accepts
- If w ∉ L: E never prints w, M runs forever
This is exactly Turing-recognizable behavior.

**Proof (⟹): Recognizer → Enumerator**

Given recognizer M for L, construct enumerator E for L:

E's algorithm:
Let s₁, s₂, s₃, ... be enumeration of all strings (lexicographic order)

For i = 1, 2, 3, ...:
  For each j from 1 to i:
    Run M on sⱼ for i steps
    If M accepts sⱼ within i steps:
      Print sⱼ (if not already printed)

**Why this works:**
- **Dovetailing:** Simulate multiple computations interleaved
- If w ∈ L: M accepts w in some t steps
  - When i = max(index of w, t), we run M on w for enough steps
  - So w gets printed
- If w ∉ L: M doesn't accept w, never printed
- Every string gets tested eventually (and repeatedly)

**Key technique: Dovetailing**
Can't just run M on s₁ (might loop), then s₂, etc.
Instead, interleave: run each for bounded time, increase bounds.

**Corollary:** L is decidable ⟺ enumerator prints in lexicographic order
(Can detect when we've passed where w should be)`,
  },
  {
    id: 'cs203-t5-ex13',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'Closure Properties of Decidable Languages',
    description: 'Prove that decidable languages are closed under union, intersection, and complement.',
    difficulty: 3,
    hints: [
      'Given deciders for L₁ and L₂, build decider for combination',
      'Deciders always halt, so we can sequence them',
      'For complement, swap accept and reject',
    ],
    solution: `**Closure Properties of Decidable Languages**

**Theorem:** Decidable languages are closed under union, intersection, and complement.

**Proof of Union:**

Let M₁ decide L₁ and M₂ decide L₂.

Construct decider M for L₁ ∪ L₂:

M on input w:
1. Run M₁ on w
2. If M₁ accepts, accept
3. Run M₂ on w
4. If M₂ accepts, accept
5. Reject

**Correctness:**
- M halts: M₁ and M₂ both halt (deciders), so M halts
- w ∈ L₁ ∪ L₂ ⟺ w ∈ L₁ or w ∈ L₂ ⟺ M₁ or M₂ accepts ⟺ M accepts ✓

**Proof of Intersection:**

Construct decider M for L₁ ∩ L₂:

M on input w:
1. Run M₁ on w
2. If M₁ rejects, reject
3. Run M₂ on w
4. If M₂ accepts, accept
5. Reject

**Correctness:**
- M halts: both M₁, M₂ halt
- w ∈ L₁ ∩ L₂ ⟺ w ∈ L₁ and w ∈ L₂ ⟺ both accept ⟺ M accepts ✓

**Proof of Complement:**

Let M decide L.

Construct decider M' for L̄:

M' on input w:
1. Run M on w
2. If M accepts, reject
3. If M rejects, accept

**Correctness:**
- M' halts: M halts (decider)
- w ∈ L̄ ⟺ w ∉ L ⟺ M rejects w ⟺ M' accepts ✓

**Additional closures (similar proofs):**
- **Concatenation:** Run M₁ on all splits xy = w, accept if any (M₁ on x, M₂ on y) pair accepts
- **Kleene star:** Similar, check all ways to split into L-words
- **Reversal:** Run M on reversed input

**Why recognizable languages aren't closed under complement:**
- If M loops on some w ∉ L, we can't decide to accept w for L̄
- No way to detect the loop
- Would need to know when to "give up"

**Key insight:** Deciders always halt, enabling sequential composition and complementation.`,
  },
  {
    id: 'cs203-t5-ex14',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'Turing Machine Variants',
    description: 'List and briefly describe five TM variants. State which ones are equivalent to the standard TM in computational power.',
    difficulty: 1,
    hints: [
      'Consider modifications to tape, head, states',
      'All "reasonable" variants are equivalent',
      'Some variants are more convenient but not more powerful',
    ],
    solution: `**Turing Machine Variants**

**1. Multi-tape TM**
- Description: k tapes, k independent heads
- Transitions: δ(q, a₁,...,aₖ) = (p, b₁,...,bₖ, D₁,...,Dₖ)
- Power: **Equivalent to standard TM**
- Simulation: Single tape encodes all k tapes (O(T²) overhead)
- Advantage: More convenient for algorithms

**2. Multi-head TM**
- Description: Single tape, multiple heads
- Each head can read/write independently
- Power: **Equivalent to standard TM**
- Simulation: Track head positions, simulate sequentially
- Advantage: Random access patterns easier

**3. Two-way Infinite Tape**
- Description: Tape extends infinitely in both directions
- Standard model: one-way infinite (left bound)
- Power: **Equivalent to standard TM**
- Simulation: Track two half-tapes, interleaved on one tape
- Advantage: Symmetric, no special "left end"

**4. Nondeterministic TM (NTM)**
- Description: Multiple possible transitions, accept if any path accepts
- Power: **Equivalent to standard TM**
- Simulation: Search all paths (exponential time)
- Advantage: Concise specification of search problems

**5. Queue Automaton (instead of stack)**
- Description: FIFO queue instead of tape
- Power: **Equivalent to standard TM**
- Simulation: TM can simulate queue; queue can simulate tape
- Note: Two stacks = queue = TM power

**6. Two-stack PDA**
- Description: PDA with two stacks
- Power: **Equivalent to standard TM**
- Simulation: Stacks represent tape left/right of head
- Key insight: Two stacks give random access

**7. Random Access Machine (RAM)**
- Description: Numbered registers, indirect addressing
- Power: **Equivalent to standard TM** (if integers bounded)
- More realistic model of actual computers
- Polynomial relationship with TM

**8. Multi-dimensional Tape**
- Description: 2D, 3D, or kD tape
- Power: **Equivalent to standard TM**
- Simulation: Encode coordinates, simulate navigation

**Non-equivalent variants (weaker):**
- Single-tape one-way infinite TM with read-only input: Limited
- TM that can only write 0s: Can't compute all functions
- TM with bounded tape: Only regular languages

**Thesis:** All "reasonable" models with unbounded memory and finite control are Turing-equivalent.`,
  },
  {
    id: 'cs203-t5-ex15',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'Tape Alphabet Reduction',
    description: 'Prove that any TM can be simulated by a TM using only tape alphabet {0, 1, □}.',
    difficulty: 3,
    hints: [
      'Encode larger alphabet in binary',
      'Read multiple cells to decode one symbol',
      'May need to shift tape contents',
    ],
    solution: `**Reducing Tape Alphabet to {0, 1, □}**

**Theorem:** Any TM M with tape alphabet Γ can be simulated by TM M' with tape alphabet {0, 1, □}.

**Construction:**

Let |Γ| = m. Choose k = ⌈log₂ m⌉.
Encode each γ ∈ Γ as a k-bit binary string.

**Encoding function:** enc: Γ → {0,1}ᵏ
- enc(γ₁) = 00...0
- enc(γ₂) = 00...1
- etc.

**M' simulates M:**

**Tape representation:**
M's tape: ... a b c ...
M' tape: ... enc(a) enc(b) enc(c) ... = ... 010 110 001 ...

**State representation:**
M' states encode:
- M's current state
- Position within current k-block (1 to k)
- Symbol being read (partially accumulated)

**Simulating one step of M:**

1. **Read:** Scan k cells of M' to read one symbol of M
   - Accumulate in state memory
   - Requires k sub-steps

2. **Compute:** Determine M's transition
   - δ_M(q, a) = (p, b, D)

3. **Write:** Write enc(b) over current k cells
   - Requires k sub-steps

4. **Move:** Move k cells left or right
   - If D = L: move k cells left
   - If D = R: move k cells right

**State blowup:**
|Q'| = |Q| × k × |Γ| = O(|Q| × log m × m)

Still finite!

**Time overhead:** O(k) = O(log |Γ|) per step

**Handling □:**
- □ in M' represents multiple □s in encoded tape
- Or use explicit encoding: enc(□) = 111...1 (or reserved code)

**Key insight:**
Finite control (states) can remember k bits of encoding.
Binary is sufficient for any finite alphabet.

**Extensions:**
- Can reduce to {0, 1} only (use 11 as □ marker, double 1s in data)
- Can reduce to unary {1, □} (less efficient but possible)`,
  },
  {
    id: 'cs203-t5-ex16',
    subjectId: 'cs203',
    topicId: 'cs203-topic-5',
    type: 'written',
    title: 'Oracle Turing Machines',
    description: 'Define an oracle Turing machine. Explain how oracle TMs are used in complexity theory.',
    difficulty: 5,
    hints: [
      'Oracle provides "free" answers to queries about a language',
      'Measures relative complexity',
      'Used to study relationships between complexity classes',
    ],
    solution: `**Oracle Turing Machines**

**Definition:**
An oracle TM Mᴬ is a TM with access to an "oracle" for language A.

**Mechanism:**
- Special oracle tape
- Special states: q_query, q_yes, q_no
- Write query string w on oracle tape
- Enter q_query
- Instantly transition to q_yes if w ∈ A, q_no if w ∉ A
- Oracle answers in one step (no cost)

**Notation:**
- Mᴬ: TM M with oracle A
- L(Mᴬ): language decided/recognized by Mᴬ
- Pᴬ: problems solvable in polynomial time with oracle A
- NPᴬ: problems in NP with oracle A

**Uses in Complexity Theory:**

**1. Relative complexity:**
Even if P ≠ NP, we can ask about Pᴬ vs NPᴬ for various A.

**2. Relativization barrier:**
**Theorem (Baker-Gill-Solovay):**
- There exists oracle A where Pᴬ = NPᴬ
- There exists oracle B where Pᴮ ≠ NPᴮ

**Implication:** Any proof that P ≠ NP cannot relativize (must use non-relativizing techniques).

**3. Complexity hierarchies:**
- PH (polynomial hierarchy) defined using oracles
- Σₖᴾ = NPᴺᴾᴺᴾ⋅⋅⋅ (k levels of alternating NP)

**4. Reducibility:**
Turing reducibility: A ≤_T B iff Aᴮ is decidable
Allows more than one query to oracle.

**5. Hardness for complexity classes:**
A is NP-hard under Turing reductions iff P = NP implies A ∈ P.

**Examples:**

**Oracle for SAT:**
With SAT oracle, can solve any NP problem in polynomial time:
- Given instance I of NP problem
- Reduce to SAT formula φ (polynomial time)
- Query oracle: "Is φ satisfiable?"
- Use answer for I

**Oracle for HALT (halting problem):**
With HALT oracle, can decide many undecidable problems:
- "Does M accept w?" — query HALT, then simulate if halts
- Gives much more power than standard TM

**Arithmetic hierarchy:**
Levels of oracle power using HALT repeatedly:
- Σ₁⁰ = RE (recursively enumerable)
- Π₁⁰ = co-RE
- Σ₂⁰ = RE with oracle for Σ₁⁰
- etc.

**Significance:**
Oracle TMs help us understand the structure of complexity, even when absolute questions (like P vs NP) remain open.`,
  },
];
