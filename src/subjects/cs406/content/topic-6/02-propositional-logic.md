---
title: "Propositional Logic"
slug: "propositional-logic"
description: "Syntax, semantics, truth tables, logical connectives, and inference in propositional logic"
---

# Propositional Logic

Propositional logic, also known as Boolean logic or sentential logic, is the simplest form of logic used in artificial intelligence and computer science. It provides a foundation for representing and reasoning about facts that are either true or false, making it ideal for many automated reasoning tasks.

## Syntax of Propositional Logic

The syntax of propositional logic defines the rules for constructing well-formed formulas (WFFs). The basic building blocks are:

### Atomic Propositions
Atomic propositions are indivisible statements represented by symbols (typically uppercase letters):
- P: "It is raining"
- Q: "The ground is wet"
- R: "The sprinkler is on"

### Logical Connectives
Propositional logic uses five main logical connectives to build complex sentences:

1. **Negation (¬)**: NOT
   - ¬P: "It is not raining"

2. **Conjunction (∧)**: AND
   - P ∧ Q: "It is raining AND the ground is wet"

3. **Disjunction (∨)**: OR
   - P ∨ R: "It is raining OR the sprinkler is on"

4. **Implication (→)**: IF-THEN
   - P → Q: "IF it is raining THEN the ground is wet"

5. **Biconditional (↔)**: IF AND ONLY IF
   - P ↔ Q: "It is raining IF AND ONLY IF the ground is wet"

### Formation Rules
- Every atomic proposition is a well-formed formula
- If α and β are WFFs, then so are: ¬α, (α ∧ β), (α ∨ β), (α → β), (α ↔ β)

## Semantics of Propositional Logic

Semantics define the meaning of logical sentences by specifying how truth values are assigned. In propositional logic, each atomic proposition can be either true (T) or false (F).

### Truth Tables

Truth tables exhaustively enumerate all possible truth value assignments and determine the truth value of complex formulas. Here are the truth tables for the main connectives:

**Negation:**
| P | ¬P |
|---|---|
| T | F |
| F | T |

**Conjunction:**
| P | Q | P ∧ Q |
|---|---|-------|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

**Disjunction:**
| P | Q | P ∨ Q |
|---|---|-------|
| T | T | T |
| T | F | T |
| F | T | T |
| F | F | F |

**Implication:**
| P | Q | P → Q |
|---|---|-------|
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

**Biconditional:**
| P | Q | P ↔ Q |
|---|---|-------|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | T |

Note that implication (P → Q) is only false when P is true and Q is false. This matches the interpretation that "P implies Q" means "if P is true, then Q must be true."

## Python Implementation

Here's a practical implementation of propositional logic in Python:

```python
from typing import Set, Dict

class PropositionalFormula:
    """Base class for propositional logic formulas"""
    def evaluate(self, model: Dict[str, bool]) -> bool:
        raise NotImplementedError

class Atom(PropositionalFormula):
    def __init__(self, symbol: str):
        self.symbol = symbol

    def evaluate(self, model: Dict[str, bool]) -> bool:
        return model.get(self.symbol, False)

    def __repr__(self):
        return self.symbol

class Not(PropositionalFormula):
    def __init__(self, operand: PropositionalFormula):
        self.operand = operand

    def evaluate(self, model: Dict[str, bool]) -> bool:
        return not self.operand.evaluate(model)

    def __repr__(self):
        return f"¬{self.operand}"

class And(PropositionalFormula):
    def __init__(self, left: PropositionalFormula, right: PropositionalFormula):
        self.left = left
        self.right = right

    def evaluate(self, model: Dict[str, bool]) -> bool:
        return self.left.evaluate(model) and self.right.evaluate(model)

    def __repr__(self):
        return f"({self.left} ∧ {self.right})"

class Or(PropositionalFormula):
    def __init__(self, left: PropositionalFormula, right: PropositionalFormula):
        self.left = left
        self.right = right

    def evaluate(self, model: Dict[str, bool]) -> bool:
        return self.left.evaluate(model) or self.right.evaluate(model)

    def __repr__(self):
        return f"({self.left} ∨ {self.right})"

class Implies(PropositionalFormula):
    def __init__(self, left: PropositionalFormula, right: PropositionalFormula):
        self.left = left
        self.right = right

    def evaluate(self, model: Dict[str, bool]) -> bool:
        return not self.left.evaluate(model) or self.right.evaluate(model)

    def __repr__(self):
        return f"({self.left} → {self.right})"

# Example usage
P = Atom("P")  # "It is raining"
Q = Atom("Q")  # "The ground is wet"
R = Atom("R")  # "The sprinkler is on"

# Formula: (P ∨ R) → Q
# "If it is raining or the sprinkler is on, then the ground is wet"
formula = Implies(Or(P, R), Q)

# Test with different models
model1 = {"P": True, "Q": True, "R": False}
model2 = {"P": True, "Q": False, "R": False}
model3 = {"P": False, "Q": False, "R": False}

print(f"{formula} with {model1}: {formula.evaluate(model1)}")  # True
print(f"{formula} with {model2}: {formula.evaluate(model2)}")  # False
print(f"{formula} with {model3}: {formula.evaluate(model3)}")  # True
```

## Important Logical Equivalences

Understanding logical equivalences is crucial for simplifying formulas and performing inference:

1. **De Morgan's Laws:**
   - ¬(P ∧ Q) ≡ ¬P ∨ ¬Q
   - ¬(P ∨ Q) ≡ ¬P ∧ ¬Q

2. **Implication Elimination:**
   - P → Q ≡ ¬P ∨ Q

3. **Biconditional Elimination:**
   - P ↔ Q ≡ (P → Q) ∧ (Q → P)

4. **Double Negation:**
   - ¬¬P ≡ P

5. **Distributivity:**
   - P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R)
   - P ∨ (Q ∧ R) ≡ (P ∨ Q) ∧ (P ∨ R)

6. **Contrapositive:**
   - P → Q ≡ ¬Q → ¬P

## Inference Rules

Inference rules allow us to derive new true sentences from existing ones. Key inference rules include:

### Modus Ponens
From P → Q and P, infer Q
```
P → Q
P
------
Q
```

### Modus Tollens
From P → Q and ¬Q, infer ¬P
```
P → Q
¬Q
------
¬P
```

### And-Elimination
From P ∧ Q, infer P (or Q)
```
P ∧ Q
------
P
```

### And-Introduction
From P and Q, infer P ∧ Q
```
P
Q
------
P ∧ Q
```

Here's a simple implementation of inference:

```python
class InferenceEngine:
    def __init__(self):
        self.knowledge_base = []

    def tell(self, sentence: PropositionalFormula):
        """Add a sentence to the knowledge base"""
        self.knowledge_base.append(sentence)

    def modus_ponens(self, implication: Implies, antecedent: PropositionalFormula):
        """Apply Modus Ponens rule"""
        if implication in self.knowledge_base and antecedent in self.knowledge_base:
            return implication.right
        return None

# Example
engine = InferenceEngine()
P = Atom("P")
Q = Atom("Q")

engine.tell(Implies(P, Q))  # P → Q
engine.tell(P)               # P

conclusion = engine.modus_ponens(Implies(P, Q), P)
print(f"Conclusion: {conclusion}")  # Q
```

## SAT Solving and Applications

The Boolean Satisfiability Problem (SAT) asks whether there exists an assignment of truth values that makes a propositional formula true. SAT is the first problem proven to be NP-complete, yet modern SAT solvers can handle formulas with millions of variables.

### SAT Applications:
1. **Hardware Verification**: Checking circuit designs for correctness
2. **Software Verification**: Proving program properties
3. **Planning**: Finding sequences of actions to achieve goals
4. **Scheduling**: Assigning resources to tasks
5. **Configuration**: Finding valid system configurations

Here's a simple SAT solver using brute force:

```python
from itertools import product

def get_atoms(formula: PropositionalFormula, atoms: Set[str] = None) -> Set[str]:
    """Extract all atomic propositions from a formula"""
    if atoms is None:
        atoms = set()

    if isinstance(formula, Atom):
        atoms.add(formula.symbol)
    elif isinstance(formula, Not):
        get_atoms(formula.operand, atoms)
    elif isinstance(formula, (And, Or, Implies)):
        get_atoms(formula.left, atoms)
        get_atoms(formula.right, atoms)

    return atoms

def sat_solve(formula: PropositionalFormula) -> Dict[str, bool]:
    """Find a satisfying assignment for the formula (brute force)"""
    atoms = sorted(get_atoms(formula))
    n = len(atoms)

    # Try all 2^n possible assignments
    for values in product([False, True], repeat=n):
        model = dict(zip(atoms, values))
        if formula.evaluate(model):
            return model

    return None  # Unsatisfiable

# Example: Find assignment for (P ∨ Q) ∧ (¬P ∨ R) ∧ ¬R
P, Q, R = Atom("P"), Atom("Q"), Atom("R")
formula = And(And(Or(P, Q), Or(Not(P), R)), Not(R))

solution = sat_solve(formula)
print(f"Solution: {solution}")  # {'P': False, 'Q': True, 'R': False}
```

## Key Takeaways

1. **Propositional logic** uses atomic propositions and logical connectives to represent knowledge about binary (true/false) facts
2. **Truth tables** provide a systematic way to determine the truth value of complex formulas
3. **Logical connectives** (¬, ∧, ∨, →, ↔) allow building complex statements from simple ones
4. **Logical equivalences** enable formula simplification and transformation
5. **Inference rules** like Modus Ponens allow deriving new knowledge from existing facts
6. **SAT solving** determines whether a formula can be made true, with applications in verification, planning, and optimization
7. **Propositional logic** is decidable but has limitations in expressiveness (cannot represent objects, relations, or quantification)

While propositional logic provides a solid foundation for logical reasoning, its inability to represent objects and relations limits its applicability. This motivates the need for more expressive logics like first-order logic, which we'll explore next.
