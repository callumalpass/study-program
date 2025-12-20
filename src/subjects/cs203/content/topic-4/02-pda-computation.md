# PDA Computation

Understanding PDA computation involves tracking configurations and exploring computation paths. PDAs process input while manipulating their stack.

## Configurations Revisited

A configuration (q, w, γ) captures the complete machine state:
- **q**: Current control state
- **w**: Unread input (w ∈ Σ*)
- **γ**: Stack contents from top to bottom (γ ∈ Γ*)

Initial configuration: (q₀, w, Z₀)

## Transition Relation

The **yields** relation ⊢ connects configurations:

(q, aw, Xβ) ⊢ (p, w, αβ) if (p, α) ∈ δ(q, a, X)

Where:
- a ∈ Σ ∪ {ε} (input symbol or empty)
- X ∈ Γ (top of stack)
- α ∈ Γ* (replacement string)
- β ∈ Γ* (rest of stack, unchanged)

## Extended Transition Relation

- **⊢⁰**: Zero steps (reflexive)
- **⊢ⁿ**: Exactly n steps
- **⊢***: Zero or more steps (reflexive transitive closure)
- **⊢⁺**: One or more steps

## Computation Paths

A **computation** is a sequence of configurations:

(q₀, w, Z₀) ⊢ (q₁, w₁, γ₁) ⊢ ... ⊢ (qₙ, wₙ, γₙ)

Due to nondeterminism, multiple computation paths may exist for the same input.

## Computation Trees

Visualize all computations as a tree:
- Root: initial configuration
- Branches: nondeterministic choices
- Nodes: configurations
- Paths: individual computations

Accepting if any path reaches accepting configuration.

## Example Computation Tree

For PDA accepting {aⁿbⁿ} on input "ab":
```
            (q₀, ab, Z₀)
                 |
          δ(q₀, a, Z₀)
                 |
            (q₀, b, AZ₀)
                 |
          δ(q₀, b, A)
                 |
            (q₁, ε, Z₀)
                 |
          δ(q₁, ε, Z₀)
                 |
            (q₂, ε, Z₀)  ← Accept!
```

## Non-accepting Computations

A computation may fail to accept by:
1. **Blocking**: No applicable transition
2. **Infinite loop**: On ε-transitions (no progress)
3. **Wrong state**: Input consumed but not in accepting state
4. **Wrong stack**: For empty-stack acceptance, stack not empty

## Deterministic vs Nondeterministic

**DPDA**: At most one applicable transition per configuration.
- At most one choice at each step
- No ε-transitions when other transitions apply
- Accepts deterministic CFLs (proper subset of CFLs)

**NPDA**: Multiple choices allowed.
- Essential for some CFLs
- Accept if any path accepts

## ε-Transitions

ε-transitions (reading no input) allow:
- Stack manipulation without consuming input
- Moving between states freely
- Checking stack without reading

**Care needed**: Infinite ε-loops possible.

## Acceptance Definitions

Two equivalent definitions:

### Final State Acceptance
L(M) = {w | (q₀, w, Z₀) ⊢* (q, ε, γ) for some q ∈ F, γ ∈ Γ*}

### Empty Stack Acceptance
N(M) = {w | (q₀, w, Z₀) ⊢* (q, ε, ε) for some q ∈ Q}

## Proving Language Membership

To show w ∈ L(M):
1. Exhibit an accepting computation
2. Show (q₀, w, Z₀) ⊢* accepting configuration

To show w ∉ L(M):
1. Show all computations fail to accept
2. Harder due to nondeterminism

## Simulation and Implementation

Implementing PDA simulation:
```python
def accepts(pda, input_string):
    worklist = [(pda.start, input_string, pda.initial_stack)]
    while worklist:
        state, remaining, stack = worklist.pop()
        if remaining == "" and accept_condition(state, stack):
            return True
        for (next_state, new_stack) in transitions(state, remaining, stack):
            worklist.append((next_state, remaining[consumed:], new_stack))
    return False
```

## Detailed Example: Computing with {a^n b^n}

Let's trace the complete computation for a PDA accepting $L = \{a^n b^n \mid n \geq 1\}$ on input "aaabbb":

PDA definition:
- States: $Q = \{q_0, q_1, q_2\}$
- Stack alphabet: $\Gamma = \{Z_0, A\}$
- Transitions:
  - $\delta(q_0, a, Z_0) = \{(q_0, AZ_0)\}$
  - $\delta(q_0, a, A) = \{(q_0, AA)\}$
  - $\delta(q_0, b, A) = \{(q_1, \varepsilon)\}$
  - $\delta(q_1, b, A) = \{(q_1, \varepsilon)\}$
  - $\delta(q_1, \varepsilon, Z_0) = \{(q_2, Z_0)\}$
- Accept state: $F = \{q_2\}$

**Step-by-step computation:**

| Step | State | Remaining Input | Stack | Transition Used |
|------|-------|----------------|-------|-----------------|
| 0 | $q_0$ | aaabbb | $Z_0$ | Initial configuration |
| 1 | $q_0$ | aabbb | $AZ_0$ | $\delta(q_0, a, Z_0)$ — push first A |
| 2 | $q_0$ | abbb | $AAZ_0$ | $\delta(q_0, a, A)$ — push second A |
| 3 | $q_0$ | bbb | $AAAZ_0$ | $\delta(q_0, a, A)$ — push third A |
| 4 | $q_1$ | bb | $AAZ_0$ | $\delta(q_0, b, A)$ — switch to matching mode |
| 5 | $q_1$ | b | $AZ_0$ | $\delta(q_1, b, A)$ — pop second A |
| 6 | $q_1$ | ε | $Z_0$ | $\delta(q_1, b, A)$ — pop third A |
| 7 | $q_2$ | ε | $Z_0$ | $\delta(q_1, \varepsilon, Z_0)$ — accept |

The string is **accepted** because we reached state $q_2 \in F$ with all input consumed.

## Nondeterministic Computation Example

Consider a PDA for $L = \{ww^R \mid w \in \{a,b\}^*\}$ processing input "abba":

The PDA must **guess** where the middle is. Here are two possible computation paths:

**Path 1: Guess middle after "ab"**
$$
\begin{align*}
(q_0, abba, Z_0) &\vdash (q_0, bba, AZ_0) && \text{push a} \\
&\vdash (q_0, ba, BAZ_0) && \text{push b} \\
&\vdash (q_1, ba, BAZ_0) && \text{guess middle (wrong!)} \\
&\vdash (q_1, a, AZ_0) && \text{try to match b with B (works)} \\
&\vdash \text{STUCK} && \text{can't match a with A at end}
\end{align*}
$$

**Path 2: Guess middle after "a"**
$$
\begin{align*}
(q_0, abba, Z_0) &\vdash (q_0, bba, AZ_0) && \text{push a} \\
&\vdash (q_1, bba, AZ_0) && \text{guess middle (wrong again!)} \\
&\vdash \text{STUCK} && \text{can't match b with A}
\end{align*}
$$

**Path 3: Guess middle immediately**
$$
\begin{align*}
(q_0, abba, Z_0) &\vdash (q_1, abba, Z_0) && \text{guess middle (still wrong!)} \\
&\vdash \text{STUCK} && \text{nothing to pop for a}
\end{align*}
$$

For "abba" in this language, all paths fail because it's not a palindrome. For a true palindrome like "aa", at least one computation path would succeed.

## Understanding Configuration Space

The **configuration space** of a PDA computation can be visualized as a directed graph where:
- Nodes are configurations $(q, w, \gamma)$
- Edges represent single computation steps (the $\vdash$ relation)
- Multiple outgoing edges indicate nondeterministic choices
- Paths from root to accepting configuration represent accepting computations

For nondeterministic PDAs, this graph may have:
- Branching (multiple choices at each configuration)
- Dead ends (configurations with no applicable transitions)
- Infinite paths (due to $\varepsilon$-loops)
- Multiple accepting paths for the same input

The PDA accepts if there exists at least one path from the initial configuration to an accepting configuration.

## Stack Height During Computation

The stack height varies during computation. For the PDA accepting $\{a^n b^n\}$ on input $a^n b^n$:

1. **Push phase**: Stack grows from height 1 to height $n+1$
2. **Transition**: Stack height stays at $n+1$ for one step
3. **Pop phase**: Stack shrinks from height $n+1$ back to 1
4. **Accept**: Stack height remains at 1

For some PDAs, the stack can grow unboundedly during computation, even for finite input. However, for accepting computations of strings of length $n$, the maximum stack height is often bounded by a function of $n$.

## Relationship to Parsing

PDA computation directly models parsing strategies:

**Top-down parsing** (LL):
- Start with grammar's start symbol on stack
- Match terminals, expand nonterminals
- Configuration tracks remaining input and predicted symbols

**Bottom-up parsing** (LR):
- Build parse tree from leaves to root
- Shift input symbols onto stack
- Reduce when pattern matches production right-hand side

Both approaches use the stack to track parsing state, making PDAs the natural formal model for understanding parser behavior.

## Complexity of Simulation

Simulating a nondeterministic PDA:
- May require exploring exponentially many paths
- Each path can be linear in input length
- Overall complexity: $O(n \cdot b^n)$ where $b$ is branching factor

For deterministic PDAs:
- Only one path exists
- Simulation is $O(n)$ where $n$ is input length
- This efficiency makes DPDAs practical for real parsers

## Handling Infinite Computations

Some configurations may lead to infinite computations via $\varepsilon$-transitions:

$$
(q, w, X\beta) \vdash (q, w, Y\beta) \vdash (q, w, X\beta) \vdash \cdots
$$

This infinite loop makes no progress on the input. To handle this:
- Practical implementations bound computation depth
- Theoretical analysis considers "well-behaved" PDAs
- Acceptance requires a halting computation

A string is rejected if all computation paths either:
1. Block (reach configuration with no applicable transition)
2. Loop infinitely without accepting
3. Halt in non-accepting configuration

## Key Takeaways

- PDA computation involves sequences of configuration transitions
- Configurations $(q, w, \gamma)$ capture complete machine state
- The yields relation $\vdash$ connects configurations via transitions
- Nondeterminism creates multiple possible computation paths
- A string is accepted if any computation path leads to acceptance
- Computation trees visualize all possible paths for a given input
- $\varepsilon$-transitions enable stack manipulation without consuming input
- Stack height varies during computation, tracking structural depth
- PDA computation models the parsing process in compiler design
- Simulation complexity differs dramatically between deterministic and nondeterministic PDAs
