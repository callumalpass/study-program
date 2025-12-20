---
title: "Logical Inference"
slug: "inference"
description: "Forward chaining, backward chaining, unification, and inference algorithms for knowledge-based systems"
---

# Logical Inference

Logical inference is the process of deriving new knowledge from existing knowledge in a knowledge base. It forms the foundation of intelligent reasoning systems, enabling them to answer queries, make decisions, and solve problems based on what they know. This section explores the key inference algorithms used in artificial intelligence.

## The Inference Problem

Given a knowledge base KB and a query α, the inference problem asks: does KB entail α? Written as KB ⊨ α, this means "does α logically follow from KB?"

**Example:**
- KB: "All humans are mortal", "Socrates is a human"
- Query: "Is Socrates mortal?"
- Answer: Yes, KB ⊨ Mortal(Socrates)

An inference algorithm is **sound** if it only derives entailed sentences (no false positives) and **complete** if it can derive all entailed sentences (no false negatives).

## Generalized Modus Ponens

Modus Ponens is a fundamental inference rule. In propositional logic:
```
P → Q
P
------
Q
```

**Generalized Modus Ponens** extends this to first-order logic with variables:

```
p₁', p₂', ..., pₙ'
(p₁ ∧ p₂ ∧ ... ∧ pₙ) → q
------------------------
qθ
```

where θ is a substitution that unifies pᵢ' with pᵢ for all i.

**Example:**
```
Human(Socrates)
Human(x) → Mortal(x)
--------------------
Mortal(Socrates)
```

Here θ = {x/Socrates}.

## Forward Chaining

Forward chaining is a data-driven inference strategy that starts with known facts and applies inference rules to derive new facts until the query is answered or no new facts can be derived.

### Algorithm

1. Start with known facts in the knowledge base
2. Find all rules whose premises are satisfied by current facts
3. Apply those rules to derive new facts
4. Add new facts to the knowledge base
5. Repeat until the query is proved or no new facts are generated

### Properties

- **Sound**: Yes (only derives true consequences)
- **Complete**: Yes (for definite clauses)
- **Data-driven**: Starts from facts and moves toward conclusions

### Python Implementation

```python
from typing import Set, List, Dict, Tuple

class Fact:
    def __init__(self, predicate: str, args: List[str]):
        self.predicate = predicate
        self.args = tuple(args)  # Make hashable

    def __eq__(self, other):
        return self.predicate == other.predicate and self.args == other.args

    def __hash__(self):
        return hash((self.predicate, self.args))

    def __repr__(self):
        args_str = ", ".join(self.args)
        return f"{self.predicate}({args_str})"

class Rule:
    def __init__(self, premises: List[Fact], conclusion: Fact):
        self.premises = premises
        self.conclusion = conclusion

    def __repr__(self):
        premises_str = " ∧ ".join(str(p) for p in self.premises)
        return f"{premises_str} → {self.conclusion}"

class ForwardChainer:
    def __init__(self):
        self.facts: Set[Fact] = set()
        self.rules: List[Rule] = []
        self.inferred: Set[Fact] = set()

    def tell_fact(self, fact: Fact):
        """Add a fact to the knowledge base"""
        self.facts.add(fact)

    def tell_rule(self, rule: Rule):
        """Add a rule to the knowledge base"""
        self.rules.append(rule)

    def unify_fact(self, pattern: Fact, fact: Fact) -> Dict[str, str]:
        """Simple unification for facts (variables start with '?')"""
        if pattern.predicate != fact.predicate:
            return None
        if len(pattern.args) != len(fact.args):
            return None

        bindings = {}
        for p_arg, f_arg in zip(pattern.args, fact.args):
            if p_arg.startswith('?'):  # Variable
                if p_arg in bindings:
                    if bindings[p_arg] != f_arg:
                        return None  # Inconsistent binding
                else:
                    bindings[p_arg] = f_arg
            elif p_arg != f_arg:  # Constants must match
                return None

        return bindings

    def substitute(self, fact: Fact, bindings: Dict[str, str]) -> Fact:
        """Apply substitution to a fact"""
        new_args = [bindings.get(arg, arg) for arg in fact.args]
        return Fact(fact.predicate, new_args)

    def forward_chain(self, query: Fact) -> bool:
        """Forward chaining inference"""
        new_facts = True

        while new_facts:
            new_facts = False

            # Check if query is already proved
            if query in self.facts or query in self.inferred:
                return True

            # Try to apply each rule
            for rule in self.rules:
                # Try to match all premises
                bindings = {}
                premises_matched = True

                for premise in rule.premises:
                    # Check if premise matches any known fact
                    matched = False
                    for fact in self.facts | self.inferred:
                        unification = self.unify_fact(premise, fact)
                        if unification is not None:
                            bindings.update(unification)
                            matched = True
                            break

                    if not matched:
                        premises_matched = False
                        break

                # If all premises matched, derive conclusion
                if premises_matched:
                    new_fact = self.substitute(rule.conclusion, bindings)
                    if new_fact not in self.facts and new_fact not in self.inferred:
                        self.inferred.add(new_fact)
                        new_facts = True
                        print(f"Inferred: {new_fact}")

        return query in self.facts or query in self.inferred

# Example: Family relationships
fc = ForwardChainer()

# Facts
fc.tell_fact(Fact("Parent", ["Alice", "Bob"]))
fc.tell_fact(Fact("Parent", ["Bob", "Charlie"]))
fc.tell_fact(Fact("Parent", ["Alice", "Diana"]))

# Rules
# Parent(x, y) ∧ Parent(y, z) → Grandparent(x, z)
grandparent_rule = Rule(
    [Fact("Parent", ["?x", "?y"]), Fact("Parent", ["?y", "?z"])],
    Fact("Grandparent", ["?x", "?z"])
)
fc.tell_rule(grandparent_rule)

# Sibling rule: Parent(p, x) ∧ Parent(p, y) → Sibling(x, y)
sibling_rule = Rule(
    [Fact("Parent", ["?p", "?x"]), Fact("Parent", ["?p", "?y"])],
    Fact("Sibling", ["?x", "?y"])
)
fc.tell_rule(sibling_rule)

# Query: Is Alice a grandparent of Charlie?
query = Fact("Grandparent", ["Alice", "Charlie"])
result = fc.forward_chain(query)
print(f"\nQuery: {query}")
print(f"Result: {result}")
```

## Backward Chaining

Backward chaining is a goal-driven inference strategy that starts with the query and works backward to see if it can be proven from known facts.

### Algorithm

1. Start with the query (goal)
2. Find rules that could prove the goal
3. Make the premises of those rules into subgoals
4. Recursively try to prove subgoals
5. Succeed if all subgoals can be proved from facts

### Properties

- **Sound**: Yes
- **Complete**: Yes (for definite clauses)
- **Goal-driven**: Starts from query and moves toward facts
- **Efficient for specific queries**: Doesn't derive irrelevant facts

### Python Implementation

```python
class BackwardChainer:
    def __init__(self):
        self.facts: Set[Fact] = set()
        self.rules: List[Rule] = []
        self.proof_depth = 0

    def tell_fact(self, fact: Fact):
        self.facts.add(fact)

    def tell_rule(self, rule: Rule):
        self.rules.append(rule)

    def unify_fact(self, pattern: Fact, fact: Fact) -> Dict[str, str]:
        """Simple unification for facts"""
        if pattern.predicate != fact.predicate:
            return None
        if len(pattern.args) != len(fact.args):
            return None

        bindings = {}
        for p_arg, f_arg in zip(pattern.args, fact.args):
            if p_arg.startswith('?'):
                if p_arg in bindings:
                    if bindings[p_arg] != f_arg:
                        return None
                else:
                    bindings[p_arg] = f_arg
            elif p_arg != f_arg:
                return None

        return bindings

    def substitute(self, fact: Fact, bindings: Dict[str, str]) -> Fact:
        new_args = [bindings.get(arg, arg) for arg in fact.args]
        return Fact(fact.predicate, new_args)

    def backward_chain(self, goal: Fact, bindings: Dict[str, str] = None) -> bool:
        """Backward chaining inference"""
        if bindings is None:
            bindings = {}

        self.proof_depth += 1
        indent = "  " * self.proof_depth

        # Substitute variables in goal
        goal = self.substitute(goal, bindings)

        print(f"{indent}Trying to prove: {goal}")

        # Check if goal is a known fact
        if goal in self.facts:
            print(f"{indent}✓ Found as fact")
            self.proof_depth -= 1
            return True

        # Try to prove using rules
        for rule in self.rules:
            # Try to unify goal with rule conclusion
            unification = self.unify_fact(rule.conclusion, goal)

            if unification is not None:
                print(f"{indent}Trying rule: {rule}")
                # Merge bindings
                new_bindings = {**bindings, **unification}

                # Try to prove all premises
                all_premises_proved = True
                for premise in rule.premises:
                    premise = self.substitute(premise, new_bindings)
                    if not self.backward_chain(premise, new_bindings):
                        all_premises_proved = False
                        break

                if all_premises_proved:
                    print(f"{indent}✓ Proved using rule")
                    self.proof_depth -= 1
                    return True

        print(f"{indent}✗ Cannot prove")
        self.proof_depth -= 1
        return False

# Example usage
bc = BackwardChainer()

# Facts
bc.tell_fact(Fact("Parent", ["Alice", "Bob"]))
bc.tell_fact(Fact("Parent", ["Bob", "Charlie"]))

# Rule: Parent(x, y) ∧ Parent(y, z) → Grandparent(x, z)
bc.tell_rule(Rule(
    [Fact("Parent", ["?x", "?y"]), Fact("Parent", ["?y", "?z"])],
    Fact("Grandparent", ["?x", "?z"])
))

# Query
query = Fact("Grandparent", ["Alice", "Charlie"])
print(f"Query: {query}\n")
bc.proof_depth = 0
result = bc.backward_chain(query)
print(f"\nResult: {result}")
```

## Forward Chaining vs Backward Chaining

| Aspect | Forward Chaining | Backward Chaining |
|--------|-----------------|-------------------|
| Strategy | Data-driven | Goal-driven |
| Direction | Facts → Goals | Goals → Facts |
| Efficiency | May derive irrelevant facts | Only explores relevant paths |
| Best for | Few facts, many queries | Many facts, specific query |
| Space complexity | Can grow large | More focused |
| Use case | Monitoring, reactive systems | Diagnosis, query answering |

## Completeness in First-Order Logic

For **definite clauses** (Horn clauses), both forward and backward chaining are:
- **Sound**: Only derive true conclusions
- **Complete**: Can derive all entailed atomic sentences
- **Terminating**: For function-free (Datalog) knowledge bases

**Definite clause**: A disjunction of literals with exactly one positive literal
- Example: ¬Human(x) ∨ Mortal(x) (equivalent to Human(x) → Mortal(x))

## Practical Example: Expert System

Here's a simple medical diagnosis system using backward chaining:

```python
# Medical diagnosis expert system
diagnosis_system = BackwardChainer()

# Symptoms (facts)
diagnosis_system.tell_fact(Fact("Symptom", ["patient1", "fever"]))
diagnosis_system.tell_fact(Fact("Symptom", ["patient1", "cough"]))
diagnosis_system.tell_fact(Fact("Symptom", ["patient1", "fatigue"]))

# Diagnostic rules
# Rule 1: Fever ∧ Cough → Flu
diagnosis_system.tell_rule(Rule(
    [Fact("Symptom", ["?p", "fever"]), Fact("Symptom", ["?p", "cough"])],
    Fact("Diagnosis", ["?p", "flu"])
))

# Rule 2: Fever ∧ Fatigue → Infection
diagnosis_system.tell_rule(Rule(
    [Fact("Symptom", ["?p", "fever"]), Fact("Symptom", ["?p", "fatigue"])],
    Fact("Diagnosis", ["?p", "infection"])
))

# Query: Does patient1 have flu?
diagnosis_query = Fact("Diagnosis", ["patient1", "flu"])
print(f"Diagnosing: {diagnosis_query}\n")
diagnosis_system.proof_depth = 0
has_flu = diagnosis_system.backward_chain(diagnosis_query)
print(f"\nDiagnosis result: {'Positive for flu' if has_flu else 'Negative'}")
```

## Key Takeaways

1. **Logical inference** derives new knowledge from existing facts and rules using sound reasoning
2. **Generalized Modus Ponens** extends the basic inference rule to first-order logic with unification
3. **Forward chaining** is data-driven, starting from facts and deriving new facts until the goal is reached
4. **Backward chaining** is goal-driven, starting from the query and working backward to find supporting facts
5. **Both strategies are sound and complete** for definite clauses (Horn clauses)
6. **Forward chaining** is better when there are few facts and many potential queries
7. **Backward chaining** is more efficient for specific queries in large knowledge bases
8. **Unification** is essential for matching patterns with variables to known facts
9. **Expert systems** commonly use backward chaining for diagnosis and forward chaining for monitoring

Understanding these inference mechanisms is crucial for building knowledge-based AI systems that can reason effectively about complex domains. The choice between forward and backward chaining depends on the application: use forward chaining for reactive systems and backward chaining for query-answering systems.
