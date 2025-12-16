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
