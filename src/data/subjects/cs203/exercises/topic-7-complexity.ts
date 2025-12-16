import { WrittenExercise } from '../../../../core/types';

export const topic7Exercises: WrittenExercise[] = [
  {
    id: 'cs203-t7-ex1',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'Time Complexity Analysis',
    description: 'Determine the time complexity of a single-tape TM that checks if the input is a palindrome. Show why it requires O(n²) time.',
    difficulty: 3,
    hints: [
      'TM must compare first and last symbols',
      'Each comparison requires traversing the tape',
      'Count the total number of tape head movements',
    ],
    solution: `**Palindrome Recognition on Single-Tape TM**

**Algorithm:**
1. Compare first and last symbols
2. If match, mark both, repeat with remaining string
3. If mismatch, reject
4. Accept when all symbols matched

**Detailed steps per iteration:**
1. Read first unmarked symbol (remember it)
2. Move right to find last unmarked symbol
3. Compare (accept or reject if mismatch)
4. Move left to find first position
5. Mark both symbols
6. Move to next unmarked position

**Analysis:**

For input of length n:

**Round 1:**
- Move right: ~n steps to reach end
- Move left: ~n steps to return
- Total: ~2n steps

**Round 2:**
- Move right: ~(n-2) steps
- Move left: ~(n-2) steps
- Total: ~2(n-2) steps

**Round k (for k ≤ n/2):**
- ~2(n-2k) steps

**Total time:**
T(n) = 2n + 2(n-2) + 2(n-4) + ... + 2·2
     = 2(n + (n-2) + (n-4) + ... + 2)
     = 2 · (n/2 terms) · (n/2) approximately
     = 2 · (n/2) · (n+2)/2
     = **O(n²)**

**More precisely:**
Sum = n + (n-2) + (n-4) + ... ≈ n·(n/2)/2 = n²/4

**Why O(n²) is necessary for single-tape:**

- Must compare position 1 with position n
- Then position 2 with position n-1
- Each comparison needs Ω(n) moves (far apart)
- Ω(n/2) comparisons needed
- Total: Ω(n²)

**Improvement with 2 tapes:**
- Copy input to tape 2 in reverse: O(n)
- Compare tape 1 forward, tape 2 forward: O(n)
- Total: O(n)

**Single-tape palindrome is a classic O(n²) problem!**`,
  },
  {
    id: 'cs203-t7-ex2',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'Polynomial Time Verification',
    description: 'Prove that the HAMILTONIAN-PATH problem is in NP by describing a polynomial-time verifier.',
    difficulty: 3,
    hints: [
      'What certificate would prove a Hamiltonian path exists?',
      'The path itself is a certificate',
      'Verification checks the path is valid',
    ],
    solution: `**HAMILTONIAN-PATH is in NP**

**Problem definition:**
HAMPATH = {⟨G, s, t⟩ | G has a Hamiltonian path from s to t}

A Hamiltonian path visits every vertex exactly once.

**NP membership via verifier:**

To show HAMPATH ∈ NP, we provide a polynomial-time verifier V.

**Certificate:** A sequence of vertices c = (v₁, v₂, ..., vₙ) claiming to be a Hamiltonian path.

**Certificate size:** O(n) where n = |V| (polynomial in input size)

**Verifier V on input ⟨G, s, t, c⟩:**

1. **Check path starts at s:**
   Verify v₁ = s
   Time: O(1)

2. **Check path ends at t:**
   Verify vₙ = t
   Time: O(1)

3. **Check all vertices included:**
   Verify {v₁, v₂, ..., vₙ} = V
   - Check length is n
   - Check no duplicates (sort and scan, or use hash set)
   Time: O(n log n) or O(n) with hashing

4. **Check edges exist:**
   For i = 1 to n-1:
     Verify (vᵢ, vᵢ₊₁) ∈ E
   Time: O(n) checks, each O(degree) or O(1) with adjacency matrix
   Total: O(n²) or O(n)

5. **If all checks pass:** Accept
   **Otherwise:** Reject

**Total verification time:** O(n²) — polynomial! ✓

**Correctness:**

**Completeness:** If ⟨G, s, t⟩ ∈ HAMPATH:
- A Hamiltonian path P = (s, ..., t) exists
- Using P as certificate, V accepts

**Soundness:** If V accepts with certificate c:
- c is a path from s to t (checks 1, 2, 4)
- c visits all vertices exactly once (check 3)
- So c is a Hamiltonian path
- Therefore ⟨G, s, t⟩ ∈ HAMPATH

**Conclusion:** HAMPATH has a polynomial-time verifier, so HAMPATH ∈ NP. ∎`,
  },
  {
    id: 'cs203-t7-ex3',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'Polynomial-Time Reduction',
    description: 'Show that 3-SAT ≤_p CLIQUE by describing the reduction and proving its correctness.',
    difficulty: 5,
    hints: [
      'For each clause, create vertices for each literal',
      'Connect vertices from different clauses if they\'re consistent',
      'A k-clique corresponds to a satisfying assignment',
    ],
    solution: `**Reduction: 3-SAT ≤_p CLIQUE**

**Given:** 3-SAT formula φ with m clauses: C₁ ∧ C₂ ∧ ... ∧ Cₘ
Each clause Cᵢ = (ℓᵢ₁ ∨ ℓᵢ₂ ∨ ℓᵢ₃) has 3 literals.

**Construct:** Graph G = (V, E) and number k

**Construction:**

**Vertices:**
For each clause Cᵢ and each literal ℓᵢⱼ in Cᵢ:
Create vertex vᵢⱼ = (i, ℓᵢⱼ)

So |V| = 3m (3 vertices per clause)

**Edges:**
Connect vᵢⱼ and vₖₗ with an edge if:
1. i ≠ k (different clauses)
2. ℓᵢⱼ and ℓₖₗ are consistent (not x and ¬x)

**Set k = m** (number of clauses)

**Claim:** φ is satisfiable ⟺ G has a clique of size m.

**Proof (⟹): Satisfying assignment → m-clique**

Let τ be a satisfying assignment for φ.

For each clause Cᵢ, at least one literal is true under τ.
Pick one true literal ℓᵢⱼᵢ from each clause.

**Claim:** The vertices {v₁ⱼ₁, v₂ⱼ₂, ..., vₘⱼₘ} form an m-clique.

**Check it's a clique:**
- Has m vertices (one from each clause)
- Any two vertices vᵢⱼᵢ and vₖⱼₖ (i ≠ k) are connected because:
  - Different clauses (i ≠ k) ✓
  - Literals are consistent: both true under τ, so not x and ¬x ✓

**So G has an m-clique. ✓**

**Proof (⟸): m-clique → satisfying assignment**

Let S = {v₁, v₂, ..., vₘ} be an m-clique in G.

**Observation 1:** S has exactly one vertex from each clause.
- S has m vertices, m clauses
- No two clique vertices from same clause (no edges within clause)
- So exactly one from each

**Observation 2:** Literals in S are consistent.
- Any two clique vertices have an edge
- Edges only connect consistent literals
- So no xᵢ and ¬xᵢ both in S

**Build assignment τ:**
- If literal xᵢ appears in S: set xᵢ = TRUE
- If literal ¬xᵢ appears in S: set xᵢ = FALSE
- For unassigned variables: set arbitrarily

**τ is consistent** (by Observation 2).

**τ satisfies φ:**
- Each clause has a vertex in S
- That vertex's literal is true under τ
- So each clause has a true literal ✓

**φ is satisfiable. ✓**

**Polynomial time:**
- Create 3m vertices: O(m)
- Create O(m²) edges: O(m²)
- Total: polynomial

**Conclusion:** 3-SAT ≤_p CLIQUE ∎

Since 3-SAT is NP-complete, CLIQUE is NP-hard.
Since CLIQUE ∈ NP, CLIQUE is NP-complete.`,
  },
  {
    id: 'cs203-t7-ex4',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'P vs NP Implications',
    description: 'Describe three significant implications if P = NP and three implications if P ≠ NP.',
    difficulty: 3,
    hints: [
      'Consider cryptography, optimization, AI',
      'Think about practical and theoretical implications',
      'What would change about problem-solving?',
    ],
    solution: `**Implications of P = NP**

**1. Cryptography collapses:**
- RSA, AES, and most cryptosystems rely on hardness assumptions
- Factoring large numbers becomes easy
- Discrete logarithm becomes easy
- All current encryption would be breakable
- Would need completely new cryptographic paradigms

**2. Optimization becomes tractable:**
- Traveling Salesman: optimal routes found quickly
- Scheduling problems solved efficiently
- Resource allocation optimized perfectly
- Supply chain, logistics, manufacturing revolutionized
- Protein folding potentially solved

**3. Creative/discovery tasks automated:**
- Mathematical theorem proving becomes algorithmic
- Finding proofs as easy as verifying them
- Drug discovery accelerated
- Scientific hypothesis generation automated
- "Creativity" reduced to search

**Additional implications if P = NP:**
- Machine learning: optimal models found directly
- Game playing: perfect strategies computed
- Planning: optimal plans found efficiently

---

**Implications of P ≠ NP**

**1. Cryptography remains secure:**
- One-way functions exist (informally)
- Current encryption schemes remain valid
- Digital signatures, authentication preserved
- E-commerce, banking systems stay secure
- Privacy-preserving computation possible

**2. Fundamental limits on computation:**
- Some problems inherently hard
- No silver bullet for NP-hard problems
- Must use heuristics, approximations
- Validates decades of algorithm research
- Complexity theory has meaningful structure

**3. Creativity/discovery not fully automatable:**
- Finding proofs harder than checking them
- Human insight remains valuable
- AI has fundamental limits
- Scientific discovery requires more than search
- Mathematical creativity is "special"

**Additional implications if P ≠ NP:**
- Approximation algorithms remain necessary
- Parameterized complexity is meaningful
- Average-case vs worst-case distinction matters

---

**The current practical situation:**
- We operate AS IF P ≠ NP
- Security depends on this assumption
- Heuristics and approximations are standard
- No polynomial algorithms found despite decades of effort`,
  },
  {
    id: 'cs203-t7-ex5',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'NP-Complete Problems',
    description: 'List five NP-complete problems from different domains and briefly explain what each problem asks.',
    difficulty: 1,
    hints: [
      'Think of problems from graphs, logic, numbers, scheduling',
      'Each should be a decision problem',
      'Consider why verification is easy',
    ],
    solution: `**Five NP-Complete Problems**

**1. SATISFIABILITY (SAT) — Logic**

**Input:** Boolean formula φ in CNF
**Question:** Is there an assignment to variables making φ true?

**Example:** φ = (x ∨ y) ∧ (¬x ∨ z) ∧ (¬y ∨ ¬z)
**Certificate:** Assignment (x=T, y=F, z=T)

First problem proven NP-complete (Cook-Levin, 1971).

---

**2. VERTEX COVER — Graphs**

**Input:** Graph G = (V, E), integer k
**Question:** Is there a set S ⊆ V with |S| ≤ k such that every edge has at least one endpoint in S?

**Example:** Find 3 vertices covering all edges
**Certificate:** The k vertices

Applications: network security, facility location.

---

**3. SUBSET SUM — Numbers**

**Input:** Set of integers S = {s₁, ..., sₙ}, target t
**Question:** Is there a subset T ⊆ S such that Σᵢ∈T sᵢ = t?

**Example:** S = {3, 7, 1, 8, 4}, t = 11
**Certificate:** Subset {3, 8} or {7, 4}

Related to knapsack, partition problems.

---

**4. HAMILTONIAN CYCLE — Graphs**

**Input:** Graph G = (V, E)
**Question:** Is there a cycle visiting every vertex exactly once?

**Example:** Find tour through all cities returning to start
**Certificate:** The cycle as sequence of vertices

Basis for Traveling Salesman Problem.

---

**5. GRAPH COLORING — Graphs**

**Input:** Graph G = (V, E), integer k
**Question:** Can G be colored with k colors so no adjacent vertices share a color?

**Example:** 3-coloring a map
**Certificate:** Color assignment to each vertex

Applications: scheduling, register allocation.

---

**Additional notable NP-complete problems:**
- **3-SAT:** SAT with exactly 3 literals per clause
- **CLIQUE:** Does G have a clique of size k?
- **INDEPENDENT SET:** Does G have k pairwise non-adjacent vertices?
- **SET COVER:** Cover universe with k sets?
- **INTEGER PROGRAMMING:** Feasible integer solution exists?

**Common features:**
- Easy to verify (given solution)
- Hard to find (no known polynomial algorithm)
- All equivalent under polynomial reductions`,
  },
  {
    id: 'cs203-t7-ex6',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'Space Complexity Classes',
    description: 'Define L, NL, PSPACE, and NPSPACE. State Savitch\'s theorem and explain its significance.',
    difficulty: 3,
    hints: [
      'L and NL use logarithmic space',
      'PSPACE uses polynomial space',
      'Savitch\'s theorem relates deterministic and nondeterministic space',
    ],
    solution: `**Space Complexity Classes**

**L (Deterministic Log Space):**
L = SPACE(log n)

Languages decidable by a DTM using O(log n) work tape space (input tape is read-only).

**Examples in L:**
- PATH in undirected graphs (Reingold, 2004)
- Palindrome checking (with read-only input)
- Evaluating Boolean formulas

**Key constraint:** Can only store O(log n) bits — just enough to hold a constant number of pointers into the input.

---

**NL (Nondeterministic Log Space):**
NL = NSPACE(log n)

Languages decidable by an NTM using O(log n) space.

**Examples in NL:**
- PATH (directed s-t connectivity) — NL-complete
- 2-SAT
- Reachability in graphs

---

**PSPACE (Polynomial Space):**
PSPACE = ⋃_k SPACE(n^k)

Languages decidable with polynomial space.

**Examples in PSPACE:**
- TQBF (True Quantified Boolean Formulas) — PSPACE-complete
- Generalized games (chess, Go on n×n board)
- Regular expression equivalence

---

**NPSPACE (Nondeterministic Polynomial Space):**
NPSPACE = ⋃_k NSPACE(n^k)

Languages decidable by NTM with polynomial space.

---

**Savitch's Theorem:**

**Theorem:** NSPACE(f(n)) ⊆ SPACE(f(n)²) for f(n) ≥ log n

**In particular:** NPSPACE = PSPACE

Nondeterminism gives at most a square blowup in space!

**Proof idea:**
Convert NTM reachability to deterministic reachability via divide-and-conquer.

To check if configuration C₁ can reach C₂ in ≤ t steps:
- Guess midpoint configuration Cₘ
- Recursively check C₁ → Cₘ in ≤ t/2 steps
- Recursively check Cₘ → C₂ in ≤ t/2 steps

**Space:** Recursion depth O(log t), each level stores O(f(n)) for configuration.
Total: O(f(n) · log t) = O(f(n)²) since t ≤ 2^O(f(n))

---

**Significance of Savitch's Theorem:**

1. **PSPACE = NPSPACE:**
   Unlike time (where P vs NP is open), nondeterminism doesn't significantly help for space.

2. **Space vs Time:**
   Space is "reusable" — can explore nondeterministic paths sequentially, reusing space.

3. **Complexity hierarchy:**
   L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE = NPSPACE ⊆ EXPTIME

4. **Contrasts with time:**
   - NP ⊆ PSPACE (guess and verify uses space, not just time)
   - If NP = PSPACE, likely P = NP (but not proven)`,
  },
  {
    id: 'cs203-t7-ex7',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'Cook-Levin Theorem',
    description: 'State the Cook-Levin theorem and explain the key idea of the proof (without full details).',
    difficulty: 5,
    hints: [
      'SAT is the first NP-complete problem',
      'Any NP verifier can be encoded as a SAT instance',
      'Use Boolean variables to represent computation',
    ],
    solution: `**The Cook-Levin Theorem**

**Theorem (Cook 1971, Levin 1973):**
SAT is NP-complete.

**What this means:**
1. SAT ∈ NP (satisfying assignments can be verified in polynomial time)
2. Every language L ∈ NP is polynomial-time reducible to SAT

**Significance:**
- First NP-complete problem ever identified
- All other NP-completeness proofs reduce from SAT (or its descendants)
- Shows logic (SAT) captures computational hardness

---

**Proof Idea:**

**Part 1: SAT ∈ NP**
Given formula φ and assignment τ:
- Substitute τ into φ
- Evaluate: O(|φ|) time
- Accept if φ evaluates to TRUE

**Part 2: Every NP language reduces to SAT**

Let L ∈ NP with polynomial-time verifier V.
V accepts (w, c) iff w ∈ L for some certificate c of length p(|w|).

**Key insight:** V's computation can be encoded as a Boolean formula.

**The encoding:**

**Variables represent:**
- Tape cell contents at each time step
- Head position at each time step
- State at each time step
- Certificate bits

For input w of length n, V runs in time T = poly(n).

Create variables:
- x_{i,j,t} = "cell i contains symbol j at time t"
- h_{i,t} = "head is at position i at time t"
- q_{s,t} = "machine is in state s at time t"
- c_i = "certificate bit i"

**Formula φ_w encodes:**

1. **Initial configuration:**
   - Input w on tape
   - Head at start
   - Initial state

2. **Valid computation:**
   - At most one symbol per cell
   - Exactly one state, one head position per time
   - Transitions follow V's transition function

3. **Acceptance:**
   - Final state is accepting

**Construction is polynomial:**
- O(T²) variables (time × space)
- O(T²) clauses for transition constraints
- All generated in polynomial time

**Correctness:**
- φ_w satisfiable ⟺ ∃ certificate c such that V(w,c) accepts ⟺ w ∈ L

---

**Key techniques in the proof:**

1. **Tableau method:**
   Represent computation as a T × T table.
   Rows = time steps, columns = tape cells.

2. **Local checking:**
   Transitions affect only local cells.
   Constraint for each "window" of adjacent cells.

3. **CNF construction:**
   Convert arbitrary Boolean constraints to CNF.
   At most polynomial blowup.

**Result:**
For any w, can construct φ_w in polynomial time.
w ∈ L ⟺ φ_w ∈ SAT

Therefore L ≤_p SAT for all L ∈ NP. ∎`,
  },
  {
    id: 'cs203-t7-ex8',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'coNP and NP ∩ coNP',
    description: 'Define coNP and give examples. Discuss what it means for a problem to be in NP ∩ coNP.',
    difficulty: 3,
    hints: [
      'coNP = complements of NP languages',
      'Short proofs of NO instances',
      'NP ∩ coNP: short proofs for both YES and NO',
    ],
    solution: `**coNP and NP ∩ coNP**

**Definition of coNP:**
coNP = {L | L̄ ∈ NP}

Languages whose complements are in NP.

**Equivalently:**
L ∈ coNP iff for w ∉ L, there exists a polynomial-size proof that w ∉ L.

---

**Examples in coNP:**

**1. TAUTOLOGY**
Input: Boolean formula φ
Question: Is φ true under ALL assignments?

- In coNP: If φ is NOT a tautology, a falsifying assignment proves it
- Certificate: Assignment making φ false
- Complement of SAT

**2. UNSAT (Unsatisfiability)**
Input: Boolean formula φ
Question: Is φ unsatisfiable?

- In coNP: Complement of SAT (which is in NP)
- Certificate for NO: satisfying assignment

**3. PRIMES (before 2002)**
Input: Integer n
Question: Is n prime?

- Was known to be in NP ∩ coNP
- Primality certificate (Pratt certificate)
- Now known to be in P (AKS algorithm)

---

**NP ∩ coNP:**

**Meaning:**
L ∈ NP ∩ coNP iff both L and L̄ have polynomial-time verifiers.

- YES instances have short proofs
- NO instances have short proofs

**Why interesting:**
- Seems "almost decidable"
- If NP ≠ coNP, then P ≠ NP
- Many natural problems are in NP ∩ coNP

**Examples in NP ∩ coNP:**

**1. Primality**
- In NP: Pratt certificates
- In coNP: Factor as proof of compositeness
- Now known: in P

**2. Factoring (decision version)**
"Does n have a factor in [a, b]?"
- In NP: Factor is certificate
- In coNP: Complete factorization shows no factor in range
- Not known to be in P (basis of RSA)

**3. Linear Programming (feasibility)**
- In P (Karmarkar's algorithm)
- So also in NP ∩ coNP

---

**Key question: NP = coNP?**

If SAT ∈ coNP:
- UNSAT would have short proofs
- Could prove "no satisfying assignment exists" briefly
- Seems unlikely (no known such proofs)

**Belief:** NP ≠ coNP

**Implications:**
- If NP ≠ coNP: P ≠ NP (since P = coP)
- NP-complete problems are not in coNP (unless NP = coNP)

**Hierarchy:**
P ⊆ NP ∩ coNP ⊆ NP ∪ coNP ⊆ PSPACE

**Open:** Is (NP ∩ coNP) = P?`,
  },
  {
    id: 'cs203-t7-ex9',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'Hierarchy Theorems',
    description: 'State the Time Hierarchy Theorem and explain its significance for complexity theory.',
    difficulty: 5,
    hints: [
      'More time allows solving strictly more problems',
      'Based on diagonalization',
      'Separates complexity classes',
    ],
    solution: `**The Time Hierarchy Theorem**

**Theorem (Hartmanis-Stearns, 1965):**
If f, g are time-constructible functions with f(n) = o(g(n)/log g(n)), then:

TIME(f(n)) ⊊ TIME(g(n))

**Simplified version:**
For any time-constructible f(n):

TIME(f(n)) ⊊ TIME(f(n)²)

More time means strictly more computational power.

---

**Meaning:**
- TIME(n) ⊊ TIME(n²) ⊊ TIME(n³) ⊊ ...
- P ⊊ EXPTIME (can separate by large enough gap)
- There is a strict hierarchy of time complexity

---

**Proof Idea (Diagonalization):**

Construct a language L that:
1. Can be decided in O(g(n)) time
2. Cannot be decided in O(f(n)) time

**Construction of L:**
L = {⟨M, w⟩ | M rejects ⟨M, w⟩ within f(|⟨M, w⟩|) steps}

**L differs from every f(n)-time TM:**
- Enumerate all TMs: M₁, M₂, ...
- For each Mᵢ, the string ⟨Mᵢ, 0ᵏ⟩ for appropriate k
- Mᵢ on ⟨Mᵢ, 0ᵏ⟩ has behavior X
- L does opposite of X on this input

**Key technical points:**
- Need time to simulate Mᵢ → requires g(n) >> f(n)
- log factor accounts for simulation overhead
- Time-constructibility ensures we can count steps

---

**Corollary: P ⊊ EXPTIME**

P = ∪_k TIME(nᵏ)
EXPTIME = ∪_k TIME(2^(nᵏ))

2^n grows faster than any polynomial.
By hierarchy theorem: TIME(nᵏ) ⊊ TIME(2^n) for all k.

So P ⊊ EXPTIME.

**This is a proven separation!**

---

**Space Hierarchy Theorem:**

**Theorem:** For space-constructible f:
SPACE(f(n)) ⊊ SPACE(f(n) · log f(n))

Even tighter than time hierarchy (log factor vs. square).

**Corollary:** L ⊊ PSPACE

---

**Significance:**

**1. Proves real separations exist:**
Unlike P vs NP (open), we know P ≠ EXPTIME and L ≠ PSPACE.

**2. Validates complexity measures:**
Time and space genuinely measure difficulty — more resources enable solving more problems.

**3. Methodology limitation:**
Diagonalization proves P ≠ EXPTIME but cannot separate P from NP (relativization barrier).

**4. Shows hierarchy is "proper":**
No collapse at any level (given sufficient gap).

**Open questions:**
- Does TIME(n) ⊊ TIME(n·log n)? (Unknown!)
- P vs NP requires non-diagonalization techniques`,
  },
  {
    id: 'cs203-t7-ex10',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'PSPACE-Completeness',
    description: 'Prove that TQBF (True Quantified Boolean Formulas) is PSPACE-complete.',
    difficulty: 5,
    hints: [
      'TQBF is QBF with answer TRUE',
      'Show TQBF ∈ PSPACE via recursive algorithm',
      'For hardness, encode PSPACE computation',
    ],
    solution: `**TQBF is PSPACE-Complete**

**Problem: TQBF (True Quantified Boolean Formulas)**

**Input:** Quantified Boolean formula ψ = Q₁x₁ Q₂x₂ ... Qₙxₙ φ(x₁,...,xₙ)
where Qᵢ ∈ {∀, ∃} and φ is quantifier-free.

**Question:** Is ψ true?

**Example:**
∀x ∃y ((x ∨ y) ∧ (¬x ∨ ¬y))
Answer: TRUE (for any x, can find y making formula true)

---

**Theorem:** TQBF is PSPACE-complete.

**Part 1: TQBF ∈ PSPACE**

**Recursive algorithm:**

TQBF(ψ):
  If ψ is quantifier-free: evaluate and return
  If ψ = ∃x φ: return TQBF(φ[x:=0]) OR TQBF(φ[x:=1])
  If ψ = ∀x φ: return TQBF(φ[x:=0]) AND TQBF(φ[x:=1])

**Space analysis:**
- Recursion depth: n (number of variables)
- Each level stores O(1) information
- Formula size doesn't grow (substitution is immediate)
- Total space: O(n) = O(|ψ|) = polynomial

**TQBF ∈ PSPACE ✓**

---

**Part 2: TQBF is PSPACE-hard**

Show: For every L ∈ PSPACE, L ≤_p TQBF.

**Approach:** Encode PSPACE TM computation as QBF.

Let M be a PSPACE machine for L, using space s(n) = poly(n).

**Key insight:** Computation is reachability in configuration graph.
- Configurations: O(2^s(n)) possible
- M accepts w iff start config reaches accept config

**Encoding configurations:**
Configuration C is a string of s(n) bits.
Can encode as Boolean variables.

**Encoding reachability:**

Let R(C₁, C₂, t) = "C₂ reachable from C₁ in ≤ t steps"

**Base case (t = 1):**
R(C₁, C₂, 1) encodes: C₂ follows from C₁ in one transition (or C₁ = C₂)
This is polynomial-size formula.

**Recursive case:**
R(C₁, C₂, 2t) = ∃Cₘ [R(C₁, Cₘ, t) ∧ R(Cₘ, C₂, t)]

**Problem:** Formula size doubles each level → exponential.

**Savitch-style fix using ∀:**
R(C₁, C₂, 2t) = ∃Cₘ ∀(C₃, C₄) ∈ {(C₁,Cₘ), (Cₘ,C₂)} : R(C₃, C₄, t)

**Better notation:**
R(C₁, C₂, 2t) = ∃Cₘ ∀D₁ ∀D₂ [ ((D₁,D₂)=(C₁,Cₘ) ∨ (D₁,D₂)=(Cₘ,C₂)) → R(D₁, D₂, t) ]

**This adds only O(s(n)) variables per level.**

**Final formula:**
ψ_w = R(C_start, C_accept, 2^s(n))

**Size:** O(s(n)²) = polynomial
**Levels of recursion:** O(s(n)) (halving each time)

**Correctness:**
ψ_w is true ⟺ M accepts w ⟺ w ∈ L

**Conclusion:**
L ≤_p TQBF for all L ∈ PSPACE.
TQBF is PSPACE-hard. ∎

**TQBF is PSPACE-complete. ∎**`,
  },
  {
    id: 'cs203-t7-ex11',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'NL-Completeness',
    description: 'Define NL-completeness and log-space reductions. Prove that PATH (directed s-t connectivity) is NL-complete.',
    difficulty: 5,
    hints: [
      'NL-complete under log-space reductions',
      'PATH in NL: guess path one vertex at a time',
      'Hardness: encode NTM configurations as vertices',
    ],
    solution: `**NL-Completeness**

**Definition:**
A language L is **NL-complete** if:
1. L ∈ NL
2. For every A ∈ NL: A ≤_L L (log-space reduction)

**Log-space reduction:**
f is a log-space reduction if:
- f is computable in O(log n) space
- w ∈ A ⟺ f(w) ∈ B

**Key properties:**
- Log-space ⊆ polynomial-time (so log-space reducible implies poly-time reducible)
- Composition of log-space reductions is log-space

---

**PATH (Directed s-t Connectivity)**

**Input:** Directed graph G = (V, E), vertices s, t
**Question:** Is there a directed path from s to t in G?

**Theorem:** PATH is NL-complete.

**Part 1: PATH ∈ NL**

**NTM algorithm:**
\`\`\`
current := s
for i := 1 to |V|:
    if current = t: accept
    nondeterministically guess next vertex v
    if (current, v) ∈ E:
        current := v
    else: reject
reject
\`\`\`

**Space analysis:**
- Store current vertex: O(log |V|)
- Store counter i: O(log |V|)
- Total: O(log n)

**Correctness:**
- If path exists: some nondeterministic branch follows it
- If no path: all branches reject

**PATH ∈ NL ✓**

---

**Part 2: PATH is NL-hard**

**Show:** For every L ∈ NL, L ≤_L PATH.

**Construction:**
Given NL machine M for L and input w:

Build graph G_w where vertices represent configurations of M on w.

**Vertices:**
- Each configuration C = (state, head position, work tape contents)
- Work tape uses O(log n) space
- Number of configurations: poly(n) (still representable)

**Edges:**
(C₁, C₂) ∈ E iff M can transition from C₁ to C₂ (possibly nondeterministically)

**Special vertices:**
- s = initial configuration
- t = accepting configuration (or add new t with edges from all accepting configs)

**Claim:** w ∈ L ⟺ there is a path from s to t in G_w

**Proof:**
- w ∈ L ⟺ some computation path of M accepts
- ⟺ some sequence of configurations leads to acceptance
- ⟺ path exists in G_w from s to t

**Log-space constructibility:**
- Can output edges one at a time
- For each pair of configurations, check if transition is valid
- This requires only O(log n) space

**Conclusion:**
L ≤_L PATH for all L ∈ NL.
PATH is NL-hard. ∎

**PATH is NL-complete. ∎**

---

**Important corollary: NL = coNL**

**Immerman-Szelepcsényi Theorem (1988):**
NL = coNL

Nondeterministic log-space is closed under complement!

This means: We can decide if there is NO path from s to t in NL.

**Proof idea:** Count reachable vertices at each distance, verify count, then check t is not reachable.`,
  },
  {
    id: 'cs203-t7-ex12',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'Approximation and NP-Hardness',
    description: 'Explain how NP-hardness affects our approach to optimization problems. Give an example of an approximation algorithm.',
    difficulty: 3,
    hints: [
      'Can\'t find optimal in polynomial time (unless P=NP)',
      'Approximation gives near-optimal with guarantees',
      'Vertex cover has a 2-approximation',
    ],
    solution: `**Approximation Algorithms for NP-Hard Problems**

**The Challenge:**
NP-hard optimization problems likely have no polynomial-time algorithms for finding optimal solutions (unless P = NP).

**Practical response:**
Instead of optimal, find solutions that are provably close to optimal.

**Approximation ratio:**
For minimization problem:
- Algorithm A has ratio ρ if: A(I) ≤ ρ · OPT(I) for all instances I

For maximization:
- A(I) ≥ OPT(I) / ρ

**ρ = 1 means optimal; ρ = 2 means within factor 2.**

---

**Example: Vertex Cover 2-Approximation**

**Problem:** Find minimum vertex cover (vertices covering all edges).

**Greedy algorithm:**
\`\`\`
C := empty set
while edges remain:
    pick any edge (u, v)
    add both u and v to C
    remove all edges incident to u or v
return C
\`\`\`

**Analysis:**

**Claim:** This gives a 2-approximation.

**Proof:**
Let M = edges picked by algorithm.
M is a matching (no two edges share a vertex).

**Observation 1:** |C| = 2|M|

**Observation 2:** Any vertex cover must include at least one endpoint of each edge in M (since M is matching).

So OPT ≥ |M|.

**Therefore:** |C| = 2|M| ≤ 2·OPT

**Approximation ratio = 2. ✓**

---

**Approximation Classes:**

**APX:** Problems with constant-factor approximation
- Vertex Cover ∈ APX (factor 2)
- MAX-SAT ∈ APX (factor 2)

**PTAS (Polynomial-Time Approximation Scheme):**
For any ε > 0, achieves (1+ε)-approximation in polynomial time (in n, not ε).

- Euclidean TSP has PTAS
- Knapsack has PTAS

**FPTAS (Fully PTAS):**
Polynomial in both n and 1/ε.
- Knapsack has FPTAS

---

**Hardness of Approximation:**

Some problems are hard to approximate within any constant!

**Examples:**
- **TSP (general):** No constant-factor approximation unless P = NP
- **SET COVER:** No (1-ε)ln n approximation unless P = NP
- **CLIQUE:** No n^(1-ε) approximation unless P = NP

**PCP Theorem (1992):**
Proves many inapproximability results.
Connects proof complexity to approximation.

---

**Summary:**

| Problem | Best Known Approximation | Inapproximability |
|---------|-------------------------|-------------------|
| Vertex Cover | 2 | < 1.36 unless P=NP |
| Metric TSP | 1.5 (Christofides) | < 1 + ε for small ε |
| General TSP | None | Any constant |
| MAX-3SAT | 7/8 | > 7/8 unless P=NP |

NP-hardness forces us to accept approximate solutions, and complexity theory tells us how close we can get.`,
  },
  {
    id: 'cs203-t7-ex13',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'Polynomial Hierarchy',
    description: 'Define the Polynomial Hierarchy (PH). Explain what Σₖᴾ and Πₖᴾ represent.',
    difficulty: 5,
    hints: [
      'Built using alternating quantifiers/oracle access',
      'Σ₁ᴾ = NP, Π₁ᴾ = coNP',
      'Each level adds one more quantifier alternation',
    ],
    solution: `**The Polynomial Hierarchy (PH)**

**Motivation:**
Some problems seem "beyond" NP but still tractable compared to PSPACE.

**Definition via quantifiers:**

**Σₖᴾ** = languages L where:
w ∈ L ⟺ ∃y₁ ∀y₂ ∃y₃ ... Qₖyₖ R(w, y₁, ..., yₖ)

where |yᵢ| ≤ poly(|w|), R is polynomial-time computable, and Qₖ = ∃ if k odd, ∀ if k even.

**Πₖᴾ** = languages L where:
w ∈ L ⟺ ∀y₁ ∃y₂ ∀y₃ ... Qₖyₖ R(w, y₁, ..., yₖ)

with Qₖ = ∀ if k odd, ∃ if k even.

---

**Base cases:**

**Σ₀ᴾ = Π₀ᴾ = P**

**Σ₁ᴾ = NP**
w ∈ L ⟺ ∃y R(w, y) — one existential quantifier

**Π₁ᴾ = coNP**
w ∈ L ⟺ ∀y R(w, y) — one universal quantifier

---

**Higher levels:**

**Σ₂ᴾ:**
w ∈ L ⟺ ∃y ∀z R(w, y, z)

**Example:** "Does formula φ have a satisfying assignment that remains satisfying even if we flip any one variable?"

**Π₂ᴾ:**
w ∈ L ⟺ ∀y ∃z R(w, y, z)

**Example:** "Is every clause of formula φ satisfiable individually?"

---

**Definition via oracles:**

**Σₖ₊₁ᴾ = NPᴾᵢₖ** (NP with Σₖ oracle)
**Πₖ₊₁ᴾ = coNPᴾᵢₖ**

This gives same classes (provably equivalent definitions).

---

**The hierarchy:**

\`\`\`
        PH
       /   \\
     Σ₃ᴾ   Π₃ᴾ
    /   \\ /   \\
  Σ₂ᴾ    Δ₃ᴾ   Π₂ᴾ
 /   \\  / \\  /   \\
NP    Δ₂ᴾ   coNP
  \\   /   \\   /
    P
\`\`\`

Where Δₖᴾ = Σₖ₋₁ᴾ ∩ Πₖ₋₁ᴾ and PH = ⋃ₖ Σₖᴾ

---

**Key properties:**

**1. Containments:**
Σₖᴾ ⊆ Σₖ₊₁ᴾ ∩ Πₖ₊₁ᴾ
Πₖᴾ ⊆ Σₖ₊₁ᴾ ∩ Πₖ₊₁ᴾ

**2. Complements:**
Σₖᴾ = co-Πₖᴾ

**3. PH ⊆ PSPACE:**
TQBF captures all of PH and is in PSPACE.

**4. Collapse:**
If Σₖᴾ = Πₖᴾ for some k, then PH = Σₖᴾ (hierarchy collapses).

---

**Significance:**

**1. Captures "bounded alternation":**
Natural problems at each level.

**2. P = NP implies PH = P:**
Strongest evidence against P = NP.

**3. Separations unknown:**
We don't know if Σₖᴾ ≠ Πₖᴾ for any k > 0.

**4. Complete problems exist:**
Σₖᴾ-complete and Πₖᴾ-complete problems known for all k.

**Example Σ₂ᴾ-complete:**
∃∀-SAT: ∃x ∀y φ(x, y) — does setting for x make formula true for all y?`,
  },
  {
    id: 'cs203-t7-ex14',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'Complexity of Games',
    description: 'Explain why many two-player games are PSPACE-complete. Use generalized geography as an example.',
    difficulty: 5,
    hints: [
      'Games involve alternating moves (∀ and ∃)',
      'Asking "can player 1 win?" involves quantifier alternation',
      'PSPACE captures polynomial-space alternating computation',
    ],
    solution: `**PSPACE-Completeness of Two-Player Games**

**Why games are hard:**

Two-player games naturally involve alternating quantifiers:
- "Player 1 can win" = ∃ move for P1 such that ∀ responses by P2, ∃ move for P1, ...

This structure matches TQBF (which is PSPACE-complete).

---

**Generalized Geography**

**Game rules:**
- Graph G with designated start vertex s
- Players alternate choosing edges
- Must follow an outgoing edge from current vertex
- Cannot revisit vertices
- Player who cannot move loses

**Decision problem:**
GG = {⟨G, s⟩ | Player 1 has winning strategy starting from s}

**Theorem:** Generalized Geography is PSPACE-complete.

---

**Proof: GG ∈ PSPACE**

**Recursive algorithm:**
\`\`\`
wins(G, v, visited):
    if no unvisited neighbors: return LOSE (current player loses)
    for each unvisited neighbor u of v:
        if wins(G, u, visited ∪ {v}) == LOSE:
            return WIN (found winning move)
    return LOSE (all moves lead to opponent winning)
\`\`\`

**Space analysis:**
- Recursion depth: at most |V| (each vertex visited once)
- Each level stores: current vertex, visited set bitmap
- Total: O(|V|) space = polynomial

**GG ∈ PSPACE ✓**

---

**Proof: GG is PSPACE-hard**

**Reduce from TQBF:**

Given QBF ψ = Q₁x₁ Q₂x₂ ... Qₙxₙ φ

Construct geography graph G:

**Structure:**
1. **Variable gadgets:** For each variable xᵢ
   - Diamond shape: choice of TRUE or FALSE
   - If ∃xᵢ: current player chooses
   - If ∀xᵢ: opponent chooses

2. **Clause gadgets:** For each clause in φ
   - Can be reached if clause is satisfiable under choices

3. **Connecting structure:**
   - Chain through variables in order
   - After variables, check if formula satisfied

**Key insight:**
- Player 1 controls ∃ variables
- Player 2 controls ∀ variables
- Player 1 wins iff ψ is TRUE

**Polynomial construction:** O(|ψ|) vertices

**GG is PSPACE-hard. ∎**

---

**Other PSPACE-complete games:**

**1. Generalized Chess**
Playing optimal chess on n×n board.
- Polynomial-length games (50-move rule generalized)
- Alternating moves
- PSPACE-complete (or EXPTIME for some variants)

**2. Generalized Checkers**
Similar analysis, PSPACE-complete.

**3. Go**
Generalized Go is EXPTIME-complete (longer games possible).

**4. Hex**
Determining winner from position is PSPACE-complete.

**5. Reversi/Othello**
PSPACE-complete.

---

**The pattern:**
- Polynomial-length games → PSPACE
- Exponential-length games → EXPTIME
- Alternating moves → quantifier alternation
- Perfect information → deterministic evaluation

**PSPACE captures "polynomial-turn games."**`,
  },
  {
    id: 'cs203-t7-ex15',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'TIME vs SPACE',
    description: 'Prove that TIME(f(n)) ⊆ SPACE(f(n)) and SPACE(f(n)) ⊆ TIME(2^O(f(n))). Discuss what these relationships imply.',
    difficulty: 3,
    hints: [
      'Time bounds space linearly',
      'Space bounds time exponentially (via configurations)',
      'These give P ⊆ PSPACE and L ⊆ P',
    ],
    solution: `**Time-Space Relationships**

**Theorem 1: TIME(f(n)) ⊆ SPACE(f(n))**

**Proof:**

Let M be a TM running in time f(n).

In f(n) steps, M can visit at most f(n) tape cells.
(Head moves at most 1 cell per step)

Therefore M uses at most f(n) space.

So L(M) ∈ SPACE(f(n)). ∎

**Intuition:** You can't use more space than you have time to write.

---

**Theorem 2: SPACE(f(n)) ⊆ TIME(2^O(f(n)))** (for f(n) ≥ log n)

**Proof:**

Let M be a TM using space f(n).

**Count configurations:**

A configuration consists of:
- State: |Q| choices
- Head position: f(n) choices
- Tape contents: |Γ|^f(n) choices

Total configurations: |Q| × f(n) × |Γ|^f(n) = 2^O(f(n))

**Key observation:**
If M halts, it must halt within 2^O(f(n)) steps.

**Why?**
- If M repeats a configuration, it loops forever
- So halting computation visits each configuration at most once
- At most 2^O(f(n)) configurations exist
- Therefore halts in at most 2^O(f(n)) steps

**Running time:** 2^O(f(n))

So SPACE(f(n)) ⊆ TIME(2^O(f(n))). ∎

---

**Implications:**

**1. P ⊆ PSPACE:**

TIME(n^k) ⊆ SPACE(n^k) (by Theorem 1)

So P = ∪_k TIME(n^k) ⊆ ∪_k SPACE(n^k) = PSPACE ✓

**2. L ⊆ P:**

SPACE(log n) ⊆ TIME(2^O(log n)) = TIME(n^O(1)) = P (by Theorem 2)

So L ⊆ P ✓

**3. PSPACE ⊆ EXPTIME:**

SPACE(n^k) ⊆ TIME(2^O(n^k)) ⊆ TIME(2^n^(k+1)) (by Theorem 2)

So PSPACE ⊆ EXPTIME ✓

---

**The complexity landscape:**

L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE = NPSPACE ⊆ EXPTIME

**Known separations:**
- L ⊊ PSPACE (by space hierarchy)
- P ⊊ EXPTIME (by time hierarchy)

**Unknown:**
- L vs P
- P vs NP
- NP vs PSPACE

---

**Open question:**

Is SPACE(n) ⊂ TIME(n²)?

We know: SPACE(n) ⊆ TIME(2^O(n))
But can we do better?

**Conjecture:** Space is "more powerful" than time.
Intuition: Space is reusable, time is not.

The exact relationship between linear space and polynomial time remains open!`,
  },
  {
    id: 'cs203-t7-ex16',
    subjectId: 'cs203',
    topicId: 'cs203-topic-7',
    type: 'written',
    title: 'Barriers to P vs NP',
    description: 'Describe the three main barriers (relativization, natural proofs, algebrization) that prevent current techniques from resolving P vs NP.',
    difficulty: 5,
    hints: [
      'Each barrier shows a technique that works for some oracle but fails for others',
      'Relativization: diagonalization fails',
      'Natural proofs: combinatorial methods fail',
    ],
    solution: `**Barriers to Resolving P vs NP**

**Why is P vs NP so hard to settle?**

Three major barriers show that standard proof techniques cannot work.

---

**1. Relativization Barrier (Baker-Gill-Solovay, 1975)**

**Theorem:**
- There exists an oracle A such that P^A = NP^A
- There exists an oracle B such that P^B ≠ NP^B

**Implication:**
Any proof technique that "relativizes" (works the same with any oracle) cannot settle P vs NP.

**What relativizes:**
- Diagonalization
- Simulation arguments
- Most "standard" complexity proofs

**The hierarchy theorems relativize**, which is why they don't separate P from NP.

**To prove P ≠ NP, we need non-relativizing techniques.**

---

**2. Natural Proofs Barrier (Razborov-Rudich, 1997)**

**Setup:**
Many circuit lower bound proofs follow a pattern:
1. Find a "property" P that random functions have
2. Show functions in the target class don't have property P
3. Conclude lower bound

**Theorem:**
If one-way functions exist (a cryptographic assumption), then "natural proofs" cannot prove super-polynomial circuit lower bounds for NP.

**Why:**
- If P is natural, it can distinguish "hard" functions from random
- But one-way functions are hard AND look random
- So natural property P can't exist (contradicts one-way functions)

**Implication:**
If we believe cryptography is possible, our standard combinatorial techniques for circuit lower bounds won't work for NP.

**Many known lower bounds (for restricted circuits) use natural proofs.**

---

**3. Algebrization Barrier (Aaronson-Wigderson, 2008)**

**Extends relativization:**
Considers oracles where we also have access to a "low-degree extension" of the oracle.

**Theorem:**
There exist algebrizing oracles A, B such that:
- P^A = NP^A (with low-degree extensions)
- P^B ≠ NP^B (with low-degree extensions)

**Implication:**
Algebraic techniques (arithmetization, used in IP=PSPACE) also cannot settle P vs NP.

**Many "sophisticated" techniques algebrize:**
- Interactive proofs
- PCPs
- Algebraic proof systems

---

**What does this mean?**

**All three barriers say:**
"Standard techniques, even sophisticated ones, won't resolve P vs NP."

**A proof of P ≠ NP must:**
1. Not relativize (use oracle-specific properties)
2. Not be natural (avoid distinguishers for hard functions)
3. Not algebrize (go beyond arithmetic circuits)

**Current research directions:**
- **Geometric Complexity Theory:** Uses algebraic geometry
- **Circuit complexity for explicit functions:** Beyond natural proofs
- **Proof complexity:** Lower bounds on proof systems

---

**Summary:**

| Barrier | Year | Blocks |
|---------|------|--------|
| Relativization | 1975 | Diagonalization |
| Natural Proofs | 1997 | Combinatorial circuit lower bounds |
| Algebrization | 2008 | Algebraic/interactive techniques |

**The barriers don't say P = NP or P ≠ NP; they say our current tools are insufficient.**

Any resolution requires genuinely new ideas!`,
  },
];
