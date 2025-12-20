---
id: cs203-t5-definition
title: "TM Definition"
order: 1
---

# TM Definition

A **Turing Machine (TM)** is the most powerful computational model, equivalent to any general-purpose computer. It can read, write, and move on an infinite tape, providing the theoretical foundation for understanding what problems computers can solve.

## Historical Context and Significance

Alan Turing introduced this model in his seminal 1936 paper "On Computable Numbers," where he used it to prove the undecidability of the Entscheidungsproblem (the decision problem for first-order logic). Remarkably, Turing conceived this model before electronic computers existed, yet it precisely captures what any computer can compute.

The Turing machine's importance extends beyond theory. The Church-Turing thesis—the claim that Turing machines capture the intuitive notion of "algorithm"—provides the foundation for computability theory. When we say a problem is "undecidable," we mean no Turing machine can solve it, and by extension, no computer program ever can.

## Intuitive Understanding

Imagine a machine with:
- An infinitely long tape divided into cells, each holding a symbol
- A read/write head positioned over one cell at a time
- A finite control unit that determines behavior based on current state and symbol

At each step, the machine reads the symbol under the head, writes a new symbol, moves the head left or right, and transitions to a new state. Despite this simplicity, this model can simulate any computer program.

## Formal Definition

A TM is a 7-tuple $M = (Q, \Sigma, \Gamma, \delta, q_0, q_{\text{accept}}, q_{\text{reject}})$ where:

- **Q** is a finite set of states
- **Σ** is the input alphabet (not containing blank $\sqcup$)
- **Γ** is the tape alphabet ($\Sigma \subset \Gamma$, $\sqcup \in \Gamma$)
- $\delta: Q \times \Gamma \to Q \times \Gamma \times \{L, R\}$ is the transition function
- $q_0 \in Q$ is the start state
- $q_{\text{accept}} \in Q$ is the accept state
- $q_{\text{reject}} \in Q$ is the reject state ($q_{\text{accept}} \neq q_{\text{reject}}$)

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

$\delta(q, a) = (r, b, D)$ means:

In state $q$, reading symbol $a$:
1. Write symbol $b$ (replacing $a$)
2. Move head in direction $D \in \{L, R\}$
3. Enter state $r$

## Halting States

When TM enters $q_{\text{accept}}$ or $q_{\text{reject}}$, it **halts**:
- $q_{\text{accept}}$: Input accepted
- $q_{\text{reject}}$: Input rejected

The TM may also run forever without halting (for some inputs).

## Configurations

A **configuration** captures the complete machine state:

$uqv$ represents:
- Tape contents: $uv$ (with blanks beyond)
- Current state: $q$
- Head position: over first symbol of $v$

## Computation Steps

Configuration $C_1$ **yields** $C_2$ (written $C_1 \vdash C_2$):

If $\delta(q_i, b) = (q_j, c, L)$:
$$uaq_ibv \vdash uq_jacv \quad \text{(move left)}$$

If $\delta(q_i, b) = (q_j, c, R)$:
$$uaq_ibv \vdash uacq_jv \quad \text{(move right)}$$

## Language Recognition

The language recognized by TM $M$:

$$
L(M) = \{w \in \Sigma^* \mid M \text{ accepts } w\}
$$

$M$ accepts $w$ if starting from $q_0w$, $M$ eventually reaches $q_{\text{accept}}$.

## Example TM

TM for $L = \{0^n 1^n \mid n \geq 0\}$:

**Algorithm:**
1. If tape is blank, accept
2. If first symbol isn't 0, reject
3. Cross off a 0 (write X)
4. Move right to find a 1
5. Cross off the 1 (write X)
6. Move left to find next 0
7. Repeat until all 0s and 1s crossed off

### State Diagram

```mermaid
stateDiagram-v2
    [*] --> q0
    q0 --> qaccept: ␣/␣,R
    q0 --> q1: 0/X,R
    q1 --> q1: 0/0,R
    q1 --> q2: 1/X,L
    q2 --> q2: 0/0,L
    q2 --> q2: X/X,L
    q2 --> q0: X/X,R
    q0 --> q3: X/X,R
    q3 --> q3: X/X,R
    q3 --> qaccept: ␣/␣,R
    qaccept --> [*]

    note right of q0: Check/start
    note right of q1: Find matching 1
    note right of q2: Return to start
    note right of q3: Verify all matched
```

## State Diagram Notation

Transitions drawn as: $q_1 \xrightarrow{0/X,R} q_2$

Read 0, write X, move right, go to state $q_2$.

## TM vs Previous Models

| Model | Memory | Power |
|-------|--------|-------|
| DFA | None | Regular |
| PDA | Stack (LIFO) | Context-free |
| TM | Infinite tape (random access) | Recursively enumerable |

The infinite read/write tape gives TMs their power.

## Why the Tape Model Works

The tape provides several crucial capabilities that simpler models lack:

**Random Access Memory**: Unlike a stack, the head can move back and forth, accessing any previously written data. This enables arbitrary data structures and complex algorithms.

**Unlimited Storage**: The tape extends infinitely, so there's no bound on how much data can be stored. This matches the idealization that algorithms shouldn't fail due to memory limits.

**Read and Write**: The machine can modify its workspace, enabling iterative refinement and in-place computation—essential for complex algorithms.

## Decidability and Recognition

Two key concepts distinguish TM behavior:

**Decidable (Recursive)**: A language L is decidable if some TM always halts and correctly answers "yes" or "no" for membership.

**Recognizable (Recursively Enumerable)**: A language L is recognizable if some TM accepts all strings in L, but may loop forever on strings not in L.

Every decidable language is recognizable, but some recognizable languages are not decidable (most famously, the halting problem).

## The Power of Turing Machines

What makes TMs remarkable is that despite their simplicity, they can compute anything any computer can compute:
- Sorting algorithms
- Graph algorithms
- Database queries
- Neural network inference
- Anything a Python/Java/C++ program can do

This universality is the core insight of computability theory.

## Key Takeaways

- Turing machines are the theoretical foundation for what computers can compute
- The 7-tuple definition specifies states, alphabets, transitions, and halting states
- The infinite read/write tape provides random-access unbounded memory
- Configurations encode the complete state of computation
- TMs can decide (always halt with answer) or recognize (accept members, may loop)
- The Church-Turing thesis equates TM computation with the intuitive notion of algorithm
- Despite simple mechanics, TMs capture the full power of computation
