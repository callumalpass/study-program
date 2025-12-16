import { WrittenExercise } from '../../../../core/types';

export const topic6Exercises: WrittenExercise[] = [
  {
    id: 'cs203-t6-ex1',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'The Halting Problem',
    description: 'State the halting problem and prove it is undecidable using diagonalization.',
    difficulty: 5,
    hints: [
      'Assume a halting decider H exists',
      'Build a machine D that uses H to contradict itself',
      'Consider what happens when D runs on its own encoding',
    ],
    solution: `**The Halting Problem**

**Definition:**
HALT_TM = {⟨M, w⟩ | TM M halts on input w}

**Theorem:** HALT_TM is undecidable.

**Proof by diagonalization:**

Assume for contradiction that HALT_TM is decidable.
Then there exists a decider H where:
- H(⟨M, w⟩) = accept if M halts on w
- H(⟨M, w⟩) = reject if M doesn't halt on w

**Construct machine D:**

D on input ⟨M⟩:
1. Run H on ⟨M, ⟨M⟩⟩
2. If H accepts (M halts on ⟨M⟩):
   Loop forever
3. If H rejects (M doesn't halt on ⟨M⟩):
   Halt (accept)

**Consider D on input ⟨D⟩:**

**Case 1:** Suppose D halts on ⟨D⟩
- Then H(⟨D, ⟨D⟩⟩) accepts (since D halts on ⟨D⟩)
- So D goes to step 2 and loops forever
- Contradiction: D doesn't halt on ⟨D⟩

**Case 2:** Suppose D doesn't halt on ⟨D⟩
- Then H(⟨D, ⟨D⟩⟩) rejects (since D doesn't halt)
- So D goes to step 3 and halts
- Contradiction: D does halt on ⟨D⟩

**Both cases lead to contradiction.**

Therefore, our assumption that H exists is false.
HALT_TM is undecidable. ∎

**Key insight:** Self-reference creates the paradox
- D "asks" about its own behavior
- Then does the opposite
- Like the liar's paradox: "This statement is false"

**Corollary:** A_TM = {⟨M, w⟩ | M accepts w} is also undecidable
(Similar proof, or reduce from HALT)`,
  },
  {
    id: 'cs203-t6-ex2',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Mapping Reductions',
    description: 'Define mapping reduction (≤_m) and prove that if A ≤_m B and B is decidable, then A is decidable.',
    difficulty: 3,
    hints: [
      'A ≤_m B means there is a computable function f where w ∈ A iff f(w) ∈ B',
      'f transforms A-instances to B-instances',
      'Use the decider for B to decide A',
    ],
    solution: `**Mapping Reductions**

**Definition:**
A **mapping reduction** from A to B (written A ≤_m B) is a computable function f: Σ* → Σ* such that:

∀w: w ∈ A ⟺ f(w) ∈ B

**Intuition:**
- f transforms any instance of A into an instance of B
- The answer is preserved: YES ↔ YES, NO ↔ NO
- f is computable (there's a TM computing it)

**Theorem:** If A ≤_m B and B is decidable, then A is decidable.

**Proof:**

Given:
- f is the computable reduction from A to B
- M_B is a decider for B

Construct decider M_A for A:

M_A on input w:
1. Compute f(w)
2. Run M_B on f(w)
3. Output what M_B outputs

**Correctness:**
- f is computable, so step 1 terminates
- M_B is a decider, so step 2 terminates
- M_A accepts w ⟺ M_B accepts f(w) ⟺ f(w) ∈ B ⟺ w ∈ A ✓

**M_A decides A. ∎**

**Contrapositive (more often used):**
If A ≤_m B and A is undecidable, then B is undecidable.

This is how we prove new undecidability results:
1. Show known undecidable A reduces to B
2. Conclude B is undecidable

**Example:** Reducing HALT to A_TM

Define f(⟨M, w⟩) = ⟨M', w⟩ where M':
- On input x: Run M on w; if M halts, accept

Then:
⟨M, w⟩ ∈ HALT ⟺ M halts on w ⟺ M' accepts w ⟺ ⟨M', w⟩ ∈ A_TM

So HALT ≤_m A_TM. Since HALT is undecidable, A_TM is undecidable.

**Properties of ≤_m:**
- Reflexive: A ≤_m A (use identity function)
- Transitive: A ≤_m B and B ≤_m C implies A ≤_m C
- Not symmetric: A ≤_m B does not imply B ≤_m A`,
  },
  {
    id: 'cs203-t6-ex3',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Rice\'s Theorem',
    description: 'State Rice\'s theorem and use it to prove that "Does TM M accept any string?" is undecidable.',
    difficulty: 5,
    hints: [
      'Rice\'s theorem is about semantic properties of languages',
      'Non-trivial means some TMs have the property, some don\'t',
      'The property "L(M) ≠ ∅" is semantic and non-trivial',
    ],
    solution: `**Rice's Theorem**

**Statement:**
Let P be a property of Turing-recognizable languages (not TMs themselves).
If P is **non-trivial** (some TMs have it, some don't), then the problem:

"Does L(M) satisfy P?"

is undecidable.

**Formal statement:**
Let P be a set of Turing-recognizable languages (P ⊂ RE).
If P ≠ ∅ and P ≠ RE, then:
L_P = {⟨M⟩ | L(M) ∈ P} is undecidable.

**Application: "Does M accept any string?"**

**The property:** P = {L | L ≠ ∅} (non-empty languages)

**Is P non-trivial?**
- Some TMs recognize non-empty languages: L = {a} ∈ P ✓
- Some TMs recognize empty languages: L = ∅ ∉ P ✓
- P is non-trivial ✓

**Is P semantic?**
- P depends only on L(M), not on M's structure
- Two different TMs with L(M₁) = L(M₂) give same answer ✓

**By Rice's theorem:**
E_TM = {⟨M⟩ | L(M) = ∅} is undecidable.
Equivalently, NE_TM = {⟨M⟩ | L(M) ≠ ∅} is undecidable. ∎

**Proof of Rice's theorem (sketch):**

Reduce from A_TM.

Given ⟨M, w⟩, construct M' such that:
- If M accepts w: L(M') ∈ P
- If M doesn't accept w: L(M') ∉ P

Construction of M' depends on P:
- Let M_P be a TM with L(M_P) ∈ P (exists since P non-empty)
- Let M_∅ be a TM with L(M_∅) ∉ P (exists since P ≠ RE)

M' on input x:
1. Run M on w (may loop)
2. If M accepts w, simulate M_P on x

Then:
- M accepts w ⟹ L(M') = L(M_P) ∈ P
- M doesn't accept w ⟹ L(M') = ∅ or subset, arrange ∉ P

**More examples using Rice's theorem:**
- "Is L(M) regular?" — undecidable
- "Is L(M) = Σ*?" — undecidable
- "Is L(M) finite?" — undecidable
- "Does M accept string w?" — NOT Rice (depends on specific w, not just property of L(M))`,
  },
  {
    id: 'cs203-t6-ex4',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Decidability of DFA Problems',
    description: 'Prove that the following problems are decidable for DFAs: (a) emptiness, (b) membership, (c) equivalence.',
    difficulty: 3,
    hints: [
      'DFAs have finite state structure',
      'Emptiness: is any accepting state reachable?',
      'Equivalence: use symmetric difference',
    ],
    solution: `**Decidability of DFA Problems**

**(a) DFA Emptiness: E_DFA = {⟨M⟩ | L(M) = ∅}**

**Algorithm:**
1. Mark the start state
2. Repeat: mark any state reachable from a marked state
3. Accept if no accepting state is marked
4. Reject if some accepting state is marked

**Correctness:**
- L(M) = ∅ ⟺ no accepting state is reachable from start
- BFS/DFS finds all reachable states in O(|Q| × |Σ|) time

**Decidable in polynomial time. ✓**

**(b) DFA Membership: A_DFA = {⟨M, w⟩ | M accepts w}**

**Algorithm:**
1. Simulate M on input w
2. Process one symbol at a time: q := δ(q, aᵢ)
3. Accept if final state is in F
4. Reject otherwise

**Correctness:**
- DFA is deterministic, so simulation is straightforward
- Exactly |w| transitions
- Time: O(|w|)

**Decidable in linear time. ✓**

**(c) DFA Equivalence: EQ_DFA = {⟨M₁, M₂⟩ | L(M₁) = L(M₂)}**

**Algorithm using symmetric difference:**

L(M₁) = L(M₂) ⟺ L(M₁) △ L(M₂) = ∅

where △ is symmetric difference:
L₁ △ L₂ = (L₁ ∩ L̄₂) ∪ (L̄₁ ∩ L₂)

**Steps:**
1. Construct DFA for L̄₁ (complement of M₁)
2. Construct DFA for L̄₂ (complement of M₂)
3. Construct DFA for L₁ ∩ L̄₂ (product construction)
4. Construct DFA for L̄₁ ∩ L₂ (product construction)
5. Construct DFA for (L₁ ∩ L̄₂) ∪ (L̄₁ ∩ L₂)
6. Test if this DFA accepts empty language

**Correctness:**
- Each step preserves regularity
- Final DFA accepts L₁ △ L₂
- L₁ = L₂ ⟺ symmetric difference is empty

**Complexity:** O(|Q₁| × |Q₂|) states in product DFAs

**Decidable in polynomial time. ✓**

**Alternative for equivalence:**
Minimize both DFAs, check if isomorphic.
Minimization: O(n log n), isomorphism check: O(n)

**Summary:**
| Problem | Decidable? | Complexity |
|---------|------------|------------|
| E_DFA | Yes | O(n) |
| A_DFA | Yes | O(|w|) |
| EQ_DFA | Yes | O(n²) |`,
  },
  {
    id: 'cs203-t6-ex5',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Undecidability of TM Emptiness',
    description: 'Prove that E_TM = {⟨M⟩ | L(M) = ∅} is undecidable by reducing from A_TM.',
    difficulty: 5,
    hints: [
      'Given A_TM instance ⟨M, w⟩, construct M\' where emptiness depends on whether M accepts w',
      'M\' should accept some string iff M accepts w',
      'Use the reduction to show E_TM is undecidable',
    ],
    solution: `**Proving E_TM is Undecidable**

**Claim:** E_TM = {⟨M⟩ | L(M) = ∅} is undecidable.

**Proof by reduction from A_TM:**

We show A_TM ≤_m Ē_TM (complement of E_TM).
Then since A_TM is undecidable, Ē_TM is undecidable, hence E_TM is undecidable.

Actually, let's reduce A_TM to Ē_TM directly:

**Reduction:**
Given input ⟨M, w⟩ (instance of A_TM), construct TM M':

M' on input x:
1. Ignore x
2. Run M on w
3. If M accepts, accept
4. (If M rejects or loops, M' doesn't accept x)

**Computing the reduction:**
Output ⟨M'⟩

**Correctness:**

**Case: M accepts w**
- M' reaches step 3 and accepts (for any x)
- L(M') = Σ* ≠ ∅
- ⟨M'⟩ ∈ Ē_TM

**Case: M does not accept w**
- M either rejects or loops forever in step 2
- M' never accepts any x
- L(M') = ∅
- ⟨M'⟩ ∉ Ē_TM (equivalently, ⟨M'⟩ ∈ E_TM)

**Summary:**
⟨M, w⟩ ∈ A_TM ⟺ L(M') ≠ ∅ ⟺ ⟨M'⟩ ∈ Ē_TM

**Conclusion:**
A_TM ≤_m Ē_TM
Since A_TM is undecidable, Ē_TM is undecidable.
Therefore E_TM is undecidable (complement of undecidable is undecidable for recognizable languages, and we can show E_TM is co-recognizable).

Actually, more directly:
If E_TM were decidable, then Ē_TM would be decidable.
But A_TM ≤_m Ē_TM and A_TM is undecidable.
So Ē_TM is undecidable, hence E_TM is undecidable. ∎

**Note:** This also shows E_TM is not Turing-recognizable (it's co-RE but not RE).`,
  },
  {
    id: 'cs203-t6-ex6',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Complement and Recognizability',
    description: 'Prove: L is decidable if and only if both L and L̄ are Turing-recognizable.',
    difficulty: 3,
    hints: [
      'For →: a decider recognizes L, and its complement recognizes L̄',
      'For ←: run both recognizers in parallel (dovetailing)',
      'One must accept, giving a decision',
    ],
    solution: `**Theorem:** L is decidable ⟺ both L and L̄ are Turing-recognizable.

**Proof of (⟹):**
Assume L is decidable via decider M.

**L is recognizable:**
M itself recognizes L (deciders are recognizers).

**L̄ is recognizable:**
Construct M' from M by swapping accept and reject.
M' recognizes L̄.

**Proof of (⟸):**
Assume:
- M₁ recognizes L
- M₂ recognizes L̄

**Construct decider D for L:**

D on input w:
1. Run M₁ and M₂ in parallel on w
   (Alternate: 1 step of M₁, 1 step of M₂, repeat)
2. If M₁ accepts, accept
3. If M₂ accepts, reject

**Correctness:**

For any w, exactly one of the following holds:
- w ∈ L (so M₁ will eventually accept)
- w ∈ L̄ (so M₂ will eventually accept)

Since one must eventually accept, D always halts.

**D accepts w ⟺ M₁ accepts w ⟺ w ∈ L ✓**

**D is a decider for L. ∎**

**Corollary:**
If L is recognizable but not decidable, then L̄ is not recognizable.

**Proof:**
If L̄ were recognizable, then by the theorem, L would be decidable.
But L is not decidable.
So L̄ is not recognizable. ∎

**Example:**
- A_TM is recognizable (simulate M on w, accept if accepts)
- Ā_TM is NOT recognizable
- Therefore A_TM is not decidable

**The technique of running in parallel is called "dovetailing."**

It ensures we don't get stuck waiting on one machine that loops forever.`,
  },
  {
    id: 'cs203-t6-ex7',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Self-Reference and Recursion Theorem',
    description: 'State the Recursion theorem for TMs. Explain why it implies that self-printing programs exist.',
    difficulty: 5,
    hints: [
      'The recursion theorem lets TMs "know" their own description',
      'A TM can compute with ⟨M⟩ where M is itself',
      'This enables quines (self-printing programs)',
    ],
    solution: `**The Recursion Theorem**

**Statement:**
For any computable function t: Σ* → Σ*, there exists a TM R such that:
R is equivalent to the TM t(⟨R⟩)

In other words: R can compute using its own description ⟨R⟩.

**Alternative formulation:**
For any TM T, there exists a TM R such that:
R(w) = T(⟨R⟩, w) for all w

R behaves like T, but with access to its own code ⟨R⟩.

**Proof sketch (Kleene's trick):**

Let T be a TM that computes t.

Build R in two parts: R = A ∘ B

**Part A:**
On input w:
1. Obtain description ⟨B⟩ (hardcoded)
2. Compute ⟨A ∘ B⟩ = ⟨R⟩
3. Run T on ⟨R⟩ to get t(⟨R⟩)
4. Simulate t(⟨R⟩) on original input

**Part B:**
Contains the code of A, allowing A to reconstruct ⟨R⟩.

The construction is self-referential but well-defined.

**Application: Quines (Self-Printing Programs)**

**Goal:** Build TM Q that prints ⟨Q⟩.

**Using recursion theorem:**
Let T be a TM that, given ⟨M⟩ and w, outputs ⟨M⟩.
T(⟨M⟩, w) = ⟨M⟩

By recursion theorem, there exists Q such that:
Q(w) = T(⟨Q⟩, w) = ⟨Q⟩

**Q prints its own description! ∎**

**Direct construction of a quine:**

Quine structure: Print-A Print-B

Part A: Print "Print-B" then print Part-B
Part B: Contains encoded representation of Part-A

When run:
1. A prints "Print-B" (literal text)
2. A prints B's contents (which encode A)
3. Result: "Print-A Print-B" = the whole program

**Other applications of recursion theorem:**
1. Proving undecidability (self-referential constructions)
2. Computer viruses (self-copying programs)
3. Fixed-point theorems in computability
4. Proof that certain problems have no algorithm

**Example undecidability proof using recursion theorem:**

Claim: {⟨M⟩ | M accepts ⟨M⟩} is undecidable.

Proof: Suppose decider D exists.
By recursion theorem, build M that on any input:
1. Obtains ⟨M⟩
2. Runs D on ⟨M⟩
3. Does opposite of D's answer

This M contradicts D. So D doesn't exist. ∎`,
  },
  {
    id: 'cs203-t6-ex8',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Post Correspondence Problem',
    description: 'Define the Post Correspondence Problem (PCP). Prove it is undecidable.',
    difficulty: 5,
    hints: [
      'PCP is about matching sequences of dominoes',
      'Reduce from a known undecidable problem',
      'Can encode TM computations as domino sequences',
    ],
    solution: `**Post Correspondence Problem (PCP)**

**Definition:**
Given a set of "dominoes" (pairs of strings):
{[t₁/b₁], [t₂/b₂], ..., [tₖ/bₖ]}

where tᵢ is the "top" string and bᵢ is the "bottom" string.

**Question:** Is there a sequence i₁, i₂, ..., iₙ (repeats allowed) such that:
t_{i₁}t_{i₂}...t_{iₙ} = b_{i₁}b_{i₂}...b_{iₙ}

(Concatenation of tops equals concatenation of bottoms)

**Example:**
Dominoes: {[a/ab], [b/ca], [ca/a], [abc/c]}

Match: [a/ab][b/ca][ca/a][a/ab][abc/c]
Tops: a·b·ca·a·abc = abcaaabc
Bottoms: ab·ca·a·ab·c = abcaaabc ✓

**Theorem:** PCP is undecidable.

**Proof (reduction from A_TM):**

Given TM M and input w, construct PCP instance that has a match iff M accepts w.

**Key idea:** Dominoes encode computation history of M on w.
A match corresponds to a valid accepting computation.

**Construction outline:**

**1. Starting domino:**
Top: #
Bottom: #q₀w#

Forces the match to begin with initial configuration.

**2. Transition dominoes:**
For each transition δ(q, a) = (r, b, R):
Top: qa
Bottom: br

This allows the match to extend with valid transitions.

**3. Copying dominoes:**
For each symbol a:
Top: a
Bottom: a

Copies tape symbols not at head position.

**4. Configuration separator:**
Top: #
Bottom: #

Separates configurations.

**5. Accepting dominoes:**
When accept state appears, special dominoes to "finish" the match.

**Why it works:**
- Match starts with #⟨initial config⟩#
- Each step extends with valid transition
- If M accepts, match can be completed
- If M doesn't accept, no valid match exists

**Technical details:**
The construction ensures that any match must encode a valid computation of M on w, ending in accept.

**Conclusion:**
A_TM ≤_m PCP
Since A_TM is undecidable, PCP is undecidable. ∎

**MPCP (Modified PCP):**
MPCP requires starting with a specific first domino.
Often reduce to MPCP first, then to PCP.

**Applications:**
PCP undecidability implies many string/grammar problems are undecidable:
- CFG ambiguity
- Grammar equivalence
- Other pattern matching problems`,
  },
  {
    id: 'cs203-t6-ex9',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Decidability of CFG Problems',
    description: 'Determine the decidability status of these CFG problems: (a) membership, (b) emptiness, (c) finiteness. Provide algorithms or prove undecidability.',
    difficulty: 3,
    hints: [
      'CFG membership: CYK algorithm works',
      'Emptiness: check if start symbol is useful',
      'Finiteness: look for cycles in grammar graph',
    ],
    solution: `**Decidability of CFG Problems**

**(a) CFG Membership: A_CFG = {⟨G, w⟩ | w ∈ L(G)}**

**Decidable!**

**Algorithm (CYK):**
1. Convert G to Chomsky Normal Form
2. Apply CYK dynamic programming algorithm
3. Accept if start symbol can derive w

**CYK Algorithm:**
- Build table T[i,j] = {A | A derives substring wᵢ...wⱼ}
- Base: T[i,i] = {A | A → wᵢ}
- Induction: A ∈ T[i,j] if A → BC and B ∈ T[i,k], C ∈ T[k+1,j]
- Accept if S ∈ T[1,n]

**Complexity:** O(n³ × |G|)

**Decidable in polynomial time. ✓**

**(b) CFG Emptiness: E_CFG = {⟨G⟩ | L(G) = ∅}**

**Decidable!**

**Algorithm:**
1. Mark all terminals as "generating"
2. Repeat: mark variable A as generating if A → α where all symbols in α are generating
3. Accept (L(G) = ∅) if S is not marked generating

**Correctness:**
- A is generating ⟺ A derives some terminal string
- L(G) ≠ ∅ ⟺ S is generating

**Complexity:** O(|G|)

**Decidable in linear time. ✓**

**(c) CFG Finiteness: FINITE_CFG = {⟨G⟩ | L(G) is finite}**

**Decidable!**

**Algorithm:**
1. Remove useless symbols and productions
2. Build "dependency graph" of useful variables
3. L(G) is infinite ⟺ graph has a cycle

**Dependency graph:**
- Nodes: useful variables
- Edge A → B if production A → αBβ exists

**Correctness:**
- Cycle means unbounded recursion, generating infinite language
- No cycle means bounded derivation depth, finite language

**Complexity:** O(|G|) for graph construction and cycle detection

**Decidable in linear time. ✓**

**Summary:**
| Problem | Decidable? | Complexity |
|---------|------------|------------|
| A_CFG | Yes | O(n³) |
| E_CFG | Yes | O(|G|) |
| FINITE_CFG | Yes | O(|G|) |

**Contrast with TM problems:**
All three are undecidable for TMs!

**Undecidable CFG problems (for reference):**
- Ambiguity: Is G ambiguous?
- Equivalence: L(G₁) = L(G₂)?
- Universality: L(G) = Σ*?`,
  },
  {
    id: 'cs203-t6-ex10',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'The Diagonalization Method',
    description: 'Explain the diagonalization technique and how it\'s used to prove undecidability. Compare it to Cantor\'s diagonal argument.',
    difficulty: 3,
    hints: [
      'Enumerate all TMs and all strings',
      'Build a "table" of acceptance',
      'Construct something that differs from every row',
    ],
    solution: `**The Diagonalization Method**

**Origin: Cantor's Diagonal Argument (1891)**

**Cantor's proof that reals are uncountable:**
1. Assume reals in [0,1] are countable: r₁, r₂, r₃, ...
2. Write decimal expansions:
   r₁ = 0.d₁₁d₁₂d₁₃...
   r₂ = 0.d₂₁d₂₂d₂₃...
   r₃ = 0.d₃₁d₃₂d₃₃...
   ...
3. Construct x = 0.x₁x₂x₃... where xᵢ ≠ dᵢᵢ
4. x differs from each rᵢ in the iᵗʰ position
5. x is not in the list — contradiction!

**Turing's Application to Computability (1936)**

**Setup:**
- Enumerate all TMs: M₁, M₂, M₃, ...
- Enumerate all strings: w₁, w₂, w₃, ...
- Build "acceptance table":

|     | w₁ | w₂ | w₃ | ... |
|-----|----|----|----|----- |
| M₁  | 0  | 1  | 0  | ... |
| M₂  | 1  | 1  | 0  | ... |
| M₃  | 0  | 0  | 1  | ... |
| ... | ...| ...| ...| ... |

Entry (i,j) = 1 if Mᵢ accepts wⱼ, else 0.

**Diagonal language:**
D = {wᵢ | Mᵢ does not accept wᵢ}
  = {wᵢ | entry (i,i) = 0}

**Claim:** D is not Turing-recognizable.

**Proof:**
Suppose TM Mₖ recognizes D.
Consider wₖ:
- If wₖ ∈ D: Then Mₖ accepts wₖ, so wₖ ∉ D (by definition of D)
- If wₖ ∉ D: Then Mₖ doesn't accept wₖ, so wₖ ∈ D (by definition of D)

Contradiction! So no such Mₖ exists. ∎

**Halting problem proof uses similar structure:**
Instead of D, define D_halt = {⟨M⟩ | M doesn't halt on ⟨M⟩}
Assuming HALT is decidable lets us build a TM that contradicts itself.

**Key insight:**
Self-reference creates paradox:
- M is asked about its own behavior on its own description
- M then does the opposite
- This is impossible

**Diagonalization template:**
1. Assume problem is decidable/recognizable
2. Use assumption to build "diagonal" object
3. Show diagonal differs from every possibility
4. Contradiction!

**Power and limitations:**
- Very powerful technique for undecidability
- But: relativization shows limits (can't separate P vs NP)`,
  },
  {
    id: 'cs203-t6-ex11',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Computation Histories',
    description: 'Define computation history of a TM. Explain how encoding computation histories enables undecidability proofs.',
    difficulty: 3,
    hints: [
      'History is sequence of configurations',
      'Can be encoded as a string',
      'Checking validity is local/decidable',
    ],
    solution: `**Computation Histories**

**Definition:**
A **computation history** of TM M on input w is a sequence of configurations:
C₁, C₂, C₃, ..., Cₖ

where:
- C₁ is the starting configuration (q₀, w, start position)
- Each Cᵢ₊₁ follows from Cᵢ by M's transition function
- Cₖ is a halting configuration (accept or reject)

**Encoding:**
Encode each configuration as a string (state, tape contents, head position).
Separate configurations with delimiter (e.g., #).

H = #C₁#C₂#...#Cₖ#

**Properties of computation histories:**

**1. Length bounded by time:**
If M runs in t steps, history has t+1 configurations.

**2. Local validity checking:**
To verify H is valid:
- Check C₁ is correct starting configuration
- For each consecutive pair (Cᵢ, Cᵢ₊₁): check transition is valid
- Check Cₖ is halting

Each local check is decidable! (Just examine finite symbols)

**3. Acceptingness checkable:**
H is accepting if final configuration is in accept state.

**Why histories enable undecidability proofs:**

**Key insight:** Many problems reduce to "Does a valid accepting history exist?"

**Example: A_TM**
⟨M, w⟩ ∈ A_TM ⟺ ∃ accepting computation history of M on w

**Technique for reduction:**

To reduce A_TM to problem P:
1. Given ⟨M, w⟩, construct an instance I_P of P
2. Design I_P so: I_P is a YES-instance ⟺ accepting history exists
3. Use local structure of histories in the construction

**Applications:**

**PCP undecidability:**
Construct dominoes that "build" computation histories.
Match exists ⟺ valid accepting history exists.

**CFG problems:**
Encode history-checking in grammar productions.
E.g., ALL_CFG = {⟨G⟩ | L(G) = Σ*} is undecidable:
- Encode histories as strings
- Accepting histories ∉ L(G) iff some symbol wrong
- L(G) = Σ* iff no accepting history exists iff M doesn't accept

**Linear Bounded Automata:**
LBA computation histories are polynomially bounded.
Many PSPACE-complete problems involve LBA history existence.

**Summary:**
Computation histories provide:
- Formal representation of computation
- Decidable local validity
- Existential quantification reduces to search/matching
- Bridge between TM problems and other formalisms`,
  },
  {
    id: 'cs203-t6-ex12',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Busy Beaver Function',
    description: 'Define the Busy Beaver function BB(n). Explain why it is not computable.',
    difficulty: 5,
    hints: [
      'BB(n) = max steps among halting n-state TMs',
      'If BB were computable, we could solve halting problem',
      'BB grows faster than any computable function',
    ],
    solution: `**The Busy Beaver Function**

**Definition:**
BB(n) = maximum number of 1s that an n-state TM can write on a blank tape before halting.

**Variant (Σ):**
Σ(n) = max 1s written by halting n-state TM
S(n) = max steps taken by halting n-state TM

**Known values:**
- BB(1) = 1
- BB(2) = 4
- BB(3) = 6
- BB(4) = 13
- BB(5) ≥ 4098 (current lower bound)
- BB(6) ≥ 10^18267 (!)

**Theorem:** BB(n) is not computable.

**Proof:**

Assume BB is computable (there's a TM computing BB).

**Build halting decider H:**

H on input ⟨M⟩ (encoding of n-state TM M):
1. Compute BB(n) — we assumed this is possible
2. Simulate M for BB(n) steps
3. If M halts within BB(n) steps: report "halts"
4. Otherwise: report "doesn't halt"

**Correctness:**
If M halts, it does so within BB(n) steps (by definition of BB).
So H correctly determines halting.

**But the halting problem is undecidable!**
Contradiction.

Therefore BB is not computable. ∎

**Growth rate:**
BB grows faster than any computable function!

**Proof:**
Let f be any computable function.
Then there's a TM M_f computing f with some fixed number of states c.

For n > c: an n-state machine can:
1. Compute f(n) (using c states for M_f)
2. Write f(n) ones
3. Halt

So BB(n) ≥ f(n) for large n.
Since f was arbitrary computable function, BB eventually dominates it.

**Implications:**

1. **Non-computability:** Can't program BB calculator

2. **Independence:** For large n, BB(n)'s value is independent of ZFC set theory
   - Can't prove exact value within standard math

3. **Complexity explosion:** Shows how quickly complexity grows with TM size

4. **Gödel incompleteness connection:**
   - BB values encode unprovable statements
   - ZFC can't prove BB(n) for all n

**Fun fact:**
A 5-state TM can simulate Rule 110 (universal cellular automaton), so BB(5) involves universal computation.

**Open problems:**
- Exact value of BB(5) unknown
- Many "busy beaver candidates" remain unresolved`,
  },
  {
    id: 'cs203-t6-ex13',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Recursively Enumerable Sets',
    description: 'Prove that a set is recursively enumerable (Turing-recognizable) iff it is the range of a partial computable function.',
    difficulty: 5,
    hints: [
      'RE sets can be enumerated by a TM',
      'The TM output gives the range',
      'Conversely, given range of f, can recognize membership',
    ],
    solution: `**Recursively Enumerable Sets and Partial Computable Functions**

**Theorem:** S ⊆ ℕ is recursively enumerable ⟺ S = range(f) for some partial computable function f.

**Note:** A set of strings is RE iff it corresponds to an RE set of natural numbers under standard encoding.

**Proof of (⟹): RE set → Range of partial computable function**

Let M be a TM recognizing S.

Define partial function f: ℕ → ℕ by:
f(n) = output of running M on the n-th string, if M accepts

**How f is computed:**
1. Decode n to get string wₙ
2. Run M on wₙ
3. If M accepts, output wₙ (as number)
4. If M rejects or loops, f(n) is undefined

**Range of f:**
range(f) = {f(n) | f(n) is defined}
         = {wₙ | M accepts wₙ}
         = S ✓

**f is partial computable** (just simulate M).

**Proof of (⟸): Range of partial computable → RE set**

Let f be a partial computable function.
S = range(f) = {f(n) | f(n) is defined}

**Build TM M recognizing S:**

M on input x:
1. For i = 1, 2, 3, ...:
   For j = 1 to i:
     Simulate f(j) for i steps
     If f(j) halts and f(j) = x: accept
2. Continue forever

**Correctness:**
- If x ∈ S: x = f(n) for some n
  - At stage i ≥ max(n, steps to compute f(n)), we find f(n) = x
  - M accepts
- If x ∉ S: x is never output by f
  - M never accepts (runs forever)

**M recognizes S. ✓**

**Dovetailing is crucial:**
We can't just compute f(1), f(2), f(3), ... sequentially.
Some f(n) may be undefined (infinite loop).
Dovetailing ensures we don't get stuck.

**Alternative characterizations of RE:**
1. Recognized by some TM
2. Range of a partial computable function
3. Domain of a partial computable function
4. Enumerable by a TM (prints elements)
5. Semi-decidable (can verify YES, not NO)

**Relationship to decidability:**
- S decidable ⟺ S and S̄ both RE
- S decidable ⟺ S = range(total computable function) in increasing order`,
  },
  {
    id: 'cs203-t6-ex14',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Undecidability of CFG Ambiguity',
    description: 'Prove that determining whether a CFG is ambiguous is undecidable.',
    difficulty: 5,
    hints: [
      'Reduce from PCP',
      'Create a grammar where ambiguity corresponds to PCP match',
      'Two derivations when PCP has solution',
    ],
    solution: `**Undecidability of CFG Ambiguity**

**Problem:** AMBIG_CFG = {⟨G⟩ | G is ambiguous}

**Theorem:** AMBIG_CFG is undecidable.

**Proof by reduction from PCP:**

Given PCP instance P = {[t₁/b₁], ..., [tₖ/bₖ]}, construct CFG G such that:
G is ambiguous ⟺ PCP has a solution

**Construction of G:**

**Idea:** Create two paths to generate the same string iff PCP matches.

**Variables:** S, T, B
**Terminals:** Σ = {t₁, ..., tₖ, b₁, ..., bₖ} ∪ {a₁, ..., aₖ} (indices as markers)

**Productions:**

S → T | B

T → t₁Ta₁ | t₂Ta₂ | ... | tₖTaₖ | t₁a₁ | t₂a₂ | ... | tₖaₖ
(T generates strings tᵢ₁tᵢ₂...tᵢₙaᵢₙ...aᵢ₂aᵢ₁ - tops with reversed indices)

B → b₁Ba₁ | b₂Ba₂ | ... | bₖBaₖ | b₁a₁ | b₂a₂ | ... | bₖaₖ
(B generates strings bᵢ₁bᵢ₂...bᵢₙaᵢₙ...aᵢ₂aᵢ₁ - bottoms with reversed indices)

**Key insight:**

If PCP has solution i₁, i₂, ..., iₙ (tops = bottoms), then:
- tᵢ₁tᵢ₂...tᵢₙ = bᵢ₁bᵢ₂...bᵢₙ

The string tᵢ₁tᵢ₂...tᵢₙaᵢₙ...aᵢ₁ can be derived:
1. Via S → T → ... (using T productions)
2. Via S → B → ... (using B productions)

**Two different parse trees, same string → ambiguous!**

**Conversely:**
If G is ambiguous, some string has two derivations.
The only way this happens is through S → T and S → B producing the same string.
This means tᵢ₁...tᵢₙ = bᵢ₁...bᵢₙ for some sequence.
This is a PCP solution!

**Correctness:**
G is ambiguous ⟺ ∃ string with two parse trees
                ⟺ T and B can generate the same string
                ⟺ PCP has a solution

**Conclusion:**
PCP ≤_m AMBIG_CFG
Since PCP is undecidable, AMBIG_CFG is undecidable. ∎

**Note:** The grammar G is unambiguous if we only consider indices — ambiguity comes from the relationship between tops and bottoms in PCP.`,
  },
  {
    id: 'cs203-t6-ex15',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'The Arithmetic Hierarchy',
    description: 'Define the arithmetic hierarchy (Σ₁, Π₁, Σ₂, ...). Place HALT and TOTAL in this hierarchy.',
    difficulty: 5,
    hints: [
      'Hierarchy based on alternating quantifiers',
      'Σₙ: starts with ∃, n-1 alternations',
      'Πₙ: starts with ∀, n-1 alternations',
    ],
    solution: `**The Arithmetic Hierarchy**

**Definition:**
Sets classified by complexity of defining formula with quantifiers over ℕ.

**Σ₁ (Recursively Enumerable):**
S ∈ Σ₁ ⟺ S = {x | ∃y R(x,y)} where R is computable (decidable)
- One existential quantifier
- Same as Turing-recognizable (RE)

**Π₁ (co-RE):**
S ∈ Π₁ ⟺ S = {x | ∀y R(x,y)} where R is computable
- One universal quantifier
- Complements of RE sets

**Σ₂:**
S ∈ Σ₂ ⟺ S = {x | ∃y ∀z R(x,y,z)} where R is computable
- Exists-forall pattern

**Π₂:**
S ∈ Π₂ ⟺ S = {x | ∀y ∃z R(x,y,z)} where R is computable
- Forall-exists pattern

**General pattern:**
- Σₙ: ∃∀∃∀... (starts ∃, n alternations)
- Πₙ: ∀∃∀∃... (starts ∀, n alternations)

**Relationships:**
- Σₙ = co-Πₙ (complements)
- Σₙ ∪ Πₙ ⊆ Σₙ₊₁ ∩ Πₙ₊₁
- Decidable = Σ₁ ∩ Π₁ = Δ₁

**Placing HALT:**

HALT = {⟨M, w⟩ | M halts on w}

⟨M, w⟩ ∈ HALT ⟺ ∃t (M halts within t steps on w)

The predicate "M halts within t steps" is decidable (just simulate).

**HALT ∈ Σ₁** (RE) ✓

**HALT ∉ Π₁** (since HALT is undecidable, and Σ₁ ∩ Π₁ = decidable)

**Placing TOTAL:**

TOTAL = {⟨M⟩ | M halts on all inputs}
      = {⟨M⟩ | ∀w M halts on w}

⟨M⟩ ∈ TOTAL ⟺ ∀w ∃t (M halts on w within t steps)

**TOTAL ∈ Π₂** ✓

Is TOTAL Π₂-complete? Yes!
- Not in Σ₂ (or even Σ₁ = RE)
- Complete for Π₂ under many-one reductions

**Summary:**
| Set | Definition | Level |
|-----|------------|-------|
| Decidable | ∃ and ∀ finite | Δ₁ = Σ₁ ∩ Π₁ |
| HALT | ∃t halts | Σ₁ |
| H̄ALT | ∀t ¬halts | Π₁ |
| TOTAL | ∀w ∃t halts | Π₂ |
| FIN = {M : L(M) finite} | ∃n ∀w (|w|>n → reject) | Σ₂ |

**The hierarchy is strict:**
Σₙ ⊊ Σₙ₊₁ and Πₙ ⊊ Πₙ₊₁ (proper inclusions)`,
  },
  {
    id: 'cs203-t6-ex16',
    subjectId: 'cs203',
    topicId: 'cs203-topic-6',
    type: 'written',
    title: 'Gödel\'s Incompleteness and Undecidability',
    description: 'Explain the connection between Turing\'s undecidability results and Gödel\'s incompleteness theorems.',
    difficulty: 5,
    hints: [
      'Both involve self-reference and diagonalization',
      'Undecidability → incompleteness of formal systems',
      'Can encode TM behavior in arithmetic',
    ],
    solution: `**Gödel's Incompleteness and Turing's Undecidability**

**Historical context:**
- Gödel (1931): Incompleteness theorems
- Turing (1936): Undecidability of halting problem
- Both address fundamental limits of formal systems

**Gödel's First Incompleteness Theorem:**
Any consistent formal system F capable of expressing basic arithmetic contains statements that are true but unprovable in F.

**Turing's Undecidability:**
The halting problem is undecidable — no algorithm can determine if an arbitrary program halts.

**Connection via encoding:**

**Key insight:** TM computations can be encoded in arithmetic.

**Encoding scheme:**
- TM configurations as numbers
- Transitions as arithmetic relations
- "M halts on w" becomes an arithmetic statement

**From undecidability to incompleteness:**

**Theorem:** If formal system F is:
1. Consistent (doesn't prove contradictions)
2. Sound (only proves true statements)
3. Can express "TM M halts on w"

Then F is incomplete.

**Proof:**

Suppose F is complete and sound.

Build halting decider H:
- H(⟨M, w⟩): Search for proof in F of "M halts" or "M doesn't halt"
- Since F is complete, one exists
- Since F is sound, it's true
- Output accordingly

But halting is undecidable! Contradiction.

So F must be incomplete. ∎

**Gödel sentence vs. Halting:**

**Gödel's approach:** Construct G saying "G is unprovable in F"
- If G is provable → F proves something false → inconsistent
- If ¬G is provable → G is provable → contradiction
- So G is true but unprovable

**Turing's approach:** Direct via halting
- If halting were decidable, inconsistent F could be detected
- Since F consistent, halting undecidable
- Since F complete would decide halting, F incomplete

**Deeper connections:**

1. **Both use self-reference:**
   - Gödel: statement about its own provability
   - Turing: TM examining its own behavior

2. **Both use diagonalization:**
   - Gödel: enumerate proofs, construct diagonal
   - Turing: enumerate TMs, construct diagonal

3. **Arithmetization:**
   - Gödel numbering ≈ TM encoding
   - Both reduce meta-questions to arithmetic

**Church-Turing thesis connection:**
- "Provable" means "derivable by algorithm"
- Incompleteness = non-computability of truth
- Formal systems are essentially TMs

**Summary:**
| Concept | Gödel | Turing |
|---------|-------|--------|
| Object | Formal proofs | TM computations |
| Self-reference | "This is unprovable" | "Does M halt on ⟨M⟩?" |
| Result | True but unprovable | Undecidable |
| Method | Diagonalization | Diagonalization |`,
  },
];
