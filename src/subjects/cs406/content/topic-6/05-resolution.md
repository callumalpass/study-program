---
title: "Resolution Theorem Proving"
slug: "resolution"
description: "CNF conversion, resolution rule, resolution refutation, and theorem proving strategies"
---

# Resolution Theorem Proving

Resolution is a powerful inference rule and theorem proving technique that forms the foundation of automated reasoning systems and logic programming languages like Prolog. It provides a complete and systematic method for proving theorems in first-order logic through proof by refutation.

## The Resolution Principle

Resolution is based on a single inference rule that operates on clauses. A clause is a disjunction of literals (a literal is either an atomic formula or its negation).

**Resolution Rule:**
Given two clauses containing complementary literals (one positive, one negative):
```
C₁ ∨ L
C₂ ∨ ¬L
---------
C₁ ∨ C₂
```

**Example:**
```
P ∨ Q        (Clause 1)
¬P ∨ R       (Clause 2)
------
Q ∨ R        (Resolvent)
```

The power of resolution lies in its simplicity: it's the only rule needed for complete theorem proving in first-order logic.

## Proof by Refutation

Resolution uses proof by contradiction (refutation). To prove that KB ⊨ α:

1. Assume the negation: KB ∧ ¬α
2. Convert everything to CNF (Conjunctive Normal Form)
3. Apply resolution repeatedly
4. If you derive the empty clause (⊥), the original statement is proved

The empty clause represents a contradiction, proving that KB ∧ ¬α is unsatisfiable, therefore KB ⊨ α.

**Example:**
Prove: If it is raining, then the ground is wet. It is raining. Therefore, the ground is wet.

```
KB: P → Q, P
Query: Q

1. Negate query: ¬Q
2. KB ∧ ¬Q: (P → Q) ∧ P ∧ ¬Q
3. Convert to CNF: (¬P ∨ Q) ∧ P ∧ ¬Q
4. Resolve:
   - (¬P ∨ Q) and P → Q
   - Q and ¬Q → ⊥ (empty clause)
5. Contradiction found, so KB ⊨ Q
```

## Conjunctive Normal Form (CNF)

CNF is a conjunction of clauses, where each clause is a disjunction of literals.

**Example CNF formulas:**
- (P ∨ Q) ∧ (¬P ∨ R) ∧ (¬Q ∨ ¬R)
- P ∧ (Q ∨ R)
- (¬P ∨ Q ∨ R)

### CNF Conversion Algorithm

1. **Eliminate implications**: Replace α → β with ¬α ∨ β
2. **Eliminate biconditionals**: Replace α ↔ β with (α → β) ∧ (β → α)
3. **Move negation inward** (De Morgan's Laws):
   - ¬(α ∧ β) becomes ¬α ∨ ¬β
   - ¬(α ∨ β) becomes ¬α ∧ ¬β
   - ¬¬α becomes α
4. **Distribute ∨ over ∧**:
   - α ∨ (β ∧ γ) becomes (α ∨ β) ∧ (α ∨ γ)

**Example conversion:**
```
Original: P → (Q ∧ R)

Step 1 (Eliminate →): ¬P ∨ (Q ∧ R)
Step 2 (Distribute): (¬P ∨ Q) ∧ (¬P ∨ R)

Result: Two clauses: {¬P ∨ Q, ¬P ∨ R}
```

### Python Implementation

```python
from typing import Set, List, Optional

class Literal:
    def __init__(self, atom: str, positive: bool = True):
        self.atom = atom
        self.positive = positive

    def negate(self):
        return Literal(self.atom, not self.positive)

    def __eq__(self, other):
        return self.atom == other.atom and self.positive == other.positive

    def __hash__(self):
        return hash((self.atom, self.positive))

    def __repr__(self):
        return self.atom if self.positive else f"¬{self.atom}"

class Clause:
    def __init__(self, literals: Set[Literal]):
        self.literals = literals

    def is_empty(self):
        return len(self.literals) == 0

    def __eq__(self, other):
        return self.literals == other.literals

    def __hash__(self):
        return hash(frozenset(self.literals))

    def __repr__(self):
        if self.is_empty():
            return "⊥"
        return " ∨ ".join(str(lit) for lit in sorted(self.literals, key=str))

def resolve(clause1: Clause, clause2: Clause) -> Optional[Clause]:
    """Apply resolution rule to two clauses"""
    # Find complementary literals
    for lit1 in clause1.literals:
        for lit2 in clause2.literals:
            if lit1.atom == lit2.atom and lit1.positive != lit2.positive:
                # Found complementary pair, create resolvent
                new_literals = (clause1.literals - {lit1}) | (clause2.literals - {lit2})
                return Clause(new_literals)
    return None

# Example: Propositional resolution
P = Literal("P")
Q = Literal("Q")
R = Literal("R")

# Clause 1: P ∨ Q
clause1 = Clause({P, Q})
# Clause 2: ¬P ∨ R
clause2 = Clause({P.negate(), R})

resolvent = resolve(clause1, clause2)
print(f"{clause1} and {clause2} → {resolvent}")  # Q ∨ R
```

## Resolution for First-Order Logic

Resolution in first-order logic requires unification to handle variables.

**Binary Resolution Rule:**
```
C₁ ∨ L₁
C₂ ∨ L₂
---------
(C₁ ∨ C₂)θ
```

where θ is the most general unifier (MGU) of L₁ and ¬L₂.

**Example:**
```
Clause 1: Human(x) ∨ Mortal(x)  (i.e., ¬Human(x) ∨ Mortal(x))
Clause 2: Human(Socrates)
Unify: Human(x) with Human(Socrates) → θ = {x/Socrates}
Resolvent: Mortal(Socrates)
```

### Factoring

Before resolution, we may need to apply factoring to merge identical literals:

```
P(x) ∨ P(y)
-----------  (with θ = {y/x})
P(x)
```

### Python Implementation with Unification

```python
class Term:
    pass

class Constant(Term):
    def __init__(self, name: str):
        self.name = name

    def __eq__(self, other):
        return isinstance(other, Constant) and self.name == other.name

    def __hash__(self):
        return hash(self.name)

    def __repr__(self):
        return self.name

class Variable(Term):
    def __init__(self, name: str):
        self.name = name

    def __eq__(self, other):
        return isinstance(other, Variable) and self.name == other.name

    def __hash__(self):
        return hash(('var', self.name))

    def __repr__(self):
        return self.name

class Predicate:
    def __init__(self, name: str, args: List[Term], positive: bool = True):
        self.name = name
        self.args = args
        self.positive = positive

    def negate(self):
        return Predicate(self.name, self.args, not self.positive)

    def __repr__(self):
        args_str = ", ".join(str(arg) for arg in self.args)
        pred = f"{self.name}({args_str})"
        return pred if self.positive else f"¬{pred}"

def unify(term1: Term, term2: Term, subst: dict = None) -> Optional[dict]:
    """Most General Unifier (MGU)"""
    if subst is None:
        subst = {}

    if term1 == term2:
        return subst

    if isinstance(term1, Variable):
        return unify_variable(term1, term2, subst)
    if isinstance(term2, Variable):
        return unify_variable(term2, term1, subst)

    if isinstance(term1, Constant) and isinstance(term2, Constant):
        return subst if term1 == term2 else None

    return None

def unify_variable(var: Variable, term: Term, subst: dict) -> Optional[dict]:
    if var.name in subst:
        return unify(subst[var.name], term, subst)
    if isinstance(term, Variable) and term.name in subst:
        return unify(var, subst[term.name], subst)

    subst = subst.copy()
    subst[var.name] = term
    return subst

def unify_predicates(pred1: Predicate, pred2: Predicate) -> Optional[dict]:
    """Unify two predicates"""
    if pred1.name != pred2.name or len(pred1.args) != len(pred2.args):
        return None
    if pred1.positive == pred2.positive:
        return None  # Must be complementary

    subst = {}
    for arg1, arg2 in zip(pred1.args, pred2.args):
        subst = unify(arg1, arg2, subst)
        if subst is None:
            return None

    return subst

# Example: First-order resolution
x = Variable("x")
socrates = Constant("Socrates")

# ¬Human(x) ∨ Mortal(x)
clause1_preds = [
    Predicate("Human", [x], positive=False),
    Predicate("Mortal", [x], positive=True)
]

# Human(Socrates)
clause2_preds = [Predicate("Human", [socrates], positive=True)]

# Unify ¬Human(x) with Human(Socrates)
subst = unify_predicates(clause1_preds[0], clause2_preds[0])
print(f"Unification: {subst}")  # {x: Socrates}

# Apply substitution to get Mortal(Socrates)
print(f"Resolvent: Mortal({subst[x.name]})")
```

## Resolution Strategies

Pure resolution can be inefficient. Several strategies improve performance:

### 1. Unit Preference

Prefer resolutions involving unit clauses (single literal clauses). Unit clauses are "pure facts" and often lead quickly to contradictions.

**Example:**
```
Clauses: {P ∨ Q, ¬P ∨ R, S ∨ T, ¬Q}
Unit clause: ¬Q
Prefer: ¬Q with (P ∨ Q) → P
```

### 2. Set of Support

Select one set of clauses as the "set of support" (usually the negated query). At least one parent in each resolution must be from this set.

**Advantage:** Prevents deriving facts irrelevant to the query.

### 3. Linear Resolution

Each resolvent must involve the most recently derived clause. Creates a linear proof structure.

### 4. Subsumption

Remove clauses that are subsumed by (more general than) other clauses.

**Example:**
```
P ∨ Q subsumes P ∨ Q ∨ R
(If P ∨ Q is true, then P ∨ Q ∨ R is automatically true)
```

## Resolution and Prolog

Prolog is a logic programming language based on resolution. It uses SLD resolution (Selective Linear Definite clause resolution), which is:
- Linear resolution
- Restricted to Horn clauses
- Uses backward chaining with depth-first search

**Prolog example:**
```prolog
% Facts
human(socrates).
human(plato).

% Rules
mortal(X) :- human(X).

% Query
?- mortal(socrates).
% Prolog uses resolution to prove this
```

## Complete Resolution Theorem Prover

Here's a simplified resolution theorem prover:

```python
class ResolutionProver:
    def __init__(self):
        self.clauses: Set[Clause] = set()

    def add_clause(self, clause: Clause):
        self.clauses.add(clause)

    def prove(self, max_iterations: int = 100) -> bool:
        """Resolution refutation proof"""
        new_clauses = set()

        for iteration in range(max_iterations):
            # Get all pairs of clauses
            clause_list = list(self.clauses)
            n = len(clause_list)

            for i in range(n):
                for j in range(i + 1, n):
                    resolvent = resolve(clause_list[i], clause_list[j])

                    if resolvent is not None:
                        # Check for empty clause (contradiction)
                        if resolvent.is_empty():
                            print(f"Empty clause derived! Proof found.")
                            return True

                        # Add new resolvent
                        if resolvent not in self.clauses:
                            new_clauses.add(resolvent)
                            print(f"Derived: {resolvent}")

            # If no new clauses, we're done
            if not new_clauses:
                print("No new clauses derived. Cannot prove.")
                return False

            # Add new clauses for next iteration
            self.clauses.update(new_clauses)
            new_clauses.clear()

        print("Max iterations reached.")
        return False

# Example: Prove Q from (P → Q) ∧ P
prover = ResolutionProver()

P = Literal("P")
Q = Literal("Q")

# KB: P → Q (i.e., ¬P ∨ Q)
prover.add_clause(Clause({P.negate(), Q}))
# KB: P
prover.add_clause(Clause({P}))
# Negated query: ¬Q
prover.add_clause(Clause({Q.negate()}))

print("Attempting to prove Q...")
prover.prove()
```

## Key Takeaways

1. **Resolution** is a single, complete inference rule for theorem proving in first-order logic
2. **Proof by refutation** works by assuming the negation of the goal and deriving a contradiction
3. **CNF conversion** transforms formulas into conjunctive normal form for resolution
4. **The empty clause (⊥)** represents a contradiction and proves the original theorem
5. **Unification** is essential for resolution in first-order logic to handle variables
6. **Resolution strategies** like unit preference and set of support improve efficiency
7. **Prolog** is a practical logic programming language based on resolution
8. **Resolution is complete** for first-order logic but may not terminate for unsatisfiable theories
9. **Subsumption** helps reduce the search space by removing redundant clauses

Resolution theorem proving provides a systematic, mechanical approach to logical inference that forms the foundation of automated reasoning systems, verification tools, and logic programming languages. While complete, practical implementations require careful strategy selection to achieve good performance on real-world problems.
