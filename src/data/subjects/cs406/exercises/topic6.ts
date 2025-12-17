import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'cs406-t6-ex01',
    subjectId: 'cs406',
    topicId: 'cs406-topic-6',
    title: 'Propositional Logic Evaluation',
    difficulty: 2,
    description: `Implement a propositional logic evaluator.

Your implementation should:
- Parse and evaluate propositional formulas
- Support operators: AND, OR, NOT, IMPLIES
- Evaluate formulas given truth assignments
- Check if formulas are tautologies`,
    starterCode: `class PropFormula:
    pass

class Atom(PropFormula):
    def __init__(self, name):
        pass

class Not(PropFormula):
    def __init__(self, formula):
        pass

class And(PropFormula):
    def __init__(self, left, right):
        pass

def evaluate(formula, assignment):
    # Evaluate formula under given assignment
    pass

def is_tautology(formula, variables):
    # Check if formula is true under all assignments
    pass`,
    solution: `from itertools import product

class PropFormula:
    """Base class for propositional formulas."""
    pass

class Atom(PropFormula):
    def __init__(self, name):
        self.name = name

    def evaluate(self, assignment):
        return assignment.get(self.name, False)

    def __repr__(self):
        return self.name

class Not(PropFormula):
    def __init__(self, formula):
        self.formula = formula

    def evaluate(self, assignment):
        return not self.formula.evaluate(assignment)

    def __repr__(self):
        return f"¬{self.formula}"

class And(PropFormula):
    def __init__(self, left, right):
        self.left = left
        self.right = right

    def evaluate(self, assignment):
        return self.left.evaluate(assignment) and self.right.evaluate(assignment)

    def __repr__(self):
        return f"({self.left} ∧ {self.right})"

class Or(PropFormula):
    def __init__(self, left, right):
        self.left = left
        self.right = right

    def evaluate(self, assignment):
        return self.left.evaluate(assignment) or self.right.evaluate(assignment)

    def __repr__(self):
        return f"({self.left} ∨ {self.right})"

class Implies(PropFormula):
    def __init__(self, left, right):
        self.left = left
        self.right = right

    def evaluate(self, assignment):
        return (not self.left.evaluate(assignment)) or self.right.evaluate(assignment)

    def __repr__(self):
        return f"({self.left} → {self.right})"

def evaluate(formula, assignment):
    """Evaluate formula under given truth assignment."""
    return formula.evaluate(assignment)

def is_tautology(formula, variables):
    """Check if formula is true under all possible truth assignments."""
    # Generate all possible assignments
    for values in product([False, True], repeat=len(variables)):
        assignment = dict(zip(variables, values))

        if not formula.evaluate(assignment):
            return False, assignment  # Counterexample

    return True, None

def truth_table(formula, variables):
    """Generate complete truth table for formula."""
    print("Truth table for:", formula)
    print()

    # Header
    header = " | ".join(variables) + " | Result"
    print(header)
    print("-" * len(header))

    # Rows
    for values in product([False, True], repeat=len(variables)):
        assignment = dict(zip(variables, values))
        result = formula.evaluate(assignment)

        row = " | ".join("T" if assignment[v] else "F" for v in variables)
        row += " | " + ("T" if result else "F")
        print(row)

# Test formulas
P = Atom('P')
Q = Atom('Q')
R = Atom('R')

# P ∧ Q
formula1 = And(P, Q)
print("Formula 1:", formula1)
print("Evaluation (P=T, Q=T):", evaluate(formula1, {'P': True, 'Q': True}))
print("Evaluation (P=T, Q=F):", evaluate(formula1, {'P': True, 'Q': False}))
print()

# P → Q (equivalent to ¬P ∨ Q)
formula2 = Implies(P, Q)
print("Formula 2:", formula2)
truth_table(formula2, ['P', 'Q'])
print()

# Tautology: P ∨ ¬P
formula3 = Or(P, Not(P))
print("Formula 3:", formula3)
is_taut, counterex = is_tautology(formula3, ['P'])
print(f"Is tautology: {is_taut}")
print()

# Not a tautology: P ∧ Q
is_taut, counterex = is_tautology(formula1, ['P', 'Q'])
print(f"Formula 1 is tautology: {is_taut}")
if counterex:
    print(f"Counterexample: {counterex}")
print()

# Modus ponens: ((P → Q) ∧ P) → Q
formula4 = Implies(And(Implies(P, Q), P), Q)
print("Formula 4 (Modus Ponens):", formula4)
is_taut, counterex = is_tautology(formula4, ['P', 'Q'])
print(f"Is tautology: {is_taut}")
truth_table(formula4, ['P', 'Q'])`  ,
    testCases: [
      { input: 'evaluate(And(P, Q), {"P": True, "Q": True})', isHidden: false, description: 'Test AND evaluation' },
      { input: 'evaluate(Implies(P, Q), {"P": True, "Q": False})', isHidden: false, description: 'Test IMPLIES evaluation' },
      { input: 'is_tautology(Or(P, Not(P)), ["P"])', isHidden: false, description: 'Test tautology detection (law of excluded middle)' }
    ],
    hints: [
      'Implement evaluate() method for each formula class (Atom, Not, And, Or, Implies)',
      'Implies is equivalent to (NOT left) OR right',
      'For tautology checking, generate all possible truth assignments and verify formula is true for all'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t6-ex02',
    subjectId: 'cs406',
    topicId: 'cs406-topic-6',
    title: 'Resolution Theorem Prover',
    difficulty: 3,
    description: `Implement a resolution-based theorem prover for propositional logic.

Your implementation should:
- Convert formulas to CNF (Conjunctive Normal Form)
- Implement resolution rule
- Detect when empty clause is derived
- Prove theorems by refutation`,
    starterCode: `class Clause:
    def __init__(self, literals):
        # Clause is a set of literals
        pass

def to_cnf(formula):
    # Convert formula to CNF
    # Return: set of clauses
    pass

def resolve(clause1, clause2):
    # Apply resolution rule
    # Return: set of resolvent clauses
    pass

def resolution_prove(kb, query):
    # Prove query from knowledge base using resolution
    pass`,
    solution: `class Literal:
    def __init__(self, atom, negated=False):
        self.atom = atom
        self.negated = negated

    def negate(self):
        return Literal(self.atom, not self.negated)

    def __eq__(self, other):
        return self.atom == other.atom and self.negated == other.negated

    def __hash__(self):
        return hash((self.atom, self.negated))

    def __repr__(self):
        return f"¬{self.atom}" if self.negated else self.atom

class Clause:
    def __init__(self, literals):
        self.literals = frozenset(literals)

    def is_empty(self):
        return len(self.literals) == 0

    def __eq__(self, other):
        return self.literals == other.literals

    def __hash__(self):
        return hash(self.literals)

    def __repr__(self):
        if self.is_empty():
            return "□"  # Empty clause
        return "{" + " ∨ ".join(str(lit) for lit in self.literals) + "}"

def resolve(clause1, clause2):
    """
    Apply resolution rule to two clauses.
    Returns: set of resolvent clauses (may be empty)
    """
    resolvents = set()

    # Try to resolve on each pair of complementary literals
    for lit1 in clause1.literals:
        for lit2 in clause2.literals:
            # Check if complementary
            if lit1.atom == lit2.atom and lit1.negated != lit2.negated:
                # Resolve: remove complementary pair, union the rest
                new_literals = (clause1.literals - {lit1}) | (clause2.literals - {lit2})
                resolvent = Clause(new_literals)
                resolvents.add(resolvent)

    return resolvents

def resolution_prove(clauses, query_clause):
    """
    Prove query using resolution (by refutation).
    Negate query and add to KB, derive empty clause.

    clauses: set of Clause objects (KB in CNF)
    query_clause: Clause to prove

    Returns: (proved, steps) where steps shows derivation
    """
    # Negate query and add to clauses
    # (Query is a clause, negating means we try to prove its negation leads to contradiction)
    clauses = set(clauses)
    clauses.add(query_clause)

    new_clauses = set()
    steps = []

    iteration = 0
    max_iterations = 100

    while iteration < max_iterations:
        iteration += 1

        # Try resolving all pairs of clauses
        clause_list = list(clauses)

        for i in range(len(clause_list)):
            for j in range(i + 1, len(clause_list)):
                resolvents = resolve(clause_list[i], clause_list[j])

                for resolvent in resolvents:
                    # Check if empty clause derived
                    if resolvent.is_empty():
                        steps.append({
                            'iteration': iteration,
                            'clause1': clause_list[i],
                            'clause2': clause_list[j],
                            'resolvent': resolvent
                        })
                        return True, steps

                    new_clauses.add(resolvent)
                    steps.append({
                        'iteration': iteration,
                        'clause1': clause_list[i],
                        'clause2': clause_list[j],
                        'resolvent': resolvent
                    })

        # Check if no new clauses derived
        if new_clauses.issubset(clauses):
            return False, steps  # Cannot prove

        clauses |= new_clauses

    return False, steps  # Max iterations reached

# Test
# KB: {P → Q, Q → R, P}
# Prove: R

# Convert to CNF:
# P → Q  ≡  ¬P ∨ Q
# Q → R  ≡  ¬Q ∨ R
# P

P = 'P'
Q = 'Q'
R = 'R'

kb = {
    Clause([Literal(P, negated=True), Literal(Q)]),  # ¬P ∨ Q
    Clause([Literal(Q, negated=True), Literal(R)]),  # ¬Q ∨ R
    Clause([Literal(P)])  # P
}

# Query: R
# To prove R, we negate it and try to derive empty clause
# ¬R
query = Clause([Literal(R, negated=True)])

print("Knowledge Base:")
for clause in kb:
    print(f"  {clause}")
print(f"\\nQuery (negated): {query}")
print()

proved, steps = resolution_prove(kb, query)

print(f"Proved: {proved}")
print(f"\\nDerivation steps:")
for step in steps[-10:]:  # Show last 10 steps
    print(f"  {step['clause1']} + {step['clause2']} → {step['resolvent']}")

# Another example: Modus Ponens
print("\\n" + "="*50)
print("Example 2: Modus Ponens")
print("="*50)

# KB: {P → Q, P}
# Prove: Q

A = 'A'
B = 'B'

kb2 = {
    Clause([Literal(A, negated=True), Literal(B)]),  # ¬A ∨ B (A → B)
    Clause([Literal(A)])  # A
}

query2 = Clause([Literal(B, negated=True)])  # Prove B (negate it)

print("Knowledge Base:")
for clause in kb2:
    print(f"  {clause}")
print(f"\\nQuery (negated): {query2}")

proved2, steps2 = resolution_prove(kb2, query2)

print(f"\\nProved: {proved2}")
print(f"Derivation steps:")
for step in steps2:
    print(f"  {step['clause1']} + {step['clause2']} → {step['resolvent']}")`  ,
    testCases: [
      { input: 'resolve(clause1, clause2)', isHidden: false, description: 'Test resolution produces correct resolvent' },
      { input: 'resolution_prove(kb, query)', isHidden: false, description: 'Test resolution proves valid theorem' },
      { input: 'empty clause derivation', isHidden: false, description: 'Test proof by refutation derives empty clause' }
    ],
    hints: [
      'Resolution rule: if one clause contains literal L and another contains ¬L, create new clause with all literals except L and ¬L',
      'To prove a query, negate it and add to KB, then try to derive the empty clause (contradiction)',
      'Keep track of which clauses have been resolved to avoid infinite loops'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t6-ex03',
    subjectId: 'cs406',
    topicId: 'cs406-topic-6',
    title: 'First-Order Logic Unification',
    difficulty: 4,
    description: `Implement unification for first-order logic terms.

Your implementation should:
- Represent FOL terms (constants, variables, functions)
- Implement occur check
- Find most general unifier (MGU) for two terms
- Handle complex nested terms`,
    starterCode: `class Term:
    pass

class Constant(Term):
    pass

class Variable(Term):
    pass

class Function(Term):
    pass

def unify(term1, term2, subst=None):
    # Find most general unifier
    # Returns: substitution dict or None if unification fails
    pass

def apply_subst(term, subst):
    # Apply substitution to term
    pass`,
    solution: `class Term:
    """Base class for FOL terms."""
    pass

class Constant(Term):
    def __init__(self, name):
        self.name = name

    def __eq__(self, other):
        return isinstance(other, Constant) and self.name == other.name

    def __hash__(self):
        return hash(('const', self.name))

    def __repr__(self):
        return self.name

class Variable(Term):
    def __init__(self, name):
        self.name = name

    def __eq__(self, other):
        return isinstance(other, Variable) and self.name == other.name

    def __hash__(self):
        return hash(('var', self.name))

    def __repr__(self):
        return f"?{self.name}"

class Function(Term):
    def __init__(self, name, args):
        self.name = name
        self.args = tuple(args)  # List of terms

    def __eq__(self, other):
        return (isinstance(other, Function) and
                self.name == other.name and
                self.args == other.args)

    def __hash__(self):
        return hash(('func', self.name, self.args))

    def __repr__(self):
        args_str = ", ".join(str(arg) for arg in self.args)
        return f"{self.name}({args_str})"

def apply_subst(term, subst):
    """Apply substitution to term."""
    if isinstance(term, Constant):
        return term
    elif isinstance(term, Variable):
        if term in subst:
            # Recursively apply (for transitive substitutions)
            return apply_subst(subst[term], subst)
        return term
    elif isinstance(term, Function):
        new_args = [apply_subst(arg, subst) for arg in term.args]
        return Function(term.name, new_args)

def occur_check(var, term, subst):
    """Check if var occurs in term (prevents infinite structures)."""
    if var == term:
        return True
    elif isinstance(term, Variable) and term in subst:
        return occur_check(var, subst[term], subst)
    elif isinstance(term, Function):
        return any(occur_check(var, arg, subst) for arg in term.args)
    return False

def unify(term1, term2, subst=None):
    """
    Find most general unifier for two terms.
    Returns: substitution dict or None if unification fails
    """
    if subst is None:
        subst = {}

    # Apply current substitution
    term1 = apply_subst(term1, subst)
    term2 = apply_subst(term2, subst)

    # If identical, already unified
    if term1 == term2:
        return subst

    # Variable unification
    if isinstance(term1, Variable):
        if occur_check(term1, term2, subst):
            return None  # Fail
        subst[term1] = term2
        return subst

    if isinstance(term2, Variable):
        if occur_check(term2, term1, subst):
            return None  # Fail
        subst[term2] = term1
        return subst

    # Function unification
    if isinstance(term1, Function) and isinstance(term2, Function):
        # Must have same functor and arity
        if term1.name != term2.name or len(term1.args) != len(term2.args):
            return None  # Fail

        # Unify arguments pairwise
        for arg1, arg2 in zip(term1.args, term2.args):
            subst = unify(arg1, arg2, subst)
            if subst is None:
                return None  # Fail

        return subst

    # Constants or mismatched types
    return None  # Fail

# Test cases
print("="*50)
print("First-Order Logic Unification Tests")
print("="*50)

# Test 1: Constant unification
print("\\nTest 1: Unify constants")
c1 = Constant('a')
c2 = Constant('a')
c3 = Constant('b')

subst = unify(c1, c2)
print(f"unify({c1}, {c2}) = {subst}")

subst = unify(c1, c3)
print(f"unify({c1}, {c3}) = {subst}")

# Test 2: Variable unification
print("\\nTest 2: Unify variables")
x = Variable('X')
y = Variable('Y')
a = Constant('a')

subst = unify(x, a)
print(f"unify({x}, {a}) = {subst}")

subst = unify(x, y)
print(f"unify({x}, {y}) = {subst}")

# Test 3: Function unification
print("\\nTest 3: Unify functions")
# f(X, a) and f(b, Y)
f1 = Function('f', [Variable('X'), Constant('a')])
f2 = Function('f', [Constant('b'), Variable('Y')])

subst = unify(f1, f2)
print(f"unify({f1}, {f2}) = {subst}")

if subst:
    print(f"  {f1} becomes {apply_subst(f1, subst)}")
    print(f"  {f2} becomes {apply_subst(f2, subst)}")

# Test 4: Nested functions
print("\\nTest 4: Nested functions")
# g(X, f(X)) and g(f(Y), Y)
t1 = Function('g', [Variable('X'), Function('f', [Variable('X')])])
t2 = Function('g', [Function('f', [Variable('Y')]), Variable('Y')])

subst = unify(t1, t2)
print(f"unify({t1}, {t2}) = {subst}")

if subst:
    print(f"  {t1} becomes {apply_subst(t1, subst)}")
    print(f"  {t2} becomes {apply_subst(t2, subst)}")

# Test 5: Occur check (should fail)
print("\\nTest 5: Occur check")
# Unify X with f(X) - should fail
x = Variable('X')
fx = Function('f', [x])

subst = unify(x, fx)
print(f"unify({x}, {fx}) = {subst}")
print("  (Should fail due to occur check)")

# Test 6: Complex example
print("\\nTest 6: Complex example")
# loves(X, f(X)) and loves(g(Y), Z)
t1 = Function('loves', [Variable('X'), Function('f', [Variable('X')])])
t2 = Function('loves', [Function('g', [Variable('Y')]), Variable('Z')])

subst = unify(t1, t2)
print(f"unify({t1}, {t2}) = {subst}")

if subst:
    print(f"  {t1} becomes {apply_subst(t1, subst)}")
    print(f"  {t2} becomes {apply_subst(t2, subst)}")`  ,
    testCases: [
      { input: 'unify(Function("f", [Variable("X")]), Function("f", [Constant("a")]))', isHidden: false, description: 'Test unifying function terms' },
      { input: 'unify(Variable("X"), Variable("Y"))', isHidden: false, description: 'Test unifying two variables' },
      { input: 'unify(Variable("X"), Function("f", [Variable("X")]))', isHidden: false, description: 'Test occur check prevents infinite structures' }
    ],
    hints: [
      'Constants unify only with identical constants',
      'Variables unify with anything (but check occur check first)',
      'Functions unify if they have the same name, arity, and all arguments unify',
      'Occur check: variable X cannot unify with a term containing X (like f(X))'
    ],
    language: 'python'
  }
];
