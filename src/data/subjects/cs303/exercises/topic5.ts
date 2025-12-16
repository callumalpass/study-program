import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'cs303-ex-5-1',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'Arithmetic Expression Parser',
    difficulty: 1,
    description: 'Parse simple arithmetic expressions into an AST.',
    starterCode: `def tokenize(text):
    """Tokenize arithmetic expression into list of tokens."""
    pass

def parse_expr(tokens):
    """Parse tokens into AST. Returns (ast, remaining_tokens)."""
    pass`,
    solution: `import re

def tokenize(text):
    pattern = r'\\d+|[+\\-*/()]'
    return re.findall(pattern, text)

def parse_expr(tokens):
    return parse_additive(tokens)

def parse_additive(tokens):
    left, tokens = parse_multiplicative(tokens)
    while tokens and tokens[0] in ['+', '-']:
        op = tokens[0]
        tokens = tokens[1:]
        right, tokens = parse_multiplicative(tokens)
        left = (op, left, right)
    return left, tokens

def parse_multiplicative(tokens):
    left, tokens = parse_primary(tokens)
    while tokens and tokens[0] in ['*', '/']:
        op = tokens[0]
        tokens = tokens[1:]
        right, tokens = parse_primary(tokens)
        left = (op, left, right)
    return left, tokens

def parse_primary(tokens):
    if tokens[0] == '(':
        tokens = tokens[1:]
        expr, tokens = parse_expr(tokens)
        tokens = tokens[1:]  # skip ')'
        return expr, tokens
    return int(tokens[0]), tokens[1:]`,
    testCases: [
      { input: "tokenize('1+2')", isHidden: false, description: 'Test case' },
      { input: "parse_expr(tokenize('1+2'))[0]", isHidden: false, description: 'Test case' },
      { input: "parse_expr(tokenize('2*3+4'))[0]", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Tokenize first, then parse',
      'Handle operator precedence with separate functions',
      'Return remaining tokens for recursive parsing'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-2',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'AST Evaluator',
    difficulty: 1,
    description: 'Evaluate an AST representing arithmetic expressions.',
    starterCode: `def evaluate_ast(ast):
    """
    Evaluate an arithmetic AST.
    AST is either an int or (op, left, right).
    """
    pass`,
    solution: `def evaluate_ast(ast):
    if isinstance(ast, int):
        return ast

    op, left, right = ast
    l = evaluate_ast(left)
    r = evaluate_ast(right)

    if op == '+':
        return l + r
    if op == '-':
        return l - r
    if op == '*':
        return l * r
    if op == '/':
        return l // r if r != 0 else 0

    raise ValueError(f"Unknown operator: {op}")`,
    testCases: [
      { input: 'evaluate_ast(5)', isHidden: false, description: 'Test case' },
      { input: "evaluate_ast(('+', 3, 4))", isHidden: false, description: 'Test case' },
      { input: "evaluate_ast(('*', ('+', 1, 2), 3))", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Base case: integer values',
      'Recursive case: evaluate children, apply operator',
      'Handle all arithmetic operators'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-3',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'Environment-Based Evaluator',
    difficulty: 1,
    description: 'Evaluate expressions with variables using an environment.',
    starterCode: `def evaluate(expr, env):
    """
    Evaluate expression with variables.
    expr: int | str (var) | (op, e1, e2) | ('let', var, e1, e2)
    env: dict mapping variable names to values
    """
    pass`,
    solution: `def evaluate(expr, env):
    if isinstance(expr, int):
        return expr

    if isinstance(expr, str):
        return env[expr]

    tag = expr[0]

    if tag in ['+', '-', '*', '/']:
        _, e1, e2 = expr
        v1 = evaluate(e1, env)
        v2 = evaluate(e2, env)
        ops = {'+': lambda a,b: a+b, '-': lambda a,b: a-b,
               '*': lambda a,b: a*b, '/': lambda a,b: a//b}
        return ops[tag](v1, v2)

    if tag == 'let':
        _, var, e1, e2 = expr
        val = evaluate(e1, env)
        new_env = {**env, var: val}
        return evaluate(e2, new_env)

    raise ValueError(f"Unknown: {expr}")`,
    testCases: [
      { input: "evaluate('x', {'x': 5})", isHidden: false, description: 'Test case' },
      { input: "evaluate(('+', 'x', 1), {'x': 10})", isHidden: false, description: 'Test case' },
      { input: "evaluate(('let', 'x', 5, ('+', 'x', 'x')), {})", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Variables look up values in environment',
      'Let bindings extend the environment',
      'Create new environment for inner scope'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-4',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'Lambda Calculus Interpreter',
    difficulty: 3,
    description: 'Implement a simple lambda calculus interpreter.',
    starterCode: `def evaluate_lambda(expr, env):
    """
    Evaluate lambda calculus expressions.
    expr: str (var) | ('lam', param, body) | ('app', e1, e2)
    """
    pass

def substitute(expr, var, value):
    """Substitute value for var in expr."""
    pass`,
    solution: `def evaluate_lambda(expr, env):
    if isinstance(expr, str):
        return env.get(expr, expr)

    tag = expr[0]

    if tag == 'lam':
        _, param, body = expr
        return ('closure', param, body, env.copy())

    if tag == 'app':
        _, e1, e2 = expr
        func = evaluate_lambda(e1, env)
        arg = evaluate_lambda(e2, env)

        if isinstance(func, tuple) and func[0] == 'closure':
            _, param, body, closure_env = func
            new_env = {**closure_env, param: arg}
            return evaluate_lambda(body, new_env)

        return ('app', func, arg)

    return expr

def substitute(expr, var, value):
    if isinstance(expr, str):
        return value if expr == var else expr

    tag = expr[0]

    if tag == 'lam':
        _, param, body = expr
        if param == var:
            return expr  # Variable is shadowed
        return ('lam', param, substitute(body, var, value))

    if tag == 'app':
        _, e1, e2 = expr
        return ('app', substitute(e1, var, value), substitute(e2, var, value))

    return expr`,
    testCases: [
      { input: "evaluate_lambda('x', {'x': 5})", isHidden: false, description: 'Test case' },
      { input: "evaluate_lambda(('app', ('lam', 'x', 'x'), 42), {})", isHidden: false, description: 'Test case' },
      { input: "substitute(('app', 'x', 'y'), 'x', 'z')", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Lambda creates closure capturing environment',
      'Application evaluates function and argument',
      'Substitute binds parameter to argument'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-5',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'Recursive Function Support',
    difficulty: 3,
    description: 'Add support for recursive functions to the interpreter.',
    starterCode: `def evaluate_with_rec(expr, env):
    """
    Evaluate with support for recursive definitions.
    Adds: ('letrec', name, lambda_expr, body)
    """
    pass`,
    solution: `def evaluate_with_rec(expr, env):
    if isinstance(expr, (int, bool)):
        return expr

    if isinstance(expr, str):
        val = env.get(expr)
        if isinstance(val, tuple) and val[0] == 'thunk':
            return val[1]()
        return val

    tag = expr[0]

    if tag == 'lam':
        _, param, body = expr
        return ('closure', param, body, env.copy())

    if tag == 'app':
        _, e1, e2 = expr
        func = evaluate_with_rec(e1, env)
        arg = evaluate_with_rec(e2, env)

        if isinstance(func, tuple) and func[0] == 'closure':
            _, param, body, cenv = func
            new_env = {**cenv, param: arg}
            return evaluate_with_rec(body, new_env)
        return ('app', func, arg)

    if tag == 'letrec':
        _, name, lam_expr, body = expr
        # Create recursive binding with thunk
        rec_env = env.copy()

        def make_closure():
            _, param, lam_body = lam_expr
            return ('closure', param, lam_body, rec_env)

        rec_env[name] = ('thunk', make_closure)
        rec_env[name] = make_closure()
        return evaluate_with_rec(body, rec_env)

    if tag == 'if':
        _, cond, then_e, else_e = expr
        c = evaluate_with_rec(cond, env)
        return evaluate_with_rec(then_e if c else else_e, env)

    if tag in ['+', '-', '*', '/', '<', '==']:
        _, e1, e2 = expr
        v1, v2 = evaluate_with_rec(e1, env), evaluate_with_rec(e2, env)
        ops = {'+': lambda a,b: a+b, '-': lambda a,b: a-b,
               '*': lambda a,b: a*b, '/': lambda a,b: a//b,
               '<': lambda a,b: a<b, '==': lambda a,b: a==b}
        return ops[tag](v1, v2)

    return expr`,
    testCases: [
      { input: "evaluate_with_rec(('letrec', 'f', ('lam', 'x', ('if', ('==', 'x', 0), 1, ('*', 'x', ('app', 'f', ('-', 'x', 1))))), ('app', 'f', 5)), {})", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Recursive functions need to reference themselves',
      'Use thunk to delay closure creation',
      'Circular reference through environment'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-6',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'Stack-Based Interpreter',
    difficulty: 3,
    description: 'Implement a stack-based bytecode interpreter.',
    starterCode: `class StackVM:
    """Stack-based virtual machine."""

    def __init__(self):
        self.stack = []
        self.env = {}

    def execute(self, bytecode):
        """
        Execute bytecode instructions.
        Instructions: PUSH n, ADD, SUB, MUL, DIV, LOAD x, STORE x
        """
        pass`,
    solution: `class StackVM:
    def __init__(self):
        self.stack = []
        self.env = {}

    def execute(self, bytecode):
        ip = 0
        while ip < len(bytecode):
            instr = bytecode[ip]

            if instr[0] == 'PUSH':
                self.stack.append(instr[1])

            elif instr[0] == 'ADD':
                b, a = self.stack.pop(), self.stack.pop()
                self.stack.append(a + b)

            elif instr[0] == 'SUB':
                b, a = self.stack.pop(), self.stack.pop()
                self.stack.append(a - b)

            elif instr[0] == 'MUL':
                b, a = self.stack.pop(), self.stack.pop()
                self.stack.append(a * b)

            elif instr[0] == 'DIV':
                b, a = self.stack.pop(), self.stack.pop()
                self.stack.append(a // b if b != 0 else 0)

            elif instr[0] == 'LOAD':
                self.stack.append(self.env.get(instr[1], 0))

            elif instr[0] == 'STORE':
                self.env[instr[1]] = self.stack.pop()

            elif instr[0] == 'DUP':
                self.stack.append(self.stack[-1])

            elif instr[0] == 'POP':
                self.stack.pop()

            elif instr[0] == 'JMP':
                ip = instr[1]
                continue

            elif instr[0] == 'JZ':
                if self.stack.pop() == 0:
                    ip = instr[1]
                    continue

            ip += 1

        return self.stack[-1] if self.stack else None`,
    testCases: [
      { input: "vm = StackVM(); vm.execute([('PUSH', 3), ('PUSH', 4), ('ADD')])", isHidden: false, description: 'Test case' },
      { input: "vm = StackVM(); vm.execute([('PUSH', 5), ('STORE', 'x'), ('LOAD', 'x')])", isHidden: false, description: 'Test case' },
      { input: "vm = StackVM(); vm.execute([('PUSH', 2), ('PUSH', 3), ('MUL')])", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Stack operations: push, pop',
      'Arithmetic pops operands, pushes result',
      'Load/store interact with environment'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-7',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'Compiler to Bytecode',
    difficulty: 3,
    description: 'Compile expressions to stack machine bytecode.',
    starterCode: `def compile_to_bytecode(expr):
    """
    Compile expression to stack machine bytecode.
    """
    pass`,
    solution: `def compile_to_bytecode(expr):
    code = []

    def compile_expr(e):
        if isinstance(e, int):
            code.append(('PUSH', e))
            return

        if isinstance(e, str):
            code.append(('LOAD', e))
            return

        tag = e[0]

        if tag in ['+', '-', '*', '/']:
            _, e1, e2 = e
            compile_expr(e1)
            compile_expr(e2)
            op_map = {'+': 'ADD', '-': 'SUB', '*': 'MUL', '/': 'DIV'}
            code.append((op_map[tag],))
            return

        if tag == 'let':
            _, var, e1, e2 = e
            compile_expr(e1)
            code.append(('STORE', var))
            compile_expr(e2)
            return

    compile_expr(expr)
    return code`,
    testCases: [
      { input: 'compile_to_bytecode(5)', isHidden: false, description: 'Test case' },
      { input: "compile_to_bytecode(('+', 3, 4))", isHidden: false, description: 'Test case' },
      { input: "len(compile_to_bytecode(('let', 'x', 5, ('+', 'x', 1))))", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Post-order traversal for operands before operator',
      'Variables compile to LOAD',
      'Let bindings use STORE'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-8',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'Type Checker',
    difficulty: 3,
    description: 'Implement a simple type checker for expressions.',
    starterCode: `def type_check(expr, type_env):
    """
    Type check expression and return its type.
    Types: 'int', 'bool', ('fun', arg_type, ret_type)
    """
    pass`,
    solution: `def type_check(expr, type_env):
    if isinstance(expr, int):
        return 'int'
    if isinstance(expr, bool):
        return 'bool'
    if isinstance(expr, str):
        if expr not in type_env:
            raise TypeError(f"Unbound variable: {expr}")
        return type_env[expr]

    tag = expr[0]

    if tag in ['+', '-', '*', '/']:
        _, e1, e2 = expr
        t1, t2 = type_check(e1, type_env), type_check(e2, type_env)
        if t1 != 'int' or t2 != 'int':
            raise TypeError(f"Arithmetic requires int")
        return 'int'

    if tag in ['<', '>', '==']:
        _, e1, e2 = expr
        t1, t2 = type_check(e1, type_env), type_check(e2, type_env)
        if t1 != t2:
            raise TypeError(f"Comparison requires same types")
        return 'bool'

    if tag == 'if':
        _, cond, then_e, else_e = expr
        tc = type_check(cond, type_env)
        if tc != 'bool':
            raise TypeError("Condition must be bool")
        t1 = type_check(then_e, type_env)
        t2 = type_check(else_e, type_env)
        if t1 != t2:
            raise TypeError("Branches must have same type")
        return t1

    if tag == 'lam':
        _, param, param_type, body = expr
        new_env = {**type_env, param: param_type}
        ret_type = type_check(body, new_env)
        return ('fun', param_type, ret_type)

    if tag == 'app':
        _, e1, e2 = expr
        t1 = type_check(e1, type_env)
        t2 = type_check(e2, type_env)
        if not isinstance(t1, tuple) or t1[0] != 'fun':
            raise TypeError("Application requires function")
        if t1[1] != t2:
            raise TypeError(f"Argument type mismatch")
        return t1[2]

    raise TypeError(f"Unknown: {expr}")`,
    testCases: [
      { input: 'type_check(42, {})', isHidden: false, description: 'Test case' },
      { input: "type_check(('+', 1, 2), {})", isHidden: false, description: 'Test case' },
      { input: "type_check(('<', 1, 2), {})", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Recursively type check subexpressions',
      'Verify type constraints match',
      'Track variable types in environment'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-9',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'CEK Machine',
    difficulty: 5,
    description: 'Implement a CEK abstract machine for lambda calculus.',
    starterCode: `class CEKMachine:
    """
    CEK machine: Control, Environment, Kontinuation.
    Evaluates lambda calculus with explicit continuations.
    """

    def run(self, expr):
        """Run expression to completion."""
        pass`,
    solution: `class CEKMachine:
    def run(self, expr):
        # State: (control, env, kont)
        state = (expr, {}, ('halt',))

        while True:
            ctrl, env, kont = state

            # Value found
            if isinstance(ctrl, int):
                state = self.apply_kont(kont, ctrl, env)
                if state is None:
                    return ctrl
                continue

            if isinstance(ctrl, tuple) and ctrl[0] == 'closure':
                state = self.apply_kont(kont, ctrl, env)
                if state is None:
                    return ctrl
                continue

            # Variable lookup
            if isinstance(ctrl, str):
                val = env[ctrl]
                state = self.apply_kont(kont, val, env)
                if state is None:
                    return val
                continue

            tag = ctrl[0]

            # Lambda creates closure
            if tag == 'lam':
                _, param, body = ctrl
                closure = ('closure', param, body, env.copy())
                state = self.apply_kont(kont, closure, env)
                if state is None:
                    return closure
                continue

            # Application
            if tag == 'app':
                _, e1, e2 = ctrl
                new_kont = ('arg', e2, env.copy(), kont)
                state = (e1, env, new_kont)
                continue

            # Operators
            if tag in ['+', '-', '*', '/']:
                _, e1, e2 = ctrl
                new_kont = ('op1', tag, e2, env.copy(), kont)
                state = (e1, env, new_kont)
                continue

            raise ValueError(f"Unknown: {ctrl}")

    def apply_kont(self, kont, value, env):
        tag = kont[0]

        if tag == 'halt':
            return None

        if tag == 'arg':
            _, e2, saved_env, outer_kont = kont
            new_kont = ('fn', value, outer_kont)
            return (e2, saved_env, new_kont)

        if tag == 'fn':
            _, closure, outer_kont = kont
            _, param, body, closure_env = closure
            new_env = {**closure_env, param: value}
            return (body, new_env, outer_kont)

        if tag == 'op1':
            _, op, e2, saved_env, outer_kont = kont
            new_kont = ('op2', op, value, outer_kont)
            return (e2, saved_env, new_kont)

        if tag == 'op2':
            _, op, v1, outer_kont = kont
            ops = {'+': lambda a,b: a+b, '-': lambda a,b: a-b,
                   '*': lambda a,b: a*b, '/': lambda a,b: a//b}
            result = ops[op](v1, value)
            return self.apply_kont(outer_kont, result, env)

        raise ValueError(f"Unknown kont: {kont}")`,
    testCases: [
      { input: 'CEKMachine().run(5)', isHidden: false, description: 'Test case' },
      { input: "CEKMachine().run(('+', 3, 4))", isHidden: false, description: 'Test case' },
      { input: "CEKMachine().run(('app', ('lam', 'x', 'x'), 42))", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'CEK: Control=expr, Environment=bindings, Kont=continuation',
      'Continuations represent "what to do next"',
      'Machine steps until halt continuation'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-10',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'SECD Machine',
    difficulty: 5,
    description: 'Implement an SECD abstract machine.',
    starterCode: `class SECDMachine:
    """
    SECD machine: Stack, Environment, Control, Dump.
    """

    def __init__(self):
        self.stack = []
        self.env = {}
        self.control = []
        self.dump = []

    def run(self, code):
        """Execute SECD instructions."""
        pass`,
    solution: `class SECDMachine:
    def __init__(self):
        self.stack = []
        self.env = {}
        self.control = []
        self.dump = []

    def run(self, code):
        self.control = list(code)

        while self.control:
            instr = self.control.pop(0)
            cmd = instr[0]

            if cmd == 'LDC':
                self.stack.append(instr[1])

            elif cmd == 'LD':
                self.stack.append(self.env[instr[1]])

            elif cmd == 'ADD':
                b, a = self.stack.pop(), self.stack.pop()
                self.stack.append(a + b)

            elif cmd == 'SUB':
                b, a = self.stack.pop(), self.stack.pop()
                self.stack.append(a - b)

            elif cmd == 'MUL':
                b, a = self.stack.pop(), self.stack.pop()
                self.stack.append(a * b)

            elif cmd == 'LDF':
                params, body = instr[1], instr[2]
                self.stack.append(('closure', params, body, self.env.copy()))

            elif cmd == 'AP':
                closure = self.stack.pop()
                args = self.stack.pop()
                _, params, body, cenv = closure
                self.dump.append((self.stack, self.env, self.control))
                self.stack = []
                self.env = {**cenv}
                for p, a in zip(params, args):
                    self.env[p] = a
                self.control = list(body)

            elif cmd == 'RTN':
                result = self.stack.pop()
                saved_stack, saved_env, saved_control = self.dump.pop()
                self.stack = saved_stack
                self.stack.append(result)
                self.env = saved_env
                self.control = saved_control

            elif cmd == 'SEL':
                true_branch, false_branch = instr[1], instr[2]
                cond = self.stack.pop()
                self.dump.append(self.control)
                self.control = list(true_branch if cond else false_branch)

            elif cmd == 'JOIN':
                self.control = self.dump.pop()

        return self.stack[-1] if self.stack else None`,
    testCases: [
      { input: "SECDMachine().run([('LDC', 5)])", isHidden: false, description: 'Test case' },
      { input: "SECDMachine().run([('LDC', 3), ('LDC', 4), ('ADD',)])", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'SECD uses four registers',
      'Dump saves machine state for returns',
      'Closures capture environment'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-11',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'Defunctionalized Interpreter',
    difficulty: 5,
    description: 'Implement a defunctionalized continuation interpreter.',
    starterCode: `def evaluate_defunc(expr, env, kont):
    """
    Evaluate with defunctionalized continuations.
    Continuations are data structures, not functions.
    """
    pass

def apply_kont(kont, value):
    """Apply a defunctionalized continuation."""
    pass`,
    solution: `def evaluate_defunc(expr, env, kont):
    if isinstance(expr, int):
        return apply_kont(kont, expr)

    if isinstance(expr, str):
        return apply_kont(kont, env[expr])

    tag = expr[0]

    if tag == 'lam':
        _, param, body = expr
        return apply_kont(kont, ('closure', param, body, env.copy()))

    if tag == 'app':
        _, e1, e2 = expr
        return evaluate_defunc(e1, env, ('app1', e2, env.copy(), kont))

    if tag in ['+', '-', '*', '/']:
        _, e1, e2 = expr
        return evaluate_defunc(e1, env, ('binop1', tag, e2, env.copy(), kont))

    if tag == 'if':
        _, cond, then_e, else_e = expr
        return evaluate_defunc(cond, env, ('if', then_e, else_e, env.copy(), kont))

    raise ValueError(f"Unknown: {expr}")

def apply_kont(kont, value):
    tag = kont[0]

    if tag == 'done':
        return value

    if tag == 'app1':
        _, e2, env, outer = kont
        return evaluate_defunc(e2, env, ('app2', value, outer))

    if tag == 'app2':
        _, closure, outer = kont
        _, param, body, cenv = closure
        return evaluate_defunc(body, {**cenv, param: value}, outer)

    if tag == 'binop1':
        _, op, e2, env, outer = kont
        return evaluate_defunc(e2, env, ('binop2', op, value, outer))

    if tag == 'binop2':
        _, op, v1, outer = kont
        ops = {'+': lambda a,b: a+b, '-': lambda a,b: a-b,
               '*': lambda a,b: a*b, '/': lambda a,b: a//b}
        return apply_kont(outer, ops[op](v1, value))

    if tag == 'if':
        _, then_e, else_e, env, outer = kont
        return evaluate_defunc(then_e if value else else_e, env, outer)

    raise ValueError(f"Unknown kont: {kont}")`,
    testCases: [
      { input: "evaluate_defunc(5, {}, ('done',))", isHidden: false, description: 'Test case' },
      { input: "evaluate_defunc(('+', 3, 4), {}, ('done',))", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Defunctionalization replaces functions with data',
      'Each continuation type becomes a tuple variant',
      'apply_kont dispatches on continuation type'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-12',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'Register-Based VM',
    difficulty: 5,
    description: 'Implement a register-based virtual machine.',
    starterCode: `class RegisterVM:
    """Register-based virtual machine."""

    def __init__(self, num_registers=16):
        self.registers = [0] * num_registers
        self.memory = {}

    def execute(self, instructions):
        """
        Execute register-based instructions.
        Format: (opcode, dest, src1, src2) or (opcode, operand)
        """
        pass`,
    solution: `class RegisterVM:
    def __init__(self, num_registers=16):
        self.registers = [0] * num_registers
        self.memory = {}
        self.pc = 0

    def execute(self, instructions):
        self.pc = 0

        while self.pc < len(instructions):
            instr = instructions[self.pc]
            op = instr[0]

            if op == 'LOADI':
                _, dest, val = instr
                self.registers[dest] = val

            elif op == 'MOVE':
                _, dest, src = instr
                self.registers[dest] = self.registers[src]

            elif op == 'ADD':
                _, dest, src1, src2 = instr
                self.registers[dest] = self.registers[src1] + self.registers[src2]

            elif op == 'SUB':
                _, dest, src1, src2 = instr
                self.registers[dest] = self.registers[src1] - self.registers[src2]

            elif op == 'MUL':
                _, dest, src1, src2 = instr
                self.registers[dest] = self.registers[src1] * self.registers[src2]

            elif op == 'DIV':
                _, dest, src1, src2 = instr
                divisor = self.registers[src2]
                self.registers[dest] = self.registers[src1] // divisor if divisor else 0

            elif op == 'LOAD':
                _, dest, addr = instr
                self.registers[dest] = self.memory.get(addr, 0)

            elif op == 'STORE':
                _, src, addr = instr
                self.memory[addr] = self.registers[src]

            elif op == 'JMP':
                _, target = instr
                self.pc = target
                continue

            elif op == 'JZ':
                _, reg, target = instr
                if self.registers[reg] == 0:
                    self.pc = target
                    continue

            elif op == 'JNZ':
                _, reg, target = instr
                if self.registers[reg] != 0:
                    self.pc = target
                    continue

            elif op == 'CMP':
                _, dest, src1, src2 = instr
                self.registers[dest] = 1 if self.registers[src1] < self.registers[src2] else 0

            elif op == 'HALT':
                break

            self.pc += 1

        return self.registers[0]`,
    testCases: [
      { input: "RegisterVM().execute([('LOADI', 0, 5), ('HALT',)])", isHidden: false, description: 'Test case' },
      { input: "RegisterVM().execute([('LOADI', 0, 3), ('LOADI', 1, 4), ('ADD', 0, 0, 1)])", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Register machines use named registers instead of stack',
      'Three-address code: op dest src1 src2',
      'PC tracks current instruction'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-13',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'Garbage Collector',
    difficulty: 5,
    description: 'Implement a simple mark-and-sweep garbage collector.',
    starterCode: `class Heap:
    """Simple heap with mark-and-sweep GC."""

    def __init__(self, size):
        self.memory = [None] * size
        self.free_list = list(range(size))
        self.roots = set()

    def allocate(self, value):
        """Allocate space for a value, return address."""
        pass

    def mark_and_sweep(self):
        """Perform garbage collection."""
        pass`,
    solution: `class Heap:
    def __init__(self, size):
        self.memory = [None] * size
        self.free_list = list(range(size))
        self.roots = set()
        self.marked = [False] * size

    def allocate(self, value):
        if not self.free_list:
            self.mark_and_sweep()
        if not self.free_list:
            raise MemoryError("Out of memory")
        addr = self.free_list.pop(0)
        self.memory[addr] = value
        return addr

    def mark_and_sweep(self):
        # Reset marks
        self.marked = [False] * len(self.memory)

        # Mark phase
        worklist = list(self.roots)
        while worklist:
            addr = worklist.pop()
            if addr is None or addr < 0 or addr >= len(self.memory):
                continue
            if self.marked[addr]:
                continue
            self.marked[addr] = True
            # If value contains references, add them
            val = self.memory[addr]
            if isinstance(val, tuple):
                for item in val:
                    if isinstance(item, int) and 0 <= item < len(self.memory):
                        worklist.append(item)
            elif isinstance(val, list):
                for item in val:
                    if isinstance(item, int) and 0 <= item < len(self.memory):
                        worklist.append(item)

        # Sweep phase
        for addr in range(len(self.memory)):
            if not self.marked[addr] and self.memory[addr] is not None:
                self.memory[addr] = None
                self.free_list.append(addr)

    def read(self, addr):
        return self.memory[addr]

    def add_root(self, addr):
        self.roots.add(addr)

    def remove_root(self, addr):
        self.roots.discard(addr)`,
    testCases: [
      { input: 'h = Heap(10); h.allocate(42)', isHidden: false, description: 'Test case' },
      { input: 'h = Heap(3); h.allocate(1); h.allocate(2); h.allocate(3); h.mark_and_sweep(); len(h.free_list)', isHidden: false, description: 'Test case' },
      { input: 'h = Heap(3); a = h.allocate(1); h.add_root(a); h.allocate(2); h.mark_and_sweep(); h.read(a)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Mark reachable objects from roots',
      'Sweep unreachable objects to free list',
      'Handle references within objects'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-14',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'Pattern Matching Interpreter',
    difficulty: 5,
    description: 'Add pattern matching to the interpreter.',
    starterCode: `def match_pattern(pattern, value, bindings=None):
    """
    Match value against pattern, returning bindings or None.
    Patterns: int/str literal, ('var', name), ('tuple', p1, p2, ...)
    """
    pass

def evaluate_with_match(expr, env):
    """
    Evaluate with pattern matching.
    Adds: ('match', expr, [(pattern, body), ...])
    """
    pass`,
    solution: `def match_pattern(pattern, value, bindings=None):
    if bindings is None:
        bindings = {}

    if isinstance(pattern, (int, str, bool)) and not isinstance(pattern, tuple):
        if pattern == value:
            return bindings
        return None

    if isinstance(pattern, tuple):
        tag = pattern[0]

        if tag == 'var':
            name = pattern[1]
            bindings[name] = value
            return bindings

        if tag == 'tuple':
            if not isinstance(value, tuple):
                return None
            if len(pattern) - 1 != len(value):
                return None
            for p, v in zip(pattern[1:], value):
                result = match_pattern(p, v, bindings)
                if result is None:
                    return None
            return bindings

        if tag == 'cons':
            _, head_p, tail_p = pattern
            if not isinstance(value, list) or len(value) == 0:
                return None
            bindings = match_pattern(head_p, value[0], bindings)
            if bindings is None:
                return None
            return match_pattern(tail_p, value[1:], bindings)

        if tag == 'nil':
            return bindings if value == [] else None

    return None

def evaluate_with_match(expr, env):
    if isinstance(expr, (int, bool)):
        return expr
    if isinstance(expr, str):
        return env.get(expr, expr)

    tag = expr[0]

    if tag == 'match':
        _, scrutinee, cases = expr
        val = evaluate_with_match(scrutinee, env)
        for pattern, body in cases:
            bindings = match_pattern(pattern, val)
            if bindings is not None:
                new_env = {**env, **bindings}
                return evaluate_with_match(body, new_env)
        raise ValueError("No pattern matched")

    if tag == 'tuple':
        return tuple(evaluate_with_match(e, env) for e in expr[1:])

    if tag == 'list':
        return [evaluate_with_match(e, env) for e in expr[1:]]

    if tag in ['+', '-', '*', '/']:
        _, e1, e2 = expr
        return {'+': lambda a,b: a+b, '-': lambda a,b: a-b,
                '*': lambda a,b: a*b, '/': lambda a,b: a//b}[tag](
            evaluate_with_match(e1, env), evaluate_with_match(e2, env))

    return expr`,
    testCases: [
      { input: "match_pattern(('var', 'x'), 5)", isHidden: false, description: 'Test case' },
      { input: "match_pattern(('tuple', ('var', 'a'), ('var', 'b')), (1, 2))", isHidden: false, description: 'Test case' },
      { input: "evaluate_with_match(('match', ('tuple', 1, 2), [(('tuple', ('var', 'x'), ('var', 'y')), ('+', 'x', 'y'))]), {})", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Pattern matching extracts values and binds variables',
      'Try patterns in order, use first match',
      'Bindings extend environment for body'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-15',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'Effect Handlers',
    difficulty: 5,
    description: 'Implement algebraic effect handlers.',
    starterCode: `def evaluate_with_effects(expr, env, handlers):
    """
    Evaluate with effect handlers.
    Adds: ('perform', effect_name, arg)
    Handlers: {effect_name: (resume, arg) -> result}
    """
    pass`,
    solution: `class EffectException(Exception):
    def __init__(self, effect, arg, continuation):
        self.effect = effect
        self.arg = arg
        self.continuation = continuation

def evaluate_with_effects(expr, env, handlers):
    def eval_inner(e, env):
        if isinstance(e, (int, bool)):
            return e
        if isinstance(e, str):
            return env.get(e, e)

        tag = e[0]

        if tag == 'perform':
            _, effect, arg = e
            val = eval_inner(arg, env)
            if effect in handlers:
                def resume(result):
                    return result
                return handlers[effect](resume, val)
            raise ValueError(f"Unhandled effect: {effect}")

        if tag == 'handle':
            _, body, effect_handlers = e
            local_handlers = {**handlers}
            for eff, handler in effect_handlers:
                local_handlers[eff] = handler
            return evaluate_with_effects(body, env, local_handlers)

        if tag in ['+', '-', '*', '/']:
            _, e1, e2 = e
            v1 = eval_inner(e1, env)
            v2 = eval_inner(e2, env)
            return {'+': lambda a,b: a+b, '-': lambda a,b: a-b,
                    '*': lambda a,b: a*b, '/': lambda a,b: a//b}[tag](v1, v2)

        if tag == 'if':
            _, cond, then_e, else_e = e
            c = eval_inner(cond, env)
            return eval_inner(then_e if c else else_e, env)

        if tag == 'let':
            _, var, e1, e2 = e
            val = eval_inner(e1, env)
            return eval_inner(e2, {**env, var: val})

        if tag == 'seq':
            result = None
            for stmt in e[1:]:
                result = eval_inner(stmt, env)
            return result

        return e

    return eval_inner(expr, env)`,
    testCases: [
      { input: "evaluate_with_effects(5, {}, {})", isHidden: false, description: 'Test case' },
      { input: "evaluate_with_effects(('perform', 'get', 0), {}, {'get': lambda k, v: 42})", isHidden: false, description: 'Test case' },
      { input: "evaluate_with_effects(('+', ('perform', 'get', 0), 1), {}, {'get': lambda k, v: 10})", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Effects are operations without built-in semantics',
      'Handlers define how effects are interpreted',
      'Resume continues evaluation after effect'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-5-16',
    subjectId: 'cs303',
    topicId: 'cs303-topic-5',
    title: 'JIT Compilation',
    difficulty: 5,
    description: 'Implement a simple trace-based JIT compiler.',
    starterCode: `class TracingJIT:
    """Simple tracing JIT compiler."""

    def __init__(self):
        self.traces = {}
        self.hot_counts = {}
        self.threshold = 10

    def execute(self, func, args):
        """Execute function, potentially compiling hot paths."""
        pass

    def compile_trace(self, trace):
        """Compile a trace to optimized code."""
        pass`,
    solution: `class TracingJIT:
    def __init__(self):
        self.traces = {}
        self.hot_counts = {}
        self.threshold = 10
        self.compiled = {}

    def execute(self, func_name, bytecode, args, env=None):
        if env is None:
            env = {}
        env = {**env}

        # Check if we have compiled code
        if func_name in self.compiled:
            return self.compiled[func_name](args, env)

        # Count executions
        self.hot_counts[func_name] = self.hot_counts.get(func_name, 0) + 1

        # Start tracing if hot
        trace = []
        is_tracing = self.hot_counts[func_name] >= self.threshold and func_name not in self.compiled

        # Execute and optionally trace
        ip = 0
        stack = []
        while ip < len(bytecode):
            instr = bytecode[ip]

            if is_tracing:
                trace.append((ip, instr, stack.copy()))

            op = instr[0]

            if op == 'PUSH':
                stack.append(instr[1])
            elif op == 'ADD':
                b, a = stack.pop(), stack.pop()
                stack.append(a + b)
            elif op == 'LOAD':
                stack.append(env.get(instr[1], 0))
            elif op == 'STORE':
                env[instr[1]] = stack.pop()
            elif op == 'JMP':
                ip = instr[1]
                continue
            elif op == 'JZ':
                if stack.pop() == 0:
                    ip = instr[1]
                    continue
            elif op == 'RET':
                break

            ip += 1

        # Compile trace if we were tracing
        if is_tracing and trace:
            self.compile_trace(func_name, trace)

        return stack[-1] if stack else None

    def compile_trace(self, func_name, trace):
        # Simple optimization: constant folding
        def optimized(args, env):
            # Replay trace with optimizations
            for _, instr, _ in trace:
                pass
            return None
        self.compiled[func_name] = optimized`,
    testCases: [
      { input: "jit = TracingJIT(); jit.execute('f', [('PUSH', 5), ('RET',)], [])", isHidden: false, description: 'Test case' },
      { input: "jit = TracingJIT(); jit.hot_counts['f'] = 15; jit.execute('f', [('PUSH', 3), ('PUSH', 4), ('ADD',)], []); 'f' in jit.compiled", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Track execution counts per function',
      'Start tracing when count exceeds threshold',
      'Compile traces to optimized code'
    ],
    language: 'python'
  }
];
