# TM Definition

A **Turing Machine (TM)** is the most powerful computational model, equivalent to any general-purpose computer. It can read, write, and move on an infinite tape.

## Formal Definition

A TM is a 7-tuple M = (Q, Σ, Γ, δ, q₀, q_accept, q_reject) where:

- **Q** is a finite set of states
- **Σ** is the input alphabet (not containing blank ␣)
- **Γ** is the tape alphabet (Σ ⊂ Γ, ␣ ∈ Γ)
- **δ: Q × Γ → Q × Γ × {L, R}** is the transition function
- **q₀ ∈ Q** is the start state
- **q_accept ∈ Q** is the accept state
- **q_reject ∈ Q** is the reject state (q_accept ≠ q_reject)

## The Tape

The TM has an infinite tape divided into cells:
- Each cell holds one symbol from Γ
- Initially contains input string followed by blanks
- Tape infinite in one or both directions

## The Head

A read/write head:
- Positioned over one cell
- Can read the current symbol
- Can write a new symbol
- Moves left (L) or right (R) one cell per step

## Transition Function

δ(q, a) = (r, b, D) means:

In state q, reading symbol a:
1. Write symbol b (replacing a)
2. Move head in direction D (L or R)
3. Enter state r

## Halting States

When TM enters q_accept or q_reject, it **halts**:
- q_accept: Input accepted
- q_reject: Input rejected

The TM may also run forever without halting.

## Configurations

A **configuration** captures the complete machine state:

uqv represents:
- Tape contents: uv (with blanks beyond)
- Current state: q
- Head position: over first symbol of v

## Computation Steps

Configuration C₁ **yields** C₂ (written C₁ ⊢ C₂):

If δ(qᵢ, b) = (qⱼ, c, L):
- uaqᵢbv ⊢ uqⱼacv (move left)

If δ(qᵢ, b) = (qⱼ, c, R):
- uaqᵢbv ⊢ uacqⱼv (move right)

## Language Recognition

The language recognized by TM M:

L(M) = {w ∈ Σ* | M accepts w}

M accepts w if starting from q₀w, M eventually reaches q_accept.

## Example TM

TM for L = {0ⁿ1ⁿ | n ≥ 0}:

Algorithm:
1. If tape is blank, accept
2. If first symbol isn't 0, reject
3. Cross off a 0 (write X)
4. Move right to find a 1
5. Cross off the 1 (write X)
6. Move left to find next 0
7. Repeat until all 0s and 1s crossed off

## State Diagram Notation

Transitions drawn as:
- q₁ --0/X,R--> q₂

Read 0, write X, move right, go to state q₂.

## TM vs Previous Models

| Model | Memory | Power |
|-------|--------|-------|
| DFA | None | Regular |
| PDA | Stack (LIFO) | Context-free |
| TM | Infinite tape (random access) | Recursively enumerable |

The infinite read/write tape gives TMs their power.
