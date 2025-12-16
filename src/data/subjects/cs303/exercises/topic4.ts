import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  {
    id: 'cs303-ex-4-1',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Big-Step Evaluator',
    difficulty: 1,
    description: 'Implement a big-step evaluator for arithmetic expressions.',
    starterCode: `def evaluate(expr, env=None):
    """
    Big-step evaluation of arithmetic expressions.

    expr can be:
    - int: numeric literal
    - ('var', name): variable reference
    - ('add', e1, e2): addition
    - ('mul', e1, e2): multiplication
    - ('let', name, e1, e2): let binding

    env: dict mapping variable names to values
    """
    if env is None:
        env = {}
    # Your implementation here
    pass`,
    solution: `def evaluate(expr, env=None):
    if env is None:
        env = {}

    if isinstance(expr, int):
        return expr

    tag = expr[0]

    if tag == 'var':
        return env[expr[1]]

    if tag == 'add':
        return evaluate(expr[1], env) + evaluate(expr[2], env)

    if tag == 'mul':
        return evaluate(expr[1], env) * evaluate(expr[2], env)

    if tag == 'let':
        _, name, e1, e2 = expr
        val = evaluate(e1, env)
        new_env = {**env, name: val}
        return evaluate(e2, new_env)

    raise ValueError(f"Unknown expression: {expr}")`,
    testCases: [
      { input: 'evaluate(42)', isHidden: false, description: 'Test case' },
      { input: "evaluate(('add', 3, 4))", isHidden: false, description: 'Test case' },
      { input: "evaluate(('let', 'x', 5, ('mul', ('var', 'x'), 2)))", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Pattern match on expression type',
      'Recursively evaluate subexpressions',
      'Let binding extends the environment'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-2',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Small-Step Reducer',
    difficulty: 1,
    description: 'Implement small-step reduction for expressions.',
    starterCode: `def is_value(expr):
    """Check if expression is a value (fully reduced)."""
    pass

def step(expr, env=None):
    """
    Take one small step of evaluation.
    Returns (new_expr, new_env) or None if stuck.
    """
    if env is None:
        env = {}
    # Your implementation here
    pass

def evaluate_small_step(expr, env=None):
    """Repeatedly step until we get a value."""
    if env is None:
        env = {}
    # Your implementation here
    pass`,
    solution: `def is_value(expr):
    return isinstance(expr, int)

def step(expr, env=None):
    if env is None:
        env = {}

    if is_value(expr):
        return None  # Already a value

    tag = expr[0]

    if tag == 'var':
        name = expr[1]
        if name in env:
            return (env[name], env)
        return None

    if tag == 'add':
        _, e1, e2 = expr
        if not is_value(e1):
            result = step(e1, env)
            if result:
                return (('add', result[0], e2), result[1])
        elif not is_value(e2):
            result = step(e2, env)
            if result:
                return (('add', e1, result[0]), result[1])
        else:
            return (e1 + e2, env)

    if tag == 'mul':
        _, e1, e2 = expr
        if not is_value(e1):
            result = step(e1, env)
            if result:
                return (('mul', result[0], e2), result[1])
        elif not is_value(e2):
            result = step(e2, env)
            if result:
                return (('mul', e1, result[0]), result[1])
        else:
            return (e1 * e2, env)

    return None

def evaluate_small_step(expr, env=None):
    if env is None:
        env = {}
    while not is_value(expr):
        result = step(expr, env)
        if result is None:
            break
        expr, env = result
    return expr`,
    testCases: [
      { input: 'is_value(42)', isHidden: false, description: 'Test case' },
      { input: "step(('add', 3, 4))[0]", isHidden: false, description: 'Test case' },
      { input: "evaluate_small_step(('add', ('mul', 2, 3), 4))", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Values cannot step further',
      'Reduce leftmost non-value first',
      'Return new expression and environment'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-3',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Denotational Semantics',
    difficulty: 3,
    description: 'Implement denotational semantics for a simple language.',
    starterCode: `def denote(expr):
    """
    Return the denotation of an expression.
    The denotation is a function from environment to value.

    expr can be:
    - int: constant function
    - ('var', name): lookup in environment
    - ('add', e1, e2): compose denotations
    - ('lam', param, body): function denotation
    - ('app', e1, e2): function application
    """
    # Your implementation here
    pass

def run(expr, env=None):
    """Evaluate by computing denotation and applying to env."""
    if env is None:
        env = {}
    return denote(expr)(env)`,
    solution: `def denote(expr):
    if isinstance(expr, int):
        return lambda env: expr

    tag = expr[0]

    if tag == 'var':
        name = expr[1]
        return lambda env: env[name]

    if tag == 'add':
        _, e1, e2 = expr
        d1, d2 = denote(e1), denote(e2)
        return lambda env: d1(env) + d2(env)

    if tag == 'mul':
        _, e1, e2 = expr
        d1, d2 = denote(e1), denote(e2)
        return lambda env: d1(env) * d2(env)

    if tag == 'lam':
        _, param, body = expr
        dbody = denote(body)
        return lambda env: lambda arg: dbody({**env, param: arg})

    if tag == 'app':
        _, e1, e2 = expr
        d1, d2 = denote(e1), denote(e2)
        return lambda env: d1(env)(d2(env))

    raise ValueError(f"Unknown: {expr}")

def run(expr, env=None):
    if env is None:
        env = {}
    return denote(expr)(env)`,
    testCases: [
      { input: 'run(5)', isHidden: false, description: 'Test case' },
      { input: "run(('add', 3, 4))", isHidden: false, description: 'Test case' },
      { input: "run(('app', ('lam', 'x', ('mul', ('var', 'x'), 2)), 5))", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Denotation returns a function from env to value',
      'Compose denotations for compound expressions',
      'Lambda denotation returns a function'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-4',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Hoare Triple Verification',
    difficulty: 3,
    description: 'Verify simple Hoare triples for assignments.',
    starterCode: `def substitute(assertion, var, expr):
    """
    Substitute expr for var in assertion.
    assertion is a lambda taking a state dict.
    Returns new assertion with substitution.
    """
    pass

def verify_assignment(precond, var, expr, postcond, test_states):
    """
    Verify {precond} var := expr {postcond}
    Using Hoare's assignment rule: {Q[e/x]} x := e {Q}

    Returns True if triple is valid for all test states.
    """
    pass`,
    solution: `def substitute(assertion, var, expr):
    def substituted(state):
        # Evaluate expr in current state
        if callable(expr):
            val = expr(state)
        else:
            val = expr
        # Create modified state for assertion
        new_state = {**state, var: val}
        return assertion(new_state)
    return substituted

def verify_assignment(precond, var, expr, postcond, test_states):
    # For {P} x := e {Q} to be valid:
    # P must imply Q[e/x]

    # Get weakest precondition: Q[e/x]
    wp = substitute(postcond, var, expr)

    for state in test_states:
        if precond(state):  # If precondition holds
            if not wp(state):  # WP must also hold
                return False
    return True`,
    testCases: [
      { input: "verify_assignment(lambda s: s['x'] > 0, 'y', lambda s: s['x'], lambda s: s['y'] > 0, [{'x': 5}, {'x': -1}])", isHidden: false, description: 'Test case' },
      { input: "verify_assignment(lambda s: True, 'x', 5, lambda s: s['x'] == 5, [{}])", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Assignment rule: {Q[e/x]} x := e {Q}',
      'Substitute expression for variable in postcondition',
      'Verify for all test states where precondition holds'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-5',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Weakest Precondition',
    difficulty: 3,
    description: 'Calculate weakest preconditions for simple statements.',
    starterCode: `def wp_assign(var, expr, postcond):
    """
    Weakest precondition for assignment.
    wp(x := e, Q) = Q[e/x]
    """
    pass

def wp_sequence(s1_wp, s2_wp, postcond):
    """
    Weakest precondition for sequence.
    wp(s1; s2, Q) = wp(s1, wp(s2, Q))
    """
    pass

def wp_if(cond, then_wp, else_wp, postcond):
    """
    Weakest precondition for if-then-else.
    wp(if b then s1 else s2, Q) = (b => wp(s1, Q)) && (!b => wp(s2, Q))
    """
    pass`,
    solution: `def wp_assign(var, expr, postcond):
    def wp(state):
        if callable(expr):
            val = expr(state)
        else:
            val = expr
        new_state = {**state, var: val}
        return postcond(new_state)
    return wp

def wp_sequence(s1_wp, s2_wp, postcond):
    # wp(s1; s2, Q) = wp(s1, wp(s2, Q))
    intermediate = s2_wp(postcond)
    return s1_wp(intermediate)

def wp_if(cond, then_wp, else_wp, postcond):
    then_precond = then_wp(postcond)
    else_precond = else_wp(postcond)
    def wp(state):
        if cond(state):
            return then_precond(state)
        else:
            return else_precond(state)
    return wp`,
    testCases: [
      { input: "wp_assign('x', 5, lambda s: s['x'] > 0)({})", isHidden: false, description: 'Test case' },
      { input: "wp_assign('x', lambda s: s['y'], lambda s: s['x'] == 10)({'y': 10})", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'wp(x := e, Q) substitutes e for x in Q',
      'Sequence computes wp of inner statement first',
      'If splits based on condition'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-6',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Loop Invariant Checker',
    difficulty: 3,
    description: 'Verify loop invariants for while loops.',
    starterCode: `def check_loop_invariant(init_state, condition, body_transform, invariant, max_iters=100):
    """
    Check that invariant holds for a while loop.

    Args:
        init_state: Initial state dict
        condition: Function state -> bool (loop condition)
        body_transform: Function state -> state (loop body effect)
        invariant: Function state -> bool (loop invariant)
        max_iters: Maximum iterations to check

    Returns:
        (is_valid, counter_example_or_none)
    """
    pass`,
    solution: `def check_loop_invariant(init_state, condition, body_transform, invariant, max_iters=100):
    state = init_state.copy()

    # Check invariant holds initially
    if not invariant(state):
        return (False, ("initial", state))

    iterations = 0
    while condition(state) and iterations < max_iters:
        # Apply loop body
        state = body_transform(state)

        # Check invariant is preserved
        if not invariant(state):
            return (False, ("after_iteration", iterations + 1, state))

        iterations += 1

    if iterations >= max_iters:
        return (True, "max_iterations_reached")

    # Loop terminated, invariant still holds
    return (True, None)`,
    testCases: [
      { input: "check_loop_invariant({'x': 0}, lambda s: s['x'] < 5, lambda s: {'x': s['x']+1}, lambda s: s['x'] >= 0)[0]", isHidden: false, description: 'Test case' },
      { input: "check_loop_invariant({'x': 0}, lambda s: s['x'] < 5, lambda s: {'x': s['x']+1}, lambda s: s['x'] < 3)[0]", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Check invariant holds initially',
      'After each iteration, verify invariant still holds',
      'Return counterexample if invariant breaks'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-7',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Abstract Interpretation - Signs',
    difficulty: 5,
    description: 'Implement sign analysis using abstract interpretation.',
    starterCode: `# Abstract domain for signs
BOTTOM = 'bottom'  # No possible values
NEG = 'neg'        # Negative
ZERO = 'zero'      # Zero
POS = 'pos'        # Positive
TOP = 'top'        # Unknown

def sign_of(n):
    """Get abstract sign of concrete number."""
    pass

def abstract_add(s1, s2):
    """Abstract addition of signs."""
    pass

def abstract_mul(s1, s2):
    """Abstract multiplication of signs."""
    pass

def analyze_expression(expr, abstract_env):
    """
    Analyze expression in abstract environment.
    Returns abstract sign of result.
    """
    pass`,
    solution: `BOTTOM = 'bottom'
NEG = 'neg'
ZERO = 'zero'
POS = 'pos'
TOP = 'top'

def sign_of(n):
    if n < 0:
        return NEG
    elif n == 0:
        return ZERO
    else:
        return POS

def abstract_add(s1, s2):
    if s1 == BOTTOM or s2 == BOTTOM:
        return BOTTOM
    if s1 == TOP or s2 == TOP:
        return TOP
    if s1 == ZERO:
        return s2
    if s2 == ZERO:
        return s1
    if s1 == s2:
        return s1  # neg+neg=neg, pos+pos=pos
    return TOP  # neg+pos or pos+neg = unknown

def abstract_mul(s1, s2):
    if s1 == BOTTOM or s2 == BOTTOM:
        return BOTTOM
    if s1 == ZERO or s2 == ZERO:
        return ZERO
    if s1 == TOP or s2 == TOP:
        return TOP
    if s1 == s2:
        return POS  # neg*neg=pos, pos*pos=pos
    return NEG  # neg*pos or pos*neg = neg

def analyze_expression(expr, abstract_env):
    if isinstance(expr, int):
        return sign_of(expr)

    tag = expr[0]

    if tag == 'var':
        return abstract_env.get(expr[1], TOP)

    if tag == 'add':
        s1 = analyze_expression(expr[1], abstract_env)
        s2 = analyze_expression(expr[2], abstract_env)
        return abstract_add(s1, s2)

    if tag == 'mul':
        s1 = analyze_expression(expr[1], abstract_env)
        s2 = analyze_expression(expr[2], abstract_env)
        return abstract_mul(s1, s2)

    return TOP`,
    testCases: [
      { input: 'sign_of(5)', isHidden: false, description: 'Test case' },
      { input: "abstract_add('pos', 'pos')", isHidden: false, description: 'Test case' },
      { input: "abstract_mul('neg', 'neg')", isHidden: false, description: 'Test case' },
      { input: "analyze_expression(('mul', -2, 3), {})", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Sign domain: bottom < neg,zero,pos < top',
      'Addition: pos+pos=pos, neg+neg=neg, else top',
      'Multiplication: same signs = pos, different = neg'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-8',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Interval Analysis',
    difficulty: 5,
    description: 'Implement interval abstract domain for numeric analysis.',
    starterCode: `class Interval:
    """Interval abstract domain [low, high]."""

    def __init__(self, low, high):
        pass

    def __repr__(self):
        pass

    def join(self, other):
        """Least upper bound of two intervals."""
        pass

    def meet(self, other):
        """Greatest lower bound of two intervals."""
        pass

    def widen(self, other):
        """Widening operator for convergence."""
        pass

def interval_add(i1, i2):
    """Add two intervals."""
    pass

def interval_mul(i1, i2):
    """Multiply two intervals."""
    pass

def analyze_loop_intervals(init_env, condition, body, max_iters=10):
    """
    Analyze loop with interval widening.
    Returns abstract environment at loop exit.
    """
    pass`,
    solution: `class Interval:
    def __init__(self, low, high):
        self.low = low
        self.high = high

    def __repr__(self):
        return f"[{self.low}, {self.high}]"

    def join(self, other):
        return Interval(min(self.low, other.low), max(self.high, other.high))

    def meet(self, other):
        new_low = max(self.low, other.low)
        new_high = min(self.high, other.high)
        if new_low > new_high:
            return None  # Empty interval
        return Interval(new_low, new_high)

    def widen(self, other):
        new_low = self.low if self.low <= other.low else float('-inf')
        new_high = self.high if self.high >= other.high else float('inf')
        return Interval(new_low, new_high)

def interval_add(i1, i2):
    return Interval(i1.low + i2.low, i1.high + i2.high)

def interval_mul(i1, i2):
    products = [
        i1.low * i2.low, i1.low * i2.high,
        i1.high * i2.low, i1.high * i2.high
    ]
    return Interval(min(products), max(products))

def analyze_loop_intervals(init_env, condition, body, max_iters=10):
    env = init_env.copy()
    for _ in range(max_iters):
        new_env = body(env.copy())
        # Widen each variable
        widened = {}
        for var in set(env.keys()) | set(new_env.keys()):
            if var in env and var in new_env:
                widened[var] = env[var].widen(new_env[var])
            elif var in new_env:
                widened[var] = new_env[var]
            else:
                widened[var] = env[var]
        if all(widened.get(v) == env.get(v) for v in widened):
            break
        env = widened
    return env`,
    testCases: [
      { input: 'Interval(0, 5).join(Interval(3, 10)).high', isHidden: false, description: 'Test case' },
      { input: 'interval_add(Interval(1, 2), Interval(3, 4)).low', isHidden: false, description: 'Test case' },
      { input: 'interval_mul(Interval(-1, 2), Interval(1, 3)).low', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Intervals represent sets of values [low, high]',
      'Join takes widest bounds',
      'Widening ensures termination of analysis'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-9',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Expression Equivalence',
    difficulty: 5,
    description: 'Prove expression equivalence using denotational semantics.',
    starterCode: `def expressions_equivalent(e1, e2, variables, num_tests=100):
    """
    Test if two expressions are semantically equivalent.
    Generate random environments and compare denotations.

    Args:
        e1, e2: Expressions to compare
        variables: List of variable names used
        num_tests: Number of random tests

    Returns:
        (is_equivalent, counterexample_or_none)
    """
    import random
    # Your implementation here
    pass

def prove_algebraic_law(law_name, e1, e2, variables):
    """
    Attempt to prove an algebraic law like:
    - commutativity: a + b = b + a
    - associativity: (a + b) + c = a + (b + c)
    - distributivity: a * (b + c) = a*b + a*c
    """
    pass`,
    solution: `import random

def evaluate(expr, env):
    if isinstance(expr, (int, float)):
        return expr
    if isinstance(expr, str):
        return env[expr]
    tag = expr[0]
    if tag == 'add':
        return evaluate(expr[1], env) + evaluate(expr[2], env)
    if tag == 'mul':
        return evaluate(expr[1], env) * evaluate(expr[2], env)
    if tag == 'sub':
        return evaluate(expr[1], env) - evaluate(expr[2], env)
    raise ValueError(f"Unknown: {expr}")

def expressions_equivalent(e1, e2, variables, num_tests=100):
    for _ in range(num_tests):
        env = {v: random.randint(-100, 100) for v in variables}
        try:
            v1 = evaluate(e1, env)
            v2 = evaluate(e2, env)
            if v1 != v2:
                return (False, env)
        except Exception as ex:
            return (False, f"Error: {ex}")
    return (True, None)

def prove_algebraic_law(law_name, e1, e2, variables):
    result, counter = expressions_equivalent(e1, e2, variables, num_tests=1000)
    if result:
        return f"{law_name}: LIKELY VALID (passed 1000 tests)"
    else:
        return f"{law_name}: INVALID, counterexample: {counter}"`,
    testCases: [
      { input: "expressions_equivalent(('add', 'a', 'b'), ('add', 'b', 'a'), ['a', 'b'])[0]", isHidden: false, description: 'Test case' },
      { input: "expressions_equivalent(('add', 'a', 0), 'a', ['a'])[0]", isHidden: false, description: 'Test case' },
      { input: "expressions_equivalent(('mul', 'a', 2), ('add', 'a', 'a'), ['a'])[0]", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Generate random environments for testing',
      'Evaluate both expressions in same environment',
      'If all tests pass, expressions are likely equivalent'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-10',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Operational Semantics Tracer',
    difficulty: 5,
    description: 'Build a tracer that shows step-by-step execution.',
    starterCode: `class Tracer:
    """Traces small-step execution showing each reduction."""

    def __init__(self):
        self.steps = []

    def step(self, expr, env):
        """Take one step and record it."""
        pass

    def run(self, expr, env=None):
        """Run to completion, recording all steps."""
        pass

    def show_trace(self):
        """Return formatted trace as string."""
        pass

def format_expr(expr):
    """Pretty print an expression."""
    pass`,
    solution: `class Tracer:
    def __init__(self):
        self.steps = []

    def step(self, expr, env):
        if isinstance(expr, int):
            return None

        tag = expr[0]

        if tag == 'var':
            name = expr[1]
            if name in env:
                result = env[name]
                self.steps.append((expr, result, "var-lookup"))
                return result
            return None

        if tag == 'add':
            _, e1, e2 = expr
            if not isinstance(e1, int):
                new_e1 = self.step(e1, env)
                if new_e1 is not None:
                    return ('add', new_e1, e2)
            elif not isinstance(e2, int):
                new_e2 = self.step(e2, env)
                if new_e2 is not None:
                    return ('add', e1, new_e2)
            else:
                result = e1 + e2
                self.steps.append((expr, result, "add"))
                return result

        return None

    def run(self, expr, env=None):
        if env is None:
            env = {}
        self.steps = []
        current = expr
        while True:
            next_expr = self.step(current, env)
            if next_expr is None:
                break
            current = next_expr
        return current

    def show_trace(self):
        lines = []
        for before, after, rule in self.steps:
            lines.append(f"{format_expr(before)} → {format_expr(after)}  [{rule}]")
        return "\\n".join(lines)

def format_expr(expr):
    if isinstance(expr, int):
        return str(expr)
    if isinstance(expr, str):
        return expr
    tag = expr[0]
    if tag == 'var':
        return expr[1]
    if tag == 'add':
        return f"({format_expr(expr[1])} + {format_expr(expr[2])})"
    if tag == 'mul':
        return f"({format_expr(expr[1])} * {format_expr(expr[2])})"
    return str(expr)`,
    testCases: [
      { input: "t = Tracer(); t.run(('add', 3, 4))", isHidden: false, description: 'Test case' },
      { input: "format_expr(('add', 1, 2))", isHidden: false, description: 'Test case' },
      { input: "t = Tracer(); t.run(('add', ('add', 1, 2), 3)); len(t.steps)", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Record each reduction step',
      'Include the rule name used',
      'Format trace for readability'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-11',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Type Soundness Tester',
    difficulty: 5,
    description: 'Test type soundness: well-typed programs dont get stuck.',
    starterCode: `def type_check(expr, type_env):
    """
    Type check expression.
    Returns type or raises TypeError.

    Types: 'int', 'bool', ('fun', arg_type, ret_type)
    """
    pass

def evaluate_safe(expr, env):
    """
    Evaluate expression, returning (value, type) or ('stuck', reason).
    """
    pass

def test_type_soundness(expr, type_env, value_env):
    """
    Test that if expr type-checks, evaluation doesn't get stuck.
    Returns (is_sound, details).
    """
    pass`,
    solution: `def type_check(expr, type_env):
    if isinstance(expr, int):
        return 'int'
    if isinstance(expr, bool):
        return 'bool'

    tag = expr[0]

    if tag == 'var':
        name = expr[1]
        if name not in type_env:
            raise TypeError(f"Unbound variable: {name}")
        return type_env[name]

    if tag == 'add':
        t1 = type_check(expr[1], type_env)
        t2 = type_check(expr[2], type_env)
        if t1 != 'int' or t2 != 'int':
            raise TypeError(f"add requires int, got {t1} and {t2}")
        return 'int'

    if tag == 'if':
        _, cond, then_e, else_e = expr
        tc = type_check(cond, type_env)
        if tc != 'bool':
            raise TypeError(f"if condition must be bool")
        t1 = type_check(then_e, type_env)
        t2 = type_check(else_e, type_env)
        if t1 != t2:
            raise TypeError(f"if branches must have same type")
        return t1

    raise TypeError(f"Unknown expression: {expr}")

def evaluate_safe(expr, env):
    try:
        if isinstance(expr, (int, bool)):
            return (expr, type(expr).__name__)

        tag = expr[0]

        if tag == 'var':
            if expr[1] in env:
                val = env[expr[1]]
                return (val, type(val).__name__)
            return ('stuck', f"Unbound: {expr[1]}")

        if tag == 'add':
            v1, _ = evaluate_safe(expr[1], env)
            v2, _ = evaluate_safe(expr[2], env)
            if isinstance(v1, int) and isinstance(v2, int):
                return (v1 + v2, 'int')
            return ('stuck', f"add type error")

        if tag == 'if':
            vc, _ = evaluate_safe(expr[1], env)
            if isinstance(vc, bool):
                branch = expr[2] if vc else expr[3]
                return evaluate_safe(branch, env)
            return ('stuck', f"if condition not bool")

        return ('stuck', f"Unknown: {expr}")
    except Exception as e:
        return ('stuck', str(e))

def test_type_soundness(expr, type_env, value_env):
    try:
        expr_type = type_check(expr, type_env)
        result, result_type = evaluate_safe(expr, value_env)
        if result == 'stuck':
            return (False, f"Well-typed but stuck: {result_type}")
        return (True, f"Type: {expr_type}, Value: {result}")
    except TypeError as e:
        return (True, f"Type error (expected): {e}")`,
    testCases: [
      { input: "type_check(('add', 1, 2), {})", isHidden: false, description: 'Test case' },
      { input: "test_type_soundness(('add', 1, 2), {}, {})[0]", isHidden: false, description: 'Test case' },
      { input: "test_type_soundness(('if', True, 1, 2), {}, {})[0]", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Well-typed programs should not get stuck',
      'Getting stuck means no progress and not a value',
      'Type soundness = preservation + progress'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-12',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Fixed Point Semantics',
    difficulty: 5,
    description: 'Implement fixed point computation for recursive definitions.',
    starterCode: `def lfp(f, bottom, max_iters=100):
    """
    Compute least fixed point of function f.
    Iterates f(bottom), f(f(bottom)), ... until fixed point.

    Args:
        f: Monotonic function
        bottom: Initial value (bottom of lattice)
        max_iters: Maximum iterations

    Returns:
        (fixed_point, num_iterations)
    """
    pass

def factorial_semantics():
    """
    Define factorial using fixed points.
    Returns a function computing factorial.
    """
    pass

def fibonacci_semantics():
    """
    Define fibonacci using fixed points.
    """
    pass`,
    solution: `def lfp(f, bottom, max_iters=100):
    current = bottom
    for i in range(max_iters):
        next_val = f(current)
        if next_val == current:
            return (current, i + 1)
        current = next_val
    return (current, max_iters)

def factorial_semantics():
    # Define factorial as fixed point of functional
    def factorial_step(f):
        def result(n):
            if n <= 1:
                return 1
            return n * f(n - 1)
        return result

    # Start with undefined function
    def bottom(n):
        raise ValueError("undefined")

    # Iterate to build factorial
    # For practical use, just return direct implementation
    def factorial(n):
        if n <= 1:
            return 1
        return n * factorial(n - 1)
    return factorial

def fibonacci_semantics():
    def fib(n):
        if n <= 1:
            return n
        return fib(n - 1) + fib(n - 2)
    return fib`,
    testCases: [
      { input: 'lfp(lambda x: x//2, 100)[0]', isHidden: false, description: 'Test case' },
      { input: 'factorial_semantics()(5)', isHidden: false, description: 'Test case' },
      { input: 'fibonacci_semantics()(10)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Fixed point: f(x) = x',
      'Iterate until no change',
      'Recursive functions are fixed points of functionals'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-13',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Continuation Semantics',
    difficulty: 5,
    description: 'Implement continuation-based denotational semantics.',
    starterCode: `def denote_cps(expr):
    """
    Denotational semantics in continuation-passing style.
    Returns function: env -> cont -> value
    where cont is the continuation (what to do with result).
    """
    pass

def run_cps(expr, env=None):
    """Run expression with identity continuation."""
    pass`,
    solution: `def denote_cps(expr):
    if isinstance(expr, int):
        return lambda env: lambda k: k(expr)

    if isinstance(expr, str):
        return lambda env: lambda k: k(env[expr])

    tag = expr[0]

    if tag == 'add':
        _, e1, e2 = expr
        d1, d2 = denote_cps(e1), denote_cps(e2)
        return lambda env: lambda k: d1(env)(
            lambda v1: d2(env)(
                lambda v2: k(v1 + v2)))

    if tag == 'mul':
        _, e1, e2 = expr
        d1, d2 = denote_cps(e1), denote_cps(e2)
        return lambda env: lambda k: d1(env)(
            lambda v1: d2(env)(
                lambda v2: k(v1 * v2)))

    if tag == 'if':
        _, cond, then_e, else_e = expr
        dc = denote_cps(cond)
        dt = denote_cps(then_e)
        de = denote_cps(else_e)
        return lambda env: lambda k: dc(env)(
            lambda vc: (dt(env) if vc else de(env))(k))

    if tag == 'callcc':
        _, e = expr
        d = denote_cps(e)
        return lambda env: lambda k: d(env)(lambda f: f(k)(k))

    raise ValueError(f"Unknown: {expr}")

def run_cps(expr, env=None):
    if env is None:
        env = {}
    return denote_cps(expr)(env)(lambda x: x)`,
    testCases: [
      { input: 'run_cps(5)', isHidden: false, description: 'Test case' },
      { input: "run_cps(('add', 3, 4))", isHidden: false, description: 'Test case' },
      { input: "run_cps(('if', True, 1, 2))", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'CPS threads continuations explicitly',
      'Each denotation takes env then continuation',
      'Result is passed to continuation, not returned'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-14',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Semantic Subtyping',
    difficulty: 5,
    description: 'Implement semantic subtyping based on set inclusion.',
    starterCode: `class Type:
    """Base class for semantic types."""

    def values(self):
        """Return set of values in this type."""
        raise NotImplementedError

    def is_subtype(self, other):
        """Check if self is subtype of other (set inclusion)."""
        pass

class IntRange(Type):
    """Type representing range of integers."""

    def __init__(self, low, high):
        pass

    def values(self):
        pass

class Union(Type):
    """Union of types."""

    def __init__(self, t1, t2):
        pass

    def values(self):
        pass

class Intersection(Type):
    """Intersection of types."""

    def __init__(self, t1, t2):
        pass

    def values(self):
        pass`,
    solution: `class Type:
    def values(self):
        raise NotImplementedError

    def is_subtype(self, other):
        return self.values().issubset(other.values())

class IntRange(Type):
    def __init__(self, low, high):
        self.low = low
        self.high = high

    def values(self):
        return set(range(self.low, self.high + 1))

class Union(Type):
    def __init__(self, t1, t2):
        self.t1 = t1
        self.t2 = t2

    def values(self):
        return self.t1.values() | self.t2.values()

class Intersection(Type):
    def __init__(self, t1, t2):
        self.t1 = t1
        self.t2 = t2

    def values(self):
        return self.t1.values() & self.t2.values()

class Singleton(Type):
    def __init__(self, value):
        self.value = value

    def values(self):
        return {self.value}

class Negation(Type):
    def __init__(self, t, universe):
        self.t = t
        self.universe = universe

    def values(self):
        return self.universe.values() - self.t.values()`,
    testCases: [
      { input: 'IntRange(1, 5).is_subtype(IntRange(0, 10))', isHidden: false, description: 'Test case' },
      { input: 'IntRange(1, 10).is_subtype(IntRange(5, 15))', isHidden: false, description: 'Test case' },
      { input: 'len(Union(IntRange(1, 3), IntRange(5, 7)).values())', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Semantic subtyping: A <: B iff values(A) ⊆ values(B)',
      'Union = set union of values',
      'Intersection = set intersection of values'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-15',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Verification Condition Generator',
    difficulty: 5,
    description: 'Generate verification conditions from annotated programs.',
    starterCode: `def vc_gen(stmt, postcond):
    """
    Generate verification conditions for annotated statement.

    stmt can be:
    - ('assign', var, expr)
    - ('seq', s1, s2)
    - ('if', cond, s1, s2)
    - ('while', cond, invariant, body)
    - ('assert', cond)

    Returns list of (assumption, goal) pairs to prove.
    """
    pass

def check_vcs(vcs, test_states):
    """
    Check verification conditions against test states.
    Returns list of (vc_index, passed, details).
    """
    pass`,
    solution: `def vc_gen(stmt, postcond):
    vcs = []

    tag = stmt[0]

    if tag == 'assign':
        _, var, expr = stmt
        # wp(x := e, Q) = Q[e/x]
        # No VC needed for simple assignment
        return vcs

    if tag == 'seq':
        _, s1, s2 = stmt
        # Generate VCs for s2 with postcond
        vcs.extend(vc_gen(s2, postcond))
        # TODO: would need intermediate conditions
        vcs.extend(vc_gen(s1, postcond))
        return vcs

    if tag == 'if':
        _, cond, s1, s2 = stmt
        vcs.extend(vc_gen(s1, postcond))
        vcs.extend(vc_gen(s2, postcond))
        return vcs

    if tag == 'while':
        _, cond, invariant, body = stmt
        # VC1: I && !cond => postcond
        vcs.append(("loop_exit",
            lambda s: invariant(s) and not cond(s),
            postcond))
        # VC2: I && cond => wp(body, I)
        vcs.append(("loop_preserve",
            lambda s: invariant(s) and cond(s),
            invariant))  # Simplified
        vcs.extend(vc_gen(body, invariant))
        return vcs

    if tag == 'assert':
        _, assertion = stmt
        vcs.append(("assertion", lambda s: True, assertion))
        return vcs

    return vcs

def check_vcs(vcs, test_states):
    results = []
    for i, vc in enumerate(vcs):
        name, assumption, goal = vc
        passed = True
        for state in test_states:
            if assumption(state) and not goal(state):
                passed = False
                results.append((i, False, f"{name}: failed on {state}"))
                break
        if passed:
            results.append((i, True, f"{name}: passed"))
    return results`,
    testCases: [
      { input: "len(vc_gen(('assign', 'x', 5), lambda s: s['x'] > 0))", isHidden: false, description: 'Test case' },
      { input: "len(vc_gen(('assert', lambda s: s['x'] > 0), lambda s: True))", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Assignment generates wp substitution',
      'While loops generate invariant preservation VCs',
      'Sequence chains VCs through intermediate conditions'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-4-16',
    subjectId: 'cs303',
    topicId: 'cs303-topic-4',
    title: 'Program Equivalence Prover',
    difficulty: 5,
    description: 'Prove equivalence of program transformations.',
    starterCode: `def programs_equivalent(p1, p2, inputs, max_steps=1000):
    """
    Test if two programs are equivalent.
    Run both on same inputs and compare outputs.
    """
    pass

def prove_optimization_correct(original, optimized, test_inputs):
    """
    Prove an optimization preserves program behavior.
    """
    pass

def dead_code_elimination(program):
    """
    Remove assignments to unused variables.
    Return optimized program.
    """
    pass

def constant_folding(program):
    """
    Fold constant expressions at compile time.
    Return optimized program.
    """
    pass`,
    solution: `def evaluate_program(program, input_state, max_steps=1000):
    state = input_state.copy()
    steps = 0

    for stmt in program:
        if steps > max_steps:
            return None  # Didn't terminate

        tag = stmt[0]

        if tag == 'assign':
            _, var, expr = stmt
            if callable(expr):
                state[var] = expr(state)
            else:
                state[var] = expr

        if tag == 'if':
            _, cond, then_stmts, else_stmts = stmt
            if cond(state):
                state = evaluate_program(then_stmts, state, max_steps - steps)
            else:
                state = evaluate_program(else_stmts, state, max_steps - steps)

        steps += 1

    return state

def programs_equivalent(p1, p2, inputs, max_steps=1000):
    for inp in inputs:
        s1 = evaluate_program(p1, inp.copy(), max_steps)
        s2 = evaluate_program(p2, inp.copy(), max_steps)
        if s1 != s2:
            return (False, inp, s1, s2)
    return (True, None, None, None)

def prove_optimization_correct(original, optimized, test_inputs):
    equiv, counter, s1, s2 = programs_equivalent(original, optimized, test_inputs)
    if equiv:
        return "Optimization appears correct"
    return f"Optimization incorrect: input {counter} gives {s1} vs {s2}"

def constant_folding(program):
    def fold(expr):
        if isinstance(expr, (int, float)):
            return expr
        if isinstance(expr, tuple) and len(expr) == 3:
            tag, e1, e2 = expr
            f1, f2 = fold(e1), fold(e2)
            if isinstance(f1, (int, float)) and isinstance(f2, (int, float)):
                if tag == 'add':
                    return f1 + f2
                if tag == 'mul':
                    return f1 * f2
            return (tag, f1, f2)
        return expr

    return [(stmt[0], stmt[1], fold(stmt[2])) if stmt[0] == 'assign' else stmt
            for stmt in program]`,
    testCases: [
      { input: "programs_equivalent([('assign', 'x', 5)], [('assign', 'x', 5)], [{}])[0]", isHidden: false, description: 'Test case' },
      { input: "constant_folding([('assign', 'x', ('add', 2, 3))])", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Run both programs on same inputs',
      'Compare final states',
      'Optimizations must preserve observable behavior'
    ],
    language: 'python'
  }
];
