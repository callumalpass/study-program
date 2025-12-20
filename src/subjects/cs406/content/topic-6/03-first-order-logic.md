---
title: "First-Order Logic"
slug: "first-order-logic"
description: "Predicates, functions, quantifiers, unification, and the expressive power of first-order logic"
---

# First-Order Logic

First-order logic (FOL), also known as predicate logic or first-order predicate calculus, extends propositional logic with the ability to represent objects, their properties, and relationships between them. This added expressiveness makes FOL the foundation for most knowledge representation systems in artificial intelligence.

## Limitations of Propositional Logic

Propositional logic cannot concisely express general patterns. Consider these statements:
- "Socrates is a human"
- "Plato is a human"
- "All humans are mortal"
- "Therefore, Socrates is mortal"

In propositional logic, we'd need separate propositions for each person and cannot express the generalization "all humans are mortal" without enumerating every human. First-order logic solves this problem.

## Syntax of First-Order Logic

First-order logic introduces several new components:

### Constants, Variables, and Functions

1. **Constants**: Represent specific objects
   - Examples: Socrates, Earth, 5, π

2. **Variables**: Represent unspecified objects
   - Examples: x, y, z

3. **Functions**: Map objects to objects
   - Examples: father_of(x), square_root(x), plus(x, y)

### Predicates

Predicates represent properties of objects or relations between objects. They return true or false.

**Unary predicates** (properties):
- Human(Socrates): "Socrates is a human"
- Prime(7): "7 is a prime number"
- Red(apple): "The apple is red"

**Binary predicates** (relations):
- Loves(John, Mary): "John loves Mary"
- GreaterThan(5, 3): "5 is greater than 3"
- Parent(Alice, Bob): "Alice is a parent of Bob"

**n-ary predicates**:
- Between(2, 5, 10): "2 is between 5 and 10"

### Quantifiers

Quantifiers allow us to make statements about collections of objects:

1. **Universal Quantifier (∀)**: "for all"
   - ∀x Human(x) → Mortal(x): "All humans are mortal"

2. **Existential Quantifier (∃)**: "there exists"
   - ∃x Human(x) ∧ Wise(x): "There exists a wise human"

### Well-Formed Formulas

The complete syntax of FOL combines these elements with logical connectives:

**Atomic formulas:**
- Predicate(term₁, term₂, ..., termₙ)

**Complex formulas:**
- Logical connectives: ¬, ∧, ∨, →, ↔
- Quantifiers: ∀x, ∃x

## Python Implementation

Here's a practical implementation of first-order logic in Python:

```python
from typing import Dict, Set, List, Any

class Term:
    """Base class for terms (constants, variables, functions)"""
    pass

class Constant(Term):
    def __init__(self, name: str):
        self.name = name

    def __repr__(self):
        return self.name

    def substitute(self, bindings: Dict[str, Term]) -> Term:
        return self

class Variable(Term):
    def __init__(self, name: str):
        self.name = name

    def __repr__(self):
        return self.name

    def substitute(self, bindings: Dict[str, Term]) -> Term:
        return bindings.get(self.name, self)

class Function(Term):
    def __init__(self, name: str, args: List[Term]):
        self.name = name
        self.args = args

    def __repr__(self):
        args_str = ", ".join(str(arg) for arg in self.args)
        return f"{self.name}({args_str})"

    def substitute(self, bindings: Dict[str, Term]) -> Term:
        new_args = [arg.substitute(bindings) for arg in self.args]
        return Function(self.name, new_args)

class Predicate:
    def __init__(self, name: str, args: List[Term]):
        self.name = name
        self.args = args

    def __repr__(self):
        args_str = ", ".join(str(arg) for arg in self.args)
        return f"{self.name}({args_str})"

    def substitute(self, bindings: Dict[str, Term]) -> 'Predicate':
        new_args = [arg.substitute(bindings) for arg in self.args]
        return Predicate(self.name, new_args)

# Example: Representing family relationships
socrates = Constant("Socrates")
plato = Constant("Plato")
x = Variable("x")
y = Variable("y")

# Predicates
human_socrates = Predicate("Human", [socrates])
mortal_x = Predicate("Mortal", [x])
parent_of = Predicate("Parent", [x, y])

print(human_socrates)  # Human(Socrates)
print(mortal_x)  # Mortal(x)

# Substitution
bindings = {"x": socrates}
print(mortal_x.substitute(bindings))  # Mortal(Socrates)
```

## Quantifiers in Detail

### Universal Quantification

The universal quantifier ∀ makes a statement about all objects in the domain.

**Examples:**
- ∀x Human(x) → Mortal(x): "All humans are mortal"
- ∀x ∀y Equal(x, y) → Equal(y, x): "Equality is symmetric"
- ∀x Prime(x) ∧ GreaterThan(x, 2) → Odd(x): "All primes greater than 2 are odd"

**De Morgan's Laws for Quantifiers:**
- ¬∀x P(x) ≡ ∃x ¬P(x): "Not all x satisfy P" ≡ "Some x doesn't satisfy P"

### Existential Quantification

The existential quantifier ∃ asserts the existence of at least one object satisfying a property.

**Examples:**
- ∃x Human(x) ∧ Perfect(x): "There exists a perfect human"
- ∃x Prime(x) ∧ Even(x): "There exists an even prime number" (2)
- ∃x ∀y Loves(x, y): "There exists someone who loves everyone"

**De Morgan's Laws:**
- ¬∃x P(x) ≡ ∀x ¬P(x): "No x satisfies P" ≡ "All x don't satisfy P"

### Nested Quantifiers

Quantifiers can be nested, and order matters:

```python
# ∀x ∃y Loves(x, y): "Everyone loves someone"
# ∃y ∀x Loves(x, y): "Someone is loved by everyone"

class QuantifiedFormula:
    def __init__(self, quantifier: str, variable: Variable, formula):
        self.quantifier = quantifier  # "forall" or "exists"
        self.variable = variable
        self.formula = formula

    def __repr__(self):
        symbol = "∀" if self.quantifier == "forall" else "∃"
        return f"{symbol}{self.variable} {self.formula}"

# Everyone loves someone
x, y = Variable("x"), Variable("y")
loves_xy = Predicate("Loves", [x, y])
exists_y = QuantifiedFormula("exists", y, loves_xy)
forall_x = QuantifiedFormula("forall", x, exists_y)
print(forall_x)  # ∀x ∃y Loves(x, y)
```

## Unification

Unification is the process of finding substitutions that make different logical expressions identical. It's fundamental to inference in first-order logic.

**Definition:** A substitution θ is a unifier for expressions E₁ and E₂ if E₁θ = E₂θ.

**Examples:**
- Unify(Human(x), Human(Socrates)) → {x/Socrates}
- Unify(Loves(John, x), Loves(y, Mary)) → {y/John, x/Mary}
- Unify(Parent(x, y), Parent(Alice, Bob)) → {x/Alice, y/Bob}

Here's a unification algorithm implementation:

```python
def occurs_check(var: Variable, term: Term) -> bool:
    """Check if variable occurs in term (prevents infinite structures)"""
    if isinstance(term, Variable):
        return var.name == term.name
    elif isinstance(term, Function):
        return any(occurs_check(var, arg) for arg in term.args)
    return False

def unify(x: Term, y: Term, subst: Dict[str, Term] = None) -> Dict[str, Term]:
    """Unification algorithm"""
    if subst is None:
        subst = {}

    # Apply existing substitutions
    if isinstance(x, Variable) and x.name in subst:
        return unify(subst[x.name], y, subst)
    if isinstance(y, Variable) and y.name in subst:
        return unify(x, subst[y.name], subst)

    # Same constant or same variable
    if x == y or (isinstance(x, Constant) and isinstance(y, Constant) and x.name == y.name):
        return subst

    # Variable unification
    if isinstance(x, Variable):
        if occurs_check(x, y):
            return None  # Unification fails
        subst[x.name] = y
        return subst
    if isinstance(y, Variable):
        if occurs_check(y, x):
            return None
        subst[y.name] = x
        return subst

    # Function unification
    if isinstance(x, Function) and isinstance(y, Function):
        if x.name != y.name or len(x.args) != len(y.args):
            return None
        for arg_x, arg_y in zip(x.args, y.args):
            subst = unify(arg_x, arg_y, subst)
            if subst is None:
                return None
        return subst

    return None  # Unification fails

# Example usage
x, y, z = Variable("x"), Variable("y"), Variable("z")
alice, bob = Constant("Alice"), Constant("Bob")

parent1 = Predicate("Parent", [x, y])
parent2 = Predicate("Parent", [alice, bob])

# Unify predicates by unifying their arguments
result = unify(parent1.args[0], parent2.args[0])
result = unify(parent1.args[1], parent2.args[1], result)
print(f"Unification: {result}")  # {'x': Alice, 'y': Bob}
```

## Skolemization

Skolemization is a technique for eliminating existential quantifiers by introducing new function symbols (Skolem functions).

**Process:**
1. Convert to prenex normal form (all quantifiers at the front)
2. Replace existentially quantified variables with Skolem functions

**Example:**
- Original: ∀x ∃y Loves(x, y)
- Skolemized: ∀x Loves(x, f(x))

The Skolem function f(x) represents "the person that x loves."

```python
class SkolemFunction(Function):
    """Skolem function to replace existential quantifiers"""
    skolem_counter = 0

    def __init__(self, args: List[Term]):
        SkolemFunction.skolem_counter += 1
        name = f"sk{SkolemFunction.skolem_counter}"
        super().__init__(name, args)

# Example: ∀x ∃y Loves(x, y) → ∀x Loves(x, sk1(x))
x = Variable("x")
skolem_y = SkolemFunction([x])
loves_skolem = Predicate("Loves", [x, skolem_y])
print(loves_skolem)  # Loves(x, sk1(x))
```

## Herbrand Universe

The Herbrand universe is the set of all ground terms (terms without variables) that can be constructed from the constants and function symbols in a first-order theory.

**Example:** Given constants {a, b} and function f/1:
- Herbrand Universe: {a, b, f(a), f(b), f(f(a)), f(f(b)), ...}

The Herbrand universe provides a systematic way to ground quantified formulas for theorem proving.

## Expressiveness vs Propositional Logic

First-order logic is significantly more expressive than propositional logic:

| Feature | Propositional Logic | First-Order Logic |
|---------|-------------------|------------------|
| Objects | No | Yes |
| Relations | No | Yes |
| Quantification | No | Yes |
| Compactness | Limited | High |
| Decidability | Decidable | Semi-decidable |

**Example of increased expressiveness:**

Propositional logic (requires many propositions):
- Human_Socrates, Mortal_Socrates
- Human_Plato, Mortal_Plato
- ... (one pair for each person)

First-order logic (single statement):
- ∀x Human(x) → Mortal(x)

## Key Takeaways

1. **First-order logic** extends propositional logic with objects, predicates, functions, and quantifiers
2. **Predicates** represent properties and relations, enabling richer knowledge representation
3. **Universal quantifier (∀)** makes statements about all objects in the domain
4. **Existential quantifier (∃)** asserts the existence of objects with certain properties
5. **Unification** finds substitutions that make expressions identical, crucial for inference
6. **Skolemization** eliminates existential quantifiers by introducing Skolem functions
7. **Herbrand universe** provides a foundation for grounding and theorem proving
8. **FOL is more expressive** than propositional logic but is only semi-decidable (no algorithm guaranteed to terminate for all inputs)

First-order logic strikes a balance between expressiveness and computational tractability, making it the logic of choice for most AI knowledge representation systems, databases (SQL), and automated theorem provers.
